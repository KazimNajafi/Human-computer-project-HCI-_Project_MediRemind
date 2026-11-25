/**
 * MediRemind — Main Application Controller
 *
 * Implements:
 * - All 5 main screens (Welcome, Home, Add Medicine, Reminder Alert, History)
 * - Bilingual English / Urdu (RTL) switching
 * - Add Medicine with clear validation and confirmation
 * - Mark as Taken (1 tap on Home or Reminder Alert) + Well Done feedback
 * - Remind Me Later (10 min simulated re-reminder) & Helper Alert demo
 * - Date-wise History with Green (Taken) and Red (Missed) status labels
 * - Undo support, Delete confirmation, Help Voice Guide, and Text Size setting
 */

(function () {
  "use strict";

  // Application State
  let appState = loadAppState();
  let currentScreen = "welcome";
  let screenHistoryStack = ["welcome"];
  let activeReminderMedId = null;
  let historyFilter = "all";
  let selectedVisual = "tablet-white";
  let lastUndoAction = null;
  let toastTimer = null;
  let pendingConfirmAction = null;

  // =========================================================================
  // Translation & Formatting Helpers
  // =========================================================================
  function t(key, vars) {
    const lang = appState.language === "ur" ? "ur" : "en";
    let text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        text = text.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
      });
    }
    return text;
  }

  function getMedDisplayName(med) {
    if (appState.language === "ur" && med.nameUr) {
      return med.nameUr;
    }
    return med.name;
  }

  function getMedDisplayNote(med) {
    if (appState.language === "ur" && med.noteUr) {
      return med.noteUr;
    }
    return med.note || "";
  }

  function getMedDisplayDose(med) {
    if (appState.language === "ur" && med.doseUr) {
      return med.doseUr;
    }
    if (appState.language === "ur") {
      const map = {
        "1 Tablet": "1 گولی",
        "2 Tablets": "2 گولیاں",
        "Half Tablet": "آدھی گولی",
        "1 Spoon": "1 چمچ",
        "1 Capsule": "1 کیپسول"
      };
      return map[med.dose] || med.dose;
    }
    return med.dose;
  }

  /**
   * Convert "HH:MM" (24h) into readable 12-hour format + familiar time period
   * (Subah / Dopahar / Shaam / Raat).
   */
  function formatTimeWithPeriod(time24) {
    const parts = (time24 || "08:00").split(":");
    const hour = parseInt(parts[0], 10);
    const minute = parts[1] || "00";

    const periodKey = getPeriodKey(hour);
    const periodLabel = t(periodKey);

    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;

    if (appState.language === "ur") {
      return `${periodLabel} • ${hour12}:${minute}`;
    }
    return `${hour12}:${minute} ${ampm} • ${periodLabel}`;
  }

  function getPeriodKey(hour) {
    if (hour >= 5 && hour < 12) return "periodMorning";
    if (hour >= 12 && hour < 16) return "periodAfternoon";
    if (hour >= 16 && hour < 20) return "periodEvening";
    return "periodNight";
  }

  function formatTodayDate() {
    const now = new Date();
    if (appState.language === "ur") {
      try {
        return new Intl.DateTimeFormat("ur-PK", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        }).format(now);
      } catch (_err) {
        return now.toDateString();
      }
    }
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(now);
  }

  function formatDateHeading(dateISO) {
    const today = getDateOffsetISO(0);
    const yesterday = getDateOffsetISO(-1);
    const twoDaysAgo = getDateOffsetISO(-2);

    const parts = dateISO.split("-");
    const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const formatted = new Intl.DateTimeFormat(appState.language === "ur" ? "ur-PK" : "en-GB", {
      day: "numeric",
      month: "short"
    }).format(dateObj);

    if (dateISO === today) return `${t("dateToday")} (${formatted})`;
    if (dateISO === yesterday) return `${t("dateYesterday")} (${formatted})`;
    if (dateISO === twoDaysAgo) return `${t("dateTwoDaysAgo")} (${formatted})`;
    return formatted;
  }

  // =========================================================================
  // Screen Navigation
  // =========================================================================
  function navigateTo(screenName, options) {
    const opts = options || {};
    MediAudio.stopSpeaking();
    hideToast();

    document.querySelectorAll(".screen").forEach(function (el) {
      el.classList.remove("screen-active");
    });

    const target = document.getElementById("screen-" + screenName);
    if (!target) return;
    target.classList.add("screen-active");

    if (!opts.isBack && screenHistoryStack[screenHistoryStack.length - 1] !== screenName) {
      screenHistoryStack.push(screenName);
    }
    currentScreen = screenName;

    // Render target screen cleanly
    if (screenName === "home") {
      renderHome();
    } else if (screenName === "add") {
      resetAddFormErrors();
    } else if (screenName === "reminder") {
      renderReminderScreen(opts.medId, opts.isReAlert);
    } else if (screenName === "history") {
      renderHistory();
    }

    // Scroll top of new screen into view
    const body = target.querySelector(".screen-body");
    if (body) body.scrollTop = 0;
  }

  function goBack() {
    if (screenHistoryStack.length > 1) {
      screenHistoryStack.pop();
      const prev = screenHistoryStack[screenHistoryStack.length - 1];
      navigateTo(prev, { isBack: true });
    } else {
      navigateTo("home", { isBack: true });
    }
  }

  // =========================================================================
  // Language & Accessibility Text Size
  // =========================================================================
  function applyLanguageAndDir() {
    const lang = appState.language === "ur" ? "ur" : "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";

    // Update all static text nodes
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key);
    });

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      el.setAttribute("placeholder", t(key));
    });

    // Sync language selector buttons on Welcome & Help
    document.querySelectorAll("[data-lang-select]").forEach(function (btn) {
      const isSelected = btn.getAttribute("data-lang-select") === lang;
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-pressed", String(isSelected));
    });

    // Update default dose input if it matches a known preset
    const doseInput = document.getElementById("input-med-dose");
    const activeDoseChip = document.querySelector("[data-dose-preset].active");
    if (doseInput && activeDoseChip) {
      doseInput.value = activeDoseChip.textContent.trim();
    }

    // Re-render dynamic screens
    renderHome();
    renderHistory();
    if (currentScreen === "reminder") {
      renderReminderScreen(activeReminderMedId, false);
    }
  }

  function setLanguage(lang) {
    hideToast();
    appState.language = lang === "ur" ? "ur" : "en";
    saveAppState(appState);
    applyLanguageAndDir();
  }

  function applyTextSize() {
    const isXL = appState.textSize === "xl";
    document.documentElement.classList.toggle("text-xl", isXL);
    const btnNormal = document.getElementById("btn-size-normal");
    const btnXL = document.getElementById("btn-size-xl");
    if (btnNormal && btnXL) {
      btnNormal.classList.toggle("active", !isXL);
      btnXL.classList.toggle("active", isXL);
    }
  }

  // =========================================================================
  // Toast Feedback & Undo (Heuristics 1 & 3)
  // =========================================================================
  function showToast(message, undoCallback) {
    const bar = document.getElementById("toast-bar");
    const msgEl = document.getElementById("toast-message");
    const undoBtn = document.getElementById("toast-undo-btn");

    if (toastTimer) clearTimeout(toastTimer);

    msgEl.textContent = message;
    lastUndoAction = undoCallback || null;

    if (undoCallback) {
      undoBtn.classList.remove("hidden");
    } else {
      undoBtn.classList.add("hidden");
    }

    bar.classList.remove("hidden");
    toastTimer = setTimeout(function () {
      hideToast();
    }, 5500);
  }

  function hideToast() {
    const bar = document.getElementById("toast-bar");
    bar.classList.add("hidden");
    lastUndoAction = null;
  }

  // =========================================================================
  // Confirmation Dialog (Heuristic 5: Error Prevention)
  // =========================================================================
  function openConfirmModal(title, message, confirmBtnText, onConfirm) {
    document.getElementById("confirm-title").textContent = title;
    document.getElementById("confirm-message").textContent = message;
    document.getElementById("btn-confirm-yes").textContent = confirmBtnText;
    pendingConfirmAction = onConfirm;
    document.getElementById("modal-confirm").classList.remove("hidden");
  }

  function closeConfirmModal() {
    document.getElementById("modal-confirm").classList.add("hidden");
    pendingConfirmAction = null;
  }

  // =========================================================================
  // SCREEN 2: HOME RENDERING & ACTIONS
  // =========================================================================
  function renderHome() {
    const dateEl = document.getElementById("home-date-display");
    if (dateEl) dateEl.textContent = formatTodayDate();

    const meds = appState.medicines.slice().sort(function (a, b) {
      return (a.time || "00:00").localeCompare(b.time || "00:00");
    });

    // Progress Summary
    const total = meds.length;
    const takenCount = meds.filter(function (m) { return m.status === "taken"; }).length;
    const pct = total === 0 ? 0 : Math.round((takenCount / total) * 100);

    const progressText = document.getElementById("home-progress-text");
    const progressBar = document.getElementById("home-progress-bar");
    if (progressText) {
      progressText.textContent = t("progressTemplate", { taken: takenCount, total: total });
    }
    if (progressBar) {
      progressBar.style.width = pct + "%";
    }

    // Next Reminder Banner
    const nextDue = findNextReminderMedicine();
    const bannerTitle = document.getElementById("banner-due-title");
    const bannerMed = document.getElementById("banner-due-med");
    if (bannerTitle && bannerMed) {
      if (nextDue && nextDue.status !== "taken") {
        bannerTitle.textContent = t("nextReminderReady");
        bannerMed.textContent = `${getMedDisplayName(nextDue)} • ${formatTimeWithPeriod(nextDue.time)}`;
      } else if (nextDue) {
        bannerTitle.textContent = t("allTakenBannerTitle");
        bannerMed.textContent = t("allTakenBannerSub");
      } else {
        bannerTitle.textContent = t("nextReminderReady");
        bannerMed.textContent = t("homeEmpty");
      }
    }

    // Medicine List
    const listEl = document.getElementById("home-medicine-list");
    if (!listEl) return;

    if (meds.length === 0) {
      listEl.innerHTML = `<div class="empty-state-box">${escapeHtml(t("homeEmpty"))}</div>`;
      return;
    }

    listEl.innerHTML = meds.map(function (med) {
      const statusMeta = getStatusBadgeMeta(med.status);
      const isTaken = med.status === "taken";

      return `
        <article class="med-card status-${med.status}">
          <div class="med-card-top">
            <div class="med-icon-wrap">
              ${getMedicineSVG(med.visual, 40)}
            </div>
            <div class="med-card-info">
              <h3 class="med-name">${escapeHtml(getMedDisplayName(med))}</h3>
              <p class="med-time-row">⏰ ${escapeHtml(formatTimeWithPeriod(med.time))}</p>
              <p class="med-dose-row">${escapeHtml(getMedDisplayDose(med))}${getMedDisplayNote(med) ? " • " + escapeHtml(getMedDisplayNote(med)) : ""}</p>
              <span class="status-pill ${statusMeta.cls}">
                <span aria-hidden="true">${statusMeta.icon}</span>
                <span>${escapeHtml(statusMeta.label)}</span>
              </span>
            </div>
          </div>

          <div class="med-card-actions">
            ${!isTaken ? `
              <button type="button" class="btn btn-card-taken" data-action="quick-taken" data-med-id="${med.id}">
                <span aria-hidden="true">✓</span>
                <span>${escapeHtml(t("cardTakenBtn"))}</span>
              </button>
              <button type="button" class="btn btn-card-alert" data-action="open-alert" data-med-id="${med.id}">
                <span aria-hidden="true">🔔</span>
                <span>${escapeHtml(t("cardAlertBtn"))}</span>
              </button>
            ` : ""}
            <button type="button" class="btn btn-card-delete" data-action="delete-med" data-med-id="${med.id}">
              <span aria-hidden="true">🗑</span>
              <span>${escapeHtml(t("cardDeleteBtn"))}</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  function getStatusBadgeMeta(status) {
    switch (status) {
      case "taken":
        return { icon: "✓", label: t("statusTaken"), cls: "status-pill-taken" };
      case "due":
        return { icon: "⏰", label: t("statusDue"), cls: "status-pill-due" };
      case "snoozed":
        return { icon: "⏱", label: t("statusSnoozed"), cls: "status-pill-snoozed" };
      case "missed":
        return { icon: "✕", label: t("statusMissed"), cls: "status-pill-missed" };
      case "upcoming":
      default:
        return { icon: "🕒", label: t("statusUpcoming"), cls: "status-pill-due" };
    }
  }

  function findNextReminderMedicine() {
    const priority = ["due", "snoozed", "upcoming", "missed", "taken"];
    for (let i = 0; i < priority.length; i++) {
      const found = appState.medicines.find(function (m) { return m.status === priority[i]; });
      if (found) return found;
    }
    return null;
  }

  function markMedicineStatus(medId, newStatus, showToastFeedback) {
    const med = appState.medicines.find(function (m) { return m.id === medId; });
    if (!med) return null;

    const prevStatus = med.status;
    const prevHistoryCopy = JSON.parse(JSON.stringify(appState.history));

    med.status = newStatus;

    // Update Today's History entry for this medicine
    if (newStatus === "taken" || newStatus === "missed") {
      const todayISO = getDateOffsetISO(0);
      const existingIdx = appState.history.findIndex(function (h) {
        return h.medId === med.id && h.dateISO === todayISO;
      });
      const entry = {
        id: existingIdx >= 0 ? appState.history[existingIdx].id : "hist-" + Date.now(),
        medId: med.id,
        dateISO: todayISO,
        name: med.name,
        nameUr: med.nameUr || med.name,
        time: med.time,
        dose: med.dose,
        doseUr: med.doseUr || getMedDisplayDose(med),
        status: newStatus
      };
      if (existingIdx >= 0) {
        appState.history[existingIdx] = entry;
      } else {
        appState.history.unshift(entry);
      }
    }

    saveAppState(appState);
    renderHome();
    renderHistory();

    const undoFn = function () {
      med.status = prevStatus;
      appState.history = prevHistoryCopy;
      saveAppState(appState);
      renderHome();
      renderHistory();
      showToast(t("toastUndone"));
    };

    if (newStatus === "taken") {
      MediAudio.playSuccessTone();
      if (showToastFeedback) {
        showToast(t("toastTaken", { name: getMedDisplayName(med) }), undoFn);
      }
    }

    return undoFn;
  }

  function deleteMedicineWithConfirm(medId) {
    const med = appState.medicines.find(function (m) { return m.id === medId; });
    if (!med) return;

    openConfirmModal(
      t("confirmDeleteTitle"),
      t("confirmDeleteBody", { name: getMedDisplayName(med) }),
      t("confirmYesDelete"),
      function () {
        const index = appState.medicines.findIndex(function (m) { return m.id === medId; });
        if (index === -1) return;
        const removed = appState.medicines.splice(index, 1)[0];
        saveAppState(appState);
        renderHome();

        showToast(t("toastDeleted", { name: getMedDisplayName(removed) }), function () {
          appState.medicines.splice(index, 0, removed);
          saveAppState(appState);
          renderHome();
          showToast(t("toastUndone"));
        });
      }
    );
  }

  // =========================================================================
  // SCREEN 3: ADD MEDICINE FORM & VALIDATION
  // =========================================================================
  function resetAddFormErrors() {
    document.getElementById("form-error-box").classList.add("hidden");
    ["err-med-name", "err-med-time", "err-med-dose"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = "";
        el.classList.add("hidden");
      }
    });
    ["input-med-name", "input-med-time", "input-med-dose"].forEach(function (id) {
      const input = document.getElementById(id);
      if (input) input.classList.remove("input-invalid");
    });
  }

  function handleAddMedicineSubmit(event) {
    event.preventDefault();
    resetAddFormErrors();

    const nameInput = document.getElementById("input-med-name");
    const timeInput = document.getElementById("input-med-time");
    const doseInput = document.getElementById("input-med-dose");

    const nameVal = nameInput.value.trim();
    const timeVal = timeInput.value.trim();
    const doseVal = doseInput.value.trim();

    let hasError = false;

    if (!nameVal) {
      showFieldError("input-med-name", "err-med-name", t("errNameRequired"));
      hasError = true;
    }
    if (!timeVal) {
      showFieldError("input-med-time", "err-med-time", t("errTimeRequired"));
      hasError = true;
    }
    if (!doseVal) {
      showFieldError("input-med-dose", "err-med-dose", t("errDoseRequired"));
      hasError = true;
    }

    if (hasError) {
      const errBox = document.getElementById("form-error-box");
      document.getElementById("form-error-text").textContent = t("errSummary");
      errBox.classList.remove("hidden");
      if (!nameVal) nameInput.focus();
      else if (!timeVal) timeInput.focus();
      else doseInput.focus();
      return;
    }

    const newMed = {
      id: "med-" + Date.now(),
      name: nameVal,
      nameUr: nameVal,
      note: "",
      noteUr: "",
      time: timeVal,
      dose: doseVal,
      doseUr: doseVal,
      visual: selectedVisual,
      status: "upcoming"
    };

    appState.medicines.push(newMed);
    saveAppState(appState);

    // Reset inputs for next time
    nameInput.value = "";
    timeInput.value = "20:00";

    MediAudio.playSuccessTone();
    navigateTo("home");

    showToast(t("toastSaved"), function () {
      appState.medicines = appState.medicines.filter(function (m) { return m.id !== newMed.id; });
      saveAppState(appState);
      renderHome();
      showToast(t("toastUndone"));
    });
  }

  function showFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errorId);
    if (input) input.classList.add("input-invalid");
    if (err) {
      err.textContent = message;
      err.classList.remove("hidden");
    }
  }

  // =========================================================================
  // SCREEN 4: REMINDER ALERT
  // =========================================================================
  let lastReminderUndoFn = null;

  function renderReminderScreen(medId, isReAlert) {
    const activeView = document.getElementById("reminder-active-view");
    const doneView = document.getElementById("reminder-done-view");
    const helperView = document.getElementById("helper-alert-view");
    const snoozeBanner = document.getElementById("snooze-banner");
    const badgeEl = document.getElementById("reminder-badge-text");

    activeView.classList.remove("hidden");
    doneView.classList.add("hidden");
    helperView.classList.add("hidden");

    let med = medId ? appState.medicines.find(function (m) { return m.id === medId; }) : null;
    if (!med) {
      med = findNextReminderMedicine();
    }
    if (!med) {
      navigateTo("home");
      return;
    }

    activeReminderMedId = med.id;

    document.getElementById("reminder-visual-box").innerHTML = getMedicineSVG(med.visual, 76);
    document.getElementById("reminder-med-name").textContent = getMedDisplayName(med);
    document.getElementById("reminder-med-note").textContent = getMedDisplayNote(med);
    document.getElementById("reminder-med-time").textContent = formatTimeWithPeriod(med.time);
    document.getElementById("reminder-med-dose").textContent = getMedDisplayDose(med);

    if (isReAlert) {
      badgeEl.textContent = t("reminderRepeatHeading");
      snoozeBanner.classList.remove("hidden");
      document.getElementById("snooze-banner-text").textContent = t("reAlertMessage");
      MediAudio.playReminderChime();
    } else if (med.status === "snoozed") {
      badgeEl.textContent = t("reminderHeading");
      snoozeBanner.classList.remove("hidden");
      document.getElementById("snooze-banner-text").textContent = t("snoozeMessage");
    } else {
      badgeEl.textContent = t("reminderHeading");
      snoozeBanner.classList.add("hidden");
      MediAudio.playReminderChime();
    }
  }

  function handleReminderTaken() {
    const med = appState.medicines.find(function (m) { return m.id === activeReminderMedId; });
    if (!med) return;

    lastReminderUndoFn = markMedicineStatus(med.id, "taken", false);

    document.getElementById("reminder-active-view").classList.add("hidden");
    document.getElementById("helper-alert-view").classList.add("hidden");
    document.getElementById("reminder-done-view").classList.remove("hidden");

    document.getElementById("done-detail-text").textContent = t("doneDetailTemplate", {
      name: getMedDisplayName(med),
      dose: getMedDisplayDose(med)
    });
  }

  function handleReminderSnooze() {
    const med = appState.medicines.find(function (m) { return m.id === activeReminderMedId; });
    if (!med) return;

    med.status = "snoozed";
    saveAppState(appState);
    renderHome();

    const snoozeBanner = document.getElementById("snooze-banner");
    snoozeBanner.classList.remove("hidden");
    document.getElementById("snooze-banner-text").textContent = t("snoozeMessage");
  }

  function handleSimulate10MinReAlert() {
    renderReminderScreen(activeReminderMedId, true);
  }

  function handleSimulateMissedHelperAlert() {
    const med = appState.medicines.find(function (m) { return m.id === activeReminderMedId; });
    if (!med) return;

    markMedicineStatus(med.id, "missed", false);

    document.getElementById("reminder-active-view").classList.add("hidden");
    document.getElementById("reminder-done-view").classList.add("hidden");
    document.getElementById("helper-alert-view").classList.remove("hidden");

    const timeLabel = formatTimeWithPeriod(med.time);
    document.getElementById("helper-alert-detail").textContent = t("helperDetailTemplate", {
      name: getMedDisplayName(med),
      time: timeLabel
    });
    document.getElementById("helper-sms-preview").textContent = t("helperSmsTemplate", {
      name: getMedDisplayName(med),
      time: timeLabel
    });
  }

  // =========================================================================
  // SCREEN 5: HISTORY RENDERING
  // =========================================================================
  function renderHistory() {
    const statsEl = document.getElementById("history-stats-row");
    const listEl = document.getElementById("history-list");
    if (!statsEl || !listEl) return;

    const totalTaken = appState.history.filter(function (h) { return h.status === "taken"; }).length;
    const totalMissed = appState.history.filter(function (h) { return h.status === "missed"; }).length;

    statsEl.innerHTML = `
      <div class="stat-box stat-box-taken">
        <span class="stat-number">${totalTaken}</span>
        <span class="stat-label">✓ ${escapeHtml(t("statTakenLabel"))}</span>
      </div>
      <div class="stat-box stat-box-missed">
        <span class="stat-number">${totalMissed}</span>
        <span class="stat-label">✕ ${escapeHtml(t("statMissedLabel"))}</span>
      </div>
    `;

    const filtered = appState.history.filter(function (item) {
      if (historyFilter === "all") return true;
      return item.status === historyFilter;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="empty-state-box">${escapeHtml(t("historyEmpty"))}</div>`;
      return;
    }

    // Group entries by dateISO descending (Today -> Yesterday -> Older)
    const groups = {};
    filtered.forEach(function (item) {
      if (!groups[item.dateISO]) groups[item.dateISO] = [];
      groups[item.dateISO].push(item);
    });

    const sortedDates = Object.keys(groups).sort(function (a, b) {
      return b.localeCompare(a);
    });

    listEl.innerHTML = sortedDates.map(function (dateISO) {
      const items = groups[dateISO].slice().sort(function (a, b) {
        return (a.time || "").localeCompare(b.time || "");
      });

      const cardsHtml = items.map(function (item) {
        const isTaken = item.status === "taken";
        const pillClass = isTaken ? "status-pill-taken" : "status-pill-missed";
        const pillIcon = isTaken ? "✓" : "✕";
        const pillText = isTaken ? t("statusTaken") : t("statusMissed");

        return `
          <div class="history-card">
            <div class="history-card-info">
              <p class="history-med-name">${escapeHtml(getMedDisplayName(item))}</p>
              <p class="history-med-meta">${escapeHtml(formatTimeWithPeriod(item.time))} • ${escapeHtml(getMedDisplayDose(item))}</p>
            </div>
            <span class="status-pill ${pillClass}">
              <span aria-hidden="true">${pillIcon}</span>
              <span>${escapeHtml(pillText)}</span>
            </span>
          </div>
        `;
      }).join("");

      return `
        <section class="history-date-group">
          <h3 class="history-date-heading">${escapeHtml(formatDateHeading(dateISO))}</h3>
          ${cardsHtml}
        </section>
      `;
    }).join("");
  }

  // =========================================================================
  // Utility
  // =========================================================================
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // =========================================================================
  // Event Wiring & Initialization
  // =========================================================================
  function initVisualThumbnails() {
    document.querySelectorAll("[data-render-icon]").forEach(function (el) {
      const type = el.getAttribute("data-render-icon");
      el.innerHTML = getMedicineSVG(type, 30);
    });
  }

  function bindEvents() {
    // Language selection buttons (Welcome + Help)
    document.querySelectorAll("[data-lang-select]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang-select"));
      });
    });

    // Quick toggle buttons on Home & History top bars
    ["btn-toggle-lang-home", "btn-toggle-lang-history"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", function () {
          setLanguage(appState.language === "en" ? "ur" : "en");
        });
      }
    });

    // Screen 1: Welcome
    document.getElementById("btn-start-app").addEventListener("click", function () {
      navigateTo("home");
    });

    document.getElementById("btn-welcome-help").addEventListener("click", openHelpModal);

    // Back buttons
    document.getElementById("btn-home-back").addEventListener("click", function () {
      navigateTo("welcome");
    });
    document.getElementById("btn-add-back").addEventListener("click", goBack);
    document.getElementById("btn-reminder-back").addEventListener("click", goBack);
    document.getElementById("btn-history-back").addEventListener("click", goBack);

    // Help modal triggers
    ["btn-help-home", "btn-help-add", "btn-help-history"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", openHelpModal);
    });
    document.getElementById("btn-close-help").addEventListener("click", closeHelpModal);
    document.getElementById("modal-help").addEventListener("click", function (e) {
      if (e.target.id === "modal-help") closeHelpModal();
    });

    // Voice Guide in Help Modal
    document.getElementById("btn-play-voice-guide").addEventListener("click", function () {
      MediAudio.speak(t("voiceGuideScript"), appState.language);
    });

    // Text Size buttons in Help Modal
    document.querySelectorAll("[data-text-size]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        appState.textSize = btn.getAttribute("data-text-size");
        saveAppState(appState);
        applyTextSize();
      });
    });

    // Reset Demo Data button in Help Modal
    document.getElementById("btn-reset-demo").addEventListener("click", function () {
      closeHelpModal();
      openConfirmModal(
        t("confirmResetTitle"),
        t("confirmResetBody"),
        t("confirmYesReset"),
        function () {
          const currentLang = appState.language;
          const currentSize = appState.textSize;
          appState = createDefaultDemoState();
          appState.language = currentLang;
          appState.textSize = currentSize;
          saveAppState(appState);
          renderHome();
          renderHistory();
          showToast(t("toastDemoReset"));
        }
      );
    });

    // Bottom Navigation
    document.querySelectorAll("[data-nav]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const dest = btn.getAttribute("data-nav");
        navigateTo(dest);
      });
    });

    // Home Actions
    document.getElementById("btn-go-add").addEventListener("click", function () {
      navigateTo("add");
    });

    document.getElementById("btn-open-reminder").addEventListener("click", function () {
      const nextMed = findNextReminderMedicine();
      navigateTo("reminder", { medId: nextMed ? nextMed.id : null });
    });

    // Delegated card actions on Home list
    document.getElementById("home-medicine-list").addEventListener("click", function (e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      const action = btn.getAttribute("data-action");
      const medId = btn.getAttribute("data-med-id");

      if (action === "quick-taken") {
        markMedicineStatus(medId, "taken", true);
      } else if (action === "open-alert") {
        navigateTo("reminder", { medId: medId });
      } else if (action === "delete-med") {
        deleteMedicineWithConfirm(medId);
      }
    });

    // Add Medicine Form & Chips
    document.getElementById("add-medicine-form").addEventListener("submit", handleAddMedicineSubmit);

    document.querySelectorAll("[data-time-preset]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll("[data-time-preset]").forEach(function (c) {
          c.classList.remove("active");
        });
        chip.classList.add("active");
        document.getElementById("input-med-time").value = chip.getAttribute("data-time-preset");
      });
    });

    document.querySelectorAll("[data-dose-preset]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll("[data-dose-preset]").forEach(function (c) {
          c.classList.remove("active");
        });
        chip.classList.add("active");
        document.getElementById("input-med-dose").value = chip.textContent.trim();
      });
    });

    document.querySelectorAll("[data-visual]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        document.querySelectorAll("[data-visual]").forEach(function (c) {
          c.classList.remove("active");
        });
        chip.classList.add("active");
        selectedVisual = chip.getAttribute("data-visual");
      });
    });

    // Screen 4: Reminder Alert Actions
    document.getElementById("btn-reminder-taken").addEventListener("click", handleReminderTaken);
    document.getElementById("btn-reminder-later").addEventListener("click", handleReminderSnooze);
    document.getElementById("btn-sim-10min").addEventListener("click", handleSimulate10MinReAlert);
    document.getElementById("btn-sim-missed").addEventListener("click", handleSimulateMissedHelperAlert);

    document.getElementById("btn-speak-reminder").addEventListener("click", function () {
      const med = appState.medicines.find(function (m) { return m.id === activeReminderMedId; });
      if (!med) return;
      const script = t("reminderVoiceScript", {
        name: getMedDisplayName(med),
        dose: getMedDisplayDose(med)
      });
      MediAudio.speak(script, appState.language);
    });

    document.getElementById("btn-done-home").addEventListener("click", function () {
      navigateTo("home");
    });
    document.getElementById("btn-done-history").addEventListener("click", function () {
      navigateTo("history");
    });
    document.getElementById("btn-done-undo").addEventListener("click", function () {
      if (typeof lastReminderUndoFn === "function") {
        lastReminderUndoFn();
        lastReminderUndoFn = null;
      }
      renderReminderScreen(activeReminderMedId, false);
    });

    document.getElementById("btn-helper-home").addEventListener("click", function () {
      navigateTo("home");
    });
    document.getElementById("btn-helper-history").addEventListener("click", function () {
      navigateTo("history");
    });

    // Screen 5: History Filter
    document.querySelectorAll("[data-history-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll("[data-history-filter]").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        historyFilter = btn.getAttribute("data-history-filter");
        renderHistory();
      });
    });

    // Toast Undo
    document.getElementById("toast-undo-btn").addEventListener("click", function () {
      if (typeof lastUndoAction === "function") {
        const fn = lastUndoAction;
        hideToast();
        fn();
      }
    });

    // Confirm Modal buttons
    document.getElementById("btn-confirm-yes").addEventListener("click", function () {
      const action = pendingConfirmAction;
      closeConfirmModal();
      if (typeof action === "function") action();
    });
    document.getElementById("btn-confirm-no").addEventListener("click", closeConfirmModal);
    document.getElementById("modal-confirm").addEventListener("click", function (e) {
      if (e.target.id === "modal-confirm") closeConfirmModal();
    });
  }

  function openHelpModal() {
    document.getElementById("modal-help").classList.remove("hidden");
  }

  function closeHelpModal() {
    MediAudio.stopSpeaking();
    document.getElementById("modal-help").classList.add("hidden");
  }

  // Boot the prototype
  document.addEventListener("DOMContentLoaded", function () {
    initVisualThumbnails();
    bindEvents();
    applyTextSize();
    applyLanguageAndDir();
  });
})();

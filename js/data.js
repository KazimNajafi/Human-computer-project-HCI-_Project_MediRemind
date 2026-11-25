/**
 * MediRemind — Sample Demo Data & Local Storage Management
 *
 * Clearly identified as DEMO DATA for the HCI interactive prototype.
 * Sample medicines align with the illustrative persona (elderly user taking
 * daily blood pressure & diabetes medicines) while keeping "Panadol at 8 pm"
 * available to add cleanly during Usability Testing Task #2.
 */

const STORAGE_KEY = "mediremind_hci_prototype_v1";

/**
 * Helper to return an ISO date string (YYYY-MM-DD) offset by N days from today.
 */
function getDateOffsetISO(daysOffset) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Fresh default demo data.
 */
function createDefaultDemoState() {
  const today = getDateOffsetISO(0);
  const yesterday = getDateOffsetISO(-1);
  const twoDaysAgo = getDateOffsetISO(-2);

  return {
    language: "en",
    textSize: "normal",
    medicines: [
      {
        id: "demo-med-1",
        name: "Glucophage",
        nameUr: "گلوکوفیج (شوگر)",
        note: "Blood Sugar (Demo)",
        noteUr: "شوگر کی دوائی (ڈیمو)",
        time: "08:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        visual: "tablet-white",
        status: "taken" // taken | due | upcoming | snoozed | missed
      },
      {
        id: "demo-med-2",
        name: "Norvasc",
        nameUr: "نارویسک (بلڈ پریشر)",
        note: "Blood Pressure (Demo)",
        noteUr: "بلڈ پریشر کی دوائی (ڈیمو)",
        time: "13:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        visual: "tablet-round",
        status: "due"
      },
      {
        id: "demo-med-3",
        name: "Vitamin D",
        nameUr: "وٹامن ڈی",
        note: "Daily Supplement (Demo)",
        noteUr: "روزانہ وٹامن (ڈیمو)",
        time: "18:00",
        dose: "1 Capsule",
        doseUr: "1 کیپسول",
        visual: "capsule-teal",
        status: "upcoming"
      }
    ],
    history: [
      {
        id: "hist-today-1",
        medId: "demo-med-1",
        dateISO: today,
        name: "Glucophage",
        nameUr: "گلوکوفیج (شوگر)",
        time: "08:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        status: "taken"
      },
      {
        id: "hist-yest-1",
        medId: "demo-med-1",
        dateISO: yesterday,
        name: "Glucophage",
        nameUr: "گلوکوفیج (شوگر)",
        time: "08:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        status: "taken"
      },
      {
        id: "hist-yest-2",
        medId: "demo-med-2",
        dateISO: yesterday,
        name: "Norvasc",
        nameUr: "نارویسک (بلڈ پریشر)",
        time: "13:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        status: "taken"
      },
      {
        id: "hist-yest-3",
        medId: "demo-med-3",
        dateISO: yesterday,
        name: "Vitamin D",
        nameUr: "وٹامن ڈی",
        time: "18:00",
        dose: "1 Capsule",
        doseUr: "1 کیپسول",
        status: "missed"
      },
      {
        id: "hist-2days-1",
        medId: "demo-med-1",
        dateISO: twoDaysAgo,
        name: "Glucophage",
        nameUr: "گلوکوفیج (شوگر)",
        time: "08:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        status: "taken"
      },
      {
        id: "hist-2days-2",
        medId: "demo-med-2",
        dateISO: twoDaysAgo,
        name: "Norvasc",
        nameUr: "نارویسک (بلڈ پریشر)",
        time: "13:00",
        dose: "1 Tablet",
        doseUr: "1 گولی",
        status: "taken"
      }
    ]
  };
}

/**
 * Load saved state from localStorage, or initialize with fresh demo data.
 */
function loadAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaults = createDefaultDemoState();
      saveAppState(defaults);
      return defaults;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.medicines) || !Array.isArray(parsed.history)) {
      throw new Error("Invalid saved prototype state");
    }
    return parsed;
  } catch (_err) {
    const defaults = createDefaultDemoState();
    saveAppState(defaults);
    return defaults;
  }
}

/**
 * Save state safely to localStorage.
 */
function saveAppState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_err) {
    // Ignore storage quota errors in restricted browser modes
  }
}

/**
 * Clean flat SVG visuals for medicines so elderly users can recognize
 * pill/capsule/syrup shapes easily (Heuristic 6: Recognition rather than recall).
 */
function getMedicineSVG(visualType, size) {
  const s = size || 40;
  switch (visualType) {
    case "capsule-teal":
      return `
        <svg viewBox="0 0 64 64" width="${s}" height="${s}" fill="none" aria-hidden="true">
          <g transform="rotate(-35 32 32)">
            <rect x="12" y="21" width="40" height="22" rx="11" fill="#FFFFFF" stroke="#0F5C5C" stroke-width="3"/>
            <path d="M32 21H41C47.0751 21 52 25.9249 52 32C52 38.0751 47.0751 43 41 43H32V21Z" fill="#0F5C5C"/>
          </g>
        </svg>`;
    case "tablet-round":
      return `
        <svg viewBox="0 0 64 64" width="${s}" height="${s}" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="20" fill="#E6F2F2" stroke="#0F5C5C" stroke-width="3.2"/>
          <line x1="18" y1="32" x2="46" y2="32" stroke="#0F5C5C" stroke-width="3" stroke-linecap="round"/>
        </svg>`;
    case "syrup-bottle":
      return `
        <svg viewBox="0 0 64 64" width="${s}" height="${s}" fill="none" aria-hidden="true">
          <rect x="24" y="10" width="16" height="8" rx="3" fill="#0F5C5C"/>
          <rect x="19" y="18" width="26" height="36" rx="7" fill="#E8F5EC" stroke="#1B6E3A" stroke-width="3"/>
          <rect x="23" y="28" width="18" height="14" rx="3" fill="#FFFFFF" stroke="#1B6E3A" stroke-width="2"/>
          <path d="M32 31V39M28 35H36" stroke="#1B6E3A" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;
    case "tablet-white":
    default:
      return `
        <svg viewBox="0 0 64 64" width="${s}" height="${s}" fill="none" aria-hidden="true">
          <rect x="10" y="21" width="44" height="22" rx="11" fill="#FFFFFF" stroke="#0F5C5C" stroke-width="3.2"/>
          <line x1="32" y1="22" x2="32" y2="42" stroke="#0F5C5C" stroke-width="2.5"/>
        </svg>`;
  }
}

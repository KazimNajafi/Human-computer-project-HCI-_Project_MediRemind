# MediRemind — Medicine Reminder App for Elderly People (HCI Project)

## 1. Project Introduction

**MediRemind** is a user-centered Human-Computer Interaction (HCI) mobile web prototype designed to help elderly people (aged 60+) take their daily medicines on time without confusion or stress.

Many existing medicine reminder apps have small fonts, cluttered screens, complex menus, and English-only interfaces. MediRemind solves these usability issues with large text, big touch buttons, high contrast, one primary task per screen, voice support, and simple **Urdu (RTL)** and **English** language switching.

> **Academic Scope Note:** This is an interactive HCI design prototype built for university coursework, usability testing, and heuristic evaluation. It uses clearly labeled **sample demo data** stored locally in your browser (`localStorage`). It does **not** provide medical advice, prescriptions, or background alarm notifications when the browser is closed.

---

## 2. Project Objectives

Aligned with the HCI project specification:
1. Identify the real difficulties elderly people face with taking daily medicines and using smartphone apps.
2. Design a simple, warm, accessible medicine reminder interface with large text, high contrast, and minimal steps.
3. Build a working, clickable interactive prototype covering all **5 main screens**.
4. Provide structured templates to run real usability tests with **3 to 5 elderly users** and compute real **SUS (System Usability Scale)** scores.
5. Evaluate the prototype against **Nielsen's 10 Usability Heuristics** and document improvements (Version 1 → Version 2).

---

## 3. Technology Used

- **HTML5** — Clean semantic structure for all five screens and accessible dialogs (`index.html`).
- **CSS3** — Mobile-first layout, high-contrast elderly-friendly color palette, Extra Large text mode, and full Urdu Right-to-Left (`dir="rtl"`) styling (`css/styles.css`).
- **Vanilla JavaScript** — Screen navigation, bilingual switching, medicine form validation, Taken/Snooze/Undo actions, and History tracking (`js/`).
- **Browser `localStorage`** — Preserves demo medicines, history, language choice, and text size across page reloads without needing a backend server.
- **Web Audio API & Web Speech API** — Plays a gentle reminder chime and optional spoken voice guide directly in the browser.

No external frameworks or build tools are required.

---

## 4. How to Run the Project

### Option A: Easiest Way (No Installation Required)
1. Open the `HCI_Project` folder on your computer.
2. Double-click **`index.html`** to open it in Chrome, Edge, or Firefox.
3. You can use it immediately offline (internet is only needed to load Google Fonts; clean system fallback fonts are included if offline).

### Option B: Run on a Local Server (Recommended for Testing on a Phone)
If you want to open the prototype on a real smartphone during usability testing:
1. Open a terminal in the `HCI_Project` folder.
2. Run a simple local server, for example:
   - With Python: `python -m http.server 8000`
   - Or with VS Code: install the **Live Server** extension and click **Go Live**.
3. Open `http://localhost:8000` in your browser (or your computer's local IP address on a phone connected to the same Wi-Fi).

---

## 5. Project Structure

```text
HCI_Project/
├── index.html                        # All 5 screens + Help & Confirm dialogs
├── css/
│   └── styles.css                    # Elderly-friendly styles, high contrast & Urdu RTL
├── js/
│   ├── translations.js               # Complete English & simple Urdu text dictionary
│   ├── data.js                       # Sample demo data, localStorage helpers & pill SVGs
│   ├── audio.js                      # Soft reminder chime & Voice Guide (Web Speech API)
│   └── app.js                        # Navigation, Add/Taken/Snooze/Undo/History logic
├── screenshots/                      # Screenshots of all 5 screens for your report
└── documentation/
    ├── README.md                     # Project overview & running instructions
    ├── PROJECT_EXPLANATION.md        # Beginner-friendly English + Roman Urdu explanation
    ├── HCI_CONCEPTS.md               # Key HCI concepts with MediRemind examples
    ├── VIVA_PREPARATION.md           # 28 viva questions with English & Roman Urdu answers
    ├── USER_RESEARCH_TEMPLATE.md     # 5 interview forms, consent, findings & personas
    ├── USABILITY_TESTING.md          # 4 test tasks, think-aloud guide, SUS form & tables
    ├── HEURISTIC_EVALUATION.md       # Nielsen's 10 heuristics evaluation checklist
    └── PRESENTATION_GUIDE.md         # 8-slide, 10-minute presentation script & notes
```

---

## 6. Main Features

1. **Screen 1 — Welcome / Login:** Clean MediRemind branding, warm greeting, large Urdu / English language cards, large **Start** button, and quick access to the Help & Voice Guide.
2. **Screen 2 — Home:** Today's date, daily progress summary, clearly labeled **Demo Data** tag, today's medicines with familiar time periods (*Subah, Dopahar, Shaam, Raat*), one-tap **Taken** button, delete confirmation, Undo toast, and a large **Add Medicine** button.
3. **Screen 3 — Add Medicine:** Simple 3-step form (Name, Time with quick chips + time picker, Dose with quick chips) plus optional visual pill shape, clear human-friendly validation messages, and confirmation toast after saving.
4. **Screen 4 — Reminder Alert:** Large medicine name, recognizable medicine visual, voice read-aloud (**Listen**), extra-large green **Taken** button, smaller **Remind Me Later (10 min)** button, **Well Done!** confirmation with Undo, plus honest prototype buttons to simulate a 10-minute re-alert or a missed-dose Family Helper Alert preview.
5. **Screen 5 — History:** Date-wise medicine records (*Today*, *Yesterday*, *2 Days Ago*), filter buttons (*All / Taken / Missed*), summary counts, and clear green **✓ Taken** and red **✕ Missed** labels with icons (never relying on color alone).
6. **Help & Accessibility Dialog:** Spoken Voice Guide, simple 4-step instructions, Text Size toggle (*Large* / *Extra Large*), language toggle, and a **Reset Sample Demo Data** button for clean usability testing between participants.

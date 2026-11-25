# MediRemind — 8-Slide Presentation Guide (~10 Minutes)

This presentation structure follows **Section 11 of your HCI Project PDF** (*10 minutes, about 8 slides*). Practice speaking through all 8 slides **at least 3 times** before presentation day, and record a short backup screen-video of your prototype in case of technical issues!

---

## Slide-by-Slide Plan & Speaker Notes

### Slide 1: Problem Statement & Project Overview (~1 min)
- **What to put on the slide:**
  - Title: **MediRemind — Medicine Reminder App for Elderly People**
  - Your Name, Roll Number, Course (HCI), Teacher Name, Date.
  - 3 short bullets:
    - Elderly people (60+) take multiple daily medicines and often forget doses.
    - Existing apps use tiny text, English-only screens, and complex menus.
    - **Aim:** Design a simple, Urdu-friendly, accessible medicine reminder app elderly users can use independently.
- **Speaker Notes (English):**
  > *"Assalam-o-Alaikum everyone. Today I am presenting MediRemind, an HCI project designed for elderly people aged 60 and above. Many seniors take 3 to 5 daily medicines and frequently forget their evening doses. Existing reminder apps are hard for them because of small text, English-only interfaces, and confusing steps. Our aim was to design a simple, Urdu-friendly prototype they can use without help."*
- **Roman Urdu Tip:** Pehle slide par pur-etemaad tareeqay se problem batayein—kyunki teacher sab se pehle ye dekhte hain ke masla asli aur clear hai ya nahi.

---

### Slide 2: Users & User Research (~1 min 15 sec)
- **What to put on the slide:**
  - Primary users: Elderly people (60+) | Secondary users: Family helpers.
  - Interview method: 5 elderly interviews, 10 open-ended questions, 10–15 minutes each, consent taken.
  - **5 to 8 Key Findings** *(fill in your REAL interview findings from `USER_RESEARCH_TEMPLATE.md` here!)*.
- **Speaker Notes (English):**
  > *"Following User-Centered Design, we started by talking to real users instead of guessing. We interviewed 5 elderly participants aged 60+ using 10 open-ended questions. From our interviews, our main findings were [read your 3–4 strongest real findings, e.g., eyesight/small text, language preference, forgetting evening doses]."*
- **Roman Urdu Tip:** Agar aap ne 5 asli interviews kar liye hain to un ke asli points zaroor batayein (jaisay *"5 mein se 4 logon ne kaha text chhota hota hai"*).

---

### Slide 3: Personas (~1 min)
- **What to put on the slide:**
  - Side-by-side summary cards of your **2 Personas** (Main Elderly User + Family Helper): Name, Age, Tech Skill, Goal, Main Problem, Key Need, and 1 short Quote.
- **Speaker Notes (English):**
  > *"Based on our research, we created two personas. First is our primary user [Persona 1 Name, Age], who takes multiple medicines daily, struggles with small English text, and wants to manage medicines independently. Second is [Persona 2 Name], a working family member who wants peace of mind knowing their parent didn't miss a dose."*

---

### Slide 4: HCI Design Rules & Nielsen's Heuristics (~1 min 30 sec)
- **What to put on the slide:**
  - Elderly accessibility rules applied:
    - Body text `19px+` (Extra Large `22px` mode), headings `26px+`.
    - Buttons `52px–78px` tall (exceeding `48×48px` rule).
    - High contrast warm palette (only 3 colors: Deep Teal, Forest Green, Brick Red).
    - Urdu (RTL) + English, icons ALWAYS with words, no hidden menus.
  - Highlight 4–5 concrete examples of **Nielsen's 10 Heuristics** (e.g., *Subah/Dopahar/Shaam*, *"Are you sure?"* before delete, *Undo*, *1-tap Taken*, *Help Voice Guide*).
- **Speaker Notes (English):**
  > *"Every visual choice in MediRemind follows elderly accessibility guidelines and Nielsen's 10 Usability Heuristics. We kept body text at 19 pixels minimum, buttons larger than 48 by 48 pixels, and only 3 high-contrast colors. We never rely on color alone—green always pairs with a checkmark and 'Taken', and red pairs with a cross and 'Missed'. We also use familiar words like Subah, Dopahar, and Shaam."*

---

### Slide 5: Live Interactive Prototype Demo (~2 min 30 sec)
- **What to put on the slide:**
  - Screenshots of all 5 screens (`screenshots/01_welcome.png` through `05_history.png`) as a clean visual strip, then switch to your browser to click through `index.html` live!
- **Live Demo Script (Follow the exact User Flows!):**
  1. **Welcome Screen:** Show English ↔ **اردو (RTL)** switch, then switch to preferred demo language and press **Start** (1 tap).
  2. **Home Screen:** Point out today's date, progress bar, clearly labeled **Demo Data**, and *Subah / Dopahar / Shaam* labels.
  3. **Add Medicine Flow:** Tap **+ Add Medicine**, first tap Save empty to show clear error validation (*Heuristic 9*), then enter **Panadol**, tap **Raat (8:00 PM)**, tap **Save Medicine** → show `"Medicine saved!"` toast + Undo.
  4. **Reminder Alert Flow:** Open **Alert**, show huge pill icon, **Listen** voice button, tap **Remind Me Later** / **Simulate 10 Min Re-Alert**, then press the huge green **Taken** button → show **"Well Done!"** confirmation.
  5. **History Screen:** Open **History**, show today's new **✓ Taken** record plus **Yesterday's** green Taken and red Missed records.
  6. **Help Button:** Briefly open **? Help** to show Voice Guide and Extra Large text toggle.
- **Speaker Notes Tip:** Keep `index.html` open in a browser tab before your turn starts, AND keep a 60-second screen recording ready as backup!

---

### Slide 6: Usability Testing & Results (~1 min 15 sec)
- **What to put on the slide:**
  - Tested with `3 to 5` real elderly users using Think-Aloud method.
  - The 4 test tasks (See due medicine, Add Panadol at 8 pm, Tap Taken, Check yesterday's History).
  - Your real **Task Success Rate Table** and **Average SUS Score** *(fill from `USABILITY_TESTING.md` after testing)*.
- **Speaker Notes (English):**
  > *"We tested our prototype with [number] elderly users using 4 realistic tasks and the Think-Aloud protocol. We reassured each participant that we were testing the app, not them. Our task success rates were [state real numbers], and our average SUS usability score was [state real score] out of 100—where above 68 is above average."*

---

### Slide 7: Evaluation & Improvements (Version 1 → Version 2) (~1 min)
- **What to put on the slide:**
  - Heuristic Evaluation summary (e.g., 9 Pass, 1 Needs Work on offline Urdu voice).
  - Top 2–3 real problems found during usability testing.
  - **Before & After** comparison showing what you improved in **Version 2**.
- **Speaker Notes (English):**
  > *"Testing with real users revealed practical issues we wouldn't have noticed alone. For example, [mention 1–2 real observations from your test]. In Version 2, we fixed these by [describe exact UI improvements]. Our heuristic check also highlighted that browser text-to-speech for Urdu varies by device, so bundled audio clips would be better in production."*

---

### Slide 8: Conclusion & Future Work (~45 sec)
- **What to put on the slide:**
  - Key takeaways: Simple, accessible, bilingual UCD design helps elderly users stay independent.
  - Honest scope note: Current work is a browser-based HCI prototype (localStorage demo data, simulated 10-min re-alert).
  - **Future Work / FYP Extension (from PDF):**
    - Flutter / React Native mobile app
    - Firebase / MySQL database + Encryption
    - Real background alarms (Firebase Cloud Messaging)
    - Real SMS / push alerts for family helpers & recorded Urdu voice reminders
- **Speaker Notes (English):**
  > *"To conclude, MediRemind demonstrates how applying user research, accessibility guidelines, and Nielsen's heuristics turns a confusing mobile task into a calm, one-tap experience for elderly users. In the future, this HCI design can directly become Chapter 1 and 2 of an FYP built in Flutter with Firebase and real family notifications. Thank you—I am happy to answer your questions!"*

---

## Pre-Presentation Checklist

- [ ] Prototype opens cleanly in browser (`index.html`) with **Reset Sample Demo Data** already clicked.
- [ ] All 5 screenshots from `screenshots/` inserted into slides and final report.
- [ ] Backup video of prototype walkthrough saved on laptop/USB.
- [ ] Practiced speaking through all 8 slides in ~9–10 minutes.
- [ ] Reviewed `VIVA_PREPARATION.md` (especially SUS formula, Nielsen's 10 heuristics, and color/font choices).

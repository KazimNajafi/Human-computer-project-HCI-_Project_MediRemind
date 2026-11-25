# MediRemind — Complete Project Explanation (English & Roman Urdu)

This guide explains the entire **MediRemind** project in simple English and Roman Urdu so you can understand every part and explain it confidently in your university presentation and viva.

---

## 1. What Does MediRemind Do?

**Simple English:**
MediRemind is an interactive mobile web prototype of a medicine reminder app designed for elderly users (60+). It lets users view today's medicine schedule, add a new medicine in a few taps, respond to a large reminder alert by tapping **Taken** or **Remind Me Later**, switch between **English** and **Urdu**, listen to a simple voice guide, and check past taken or missed medicines in **History**.

**Roman Urdu:**
MediRemind aik aasan medicine reminder app ka interactive prototype hai jo khaas tor par buzurg logon (60 saal ya us se zyada umar) ke liye design kiya gaya hai. Is mein user aaj ki dawaiyan dekh sakta hai, nayi dawai sirf chand taps mein add kar sakta hai, alarm screen par bara **Taken** button daba kar confirm kar sakta hai, **English aur Urdu** ke darmiyan zaban badal sakta hai, awaz mein madad sun sakta hai, aur **History** mein pichli li gayi ya chhooti hui dawaiyan dekh sakta hai.

---

## 2. Why Was It Designed?

**Simple English:**
Many elderly people take 3 to 5 medicines daily (for example, for blood pressure or diabetes) and often forget their evening or afternoon doses. Existing apps like Medisafe or MyTherapy are feature-rich, but elderly users find them difficult because:
- The text is too small to read comfortably.
- Most apps are only in English.
- There are too many menus, icons without words, and complicated steps.

MediRemind was designed using **User-Centered Design** to solve these exact problems with big text, big buttons, simple Urdu/English labels, and one clear task per screen.

**Roman Urdu:**
Bohat se buzurg log rozana 3 se 5 dawaiyan lete hain (jaisay blood pressure aur sugar ki), aur aksar shaam ya dopahar ki dawai bhool jate hain. Mojooda apps mein text bohat chhota hota hai, sirf English hoti hai, aur bohat zyada confusing options hote hain. MediRemind isi maslay ko hal karne ke liye banaya gaya hai taake buzurg baghair kisi ki madad ke aasani se apni dawai yaad rakh sakein.

---

## 3. Who Will Use It?

1. **Primary Users — Elderly People (60+):**
   - Example: Retired parents or grandparents who manage daily medicines, may have weak eyesight, and mostly use only basic phone apps like WhatsApp.
   - *Roman Urdu:* Asal users buzurg log hain jin ki nazar kamzor ho sakti hai aur jo mobile ke sirf basic apps use karte hain.

2. **Secondary Users — Family Members / Helpers:**
   - Example: A working daughter or son who helps set up medicines in the app and wants peace of mind by checking History or seeing a missed-dose alert.
   - *Roman Urdu:* Doosray users ghar ke afraad (beti, beta ya caregiver) hain jo dawai add karne mein madad karte hain aur History dekh kar itminan kar sakte hain ke dawai time par li gayi ya nahi.

---

## 4. How Each of the 5 Screens Works

### Screen 1: Welcome / Login
- **What it shows:** MediRemind logo, short warm welcome message, two large language cards (**English** and **اردو**), a very large **Start** button, and a **Help & Voice Guide** button.
- **Why it is simple:** There is no complicated password or sign-up wall. In **1 tap**, an elderly user selects their language (if needed) and enters the Home screen.
- **Roman Urdu:** Is screen par koi mushkil login ya password nahi hai. User apni pasand ki zaban (Urdu ya English) chunta hai aur bara **Start** button daba kar seedha Home screen par chala jata hai.

### Screen 2: Home (Today's Schedule)
- **What it shows:** Greeting (*Assalam-o-Alaikum*), today's date, a progress bar (*"1 of 4 taken today"*), a large **Add Medicine** button, a **Next Reminder Ready** banner, and today's medicine cards.
- **Each medicine card shows:** A clean pill/capsule/syrup picture, large medicine name, time with familiar word (*Subah, Dopahar, Shaam, Raat*), dose, status badge with color + icon + word (*✓ Taken*, *⏰ Due Now*, *🕒 Upcoming*), a quick green **Taken** button, an **Alert** preview button, and a **Delete** button (which asks *"Are you sure?"*).
- **Roman Urdu:** Home screen par aaj ki tareekh aur aaj ki saari dawaiyan nazar aati hain. Har dawai ke sath Subah/Dopahar/Shaam/Raat likha hai taake samajhna aasan ho. User aik hi tap mein **Taken** daba sakta hai ya **Add Medicine** par ja sakta hai.

### Screen 3: Add Medicine
- **What it shows:** A clean, numbered 3-step form:
  1. **Medicine Name** (e.g., *Panadol*)
  2. **Medicine Time** — Quick preset buttons (*Subah 8:00 AM, Dopahar 1:00 PM, Shaam 6:00 PM, Raat 8:00 PM*) plus a standard time picker.
  3. **Dose** — Quick buttons (*1 Tablet, 2 Tablets, Half Tablet, 1 Spoon*) plus editable text box.
  4. **Medicine Look (Optional)** — Choose White Pill, Capsule, Round Pill, or Syrup so the Reminder Alert shows a familiar visual.
- **Validation:** If the user forgets to type the name or dose, clear red plain-language messages appear (e.g., *"Please write the medicine name."*). After saving, a **"Medicine saved!"** confirmation banner appears with an **Undo** option.
- **Roman Urdu:** Nayi dawai add karne ke liye sirf 3 aasan steps hain: naam likhna, waqt chunna, aur miqdar (dose) select karna. Agar koi khana khali reh jaye to saaf alfaz mein error message aata hai. Save karne par **"Medicine saved!"** ka confirmation milta hai.

### Screen 4: Reminder Alert
- **What it shows:** A distraction-free alert screen with a **Listen** voice button, large pill picture, very large medicine name, time, dose, a **huge green Taken button**, and a **smaller Remind Me Later (10 min)** button.
- **What happens when Taken is pressed:** A cheerful sound plays, a **"Well Done!"** screen appears, the medicine is marked Taken on Home and saved in **History**, and an **Undo** button is available in case the user tapped by mistake.
- **What happens when Remind Me Later is pressed (or ignored):** The status changes to *Remind in 10 min*, and two honest prototype simulation buttons allow you to demonstrate the **10-minute re-alert** or a **Missed Dose — Family Helper Alert preview** during your class presentation without making false claims about background browser alarms.
- **Roman Urdu:** Jab dawai ka waqt hota hai to ye screen khulti hai. Is par dawai ka bara naam aur tasveer hoti hai. Sab se bara button sabz rang ka **Taken** hai. Dabane par **"Well Done!"** likha aata hai aur record **History** mein save ho jata hai. Agar user baad mein lena chahe to **Remind Me Later** daba sakta hai.

### Screen 5: History
- **What it shows:** Summary count boxes (Taken vs Missed), filter buttons (**All**, **✓ Taken**, **✕ Missed**), and date-wise medicine records grouped under **Today**, **Yesterday**, and **2 Days Ago**. Every item uses green **✓ Taken** or red **✕ Missed** badges (icon + color + text).
- **Roman Urdu:** History screen par tareekh ke hisab se (Aaj, Kal, Parson) li gayi aur chhooti hui dawaiyan dikhai deti hain. Sabz rang ke sath **✓ Taken** aur surkh rang ke sath **✕ Missed** likha hota hai taake rang ke sath lafz bhi saaf parhe ja sakein.

---

## 5. How Users Navigate Between Screens

- **No Hidden Menus:** There is no hamburger (`☰`) menu anywhere in the app.
- **Consistent Bottom Navigation Bar:** Present on Home, Add, and History screens with 4 clearly labeled buttons (Icon + Word): **Home**, **Add**, **Alert**, **History**.
- **Consistent Top Back & Help Buttons:** Every inner screen has a visible **Back (`←`)** button on the top corner and a **Help (`?`)** button for voice guidance and text size settings.

### Primary User Flow (Taking Medicine on Time)
1. **Open Application** → Welcome screen (`Start` button, 1 tap).
2. **View Today's Medicines** → Home screen displays due/upcoming medicines.
3. **Receive Reminder Alert** → Screen 4 shows medicine name, visual, time, dose, and plays chime.
4. **Press Taken** → User taps the huge green `Taken` button.
5. **Receive Confirmation** → `"Well Done!"` message appears (with Undo option).
6. **Saved in History** → Record automatically appears under Today in History as green `✓ Taken`.

*(If ignored or snoozed: simulated 10-minute re-alert demonstrates repeating the reminder; if still missed, it logs as red `✕ Missed` and previews the Family Helper Alert.)*

### Secondary User Flow (Adding a New Medicine)
1. On **Home**, tap the large **+ Add Medicine** button (or **Add** in bottom bar).
2. Type the medicine name (e.g., `Panadol`).
3. Tap a familiar time preset (e.g., `Raat (8:00 PM)`) or use the time picker.
4. Keep or tap the dose preset (e.g., `1 Tablet`).
5. Tap the large **Save Medicine** button.
6. App validates inputs → saves to `localStorage` → returns to **Home** showing the new medicine and a `"Medicine saved!"` confirmation toast with **Undo**.

---

## 6. How Medicine Data Is Stored in the Prototype

**Simple English:**
Because this is an HCI prototype (not a hospital backend system), all medicines, history logs, language preference, and text-size settings are saved inside the browser's **`localStorage`** under the key `mediremind_hci_prototype_v1`.
- When you first open the app, it loads **Sample Demo Data** (Glucophage, Norvasc, Vitamin D, plus sample Yesterday & 2 Days Ago history).
- Any medicine you add or mark as Taken stays saved even if you refresh the page.
- Inside **Help → Reset Sample Demo Data**, you can reset everything back to the original sample state before testing with a new user.

**Roman Urdu:**
Ye aik HCI prototype hai, is liye koi backend server ya online database nahi lagaya gaya. Sara demo data browser ke **`localStorage`** mein save hota hai. Pehli baar open karne par 3 sample dawaiyan aur kal/parson ki sample history load hoti hai. Agar aap page refresh karein to aap ki add ki hui dawaiyan mahfooz rehti hain, aur **Help** ke andar **Reset Sample Demo Data** daba kar aap dobara fresh demo start kar sakte hain.

---

## 7. What Each Source File Does

| File | Purpose (Simple English) | Roman Urdu Samajh |
| :--- | :--- | :--- |
| `index.html` | Holds the structure of all 5 screens, buttons, form inputs, bottom navigation, Confirm Delete dialog, and Help modal. | Is file mein app ki saari 5 screens, buttons, form aur popups ka dhancha (structure) mojood hai. |
| `css/styles.css` | Controls the elderly-friendly design: 19px+ body text, 26px+ headings, 52px+ buttons, warm high-contrast colors, Extra Large text mode, and Urdu RTL layout. | Is file mein design, bare fonts, rang (teal, green, red), bare buttons aur Urdu right-to-left styling likhi gayi hai. |
| `js/translations.js` | Stores every English and Urdu word/sentence in one clean `TRANSLATIONS` dictionary so switching languages updates the whole app immediately. | Is mein English aur aasan Urdu ke saare alfaz rakhe gaye hain taake aik click par poori app Urdu ya English ho jaye. |
| `js/data.js` | Creates the clearly labeled demo medicines and history, loads/saves them in `localStorage`, and provides the clean SVG icons for pills, capsules, and syrup. | Ye file sample demo data banati hai, `localStorage` mein save/load karti hai, aur dawaiyon ki saaf SVG tasveerein deti hai. |
| `js/audio.js` | Generates gentle reminder and success tones using the browser's Web Audio API and reads instructions aloud using the Web Speech API. | Ye file baghair kisi audio file ke halka alarm sound bajati hai aur Voice Guide ko awaz mein parh kar sunati hai. |
| `js/app.js` | The "brain" of the app: handles screen navigation, Add Medicine validation, marking Taken, Undo, Delete confirmation, Snooze/10-min simulation, and rendering Home & History. | Ye main controller file hai jo saare buttons, navigation, form validation, Taken/Undo aur History ko chalati hai. |

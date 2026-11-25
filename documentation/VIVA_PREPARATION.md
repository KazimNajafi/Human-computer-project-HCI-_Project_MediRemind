# MediRemind — Viva Preparation Guide (28 Questions & Answers)

Practice reading these questions aloud before your HCI viva. Each answer gives you a **short, confident English answer** to speak to your teacher, followed by a **Roman Urdu explanation** so you truly understand the concept.

---

### Q1. Why did you choose this project (MediRemind)?
**English:** Many elderly people aged 60+ take multiple daily medicines and often forget doses. Most existing medicine apps have tiny text, English-only screens, and complicated menus. I chose MediRemind because it solves a real everyday human problem using clear HCI principles.  
**Roman Urdu:** Bohat se buzurg rozana kayi dawaiyan lete hain aur aksar bhool jate hain. Mojooda apps mein text chhota aur sirf English mein hota hai. Maine ye project chuna kyunki ye aik asli insani maslay ko HCI ke usoolon se hal karta hai.

### Q2. Why are elderly people (60+) the primary target users?
**English:** Elderly users have specific physical and cognitive needs—such as weaker eyesight, slower finger precision, and lower comfort with complex smartphone menus. Designing for them clearly demonstrates accessibility and user-centered design.  
**Roman Urdu:** Buzurg logon ki nazar kamzor ho sakti hai aur unhein mushkil mobile menus samajhne mein diqqat hoti hai. Un ke liye design karne se accessibility aur user-centered design bohat achay se saabit hota hai.

### Q3. Who are your secondary users, and how does the app help them?
**English:** Family members or caregivers (such as a working daughter or son) are secondary users. They can quickly add medicines for their parents, check the date-wise History screen in 2 taps, and in a full future version receive a missed-dose alert.  
**Roman Urdu:** Secondary users ghar ke afraad (beti/beta) hain jo dawai add karne mein madad karte hain aur History dekh kar check kar sakte hain ke dawai li gayi ya nahi.

### Q4. Why did you choose these colors (Teal, Green, Red on Warm Off-White)?
**English:** Elderly eyes get tired from harsh glare and too many bright colors. I used only 3 purposeful colors on a warm off-white background (`#FAF8F5`) with very dark text (`#1A1D1E`) for high contrast: Deep Teal (`#0F5C5C`) for calm medical trust, Forest Green (`#1B6E3A`) for Taken/success, and Brick Red (`#B3261E`) for Missed/delete.  
**Roman Urdu:** Zyada chamakdar rang buzurgon ki aankhon ko thaka dete hain. Is liye halka garam safed background aur sirf 3 maqsad wale rang use kiye: Teal (etemaad ke liye), Green (dawai le li), aur Red (chhoot gayi ya delete).

### Q5. Why did you never use color alone to show Taken or Missed?
**English:** Some elderly users have color blindness or reduced color vision. So every status uses three cues together: color + icon + word (`✓ Taken` in green and `✕ Missed` in red).  
**Roman Urdu:** Kuch buzurgon ko rangon ka farq theek se nazar nahi aata, is liye har jagah rang ke sath icon aur lafz (`✓ Taken` / `✕ Missed`) dono lagaye gaye hain.

### Q6. What font sizes and button sizes did you follow, and why?
**English:** Body text is at least 19px (with an Extra Large 22px option), headings are 26px+, and buttons are at least 52px–78px tall—exceeding the 48×48px accessibility minimum—with clear spacing to prevent accidental taps.  
**Roman Urdu:** Aam likhai kam az kam 19px (aur Extra Large mein 22px), headings 26px+, aur buttons 52px se 78px tak bare rakhe hain taake kamzor nazar aur kaanptay haathon se bhi ghalti na ho.

### Q7. Why did you include both Urdu and English?
**English:** Many elderly people in Pakistan are much more comfortable reading Urdu than English, while family helpers or educated seniors may prefer English. Supporting both—including proper Right-to-Left (`dir="rtl"`) layout and readable Urdu fonts—makes the app inclusive.  
**Roman Urdu:** Pakistan mein bohat se buzurg Urdu aasani se parh lete hain jabke kuch log ya un ke bachay English pasand karte hain. Is liye dono zabanein sahih RTL layout ke sath di gayi hain.

### Q8. What is HCI?
**English:** Human-Computer Interaction (HCI) is the field of studying how people interact with technology and designing interfaces that are easy, safe, and enjoyable to use.  
**Roman Urdu:** HCI ye seekhne aur design karne ka ilm hai ke insaan technology ko kis tarah aasani aur sahulat se istemal kar sake.

### Q9. What is Usability?
**English:** Usability measures how easily, quickly, accurately, and satisfactorily a user can achieve their goals with an application.  
**Roman Urdu:** Usability ka matlab hai ke user kisi app par apna kaam kitni aasani, tezi aur baghair ghalti ke poora kar sakta hai.

### Q10. What is Accessibility, and how is it different from Usability?
**English:** Usability is about making a product easy to use for general users; accessibility ensures people with disabilities or age-related challenges (like poor vision or motor difficulties) can also use it effectively.  
**Roman Urdu:** Usability aam aasani ko kehte hain, jabke accessibility ka matlab hai ke nazar, sunai ya haath ki kamzori wale log bhi app ko barabar aasani se use kar sakein.

### Q11. What is a Persona?
**English:** A persona is a fictional user profile built from real interview findings that represents a target user group's goals, problems, tech skills, and needs.  
**Roman Urdu:** Persona aik farzi kirdar hota hai jo asli interviews ki bunyad par banaya jata hai taake pooray design ke dauran user ki zarooriyat yaad rahein.

### Q12. What is User-Centered Design (UCD)?
**English:** UCD is an iterative design approach where we first understand users through research, design for their needs, test prototypes with real users, and refine the design based on their feedback.  
**Roman Urdu:** UCD mein pehle users ko samjha jata hai, phir un ke liye design banaya jata hai, phir un se test karwa kar design ko behtar kiya jata hai.

### Q13. What is a Prototype?
**English:** A prototype is an early, testable model of an application that allows users to click through screens and give feedback before investing time in full production software.  
**Roman Urdu:** Prototype app ka pehla testable namoona hota hai jise click kar ke check kiya jata hai ke design theek kaam kar raha hai ya nahi.

### Q14. What is the difference between Low-Fidelity and High-Fidelity prototypes?
**English:** Low-fidelity prototypes are fast, rough paper sketches used to test layout and flow early. High-fidelity prototypes look and behave closely like the final app with real typography, colors, and interactive clicks—like our MediRemind prototype.  
**Roman Urdu:** Low-fidelity kaghaz par bana rough sketch hota hai, jabke high-fidelity rangon, fonts aur clickable buttons wala mukammal model hota hai jo asli app jaisa dikhta hai.

### Q15. Explain Nielsen's 10 Usability Heuristics with examples from MediRemind.
**English:** Briefly: (1) *Visibility of status* — "Medicine saved!" toast & progress bar; (2) *Match real world* — Subah, Dopahar, Shaam, Raat; (3) *User control* — Back & Undo buttons; (4) *Consistency* — same bottom nav and button colors; (5) *Error prevention* — "Are you sure?" delete confirmation; (6) *Recognition not recall* — pill picture + name on alert; (7) *Efficiency* — 1-tap Taken on Home; (8) *Minimalist design* — 1 main task per screen; (9) *Error recovery* — clear validation like "Please write the medicine name"; (10) *Help* — Help button with Voice Guide.  
**Roman Urdu:** Ye 10 usool hain jo achi app ki pehchan hain: status dikhana, aam zuban (Subah/Dopahar/Shaam), Back aur Undo, har screen par yaksaniyat, delete se pehle tasdeeq, tasveer se pehchan, aik tap par Taken, saada screen, saaf error message, aur aasan Help.

### Q16. How does your Primary User Flow work?
**English:** Step 1: Open Welcome screen and tap Start. Step 2: View today's medicines on Home. Step 3: Reminder Alert appears with medicine name, visual, and sound. Step 4: Tap the very large green Taken button. Step 5: See "Well Done!" confirmation. Step 6: The dose is automatically saved in History.  
**Roman Urdu:** App kholo → Home par aaj ki dawai dekho → Reminder Alert aata hai → Bara green Taken button dabao → "Well Done!" message aata hai → History mein record save ho jata hai.

### Q17. What happens if the user ignores the reminder or taps "Remind Me Later"?
**English:** Tapping "Remind Me Later" updates the medicine status to "Remind in 10 min". Because browser web apps cannot reliably send background alarms when closed, our prototype honestly provides a demo simulation button ("Simulate 10 Min Re-Alert") to demonstrate the 10-minute repeat reminder and missed-dose Helper Alert preview.  
**Roman Urdu:** "Remind Me Later" dabane par status 10 min snooze ho jata hai. Kyunki browser band hone par asli alarm nahi chal sakta, is liye prototype mein imaandari se aik demo simulation button diya gaya hai jo 10 minute baad wala alert aur Helper Alert dikha sakta hai.

### Q18. Why did you avoid a hamburger menu?
**English:** Elderly users often do not recognize the three-line hamburger icon or forget what is hidden inside it. Showing all 4 main tabs (`Home`, `Add`, `Alert`, `History`) with icons and words at the bottom follows *Recognition Rather Than Recall*.  
**Roman Urdu:** Buzurg log chhupay hue hamburger menu ko pehchan nahi paate. Neeche saamne 4 saaf tabs (icon + naam) dikhane se unhein yaad nahi rakhna parta.

### Q19. How did you prevent accidental mistakes in MediRemind?
**English:** Three ways: (1) Big spaced buttons to avoid mis-taps, (2) "Are you sure?" confirmation before deleting a medicine, and (3) an Undo button after Taken, Save, or Delete actions.  
**Roman Urdu:** Teen tareeqon se: bare aur faaslay wale buttons, delete karne se pehle "Are you sure?" popup, aur ghalti ho jane par Undo ka option.

### Q20. What is the Think-Aloud method in Usability Testing?
**English:** Think-aloud means asking test participants to speak their thoughts out loud while performing tasks, so we can understand *why* they hesitate or get confused.  
**Roman Urdu:** Think-aloud mein user app use karte waqt apnay dil ki baat bol kar batata hai ke usay kya samajh aa raha hai aur kahan mushkil ho rahi hai.

### Q21. Why do we tell test users "We are testing the app, not you"?
**English:** Elderly users often feel nervous about technology and blame themselves for mistakes. Reassuring them removes stress and gives us honest feedback about design flaws.  
**Roman Urdu:** Buzurg log aksar ghabra jate hain ke kahin un se ghalti na ho jaye. Unhein ye batane se wo pur-sukoon ho kar app test karte hain.

### Q22. What is SUS (System Usability Scale) and how is it calculated?
**English:** SUS is a standard 10-question usability questionnaire rated from 1 to 5. For odd questions (1, 3, 5, 7, 9), we do `(score - 1)`; for even questions (2, 4, 6, 8, 10), we do `(5 - score)`. Then we sum all 10 results and multiply by `2.5` to get a score from 0 to 100. Above 68 is above average; above 80 is very good.  
**Roman Urdu:** SUS 10 sawalon ka standard scale hai. Odd sawalon mein `(score - 1)` aur even mein `(5 - score)` kar ke sab ko jama karte hain aur `2.5` se zarb dete hain. 68 se upar acha score aur 80 se upar bohat acha score mana jata hai.

### Q23. Why are positive and negative statements mixed in SUS?
**English:** Alternating positive and negative statements ensures the participant reads and thinks carefully instead of clicking "5" for every single question automatically.  
**Roman Urdu:** Positive aur negative sawal mila kar is liye diye jate hain taake user har sawal parh kar jawab de, baghair soche sab par 5 tick na kar de.

### Q24. Why didn't you include fake interview results or fake SUS scores?
**English:** Academic honesty is essential in HCI research. User research and usability test results must come from real elderly participants. Therefore, I prepared clean, structured research and SUS templates ready to record real participant data.  
**Roman Urdu:** HCI research mein farzi results likhna ghalat hai. Asli data asli buzurg logon se lena hota hai, is liye maine mukammal templates tayyar kiye hain jin mein asli results darj kiye jayenge.

### Q25. Why did you build this prototype with HTML, CSS, and Vanilla JS instead of a complex framework?
**English:** HTML, CSS, and Vanilla JavaScript require zero setup, run offline by simply double-clicking `index.html`, have no heavy dependencies, and keep the code clean and easy to maintain for an HCI prototype.  
**Roman Urdu:** HTML, CSS aur simple JavaScript ko chalane ke liye kisi installation ki zaroorat nahi hoti — bas `index.html` double-click karein aur prototype chal parta hai, aur code bhi samajhna aasan hai.

### Q26. How is data stored in this prototype? Does it have a backend?
**English:** No backend server is used because this is an HCI prototype. Demo data is stored locally in the browser using `localStorage`, and there is a Reset Demo Data button inside Help to restore sample medicines between usability tests.  
**Roman Urdu:** Koi backend server nahi hai; ye HCI prototype hai is liye data sirf browser ke `localStorage` mein store hota hai, aur Help mein Reset button bhi hai.

### Q27. What are the limitations of this prototype?
**English:** First, browser reminders only run while the web app is open (no true background OS alarms). Second, there is no real SMS/push notification to family members yet. Third, Urdu text-to-speech quality depends on the voices installed on the user's phone/browser.  
**Roman Urdu:** Pehli limitation ye hai ke browser band hone par alarm nahi baj sakta; doosri ke family member ko asli SMS nahi jata (sirf demo preview hai); teesri ke Urdu voice device ke installed voices par depend karti hai.

### Q28. How would you improve MediRemind in the future (or for an FYP)?
**English:** For a Final Year Project (FYP), I would build a native mobile app in Flutter or React Native, connect it to Firebase/MySQL for cloud sync, add real local & push alarms (Firebase Cloud Messaging), implement real SMS/WhatsApp alerts for family helpers when a dose is missed, add camera photo capture of actual medicine boxes, and secure health data with login and encryption.  
**Roman Urdu:** FYP mein isay Flutter ya React Native mein asli mobile app banaya ja sakta hai, Firebase database aur asli background alarms lagaye ja sakte hain, chhooti hui dawai par family ko asli SMS/notification bheja ja sakta hai, aur asli dawai ke dabbe ki photo aur data encryption shamil ki ja sakti hai.

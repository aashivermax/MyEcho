# MyEcho
# 💙 MyEcho

> **Congressional App Challenge 2026 Submission**  
> **Created by:** Aashi Verma and Hemaprabaa Rajakumar  

MyEcho is a calm, accessible, and human-centered web application designed to bridge the gap between people living with dementia/memory difficulties and the family members or caregivers supporting them. 

---

### ⚠️ Important Note on Prototype Status
**MyEcho is a fully functional front-end web prototype.** 
* The contacts, memory notes, and daily tasks shown in the app are **demonstration examples** to illustrate the user interface and user experience (UX). 
* To ensure user privacy and simplicity, all preferences, checklists, and caregiver notes are stored locally in the browser's `localStorage` rather than sent to an external server or database.

---

### ✨ Key Features

* **Patient Dashboard (`index.html`):**
  * **Daily Checklist:** Interactive routine tasks with live progress tracking and persistent browser storage.
  * **Memory Activities:** Low-stress cognitive exercises like *Memory Match* and *Odd One Out*.
  * **Familiar Contacts:** Quick access cards for trusted family members.
  * **Memory Gallery:** Meaningful personal stories, prompts, and familiar moments.
  * **Text-to-Speech & Accessibility:** Built-in read-aloud support and adjustable text sizing.

* **Caregiver Space (`caregiver.html`):**
  * **Live Synchronization:** Caregivers can add custom reminders and tasks that instantly sync to the patient's daily checklist on that device.
  * **Memory Management:** Easily add new memory cards and photo prompts to the patient's gallery.
  * **Safety & Location:** Set and update familiar safety location reminders.

---

### 💻 Tech Stack & Architecture
MyEcho was built completely from scratch in **VS Code** without heavy frameworks or black-box AI tools:
* **HTML5:** Semantic, accessible layout structuring.
* **CSS3:** Custom responsive styling featuring soft gradients, high-contrast typography, and intuitive mobile-friendly navigation.
* **Vanilla JavaScript (ES6+):** Dynamic screen routing, interactive game logic, and state management via browser `localStorage`.

---

### 🚀 How to Run Locally
1. Clone or download this repository to your computer.
2. Open the folder in **VS Code**.
3. Open `index.html` in your web browser (or use the Live Server extension) to explore the application.

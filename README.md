# 🧠 RequirementIQ
### *From Messy Stakeholder Notes to Structured BRDs — in Seconds*

> An AI-powered Business Requirements Analyzer that transforms raw meeting notes, emails, and stakeholder inputs into structured, professional Business Requirement Documents.

![Status](https://img.shields.io/badge/Status-Live-22c55e?style=flat-square)
![React](https://img.shields.io/badge/React-Frontend-61dafb?style=flat-square&logo=react&logoColor=black)
![Flask](https://img.shields.io/badge/Flask-Backend-000000?style=flat-square&logo=flask&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-Llama_3.3-f55036?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-10b981?style=flat-square)

---

## 🧩 The Business Problem

A Business Analyst spends an average of **30–40% of their time** just converting messy stakeholder inputs into structured documentation.

Meeting notes are scattered. Emails are vague. Stakeholders contradict each other. And somewhere in that chaos, a BA has to extract clear functional requirements, user stories, and acceptance criteria — before development starts.

Mistakes at this stage cost companies thousands in rework.

**RequirementIQ eliminates that bottleneck.**

Paste raw notes. Get a structured, professional requirements breakdown — with ambiguities flagged — in seconds.

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 📋 **Smart Extraction** | Identifies functional & non-functional requirements from unstructured text |
| 📝 **User Story Generator** | Auto-formats requirements as *"As a [user], I want [goal], so that [reason]"* |
| ✅ **Acceptance Criteria** | Generates testable acceptance criteria for key requirements |
| 🚩 **Ambiguity Detector** | Flags vague or conflicting statements that need stakeholder clarification |
| 🎨 **Editorial UI** | A clean, magazine-style interface — not a developer dashboard |

---

## 🖥️ Live Demo

> Paste real stakeholder notes and watch the requirements unfold in real time.

**Try it with this example:**
```
Sarah said the dashboard needs to show sales data. Priya wants export to Excel.
Login takes 4-5 seconds, needs to be faster. Password reset is broken,
users wait 2 days for IT.
```

**What comes back:**
- Functional requirements, each tagged with priority and source
- Non-functional requirements with measurable targets
- User stories in proper "As a... I want... so that..." format
- A dedicated "Needs clarification" section flagging exactly what's still ambiguous

*(Screenshots below — live demo link coming once deployed)*

---

## 🗂️ Project Structure

```
RequirementIQ/
│
├── client/                        # React frontend (Vite)
│   └── src/
│       └── App.jsx                # Editorial split-screen UI
│
├── server/                        # Python backend
│   ├── app.py                     # Flask API
│   └── analyzer.py                # Groq (Llama 3.3) integration + prompt logic
│
├── sample_inputs/
│   └── meeting_notes_example.txt  # Example raw stakeholder input
│
├── sample_outputs/
│   └── BRD_sample_output.md       # Example generated output
│
├── requirements.txt
└── README.md
```

---

## 🧠 How It Works

```
Raw input (meeting notes / emails / transcripts)
        ↓
  [ React Frontend ]   ← User pastes text, clicks Analyze
        ↓
  [ Flask Backend ]    ← Receives request, calls analyzer
        ↓
  [ Groq API — Llama 3.3 70B ]  ← Structured prompt extracts requirements
        ↓
  Parsed JSON → Functional Reqs / User Stories / Ambiguities
        ↓
  [ React Frontend ]   ← Renders editorial-style structured output
```

---

## 📄 Sample Input → Output

**Raw Input:**
```
"The app should let users log in. Admin should be able to see reports.
It needs to be fast. Users want to reset their password somehow.
Finance team needs exports but we're not sure in what format yet."
```

**RequirementIQ Output:**

✅ **Functional Requirements**
- FR-01: The system shall provide user authentication via login
- FR-02: Admin users shall have access to a reporting dashboard
- FR-03: Users shall be able to reset their passwords via a self-service flow

🚩 **Ambiguities Flagged**
- "Fast" — no performance benchmark defined. Clarify expected load time
- Export format unspecified — confirm with Finance team: CSV, Excel, or PDF?

📝 **User Stories Generated**
- As a registered user, I want to log in securely so that I can access my account
- As a user, I want to reset my password so that I can regain access if locked out

---

## 💼 Business Impact

RequirementIQ directly addresses one of the highest-friction tasks in a BA's workflow:

- Reduces requirements drafting time from hours to minutes
- Ensures no requirement is missed from stakeholder conversations
- Creates a consistent, professional documentation format every time
- Flags ambiguities early — before they become expensive development rework

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/RequirementIQ.git
cd RequirementIQ

# Backend setup
cd server
pip install -r requirements.txt
python app.py

# Frontend setup (in a new terminal)
cd client
npm install
npm run dev
```

Add your Groq API key to a `.env` file inside `server/`:
```
GROQ_API_KEY=your_key_here
```

Get a free key at [console.groq.com](https://console.groq.com).

---

## 🛣️ Roadmap

- [x] Project structure & documentation
- [x] Sample input/output defined
- [x] Flask backend with Groq (Llama 3.3) integration
- [x] Prompt engineering for requirement extraction
- [x] React frontend — editorial split-screen UI
- [x] Ambiguity detection layer
- [ ] Deploy live (Vercel + Render)
- [ ] PDF export functionality
- [ ] Voice transcript input support
- [ ] Multi-stakeholder conflict detection

---

## 🛠️ Tech Stack

**Frontend:** React (Vite), custom CSS-in-JS, Fraunces + Inter typography
**Backend:** Flask, Python
**AI:** Groq API — Llama 3.3 70B Versatile
**Dev environment:** GitHub Codespaces

---

## 👩‍💻 About the Author

**Anupriya T.V** — B.Tech Computer Science & Data Science, Presidency University Bengaluru
CSI Chapter President | IEEE Student Coordinator | BEL Process Automation Intern

Passionate about translating data into decisions that non-technical teams can actually use.

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/anupriya-tv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)

---

*Built with React · Flask · Groq API · Llama 3.3*

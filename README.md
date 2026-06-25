# 🧠 RequirementIQ
### *From Messy Stakeholder Notes to Structured BRDs — in Seconds*

> An AI-powered Business Requirements Analyzer that transforms raw meeting notes, emails, and stakeholder inputs into structured, professional Business Requirement Documents.

![Status](https://img.shields.io/badge/Status-In_Development-f59e0b?style=flat-square)
![React](https://img.shields.io/badge/React-Frontend-61dafb?style=flat-square&logo=react&logoColor=black)
![Claude AI](https://img.shields.io/badge/Claude_AI-Powered-7c3aed?style=flat-square)
![Python](https://img.shields.io/badge/Python-Backend-3b82f6?style=flat-square&logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-10b981?style=flat-square)

---

## 🧩 The Business Problem

A Business Analyst spends an average of **30–40% of their time** just converting messy stakeholder inputs into structured documentation.

Meeting notes are scattered. Emails are vague. Stakeholders contradict each other. And somewhere in that chaos, a BA has to extract clear functional requirements, user stories, and acceptance criteria — before development starts.

Mistakes at this stage cost companies thousands in rework.

**RequirementIQ eliminates that bottleneck.**

Paste raw notes. Get a structured, professional BRD output — with ambiguities flagged — in under 10 seconds.

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 📋 **Smart Extraction** | Identifies functional & non-functional requirements from unstructured text |
| 📝 **User Story Generator** | Auto-formats requirements as *"As a [user], I want [goal], so that [reason]"* |
| ✅ **Acceptance Criteria** | Generates testable acceptance criteria for each user story |
| 🚩 **Ambiguity Detector** | Flags vague or conflicting statements that need stakeholder clarification |
| 📄 **BRD Export** | One-click export of the full document as a formatted PDF |
| 🔁 **Iteration Ready** | Edit and regenerate specific sections without reprocessing everything |

---

## 🗂️ Project Structure

```
RequirementIQ/
│
├── client/                        # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputPanel.jsx     # Raw notes input area
│   │   │   ├── BRDOutput.jsx      # Structured output display
│   │   │   ├── AmbiguityCard.jsx  # Flagged issues component
│   │   │   └── ExportButton.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── server/                        # Python backend
│   ├── app.py                     # Flask API
│   ├── analyzer.py                # Claude API integration
│   └── prompts.py                 # Prompt engineering templates
│
├── sample_inputs/
│   ├── meeting_notes_example.txt  # Example raw stakeholder input
│   └── email_thread_example.txt
│
├── sample_outputs/
│   └── BRD_sample.pdf            # Example generated BRD
│
├── requirements.txt
└── README.md
```

---

## 🧠 How It Works

```
Raw Input (meeting notes / emails / voice transcript)
        ↓
  [ React Frontend ]  ← User pastes text, clicks Analyze
        ↓
  [ Python Backend ]  ← Flask receives request
        ↓
  [ Claude AI API ]   ← Structured prompt extracts requirements
        ↓
  Parsed JSON response → Functional Reqs / User Stories / Ambiguities
        ↓
  [ React Frontend ]  ← Renders structured BRD with export option
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
- FR-04: The system shall support data export for Finance team users

🚩 **Ambiguities Flagged**
- "Fast" — no performance benchmark defined. Clarify expected load time (e.g. <2s page load)
- Export format unspecified — confirm with Finance team: CSV, Excel, or PDF?

📝 **User Stories Generated**
- As a registered user, I want to log in securely so that I can access my account
- As an admin, I want to view reports so that I can monitor system activity
- As a user, I want to reset my password so that I can regain access if locked out

---

## 💼 Business Impact

RequirementIQ directly addresses one of the highest-friction tasks in a BA's workflow:

- Reduces BRD drafting time from hours to minutes
- Ensures no requirement is missed from stakeholder conversations
- Creates a consistent, professional documentation format every time
- Flags ambiguities early — before they become expensive development rework
- Makes BAs more productive without replacing their judgment

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/RequirementIQ.git
cd RequirementIQ

# Backend setup
pip install -r requirements.txt
python server/app.py

# Frontend setup
cd client
npm install
npm start
```

Add your Claude API key to a `.env` file:
```
ANTHROPIC_API_KEY=your_key_here
```

---

## 🛣️ Roadmap

- [x] Project structure & documentation
- [x] Sample input/output defined
- [ ] Flask backend with Claude API integration
- [ ] Prompt engineering for requirement extraction
- [ ] React frontend — input panel + BRD output view
- [ ] Ambiguity detection layer
- [ ] PDF export functionality
- [ ] Voice transcript input support
- [ ] Multi-stakeholder conflict detection

---

## 👩‍💻 About the Author

**Anupriya T.V** — B.Tech Computer Science & Data Science, Presidency University Bengaluru
CSI Chapter President | IEEE Student Coordinator | BEL Process Automation Intern

I build tools that make business teams faster — without requiring them to become technical.

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/yourprofile)

---

*Built with React · Python · Flask · Claude AI API · Anthropic*

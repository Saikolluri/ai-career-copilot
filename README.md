# 🤝 S.AI Career Copilot

> **A free, AI-powered career guidance platform built for freshers and early professionals in India.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-sai--copilot.netlify.app-orange?style=for-the-badge&logo=netlify)](https://sai-copilot.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Saikolluri-black?style=for-the-badge&logo=github)](https://github.com/Saikolluri/ai-career-copilot)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![LLaMA](https://img.shields.io/badge/AI-LLaMA%203.3%2070B-blueviolet?style=for-the-badge)](https://groq.com)

---

## 🌟 What is S.AI Career Copilot?

Millions of Indian freshers graduate every year without a clear career direction — no roadmap, no mentor, no interview prep. **S.AI Career Copilot** solves this by acting as a 24/7 AI-powered career mentor that guides students from confusion to confidence.

**Live at:** [sai-copilot.netlify.app](https://sai-copilot.netlify.app)

---

## ✨ Features

### 📄 Resume Analyzer
Upload your PDF resume and get an instant AI-powered career assessment:
- Hackathon readiness score (0–100)
- Strengths and missing skills
- Project recommendations
- Career path alignment
- Best-fit roles

### 🗺️ Skill Roadmap Generator
Select your target role and get a structured learning plan:
- Week-by-week learning phases
- Required tools and technologies
- Milestone projects per phase
- Capstone project idea
- Salary range and job boards

### 🎯 Interview Simulator
Practice real interview questions with AI feedback:
- Technical and behavioral questions
- Adjustable difficulty (Easy / Medium / Hard)
- Scored answers (0–100)
- Detailed feedback with improvement tips
- Role-specific question generation

### 💬 Mentor Chat
Conversational AI career mentor available 24/7:
- Career direction guidance
- Skill-building advice
- Hackathon strategy (Centific, SIH, etc.)
- Project ideas and review
- Placement preparation tips

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│              React Frontend (Netlify CDN)         │
│         sai-copilot.netlify.app                   │
└─────────────────┬───────────────────────────────┘
                  │ REST API calls
┌─────────────────▼───────────────────────────────┐
│           FastAPI Backend (Render)                │
│  /resume/upload  /roadmap/generate               │
│  /interview/question  /chat/message              │
└─────────────────┬───────────────────────────────┘
                  │ LLM API calls
┌─────────────────▼───────────────────────────────┐
│         Groq API — LLaMA 3.3 70B                 │
│    Sub-3 second inference · Free tier            │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, Vite, JavaScript ES6+, CSS3 |
| **Backend** | Python, FastAPI, Async Python, Pydantic |
| **AI Model** | LLaMA 3.3 70B via Groq API |
| **PDF Parsing** | pdfplumber |
| **Deployment** | Netlify (frontend) + Render (backend) |
| **CI/CD** | GitHub → Auto-deploy on push |
| **Version Control** | Git + GitHub |

---

## 🚀 Run Locally

### Prerequisites
- Python 3.10+
- Node.js 18+
- Groq API key (free at [console.groq.com](https://console.groq.com))

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/Saikolluri/ai-career-copilot.git
cd ai-career-copilot/backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file
echo "OPENAI_API_KEY=your_groq_key_here" > .env
echo "SECRET_KEY=your_secret_key_here" >> .env

# Start backend server
python3 -m uvicorn app.main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### Frontend Setup

```bash
# In a new terminal
cd ai-career-copilot/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
ai-career-copilot/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── routers/
│   │   │   ├── resume.py        # Resume upload & analysis
│   │   │   ├── roadmap.py       # Skill roadmap generation
│   │   │   ├── interview.py     # Interview Q&A + evaluation
│   │   │   └── chat.py          # Mentor chat
│   │   └── services/
│   │       └── ai_service.py    # LLM prompt engineering layer
│   ├── requirements.txt
│   └── .env                     # (not committed — add your keys)
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Dashboard
│   │   │   ├── Resume.jsx       # Resume analyzer UI
│   │   │   ├── Roadmap.jsx      # Roadmap generator UI
│   │   │   ├── Interview.jsx    # Interview simulator UI
│   │   │   └── Chat.jsx         # Mentor chat UI
│   │   ├── api.js               # Axios API client
│   │   ├── App.jsx              # Main app + navigation
│   │   └── index.css            # Global styles
│   └── package.json
│
├── .gitignore
├── netlify.toml                 # Netlify build config
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/resume/upload` | Upload PDF, returns career analysis |
| `POST` | `/roadmap/generate` | Generate role-based learning roadmap |
| `GET` | `/roadmap/roles` | Get list of supported roles |
| `POST` | `/interview/question` | Generate interview question |
| `POST` | `/interview/evaluate` | Evaluate answer, return feedback |
| `POST` | `/chat/message` | Send message to AI mentor |
| `GET` | `/health` | Health check |

---

## 🧠 Prompt Engineering

Each feature uses a custom-engineered prompt template with:
- **Role-specific context** — model is told exactly who it is
- **JSON schema enforcement** — guaranteed structured output
- **Temperature tuning** — 0.3 for analysis, 0.7 for creative tasks
- **Output validation** — Pydantic models validate every response

Example (Resume Analysis prompt structure):
```python
RESUME_PROMPT = """
You are an expert career coach with 15 years of experience.
Analyze the resume and return ONLY valid JSON:
{
  "hackathon_readiness_score": <0-100>,
  "missing_skills": [...],
  ...
}
Resume: {resume_text}
"""
```

---

## 🌍 Who Is This For?

| User | How it helps |
|------|-------------|
| 🎓 Final year students | Step-by-step placement prep |
| 💼 Fresh graduates | Role clarity and skill roadmap |
| 🔄 Career switchers | Bridge skill gap analysis |
| 🚀 Hackathon participants | Project ideas and prep strategy |

---

## 📊 Why This Project Stands Out

- **Real AI Integration** — Not a wrapper; custom prompt engineering with LLaMA 3.3 70B
- **Live Production Deployment** — Real users, real URL, not just local demo
- **Full-Stack Ownership** — Frontend + Backend + AI + DevOps — built solo
- **Real Problem** — 50M+ Indian freshers face career confusion every year
- **Free Forever** — No paywalls, no sign-ups required for core features

---

## 🤝 Built By

**Sai Chowdary Kolluri**
- 🔗 [LinkedIn](https://linkedin.com/in/sai-chowdary-kolluri-36ab22258)
- 💻 [GitHub](https://github.com/Saikolluri)
- 🌐 [Live App](https://sai-copilot.netlify.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <strong>Built with ❤️ for every fresher who needed a mentor and didn't have one.</strong>
</div>

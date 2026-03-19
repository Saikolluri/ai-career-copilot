import os
import json
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

client = AsyncGroq(api_key=os.getenv("OPENAI_API_KEY"))
MODEL = "llama-3.3-70b-versatile"

RESUME_PROMPT = """
You are an expert career coach and senior technical recruiter with 15 years of experience.

Analyze the resume text below and return ONLY a valid JSON object with exactly this structure, no extra text:
{{
  "name": "candidate name or Unknown",
  "overall_grade": "A",
  "hackathon_readiness_score": 72,
  "strengths": ["strength1", "strength2", "strength3"],
  "missing_skills": ["skill1", "skill2", "skill3"],
  "improvement_suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "project_recommendations": ["project1", "project2", "project3"],
  "career_path_alignment": "one paragraph assessment",
  "top_roles": ["role1", "role2", "role3"]
}}

Resume text:
{resume_text}
"""

ROADMAP_PROMPT = """
You are an expert career mentor. Generate a learning roadmap for someone who wants to become a {role}.

Return ONLY a valid JSON object with exactly this structure, no extra text:
{{
  "role": "{role}",
  "total_duration_weeks": 16,
  "phases": [
    {{
      "phase_number": 1,
      "title": "phase title",
      "duration_weeks": 4,
      "topics": ["topic1", "topic2", "topic3"],
      "tools": ["tool1", "tool2"],
      "milestone": "what you can build by end of this phase"
    }}
  ],
  "final_project_idea": "a capstone project to build",
  "job_boards": ["LinkedIn", "Naukri", "Wellfound"],
  "salary_range": "8-25 LPA"
}}
"""

INTERVIEW_QUESTION_PROMPT = """
You are a technical interviewer at a top tech company.
Generate 1 {interview_type} interview question for a {role} position.
Difficulty: {difficulty}

Return ONLY a valid JSON object, no extra text:
{{
  "question": "the full interview question",
  "category": "category name",
  "hints": ["hint1", "hint2"],
  "what_interviewer_looks_for": "description of what a strong answer includes"
}}
"""

ANSWER_FEEDBACK_PROMPT = """
You are an expert technical interviewer. Evaluate this candidate's answer.

Question: {question}
Candidate's Answer: {answer}
Target Role: {role}

Return ONLY a valid JSON object, no extra text:
{{
  "score": 75,
  "grade": "B",
  "strengths": ["what was good"],
  "weaknesses": ["what was missing"],
  "ideal_answer_points": ["key point 1", "key point 2"],
  "improvement_tip": "one specific actionable tip"
}}
"""

MENTOR_SYSTEM = """You are an expert AI career mentor for students and early professionals in India.
You give specific, actionable, honest advice on:
- Career direction and role selection
- Technical skill building and learning paths
- Resume and project improvements
- Hackathon strategy (especially Centific, Smart India Hackathon, etc.)
- Interview preparation for top companies
Keep responses concise, practical, and encouraging."""

async def chat_complete(prompt: str) -> str:
    response = await client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=2048
    )
    return response.choices[0].message.content

async def analyze_resume(resume_text: str) -> dict:
    text = await chat_complete(RESUME_PROMPT.format(resume_text=resume_text))
    # Clean response — remove markdown code blocks if present
    text = text.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(text)

async def generate_roadmap(role: str) -> dict:
    text = await chat_complete(ROADMAP_PROMPT.format(role=role))
    text = text.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(text)

async def get_interview_question(role: str, interview_type: str, difficulty: str) -> dict:
    response = await client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": INTERVIEW_QUESTION_PROMPT.format(
            role=role, interview_type=interview_type, difficulty=difficulty
        )}],
        temperature=0.7,
        max_tokens=1024
    )
    text = response.choices[0].message.content.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(text)

async def evaluate_answer(question: str, answer: str, role: str) -> dict:
    text = await chat_complete(ANSWER_FEEDBACK_PROMPT.format(
        question=question, answer=answer, role=role
    ))
    text = text.strip().replace("```json", "").replace("```", "").strip()
    return json.loads(text)

async def mentor_chat(messages: list) -> str:
    response = await client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "system", "content": MENTOR_SYSTEM}] + messages,
        temperature=0.7,
        max_tokens=1024
    )
    return response.choices[0].message.content
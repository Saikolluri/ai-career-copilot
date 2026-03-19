from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import get_interview_question, evaluate_answer

router = APIRouter()

class QuestionRequest(BaseModel):
    role: str
    interview_type: str
    difficulty: str

class AnswerRequest(BaseModel):
    question: str
    answer: str
    role: str

@router.post("/question")
async def fetch_question(request: QuestionRequest):
    try:
        question = await get_interview_question(
            request.role, request.interview_type, request.difficulty
        )
        return {"success": True, "question": question}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/evaluate")
async def evaluate(request: AnswerRequest):
    if len(request.answer.strip()) < 10:
        raise HTTPException(status_code=400, detail="Answer too short")
    try:
        feedback = await evaluate_answer(request.question, request.answer, request.role)
        return {"success": True, "feedback": feedback}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
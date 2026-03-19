from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.ai_service import mentor_chat

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@router.post("/message")
async def chat(request: ChatRequest):
    try:
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        reply = await mentor_chat(messages)
        return {"success": True, "reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
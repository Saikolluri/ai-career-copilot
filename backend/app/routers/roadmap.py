from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import generate_roadmap

router = APIRouter()

class RoadmapRequest(BaseModel):
    role: str

@router.post("/generate")
async def create_roadmap(request: RoadmapRequest):
    if not request.role:
        raise HTTPException(status_code=400, detail="Role is required")
    try:
        roadmap = await generate_roadmap(request.role)
        return {"success": True, "roadmap": roadmap}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/roles")
def get_roles():
    return {"roles": [
        "AI Engineer", "Full Stack Developer", "Data Scientist",
        "Machine Learning Engineer", "Backend Developer",
        "Frontend Developer", "DevOps Engineer", "Product Manager"
    ]}
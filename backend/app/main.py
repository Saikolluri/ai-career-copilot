from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import resume, roadmap, interview, chat

app = FastAPI(title="AI Career Copilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(roadmap.router, prefix="/roadmap", tags=["Roadmap"])
app.include_router(interview.router, prefix="/interview", tags=["Interview"])
app.include_router(chat.router, prefix="/chat", tags=["Chat"])

@app.get("/")
def root():
    return {"message": "AI Career Copilot API is running!"}

@app.get("/health")
def health():
    return {"status": "ok"}
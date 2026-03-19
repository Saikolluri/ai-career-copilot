from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import io
from app.services.ai_service import analyze_resume

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    contents = await file.read()
    
    try:
        text = ""
        with pdfplumber.open(io.BytesIO(contents)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not read PDF: {str(e)}")
    
    if len(text.strip()) < 50:
        raise HTTPException(status_code=400, detail="PDF appears empty or unreadable")
    
    try:
        analysis = await analyze_resume(text)
        return {"success": True, "analysis": analysis}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {str(e)}")
        
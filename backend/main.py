from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sync-Ed AI Engine")

# Configure CORS: This allows your React frontend to send data to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "AI Engine is online and ready."}

@app.post("/api/upload")
async def receive_syllabus(file: UploadFile = File(...)):
    """
    Receives the uploaded PDF/DOCX file from the React frontend.
    """
    file_contents = await file.read()
    file_size_kb = round(len(file_contents) / 1024, 2)
    
    print(f"Received file: {file.filename} ({file_size_kb} KB)")
    
    return {
        "filename": file.filename,
        "size_kb": file_size_kb,
        "message": "File successfully received by the AI Engine!",
        "status": "success"
    }
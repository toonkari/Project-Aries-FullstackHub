from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Define the shape of incoming project data using Pydantic
class ProjectCreate(BaseModel):
    title: str
    description: str
    techStack: List[str]
    githubUrl: str
    status: str

# Your current project registry database
PROJECTS_DATABASE = [
    {
        "id": 1,
        "title": "Full-Stack Project Hub",
        "description": "Centralized dashboard dynamically fetching and linking active sub-projects.",
        "techStack": ["React", "FastAPI", "Python", "JavaScript"],
        "githubUrl": "https://github.com",
        "status": "Active"
    },
    {
        "id": 2,
        "title": "Real-Time Chat Engine",
        "description": "Discord-style live communication service using WebSockets and asynchronous Python.",
        "techStack": ["FastAPI", "WebSockets", "Python", "React"],
        "githubUrl": "https://github.com",
        "status": "In Progress"
    }
]

@app.get("/api/projects")
def get_projects():
    """Endpoint that returns the project registry JSON to the frontend"""
    return {"projects": PROJECTS_DATABASE}


# 2. NEW: POST endpoint to add a project
@app.post("/api/projects")
def create_project(project: ProjectCreate):
    """Endpoint that accepts a new project JSON, validates it, and saves it to the database"""
    
    # Generate a new unique ID based on the current list size
    new_id = len(PROJECTS_DATABASE) + 1
    
    # Convert the incoming Pydantic model into a standard Python dictionary
    new_project = project.model_dump() # Note: use project.dict() if using older pydantic versions
    new_project["id"] = new_id
    
    # Append it to our server-side list
    PROJECTS_DATABASE.append(new_project)
    
    return {
        "message": "Project successfully added!",
        "project": new_project
    }
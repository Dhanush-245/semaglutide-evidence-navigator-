"""
FastAPI Backend Entry Point
Semaglutide Evidence Navigator
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from safety.router import classify_query

app = FastAPI(
    title="Semaglutide Evidence Navigator API",
    description="Safety-routed RAG engine for Semaglutide, Ozempic, Wegovy, and Rybelsus evidence.",
    version="1.0.0"
)

class QueryRequest(BaseModel):
    query: str
    jurisdiction: Optional[str] = "US"

class SafetyResponse(BaseModel):
    query: str
    route: str
    confidence: float
    rationale: str
    action: str

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Semaglutide Evidence Navigator API"}

@app.post("/api/v1/safety-check", response_model=SafetyResponse)
def safety_check(req: QueryRequest):
    result = classify_query(req.query)
    return SafetyResponse(
        query=req.query,
        route=result["route"],
        confidence=result["confidence"],
        rationale=result["rationale"],
        action=result["action"]
    )

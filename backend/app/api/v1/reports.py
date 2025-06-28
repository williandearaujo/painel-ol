# backend/app/api/v1/reports.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.app.core.database import get_db
from backend.app import models

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)

@router.get("/dashboard", summary="Contagem de registros para dashboard")
def get_dashboard_counts(db: Session = Depends(get_db)):
    return {
        "clients":     db.query(models.Client).count(),
        "analysts":    db.query(models.Analyst).count(),
        "tasks":       db.query(models.Task).count(),
        "suppliers":   db.query(models.Supplier).count(),
        "equipment":   db.query(models.Equipment).count(),
        "links":       db.query(models.Link).count(),
        "contacts":    db.query(models.Contact).count(),
        "certifications": db.query(models.Certification).count(),
    }

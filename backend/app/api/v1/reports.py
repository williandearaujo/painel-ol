
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...core.dependencies import get_current_user
from ... import models

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/counts")
def get_dashboard_counts(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return {
        "clients": db.query(models.Client).count(),
        "analysts": db.query(models.Analyst).count(),
        "tasks": db.query(models.Task).count(),
        "suppliers": db.query(models.Supplier).count(),
        "equipment": db.query(models.Equipment).count(),
        "contacts": db.query(models.Contact).count(),
    }

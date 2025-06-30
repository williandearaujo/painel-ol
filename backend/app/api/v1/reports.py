
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...core.dependencies import get_current_user
from ... import models, schemas

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/dashboard-counts", response_model=schemas.DashboardCounts)
def get_dashboard_counts(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    total_clients = db.query(models.Client).count()
    total_analysts = db.query(models.Analyst).count()
    total_tasks = db.query(models.Task).count()
    total_suppliers = db.query(models.Supplier).count()
    total_equipment = db.query(models.Equipment).count()
    total_contacts = db.query(models.Contact).count()
    
    return schemas.DashboardCounts(
        total_clients=total_clients,
        total_analysts=total_analysts,
        total_tasks=total_tasks,
        total_suppliers=total_suppliers,
        total_equipment=total_equipment,
        total_contacts=total_contacts
    )

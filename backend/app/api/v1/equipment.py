from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/equipment",
    tags=["Equipment"],
)

@router.post("/", response_model=schemas.EquipmentOut, status_code=status.HTTP_201_CREATED)
def create_equipment(e: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    db_obj = models.Equipment(**e.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[schemas.EquipmentOut])
def list_equipment(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Equipment).offset(skip).limit(limit).all()

@router.get("/{eq_id}", response_model=schemas.EquipmentOut)
def get_equipment(eq_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Equipment).get(eq_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado")
    return obj

@router.put("/{eq_id}", response_model=schemas.EquipmentOut)
def update_equipment(eq_id: int, upd: schemas.EquipmentUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Equipment).get(eq_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado")
    for k,v in upd.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{eq_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_equipment(eq_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Equipment).get(eq_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado")
    db.delete(obj)
    db.commit()
    return

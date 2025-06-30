from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/equipment",
    tags=["Equipment"],
)

@router.post("/", response_model=schemas.EquipmentOut, status_code=status.HTTP_201_CREATED)
def create_equipment(data: schemas.EquipmentCreate, db: Session = Depends(get_db)):
    eq = models.Equipment(**data.dict())
    db.add(eq)
    db.commit()
    db.refresh(eq)
    return eq

@router.get("/", response_model=List[schemas.EquipmentOut])
def list_equipment(db: Session = Depends(get_db)):
    return db.query(models.Equipment).all()

@router.get("/{equipment_id}", response_model=schemas.EquipmentOut)
def get_equipment(equipment_id: int, db: Session = Depends(get_db)):
    eq = db.get(models.Equipment, equipment_id)
    if not eq:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado")
    return eq

@router.put("/{equipment_id}", response_model=schemas.EquipmentOut)
def update_equipment(equipment_id: int, update: schemas.EquipmentUpdate, db: Session = Depends(get_db)):
    eq = db.get(models.Equipment, equipment_id)
    if not eq:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado")
    for k, v in update.dict(exclude_unset=True).items():
        setattr(eq, k, v)
    db.commit()
    db.refresh(eq)
    return eq

@router.delete("/{equipment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_equipment(equipment_id: int, db: Session = Depends(get_db)):
    eq = db.get(models.Equipment, equipment_id)
    if not eq:
        raise HTTPException(status_code=404, detail="Equipamento não encontrado")
    db.delete(eq)
    db.commit()

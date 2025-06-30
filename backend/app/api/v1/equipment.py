<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException, status
=======

from typing import List
from fastapi import APIRouter, Depends, HTTPException
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
from sqlalchemy.orm import Session
from typing import List

from ...core.database import get_db
from ...core.dependencies import get_current_user
from ... import models, schemas

<<<<<<< HEAD
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
=======
router = APIRouter(prefix="/equipment", tags=["Equipment"])

@router.get("/", response_model=List[schemas.EquipmentOut])
def read_equipment(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    equipment = db.query(models.Equipment).offset(skip).limit(limit).all()
    return equipment

@router.post("/", response_model=schemas.EquipmentOut)
def create_equipment(equipment: schemas.EquipmentCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_equipment = models.Equipment(**equipment.dict())
    db.add(db_equipment)
    db.commit()
    db.refresh(db_equipment)
    return db_equipment

@router.get("/{equipment_id}", response_model=schemas.EquipmentOut)
def read_equipment_item(equipment_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    equipment = db.query(models.Equipment).filter(models.Equipment.id == equipment_id).first()
    if equipment is None:
        raise HTTPException(status_code=404, detail="Equipment not found")
    return equipment

@router.delete("/{equipment_id}")
def delete_equipment(equipment_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    equipment = db.query(models.Equipment).filter(models.Equipment.id == equipment_id).first()
    if equipment is None:
        raise HTTPException(status_code=404, detail="Equipment not found")
    db.delete(equipment)
    db.commit()
    return {"message": "Equipment deleted successfully"}
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be

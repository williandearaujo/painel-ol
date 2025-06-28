from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"],
)

@router.post("/", response_model=schemas.SupplierOut, status_code=status.HTTP_201_CREATED)
def create_supplier(s: schemas.SupplierCreate, db: Session = Depends(get_db)):
    if s.cnpj and db.query(models.Supplier).filter(models.Supplier.cnpj == s.cnpj).first():
        raise HTTPException(status_code=400, detail="CNPJ já cadastrado")
    db_obj = models.Supplier(**s.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[schemas.SupplierOut])
def list_suppliers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Supplier).offset(skip).limit(limit).all()

@router.get("/{supplier_id}", response_model=schemas.SupplierOut)
def get_supplier(supplier_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Supplier).get(supplier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    return obj

@router.put("/{supplier_id}", response_model=schemas.SupplierOut)
def update_supplier(supplier_id: int, upd: schemas.SupplierUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Supplier).get(supplier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    for k, v in upd.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{supplier_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Supplier).get(supplier_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Fornecedor não encontrado")
    db.delete(obj)
    db.commit()
    return

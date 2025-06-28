from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/clients",
    tags=["Clients"],
)

@router.post("/", response_model=schemas.ClientOut, status_code=status.HTTP_201_CREATED)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    if db.query(models.Client).filter(models.Client.cnpj == client.cnpj).first():
        raise HTTPException(status_code=400, detail="CNPJ já cadastrado")
    db_client = models.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@router.get("/", response_model=List[schemas.ClientOut])
def list_clients(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Client).offset(skip).limit(limit).all()

@router.get("/{client_id}", response_model=schemas.ClientOut)
def get_client(client_id: int, db: Session = Depends(get_db)):
    c = db.query(models.Client).get(client_id)
    if not c:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    return c

@router.put("/{client_id}", response_model=schemas.ClientOut)
def update_client(client_id: int, updates: schemas.ClientUpdate, db: Session = Depends(get_db)):
    c = db.query(models.Client).get(client_id)
    if not c:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    for k, v in updates.dict(exclude_unset=True).items():
        setattr(c, k, v)
    db.commit()
    db.refresh(c)
    return c

@router.delete("/{client_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    c = db.query(models.Client).get(client_id)
    if not c:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    db.delete(c)
    db.commit()
    return

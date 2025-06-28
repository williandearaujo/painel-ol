from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/links",
    tags=["Links"],
)

@router.post("/", response_model=schemas.LinkOut, status_code=status.HTTP_201_CREATED)
def create_link(l: schemas.LinkCreate, db: Session = Depends(get_db)):
    db_obj = models.Link(**l.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[schemas.LinkOut])
def list_links(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Link).offset(skip).limit(limit).all()

@router.get("/{link_id}", response_model=schemas.LinkOut)
def get_link(link_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Link).get(link_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Link não encontrado")
    return obj

@router.put("/{link_id}", response_model=schemas.LinkOut)
def update_link(link_id: int, upd: schemas.LinkUpdate, db: Session = Depends(get_db)):
    obj = db.query(models.Link).get(link_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Link não encontrado")
    for k,v in upd.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{link_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_link(link_id: int, db: Session = Depends(get_db)):
    obj = db.query(models.Link).get(link_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Link não encontrado")
    db.delete(obj)
    db.commit()
    return

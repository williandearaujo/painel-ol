# backend/app/api/v1/contacts.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from backend.app.core.database import get_db
from backend.app import models, schemas

router = APIRouter(
    prefix="/contacts",
    tags=["Contacts"]
)

@router.post("/", response_model=schemas.ContactOut)
def create_contact(contact: schemas.ContactCreate, db: Session = Depends(get_db)):
    db_contact = models.Contact(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.get("/", response_model=List[schemas.ContactOut])
def list_contacts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Contact).offset(skip).limit(limit).all()

@router.get("/{contact_id}", response_model=schemas.ContactOut)
def get_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.get(models.Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/{contact_id}", response_model=schemas.ContactOut)
def update_contact(contact_id: int, upd: schemas.ContactCreate, db: Session = Depends(get_db)):
    contact = db.get(models.Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    for k, v in upd.dict(exclude_unset=True).items():
        setattr(contact, k, v)
    db.commit()
    db.refresh(contact)
    return contact

@router.delete("/{contact_id}", status_code=204)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    contact = db.get(models.Contact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    db.delete(contact)
    db.commit()

# backend/app/api/v1/certifications.py

from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.core.database import get_db
from backend.app import models, schemas

router = APIRouter(
    prefix="/certifications",
    tags=["Certifications"],
)

@router.post("/", response_model=schemas.CertificationOut, status_code=status.HTTP_201_CREATED)
def create_certification(
    certification_in: schemas.CertificationCreate,
    db: Session = Depends(get_db),
):
    db_obj = models.Certification(**certification_in.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[schemas.CertificationOut])
def list_certifications(db: Session = Depends(get_db)):
    return db.query(models.Certification).all()

@router.get("/{cert_id}", response_model=schemas.CertificationOut)
def get_certification(cert_id: int, db: Session = Depends(get_db)):
    cert = db.query(models.Certification).get(cert_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")
    return cert

@router.put("/{cert_id}", response_model=schemas.CertificationOut)
def update_certification(
    cert_id: int,
    certification_in: schemas.CertificationUpdate,
    db: Session = Depends(get_db),
):
    cert = db.query(models.Certification).get(cert_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")
    for field, value in certification_in.dict(exclude_unset=True).items():
        setattr(cert, field, value)
    db.commit()
    db.refresh(cert)
    return cert

@router.delete("/{cert_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_certification(cert_id: int, db: Session = Depends(get_db)):
    cert = db.query(models.Certification).get(cert_id)
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")
    db.delete(cert)
    db.commit()
    return


from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...core.dependencies import get_current_user
from ... import models, schemas

router = APIRouter(prefix="/certifications", tags=["Certifications"])

@router.get("/", response_model=List[schemas.CertificationOut])
def read_certifications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    certifications = db.query(models.Certification).offset(skip).limit(limit).all()
    return certifications

@router.post("/", response_model=schemas.CertificationOut)
def create_certification(certification: schemas.CertificationCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_certification = models.Certification(**certification.dict())
    db.add(db_certification)
    db.commit()
    db.refresh(db_certification)
    return db_certification

@router.get("/{certification_id}", response_model=schemas.CertificationOut)
def read_certification(certification_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    certification = db.query(models.Certification).filter(models.Certification.id == certification_id).first()
    if certification is None:
        raise HTTPException(status_code=404, detail="Certification not found")
    return certification

@router.delete("/{certification_id}")
def delete_certification(certification_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    certification = db.query(models.Certification).filter(models.Certification.id == certification_id).first()
    if certification is None:
        raise HTTPException(status_code=404, detail="Certification not found")
    db.delete(certification)
    db.commit()
    return {"message": "Certification deleted successfully"}

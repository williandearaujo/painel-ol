
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...core.dependencies import get_current_user
from ... import models, schemas

router = APIRouter(prefix="/links", tags=["Links"])

@router.get("/", response_model=List[schemas.LinkOut])
def read_links(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    links = db.query(models.Link).offset(skip).limit(limit).all()
    return links

@router.post("/", response_model=schemas.LinkOut)
def create_link(link: schemas.LinkCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_link = models.Link(**link.dict())
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link

@router.get("/{link_id}", response_model=schemas.LinkOut)
def read_link(link_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    link = db.query(models.Link).filter(models.Link.id == link_id).first()
    if link is None:
        raise HTTPException(status_code=404, detail="Link not found")
    return link

@router.delete("/{link_id}")
def delete_link(link_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    link = db.query(models.Link).filter(models.Link.id == link_id).first()
    if link is None:
        raise HTTPException(status_code=404, detail="Link not found")
    db.delete(link)
    db.commit()
    return {"message": "Link deleted successfully"}

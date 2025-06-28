from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db
from backend.app.core.security import get_password_hash  # import do hash

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verifica se já existe
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já cadastrado"
        )
    # Hash agora corretamente usando bcrypt
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/", response_model=List[schemas.UserOut])
def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.User).offset(skip).limit(limit).all()

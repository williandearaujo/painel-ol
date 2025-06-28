from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)

@router.post("/", response_model=schemas.TaskOut, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=List[schemas.TaskOut])
def list_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Task).offset(skip).limit(limit).all()

@router.get("/{task_id}", response_model=schemas.TaskOut)
def get_task(task_id: int, db: Session = Depends(get_db)):
    t = db.query(models.Task).get(task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return t

@router.put("/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, upd: schemas.TaskUpdate, db: Session = Depends(get_db)):
    t = db.query(models.Task).get(task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    for k, v in upd.dict(exclude_unset=True).items():
        setattr(t, k, v)
    db.commit()
    db.refresh(t)
    return t

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    t = db.query(models.Task).get(task_id)
    if not t:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    db.delete(t)
    db.commit()
    return

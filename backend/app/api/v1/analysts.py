from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from backend.app import models, schemas
from backend.app.core.dependencies import get_db

router = APIRouter(
    prefix="/analysts",
    tags=["Analysts"],
)

@router.post("/", response_model=schemas.AnalystOut, status_code=status.HTTP_201_CREATED)
def create_analyst(a: schemas.AnalystCreate, db: Session = Depends(get_db)):
    if a.cpf and db.query(models.Analyst).filter(models.Analyst.cpf == a.cpf).first():
        raise HTTPException(status_code=400, detail="CPF já cadastrado")
    db_obj = models.Analyst(**a.dict())
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/", response_model=List[schemas.AnalystOut])
def list_analysts(
    skip: int = 0,
    limit: int = 100,
    ativo: Optional[bool] = Query(None, description="Filtrar apenas ativos ou inativos"),
    nome: Optional[str] = Query(None, description="Buscar por nome"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Analyst)

    if ativo is not None:
        query = query.filter(models.Analyst.ativo == ativo)

    if nome:
        query = query.filter(models.Analyst.nome.ilike(f"%{nome}%"))

    return query.offset(skip).limit(limit).all()

@router.get("/{analyst_id}", response_model=schemas.AnalystOut)
def get_analyst(analyst_id: int, db: Session = Depends(get_db)):
    obj = db.get(models.Analyst, analyst_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Analista não encontrado")
    return obj

@router.put("/{analyst_id}", response_model=schemas.AnalystOut)
def update_analyst(analyst_id: int, upd: schemas.AnalystUpdate, db: Session = Depends(get_db)):
    obj = db.get(models.Analyst, analyst_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Analista não encontrado")
    for k, v in upd.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

@router.delete("/{analyst_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_analyst(analyst_id: int, db: Session = Depends(get_db)):
    obj = db.get(models.Analyst, analyst_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Analista não encontrado")
    db.delete(obj)
    db.commit()

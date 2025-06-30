<<<<<<< HEAD
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
=======

from typing import List
from fastapi import APIRouter, Depends, HTTPException
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
from sqlalchemy.orm import Session

from ...core.database import get_db
from ...core.dependencies import get_current_user
from ... import models, schemas

router = APIRouter(prefix="/analysts", tags=["Analysts"])

@router.get("/", response_model=List[schemas.AnalystOut])
<<<<<<< HEAD
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
=======
def read_analysts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analysts = db.query(models.Analyst).offset(skip).limit(limit).all()
    return analysts

@router.post("/", response_model=schemas.AnalystOut)
def create_analyst(analyst: schemas.AnalystCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_analyst = models.Analyst(**analyst.dict())
    db.add(db_analyst)
    db.commit()
    db.refresh(db_analyst)
    return db_analyst

@router.put("/{analyst_id}", response_model=schemas.AnalystOut)
def update_analyst(analyst_id: int, upd: schemas.AnalystUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    obj = db.query(models.Analyst).get(analyst_id)
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be
    if not obj:
        raise HTTPException(status_code=404, detail="Analista não encontrado")
    for k, v in upd.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.commit()
    db.refresh(obj)
    return obj

<<<<<<< HEAD
@router.delete("/{analyst_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_analyst(analyst_id: int, db: Session = Depends(get_db)):
    obj = db.get(models.Analyst, analyst_id)
    if not obj:
        raise HTTPException(status_code=404, detail="Analista não encontrado")
    db.delete(obj)
    db.commit()
=======
@router.delete("/{analyst_id}")
def delete_analyst(analyst_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    analyst = db.query(models.Analyst).filter(models.Analyst.id == analyst_id).first()
    if analyst is None:
        raise HTTPException(status_code=404, detail="Analyst not found")
    db.delete(analyst)
    db.commit()
    return {"message": "Analyst deleted successfully"}
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be

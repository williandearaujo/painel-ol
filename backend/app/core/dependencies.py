from typing import Generator
from sqlalchemy.orm import Session
from backend.app.core.database import SessionLocal

def get_db() -> Generator[Session, None, None]:
    """
    Gera e encerra uma sessão de DB por request.
    """
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()

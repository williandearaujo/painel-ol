from fastapi import FastAPI
from backend.app.core.database import engine, Base
from backend.app.api.v1.users import router as users_router

app = FastAPI(
    title="Painel OL Tecnologia API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

@app.on_event("startup")
def on_startup():
    # Cria as tabelas no SQLite
    Base.metadata.create_all(bind=engine)

# Inclui rotas de usuário
app.include_router(users_router)

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

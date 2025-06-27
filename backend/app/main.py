from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from backend.app.core.database import engine, Base
from backend.app.api.v1.auth import router as auth_router
from backend.app.api.v1.users import router as users_router

app = FastAPI(
    title="Painel OL Tecnologia API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

# Rota raiz para documentação
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

# Inclui routers
app.include_router(auth_router)
app.include_router(users_router)

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

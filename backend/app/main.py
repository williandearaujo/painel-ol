from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from backend.app.core.database import engine, Base
from backend.app.api.v1.auth import router as auth_router
from backend.app.api.v1.users import router as users_router
from backend.app.api.v1.clients import router as clients_router
from backend.app.api.v1.analysts import router as analysts_router
from backend.app.api.v1.tasks import router as tasks_router
from backend.app.api.v1.suppliers import router as suppliers_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(
    title="Painel OL Tecnologia API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # ajustar depois para seu front-end
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

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
app.include_router(clients_router)
app.include_router(analysts_router)
app.include_router(tasks_router)
app.include_router(suppliers_router)

@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}



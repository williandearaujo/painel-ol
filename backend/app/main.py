
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware

from .core.database import engine, Base
from .api.v1.auth import router as auth_router
from .api.v1.users import router as users_router
from .api.v1.clients import router as clients_router
from .api.v1.analysts import router as analysts_router
from .api.v1.tasks import router as tasks_router
from .api.v1.suppliers import router as suppliers_router
from .api.v1.equipment import router as equipment_router
from .api.v1.links import router as links_router
from .api.v1.contacts import router as contacts_router
from .api.v1.reports import router as reports_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown (se necessário)

app = FastAPI(
    title="Painel OL Tecnologia API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redireciona raiz para docs
@app.get("/", include_in_schema=False)
def root():
    return RedirectResponse(url="/docs")

# Autenticação e Usuários
app.include_router(auth_router)
app.include_router(users_router)

# Demais recursos
app.include_router(clients_router)
app.include_router(analysts_router)
app.include_router(tasks_router)
app.include_router(suppliers_router)
app.include_router(equipment_router)
app.include_router(links_router)
app.include_router(contacts_router)
app.include_router(reports_router)

# Health check
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "ok"}

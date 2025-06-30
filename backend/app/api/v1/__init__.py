from fastapi import APIRouter

from . import (
    auth,
    users,
    clients,
    analysts,
    tasks,
    suppliers,
    equipment,
    links,
    contacts,
    reports,
)

router = APIRouter()

# ROTAS PÚBLICAS OU DE AUTENTICAÇÃO
router.include_router(auth.router, prefix="/auth", tags=["Auth"])

# ROTAS PROTEGIDAS (CRUDs)
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(clients.router, prefix="/clients", tags=["Clients"])
router.include_router(analysts.router, prefix="/analysts", tags=["Analysts"])
router.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])
router.include_router(suppliers.router, prefix="/suppliers", tags=["Suppliers"])
router.include_router(equipment.router, prefix="/equipment", tags=["Equipment"])
router.include_router(links.router, prefix="/links", tags=["Links"])
router.include_router(contacts.router, prefix="/contacts", tags=["Contacts"])
router.include_router(reports.router, prefix="/reports", tags=["Reports"])

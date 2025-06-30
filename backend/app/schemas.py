from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# --- Autenticação / Usuário ---
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None

# --- Clientes ---
class ClientBase(BaseModel):
    name: str
    cnpj: str
    address: Optional[str] = None
    phone: Optional[str] = None
    account_manager: Optional[str] = None
    pre_sales: Optional[str] = None
    classification: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class ClientUpdate(BaseModel):
    name: Optional[str]
    cnpj: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    account_manager: Optional[str]
    pre_sales: Optional[str]
    classification: Optional[str]

class ClientOut(ClientBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Analistas ---
class AnalystBase(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    notes: Optional[str] = None
    active: Optional[bool] = True

class AnalystCreate(AnalystBase):
    pass

class AnalystUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]
    notes: Optional[str]
    active: Optional[bool]

class AnalystOut(AnalystBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Tarefas ---
class TaskBase(BaseModel):
    responsible: str
    description: str
    status: str
    planned_completion: Optional[datetime] = None
    real_completion: Optional[datetime] = None
    observations: Optional[str] = None

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    responsible: Optional[str]
    description: Optional[str]
    status: Optional[str]
    planned_completion: Optional[datetime]
    real_completion: Optional[datetime]
    observations: Optional[str]

class TaskOut(TaskBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Fornecedores ---
class SupplierBase(BaseModel):
    name: str
    cnpj: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    contact_person: Optional[str] = None
    status: Optional[bool] = True

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(BaseModel):
    name: Optional[str]
    cnpj: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    contact_person: Optional[str]
    status: Optional[bool]

class SupplierOut(SupplierBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Equipamentos ---
class EquipmentBase(BaseModel):
    client: str
    status: Optional[bool] = True
    host: str
    description: Optional[str] = None
    observation: Optional[str] = None
    type: Optional[str] = None
    access_url: Optional[str] = None

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(BaseModel):
    client: Optional[str]
    status: Optional[bool]
    host: Optional[str]
    description: Optional[str]
    observation: Optional[str]
    type: Optional[str]
    access_url: Optional[str]

class EquipmentOut(EquipmentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Links ---
class LinkBase(BaseModel):
    folder: str
    subfolder: Optional[str] = None
    friendly_name: str
    captured_name: str
    url: str

class LinkCreate(LinkBase):
    pass

class LinkUpdate(BaseModel):
    folder: Optional[str]
    subfolder: Optional[str]
    friendly_name: Optional[str]
    captured_name: Optional[str]
    url: Optional[str]

class LinkOut(LinkBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Contatos ---
class ContactBase(BaseModel):
    classification: str
    parent_entity_id: Optional[int] = None
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    escalation: Optional[bool] = False
    escalation_number: Optional[str] = None
    alternative_phone: Optional[str] = None
    status: Optional[bool] = True

class ContactCreate(ContactBase):
    pass

class ContactOut(ContactBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

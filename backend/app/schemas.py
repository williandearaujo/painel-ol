<<<<<<< HEAD
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
=======

# backend/app/schemas.py

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List, Any
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be

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
    name: Optional[str] = None
    cnpj: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    account_manager: Optional[str] = None
    pre_sales: Optional[str] = None
    classification: Optional[str] = None

class ClientOut(ClientBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Analistas ---
class AnalystBase(BaseModel):
    name: str
<<<<<<< HEAD
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    notes: Optional[str] = None
    active: Optional[bool] = True
=======
    entry_date: datetime
    rg: Optional[str] = None
    cpf: Optional[str] = None
    phone_personal: Optional[str] = None
    phone_work: Optional[str] = None
    spouse: Optional[str] = None
    children: Optional[List[Any]] = None
    gender: Optional[str] = None
    position: Optional[str] = None
    seniority: Optional[str] = None
    salary: Optional[str] = None
    last_raise_date: Optional[datetime] = None
    is_active: bool = True
    termination_date: Optional[datetime] = None
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be

class AnalystCreate(AnalystBase):
    pass

class AnalystUpdate(BaseModel):
<<<<<<< HEAD
    name: Optional[str]
    email: Optional[EmailStr]
    role: Optional[str]
    notes: Optional[str]
    active: Optional[bool]
=======
    name: Optional[str] = None
    entry_date: Optional[datetime] = None
    rg: Optional[str] = None
    cpf: Optional[str] = None
    phone_personal: Optional[str] = None
    phone_work: Optional[str] = None
    spouse: Optional[str] = None
    children: Optional[List[Any]] = None
    gender: Optional[str] = None
    position: Optional[str] = None
    seniority: Optional[str] = None
    salary: Optional[str] = None
    last_raise_date: Optional[datetime] = None
    is_active: Optional[bool] = None
    termination_date: Optional[datetime] = None
>>>>>>> 8c88711f17b8648c5f5172f907f5debec38118be

class AnalystOut(AnalystBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Tasks ---
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
    responsible: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    planned_completion: Optional[datetime] = None
    real_completion: Optional[datetime] = None
    observations: Optional[str] = None

class TaskOut(TaskBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Suppliers ---
class SupplierBase(BaseModel):
    name: str
    cnpj: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    contact_person: Optional[str] = None
    status: bool = True

class SupplierCreate(SupplierBase):
    pass

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    cnpj: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    contact_person: Optional[str] = None
    status: Optional[bool] = None

class SupplierOut(SupplierBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Equipment ---
class EquipmentBase(BaseModel):
    client: str
    status: bool = True
    host: str
    description: Optional[str] = None
    observation: Optional[str] = None
    type: Optional[str] = None
    access_url: Optional[str] = None

class EquipmentCreate(EquipmentBase):
    pass

class EquipmentUpdate(BaseModel):
    client: Optional[str] = None
    status: Optional[bool] = None
    host: Optional[str] = None
    description: Optional[str] = None
    observation: Optional[str] = None
    type: Optional[str] = None
    access_url: Optional[str] = None

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
    folder: Optional[str] = None
    subfolder: Optional[str] = None
    friendly_name: Optional[str] = None
    captured_name: Optional[str] = None
    url: Optional[str] = None

class LinkOut(LinkBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Contacts ---
class ContactBase(BaseModel):
    classification: str
    parent_entity_id: Optional[int] = None
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    escalation: bool = False
    escalation_number: Optional[str] = None
    alternative_phone: Optional[str] = None
    status: bool = True

class ContactCreate(ContactBase):
    pass

class ContactUpdate(BaseModel):
    classification: Optional[str] = None
    parent_entity_id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    role: Optional[str] = None
    escalation: Optional[bool] = None
    escalation_number: Optional[str] = None
    alternative_phone: Optional[str] = None
    status: Optional[bool] = None

class ContactOut(ContactBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# --- Certifications ---
class CertificationBase(BaseModel):
    analyst_name: str
    certification_name: str
    certification_date: datetime
    expiry_date: Optional[datetime] = None
    status: str = "active"

class CertificationCreate(CertificationBase):
    pass

class CertificationUpdate(BaseModel):
    analyst_name: Optional[str] = None
    certification_name: Optional[str] = None
    certification_date: Optional[datetime] = None
    expiry_date: Optional[datetime] = None
    status: Optional[str] = None

class CertificationOut(CertificationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Reports ---
class DashboardCounts(BaseModel):
    total_clients: int
    total_analysts: int
    total_tasks: int
    total_suppliers: int
    total_equipment: int
    total_contacts: int

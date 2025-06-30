# backend/app/models.py

from sqlalchemy import Column, Integer, String, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Optional

from .core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    cnpj = Column(String, unique=True, nullable=False, index=True)
    address = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    account_manager = Column(String, nullable=True)
    pre_sales = Column(String, nullable=True)
    classification = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Analyst(Base):
    __tablename__ = "analysts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    entry_date = Column(DateTime, nullable=False)
    rg = Column(String, nullable=True)
    cpf = Column(String, nullable=True, unique=True, index=True)
    phone_personal = Column(String, nullable=True)
    phone_work = Column(String, nullable=True)
    spouse = Column(String, nullable=True)
    children = Column(JSON, nullable=True)
    gender = Column(String, nullable=True)
    position = Column(String, nullable=True)
    seniority = Column(String, nullable=True)
    salary = Column(String, nullable=True)
    last_raise_date = Column(DateTime, nullable=True)
    is_active = Column(Boolean, default=True)
    termination_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    responsible = Column(String, nullable=False)
    description = Column(String, nullable=False)
    status = Column(String, nullable=False, index=True)
    planned_completion = Column(DateTime, nullable=True)
    real_completion = Column(DateTime, nullable=True)
    observations = Column(String, nullable=True)

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    cnpj = Column(String, unique=True, nullable=True, index=True)
    address = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    contact_person = Column(String, nullable=True)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Equipment(Base):
    __tablename__ = "equipment"

    id = Column(Integer, primary_key=True, index=True)
    client = Column(String, nullable=False)
    status = Column(Boolean, default=True)
    host = Column(String, nullable=False)
    description = Column(String, nullable=True)
    observation = Column(String, nullable=True)
    type = Column(String, nullable=True)
    access_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Link(Base):
    __tablename__ = "links"

    id = Column(Integer, primary_key=True, index=True)
    folder = Column(String, nullable=False)
    subfolder = Column(String, nullable=True)
    friendly_name = Column(String, nullable=False)
    captured_name = Column(String, nullable=False)
    url = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Contact(Base):
    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True, index=True)
    classification = Column(String, nullable=False)
    parent_entity_id = Column(Integer, nullable=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    role = Column(String, nullable=True)
    escalation = Column(Boolean, default=False)
    escalation_number = Column(String, nullable=True)
    alternative_phone = Column(String, nullable=True)
    status = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    analyst_name = Column(String, nullable=False)
    certification_name = Column(String, nullable=False)
    certification_date = Column(DateTime, nullable=False)
    expiry_date = Column(DateTime, nullable=True)
    status = Column(String, default="active")
    created_at = Column(DateTime, default=datetime.utcnow)

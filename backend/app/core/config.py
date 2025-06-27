# backend/app/core/config.py

import os
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent.parent
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'db.sqlite'}")

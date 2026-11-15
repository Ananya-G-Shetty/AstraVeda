import sys
from pathlib import Path

# Let this script import the "app" package from the backend folder
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import create_engine, text

from app.config import Config

engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)

with engine.connect() as conn:
    row = conn.execute(text("SELECT CURRENT_USER(), DATABASE(), VERSION()")).one()
    print("Connected:", tuple(row))
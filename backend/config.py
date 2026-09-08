import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'serisense-secret-key-cse-final-year-2026')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'serisense-jwt-super-secret-key-2026')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30) # Extended token expiration for convenience

    # Database Configuration: PostgreSQL in production, SQLite fallback for local dev
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        f"sqlite:///{os.path.join(BASE_DIR, 'serisense.db')}"
    )
    # Fix postgres:// URL issue if deployed on Render
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # File uploads
    UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max upload

from app.models.models import db
class AppConfig:
    SESSION_TYPE="SqlAlchemy"
    SESSION_SQLALCHEMY=db
    SESSION_PERMANENT=  False
    
    SESSION_COOKIE_SECURE=True
    SESSION_COOKIE_HTTPONLY=True
    SESSION_COOKIE_SAMESITE="Lax"
    SESSION_USE_SIGNER=True
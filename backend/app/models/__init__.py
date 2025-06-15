# backend/app/models/__init__.py
from .models import db, User, Lesson, Progress, UserSettings

__all__ = ['db', 'User', 'Lesson', 'Progress', 'UserSettings']

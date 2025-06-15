
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import UniqueConstraint 
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))  # For regular login users
    google_id = db.Column(db.String(128), unique=True, nullable=True)  # For Google login users
    
    __table_args__ = (
    UniqueConstraint('google_id', name='uq_google_id'),
)


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return self.password_hash and check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }


class Lesson(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # Alphabet, Words, Sentences, Games
    content = db.Column(db.Text)
    audio_url = db.Column(db.String(255))
    image_url = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "category": self.category,
            "content": self.content,
            "audio_url": self.audio_url,
            "image_url": self.image_url
        }


class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    lesson_id = db.Column(db.Integer, db.ForeignKey("lesson.id"), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    attempts = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "lesson_id": self.lesson_id,
            "completed": self.completed,
            "attempts": self.attempts
        }


class UserSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    font = db.Column(db.String(50), default="OpenDyslexic")
    text_size = db.Column(db.String(20), default="medium")
    theme = db.Column(db.String(20), default="light_cream")
    audio_speed = db.Column(db.String(10), default="normal")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "font": self.font,
            "text_size": self.text_size,
            "theme": self.theme,
            "audio_speed": self.audio_speed
        }
    


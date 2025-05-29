from app.models.models import User
from app import db

def create_user(data):
    new_user = User(
        username=data['username'],
        email=data['email']
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user

def get_all_users():
    return User.query.all()
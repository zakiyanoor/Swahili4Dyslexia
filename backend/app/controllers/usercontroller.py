from app.models.models import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash


def create_user(data):
    hashed_password = generate_password_hash(data['password']) 
    new_user = User(
        username=data['username'],
        email=data['email'],
        password_hash=hashed_password
    )
    print("Saving user:", new_user) 
    db.session.add(new_user)
    db.session.commit()
    return new_user

def login_user(data):
    user = User.query.filter_by(email=data['email']).first()

    if user and check_password_hash(user.password_hash, data['password']):
        return user
    else:
        return None

def get_all_users():
    return User.query.all()
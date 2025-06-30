from app.models.models import User
from app import db
from werkzeug.security import generate_password_hash, check_password_hash

from app.models.models import User, db
from werkzeug.security import check_password_hash

def create_user(data):
    new_user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role='user'
    )
    db.session.add(new_user)
    db.session.commit()
    return new_user

def login_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return user
    return None
from flask import Blueprint, request, jsonify,session
from app.controllers.usercontroller import create_user, login_user
from app.models import User,db
from app import db,socketio
from werkzeug.security import generate_password_hash 


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Received data:", data) 
    user = create_user(data)
    return jsonify({'message': 'User created', 'email': user.email}), 201




@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = login_user(data)
    if user:
        session['user'] = {
            "user_id": user.id,
            "user_name": user.username,
            "role": user.role  
        }
        return jsonify({
            'message': 'Login successful',
            'email': user.email,
            'role': user.role  ,
            'user_id': user.id 
        })
    else:
        return jsonify({'message': 'Invalid credentials'}), 401




@auth_bp.route('/auth/google', methods=['POST'])
def google_login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if not user:
        user = User(
            username=data['name'],
            email=data['email'],
            password_hash=generate_password_hash(data['google_id']),
            role='user' 
        )
        db.session.add(user)
        db.session.commit()

    session['user'] = {
        "user_id": user.id,
        "user_name": user.username,
        "role": user.role  
    }

    return jsonify({'message': 'Google login successful', 'email': user.email, 'role': user.role,'user_id': user.id}), 200



@socketio.on('check_auth')
def handle_check_auth():
    user = session.get("user")
    print("SocketIO check_auth:", user)
    
    if user:
        socketio.emit("auth_response", {
            "isAuthenticated": True,
            "user": {
                "user_id": user.get("user_id"),
                "user_name": user.get("user_name"),
                "role": user.get("role") 
            }
        })
    else:
        socketio.emit("auth_response", {
            "isAuthenticated": False
        })

@auth_bp.route('/check_auth', methods=['GET'])
def check_auth():
    user = session.get('user')
    print("HTTP check_auth:", user)

    if user:
        return jsonify({
            'isAuthenticated': True,
            'user': {
                "user_id": user.get("user_id"),
                "user_name": user.get("user_name"),
                "role": user.get("role")  
            }
        })
    return jsonify({'isAuthenticated': False})
    
@auth_bp.route('/signout',methods=['POST'])
def signout():
    session.clear()
    return jsonify({"message":"Log out successful"})

@auth_bp.route('/auth/user', methods=['GET'])
def get_current_user():
    user_session = session.get('user')
    if not user_session or not user_session.get('user_id'):
        return jsonify({'user': None}), 401
    user = User.query.get(user_session['user_id'])
    if not user:
        return jsonify({'user': None}), 401
    return jsonify({'user': {
        'user_id': user.id,
        'user_name': user.username,
        'role': user.role,
        'email': user.email
    }})

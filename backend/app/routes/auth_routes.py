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
        session['user']={"user_id":user.id,"user_name":user.username}
        return jsonify({'message': 'Login successful', 'email': user.email})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/auth/google', methods=['POST'])
def google_login():
    data = request.get_json()
    print("Google Login Data:", data)

  
    user = User.query.filter_by(email=data['email']).first()
    

    if not user:
        
        
        user = User(
            username=data['name'],
            email=data['email'],
            password_hash=generate_password_hash(data['google_id'])
        )
        db.session.add(user)
        db.session.commit()
    session['user']={"user_id":user.id,"user_name":user.username}

    return jsonify({'message': 'Google login successful', 'email': user.email}), 200

@socketio.on('check_auth')
def handle_check_auth():
   
    user = session.get("user")
    print(user)
    print("SocketIO check_auth:", user)
    if user:
        socketio.emit("auth_response", {
            "isAuthenticated": True,
            "user": user["user_name"]
        })
    else:
        socketio.emit("auth_response", {
            "isAuthenticated": False
        })

@auth_bp.route('/check_auth',methods=['GET'])
def check_auth():
    user= session.get('user')
    print(user)
    if user:
        return jsonify({'isAuthenticated':bool(user),'user':user["user_name"]})
    return jsonify({'isAuthenticated':bool(user)})
    
@auth_bp.route('/signout',methods=['POST'])
def signout():
    session.clear()
    return jsonify({"message":"Log out succesful"})

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from flask_migrate import Migrate
from app.models import db
from config import AppConfig
from flask_session import Session
from flask_socketio import SocketIO


load_dotenv()

migrate = Migrate()
socketio = SocketIO(
    cors_allowed_origins=["http://localhost:5173"],
    manage_session=True,
    async_handlers=True
    
)

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='/static')
    # CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:3000", "http://localhost:5000"])
    # CORS(app, supports_credentials=True, origins=["http://localhost:5173"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], allow_headers="*")
    
    CORS(
        app,
        supports_credentials=True,
        origins=["http://localhost:5173"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"]
    )


    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config.from_object(AppConfig)

    db.init_app(app)
    migrate.init_app(app, db)
    Session(app)
    # with app.app_context():
    #     db.create_all()

   
    from app.routes import register_routes
    register_routes(app)

  
    socketio.init_app(app)
    
    return app

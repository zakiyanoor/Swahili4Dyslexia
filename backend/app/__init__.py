import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv


load_dotenv()


db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app) 

   
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

  
    db.init_app(app)

    
    from app.routes import register_routes
    register_routes(app)

    return app


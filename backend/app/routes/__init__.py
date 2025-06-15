from app.routes.learning_routes import learning_bp
from app.routes.progress_routes import progress_bp
from app.routes.settings_routes import settings_bp
from app.routes.help import help_bp
from app.routes.auth_routes import auth_bp
from flask import Blueprint



def register_routes(app):
    app.register_blueprint(learning_bp, url_prefix='/api')
    app.register_blueprint(progress_bp, url_prefix='/api')
    app.register_blueprint(settings_bp, url_prefix='/api')
    app.register_blueprint(help_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix="/api")

from flask import Blueprint, request, jsonify
from app.models.models import UserSettings
from app import db

settings_bp = Blueprint('settings_bp', __name__)

@settings_bp.route('/settings/<int:user_id>', methods=['PUT'])
def update_settings(user_id):
    data = request.get_json()
    settings = UserSettings.query.filter_by(user_id=user_id).first()
    if not settings:
        settings = UserSettings(user_id=user_id)
    settings.font = data.get('font', settings.font)
    settings.text_size = data.get('text_size', settings.text_size)
    settings.theme = data.get('theme', settings.theme)
    settings.audio_speed = data.get('audio_speed', settings.audio_speed)
    db.session.add(settings)
    db.session.commit()
    return jsonify(settings.to_dict())

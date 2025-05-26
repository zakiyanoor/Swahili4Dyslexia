from flask import Blueprint, jsonify, request
from app.controllers.progresscontroller import save_progress, get_progress_by_user

progress_bp = Blueprint('progress_bp', __name__)

@progress_bp.route('/progress/<int:user_id>', methods=['GET'])
def get_progress(user_id):
    progress = get_progress_by_user(user_id)
    return jsonify([p.to_dict() for p in progress])

@progress_bp.route('/progress', methods=['POST'])
def post_progress():
    data = request.get_json()
    progress = save_progress(data['user_id'], data['lesson_id'])
    return jsonify(progress.to_dict()), 201
from flask import Blueprint, request, jsonify
from app.models import db, User, Lesson
from app.controllers.admin_controller import *
from functools import wraps


def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if request.method == 'OPTIONS':
            return '', 200

        user_id = request.headers.get('User-ID')
        if not user_id:
            return jsonify({'error': 'Missing User-ID header'}), 401

        user = User.query.get(user_id)
        if not user or user.role != 'admin':
            return jsonify({'error': 'Unauthorized access'}), 403

        return f(*args, **kwargs)
    return decorated_function

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin/users', methods=['GET', 'OPTIONS'])
@admin_required
def get_all_users():
    if request.method == 'OPTIONS':
        return '', 200
    return get_users_logic()

@admin_bp.route('/admin/users/<int:user_id>', methods=['DELETE', 'OPTIONS'])
@admin_required
def delete_user(user_id):
    if request.method == 'OPTIONS':
        return '', 200
    return delete_user_logic(user_id)

@admin_bp.route('/admin/lessons', methods=['POST', 'OPTIONS'])
@admin_required
def create_lesson():
    if request.method == 'OPTIONS':
        return '', 200
    return create_lesson_logic(request)

@admin_bp.route('/admin/lessons/<int:lesson_id>', methods=['PUT', 'DELETE', 'OPTIONS'])
@admin_required
def edit_or_delete_lesson(lesson_id):
    if request.method == 'OPTIONS':
        return '', 200
    if request.method == 'PUT':
        return edit_lesson_logic(lesson_id, request)
    else:
        return delete_lesson_logic(lesson_id)
@admin_bp.route('/admin/test', methods=['GET', 'OPTIONS'])
def test_admin():
    return jsonify({"message": "Admin test route working."})

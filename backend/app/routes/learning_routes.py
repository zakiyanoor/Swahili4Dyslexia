from flask import Blueprint, jsonify, request
from app.controllers.lessoncontroller import create_lesson, get_lessons_by_category, get_lesson_by_id

learning_bp = Blueprint('learning_bp', __name__)

@learning_bp.route('/lessons/<category>', methods=['GET'])
def get_lessons(category):
    lessons = get_lessons_by_category(category)
    return jsonify([l.to_dict() for l in lessons])

@learning_bp.route('/lesson/<int:lesson_id>', methods=['GET'])
def get_lesson(lesson_id):
    lesson = get_lesson_by_id(lesson_id)
    return jsonify(lesson.to_dict())

@learning_bp.route('/lesson', methods=['POST'])
def add_lesson():
    data = request.get_json()
    lesson = create_lesson(data)
    return jsonify(lesson.to_dict()), 201

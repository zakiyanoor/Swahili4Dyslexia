from flask import jsonify, request
from app.models import db, User, Lesson


def get_users_logic():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])


def delete_user_logic(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted"})
    return jsonify({"error": "User not found"}), 404



def create_lesson_logic(req):
    data = req.get_json()

    
    required = ['title', 'category', 'content']
    for field in required:
        if field not in data or not data[field].strip():
            return jsonify({'error': f'{field} is required'}), 400

    lesson = Lesson(
        title=data['title'],
        category=data['category'],
        content=data['content'],
        audio_url=data.get('audio_url', ''),
        image_url=data.get('image_url', '')
    )
    db.session.add(lesson)
    db.session.commit()
    return jsonify({"message": "Lesson created", "lesson": lesson.to_dict()}), 201



def edit_lesson_logic(lesson_id, req):
    lesson = Lesson.query.get(lesson_id)
    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404

    data = req.get_json()
    lesson.title = data.get('title', lesson.title)
    lesson.category = data.get('category', lesson.category)
    lesson.content = data.get('content', lesson.content)
    lesson.audio_url = data.get('audio_url', lesson.audio_url)
    lesson.image_url = data.get('image_url', lesson.image_url)

    db.session.commit()
    return jsonify({"message": "Lesson updated", "lesson": lesson.to_dict()})



def delete_lesson_logic(lesson_id):
    lesson = Lesson.query.get(lesson_id)
    if lesson:
        db.session.delete(lesson)
        db.session.commit()
        return jsonify({"message": "Lesson deleted"})
    return jsonify({"error": "Lesson not found"}), 404


from flask import Blueprint, jsonify, request, send_file
from app.controllers.lessoncontroller import create_lesson, get_lessons_by_category, get_lesson_by_id
from app.models.models import Lesson
from app import db
from gtts import gTTS
from io import BytesIO

learning_bp = Blueprint('learning_bp', __name__)

@learning_bp.route('/lessons/<category>', methods=['GET'])
def get_lessons(category):
    lessons = Lesson.query.filter_by(category=category).all()
    result = []
    for l in lessons:
        result.append({
            'id': l.id,
            'title': l.title,
            'content': l.content,
            'audio_url': f'/lesson/audio/{l.id}'
        })
    return jsonify(result)

@learning_bp.route('/lessons/alphabet', methods=['GET'])
def get_full_alphabet():
    lessons = Lesson.query.filter(Lesson.category.in_(["Vowels", "Alphabets"])).order_by(Lesson.id).all()
    result = []
    for l in lessons:
        result.append({
            'id': l.id,
            'title': l.title,
            'content': l.content,
            'category': l.category,
            'audio_url': f'/lesson/audio/{l.id}'
        })
    return jsonify(result)

@learning_bp.route('/lesson/audio/<int:lesson_id>', methods=['GET'])
def get_lesson_audio(lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    
   
    if lesson.category == "Alphabets":
        if lesson.content == "C":
            text = "herufi cha"  
        else:
            text = f"herufi {lesson.content.lower()}"
    elif lesson.category == "Vowels":
        text = f"irabu {lesson.content.lower()}"
    else:
        text = lesson.content.lower()

   
    tts = gTTS(text=text, lang='sw') 
    mp3_fp = BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)

    return send_file(mp3_fp, mimetype='audio/mpeg', download_name=f'{lesson.content}.mp3')

@learning_bp.route('/debug/categories', methods=['GET'])
def debug_categories():
    from sqlalchemy import func
    categories = db.session.query(Lesson.category, func.count(Lesson.id)).group_by(Lesson.category).all()
    return {cat: count for cat, count in categories}

@learning_bp.route('/delete-unwanted-letters', methods=['DELETE'])
def delete_unwanted_letters():
    unwanted_letters = ['X', 'Q']
    from app.models.models import Lesson

    deleted = Lesson.query.filter(Lesson.content.in_(unwanted_letters)).delete(synchronize_session=False)
    db.session.commit()
    return jsonify({"message": f"Deleted {deleted} unwanted letters."}), 200

@learning_bp.route("/lessons/words/all", methods=["GET"])
def get_words_grouped():
    lessons = Lesson.query.filter(~Lesson.category.in_(["Alphabets","Vowels"])).all()
    grouped = {}
    for lesson in lessons:
        if lesson.category not in grouped:
            grouped[lesson.category] = []
        grouped[lesson.category].append({
            "id": lesson.id,
            "content": lesson.content,
            "image_url": lesson.image_url,
            "audio_url": f"lesson/audio/{lesson.id}"
        })
    return jsonify(grouped)

@learning_bp.route('/lesson/<int:lesson_id>', methods=['GET'])
def get_lesson(lesson_id):
    lesson = get_lesson_by_id(lesson_id)
    return jsonify(lesson.to_dict())

@learning_bp.route('/lesson', methods=['POST'])
def add_lesson():
    data = request.get_json()
    lesson = create_lesson(data)
    return jsonify(lesson.to_dict()), 201

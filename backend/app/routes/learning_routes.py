from flask import Blueprint, jsonify, request,send_file
from app.controllers.lessoncontroller import create_lesson, get_lessons_by_category, get_lesson_by_id
from gtts import gTTS
from io import BytesIO

from app import db
from  app.models.models import Lesson
learning_bp = Blueprint('learning_bp', __name__)
@learning_bp.route('/lessons/<string:category>', methods=['GET'])
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

@learning_bp.route('/lesson/audio/<int:lesson_id>', methods=['GET'])
def get_lesson_audio(lesson_id):
    lesson = Lesson.query.get_or_404(lesson_id)
    tts = gTTS(text=lesson.content.lower(), lang='sw')  
    mp3_fp = BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)
    return send_file(mp3_fp, mimetype='audio/mpeg', download_name=f'{lesson.title}.mp3')



# @learning_bp.route('/lesson/<int:lesson_id>', methods=['GET'])
# def get_lesson(lesson_id):
#     lesson = get_lesson_by_id(lesson_id)
#     return jsonify(lesson.to_dict())

# @learning_bp.route('/lesson', methods=['POST'])
# def add_lesson():
#     data = request.get_json()
#     lesson = create_lesson(data)
#     return jsonify(lesson.to_dict()), 201

# @learning_bp.route('/api/letters', methods=['GET'])
# def get_letters():
#     letters = AlphabetLetter.query.all()
#     results = [
#         {
#             'id': letter.id,
#             'character': letter.character,
#             'example_word': letter.example_word,
#             'syllables': letter.syllables,
#             'image_url': letter.image_url,
#             'audio_url': letter.audio_url
#         } for letter in letters
#     ]
#     return jsonify(results)
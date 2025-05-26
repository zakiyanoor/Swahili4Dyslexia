from app.models.models import Lesson
from app import db

def create_lesson(data):
    lesson = Lesson(
        title=data['title'],
        content=data['content'],
        category=data['category'],
        image_url=data['image_url'],
        audio_url=data['audio_url']
    )
    db.session.add(lesson)
    db.session.commit()
    return lesson

def get_lessons_by_category(category):
    return Lesson.query.filter_by(category=category).all()

def get_lesson_by_id(lesson_id):
    return Lesson.query.get_or_404(lesson_id)

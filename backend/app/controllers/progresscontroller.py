from app.models.models import Progress,Lesson
from app import db

def save_progress(user_id, lesson_id):
    existing = Progress.query.filter_by(user_id=user_id, lesson_id=lesson_id).first()
    if existing:
        existing.attempts += 1
        existing.completed = True
        db.session.commit()
        return existing

    progress = Progress(user_id=user_id, lesson_id=lesson_id, completed=True, attempts=1)
    db.session.add(progress)
    db.session.commit()
    return progress

    
def get_progress_by_user(user_id):
    return Progress.query.filter_by(user_id=user_id).all()

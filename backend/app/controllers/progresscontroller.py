from app.models.models import Progress
from app import db

def save_progress(user_id, lesson_id):
    progress = Progress(user_id=user_id, lesson_id=lesson_id, completed=True)
    db.session.add(progress)
    db.session.commit()
    return progress

def get_progress_by_user(user_id):
    return Progress.query.filter_by(user_id=user_id).all()

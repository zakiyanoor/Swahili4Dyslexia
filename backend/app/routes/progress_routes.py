from flask import Blueprint, jsonify, request
from app.controllers.progresscontroller import save_progress, get_progress_by_user
from app.models.models import Lesson, Progress

progress_bp = Blueprint('progress_bp', __name__)

@progress_bp.route('/progress', methods=['GET'])
def get_progress():
    user_id = request.args.get('user_id') 
    if not user_id:
        return jsonify({"error": "Missing user ID"}), 400

    progress = get_progress_by_user(user_id)
    return jsonify([p.to_dict() for p in progress]), 200

@progress_bp.route('/progress', methods=['POST'])
def post_progress():
    try:
        data = request.get_json()
        user_id = data.get('user_id')
        lesson_id = data.get('lesson_id')

        if not user_id or not lesson_id:
            return jsonify({"error": "Missing user_id or lesson_id"}), 400

        progress = save_progress(user_id, lesson_id)
        return jsonify(progress.to_dict()), 201

    except Exception as e:
        import traceback
        print("Progress error:", e)
        traceback.print_exc()
        return jsonify({"error": "Internal server error"}), 500

@progress_bp.route('/progress/summary/<int:user_id>', methods=['GET'])
def get_progress_summary(user_id):
    # Get all lessons and progress for this user
    all_vocab = Lesson.query.filter_by(category='Alphabets').all()
    all_vowels = Lesson.query.filter_by(category='Vowels').all()

    total_vocab = len(all_vocab)
    total_sent = len(all_vowels)

    # Get completed lesson IDs for this user
    completed_lesson_ids = {
        p.lesson_id for p in Progress.query.filter_by(user_id=user_id, completed=True).all()
    }

    # Count how many of the vocabulary lessons were completed
    completed_vocab = len([l for l in all_vocab if l.id in completed_lesson_ids])
    completed_sent = len([l for l in all_vowels if l.id in completed_lesson_ids])

    # Calculate percentages
    vocab_progress = round((completed_vocab / total_vocab) * 100) if total_vocab else 0
    sentence_progress = round((completed_sent / total_sent) * 100) if total_sent else 0

    total_lessons = total_vocab + total_sent
    completed_total = completed_vocab + completed_sent
    overall_progress = round((completed_total / total_lessons) * 100) if total_lessons else 0

    # Badges based on progress
    badges = []
    if completed_vocab > 0:
        badges.append({'id': 1, 'icon': '📚', 'title': 'Vocabulary Starter'})
    if completed_sent > 0:
        badges.append({'id': 2, 'icon': '📝', 'title': 'Sentence Explorer'})
    if completed_total >= 5:
        badges.append({'id': 3, 'icon': '🏅', 'title': '5 Lessons Completed'})

    # Recent activities
    recent_progress = Progress.query.filter_by(user_id=user_id).order_by(Progress.id.desc()).limit(3).all()
    lesson_map = {l.id: l for l in Lesson.query.filter(Lesson.id.in_([p.lesson_id for p in recent_progress])).all()}

    recent_activities = []
    for p in recent_progress:
        lesson = lesson_map.get(p.lesson_id)
        if lesson:
            recent_activities.append({
                'id': p.id,
                'title': lesson.title,
                'date': str(p.id),  
                'score': "✅" if p.completed else "❌"
            })

    return jsonify({
        "overallProgress": overall_progress,
        "vocabularyProgress": vocab_progress,
        "sentenceProgress": sentence_progress,
        "badges": badges,
        "recentActivities": recent_activities
    }), 200

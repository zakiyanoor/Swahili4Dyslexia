from flask import jsonify,request,session
from app.models.models import db,GameQuestion,GameResult

def get_random_game_questions():
    try:
        questions = GameQuestion.query.filter_by(type="fill_blank")\
            .order_by(db.func.random()).limit(5).all()

        return jsonify([
            {
                "id": q.id,
                "question": q.question,
                "options": q.options
            } for q in questions
        ])
    except Exception as e:
        print("❌ Error fetching questions:", str(e))
        return jsonify({"error": "Failed to fetch questions"}), 500


def submit_game_answer():
    data=request.json
    question=GameQuestion.query.get(data["question_id"])
    is_correct=(data["chosen_answer"]== question.correct_answer)

    result =GameResult(
        user_id= data["user_id"],
        question_id=question.id,
        chosen_answer=data["chosen_answer"],
        is_correct=is_correct
    )
    db.session.add(result)
    db.session.commit()
    return jsonify({"correct":is_correct})
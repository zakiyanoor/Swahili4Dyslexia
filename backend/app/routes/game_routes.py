from flask import Blueprint, request
from app.controllers.gamecontroller import (
    get_random_game_questions as handle_get_questions,
    submit_game_answer as handle_submit_answer
)

game_bp = Blueprint("game", __name__)

@game_bp.route("/game/questions", methods=["GET"])
def get_questions_route():
    return handle_get_questions()

@game_bp.route("/game/submit", methods=["POST"])
def submit_answer_route():
    return handle_submit_answer()

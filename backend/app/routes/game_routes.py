from flask import Blueprint
from app.controllers import gamecontroller

game_bp=Blueprint("game",__name__)
game_bp.route("/game/questions", methods=["GET"])(gamecontroller.get_random_game_questions)
game_bp.route("/game/submit",methods=["POST"])(gamecontroller.submit_game_answer)
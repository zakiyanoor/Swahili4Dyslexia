from flask import Blueprint, jsonify

help_bp = Blueprint('help_bp', __name__)

@help_bp.route('/help', methods=['GET'])
def get_help():
    return jsonify({
        "faq": [
            "How do I use this app?",
            "Click on 'Start Learning' to begin.",
            "Track your progress via the 'My Progress' page."
        ],
        "contact": "support@swahili4dyslexia.com"
    })

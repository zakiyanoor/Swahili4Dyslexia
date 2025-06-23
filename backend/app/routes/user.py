from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, User

bp = Blueprint('user', __name__, url_prefix='/api')

@bp.route('/user', methods=['DELETE', 'OPTIONS'])
@jwt_required()
def delete_current_user():
    current_id = get_jwt_identity()
    user = User.query.get(current_id)
    if not user:
        return jsonify({'msg': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'msg': 'Account deleted'}), 200 
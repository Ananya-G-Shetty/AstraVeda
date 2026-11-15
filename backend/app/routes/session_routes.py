from flask import Blueprint, jsonify

from app.extensions import db
from app.models import Player
from app.utils import tokens

session_bp = Blueprint("sessions", __name__)


@session_bp.post("/sessions")
def create_guest_session():
    token = tokens.new_guest_token()
    db.session.add(Player(guest_token_hash=tokens.hash_token(token)))
    db.session.commit()
    # The token is shown only now. The database keeps only its hash.
    return jsonify(token=token, isGuest=True), 201
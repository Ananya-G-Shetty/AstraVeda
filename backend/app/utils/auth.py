"""Authentication helper: works out which player is making the request."""

from functools import wraps

from flask import g, request
from sqlalchemy import select

from app.extensions import db
from app.models import Player
from app.utils import tokens
from app.utils.responses import error_response
from app.utils.timeutil import utcnow


def _bearer_token():
    scheme, _, value = request.headers.get("Authorization", "").partition(" ")
    if scheme.lower() != "bearer" or not value.strip():
        return None
    return value.strip()


def _find_player(token):
    if token.startswith(tokens.GUEST_PREFIX):
        return db.session.scalar(
            select(Player).where(Player.guest_token_hash == tokens.hash_token(token))
        )
    user_id = tokens.read_user_token(token)
    if user_id is None:
        return None
    return db.session.scalar(select(Player).where(Player.user_id == user_id))


def require_player(view):
    """Rejects the request with 401 unless it carries a valid guest or user token."""

    @wraps(view)
    def wrapper(*args, **kwargs):
        token = _bearer_token()
        player = _find_player(token) if token else None
        if player is None:
            return error_response(
                401, "unauthorized", "Missing or invalid token. Start a session first."
            )
        player.last_seen_at = utcnow()
        db.session.commit()
        g.player = player
        g.user = player.user
        return view(*args, **kwargs)

    return wrapper
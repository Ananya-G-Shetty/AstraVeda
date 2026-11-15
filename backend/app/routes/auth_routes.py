from flask import Blueprint, g, jsonify, request
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from app.extensions import db
from app.models import Player, User
from app.schemas_auth import LoginSchema, RegisterSchema
from app.utils import tokens
from app.utils.auth import require_player
from app.utils.responses import error_response

auth_bp = Blueprint("auth", __name__)

HASH_METHOD = "pbkdf2:sha256"
# Used when the username doesn't exist, so login takes the same time either way.
_DUMMY_HASH = generate_password_hash("not-a-real-password", method=HASH_METHOD)


def _user_json(user):
    # parentEmail is deliberately not returned.
    return {"username": user.username, "gradeBand": user.grade_band, "country": user.country}


def _guest_player_from_request():
    """The guest player whose token came with this request, or None."""
    scheme, _, value = request.headers.get("Authorization", "").partition(" ")
    token = value.strip()
    if scheme.lower() != "bearer" or not token.startswith(tokens.GUEST_PREFIX):
        return None
    return db.session.scalar(
        select(Player).where(
            Player.guest_token_hash == tokens.hash_token(token),
            Player.user_id.is_(None),
        )
    )


@auth_bp.post("/auth/register")
def register():
    data = RegisterSchema().load(request.get_json(silent=True) or {})

    taken = db.session.scalar(select(User.id).where(User.username == data["username"]))
    if taken:
        return error_response(409, "username_taken", "That username is already taken.")

    user = User(
        username=data["username"],
        password_hash=generate_password_hash(data["password"], method=HASH_METHOD),
        grade_band=data["grade_band"],
        country=data["country"],
        parent_email=data["parent_email"],
    )
    guest = _guest_player_from_request()
    try:
        db.session.add(user)
        db.session.flush()  # gives the user an id
        if guest:
            guest.user_id = user.id        # the guest's progress now belongs to the user
            guest.guest_token_hash = None  # the old guest token stops working
        else:
            db.session.add(Player(user_id=user.id))
        db.session.commit()
    except IntegrityError:
        # Two signups for the same name at the same moment: the database caught it.
        db.session.rollback()
        return error_response(409, "username_taken", "That username is already taken.")

    return jsonify(
        token=tokens.make_user_token(user.id),
        user=_user_json(user),
        progressMerged=guest is not None,
    ), 201


@auth_bp.post("/auth/login")
def login():
    data = LoginSchema().load(request.get_json(silent=True) or {})
    user = db.session.scalar(select(User).where(User.username == data["username"]))
    password_ok = check_password_hash(
        user.password_hash if user else _DUMMY_HASH, data["password"]
    )
    if user is None or not password_ok:
        return error_response(401, "invalid_credentials", "Wrong username or password.")
    if user.player is None:  # defensive: every user should have a player
        db.session.add(Player(user_id=user.id))
        db.session.commit()
    return jsonify(token=tokens.make_user_token(user.id), user=_user_json(user)), 200


@auth_bp.get("/auth/me")
@require_player
def me():
    if g.user is None:
        return jsonify(user=None, isGuest=True), 200
    return jsonify(user=_user_json(g.user), isGuest=False), 200


@auth_bp.post("/auth/logout")
def logout():
    # Tokens are stateless: the client logs out by deleting its token.
    return "", 204
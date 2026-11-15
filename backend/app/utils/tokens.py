"""Token helpers for guest sessions and logged-in users."""

import hashlib
import secrets

from flask import current_app
from itsdangerous import BadSignature, SignatureExpired, URLSafeTimedSerializer

GUEST_PREFIX = "g_"
USER_PREFIX = "u_"
USER_TOKEN_MAX_AGE = 7 * 24 * 60 * 60  # seconds (7 days)


def new_guest_token():
    """A random token. Give it to the browser once; store only its hash."""
    return GUEST_PREFIX + secrets.token_urlsafe(32)


def hash_token(token):
    """SHA-256 hex digest (64 characters), which fits players.guest_token_hash."""
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def _serializer():
    return URLSafeTimedSerializer(current_app.config["SECRET_KEY"], salt="abnf-user-token")


def make_user_token(user_id):
    return USER_PREFIX + _serializer().dumps({"uid": user_id})


def read_user_token(token):
    """Return the user ID from a valid, unexpired user token, otherwise None."""
    if not token or not token.startswith(USER_PREFIX):
        return None
    try:
        data = _serializer().loads(token[len(USER_PREFIX):], max_age=USER_TOKEN_MAX_AGE)
    except (BadSignature, SignatureExpired):
        return None
    uid = data.get("uid") if isinstance(data, dict) else None
    return uid if isinstance(uid, int) else None
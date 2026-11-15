from flask import Blueprint, g, jsonify, request

from app.schemas import ProgressActionSchema
from app.services import progress as progress_service
from app.utils.auth import require_player

progress_bp = Blueprint("progress", __name__)


@progress_bp.get("/progress")
@require_player
def get_progress():
    return jsonify(progress_service.build_progress(g.player)), 200


@progress_bp.post("/progress")
@require_player
def post_progress():
    data = ProgressActionSchema().load(request.get_json(silent=True) or {})
    if data["type"] == "discovery":
        new_badges = progress_service.record_discovery(g.player, data["object_id"])
    else:
        new_badges = progress_service.record_story(g.player, data["object_id"])
    body = progress_service.build_progress(g.player)
    body["newBadges"] = new_badges
    return jsonify(body), 200
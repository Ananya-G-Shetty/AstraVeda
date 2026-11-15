from flask import Blueprint, g, jsonify, request

from app import rules
from app.schemas import GameSubmitSchema
from app.services import progress as progress_service
from app.utils.auth import require_player
from app.utils.responses import error_response

game_bp = Blueprint("games", __name__)


@game_bp.get("/games")
def list_games():
    return jsonify([
        {"id": game_id, "xpReward": xp, "replayXp": rules.XP_GAME_REPLAY}
        for game_id, xp in rules.GAME_XP_REWARDS.items()
    ]), 200


@game_bp.post("/games/<game_id>/submit")
@require_player
def submit_game(game_id):
    if not rules.is_valid_game(game_id):
        return error_response(404, "not_found", "Unknown game.")
    data = GameSubmitSchema().load(request.get_json(silent=True) or {})
    xp_awarded, new_badges = progress_service.submit_game(g.player, game_id, data["score"])
    return jsonify(
        xpAwarded=xp_awarded,
        newBadges=new_badges,
        progress=progress_service.build_progress(g.player),
    ), 200
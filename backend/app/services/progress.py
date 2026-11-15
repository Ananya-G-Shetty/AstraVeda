"""Progress logic: records player actions and works out XP and badges.

XP and badges are never trusted from the client and XP is never stored as a
total. Everything is recalculated from the rows in the database.
"""

from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError

from app import badges, rules
from app.extensions import db
from app.models import BadgeAward, Discovery, GameResult, Player, StoryCompletion


def _insert_once(row):
    """Insert a row, treating a unique-constraint clash as 'already there'.

    The savepoint (begin_nested) means a failed insert only undoes this one
    insert, not the whole request.
    """
    try:
        with db.session.begin_nested():
            db.session.add(row)
        return True
    except IntegrityError:
        return False


def _discovery_ids(player):
    return db.session.scalars(
        select(Discovery.object_id)
        .where(Discovery.player_id == player.id)
        .order_by(Discovery.id)
    ).all()


def _story_ids(player):
    return db.session.scalars(
        select(StoryCompletion.object_id)
        .where(StoryCompletion.player_id == player.id)
        .order_by(StoryCompletion.id)
    ).all()


def _completed_game_ids(player):
    return db.session.scalars(
        select(GameResult.game_id)
        .where(GameResult.player_id == player.id)
        .distinct()
    ).all()


def _badge_ids(player):
    return db.session.scalars(
        select(BadgeAward.badge_id)
        .where(BadgeAward.player_id == player.id)
        .order_by(BadgeAward.id)
    ).all()


def _sync_badges(player):
    """Award any badges the player has earned but not yet been given."""
    earned = badges.compute_badges(_story_ids(player), _completed_game_ids(player))
    already = set(_badge_ids(player))
    new_badges = []
    for badge_id in sorted(earned - already):
        if _insert_once(BadgeAward(player_id=player.id, badge_id=badge_id)):
            new_badges.append(badge_id)
    return new_badges


def build_progress(player):
    """The progress object the frontend expects, calculated fresh from the rows."""
    discovered = _discovery_ids(player)
    stories = _story_ids(player)
    game_xp_total = db.session.scalar(
        select(func.coalesce(func.sum(GameResult.xp_awarded), 0))
        .where(GameResult.player_id == player.id)
    )
    xp = rules.calculate_total_xp(len(discovered), len(stories), int(game_xp_total))
    return {
        "xp": xp,
        "rankIndex": rules.rank_index(xp),
        "discoveredIds": discovered,
        "completedStoryIds": stories,
        "completedGames": _completed_game_ids(player),
        "unlockedBadges": _badge_ids(player),
    }


def record_discovery(player, object_id):
    """Returns the list of newly awarded badges."""
    _insert_once(Discovery(player_id=player.id, object_id=object_id))
    new_badges = _sync_badges(player)
    db.session.commit()
    return new_badges


def record_story(player, object_id):
    """Returns the list of newly awarded badges."""
    _insert_once(StoryCompletion(player_id=player.id, object_id=object_id))
    new_badges = _sync_badges(player)
    db.session.commit()
    return new_badges


def submit_game(player, game_id, score):
    """Returns (xp_awarded, new_badges). XP depends on first-time vs replay, never on score."""
    # Lock this player's row until we commit, so two simultaneous submits
    # can't both be counted as the "first" completion.
    db.session.execute(
        select(Player.id).where(Player.id == player.id).with_for_update()
    )
    previous = db.session.scalar(
        select(func.count(GameResult.id)).where(
            GameResult.player_id == player.id, GameResult.game_id == game_id
        )
    )
    xp = rules.xp_for_game_result(game_id, is_first_completion=(previous == 0))
    db.session.add(
        GameResult(
            player_id=player.id,
            game_id=game_id,
            score=rules.clamp_score(score),
            xp_awarded=xp,
        )
    )
    db.session.flush()
    new_badges = _sync_badges(player)
    db.session.commit()
    return xp, new_badges
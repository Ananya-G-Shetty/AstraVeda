"""Server-side game rules.

The frontend owns the content (stories, quizzes). The backend owns the numbers:
which IDs are valid and how much XP each action is worth. The client never
sends XP; the server always works it out from these rules.
"""

XP_PER_DISCOVERY = 50
XP_PER_STORY = 100
XP_GAME_REPLAY = 30

MAX_SCORE = 1_000_000

OBJECT_IDS = frozenset({
    "apollo-lunar-module",
    "lunar-roving-vehicle",
    "alsep-package",
    "surveyor-landers",
    "spirit-opportunity",
    "sojourner-rover",
    "viking-landers",
    "insight-lander",
    "ingenuity-helicopter",
    "kepler-space-telescope",
    "dawn-spacecraft",
    "near-shoemaker",
    "pioneer-probes",
})

# XP for the FIRST completion of each game. Replays earn XP_GAME_REPLAY.
GAME_XP_REWARDS = {
    "lunar-rover": 250,
    "alsep-science": 250,
    "ingenuity-flight": 300,
    "mars-rover": 260,
    "insight-seismic": 250,
    "kepler-transit": 280,
}
GAME_IDS = frozenset(GAME_XP_REWARDS)

# Minimum XP needed to reach each rank (index 0 is the starting rank).
RANK_THRESHOLDS = (0, 150, 350, 600, 900, 1300)


def is_valid_object(object_id):
    return object_id in OBJECT_IDS


def is_valid_game(game_id):
    return game_id in GAME_IDS


def xp_for_game_result(game_id, is_first_completion):
    """XP depends only on the game and on first-time vs replay, never on score."""
    if is_first_completion:
        return GAME_XP_REWARDS[game_id]
    return XP_GAME_REPLAY


def calculate_total_xp(discovery_count, story_count, game_xp_total):
    """game_xp_total is the sum of xp_awarded stored on the player's game_results."""
    return (
        discovery_count * XP_PER_DISCOVERY
        + story_count * XP_PER_STORY
        + game_xp_total
    )


def rank_index(xp):
    index = 0
    for i, threshold in enumerate(RANK_THRESHOLDS):
        if xp >= threshold:
            index = i
    return index


def clamp_score(score):
    return max(0, min(int(score), MAX_SCORE))
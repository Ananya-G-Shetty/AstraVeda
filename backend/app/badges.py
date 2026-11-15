"""Server-side badge rules.

The server decides which badges a player has earned. The client's idea of
"badgeReward" is ignored. Badges come from completed stories and completed games.
"""

from app.rules import OBJECT_IDS

BADGE_IDS = frozenset({
    "moon-explorer",
    "lunar-rover-expert",
    "moon-scientist",
    "mars-explorer",
    "rover-specialist",
    "flight-pioneer",
    "seismic-pioneer",
    "exoplanet-hunter",
    "deep-space-explorer",
    "space-archaeologist",
})

# Completing the story of an object earns this badge.
STORY_BADGES = {
    "apollo-lunar-module": "moon-explorer",
    "lunar-roving-vehicle": "lunar-rover-expert",
    "alsep-package": "moon-scientist",
    "surveyor-landers": "moon-explorer",
    "spirit-opportunity": "mars-explorer",
    "sojourner-rover": "rover-specialist",
    "viking-landers": "mars-explorer",
    "insight-lander": "seismic-pioneer",
    "ingenuity-helicopter": "flight-pioneer",
    "kepler-space-telescope": "exoplanet-hunter",
    "dawn-spacecraft": "deep-space-explorer",
    # The frontend names "asteroid-pioneer" and "interstellar-pioneer" here, but
    # neither exists in badgesList. Proposed: reuse deep-space-explorer.
    "near-shoemaker": "deep-space-explorer",
    "pioneer-probes": "deep-space-explorer",
}

# Completing a game earns this badge.
GAME_BADGES = {
    "lunar-rover": "lunar-rover-expert",
    "alsep-science": "moon-scientist",
    "ingenuity-flight": "flight-pioneer",
    "mars-rover": "rover-specialist",
    "insight-seismic": "seismic-pioneer",
    "kepler-transit": "exoplanet-hunter",
}

# Nothing in the frontend awards this one. Proposed: all stories complete.
GRAND_BADGE = "space-archaeologist"


def compute_badges(completed_story_ids, completed_game_ids):
    """Return the set of badge IDs earned from the given completed stories and games."""
    stories = set(completed_story_ids)
    earned = set()

    for object_id in stories:
        badge = STORY_BADGES.get(object_id)
        if badge:
            earned.add(badge)

    for game_id in completed_game_ids:
        badge = GAME_BADGES.get(game_id)
        if badge:
            earned.add(badge)

    if OBJECT_IDS <= stories:
        earned.add(GRAND_BADGE)

    return earned
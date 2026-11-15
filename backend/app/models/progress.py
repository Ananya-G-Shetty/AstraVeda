from app.extensions import db
from app.utils.timeutil import utcnow


class Discovery(db.Model):
    __tablename__ = "discoveries"
    __table_args__ = (
        db.UniqueConstraint("player_id", "object_id", name="uq_discovery_player_object"),
    )

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(
        db.Integer,
        db.ForeignKey("players.id", ondelete="CASCADE"),
        nullable=False,
    )
    object_id = db.Column(db.String(50), nullable=False)
    discovered_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    def __repr__(self):
        return f"<Discovery player={self.player_id} object={self.object_id}>"


class StoryCompletion(db.Model):
    __tablename__ = "story_completions"
    __table_args__ = (
        db.UniqueConstraint("player_id", "object_id", name="uq_story_player_object"),
    )

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(
        db.Integer,
        db.ForeignKey("players.id", ondelete="CASCADE"),
        nullable=False,
    )
    object_id = db.Column(db.String(50), nullable=False)
    completed_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    def __repr__(self):
        return f"<StoryCompletion player={self.player_id} object={self.object_id}>"


class GameResult(db.Model):
    __tablename__ = "game_results"
    __table_args__ = (
        db.Index("ix_game_results_player_game", "player_id", "game_id"),
    )

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(
        db.Integer,
        db.ForeignKey("players.id", ondelete="CASCADE"),
        nullable=False,
    )
    game_id = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False, default=0)
    xp_awarded = db.Column(db.Integer, nullable=False, default=0)
    completed_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    def __repr__(self):
        return f"<GameResult player={self.player_id} game={self.game_id}>"


class BadgeAward(db.Model):
    __tablename__ = "badge_awards"
    __table_args__ = (
        db.UniqueConstraint("player_id", "badge_id", name="uq_badge_player_badge"),
    )

    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(
        db.Integer,
        db.ForeignKey("players.id", ondelete="CASCADE"),
        nullable=False,
    )
    badge_id = db.Column(db.String(50), nullable=False)
    awarded_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    def __repr__(self):
        return f"<BadgeAward player={self.player_id} badge={self.badge_id}>"
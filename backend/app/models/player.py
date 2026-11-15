from app.extensions import db
from app.utils.timeutil import utcnow


class Player(db.Model):
    __tablename__ = "players"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
    )
    guest_token_hash = db.Column(db.String(64), unique=True)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    last_seen_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    user = db.relationship("User", back_populates="player")

    def __repr__(self):
        return f"<Player {self.id}>"
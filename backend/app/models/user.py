from app.extensions import db
from app.utils.timeutil import utcnow


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    grade_band = db.Column(db.String(20))
    country = db.Column(db.String(60))
    parent_email = db.Column(db.String(254))
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)

    player = db.relationship(
        "Player",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
        passive_deletes=True,
    )

    def __repr__(self):
        return f"<User {self.username}>"
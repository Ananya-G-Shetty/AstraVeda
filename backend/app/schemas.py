"""Request-body validation (marshmallow). Bad input becomes a 422 before it reaches the database."""

from marshmallow import EXCLUDE, Schema, ValidationError, fields, validate

from app import rules


def _valid_object(value):
    if not rules.is_valid_object(value):
        raise ValidationError("Unknown object id.")


class ProgressActionSchema(Schema):
    class Meta:
        unknown = EXCLUDE  # ignore extra fields such as xp or badge sent by the client

    type = fields.Str(required=True, validate=validate.OneOf(["discovery", "story"]))
    object_id = fields.Str(required=True, data_key="objectId", validate=_valid_object)


class GameSubmitSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    score = fields.Integer(strict=True, load_default=0, validate=validate.Range(min=0, max=10**9))
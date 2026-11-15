"""Validation for the auth endpoints."""

from marshmallow import EXCLUDE, Schema, fields, pre_load, validate


class RegisterSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    username = fields.Str(
        required=True,
        validate=[
            validate.Length(min=3, max=30),
            validate.Regexp(r"^[A-Za-z0-9_]+\Z", error="Use only letters, numbers and underscores."),
        ],
    )
    password = fields.Str(required=True, validate=validate.Length(min=8, max=128))
    grade_band = fields.Str(data_key="gradeBand", load_default=None, allow_none=True,
                            validate=validate.Length(max=40))
    country = fields.Str(load_default=None, allow_none=True, validate=validate.Length(max=60))
    parent_email = fields.Str(data_key="parentEmail", load_default=None, allow_none=True,
                              validate=[validate.Length(max=254), validate.Email()])

    @pre_load
    def blank_email_means_none(self, data, **kwargs):
        # An empty form field arrives as "". Treat it as "no email given".
        if isinstance(data, dict) and data.get("parentEmail") == "":
            data = {**data, "parentEmail": None}
        return data


class LoginSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    username = fields.Str(required=True, validate=validate.Length(min=1, max=30))
    password = fields.Str(required=True, validate=validate.Length(min=1, max=128))
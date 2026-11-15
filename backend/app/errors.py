from marshmallow import ValidationError
from werkzeug.exceptions import HTTPException

from app.utils.responses import error_response


def register_error_handlers(app):
    @app.errorhandler(ValidationError)
    def handle_validation_error(err):
        return error_response(
            422, "validation_error", "The submitted data is not valid.", err.messages
        )

    @app.errorhandler(HTTPException)
    def handle_http_error(err):
        code = (err.name or "error").lower().replace(" ", "_")
        return error_response(err.code or 500, code, err.description)

    @app.errorhandler(Exception)
    def handle_unexpected_error(err):
        app.logger.exception("Unhandled error")
        return error_response(
            500, "internal_error", "Something went wrong on our side."
        )
from flask import Flask

from app.extensions import cors, db, migrate


def create_app(config_object=None):
    app = Flask(__name__)

    if config_object is None:
        from app.config import Config
        config_object = Config
    app.config.from_object(config_object)

    db.init_app(app)
    migrate.init_app(app, db)
    from app import models  # noqa: F401  (imported so migrations can see the models)
    cors.init_app(
        app,
        resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}},
    )

    from app.routes.health_routes import health_bp
    from app.routes.session_routes import session_bp
    from app.routes.progress_routes import progress_bp
    from app.routes.game_routes import game_bp
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(health_bp, url_prefix="/api/v1")
    app.register_blueprint(session_bp, url_prefix="/api/v1")
    app.register_blueprint(progress_bp, url_prefix="/api/v1")
    app.register_blueprint(game_bp, url_prefix="/api/v1")
    app.register_blueprint(auth_bp, url_prefix="/api/v1")
    from app.errors import register_error_handlers
    register_error_handlers(app)
    return app
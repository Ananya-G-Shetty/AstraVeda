# Abandoned But Not Forgotten: Backend

REST API for an interactive space-museum game for children about NASA equipment
left on the Moon and Mars. The frontend (React/Vite) keeps the story content.
This backend owns accounts, guest sessions, progress, XP, games and badges.

Stack: Python 3.11, Flask 3, SQLAlchemy 2, Flask-Migrate (Alembic), MySQL, marshmallow.

## Run it locally (Windows PowerShell)

    cd backend
    python -m venv venv
    .\venv\Scripts\Activate.ps1
    python -m pip install -r requirements.txt

Create the database and a least-privilege MySQL user (run in the mysql client as an admin):

    CREATE DATABASE abnf_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    CREATE USER 'abnf_user'@'localhost' IDENTIFIED BY 'choose-a-password';
    GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP, INDEX, REFERENCES
        ON abnf_db.* TO 'abnf_user'@'localhost';

Copy `.env.example` to `.env` and fill in the values. `.env` is git-ignored and must never be committed.
Generate a long random `SECRET_KEY`, for example with:

    python -c "import secrets; print(secrets.token_urlsafe(48))"

Create the tables and start the server:

    python -m flask --app run db upgrade
    python -m flask --app run run --port 5000

Check it: open http://127.0.0.1:5000/api/v1/health. The frontend runs on port 3000, which is
allowed through CORS by `CORS_ORIGINS` in `.env`.

The full API contract is in `docs/API.md`. A ready-made frontend client is in `docs/frontend/api.js`.

## Design decisions

- **The server owns the rules.** XP, ranks and badges are calculated on the server (`app/rules.py`,
  `app/badges.py`). Values sent by the client are ignored. XP is never stored as a total: it is
  recalculated from rows, so it cannot drift out of sync.
- **Score does not affect XP.** A client-sent score cannot be trusted, so XP depends only on which game
  was completed and whether it is a first completion or a replay. The score is stored (clamped) only.
- **Guest play and accounts.** A guest gets a random token; only its SHA-256 hash is stored. Signing up
  attaches the guest's existing progress to the new account, then retires the guest token.
- **Idempotent writes.** UNIQUE constraints in MySQL stop double-clicks and two open tabs from
  creating duplicate discoveries, stories or badges. Game submits lock the player row so two
  simultaneous first completions cannot both earn full XP.
- **Content stays in the frontend.** The server validates ids against its own list of 13 objects
  and 6 games, so junk ids never reach the database.

## Security notes

- Passwords are hashed with PBKDF2-SHA256 (Werkzeug). Length limits stop huge-password CPU abuse.
- Login gives the same response for a wrong username and a wrong password, and takes similar time.
- Bearer tokens, not cookies, so there are no cross-site cookie or CSRF problems. User tokens are
  signed and expire after 7 days. Guest tokens are random 256-bit values.
- Authorization comes only from the token. There is no player id in any URL or body, so one child
  cannot read or change another child's progress.
- CORS is limited to `/api/*` and to the origins listed in `CORS_ORIGINS`.
- Every input is validated (marshmallow). Errors use one JSON format and never expose internals.
- Debug mode is off unless `FLASK_DEBUG=1` is set. Secrets live only in `.env`.
- Deleting a user cascades to their player and all progress (supports erasure of a child's data).

## Children's data

Collected: username, password (hashed), grade band, country, and an OPTIONAL parent email.
Real names are not requested, and the API never returns the parent email. Verifiable parental
consent (required by India's DPDP Act) is **not** implemented yet.

## Known limitations

- No rate limiting on guest creation or login.
- Tokens are stateless: logout deletes the token on the client but cannot revoke it on the server.
- A script can call the game-submit endpoint without playing, because games run in the browser.
- Inactive guest players are not cleaned up automatically (`players.last_seen_at` supports a job).
- Not deployed. For production, run behind a WSGI server such as gunicorn, with HTTPS, and a hosted database.
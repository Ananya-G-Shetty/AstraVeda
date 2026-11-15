# Abandoned But Not Forgotten: Backend API

Base URL (local): `http://127.0.0.1:5000/api/v1`
All bodies are JSON. Send `Content-Type: application/json`.
A ready-made client is in `backend/docs/frontend/api.js`.

## How identity works

1. On first load, call `POST /sessions` to get a **guest token**. Save it in `localStorage`.
2. Send `Authorization: Bearer <token>` on every call that needs it.
3. When the child signs up (`POST /auth/register`) with the guest token in the header, their guest progress moves to the new account. **Replace the stored guest token with the new token from the response.** The old one stops working.
4. Logging out means deleting the token on the client.

The server owns XP, ranks and badges. Anything you send for those is ignored.
Display the numbers the server returns.

## The progress object

    {
      "xp": 440,
      "rankIndex": 2,
      "discoveredIds": ["apollo-lunar-module"],
      "completedStoryIds": ["apollo-lunar-module"],
      "completedGames": ["mars-rover"],
      "unlockedBadges": ["moon-explorer", "rover-specialist"]
    }

`rankIndex` is 0 to 5. Use it as the index into `explorerRanks`.
It has the same shape as the object in `useProgression.js`.

## Endpoints

### POST /sessions
No body, no token needed. Creates a guest.
Response `201`: `{"token": "g_...", "isGuest": true}`

### GET /progress
Token required. Response `200`: the progress object.

### POST /progress
Token required.
Body: `{"type": "discovery" or "story", "objectId": "apollo-lunar-module"}`
Response `200`: the progress object plus `"newBadges": ["moon-explorer"]`.
Show the badge popup for each id in `newBadges`.
Repeating the same request is safe: it will not add XP twice.
Unknown `objectId`: `422`.

### GET /games
No token needed. Response `200`: `[{"id": "lunar-rover", "xpReward": 250, "replayXp": 30}, ...]`

### POST /games/{gameId}/submit
Token required.
Body: `{"score": 120}` (integer, optional). XP does not depend on score.
Response `200`: `{"xpAwarded": 260, "newBadges": [...], "progress": {...}}`
First completion earns the full reward. Replays earn 30.
Unknown game: `404`. Bad score: `422`.

### POST /auth/register
Body:

    {"username": "neil_a", "password": "at least 8 chars", "gradeBand": "6-8",
     "country": "India", "parentEmail": "optional, may be empty"}

Username: 3 to 30 characters, letters, numbers, underscore. Password: 8 to 128 characters.
Send the guest token in the `Authorization` header to keep guest progress.
Response `201`: `{"token": "u_...", "user": {"username", "gradeBand", "country"}, "progressMerged": true}`
Username taken: `409`. Invalid input: `422`.

### POST /auth/login
Body: `{"username": "...", "password": "..."}`
Response `200`: `{"token": "u_...", "user": {...}}`.
Wrong details: `401` (same message for a wrong username or a wrong password).
Login does not merge guest progress; only signup does.

### GET /auth/me
Token required.
Response `200`: `{"user": {...}, "isGuest": false}` or `{"user": null, "isGuest": true}` for guests.

### POST /auth/logout
Response `204`. Delete the token on the client.

## Errors

Always: `{"error": {"code": "...", "message": "...", "details": {...optional}}}`

| Status | code | Meaning |
|---|---|---|
| 401 | unauthorized | Missing, invalid or expired token. Start a new guest session. |
| 401 | invalid_credentials | Wrong username or password |
| 404 | not_found | Unknown game |
| 409 | username_taken | Pick another username |
| 422 | validation_error | `details` lists the bad fields |
| 500 | internal_error | Server problem; keep working from localStorage |

User tokens expire after 7 days (then `401`: sign in again).

## Valid ids

Objects (13): apollo-lunar-module, lunar-roving-vehicle, alsep-package, surveyor-landers,
spirit-opportunity, sojourner-rover, viking-landers, insight-lander, ingenuity-helicopter,
kepler-space-telescope, dawn-spacecraft, near-shoemaker, pioneer-probes.

Games (6): lunar-rover, alsep-science, ingenuity-flight, mars-rover, insight-seismic, kepler-transit.

Story id = object id.

## XP rules

Discovery 50. Story 100. Game: first completion = its reward (250/250/300/260/250/280), replay 30.
Ranks start at 0, 150, 350, 600, 900, 1300 XP.

## Frontend must keep working if the server is down

Fall back to localStorage. Free hosts can take up to a minute to wake up.

## Open questions for the frontend team

1. `near-shoemaker` and `pioneer-probes` name badges `asteroid-pioneer` and `interstellar-pioneer`, which are not in badgesList. The server currently awards `deep-space-explorer` for both. Agree?
2. Nothing in the frontend awards `space-archaeologist`. The server awards it when all 13 stories are complete. Agree?
3. `GameModal.jsx` adds a client-side bonus to XP. The server ignores it. Show `xpAwarded` instead.
4. `ArtifactDetailScreen.jsx` says "+200 XP". The real game rewards are 250 to 300.
5. Grade band: the server accepts any text up to 20 characters. Send the same values the signup form shows.
6. Story completion currently fires when a game is launched. It should fire when the story is finished.

## Known limitations

- No rate limiting on `/sessions` or `/auth/login` yet.
- Tokens are stateless, so logout cannot revoke a stolen token before it expires.
- A script can call game submit without playing. The server does not simulate games.
- The token is stored in localStorage, so the frontend must never render untrusted HTML.
- Parent email is stored but never returned by the API. Verifiable parental consent (India's DPDP Act) is not implemented.
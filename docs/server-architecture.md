# Server Architecture

Current backend target: Railway service rooted at `server/`.

## Runtime

- Framework: Express
- Database: local SQLite through `better-sqlite3`
- Healthcheck: `GET /api/health`
- Static admin console: `/admin`
- Steam auth: `POST /api/auth/steam`
- LLM proxy: `/api/llm/dialogue`, `/api/llm/aftermath`

## Steam Session Flow

1. Electron exposes `window.steam.getAuthTicketForWebApi(identity)`.
2. The PC client posts the ticket to `POST /api/auth/steam`.
3. The server validates the ticket through `ISteamUserAuth/AuthenticateUserTicket`.
4. The server issues an HMAC-signed session token.
5. Client API calls use `Authorization: Bearer <token>`.

`GET /api/health` and `/api/auth/*` are public. Other `/api/*` routes are protected when `STEAM_REQUIRE_API_AUTH=1`; production defaults to protected even if that variable is omitted.

## Required Server Env

- `NODE_ENV=production`
- `STEAM_APP_ID=4709340`
- `STEAM_AUTH_IDENTITY=solomon-web-api`
- `STEAM_WEB_API_KEY`
- `STEAM_SESSION_SECRET`
- `STEAM_REQUIRE_API_AUTH=1`
- `STEAM_AUTH_MOCK=0`
- `OPENAI_API_KEY`

`STEAM_AUTH_MOCK=1` is allowed only outside production for stubbed local tests.

## Current Route Groups

- `/api/auth`: Steam ticket exchange and session validation.
- `/api/llm`: authenticated OpenAI proxy for game LLM calls.
- `/api/notices`, `/api/mail`, `/api/players`, `/api/stats`, `/api/seasons`: runtime service data.
- `/api/ai-prompts`, `/api/ai-agents`, `/api/ai-blocks`, `/api/ai-data-fields`: prompt/agent configuration.
- `/api/eval`, `/api/case-meta`, `/api/llm-log`: tooling and evaluation support.

## Persistence Note

Railway container files are not durable across redeploys. The current SQLite setup is acceptable for Steam auth and first release validation. Before relying on server-side player history or admin settings in production, mount persistent storage and set a dedicated DB path, or move these tables to a managed database.

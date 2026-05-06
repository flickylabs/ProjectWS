# Steam Release Environment

## Public identifiers

- Steam App ID: `4709340`
- Working app name: `Project_Solomon`
- Steam auth identity: `solomon-web-api`

The Steam auth identity is not registered in Steamworks. It is an application-defined string passed to `GetAuthTicketForWebApi(identity)` and must match the server-side `STEAM_AUTH_IDENTITY`.

## Local Electron development

Generate `steam_appid.txt` before running Electron outside the Steam client:

```bash
npm run steam:appid
```

This writes `steam_appid.txt` with `4709340`. The file is intentionally git-ignored.

## Server environment variables

Set these on the backend server, not in the Electron app and not in Vite client env:

```env
NODE_ENV=production
STEAM_APP_ID=4709340
STEAM_AUTH_IDENTITY=solomon-web-api
STEAM_WEB_API_KEY=...
STEAM_SESSION_SECRET=...
STEAM_REQUIRE_API_AUTH=1
STEAM_AUTH_MOCK=0
STEAM_ACHIEVEMENT_IDS=ACH_FIRST_CASE_CLEARED,ACH_PERFECT_VERDICT,ACH_TRUTH_BREAKTHROUGH,ACH_EVIDENCE_MASTER,ACH_MEDIATION_SUCCESS,ACH_NO_HINT_CLEAR,ACH_ALL_BASE_CASES_CLEARED,ACH_JUDGE_LEVEL_10,ACH_STREAK_7_DAYS,ACH_STEAM_DECK_SESSION
OPENAI_API_KEY=...
```

Do not set `PORT` on Railway unless Railway support or a target-port setup specifically requires it. Railway injects `PORT`, and the server listens on `0.0.0.0:$PORT` in production.

For local server testing, copy `server/.env.example` to `server/.env` and replace the secret values. `server/.env` is git-ignored and loaded by `server/index.js`.

Use these local env files:

- Root `.env`: Vite/client defaults only. Values must be public and must normally start with `VITE_`.
- Root `.env.production.local`: release build client values. Set `VITE_API_URL` here.
- `server/.env`: local backend secrets only. Keep Steam/OpenAI secret keys here for local server runs.
- Railway Variables: production backend secrets only. Do not commit or paste real secrets.

Generate `STEAM_SESSION_SECRET` locally with:

```bash
npm run steam:secret
```

Use the printed value as a secret environment variable on the server. Do not commit it.

## Local server smoke test

For mock auth without live Steam keys:

```bash
npm run steam:auth:mock
```

To verify that required server env values are present without printing secrets:

```bash
npm run server:env
```

For live auth, run the server with real env values and keep `STEAM_AUTH_MOCK=0`. The local smoke test starts the server on a temporary port and confirms that fake tickets are rejected in live mode:

```bash
npm run server:smoke
```

The smoke test also confirms that a normal API route rejects unauthenticated requests when `STEAM_REQUIRE_API_AUTH=1`.

## Steamworks native bridge

The Electron main process loads `steamworks.js` first. If Steam is not running or initialization fails, it falls back to the mock bridge.

The packaged Windows build copies `steam_api64.dll` beside the executable and unpacks the `steamworks.js` native files. For direct local Electron runs outside Steam, run:

```bash
npm run steam:appid
npm run steam:run
```

For Steam depot uploads, do not upload `steam_appid.txt`.

## SteamPipe staging

Run this before uploading the Windows depot:

```bash
npm run steam:stage:windows
```

The command builds the Electron directory release, verifies the required executable/runtime files, and copies the upload payload to `release/steam-depot/windows/` without `steam_appid.txt`.

SteamPipe templates live in `steamworks/steamcmd/`. Copy the `.vdf.template` files to `.vdf`, replace `<WINDOWS_DEPOT_ID>` with the depot ID from Steamworks, and upload with SteamCMD from the Steamworks SDK.

## Deployment notes

Railway is the first target backend host. Railway's docs recommend setting a service Root Directory for isolated monorepos, and Railway will use a `Dockerfile` found at the root of that source directory. Configure the Railway service like this:

- Service root directory: `/server`
- Config file: `/server/railway.json`
- Dockerfile: `/server/Dockerfile`
- Healthcheck path: `/api/health`
- Public API URL after domain generation: `https://<railway-domain>/api`

Create the service in Railway:

1. Open Railway and create a new project.
2. Choose Deploy from GitHub repo and select this repository.
3. Open the generated service, then go to Settings.
4. Set Root Directory to `/server`.
5. Set the config file path to `/server/railway.json` if Railway does not auto-detect it.
6. Confirm the builder uses the Dockerfile in `/server/Dockerfile`.
7. Set the healthcheck path to `/api/health` if it is not already loaded from `railway.json`.
8. In Settings > Networking > Public Networking, click Generate Domain.

Required Railway service variables:

```env
NODE_ENV=production
STEAM_APP_ID=4709340
STEAM_AUTH_IDENTITY=solomon-web-api
STEAM_WEB_API_KEY=...
STEAM_SESSION_SECRET=...
STEAM_REQUIRE_API_AUTH=1
STEAM_AUTH_MOCK=0
STEAM_ACHIEVEMENT_IDS=ACH_FIRST_CASE_CLEARED,ACH_PERFECT_VERDICT,ACH_TRUTH_BREAKTHROUGH,ACH_EVIDENCE_MASTER,ACH_MEDIATION_SUCCESS,ACH_NO_HINT_CLEAR,ACH_ALL_BASE_CASES_CLEARED,ACH_JUDGE_LEVEL_10,ACH_STREAK_7_DAYS,ACH_STEAM_DECK_SESSION
OPENAI_API_KEY=...
```

Do not paste real secrets into chat, issue comments, or committed files. Add them only through Railway's Variables tab or CLI.

Any server platform is acceptable as long as it can run Node.js and store environment variables securely. Required capabilities:

- HTTPS endpoint reachable by the Electron app.
- Persistent process for `server/index.js`.
- Secret environment variables for Steam and OpenAI keys.
- Network access to `https://partner.steam-api.com` and `https://api.openai.com`.

Recommended first deployment path:

1. Deploy only the `server/` app as a Railway Node/Docker service.
2. Set the environment variables above in the hosting provider's secret/env UI.
3. Generate a Railway-provided domain or attach a custom domain.
4. Verify `GET https://<railway-domain>/api/health`.
5. Point the Electron/Vite build at the server with `VITE_API_URL=https://<railway-domain>/api`.
6. Verify Railway with `npm run railway:smoke`.
7. Build and stage the Steam Windows depot payload with `npm run steam:stage:windows`.
8. Verify `POST /api/auth/steam` from the Electron build.

The current server uses a local SQLite file inside the container. That is acceptable for the first Steam auth/API bridge test, but Railway service storage is ephemeral across redeploys. If persistent server-side settings or player records are needed, add a `DATABASE_PATH` env option and mount a Railway volume outside the application directory, for example `/data/solomon.db`.

## Steam Deck strategy

Initial Steam Deck support path is Windows build plus Proton validation. Do not create a Linux native depot until the Windows/Proton path is tested and a real need appears.

Use the guarded release scripts when a real server URL is ready. The release scripts read `VITE_API_URL` from the shell or from root `.env.production.local`.

```bash
npm run steam:dir:release
npm run steam:stage:windows
npm run steam:package:release
```

Current local release env:

```env
VITE_API_URL=https://projectws-production-c6c6.up.railway.app/api
```

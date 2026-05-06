# Release Runbook

This runbook reflects the current Steam/Railway PC release path. Older Vercel web deployment notes were archived under `docs/LEGACY/20260506-pre-steam-cleanup/root-web-deploy/`.

## Release Targets

- PC client: Vite PC build from `vite.config.pc.ts`
- Desktop wrapper: Electron in `electron/`
- Backend: Railway service rooted at `server/`
- Steam auth: `POST /api/auth/steam`
- Steam Deck: Windows build first, Proton validation

## Required Local Files

- `server/.env`: server-only secrets such as `STEAM_WEB_API_KEY`, `STEAM_SESSION_SECRET`, and `OPENAI_API_KEY`
- `.env.production.local`: release client API URL

Example:

```powershell
VITE_API_URL=https://projectws-production-c6c6.up.railway.app/api
```

Do not commit either env file.

## Preflight

```powershell
npm run server:env
npm run server:smoke
npm run build:pc
npm run check:policy
npm run check:sync
```

Expected results:

- `server:env`: all required server variables present, secret values not printed
- `server:smoke`: health ok and fake Steam ticket rejected in live mode
- `build:pc`: Vite PC bundle succeeds
- `check:policy`: free interrogation policy corpus passes
- `check:sync`: `qa:fast` release status is ready with P0 = 0

## Railway Backend

Railway service settings:

- Root Directory: `/server`
- Start Command: `npm start`
- Healthcheck Path: `/api/health`
- Public API base: `https://projectws-production-c6c6.up.railway.app/api`

Required Railway variables:

- `NODE_ENV=production`
- `PORT`
- `STEAM_APP_ID=4709340`
- `STEAM_AUTH_IDENTITY=solomon-web-api`
- `STEAM_WEB_API_KEY`
- `STEAM_SESSION_SECRET`
- `STEAM_REQUIRE_API_AUTH=1`
- `OPENAI_API_KEY`
- `STEAM_AUTH_MOCK=0`

Verify Railway after a redeploy:

```powershell
npm run railway:smoke
```

This checks `/api/health` and confirms a normal API route rejects unauthenticated requests.

## Steam Directory Release

```powershell
npm run steam:dir:release
```

This verifies `VITE_API_URL`, builds the PC bundle, writes `steam_appid.txt`, and creates the Electron directory release.

## Steam Depot Staging

```powershell
npm run steam:stage:windows
```

This creates `release/steam-depot/windows/` for the Windows depot upload and removes `steam_appid.txt` from the upload payload.

SteamPipe templates are in `steamworks/steamcmd/`. Copy the `.vdf.template` files to `.vdf`, replace `<WINDOWS_DEPOT_ID>` with the Steamworks depot ID, and upload using SteamCMD from the Steamworks SDK.

## Local Test Shortcuts

```powershell
start-server.bat
run-pc.bat
simulator.bat
```

`run-pc.bat` starts the local API server when needed and then opens the PC Vite app. `simulator.bat` is for route/QA simulator runs.

## Archive Policy

Generated results should stay in ignored `tmp/`. Historical Vercel config, old generator scripts, prompt batches, old QA packets, and reference assets are preserved in `docs/LEGACY/20260506-pre-steam-cleanup/`.

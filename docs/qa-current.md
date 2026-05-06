# Current QA Guide

Use these commands for the current PC/Steam preparation flow.

## Fast Local Checks

```powershell
npm run server:env
npm run server:smoke
npm run build:pc
```

`server:env` validates required server environment variables without printing secrets. `server:smoke` verifies the server health/auth smoke path. `build:pc` verifies the Vite PC bundle and TypeScript build.

## Gameplay/Route QA

```powershell
npm run qa:fast
npm run qa:free-interrogation
```

`qa:fast` runs the current static/runtime gate and route simulator. `qa:free-interrogation` checks free interrogation policy behavior.

## Release Checks

```powershell
npm run steam:dir:release
npm run steam:stage:windows
npm run steam:ready
```

`steam:dir:release` checks `.env.production.local` for `VITE_API_URL`, builds the PC bundle, and creates the Electron directory release. `steam:stage:windows` also prepares the upload payload under `release/steam-depot/windows/`. `steam:ready` runs server env checks, server smoke, QA policy/sync checks, and Windows depot staging.

## Batch Files

- `start-server.bat`: local API server only.
- `run-pc.bat`: local server plus PC web app.
- `start-all.bat`: local server plus the normal web/admin Vite flow.
- `simulator.bat`: route/QA simulator helper.
- `reset-db.bat`: local server database reset helper.

## Output Policy

QA output belongs in `tmp/` and is ignored. Keep only durable policy, generator, release, and design guidance in `docs/`.

The two manifest directories under `tmp/` are intentionally retained because `qa:fast` and `qa:route` read them as input:

- `tmp/qa-runtime-gate-manifests/`
- `tmp/qa-route-simulator-manifests/`

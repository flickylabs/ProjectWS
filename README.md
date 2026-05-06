# Project Solomon

Project Solomon is a React + Vite investigation game prepared for a Steam PC release through an Electron wrapper and a server-side Steam authentication bridge.

## Current Targets

- Web app: Vite + React
- PC build: `vite.config.pc.ts`
- Steam shell: `electron/`
- Backend API: `server/`
- Steam App ID: `4709340`
- Release name: `Project_Solomon`
- Steam Deck path: Windows build with Proton validation first

## Local Setup

```powershell
npm install
cd server
npm install
cd ..
```

Server secrets live only in `server/.env`. Release API configuration for Electron/Vite lives in `.env.production.local`.

## Common Commands

```powershell
start-server.bat
run-pc.bat
npm run build:pc
npm run server:smoke
npm run steam:dir:release
npm run steam:stage:windows
npm run steam:ready
```

`run-pc.bat` starts the local API server when needed and then launches the PC Vite app. `npm run steam:dir:release` builds the Steam/Electron directory release and requires `VITE_API_URL` in `.env.production.local`. `npm run steam:stage:windows` prepares the Windows depot payload in `release/steam-depot/windows/`.

## Documentation

Start with `docs/README.md`. Historical one-off prompts, QA dumps, screenshots, old request packets, old generator scripts, reference asset dumps, and obsolete Vercel deployment files were moved under `docs/LEGACY/20260506-pre-steam-cleanup/` or the ignored local archive `LEGACY/20260506-pre-steam-cleanup/`.

## Repository Policy

- Do not commit `.env`, `.env.production.local`, server secrets, generated `tmp/` results, local logs, or Electron release output.
- Keep new persistent QA or generation guides under `docs/`.
- Put temporary experiment output under `tmp/`; it is intentionally ignored.

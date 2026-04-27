# Release QA Summary - 2026-04-27

Final status: PASS with caveats.

No product P0/P1/P2 findings were opened in `findings.json`.

Entry and build checks:
- `git pull origin main`: already up to date
- `git log --oneline -1`: `596d235 fix: move OpenAI calls behind server proxy`
- Initial `git status --short`: declared release QA untracked paths only
- `git diff --quiet && git diff --cached --quiet`: tracked clean
- `npm run check:all`: PASS
- `npm run build`: PASS
- `npx tsc -b --force`: PASS
- `npm run build:pc`: PASS

Domain result snapshot:
- Domain 1 API key/env: PASS. No `sk-`, `VITE_OPENAI`, or `OPENAI_API_KEY` in `dist`/`dist-pc`; actual proxy-backed LLM POST returned 200 without a client auth header.
- Domain 2 build/package: PASS. `dist` and `dist-pc` artifacts exist; Vercel config points to `npm run build:pc` and `dist-pc`.
- Domain 3 Phase0/guard-off: PASS smoke. Home -> case -> phase progression reached Phase 2 without console errors; disclosure guard default is off unless explicitly configured.
- Domain 4 API failure: PARTIAL. Proxy success path and fallback source paths were verified; automated in-game 429 path did not reach an LLM request on the scripted spouse route.
- Domain 5 save/load: PASS. Corrupted localStorage recovered to home/profile without console errors; history cap is 100 in source.
- Domain 6 Korean/font: PASS smoke. Korean rendered normally in home/case/dialogue/VFX overlay; locked `???` placeholders were observed only on locked case rows.
- Domain 7 resolution: PASS. 1280x720, 1920x1080, 2560x1440, 3840x2160 had no horizontal overflow or console errors.
- Domain 8 browser/PC: PASS for Chromium, Firefox, and Edge. Safari/Electron were not available in this Windows web-release workspace.
- Domain 9 Steam: deferred/not applicable to current Vercel web release; no Electron/Steam packaging path found.
- Domain 10 VFX: PASS smoke/static. Hierarchy constants, reduced-motion handling, and forced AI reasoning major/compact overlays were verified.

Caveats:
- Final `git status --short` still includes untracked paths outside the declared known list, including `tmp/PASTE-Codex-DevScriptPolishAudit-Commit-Request.md` and `tmp/qa-script-polish-audit-results/`. They were not created by this Release QA run.
- Domain 4 still needs a manual or targeted runtime check for the in-game 429/500 UX path.
- No commit or push was made.

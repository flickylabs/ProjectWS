# API Proxy Migration Audit Results

Date: 2026-04-27
HEAD at entry: 6cf4afa

## Entry Checks

- `git pull origin main`: already up to date.
- `git diff --quiet` / `git diff --cached --quiet`: tracked clean at entry.
- `npm run check:all`: PASS at entry.
- `npm run build:pc`: PASS at entry.
- `npx tsc -b --force`: PASS at entry.

## Required Files

- `tmp/Codex-API-Proxy-Migration-NEXT-START-MESSAGE.md`: read.
- `tmp/REQUEST-Codex-API-Proxy-Migration.md`: read.
- `tmp/qa-release-results/20260427-domain-1-api-key-env.md`: read.
- `tmp/qa-release-results/findings.json`: read.
- `vercel.json`: read and updated.
- `src/engine/llmClient.ts`: read and updated.
- `src/components/pc/result/PCResultScreen.tsx`: read and updated.
- `memory/feedback_ct_audit_before_request.md`: missing in this workspace.

## Confirmed Scope

- Client direct read sites matched the request:
  - `src/engine/llmClient.ts`
  - `src/components/pc/result/PCResultScreen.tsx`
- Server fallback sites matched the request:
  - `server/routes/eval.js`
- Script fallback sites matched the request:
  - `scripts/generate-judgment-questions.cjs`
  - `scripts/generate-case-names.cjs`
- Docs sample sites matched the request:
  - `README.md`
  - `HANDOFF.md`
  - `docs/gdd/solomon-server.html`

## Post-Fix Audit

- `rg -n "VITE_OPENAI" src server scripts README.md HANDOFF.md docs/gdd/solomon-server.html vercel.json api serverless`: 0 matches.
- `rg -n "OPENAI_API_KEY" src`: 0 matches.
- key-shaped tmp report targets:
  - `tmp/workplace-new-02-vite-debug.txt`: 0 after full-file redaction.
  - `tmp/qa-functional-results/20260427-p5-summary.md`: 0.
  - `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md`: 0.
  - `tmp/qa-release-results/20260427-domain-1-api-key-env.md`: 0.
  - `tmp/qa-release-results/findings.json`: 0.
  - `HANDOFF.md`: 0.

Note: `tmp/chrome-headless-profile/.../popup.js` still matches the broad `sk-*` regex. This is a browser extension artifact under a headless profile, not a project OpenAI key or release report artifact.

# tmp/debug Redaction

Date: 2026-04-27

## Redacted

- `tmp/workplace-new-02-vite-debug.txt`
  - Before: 2 key-shaped matches at lines 16 and 845.
  - After: 0 key-shaped matches.
  - Action: replaced the debug artifact with a short redacted stub because the original debug value was split across lines.

## Checked

- `tmp/qa-functional-results/20260427-p5-summary.md`: 0 key-shaped matches.
- `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md`: 0 key-shaped matches.
- `tmp/qa-release-results/20260427-domain-1-api-key-env.md`: 0 key-shaped matches.
- `tmp/qa-release-results/findings.json`: 0 key-shaped matches.
- `HANDOFF.md`: 0 key-shaped matches.

## Local Env

- `.env` now uses `OPENAI_API_KEY` instead of the client-exposed key name.
- The local value is not reported here.

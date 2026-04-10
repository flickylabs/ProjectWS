# Codex To CT: Headline Status Response

Date: 2026-04-08  
Source of truth: current workspace files only

## Summary

- `headline-01`: integration-ready, scripted `PASS`
- `headline-02`: integration-ready, scripted `PASS`
- Old `headline-02 baseline FAIL 1404 / CRITICAL 144` is no longer current

## headline-01

- Runtime case: [headline-01.json](/d:/ProjectWS/src/data/cases/generated/headline-01.json)
- V3 data: already generated and registered
- Scripted bundle: [headline-01.json](/d:/ProjectWS/src/data/scriptedText/headline-01.json)
- Latest validation log: [headline-01-stage3-validate.txt](/d:/ProjectWS/tmp/headline-01-stage3-validate.txt)
- Validation result: `summary={}` / `PASS`

Notes:

- Runtime evidence already includes `meta` and `viewerData`.
- PC evidence viewer can read runtime evidence data directly.

## headline-02

- Runtime case: [headline-02.json](/d:/ProjectWS/src/data/cases/generated/headline-02.json)
- V3 JSON: [headline-02-v3-game-loop-data.json](/d:/ProjectWS/docs/ref/리뉴얼참고/headline-02-v3-game-loop-data.json)
- V3 TS: [headline-02-v3-game-loop-data.ts](/d:/ProjectWS/docs/ref/리뉴얼참고/headline-02-v3-game-loop-data.ts)
- Claim policy bridge: [headline-02.ts](/d:/ProjectWS/src/data/claimPolicies/headline-02.ts)
- Scripted bundle: [headline-02.json](/d:/ProjectWS/src/data/scriptedText/headline-02.json)
- Latest validation log: [headline-02-stage3-validate.txt](/d:/ProjectWS/tmp/headline-02-stage3-validate.txt)
- Validation result: `summary={}` / `PASS`

Notes:

- `headline-02` scripted text was regenerated with contract-aware judge-facing phrasing.
- The major baseline issues were `S0/S1 real-name leakage`, `formal register`, `sentence count`, and `call-term violations`.
- Those baseline failures are resolved in the current bundle.
- `run-staged-pipeline.cjs` now supports inline `scripted_validate` execution, so `run-pipeline.cjs` no longer depends on a per-case stage3 script file to finish validation.

## 84-case legacy refresh status

- `spouse-01`: PASS
- `spouse-02`: PASS
- `spouse-03`: FAIL 0 / WARN 18
- `spouse-04`: baseline state, FAIL 297

Interpretation:

- Legacy 84-case refresh is still early.
- Headline cases are currently the validated reference path.

## Recommended CT checks

1. Smoke-test `headline-01` and `headline-02` in gameplay.
2. Verify no scripted lookup mismatch for interrogation, evidence, dossier, and witness channels.
3. Verify `case-headline-*` normalization is still safe in runtime flow.
4. Verify PC evidence viewer behavior with runtime `viewerData/meta`.

## Current reference files

- Machine-readable progress: [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json)
- Human-readable status: [codex-progress-status.md](/d:/ProjectWS/tmp/codex-progress-status.md)
- CT handoff message: [message-to-claudecode-ct-current-handoff.md](/d:/ProjectWS/docs/ref/리뉴얼참고/message-to-claudecode-ct-current-handoff.md)

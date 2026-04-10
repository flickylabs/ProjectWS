# Message To ClaudeCode CT

Read these in this order:

1. [codex-progress-status.json](/d:/ProjectWS/tmp/codex-progress-status.json)
2. [headline-02-stage3-validate.txt](/d:/ProjectWS/tmp/headline-02-stage3-validate.txt)
3. [headline-01-stage3-validate.txt](/d:/ProjectWS/tmp/headline-01-stage3-validate.txt)

Current state:

- `headline-01` is smoke-test ready.
  - RuntimeCaseData exists.
  - V3 GameLoopData exists.
  - ScriptedText exists.
  - Scripted validator result: `summary={}` / `PASS`.

- `headline-02` is now also smoke-test ready.
  - RuntimeCaseData exists: [headline-02.json](/d:/ProjectWS/src/data/cases/generated/headline-02.json)
  - V3 GameLoopData exists:
    - [headline-02-v3-game-loop-data.json](/d:/ProjectWS/docs/ref/리뉴얼참고/headline-02-v3-game-loop-data.json)
    - [headline-02-v3-game-loop-data.ts](/d:/ProjectWS/docs/ref/리뉴얼참고/headline-02-v3-game-loop-data.ts)
  - ScriptedText exists: [headline-02.json](/d:/ProjectWS/src/data/scriptedText/headline-02.json)
  - Scripted validator result: `summary={}` / `PASS`.

Important correction:

- Any older note saying `headline-02 scripted pending`, `headline-02 baseline FAIL 1404/CRITICAL 144`, or `headline-02 authoring/runtime only` is stale.
- The current source of truth is the progress JSON plus the latest validate log above.
- `headline-01-run-pipeline.cjs` and `headline-02-run-pipeline.cjs` now execute scripted validation inline through the shared runner.
- A missing per-case `stage3 validate` file no longer blocks the staged pipeline.

What CT should check next:

1. Both `headline-01` and `headline-02` load in gameplay without key mismatches.
2. PC evidence viewer reads runtime `viewerData/meta` directly.
3. `headline-02` dossier / witness / evidence scripted lookups resolve at runtime.
4. No integration issue appears from `case-headline-02` vs `headline-02` normalization.

If the chat UI looks stale, trust the workspace files first.

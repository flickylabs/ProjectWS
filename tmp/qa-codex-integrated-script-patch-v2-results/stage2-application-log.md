# Stage 2 Application Log

Applied at: 2026-04-27T16:11:41.894Z
Patch output: tmp/qa-codex-integrated-script-patch-v2-results/stage2-patch-output.json
Items applied: 87

## Files

- src/data/cases/generated/family-01.json: 4
- src/data/cases/generated/friend-01.json: 1
- src/data/cases/generated/spouse-01.json: 1
- src/data/disclosurePolicy/family-01.json: 1
- src/data/disclosurePolicy/spouse-01.json: 1
- src/data/emergenceHooks.ts: 2
- src/data/scriptedText/family-01.json: 27
- src/data/scriptedText/friend-01.json: 4
- src/data/scriptedText/spouse-01.json: 46

## Notes

- Original text was checked before every replacement.
- Most files were patched by exact text replacement from HEAD content to preserve formatting.
- Files with duplicate original text were patched by structured selector resolution.
- case/disclosure structured paths resolve evidence arrays by id and investigation stages by stage number.
- emergenceHooks.ts authored hook text was replaced by exact one-occurrence string match.
- Stage 3 final verification is handled by the post-application QA run.

## Pre-Commit Validation

- `node scripts/qa-runtime-gate.cjs`: PASS; total 1669, hard 0.
- Static P0 closure: evidence-stage 0, disclosure 0, surface-name 0.
- `npm run qa:route`: PASS; routes 12, actions 64, findings 9, hard 0.
- `npm run build:pc`: PASS; existing Vite chunk/dynamic-import warnings only.
- `npx tsc -b --force`: PASS.
- `npm run check:all`: deferred until after commit because legacy recovery checks compare scriptedText against `git show HEAD`.

## Post-Commit Correction

- `QARG-00413`: changed `그 사정` to `자금 처리 흐름` after `v5-broad-detection` reported one P2 character-register residual.
- The correction keeps `가족 사정` surfaced while avoiding an over-broad placeholder phrase.

## Final Validation

- `npm run check:all`: PASS; 9/9 hard pass, 1 known legacy warning bucket.
- `npm run qa:fast`: PASS; RELEASE READY, static P0 0, route P0 0, combined P0 0.

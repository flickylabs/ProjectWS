# spouse-01 EN LQA Fix Result

Date: 2026-05-20 KST
Branch: `codex/phase2-fix-spouse01-en`
Base: `ab0517e6`

## Scope

- Input: `docs/design/translation-lqa-phase/reports/spouse-01_en.csv`
- Applied rows: 26 total, 20 P1 and 6 P2
- Output CSV: `docs/design/translation-lqa-phase/reports/spouse-01_en_applied.csv`
- Locale scope: EN only
- Case scope: spouse-01 only
- Matrix/glossary/origin push: not changed

## Fix Commits

- `f612ad98` Fix spouse-01 EN P1 LQA issues
- `781a05e1` Fix spouse-01 EN P2 LQA issues

## Files Updated

- `src/data/cases/generated/spouse-01.en.json`
- `src/data/dialogues/mediation/spouse-v3-01.en.json`
- `src/data/dialogues/phase1/spouse-01.en.json`
- `src/data/scriptedAngles/spouse-01_angle_catalog.en.json`
- `src/data/scriptedAngles/spouse-01_judge_questions.en.json`
- `src/data/scriptedText/spouse-01.en.json`

## Validation

| Command | Result | Notes |
|---|---:|---|
| `npx tsc -b --noEmit` | PASS | Required `npm ci` first because the new worktree had no `node_modules`. |
| `npm run qa:fast` | PASS | Static P0=0, route P0=0, combined P0=0. |
| `node scripts/detect-truth-leak.cjs` | PASS | Baseline remained 25. Findings are `friend-01` only; spouse-01 added 0. |
| `npm run qa:lqa` | FAIL | `verify-translations --strict --scan-applied` fails on existing global applied baseline: 60,367 total issues across 36,061 rows. |
| `node scripts/detect-truth-leak.cjs --strict` | FAIL | Strict mode exits non-zero on the same baseline 25 truth-leak findings, all `friend-01`. |

`qa:lqa` did not reach its chained strict truth-leak step because the verify step failed first. A separate strict truth-leak run was executed and confirmed the same baseline distribution.

## LQA Notes

- All 26 CSV recommendations were applied at the mapped EN JSON paths.
- The P2 pass fixed the literal "order of silence" phrase in the changed spouse-01 EN row.
- The applied strict scan still reports global baseline issues unrelated to this narrow spouse-01 EN batch.

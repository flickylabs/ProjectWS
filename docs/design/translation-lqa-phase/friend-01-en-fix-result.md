# friend-01 EN Phase 2 LQA Fix Result

## Scope

- Source request: `docs/design/translation-lqa-phase/thread-phase2-fix-friend01-en.md`
- Input report: `docs/design/translation-lqa-phase/reports/friend-01_en.csv`
- Applied report: `docs/design/translation-lqa-phase/reports/friend-01_en_applied.csv`
- Base: `ab0517e6`
- Branch: `codex/phase2-fix-friend01-en`

## Applied Counts

| Severity | Input | Applied | Skipped | Notes |
|---|---:|---:|---:|---|
| P0 | 18 | 18 | 0 | 14 direct option A, 4 truth-leak-guard retouches |
| P1 | 38 | 38 | 0 | 37 direct option A, 1 context-preserved witness update |
| P2 | 4 | 4 | 0 | 3 option A, 1 option B |
| Total | 60 | 60 | 0 | |

## Files Changed

- `src/data/cases/generated/friend-01.en.json`
- `src/data/scriptedText/friend-01.en.json`
- `src/data/scriptedAngles/friend-01_judge_questions.en.json`
- `src/data/scriptedAngles/friend-01_angle_catalog.en.json`
- `src/data/witnessTestimonyData/localized.ts`
- `docs/design/translation-lqa-phase/reports/friend-01_en_applied.csv`
- `docs/design/translation-lqa-phase/friend-01-en-fix-result.md`

Note: witness testimony EN runtime text is in `src/data/witnessTestimonyData/localized.ts`. The KO source file `src/data/witnessTestimonyData/friend-01.ts` was not edited.

## Truth-Leak Guard

Guarded P0 rows avoided reintroducing exact hidden-keyword phrases:

- `meta.anchorTruth`: retouched `warn/villain` wording to `make him cautious` / `accepted the blame`.
- `dc-3-b-q1-late-v1`, `v3`, `v7`: retouched direct money/warning phrasing to `financial request`, `financial ask`, and `speak to the fiance first`.

`node scripts/detect-truth-leak.cjs` stayed at the baseline:

| Check | Before | After |
|---|---:|---:|
| total findings | 25 | 25 |
| friend-01 | 25 | 25 |
| by language | ko 8 / en 5 / ja 6 / zh-CN 6 | ko 8 / en 5 / ja 6 / zh-CN 6 |

## Validation

Baseline was measured in a detached worktree at `ab0517e6`; after was measured in `D:/solomon-phase2-friend01-en`.

| Command | Before | After |
|---|---|---|
| `npx tsc -b --noEmit` | PASS | PASS |
| `npm run qa:fast` | PASS, static P0=0, route P0=0 | PASS, static P0=0, route P0=0 |
| `node scripts/detect-truth-leak.cjs` | PASS, 25 findings | PASS, 25 findings |
| `npm run qa:lqa` | FAIL, verify total issues 60371 | FAIL, verify total issues 60368 |

`npm run qa:lqa` fails before and after because `verify-translations.cjs --strict --scan-applied` reports existing repository-wide strict issues and stops before the strict truth-leak step. The separate truth-leak command was run after the fix and stayed at baseline.

## Safety Notes

- EN-only sync was preserved.
- KO, JA, and ZH-CN locale files were not edited.
- `docs/localization/glossary.csv` and `docs/localization/non-dialogue-extract/truth-leak-matrix.json` were not edited.
- No matrix or origin push was performed.

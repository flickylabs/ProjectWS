# ui-global Phase 2 LQA Fix Result

Branch: `codex/phase2-fix-ui-global`
Base: `ab0517e6`

## Scope

- Applied only `src/i18n/messages/*.ts` locale values for `en`, `ja`, and `zh-CN`.
- Left all `ko` objects unchanged.
- Left `docs/localization/glossary.csv` unchanged.
- Wrote applied CSV outputs only for the ui-global batch.

## Input Count

The request listed 56 entries, but the checked-in CSV files contain 53 entries:

| CSV | P0 | P1 | P2 | Total |
|---|---:|---:|---:|---:|
| `ui-global_en.csv` | 5 | 12 | 6 | 23 |
| `ui-global_ja.csv` | 5 | 1 | 5 | 11 |
| `ui-global_zh-CN.csv` | 6 | 13 | 0 | 19 |
| Total | 16 | 26 | 11 | 53 |

All 53 rows were applied. Skips: 0.

## Applied Summary

- P0: 16 applied, 0 skipped.
- P1: 26 applied, 0 skipped.
- P2: 11 applied, 0 skipped.
- Applied CSVs:
  - `docs/design/translation-lqa-phase/reports/ui-global_en_applied.csv`
  - `docs/design/translation-lqa-phase/reports/ui-global_ja_applied.csv`
  - `docs/design/translation-lqa-phase/reports/ui-global_zh-CN_applied.csv`

## Glossary Alignment

- Brand lock terms aligned to `brand_title`, `brand_subtitle`, and `brand_full_title` across EN/JA/ZH-CN.
- EN action copy aligned to `Fact Pursuit`, `Motive Search`, `Court Control`, and `Confidential Protection`.
- JA action copy aligned to `共感アプローチ`, `個別尋問`, and `異議あり！`.
- ZH-CN public title copy removed Solomon-based wording and aligned to `真相裁决：零点审判`.
- ZH-CN questioning tone changed from harsher `审讯` usage to neutral `询问` where requested.

## Verification

- P0 gate:
  - `npx tsc -b --noEmit`: PASS
  - `npm run qa:fast`: PASS, static P0=0, route P0=0
- P1 gate:
  - `npx tsc -b --noEmit`: PASS
  - `npm run qa:fast`: PASS, static P0=0, route P0=0
- Final:
  - `npx tsc -b --noEmit`: PASS
  - `npm run qa:fast`: PASS, static P0=0, route P0=0
  - `node scripts/detect-truth-leak.cjs`: PASS, findings=25, byCase=`{"friend-01":25}`, byLang=`{"ko":8,"en":5,"ja":6,"zh-CN":6}`
  - Applied value check: PASS, 53/53 CSV rows match the target TS locale values.
  - `npm run qa:lqa`: FAIL on existing global strict LQA backlog, not on glossary lock. The run reported `glossary issues: 0`, `placeholder issues: 0`, `CJK in English issues: 0`, `placeholder leak issues: 0`, and `total issues: 60371`.

## Notes

- `qa:lqa` scans the broader applied case data set and currently fails because of out-of-scope existing empty translation, length spike, cross-batch, JA particle, ZH word-order, and name-divergence findings.
- The ui-global target CSV rows are fully applied and verified against the TS message objects.

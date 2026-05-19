# ZH-CN 3-Case LQA Fix Result

Branch: `codex/phase2-fix-zhcn-3case`  
Base: `ab0517e6`

## Scope

- Applied all 116 ZH-CN LQA rows.
- Breakdown:
  - `spouse-01_zh-CN.csv`: 39 rows (35 P1, 4 P2)
  - `family-01_zh-CN.csv`: 32 rows (2 P0, 23 P1, 7 P2)
  - `friend-01_zh-CN.csv`: 45 rows (40 P1, 5 P2)
- Generated applied reports:
  - `docs/design/translation-lqa-phase/reports/spouse-01_zh-CN_applied.csv`
  - `docs/design/translation-lqa-phase/reports/family-01_zh-CN_applied.csv`
  - `docs/design/translation-lqa-phase/reports/friend-01_zh-CN_applied.csv`

## Commits

- `18f0f169` fix(l10n): apply family zh-CN P0 corrections
- `4ecc733c` fix(l10n): apply spouse zh-CN P1 corrections
- `ae3d1184` fix(l10n): apply family zh-CN P1 corrections
- `70356639` fix(l10n): apply friend zh-CN P1 corrections
- `4818be22` fix(l10n): apply spouse zh-CN P2 polish
- `d2593f2c` fix(l10n): apply family zh-CN P2 polish
- `ba8e5947` fix(l10n): apply friend zh-CN P2 polish

## Notes

- ZH-CN files only were edited.
- KO/EN/JA files were not changed.
- `matrix.json`, `glossary.csv`, and origin refs were not pushed or edited.
- `family-01-dossier-dc-4-b-q1-allBands` was retouched from the CSV recommendation to keep the hidden keyword abstracted: `出生秘密` was not reintroduced in that question text.

## Verification

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS
  - static P0=0
  - route P0=0
  - combined P0=0
- `node scripts/detect-truth-leak.cjs`: PASS
  - truth leak findings: 25
  - byCase: `{"friend-01":25}`
  - byLang: `{"ko":8,"en":5,"ja":6,"zh-CN":6}`
- `npm run qa:lqa`: FAIL, existing strict LQA backlog remains
  - rows: 36061
  - placeholder issues: 0
  - glossary issues: 0
  - literal English noun phrase issues: 78
  - cross-batch inconsistency issues: 1762
  - Chinese Korean word order issues: 516
  - person-name divergence issues: 31
  - total issues: 60365

# JA 3-Case Phase 2 LQA Fix Result

## Summary

- Scope: spouse-01 JA, family-01 JA, friend-01 JA
- Source CSVs:
  - `docs/design/translation-lqa-phase/reports/spouse-01_ja.csv`
  - `docs/design/translation-lqa-phase/reports/family-01_ja.csv`
  - `docs/design/translation-lqa-phase/reports/friend-01_ja.csv`
- Applied CSVs:
  - `docs/design/translation-lqa-phase/reports/spouse-01_ja_applied.csv`
  - `docs/design/translation-lqa-phase/reports/family-01_ja_applied.csv`
  - `docs/design/translation-lqa-phase/reports/friend-01_ja_applied.csv`

| Case | P0 | P1 | P2 | Total | Skipped |
| --- | ---: | ---: | ---: | ---: | ---: |
| spouse-01 | 12 | 13 | 6 | 31 | 0 |
| family-01 | 6 | 23 | 8 | 37 | 0 |
| friend-01 | 9 | 26 | 0 | 35 | 0 |
| Total | 27 | 62 | 14 | 103 | 0 |

## Applied Scope

- `src/data/scriptedText/{spouse,family,friend}-01.ja.json`
  - Replaced incorrect interrogation, evidence-present, contradiction, interjection, combo, and aftermath strings by row id or path index.
- `src/data/scriptedAngles/{spouse,family,friend}-01_*.ja.json`
  - Updated judge question variants and angle labels/descriptions.
- `src/data/cases/generated/{spouse,family,friend}-01.ja.json`
  - Updated case surface metadata, party fields, witness knowledge scope, v3 depth labels, and one trust-state summary.
- `src/data/dialogues/phase1/{spouse,family}-01.ja.json`
  - Updated phase 1 dialogue lines with case-specific JA terminology.
- `src/data/dialogues/mediation/{spouse,family}-v3-01.ja.json`
  - Updated mediation condition/fact-first lines.

## JA Notes

- D2 meaning/voice: removed unrelated template bleed and restored the KO source scope for each target row.
- D5 truth-leak: family S0/S1 hidden-detail rows were rewritten to avoid notary memo, caregiver testimony, account-flow, and draft/copy leakage when the KO source did not expose them.
- D6 honorific/name: normalized `ソン・ダウン`, `チェ・スミン`, `イ・ジュノ`, `パク・ジヨン`, `ユン・テソン`, `ユン・ジョンフ` usage in touched rows.
- Terminology: used `共同積立預金`, `隠し資金`, `公証本`, `自筆下書き`, `介護施設の訪問記録`, and `元介護職員の音声証言` where the CSV flagged drift.
- Truth-leak guard: did not reintroduce the guarded exact hidden keywords such as `出生秘密`, `悪役を自ら`, or `金を貸して` in the touched JA batch. Detector baseline stayed unchanged.

## Verification

| Check | Before | After |
| --- | --- | --- |
| `npx tsc -b --noEmit` | PASS after local `npm ci` | PASS |
| `npm run qa:fast` | PASS, static P0=0, route P0=0 | PASS, static P0=0, route P0=0 |
| `node scripts/detect-truth-leak.cjs` | 25 findings; friend-01=25; JA=6 | 25 findings; friend-01=25; JA=6 |
| `npm run qa:lqa` | exit 1, total issues 60371 | exit 1, total issues 60346 |

`qa:lqa` remains non-zero because the repo-wide strict LQA backlog is still present outside this JA hot batch. This batch reduced the strict total by 25 net issues. Empty translation issues decreased from 36960 to 36920; Japanese particle anomaly and cross-batch inconsistency heuristics increased slightly after replacing generic template strings with source-specific Japanese, but the total still decreased and the requested truth-leak baseline did not rise.

## Commits

- `306ed706` Fix spouse-01 JA P0 LQA rows
- `fc636ea0` Fix family-01 JA P0 LQA rows
- `781ab02c` Fix friend-01 JA P0 LQA rows
- `2aad61bc` Fix spouse-01 JA P1 LQA rows
- `eccbd0a8` Fix family-01 JA P1 LQA rows
- `4ab369f8` Fix friend-01 JA P1 LQA rows
- `320e313d` Fix spouse-01 JA P2 LQA rows
- `0de10593` Fix family-01 JA P2 LQA rows

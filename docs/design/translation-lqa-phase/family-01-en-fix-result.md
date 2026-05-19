# family-01 EN Phase 2 LQA Fix Result

## Summary

- Source CSV: docs/design/translation-lqa-phase/reports/family-01_en.csv
- Applied CSV: docs/design/translation-lqa-phase/reports/family-01_en_applied.csv
- P0: 45 applied, 0 skipped
- P1: 157 applied, 6 skipped
- Total: 202 applied, 6 skipped

## Applied Scope

- src/data/scriptedText/family-01.en.json
  - P0 scriptedText variants: 45
  - P1 scriptedText variants: 142
  - P1 witnessName fields: 3 CSV rows, 9 repeated witnessName slots
- src/data/scriptedAngles/family-01_angle_catalog.en.json
  - P1 angle labels/descriptions: 12

## Skips

The following 6 P1 rows were skipped because their exact targets are only present outside the approved write scope for this task:

- family-01-6-D6: src/data/dialogues/phase1/family-01.en.json
- family-01-16-D6: src/data/dialogues/phase1/family-01.en.json
- family-01-24-D6: src/data/dialogues/phase1/family-01.en.json
- family-01-mediation-conditional-dialogue-1-D6: src/data/dialogues/mediation/family-v3-01.en.json
- family-01-mediation-postpone-dialogue-1-D6: src/data/dialogues/mediation/family-v3-01.en.json
- family-01-mediation-fact-first-dialogue-1-D6: src/data/dialogues/mediation/family-v3-01.en.json

## 9-Dimension Validation Notes

- D2 P0 rows replaced unrelated English templates with the recommended KO-aligned option_a text. The original row ids, party, disputeId, questionType, and lieState keys were not changed, so character knowledge progression stays on the existing route graph.
- D6 P1 rows were glossary/name consistency fixes or angle label/description corrections. They preserve the same source intent while normalizing Yoon Jeong-hu, Choi Bok-sun, Kim Yeong-su, and Park Sun-ae where the approved files contained the target strings.
- No KO source files, other languages, glossary, matrix, or truth-leak matrix files were edited.

## Verification

| Check | Before | After |
| --- | --- | --- |
| npx tsc -b --noEmit | PASS | PASS |
| npm run qa:fast | PASS, static P0=0, route P0=0 | PASS, static P0=0, route P0=0 |
| node scripts/detect-truth-leak.cjs | 11 findings; family-01=6, friend-01=5; en=1 | 11 findings; family-01=6, friend-01=5; en=1 |
| npm run qa:lqa | exit 1, total issues 60458 | exit 1, total issues 60370 |

qa:lqa remains non-zero because the repository-wide strict LQA baseline still contains pre-existing issues outside this hot batch. The family-01 EN hot batch reduced the repository total by 88 issues: English length spike 17019 -> 16976 and literal English noun phrase 123 -> 78.

# SCRIPT_EN family-01 e-5 Reassignment Sync Summary

## Files touched
- `src/data/cases/generated/family-01.en.json`
- `src/data/scriptedAngles/family-01_angle_catalog.en.json`
- `src/data/scriptedAngles/family-01_judge_questions.en.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.en.json`
- `src/data/scriptedText/family-01.en.json`
- `src/data/disclosurePolicy/family-01.json` (EN-language guard fields only)

Skipped because no EN sidecar exists in this worktree: `family-01_special_scripts.en.json`, `family-01-structure-v2.en.json`, `family-01-dossier-cards.en.json`, `family-01-v2-atoms.en.json`, `family-01-game-events.en.json`, `family-01-game-events-v2.en.json`.

## Variant counts
- Tier 1 data: 17 localized data fields changed in `family-01.en.json`.
- Tier 1 disclosure policy: 2 EN-language guard fields changed.
- Tier 2 narrative split: 1273 text variants changed (`interrogation_answers` 871, `scriptedText` 375, `judge_questions` 27).
- Tier 2 angle catalog: 4 visible label/description fields changed.

## Narrative-shift compliance
- d-2 EN anchors now frame the issue as morning intake blank -> afternoon amendment 60:40, Jeong-hu pressure, and Mother's unstable state.
- d-2 scoped forbidden lexeme scan returned 0 visible-text violations for handwritten / 90:10 / forgery / own-share-reduction / practice-draft and adjacent d-4/d-5 motive leaks.
- d-5 data anchors now carry the handwritten 90:10 -> notarized 60:40 trace where the KO source carries that evidence weight.
- `truth-leak-matrix.json` EN was verified only; no edits were made.

## Validation
- PASS: `npm run localization:scripts:validate -- --case=family-01 --locale=en --strict`
- PASS: `npm run localization:cases:validate -- --case=family-01 --locale=en --strict`
- PASS: `npm run check:policy -- --locale=en`
- BASELINE FAIL: `npm run qa:lqa` stops in `verify-translations.cjs --strict --scan-applied` with repository-wide pre-existing totals (totalIssues=59721); strict truth leak was run separately and passed with 0 findings.
- PASS: `node scripts/detect-truth-leak.cjs --strict`
- PASS: `npm run qa:fast`
- PASS: `npm run qa:cutscene`

# Thread: SCRIPT_EN Family/Friend Expansion

Target: ClaudeCode
Role: `SCRIPT_EN`

## Status

`spouse-01` pilot is now unqualified GO after Thread-24 recheck.

Do not rework `spouse-01` unless a validator failure directly requires a tiny compatibility fix. The current task is to create and polish English sidecars for:

- `family-01`
- `friend-01`

## Mandatory References

Read these before working:

- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/VARIATION_AUDIT_SUMMARY.json`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/TRUTH_BOUNDARY_SUMMARY.json`
- `docs/localization/threads/script-11-claudecode-en-script-bulk-translation.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `src/data/disclosurePolicy/family-01.json`
- `src/data/disclosurePolicy/friend-01.json`

## Scope

Create or update only English sidecars for `family-01` and `friend-01`.

Allowed write targets:

- `src/data/scriptedText/family-01.en.json`
- `src/data/scriptedText/friend-01.en.json`
- `src/data/scriptedAngles/family-01_angle_catalog.en.json`
- `src/data/scriptedAngles/friend-01_angle_catalog.en.json`
- `src/data/scriptedAngles/family-01_judge_questions.en.json`
- `src/data/scriptedAngles/friend-01_judge_questions.en.json`
- `src/data/scriptedAngles/family-01_interrogation_answers.en.json`
- `src/data/scriptedAngles/friend-01_interrogation_answers.en.json`
- `src/data/scriptedAngles/family-01_special_scripts.en.json`, if structurally supported
- `src/data/scriptedAngles/friend-01_special_scripts.en.json`, if structurally supported
- `src/data/dialogues/phase1/family-01.en.json`
- `src/data/dialogues/phase1/friend-01.en.json`
- `src/data/dialogues/mediation/family-v3-01.en.json`
- `src/data/dialogues/mediation/friend-v3-01.en.json`
- `src/data/cases/generated/family-01.en.json`
- `src/data/cases/generated/friend-01.en.json`

Do not edit Korean source files. Do not edit JA or zh-CN sidecars.

## Mandatory Sub-Agent Split

Use sub-agents aggressively. Suggested split:

1. `EN_FAMILY_SCRIPTED_TEXT`
2. `EN_FAMILY_ANGLES`
3. `EN_FRIEND_SCRIPTED_TEXT`
4. `EN_FRIEND_ANGLES`
5. `EN_DIALOGUES_CASE_SURFACE`
6. `EN_QA_EDITOR`

The main thread must review, merge, normalize terminology, run audits, and produce final sidecars. Do not return raw sub-agent output without review.

## Mandatory Sentence-Pool Pattern

Thread-24 made this mandatory for all English high-volume surfaces:

1. Use build scripts plus sentence pools. Do not inline-translate thousands of variants by hand.
2. Build a 3-anchor Sentence-A pool per high-volume bucket.
3. Bucket identity should include the relevant dimensions, for example `(party, disputeId, angleId, lieState)` or `(party, disputeId, lieState, questionType)`.
4. Rotate openers by `variantIdx % 3`.
5. Preserve middle and closer variation. Do not collapse existing tail variation.
6. Hand-curate S5 anchors with licensed truth lexemes for each case.
7. Run variation and truth-boundary audit scripts before merging.

Use the Thread-25 build scripts as reference patterns:

- `tmp/script-localization/en-polish/build-answers-d1-d2-polish.cjs`
- `tmp/script-localization/en-polish/build-answers-hd3-hd4-polish.cjs`
- `tmp/script-localization/en-polish/audit-variation.cjs`
- `tmp/script-localization/en-polish/audit-truth-boundary.cjs`

Parameterize or clone those scripts for `family-01` and `friend-01`.

## Required Quality Gates

For every high-volume bucket with 6 or more variants:

- at least 3 distinct opener anchors
- at least 3 distinct closer anchors
- no same first-60-character prefix in more than 50% of variants
- non-S5 forbidden truth lexeme violations = 0
- public brand literal violations = 0

S5 must disclose the licensed truth strongly enough for narrative parity with Korean.

## Validation Commands

Run at minimum:

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=en --strict
npm run localization:scripts:validate -- --case=friend-01 --locale=en --strict
npm run localization:scripts:validate -- --locale=en
npm run check:policy -- --locale=en
npm run check:all
```

Run `npm run build:pc` if feasible.

## Output Directory

Write reports to:

`docs/localization/threads/outputs/script-thread-27-en-family-friend-expansion/`

Required:

- `SUMMARY.md`
- `TRANSLATION_MANIFEST.csv`
- `COVERAGE_REPORT.csv`
- `EN_VARIATION_AUDIT.csv`
- `TRUTH_BOUNDARY_AUDIT.csv`
- `GLOSSARY_DELTAS.csv`
- `LINE_LENGTH_RISKS.csv`
- `VALIDATION_RESULTS.md`

## Final Response

Return:

- sidecar files created or modified
- sub-agents used
- coverage by case and surface
- variation gate results for family-01 and friend-01
- truth-boundary results
- validation command results
- remaining blanks, skipped fields, or decisions needed

# Thread: SCRIPT_JA Family/Friend Expansion

Target: ClaudeCode
Role: `SCRIPT_JA`

## Status

`spouse-01` pilot is GO. Japanese `spouse-01` sidecars are the style and structure reference, but do not rework them during this pass unless a validator failure requires a narrow compatibility fix.

The current task is to create Japanese sidecars for:

- `family-01`
- `friend-01`

## Mandatory References

Read these before working:

- `docs/localization/threads/script-12-claudecode-ja-script-bulk-translation.md`
- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/SUMMARY.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `src/data/disclosurePolicy/family-01.json`
- `src/data/disclosurePolicy/friend-01.json`
- existing `spouse-01.ja.json` sidecars under `src/data/**`

## Locked Brand

- Internal/dev-only: `Project_Solomon`
- Public Japanese full title: `ソロモンのジレンマ：真実の裁き`
- Do not use `ソロモン法廷` as public title.

## Scope

Create or update only Japanese sidecars for `family-01` and `friend-01`.

Do not edit Korean source files. Do not edit EN or zh-CN sidecars.

Allowed write targets are the Japanese sibling sidecars for active script surfaces:

- `src/data/scriptedText/{family-01,friend-01}.ja.json`
- `src/data/scriptedAngles/{caseId}_angle_catalog.ja.json`
- `src/data/scriptedAngles/{caseId}_judge_questions.ja.json`
- `src/data/scriptedAngles/{caseId}_interrogation_answers.ja.json`
- `src/data/scriptedAngles/{caseId}_special_scripts.ja.json`, if structurally supported
- `src/data/dialogues/phase1/{family-01,friend-01}.ja.json`
- `src/data/dialogues/mediation/{family,friend}-v3-01.ja.json`
- `src/data/cases/generated/{family-01,friend-01}.ja.json`

## Mandatory Sub-Agent Split

Use sub-agents aggressively. Suggested split:

1. `JA_FAMILY_SCRIPTED_TEXT`
2. `JA_FAMILY_ANGLES`
3. `JA_FRIEND_SCRIPTED_TEXT`
4. `JA_FRIEND_ANGLES`
5. `JA_DIALOGUES_CASE_SURFACE`
6. `JA_QA_EDITOR`

The main thread must review, merge, normalize terms, run audits, and produce final sidecars.

## Japanese Style

- Natural Japanese mystery/investigation game prose.
- Preserve relationship nuance, hesitation, defensiveness, and emotional pressure.
- Preserve reveal pacing. Do not clarify hidden truth earlier than Korean.
- Keep speaker voices distinct.
- Avoid over-formal legalese unless the speaker is intentionally formal.
- Split overly long sentences where Japanese readability improves.
- Use glossary terms consistently, especially for verdict, dispute, judgment, closure, reconciliation, evidence, witness, and final interrogation.

## High-Volume Generation Gate

Use Node generation scripts for high-volume sidecars. Do not inline-translate thousands of variants by hand.

For buckets with 6 or more variants:

- at least 3 distinct opener anchors
- at least 3 distinct closer anchors
- no same first-30-Japanese-character prefix in more than 70% of variants unless documented
- non-S5 forbidden truth lexeme violations = 0
- public brand literal violations = 0

Run a small self-audit and include results.

## Validation Commands

Run at minimum:

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict
npm run localization:scripts:validate -- --case=friend-01 --locale=ja --strict
npm run localization:scripts:validate -- --locale=ja
npm run check:policy -- --locale=ja
npm run check:all
```

Run `npm run build:pc` if feasible.

## Output Directory

Write reports to:

`docs/localization/threads/outputs/script-thread-28-ja-family-friend-expansion/`

Required:

- `SUMMARY.md`
- `TRANSLATION_MANIFEST.csv`
- `COVERAGE_REPORT.csv`
- `JA_VARIATION_AUDIT.csv`
- `TRUTH_BOUNDARY_AUDIT.csv`
- `GLOSSARY_DELTAS.csv`
- `LINE_LENGTH_RISKS.csv`
- `VALIDATION_RESULTS.md`

## Final Response

Return:

- sidecar files created or modified
- sub-agents used
- coverage by case and surface
- variation gate results
- truth-boundary results
- validation command results
- remaining blanks, skipped fields, or decisions needed

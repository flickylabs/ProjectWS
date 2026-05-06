# Thread: SCRIPT_ZH_CN Family/Friend Expansion

Target: ClaudeCode
Role: `SCRIPT_ZH_CN`

## Status

`spouse-01` pilot is GO. Simplified Chinese `spouse-01` sidecars are the style and structure reference, but do not rework them during this pass unless a validator failure requires a narrow compatibility fix.

The current task is to create Simplified Chinese sidecars for:

- `family-01`
- `friend-01`

## Mandatory References

Read these before working:

- `docs/localization/threads/script-13-claudecode-zh-cn-script-bulk-translation.md`
- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/SUMMARY.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `src/data/disclosurePolicy/family-01.json`
- `src/data/disclosurePolicy/friend-01.json`
- existing `spouse-01.zh-CN.json` sidecars under `src/data/**`

## Locked Brand

- Internal/dev-only: `Project_Solomon`
- Public Simplified Chinese full title: `真相裁决：零点审判`
- Do not use `所罗门的法庭`, `所罗门的两难`, or any public title containing `所罗门` / `所羅門`.

## Scope

Create or update only Simplified Chinese sidecars for `family-01` and `friend-01`.

Do not edit Korean source files. Do not edit EN or JA sidecars.

Allowed write targets are the Simplified Chinese sibling sidecars for active script surfaces:

- `src/data/scriptedText/{family-01,friend-01}.zh-CN.json`
- `src/data/scriptedAngles/{caseId}_angle_catalog.zh-CN.json`
- `src/data/scriptedAngles/{caseId}_judge_questions.zh-CN.json`
- `src/data/scriptedAngles/{caseId}_interrogation_answers.zh-CN.json`
- `src/data/scriptedAngles/{caseId}_special_scripts.zh-CN.json`, if structurally supported
- `src/data/dialogues/phase1/{family-01,friend-01}.zh-CN.json`
- `src/data/dialogues/mediation/{family,friend}-v3-01.zh-CN.json`
- `src/data/cases/generated/{family-01,friend-01}.zh-CN.json`

## Mandatory Sub-Agent Split

Use sub-agents aggressively. Suggested split:

1. `ZH_FAMILY_SCRIPTED_TEXT`
2. `ZH_FAMILY_ANGLES`
3. `ZH_FRIEND_SCRIPTED_TEXT`
4. `ZH_FRIEND_ANGLES`
5. `ZH_DIALOGUES_CASE_SURFACE`
6. `ZH_QA_EDITOR`

The main thread must review, merge, normalize terms, run audits, and produce final sidecars.

## Simplified Chinese Style

- Natural Mainland Simplified Chinese.
- Keep the tone playable, investigative, and emotionally readable.
- Preserve relationship nuance, hesitation, defensiveness, and reveal pacing.
- Do not reveal hidden truth earlier than Korean.
- Avoid stiff legalistic phrasing unless the speaker is intentionally formal.
- Use glossary terms consistently.
- Preserve the distinction:
  - `裁决` for the act/process/brand-adjacent verdict sense.
  - `判决书` for the written verdict document.
- Use `认命` for the resigned emotional state unless context clearly demands otherwise.

## High-Volume Generation Gate

Use Node generation scripts for high-volume sidecars. Do not inline-translate thousands of variants by hand.

For buckets with 6 or more variants:

- at least 3 distinct opener anchors
- at least 3 distinct closer anchors
- no same first-30-Chinese-character prefix in more than 70% of variants unless documented
- non-S5 forbidden truth lexeme violations = 0
- public brand literal violations = 0

Run a small self-audit and include results.

## Validation Commands

Run at minimum:

```powershell
npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict
npm run localization:scripts:validate -- --case=friend-01 --locale=zh-CN --strict
npm run localization:scripts:validate -- --locale=zh-CN
npm run check:policy -- --locale=zh-CN
npm run check:all
```

Run `npm run build:pc` if feasible.

## Output Directory

Write reports to:

`docs/localization/threads/outputs/script-thread-29-zh-cn-family-friend-expansion/`

Required:

- `SUMMARY.md`
- `TRANSLATION_MANIFEST.csv`
- `COVERAGE_REPORT.csv`
- `ZH_CN_VARIATION_AUDIT.csv`
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

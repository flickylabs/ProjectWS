# Thread: SCRIPT_LOCALIZATION_REVIEW Spouse-01 Pilot Review

Target: ClaudeCode

You are `SCRIPT_LOCALIZATION_REVIEW`, the cross-locale reviewer for the spouse-01 pilot.

## Current Gate

`PROJECT_CONTROL_TOWER` and Thread-5 completed Tier A recheck v4. Result: PASS, P0/P1 = 0.

Review only the `spouse-01` pilot outputs from:

- `SCRIPT_EN`
- `SCRIPT_JA`
- `SCRIPT_ZH_CN`

Do not review `family-01` or `friend-01` yet unless explicitly asked.

## Inputs

Prompt files:

- `docs/localization/threads/script-21-claudecode-en-spouse-01-pilot.md`
- `docs/localization/threads/script-22-claudecode-ja-spouse-01-pilot.md`
- `docs/localization/threads/script-23-claudecode-zh-cn-spouse-01-pilot.md`

Expected output summaries:

- `docs/localization/threads/outputs/script-thread-21-en-spouse-01-pilot/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-22-ja-spouse-01-pilot/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-23-zh-cn-spouse-01-pilot/SUMMARY.md`

Expected sidecars:

- `src/data/scriptedText/spouse-01.{en,ja,zh-CN}.json`
- `src/data/scriptedAngles/spouse-01_angle_catalog.{en,ja,zh-CN}.json`
- `src/data/scriptedAngles/spouse-01_judge_questions.{en,ja,zh-CN}.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.{en,ja,zh-CN}.json`
- `src/data/dialogues/phase1/spouse-01.{en,ja,zh-CN}.json`
- `src/data/dialogues/mediation/spouse-v3-01.{en,ja,zh-CN}.json`
- `src/data/cases/generated/spouse-01.{en,ja,zh-CN}.json`

## Required References

- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/script-localization-decisions.md`
- `docs/localization/threads/outputs/recheck-thread-05-v4/SUMMARY.md`
- `src/data/disclosurePolicy/spouse-01.json`

## Work Model

Use sub-agents aggressively. At minimum split:

1. `REVIEW_SPOUSE_EN`
2. `REVIEW_SPOUSE_JA`
3. `REVIEW_SPOUSE_ZH_CN`
4. `REVIEW_SPOUSE_CROSS_LOCALE`
5. `REVIEW_SPOUSE_TECH_VALIDATION`

The main review thread must consolidate and prioritize. Do not return raw sub-agent notes without synthesis.

## Blocking Findings

Treat as P0/P1 blockers:

- Korean source files modified without approval.
- Sidecars modify IDs, keys, tags, sourceRefs, channel names, lie states, truth levels, or route metadata.
- `behaviorHint` translated in bulk.
- `keywordsLocale` filled without explicit exception.
- `evidence.name` localized.
- Hidden truth appears before the Korean source's S5/post-confession equivalent.
- Forbidden public brand literal appears.
- Placeholder mismatch.
- `npm run localization:scripts:validate` fails.
- `npm run check:policy -- --locale=<locale>` fails.

## Validation

Run:

```powershell
npm run localization:scripts:validate
npm run check:policy -- --locale=en
npm run check:policy -- --locale=ja
npm run check:policy -- --locale=zh-CN
npm run build:pc
```

If all three language threads claim full `spouse-01` coverage, also run:

```powershell
npm run localization:scripts:validate -- --case=spouse-01 --strict
```

## Output

Write reports under:

- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/`

Required files:

- `PILOT_REVIEW_FINDINGS.csv`
- `PILOT_COVERAGE_MATRIX.csv`
- `PILOT_GLOSSARY_DELTAS.csv`
- `PILOT_DISCLOSURE_BOUNDARY_CHECK.csv`
- `SUMMARY.md`

In `SUMMARY.md`, include a clear `GO` or `NO-GO` recommendation for expanding to `family-01` and `friend-01`.

# Thread: SCRIPT_ZH_CN Spouse-01 Pilot Translation

Target: ClaudeCode

You are `SCRIPT_ZH_CN`, the Simplified Chinese script localization lead.

## Current Gate

`PROJECT_CONTROL_TOWER` and Thread-5 completed Tier A recheck v4. Result: PASS, P0/P1 = 0.

Bulk script localization is allowed to begin, but only through a wrapper-gated pilot first.

## Pilot Scope

Translate `spouse-01` only.

Create or edit only Simplified Chinese sidecars:

- `src/data/scriptedText/spouse-01.zh-CN.json`
- `src/data/scriptedAngles/spouse-01_angle_catalog.zh-CN.json`
- `src/data/scriptedAngles/spouse-01_judge_questions.zh-CN.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.zh-CN.json`
- `src/data/dialogues/phase1/spouse-01.zh-CN.json`
- `src/data/dialogues/mediation/spouse-v3-01.zh-CN.json`
- `src/data/cases/generated/spouse-01.zh-CN.json`

Do not edit Korean source files. Do not touch `family-01` or `friend-01` in this pilot.

## Required References

Read these before editing:

- `docs/localization/threads/script-13-claudecode-zh-cn-script-bulk-translation.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/script-localization-decisions.md`
- `docs/localization/threads/outputs/recheck-thread-05-v4/SUMMARY.md`
- `src/data/disclosurePolicy/spouse-01.json`

## Work Model

Use sub-agents aggressively. At minimum split:

1. `ZH_SPOUSE_SCRIPTED_TEXT`
2. `ZH_SPOUSE_ANGLES`
3. `ZH_SPOUSE_DIALOGUES_MEDIATION`
4. `ZH_SPOUSE_CASE_SURFACE`
5. `ZH_SPOUSE_QA_EDITOR`

The main thread must merge and polish. Do not concatenate raw sub-agent output.

## Rules

- Public Simplified Chinese title is `真相裁决：零点审判`.
- Do not use public Chinese `所罗门` or `所羅門` branding.
- Do not translate IDs, keys, tags, sourceRefs, channel names, lie states, truth levels, or route metadata.
- Do not translate `behaviorHint`; leave it absent or blank.
- Do not fill `keywordsLocale` in this pilot.
- `evidence.name` remains Korean/runtime canonical. Localize `surfaceName` and `surfaceDescription` only where sidecar structure supports it.
- Preserve hidden-truth staging. Truth lexemes are allowed only where the Korean source is already post-confession/S5 equivalent.

## Validation

Run:

```powershell
npm run localization:scripts:validate -- --locale=zh-CN
npm run check:policy -- --locale=zh-CN
```

If full `spouse-01` coverage is claimed, also run:

```powershell
npm run localization:scripts:validate -- --case=spouse-01 --locale=zh-CN --strict
```

## Output

Write a summary under:

- `docs/localization/threads/outputs/script-thread-23-zh-cn-spouse-01-pilot/SUMMARY.md`

Include:

- Files created/edited
- Coverage by surface
- Any skipped fields and why
- Validator results
- Glossary or disclosure-policy issues requiring `PROJECT_CONTROL_TOWER`

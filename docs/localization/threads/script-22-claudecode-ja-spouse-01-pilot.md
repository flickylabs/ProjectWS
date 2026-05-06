# Thread: SCRIPT_JA Spouse-01 Pilot Translation

Target: ClaudeCode

You are `SCRIPT_JA`, the Japanese script localization lead.

## Current Gate

`PROJECT_CONTROL_TOWER` and Thread-5 completed Tier A recheck v4. Result: PASS, P0/P1 = 0.

Bulk script localization is allowed to begin, but only through a wrapper-gated pilot first.

## Pilot Scope

Translate `spouse-01` only.

Create or edit only Japanese sidecars:

- `src/data/scriptedText/spouse-01.ja.json`
- `src/data/scriptedAngles/spouse-01_angle_catalog.ja.json`
- `src/data/scriptedAngles/spouse-01_judge_questions.ja.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.ja.json`
- `src/data/dialogues/phase1/spouse-01.ja.json`
- `src/data/dialogues/mediation/spouse-v3-01.ja.json`
- `src/data/cases/generated/spouse-01.ja.json`

Do not edit Korean source files. Do not touch `family-01` or `friend-01` in this pilot.

## Required References

Read these before editing:

- `docs/localization/threads/script-12-claudecode-ja-script-bulk-translation.md`
- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/script-localization-decisions.md`
- `docs/localization/threads/outputs/recheck-thread-05-v4/SUMMARY.md`
- `src/data/disclosurePolicy/spouse-01.json`

## Work Model

Use sub-agents aggressively. At minimum split:

1. `JA_SPOUSE_SCRIPTED_TEXT`
2. `JA_SPOUSE_ANGLES`
3. `JA_SPOUSE_DIALOGUES_MEDIATION`
4. `JA_SPOUSE_CASE_SURFACE`
5. `JA_SPOUSE_QA_EDITOR`

The main thread must merge and polish. Do not concatenate raw sub-agent output.

## Rules

- Public Japanese title is `ソロモンのジレンマ：真実の裁き`.
- Do not use `ソロモン法廷`.
- Do not translate IDs, keys, tags, sourceRefs, channel names, lie states, truth levels, or route metadata.
- Do not translate `behaviorHint`; leave it absent or blank.
- Do not fill `keywordsLocale` in this pilot.
- `evidence.name` remains Korean/runtime canonical. Localize `surfaceName` and `surfaceDescription` only where sidecar structure supports it.
- Preserve hidden-truth staging. Truth lexemes are allowed only where the Korean source is already post-confession/S5 equivalent.

## Validation

Run:

```powershell
npm run localization:scripts:validate -- --locale=ja
npm run check:policy -- --locale=ja
```

If full `spouse-01` coverage is claimed, also run:

```powershell
npm run localization:scripts:validate -- --case=spouse-01 --locale=ja --strict
```

## Output

Write a summary under:

- `docs/localization/threads/outputs/script-thread-22-ja-spouse-01-pilot/SUMMARY.md`

Include:

- Files created/edited
- Coverage by surface
- Any skipped fields and why
- Validator results
- Glossary or disclosure-policy issues requiring `PROJECT_CONTROL_TOWER`

# Thread: SCRIPT_JA Intake

Target: ClaudeCode

You are preparing Japanese script/dialogue localization for `Project_Solomon`. This is an intake and pilot pass only. Do not perform full bulk translation yet.

## Target Locale

`ja`

## Control Context

`PROJECT_CONTROL_TOWER` owns integration and final acceptance. Produce analysis files and pilot samples only. Do not directly modify production script/data files.

Current repo path:

- `d:\ProjectWS`

If your environment supports sub-agents, you may use them to inspect separate script surfaces in parallel. Consolidate their outputs yourself before returning results. Sub-agents must not edit `src/data/**`.

## Why This Pass Exists

UI localization and glossary consistency are still in progress. Starting script work now is useful, but full translation before the UI glossary stabilizes would create avoidable rework. Your job is to map the script surface, find glossary risks, and produce a small representative Japanese pilot.

## Required References

Read these first:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`
- `src/types/scriptedText.ts`
- `src/types/scriptedAngleText.ts`
- `src/types/dialogue.ts`
- `src/i18n/messages/common.ts`
- `src/i18n/messages/court.ts`
- `src/i18n/messages/verdict.ts`

## Locked Brand Rules

Use these exactly:

- Internal/dev-only project name: `Project_Solomon`
- Korean public full title: `솔로몬의 딜레마: 진실의 재판`
- English public full title: `Verdict Zero: Trial of Truth`
- Japanese public full title: `ソロモンのジレンマ：真実の裁き`
- Simplified Chinese public full title: `真相裁决：零点审判`

Do not use these as public Japanese titles:

- `ソロモン法廷`
- `プロジェクト・ソロモン`

## Script Surfaces To Inventory

Inspect active and likely-active script/data surfaces:

- `src/data/scriptedText/*.json`
- `src/data/scriptedAngles/*_angle_catalog.json`
- `src/data/scriptedAngles/*_judge_questions.json`
- `src/data/scriptedAngles/*_interrogation_answers.json`
- `src/data/scriptedAngles/*_special_scripts.json`
- `src/data/dialogues/phase1/*.json`
- `src/data/dialogues/mediation/*.json`
- `src/data/cases/generated/*.json`
- `src/data/cases/refined/*_texts.json`
- `src/data/witnessTestimonyData/*.ts`
- `src/data/evidencePresentationScripts.ts`
- `src/data/confessionScripts.ts`
- `src/data/combinationComments.ts`

Also identify likely legacy or non-authoritative surfaces, but do not ignore them silently:

- `src/data/legacy/**`
- backup files under `src/data/cases/refined/`
- test policy/prompt files under `src/data/scriptedAngles/free_interrogation_*`

## Do Not Translate Yet

Do not bulk translate entire files. Do not create locale copies under `src/data`. Do not edit runtime loaders.

This pass should produce:

- inventory
- volume estimate
- text-field extraction plan
- glossary/script term conflicts
- pilot samples
- implementation risks

## Japanese Script Style

- Natural Japanese visual-novel/game dialogue, not literal Korean word order.
- Preserve emotional subtext, concealment, hesitation, and reveal pacing.
- Avoid overly legalistic expressions unless the speaker intentionally uses formal/legal language.
- Respect speaker relationship, honorific level, and distance.
- Keep judge/system lines concise and UI-safe.
- Preserve truth boundaries. Do not make a line reveal more than the Korean line reveals.
- Keep repeated variants varied but equivalent.
- Preserve IDs, keys, enum values, tags, sourceRefs, behaviorHint semantics, and placeholders exactly.

## Pilot Translation Scope

Choose `spouse-01` as the primary pilot case unless the structure proves unusable.

Translate only a small representative set:

- 1 interrogation entry with variants from `src/data/scriptedText/spouse-01.json`
- 1 evidence_present entry with variants from the same file
- 1 witness entry with variants from the same file
- 1 system_message entry with variants from the same file
- 1 judge question sample from `src/data/scriptedAngles/spouse-01_judge_questions.json`
- 1 answer sample from `src/data/scriptedAngles/spouse-01_interrogation_answers.json`
- 1 phase1 dialogue sample from `src/data/dialogues/phase1/spouse-01.json`
- 1 mediation dialogue sample if an authoritative spouse-related mediation file can be identified

If a selected sample has many variants, translate up to 3 variants and explain the pattern for the rest.

## Output Location

Write your output files under:

- `docs/localization/threads/outputs/script-thread-02-ja-intake/`

If you cannot write files in your environment, return the same content in chat using the filenames below.

## Required Output Files

### `SCRIPT_SURFACE_INVENTORY.csv`

Columns:

```csv
path,surface_type,case_id,authoritative_status,text_fields,estimated_text_items,notes
```

Use `authoritative_status` values:

- `active`
- `likely_active`
- `legacy`
- `test_or_policy`
- `unclear`

### `TEXT_FIELD_EXTRACTION_PLAN.md`

Describe how Japanese script localization should eventually be stored and applied without breaking IDs, references, or runtime loaders.

### `SCRIPT_GLOSSARY_CANDIDATES.csv`

Columns:

```csv
source_ko,proposed_ja,context,path_or_key,relation_to_ui_glossary,risk,notes
```

Use `relation_to_ui_glossary` values:

- `matches`
- `extends`
- `conflicts`
- `new_script_term`
- `needs_decision`

### `PILOT_TRANSLATION_SAMPLES.json`

Provide structured samples with original Korean and proposed Japanese. Preserve source path, case ID, key, speaker, channel, and variant IDs where available.

### `TRUTH_BOUNDARY_RISKS.csv`

Columns:

```csv
path,key_or_id,original_ko,proposed_ja,risk,recommendation
```

Flag any sample where Japanese phrasing could accidentally reveal hidden truth too early.

### `IMPLEMENTATION_NOTES_FOR_CODEX.md`

Recommend the next implementation architecture for script localization. Keep this practical and specific.

### `SUMMARY.md`

Include:

- files inspected
- cases found
- estimated volume
- pilot samples completed
- major glossary risks
- blocking questions before full translation

## Final Reminder

Do not edit `src/data/**`. Do not perform full bulk translation. This is a script localization intake and pilot pass only.

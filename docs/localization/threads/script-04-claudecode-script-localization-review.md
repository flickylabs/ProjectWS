# Thread: SCRIPT_LOCALIZATION_REVIEW

Target: ClaudeCode

Run this after `SCRIPT_EN`, `SCRIPT_JA`, and `SCRIPT_ZH_CN` intake outputs are available. This thread reviews script-localization architecture, glossary conflicts, and pilot translation quality. It is separate from UI `GLOSSARY_CONSISTENCY_REVIEW`.

## Control Context

`PROJECT_CONTROL_TOWER` owns integration and final acceptance. Produce a review package only. Do not directly modify production script/data files.

Current repo path:

- `d:\ProjectWS`

## Inputs

Use these script intake outputs:

- `docs/localization/threads/outputs/script-thread-01-en-intake/`
- `docs/localization/threads/outputs/script-thread-02-ja-intake/`
- `docs/localization/threads/outputs/script-thread-03-zh-cn-intake/`

Use these references:

- `docs/localization/glossary.csv`
- `docs/localization/style-guide.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`
- `src/types/scriptedText.ts`
- `src/types/scriptedAngleText.ts`
- `src/types/dialogue.ts`

If UI Thread-05 restart outputs are already available, also read:

- `docs/localization/threads/outputs/restart-thread-05-consistency/`

If they are not available, proceed with script-only review and clearly mark UI-glossary-dependent findings as provisional.

## Locked Brand Rules

These are already decided:

- Internal/dev-only project name: `Project_Solomon`
- Korean public full title: `솔로몬의 딜레마: 진실의 재판`
- English public full title: `Verdict Zero: Trial of Truth`
- Japanese public full title: `ソロモンのジレンマ：真実の裁き`
- Simplified Chinese public full title: `真相裁决：零点审判`

Reject these public title candidates:

- EN: `Project Solomon`, `Solomon's Dilemma`, `Solomon Court`
- JA: `ソロモン法廷`
- zh-CN: `所罗门的法庭`, `所罗门的两难`

## Review Scope

Review:

- script surface inventory completeness
- active vs legacy classification
- proposed extraction/storage architecture
- glossary conflict candidates
- pilot sample quality
- truth-boundary risks
- risks before full bulk translation

Do not ask any thread to bulk translate yet. This review should decide whether the next step is safe.

## Key Questions To Answer

1. Which script/data surfaces are authoritative for localization?
2. Which surfaces should be excluded as legacy/test/policy?
3. What storage model should Codex implement before full translation?
4. Which glossary terms must be resolved before bulk translation?
5. Are the pilot translations preserving reveal timing and speaker tone?
6. Is per-language bulk translation safe after UI glossary consistency, or is another pilot round needed?

## Output Location

Write your output files under:

- `docs/localization/threads/outputs/script-thread-04-review/`

If you cannot write files in your environment, return the same content in chat using the filenames below.

## Required Output Files

### `SCRIPT_REVIEW_FINDINGS.csv`

Columns:

```csv
priority,locale,path_or_surface,issue,recommendation
```

Priority values:

- `P0`: blocks script localization architecture or full translation
- `P1`: should fix before bulk translation
- `P2`: native review/polish

### `AUTHORITATIVE_SURFACE_DECISION_TABLE.csv`

Columns:

```csv
path_pattern,surface_type,decision,reason,next_action
```

Use `decision` values:

- `localize`
- `exclude_legacy`
- `exclude_test_policy`
- `needs_codex_investigation`
- `needs_user_decision`

### `SCRIPT_GLOSSARY_CONFLICTS.csv`

Columns:

```csv
source_ko,en,ja,zh_cn,issue,recommendation,blocks_bulk_translation
```

### `PILOT_SAMPLE_REVIEW.csv`

Columns:

```csv
locale,path,key_or_id,quality,truth_boundary_risk,tone_risk,recommendation
```

Use `quality` values:

- `accepted`
- `accepted_with_notes`
- `revise_before_bulk`
- `reject`

### `IMPLEMENTATION_PLAN_FOR_CODEX.md`

Provide a concrete staged plan for PROJECT_CONTROL_TOWER:

1. script localization architecture
2. extraction/validation tools
3. glossary updates
4. full translation batching
5. QA/build checks

### `SUMMARY.md`

Include:

- script intake outputs checked
- P0/P1 blockers
- recommended authoritative surfaces
- whether full script translation can start after UI glossary consistency
- decisions needed from PROJECT_CONTROL_TOWER or user

## Final Reminder

Do not edit `src/data/**`. Do not perform full bulk translation. This is a review and go/no-go pass for script localization.

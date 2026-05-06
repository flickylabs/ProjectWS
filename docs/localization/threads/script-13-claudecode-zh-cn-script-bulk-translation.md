# Thread: SCRIPT_ZH_CN Bulk Translation

Target: ClaudeCode

You are responsible for Simplified Chinese script/dialogue localization for `Project_Solomon`.

This is no longer an intake-only pass. Produce Simplified Chinese locale sidecar candidates for the active script surfaces, but do not modify Korean source files.

## Target Locale

`zh-CN`

## Control Context

`PROJECT_CONTROL_TOWER` owns integration and final acceptance.

Current repo path:

- `d:\ProjectWS`

The script volume is too large for one linear pass. Use sub-agents aggressively. The main thread must act as the Simplified Chinese localization lead: split work, assign sub-agents, review their output, normalize terminology, then produce one consolidated result.

## Mandatory Sub-Agent Plan

Spawn or simulate at least these independent workstreams:

1. `ZH_CASE_SPOUSE_01`
   - Owns all `spouse-01` Simplified Chinese sidecars.
   - May split internally by `scriptedText`, `scriptedAngles`, and `dialogues/caseSurface`.

2. `ZH_CASE_FAMILY_01`
   - Owns all `family-01` Simplified Chinese sidecars.
   - May split internally by `scriptedText`, `scriptedAngles`, and `dialogues/caseSurface`.

3. `ZH_CASE_FRIEND_01`
   - Owns all `friend-01` Simplified Chinese sidecars.
   - May split internally by `scriptedText`, `scriptedAngles`, and `dialogues/caseSurface`.

4. `ZH_QA_EDITOR`
   - Does not bulk translate.
   - Reviews terminology, voice consistency, hidden-truth boundaries, placeholders, and line length risk across all Simplified Chinese sidecars.

The main thread must merge and polish. Do not simply concatenate sub-agent outputs.

## Mandatory Generation Pattern

Use Node generation scripts for high-volume sidecars. Do not inline-translate thousands of variants by hand in chat. Build dictionaries/templates in code, emit partial JSON, then review and polish the emitted sidecars.

For every high-volume answer bucket, enforce variation before returning:

- At least 3 distinct opener anchors per `(caseId, surface, party, disputeId, lieState, questionType)` bucket.
- At least 3 distinct closer anchors per bucket when the bucket has 6+ variants.
- No bucket may repeat the same first 30 Simplified Chinese characters for more than 70% of variants unless the source also repeats that tightly and you document why.
- Run a small self-audit script and include the results in your summary.

Thread-24 found the pilot infrastructure valid, but family/friend expansion must keep answer variants visibly distinct.

## Required References

Read these first:

- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/script-localization-decisions.md`
- `docs/localization/script-localization-architecture.md`
- `docs/localization/threads/outputs/script-thread-04-review/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-04-review/IMPLEMENTATION_PLAN_FOR_CODEX.md`
- `docs/localization/threads/outputs/restart-thread-05-recheck-v1/SUMMARY.md`
- `src/i18n/messages/**`
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json`

## Locked Brand Rules

Use these exactly:

- Internal/dev-only project name: `Project_Solomon`
- Simplified Chinese public full title: `真相裁决：零点审判`

Do not use these as public Simplified Chinese titles:

- `所罗门的法庭`
- `所罗门的两难`
- any public title containing `所罗门`

## Locked Script Decisions

- Storage uses sibling locale sidecars.
- Korean source files are canonical. Do not edit KO source text.
- Simplified Chinese sidecars may be created beside KO files, for example:
  - `src/data/scriptedText/spouse-01.zh-CN.json`
  - `src/data/scriptedAngles/spouse-01_judge_questions.zh-CN.json`
  - `src/data/dialogues/phase1/spouse-01.zh-CN.json`
- Sidecars are overlays, not complete replacement game data.
- Translate player-facing `text`, dialogue choice `text`, angle `label` and `description`, generated case public surface fields.
- Do not translate IDs, keys, channel names, tags, sourceRefs, lie states, truth levels, route metadata, or runtime control values.
- Do not translate `behaviorHint` in this pass. Leave it absent or blank.
- Do not fill `keywordsLocale` unless you explicitly document why. KO `keywords[]` remains the runtime matcher.
- `evidence.name` is not localized for v1. `surfaceName` and `surfaceDescription` may be localized.

## Scaffold Command

Start by generating a scaffold for this locale:

```powershell
npm run localization:scripts:extract -- --locale=zh-CN --out tmp/script-localization/zh-cn-scaffold
```

Use the scaffold as the structural source of truth. If you create final sidecars in `src/data/**`, only create or edit `*.zh-CN.json` files.

## Active Scope

Active cases:

- `spouse-01`
- `family-01`
- `friend-01`

Active surfaces:

- `src/data/scriptedText/{caseId}.json`
- `src/data/scriptedAngles/{caseId}_angle_catalog.json`
- `src/data/scriptedAngles/{caseId}_judge_questions.json`
- `src/data/scriptedAngles/{caseId}_interrogation_answers.json`
- `src/data/scriptedAngles/{caseId}_special_scripts.json` if structurally supported
- `src/data/dialogues/phase1/{caseId}.json`
- `src/data/dialogues/mediation/{spouse|family|friend}-v3-01.json`
- `src/data/cases/generated/{caseId}.json`

Do not translate legacy, backup, free-interrogation test, or policy fixture files unless the active loader/manifest clearly requires them.

## Simplified Chinese Style

- Use natural Mainland Simplified Chinese.
- Keep the tone playable, investigative, and emotionally readable.
- Avoid stiff legalistic phrasing unless the speaker is intentionally formal.
- Preserve relationship nuance, hesitation, defensiveness, and reveal pacing.
- Preserve the truth boundary. Do not reveal more than the Korean line reveals.
- Use glossary terms consistently.
- Preserve the distinction:
  - `裁决` for the act/process/brand-adjacent verdict sense.
  - `判决书` for the written verdict document.
- Use `认命` for the resigned emotional state unless context clearly demands otherwise.

## Validation

At minimum, run:

```powershell
npm run localization:scripts:validate -- --locale=zh-CN
npm run check:policy -- --locale=zh-CN
```

If you believe the Simplified Chinese sidecars are full enough for a strict gate, also run:

```powershell
npm run localization:scripts:validate -- --locale=zh-CN --strict
```

Run `npm run build:pc` if feasible after sidecars are created.

## Required Output Files

Write reports under:

`docs/localization/threads/outputs/script-thread-13-zh-cn-bulk/`

Required files:

- `SUMMARY.md`
- `TRANSLATION_MANIFEST.csv`
- `COVERAGE_REPORT.csv`
- `GLOSSARY_DELTAS.csv`
- `DISCLOSURE_RISK_REPORT.csv`
- `LINE_LENGTH_RISKS.csv`
- `VALIDATION_RESULTS.md`

## Final Response

Return:

- Which sub-agents/workstreams were used.
- Which sidecar files were created or modified.
- Coverage by case and surface.
- Validation command results.
- Remaining blanks or skipped fields.
- Any glossary decisions needed from PROJECT_CONTROL_TOWER.

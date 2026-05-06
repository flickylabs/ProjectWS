# Thread: SCRIPT_EN Bulk Translation

Target: ClaudeCode

You are responsible for English script/dialogue localization for `Project_Solomon`.

This is no longer an intake-only pass. Produce English locale sidecar candidates for the active script surfaces, but do not modify Korean source files.

## Target Locale

`en`

## Control Context

`PROJECT_CONTROL_TOWER` owns integration and final acceptance.

Current repo path:

- `d:\ProjectWS`

The script volume is too large for one linear pass. Use sub-agents aggressively. The main thread must act as the English localization lead: split work, assign sub-agents, review their output, normalize terminology, then produce one consolidated result.

## Mandatory Sub-Agent Plan

Spawn or simulate at least these independent workstreams:

1. `EN_CASE_SPOUSE_01`
   - Owns all `spouse-01` English sidecars.
   - May split internally by `scriptedText`, `scriptedAngles`, and `dialogues/caseSurface`.

2. `EN_CASE_FAMILY_01`
   - Owns all `family-01` English sidecars.
   - May split internally by `scriptedText`, `scriptedAngles`, and `dialogues/caseSurface`.

3. `EN_CASE_FRIEND_01`
   - Owns all `friend-01` English sidecars.
   - May split internally by `scriptedText`, `scriptedAngles`, and `dialogues/caseSurface`.

4. `EN_QA_EDITOR`
   - Does not bulk translate.
   - Reviews terminology, voice consistency, hidden-truth boundaries, placeholders, and line length risk across all English sidecars.

The main thread must merge and polish. Do not simply concatenate sub-agent outputs.

## Mandatory Generation Pattern

Use Node generation scripts for high-volume sidecars. Do not inline-translate thousands of variants by hand in chat. Build dictionaries/templates in code, emit partial JSON, then review and polish the emitted sidecars.

For every high-volume answer bucket, enforce variation before returning:

- At least 3 distinct opener anchors per `(caseId, surface, party, disputeId, lieState, questionType)` bucket.
- At least 3 distinct closer anchors per bucket when the bucket has 6+ variants.
- No bucket may repeat the same first 60 characters for more than 50% of variants unless the source also repeats that tightly and you document why.
- Run a small self-audit script and include the results in your summary.

Thread-24 found the spouse-01 EN pilot structurally valid but too repetitive. Family/friend expansion is not accepted without this variation gate.

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
- English public full title: `Verdict Zero: Trial of Truth`

Do not use these as public English titles:

- `Project Solomon`
- `Solomon's Dilemma`
- `Solomon Court`
- any public English title containing `Solomon`

## Locked Script Decisions

- Storage uses sibling locale sidecars.
- Korean source files are canonical. Do not edit KO source text.
- English sidecars may be created beside KO files, for example:
  - `src/data/scriptedText/spouse-01.en.json`
  - `src/data/scriptedAngles/spouse-01_judge_questions.en.json`
  - `src/data/dialogues/phase1/spouse-01.en.json`
- Sidecars are overlays, not complete replacement game data.
- Translate player-facing `text`, dialogue choice `text`, angle `label` and `description`, generated case public surface fields.
- Do not translate IDs, keys, channel names, tags, sourceRefs, lie states, truth levels, route metadata, or runtime control values.
- Do not translate `behaviorHint` in this pass. Leave it absent or blank.
- Do not fill `keywordsLocale` unless you explicitly document why. KO `keywords[]` remains the runtime matcher.
- `evidence.name` is not localized for v1. `surfaceName` and `surfaceDescription` may be localized.

## Scaffold Command

Start by generating a scaffold for this locale:

```powershell
npm run localization:scripts:extract -- --locale=en --out tmp/script-localization/en-scaffold
```

Use the scaffold as the structural source of truth. If you create final sidecars in `src/data/**`, only create or edit `*.en.json` files.

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

## English Style

- Natural investigation-game English, not literal Korean.
- Keep courtroom tone readable and playable.
- Avoid heavy legalese unless the speaker is intentionally formal.
- Preserve hesitation, concealment, defensiveness, and reveal pacing.
- Preserve the truth boundary. Do not make a line reveal more than the Korean line reveals.
- Repeated variants should sound varied but equivalent.
- Keep system text concise.
- Prefer shorter lines when possible because English can overflow compact UI.

## Validation

At minimum, run:

```powershell
npm run localization:scripts:validate -- --locale=en
npm run check:policy -- --locale=en
```

If you believe the English sidecars are full enough for a strict gate, also run:

```powershell
npm run localization:scripts:validate -- --locale=en --strict
```

Run `npm run build:pc` if feasible after sidecars are created.

## Required Output Files

Write reports under:

`docs/localization/threads/outputs/script-thread-11-en-bulk/`

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

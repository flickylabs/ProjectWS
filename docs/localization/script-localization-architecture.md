# Script Localization Architecture Draft

This draft records the current PROJECT_CONTROL_TOWER direction for script/dialogue localization. It is based on the script intake outputs from `SCRIPT_EN`, `SCRIPT_JA`, and `SCRIPT_ZH_CN`.

## Scope

Script localization is separate from UI message localization.

Current active case scope:

- `spouse-01`
- `family-01`
- `friend-01`

Primary script surfaces:

- `src/data/scriptedText/{caseId}.json`
- `src/data/scriptedAngles/{caseId}_angle_catalog.json`
- `src/data/scriptedAngles/{caseId}_judge_questions.json`
- `src/data/scriptedAngles/{caseId}_interrogation_answers.json`
- `src/data/scriptedAngles/{caseId}_special_scripts.json`
- `src/data/dialogues/phase1/{caseId}.json`
- `src/data/dialogues/mediation/{spouse|family|friend}-v3-01.json`
- `src/data/cases/generated/{caseId}.json`
- `src/data/witnessTestimonyData/{caseId}.ts`
- `src/data/evidencePresentationScripts.ts`
- `src/data/confessionScripts.ts`
- `src/data/combinationComments.ts`

Legacy, test, and policy fixtures must be classified before translation. They should not be bulk-translated just because they live under `src/data`.

## Storage Decision

Use locale sidecar overlays.

The Korean source remains authoritative. Locale files contain only translated leaf text and stable lookup identifiers. Runtime loaders merge the locale overlay onto the Korean source and fall back to Korean for missing entries.

Recommended top-level layout:

```text
src/data/locales/
  en/
    scriptedText/spouse-01.json
    scriptedAngles/spouse-01_judge_questions.json
    dialogues/phase1/spouse-01.json
  ja/
    ...
  zh-CN/
    ...
```

Do not create full translated copies that duplicate runtime metadata. Sidecars should not redefine truth gates, IDs, source refs, tags, lie states, or coverage metadata.

## Translatable Fields

Translate only player-visible or text-producing leaves:

- `variants[].text`
- dialogue `text`
- dialogue `options[].text`
- mediation `paths.*.judge`
- `behaviorHint` only if it is shown in debug/player-visible surfaces; otherwise leave it Korean for tooling stability
- case surface labels such as evidence `surfaceName`, `surfaceDescription`, dossier labels, judge hints, and public descriptions

Do not translate:

- `caseId`, `id`, `key`
- `disputeId`, `evidenceId`, `witnessId`, `angleId`, `dossierQuestionId`
- `lieState`, `lieBand`, `questionType`, `subjectRole`, `stanceHint`, `truthLevel`
- `tags[]`
- `sourceRefs[]`
- engine/internal fields that are only used for routing or policy checks

## Loader Plan

Add a shared locale overlay helper before touching individual loaders.

Responsibilities:

- accept current `LocaleCode`
- resolve locale sidecar path by source surface and case ID
- merge by stable key/id
- override text leaves only
- preserve Korean metadata
- fall back to Korean when a locale value is missing

Affected loaders:

- `src/engine/scriptedTextLoader.ts`
- `src/engine/scriptedAngleTextLoader.ts`
- `src/data/dialogues/phaseScriptLoader.ts`
- `src/data/dialogues/mediationScriptLoader.ts`
- `src/data/cases/caseLoader.ts`

The TS-backed text modules need a separate migration step. Either convert them to JSON with thin TS shims, or keep the TS shape and add locale string tables keyed by stable IDs. JSON sidecars are cleaner; TS string tables are faster to ship.

## Validation Plan

Add a script parity validator before full translation:

```text
scripts/validate-script-locales.mjs
```

Minimum checks:

- each locale sidecar references an existing Korean source item
- every translated variant `id` exists in the Korean bundle
- every translated entry `key` exists in the Korean bundle
- no locale sidecar changes IDs, tags, source refs, lie states, channel names, or truth levels
- placeholders match exactly
- sidecar files do not contain forbidden public brand literals
- missing translations are reported as warnings during pilot, then optionally promoted to errors per release gate

Disclosure policy must become locale-aware before bulk script translation is accepted. Add per-locale forbidden lexeme/paraphrase sets for EN, JA, and zh-CN, then run policy checks against merged locale text.

## Translation Flow

1. Finish UI glossary consistency.
2. Lock script-only glossary terms that recur across all three intake outputs.
3. Implement sidecar loader and validator with tiny sample sidecars.
4. Run build and policy checks on Korean fallback.
5. Translate one full case and one channel family first, not all cases at once.
6. Run locale parity validation, disclosure policy checks, and visual QA.
7. Scale to remaining active cases.

## Current Blockers

- Script-only glossary terms are not locked yet.
- Locale-aware disclosure policy is not implemented.
- TS-backed text modules do not have stable sidecar extraction yet.
- `SCRIPT_LOCALIZATION_REVIEW` still needs to consume the three intake outputs and produce a final go/no-go package.

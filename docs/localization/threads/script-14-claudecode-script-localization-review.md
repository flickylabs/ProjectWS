# Thread: SCRIPT_LOCALIZATION_REVIEW Bulk Output Review

Target: ClaudeCode

You are the cross-locale script localization reviewer. You do not own bulk translation. Your job is to verify, compare, and package the outputs from `SCRIPT_EN`, `SCRIPT_JA`, and `SCRIPT_ZH_CN` for `PROJECT_CONTROL_TOWER`.

## Control Context

`PROJECT_CONTROL_TOWER` owns integration and final acceptance.

Current repo path:

- `d:\ProjectWS`

Start with preparation immediately, but final review requires the three language bulk threads to finish or provide partial output.

## Inputs To Consume

Language thread prompt files:

- `docs/localization/threads/script-11-claudecode-en-script-bulk-translation.md`
- `docs/localization/threads/script-12-claudecode-ja-script-bulk-translation.md`
- `docs/localization/threads/script-13-claudecode-zh-cn-script-bulk-translation.md`

Expected language output directories:

- `docs/localization/threads/outputs/script-thread-11-en-bulk/`
- `docs/localization/threads/outputs/script-thread-12-ja-bulk/`
- `docs/localization/threads/outputs/script-thread-13-zh-cn-bulk/`

Expected sidecar locations:

- `src/data/scriptedText/*.{en,ja,zh-CN}.json`
- `src/data/scriptedAngles/*.{en,ja,zh-CN}.json`
- `src/data/dialogues/phase1/*.{en,ja,zh-CN}.json`
- `src/data/dialogues/mediation/*.{en,ja,zh-CN}.json`
- `src/data/cases/generated/*.{en,ja,zh-CN}.json`

Required references:

- `docs/localization/glossary.csv`
- `docs/localization/script-glossary.csv`
- `docs/localization/style-guide.md`
- `docs/localization/script-localization-decisions.md`
- `docs/localization/threads/outputs/script-thread-04-review/*`
- `docs/localization/threads/outputs/restart-thread-05-recheck-v1/*`
- `src/data/disclosurePolicy/{spouse-01,family-01,friend-01}.json`

## Mandatory Sub-Agent Plan

Use sub-agents aggressively. The review volume is too large for one linear pass.

Spawn or simulate at least these workstreams:

1. `REVIEW_CASE_SPOUSE_01`
   - Cross-checks EN, JA, zh-CN sidecars for `spouse-01`.
   - Compares truth boundaries and placeholder parity.

2. `REVIEW_CASE_FAMILY_01`
   - Cross-checks EN, JA, zh-CN sidecars for `family-01`.
   - Compares truth boundaries and placeholder parity.

3. `REVIEW_CASE_FRIEND_01`
   - Cross-checks EN, JA, zh-CN sidecars for `friend-01`.
   - Compares truth boundaries and placeholder parity.

4. `REVIEW_GLOSSARY_POLICY`
   - Checks glossary consistency, forbidden brand literals, disclosure-policy leaks, and locale-specific terminology decisions.

5. `REVIEW_TECH_VALIDATION`
   - Runs validators and build checks.
   - Confirms sidecars do not mutate metadata or runtime control fields.

The main review thread must consolidate and prioritize. Do not return raw sub-agent notes without synthesis.

## Review Rules

Treat these as release blockers:

- Korean source files were modified by language threads without explicit approval.
- Any sidecar changes IDs, keys, tags, channel names, lie states, truth levels, source refs, or routing metadata.
- Any line reveals hidden truth earlier or more clearly than the Korean source.
- Any forbidden public brand literal appears.
- Placeholders are missing, renamed, or added incorrectly.
- `behaviorHint` was bulk translated without a documented exception.
- `keywordsLocale` was filled in a way that can conflict with KO runtime matching.
- `npm run localization:scripts:validate` fails.
- `npm run check:policy -- --locale=<locale>` fails.

Non-blocking but report clearly:

- Long English lines likely to overflow.
- Japanese lines that are too formal, too literal, or too long.
- Simplified Chinese lines that confuse `裁决` and `判决书`.
- Repeated variants that are too identical.
- Style drift between cases.
- Partial coverage or blank sidecar fields.

## Validation Commands

Run these when sidecars exist:

```powershell
npm run localization:scripts:validate
npm run check:policy -- --locale=en
npm run check:policy -- --locale=ja
npm run check:policy -- --locale=zh-CN
npm run build:pc
```

If language threads claim full coverage, also run:

```powershell
npm run localization:scripts:validate -- --strict
```

## Required Output Files

Write reports under:

`docs/localization/threads/outputs/script-thread-14-review/`

Required files:

- `SUMMARY.md`
- `GO_NO_GO.md`
- `COVERAGE_MATRIX.csv`
- `SIDECAR_DIFF_AUDIT.csv`
- `GLOSSARY_CONFLICTS.csv`
- `DISCLOSURE_FINDINGS.csv`
- `LINE_LENGTH_RISKS.csv`
- `VALIDATION_RESULTS.md`
- `IMPLEMENTATION_NOTES_FOR_CODEX.md`

## Final Response

Return:

- GO or NO-GO.
- P0/P1/P2 finding counts.
- Validation command results.
- Sidecar coverage by locale and case.
- Required fixes for each language thread.
- Decisions needed from PROJECT_CONTROL_TOWER.
- Whether Codex can proceed to integration cleanup.

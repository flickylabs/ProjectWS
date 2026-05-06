# Thread-24 Recheck Request: spouse-01 Pilot After EN Polish

Role: `SCRIPT_LOCALIZATION_REVIEW`
Target thread: `Thread-24`
Model target: ClaudeCode

## Context

The previous spouse-01 pilot review was `CONDITIONAL GO`.

The mandatory blocker was low English variant variety in high-volume surfaces:

- `src/data/scriptedText/spouse-01.en.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json`

`SCRIPT_EN` has now completed the polish pass for those two files.

## Inputs to Read

Read the prior review outputs:

- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_REVIEW_FINDINGS.csv`
- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_DISCLOSURE_BOUNDARY_CHECK.csv`
- `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_GLOSSARY_DELTAS.csv`

Read the EN polish outputs:

- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/SUMMARY.md`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/VARIATION_AUDIT.csv`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/VARIATION_AUDIT_SUMMARY.json`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/TRUTH_BOUNDARY_AUDIT.csv`
- `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/TRUTH_BOUNDARY_SUMMARY.json`

Inspect the changed EN sidecars:

- `src/data/scriptedText/spouse-01.en.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json`

## Recheck Scope

This is a limited recheck. Do not redo the full script-localization review unless a blocker appears.

Verify:

1. The Thread-24 mandatory EN variation blocker is resolved.
2. The high-volume bucket gate passes:
   - 936 / 936 eligible buckets pass.
   - no opener-anchor failures.
   - no prefix-60 repetition failures.
   - at least 3 distinct opener anchors for buckets with 6 or more variants.
3. Non-S5 truth-boundary remains clean:
   - forbidden lexeme violations in non-S5 = 0.
   - public brand literal violations = 0.
4. S5 truth disclosure remains narratively strong enough.
   - Use the Thread-25 summary and spot-check representative S5 buckets.
   - Do not require 100% substring detector strength if the full variant text still reads as a valid confession.
5. No KO, JA, zh-CN, metadata, ids, tags, sourceRefs, route data, `behaviorHint`, or `keywordsLocale` were modified by the EN polish.
6. The previous Codex scaffold fixes remain valid:
   - phase1 `choices` / `options` handling.
   - generated case `caseId` normalization.
   - no unsupported `surfaceClaim` sidecar fields.

## Commands to Run

Run these from repository root:

```powershell
npm run localization:scripts:validate -- --case=spouse-01 --locale=en --strict
npm run localization:scripts:validate -- --locale=en
npm run check:policy -- --locale=en
npm run check:all
```

Expected current Codex verification:

- `npm run localization:scripts:validate -- --case=spouse-01 --locale=en --strict`: PASS, 7 sidecars.
- `npm run localization:scripts:validate -- --locale=en`: PASS, with expected family/friend missing-sidecar warnings.
- `npm run check:policy -- --locale=en`: PASS.
- `npm run check:all`: PASS, with expected family/friend missing-sidecar warnings.
- `npm run build:pc`: PASS with existing Vite warnings only.

## Required Output Directory

Write review outputs to:

`docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/`

Create:

- `SUMMARY.md`
- `GO_NO_GO_DECISION.md`
- `RECHECK_FINDINGS.csv`
- `EN_VARIATION_GATE_RECHECK.csv`
- `TRUTH_BOUNDARY_RECHECK.csv`

## Decision Required

Answer explicitly:

1. Can spouse-01 move from `CONDITIONAL GO` to unqualified `GO` for pilot localization quality?
2. Is `family-01` / `friend-01` script localization expansion now unblocked?
3. Must the English sentence-pool pattern from Thread-25 be mandated for `family-01` / `friend-01` EN work?
4. Are there any remaining P0/P1 blockers before bulk expansion?

If no P0/P1 blockers remain, mark:

`GO: family-01 / friend-01 expansion may proceed, with the Thread-25 sentence-pool variation gate mandatory for EN high-volume surfaces.`

## Constraints

- Review only. Do not modify `src/data/**`.
- Do not revert any existing changes.
- Do not overwrite Thread-24 or Thread-25 prior outputs.
- Treat family/friend missing sidecars as expected until their translation pass lands.

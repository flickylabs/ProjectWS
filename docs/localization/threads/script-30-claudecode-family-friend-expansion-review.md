# Thread: SCRIPT_LOCALIZATION_REVIEW Family/Friend Expansion Review

Target: ClaudeCode
Role: `SCRIPT_LOCALIZATION_REVIEW`

Use this after `SCRIPT_EN`, `SCRIPT_JA`, and `SCRIPT_ZH_CN` finish family/friend expansion.

## Inputs

Read the expansion outputs:

- `docs/localization/threads/outputs/script-thread-27-en-family-friend-expansion/`
- `docs/localization/threads/outputs/script-thread-28-ja-family-friend-expansion/`
- `docs/localization/threads/outputs/script-thread-29-zh-cn-family-friend-expansion/`

Inspect sidecars for:

- `family-01`
- `friend-01`

Locales:

- `en`
- `ja`
- `zh-CN`

## Review Scope

Verify:

1. Coverage by case, locale, and surface.
2. High-volume variation gates passed.
3. Non-S5 truth-boundary remains clean.
4. S5 disclosure has narrative parity with Korean.
5. Public brand literals are valid.
6. Glossary conformance for case-specific and UI-facing terms.
7. `behaviorHint`, IDs, tags, sourceRefs, route metadata, lie states, truth levels, and matcher keywords were not incorrectly localized.
8. `surfaceClaim` is not generated without a Korean source field.
9. Phase1 choice/options structures are preserved.
10. Generated case `caseId` remains normalized to short IDs.

## Commands

Run:

```powershell
npm run localization:scripts:validate -- --case=family-01 --strict
npm run localization:scripts:validate -- --case=friend-01 --strict
npm run localization:scripts:validate
npm run check:policy -- --locale=en
npm run check:policy -- --locale=ja
npm run check:policy -- --locale=zh-CN
npm run check:all
npm run build:pc
```

## Output Directory

Write reports to:

`docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/`

Required:

- `SUMMARY.md`
- `GO_NO_GO_DECISION.md`
- `COVERAGE_MATRIX.csv`
- `DISCLOSURE_BOUNDARY_CHECK.csv`
- `VARIATION_GATE_REVIEW.csv`
- `GLOSSARY_DELTAS.csv`
- `REVIEW_FINDINGS.csv`

## Decision Required

Answer explicitly:

1. Are `family-01` and `friend-01` script localizations GO for integration?
2. Are any locale-specific P0/P1 blockers left?
3. Which issues can be deferred to native review?
4. Is `check:rc --strict` readiness blocked by anything besides future content polish?

Do not modify source files during review.

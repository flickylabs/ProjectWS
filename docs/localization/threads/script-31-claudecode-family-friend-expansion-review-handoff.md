# Thread-24 Handoff: family/friend Script Localization Expansion

Target: ClaudeCode
Role: `SCRIPT_LOCALIZATION_REVIEW`

Use this together with:

- `docs/localization/threads/script-30-claudecode-family-friend-expansion-review.md`

## Context

`SCRIPT_EN`, `SCRIPT_JA`, and `SCRIPT_ZH_CN` completed `family-01` / `friend-01` expansion.

`PROJECT_CONTROL_TOWER` received the three summaries first and ran local precheck before asking for Thread-24 final review.

## Translation Output Directories

Review these directories:

- `docs/localization/threads/outputs/script-thread-27-en-family-friend-expansion/`
- `docs/localization/threads/outputs/script-thread-28-ja-family-friend-expansion/`
- `docs/localization/threads/outputs/script-thread-29-zh-cn-family-friend-expansion/`

## Created Sidecar Scope

Expected sidecars:

- `family-01`: 7 surfaces × 3 locales = 21 sidecars
- `friend-01`: 7 surfaces × 3 locales = 21 sidecars

Together with existing `spouse-01` pilot sidecars, validator now sees:

- `63` sidecars
- `444,009` localized script strings

## PROJECT_CONTROL_TOWER Local Precheck

Commands run from `d:\ProjectWS`.

```powershell
npm run localization:scripts:validate -- --case=family-01 --strict
```

Result:

```text
script locale validation ok: policies=1, sidecars=21, strings=166825, locales=en,ja,zh-CN, strict=yes
```

```powershell
npm run localization:scripts:validate -- --case=friend-01 --strict
```

Result:

```text
script locale validation ok: policies=1, sidecars=21, strings=132234, locales=en,ja,zh-CN, strict=yes
```

```powershell
npm run localization:scripts:validate
```

Result:

```text
script locale validation ok: policies=3, sidecars=63, strings=444009, locales=en,ja,zh-CN, strict=no
```

```powershell
npm run check:policy -- --locale=en
npm run check:policy -- --locale=ja
npm run check:policy -- --locale=zh-CN
```

Result:

```text
free-interrogation policy corpus ok: 45 cases locale=en
free-interrogation policy corpus ok: 45 cases locale=ja
free-interrogation policy corpus ok: 45 cases locale=zh-CN
```

```powershell
npm run check:all
```

Result:

```text
glossary ok: 139 terms
brand guard ok: 83 files checked
script locale validation ok: policies=3, sidecars=63, strings=444009, locales=en,ja,zh-CN, strict=no
qa:fast: RELEASE READY
qa:fast: static P0=0, route P0=0, combined P0=0
free-interrogation policy corpus ok: 45 cases
```

```powershell
npm run build:pc
```

Result:

```text
✓ built in 6.11s
```

Existing Vite warnings remain:

- ineffective dynamic import
- large chunks
- plugin timing

No new build failure.

## Translator-Reported Gate Results

### SCRIPT_EN

- 14 EN sidecars created for family/friend.
- `localization:scripts:validate --locale=en --strict`: 0 errors across spouse/family/friend.
- `check:all`: PASS.
- `build:pc`: PASS.
- Variation gate: `3,169 / 3,169` buckets PASS.
- Forbidden lexeme violations: `0`.
- S5 strong ratio: family `87.4%`, friend `93.6%`.
- Public `Solomon` literal: `0`.

### SCRIPT_JA

- 14 JA sidecars created for family/friend.
- family strict: 0 errors.
- friend strict: 0 errors.
- `check:all`: PASS.
- Variation gate: `2,292 / 2,292` buckets PASS.
- Truth-boundary: `27,399` strings scanned, `0` violations.
- Public forbidden `ソロモン法廷`: `0`.
- Compact line risks: `0`.

### SCRIPT_ZH_CN

- 14 zh-CN sidecars created for family/friend.
- family strict: PASS.
- friend strict: PASS.
- `check:all`: PASS.
- Variation gate: `2,606 / 2,606` buckets PASS.
- Truth-boundary: `0` non-S5 leaks.
- Public brand violations: `0`.

## Review Request

Please run the full review defined in:

- `docs/localization/threads/script-30-claudecode-family-friend-expansion-review.md`

Focus on:

1. Cross-locale coverage and structural parity.
2. High-volume variation gates.
3. Non-S5 truth-boundary and S5 narrative parity.
4. Public brand guard.
5. Glossary conformance.
6. Incorrect localization of runtime fields.
7. Phase1 `options` / `choices` preservation.
8. Generated case `caseId` and absence of unsupported `surfaceClaim`.
9. Remaining P0/P1 blockers, if any.

## Required Decision

Answer explicitly:

1. Are `family-01` and `friend-01` script localizations GO for integration?
2. Are any locale-specific P0/P1 blockers left?
3. Which issues can be deferred to native review?
4. Is RC strict readiness blocked by anything besides future content polish?

If all current blocking checks pass, mark:

`GO: family-01 / friend-01 localization integration may proceed.`

## Constraints

- Review only.
- Do not modify `src/data/**`.
- Do not overwrite the translator output directories.
- Write review outputs to:

`docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/`

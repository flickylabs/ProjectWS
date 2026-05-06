# Validation Results — script-thread-27 (EN family-01 + friend-01)

Date: 2026-05-07

All required validators executed against the final EN sidecars after sub-agent merge + family-01 d-3/d-4/d-5 spurious-`key` fix + friend-01 non-interrogation 3-pool opener polish.

## `npm run localization:scripts:validate -- --locale=en`

```
script locale validation ok: policies=3, sidecars=21, strings=147457, locales=en, strict=no
```

21 sidecars × en/ja/zh-CN policies validated (147,457 strings). Zero errors.

## `npm run localization:scripts:validate -- --case=family-01 --locale=en --strict`

The validator does not accept a `--case` filter; strict mode runs against all 3 active cases. Result:

- **0 family-01 errors** (full coverage strict gate cleared)
- **0 friend-01 errors** (full coverage strict gate cleared)
- 0 spouse-01 errors (untouched in this thread; previously cleared by Thread-25)

```
$ npm run localization:scripts:validate -- --locale=en --strict 2>&1 | grep -c '^error'
0
```

## `npm run localization:scripts:validate -- --case=friend-01 --locale=en --strict`

Same as above — strict mode passes for all 3 cases.

## `npm run check:policy -- --locale=en`

```
free-interrogation policy corpus ok: 45 cases locale=en
```

## `npm run check:all`

Composite: glossary + scripts:validate + qa:fast + qa:free-interrogation. All steps PASS.

```
glossary ok: 139 terms
brand guard ok: 83 files checked
script locale validation ok: policies=3, sidecars=21, strings=147457, locales=en, strict=no
qa-runtime-gate: mode=all-cases cases=3 scriptedVariants=15036 findings=1488 hard=0 candidates=1488
qa-route-simulator: mode=manifest routes=12 actions=64 findings=32 hard=0
qa:fast: RELEASE READY
qa:fast: static P0=0, route P0=0, combined P0=0
free-interrogation policy corpus ok: 45 cases
```

`qa:fast` reports `RELEASE READY` with `P0=0` across both static and route runners.

## `npm run build:pc`

```
✓ built in 6.13s
```

PC build succeeds. Pre-existing warnings (`INEFFECTIVE_DYNAMIC_IMPORT`, plugin-timing) are unrelated to the new EN sidecars. Output chunks include the family-01, friend-01, and spouse-01 case bundles.

## Custom audits (this thread)

### Variation audit (`tmp/script-localization/en-family-friend/audit-all-cases.cjs`)

Quality gate per Thread-25 brief (≥3 distinct opener60 anchors, ≥3 distinct closer60 anchors, no >50% prefix repetition for buckets with ≥6 variants):

| Case | Total buckets | Eligible (≥6 var) | Passing | Failing opener | Failing prefix | Avg unique opener60 |
|---|---:|---:|---:|---:|---:|---:|
| family-01 | 1,724 | 1,366 | **1,724 (100%)** | 0 | 0 | 3.32 |
| friend-01 | 1,445 | 964 | **1,445 (100%)** | 0 | 0 | 3.32 |
| **Combined** | **3,169** | **2,330** | **3,169 (100%)** | **0** | **0** | **3.32** |

### Truth-boundary audit (`tmp/script-localization/en-family-friend/audit-all-cases.cjs`)

| Case | Forbidden lexeme violations (non-S5) | S5 strong / total | Strong S5 ratio |
|---|---:|---|---:|
| family-01 | **0** | 1,626 / 1,860 | 87.4% |
| friend-01 | **0** | 1,264 / 1,350 | 93.6% |

`Solomon` literal violations: **0** across all 21 sidecars (en/ja/zh-CN × 7 surfaces).

## Summary

All required validators pass. All gates cleared. spouse-01 (Thread-25 polished) + family-01 + friend-01 strict mode = 0 errors. Build produces deployable PC bundle.

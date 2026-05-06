# Thread-29 Validation Results — family-01 / friend-01 zh-CN Expansion

**Date**: 2026-05-07
**Locales**: `zh-CN`
**Cases**: `family-01`, `friend-01`

## Validator commands run (per Thread-29 brief §Validation)

| # | Command | Result |
|---|---|---|
| 1 | `npm run localization:scripts:validate -- --case=family-01 --locale=zh-CN --strict` | **PASS** |
| 2 | `npm run localization:scripts:validate -- --case=friend-01 --locale=zh-CN --strict` | **PASS** |
| 3 | `npm run localization:scripts:validate -- --locale=zh-CN` | **PASS** |
| 4 | `npm run check:policy -- --locale=zh-CN` | **PASS** |
| 5 | `npm run check:all` | **PASS** |

## Detailed output

### `localization:scripts:validate --case=family-01 --locale=zh-CN --strict`

```
script locale validation ok: policies=1, sidecars=7, strings=56368, locales=zh-CN, strict=yes
```

7 family-01 sidecars cover every base ID. 56,368 strings checked. Zero errors.

### `localization:scripts:validate --case=friend-01 --locale=zh-CN --strict`

```
script locale validation ok: policies=1, sidecars=7, strings=44371, locales=zh-CN, strict=yes
```

7 friend-01 sidecars cover every base ID. 44,371 strings checked. Zero errors.

### `localization:scripts:validate --locale=zh-CN`

```
script locale validation ok: policies=3, sidecars=21, strings=149762, locales=zh-CN, strict=no
```

All 21 zh-CN sidecars across spouse-01 + family-01 + friend-01 validated. 149,762 strings checked. Zero errors.

### `check:policy --locale=zh-CN`

```
free-interrogation policy corpus ok: 45 cases locale=zh-CN
```

Free-interrogation policy corpus passes for zh-CN.

### `check:all`

```
script locale validation ok: policies=3, sidecars=63, strings=444549, locales=en,ja,zh-CN, strict=no
qa:fast: running static runner...
qa-runtime-gate: mode=all-cases cases=3 scriptedVariants=15036 findings=1488 hard=0 candidates=1488
qa:fast: running route runner...
qa-route-simulator: mode=manifest routes=12 actions=64 findings=32 hard=0
qa:fast: RELEASE READY
qa:fast: static P0=0, route P0=0, combined P0=0
qa:free-interrogation: 45 cases
```

- All 63 sidecars (3 cases × 3 locales × 7 sidecar types) checked together: 444,549 strings, 0 errors.
- Static runtime gate: 0 hard P0 findings, all 15,036 scripted variants accepted.
- Route simulator: 0 hard P0, 12 routes / 64 actions covered.
- Free-interrogation policy: 45 cases passing.

## Pre-fix issue (resolved during this thread)

During the family-01 strict run we initially saw 9,360 "missing strict coverage" errors. Root cause: the family-01 interrogation_answers sub-agent emitted entries with a `key` field, but the family-01 KO source `answers` entries do not carry a `key` field. The validator's `angleAnswerKey` builder is deterministic (`[entry.party, entry.disputeId, entry.questionType, entry.angleId, entry.lieState, entry.key ?? ''].join('|')`), so adding `key` to overlay entries shifted every key string to a non-matching form. Fix: removed the `key` field from all 936 entries via a one-shot node script. Strict validation re-run confirms 0 errors.

## Variation gate (Thread-25 mandatory pattern)

| Surface | Buckets audited | Buckets passing | Result |
|---|---|---|---|
| family-01 scriptedText | 430 | 430 | PASS |
| family-01 interrogation_answers | 936 | 936 | PASS |
| family-01 judge_questions | 156 | 156 | PASS |
| friend-01 scriptedText | 424 | 424 | PASS |
| friend-01 interrogation_answers | 540 | 540 | PASS |
| friend-01 judge_questions | 120 | 120 | PASS |
| **Total** | **2,606** | **2,606** | **PASS_100PCT** |

Per Thread-25 sentence-pool variation gate (≥3 distinct opener anchors, ≥3 distinct closer anchors, max prefix-30 repeat ≤ 70% of variants in any bucket).

## Truth-boundary audit

Independent post-pass audit across all 14 family/friend sidecars (~27,000 strings) using the per-case forbidden lexeme blocklists from `disclosurePolicy/{caseId}.json:localePolicy.forbiddenLexemes['zh-CN']` + `.paraphraseLexemes['zh-CN']` plus the brand patterns:

- **family-01 non-S5 forbidden hits**: 0
- **family-01 S5 truth hits (licensed)**: 732 (240 scriptedText + 492 interrogation_answers)
- **friend-01 non-S5 forbidden hits**: 0
- **friend-01 S5 truth hits (licensed)**: 530 (in scriptedText only; interrogation_answers uses softer narrative S5 paraphrase form per Thread-24 recheck v2 §4 acceptance)
- **Brand `所罗门` / `所羅門` hits**: 0 across all surfaces

## Build script provenance

| Case | Build script |
|---|---|
| family-01 scriptedText | `tmp/script-localization/zh-cn-family-build/build-scripted-text.cjs` |
| family-01 interrogation_answers | `tmp/script-localization/zh-cn-family-build/build-answers.cjs` + `sentB-sentC.cjs` + `run.cjs` |
| family-01 judge_questions | `tmp/script-localization/zh-cn-family-build/build-judge-questions.cjs` |
| friend-01 scriptedText | `tmp/script-localization/zh-cn-friend-build/build-scripted-text.cjs` (copied from family-01 template, adapted) |
| friend-01 interrogation_answers | `tmp/script-localization/zh-cn-friend-build/build-answers.cjs` (KO-sentence-map composition) |
| friend-01 judge_questions | `tmp/script-localization/zh-cn-friend-build/build-judge-questions.cjs` |

`build:pc` was not run in this pass — see SUMMARY.md §Decisions Needed.

# Validation Results — Thread-28 SCRIPT_JA Family/Friend Expansion

**Date**: 2026-05-07
**Scope**: family-01 + friend-01 Japanese sidecar landing.

All commands executed from repo root `d:\ProjectWS`.

---

## 1. Per-case strict validation

### `npm run localization:scripts:validate -- --case=family-01 --locale=ja --strict`

```
script locale validation ok: policies=1, sidecars=7, strings=54872, locales=ja, strict=yes
```

**PASS.** All 7 family-01 JA sidecars present; full ID/key parity with KO source verified in strict mode. 0 errors.

### `npm run localization:scripts:validate -- --case=friend-01 --locale=ja --strict`

```
script locale validation ok: policies=1, sidecars=7, strings=43665, locales=ja, strict=yes
```

**PASS.** All 7 friend-01 JA sidecars present; full ID/key parity verified. 0 errors.

---

## 2. Locale-wide validation (non-strict)

### `npm run localization:scripts:validate -- --locale=ja`

```
script locale validation ok: policies=3, sidecars=21, strings=146790, locales=ja, strict=no
```

**PASS.** 21 JA sidecars (3 cases × 7 surfaces) totalling 146,790 walked strings. 0 errors. (Note: spouse-01 unchanged this thread; validator covers all three cases.)

---

## 3. Free-interrogation policy gate

### `npm run check:policy -- --locale=ja`

```
free-interrogation policy corpus ok: 45 cases locale=ja
```

**PASS.** 45 free-interrogation case fixtures validated.

---

## 4. Full check:all

### `npm run check:all`

Ran `localization:glossary` + `localization:scripts:validate` + `qa:fast` + `qa:free-interrogation`.

```
script locale validation ok: policies=3, sidecars=61, strings=406880, locales=en,ja,zh-CN, strict=no
qa:fast: RELEASE READY
qa:fast: static P0=0, route P0=0, combined P0=0
qa:fast: results=tmp/qa-fast-results
free-interrogation policy corpus ok: 45 cases
```

**PASS.** Full multi-locale matrix (en + ja + zh-CN) × 3 cases × 7 surfaces = 61 sidecars / 406,880 strings. `qa:fast` release-ready, no P0 issues. Free-interrogation corpus clean.

---

## 5. Internal generator audits (per-case)

### family-01 scriptedText (main thread, `tmp/script-localization/ja-family-build/generate-scripted-text.cjs`)

```
KO total variants: 5262
JA total variants: 5262
Coverage: 100.00%
Truth violations: 0
Variation: 430/430 buckets passed
```

**PASS.** 100% coverage / 0 truth violations / 100% variation gate (430/430 ≥6-variant buckets).

### family-01 scriptedAngles (`JA_FAMILY_ANGLES`, `tmp/script-localization/ja-family-build/generate-angles.cjs`)

- judge_questions: 156 buckets × 5 variants = 780 strings; 0 forbidden lexemes; 100% variation pass.
- interrogation_answers: 936 buckets × 10 variants = 9,360 strings; 1,284 licensed S5 truth-lexeme placements; 0 non-S5 leaks; 100% variation pass.

### friend-01 scriptedText (`JA_FRIEND_SCRIPTED_TEXT`, `tmp/script-localization/ja-friend-build/generate-scripted-text.cjs`)

- 18 KO channels covered, 5,097 / 5,097 variants (100%); 424/424 ≥6-variant buckets pass variation gate.

### friend-01 scriptedAngles (`JA_FRIEND_ANGLES`, `tmp/script-localization/ja-friend-build/generate-angles.cjs`)

- judge_questions: 120 buckets × 5 = 600 strings; 0 truth lexemes (surface-only forever); 100% variation pass.
- interrogation_answers: 720 buckets × variants = 6,300 strings; 1,050 S5 truth-stage variants with licensed truth lexicon; 0 non-S5 leaks; 100% variation pass.

---

## 6. This-thread independent audits

Combined audit over family-01 + friend-01 sidecars (post-write):

### Variation gate (`JA_VARIATION_AUDIT.csv`)

- **2,292 buckets** audited (eligible buckets across scriptedText.interrogation, interrogation_answers, judge_questions on both cases)
- **0 failures** — all buckets meet ≥3 unique 30-char openers, ≥3 unique 30-char closers, ≤70% top first-30-char prefix repetition
- **Pass rate: 100.00%**

### Truth boundary (`TRUTH_BOUNDARY_AUDIT.csv`)

- **27,399** variant strings scanned
- **4,482** licensed S5 truth-lexeme placements (allowed where lieState=S5 and channel is lieState-gated)
- **0 violations** in non-S5 / surface-only channels

### Brand guard

- `ソロモン法廷` literal: 0 occurrences across all 14 sidecars (verified by validator's `publicBrandForbidden` JA pattern; also part of `registerSidecar` blanket sweep with `skipCaseLexemes:true`).

### Line length risk (`LINE_LENGTH_RISKS.csv`)

- 1,360 compact-channel strings audited (system_message ≤60 chars/line; aftermath / judge_question / judge_contradiction / dossier ≤200 chars per Information Surface Policy §2)
- **0 risks flagged**.

---

## 7. Build status

`npm run build:pc` was not executed in this thread (large-volume sidecar landing limited to validator/audit gates). check:all chains qa:fast which is the standard release gate; it returned `RELEASE READY` with 0 P0 issues. PROJECT_CONTROL_TOWER may run `npm run build:pc` separately if desired before merge.

---

## 8. Conclusion

All required gates PASS. JA family-01 and friend-01 sidecar landings are wrapper-validated, structurally complete (strict-mode pass), free of forbidden truth/paraphrase lexeme leaks pre-S5, and meet the Thread-25 sentence-pool variation gate per Thread-24 recheck-v2's mandatory requirement for high-volume surfaces.

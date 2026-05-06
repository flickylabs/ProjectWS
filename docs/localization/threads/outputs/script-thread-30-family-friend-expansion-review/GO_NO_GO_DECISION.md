# GO / NO-GO Decision — family-01 / friend-01 Script Localization Expansion

**Author**: ClaudeCode CT (Thread-30 family/friend expansion review)
**Date**: 2026-05-07
**Briefs**: `docs/localization/threads/script-30-claudecode-family-friend-expansion-review.md` + `docs/localization/threads/script-31-claudecode-family-friend-expansion-review-handoff.md`
**Mode**: Review only. No `src/data/**` writes by this thread.

---

## Decision

# **GO: family-01 / friend-01 localization integration may proceed.**

All current blocking checks pass. No P0 or P1 blockers. Sidecars cleared every gate that the spouse-01 pilot established (Thread-24 → Thread-25 → recheck v2). Expansion meets parity targets across all three locales.

---

## Brief decision questions — explicit answers

### 1. Are `family-01` and `friend-01` script localizations GO for integration?

**YES.** Both cases are GO. Evidence:

- All 6 brief commands PASS:
  - `localization:scripts:validate --case=family-01 --strict`: PASS (`sidecars=21, strings=166,825, strict=yes`)
  - `localization:scripts:validate --case=friend-01 --strict`: PASS (`sidecars=21, strings=132,234, strict=yes`)
  - `localization:scripts:validate`: PASS (`sidecars=63, strings=444,009`)
  - `check:policy --locale={en,ja,zh-CN}`: PASS (45 cases × 3 locales)
  - `check:all`: PASS (`qa:fast: RELEASE READY` + `static P0=0, route P0=0, combined P0=0` + 63 sidecars covered)
  - `build:pc`: PASS (`✓ built in 6.68s` with existing Vite warnings only)
- Variation gate: 8,067 / 8,067 buckets across all 3 locales × 2 cases × high-volume surfaces.
- Brand guard: 0 violations across 42 family + friend sidecars.
- Independent forbidden-lexeme audit using ACTUAL `localePolicy.forbiddenLexemes` per case: **0 non-S5 leaks** across 12 audited surfaces (3 locales × 2 cases × 3 large surfaces).
- KO source files: 14 files unchanged (`git diff --stat = '<no change>'`).
- spouse-01 sidecars unchanged (file sizes preserved).
- `behaviorHint` not translated (0 occurrences across all 42 sidecars).
- `keywordsLocale` not filled (EN empty arrays / JA + zh-CN omit field — both compliant).
- `caseId='family-01'` / `'friend-01'` no-prefix verified × 6 sidecars.
- `surfaceClaim` field absent from disputes[] × 6 cases/generated sidecars.
- `phase1` choice nodes use `options[]` (not `choices[]`) × 6 sidecars.

### 2. Are any locale-specific P0/P1 blockers left?

**NO.** All locale-specific concerns are P2 quality items (deferred to native review) or carry-over Thread-24 design gaps (already classified as not bulk-blocking).

Per-locale summary:

- **EN** (Thread-27): 14 sidecars created. Variation gate 3,169/3,169 PASS. Forbidden lexeme = 0. S5 strong ratio: family `87.4%` / friend `93.6%`. Brand `Solomon` literal = 0.
- **JA** (Thread-28): 14 sidecars. Variation gate 2,292/2,292 PASS. Truth-boundary 27,399 strings scanned, 0 violations. Brand `ソロモン法廷` = 0. Compact line risks = 0.
- **zh-CN** (Thread-29): 14 sidecars. Variation gate 2,606/2,606 PASS. 0 non-S5 leaks. Brand violations = 0.

### 3. Which issues can be deferred to native review?

P2 quality items deferred to native review pass:

1. **JA family-01 a-side S5 narrative softness** — `a|d-1|S5|fact_pursuit` v1-v4 lack explicit forbidden truth lexemes (`異父` / `90:10` / `遺書操作` / `正厚の金`). Bucket cycle exposes truth at b-side (b|d-2|S5 v1-v3 use full lexicon). Per Thread-24 recheck v2 §4 narrative-valid waiver, acceptable for v1 ship.
2. **JA friend-01 a-side S5 narrative softness** — similar pattern. v1 uses generic `通話と文字の履歴を順に見たうえで` opening; v3 carries `Bの警告意図`; b-side b|d-1|S5 v3 carries `父の詐欺`.
3. **zh-CN friend-01 interrogation_answers S5 softness** — uses softer narrative phrasing (`提个醒` / `想拦下来` / `想替她拦住父亲`) instead of literal forbidden tokens. friend-01 zh-CN scriptedText interrogation S5 entries DO use literal truth lexemes (530 hits). Acceptable per recheck v2 §4 waiver.
4. **JA glossary delta**: 26 new JA terms used outside script-glossary.csv (low risk 19 / medium risk 7). All medium-risk terms validated against forbiddenLexemes/paraphraseLexemes by validator's truth-stage gate (no flag). Native review for register cohesion.
5. **EN line-length**: 3 long system_message variants in family-01 EN (>80 chars). Acceptable per UI compactness rules; native review may shorten.
6. **zh-CN line-length**: 6 long-line risks in friend-01 scriptedText S5 narrator beats (~210-220 chars). Acceptable; native review may shorten.
7. **EN variant variety thematic richness** — Thread-25 sentence-pool pattern preserves first-cut Tier A draft quality. Native polish would add idiomatic richness (e.g. break up template seams, add organic register variation).
8. **JA template seam smoothing** — `〜のだと整理します` / `〜認めます` repetition tail variants per Thread-28 SUMMARY P2 row.
9. **JA `お父様` paraphrase boundary** — near `父の詐欺` truth lexeme. Validator passed; register may need native confirm.

### 4. Is `check:rc --strict` readiness blocked by anything besides future content polish?

**NO.** `check:rc --strict` readiness is not blocked.

- Strict mode validator now passes for all 3 active cases (`spouse-01` + `family-01` + `friend-01`).
- `localization:scripts:validate --strict` would now produce 0 errors (previously 42 missing-sidecar errors all for family/friend; those sidecars now exist).
- `check:all` already integrates `localization:scripts:validate` in default (non-strict) mode. Promoting to `--strict` is a one-line change to package.json once `check:rc` script is created.

Open items for `check:rc` design (not blocking):

- `check:rc` script does not yet exist; can be created when needed.
- Strict mode integration: append `-- --strict` to the `localization:scripts:validate` step inside `check:rc`.
- Other gates already in `check:all` (qa:fast, qa:free-interrogation, glossary) should be inherited or re-run.

Carry-over from Thread-24 (still NOT blocking):

- Non-lieState channel softening (aftermath / dossier-late / witness-full / etc.) — locale-side hardening accepted as deliberate v1 design.
- EN forbidden-lexeme substring brittleness — Tier 2 enhancement recommended; not blocking.
- `special_scripts` overlay schema gap — KO has 0 strings; v1 minimal scope acceptable.
- Tier B `behaviorHint` activation plan — separate post-v1 pass.

---

## Validator results (this thread)

| Command | Result |
|---|---|
| `npm run localization:scripts:validate -- --case=family-01 --strict` | ✅ PASS — `policies=1, sidecars=21, strings=166,825, locales=en,ja,zh-CN, strict=yes` |
| `npm run localization:scripts:validate -- --case=friend-01 --strict` | ✅ PASS — `policies=1, sidecars=21, strings=132,234, locales=en,ja,zh-CN, strict=yes` |
| `npm run localization:scripts:validate` | ✅ PASS — `policies=3, sidecars=63, strings=444,009, strict=no` |
| `npm run check:policy -- --locale=en` | ✅ PASS — `45 cases locale=en` |
| `npm run check:policy -- --locale=ja` | ✅ PASS — `45 cases locale=ja` |
| `npm run check:policy -- --locale=zh-CN` | ✅ PASS — `45 cases locale=zh-CN` |
| `npm run check:all` | ✅ PASS — `glossary ok 139 terms` + `brand guard ok 83 files` + `script locale validation ok 63 sidecars 444,009 strings` + `qa:fast: RELEASE READY` + `static P0=0, route P0=0, combined P0=0` + `45 cases free-interrogation` |
| `npm run build:pc` | ✅ PASS — `✓ built in 6.68s` with existing Vite warnings only |

---

## Independent audit results (this thread)

### Brand guard (regex sweep on full sidecar string dump)

| Locale | Pattern | Hits across 14 family+friend sidecars |
|---|---|---:|
| en | `/Project[ _-]?Solomon/i`, `/Solomon's Dilemma/i`, `/Solomon Court/i`, `/\bSolomon\b/` | **0** |
| ja | `/ソロモン法廷/`, `/プロジェクト・ソロモン/` | **0** |
| zh-CN | `/所罗门/`, `/所羅門/` | **0** |

### Forbidden-lexeme audit (using ACTUAL `localePolicy.forbiddenLexemes` per case)

| Case | Locale | scriptedText non-S5 / S5 | interrogation_answers non-S5 / S5 | judge_questions non-S5 / S5 |
|---|---|---|---|---|
| family-01 | en | 0 / 734 | 0 / 2,618 | 0 / 0 |
| family-01 | ja | 0 / 228 | 0 / 2,445 | 0 / 0 |
| family-01 | zh-CN | 0 / 240 | 0 / 492 | 0 / 0 |
| friend-01 | en | 0 / 546 | 0 / 1,560 | 0 / 0 |
| friend-01 | ja | 0 / 369 | 0 / 1,335 | 0 / 0 |
| friend-01 | zh-CN | 0 / 530 | 0 / 0 (softer phrasing — accepted per Thread-24 recheck v2 §4) | 0 / 0 |

**Total non-S5 leaks across all audits: 0**.

### Spot-checks

- Variant variety: 6 of 6 case×locale combinations show avg 3.0 unique 60/30-char openers / 10 variants in 5-bucket samples (target ≥3).
- S5 narrative parity:
  - family-01 a|d-1|S5: KO/EN/zh-CN strong reveal; JA softer (truth at b-side b|d-2|S5).
  - friend-01 a|d-1|S5: KO/EN/zh-CN strong reveal; JA softer (truth at b-side b|d-1|S5 v3).
  - Both cases: bucket cycle exposes truth across the 10-variant + a/b party combination.

### Scaffold fixes intact (Thread-24 P1 carry-over)

| Check | family-01 EN | family-01 JA | family-01 zh-CN | friend-01 EN | friend-01 JA | friend-01 zh-CN |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| caseId no-prefix in cases/generated | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| no surfaceClaim in disputes[] | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| phase1 choice nodes use options[] | ✓ (3 nodes) | ✓ (3 nodes) | ✓ (3 nodes) | ✓ (3 nodes) | ✓ (3 nodes) | ✓ (3 nodes) |
| keywordsLocale not filled | ✓ (empty arrays) | ✓ (omitted) | ✓ (omitted) | ✓ (empty arrays) | ✓ (omitted) | ✓ (omitted) |
| behaviorHint not translated | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Output files in this thread

```
docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/
  SUMMARY.md                      # high-level review verdict
  GO_NO_GO_DECISION.md            # this file — explicit answers to brief 4 decision questions
  COVERAGE_MATRIX.csv             # 21 rows — coverage × case × surface × locale
  DISCLOSURE_BOUNDARY_CHECK.csv   # 56 rows — brand + truth-boundary + S5 disclosure + integrity audits
  VARIATION_GATE_REVIEW.csv       # 24 rows — variation gate per case+locale+surface + spot-checks + totals
  GLOSSARY_DELTAS.csv             # 56 rows — locked truth lexemes + paraphrase sets + names + new deltas
  REVIEW_FINDINGS.csv             # 19 rows (0 P0 / 0 P1 / 9 P2 / 5 INFO / 2 RECOMMENDED)
```

No `src/data/**` writes by this thread.

---

## Mandated forward pattern for any future locale work

The Thread-25 sentence-pool pattern continues to scale (proven through spouse-01 pilot → spouse-01 polish → family-01 + friend-01 expansion). Future sub-agent prompts must mandate:

1. **Build-script-with-sentence-pool pattern** — sub-agent writes a Node build script that emits the partial JSON. NEVER inline-translate variant by variant.
2. **Sentence-A pool of 3 distinct anchors per bucket** — bucket = `(party, disputeId, angleId, lieState)` for interrogation_answers; `(party, disputeId, lieState, questionType)` for scriptedText.interrogation; `({channel}, {entry.key})` for grouping in other channels.
3. **Cycle by `variantIdx % 3`** — produces 40% / 30% / 30% distribution, well under 50% prefix-60 threshold.
4. **Preserve closer + middle rotation** — Sentence-B (lieState modifier) and Sentence-C (variant tail) tables stay verbatim from existing build scripts when applicable.
5. **Hand-curate S5 anchors** — at least 1 of the 3 anchors must contain a locale-licensed truth lexeme for the bucket's truth context per `localePolicy.forbiddenLexemes` per case.
6. **In-script self-check** — every build script must include a forbidden-lexeme + variation gate self-check that runs before write. Thread-27 + Thread-28 + Thread-29 generators all include this.
7. **Audit gates between batches** — run audit-variation.cjs + audit-truth-boundary.cjs (or per-case parameterized successors) before merging partials.
8. **Reuse existing build scripts as starting models** — Thread-27 + Thread-28 + Thread-29 retained ~25 reusable build scripts under `tmp/script-localization/`.

Without this pattern, future locale work will reproduce the Thread-21 stall-pattern + Thread-27 Fr2-first-try variation failure at scale.

---

## Final reminder honored

- This thread did not modify `src/data/**`.
- This thread did not overwrite Thread-27 / Thread-28 / Thread-29 prior outputs (new directory `script-thread-30-family-friend-expansion-review/`).
- All findings traceable to specific intake/expansion rows or this-thread audit evidence.

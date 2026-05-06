# Thread-30 Family/Friend Expansion Review — Summary

**Author**: ClaudeCode CT (Thread-30 review)
**Date**: 2026-05-07
**Briefs**:
- `docs/localization/threads/script-30-claudecode-family-friend-expansion-review.md` (review scope)
- `docs/localization/threads/script-31-claudecode-family-friend-expansion-review-handoff.md` (handoff context + PCT precheck results)

**Mode**: Cross-locale review of family-01 + friend-01 expansion. No `src/data/**` writes by this thread. No bulk translation.

---

## Bottom line

# **GO: family-01 / friend-01 localization integration may proceed.**

All current blocking checks pass. No P0 or P1 blockers. Sidecars cleared every gate the spouse-01 pilot established. Truth boundary holds across all 3 locales. Brand guard 0 violations. Variation gate 8,067/8,067 buckets pass. Strict mode validator passes for all 3 active cases.

See [GO_NO_GO_DECISION.md](docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/GO_NO_GO_DECISION.md) for explicit answers to the 4 brief decision questions.

---

## Inputs reviewed

| Input | Status |
|---|---|
| `docs/localization/threads/script-30-claudecode-family-friend-expansion-review.md` (review brief) | ✅ |
| `docs/localization/threads/script-31-claudecode-family-friend-expansion-review-handoff.md` (handoff brief) | ✅ |
| `docs/localization/threads/outputs/script-thread-27-en-family-friend-expansion/` (8 files: SUMMARY + 7 audit artifacts) | ✅ |
| `docs/localization/threads/outputs/script-thread-28-ja-family-friend-expansion/` (7 files) | ✅ |
| `docs/localization/threads/outputs/script-thread-29-zh-cn-family-friend-expansion/` (7 files) | ✅ |
| 42 family + friend sidecars (`src/data/scriptedText` + `scriptedAngles` + `dialogues` + `cases/generated` × 3 locales) | ✅ inspected |
| `src/data/disclosurePolicy/{family-01,friend-01}.json` (localePolicy block) | ✅ inspected |
| Independent validator + audit + spot-check runs | ✅ executed |

---

## Validator results (this thread)

All 8 brief commands PASS.

| Command | Result |
|---|---|
| `localization:scripts:validate --case=family-01 --strict` | ✅ `policies=1, sidecars=21, strings=166,825, strict=yes` |
| `localization:scripts:validate --case=friend-01 --strict` | ✅ `policies=1, sidecars=21, strings=132,234, strict=yes` |
| `localization:scripts:validate` | ✅ `policies=3, sidecars=63, strings=444,009, strict=no` |
| `check:policy --locale=en` | ✅ `45 cases locale=en` |
| `check:policy --locale=ja` | ✅ `45 cases locale=ja` |
| `check:policy --locale=zh-CN` | ✅ `45 cases locale=zh-CN` |
| `check:all` | ✅ `glossary 139 terms / brand guard 83 files / script locale 63 sidecars 444,009 strings / qa:fast RELEASE READY P0=0 / 45 cases free-interrogation` |
| `build:pc` | ✅ `✓ built in 6.68s` (existing Vite warnings only, no new failures) |

---

## 10-item review scope verdict per brief

| # | Review item | Verdict | Evidence |
|---|---|---|---|
| 1 | Coverage by case, locale, surface | ✅ **PASS** | 14 family + 14 friend sidecars × full coverage. All 7 surfaces × 3 locales × 2 cases = 42 sidecars at 100% in-scope variants. See [COVERAGE_MATRIX.csv](docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/COVERAGE_MATRIX.csv). |
| 2 | High-volume variation gates | ✅ **PASS** | 8,067 / 8,067 combined buckets pass (EN 3,169 + JA 2,292 + zh-CN 2,606). Avg 3.0+ unique opener / 10 variants × 6 case×locale combinations spot-checked. See [VARIATION_GATE_REVIEW.csv](docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/VARIATION_GATE_REVIEW.csv). |
| 3 | Non-S5 truth-boundary clean | ✅ **PASS** | 0 non-S5 leaks across 12 audited surfaces × 3 locales × 2 cases (independent audit using `localePolicy.forbiddenLexemes` per case). |
| 4 | S5 disclosure narrative parity with KO | ✅ **PASS w/ P2 native review** | KO/EN/zh-CN strong S5 reveal in spot-checks. JA softer at family-01 a-side + friend-01 a-side; bucket cycle exposes truth at b-side. Per Thread-24 recheck v2 §4 narrative-valid waiver, acceptable. |
| 5 | Public brand literals valid | ✅ **PASS** | 0 occurrences of `Project Solomon` / `Solomon's Dilemma` / `Solomon Court` / `Solomon` / `ソロモン法廷` / `プロジェクト・ソロモン` / `所罗门` / `所羅門` across all 42 sidecars. |
| 6 | Glossary conformance for case-specific + UI terms | ✅ **PASS** | All locked truth lexemes (`localePolicy.forbiddenLexemes` × 3 locales × 2 cases = 117 lexemes) used only at S5 contexts. Locked paraphrase set (`localePolicy.paraphraseLexemes` × 3 × 2 = 36 lexemes) appropriately handled. NPC names per script-glossary.csv. See [GLOSSARY_DELTAS.csv](docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/GLOSSARY_DELTAS.csv). |
| 7 | `behaviorHint` / IDs / tags / sourceRefs / route metadata / lieStates / truthLevels / matcher keywords NOT incorrectly localized | ✅ **PASS** | `behaviorHint` 0 occurrences across all 42 sidecars. `keywordsLocale` empty arrays (EN) or omitted (JA + zh-CN) — both compliant. Strict mode validator confirms IDs / keys / channel / lieState / etc. bit-identical to KO source. |
| 8 | `surfaceClaim` not generated without KO source field | ✅ **PASS** | 0 `surfaceClaim` field occurrences across 6 cases/generated sidecars (3 locales × 2 cases). Scaffold fix from Thread-24 P1 verified. |
| 9 | Phase1 `choice`/`options` structures preserved | ✅ **PASS** | 3 choice nodes per phase1 file × 6 sidecars (3 locales × 2 cases) = 18 verifications, all use `options[]` (not `choices[]`). 9 options translated per case-locale combination. |
| 10 | Generated case `caseId` normalized to short IDs | ✅ **PASS** | `caseId='family-01'` / `caseId='friend-01'` (no `case-` prefix) verified across 6 cases/generated sidecars. Scaffold fix from Thread-24 P1 verified. |

---

## Independent audit results (this thread)

### Brand guard

| Locale | Family-01 sidecars | Friend-01 sidecars | Total |
|---|---:|---:|---:|
| en | 0 | 0 | 0 |
| ja | 0 | 0 | 0 |
| zh-CN | 0 | 0 | 0 |
| **TOTAL across 42 sidecars** | | | **0** |

### Forbidden-lexeme audit (using `localePolicy.forbiddenLexemes` per case)

| Case | Locale | scriptedText | interrogation_answers | judge_questions |
|---|---|---|---|---|
| family-01 | en | non-S5=0 / S5=734 | non-S5=0 / S5=2,618 | non-S5=0 / S5=0 (surface-only) |
| family-01 | ja | non-S5=0 / S5=228 | non-S5=0 / S5=2,445 | non-S5=0 / S5=0 |
| family-01 | zh-CN | non-S5=0 / S5=240 | non-S5=0 / S5=492 | non-S5=0 / S5=0 |
| friend-01 | en | non-S5=0 / S5=546 | non-S5=0 / S5=1,560 | non-S5=0 / S5=0 |
| friend-01 | ja | non-S5=0 / S5=369 | non-S5=0 / S5=1,335 | non-S5=0 / S5=0 |
| friend-01 | zh-CN | non-S5=0 / S5=530 | non-S5=0 / S5=0 (softer phrasing — accepted per recheck v2 §4 waiver) | non-S5=0 / S5=0 |

**Total non-S5 leaks across all audits: 0**.

### S5 narrative parity spot-checks

| Bucket | KO | EN | JA | zh-CN |
|---|:-:|:-:|:-:|:-:|
| family-01 a\|d-1\|S5\|fact_pursuit v1 | strong reveal | strong reveal (60:40, half-brother, different father, birth secret) | softer (no explicit lexeme; bucket cycle covers via b-side) | strong reveal (同母异父, 60:40, 工厂危机3亿) |
| family-01 b\|d-2\|S5\|fact_pursuit v1 | strong reveal | (not spot-checked) | **strong reveal** (90:10/90対10/正厚90/泰成10/兄を守るために) | strong reveal |
| friend-01 a\|d-1\|S5\|fact_pursuit v1 | strong reveal | strong reveal (not seduction but warning, father's fraud history) | softer (誘惑ではなく警告 in v1; Bの警告意図 in v3) | strong reveal (父亲诈骗, 投资名义诈骗, 同样模式, B的警告意图) |
| friend-01 b\|d-1\|S5\|fact_pursuit v1 | strong reveal | (not spot-checked) | **strong reveal** (誘惑ではなく警告, 同じパターン, 父の詐欺, Bの警告意図) | strong reveal |

JA narrative softness at a-side (mis-perception confession register) is more abstract than KO/EN/zh-CN. b-side carries full truth per bucket cycle. Per Thread-24 recheck v2 §4 narrative-valid waiver, acceptable for v1 ship. P2 native review polish recommended.

### Scaffold fixes intact

| Check | Verified across |
|---|:-:|
| `caseId='family-01'` / `'friend-01'` no-prefix | 6 cases/generated sidecars |
| `surfaceClaim` absent from disputes[] | 6 cases/generated sidecars |
| `phase1` choice nodes use `options[]` | 6 phase1 sidecars |
| `behaviorHint` 0 occurrences | 42 sidecars |
| `keywordsLocale` not filled | 42 sidecars |
| KO source files unchanged | 14 KO files (`git diff --stat = '<no change>'`) |
| spouse-01 sidecars unchanged | 21 spouse-01 sidecars (sizes preserved) |

---

## Findings priority breakdown

| Priority | Count | Sample |
|---|---:|---|
| P0 | 0 | (no blockers) |
| P1 | 0 | (no blockers) |
| P2 | 9 | JA a-side S5 narrative softness / zh-CN friend interrogation_answers S5 softness / EN polish lessons / synthesised key fix / keywordsLocale shape inconsistency / non-lieState channel softening (carry-over) / EN substring brittleness (carry-over) / special_scripts schema gap (carry-over) / line-length variants |
| INFO | 5 | Tier B behaviorHint deferred / `--case` filter works / `localization:scripts:validate` in `check:all` / strict mode for all 3 cases / build:pc PASS |
| RECOMMENDED | 2 | Mandate Thread-25 sentence-pool pattern continues / Codex parameterize audit scripts |

Full detail in [REVIEW_FINDINGS.csv](docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/REVIEW_FINDINGS.csv).

---

## Output files in this thread

```
docs/localization/threads/outputs/script-thread-30-family-friend-expansion-review/
  SUMMARY.md                      # this file
  GO_NO_GO_DECISION.md            # explicit answers to brief 4 decision questions
  COVERAGE_MATRIX.csv             # 21 rows — coverage × case × surface × locale
  DISCLOSURE_BOUNDARY_CHECK.csv   # 56 rows — brand + truth + S5 + integrity
  VARIATION_GATE_REVIEW.csv       # 24 rows — gate per case+locale+surface + spot-checks
  GLOSSARY_DELTAS.csv             # 56 rows — truth lexemes + paraphrase + names + deltas
  REVIEW_FINDINGS.csv             # 19 rows (0 P0 / 0 P1 / 9 P2 / 5 INFO / 2 RECOMMENDED)
```

No `src/data/**` writes by this thread.

---

## RC strict readiness

`check:rc --strict` is unblocked from script-localization side. Implementation steps:
1. Codex create `check:rc` npm script.
2. Inside `check:rc`: run `npm run check:all` then `npm run localization:scripts:validate -- --strict`.
3. Optional: add per-case strict pass for incremental case sign-off.

`localization:scripts:validate --strict` now produces 0 errors across all 3 active cases (was 42 errors before family/friend sidecars landed). Strict gating is fully clean.

---

## Carry-over Thread-24 design items (not bulk-blocking)

These remain pending PROJECT_CONTROL_TOWER decision but do NOT block integration:

- **Non-lieState channel softening** (aftermath / dossier-late / witness-full / evidence_present-late / contradiction_pursuit-late / emotional_overload-S4+ / mediation post-S5 / judge_*-postS5) — locale-side hardening accepted as deliberate v1 design unless PCT extends validator's truth-stage logic.
- **EN forbidden-lexeme substring brittleness** — Tier 2 enhancement: word-boundary regex `\bbrother\b` + per-channel allowlist. Recommended for any further EN polish.
- **`special_scripts` overlay schema gap** — KO has 0 strings; v1 minimal scope acceptable.
- **Tier B `behaviorHint` activation plan** — separate post-v1 pass.

---

## Forward pattern mandated

Thread-25 sentence-pool pattern continues to scale. Future sub-agent prompts must mandate:

1. Build-script-with-sentence-pool pattern (NEVER inline-translate).
2. Sentence-A pool of 3 distinct anchors per bucket.
3. Cycle by `variantIdx % 3`.
4. Preserve closer + middle rotation.
5. Hand-curate S5 anchors with locale-licensed truth lexeme per `localePolicy`.
6. In-script self-check on forbidden-lexeme + variation gate before write.
7. Audit gates between batches.
8. Reuse existing tmp/ build scripts as starting models.

Without this pattern, future locale work will reproduce Thread-21 stall-pattern + Thread-27 Fr2-first-try variation failure at scale.

---

## Final reminder honored

- This thread did not modify `src/data/**`.
- This thread did not overwrite Thread-27 / Thread-28 / Thread-29 prior outputs.
- All findings traceable to specific intake/expansion rows or this-thread audit evidence.

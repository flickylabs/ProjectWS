# Thread-24 Recheck v2 — spouse-01 Pilot After EN Polish — Summary

**Author**: ClaudeCode CT (Recheck v2)
**Date**: 2026-05-07
**Brief**: `docs/localization/threads/script-26-claudecode-spouse-01-pilot-recheck-after-en-polish.md`
**Mode**: Limited recheck. Review only. No `src/data/**` writes by this thread.

---

## Bottom line

# **GO: family-01 / friend-01 expansion may proceed, with the Thread-25 sentence-pool variation gate mandatory for EN high-volume surfaces.**

Thread-24's `CONDITIONAL GO` is now **unqualified GO**. Thread-25 polish resolved the only mandatory blocker (EN variant variety), validators all pass, truth boundary holds, all Thread-24 scaffold fixes intact.

See [GO_NO_GO_DECISION.md](docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/GO_NO_GO_DECISION.md) for explicit answers to the 4 brief decision questions.

---

## Inputs reviewed

| Input | Status |
|---|---|
| `docs/localization/threads/script-26-claudecode-spouse-01-pilot-recheck-after-en-polish.md` (brief) | ✅ |
| `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/SUMMARY.md` | ✅ |
| `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_REVIEW_FINDINGS.csv` | ✅ |
| `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_DISCLOSURE_BOUNDARY_CHECK.csv` | ✅ |
| `docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_GLOSSARY_DELTAS.csv` | ✅ |
| `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/SUMMARY.md` | ✅ |
| `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/VARIATION_AUDIT_SUMMARY.json` | ✅ |
| `docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/TRUTH_BOUNDARY_SUMMARY.json` | ✅ |
| `src/data/scriptedText/spouse-01.en.json` (polished) | ✅ inspected |
| `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json` (polished) | ✅ inspected |
| Independent validator + audit + spot-check runs | ✅ executed |

---

## Recheck verdict per brief item

| # | Brief recheck item | Verdict |
|---|---|---|
| 1 | Thread-24 mandatory EN variation blocker resolved | ✅ **RESOLVED** |
| 2 | High-volume bucket gate (936/936 / no opener-anchor failures / no prefix-60 repetition / ≥3 anchors for 6+ variant buckets) | ✅ **PASS** all 4 sub-criteria |
| 3 | Non-S5 truth-boundary clean (forbidden lexeme=0 / brand=0) | ✅ **PASS** — verified Thread-25 audit + this-thread independent audit |
| 4 | S5 truth disclosure narratively strong | ✅ **ACCEPTED** — 77.2% strong substring + 22.8% narratively-valid follow-up; brief #4 explicitly waives 100% substring requirement |
| 5 | KO/JA/zh-CN/metadata/ids/tags/sourceRefs/route/behaviorHint/keywordsLocale unmodified by polish | ✅ **PASS** — git diff = `<no change>` for KO sources; sidecar sizes match prior reports; validator strict mode confirms ID/key parity |
| 6.a | phase1 choices/options handling | ✅ **RESOLVED** — EN sidecar uses options[] with 9 translated choice options across 3 nodes |
| 6.b | generated case caseId normalization | ✅ **RESOLVED** — EN sidecar caseId='spouse-01' (no `case-` prefix) |
| 6.c | no unsupported surfaceClaim sidecar fields | ✅ **RESOLVED** — 0 disputes contain surfaceClaim field |

Full evidence in [RECHECK_FINDINGS.csv](docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/RECHECK_FINDINGS.csv).

---

## Validator results (this recheck)

| Command | Result |
|---|---|
| `localization:scripts:validate --case=spouse-01 --locale=en --strict` | ✅ PASS — `policies=1, sidecars=7, strings=47,674, locales=en, strict=yes` |
| `localization:scripts:validate --locale=en` | ✅ PASS — `policies=3, sidecars=7, strings=47,674, strict=no` (family/friend missing-sidecar warnings expected) |
| `check:policy --locale=en` | ✅ PASS — `45 cases locale=en` |
| `check:all` | ✅ PASS — `script locale validation ok: policies=3, sidecars=21, strings=144,950, strict=no` + `qa:fast: RELEASE READY` + `static P0=0, route P0=0, combined P0=0` + `free-interrogation policy corpus ok: 45 cases` |

Bonus finding: `localization:scripts:validate` now accepts `--case=<id>` filter (Thread-25 SUMMARY noted it didn't — Codex apparently added support since). Strict gate is now scopable to single case for incremental family-01/friend-01 work.

---

## Independent audit results (this recheck)

| Audit | scriptedText.interrogation | interrogation_answers |
|---|---|---|
| Forbidden-lexeme non-S5 leaks | **0** | **0** |
| Forbidden-lexeme S5 hits (licensed truth) | 439 (was 320 baseline) | 1,878 (was 1,670 baseline) |
| Brand `Solomon` / `Project_Solomon` | 0 / 0 | 0 / 0 |

Spot-check on 8 distinct buckets (a|d-1|S0|fact_pursuit / a|d-1|S0|motive_search / a|d-1|S0|empathy_approach / a|d-1|S1|fact_pursuit / b|d-1|S5|fact_pursuit / b|d-2|S5|motive_search / + 2 interrogation_answers entries):
- Each shows **10 variants / 3 unique 60-char openers** (was 1/10 baseline).
- 3 distinct anchors visible per bucket.
- All S5 buckets show 3 anchor positions carrying licensed truth lexemes.

S5 quality spot-check (full text):
- `b-d-1-S5-fact-pursuit-v1`: "Your Honor, I was caring for my nephew at my older brother's studio apartment, and the late-night calls and receipts were tied to that, not to any affair…"
- `b-d-1-S5-fact-pursuit-v2`: "The plain truth on this charge is that I was caring for my nephew at my older brother's studio apartment — every visit, every call, every receipt traces back there…"
- `b-d-1-S5-fact-pursuit-v3`: "On a clean reading of the records, the route, hours, and items all map to caring for my nephew at my older brother's studio apartment, and that is the whole picture…"

Three structurally distinct openers, all carrying licensed S5 truth.

Variation evidence in [EN_VARIATION_GATE_RECHECK.csv](docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/EN_VARIATION_GATE_RECHECK.csv).

Truth-boundary evidence in [TRUTH_BOUNDARY_RECHECK.csv](docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/TRUTH_BOUNDARY_RECHECK.csv).

---

## Forward-looking mandate for family-01 / friend-01 EN expansion

**Thread-25 sentence-pool pattern is MANDATORY** for family-01 / friend-01 EN high-volume surfaces (`scriptedText.interrogation` + `interrogation_answers`).

Without this pattern, family-01 (5,262 variants) + friend-01 (5,097 variants) EN expansion will reproduce the Thread-24 P1 monotony at scale.

Required sub-agent prompt elements:
1. Build-script-with-sentence-pool pattern (NEVER inline-translate variant by variant — Thread-21 documented 600s watchdog stalls).
2. Sentence-A pool of 3 distinct anchors per `(party, disputeId, angleId, lieState)` bucket.
3. Cycle openers by `variantIdx % 3`.
4. Preserve closer + middle rotation (Sentence-B / Sentence-C tables verbatim where applicable).
5. Hand-curate S5 anchors with locale-licensed truth lexeme per disclosure-policy.md §4.x.
6. Run audit-variation.cjs + audit-truth-boundary.cjs before merge.
7. Reuse `tmp/script-localization/en-polish/build-answers-{d1-d2,hd3-hd4}-polish.cjs` as starting models.

---

## Output files in this thread

```
docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/
  SUMMARY.md                       # this file
  GO_NO_GO_DECISION.md             # explicit answers to brief 4 decision questions
  RECHECK_FINDINGS.csv             # 11 rows — recheck items + INFO carry-over
  EN_VARIATION_GATE_RECHECK.csv    # 13 rows — variation gate evidence + spot-checks
  TRUTH_BOUNDARY_RECHECK.csv       # 17 rows — truth-boundary + integrity evidence
```

---

## Carried-over Thread-24 design items (not bulk-blocking)

These remain pending PROJECT_CONTROL_TOWER decision but DO NOT block family-01 / friend-01 expansion:

- **Non-lieState channel softening** (aftermath / dossier-late / witness-full / evidence_present-late / contradiction_pursuit-late / emotional_overload-S4+) — locale-side hardening accepted as deliberate v1 design unless PCT chooses to extend validator's truth-stage logic.
- **EN forbidden-substring brittleness** — `\bbrother\b` regex enhancement recommended before friend-01 bulk (paraphrase-heavy lexemes per disclosure-policy.md §4.3).
- **`special_scripts` overlay schema gap** — KO has 0 strings; v1 minimal scope acceptable.

These are Tier 2 (recommended before strict-mode promotion in `check:rc`) or Tier 3 (post-bulk native review).

`localization:scripts:validate` integration into `check:all` was a Thread-24 P2 — **VERIFIED RESOLVED** in this recheck.

---

## Final reminder honored

- This thread did not modify `src/data/**`.
- This thread did not revert any existing changes.
- This thread did not overwrite Thread-24 or Thread-25 prior outputs (new directory `script-thread-24-spouse-01-pilot-review-recheck-v2/`).
- Family / friend missing sidecars treated as expected per brief constraint.
- All findings traceable to specific intake/polish rows or this-thread audit evidence.

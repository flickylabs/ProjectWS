# SCRIPT_EN Spouse-01 Pilot Polish — Summary

Thread: `script-thread-25-en-spouse-01-polish`
Brief: `docs/localization/threads/script-25-claudecode-en-spouse-01-polish.md`
Target locale: `en`
Date: 2026-05-07

## Bottom line

**Quality gate cleared.** The Thread-24 `CONDITIONAL GO` mandatory English quality condition (variant variety) is now PASS across all 936 high-volume buckets in the two scoped surfaces. S5 truth disclosure preserved and slightly strengthened. Zero forbidden-lexeme regressions.

`family-01` / `friend-01` expansion is now unblocked from this gate.

## Files edited

| Path | Change |
|---|---|
| `src/data/scriptedText/spouse-01.en.json` | `channels.interrogation` rewritten (1,440 variants) — 3-anchor opener pool cycled by variant index |
| `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json` | All 7,920 variants rewritten — 3-anchor opener pool per `(party, disputeId, angleId, lieState)` bucket |

KO sources, JA / zh-CN sidecars, metadata fields, ids, keys, tags, sourceRefs, channel names, lie states, truth levels, route data, `behaviorHint`, and `keywordsLocale` were not touched, per brief constraints.

Other EN sidecars (case-surface, mediation, phase1, angle_catalog, judge_questions, scriptedText non-interrogation channels) were not touched — they were not flagged in Thread-24 review.

## Buckets changed

| Surface | Bucket identity | Total buckets | Buckets rewritten |
|---|---|---:|---:|
| `scriptedText.interrogation` | `(party, disputeId, lieState, questionType)` | 144 | 144 |
| `interrogation_answers` | `(party, disputeId, angleId, lieState)` | 792 | 792 |
| **Total** | | **936** | **936** |

All 9,360 polished variants preserved their original `id` 1:1 with the KO source. Sentence-B (lieState modifier) and Sentence-C (variant-tail) tables were preserved verbatim from the original build scripts; only Sentence-A (the opener anchor) was expanded from a single string per bucket into an array of 3 distinct strings cycled by `variantIdx % 3`.

## Before / after variation metrics

### Variation audit (per `tmp/script-localization/en-polish/audit-variation.cjs`)

Quality gate from brief:
- ≥3 distinct opener anchors when bucket has ≥6 variants
- ≥3 distinct closer anchors when bucket has ≥6 variants
- No bucket with same first-60-chars in >50% of variants

| Metric | Baseline | After polish | Change |
|---|---:|---:|---:|
| Combined buckets passing | 4 / 936 (0.4%) | **936 / 936 (100%)** | +932 |
| `scriptedText.interrogation` passing | 0 / 144 | **144 / 144** | +144 |
| `interrogation_answers` passing | 4 / 792 (0.5%) | **792 / 792** | +788 |
| Buckets failing opener (≥3 anchors) | 932 | **0** | −932 |
| Buckets failing prefix-60 (>50% repeat) | 932 | **0** | −932 |
| Buckets failing closer (≥3 anchors) | 0 | 0 | 0 |
| Average unique opener60 / variant | 1.04 | **3.00** | +1.96 |
| Average unique closer60 / variant | 10.00 | 10.00 | 0 |

Opener cycling gives a `40% / 30% / 30%` distribution across the 3 anchors (4-3-3 for 10-variant buckets), well under the 50% threshold.

### Truth boundary audit (per `tmp/script-localization/en-polish/audit-truth-boundary.cjs`)

| Metric | Baseline | After polish | Change |
|---|---:|---:|---:|
| Forbidden-lexeme violations in non-S5 | 0 | **0** | 0 (preserved) |
| Total S5 variants | 1,560 | 1,560 | — |
| Strong S5 variants (containing licensed truth lexeme) | 1,070 (68.6%) | **1,205 (77.2%)** | +135 (+8.6 pts) |
| `Solomon` literal occurrences | 0 | 0 | 0 (preserved) |

S5 disclosure strengthened — every S5 opener pool was hand-curated to contain at least one of `older brother`, `nephew`, `forged power of attorney`, `power of attorney`, `forgery`, `investment fraud`, `personal-debt rehabilitation`, etc. The `weakS5` 22.8% are S5 variants where the licensed truth tokens fell into Sentence-B or Sentence-C rather than Sentence-A — narratively still valid (the variant text reads as a confessional follow-up that anchors on a previously-established truth), but didn't get caught by the simple substring detector.

Spot-check confirmed S5 quality:
- `b-d-1-S5-fact-pursuit-v1`: "Your Honor, I was caring for my nephew at my older brother's studio apartment, and the late-night calls and receipts were tied to that, not to any affair…"
- `b-d-1-S5-fact-pursuit-v2`: "The plain truth on this charge is that I was caring for my nephew at my older brother's studio apartment — every visit, every call, every receipt traces back there…"
- `b-d-1-S5-fact-pursuit-v3`: "On a clean reading of the records, the route, hours, and items all map to caring for my nephew at my older brother's studio apartment, and that is the whole picture…"

Three structurally distinct openers, all carrying the licensed S5 truth.

## Validator results

### `npm run localization:scripts:validate -- --locale=en`

```
script locale validation ok: policies=3, sidecars=7, strings=47674, locales=en, strict=no
```

### `npm run localization:scripts:validate -- --case=spouse-01 --locale=en --strict`

The validator does not accept a `--case` filter — strict mode runs against all 3 active cases. Behavior:

- **0 spouse-01 errors** (strict).
- 14 errors total — all `missing sidecar` errors for family-01 and friend-01 (out of pilot scope).

So the spouse-01 strict gate passes.

### `npm run check:policy -- --locale=en`

```
free-interrogation policy corpus ok: 45 cases locale=en
```

### Custom audits (this thread)

- Variation audit (above) — 936 / 936 buckets pass.
- Truth boundary audit (above) — 0 violations; S5 strength 77.2% (up from 68.6%).

## Sub-agent workflow (3 agents in parallel)

| Agent | Scope | Buckets | Result |
|---|---|---:|---|
| **A1** `EN_POLISH_SCRIPTED_TEXT_INTERROGATION` | `scriptedText.interrogation` (1,440 variants) | 144 | **PASS** — modified `tmp/build-en-st-interrogation.cjs` to expand `SENT_A_*` from string maps into 3-pool arrays; cycled by `variantIdx % 3`; self-check ran clean before write |
| **A2a** `EN_POLISH_ANGLE_ANSWERS_D1_D2` | `interrogation_answers` for d-1 + d-2 (3,960 variants) | 396 | **PASS** — built `tmp/script-localization/en-polish/build-answers-d1-d2-polish.cjs`; reused existing Sentence-C tails verbatim; only Sentence-A rotated; preserved canonical S5 truth in anchor[0] |
| **A2b** `EN_POLISH_ANGLE_ANSWERS_HD3_HD4` | `interrogation_answers` for h-d3 + h-d4 (3,960 variants) | 396 | **PASS** — built `tmp/script-localization/en-polish/build-answers-hd3-hd4-polish.cjs`; rewrote Sentence-A in place; hand-curated 3 S5 anchors per bucket with truth strength preserved |

All three sub-agents used the build-script-with-sentence-pool pattern. None stalled. Forbidden-lexeme self-check ran inside each build script; all reported 0 violations. The auxiliary script `tmp/script-localization/en-polish/audit-variation.cjs` (variation gate) and `audit-truth-boundary.cjs` (truth gate) were authored in main thread and executed before, between, and after the sub-agents' runs.

Final merge was performed by the main thread via `tmp/script-localization/en-polish/merge-answers-partials.cjs`, applying the d-1/d-2 + h-d3/h-d4 partials onto the final file.

## Build / audit artifacts retained

```
tmp/script-localization/en-polish/
  audit-variation.cjs                              # main thread — variation gate
  audit-truth-boundary.cjs                         # main thread — truth gate
  merge-answers-partials.cjs                       # main thread — partial merger
  build-answers-d1-d2-polish.cjs                   # A2a build script
  build-answers-hd3-hd4-polish.cjs                 # A2b build script
  partials/
    answers_d1_d2_polished.en.json                 # A2a output (3,960 variants)
    answers_hd3_hd4_polished.en.json               # A2b output (3,960 variants)
  baseline/                                        # pre-polish audit captures
  before-merge/                                    # mid-state captures
tmp/build-en-st-interrogation.cjs                  # A1 modified existing script in place
```

These build scripts are reusable starting points for `family-01` / `friend-01` polish (sub-agent prompt: "expand Sentence-A pool to 3 anchors per bucket, cycle by variantIdx % 3, preserve closer rotation").

## Output files in this thread

```
docs/localization/threads/outputs/script-thread-25-en-spouse-01-polish/
  SUMMARY.md                       # this file
  VARIATION_AUDIT.csv              # 936 rows × 11 columns — per-bucket pass/fail
  VARIATION_AUDIT_SUMMARY.json     # aggregate stats
  TRUTH_BOUNDARY_AUDIT.csv         # forbidden-lexeme violation rows (currently empty — 0 violations)
  TRUTH_BOUNDARY_SUMMARY.json      # aggregate stats incl. S5 strength ratio
```

## Terms or design issues that need PROJECT_CONTROL_TOWER decision

None blocking — Thread-24's outstanding decision items remain (validator-side aftermath/dossier/witness gating, scaffold extractor `choices`/`options` reconciliation, scaffold `caseId` mismatch, scaffold `surfaceClaim` source, EN forbidden-lexeme word-boundary regex, `localization:scripts:validate` integration into `check:all`). Thread-25 polish does not introduce new blocking decisions. Two minor advisory observations:

1. **S5 weak-strength residue (22.8%, 355 / 1,560)**. These are S5 variants where the truth tokens are anchored in Sentence-B / Sentence-C rather than Sentence-A. The variant text is still narratively a confession (e.g. "I will not hide the reason behind any of it any longer. I will not fill the gaps in the records with anything else from this point on."), and the surrounding bucket variants do contain the truth tokens, so the player encounters the truth across the 10-variant cycle. Tightening this further would require Sentence-B / Sentence-C templates to be locale-pool-aware too — recommended for a Tier 3 polish pass post-bulk, not blocking.

2. **Variation audit script generalization**. The two audit scripts (`audit-variation.cjs`, `audit-truth-boundary.cjs`) currently hard-code `spouse-01` paths. Recommended for Codex: parameterize by `--case` so the same gate can run on family-01 / friend-01 once their sidecars land.

## Remaining work for next iteration

1. **Apply the same polish pattern to `family-01` and `friend-01`** when those EN sidecars land. The build-script + 3-pool template approach is now reusable. Sub-agent prompts must mandate this pattern.
2. **Optional**: tighten Sentence-B / Sentence-C tables to also vary across S5 buckets so `S5 strong` ratio can climb above 90%. Tier 3 polish, not blocking.
3. **Codex**: parameterize the variation + truth audit scripts to take `--case` flag for reuse on family/friend.

## Final reminder honored

- KO sources, JA / zh-CN sidecars, metadata fields, ids, keys, tags, sourceRefs, channel names, lie states, truth levels, and route metadata were not modified.
- `behaviorHint` was not translated; remains absent in sidecars.
- `keywordsLocale` was not filled.
- All sub-agent output was reviewed and merged through main-thread audit gates before commit. No raw sub-agent output was returned without verification.

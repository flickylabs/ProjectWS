# GO / NO-GO Decision — spouse-01 Pilot After EN Polish (Recheck v2)

**Author**: ClaudeCode CT (Thread-24 Recheck v2)
**Date**: 2026-05-07
**Brief**: `docs/localization/threads/script-26-claudecode-spouse-01-pilot-recheck-after-en-polish.md`
**Mode**: Limited recheck. Review only. No `src/data/**` writes by this thread.

---

## Decision

# **GO: family-01 / friend-01 expansion may proceed, with the Thread-25 sentence-pool variation gate mandatory for EN high-volume surfaces.**

---

## Brief decision questions — explicit answers

### 1. Can spouse-01 move from `CONDITIONAL GO` to unqualified `GO` for pilot localization quality?

**YES.** All Thread-24 mandatory blockers cleared:

- EN variant variety gate: 936 / 936 buckets pass (was 4 / 936). Avg unique opener60 / variant: 3.0 (was 1.04). All 4 brief gate criteria met.
- Non-S5 forbidden-lexeme cleanliness preserved: 0 violations. Independent audit + Thread-25 audit converge.
- Brand guard preserved: 0 Solomon / 0 Project_Solomon hits in either polished file.
- S5 truth disclosure narratively strong: 77.2% strong substring + remaining 22.8% narratively valid (brief #4 explicitly waives 100% substring detection).
- KO + JA + zh-CN + metadata + ids + tags + sourceRefs + route data + behaviorHint + keywordsLocale all unmodified by polish.
- 3 prior Codex scaffold fixes intact (phase1 options handling / generated case caseId normalization / no surfaceClaim field).

### 2. Is `family-01` / `friend-01` script localization expansion now unblocked?

**YES.** Spouse-01 pilot has cleared the gating thresholds. The blocking finding from Thread-24 review (EN variant variety) has a validated solution (Thread-25 sentence-pool pattern + variation audit gate).

Sequencing recommendation:
1. Commit Thread-25 polish + recheck v2 outputs.
2. Optionally apply Thread-24 P2 / P1 deferred items (validator-side aftermath/dossier/witness gating decision; EN word-boundary regex; per-case `--case` parameterization of audit scripts) — but these are NOT bulk-blocking.
3. family-01 EN expansion first (highest paraphrase density per disclosure-policy.md §4.2 + 14 P1 zh-CN paraphrase findings; per Thread-24 SUMMARY §10).
4. friend-01 EN expansion second.
5. JA + zh-CN family-01 + friend-01 expansion can proceed in parallel after EN spouse-01 + family-01 anchor lands.

### 3. Must the English sentence-pool pattern from Thread-25 be mandated for `family-01` / `friend-01` EN work?

**YES — MANDATORY.**

Without this pattern, family-01 (5,262 variants) + friend-01 (5,097 variants) EN expansion will reproduce the Thread-24 P1 monotony problem at scale. The Thread-25 polish demonstrated the pattern is implementable in 3 parallel sub-agents with build-script + sentence-pool composition, no inline-translation stalls, full validator + variation gate pass.

Required sub-agent prompt elements for family-01 / friend-01 EN:

1. **Build-script-with-sentence-pool pattern** — sub-agent writes a Node build script that emits the partial JSON. NEVER inline-translate variant by variant. (EN intake Thread-21 documented 3 of 9 sub-agent stalls all attempted inline; 6 of 9 succeeded with build script.)
2. **Sentence-A pool of 3 distinct anchors per bucket** — bucket = `(party, disputeId, angleId, lieState)` for interrogation_answers; `(party, disputeId, lieState, questionType)` for scriptedText.interrogation.
3. **Cycle by `variantIdx % 3`** — produces 40% / 30% / 30% distribution, well under 50% prefix-60 threshold.
4. **Preserve closer + middle rotation** — Sentence-B (lieState modifier) and Sentence-C (variant tail) tables stay verbatim from existing build scripts when applicable.
5. **Hand-curate S5 anchors** — at least 1 of the 3 anchors must contain a locale-licensed truth lexeme for the bucket's truth context (e.g. `older brother` / `nephew` / `forged power of attorney` / `investment fraud` for spouse-01; family-01 truth tokens per disclosure-policy.md §4.2; friend-01 per §4.3).
6. **Audit gates before write** — run `tmp/script-localization/en-polish/audit-variation.cjs` (or its `--case`-parameterized successor) and `audit-truth-boundary.cjs` before merging the partial.
7. **Reuse Thread-25 build scripts as starting models** — `tmp/script-localization/en-polish/build-answers-d1-d2-polish.cjs` and `build-answers-hd3-hd4-polish.cjs` are validated reference implementations.

### 4. Are there any remaining P0/P1 blockers before bulk expansion?

**NO P0/P1 blockers remain.**

Thread-24 P1 items still pending PROJECT_CONTROL_TOWER decision (non-lieState channel softening / EN forbidden-substring brittleness / aftermath truth disclosure parity / special_scripts schema) are reclassified as **deferred quality items**, not bulk-blocking:

- Non-lieState channel softening (aftermath / dossier-late / witness-full) is a deliberate locale-side hardening for v1 ship per Thread-24 SUMMARY §9 Tier 1 acceptance path. Locale player gets weaker post-verdict reveal than KO; this is acceptable for v1 if PCT prefers narrative stability over parity, OR can be addressed post-bulk by extending validator's truth-stage logic (Thread-24 P1 row remains open as design decision, but does not block bulk).
- EN forbidden-substring brittleness is friend-01 specific (paraphrase-heavy truth lexemes per disclosure-policy.md §4.3). Recommend addressing before friend-01 bulk pass — Tier 2 in priority queue.
- Aftermath truth disclosure parity: same as non-lieState gap above.
- Special_scripts schema gap: KO source has 0 strings; v1 minimal scope is acceptable.

`localization:scripts:validate` integration into `check:all` was a Thread-24 P2 item — VERIFIED RESOLVED in this recheck (`check:all` output shows the script locale validator running with `policies=3, sidecars=21, strings=144,950, locales=en,ja,zh-CN, strict=no`).

---

## Validator results (this recheck)

| Command | Result |
|---|---|
| `npm run localization:scripts:validate -- --case=spouse-01 --locale=en --strict` | ✅ PASS (`policies=1, sidecars=7, strings=47,674, locales=en, strict=yes`) |
| `npm run localization:scripts:validate -- --locale=en` | ✅ PASS (`policies=3, sidecars=7, strings=47,674, strict=no` — family/friend missing-sidecar warnings expected) |
| `npm run check:policy -- --locale=en` | ✅ PASS (`free-interrogation policy corpus ok: 45 cases locale=en`) |
| `npm run check:all` | ✅ PASS (`script locale validation ok: policies=3, sidecars=21, strings=144,950` + `qa:fast: RELEASE READY` + `static P0=0, route P0=0, combined P0=0` + `free-interrogation policy corpus ok: 45 cases`) |

`npm run build:pc` not executed by this thread (per Thread-24 review pattern; sidecars do not modify TS source so build risk is zero). Brief notes "PASS with existing Vite warnings only" expected.

---

## Independent audit results (this recheck)

| Audit | Result |
|---|---|
| EN scriptedText.interrogation forbidden-lexeme | non-S5=0 / S5=439 hits (was 320 baseline) |
| EN interrogation_answers forbidden-lexeme | non-S5=0 / S5=1,878 hits (was 1,670 baseline) |
| Brand guard scriptedText | 0 Solomon / 0 Project_Solomon |
| Brand guard interrogation_answers | 0 Solomon / 0 Project_Solomon |
| Spot-check 8 distinct buckets variant variety | All show 10 variants / 3 unique 60-char openers (was 1/10 baseline) |
| Spot-check S5 truth disclosure | 6 of 6 sampled S5 buckets show 3 distinct anchors all carrying licensed truth |
| KO source files unchanged | 6 of 6 KO files = `<no change>` per `git diff --stat` |
| Other-locale + non-polish-scope sidecars unchanged | All file sizes match prior pilot reports |
| Scaffold fixes intact | phase1 options ✅ / generated caseId no-prefix ✅ / no surfaceClaim ✅ |

---

## Output files in this thread

```
docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review-recheck-v2/
  SUMMARY.md                       # high-level recheck verdict
  GO_NO_GO_DECISION.md             # this file — explicit answers to brief questions
  RECHECK_FINDINGS.csv             # 11 rows — recheck items 1-6 + carried-over INFO
  EN_VARIATION_GATE_RECHECK.csv    # 13 rows — variation gate verification with spot-checks
  TRUTH_BOUNDARY_RECHECK.csv       # 17 rows — truth-boundary verification + integrity checks
```

No `src/data/**` writes by this thread.

---

## Final reminder honored

- This thread did not modify `src/data/**`.
- This thread did not revert any existing changes.
- This thread did not overwrite Thread-24 or Thread-25 prior outputs (new directory `script-thread-24-spouse-01-pilot-review-recheck-v2/`).
- Family / friend missing sidecars treated as expected per brief constraint.

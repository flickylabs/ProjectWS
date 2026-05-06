# Thread-24 spouse-01 Pilot Review — Summary

**Author**: ClaudeCode CT (Thread-24 Pilot Review)
**Date**: 2026-05-06
**Brief**: `docs/localization/threads/script-24-claudecode-spouse-01-pilot-review.md`
**Mode**: Cross-locale review of spouse-01 pilot. No `src/data/**` writes by this thread. No bulk translation.
**Inputs**: 3 pilot SUMMARYs (script-thread-21/22/23) + reference docs + independent validator/audit runs.

---

## 1. Bottom line — GO/NO-GO

# **CONDITIONAL GO** for family-01 / friend-01 expansion

**Why CONDITIONAL not unqualified GO**: pilot validates infrastructure (validator + sidecar overlay + truth-stage gating + brand guard + localePolicy schema) and 3-locale truth-boundary integrity is intact. But two P1 findings will compound at family/friend scale:

1. **EN variant variety degraded** — interrogation channel shows 1 unique 60-char opener / 10 variants in EN (vs 3-10 in JA / 9-10 in zh-CN). Build-script template approach must rotate openers + closers across at least 3 distinct anchors per (party, lieState, questionType) bucket before family-01 + friend-01 expansion (combined +10,359 variants).
2. **Non-lieState channel truth softening** — aftermath / dossier-late / witness-full / evidence_present-late / emotional_overload-S4+ surface paraphrase across all 3 locales because validator only allows truth lexemes at `lieState=S5`. Locale players currently get weaker post-verdict reveal than KO players. PROJECT_CONTROL_TOWER design decision needed (extend validator to honor channel-stage matrix per disclosure-policy.md §3.3, or accept locale-side hardening for v1 ship).

**Recommended sequencing**:
1. Commit current Tier A infra (KO phase1 edit + 3 locale sidecars + scriptLocale + validators + localePolicy schema) as one landing commit.
2. Apply 3 P1 scaffold extractor fixes (`choices`/`options` reconciliation + `caseId` mismatch + `surfaceClaim` source decision) — Codex 1-day work.
3. EN polish pass on spouse-01 high-volume channels (interrogation + interrogation_answers) to break template monotony — mandatory before family-01.
4. Aftermath/dossier/witness validator gating decision (P1) — optional for v1 ship; recommended for narrative parity.
5. Run family-01 + friend-01 pilots reusing EN's tmp/build-en-st-*.cjs templates with rotation enforcement.

If steps 1-3 land → family-01 + friend-01 expansion is GO.
If step 3 deferred → CONDITIONAL becomes NO-GO (template monotony will dominate ship quality).

---

## 2. Inputs reviewed

| Input | Status |
|---|---|
| `docs/localization/threads/script-24-claudecode-spouse-01-pilot-review.md` (brief) | ✅ read |
| `docs/localization/threads/outputs/script-thread-21-en-spouse-01-pilot/SUMMARY.md` | ✅ read in full |
| `docs/localization/threads/outputs/script-thread-22-ja-spouse-01-pilot/SUMMARY.md` | ✅ read in full |
| `docs/localization/threads/outputs/script-thread-23-zh-cn-spouse-01-pilot/SUMMARY.md` | ✅ read in full |
| `docs/localization/glossary.csv` (139 terms) | ✅ |
| `docs/localization/script-glossary.csv` | ✅ |
| `docs/localization/style-guide.md` | ✅ |
| `docs/localization/script-localization-decisions.md` | ✅ |
| `docs/localization/threads/outputs/recheck-thread-05-v4/SUMMARY.md` | ✅ |
| `src/data/disclosurePolicy/spouse-01.json` (1,798 lines incl. localePolicy block) | ✅ |
| Independent validator runs + forbidden-lexeme audits + spot-checks | ✅ executed (this thread) |

---

## 3. Validator results (executed by this thread)

| Run | Result |
|---|---|
| `npm run localization:scripts:validate` (all 3 locales) | ✅ PASS — `policies=3, sidecars=21, strings=144,918, locales=en,ja,zh-CN, strict=no` |
| `npm run localization:glossary` | ✅ PASS — `139 terms, brand guard ok 83 files` |
| `npm run check:policy -- --locale=en` | ✅ PASS — `45 cases locale=en` |
| `npm run check:policy -- --locale=ja` | ✅ PASS — `45 cases locale=ja` |
| `npm run check:policy -- --locale=zh-CN` | ✅ PASS — `45 cases locale=zh-CN` |
| `npm run localization:scripts:validate -- --strict` | ⚠ 42 errors — **ALL** missing-sidecar errors for family-01 + friend-01 (out of pilot scope per brief). **Zero spouse-01 errors in strict mode.** |
| `npm run build:pc` | not executed by this thread (gated by lengthy TypeScript type-check; sidecars don't modify TS source so build risk is zero unless a runtime-loader caller schema changed — JA + zh-CN reports note same) |

**Verdict**: spouse-01 pilot fully passes all required validators.

---

## 4. Independent forbidden-lexeme audit (executed by this thread)

Walked all 3 large surfaces × 3 locales with locale-specific truth lexeme list (EN: 12 / JA: 16 / zh-CN: 21 lexemes), gated by `entry.lieState`:

| Locale | Surface | non-S5 leaks | S5 licensed reveals |
|---|---|---:|---:|
| EN | scriptedText | **0** | 320 |
| EN | interrogation_answers | **0** | 1,670 |
| EN | judge_questions | **0** | 0 (surface-only channel — correct) |
| EN | phase1 + mediation + cases + angle_catalog (sweep) | **0** | (varies) |
| JA | scriptedText | **0** | 108 |
| JA | interrogation_answers | **0** | 1,380 |
| JA | judge_questions | **0** | 0 (surface-only — correct) |
| zh-CN | scriptedText | **0** | 90 |
| zh-CN | interrogation_answers | **0** | 1,200 |
| zh-CN | judge_questions | **0** | 0 (surface-only — correct) |

**Truth boundary integrity**: ✅ confirmed. Confessional truth lexemes appear ONLY where `entry.lieState === 'S5'` — the licensed reveal point per `disclosure-policy.md` §3.3.

**Brand guard sweep**: 0 occurrences of `Project Solomon` / `Solomon's Dilemma` / `Solomon Court` / `ソロモン法廷` / `所罗门` / `所羅門` across all 21 sidecars (7 surfaces × 3 locales).

---

## 5. Spot-check observations

### 5.1 S5 truth disclosure (must reveal)

| Locale | spouse-01 `b\|d-1\|S5\|fact_pursuit` v1 | Verdict |
|---|---|---|
| EN | `Your Honor, I was caring for my nephew at my older brother's studio apartment, and the late-night calls and receipts were tied to ...` | ✅ truth lexemes present (nephew + older brother) |
| JA | `あのオフィステルは兄が甥と暮らしていた場所です。仕事帰りに立ち寄り、子の世話と必要な雑事を整えていました。` | ✅ 兄/甥 present |
| zh-CN | `那栋公寓是哥哥和侄子住过的地方。下班后我会过去照看孩子,处理一些必要的事。` | ✅ 哥哥/侄子 present |

S5 reveals work correctly. Negative validator (truth MUST appear at S5) passes for all 3 locales.

### 5.2 S0 surface (no truth lexeme)

EN, JA, zh-CN all preserve surface vocabulary — `studio apartment` / `オフィステル` / `公寓` — and never name the resident at S0. Truth boundary holds at the lieState gate.

### 5.3 EN variant repetition (P1)

Sample of 5 spouse-01 interrogation entries:

| Entry | EN unique 60-char openers / 10 variants | JA / 30-char | zh-CN / 30-char |
|---|---|---|---|
| `a\|d-1\|S0\|fact_pursuit` | **1 / 10** | 3 / 10 | **10 / 10** |
| `a\|d-1\|S0\|motive_search` | **1 / 10** | 3 / 10 | 9 / 10 |
| `a\|d-1\|S0\|empathy_approach` | **1 / 10** | 3 / 10 | 9 / 10 |
| `a\|d-1\|S1\|fact_pursuit` | **1 / 10** | 6 / 10 | 9 / 10 |
| `a\|d-1\|S1\|motive_search` | **1 / 10** | 6 / 10 | 9 / 10 |

EN sample spread: all 10 variants of `a|d-1|S0|fact_pursuit` start with identical `Your Honor, the records I gathered keep pointing to the same building, the same hours, and items that are not mine. I am not making any of this up.` Only 3rd sentence rotates. KO source hand-writes 10 distinct beats per entry.

### 5.4 Aftermath truth disclosure parity (P1 design gap)

KO `aftermath` v1: `이준호의 숨김이 가벼운 잘못은 아니었지만, 재판관은 위임장 조작과 투자 사기 송금을 더 무겁게 보았다. 이준호는 형과 조카 이야기를 더는 숨기지 않겠다고 했고`

Locale equivalents (paraphrase to surface):
- EN: `Lee Jun-ho's concealment was not a light fault, but the judge weigh...` (ends mid-sentence in spot-check truncation, full content uses `family matter` style surface vocab)
- JA: `家族の事情を黙っていたことは軽い過ちではなかったが、裁판관은 書類の細工と金銭の流出をより重く見た` (paraphrases 위임장 조작 → 書類の細工; 형/조카 → 家族の事情)
- zh-CN: `李俊昊表示不会再隐瞒相关家人和那个孩子的事` (paraphrases 형/조카 → 相关家人和那个孩子; 위임장 조작 → 文件处理上的疑点)

**Result**: KO player learns the full truth in post-verdict aftermath; locale player gets only paraphrased surface. Per `disclosure-policy.md` §2.4 aftermath = post-verdict free disclosure — both should mirror. Validator's lieState-only gate forces softening across all 3 locales.

Same pattern in dossier-late, witness depth=full, evidence_present lieBand=late, contradiction_pursuit lieBand=late, emotional_overload S4+, judge_*-postS5 channels.

### 5.5 v3 P0 phase1 KO line review (RESOLVED)

`git diff src/data/dialogues/phase1/spouse-01.json` shows two line edits per v3 P0 finding:

- Line 130: `부모님 재산을 형이 다 날린` → `큰돈이 얽힌 집안 문제`
- Line 286: `당신 형님?` → `어머님 쪽 일인가요?`

All 3 locale sidecars cleanly translate the new KO state — 0 lines mention 형/兄/哥/brother in phase1. Disclosure-policy author / CT-Main approved edit. **NOT a brief violation** ("Korean source files modified without approval") because edit chain is documented and approved.

---

## 6. Coverage matrix snapshot

| Surface | EN | JA | zh-CN |
|---|---:|---:|---:|
| scriptedText (4,677 variants × 18 channels) | 100% | 100% | 100% |
| scriptedAngles judge_questions (660) | 100% | 100% | 100% |
| scriptedAngles interrogation_answers (7,920) | 100% | 100% | 100% |
| scriptedAngles angle_catalog (44) | 100% | 100% | 100% |
| dialogues/phase1 (29 non-choice + 9 choices) | 93% (40/43) | 100% | 100% non-choice, 0% choices (schema mismatch) |
| dialogues/mediation (10) | 100% | 100% | 100% |
| cases/generated (29 surface fields) | 86% (25/29 — 4 surfaceClaim no-source) | 100% | 100% |
| **Total in-scope** | **99.95%** (13,376 / 13,383) | **100%** (13,374) | **100%** (13,379) |

EN 7-string gap is 100% structural artifact: 4 surfaceClaim fields where KO source has no value + 3 phase1 choice-node `text` empty in KO source. **NOT a translation gap.**

zh-CN phase1 choice options blocked by `choices[]` vs `options[]` schema mismatch (P1).

Full coverage details in [PILOT_COVERAGE_MATRIX.csv](docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_COVERAGE_MATRIX.csv).

---

## 7. Findings priority breakdown

| Priority | Count | Sample |
|---|---:|---|
| P0 | 0 | (no blockers — pilot has cleared all gating thresholds) |
| P1 | 9 | EN variant variety / non-lieState channel softening / phase1 schema mismatch / scaffold caseId / scaffold surfaceClaim / special_scripts schema gap / EN substring brittleness / EN aftermath softening / 3-way validator gap |
| P2 | 8 | JA `外遇`/`浮気`/`不倫` consistency / JA mixed numeric form / JA witness w-3 name / zh-CN `委任书`/`委托书` / zh-CN `公寓` nuance / EN interrogation_answers template repetition / variation algorithm drift / `localization:scripts:validate` not in `check:all` |
| INFO | 4 | Tier B behaviorHint deferred / strict mode scoped to spouse-01 / KO source phase1 edit (intentional) / build script catalog under tmp/ |

Full detail in [PILOT_REVIEW_FINDINGS.csv](docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/PILOT_REVIEW_FINDINGS.csv).

---

## 8. Output files in this thread

```
docs/localization/threads/outputs/script-thread-24-spouse-01-pilot-review/
  PILOT_REVIEW_FINDINGS.csv         # 21 rows (0 P0 / 9 P1 / 8 P2 / 4 INFO)
  PILOT_COVERAGE_MATRIX.csv         # 13 rows — surface × 3 locale × coverage
  PILOT_GLOSSARY_DELTAS.csv         # 50 rows — term × locale × pilot-vs-glossary deltas
  PILOT_DISCLOSURE_BOUNDARY_CHECK.csv # 41 rows — brand guard + truth boundary + S5 disclosure + design-gap audits
  SUMMARY.md                        # this file
```

No `src/data/**` writes by this thread.

---

## 9. Decisions needed from PROJECT_CONTROL_TOWER

### Tier 1 — must clear before family-01/friend-01 expansion

1. **Aftermath/dossier-late/witness-full/etc. truth-stage gating** (P1) — extend validator to honor channel-stage matrix per disclosure-policy.md §3.3, OR accept locale-side hardening for v1.
2. **EN polish pass mandate** (P1) — gate EN family-01/friend-01 on opener+closer rotation enforcement (3+ unique anchors per bucket).
3. **Scaffold extractor 3 fixes** (P1) — `choices`/`options` reconciliation + `caseId` no-prefix + `surfaceClaim` source decision (drop or author KO).

### Tier 2 — recommended before strict-mode promotion in `check:rc`

4. **`special_scripts` overlay schema** (P1) — accept v1 minimal scope OR define per-bucket overlay shape.
5. **EN forbidden-lexeme word-boundary regex** (P1) — `\bbrother\b` style + per-channel allowlist before friend-01 (paraphrase-heavy lexemes per disclosure-policy.md §4.3).
6. **`localization:scripts:validate` integration into `check:all`** (P2) — after family-01/friend-01 sidecars land (or accept missing-sidecar warnings as informational).

### Tier 3 — quality polish (post-bulk; native review domain)

7. JA `外遇`/`浮気`/`不倫` consistency.
8. JA numeric form `三千万ウォン` vs `3,000万ウォン` normalization.
9. JA witness w-3 name `相談者` vs `パク・ミラ`.
10. zh-CN `委任书` → `委托书` normalization.
11. zh-CN `公寓` nuance refinement in evidence.surfaceDescription.
12. Tier B behaviorHint activation plan (per locked decision #5).

---

## 10. Family-01 / Friend-01 expansion plan

If the recommended sequencing in §1 is followed, family-01 + friend-01 expansion can proceed with these constraints:

1. **family-01 first** — highest paraphrase density (14 P1 zh-CN paraphrase findings vs spouse's 1 per disclosure-policy.md §4.2). Block bulk family-01 zh-CN until per-locale paraphrase blocklist authored in `disclosurePolicy/family-01.json` `localePolicy.zh-CN.paraphraseLexemes`.
2. **friend-01 second** — 4-5 zh-CN paraphrase variants per disclosure-policy.md §4.3.
3. **Reuse EN tmp/build-en-st-*.cjs** templates as starting points; per-case truth tables and entry counts will need fresh dictionaries.
4. **Sub-agent prompt mandate**: "build a Node script that emits the partial JSON; do NOT inline-translate variant by variant" — per EN stall pattern documented in script-thread-21 SUMMARY. Plus opener+closer+middle rotation across 3+ anchors per bucket.
5. **Validator+brand guard+forbidden-lexeme audit** must run between batches per case.
6. **`--strict` becomes appropriate** after family-01 + friend-01 land.

---

## 11. Final reminder honored

- This thread did not edit `src/data/**`. Working-tree changes were the v3 P0 KO phase1 edit (approved) + Codex Tier A infra (intentional). NOT this thread's output.
- This thread did not perform full bulk translation.
- This thread produced only review artefacts (5 files in this output directory).
- All findings are referenced to specific intake rows / file paths / decision rows for traceability.

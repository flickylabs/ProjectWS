# SCRIPT_JA Intake — Summary

**Thread**: `docs/localization/threads/script-02-claudecode-ja-script-intake.md`
**Target locale**: `ja`
**Pass**: intake + pilot only — no `src/data/**` writes, no bulk translation
**Date**: 2026-05-06
**Author**: ClaudeCode (script-thread-02)

---

## Files Inspected

Required references (read fully):
- `docs/localization/glossary.csv` (138 rows, locked + draft + needs-rework)
- `docs/localization/style-guide.md`
- `docs/disclosure-policy.md` (v1.1 + §13 audit pattern)
- `docs/information-surface-policy.md` (v1.1)
- `src/types/scriptedText.ts`
- `src/types/scriptedAngleText.ts`
- `src/types/dialogue.ts`
- `src/i18n/messages/common.ts`
- `src/i18n/messages/court.ts`
- `src/i18n/messages/verdict.ts`

Script surfaces inspected:
- `src/data/scriptedText/{spouse-01, family-01, friend-01}.json` (3 active × ~9–10 MB each)
- `src/data/scriptedAngles/{angle_catalog, judge_questions, interrogation_answers, special_scripts}.json` per active case
- `src/data/scriptedAngles/free_interrogation_*` (test/policy)
- `src/data/dialogues/phase1/{spouse-01, family-01, friend-01}.json` + `generic-phase1.ts`
- `src/data/dialogues/mediation/spouse-v3-01.json` (active spouse mediation; 122 other files identified as legacy)
- `src/data/dialogues/mediationScriptLoader.ts`
- `src/data/cases/generated/spouse-01.json`
- `src/data/cases/refined/spouse-01_texts.json` (confirmed legacy / not consumed at runtime via grep on `src/`)
- `src/data/witnessTestimonyData/spouse-01.ts`
- `src/data/{evidencePresentationScripts, confessionScripts, combinationComments}.ts`
- `src/data/legacy/dialogues/{phase1, phase2, phase3-5}.ts`

---

## Cases Found

**Active (per memory `project_active_cases.md` + repo evidence)**: 3 cases — `spouse-01`, `family-01`, `friend-01`.

**Legacy / non-authoritative**:
- `cases/refined/*_texts.json` — older 280만원/돌봄센터 storyline; 0 runtime references in `src/`
- `dialogues/mediation/*` — 120 files for inactive case IDs (civic-new-*, family-new-*, neighbor-*, online-*, partnership-*, professional-*, tenant-*, workplace-*, headline-*, plus older spouse-{05,11,12,new-*,v2-01} etc.)
- `legacy/dialogues/*.ts`

Pilot case selected per thread spec: **`spouse-01`**.

---

## Estimated Volume (Order-of-Magnitude)

Active surfaces requiring JA translation, approximate variant counts:

| Surface | Per-case items | Active total (3 cases) |
|---|---|---|
| scriptedText (interrogation/evidence_present/dossier/witness/aftermath/system_message + 11 extended channels) | ~5,000 variants | **~14,931** (matches memory estimate) |
| scriptedAngles interrogation_answers | ~8,000–10,000 variants | ~24,000–30,000 |
| scriptedAngles judge_questions | ~600–800 variants | ~1,800–2,400 |
| scriptedAngles angle_catalog + special_scripts | ~400–600 entries | ~1,200–1,800 |
| dialogues/phase1/*.json | ~40–60 lines | ~150 |
| dialogues/mediation (active 3 only) | ~10–20 lines per path × 4 paths | ~40 lines |
| cases/generated (player-visible leaves) | ~400–700 strings | ~1,500–2,000 |
| witnessTestimonyData | ~150–250 testimony slots | ~600 |
| evidencePresentationScripts.ts | (single file, 3 cases) | ~600–900 strings |
| confessionScripts.ts | ~10 entries × 3 strings | ~90 strings |
| combinationComments.ts | ~30 entries | 30 |

**Order-of-magnitude total for active 3-case JA pass**: ~50,000+ translation units across 7 surface types (interrogation alone is the dominant share).

`behaviorHint` strings (stage directions, not displayed) approximately double the visible-text count if translated. Plan recommends KO-fallback acceptable for v1 release.

See `SCRIPT_SURFACE_INVENTORY.csv` for per-file breakdown.

---

## Pilot Samples Completed (spouse-01)

All 8 thread-spec sample slots delivered in `PILOT_TRANSLATION_SAMPLES.json`:

| # | Sample type | Source path | Key/Channel | Variants translated |
|---|---|---|---|---|
| 1 | interrogation | `scriptedText/spouse-01.json` | `a\|d-1\|S0\|fact_pursuit` | 3 of 10 |
| 2 | evidence_present | `scriptedText/spouse-01.json` | `b\|e-1\|early\|self` | 3 of 10 |
| 3 | witness | `scriptedText/spouse-01.json` | `w-1\|vague` | 3 of 10 |
| 4 | system_message | `scriptedText/spouse-01.json` | `interrogation\|repeat_warning` | 3 of 5 |
| 5 | judge_question | `scriptedAngles/spouse-01_judge_questions.json` | `d-1 / fact_pursuit / b / general` | 3 of 5 |
| 6 | interrogation_answer | `scriptedAngles/spouse-01_interrogation_answers.json` | `b\|d-1\|S0\|fact_pursuit\|general` | 3 of 10 |
| 7 | phase1 dialogue | `dialogues/phase1/spouse-01.json` | (4 representative entries: system intro / A opening / choice c1 / B branch) | 4 entries |
| 8 | mediation dialogue | `dialogues/mediation/spouse-v3-01.json` | `paths.conditional` (judge + 2 dialogues) | 3 entries |

Each sample preserves IDs / keys / channel / lieState / disputeId / tags / sourceRefs bit-identical to KO; only `text` and (where translated) `behaviorHint` are JA. Truth-boundary justification documented per sample.

---

## Major Glossary Risks

(See `SCRIPT_GLOSSARY_CANDIDATES.csv` for full list. Highlights:)

**Critical risk** (P0 — JA paraphrase set must be added to `disclosure-policy.md` before bulk pass):
- `가족 사정` → `家族の事情` — already on KO forbidden-paraphrase list; JA literal inherits the leak risk
- `가족을 돌본` → `家族の世話` — same
- `형 빚` → `兄の借金` / `身内の借金` — must NEVER appear in surface channels
- `친형` → `実の兄` / `조카` → `甥` / `중2` → `中学2年生` — S5-confession only
- `위임장 조작` → `委任状の偽造`, `투자 사기` → `投資詐欺` — S5-only

**Medium risk** (loanwords / register choices):
- `오피스텔` → `オフィステル` (KEEP; standard JA loanword for the Korean concept)
- `편의점/서점` → `コンビニ/書店` — `書店` may telegraph `학용품/school supplies` truth earlier in JA than KO; flagged
- `자기야` → `あなた` (intimate accusatory vocative); requires native review
- `공동 적금` → `共同貯蓄` (no exact JA equivalent for `적금`; chose compact form)
- Currency: keep `ウォン`, never convert to yen

**Glossary needs_decision items** (already flagged in `glossary.csv`):
- `체념` → `諦観` vs `諦め` (emotion_resigned)
- `신뢰함 / 경계함 / 의심함` → trust state labels
- `엄격` vs `엄정` axis pole vs fragment_severity collision (KO cleanup pending)

---

## Blocking Questions Before Full Translation

These are the P0 blockers from `IMPLEMENTATION_NOTES_FOR_CODEX.md` §4 + `TEXT_FIELD_EXTRACTION_PLAN.md` §9 — must resolve before JA bulk pass:

1. **Storage architecture (Option A sibling files vs Option C parallel tree)** — needs PROJECT_CONTROL_TOWER decision.
2. **JA forbidden-lexeme + paraphrase set in `disclosure-policy.md`** — needs CT extension. Tier 3 guard cannot detect JA leaks until this lands.
3. **`behaviorHint` translation policy for v1 release** — translate fully (cost ~doubles) or accept KO fallback for stage directions?
4. **`dialogues/phase1/spouse-01.json` line referencing `형이 부모님 재산을 다 날린`** — JA literal would conflate with hidden truth. Requires a CT/policy review of the KO line itself before JA pass starts.
5. **`cases/refined/*_texts.json` legacy storyline** — confirmed safe to skip for JA?
6. **`dialogues/mediation/` ~120 inactive-case files** — skip JA (KO leakage if ever invoked) or stub-translate?
7. **Loader extension scope** — which loaders absolutely need locale fallback for v1: just the 3 active cases' bundles, or every glob target?

---

## Outputs Delivered (this thread)

All under `docs/localization/threads/outputs/script-thread-02-ja-intake/`:

- `SCRIPT_SURFACE_INVENTORY.csv` — 40+ rows, every active and legacy surface
- `TEXT_FIELD_EXTRACTION_PLAN.md` — translation-unit boundary, recommended Option A storage, ID/reference integrity rules
- `SCRIPT_GLOSSARY_CANDIDATES.csv` — 70+ rows (matches/extends/conflicts/new_script_term/needs_decision)
- `PILOT_TRANSLATION_SAMPLES.json` — 8 sample slots × representative variants for `spouse-01`
- `TRUTH_BOUNDARY_RISKS.csv` — 12 flagged surfaces (3 critical, 4 medium, 5 low)
- `IMPLEMENTATION_NOTES_FOR_CODEX.md` — loader architecture, validator design, bulk-translation pipeline, sequence
- `SUMMARY.md` (this file)

No `src/data/**` files were written or modified.

# Script Localization — Implementation Plan for Codex (PROJECT_CONTROL_TOWER)

**Author**: ClaudeCode CT (Thread-04 Script Localization Review)
**Date**: 2026-05-06
**Inputs**: SCRIPT_EN / JA / ZH-CN intake outputs + UI restart-thread-05 consistency findings + this thread's review tables
**Status**: Review pass only. No `src/data/**` writes by this thread. This document is the staged plan PROJECT_CONTROL_TOWER hands to Codex.

---

## Executive sequencing

The order of operations is NOT optional. Three constraints force it:

1. Truth-boundary safety — locale paraphrase guards must exist BEFORE any locale text lands.
2. Storage architecture — single decision shared by EN / JA / zh-CN before any sidecar file is created.
3. Baseline anchor preservation — `baseline-pre-policy-v3` must not regress; KO source files cannot be mutated.

Net implication: **Stage 1 (architecture) → Stage 2 (extraction/validation) → Stage 3 (glossary) → Stage 4 (translation batching) → Stage 5 (QA/build)**. No stage can run in parallel with the next without the prior stage's artefacts in place.

---

## Stage 1 — Script localization architecture (1–2 days, blocks everything)

### 1.1 Storage architecture decision (P0)

**Decision** (PROJECT_CONTROL_TOWER): adopt **sibling locale files** alongside KO source. EN intake and JA intake both recommend this; zh-CN proposed an alternative parallel tree but accepts sibling-file pattern.

```
src/data/scriptedText/
  spouse-01.json          # KO source (current, unchanged)
  spouse-01.en.json       # EN overlay (NEW)
  spouse-01.ja.json       # JA overlay (NEW)
  spouse-01.zh-CN.json    # zh-CN overlay (NEW)

src/data/scriptedAngles/
  spouse-01_angle_catalog.json        # KO
  spouse-01_angle_catalog.en.json     # EN, JA, zh-CN siblings
  spouse-01_judge_questions.json + .en/.ja/.zh-CN.json
  spouse-01_interrogation_answers.json + .en/.ja/.zh-CN.json
  spouse-01_special_scripts.json + .en/.ja/.zh-CN.json

src/data/dialogues/phase1/
  spouse-01.json + .en/.ja/.zh-CN.json
src/data/dialogues/mediation/
  spouse-v3-01.json + .en/.ja/.zh-CN.json
src/data/cases/generated/
  spouse-01.json + .en/.ja/.zh-CN.json (surface-fields-only overlay)
```

Why this pattern:
- 2-of-3 intake agreement.
- Minimal loader churn — each loader extends `import.meta.glob` pattern by one entry.
- Per-file diff KO ↔ locale stays adjacent to KO source.
- Matches existing `src/i18n/messages/*.ts` convention.

Each locale file contains ONLY the translatable fields plus IDs needed to match (`id`, `key`, `caseId`, `variant.id`, channel). Runtime loader merges KO source with locale overlay: if `(caseId, channel, variantId)` exists in locale file, replace `variant.text`; otherwise fall back to KO.

### 1.2 `behaviorHint` policy decision (P0)

Codex audit FIRST:
```bash
grep -rn "behaviorHint" src/engine src/components src/hooks src/utils
```
- If runtime consumer found (LLM prompt / fallback resolver) → translate per locale.
- If only writer/dev tooling → lock as KO across all locales.

**Recommended**: KO-only across all locales (matches EN intake default). Cuts bulk volume ~50% per locale.

### 1.3 `truthBoundary.beforeS5MustNotSay` / `s5CanSay` policy decision (P0)

Lock as KO-only for v1. Mirror per locale only when Tier 3 LLM Guard runs locale-side.

### 1.4 `evidence.name` (truth) vs `evidence.surfaceName` (UI) decision (P0)

**Recommended (a)**: translate ONLY `surfaceName` per locale. Skip `evidence.name`. Engine reads KO `evidence.name` for internal decisions; UI reads locale `surfaceName`. Lowest leak risk, simplest validator.

If Tier 3 LLM Guard ever runs locale-side, escalate to (b): translate both with field-level audit (validator fails if `name == surfaceName`, fails if any UI component reads `.name`).

### 1.5 Tag-side address forms decision (P0)

Tag values stay KO as runtime control signals. Locale-side rendering pulls from a new `src/i18n/messages/scripts.ts` map keyed on the KO tag value. No mutation of 14,931 tag-values.

### 1.6 Loader extension scope

Codex extend these loaders to take `locale: LocaleCode` argument and merge KO + locale overlay:

- `src/engine/scriptedTextLoader.ts` — `bundleCache` becomes `Map<{caseId, locale}, ScriptedTextBundle>`
- `src/engine/scriptedAngleTextLoader.ts`
- `src/data/dialogues/phaseScriptLoader.ts`
- `src/data/dialogues/mediationScriptLoader.ts` — versioned-alias rule preserved
- `src/data/cases/caseLoader.ts`
- `src/data/witnessTestimonyData/{case}.ts` (after Stage 2.4 migration)
- `src/data/evidencePresentationScripts.ts` (after Stage 2.4 migration)
- `src/data/confessionScripts.ts` (after Stage 2.4 migration)
- `src/data/combinationComments.ts` (after Stage 2.4 migration)

Loader contract: missing locale entry → silent fallback to KO. Validator (Stage 2.2) reports gaps.

### 1.7 Active mediation alias confirmation

Codex one-line grep: confirm `mediationScriptLoader.ts` versioned-alias map for all 3 active cases.

```bash
grep -n "v3-01" src/data/dialogues/mediationScriptLoader.ts
```

Expected: `spouse-01 → spouse-v3-01.json`. Verify family-01 and friend-01 mediation aliases (zh-CN intake inferred but did not confirm).

---

## Stage 2 — Extraction & validation tooling (2–3 days, runs after Stage 1)

### 2.1 KO-source extraction script

`scripts/extract-script-text.cjs`:
- Walks `src/data/scriptedText/{caseId}.json`, `scriptedAngles/{caseId}_*.json`, `dialogues/phase1/{caseId}.json`, `dialogues/mediation/{caseId}-v3-01.json`, `cases/generated/{caseId}.json` (surface fields only).
- Emits per-locale bootstrap JSON sidecars with empty `text` strings: `{ id, key, caseId, channel, ... , text: "" }`.
- Output target: `tmp/locale-bootstrap/{locale}/...` (NOT directly in `src/data/`).
- Provides translation queue CSV for Codex / translator handoff.

Run order: spouse-01 → family-01 → friend-01 per case. Per locale.

### 2.2 Per-locale validator

`scripts/validate-script-locale.cjs`:
- For every variant `id` in KO source, locale file must have matching `id` with non-empty `text`.
- Locale file must NOT introduce new `id` not in KO source.
- Schema parity check: same channels, same dispute IDs, same lieState/lieBand/questionType enum values.
- For surface-only channels (`judge_question` / `judge_contradiction` / `judge_evidence_combo` / `judge_witness_summon` / `system_message` / `dossier`-안내): locale `text` must NOT contain any locale forbidden lexeme.
- For S5 confession channel: locale `text` MUST contain locale truth lexeme (negative validator — reveal must happen).
- For `evidence.name` vs `surfaceName` field pairs: must produce two distinct locale strings (validator fails if `name == surfaceName`).

Add to `npm run check:policy` as `npm run check:policy --locale=<code>`. Default locale=ko (existing behaviour).

### 2.3 ID-stability CI check

Mirror `scripts/qa-free-interrogation-policy.mjs` pattern:
- Hooked into `qa:fast`.
- Walks all locale sidecars under `src/data/**/*.{en,ja,zh-CN}.json`.
- Reports orphan IDs (locale entry without KO source) as ERROR.
- Reports gap IDs (KO source without locale entry) as WARNING during incremental work; ERROR after locale sign-off per case.

### 2.4 TS-module migration to JSON sidecars

Migrate 4 modules BEFORE bulk locale work (per SCRIPT_REVIEW_FINDINGS P0 row):

```
src/data/witnessTestimonyData/spouse-01.ts          → spouse-01.ko.json + thin TS loader
src/data/witnessTestimonyData/family-01.ts          → family-01.ko.json + thin TS loader
src/data/witnessTestimonyData/friend-01.ts          → friend-01.ko.json + thin TS loader
src/data/evidencePresentationScripts.ts             → evidencePresentationScripts.ko.json + thin TS loader
src/data/confessionScripts.ts                       → confessionScripts.ko.json + thin TS loader
src/data/combinationComments.ts                     → combinationComments.ko.json + thin TS loader
```

Migration constraints:
- Exported function signatures unchanged. Callers untouched.
- KO content bytes preserved (validator: `git diff --stat` of post-migration `*.ko.json` ↔ pre-migration TS literal must match line-by-line).
- Baseline anchor `baseline-pre-policy-v3` not affected (KO content stays canonical).
- After migration, locale sidecars `*.en.json` / `*.ja.json` / `*.zh-CN.json` follow same overlay pattern.

`confessionScripts` validator extension: locale file MUST contain locale-equivalent of KO truth lexemes per case (S5 reveal preservation).

### 2.5 Active mediation v3-01 alias confirmation tooling

Add to validator: confirm only `spouse-v3-01.json` / `family-v3-01.json` / `friend-v3-01.json` (and their locale siblings) are eligible for translation. All other 120+ mediation files = `exclude_legacy` (never produce locale sidecar).

---

## Stage 3 — Glossary & disclosure-policy locale extension (3–5 days)

### 3.1 `disclosurePolicy/{caseId}.json` schema extension (P0 — blocks all bulk)

Codex schema decision + content authoring per case:

```jsonc
{
  "caseId": "spouse-01",
  "version": "v2",
  "globalTruthLexemes": {
    "ko": ["형", "친형", "조카", ...],   // existing
    "en": ["brother", "older brother", "my brother", "nephew", "niece", ...],   // NEW
    "ja": ["兄", "実の兄", "甥", "中学2年生", ...],   // NEW
    "zh-CN": ["哥", "亲哥", "侄子", "初二", "中学二年级", ...]   // NEW
  },
  "paraphraseLexemes": {
    "ko": [...],
    "en": ["family matter", "blood relation", "things uncle picks up", ...],
    "ja": ["家族の事情", "身内", ...],
    "zh-CN": ["家里的事情", "家人", ...]
  },
  "uiSurfaceMap": {
    "ko": [...],
    "en": [{"path": "combinationLab.outputs.dc-2.judgeHint", "actual": "...", "surface": "..."}],
    "ja": [...],
    "zh-CN": [...]
  },
  "channelGate": {
    "judge_question": "surface_only_forever",
    "system_message": "surface_only_forever",
    ...
  }
}
```

Authoring guide:
- Cross-walk SCRIPT_GLOSSARY_CONFLICTS.csv `blocks_bulk_translation=yes` rows (spouse `형 / 조카 / 위임장` etc.; family `유서·20년·60대40·출생비밀`; friend `선을 넘는·아버지 사기·반복 패턴`) into per-locale forbidden block.
- Cross-walk disclosure-policy.md §4.1/§4.2/§4.3 paraphrase set into per-locale paraphrase block (translator examples in `SCRIPT_GLOSSARY_CONFLICTS.csv`).
- Cross-walk disclosure-policy.md §4.x uiSurfaceMap surface texts into per-locale `uiSurfaceMap` block.

### 3.2 `glossary.csv` script-vocabulary extensions

Add rows to `docs/localization/glossary.csv` (or new appendix `docs/localization/script-glossary.csv`):

| Term family | Per-locale rows to add |
|---|---|
| Vocative `재판관님` | EN `Your Honor` (locked); JA + zh-CN reuse existing `裁判官` |
| `자기야` | EN `Honey` (locked); JA `あなた` (native review); zh-CN PCT decision (`亲爱的` recommended) |
| Per-case relationship vocatives | spouse `남편/아내`; family `형/동생`; friend `친구` per locale |
| NPC name transliteration | All 7 active NPCs × 3 locales (per SCRIPT_GLOSSARY_CONFLICTS row) |
| Honorific `씨` | EN `Mr./Mrs./Ms.` + surname per character; JA `さん` direct; zh-CN `先生/女士` per character |
| `오피스텔` | locked per locale |
| Currency `원/만원` | locked per locale (no auto-conversion) |
| `late-night call` | locked per locale per case (KO `새벽` ≈ 02:00–06:00) |
| Evidence surfaceName labels | Per case e-1 ~ e-7 surfaceName locked per locale |
| `시댁 갈등` | locked per locale |
| score_axis_* | promote EN `Insight/Authority/Wisdom` to draft; JA + zh-CN keep `needs-rework` |
| `체념` | promote `Resigned/諦観/认命` to draft (status update only) |
| `objection_bark` | reuse UI restart-05 P1 row |
| zh-CN `verdict` split note | add note to existing row (note only, no value change) |

Total new/updated rows: ~30–40.

### 3.3 phase1 `부모님 재산을 형이 ~` KO line decision (P0 — blocks JA/zh-CN phase1)

Disclosure-policy author + CT-Main review the KO line itself. Decision options documented in SCRIPT_REVIEW_FINDINGS P0 row. Block bulk JA/zh-CN phase1 until decided. EN should mirror chosen approach.

If KO retains line: add per-locale paraphrase whitelist for phase1 indices 14 + 31 (zh-CN) / equivalent (JA / EN) so guard wrappers do not flag the in-character A-accusation register while still blocking the lexeme in system_message / judge_question channels.

### 3.4 `cases/refined/*_texts.json` legacy disposal decision

Decision from PROJECT_CONTROL_TOWER: physical delete OR `_LEGACY_*` rename per memory `session_handoff_20260428_v3_correction.md` 84-건 격리 패턴. Translation = SKIP regardless of disposal decision (3-way intake agreement).

---

## Stage 4 — Translation batching (per-locale bulk pass; 2–6 weeks per locale)

### 4.1 Pilot wrapper-gated per-locale spouse-01 only

Run BEFORE full per-locale bulk. Per zh-CN intake recommendation: `spouse-01 only, scriptedText only` zh-CN translation pilot (~4,677 variants × 1 field text-only = ~4,677 strings) gated by Stage 2.2 wrapper. Same pilot for EN + JA.

Approval gate per locale: pilot validator passes 0 truth leaks + `qa:fast` green + samples re-review by reviewer.

### 4.2 Full bulk batching (per locale)

Order:
1. **Locale**: `en` first (smallest forbidden set, most established style guide). Then `ja`. Then `zh-CN` (highest paraphrase rigor required for family-01).
2. **Case**: spouse-01 → family-01 → friend-01.
3. **Channel** (per case + locale):
   - scriptedText interrogation
   - scriptedText evidence_present
   - scriptedText witness
   - scriptedText system_message
   - scriptedText aftermath / dossier / extended channels
   - scriptedAngles judge_questions
   - scriptedAngles interrogation_answers
   - scriptedAngles special_scripts (per-bucket schema audit first)
   - scriptedAngles angle_catalog (label + description; keywords[] decision per Stage 1)
   - dialogues/phase1/{case}.json (after P0 KO-line decision)
   - dialogues/mediation/{case}-v3-01.json
   - cases/generated/{case}.json (surface fields only per Stage 1.4)
   - witnessTestimonyData (after TS migration)
   - evidencePresentationScripts (after TS migration)
   - confessionScripts (after TS migration)
   - combinationComments (after TS migration)
4. **Batch size**: ≤ 5,000 strings per Codex submission. Run validator + `qa:fast` between batches. Baseline anchor regression check (KO source unchanged) between batches.

### 4.3 Volume budget (post Stage 1.2 behaviorHint=KO-only decision)

| Surface (per active case) | Strings per locale |
|---|---:|
| scriptedText (all channels) | ~5,000 |
| scriptedAngles judge_questions | ~660–780 |
| scriptedAngles interrogation_answers | ~7,920–9,360 |
| scriptedAngles special_scripts | ~270–360 |
| scriptedAngles angle_catalog | ~44–52 |
| phase1 | ~70 |
| mediation | ~15–20 |
| witnessTestimony | ~54–63 |
| evidencePresentationScripts (per-case slice) | ~85 |
| confessionScripts | ~12–15 |
| combinationComments | ~6–12 |
| cases/generated UI fields | ~150 |
| **Per case** | **~14,500** |
| **Per locale (active 3 cases)** | **~43,500** |
| **All 3 locales** | **~130,500** |

### 4.4 Active locale matrix (post-bulk)

| Surface | KO | EN | JA | zh-CN | Status |
|---|:-:|:-:|:-:|:-:|---|
| scriptedText spouse-01 / family-01 / friend-01 | ✅ source | sidecar | sidecar | sidecar | Bulk Stage 4.2 |
| scriptedAngles 12 files | ✅ source | sidecar | sidecar | sidecar | Bulk Stage 4.2 |
| phase1 active 3 | ✅ source | sidecar | sidecar | sidecar | Block until P0 KO-line decision |
| mediation v3-01 active 3 | ✅ source | sidecar | sidecar | sidecar | Bulk Stage 4.2 |
| cases/generated active 3 | ✅ source | overlay (surface only) | overlay | overlay | Bulk Stage 4.2 |
| TS modules → JSON | ✅ migrated | sidecar | sidecar | sidecar | Block until Stage 2.4 migration |
| disclosurePolicy/{case}.json | ✅ KO blocks | EN block | JA block | zh-CN block | Block all bulk until Stage 3.1 |
| free_interrogation_* | ✅ source | exclude | exclude | exclude | exclude_test_policy |
| cases/refined/*_texts.json | (legacy) | exclude | exclude | exclude | exclude_legacy + disposal decision |
| legacy/dialogues | (legacy) | exclude | exclude | exclude | exclude_legacy |

---

## Stage 5 — QA & build (per-locale; runs continuously through Stage 4)

### 5.1 Per-batch validation

After each Codex batch:
- `npm run check:policy --locale=<code>` (Stage 2.2 wrapper) — green required.
- `npm run qa:fast` — green.
- `tsc --noEmit` — green.
- Schema-parity validator (Stage 2.2 ID-stability) — green.
- `git diff src/data/**` excluding new `*.{en,ja,zh-CN}.json` files — must be empty (KO source untouched).

### 5.2 Per-case sign-off (after all channels translated for one case + locale)

- `npm run qa:deep` — green.
- `npm run qa:visual` — green (UI doesn't break under locale).
- `simulator.bat` (per memory `session_handoff_20260428_final_p0_closing.md` Steam release standard) — green per-locale playthrough.
- Reviewer pass: PILOT_SAMPLE_REVIEW.csv quality column ≥ `accepted_with_notes` for all sampled keys.
- spot-check 50 random variants per channel + lieState × locale = no truth leak / no register drift.

### 5.3 Per-locale release sign-off

- All 3 cases + all channels + all sidecars green Stage 5.1 + Stage 5.2.
- UI restart-thread-05 P0 8건 resolved (specifically `pcHomeShared.ts:134` i18n promotion + Settings categories + Verdict step labels + Hotbar slot labels).
- TS build (Vercel + Electron) green per locale.
- Steam Deck 1280×800 layout green per locale (per restart-thread-05 P1-22).
- Disclosure-policy locale block sign-off by CT-Main.

### 5.4 Build pipeline integration

Add per-locale matrix to existing `qa:fast / qa:deep / qa:visual` scripts. CI matrix expansion:
- KO-only path stays as the Tier 0 baseline (no regression vs `baseline-pre-policy-v3`).
- Per-locale path runs only when locale sidecar files present.

### 5.5 Tier 3 LLM Guard locale extension (post-release)

When Tier 3 LLM Guard runs locale-side:
- escalate `evidence.name` policy from skip-per-locale (Stage 1.4 option a) to mirror-per-locale (option b) with field-level audit.
- mirror `truthBoundary.beforeS5MustNotSay` / `s5CanSay` arrays per locale.
- per-locale `behaviorHint` if it consumes locale string.

Out of scope for v1 release. Tracked separately by Tier 3 schedule.

---

## Critical-path summary (decisions blocking bulk)

| # | Decision | Owner | Blocks |
|---:|---|---|---|
| 1 | Storage architecture = sibling files (Stage 1.1) | PROJECT_CONTROL_TOWER | All bulk |
| 2 | `behaviorHint` policy = KO-only (Stage 1.2) | Codex audit + PROJECT_CONTROL_TOWER | All bulk volume planning |
| 3 | `evidence.name` mirror policy = skip per locale (Stage 1.4) | PROJECT_CONTROL_TOWER | cases/generated bulk |
| 4 | Tag-side address rendering = i18n message map (Stage 1.5) | PROJECT_CONTROL_TOWER | scriptedText bulk |
| 5 | Loader extension scope (Stage 1.6) | Codex | All bulk |
| 6 | Mediation v3-01 alias confirmation (Stage 1.7) | Codex | mediation bulk |
| 7 | TS-module migration to JSON (Stage 2.4) | Codex | witness / evidence / confession / combination bulk |
| 8 | disclosurePolicy locale extension (Stage 3.1) | Codex | All bulk |
| 9 | Glossary script-vocab extension (Stage 3.2) | Codex | All bulk |
| 10 | phase1 KO-line decision (Stage 3.3) | Disclosure-policy author + CT-Main | phase1 bulk JA + zh-CN |
| 11 | check:policy --locale wrapper (Stage 2.2) | Codex | Validator gate for bulk |
| 12 | UI restart-05 P0 8건 resolution | UI Codex | EN script bulk register-coherence |

Decisions 1, 2, 3, 4, 6, 8, 9, 11 are PROJECT_CONTROL_TOWER's gating list. Decisions 5, 7 are Codex implementation. Decision 10 needs disclosure-policy author. Decision 12 is parallel UI work.

---

## Concrete next-step tasks Codex can pick up immediately

These are pre-decision tasks Codex can execute in parallel without waiting for PROJECT_CONTROL_TOWER:

1. `grep -rn "behaviorHint" src/engine src/components src/hooks src/utils` — input to Decision 2.
2. `grep -n "v3-01" src/data/dialogues/mediationScriptLoader.ts` — input to Decision 6.
3. `grep -rn "angles\[.*\]\.keywords" src/engine/freeInterrogation src/engine/contextMapper.ts` — input to keywords[] decision.
4. Author empty `disclosurePolicy/{caseId}.json` per-locale blocks (`forbiddenLexemes.{en,ja,zh-CN} = []`) so the wrapper extension (Decision 11) can run green even before content lands.
5. Schema design for `disclosurePolicy/{caseId}.json` v2 per Stage 3.1 — submit for sign-off.
6. `scripts/extract-script-text.cjs` skeleton (Stage 2.1) — runnable before Storage decision lands; emits to `tmp/`.

These six tasks unblock 80% of Stage 1 + Stage 2 once decisions 1–4 + 8 land.

---

## Out-of-scope for this implementation plan

- Bulk translation execution (Stage 4 lives entirely with translator + Codex review, not in this plan document).
- UI-side restart-thread-05 P0 8건 (separate UI Codex track).
- Tier 4+ runtime architecture (memory `feedback_static_analysis_limit.md` boundary).
- New cases beyond active 3 (out of scope per `project_active_cases.md`).
- `cases/refined/*_texts.json` content rewriting (PROJECT_CONTROL_TOWER decides disposal, not rewrite).

---

## References

- `docs/localization/threads/script-04-claudecode-script-localization-review.md` — review brief
- `docs/localization/threads/outputs/script-thread-{01-en,02-ja,03-zh-cn}-intake/` — intake outputs (this plan integrates them)
- `docs/localization/threads/outputs/restart-thread-05-consistency/CONSISTENCY_FINDINGS.csv` — UI cross-reference
- `docs/disclosure-policy.md` v1.1 + §13 audit pattern
- `docs/information-surface-policy.md` v1.1
- `docs/localization/glossary.csv`
- `src/types/scriptedText.ts` / `scriptedAngleText.ts` / `dialogue.ts`
- Memory: `project_active_cases`, `feedback_baseline_anchor_scripted_text`, `feedback_revision_meaning_over_form`, `feedback_truth_leak_prohibition`, `session_handoff_20260428_final_p0_closing`

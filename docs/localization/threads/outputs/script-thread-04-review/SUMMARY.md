# Thread-04 Script Localization Review — Summary

**Author**: ClaudeCode CT (Thread-04)
**Date**: 2026-05-06
**Brief**: `docs/localization/threads/script-04-claudecode-script-localization-review.md`
**Mode**: Review only. No `src/data/**` writes. No bulk translation.

---

## Inputs checked

| Source | Status |
|---|---|
| `docs/localization/threads/outputs/script-thread-01-en-intake/` (7 files) | ✅ all read |
| `docs/localization/threads/outputs/script-thread-02-ja-intake/` (7 files) | ✅ all read |
| `docs/localization/threads/outputs/script-thread-03-zh-cn-intake/` (7 files) | ✅ all read |
| `docs/localization/threads/outputs/restart-thread-05-consistency/CONSISTENCY_FINDINGS.csv` | ✅ cross-referenced (47 rows) |
| Reference docs (`glossary.csv`, `style-guide.md`, `disclosure-policy.md`, `information-surface-policy.md`, `src/types/{scriptedText,scriptedAngleText,dialogue}.ts`, `src/i18n/messages/*.ts`) | ✅ |

---

## Output files in this thread

```
docs/localization/threads/outputs/script-thread-04-review/
  SCRIPT_REVIEW_FINDINGS.csv               # 26 rows — P0/P1/P2 findings + recommendations
  AUTHORITATIVE_SURFACE_DECISION_TABLE.csv # 47 rows — every script surface classified
  SCRIPT_GLOSSARY_CONFLICTS.csv            # 47 rows — terms requiring cross-locale lock
  PILOT_SAMPLE_REVIEW.csv                  # 24 rows — 8 samples × 3 locales
  IMPLEMENTATION_PLAN_FOR_CODEX.md         # 5-stage plan w/ critical path table
  SUMMARY.md                               # this file
  _PREP_NOTES.md                           # earlier sub-thread prep notes (kept for traceability)
```

---

## P0 blockers (must clear before any locale bulk pass)

12-item gating list (full detail in `SCRIPT_REVIEW_FINDINGS.csv` + `IMPLEMENTATION_PLAN_FOR_CODEX.md` Stage 1–3):

1. **Storage architecture** — adopt sibling locale files (`<file>.<locale>.json` next to KO source). 2-of-3 intake agreement.
2. **`behaviorHint` policy** — Codex grep audit; recommend KO-only across all locales (cuts ~50% bulk volume).
3. **`disclosurePolicy/{caseId}.json` per-locale extension** — `forbiddenLexemes.{en,ja,zh-CN}` + `paraphraseLexemes.{en,ja,zh-CN}` + `surfaceMap.{en,ja,zh-CN}` blocks BEFORE bulk. All 3 intakes flagged this as their own top P0.
4. **`check:policy --locale=<code>` wrapper extension** — locale-aware; build wrapper FIRST then translate. Otherwise truth leaks slip past.
5. **`evidence.name` (truth) vs `surfaceName` (UI) policy** — recommend skip `evidence.name` per locale for v1; engine reads KO; lowest leak risk.
6. **Tag-side address rendering** — KO tag values stay; locale rendering via new `src/i18n/messages/scripts.ts` map. No mutation of 14,931 tag-values.
7. **TS-module migration to JSON sidecars** — `witnessTestimonyData/{case}.ts` + `evidencePresentationScripts.ts` + `confessionScripts.ts` + `combinationComments.ts`. Required before locale bulk.
8. **`pcHomeShared.ts:134` UI restart-05 P0** — KO Solomon literal must be promoted to i18n keys before EN script bulk to avoid surface mismatch.
9. **`uiSurfaceMap` per-locale equivalents** — locale-side authoring of disclosure-policy.md §4 surface forms required before bulk.
10. **Active mediation alias confirmation** — Codex one-line grep `mediationScriptLoader.ts` to confirm `spouse-01 → spouse-v3-01.json` + family/friend aliases.
11. **phase1 `부모님 재산을 형이 다 날린` KO line review** — JA + zh-CN flagged as critical; EN missed. Disclosure-policy author + CT-Main decide before bulk JA + zh-CN phase1.
12. **Active mediation file list confirmation** — only `spouse-v3-01.json` / `family-v3-01.json` / `friend-v3-01.json` are in scope; 120+ legacy mediation files = exclude.

---

## P1 blockers (should clear before bulk; can run parallel with P0)

22 rows in `SCRIPT_REVIEW_FINDINGS.csv`. Highlights:

- `cases/refined/*_texts.json` legacy disposal decision (3-way intake agreement: skip translation; PROJECT_CONTROL_TOWER decide physical delete vs `_LEGACY_*` rename per memory `session_handoff_20260428_v3_correction.md` 84-건 격리 패턴).
- `free_interrogation_*` test/policy fixtures = `exclude_test_policy` (3-way agreement).
- Vocative `재판관님` glossary lock missing for EN.
- Per-case relationship vocative + name transliteration tables (3 locales).
- Volume divergence (42K EN / 50K JA / 84K zh-CN) resolves once P0-2 behaviorHint policy locked.
- System-message length cap (`information-surface-policy.md` §6.3) needs per-locale relaxation for EN.
- EN forbidden-lexeme set must include both `nephew` and `niece` for gender-neutral KO `조카`.
- zh-CN paraphrase blocklist for family-01 has highest density (14 P1 zh-CN findings vs spouse's 1) — block bulk family-01 zh-CN until paraphrase blocklist authored.
- JA needs_decision rows (체념/신뢰함/엄격↔엄정).
- `angle_catalog.keywords[]` runtime semantics unknown — Codex grep needed.
- UI restart-thread-05 P0 8건 must clear before EN script bulk for surface coherence.

---

## Recommended authoritative surfaces (full table in `AUTHORITATIVE_SURFACE_DECISION_TABLE.csv`)

| Decision | Count | Surfaces |
|---|---:|---|
| `localize` | 30 | active 3 cases × scriptedText + scriptedAngles 4 files + phase1 + mediation v3-01 + cases/generated (surface fields only) |
| `exclude_legacy` | 8+ | `cases/refined/*_texts.json`, mediation 120+ inactive case files, legacy/dialogues/*, spouse-01_backup.json, spouse-v2-01.json, generic-phase1.ts |
| `exclude_test_policy` | 5 | `free_interrogation_{mapping_schema,response_policy,test_cases}.json` + `prompt_blocks.md` + `manifest.json` |
| `needs_codex_investigation` | 7 | TS modules (4) + `disclosurePolicy/{caseId}.json` + `keywords[]` + `truthBoundary` arrays + `i18n/messages/scripts.ts` (new) |
| `needs_user_decision` | 2 | `cases/generated.{caseId}.json — meta.anchorTruth, partyA/B.fear truth fields` (mirror per locale or skip?) + `behaviorHint` translation policy |

---

## Bulk translation GO/NO-GO

**Status**: NO-GO until all 12 P0 blockers cleared.

**After P0 + P1 cleared**: GO per locale, with these guardrails:
1. Stage 4.1 pilot wrapper-gated `spouse-01 only, scriptedText only` per locale (~4,677 strings) BEFORE full bulk.
2. Per-locale validator (`check:policy --locale=<code>`) green on pilot.
3. Reviewer pass on PILOT_SAMPLE_REVIEW.csv → all keys ≥ `accepted_with_notes`.
4. Full bulk per locale: en → ja → zh-CN. Per case: spouse-01 → family-01 → friend-01. Per channel batch ≤ 5,000 strings.

**Locale ordering rationale**:
- EN first: smallest forbidden set, most established style guide, EN intake had 7 fewer P0 blockers than zh-CN.
- JA second: confirmed paraphrase set authoring required + JA-only phase1 KO-line concern carries highest critical risk among locales.
- zh-CN last: 84K-string scope (largest if `behaviorHint` translated), highest paraphrase rigor required for family-01.

---

## Decisions needed from PROJECT_CONTROL_TOWER (before Codex starts)

8-item PROJECT_CONTROL_TOWER decision list (mirrors EN intake's 8 + JA's 7 + zh-CN's 8 — deduplicated):

1. **Storage architecture** = sibling locale files (recommended; 2-of-3 thread agreement).
2. **`behaviorHint` policy** = KO-only across all locales (recommended after Codex grep audit).
3. **`evidence.name` mirror policy** = skip per locale for v1 (recommended).
4. **Tag-side address rendering** = i18n message map (KO tag values stay) (recommended).
5. **TS-module migration to JSON sidecars** = approve migration path before locale bulk.
6. **disclosurePolicy locale extension schema** = approve schema design.
7. **phase1 `부모님 재산을 형이 다 날린` KO-line decision** = retain + lock per-locale paraphrase whitelist OR edit KO line OR add audit pass to `check:policy`.
8. **Glossary script-vocab extensions** = approve ~30–40 new/updated rows (vocatives + relationship terms + name transliterations + per-case lexicon).

Optional decisions (can land later):
- `cases/refined/*_texts.json` disposal (delete vs `_LEGACY_*` rename) — operational, not bulk-blocking.
- Bulk locale ordering (en → ja → zh-CN recommended; PCT may reorder for business reasons).
- behaviorHint runtime audit input (Codex grep result before final decision).
- mediation v3-01 alias confirmation (Codex grep before bulk).

---

## Decisions needed from disclosure-policy author / CT-Main

1. **phase1 `부모님 재산을 형이 다 날린` KO-line review** (P0). JA intake CRITICAL. zh-CN intake high. EN missed it. Coordinate with `docs/disclosure-policy.md` author.
2. **Per-case zh-CN paraphrase blocklist authoring rigor** — family-01 needs ≥ 14 paraphrase variants × 3 fields per zh-CN intake. friend-01 needs 4–5 paraphrase variants × 3 fields. spouse-01 mostly small.
3. **Per-locale `uiSurfaceMap` surface text authoring** — 3 cases × ~10 KO uiSurfaceMap rows × 3 locales = ~90 surface texts to author.
4. **Truth-channel mirror policy escalation trigger** — when does Tier 3 LLM Guard run locale-side? That triggers escalation from skip-`evidence.name` (Stage 1.4 option a) to mirror-with-audit (option b).

---

## Critical inter-thread cross-references

- **UI restart-thread-05 P0 8건** must clear before EN script bulk. Specifically: `pcHomeShared.ts:134` (KO Solomon literal in non-i18n path), Settings categories + About, Verdict step labels, Hotbar slot labels.
- **UI restart-thread-05 P1 zh-CN ~250 hardcoded strings** can run parallel with zh-CN script bulk (separate Codex tracks).
- **UI restart-thread-05 P1 zh-CN `verdict` 裁决 / 判决 split** — script translator must distinguish channel + tense.
- **UI restart-thread-05 P1 `objection` 3-tier (UI noun / button verb / spoken bark)** — script `objection_bark` channel routes through dialogue addDialogue → run `check:policy` after locale bulk.

---

## Confirmed-no-blocker items

These items were potential concerns in pre-prep but resolved by intake findings:

- **mediation spouse-01 active version** — confirmed `spouse-v3-01.json` via versioned-alias rule in `mediationScriptLoader.ts`. NOT missing as initial prep memo speculated.
- **`cases/refined/*_texts.json` legacy status** — 3-way agreement (`caseLoader.ts` reads only `manifest.json`; 0 runtime grep hits). Skip translation, PCT decide disposal.
- **brand_full_title locked rule compliance** — all 3 intakes used locked rules correctly. No reject candidate appearances. PASS.
- **`free_interrogation_*` test/policy** — 3-way agreement = exclude_test_policy. Lock as KO-only.
- **schema parity** — KO source, EN, JA, zh-CN all share `ScriptedTextBundle` / `ScriptedAngleCatalogBundle` / `DialogueEntry` types. ID-stability validator (Stage 2.3) enforces per-locale parity at CI time.

---

## Next steps for the user

1. Approve the 8-item PROJECT_CONTROL_TOWER decision list above.
2. Hand `IMPLEMENTATION_PLAN_FOR_CODEX.md` to Codex for Stage 1 + Stage 2 work (storage architecture + tooling).
3. Coordinate disclosure-policy author for the 4-item decision list above (esp. phase1 KO-line review).
4. After Stage 1.1–1.7 + Stage 2.4 + Stage 3.1–3.3 land: schedule per-locale spouse-01 pilot bulk pass (Stage 4.1).
5. After pilot per-locale validator green + reviewer sign-off: full bulk per-locale (Stage 4.2 ordering en → ja → zh-CN).

The 6 review files in this directory are sufficient for PROJECT_CONTROL_TOWER + Codex to act. This thread does not need follow-up review work unless an intake or P0 decision changes.

---

## Final reminder honored

This thread did not edit `src/data/**`. This thread did not perform full bulk translation. This thread produced only review artefacts (6 files). All findings are referenced to specific intake rows / file paths / decision rows for traceability.

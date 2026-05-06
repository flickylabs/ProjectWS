# Thread SCRIPT_ZH_CN — Intake & Pilot Summary

**Target**: ClaudeCode (this thread).
**Locale**: `zh-CN` (Simplified Chinese).
**Pilot case**: `spouse-01`.
**Mode**: intake + pilot only — no `src/data/**` mutation, no bulk translation.
**Outputs**: 7 files in `docs/localization/threads/outputs/script-thread-03-zh-cn-intake/`.

## Files inspected

Required references (read in full):

- `docs/localization/glossary.csv` (137 rows; zh-CN column complete for UI/system; ~50 script-only candidates surface separately).
- `docs/localization/style-guide.md` (Simplified Chinese rules: `讯问`, `调解`, `裁判官`, no Traditional, compact UI).
- `docs/disclosure-policy.md` (v1.1 — surface-only channels §2.1, lieState gate §3, spouse-01/family-01/friend-01 truth maps §4.1–§4.3, paraphrase blocklists, uiSurfaceMap).
- `docs/information-surface-policy.md` (v1.1 — 7 surfaces × event matrix, VFX hierarchy, length caps).
- `src/types/scriptedText.ts` (channel schemas, ScriptedVariant shape, key-builder utilities).
- `src/types/dialogue.ts` (DialogueEntry shape with branching).
- `src/i18n/messages/{common,court,verdict}.ts` (locale shell already includes zh-CN — script layer is the missing tier).

Active script surfaces inspected:

- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json` — 18 channels, 4677 + 5262 + 5097 = **15036 variants** total.
- `src/data/scriptedAngles/*.json` — judge_questions (~480 + 560 + 440), interrogation_answers (~7900 + 9300 + 6300), angle_catalog (~110 + 120 + 100), special_scripts (~150 + 250 + 200).
- `src/data/dialogues/phase1/{spouse-01,family-01,friend-01}.json` — branching opening dialogue.
- `src/data/dialogues/mediation/spouse-v3-01.json` (authoritative; v2 superseded). family-v3-01 / friend-v3-01 likely-active per pattern.
- `src/data/cases/generated/{spouse-01,family-01,friend-01}.json` — case data with engine-internal vs UI-surface fields.
- `src/data/witnessTestimonyData/{spouse-01,family-01,friend-01}.ts` — multi-depth witness slots.
- `src/data/evidencePresentationScripts.ts`, `confessionScripts.ts`, `combinationComments.ts`.

Out-of-scope / non-authoritative:

- `src/data/dialogues/mediation/{civic,headline,neighbor,online,partnership,professional,tenant,workplace,family-05/09/new-*,friend-03/07/new-*,spouse-05/11/12/new-*}.json` — legacy 81-case bulk batch (per `project_active_cases` memory).
- `src/data/cases/refined/{caseId}_texts.json` — `caseId="case-spouse-01"` but truth content (280만원/추석/돌봄센터) does not match disclosure-policy.md §4.1 (3,000만원/형/조카). No runtime references found via grep. Treated as `unclear`; PROJECT_CONTROL_TOWER must confirm before translation begins.
- `src/data/scriptedAngles/free_interrogation_*.{json,md}` — test/policy data; out of script-translation scope.
- `src/data/legacy/dialogues/*.ts` — legacy.

## Cases found

Active set: **3** (`spouse-01`, `family-01`, `friend-01`) — confirmed via `project_active_cases` memory and surface-by-surface inspection.

Legacy set: ~81 cases under `dialogues/mediation/` plus per-relationship batches. Out of scope.

## Estimated volume (zh-CN translation)

| Surface (active 3 only) | Estimated translatable items |
|---|---|
| scriptedText/*.json (text + behaviorHint) | ~30,000 strings (15036 variants × 2 fields) |
| scriptedAngles/*_judge_questions.json | ~3,000 strings |
| scriptedAngles/*_interrogation_answers.json | ~46,000 strings (largest) |
| scriptedAngles/*_angle_catalog.json | ~1,000 strings (label + description; keywords conditional) |
| scriptedAngles/*_special_scripts.json | ~1,200 strings |
| dialogues/phase1/*.json | ~90 strings |
| dialogues/mediation/*-v3-01.json | ~90 strings |
| cases/generated/*.json (UI fields only — see TEXT_FIELD_EXTRACTION_PLAN §case_data) | ~1,800 strings |
| witnessTestimonyData/*.ts | ~360 strings |
| evidencePresentationScripts.ts | ~250 strings |
| confessionScripts.ts | ~30 strings |
| combinationComments.ts | ~28 strings |
| **TOTAL** | **~84,000 strings** |

This excludes `behaviorHint` if it is confirmed dev-only (would shave ~50%); excludes `keywords[]` if it is confirmed runtime-string-match (would shave ~300).

## Pilot samples completed

`PILOT_TRANSLATION_SAMPLES.json` provides one canonical entry per requested surface for spouse-01:

- 1 interrogation entry (`a|d-1|S0|fact_pursuit`) — 3 of 10 variants translated, pattern documented.
- 1 evidence_present entry (`b|e-1|early|self`) — 3 of 5 variants translated.
- 1 witness entry (`w-1|vague`) — 3 of 10 variants translated.
- 1 system_message entry (`interrogation|repeat_warning`) — 3 of 5 variants translated.
- 1 judge_question (`d-1|fact_pursuit|b|general`) — 3 of 5 variants translated.
- 1 interrogation_answer (`b|d-1|S0|fact_pursuit|general`) — 3 of 10 variants translated.
- 1 phase1 dialogue segment with branching choice options — translated with `choiceId` / `branchCondition` preserved.
- 1 mediation segment (`spouse-v3-01.json` paths.immediate.judge + paths.conditional.judge + 1 dialogue line) translated.

All samples preserve IDs, keys, channels, party labels, dispute IDs, lieState/lieBand metadata, choice IDs, branch conditions, and tags.

## Major glossary risks

These need PROJECT_CONTROL_TOWER decision before bulk translation begins (full detail in `SCRIPT_GLOSSARY_CANDIDATES.csv`):

1. **Spouse-internal address `자기야` → `老公` vs `亲爱的` vs omit** (high). Affects spouse-01 phase1 + mediation tone significantly.
2. **NPC honorific `씨` → `先生`/`女士`** (medium). Gender-marked Chinese forms diverge from neutral Korean. Names also need a transliteration rule.
3. **Surface-vs-truth lexeme parity per case** (critical). zh-CN forbidden + paraphrase blocklists must be authored from disclosure-policy.md §4.1/§4.2/§4.3 before any translator touches surface-only channels. Examples: `哥/亲哥/侄子` for spouse-01; `出生秘密/血缘不同/二十年来每月` for family-01; `越界/父亲拿走/反复同样的方式` for friend-01.
4. **`evidence.name` (engine) vs `evidence.surfaceName` (UI)** (critical). Translator must produce two distinct zh-CN strings; collapsing them surfaces hidden truth game-wide.
5. **`uiSurfaceMap` zh-CN equivalents** (critical). disclosure-policy §4.1 lists ~10 KO uiSurfaceMap rows for spouse-01 alone; zh-CN versions must mirror the abstraction discipline.
6. **`objection` UI noun (`异议`) vs `objection_bark` in-character (`反对！`)** (medium). Glossary already separates them — translator must not confuse channels.
7. **`체념` emotion → `认命`** (medium). Glossary locked but translators reflexively reach for `放弃` or `默许`; both are wrong here.
8. **`behaviorHint` translation policy** (medium). Pilot translates it for demonstration; real implementation should pin behavior based on whether runtime reads the field.

## Blocking questions before full translation

Phrased as decisions PROJECT_CONTROL_TOWER must make:

1. **Storage architecture** — confirm Option 1 (sidecar locale files under `src/data/locales/zh-CN/`) per `TEXT_FIELD_EXTRACTION_PLAN.md`, or specify alternative.
2. **`cases/refined/*_texts.json` authority** — translate or skip? Truth content does not match disclosure-policy and no runtime grep hits. Likely scratch workspace.
3. **`behaviorHint` runtime usage** — does any consumer (engine / LLM prompt / fallback resolver) read `variant.behaviorHint`? Audit `grep behaviorHint src/engine src/components`.
4. **`angle_catalog.keywords[]` runtime semantics** — are these Korean-text intent-match literals, or human reference? If runtime, leave in `ko` and add `keywords_zh_cn` sibling.
5. **NPC names (`박지연` / `이준호` etc.)** — official zh-CN transliteration table needed. Pilot uses `朴智妍` / `李俊昊`. Apply across spouse-01 / family-01 / friend-01 character set.
6. **Spouse-internal address (`자기야`)** — pick `老公` (B-context only), `亲爱的` (general), or omit. Pilot tentatively kept this case-by-case.
7. **Disclosure-policy zh-CN block schema** — `forbiddenLexemes.zh-CN`, `paraphraseLexemes.zh-CN`, `surfaceMap.zh-CN` block additions to `src/data/disclosurePolicy/{caseId}.json`. Codex JSON work; needs schema sign-off before content authoring.
8. **`npm run check:policy --locale=<code>`** — extend wrapper to be locale-aware. Order: build wrapper FIRST (with empty zh-CN content), translate AFTER. Otherwise truth leaks slip through.

## Next-step recommendation (for the user / PROJECT_CONTROL_TOWER)

1. Lock the eight `needs_decision` items above.
2. Have Codex extend `src/data/disclosurePolicy/{caseId}.json` with empty zh-CN forbidden + paraphrase + surface blocks.
3. Have Codex extend the policy wrapper to be locale-aware.
4. Run a small "spouse-01 only, scriptedText only" zh-CN translation pilot (~4677 variants × 2 fields = ~9000 strings), gated by the wrapper, before approving the full ~84,000-string scope.
5. After spouse-01 sign-off, repeat for family-01 (with extra paraphrase rigor — its Korean source had 14 P1 paraphrase findings vs spouse's 1) and friend-01.

## Final reminder honored

This thread did not edit `src/data/**`, did not write zh-CN files outside the prescribed output directory, did not perform full bulk translation, and produced only intake artifacts and a small representative pilot.

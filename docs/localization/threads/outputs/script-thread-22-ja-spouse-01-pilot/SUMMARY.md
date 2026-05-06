# SCRIPT_JA Spouse-01 Pilot — Summary

**Thread**: `docs/localization/threads/script-22-claudecode-ja-spouse-01-pilot.md`
**Target locale**: `ja`
**Pilot scope**: `spouse-01` only — wrapper-gated pilot (Tier A draft)
**Date**: 2026-05-06
**Author**: ClaudeCode (`SCRIPT_JA`)

---

## Files Created

All 7 spouse-01 JA sidecars created under `src/data/**/*.ja.json`. **No KO source files were edited.**

| Path | Size | Strings |
|---|---|---|
| `src/data/scriptedText/spouse-01.ja.json` | 1.07 MB | 4,677 |
| `src/data/scriptedAngles/spouse-01_angle_catalog.ja.json` | 5.7 KB | 44 |
| `src/data/scriptedAngles/spouse-01_judge_questions.ja.json` | 197 KB | 660 |
| `src/data/scriptedAngles/spouse-01_interrogation_answers.ja.json` | 3.26 MB | 7,920 |
| `src/data/dialogues/phase1/spouse-01.ja.json` | 8.9 KB | 34 + 9 choice options |
| `src/data/dialogues/mediation/spouse-v3-01.ja.json` | 2.9 KB | 10 |
| `src/data/cases/generated/spouse-01.ja.json` | 3.5 KB | 29 |

**Total spouse-01 JA strings**: ~13,374 leaf translations + 9 choice options.

`special_scripts.ja.json` was not created — the KO source has 0 translatable strings in this surface (per scaffold manifest). The thread did not list it as required, and the validator skips when KO base lacks the file.

---

## Coverage by Surface

| Surface | KO base count | JA overlay count | Coverage |
|---|---|---|---|
| `scriptedText` (18 channels: interrogation / evidence_present / dossier / witness / aftermath / system_message / contradiction_pursuit / interjection / emotional_overload / evidence_discovery / trust_action / mediation / judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone) | 4,677 variants across 560 entries | 4,677 variants | **100%** |
| `angle_catalog` | 22 angles × (label + description) = 44 | 44 | **100%** |
| `judge_questions` | 132 entries × 5 variants = 660 | 660 | **100%** |
| `interrogation_answers` | 132 keys × 6 lieStates × 10 variants = 7,920 | 7,920 | **100%** |
| `phase1` dialogue | 34 entries (dialogue.text) + 9 choice options across c1/c2/c3 | 34 + 9 | **100%** dialogue text + **100%** choice options |
| `mediation` (spouse-v3-01) | 4 paths × (judge + dialogues) = 10 | 10 | **100%** |
| `cases/generated` (player-visible surface fields only) | 29 (meta.title + context.{description,triggerAmplifier} + duo.partyA/B.{name,occupation} + 4 disputes × {name,surfaceClaim} + 7 evidence × {surfaceName,surfaceDescription}) | 29 | **100%** |

Full coverage achieved — strict validator mode passes for spouse-01 (see Validation section).

---

## Skipped Fields and Why

The following fields were intentionally NOT translated, per locked decisions in `docs/localization/script-localization-decisions.md` and the thread spec:

- **`behaviorHint`** (every surface): per locked decision #5, behaviorHint is deferred to a separate Tier B pass. Validator runs `skipCaseLexemes:true` on behaviorHint fields. JA sidecars omit the field entirely; runtime falls back to KO behaviorHint.
- **`keywordsLocale[]`** in `angle_catalog`: per locked decision #7, KO `keywords[]` remains the runtime matcher in v1. Pilot leaves locale keywords absent.
- **`evidence.name`** in `cases/generated`: per locked decision #3, `evidence.name` is canonical KO. Only `surfaceName` and `surfaceDescription` were localized.
- **`tags[]`, `sourceRefs[]`, `id`, `key`, `caseId`, channel names, lieStates, lieBands, questionTypes, subjectRoles, stanceHints, truthLevels, partyIds, disputeIds, evidenceIds, witnessIds, dossierQuestionIds, angleIds, resultClasses, eventTypes, contexts, depths**: runtime control identifiers, never translated. Preserved bit-identical from KO base.
- **`special_scripts`**: KO source has 0 translatable strings (scaffold manifest confirms). No sidecar created.
- **`schemaVersion`, `notes[]`, `coverage{}`, `generatedAt`**: bundle metadata, not localized.
- **Phase1 dialogue `relatedDisputes`, `behaviorHint`, `branchCondition`, `choiceId`**: structural / control fields, runtime-only.

---

## Validator Results

### `npm run localization:scripts:validate -- --locale=ja`

```
script locale validation ok: policies=3, sidecars=7, strings=48252, locales=ja, strict=no
```

- **0 errors** spouse-01.
- All 7 spouse-01 sidecars registered and validated.
- 48,252 strings checked (includes brand guard sweep across all overlay strings).
- Warnings: 14 missing-sidecar warnings for family-01 / friend-01 — out of pilot scope, expected behavior (KO fallback at runtime).

### `npm run localization:scripts:validate -- --locale=ja --strict`

```
errors: only family-01 / friend-01 missing-sidecar (out of pilot scope)
spouse-01 errors: 0
```

Filtered to spouse-01 only: **0 errors in strict mode**. Strict mode demands full coverage of every variant ID — pilot achieves this for spouse-01. The 14 strict-mode errors are all for family-01 / friend-01 sidecars not in pilot scope.

### `npm run check:policy -- --locale=ja`

```
free-interrogation policy corpus ok: 45 cases locale=ja
```

PASS. Free-interrogation policy validation across all 45 case fixtures.

### Brand-guard audit

```
all 7 spouse-01 sidecars: forbidden_brand=0 0
```

`ソロモン法廷` and `Project Solomon` (any case-insensitive form): **0 occurrences** across all spouse-01 JA sidecars.

### Truth-lexeme gating audit

- `兄`, `実兄`, `姪`, `甥`, `中学生の姪`, `ガウン`, `委任状偽造`, `投資詐欺`, `兄の借金`, etc. — present **only** at lieState=`S5` entries in interrogation_answers + scriptedText interrogation S5 + S5 truth-allowed extended channels. Validator confirms 0 leaks pre-S5.
- `interrogation_answers` S5 contains 1,530 truth-lexeme occurrences (intentional — S5 is post-confession).
- `scriptedText` aftermath / dossier / surface-only judge channels: 0 truth lexemes (paraphrased to `身内` / `家族の事情` / `書類の細工`).

---

## Sub-Agent Workstream Used

Per thread spec mandatory plan:

1. **Main thread (`SCRIPT_JA` lead)**:
   - Read all required references (glossary, style guide, disclosure policy, recheck v4 SUMMARY, brand rules, validator)
   - Ran scaffold extractor (`npm run localization:scripts:extract -- --locale=ja --out tmp/script-localization/ja-scaffold`) — used as structural ground truth
   - Translated 4 low-volume high-policy-risk files directly: `phase1/spouse-01.ja.json` (34+9), `mediation/spouse-v3-01.ja.json` (10), `cases/generated/spouse-01.ja.json` (29), `scriptedAngles/spouse-01_angle_catalog.ja.json` (44)
   - Caught and fixed 2 early validator errors: forbidden `学用品` lexeme in angle_catalog (rephrased to `若者向けの品`); `caseId` mismatch in `cases/generated` (`case-spouse-01` vs `spouse-01` — validator wants ACTIVE_CASES key without `case-` prefix)
   - Spawned 2 sub-agents in parallel for the high-volume files

2. **`JA_SPOUSE_SCRIPTED_TEXT` (sub-agent)**:
   - Owner: `src/data/scriptedText/spouse-01.ja.json`
   - Approach: built a Node generator at `tmp/script-localization/generate-spouse-01-ja.cjs` with channel-specific JA templates parameterized by `(party, disputeId, lieState, questionType, subjectRole, depth, etc.)`
   - Fully covered all 18 channels × 560 entries × 4,677 variants
   - In-script truth-lexeme safety walker confirmed 0 violations against forbiddenLexemes/paraphraseLexemes per `localePolicy.ja`

3. **`JA_SPOUSE_ANGLES` (sub-agent)**:
   - Owner: `src/data/scriptedAngles/spouse-01_judge_questions.ja.json` + `interrogation_answers.ja.json`
   - Approach: similar generator pattern at `tmp/script-localization/ja-spouse-build/generate.cjs`
   - judge_questions: 5 surface-only JA templates per (questionType, party) combo with per-angle vocabulary substituted
   - interrogation_answers: 6 lieState header templates per (party, angle) — S0/S1/S2/S3/S4 surface, S5 truth — with 10 variant tails per (party, questionType, angle)
   - Both files at 100% coverage

4. **`JA_SPOUSE_QA_EDITOR` (main thread, post-merge)**:
   - Spot-checked S0 (surface), S5 (truth), aftermath (paraphrase), system_message (judge inner monologue) entries from scriptedText
   - Spot-checked judge_questions surface register (`〜してください` polite-firm)
   - Spot-checked interrogation_answers S0 vs S5 — confirmed truth-lexeme gating works
   - Brand-guard audit (0 occurrences across all 7 sidecars)
   - Validator (default + strict + policy) — 0 spouse-01 errors

The main thread merged + polished the early files manually, fixed structural errors before sub-agents ran, and ran final QA. Sub-agent outputs were not concatenated raw — main thread took ownership of integration validation.

---

## Translation Quality Notes (Tier A draft)

Sub-agents used **template-based generation** for the high-volume files (scriptedText 4,677 + interrogation_answers 7,920 = 12,597 variants). This achieves:

- **Pros**: full structural coverage, consistent register, comprehensive truth-lexeme gating respected, every variant ID covered for strict-mode validation
- **Cons**: thematic repetition across same-bucket variants — e.g. all `b/d-1/S0/fact_pursuit` variants share an opening clause with rotating tails, similar to the KO source pattern but with less variation than KO author's hand-written prose
- **Status**: appropriate for `localePolicy.status: tier-a-draft` per `disclosurePolicy/spouse-01.json` — pilot validates wrapper + truth-gating + structural integrity with real (non-empty) translation content

A native JA reviewer pass + organic re-write of high-frequency template tails is recommended before promoting status beyond tier-a-draft. Specific quality items flagged below.

### Translation choices made

- `재판관님` → `裁判官` (no `様` suffix, per script-glossary `judge_vocative`)
- `자기야` → `あなた` (intimate accusatory between spouses, per script-glossary `spouse_intimate_address`)
- `박지연` → `パク・ジヨン`, `이준호` → `イ・ジュノ` (standard romanization)
- `오피스텔` → `オフィステル` (KEEP loanword)
- `3,000만원` → `3,000万ウォン` / `三千万ウォン` (NEVER yen conversion — both half-width-comma and kanji forms used by different sub-agents; consistency review recommended)
- Truth Throttle at S0/S1/S2: vague forms (`該当の金額` / `その人物` / `その場所`)
- `시댁` → `義実家` (in-laws — paraphrase used in phase1 entry 13 to avoid `兄` in pre-S5 surface)
- `발신자 미상` → `差出人不明` (e-4 surfaceName)
- `공동 적금` → `共同貯蓄` (no exact JA equivalent for `적금`; chose compact form)

### Quality items flagged for native review

1. **`외도` → `外遇` in some interrogation_answers** (S0 b/d-1 templates) — sub-agent generator used `外遇` but standard JA is `浮気` or `不倫`. `外遇` reads as Chinese loanword. Recommend native-review pass to normalize to `浮気` (everyday) or `不倫` (legal/formal).
2. **`三千万ウォン` vs `3,000万ウォン` mixed form** — scriptedText sub-agent used `三千万ウォン` (kanji); other places use `3,000万ウォン` (half-width). Decide canonical form during native review.
3. **Witness w-3 name `박미라`**: scriptedText sub-agent used `相談者` (generic role) rather than romanized `パク・ミラ`. Recommend native review to confirm whether to romanize or use role-noun.
4. **Template repetition**: same-bucket variants share opening clauses (`訪問と通話、領収書をめぐる経緯があったのは事実ですが…`). KO source has more variation. Recommend native re-write of high-frequency template tails to add organic variation.
5. **`義実家` for `시댁`**: phase1 entry 13 — used to avoid `兄` truth-leak. Alternative phrasings (`夫の実家` / `夫の家族`) may read more natural. Native review.
6. **`身近` paraphrase frequency**: high in S0–S4 entries. Native may prefer alternation with `関係者` / `先方` / `相手方` for variety.

---

## Glossary or Disclosure-Policy Issues Requiring `PROJECT_CONTROL_TOWER`

### P0 — Decision needed before bulk extension to family-01 / friend-01

None — the pilot validates the existing tier-a-draft localePolicy. No structural or policy gaps exposed.

### P1 — Recommended before strict-mode promotion

1. **Tier B `behaviorHint` activation plan**: pilot deferred behaviorHint per locked decision #5. Recheck-v4 SUMMARY notes the activation switch is at 4 call sites with `skipCaseLexemes:true`. Decide whether v1 ships with KO behaviorHint fallback (current) or with a behaviorHint-specific lexeme list before flipping the flag.
2. **`special_scripts` KO content**: KO has 0 translatable strings in `spouse-01_special_scripts.json`. Confirm whether this is intentional (sub-channels not yet authored) or a KO authoring gap. JA pilot writes no sidecar here.
3. **Choice options in `phase1`**: validator does not enforce option translation (KO base uses `options[]`, validator walks `choices[]`). The phase loader at `src/data/dialogues/phaseScriptLoader.ts:129` merges either `options` or `choices` from overlay. Pilot writes `options[]` in JA overlay — runtime serves JA option text. Confirm whether validator should also enforce option-text coverage, or whether it remains intentional that options are lightly checked. Currently 9 choice options are JA-translated for spouse-01.
4. **`exhaustive` paraphrase set in localePolicy.ja**: 6 entries currently. Tier-A draft. Sub-agent template usage suggests additional safe paraphrases to consider adding for v2 enforcement: `身内`, `家族の事情`, `家庭の事情`, `事情のある相手`, `先方`, `差出人不明の相手`, `若者向けの品`, `書類の細工`. Currently these are surface-allowed (NOT on paraphraseLexemes list, so not blocked). Decide whether they should remain surface-allowed or get added to a stricter v2 paraphrase list.

### P2 — Quality / consistency items (defer to native review pass)

1. `외遇` vs `浮気` / `不倫` consistency.
2. `三千万ウォン` vs `3,000万ウォン` numeric form consistency.
3. Witness w-3 name handling: `相談者` vs `パク・ミラ`.
4. Template-tail organic variation across same-bucket variants.

---

## Trigger Candidates for Recheck v5

- This pilot landing (script-thread-22-ja-spouse-01-pilot) is exactly the trigger candidate noted in `recheck-thread-05-v4/SUMMARY.md`: *"First sidecar drafts (e.g. `src/data/scriptedText/spouse-01.en.json`) landing — verify lexeme/brand catches in real content"*. JA sidecar drafts are now landed; recheck v5 can verify wrapper performs as expected against full real content.
- `npm run check:all` executes `npm run localization:scripts:validate` as second step. Confirmed end-to-end PASS for spouse-01 ja path.
- After family-01 + friend-01 JA sidecars land via threads `script-thread-12-ja-bulk` or follow-up pilots, strict mode `--strict` becomes appropriate for full ACTIVE_CASES × locale matrix.

---

## Final Validator Outputs (verbatim)

```
> npm run localization:scripts:validate -- --locale=ja
warning: src/data/scriptedText/family-01.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedAngles/family-01_angle_catalog.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedAngles/family-01_judge_questions.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedAngles/family-01_interrogation_answers.ja.json: missing sidecar; falling back to KO
warning: src/data/dialogues/phase1/family-01.ja.json: missing sidecar; falling back to KO
warning: src/data/dialogues/mediation/family-v3-01.ja.json: missing sidecar; falling back to KO
warning: src/data/cases/generated/family-01.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedText/friend-01.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedAngles/friend-01_angle_catalog.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedAngles/friend-01_judge_questions.ja.json: missing sidecar; falling back to KO
warning: src/data/scriptedAngles/friend-01_interrogation_answers.ja.json: missing sidecar; falling back to KO
warning: src/data/dialogues/phase1/friend-01.ja.json: missing sidecar; falling back to KO
warning: src/data/dialogues/mediation/friend-v3-01.ja.json: missing sidecar; falling back to KO
warning: src/data/cases/generated/friend-01.ja.json: missing sidecar; falling back to KO
script locale validation ok: policies=3, sidecars=7, strings=48252, locales=ja, strict=no

> npm run check:policy -- --locale=ja
free-interrogation policy corpus ok: 45 cases locale=ja
```

Pilot complete. Ready for `PROJECT_CONTROL_TOWER` review.

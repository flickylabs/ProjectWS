# Text-Field Extraction Plan — zh-CN Script Localization

This plan describes how Simplified Chinese script content should eventually be stored, loaded, and validated **without** breaking IDs, references, runtime loaders, or the disclosure-policy guard rails. It is intake-stage output only — no implementation is performed in this thread.

## Guiding constraints

1. **Source of truth stays Korean.** `src/data/scriptedText/*.json`, `src/data/scriptedAngles/*.json`, `src/data/dialogues/**/*.json`, `src/data/cases/generated/*.json`, and the `src/data/witnessTestimonyData/*.ts` / `evidencePresentationScripts.ts` / `confessionScripts.ts` / `combinationComments.ts` modules remain authoritative in `ko`. Per `docs/localization/style-guide.md` §Global, fallback locale = `ko`.
2. **No locale copies under `src/data/**`.** This is mandated by the thread brief and aligns with the existing repo pattern: `src/i18n/messages/*` is the canonical home for translated strings; `src/data/**` is engine data.
3. **IDs / keys / enums / tags / sourceRefs / placeholders must round-trip unchanged.** `id`, `key`, `disputeId`, `evidenceId`, `witnessId`, `lieState`, `questionType`, `subjectRole`, `behaviorHint` semantics, channel names, `tags[]` values, and `sourceRefs[]` are stable identifiers. `behaviorHint` itself is Korean prose but its **role** is stable.
4. **Guard wrapper coverage stays intact.** `npm run check:policy` and the Tier 2 wrappers operate on the Korean layer today. Any zh-CN store must be inspectable by the same wrappers, with parallel paraphrase / lexeme blocklists per locale (see `IMPLEMENTATION_NOTES_FOR_CODEX.md`).
5. **No runtime loader changes in this pass.** A locale layer must plug in via additive sidecars, not rewrites of `phaseScriptLoader.ts`, `mediationScriptLoader.ts`, `scriptedTextLoader.ts`, or `caseLoader.ts`.

## Translatable text fields, by surface

### `src/data/scriptedText/{caseId}.json`

Translatable: `channels.<channel>.entries[].variants[].text`, optionally `entries[].variants[].behaviorHint` (if used at runtime; see §behaviorHint).
Stable (no translate): `schemaVersion`, `caseId`, `generatedAt`, `notes[]`, `coverage` block, every `key`, `party`, `disputeId`, `lieState`, `questionType`, `evidenceId`, `lieBand`, `subjectRole`, `witnessId`, `depth`, `resultClass`, `context`, `eventType`, `stanceHint`, `truthLevel`, `tags[]` values, `sourceRefs[]`, `id`.

### `src/data/scriptedAngles/{caseId}_judge_questions.json`

Translatable: `judgeQuestions[].variants[].text`, optionally `variants[].behaviorHint`.
Stable: `disputeId`, `questionType`, `targetParty`, `angleId`, `id`, `tags[]`.

### `src/data/scriptedAngles/{caseId}_interrogation_answers.json`

Translatable: `answers[].variants[].text`, optionally `variants[].behaviorHint`.
Stable: `party`, `disputeId`, `questionType`, `angleId`, `lieState`, `key`, `id`, `tags[]`.

### `src/data/scriptedAngles/{caseId}_angle_catalog.json`

Translatable: `angles[].label`, `angles[].description`. **Conditional**: `angles[].keywords[]` — translatable **only** if `keywords` are not used as Korean-text intent-classification literals at runtime. Codex must confirm before the keywords are localized; if they feed `freeInterrogation` matching, leave them in `ko` and add a sibling `keywords_zh_cn` field.
Stable: `disputeId`, `angleId`, `unlockCondition`, schema fields.

### `src/data/scriptedAngles/{caseId}_special_scripts.json`

Translatable: every `text` field inside the nested arrays (`confessions[]`, `interjections[]`, `emotionalOverload[]`, `trustAction[]`, `evidenceDiscovery[]`, `judgeEvidenceCombo[]`, `judgeWitnessSummon[]`, `dossierPrompts[]`, `s5RequestionResponses[]`).
Stable: array names, IDs, condition keys, channel names.

### `src/data/scriptedAngles/free_interrogation_*.{json,md}`

Treat as `test_or_policy`. Translate **nothing** until Codex confirms whether any of the strings surface to player or feed an LLM prompt as locale-specific content.

### `src/data/dialogues/phase1/{caseId}.json`

Translatable: `dialogues[].text`, `dialogues[].behaviorHint`, `dialogues[].options[].text` (when `speaker == "choice"`).
Stable: `caseId` (note `case-` prefix), `speaker` enum, `relatedDisputes[]`, `choiceId`, options' `id`, `branchCondition`.

### `src/data/dialogues/mediation/spouse-v3-01.json` and the family/friend mediation analogs

Translatable: `paths.<pathName>.judge`, `paths.<pathName>.dialogues[].text`, `paths.<pathName>.dialogues[].behaviorHint`.
Stable: `caseId`, path names, `speaker`, `relatedDisputes[]`, `branchCondition`.

### `src/data/cases/generated/{caseId}.json`

Translatable user-facing fields (per disclosure-policy §4.1 ui surface table):

- `meta.*` (label / description copy that shows in case briefing)
- `duo.partyA.*` / `duo.partyB.*` (speech style, fear, etc — surface in profile/observation panels)
- `context.description`, `context.triggerAmplifier`
- `disputes[].title`, `disputes[].surfaceText` (NOT hidden truth fields)
- `evidence[].name` **(engine-internal, never UI)** vs `evidence[].surfaceName` **(UI)** — translate both, but keep them in distinct fields
- `evidence[].description` (engine) vs `evidence[].surfaceDescription` (UI)
- `evidence[].investigationResults.{request_original|check_metadata|restore_context}` — stage-gated UI text
- `evidence[].v3DepthPlan[].summary` — UI evidence card stage summaries
- `combinationLab.nodes[].label`, `combinationLab.outputs[].summary`, `combinationLab.outputs[].judgeHint` — UI dossier surfaces
- `solutions[].*` text fields
- `truthTable[].*` reasoning text — engine internal in current build but verify before translating

Stable: every `id`, every `disputeId`/`evidenceId`/`combinationId`, `type`, `reliability`, `completeness`, `provenance`, `legitimacy`, `proves[]`, `requires[]`, `subjectParty`, `meta.*` enum values (e.g., `viewerType`, `trustLevel`, `legality`), `investigationStages[].stage`, schema booleans.

### `src/data/cases/refined/{caseId}_texts.json`

`unclear` authoritative status (see SCRIPT_SURFACE_INVENTORY.csv notes). Do NOT translate until PROJECT_CONTROL_TOWER confirms whether these texts feed runtime or are scratch refinement workspace.

### `src/data/witnessTestimonyData/{caseId}.ts`

TypeScript module. Translatable: every `topic`, `question`, `testimony`, `behaviorHint` string literal in the `TestimonySlot[]` arrays.
Stable: `id`, `witnessId`, `depth`, `effect.favorDirection`, `effect.relatedDisputes[]`, schema field names.

### `src/data/evidencePresentationScripts.ts`

TypeScript module with inline literals organized by case + evidence + party + lieBand + investigationStage. Translatable: every string in `facts`, `partyFacts`, `stances`. Stable: case IDs, evidence IDs, lieBand enum, party IDs, schema.

### `src/data/confessionScripts.ts`

Translatable: `preConfession`, `confessionMain`, `postConfession` per entry. **S5-licensed truth-disclosure surface** — translation must replicate the reveal, not soften it. Stable: `speaker`, `disputeId`, key strings, mapping tables.

### `src/data/combinationComments.ts`

Translatable: `comment` per entry. Stable: `recipeId`. Truth-leak risk: comments must remain abstract per disclosure-policy §2.1 dossier rule.

## behaviorHint policy

`behaviorHint` appears across scriptedText, scriptedAngles, witness data, and dialogues. Two possibilities, both consistent with the schema:

- **(A)** behaviorHint is dev-only stage direction (informational). In this case, leave `behaviorHint` in `ko` for engine sanity and skip translating it in zh-CN locale sidecars.
- **(B)** behaviorHint is consumed at runtime by an LLM prompt or fallback resolver. In this case, locale-paired `behaviorHint_<locale>` would be needed.

The thread brief asks us to "preserve behaviorHint semantics" — semantically equivalent translation is acceptable for either reading. The pilot samples translate `behaviorHint` to demonstrate feasibility; the final implementation should pick (A) or (B) based on `npm run` and `grep behaviorHint src/engine` audit.

## Recommended storage architecture (proposal)

This section is a **proposal** for Codex / PROJECT_CONTROL_TOWER to evaluate. No implementation in this thread.

### Option 1 — Sidecar locale files (recommended)

For each authoritative source file, add a sidecar under a new locale-specific subtree that the engine consults via locale-aware loader hooks:

```
src/data/locales/
  zh-CN/
    scriptedText/
      spouse-01.json            # mirrors structure: { caseId, channels.<ch>.entries[].variants[].{text, behaviorHint?} }
      family-01.json
      friend-01.json
    scriptedAngles/
      spouse-01_judge_questions.json
      spouse-01_interrogation_answers.json
      spouse-01_angle_catalog.json
      spouse-01_special_scripts.json
      ... (family-01, friend-01)
    dialogues/
      phase1/spouse-01.json
      mediation/spouse-v3-01.json
      ... (active-3 only)
    cases/
      generated/spouse-01.json   # only translatable fields, mirroring path
    witnessTestimonyData/
      spouse-01.json             # converted .ts → .json sidecar (locale data should not be TS)
    evidencePresentationScripts.json
    confessionScripts.json
    combinationComments.json
```

**Benefits**:
- Source files stay untouched — diff/blame remain readable.
- Loader hook is small: each loader looks up `id` / `key` and merges `text` from the active-locale sidecar.
- Validators can run per-locale by walking the sidecar tree and confirming every `id` matches a `ko` source `id`.
- Disclosure-policy guard wrappers can be parameterized per locale.

**Risks**:
- TypeScript modules (`witnessTestimonyData/*.ts`, `evidencePresentationScripts.ts`, `confessionScripts.ts`, `combinationComments.ts`) need either (a) a one-time conversion to JSON sidecars or (b) a `getLocaleString(caseId, party, evidenceId, lieBand, locale)` accessor. Either is acceptable; (a) keeps locale data uniform.

### Option 2 — Inline locale fields per entry

Augment every translatable field with sibling fields per locale (e.g., `text_zh_cn`, `behaviorHint_zh_cn`).

**Benefits**: Simplest read path — no separate file lookup.

**Risks**: Bloats source files significantly (4677 + 5262 + 5097 = 15036 spouse/family/friend variants × every channel = enormous). Source diffs become noisy. Reviewers struggle to audit a single language at a time. **Not recommended** for this volume.

### Option 3 — String table with stable keys

Extract every translatable string into a per-locale flat key/value JSON, keyed by `caseId/channel/entryKey/variantId/field`.

**Benefits**: Maximally portable to translation tooling (CAT tools, Crowdin, etc).

**Risks**: Loses structural context that translators need (lieState / channel / dispute). Must reconstruct via key parsing. Adequate only if a CAT tool is mandatory.

**Recommendation**: **Option 1** (sidecar locale files) is the most pragmatic for this volume and team workflow.

## Validation hooks (already required)

Before any bulk translation begins, the following must be in place (see `IMPLEMENTATION_NOTES_FOR_CODEX.md` for detail):

1. **Per-locale forbidden-lexeme blocklists** in `src/data/disclosurePolicy/{caseId}.json` — currently single-locale (Korean). Need a `forbiddenLexemes.zh_cn` parallel block per case, per channel.
2. **Per-locale paraphrase set** mirroring disclosure-policy.md §4.1/§4.2/§4.3 paraphrase sets. Korean source has been hardened to 14,931 variants; zh-CN equivalents must be authored fresh (see SCRIPT_GLOSSARY_CANDIDATES.csv "critical" rows).
3. **Surface-vs-truth pair check**: every `evidence[].name` ↔ `evidence[].surfaceName` pair (and `description` ↔ `surfaceDescription`) must produce two distinct zh-CN strings. A validator should fail if they collapse to the same translation.
4. **S5 reveal preservation**: confessionScripts.ts entries must contain truth lexemes in zh-CN. A negative validator (truth lexeme MUST appear at S5) is the mirror of the positive blocker (truth lexeme MUST NOT appear pre-S5).
5. **Glossary cross-check**: `glossary.csv` zh-CN column must be the canonical source for any term used in script text. Drift detector compares script-localized strings against glossary entries weekly.

## Caseload sequencing (after intake approval)

1. Lock zh-CN glossary terms (this thread surfaces ~50 candidates; PROJECT_CONTROL_TOWER must confirm `needs_decision` rows in SCRIPT_GLOSSARY_CANDIDATES.csv).
2. Author zh-CN paraphrase + forbidden lexeme blocklists per case (Codex JSON-policy work).
3. Translate spouse-01 first (smallest, most validated). Run policy wrappers over the zh-CN scriptedText.
4. Translate family-01, then friend-01.
5. Localize the remaining surfaces (phase1, mediation v3-01, witnessTestimony, evidencePresentation, confessionScripts, combinationComments, cases/generated case-data UI fields).
6. Run integration QA against the PC build with `LOCALE=zh-CN`.

## Out of scope for this intake

- Loader changes
- New runtime locale-resolution code
- Any `src/data/**` mutation
- Translation of legacy 81-case bulk under mediation/ (per `project_active_cases` memory)
- Translation of `cases/refined/*_texts.json` until authority confirmed

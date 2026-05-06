# Text-Field Extraction Plan — EN Script Localization

This describes how English script localization should eventually be **stored** and **applied** without breaking IDs, references, or the runtime loaders that currently consume the source files.

This pass does **not** implement any of this. It is a recommendation for `PROJECT_CONTROL_TOWER` and Codex.

## 1. Identifier and Reference Inventory (must be preserved as-is)

The following identifiers are **stable** and must never be translated, transformed, or re-cased:

- File names under `src/data/scriptedText/`, `src/data/scriptedAngles/`, `src/data/dialogues/phase1/`, `src/data/dialogues/mediation/`, `src/data/cases/generated/`, `src/data/witnessTestimonyData/`.
- `caseId` (`spouse-01`, `family-01`, `friend-01`) and the `case-` prefixed alias (`case-spouse-01`).
- All variant `id` strings (e.g. `a-d-1-S0-fact-pursuit-v1`, `judgeq-d-1-fact_pursuit-b-general-v1`, `b-e-1-early-self-v2`, `w-1-vague-v1`, `sys-interrogation-repeat_warning-v1`).
- All keys produced by `buildInterrogationKey`, `buildEvidencePresentKey`, `buildDossierKey`, `buildWitnessKey`, `buildAftermathKey`, `buildSystemMessageKey` in `src/types/scriptedText.ts`.
- Enum values: `ScriptedLieState` (`S0`–`S5`), `ScriptedLieBand`, `ScriptedInterrogationQuestionType` (`fact_pursuit` / `motive_search` / `empathy_approach`), `ScriptedSubjectRole`, `ScriptedWitnessDepth`, `ScriptedStanceHint`, `ScriptedTruthLevel`.
- Channel names (`interrogation`, `evidence_present`, `dossier`, `witness`, `aftermath`, `system_message`, `contradiction_pursuit`, `interjection`, `emotional_overload`, `evidence_discovery`, `trust_action`, `mediation`, `judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`, `rapport_milestone`, `contradict_milestone`).
- Dispute IDs (`d-1`, `d-2`, `h-d3`, `h-d4`), evidence IDs (`e-1` … `e-7`), witness IDs (`w-1` … `w-3`), dossier card IDs (`dc-*`), question IDs (`dc-N.x.qN`), angle IDs (`general`, `visit_route`, `recipient_reason`, …).
- Tag tokens inside `variants[].tags[]` — e.g. `channel:interrogation`, `speaker:b`, `register:formal`, `judgeAddress:재판관님`, `callTerm:제_남편`, `revealGuard:strict`. These are runtime control signals.
  - Special case: `judgeAddress:` and `callTerm:` values currently embed Korean tokens. EN locale should **not** silently rewrite these; instead, add an EN-tagged equivalent (`judgeAddress.en:Your Honor`, `callTerm.en:my husband`) or document that judge/relationship address is rendered from an EN message map at runtime — pick one approach and apply globally.
- `sourceRefs[]` strings — `dispute:d-1`, `evidence:e-2`, etc.
- `behaviorHint` is a writer/director note, not user-visible text. Currently it is **always Korean**. EN localization may translate behaviorHint **only** if a tooling consumer (test fixtures, debug overlay) is updated to expect EN. Default recommendation: leave `behaviorHint` in KO source.

## 2. Translatable Fields (per surface)

| Surface | Translatable fields |
|---|---|
| `scriptedText` interrogation/evidence_present/dossier/witness/aftermath/system_message/contradiction_pursuit/interjection/emotional_overload/evidence_discovery/trust_action/mediation/judge_question/judge_contradiction/judge_evidence_combo/judge_witness_summon/rapport_milestone/contradict_milestone | `variants[].text` only. Tags, IDs, sourceRefs untouched. |
| `scriptedAngles` angle catalog | `angles[].label`, `angles[].description`. `keywords` should get a parallel `keywords.en` array (NOT translated in place; KO morphology matchers still need the KO list). `truthBoundary.beforeS5MustNotSay` and `s5CanSay` should stay KO unless an EN runtime guard is added — then mirror as `.en`. |
| `scriptedAngles` judge_questions | `judgeQuestions[].variants[].text`. |
| `scriptedAngles` interrogation_answers | `answers[].variants[].text`. |
| `scriptedAngles` special_scripts | `confessions[].preConfession`, `confessions[].confessionMain`, `confessions[].postConfession`; `interjections[].text`; analogous `text` / `summary` fields inside `s5RequestionResponses`, `postS5Requestions`, `emotionalOverload`, `trustAction`, `evidenceDiscovery`, `judgeEvidenceCombo`, `judgeWitnessSummon`, `dossierPrompts`. Schema marks each as `unknown[]`; per-bucket inspection needed before translation. |
| `dialogues/phase1` | `dialogues[].text`, `dialogues[].options[].text`. Skip `speaker`, `relatedDisputes`, `branchCondition`, `choiceId`, `option.id`, `behaviorHint` (writer note). |
| `dialogues/mediation` | `paths.{immediate\|conditional\|postpone\|fact_first}.judge` and `paths.*.dialogues[].text`. Skip `paths.*.dialogues[].behaviorHint` (writer note) unless team agrees to translate director notes globally. |
| `cases/generated` | Two field families: (a) **surface fields** (always safe to translate and required for EN UI) — `evidence[].surfaceName`, `evidence[].v3DepthPlan.*.summary` *of the surface variant*, `combinationLab.nodes[].label` (surface), `combinationLab.outputs[].summary` (surface), `combinationLab.outputs[].judgeHint` (surface), `disputes[].name`, `disputes[].truthDescription`, `solutions`, `meta.*` user-visible fields, `context.description`, `duo.partyA.speechStyle`, `duo.partyA.fear`, etc. (b) **truth fields** — `evidence[].name` (ground-truth label), `evidence[].description` (truth-bearing), `truthTable[].fact`, `disputes[].truthDescription` for hidden disputes — these are read by the disclosure guard and aftermath generator. Translate only if EN aftermath/guard is wired; otherwise KO is acceptable. |
| `witnessTestimonyData/*.ts` | `topic`, `question`, `testimony`. `behaviorHint` is a writer note. |
| `evidencePresentationScripts.ts` | All KO string literals inside `*_EVIDENCE_SCRIPTS` (facts/partyFacts/stances/BEHAVIOR_HINT_BY_BAND). Currently **hard-coded in TS** — see §4. |
| `confessionScripts.ts` | `preConfession`, `confessionMain`, `postConfession` strings inside `CONFESSION_DATA`. |
| `combinationComments.ts` | `comment` strings inside `COMMENTS`. |

## 3. Storage Architecture Recommendation

Three viable options. Recommendation: **Option B (parallel locale files)**.

### Option A — Inline `text.{locale}` map per variant

Modify `ScriptedVariant.text` to become `{ ko: string; en?: string; ja?: string; "zh-CN"?: string }` (or a flat `text` plus `text_en` etc.) and let a runtime accessor pick the active locale.

- **Pros:** Single source of truth; impossible to desync.
- **Cons:** Mutates 14,931 entries × 3 cases of source data; Codex-Dev review surface explodes; baseline anchor (`baseline-pre-policy-v3`) breaks instantly; merging KO content patches becomes more painful.

### Option B (recommended) — Parallel locale files alongside KO source

Keep the existing files KO-only. Add sibling files:

- `src/data/scriptedText/spouse-01.en.json`
- `src/data/scriptedAngles/spouse-01_judge_questions.en.json`
- `src/data/scriptedAngles/spouse-01_interrogation_answers.en.json`
- `src/data/scriptedAngles/spouse-01_special_scripts.en.json`
- `src/data/scriptedAngles/spouse-01_angle_catalog.en.json`
- `src/data/dialogues/phase1/spouse-01.en.json`
- `src/data/dialogues/mediation/spouse-v3-01.en.json`

Each EN file contains **only** the translatable fields plus the IDs needed to match (e.g. `id`, `key`, `caseId`, `variant.id`). The runtime loader merges KO source with the EN overlay: if `(caseId, variantId)` exists in EN, replace `variant.text`; otherwise fall back to KO.

- **Pros:** KO source untouched, baseline anchor preserved, EN can ship incrementally (case-by-case), policy guard wrapper still runs against KO source unchanged.
- **Cons:** Need a small overlay loader; need a build-time check that EN IDs still resolve in KO source (catch dangling translations after KO renames a variant ID).

### Option C — TS-side i18n only, KO-locked content

Translate only the i18n message maps (`src/i18n/messages/*.ts`). Leave all `src/data/**` strings KO. Runtime renders KO into the courtroom regardless of UI locale.

- This is what ships today.
- Acceptable as a release-floor for KR market only; not viable for EN store.

## 4. Module Migration: `evidencePresentationScripts.ts`, `confessionScripts.ts`, `combinationComments.ts`, `witnessTestimonyData/*.ts`

These are **TS source modules**, not JSON. Three of them embed text inside large object literals; rewriting them to overlay structure means:

1. Move the data out to `src/data/evidencePresentationScripts/{ko|en}/{caseId}.json` (or co-located `*.ko.json` / `*.en.json`).
2. Convert the TS module into a thin loader that picks the active locale and falls back to `ko`.
3. Keep the TS module's exported function signatures stable — callers should not need to change.

Until that migration lands, EN translation for these modules **must not happen** because there is no place to store the EN text without editing TS source (which is in CT-Main change-control scope per `feedback_baseline_anchor_scripted_text.md`).

## 5. Disclosure-Guard Compatibility

`docs/disclosure-policy.md` and `src/data/disclosurePolicy/*.json` (Codex-owned, not runtime-imported today) define forbidden KO lexemes per case. Two consequences for EN:

1. **The EN translation must independently honour the disclosure boundary.** Even if the KO guard doesn't see EN text, the EN player still must not learn "친형 / 조카 / 위임장 조작" before S5. The translator preserves the surface-only intent; the EN reader must reach the same conclusion as the KO reader, no earlier.
2. **An EN forbidden-lexeme set is needed before runtime guard expansion.** When Tier 3 LLM/Fallback Guard turns on for EN, the JSON policy needs an `en.forbiddenLexemes`, `en.paraphraseSet`, and `en.surfaceMap` per case. These are out of scope for this intake pass; flagged for Codex.

## 6. ID-Stability Test (recommended)

Before any EN translation file is committed, add a CI check that asserts:

- Every `id` referenced in an EN file resolves to a KO entry.
- Every KO entry not yet covered in EN is reported (warning, not error during incremental work).
- No EN file introduces new IDs.

Implementation can mirror the pattern in `scripts/qa-free-interrogation-policy.mjs` (already wired into `qa:fast`).

## 7. Out of Scope for This Intake

- Actual EN file scaffolding.
- `behaviorHint` translation policy.
- Tag-side EN equivalents (`judgeAddress.en`, `callTerm.en`).
- EN forbidden-lexeme set.
- Migration of TS modules to JSON overlays.

These are concrete next-step items for `IMPLEMENTATION_NOTES_FOR_CODEX.md`.

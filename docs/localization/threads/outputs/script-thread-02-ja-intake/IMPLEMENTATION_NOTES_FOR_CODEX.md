# Implementation Notes for Codex — Japanese Script Localization

This document recommends the next implementation architecture for script localization. It is practical, specific, and assumes Codex (or a separate engineering thread) will own runtime-loader changes and validators. It is NOT an instruction for ClaudeCode CT.

Scope of this note: locale-aware data loading + truth-boundary preservation + bulk-translation tooling. Out of scope: voice/TTS, LLM-fallback localization, UI-component i18n (already handled).

---

## 1. Loader Changes — Recommended Architecture

### 1.1 scriptedTextLoader.ts

Current shape: static imports `../data/scriptedText/spouse-01.json` etc. Loader is synchronous after module init.

Recommended change (Option A — sibling files):

```ts
// pseudocode
const koMods = import.meta.glob<ScriptedTextBundle>('../data/scriptedText/*.json', { eager: false })
const jaMods = import.meta.glob<ScriptedTextBundle>('../data/scriptedText/*.ja.json', { eager: false })
// + en, zh-CN later

async function loadScriptedText(caseId: string, locale: LocaleCode): Promise<ScriptedTextBundle> {
  if (locale !== 'ko') {
    const localeMod = pickLocaleMod(caseId, locale)
    if (localeMod) return mergeLocale(koMods[caseId], await localeMod())
  }
  return await koMods[caseId]()
}
```

`mergeLocale`: take KO bundle structure (IDs, keys, tags, sourceRefs, lieStates, channels), then for each variant copy `text` and `behaviorHint` from the locale bundle if present; else fall back to KO. This is **safer than treating the locale file as authoritative**: a mistakenly-omitted variant in the locale file silently shows KO instead of crashing.

Locale file shape (`src/data/scriptedText/spouse-01.ja.json`):

```json
{
  "schemaVersion": 1,
  "caseId": "spouse-01",
  "locale": "ja",
  "channels": {
    "interrogation": {
      "entries": [
        {
          "key": "a|d-1|S0|fact_pursuit",
          "variants": [
            { "id": "a-d-1-S0-fact-pursuit-v1", "text": "..." }
          ]
        }
      ]
    }
  }
}
```

Locale file omits `coverage`, `notes`, `tags`, `sourceRefs`, `stanceHint`, `truthLevel`, `lieState`, `disputeId`, `party`, etc. — those come from KO authoritative bundle. Only `key`, `id`, `text`, optional `behaviorHint` per entry.

### 1.2 scriptedAngleTextLoader.ts

Same pattern. Three companion file types per case (angle_catalog, judge_questions, interrogation_answers, special_scripts) each get sibling `.ja.json` files.

### 1.3 mediationScriptLoader.ts

Currently uses `import.meta.glob('./mediation/*.json')`. Add a parallel pattern:

```ts
const koMods = import.meta.glob<MediationModule>('./mediation/*.json')
const jaMods = import.meta.glob<MediationModule>('./mediation/*.ja.json')
```

Lookup logic: `loadMediationScript(caseId, locale)` resolves `<file>.<locale>.json` first; falls back to `<file>.json`.

### 1.4 caseLoader.ts (cases/generated)

`cases/generated/<caseId>.json` contains both player-visible strings (dossier labels, evidence surfaceName, dispute titles) and dev-facing fields (`meta.anchorTruth`, `partyA.fear`, `verbalTells.pattern`).

Recommendation: locale file mirrors the SAME structure; loader merges per-leaf:

```ts
function mergeLeafStrings<T>(ko: T, locale: Partial<T>): T { /* deep-merge string leaves only */ }
```

For dev-facing fields, JA literal translation is fine (those are not surfaced). The risk is documented in TRUTH_BOUNDARY_RISKS.csv.

### 1.5 witnessTestimonyData (TS files)

These are TypeScript modules with exported arrays. They cannot use file-based locale fallback as easily.

Two options:

(a) Convert to JSON: move `SPOUSE_01_TESTIMONY` array into `src/data/witnessTestimonyData/spouse-01.json` + `.ja.json` and have a single TS shim that loads them. Larger change but unifies the loader pattern.

(b) Keep TS but factor strings out: the TS file declares structure with KO defaults; a sibling `spouse-01.locale.ts` exports `{ ja: { 'w1-d1-visit-freq': { topic: '...', question: '...', testimony: '...', behaviorHint: '...' } } }`. Engine merges by id.

Option (a) is cleaner. Option (b) is faster to ship.

### 1.6 evidencePresentationScripts.ts / confessionScripts.ts / combinationComments.ts

Single TS files containing all 3 active cases. Same problem as 1.5. Option (b) (sibling locale-string-table) is the lighter touch. JSON conversion can be deferred.

---

## 2. Validation Script (new)

A `scripts/validate-locale-script-parity.mjs` that:

1. Walks every active KO bundle (`scriptedText/{spouse,family,friend}-01.json`, `scriptedAngles/*`, `dialogues/phase1/*.json`, `dialogues/mediation/{spouse,family,friend}-v3-01.json`, `cases/generated/*.json`)
2. For each KO bundle, checks the sibling `.ja.json` exists
3. Compares structural identity:
   - Every `key` in KO exists in JA
   - Every `id` in KO exists in JA
   - `coverage` block matches (counts, lists)
   - `lieState`, `lieBand`, `channel`, `disputeId`, `evidenceId`, `witnessId`, `angleId`, `questionType`, `subjectRole`, `stanceHint`, `truthLevel` are NOT in JA file (these stay in KO authoritative)
4. Per-string sanity:
   - JA `text` non-empty
   - JA `text` does NOT contain Korean characters (Hangul codepoint range)
   - JA `text` contains kanji or kana (validate it's actually Japanese)
5. Per-channel forbidden-lexeme audit:
   - Load JA forbidden-lexeme set (per-case extension to disclosure-policy.md)
   - For surface-only channels (`judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`, `system_message`, `dossier`), no forbidden lexeme may appear
   - For lieState-gated channels, lieState ∈ {S0, S1, S2} must not contain forbidden truth lexemes; S3+ allowed in blame-distribution context only; S5 free

Run via `npm run check:locale:ja` or fold into existing `npm run qa:fast`.

---

## 3. Bulk Translation Tooling

### 3.1 KO → JA bulk pipeline

Recommendation:

1. **Per-case extraction**: a script (`scripts/extract-translatable-strings.mjs`) walks a single case's bundles and emits a flat per-locale `.translation-input.csv` with columns `path | id | key | channel | lieState | truthBoundary | source_ko | proposed_ja | translator_note`.

2. **Translation step** (off-tool — GPT Pro / human translator session per memory `feedback_use_gpt_pro.md`): translator fills `proposed_ja`. **Memory `feedback_gpt_pro_claude_review.md` requires Claude review before applying.**

3. **Per-case re-injection**: a script (`scripts/apply-translations.mjs`) reads the filled CSV and writes `<file>.<locale>.json` files. It refuses to write if any `proposed_ja` is empty, contains Korean, or violates the per-channel forbidden-lexeme rules.

4. **Validation**: `validate-locale-script-parity.mjs` runs.

5. **Manual playthrough**: JA QA pass per case + per mediation path + per aftermath class.

### 3.2 LLM-assisted translation guardrails

If using LLM for first-pass JA translation:

- The prompt must include the per-entry `channel`, `lieState`, `truthBoundary` policy summary, AND the case-specific JA forbidden-lexeme set.
- The output validator must re-check: forbidden lexeme absence, length budget (system_message ≤ 30 JA chars/line), name-romanization consistency (`イ・ジュノ` not `イジュノ` or `Lee Junho`).
- Memory `feedback_revision_meaning_over_form.md` rule: bulk-LLM translation must be Claude-reviewed for 9-dimensional meaning accuracy (lieState progression, character archetype, character cognition stage, evidence-unlock timing, etc.) — not just word-replacement.

---

## 4. Disclosure-Policy Extension Required (P0 blocker)

JA bulk translation cannot start until `docs/disclosure-policy.md` (or sibling `.ja.md`) gains:

- §4.1 / §4.2 / §4.3 JA forbidden-lexeme equivalents (e.g. spouse-01: `兄` / `実の兄` / `甥` / `委任状の偽造` / `投資詐欺` / `身内の借金` / `家族の事情` / `家族を助ける`)
- §4.x JA paraphrase wedge set (e.g. `遠い親戚` / `身内` / `第三者への私的な対応`)
- Per-locale truth-boundary applies-to-which-channels matrix (probably identical to KO §3.3 but locale-team verified)

This is a CT/PROJECT_CONTROL_TOWER deliverable, not a Codex one — but Codex should refuse to ship JA bulk loaders until it lands.

---

## 5. Known-Risk Surfaces (Codex audit before JA bulk)

These are NOT runtime-translation issues but pre-existing surfaces that need a Codex audit so JA shipping doesn't expose them:

1. `dialogues/phase1/spouse-01.json` line ~131 references `형이 부모님 재산을 다 날린` in A's accusatory speech. KO arguably tolerates as past-family-discord narrative. JA literal would conflate with hidden truth — see TRUTH_BOUNDARY_RISKS.csv. **Recommend a CT/policy review BEFORE bulk JA pass.**

2. `cases/generated/spouse-01.json` `meta.anchorTruth` and `duo.partyB.fear` are dev-facing fields with truth lexemes. Confirm no UI surface reads these directly (grep all components for direct `meta.anchorTruth` access). If clean, JA literal is safe.

3. `cases/refined/*_texts.json` — older 280만원/돌봄센터 storyline. Confirm zero runtime references (already grep-confirmed in this thread for `cases/refined` import string — 0 hits in `src/`). If anyone DOES start using these, JA shipping breaks.

4. `dialogues/mediation/<inactive cases>` — ~120 legacy KO files bundled into the runtime via `import.meta.glob`. They are unreachable in active 3-case build BUT a future case-list expansion would surface them in KO with no JA. Codex decision: stub-translate OR add a build-time guard that fails if mediation file count exceeds `len(activeCases)`.

---

## 6. Test Plan (Codex-owned)

For shipping JA v1:

- [ ] Loader fallback works: with a missing JA file, KO is returned for that bundle (no crash, no blank UI).
- [ ] Loader fallback works at variant level: JA file with one missing variant returns KO for that variant.
- [ ] `npm run check:locale:ja` passes (structural parity + forbidden-lexeme audit).
- [ ] JA QA playthrough: spouse-01 → all 4 mediation paths → all 5 aftermath classes reachable in JA.
- [ ] JA QA playthrough: family-01, friend-01 same.
- [ ] System message length budget: every JA system_message variant fits ≤ 30 chars/line, ≤ 60 chars total.
- [ ] Hangul-leak audit: 0 Hangul codepoints in any rendered JA UI text (snapshot test of running game in JA).

---

## 7. Sequence (proposed)

1. **PROJECT_CONTROL_TOWER**: review pilot samples + glossary candidates + truth-boundary risks; lock decisions per `TEXT_FIELD_EXTRACTION_PLAN.md` §9.
2. **CT (ClaudeCode)**: extend `disclosure-policy.md` with JA forbidden-lexeme + paraphrase set.
3. **Codex (engineering)**: implement loader fallback (Option A); ship with JA file = empty placeholder (KO falls through). Tests pass.
4. **Codex**: implement `validate-locale-script-parity.mjs`. Tests pass.
5. **CT or GPT Pro session**: bulk-translate spouse-01 case files; Claude-reviewed.
6. **Codex**: re-injection + validation; ship spouse-01 JA. Manual JA playthrough.
7. **Repeat 5-6 for family-01, friend-01.**
8. **Codex**: end-to-end JA release-readiness QA gate; baseline tag.

Steps 1-2 are P0 blockers for step 3+. Step 3 is P0 blocker for step 5+.

---

## 8. Out of Scope (Reserved Memory Items)

- Memory `feedback_no_codex_on_uncommitted.md`: do not run Codex bulk translations on uncommitted-modified files. JA bulk pass must run on a clean working tree.
- Memory `feedback_qa_session_clean_worktree.md`: any locale validation session must enter on `git status` clean (untracked OK only if .gitignored).
- Memory `feedback_baseline_anchor_scripted_text.md`: ScriptedText changes are CT-Dev-area only and bump the baseline anchor; the JA pass adds NEW files (sibling .ja.json), so KO baseline anchor is preserved — but the JA-loader-extension PR will reset wrapper baseline once. Document this in the PR.

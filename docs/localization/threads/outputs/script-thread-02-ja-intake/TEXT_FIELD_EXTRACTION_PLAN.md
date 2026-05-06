# Text Field Extraction Plan — Japanese Script Localization

This plan describes how Japanese script localization should eventually be stored and applied **without breaking IDs, references, runtime loaders, or the disclosure / information-surface policies**.

It is a plan only — no `src/data/**` writes, no locale copies, no loader changes are produced in this pass.

---

## 1. Translation Unit Boundary

The translation unit for every active script surface is the **leaf string** (the human-language text), never the structural envelope.

For every entry, **only these fields are translation targets**:

| Surface | Translation-target fields |
|---|---|
| `scriptedText/*.json` | `variants[*].text`, `variants[*].behaviorHint` |
| `scriptedAngles/*_angle_catalog.json` | `angles[*].label`, `angles[*].description`, `angles[*].keywords[]`, `angles[*].unlockCondition.notes`, `angles[*].truthBoundary.beforeS5MustNotSay[]`, `.s5CanSay[]` (treat lexeme arrays as policy-bound, see §6) |
| `scriptedAngles/*_judge_questions.json` | `judgeQuestions[*].variants[*].text`, `.variants[*].behaviorHint` |
| `scriptedAngles/*_interrogation_answers.json` | `answers[*].variants[*].text`, `.variants[*].behaviorHint` |
| `scriptedAngles/*_special_scripts.json` | per-array variant `.text` and `.behaviorHint` (schema is `unknown[]` — audit each array's actual shape before extraction) |
| `dialogues/phase1/*.json` | `dialogues[*].text`, `dialogues[*].behaviorHint`, `dialogues[*].options[*].text` |
| `dialogues/mediation/*.json` (active 3 only) | `paths.{immediate\|conditional\|postpone\|fact_first}.judge`, `paths.*.dialogues[*].text`, `paths.*.dialogues[*].behaviorHint` |
| `cases/generated/*.json` | character/dispute/evidence/witness/dossier/combinationLab string leaves — see §3 truth/surface split |
| `witnessTestimonyData/*.ts` | `TestimonySlot[*].topic`, `.question`, `.testimony`, `.behaviorHint` |
| `evidencePresentationScripts.ts` | `facts[stage]`, `partyFacts[party][stage]`, `stances[party][lieBand]`, question-specific maps — leaf strings |
| `confessionScripts.ts` | `preConfession`, `confessionMain`, `postConfession` |
| `combinationComments.ts` | `comment` |

**Never translate**:

- Top-level identifiers: `caseId`, `schemaVersion`, `generatedAt`, `notes`
- Per-entry: `id`, `key`, `disputeId`, `evidenceId`, `witnessId`, `angleId`, `dossierQuestionId`, `partyId`, `lieState`, `lieBand`, `questionType`, `subjectRole`, `stanceHint`, `truthLevel`, `depth`, `eventType`, `context`, `resultClass`
- Reference pointers: every `tag` value (e.g. `channel:interrogation`, `speaker:a`, `judgeAddress:재판관님`) — tag values are runtime-keyed strings, not display text
- `sourceRefs[]` entries (e.g. `dispute:d-1`, `evidence:e-2`)
- `behaviorHint`'s structural content (e.g. honorific markers like `judgeAddress:재판관님`) when it appears verbatim inside a `tags[]` slot — but the prose inside `behaviorHint` itself **is** translation target, since it is stage-direction Korean prose
- Branching keys: `branchCondition`, `choiceId`, `c1_press_b` etc.
- Achievement / API names, file paths, env keys

---

## 2. Storage Architecture (recommended)

The runtime currently expects single-locale JSON files at fixed paths, loaded via:

- `src/engine/scriptedTextLoader.ts` (statically imports `../data/scriptedText/*.json` per active case)
- `src/engine/scriptedAngleTextLoader.ts`
- `src/data/dialogues/mediationScriptLoader.ts` (`import.meta.glob('./mediation/*.json')`)
- `src/data/cases/caseLoader.ts`
- `src/engine/witnessEngine.ts`

We must NOT rewrite the loaders for the JA pilot. The recommended architecture (final shape, decided after pilot):

### Option A — sibling locale files (RECOMMENDED)

```
src/data/scriptedText/
  spouse-01.json          # KO source (current)
  spouse-01.ja.json       # JA translation (new)
  spouse-01.en.json       # EN translation (future)
  spouse-01.zh-CN.json    # zh-CN translation (future)
```

Loader change (one-time, separate Codex task):

- Loader takes a `locale: LocaleCode` argument
- For non-`ko`, attempt to load `<file>.<locale>.json`; on miss, fall back to `<file>.json` (KO)
- Locale-specific files share schema, IDs, keys, channel structure with KO source — **only `.text` and `.behaviorHint` differ**
- Validation step (added later): for every variant in KO, the same `id` and `key` must exist in the locale file with non-empty `text`

Why Option A:

- Minimal loader churn (one extra `import.meta.glob` pattern per existing loader, or a lookup helper)
- No schema migration of existing files
- Reviewers / CT can diff KO ↔ JA per file
- Same approach already used for UI messages (`src/i18n/messages/*.ts` keys per locale)

### Option B — per-entry inline localization

```jsonc
{
  "id": "a-d-1-S0-fact-pursuit-v1",
  "text": { "ko": "...", "ja": "...", "en": "...", "zh-CN": "..." },
  "behaviorHint": { "ko": "...", "ja": "..." }
}
```

Reject for now: balloons file size 4×, breaks every existing reader, much higher diff cost.

### Option C — separate parallel locale tree

```
src/data/i18n/ja/scriptedText/spouse-01.json
src/data/i18n/ja/scriptedAngles/...
```

Acceptable alternative to Option A. Slightly cleaner namespace, but doubles `import.meta.glob` patterns per loader. Use only if Option A produces directory-listing clutter.

**Pilot pass writes none of these.** Pilot pass produces only `PILOT_TRANSLATION_SAMPLES.json` in this thread's output directory.

---

## 3. Truth / Surface Split (CRITICAL — disclosure-policy.md compliance)

Every translated string must inherit the **same truth-disclosure tier** as its KO source. The translator MUST consult these per-entry signals before phrasing:

1. `channel` (from `tags[]` or surface filename)
   - `judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`, `system_message`, `dossier` (안내) → **surface-only forever**, no truth lexemes regardless of lieState
   - `interrogation`, `contradiction_pursuit`, `evidence_present`, `mediation`, `trust_action` → **lieState-gated**: at S0/S1/S2 surface only; partial allowed S3+; full at S5
   - `confession` (in `confessionScripts.ts`) → S5 confession content, truth lexemes allowed
   - `aftermath` → post-verdict, truth fully allowed
   - `emotional_overload` → S4+ only

2. `lieState` (from entry or `tags[]`)
   - S0/S1: NPC may not name truth subjects (per disclosure-policy.md §3.1 Truth Throttle — "그 사람", "해당 금액")
   - S2: paraphrase risk; check disclosure-policy.md §4.1-4.3 paraphrase set
   - S3: partial truth allowed in blame-distribution context
   - S4: emotional reveal allowed
   - S5: full disclosure

3. `evidenceStage` (for evidence_present entries / discoveryText)
   - stage 0: surfaceName + surfaceDescription only
   - stage 1: surface + circumstantial only
   - stage 2 (deepInvestigated): partial truth, but never earlier than NPC confession

4. Case-specific forbidden lexeme set (from `docs/disclosure-policy.md` §4.1-4.3)
   - spouse-01: 형 / 친형 / 조카 / 위임장 조작 / 투자 사기 / 형의 오피스텔 / 형 빚 …
   - family-01: 출생 비밀 / 배다른 / 자기 몫을 줄인 조작 / 20년 동안 매달 보낸 / 60:40 …
   - friend-01: 예비신랑이 먼저 / 아버지의 사기 / 같은 패턴 반복 / 선넘는 메시지 …

**JA forbidden-lexeme set must be derived per-case before bulk translation** and added as an extension to `docs/disclosure-policy.md` (or a sibling `disclosure-policy.ja.md` lexeme appendix). Direct word-for-word translation of every KO forbidden lexeme is the safe default but should be reviewed by a JA native — JA paraphrase patterns differ.

See `TRUTH_BOUNDARY_RISKS.csv` for the highest-risk JA phrasings discovered during the pilot.

---

## 4. ID / Reference Integrity

For each translated file, the following must remain bit-identical to the KO source:

- `caseId`
- `schemaVersion`
- `coverage` block (counts, lists)
- All `id` values inside `variants[]` / `entries[]`
- All `key` values
- All structural array order (variants v1 → v10 must stay v1 → v10 in the same slot)
- All `tags[]` values
- All `sourceRefs[]` values
- All `behaviorHint` honorific tag tokens (`judgeAddress:재판관님` etc.) when present in `tags[]`

A future validation script (Codex task) should compare KO and JA files at structural level (jq `paths`-equivalent) and fail loudly on any divergence.

---

## 5. behaviorHint Translation

`behaviorHint` is Korean prose stage-direction (e.g. "입술을 깨물다 터뜨리듯 말을 시작한다."). It is **not displayed to the player** — but downstream tooling (LLM resolvers, future TTS, future cinematics) may consume it, so:

- Translate to natural JA prose stage direction
- Preserve emotional register (defensive vs cornered vs collapsed)
- Keep length similar (±20%) to avoid drift in any future length-budgeted UI
- It is acceptable to leave `behaviorHint` in KO for the JA pilot if scope is tight — declare this explicitly in the per-file translator note

---

## 6. truthBoundary Lexeme Arrays (angle_catalog)

`truthBoundary.beforeS5MustNotSay[]` and `.s5CanSay[]` arrays are policy data that doubles as a guard input. For JA:

- Translate each lexeme to its **most natural JA equivalent** AND retain the **KO original** in a sidecar (or a `*_ko` field), because the runtime guard currently matches on KO surface text
- Until runtime gains JA guard support, the JA versions of these arrays serve as documentation only
- This is also a Codex / policy-engine task — flag it but do not implement now

---

## 7. Pilot → Bulk Workflow (recommended sequence)

1. **(this pass)** Pilot samples + glossary candidates + truth-boundary risks (current thread)
2. **PROJECT_CONTROL_TOWER review** — accepts/edits glossary candidates, locks JA forbidden-lexeme set, picks Option A vs C
3. **Loader extension** (separate Codex thread) — locale-aware file resolution, KO fallback, structural-parity validator
4. **Bulk translation per case** — spouse-01 first (fully covered by pilot patterns), then family-01 (paraphrase-rich), then friend-01
5. **Per-channel QA gate** — every channel passes structural-parity + forbidden-lexeme audit before next case
6. **End-to-end JA playthrough** — all 3 cases playable in JA, all 4 mediation paths reachable, all aftermath classes reachable

Bulk translation must NOT happen before steps 1–3 are signed off.

---

## 8. Out of Scope for This Plan

- Runtime locale detection / switching UI (already exists at `src/i18n` layer)
- LLM fallback resolver JA support (`llmDialogueResolver.ts`)
- Voice / TTS — not active
- Aftermath LLM generation — separate engine, not script data

---

## 9. Open Questions for PROJECT_CONTROL_TOWER

These need decisions before the bulk JA pass starts:

1. Option A (sibling files) vs Option C (parallel tree) for locale storage?
2. Does `behaviorHint` need full JA translation, or is KO acceptable for v1 JA release?
3. JA forbidden-lexeme set ownership: extend `disclosure-policy.md` in-place, or add `disclosure-policy.ja.md`?
4. `cases/refined/*_texts.json` files (older 280만원 storyline) — confirmed legacy / safe to skip for JA?
5. Mediation files for inactive cases (~120 files in `dialogues/mediation/`) — skip JA, or stub-translate to avoid runtime KO leakage if a non-active case is ever invoked?

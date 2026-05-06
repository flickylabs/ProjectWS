# Implementation Notes for Codex — EN Script Localization

This is the recommended next-step architecture for English script localization. Practical, specific, ordered by what unblocks the next.

## 1. Lock the brand and address registers first (small, blocking)

Before any pilot bulk translation lands, lock these as glossary entries:

- `Your Honor` — vocative form of `재판관님` in spoken lines. UI glossary already has `judge=Judge` (referential) but no vocative.
- Per-relationship dyad vocatives (`my husband` / `my wife` for spouse-01, `my older brother` / `my younger brother` for family-01, `my friend` for friend-01) — these surface in dozens of NPC self-reference and address tag-values across `scriptedText/*.json`.
- `studio apartment` for `오피스텔`, `dashcam` for `블랙박스`, `joint savings (account)` for `공동 적금`, `personal slush fund` for `개인 비자금`, `power of attorney` for `위임장`. These recur in 50+ entries each in spouse-01.
- Vocative `Honey` for KO `자기야` between A↔B. Confirm tone register.

Add these to `docs/localization/glossary.csv` as new rows (or extend existing rows). Mark `locked=true` once Project Control Tower confirms.

## 2. Adopt parallel-locale overlay storage (Option B from `TEXT_FIELD_EXTRACTION_PLAN.md`)

**Decision needed first.** Three candidates:

- A — inline `text.{locale}` per variant (mutates source).
- B — parallel `*.en.json` overlay alongside KO (recommended).
- C — UI-only i18n, KO content (current state).

Recommendation: **B**. It preserves `baseline-pre-policy-v3` anchor, keeps KO source untouched, lets EN ship case-by-case, and the `check:policy` wrapper continues to operate unchanged on KO source.

If B accepted, Codex implements:

- An overlay loader in `src/engine/scriptedTextLoader.ts` (and the equivalent in `mediationScriptLoader.ts`, the angles loader, phase1 loader) that reads `<file>.{locale}.json` next to the KO file when `locale !== 'ko'`, walks `caseId + variantId` (or path-based key) to overlay `text` only.
- A no-op fallback to KO when the EN entry is missing.
- A build/CI script `scripts/check-locale-overlay.mjs` that verifies every EN `id` resolves in KO source. Mirror the pattern used by `scripts/qa-free-interrogation-policy.mjs`.

## 3. Migrate the three TS-source content modules to JSON before EN translation

`src/data/evidencePresentationScripts.ts`, `src/data/confessionScripts.ts`, `src/data/combinationComments.ts`, and the three `src/data/witnessTestimonyData/*.ts` modules embed text inside object literals. There is no place to put EN text without editing TS source — and TS edits in this scope require CT-Main change-control per `memory/feedback_baseline_anchor_scripted_text.md`.

Recommended migration:

```
src/data/
  evidencePresentation/
    {caseId}.ko.json          ← extracted KO content
    {caseId}.en.json          ← EN overlay (post-pilot)
  confessions/
    {caseId}.ko.json
    {caseId}.en.json
  combinationComments/
    {caseId}.ko.json
    {caseId}.en.json
  witnessTestimony/
    {caseId}.ko.json          ← migrated from witnessTestimonyData/{caseId}.ts
    {caseId}.en.json
```

Each TS module becomes a thin shim:

```ts
// evidencePresentationScripts.ts (shim)
import { getEvidencePresentationScript as fromJSON } from './evidencePresentation/loader'
export { fromJSON as getEvidencePresentationScript }
```

Keep the existing exported function signatures so callers don't need to change.

## 4. Tag-side EN equivalents

`scriptedText/*.json` variants have tags like `judgeAddress:재판관님` and `callTerm:제_남편`. These are not currently UI-rendered — they exist as runtime control signals — but they leak Korean address forms into a debugging surface.

Two valid approaches:

1. **Decouple at runtime.** Render `judgeAddress` from a per-locale message map (`commonMessages[locale].judgeAddress.spokenVocative`). Tag value becomes a key (`judgeAddress:vocative`) instead of literal Korean. Smaller tag-value churn but requires loader code change.
2. **Locale-tagged values.** Add EN equivalents alongside KO: `judgeAddress.ko:재판관님`, `judgeAddress.en:Your Honor`. Larger source-data delta.

Approach 1 preferred (smaller diff over 14,931 variants).

## 5. EN forbidden-lexeme set for the disclosure guard

`docs/disclosure-policy.md` defines KO forbidden lexemes per case. The EN side needs a parallel set before any Tier 3 LLM/Fallback Guard expansion ships.

Per case, draft a `disclosurePolicy/{caseId}.en.json` with these sections:

- `globalTruthLexemes.en[]` — direct EN equivalents of KO truth lexemes. spouse-01 example: `["older brother", "my brother", "nephew", "my nephew", "middle-school nephew", "forged power of attorney", "investment fraud", "brother's debt", "brother's studio apartment"]`.
- `paraphraseSet.en[]` — EN paraphrase variants (e.g. `["a relative", "blood family", "a family member"]` mirroring the KO paraphrase guard).
- `surfaceMap.en` — surface text for evidence/dossier fields (e.g. `evidence.e-4.surfaceName.en = "text from an unknown sender"`, `evidence.e-4.name.en = "brother's text thread"` — mirrored only for guard parity, never UI-rendered).

Codex owns this artifact. CT-Main reviews semantic accuracy.

## 6. Length / register checks before EN ships

`docs/information-surface-policy.md` §6.3 caps system messages at ≤ 30 chars / single line and ≤ 60 chars / two lines (KO). EN equivalents will exceed those caps almost universally. Two options:

1. **Relax caps for EN.** Decide a target width (~50 chars / single, ~100 / two) per `pc.css` panel measurement. Document in style-guide.
2. **Aggressively rewrite.** Force EN system messages to fit KO caps. This often sacrifices natural register.

Recommendation: **option 1**, with an EN-specific length lint in CI.

## 7. Pilot expansion order (post-intake)

When the team is ready to move past pilot:

1. **spouse-01 first**, complete: scriptedText (1,440 interrogation variants, 1,470 evidence_present, etc.), scriptedAngles (660 judge_q + 7,920 answers), special_scripts (~136 entries), phase1 (34 lines + branching), mediation (spouse-v3-01.json), case data surface fields (uiSurfaceMap), witnessTestimony, evidencePresentationScripts (spouse-01 chunk), confessionScripts (spouse-01 chunk), combinationComments (spouse-01 chunk).
2. **family-01** second.
3. **friend-01** third.
4. Inactive `*-new-*` mediation files only after the active 3 are done.

Per case rough volume (text strings only, exclusive of behaviorHint and tags): **~5,000–10,000 strings per case**. spouse-01 alone is ~10,000 translatable strings if `evidence.name` truth fields are mirrored; ~6,500 if only surface fields are mirrored.

## 8. Don't do these (explicit)

- Do **not** translate `behaviorHint` (writer note for the KO content team).
- Do **not** translate variant `id`, channel name, dispute id, evidence id, witness id, dossier id, angle id.
- Do **not** translate truth-channel fields (`evidence.e-4.name`, `dossier card label` truth form) without a paired surface fallback.
- Do **not** add new IDs in EN files.
- Do **not** mutate `src/data/cases/refined/*_texts.json` — that file family is legacy and is not loaded at runtime (`caseLoader.ts` only reads the `manifest.json`, not the `_texts.json` content).
- Do **not** translate `src/data/legacy/dialogues/*.ts` — pre-V4 legacy dialogue, not active.

## 9. Acceptance gates before EN content ships

- Glossary entries §1 above are `locked=true`.
- Storage architecture §2 is decided and merged (loader + CI check).
- `behaviorHint` policy is decided (default: KO-only).
- EN forbidden-lexeme set §5 is drafted for at least spouse-01.
- System-message length policy §6 is documented in style-guide.
- A QA wrapper (`qa:locale-overlay` or extension of `qa:fast`) confirms EN IDs resolve.

Once those land, Codex can land EN spouse-01 in one merge, family-01 next, friend-01 last.

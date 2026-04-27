# Safe Fallback Quality Review

Date: 2026-04-27

## Review Result
- Existing 6 NPC x 4 lieState fallback matrix remains intact.
- New safe-context fallback variants are used only for:
  - `unmapped_intent`
  - `low_confidence_mapping`
  - `evidence_unavailable`
- The variants do not mention hidden truth lexemes, locked evidence details, or internal system terms.
- The variants keep `재판관님` honorific framing and avoid translationese patterns listed in `CLAUDE.md`.

## Archetype Fit
- `spouse-01:a` victim_cosplay: acknowledges the question is outside the relevant frame without becoming clinical.
- `spouse-01:b` avoidant: draws a cautious boundary and stays indirect.
- `family-01:a` confrontational: gives a firmer boundary while keeping courtroom tone.
- `family-01:b` affect_flattening: restrained and low-emotion.
- `friend-01:a` premature_summary: concise boundary with controlled insistence on relevance.
- `friend-01:b` affect_flattening: brief, contained, and non-escalating.

## LieState / Disclosure Check
- S0-S2 truth leak risk: no hidden lexemes in the new safe-context variants.
- Locked evidence: `evidence_query` can be recognized, but no `evidenceRef` or dispute dispatch is produced until the evidence is unlocked.
- Fallback side effects: intended to remain chat-only; no VFX/observation/notebook/statement-note mapping is introduced in this session.

# Phase A Audit — Free Question Hygiene

Date: 2026-04-27

## Scope Restored
- Write scope kept to `src/engine/freeInterrogation/*` plus this QA output directory.
- Do-not-touch areas: source label rendering, `src/app/pc.css`, emergence/discovery/gating engines, API proxy, ScriptedText, and caseData.

## Findings
- `intentClassifier.ts`
  - `당신은 누구십니까?` matched `relation_query` because the relation rule accepted bare `누구`.
  - System/meta inputs such as save/load/phase/UI questions were not broadly caught before intent scoring.
  - Vague anaphora such as `그런 의심...` could score as `motive_search` without a concrete case anchor.
- `contextMapper.ts`
  - With a target selected, unresolved mapped intents could fall through to active dispute or the first target lieState dispute.
  - Locked evidence mentions could become `evidence_query` and still route through an active or fallback dispute.
  - Evidence split-token matching could overmatch generic words such as `기록`.
- `fallback.ts`
  - The existing guard matrix is safe for LLM guard failures, but `unmapped` meta/off-topic inputs benefit from a more direct safe-context fallback that does not pretend the question is case-relevant.

## Required Policy Alignment
- `unmapped` must not create VFX, observation, notebook, or statement-note side effects.
- S0-S2 fallback text must not reveal hidden truth lexemes.
- Safe fallback should remain in Korean natural honorific style and fit each NPC archetype.

# Phase B Fix Summary

Date: 2026-04-27

## Changed Files
- `src/engine/freeInterrogation/intentClassifier.ts`
  - Added preflight `unmapped` handling for identity/meta/off-topic/filler inputs.
  - Removed bare `누구` from the relation rule so identity questions do not become relation queries.
  - Added ambiguous-reference handling for disconnected `그런/그 부분/그 말/그 행동` questions.
  - Added LLM classifier confidence floor: low-confidence non-`unmapped` LLM classifications become `unmapped`.
- `src/engine/freeInterrogation/contextMapper.ts`
  - Added a context mapping confidence floor.
  - Removed fallback to the first lieState dispute.
  - Limited active dispute mapping to sufficiently confident, non-evidence intents.
  - Split evidence mention from unlocked evidence mapping so locked evidence can classify as `evidence_query` without dispatch.
  - Excluded generic evidence tokens such as `기록` from split-token evidence matching.
- `src/engine/freeInterrogation/index.ts`
  - Stopped fallback context from reusing active dispute for `unmapped`, low-confidence, or unavailable-evidence paths.
  - Added explicit fallback reasons for `unmapped_intent`, `low_confidence_mapping`, and `evidence_unavailable`.
- `src/engine/freeInterrogation/fallback.ts`
  - Added safe-context fallback variants per NPC for off-topic/meta/low-confidence/unavailable-evidence paths.

## Not Changed
- Source label rendering: untouched.
- `src/app/pc.css`: untouched.
- emergence/discovery/gating/API proxy/ScriptedText/caseData: untouched.
- 7-intent taxonomy: unchanged.

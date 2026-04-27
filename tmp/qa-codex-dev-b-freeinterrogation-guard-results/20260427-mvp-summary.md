# Codex-Dev B MVP Summary — Free Interrogation Guard

Date: 2026-04-27
Scope: P0-B free interrogation guard / fallback / API failure handling

## Implemented

- `src/types/freeInterrogationGuard.ts`: guard, fallback, issue, mode, NPC/bucket types.
- `src/engine/freeInterrogation/guard.ts`: `evaluateFreeInterrogationResponse`, `callFreeInterrogationApiText`, feature flag `VITE_FREE_INTERROGATION_GUARD_MODE=off|log|fallback` with default `fallback`.
- `src/engine/freeInterrogation/fallback.ts`: 6 NPC x 4 lieState buckets x 3 variants = 72 fallback entries.
- `src/engine/freeInterrogation/heuristic.ts`: empty response, unmapped intent, intent mismatch, archetype mismatch checks.
- `src/engine/llmFreeQuestion.ts`: LLM free-question responder now uses 5s timeout/retry and parsed-response guard fallback.
- P0-A compatibility was preserved in `src/engine/freeInterrogation/index.ts`.

## Artifact Results

- `fallback-matrix.json`: 72 entries, 6 NPCs, 4 buckets per NPC, min 3 variants per cell.
- fallback matrix scan: 0 forbidden lexeme / translationese pattern issues.
- `lexeme-sample-results.json`: 50/50 expected fallback samples.
- `heuristic-detection-samples.json`: 9/9 expected fallback samples.
- `api-failure-simulation.log`: timeout x5 and empty response x3 all recorded as fallback / gameStopped=false.

## Verification

- `npx tsc -b --force`: PASS
- `npm run build`: PASS
- `npm run check:all`: PASS
  - hard issues: 0
  - known warnings: 157

## Notes

- `VITE_DISCLOSURE_GUARD_MODE` was not changed.
- `src/engine/disclosureGuard.ts` was not modified.
- `docs/disclosure-policy.md`, ScriptedText, caseData, and pc.css were not modified by this task.

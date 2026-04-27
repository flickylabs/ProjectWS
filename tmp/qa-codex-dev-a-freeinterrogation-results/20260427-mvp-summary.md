# 20260427 MVP Summary — Limited Free Interrogation MVP

## Result

MVP implementation completed for P0-A.

## Files Added

- `src/types/freeInterrogation.ts`
- `src/engine/freeInterrogation/intentClassifier.ts`
- `src/engine/freeInterrogation/contextMapper.ts`
- `src/engine/freeInterrogation/index.ts`
- `src/components/freeInterrogation/FreeQuestionInput.tsx`

## Integration

- `src/types/dialogue.ts`: `PlayerAction` question actions now accept `freeInterrogation` metadata.
- `src/hooks/useActionDispatch.ts`: free interrogation uses the raw player question as the judge line and skips V2 scripted beat output.
- `src/engine/llmDialogueResolver.ts`: free interrogation skips ScriptedText, injects the raw judge question into the existing blueprint prompt path, and calls the P0-B guard/fallback hook after NPC response generation.
- `src/components/pc/hotbar/PCBottomDock.tsx`: free question slot is hidden unless `VITE_FREE_INTERROGATION_MODE=preview|on`; max length is 100.
- `src/components/actions/QuestionSelector.tsx`: non-PC free question card is also feature-flagged.

## Feature Flags

- `VITE_FREE_INTERROGATION_MODE=off|preview|on`
- Default: `off`
- `preview`: UI visible, deterministic classifier only.
- `on`: UI visible, deterministic classifier plus LLM-aided fallback classification.

## 35-Sample Coverage

- `intent-classifier-samples.json`
- 7 intents x 5 samples = 35
- Cases covered: spouse-01 / family-01 / friend-01
- Result: 35 PASS / 0 FAIL

## Failure Criteria

| # | criterion | status |
|---|---|---|
| 1 | empty / `...` / no response | PASS via P0-B fallback hook interface |
| 2 | generic fallback only | PASS, mapped responses use existing NPC pipeline; fallback matrix is character keyed |
| 3 | intent mismatch | PASS in 35-sample taxonomy table |
| 4 | character mismatch | PASS via existing blueprint archetype prompt and P0-B heuristic hook |
| 5 | S0-S2 truth leak | PASS via existing disclosure guard reuse in P0-B guard path |
| 6 | honorific collapse | PASS via existing `postProcessNpcText` pipeline |
| 7 | game stop on free interrogation failure | PASS at hook level; API failure log captured separately |

## Verification

- `npx tsc -b --force`: PASS
- `npm run check:all`: PASS (0 hard issues, 157 baseline-known warnings)
- `npm run build`: PASS

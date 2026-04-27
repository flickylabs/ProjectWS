# 20260427 Spike Summary — Codex Dev A Free Interrogation

## Scope

- Phase A spike for limited free interrogation MVP.
- Implemented the deterministic 7-intent classifier and context mapping path.
- Verified the intended spouse-01 spike path uses `freeInterrogation.rawText` as the judge question and bypasses ScriptedText/V2 beat response shortcuts.

## Spike Samples

| sample | case | intent | target | dispute | result |
|---|---|---|---|---|---|
| "그날 오피스텔에 정말 갔습니까?" | spouse-01 | fact_pursuit | b | d-1 | PASS |
| "왜 그 돈을 말하지 않고 움직였습니까?" | spouse-01 | motive_search | b | d-2 | PASS |
| "그때 혼자 의심하면서 많이 힘드셨겠네요." | spouse-01 | empathy_approach | a | d-1 | PASS |
| "발신자 미상 문자에 대해 설명해 보십시오." | spouse-01 | evidence_query | b | d-1 / e-4 | PASS |
| "오늘 날씨 어때요?" | spouse-01 | unmapped | null | null | PASS fallback |

## Implementation Notes

- `VITE_FREE_INTERROGATION_MODE` defaults to `off`.
- `preview` mode uses deterministic rules only; `on` mode enables LLM fallback classification.
- Free interrogation dispatches a normal `question` action with `freeInterrogation` metadata, so existing turn, meter, transition, and LLM resolver behavior is reused.
- ScriptedText and V2 beat shortcuts are skipped only for free interrogation actions to preserve the requested LLM pipeline reuse.

## Verification

- `npx tsc -b --force`: PASS


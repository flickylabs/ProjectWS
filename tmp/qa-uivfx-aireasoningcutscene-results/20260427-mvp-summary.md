# AI Reasoning Cutscene MVP Summary

Date: 2026-04-27
Thread: UIVFX-Dev AIReasoningCutscene

## Scope

- Added `triggerAIReasoningCutscene(...)` hook and first-success tracking.
- Added major cutscene for the first mapped free-interrogation success per case.
- Added compact VFX for repeated mapped free-interrogation success.
- Connected mapped target/dispute/evidence chips to existing UI targets through `data-*` selectors.
- Reused `ResonanceLayer` queue for the primary mapped line and aura calls for connected targets.
- Added separate CSS module: `src/styles/aiReasoningCutscene.css`.
- `src/app/pc.css` was not touched.

## Trigger Rules

- Dispatch path only: `result.status === 'dispatch'`.
- `unmapped` produces no cutscene/VFX output.
- First mapped success per normalized case id uses the major sequence.
- Later mapped successes use compact VFX.

## Surface Text

Visible cutscene text is limited to surface wording:

- 질문 분석
- 대상
- 의도
- 쟁점
- 증거
- 쟁점 연결
- 관련 증거 확인
- 질문 경로 확정

No internal English pipeline terms are rendered in the UI.

## Verification

- `npx tsc -b --force`: PASS
- `npm run check:all`: PASS, hard 0, existing warn-only policy warnings remain
- `npm run build`: PASS
- `http://localhost:5174/index-pc.html`: HTTP 200
- `http://localhost:5173/`: HTTP 200

## Notes

- Existing `ResonanceLayer` hierarchy allows one lightning line per turn. The cutscene therefore queues the primary mapped line and applies aura to all available connected targets without changing hierarchy cooldown rules.

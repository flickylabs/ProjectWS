# Phase C Verification — spouse-01 Phase 2 Spoiler Cascade Fast Fix

Date: 2026-04-27

## Commands

- `npm run check:all` — PASS
  - truth-leak: 0 leaks across 3 cases
  - hard pass: 9/9
  - known warnings remain in policy cross-check / legacy precheck matrix
- `npm run build:pc` — PASS
  - Vite chunk-size / dynamic import warnings only
- `npx tsc -b --force` — PASS
- `git diff --check` — PASS
  - CRLF normalization warnings only

## Grep Checks

- `rg "형 문자 스레드" src/hooks src/components src/engine` — 0 results
- UI source badge path removed from `src/components/pc/layout/PCDialogueLog.tsx`
- `rg "entry\\.source|source\\.toUpperCase|발화 출처|\\[SCRIPT\\]|\\[FALLBACK\\]|\\[LLM\\]" src/components src/hooks src/engine`
  - Remaining `[LLM]` hits are console diagnostics or collector data, not rendered UI.
- `rg "형 사정 때문에 현금|형 사정과 비자금|형에게 2,000만원|형에게 갔|형에게 건넸" src/data/emergenceHooks.ts`
  - Remaining hits are confession/resignation variants only.

## Manual UI Verification

Playwright captured contradiction/interrogation popup layout in PC flow:

- Before CSS override:
  - desktop contrast-wrap padding `0px / 0px`
  - mobile contrast-wrap padding `0px / 0px`
- After fix:
  - desktop contrast-wrap padding `28px / 28px`
  - mobile contrast-wrap padding `18px / 18px`
  - mobile card fits inside `390px` viewport with `24px` outer margin on both sides.

## Commit Boundary Note

The final hotfix state includes the surfaceName hardening files required for this session:

- `src/components/layout/CourtLayout.tsx`
- `src/data/claimPolicies/spouse-01-structure-v2.json`
- `src/engine/clearanceTracker.ts`

`spouse-01` evidence `e-4` keeps the internal name `형 문자 스레드` and exposes the player-facing `surfaceName` `발신자 미상 문자`.

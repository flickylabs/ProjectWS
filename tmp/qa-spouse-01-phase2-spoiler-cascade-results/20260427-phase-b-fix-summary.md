# Phase B Fix Summary — spouse-01 Phase 2 Spoiler Cascade Fast Fix

Date: 2026-04-27

## Fixes Applied

1. Surface name consistency
   - Added `getEvidenceDisplayName()` in `src/hooks/useActionDispatch.ts`.
   - UI/system evidence messages now use `surfaceName` until `deepInvestigated`.
   - Patched remaining PC surface display paths in perk choice, discovery feedback, and minigame overlay.

2. Chain unlock gating
   - `discoverEvidenceFromQuestioning()` now receives the question type.
   - `fact_pursuit` no longer auto-discovers related locked evidence.
   - Related evidence unlock now respects `requiredLieState`.
   - Contradiction pursuit can still call the discovery path after a successful contradiction transition.

3. Dispute emergence gating
   - `src/hooks/useDiscoveryIntegration.ts` now applies spouse-01 route gates:
     - `d-2` requires e-4 to have an evidence stage.
     - `h-d3` requires `d-2` plus e-5.
     - `h-d4` requires `d-2`, `h-d3`, e-6, and e-7.
   - Disabled the generic `gameEventTriggerEngine` hidden-dispute fallback that could cascade from a broad S3 transition.

4. Early NPC truth leak copy
   - `src/data/emergenceHooks.ts` attack variants now stay ambiguous in early/attack contexts.
   - Explicit `형 사정`, `형에게 2,000만원`, and `현금으로 전한` wording remains only in confession/resignation contexts.

5. Internal source labels
   - Removed the dev UI badge in `PCDialogueLog.tsx` that rendered `[{entry.source.toUpperCase()}]`.
   - Remaining `[LLM]` strings are console diagnostics only, not UI.

6. Popup layout
   - `src/app/pc.css` gives `.pc-interaction-card__contrast-wrap` real horizontal padding.
   - Mobile modal/card max-width now clamps to `calc(100vw - 32px)`.
   - Mobile contrast grids collapse to one column to preserve readable side padding.

## Screenshots

- Before:
  - `screenshots/before/contradiction-popup-before-desktop.png`
  - `screenshots/before/contradiction-popup-before-mobile.png`
- After:
  - `screenshots/after/contradiction-popup-desktop.png`
  - `screenshots/after/contradiction-popup-mobile.png`

## Layout Metrics

- Before contrast-wrap padding: desktop `0px / 0px`, mobile `0px / 0px`.
- After contrast-wrap padding: desktop `28px / 28px`, mobile `18px / 18px`.
- Mobile after card bounds: viewport `390px`, card `left 24`, `width 342`, `right 366`.

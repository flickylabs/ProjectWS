# Q3 Release Regression Audit Summary

Date: 2026-05-20 KST  
HEAD: `2f2785f07a41de7802e4ec244f3639cdc97e89e7`

## P0 Count

P0 found: 0

No P0 i18n issue was found, so no product code or copy patch was applied.

## Release Recommendation

Recommendation: do not release from this state.

Reason: P0 is 0, but the static suite is not green and several P1 regressions remain:

- `npm run qa:fast`, `npm run qa:deep`, `npm run qa:lqa`, and `npm run lint` failed.
- `npm run lint` has 2 errors: unused `manualCloseOnly` in `EventFeedbackCard` and unused `portraitAlt` in `TruthRevealCutscene`.
- `observation-hint` copy says the tutorial auto-advances, but code requires a click.
- S/XS bucket left-panel height math can clip lower left-rail sections.
- Decisive-clue stamp can visually cover the feedback close X.

Passing checks: `qa:cutscene -- --strict`, `qa:free-interrogation`, `npx tsc -b --force`, and supplemental truth-leak detection.


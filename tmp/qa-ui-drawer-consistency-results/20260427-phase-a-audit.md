# UI Drawer Consistency Fix - Phase A Audit

Date: 2026-04-27
Scope: 사건 타임라인, 발언 노트, 재판관의 관찰, 재판관의 수첩
Baseline: 재판관의 관찰 drawer (`JudgeObservationHistoryDrawer.tsx`)

## Entry Status

- `git pull origin main`: already up to date
- HEAD: `986fb26 docs(handoff): Route Simulator (P1) - lightweight QA harness MVP`
- tracked worktree before edits: clean
- observed untracked: `17212`, `39568`, `tmp/CODEX-MAIN-HANDOFF-20260427-P0-PARALLEL.md`, `tmp/qa-release-results/`, `tmp/qa-script-polish-audit-results/`
- initial checks: `npm run check:all` PASS, `npm run build:pc` PASS, `npx tsc -b --force` PASS

## Component Map

- 사건 타임라인: `src/components/pc/panels/PCCaseTimelineSection.tsx`
- 발언 노트: `src/components/pc/panels/PCImportantNotesSection.tsx`
- 재판관의 관찰: `src/components/pc/observation/JudgeObservationSection.tsx`, `src/components/pc/observation/JudgeObservationHistoryDrawer.tsx`
- 재판관의 수첩: `src/components/pc/observation/JudgeNotebookSection.tsx`
- 수첩 drawer component: `src/components/pc/observation/JudgeNotebookHistoryDrawer.tsx` is missing

## Findings By Consistency Area

1. Panel shell: timeline, notes, and observation share a fixed left-side drawer shell on desktop, but observation had lower z-index and mobile positioning was offscreen.
2. Border/divider: common late CSS already normalizes gold border/radius; notes filter divider needed the same divider treatment.
3. Spacing/padding: common drawer padding exists; mobile needed shared inset rules.
4. Header layout: observation has icon + title + close. Timeline had icon but notes drawer title had no icon.
5. List item layout: observation uses icon dots on a vertical rail. Timeline computed icon IDs but rendered empty dots. Notes uses cards because it preserves statement/favorite controls.
6. Empty state: observation and timeline have normalized empty state styling. Notes empty state is list/domain-specific.
7. Toggle design: drawer toggles already use existing mutual-exclusion event; no logic change needed.
8. Selected/hover/active: observation filters are the reference; notes tabs needed pill styling closer to observation filters.
9. Responsive text: 1280 and 1920 render correctly; mobile fixed drawers were offscreen before patch.

## Screenshot Baseline

Before screenshots were captured under:

`tmp/qa-ui-drawer-consistency-results/screenshots/before/`

Files:
- `case-timeline-1920x1080.png`, `case-timeline-1280x720.png`, `case-timeline-mobile.png`
- `important-notes-1920x1080.png`, `important-notes-1280x720.png`, `important-notes-mobile.png`
- `observation-1920x1080.png`, `observation-1280x720.png`, `observation-mobile.png`
- `notebook-1920x1080.png`, `notebook-1280x720.png`, `notebook-mobile.png`

## Scope Guard

- No store/slice/hook/API/LLM/free-question changes.
- No new notebook drawer created because this session forbids new feature work.
- Notebook is treated as the existing observation-pattern section, not as a new drawer.

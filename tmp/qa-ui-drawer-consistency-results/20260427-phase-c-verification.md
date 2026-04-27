# UI Drawer Consistency Fix - Phase C Verification

Date: 2026-04-27

## Screenshots

Before:
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/case-timeline-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/case-timeline-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/case-timeline-mobile.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/important-notes-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/important-notes-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/important-notes-mobile.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/observation-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/observation-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/observation-mobile.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/notebook-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/notebook-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/before/notebook-mobile.png`

After:
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/case-timeline-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/case-timeline-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/case-timeline-mobile.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/important-notes-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/important-notes-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/important-notes-mobile.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/observation-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/observation-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/observation-mobile.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/notebook-1920x1080.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/notebook-1280x720.png`
- `tmp/qa-ui-drawer-consistency-results/screenshots/after/notebook-mobile.png`

## Visual Verification

- Desktop 1920x1080: PASS
- Desktop 1280x720: PASS
- Mobile 390x844: PASS for fixed drawers after patch
- Before mobile issue: fixed drawers rendered offscreen because they retained desktop `left: 396px`.
- After mobile result: timeline, notes, and observation fixed drawers use shared viewport insets.
- Notebook: no drawer exists; screenshot captures existing notebook section only.

## Reduced Motion / Animation

- No new keyframes were added.
- Timeline item entrance animation is disabled for the drawer consistency override.
- Screenshot capture used Playwright `animations: disabled`.

## Commands

- `npm run check:all`: PASS
  - Existing warnings remain: `legacy-precheck-matrix` and warn-only policy/data surface warnings.
- `npm run build:pc`: PASS
  - Existing Vite warnings remain for dynamic import/chunk size/plugin timings.
- `npx tsc -b --force`: PASS
- `git diff --check`: PASS, with line-ending warnings only.

## Screenshot Runtime Notes

During screenshot capture, the browser console emitted:
- `/api` connection refused resource logs, expected for local offline screenshot setup.
- Existing React warning: `Cannot update a component while rendering a different component` involving `PCImportantNotesSection` and `PCLeftPanel`.

These were not introduced or modified by this patch.

# UI Drawer Consistency Checklist

Date: 2026-04-27
Reference: 재판관의 관찰 drawer

| Area | Status | Notes |
|---|---|---|
| Panel shell | OK | Shared background, border, radius, shadow, z-index for fixed drawers. |
| Border/divider | OK | Header and filter divider normalized. |
| Spacing/padding | OK | Shared desktop padding; shared mobile inset/padding. |
| Header layout | OK | Timeline/notes/observation now use icon-title-close pattern. |
| List item layout | OK | Timeline now uses icon dots like observation; notes retain card controls. |
| Empty state | OK | Observation/timeline normalized; notes remains domain-specific. |
| Toggle design | OK | Existing mutual-exclusion drawer event retained. |
| Selected/hover/active | OK | Notes tabs aligned with observation filter pills. |
| Responsive text/position | OK | Mobile fixed drawers now visible in viewport. |

## Notebook Status

`JudgeNotebookHistoryDrawer.tsx` is missing. No new drawer was created because this session explicitly forbids new feature work. The existing notebook section continues to reuse the observation card visual language.

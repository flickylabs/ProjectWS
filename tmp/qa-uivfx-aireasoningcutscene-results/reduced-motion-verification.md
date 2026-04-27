# Reduced Motion Verification

Date: 2026-04-27

Reduced motion handling is implemented in both runtime timing and CSS.

Runtime:

- Major duration collapses from 6000ms to 1400ms.
- Compact duration collapses from 1450ms to 650ms.
- Line/aura enqueue delays are shortened.

CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .ai-rc-root,
  .ai-rc-root--major,
  .ai-rc-root.is-leaving,
  .ai-rc__question,
  .ai-rc-chip,
  .ai-rc__trace span,
  .ai-rc__status-rail span,
  .ai-rc__status-rail strong,
  .ai-rc-compact__rail,
  .ai-rc-compact__done {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
  }
}
```

Verification:

- `npx tsc -b --force`: PASS
- `npm run build`: PASS

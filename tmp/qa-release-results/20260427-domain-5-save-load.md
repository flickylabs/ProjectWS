# Domain 5 - Save / Load

Status: PASS.

Source checks:
- `solomon-history` is capped at 100 entries by `saveExtendedHistory`.
- Malformed `solomon-history` JSON is caught and returns an empty history.
- Malformed `solomon-judge-progression` JSON is caught and returns default progression.

Browser corruption test:
- Injected malformed JSON into `solomon-history`.
- Injected malformed JSON into `solomon-judge-progression`.
- Reloaded the production-like PC build.

Observed:
- Home/profile recovered without a crash.
- No console errors or page errors were captured.

Evidence:
- `tmp/qa-release-results/screenshots/domain5-corrupt-storage-recovery.png`

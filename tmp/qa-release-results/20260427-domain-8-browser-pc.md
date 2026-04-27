# Domain 8 - Browser / PC Build

Status: PASS for available browsers.

Browsers:
- Chromium: PASS
- Firefox: PASS
- Microsoft Edge: PASS

Checks:
- Production-like `dist-pc` home loaded.
- Storage/profile state initialized.
- No console errors or page errors were captured.

Evidence:
- `tmp/qa-release-results/screenshots/domain8-chromium-home.png`
- `tmp/qa-release-results/screenshots/domain8-firefox-home.png`
- `tmp/qa-release-results/screenshots/domain8-edge-home.png`

Not run:
- Safari: unavailable on this Windows workspace.
- Electron: no Electron runtime/build path found in the current package scripts.

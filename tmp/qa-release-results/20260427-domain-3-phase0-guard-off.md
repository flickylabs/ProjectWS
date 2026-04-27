# Domain 3 - Phase0 / Guard Off Stability

Status: PASS smoke.

Runtime path:
- Production-like `dist-pc` static server with local serverless proxy.
- Browser: Chromium, 1280x720.
- Flow: intro skip -> home -> normal mode -> session 01 spouse -> case entry -> scripted dialogue/choice progression.

Observed:
- Case entry displayed `Phase 1 - 사전진술`.
- Automated progression reached `Phase 2 - 심문`.
- No browser console errors or warnings were captured during the production-like phase-flow smoke.
- Disclosure guard default path returns `off` unless URL, localStorage, or `VITE_DISCLOSURE_GUARD_MODE` explicitly sets another mode.

Evidence:
- `tmp/qa-release-results/screenshots/domain3-case-select-1280x720.png`
- `tmp/qa-release-results/screenshots/domain3-case-list-spouse-1280x720.png`
- `tmp/qa-release-results/screenshots/domain3-phase0-spouse-1280x720.png`
- `tmp/qa-release-results/screenshots/domain3-phase-progress-1280x720.png`

Limitation:
- This was an automated phase-flow smoke, not a literal five-minute manual soak.

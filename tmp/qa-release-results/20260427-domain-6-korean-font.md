# Domain 6 - Korean / Font / Mojibake

Status: PASS smoke.

Checked surfaces:
- Home/menu text
- Session/case list text
- Case entry and dialogue text
- Forced AI reasoning major and compact VFX overlays

Observed:
- Korean rendered normally on checked runtime surfaces.
- No mojibake patterns were found in `dist`/`dist-pc` artifact grep used for VFX text confirmation.
- Locked case rows show literal `???` placeholders. They appear to be unknown/locked placeholders, not encoding corruption.

Evidence:
- `tmp/qa-release-results/screenshots/domain1-prod-proxy-home-1280x720.png`
- `tmp/qa-release-results/screenshots/domain3-phase-progress-1280x720.png`
- `tmp/qa-release-results/screenshots/domain10-ai-reasoning-major-reduced-motion.png`
- `tmp/qa-release-results/screenshots/domain10-ai-reasoning-compact-reduced-motion.png`

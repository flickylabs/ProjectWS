# Project Solomon Docs

This folder now keeps only current reference material. Historical prompts, one-off QA packets, generated HTML mockups, and old request bundles were archived under `docs/LEGACY/20260506-pre-steam-cleanup/`.

## Current Release Docs

- `project-control-tower.md`: main coordination-thread responsibilities across release, localization, and case generation.
- `steam-release-env.md`: Steam/Railway/Electron environment setup.
- `steam-achievements.md`: current placeholder achievement IDs.
- `steam-art-assets-guide.md`: Steam capsule/icon asset checklist.
- `release-runbook.md`: Steam/Railway release and QA command flow.
- `localization-plan.md`: Korean/English/Japanese/Simplified Chinese rollout plan.
- `localization/`: glossary, style guide, and translation thread queue.
- `server-architecture.md`: backend shape and API responsibilities.
- `../steamworks/`: SteamPipe upload templates for the Windows depot.

## Current Design And Content Docs

- `app-flow-design.md`: product/game flow overview.
- `disclosure-policy.md`: truth disclosure and information surface policy.
- `information-surface-policy.md`: channel-level information surface policy.
- `case-generation/`: current case generation status and validation rules.
- `design/PC-UI-DESIGN-SYSTEM-V2.md`: current PC UI design system.
- `design/PC-SCREEN-DIAGNOSIS.md`: current PC screen diagnosis notes.
- `design/truth-breakthrough-logic.md`: truth breakthrough logic notes.

## Current QA Guide

Use `qa-current.md` for the current command set. Older QA documents were archived because they referenced legacy `tmp/run-all-checks.cjs` wrappers.

## Archive Rule

If a file is a generated result, a one-off model request, a screenshot batch, an obsolete deployment config, a reference asset dump, or a temporary handoff, keep it out of this top-level docs surface. Put it under `tmp/` while working or `docs/LEGACY/{date}/` when it needs to be preserved.

`tmp/qa-runtime-gate-manifests/` and `tmp/qa-route-simulator-manifests/` are exceptions: they are active QA inputs, not disposable output.

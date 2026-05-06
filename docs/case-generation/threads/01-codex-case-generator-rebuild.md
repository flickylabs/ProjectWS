# Thread: CASE_GENERATOR_REBUILD

Target: Codex

You are rebuilding the Korean-first case generation pipeline for Project_Solomon.

## Workspace Setup

- Working directory: `d:\ProjectWS`
- Shell: PowerShell
- The worktree may already be dirty.
- Do not revert, reset, delete, or overwrite unrelated user changes.
- Inspect related files before editing.
- Prefer `rg` / `rg --files` for search.
- Use `apply_patch` for manual file edits.

## Project Context

Project_Solomon is a Vite + React PC courtroom investigation game prepared for Steam through Electron.

The previous bulk case generator is archived and should not be run directly against current runtime data. The runtime and QA logic have changed significantly since that generator existed.

Current release/localization direction:

- Source/fallback language is Korean (`ko`).
- New cases should be authored/generated in Korean first.
- Translation into English/Japanese/Simplified Chinese will happen later through the localization workflow.
- Do not create multilingual case files in this thread.

## Primary Goal

Design and rebuild a current, safe, Korean-first case generation pathway that can produce new Project_Solomon cases compatible with the current runtime.

Start with a pilot case generation pipeline, not a bulk generator.

## Required References

Read these before designing:

- `docs/case-generation/README.md`
- `docs/case-generation/schemas.md`
- `docs/case-generation/quality-rules.md`
- `docs/case-generation/scripted-text-channels.md`
- `docs/case-generation/regeneration-policy.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`
- `docs/app-flow-design.md`
- `src/data/cases/generated/spouse-01.json`
- `src/data/cases/generated/family-01.json`
- `src/data/cases/generated/friend-01.json`
- `src/data/scriptedText/spouse-01.json`
- `src/data/scriptedText/family-01.json`
- `src/data/scriptedText/friend-01.json`
- `src/data/dialogues/phase1/`
- `src/data/witnessTestimonyData/`
- `src/data/claimPolicies/`
- `tmp/qa-runtime-gate-manifests/`
- `tmp/qa-route-simulator-manifests/`

## Hard Constraints

1. Do not run archived generator scripts directly.
2. Do not write generated drafts directly into `src/data/**`.
3. Put all draft outputs under `tmp/case-generation/`.
4. Preserve current runtime expectations and QA policy.
5. Do not change active existing cases unless explicitly needed for schema discovery documentation.
6. Do not translate new cases.
7. Do not commit or push unless the controller thread explicitly asks for it.

## Required Deliverables

### 1. Current Generator Guide

Create or update:

- `docs/case-generation/current-generator-design.md`

It must explain:

- Current runtime source files and their roles.
- Which outputs a new case needs.
- Which outputs are mandatory for the first pilot.
- Which outputs can be deferred.
- Current schema risks and known doc/runtime mismatches.
- Validation commands.
- Promotion process from `tmp/case-generation/` to `src/data/**`.

### 2. Generator Implementation Plan

Create or update:

- `docs/case-generation/pilot-case-generation-plan.md`

It must include:

- Proposed pilot case relationship type.
- Case ID naming rule.
- Required output files.
- Staged generation order.
- Review checkpoints.
- QA commands.
- What must be reviewed by the controller before production promotion.

### 3. Safe Draft Workspace

Create:

- `tmp/case-generation/README.md`

It must explain that draft generated outputs live there until reviewed.

### 4. Generator Script Skeleton

Create a new script under `scripts/`, but only after documenting the design:

- Suggested name: `scripts/generate-case-draft.mjs`

The first version should be conservative. It may be a scaffold/validator/orchestrator rather than a fully autonomous content generator.

Minimum requirements:

- Explicit input/output paths.
- Refuse to write outside `tmp/case-generation/` unless an explicit promotion flag is later added.
- Produce deterministic draft directory structure.
- Validate that required reference files exist.
- Print next manual steps.

### 5. Pilot Case Brief Template

Create a reusable template:

- `docs/case-generation/pilot-case-brief-template.md`

It should be usable by GPT Pro / ClaudeCode / human authoring later, but this thread should remain Korean-first.

## Design Direction

The generator should not try to solve the whole content problem in one pass.

Recommended staged pipeline:

1. Case brief
   - relationship type
   - title
   - core misunderstanding
   - anchor truth
   - emotional bait
   - resolution dilemma

2. Runtime case JSON draft
   - parties
   - context
   - disputes
   - evidence
   - truth table
   - solutions
   - combination lab

3. Safety and policy pass
   - hidden truth gating
   - evidence surface names
   - dispute unlock conditions
   - no premature truth leakage

4. Scripted text draft
   - only the minimum channels required for pilot validation first
   - expand to full current channel set after schema compatibility is confirmed

5. Phase 1 dialogue

6. Witness testimony

7. QA manifest integration

8. Runtime promotion proposal

## Validation Expectations

After adding scripts/docs, run:

```powershell
npm run build:pc
npm run check:policy
npm run check:sync
```

If a command is too slow or blocked, report that explicitly.

For the generator script itself, add a dry-run command example and run it.

## Output Format For Final Response

When done, report:

- Files created/modified.
- What the new generator can do.
- What it intentionally does not do yet.
- Validation commands and results.
- Questions or decisions needed from the controller thread.

## Controller Handoff

This thread is `CASE_GENERATOR_REBUILD`.

The main coordination thread is `PROJECT_CONTROL_TOWER`.

Do not promote drafts into production runtime files without controller approval.

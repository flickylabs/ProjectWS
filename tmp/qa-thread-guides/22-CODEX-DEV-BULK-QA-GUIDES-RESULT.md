# 22-CODEX-DEV-BULK-QA-GUIDES-RESULT

> 2026-04-28 operational correction: this historical result references the now-superseded per-stage template. Current execution must use the four rewritten fresh-run `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files.

Codex-Dev bulk QA guide-application result.

## Baseline / Entry

- Worktree: `D:/ProjectWS-main-temp`
- Baseline HEAD: `344e686 fix(qa-simulator): S7 response_missing detector parity with S3/S4/S6`
- `origin/main..HEAD`: `0` at entry after fetch
- Entry guard: detached `HEAD`; baseline tags `baseline-pre-policy-v3`, `baseline-pre-policy-v3-stage1`, and `baseline-pre-policy-v3-stage2` present
- Scope: docs-only guide application; no code, data, manifest, runtime, or bulk-QA execution

## Diff Surface

Guide edits:

- `tmp/qa-thread-guides/01-THREAD-GUIDE-COMMON.md`
- `tmp/qa-thread-guides/02-NORMAL-GUIDE.md`
- `tmp/qa-thread-guides/03-EXHAUSTIVE-GUIDE.md`
- `tmp/qa-thread-guides/04-CT-INSTRUCTIONS.md`

Committed packet/template/source docs:

- `tmp/qa-thread-guides/15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md`
- `tmp/qa-thread-guides/17-REQUEST-CODEX-DEV-S7-RESPONSE-MISSING-PARITY.md`
- `tmp/qa-thread-guides/19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md`
- `tmp/qa-thread-guides/20-FUTURE-BULK-PASTE-TEMPLATE.md`
- `tmp/qa-thread-guides/21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md`
- `tmp/qa-thread-guides/22-CODEX-DEV-BULK-QA-GUIDES-RESULT.md`

Preserved and not committed in this round:

- Historical Stage 1 launch candidate artifacts: `CODEX-QA-A-NORMAL-PRIMARY.md`, `CODEX-QA-B-EXHAUSTIVE-PRIMARY.md`, `CLAUDE-QA-A-NORMAL-CROSSCHECK.md`, `CLAUDE-QA-B-EXHAUSTIVE-CROSSCHECK.md` (superseded for active execution by the four rewritten fresh-run PASTEs)
- Earlier untracked operational docs and packet artifacts outside the requested 15 / 17 / 19 / 20 / 21 / 22 set
- Existing rerun/result directories under `tmp/`

## Per-File Additions

### 04-CT-INSTRUCTIONS.md

- Added `### CT Role In Bulk QA` under `## Boundary`.
- Added `### Codex Planning Secretary Role` under `## Boundary`.
- Added `## Bulk QA Staging` at the end of the file, including:
  - Codex primary stage table
  - ClaudeCode cross-check stage table
  - per-runner totals
  - `### Cross-Check Common Execution Contract`
  - `### Stop Rules (per runner)`
  - `### Result Accumulation`
- Added `## Required Aggregation Before Agent Review`.
- Added `## Sub-Agent Operating Model`.
- Added `## Per-Thread Preflight Requirement` with the `runner:` field.
- Added `## Integration Rules`.
- Added `## Cross-Runner Merge`.

### 01-THREAD-GUIDE-COMMON.md

- Added `### Cluster Signature` inside `## How To Treat Detector Findings`.
- Added `## Context Limits And Aggregation-First Rule` before the severity block, including:
  - context limits core rule
  - `### Context Risks To Control`
  - `### Aggregation-First Rule`
- Added `## Representative Sample Rule` after `## Severity Rules`.

### 02-NORMAL-GUIDE.md

- Added `## Normal Reviewer Input Limits` after the existing normal interpretation rule.
- Included the cross-runner non-read rule.

### 03-EXHAUSTIVE-GUIDE.md

- Added `## Exhaustive Reviewer Input Limits` after the existing exhaustive interpretation rule.
- Added `### runtimeReachable Requirement`.
- Included the cross-runner non-read rule.

## Validation

Read-only guide checks:

- 19 Application Map target sections exist in 01 / 02 / 03 / 04.
- Both Stage Plan tables exist in 04 Bulk QA Staging.
- Cross-Check Common Execution Contract exists in 04.
- Cross-Runner Merge exists in 04.
- `runner:` is present in 04 Per-Thread Preflight Requirement.
- 20 placeholders remain present, including `<runner-id>`, `<other-runner-id>`, and `<runner-result-base>`.
- Guide diffs are additions-only by numstat: 327 insertions, 0 deletions across 01 / 02 / 03 / 04.
- `git diff --check` PASS for the edited guide files.

Build / lint:

- `npx eslint scripts/qa-route-simulator.cjs` PASS
- `npx tsc -b --force` PASS
- `npm run build:pc` PASS
  - Vite emitted the existing dynamic-import and large-chunk warnings only; exit code was 0.

## Deviations / Notes

- No deviations from the docs-only scope.
- `20-FUTURE-BULK-PASTE-TEMPLATE.md` body was not edited; it is only committed as the received template.
- The historical S7 request trace, `17-REQUEST-CODEX-DEV-S7-RESPONSE-MISSING-PARITY.md`, is included only as a historical S7 request trace, not as an active bulk-QA guide file.
- Actual Stage 1 bulk QA was not started.
- Push was not performed.

## Status

- Guide application: PASS
- Template preservation: PASS
- Static validation: PASS
- Bulk QA execution: not started
- Push: not performed

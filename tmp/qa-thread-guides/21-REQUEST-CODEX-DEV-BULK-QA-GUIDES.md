# 21-REQUEST-CODEX-DEV-BULK-QA-GUIDES

> 2026-04-28 operational correction: this historical request produced a per-stage PASTE template that is no longer active. Use the four rewritten fresh-run `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files for current execution.

Codex-Dev request packet for applying bulk-QA guide updates and adding the future bulk PASTE template (parallel Codex-primary + ClaudeCode-cross-check structure).

## Scope

- requester: ClaudeCode CT-Main (no code authority on this packet)
- recipient: Codex-Dev
- baseline commit: `344e686` (post-Track-B + S7 / origin/main HEAD)
- baseline worktree: `D:/ProjectWS` (canonical main/Live-QA worktree)
- baseline tag: `baseline-pre-policy-v3` → `a7aaec3` (no bump in this round)
- in scope:
  - **apply** `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` to guide 4 files (`01-…`, `02-…`, `03-…`, `04-…`) — including the per-runner Stage Plan, the Cross-Check Common Execution Contract, and the Cross-Runner Merge section
  - **commit** `20-FUTURE-BULK-PASTE-TEMPLATE.md` as a permanent template file (currently untracked at `tmp/qa-thread-guides/20-FUTURE-BULK-PASTE-TEMPLATE.md`)
  - **commit** `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` and `21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md` (this packet) as part of the same docs commit
- out of scope:
  - any code change (`scripts/qa-route-simulator.cjs` / `src/**` / runtime — all forbidden)
  - any data change (Track A surfaces forbidden)
  - actual bulk QA execution (historical wording superseded on 2026-04-28: active execution now uses fresh-run-to-final PASTEs with stage-local checkpoints)
  - baseline tag bump
  - new judgment beyond what 15 / 19 / 20 already specify

## Why

Per `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` and `15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md`, bulk QA at the per-runner Stage Plan scale (Codex primary Normal 2000 / Exhaustive 500 per case + ClaudeCode cross-check Normal 400 / Exhaustive 100 per case, both executing in parallel under a shared execution contract) requires the guide set and a future bulk PASTE template to be in place **before** any Stage 1 run on either runner. This packet lands those updates as a docs-only round.

## Source Documents (read before entry)

1. `tmp/qa-thread-guides/19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` — guide 4 파일 변경 안 (Application Map + per-file proposed additions; per-runner Stage Plan; Cross-Check Common Execution Contract; Cross-Runner Merge), primary
2. `tmp/qa-thread-guides/20-FUTURE-BULK-PASTE-TEMPLATE.md` — future bulk PASTE template (commit candidate; supports `<runner-id>` variable)
3. `tmp/qa-thread-guides/15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md` — original bulk-QA context/sub-agent plan (background)
4. (reference) `tmp/qa-thread-guides/13-GUIDE-UPDATES-PROPOSAL.md` — Track B guide-application pattern
5. (reference) `tmp/qa-thread-guides/12-REQUEST-CODEX-DEV-TRACK-B.md` — Track B request pattern

## Pre-Conditions

- **Critical worktree guard** (same as 12 / 17):
  - cwd must be `D:/ProjectWS`. Do not use `D:/ProjectWS-dev` (preserved wip worktree on `wip/phase-b-route-simulator-20260427`).
  - Do not use stale paste files under `D:/ProjectWS-dev/tmp/`.
  - If HEAD is `8f7ca75 wip: complete Phase B route simulator continuation` or branch is `wip/phase-b-route-simulator-20260427`, stop immediately. Do not resolve merge conflicts there. If a merge is in progress, only run `git merge --abort`, then report.
- `git pull origin main` then verify HEAD = `344e686` (current main HEAD per round-2 push).
- tracked clean before entry; existing untracked artifacts under `tmp/qa-warmup-packet/`, `tmp/qa-warmup-trial/`, `tmp/qa-small-rerun-track-b-*`, `tmp/codex-dev-track-b/`, and other `tmp/qa-thread-guides/*.md` packet docs are baseline-frozen — do not regenerate or move them.
- baseline tags `baseline-pre-policy-v3{,-stage1,-stage2}` present — do not modify.
- No code or data surfaces are in scope; this is a docs-only round.

## Item — Apply guide updates per 19

Apply every addition specified in `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md` §Application Map.

For each target file, follow the per-section "proposed addition" verbatim from 19:

| Target file | Sections to add (per 19) |
|---|---|
| `tmp/qa-thread-guides/04-CT-INSTRUCTIONS.md` | A1 Bulk QA Staging (with both Stage Plan tables — Codex primary + ClaudeCode cross-check — + Cross-Check Common Execution Contract subsection + Stop Rules subsection + Result Accumulation) / A2 Required Aggregation Before Agent Review / A3 Sub-Agent Operating Model / A4 Per-Thread Preflight Requirement (with `runner:` field) / A5 Integration Rules / A6 Cross-Runner Merge / A7 CT Role In Bulk QA (subsection) / A8 Codex Planning Secretary Role (subsection) |
| `tmp/qa-thread-guides/01-THREAD-GUIDE-COMMON.md` | B1 Context Limits And Aggregation-First Rule (with Context Risks To Control + Aggregation-First Rule subsections; cross-runner mention) / B2 Cluster Signature (subsection inside `## How To Treat Detector Findings`; "stable across runners" note) / B3 Representative Sample Rule (cross-runner merge note) |
| `tmp/qa-thread-guides/02-NORMAL-GUIDE.md` | C1 Normal Reviewer Input Limits (cross-runner non-read note) |
| `tmp/qa-thread-guides/03-EXHAUSTIVE-GUIDE.md` | D1 Exhaustive Reviewer Input Limits (cross-runner non-read note) + runtimeReachable Requirement subsection |

**Addition-only promise**: no existing line in 01/02/03/04 may be removed or rewritten. Only new sections / subsections are added.

**Wording**: verbatim from 19 §`<section>` per-file body. The two intentional new content areas beyond 15 are the per-runner Stage Plan tables in 04 §Bulk QA Staging and the Cross-Check Common Execution Contract / Cross-Runner Merge structure (per user instruction).

## Item — Commit 20 as permanent template

`tmp/qa-thread-guides/20-FUTURE-BULK-PASTE-TEMPLATE.md` is currently untracked. This packet commits it as a permanent template file (operational trace + future bulk-PASTE source).

- the file body itself is **not** to be modified by Codex-Dev in this round (Codex-Dev may surface concerns in `22-CODEX-DEV-BULK-QA-GUIDES-RESULT.md` instead of editing 20).
- the template's `<...>` placeholders are intentional; do not pre-fill.
- 20 supports parallel Codex-primary + ClaudeCode-cross-check instantiation via the `<runner-id>` and `<other-runner-id>` placeholders.

## Item — Commit 19 / 20 / 21 / 15 / 17 (this packet)

For operational trace (matches 14 / 18 commit pattern), commit the following together in the same docs commit (per §Resolved Decisions #12):

- **bulk QA guide round (active)**:
  - `19-GUIDE-UPDATES-BULK-QA-PROPOSAL.md`
  - `20-FUTURE-BULK-PASTE-TEMPLATE.md`
  - `21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md`
  - edits to `01-…` / `02-…` / `03-…` / `04-…`
- **bulk QA staging source**:
  - `15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md`
- **historical S7 request trace** (commit summary must distinguish):
  - `17-REQUEST-CODEX-DEV-S7-RESPONSE-MISSING-PARITY.md`

Earlier docs (07–13 except 14 which is already committed; 16; 18) remain untracked operational artifacts in this round.

## Validation (Codex-Dev self-check before hand-off)

This is a docs-only round; validation is read-only.

For each guide file (01/02/03/04):
- every addition listed in 19 §Application Map exists at the specified location.
- no existing line was removed or rewritten.
- terminology in added sections matches 19 verbatim.
- both Stage Plan tables (Codex primary + ClaudeCode cross-check) are present in 04 §Bulk QA Staging.
- Cross-Check Common Execution Contract and Cross-Runner Merge sections are present in 04.

For 20:
- file is committed as a permanent template.
- `<...>` placeholders remain intact (no pre-fill).
- `<runner-id>` / `<other-runner-id>` / `<runner-result-base>` placeholders are present.
- body is unchanged from the version Codex-Dev received (no silent edits).

For 19 / 21 / 20:
- all three are present in the docs commit.

Build / lint:
- `npx tsc -b --force` PASS (defensive — docs change should not affect build)
- `npm run build:pc` PASS
- `npx eslint scripts/qa-route-simulator.cjs` PASS (defensive — Codex-Dev should not have touched the file)

## Out-Of-Scope (do not touch in this packet)

- `scripts/qa-route-simulator.cjs` and any other code under `scripts/` or `src/`
- runtime engine / hooks / store / components
- `tmp/qa-route-simulator-manifests/*.json`
- `src/data/cases/generated/*.json`, `src/data/scriptedText/*.json`, `src/data/disclosurePolicy/*.json`, `src/data/claimPolicies/*-dossier-cards.json` (Track A territory)
- baseline tag bump
- A2-engine / S5 (still deferred — see 17 §S5 Deferred Trace + 18 §S5 Deferred Trace)
- 11 / 12 / 13 / 14 / 15 / 16 / 17 / 18 packet body edits (read-only on prior packet history; 19 / 20 / 21 are the only writable docs in this round, and 20's body remains unchanged per §Item — Commit 20)
- actual bulk QA runs on either runner (historical wording superseded on 2026-04-28: do not generate once per runner per stage; use the four rewritten fresh-run-to-final PASTEs unless CT/user explicitly chooses manual gates)
- introducing new variables in 20 placeholders or new operating constraints beyond what 19 specifies

## Push Strategy

Per Track B / S7 push pattern:
- this docs commit may be pushed standalone after Codex-Dev validation PASS, since the docs-only diff carries no code/data risk.
- CT will request user push approval after reviewing Codex-Dev's `22-CODEX-DEV-BULK-QA-GUIDES-RESULT.md`.
- baseline tag remains unchanged.

## Commit Strategy

- default: single commit (e.g. `docs(qa-guide): apply bulk QA guide updates and add future bulk PASTE template`).
- commit body must categorize the included docs per §Resolved Decisions #12:
  - **bulk QA guide round (active)**: 19 + 20 + 21 + edits to 01/02/03/04
  - **bulk QA staging source**: 15
  - **historical S7 request trace**: 17
- if diff grows (Codex-Dev judgment), split into at most two commits — `guide` (01/02/03/04 edits) and `template` (19 + 20 + 21 + 15 + 17 docs add, with 17 noted as historical S7 trace). No further per-file split in this round (per Resolved Decision #7).
- final split decision is Codex-Dev's after diff inspection; CT does not pre-decide.
- every commit: `Co-Authored-By` trailer per project convention; signing/hooks must pass; no `--no-verify`.

## Codex-Dev Self-Validation Plan

| Phase | Action |
|---|---|
| pre-entry | worktree guard + `git pull origin main` + status clean + baseline `344e686` confirmed |
| during application | apply 19 §Application Map verbatim (including both per-runner Stage Plan tables + Cross-Check Common Execution Contract + Cross-Runner Merge); do not introduce new wording; commit 19 / 20 / 21 + edited guide files |
| pre-commit | `npx tsc -b --force` PASS; `npm run build:pc` PASS; `npx eslint scripts/qa-route-simulator.cjs` PASS (defensive) |
| post-commit | summary report at `tmp/qa-thread-guides/22-CODEX-DEV-BULK-QA-GUIDES-RESULT.md` listing per-file additions, validation outcome, and any deviation |

## Resolved Decisions (this packet)

User-confirmed decisions for round 19/20/21:

1. **Worktree**: `D:/ProjectWS` (canonical main/Live-QA worktree).
2. **Baseline**: `344e686` (current main HEAD).
3. **Baseline tag**: no bump in this round.
4. **Worktree retention**: `D:/ProjectWS` retained until at least Stage 1 entry decision; do not remove.
5. **Bulk QA**: not started this round; historical Stage 1-only launch wording is superseded on 2026-04-28 by fresh-run-to-final worker PASTEs with stage-local checkpoints.
6. **Application actor**: Codex-Dev applies 19's additions to guide files and commits 19 / 20 / 21 (CT does not Edit guide files in this round).
7. **Commit grouping**: default single commit; up to 2 commits split (`guide` / `template`) allowed if diff grows; no further per-file split.
8. **20 body modification**: Codex-Dev does not edit 20's body in this round (concerns surface in 22 instead).
9. **Template variable list**: fixed per 20 §Resolved Decisions #1; adding new variables requires a separate guide-update round.
10. **Allowed runner-id values**: `codex-primary` and `claudecode-crosscheck` only (per 20 §Resolved Decisions #2).
11. **Cross-runner sharing during execution**: forbidden; merge is a separate later step under `tmp/qa-bulk-runs/integrated/`.

## Resolved Decisions (continued)

12. **Commit policy for 15 / 17 / earlier untracked operational docs**: 15 (`15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md`) is included in this docs commit as the bulk QA staging source. 17 (`17-REQUEST-CODEX-DEV-S7-RESPONSE-MISSING-PARITY.md`) is also included, but the commit summary tags it as **"historical S7 request trace"** so it remains distinguishable from the active bulk QA guide round files. Earlier docs (07–13 except 14 which is already committed; 16; 18) remain untracked operational artifacts in this round.
13. **22 result doc filename**: `22-CODEX-DEV-BULK-QA-GUIDES-RESULT.md` (confirmed).
14. **Launch sequencing**: **staggered launch** remains valid, but the Stage 1-only PASTE generation is superseded on 2026-04-28. Codex primary 2 workers (normal + exhaustive) start first; after 10–15 minutes or after initial artifact production is confirmed, ClaudeCode cross-check 2 workers (normal + exhaustive) start. Once started, workers run independently to their final targets unless a stop rule fires and do not read each other's results during execution.

## Hand-off

Per §Resolved Decisions (all decisions confirmed; no Open Items remain):

1. Codex-Dev entry approval from user — **confirmed at packet hand-off** (sharing message of this round).
2. Codex-Dev reads §Source Documents in order, then this packet.
3. Codex-Dev applies 19's additions, commits per §Item — Commit 19 / 20 / 21 / 15 / 17 (per §Commit Strategy).
4. Codex-Dev reports back via `22-CODEX-DEV-BULK-QA-GUIDES-RESULT.md` (per §Resolved Decisions #13).
5. CT reviews diff; if PASS, CT requests user push approval for the docs commit.
6. CT resumes coordination: use the 2026-04-28 fresh-run-to-final corrected PASTEs (4 PASTEs total — 2 per runner; staggered launch per §Resolved Decisions #14), Track A entry decision, baseline-tag decision.

CT did not modify code, did not commit, did not change packet artifacts, did not run additional QA.

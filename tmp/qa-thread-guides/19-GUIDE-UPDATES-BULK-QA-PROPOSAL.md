# 19-GUIDE-UPDATES-BULK-QA-PROPOSAL

> 2026-04-28 operational correction: any wording that implies one PASTE per stage is superseded by the four rewritten fresh-run `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files. Bulk QA worker PASTEs start from `run-000001` under `tmp/qa-bulk-runs/restart-20260428/` and run to the final planned target with stage-local checkpoints unless a stop rule fires.

Bulk-QA guide-update proposal — 15-driven application to guide 4 files, with parallel Codex-primary + ClaudeCode-cross-check structure.

## Scope

- writer: ClaudeCode CT-Main
- baseline commit: `344e686` (post-Track-B + S7 push 완료 / current `origin/main` HEAD)
- mode: **proposal only** — actual guide files are NOT modified by this document. Apply per round 21 (`21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md`).
- source: `tmp/qa-thread-guides/15-BULK-QA-CONTEXT-SUBAGENT-PLAN.md` (placement per §Guide Update Placement; wording reused verbatim or near-verbatim from 15 body).
- coupled with: `20-FUTURE-BULK-PASTE-TEMPLATE.md` (future bulk PASTE template) + `21-REQUEST-CODEX-DEV-BULK-QA-GUIDES.md` (Codex-Dev 적용 의뢰서).
- new-judgment policy: minimized. Two new content areas beyond 15:
  1. **Stage Plan** (per user instruction; per-runner Normal/Exhaustive split totals).
  2. **Parallel cross-check structure** (Codex primary + ClaudeCode cross-check) (per user instruction in this round).

## Stage Plan (user-confirmed / new beyond 15)

15 §Bulk QA Staging defines 30 / 200 / 2000-run stages but does not separate runners or normal/exhaustive volumes. Per user instruction at this round, the stage plan is split by runner:

### Codex primary (full plan)

| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 — smoke | 30 | 30 |
| Stage 2 — soak | 200 | 50 |
| Stage 3 — bulk | 770 | 120 |
| Stage 4 — full | 1000 | 300 |
| **Total** | **2000** | **500** |

### ClaudeCode cross-check (1/5-scale parallel)

| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 — smoke | 6 | 6 |
| Stage 2 — soak | 40 | 10 |
| Stage 3 — bulk | 154 | 24 |
| Stage 4 — full | 200 | 60 |
| **Total** | **400** | **100** |

Each stage may auto-advance on PASS but follows the stop rules (below). The two runners execute **in parallel**, not sequentially. Stage Plan applies in `04-CT-INSTRUCTIONS.md` §Bulk QA Staging.

## Parallel Cross-Check Common Execution Contract (user-confirmed / new beyond 15)

Codex primary and ClaudeCode cross-check execute **independently and in parallel** under one shared contract. Results are merged after **both** runners complete; no merge happens during execution.

| Item | Required value |
|---|---|
| commit | `origin/main` `344e686` (or the current main HEAD at round launch — both runners pin the same SHA) |
| harness version | identical (same `scripts/qa-route-simulator.cjs`) |
| active cases | identical (`spouse-01` / `family-01` / `friend-01` per CLAUDE.md §활성 사건) |
| normal / exhaustive mode definition | identical (same CLI flags) |
| stop rules | identical (per `04` §Stop Rules) |
| aggregate schema | identical (per `04` §Required Aggregation file list) |
| result-dir | **separate**: `tmp/qa-bulk-runs/codex-primary/<stage-id>-<UTC-timestamp>/` and `tmp/qa-bulk-runs/claudecode-crosscheck/<stage-id>-<UTC-timestamp>/` |
| raw / result sharing during execution | **forbidden** — runners must not read each other's result-dir until both runners finish a stage |
| merge | aggregate-only, runner-side completion required first; merge artifacts live under `tmp/qa-bulk-runs/integrated/` |

## User-Confirmed Operating Constraints (existing — carry forward from earlier round)

These constraints reuse 15 §Stop Rules and §CT Role intent:

- each stage may auto-advance, but stop rules are mandatory
- **stop on `hard > 0`**
- **stop on new P0/P1 cluster appearance** (close current stage, summarize cluster)
- **on flaky or new category**: preserve representative samples, then stop or hold
- raw artifacts must NOT be fully read by any agent
- **aggregate / cluster summary** is the agent input, not raw transcripts
- **results accumulate** in result-dir per stage (no overwrite of prior stages)
- if context load is anticipated, **split sub-agents by function** (15 §Sub-Agent Operating Model)
- **Integration agent must not read raw artifacts** (15 §Integration Rules + §Sub-Agent Operating Model Agent D)

These constraints are folded into 04 §Stop Rules and 01 §Aggregation-First Rule.

## Application Map (15 + cross-check additions → 4 guide files)

| source | 04-CT-INSTRUCTIONS.md | 01-THREAD-GUIDE-COMMON.md | 02-NORMAL-GUIDE.md | 03-EXHAUSTIVE-GUIDE.md |
|---|---|---|---|---|
| 15 §Core Rule | — | new subsection | — | — |
| 15 §Context Risks To Control | — | new subsection | — | — |
| 15 §Bulk QA Staging | **new section** (with both Stage Plan tables + Cross-Check Contract + Stop Rules) | — | — | — |
| 15 §Required Aggregation Before Agent Review | **new section** | new subsection (cross-ref) | — | — |
| 15 §Cluster Signature | — | new subsection | — | — |
| 15 §Representative Sample Rule | — | new section | new subsection | new subsection |
| 15 §Sub-Agent Operating Model | **new section** | — | input-limits cross-ref | input-limits cross-ref |
| 15 §Per-Thread Preflight Requirement | **new section** | — | — | additional runtimeReachable line |
| 15 §Sub-Agent Prompt Requirements | cross-ref to `20-FUTURE-BULK-PASTE-TEMPLATE.md` | — | — | cross-ref |
| 15 §Integration Rules | **new section** | — | — | — |
| 15 §CT Role | **new subsection** under existing CT Boundary | — | — | — |
| 15 §Codex Planning Secretary Role | **new subsection** | — | — | — |
| **Cross-Check Common Execution Contract (NEW)** | **new subsection** under §Bulk QA Staging | — | — | — |
| **Cross-Runner Merge (NEW)** | **new section** | — | — | — |

All changes are **additions**. No existing line in 01/02/03/04 is removed or rewritten.

---

## 04-CT-INSTRUCTIONS.md — proposed additions

### A1 — `## Bulk QA Staging` (new section, end of file)

```markdown
## Bulk QA Staging

Bulk QA does not jump directly to large run counts. It runs in two parallel tracks (Codex primary + ClaudeCode cross-check) under a shared execution contract.

### Codex primary (full plan)

| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 — smoke | 30 | 30 |
| Stage 2 — soak | 200 | 50 |
| Stage 3 — bulk | 770 | 120 |
| Stage 4 — full | 1000 | 300 |

Total per case: Normal 2000, Exhaustive 500.

### ClaudeCode cross-check (1/5-scale parallel)

| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 — smoke | 6 | 6 |
| Stage 2 — soak | 40 | 10 |
| Stage 3 — bulk | 154 | 24 |
| Stage 4 — full | 200 | 60 |

Total per case: Normal 400, Exhaustive 100.

The two runners execute **in parallel**, not sequentially. Each stage may auto-advance per runner, but the stop rules below apply per runner. Cross-runner merge happens only after both runners complete a given stage (or both halt).

### Cross-Check Common Execution Contract

Both runners must agree on:

| Item | Required value |
|---|---|
| commit | identical `origin/main` SHA pinned at round launch |
| harness version | identical (same `scripts/qa-route-simulator.cjs`) |
| active cases | identical (`spouse-01` / `family-01` / `friend-01`) |
| normal / exhaustive mode definition | identical CLI flags |
| stop rules | identical (this section's Stop Rules subsection) |
| aggregate schema | identical (Required Aggregation file list) |
| result-dir | **separate** per runner |
| raw / result sharing during execution | **forbidden** until both runners finish the stage |
| merge | aggregate-only, after both runners complete |

Result-dir layout per runner:

```text
tmp/qa-bulk-runs/codex-primary/<stage-id>-<UTC-timestamp>/
tmp/qa-bulk-runs/claudecode-crosscheck/<stage-id>-<UTC-timestamp>/
tmp/qa-bulk-runs/integrated/<stage-id>-<UTC-timestamp>/   (merge output, written after both runners complete)
```

### Stop Rules (per runner)

- Stop the batch immediately on `hard > 0`.
- Stop after the current batch and summarize the cluster on any new `P0` or `P1` cluster appearance.
- On flaky or new-category appearance, preserve representative samples (run ids, seed/timing/log) before stopping or holding.
- If only known clusters repeat, the stage may proceed to the next stage.
- Hard failures must be summarized before any further stage is launched.
- A runner that stops must not block the other runner; merge waits for the actually-completed coverage from each runner.

### Result Accumulation

Per-runner per-stage results accumulate; do not overwrite prior stages or the other runner's directories. Each runner-side result-dir contains:

```text
PROGRESS.md
raw/run-NNNN/...
aggregate/run-stats.json
aggregate/unique-finding-clusters.json
aggregate/new-vs-baseline-clusters.json
aggregate/flaky-run-summary.json
aggregate/hard-failure-summary.md
aggregate/category-counts.json
representative-samples/<cluster-id>/
review/REVIEW.md
```
```

### A2 — `## Required Aggregation Before Agent Review` (new section, after Bulk QA Staging)

```markdown
## Required Aggregation Before Agent Review

Bulk QA must produce aggregate artifacts before any agent review starts. The same aggregate file list applies to **both runners** (per Cross-Check Common Execution Contract).

Required files per runner-side stage result-dir:

```text
PROGRESS.md
aggregate/run-stats.json
aggregate/unique-finding-clusters.json
aggregate/new-vs-baseline-clusters.json
aggregate/flaky-run-summary.json
aggregate/hard-failure-summary.md
aggregate/category-counts.json
representative-samples/<cluster-id>/
review/REVIEW.md
```

Raw artifacts stay preserved under `raw/` or per-run result directories, but agents do not read them by default.
```

### A3 — `## Sub-Agent Operating Model` (new section)

```markdown
## Sub-Agent Operating Model

Sub-agents are split by analysis function, not by raw run count. Each runner (Codex primary, ClaudeCode cross-check) instantiates its own A/B/C/D set if needed; sub-agents do not cross runner boundaries during execution.

Default large-QA layout per runner:

```text
Agent A — Normal Cluster Reviewer
Input: aggregate normal clusters + representative samples only

Agent B — Exhaustive Cluster Reviewer
Input: aggregate exhaustive clusters + representative samples only

Agent C — Runtime / Simulator Classifier
Input: clusters marked D/R/S/N uncertain, source pointers, small samples

Agent D — Integration Secretary
Input: Agent A/B/C summaries only (within the same runner)
Output: per-runner final action list and unresolved decisions
```

Agent D must not read raw artifacts unless explicitly authorized for a named unresolved cluster. The cross-runner merge (Cross-Runner Merge section) is a separate later step that runs only after both runners' Agent D outputs are available.
```

### A4 — `## Per-Thread Preflight Requirement` (new section)

```markdown
## Per-Thread Preflight Requirement

Every QA thread must include a preflight section before execution or analysis.

Required preflight fields:

```text
runner: codex-primary | claudecode-crosscheck
thread id:
mode:
case scope:
run count:
expected artifact volume:
aggregation available: yes/no
sub-agent plan:
raw artifact read budget:
representative sample limit:
stop rules:
handoff output path:
```

If expected artifact volume is high and aggregation is not available, the thread must stop and request aggregation first.

Sub-agent prompt constraints (verbatim list) live in `20-FUTURE-BULK-PASTE-TEMPLATE.md`. Bulk QA PASTE files include those constraints by reference.
```

### A5 — `## Integration Rules` (new section)

```markdown
## Integration Rules

Per-runner integration must happen by cluster, not by run.

The per-runner integrated summary must contain:

- new clusters since baseline
- resolved known clusters
- repeated known clusters
- flaky clusters
- hard failures
- D/R/S/N distribution
- recommended fix track
- raw artifact pointers, not pasted raw content

The per-runner integrated summary must not paste long transcript blocks; link to representative samples.

Cross-runner merge is a further step, defined in the Cross-Runner Merge section.
```

### A6 — `## Cross-Runner Merge` (new section)

```markdown
## Cross-Runner Merge

Cross-runner merge happens **only after both runners complete a stage** (or both halt with documented stop reasons).

Merge inputs (read-only on both runners):

- `tmp/qa-bulk-runs/codex-primary/<stage-id>-<UTC-timestamp>/aggregate/`
- `tmp/qa-bulk-runs/codex-primary/<stage-id>-<UTC-timestamp>/review/REVIEW.md`
- `tmp/qa-bulk-runs/claudecode-crosscheck/<stage-id>-<UTC-timestamp>/aggregate/`
- `tmp/qa-bulk-runs/claudecode-crosscheck/<stage-id>-<UTC-timestamp>/review/REVIEW.md`

Raw artifacts and per-run logs are out of scope for the merge step.

Merge outputs (write under `tmp/qa-bulk-runs/integrated/<stage-id>-<UTC-timestamp>/`):

```text
MERGE-REPORT.md
codex-vs-claudecode-cluster-diff.json
final-cluster-summary.json
```

`MERGE-REPORT.md` must include:

- runner-side stage completion status (PASS / stopped / partial)
- shared clusters (present in both runners)
- runner-only clusters (Codex-primary-only / ClaudeCode-only)
- divergent severities/categories for the same cluster signature
- stop-rule trigger reconciliation (did both runners trigger? same cluster?)
- recommendations for the next stage launch (proceed / hold / fix-first)

Merge follows the Aggregation-First Rule: it does not read `raw/`, does not paste long transcripts, and only references representative samples by path.
```

### A7 — `### CT Role In Bulk QA` (new subsection under existing `## Boundary`)

```markdown
### CT Role In Bulk QA

CT owns execution operations, not raw semantic judgment. CT covers both runners equally.

CT may report:

- exit status per runner
- hard count per runner
- run count per runner
- artifact completeness per runner
- result paths per runner
- aggregate counts per runner
- new/known cluster counts per runner
- flaky run ids per runner
- cross-runner merge status (pending / done / divergent)

CT must not decide that a cluster is benign or release-blocking from detector count alone, on either runner side.
```

### A8 — `### Codex Planning Secretary Role` (new subsection)

```markdown
### Codex Planning Secretary Role

Codex planning sessions should read:

- per-runner integrated review
- per-runner cluster summary
- cross-runner merge report (after merge)
- unresolved decisions
- representative sample index

They should not read:

- all raw action traces (either runner)
- all route transcripts (either runner)
- all per-run logs (either runner)

If planning requires raw inspection, it must name the cluster, runner, and sample path.
```

---

## 01-THREAD-GUIDE-COMMON.md — proposed additions

### B1 — `## Context Limits And Aggregation-First Rule` (new section, between `## How To Treat Detector Findings` and `## Severity Rules`)

```markdown
## Context Limits And Aggregation-First Rule

Run count may be large. Agent input must stay small.

```text
Bulk execution is machine-owned.
Cluster review is agent-owned.
Raw artifact reading is drill-down only.
Integration reads summaries only.
Cross-runner merge reads aggregates only.
```

No agent should be asked to read 2000 raw transcripts or complete action traces directly. The same applies to the cross-check runner side.

### Context Risks To Control

The following risks must be handled before large QA begins:

1. Top-level agent context overflow from managing too many cases, commands, and reports.
2. Sub-agent context overflow from reading too many raw artifacts.
3. Context overhead from managing many sub-agents.
4. Integration overflow when merging results within a runner.
5. Cross-runner merge overflow when comparing two large aggregate sets.
6. Overflow while opening generated documents and traces for analysis.
7. Planning overflow in CT / Codex planning-secretary sessions.

### Aggregation-First Rule

Bulk QA must produce aggregate artifacts before any agent review starts. The required aggregate file list lives in `04-CT-INSTRUCTIONS.md` §Required Aggregation Before Agent Review. Agents read aggregates and representative samples; raw artifacts are drill-down only. The cross-runner merge step also follows this rule.
```

### B2 — `### Cluster Signature` (new subsection inside `## How To Treat Detector Findings`)

```markdown
### Cluster Signature

Bulk findings must be deduplicated before review. The same signature definition is used by both runners (Codex primary, ClaudeCode cross-check) for cross-runner cluster diff.

Recommended cluster key:

```text
caseId
mode
routeId or routeShape
phase
actionType
category
severity
sourcePath
normalizedActual
normalizedExpected
policyOrRuntimeFlag
```

The exact hash can be implementation-defined, but it must be **stable across reruns and across runners**.
```

### B3 — `## Representative Sample Rule` (new section, after `## Severity Rules`)

```markdown
## Representative Sample Rule

Each cluster should expose only a small sample set to agents. The same limits apply to both runners.

Default sample limits:

- max 3 representative routes per cluster
- max 1 shortest reproduction
- max 1 highest-severity reproduction
- max 1 flaky or divergent reproduction
- max 200 relevant transcript lines per cluster unless explicitly expanded

Agents may request more raw samples only for a named cluster and reason. Cross-runner merge consumes only the per-runner representative samples; it does not request additional raw expansion by default.
```

---

## 02-NORMAL-GUIDE.md — proposed additions

### C1 — `## Normal Reviewer Input Limits` (new section, after `## Normal Mode Goal` and the existing `## Interpretation Rule` from G3)

```markdown
## Normal Reviewer Input Limits

When normal-mode QA scales beyond a single small rerun (Stage 1 onward), the normal reviewer (Agent A in `04-CT-INSTRUCTIONS.md` §Sub-Agent Operating Model) operates under input limits, on both runner sides:

- Input is **aggregate normal clusters + representative samples only**, not raw run-by-run transcripts.
- Sample limits per cluster follow `01-THREAD-GUIDE-COMMON.md` §Representative Sample Rule.
- Detector count alone does not set priority; see `01` §Detector Count Rule and §Aggregation-First Rule.
- A normal reviewer on one runner does not read the other runner's result-dir during execution.

When normal-mode runs are at single-rerun scale (e.g. the 6-run baseline cadence), full transcript reading remains acceptable.
```

---

## 03-EXHAUSTIVE-GUIDE.md — proposed additions

### D1 — `## Exhaustive Reviewer Input Limits` (new section, after `## Exhaustive Mode Goal` and the existing `## Interpretation Rule` from G3)

```markdown
## Exhaustive Reviewer Input Limits

When exhaustive-mode QA scales beyond a single small rerun (Stage 1 onward), the exhaustive reviewer (Agent B in `04-CT-INSTRUCTIONS.md` §Sub-Agent Operating Model) operates under input limits, on both runner sides:

- Input is **aggregate exhaustive clusters + representative samples only**, not raw transcripts.
- Sample limits per cluster follow `01-THREAD-GUIDE-COMMON.md` §Representative Sample Rule.
- Cluster signatures may use `routeShape` instead of literal `routeId` to dedupe state-space variants.
- An exhaustive reviewer on one runner does not read the other runner's result-dir during execution.

### runtimeReachable Requirement

Exhaustive routes may include impossible state orders (per the `--allow-impossible-states` opt-in). Reviewers must distinguish:

- routes that are reachable in runtime (default — `runtimeReachable=true`)
- routes that exist only in the impossible-state opt-in mode (`runtimeReachable=false`)

`runtimeReachable=false` routes must not be classified as runtime release blockers based on simulator transcript alone. They are useful for state-space stress and detector observability, not for runtime severity. Both runners apply the same rule.
```

---

## Resolved Decisions (this proposal)

User-confirmed decisions for round 19/20/21:

1. **Stage Plan**: per-runner split. Codex primary Normal 30/200/770/1000 + Exhaustive 30/50/120/300 → totals Normal 2000 / Exhaustive 500. ClaudeCode cross-check Normal 6/40/154/200 + Exhaustive 6/10/24/60 → totals Normal 400 / Exhaustive 100. Both per case.
2. **Parallel cross-check structure**: two runners execute independently and in parallel under a shared execution contract; merge is aggregate-only after both finish.
3. **Cross-Check Common Execution Contract**: same commit / harness / cases / mode / stop rules / aggregate schema; separate result-dir; no raw/result sharing during execution.
4. **Result-dir layout**: `tmp/qa-bulk-runs/codex-primary/<stage-id>-<UTC>/` and `tmp/qa-bulk-runs/claudecode-crosscheck/<stage-id>-<UTC>/`; merge output `tmp/qa-bulk-runs/integrated/<stage-id>-<UTC>/`.
5. **Stop rule strictness**: hard > 0 → stop; new P0/P1 cluster → stop after batch; flaky/new category → preserve sample then stop/hold; only known clusters repeat → next stage. Per runner.
6. **Result accumulation**: per-runner per-stage; no overwrite of prior stages or the other runner's directories.
7. **Sub-agent split**: by function within each runner (Normal / Exhaustive / Runtime-Simulator Classifier / Integration Secretary); Integration must not read raw artifacts; sub-agents do not cross runner boundaries during execution.
8. **Cross-runner merge**: aggregate-only; outputs `MERGE-REPORT.md` + `codex-vs-claudecode-cluster-diff.json` + `final-cluster-summary.json`.
9. **Application timing**: same round as 21 Codex-Dev request.
10. **Application actor**: Codex-Dev applies (CT does not Edit guide files in this round).
11. **Commit grouping**: default single commit; up to 2 commits split (`guide` / `template`) allowed if diff grows.

## Validation After Application

Read-only checks; no rerun required:

- each addition exists in the target file at the specified location.
- no existing guide line is modified or removed (per "addition-only" promise).
- terminology in added sections matches 15 verbatim where indicated; the only deltas are the user-confirmed Stage Plan (both runners) and the Cross-Check Common Execution Contract / Cross-Runner Merge sections in 04.
- packet files (`PACKET-T1..T6-*.md`) and analysis docs (07–18) are untouched by the guide edits.
- 19 / 20 / 21 themselves are the only new files added in this round.

## Hand-off

1. user / Codex review of this proposal (and 20 + 21).
2. Codex-Dev entry per 21 (PASTE separate from this proposal).
3. Codex-Dev applies guide edits + commits 19 / 20 / 21 + edited guide files.
4. CT reviews diff; if PASS, CT requests user push approval for the docs commit.
5. Subsequent active rounds: use the four rewritten fresh-run `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files; do not generate Stage 1-only PASTEs from the superseded 20 template unless CT/user explicitly chooses a manual stage gate.

CT did not modify any guide file in this proposal. No commit. No additional QA executed.

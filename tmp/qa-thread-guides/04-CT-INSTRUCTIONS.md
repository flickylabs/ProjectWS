# CT Instructions For Six Codex QA Analysis Threads

CT should use this file to generate the six deterministic QA artifact packets.

## Boundary

CT owns:

- execution
- artifact collection
- packet path consistency
- basic counts and category summaries
- preservation of pre-warmup trial artifacts

CT does not own:

- final QA judgment
- release-blocking decision
- fix scope decision
- code or script changes

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

## Baseline

Use:

```text
D:/ProjectWS
```

Baseline commit:

```text
b809ccc
```

Before running, confirm:

```powershell
git -C D:/ProjectWS status --short --branch
git -C D:/ProjectWS log --oneline -5
```

Do not remove or rename `D:/ProjectWS`; it is now the canonical main/Live-QA worktree.

Do not touch `D:/ProjectWS-dev` WIP worktree.

Do not use `D:/ProjectWS-stage1` for these QA runs unless explicitly instructed.

## Preserve Pre-Warmup Trial

Existing trial artifacts:

```text
D:/ProjectWS/tmp/qa-warmup-trial/spouse-01-normal
D:/ProjectWS/tmp/qa-warmup-trial/spouse-01-exhaustive
```

They are pre-warmup trial artifacts. Do not delete them.

If useful, add a marker README:

```text
D:/ProjectWS/tmp/qa-warmup-trial/README-PRE-WARMUP-TRIAL.md
```

The marker should state that these artifacts are reference-only and not the canonical six-thread packet result.

## Result Root

Canonical packet result root:

```text
D:/ProjectWS/tmp/qa-warmup-packet
```

Create six result directories:

```text
tmp/qa-warmup-packet/spouse-01-normal
tmp/qa-warmup-packet/spouse-01-exhaustive
tmp/qa-warmup-packet/family-01-normal
tmp/qa-warmup-packet/family-01-exhaustive
tmp/qa-warmup-packet/friend-01-normal
tmp/qa-warmup-packet/friend-01-exhaustive
```

## Commands

Run from `D:/ProjectWS`.

### T1

```powershell
node scripts/qa-route-simulator.cjs --case spouse-01 --result-dir tmp/qa-warmup-packet/spouse-01-normal
```

### T2

```powershell
node scripts/qa-route-simulator.cjs --exhaustive --case spouse-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-warmup-packet/spouse-01-exhaustive
```

### T3

```powershell
node scripts/qa-route-simulator.cjs --case family-01 --result-dir tmp/qa-warmup-packet/family-01-normal
```

### T4

```powershell
node scripts/qa-route-simulator.cjs --exhaustive --case family-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-warmup-packet/family-01-exhaustive
```

### T5

```powershell
node scripts/qa-route-simulator.cjs --case friend-01 --result-dir tmp/qa-warmup-packet/friend-01-normal
```

### T6

```powershell
node scripts/qa-route-simulator.cjs --exhaustive --case friend-01 --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-warmup-packet/friend-01-exhaustive
```

## Packet Files To Update

Update only the marked CT sections in:

```text
D:/ProjectWS/tmp/qa-thread-guides/PACKET-T1-spouse-01-normal.md
D:/ProjectWS/tmp/qa-thread-guides/PACKET-T2-spouse-01-exhaustive.md
D:/ProjectWS/tmp/qa-thread-guides/PACKET-T3-family-01-normal.md
D:/ProjectWS/tmp/qa-thread-guides/PACKET-T4-family-01-exhaustive.md
D:/ProjectWS/tmp/qa-thread-guides/PACKET-T5-friend-01-normal.md
D:/ProjectWS/tmp/qa-thread-guides/PACKET-T6-friend-01-exhaustive.md
```

For each packet, fill:

- execution status
- start/end time
- duration
- exit code
- result-dir
- route count
- action count
- finding count
- hard finding count
- category distribution
- artifact file list
- any command error

Do not add CT's final judgment.

## Duplicate / Conflict Merge Protocol

여러 thread report가 같은 cluster를 다르게 판정할 수 있다. 통합 단계는 cluster별로 다음을 기록한다:

- agreed facts
- disputed interpretation
- required confirmation
- final axis
- final severity

## Required Artifact Checklist

For each result-dir, confirm presence of:

- `action-by-action-trace.json`
- `coverage-summary.json`
- `coverage-summary.md`
- `findings.json`
- `manifest_validation_findings.json`
- `phase-b-1-gate-spec-report.json`
- `<caseId>-route-summary.md`
- `route-transcripts/`

For exhaustive only, also confirm:

- `exhaustive-generation-summary.json`
- `exhaustive-generation-summary.md`

## Deterministic Note

`qa-route-simulator` is deterministic.

Do not run 30/5 repeated packet runs. One run per thread is enough for canonical deterministic artifacts.

Repeated 30/5 and 2000/300 runs belong to a separate stability/non-deterministic/browser QA track.

## CT Report Message To User

After packet generation, report with this structure:

```text
6-thread QA packet generation complete.

Baseline:
- worktree: D:/ProjectWS
- commit: b809ccc

Generated result dirs:
- tmp/qa-warmup-packet/spouse-01-normal
- tmp/qa-warmup-packet/spouse-01-exhaustive
- tmp/qa-warmup-packet/family-01-normal
- tmp/qa-warmup-packet/family-01-exhaustive
- tmp/qa-warmup-packet/friend-01-normal
- tmp/qa-warmup-packet/friend-01-exhaustive

Thread packet files:
- tmp/qa-thread-guides/PACKET-T1-spouse-01-normal.md
- tmp/qa-thread-guides/PACKET-T2-spouse-01-exhaustive.md
- tmp/qa-thread-guides/PACKET-T3-family-01-normal.md
- tmp/qa-thread-guides/PACKET-T4-family-01-exhaustive.md
- tmp/qa-thread-guides/PACKET-T5-friend-01-normal.md
- tmp/qa-thread-guides/PACKET-T6-friend-01-exhaustive.md

Short Codex thread messages are in:
- tmp/qa-thread-guides/05-CODEX-THREAD-MESSAGES.md

CT did not make final QA judgments. The files are ready for six Codex analysis threads.
```

## Thread Operation Simplification

6개 수동 thread 방식은 운영 비용이 크다. 다음부터는 기본을 2 thread로 단순화한다:

- Thread A: normal 3 cases
- Thread B: exhaustive 3 cases

각 thread는 case별 section을 나누고, 통합 report에서 cluster 기준으로 병합한다. 필요할 때만 6 thread로 확장한다.
## Bulk QA Staging

Bulk QA does not jump directly to large run counts. It runs in two parallel tracks (Codex primary + ClaudeCode cross-check) under a shared execution contract.

### Codex primary (full plan)

| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 ??smoke | 30 | 30 |
| Stage 2 ??soak | 200 | 50 |
| Stage 3 ??bulk | 770 | 120 |
| Stage 4 ??full | 1000 | 300 |

Total per case: Normal 2000, Exhaustive 500.

### ClaudeCode cross-check (1/5-scale parallel)

| Stage | Normal per case | Exhaustive per case |
|---|---:|---:|
| Stage 1 ??smoke | 6 | 6 |
| Stage 2 ??soak | 40 | 10 |
| Stage 3 ??bulk | 154 | 24 |
| Stage 4 ??full | 200 | 60 |

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
- Each packet/round must declare the documented baseline allow-list for the launched round, separated by mode when normal and exhaustive baselines differ.
- New P0/P1 means any cluster or finding category whose representative findings include severity `P0` or `P1` and whose cluster signature/category is absent from the documented baseline allow-list for the launched round. Do not infer P0/P1 status from category-name patterns alone.
- Stop after the current batch and summarize the cluster on any new `P0` or `P1` cluster appearance.
- A cluster/finding category on the launched round's baseline allow-list is a known signal and does not fire the new-P0/P1 stop rule by itself. Other stop rules still apply, including `hard > 0`.
- On flaky or new-category appearance, preserve representative samples (run ids, seed/timing/log) before stopping or holding.
- If only known clusters repeat, the stage may proceed to the next stage.
- Hard failures must be summarized before any further stage is launched.
- A runner that stops must not block the other runner; merge waits for the actually-completed coverage from each runner.

Historical post-S7 baseline (round-20260428):

- Normal mode: `safe_fallback_used`, `evidence_investigate_no_npc_followup`, `qa_annotation_only_action`, `system_only_action_no_npc_followup`
- Exhaustive mode: `evidence_investigate_no_npc_followup`, `system_only_action_no_npc_followup`

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

## Sub-Agent Operating Model

Sub-agents are split by analysis function, not by raw run count. Each runner (Codex primary, ClaudeCode cross-check) instantiates its own A/B/C/D set if needed; sub-agents do not cross runner boundaries during execution.

Default large-QA layout per runner:

```text
Agent A ??Normal Cluster Reviewer
Input: aggregate normal clusters + representative samples only

Agent B ??Exhaustive Cluster Reviewer
Input: aggregate exhaustive clusters + representative samples only

Agent C ??Runtime / Simulator Classifier
Input: clusters marked D/R/S/N uncertain, source pointers, small samples

Agent D ??Integration Secretary
Input: Agent A/B/C summaries only (within the same runner)
Output: per-runner final action list and unresolved decisions
```

Agent D must not read raw artifacts unless explicitly authorized for a named unresolved cluster. The cross-runner merge (Cross-Runner Merge section) is a separate later step that runs only after both runners' Agent D outputs are available.

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

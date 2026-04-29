# 15-BULK-QA-CONTEXT-SUBAGENT-PLAN

> 2026-04-28 operational correction: staging is a checkpoint/autoadvance structure, not a default hard stop after Stage 1. The active worker PASTEs are the four fresh-run `PASTE-*-STAGE-1-FIRST-MESSAGE.md` files, rewritten to start from `run-000001` under `tmp/qa-bulk-runs/restart-20260428/` and run to the final planned target unless a stop rule fires.

## Purpose

This document defines how large QA runs should be planned so that execution scale does not overload agent context.

The goal is not only to run more cases. The goal is to keep analysis reliable when normal / exhaustive runs scale to hundreds or thousands of iterations.

This plan must be reflected in future QA guide updates and in every bulk-QA entry PASTE.

## Core Rule

Run count may be large. Agent input must stay small.

```text
Bulk execution is machine-owned.
Cluster review is agent-owned.
Raw artifact reading is drill-down only.
Integration reads summaries only.
```

No agent should be asked to read 2000 raw transcripts or complete action traces directly.

## Context Risks To Control

The following risks must be handled before large QA begins:

1. Top-level agent context overflow from managing too many cases, commands, and reports.
2. Sub-agent context overflow from reading too many raw artifacts.
3. Context overhead from managing many sub-agents.
4. Integration overflow when merging results.
5. Overflow while opening generated documents and traces for analysis.
6. Planning overflow in CT / Codex planning-secretary sessions.

## Bulk QA Staging

Do not jump directly to 2000 runs per case/mode.

Recommended stages:

```text
Stage 1: 30-run smoke
Stage 2: 200-run soak
Stage 3: 2000-run bulk
```

Stop rules:

- hard failure appears: stop the batch and summarize immediately
- new P0/P1 cluster appears: stop after current batch and review that cluster
- only known clusters repeat: proceed to next stage
- flaky cluster appears: preserve run ids, seed/timing/log, and representative samples

## Required Aggregation Before Agent Review

Bulk QA must produce aggregate artifacts before any agent review starts.

Required files:

```text
aggregate/run-stats.json
aggregate/unique-finding-clusters.json
aggregate/new-vs-baseline-clusters.json
aggregate/flaky-run-summary.json
aggregate/hard-failure-summary.md
aggregate/category-counts.json
representative-samples/<cluster-id>/
review/REVIEW-NORMAL.md
review/REVIEW-EXHAUSTIVE.md
review/REVIEW-INTEGRATED.md
```

Raw artifacts stay preserved under `raw/` or per-run result directories, but agents do not read them by default.

## Cluster Signature

Bulk findings must be deduplicated before review.

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

The exact hash can be implementation-defined, but it must be stable across reruns.

## Representative Sample Rule

Each cluster should expose only a small sample set to agents.

Default sample limits:

- max 3 representative routes per cluster
- max 1 shortest reproduction
- max 1 highest-severity reproduction
- max 1 flaky or divergent reproduction
- max 200 relevant transcript lines per cluster unless explicitly expanded

Agents may request more raw samples only for a named cluster and reason.

## Sub-Agent Operating Model

Sub-agents should be split by analysis function, not by raw run count.

Default large-QA layout:

```text
Agent A — Normal Cluster Reviewer
Input: aggregate normal clusters + representative samples only

Agent B — Exhaustive Cluster Reviewer
Input: aggregate exhaustive clusters + representative samples only

Agent C — Runtime / Simulator Classifier
Input: clusters marked D/R/S/N uncertain, source pointers, small samples

Agent D — Integration Secretary
Input: Agent A/B/C summaries only
Output: final action list and unresolved decisions
```

Agent D must not read raw artifacts unless explicitly authorized for a named unresolved cluster.

## Per-Thread Preflight Requirement

Every QA thread must include a preflight section before execution or analysis.

Required preflight fields:

```text
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

## Sub-Agent Prompt Requirements

Every sub-agent prompt must include context limits.

Required prompt constraints:

```text
Do not read all raw transcripts.
Start from aggregate summaries.
Open raw artifacts only for named clusters.
Use at most 3 representative samples per cluster unless escalation is needed.
Return cluster-level findings, not per-run repetition.
Classify each finding with D/R/S/N before severity.
Do not make runtime-release claims from simulator transcript alone.
```

## Integration Rules

Integration must happen by cluster, not by run.

The integrated summary must contain:

- new clusters since baseline
- resolved known clusters
- repeated known clusters
- flaky clusters
- hard failures
- D/R/S/N distribution
- recommended fix track
- raw artifact pointers, not pasted raw content

The integrated summary must not paste long transcript blocks. It should link to representative samples.

## CT Role

CT owns execution operations, not raw semantic judgment.

CT may report:

- exit status
- hard count
- run count
- artifact completeness
- result paths
- aggregate counts
- new/known cluster counts
- flaky run ids

CT must not decide that a cluster is benign or release-blocking from detector count alone.

## Codex Planning Secretary Role

Codex planning sessions should read:

- integrated review
- cluster summary
- unresolved decisions
- representative sample index

They should not read:

- all raw action traces
- all route transcripts
- all per-run logs

If planning requires raw inspection, it must name the cluster and sample path.

## Guide Update Placement

This plan should be reflected in the guide set after Track B current edits settle.

Recommended placement:

- `04-CT-INSTRUCTIONS.md`: CT role, staging, stop rules, bulk execution boundaries
- `01-THREAD-GUIDE-COMMON.md`: context limits, aggregation-first rule, cluster review rule
- `02-NORMAL-GUIDE.md`: normal reviewer input limits
- `03-EXHAUSTIVE-GUIDE.md`: exhaustive reviewer input limits and runtimeReachable requirement
- future bulk PASTE files: include the sub-agent prompt constraints verbatim

This document can serve as the source text for that update.

## Bottom Line

Large QA is safe only if the system changes from run-level review to cluster-level review.

For 2000-run QA, the correct unit of analysis is not a run and not a transcript. It is a deduplicated cluster with representative samples.

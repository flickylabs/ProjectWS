# Exhaustive Mode Guide

Exhaustive mode uses bounded generated state-space routes.

The command uses:

```text
--exhaustive --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36
```

Exhaustive mode is deterministic. It is broad, not random.

## Exhaustive Mode Goal

Find edge-state, ordering, disclosure, and coverage issues that curated normal routes may miss.

## Interpretation Rule

- edge-state/state-space 탐색
- impossible state가 섞일 수 있으므로 runtimeReachable 여부를 별도 판단
- broad count보다 representative defect cluster를 우선 본다

Exhaustive mode should answer:

- Do unusual action orders expose hidden information?
- Do state transitions leak or contradict facts?
- Do evidence/witness/dossier actions behave safely across many states?
- Are detector findings concentrated around a real root issue?
- Are there P0/P1 defects hidden outside curated routes?

## Exhaustive Mode Artifacts

Expected result-dir shape:

```text
tmp/qa-warmup-packet/<caseId>-exhaustive/
  action-by-action-trace.json
  coverage-summary.json
  coverage-summary.md
  exhaustive-generation-summary.json
  exhaustive-generation-summary.md
  findings.json
  phase-b-1-gate-spec-report.json
  <caseId>-route-summary.md
  route-transcripts/*.md
```

## Reading Strategy

Exhaustive mode can generate hundreds of transcripts. Do not attempt a naive full prose review before triage.

Use this order:

1. Read `exhaustive-generation-summary.md`.
2. Read `<caseId>-route-summary.md`.
3. Read `coverage-summary.md`.
4. Group `findings.json` by category, action type, source path, and route phase.
5. Inspect representative transcripts for each cluster.
6. Inspect any P0 first.
7. Inspect high-count P1 clusters.
8. Inspect routes with unusual combinations:
   - witness before evidence
   - dossier before investigation
   - hidden dispute emergence
   - late lie state pressure
   - evidence investigation with only system output
9. Use `action-by-action-trace.json` to confirm state/order.

## Exhaustive Mode Specific Checks

### Edge Ordering

- Does an action make sense if reached earlier than a curated route would reach it?
- Does the output assume prior emotional context that is absent?
- Does the route expose hidden dispute names, labels, or conclusions too soon?

### Finding Clustering

Large counts often mean one root behavior repeated many times.

Group before judging:

- same category
- same `sourcePath`
- same action type
- same evidence/dispute/witness id
- same output speaker

Report the root issue once, then list affected route patterns.

### Truncation

If the generation summary says routes/states were truncated:

- Do not claim full state-space proof.
- State that coverage is bounded.
- Focus on issues actually observed.

### Detector Noise

Some detector categories may intentionally flag observability gaps rather than player-facing defects.

Classify each cluster as:

- player-facing defect
- policy/disclosure defect
- route-contract observability
- detector noise
- needs human design decision

## Exhaustive Mode Report Emphasis

Your report should emphasize:

- high-risk clusters
- source paths shared across many findings
- any state order that leaks facts
- whether a finding should block release
- whether the issue should be fixed in script/data/policy/runtime/detector

Avoid listing hundreds of duplicates individually.

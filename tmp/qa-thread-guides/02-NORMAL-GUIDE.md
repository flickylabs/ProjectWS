# Normal Mode Guide

Normal mode uses curated manifest routes from:

```text
D:/ProjectWS-main-temp/tmp/qa-route-simulator-manifests/<caseId>.json
```

Normal mode is the closest proxy for intended player-facing QA routes.

## Normal Mode Goal

Check whether the scripted route flows feel coherent, fair, and safe when read as plausible player paths.

## Interpretation Rule

- curated/player-like route 품질 확인
- 대사 흐름, 호칭, witness order, branch continuity에 높은 가중치
- transcript pollution은 QA 품질 blocker로 취급

## Normal Reviewer Input Limits

When normal-mode QA scales beyond a single small rerun (Stage 1 onward), the normal reviewer (Agent A in `04-CT-INSTRUCTIONS.md` 짠Sub-Agent Operating Model) operates under input limits, on both runner sides:

- Input is **aggregate normal clusters + representative samples only**, not raw run-by-run transcripts.
- Sample limits per cluster follow `01-THREAD-GUIDE-COMMON.md` 짠Representative Sample Rule.
- Detector count alone does not set priority; see `01` 짠Detector Count Rule and 짠Aggregation-First Rule.
- A normal reviewer on one runner does not read the other runner's result-dir during execution.

When normal-mode runs are at single-rerun scale (e.g. the 6-run baseline cadence), full transcript reading remains acceptable.

Normal mode should answer:

- Can a player follow the story without hidden context?
- Do route actions create a believable escalation?
- Does the mode avoid over-explaining or spoiling?
- Do evidence and witness interactions arrive in a fair order?
- Are system-only actions clear enough when no NPC follows immediately?

## What To Prioritize

1. Route-by-route transcript reading.
2. Question/answer continuity.
3. Evidence timing and player knowledge.
4. Character voice and relationship tone.
5. Any P0/P1 disclosure or contradiction risk.

## Normal Mode Artifacts

Expected result-dir shape:

```text
tmp/qa-warmup-packet/<caseId>-normal/
  action-by-action-trace.json
  coverage-summary.json
  coverage-summary.md
  findings.json
  phase-b-1-gate-spec-report.json
  <caseId>-route-summary.md
  route-transcripts/*.md
```

## Reading Strategy

1. Start with `<caseId>-route-summary.md`.
2. Open every transcript in `route-transcripts/`.
3. For each transcript, read top to bottom as a player would.
4. Mark where the route feels:
   - confusing
   - too revealing
   - emotionally abrupt
   - detached from the triggering action
   - inconsistent with evidence availability
5. Then inspect `findings.json`.
6. Use `action-by-action-trace.json` only to confirm source/state details.

## Normal Mode Specific Checks

### Player Fairness

- Does the route give enough information for deduction?
- Does it avoid giving away conclusions?
- Does it preserve uncertainty until evidence justifies clarity?

### Curated Route Quality

- Since these routes are manually selected, awkwardness matters more.
- A normal route transcript should be readable as a coherent scene.
- A repeated detector warning can be acceptable, but repeated bad player-facing text is not.

### System-Only Investigation

If `evidence_investigate` produces only system output:

- Check whether the system output itself is clear.
- Check whether the next explicit NPC/judge action can reasonably carry the follow-up.
- Do not call system-only behavior a bug by itself if the route contract expects it.
- Do call it an issue if the player-facing flow feels like a dropped conversation.

## Normal Mode Report Emphasis

Your report should emphasize:

- release blocking issues in curated paths
- narrative and dialogue quality
- normal-player spoiler risk
- route-specific fix candidates

Do not over-focus on exhaustive state-space coverage in normal mode.

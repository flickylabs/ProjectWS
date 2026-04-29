# Common Guide For Codex QA Analysis Threads

You are one of six Codex QA analysis threads.

Your task is not to rubber-stamp route simulator output. Your task is to inspect the assigned case and mode deeply enough to identify script, narrative, evidence, witness, state, and disclosure problems that a player would experience.

## Role Boundary

CT provides artifacts and packet files.

You provide QA judgment.

Do not treat CT summaries, detector categories, or route pass/fail status as final conclusions. They are leads. Confirm issues by reading the actual transcript and source data.

## Required Reading Order

1. Read your `PACKET-*.md` file fully.
2. Read this file, `01-THREAD-GUIDE-COMMON.md`.
3. Read the relevant mode guide:
   - normal: `02-NORMAL-GUIDE.md`
   - exhaustive: `03-EXHAUSTIVE-GUIDE.md`
4. Open your `result-dir`.
5. Read `<caseId>-route-summary.md`.
6. Read `coverage-summary.md` and, if needed, `coverage-summary.json`.
7. Read `findings.json`.
8. Read `route-transcripts/*.md`.
9. Use `action-by-action-trace.json` to confirm action order, state, output speakers, and `sourcePath`.
10. If a finding depends on source content, inspect the source file directly:
    - `src/data/cases/generated/<caseId>.json`
    - `src/data/scriptedText/<caseId>.json`
    - `src/data/disclosurePolicy/<caseId>.json`
    - `tmp/qa-route-simulator-manifests/<caseId>.json`

## QA Goal

Assess whether the assigned case/mode can be released without serious player-facing defects.

This includes:

- route correctness
- narrative continuity
- dialogue quality
- character consistency
- evidence timing
- witness knowledge boundaries
- system/event message clarity
- disclosure policy safety
- normal vs exhaustive information balance

## Scope To Inspect

Inspect all user-facing and player-interpretable text in the assigned artifacts:

- character dialogue
- judge/system messages
- evidence presentation output
- evidence investigation output
- evidence combination output
- dossier output
- witness summon text
- witness question text
- discovery events
- emergence events
- route/state transition text
- fallback, blocked, fail, pass, and edge-state messages
- transcript titles and summaries if they could be used as QA evidence

Also inspect source data when transcript context is insufficient:

- disputes
- evidence metadata
- evidence investigation results
- active third parties / witnesses
- combination recipes and outputs
- lie state configs
- scripted variants
- disclosure policy entries

## Core Review Questions

Use these questions as a checklist. A thread report does not need to mention every item if no issue exists, but every item should be considered.

### Narrative And Context

- Does each line follow naturally from the previous action?
- Does the response answer the question or action that triggered it?
- Does a later line contradict an earlier line?
- Does a route jump emotionally or logically without enough bridge text?
- Does a route imply a fact that the player has not yet earned?
- Does a route fail to acknowledge evidence that was just presented?

### Dialogue And Character Voice

- Are honorifics, politeness level, and tone consistent?
- Are names, roles, and forms of address stable?
- Does the speaker sound like the intended character?
- Does a system line read like a character line, or a character line read like a system/debug line?
- Does emotional intensity match the current dispute state?
- Does the character's stance change only when the state/action justifies it?

### Question And Answer Structure

- Does every question receive an answer that addresses it?
- Does the answer reveal too much or too little for the current mode?
- Does the answer accidentally answer a future question?
- Does repeated questioning escalate naturally?
- Does contradiction pursuit feel connected to the current dispute?

### Evidence Timing

- Is evidence only visible when unlocked?
- Does evidence investigation reveal only investigation-level information?
- Does evidence presentation reveal only presentation-level information?
- Does evidence combination reveal the combined inference at the correct time?
- Does a dossier expose a conclusion before the component evidence supports it?

### Witness Boundaries

- Does a witness only discuss facts they could plausibly know?
- Does a witness disclose hidden disputes too early?
- Does a witness confirm facts that should require evidence first?
- Does witness summon text avoid acting like final testimony?

### Disclosure And Leakage

Prioritize this category.

- Does any line reveal the culprit, correct answer, hidden dispute, or core twist too early?
- Does any line reveal internal `lieState`, route id, policy label, debug label, detector label, source path, or implementation detail?
- Does any line reveal a policy concept instead of in-world phrasing?
- Does a transcript expose labels that should stay QA-only?

### Normal Vs Exhaustive Balance

- Normal mode should represent curated player-like flows.
- Exhaustive mode should expose edge and state-space coverage.
- Normal mode must remain understandable without requiring hidden state knowledge.
- Exhaustive mode may be broader, but it must not be used to justify player-facing leaks.

> Per-mode interpretation rules live in `02-NORMAL-GUIDE.md` and `03-EXHAUSTIVE-GUIDE.md`.

## How To Treat Detector Findings

Detector findings are leads, not verdicts.

### Transcript Interpretation Rule

Simulator transcript에 보인다는 이유만으로 runtime player-facing 노출로 단정하지 않는다.
Source inspection 또는 browser/runtime spot check 전에는 R 또는 S로 둔다.

### Detector Count Rule

Detector count는 실행 통계다. 우선순위 판단 근거가 아니다.
Priority는 source confirmation, runtime reachability, player impact, reproducibility로 정한다.

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

For each serious detector finding:

1. Open the transcript for `routeId`.
2. Locate `actionIndex`.
3. Read the action immediately before and after it.
4. Confirm the actual user-facing output.
5. Inspect `sourcePath` if the output could require data/script changes.
6. Decide whether it is:
   - real release issue
   - observability issue
   - intentional contract behavior
   - duplicate of another issue
   - low-impact noise

Example: `evidence_investigate_no_npc_followup` may be a route contract observability finding if the intended contract is system-only discovery followed by explicit later NPC questioning. Do not classify it as a dialogue defect unless the user-facing flow is actually confusing or broken.

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

Bulk QA must produce aggregate artifacts before any agent review starts. The required aggregate file list lives in `04-CT-INSTRUCTIONS.md` 짠Required Aggregation Before Agent Review. Agents read aggregates and representative samples; raw artifacts are drill-down only. The cross-runner merge step also follows this rule.

## Finding Axis (D/R/S/N)

Every finding gets an axis label before severity.

- `D`: data/source confirmed
- `R`: runtime/browser confirmation needed
- `S`: simulator/report-only
- `N`: noise/non-issue

Examples:

- `P0 + S`: simulator transcript는 깨졌지만 runtime release blocker는 아님
- `P1 + D`: source data mismatch가 확정된 실제 수정 대상
- `P2 + R`: runtime spot check 후 확정

## Severity Rules

Use the highest severity that matches the player impact.

### P0

Release blocker.

Use for:

- direct answer, culprit, core twist, or hidden resolution leak
- internal state, policy, debug, source path, or route implementation exposed to players
- progression impossible or critical route break
- wrong speaker causing a materially false scene
- evidence or witness output that invalidates the investigation

### P1

High priority.

Use for:

- early information that heavily damages deduction
- major character contradiction
- major evidence contradiction
- witness states facts they could not know
- normal route gives deep/exhaustive-level revelation too early
- serious question/answer mismatch affecting interpretation

### P2

Medium priority.

Use for:

- awkward but understandable context jump
- honorific or tone mismatch
- emotional transition too abrupt
- repeated line weakening scene quality
- partial information-balance issue
- system-only output that may need clearer follow-up but does not leak

### P3

Low priority.

Use for:

- polish wording
- minor repetition
- small tone adjustment
- low-impact label/name cleanup not visible to players

## Representative Sample Rule

Each cluster should expose only a small sample set to agents. The same limits apply to both runners.

Default sample limits:

- max 3 representative routes per cluster
- max 1 shortest reproduction
- max 1 highest-severity reproduction
- max 1 flaky or divergent reproduction
- max 200 relevant transcript lines per cluster unless explicitly expanded

Agents may request more raw samples only for a named cluster and reason. Cross-runner merge consumes only the per-runner representative samples; it does not request additional raw expansion by default.

## Finding Format

Every finding should include:

- id: create local id such as `<THREAD_ID>-F01`
- severity
- category
- route id
- action index
- action type
- speaker/output summary
- artifact path
- source path, if known
- exact or short excerpt, if useful
- surrounding context
- why it is a problem
- player impact
- recommended fix direction
- confidence: high / medium / low
- duplicate relation, if any

Avoid dumping long transcript blocks. Quote only the smallest relevant excerpt and summarize the rest.

## Problem Response Procedure

When you find a problem:

1. Do not edit code or data in this thread unless the user explicitly asks for fixes.
2. Record the issue in the report.
3. Check whether the same issue appears in other routes in your assigned result-dir.
4. Group duplicates under one root finding.
5. Separate real player-facing issues from detector/observability issues.
6. Mark uncertain issues as `Additional confirmation needed`.
7. Suggest the minimal fix surface:
   - scripted text only
   - generated case data
   - disclosure policy
   - route simulator detector
   - runtime behavior
   - docs/packet issue

## Source Inspection Tips

Use fast targeted search first.

### Browser Spot Check Criteria

모든 issue를 browser로 확인하지 않는다. 다음 조건에서만 spot check를 요청한다:

- source inspection만으로 runtime 노출 여부가 확정되지 않는 경우
- report가 P0/P1 release blocker라고 주장하지만 simulator artifact 가능성이 있는 경우
- runtime UI render path가 source data를 그대로 표시하는지 확인해야 하는 경우

Recommended commands:

```powershell
rg -n "routeId|evidenceId|disputeId|speaker|exact phrase" D:/ProjectWS
```

Useful files:

```text
D:/ProjectWS/src/data/cases/generated/<caseId>.json
D:/ProjectWS/src/data/scriptedText/<caseId>.json
D:/ProjectWS/src/data/disclosurePolicy/<caseId>.json
D:/ProjectWS/tmp/qa-route-simulator-manifests/<caseId>.json
D:/ProjectWS/tmp/qa-warmup-packet/<caseId>-<mode>/findings.json
D:/ProjectWS/tmp/qa-warmup-packet/<caseId>-<mode>/action-by-action-trace.json
D:/ProjectWS/tmp/qa-warmup-packet/<caseId>-<mode>/route-transcripts/
```

## Required Final Report Format

Use this structure:

```markdown
# <THREAD_ID> QA Report

## 1. Overall Judgment
- Case:
- Mode:
- Baseline commit:
- Release blocking:
- Summary:

## 2. Highest Risk Findings
- List up to 3 highest-risk issues.

## 3. Findings
### <finding id> [<severity>] <short title>
- Category:
- Route/action:
- Artifact:
- Source:
- Evidence:
- Problem:
- Player impact:
- Recommended fix:
- Confidence:

## 4. Disclosure Check
- Answer/core twist leak:
- Evidence early exposure:
- Witness knowledge overreach:
- Internal state/debug/policy exposure:

## 5. Dialogue Quality Check
- Context continuity:
- Question/answer fit:
- Honorifics/address:
- Tone/emotion:
- Character consistency:

## 6. Evidence And Investigation Check
- Evidence unlock timing:
- Investigation output:
- Presentation output:
- Combination/dossier output:

## 7. Witness Check
- Witness availability:
- Witness knowledge scope:
- Summon/question text:

## 8. Normal/Exhaustive Comparison Notes
- Information amount:
- Route representativeness:
- Risk difference:

## 9. Fix Candidates
- Script-only:
- Data/policy:
- Runtime/detector:
- Documentation/packet:

## 10. Additional Confirmation Needed
- Items that need another thread, browser harness, or human judgment.
```

## Do Not Do

- Do not delete artifacts.
- Do not remove temp worktrees.
- Do not assume detector severity equals final severity.
- Do not make final integrated conclusions across all six threads unless assigned to integration.
- Do not fix files unless explicitly asked.

# 20260427 Fast Tester Phase B-1 Route Simulator Spike Summary

## Scope
- runner: `scripts/qa-route-simulator.cjs`
- mode: standalone route/runtime facsimile; no runtime source import; no LLM/browser playthrough
- output root: `tmp/qa-route-simulator-results/`
- manifest root: `tmp/qa-route-simulator-manifests/`

## Spike Result
- routes: 12
- actions: 64
- evidence_investigate actions: 9
- findings: 33
- hard findings: 0
- response_missing findings: 0
- evidence_investigate_no_npc_followup findings: 9
- qa_annotation_only_action findings: 6
- system_only_action_no_npc_followup findings: 2

## Legacy Route Spot Compare
- Phase A audit reference: `tmp/qa-codex-spouse-01-p0-patch-results/20260427-phase-a-audit.md`
- Phase A hard areas: e-4 early truth leak twice, evidence_investigate system-only response_missing once.
- Phase B-1 route covers the evidence_investigate contract path; Phase B-3 reclassifies that system-only output to observability under Gate option ii.
- The legacy runner was not executed in this session because it writes to `tmp/qa-runtime-gate-results/`; Phase B output isolation was preserved.

## P0 Findings
- none

## Gate Spec Option Check
- (i) Keep evidence_investigate response-required and add NPC follow-up data
  runnerLoc: 20; dataChanges: caseData or scriptedText NPC follow-up fields needed for every investigation branch; runtimeImpact: dispatch must read and emit those NPC follow-ups; current runtime explicitly blocks automatic NPC interrogation after evidence investigation
  uxFit: weak - conflicts with the current "NPC speaks only after explicit question" action contract
  recommendation: Do not choose for Phase B-1/B-3 unless product explicitly changes evidence investigation into a hybrid investigation+question action.
- (ii) Redefine evidence_investigate as system-only and remove it from response-required
  runnerLoc: 20; dataChanges: none; runtimeImpact: none
  uxFit: strong - evidence investigation remains an information-acquisition action; follow-up NPC speech happens through a later explicit judge_question
  recommendation: Recommended. Reclassify the current P0 response_missing to an observability evidence_investigate_no_npc_followup detector.
- (iii) Wire investigationStages[].scriptedNpcResponses into runtime and Gate
  runnerLoc: 80; dataChanges: investigationStages.scriptedNpcResponses coverage needed across caseData plus type/schema validation; runtimeImpact: dispatch and resolver integration required; existing type allows the field but current runtime/Gate do not read it
  uxFit: medium - preserves authored follow-ups but still changes the current no-auto-NPC investigation contract
  recommendation: Only choose as a separate Phase B-6/data-runtime track after user approval.

## CT Recommendation
- Recommend option (ii): `evidence_investigate` should be treated as system-only information acquisition, not response-required NPC interrogation.
- If option (i) or (iii) is selected, split into Phase B-6 because data/runtime contracts must change.

## Outputs
- `tmp/qa-route-simulator-results/findings.json`
- `tmp/qa-route-simulator-results/action-by-action-trace.json`
- `tmp/qa-route-simulator-results/coverage-summary.md`
- `tmp/qa-route-simulator-results/phase-b-1-gate-spec-report.json`
- `tmp/qa-route-simulator-results/route-transcripts/spouse-01-phase3-baseline.md`

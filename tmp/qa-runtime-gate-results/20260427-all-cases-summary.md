# 20260427 All-Cases Runtime QA Gate Summary

## Scope
- runner: `scripts/qa-runtime-gate.cjs`
- mode: all-cases fast QA simulator, static/facsimile scan
- cases: spouse-01, family-01, friend-01
- scripted variants scanned: 14931
- scripted entries scanned: 1776
- case data text fields scanned: 512
- disclosure policy text fields scanned: 71
- emergence hook variants scanned: 27

## Constraints
- OpenAI calls: none
- browser full playthrough: none
- runtime/source patch: none
- ScriptedText/caseData mutation: none
- `src/data/emergenceHooks.ts`: read-only scan

## Findings
- total: 1914
- P0: 243
- P1: 1048
- P2: 623

## Detector Coverage
- truth lexeme early exposure: 98
- surface-only channel truth leak: 58
- evidenceStage-before hidden/truth description exposure: 184
- locked evidence name / surfaceName violation: 23
- S0-S2 NPC truth leak: 9
- response missing: 0
- Q-A mismatch candidate: 858
- generic/archetype-irrelevant fallback candidate: 82
- internal label / internal term exposure: 128
- Korean polish candidate: 541

## Category Counts
- qa_mismatch_candidate: 858
- korean_polish_candidate: 541
- evidence_stage_truth_description_exposure: 184
- internal_label_or_term_exposed: 128
- generic_fallback_candidate: 82
- surface_only_channel_truth_leak: 58
- truth_lexeme_early_exposure: 31
- locked_evidence_name_exposed: 19
- npc_truth_leak_s0_s2: 9
- surface_name_violation: 4

## Case Counts
- spouse-01: total 610, P0 64, P1 389, P2 157
- family-01: total 489, P0 117, P1 272, P2 100
- friend-01: total 815, P0 62, P1 387, P2 366

## Outputs
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/{caseId}-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md`
- `tmp/qa-runtime-gate-results/patch-priority.md`

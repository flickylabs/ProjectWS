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
- total: 1757
- P0: 87
- P1: 1048
- P2: 622

## Detector Coverage
- truth lexeme early exposure: 87
- surface-only channel truth leak: 58
- evidenceStage-before hidden/truth description exposure: 62
- locked evidence name / surfaceName violation: 0
- S0-S2 NPC truth leak: 9
- response missing: 0
- Q-A mismatch candidate: 858
- generic/archetype-irrelevant fallback candidate: 82
- internal label / internal term exposure: 128
- Korean polish candidate: 540

## Category Counts
- qa_mismatch_candidate: 858
- korean_polish_candidate: 540
- internal_label_or_term_exposed: 128
- generic_fallback_candidate: 82
- evidence_stage_truth_description_exposure: 62
- surface_only_channel_truth_leak: 58
- truth_lexeme_early_exposure: 20
- npc_truth_leak_s0_s2: 9

## Case Counts
- spouse-01: total 594, P0 48, P1 389, P2 157
- family-01: total 404, P0 33, P1 272, P2 99
- friend-01: total 759, P0 6, P1 387, P2 366

## Outputs
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/{caseId}-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md`
- `tmp/qa-runtime-gate-results/patch-priority.md`

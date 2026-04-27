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
- total: 1669
- P0: 0
- P1: 1048
- P2: 621

## Detector Coverage
- truth lexeme early exposure: 0
- surface-only channel truth leak: 0
- evidenceStage-before hidden/truth description exposure: 61
- locked evidence name / surfaceName violation: 0
- S0-S2 NPC truth leak: 0
- response missing: 0
- Q-A mismatch candidate: 859
- generic/archetype-irrelevant fallback candidate: 82
- internal label / internal term exposure: 128
- Korean polish candidate: 539

## Category Counts
- qa_mismatch_candidate: 859
- korean_polish_candidate: 539
- internal_label_or_term_exposed: 128
- generic_fallback_candidate: 82
- evidence_stage_truth_description_exposure: 61

## Case Counts
- spouse-01: total 547, P0 0, P1 390, P2 157
- family-01: total 370, P0 0, P1 272, P2 98
- friend-01: total 752, P0 0, P1 386, P2 366

## Outputs
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/{caseId}-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md`
- `tmp/qa-runtime-gate-results/patch-priority.md`

# 20260427 All-Cases Runtime QA Gate Summary

## Scope
- runner: `scripts/qa-runtime-gate.cjs`
- mode: all-cases fast QA simulator, static/facsimile scan
- cases: spouse-01, family-01, friend-01
- scripted variants scanned: 15036
- scripted entries scanned: 1797
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
- total: 1226
- P0: 0
- P1: 768
- P2: 458

## Detector Coverage
- truth lexeme early exposure: 0
- surface-only channel truth leak: 0
- evidenceStage-before hidden/truth description exposure: 22
- locked evidence name / surfaceName violation: 0
- S0-S2 NPC truth leak: 0
- response missing: 0
- Q-A mismatch candidate: 737
- generic/archetype-irrelevant fallback candidate: 72
- internal label / internal term exposure: 9
- Korean polish candidate: 386

## Category Counts
- qa_mismatch_candidate: 737
- korean_polish_candidate: 386
- generic_fallback_candidate: 72
- evidence_stage_truth_description_exposure: 22
- internal_label_or_term_exposed: 9

## Case Counts
- spouse-01: total 167, P0 0, P1 129, P2 38
- family-01: total 347, P0 0, P1 270, P2 77
- friend-01: total 712, P0 0, P1 369, P2 343

## Outputs
- `tmp/qa-runtime-gate-results/findings.json`
- `tmp/qa-runtime-gate-results/20260427-all-cases-summary.md`
- `tmp/qa-runtime-gate-results/{caseId}-summary.md`
- `tmp/qa-runtime-gate-results/channel-summary.md`
- `tmp/qa-runtime-gate-results/patch-priority.md`

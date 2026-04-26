# QA-Q Codex General Audit Summary

- Generated: 2026-04-26T05:08:37.897Z
- Scope: ScriptedText 14931 variants + generated case data + claimPolicies/code fallback scan
- Active cases: spouse-01, family-01, friend-01
- Total variants read directly: 14931

## Task Result

| Part | Passed Tasks | Failed Tasks | Findings |
| --- | ---: | ---: | ---: |
| Part 1 schema/count/dimension | 40 | 60 | 890 |
| Part 2 content pattern scan | 0 | 100 | 104 |
| Part 3 consistency/code fallback | 20 | 80 | 108 |

## Variant Matrix

| Case | Channels | Variants | Expected |
| --- | ---: | ---: | ---: |
| spouse-01 | 18 | 4677 | 4677 |
| family-01 | 18 | 5172 | 5172 |
| friend-01 | 18 | 5082 | 5082 |

## Content Pattern Hits

| Pattern | Hits |
| --- | ---: |
| noun_action | 13 |
| weak_쪽 | 25 |
| trans_style | 1 |
| user_pattern_1_쪽이었는데 | 20 |
| user_pattern_2_무엇을_알고_보고 | 2 |
| user_pattern_3_흐리면 | 1 |
| user_pattern_4_명사형 | 1 |
| broken_particle | 0 |
| mechanical_observ | 7 |
| direct_quote_combo | 0 |
| judge_call_violation | 0 |
| witness_title_violation | 0 |
| honor_buin | 10 |
| haeyo_violation | 0 |
| truth_throttle_violation | 24 |
| case_setting_conflict | 0 |
| other_case_name_intrusion | 0 |

## P0 Highlights

- contradiction_pair_without_interrogation: family-01 / contradiction_pursuit - contradiction_pursuit contains party/dispute pairs missing from interrogation
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d3|S1 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d3|S2 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d3|S3 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d3|S4 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d3|S1 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d3|S2 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d3|S3 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d3|S4 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d4|S1 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d4|S2 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d4|S3 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / a|h-d4|S4 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d4|S1 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d4|S2 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d4|S3 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / contradiction_pursuit / b|h-d4|S4 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / emotional_overload / a|h-d3 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / emotional_overload / b|h-d3 - Entry disputeId is not present in generated case data
- entry_dispute_not_in_case_data: family-01 / emotional_overload / a|h-d4 - Entry disputeId is not present in generated case data
- ... 607 more P0 items in JSON report.

## Case Comparison Matrix

| Channel | spouse-01 entries/variants | family-01 entries/variants | friend-01 entries/variants |
| --- | ---: | ---: | ---: |
| interrogation | 144/1440 | 180/1800 | 180/1800 |
| evidence_present | 168/1470 | 168/1470 | 168/1470 |
| dossier | 24/240 | 33/330 | 27/270 |
| witness | 9/90 | 9/90 | 9/90 |
| aftermath | 5/25 | 5/25 | 5/25 |
| system_message | 11/55 | 11/55 | 11/55 |
| contradiction_pursuit | 32/320 | 32/320 | 32/320 |
| interjection | 16/160 | 16/160 | 16/160 |
| emotional_overload | 8/80 | 8/80 | 8/80 |
| evidence_discovery | 12/12 | 12/12 | 12/12 |
| trust_action | 18/180 | 18/180 | 18/180 |
| mediation | 8/80 | 8/80 | 8/80 |
| judge_question | 48/240 | 48/240 | 48/240 |
| judge_contradiction | 12/60 | 12/60 | 12/60 |
| judge_evidence_combo | 24/120 | 33/165 | 27/135 |
| judge_witness_summon | 9/45 | 9/45 | 9/45 |
| rapport_milestone | 6/30 | 6/30 | 6/30 |
| contradict_milestone | 6/30 | 6/30 | 6/30 |

## Recommended Actions

- P0: Fix invalid case/dispute references, empty required fields, unresolved placeholders, and data-backed name fallback bugs first.
- P1: Review Truth Throttle hits and judge/system mechanical phrasing manually before broad replacements.
- P2: Use the pattern sample lists to smooth noun-heavy or generic phrasing without changing story facts.

## Outputs

- Raw JSON: `tmp/qa-redo-20260426/QA-Q-codex-report.json`
- Audit script: `tmp/qa-redo-20260426/QA-Q-codex-audit.cjs`

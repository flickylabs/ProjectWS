# friend-01 QA Runtime Gate Summary

## Scan Volume
- scripted entries: 602
- scripted variants: 5082
- case data text fields: 171
- disclosure policy text fields: 24
- emergence hook variants: 12

## Findings
- total: 815
- P0: 62
- P1: 387
- P2: 366

## Category Counts
- korean_polish_candidate: 351
- qa_mismatch_candidate: 347
- evidence_stage_truth_description_exposure: 86
- generic_fallback_candidate: 15
- internal_label_or_term_exposed: 6
- truth_lexeme_early_exposure: 4
- surface_name_violation: 3
- surface_only_channel_truth_leak: 2
- npc_truth_leak_s0_s2: 1

## Channel Counts
- judge_question: 332
- interrogation: 172
- evidence_present: 75
- judge_witness_summon: 51
- case_data: 42
- contradiction_pursuit: 42
- evidence_discovery: 32
- interjection: 30
- judge_contradiction: 18
- emotional_overload: 9
- system_message: 8
- dossier: 2
- emergence_event: 1
- judge_evidence_combo: 1

## Top P0 Examples
- QARG-01285 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|early|1].variants[id=b-e-3-early-stage1-v1])
- QARG-01286 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|early|1].variants[id=b-e-3-early-stage1-v2])
- QARG-01287 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|early|1].variants[id=b-e-3-early-stage1-v6])
- QARG-01288 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|early|1].variants[id=b-e-3-early-stage1-v7])
- QARG-01289 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|early|1].variants[id=b-e-3-early-stage1-v10])
- QARG-01291 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|mid|1].variants[id=b-e-3-mid-stage1-v1])
- QARG-01292 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|mid|1].variants[id=b-e-3-mid-stage1-v5])
- QARG-01293 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|mid|1].variants[id=b-e-3-mid-stage1-v9])
- QARG-01298 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|late|1].variants[id=b-e-3-late-stage1-v1])
- QARG-01299 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|late|1].variants[id=b-e-3-late-stage1-v2])
- QARG-01300 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|late|1].variants[id=b-e-3-late-stage1-v3])
- QARG-01301 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|late|1].variants[id=b-e-3-late-stage1-v5])

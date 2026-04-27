# family-01 QA Runtime Gate Summary

## Scan Volume
- scripted entries: 614
- scripted variants: 5172
- case data text fields: 173
- disclosure policy text fields: 26
- emergence hook variants: 12

## Findings
- total: 489
- P0: 117
- P1: 272
- P2: 100

## Category Counts
- qa_mismatch_candidate: 266
- evidence_stage_truth_description_exposure: 65
- korean_polish_candidate: 55
- generic_fallback_candidate: 45
- truth_lexeme_early_exposure: 20
- locked_evidence_name_exposed: 19
- surface_only_channel_truth_leak: 13
- npc_truth_leak_s0_s2: 4
- internal_label_or_term_exposed: 1
- surface_name_violation: 1

## Channel Counts
- interrogation: 184
- evidence_present: 73
- case_data: 44
- judge_evidence_combo: 38
- contradiction_pursuit: 35
- evidence_discovery: 33
- judge_question: 25
- dossier: 15
- system_message: 8
- emotional_overload: 7
- interjection: 7
- player_discovered: 7
- judge_contradiction: 5
- judge_witness_summon: 4
- aftermath: 3
- emergence_event: 1

## Top P0 Examples
- QARG-00672 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S0). (src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-2|S0|fact_pursuit].variants[id=b-d-2-S0-fact-pursuit-v1])
- QARG-00678 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S0). (src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-2|S0|empathy_approach].variants[id=b-d-2-S0-empathy-approach-v4])
- QARG-00785 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S2). (src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-5|S2|empathy_approach].variants[id=b-d-5-S2-empathy-approach-v2])
- QARG-00798 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|early|1].variants[id=a-e-1-early-stage1-v1])
- QARG-00799 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|early|1].variants[id=a-e-1-early-stage1-v3])
- QARG-00800 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|early|1].variants[id=a-e-1-early-stage1-v5])
- QARG-00801 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|early|1].variants[id=a-e-1-early-stage1-v8])
- QARG-00802 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|mid|1].variants[id=a-e-1-mid-stage1-v1])
- QARG-00803 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|mid|1].variants[id=a-e-1-mid-stage1-v4])
- QARG-00804 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|mid|1].variants[id=a-e-1-mid-stage1-v7])
- QARG-00805 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|mid|1].variants[id=a-e-1-mid-stage1-v10])
- QARG-00806 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-1|late|1].variants[id=a-e-1-late-stage1-v1])

# family-01 QA Runtime Gate Summary

## Scan Volume
- scripted entries: 614
- scripted variants: 5172
- case data text fields: 173
- disclosure policy text fields: 26
- emergence hook variants: 12

## Findings
- total: 404
- P0: 33
- P1: 272
- P2: 99

## Category Counts
- qa_mismatch_candidate: 266
- korean_polish_candidate: 54
- generic_fallback_candidate: 45
- truth_lexeme_early_exposure: 16
- surface_only_channel_truth_leak: 13
- evidence_stage_truth_description_exposure: 5
- npc_truth_leak_s0_s2: 4
- internal_label_or_term_exposed: 1

## Channel Counts
- interrogation: 184
- judge_evidence_combo: 38
- contradiction_pursuit: 35
- evidence_discovery: 33
- case_data: 27
- judge_question: 23
- dossier: 15
- evidence_present: 14
- emotional_overload: 7
- interjection: 7
- player_discovered: 7
- judge_contradiction: 5
- judge_witness_summon: 4
- aftermath: 3
- emergence_event: 1
- system_message: 1

## Top P0 Examples
- QARG-00656 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S0). (src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-2|S0|fact_pursuit].variants[id=b-d-2-S0-fact-pursuit-v1])
- QARG-00662 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S0). (src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-2|S0|empathy_approach].variants[id=b-d-2-S0-empathy-approach-v4])
- QARG-00769 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S2). (src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-5|S2|empathy_approach].variants[id=b-d-5-S2-empathy-approach-v2])
- QARG-00793 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-1.b.q1|late].variants[id=dc-1-b-q1-late-v3])
- QARG-00794 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-1.b.q1|late].variants[id=dc-1-b-q1-late-v6])
- QARG-00796 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-2.b.q1|late].variants[id=dc-2-b-q1-late-v4])
- QARG-00797 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-2.b.q2|late].variants[id=dc-2-b-q2-late-v1])
- QARG-00798 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-2.b.q2|late].variants[id=dc-2-b-q2-late-v3])
- QARG-00800 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-3.b.q2|late].variants[id=dc-3-b-q2-late-v3])
- QARG-00801 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-4.b.q1|late].variants[id=dc-4-b-q1-late-v1])
- QARG-00802 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-4.b.q1|late].variants[id=dc-4-b-q1-late-v2])
- QARG-00803 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-4.b.q1|late].variants[id=dc-4-b-q1-late-v6])

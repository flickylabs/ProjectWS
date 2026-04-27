# spouse-01 QA Runtime Gate Summary

## Scan Volume
- scripted entries: 560
- scripted variants: 4677
- case data text fields: 168
- disclosure policy text fields: 21
- emergence hook variants: 3

## Findings
- total: 594
- P0: 48
- P1: 389
- P2: 157

## Category Counts
- qa_mismatch_candidate: 245
- korean_polish_candidate: 135
- internal_label_or_term_exposed: 121
- surface_only_channel_truth_leak: 43
- evidence_stage_truth_description_exposure: 23
- generic_fallback_candidate: 22
- npc_truth_leak_s0_s2: 4
- truth_lexeme_early_exposure: 1

## Channel Counts
- judge_evidence_combo: 322
- interrogation: 82
- judge_question: 68
- evidence_present: 37
- dossier: 30
- evidence_discovery: 14
- judge_contradiction: 13
- interjection: 8
- case_data: 6
- contradiction_pursuit: 4
- emotional_overload: 3
- judge_witness_summon: 3
- mediation: 1
- player_discovered: 1
- system_message: 1
- trust_action: 1

## Top P0 Examples
- QARG-00058 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S2). (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-2|S2|fact_pursuit].variants[id=b-d-2-S2-fact-pursuit-v7])
- QARG-00059 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S2). (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-2|S2|motive_search].variants[id=b-d-2-S2-motive-search-v7])
- QARG-00120 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v1])
- QARG-00121 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v2])
- QARG-00122 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v4])
- QARG-00123 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v8])
- QARG-00124 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v9])
- QARG-00125 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v10])
- QARG-00126 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|late].variants[id=dc-1-b-q1-late-v1])
- QARG-00127 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|late].variants[id=dc-1-b-q1-late-v2])
- QARG-00128 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|late].variants[id=dc-1-b-q1-late-v4])
- QARG-00129 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|late].variants[id=dc-1-b-q1-late-v6])

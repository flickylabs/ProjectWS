# friend-01 QA Runtime Gate Summary

## Scan Volume
- scripted entries: 602
- scripted variants: 5082
- case data text fields: 171
- disclosure policy text fields: 24
- emergence hook variants: 12

## Findings
- total: 759
- P0: 6
- P1: 387
- P2: 366

## Category Counts
- korean_polish_candidate: 351
- qa_mismatch_candidate: 347
- evidence_stage_truth_description_exposure: 34
- generic_fallback_candidate: 15
- internal_label_or_term_exposed: 6
- truth_lexeme_early_exposure: 3
- surface_only_channel_truth_leak: 2
- npc_truth_leak_s0_s2: 1

## Channel Counts
- judge_question: 331
- interrogation: 172
- judge_witness_summon: 51
- contradiction_pursuit: 42
- evidence_present: 37
- case_data: 34
- evidence_discovery: 31
- interjection: 30
- judge_contradiction: 18
- emotional_overload: 9
- dossier: 2
- emergence_event: 1
- judge_evidence_combo: 1

## Top P0 Examples
- QARG-01208 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/friend-01.json:channels.dossier.entries[key=dc-2.b.q1|late].variants[id=dc-2-b-q1-late-v1])
- QARG-01209 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/friend-01.json:channels.dossier.entries[key=dc-2.b.q1|late].variants[id=dc-2-b-q1-late-v6])
- QARG-01418 [P0/truth_lexeme_early_exposure] Truth lexeme appears before the context is allowed to reveal it. (src/data/scriptedText/friend-01.json:channels.judge_question.entries[key=d-2|motive_search|4].variants[id=judgeq-d-2-motive_search-4-v4])
- QARG-01639 [P0/truth_lexeme_early_exposure] Truth lexeme appears before the context is allowed to reveal it. (src/data/scriptedText/friend-01.json:channels.judge_evidence_combo.entries[key=dc-2.b.q1|soft].variants[id=judgecombo-dc-2.b.q1-soft-v3])
- QARG-01740 [P0/truth_lexeme_early_exposure] Truth lexeme appears before the context is allowed to reveal it. (src/data/cases/generated/friend-01.json:evidence.e-6.investigationStages.2.question.text)
- QARG-01757 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S0). (src/data/emergenceHooks.ts:friend-01.d-4.attack.text)

# Patch Priority

## P0-disclosure-gate
- total: 98
- severity: P0 98, P1 0, P2 0
- cases: spouse-01 54, family-01 37, friend-01 7
- categories: surface_only_channel_truth_leak 58, truth_lexeme_early_exposure 31, npc_truth_leak_s0_s2 9

- QARG-00058 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S2). (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-2|S2|fact_pursuit].variants[id=b-d-2-S2-fact-pursuit-v7])
- QARG-00059 [P0/npc_truth_leak_s0_s2] NPC truth lexeme appears before confession gate (b/S2). (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-2|S2|motive_search].variants[id=b-d-2-S2-motive-search-v7])
- QARG-00121 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v1])
- QARG-00122 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v2])
- QARG-00123 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v4])
- QARG-00124 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v8])
- QARG-00125 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v9])
- QARG-00126 [P0/surface_only_channel_truth_leak] Truth lexeme appears in surface-only channel dossier. (src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v10])

## P0-evidence-stage-gate
- total: 122
- severity: P0 122, P1 0, P2 0
- cases: family-01 60, friend-01 52, spouse-01 10
- categories: evidence_stage_truth_description_exposure 122

- QARG-00114 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-7. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-7|early|request_original].variants[id=a-e-7-early-request_original-v4])
- QARG-00587 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/cases/generated/spouse-01.json:evidence.e-1.partyContext.b.implication)
- QARG-00589 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/cases/generated/spouse-01.json:evidence.e-3.partyContext.b.implication)
- QARG-00591 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-4. (src/data/cases/generated/spouse-01.json:evidence.e-4.v3DepthPlan.excerpt.summary)
- QARG-00593 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-4. (src/data/cases/generated/spouse-01.json:evidence.e-4.partyContext.a.implication)
- QARG-00594 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-5. (src/data/cases/generated/spouse-01.json:evidence.e-5.description)
- QARG-00595 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-5. (src/data/cases/generated/spouse-01.json:evidence.e-5.investigationResults.request_original)
- QARG-00597 [P0/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-6. (src/data/cases/generated/spouse-01.json:evidence.e-6.partyContext.a.implication)

## P0-surface-name-gate
- total: 23
- severity: P0 23, P1 0, P2 0
- cases: family-01 20, friend-01 3
- categories: locked_evidence_name_exposed 19, surface_name_violation 4

- QARG-00822 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|early|1].variants[id=a-e-5-early-stage1-v1])
- QARG-00824 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|early|1].variants[id=a-e-5-early-stage1-v3])
- QARG-00826 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|early|1].variants[id=a-e-5-early-stage1-v5])
- QARG-00828 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|early|1].variants[id=a-e-5-early-stage1-v8])
- QARG-00830 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|mid|1].variants[id=a-e-5-mid-stage1-v1])
- QARG-00832 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|mid|1].variants[id=a-e-5-mid-stage1-v4])
- QARG-00834 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|mid|1].variants[id=a-e-5-mid-stage1-v7])
- QARG-00836 [P0/locked_evidence_name_exposed] Locked evidence name appears where surfaceName should be used: e-5. (src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=a|e-5|mid|1].variants[id=a-e-5-mid-stage1-v10])

## P1-evidence-stage-review
- total: 62
- severity: P0 0, P1 62, P2 0
- cases: friend-01 34, spouse-01 23, family-01 5
- categories: evidence_stage_truth_description_exposure 62

- QARG-00093 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-1|early|2].variants[id=a-e-1-early-stage2-v1])
- QARG-00094 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-1|mid|2].variants[id=a-e-1-mid-stage2-v1])
- QARG-00095 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-1|late|2].variants[id=a-e-1-late-stage2-v1])
- QARG-00096 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|early|2].variants[id=b-e-1-early-stage2-v1])
- QARG-00098 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|mid|2].variants[id=b-e-1-mid-stage2-v1])
- QARG-00099 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|late|2].variants[id=b-e-1-late-stage2-v1])
- QARG-00100 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|late|2].variants[id=b-e-1-late-stage2-v2])
- QARG-00101 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|late|2].variants[id=b-e-1-late-stage2-v4])

## P1-script-focus-review
- total: 822
- severity: P0 0, P1 822, P2 0
- cases: friend-01 335, family-01 254, spouse-01 233
- categories: qa_mismatch_candidate 822

- QARG-00003 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S4|fact_pursuit].variants[id=a-d-1-S4-fact-pursuit-v6])
- QARG-00004 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S4|motive_search].variants[id=a-d-1-S4-motive-search-v6])
- QARG-00005 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S4|empathy_approach].variants[id=a-d-1-S4-empathy-approach-v6])
- QARG-00006 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v1])
- QARG-00007 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v3])
- QARG-00008 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v4])
- QARG-00009 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v5])
- QARG-00010 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v6])

## P1-script-metadata-review
- total: 36
- severity: P0 0, P1 36, P2 0
- cases: family-01 12, friend-01 12, spouse-01 12
- categories: qa_mismatch_candidate 36

- QARG-00166 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|probe].variants[id=discover-b-e-1-probe-v1])
- QARG-00167 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|probe].variants[id=discover-b-e-1-probe-v1].behaviorHint)
- QARG-00168 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|capture].variants[id=discover-b-e-1-capture-v1])
- QARG-00169 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|capture].variants[id=discover-b-e-1-capture-v1].behaviorHint)
- QARG-00170 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|probe].variants[id=discover-b-e-3-probe-v1])
- QARG-00171 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|probe].variants[id=discover-b-e-3-probe-v1].behaviorHint)
- QARG-00172 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|capture].variants[id=discover-b-e-3-capture-v1])
- QARG-00173 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|capture].variants[id=discover-b-e-3-capture-v1].behaviorHint)

## P1-surface-copy-hygiene
- total: 128
- severity: P0 0, P1 128, P2 0
- cases: spouse-01 121, friend-01 6, family-01 1
- categories: internal_label_or_term_exposed 128

- QARG-00179 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.mediation.entries[key=fact_first|b].variants[id=mediation-fact_first-b-v5].behaviorHint)
- QARG-00261 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|soft].variants[id=judgecombo-dc-1-b-q1-soft-v1].behaviorHint)
- QARG-00264 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|soft].variants[id=judgecombo-dc-1-b-q1-soft-v2].behaviorHint)
- QARG-00267 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|soft].variants[id=judgecombo-dc-1-b-q1-soft-v3].behaviorHint)
- QARG-00270 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|soft].variants[id=judgecombo-dc-1-b-q1-soft-v4].behaviorHint)
- QARG-00273 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|soft].variants[id=judgecombo-dc-1-b-q1-soft-v5].behaviorHint)
- QARG-00276 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|mid].variants[id=judgecombo-dc-1-b-q1-mid-v1].behaviorHint)
- QARG-00279 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_evidence_combo.entries[key=dc-1.b.q1|mid].variants[id=judgecombo-dc-1-b-q1-mid-v2].behaviorHint)

## P2-fallback-polish
- total: 82
- severity: P0 0, P1 0, P2 82
- cases: family-01 45, spouse-01 22, friend-01 15
- categories: generic_fallback_candidate 82

- QARG-00001 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S1|empathy_approach].variants[id=a-d-1-S1-empathy-approach-v2])
- QARG-00002 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S2|motive_search].variants[id=a-d-1-S2-motive-search-v1])
- QARG-00019 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v5])
- QARG-00020 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|motive_search].variants[id=b-d-1-S0-motive-search-v2])
- QARG-00060 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|h-d3|S3|fact_pursuit].variants[id=b-h-d3-S3-fact-pursuit-v1])
- QARG-00062 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|h-d3|S3|empathy_approach].variants[id=b-h-d3-S3-empathy-approach-v1])
- QARG-00068 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|h-d4|S1|empathy_approach].variants[id=a-h-d4-S1-empathy-approach-v4])
- QARG-00074 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|h-d4|S1|motive_search].variants[id=b-h-d4-S1-motive-search-v2])

## P2-korean-polish
- total: 541
- severity: P0 0, P1 0, P2 541
- cases: friend-01 351, spouse-01 135, family-01 55
- categories: korean_polish_candidate 541

- QARG-00083 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|early|self].variants[id=b-e-1-early-self-v1])
- QARG-00085 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-1|mid|other].variants[id=a-e-1-mid-other-v1])
- QARG-00086 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-2|late|other].variants[id=a-e-2-late-other-v1])
- QARG-00087 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-3|early|self].variants[id=b-e-3-early-self-v1])
- QARG-00088 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-4|late|other].variants[id=a-e-4-late-other-v1])
- QARG-00089 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-5|late|both].variants[id=a-e-5-late-both-v1])
- QARG-00090 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-6|early|self].variants[id=a-e-6-early-self-v1])
- QARG-00091 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-6|late|other].variants[id=b-e-6-late-other-v1])

## Scan Baseline
- spouse-01: 4677 scripted variants, 168 case text fields
- family-01: 5172 scripted variants, 173 case text fields
- friend-01: 5082 scripted variants, 171 case text fields

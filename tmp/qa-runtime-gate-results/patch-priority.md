# Patch Priority

## P1-evidence-stage-review
- total: 22
- severity: P0 0, P1 22, P2 0
- cases: friend-01 16, spouse-01 4, family-01 2
- categories: evidence_stage_truth_description_exposure 22

- QARG-00109 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-7. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-7|late|check_metadata].variants[id=a-e-7-late-check_metadata-v9])
- QARG-00158 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-1. (src/data/cases/generated/spouse-01.json:evidence.e-1.investigationResults.check_metadata)
- QARG-00164 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-7. (src/data/cases/generated/spouse-01.json:evidence.e-7.investigationResults.check_metadata)
- QARG-00165 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-7. (src/data/cases/generated/spouse-01.json:evidence.e-7.v3DepthPlan.original.summary)
- QARG-00488 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-2. (src/data/cases/generated/family-01.json:evidence.e-2.investigationResults.check_metadata)
- QARG-00505 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-6. (src/data/cases/generated/family-01.json:evidence.e-6.investigationResults.check_metadata)
- QARG-00696 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|mid|2].variants[id=b-e-3-mid-stage2-v3])
- QARG-00697 [P1/evidence_stage_truth_description_exposure] Evidence truth text appears before deep investigation stage: e-3. (src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-3|late|2].variants[id=b-e-3-late-stage2-v1])

## P1-script-focus-review
- total: 701
- severity: P0 0, P1 701, P2 0
- cases: friend-01 335, family-01 255, spouse-01 111
- categories: qa_mismatch_candidate 701

- QARG-00004 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v1])
- QARG-00005 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v3])
- QARG-00006 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|fact_pursuit].variants[id=a-d-1-S5-fact-pursuit-v6])
- QARG-00007 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|motive_search].variants[id=a-d-1-S5-motive-search-v3])
- QARG-00008 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|motive_search].variants[id=a-d-1-S5-motive-search-v6])
- QARG-00009 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|empathy_approach].variants[id=a-d-1-S5-empathy-approach-v1])
- QARG-00010 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S5|empathy_approach].variants[id=a-d-1-S5-empathy-approach-v6])
- QARG-00013 [P1/qa_mismatch_candidate] Response appears to focus on another dispute. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|empathy_approach].variants[id=b-d-1-S0-empathy-approach-v2])

## P1-script-metadata-review
- total: 36
- severity: P0 0, P1 36, P2 0
- cases: family-01 12, friend-01 12, spouse-01 12
- categories: qa_mismatch_candidate 36

- QARG-00132 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|probe].variants[id=discover-b-e-1-probe-v1])
- QARG-00133 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|probe].variants[id=discover-b-e-1-probe-v1].behaviorHint)
- QARG-00134 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|capture].variants[id=discover-b-e-1-capture-v1])
- QARG-00135 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-1|capture].variants[id=discover-b-e-1-capture-v1].behaviorHint)
- QARG-00136 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|probe].variants[id=discover-b-e-3-probe-v1])
- QARG-00137 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|probe].variants[id=discover-b-e-3-probe-v1].behaviorHint)
- QARG-00138 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|capture].variants[id=discover-b-e-3-capture-v1])
- QARG-00139 [P1/qa_mismatch_candidate] Scripted entry metadata and variant tags disagree. (src/data/scriptedText/spouse-01.json:channels.evidence_discovery.entries[key=b|e-3|capture].variants[id=discover-b-e-3-capture-v1].behaviorHint)

## P1-surface-copy-hygiene
- total: 9
- severity: P0 0, P1 9, P2 0
- cases: friend-01 6, spouse-01 2, family-01 1
- categories: internal_label_or_term_exposed 9

- QARG-00144 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.mediation.entries[key=fact_first|b].variants[id=mediation-fact_first-b-v5].behaviorHint)
- QARG-00145 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|3].variants[id=judgeq-d-1-fact_pursuit-3-v1].behaviorHint)
- QARG-00356 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/family-01.json:channels.aftermath.entries[key=shared_fault].variants[id=shared_fault-v2].behaviorHint)
- QARG-01149 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/friend-01.json:channels.judge_witness_summon.entries[key=w-1|mid].variants[id=judgewitness-w-1-mid-v4])
- QARG-01161 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/friend-01.json:channels.judge_witness_summon.entries[key=w-2|soft].variants[id=judgewitness-w-2-soft-v5])
- QARG-01166 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/friend-01.json:channels.judge_witness_summon.entries[key=w-2|mid].variants[id=judgewitness-w-2-mid-v4])
- QARG-01172 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/friend-01.json:channels.judge_witness_summon.entries[key=w-2|hard].variants[id=judgewitness-w-2-hard-v4])
- QARG-01179 [P1/internal_label_or_term_exposed] Internal label or implementation term appears in visible text. (src/data/scriptedText/friend-01.json:channels.judge_witness_summon.entries[key=w-3|soft].variants[id=judgewitness-w-3-soft-v5])

## P2-fallback-polish
- total: 72
- severity: P0 0, P1 0, P2 72
- cases: family-01 35, spouse-01 22, friend-01 15
- categories: generic_fallback_candidate 72

- QARG-00002 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S1|empathy_approach].variants[id=a-d-1-S1-empathy-approach-v2])
- QARG-00003 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S2|motive_search].variants[id=a-d-1-S2-motive-search-v1])
- QARG-00011 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v5])
- QARG-00012 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|motive_search].variants[id=b-d-1-S0-motive-search-v2])
- QARG-00053 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|h-d3|S3|fact_pursuit].variants[id=b-h-d3-S3-fact-pursuit-v1])
- QARG-00057 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|h-d3|S3|empathy_approach].variants[id=b-h-d3-S3-empathy-approach-v1])
- QARG-00064 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|h-d4|S1|empathy_approach].variants[id=a-h-d4-S1-empathy-approach-v4])
- QARG-00082 [P2/generic_fallback_candidate] Generic fallback-like wording found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|h-d4|S1|motive_search].variants[id=b-h-d4-S1-motive-search-v2])

## P2-korean-polish
- total: 386
- severity: P0 0, P1 0, P2 386
- cases: friend-01 328, family-01 42, spouse-01 16
- categories: korean_polish_candidate 386

- QARG-00001 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=a|d-1|S0|fact_pursuit].variants[id=a-d-1-S0-fact-pursuit-v4])
- QARG-00094 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|early|self].variants[id=b-e-1-early-self-v1])
- QARG-00096 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-1|mid|other].variants[id=a-e-1-mid-other-v1])
- QARG-00097 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-2|late|other].variants[id=a-e-2-late-other-v1])
- QARG-00098 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-3|early|self].variants[id=b-e-3-early-self-v1])
- QARG-00099 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-4|late|other].variants[id=a-e-4-late-other-v1])
- QARG-00100 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-5|late|both].variants[id=a-e-5-late-both-v1])
- QARG-00101 [P2/korean_polish_candidate] Korean copy polish candidate found. (src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=a|e-6|early|self].variants[id=a-e-6-early-self-v1])

## Scan Baseline
- spouse-01: 4677 scripted variants, 168 case text fields
- family-01: 5262 scripted variants, 173 case text fields
- friend-01: 5097 scripted variants, 171 case text fields

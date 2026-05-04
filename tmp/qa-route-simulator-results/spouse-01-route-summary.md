# spouse-01 Route Summary

- routes: 4
- actions: 24
- findings: 11
- hard findings: 0

## Routes
- phase3-baseline [linear]: Phase B-1 spouse-01 baseline route for d-1 questioning, e-1 presentation, and evidence_investigate system-only contract verification.
- phase3-branching-dossier-witness [branching]: Branching route that combines evidence into a dossier card, uses dossier questioning, and checks witness summon flow.
- phase4-cascading-d2-to-hidden [cascading]: Cascading route from d-2 evidence pressure into a hidden dispute emergence event.
- phase5-evidence-heavy-hidden-dossier [evidence-heavy]: Evidence-heavy hidden-dispute route that resolves a dossier card and drives late lieState pressure.

## Findings
- QARS-0023 [observability/evidence_investigate_no_npc_followup] evidence_investigate ended as a system-only discovery action with no automatic NPC follow-up.
- QARS-0024 [P2/safe_fallback_used] Safe fallback used for evidence_combine.
- QARS-0025 [observability/system_only_action_no_npc_followup] witness_summon produced only system/player state output; no NPC follow-up is required.
- QARS-0026 [observability/evidence_investigate_no_npc_followup] evidence_investigate ended as a system-only discovery action with no automatic NPC follow-up.
- QARS-0027 [observability/evidence_investigate_no_npc_followup] evidence_investigate ended as a system-only discovery action with no automatic NPC follow-up.
- QARS-0028 [observability/evidence_investigate_no_npc_followup] evidence_investigate ended as a system-only discovery action with no automatic NPC follow-up.
- QARS-0029 [observability/qa_annotation_only_action] emergence_event produced only QA-annotation output; no player-facing NPC response is required.
- QARS-0030 [P2/safe_fallback_used] Safe fallback used for witness_question.
- QARS-0031 [P2/safe_fallback_used] Safe fallback used for evidence_combine.
- QARS-0032 [P1/qa_focus_review] NPC response appears to focus on another dispute in the executed route.
- QARS-0033 [observability/qa_annotation_only_action] discovery_event produced only QA-annotation output; no player-facing NPC response is required.

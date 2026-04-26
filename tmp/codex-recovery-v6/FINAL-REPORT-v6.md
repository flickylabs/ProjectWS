# Codex Recovery v6 Final Report

## Summary
- v5 baseline preserved: PASS (466 patches).
- v6 additional patches: 161.
- Total changes-log-v6 patches: 627.
- Case data, code fallback, P7 code paths, and d-5 new cells were not edited.

## D1-D4 Results
- D1 LieState Flow: hard residual 0, candidate-only 772.
- D2 Evidence Unlock: residual 0.
- D3 Archetype Quant: hard residual 0, candidate-only 0.
- D4 Meter Timing: residual 0.

## Patch Counts
- P1_QACoherence: 1
- P2_CharacterRegister: 263
- P3_JudgeAngle: 89
- P4_NarrativeDetail: 46
- P5_CodeNameResolve: 68
- P6_SystemTrigger: 1
- D1_LieStateFlow: 159
- D2_EvidenceUnlock: 2
- D3_ArchetypeQuant: 0
- D4_MeterTiming: 0

## Thread-QW-Cross
- Deterministic sample: 1000 / 14931 variants.
- 9x9 cross-validation cells: 72.
- D1 hard issues: 0; D2: 0; D4: 0.

## Validation
- stage-aware truth throttle: PASS
- QA coherence baseline: PASS
- broad homologous baseline: PASS
- D1 lieState flow: PASS
- D2 evidence unlock: PASS
- D3 archetype quant: PASS
- D4 meter timing: PASS
- metadata/skipped preservation: PASS
- v5 protected post-polish drift: 1 field, v5 anchor preserved and not overwritten
- case data untouched: PASS
- build: passed_external
- tsc: passed_external
- semantic-quality logs: generated for all 3 cases; still exits 1 on pre-existing C2/C-callTerm/naturalness rules outside v6 scope

## ClaudeCode Handoff
- claude-polish-candidates-v6.json: 3409 candidates (772 v6 additions).
- p7-ui-surface-leaks-v6.json: 0 candidates; P7 remains out of scope.
- T1/T2/T7 and archetype-voice quant findings are candidate-only where bulk rewriting would risk NPC voice or already-valid partial confession flow.

## Known Issues
- family/friend d-5 new cells remain out of scope.
- code fallback 23 and UI/P7 fixes remain out of scope.
- semantic-quality C1-C5 naturalness/callTerm polishing is reserved for ClaudeCode follow-up.

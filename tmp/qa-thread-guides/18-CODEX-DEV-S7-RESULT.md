# 18-CODEX-DEV-S7-RESULT

Codex-Dev S7 implementation result.

## Baseline / Entry

- Worktree: `D:/ProjectWS-main-temp`
- Baseline HEAD: `db7d7f3 feat(qa-simulator): track B simulator parity + detector tuning + guide updates`
- Entry guard: detached `HEAD`; baseline tags `baseline-pre-policy-v3`, `baseline-pre-policy-v3-stage1`, and `baseline-pre-policy-v3-stage2` present
- Scope: S7 only, `response_missing` detector parity with S3/S4/S6
- New small-rerun base: `tmp/qa-small-rerun-track-b-s7-20260427-210035/`

## Diff Surface

- `scripts/qa-route-simulator.cjs`
- `tmp/qa-thread-guides/18-CODEX-DEV-S7-RESULT.md`

No Track A data/runtime files, manifests, guide history files, baseline tags, or prior result directories were edited.

## S7 Reclassification

The detector record is retained in `findings.json`; reclassified findings keep `detectors: ["response_missing", "response_missing_reclassified"]` and a `reclassifiedFrom` object.

| Action | Old classification | New classification | Reason |
|---|---|---|---|
| `witness_summon` | `P0 response_missing` | `observability system_only_action_no_npc_followup` | Valid summon produces player-facing system state output plus QA annotations, not NPC dialogue. |
| `discovery_event` | `P0 response_missing` | `observability qa_annotation_only_action` | Route event output is QA annotation/state transition only. |
| `emergence_event` | `P0 response_missing` | `observability qa_annotation_only_action` | Route event output is QA annotation/state transition only. |
| `judge_question`, `evidence_present`, other player-facing actions | unchanged | `P0 response_missing` when truly missing | S7 keeps P0 for genuine player-facing missing response. |

Aggregation was updated so `response_missing` category counts now represent only unreclassified player-facing missing responses, while detector-record counts remain available in `phase-b-1-gate-spec-report.json`.

## Validation Commands

- `node --check scripts/qa-route-simulator.cjs` PASS
- `npx eslint scripts/qa-route-simulator.cjs` PASS
- `npx tsc -b --force` PASS
- `npm run build:pc` PASS
  - Vite emitted existing chunk/dynamic-import warnings only; build exit code was 0.

## Post-S7 Small Rerun

Commands run once per case into `tmp/qa-small-rerun-track-b-s7-20260427-210035/`:

```powershell
node scripts/qa-route-simulator.cjs --case <case> --result-dir tmp/qa-small-rerun-track-b-s7-20260427-210035/<case>-normal
node scripts/qa-route-simulator.cjs --exhaustive --case <case> --max-depth=5 --max-states=240 --max-routes=480 --max-actions-per-state=36 --result-dir tmp/qa-small-rerun-track-b-s7-20260427-210035/<case>-exhaustive
```

All six commands exited 0.

| case | mode | routes | actions | findings | hard |
|---|---:|---:|---:|---:|---:|
| spouse-01 | normal | 4 | 24 | 10 | 0 |
| spouse-01 | exhaustive | 480 | 1188 | 633 | 0 |
| family-01 | normal | 4 | 20 | 9 | 0 |
| family-01 | exhaustive | 480 | 1156 | 544 | 0 |
| friend-01 | normal | 4 | 20 | 13 | 0 |
| friend-01 | exhaustive | 480 | 1156 | 603 | 0 |

## Before / After

Baseline: `tmp/qa-small-rerun-track-b-20260428-054018/`

| result dir | hard before | hard after | `response_missing` category before | after | response detector records after |
|---|---:|---:|---:|---:|---:|
| spouse-01-normal | 3 | 0 | 3 | 0 | 3 |
| spouse-01-exhaustive | 180 | 0 | 180 | 0 | 180 |
| family-01-normal | 2 | 0 | 2 | 0 | 2 |
| family-01-exhaustive | 143 | 0 | 143 | 0 | 143 |
| friend-01-normal | 3 | 0 | 3 | 0 | 3 |
| friend-01-exhaustive | 143 | 0 | 143 | 0 | 143 |

Finding totals are unchanged for all six runs; S7 changes classification only.

## After Category / Severity Summary

| result dir | severity/category counts |
|---|---|
| spouse-01-normal | `observability/evidence_investigate_no_npc_followup=4`; `P2/safe_fallback_used=3`; `observability/qa_annotation_only_action=2`; `observability/system_only_action_no_npc_followup=1` |
| spouse-01-exhaustive | `observability/evidence_investigate_no_npc_followup=453`; `observability/system_only_action_no_npc_followup=180` |
| family-01-normal | `P2/safe_fallback_used=5`; `observability/qa_annotation_only_action=2`; `observability/evidence_investigate_no_npc_followup=2` |
| family-01-exhaustive | `observability/evidence_investigate_no_npc_followup=401`; `observability/system_only_action_no_npc_followup=143` |
| friend-01-normal | `P2/safe_fallback_used=7`; `observability/evidence_investigate_no_npc_followup=3`; `observability/qa_annotation_only_action=2`; `observability/system_only_action_no_npc_followup=1` |
| friend-01-exhaustive | `observability/evidence_investigate_no_npc_followup=401`; `observability/system_only_action_no_npc_followup=143`; `P1/qa_focus_review=59` |

## S6 Preservation Check

`evidence_investigate_no_npc_followup` counts are unchanged from the db7d7f3 small-rerun baseline:

| result dir | before | after |
|---|---:|---:|
| spouse-01-normal | 4 | 4 |
| spouse-01-exhaustive | 453 | 453 |
| family-01-normal | 2 | 2 |
| family-01-exhaustive | 401 | 401 |
| friend-01-normal | 3 | 3 |
| friend-01-exhaustive | 401 | 401 |

Manifest validation count was also preserved: normal runs remain spouse `3`, family `5`, friend `7`; exhaustive runs remain `0`.

## Spot Check

Automated trace spot-check covered every post-S7 response-missing detector record:

| result dir | checked | bad |
|---|---:|---:|
| spouse-01-normal | 3 | 0 |
| spouse-01-exhaustive | 180 | 0 |
| family-01-normal | 2 | 0 |
| family-01-exhaustive | 143 | 0 |
| friend-01-normal | 3 | 0 |
| friend-01-exhaustive | 143 | 0 |

Checks enforced:

- no `judge_question` / `evidence_present` record was reclassified;
- `qa_annotation_only_action` records have no player transcript output;
- `system_only_action_no_npc_followup` records have no player-facing `a` / `b` / `witness` dialogue.

Representative samples:

| result dir | sample |
|---|---|
| spouse-01-normal | `phase3-branching-dossier-witness #3 witness_summon`: player `system:witness_summon`; QA `route_simulator_facsimile` |
| spouse-01-exhaustive | `exh-d1-0013 #1 witness_summon`: player `system:witness_summon`; QA `route_simulator_facsimile` |
| family-01-normal | `phase4-cascading-d3-emergence #4 emergence_event`: player `none`; QA `route_simulator_facsimile` |
| family-01-exhaustive | `exh-d1-0014 #1 witness_summon`: player `system:witness_summon`; QA `route_simulator_facsimile` |
| friend-01-normal | `phase3-branching-d5-dossier #5 witness_summon`: player `system:witness_summon`; QA `route_simulator_facsimile` |
| friend-01-exhaustive | `exh-d1-0014 #1 witness_summon`: player `system:witness_summon`; QA `route_simulator_facsimile` |

## S5 Deferred Trace

S5 remains deferred to a follow-up round; S7 (`response_missing` detector parity) lands first.

Trace placement decision: keep the S5 deferred note in this S7 result document only. `14-CODEX-DEV-TRACK-B-RESULT.md` remains unchanged as a closed result document, and no separate S5 memo file was created.

## Status

- S7 code: PASS
- Static validation: PASS
- Post-S7 small rerun: PASS
- Bulk QA: not started in this packet
- Push: not performed

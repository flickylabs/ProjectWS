# family-01-phase3-evidence-heavy-d2-dossier

caseId: family-01
routeId: phase3-evidence-heavy-d2-dossier
phase: phase3
summary: Evidence-heavy d-2 route that combines will evidence and follows with dossier questioning.

## 1. evidence_combine

### Player

- none

### QA Annotations

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-2","inputs":["e-4","e-5"]}`

- system [evidence_combine/route_simulator_runtime_gate] src/data/cases/generated/family-01.json:combinationLab.recipes[id=combine-2]
  Evidence combination skipped by runtime parity gate: combine-2; not fully investigated=e-4, e-5
findings: QARS-0001

## 2. dossier

### Player

- b [dossier]
  형이 오면 어머니가 먼저 긴장하셨습니다. 그래서 저는 공증 이야기를 길게 붙잡지 않으려 했습니다.

### QA Annotations

action: `{"type":"dossier","target":"b","dossierId":"dc-1","questionId":"dc-1.b.q1"}`

- none

## 3. evidence_investigate

### Player

- system [evidence_discovery]
  같은 날 같은 유언장이 두 번 스캔된 기록이다. 앞뒤 문서의 상속 비율이 서로 다르다.

### QA Annotations

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-4","subAction":"request_original"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-4",
      "before": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 1,
        "deepInvestigated": true
      }
    }
  ],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none
findings: QARS-0002

## 4. evidence_present

### Player

- system [system_message]
  증거 제시: 공증사무실 스캔 보관본 [Hard]
- b [evidence_present]
  두 번 제출한 이유가 있습니다. 원래 비율을 바꿨습니다.

### QA Annotations

action: `{"type":"evidence_present","target":"b","evidenceId":"e-4","disputeId":"d-2"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-2",
      "from": "S2",
      "to": "S3"
    }
  ],
  "evidence": [
    {
      "evidenceId": "e-4",
      "before": {
        "unlocked": true,
        "presented": false,
        "stage": 1,
        "deepInvestigated": true
      },
      "after": {
        "unlocked": true,
        "presented": true,
        "stage": 1,
        "deepInvestigated": true
      }
    }
  ],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none

## 5. witness_summon

### Player

- none

### QA Annotations

action: `{"type":"witness_summon","witnessId":"w-1","disputeId":"d-2","prompt":"w-1 is ready to verify the notary timeline."}`

- system [witness_summon/route_simulator_manifest_validation] src/data/cases/generated/family-01.json:duo.socialGraph[id=w-1].relatedDisputeIds
  Witness action skipped by manifest validation: witness_scope_mismatch; Witness w-1 is not scoped to dispute d-2.
findings: QARS-0003


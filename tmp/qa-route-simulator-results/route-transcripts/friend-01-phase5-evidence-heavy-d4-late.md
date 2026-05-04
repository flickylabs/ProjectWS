# friend-01-phase5-evidence-heavy-d4-late

caseId: friend-01
routeId: phase5-evidence-heavy-d4-late
phase: phase5
summary: Evidence-heavy late route for d-4 that combines past records and checks the late evidence investigation contract.

## 1. evidence_combine

### Player

- none

### QA Annotations

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-7","inputs":["e-3","e-6"]}`

- system [evidence_combine/route_simulator_runtime_gate] src/data/cases/generated/friend-01.json:combinationLab.recipes[id=combine-7]
  Evidence combination skipped by runtime parity gate: combine-7; not fully investigated=e-3, e-6
findings: QARS-0020

## 2. dossier

### Player

- b [dossier]
  다은이 아버지가 제 돈을 가져간 일은 맞습니다. 그래도 다은이에게 말하지 못했습니다.

### QA Annotations

action: `{"type":"dossier","target":"b","dossierId":"dc-4","questionId":"dc-4.b.q1"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-1",
      "before": {
        "unlocked": false,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      }
    },
    {
      "evidenceId": "e-2",
      "before": {
        "unlocked": false,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      }
    }
  ],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none

## 3. evidence_present

### Player

- system [system_message]
  증거 제시: 과거 송금 기록 [Hard]
- b [evidence_present]
  '투자금'이라고 했습니다. 한 달만 쓰겠다고 했습니다. 돌아오지 않았습니다.

### QA Annotations

action: `{"type":"evidence_present","target":"b","evidenceId":"e-6"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-6",
      "before": {
        "unlocked": true,
        "presented": false,
        "stage": 0,
        "deepInvestigated": false
      },
      "after": {
        "unlocked": true,
        "presented": true,
        "stage": 0,
        "deepInvestigated": false
      }
    }
  ],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none

## 4. evidence_investigate

### Player

- system [evidence_discovery]
  상환 흔적이 약한 상태에서 B가 A에게 말하지 못한 이유를 물어볼 근거가 생긴다.

### QA Annotations

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-6","subAction":"restore_context"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-6",
      "before": {
        "unlocked": true,
        "presented": true,
        "stage": 0,
        "deepInvestigated": false
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
findings: QARS-0021

## 5. discovery_event

### Player

- none

### QA Annotations

action: `{"type":"discovery_event","eventId":"friend-d4-reviewed","dossierId":"dc-4","followup":"The d-4 late branch remains available for judgment."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [
    {
      "dossierId": "dc-4",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:discovery_event.friend-d4-reviewed
  Discovery event applied: friend-d4-reviewed
- witness [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:discovery_event.friend-d4-reviewed.followup
  The d-4 late branch remains available for judgment.
findings: QARS-0022


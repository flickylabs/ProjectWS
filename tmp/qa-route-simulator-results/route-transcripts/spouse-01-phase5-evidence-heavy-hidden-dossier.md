# spouse-01-phase5-evidence-heavy-hidden-dossier

caseId: spouse-01
routeId: phase5-evidence-heavy-hidden-dossier
phase: phase5
summary: Evidence-heavy hidden-dispute route that resolves a dossier card and drives late lieState pressure.

## 1. evidence_combine

### Player

- none

### QA Annotations

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-4","inputs":["e-6","e-7"]}`

- system [evidence_combine/route_simulator_runtime_gate] src/data/cases/generated/spouse-01.json:combinationLab.recipes[id=combine-4]
  Evidence combination skipped by runtime parity gate: combine-4; not fully investigated=e-6, e-7
findings: QARS-0031

## 2. dossier

### Player

- b [dossier]
  그 댁이 당장 버티기 어려워 보여서 공동 적금을 먼저 깼습니다. 아내에게 말하지 않은 건 제 잘못입니다.

### QA Annotations

action: `{"type":"dossier","target":"b","dossierId":"dc-3","questionId":"dc-3.b.q1"}`

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
    },
    {
      "evidenceId": "e-3",
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

## 3. contradiction_pursuit

### Player

- b [contradiction_pursuit]
  제가 침묵한 게 단초였습니다. 그래도 위임장에 손댄 책임까지 제게 돌릴 수는 없습니다.

### QA Annotations

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"h-d3","transitionTrigger":"empathy_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "h-d3",
      "from": "S3",
      "to": "S4"
    }
  ],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none
findings: QARS-0032

## 4. contradiction_pursuit

### Player

- b [contradiction_pursuit]
  처가 식구 앞에서 가장 노릇도 못 한 것 같아 부끄러웠습니다. 그래서 더 말을 못 했습니다.

### QA Annotations

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"h-d3","transitionTrigger":"direct_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "h-d3",
      "from": "S4",
      "to": "S5"
    }
  ],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none

## 5. discovery_event

### Player

- none

### QA Annotations

action: `{"type":"discovery_event","eventId":"spouse-dc3-reviewed","dossierId":"dc-3","followup":"The dc-3 route card remains available for final judgment."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [
    {
      "dossierId": "dc-3",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:discovery_event.spouse-dc3-reviewed
  Discovery event applied: spouse-dc3-reviewed
- witness [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:discovery_event.spouse-dc3-reviewed.followup
  The dc-3 route card remains available for final judgment.
findings: QARS-0033


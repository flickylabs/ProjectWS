# family-01-phase4-cascading-d3-emergence

caseId: family-01
routeId: phase4-cascading-d3-emergence
phase: phase4
summary: Cascading d-3 route that opens a further hidden dispute through combination and emergence events.

## 1. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-6","disputeId":"d-3"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-3",
      "from": "S2",
      "to": "S3"
    }
  ],
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
    },
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-6
  증거 제시: 오래된 계좌 흐름 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=b|e-6|mid|self].variants[id=b-e-6-mid-self-v1]
  어머니 통장을 거쳐 보냈습니다. 제 형이 모르게 해 달라고 하셔서 그렇게 했습니다.

## 2. evidence_investigate

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-6","subAction":"check_metadata"}`

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

- system [evidence_discovery/runtime_system] src/data/cases/generated/family-01.json:evidence.e-6.investigationResults.check_metadata
  A의 공장 부도 시점에 B의 특별 입금과 어머니 통장에서 A 쪽으로 나간 큰돈이 맞물린다.
findings: QARS-0002

## 3. evidence_combine

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-3","inputs":["e-5","e-6"]}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [
    {
      "disputeId": "d-3",
      "from": "hidden",
      "to": "visible",
      "via": "combine-3"
    }
  ],
  "dossier": [
    {
      "dossierId": "dc-2",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [evidence_combine/runtime_system] src/data/cases/generated/family-01.json:combinationLab.recipes[id=combine-3].discoveryText
  어머니가 90을 남기려 한 이유가 보인다. 20년간 생활비를 대고 형의 부도까지 막아준 것이 윤정후였다.
- witness [evidence_combine/route_simulator_facsimile] src/data/cases/generated/family-01.json:combinationLab.outputs[id=dc-2]
  Analysis note dc-2 is ready for follow-up.

## 4. emergence_event

action: `{"type":"emergence_event","eventId":"family-d4-open","target":"b","disputeId":"d-4","unlockDisputes":["d-4"],"text":"Emergence event opened d-4 after the transfer record route."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [
    {
      "disputeId": "d-4",
      "from": "hidden",
      "to": "visible",
      "via": "family-d4-open"
    }
  ],
  "dossier": [],
  "witnesses": []
}
```

- witness [emergence_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/family-01.json:emergence_event.family-d4-open
  Emergence event opened d-4 after the transfer record route.

## 5. dossier

action: `{"type":"dossier","target":"b","dossierId":"dc-2","questionId":"dc-2.b.q1"}`

- b [dossier/scripted] src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-2.b.q1|mid].variants[id=dc-2-b-q1-mid-v1]
  원본에서는 제 몫이 훨씬 컸고, 최종본에서는 제가 제 몫을 낮췄습니다. 그 판단은 제가 했습니다. 형이 원본을 견디지 못할 거라 봤습니다.

## 6. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-3","transitionTrigger":"empathy_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-3",
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

- b [contradiction_pursuit/scripted] src/data/scriptedText/family-01.json:channels.contradiction_pursuit.entries[key=b|d-3|S3].variants[id=contra-b-d-3-S3-v1]
  재판관님, 20년 송금 일부는 제 돈이었습니다. 형이 알면 더 버티기 어려울까 숨겼습니다.


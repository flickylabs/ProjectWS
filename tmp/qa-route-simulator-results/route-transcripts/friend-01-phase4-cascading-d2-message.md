# friend-01-phase4-cascading-d2-message

caseId: friend-01
routeId: phase4-cascading-d2-message
phase: phase4
summary: Cascading d-2 route that tests fiance-message evidence and witness confirmation.

## 1. evidence_present

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
      "evidenceId": "e-4",
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-4
  증거 제시: 예비신랑 메시지 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-4|mid|self].variants[id=b-e-4-mid-self-v1]
  거절했습니다. '친구 남자친구니까 이러지 마'라고 했습니다.

## 2. evidence_investigate

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-4","subAction":"check_metadata"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-4",
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

- system [evidence_discovery/runtime_system] src/data/cases/generated/friend-01.json:evidence.e-4.investigationResults.check_metadata
  '너 같은 스타일이 원래 내 이상형'이라는 추가 메시지가 있고, B는 '친구 남자친구니까 이러지 마'라고 끊어냈다.
findings: QARS-0004

## 3. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-2","transitionTrigger":"empathy_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-2",
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

- b [contradiction_pursuit/scripted] src/data/scriptedText/friend-01.json:channels.contradiction_pursuit.entries[key=b|d-2|S3].variants[id=contra-b-d-2-S3-v1]
  이제는 일부를 말해야 할 것 같습니다. 예비신랑이 먼저 사적인 말을 꺼냈고 저는 끊었습니다.

## 4. witness_question

action: `{"type":"witness_question","witnessId":"w-2","disputeId":"d-2","answer":"w-2 confirms the fiance-message branch should be tested against the contact log."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": [
    {
      "witnessId": "w-2",
      "summonedFrom": false,
      "summonedTo": true,
      "questionsFrom": 0,
      "questionsTo": 1
    }
  ]
}
```

- witness [witness_question/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:witness_question.w-2
  w-2 confirms the fiance-message branch should be tested against the contact log.

## 5. emergence_event

action: `{"type":"emergence_event","eventId":"friend-d3-open","target":"b","disputeId":"d-3","unlockDisputes":["d-3"],"text":"Emergence event opened d-3 after the d-2 message branch."}`

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
      "via": "friend-d3-open"
    }
  ],
  "dossier": [],
  "witnesses": []
}
```

- witness [emergence_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:emergence_event.friend-d3-open
  Emergence event opened d-3 after the d-2 message branch.


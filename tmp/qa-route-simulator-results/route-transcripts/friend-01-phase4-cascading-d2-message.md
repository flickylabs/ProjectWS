# friend-01-phase4-cascading-d2-message

caseId: friend-01
routeId: phase4-cascading-d2-message
phase: phase4
summary: Cascading d-2 route that tests fiance-message evidence and witness confirmation.

## 1. evidence_present

### Player

- system [system_message]
  증거 제시: 예비신랑 메시지 [Hard]
- b [evidence_present]
  거절했습니다. '친구 남자친구니까 이러지 마'라고 했습니다.

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

- none

## 2. evidence_investigate

### Player

- system [evidence_discovery]
  두 번째 페이지에서 김태윤이 다은이에게 말하기 애매한 부탁과 비공개 대화를 암시해 미심쩍은 흐름이 보인다.

### QA Annotations

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

- none
findings: QARS-0017

## 3. contradiction_pursuit

### Player

- b [contradiction_pursuit]
  이제는 일부를 말해야 할 것 같습니다. 예비신랑이 먼저 사적인 말을 꺼냈고 저는 끊었습니다.

### QA Annotations

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

- none

## 4. witness_question

### Player

- none

### QA Annotations

action: `{"type":"witness_question","witnessId":"w-2","disputeId":"d-2","answer":"w-2 confirms the fiance-message branch should be tested against the contact log."}`

- system [witness_question/route_simulator_manifest_validation] tmp/qa-route-simulator-manifests/friend-01.json:witness_question.w-2
  Witness action skipped by manifest validation: witness_question_before_summon; Witness question occurs before witness summon: w-2.
findings: QARS-0018

## 5. emergence_event

### Player

- none

### QA Annotations

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
findings: QARS-0019


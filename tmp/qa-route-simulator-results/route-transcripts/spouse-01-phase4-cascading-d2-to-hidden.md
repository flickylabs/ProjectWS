# spouse-01-phase4-cascading-d2-to-hidden

caseId: spouse-01
routeId: phase4-cascading-d2-to-hidden
phase: phase4
summary: Cascading route from d-2 evidence pressure into a hidden dispute emergence event.

## 1. evidence_investigate

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

- system [evidence_discovery/runtime_system] src/data/cases/generated/spouse-01.json:evidence.e-4.investigationResults.request_original
  스레드에 반복되는 문구: '나야. 당분간 이 번호로 연락할께.', '내 이름으로 저장은 하지마. 나중에 문제가 될 수 있어.', '오늘도 부탁해.', '항상 고마워.' 수신 시각은 주로 저녁에서 밤 사이.
findings: QARS-0007

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
        "presented": false,
        "stage": 1,
        "deepInvestigated": true
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 2,
        "deepInvestigated": true
      }
    }
  ],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- system [evidence_discovery/runtime_system] src/data/cases/generated/spouse-01.json:evidence.e-4.investigationResults.check_metadata
  발신 번호는 이준호 씨가 주로 쓰는 번호부에 저장되어 있지 않다. 지역번호와 앞자리가 어딘가 익숙하지만 누구 것인지 바로 떠오르지 않는다. 명의 조회는 미상.
findings: QARS-0008

## 3. evidence_investigate

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-4","subAction":"restore_context"}`

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
        "stage": 2,
        "deepInvestigated": true
      },
      "after": {
        "unlocked": true,
        "presented": false,
        "stage": 3,
        "deepInvestigated": true
      }
    }
  ],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- system [evidence_discovery/runtime_system] src/data/cases/generated/spouse-01.json:evidence.e-4.investigationResults.restore_context
  번호를 역추적하면 이준호 씨 형이 최근 개통한 선불폰 번호로 확인된다. 기존 형의 번호는 채권추심 문제로 정지 상태였다. 스레드 안에 '가은이 학교 알림' 관련 단체 문자가 섞여 있어 조카(중2) 돌봄 맥락이 드러난다.
findings: QARS-0009

## 4. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-5","disputeId":"d-2"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-5",
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-5
  증거 제시: 개인 계좌 출금 내역 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-5|mid|self].variants[id=b-e-5-mid-self-v1]
  현금으로 뺐습니다. 계좌 이체가 안 되는 사정이 있었습니다.

## 5. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-2","transitionTrigger":"direct_question"}`

- b [contradiction_pursuit/scripted] src/data/scriptedText/spouse-01.json:channels.contradiction_pursuit.entries[key=b|d-2|S3].variants[id=contra-b-d-2-S3-v1]
  …맞습니다. 형한테 갔습니다. 개인회생 중이라 계좌로는 못 보냈습니다. 다만 상대가 먼저 오해한 부분도 있다고 생각했습니다.

## 6. emergence_event

action: `{"type":"emergence_event","eventId":"spouse-hd3-open","target":"b","disputeId":"h-d3","unlockDisputes":["h-d3"],"text":"Emergence event opened h-d3 after d-2 pressure."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [
    {
      "disputeId": "h-d3",
      "from": "hidden",
      "to": "visible",
      "via": "spouse-hd3-open"
    }
  ],
  "dossier": [],
  "witnesses": []
}
```

- witness [emergence_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:emergence_event.spouse-hd3-open
  Emergence event opened h-d3 after d-2 pressure.

## 7. witness_question

action: `{"type":"witness_question","witnessId":"w-2","disputeId":"h-d3","answer":"w-2 confirms the account path should be tested against the savings paperwork."}`

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

- witness [witness_question/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:witness_question.w-2
  w-2 confirms the account path should be tested against the savings paperwork.


# spouse-01-phase4-cascading-d2-to-hidden

caseId: spouse-01
routeId: phase4-cascading-d2-to-hidden
phase: phase4
summary: Cascading route from d-2 evidence pressure into a hidden dispute emergence event.

## 1. evidence_investigate

### Player

- system [evidence_discovery]
  스레드에 반복되는 문구: '나야. 당분간 이 번호로 연락할께.', '내 이름으로 저장은 하지마. 나중에 문제가 될 수 있어.', '오늘도 부탁해.', '항상 고마워.' 수신 시각은 주로 저녁에서 밤 사이.

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
findings: QARS-0026

## 2. evidence_investigate

### Player

- system [evidence_discovery]
  발신 번호는 이준호 씨가 주로 쓰는 번호부에 저장되어 있지 않다. 지역번호와 앞자리가 어딘가 익숙하지만 누구 것인지 바로 떠오르지 않는다. 명의 조회는 미상.

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

- none
findings: QARS-0027

## 3. evidence_investigate

### Player

- system [evidence_discovery]
  번호를 역추적하면 이준호 씨 형이 최근 개통한 선불폰 번호로 확인된다. 기존 형의 번호는 채권추심 문제로 정지 상태였다. 스레드 안에 '가은이 학교 알림' 관련 단체 문자가 섞여 있어 조카(중2) 돌봄 맥락이 드러난다.

### QA Annotations

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

- none
findings: QARS-0028

## 4. evidence_present

### Player

- system [system_message]
  증거 제시: 개인 계좌 출금 내역 [Hard]
- b [evidence_present]
  현금으로 뺐습니다. 계좌 이체가 안 되는 사정이 있었습니다.

### QA Annotations

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

- none

## 5. contradiction_pursuit

### Player

- b [contradiction_pursuit]
  …맞습니다. 형한테 갔습니다. 개인회생 중이라 계좌로는 못 보냈습니다. 외도로 단정된 점은 억울합니다.

### QA Annotations

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-2","transitionTrigger":"direct_question"}`

- none

## 6. emergence_event

### Player

- none

### QA Annotations

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
findings: QARS-0029

## 7. witness_question

### Player

- none

### QA Annotations

action: `{"type":"witness_question","witnessId":"w-2","disputeId":"h-d3","answer":"w-2 confirms the account path should be tested against the savings paperwork."}`

- system [witness_question/route_simulator_manifest_validation] tmp/qa-route-simulator-manifests/spouse-01.json:witness_question.w-2
  Witness action skipped by manifest validation: witness_question_before_summon; Witness question occurs before witness summon: w-2.
findings: QARS-0030


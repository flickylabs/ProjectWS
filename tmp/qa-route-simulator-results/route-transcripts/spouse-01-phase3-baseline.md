# spouse-01-phase3-baseline

caseId: spouse-01
routeId: phase3-baseline
phase: phase3
summary: Phase B-1 spouse-01 baseline route for d-1 questioning, e-1 presentation, and evidence_investigate system-only contract verification.

## 1. judge_question

### Player

- judge [judge_question]
  이준호 씨, 매장 마감 뒤 차가 오피스텔로 향한 날들을 먼저 시간순으로 들려주시겠습니까.
- b [interrogation]
  … 아닙니다. 그건… 아닙니다.

### QA Annotations

action: `{"type":"judge_question","target":"b","subAction":"fact_pursuit","disputeId":"d-1","questionType":"fact_pursuit"}`

- none

## 2. judge_question

### Player

- judge [judge_question]
  이준호 씨, 새벽마다 같은 번호와 짧게 이어진 통화가 누구의 사정과 연결돼 있었는지 말씀해 주시겠습니까.
- b [interrogation]
  … 아닙니다. 그건… 아닙니다.

### QA Annotations

action: `{"type":"judge_question","target":"b","subAction":"fact_pursuit","disputeId":"d-1","questionType":"fact_pursuit"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-1",
      "from": "S0",
      "to": "S1"
    }
  ],
  "evidence": [
    {
      "evidenceId": "e-4",
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
  증거 제시: 영수증 묶음 5장 [Hard]
- b [evidence_present]
  그건... 제가 산 겁니다.

### QA Annotations

action: `{"type":"evidence_present","target":"b","evidenceId":"e-1","disputeId":"d-1"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-1",
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
  틴트, 헤어롤 등 여성용 물건들이 눈에 띈다.

### QA Annotations

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-1","subAction":"request_original"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-1",
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
findings: QARS-0023

## 5. judge_question

### Player

- judge [judge_question]
  이준호 씨, 다른 관련자 이야기를 집에서 자연스럽게 꺼내지 못하게 만든 첫 부담이 무엇이었습니까.
- b [interrogation]
  말하면 더 복잡해질 것 같아서… 안 했습니다. 제가 처리하면 되는 일이었습니다.

### QA Annotations

action: `{"type":"judge_question","target":"b","subAction":"motive_search","disputeId":"d-1","questionType":"motive_search"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-1",
      "from": "S1",
      "to": "S2"
    }
  ],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- none

## 6. judge_question

### Player

- judge [judge_question]
  이준호 씨, 오피스텔 일을 떠올릴 때 가장 먼저 마음에 걸리는 사람이 형인지 다른 관련자인지 박지연 씨인지 말씀해 주시겠습니까.
- b [interrogation]
  말하면 더 크게 터질 것 같았습니다. 이미 8개월째 남남처럼 사는데… 더 망치고 싶지 않았습니다.

### QA Annotations

action: `{"type":"judge_question","target":"b","subAction":"empathy_approach","disputeId":"d-1","questionType":"empathy_approach"}`

- none


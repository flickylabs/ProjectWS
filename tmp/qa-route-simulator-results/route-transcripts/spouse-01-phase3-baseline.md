# spouse-01-phase3-baseline

caseId: spouse-01
routeId: phase3-baseline
phase: phase3
summary: Phase B-1 spouse-01 baseline route for d-1 questioning, e-1 presentation, and evidence_investigate system-only contract verification.

## 1. judge_question

action: `{"type":"judge_question","target":"b","subAction":"fact_pursuit","disputeId":"d-1","questionType":"fact_pursuit"}`

- judge [judge_question/scripted] src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|1].variants[id=judgeq-d-1-fact_pursuit-1-v1]
  이준호 씨, 매장 마감 뒤 차가 오피스텔로 향한 날들을 먼저 시간순으로 들려주시겠습니까.
- b [interrogation/scripted] src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  … 아닙니다. 그건… 아닙니다.

## 2. judge_question

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
  "disputes": []
}
```

- judge [judge_question/scripted] src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|2].variants[id=judgeq-d-1-fact_pursuit-2-v1]
  이준호 씨, 새벽마다 같은 번호와 짧게 이어진 통화가 누구의 사정과 연결돼 있었는지 말씀해 주시겠습니까.
- b [interrogation/scripted] src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  … 아닙니다. 그건… 아닙니다.

## 3. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-1","disputeId":"d-1","lieBand":"early"}`

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
  "disputes": []
}
```

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-1
  증거 제시: 영수증 묶음 5장 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-1|early|self].variants[id=b-e-1-early-self-v1]
  그건... 제가 산 겁니다.

## 4. evidence_investigate

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
  "disputes": []
}
```

- system [evidence_discovery/runtime_system] src/data/cases/generated/spouse-01.json:evidence.e-1.investigationResults.request_original
  틴트, 헤어롤 등 여성용 물건들이 눈에 띈다.
findings: QARS-0001

## 5. judge_question

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
  "disputes": []
}
```

- judge [judge_question/scripted] src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|motive_search|1].variants[id=judgeq-d-1-motive_search-1-v1]
  이준호 씨, 그 가족 이야기를 집에서 자연스럽게 꺼내지 못하게 만든 첫 부담이 무엇이었습니까.
- b [interrogation/scripted] src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S1|motive_search].variants[id=b-d-1-S1-motive-search-v1]
  말하면 더 복잡해질 것 같아서… 안 했습니다. 제가 처리하면 되는 일이었습니다.

## 6. judge_question

action: `{"type":"judge_question","target":"b","subAction":"empathy_approach","disputeId":"d-1","questionType":"empathy_approach"}`

- judge [judge_question/scripted] src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|empathy_approach|1].variants[id=judgeq-d-1-empathy_approach-1-v1]
  이준호 씨, 오피스텔 일을 떠올릴 때 가장 먼저 마음에 걸리는 사람이 형인지 그 가족인지 박지연 씨인지 말씀해 주시겠습니까.
- b [interrogation/scripted] src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S2|empathy_approach].variants[id=b-d-1-S2-empathy-approach-v1]
  말하면 더 크게 터질 것 같았습니다. 이미 8개월째 남남처럼 사는데… 더 망치고 싶지 않았습니다.


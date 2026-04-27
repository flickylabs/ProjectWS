# phase2-fact-repeat-b-d1-e4-present

caseId: spouse-01
description: Spike route for B d-1 fact_pursuit repetition, e-4 unlock, and early e-4 presentation response.

## 1. judge_question

action: `{"type":"judge_question","target":"b","disputeId":"d-1","questionType":"fact_pursuit"}`

- judge [judge_question/scripted] src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|1].variants[id=judgeq-d-1-fact_pursuit-1-v1]
  이준호 씨, 매장 마감 뒤 차가 오피스텔로 향한 날들을 먼저 시간순으로 들려주시겠습니까.
- b [interrogation/scripted] src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  … 아닙니다. 그건… 아닙니다.

## 2. judge_question

action: `{"type":"judge_question","target":"b","disputeId":"d-1","questionType":"fact_pursuit"}`

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

action: `{"type":"evidence_present","target":"b","evidenceId":"e-3"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-3",
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-3
  증거 제시: 통화기록
- b [evidence_present/scripted] src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-3|early|self].variants[id=b-e-3-early-self-v1]
  그 번호는... 설명드리겠습니다.

## 4. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-4"}`

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
        "presented": true,
        "stage": 0,
        "deepInvestigated": false
      }
    }
  ],
  "disputes": []
}
```

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-4
  증거 제시: 발신자 미상 문자
- b [evidence_present/scripted] src/data/scriptedText/spouse-01.json:channels.evidence_present.entries[key=b|e-4|early|self].variants[id=b-e-4-early-self-v1]
  형한테 온 문자 맞습니다.
findings: QARG-0001

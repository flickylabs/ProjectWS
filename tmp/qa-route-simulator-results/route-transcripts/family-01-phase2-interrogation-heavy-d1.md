# family-01-phase2-interrogation-heavy-d1

caseId: family-01
routeId: phase2-interrogation-heavy-d1
phase: phase2
summary: Interrogation-heavy d-1 route from S0 through question pressure and hard evidence.

## 1. judge_question

action: `{"type":"judge_question","target":"b","subAction":"fact_pursuit","disputeId":"d-1","questionType":"fact_pursuit"}`

- judge [judge_question/scripted] src/data/scriptedText/family-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|1].variants[id=judgeq-d-1-fact_pursuit-1-v1]
  윤정후 씨, 유서가 작성되던 무렵 어머니를 얼마나 자주 찾아뵈었는지부터 말씀해 주십시오.
- b [interrogation/scripted] src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  어머니 보러 간 게 무슨 잘못입니까. 그게 전부입니다.

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
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- judge [judge_question/scripted] src/data/scriptedText/family-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|2].variants[id=judgeq-d-1-fact_pursuit-2-v1]
  윤정후 씨, 어머니께 유서 내용을 읽어드린 횟수와 그 이유는 무엇입니까.
- b [interrogation/scripted] src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  어머니 보러 간 게 무슨 잘못입니까. 그게 전부입니다.

## 3. judge_question

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

- judge [judge_question/scripted] src/data/scriptedText/family-01.json:channels.judge_question.entries[key=d-1|motive_search|1].variants[id=judgeq-d-1-motive_search-1-v1]
  윤정후 씨, 그 방문과 설명을 윤태성 씨에게 자연스럽게 말하지 못한 이유가 있었습니까.
- b [interrogation/scripted] src/data/scriptedText/family-01.json:channels.interrogation.entries[key=b|d-1|S1|motive_search].variants[id=b-d-1-S1-motive-search-v1]
  어머니 몸이 나빠지시니 더 자주 간 겁니다. 다른 뜻은 없었습니다.

## 4. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-2","disputeId":"d-1"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-1",
      "from": "S2",
      "to": "S3"
    }
  ],
  "evidence": [
    {
      "evidenceId": "e-2",
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-2
  증거 제시: 요양원 방문기록 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=b|e-2|mid|self].variants[id=b-e-2-mid-self-v1]
  어머니 상태가 안 좋으셔서 더 자주 갔습니다. 담당이 바뀐 일과는 나눠서 봐 주셨으면 합니다.

## 5. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-1","transitionTrigger":"empathy_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-1",
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

- b [contradiction_pursuit/scripted] src/data/scriptedText/family-01.json:channels.contradiction_pursuit.entries[key=b|d-1|S3].variants[id=contra-b-d-1-S3-v1]
  재판관님, 서두른 건 맞습니다. 그렇다고 형을 빼려던 의도만 있었던 건 아닙니다. 상대 쪽 책임도 남아 있습니다.


# friend-01-phase2-linear-d1-contact

caseId: friend-01
routeId: phase2-linear-d1-contact
phase: phase2
summary: Linear d-1 contact route from S0 through basic questioning, hard evidence, and system-only investigation.

## 1. judge_question

action: `{"type":"judge_question","target":"b","subAction":"fact_pursuit","disputeId":"d-1","questionType":"fact_pursuit"}`

- judge [judge_question/scripted] src/data/scriptedText/friend-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|1].variants[id=judgeq-d-1-fact_pursuit-1-v1]
  최수민 씨, 며칠 동안 이어진 연락이 무엇을 전하려던 것이었는지 먼저 말씀해 주십시오.
- b [interrogation/scripted] src/data/scriptedText/friend-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  제가 그 사람에게 집착할 이유는 없습니다.

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

- judge [judge_question/scripted] src/data/scriptedText/friend-01.json:channels.judge_question.entries[key=d-1|fact_pursuit|2].variants[id=judgeq-d-1-fact_pursuit-2-v1]
  최수민 씨, 왜 송다은 씨가 아니라 예비신랑에게 먼저 연락했습니까.
- b [interrogation/scripted] src/data/scriptedText/friend-01.json:channels.interrogation.entries[key=b|d-1|S0|fact_pursuit].variants[id=b-d-1-S0-fact-pursuit-v1]
  제가 그 사람에게 집착할 이유는 없습니다.

## 3. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-1"}`

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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-1
  증거 제시: 연락 기록 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-1|early|self].variants[id=b-e-1-early-self-v1]
  연락한 건 맞습니다.

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
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- system [evidence_discovery/runtime_system] src/data/cases/generated/friend-01.json:evidence.e-1.investigationResults.request_original
  9일간 전화 6번, 문자 11번. 대부분 답이 없거나 짧게 끊겼다.
findings: QARS-0003

## 5. witness_question

action: `{"type":"witness_question","witnessId":"w-1","disputeId":"d-1","answer":"w-1 confirms the contact route can be checked against the message log."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": [
    {
      "witnessId": "w-1",
      "summonedFrom": false,
      "summonedTo": true,
      "questionsFrom": 0,
      "questionsTo": 1
    }
  ]
}
```

- witness [witness_question/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:witness_question.w-1
  w-1 confirms the contact route can be checked against the message log.


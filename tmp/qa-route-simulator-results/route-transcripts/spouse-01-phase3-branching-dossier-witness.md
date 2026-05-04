# spouse-01-phase3-branching-dossier-witness

caseId: spouse-01
routeId: phase3-branching-dossier-witness
phase: phase3
summary: Branching route that combines evidence into a dossier card, uses dossier questioning, and checks witness summon flow.

## 1. evidence_combine

### Player

- none

### QA Annotations

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-2","inputs":["e-1","e-4"]}`

- system [evidence_combine/route_simulator_runtime_gate] src/data/cases/generated/spouse-01.json:combinationLab.recipes[id=combine-2]
  Evidence combination skipped by runtime parity gate: combine-2; not fully investigated=e-1, e-4
findings: QARS-0024

## 2. dossier

### Player

- b [dossier]
  그 댁 사정이 걸려 있었습니다. 제가 외면하기 어려운 일이 반복됐고, 그걸 말하지 못했습니다.

### QA Annotations

action: `{"type":"dossier","target":"b","dossierId":"dc-1","questionId":"dc-1.b.q1"}`

- none

## 3. witness_summon

### Player

- system [witness_summon]
  증인 오피스텔 경비 소환 - 증언이 시작됩니다.

### QA Annotations

action: `{"type":"witness_summon","witnessId":"w-1","disputeId":"d-1","prompt":"w-1 is ready to confirm the office-tel route."}`

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
      "questionsTo": 0
    }
  ]
}
```

- system [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:witness_summon.w-1
  Witness summoned: w-1
- system [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:witness_summon.w-1.prompt
  Manifest witness prompt: w-1 is ready to confirm the office-tel route.
findings: QARS-0025

## 4. witness_question

### Player

- witness [witness_question]
  재판관님, 제가 아는 범위에서는 1주일에 2~3번 방문하는 차량을 기억한다. 정확한 호수는 모르지만 그 층에 여자 혼자 사는 집은 없는 것으로 안다.

### QA Annotations

action: `{"type":"witness_question","witnessId":"w-1","disputeId":"d-1","answer":"w-1 confirms the route timing can be compared with the receipt and GPS records."}`

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
      "summonedFrom": true,
      "summonedTo": true,
      "questionsFrom": 0,
      "questionsTo": 1
    }
  ]
}
```

- system [witness_question/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:witness_question.w-1.answer
  Manifest witness answer: w-1 confirms the route timing can be compared with the receipt and GPS records.

## 5. contradiction_pursuit

### Player

- b [contradiction_pursuit]
  네, 처음보다 다르게 들릴 수 있습니다. 오피스텔에 간 건 맞습니다. 다만 이유는 그쪽에서 짐작한 것과 다릅니다.

### QA Annotations

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"d-1","transitionTrigger":"hard_evidence"}`

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
  그 집에서 제가 본 상황은… 그냥 지나치기 어려웠습니다. 그 일이 계속 생각납니다.

### QA Annotations

action: `{"type":"judge_question","target":"b","subAction":"empathy_approach","disputeId":"d-1","questionType":"empathy_approach"}`

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

- none


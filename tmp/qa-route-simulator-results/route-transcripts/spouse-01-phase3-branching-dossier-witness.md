# spouse-01-phase3-branching-dossier-witness

caseId: spouse-01
routeId: phase3-branching-dossier-witness
phase: phase3
summary: Branching route that combines evidence into a dossier card, uses dossier questioning, and checks witness summon flow.

## 1. evidence_combine

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-2","inputs":["e-1","e-4"]}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [
    {
      "dossierId": "dc-1",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [evidence_combine/runtime_system] src/data/cases/generated/spouse-01.json:combinationLab.recipes[id=combine-2].discoveryText
  영수증의 중학교 참고서 + 형 문자의 '가은이 학교 알림'... 중학생 조카가 있다?!
- witness [evidence_combine/route_simulator_facsimile] src/data/cases/generated/spouse-01.json:combinationLab.outputs[id=dc-1]
  Analysis note dc-1 is ready for follow-up.

## 2. dossier

action: `{"type":"dossier","target":"b","dossierId":"dc-1","questionId":"dc-1.b.q1"}`

- b [dossier/scripted] src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v1]
  그 댁 사정이 걸려 있었습니다. 친척 아이가 혼자 있는 날이 많았고, 제가 그걸 외면하지 못했습니다.

## 3. witness_summon

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

- system [witness_summon/runtime_system] src/data/cases/generated/spouse-01.json:activeThirdParties[id=w-1]
  Witness summoned: w-1
- witness [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:witness_summon.w-1
  w-1 is ready to confirm the office-tel route.

## 4. witness_question

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

- witness [witness_question/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:witness_question.w-1
  w-1 confirms the route timing can be compared with the receipt and GPS records.

## 5. contradiction_pursuit

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

- b [contradiction_pursuit/scripted] src/data/scriptedText/spouse-01.json:channels.contradiction_pursuit.entries[key=b|d-1|S2].variants[id=contra-b-d-1-S2-v1]
  네, 처음보다 다르게 들릴 수 있습니다. 오피스텔에 간 건 맞습니다. 다만 이유는 그쪽에서 짐작한 것과 다릅니다.

## 6. judge_question

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

- judge [judge_question/scripted] src/data/scriptedText/spouse-01.json:channels.judge_question.entries[key=d-1|empathy_approach|1].variants[id=judgeq-d-1-empathy_approach-1-v1]
  이준호 씨, 오피스텔 일을 떠올릴 때 가장 먼저 마음에 걸리는 사람이 형인지 그 가족인지 박지연 씨인지 말씀해 주시겠습니까.
- b [interrogation/scripted] src/data/scriptedText/spouse-01.json:channels.interrogation.entries[key=b|d-1|S3|empathy_approach].variants[id=b-d-1-S3-empathy-approach-v1]
  조카가 혼자 라면 끓이는 걸 보면… 그냥 올 수가 없었습니다. 그 일이 계속 생각납니다.


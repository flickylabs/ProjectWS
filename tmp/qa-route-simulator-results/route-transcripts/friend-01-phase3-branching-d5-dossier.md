# friend-01-phase3-branching-d5-dossier

caseId: friend-01
routeId: phase3-branching-d5-dossier
phase: phase3
summary: Branching d-5 route that combines chat evidence into a dossier card and checks party response.

## 1. evidence_combine

action: `{"type":"evidence_combine","target":"a","recipeId":"combine-1","inputs":["e-1","e-2"]}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "a",
      "disputeId": "d-5",
      "from": "S2",
      "to": "S3"
    }
  ],
  "evidence": [],
  "disputes": [
    {
      "disputeId": "d-5",
      "from": "hidden",
      "to": "visible",
      "via": "combine-1"
    }
  ],
  "dossier": [
    {
      "dossierId": "dc-3",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [evidence_combine/runtime_system] src/data/cases/generated/friend-01.json:combinationLab.recipes[id=combine-1].discoveryText
  연락 기록과 단톡방 캡처를 대조하면, 최수민의 연락 사실이 확인도 없이 '집착'으로 프레이밍된 과정이 보인다.
- witness [evidence_combine/route_simulator_facsimile] src/data/cases/generated/friend-01.json:combinationLab.outputs[id=dc-3]
  Analysis note dc-3 is ready for follow-up.

## 2. dossier

action: `{"type":"dossier","target":"a","dossierId":"dc-3","questionId":"dc-3.a.q1"}`

- a [dossier/scripted] src/data/scriptedText/friend-01.json:channels.dossier.entries[key=dc-3.a.q1|mid].variants[id=dc-3-a-q1-mid-v1]
  아버지 부탁이 반복된다는 말이 마음에 걸렸습니다. 그래도 인정하기가 무서웠습니다.

## 3. evidence_present

action: `{"type":"evidence_present","target":"a","evidenceId":"e-2"}`

stateDelta:
```json
{
  "lieStates": [],
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
  증거 제시: 단톡방 캡처 [Hard]
- a [evidence_present/scripted] src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=a|e-2|mid|self].variants[id=a-e-2-mid-self-v1]
  화가 나서 그랬습니다. 확인 안 하고 올린 건 인정합니다.

## 4. witness_question

action: `{"type":"witness_question","witnessId":"w-1","disputeId":"d-5","answer":"w-1 confirms the group chat branch should stay separate from the contact branch."}`

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
  w-1 confirms the group chat branch should stay separate from the contact branch.

## 5. witness_summon

action: `{"type":"witness_summon","witnessId":"w-1","disputeId":"d-5","prompt":"w-1 is ready to compare the group chat spread path."}`

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
      "questionsFrom": 1,
      "questionsTo": 0
    }
  ]
}
```

- system [witness_summon/runtime_system] src/data/cases/generated/friend-01.json:activeThirdParties[id=w-1]
  Witness summoned: w-1
- witness [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:witness_summon.w-1
  w-1 is ready to compare the group chat spread path.


# friend-01-phase3-branching-d5-dossier

caseId: friend-01
routeId: phase3-branching-d5-dossier
phase: phase3
summary: Branching d-5 route that combines chat evidence into a dossier card and checks party response.

## 1. evidence_combine

### Player

- none

### QA Annotations

action: `{"type":"evidence_combine","target":"a","recipeId":"combine-1","inputs":["e-1","e-2"]}`

- system [evidence_combine/route_simulator_runtime_gate] src/data/cases/generated/friend-01.json:combinationLab.recipes[id=combine-1]
  Evidence combination skipped by runtime parity gate: combine-1; not fully investigated=e-1, e-2
findings: QARS-0014

## 2. dossier

### Player

- a [dossier]
  아버지 부탁이 반복된다는 말이 마음에 걸렸습니다. 그래도 인정하기가 무서웠습니다.

### QA Annotations

action: `{"type":"dossier","target":"a","dossierId":"dc-3","questionId":"dc-3.a.q1"}`

- none

## 3. evidence_present

### Player

- system [system_message]
  증거 제시: 단톡방 캡처 [Hard]
- a [evidence_present]
  화가 나서 그랬습니다. 확인 안 하고 올린 건 인정합니다.

### QA Annotations

action: `{"type":"evidence_present","target":"a","evidenceId":"e-2"}`

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

- none

## 4. witness_question

### Player

- none

### QA Annotations

action: `{"type":"witness_question","witnessId":"w-1","disputeId":"d-5","answer":"w-1 confirms the group chat branch should stay separate from the contact branch."}`

- system [witness_question/route_simulator_manifest_validation] tmp/qa-route-simulator-manifests/friend-01.json:witness_question.w-1
  Witness action skipped by manifest validation: witness_question_before_summon; Witness question occurs before witness summon: w-1.
findings: QARS-0015

## 5. witness_summon

### Player

- system [witness_summon]
  증인 김세라 소환 - 증언이 시작됩니다.

### QA Annotations

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
      "summonedFrom": false,
      "summonedTo": true,
      "questionsFrom": 0,
      "questionsTo": 0
    }
  ]
}
```

- system [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:witness_summon.w-1
  Witness summoned: w-1
- system [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:witness_summon.w-1.prompt
  Manifest witness prompt: w-1 is ready to compare the group chat spread path.
findings: QARS-0016


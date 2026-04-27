# family-01-phase3-evidence-heavy-d2-dossier

caseId: family-01
routeId: phase3-evidence-heavy-d2-dossier
phase: phase3
summary: Evidence-heavy d-2 route that combines will evidence and follows with dossier questioning.

## 1. evidence_combine

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-2","inputs":["e-4","e-5"]}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-2",
      "from": "S2",
      "to": "S3"
    }
  ],
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

- system [evidence_combine/runtime_system] src/data/cases/generated/family-01.json:combinationLab.recipes[id=combine-2].discoveryText
  공증사무실 이중 스캔과 원본 유서를 대조하면... 90이 60으로 바뀐 건 자기 몫을 줄인 조작이었다!
- witness [evidence_combine/route_simulator_facsimile] src/data/cases/generated/family-01.json:combinationLab.outputs[id=dc-1]
  Analysis note dc-1 is ready for follow-up.

## 2. dossier

action: `{"type":"dossier","target":"b","dossierId":"dc-1","questionId":"dc-1.b.q1"}`

- b [dossier/scripted] src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-1.b.q1|mid].variants[id=dc-1-b-q1-mid-v1]
  형이 오면 어머니가 먼저 긴장하셨습니다. 그래서 저는 공증 이야기를 길게 붙잡지 않으려 했습니다.

## 3. evidence_investigate

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

- system [evidence_discovery/runtime_system] src/data/cases/generated/family-01.json:evidence.e-4.investigationResults.request_original
  같은 날 같은 유언장이 두 번 스캔된 기록이다. 앞뒤 문서의 상속 비율이 서로 다르다.
findings: QARS-0001

## 4. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-4","disputeId":"d-2"}`

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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-4
  증거 제시: 공증사무실 스캔 보관본 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=b|e-4|mid|self].variants[id=b-e-4-mid-self-v1]
  두 번 제출한 이유가 있습니다. 원래 비율을 바꿨습니다.

## 5. witness_summon

action: `{"type":"witness_summon","witnessId":"w-1","disputeId":"d-2","prompt":"w-1 is ready to verify the notary timeline."}`

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

- system [witness_summon/runtime_system] src/data/cases/generated/family-01.json:activeThirdParties[id=w-1]
  Witness summoned: w-1
- witness [witness_summon/route_simulator_facsimile] tmp/qa-route-simulator-manifests/family-01.json:witness_summon.w-1
  w-1 is ready to verify the notary timeline.


# friend-01-phase5-evidence-heavy-d4-late

caseId: friend-01
routeId: phase5-evidence-heavy-d4-late
phase: phase5
summary: Evidence-heavy late route for d-4 that combines past records and checks the late evidence investigation contract.

## 1. evidence_combine

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-7","inputs":["e-3","e-6"]}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-1",
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
    },
    {
      "evidenceId": "e-2",
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
  "dossier": [
    {
      "dossierId": "dc-4",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [evidence_combine/runtime_system] src/data/cases/generated/friend-01.json:combinationLab.recipes[id=combine-7].discoveryText
  과거 카톡의 '돈 문제' 언급과 과거 송금 기록을 대조하면, 손절의 진짜 원인이 변심이 아니라 사기 피해였다는 사실이 드러난다.
- witness [evidence_combine/route_simulator_facsimile] src/data/cases/generated/friend-01.json:combinationLab.outputs[id=dc-4]
  Analysis note dc-4 is ready for follow-up.

## 2. dossier

action: `{"type":"dossier","target":"b","dossierId":"dc-4","questionId":"dc-4.b.q1"}`

- b [dossier/scripted] src/data/scriptedText/friend-01.json:channels.dossier.entries[key=dc-4.b.q1|mid].variants[id=dc-4-b-q1-mid-v1]
  다은이 아버지가 제 돈을 가져간 일은 맞습니다. 그래도 다은이에게 말하지 못했습니다.

## 3. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-6"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-6",
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-6
  증거 제시: 과거 송금 기록 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/friend-01.json:channels.evidence_present.entries[key=b|e-6|mid|self].variants[id=b-e-6-mid-self-v1]
  '투자금'이라고 했습니다. 한 달만 쓰겠다고 했습니다. 돌아오지 않았습니다.

## 4. evidence_investigate

action: `{"type":"evidence_investigate","target":"b","evidenceId":"e-6","subAction":"restore_context"}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [
    {
      "evidenceId": "e-6",
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

- system [evidence_discovery/runtime_system] src/data/cases/generated/friend-01.json:evidence.e-6.investigationResults.restore_context
  돈을 돌려받지 못한 상태에서 B가 A에게 이 사실을 말하지 못하고 손절을 택한 맥락이 확인된다.
findings: QARS-0005

## 5. discovery_event

action: `{"type":"discovery_event","eventId":"friend-d4-reviewed","dossierId":"dc-4","followup":"The d-4 late branch remains available for judgment."}`

- system [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:discovery_event.friend-d4-reviewed
  Discovery event applied: friend-d4-reviewed
- witness [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/friend-01.json:discovery_event.friend-d4-reviewed.followup
  The d-4 late branch remains available for judgment.


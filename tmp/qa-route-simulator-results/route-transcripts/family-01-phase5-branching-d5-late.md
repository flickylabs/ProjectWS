# family-01-phase5-branching-d5-late

caseId: family-01
routeId: phase5-branching-d5-late
phase: phase5
summary: Late branching route that uses e-7, dossier questioning, and witness confirmation for d-5.

## 1. evidence_present

action: `{"type":"evidence_present","target":"b","evidenceId":"e-7"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "d-5",
      "from": "S3",
      "to": "S4"
    }
  ],
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
    },
    {
      "evidenceId": "e-3",
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
      "evidenceId": "e-7",
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

- system [system_message/runtime_system] src/hooks/useActionDispatch.ts:getEvidenceDisplayName:e-7
  증거 제시: 어머니 일기장 [Hard]
- b [evidence_present/scripted] src/data/scriptedText/family-01.json:channels.evidence_present.entries[key=b|e-7|early|both].variants[id=b-e-7-early-self-v1]
  어머니 글씨 맞습니다.

## 2. dossier

action: `{"type":"dossier","target":"b","dossierId":"dc-5","questionId":"dc-5.b.q1"}`

- b [dossier/scripted] src/data/scriptedText/family-01.json:channels.dossier.entries[key=dc-5.b.q1|late].variants[id=dc-5-b-q1-late-v1]
  맞습니다. 형을 지키려 했다는 이유가 어머니의 90대10 뜻을 고친 책임을 없애지 못합니다.

## 3. witness_question

action: `{"type":"witness_question","witnessId":"w-3","disputeId":"d-5","answer":"w-3 confirms the final branch should compare care records with the diary route."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": [
    {
      "witnessId": "w-3",
      "summonedFrom": false,
      "summonedTo": true,
      "questionsFrom": 0,
      "questionsTo": 1
    }
  ]
}
```

- witness [witness_question/route_simulator_facsimile] tmp/qa-route-simulator-manifests/family-01.json:witness_question.w-3
  w-3 confirms the final branch should compare care records with the diary route.

## 4. discovery_event

action: `{"type":"discovery_event","eventId":"family-d5-reviewed","dossierId":"dc-5","followup":"The d-5 route has enough late-stage material for judgment."}`

stateDelta:
```json
{
  "lieStates": [],
  "evidence": [],
  "disputes": [],
  "dossier": [
    {
      "dossierId": "dc-5",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/family-01.json:discovery_event.family-d5-reviewed
  Discovery event applied: family-d5-reviewed
- witness [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/family-01.json:discovery_event.family-d5-reviewed.followup
  The d-5 route has enough late-stage material for judgment.


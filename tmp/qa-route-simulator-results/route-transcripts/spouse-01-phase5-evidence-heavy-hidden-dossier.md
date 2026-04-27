# spouse-01-phase5-evidence-heavy-hidden-dossier

caseId: spouse-01
routeId: phase5-evidence-heavy-hidden-dossier
phase: phase5
summary: Evidence-heavy hidden-dispute route that resolves a dossier card and drives late lieState pressure.

## 1. evidence_combine

action: `{"type":"evidence_combine","target":"b","recipeId":"combine-4","inputs":["e-6","e-7"]}`

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
    }
  ],
  "disputes": [],
  "dossier": [
    {
      "dossierId": "dc-3",
      "to": true
    }
  ],
  "witnesses": []
}
```

- system [evidence_combine/runtime_system] src/data/cases/generated/spouse-01.json:combinationLab.recipes[id=combine-4].discoveryText
  공동 적금 해지 서류의 3,000만원과 투자방 송금 내역의 3,000만원이 정확히 일치한다. 위임장 조작으로 빠진 돈의 행선지가 확정된다.
- witness [evidence_combine/route_simulator_facsimile] src/data/cases/generated/spouse-01.json:combinationLab.outputs[id=dc-3]
  Analysis note dc-3 is ready for follow-up.

## 2. dossier

action: `{"type":"dossier","target":"b","dossierId":"dc-3","questionId":"dc-3.b.q1"}`

- b [dossier/scripted] src/data/scriptedText/spouse-01.json:channels.dossier.entries[key=dc-3.b.q1|mid].variants[id=dc-3-b-q1-mid-v1]
  형네가 당장 버티기 어려워 보여서 공동 적금을 먼저 깼습니다. 아내에게 말하지 않은 건 제 잘못입니다.

## 3. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"h-d3","transitionTrigger":"empathy_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "h-d3",
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

- b [contradiction_pursuit/scripted] src/data/scriptedText/spouse-01.json:channels.contradiction_pursuit.entries[key=b|h-d3|S3].variants[id=contra-b-h-d3-S3-v1]
  제가 침묵한 게 단초였습니다. 그래도 위임장에 손댄 책임까지 제게 돌릴 수는 없습니다.

## 4. contradiction_pursuit

action: `{"type":"contradiction_pursuit","target":"b","disputeId":"h-d3","transitionTrigger":"direct_question"}`

stateDelta:
```json
{
  "lieStates": [
    {
      "party": "b",
      "disputeId": "h-d3",
      "from": "S4",
      "to": "S5"
    }
  ],
  "evidence": [],
  "disputes": [],
  "dossier": [],
  "witnesses": []
}
```

- b [contradiction_pursuit/scripted] src/data/scriptedText/spouse-01.json:channels.contradiction_pursuit.entries[key=b|h-d3|S4].variants[id=contra-b-h-d3-S4-v1]
  처가 앞에서 가장 노릇도 못 한 것 같아 부끄러웠습니다. 그래서 더 말을 못 했습니다.

## 5. discovery_event

action: `{"type":"discovery_event","eventId":"spouse-dc3-reviewed","dossierId":"dc-3","followup":"The dc-3 route card remains available for final judgment."}`

- system [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:discovery_event.spouse-dc3-reviewed
  Discovery event applied: spouse-dc3-reviewed
- witness [discovery_event/route_simulator_facsimile] tmp/qa-route-simulator-manifests/spouse-01.json:discovery_event.spouse-dc3-reviewed.followup
  The dc-3 route card remains available for final judgment.


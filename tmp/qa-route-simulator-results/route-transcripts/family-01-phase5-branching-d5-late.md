# family-01-phase5-branching-d5-late

caseId: family-01
routeId: phase5-branching-d5-late
phase: phase5
summary: Late branching route that uses e-7, dossier questioning, and witness confirmation for d-5.

## 1. evidence_present

### Player

- system [system_message]
  증거 제시: 어머니 일기장 [Hard]
- b [evidence_present]
  어머니 글씨 맞습니다.

### QA Annotations

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

- none

## 2. dossier

### Player

- b [dossier]
  맞습니다. 상대에게 알려지길 피하려 했다는 이유가 어머니의 처음 적힌 비율 뜻을 고친 책임을 없애지 못합니다.

### QA Annotations

action: `{"type":"dossier","target":"b","dossierId":"dc-5","questionId":"dc-5.b.q1"}`

- none

## 3. witness_question

### Player

- none

### QA Annotations

action: `{"type":"witness_question","witnessId":"w-3","disputeId":"d-5","answer":"w-3 confirms the final branch should compare care records with the diary route."}`

- system [witness_question/route_simulator_manifest_validation] tmp/qa-route-simulator-manifests/family-01.json:witness_question.w-3
  Witness action skipped by manifest validation: witness_question_before_summon; Witness question occurs before witness summon: w-3.
- system [witness_question/route_simulator_manifest_validation] src/data/cases/generated/family-01.json:duo.socialGraph[id=w-3].knowledgeScope
  Witness action skipped by manifest validation: witness_domain_mismatch; Witness w-3 knowledge does not match route domain care_record.
findings: QARS-0007, QARS-0008

## 4. discovery_event

### Player

- none

### QA Annotations

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
findings: QARS-0009


# friend-01-phase2-linear-d1-contact

caseId: friend-01
routeId: phase2-linear-d1-contact
phase: phase2
summary: Linear d-1 contact route from S0 through basic questioning, hard evidence, and system-only investigation.

## 1. judge_question

### Player

- judge [judge_question]
  최수민 씨, 며칠 동안 이어진 연락이 무엇을 전하려던 것이었는지 먼저 말씀해 주십시오.
- b [interrogation]
  제가 그 사람에게 집착할 이유는 없습니다.

### QA Annotations

action: `{"type":"judge_question","target":"b","subAction":"fact_pursuit","disputeId":"d-1","questionType":"fact_pursuit"}`

- none

## 2. judge_question

### Player

- judge [judge_question]
  최수민 씨, 왜 송다은 씨가 아니라 예비신랑에게 먼저 연락했습니까.
- b [interrogation]
  제가 그 사람에게 집착할 이유는 없습니다.

### QA Annotations

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

- none

## 3. evidence_present

### Player

- system [system_message]
  증거 제시: 연락 기록 [Hard]
- b [evidence_present]
  최근 9일 동안 전화도 했고 문자도 보냈습니다. 기록 그대로입니다.

### QA Annotations

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

- none

## 4. evidence_investigate

### Player

- system [evidence_discovery]
  첫 페이지에서는 9일간 반복된 발신과 부재중이 확인된다. 집착성 연락처럼 보이지만 원문은 대부분 봉인되어 있다.

### QA Annotations

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

- none
findings: QARS-0010

## 5. witness_question

### Player

- none

### QA Annotations

action: `{"type":"witness_question","witnessId":"w-1","disputeId":"d-1","answer":"w-1 confirms the contact route can be checked against the message log."}`

- system [witness_question/route_simulator_manifest_validation] tmp/qa-route-simulator-manifests/friend-01.json:witness_question.w-1
  Witness action skipped by manifest validation: witness_question_before_summon; Witness question occurs before witness summon: w-1.
- system [witness_question/route_simulator_manifest_validation] src/data/cases/generated/friend-01.json:duo.socialGraph[id=w-1].relatedDisputeIds
  Witness action skipped by manifest validation: witness_scope_mismatch; Witness w-1 is not scoped to dispute d-1.
- system [witness_question/route_simulator_manifest_validation] src/data/cases/generated/friend-01.json:duo.socialGraph[id=w-1].knowledgeScope
  Witness action skipped by manifest validation: witness_domain_mismatch; Witness w-1 knowledge does not match route domain contact_log.
findings: QARS-0011, QARS-0012, QARS-0013


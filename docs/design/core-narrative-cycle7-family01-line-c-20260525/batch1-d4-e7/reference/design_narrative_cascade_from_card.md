---
name: design-narrative-cascade-from-card
description: 사건 카드 간 인과 흐름을 narrative로 표현하는 5번째 trigger 타입. 이전 카드/증거 발현 후 다음 카드/증거/증인의 자연 연속 등장 정책.
metadata:
  type: design
  node_type: memory
  originSessionId: cycle2-spouse01-money-line
---

## 권위 범위

본 정책은 **각 사건의 사건 카드 간 인과 흐름**을 narrative trigger 패턴으로 표현. Cycle 2 (spouse-01 자금 line) 진입 시 사용자 권위로 정립.

권위 근거:
- [[feedback_new_dispute_evidence_narrative_justification]] — Core narrative trigger 권위
- [[design_core_narrative_cycle_procedure]] — 8단계 절차 권위
- Cycle 2 사용자 결정 (2026-05-24): "dc-4, dc-7은 인과관계가 생기는 셈 아니야? 사건카드 간 연결고리도 필요할 수 있어보이는데.."

---

## Trigger 타입 정의

기존 4 trigger (`npc_interjection` / `combination_result` / `emotional_outburst` / `judge_auto_mention`) 에 더해 **5번째**:

- **`cascade_from_card`** — 이전 사건 카드(dossierCard) 또는 증거(evidence)가 이미 발현된 상태에서, 그 narrative line의 자연 연속으로 다음 카드/증거/증인이 등장.

### 의도

- **mechanical-only cascade 금지**: dc-7 발현만으로 dc-4 자동 surface = 정책 위반 (Core narrative justification)
- **narrative wrapping 필수**: 이전 카드 결과를 reference한 판사 자발 query / NPC 끼어듦 / 분석 결과 narrative로 등장
- **인과 chain 표현**: dc-3 → e-7 → dc-7 → e-6 → dc-4 → w-3 같은 자금 흐름이 narrative 연속으로 자연 진행

---

## Schema spec

### NarrativeTriggerType 확장

```typescript
type NarrativeTriggerType =
  | 'npc_interjection'
  | 'combination_result'
  | 'emotional_outburst'
  | 'judge_auto_mention'
  | 'cascade_from_card'  // ← 신규
```

### NarrativeTriggerPreconditions 확장

```typescript
{
  // ... 기존 field (lieState/distrust/phase/contextAction 등)
  requirePriorCardFired?: string  // dossierCardId | evidenceId | disputeId | witnessId — 통합 ID
}
```

`requirePriorCardFired`는 **dossierCard / evidence / dispute / witness ID 모두 허용** (priorCard 영역 통합).

Runtime은 `firedEmergences` map의 모든 key를 lookup. dispute/witness fire 후에도 cascade precondition 만족 가능 (Cycle 5 family-01 dc-2 cascade priorCard:d-2 첫 사용 사례 확인).

### ScriptedText tag spec

```
"trigger:cascade_from_card"
"priorCard:<dossierCardId | evidenceId | disputeId | witnessId>"
```

`priorCard` tag는 narrative entry text의 이전 카드 reference와 일관해야 함 (예: text에 "앞서 등재된 [정기 자금 이동의 흔적]…" → tag `priorCard:dc-cash-clue`).

---

## Runtime 거동

### 평가 조건

`cascade_from_card` candidate 평가 시:
1. `requirePriorCardFired` 명시된 ID가 fired 상태 확인 (engine state lookup)
2. 본 candidate의 다른 preconditions 모두 만족
3. 위 둘 모두 통과 시 fire 자격

### First-Fired-Wins

기존 정책과 동일. 한 emergence의 어느 trigger든 firing 시 나머지 후보 (cascade 포함) disabled.

### Fired card/evidence 추적

- `EvidenceRuntimeState.narrativeFiredTrigger` (Cycle 1) 와 동일 패턴
- 추가 추적 필요: `DossierCardRuntimeState.firedAt` (turn) — cascade precondition lookup용

---

## ScriptedText 작성 패턴

### text 본문

이전 카드/증거 명시 reference 필수. 예시:

| Cycle 2 batch | priorCard | text reference 예시 |
|---|---|---|
| Batch 1 dc-3 | dc-cash-clue | "앞서 등재된 [정기 자금 이동의 흔적]과 본인 명의 계좌 출금 내역을 함께 보면..." |
| Batch 1 e-7 | dc-3 | "남편 측 자금 흐름이 정리됐으니, 아내 측 공동 적금의 처분 경위도 같은 비중으로 검토합니다..." |
| Batch 2 dc-7 | e-7 | "앞서 등재된 [공동 적금 해지 서류]를 둘러싼 절차 논의가 충분히 누적됐습니다..." |
| Batch 2 e-6 | dc-7 | "앞서 등재된 [공동 적금 2,000만 원의 해지] 절차 다음 단계로, 해지액의 사용 내역을 확인합니다..." |
| Batch 3 dc-4 | e-6 | "앞서 등재된 [투자방 텔레그램 + 송금 기록]을 종합하면, 해지액의 결과까지 정리할 시점입니다..." |
| Batch 3 w-3 | dc-4 | "앞서 등재된 [돌이키고 싶은 2,000만 원] 관련하여, 투자방 링크 전달 경위 확인이 필요합니다..." |
| Batch 4 w-2(h-d3) | dc-7 | "앞서 등재된 [공동 적금 2,000만 원의 해지] 절차에 대한 객관적 확인이 필요합니다..." |

### Cycle 5 family-01 사례 (priorCard scope 일반화 확인)

| Cycle 5 batch | priorCard type | priorCard ID | text reference 예시 |
|---|---|---|---|
| Batch 1 w-1 | dossier | dc-1 | "앞서 등록된 단서 [말년의 종이]와 관련하여, 당시 어머니 곁에 계셨던 전 요양보호사분의 진술을 직접 청취하겠습니다..." |
| Batch 2 d-2 | dossier | dc-1 | "앞서 등록된 단서 [말년의 종이]와 관련하여, 절차 자체에 개입이 있었는지 여부를 별도 쟁점으로 분리하여 확인해 보겠습니다..." |
| Batch 2 e-3 | dossier | dc-1 | "단서 [말년의 종이]와 같은 시기 현장 음성이 추가로 확보됐습니다..." |
| **Batch 3 dc-2** | **dispute** | **d-2** | "앞서 별도 쟁점으로 둔 공증 절차와 관련하여, 공증인 메모를 확인했습니다. 단서 [수정된 유언장]을 본 법정에 등록합니다..." — **dispute → dossier cascade 첫 사용** |
| Batch 3 w-2 | dossier | dc-2 | "앞서 등록된 단서 [수정된 유언장]과 관련하여, 공증인 메모를 작성하신 담당자분을 직접 자리로 모시겠습니다..." |

### entry ID 명명

```
emerge-{emergenceId}-via-cascade-{role}-{verb}-v{N}
```

예:
- `emerge-dc3-via-cascade-judge-mention-v1`
- `emerge-e7-via-cascade-b-response-v1`
- `emerge-dc7-via-cascade-judge-decree-v1`

---

## 부착 가능 영역

cascade_from_card는 evidence 한정 X. 본 정책으로 다음 모든 영역에 부착 가능:

- `EvidenceNode.narrativeTriggers` (Cycle 1 — 기존)
- `DossierCard.narrativeTriggers` (Cycle 2 신규)
- `Witness.narrativeTriggers` (Cycle 2 신규)
- `Dispute.narrativeTriggers` (Cycle 2 신규)

각 type schema에 동일 spec (`NarrativeTriggerCandidate[]`).

---

## 다른 사건 적용

본 정책은 spouse-01에 한정 X. family-01 / friend-01 등 다른 사건의 narrative wrapping cycle에서도 cascade chain 식별 + 적용.

식별 절차 (cycle 0단계 정찰 영역):
1. 사건 카드 간 인과 그래프 작성 (어느 카드 발현 → 어느 카드/증거/증인 자연 연속?)
2. 짝(pair) 단위로 cascade candidate 후보 선정
3. mechanical trigger와 narrative trigger 중복 시 narrative 우선 (multi-trigger 후보의 하나로 cascade 포함)

---

## 한계 / 주의

- **chain 길이 제한**: 한 emergence가 3개 이상의 cascade chain의 끝점이면 narrative 추적 부담 ↑. 권장 chain 길이 ≤ 5
- **cross-line cascade 신중**: 자금 line의 cascade를 외도 line의 emergence가 trigger하는 cross-line은 자연성 약함. 같은 서사 line 내 cascade 권장
- **fallback 필수**: cascade만으로 충분치 않을 때 (이전 카드 fire 안 됨) judge_auto_mention fallback 별도 후보로 보장

---

## 관련 메모리

- [[feedback_new_dispute_evidence_narrative_justification]] — multi-trigger + First-Fired-Wins 핵심 권위
- [[design_core_narrative_cycle_procedure]] — 8단계 절차 (본 정책은 1단계 기획에서 활용)
- [[design_core_case_derive_hybrid_merge]] — Core System derive
- [[design_spouse01_truth_disclosure_policy]] — cascade text 작성 시 surface 경계 준수

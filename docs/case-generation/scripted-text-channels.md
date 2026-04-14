# ScriptedText 15채널 레퍼런스

> spouse-01 기준. 각 채널의 키 패턴, 엔트리 구조, 예상 수량.

---

## 수량 공식

| 채널 | 공식 | spouse-01 (4쟁점) | 5쟁점 케이스 |
|------|------|-------------------|-------------|
| interrogation | 쟁점×2×6×3 | 144 | 180 |
| evidence_present | 증거×2×3 | 42 | 42 |
| dossier | dc질문수×3밴드 | 24 | ~15 |
| witness | 증인×3깊이 | 9 | 9 |
| aftermath | 5종 고정 | 5 | 5 |
| system_message | 6종 고정 | 6 | 6 |
| contradiction_pursuit | 쟁점×2×2 | 16 | 20 |
| interjection | 쟁점×2 | 8 | 10 |
| emotional_overload | 쟁점별 1~2 | 4 | 4~6 |
| evidence_discovery | 증거×2 | 12 | 12~14 |
| trust_action | 3종×2×3상태 | 18 | 18 |
| judge_question | 쟁점×3유형×2깊이 | 24 | 30~36 |
| judge_contradiction | 쟁점×3톤÷2 | 6 | 6~9 |
| system_message_v2 | 혼합 | 8 | 8~10 |
| mediation | 4경로 고정 | 4 paths | 4 paths |

---

## 채널별 상세

### 1. interrogation

NPC가 심문 질문에 답하는 대사. **가장 큰 채널.**

- **키**: `{party}|{disputeId}|{lieState}|{questionType}`
- **예시**: `a|d-1|S0|fact_pursuit`
- **variants/key**: 5
- **엔트리 필드**:

| 필드 | 타입 | 설명 |
|------|------|------|
| `key` | string | 복합 키 |
| `party` | string | a / b |
| `disputeId` | string | d-N |
| `lieState` | string | S0~S5 |
| `questionType` | string | fact_pursuit / motive_search / empathy_approach |
| `stanceHint` | string | deny / partial / deflect / emotional / confess 등 |
| `truthLevel` | string | 진실 공개 수준 |
| `variants` | object[] | 5개 변형 |

### 2. evidence_present

증거 제시 시 NPC 반응.

- **키**: `{party}|{evidenceId}|{lieBand}|{subjectRole}`
- **예시**: `b|e-1|early|self`
- **variants/key**: 5
- **추가 필드**: `subjectRole` (self / other / both)

### 3. dossier

DossierCard 질문에 대한 NPC 답변.

- **키**: `{party}|{dossierQuestionId}|{lieBand}`
- **예시**: `b|dc-1.b.q1|early`
- **variants/key**: 3
- **lieBand**: early / mid / late

### 4. witness

증인 증언 텍스트.

- **키**: `{witnessId}|{depth}`
- **예시**: `w-1|vague`
- **variants/key**: 3
- **depth**: vague / partial / full

### 5. aftermath

판결 후 후일담.

- **키**: `{resultClass}`
- **5종**: `a_primary_fault`, `b_primary_fault`, `shared_fault`, `protective_resolution`, `procedural_caution`
- **variants/key**: 2
- behaviorHint 없음

### 6. system_message

시스템 알림 메시지.

- **키**: `{context}|{eventType}`
- **예시**: `interrogation|repeat_warning`
- **6종 고정**: repeat_warning, stalemate_notice, dossier_unlock, evidence_upgrade, witness_available, phase_transition
- **variants/key**: 2

### 7. contradiction_pursuit

모순 추궁 시 NPC 반응.

- **키**: `{party}|{disputeId}|{lieState}`
- **예시**: `a|d-1|S1`
- **variants/key**: 3

### 8. interjection

끼어들기(상대 발언 중 반응).

- **키**: `{party}|{disputeId}|{severity}`
- **예시**: `a|d-1|minor`
- **severity**: minor / major
- **variants/key**: 3

### 9. emotional_overload

감정 폭발 대사.

- **키**: `{party}|{disputeId}`
- **예시**: `a|d-1`
- **variants/key**: 2

### 10. evidence_discovery

증거 발견 반응.

- **키**: `{party}|{evidenceId}|{step}`
- **예시**: `b|e-1|probe`
- **step**: probe / slip / capture / confirm
- **variants/key**: 1
- stanceHint·truthLevel 없음

### 11. trust_action

신뢰 행동(분리심문, 비공개, 즉답 등).

- **키**: `{party}|{actionType}|{lieState}`
- **예시**: `a|separation|S1`
- **actionType**: separation / confidential / immediate
- **variants/key**: 2

### 12. mediation

중재 대화. **entries가 아닌 paths 구조.**

- **4 paths**: `immediate`, `conditional`, `postpone`, `fact_first`
- 각 path: `{ dialogues: [ {speaker, text, relatedDisputes, behaviorHint}, ... ] }`
- path당 dialogues 2개 (a, b 각 1개)

### 13. judge_question

재판관이 던지는 질문.

- **키**: `{disputeId}|{questionType}|{depth}`
- **예시**: `d-1|fact_pursuit|1`
- **depth**: 1~4 (숫자)
- **variants/key**: 2
- party 필드 없음

### 14. judge_contradiction

재판관의 모순 지적.

- **키**: `{disputeId}|{tone}`
- **예시**: `d-1|soft`
- **tone**: soft / mid / hard
- **variants/key**: 3

### 15. system_message_v2

V2 시스템 메시지 (교착/모순/공감 피드백).

- **키**: `{context}|{eventType}` (혼합형)
- **예시**: `interrogation|stalemate_warning`, `d-1|contradiction_feedback`, `a|empathy_feedback`
- **variants/key**: 5

# GPT Pro 의뢰서 — family-01 Cycle 7 Batch 3 (e-5 + dc-5) emergence narrative

작성일: 2026-05-25
범위: 2 emergence × 8 trigger 후보의 narrative ScriptedText KO 시안 (18 entry)

---

## §0. 권위 메모리 (정독 필수)

`reference/` 12종 — Batch 1과 동일. 본 batch 핵심 정책:

| 메모리 | 본 batch 적용 영역 |
|---|---|
| `design_family01_truth_disclosure_policy` | **그룹 3 정확 수치 절대 X — 본 batch 가장 엄격 정책** (e-5 S5 봉인 영역) |
| `design_truth_leak_keyword_nature` | hidden keyword 본성 |
| `design_narrative_cascade_from_card` | cascade priorCard (e-5 priorCard:dc-4 / dc-5 priorCard:d-5) |
| `feedback_judge_dispassionate_action_focused` | 재판관 어법 |

---

## §1. 사건 context

family-01 사건 Line C **종결 영역**. Batch 1/2 결과 — d-4 / e-7 / dc-4 / d-5 narrative wrapper 완료. 본 batch:

- **e-5 "자필 메모 사본"** (lockedName=어머니 자필 유언장 연습본): 자필 자료 등재. *정확 수치는 d-5 S5 영역의 별도 mechanism — 본 batch entry는 자료 surface 자체만*
- **dc-5 "어머니의 뜻"**: 양측 책임축 종합 (장남 당연시 + 보호 명분 + 어머니 뜻 두 번 비틀음). 최종 단서.

### e-5 "자필 메모 사본" (lockedName=어머니 자필 유언장 연습본) — evidence

- **lockedName (case.ts)**: "어머니 자필 유언장 연습본"
- **surfaceName (player visible)**: **"자필 메모 사본"** ← entry text는 이것 사용
- **mechanical 조건**: requiredLieState='S5' (d-5 S5 도달 후) + requires=['e-7']
- **proves**: ['d-5']
- **depthStages**: stub → excerpt → original → context → established
- **sensitiveSealTargets** (case.ts):
  - 자필 비율 정확 수치 (90:10) → **d-5 S5 도달 후만 노출 (별도 mechanism)**
  - 자기 몫 축소 방향 → 동일 봉인
- **본 batch 호출 시점**: dc-4 침묵 동기 정리 + d-5 양측 책임축 영역 진입 후 자료 등재 cascade
- **본 batch 진실 영역**: **자료 surface 자체** (자료 등재 narrative). 정확 수치 절대 X.

### dc-5 "어머니의 뜻" — dossier card (최종 단서)

- **clue label (player visible)**: "어머니의 뜻"
- **mechanical 조건**: d-5 S2.successUnlocks (자동) / combine-2 (e-4+e-5) / combine-8 (e-1+e-7) / combine-9 (stmt-a-heir+e-7)
- **noteText**: "자필 연습본 90:10이 공증 60:40으로 줄어든 흐름과 20년 지원 + 출생 비밀이 함께 정리되며 양측의 책임축이 동시에 드러난다."
- **effects**: `unlock_note` + `upgrade_dispute d-5 high/high` (d-5 weight/ambiguity 상승)
- **본 batch 정의**: dc-5 = **최종 종합 단서** — 양측 책임축 종합. A 장남 당연시 frame + B 보호 명분 + 어머니 뜻 두 번 비틀음을 한 자리에 정리.
- **단서 등록 narrative entry text reference**: "단서 [어머니의 뜻]"

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

---

### Emergence 5: **e-5** "자필 메모 사본" — 4 trigger

**구조 핵심**: dc-4 침묵 동기 정리 후 자필 자료 등재. **정확 수치 절대 X** (S5 봉인 — 별도 mechanism 영역).

**미스터리 dynamics 정책**:
- 자료 surface 자체는 격식
- "자필 메모 사본" surfaceName 사용 (entry text)
- 단 "정확한 비율은 단계별로만 공개합니다" 봉인 명시 일관
- B 측 제출 자료 — provenance 'self_possessed', subjectParty 'both'

---

#### Trigger 1 — `cascade_from_card` (priorCard:dc-4) ← **메인**

**선결조건:**
- dc-4 fired + d-5 lieState ≥ S3

**Narrative scenario:**
- 컨텍스트: dc-4 침묵 동기 정리 후, "어머니가 직접 남기신 자료" 등재 자연 — 자필 메모 사본 등재
- 발동 흐름 (~6초): 재판관 자발 cascade mention + 자료 등재 + 봉인 명시

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-4 reference + 자료 등재 + 봉인 명시 | 3 문장 | 격식·결정 |
| `emerge-e5-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 (자료 제출 확인) | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree (3 문장):
  1. "앞서 등록된 단서 [감춘 이유] 다음 영역으로, 어머니가 직접 남기신 자료가 본 영역에 정렬됩니다."
  2. "윤정후 측이 보관해 온 어머니의 자필 메모 사본을 본 법정에 받아들입니다." ← **호출 동사 다양화 ("받아들입니다")**
  3. "정확한 비율 영역은 단계별로만 공개합니다." ← **봉인 명시 핵심**
- B respond (1 문장): "예… 어머니께서 남기신 메모입니다." ← 회피 frame 약하게

---

#### Trigger 2 — `combination_result` (다중 recipe — `combine-2` = e-4+e-5 OR `combine-3` = e-5+e-6 OR `combine-7` = e-5+e-7 OR `combine-8` = e-1+e-7)

**선결조건:**
- player 조합 실행 (다중 recipe 가능 — combine-2 우선)
- requiredEvidenceStages 정합 (case.ts gate)
- d-5 lieState ≥ S3

**Narrative scenario:**
- 컨텍스트: player가 자필 자료 + 공증인 메모 OR 자필 + 송금 OR 자필 + 일기장 combo → 자필 자료 영역 결합
- 발동 흐름 (~7초): 재판관 자발 결과 + 자료 등재

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-combo-judge-decree-v1` | 판사 | 전체 | combo 결과 + 자료 등재 + 봉인 명시 | 3 문장 | 격식·분석 |
| `emerge-e5-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree:
  1. "어머니의 자필 메모 사본과 본 영역의 다른 자료가 한 자리에서 검토됐습니다."
  2. "자필 본의 분배 흔적이 본 영역의 자료로 정렬됩니다. 자필 메모 사본을 본 법정에 받아들입니다."
  3. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

#### Trigger 3 — `npc_interjection` (b 측 — 자료 자발 surface)

**선결조건:**
- d-5 lieState ≥ S3
- B partyPhase: ['defensive', 'shaken']

**Narrative scenario:**
- 컨텍스트: B가 자필 영역에서 "어머니가 직접 남기신 메모가 따로 있다" 자발 언급 → 자료 surface
- 발동 흐름 (~7초): B 자발 → 재판관 reactive → 자료 등재

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-b-interject-v1` | B | 판사 | 자필 자료 자발 언급 | 1~2 문장 | 무거운 평정 |
| `emerge-e5-via-b-interject-judge-react-v1` | 판사 | B | reactive | 1 문장 | 격식·결정 |
| `emerge-e5-via-b-interject-judge-decree-v1` | 판사 | 전체 | 자료 등재 + 봉인 명시 | 1~2 문장 | 격식·확정 |

**가이드:**
- B interject (1~2 문장):
  1. "어머니께서 공증본과 별개로 직접 정리하신 메모가 한 장 있습니다."
  2. "본인이 그 자료를 가지고 있습니다." ← **B 보관 영역 hook**
  - behaviorHint: "윤정후가 서류 묶음 안에서 한 장을 짚으며 짧게 두 문장을 잇는다. 두 번째 문장에서 처음으로 본인 보관 사실을 인정한다."
  - **금지 영역**: 정확 수치 X / "본인이 비율을 바꿨다" 단정 X (그 영역은 d-5 S5)
- 판사 react (1 문장): "그 자필 자료를 본 법정에 직접 확인해 보겠습니다."
- 판사 decree (1~2 문장):
  1. "윤정후 측이 보관해 온 어머니의 자필 메모 사본을 본 법정에 받아들입니다."
  2. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시

---

#### Trigger 4 — `judge_auto_mention` (fallback)

**조건:**
- T1~T3 미발동 + d-5 S3 + turnsAfterEligible: 6

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e5-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 자료 호출 + 봉인 명시 | 2 문장 | 격식·결정 |
| `emerge-e5-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 auto (2 문장):
  1. "본 책임축 영역의 자료가 정리되지 않았습니다. 윤정후 측이 보관해 온 어머니의 자필 메모 사본을 본 법정에 직접 들어보겠습니다." ← **호출 동사 다양화 ("들어보겠습니다")**
  2. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 5 total: 2 + 2 + 3 + 2 = 9 entry**

---

### Emergence 6: **dc-5** "어머니의 뜻" — 4 trigger

**구조 핵심**: d-5 양측 책임축 영역 진입 후 종합 단서 등록. **최종 단서** — 양측 책임축 종합 (장남 당연시 + 보호 명분 + 어머니 뜻 두 번 비틀음).

**미스터리 dynamics 정책**:
- A 자기 frame 균열 + 책임 인식 첫 진입 (장남 당연시 frame 책임 영역 진입)
- B 보호 명분 + 어머니 뜻 책임 영역 종합
- 재판관 "양측 책임축이 한 자리에 정렬됩니다. 정확한 비율 영역은 단계별로만 공개합니다."

---

#### Trigger 1 — `cascade_from_card` (priorCard:d-5) ← **메인**

**선결조건:**
- d-5 fired + d-5 lieState ≥ S2 (case.ts d-5 S2.successUnlocks=['dc-5'] 자동)

**Narrative scenario:**
- 컨텍스트: d-5 양측 책임축 영역 진입 후 종합 단서 등록 자연 — 양측 책임축 + 어머니 뜻 두 번 비틀음 정리
- 발동 흐름 (~7초): 재판관 자발 d-5 reference → 종합 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc5-via-cascade-judge-decree-v1` | 판사 | 전체 | d-5 reference + 종합 단서 등록 + 봉인 명시 | 3~4 문장 | 격식·결정 |
| `emerge-dc5-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 (수용) | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree (3~4 문장):
  1. "앞서 별도 쟁점으로 둔 어머니의 숨겨진 마음 영역에서, 양측 책임축이 한 자리에 정렬됩니다."
  2. "윤태성 측이 어머니의 평생 돌봄을 자기 몫의 정당한 비중으로 받아온 영역과, 윤정후 측이 어머니 뜻을 보호한다는 명분으로 다른 방향으로 다듬은 영역이 함께 본 영역에 모입니다." ← **양측 책임축 종합 — 그룹 5 surface OK**
  3. "종합 단서 [어머니의 뜻]을 본 법정에 등록합니다."
  4. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond (1 문장): "예, 받아들이겠습니다."

---

#### Trigger 2 — `combination_result` (다중 recipe — `combine-2` = e-4+e-5 OR `combine-8` = e-1+e-7 OR `combine-9` = stmt-a-heir+e-7)

**선결조건:**
- player 조합 실행 (다중 recipe 가능)
- requiredEvidenceStages + requiredTruthStage 정합 (case.ts gate)

**Narrative scenario:**
- 컨텍스트: player가 자필 + 공증인 메모 OR 유서 사본 + 일기장 OR A 진술 + 일기장 combo → 양측 책임축 종합
- 발동 흐름 (~7초): 재판관 자발 결과 + 종합 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc5-via-combo-judge-decree-v1` | 판사 | 전체 | combo 결과 + 종합 단서 등록 + 봉인 명시 | 3 문장 | 격식·분석 |
| `emerge-dc5-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree:
  1. "본 영역의 자료가 한 자리에서 검토되어, 양측 책임축이 한 영역에 모입니다."
  2. "두 형제 모두 어머니 뜻을 있는 그대로 두지 못한 영역이 정황상 드러납니다. 종합 단서 [어머니의 뜻]을 본 법정에 등록합니다." ← **양측 책임축 surface — 그룹 5 surface**
  3. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

#### Trigger 3 — `emotional_outburst` (**a 측** — 장남 당연시 frame 책임 인식 첫 진입)

**선결조건:**
- d-5 lieState ≥ S2
- A partyPhase: ['shaken', 'resigned']

**Narrative scenario:**
- 컨텍스트: A가 양측 책임축 영역에서 *장남 당연시 frame 책임 영역 첫 진입* — "내가 받아온 영역이 당연하지 않다"는 첫 인식. (Cycle 6의 의심 → Batch 2의 자기 frame 균열 → 본 batch 책임 인식)
- 발동 흐름 (~9초): A 무거운 첫 인정 → 재판관 catch + 종합 단서 등록

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc5-via-a-outburst-v1` | A | 판사 | A 장남 당연시 frame 책임 인식 첫 진입 | 2~3 문장 | 무거운 인정 |
| `emerge-dc5-via-a-outburst-judge-react-v1` | 판사 | A | reactive (양측 책임축 영역 인정) | 1 문장 | 격식·결정 |
| `emerge-dc5-via-a-outburst-judge-decree-v1` | 판사 | 전체 | 종합 단서 등록 + 봉인 명시 | 2 문장 | 격식·확정 |

**가이드:**
- A outburst (2~3 문장):
  1. (한참 침묵 후, 시선을 손등에 둔 채) "…내가 평생 모셨다는 말이… 그게 당연한 건 아니었어."
  2. (시선을 자료로 옮기며) "어머니가 동생을 더 마음에 두고 계셨다면, 내가 받아온 영역이 당연한 게 아니라 동생이 양보해 둔 영역이었던 거잖아."
  3. (목소리가 깊어지며) "재판관님, 본인이 그 영역을 똑바로 보지 못했습니다." ← **A 책임 인식 첫 발화 — "본인" 주체화 + 책임 인정**
  - behaviorHint: "윤태성이 자존심 frame을 처음으로 내려놓는다. 첫 문장에서 한숨이 길게 나오고, 세 번째 문장에서 처음으로 본인 주체화 ('본인이') 문법을 사용한다."
  - **금지 영역**: 정확 수치 X / "동생이 위조했다" 부정 단정 X (책임 인식 영역은 자기 frame 인식)
- 판사 react (1 문장): "윤태성 측 발화로 본 영역의 양측 책임축이 한 자리에 정렬됩니다."
- 판사 decree (2 문장):
  1. "양측 책임축을 종합한 단서 [어머니의 뜻]을 본 법정에 등록합니다."
  2. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시

---

#### Trigger 4 — `judge_auto_mention` (fallback)

**조건:**
- T1~T3 미발동 + d-5 S2 + turnsAfterEligible: 6

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc5-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 종합 단서 등록 | 3 문장 | 격식·결정 |
| `emerge-dc5-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 auto (3 문장):
  1. "어머니의 숨겨진 마음 영역에서 양측 책임축이 한 자리에 정렬되지 않았습니다."
  2. "윤태성 측의 평생 돌봄 frame과 윤정후 측의 보호 명분 frame을 함께 정리하여, 종합 단서 [어머니의 뜻]을 본 법정에 등록합니다."
  3. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 6 total: 2 + 2 + 3 + 2 = 9 entry**

---

**Batch 3 grand total: 9 + 9 = 18 entry**

---

## §3. 미스터리 dynamics 정책 (본 batch 핵심)

### Dynamics 1 — A "장남 당연시 frame 책임 인식 첫 진입" (본 cycle 최종 책임 영역)

- A 발화 = Batch 2의 *자기 frame 균열* → 본 batch *책임 인식*. "내가 받아온 영역이 당연한 게 아니었다" 직접 단정.
- A는 본 batch에서 처음으로 "본인" 주체화 문법 사용 (B Batch 2에서 처음 사용한 것의 거울)
- A 책임 인식 어휘 사전:
  - ✓ "내가 평생 모셨다는 말이… 그게 당연한 건 아니었어"
  - ✓ "어머니가 동생을 더 마음에 두고 계셨다면, 내가 받아온 영역이 당연한 게 아니라 동생이 양보해 둔 영역이었던 거잖아"
  - ✓ "본인이 그 영역을 똑바로 보지 못했습니다" ← A "본인" 주체화 첫 발화
  - ✗ 정확 수치 X
  - ✗ "동생이 위조했다" / "동생이 거짓말한다" 단정 X (책임 인식 영역은 자기 frame 인식이지 타인 비난 X)

### Dynamics 2 — B "양보 + 어머니 뜻 책임" 종합 (Batch 2 보호 명분 영역 계승)

- B 발화 = Batch 2 영역 계승 (보호 명분 + 어머니 뜻 다듬음). 본 batch는 짧은 수용 응답 위주 — 양측 책임축 종합 영역으로 B는 *수용자* 위치
- B 발화 어휘 사전:
  - ✓ "예, 받아들이겠습니다"
  - ✓ "어머니께서 남기신 메모입니다" (자료 자발 surface)
  - ✓ "본인이 그 자료를 가지고 있습니다" (보관 영역 hook)
  - ✗ 정확 수치 X
  - ✗ "본인이 비율을 줄였다" 단정 (S5 영역 — 본 batch X)

### Dynamics 3 — 재판관 "양측 책임축 정렬 + 정확 비율 봉인 명시"

- 모든 재판관 decree entry 마지막 문장에 "정확한 비율 영역은 단계별로만 공개합니다" 또는 동등 표현
- 본 batch 재판관 어휘는 **dc-5 decree에서 양측 책임축 종합 어휘 사용** — Batch 1/2 영역보다 분량 깊음
- 표현 사전:
  - ✓ "양측 책임축이 한 자리에 정렬됩니다"
  - ✓ "두 형제 모두 어머니 뜻을 있는 그대로 두지 못한 영역"
  - ✓ "정확한 비율 영역은 단계별로만 공개합니다"
  - ✗ "90:10은 봉인합니다" (시스템 정책 직접 X)

---

## §4~6. 시스템 용어 금지 / 호칭 / 진실 노출 경계

Batch 1 §4~6과 동일. 본 batch 변경 영역:

- **그룹 3 정확 수치 (90:10 / 60:40)** — **본 batch 모든 entry 절대 X** (가장 엄격 정책)
- **그룹 1/4** — Batch 2에서 이미 surface 시작. 본 batch에서 추가 surface 영역 X (dc-4 영역에 머무름)
- **그룹 5** — 본 batch dc-5 decree 영역에서 직접 surface 정점 ("어머니 뜻을 있는 그대로 두지 못한 영역")

### entry text의 surfaceName 사용

- `e-5` lockedName "어머니 자필 유언장 연습본" → entry text **"자필 메모 사본"** (P0 위험 영역 — entry text에 lockedName 등장 시 즉시 fix)
- `e-7` lockedName "어머니 일기장" → entry text "오래된 노트 사본"
- `dc-4` (= label "감춘 이유") / `dc-5` (= label "어머니의 뜻")

---

## §7. 작성 산출 형식

JSON 배열 형식 + tag spec — Batch 1 §7과 동일. 본 batch 변경:

**emergence/target tag**:
- Emergence 5: `emergence:e-5` / `targetEvidence:e-5`
- Emergence 6: `emergence:dc-5` / `targetClue:dc-5` / `clueLabel:어머니의_뜻`

**linkedParty**:
- Emergence 5 (e-5): `linkedParty:b` (subjectParty='both'이지만 B 측 제출 자료 — 본 cycle linkedParty:b)
- Emergence 6 (dc-5): `linkedParty:b` (case.ts linkedParty='b')

**entry ID 명명**:
- Emergence 5: `emerge-e5-via-<trigger>-<role>-<verb>-v1`
- Emergence 6: `emerge-dc5-via-<trigger>-<role>-<verb>-v1`

---

## §8. 톤 권위

Batch 1 §8과 동일. `sample/output-cycle6-family01-line-b.json` 정독.

---

## §9. 자가 검증 (GPT Pro 출력 전 self-check)

- [ ] **모든 entry text에 정확 수치 (90:10 / 60:40 / 정후 90 / 태성 10) 등장 X** — 본 batch 가장 엄격 정책
- [ ] 모든 entry text에 lockedName ("어머니 자필 유언장 연습본" / "어머니 일기장") 등장 X (반드시 surfaceName)
- [ ] 모든 entry text에 시스템 용어 (S0~S5 / trigger / unlock) 등장 X
- [ ] 모든 entry text에 친부 실명 영역 등장 X (영구 봉인)
- [ ] A 발화 — 책임 인식 frame ("본인이 그 영역을 똑바로 보지 못했습니다") OK 단 정확 수치 X / 타인 비난 X
- [ ] B 발화 — 양측 책임축 수용 영역 (짧은 응답 위주) — 정확 수치 X
- [ ] 판사 decree 모두 "양측 책임축이 한 자리에 정렬됩니다" + "정확한 비율 영역은 단계별로만 공개합니다" 명시
- [ ] entry text에 "단서 [감춘 이유]" / "단서 [어머니의 뜻]" 표현 정확
- [ ] 호출 동사 다양화 (cascade=받아들입니다 / combo=받아들입니다 / interject=직접 확인해 보겠습니다 / fallback=직접 들어보겠습니다)
- [ ] tag 영역 §7 명세 외 추가 tag 등장 X

---

## §10. 응답 파일

`output-cycle7-batch3-e5-dc5.json` — JSON 배열 (18 entry). 본 batch 폴더 `result/` 저장.

---

## §11. 본 batch 사후 처리 안내

1. `src/data/scriptedText/family-01.json` `emergence_narrative` channel 18 entry append
2. `src/data/coreCases/family-01.narrative.ts`에 신규 export:
   - `e5NarrativeTriggers` (Batch 3 Emergence 5) — 4 trigger candidate
   - `dc5NarrativeTriggers` (Batch 3 Emergence 6) — 4 trigger candidate
3. `src/data/coreCases/family-01.case.ts`의 e-5 / dc-5 정의에 `narrativeTriggers` field 부착
4. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` PASS — **truth-leak gate 정밀 확인** (그룹 3 봉인 영역)

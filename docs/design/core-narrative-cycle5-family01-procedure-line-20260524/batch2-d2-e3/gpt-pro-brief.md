# GPT Pro 의뢰서 — family-01 Cycle 5 Batch 2: d-2 + e-3 emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (d-2 + e-3)의 multi-trigger narrative ScriptedText KO 시안

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음 — Batch 1과 동일 목록. 정독 후 작성.

---

## §1. 사건 context

**family-01** = 윤태성(A) vs 윤정후(B) 형제 유산 다툼. Batch 1과 동일 frame. 본 batch는 절차 쟁점(d-2) 분리 + 음성증언(e-3) 보강.

### d-2 "공증 절차의 개입"

- **의미**: 공증본 60:40에 도달한 절차에서 윤정후가 어머니 상태와 진행 속도에 어떻게 작용했는지를 다투는 쟁점. 오전 1차 접수에서 비율 공란 → 오후 수정 접수에서 60:40 확정 (정후 진행 압박).
- **게임 역할**: d-1에서 시작된 쟁점이 **절차 영역으로 분리**. dc-2 / e-4 / w-2 등 후속 자료 unlock 게이트.
- **현재 mechanical 조건**: `unlockCondition: d-1 minState=S3`. v3Visibility=`hidden`이므로 surface 시점 narrative 필요.
- **linkedParty**: B 책임 영역. legitimacyIssue=true.

### e-3 "전 요양보호사 음성증언"

- **의미**: 전 요양보호사가 윤정후의 방문·종이 낭독·"형 오기 전" 발화를 직접 목격한 음성. 종이를 읽어드리는 장면 + 형 회피 정황 포함.
- **게임 역할**: dc-1 / dc-2 보강 증거. `e-2`(방문기록)와 결합해 dc-1 unlock 핵심.
- **현재 mechanical 조건**: `requiredLieState: S1` + `requires: ['e-2']`. d-1 S1 + e-2 보유 후 unlock 자격.
- **subjectParty**: b.

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

각 emergence 독립 적용. d-2 firing은 e-3 trigger 평가에 영향 X.

---

### Emergence 1: **d-2** "공증 절차의 개입" — 4 trigger

#### Trigger 1 — dc-1 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-1` 이미 fired (priorCard:dc-1)
- d-1 lieState ≥ S3 (d-2 unlockCondition 만족)

**Narrative scenario:**
- 컨텍스트: 단서 [말년의 종이] 등록 후, 절차 영역이 별도 쟁점으로 자연 분리
- 발동 흐름 (~6초): 판사 자발 cascade mention → d-2 쟁점 surface

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d2-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-1 reference + d-2 surface 선언 | 1~2 문장 | 격식·확정 |
| `emerge-d2-via-cascade-a-react-v1` | A | 판사 | 짧은 동의 | 1 문장 | 동의·짧음 |

**가이드:**
- 판사 decree (v3 승인): **"앞서 등록된 단서 [말년의 종이]와 관련하여, 절차 자체에 개입이 있었는지 여부를 별도 쟁점으로 분리하여 확인해 보겠습니다."** — priorCard:dc-1 명시
- A react: "네, 그렇게 해 주십시오."

#### Trigger 2 — A의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- d-1 lieState ≥ S2
- A의 격앙 가능 상태
- 활성 액션: 공증 / 절차 영역 심문 중

**Narrative scenario:**
- 컨텍스트: 윤태성이 공증인 기록을 직접 거론하며 절차 의심 명시
- 발동 흐름 (~7초): A 끼어들기 → 판사 reactive → 절차 쟁점 분리 결정

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d2-via-a-interject-v1` | A | 판사 | 끼어들기 (공증 기록 거론) | 1~2 문장 | 격앙·결단 |
| `emerge-d2-via-a-interject-judge-react-v1` | 판사 | A | reactive (쟁점 분리 동의) | 1 문장 | 격식·결정 |
| `emerge-d2-via-a-interject-judge-decree-v1` | 판사 | 전체 | d-2 쟁점 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject (v3 승인): **"공증인 기록을 확인해 보면 될 것 아닙니까. 그 기록 안에 정후가 어떻게 한 일인지 다 있을 겁니다."** (격앙 톤, "정후"는 본인 시점 호명)
- 판사 react (v3 승인): **"좋습니다. 공증 절차 영역도 별도 쟁점으로 두겠습니다."**
- 판사 decree: "본 법정에 공증 절차의 개입을 별도 쟁점으로 분리하여 등록합니다."

#### Trigger 3 — B의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- d-1 lieState ≥ S2
- B 평정 → 단정 톤 진입 가능
- 활성 액션: 공증 절차 영역 질문 중

**Narrative scenario:**
- 컨텍스트: 윤정후가 절차 정상성을 단정으로 답하며 호흡 흔들림. 판사가 단정 자체를 별도 쟁점으로 처리
- 발동 흐름 (~7초): 판사 질문 → B 단정 답변 + 호흡 흔들림 → 판사 reactive (쟁점 분리)

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d2-via-b-outburst-v1` | B | 판사 | 단정 답변 (정상 강조) | 1 문장 | 단정·짧음 |
| `emerge-d2-via-b-outburst-judge-react-v1` | 판사 | B | reactive (단정 거부, 쟁점 분리) | 1~2 문장 | 격식·결정 |
| `emerge-d2-via-b-outburst-judge-decree-v1` | 판사 | 전체 | d-2 쟁점 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (v3 승인): **"그날 절차에는 문제가 없었습니다."** (단정 톤, 호흡 살짝 흔들림 — behaviorHint에 명시)
- 판사 react (v3 승인): **"공증 절차의 정상 여부는 별도 쟁점으로 확인해 보겠습니다."**
- 판사 decree: "본 법정에 공증 절차의 개입을 쟁점으로 등록합니다."

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-1 S3 도달 + 일정 turn(예: 7턴) 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d2-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 쟁점 분리 + 등록 | 1~2 문장 | 격식·결정 |
| `emerge-d2-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 auto: "어머니 판단 능력 영역과는 별도로, 공증 절차 자체의 진행 경위도 충분히 살필 필요가 있다고 봅니다. 본 법정에 공증 절차의 개입을 쟁점으로 등록합니다."
- B respond: "예, 받아들이겠습니다."

**d-2 total: 2 + 3 + 3 + 2 = 10 entry**

---

### Emergence 2: **e-3** "전 요양보호사 음성증언" — 4 trigger

#### Trigger 1 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- d-1 lieState ≥ S1
- e-2 보유 (방문기록 unlock 상태)
- B 평정 톤 (자기 결백 frame)

**Narrative scenario:**
- 컨텍스트: 윤정후가 본인 행동의 정당성을 강조하며 담당자 청취 권유. 그 발화 자체가 음성증언 자료 surface 단초
- 발동 흐름 (~6초): B 흘림 → 판사 reactive (자료 수령 결정) → e-3 자료 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e3-via-b-interject-v1` | B | 판사 | 흘림 (담당자 청취 권유) | 1~2 문장 | 평정·짧음 |
| `emerge-e3-via-b-interject-judge-react-v1` | 판사 | B | reactive (자료 수령 결정) | 1 문장 | 격식·결정 |
| `emerge-e3-via-b-interject-judge-decree-v1` | 판사 | 전체 | e-3 자료 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "당시 담당하셨던 분이 들으셨다면 다 아실 겁니다."
- 판사 react: "그 음성을 본 법정에 자료로 받겠습니다."
- 판사 decree: "본 법정에 [전 요양보호사 음성증언]을 증거 자료로 등록합니다."

#### Trigger 2 — dc-1 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-1` 이미 fired (priorCard:dc-1)
- d-1 lieState ≥ S1
- e-2 보유

**Narrative scenario:**
- 컨텍스트: dc-1 등록 후 보충 자료로 음성증언 자동 등장
- 발동 흐름 (~5초): 판사 자발 cascade mention → e-3 자료 surface

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e3-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-1 reference + e-3 surface | 1~2 문장 | 격식·확정 |
| `emerge-e3-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 decree (v3 승인): **"단서 [말년의 종이]와 같은 시기 현장 음성이 추가로 확보됐습니다. 본 법정에 [전 요양보호사 음성증언]을 증거 자료로 등록합니다."** — priorCard:dc-1 명시
- B respond: "예…"

#### Trigger 3 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 e-2 (요양원 방문기록) 단독 심층 분석 액션 (Original 도달)
- d-1 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: 방문기록 단독 분석 중 같은 시기 녹음 음성 자료 link 발견
- 발동 흐름 (~6초): 판사 분석 결과 발언 → 음성 자료 surface

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e3-via-combo-judge-decree-v1` | 판사 | 전체 | 분석 결과 + 자료 surface | 1~2 문장 | 격식·발견 |
| `emerge-e3-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 decree (v3 승인): **"방문 기록과 같은 시기에 녹음된 음성이 확보됐습니다. 본 법정에 [전 요양보호사 음성증언]을 증거 자료로 등록합니다."**
- B respond: "예, 받아들이겠습니다."

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-1 S1 + e-2 보유 후 일정 turn(예: 6턴) 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e3-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 자료 수령 + 등록 | 1~2 문장 | 격식·결정 |
| `emerge-e3-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 auto: "어머니 말년 정황을 보강하기 위해 당시 담당자 음성 자료가 필요한 시점이라 봅니다. 본 법정에 [전 요양보호사 음성증언]을 증거 자료로 등록합니다."
- B respond: "예, 받아들이겠습니다."

**e-3 total: 3 + 2 + 2 + 2 = 9 entry**

---

**Batch 2 grand total: 10 + 9 = 19 entry**

---

## §3. cascade_from_card spec

Batch 1과 동일. `design_narrative_cascade_from_card.md` 정독.

본 batch d-2 / e-3 모두 priorCard:dc-1 reference.

---

## §4. 작성 산출 형식

Batch 1 §4와 동일. 본 batch entry tag:
- d-2: `emergence:d-2` (dispute) — 모든 entry에 명시
- e-3: `emergence:e-3` (evidence) — 모든 entry에 명시

cascade entry는 `priorCard:dc-1` 추가.

---

## §5. 톤 권위

Batch 1 §5와 동일.

---

## §6. 진실 노출 경계 — Line A 영역

Batch 1 §6과 동일. **그룹 1~5 surface 절대 금지**.

본 batch 추가 주의:
- d-2 emergence에서 "오전 1차 비율 공란" / "오후 수정 60:40" 같은 정확 수치는 **d-2 truthStages에 따르면 S2 이상에서 forbiddenKeywords 해제**. emergence trigger 단계 = d-2 surface 시점이므로 S0~S1. **본 emergence narrative entry에서는 "공증 절차" / "진행 경위" / "수정" 정도의 surface 표현만 사용. 정확 수치(60:40, 90:10) 절대 X.**
- e-3 emergence narrative도 동일 — "음성증언", "당시 현장", "녹음된 음성" 등 자료 자체 표현만. 증언 내용(예: "형 오기 전" 발화) 직접 인용은 별도 channel(witness) 영역.

---

## §7. dossier card 명칭 변경 영역

Batch 1 §7과 동일. 본 batch entry에서 "단서 [말년의 종이]" reference 사용.

---

## §8 ~ §9

Batch 1과 동일 흐름.

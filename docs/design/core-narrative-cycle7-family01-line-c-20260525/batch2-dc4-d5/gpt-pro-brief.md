# GPT Pro 의뢰서 — family-01 Cycle 7 Batch 2 (dc-4 + d-5) emergence narrative

작성일: 2026-05-25
범위: 2 emergence × 9 trigger 후보의 narrative ScriptedText KO 시안 (21 entry)

---

## §0. 권위 메모리 (정독 필수)

`reference/` 12종 메모리 — Batch 1과 동일. 본 batch 핵심 정책 메모리:

| 메모리 | 본 batch 적용 영역 |
|---|---|
| `feedback_new_dispute_evidence_narrative_justification` | multi-trigger + First-Fired-Wins |
| `design_narrative_cascade_from_card` | cascade priorCard 다중 (d-5 cascade priorCard:dc-4 / priorCard:e-7 — 두 cascade candidate) |
| `design_family01_truth_disclosure_policy` | **그룹 1/4 진실 수용 영역 + 그룹 5 surface 시작 — 본 batch 핵심** |
| `feedback_judge_dispassionate_action_focused` | 재판관 어법 |

---

## §1. 사건 context

family-01 사건 Line C **중심 영역**. Batch 1에서 d-4 (가족 영역 surface 시작) + e-7 (자료 등재) 완료. 본 batch:

- **dc-4 "감춘 이유"**: 침묵 동기 = 보호 명분 정리 (그룹 4 영역 surface — 친자 양보 + 형 자존심 보호)
- **d-5 "어머니의 숨겨진 마음"**: 양측 책임축 진입 (A 장남 당연시 frame 첫 흔들림 + B 보호 명분 첫 명시)

### dc-4 "감춘 이유" — dossier card (단서)

- **clue label (player visible)**: "감춘 이유"
- **mechanical 조건**: d-4 S2.successUnlocks (자동) / combine-4 (e-6+e-7) / combine-7 (e-5+e-7) — case.ts l. 2485
- **noteText**: "어머니 일기장의 출생 비밀 + 두 아들 동등 기록 + 윤정후의 사전 인지 + 친자 양보 영역. 침묵의 동기가 형의 정체성 보호로 정리된다."
- **본 batch 정의**: dc-4 단서의 *무게* = "20년 침묵의 진짜 이유" — 본인이 친자임을 알고도 가업 공장을 양보 + 형의 정체성 영역 보호. 본 batch entry text 영역에서 **친자 양보 / 형 정체성 보호 surface OK** (그룹 4 영역).
- **단서 등록 narrative entry text reference**: "단서 [감춘 이유]"

### d-5 "어머니의 숨겨진 마음" — dispute (양측 책임축)

- **dispute name (player visible)**: "어머니의 숨겨진 마음"
- **quadrant**: `both_know` — 양측 모두 영역 알고 있는 책임 구조
- **mechanical unlock 조건**: d-3 S3 + d-4 S3 (case.ts l. 1577~1580)
- **truth 영역**: 윤태성 유산 당연시 + 윤정후 보호 명분 → 어머니 자필 90:10을 공증 60:40으로 줄임. 양측 모두 어머니 뜻을 있는 그대로 두지 못함.
- **A surface frame** (S0~S1): "내가 평생 모셨으니 당연" → "어머니가 동생을 더 마음에 두셨을 수도" (자기 frame 균열 hook)
- **B surface frame** (S0~S1): "어머니 뜻을 그대로 정리한 것뿐이다" → "어머니가 남긴 비중과 공증본이 같지는 않았다" (회피)
- **본 batch trigger 발동 시점**: d-5 S0~S2 surface 영역 (책임축 영역 진입). **S3 영역 surface는 본 batch entry text 영역 OK** (보호 명분 직접 명시 — 그룹 5 surface 시작)
- **정확 수치 (그룹 3) — 본 batch 절대 X** (S5 봉인 영역)

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

---

### Emergence 3: **dc-4** "감춘 이유" — 4 trigger

**구조 핵심**: d-4 영역 진입 후 침묵 동기 = 보호 명분 정리. 본 batch entry text 영역에서 **친자 양보 / 형 정체성 보호 surface OK** (그룹 4 영역).

**미스터리 dynamics 정책**:
- B "보호 명분 + 친자 양보" 직접 첫 명시 (본 cycle 가장 깊은 영역 진입 — 회피 frame 깨짐)
- A "동생이 그걸 알고 평생 양보" 첫 인지 → 충격에서 책임 인식으로 전환 hook
- 재판관 "침묵의 동기가 보호 명분으로 정리됩니다. 책임 구조 영역은 별도로 둡니다."

---

#### Trigger 1 — `cascade_from_card` (priorCard:d-4) ← **메인**

**선결조건:**
- d-4 fired + d-4 S2 도달 (case.ts d-4 S2.successUnlocks=['dc-4'] 자동)

**Narrative scenario:**
- 컨텍스트: d-4 가족 영역 진입 후 자연 후속 = 침묵 동기 정리. 자료(일기장) reference + 침묵 동기 명시 → 단서 [감춘 이유] 등록
- 발동 흐름 (~7초): 재판관 자발 d-4 reference → 침묵 동기 정리 → 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-cascade-judge-decree-v1` | 판사 | 전체 | d-4 reference + 침묵 동기 정리 + 단서 등록 + 책임 구조 영역 분리 | 3~4 문장 | 격식·결정 |
| `emerge-dc4-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 (수용 / 무게 표현) | 1~2 문장 | 무거운 평정 |

**가이드:**
- 판사 decree (3~4 문장):
  1. "앞서 별도 쟁점으로 둔 가족 기록 영역에서, 윤정후 측의 오랜 침묵 동기가 정리됩니다."
  2. "어머니의 오래된 노트 사본과 윤정후 측 발화를 종합하면, 윤정후가 본인이 친자임을 알고도 형의 자리를 흔들지 않으려 한 결정이 정황상 드러납니다." ← **그룹 1/4 직접 surface (출생 비밀 + 친자 양보 + 형 자리 보호)**
  3. "종합 단서 [감춘 이유]를 본 법정에 등록합니다."
  4. "본 영역의 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시
- B respond (1~2 문장):
  1. "예… 받아들이겠습니다." 또는
  2. "어머니 결정에 따른 일입니다." ← **여전히 어머니 주체화 — 본인 결정 단정은 d-5 영역**

---

#### Trigger 2 — `combination_result` (recipeId: `combine-4` = e-6+e-7 OR `combine-7` = e-5+e-7)

**선결조건:**
- player 조합 실행 (다중 recipe 가능 — combine-4 우선, combine-7 차선)
- requiredEvidenceStages 정합 (case.ts gate)
- d-4 lieState ≥ S3

**Narrative scenario:**
- 컨텍스트: player가 송금 자료 + 일기장 OR 자필 자료 + 일기장 combo → 침묵 동기 자료 결합
- 발동 흐름 (~7초): 재판관 자발 결과 + 침묵 동기 정리 → 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-combo-judge-decree-v1` | 판사 | 전체 | combo 결과 + 침묵 동기 정리 + 단서 등록 | 3 문장 | 격식·분석 |
| `emerge-dc4-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree:
  1. "오래된 송금 내역 묶음과 오래된 노트 사본을 함께 보면, 윤정후 측 결정의 동기가 한 영역으로 모입니다."
  2. "윤정후가 본인이 친자임을 알고도 형의 자리를 흔들지 않으려 한 결정으로 정리됩니다. 종합 단서 [감춘 이유]를 본 법정에 등록합니다."
  3. "본 영역의 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시
- B respond: "어머니 글에 적혀 있는 일입니다." ← 회피 frame 약하게 유지

---

#### Trigger 3 — `emotional_outburst` (b 측 — 침묵 동기 첫 직접 표현)

**선결조건:**
- d-4 lieState ≥ S2
- B partyPhase: ['shaken']

**Narrative scenario:**
- 컨텍스트: B가 어머니 영역에서 *침묵 동기 첫 직접 표현*. **"형이 흔들리지 않게 하기 위함"** 직접 단정.
- 발동 흐름 (~9초): B 무거운 첫 진술 → 재판관 catch + 단서 등록

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-b-outburst-v1` | B | 판사 | 침묵 동기 첫 직접 표현 (형의 자리 보호) | 2~3 문장 | 무거운 침묵 → 단정 |
| `emerge-dc4-via-b-outburst-judge-react-v1` | 판사 | B | reactive (발화 영역 정합 명시) | 1 문장 | 격식·결정 |
| `emerge-dc4-via-b-outburst-judge-decree-v1` | 판사 | 전체 | 단서 등록 + 책임 구조 영역 분리 | 2 문장 | 격식·확정 |

**가이드:**
- B outburst (2~3 문장):
  1. (오랜 침묵 후) "형이 흔들리지 않게 하려 했습니다."
  2. (시선을 들지 않고) "본인이 친자라는 사실을 알고 있었습니다. 그래서 가업의 자리를 형에게 두는 결정을 했습니다." ← **그룹 1/4 직접 surface — B 본인 결정 첫 단정**
  - behaviorHint: "윤정후가 깊은 침묵 후 시선을 자료 위에 두고 두 문장을 무겁게 잇는다. 두 번째 문장에서 처음으로 본인 주체화 ('본인이') 문법이 등장한다."
  - **금지 영역**: 정확 수치 (90:10) X / 친부 실명 X / "보호 명분"이라는 용어 자체는 사용 X (그것은 재판관 정리 어휘 — B는 행위 단정형으로 표현)
- 판사 react (1 문장): "윤정후 측 발화와 어머니의 오래된 노트 사본 영역이 한 영역으로 정합합니다."
- 판사 decree (2 문장):
  1. "윤정후 측 침묵 동기를 보호의 결정으로 정리하고, 종합 단서 [감춘 이유]를 본 법정에 등록합니다."
  2. "본 영역의 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시

---

#### Trigger 4 — `judge_auto_mention` (fallback)

**조건:**
- T1~T3 미발동 + d-4 S2 + turnsAfterEligible: 6

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 단서 등록 | 3 문장 | 격식·결정 |
| `emerge-dc4-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 auto (3 문장):
  1. "가족 기록 영역의 자료와 윤정후 측 발화가 모인 시점입니다."
  2. "윤정후가 본인이 친자임을 알고도 형의 자리를 흔들지 않으려 한 결정으로 침묵 동기가 정리됩니다. 종합 단서 [감춘 이유]를 본 법정에 등록합니다."
  3. "본 영역의 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 3 total: 2 + 2 + 3 + 2 = 9 entry**

---

### Emergence 4: **d-5** "어머니의 숨겨진 마음" — 5 trigger

**구조 핵심**: dc-4 침묵 동기 정리 후 양측 책임축 진입. 본 batch entry text 영역에서 **A 자기 frame 첫 흔들림 + B 보호 명분 첫 명시** (그룹 5 surface 시작).

**미스터리 dynamics 정책**:
- B 보호 명분 + 자기 비중 다듬음 첫 명시 (회피 frame 완전 깨짐)
- A 장남 당연시 frame 첫 흔들림 — "동생이 다른 비중으로 다듬은 영역" 의문
- 재판관 "양측 책임축으로 진입. 정확 비율 영역은 별도로 둡니다." (정확 수치 봉인 명시)

---

#### Trigger 1 — `cascade_from_card` (priorCard:dc-4) ← **메인**

**선결조건:**
- dc-4 fired + d-4 lieState ≥ S3

**Narrative scenario:**
- 컨텍스트: dc-4 침묵 동기 정리 후 자연 후속 = 양측 책임축 진입. "어머니가 남긴 비중과 공증본이 같지 않은 영역"으로 별도 쟁점 분리
- 발동 흐름 (~7초): 재판관 자발 dc-4 reference → 양측 책임축 영역 분리

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d5-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-4 reference + 양측 책임축 영역 분리 + 정확 수치 봉인 명시 | 3~4 문장 | 격식·결정 |
| `emerge-d5-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 (수용) | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree (3~4 문장):
  1. "앞서 등록된 단서 [감춘 이유] 다음 영역으로, 어머니가 남긴 비중과 공증본 사이의 차이가 남아 있습니다."
  2. "두 형제가 각자 어떤 방식으로 어머니 뜻을 받아 정리했는지, 책임 구조 영역으로 별도 쟁점을 분리합니다."
  3. "어머니의 숨겨진 마음을 별도 쟁점으로 둡니다."
  4. "정확한 비율 영역은 단계별로만 공개합니다." ← **정확 수치 봉인 명시 (그룹 3)**
- B respond: "예, 받아들이겠습니다."

---

#### Trigger 2 — `cascade_from_card` (priorCard:e-7) ← 차선 cascade

**선결조건:**
- e-7 fired + e-7 stage ≥ Context + d-4 lieState ≥ S3

**Narrative scenario:**
- 컨텍스트: e-7 일기장 자료가 Context까지 진전 후 양측 책임 영역 자연 진입 (cascade source 다양화)
- 발동 흐름 (~6초): 재판관 자발 e-7 reference → 양측 책임축 영역 분리

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d5-via-cascade-e7-judge-decree-v1` | 판사 | 전체 | e-7 reference + 양측 책임축 영역 분리 | 3 문장 | 격식·결정 |
| `emerge-d5-via-cascade-e7-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree:
  1. "어머니의 오래된 노트 사본이 본 법정에서 충분히 정리된 시점입니다."
  2. "그 영역에 적힌 어머니의 마음과 공증본 비중의 차이가 양측 책임 영역으로 이어집니다. 어머니의 숨겨진 마음을 별도 쟁점으로 분리합니다."
  3. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

#### Trigger 3 — `npc_interjection` (a 측 — A 자기 frame 첫 흔들림)

**선결조건:**
- d-4 lieState ≥ S3
- A partyPhase: ['defensive', 'shaken'] OR partyDistrust: { a: { min: 30 } }

**Narrative scenario:**
- 컨텍스트: A가 일기장 영역 정리 후 "어머니가 동생을 더 마음에 두셨을 수도" 첫 인정 → 자필 영역 의문 발화. **A 자기 frame 첫 흔들림** (Cycle 6의 의심 frame 넘어 — 책임 인식 hook).
- 발동 흐름 (~9초): A 자발 → 재판관 catch + 책임축 분리

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d5-via-a-interject-v1` | A | 판사 | A 자기 frame 첫 흔들림 + 자필 영역 의문 | 2~3 문장 | 흔들림 → 의문 |
| `emerge-d5-via-a-interject-judge-react-v1` | 판사 | A | reactive (A 의문 영역 인정) | 1 문장 | 격식·결정 |
| `emerge-d5-via-a-interject-judge-decree-v1` | 판사 | 전체 | 책임축 분리 + 봉인 명시 | 2 문장 | 격식·확정 |

**가이드:**
- A interject (2~3 문장):
  1. (한참 침묵 후) "…어머니가 동생을 더 보셨을 수도 있다는 말, 처음 들었어."
  2. (시선을 자료로 옮기며) "그러면 어머니가 직접 남기신 비중도 동생 쪽이 더 컸을 수 있다는 거잖아."
  3. (재판관을 향해) "재판관님, 어머니가 남기신 그 비중을 확인해야 합니다."
  - behaviorHint: "윤태성이 처음으로 어조에서 자부심이 빠진다. 두 번째 문장에서 말이 조심스러워지고, 세 번째 문장에서 처음으로 재판관에게 격식 요청을 한다."
  - **금지 영역**: 정확 수치 (90:10) 직접 단어 X / "위조" / "조작" 단정 X (A는 의문 단계)
- 판사 react (1 문장): "윤태성 씨가 제기한 어머니 측 비중 영역을 본 영역의 쟁점으로 둡니다."
- 판사 decree (2 문장):
  1. "어머니의 숨겨진 마음을 별도 쟁점으로 분리합니다."
  2. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시

---

#### Trigger 4 — `emotional_outburst` (b 측 — 보호 명분 + 자기 비중 다듬음 첫 명시)

**선결조건:**
- d-4 lieState ≥ S3
- B partyPhase: ['defensive', 'shaken']

**Narrative scenario:**
- 컨텍스트: B가 dc-4 영역 정리 후 *보호 명분 첫 직접 명시* — "어머니 뜻을 본인이 다듬었다" 직접 단정. **회피 frame 완전 깨짐**.
- 발동 흐름 (~9초): B 무거운 첫 단정 → 재판관 catch + 책임축 분리

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d5-via-b-outburst-v1` | B | 판사 | 보호 명분 + 자기 비중 다듬음 첫 명시 | 2~3 문장 | 무거운 단정 |
| `emerge-d5-via-b-outburst-judge-react-v1` | 판사 | B | reactive (양측 책임축 영역 인정) | 1 문장 | 격식·결정 |
| `emerge-d5-via-b-outburst-judge-decree-v1` | 판사 | 전체 | 책임축 분리 + 봉인 명시 | 2 문장 | 격식·확정 |

**가이드:**
- B outburst (2~3 문장):
  1. (한참 침묵 후) "어머니가 남기신 비중을 본인이 다른 방향으로 다듬었습니다."
  2. (시선을 들지 않고) "형을 흔들지 않으려 한 본인의 선택이었습니다."
  3. (목소리가 무겁게 내려가며) "어머니 뜻을 있는 그대로 두지 못한 책임은 본인에게 있습니다." ← **그룹 5 직접 surface (보호 명분 영역)**
  - behaviorHint: "윤정후가 깊은 침묵 후 처음으로 본인 주체화 ('본인이') 문법을 연속으로 사용한다. 세 번째 문장에서 처음으로 책임 단어를 직접 발화한다."
  - **금지 영역**: 정확 수치 (90:10 / 60:40) X / "축소" 수치 표현 X (단 "다른 방향으로 다듬었다" 같은 모호 표현 OK)
- 판사 react (1 문장): "윤정후 측 발화로 본 영역의 양측 책임축이 한 자리에 정렬됩니다."
- 판사 decree (2 문장):
  1. "어머니의 숨겨진 마음을 별도 쟁점으로 분리합니다."
  2. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시

---

#### Trigger 5 — `judge_auto_mention` (fallback)

**조건:**
- T1~T4 미발동 + d-4 S3 + turnsAfterEligible: 8

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d5-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 책임축 영역 진입 | 3 문장 | 격식·결정 |
| `emerge-d5-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 auto (3 문장):
  1. "단서 [감춘 이유] 다음 영역으로, 어머니가 남긴 비중과 공증본 사이의 차이가 정리되지 않았습니다."
  2. "두 형제가 각자 어떤 방식으로 어머니 뜻을 받아 정리했는지, 책임 구조 영역으로 별도 쟁점을 분리합니다. 어머니의 숨겨진 마음을 별도 쟁점으로 둡니다."
  3. "정확한 비율 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 4 total: 2 + 2 + 3 + 3 + 2 = 12 entry**

---

**Batch 2 grand total: 9 + 12 = 21 entry**

---

## §3. 미스터리 dynamics 정책 (본 batch 핵심)

### Dynamics 1 — B "보호 명분 + 자기 결정" 첫 명시 (회피 frame 완전 깨짐)

- B 발화 = **본 batch에서 처음으로 "본인" 주체화 문법 사용**. 회피 frame ("어머니 뜻") → 결정 frame ("본인이 다듬음", "본인 선택").
- 단, 정확 수치 절대 X / 친부 실명 절대 X
- 본 batch B 발화 어휘 사전:
  - ✓ "본인이 친자라는 사실을 알고 있었습니다" (dc-4 outburst — 그룹 1/4 진입)
  - ✓ "가업의 자리를 형에게 두는 결정을 했습니다" (dc-4 outburst — 그룹 4 surface)
  - ✓ "어머니가 남기신 비중을 본인이 다른 방향으로 다듬었습니다" (d-5 outburst — 그룹 5 surface 시작)
  - ✓ "형을 흔들지 않으려 한 본인의 선택이었습니다" (d-5 outburst — 보호 명분)
  - ✓ "어머니 뜻을 있는 그대로 두지 못한 책임은 본인에게 있습니다" (d-5 outburst — 책임 인식)
  - ✗ "자필 90:10" / "공증 60:40" (정확 수치 — d-5 S5 영역만)
  - ✗ "친부 실명" (영구 봉인)

### Dynamics 2 — A "장남 당연시 frame 첫 흔들림" (책임 인식 hook)

- A 발화 = Cycle 6의 *의심 frame* → 본 batch *자기 frame 균열*. "동생을 더 보셨을 수도" / "어머니 비중도 동생 쪽이 더 컸을 수 있다"
- A 자기 frame 균열 어휘 사전:
  - ✓ "어머니가 동생을 더 보셨을 수도 있다는 말, 처음 들었어"
  - ✓ "어머니가 직접 남기신 비중도 동생 쪽이 더 컸을 수 있다는 거잖아"
  - ✓ "재판관님, 어머니가 남기신 그 비중을 확인해야 합니다" ← A가 격식 요청 첫 발화
  - ✗ "정후가 거짓말한다" (Cycle 6 단계 — 본 batch는 의문 단계)
  - ✗ "이건 위조다" (자료 부정 — 본 batch는 의문 단계)
  - ✗ 정확 수치 X

### Dynamics 3 — 재판관 "책임축 영역 분리 + 정확 비율 봉인 명시"

- 모든 재판관 decree entry 마지막 문장에 "정확한 비율 영역은 단계별로만 공개합니다" 또는 동등 표현
- 표현 사전:
  - ✓ "정확한 비율 영역은 단계별로만 공개합니다"
  - ✓ "구체 수치는 단계별로 정리합니다"
  - ✓ "본 영역의 책임 구조 영역은 별도로 둡니다" (dc-4 decree)
  - ✗ "90:10은 봉인합니다" (시스템 정책 직접 X)
  - ✗ "S5 영역까지" (시스템 용어 X)

---

## §4~6. 시스템 용어 금지 / 호칭 / 진실 노출 경계

Batch 1 §4~6과 동일. 본 batch 변경 영역:

- **그룹 1** (출생 비밀): dc-4 영역에서 surface OK ("본인이 친자임을 알고 있었습니다") — 단 친부 실명 영구 X
- **그룹 4** (공장 양보): dc-4 영역에서 surface OK ("가업의 자리를 형에게 두는 결정")
- **그룹 5** (보호 명분): d-5 영역에서 surface OK ("어머니 뜻을 다듬음" / "형을 흔들지 않으려 한 본인의 선택")
- **그룹 3** (정확 수치): 본 batch 모든 entry 절대 X

### entry text의 surfaceName 사용

- `e-7` lockedName "어머니 일기장" → entry text "오래된 노트 사본"
- `e-6` lockedName "오래된 계좌 흐름" → entry text "오래된 송금 내역 묶음"
- `dc-3` (= label "20년의 돈") / `dc-4` (= label "감춘 이유")

---

## §7. 작성 산출 형식

JSON 배열 형식 + tag spec — Batch 1 §7과 동일. 본 batch 변경:

**emergence/target tag**:
- Emergence 3: `emergence:dc-4` / `targetClue:dc-4` / `clueLabel:감춘_이유`
- Emergence 4: `emergence:d-5` / `targetDispute:d-5`
- Emergence 4 trigger 2 (cascade priorCard:e-7) tag: `priorCard:e-7`

**entry ID 명명**:
- Emergence 3: `emerge-dc4-via-<trigger>-<role>-<verb>-v1`
- Emergence 4: `emerge-d5-via-<trigger>-<role>-<verb>-v1` (trigger 2는 `emerge-d5-via-cascade-e7-<role>-<verb>-v1`로 priorCard 구분)

---

## §8. 톤 권위

Batch 1 §8과 동일. 본 batch 핵심 — `sample/output-cycle6-family01-line-b.json` 정독 (emergence_narrative channel 직접 reference).

---

## §9. 자가 검증 (GPT Pro 출력 전 self-check)

- [ ] 모든 entry text에 lockedName ("어머니 일기장" / "오래된 계좌 흐름") 등장 X
- [ ] 모든 entry text에 시스템 용어 (S0~S5 / trigger / unlock 등) 등장 X
- [ ] 모든 entry text에 **그룹 3 정확 수치 (90:10 / 60:40)** 등장 X
- [ ] 모든 entry text에 친부 실명 영역 등장 X (영구 봉인)
- [ ] B 발화 — dc-4/d-5 영역에서 "본인" 주체화 문법 사용 (그룹 1/4/5 surface OK 단 정확 수치 X)
- [ ] A 발화 — 자기 frame 균열 + 의문 단계 (위조 단정 X, 정확 수치 X)
- [ ] 판사 decree 모두 "책임 구조 영역은 별도로 둡니다" 또는 "정확한 비율 영역은 단계별로만 공개합니다" 명시
- [ ] A 격식 요청 ("재판관님, ... 확인해야 합니다") d-5 interject 자연
- [ ] entry text에 "단서 [감춘 이유]" 표현 정확
- [ ] tag 영역 §7 명세 외 추가 tag 등장 X

---

## §10. 응답 파일

`output-cycle7-batch2-dc4-d5.json` — JSON 배열 (21 entry). 본 batch 폴더 `result/` 저장.

---

## §11. 본 batch 사후 처리 안내

1. `src/data/scriptedText/family-01.json` `emergence_narrative` channel 21 entry append
2. `src/data/coreCases/family-01.narrative.ts`에 신규 export:
   - `dc4NarrativeTriggers` (Batch 2 Emergence 3) — 4 trigger candidate
   - `d5NarrativeTriggers` (Batch 2 Emergence 4) — 5 trigger candidate
3. `src/data/coreCases/family-01.case.ts`의 dc-4 / d-5 정의에 `narrativeTriggers` field 부착
4. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` PASS

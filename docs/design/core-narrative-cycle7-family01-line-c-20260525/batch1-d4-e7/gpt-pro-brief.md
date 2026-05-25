# GPT Pro 의뢰서 — family-01 Cycle 7 Batch 1 (d-4 + e-7) emergence narrative

작성일: 2026-05-25
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence × 9 trigger 후보의 narrative ScriptedText KO 시안 (22 entry)

---

## §0. 권위 메모리 (정독 필수)

본 폴더 `reference/`에 12종 권위 메모리 복사돼 있음. 정독 후 작성. 본 batch 핵심 정책:

| 메모리 | 본 batch 적용 영역 |
|---|---|
| `design_core_narrative_cycle_procedure` | 8단계 절차 (본 의뢰서 = 4단계) |
| `feedback_new_dispute_evidence_narrative_justification` | multi-trigger + First-Fired-Wins 권위 |
| `design_narrative_cascade_from_card` | cascade priorCard 일반화 (dispute → evidence cascade — d-4 → e-7 본 batch 신규 사용) |
| `design_family01_truth_disclosure_policy` | **그룹 1 (출생 비밀) surface 시작 영역 — 본 batch 핵심 정책** |
| `design_truth_leak_keyword_nature` | hidden keyword 본성 (그룹 5는 false positive) |
| `feedback_dossier_card_renamed_to_clue` | '단서' 명칭 일관 사용 |
| `feedback_judge_dispassionate_action_focused` | **재판관 어법 사실/행위 중심** |
| `feedback_judge_question_quality` | 재판관 발화 quality |
| `feedback_family_address_speaker_perspective` | 본인 가족 호칭 자기 시점 |
| `feedback_natural_korean_npc_active_voice` | NPC 적극 발화 5 차원 |
| `feedback_self_reference_speaker_context` | 자기지시 발화 주체별 |
| `feedback_avoid_code_abbreviations_with_user` | 코드 약어 |

---

## §1. 사건 context

**family-01** = 윤태성(A, 48세, 형, 주방가구 공장 대표) vs 윤정후(B, 44세, 동생, 자동차부품 가게) 형제 유산 다툼.

### Line A 결과 (Cycle 5 완료) + Line B 결과 (Cycle 6 완료) — 본 cycle 진입 시점

- **Line A** (절차/판단): d-1 (말년의 종이) / d-2 (공증 절차 개입) / dc-1 (말년의 종이) / dc-2 (수정된 유언장) / e-3 (전 요양보호사 음성증언) / w-1 (최복순) / w-2 (김영수) 완료
- **Line B** (20년 돈): d-3 (오래된 지원의 출처) / dc-3 (20년의 돈) 통합 event / w-3 (박순애) 완료

### Line C (본 cycle) — "어머니 일기장의 가족 영역 + 양측 책임축"

- d-4 (가족 기록과 침묵의 이유) — **본 batch 1번째 emergence**
- e-7 (어머니 일기장 자료) — **본 batch 2번째 emergence**
- (이후 batch 2/3 진행)

### d-4 "가족 기록과 침묵의 이유" — dispute

- **dispute name (player visible)**: "가족 기록과 침묵의 이유"
- **mechanical unlock 조건**: d-3 S3 도달 + e-7 required (case.ts l. 1273)
- **truth 영역 (Cycle 7 진입 영역)**:
  - 윤태성이 아버지의 친자가 아니라는 사실 (출생 비밀)
  - 어머니의 글에 두 아들 모두 똑같은 자식이라는 기록
  - 윤정후가 그 사실을 사전 인지
  - 친자인 윤정후가 가업 공장을 형에게 양보
- **A surface frame** (S0~S1): 가족 사정 자체 부정 → 어머니의 평등 마음만 인지 (출생 비밀 영역 진입 X)
- **B surface frame** (S0~S1): 가족 일이라는 모호 표현만 / "그 한 줄 때문에 말하지 못함"
- **본 batch trigger 발동 시점**: d-4 S0~S1 (방금 unlock) — **본 batch entry는 d-4 S1~S2 surface 영역**
  - 출생 비밀 surface 시작은 d-4 S3 영역 — 본 batch entry text 영역에서 S3까지 가지 *않음* (단, 가족 영역 hook은 명시 OK)

### e-7 "오래된 노트 사본" (lockedName=어머니 일기장) — evidence

- **lockedName (case.ts)**: "어머니 일기장"
- **surfaceName (player visible)**: **"오래된 노트 사본"** ← entry text는 이것 사용
- **mechanical 조건**: requiredLieState='S2' (d-3 S2 도달 후) + proves=['d-4', 'd-5']
- **depthStages**: stub → excerpt → original → context → established
- **sensitiveSealTargets**:
  - **친부 실명 — 영구 봉인 (본 batch entry text 절대 X)**
  - 구체적 출생 경위 — d-4 S4 이후 조건부 노출 (본 batch 영역 X)
- **본 batch 호출 시점**: d-4 unlock 후 자료 영역 cascade — 자료 surface 자체는 OK 단 *내용*은 모호 표현 ("오래된 노트 사본", "어머니의 글", "두 아들에 대한 짤막한 글")
- **본 batch 진실 영역**: 일기장 surface (자료 등재) + d-4 영역 자료 hook. **친부 실명 / 정확한 출생 경위 절대 X**.

### 본 batch 진입 시점 dossier/evidence 상태 (참고)

| ID | name | surfaceName | 본 batch 활용 |
|---|---|---|---|
| dc-3 | 20년의 돈 | (= label) | **Cycle 6 마지막 단서** — d-4 cascade priorCard:dc-3, entry text reference "단서 [20년의 돈]" |
| e-6 | 오래된 계좌 흐름 | **오래된 송금 내역 묶음** | combination_result T2 (combine-4 = e-6+e-7) — entry text surfaceName 사용 |
| e-7 | 어머니 일기장 | **오래된 노트 사본** | 본 batch 등재 — entry text surfaceName 사용 |

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

---

### Emergence 1: **d-4** "가족 기록과 침묵의 이유" — 5 trigger

**구조 핵심**: Cycle 6 마지막 단서 [20년의 돈] 등록 후, "그 흐름 *동기*" 영역 자연 후속 → 가족 영역 진입. 본 batch entry text 영역에서 d-4 S1~S2 surface 영역 (출생 비밀 직접 단어 X, 단 hook OK).

**미스터리 dynamics 정책 (모든 trigger 적용)**:
- B "어머니 뜻 + 가족 영역 한 줄" frame (회피 동기 + 가족 영역 hook)
- A "어머니의 평등 마음" frame (S1 영역 — 출생 비밀 자체 인지 X, 단 의문 충격 진입)
- 재판관 "가족 영역 vs 책임 구조 영역 분리" 명시 (Cycle 6 "동기 별도 영역" 형식 계승)

---

#### Trigger 1 — `cascade_from_card` (priorCard:dc-3) ← **메인 trigger**

**선결조건:**
- `dc-3` (Cycle 6 마지막 단서) fired 상태 (priorCard:dc-3)
- d-3 lieState ≥ S3 (Cycle 6 결과 — 자금 흐름 진실 어느 정도 정리 단계)

**Narrative scenario:**
- 컨텍스트: Cycle 6 마지막 단서 [20년의 돈] 등록 후, "그 흐름 동기는 별도 영역" 명시 (Cycle 6 재판관 발화) → 자연 후속 = "그 동기가 가족 기록 쪽으로 이어집니다" → 별도 쟁점 분리
- 발동 흐름 (~7초): 재판관 자발 dc-3 reference → 가족 기록 영역 명시 → 별도 쟁점 분리 + 자료 영역 (e-7) 등재 예고

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d4-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-3 reference + 가족 영역 분리 + 자료 영역 예고 | 3~4 문장 | 격식·결정 |
| `emerge-d4-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 (회피 frame) | 1~2 문장 | 무거운 평정 |

**가이드:**
- 판사 decree (3~4 문장):
  1. "앞서 등록된 단서 [20년의 돈] 흐름의 동기를 가족 기록 영역에서 별도로 검토합니다."
  2. "어머니가 두 아들에 대해 남긴 글이 본 영역의 자료가 됩니다."
  3. "가족 기록과 침묵의 이유를 별도 쟁점으로 분리합니다."
  4. "본 가족 영역과 책임 구조 영역은 별도로 둡니다." ← **미스터리 명시 핵심 (재판관 dynamics 3축)**
- B respond (1~2 문장):
  1. "예… 받아들이겠습니다." 또는
  2. "어머니께서 남기신 글이 있습니다." ← **회피 frame 보강 (어머니 주체화)**

---

#### Trigger 2 — `combination_result` (recipeId: `combine-4` — e-6 + e-7)

**선결조건:**
- player가 `combine-4` 조합 실행 (e-6 송금 자료 + e-7 일기장 자료)
- e-6 stage ≥ Context + e-7 stage ≥ Context (case.ts gate.requiredEvidenceStages)
- d-4 lieState ≥ S3 → **본 batch entry는 S1~S2 surface 영역만 유지** (S3 영역은 case.ts gate 만족 시점만)

**Narrative scenario:**
- 컨텍스트: player가 의도적으로 송금 자료 + 일기장 자료 combo → 자금 흐름과 가족 기록이 한 자리에서 검토 → 별도 쟁점 분리 + 자료 영역 명시
- 발동 흐름 (~7초): 재판관 자발 분석 결과 → 두 자료 영역 정리 → 가족 영역 별도 쟁점 분리

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d4-via-combo-judge-decree-v1` | 판사 | 전체 | combo 결과 + 가족 영역 분리 + 영역 분리 명시 | 3 문장 | 격식·분석 |
| `emerge-d4-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 (회피 frame) | 1 문장 | 평정·짧음 |

**가이드:**
- 판사 decree:
  1. "오래된 송금 내역 묶음과 오래된 노트 사본이 함께 검토됐습니다."
  2. "자금 흐름의 출처가 가족 기록의 한 영역과 정황상 맞닿습니다. 가족 기록과 침묵의 이유를 별도 쟁점으로 분리합니다."
  3. "본 가족 영역과 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시
- B respond: "어머니 글에 적혀 있는 일입니다." ← 회피 frame

---

#### Trigger 3 — `npc_interjection` (b 측 자발 흘림)

**선결조건:**
- d-3 lieState ≥ S3
- B partyPhase: ['defensive', 'resigned'] (평정 톤 — 격앙 X)

**Narrative scenario:**
- 컨텍스트: B가 어머니 영역 검토 중 "어머니가 남기신 글 한 줄" 자발 언급 (회피 frame이지만 영역 자체 surface) → 재판관 reactive
- 발동 흐름 (~7초): B 흘림 → 재판관 reactive → 가족 영역 분리 + 자료 영역 명시

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d4-via-b-interject-v1` | B | 판사 | 어머니 글 자발 언급 (회피 frame 보강) | 1~2 문장 | 무거운 평정 |
| `emerge-d4-via-b-interject-judge-react-v1` | 판사 | B | reactive | 1 문장 | 격식·결정 |
| `emerge-d4-via-b-interject-judge-decree-v1` | 판사 | 전체 | 분리 + 미스터리 명시 | 2 문장 | 격식·확정 |

**가이드:**
- B interject (1~2 문장):
  1. "어머니께서 그 시절 남기신 글 한 줄이 있습니다."
  2. "그 한 줄 때문에 제가 형에게 말하지 못한 부분이 있습니다." ← **어머니 주체화 + 본인 침묵 영역 hook**
  - behaviorHint: "윤정후가 자료에서 시선을 떼지 않은 채 두 문장을 짧게 잇는다. 말끝이 잠깐 끊긴다."
- 판사 react (1 문장): "윤정후 측이 언급한 어머니 측 기록을 본 영역의 자료로 정리합니다."
- 판사 decree (2 문장):
  1. "가족 기록과 침묵의 이유를 별도 쟁점으로 분리합니다."
  2. "본 가족 영역과 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시

---

#### Trigger 4 — `emotional_outburst` (a 측 — 어머니 평등 글 첫 보고 의문 충격)

**선결조건:**
- d-3 lieState ≥ S3
- A partyPhase: ['shaken'] (충격 단계만)

**Narrative scenario:**
- 컨텍스트: A가 자료 영역에서 어머니의 글 ("두 아들을 똑같이 보셨다") 한 조각 처음 보고 *의문 충격* 단계. **출생 비밀 자체 인지 X, 단 평등 글의 의미 의문**.
- 발동 흐름 (~9초): A 자료 보다 흔들림 → A 의문 발화 → 재판관 reactive catch → 분리

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d4-via-a-outburst-v1` | A | 판사 | 어머니 평등 글 한 조각 보고 의문 충격 | 2~3 문장 | 흔들림 → 의문 |
| `emerge-d4-via-a-outburst-judge-react-v1` | 판사 | A | reactive (A 의문 영역 인정) | 1 문장 | 격식·결정 |
| `emerge-d4-via-a-outburst-judge-decree-v1` | 판사 | 전체 | 분리 + 미스터리 명시 | 2 문장 | 격식·확정 |

**가이드:**
- A outburst (2~3 문장):
  1. (자료를 보며 멈춤) "잠깐. 어머니가 우리 둘을 *똑같이* 보셨다? 그게 무슨 말이야."
  2. (자료를 다시 본 뒤) "어머니가 평생 나를 장남으로 두고 키우셨는데, 똑같이 보셨다는 게 무슨 의미야?"
  - behaviorHint: "윤태성이 자료를 손으로 짚다 멈춘다. 첫 문장은 의문, 두 번째 문장은 가슴이 흔들리는 톤으로 작아진다."
  - **금지 영역**: "친자가 아니다" / "배다른" / 출생 비밀 직접 단어 절대 X (A는 본 시점 인지 X)
- 판사 react (1 문장): "윤태성 씨가 제기한 어머니 기록의 의미를 본 영역의 쟁점으로 둡니다."
- 판사 decree (2 문장):
  1. "가족 기록과 침묵의 이유를 별도 쟁점으로 분리합니다."
  2. "본 가족 영역과 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시

---

#### Trigger 5 — `judge_auto_mention` (fallback)

**조건:**
- T1~T4 모두 미발동 + d-3 S3 + turnsAfterEligible: 8

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d4-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 분리 + 미스터리 명시 | 3 문장 | 격식·결정 |
| `emerge-d4-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 auto (3 문장):
  1. "단서 [20년의 돈] 흐름의 동기가 본 법정에서 자료만으로는 정리되지 않습니다."
  2. "어머니가 두 아들에 대해 남기신 글이 본 영역의 자료가 됩니다. 가족 기록과 침묵의 이유를 별도 쟁점으로 분리합니다."
  3. "본 가족 영역과 책임 구조 영역은 별도로 둡니다." ← 미스터리 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 1 total: 2 + 2 + 3 + 3 + 2 = 12 entry**

---

### Emergence 2: **e-7** "오래된 노트 사본" (lockedName=어머니 일기장) — 4 trigger

**구조 핵심**: d-4 영역 진입 후 자료 (어머니 일기장) 등재 자연 cascade. surface는 자료 자체만 — *내용 (출생 비밀)*은 본 batch 영역 X (d-4 S3 영역만, 본 batch는 S1~S2 영역).

**dynamics 정책 (모든 trigger 적용)**:
- 자료 surface 자체는 격식
- "오래된 노트 사본" surfaceName 사용 (entry text — lockedName "어머니 일기장" 사용 가능 — case.ts surfaceName이 surface-safe 영역). 단 "친부 실명" / "구체 출생 경위" 절대 X
- B 측 제출 자료 — provenance 'self_possessed', subjectParty 'b'

**판사 발화 어휘 정책** (자료 surface 시):
- ✓ "오래된 노트 사본" / "어머니가 남기신 글" / "어머니의 자필 공책"
- ✓ "두 아들에 대한 짤막한 글" (한정 표현)
- ✗ "친부" / "친자" / "출생" / "정체성" (본 batch 직접 X)

---

#### Trigger 1 — `cascade_from_card` (priorCard:d-4) ← **메인**

**선결조건:**
- d-4 fired 상태 (priorCard:d-4)
- d-4 lieState ≥ S2 (case.ts requiredLieState='S2')

**Narrative scenario:**
- 컨텍스트: d-4 가족 영역 진입 후 "그 영역의 자료" 등재 자연 — 어머니 유품 일기장 첫 surface
- 발동 흐름 (~6초): 재판관 자발 cascade mention + 자료 등재 선언

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-cascade-judge-decree-v1` | 판사 | 전체 | d-4 reference + 자료 등재 + 가족 영역 보존 명시 | 2~3 문장 | 격식·결정 |
| `emerge-e7-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 (자료 제출 확인) | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 decree (2~3 문장):
  1. "앞서 별도 쟁점으로 둔 가족 기록 영역의 자료를 본 법정에 정리합니다."
  2. "윤정후 측이 보관해 온 어머니의 오래된 노트 사본을 자료로 받아들입니다." ← **호출 동사 다양화 (feedback_judge_dispassionate_action_focused)**
  3. "자료의 민감 영역은 단계별로만 본 법정에 공개합니다." ← **봉인 영역 명시 (친부 실명 영구 봉인 정책)**
- B respond (1 문장): "예… 어머니께서 남기신 공책입니다." ← 회피 frame 유지

---

#### Trigger 2 — `npc_interjection` (b 측 — 자료 자발 surface)

**선결조건:**
- d-4 lieState ≥ S2
- B partyPhase: ['defensive', 'resigned']

**Narrative scenario:**
- 컨텍스트: B가 가족 영역 검토 중 어머니 유품 자발 언급 → 자료 surface
- 발동 흐름 (~7초): B 자발 → 재판관 reactive → 자료 등재

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-b-interject-v1` | B | 판사 | 어머니 유품 자료 자발 언급 (회피 frame) | 1~2 문장 | 무거운 평정 |
| `emerge-e7-via-b-interject-judge-react-v1` | 판사 | B | reactive | 1 문장 | 격식·결정 |
| `emerge-e7-via-b-interject-judge-decree-v1` | 판사 | 전체 | 자료 등재 + 봉인 명시 | 1~2 문장 | 격식·확정 |

**가이드:**
- B interject (1~2 문장):
  1. "어머니께서 평생 곁에 두고 쓰신 공책이 한 권 있습니다."
  2. "그 공책에 가족 일이 적혀 있는 줄을 본 사람은 본인뿐입니다." ← **B 단독 인지 영역 hook + 회피 frame**
  - behaviorHint: "윤정후가 시선을 자료 끝에 둔 채 두 문장을 짧게 잇는다. 두 번째 문장에서 호흡이 잠깐 멈춘다."
- 판사 react (1 문장): "그 공책 자료를 본 법정에 직접 받아 정리하겠습니다."
- 판사 decree (1~2 문장):
  1. "윤정후 측이 보관해 온 어머니의 오래된 노트 사본을 자료로 받아들입니다."
  2. "민감 영역은 단계별로만 공개합니다." ← 봉인 명시

---

#### Trigger 3 — `emotional_outburst` (b 측 — 어머니 일기 영역 무거운 첫 진술)

**선결조건:**
- d-4 lieState ≥ S2
- B partyPhase: ['shaken']

**Narrative scenario:**
- 컨텍스트: B가 어머니 영역에서 *침묵 영역 깊은 곳 첫 표현*. 동기는 표현 X, 자료 영역만 surface ("어머니가 그걸 가장 걱정하셨다" 정도).
- 발동 흐름 (~9초): B 무거운 첫 진술 → 재판관 catch → 자료 등재

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-b-outburst-v1` | B | 판사 | 침묵 영역 깊은 곳 첫 표현 (자료 영역 hook) | 2 문장 | 무거운 침묵 → 짧은 단정 |
| `emerge-e7-via-b-outburst-judge-react-v1` | 판사 | B | reactive (자료 영역과 발화 정합 명시) | 1 문장 | 격식·결정 |
| `emerge-e7-via-b-outburst-judge-decree-v1` | 판사 | 전체 | 자료 등재 + 봉인 명시 | 1~2 문장 | 격식·확정 |

**가이드:**
- B outburst (2 문장):
  1. (오래된 침묵 후) "어머니께서 그 공책을 *가장* 걱정하셨습니다."
  2. (시선을 내리며 짧게) "한쪽이 무너지면 형제가 멀어진다고 적으셨습니다." ← **어머니 주체화 + 형제 우려 영역 (출생 비밀 hook이지만 직접 X)**
  - behaviorHint: "윤정후가 깊은 침묵 후 시선을 자료 위에 두고 두 문장을 잇는다. 첫 문장 끝에서 호흡이 길어진다."
- 판사 react (1 문장): "윤정후 측 발화와 본 자료의 영역이 일치합니다."
- 판사 decree (1~2 문장):
  1. "어머니의 오래된 노트 사본을 자료로 받아들입니다."
  2. "민감 영역은 단계별로만 공개합니다." ← 봉인 명시

---

#### Trigger 4 — `judge_auto_mention` (fallback)

**조건:**
- T1~T3 모두 미발동 + d-4 S2 + turnsAfterEligible: 6

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 자료 호출 + 봉인 명시 | 2 문장 | 격식·결정 |
| `emerge-e7-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무거운 평정 |

**가이드:**
- 판사 auto (2 문장):
  1. "본 가족 영역의 자료가 정리되지 않았습니다. 윤정후 측이 보관해 온 어머니의 오래된 노트 사본을 본 법정에 직접 확인해 보겠습니다." ← **호출 동사 다양화 ("확인해 보겠습니다") — cascade=받아들입니다 / interject=직접 받아 정리 / outburst=받아들입니다와 다양화**
  2. "자료의 민감 영역은 단계별로만 공개합니다." ← 봉인 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 2 total: 2 + 3 + 3 + 2 = 10 entry**

---

**Batch 1 grand total: 12 + 10 = 22 entry**

---

## §3. 미스터리 dynamics 정책 (본 cycle 핵심 — 엄수 필수)

본 cycle은 *fact 영역 미스터리 + 동기 영역 미스터리 동시*. 모든 entry text는 다음 3 dynamics 일관 유지:

### Dynamics 1 — B "어머니 뜻 + 가족 영역 한 줄" frame (회피 + hook)

- B 발화 = "어머니께서 남기신 글" / "어머니께서 가장 걱정하셨다" / "그 한 줄 때문에..." 형식
- B는 본인 사전 인지 (출생 비밀 알고 있음)을 본 batch 영역에서 *직접 surface X* — 단 "본인뿐이 그 줄을 봤다" / "그 한 줄 때문에 형에게 말하지 못함" 같은 *hook* 영역 OK
- 본 batch entry에 등장하는 B 발화 어휘 사전:
  - ✓ "어머니께서 그 시절 남기신 글 한 줄이 있습니다"
  - ✓ "그 한 줄 때문에 형에게 말하지 못한 부분이 있습니다"
  - ✓ "어머니께서 그 공책을 가장 걱정하셨습니다"
  - ✓ "한쪽이 무너지면 형제가 멀어진다고 적으셨습니다" ← 어머니 주체화 + 형제 우려 hook
  - ✗ "형이 친자가 아닙니다" (출생 비밀 직접 surface — d-4 S3 영역, 본 batch X)
  - ✗ "본인이 공장을 양보했습니다" (그룹 4 직접 surface — d-4 S3+ 영역)
  - ✗ "보호 명분" (그룹 5 직접 — d-5 영역)
  - ✗ "친부 실명" (영구 봉인)

### Dynamics 2 — A "어머니의 평등 마음 첫 의문 충격" (자기 frame 균열 hook)

- A 발화 = *부정* 단계 (S0) → *어머니 평등 마음 인지* 단계 (S1) → *의문 충격* 단계 (본 batch outburst 영역)
- A는 본 batch 시점에서 출생 비밀 자체 인지 X (Cycle 6까지 의심 frame, Cycle 7부터 자기 frame 균열 hook). 단순 분노 X — *의문 충격* dynamics.
- A 의문 충격 어휘 사전:
  - ✓ "잠깐. 어머니가 우리 둘을 *똑같이* 보셨다? 그게 무슨 말이야."
  - ✓ "어머니가 평생 나를 장남으로 두고 키우셨는데, 똑같이 보셨다는 게 무슨 의미야?"
  - ✗ "내가 친자가 아니다" (출생 비밀 직접 — A는 본 시점 인지 X)
  - ✗ "정후가 거짓말한다" (직접 단정 X — A는 정후를 *의심*하지 *부정*하지는 않음 — Cycle 6 dynamics 계승)
  - ✗ "이건 위조다" (자료 자체 부정 — 자연성 약함)

### Dynamics 3 — 재판관 "가족 영역 vs 책임 구조 영역 분리" 명시

- 모든 재판관 decree entry의 마지막 문장에 영역 분리 강조 일관 (Cycle 6 "동기 별도 영역" 형식 계승)
- 표현 사전:
  - ✓ "본 가족 영역과 책임 구조 영역은 별도로 둡니다"
  - ✓ "가족 영역과 책임 구조는 별도로 정리합니다"
  - ✓ "민감 영역은 단계별로만 공개합니다" (e-7 자료 surface 시 봉인 명시)
  - ✗ "동기는 다음 단계에서 보겠습니다" (구체 시점 명시 X)
  - ✗ "친부 실명은 봉인합니다" (시스템 정책 직접 발화 X — 자연어 "민감 영역" 사용)

→ 이 일관 명시가 본 batch의 d-5/dc-5 hook + 미스터리 유지 핵심 장치.

---

## §4. 시스템 용어 절대 금지 (재판관 발화) — Cycle 6 사고 3 영역 계승

재판관 발화 (judge_summon / judge_decree / judge_react 모든 entry)에서 다음 시스템 용어 절대 X:

| 금지 어휘 | 자연 어휘 대체 |
|---|---|
| "S2 단계" / "lieState ≥ S2" | "어느 정도 정리된 후" / "충분히 확인된" |
| "S5 도달" | "진실이 확정된 후" 또는 (해당 시점 단계 표현 자체 회피) |
| "trigger" / "emergence" / "cascade" | "별도 쟁점으로 분리" / "단서로 등재" / "앞서 등록된 단서" |
| "unlock" / "fired" | "본 법정에 등재" / "확인됨" |
| "lieState" / "truthStage" / "depthStage" | (전체 회피) |
| "민감 봉인 / 친부 실명" 직접 발화 | "민감 영역은 단계별로만 공개" (자연어 우회) |

→ 본 batch 모든 재판관 entry 작성 시 위 시스템 용어 등장 시 *즉시 자연 어휘로 교체*.

---

## §5. 호칭/어법 정책 — Cycle 6 사고 4 영역 계승

### A → B 호칭

**일관 반말 (형 → 동생 자연)**

- A 본인이 B(동생)을 직접 호명 → "정후야" / "정후 이놈아" (격앙) / "윤정후!" (강한 격앙)
- A 본인이 B를 제3자 시점 언급 → "제 동생" (격식) / "정후 이놈" (격앙 보고)
- A 본인이 동생에게 직접 발화 시 = **반말 일관**
- 단 재판관 대상 격식 발화 = "재판관님" + "...습니다/...십시오"
- 본 batch에서 A는 *재판관 대상 격식 발화 위주* (B에게 직접 발화 영역 X)

### B → A 호칭

- B 본인이 A(형)을 직접 호명 → "형" / "형님"
- B 본인이 A를 제3자 시점 언급 → "형" / "형님"
- 본 batch에서 B는 *재판관 대상 격식 발화 위주* → "형에게 말하지 못한 부분이 있습니다"

### 자기 가족 호칭 ([[feedback_family_address_speaker_perspective]])

- "우리 어머니" / "어머니" / "내 동생" / "정후" / "형" / "형님"
- **친부 실명 절대 X** (본 batch 모든 entry — 영구 봉인)

### 판사 → A/B 호칭

- 격식 일관 — "윤태성 씨" / "윤정후 씨"
- 본 batch에서 판사 발화는 두 측 동시 청자 영역이 많으므로 *전체 청자 발화 (audience:both)* 우선

---

## §6. 진실 노출 경계 — Line C (그룹 1/3/4/5 영역)

### 그룹 1 — 출생 비밀 (d-4 영역, **본 batch 진입 시작**)

#### 본 batch entry text 영역 — d-4 S1~S2 surface 영역만

- ✓ 표현 OK:
  - "어머니께서 두 아들을 똑같이 보셨다" (S1 영역)
  - "어머니의 평등 마음" / "두 아들 모두 똑같은 자식"
  - "그 한 줄 때문에 형에게 말하지 못한 부분"
  - "어머니께서 가장 걱정하신 영역"
  - "한쪽이 무너지면 형제가 멀어진다" (어머니 우려 글)
- ✗ 표현 X (S3 영역 — Batch 2/3 영역):
  - "친자가 아니다" / "배다른" / "형이 친자가 아니다"
  - "아버지의 친자" / "아버지 피"
  - "형의 정체성"
- ✗ **친부 실명 — 영구 봉인** (본 batch 모든 entry 절대 X)

### 그룹 3 — 자필 90:10 / 공증 60:40 정확 수치 (d-5 영역, **본 cycle 모든 batch 절대 X**)

- 정확 수치 90:10 / 60:40 절대 X (d-5 S5 영역만)
- "어머니가 자필로 정한 비율" 정도까지만 OK (Line A에서 이미 surface — 본 batch 영역 X)

### 그룹 4 — 공장 양보 / 친자가 양보 / 형 자존심 동기 (d-4 영역, **본 batch 절대 X**)

- ✗ 공장 양보 / 친자가 양보 / 형 자존심 — 본 batch 모든 entry 등장 X (d-4 S3+ 영역, 본 batch는 S1~S2)
- A 의문 충격 어휘에서도 본인 자존심 영역 직접 표현 X. ("형으로서" / "장남으로서" 같은 자기 자리 강조는 OK)

### 그룹 5 — 보호 명분 / 두 번 왜곡 (d-5 영역, **본 batch 절대 X**)

- 본 batch entry 등장 X. Batch 2/3 영역.

### 본 batch entry text의 surfaceName 사용 (Cycle 5 P0 사고 방지 영역)

Cycle 5 사고 1 (e-3 lockedName 노출 P0 4건) 재발 방지. 본 batch entry text reference 시:

| 자료 | name (lockedName, *entry text 사용 금지*) | surfaceName (*entry text 사용 OK*) |
|---|---|---|
| e-7 | 어머니 일기장 | **오래된 노트 사본** ← entry text는 이것 사용 |
| e-6 | 오래된 계좌 흐름 | **오래된 송금 내역 묶음** |
| dc-3 | (= label "20년의 돈") | (= label "20년의 돈") |

→ entry text에 "어머니 일기장"이 등장하면 P0. **반드시 "오래된 노트 사본"** 사용.

단 예외 — B 측 자기지시 자연도 영역 (B가 본인 어머니 유품 영역에서 "공책" / "어머니가 곁에 두고 쓰신 공책" 같은 인격적 어휘 사용은 자연도 영역으로 OK — 단 lockedName 직접 단어 "일기장"은 X).

---

## §7. 작성 산출 형식

### JSON 배열

```json
[
  {
    "id": "emerge-d4-via-cascade-judge-decree-v1",
    "text": "앞서 등록된 단서 [20년의 돈] 흐름의 동기를 가족 기록 영역에서 별도로 검토합니다. 어머니가 두 아들에 대해 남기신 글이 본 영역의 자료가 됩니다. 가족 기록과 침묵의 이유를 별도 쟁점으로 분리합니다. 본 가족 영역과 책임 구조 영역은 별도로 둡니다.",
    "behaviorHint": "재판관이 앞선 단서 흐름의 다음 영역을 짚으며 자료 reference로 자연 연결한다. 마지막 문장에서 책임 구조 영역 분리를 짚어 미스터리 유지를 알린다.",
    "tags": [
      "channel:emergence_narrative",
      "case:family-01",
      "firstFiredWins:true",
      "speaker:judge",
      "speakerRole:judge",
      "listener:party",
      "listenerRole:party",
      "address:toParty",
      "scope:judge_only",
      "revealScope:judge_only",
      "register:formal",
      "honorific:formal",
      "audience:both",
      "tense:present",
      "relationship:family",
      "emotion:measured",
      "continuity:decree",
      "reveal:none",
      "disclosure:guarded",
      "trigger:cascade_from_card",
      "emergence:d-4",
      "priorCard:dc-3",
      "targetDispute:d-4",
      "linkedParty:b"
    ]
  }
]
```

### tag 명세 (Cycle 5/6 normalize 영역 계승)

본 batch 모든 entry에 다음 tag 일관 사용 (Cycle 6 sample 영역 정확 참조):

**공통 tag**:
- `channel:emergence_narrative`
- `case:family-01`
- `firstFiredWins:true`

**speaker/listener tag** (entry별):
- `speaker:judge` 또는 `speaker:a` 또는 `speaker:b`
- `speakerRole:judge` 또는 `speakerRole:party`
- `listener:party` 또는 `listener:judge`
- `listenerRole:party` 또는 `listenerRole:judge`
- `address:toParty` 또는 `address:toJudge`
- `audience:both` (judge → both A,B 영역) 또는 `audience:single`
- `relationship:family`

**scope/revealScope/disclosure**:
- `scope:judge_only`
- `revealScope:judge_only`
- `register:formal`
- `honorific:formal`
- `disclosure:guarded`
- `reveal:none`

**emotion** (entry별 dynamics 반영):
- `emotion:measured` (판사 격식 기본)
- `emotion:tense` (A 의문 충격)
- `emotion:flat` (B 평정 — 본 batch는 무거운 평정 영역으로 `emotion:heavy` 권장)
- `emotion:heavy` (B 무거운 첫 진술 / 평정)
- `emotion:shaken` (A 의문 충격 첫 단계)

**continuity** (entry 흐름 위치):
- `continuity:decree` (판사 선언)
- `continuity:react` (판사 reactive)
- `continuity:interject` (NPC 끼어듦)
- `continuity:outburst` (NPC 격앙)
- `continuity:response` (짧은 응답)

**trigger / emergence tag**:
- `trigger:<trigger_type>` (예: `trigger:cascade_from_card`)
- `priorCard:<id>` (cascade trigger 전용 — d-4는 `priorCard:dc-3`, e-7은 `priorCard:d-4`)
- `recipeId:<id>` (combination_result trigger 전용 — `recipeId:combine-4`)
- `source:a` 또는 `source:b` (npc_interjection / emotional_outburst 전용)
- `emergence:<emergence_id>` — 본 batch:
  - Emergence 1 → `emergence:d-4`
  - Emergence 2 → `emergence:e-7`
- `targetDispute:d-4` (Emergence 1 전용)
- `targetEvidence:e-7` (Emergence 2 전용)
- `linkedParty:b` (본 batch 모든 entry — d-4 linkedParty 'b_only', e-7 subjectParty 'b')

**다른 tag 금지** — 위 영역 외 추가 tag 사용 X.

### entry ID 명명 규칙

- `emerge-<emergence_id>-via-<trigger_type_short>-<role>-<verb>-v1`
- Emergence 1 (d-4): `emerge-d4-via-<trigger_type>-<role>-<verb>-v1`
  - 예: `emerge-d4-via-cascade-judge-decree-v1`
  - 예: `emerge-d4-via-combo-b-respond-v1`
  - 예: `emerge-d4-via-a-outburst-judge-react-v1`
- Emergence 2 (e-7): `emerge-e7-via-<trigger_type>-<role>-<verb>-v1`
  - 예: `emerge-e7-via-cascade-judge-decree-v1`

trigger_type_short:
- `cascade_from_card` → `cascade`
- `combination_result` → `combo`
- `npc_interjection` → `a-interject` / `b-interject` (source 명시)
- `emotional_outburst` → `a-outburst` / `b-outburst` (source 명시)
- `judge_auto_mention` → `judge-auto`

verb 권장:
- 판사 → `decree` (선언) / `react` (반응)
- NPC → `interject` (끼어듦) / `outburst` (격앙) / `respond` (응답)

---

## §8. 톤 권위 — family-01 영역

`family01-tone-samples.md` 18 channel 발췌 참조. 본 batch 핵심 channel:

- **`judge_question`** — 재판관 표준 격식 톤 reference
- **`interjection`** — A/B 끼어듦 (의문 충격 frame / 회피 frame 영역 참조)
- **`emotional_overload`** — A 의문 충격 / B 무거운 첫 진술 reference
- **`emergence_narrative`** (cycle 6 sample) — 본 batch 직접 reference. `sample/output-cycle6-family01-line-b.json` 정독

---

## §9. 자가 검증 (GPT Pro 출력 전 self-check)

다음 self-check 모두 PASS 후 출력:

- [ ] 모든 entry text에 "어머니 일기장" lockedName 등장 X (반드시 "오래된 노트 사본")
- [ ] 모든 entry text에 시스템 용어(S0~S5 / trigger / emergence / unlock) 등장 X
- [ ] 모든 entry text에 그룹 1 직접 단어 ("친자가 아니다" / "배다른" / "친부 실명" 등) 등장 X (단 "어머니의 평등 마음" / "두 아들 똑같이 보셨다" 정도 hook OK)
- [ ] 모든 entry text에 그룹 3 정확 수치 (90:10 / 60:40) 등장 X
- [ ] 모든 entry text에 그룹 4 직접 ("공장 양보" / "친자가 양보") 등장 X
- [ ] 모든 entry text에 그룹 5 직접 ("보호 명분" / "두 번 왜곡") 등장 X (Batch 2/3 영역)
- [ ] 모든 entry text에 친부 실명 영역 등장 X (영구 봉인)
- [ ] B 발화 모두 "어머니 뜻 + 한 줄 영역 hook" frame 일관 (회피 유지)
- [ ] A 발화 모두 "어머니 평등 마음 의문 충격" frame (출생 비밀 자체 인지 X)
- [ ] 판사 decree 모두 "본 가족 영역과 책임 구조 영역은 별도로 둡니다" 또는 동등 표현 명시
- [ ] e-7 자료 surface 시 "민감 영역은 단계별로만 공개합니다" 명시
- [ ] A는 B에게 반말 일관 (본 batch는 A → B 직접 발화 영역 X. 격식 = 재판관 대상만)
- [ ] tag 영역 §7 명세 외 추가 tag 등장 X
- [ ] entry ID 영역 §7 명명 규칙 일관
- [ ] entry text에 "단서 [20년의 돈]" 표현 정확 (Cycle 6 단서 reference 시)

---

## §10. 응답 파일

`output-cycle7-batch1-d4-e7.json` — JSON 배열 (22 entry).

응답 파일은 본 batch 폴더 `result/` 에 저장.

---

## §11. 본 batch 사후 처리 안내 (참고)

본 batch 결과 적용 시 메인 Claude 세션 6단계:

1. `src/data/scriptedText/family-01.json` `emergence_narrative` channel에 22 entry append
2. `src/data/coreCases/family-01.narrative.ts`에 신규 export 추가:
   - `d4NarrativeTriggers` (Batch 1 Emergence 1) — 5 trigger candidate
   - `e7NarrativeTriggers` (Batch 1 Emergence 2) — 4 trigger candidate
3. `src/data/coreCases/family-01.case.ts`의 d-4 / e-7 정의에 `narrativeTriggers` field 부착
4. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` PASS
5. Codex 다국어 sync 의뢰서 작성 + push

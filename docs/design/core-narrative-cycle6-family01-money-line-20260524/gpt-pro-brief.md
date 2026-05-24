# GPT Pro 의뢰서 — family-01 Cycle 6 (Line B 20년 돈) emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence × 8 trigger의 narrative ScriptedText KO 시안

---

## §0. 권위 메모리 (정독 필수)

본 폴더 `reference/`에 12종 권위 메모리 복사돼 있음. 정독 후 작성. 본 cycle 핵심 정책 메모리:

| 메모리 | 본 cycle 적용 영역 |
|---|---|
| `design_core_narrative_cycle_procedure` | 8단계 절차 (4단계 = 본 의뢰서) |
| `feedback_new_dispute_evidence_narrative_justification` | multi-trigger + First-Fired-Wins 권위 |
| `design_narrative_cascade_from_card` | cascade priorCard 일반화 (dossier/evidence/dispute/witness 모두 허용) |
| `design_family01_truth_disclosure_policy` | **그룹 2 (정후 돈) surface 정책 — 본 cycle 진입 영역** |
| `design_truth_leak_keyword_nature` | hidden keyword 본성 분류 (그룹 5는 false positive) |
| `feedback_dossier_card_renamed_to_clue` | '단서' 명칭 일관 사용 |
| `feedback_judge_dispassionate_action_focused` | **재판관 어법 사실/행위 중심 — 본 cycle 핵심 정책** |
| `feedback_judge_question_quality` | 재판관 발화 quality |
| `feedback_family_address_speaker_perspective` | 본인 가족 호칭 자기 시점 (w-3 발화 주의) |
| `feedback_natural_korean_npc_active_voice` | NPC 적극 발화 5 차원 (A 의심 frame / B 어머니 뜻 frame) |
| `feedback_self_reference_speaker_context` | 자기지시 (B "본인" 자기 발화 자연도) |
| `feedback_avoid_code_abbreviations_with_user` | 코드 약어 사용자 영역 회피 |

---

## §1. 사건 context

**family-01** = 윤태성(A, 48세, 형, 주방가구 공장 대표) vs 윤정후(B, 44세, 동생, 자동차부품 가게) 형제 유산 다툼.

### Line A 결과 (Cycle 5 완료 — 본 cycle 진입 시점)

- d-1 (말년의 종이) — 어머니 판단 능력 영역 (Phase 3 완료)
- d-2 (공증 절차의 개입) — 윤정후가 절차에 개입한 사실 surface (Cycle 5 완료)
- dc-1 (말년의 종이) / dc-2 (수정된 유언장) 단서 등록 완료
- e-3 (전 요양보호사 음성증언) / w-1 (최복순) / w-2 (김영수) 영역 narrative 완료

### Line B (본 cycle) — "어머니가 *원래* 90:10으로 작성한 이유는 무엇인가? 첫 답"

**핵심 의미**:
- Cycle 5에서 단서 [수정된 유언장] 등록 = "공증 단계에서 비율이 줄어들었다" 사실 확정
- 자연 후속 질문: "그렇다면 어머니가 *원래* 자필로 정한 비율 (player 측 visible = 어머니가 원래 더 많이 주려 한 쪽)의 배경은?"
- Line B 답 (본 cycle 첫 답, 경제적 측면): 윤정후가 20년간 형 공장 위기를 비밀 지원해왔음
- Line C 답 (Cycle 7, 정체성·관계 측면): 출생 비밀 + 친자 양보 + 어머니 미안함 — **본 cycle 절대 X**

### d-3 "오래된 지원의 출처" — dispute

- **dispute name (player visible)**: "오래된 지원의 출처"
- **mechanical unlock 조건**: d-2 lieState ≥ S3 도달 (case.ts l. 966)
- **truth 영역**: 윤정후 돈이 어머니 통장을 거쳐 윤태성 쪽으로 전달된 흐름. 윤정후 본인의 결정 (어머니가 직접 결정한 것 아님).
- **A surface frame** (S0~S1): 어머니 도움 / 가족 일 — 정후 돈 일체 부인
- **B surface frame** (S0~S1): 모름 strict
- **본 cycle trigger 발동 시점**: d-3 S0 (방금 unlock) 또는 S1 (자연 진전 후) — narrative entry 작성 시 surface 영역 *그룹 2 S0~S1 정책 준수* (정후 돈 surface 조심, 단 dc-3 등록과 동시 = surface OK 단계로 진입)
- **trigger fire 직후 d-3 진전**: dc-3 surface와 함께 d-3 S2 인정 단계 진입 가능 (B 첫 시인 + 자료 fact 확정 → S2)

### dc-3 "20년의 돈" — dossier card (단서)

- **clue label (player visible)**: "20년의 돈"
- **mechanical 조건**: combine-3 (e-5+e-6) / combine-6 (stmt-b-mother+e-6) / combine-10 (stmt-a-heir+e-6) — case.ts l. 2666~2784. 또는 d-3 truthStages.S2.successUnlocks=['dc-3'] (S2 도달 시 자동)
- **noteText**: "윤정후 계좌 → 어머니 통장 → 윤태성 쪽으로 20년간 흘러간 월 정기 지원금과 공장 위기 3억원의 실체. 형이 모르게 한 결정의 동기가 d-4로 이어진다."
- **leadLine choices (player 추리 영역)**:
  - L-3-A: "어머니 통제 수단이었다" (A 측 해석)
  - L-3-B: "형을 살리려 한 희생이다" (B 측 해석)
  - L-3-C: "형 자존심을 지키려는 통로" (보호 명분 영역)
- **본 cycle 정의**: dc-3 단서의 *무게* = "20년이라는 시간 + 체계적 비밀 지원" (단순 자금 흐름 ≠ 본질). "*왜* 20년이나? *왜* 형이 모르게?" 질문 유발 = d-4 hook.
- **단서 등록 narrative entry text reference**: "단서 [20년의 돈]"

### w-3 "박순애" — witness

- **호칭 (case.ts)**: fromA="태성이" / fromB="정후" (어머니 발화 인용 시 두 아들에 대한 어머니 시점 호칭 자연 사용)
- **occupation**: "어머니의 오랜 지인" (69세, 여성)
- **bias**: pro_a (윤태성 동정심 강함)
- **distortionRisk**: biased
- **knowledgeScope**: "어머니로부터 두 아들에 대한 속마음을 자주 들었다. 정후가 매달 돈을 보낸다는 말과 태성이 공장 도움이 어디서 왔는지에 대해 어머니의 발화를 기억한다."
- **hiddenAgenda**: "윤태성에 대한 동정심이 강해 일부 정보를 자기 해석으로 포장한다."
- **본 cycle 호출 시점**: dc-3 unlock 후 — 자료 영역 → 어머니 마음 영역 전환
- **본 cycle 진실 영역**: 어머니 발화 인용 ("정후가 매달 돈을 보낸다", "태성을 위해 정후의 돈을 통장에서 보냈다", "정후가 더 짊어졌다") = surface OK. *bias 깊은 해석*은 본 cycle X (d-5 영역에서 surface 가능).

### 본 cycle 진입 시점 evidence/dossier 상태 (참고)

| ID | name | surfaceName | 본 cycle 활용 |
|---|---|---|---|
| e-6 | 오래된 계좌 흐름 | **오래된 송금 내역 묶음** | trigger T2 (e-6 evidence_present) 사용 — **entry text는 surfaceName "오래된 송금 내역 묶음" 사용** |
| dc-2 | 수정된 유언장 | (= label) | cascade priorCard (Cycle 5 마지막 단서) — entry text reference "단서 [수정된 유언장]" |
| dc-3 | 20년의 돈 | (= label) | 본 cycle 등록 — entry text reference "단서 [20년의 돈]" |

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

---

### Emergence 1: **d-3 + dc-3 통합 event** "오래된 지원의 출처 + 20년의 돈" — 5 trigger

**구조 핵심**: 한 trigger fire 시 narrative event 안에서 d-3 (별도 쟁점 분리) + dc-3 (단서 등록) **동시 surface**. 두 layer를 한 자리에서 surface하므로 entry text에는 "별도 쟁점으로 분리하고 단서 [20년의 돈]을 본 법정에 등록한다" 형식.

**미스터리 dynamics 정책 (모든 trigger 적용)**:
- B "어머니 뜻" frame 유지 (회피 동기 미스터리화)
- A 의심 frame 자기방어 ("정후가 어머니 통해 형 통제" 의심 — 자존심 보호)
- 재판관 "**동기는 별도 영역으로 둔다**" 명시 (d-4 hook + 미스터리 유지)

---

#### Trigger 1 — `cascade_from_card` (priorCard:dc-2) ← **메인 trigger**

**선결조건:**
- `dc-2` (Cycle 5 마지막 단서) fired 상태 (priorCard:dc-2)
- d-2 lieState ≥ S3 (Cycle 5 결과 — 공증 절차 진실 확정 단계)
- d-3 mechanical unlock 만족 시점 (= d-2 S3 도달)

**Narrative scenario:**
- 컨텍스트: Cycle 5 마지막 단서 [수정된 유언장] 등록 후, 자연 후속 질문 surface — "어머니가 *원래* 자필로 정한 비율의 배경"
- 발동 흐름 (~7초): 판사 자발 dc-2 reference → "원래 비율의 배경 = 어떤 자료가 그 단서가 되는가?" → 윤정후 측 송금 내역 묶음 reference → 별도 쟁점 분리 + 단서 [20년의 돈] 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d3-dc3-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-2 reference + d-3 분리 + dc-3 등록 + 동기 미스터리 명시 | 3~4 문장 | 격식·분석·결정 |
| `emerge-d3-dc3-via-cascade-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정·짧음 |

**가이드:**
- 판사 decree (3~4 문장): 
  1. "앞서 등록된 단서 [수정된 유언장] 이후, 어머니가 원래 자필로 정한 비율의 배경이 남아 있습니다."
  2. "윤정후 측이 제출한 오래된 송금 내역 묶음이 그 배경의 단서가 됩니다."
  3. "자금 흐름의 출처를 별도 쟁점으로 분리하고, 종합 단서 [20년의 돈]을 본 법정에 등록합니다."
  4. "본 흐름의 *동기*는 별도 영역으로 둡니다." ← **미스터리 명시 핵심**
- B respond: "예…" 또는 "받아들이겠습니다."

---

#### Trigger 2 — `combination_result` (recipeId: `combine-6` — stmt-b-mother + e-6)

**선결조건:**
- player가 `combine-6` 조합 실행 (B의 "어머니 뜻" statement + e-6 송금 자료)
- e-6 stage ≥ Original (case.ts gate 정의)
- d-3 lieState ≥ S2 (case.ts gate.requiredTruthStage)

**Narrative scenario:**
- 컨텍스트: player가 의도적으로 B의 "어머니 뜻" 발언 + 오래된 송금 자료 combo → **B 어머니 뜻 frame과 자료 시점이 한 자리에서 대비**
- 발동 흐름 (~7초): 판사 자발 분석 결과 → 두 자료의 시점 일치/불일치 명시 → 별도 쟁점 분리 + 단서 등록

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d3-dc3-via-combo-judge-decree-v1` | 판사 | 전체 | combo 결과 + 분리 + 등록 + 동기 미스터리 명시 | 3 문장 | 격식·분석 |
| `emerge-d3-dc3-via-combo-b-respond-v1` | B | 판사 | 짧은 응답 (어머니 뜻 frame 부분 보강) | 1~2 문장 | 평정·짧음 |

**가이드:**
- 판사 decree:
  1. "윤정후 측 진술 '어머니의 뜻이었다'와 오래된 송금 내역 묶음이 한 자리에서 검토됐습니다."
  2. "자금 출입 시점은 윤정후 측 결정으로 보입니다. 자금의 출처를 별도 쟁점으로 분리하고, 단서 [20년의 돈]을 등록합니다."
  3. "결정의 동기는 별도 영역으로 둡니다." ← 미스터리 명시
- B respond (어머니 뜻 frame 보강): "어머니께서 본인을 통해 보내신 일입니다." ← **회피 frame 미스터리 유지**

---

#### Trigger 3 — `npc_interjection` (A 충격 + 의심)

**선결조건:**
- A partyPhase: ['defensive', 'shaken'] 또는 partyDistrust.a.min: 40
- d-2 lieState ≥ S3 OR d-3 mechanical unlock 만족
- (배열 OR — 둘 중 하나)

**Narrative scenario:**
- 컨텍스트: A가 자료 영역 진행 중 *자존심 frame 첫 흔들림* → 즉시 *의심 frame* 자기방어 ("정후가 어머니를 통해 형을 통제한 것" 의심)
- 발동 흐름 (~9초): A 자료 보다 흔들림 → A 의심 발화 → 판사 reactive catch → 별도 쟁점 분리 + 단서 등록

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d3-dc3-via-a-interject-v1` | A | 판사 | 자료를 보다 의심 frame 발화 (자존심 frame 첫 흔들림 → 의심 자기방어) | 2~3 문장 | 흔들림 → 강한 의심 |
| `emerge-d3-dc3-via-a-interject-judge-react-v1` | 판사 | A | reactive catch (A 의문 명시) | 1 문장 | 격식·결정 |
| `emerge-d3-dc3-via-a-interject-judge-decree-v1` | 판사 | 전체 | 분리 + 등록 + 동기 미스터리 명시 | 2 문장 | 격식·확정 |

**가이드:**
- A interject (2~3 문장):
  1. (자료를 보며 흔들림) "그게 무슨 소리야. 어머니가 평생 도와주신 돈인데…"
  2. (자료를 다시 본 뒤 의심 frame으로 자기방어) "정후 이놈이 어머니한테 무슨 짓 한 거 아니야? 어머니 명의 잡고 본인 돈으로 형을 묶어둔 거 아니냐고!"
  - behaviorHint: "윤태성이 자료를 손으로 짚다 멈춘다. 첫 문장은 흔들리며 작아지고, 두 번째 문장에서 시선이 동생을 향하면서 의심이 올라온다."
- 판사 react (1 문장): "윤태성 씨가 제기한 두 영역 — 자금의 출처와 그 동기 — 모두 별도 쟁점으로 분리합니다."
- 판사 decree (2 문장): 
  1. "윤정후 측이 제출한 오래된 송금 내역 묶음을 종합한 단서 [20년의 돈]을 본 법정에 등록합니다."
  2. "동기 영역은 별도로 둡니다." ← 미스터리 명시

---

#### Trigger 4 — `emotional_outburst` (B 무거운 첫 진술 + 어머니 뜻 frame)

**선결조건:**
- B partyPhase: ['defensive', 'shaken']
- d-2 lieState ≥ S3 OR d-3 mechanical unlock 만족

**Narrative scenario:**
- 컨텍스트: B가 자료 영역 검토 중 *20년 침묵 처음 입 열음*. 단 동기는 표현 X, "어머니 뜻" frame으로 회피.
- 발동 흐름 (~9초): B 자료 길게 보다가 짧은 첫 진술 (어머니 뜻 frame) → 판사 reactive → 분리 + 등록 + 미스터리 명시

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d3-dc3-via-b-outburst-v1` | B | 판사 | 20년 침묵 첫 입 열음 + 어머니 뜻 frame 회피 | 2 문장 | 무거운 침묵 → 담담한 단정 |
| `emerge-d3-dc3-via-b-outburst-judge-react-v1` | 판사 | B | reactive (어머니 뜻 frame과 자료 시점 대비 명시) | 1 문장 | 격식·결정 |
| `emerge-d3-dc3-via-b-outburst-judge-decree-v1` | 판사 | 전체 | 분리 + 등록 + 동기 미스터리 명시 | 2 문장 | 격식·확정 |

**가이드:**
- B outburst (2 문장):
  1. (오래된 자료를 길게 본 뒤) "어머니께서 본인을 통해 보내신 일입니다."
  2. (시선을 내리며 짧게) "형이 알게 하고 싶지 않으셨습니다." ← **동기 영역 회피 — "사셨던가/하셨던가" 형식으로 어머니 주체화 + 본인 동기 침묵**
  - behaviorHint: "윤정후가 오랜 침묵 후 시선을 자료 위에 두고 두 문장을 짧게 잇는다. 첫 문장은 평정 톤, 두 번째 문장에서 시선이 더 떨어진다."
- 판사 react (1 문장): "윤정후 측 진술과 송금 내역 시점이 한 자리에서 확인됐습니다."
- 판사 decree (2 문장):
  1. "자금의 출처를 별도 쟁점으로 분리하고, 단서 [20년의 돈]을 본 법정에 등록합니다."
  2. "흐름의 동기는 별도 영역으로 둡니다." ← 미스터리 명시

---

#### Trigger 5 — `judge_auto_mention` (fallback)

**조건:**
- T1~T4 모두 미발동 + d-3 mechanical unlock 만족 + e-6 자료 본 법정 등재 상태 + turnsAfterEligible: 8

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-d3-dc3-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 분리 + 등록 + 동기 미스터리 | 3 문장 | 격식·결정 |
| `emerge-d3-dc3-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 (어머니 뜻 frame 부분 보강) | 1 문장 | 평정·짧음 |

**가이드:**
- 판사 auto (3 문장):
  1. "단서 [수정된 유언장] 이후, 어머니가 원래 자필로 정한 비율의 배경이 단독으로 정리되지 않았습니다."
  2. "윤정후 측이 제출한 오래된 송금 내역 묶음이 그 단서가 됩니다. 자금의 출처를 별도 쟁점으로 분리하고, 단서 [20년의 돈]을 본 법정에 등록합니다."
  3. "동기 영역은 별도로 둡니다." ← 미스터리 명시
- B respond: "예, 받아들이겠습니다."

---

**Emergence 1 total: 2 + 2 + 3 + 3 + 2 = 12 entry**

---

### Emergence 2: **w-3** "박순애" (어머니의 오랜 지인) — 3 trigger

**구조 핵심**: dc-3 단서 등록 후, *자료 영역 → 어머니 마음 영역* 전환. 어머니가 직접 발화한 영역을 청취할 수 있는 첫 자리.

**dynamics 정책 (모든 trigger 적용)**:
- 호출 자체는 격식
- 박순애 = 어머니 발화 직접 인용자 (객관 사실)
- bias 영역 (pro_a 편향) 깊은 노출은 본 cycle X (w-3 진술 영역은 d-3 fact 확정 + d-5 hook)

---

#### Trigger 1 — `cascade_from_card` (priorCard:dc-3) ← 메인

**선결조건:**
- dc-3 fired 상태 (priorCard:dc-3)
- d-3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: dc-3 등록 후 자연 cascade — "자료는 흐름의 실체를 보여주나, 그 흐름 뒤 어머니의 마음은 자료로 잡히지 않는다" → 어머니 지인 청취
- 발동 흐름 (~6초): 판사 자발 cascade mention + 호출 선언

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-cascade-judge-summon-v1` | 판사 | 전체 | dc-3 reference + 자료→마음 차원 전환 + w-3 호출 | 2~3 문장 | 격식·결정 |
| `emerge-w3-via-cascade-a-react-v1` | A | 판사 | 짧은 동의 | 1 문장 | 동의·짧음 |

**가이드:**
- 판사 summon (2~3 문장):
  1. "앞서 등록된 단서 [20년의 돈]은 흐름의 실체를 보여주나, 그 흐름 뒤 어머니의 마음은 자료로 잡히지 않습니다."
  2. "어머니가 오랜 시간 속마음을 나누신 분의 진술을 직접 청취하겠습니다."
  3. "박순애 씨를 증인으로 모시겠습니다." ← **호출 동사 다양화 ([[feedback_judge_dispassionate_action_focused]] 정책)**
- A react: "네, 감사합니다, 재판관님."

---

#### Trigger 2 — `npc_interjection` (B 흘림 — 어머니 친구 언급)

**선결조건:**
- d-3 lieState ≥ S2
- B partyPhase: ['defensive', 'resigned'] (격앙 X — 평정 톤)

**Narrative scenario:**
- 컨텍스트: B가 어머니 발화 영역 검토 중 "어머니가 자주 만나신 분" 자발 언급 → 판사 reactive 호출
- 발동 흐름 (~6초): B 흘림 → 판사 reactive → 호출 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-b-interject-v1` | B | 판사 | 어머니 친구 자발 언급 (frame 보강 의도) | 1~2 문장 | 평정·짧음 |
| `emerge-w3-via-b-interject-judge-react-v1` | 판사 | B | reactive | 1 문장 | 격식·결정 |
| `emerge-w3-via-b-interject-judge-summon-v1` | 판사 | 전체 | 호출 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject (1~2 문장): 
  1. "어머니께서 그 시절 자주 만나신 분이 한 분 계십니다."
  2. "본인의 보냄도 다 알고 계셨던 분입니다." ← **B의 frame 보강 의도 — "어머니가 다 아셨다"로 본인 행위 정당화**
  - behaviorHint: "윤정후가 시선을 자료 끝에 둔 채 짧게 두 문장을 잇는다. 두 번째 문장에서 약간의 단정감이 묻어난다."
- 판사 react (1 문장): "그렇다면 어머니 측 발화를 직접 들으신 분께 자리를 마련하겠습니다."
- 판사 summon (1 문장): "박순애 씨를 본 법정에 모시겠습니다."

---

#### Trigger 3 — `judge_auto_mention` (fallback)

**조건:**
- T1/T2 모두 미발동 + dc-3 등록 + d-3 S2 + turnsAfterEligible: 5

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-judge-auto-summon-v1` | 판사 | 전체 | 자발 호출 (호출 동사 다양화 — 위 cascade/interject과 다른 표현) | 2 문장 | 격식·결정 |
| `emerge-w3-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 auto (2 문장):
  1. "어머니가 본 영역의 흐름을 직접 발화로 남기신 상대방이 있습니다."
  2. "박순애 씨의 진술을 직접 들어보겠습니다." ← **호출 동사 = "들어보겠습니다" (cascade=모시겠습니다, interject=자리를 마련/모시겠습니다 — 다양화)**
- B respond: "예, 받아들이겠습니다."

---

**Emergence 2 total: 2 + 3 + 2 = 7 entry**

---

**Cycle 6 grand total: 12 + 7 = 19 entry**

---

## §3. 미스터리 dynamics 정책 (본 cycle 핵심 — 엄수 필수)

본 cycle은 *fact 영역* 미스터리가 약함 (객관 자료로 확정 가능). 미스터리는 **동기 영역** + **어머니 마음 영역**. 모든 entry text는 다음 3 dynamics 일관 유지:

### Dynamics 1 — B "어머니 뜻" frame (회피 동기 미스터리화)

- B 발화 = "어머니가 본인을 통해 보내신 일" / "어머니가 그렇게 하라 하셨다" / "어머니께서 그 시절..." 형식
- B는 본인 동기 (왜 비밀로 했나) 일체 표현 X
- player 추리 영역: *진짜 어머니 뜻인가, 정후가 어머니 뜻으로 책임 전가하는가?*
- 본 cycle entry에 등장하는 B 발화 어휘 사전:
  - ✓ "어머니께서 본인을 통해 보내신 일입니다"
  - ✓ "형이 알게 하고 싶지 않으셨습니다" ← 어머니 주체화 ("어머니가") + 본인 동기 침묵
  - ✓ "어머니가 그 시절 자주 만나신 분이..."
  - ✗ "본인이 형을 위해 보냈다" (본인 주체화 → 동기 surface 위험)
  - ✗ "형 자존심을 지키려 했다" (동기 직접 표현 — 그룹 4 영역)

### Dynamics 2 — A 의심 frame (자기방어)

- A 발화 = 자존심 frame 첫 흔들림 → 즉시 *의심 frame* 자기방어
- A는 *부정* → *충격* → *의심*의 3단계 dynamics (단순 분노 X)
- A 의심 frame의 자연 어휘:
  - ✓ "정후 이놈이 어머니한테 무슨 짓 한 거 아니야?"
  - ✓ "어머니 명의 잡고 본인 돈으로 형을 묶어둔 거잖아!"
  - ✓ "정후가 어머니를 통해 형을 통제한 것"
  - ✗ "정후가 거짓말한다" (직접 단정 X — A는 정후를 *의심*하지 *부정*하지는 않음)
  - ✗ "이건 위조다" (자료 자체 부정 — 자연성 약함)

### Dynamics 3 — 재판관 "동기는 별도 영역으로" 명시

- 모든 재판관 decree entry의 마지막 문장 또는 reactive 발화에 동기 영역 분리 강조 일관
- 표현 사전:
  - ✓ "본 흐름의 동기는 별도 영역으로 둡니다"
  - ✓ "결정의 동기는 별도 영역으로 둡니다"
  - ✓ "흐름의 동기는 별도 영역으로 둡니다"
  - ✓ "동기 영역은 별도로 둡니다"
  - ✗ "동기는 다음에 보겠습니다" (구체 시점 명시 X)
  - ✗ "동기는 모르겠습니다" (재판관 약함 X)

→ 이 일관 명시가 본 cycle의 d-4 hook + 미스터리 유지 핵심 장치.

---

## §4. 시스템 용어 절대 금지 (재판관 발화)

**Cycle 5에서 사용자 지적 (2026-05-24 본 cycle 2단계)**:
> "S3 단계를 재판관이 직접 언급하는 건 말도 안되는 이상한 상황이야."

재판관 발화 (judge_summon / judge_decree / judge_react 모든 entry)에서 다음 시스템 용어 절대 X:

| 금지 어휘 | 자연 어휘 대체 |
|---|---|
| "S3 단계" / "lieState ≥ S3" | "공증 절차 진실이 어느 정도 정리된 후" / "충분히 정리된" 정도 (단 *판단* 어휘 X — *어느 정도 확인된* 정도) |
| "S5 도달" | "진실이 확정된 후" 또는 (해당 시점 단계 표현 자체 회피) |
| "trigger" / "emergence" / "cascade" | "별도 쟁점으로 분리" / "단서로 등록" / "앞서 등록된 단서" |
| "unlock" / "fired" | "본 법정에 등재" / "확인됨" |
| "lieState" / "truthStage" / "depthStage" | (전체 회피) |

→ 본 cycle 모든 재판관 entry 작성 시 위 시스템 용어 등장 시 *즉시 자연 어휘로 교체*.

---

## §5. 호칭/어법 정책

### A → B 호칭 (사용자 결정 2026-05-24)

**"일관되게 반말 (형 → 동생 자연)"**

- A 본인이 B(동생)을 직접 호명 → "정후야" / "정후 이놈아" (격앙) / "윤정후!" (강한 격앙)
- A 본인이 B를 제3자 시점 언급 (재판관 대상 발화) → "제 동생" (격식) / "정후 이놈" (격앙 보고)
- A 본인이 동생에게 직접 발화 시 = **반말 일관**
- 단 재판관 대상 격식 발화 = "재판관님" + "...습니다/...십시오"
- 자기 가족 호칭 ([[feedback_family_address_speaker_perspective]]): "우리 어머니" / "어머니" / "내 동생" / "정후"

### B → A 호칭

- B 본인이 A(형)을 직접 호명 → "형" / "형님"
- B 본인이 A를 제3자 시점 언급 → "형" / "형님"
- 본 cycle에서 B는 A 직접 호명보다 *재판관 대상 격식 발화* 위주 → "형이 알게 하고 싶지 않으셨습니다" / "형에게 보냈습니다" 형식

### 판사 → A/B 호칭

- 격식 일관 — "윤태성 씨" / "윤정후 씨"
- 본 cycle에서 판사 발화는 두 측 동시 청자 영역이 많으므로 직접 호명보다 *전체 청자 발화 (audience:both)* 우선

### w-3 (박순애) 발화 시 호칭 (본 cycle 영역 X — w-3 호출만)

- 본 cycle은 w-3 호출까지만. w-3 본인 진술은 본 cycle 의뢰 영역 X (witness 채널, 별도 cycle)

---

## §6. 진실 노출 경계 — Line B (그룹 2)

### 그룹 1 — 출생 비밀 (d-4 영역) **절대 X**

- 출생 비밀 / 친자가 아니다 / 배다른 / 아버지 피 / 친자 양보 — **본 cycle 모든 entry 등장 X**
- A 의심 frame에서도 "출생 비밀" 영역 절대 surface X (A는 본 cycle 시점에서 출생 비밀 인지 X)

### 그룹 2 — 정후 돈 (본 cycle 진입 영역)

#### S0~S1 시점 (B는 모름 strict, A는 어머니 돈 strict) — trigger 발동 *직전* 영역

- ✗ 명시 surface: 윤정후 돈 / 어머니 통장 경유 / 정기 지원금 / 3억원 / 20년 비밀
- ✓ 표현: 어머니 명의 자금 / 어머니 도움 / 가족 일

#### **본 cycle trigger 발동 시점 = dc-3 등록 직접 단계** (그룹 2 S2~S4 진입)

- ✓ 명시 surface OK: 
  - "윤정후 측에서 보낸 자금"
  - "어머니 통장을 거친 자금"
  - "어머니 명의 자금의 상당수가 윤정후 측 자금"
  - "윤정후 측 결정으로 보낸 흐름"
- ✗ S5 영역 (절대 X):
  - "3억원 전달" (정확 수치)
  - "20년 비밀 지원" (정확 기간)
  - "월 단위 정기 지원금" (정확 빈도)
  - **단** "오래된 송금 내역 묶음" / "흐름의 출처" / "장기간 반복된 송금" 같이 *모호 표현* 은 OK

### 그룹 3 — 자필 90:10 (d-5 영역, **본 cycle 절대 X**)

- 정확 수치 90:10 / 60:40 절대 X
- "어머니가 원래 자필로 정한 비율" 정도까지만 OK (Line A에서 이미 surface된 영역)

### 그룹 4 — 공장 양보 / 형 자존심 동기 (d-4 영역, **본 cycle 절대 X**)

- ✗ 공장 양보 / 친자가 양보 / 형 자존심 / 형의 정체성 — 모든 entry 등장 X
- A 의심 frame에서도 본인 자존심 영역은 *직접 표현* X. ("형으로서" / "장남으로서" 같은 자기 자리 강조는 OK)

### 그룹 5 — 보호 명분 / 두 번 왜곡 (d-5 영역, **본 cycle 절대 X**)

- 본 cycle entry 등장 X

### 본 cycle entry text의 surfaceName 사용 (P0 사고 방지)

Cycle 5 사고 1 (e-3 lockedName 노출 P0 4건) 재발 방지. 본 cycle 영역에서 entry text reference 시:

| 자료 | name (lockedName, *entry text 사용 금지*) | surfaceName (*entry text 사용 OK*) |
|---|---|---|
| e-6 | 오래된 계좌 흐름 | **오래된 송금 내역 묶음** ← entry text는 이것 사용 |
| dc-2 | (= label "수정된 유언장") | (= label "수정된 유언장") |
| dc-3 | (= label "20년의 돈") | (= label "20년의 돈") |

→ entry text에 "오래된 계좌 흐름"이 등장하면 P0. **반드시 "오래된 송금 내역 묶음"** 사용.

---

## §7. 작성 산출 형식

### JSON 배열

```json
[
  {
    "id": "emerge-d3-dc3-via-cascade-judge-decree-v1",
    "text": "앞서 등록된 단서 [수정된 유언장] 이후, 어머니가 원래 자필로 정한 비율의 배경이 남아 있습니다. 윤정후 측이 제출한 오래된 송금 내역 묶음이 그 배경의 단서가 됩니다. 자금 흐름의 출처를 별도 쟁점으로 분리하고, 종합 단서 [20년의 돈]을 본 법정에 등록합니다. 본 흐름의 동기는 별도 영역으로 둡니다.",
    "behaviorHint": "재판관이 앞선 단서 등록 결과를 짚으며 자료 reference로 자연 연결한다. 마지막 문장에서 동기 영역 분리를 짚어 미스터리 유지를 알린다.",
    "tags": [
      "channel:emergence_narrative",
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
      "priorCard:dc-2",
      "case:family-01",
      "emergence:d-3+dc-3",
      "emergenceType:dispute_dossier_combined",
      "targetDispute:d-3",
      "targetClue:dc-3",
      "clueLabel:20년의_돈",
      "linkedParty:b",
      "firstFiredWins:true"
    ]
  }
]
```

### tag 명세 (Cycle 5 사고 2 — tag normalize 영역 반영)

본 batch 모든 entry에 다음 tag 일관 사용 (cycle 5 batch3 sample 영역 참조):

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
- `emotion:tense` (A 의심 frame)
- `emotion:flat` (B 평정)
- `emotion:heavy` (B 무거운 첫 진술)
- `emotion:shaken` (A 충격 첫 단계)
- (다른 dynamics에 맞춰 자유 — 단 cycle 5 sample 영역과 일관)

**continuity** (entry 흐름 위치):
- `continuity:decree` (판사 선언)
- `continuity:react` (판사 reactive)
- `continuity:interject` (NPC 끼어듦)
- `continuity:outburst` (NPC 격앙)
- `continuity:response` (짧은 응답)
- `continuity:question` (해당 entry 영역 X — 본 cycle은 question 없음)

**trigger / emergence tag**:
- `trigger:<trigger_type>` (예: `trigger:cascade_from_card`)
- `priorCard:<id>` (cascade trigger 전용)
- `recipeId:<id>` (combination_result trigger 전용)
- `source:a` 또는 `source:b` (npc_interjection / emotional_outburst 전용)
- `emergence:<emergence_id>` — 본 cycle:
  - Emergence 1 → `emergence:d-3+dc-3`
  - Emergence 2 → `emergence:w-3`
- `emergenceType:dispute_dossier_combined` (Emergence 1 전용 — **신규 type**)
- `emergenceType:witness` (Emergence 2 전용)
- `targetDispute:d-3` (Emergence 1 전용)
- `targetClue:dc-3` (Emergence 1 전용)
- `targetWitness:w-3` (Emergence 2 전용)
- `clueLabel:20년의_돈` (Emergence 1 전용, label은 공백 → underscore)
- `linkedParty:b` (모든 entry 동일)

**다른 tag 금지** — 위 영역 외 추가 tag 사용 X (Cycle 5 사고 2 normalize 영역 반영).

### entry ID 명명 규칙

- `emerge-<emergence_id>-via-<trigger_type_short>-<role>-<verb>-v1`
- Emergence 1 (d-3+dc-3 통합): `emerge-d3-dc3-via-<trigger_type>-<role>-<verb>-v1`
  - 예: `emerge-d3-dc3-via-cascade-judge-decree-v1`
  - 예: `emerge-d3-dc3-via-combo-b-respond-v1`
  - 예: `emerge-d3-dc3-via-a-interject-judge-react-v1`
- Emergence 2 (w-3): `emerge-w3-via-<trigger_type>-<role>-<verb>-v1`
  - 예: `emerge-w3-via-cascade-judge-summon-v1`

trigger_type_short:
- `cascade_from_card` → `cascade`
- `combination_result` → `combo`
- `npc_interjection` → `a-interject` / `b-interject` (source 명시)
- `emotional_outburst` → `a-outburst` / `b-outburst` (source 명시)
- `judge_auto_mention` → `judge-auto`

verb 권장:
- 판사 → `decree` (선언) / `react` (반응) / `summon` (호출)
- NPC → `interject` (끼어듦) / `outburst` (격앙) / `respond` (응답)

---

## §8. 톤 권위 — family-01 영역

`family01-tone-samples.md` 18 channel 발췌 참조. 본 cycle 핵심 channel:

- **`judge_question`** — 재판관 표준 격식 톤 reference
- **`interjection`** — A/B 끼어듦 (의심 frame / 어머니 뜻 frame 영역 참조)
- **`emotional_overload`** — A 충격 / B 무거운 첫 진술 reference
- **`emergence_narrative`** (cycle 5 sample) — 본 cycle 직접 reference. `cycle5-batch3-sample-output.json` 정독.

---

## §9. 자가 검증 (GPT Pro 출력 전 self-check)

다음 self-check 모두 PASS 후 출력:

- [ ] 모든 entry text에 "오래된 계좌 흐름" 등장 X (반드시 "오래된 송금 내역 묶음")
- [ ] 모든 entry text에 시스템 용어(S0~S5 / trigger / emergence / unlock) 등장 X
- [ ] 모든 entry text에 그룹 1 (출생 비밀) / 그룹 3 (정확 수치 90:10) / 그룹 4 (공장 양보) / 그룹 5 (보호 명분) 등장 X
- [ ] B 발화 모두 "어머니 뜻" frame 일관 (회피 동기 미스터리 유지)
- [ ] A 발화 모두 의심 frame (자존심 frame 자기방어) — 단순 분노 X
- [ ] 판사 decree 모두 "동기 영역 별도" 명시 일관
- [ ] A는 B에게 반말 일관 (격식 = 재판관 대상만)
- [ ] tag 영역 §7 명세 외 추가 tag 등장 X
- [ ] entry ID 영역 §7 명명 규칙 일관
- [ ] entry text에 "단서 [수정된 유언장]" / "단서 [20년의 돈]" 표현 정확
- [ ] dc-2 단서 reference는 ScriptedText 영역 표현 일관 ("수정된 유언장")
- [ ] dc-3 단서 label "20년의 돈" 정확

---

## §10. 응답 파일

`output-cycle6-family01-line-b.json` — JSON 배열 (19 entry).

응답 파일은 본 cycle 폴더 `result/` 에 저장.

---

## §11. 본 cycle 사후 처리 안내 (참고)

본 batch 결과 적용 시 메인 Claude 세션 6단계:

1. `src/data/scriptedText/family-01.json` `emergence_narrative` channel에 19 entry append
2. `src/data/coreCases/family-01.narrative.ts`에 신규 export 추가:
   - `d3NarrativeTriggers` (Cycle 6 Emergence 1) — 단, d-3 와 dc-3가 같은 trigger 공유
   - `dc3NarrativeTriggers` (Cycle 6 Emergence 1) — d-3와 동일 trigger 후보, scriptedRefs 동일
   - `w3NarrativeTriggers` (Cycle 6 Emergence 2)
3. `src/data/coreCases/family-01.case.ts`의 d-3 / dc-3 / w-3 정의에 `narrativeTriggers` field 부착
4. `npx tsc --noEmit` + `npm run build` + `npm run -s qa:fast` PASS
5. Codex 다국어 sync 의뢰서 작성 + push

# GPT Pro 의뢰서 — spouse-01 Cycle 4: h-d4 line emergence narrative

작성일: 2026-05-25
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 4 emergence (e-8 / e-9 / dc-8 / h-d4) × 4 trigger 후보 = 16 trigger / **총 51 KO entry**

---

## §0. 권위 메모리 (정독 필수 — 본 폴더 memory/ 에 모두 복사돼 있음)

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차
- `design_narrative_cascade_from_card.md` — **cascade_from_card trigger 권위 (본 batch에서 5/16 trigger 사용)**
- `project_spouse01_event_timeline.md` — spouse-01 사건 흐름 timeline
- `feedback_natural_korean_npc_active_voice.md` — NPC 발화 자연화 5 차원
- `feedback_judge_dispassionate_action_focused.md` — 재판관 평가 어휘 회피 (Cycle 7 도입)
- `design_spouse01_truth_disclosure_policy.md` — **진실 노출 정책 (본 cycle 가장 위험 영역 — §6 참조)**
- `feedback_self_reference_speaker_context.md` — 자기지시 정밀
- `feedback_family_address_speaker_perspective.md` — **본인 가족 호칭 자기 시점 정책**

톤 reference: `spouse01-tone-samples.md`
fallback 재활용 spec: `batch7-reuse-spec.md` + `batch7-original.json`

---

## §1. 사건 context

**spouse-01** = 박지연(A, 원고/claimant) vs 이준호(B, 피고/defendant) 부부 분쟁.

### Cycle 4 영역 = h-d4 line (비자금의 원래 목적 = 박지연 난임 치료비)

| 쟁점 | 표면(외도 의심 frame) | 진실(난임 치료비 frame) |
|---|---|---|
| **h-d4** | A: 휴대폰 산부인과 검색 + 보험사 견적 = 외도 상대 임신/내연녀 수익자 의심 | B: 신혼 초기 박지연 난임 진단 후 출산 가능성을 혼자 알아봐 옴. 의사 친구 비공식 상담 + 보험 견적 모금. **가입 0건**. 형 사건 시 그 자금을 형에게 전환 |

### Cycle 4 emergence 4개 (등장 순서대로)

| emergence | 영역 | 등장 시점 | 의미 |
|---|---|---|---|
| **e-8** 휴대폰 의학 검색 기록 | 증거 (B 자료) | d-2 S5 자백 후 / requires e-3 + S2 | 자금 사용처 자백 후 잔여 의문 — 10년 누적 자금이 형 사건보다 먼저 시작 + 휴대폰에 형 사정과 무관한 의학 검색 |
| **e-9** 보험사 견적 자료 (가입 X) | 증거 (B 자료) | e-8 발현 후 / requires e-8 + S2 | 휴대폰 검색과 같은 시기 의료비 보장 견적 자료 — 외도 frame ↔ 출산 frame 충돌 |
| **dc-8** 이준호의 또 다른 침묵 | 단서 | combine-7 (e-8+e-9) / d-2 S5 게이트 | 두 자료가 같은 시기·같은 의학 영역으로 묶이는 패턴 단서 — frame 충돌 표면화 |
| **h-d4** 비자금의 원래 목적 | 쟁점(hidden, legitimacyIssue) | dc-8 surface 후 + d-2 S5 | **신규 진실 부상** — 비자금 = 박지연 난임 치료비 / B 책임 70 / 외도 frame 결정적 역전 |

### h-d4 시간축 (lieState 진행)

| State | A 측 frame | B 측 진술 |
|---|---|---|
| **S0** | "사용처 = 형. 원래 목적은 별도 영역 X" | "그냥 모은 돈. 사용처 = 형 맞다" |
| **S1** | "10년 누적이 형 사건보다 앞섬 — 다른 이유 가능" | "가족 외부 일로 따로 모았다" (모호) |
| **S2** | "남편이 혼자 알아본 의학 영역 = 외도 상대 임신 의심" | "병원 검색은 일반 정보 수집" (회피) |
| **S3** | "외도 상대 수익자 frame — 견적 자료가 결정적" | "의료비 대비 알아봤지만 결정 못 함" (frame 충돌 인정 직전) |
| **S4** | "혹시 다른 이유 가능성도 봐야" (frame 충돌 인정) | "사실은 형 사정 전부터 모았던 돈" (목적 차이 surface, 난임 직전) |
| **S5** | "비자금 원래 목적 = 박지연 난임 치료비. 책임 B 70 / A 30 수용" | **모든 키워드 발화 가능** — "신혼 초기 / 난임 진단 / 출산 포기 / 의사 친구 / 보험 견적 / 형 사건 후 전환 / 침묵 책임" |

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

**First-Fired-Wins**: 각 emergence는 trigger 후보 중 첫 발동만 fire. 나머지는 그 게임 동안 영구 disabled.

각 emergence 독립 적용 — 다만 **cascade_from_card trigger는 다른 emergence의 fire 상태를 precondition으로 요구**:
- e-8 cascade ← dc-3 (Cycle 2에서 fired된 "이준호의 비밀 개인 계좌" 단서)
- e-9 cascade ← e-8 (본 cycle 1번 emergence)
- dc-8 cascade ← e-9 (본 cycle 2번 emergence)
- h-d4 cascade ← dc-8 (본 cycle 3번 emergence)

cascade chain (전체):
```
[d-2 S5 = 비자금 사용처=형 자백 완료 — Cycle 2 영역]
  ↓
dc-3 (이준호의 비밀 개인 계좌, Cycle 2) ──→ e-8 (휴대폰 의학 검색)
                                            ↓
                                          e-9 (보험사 견적)
                                            ↓
                                          dc-8 (이준호의 또 다른 침묵)
                                            ↓
                                          h-d4 (비자금의 원래 목적)
```

---

### Emergence 1: **e-8** (증거 — 휴대폰 의학 검색 기록) — 4 trigger / 13 entry

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`, priorCard: dc-3]

**선결조건:**
- `dc-3` ("이준호의 비밀 개인 계좌") 이미 fired (Cycle 2 자금 line)
- d-2 lieState ≥ S5 (비자금 사용처 = 형 자백 완료)
- e-3 (통화기록) Original 도달 (게임 시작부터 노출)

**Narrative scenario:**
- 컨텍스트: d-2 자백 후 사용자가 자금 chain 정리 중. 재판관이 비밀 계좌의 10년 누적 패턴 정리 중 휴대폰 검색 정합 발견
- 발동 흐름 (~6초): 재판관 자발 분석 mention (dc-3 reference) → B 짧은 회피 답변 → 재판관 e-8 surface 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e8-via-cascade-judge-mention-v1` | 재판관 | B | 자발 분석 (dc-3 reference) | 2 문장 | 격식·분석적 |
| `emerge-e8-via-cascade-b-response-v1` | B | 재판관 | 회피적 짧은 답변 | 1 문장 | 회피·말끝 흐림 |
| `emerge-e8-via-cascade-judge-decree-v1` | 재판관 | 전체 | e-8 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 재판관 cascade mention: "앞서 확인된 [이준호의 비밀 개인 계좌]의 10년 누적 흐름이 형 관련 자금 사용 시점보다 먼저 시작됩니다. **본 법정은 같은 시기 이준호 씨 휴대폰의 의학 영역 검색 기록을 함께 검토하겠습니다.**" — dc-3 직접 reference 필수, "형 사건" 직접 단어 회피 ("형 관련 자금 사용 시점")
- B response: "그건… 일반적인 정보 검색이라서…" (말끝 흐림, 한 박자 늦게)
- 재판관 decree: "본 법정에 [이준호 씨 휴대폰의 의학 검색 기록]을 자료로 등재합니다."

#### Trigger 2 — 박지연 끼어들기 [type: `npc_interjection`, source: a]

**선결조건:**
- d-2 lieState ≥ S5
- A distrust ≥ 50
- 활성 액션: 사용자가 B에게 fact_pursuit 질문 중

**Narrative scenario:**
- 컨텍스트: B가 자금 흐름에 대해 회피 답변 중 → A가 휴대폰 검색 기록을 외도 단서로 직접 추궁
- 발동 흐름 (~8초): A 끼어들기 (산부인과 검색 단정) → 재판관 reactive query → A 보강 답변 → 재판관 e-8 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e8-via-a-interject-v1` | A | 재판관 | 끼어들기 (외도 frame 단정) | 1~2 문장 | 격앙·결단 |
| `emerge-e8-via-a-interject-judge-react-v1` | 재판관 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-e8-via-a-interject-a-response-v1` | A | 재판관 | 보강 답변 | 1~2 문장 | 격앙→확신 |
| `emerge-e8-via-a-interject-judge-decree-v1` | 재판관 | 전체 | e-8 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject (외도 frame 강화 — 본 cycle 핵심 frame 충돌): "재판관님. **남편 휴대폰에 산부인과 검색이 한두 번이 아닙니다. 형 일로 모은 돈이라면서 왜 그런 검색을 그렇게 했는지 설명해야 합니다.**"
- 재판관 react: "박지연 씨, 그 휴대폰의 검색 기록을 본 법정에 제출할 수 있겠습니까?"
- A response: "예. 검색 시각이 새벽까지 이어진 기록도 따로 정리해 두었습니다." (외도 frame "새벽" 보강)
- 재판관 decree: "본 법정에 [이준호 씨 휴대폰의 의학 검색 기록]을 자료로 등재합니다."

#### Trigger 3 — 이준호 감정 돌발 [type: `emotional_outburst`, source: b]

**선결조건:**
- d-2 lieState ≥ S5
- B emotional phase ∈ ['shaken', 'angry']
- 활성 액션: A의 외도 frame 추궁 후 / B 추궁 누적 4회 이상

**Narrative scenario:**
- 컨텍스트: B가 자금 자백 후 추가 추궁 부담 누적. 외도 frame을 부정하기 위해 자기 휴대폰 직접 제시 (역설적 surface)
- 발동 흐름 (~9초): B 격앙 자기 제시 → 재판관 catch → B 짧은 위축 답변 → 재판관 e-8 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e8-via-b-outburst-v1` | B | 재판관/A | 자기 제시형 격앙 | 1~2 문장 | 격앙·자기방어 |
| `emerge-e8-via-b-outburst-judge-catch-v1` | 재판관 | B | catch | 1 문장 | 격식·신중 |
| `emerge-e8-via-b-outburst-b-admit-v1` | B | 재판관 | 짧은 위축 답변 | 1 문장 | 위축·체념 |
| `emerge-e8-via-b-outburst-judge-decree-v1` | 재판관 | 전체 | e-8 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (자기 방어형 폭로 — 역설적 진실 우회 노출): "**제 휴대폰 보세요. 검색 기록 전부 봐도 됩니다.** 형 일로 모은 돈이라고 했지, 다른 일은 없습니다." — "다른 일 없다" frame B 자기 부정 (실제로는 다른 일이 있음 — 진실 우회)
- 재판관 catch: "이준호 씨, 본인이 휴대폰 검색 기록을 직접 제시하시는 겁니까?"
- B admit: "…재판관님이 직접 보시면 알 일입니다." (위축 후 체념)
- 재판관 decree: "본 법정에 [이준호 씨 휴대폰의 의학 검색 기록]을 자료로 등재합니다."

#### Trigger 4 — 재판관 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-2 lieState ≥ S5 + dc-3 fired + 5턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e8-via-judge-auto-decree-v1` | 재판관 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-e8-via-judge-auto-b-respond-v1` | B | 재판관 | 짧은 응답 | 1 문장 | 무표정·시인 |

**가이드:**
- 재판관 auto: "비자금의 10년 누적 흐름을 살피던 중 같은 시기 이준호 씨 휴대폰의 의학 영역 검색 기록이 확인되었습니다. **본 법정은 그 검색 기록을 자료에 추가합니다.**"
- B respond: "예, 받아들이겠습니다."

**e-8 total: 3 + 4 + 4 + 2 = 13 entry**

---

### Emergence 2: **e-9** (증거 — 보험사 견적 자료 / 가입 X) — 4 trigger / 12 entry

#### Trigger 1 — 증거 cascade [type: `cascade_from_card`, priorCard: e-8]

**선결조건:**
- `e-8` (휴대폰 의학 검색) 이미 fired
- d-2 lieState ≥ S5

**Narrative scenario:**
- 컨텍스트: e-8 surface 후 재판관이 같은 시기 보험 견적 자료 검토 가능성 mention
- 발동 흐름 (~7초): 재판관 자발 cascade (e-8 reference + 보험 영역 mention) → B 회피 답변 → 재판관 e-9 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e9-via-cascade-judge-mention-v1` | 재판관 | 전체 | 자발 cascade (e-8 reference) | 2 문장 | 격식·분석적 |
| `emerge-e9-via-cascade-b-response-v1` | B | 재판관 | 회피적 답변 | 1 문장 | 회피·짧음 |
| `emerge-e9-via-cascade-judge-decree-v1` | 재판관 | 전체 | e-9 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 재판관 cascade mention: "앞서 확인된 [이준호 씨 휴대폰의 의학 검색 기록]에 보험 관련 검색이 다수 포함되어 있습니다. **본 법정은 같은 시기 이준호 씨 명의의 보험 상담 자료가 있는지 확인하겠습니다.**" — e-8 직접 reference, "수익자" 등 외도 frame 직접 surface 회피 (재판관은 중립)
- B response: "그건… 견적만 받았고 가입한 적은 없습니다." (사실 직접 surface — 가입 0건 frame 미리 surface)
- 재판관 decree: "본 법정에 [이준호 씨의 보험사 견적 자료]를 자료로 등재합니다."

#### Trigger 2 — 박지연 끼어들기 (외도 frame 강화) [type: `npc_interjection`, source: a]

**선결조건:**
- e-8 fired
- A distrust ≥ 50
- 활성 액션: B에게 evidence_present 또는 fact_pursuit 중

**Narrative scenario:**
- 컨텍스트: e-8 추궁 중 A가 보험 수익자 외도 frame으로 직접 추궁 → 재판관 reactive
- 발동 흐름 (~8초): A 끼어들기 (수익자 외도 단정) → 재판관 reactive query → A 보강 답변 → 재판관 e-9 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e9-via-a-interject-v1` | A | 재판관 | 끼어들기 (외도 frame — 수익자 의심) | 1~2 문장 | 격앙·결단 |
| `emerge-e9-via-a-interject-judge-react-v1` | 재판관 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-e9-via-a-interject-a-response-v1` | A | 재판관 | 보강 답변 | 1~2 문장 | 격앙→확신 |
| `emerge-e9-via-a-interject-judge-decree-v1` | 재판관 | 전체 | e-9 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject (외도 frame 강화 — 수익자 의심 직접 surface): "재판관님. **남편이 보험을 여러 곳에서 알아본 적이 있어요. 견적서를 본 적 있는데 수익자 칸이 공란이었어요.** 누구를 위해 알아본 건지 직접 들어야겠습니다." — "수익자" frame 직접 surface (A의 외도 의심 강화 정점)
- 재판관 react: "박지연 씨, 그 견적 자료를 본 법정에 제출할 수 있겠습니까?"
- A response: "예. 견적서 사본을 가지고 있습니다. 보장 항목까지 한 번 확인해 봐 주십시오."
- 재판관 decree: "본 법정에 [이준호 씨의 보험사 견적 자료]를 자료로 등재합니다."

#### Trigger 3 — 이준호 자기 제출 (역설적 자기방어) [type: `npc_interjection`, source: b]

**선결조건:**
- e-8 fired
- B emotional phase ∈ ['defensive', 'shaken']
- 활성 액션: A의 외도 frame 추궁 직후

**Narrative scenario:**
- 컨텍스트: A의 수익자 의심 frame 강화에 B가 직접 견적 자료 제출 ("외도였으면 가입했지") — 역설적으로 가입 0건 frame B 자기 surface
- 발동 흐름 (~8초): B 자기 제출 → 재판관 receive → B 부연 (가입 0건 강조) → 재판관 e-9 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e9-via-b-submit-v1` | B | 재판관 | 자기 제출 (가입 0건 frame) | 1~2 문장 | 격앙·자기방어 |
| `emerge-e9-via-b-submit-judge-react-v1` | 재판관 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-e9-via-b-submit-judge-decree-v1` | 재판관 | 전체 | e-9 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B submit (자기 방어 폭로 — 진실 우회): "**견적서 그거 제가 직접 제출하겠습니다.** 외도였으면 진작 가입했죠. 견적만 받고 가입은 한 번도 안 했습니다." — "외도였으면 가입했지" frame B 자기 방어, 가입 0건 사실 surface (역설적으로 진실 frame 단서 누설)
- 재판관 react: "이준호 씨, 그 견적 자료에 가입 흔적이 없다는 사실이 본 법정에 의미 있는 자료입니다."
- 재판관 decree: "본 법정에 [이준호 씨의 보험사 견적 자료]를 자료로 등재합니다."

#### Trigger 4 — 재판관 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + e-8 fired + 3턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e9-via-judge-auto-decree-v1` | 재판관 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-e9-via-judge-auto-b-respond-v1` | B | 재판관 | 짧은 응답 | 1 문장 | 무표정·시인 |

**가이드:**
- 재판관 auto: "휴대폰 검색 영역에 보험 관련 검색이 다수 포함된 사실이 확인됐습니다. **본 법정은 이준호 씨 명의의 보험 상담 자료를 자료에 추가합니다.**"
- B respond: "예, 받아들이겠습니다."

**e-9 total: 3 + 4 + 3 + 2 = 12 entry**

---

### Emergence 3: **dc-8** (단서 — 이준호의 또 다른 침묵) — 4 trigger / 13 entry

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`, recipeId: combine-7]

**선결조건:**
- 사용자가 `combine-7` (e-8 + e-9 → dc-8) 조합 실행
- e-8 Original + e-9 Original 도달
- d-2 lieState ≥ S5

**Narrative scenario:**
- 컨텍스트: 사용자가 두 증거 조합 → 단서 "두 자료가 같은 시기·같은 의학 영역으로 묶임" 부상
- 발동 흐름 (~9초): 조합 결과 표시 → 재판관 분석 query (frame 충돌 직접 surface) → B 회피 답변 → A frame 단정 → 재판관 dc-8 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc8-via-combo-judge-query-v1` | 재판관 | B | 분석 결과 발언 (frame 충돌 surface) | 2 문장 | 격식·발견적 |
| `emerge-dc8-via-combo-b-response-v1` | B | 재판관 | 회피적 짧은 답변 | 1 문장 | 회피·말끝 흐림 |
| `emerge-dc8-via-combo-a-react-v1` | A | 재판관 | 단정 보강 (외도 frame) | 1 문장 | 격앙·확신 |
| `emerge-dc8-via-combo-judge-decree-v1` | 재판관 | 전체 | dc-8 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 재판관 query (frame 충돌 직접 mention): "휴대폰의 의학 영역 검색과 보험 견적 상담이 같은 시기·같은 영역으로 묶입니다. **형 관련 자금 사용 영역과는 분리된 준비입니다.** 이 자료들의 공통 목적을 설명해 주십시오." — frame 충돌 surface, "난임" "치료비" 절대 X
- B response: "그건… 따로 설명드릴 일이 아닙니다…" (말끝 흐림, 회피 강화)
- A react: "재판관님, 이건 외도 상대 임신을 대비한 준비가 분명합니다." (외도 frame 정점 — h-d4 직전 결정적 단정)
- 재판관 decree: "본 법정에 [이준호의 또 다른 침묵] 단서를 정식 등재합니다."

#### Trigger 2 — 증거 cascade [type: `cascade_from_card`, priorCard: e-9]

**선결조건:**
- `e-9` 이미 fired
- d-2 lieState ≥ S5
- (combine-7 미실행 영역도 가능 — 사용자가 조합 안 했어도 e-9 cascade로 dc-8 자동 surface)

**Narrative scenario:**
- 컨텍스트: e-9 surface 후 재판관이 두 자료의 같은 시기·같은 영역 정합을 자발 분석 → dc-8 surface
- 발동 흐름 (~7초): 재판관 자발 cascade mention → B 회피 답변 → 재판관 dc-8 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc8-via-cascade-judge-mention-v1` | 재판관 | 전체 | 자발 cascade (e-9 reference) | 2 문장 | 격식·분석적 |
| `emerge-dc8-via-cascade-b-response-v1` | B | 재판관 | 회피적 답변 | 1 문장 | 회피·짧음 |
| `emerge-dc8-via-cascade-judge-decree-v1` | 재판관 | 전체 | dc-8 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 재판관 cascade mention: "앞서 등재된 [이준호 씨의 보험사 견적 자료]와 [이준호 씨 휴대폰의 의학 검색 기록]이 같은 시기·같은 영역으로 묶입니다. **본 법정은 두 자료의 공통 영역을 단서로 정리합니다.**" — e-9 + e-8 reference 모두 필수
- B response: "그건… 우연이 겹친 것뿐입니다…" (회피)
- 재판관 decree: "본 법정에 [이준호의 또 다른 침묵] 단서를 정식 등재합니다."

#### Trigger 3 — 이준호 감정 돌발 [type: `emotional_outburst`, source: b]

**선결조건:**
- e-9 fired
- B emotional phase ∈ ['shaken', 'angry']
- 활성 액션: A의 외도 frame 추궁 누적 후

**Narrative scenario:**
- 컨텍스트: A의 외도 frame 추궁 누적에 B의 부담 폭발 → frame 충돌 자기 surface ("그게 아니라!") → 재판관 catch → dc-8 surface
- 발동 흐름 (~9초): B 격앙 외침 → 재판관 catch → B 위축 → 재판관 dc-8 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc8-via-b-outburst-v1` | B | A/재판관 | 격앙 외침 (frame 충돌) | 1~2 문장 | 격앙·체념 |
| `emerge-dc8-via-b-outburst-judge-catch-v1` | 재판관 | B | catch | 1 문장 | 격식·신중 |
| `emerge-dc8-via-b-outburst-b-admit-v1` | B | 재판관 | 짧은 위축 답변 | 1 문장 | 위축·체념 |
| `emerge-dc8-via-b-outburst-judge-decree-v1` | 재판관 | 전체 | dc-8 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (frame 충돌 자기 surface — 진실 직전): "**그게 아닙니다! 외도하고는 다른 일이야!** 그 검색이랑 견적은… 다른 일이라고…" — "다른 일" frame B 자기 surface (난임 직접 단어 X), 부정·외침
- 재판관 catch: "이준호 씨, 그 '다른 일'이 무엇인지 본 법정에서 정리할 시점인 것 같습니다."
- B admit: "…죄송합니다. 지금은 더 말씀드리기 어렵습니다." (위축 후 체념 — h-d4 직전 마지막 침묵)
- 재판관 decree: "본 법정에 [이준호의 또 다른 침묵] 단서를 정식 등재합니다."

#### Trigger 4 — 재판관 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + e-9 fired + 4턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc8-via-judge-auto-decree-v1` | 재판관 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-dc8-via-judge-auto-a-respond-v1` | A | 재판관 | 짧은 응답 | 1 문장 | 무표정·동의 |

**가이드:**
- 재판관 auto: "두 자료의 공통 영역이 형 관련 자금 사용 영역과 분리됩니다. **본 법정은 [이준호의 또 다른 침묵]을 단서로 등재합니다.**"
- A respond: "예, 받아들이겠습니다."

**dc-8 total: 4 + 3 + 4 + 2 = 13 entry**

---

### Emergence 4: **h-d4** (쟁점 — 비자금의 원래 목적) — 4 trigger / 13 entry — **본 cycle 가장 민감 / 신규 진실 surface**

> ⚠ **본 emergence는 진실 노출 정책의 최정점**. h-d4 fire 시점이 박지연 난임/치료비/난임 진단/출산 가능성 키워드의 **최초 surface 시점**.
> 모든 trigger entry는 h-d4 부상 자체를 표현하되, B 자백 단어 직접 surface는 **B emotional_outburst (4-b) 1개에만 한정** (다른 3개는 frame 충돌 직면까지만 — 단어는 fallback 이후 dispatch).

#### Trigger 1 — 단서 cascade [type: `cascade_from_card`, priorCard: dc-8]

**선결조건:**
- `dc-8` 이미 fired
- d-2 lieState ≥ S5

**Narrative scenario:**
- 컨텍스트: dc-8 surface 후 재판관이 단서의 진짜 목적을 직접 query → 새 쟁점 부상
- 발동 흐름 (~8초): 재판관 자발 cascade query → B 동요 답변 (직접 단어 회피) → 재판관 쟁점 부상 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd4-via-cascade-judge-query-v1` | 재판관 | B | 자발 cascade (dc-8 reference) | 2 문장 | 격식·발견적 |
| `emerge-hd4-via-cascade-b-response-v1` | B | 재판관 | 동요 답변 (직접 단어 회피) | 1~2 문장 | 회피·체념 |
| `emerge-hd4-via-cascade-judge-decree-v1` | 재판관 | 전체 | 쟁점 부상 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 재판관 cascade query: "앞서 등재된 [이준호의 또 다른 침묵] 단서의 두 자료가 형 관련 자금 사용과는 별개 영역을 가리킵니다. **본 법정은 비자금의 원래 목적이 무엇이었는지를 새 쟁점으로 정리합니다.**" — dc-8 reference, 단어 "난임" "치료비" 절대 X
- B response: "그건… 처음엔 다른 목적이 있었습니다. 지금은… 그 이상 말씀드리기 어렵습니다." (간접 인정만, 단어 회피)
- 재판관 decree: "본 법정에 [비자금의 원래 목적] 쟁점을 정식 부상시킵니다."

#### Trigger 2 — 이준호 자기 자백 폭발 [type: `emotional_outburst`, source: b] — **유일하게 진실 단어 직접 surface 허용 trigger**

**선결조건:**
- dc-8 fired
- B emotional phase ∈ ['resigned', 'shaken']
- 활성 액션: A의 frame 충돌 추궁 직후

**Narrative scenario:**
- 컨텍스트: A의 외도 frame 추궁 정점 → B의 마지막 침묵 깨짐 → 박지연 난임 + 치료비 frame 자기 직접 자백 → 재판관 catch → 쟁점 부상
- 발동 흐름 (~12초, 강한 감정 VFX): B 자백 폭발 → 재판관 catch → B 보충 자백 (책임 frame B 70 surface) → 재판관 쟁점 부상 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd4-via-b-outburst-v1` | B | A | 자백 폭발 (난임/치료비 직접 surface) | 2~3 문장 | 격앙→체념·자기 인정 |
| `emerge-hd4-via-b-outburst-judge-catch-v1` | 재판관 | B | catch | 1 문장 | 격식·신중 |
| `emerge-hd4-via-b-outburst-b-admit-more-v1` | B | 재판관 | 보충 자백 (책임 B 70 frame) | 1~2 문장 | 회한·자기 인정 |
| `emerge-hd4-via-b-outburst-judge-decree-v1` | 재판관 | 전체 | 쟁점 부상 선언 | 1 문장 | 격식·확정 |

**가이드 (**가장 민감 — 진실 노출 정점**):**
- B outburst (자기 자백 폭발 — 박지연 난임/치료비 + 신혼 초기 + 의사 친구 직접 surface 허용): "**자기야… 그 돈은 처음엔 자기 거였어.** 신혼 초기에 난임 진단 받고 자기가 출산 화제를 닫은 뒤로 나 혼자 의사 친구한테 물어보고, 치료비랑 보장 견적 알아본 거야. **형 일 생기기 전부터 모은 돈이야.**" — **부부 직접 발화 "자기야" + 반말** (S5 자백 영역 호칭 정책), 진실 단어 직접 surface ("난임 진단" "출산 화제 닫은" "의사 친구" "치료비")
- 재판관 catch: "이준호 씨, 본인이 직접 그 사실을 본 법정에 진술하시는 것입니까?"
- B admit-more (책임 B 70 frame): "예. 자기한테 한 번도 말 안 한 채로 혼자 결정해 왔습니다. 그게 제 잘못입니다." — "자기" 반말 유지, 책임 self-admission
- 재판관 decree: "본 법정에 [비자금의 원래 목적] 쟁점을 정식 부상시킵니다."

#### Trigger 3 — 박지연 frame 충돌 직면 [type: `npc_interjection`, source: a] — **외도 frame 마지막 단정 추궁**

**선결조건:**
- dc-8 fired
- A emotional phase ∈ ['shaken', 'angry']
- 활성 액션: dc-8 surface 직후

**Narrative scenario:**
- 컨텍스트: dc-8 단서 surface 후 A의 frame 충돌 직면 → 외도 단정 마지막 추궁 ("그럼 도대체 뭐였어?") → 재판관 reactive → B 동요 답변 (단어 직접 surface는 회피, 다음 turn 영역 양보) → 쟁점 부상
- 발동 흐름 (~10초): A 추궁 (외도 frame 마지막 직면) → 재판관 reactive query → B 동요 답변 → 재판관 쟁점 부상 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd4-via-a-confront-v1` | A | B | 외도 frame 마지막 직면 추궁 | 2 문장 | 격앙·결단 |
| `emerge-hd4-via-a-confront-judge-react-v1` | 재판관 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-hd4-via-a-confront-b-response-v1` | B | 재판관/A | 동요 답변 (단어 회피, 간접 인정) | 1~2 문장 | 동요·회피 |
| `emerge-hd4-via-a-confront-judge-decree-v1` | 재판관 | 전체 | 쟁점 부상 선언 | 1 문장 | 격식·확정 |

**가이드 (사용자 1단계 4-c 검토 시 전면 승인 — "그럼 이건 다 뭐야? 외도가 아니라면 도대체 뭐였어?" 추궁 수위 유지):**
- A confront (외도 frame 마지막 단정 — h-d4 직전 결정적 직면): "**자기야, 그럼 이건 다 뭐야? 형 일도 아니고 외도도 아니라면, 도대체 뭐였어?** 처음부터 다른 이유가 있었지?" — **부부 직접 발화 "자기야" + 반말**, 외도 frame 마지막 단정 추궁 (수위 유지)
- 재판관 react: "이준호 씨, 박지연 씨의 질문에 답하실 수 있겠습니까?"
- B response (단어 회피, 간접 인정 — B outburst trigger와 다른 톤): "예… 처음엔 다른 목적이 있었습니다. 자세한 건… 다음에 말씀드리겠습니다." — 단어 회피, 다음 turn 양보 (4-c는 frame 직면까지만, 단어 surface는 후속 dispatch 영역)
- 재판관 decree: "본 법정에 [비자금의 원래 목적] 쟁점을 정식 부상시킵니다."

#### Trigger 4 — 재판관 자발 fallback (Batch 7 시안 재활용) [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + dc-8 fired + 5턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd4-via-judge-auto-decree-v1` | 재판관 | 전체 | 자발 정리 + 책임 split 차분 선언 | **3~4 문장 (긴 톤)** | 격식·중재·차분 |
| `emerge-hd4-via-judge-auto-b-respond-v1` | B | 재판관 | 짧은 응답 | 1 문장 | 무표정·시인 |

**가이드 — `batch7-reuse-spec.md` 정밀 명세 참조:**
- 재판관 auto (**Batch 7 mediation-h-d4-S4-responsibility-split-v1 톤 차용**): 원본 시안 4 문장 중 책임 split + 침묵 frame을 차분히 정리하되, **emergence 시점에 맞춰 단어 "난임 진단/치료비" 직접 surface 회피** (Batch 7 시안은 S4 mediation = h-d4 이미 부상 후 영역이지만 본 fallback은 h-d4 surface 시점 — 단어 surface는 후속 dispatch 영역). 단, 책임 split 톤("누가 더 상처받았는지 가르는 문제가 아닙니다 / 두 분 모두 말하지 않은 시간이 있습니다") 차분 차용.
- 예시 (참고용 — GPT Pro가 정밀 KO 작성): "본 법정은 비자금의 원래 목적이 형 관련 자금 사용과는 분리된 영역이라고 봅니다. 이 쟁점은 누가 더 상처받았는지를 가르는 문제가 아닙니다. **본 법정에 [비자금의 원래 목적] 쟁점을 정식 부상시키고, 두 분 모두에게 말씀하지 않은 시간을 정리할 기회를 드립니다.**" — Batch 7 톤 차용 + 단어 surface 회피
- B respond: "예, 받아들이겠습니다."

**h-d4 total: 3 + 4 + 4 + 2 = 13 entry**

---

**Cycle 4 grand total: 13 + 12 + 13 + 13 = 51 entry**

---

## §3. `cascade_from_card` trigger spec (Cycle 2 도입, 본 cycle 5/16 사용 — 가장 광범위)

**Trigger 정의:** 이전 emergence(사건 카드 또는 증거)가 이미 fire된 상태에서, 그 narrative line의 자연 연속으로 다음 entity가 등장.

**Schema field:**

```typescript
{
  requirePriorCardFired?: string  // dossierCardId | evidenceId — fire 상태여야 할 prior entity
}
```

**Tag spec (모든 cascade_from_card entry):**

```
"trigger:cascade_from_card"
"priorCard:<entityId>"  // 예: "priorCard:dc-3" / "priorCard:e-8" / "priorCard:e-9" / "priorCard:dc-8"
```

본 cycle cascade chain:
- e-8 cascade: priorCard:dc-3 (Cycle 2 자금 line 단서)
- e-9 cascade: priorCard:e-8
- dc-8 cascade: priorCard:e-9
- h-d4 cascade: priorCard:dc-8

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 의 `emergence_narrative` channel.entries 배열에 추가.
기존 13 entry 패턴 동일 (`emerge-e-5`, `emerge-e-7`, `emerge-dc-3` 등).

```json
{
  "key": "emerge-e-8",
  "evidenceId": "e-8",
  "variants": [
    {
      "id": "emerge-e8-via-cascade-judge-mention-v1",
      "text": "{KO 시안}",
      "behaviorHint": "{선택 — 발화자의 행동/표정 힌트}",
      "tags": [
        "channel:emergence_narrative",
        "speaker:judge",
        "speakerRole:judge",
        "listener:b",
        "listenerRole:party",
        "address:toParty",
        "scope:all_present",
        "register:formal",
        "honorific:formal",
        "audience:single",
        "tense:present",
        "relationship:spouse",
        "callTerm:이준호_씨",
        "callTermState:defined",
        "emotion:measured",
        "continuity:reactive_query",
        "reveal:none",
        "disclosure:guarded",
        "responseMode:judge_formal_prompt",
        "questionType:fact_check",
        "trigger:cascade_from_card",
        "priorCard:dc-3",
        "emergence:e-8"
      ]
    }
  ]
}
```

**entry key 형식 (entity-level, 4개):**
- `emerge-e-8` (evidenceId: e-8)
- `emerge-e-9` (evidenceId: e-9)
- `emerge-dc-8` (dossierId: dc-8)
- `emerge-h-d4` (disputeId: h-d4)

**variant id 형식 (entityId-no-dash + via + triggerSuffix + v{N}):**
- e-8 → `emerge-e8-via-{trigger}-...-v1`
- e-9 → `emerge-e9-via-{trigger}-...-v1`
- dc-8 → `emerge-dc8-via-{trigger}-...-v1`
- h-d4 → `emerge-hd4-via-{trigger}-...-v1`

**Tag 명세 (필수 set):**
- `channel:emergence_narrative`
- `speaker:{a|b|judge}` / `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}` / `listenerRole:{judge|party|all}`
- `register:formal` (재판관 격식 환경 — 본 batch 전부)
- `honorific:formal`
- `relationship:spouse`
- 호칭: `callTerm:박지연_씨` / `callTerm:이준호_씨` / `callTerm:자기` (S5 자백 영역) / `judgeAddress:재판관님` (해당 시)
- `callTermState:defined`
- `emotion:{measured|charged|broken|tense}`
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{e-8|e-9|dc-8|h-d4}` — 대상 emergence ID
- **cascade_from_card 전용**: `priorCard:{entityId}` 추가
- **combination_result 전용**: `comboRecipeId:combine-7` 추가 (dc-8 T1만)
- `reveal:{none|partial|full}` — h-d4 4-b outburst만 `reveal:full` (단어 직접 surface 영역), 나머지 `reveal:none` 또는 `reveal:partial`
- `disclosure:{guarded|opening|disclosed}` — frame 단계별

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. "…십시오", "…습니다" 종결. 단정·강압 회피. **평가 어휘 X** ([[feedback_judge_dispassionate_action_focused]]) — "외도라니까", "거짓말" 등 X → "관련 자료", "동일 시기 같은 영역" frame
- **A (박지연)**: 격앙·결단·확신. cascade trigger에서는 차분 동의, 끼어들기에서는 격앙. **본 cycle 영역에서는 외도 frame 강화 정점 (e-8 a-interject / e-9 a-interject / dc-8 a-react / h-d4 a-confront) → h-d4 발현 후 frame 역전 직면**
- **B (이준호)**: 회피→흘림→체념. **h-d4 b-outburst (4-b)에서만 자백 폭발 — 그 외엔 회피·말끝 흐림·자기 방어 일관**
- 다른 spouse-01 entry와 호명·종결 일관 (재판관님, 박지연 씨, 이준호 씨)
- **부부 직접 발화 (h-d4 b-outburst + h-d4 a-confront)는 "자기야/여보/당신" + 반말** ([[design_spouse01_truth_disclosure_policy]] + S5 자백 영역) — 그 외 trigger는 재판관 격식 환경 ("박지연 씨/이준호 씨" + 격식)

### `feedback_natural_korean_npc_active_voice.md` 5 차원 적용:
- 강력 어휘 완화 / 모호 referent 명확 동사구 / 피동 회피 / 직역체 내면 발화 / 자연 완충재

### `feedback_self_reference_speaker_context.md` 정밀:
- NPC 1인칭 자기 발화에 "본인" X → "저/제"
- 단, 제3자가 NPC 가리킬 때는 "본인" 자연

### `feedback_family_address_speaker_perspective.md` 정밀:
- **B(이준호) 발화에서 자기 가족을 "시댁/시댁 가족"으로 부르면 X** → "우리 형/형/형네" 자기 시점만 (본 cycle은 형 직접 단어 surface가 d-2 S5 자백 영역으로 OK)
- B가 박지연 가리킬 때 부부 직접 발화는 "자기/자기야" (S5 자백 영역)
- A(박지연) 발화에서 B 가족 언급은 본 cycle 영역 외 (영역 surface X)

---

## §6. 진실 노출 경계 — **본 cycle 가장 위험 영역**

`design_spouse01_truth_disclosure_policy.md` 권위 엄격 준수.

### h-d4 line **신규 hidden 영역** (h-d4 fire 전까지 surface 절대 X):

다음 키워드는 **h-d4 b-outburst (4-b) 단 1개 trigger의 entry에만 surface 허용**:
- "박지연 난임 / 난임 진단 / 난임 치료비"
- "출산 가능성 / 출산 화제 / 출산 포기"
- "의사 친구 / 비공식 상담"
- "보장 견적 / 의료비 견적" (보험 자체는 S2부터 surface OK, 의료비 보장 영역 단어는 frame 충돌 surface 후만)
- "신혼 초기 / 10년 가까이 모은"

다른 모든 trigger entry (e-8 4 trigger / e-9 4 trigger / dc-8 4 trigger / h-d4 4-a/4-c/4-d)에서는:
- 허용 frame 단어: "의학 영역 검색 / 산부인과 검색 / 여성 질환 검색 / 보험 견적 / 가입 0건 / 같은 시기 / 같은 영역 / 분리된 준비 / 형 관련 자금 사용 영역"
- A의 외도 frame 단정 발화는 자연 — "외도 상대 임신 / 수익자 공란 / 새벽 검색" 등 A 측 의심 frame surface OK

### h-d4 fire 후 (S5 자백 영역):
- 모든 키워드 surface 가능 (b-outburst v1만 해당)

### 기존 hidden 영역 (Cycle 2/3 영역, 본 cycle 영향 X):
- "친형 / 형 오피스텔 / 조카 / 중2 / 개인회생" — d-2 S5 자백 영역이므로 본 cycle 시점에 등장 가능 (그러나 본 cycle entry에서는 가급적 minimal 표현 — "형 관련 자금 사용 시점", "형 일 생기기 전부터" 등)
- "외도 / 외도 의심" — A 측 frame으로 surface OK (외도 frame 강화 → 역전이 본 cycle 핵심)

### 호명 정책 본 cycle 특수:
- e-8 / e-9 / dc-8 / h-d4(4-a / 4-c judge react / 4-d) → **재판관 격식 환경**: "박지연 씨" / "이준호 씨"
- h-d4 4-b (B outburst 자백) → **부부 직접 발화**: B → A 호명 = "자기" (반말), B 자기 1인칭 = "나/저"
- h-d4 4-c (A confront) → **부부 직접 발화**: A → B 호명 = "자기" (반말), A 자기 1인칭 = "나/저"

---

## §7. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 51 KO entry 작성 (JSON 파일 `output-cycle4-hd4-line.json`)
2. 사용자 spot check (5~10분, 특히 **h-d4 b-outburst (4-b) 단어 surface 확인 + h-d4 a-confront (4-c) 외도 frame 마지막 수위 확인**)
3. Claude가 `src/data/scriptedText/spouse-01.json` emergence_narrative channel.entries 배열에 4 entry 추가 + tags 정합 검증 + tag set 일관성 확인
4. Claude가 4 entity narrativeTriggers 부착:
   - e-8 evidence (spouse-01.case.ts L1942~) — `narrativeTriggers: e8NarrativeTriggers`
   - e-9 evidence (spouse-01.case.ts L1991~) — `narrativeTriggers: e9NarrativeTriggers`
   - dc-8 dossier (spouse-01.case.ts L2569~) — `narrativeTriggers: dc8NarrativeTriggers`
   - h-d4 dispute (spouse-01.case.ts L1270~) — `narrativeTriggers: hd4NarrativeTriggers`
5. spouse-01.narrative.ts에 4 export const 추가 (Cycle 2/3 패턴 동일)
6. tsc + build + **qa:fast PASS 필수** ([[design_core_narrative_cycle_procedure]] 6단계 권위)
7. Codex 다국어 sync 의뢰서 작성 (별도 self-contained 폴더, 51 entry × 3 lang = 153 entry)
8. commit + push

---

## §8. 본 cycle 진행 메모

- **Cycle 4는 h-d4 line 단일 집중** — Cycle 2(자금 line) + Cycle 3(외도 line) 모두 완료 후, **plot 재설계로 신설된 신규 영역의 narrative wrapper**
- **cascade chain 4단계 (가장 긴 chain)** — dc-3 (Cycle 2) → e-8 → e-9 → dc-8 → h-d4. 단일 plot line 응집 narrative
- **frame 충돌 정점 영역** — A 외도 frame 강화 (e-8 → e-9 → dc-8) → h-d4 결정적 역전. 본 cycle은 narrative emotional payoff 영역
- **진실 노출 위험도 최정점** — 박지연 난임/치료비/출산 가능성 키워드는 h-d4 b-outburst 1개 entry에만 surface. GPT Pro 작성 후 사용자 spot check 5단계에서 단어 surface 영역 집중 검토
- **부부 직접 발화 영역 도입** — h-d4 4-b + 4-c entry는 부부 반말 ("자기야") 영역. 재판관 격식 환경과 단어 분리 필요
- **Batch 7 시안 재활용** — h-d4 4-d (judge_auto_mention) 1 entry 영역에 Batch 7 mediation v1 톤 차용. 자세한 적용 명세는 `batch7-reuse-spec.md` 참조
- 다음 cycle (Cycle 5+ = spouse-01 Cycle 5 영역 또는 다른 사건 영역) 진입 전 본 cycle 완전 종료 (cycle 단위 세션 이관 정책)

# GPT Pro 의뢰서 — spouse-01 Cycle 3: 외도 line emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 4 emergence (e-4 / dc-1 / w-1 / dc-2) 의 multi-trigger narrative ScriptedText KO 시안 — **총 52 entry**

---

## §0. 권위 메모리 (정독 필수 — 본 폴더에 모두 복사돼 있음)

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차
- `design_narrative_cascade_from_card.md` — **cascade_from_card trigger 권위 (본 batch에서 4/16 trigger 사용)**
- `project_spouse01_event_timeline.md` — spouse-01 사건 흐름 timeline
- `feedback_natural_korean_npc_active_voice.md` — NPC 발화 자연화 5 차원
- `feedback_judge_question_quality.md` — 재판관 질문 품질
- `design_spouse01_truth_disclosure_policy.md` — **진실 노출 정책 (본 cycle 가장 위험 영역 — §6 참조)**
- `design_core_case_derive_hybrid_merge.md` — Core System derive 권위
- `feedback_self_reference_speaker_context.md` — 자기지시 정밀
- `feedback_family_address_speaker_perspective.md` — **신규 — 본인 가족 호칭 자기 시점 정책**

톤 reference: `spouse01-tone-samples.md`

---

## §1. 사건 context

**spouse-01** = 박지연(A, 원고/claimant) vs 이준호(B, 피고/defendant) 부부 분쟁.

### Cycle 3 영역 = 외도 line (d-1)

| 쟁점 | 표면 | 진실 |
|---|---|---|
| **d-1** | A: 남편이 매일 오피스텔에 들르고 새벽까지 전화. 외도 의심 | B: 친형 오피스텔에서 조카(중2) 돌봄 + 형과의 긴급 연락. 시댁 갈등 공포로 침묵 |

### d-1 시간축 (lieState 진행)

| State | A 측 frame | B 측 진술 |
|---|---|---|
| **S0** | "외도 단정" 강 | 부정으로 일관. 시댁/형/조카 회피 |
| **S1** | "정황상 의심" 완화 | "가족 쪽 일" 모호 표현 |
| **S2** | "외도 아니라도 가정 외부 자금" frame | "챙겨야 할 사람이 있다" — 형/회생 surface X |
| **S3** | "가족 쪽 정황 가능성" 부분 인정 | "형 사정 / 시댁 갈등" surface (조카·회생 회피) |
| **S4** | "외도 단정 본인 책임" 일부 수용 | "형 / 조카 / 회생 / 시댁 갈등 공포" 직접 인정 |
| **S5** | "가족 돌봄 + 단정 책임" 진실 완전 인정 | 모든 키워드 발화 가능 |

### Cycle 3 emergence 4개 등장 시점

| emergence | 등장 시점 | 의미 |
|---|---|---|
| **e-4** 발신자 미상 문자 | d-1 ≥ S1 + e-3 unlock | 통화기록 이후 같은 번호와의 문자 스레드 표면화 — 가족 정황 단서 |
| **dc-1** 오피스텔의 사람들 | d-1 ≥ S1 + B 공감/분리심문 누적 | 영수증·GPS·문자 정합 → 외도 frame 반전 첫 카드 |
| **w-1** 오피스텔 경비 | dc-1 발현 후 | 1주일 2~3번 방문 + 그 층 여자 혼자 거주 X 증언 가능 |
| **dc-2** 시댁 얘기만 나오면 싸움 | d-1 ≥ S2 + B 동기 추궁 누적 | B의 가족 keyword 회피 패턴 + 시댁 갈등 공포 동기 frame (cross-line: d-1 + d-2) |

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

**First-Fired-Wins**: 각 emergence는 trigger 후보 중 첫 발동만 fire. 나머지는 그 게임 동안 영구 disabled.

각 emergence 독립 적용 — 다만 **cascade_from_card trigger는 다른 emergence의 fire 상태를 precondition으로 요구**:
- e-4 cascade ← e-3 (e-3는 게임 시작부터 노출이므로 항상 만족)
- dc-1 cascade ← e-4 (e-4 발현 후만)
- w-1 cascade ← dc-1 (dc-1 발현 후만)
- dc-2 cascade ← dc-1 (dc-1 발현 후만)

---

### Emergence 1: **e-4** (증거 — 발신자 미상 문자) — 4 trigger / 13 entry

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `e-3` (통화기록) Original 도달 (게임 시작 시 노출)
- d-1 lieState ≥ S1 (A가 단정에서 한 발 물러난 시점 OR B가 "가족 쪽 일" 모호 표현 단계)

**Narrative scenario:**
- 컨텍스트: 사용자가 e-3 통화기록 분석 중 또는 B에게 e-3 제시 후
- 발동 흐름 (~6초): 판사 자발 분석 mention → B 짧은 부인 → 판사 e-4 surface 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e4-via-cascade-judge-mention-v1` | 판사 | B | 자발 분석 (e-3 reference) | 2 문장 | 격식·분석적 |
| `emerge-e4-via-cascade-b-response-v1` | B | 판사 | 회피적 짧은 부인 | 1 문장 | 회피·짧음 |
| `emerge-e4-via-cascade-judge-decree-v1` | 판사 | 전체 | e-4 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade mention (수정 반영): "앞서 등재된 [통화기록]을 검토하던 중, **같은 번호와 문자를 주고받은 정황이 확인되었습니다.** 그 문자 스레드를 본 법정에 정식 등재합니다." — e-3 직접 reference 필수
- B response: "그건… 그쪽 사정으로 온 문자라서…" 짧게 흘림
- 판사 decree: "본 법정에 [발신자 미상 문자]를 정식 등재합니다."

#### Trigger 2 — 박지연 끼어들기 [type: `npc_interjection`, source: a]

**선결조건:**
- d-1 lieState ≥ S1
- A distrust ≥ 50
- 활성 액션: 사용자가 B에게 evidence_present (e-3 등 통화 영역) 중

**Narrative scenario:**
- 컨텍스트: B가 통화에 대해 회피 답변 중 → A 분노 누적 → A 끼어들기
- 발동 흐름 (~8초): A 끼어들기 → 판사 reactive query → A 보강 답변 → 판사 e-4 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e4-via-a-interject-v1` | A | 판사 | 끼어들기 | 1~2 문장 | 격앙·결단 |
| `emerge-e4-via-a-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-e4-via-a-interject-a-response-v1` | A | 판사 | 보강 답변 | 1~2 문장 | 격앙→확신 |
| `emerge-e4-via-a-interject-judge-decree-v1` | 판사 | 전체 | e-4 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject: "재판관님, **통화만이 아닙니다. 그 번호로 문자도 자주 오갔어요.**" — 외부 시점 호칭/단정 회피, 사실 진술
- 판사 react: "박지연 씨, 그 문자 스레드를 본 법정에 제출할 수 있겠습니까?"
- A response: "예. 휴대폰 캡처본을 정리해 두었습니다. 통화 시각과도 겹칩니다."
- decree: trigger 1과 동일 form ("본 법정에 [발신자 미상 문자]를 정식 등재합니다.")

#### Trigger 3 — 이준호 끼어들기 [type: `npc_interjection`, source: b]

**선결조건:**
- d-1 lieState ≥ S1
- B가 가족 회피 발화 중 (B answer phase = 'defensive' or 'shaken')

**Narrative scenario:**
- 컨텍스트: B가 "가족 쪽 일" 모호 답변 중 → 무심코 "그쪽 사정" 단어 흘림 → A 즉시 추궁 → 판사 e-4 surface
- 발동 흐름 (~8초): B 흘림 → A 추궁 → B 시인 → 판사 e-4 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e4-via-b-interject-v1` | B | 판사 | 무심한 흘림 | 1 문장 | 회피·말끝 흐림 |
| `emerge-e4-via-b-interject-a-pursue-v1` | A | B | 즉시 추궁 | 1 문장 | 격앙·캐치 |
| `emerge-e4-via-b-interject-judge-decree-v1` | 판사 | 전체 | e-4 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "그건 그쪽 사정으로 오던 문자라서…" 짧게 흘리며 시선 떨굼
- A pursue: "**그쪽 사정?** 그게 무슨 말이에요? 그 번호 누구예요?"
- judge decree: "본 법정에 발신자 미상 문자 스레드를 정식 등재하고 다음 진행을 결정합니다."

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-1 lieState ≥ S1 + e-3 Original 도달 후 5턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e4-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-e4-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정·시인 |

**가이드:**
- 판사 auto (수정 반영): "전화 기록 검토 과정에서 같은 번호와의 문자 교신이 확인되었습니다. 전화 기록과 함께 **발신자 미상 문자를** 자료에 추가합니다."
- B respond: "예, 받아들이겠습니다."

**e-4 total: 3 + 4 + 3 + 2 = 12 entry**

---

### Emergence 2: **dc-1** (사건 카드 — 오피스텔의 사람들) — 4 trigger / 13 entry

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`, recipeId: combine-1]

**선결조건:**
- 사용자가 `combine-1` (e-1 영수증 + e-2 블랙박스 GPS → dc-1) 조합 실행
- e-1 Original + e-2 Original 도달
- d-1 lieState ≥ S1
- B에게 공감 접근 또는 분리심문 사용 누적

**Narrative scenario:**
- 컨텍스트: 사용자가 두 증거 조합 → 단서 "영수증 + GPS 정차가 단일 오피스텔 동선으로 묶임"
- 발동 흐름 (~9초): 조합 결과 표시 → 판사 분석 query → B 회피적 짧은 부인 → A frame 단정 → 판사 dc-1 surface 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-combo-judge-query-v1` | 판사 | B | 분석 결과 발언 | 2 문장 | 격식·발견적 |
| `emerge-dc1-via-combo-b-response-v1` | B | 판사 | 회피적 짧은 부인 | 1 문장 | 한 박자 늦은 부인 |
| `emerge-dc1-via-combo-a-react-v1` | A | 판사 | 단정 보강 발언 | 1 문장 | 격앙·확신 |
| `emerge-dc1-via-combo-judge-decree-v1` | 판사 | 전체 | dc-1 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query: "영수증과 GPS 정차 패턴이 같은 오피스텔 단일 동선으로 묶입니다. 이 정황의 사실 관계를 말씀해 주십시오."
- B response: "그건… 거기 다른 일이 있어서…" (말끝 흐림, 한 박자 늦은 답변)
- A react: "재판관님, 한 번도 들어보지 못한 이야기입니다. 외도 동선이 분명합니다."
- 판사 decree: "본 법정에 [오피스텔의 사람들] 사건 카드를 정식 등재합니다."

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`, priorCard: e-4]

**선결조건:**
- `e-4` (발신자 미상 문자) 이미 fired
- d-1 lieState ≥ S2 (A "가정 외부 자금" frame, B "챙겨야 할 사람" surface)
- (combine-1 미실행 영역도 가능 — 사용자가 조합 안 했어도 e-4 cascade로 dc-1 자동 surface)

**Narrative scenario:**
- 컨텍스트: e-4 등장 후 통화·문자·영수증·GPS 정합이 한 동선으로 모임을 판사가 분석
- 발동 흐름 (~7초): 판사 자발 cascade mention → A frame 보정 → 판사 dc-1 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-cascade-judge-mention-v1` | 판사 | 전체 | 자발 cascade (e-4 reference) | 2 문장 | 격식·분석적 |
| `emerge-dc1-via-cascade-a-response-v1` | A | 판사 | frame 보정 short remark | 1 문장 | 신중·자기방어 |
| `emerge-dc1-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-1 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade mention (수정 반영): "앞서 등재된 [발신자 미상 문자]가 영수증·GPS 정황과 함께 묶여 봅니다. **문자 스레드가 영수증·GPS 정황과 같은 시기로 연결됩니다.**" — e-4 직접 reference 필수
- A response: "그렇다고 해도, 지금까지 본 흔적만으로는 단순 외도라기엔 너무…" 자기 단정 frame 미세 보정
- decree: trigger 1과 동일 form

#### Trigger 3 — 이준호 끼어들기 [type: `npc_interjection`, source: b]

**선결조건:**
- d-1 lieState ≥ S2
- B emotional phase ∈ ['defensive', 'shaken']

**Narrative scenario:**
- 컨텍스트: B가 외도 단정에 대해 회피 중. 무심코 "다른 사정"으로 둘러대다 판사 reactive
- 발동 흐름 (~9초): B 끼어듦 → 판사 reactive query → B 부연 → 판사 dc-1 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-b-interject-v1` | B | 판사/A | 끼어들기 (다른 사정 변명) | 1~2 문장 | 호소·억울함 |
| `emerge-dc1-via-b-interject-judge-react-v1` | 판사 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-dc1-via-b-interject-b-elaborate-v1` | B | 판사 | 부연 회피 (모호) | 1~2 문장 | 회피·말끝 흐림 |
| `emerge-dc1-via-b-interject-judge-decree-v1` | 판사 | 전체 | dc-1 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject (수정 반영): "**다른 사정이 있어 방문할 수도 있지 않습니까?** 외도라고 단정하실 일은 아닙니다." (호소 톤)
- 판사 react: "이준호 씨, 그 '다른 사정'이 무엇인지 본 법정에 설명해 주실 수 있겠습니까?"
- B elaborate: "그건… 가족 쪽에 어쩔 수 없는 사정이 있어서… 자세한 건 말씀드리기 어렵습니다." (S2 영역 surface — "가족 쪽 일" 까지만, 형/조카 X)
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-1 lieState ≥ S2 + e-4 Original 도달 후 4턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-dc1-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 응답 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto (수정 반영): "본 법정은 오피스텔 출입 정황 검토가 필수적이라고 봅니다. **영수증·GPS·문자를 묶어 [오피스텔의 사람들]을 새로운 단서로 등재합니다.**"
- A respond: "예, 받아들이겠습니다."

**dc-1 total: 4 + 3 + 4 + 2 = 13 entry**

---

### Emergence 3: **w-1** (증인 — 오피스텔 경비) — 4 trigger / 13 entry

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`, priorCard: dc-1]

**선결조건:**
- `dc-1` (오피스텔의 사람들) 이미 fired
- d-1 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: dc-1 발현 직후 판사가 현장 증언 확보 가능성 mention
- 발동 흐름 (~6초): 판사 자발 cascade mention → A 응답 → 판사 소환 가능 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-cascade-judge-mention-v1` | 판사 | 전체 | 자발 cascade (dc-1 reference) | 2 문장 | 격식·분석적 |
| `emerge-w1-via-cascade-a-acknowledge-v1` | A | 판사 | 짧은 동의 | 1 문장 | 신중·동의 |
| `emerge-w1-via-cascade-judge-summon-v1` | 판사 | 전체 | 소환 가능 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade mention: "앞서 등재된 [오피스텔의 사람들] 정황을 검토할 때, 현장 출입을 확인할 인물 확보가 필요해 보입니다. **오피스텔 경비를 본 법정에 소환할 수 있습니다.**" — dc-1 직접 reference 필수
- A acknowledge: "재판관님, 동의합니다. 경비 분께서 분명히 확인해 주실 겁니다."
- 판사 summon: "본 법정은 오피스텔 경비 증인 소환을 정식 가능 상태로 등재합니다."

#### Trigger 2 — 박지연 끼어들기 [type: `npc_interjection`, source: a]

**선결조건:**
- dc-1 이미 fired
- A emotional phase ∈ ['shaken', 'angry']

**Narrative scenario:**
- 컨텍스트: A가 외도 frame 강화 중에 블랙박스(e-2) 기록 reference하며 경비 호출 요청
- 발동 흐름 (~8초): A 끼어들기 (블랙박스 reference) → 판사 reactive → A 보강 → 판사 소환 가능 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-a-interject-v1` | A | 판사 | 끼어들기 (e-2 reference + 경비 호출 요청) | 2 문장 | 격앙·확신 |
| `emerge-w1-via-a-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-w1-via-a-interject-a-confirm-v1` | A | 판사 | 확신 보강 | 1 문장 | 격앙·확신 |
| `emerge-w1-via-a-interject-judge-summon-v1` | 판사 | 전체 | 소환 가능 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject (수정 반영): "재판관님, **블랙박스에 그 건물 경비님과 인사를 나누는 장면도 있었어요. 분명 남편을 알아볼 거에요.** 그분을 증인으로 부르고 싶습니다."
- 판사 react: "박지연 씨, 그 경비의 인적 사항이나 근무 정보를 본 법정에 제출할 수 있겠습니까?"
- A confirm: "예, 그 건물 경비실에 상시 근무하는 분이라 확인이 가능합니다."
- 판사 summon: trigger 1과 동일 form

#### Trigger 3 — 이준호 감정 돌발 [type: `emotional_outburst`, source: b]

**선결조건:**
- dc-1 이미 fired
- B emotional phase ∈ ['shaken', 'resigned']
- A의 외도 단정 누적 압박 상황

**Narrative scenario:**
- 컨텍스트: B가 외도 오해에 대한 억울함이 누적되어, 자기 폭로형 발언 (역설적으로 진실 우회 노출)
- 발동 흐름 (~9초): B outburst → 판사 catch → B 자기 정정 → 판사 소환 가능 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-b-outburst-v1` | B | 판사 | 자기 폭로형 outburst | 2 문장 | 격앙·억울함 |
| `emerge-w1-via-b-outburst-judge-catch-v1` | 판사 | B | catch | 1 문장 | 격식·신중 |
| `emerge-w1-via-b-outburst-b-admit-v1` | B | 판사 | 짧은 자기 정정 | 1 문장 | 위축·동의 |
| `emerge-w1-via-b-outburst-judge-summon-v1` | 판사 | 전체 | 소환 가능 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (수정 반영): "**오피스텔 경비 분께서는 제가 외도 오해를 받는 게 얼마나 황당한 일인지 분명 알겁니다…** 부르고 싶으시면 부르세요."
- 판사 catch: "이준호 씨, 그 경비 증언이 본인에게 유리하다는 의미로 들립니다. 본인이 직접 소환을 요청하시는 겁니까?"
- B admit: "…재판관님 판단에 맡기겠습니다." (자기 폭로 후 위축)
- 판사 summon: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + dc-1 fired + d-1 lieState ≥ S3 + 4턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-judge-auto-summon-v1` | 판사 | 전체 | 자발 정리 + 소환 가능 선언 | 2 문장 | 격식·결정 |
| `emerge-w1-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 응답 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto: "본 법정은 현장 출입을 확인할 인물의 증언 확보가 필요한 시점이라고 봅니다. 오피스텔 경비 증인 소환 가능성을 정식으로 등재합니다."
- A respond: "예, 받아들이겠습니다."

**w-1 total: 3 + 4 + 4 + 2 = 13 entry**

---

### Emergence 4: **dc-2** (사건 카드 — 시댁 얘기만 나오면 싸움) — 4 trigger / 13 entry

> ⚠ **본 emergence는 cross-line** (linkedDisputes: ['d-1', 'd-2']). 외도 line의 동기 frame이면서 자금 line(d-2 비자금 출금 동기)에도 영향. emergence narrative는 "B가 시댁 keyword 회피 패턴 + 가족 갈등 공포 동기 frame" 까지만 surface — 형/조카/회생 절대 X.

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`, recipeId: combine-6]

**선결조건:**
- 사용자가 `combine-6` (stmt-b-family + e-4 → dc-2) 조합 실행
- e-4 Original 도달
- B에게 동기 추궁 누적
- d-1 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: 사용자가 B의 가족 회피 진술 + e-4 문자 스레드 조합 → 단서 "회피와 가족 keyword 정합"
- 발동 흐름 (~9초): 조합 결과 표시 → 판사 분석 발언 → B 짧은 침묵 → A 동의 → 판사 dc-2 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-combo-judge-query-v1` | 판사 | B | 분석 결과 발언 | 2 문장 | 격식·발견적 |
| `emerge-dc2-via-combo-b-response-v1` | B | 판사 | 침묵 후 짧은 답변 | 1 문장 | 회피·침묵 |
| `emerge-dc2-via-combo-a-react-v1` | A | 판사 | 동의 발언 | 1 문장 | 신중·확인 |
| `emerge-dc2-via-combo-judge-decree-v1` | 판사 | 전체 | dc-2 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query (수정 반영): "**이준호 씨의 가족에 대한 언급 회피와 발신자 미상 문자의 연관성이 보여집니다.** 가족 관련 화제에서 본인이 입을 닫는 패턴의 동기를 설명해 주십시오."
- B response: "…말씀드리기 어렵습니다." (짧은 침묵 후)
- A react: "재판관님, 저도 그 패턴은 분명히 느끼고 있었습니다."
- 판사 decree: "본 법정에 [시댁 얘기만 나오면 싸움] 사건 카드를 정식 등재합니다."

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`, priorCard: dc-1]

**선결조건:**
- `dc-1` (오피스텔의 사람들) 이미 fired
- d-1 lieState ≥ S2
- B 가족 회피 패턴 누적 (B 측 가족 keyword 회피 답변 3회 이상)

**Narrative scenario:**
- 컨텍스트: dc-1 발현 후 외도 frame이 흔들리는 시점, 판사가 B의 동기 frame 별도 카드 필요성 mention
- 발동 흐름 (~7초): 판사 자발 cascade mention → A 동의 → 판사 dc-2 surface 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-cascade-judge-mention-v1` | 판사 | 전체 | 자발 cascade (dc-1 reference) | 2 문장 | 격식·분석적 |
| `emerge-dc2-via-cascade-a-response-v1` | A | 판사 | 동의 응답 | 1 문장 | 신중·확인 |
| `emerge-dc2-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-2 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade mention (수정 반영): "**[오피스텔의 사람들]에 대한 단서와 이준호 씨의 회피 패턴을 연결한 새로운 접근이 필요합니다.** 가족 관련 화제에서 B 측이 일관되게 입을 닫는 동기 frame을 별도 카드로 정리합니다." — dc-1 직접 reference 필수
- A response: "재판관님, 저도 그 동일한 패턴을 여러 차례 확인했습니다."
- decree: trigger 1과 동일 form

#### Trigger 3 — 이준호 감정 돌발 [type: `emotional_outburst`, source: b]

**선결조건:**
- dc-1 이미 fired
- B emotional phase ∈ ['shaken', 'angry']
- 활성 액션: B 동기 추궁 (question.motive_search.b) 중

**Narrative scenario:**
- 컨텍스트: B가 가족 동기 추궁에 누적 압박 → 격앙 외침으로 회피 패턴 자체를 폭로
- 발동 흐름 (~9초): B 격앙 → 판사 catch → B 위축 정정 → 판사 dc-2 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-b-outburst-v1` | B | A/판사 | 격앙 외침 | 1~2 문장 | 격앙·폭발 |
| `emerge-dc2-via-b-outburst-judge-catch-v1` | 판사 | B | catch | 1 문장 | 격식·신중 |
| `emerge-dc2-via-b-outburst-b-admit-v1` | B | 판사 | 짧은 위축 정정 | 1 문장 | 위축·체념 |
| `emerge-dc2-via-b-outburst-judge-decree-v1` | 판사 | 전체 | dc-2 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (수정 반영 — **본인 가족 호칭 자기 시점**): "**우리 집 얘기는 이제 그만 좀!** 그만 좀 물어보세요!" (격앙 폭발) — "시댁" 절대 X (본인이 자기 가족을 시댁이라 부르면 어색)
- 판사 catch: "이준호 씨, 본인이 회피하는 그 화제 자체를 본 법정이 단서로 검토해야 한다는 뜻으로 해석합니다."
- B admit: "…죄송합니다. 더 말씀드리기 어렵습니다."
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + dc-1 fired + d-1 lieState ≥ S3 + 4턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc2-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-dc2-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 응답 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto (수정 반영): "본 법정은 B 측 진술에서 가족 관련 화제 회피가 반복 관찰됐다고 봅니다. **이준호 씨 측 가족 관련 회피 패턴을 별도 단서 카드로 정리합니다.**"
- A respond: "예, 받아들이겠습니다."

**dc-2 total: 4 + 3 + 4 + 2 = 13 entry**

---

**Cycle 3 grand total: 12 + 13 + 13 + 13 = 51 entry**

> ⚠ 본 brief 작성 시 e-4 T3 (b interject)을 3 line으로 산정. 만약 GPT Pro가 4 line(b interject → a pursue → b acknowledge → judge decree)으로 확장하는 게 자연하다고 판단하면 52 entry로 조정 가능 — 명확한 사후 추궁 패턴이 필요한 영역.

---

## §3. `cascade_from_card` trigger spec (Cycle 2에서 도입, 본 cycle 4/16 사용)

**Trigger 정의:** 이전 emergence(사건 카드 또는 증거)가 이미 fire된 상태에서, 그 narrative line의 자연 연속으로 다음 entity가 등장.

**Schema field (확장 형식):**

```typescript
// NarrativeTriggerPreconditions
{
  requirePriorCardFired?: string  // dossierCardId | evidenceId — fire 상태여야 할 prior entity
  // ... 기존 field
}

// NarrativeTriggerType
type NarrativeTriggerType =
  | 'npc_interjection'
  | 'combination_result'
  | 'emotional_outburst'
  | 'judge_auto_mention'
  | 'cascade_from_card'
```

**Runtime 거동:**
- 평가 시점: prior entity fired 상태 + 본 trigger의 다른 precondition 모두 만족 시
- ScriptedText: 본 trigger 전용 narrative entry. 이전 entity 명시 reference (예: "앞서 등재된 [통화기록]을…") 필수

**Tag spec (모든 cascade_from_card entry):**

```
"trigger:cascade_from_card"
"priorCard:<entityId>"  // 예: "priorCard:e-3" / "priorCard:e-4" / "priorCard:dc-1"
```

본 cycle cascade chain:
- e-4 cascade: priorCard:e-3
- dc-1 cascade: priorCard:e-4
- w-1 cascade: priorCard:dc-1
- dc-2 cascade: priorCard:dc-1

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 의 `emergence_narrative` channel 에 추가:

```json
{
  "id": "emerge-e4-via-cascade-judge-mention-v1",
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
    "priorCard:e-3",
    "emergence:e-4"
  ]
}
```

**Tag 명세:**
- `channel:emergence_narrative`
- `speaker:{a|b|judge}` / `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}` / `listenerRole:{judge|party|all}`
- `register:formal` (재판관 격식 환경 — 본 batch 전부)
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{e-4|dc-1|w-1|dc-2}` — 대상 emergence ID
- **cascade_from_card 전용**: `priorCard:{entityId}` 추가
- **combination_result 전용**: `comboRecipeId:{recipeId}` 추가 (e-4는 combo X / dc-1은 combine-1 / dc-2는 combine-6 / w-1은 combo 없음)
- 호칭 tag: `callTerm:박지연_씨` 또는 `callTerm:이준호_씨` 또는 `judgeAddress:재판관님` (해당 시)

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. "...십시오", "...습니다" 종결. 단정·강압 회피
- **A (박지연)**: 격앙·결단·확신. cascade trigger에서는 차분 동의, 끼어들기에서는 격앙. **w-1 영역에서는 외도 frame 확신**, dc-2 영역에서는 신중 동의로 분기
- **B (이준호)**: 회피→흘림→체념. **dc-2 emotional_outburst에서만 격앙 폭발 — 그 외엔 회피·말끝 흐림 일관**
- 다른 spouse-01 entry와 호명·종결 일관 (재판관님, 박지연 씨, 이준호 씨)
- `feedback_natural_korean_npc_active_voice.md` 5 차원 적용:
  - 강력 어휘 완화 / 모호 referent 명확 동사구 / 피동 회피 / 직역체 내면 발화 / 자연 완충재
- `feedback_self_reference_speaker_context.md` 정밀: NPC 1인칭 자기 발화에 "본인" X → "저/제"
  - 단, 제3자가 NPC 가리킬 때는 "본인" 자연
- **`feedback_family_address_speaker_perspective.md` 신규 정밀:**
  - **B(이준호) 발화에서 자기 가족을 "시댁/시댁 가족"으로 부르면 X → "우리 집/우리 가족/형/형네" 자기 시점만**
  - A(박지연) 발화에서 B의 가족은 "시댁" OK (아내 시점 자연)
  - 재판관/시스템 narrator는 인물 직접 호칭 ("이준호 씨 부모님" 등) 권장

---

## §6. 진실 노출 경계 — **본 cycle 가장 위험 영역**

`design_spouse01_truth_disclosure_policy.md` 권위 엄격 준수.

### e-4 / dc-1 emergence에서 surface 금지:

- "친형 / 형 오피스텔 / 조카 / 중2 / 개인회생" — d-1 S4 이상에서만
- "가족 돌봄 / 조카 돌봄" — d-1 S4 이상에서만
- emergence narrative는 **"가족 쪽 사정 / 다른 사정 / 챙겨야 할 사람"까지만** surface (S1~S2 영역)
- 단, **A의 외도 단정 frame 발화는 자연** ("외도 동선이 분명합니다" 등) — A 본인의 확신은 surface OK

### w-1 emergence에서 surface 금지:

- B 자기 폭로형 outburst에서도 "조카 돌봄 / 형 / 회생" 직접 surface X
- 허용 영역: "외도 오해 / 황당한 일 / 그 건물 / 인사 / 알아본다" 정도까지
- 경비 증언 자체는 emergence 시점에 X — 본 cycle은 **소환 가능 surface 등장**까지만

### dc-2 emergence에서 surface 금지 (**가장 위험**):

- "시댁 갈등 공포 / 가족 keyword 회피 패턴" — surface 가능
- "형 사정 / 조카 / 개인회생" 절대 surface X
- B outburst: "**우리 집 얘기는 이제 그만 좀!**" — 시댁/형/조카/회생 X, "우리 집" 자기 시점만
- 판사 mention: "가족 관련 화제 회피 패턴" 까지만 — "형 관련 / 시댁 갈등" 등 구체 narrative X

### Surface 가능 영역 (참고)

- "외도 의심 / 외도 오해 / 외도 단정"
- "오피스텔 / 새벽 전화 / 통화 / 문자"
- "가족 쪽 일 / 다른 사정 / 챙겨야 할 사람 / 가족 관련 화제"
- "분명히 / 황당한 / 부르고 싶다"
- "회피 패턴 / 입 닫는 패턴 / 동기 frame"

---

## §7. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 51~52 KO entry 작성 (JSON 파일)
2. 사용자 spot check (5~10분, 특히 dc-2 outburst + w-1 outburst 영역 진실 노출 확인)
3. Claude가 `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가 + tags 정합 검증
4. Claude가 4 entity narrativeTriggers 부착:
   - e-4 evidence (spouse-01.case.ts L1349~) — `narrativeTriggers: e4NarrativeTriggers`
   - dc-1 dossier (spouse-01.case.ts L1775~) — `narrativeTriggers: dc1NarrativeTriggers`
   - dc-2 dossier (spouse-01.case.ts L1841~) — `narrativeTriggers: dc2NarrativeTriggers`
   - w-1 witness (spouse-01.case.ts L1603~) — `narrativeTriggers: w1NarrativeTriggers`
5. spouse-01.narrative.ts에 4 export const 추가 (Cycle 2 패턴 동일)
6. dispatch 통합 — 기존 useActionDispatch hook 활용 (Cycle 2에서 이미 dossier/witness/dispute 영역 hook 추가됨)
7. tsc + build + **qa:fast PASS 필수** ([[design_core_narrative_cycle_procedure]] 6단계 강화 권위)
8. Codex 다국어 sync 의뢰서 작성 (별도 self-contained 폴더, 51~52 entry × 3 lang = 153~156 entry)
9. commit + push

---

## §8. 본 cycle 진행 메모

- **Cycle 3는 외도 line 단일 집중** — Cycle 2(자금 line)와 line 분리, 사건 인지 흐름 응집
- **본인 가족 호칭 자기 시점 정책 첫 적용 batch** — dc-2 outburst가 reference 사례. 다른 cycle (family-01/friend-01)에서도 본 정책 동일 적용 예정
- **진실 노출 위험도 높음** — dc-2가 가장 위험 (cross-line + 가족 keyword 회피 동기 frame). GPT Pro 작성 후 사용자 spot check 5단계에서 진실 노출 영역 집중 검토
- 다음 cycle (Cycle 4 = spouse-01 가족 line h-d2 영역) 진입 전 본 cycle 완전 종료 (cycle 단위 세션 이관 정책)

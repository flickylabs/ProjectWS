# GPT Pro 의뢰서 — friend-01 Batch 1: e-5 + dc-3 + d-3 emergence narrative

작성일: 2026-05-25
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 3 emergence (e-5 + dc-3 + d-3) 의 multi-trigger narrative ScriptedText KO 시안 — 총 37 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음:

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차
- `design_narrative_cascade_from_card.md` — cascade_from_card trigger spec
- `feedback_dossier_card_renamed_to_clue.md` — "사건 카드" → "단서" 명칭
- `feedback_judge_dispassionate_action_focused.md` — **재판관 어법 (Cycle 7 도입, 본 cycle도 유지)**
- `feedback_judge_question_quality.md` — 재판관 질문 quality
- `feedback_natural_korean_npc_active_voice.md` — NPC 적극 발화 5 차원
- `feedback_family_address_speaker_perspective.md` — 본인 가족 호칭 자기 시점
- `feedback_avoid_code_abbreviations_with_user.md` — 약어 풀어쓰기
- `design_friend01_truth_disclosure_policy.md` — **friend-01 진실 노출 정책 (본 batch 핵심 — 그룹 2/3 surface tier)**

톤 reference: `friend01-tone-samples.md`

---

## §1. 사건 context

**friend-01** = 송다은(A, 원고) vs 최수민(B, 피고) 친구 분쟁.

핵심 frame (anchorTruth 권위):
> 최수민의 9일간 연락은 집착이 아니라 송다은 아버지가 결혼 직전 예비신랑에게 돈 접근을 시도하는 흐름을 차단하려던 것이었다. 과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였고, 최수민은 송다은이 무너질까 봐 끝내 그 사실을 말하지 못한 채 악역을 자처했다.

본 batch (Line C-1) 영역:
- **d-1** (9일간 연락 의도): Cycle 7 영역에서 처리됨
- **d-2** (예비신랑 선 넘기): Cycle 7 영역에서 처리됨 — **본 batch는 d-2 S3 fired 후 영역에서 시작**
- **d-3** (아버지의 돈 접근 패턴, hidden): **본 batch에서 emergence wrapper 신규** — 본 batch 중심 쟁점
- **d-4** (과거 손절과 아버지의 사기, hidden, legitimacyIssue): **Batch 2 영역** — 본 batch에서 "사기" 단어 surface X
- **d-5** (단톡방 매도와 명예훼손): Cycle 9 영역

### 캐릭터 frame (필수 준수)

**A = 송다은** (`premature_summary` archetype):
- 결론 먼저 선언, 맥락 후 끼워넣기
- 아버지의 진짜 모습이 드러나는 것이 가장 큰 공포 — 본 batch에서 d-3 surface는 A의 frame 위협 영역
- a-outburst 격앙 부정: "그건 조작이야!" / "아버지 일 끌고 들어오지 마!" / "다 끝난 일을 왜 또 끌고와서!" frame

**B = 최수민** (`affect_flattening` archetype):
- 감정을 평평하게 누른 채 사실만 나열
- 가장 아픈 이야기에서 톤이 오히려 더 평평
- b-submit (자료 제출) trigger는 "어쩔 수 없이 단답으로 제출" frame. 길게 떠벌리거나 능동 발설 X
- b-outburst trigger 본 batch에 사용 X (character integrity 영역)

### 본 batch 영역 surface 정책 (진실 노출 정책 핵심)

| Keyword 영역 | e-5 영역 | dc-3 영역 | d-3 S3 이후 | 본 batch 노출? |
|---|---|---|---|---|
| 예비신랑 회사 단톡 떠벌림 | ✓ surface | ✓ | ✓ | **본 batch 영역** (e-5 자료 자체) |
| 최수민 9일간 차단 연락 (의도 = 결혼 위기 차단) | △ 의도 봉인 | △ | ✓ B 인정 | **d-3 S3 이후만 의도 surface** |
| "아버지가 결혼 자금을 시도했다" | ✓ surface (자료 인용) | ✓ | ✓ | **본 batch 영역** (e-5 자료 인용) |
| **"아버지의 사기" / "투자 명목" / "미상환"** | ✗ | ✗ | ✗ | **본 batch 절대 surface X** (d-4 영역) |
| **"과거 손절 = A 아버지 원인"** | ✗ | ✗ | ✗ | **본 batch 절대 surface X** (d-4 영역) |
| "같은 패턴 반복" / "같은 흐름" | ✗ | △ (패턴 인식) | ✓ | **dc-3/d-3 영역만** |

**위반 영역**: 본 batch entry text 또는 behaviorHint에 "사기" / "미상환" / "투자 명목" 단어 등장 시 P0 leak. 5단계 검토 + 6단계 qa:fast에서 검출.

---

## §2. emergence 설계 — e-5 (4 trigger × 3 entry = 12 entry)

### e-5 자료 본질 (plot revision base)

| 영역 | 값 |
|---|---|
| 자료 본질 | 예비신랑 김태윤이 회사 동료 단톡방에서 "다은이 아버지가 결혼 자금 좀 도와달래"라며 토로한 캡처 + 그 시점 직후 최수민이 예비신랑에게 보낸 9일간의 차단 메시지 원본 |
| 자료 surfaceName | 떠벌림 흔적과 9일간 메시지 |
| subjectParty | b |
| proves | d-3 |
| requires | e-1 |
| requiredLieState | S2 |
| sensitiveSealTargets | 회사 동료 실명 + 최수민 메시지의 사적 톤 |

### e-5 multi-trigger candidate 4종

**First-Fired-Wins**: e-5는 trigger 후보 4개. 첫 발동 시 나머지 3개 영구 disabled.

#### Trigger 1 — cascade_from_card [priorCard: d-2]

**선결조건:**
- `requirePriorCardFired: 'd-2'` (Cycle 7 dc-2 영역 fired + d-2 S3 도달 시점)
- `disputeLieState: { 'd-2': 'S3+' }`
- 게이트 channel: evidence_present / dossier (judge 자발)

**Narrative scenario:**
- 컨텍스트: d-2 fired (예비신랑 접근 확인) 직후 판사 자발 흐름 — "예비신랑 측 새 자료 영역이 있는지 확인이 필요합니다"
- 발동 흐름 (~6초): d-2 fired event → 판사 자발 mention → B가 자제 단답으로 자료 제출 → 판사 surface 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e5-via-cascade-judge-mention-v1` | 판사 | 전체 | d-2 fired 후 자발 mention | 격식·관찰·중립 ("관련 자료" 어휘) |
| `emerge-e5-via-cascade-b-submit-v1` | B | 판사 | 자료 제출 (단답) | 평평·어쩔 수 없이 |
| `emerge-e5-via-cascade-judge-decree-v1` | 판사 | 전체 | e-5 surface 선언 | 격식·확정 |

**가이드:**
- 판사 mention dynamics 의도: "앞서 등재된 [먼저 넘은 선] 관련하여, 예비신랑 측의 같은 자리 자료 영역 확인이 필요합니다." (cascade reference 명시)
- B 자료 제출 dynamics: "관련 자료가 있긴 합니다…" frame — 자제 단답, 어쩔 수 없이 제출. 자료 본질은 회사 단톡 캡처 + 9일 메시지
- 판사 decree: "본 법정에 [떠벌림 흔적과 9일간 메시지]를 자료로 채택합니다." 격식 + 평가 어휘 회피

#### Trigger 2 — npc_interjection [source: b]

**선결조건:**
- `disputeLieState: { 'd-2': 'S2+' }`
- `contextAction: 'question.fact_pursuit.a'` (A 측 사실 추궁 중)

**Narrative scenario:**
- 컨텍스트: A가 d-2 영역에서 "수민이가 우리 예비신랑한테 계속 연락한다" 같은 단정 발화 중
- 발동 흐름 (~5초): A 단정 발화 → B 자제 단답으로 자료 존재만 언급 → A 부분 부정 반응 → 판사 surface 결정

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e5-via-npc-b-interject-v1` | B | 판사 | A 단정 발화 끊고 단답 자료 언급 | 평평·자제·어쩔 수 없이 |
| `emerge-e5-via-npc-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 + 단정 frame 유지 |
| `emerge-e5-via-npc-judge-mention-v1` | 판사 | 전체 | e-5 surface 결정 | 격식·관찰·중립 |

**가이드:**
- B 끼어듦 dynamics: "관련 자료가 있긴 합니다." 정도. 자제 단답. 자료 본질 직접 언급 X (surface 봉인 — 자료가 있다는 사실만)
- A 부분 부정 dynamics: "무슨 자료를…" 또는 "또 그런 식으로 몰아가는 거야?" 결론 먼저 frame
- 판사 mention: "관련 자료 영역의 확인이 필요합니다." 중립

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken', 'angry'] }`
- `disputeLieState: { 'd-2': 'S2+' }`

**Narrative scenario:**
- 컨텍스트: A가 d-2 진행 중 격앙 상태 — 예비신랑 책임 영역이 부상하면서 frame 흔들림
- 발동 흐름 (~5초): A 격앙 외침 → 판사 catch → 본 자료 영역 등장 decree

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e5-via-outburst-a-confess-v1` | A | 전체 | 격앙 외침 (자료 영역 부정) | 격앙·결론 먼저·부정 |
| `emerge-e5-via-outburst-judge-catch-v1` | 판사 | A | catch + 본 자료 영역 확인 의지 | 격식·중립 |
| `emerge-e5-via-outburst-judge-mention-v1` | 판사 | 전체 | e-5 surface 선언 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "그런 식으로 단톡 캡처 다 들고와도 우리 아빠가 한 일은 절대 아니야!" (격앙 부정 frame — "절대" 같은 단정 어휘 + 부정)
- 판사 catch: "방금 발화 중 단톡 캡처 영역이 언급됐습니다. 관련 자료 영역 확인이 필요합니다."
- 판사 mention: "본 법정에 [떠벌림 흔적과 9일간 메시지]를 자료로 채택합니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5` (e-5 unlock 자격 충족 + 5턴 경과 시점, fallback)

**Narrative scenario:**
- 컨텍스트: 위 3 trigger 모두 fire 안 되고 5턴 경과 — 판사 자발 정리 흐름
- 발동 흐름 (~5초): 판사 자발 query → B 단답 제출 → 판사 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e5-via-fallback-judge-query-v1` | 판사 | B | 자발 query (자료 영역 직접 요청) | 격식·관찰·중립 |
| `emerge-e5-via-fallback-b-submit-v1` | B | 판사 | 자제 단답 자료 제출 | 평평·어쩔 수 없이 |
| `emerge-e5-via-fallback-judge-mention-v1` | 판사 | 전체 | e-5 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query: "예비신랑 측 자료 영역에 관련 자료가 있다면 제출해 주시기 바랍니다."
- B 제출: "관련 자료가 있긴 합니다…" 자제 단답
- 판사 mention: "[떠벌림 흔적과 9일간 메시지]를 자료로 채택합니다."

---

## §3. emergence 설계 — dc-3 (4 trigger × 3-4 entry = 13 entry)

### dc-3 (단서) 본질

| 영역 | 값 |
|---|---|
| label | 같은 부탁 |
| description | 예비신랑이 떠벌린 흔적과 과거 송금 흐름을 붙여 아버지의 반복 시도 패턴을 확정하는 카드 |
| linkedDisputes | d-3 |
| linkedParty | b |
| linkedEvidence | e-5, e-6 |
| recipeId (combo) | combine-3 (e-5 + e-6) |
| successEffects | 송다은 아버지의 현재 시도가 과거와 연결됨 / d-4 해금에 필요한 반복 패턴 확정 |
| effects | unlock_dispute d-4 |

### dc-3 multi-trigger candidate 4종

#### Trigger 1 — combination_result [recipeId: combine-3]

**선결조건:**
- `combine-3` (e-5 + e-6): e-5=original 이상, e-6=original 이상 → dc-3 부상
- 게이트 channel: dossier (combo 결과 표시)
- `disputeLieState: { 'd-3': 'S0+' }`

**Narrative scenario:**
- 컨텍스트: 사용자가 e-5 + e-6 조합 → 판사 자발 분석 + dc-3 surface
- 발동 흐름 (~6초): 조합 결과 표시 → 판사 자발 query → B 자제 단답 부연 → A 부분 부정 → 판사 dc-3 (단서) surface 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc3-via-combo-judge-query-v1` | 판사 | 전체 | 조합 결과 직후 query | 격식·분석·중립 |
| `emerge-dc3-via-combo-b-context-v1` | B | 판사 | 자제 단답 부연 (패턴 인식) | 평평·자제 |
| `emerge-dc3-via-combo-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 + 단정 |
| `emerge-dc3-via-combo-judge-decree-v1` | 판사 | 전체 | dc-3 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query dynamics: "앞서 등재된 [떠벌림 흔적과 9일간 메시지]와 과거 송금 자료를 함께 보면, 두 시점의 부탁 흐름이 겹치는 정황이 있습니다." ("정렬되다" 같은 번역체 회피, "겹치는" 자연)
- B 부연 dynamics: "그때도, 이번에도 같은 흐름이었습니다." 평평 단답. "사기" 단어 X
- A 부정 dynamics: "두 번이 무슨 같은 일이야!" 결론 먼저 부정
- 판사 decree: "본 법정에 단서 [같은 부탁]을 등록합니다." 격식 + "단서" 명칭 (사건 카드 X)

#### Trigger 2 — cascade_from_card [priorCard: e-5]

**선결조건:**
- `requirePriorCardFired: 'e-5'` (본 batch e-5 emergence fired 직후)
- `disputeLieState: { 'd-3': 'S0+' }`

**Narrative scenario:**
- 컨텍스트: e-5 fired → 판사 자발 분석 — "본 자료가 과거 영역과 연결될 가능성"
- 발동 흐름 (~5초): e-5 fired event → 판사 자발 분석 → B 자제 인정 → 판사 dc-3 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc3-via-cascade-judge-decree-v1` | 판사 | 전체 | e-5 fired 후 자발 분석 + surface | 격식·분석·중립 |
| `emerge-dc3-via-cascade-b-react-v1` | B | 판사 | 자제 단답 인정 | 평평·자제 |
| `emerge-dc3-via-cascade-judge-decree-v2` | 판사 | 전체 | dc-3 surface 확정 | 격식·확정 |

**가이드:**
- 판사 decree dynamics: "앞서 등재된 [떠벌림 흔적과 9일간 메시지]와 관련하여, 과거 자료와의 정합성 확인이 필요합니다." (cascade reference)
- B 인정 dynamics: "그렇게 보입니다." 평평 단답
- 판사 surface: "본 법정에 단서 [같은 부탁]을 등록합니다."

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken'] }`
- `disputeLieState: { 'd-3': 'S0+' }`

**Narrative scenario:**
- 컨텍스트: A가 d-3 영역에서 격앙 부정 — "패턴" 단정에 대한 frame 흔들림
- 발동 흐름 (~5초): A 격앙 외침 → 판사 catch + 분석 → dc-3 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc3-via-outburst-a-deny-v1` | A | 전체 | 격앙 부정 외침 (패턴 단정 부정) | 격앙·결론 먼저·부정 |
| `emerge-dc3-via-outburst-judge-catch-v1` | 판사 | A | catch + 분석 의지 | 격식·중립 |
| `emerge-dc3-via-outburst-judge-decree-v1` | 판사 | 전체 | dc-3 surface 선언 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "두 번이 무슨 같은 패턴이야! 그때랑 지금이랑 무슨 상관이라고!" (격앙 부정 frame)
- 판사 catch: "방금 발화 중 두 시점의 정합성 영역이 언급됐습니다. 관련 자료들의 묶음 확인이 필요합니다."
- 판사 decree: "본 법정에 단서 [같은 부탁]을 등록합니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5`

**Narrative scenario:**
- 컨텍스트: 위 3 trigger 모두 fire 안 되고 5턴 경과
- 발동 흐름 (~5초): 판사 자발 query → B 단답 부연 → 판사 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc3-via-fallback-judge-query-v1` | 판사 | 전체 | 자발 query (자료 묶음) | 격식·분석·중립 |
| `emerge-dc3-via-fallback-b-context-v1` | B | 판사 | 자제 단답 부연 | 평평·자제 |
| `emerge-dc3-via-fallback-judge-decree-v1` | 판사 | 전체 | dc-3 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query: "두 자료를 함께 검토하겠습니다." 단순 frame
- B 부연: "같은 흐름이었습니다." 평평
- 판사 decree: "본 법정에 단서 [같은 부탁]을 등록합니다."

---

## §4. emergence 설계 — d-3 (4 trigger × 3 entry = 12 entry)

### d-3 (쟁점, hidden) 본질

| 영역 | 값 |
|---|---|
| name | 아버지의 돈 접근 패턴 |
| truthDescription | 송다은 아버지가 예비신랑에게 돈 얘기를 꺼내고 있었고, 최수민은 과거에 같은 패턴을 당한 적이 있어 예비신랑에게 직접 막아보려 했다 |
| hidden | true |
| v3Visibility | hidden |
| legitimacyIssue | false |
| requiredEvidence | e-5 |
| unlockCondition | requireDispute d-2 S3 |

### d-3 multi-trigger candidate 4종

#### Trigger 1 — cascade_from_card [priorCard: dc-3]

**선결조건:**
- `requirePriorCardFired: 'dc-3'` (dc-3 fired 직후 — 자연 chain, 가장 자연)
- `disputeLieState: { 'd-2': 'S3+' }` (unlock 충족)

**Narrative scenario:**
- 컨텍스트: dc-3 fired (패턴 확정) 직후 판사 자발 — 새 쟁점 등재
- 발동 흐름 (~5초): dc-3 fired event → 판사 자발 mention → A 부정 반응 → 판사 새 쟁점 등재

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d3-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-3 fired 후 자발 mention + 새 쟁점 등재 | 격식·확정·중립 |
| `emerge-d3-via-cascade-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 + 단정 |
| `emerge-d3-via-cascade-b-react-v1` | B | 판사 | 자제 단답 부연 | 평평·자제 |

**가이드:**
- 판사 decree dynamics: "앞서 등재된 단서 [같은 부탁]을 근거로, 새 쟁점 '아버지의 돈 접근 패턴'을 본 법정 쟁점으로 등재합니다." (cascade reference)
- A 부정 dynamics: "그런 쟁점은 받아들일 수 없습니다!" 결론 먼저 부정
- B 부연 dynamics: "쟁점은 사실관계대로 확인되어야 합니다." 평평

#### Trigger 2 — combination_result [recipeId: combine-3]

**선결조건:**
- `combine-3` 발동 시 (dc-3과 동시 fire 가능)
- `disputeLieState: { 'd-2': 'S3+' }`

**Narrative scenario:**
- 컨텍스트: combo 결과 + dc-3 + d-3 동시 surface 가능. combo 결과 직후 새 쟁점 등재.
- 발동 흐름 (~5초): combo 결과 표시 → 판사 자발 query + 새 쟁점 등재 → A 부분 부정

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d3-via-combo-judge-mention-v1` | 판사 | 전체 | combo 결과 직후 새 쟁점 등재 | 격식·분석·중립 |
| `emerge-d3-via-combo-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 + 단정 |
| `emerge-d3-via-combo-judge-decree-v1` | 판사 | 전체 | 새 쟁점 등재 확정 | 격식·확정 |

**가이드:**
- 판사 mention dynamics: "두 자료의 정합성이 확인됐습니다. 본 법정에 새 쟁점 '아버지의 돈 접근 패턴'을 등재합니다."
- A 부정 dynamics: "그런 쟁점은 인정 못 해!" 결론 먼저
- 판사 decree: "본 쟁점의 사실관계 확인을 시작합니다." 격식

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken', 'angry'] }`
- `disputeLieState: { 'd-2': 'S3+' }`

**Narrative scenario:**
- 컨텍스트: A가 격앙 외침으로 "아버지 일 끌고 들어오지 마!" 같은 frame
- 발동 흐름 (~5초): A 격앙 외침 → 판사 catch + 새 쟁점 등재

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d3-via-outburst-a-deny-v1` | A | 전체 | 격앙 부정 외침 | 격앙·결론 먼저·부정 |
| `emerge-d3-via-outburst-judge-catch-v1` | 판사 | A | catch + 새 쟁점 등재 | 격식·중립 |
| `emerge-d3-via-outburst-judge-decree-v1` | 판사 | 전체 | 쟁점 등재 확정 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "아버지 일 끌고 들어오지 마! 우리 아빠는 그런 사람 아니야!" (격앙 부정 frame — 본 격앙으로 인해 오히려 아버지 영역이 쟁점화)
- 판사 catch: "방금 발화 중 아버지 측 영역이 직접 언급됐습니다. 본 영역의 사실관계 확인이 필요합니다."
- 판사 decree: "본 법정에 새 쟁점 '아버지의 돈 접근 패턴'을 등재합니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5`

**Narrative scenario:**
- 컨텍스트: 위 3 trigger 모두 fire 안 되고 5턴 경과
- 발동 흐름 (~5초): 판사 자발 mention → A 단답 반응 → 판사 등재

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d3-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 mention (새 쟁점 영역) | 격식·분석·중립 |
| `emerge-d3-via-fallback-a-react-v1` | A | 판사 | 단답 반응 | 결론 먼저 |
| `emerge-d3-via-fallback-judge-decree-v1` | 판사 | 전체 | 쟁점 등재 확정 | 격식·확정 |

**가이드:**
- 판사 mention: "관련 정황으로 새 쟁점 등재합니다."
- A 반응: "그건 받아들이기 어렵습니다." 결론 먼저
- 판사 decree: "본 법정에 새 쟁점 '아버지의 돈 접근 패턴'을 등재합니다."

---

## §5. 작성 영역 정리

### 총 entry 수

37 entry — e-5 (12) + dc-3 (13) + d-3 (12)

### 출력 JSON 형식

```json
[
  {
    "id": "emerge-e5-via-cascade-judge-mention-v1",
    "text": "...",
    "behaviorHint": "...",
    "tags": ["..."]
  },
  ...
]
```

### 공통 tags 패턴 (Cycle 7 참조)

각 entry는 다음 tag 패턴 적용 (sample 참조):

- **trigger type**: `trigger:cascade_from_card` / `trigger:combination_result` / `trigger:npc_interjection` / `trigger:emotional_outburst` / `trigger:judge_auto_mention`
- **emergence target**: `emerge:e-5` / `emerge:dc-3` / `emerge:d-3`
- **role**: `role:judge` / `role:a` / `role:b`
- **register**: `register:formal` / `register:plain`
- **archetype**: `arch:flatten` (B 발화) / `arch:premature` (A 발화)
- **dynamics**: `dynamics:cascade-mention` / `dynamics:combo-decree` / `dynamics:outburst-catch` / `dynamics:fallback-query` 등
- **priorCard tag** (cascade entry만): `priorCard:d-2` / `priorCard:e-5` / `priorCard:dc-3`
- **recipe tag** (combo entry만): `recipe:combine-3`
- **surface seal tier**: `seal:d3-pre-S3` (e-5 자료 surface 영역) / `seal:d3-S0+` (패턴 인식) / `seal:d4-blocked` (사기 단어 X)

### 검증 self-check (4단계 GPT Pro 작성 + 5단계 검토)

- [ ] 모든 entry id가 §2~§4의 명세와 정확히 일치
- [ ] **그룹 2 surface 위반 없음** — "사기" / "투자 명목" / "미상환" 단어 X (text + behaviorHint 모두)
- [ ] **그룹 4 surface 위반 없음** — "과거 손절 = A 아버지 원인" / "B 차마 못 말함" 영역 X (d-4 영역)
- [ ] 재판관 어법 — "선/흐름/낙인" X, "정황/선후관계/관련" O
- [ ] "과거" 같은 불필요 수식어 회피
- [ ] "정렬되다" 같은 번역체 회피
- [ ] B 자제 톤 (b-submit, b-react, b-context 모두 단답 + 어쩔 수 없는 frame)
- [ ] A 부정 외침 (a-outburst dynamics 격앙 + 단정 frame)
- [ ] "단서" 명칭 사용 (사건 카드 X)
- [ ] cascade entry의 priorCard reference text 본문 포함
- [ ] dc-3 label "[같은 부탁]" 정확히 사용
- [ ] d-3 쟁점명 "아버지의 돈 접근 패턴" 정확히 사용

### tag 영역 추가 (본 cycle 신규)

| Tag | 사용 영역 |
|---|---|
| `seal:d3-pre-S3` | e-5 자료 surface 영역 (자료 인용은 OK, 사기 단어 X) |
| `seal:d3-S0+` | dc-3 / d-3 영역 — 패턴 인식까지만 |
| `seal:d4-blocked` | 사기 / 미상환 / 손절 원인 등 d-4 영역 단어 등장 차단 (모든 entry 적용) |
| `band:line-c-1` | Line C-1 (현재 패턴 확인) 구분 |
| `arch:flatten:submit` | B 자제 톤 자료 제출 frame |
| `arch:premature:deny` | A 격앙 부정 frame |

---

본 의뢰서 정독 + 권위 메모리 정독 + tone-samples 정독 후 KO entry 37개 작성. 출력 파일명: `output-cycle8b-batch1.json`.

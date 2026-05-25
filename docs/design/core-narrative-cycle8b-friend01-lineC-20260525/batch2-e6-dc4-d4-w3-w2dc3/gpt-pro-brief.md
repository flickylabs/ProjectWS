# GPT Pro 의뢰서 — friend-01 Batch 2: e-6 + dc-4 + d-4 + w-3 + w-2 dc-3 확장 emergence narrative

작성일: 2026-05-25
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 4 emergence (e-6, dc-4, d-4, w-3) + 1 확장 (w-2 dc-3 영역) multi-trigger narrative ScriptedText KO 시안 — 총 55 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음:

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차
- `design_narrative_cascade_from_card.md` — cascade_from_card trigger spec
- `feedback_dossier_card_renamed_to_clue.md` — "사건 카드" → "단서" 명칭
- `feedback_judge_dispassionate_action_focused.md` — **재판관 어법 (dc-4 label "손절의 이유" 정합 권위)**
- `feedback_judge_question_quality.md` — 재판관 질문 quality
- `feedback_natural_korean_npc_active_voice.md` — NPC 적극 발화 5 차원
- `feedback_family_address_speaker_perspective.md` — 본인 가족 호칭 자기 시점
- `feedback_avoid_code_abbreviations_with_user.md` — 약어 풀어쓰기
- `design_friend01_truth_disclosure_policy.md` — **friend-01 진실 노출 정책 — 본 batch 가장 민감 (그룹 2/4 surface main)**

톤 reference: `friend01-tone-samples.md`

---

## §1. 사건 context

본 batch는 [Batch 1](../batch1-e5-dc3-d3/) 영역 직후 — Line C-2 (과거 사기 + 손절의 진짜 원인) 영역.

핵심 frame (anchorTruth 권위 발췌):
> 과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였고, 최수민은 송다은이 무너질까 봐 끝내 그 사실을 말하지 못한 채 악역을 자처했다.

본 batch 영역:
- **d-3** (아버지의 돈 접근 패턴): Batch 1 영역 — **본 batch는 d-3 S3 fired 후 영역에서 시작**
- **d-4** (과거 손절과 아버지의 사기, hidden, **legitimacyIssue: true**): **본 batch에서 emergence wrapper 신규** — friend-01 사건 핵심 reveal
- **w-3** (오미경, 분식집 사장, pro_b): **본 batch에서 emergence wrapper 신규** — dc-4 unlock 영역 증인
- **w-2** dc-3 영역 확장: Cycle 7 dc-2 영역 + 본 cycle dc-3 영역 추가 trigger

### 본 batch 영역 surface 정책 (진실 노출 정책 핵심 — 본 cycle 가장 민감)

| Keyword 영역 | e-6 영역 (d-4 S0~S2) | dc-4 영역 (d-4 S0+) | d-4 S3 이후 | w-3 영역 |
|---|---|---|---|---|
| 과거 송금 자료 인용 ("급한 투자금이니 한 달만…") | ✓ 자료 인용 | ✓ | ✓ | ✓ |
| 차일피일 미상환 흐름 (자료 인용) | △ 자료 인용 OK | ✓ | ✓ | ✓ |
| **"아버지의 사기" / "투자 명목 사기" 단어 평가** | ✗ | △ B 인정 영역 | ✓ B+A 모두 인정 | ✓ |
| **"미상환" 사실 명시** | △ 자료 인용 | △ 자료 인용 | ✓ A 인정 | ✓ |
| **"과거 손절 = A 아버지 원인"** | ✗ | △ 정황 인식 | ✓ B+A 모두 인정 | ✓ |
| **"B 차마 못 말함" 침묵 동기** | ✗ | ✗ | ✓ B 인정 (S4 이상) | △ |

**위반 영역**:
- e-6 자료 surface 영역 (d-4 unlock 전) entry에 "사기" 평가 단어 → P0 leak
- d-4 unlock 후라도 "B 차마 못 말함" 등 그룹 4 동기 영역은 S4 이상에서만
- w-3 발화 영역은 증인 시점 — 직접 본 영역만 (사기 평가는 mediation 영역)

### dc-4 label 변경 (필수 권위)

| 영역 | 변경 전 | 변경 후 |
|---|---|---|
| dossierCards[id='dc-4'].label | "손절의 값" | **"손절의 이유"** |
| cascade priorCard reference text 본문 (d-4 / w-3) | "[손절의 값]" | "**[손절의 이유]**" |
| KO entry 본문에서 dc-4 등장 시 | "[손절의 값]" | **"[손절의 이유]"** |

이유: "값"은 결과 평가 frame ("손절한 결과로 치른 값" 느낌, 평가 어휘), "이유"는 인과 frame ("손절한 근본 원인"). 본 batch 핵심 영역 (legitimacyIssue) 의도와 후자가 정합. [[feedback_judge_dispassionate_action_focused]] 권위.

### 캐릭터 frame (Batch 1 동일 + 본 batch 영역 특수)

**A = 송다은** (`premature_summary`):
- d-4 영역은 A의 frame이 본격적으로 무너지는 영역
- a-outburst 격앙 부정 빈도 증가 — "다 끝난 일을 왜 또 끌고와서 그래!" / "우리 아빠를 사기꾼으로 만들지 마!" frame
- d-4 S3 이후 A의 부정 frame이 catch + 인정으로 전이 (entry 본문에서 직접 인정은 다른 channel; 본 batch는 surface 영역만)

**B = 최수민** (`affect_flattening`):
- 본 batch에서도 자제 톤 유지. b-outburst trigger 사용 X
- d-4 영역에서도 B는 침묵 동기 직접 발설 X (그룹 4는 d-4 S4 이상)
- w-3 b-context trigger는 자제 단답으로 증인 잠깐 언급 frame — "그분이 보셨어요…" 정도

**w-3 = 오미경** (분식집 사장, pro_b, accurate):
- 직접 본 영역만 증언 (가게 앞에서 본 일 / 최수민이 가게에 울면서 들어왔던 일)
- 사기 평가는 본인 영역 아님 — "그날 그 어른이 그랬어요" 정도 사실 진술
- pro_b이지만 strategic이 아닌 accurate — 사실 그대로 전달

---

## §2. emergence 설계 — e-6 (4 trigger × 3 entry = 12 entry)

### e-6 본질

| 영역 | 값 |
|---|---|
| name | 과거 송금 영수증 + 문자 |
| surfaceName | 과거 송금 기록과 문자 |
| description | 과거 송금 내역과 차일피일 상환이 미뤄진 흐름이 남아 있는 은행·메신저 자료 |
| subjectParty | b |
| proves | d-4 |
| requires | e-3 |
| requiredLieState | S2 |
| sensitiveSealTargets | 구체적 송금 금액 + 송다은 아버지 실명 + 은행 계좌번호 |

### e-6 multi-trigger candidate 4종

#### Trigger 1 — cascade_from_card [priorCard: d-3]

**선결조건:**
- `requirePriorCardFired: 'd-3'` (Batch 1 d-3 영역 fired)
- `disputeLieState: { 'd-3': 'S3+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e6-via-cascade-judge-mention-v1` | 판사 | 전체 | d-3 fired 후 자발 mention | 격식·관찰·중립 |
| `emerge-e6-via-cascade-b-submit-v1` | B | 판사 | 자료 제출 (단답) | 평평·어쩔 수 없이 |
| `emerge-e6-via-cascade-judge-decree-v1` | 판사 | 전체 | e-6 surface 선언 | 격식·확정 |

**가이드:**
- 판사 mention dynamics: "앞서 등재된 쟁점 '아버지의 돈 접근 패턴'과 관련하여, 같은 흐름의 이전 자료 영역 확인이 필요합니다." (cascade reference)
- B 자료 제출 dynamics: "관련 자료가 있긴 합니다…" 자제 단답. 자료 본질은 통장 사본 + 메신저 캡처 (구체 금액/이름 surface X)
- 판사 decree: "본 법정에 [과거 송금 기록과 문자]를 자료로 채택합니다."

#### Trigger 2 — npc_interjection [source: b]

**선결조건:**
- `disputeLieState: { 'd-3': 'S2+' }`
- `contextAction: 'question.fact_pursuit.a'`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e6-via-npc-b-interject-v1` | B | 판사 | A 단정 발화 끊고 단답 자료 언급 | 평평·자제·어쩔 수 없이 |
| `emerge-e6-via-npc-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 + 단정 |
| `emerge-e6-via-npc-judge-mention-v1` | 판사 | 전체 | e-6 surface 결정 | 격식·관찰·중립 |

**가이드:**
- B 끼어듦: "관련 자료가 있긴 합니다." 자제 단답
- A 반응: "그건 다 끝난 일인데 왜!" 결론 먼저 부정
- 판사 mention: "관련 자료 영역 확인이 필요합니다."

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken', 'angry'] }`
- `disputeLieState: { 'd-3': 'S2+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e6-via-outburst-a-confess-v1` | A | 전체 | 격앙 외침 (과거 영역 부정) | 격앙·결론 먼저·부정 |
| `emerge-e6-via-outburst-judge-catch-v1` | 판사 | A | catch + 본 자료 영역 확인 의지 | 격식·중립 |
| `emerge-e6-via-outburst-judge-mention-v1` | 판사 | 전체 | e-6 surface 선언 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "다 끝난 일을 왜 자꾸 들춰내는 거야! 그때 일은 그때 일이고!" (격앙 부정 frame — "다 끝난 일" / "그때 일")
- 판사 catch: "방금 발화 중 이전 시점 영역이 언급됐습니다. 관련 자료 영역 확인이 필요합니다."
- 판사 mention: "본 법정에 [과거 송금 기록과 문자]를 자료로 채택합니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-e6-via-fallback-judge-query-v1` | 판사 | B | 자발 query (이전 시점 자료 영역) | 격식·관찰·중립 |
| `emerge-e6-via-fallback-b-submit-v1` | B | 판사 | 자제 단답 자료 제출 | 평평·어쩔 수 없이 |
| `emerge-e6-via-fallback-judge-mention-v1` | 판사 | 전체 | e-6 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query: "관련 자료가 있다면 제출해 주시기 바랍니다." 단순 frame ("과거" 수식어 회피)
- B 제출: "관련 자료가 있긴 합니다…" 자제 단답
- 판사 mention: "[과거 송금 기록과 문자]를 자료로 채택합니다."

---

## §3. emergence 설계 — dc-4 (4 trigger × 3-4 entry = 13 entry) + label 변경

### dc-4 (단서) 본질

| 영역 | 값 |
|---|---|
| **label (변경 후)** | **"손절의 이유"** (기존 "손절의 값") |
| description | 과거 손절이 변심이 아니라 사기 피해와 침묵의 결과였음을 드러내는 카드 |
| linkedDisputes | d-4 |
| linkedParty | b |
| linkedEvidence | e-3, e-6 |
| recipeId (combo) | combine-4 (e-3 + e-6) |
| successEffects | 과거 손절의 빈칸이 사기 피해 맥락으로 채워짐 / 최수민의 침묵 동기와 송다은의 성급한 결론이 함께 드러남 |
| effects | unlock_dispute d-5 |

**label 변경 권위**: 본 batch entry 본문 모든 dc-4 reference는 "**[손절의 이유]**" 사용 (기존 "[손절의 값]" X). 6단계 Authority apply에서 `friend-01.case.ts` dc-4.label 직접 변경 + derive sync.

### dc-4 multi-trigger candidate 4종

#### Trigger 1 — combination_result [recipeId: combine-4]

**선결조건:**
- `combine-4` (e-3 + e-6): e-3=original 이상, e-6=original 이상 → dc-4 부상
- `disputeLieState: { 'd-4': 'S0+' }`

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc4-via-combo-judge-query-v1` | 판사 | 전체 | 조합 결과 직후 query | 격식·분석·중립 |
| `emerge-dc4-via-combo-b-context-v1` | B | 판사 | 자제 단답 부연 (손절 정황) | 평평·자제 |
| `emerge-dc4-via-combo-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 + 단정 |
| `emerge-dc4-via-combo-judge-decree-v1` | 판사 | 전체 | dc-4 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query dynamics: "두 자료 — 손절 직전 카톡과 송금 기록 — 를 함께 보면, 손절 시점과 송금 시점이 겹치는 정황입니다." ("정렬되다" 회피, "겹치는" 자연)
- B 부연 dynamics: "그 시점이 손절 직전이었습니다." 평평 단답. "사기" 단어는 dc-4 단계 봉인 영역 (B는 정황 인식까지만)
- A 부정 dynamics: "그게 우리 아빠 때문이라고?!" 결론 먼저 부정
- 판사 decree: "본 법정에 단서 [손절의 이유]를 등록합니다." "단서" 명칭 + 새 label 정확히

#### Trigger 2 — cascade_from_card [priorCard: e-6]

**선결조건:**
- `requirePriorCardFired: 'e-6'`
- `disputeLieState: { 'd-4': 'S0+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc4-via-cascade-judge-decree-v1` | 판사 | 전체 | e-6 fired 후 자발 분석 | 격식·분석·중립 |
| `emerge-dc4-via-cascade-b-react-v1` | B | 판사 | 자제 단답 인정 | 평평·자제 |
| `emerge-dc4-via-cascade-judge-decree-v2` | 판사 | 전체 | dc-4 surface 확정 | 격식·확정 |

**가이드:**
- 판사 decree dynamics: "앞서 등재된 [과거 송금 기록과 문자]와 관련하여, 송금 시점과 손절 시점이 겹치는 정황입니다." (cascade reference + "겹치는" 자연 표현)
- B 인정: "그 시점이 손절 직전이었습니다." 평평 단답
- 판사 surface: "본 법정에 단서 [손절의 이유]를 등록합니다."

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken', 'angry'] }`
- `disputeLieState: { 'd-4': 'S0+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc4-via-outburst-a-deny-v1` | A | 전체 | 격앙 부정 외침 (손절 원인 부정) | 격앙·결론 먼저·부정 |
| `emerge-dc4-via-outburst-judge-catch-v1` | 판사 | A | catch + 분석 의지 | 격식·중립 |
| `emerge-dc4-via-outburst-judge-decree-v1` | 판사 | 전체 | dc-4 surface 선언 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "다 끝난 일을 왜 또 끌고와서 그래! 그때랑 지금이랑 무슨 상관이라고!" (사용자 권위 채택 — 격앙 부정 frame)
- 판사 catch: "방금 발화 중 두 시점의 정합성 영역이 언급됐습니다. 관련 자료들의 묶음 확인이 필요합니다."
- 판사 decree: "본 법정에 단서 [손절의 이유]를 등록합니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-dc4-via-fallback-judge-query-v1` | 판사 | 전체 | 자발 query | 격식·분석·중립 |
| `emerge-dc4-via-fallback-b-context-v1` | B | 판사 | 자제 단답 부연 | 평평·자제 |
| `emerge-dc4-via-fallback-judge-decree-v1` | 판사 | 전체 | dc-4 surface 선언 | 격식·확정 |

**가이드:**
- 판사 query: "두 자료를 함께 검토하겠습니다."
- B 부연: "손절 시점과 겹쳤습니다." 평평
- 판사 decree: "본 법정에 단서 [손절의 이유]를 등록합니다."

---

## §4. emergence 설계 — d-4 (4 trigger × 3 entry = 12 entry, legitimacyIssue)

### d-4 (쟁점, hidden, **legitimacyIssue**) 본질

| 영역 | 값 |
|---|---|
| name | 과거 손절과 아버지의 사기 |
| truthDescription | 과거 손절의 진짜 원인은 송다은 아버지가 최수민에게 투자 명목으로 돈을 받아간 사기였다. 최수민은 송다은에게 말하면 아버지 문제를 들춰야 해서 차마 말하지 못하고 악역을 자처했다 |
| hidden | true |
| v3Visibility | hidden |
| **legitimacyIssue** | **true** (friend-01 사건의 핵심 reveal) |
| requiredEvidence | e-6 |
| unlockCondition | requireDispute d-3 S3 |

### d-4 multi-trigger candidate 4종

#### Trigger 1 — cascade_from_card [priorCard: dc-4]

**선결조건:**
- `requirePriorCardFired: 'dc-4'` (dc-4 fired 직후 — 자연 chain, 가장 자연)
- `disputeLieState: { 'd-3': 'S3+' }` (unlock 충족)

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d4-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-4 fired 후 자발 mention + 새 쟁점 등재 | 격식·확정·중립 |
| `emerge-d4-via-cascade-a-react-v1` | A | 판사 | 격앙 부분 부정 | 격앙·결론 먼저 |
| `emerge-d4-via-cascade-b-react-v1` | B | 판사 | 자제 단답 부연 | 평평·자제 |

**가이드:**
- 판사 decree dynamics: "앞서 등재된 단서 [손절의 이유]를 근거로, 새 쟁점 '과거 손절과 아버지의 사기'를 본 법정 쟁점으로 등재합니다." (cascade reference + 새 label "손절의 이유" 사용)
- A 부정 dynamics: "그런 쟁점은 절대 받아들일 수 없어요! 우리 아빠를 사기꾼으로 만들지 마!" (격앙 부정 frame)
- B 부연 dynamics: "쟁점은 사실관계대로 확인되어야 합니다." 평평

#### Trigger 2 — combination_result [recipeId: combine-4]

**선결조건:**
- `combine-4` 발동 시 (dc-4와 동시 fire 가능)
- `disputeLieState: { 'd-3': 'S3+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d4-via-combo-judge-mention-v1` | 판사 | 전체 | combo 결과 직후 새 쟁점 등재 | 격식·분석·중립 |
| `emerge-d4-via-combo-a-react-v1` | A | 판사 | 격앙 부정 반응 | 격앙·결론 먼저 |
| `emerge-d4-via-combo-judge-decree-v1` | 판사 | 전체 | 새 쟁점 등재 확정 | 격식·확정 |

**가이드:**
- 판사 mention dynamics: "두 자료 — 손절 직전 카톡과 송금 기록 — 의 정합성이 확인됐습니다. 본 법정에 새 쟁점 '과거 손절과 아버지의 사기'를 등재합니다."
- A 부정: "그런 쟁점 인정 못 해!" 결론 먼저
- 판사 decree: "본 쟁점의 사실관계 확인을 시작합니다." 격식

#### Trigger 3 — emotional_outburst [source: a]

**선결조건:**
- `partyPhase: { a: ['shaken', 'angry'] }`
- `disputeLieState: { 'd-3': 'S3+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d4-via-outburst-a-deny-v1` | A | 전체 | 격앙 부정 외침 | 격앙·결론 먼저·부정 |
| `emerge-d4-via-outburst-judge-catch-v1` | 판사 | A | catch + 새 쟁점 등재 | 격식·중립 |
| `emerge-d4-via-outburst-judge-decree-v1` | 판사 | 전체 | 쟁점 등재 확정 | 격식·확정 |

**가이드:**
- A 외침 dynamics 의도: "우리 아빠를 사기꾼으로 만들지 마! 그런 식으로 끌고가지 마!" (격앙 부정 frame — A의 frame 핵심이 무너지는 영역)
- 판사 catch: "방금 발화 중 사실관계 영역이 직접 언급됐습니다. 본 영역의 정합성 확인이 필요합니다."
- 판사 decree: "본 법정에 새 쟁점 '과거 손절과 아버지의 사기'를 등재합니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-d4-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 mention | 격식·분석·중립 |
| `emerge-d4-via-fallback-a-react-v1` | A | 판사 | 단답 반응 | 결론 먼저 |
| `emerge-d4-via-fallback-judge-decree-v1` | 판사 | 전체 | 쟁점 등재 확정 | 격식·확정 |

**가이드:**
- 판사 mention: "관련 정황으로 새 쟁점 등재합니다." (d-3 fallback과 통일)
- A 반응: "그건 받아들이기 어렵습니다." 결론 먼저
- 판사 decree: "본 법정에 새 쟁점 '과거 손절과 아버지의 사기'를 등재합니다."

---

## §5. emergence 설계 — w-3 (4 trigger × 3 entry = 12 entry)

### w-3 (증인) 본질

| 영역 | 값 |
|---|---|
| name | 오미경 |
| age | 58 |
| occupation | 분식집 사장 |
| bias | pro_b |
| distortionRisk | accurate |
| knowledgeScope | 동네 분식집 사장으로, 과거에 송다은 아버지가 최수민에게 돈을 빌리러 온 것을 봤다. 최수민이 울면서 가게에 온 적이 있다 |
| relatedDisputes | d-4 |
| unlockedByDossier | dc-4 |
| address.fromA | 그 집 딸 |
| address.fromB | 수민이 |

### w-3 multi-trigger candidate 4종

#### Trigger 1 — cascade_from_card [priorCard: dc-4]

**선결조건:**
- `requirePriorCardFired: 'dc-4'` (자연 chain, 가장 자연 — unlockedByDossier 영역)

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w3-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-4 fired 후 증인 호출 | 격식·확정·중립 |
| `emerge-w3-via-cascade-a-react-v1` | A | 판사 | 격앙 부정 반응 | 격앙·결론 먼저 |
| `emerge-w3-via-cascade-b-react-v1` | B | 판사 | 자제 단답 부연 | 평평·자제 |

**가이드:**
- 판사 decree dynamics: "앞서 등재된 단서 [손절의 이유]와 관련하여, 당시 가게에 계셨던 증인을 본 법정에 모시겠습니다." (cascade reference + 호출 동사 다양화)
- A 부정: "분식집 사장이 무슨 증언이야!" 격앙 부정
- B 부연: "그분이 보셨어요." 자제 단답

#### Trigger 2 — combination_result [recipeId: combine-4]

**선결조건:**
- `combine-4` 발동 직후 증인 호출 자격
- `disputeLieState: { 'd-4': 'S0+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w3-via-combo-judge-mention-v1` | 판사 | 전체 | combo 결과 직후 증인 호출 | 격식·분석·중립 |
| `emerge-w3-via-combo-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 |
| `emerge-w3-via-combo-judge-decree-v1` | 판사 | 전체 | 증인 호출 확정 | 격식·확정 |

**가이드:**
- 판사 mention: "두 자료의 정합성이 확인됐습니다. 관련 정황의 증인을 확인해 보겠습니다." (호출 동사 다양화)
- A 부정: "또 누구를 데려오는 거야!" 결론 먼저
- 판사 decree: "분식집 사장 오미경 씨를 증인으로 모시겠습니다."

#### Trigger 3 — npc_interjection [source: b]

**선결조건:**
- `disputeLieState: { 'd-4': 'S1+' }`
- B 자제 단답으로 증인 영역 잠깐 언급 (b-context frame)

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w3-via-npc-b-context-v1` | B | 판사 | 자제 단답으로 증인 잠깐 언급 | 평평·자제 |
| `emerge-w3-via-npc-judge-catch-v1` | 판사 | B | catch + 증인 호출 의지 | 격식·중립 |
| `emerge-w3-via-npc-judge-decree-v1` | 판사 | 전체 | 증인 호출 확정 | 격식·확정 |

**가이드:**
- B 부연 dynamics 의도: "그때… 가게에서…" 자제 단답으로 잠깐 언급 (자세한 영역은 봉인)
- 판사 catch: "방금 발화 중 가게 관련 영역이 언급됐습니다. 관련 증인을 확인해 보겠습니다."
- 판사 decree: "분식집 사장 오미경 씨를 증인으로 호출하겠습니다."

#### Trigger 4 — judge_auto_mention [fallback]

**선결조건:**
- `turnsAfterEligible: 5`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w3-via-fallback-judge-mention-v1` | 판사 | 전체 | 자발 mention | 격식·분석·중립 |
| `emerge-w3-via-fallback-a-react-v1` | A | 판사 | 단답 반응 | 결론 먼저 |
| `emerge-w3-via-fallback-judge-decree-v1` | 판사 | 전체 | 증인 호출 확정 | 격식·확정 |

**가이드:**
- 판사 mention: "관련 정황의 증인을 들어보겠습니다." (호출 동사 다양화)
- A 반응: "또 증인까지…" 결론 먼저
- 판사 decree: "분식집 사장 오미경 씨를 증인으로 모시겠습니다."

---

## §6. emergence 설계 — w-2 dc-3 영역 확장 (2 trigger × 3 entry = 6 entry)

### w-2 확장 본질

w-2 (박준혁, 회사 후배 + 필라테스 수강생) 영역은 Cycle 7에서 dc-2 영역 4 trigger 작성됨. CT plot revision 영역에서 `unlockedByDossier: ['dc-2','dc-3']` 확장 + `relatedDisputes: ['d-2','d-3']` 확장 + `testimony.byDispute['d-3']` 신규.

본 cycle은 w-2 narrativeTriggers에 dc-3 영역 trigger 2개 추가 (cascade + combo). Cycle 7 dc-2 영역 4 trigger + 본 cycle dc-3 영역 2 trigger = 총 6 trigger candidate. **First-Fired-Wins** — 한 번 fire되면 모든 후보 disabled.

### 확장 trigger candidate 2종

#### Trigger 5 — cascade_from_card [priorCard: dc-3]

**선결조건:**
- `requirePriorCardFired: 'dc-3'` (Batch 1 dc-3 영역 fired — w-2 d-3 영역 호출)

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w2-via-cascade-dc3-judge-decree-v1` | 판사 | 전체 | dc-3 fired 후 w-2 d-3 영역 호출 | 격식·확정·중립 |
| `emerge-w2-via-cascade-dc3-a-react-v1` | A | 판사 | 격앙 부정 반응 | 격앙·결론 먼저 |
| `emerge-w2-via-cascade-dc3-b-react-v1` | B | 판사 | 자제 단답 부연 | 평평·자제 |

**가이드:**
- 판사 decree dynamics: "앞서 등재된 단서 [같은 부탁]과 관련하여, 회사 영역에서 흐름을 확인한 분의 증언을 본 법정에서 다시 확인해 보겠습니다." (cascade reference + 호출 동사 다양화)
- A 부정: "박준혁 씨를 또 부르는 거야?" 결론 먼저
- B 부연: "회사 자리에서 들은 게 있다고 했어요." 자제 단답

#### Trigger 6 — combination_result [recipeId: combine-3]

**선결조건:**
- `combine-3` 발동 직후 w-2 dc-3 영역 호출
- `disputeLieState: { 'd-3': 'S0+' }`

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | tone |
|---|---|---|---|---|
| `emerge-w2-via-combo-dc3-judge-mention-v1` | 판사 | 전체 | combo 결과 직후 w-2 d-3 영역 호출 | 격식·분석·중립 |
| `emerge-w2-via-combo-dc3-a-react-v1` | A | 판사 | 부분 부정 반응 | 결론 먼저 |
| `emerge-w2-via-combo-dc3-judge-decree-v1` | 판사 | 전체 | 증인 호출 확정 | 격식·확정 |

**가이드:**
- 판사 mention: "두 자료의 정합성과 관련하여, 회사 자리 영역의 증언을 다시 확인해 보겠습니다."
- A 부정: "또 박준혁 씨를…" 결론 먼저
- 판사 decree: "박준혁 씨를 증인으로 다시 모시겠습니다."

---

## §7. 작성 영역 정리

### 총 entry 수

55 entry — e-6 (12) + dc-4 (13) + d-4 (12) + w-3 (12) + w-2 dc-3 확장 (6)

### 출력 JSON 형식

```json
[
  {
    "id": "emerge-e6-via-cascade-judge-mention-v1",
    "text": "...",
    "behaviorHint": "...",
    "tags": ["..."]
  },
  ...
]
```

### 공통 tags 패턴 (Batch 1과 동일 + 본 batch 신규)

- **trigger type**: `trigger:cascade_from_card` / `trigger:combination_result` / `trigger:npc_interjection` / `trigger:emotional_outburst` / `trigger:judge_auto_mention`
- **emergence target**: `emerge:e-6` / `emerge:dc-4` / `emerge:d-4` / `emerge:w-3` / `emerge:w-2` (dc-3 영역만)
- **role**: `role:judge` / `role:a` / `role:b`
- **register**: `register:formal` / `register:plain`
- **archetype**: `arch:flatten` (B 발화) / `arch:premature` (A 발화)
- **dynamics**: `dynamics:cascade-mention` / `dynamics:combo-decree` / `dynamics:outburst-catch` / `dynamics:fallback-query` 등
- **priorCard tag** (cascade entry만): `priorCard:d-3` / `priorCard:e-6` / `priorCard:dc-4` / `priorCard:dc-3` (w-2 확장)
- **recipe tag** (combo entry만): `recipe:combine-4` / `recipe:combine-3` (w-2 확장)
- **surface seal tier**:
  - `seal:d4-pre-S3` (e-6 자료 surface 영역 — 사기 단어 X, 자료 인용까지)
  - `seal:d4-S0+` (dc-4 영역 — B 정황 인식, A 부정 외침)
  - `seal:d4-S3+` (d-4 emergence 영역 — 새 쟁점 등재까지, 그룹 4 동기는 S4 이상)
  - `seal:group2-pending` (사기/투자 명목/미상환 — 본 batch에서 surface 가능하나 S3 후만)
  - `seal:group4-blocked-pre-S4` (B 차마 못 말함 등 동기 영역 — S4 이상에서만, 본 batch는 S3까지)

### 검증 self-check (4단계 GPT Pro 작성 + 5단계 검토)

- [ ] 모든 entry id가 §2~§6의 명세와 정확히 일치
- [ ] **그룹 2 surface tier 준수**:
  - e-6 자료 영역 entry (cascade-d3 trigger 등 d-3 S3 unlock 직후): "사기" 단어 X, 자료 인용까지
  - dc-4 영역 entry: B 정황 인식까지, A 부정 외침 frame
  - d-4 영역 entry: 새 쟁점 등재 frame (truthDescription 직접 인용 X, 쟁점명만)
  - w-3 영역 entry: 증인 호출 frame (증인 증언 자체는 다른 channel)
- [ ] **그룹 4 surface 위반 없음** — "B 차마 못 말함" / 침묵 동기 영역 본 batch에서 X (S4 이상 영역)
- [ ] **dc-4 label "손절의 이유" 정확히 사용** (모든 reference + 본문)
- [ ] 재판관 어법 — "선/흐름/낙인" X, "정황/선후관계/관련" O, "겹치는" / "이어지는" 자연 표현 (정렬 X)
- [ ] "과거" 같은 불필요 수식어 회피
- [ ] B 자제 톤 (b-submit, b-react, b-context 모두 단답 + 어쩔 수 없는 frame)
- [ ] A 부정 외침 (a-outburst dynamics 격앙 + 단정 frame, "다 끝난 일을 왜 또 끌고와서!" 등)
- [ ] "단서" 명칭 사용
- [ ] cascade entry의 priorCard reference text 본문 포함
- [ ] d-4 쟁점명 "과거 손절과 아버지의 사기" 정확히 사용
- [ ] w-3 증인 호출 동사 다양화 (호출하겠습니다 / 증인으로 모시겠습니다 / 확인해 보겠습니다)
- [ ] w-2 확장 entry는 First-Fired-Wins 영역 (Cycle 7 dc-2 영역과 다른 cascade reference 본문)

---

본 의뢰서 정독 + 권위 메모리 정독 + tone-samples 정독 후 KO entry 55개 작성. 출력 파일명: `output-cycle8b-batch2.json`.

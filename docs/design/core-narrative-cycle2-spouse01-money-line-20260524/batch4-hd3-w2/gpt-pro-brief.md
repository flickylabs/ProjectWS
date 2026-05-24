# GPT Pro 의뢰서 — spouse-01 Batch 4: h-d3 + w-2(h-d3) emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (h-d3 쟁점 + w-2 h-d3 영역 증인) — 총 22 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음. README.md 파일 목록 참조.

톤 reference: `spouse01-tone-samples.md`

---

## §1. 사건 context

### h-d3 "공동 적금 2,000만원 해지 경위" (잠재 쟁점)

- 의미: 공동 적금이 만기 전에 해지된 흔적이 확인됐다. 해지 과정에서 배우자 동의 여부와 위임장 진위 문제가 남아 있으며, 해지금 2,000만원의 실제 행선지도 아직 확인해야 한다.
- 게임 역할: **잠재 쟁점 (Hidden Dispute)** — 게임 시작 시 hidden, d-2 진행 중 발현
- 현재 mechanical 조건: `requireDispute: { id: 'd-2', minState: 'S3' }`
- quadrant: `a_only` (A 측 책임), weight: `high`, ambiguity: `high`
- hidden: `true`

⚠ **잠재 쟁점의 narrative 권위:** 사용자 핵심 요구
> "감도 못 잡은 쟁점이 풀려나면 안 됨. NPC 끼어듦/판사 reactive query 같은 *말꼬리 잡을 만한 사건*이 trigger여야 함."

### w-2 "은행 직원" (h-d3 영역만)

- 의미: 위임장으로 공동 적금 해지한 건 처리. 절차상 이상한 점 인지했지만 처리됨. 본인 책임 회피 톤.
- 게임 역할: **h-d3 영역의 외부 증인 (위임장 처리 절차 증언)**. 위임장 위조 + 절차 이상 흔적 증언.
- 현재 mechanical 조건: `unlockedByDossier: ['dc-3', 'dc-4', 'dc-7']` (어느 카드든 발현 시 호출 가능)
- relatedDisputes: [`d-2`, `h-d3`]
- bias: `neutral`, distortionRisk: `accurate`

⚠ **본 batch는 w-2의 h-d3 영역 호출만**:
- w-2 첫 호출 시 d-2 영역 증언 + h-d3 영역 증언 양쪽 가능
- 본 batch는 **dc-7 발현 후 h-d3 증언 분기로 자연 진입**하는 narrative만 작성
- d-2 영역 증언 분기는 별도 cycle

⚠ **Issue B 사용자 권위:** w-2 첫 등장만으로 hidden 쟁점 일괄 노출은 정책 위반. **dc-7 cascade** OR **B 끼어들기** OR **판사 fallback** 만이 자연.

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

각 emergence는 trigger 후보 중 첫 발동만 fire.

---

### Emergence 7: **h-d3** (잠재 쟁점) — 4 trigger

#### Trigger 1 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- d-2 lieState ≥ S2 (B가 별도 계좌 시인 시점 이후)
- B emotional phase ≠ 'collapsed'
- 활성 액션: 사용자가 A 대상 d-2 추궁 중

**Narrative scenario:**
- 컨텍스트: A가 d-2 영역에서 회피 진술 중 (B 비자금 의심 유지). B가 "공동 적금도 비어 있더라" 흘림
- 발동 흐름 (~9초): A 답변 중 → B 끼어들기 → 판사 reactive query → B 부연 → 판사 h-d3 발현 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd3-via-b-interject-v1` | B | 판사 | 끼어들기 (공동 적금 잔액 변화 흘림) | 2 문장 | 단호·발견적 |
| `emerge-hd3-via-b-interject-judge-react-v1` | 판사 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-hd3-via-b-interject-b-response-v1` | B | 판사 | 답변 (잔액 변화 부연) | 1~2 문장 | 단호·구체 |
| `emerge-hd3-via-b-interject-judge-decree-v1` | 판사 | 전체 | h-d3 발현 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "재판관님, 한 가지 더 짚어야 합니다. 저희 부부 공동 적금 잔액에도 큰 변화가 있었습니다."
- 판사 react: "이준호 씨, 그 변화를 어떻게 인지하셨습니까?"
- B response: "통장 정리 과정에서 우연히 확인했습니다. 만기 전 해지로 보입니다." — "위임장 위조"는 surface X (h-d3 발현 시점에서는 "해지 경위" 까지만)
- 판사 decree: "본 법정에 [공동 적금 2,000만원 해지 경위] 쟁점을 추가로 다룹니다."

#### Trigger 2 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 `combine-5` (e-7 해지 서류 + 박지연 자기방어 진술) 조합 실행
- e-7 Original 도달 (※ e-7 자체도 h-d3 발현과 거의 동시 가능 — Batch 1의 e-7 emergence와 cross-reference)
- d-2 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: e-7 등재와 거의 동시에 h-d3 쟁점 발현 (combine-5 조합이 두 emergence 양쪽 trigger)
- 발동 흐름 (~6초): 조합 결과 → 판사 쟁점 추가 선언 → A 답변 → 판사 h-d3 발현

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd3-via-combo-judge-query-v1` | 판사 | A | 분석 결과 + 쟁점 추가 | 2 문장 | 격식·발견적 |
| `emerge-hd3-via-combo-a-response-v1` | A | 판사 | 답변 (회피) | 1 문장 | 위축·회피 |
| `emerge-hd3-via-combo-judge-decree-v1` | 판사 | 전체 | h-d3 발현 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query: "공동 적금 해지 절차와 자기방어 진술이 정합되며, 본 법정은 그 해지 경위 자체를 추가 쟁점으로 다룰 필요가 있다고 봅니다."
- A response: "그 절차는 사정상 어쩔 수 없는 일이었습니다."
- decree: trigger 1과 동일 form

#### Trigger 3 — A의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- d-2 lieState ≥ S3 (A가 d-2 영역에서 동요 임계점)
- A emotional phase = 'shaken' OR 'overwhelmed'
- 활성 액션: 사용자가 A 대상 fact_pursuit 류 강압 직후

**Narrative scenario:**
- 컨텍스트: A가 d-2 추궁 누적으로 동요. 강압 질문에 폭발 → 적금 언급 흘림
- 발동 흐름 (~8초): A 돌발 발화 → 판사 catch → A 부연 → 판사 h-d3 발현

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd3-via-a-outburst-v1` | A | 판사 | 격앙 돌발 (적금 흘림) | 2 문장 | 격앙·자기 폭로 |
| `emerge-hd3-via-a-outburst-judge-catch-v1` | 판사 | A | catch + 지적 | 1 문장 | 격식·매서움 |
| `emerge-hd3-via-a-outburst-a-admit-v1` | A | 판사 | 부연 (적금 절차 시인) | 1 문장 | 체념·시인 |
| `emerge-hd3-via-a-outburst-judge-decree-v1` | 판사 | 전체 | h-d3 발현 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A outburst: "남편이 자꾸 별도 계좌 얘기만 하시는데, 그 사이 공동 적금도 손대야 했습니다! 저도 어쩔 수 없었습니다!" — "적금 손댐" 자기 폭로 (위임장 위조는 surface X)
- 판사 catch: "박지연 씨, 방금 말씀하신 [공동 적금] 처리 경위를 본 법정이 검토하겠습니다."
- A admit: "그 절차에 대해 답변하겠습니다."
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + d-2 lieState ≥ S4 도달 후 4턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-hd3-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 쟁점 추가 선언 | 2 문장 | 격식·결정 |
| `emerge-hd3-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 동의 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto: "양측 자금 흐름 정리 과정에서 공동 적금 해지 경위도 확인이 필요하다고 판단합니다. 본 법정은 해당 쟁점을 추가로 다루겠습니다."
- A respond: "예, 받아들이겠습니다."

**h-d3 total: 4 + 3 + 4 + 2 = 13 entry**

---

### Emergence 8: **w-2 (h-d3 영역)** (증인 호출 + h-d3 분기 진입) — 3 trigger

⚠ w-2는 dc-3 / dc-4 / dc-7 어느 카드 발현 시에도 호출 가능. **본 batch는 dc-7 발현 후 h-d3 영역 증언 분기로 자연 진입** narrative만.

dc-3/dc-4 발현으로 w-2 호출은 d-2 영역 증언 분기 (별도 cycle).

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-7` (공동 적금 2,000만 원의 해지) 이미 fired
- h-d3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: dc-7 등재 후 위임장 처리 절차 확인 필요 → w-2 호출 시 자연스럽게 h-d3 영역 증언으로 진입
- 발동 흐름 (~6초): 판사 자발 cascade mention → A acknowledge → 판사 w-2 h-d3 영역 호출 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w2hd3-via-cascade-judge-mention-v1` | 판사 | 전체 | cascade query (dc-7 reference) | 2 문장 | 격식·추적적 |
| `emerge-w2hd3-via-cascade-a-acknowledge-v1` | A | 판사 | 짧은 acknowledge | 1 문장 | 위축·인정 |
| `emerge-w2hd3-via-cascade-judge-summon-v1` | 판사 | 전체 | w-2 호출 (위임장 절차 증언) | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade: "앞서 등재된 [공동 적금 2,000만 원의 해지] 절차에 대한 객관적 확인이 필요합니다. 해지 처리를 담당한 은행 측 증언을 본 법정에 들이는 절차를 열겠습니다."
- A acknowledge: "예, 절차에 따르겠습니다."
- 판사 summon: "본 법정은 해당 은행 직원을 위임장 처리 경위 증언을 위해 호출 가능하도록 허가합니다."

#### Trigger 2 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- dc-7 이미 fired
- B emotional phase ≠ 'collapsed'

**Narrative scenario:**
- 컨텍스트: dc-7 등재 후 B가 "위임장 진위 확인 부탁드린다" 직접 요청 → w-2 호출
- 발동 흐름 (~9초): B 끼어들기 → 판사 reactive query → B 부연 → 판사 w-2 호출 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w2hd3-via-b-interject-v1` | B | 판사 | 끼어들기 (위임장 진위 확인 요청) | 2 문장 | 단호·요청 |
| `emerge-w2hd3-via-b-interject-judge-react-v1` | 판사 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-w2hd3-via-b-interject-b-elaborate-v1` | B | 판사 | 부연 (객관 증언 필요성) | 1~2 문장 | 단호·구체 |
| `emerge-w2hd3-via-b-interject-judge-summon-v1` | 판사 | 전체 | w-2 호출 (위임장 절차 증언) | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "재판관님, 한 가지 부탁드립니다. 위임장 처리 경위에 대한 객관적 증언이 본 법정에 필요합니다."
- 판사 react: "이준호 씨, 구체적으로 어떤 증언을 요청하시는 겁니까?"
- B elaborate: "해지 절차를 담당한 은행 직원의 증언입니다. 절차 자체의 진위를 확정해 주시기 바랍니다."
- 판사 summon: trigger 1과 동일 form

#### Trigger 3 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2 미발동 + dc-7 fired 후 + w-2 호출 액션 사용자 실행 + 2턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w2hd3-via-judge-auto-summon-v1` | 판사 | 전체 | 자발 호출 분기 선언 | 2 문장 | 격식·결정 |
| `emerge-w2hd3-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 동의 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto: "위임장 처리 경위 확인이 길어졌습니다. 본 법정은 은행 측 직원을 호출하여 절차 증언을 청취하겠습니다."
- A respond: "예, 받아들이겠습니다."

**w-2(h-d3) total: 3 + 4 + 2 = 9 entry**

---

**Batch 4 grand total: 13 + 9 = 22 entry**

---

## §3. `cascade_from_card` trigger 신규 spec

**Trigger 정의:** 이전 사건 카드/증거가 이미 발현된 상태에서, 그 narrative line의 자연 연속으로 다음 카드/증거/증인이 등장.

**Schema field 신규:**

```typescript
{
  requirePriorCardFired?: string  // dossierCardId or evidenceId
}

type NarrativeTriggerType =
  | 'npc_interjection'
  | 'combination_result'
  | 'emotional_outburst'
  | 'judge_auto_mention'
  | 'cascade_from_card'  // ← 신규
```

**Tag spec:**
```
"trigger:cascade_from_card"
"priorCard:<dossierCardId or evidenceId>"
```

**본 batch 적용:**
- w-2(h-d3) cascade: `priorCard:dc-7`

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 의 `emergence_narrative` channel에 추가.

```json
{
  "id": "emerge-hd3-via-b-interject-v1",
  "text": "{KO 시안}",
  "behaviorHint": "{선택}",
  "tags": [
    "channel:emergence_narrative",
    "speaker:b",
    "speakerRole:party",
    "listener:judge",
    "listenerRole:judge",
    "address:toJudge",
    "scope:all_present",
    "register:formal",
    "honorific:formal",
    "audience:both",
    "tense:present",
    "relationship:spouse",
    "judgeAddress:재판관님",
    "callTerm:none",
    "emotion:firm",
    "continuity:interjection",
    "reveal:partial",
    "disclosure:guarded",
    "trigger:npc_interjection",
    "emergence:h-d3"
  ]
}
```

**Tag 명세:**
- `channel:emergence_narrative`
- `speaker:{a|b|judge}`
- `listener:{judge|a|b|all}`
- `register:formal`
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{h-d3|w-2}`  ← w-2 영역 식별을 위해 추가 tag `disputeContext:h-d3` 도 권장
- **cascade_from_card**: `priorCard:{id}` (w-2은 `priorCard:dc-7`)
- **combination_result**: `comboRecipeId:{recipeId}` (h-d3은 `combine-5`)
- 증인 호출 entry는 `continuity:summon` tag 권장

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. 본 batch는 **잠재 쟁점 발현 시점 무게감** 강조 — 단정·강압 회피하되 결정적 톤
- **A (박지연)**: **위축·회피·자기 폭로** dynamics. h-d3 emotional_outburst가 narrative 중요 폭발점
- **B (이준호)**: **단호·발견적·요청적** — h-d3 발현 + 위임장 진위 확인 두 영역 모두 B가 적극 추진
- 호명 일관: 재판관님 / 박지연 씨 / 이준호 씨

`feedback_natural_korean_npc_active_voice.md` 5 차원 적용.
`feedback_self_reference_speaker_context.md` 정밀.

---

## §6. 진실 노출 경계

`design_spouse01_truth_disclosure_policy.md` 권위 준수.

### h-d3 발현 narrative에서 surface 금지:

- "박지연 단독 해지" / "위임장 위조" 단정 — h-d3 S4/S5 이후만. **발현 시점에서는 "해지 경위" / "절차 이상"까지만**
- "투자방 송금" / "사기 손실" — 별도 후속 emergence (dc-4, e-6) 영역
- "위조 자필" 단정 단어는 X — "필적 차이" / "진위 검증 필요"로 우회 (B 발화는 단호하지만 정확한 단어 X)
- h-d3 발현 narrative는 **"쟁점 자체의 등장"까지만 surface**

### w-2(h-d3) 호출 narrative에서 surface 경계:

- "위임장 위조" / "단독 해지" 단정 단어 surface 금지 — "처리 절차" / "위임장 진위 확인"으로 표현
- w-2 증언 내용은 별도 channel (witness) — 본 batch는 호출 분기 진입까지만
- 은행 직원 본인 책임 회피 톤은 증언 channel에서 처리. 본 호출 narrative에서는 단순 호출 가능 surface만

---

## §7. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 22 KO entry 작성 (JSON 파일)
2. 사용자 spot check
3. Claude가 `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가
4. Claude가 h-d3 narrativeTriggers + w-2 narrativeTriggers 부착
5. **dispute type schema 확장** (`Dispute.narrativeTriggers` field 신규)
6. **witness type schema 확장 — disputeContext 분기 지원** (`Witness.narrativeTriggers` field + disputeContext 매핑)
7. Codex 다국어 sync 의뢰서
8. tsc + build + commit + push

---

## §8. 본 batch 진행 메모

- **Batch 4는 자금 line과 병행 발현** — Batch 1/2/3과 같은 게임 세션에서 cross-fire 가능
- **dispute type에 narrativeTriggers 부착하는 첫 사례** — schema 확장 (`Dispute.narrativeTriggers`) 필요
- **witness type에 disputeContext 분기** — w-2는 d-2/h-d3 두 영역 분기 필요 (h-d3은 본 batch, d-2는 별도 cycle)
- **Issue B 영역 직접 해결** — w-2 첫 호출만으로 hidden 일괄 노출 X

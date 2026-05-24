# GPT Pro 의뢰서 — spouse-01 Batch 3: dc-4 + w-3 emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (dc-4 사건 카드 + w-3 증인) — 총 25 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음. README.md 파일 목록 참조.

톤 reference: `spouse01-tone-samples.md`

---

## §1. 사건 context

### dc-4 "돌이키고 싶은 2,000만 원"

- 의미: 박지연(A)이 위임장 위조로 해지한 공동 적금 2,000만 원을 투자방에 송금한 뒤 사기로 전액 잃은 영역. 후회·수치심 frame.
- 게임 역할: **h-d3 영역의 사기 손실 line 종결**. dc-7(해지) → e-6(송금) → dc-4(사기 결과)의 chain 마지막.
- 현재 mechanical 조건: `combine-3` (e-6 투자방 + e-7 해지 서류) 조합, cost 2
- linkedDisputes: [`h-d3`], linkedParty: `a`
- 노트: A가 박미라(w-3)의 텔레그램 VIP 투자클럽 링크 전달 후 해지액 2,000만 원 전액 송금 → 운영자 잠적 → 전액 손실.

### w-3 "박미라"

- 의미: A의 친구 (카페 운영자). A에게 텔레그램 투자방 링크를 보낸 당사자. 자신의 책임이 불거질까 봐 조심.
- 게임 역할: **h-d3 영역의 외부 증인**. 박지연의 "본인 돈 지키겠다" 동기 발언 + 본인이 링크 전달 사실 증언.
- 현재 mechanical 조건: `unlockedByDossier: ['dc-4']` (dc-4 발현 후 호출 가능)
- relatedDisputes: [`h-d3`]
- bias: `pro_a`, distortionRisk: `strategic` (자기 책임 회피 톤)

⚠ **w-3 emergence는 "호출 가능 surface" 시점의 narrative**:
- 즉 판사가 "박미라 씨를 증인으로 부를 수 있게 됐다"라고 surface하는 시점의 narrative만 작성
- 실제 박미라 증언 자체는 별도 `witness` channel 영역 (본 batch 범위 외)

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

각 emergence는 trigger 후보 중 첫 발동만 fire.

---

### Emergence 5: **dc-4** (사건 카드) — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 `combine-3` (e-6 투자방 + e-7 해지 서류) 조합 실행
- e-6 Original, e-7 Original 모두 도달
- h-d3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: 투자방 송금 기록과 공동 적금 해지 서류가 동일 날짜·금액으로 연결되며 사기 손실 line 확정
- 발동 흐름 (~7초): 조합 결과 → 판사 사기 손실 확정 narrative → A 답변 (자기 인정) → 판사 dc-4 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-combo-judge-query-v1` | 판사 | A | 분석 결과 + reactive query | 2 문장 | 격식·확정 |
| `emerge-dc4-via-combo-a-response-v1` | A | 판사 | 답변 (자기 인정 시작) | 1~2 문장 | 위축·체념 |
| `emerge-dc4-via-combo-judge-decree-v1` | 판사 | 전체 | dc-4 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query: "해지액 2,012만 원이 동일 날짜·금액으로 투자방 운영자 계좌에 송금된 사실이 정합됐습니다. 이 자금의 결과에 대해 말씀해 주십시오."
- A response: "그 돈은… 결국 돌아오지 않았습니다." — 사기 결과 시인 (구체 "사기" 단어는 surface OK, 손실액 확정은 다음 entry)
- 판사 decree: "본 법정에 [돌이키고 싶은 2,000만 원] 사건 카드를 정식 등재합니다."

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `e-6` (투자방 송금 기록) 이미 fired
- e-7 Original (해지 서류) 도달
- h-d3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: e-6 등재 후 (dc-7 → e-6 chain) 판사가 자연 정리: 해지 → 송금 → 손실 line 완성. dc-4 surface
- 발동 흐름 (~6초): 판사 자발 cascade mention → A 답변 → 판사 dc-4 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-cascade-judge-mention-v1` | 판사 | A | 자발 정리 (e-6 reference) | 2 문장 | 격식·정리적 |
| `emerge-dc4-via-cascade-a-response-v1` | A | 판사 | 답변 (체념) | 1 문장 | 체념·시인 |
| `emerge-dc4-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-4 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade: "앞서 등재된 [투자방 텔레그램 + 송금 기록]을 종합하면, 해지액의 결과까지 정리할 시점입니다. 본 법정은 후속 결과 카드를 다음으로 검토합니다."
- A response: "예, 받아들이겠습니다."
- decree: trigger 1과 동일 form

#### Trigger 3 — A의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- e-6 이미 fired
- A emotional phase = 'overwhelmed' OR 'collapsed' (수치 임계점 초과)
- 활성 액션: 사용자가 A 대상 emotion 류 강압 직후

**Narrative scenario:**
- 컨텍스트: A가 e-6 등재 후 수치심이 임계점 초과. 강압 질문에 자기 인정 폭발
- 발동 흐름 (~8초): A 돌발 인정 (사기 손실) → 판사 catch → A 추가 시인 → 판사 dc-4 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-a-outburst-v1` | A | 판사 | 격앙 돌발 (사기 손실 자기 인정) | 2 문장 | 격앙·자기 폭로·후회 |
| `emerge-dc4-via-a-outburst-judge-catch-v1` | 판사 | A | catch + 신중 | 1 문장 | 격식·관찰 |
| `emerge-dc4-via-a-outburst-a-admit-v1` | A | 판사 | 추가 시인 | 1 문장 | 체념·후회 |
| `emerge-dc4-via-a-outburst-judge-decree-v1` | 판사 | 전체 | dc-4 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A outburst: "그 돈을 다 잃었습니다. 사기였습니다. 제가 그걸 받아들이지 못해서… 지금까지 말하지 못했습니다." — 사기 + 손실 자기 폭로 (수치/후회 톤)
- 판사 catch: "박지연 씨, 본 법정은 본인의 진술을 무겁게 받아들이겠습니다."
- A admit: "전부 제가 책임지겠습니다."
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + e-6 fired 후 3턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc4-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 surface | 2 문장 | 격식·결정 |
| `emerge-dc4-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 시인 | 1 문장 | 무표정·시인 |

**가이드:**
- 판사 auto: "투자방 송금 이후의 자금 결과가 정리되지 않았습니다. 본 법정은 결과 카드를 추가로 등재합니다."
- A respond: "예, 받아들이겠습니다."

**dc-4 total: 3 + 3 + 4 + 2 = 12 entry**

---

### Emergence 6: **w-3 박미라** (증인 호출 가능 surface) — 4 trigger

⚠ 본 emergence는 박미라 증언이 아니라 **"박미라 씨를 증인으로 부를 수 있게 됐다"**의 surface 시점 narrative.

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-4` (돌이키고 싶은 2,000만 원) 이미 fired
- h-d3 lieState ≥ S3

**Narrative scenario:**
- 컨텍스트: dc-4 등재 후 판사가 "투자방 링크의 출처는 누구냐" 자연 의문 → w-3 호출 가능 surface
- 발동 흐름 (~6초): 판사 자발 cascade query → A 짧은 acknowledge → 판사 w-3 호출 가능 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-cascade-judge-mention-v1` | 판사 | A | cascade query (dc-4 reference) | 2 문장 | 격식·추적적 |
| `emerge-w3-via-cascade-a-acknowledge-v1` | A | 판사 | 짧은 acknowledge | 1 문장 | 위축·인정 |
| `emerge-w3-via-cascade-judge-summon-v1` | 판사 | 전체 | w-3 호출 가능 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade: "앞서 등재된 [돌이키고 싶은 2,000만 원] 관련하여, 투자방 링크 전달 경위 확인이 필요합니다. 박지연 씨, 본인에게 그 링크를 전달한 사람이 있습니까?"
- A acknowledge: "지인 한 명이 있습니다." — 박미라 이름 직접 surface 회피, "지인"으로 우회
- 판사 summon: "본 법정은 해당 인물을 증인으로 부를 수 있도록 허가합니다." — "박미라"는 다음 박미라 증언 channel에서 등장

#### Trigger 2 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- dc-4 이미 fired
- B emotional phase ≠ 'collapsed'

**Narrative scenario:**
- 컨텍스트: dc-4 등재 후 B가 "그 투자방을 누가 소개했느냐" 직접 추궁
- 발동 흐름 (~9초): B 끼어들기 → 판사 reactive query → A 답변 → 판사 w-3 호출 가능 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-b-interject-v1` | B | 판사 | 끼어들기 (링크 출처 추궁) | 2 문장 | 단호·추궁 |
| `emerge-w3-via-b-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-w3-via-b-interject-a-response-v1` | A | 판사 | 답변 (지인 시인) | 1 문장 | 위축·인정 |
| `emerge-w3-via-b-interject-judge-summon-v1` | 판사 | 전체 | w-3 호출 가능 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "재판관님, 한 가지 더 확인 부탁드립니다. 그 투자방을 제 아내에게 소개한 사람이 누구입니까?"
- 판사 react: "박지연 씨, 본인에게 링크를 전달한 사람을 본 법정에 알려 주십시오."
- A response: "지인 한 명입니다."
- summon: trigger 1과 동일 form

#### Trigger 3 — A의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- dc-4 이미 fired
- A emotional phase = 'shaken' OR 'overwhelmed'

**Narrative scenario:**
- 컨텍스트: A가 dc-4 직후 박미라 이름을 본인이 흘림 (수치심 + 책임 분산)
- 발동 흐름 (~8초): A 돌발 발화 → 판사 catch → A 추가 시인 → 판사 w-3 호출 가능 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-a-outburst-v1` | A | 판사 | 격앙 돌발 (지인 이름 흘림) | 2 문장 | 격앙·자기 폭로 |
| `emerge-w3-via-a-outburst-judge-catch-v1` | 판사 | A | catch + 신중 | 1 문장 | 격식·관찰 |
| `emerge-w3-via-a-outburst-a-admit-v1` | A | 판사 | 추가 시인 | 1 문장 | 체념·시인 |
| `emerge-w3-via-a-outburst-judge-summon-v1` | 판사 | 전체 | w-3 호출 가능 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A outburst: "그건 미라가 보내준 링크였습니다! 저 혼자 결정한 일이 아닙니다!" — 박미라 이름 본인이 흘림 (책임 분산 톤)
- 판사 catch: "박지연 씨, 방금 언급하신 분의 증언이 필요한지 본 법정이 판단하겠습니다."
- A admit: "예, 미라 씨 증언을 부탁드립니다."
- summon: "본 법정은 박미라 씨를 증인으로 부를 수 있도록 허가합니다." — 이름 surface OK (A 본인이 이미 surface함)

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + dc-4 fired 후 4턴 경과 + h-d3 lieState ≥ S3

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w3-via-judge-auto-summon-v1` | 판사 | 전체 | 자발 호출 가능 선언 | 2 문장 | 격식·결정 |
| `emerge-w3-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 시인 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto: "투자방 링크 출처 확인이 길어졌습니다. 본 법정은 관련 인물을 증인으로 부를 수 있도록 절차를 열겠습니다."
- A respond: "예, 받아들이겠습니다."

**w-3 total: 3 + 4 + 4 + 2 = 13 entry**

---

**Batch 3 grand total: 12 + 13 = 25 entry**

---

## §3. `cascade_from_card` trigger 신규 spec

**Trigger 정의:** 이전 사건 카드(dossierCard) 또는 증거(evidence)가 이미 발현된 상태에서, 그 narrative line의 자연 연속으로 다음 카드/증거/증인이 등장.

**Schema field 신규:**

```typescript
{
  requirePriorCardFired?: string  // dossierCardId or evidenceId — priorCard 통합
}

type NarrativeTriggerType =
  | 'npc_interjection'
  | 'combination_result'
  | 'emotional_outburst'
  | 'judge_auto_mention'
  | 'cascade_from_card'  // ← 신규
```

**Runtime 거동:**
- 평가 시점: 이전 카드/증거 fired 상태 + 본 trigger의 다른 precondition 만족 시
- ScriptedText: 이전 카드 명시 reference 필수

**Tag spec:**
```
"trigger:cascade_from_card"
"priorCard:<dossierCardId or evidenceId>"
```

**본 batch 적용:**
- dc-4 cascade: `priorCard:e-6`
- w-3 cascade: `priorCard:dc-4`

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 의 `emergence_narrative` channel에 추가.

증인 emergence (w-3) 의 listener는 일반적으로 `judge` 또는 `all`. 증인 자체(`박미라`)는 아직 호출 전이므로 본 batch entry의 speaker/listener에 등장 X.

```json
{
  "id": "emerge-w3-via-cascade-judge-summon-v1",
  "text": "{KO 시안}",
  "behaviorHint": "{선택}",
  "tags": [
    "channel:emergence_narrative",
    "speaker:judge",
    "speakerRole:judge",
    "listener:all",
    "listenerRole:all",
    "address:toAll",
    "scope:all_present",
    "register:formal",
    "honorific:formal",
    "audience:both",
    "tense:present",
    "relationship:spouse",
    "emotion:measured",
    "continuity:summon",
    "reveal:none",
    "disclosure:guarded",
    "trigger:cascade_from_card",
    "priorCard:dc-4",
    "emergence:w-3"
  ]
}
```

**Tag 명세:**
- `channel:emergence_narrative`
- `speaker:{a|b|judge}`
- `listener:{judge|a|b|all}`
- `register:formal`
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{dc-4|w-3}`
- **cascade_from_card**: `priorCard:{id}` (dc-4은 `priorCard:e-6`, w-3은 `priorCard:dc-4`)
- **combination_result**: `comboRecipeId:{recipeId}` (dc-4은 `combine-3`)
- 증인 호출 entry는 `continuity:summon` tag 추가 권장

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. 본 batch는 **추적적·결정적** 톤 강조 (자금 chain 종결 단계)
- **A (박지연)**: **체념·후회·자기 폭로** 톤 본격 등장. dc-4 emotional_outburst가 narrative climax
- **B (이준호)**: 단호·추궁 (B가 외부 증인 호출 추진)
- 호명 일관: 재판관님 / 박지연 씨 / 이준호 씨 / **박미라 씨 또는 미라 (A가 호명 시)**

박미라 호칭:
- 판사 발화: **박미라 씨**
- A 발화 (친구): **미라** OR **미라 씨** (격식 환경에서는 씨 권장)
- B 발화 (제3자): **박미라 씨**

본 batch는 **A의 자기 폭로가 narrative 중심** — emotional 톤 깊이 신경.

`feedback_natural_korean_npc_active_voice.md` 5 차원 적용.
`feedback_self_reference_speaker_context.md` 정밀.

---

## §6. 진실 노출 경계

`design_spouse01_truth_disclosure_policy.md` 권위 준수.

### dc-4 emergence에서 surface 허용:

- "사기" / "전액 잃음" / "돌아오지 않음" — A 본인 발화로는 surface OK (자기 폭로 영역)
- "투자방 운영자" — surface OK
- 단, **"수치심" / "이혼 대비"** 같은 동기 frame은 dc-4 q1/q2 (별도 추궁)에서 처리. emergence narrative에서는 surface X

### w-3 emergence에서 surface 경계:

- "박미라" 이름: A의 emotional_outburst trigger에서 **본인이 흘림** OR judge의 cascade에서는 "지인"으로 우회
- "투자방 링크 전달자" 표현 surface OK
- 박미라의 동기/책임 frame은 박미라 증언 (별도 channel)에서 처리

---

## §7. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 25 KO entry 작성 (JSON 파일)
2. 사용자 spot check
3. Claude가 `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가
4. Claude가 dc-4 narrativeTriggers + w-3 narrativeTriggers 부착
5. **witness type schema 확장** — `Witness.narrativeTriggers` field 신규 추가
6. Codex 다국어 sync 의뢰서
7. tsc + build + commit + push

---

## §8. 본 batch 진행 메모

- **Batch 3은 자금 line의 종결 + 외부 증인 진입**
- **A 감정 표현이 narrative climax** — outburst 톤 깊이 핵심
- **witness 타입에 narrativeTriggers 부착하는 첫 사례** — schema 확장 (`Witness.narrativeTriggers`) 필요
- **w-3 emergence는 호출 가능 surface만** — 증언 자체는 별도 channel

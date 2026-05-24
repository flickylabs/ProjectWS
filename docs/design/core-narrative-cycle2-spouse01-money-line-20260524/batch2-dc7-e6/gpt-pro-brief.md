# GPT Pro 의뢰서 — spouse-01 Batch 2: dc-7 + e-6 emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (dc-7 + e-6) — 총 25 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음. 파일 목록은 README.md 참조.

톤 reference: `spouse01-tone-samples.md`

---

## §1. 사건 context

**spouse-01** = 박지연(A, 원고) vs 이준호(B, 피고) 부부 분쟁.

### dc-7 "공동 적금 2,000만 원의 해지"

- 의미: 박지연(A)이 위임장을 위조하여 공동 적금을 단독 해지한 절차 자체의 책임 카드. 송금 행선지(dc-4)와는 분리.
- 게임 역할: **h-d3 영역 (적금 해지 경위) 의 절차 행위 확정**. 위임장 위조 + 단독 해지 사실 확정.
- 현재 mechanical 조건: `combine-5` (e-7 해지 서류 + 박지연 자기방어 진술 stmt-a-protect) 조합
- linkedDisputes: [`h-d3`], linkedParty: `a`
- 노트: ○○은행 공동 적금 (월 50만 × 36개월) 2026.01.18 중도 해지 → 2,012만 원 박지연 개인계좌 즉시 입금. 위임장의 이준호 서명이 본인 필적 아님.

### e-6 "투자방 텔레그램 + 송금 기록"

- 의미: 박지연(A)이 공동 적금 해지액 2,000만 원을 투자방 안내 계좌로 송금한 뒤, 수익 인증과 출금 지연이 이어진 텔레그램 대화 기록.
- 게임 역할: **h-d3 영역의 해지액 행선지**. dc-7(해지)와 같은 2,000만 원의 후속 흐름.
- 현재 mechanical 조건: `requires=['e-7']` + h-d3 lieState ≥ S2
- proves: [`h-d3`], subjectParty: `a`
- 노트: VIP 투자클럽 → 송금 1건 → 운영자 잠적 → 전액 손실.

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

각 emergence는 trigger 후보 중 첫 발동만 fire. 나머지는 그 게임 동안 영구 disabled.

---

### Emergence 3: **dc-7** (사건 카드) — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 `combine-5` (e-7 해지 서류 + 박지연 자기방어 진술) 조합 실행
- e-7 Original 도달, h-d3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: 위임장 단서 + A 자기방어 진술이 정합되며 단독 해지 행위 확정
- 발동 흐름 (~7초): 조합 결과 표시 → 판사 위임장 위조 + 단독 해지 사실 확정 → A 답변 → 판사 dc-7 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc7-via-combo-judge-query-v1` | 판사 | A | 분석 결과 + reactive query | 2 문장 | 격식·확정 |
| `emerge-dc7-via-combo-a-response-v1` | A | 판사 | 답변 (자기방어 유지) | 1~2 문장 | 위축·방어 |
| `emerge-dc7-via-combo-judge-decree-v1` | 판사 | 전체 | dc-7 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query: "위임장 서명과 본인 필적이 일치하지 않는다는 점이 확인됐고, 자기방어 진술과도 정합됩니다. 절차 자체에 대한 답변을 부탁드립니다."
- A response: "그 절차는… 사정상 어쩔 수 없는 결정이었습니다." — "위임장 위조"라는 단어 직접 surface 금지. 자기방어 frame 유지
- 판사 decree: "본 법정에 [공동 적금 2,000만 원의 해지] 사건 카드를 정식 등재합니다."

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `e-7` (공동 적금 해지 서류) 이미 fired
- 사용자의 절차 책임 추궁 누적 (A 대상 fact_pursuit 또는 responsibility 류 액션 3회 이상)
- h-d3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: e-7 등재 후 절차 책임 추궁이 누적되며 판사가 절차 자체의 책임을 정리할 시점 판단
- 발동 흐름 (~6초): 판사 자발 cascade mention → A 답변 → 판사 dc-7 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc7-via-cascade-judge-mention-v1` | 판사 | A | 자발 정리 (e-7 reference) | 2 문장 | 격식·정리적 |
| `emerge-dc7-via-cascade-a-response-v1` | A | 판사 | 답변 | 1 문장 | 위축·방어 |
| `emerge-dc7-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-7 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade: "앞서 등재된 [공동 적금 해지 서류]를 둘러싼 절차 논의가 충분히 누적됐습니다. 본 법정은 그 절차 자체의 책임을 정리하겠습니다."
- A response: "재판관님 판단에 따르겠습니다."
- decree: trigger 1과 동일 form

#### Trigger 3 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- e-7 이미 fired
- B emotional phase ≠ 'collapsed'
- h-d3 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: A가 h-d3 회피 중. B가 "본인 동의 없이 진행된 것이 명백하다" 강조
- 발동 흐름 (~9초): A 답변 중 → B 끼어들기 → 판사 reactive query → B 부연 → 판사 dc-7 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc7-via-b-interject-v1` | B | 판사 | 끼어들기 (동의 없음 강조) | 2 문장 | 단호·결단 |
| `emerge-dc7-via-b-interject-judge-react-v1` | 판사 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-dc7-via-b-interject-b-elaborate-v1` | B | 판사 | 부연 (절차 책임 정리 요청) | 1~2 문장 | 단호·구체 |
| `emerge-dc7-via-b-interject-judge-decree-v1` | 판사 | 전체 | dc-7 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "재판관님, 이 부분은 분명히 짚어야 합니다. 공동 적금 해지에 대해 저는 한 번도 동의한 적이 없습니다."
- 판사 react: "이준호 씨, 본인의 입장을 절차 책임 측면에서 정리하시겠습니까?"
- B elaborate: "필적 차이가 객관적으로 확인된 이상, 절차 자체에 책임을 명확히 해 주십시오."
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + e-7 fired 후 4턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc7-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 surface | 2 문장 | 격식·결정 |
| `emerge-dc7-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 응답 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto: "공동 적금 해지 경위에 대한 논의가 충분히 누적됐습니다. 절차 책임 카드를 본 법정에 등재합니다."
- A respond: "예, 받아들이겠습니다."

**dc-7 total: 3 + 3 + 4 + 2 = 12 entry**

---

### Emergence 4: **e-6** (증거) — 4 trigger

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-7` (공동 적금 2,000만 원의 해지) 이미 fired
- h-d3 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: dc-7 발현 후 "그 해지된 2,000만 원의 행선지는?" 자연 의문이 판사·B 양쪽에서 제기
- 발동 흐름 (~6초): 판사 자발 cascade query → A 답변 (회피적) → 판사 e-6 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e6-via-cascade-judge-query-v1` | 판사 | A | cascade query (dc-7 reference) | 2 문장 | 격식·추적적 |
| `emerge-e6-via-cascade-a-response-v1` | A | 판사 | 회피적 답변 | 1~2 문장 | 회피·수치 |
| `emerge-e6-via-cascade-judge-decree-v1` | 판사 | 전체 | e-6 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade query: "앞서 등재된 [공동 적금 2,000만 원의 해지] 절차 다음 단계로, 해지액의 사용 내역을 확인합니다. 박지연 씨, 그 자금의 사용처를 말씀해 주십시오."
- A response: "그 돈은… 제가 따로 처리한 일입니다. 자세히 말씀드리기 곤란합니다만…" — "투자방"이라는 단어는 surface 가능 (다음 entry에서 판사가 잡아냄)
- 판사 decree: "본 법정에 [투자방 텔레그램 + 송금 기록]을 정식 등재합니다."

#### Trigger 2 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- dc-7 이미 fired
- B emotional phase ≠ 'collapsed'

**Narrative scenario:**
- 컨텍스트: A가 dc-7 직후 회피 중. B가 "그 돈을 어디 썼느냐" 직접 추궁
- 발동 흐름 (~9초): B 끼어들기 → 판사 reactive query → A 답변 → 판사 e-6 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e6-via-b-interject-v1` | B | 판사 | 끼어들기 (자금 행선지 추궁) | 2 문장 | 단호·추궁 |
| `emerge-e6-via-b-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-e6-via-b-interject-a-response-v1` | A | 판사 | 회피적 답변 | 1~2 문장 | 회피·수치 |
| `emerge-e6-via-b-interject-judge-decree-v1` | 판사 | 전체 | e-6 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "재판관님, 한 가지 더 확인이 필요합니다. 해지된 2,000만 원이 정확히 어디로 갔는지 본 법정에서 밝혀야 합니다."
- 판사 react: "박지연 씨, 그 자금의 사용처를 직접 답변하시겠습니까?"
- A response: "그 돈은… 제가 별도로 운용하려던 자금이었습니다." — 회피적이지만 "별도 운용" 단어로 유사 surface
- decree: trigger 1과 동일 form

#### Trigger 3 — A의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- dc-7 이미 fired
- A emotional phase = 'shaken' OR 'overwhelmed' (수치심 임계점)
- 활성 액션: 사용자가 A 대상 emotion 류 강압 질문 직후

**Narrative scenario:**
- 컨텍스트: A가 dc-7 직후 수치심 표출. 강압 질문에 폭발 → 투자방 언급 흘림
- 발동 흐름 (~8초): A 돌발 발화 → 판사 catch → A 인정 → 판사 e-6 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e6-via-a-outburst-v1` | A | 판사 | 격앙 돌발 (투자방 흘림) | 2 문장 | 격앙·자기 폭로 |
| `emerge-e6-via-a-outburst-judge-catch-v1` | 판사 | A | catch + 지적 | 1 문장 | 격식·매서움 |
| `emerge-e6-via-a-outburst-a-admit-v1` | A | 판사 | 인정 | 1 문장 | 체념·시인 |
| `emerge-e6-via-a-outburst-judge-decree-v1` | 판사 | 전체 | e-6 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A outburst: "도대체 제가 더 뭘 어떻게 해야 합니까! 투자방에 보낸 돈까지 다 말씀드려야 한단 말씀입니까!" — 격앙·자기 폭로 (투자방 단어 본인이 흘림)
- 판사 catch: "박지연 씨, 방금 말씀하신 [투자방]에 보낸 자금을 본 법정에 제출해 주십시오."
- A admit: "예… 그 기록을 제출하겠습니다."
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + dc-7 fired 후 3턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e6-via-judge-auto-decree-v1` | 판사 | A | 자발 surface | 2 문장 | 격식·결정 |
| `emerge-e6-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 시인 | 1 문장 | 무표정·시인 |

**가이드:**
- 판사 auto: "해지액 2,000만 원의 사용 흐름이 정리되지 않았습니다. 본 법정은 관련 송금 기록을 정식 검토 대상으로 등재합니다."
- A respond: "예, 받아들이겠습니다."

**e-6 total: 3 + 4 + 4 + 2 = 13 entry**

---

**Batch 2 grand total: 12 + 13 = 25 entry**

---

## §3. `cascade_from_card` trigger 신규 spec

**Trigger 정의:** 이전 사건 카드(dossierCard)가 이미 발현된 상태에서, 그 narrative line의 자연 연속으로 다음 카드/증거가 등장.

**Schema field 신규:**

```typescript
// NarrativeTriggerPreconditions 확장
{
  requirePriorCardFired?: string  // dossierCardId
  // ... 기존 field
}

// NarrativeTriggerType 확장
type NarrativeTriggerType =
  | 'npc_interjection'
  | 'combination_result'
  | 'emotional_outburst'
  | 'judge_auto_mention'
  | 'cascade_from_card'  // ← 신규
```

**Runtime 거동:**
- 평가 시점: 이전 카드 fired 상태 + 본 trigger의 다른 precondition 모두 만족 시
- ScriptedText: 본 trigger 전용 narrative entry. 이전 카드 명시 reference 필수

**Tag spec (모든 cascade_from_card entry):**

```
"trigger:cascade_from_card"
"priorCard:<dossierCardId>"  // 본 batch: priorCard:e-7 (dc-7 cascade), priorCard:dc-7 (e-6 cascade)
```

⚠ Batch 1 spec과 동일. Batch 2의 cascade는 e-7 → dc-7 (e-7은 증거지만 cascade trigger의 priorCard 영역은 통합 — evidence/dossier 모두 `requirePriorCardFired`/`requirePriorEvidenceFired` 동등 적용). 의뢰서 entry의 tag는 단일 `priorCard:<id>` 사용.

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 의 `emergence_narrative` channel에 추가:

```json
{
  "id": "emerge-dc7-via-combo-judge-query-v1",
  "text": "{KO 시안}",
  "behaviorHint": "{선택}",
  "tags": [
    "channel:emergence_narrative",
    "speaker:judge",
    "speakerRole:judge",
    "listener:a",
    "listenerRole:party",
    "address:toParty",
    "scope:all_present",
    "register:formal",
    "honorific:formal",
    "audience:single",
    "tense:present",
    "relationship:spouse",
    "callTerm:박지연_씨",
    "callTermState:defined",
    "emotion:measured",
    "continuity:reactive_query",
    "reveal:partial",
    "disclosure:guarded",
    "trigger:combination_result",
    "emergence:dc-7",
    "comboRecipeId:combine-5"
  ]
}
```

**Tag 명세:**
- `channel:emergence_narrative`
- `speaker:{a|b|judge}` / `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}` / `listenerRole:{judge|party|all}`
- `register:formal`
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{dc-7|e-6}`
- **cascade_from_card**: `priorCard:{id}` 추가 (dc-7 cascade는 `priorCard:e-7`, e-6 cascade는 `priorCard:dc-7`)
- **combination_result**: `comboRecipeId:{recipeId}` (dc-7은 `combine-5`)
- 호칭: 일관

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. 단정 회피
- **A (박지연)**: 본 batch에서는 **수치심·자기방어 톤 강조**. 회피 → 강압 시 자기 폭로 (emotional_outburst)
- **B (이준호)**: **단호·결단** (위임장 위조에 대한 본인 입장 명확)
- 호명 일관: 재판관님 / 박지연 씨 / 이준호 씨

본 batch는 **A가 수세, B가 공세**의 dynamics. Batch 1과 반대 (Batch 1은 B 비자금이라 B 수세, A 공세).

`feedback_natural_korean_npc_active_voice.md` 5 차원 적용.
`feedback_self_reference_speaker_context.md` 정밀.

---

## §6. 진실 노출 경계

`design_spouse01_truth_disclosure_policy.md` 권위 준수.

### dc-7 emergence에서 surface 금지:

- "박지연 단독 해지" / "위임장 위조" 단정 — B의 단호 발화 영역에서 "필적 차이" / "동의 없음"으로 surface OK. A 측 발화에서는 "그 절차"로 회피
- "투자방 송금 손실" — h-d3 S4 이후만
- dc-7 emergence narrative는 **"절차 책임 카드 등재"까지만 확정**. 자금 행선지(e-6)는 별도 emergence

### e-6 emergence에서 surface 금지:

- "사기 손실" / "전액 잃음" — h-d3 S5 이후만
- "VIP 투자클럽" / "운영자 잠적" 등 구체 — e-6 등재 후 후속 추궁 영역
- e-6 emergence narrative는 **"투자방 송금 기록 등재"까지만 surface**. 사기 결과(dc-4)는 별도 emergence
- **A 본인 발화 영역**: "투자방", "별도 운용" 단어는 surface OK (A 자기 폭로)

---

## §7. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 25 KO entry 작성 (JSON 파일)
2. 사용자 spot check
3. Claude가 `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가
4. Claude가 dc-7 / e-6 narrativeTriggers 부착 (Batch 1과 동일 schema)
5. Claude가 dispatch 통합
6. Codex 다국어 sync 의뢰서
7. tsc + build + commit + push

---

## §8. 본 batch 진행 메모

- **Batch 2는 자금 line의 중간** — dc-7과 e-6의 cascade chain이 핵심
- **dc-7은 사건 카드인데 priorCard 영역에 evidence(e-7)을 두는 첫 사례** — schema spec에서 priorCard ID는 evidence/dossier 모두 허용
- A 수치심 emotional_outburst가 narrative의 자연 폭발점 — 톤 깊이 신경

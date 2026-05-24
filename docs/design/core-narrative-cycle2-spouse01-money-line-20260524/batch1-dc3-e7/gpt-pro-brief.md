# GPT Pro 의뢰서 — spouse-01 Batch 1: dc-3 + e-7 emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (dc-3 + e-7) 의 multi-trigger narrative ScriptedText KO 시안 — 총 25 entry

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음:

- `feedback_new_dispute_evidence_narrative_justification.md` — Core System narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차 (본 작업은 4단계)
- `project_spouse01_event_timeline.md` — spouse-01 사건 흐름
- `feedback_natural_korean_npc_active_voice.md` — NPC 발화 자연화 5 차원
- `feedback_judge_question_quality.md` — 재판관 질문 품질
- `design_spouse01_truth_disclosure_policy.md` — 진실 노출 정책
- `design_core_case_derive_hybrid_merge.md` — Core System derive 권위
- `feedback_self_reference_speaker_context.md` — 자기지시 정밀

톤 reference: `spouse01-tone-samples.md`

---

## §1. 사건 context

**spouse-01** = 박지연(A, 원고) vs 이준호(B, 피고) 부부 분쟁.

핵심 frame:
- **d-1**: 외도 의심 (A가 제기, 실은 오해)
- **d-2**: 남편 명의 계좌 목돈 출금 (B가 형 사업 자금으로 사용)
- **h-d3** (hidden): 공동 적금 2,000만 원 해지 경위 (A가 위임장 위조 → 투자방 송금 사기 손실)

### dc-3 "이준호의 비밀 개인 계좌"

- 의미: 이준호(B)가 10년간 별도로 운용해 온 개인 비자금 통장. 3,000만 원 누적 → 최근 4개월간 4회 분할 현금 출금 (500/800/700/1,000만). 형이 개인회생 중이라 계좌 입금 불가, 현금 전달.
- 게임 역할: **d-2 영역 (남편 비자금) 의 결정적 사건 카드**. 자금 흐름의 출처를 확정.
- 현재 mechanical 조건: `combine-4` (e-4 + e-5) 조합 성공
- linkedDisputes: [`d-2`], linkedParty: `b`

### e-7 "공동 적금 해지 서류"

- 의미: 공동 적금이 만기 전 해지된 서류. 위임장 서명이 이준호 본인 필적과 불일치 (박지연이 위임장 위조하여 단독 해지). 해지액 2,012만 원 박지연 개인계좌 즉시 입금.
- 게임 역할: **h-d3 영역 (적금 해지 경위) 의 핵심 증거**. A의 위임장 위조 사실 확정.
- 현재 mechanical 조건: `requires=['e-5']` + h-d3 lieState ≥ S3
- subjectParty: `a`

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

**First-Fired-Wins**: 각 emergence는 trigger 후보 중 첫 발동만 fire. 나머지는 그 게임 동안 영구 disabled.

각 emergence 독립 적용 (dc-3 firing은 e-7 trigger 평가에 영향 X — 단, e-7의 cascade trigger는 dc-3 발현을 precondition으로 요구).

---

### Emergence 1: **dc-3** (사건 카드) — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 `combine-4` (e-4 발신자 미상 문자 + e-5 개인 계좌 출금) 조합 실행
- e-4 Original + e-5 Original 도달
- d-2 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: 사용자가 두 증거 조합 → 단서 "남편 별도 계좌 출금 시기와 형 관련 문자 시기 일치"
- 발동 흐름 (~8초): 조합 결과 표시 → 판사 즉시 reactive query → B(이준호) 답변 → 판사 dc-3 surface 선언

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc3-via-combo-judge-query-v1` | 판사 | B | reactive query | 1~2 문장 | 격식·관찰·신중 |
| `emerge-dc3-via-combo-b-response-v1` | B | 판사 | 답변 (회피적 시인) | 1~2 문장 | 회피→짧은 시인 |
| `emerge-dc3-via-combo-a-react-v1` | A | 판사 | 부가 발언 | 1 문장 | 격앙·확신 |
| `emerge-dc3-via-combo-judge-decree-v1` | 판사 | 전체 | dc-3 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 query: "남편 측 별도 계좌 출금 시기와 형 관련 문자 시기가 정확히 일치합니다. 이 별도 계좌의 성격에 대해 말씀해 주십시오." 류
- B 답변: "그 계좌는… 개인적으로 따로 관리하던 것입니다. 자세한 사용처는 말씀드리기 곤란합니다만…" — 비자금 통장 존재까지만 시인. 구체 금액·형·회생 surface 금지
- A react: "재판관님, 저는 이 일을 처음 알았습니다." 류 (감정 확신)
- 판사 decree: "본 법정에 [이준호의 비밀 개인 계좌] 사건 카드를 정식 등재합니다."

#### Trigger 2 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-cash-clue` (Cycle 1, 정기 자금 이동 흔적) 이미 fired
- e-5 Original 도달
- d-2 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: 이전 cycle에서 dc-cash-clue 단서가 모인 후, 자금 흐름의 출처가 자연 좁혀짐
- 발동 흐름 (~6초): 판사 자발 분석 발언 → B 짧은 응답 → 판사 dc-3 surface 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc3-via-cascade-judge-mention-v1` | 판사 | B | 자발 분석 (이전 카드 reference) | 2 문장 | 격식·분석적 |
| `emerge-dc3-via-cascade-b-response-v1` | B | 판사 | 회피적 시인 | 1 문장 | 회피→시인 |
| `emerge-dc3-via-cascade-judge-decree-v1` | 판사 | 전체 | dc-3 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade mention: "앞서 등재된 [정기 자금 이동의 흔적]과 본인 명의 계좌 출금 내역을 함께 보면, 출처가 남편 측 별도 계좌로 좁혀집니다. 이 계좌의 운영 경위를 말씀해 주십시오." — 이전 카드 명시 reference 필수
- B response: trigger 1과 같은 회피적 시인 톤
- decree: trigger 1과 동일 form

#### Trigger 3 — A의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- d-2 lieState ≥ S1 OR A의 distrust ≥ 50
- 활성 액션: 사용자가 e-5 (개인 계좌 출금) 로 B 심문 중

**Narrative scenario:**
- 컨텍스트: B가 별도 계좌에 대해 회피 중. A 분노/불신 누적
- 발동 흐름 (~8초): B 답변 중 → A 끼어들기 → 판사 reactive query → A 답변 → 판사 dc-3 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc3-via-a-interject-v1` | A | 판사 | 끼어들기 | 1~2 문장 | 격앙·결단 |
| `emerge-dc3-via-a-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-dc3-via-a-interject-a-response-v1` | A | 판사 | 답변 | 1~2 문장 | 위축→인정 |
| `emerge-dc3-via-a-interject-judge-decree-v1` | 판사 | 전체 | dc-3 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject: "재판관님, 남편이 지금까지 단 한 번도 말한 적 없는 별도 계좌가 있습니다. 그 통장 출금 내역을 확인해 주십시오." — "비자금"이라는 단어는 surface 가능, 구체 금액·사용처 X
- 판사 react: "박지연 씨, 별도 계좌의 존재를 어떻게 알게 됐는지 먼저 말씀해 주십시오."
- A response: "남편이 사용하던 가방에서 우연히 본 통장이었습니다. 처음에는 잊고 있었습니다만…" 위축됐지만 인정 톤
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + e-4 Original + e-5 Original 모두 도달 후 5턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc3-via-judge-auto-decree-v1` | 판사 | B | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-dc3-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 시인 | 1 문장 | 무표정·시인 |

**가이드:**
- 판사 auto: "본 법정은 남편 명의 별도 계좌의 출금 흐름이 충분히 정리됐다고 봅니다. [이준호의 비밀 개인 계좌]를 정식 등재합니다."
- B respond: "예, 받아들이겠습니다."

**dc-3 total: 4 + 3 + 4 + 2 = 13 entry**

---

### Emergence 2: **e-7** (증거) — 4 trigger

#### Trigger 1 — 사건 카드 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-3` (이준호의 비밀 개인 계좌) 이미 fired
- h-d3 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: dc-3 발현 후 자금 흐름의 한쪽(B)이 정리됨. 판사가 자연스럽게 다른 쪽(A)의 자금 흐름도 검토 필요성 제기
- 발동 흐름 (~6초): 판사 자발 cascade mention → B 짧은 응답 → 판사 e-7 등재 선언

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-cascade-judge-mention-v1` | 판사 | 전체 | 자발 cascade (dc-3 reference) | 2 문장 | 격식·분석적 |
| `emerge-e7-via-cascade-b-response-v1` | B | 판사 | 위임장 진위 short remark | 1 문장 | 단호·결단 |
| `emerge-e7-via-cascade-judge-decree-v1` | 판사 | 전체 | e-7 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 cascade: "남편 측 자금 흐름이 정리됐으니, 아내 측 공동 적금의 처분 경위도 같은 비중으로 검토합니다. 해지 절차 문서를 본 법정에 제출 요청합니다." — dc-3 직접 reference 포함
- B response: "이 사건은 제 동의 없이 진행된 일이 분명합니다." (단호한 결단 톤)
- decree: "본 법정에 [공동 적금 해지 서류]를 정식 등재합니다."

#### Trigger 2 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- dc-3 이미 fired
- e-5 Original 도달 후 사용자가 e-5 후속 분석 액션 (재판관에게 추가 요청)
- h-d3 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: dc-3 분석 진행 중 사용자가 e-5 후속 단서 요청 → 분석 과정에서 위임장 흔적 우연 발견
- 발동 흐름 (~7초): 판사 분석 결과 발언 → B acknowledge → 판사 e-7 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-combo-judge-analyze-v1` | 판사 | 전체 | 분석 결과 발언 | 2 문장 | 격식·발견적 |
| `emerge-e7-via-combo-b-acknowledge-v1` | B | 판사 | 짧은 인지 발언 | 1 문장 | 결단·확인 |
| `emerge-e7-via-combo-judge-decree-v1` | 판사 | 전체 | e-7 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- 판사 analyze: "별도 계좌 추적 과정에서 공동 적금의 만기 전 해지 흔적이 드러났습니다. 절차 서류 검토가 필요한 시점입니다."
- B acknowledge: "그 절차는 분명히 제 동의 없이 진행된 일입니다."
- decree: trigger 1과 동일 form

#### Trigger 3 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- h-d3 lieState ≥ S1
- B emotional phase ≠ 'collapsed' (격앙 가능 상태)
- 활성 액션: 사용자가 d-2 또는 h-d3 영역 심문 중

**Narrative scenario:**
- 컨텍스트: A가 h-d3 회피 진술 중. B가 위임장 진위에 대한 강한 입장 표명
- 발동 흐름 (~9초): A 답변 중 → B 끼어들기 → 판사 reactive query → B 부연 → 판사 e-7 surface

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-b-interject-v1` | B | 판사 | 끼어들기 (위임장 진위 강조) | 2 문장 | 단호·결단 |
| `emerge-e7-via-b-interject-judge-react-v1` | 판사 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-e7-via-b-interject-b-elaborate-v1` | B | 판사 | 부연 (필적 차이) | 1~2 문장 | 단호·구체 |
| `emerge-e7-via-b-interject-judge-decree-v1` | 판사 | 전체 | e-7 surface 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject: "재판관님, 공동 적금 해지에 대해 한마디 드려야 합니다. 그 위임장 서명은 제 필적이 아닙니다." (단호 톤)
- 판사 react: "이준호 씨, 그 해지 서류 자체를 본 법정에 제출할 수 있겠습니까?"
- B elaborate: "은행에서 확인하면 됩니다. 서명 비교를 청구합니다." — 필적 비교 요청. 위임장 위조 단정은 surface OK
- decree: trigger 1과 동일 form

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + h-d3 lieState ≥ S2 도달 후 3턴 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-e7-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 정리 + surface | 2 문장 | 격식·결정 |
| `emerge-e7-via-judge-auto-a-respond-v1` | A | 판사 | 짧은 응답 | 1 문장 | 무표정·동의 |

**가이드:**
- 판사 auto: "본 법정은 공동 적금 해지 경위 검토가 필수적이라고 봅니다. 해지 서류를 등재하고 다음 절차로 넘어가겠습니다."
- A respond: "예, 받아들이겠습니다."

**e-7 total: 3 + 3 + 4 + 2 = 12 entry**

---

**Batch 1 grand total: 13 + 12 = 25 entry**

---

## §3. `cascade_from_card` trigger 신규 spec

**Trigger 정의:** 이전 사건 카드(dossierCard)가 이미 발현된 상태에서, 그 narrative line의 자연 연속으로 다음 카드/증거가 등장.

**Schema field 신규:**

```typescript
// NarrativeTriggerPreconditions 확장 (모든 trigger type 공통 사용 가능)
{
  requirePriorCardFired?: string  // dossierCardId — 본 trigger 발동 전 fire되어야 할 카드
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
- ScriptedText: 본 trigger 전용 narrative entry. 이전 카드 명시 reference (예: "앞서 등재된 [정기 자금 이동의 흔적]…") 필수

**Tag spec (모든 cascade_from_card entry):**

```
"trigger:cascade_from_card"
"priorCard:<dossierCardId>"  // 예: "priorCard:dc-cash-clue" 또는 "priorCard:dc-3"
```

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/spouse-01.json` 의 `emergence_narrative` channel 에 추가:

```json
{
  "id": "emerge-dc3-via-combo-judge-query-v1",
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
    "trigger:combination_result",
    "emergence:dc-3",
    "comboRecipeId:combine-4"
  ]
}
```

**Tag 명세:**
- `channel:emergence_narrative`
- `speaker:{a|b|judge}` / `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}` / `listenerRole:{judge|party|all}`
- `register:formal` (재판관 격식 환경 — 본 batch 전부)
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{dc-3|e-7}` — 대상 emergence ID
- **cascade_from_card 전용**: `priorCard:{dossierCardId}` 추가
- **combination_result 전용**: `comboRecipeId:{recipeId}` 추가
- 호칭 tag: `callTerm:박지연_씨` 또는 `callTerm:이준호_씨` 또는 `judgeAddress:재판관님` (해당 시)
- 자연 명사: `남편` / `아내` (직접 호칭 시), `공동 적금` / `별도 계좌` / `위임장` 등

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. "...십시오", "...습니다" 종결. 단정·강압 회피
- **A (박지연)**: 격앙·결단·후 시인. cascade trigger에서는 차분 톤, 끼어들기에서는 격앙
- **B (이준호)**: 회피→흘림→체념. **단, e-7 관련에서는 단호** ("위임장 서명은 본인 필적이 아니다" — 본인 자신감 영역)
- 다른 spouse-01 entry와 호명·종결 일관 (재판관님, 박지연 씨, 이준호 씨)
- `feedback_natural_korean_npc_active_voice.md` 5 차원 적용:
  - 강력 어휘 완화 / 모호 referent 명확 동사구 / 피동 회피 / 직역체 내면 발화 / 자연 완충재
- `feedback_self_reference_speaker_context.md` 정밀: NPC 1인칭 자기 발화에 "본인" X → "저/제"
  - 단, 제3자가 NPC 가리킬 때는 "본인" 자연

---

## §6. 진실 노출 경계

`design_spouse01_truth_disclosure_policy.md` 권위 준수.

### dc-3 emergence에서 surface 금지:

- "형에게 현금 전달" / "형 빚 / 개인회생" — h-d3 S5 이후만
- 구체 금액 (3,000만 원 / 500/800/700/1,000) — surface 가능하나 시점 신중
- dc-3 emergence narrative는 **"비자금 통장 존재"까지만 확정**. 사용처는 후속 추궁 영역

### e-7 emergence에서 surface 금지:

- "박지연 단독 해지" / "위임장 위조" / "투자방 송금 손실" / "사기 수치심" — h-d3 S4/S5 이후만
- e-7 emergence narrative는 **"해지 서류 등재 + 위임장 진위 검증 필요"까지만 surface**
- 단, **B(이준호)의 "본인 동의 없음 / 필적 차이"** 단정은 B 자신의 단호 발화 영역 — surface OK (B 본인의 진실)

---

## §7. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 25 KO entry 작성 (JSON 파일)
2. 사용자 spot check (3~5분)
3. Claude가 `src/data/scriptedText/spouse-01.json` emergence_narrative channel 추가 + tags 정합 검증
4. Claude가 schema 확장 (`cascade_from_card` trigger type) + dc-3 / e-7 narrativeTriggers 부착
5. Claude가 dispatch 통합 (dossierCard 발현 시점에서도 narrative trigger 평가 — 신규 hook)
6. Claude가 다국어 sync 의뢰서 작성 (별도 form, 75 entry × 3 lang)
7. tsc + build + commit + push

---

## §8. 본 batch 진행 메모

- **Batch 1은 자금 line의 시작점** — Cycle 1 dc-cash-clue → e-5 결과물에서 자연 이어짐
- **cascade_from_card trigger의 첫 적용 batch** — 이전 카드 reference 명확하게 작성하는 패턴 정착
- 다른 batch (2/3/4) 도 동일 spec 따름 — 본 batch는 cascade 패턴 reference 역할

# GPT Pro 의뢰서 — family-01 Cycle 5 Batch 1: dc-1 + w-1 emergence narrative

작성일: 2026-05-24
주체: Claude → GPT Pro (KO 시안 작성) → Claude apply
범위: 2 emergence (dc-1 + w-1)의 multi-trigger narrative ScriptedText KO 시안

---

## §0. 권위 메모리 (정독 필수)

본 폴더에 복사돼 있음:

- `feedback_new_dispute_evidence_narrative_justification.md` — Core narrative trigger 권위 (multi-trigger + First-Fired-Wins)
- `design_narrative_cascade_from_card.md` — cascade_from_card trigger 정책 (본 batch w-1 cascade 핵심)
- `design_core_narrative_cycle_procedure.md` — 8단계 절차 (본 작업은 4단계)
- `design_family01_truth_disclosure_policy.md` — family-01 진실 노출 정책 (Line A 영역 surface 금지 keyword 명시)
- `design_truth_leak_keyword_nature.md` — hidden 본성 분류
- `feedback_dossier_card_renamed_to_clue.md` — **'사건 카드 → 단서' 명칭 변경 (Cycle 5 신규)**
- `feedback_judge_dispassionate_action_focused.md` — **재판관 어법: 감정·가치 판단 회피, 사실/행위 중심 (Cycle 7 신규, 본 cycle 적용)**
- `feedback_natural_korean_npc_active_voice.md` — NPC 발화 자연화 5 차원
- `feedback_judge_question_quality.md` — 재판관 질문 품질
- `feedback_self_reference_speaker_context.md` — 자기지시 정밀
- `feedback_family_address_speaker_perspective.md` — 본인 가족 호칭 자기 시점

톤 reference: `family01-tone-samples.md`

---

## §1. 사건 context

**family-01** = 윤태성(A, claimant) vs 윤정후(B, defendant) 형제 유산 다툼.

핵심 frame:
- **d-1**: 유서 작성과 어머니 판단 능력 (양측 모두 인지, 사건 시작점)
- **d-2** (Cycle 5 Batch 2 영역): 공증 절차의 개입 (오전 1차 공란 → 오후 60:40 확정)
- **d-3**: 오래된 지원의 출처 (20년 비밀 송금) — Line A 영역 surface 금지
- **d-4**: 가족 기록과 침묵의 이유 (출생 비밀) — Line A 영역 surface 금지
- **d-5**: 어머니의 숨겨진 마음 (자필 90:10 vs 공증 60:40) — Line A 영역 surface 금지

### dc-1 "말년의 종이"

- **의미**: 어머니 말년 시기 윤정후의 방문 빈도 + 종이 낭독 정황 + "형 오기 전" 발화가 한 줄로 모이는 단서.
- **게임 역할**: **d-1 영역 (절차/판단) 의 결정적 단서**. 도움 vs 개입의 경계 드러냄.
- **현재 mechanical 조건**: `combine-1` (e-1 유서 사본 + e-2 방문기록) 또는 `combine-11` (e-2 + e-3 음성증언) 조합 성공
- **linkedDisputes**: [`d-1`], **linkedParty**: `b`
- **단서 label** (player-visible): **"말년의 종이"** (변경 없음)
- **note 영역 노출**: 방문 패턴 + 종이 낭독 정황 + 형 회피 정황 (S2 이상에서 dossier surface)

### w-1 "최복순"

- **의미**: 전 요양보호사. 윤정후의 방문 + 종이 낭독 + "형 오기 전" 발화 직접 목격.
- **게임 역할**: **dc-1의 직접 목격자**. 본 cycle에서 호출 가능 자격 부여 (실제 증언은 별도 channel `witness` 영역).
- **현재 mechanical 조건**: `unlockedByDossier: ['dc-1']` (dc-1 등록 후 호출 가능)
- **fromA**: "큰아들분" / **fromB**: "작은아들분" (w-1 본인 시점)

---

## §2. emergence 설계 — multi-trigger + First-Fired-Wins

**First-Fired-Wins**: 각 emergence는 trigger 후보 중 첫 발동만 fire. 나머지는 그 게임 동안 영구 disabled.

각 emergence 독립 적용 (dc-1 firing은 w-1 trigger 평가에 영향 X — 단, w-1의 cascade trigger는 dc-1 발현을 precondition으로 요구).

---

### Emergence 1: **dc-1** "말년의 종이" — 4 trigger

#### Trigger 1 — 증거 조합 결과 [type: `combination_result`]

**선결조건:**
- 사용자가 `combine-1` (e-1 유서 사본 + e-2 방문기록) 또는 `combine-11` (e-2 + e-3 음성증언) 조합 실행
- 각 조합 입력 evidence stage Excerpt 이상 (combine-1) 또는 Original 이상 (combine-11)
- d-1 lieState ≥ S1

**Narrative scenario:**
- 컨텍스트: 사용자가 두 증거 조합 → 단서 합성 시점
- 발동 흐름 (~6초): 조합 결과 표시 → 판사 자발 단서 등록 발언

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-combo-judge-decree-v1` | 판사 | 전체 | 단서 등록 선언 | 1 문장 | 격식·확정 |
| `emerge-dc1-via-combo-b-react-v1` | B | 판사 | 짧은 응답 (수긍/회피) | 1 문장 | 무표정·짧음 |

**가이드:**
- 판사 decree (v3 승인): **"유서 비율과 방문 시기를 함께 볼 필요가 있어 보이는군요. 단서로 [말년의 종이]를 추가합니다."**
- B react: "예…" / "받아들이겠습니다." 류 짧은 응답

#### Trigger 2 — A의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- d-1 lieState ≥ S1 OR A distrust ≥ 50
- 활성 액션: 사용자가 d-1 영역 심문 중

**Narrative scenario:**
- 컨텍스트: 윤태성이 격앙 상태에서 동생을 향한 의심을 직접 발설
- 발동 흐름 (~8초): B 답변 중 → A 끼어들기 → 판사 reactive query → A 답변 → 판사 단서 등록

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-a-interject-v1` | A | 판사 | 끼어들기 | 1~2 문장 | 격앙·결단 |
| `emerge-dc1-via-a-interject-judge-react-v1` | 판사 | A | reactive query | 1 문장 | 격식·신중 |
| `emerge-dc1-via-a-interject-a-response-v1` | A | 판사 | 답변 | 1~2 문장 | 격앙→사실 |
| `emerge-dc1-via-a-interject-judge-decree-v1` | 판사 | 전체 | 단서 등록 선언 | 1 문장 | 격식·확정 |

**가이드:**
- A interject (v3 승인): **"잠깐만요, 재판관님. 정후가 어머니 종이를 쥐고 있었습니다. 그 시기를 봐야 합니다."** (격앙 톤, "동생"은 판사 대상이라 "정후"라 직접 호명 가능. 단 다른 곳에서는 "제 동생" 사용)
- 판사 react: "윤태성 씨, 방금 말씀, 어느 시기 일이었습니까?"
- A response: "어머니 마지막 몇 주 동안입니다. 제가 잠깐 비웠을 때 정후가 어머니 곁에서 종이를 들고 있었습니다." (격앙→사실)
- decree: trigger 1 form과 동일 ("…단서로 [말년의 종이]를 추가합니다.")

#### Trigger 3 — B의 감정 돌발 [type: `emotional_outburst`]

**선결조건:**
- d-1 lieState ≥ S1
- B의 emotional phase ≠ collapsed (격앙 가능 상태)
- 활성 액션: 사용자가 어머니 방문 영역 질문 중

**Narrative scenario:**
- 컨텍스트: 윤정후(affect_flattening 성향)가 평소 평정 유지 중, 본인 행동 변호 영역에서 살짝 흔들리며 본인 행동 흘림
- 발동 흐름 (~7초): 판사 질문 → B 흔들리며 자기 행동 흘림 → 판사 reactive → B 짧은 답 → 판사 단서 등록

**필요 KO entry (4개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-b-outburst-v1` | B | 판사 | 흔들리며 흘림 | 1~2 문장 | 흔들림→방어 |
| `emerge-dc1-via-b-outburst-judge-react-v1` | 판사 | B | reactive query | 1 문장 | 격식·신중 |
| `emerge-dc1-via-b-outburst-b-response-v1` | B | 판사 | 짧은 답 (회피적 시인) | 1 문장 | 평정 복귀 |
| `emerge-dc1-via-b-outburst-judge-decree-v1` | 판사 | 전체 | 단서 등록 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B outburst (v3 승인): **"그저… 어머니께서 이해하시기 편하시도록 정리된 내용을 읽어드린 것뿐입니다."** (말 끝 흔들림 후 다시 평정 톤)
- 판사 react (v3 승인): **"그 내용이 적힌 종이를 확인할 수 있습니까?"**
- B response: "이미 어머니 유품 정리 중에 있던 것입니다. 제 손에는 남아 있지 않습니다." (회피적 시인)
- decree: trigger 1 form과 동일

#### Trigger 4 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2/T3 모두 미발동 + e-2 Original 도달 후 일정 turn(예: 8턴) 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-dc1-via-judge-auto-decree-v1` | 판사 | 전체 | 자발 정리 + 단서 등록 | 1~2 문장 | 격식·결정 |
| `emerge-dc1-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 시인 | 1 문장 | 무표정·시인 |

**가이드:**
- 판사 auto (v3 승인): **"방문 시기와 공증 시점이 겹쳐 있는 점을 감안하여, 하나의 단서를 추가로 정리해 두겠습니다. 단서 [말년의 종이]를 등록합니다."**
- B respond: "예, 받아들이겠습니다."

**dc-1 total: 2 + 4 + 4 + 2 = 12 entry**

---

### Emergence 2: **w-1** "최복순" — 3 trigger (호출 가능 자격 부여 narrative)

본 emergence는 w-1을 "호출 가능"하게 만드는 narrative wrapper. 실제 w-1의 진술은 별도 channel(witness) 영역에서 진행되므로 본 emergence는 호출 자격 narrative만.

#### Trigger 1 — dc-1 cascade [type: `cascade_from_card`]

**선결조건:**
- `dc-1` 이미 fired (priorCard:dc-1)
- d-1 lieState ≥ S2

**Narrative scenario:**
- 컨텍스트: dc-1 등록 직후, 그 단서의 직접 목격자(전 요양보호사) 호출 자연 흐름
- 발동 흐름 (~5초): 판사 자발 cascade mention → w-1 호출 자격 surface

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-cascade-judge-summon-v1` | 판사 | 전체 | dc-1 reference + w-1 호출 선언 | 1~2 문장 | 격식·결정 |
| `emerge-w1-via-cascade-a-react-v1` | A | 판사 | 짧은 동의 | 1 문장 | 짧은 동의 |

**가이드:**
- 판사 summon: **"앞서 등록된 단서 [말년의 종이]와 관련하여, 당시 어머니 곁에 계셨던 전 요양보호사 분의 진술을 직접 청취하겠습니다. 최복순 씨를 부르도록 준비하겠습니다."** — priorCard:dc-1 명시 reference 필수
- A react: "감사합니다, 재판관님."

#### Trigger 2 — B의 끼어들기 [type: `npc_interjection`]

**선결조건:**
- dc-1 challenge 진행 중 OR d-1 lieState ≥ S2
- B 평정 톤 유지 상태

**Narrative scenario:**
- 컨텍스트: 윤정후가 dc-1 challenge 답변 중 본인 결백 강조하며 제3자 청취 권유
- 발동 흐름 (~6초): B 흘림 → 판사 reactive → w-1 호출 surface

**필요 KO entry (3개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-b-interject-v1` | B | 판사 | 흘림 (담당자 청취 권유) | 1~2 문장 | 평정·짧음 |
| `emerge-w1-via-b-interject-judge-react-v1` | 판사 | B | reactive (호출 결정) | 1 문장 | 격식·결정 |
| `emerge-w1-via-b-interject-judge-summon-v1` | 판사 | 전체 | w-1 호출 선언 | 1 문장 | 격식·확정 |

**가이드:**
- B interject (v3 승인): **"당시 담당하셨던 요양보호사 분께서도 모두 알고 계실 겁니다."** (평정 톤, 본인 결백 frame)
- 판사 react: "그렇다면 그분 진술을 직접 청취하겠습니다."
- 판사 summon: "최복순 씨를 본 법정에 모시도록 준비하겠습니다."

#### Trigger 3 — 판사 자발 fallback [type: `judge_auto_mention`]

**조건:**
- T1/T2 모두 미발동 + dc-1 등록 후 일정 turn(예: 5턴) 경과

**필요 KO entry (2개):**

| ID | 화자 | 청자 | 시점 | 분량 | tone |
|---|---|---|---|---|---|
| `emerge-w1-via-judge-auto-summon-v1` | 판사 | 전체 | 자발 호출 결정 | 1~2 문장 | 격식·결정 |
| `emerge-w1-via-judge-auto-b-respond-v1` | B | 판사 | 짧은 응답 | 1 문장 | 무표정 |

**가이드:**
- 판사 auto: "어머니 말년 정황 확인을 위해 당시 담당하셨던 전 요양보호사 분의 진술이 필요한 시점이라 봅니다. 최복순 씨를 부르도록 준비하겠습니다."
- B respond: "예, 받아들이겠습니다."

**w-1 total: 2 + 3 + 2 = 7 entry**

---

**Batch 1 grand total: 12 + 7 = 19 entry**

---

## §3. `cascade_from_card` trigger spec (본 batch 활용)

상세 schema는 `design_narrative_cascade_from_card.md` 정독. 핵심:

```typescript
// NarrativeTriggerPreconditions 확장
{
  requirePriorCardFired?: string  // dossierCardId | evidenceId
  // ... 기존 field
}

// NarrativeTriggerType 확장
type NarrativeTriggerType =
  | 'npc_interjection'
  | 'combination_result'
  | 'emotional_outburst'
  | 'judge_auto_mention'
  | 'cascade_from_card'  // 5번째
```

**Runtime 거동:**
- `requirePriorCardFired` 명시된 ID가 fired 상태 확인 + 본 candidate의 다른 preconditions 모두 만족 시 fire 자격

**Tag spec (본 batch w-1 cascade entry):**
```
"trigger:cascade_from_card"
"priorCard:dc-1"
```

ScriptedText entry text의 cascade reference 패턴:
- "앞서 등록된 단서 [말년의 종이]…" 처럼 priorCard reference 명시

---

## §4. 작성 산출 형식

각 entry는 `src/data/scriptedText/family-01.json` 의 신규 `emergence_narrative` channel에 추가:

```json
{
  "id": "emerge-dc1-via-combo-judge-decree-v1",
  "text": "{KO 시안}",
  "behaviorHint": "{선택 — 발화자의 행동/표정 힌트}",
  "tags": [
    "channel:emergence_narrative",
    "speaker:judge",
    "speakerRole:judge",
    "listener:all",
    "listenerRole:all",
    "address:toAll",
    "scope:judge_only",
    "register:formal",
    "honorific:formal",
    "audience:both",
    "tense:present",
    "relationship:family",
    "emotion:measured",
    "continuity:decree",
    "reveal:none",
    "disclosure:guarded",
    "responseMode:judge_formal_decree",
    "trigger:combination_result",
    "emergence:dc-1",
    "comboRecipeId:combine-1"
  ]
}
```

**Tag 명세:**
- `channel:emergence_narrative` (신규 channel)
- `speaker:{a|b|judge}` / `speakerRole:{party|judge}`
- `listener:{judge|a|b|all}` / `listenerRole:{judge|party|all}`
- `address:{toJudge|toParty|toAll}`
- `register:formal` (재판관 격식 환경 — 본 batch 전부)
- `relationship:family` (family-01 = 가족 사건)
- `trigger:{npc_interjection|combination_result|emotional_outburst|judge_auto_mention|cascade_from_card}`
- `emergence:{dc-1|w-1}` — 대상 emergence ID
- **cascade_from_card 전용**: `priorCard:dc-1` 추가
- **combination_result 전용**: `comboRecipeId:{combine-1|combine-11}` 추가
- 호칭 tag: `callTerm:윤태성_씨` / `callTerm:윤정후_씨` / `judgeAddress:재판관님` (해당 시)

---

## §5. 톤 권위 (전체 공통)

- **재판관**: 격식·신중·확정. "...십시오", "...습니다" 종결. 단정·강압 회피
- **A (윤태성, confrontational)**: 격앙·결단 → 사실 진술. **interjection은 격앙**, 자발 발화는 frame 보호 톤. 본인 발화에서 동생은 "정후" (직접 호명) / "제 동생" (판사 대상). 격앙 시 "윤정후!"
- **B (윤정후, affect_flattening)**: 평정·짧음·자기 보호. **outburst trigger에서만 잠시 흔들림**. 본인 발화에서 형은 "형" (직접) / "저희 형" (판사 대상). 격앙 시 "윤태성!"
- 다른 family-01 entry와 호명·종결 일관 (재판관님, 윤태성 씨, 윤정후 씨)

자연화 5 차원 (`feedback_natural_korean_npc_active_voice.md`) 적용:
- 강력 어휘 완화 / 모호 referent 명확 동사구 / 피동 회피 / 직역체 내면 발화 / 자연 완충재

**재판관 어법 — 사실/행위 중심** (`feedback_judge_dispassionate_action_focused.md` Cycle 7 신규):
- 감정·가치 판단 어휘 회피 ("선을 넘다", "흐름", "낙인" X)
- 사실·행위·선후관계 중심 어휘 ("먼저 연락", "정황", "선후관계", "관련 자료")
- "반증/그 X" → "관련 X" 중립 유지
- **증인 호출 동사 다양화** — 단일 "호출하겠습니다" 반복 X. 본 batch w-1 호출 entry에서:
  - "최복순 씨를 부르겠습니다"
  - "최복순 씨를 본 법정에 모시겠습니다"
  - "최복순 씨 진술을 직접 들어보겠습니다"
  - "최복순 씨를 증인으로 모시도록 준비하겠습니다"
  - 위 류 중 trigger 별로 다른 동사 사용 권장

자기지시 정밀 (`feedback_self_reference_speaker_context.md`):
- NPC 1인칭 자기 발화에 "본인" X → "저/제"
- 단, 제3자(판사)가 NPC 가리킬 때는 "본인" 자연

본인 가족 호칭 (`feedback_family_address_speaker_perspective.md`):
- family-01은 시댁/처가 X. 어머니는 자기 시점 호칭 ("어머니" / "우리 어머니")
- 형/동생 호칭: A → B는 "정후" 또는 "제 동생", B → A는 "형" 또는 "저희 형"

---

## §6. 진실 노출 경계 — Line A 영역

`design_family01_truth_disclosure_policy.md` 권위 준수. **Line A (절차/판단)는 사건 시작 영역 — 그룹 1~5 모두 surface 절대 금지**.

### 본 batch surface 금지 영역 (모든 entry에서):

- **그룹 1 (출생 비밀)**: "출생 비밀", "친자가 아니다", "배다른", "아버지 피", "형의 정체성"
- **그룹 2 (정후 돈/20년 송금)**: "정후 돈", "윤정후 돈", "어머니 통장 경유", "정기 지원금", "3억원 전달", "20년 비밀 지원"
- **그룹 3 (자필 90:10/공증 60:40 축소)**: "자필 90:10", "공증 60:40으로 축소", "자기 몫 양보", "비율 줄임"
- **그룹 4 (공장 양보/친자 양보)**: "공장 양보", "친자가 양보", "형 자존심"
- **그룹 5 (유산 당연시/보호 명분)**: "유산 당연시", "보호 명분", "어머니 뜻 왜곡", "두 번 왜곡"

### Line A 허용 표면 영역:

- 어머니 말년 방문 패턴 (방문 횟수, 시기 겹침)
- 종이 낭독 정황 ("종이를 읽어드림", "정리된 내용을 읽어드림")
- 어머니 판단 능력 (의심 / 흐림)
- "형 오기 전" 정황 (시점 회피)
- 공증 시점 겹침 (단, 비율 수치는 d-2에서만, Line A Batch 2/3 영역)

### 호칭 surface 영역:

- 어머니 = "어머니" (양 형제 모두)
- 윤태성 (A) 발화에서 윤정후 (B) = "정후" / "제 동생"
- 윤정후 (B) 발화에서 윤태성 (A) = "형" / "저희 형"
- 판사 호명: "윤태성 씨" / "윤정후 씨" / "최복순 씨"

---

## §7. dossier card 명칭 변경 영역 (Cycle 5 신규)

`feedback_dossier_card_renamed_to_clue.md` 권위 준수.

**player-visible text 변경 적용:**
- "사건 카드 [말년의 종이]" → "**단서** [말년의 종이]"
- "사건 카드를 등재합니다" → "**단서**를 등록합니다"
- 본 batch w-1 cascade entry에서 dc-1 reference 시 "단서 [말년의 종이]" 표현 사용

**evidence(증거) layer와 구분 유지 — 본 batch 영역:**
- dc-1 = **단서** (말년의 종이) — 정리/추론 결과
- e-1 (60:40 유서 사본) / e-2 (요양원 방문기록) / e-3 (전 요양보호사 음성증언) = **증거** — raw 자료
- entry text에서 두 layer 표현 구분 사용 ("단서 [말년의 종이]" / "증거 [요양원 방문기록]")

---

## §8. GPT Pro 산출 → Claude apply 흐름

1. GPT Pro가 본 brief 기반 19 KO entry 작성 (JSON 파일 `output-cycle5-batch1.json`)
2. 사용자 spot check (3~5분)
3. Claude가 `src/data/scriptedText/family-01.json` 의 `emergence_narrative` channel 추가 + tags 정합 검증
4. Claude가 dc-1 (DossierCard) + w-1 (Witness) narrativeTriggers 부착
5. Claude가 dispatch 통합 확인 (Cycle 2에서 이미 통합된 narrativeIntegration.ts 경로 사용)
6. Claude가 다국어 sync 의뢰서 작성 (별도 form, 19 entry × 3 lang)
7. tsc + build + qa:fast PASS + commit + push

---

## §9. 본 batch 진행 메모

- **Batch 1은 family-01 narrative wrapper 첫 적용 batch** — 본 batch 톤·구조가 Batch 2/3의 reference
- **cascade_from_card 첫 family-01 적용** — w-1 cascade에서 priorCard:dc-1 reference 명확하게
- **'단서' 명칭 첫 family-01 적용** — entry text 일관 적용 + 다국어 의뢰서에 evidence vs clue 구분 명시

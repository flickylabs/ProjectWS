# LLM 대화 품질 고도화 가이드

> 작성: 2026-04-04
> 적용 범위: 84건 전체 (Stage-1 7건 검증 완료, 77건 확장 예정)
> 모델: gpt-4o (대사 생성) / gpt-4o-mini (분석/분류)

---

## 1. 모델 분리 전략

| 용도 | 모델 | temperature | maxTokens |
|------|------|-------------|-----------|
| **NPC 심문 대사** | gpt-4o | 1.0 | 400 |
| **자유 질문 응답** | gpt-4o | 1.0 | 400 |
| **증인 증언** | gpt-4o | 1.0 | 400 |
| **끼어들기/반박** | gpt-4o | 1.0 | 400 |
| **Phase 1/2 생성** | gpt-4o | 1.0 | 4000 |
| **후일담 생성** | gpt-4o | 1.0 | 500~600 |
| 모순 검출 | gpt-4o-mini | 0.1 | 100 |
| 증언 분석 | gpt-4o-mini | 0.3 | 800 |
| 자유 질문 분류기 | gpt-4o-mini | 0.1 | 180 |
| 사건 생성 | gpt-4o-mini | 0.9 | 2000 |

**원칙**: 플레이어에게 보이는 대사 = gpt-4o, 내부 처리 = gpt-4o-mini

**코드 위치**: `src/engine/llmClient.ts`의 `MODEL_DIALOGUE` / `MODEL_ANALYSIS` 상수

---

## 2. 프롬프트 구조 (blueprintPromptBuilderV2.ts)

### 2-1. 시스템 프롬프트 구성 순서

```
1. 캐릭터 정보 (이름, 나이, 직업, 상대방)
2. 사건 배경
3. ★ 캐릭터 성격 (ARCHETYPE_GUIDE — 상세 버전)
4.   말투 (speechStyle)
5.   ★ 말버릇/tell (TELL_HINTS — 상세 버전, 빈도 제한)
6. 이번 턴 지시서 (stance, defense, sentenceCount)
7. 답변 초점 (ANSWER_FOCUS — 상세 버전)
8. 이번 턴 말할 수 있는 의미 (atom labels)
9. 표현 재료 (slot materials)
10. 숨기는 것 / 실제로 알고 있는 것 (privateKnowledge, stance별 게이팅)
11. Truth Throttle (lieState별 진실 제한)
12. 절대 금지 (suppressions)
13. 호칭 규칙
14. 최근 대화
15. 출력 형식
16. ★ few-shot 예시 (좋은/나쁜 답 5쌍)
17. ★ 절대 규칙 (존대, 번역체 금지, 반복 금지, 감정/디테일 요구)
```

### 2-2. 핵심: tell은 캐릭터 섹션(상단)에 배치

tell 지시를 프롬프트 하단에 넣으면 LLM이 무시함.
**반드시 `## 캐릭터` 섹션 내, archetype + speechStyle 바로 뒤에 배치.**

---

## 3. ARCHETYPE_GUIDE — 확장 형식

각 archetype마다 5개 항목을 포함:

```
[trait] 성격 특성 1-2줄
[tone] 말하는 톤/느낌
[rhythm] 문장 구조 패턴
[example] 이 캐릭터다운 대사 예시 1개
[avoid] 이 캐릭터가 절대 안 하는 것
```

### 현재 정의된 6종

| archetype | 핵심 특성 | 대사 예시 |
|-----------|----------|----------|
| avoidant | 화제 전환, 순서/절차 앞세움 | "그 부분은 순서가 있어서, 지금 당장은 말씀드리기 어렵습니다." |
| confrontational | 짧고 날카로움, 역공 | "오히려 상대방이 왜 그랬는지를 물으셔야 하지 않습니까." |
| victim_cosplay | 자기 상처/억울함 수렴 | "저만 이런 취급을 받는 게 이해가 안 됩니다." |
| cold_logic | 감정 배제, 기준/숫자 앞세움 | "사실관계를 정리하면, 해당 금액은 제가 보낸 것이 맞습니다." |
| affect_flattening | 감정 극도 억제, 건조 | "네, 그렇게 했습니다." |
| premature_summary | 화제 전환, 조기 마무리 | "그 부분은 전체 맥락에서 보면 큰 의미가 없습니다." |

### 77건 확장 시 주의
- 각 사건의 캐릭터 archetype이 위 6종 중 하나여야 함
- `src/types/character.ts`의 `Archetype` 타입에 정의됨

---

## 4. TELL_HINTS — 확장 형식

각 tell마다 3개 항목:

```
[동작] 어떤 행동이 나타나는지
[예시] 실제 대사 예시
[발현] 어떤 상황에서 나타나는지
```

### 빈도 제한 — 핵심 규칙

```
"3~4턴에 1회만. 매 턴 넣지 마라. 넣지 않는 턴이 더 많아야 자연스럽다."
```

이 규칙 없으면 LLM이 매 턴 tell을 넣어서 역효과.

### 현재 정의된 6종

| tell | 동작 | 발현 상황 |
|------|------|----------|
| over_precision | 시각/날짜를 분 단위로 정밀하게 말함 | 사실 인정/변명 시 |
| counter_question | 답변 끝에 반문 | blame 스탠스에서 |
| timeline_padding | 동선을 장황하게 나열 | hedge/deny에서 핵심 회피 |
| evidence_waving | 증거 하나로 결론 단정 | 증거 언급 시 |
| motive_jump | 행동→나쁜 의도 단정 | blame에서 상대 공격 |
| selective_quote | 상대 말의 약한 고리 반복 인용 | 상대 이전 발언 공격 |

### 77건 확장 시 주의
- 각 캐릭터의 `verbalTells[0].type`이 위 6종 중 하나
- 새로운 tell 유형이 필요하면 `TELL_HINTS`에 추가 필요

---

## 5. ANSWER_FOCUS — 질문 유형별 톤 차별화

각 유형마다 4개 항목:

```
[content] 무엇에 대해 답할지
[tone] 어떤 톤으로
[rhythm] 문장 구조
[example] 예시 대사
```

| 유형 | 핵심 | 톤 |
|------|------|-----|
| fact_pursuit | "했다/안 했다"를 먼저 | 단호/긴장 |
| motive_search | "왜"를 말하라 | 변명/방어 |
| empathy_approach | 감정을 먼저 | 솔직/취약 |
| evidence_present | 증거에 대한 입장 | 당황/반박 |

---

## 6. Truth Throttle — lieState별 진실 제한

| lieState | 키 | 핵심 지시 |
|----------|-----|----------|
| S0-S1 | early | 기관명/서비스명/직함 절대 금지, 모호하게 회피 |
| S2 | hint | "개인 사정"/"가족 일" 수준까지만, 기관명/직함 금지 |
| S3 | blame | 행위 인정 + 상대 탓, 구체적 진실 아직 금지 |
| S4-S5 | open | ★ 모두 털어놓아라 (아래 상세) |

### S5 자백 (TRUTH_THROTTLE.open) — 핵심 규칙

```
★ 이제 진실을 모두 털어놓아라 — 이 턴이 가장 중요하다:
- "표현 재료"와 "실제로 알고 있지만 숨기는 것"에 있는 구체적 정보를 반드시 사용하라
- 금액은 정확한 숫자로, 인물은 이름으로, 기관은 정식 명칭으로 말하라
- "상당한 금액"이나 "그 사람" 같은 모호한 표현 금지
- 최소 구성: [구체적 사실 1문장] + [왜 숨겼는지 1문장] + [심정 1문장]
- 톤: 방어가 완전히 무너진 사람
```

---

## 7. S5 자백 — slot 승격 로직

### 문제와 해결

**문제**: S5에서도 slot이 neutral("해당 금액", "그 사람")로 제공되어 LLM이 구체적 진실을 말하지 못함

**해결**: `atomSelectionEngine.ts`의 `resolveSlotSelections()`에서 `stance === 'confess'`일 때 slot 모드를 승격

| slot family | 일반 모드 | confess 모드 |
|-------------|----------|-------------|
| amount | neutral ("해당 금액") | **rounded ("280만원")** |
| time | neutral ("그날") | **dateExact ("9월 20일")** |
| person/beneficiary | neutral ("그 사람") | **fullName ("최민정")** |
| + role 보충 | 없음 | **"재가돌봄센터 상담팀장"** |

### 77건 확장 시 주의
- 각 사건의 v2-atoms에서 S4-S5 atom의 slots에 fullName, rounded, dateExact 등이 정확히 들어있어야 함
- Thread B에서 S0-S2를 neutral화할 때 S3+ 원본이 보존되었는지 확인 필수

### 금액 표기 통일

**"280만원" 스타일 (자연어) 사용. "2,800,000원" 스타일 금지.**

- slot의 `rounded` 값을 자연어 형식으로 통일
- confess에서 `rounded`를 우선 사용 (exact fallback 하지 않음)
- 이유: 사람이 말하는 형식은 "이백팔십만원"이지 "2,800,000원"이 아님

---

## 8. 번역체/보고서 톤 금지

### 명시적 금지 패턴 목록

```
"~된 것으로 생각됩니다" → 직접 말하라
"~인 측면이 있었습니다" → "~한 점은 있습니다"
"여러 가지 상황이 얽혀" → 구체적 상황 1가지만 말하라
"관련 사항을 간과하게 된" → "놓쳤습니다"
"부득이하게" → "어쩔 수 없이" 또는 "급해서"
"해당 건에 대해서는" → "그 일은"
"~하는 바입니다" → 금지
"인지하고 있습니다" → "알고 있습니다"
"~에 기인합니다" → "~ 때문입니다"
"사전 상의가 누락된" → "미리 말하지 못한", "상의 없이", "혼자 결정한", "알리지 않고"
```

### 3중 수식 금지
"~의 ~에 대한 ~으로" 식의 복합 수식 → 문장을 나눠라

### 핵심 원칙
```
"실제 법정에서 감정이 격한 당사자가 하는 말을 떠올려라.
 차갑고 객관적인 보고서가 아니다."
```

---

## 9. 반복 표현 금지

| 표현 | 규칙 |
|------|------|
| "상당한 금액" | 전체 대화 최대 1회. 이후 "적지 않은 돈", "큰돈", "그 돈" |
| "사전 상의/협의" | **완전 금지**. "미리 말하지 못한", "상의 없이", "혼자 결정한" |
| 같은 단어/구 | 2턴 연속 등장 금지 |
| "여러 가지", "급한 일", "사실입니다" | 연속 사용 금지 |

---

## 10. 금액/시각 분리 규칙

| 항목 | S0-S3 규칙 | S4-S5 규칙 |
|------|-----------|-----------|
| **금액** | 정확한 숫자 금지. "적지 않은 돈", "큰돈" | 자연어 형식 허용 ("280만원") |
| **시각/날짜** | **구체적으로 허용** ("14시 03분", "9월 20일") | 모두 허용 |
| **순서** | 구체적으로 허용 | 모두 허용 |

**핵심**: 금액은 비밀이지만 시각/날짜는 비밀이 아님. over_precision tell의 핵심이 시각 정밀이므로 이를 막으면 tell이 발현 불가.

---

## 11. few-shot 예시 (프롬프트에 삽입)

```
[deny/S1 회피형+over_precision]
좋은 답: "14시 03분에 제 폰에서 나간 건 맞습니다. 그런데 그 숫자만 보고 다른 뜻부터 붙이는 건 순서가 아닙니다."

[deny/S1 정면돌파형]
좋은 답: "네, 확인했습니다. 오히려 왜 그걸 새벽에 열어봤는지가 먼저 아닙니까."

[hedge/S2]
좋은 답: "집안에 급한 일이 생겨 먼저 움직였습니다. 설명을 늦춘 건 제 잘못이지만, 성격이 다른 돈입니다."

[blame/S3]
좋은 답: "제가 늦었습니다. 그렇다고 남의 폰을 열고 외도부터 만든 순서까지 사라지진 않습니다."

[emotional/S4]
좋은 답: "처가 쪽 돈 앞에서 쩔쩸매는 꼴을 보이기 싫었습니다. 가장이 숫자 앞에서 작아지는 건, 생각보다 더 창피합니다."

나쁜 답 특징: "여러 가지 상황이 얽혀", "~된 것으로 생각됩니다", "사전 상의가 누락된"
```

### 77건 확장 시
- spouse-01 기반 예시를 그대로 사용해도 됨 (특정 사건 정답이 아닌 톤 가이드)
- 사건 카테고리별(친구/직장/이웃 등) 추가 예시를 만들면 더 효과적

---

## 12. 긍정 규칙 (반드시 지킬 것)

```
- 캐릭터의 감정 색깔을 드러내라 (짜증, 두려움, 억울함, 한심함 등)
- 한 턴에 최소 1개의 구체적 디테일 (시간대, 장소, 행동, 상황)
- "두루뭉술하게 여러 가지"라 하지 말고 딱 1가지를 구체적으로
- 이전 턴과 겹치는 표현 금지
- 첫 문장은 질문에 대한 직접적 반응
```

---

## 13. 후처리 (llmDialogueResolver.ts)

### enforceHonorifics()
- 반말/해요체 → 합니다체 변환 (총 ~54개 규칙)
- emotional/confession beatType에서는 해요체 허용 (향후 구현, TODO 메모됨)
- 과도한 변환 완화: ~세요→~십시오 제거, ~어때요→~어떨까요

### fixMisdirectedAddress()
- "네가/니가" → "상대방이"
- 상대 이름 호격("세린아,", "지석아,") 제거 (partyNames 전달 시)

---

## 14. 끼어들기 대사 (interjectionV2.ts)

### archetype별 차별화
6종 archetype × 4종 infoLevel = 24가지 조합
+ emotion 70+ 격한 톤 변형

### 77건 확장 시
- 각 사건의 캐릭터 archetype이 6종 중 하나면 자동 적용
- 추가 대사 변형이 필요하면 `ARCHETYPE_LINES` 맵에 추가

---

## 15. 증인 프롬프트

### 번역체 가드 추가
- witnessEngine.ts 폴백 프롬프트 + seedBlocks.js 에이전트 블록 양쪽에 적용
- "실제 법정에서 증인이 하는 말. 긴장하면서도 아는 것을 말하려는 사람"

### 기관 증인 예외
- `witness.slot === 'institutional'`일 때 partial에서 자기 업무 범위 사실 공개 허용
- `witnessEngine.ts`의 `determineTestimonyDepth()`에 구현됨

---

## 16. 검증된 품질 수준 (spouse-01 기준)

### Before (gpt-4o-mini, 원본 프롬프트)
```
S1: "사전 상의가 일부 누락된 부분은 있었던 것으로 생각됩니다"
S5: "그 약속을 위반한 사실을 인정합니다. 상당한 금액을 송금했습니다"
```

### After (gpt-4o, 고도화 프롬프트)
```
S1: "네, 그 송금은 제가 했습니다. 하지만 그 돈이 어디로 간 건 순서가 있습니다."
S3: "제 아내가 먼저 제 폰을 열어본 건 순서가 있는 문제 같습니다."
S5: "280만원을 공동계좌에서 송금했습니다. 처가 쪽의 간병 예약 때문에"
```

### 달성 지표
- 번역체: 0건
- tell 발현: 4/19턴 (21%) — 자연스러운 빈도
- "사전 상의" 반복: 0건
- S5 구체적 진실: 금액+기관+인물+목적 모두 포함
- ⚠️ 경고: 0건 / ❌ 에러: 0건

---

## 17. 77건 확장 시 체크리스트

### 데이터 품질
- [ ] v2-atoms S0-S2 slots가 neutral인지 (Thread B 교정 확인)
- [ ] v2-atoms S4-S5 slots에 fullName, rounded, dateExact가 있는지
- [ ] v2-atoms fallbackPublicClaim이 slots 추상화 수준을 따르는지
- [ ] amount.rounded가 자연어 형식("280만원")인지
- [ ] 각 캐릭터의 archetype이 6종 중 하나인지
- [ ] 각 캐릭터의 verbalTells[0].type이 TELL_HINTS에 정의되어 있는지

### 프롬프트 품질
- [ ] ARCHETYPE_GUIDE에 해당 archetype이 정의되어 있는지
- [ ] TELL_HINTS에 해당 tell이 정의되어 있는지
- [ ] few-shot 예시가 해당 사건 카테고리에 적합한지

### 결과 검증
- [ ] 번역체 0건
- [ ] "사전 상의/협의" 0건
- [ ] tell 발현 빈도 15-25% (3-4턴에 1회)
- [ ] S5에서 구체적 진실 (금액+인물+기관+목적) 포함
- [ ] "상당한 금액" 최대 1회
- [ ] 같은 표현 2턴 연속 없음

---

## 18. 수정된 파일 목록

### 엔진 코드
```
src/engine/blueprintPromptBuilderV2.ts  — 프롬프트 전면 개편
src/engine/atomSelectionEngine.ts       — S5 slot 승격 로직
src/engine/llmDialogueResolver.ts       — enforceHonorifics 확장 + fixMisdirectedAddress 강화
src/engine/llmClient.ts                 — MODEL_DIALOGUE/MODEL_ANALYSIS 분리
src/engine/interjectionV2.ts            — archetype별 끼어들기 대사
src/engine/witnessEngine.ts             — 번역체 가드 + 기관 증인 예외
src/engine/blueprintPromptBuilderV2.ts  — tell 위치 이동 (하단→캐릭터 섹션)
```

### 파라미터
```
src/api/promptManager.ts                — temperature 1.0, maxTokens 400
src/api/agentManager.ts                 — 동일
src/hooks/useActionDispatch.ts          — 반박 대사 temperature 1.0
```

### 서버/DB
```
server/db/seed.js                       — llm_model: gpt-4o, temperature: 1.0, max_tokens: 400
server/db/seedBlocks.js                 — 증인 번역체 가드
```

### 테스트
```
tests/full-playthrough-v2.cjs           — 전체 개편 (ARCHETYPE/TELL/FOCUS/few-shot/S5 slot 승격)
tests/*-playthrough.cjs (7건)           — 모델 gpt-4o로 변경
```

# Stage-1 마스터 가이드 — 77건 확장 + 84건 스크립트 대체

> 작성: 2026-04-05
> 근거: Stage-1 7건(spouse-01, family-01, friend-01, neighbor-01, partnership-01, tenant-01, workplace-01) 검증 완료
> 목적: 이 문서 하나로 77건 확장의 모든 기준, 84건 V3 스크립트 대체의 로드맵을 파악할 수 있어야 함

---

## Part 1: Stage-1 7건에서 수정한 모든 내역

---

### 1-1. 엔진 코드 변경 (파일별)

#### (1) `src/engine/blueprintPromptBuilderV2.ts` — 프롬프트 전면 개편

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `buildBlueprintSystemPromptV2()` 전체 | 단순 지시문 (archetype 1줄, tell 1줄) | ARCHETYPE_GUIDE 6종(trait/tone/rhythm/example/avoid), TELL_HINTS 6종(동작/예시/발현+빈도제한), ANSWER_FOCUS 4종(content/tone/rhythm/example), few-shot 5쌍, 번역체 금지 9패턴, 사과 클리셰 차단, 긍정 규칙 5개 | gpt-4o-mini 시절 "사전 상의가 누락된" 류 보고서 톤이 반복 → 프롬프트 고도화로 캐릭터성+자연스러움 확보 |
| `TRUTH_THROTTLE` 상수 | early/open 2단계 | early/hint/blame/open 4단계 | S2(hint)와 S3(blame)에서 진실 제한 수준을 세분화 |
| `getTruthThrottle()` | S0-S3 → early, S4-S5 → open | S0-S1 → early, S2 → hint, S3 → blame, S4-S5 → open | Truth Throttle 4단계 매핑 구현 |
| `gatePrivateKnowledge()` | 전체 공개 | S0-S2: 1개만, S3: 2개, S4+: 전체 | 비공개 지식의 단계별 노출 제한 |
| `ARCHETYPE_GUIDE` 상수 | 1줄 설명 | 5항목(trait/tone/rhythm/example/avoid) 상세 | LLM이 캐릭터를 더 깊이 이해하도록 |
| `TELL_HINTS` 상수 | 1줄 설명 | 3항목(동작/예시/발현) + 빈도 제한 "3~4턴에 1회만" | 빈도 미제한 시 매 턴 tell 넣어서 역효과 |
| `ANSWER_FOCUS` 상수 | 1줄 설명 | 4항목(content/tone/rhythm/example) | 질문 유형별 답변 톤 차별화 |
| tell 위치 | 프롬프트 하단(절대 규칙 근처) | `## 캐릭터` 섹션 내, archetype+speechStyle 바로 뒤 | 하단에 넣으면 LLM이 무시 |
| few-shot 5쌍 | 없음 | deny/S1, hedge/S2, blame/S3, emotional/S4, confess/S5 각각 좋은/나쁜 답 쌍 | 구체적 예시가 톤 통제에 가장 효과적 |
| 번역체 금지 | 없음 | 9개 패턴 명시 (기인합니다, 바입니다, 인지하고 등) + 3중 수식 금지 + "법정 당사자" 원칙 | 번역체가 가장 큰 품질 저해 요인 |
| 사과 클리셰 차단 | 없음 | "미리 말씀드리지 못한" 금지 + 7종 변형 리스트 + 2턴 연속 사용 금지 | 테스트에서 ~20회 과다 반복됨 |
| 금전 무관 가드 | 없음 | disputes에 금전 키워드 없으면 `monetaryGuard` 자동 삽입 | workplace-01에서 금전 hallucination 발생 |
| S5 자백 감정 | "모두 털어놓아라" | 감정 4종(두려움/후회/체면/체념) 예시 + "감수하겠습니다"/"이로 인해" 명시 금지 | partnership-01 S5에서 보고서 톤 잔존 |
| "상당한 금액" 반복 금지 | 없음 | 전체 대화 최대 1회, 이후 "그 돈"/"적지 않은 돈"/"큰돈" | 같은 표현 반복이 기계적 느낌 |
| "사전 상의/협의" 금지 | 없음 | 완전 금지 → "상의 없이"/"혼자 결정한"/"알리지 않고" | LLM이 가장 많이 반복하는 표현 |
| 금액/시각 분리 | 금액+시각 모두 숨김 | 금액만 숨김, 시각/날짜/순서는 허용 | over_precision tell이 시각 정밀이므로 시각 차단하면 tell 발현 불가 |

**77건 확장 시 추가 작업**: 불필요. 코드 공통이므로 자동 적용.

#### (2) `src/engine/atomSelectionEngine.ts` — S5 slot 승격 로직

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `resolveSlotSelections()` 내 confess 분기 | 없음 (모든 slot neutral) | `confessPromotesExact=true`일 때 family별 승격: amount→rounded, time→dateExact, person/beneficiary→fullName, evidence→fullName, action/rule/place→exact | S5에서 "상당한 금액" → "280만원" 등 구체적 진실 표현 필수 |
| confess person role 보충 | 없음 | `slotData.role`이 있으면 추가 selection으로 제공 (예: "재가돌봄센터 상담팀장") | "최민정"만으로 부족, 직함까지 필요 |
| tell 비활성 시 neutral 강제 | 없음 | confess도 아니고 tell도 아닌 경우 amount/time을 neutral로 강제 | 기본 상태에서 금액 노출 방지 |
| judgeRef vs fullName 분기 | 없음 | confess에서는 fullName 우선, 단 relation은 judgeRef 유지 (장모님, 제 아내 등) | 자백 시에도 "장모님"은 유지 |

**77건 확장 시 추가 작업**: v2-atoms 데이터에서 S4-S5 atom의 slots에 fullName, rounded, dateExact, role 값이 정확히 존재해야 함. 데이터 수동 검증 필요.

#### (3) `src/engine/llmDialogueResolver.ts` — enforceHonorifics 확장

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `enforceHonorifics()` 반말→존댓말 규칙 | ~13개 | ~54개 (반말 ~27개 + 해요체→합니다체 ~27개) | LLM이 반말/해요체를 자주 생성 |
| "같아서" 패턴 추가 | 미커버 | `같아([.…]*)$` → `같습니다$1` | Thread E 심층 검증에서 0.7% 빈도로 잔존 발견 |
| ~세요→~십시오 | 있었음 | **제거** | 과도하게 딱딱 → 캐릭터성 파괴 |
| ~어때요→~어떨까요 | 없음 | 추가 | 해요체 완화 변환 |
| TODO: emotional/confession 스킵 | 없음 | TODO 주석 추가 (향후 구현) | 감정 폭발/고백에서 해요체가 자연스러울 수 있음 |
| `fixMisdirectedAddress()` | 기본 (네가→상대방이) | partyNames 전달 시 이름 호격 제거 ("세린아,", "지석아,") | Thread E에서 이름직접호칭 WARN 5건 보고 |

**77건 확장 시 추가 작업**: 불필요. 코드 공통.

#### (4) `src/engine/judgeQuestionEngine.ts` — 84종 질문 풀

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| 질문 풀 크기 | 13종 고정 | **84종+** (4 questionType × 4 depth × soft/hard) | 같은 질문 반복 방지 |
| lieState 톤 분화 | dead parameter (미사용) | **soft/hard 분기** — S0-S2: soft, S3+: hard | 진행도에 따라 추궁 강도 변화 |
| depth 순환 선택 | 없음 | depth_0→1→2→3 순환, `resetQuestionRotation()` export | 같은 depth 질문 재사용 방지 |
| `extractDisputeSubject()` | 기본 | 15패턴 스포일러 방지 유지 + fallback "이 문제" | dispute name에서 핵심 진실 제거 |
| evidence_present | 기본 | 12종 확장 | 증거 제시 질문 다양화 |
| `resetQuestionRotation()` | 없음 | `useGameStore.ts` initializeCase에 연결 | 사건 전환 시 질문 순환 초기화 |

**77건 확장 시 추가 작업**: 불필요. 질문은 dispute subject 기반 템플릿이라 사건별 자동 생성.

#### (5) `src/engine/witnessEngine.ts` — 증인 시스템 개편

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `determineTestimonyDepth()` | 없음 (항상 full) | lieState 기반 vague/partial/full 3단계 깊이 결정 | 진실 단계에 맞는 증언 제한 |
| 기관 증인 예외 | 없음 | `witness.slot === 'institutional'` && S2+ → full | 기관 증인은 업무 범위 사실 공개가 자연스러움 |
| 번역체 가드 | 없음 | fallback 프롬프트에 "번역체/보고서 톤 금지" 규칙 추가 | 증인 증언도 번역체 오염 |
| few-shot 예시 주입 | 없음 | `buildWitnessFewShotBlock(slot, depth, 2)` — 4유형 × 3depth = 36예시 | 증인 톤 가이드 |
| hiddenAgenda 패턴 | 없음 | `buildHiddenAgendaPatternBlock()` — 20패턴 | 증인의 숨은 의도 자연스러운 표현 |
| `normalizeWitnessSlot()` | 없음 | slot 문자열을 institutional/colleague/family/friend로 정규화 | few-shot 유형 매칭 |

**77건 확장 시 추가 작업**: 불필요. 코드 공통. 단, 각 사건의 witness.slot이 정확히 지정되어 있어야 함.

#### (6) `src/engine/interjectionV2.ts` — archetype별 끼어들기 대사

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `ARCHETYPE_LINES` | 없음 (고정 대사 4종) | 6 archetype × 4 infoLevel = **24종** 대사 | 캐릭터별 끼어들기 차별화 |
| `ARCHETYPE_HIGH_EMOTION_LINES` | 없음 | emotion 70+ 시 격한 톤 변형 (부분 정의) | 감정 수치에 따른 톤 변화 |
| 9건 대사 교정 | 어색한 톤 | archetype 톤에 맞게 교정 (Thread B M6) | confrontational인데 조심스러운 톤 등 불일치 |

**77건 확장 시 추가 작업**: 불필요. archetype이 6종 중 하나면 자동 적용.

#### (7) `src/engine/llmClient.ts` — 모델 분리

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `MODEL_DIALOGUE` | gpt-4o-mini | **gpt-4o** | NPC 대사 품질 우선 |
| `MODEL_ANALYSIS` | gpt-4o-mini | **gpt-4o-mini** (유지) | 분류/분석은 비용 우선 |

**77건 확장 시 추가 작업**: 불필요.

#### (8) `src/components/result/Aftermath.tsx` + `src/engine/phase6ResultPromptV2.ts` — 후일담

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| 번역체 금지 | **누락** | V2 프롬프트에 번역체 금지 규칙 추가 | Thread E에서 WARN 발견 |
| aReaction/bReaction 활용 | `formatResultAsNarrative()`가 버림 | 프롬프트에 aReaction/bReaction 필드 활용 추가 | 캐릭터별 반응이 후일담에 반영되어야 함 |

**77건 확장 시 추가 작업**: 불필요. 코드 공통.

#### (9) `src/hooks/useActionDispatch.ts` — 모순 추궁 + 시스템 메시지

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| 모순 추궁 | LLM 자유 생성 (불안정) | `buildContradictionQuestion()` 템플릿 15종 즉시 생성 | LLM 호출 비용 절감 + 안정성 |
| `[모순 추궁 맥락]` | 플레이어에게 노출 | `isHidden: true` 처리 | 내부 컨텍스트가 플레이어에게 보임 방지 |

**77건 확장 시 추가 작업**: 불필요.

#### (10) `src/engine/freeQuestionV2.ts` — 자유 질문 톤

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| archetype 톤 | 0% 차별화 | `pickTonePattern()` + 6 archetype × 5 angleTag = **180패턴** | 자유 질문 응답도 캐릭터성 반영 |
| 호출부 archetype 전달 | 미연결 (fallback 동작) | **미완 — 향후 연결 필요** | freeQuestionV2 호출부에서 archetype 전달하면 180패턴 활성화 |

**77건 확장 시 추가 작업**: freeQuestionV2 호출부에서 archetype 전달 연결 (기능은 정상 동작하나 최적화 미완).

#### (11) `server/db/seed.js` — WebAdmin 기본값

| 변경 항목 | Before | After | 이유 |
|-----------|--------|-------|------|
| `llm_model` | 미정의 또는 gpt-4o-mini | **gpt-4o** | 대사 생성 모델 통일 |
| `llm_temperature` | 0.85 | **1.0** | 다양성 확보 (gpt-4o에서 더 효과적) |
| `llm_max_tokens` | 250 | **400** | 충분한 대사 길이 확보 |

**77건 확장 시 추가 작업**: 불필요.

#### (12) `src/api/promptManager.ts` + `src/api/agentManager.ts` + 기타 10곳 — 파라미터 통일

| 변경 항목 | Before | After |
|-----------|--------|-------|
| temperature | 0.85 (곳에 따라 다름) | **1.0** (대사 생성 전체) |
| maxTokens | 250 | **400** |
| 반박 대사 temperature | 미명시 | **1.0** |

**77건 확장 시 추가 작업**: 불필요.

---

### 1-2. 데이터 변경

#### (1) v2-atoms 교정 (7건)

**교정 대상**: 7건 × 각 사건의 전체 atom (320건+)

| 교정 항목 | 기준 | 예시 |
|-----------|------|------|
| S0-S1 slots neutral화 | fullName → 성씨만, exact → neutral, role → 제거 | `fullName: "최민정"` → `neutral: "그 사람"` |
| S2 slots 완화 | 기관명 제거, 대략적 수준만 | `exact: "재가돌봄센터"` → `neutral: "기관"` |
| S3+ 원본 보존 확인 | fullName, rounded, dateExact 등 구체적 값 유지 | `rounded: "280만원"` 보존 |
| `fallbackPublicClaim` ↔ slots 동기화 | fallbackPublicClaim의 추상화 수준이 해당 state의 slot 수준과 일치 | S1 atom의 fallbackPublicClaim에 기관명이 들어가면 안 됨 |
| amount.rounded 자연어 형식 | "2,800,000원" → "280만원" | 자연어 금액 표기 |

**77건 확장 시**: 77건 전체에 동일 교정 필요. **Thread B + GPT Pro 배치**.

#### (2) evidence surfaceName/surfaceDescription 교정

| 항목 | 규모 | 기준 |
|------|------|------|
| surfaceName 6건 교정 | 7건 중 6건에서 발견 | 기관명/서비스명이 surfaceName에 포함 → 중립 표현으로 교체 |
| surfaceDescription 46건 교정 | 168건 검수 → 46건 | 스포일러 표현/번역체/톤 교정 (Thread B M5) |

**교정 기준**:
- surfaceName에 기관명/서비스명/직함 포함 금지 → "이체 내역", "통화 기록" 등 중립 표현
- surfaceDescription에 핵심 진실 포함 금지
- 번역체 표현 교정
- 7건 case JSON: spouse-01(7건), family-01(10건), friend-01(9건), neighbor-01(2건), partnership-01(6건), tenant-01(5건), workplace-01(7건)

**77건 확장 시**: 77건 전체 evidence 검수/교정 필요. **GPT Pro 배치 규칙에 포함**.

#### (3) DossierCard 교정 (24건)

| 파일 | 교정 건수 | 내용 |
|------|----------|------|
| friend-01 v3-game-loop-data | 18건 (전면 재작성) | q1/q2/q3 질문과 scriptedResponse 전체 |
| spouse-01 v3-game-loop-data | 1건 | 금액 패턴 수정 |
| workplace-01 v3-game-loop-data | 2건 | 톤 교정 |
| partnership-01 v3-game-loop-data | 3건 | 톤 교정 |

**교정 기준**:
- q1=hint, q2=partial, q3=full (고정) truthLevel 준수
- requiredLieState 적절성 (q2=S2, q3=S3)
- 금지어 미포함
- 자연스러운 한국어

**77건 확장 시**: 77건 전체 DossierCard 검수/생성 필요. **GPT Pro 세션 E**.

#### (4) Phase 1/2 스크립트 교정 (14파일)

**대상**: `src/data/dialogues/phase1/{case}-01.json` × 7 + `src/data/dialogues/phase2/{case}-01.json` × 7 = 14파일

**교정 기준**:
- anchorTruth 키워드 미포함 (스포일러 금지)
- 합니다체 (재판관 대상)
- 당사자 간 반말 유지
- 호칭 일관성 (재판관에게 "제 남편/아내", 상대에게 "자기/오빠")
- 맥락 자연스러움

**77건 확장 시**: 77건 × 2 = 154파일 교정 필요. **Thread D**.

#### (5) investigationStages (7건, 42개 증거 × 3단계)

**구조**: 각 증거마다 stage 0/1/2 질문 → 총 7건 × ~6 증거 × 3 = ~126개 질문

| stage | truthLevel | 질문 성격 |
|-------|-----------|----------|
| stage 0 | none~hint | 표면 확인 — "이 서류가 뭔지 알고 계셨습니까?" → **경미한 압박 포함** ("설명하십시오" 지향) |
| stage 1 | hint~partial | 중간 추궁 — 맥락 연결 |
| stage 2 | partial~full | 핵심 추궁 — 결정적 질문 |

**77건 확장 시**: 77건 전체 생성 필요. **Thread A + GPT Pro 세션 B**.

#### (6) structure-v2 통합 (84건)

**교정 대상**: 84건의 `structure-v2.json` 내 red_herring, misconception 등

| 필드 | 교정 내용 |
|------|----------|
| red_herring | 사건별 red herring 질문과 NPC 반응 검증 |
| misconception | 오해 유발 패턴 검증 |
| emotional_triggers | 감정 트리거 적절성 |

**77건 확장 시**: 77건 전체 검증 필요.

---

### 1-3. 테스트 인프라 변경

#### (1) 범용 러너

| 파일 | 내용 |
|------|------|
| `tests/full-playthrough-v2.cjs` | 전체 플레이스루 러너 — ARCHETYPE/TELL/FOCUS/few-shot/S5 slot 승격 모두 반영 |
| `tests/scenarios/*.cjs` (7건) | 사건별 시나리오 (20턴 구성) |
| `tests/run-playthrough.cjs` | 실행 진입점 |

#### (2) 모델 변경

- 7건 모든 플레이스루: **gpt-4o**로 변경
- temperature: **1.0**
- maxTokens: **400**

#### (3) 딜레이

- API 호출 간 **5초 딜레이** (rate limit 방지)

#### (4) 신규 파일

| 파일 | 내용 |
|------|------|
| `src/data/witnessFewShotExamples.ts` | 증인 few-shot 36예시 + hiddenAgenda 20패턴 |
| `src/data/freeQuestionTonePatterns.json` | 자유 질문 archetype 톤 패턴 180개 |

---

### 1-4. 프롬프트 변경 전체 목록

#### ARCHETYPE_GUIDE 6종

```
avoidant:
  [trait] 직접 부정 대신 화제 전환, 순서/절차를 앞세움. 곤란하면 말이 길어짐
  [tone] 조심스럽고 우회적. 핵심을 빙 돌려 말함
  [rhythm] "그 부분은..." "순서가 있어서..." 처럼 조건절을 먼저 깔고 뒤에서 흐림
  [example] "그 부분은 순서가 있어서, 지금 당장은 말씀드리기 어렵습니다."
  [avoid] 단도직입적 부정("아닙니다"), 짧은 한 문장 답변

confrontational:
  [trait] 짧고 날카롭게. 방어보다 역공. 인정할 때도 주도권을 놓지 않으려 함
  [tone] 도발적이고 자신 있음. 상대방의 약점을 찌름
  [rhythm] 짧은 문장, 끊어 말하기. "그래요. 그런데—" 식의 전환
  [example] "제가 본 건 그게 전부입니다. 오히려 상대방이 왜 그랬는지를 물으셔야 하지 않습니까."
  [avoid] 길게 설명하기, "좀", "뭐" 등 약한 표현, 수동적 톤

victim_cosplay:
  [trait] 자기 상처/억울함으로 수렴. "왜 나만"으로 시작. 공감에 가장 쉽게 열림
  [tone] 억울하고 지친 느낌. 한숨 섞인 말투
  [rhythm] "저는요..." "제가 뭘 잘못했다고..." 식의 자기 중심 시작
  [example] "저만 이런 취급을 받는 게 이해가 안 됩니다. 저도 나름 사정이 있었습니다."
  [avoid] 논리적 반박, 공격적 역공, 감정 없는 사실 나열

cold_logic:
  [trait] 감정 대신 기준/순서/금액을 앞세움. 인정도 범위를 정밀하게 자름
  [tone] 차갑고 사무적. 감정을 최대한 배제
  [rhythm] "첫째, ~입니다. 둘째, ~입니다." 식의 구조화된 말하기
  [example] "사실관계를 정리하면, 해당 금액은 제가 보낸 것이 맞습니다. 다만 용도는 다릅니다."
  [avoid] 감정 표현, "미안합니다" 식의 감성적 말, 두루뭉술한 표현

affect_flattening:
  [trait] 감정을 극도로 억제. 사실만 건조하게 말함. 위기에도 톤이 변하지 않음
  [tone] 무표정, 단조로움. 읽는 사람이 답답할 정도로 감정이 없음
  [rhythm] 짧고 건조한 문장. 부연 설명을 극도로 절제
  [example] "네, 그렇게 했습니다." / "그 부분은 제가 처리했습니다."
  [avoid] 감탄사, 길게 설명, 감정 토로

premature_summary:
  [trait] 핵심이 아니라고 화제를 전환하거나 조기 마무리하려 함
  [tone] "그건 별로 중요하지 않고..." 식의 가볍게 넘기려는 느낌
  [rhythm] 먼저 축소("그건 사소한 거고") → 다른 이야기로 전환
  [example] "그 부분은 전체 맥락에서 보면 큰 의미가 없습니다. 오히려 중요한 건—"
  [avoid] 핵심을 직접 다루기, 감정적 반응
```

#### TELL_HINTS 6종

```
over_precision: 숫자가 지나치게 정밀해지는 버릇
  [동작] 시각, 날짜, 순서를 분 단위/일 단위로 정밀하게 말한다. 감정을 숫자 뒤에 숨긴다.
  [예시] "14시 03분에 제 폰에서 나간 건 맞습니다", "9월 20일 그날 저녁 물류 마감이 끝나고"
  [발현] 사실을 인정하거나 변명할 때 자연스럽게 시각/순서를 먼저 꺼낸다
  빈도: 3~4턴에 1회만

counter_question: 궁지에 몰리면 되묻는 버릇
  [동작] 답변 끝에 상대의 행동에 대한 반문을 붙인다.
  [예시] "그보다, 왜 그걸 새벽에 확인했는지가 먼저 아닙니까?"
  [발현] 방어적일 때, 특히 blame 스탠스에서
  빈도: 3~4턴에 1회만

timeline_padding: 동선을 나열하며 시간을 버는 버릇
  [동작] 질문의 핵심을 피해 그날의 동선/일정을 장황하게 늘어놓는다.
  [예시] "그날 저녁에 물류 마감 끝내고, 퇴근 후 카페에 들렀다가..."
  [발현] 핵심을 회피할 때, hedge나 deny에서
  빈도: 3~4턴에 1회만

evidence_waving: 증거 하나로 결론을 단정짓는 버릇
  [동작] 가진 단서를 들이밀며 "이게 전부다"라고 단정한다.
  [예시] "이 캡처 하나면 충분하지 않습니까?"
  [발현] 증거를 언급할 때, 특히 confrontational에서
  빈도: 3~4턴에 1회만

motive_jump: 행동에서 의도를 곧바로 단정하는 버릇
  [동작] 상대의 행동 하나에서 바로 나쁜 의도를 읽어낸다.
  [예시] "그렇게 숨긴 건 결국 뒤가 있으니까 그런 거 아닙니까"
  [발현] blame에서 상대 공격 시
  빈도: 3~4턴에 1회만

selective_quote: 상대 말에서 약한 고리만 반복하는 버릇
  [동작] 상대가 한 말 중 가장 약한 부분만 골라서 반복 인용한다.
  [예시] "'순서가 있다'고 했는데, 그 순서라는 게 뭡니까?"
  [발현] 상대의 이전 발언을 공격할 때
  빈도: 3~4턴에 1회만
```

#### ANSWER_FOCUS 4종

```
fact_pursuit:
  [content] 사실 여부에만 답하라. "했다/안 했다"를 먼저 말하라.
  [tone] 단호하거나 긴장된 톤
  [rhythm] "네, ~했습니다. 다만—" 또는 "아닙니다. 그건—"
  [example] "그날 송금한 건 맞습니다. 다만 그게 어디로 간 건지는 순서가 있습니다."

motive_search:
  [content] 왜 그랬는지, 판단의 배경을 말하라.
  [tone] 변명하거나 설명하는 톤. 약간의 방어적 뉘앙스
  [rhythm] "~때문이었습니다" 또는 "~할 수밖에 없었습니다"
  [example] "집안에 급한 일이 생겼기 때문입니다. 먼저 말하지 못한 건 제 잘못이지만."

empathy_approach:
  [content] 당시 심정을 말하라. 논리가 아닌 감정을 먼저 드러내라.
  [tone] 솔직하고 취약한 톤. 방어를 약간 내려놓은 느낌
  [rhythm] "솔직히..." "사실은..."
  [example] "그때는 무서웠습니다. 제가 말하면 더 큰일이 날 것 같아서."

evidence_present:
  [content] 제시된 증거에 대한 입장을 말하라.
  [tone] 당황/방어/침착 반박 (캐릭터에 따라)
  [rhythm] "그 자료는... ~입니다" 또는 "그걸 보면 오히려—"
  [example] "그 내역서는 맞습니다. 다만 수취인이 누군지까지 그걸로 단정할 순 없습니다."
```

#### few-shot 5쌍

| lieState/stance | 좋은 답 | 나쁜 답 특징 |
|-----------------|--------|-------------|
| deny/S1 회피형 | "적지 않은 돈이 움직인 건 맞습니다. 그런데 그 숫자만 보고 다른 뜻부터 붙이는 건 순서가 아닙니다." | "사전 상의가 일부 누락된..." |
| hedge/S2 | "집안에 급한 일이 생겨 먼저 움직였습니다. 설명을 늦춘 건 제 잘못이지만, 성격이 다른 돈입니다." | "여러 가지 상황이 얽혀..." |
| blame/S3 | "제가 늦었습니다. 그렇다고 남의 폰을 열고 외도부터 만든 순서까지 사라지진 않습니다." | "그런 상황에서 가족 쪽에 급한 일이..." |
| emotional/S4 | "처가 쪽 돈 앞에서 쩔쩔매는 꼴을 보이기 싫었습니다. 가장이 숫자 앞에서 작아지는 건..." | "가족의 문제로 마음이 매우 불안했습니다..." |
| confess/S5 | "280만원은 오미숙 장모님 추석 연휴 간병 예약금이었습니다. 재가돌봄센터 상담팀장 최민정 씨에게..." | "그 약속을 위반한 사실을 인정합니다. 상당한 금액을..." |

#### 번역체 금지 9패턴

```
"~된 것으로 생각됩니다" → 직접 말하라
"~인 측면이 있었습니다" → "~한 점은 있습니다"
"여러 가지 상황이 얽혀" → 구체적 상황 1가지만
"관련 사항을 간과하게 된" → "놓쳤습니다"
"부득이하게" → "어쩔 수 없이" 또는 "급해서"
"해당 건에 대해서는" → "그 일은"
"~하는 바입니다" → 금지
"인지하고 있습니다" → "알고 있습니다"
"~에 기인합니다" → "~ 때문입니다"
```
+ 3중 수식 금지 ("~의 ~에 대한 ~으로")
+ "사전 상의가 누락된" → "미리 말하지 못한", "상의 없이", "혼자 결정한", "알리지 않고"

#### 사과 클리셰 차단

금지: "미리 말씀드리지 못한"
변형 리스트 7종:
```
"못 알렸습니다" / "혼자 결정했습니다" / "숨긴 건 제 잘못입니다"
"입을 닫고 있었습니다" / "상의 없이 처리했습니다"
"알리지 않고 진행했습니다" / "말을 꺼내지 못했습니다"
```
규칙: 같은 사과 표현 2턴 연속 금지

#### 금전 무관 사건 동적 가드

disputes에 금전 키워드(`송금|이체|금액|원|돈|비용|계좌|환급|보증금|월세|정산|예치|납부|수당|급여`)가 없으면 자동 삽입:
```
"이 사건에는 금전 송금/이체가 포함되지 않는다. 금전 관련 표현 절대 사용 금지."
```
**이유**: workplace-01(성과 가로채기)에서 "돈을 송금한 건 맞습니다" hallucination 발생.

#### S5 자백 강화 (TRUTH_THROTTLE.open)

```
★ 이제 진실을 모두 털어놓아라 — 이 턴이 가장 중요하다:
- 표현 재료+비공개 지식의 구체적 정보를 반드시 사용
- 금액: 정확한 숫자, 인물: 이름, 기관: 정식 명칭
- 최소 구성: [구체적 사실 1문장] + [왜 숨겼는지 1문장] + [심정 1문장]
- 감정 예시: 두려움/후회/체면/체념
- 금지: "인정합니다" 종결, "감수하겠습니다", "이로 인해", "해당 금액"
```

#### 반복 표현 금지

| 표현 | 규칙 |
|------|------|
| "상당한 금액" | 전체 대화 최대 1회 |
| "사전 상의/협의" | 완전 금지 |
| 같은 단어/구 | 2턴 연속 등장 금지 |
| "여러 가지", "급한 일", "사실입니다" | 연속 사용 금지 |

#### 금액/시각 분리

| 항목 | S0-S3 | S4-S5 |
|------|-------|-------|
| 금액 | 숨김 ("적지 않은 돈", "큰돈") | 자연어 허용 ("280만원") |
| 시각/날짜 | **허용** ("14시 03분", "9월 20일") | 모두 허용 |

#### 긍정 규칙 5개

1. 캐릭터의 감정 색깔을 드러내라 (짜증, 두려움, 억울함, 한심함 등)
2. 한 턴에 최소 1개의 구체적 디테일 (시간대, 장소, 행동, 상황)
3. "두루뭉술하게 여러 가지"라 하지 말고 딱 1가지를 구체적으로
4. 이전 턴과 겹치는 표현 금지
5. 첫 문장은 질문에 대한 직접적 반응

#### tell 위치

**반드시 `## 캐릭터` 섹션 내, archetype + speechStyle 바로 뒤에 배치.**
하단(절대 규칙 근처)에 넣으면 LLM이 무시한다.

---

### 1-5. 확정된 설계 결정 전체

| # | 결정 | 내용 | 근거 |
|---|------|------|------|
| 1 | **Truth Throttle 매핑** | S0/S1→none(early), S2→hint, S3→partial(blame), S4/S5→full(open) | 4단계 세분화로 자연스러운 진실 공개 곡선 |
| 2 | **S2 partial 불가** | hedge + alternatives로 커버. 테스트 후 재논의 가능 | S2에서 partial이 열리면 긴장감 소실 |
| 3 | **DossierCard q3 = full** | 고정. q1=hint, q2=partial, q3=full | 카드의 마지막 질문이 결정적 돌파구 역할 |
| 4 | **기관 증인 partial 예외** | `witness.slot === 'institutional'` && S2+ → full depth 허용 | 기관 증인은 업무 범위 사실 공개가 자연스러움 |
| 5 | **V3 금액 숨김** | none/hint에서 구체 금액 금지. over_precision은 시각/절차 정밀로 대체 | 금액이 핵심 비밀인 사건이 많음 |
| 6 | **해요체 정책** | 기본 합니다체. emotional/confession beatType만 해요체 예외 허용 | 방어 무너지며 말투 흐트러짐 = 심리 변화 체감 장치 |
| 7 | **모델 분리** | gpt-4o (대사) / gpt-4o-mini (분석) | 품질 우선 vs 비용 우선 |
| 8 | **금액 표기** | "280만원" 자연어 형식. "2,800,000원" 금지 | 사람이 말하는 형식 |
| 9 | **tell 빈도** | 3-4턴에 1회. 넣지 않는 턴이 더 많아야 자연스러움 | 매 턴 넣으면 역효과 |
| 10 | **반말 규칙** | 당사자 간 반말 유지. 재판관에게만 합니다체 필수 | 부부/친구 간 반말은 자연스러움 |
| 11 | **temperature 1.0** | gpt-4o에서 다양성 확보 | gpt-4o-mini 대비 높은 temperature에서 더 좋은 결과 |
| 12 | **maxTokens 400** | 충분한 대사 길이 | 250은 너무 짧아 잘림 발생 |

---

## Part 2: 77건 확장 시 해야 할 것

---

### 2-1. 자동으로 적용되는 것 (코드 공통, 추가 작업 불필요)

| 항목 | 적용 위치 | 설명 |
|------|----------|------|
| 프롬프트 개편 전체 | blueprintPromptBuilderV2.ts | ARCHETYPE 6종, TELL 6종, FOCUS 4종, few-shot 5쌍, 번역체 금지 9패턴, 사과 클리셰 차단, 긍정 규칙 5개, 반복 금지, 금액/시각 분리 |
| S5 slot 승격 | atomSelectionEngine.ts | confess 시 neutral→concrete 자동 승격 |
| enforceHonorifics | llmDialogueResolver.ts | ~54개 반말/해요체→합니다체 규칙 |
| fixMisdirectedAddress | llmDialogueResolver.ts | 이름 호격 제거, 네가→상대방이 |
| 끼어들기 archetype별 변형 | interjectionV2.ts | 6 archetype × 4 infoLevel + 고감정 변형 |
| 증인 번역체 가드 | witnessEngine.ts | fallback 프롬프트 + 에이전트 블록 |
| 기관 증인 예외 | witnessEngine.ts | institutional → S2부터 full |
| 증인 few-shot | witnessFewShotExamples.ts | 36예시 + hiddenAgenda 20패턴 |
| 모델 분리 + 파라미터 | llmClient.ts + 10곳 | gpt-4o/gpt-4o-mini, temp 1.0, max 400 |
| 재판관 질문 84종 | judgeQuestionEngine.ts | 4 type × 4 depth × soft/hard |
| 모순 추궁 15종 | useActionDispatch.ts | 템플릿 즉시 생성 |
| 자유 질문 180 톤 | freeQuestionV2.ts | 6 archetype × 5 angleTag |
| 후일담 번역체 금지 | Aftermath.tsx + phase6ResultPromptV2.ts | V2 프롬프트에 규칙 포함 |
| 금전 무관 가드 | blueprintPromptBuilderV2.ts | disputes 기반 자동 감지 |
| Truth Throttle 4단계 | blueprintPromptBuilderV2.ts | early/hint/blame/open |
| privateKnowledge 게이팅 | blueprintPromptBuilderV2.ts | S0-S2:1개, S3:2개, S4+:전체 |

---

### 2-2. 사건별 수동 작업이 필요한 것

#### (1) v2-atoms S0-S2 neutral화 (77건)

- **담당**: GPT Pro (구조 검증) + Claude Code (톤 검수)
- **기준**: S0-S1 atom의 slots에서 fullName→성씨만/neutral, exact→neutral, role/institution→제거. S2는 성씨/rounded 수준까지만.
- **검증**: 각 atom의 `unlockedAtState` 기준으로 해당 state 규칙 적용. S3+ 원본이 보존되었는지 반드시 확인.
- **관련 결정**: 결정1 (Truth Throttle 매핑)

#### (2) v2-atoms fallbackPublicClaim ↔ slots 동기화 (77건)

- **담당**: GPT Pro (세션 A — 전수 검증)
- **기준**: fallbackPublicClaim의 추상화 수준이 해당 atom의 slots 수준과 일치해야 함. S1 atom의 fallbackPublicClaim에 기관명 포함 시 위반.
- **검증**: `fallbackPublicClaim` 텍스트 내 금지어 grep + slots neutral/rounded/fullName 수준 비교.
- **산출물**: 사건별 위반 목록 + 교정안

#### (3) evidence surfaceName/surfaceDescription 안전성 교정 (77건)

- **담당**: GPT Pro (구조) + Claude Code (톤)
- **기준**: surfaceName에 기관명/서비스명/직함 미포함. surfaceDescription에 핵심 진실 미포함. 번역체 제거.
- **검증**: 사건별 anchorTruth 키워드 추출 → surfaceName/surfaceDescription에서 검색
- **참고**: Stage-1에서 168건 검수 → 46건 교정 (약 27% 교정률)

#### (4) evidence requiredLieState 적절성 확인 (77건)

- **담당**: Thread A
- **기준**: 핵심 증거가 너무 일찍(S0-S1) 등장하지 않는지. investigationStages stage 0 → stage 1 → stage 2 로 정보량 증가.
- **검증**: requiredLieState가 없는 증거는 처음부터 표시됨. 핵심 증거에는 S2+ 게이팅 필요.

#### (5) investigationStages 77건 생성 (증거당 3단계 질문)

- **담당**: Thread A + GPT Pro (세션 B)
- **기준**: stage 0=표면(none~hint), stage 1=중간(hint~partial), stage 2=핵심(partial~full). revealKey 순서 준수.
- **검증**: stage3-verification-spec.md 규칙 5 기준. stage(N).truthLevel >= stage(N-1).truthLevel.
- **추가 규칙**: Stage 0에 경미한 압박 포함 ("알고 계셨습니까?" 지양 → "설명하십시오" 지향), "특정 X" 패턴 금지.
- **산출물**: 사건당 investigationStages 배열

#### (6) Phase 1/2 스크립트 교정 (77건 × 2 = 154파일)

- **담당**: Thread D
- **기준**: anchorTruth 키워드 미포함, 합니다체(재판관 대상), 당사자 간 반말 유지, 호칭 일관성, 맥락 자연스러움
- **검증**: 사건별 금지어 목록 × grep + 해요체 패턴 grep + 수동 읽기
- **참고**: Stage-1에서 14파일 교정 완료

#### (7) DossierCard 질문 텍스트 검증/교정 (77건)

- **담당**: GPT Pro (세션 E — 구조) + Claude Code (톤)
- **기준**: q1=hint, q2=partial, q3=full. requiredLieState 적절성 (q2=S2, q3=S3). 금지어 미포함. 자연스러운 한국어.
- **검증**: stage3-verification-spec.md 규칙 3 기준
- **참고**: Stage-1에서 126건 검수 → 24건 교정 (약 19% 교정률)

#### (8) structure-v2 red_herring/misconception 검증 (77건)

- **담당**: GPT Pro
- **기준**: red_herring이 게임 진행에 적절한 미끼 역할. misconception이 자연스러운 오해 유발. emotional_triggers가 캐릭터 archetype과 일치.
- **검증**: 사건 데이터와 교차 확인

---

### 2-3. GPT Pro 배치 프롬프트에 반영할 규칙 7건

| # | 규칙 | 출처 | 상세 |
|---|------|------|------|
| 1 | **fallbackPublicClaim ↔ slots 동기화** | Stage-1 Thread B | fallbackPublicClaim의 추상화 수준이 해당 atom의 slots 수준과 반드시 일치해야 함. S1 atom에 기관명 포함 시 위반. |
| 2 | **증거 질문 revealKey 순서 준수** | Stage-1 Thread A | investigationStages의 stage 0→1→2에서 revealKey가 점진적으로 핵심에 접근해야 함. |
| 3 | **surfaceDescription 안전성** | Stage-1 Thread B M5 | surfaceDescription에 핵심 진실/기관명/서비스명/직함 포함 금지. |
| 4 | **name/description 필드 안전성** | Stage-1 Thread B M5 | evidence의 name/description 필드에 스포일러 소재 포함 금지. |
| 5 | **"특정 X" 패턴 금지** | Thread E 심층 검증 | "특정 기관에 두 차례 전화" → "이체 전후 두 차례 전화 기록". 구체적이되 스포일러 없는 표현. |
| 6 | **Stage 0 질문에 경미한 압박 포함** | Thread E 심층 검증 | "~의 존재를 알고 계셨습니까?" 지양 → "~에 대해 설명하십시오" 지향. 수동 표현 지양. |
| 7 | **후일담 번역체 금지 명시** | Thread E 심층 검증 | 배치 프롬프트에 "~된 것으로 판단됩니다", "~인 측면이 있었습니다" 등 명시적 금지 규칙 포함. |

---

### 2-4. 77건 확장 시 검증 체크리스트

#### 데이터 품질

- [ ] v2-atoms S0-S1 slots가 neutral인지 (fullName/exact/role/institution 제거 확인)
- [ ] v2-atoms S2 slots가 성씨/rounded 수준까지인지
- [ ] v2-atoms S3+ slots에 fullName, rounded, dateExact, role이 보존되어 있는지
- [ ] v2-atoms fallbackPublicClaim이 해당 state의 slots 추상화 수준을 따르는지
- [ ] amount.rounded가 자연어 형식("280만원")인지 ("2,800,000원" 아닌지)
- [ ] 각 캐릭터의 archetype이 6종(avoidant/confrontational/victim_cosplay/cold_logic/affect_flattening/premature_summary) 중 하나인지
- [ ] 각 캐릭터의 verbalTells[0].type이 TELL_HINTS 6종(over_precision/counter_question/timeline_padding/evidence_waving/motive_jump/selective_quote) 중 하나인지
- [ ] evidence surfaceName에 기관명/서비스명/직함 미포함
- [ ] evidence surfaceDescription에 핵심 진실 미포함
- [ ] evidence requiredLieState가 적절한지 (핵심 증거는 S2+)
- [ ] investigationStages 3단계 완전성 (stage 0/1/2 존재)
- [ ] investigationStages 질문에 "특정 X" 패턴 미포함
- [ ] investigationStages stage 0 질문에 경미한 압박 포함
- [ ] Phase 1/2 스크립트에 anchorTruth 키워드 미포함
- [ ] Phase 1/2 스크립트 합니다체 (재판관 대상)
- [ ] DossierCard q1=hint, q2=partial, q3=full
- [ ] DossierCard requiredLieState 적절성 (q2=S2, q3=S3)
- [ ] structure-v2 red_herring/misconception 적절성
- [ ] witness.slot 값 정확성

#### 프롬프트 품질

- [ ] ARCHETYPE_GUIDE에 해당 archetype이 정의되어 있는지
- [ ] TELL_HINTS에 해당 tell이 정의되어 있는지
- [ ] few-shot 예시가 해당 사건 카테고리에 적합한지 (범용이므로 보통 OK)

#### 결과 검증

- [ ] 번역체 0건
- [ ] "사전 상의/협의" 0건
- [ ] tell 발현 빈도 15-25% (3-4턴에 1회)
- [ ] S5에서 구체적 진실 (금액+인물+기관+목적) 포함
- [ ] "상당한 금액" 최대 1회
- [ ] 같은 표현 2턴 연속 없음
- [ ] 해요체 잔존 0건 (emotional/confession 예외)
- [ ] 금지어(사건별 anchorTruth 기반) 0건
- [ ] 금액 패턴(S0-S2) 0건
- [ ] "미리 말씀드리지 못한" 0건
- [ ] hallucination 0건

---

## Part 3: 84건 스크립트 대체 (V3) 로드맵

---

### 3-1. 현재 V3 상태

- **spouse-01 파일럿만 완료**:
  - BeatScriptV3: 55개 beat
  - scriptedResponse: 18개 (DossierCard q1~q3 × 6 dispute)
  - scriptedTestimonies: 12개 (4 증인 × vague/partial/full)
- **타입 정의 완료**: TruthLevel, BeatScriptV3, 관련 타입
- **검증 완료**: stage3-verification-spec.md 기준 237항목 전부 PASS (수정 전 15건 위반 → 수정 후 0건)
- **엔진 연결 미착수**: Thread C 보류 중 (CT의 보류 지시)

---

### 3-2. V3 전환 순서

```
1. LLM 고도화 완료 확인 ← 현재 여기 (7건 PASS)
2. 77건 확장 (Part 2 작업) ← 다음 단계
3. V3 엔진 연결 (Thread C)
   - BeatScriptV3 로더
   - scriptedResponse 매칭
   - scriptedTestimonies 연결
4. spouse-01 LLM 0건 플레이스루 검증
   - V3 beat 우선 → LLM fallback 없이 동작 확인
5. 83건 V3 스크립트 GPT 배치 (사건당 6세션)
   - GPT Pro 세션 D
6. 단계적 전환
   - V3 beat가 있으면 V3 우선
   - 없으면 LLM fallback (현재 시스템)
```

---

### 3-3. V3 배치 시 적용할 기준

| 기준 | 상세 | 근거 |
|------|------|------|
| **해요체 정책** | emotional/confession beat만 해요체, 나머지(deny/hedge/partial/blame/evidence_hit)는 합니다체 교정 | 결정6 |
| **Truth Throttle ↔ applicableStates** | applicableStates의 최저 state가 truthLevel 상한 결정. S0/S1 포함→none만, S2→hint까지, S3→partial까지, S4/S5→full | 결정1, stage3-verification-spec.md 규칙1 |
| **금액 숨김** | none/hint에서 구체 금액 금지. `[\d,]+원`, `\d+만\s*원` 패턴 검출 시 FAIL | 결정5 |
| **tell 반영** | V3 beat에 tell을 직접 녹여야 함 (캐릭터의 말버릇이 대사에 포함) | TELL_HINTS |
| **금액 표기** | "280만원" 자연어 형식. "2,800,000원" 금지 | 결정8 |
| **DossierCard q3 = full** | 고정 | 결정3 |
| **S2 partial 불가** | V3에서도 S2 포함 beat의 truthLevel은 hint까지만 | 결정2 |
| **기관 증인 partial 예외** | 기관 증인은 partial에서 자기 업무 범위 사실 일부 공개 가능 | 결정4 |
| **번역체 금지** | beat 대사에서 번역체 9패턴 + "사전 상의" 금지 | 프롬프트 규칙 |
| **alternatives 차별성** | 원본 line과 alternatives가 의미적으로 충분히 달라야 함 | 다양성 확보 |

---

## Part 4: 품질 검증 기준 (모든 확장에 적용)

---

### 4-1. 자동 검증 (기계적)

| # | 항목 | 패턴 | 방법 |
|---|------|------|------|
| 1 | 번역체 6패턴 | `된 것으로`, `인 측면이`, `여러 가지.*얽혀`, `간과하게 된`, `하는 바입니다`, `에 기인` | grep |
| 2 | 해요체 패턴 | `에요\|해요\|거예요\|했어요\|있어요\|같아요\|됐어요\|없어요` (emotional/confession 예외 허용) | grep |
| 3 | 금지어 | 사건별 anchorTruth에서 추출 (기관명/인물직함/서비스명/정확한금액) → truthLevel별 대조 | 사건별 grep |
| 4 | 금액 패턴 | S0-S2 응답에서 `[\d,]+원`, `\d+만\s*원` 검출 | grep |
| 5 | "사전 상의" | `사전.*상의\|사전.*협의` | grep — 0건 필수 |
| 6 | "미리 말씀드리지 못한" | 정확한 문자열 | grep — 0건 필수 |
| 7 | 반말 종결 | `~야\?`, `~지\?`, `~거야\?`, `~궁금해`, `~같아$` (재판관 대상 발화) | grep |
| 8 | 금지어 "상당한 금액" | 전체 대화에서 2회 이상 | count |
| 9 | factText 노출 | 시스템 메시지에 `result.revealedAtom.factText` 원문 포함 | grep (DossierCardPanel 수정 확인) |

### 4-2. 수동 검증 (에이전트/사람)

| # | 항목 | 기준 | 방법 |
|---|------|------|------|
| 1 | **내용 정확성** | hallucination 0건. 사건 데이터에 없는 사실을 LLM이 생성하면 FAIL | 사건 JSON 대조 |
| 2 | **맥락 일관성** | 이전 턴과 모순 없음. 같은 NPC가 S1에서 부정한 것을 S2에서 자연스럽지 않게 인정하면 WARN | 턴 시퀀스 읽기 |
| 3 | **구조적 스포일러** | Truth Throttle을 실제로 준수하는지. S1에서 "기관명"을 슬쩍 언급하면 CRITICAL | lieState별 금지어 대조 |
| 4 | **캐릭터 차별화** | avoidant와 confrontational이 구분 가능한지. tell이 반영되는지 | 연속 읽기 비교 |
| 5 | **감정 자연스러움** | lieState 전이에 따라 감정이 자연스럽게 변하는지. S0 무표정→S3 방어적→S5 무너짐 | 감정 곡선 확인 |
| 6 | **S5 구체 진실** | 금액+인물+기관+목적 모두 포함 | S5 응답 직접 확인 |
| 7 | **tell 발현 빈도** | 15-25% (20턴 중 3-5턴) | 카운트 |
| 8 | **호칭 일관성** | 재판관에게 "제 남편이~", 상대에게 "자기야" | 전체 읽기 |
| 9 | **정보량 적절성** | 너무 많이(스포일러)/너무 적게(의미없는 답) | 주관적 판단 |

### 4-3. 심층 검증 (3회 반복)

Stage-1에서 확립된 심층 검증 프로토콜 (Thread E 방식):

| # | 항목 | 기준 |
|---|------|------|
| 1 | **3회 간 일관성** | 같은 시나리오 3회 실행 시 PASS/FAIL 결과가 일관적인지 |
| 2 | **비결정적 WARN 빈도** | WARN이 특정 턴/상황에서만 발생하는지, 무작위인지 분류 |
| 3 | **전 채널 검증** | 심문(NPC 대사), 증거(질문/답), 카드(q1~q3 scriptedResponse), 재판관 질문, 증인(vague/partial/full), 시스템 메시지, 후일담 — 7개 영역 전부 |
| 4 | **진실 공개 타임라인** | 11개 채널(Phase1/2→surfaceName→NPC S0-S1→...→confession)에서 의도치 않은 조기 노출 없는지 |
| 5 | **V3 vs LLM 일관성** | (spouse-01 한정) V3 beat 대사와 LLM 대사가 모순 없는지 |

**달성 수준 참고** (Stage-1 최종):
- 7건 × 3회 = 433턴
- Truth Throttle 위반: 0건
- Hallucination: 0건
- 자동 검증 FAIL: 0건
- WARN: 3건 (0.7%, "같아서" 패턴 — 이후 enforceHonorifics에 추가)
- 4건 완벽 일관성, 3건 안정

---

## Part 5: 수정된 파일 전체 목록 (Stage-1에서 변경된 모든 파일)

---

### 엔진 코드

| 파일 | 변경 내용 |
|------|----------|
| `src/engine/blueprintPromptBuilderV2.ts` | 프롬프트 전면 개편 (ARCHETYPE 6종, TELL 6종, FOCUS 4종, few-shot 5쌍, 번역체 금지, 사과 클리셰, 금전 가드, S5 감정, Truth Throttle 4단계, privateKnowledge 게이팅, tell 위치 이동) |
| `src/engine/atomSelectionEngine.ts` | S5 slot 승격 로직 (confessPromotesExact), tell 비활성 시 neutral 강제, judgeRef/fullName 분기 |
| `src/engine/llmDialogueResolver.ts` | enforceHonorifics ~54규칙 (반말~27, 해요체~27), "같아서" 패턴, ~세요→~십시오 제거, fixMisdirectedAddress 이름 호격 제거 |
| `src/engine/judgeQuestionEngine.ts` | 84종+ 질문 풀, lieState soft/hard 분기, depth 순환, resetQuestionRotation() |
| `src/engine/witnessEngine.ts` | determineTestimonyDepth(), 기관 증인 예외, 번역체 가드, few-shot 주입, normalizeWitnessSlot() |
| `src/engine/interjectionV2.ts` | ARCHETYPE_LINES 6×4=24종, ARCHETYPE_HIGH_EMOTION_LINES, 9건 대사 교정 |
| `src/engine/llmClient.ts` | MODEL_DIALOGUE=gpt-4o, MODEL_ANALYSIS=gpt-4o-mini |
| `src/engine/freeQuestionV2.ts` | pickTonePattern() + 180패턴 로딩, archetype 후처리 |
| `src/hooks/useActionDispatch.ts` | buildContradictionQuestion() 15종 템플릿, [모순 추궁 맥락] isHidden:true |
| `src/engine/phase6ResultPromptV2.ts` | 번역체 금지 규칙, aReaction/bReaction 활용 |
| `src/store/useGameStore.ts` | initializeCase 내 resetQuestionRotation() 연결 |
| `src/store/slices/evidenceSlice.ts` | investigateEvidence 후 checkUnlocks lieState 연동 |

### 프롬프트/파라미터

| 파일 | 변경 내용 |
|------|----------|
| `src/api/promptManager.ts` | temperature 1.0, maxTokens 400 |
| `src/api/agentManager.ts` | 동일 |
| `src/hooks/useActionDispatch.ts` | 반박 대사 temperature 1.0 |

### 데이터 (7건 case JSON)

| 파일 | 변경 |
|------|------|
| `src/data/cases/generated/spouse-01.json` | evidence 7건 교정 |
| `src/data/cases/generated/family-01.json` | evidence 10건 교정, requiredLieState 12건 추가 |
| `src/data/cases/generated/friend-01.json` | evidence 9건 교정 |
| `src/data/cases/generated/neighbor-01.json` | evidence 2건 교정 |
| `src/data/cases/generated/partnership-01.json` | evidence 6건 교정 |
| `src/data/cases/generated/tenant-01.json` | evidence 5건 교정 |
| `src/data/cases/generated/workplace-01.json` | evidence 7건 교정 |

### 데이터 (v2-atoms)

7건의 v2-atoms JSON (경로는 사건별 상이) — S0-S2 neutral화 320건+ 교정

### 데이터 (Phase 1/2)

| 경로 | 파일 수 |
|------|---------|
| `src/data/dialogues/phase1/*.json` | 7파일 교정 |
| `src/data/dialogues/phase2/*.json` | 7파일 교정 |

### V3 파일럿 데이터 (spouse-01)

| 파일 | 내용 |
|------|------|
| spouse-01 V3 game loop data | BeatScriptV3 55개, scriptedResponse 18개, scriptedTestimonies 12개 |
| DossierCard game loop data (4건) | friend-01(18건 재작성), spouse-01(1건), workplace-01(2건), partnership-01(3건) |

### 서버/DB

| 파일 | 변경 |
|------|------|
| `server/db/seed.js` | llm_model: gpt-4o, llm_temperature: 1.0, llm_max_tokens: 400 |
| `server/db/seedBlocks.js` | 증인 번역체 가드 에이전트 블록 |

### 신규 파일

| 파일 | 내용 |
|------|------|
| `src/data/witnessFewShotExamples.ts` | 증인 few-shot 36예시 + hiddenAgenda 20패턴 |
| `src/data/freeQuestionTonePatterns.json` | 자유 질문 archetype 톤 패턴 180개 |

### 테스트

| 파일 | 변경 |
|------|------|
| `tests/full-playthrough-v2.cjs` | 전면 개편 (ARCHETYPE/TELL/FOCUS/few-shot/S5 slot 승격) |
| `tests/scenarios/*.cjs` (7건) | 모델 gpt-4o, temp 1.0, max 400, 5초 딜레이 |
| `tests/run-playthrough.cjs` | 실행 진입점 |

### 문서

| 파일 | 내용 |
|------|------|
| `docs/ref/리뉴얼참고/llm-quality-tuning-guide.md` | LLM 품질 고도화 가이드 (이 문서의 원본) |
| `docs/ref/리뉴얼참고/gpt-pro-utilization-guide.md` | GPT Pro 활용 가이드 |
| `docs/ref/리뉴얼참고/thread-packages/control-tower-handoff-20260405.md` | CT 인수인계 |
| `docs/ref/리뉴얼참고/thread-packages/thread-B/report-phase2-final.md` | Thread B Phase 2 보고 |
| `docs/ref/리뉴얼참고/thread-packages/thread-B/message-to-control-tower-hotfix.md` | 핫픽스 3건 |
| `docs/ref/리뉴얼참고/thread-packages/thread-E/reports/deep-review-handoff-to-control-tower.md` | 심층 검증 보고 |
| `docs/ref/리뉴얼참고/thread-packages/thread-C/stage3-verification-spec.md` | V3 검증 규칙 |
| `docs/ref/리뉴얼참고/thread-packages/thread-E/mission.md` | 테스트 명세 |

---

## 부록: 스레드별 역할과 다음 작업

| 스레드 | 역할 | 77건 확장 시 작업 |
|--------|------|------------------|
| **Thread A** | 증거 데이터 | investigationStages 77건 생성, requiredLieState 검증 |
| **Thread B** | NPC 품질 + GPT Pro | WARN 잔여(증거 질문 "특정 X", Stage 0 추궁력) → 배치 GPT 프롬프트 규칙 반영 |
| **Thread C** | V3 스크립트 | **보류** → LLM 고도화+77건 완료 후 V3 엔진 연결 착수 |
| **Thread D** | Phase 1/2 교정 | 77건 × 2 = 154파일 교정 |
| **Thread E** | 통합 테스트 | 77건 확장 후 심층 검증 재가동 |
| **GPT Pro** | 대량 생성 | 세션 A(fallbackPublicClaim 검증), B(investigationStages), C(프롬프트 최적화), D(V3 스크립트 83건), E(DossierCard 83건) |
| **Claude Code** | 톤 검수 + 코드 | GPT Pro 산출물 톤 검수, 코드 반영, 빌드 검증 |

---

## 부록: 핵심 원칙 (절대 잊지 말 것)

> **"진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."**

이 원칙이 모든 시스템(증거, NPC 대사, 카드, 증인, 시스템 메시지, Phase 1/2, 후일담)에 적용된다.

---

*이 문서는 Stage-1 7건의 모든 수정 내역을 기반으로 작성되었으며, 77건 확장 및 84건 V3 스크립트 대체의 단일 참조 문서로 기능한다.*

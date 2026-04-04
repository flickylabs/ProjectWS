# 스레드 E — 통합 품질 테스트

> 담당: 4개 스레드(A/B/C/D) 산출물의 통합 품질 검증 + 게임 플레이 시뮬레이션
> 주 도구: Claude Code (에이전트 병렬 검증)
> 산출물: 테스트 보고서 + 교정 패치 + 83건 확장 템플릿 확정

---

## 1. 목표

**"7개 Stage-1 사건이 모든 품질 기준을 통과한다"**를 증명한다.

통과 기준:
- 진실이 단계 이전에 노출되지 않음 (Progressive Truth Throttle)
- 한국어 품질 (의미, 맥락, 어법, 호칭, 존칭) 통과
- 게임 메커닉이 정상 동작 (증거 단계, 카드 게이팅, 증인 depth)
- 20턴 LLM 시뮬레이션에서 NPC 품질 안정

---

## 2. 테스트 범위

### 2-1. 대상 사건 (7건)
```
spouse-01, family-01, friend-01, neighbor-01,
partnership-01, tenant-01, workplace-01
```

### 2-2. 대상 시스템 (6계층)
```
1. Phase 1/2 스크립트    — 사전 대화 (Thread D 산출물)
2. LLM 심문 응답        — NPC 대사 품질 (Thread B 산출물)
3. 증거 시스템          — 표면/심층, 단계별 질문 (Thread A 산출물)
4. 카드(DossierCard)    — 자동 실행, 게이팅, q1→q3 (Thread C 산출물)
5. 증인 시스템          — depth별 증언, 게이팅
6. 시스템 메시지        — 진실 노출 없는 중립 표현 (Thread B 산출물)
```

---

## 3. 테스트 단계

### 3단계 구조: 정적 검증 → LLM 시뮬레이션 → 크로스 체크

---

## 4. Stage 1: 정적 검증 (코드 실행 없이 데이터만 검사)

### 테스트 1-1: Phase 1/2 스크립트 전수 스캔

**대상**: `src/data/dialogues/phase1/*.json`, `src/data/dialogues/phase2/*.json` (14개 파일)

**검증 항목:**

| # | 항목 | 기준 | 검증 방법 |
|---|------|------|----------|
| 1 | 스포일러 | 사건별 금지어 0건 | 사건별 금지어 목록 × grep |
| 2 | 합니다체 | 재판관 대상 발화 100% 합니다체 | 해요체 패턴 grep: `에요\|해요\|거예요\|했어요\|있어요\|같아요\|됐어요\|없어요` |
| 3 | 반말 규칙 | 당사자 간 반말 허용, 재판관에게 반말 0건 | speaker=a/b의 대사 중 재판관 대상 발화만 검증 |
| 4 | 호칭 일관성 | 재판관에게 "제 남편/아내", 상대에게 "자기/오빠" 등 | 수동 검증 (7건) |
| 5 | 맥락 자연스러움 | 교정 후 대사가 어색하지 않은지 | 전문 읽기 (7건) |
| 6 | anchorTruth 누출 | 사건의 핵심 진실(anchorTruth)이 Phase 1/2에 없는지 | 사건별 anchorTruth 키워드 추출 → Phase 1/2에서 검색 |

**에이전트 구성:** 7건 병렬 (사건별 1 에이전트)

```
에이전트 프롬프트:
{case}-01의 Phase 1/2 스크립트를 읽고 다음을 검증하라.

[읽을 파일]
- src/data/dialogues/phase1/{case}-01.json
- src/data/dialogues/phase2/{case}-01.json
- 해당 사건의 case JSON (src/data/cases/generated/{case}-01.json) — anchorTruth, disputes 확인용

[검증 기준]
1. 스포일러 스캔: 사건의 anchorTruth에서 핵심 키워드를 추출하고, Phase 1/2에서 해당 키워드가 등장하는지 확인
2. 해요체 검출: speaker가 a/b인 대사 중 재판관에게 말하는 부분에서 해요체 패턴 검색
3. 호칭 일관성: 재판관 대상(합니다체), 상대 대상(반말 허용), 3인칭("제 남편이~") 규칙
4. 맥락 자연스러움: 교정으로 인해 문맥이 단절되거나 어색한 부분이 있는지
5. 정보량 적절성: 너무 많이 말해서 스포일러가 되거나, 너무 적게 말해서 상황이 이해 안 되지 않는지

위반 사항을 대사 인용과 함께 구체적으로 보고하라.
```

---

### 테스트 1-2: v2-atoms Truth Throttle 전수 검증

**대상**: 7건의 v2-atoms JSON

**검증 항목:**

| # | 항목 | 기준 |
|---|------|------|
| 1 | S0-S1 slots 안전성 | fullName/exact/role/institution이 neutral 값인지 |
| 2 | S2 slots 안전성 | fullName이 성씨만, exact가 rounded 수준인지 |
| 3 | S3+ 원본 보존 | 구체적 정보가 그대로 남아있는지 |
| 4 | factText 안전성 | S0-S2의 factText에 기관명/인물 직함/서비스명이 없는지 |
| 5 | suppression 모순 | suppressions에서 숨기라는 정보가 같은 state의 slots에 있지 않은지 |
| 6 | privateKnowledge 게이팅 | S0-S2에서 privateKnowledge가 과도하게 노출되지 않는지 |

**에이전트 구성:** 7건 병렬

```
에이전트 프롬프트:
{case}-01의 v2-atoms를 읽고 Truth Throttle 준수를 전수 검증하라.

[읽을 파일]
- {해당 사건의 v2-atoms JSON 경로}

[사건별 금지어 — 검증자가 case JSON에서 추출]
각 사건의 anchorTruth와 disputes에서 핵심 키워드(기관명, 인물 직함, 서비스명, 정확한 금액)를 추출하고,
S0-S1 atoms의 factText와 slots에서 해당 키워드가 등장하면 FAIL.
S2 atoms에서는 성씨/rounded 수준까지만 허용.

[검증 세부]
- 각 atom의 unlockedAtState를 기준으로 해당 state의 규칙 적용
- slots의 모든 key-value 쌍을 순회하며 검증
- 결과를 atom ID별로 PASS/FAIL 표시
```

---

### 테스트 1-3: V3 BeatScriptV3 검증 (spouse-01 한정)

**대상**: Thread C 산출물 6세션

**검증 항목:**

| # | 항목 | 기준 |
|---|------|------|
| 1 | applicableStates ↔ truthLevel 매칭 | 결정1 규칙 엄밀 적용 |
| 2 | 금지어 | truthLevel별 금지어 목록 대조 (stage3-verification-spec.md 기준) |
| 3 | alternatives 차별성 | 원본 line과 alternatives가 의미적으로 충분히 다른지 |
| 4 | tell 반영 | 캐릭터 tell이 대사에 반영되어 있는지 |
| 5 | 합니다체/호칭 | 재판관 대상 합니다체, 상대 언급 3인칭 |
| 6 | DossierCard scriptedResponse | q1=hint, q2=partial, q3=full 규칙 + 금지어 |
| 7 | 증인 depth | vague≤hint, partial≤partial, full=full + 기관 증인 예외 적용 |
| 8 | 금액 숨김 (결정5) | truthLevel none/hint에서 구체적 금액(2,800,000원 등) 0건 |

**에이전트 구성:** 세션별 6 에이전트 병렬

```
에이전트 프롬프트:
spouse-01 V3 파일럿 세션 {N}의 데이터를 검증하라.

[읽을 파일]
- {해당 세션 output JSON}
- docs/ref/리뉴얼참고/thread-packages/thread-C/stage3-verification-spec.md (검증 규칙)

[특별 체크 — 결정 반영]
- 금액 숨김: truthLevel "none" 또는 "hint"인 대사에서 구체적 금액 패턴
  ([\d,]+원, [\d,]+만원, \d+만\s*원) 검출 시 FAIL
- S2에서 partial beat가 없는지 확인 (hedge까지만 허용)
- DossierCard q3의 truthLevel이 "full"인지 확인

위반 사항을 정확한 beat ID/line 인용과 함께 보고하라.
```

---

### 테스트 1-4: 증거 데이터 정적 검증

**대상**: 7건의 case JSON 내 evidence 배열

**검증 항목:**

| # | 항목 | 기준 |
|---|------|------|
| 1 | surfaceName 존재 | 모든 evidence에 surfaceName이 있는지 |
| 2 | surfaceName 안전성 | surfaceName이 진실을 노출하지 않는지 (기관명/서비스명 포함 여부) |
| 3 | requiredLieState 적절성 | 핵심 증거가 너무 일찍(S0-S1) 등장하지 않는지 |
| 4 | investigationStages 완전성 | Stage-1 7건에 3단계 investigationStages가 있는지 |
| 5 | investigationStages 질문 품질 | 질문이 자연스러운 한국어이고, attackVector와 맞는지 |

**에이전트 구성:** 7건 병렬

---

### 테스트 1-5: 코드 엔진 로직 정적 검증

**대상**: Thread B가 수정한 코드 2파일 + 기존 엔진

**검증 항목:**

| # | 파일 | 항목 |
|---|------|------|
| 1 | judgeQuestionEngine.ts | extractDisputeSubject() 15패턴이 모든 dispute name을 커버하는지 |
| 2 | useActionDispatch.ts | 모든 `addDialogue({speaker:'system'})` 호출이 중립 표현인지 |
| 3 | blueprintPromptBuilderV2.ts | getTruthThrottle()이 모든 lieState에 올바른 제약을 반환하는지 |
| 4 | llmDialogueResolver.ts | enforceHonorifics() 13개 규칙이 모든 해요체를 커버하는지 |
| 5 | evidenceEngine.ts | checkUnlocks()의 requiredLieState 게이팅이 정확한지 |
| 6 | witnessEngine.ts | determineTestimonyDepth()가 dispute lieState를 올바르게 참조하는지 |

**에이전트 구성:** 파일별 2-3 에이전트 병렬

---

## 5. Stage 2: LLM 시뮬레이션 (실제 API 호출)

### 테스트 2-1: 20턴 심문 시뮬레이션 (7건)

각 사건에 대해 20턴 LLM 플레이스루를 실행한다.

**시나리오 구성 (사건당):**

| 턴 | 행동 | 검증 포인트 |
|---|------|------------|
| 1-3 | fact_pursuit 질문 | S0-S1 응답에 금지어 없음, 합니다체 |
| 4-5 | evidence_present (surfaceName 확인) | 증거가 표면 정보만 보이는지 |
| 6-8 | motive_search 질문 (S2 전이 유도) | S2 전이 메시지 중립, hedge 응답이 hint 수준 |
| 9-10 | evidence 조사 (stage 0→1) | investigationStages 질문 해금 동작 |
| 11-13 | empathy_approach (S3 전이 유도) | S3 전이 메시지 중립, partial/blame 응답 |
| 14-15 | evidence 조사 (stage 1→2) | 더 날카로운 질문 해금 |
| 16-17 | DossierCard 자동 실행 | evaluateDossierUnlock 조건 충족, q1→q2→q3 순차 |
| 18-19 | 증인 소환 | depth가 lieState에 맞게 결정, 증언이 depth 수준 준수 |
| 20 | confession 유도 (S4-S5) | 전면 인정 응답 |

**검증 기준 (매 턴):**

```
[자동 검증 — 코드로 체크]
1. 해요체 0건: enforceHonorifics() 통과 후에도 해요체가 남아있으면 FAIL
2. 금지어 0건: 현재 lieState 기준 금지어가 응답에 포함되면 FAIL
3. 금액/날짜 0건: 정확한 숫자([\d,]+원, \d+월\d+일 등)가 S0-S2 응답에 있으면 FAIL
4. 반말 0건: 재판관 대상 발화에서 반말 패턴 검출 시 FAIL
5. 시스템 메시지 안전: truth.fact, dispute.name이 직접 노출되면 FAIL

[수동 검증 — 에이전트가 판단]
6. 의미 일관성: 같은 NPC가 이전 턴과 모순되는 말을 하지 않는지
7. 맥락 적절성: 질문에 맞는 대답인지, 엉뚱한 방향으로 새지 않는지
8. 캐릭터 일관성: tell이 유지되는지 (over_precision, evidence_waving 등)
9. 감정 곡선: lieState 전이에 따라 감정이 자연스럽게 변하는지
10. 정보량 적절성: 너무 많이/적게 말하지 않는지
```

**에이전트 구성:** 7건 병렬 (사건당 1 에이전트, 20턴 전체 실행)

```
에이전트 프롬프트:
{case}-01의 20턴 플레이스루를 실행하고 품질을 검증하라.

[실행 방식]
tests/full-playthrough-v2.cjs를 참고하여 다음 순서로 시뮬레이션:
1. 사건 데이터 로드
2. 각 턴마다 buildBlueprintUserPromptV2 → callLLM → enforceHonorifics
3. 응답을 자동 검증 기준 5개로 체크
4. 수동 검증 기준 5개로 판단

[시나리오]
턴 1-3: fact_pursuit (S0-S1 유지)
턴 4-5: evidence_present (requiredLieState 없는 증거)
턴 6-8: motive_search (S2 전이 유도)
턴 9-10: evidence investigation stage 0→1
턴 11-13: empathy_approach (S3 전이 유도)
턴 14-15: evidence investigation stage 1→2
턴 16-17: DossierCard 자동 실행 (조건 확인)
턴 18-19: 증인 소환 (depth 확인)
턴 20: S4-S5 confession 유도

[출력]
각 턴별 결과를 PASS/FAIL로 표시하고, FAIL인 경우 구체적 위반 내용을 대사 인용과 함께 보고.
최종 요약: 총 위반 수, 위반 패턴 분류, 심각도 (CRITICAL/WARN).
```

---

### 테스트 2-2: 재판관 질문 자연스러움 검증

**대상**: 7건의 모든 dispute에 대해 재판관 질문 생성

```
에이전트 프롬프트:
7건의 모든 dispute에 대해 generateJudgeQuestion()의 결과를 생성하고,
다음을 검증하라:

1. 질문에 dispute name의 스포일러 소재가 포함되지 않는지
2. "해당 사안에 대해" 류의 너무 모호한 fallback이 아닌지
3. 한국어로 자연스러운 문장인지
4. 같은 사건에서 fact_pursuit/motive_search/empathy_approach 3종이 충분히 차별화되는지
```

---

## 6. Stage 3: 크로스 체크 (시스템 간 일관성)

### 테스트 3-1: 진실 공개 타임라인 일관성

각 사건에 대해 "플레이어가 언제 무엇을 알 수 있는지" 타임라인을 작성하고,
의도치 않은 조기 노출이 없는지 확인한다.

```
진실 공개 채널:
1. Phase 1/2 스크립트 → 플레이어가 처음 듣는 정보
2. 증거 surfaceName → 증거 탭에 표시되는 이름
3. NPC 심문 응답 (S0-S1) → 초기 질문에 대한 답변
4. NPC 심문 응답 (S2) → 중반 질문에 대한 답변
5. 증거 investigationStages → 증거 조사 결과
6. 증인 vague → 초기 증인 증언
7. DossierCard q1 scriptedResponse → 첫 카드 질문 응답
8. NPC 심문 응답 (S3) → 후반 질문에 대한 답변
9. 증인 partial → 중반 증인 증언
10. DossierCard q2-q3 → 카드 결정적 질문
11. NPC confession (S4-S5) → 최종 자백

에이전트 프롬프트:
{case}-01의 진실 공개 타임라인을 작성하라.

[작성 방법]
위 11개 채널 각각에서 플레이어가 얻을 수 있는 정보를 나열하라.
그리고 다음을 체크:
- 채널 N에서 노출되는 정보가, 채널 N-1 이전에 다른 채널에서 먼저 노출되지 않는지
- 특히: Phase 1/2에서 채널 8-11 수준의 정보가 노출되면 CRITICAL
- 증거 surfaceName에서 채널 5-11 수준의 정보가 노출되면 CRITICAL
```

**에이전트 구성:** 7건 병렬

---

### 테스트 3-2: NPC 응답 일관성 (V3 vs LLM)

spouse-01 한정. V3 BeatScript 대사와 LLM 생성 대사가 같은 상황에서 모순되지 않는지 확인.

**확인 포인트:**
- V3 beat의 금액 숨김(결정5)이 LLM 경로와 일관되는지
- V3 beat의 tell 표현이 LLM 프롬프트의 tell 지시와 일치하는지
- V3 beat의 호칭이 LLM 경로의 호칭과 동일한지

---

## 7. 특별 체크 항목 (설계 결정에서 파생)

### 체크 A: S2 대사 다양성 (결정2 관련)
S2 상태에서 hedge beat만으로 충분한 다양성이 제공되는지 집중 확인.
- spouse-01 기준: S2에서 사용 가능한 hedge beat + alternatives의 총 개수
- 20턴 중 S2에 머무르는 3-4턴 동안 같은 대사가 반복되는지
- 부족하다면 구체적으로 어떤 상황에서 부족한지 보고

### 체크 B: 금액 숨김 자연스러움 (결정5 관련)
over_precision tell에서 금액을 숨기고 시각/절차 정밀로 대체했을 때,
- 캐릭터의 tell이 여전히 인식 가능한지
- "상당한 금액" 같은 모호 표현이 반복되어 어색하지 않은지
- 대안 표현이 충분히 다양한지

### 체크 C: DossierCard q3 극적 효과 가능성 (결정3 관련)
q3에서 NPC가 전면 인정할 때의 대사 품질:
- 감정적 무게가 충분한지
- 시스템 메시지/이벤트 씬을 추가할 수 있는 자연스러운 구간이 있는지
- 현재 코드에서 q3 응답 후 어떤 이벤트가 발생하는지 확인

---

## 8. 위반 심각도 분류

| 등급 | 기준 | 예시 |
|------|------|------|
| **CRITICAL** | 게임 경험을 파괴. 즉시 수정 필수 | 진실 조기 노출, anchorTruth 누출, 카드 스포일러 |
| **HIGH** | 몰입을 심각하게 저해. 배치 전 수정 | 해요체 잔존, 반말 혼용, 금지어 위반 |
| **MEDIUM** | 품질 저하. 가능하면 수정 | 어색한 표현, 맥락 단절, tell 미반영 |
| **LOW** | 개선 사항. 83건 확장 시 반영 | 미세 톤 불일치, 대안 표현 부족 |

---

## 9. 산출물

| 산출물 | 파일 |
|--------|------|
| Stage 1 정적 검증 보고서 | `thread-E/reports/stage1-static-report.md` |
| Stage 2 시뮬레이션 보고서 | `thread-E/reports/stage2-simulation-report.md` |
| Stage 3 크로스 체크 보고서 | `thread-E/reports/stage3-cross-check-report.md` |
| 특별 체크 보고서 | `thread-E/reports/special-checks-report.md` |
| 교정 패치 목록 | `thread-E/reports/patches-needed.md` |
| **최종 판정** | `thread-E/reports/final-verdict.md` |

최종 판정에 포함되는 것:
- 7건 각각의 PASS/FAIL
- CRITICAL/HIGH 위반이 0건이면 → **83건 확장 배치 시작 가능**
- 남아있으면 → 패치 후 재검증

---

## 10. 직접 수행 가이드

### 추천 방식: 3-Stage 순차, 각 Stage 내에서 에이전트 최대 병렬

#### Stage 1 실행 (정적 검증)
```
병렬 그룹 A: Phase 1/2 스캔 7건 (테스트 1-1)
병렬 그룹 B: v2-atoms 검증 7건 (테스트 1-2)
병렬 그룹 C: V3 BeatScript 검증 6세션 (테스트 1-3)
병렬 그룹 D: 증거 데이터 검증 7건 (테스트 1-4)
병렬 그룹 E: 코드 엔진 검증 6파일 (테스트 1-5)
```
→ A~E를 동시 실행 가능. 총 ~33 에이전트.
→ 결과 취합 후 CRITICAL/HIGH가 있으면 **즉시 패치** → Stage 1 재검증

#### Stage 2 실행 (LLM 시뮬레이션)
```
병렬: 7건 × 20턴 플레이스루 (테스트 2-1)
병렬: 재판관 질문 자연스러움 (테스트 2-2)
```
→ Stage 1 PASS 후에만 진행
→ LLM API 호출이 필요하므로 비용/시간 주의
→ 결과 취합 후 패치 필요 시 Stage 2 재검증

#### Stage 3 실행 (크로스 체크)
```
병렬: 진실 공개 타임라인 7건 (테스트 3-1)
단독: V3 vs LLM 일관성 — spouse-01 (테스트 3-2)
```
→ Stage 2 PASS 후에만 진행

#### 특별 체크
Stage 2와 병행 가능. 20턴 시뮬레이션 결과를 활용하여 체크 A/B/C를 평가.

### 에이전트 품질 기준
- 위반 보고 시 **반드시 대사 원문을 인용**
- FAIL 판정 시 **교정 제안을 함께 제출**
- "자연스러움" 판단은 **구체적 이유**를 명시 (단순히 "어색함" 금지)
- 한국어 어법 판단 기준:
  - 조사 오류 (을/를, 이/가, 은/는 부적절)
  - 어미 불일치 (합니다/해요 혼용)
  - 주어 불명확 (누가 누구에게 말하는지)
  - 호칭 혼란 (같은 인물을 다르게 부르기)
  - 번역체 ("~하는 것이다", "~한다는 것은")
  - 과도한 반복 (같은 단어/표현 연속 사용)

---

## 11. 사건별 금지어 추출 가이드

각 사건의 금지어는 테스트 에이전트가 사건 데이터에서 직접 추출한다.

**추출 소스:**
1. `disputes[].anchorTruth` — 핵심 진실 텍스트
2. `thirdParties[].fullKnowledge` — 증인이 아는 전체 진실
3. `duo.partyA/B.privateKnowledge` — 비공개 지식

**추출 대상 (금지어 후보):**
- 기관명 (재가돌봄센터, 법무사 사무소 등)
- 인물 직함 (상담팀장, 센터장, 법무사 등)
- 서비스명 (간병, 돌봄, 신탁 등)
- 정확한 금액 (280만원, 150만원, 1800만원 등)
- 핵심 행위 (월세 대납, 간병 예약, 위조 등)

**금지어 적용 범위:**
- truthLevel "none" (S0-S1): 위 전체 금지
- truthLevel "hint" (S2): 기관명, 인물 직함, 서비스명 금지. "가족 일"/"개인 사정" 수준 허용
- truthLevel "partial" (S3): 기관 정식명칭, 대상자 실명 금지. 행위 인정, 간접 표현 허용
- truthLevel "full" (S4-S5): 모두 허용

# Thread B Phase 2 — NPC 대화 품질 고도화 (GPT Pro 협업)

> 발신: 컨트롤 타워
> 수신: Thread B
> 일시: 2026-04-04
> 상태: 신규 미션

---

## 배경

심문 NPC 대사는 gpt-4o + 프롬프트 개편으로 대폭 개선됨 (번역체 0건, tell 발현, S5 구체 진실).
그러나 **나머지 요소들의 품질이 미흡**해서, 게임 전체 경험이 올라가지 못하고 있다.

### 완료된 것 (건드리지 마라)
- blueprintPromptBuilderV2.ts — 심문 프롬프트 전면 개편 ✅
- atomSelectionEngine.ts — S5 slot 승격 ✅
- llmDialogueResolver.ts — enforceHonorifics 확장 ✅
- interjectionV2.ts — archetype별 끼어들기 24종 ✅
- witnessEngine.ts — 번역체 가드 + 기관 증인 예외 ✅
- 시스템 메시지 중립화 (Phase 1에서 네가 한 것) ✅

### 이번 미션에서 고도화할 것

| 우선순위 | 대상 | 파일 | 핵심 문제 |
|---------|------|------|----------|
| **1 (급함)** | 재판관 질문 | judgeQuestionEngine.ts | 질문 풀 3-4종으로 부족, lieState 미활용, evidence_present 1종 고정 |
| **2 (급함)** | 모순 추궁 질문 | contradictionEngine.ts + useActionDispatch.ts | "방금 ~라고 하셨는데 이전에는 ~" 식 추궁 질문 미존재 |
| **3 (권장)** | 자유 질문 응답 | freeQuestionV2.ts | 템플릿 접합으로 캐릭터 톤 부재 |
| **4 (권장)** | 증인 프롬프트 | witnessEngine.ts | few-shot/ARCHETYPE 미적용 (번역체 가드만 추가됨) |

---

## 미션 1: 재판관 질문 풀 확대

### 현재 상태
```
judgeQuestionEngine.ts:
- fact_pursuit: depth 4단계 × 각 1종 = 4종
- motive_search: depth 4단계 × 각 1종 = 4종
- empathy_approach: depth 4단계 × 각 1종 = 4종
- evidence_present: 1종 고정 ("입장을 밝혀 주십시오")
- lieState: 파라미터로 받지만 사용 안 함 (dead parameter)
총 13종
```

### 목표
```
- fact_pursuit: depth 4 × 각 3종 = 12종
- motive_search: depth 4 × 각 3종 = 12종
- empathy_approach: depth 4 × 각 3종 = 12종
- evidence_present: depth 3 × 각 2종 = 6종
- lieState 반영: S0-S1(조심스러운) vs S3+(강압적) 톤 분화
총 ~42종 이상
```

### GPT Pro에 맡길 것
- 질문 풀 설계 (type × depth × 변형 3종)
- lieState별 톤 분화 규칙
- evidence_present depth별 분기 설계

### 네가 할 것
- GPT Pro 산출물의 한국어 자연스러움 검수
- judgeQuestionEngine.ts 코드에 질문 풀 반영
- lieState 활용 로직 구현
- 기존 extractDisputeSubject() 유지 (스포일러 방지)

### 품질 기준
- 같은 depth에서 3회 반복해도 **다른 질문**이 나와야 함
- S1에서는 "~에 대해 말씀해 주시겠습니까?" (부드러운), S3+에서는 "~을 설명하십시오" (강압적)
- 재판관 위엄이 있되 기계적이지 않은 한국어

---

## 미션 2: 모순 추궁 질문 생성

### 현재 상태
- contradictionEngine.ts: 모순 **판정**만 LLM으로 수행 (temperature 0.1)
- 추궁 **질문**은 범용 fact_pursuit 질문으로 대체 → 모순을 짚는 날카로운 질문이 없음

### 목표
모순이 감지되면 "이전 진술과 현재 진술을 구체적으로 인용하여 추궁하는 질문"을 생성

```
예시:
"한지석 씨, 방금 '가족 쪽에 급한 일이 있었다'고 하셨는데,
 3턴 전에는 '특별한 이유는 없었다'고 하셨습니다. 어떤 쪽이 사실입니까?"
```

### GPT Pro에 맡길 것
- 모순 추궁 질문 템플릿 구조 설계
  - `${previousClaim}` + `${currentClaim}` + 추궁 패턴
  - lieState별 톤 (초반: 부드럽게 지적 → 후반: 강하게 압박)
- 템플릿 패턴 10-15종 설계

### 네가 할 것
- 추궁 질문 생성 함수 구현 (contradictionEngine 또는 별도 모듈)
- useActionDispatch의 모순 이벤트 핸들러에 연결
- 기존 범용 fact_pursuit 대체

---

## 미션 3: 자유 질문 응답 품질

### 현재 상태
```
freeQuestionV2.ts:
- renderResponse(): factText를 기계적으로 접합
  "${firstText}. 그리고 ${secondText}."
- 캐릭터 말투, tell, 감정 전혀 미반영
- LLM을 안 거침
```

### 목표
자유 질문 응답에 캐릭터 톤을 입히는 후처리 단계 추가

### 접근 방법 (2가지 중 선택)

**방법 A: LLM 후처리**
- 기존 renderResponse()로 factText 접합 → LLM에 "이 내용을 ${archetype} 캐릭터 말투로 다시 써라" 요청
- 장점: 품질 높음
- 단점: API 비용 + 응답 시간

**방법 B: 템플릿 캐릭터화**
- archetype별 문장 시작/종결 패턴을 미리 정의
- 예: avoidant → "그 부분은... ~인 것 같습니다", confrontational → "~입니다. 오히려—"
- 장점: 비용 없음, 빠름
- 단점: 다양성 한계

### GPT Pro에 맡길 것
- archetype별 응답 변형 패턴 설계 (6종 × 시작/연결/종결 패턴)
- 방법 B 기준으로 설계하되, 방법 A 전환 가능한 구조

### 네가 할 것
- freeQuestionV2.ts에 캐릭터 톤 후처리 구현
- 기존 renderResponse() 결과물에 톤을 입히는 wrapWithCharacterTone() 추가

---

## 미션 4: 증인 프롬프트 강화

### 현재 상태
- depth별 지시(vague/partial/full)는 양호
- witnessBudget, witnessSpeechSamples 등 구조 잘 되어 있음
- 번역체 가드 추가됨

### 부족한 것
- few-shot 예시가 없음 → 증인이 보고서 톤으로 증언할 수 있음
- 증인 캐릭터(sentimentToA/B, hiddenAgenda)가 프롬프트에 있지만 활용이 약함

### GPT Pro에 맡길 것
- 증인 유형별 few-shot 예시 설계
  - 가족 증인 (어머니/아버지): 감정적, 자식 감싸기
  - 직장 동료: 사무적이지만 한쪽 편 가능
  - 기관 증인: 사실 위주, 절차적
  - 친구: 편한 톤, 비밀 지키기
- depth별 × 증인 유형별 = 4유형 × 3depth = 12종 예시

### 네가 할 것
- witnessEngine.ts의 프롬프트에 few-shot 예시 삽입
- 증인 유형 분류 로직 (slot 기반: family/colleague/institutional/friend)

---

## GPT Pro 활용 가이드

### 세션 분리 원칙
- 한 세션에 한 미션만
- 각 세션에 현재 코드 + 품질 기준 + 기대 산출물 명시

### GPT Pro에 항상 전달할 것
1. 현재 코드의 해당 함수 전문
2. 현재 품질 문제 (구체적 예시)
3. 목표 품질 수준 (구체적 예시)
4. 84건 확장을 고려한 범용성 요구

### GPT Pro 산출물 검수 기준
- 한국어 자연스러움 (번역체 0건)
- 법정 분위기에 맞는 위엄 (재판관 질문)
- 캐릭터 차별화 (모든 캐릭터가 같은 톤이면 FAIL)
- 반복 패턴 없음 (3회 돌려도 다른 결과)

### 참고 문서
- LLM 품질 고도화 가이드: `docs/ref/리뉴얼참고/llm-quality-tuning-guide.md`
- GPT Pro 활용 가이드: `docs/ref/리뉴얼참고/gpt-pro-utilization-guide.md`
- 현재 프롬프트: `src/engine/blueprintPromptBuilderV2.ts` (건드리지 마라, 참고만)

---

## 산출물

| 산출물 | 위치 |
|--------|------|
| 재판관 질문 풀 | judgeQuestionEngine.ts 수정 |
| 모순 추궁 질문 | contradictionEngine.ts 또는 새 모듈 |
| 자유 질문 톤 | freeQuestionV2.ts 수정 |
| 증인 few-shot | witnessEngine.ts 수정 |
| GPT Pro 세션 기록 | thread-B/gpt-pro-sessions/ |
| 완료 보고서 | thread-B/report-phase2.md |

---

## 진행 순서

1. **미션 1 (재판관 질문)** — 가장 급하고 GPT Pro 적합
2. **미션 2 (모순 추궁)** — 극적 효과 큼
3. **미션 4 (증인 프롬프트)** — GPT Pro 적합
4. **미션 3 (자유 질문)** — 설계 결정 필요 (A vs B)

각 미션 완료 시 빌드 확인 (`npx tsc --noEmit`) 필수.
최종 완료 후 컨트롤 타워에 보고하라.

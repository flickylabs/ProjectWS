# 스레드 B — 심문/NPC 대화 품질 관리

> 담당: NPC 대화 생성의 품질 보장 — 프롬프트, atom 데이터, 재판관 질문
> 주 도구: Claude Code (코드 수정) + GPT Pro (atom 검증)
> 산출물: 프롬프트 수정 + atom 교정 데이터 + 재판관 질문 교정

---

## 1. 배경 — 이번에 바뀐 것

### Progressive Truth Throttle (진실 점진 공개)
NPC가 LLM으로 대사를 생성할 때, 상태(lieState)에 따라 말할 수 있는 진실의 범위가 제한된다.

| 상태 | NPC가 말할 수 있는 것 | 금지 |
|------|----------------------|------|
| S0-S1 | 모호한 부정/회피 | 기관명, 인물 직함, 서비스명, "사실은~" 고백 |
| S2 | "개인 사정"/"가족 일" 수준 | 구체적 기관명, 인물명, 서비스 |
| S3 | 행위 인정 + 상대 탓 | 구체적 진실 (아직) |
| S4-S5 | 전체 진실 허용 | 없음 |

이것은 `blueprintPromptBuilder.ts`와 `blueprintPromptBuilderV2.ts`에 `getTruthThrottle(lieState)` 함수로 구현됨.

### 프롬프트 3대 수정
1. **금액/날짜**: "2,800,000원" → "상당한 금액" 강제
2. **존대**: 해요체 → 합니다체 자동 변환 (13개 규칙)
3. **blame**: "상대에게 직접 반말" → "재판관에게 3인칭 호소" 강제

### privateKnowledge 게이팅
이전: 모든 상태에서 privateKnowledge 전체 노출
이후: S0-S2는 1개, S3는 2개, S4+는 전부

---

## 2. 이번 작업

### 작업 1: v2-atoms 진실 조기 노출 검증 (7건)

각 사건의 `{case}-v2-atoms.json`을 읽고, S0~S2 상태의 claimAtoms에 진실이 직접 포함되어 있는지 확인한다.

확인 항목:
- S0-S1 atoms의 `factText`에 기관명/서비스명/인물 직함이 있는가?
- S0-S1 atoms의 `slots`에 `fullName`, `role` 등 진실 정보가 있는가?
- `suppressions`와 `privateKnowledge`가 모순되지 않는가? (숨기라고 하면서 atom에서 제공)

문제 발견 시:
- 해당 atom의 `factText`에서 진실 부분을 모호하게 교정
- 또는 atom의 `slots`에서 early state용 neutral 값을 추가

### 작업 2: 재판관 질문 어법 교정

`src/engine/judgeQuestionEngine.ts`에서 dispute name이 raw로 사용되는 문제.

예: "최민정은 외도 상대인가 건에 대해 좀 더 구체적으로 말씀해 주십시오"
→ 이건 "건에 대해"가 어색하고, dispute name 자체가 스포일러

수정 방향:
- dispute name 대신 중립적 표현 사용
- 또는 `extractDisputeSubject()` 함수를 개선하여 자연스러운 한국어 생성

### 작업 3: 시스템 메시지 추가 검증

이미 교정된 lie 전이 메시지 외에, 다른 곳에서 진실을 누설하는 시스템 메시지가 있는지 확인.

확인 대상:
- `useActionDispatch.ts` — 모든 `addDialogue({speaker:'system', ...})` 호출
- contradiction/interjection/outburst 이벤트 메시지

---

## 3. 입력 파일

```
프롬프트 빌더: src/engine/blueprintPromptBuilder.ts
               src/engine/blueprintPromptBuilderV2.ts
LLM 리졸버:   src/engine/llmDialogueResolver.ts
재판관 질문:   src/engine/judgeQuestionEngine.ts
액션 디스패치: src/hooks/useActionDispatch.ts

v2-atoms (7건):
  spouse-01: src/data/claimPolicies/spouse-01-v2-atoms.json
  family-01: docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms.json
  나머지 5건: docs/ref/리뉴얼참고/gpt-batch/{case}/{case}-v2-atoms.json
```

---

## 4. 산출물

1. atom 교정 보고서 (문제 있는 atom ID + 교정 내용)
2. 재판관 질문 엔진 수정 코드 (또는 수정 가이드)
3. 추가 시스템 메시지 스포일러 목록 (발견 시)

---

## 5. 품질 기준

- S0-S1에서 NPC가 "간병", "돌봄센터", "오미숙" 같은 핵심 진실을 말하면 FAIL
- S2에서 "가족 일", "개인 사정" 이상의 구체적 진실이 나오면 FAIL
- 재판관 질문이 dispute name을 raw로 노출하면 FAIL
- 시스템 메시지가 NPC의 진술이 거짓임을 전제하면 FAIL

---

## 6. 직접 수행 가이드

### 추천 방식: 에이전트 분업 (스캔 → 교정 → 검증)

#### 1단계: atom 스캔 에이전트 (7건 병렬)
- 사건별로 에이전트를 생성하여 v2-atoms의 S0~S2 상태를 스캔한다.
- 에이전트 프롬프트:
```
다음 v2-atoms JSON에서 S0, S1, S2 상태의 claimAtoms를 모두 읽어라.
각 atom의 factText와 slots를 확인하고, 다음 항목이 포함되어 있으면 보고하라:
- 기관명 (돌봄센터, 재가돌봄 등)
- 인물 직함 (상담팀장, 센터장 등)
- 서비스명 (간병, 돌봄 등)
- 구체적 금액 (280만원, 2,800,000원 등)
- "사실은~", "실은~" 류의 고백 표현

[파일]
(해당 사건의 v2-atoms JSON)

문제가 있는 atom을 ID와 함께 나열하고, 어떤 부분이 문제인지 정확히 지적하라.
```

#### 2단계: 재판관 질문 엔진 분석 (단일 에이전트)
```
src/engine/judgeQuestionEngine.ts를 읽고 다음을 확인하라:
1. dispute.name이 그대로 질문에 삽입되는 곳이 있는가?
2. partyContext.questionAngle이 raw로 노출되는 곳이 있는가?
3. 어색한 한국어 패턴 ("~건에 대해")이 생성되는 곳이 있는가?
문제를 발견하면 수정 코드를 제안하라.
```

#### 3단계: 시스템 메시지 전수 스캔 (단일 에이전트)
```
src/hooks/useActionDispatch.ts에서 speaker:'system' 또는 speaker:'judge'로
addDialogue를 호출하는 모든 곳을 찾아라.
각 메시지 텍스트가 다음 규칙을 위반하는지 확인하라:
- NPC의 진술이 거짓이라고 전제하는 표현
- 사건의 핵심 진실을 직접 노출하는 표현
- 특정 당사자가 유죄라고 암시하는 표현
```

#### 4단계: 교정 (문제 발견 시)
- atom 교정이 필요하면: GPT Pro에 전달하여 factText/slots 교정 요청
- 코드 수정이 필요하면: 직접 Edit 또는 에이전트로 수정
- 교정 후 반드시 빌드 확인 (`npx tsc --noEmit`)

### GPT Pro 활용 시 (atom 교정)
```
gpt-session-B1/
  problem-atoms.md    ← 문제 atom 목록 (ID + 문제 내용)
  rules.md            ← "S0-S2에서 이 정보가 노출되면 안 된다" 규칙
  prompt.md           ← "factText를 모호하게, slots에 neutral 값 추가"
```

### 주의
- **atom 수정은 게임 전체에 영향을 미친다.** 한 atom을 고치면 그 atom을 참조하는 모든 대사가 바뀐다.
- atom 교정 후 반드시 플레이테스트로 영향 확인.

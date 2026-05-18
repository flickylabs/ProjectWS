# 마스터 의뢰서: 직접질문 4-카테고리 분류 + 응답 고도화 v2

작성일: 2026-05-19
주체: Codex (schema/data) + ClaudeCode 메인 세션 (classifier) + Codex (responder/guard)
목표 일정: **약 2주**

선행 자료 / 현 시스템 핵심 파일:
- [src/engine/freeInterrogation/index.ts](../../../src/engine/freeInterrogation/index.ts) — router (`resolveFreeInterrogation`)
- [src/engine/freeInterrogation/intentClassifier.ts](../../../src/engine/freeInterrogation/intentClassifier.ts) — 현 11종 intent 분류
- [src/engine/freeInterrogation/contextMapper.ts](../../../src/engine/freeInterrogation/contextMapper.ts) — intent → mapping
- [src/engine/freeInterrogation/guard.ts](../../../src/engine/freeInterrogation/guard.ts) — 사후 paraphrase 차단
- [src/engine/llmFreeQuestion.ts](../../../src/engine/llmFreeQuestion.ts) — 2-call LLM 파이프라인
- [src/types/freeInterrogation.ts](../../../src/types/freeInterrogation.ts)
- [src/types/case.ts](../../../src/types/case.ts) — CaseData 스키마 (worldFacts 부재)

---

## §0. 진입 조건

| 항목 | 상태 |
|---|---|
| Phase 3 본 번역 적용 완료 | ✓ |
| 현 직접질문 시스템 동작 | ✓ (S0-S5 truth throttle 작동) |
| 테스트 케이스 데이터 (spouse-01) 가용 | ✓ |
| 메모리 컨텍스트 ([feedback_truth_leak_prohibition](memory)) | ✓ |

---

## §1. 배경 / 문제

### 1.1. 현 시스템 한계

| 한계 | 증상 | 영향 |
|---|---|---|
| intent 11종은 **사건/언어 기반**, **세계관 ≠ 사건 ≠ 예민 ≠ 무관** 사전 구분 없음 | "직업이 뭐예요?" → 사건 routing 후 빈약 응답 | 몰입 깨짐 |
| 복합 질문 분해 없음 | "왜 그때 전화 안 했고 누가 그렇게 했어?" → 한쪽만 응답 | 부분 응답 |
| disclosure policy가 case-wide (lieState 전역) | dispute별 민감도 차이 무시 | 일괄 throttle로 자연성 손실 |
| guard.ts paraphrase 룰이 사후 reactive | "돌봐 드" 같은 우회 표현 누설 잠재 | 진실 누설 위험 |
| NPC worldFacts metadata 부재 | case.ts에 name/age/occupation만 | 세계관 응답 빈약 |

### 1.2. 사용자 요구

4-카테고리 분류 + 똑똑한 응답:
1. **세계관 기반** (직업 / 가족 관계 / 일상 / 취미)
2. **사건 관련 + 진실 단계 기반** (lieState 매트릭스로 응답)
3. **사건 관련이지만 예민** (정상 플레이 보호 — deflection)
4. **게임 무관** (off-topic — 자연 deflection)
5. **복합 질문** (위 4종 multi-intent — 분해 + merge)

---

## §2. Phase A — Schema + Data 확장

**책임**: Codex 1 스레드 + 사용자 (worldFacts 작성) / **기간**: 3~5일

### 2.1. 산출

**A.1. 타입 확장**: [src/types/case.ts](../../../src/types/case.ts) 에 신규 필드 추가

```typescript
export interface NpcWorldFacts {
  background: string                  // "30대 회사원, 마케팅 5년차"
  job_detail: string                  // "주 3회 야근, 거래처는 광고 에이전시"
  hobbies?: string[]                  // ["등산", "와인"]
  daily_routine?: string              // "평일 7시 출근, 주말 가족 외식"
  relationships_lore?: {              // 사건 외 인간관계
    party?: 'a' | 'b'
    relation: string
    description: string
  }[]
  off_topic_responses?: {             // 게임 무관 질문 deflection 패턴
    trigger_keywords: string[]        // ["날씨", "음악", "취미"]
    response_template: string         // "그건 지금 답할 자리가 아닌 것 같습니다."
  }[]
}

export interface SensitiveTopicGate {
  topicKeywords: string[]             // ["입양", "친자", "출생"]
  minimumLieState: 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5'  // 이 이하면 deflection
  deflectionTemplate: string          // "그 부분은 지금 말씀드리기 어렵습니다."
}

// CaseData에 추가
export interface CaseData {
  // ... 기존 필드
  npcWorldFacts?: { a: NpcWorldFacts; b: NpcWorldFacts }
  sensitiveTopicsPerDispute?: Record<string, SensitiveTopicGate[]>  // disputeId → gates
}
```

**A.2. 데이터 채움**: 3 케이스 × 양측 = 6 NPC × 4 언어 = 24 worldFacts set

| 케이스 | NPC | 영역 |
|---|---|---|
| spouse-01 | partyA (박지연) | 마케팅 회사원 / 6년 결혼 / 부모 60대 / 취미 등산 / 친구 관계 등 |
| spouse-01 | partyB (이준호) | 자영업자 / 가족 동향 / 사촌 관계 / 사건 외 일상 등 |
| family-01 | partyA (윤태성) | 장남 / 직장 / 형제 관계 / 어머니 돌봄 경위 등 |
| family-01 | partyB (윤정후) | 차남 / 직장 / 어머니와의 관계 등 |
| friend-01 | partyA (?) | (참조 기존 데이터) |
| friend-01 | partyB (?) | (동) |

**작성 방식**:
- 1차 한국어 사용자 직접 작성 (또는 GPT Pro 의뢰)
- 다음 번역 라운드에 묶어 4언어 동시 채움

**A.3. sensitiveTopicsPerDispute 채움**: dispute별 gate 정의

예시 (spouse-01 h-d4):
```json
"h-d4": [
  { "topicKeywords": ["계좌", "통장", "거래"], "minimumLieState": "S2", "deflectionTemplate": "그 부분은 ..." },
  { "topicKeywords": ["은폐", "숨김", "거짓"], "minimumLieState": "S3", "deflectionTemplate": "..." }
]
```

각 케이스 5~7 dispute × 평균 3 gate = 약 15~20 gate per case × 3 케이스 = 약 50 gate.

### 2.2. 합격 기준
- 타입 추가 후 tsc EXIT=0
- spouse-01 worldFacts/sensitiveTopics 한국어 채움 완료
- family-01 / friend-01은 후속 (Phase B/C와 병행 가능, MVP는 spouse-01만)

### 2.3. 4언어 채움 일정
- spouse-01 KO 채움 → Phase B/C 진행 → 안정화 후 EN/JA/ZH-CN GPT Pro 의뢰 (다음 번역 라운드)
- 즉시 4언어 채움 강제 X (가용 자원 보호)

---

## §3. Phase B — Category Classifier 추가

**책임**: ClaudeCode 메인 세션 / **기간**: 3일

### 3.1. 산출

**B.1. 신규 모듈**: `src/engine/freeInterrogation/categoryClassifier.ts`

```typescript
export type FreeQuestionCategory = 
  | 'world_lore'       // 세계관 기반
  | 'case_truth'       // 사건 + 진실 단계
  | 'case_sensitive'   // 사건 + 예민
  | 'off_topic'        // 게임 무관
  | 'compound'         // 복합 (2종 이상)

export interface CategoryClassification {
  primary: FreeQuestionCategory
  secondary?: FreeQuestionCategory[]   // compound일 때 분해된 종속 카테고리
  segments?: { text: string; category: FreeQuestionCategory }[]  // compound 분해 결과
  confidence: number                   // 0~1
  reasoning?: string                   // debug용
}

export async function classifyCategory(
  question: string,
  ctx: FreeInterrogationRuntimeContext,
): Promise<CategoryClassification>
```

**B.2. 분류 알고리즘 3단**:

| 단계 | 방법 | 비용 | 우선순위 |
|---|---|---|---|
| 1 | 키워드 빠른 분류 (off_topic / world_lore 명확 패턴) | 0 (regex) | 즉시 |
| 2 | compound 분해 (접속사 "그리고/또/이랑/이고", "그러면", "왜 ... 누가 ..." 패턴) | 0 (regex + split) | 두 번째 |
| 3 | LLM fallback (claude-haiku, ~50 token output) | 약 0.0003 USD | 1,2 미해결 시 |

**B.3. router 통합**: [src/engine/freeInterrogation/index.ts](../../../src/engine/freeInterrogation/index.ts):42 의 `resolveFreeInterrogation` 시작부에 `classifyCategory` 호출 추가 → `FreeInterrogationMapping`에 `category` 필드 첨부.

**B.4. compound 처리**:
- 분해 segments 각각 별도 mapping → multi-angle aggregation
- 응답 시 LLM에 모든 segment 전달 (한 발화로 자연 결합 지시)

### 3.2. 합격 기준

테스트셋 (각 케이스 25문 × 3 케이스 = 75문):
- 카테고리 정확도 ≥ 90%
- compound 검출 ≥ 80% (false-negative 우선 최소화)
- 응답 시간 P50 < 200ms (LLM fallback 미발동 시)

### 3.3. 검증 방법
- 테스트셋: `docs/design/free-interrogation-categorization-v2/test-corpus.csv`
  - 컬럼: `question | expected_category | expected_segments | notes`
  - 25문 × 4 카테고리 + 25문 compound = 125문 표준 set
- 자동 회귀: `npm run test:freeq-categorize` (jest/vitest)

---

## §4. Phase C — Responder 분기 + Guard 사전화

**책임**: ClaudeCode + Codex 각 1 스레드 / **기간**: 5일

### 4.1. 산출

**C.1. LLM 프롬프트 분기**: [src/engine/llmFreeQuestion.ts](../../../src/engine/llmFreeQuestion.ts):312 truth throttle을 카테고리별로 분기

| 카테고리 | 응답 정책 | 데이터 소스 |
|---|---|---|
| `world_lore` | worldFacts에서 직접, lieState 무시 | `caseData.npcWorldFacts` |
| `case_truth` | 기존 truth throttle 유지 (S0-S5 매트릭스) | `agentState.lieStateMap` |
| `case_sensitive` | sensitiveTopicsPerDispute의 gate 검사 → deflectionTemplate 우선 | `caseData.sensitiveTopicsPerDispute[disputeId]` |
| `off_topic` | off_topic_redirect (기존, 강화: NPC archetype 톤 deflection) | `caseData.npcWorldFacts[*].off_topic_responses` |
| `compound` | 각 segment 분류대로 응답 → 한 발화로 merge | 위 모두 |

**C.2. guard.ts 사전화**: [src/engine/freeInterrogation/guard.ts](../../../src/engine/freeInterrogation/guard.ts):24 의 paraphrase 룰을 schema 기반으로 이동:
- 케이스별 하드코딩 lexeme blocker (e.g., "어린 친척", "친 가족") → `sensitiveTopicsPerDispute.topicKeywords` 일반화
- guard는 마지막 안전망 (사전 분류 + responder가 1차 차단)
- 누설 발생 시 텔레메트리 발행 (`emitTruthLeakBlocked(category, keyword, caseId)`)

**C.3. 회귀 테스트셋 확장**: Phase B의 125문 + 카테고리별 응답 검증 100문 추가
- 검증 차원:
  - 카테고리 정확도 (classifier)
  - 응답 자연성 (sample 50문 사용자 spot check)
  - 진실 누설 (자동: 키워드 매칭 0건)
  - 4언어 spot check (각 언어 10문 무작위)

### 4.2. 합격 기준

| 메트릭 | 합격 |
|---|---|
| 카테고리 정확도 | ≥ 90% (테스트셋) |
| 누설 발생 | 0건 (테스트셋 + 사용자 PC QA) |
| 응답 자연성 spot check | ≥ 80% "자연스럽다" 평가 |
| guard 발동률 (regression) | ≤ 5% (사전 차단으로 사후 발동 감소 확인) |
| 응답 시간 P50 | < 1.5s (LLM 호출 포함) |

### 4.3. PC QA
- spouse-01 한국어 1 playthrough × 카테고리별 5문 = 25문 직접 입력
- 발견 issue 즉시 fix
- 4언어는 [[translation-lqa-phase-execution-plan-v2]] Phase 4 PC QA에 통합

---

## §5. 일정 (Gantt)

```
Day 1-2 │ Phase A: 타입 확장 + spouse-01 KO worldFacts 채움
Day 3-5 │ Phase A 마무리 + Phase B (classifier 구현 + 테스트셋 작성)
Day 6-8 │ Phase B 마무리 + Phase C 시작 (responder 분기)
Day 9-12│ Phase C 마무리 (guard 사전화 + 회귀 테스트 + PC QA)
Day 13-14│ family-01 / friend-01 worldFacts 채움 (1차 KO만)
```

---

## §6. 비-범위 / 후속

이번 작업에서 하지 않는 것:
- LLM 모델 교체 (현 모델 유지)
- intent classifier 11종 삭제 (compatibility 위해 위에 category layer만 추가)
- 모든 케이스 worldFacts 즉시 4언어 채움 (KO만 우선)
- 음성 응답
- 컨트롤러 UI 변경

후속:
- worldFacts 4언어 GPT Pro 의뢰 (다음 번역 라운드)
- 카테고리별 응답 품질 LQA (Phase 4 PC QA에 통합)
- NPC archetype별 톤 fine-tune (자연성 개선)

---

## §7. [[translation-lqa-phase-execution-plan-v2]] 와의 의존

- LQA Phase 0 (verify v2 강화) 의 truth-leak 검출이 본 시스템 회귀 테스트에 재사용 가능
- LQA Phase 2 외국어 표본 LQA 시 free-question 응답 자연성도 동일 기준 검수
- LQA Phase 4 PC QA에 본 시스템 카테고리별 25문 통합

병렬 진행 권장:
- LQA Phase 0 + Phase 1 (1주차) ↔ 본 Phase A + B (1주차)
- LQA Phase 2 (2~3주차) ↔ 본 Phase C (2주차)
- LQA Phase 4 (4주차) ↔ 본 PC QA (4주차에 함께)

---

**참조 메모리**:
- [feedback_truth_leak_prohibition](memory) — 잘못 패턴 #9 (진실 누설 본질)
- [feedback_translation_pipeline_placeholder_leak](memory) — 메타 질문 placeholder 사례
- [feedback_revision_meaning_over_form](memory) — 잘못 패턴 #6 (9차원 정확성)
- [project_active_cases](memory) — 활성 케이스 3종 (spouse/family/friend)
- [design_observation_system](memory) — 관찰 시스템 (응답 후 변화 반영)

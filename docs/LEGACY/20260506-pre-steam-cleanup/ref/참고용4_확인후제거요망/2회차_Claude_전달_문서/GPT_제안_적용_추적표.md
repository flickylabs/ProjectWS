# GPT Pro 제안 → Claude Code 적용 전체 추적표

> GPT Pro가 v1~v4에서 제안/작성한 모든 항목에 대해, Claude Code가 어떻게 적용했는지 추적합니다.
> "누락 후 보완"은 처음에 빠뜨렸다가 나중에 수정한 것입니다.

---

## v2: 코드 실사 기반 리뷰 (solomon_code_review_and_prompt_plan.md)

### P0 버그 (GPT 발견 → Claude 즉시 수정)

| # | GPT 지적 | 적용 | 시점 |
|---|---------|------|------|
| 1 | Phase 조건값 불일치 (`Phase3_Interrogation` vs enum 실제값 `phase3`) | ✅ condValue를 `phase3`/`phase4`/`phase5`로 수정 | 즉시 |
| 2 | free_question 에이전트의 필수 변수 누락 (relationship, context, formalityGuide) | ✅ 3개 변수 + import 추가 | 즉시 |
| 3 | trust_action에 disputeId 없음 | ✅ 최근 심문 쟁점 자동 추론 로직 추가 | 즉시 |

### P1 구조 제안 (GPT 설계 → Claude 구현)

| # | GPT 제안 | 적용 | 시점 |
|---|---------|------|------|
| 4 | 9개 에이전트 체제 | ✅ seedBlocks.js에 9개 에이전트 정의 | v3 적용 시 |
| 5 | ActionContract 블록 신설 | ✅ `action_contract` 블록 + `buildActionContract()` 함수 | v3 적용 시 |
| 6 | trustInfo 변수 추가 | ✅ `trust_info` 블록 + 변수 생성 | v3 적용 시 |
| 7 | skillOverlay 변수 추가 | ✅ `skill_overlay` 블록 + `buildSkillOverlay()` 함수 | v3 적용 시 |
| 8 | evidenceAxis 변수 추가 | ✅ `evidence_axis` 블록 + `buildEvidenceAxis()` 함수 | v3 적용 시 |
| 9 | focusedDisputeId 변수 추가 | ✅ `lie_state_guide` 블록에 포함 + 변수 생성 | v3 적용 시 |
| 10 | 에이전트 라우팅 (액션→에이전트) | ✅ `resolveAgentKey()` 함수 | v3 적용 시 |
| 11 | judgeQuestion 엔진 우선 | ✅ `buildJudgeQuestion()` 항상 사용, LLM에서 제거 | v3 적용 시 |
| 12 | 컨텍스트 필터링 (대화/증거) | ✅ 쟁점 관련 대화만 + target에게 제시된 증거만 | v3 적용 시 |
| 13 | free_question 2콜 분리 | ✅ `llmFreeQuestion.ts` 전면 재작성 | v3 적용 시 |
| 14 | witnessEngine 에이전트화 | ✅ `witnessEngine.ts` 전면 재작성 | v3 적용 시 |
| 15 | investigationResult 런타임 연결 | ✅ 사건 JSON의 `investigationResults`에서 수행된 조사 결과 추출 | 누락 후 보완 |

---

## v3: 정식출시용 프롬프트 블록 (solomon_release_prompt_seed_v3.json)

### 블록 27개 (GPT 작성 → Claude 적용)

| # | 블록 key | GPT content | 적용 | 비고 |
|---|----------|-------------|------|------|
| 1 | `character_base` | 역할 원칙 + 창작 금지 추가 | ✅ DB 반영 완료 | |
| 2 | `naming_rules` | private/separation 예외 허용 추가 | ✅ DB 반영 완료 | |
| 3 | `dialogue_rules` | responseMode 우선 규칙으로 전면 교체 | ✅ DB 반영 완료 | |
| 4 | `speech_guide_short` | 기존 유지 | ✅ DB 반영 완료 | |
| 5 | `phase3_guide` | 초기 방어 톤 구체화 | ✅ DB 반영 완료 | |
| 6 | `phase4_guide` | 증거 심리 반응 구체화 | ✅ DB 반영 완료 | |
| 7 | `phase5_guide` | 피로/고백 가능성 강화 | ✅ DB 반영 완료 | |
| 8 | `phase_history_context` | 연결 규칙 강화 | ✅ DB 반영 완료 | |
| 9 | `lie_state_guide` | focusedDisputeId 중심 스코핑 강화 | ✅ DB 반영 완료 | |
| 10 | `action_contract` | 이번 턴 행동 계약 (최우선) | ✅ DB 반영 완료 | |
| 11 | `trust_info` | 신뢰/위축 해석 원칙 | ✅ DB 반영 완료 | |
| 12 | `skill_overlay` | 스킬 적용 원칙 | ✅ DB 반영 완료 | |
| 13 | `question_type_guide` | few-shot good/bad 예시 | ✅ DB 반영 완료 | |
| 14 | `evidence_axis` | 4축 반응 원칙 | ✅ DB 반영 완료 | |
| 15 | `investigation_result_guide` | 조사 결과 발명 금지 | ✅ DB 반영 완료 | |
| 16 | `private_interrogation_rules` | 비공개 심문 전용 규칙 | ✅ DB 반영 완료 | |
| 17 | `evidence_reaction_rules` | 증거 반응 전용 규칙 | ✅ DB 반영 완료 | |
| 18 | `output_json_npc` | judgeQuestion 제거, stance/mentionedTruthIds 추가 | ✅ DB 반영 완료 | |
| 19 | `free_question_classifier_rules` | 분류 전용 | ✅ DB 반영 완료 | |
| 20 | `output_json_free_question_classifier` | 분류 출력 형식 | ✅ DB 반영 완료 | |
| 21 | `free_question_responder_rules` | 응답 규칙 | ✅ DB 반영 완료 | |
| 22 | `witness_base` | 증인 프로필 + 18개 변수 | ✅ DB 반영 완료 | |
| 23 | `witness_dialogue_rules` | 증언 범위 제어 | ✅ DB 반영 완료 | |
| 24 | `output_json_witness` | 증언 출력 형식 | ✅ DB 반영 완료 | |
| 25 | `testimony_analysis_rules` | followupHints 추가 | ✅ DB 반영 완료 | |
| 26 | `phase1_gen_rules` | 번역체 금지 강화 | ✅ DB 반영 완료 | |
| 27 | `phase2_gen_rules` | 반박 리듬 강화 | ✅ DB 반영 완료 | |

### 에이전트/매핑/필드 (GPT 설계 → Claude 적용)

| 항목 | GPT 설계 | 적용 |
|------|---------|------|
| 에이전트 9개 + temperature + max_tokens | ✅ 전부 적용 | |
| 에이전트-블록 매핑 67개 (조건부 포함) | ✅ 전부 적용 | |
| 데이터 필드 24개 추가분 | ✅ 전부 적용 | |
| 레거시 `free_question` / `free_question_rules` 삭제 | ✅ DB에서 삭제 완료 | 누락 후 보완 |

### User Message 템플릿 17종 (GPT 설계 → Claude 적용)

| # | 템플릿 | 적용 | 시점 |
|---|--------|------|------|
| 1 | question.fact_pursuit | ✅ `buildUserPrompt()` | 누락 후 보완 |
| 2 | question.motive_search | ✅ `buildUserPrompt()` | 누락 후 보완 |
| 3 | question.empathy_approach | ✅ `buildUserPrompt()` | 누락 후 보완 |
| 4 | evidence_present | ✅ `buildUserPrompt()` | 누락 후 보완 |
| 5~10 | evidence_investigate × 6종 | ✅ `buildUserPrompt()` | 누락 후 보완 |
| 11~14 | trust_action × 4종 | ✅ `buildUserPrompt()` | 누락 후 보완 |
| 15 | free_question_classifier | ✅ `llmFreeQuestion.ts` | v3 적용 시 |
| 16 | free_question_responder | ✅ `llmFreeQuestion.ts` | v3 적용 시 |
| 17 | witness_call | ✅ `witnessEngine.ts` | v3 적용 시 |

### actionContractSamples (GPT 설계 → Claude 구현)

| 항목 | 적용 |
|------|------|
| JSON 형식 (actionType, questionType, responseMode, goal, revealBudget, truthIds) | ✅ |
| 액션별 goal 문구 | ✅ 14종 하드코딩 |
| responseMode 결정 로직 | ✅ 액션+스킬 상태 기반 |
| revealBudget 계산 | ✅ lieState 기반 |
| allowedTruthIds / forbiddenTruthIds | ✅ v4 truthPolicy 연결 |

### 변수 형식 (GPT 기대 → Claude 구현)

| 변수 | GPT 기대 형식 | 최초 구현 | 수정 후 | 시점 |
|------|-------------|-----------|---------|------|
| actionContract | JSON 객체 | ❌ `key=value` 문자열 | ✅ JSON | 누락 후 보완 |
| trustInfo | JSON 객체 | ❌ `key=value` 문자열 | ✅ JSON | 누락 후 보완 |
| evidenceAxis | JSON 객체 | ❌ `key=value` 문자열 | ✅ JSON | 누락 후 보완 |
| skillOverlay | 구조화 텍스트 | ❌ 평문 1줄 | ✅ `[분리심문 활성]\n-...` | 누락 후 보완 |
| investigationResult | 줄바꿈 텍스트 | ❌ 빈 문자열 고정 | ✅ 사건 JSON에서 추출 | 누락 후 보완 |
| focusedDisputeId | 문자열 | ✅ 처음부터 적용 | - | v3 적용 시 |

---

## v4: 병렬 작업 패키지 (solomon_parallel_work_A1_A4_A2_A3_pack.json)

### A1: truthPolicy (GPT 작성 → Claude 연결)

| 항목 | 적용 |
|------|------|
| 3사건 × 2당사자 × 5쟁점 × S0~S5 매핑 | ✅ `src/data/truthPolicy.ts` 상수 파일 |
| `buildActionContract()`에서 참조 | ✅ `getTruthIds()` 함수 |
| 폴백 규칙 (매핑 없는 81개 사건용) | ✅ `getFallbackPolicy()` |
| `caseId × party × disputeId × lieState` 4차원 구조 | ✅ |
| S0~S1 빈 배열 보수 정책 | ✅ |
| `forbiddenTruthIds = allTruthIds - allowedTruthIds` | ✅ v4 states_full.forbidden 직접 사용 |

### A2: witnessBudget (GPT 작성 → Claude 연결)

| 항목 | 적용 |
|------|------|
| 10명 증인(3사건)의 canState/uncertain/forbidden | ✅ `src/data/witnessBudget.ts` 상수 파일 |
| `witnessEngine.ts`에서 참조 | ✅ `formatWitnessBudget()` |
| bullet text로 변환하여 `{witnessBudget}` 변수 주입 | ✅ |

### A3: eval 15케이스 (GPT 작성 → Claude 미적용)

| 항목 | 적용 |
|------|------|
| 15개 케이스 설계 | 데이터만 수령, 코드 미적용 |
| evalRunner 구현 | ❌ 미착수 — GPT에게 자동 검증 로직 요청 예정 |

### A4: User Message 검토 (GPT 검토 → Claude 수정)

| # | GPT 지적 | 적용 | 시점 |
|---|---------|------|------|
| 1 | question 3종에 focusedDisputeName 추가 필요 | ✅ 전 액션 템플릿에 `focusedDisputeName` 추가 | v4 적용 시 |
| 2 | evidence_investigate에 evidenceName 추가 권장 | ✅ subAction 라벨에 포함 | v4 적용 시 |
| 3 | trust_action 전용 judgeQuestion 템플릿 필요 | ✅ 4종 신규 작성 (confidential 2변형, separation 2변형, emotional 1종, retaliation 1종) | v4 적용 시 |
| 4 | free_question_responder에 focusedDisputeId 실제 값 노출 필요 | ✅ user message에 `focusedDisputeId: ${primaryDisputeId}` 명시 | v4 적용 시 |
| 5 | evidence_investigate용 judgeQuestion 템플릿 필요 | ✅ 6종 신규 작성 | 누락 후 보완 → v4 적용 시 |
| 6 | evidence_investigate 액션 자체가 미처리 (return null) | ✅ action type 필터 확장 + 6종 User Message + 6종 judgeQuestion | 누락 후 보완 |

### A4: investigation_result 연결 검증 (GPT 확인)

| 항목 | GPT 판정 | 적용 |
|------|---------|------|
| spouse-01 investigationResults 6종과 자연스럽게 연결 | ✅ 확인됨 | ✅ `buildInvestigationResult()` |

---

## 누락 후 보완 요약

Claude Code가 처음에 빠뜨렸다가 나중에 수정한 항목:

| # | 항목 | 원인 | 보완 시점 |
|---|------|------|-----------|
| 1 | 변수 형식 4종 (actionContract/trustInfo/evidenceAxis/skillOverlay) | v3 JSON 형식을 코드에 key=value로 단순화 | 유저 지적 후 |
| 2 | evidence_investigate 6종 미처리 | action type 필터에서 누락 | 유저 지적 후 |
| 3 | investigationResult 빈 문자열 고정 | 연결 코드 미작성 | 유저 지적 후 |
| 4 | User Message 템플릿 17종 미적용 | v3의 userMessageTemplates를 코드에 반영 안 함 | 유저 지적 후 |
| 5 | DB 레거시 데이터 잔존 (free_question, free_question_rules) | seed 시 기존 데이터 삭제 안 함 | 유저 지적 후 |
| 6 | 데이터 필드 추가분 누락 (증인 관련 20개) | 생성 스크립트가 기존 dataFields만 복사 | 직접 발견 후 |

---

## 현재 전달 파일 목록

```
에이전트_전달용_코드/
├── seedBlocks.js              — 27블록 + 9에이전트 + 67매핑 + 49필드
├── llmDialogueResolver.ts     — 핵심: 라우팅, 변수 생성, truthPolicy, User Message
├── llmFreeQuestion.ts         — 2콜 분리 (classifier→responder)
├── witnessEngine.ts           — 에이전트 연결 + witnessBudget
├── truthPolicy.ts             — v4 A1 데이터 (3사건 30매핑 + 폴백)
└── witnessBudget.ts           — v4 A2 데이터 (10명 증인)

GPT_전달용_종합정리.md          — 시스템 최종 상태 + 검토 요청 4가지
GPT_제안_적용_추적표.md         — 이 문서 (v1~v4 전체 추적)
```

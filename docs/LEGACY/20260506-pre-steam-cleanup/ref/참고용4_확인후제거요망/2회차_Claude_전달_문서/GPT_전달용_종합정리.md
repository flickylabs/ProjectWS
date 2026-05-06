# 솔로몬 AI 프롬프트 리뉴얼 — 종합 적용 결과 및 검토 요청

> Claude Code가 v3(프롬프트 블록) + v4(truthPolicy/witnessBudget/evalCases/userMessageReview) 패키지를 코드에 적용한 전체 결과입니다.
> GPT Pro의 최종 검토 + 후속 작업을 요청합니다.

---

## 1. 현재 시스템 최종 상태

### DB (seedBlocks.js → SQLite)
| 항목 | 수량 |
|------|------|
| Prompt Blocks | 27개 (v3 content 100% 일치 확인됨) |
| AI Agents | 9개 (레거시 `free_question` 삭제 완료) |
| Agent-Block 매핑 | 67개 |
| Data Fields | 49개 |

### 에이전트 체제 (9개)
| Agent | Temp | Tokens | 역할 |
|-------|------|--------|------|
| `interrogation` | 0.75 | 320 | 공개 심문 (Phase 3~5) |
| `interrogation_private` | 0.65 | 320 | 비공개/분리 심문 |
| `evidence_reaction` | 0.65 | 340 | 증거 제시 + 증거 조사 6종 반응 |
| `free_question_classifier` | 0.10 | 180 | 자유질문 분류 (1콜) |
| `free_question_responder` | 0.75 | 320 | 자유질문 응답 (2콜) |
| `witness_testimony` | 0.70 | 320 | 증인 증언 |
| `testimony_analysis` | 0.30 | 900 | 진술 분석 |
| `phase1_generator` | 0.85 | 4000 | Phase 1 대사 생성 (폴백용) |
| `phase2_generator` | 0.85 | 3000 | Phase 2 대사 생성 (폴백용) |

### 에이전트 라우팅
| 액션 | → Agent |
|------|---------|
| `question` (공개) | `interrogation` |
| `question` (분리심문 중) | `interrogation_private` |
| `evidence_present` | `evidence_reaction` |
| `evidence_investigate` (6종) | `evidence_reaction` |
| `trust_action` (4종) | `interrogation_private` |
| 자유질문 1콜 | `free_question_classifier` |
| 자유질문 2콜 | `free_question_responder` |
| 증인 소환 | `witness_testimony` |

---

## 2. 변수 생성 형식 (v3/v4 반영 완료)

| 변수 | 형식 | 예시 |
|------|------|------|
| `actionContract` | JSON | `{"actionType":"question","questionType":"fact_pursuit","responseMode":"answer_only","goal":"날짜·금액·행위 여부를 고정한다","revealBudget":{"fact":2,"motive":0,"emotion":0},"allowedTruthIds":[],"forbiddenTruthIds":["t-1","t-2","t-3","t-4","t-5"]}` |
| `trustInfo` | JSON | `{"trustTowardJudge":30,"fearOfExposure":50,"retaliationWorry":30}` |
| `evidenceAxis` | JSON | `{"reliability":"hard","completeness":"original","provenance":"institutional","legitimacy":"lawful"}` |
| `skillOverlay` | 구조화 텍스트 | `[분리심문 활성]\n- responseMode: answer_only\n- 상대 직접 언급, 도발, 과시적 연기를 줄인다\n- retaliationWorry 감소 상태` |
| `investigationResult` | 줄바꿈 텍스트 | `request_original: 원본 확인됨. 수신인: 김○○, 금액: 280만원\ncheck_metadata: 수정 이력 없음` |
| `focusedDisputeId` | 문자열 | `d-1` |
| `witnessBudget` | 구조화 텍스트 | `말할 수 있는 것:\n- 추석 연휴 돌봄 공백\n불확실한 것:\n- 280만원 송금의 정확한 시각\n절대 말하면 안 되는 것:\n- 휴대폰 무단 열람 경위` |

---

## 3. v4 A1 적용: truthPolicy 연결

### 구현 방식
- 파일: `src/data/truthPolicy.ts` — 3개 사건 × 2당사자 × 5쟁점 × S0~S5 매핑 상수
- `buildActionContract()` → `getTruthIds()` → `TRUTH_POLICIES[caseId][party][disputeId][lieState]`
- 매핑이 없는 사건/쟁점은 `getFallbackPolicy()` 적용 (S0~S1: 전체 forbidden, S2~S3: anchor만 forbidden, S5: 전체 allowed)

### GPT Pro 권고 반영 사항
- ✅ `caseId × party × disputeId × lieState` 4차원 매핑
- ✅ S0~S1에서 allowedTruthIds 빈 배열 — "보수적으로 비워 두고 revealBudget으로 좁히는" 방식
- ✅ `forbiddenTruthIds`는 v4 `states_full.forbidden` 그대로 사용 (allTruthIds - allowed 보수 정책)

### 검토 요청
- 폴백 규칙의 `anchorTruthIds` 추론 로직이 적절한지 (현재: `t-{disputeId 숫자}` 단순 매핑)
- 나머지 81개 사건에 대해 이 폴백이 충분한지, 더 정교한 일반 규칙이 필요한지

---

## 4. v4 A2 적용: witnessBudget 연결

### 구현 방식
- 파일: `src/data/witnessBudget.ts` — 10명 증인(3사건)의 canState/uncertain/forbidden
- `witnessEngine.ts` → `formatWitnessBudget(caseData, witnessId)` → `WITNESS_BUDGETS[caseId][witnessId]`
- 텍스트로 포매팅하여 `{witnessBudget}` 변수에 주입 → `witness_base` 블록에서 사용

### 검토 요청
- 증인 증언 생성 시 이 budget이 실제로 잘 제어되는지 (특히 `forbidden` 항목 누설 방지)
- 나머지 81개 사건의 243명 증인에 대한 budget 작성 전략

---

## 5. v4 A4 적용: User Message 보강

### 적용된 수정사항

| GPT Pro 지적 | 적용 상태 |
|-------------|-----------|
| question 3종에 `focusedDisputeName` 추가 | ✅ 전 액션에 `focusedDisputeName: ${dispute.name}` 추가 |
| evidence_investigate 6종에 `{evidenceName}` 추가 | ✅ 각 subAction 라벨에 증거명 포함 |
| trust_action의 전용 judgeQuestion 템플릿 | ✅ 4종 신규 작성 (아래 상세) |
| free_question_responder에 focusedDisputeId 실제 값 노출 | ✅ user message에 `focusedDisputeId: ${primaryDisputeId}` 명시 |

### trust_action 전용 judgeQuestion (신규)

```
confidential_protection:
  "{name} 씨, 이 말은 상대에게 즉시 공개되지 않습니다. 편하게 말씀해 주세요."
  "{name} 씨, 지금 하시는 말씀은 비공개입니다. 솔직하게 말씀하셔도 됩니다."

separation:
  "{name} 씨, 지금은 상대 개입 없이 말씀하실 수 있습니다. {topic}에 대해 다시 설명해 주시겠습니까?"

emotional_stabilization:
  "{name} 씨, {topic} 때문에 감정이 올라온 건 이해합니다. 잠시 정리하시고 다시 설명해 주시겠습니까?"

retaliation_check:
  "{name} 씨, {topic}에 관해 지금 말을 아끼는 이유가 있으시다면 말씀해 주십시오."
```

### evidence_investigate 전용 judgeQuestion (신규)

```
request_original: "{name} 씨, 이 증거의 원본을 확인했습니다. 이에 대해 하실 말씀이 있습니까?"
check_metadata: "{name} 씨, 이 증거의 생성 시점과 수정 이력을 확인했습니다."
restore_context: "{name} 씨, 이 증거의 앞뒤 맥락을 복원했습니다. 설명해 주시겠습니까?"
verify_source: "{name} 씨, 이 증거의 출처를 검증했습니다."
check_edits: "{name} 씨, 이 증거의 편집 여부를 확인했습니다."
question_acquisition: "{name} 씨, 이 증거가 어떻게 확보되었는지 확인했습니다."
```

### User Message 전체 액션 지원 현황 (17종)

| 액션 | User Message 템플릿 | judgeQuestion 템플릿 | Agent 라우팅 |
|------|---------------------|---------------------|--------------|
| question.fact_pursuit | ✅ v3+disputeName | ✅ 2변형 | interrogation |
| question.motive_search | ✅ v3+disputeName | ✅ 2변형 | interrogation |
| question.empathy_approach | ✅ v3+disputeName | ✅ 3변형 | interrogation |
| evidence_present | ✅ v3 | ✅ 1종 | evidence_reaction |
| evidence_investigate × 6종 | ✅ v3 | ✅ 6종 신규 | evidence_reaction |
| trust_action.confidential | ✅ v3 | ✅ 2변형 신규 | interrogation_private |
| trust_action.separation | ✅ v3 | ✅ 2변형 신규 | interrogation_private |
| trust_action.emotional_stabilization | ✅ v3 | ✅ 1종 신규 | interrogation_private |
| trust_action.retaliation_check | ✅ v3 | ✅ 1종 신규 | interrogation_private |
| free_question_classifier | ✅ 2콜 1단계 | N/A | free_question_classifier |
| free_question_responder | ✅ 2콜 2단계+focusedDisputeId | N/A | free_question_responder |
| witness_call | ✅ | N/A | witness_testimony |

---

## 6. 코드 구조 변경 전체 목록

### 수정된 파일

| 파일 | 주요 변경 |
|------|-----------|
| `server/db/seedBlocks.js` | v3 JSON 기반 전면 교체 (27블록, 9에이전트, 67매핑, 49필드) |
| `src/engine/llmDialogueResolver.ts` | 에이전트 라우팅, 변수 6종(JSON 형식), 컨텍스트 필터링, judgeQuestion 엔진 우선, evidence_investigate 6종 처리, v4 truthPolicy 연결, v4 User Message 템플릿 |
| `src/engine/llmFreeQuestion.ts` | 2콜 분리 (classifier→responder), focusedDisputeId 명시 |
| `src/engine/witnessEngine.ts` | 에이전트 블록 조합 사용, v4 witnessBudget 연결 |

### 신규 생성 파일

| 파일 | 내용 |
|------|------|
| `src/data/truthPolicy.ts` | 30개 매핑 (3사건 × 2당사자 × 5쟁점) + 폴백 규칙 |
| `src/data/witnessBudget.ts` | 10명 증인 budget (3사건) |

### P0 버그 수정 (v2에서 발견)

| 버그 | 수정 |
|------|------|
| Phase 조건값 불일치 (`Phase3_Interrogation` vs `phase3`) | condValue를 소문자로 수정 |
| free_question 변수 누락 (relationship, context, formalityGuide) | 3개 변수 + import 추가 |
| trust_action에 disputeId 없음 | 최근 심문 쟁점 자동 추론 |

---

## 7. 아직 미완료 항목

| 항목 | 상태 | 비고 |
|------|------|------|
| 나머지 81개 사건 truthPolicy | 폴백 규칙으로 동작 | 정교화 필요 |
| 나머지 243명 증인 witnessBudget | 데이터 없음 (빈 문자열) | 콘텐츠 작업 필요 |
| 세션 이벤트 서버 로깅 | 미착수 | P3 후순위 |
| 프롬프트 버전 스냅샷 | 미착수 | P3 후순위 |
| 중재안(Phase 6) 에이전트 | 미설계 | 후속 작업 |

---

## 8. GPT Pro에게 요청하는 작업 (이번 1회 출력으로)

### 요청 1: 전체 정합성 최종 검토

위 1~6의 구현 결과를 검토하여:
- 블록 content와 변수 형식이 정합하는지
- actionContract JSON 구조가 `action_contract` 블록 프롬프트와 맞는지
- responseMode 결정 로직이 적절한지
- 쟁점 순서 민감도가 충분한지 (historyContext + recentDialogue 필터링)
- evidence_investigate 6종의 흐름이 자연스러운지

문제가 있으면 **구체적 수정 지시** (파일명 + 변경 내용)를 주세요.

### 요청 2: A3 eval 15케이스 기반 테스트 시나리오

v4에서 설계한 15개 eval 케이스를 기반으로:
- 각 케이스의 **실제 System Prompt + User Message 조합 예시** 작성
- 기대 출력 JSON 예시 (npcResponse, stance, mentionedTruthIds 등)
- **자동 검증 가능한 체크 함수 로직** (mentionedTruthIds가 forbiddenTruthIds에 포함되면 FAIL 등)

이걸로 `evalRunner.ts`를 만들 수 있게 해주세요.

### 요청 3: 중재안(Phase 6) 에이전트 설계

Phase 6에서 필요한:
- 에이전트 설정 (key, temperature, max_tokens)
- 블록 조합 (기존 블록 재사용 + 신규 블록)
- 신규 블록 content (중재안 제시 → NPC 반응 4분류: accept/reject/conditional/counterproposal)
- User Message 템플릿
- output JSON 형식

### 요청 4: 81개 사건 확장 전략

현재 3개 샘플에 적용된 규칙을 81개로 확장하기 위한:
- truthPolicy 자동 생성 규칙 정교화 (현재 폴백이 충분한지, 관계 유형별 차이가 필요한지)
- witnessBudget 자동 생성 가능 여부 (knowledgeScope + bias + distortionRisk에서 자동 추론 가능한지)
- 수동 작성이 필요한 사건의 기준 (어떤 조건일 때 수동 매핑이 필요한지)

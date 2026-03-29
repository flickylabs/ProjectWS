# 솔로몬 설계 논의 요청 — 종합 패키지

> AI 프롬프트 리뉴얼(v3~v6) 완료 후, eval 테스트에서 발견된 **설계 레벨 고민 13가지**에 대해 논의를 요청합니다.
> 현재 GPT가 truthPolicy/witnessBudget 84개 생성 작업(요청 6) 중이므로, **지금 방향을 확정하면 나머지 19배치에 반영 가능**합니다.

---

## Part 1: 게임 핵심 요약 (GDD 기반)

### 게임 컨셉
- **솔로몬**: 두 AI 당사자의 갈등을 플레이어(재판관)가 심문·증거·스킬로 진실을 파헤치고 판결하는 게임
- 타깃: 20~30대, 스토리/시뮬레이션 선호
- 84개 사건 (7관계 × 12), 504개 증거, 253명 증인, 420개 쟁점

### Phase 흐름
```
Phase 0 사건개요 → Phase 1~2 초기진술/반박(NO LLM, 사전 스크립트)
→ Phase 3 심문(AI) → Phase 4 증거심리(AI) → Phase 5 최종심문(AI)
→ Phase 6 중재안(선택) → Phase 7 판결 → 결과
```

### 액션 체계
| 카테고리 | 액션 | 소모 |
|----------|------|------|
| 심문 | 사실추궁 / 동기탐색 / 공감접근 / 자유질문(AI) | 자유질문만 🔍1 |
| 증거 | 증거제시 / 증거조사(6종) / 증거조합 격상 | 조사 🔍1 |
| 스킬(토글) | 회피판독 / 비공개보호 | ⚡1 / 무료 |
| 스킬(액티브) | 이의제기 / 분리심문 / 즉답요구 | ⚡1 / ⚖️1 / ⚡1+⚖️1 |
| 증인 | 증인소환 + AI증언 | 🔍1 |

### 거짓말 상태머신 (쟁점 단위)
```
S0(숨김) → S1(주장) → S2(충돌) → S3(붕괴) → S4/S5(재프레이밍/인정)
경로: 압박 루트(증거+사실추궁) vs 신뢰 루트(공감+비공개보호)
```

### 현재 점수 체계
- 🔍 통찰(insight): 사실 적중 + 책임 비율 + 거짓말 붕괴 보너스
- ⚖️ 권위(authority): 절차 통제 + 증거 활용 + 턴 효율
- 💡 지혜(wisdom): 판단 적절성 + 해결책 + 모호한 쟁점 보류

### 리소스
- 🔍 조사 토큰 6개 / ⚡ 스킬 포인트 5 / ⚖️ 법정 통제력 3

### NPC 성격 아키타입 (4종)
- avoidant: 회피형 — 시선 피하고, 에둘러 말함
- confrontational: 대결형 — 즉각 반박, 상대 공격
- victim_cosplay: 피해자 연기 — 약한 목소리, 억울함 호소
- cold_logic: 냉정 논리 — 감정 없이 조목조목

### 거짓말 동기 (lieMotive, 7종)
- self_protection / face_saving / shame_avoidance / relationship_maintenance / revenge / third_party_protection / career_preservation

---

## Part 2: AI 프롬프트 시스템 현재 상태 (v6)

### 에이전트 10개
| Agent | 용도 | Temp | Tokens |
|-------|------|------|--------|
| interrogation | 공개 심문 | 0.75 | 320 |
| interrogation_private | 비공개/분리 | 0.65 | 320 |
| evidence_reaction | 증거 반응 | 0.65 | 340 |
| free_question_classifier | 자유질문 분류 | 0.10 | 180 |
| free_question_responder | 자유질문 응답 | 0.75 | 320 |
| witness_testimony | 증인 증언 | 0.70 | 320 |
| mediation_reaction | 중재안 반응 | 0.60 | 360 |
| testimony_analysis | 진술 분석 | 0.30 | 900 |
| phase1_generator | Phase1 생성(폴백) | 0.85 | 4000 |
| phase2_generator | Phase2 생성(폴백) | 0.85 | 3000 |

### 핵심 런타임 변수 (System Prompt에 주입)
- `actionContract` (JSON): 액션타입, responseMode, goal, revealBudget, allowedTruthIds, forbiddenTruthIds
- `trustInfo` (JSON): trustTowardJudge, fearOfExposure, retaliationWorry
- `evidenceAxis` (JSON): reliability, completeness, provenance, legitimacy
- `skillOverlay`: 분리심문/비공개보호 효과
- `focusedDisputeId` + `disputeInfo`: 현재 쟁점 + lie state 행동 지시
- `knownFacts`: 해당 party가 아는 사실 (쟁점 관련 필터)
- `historyContext`: 심문 이력 (몇 번째 질문, 이전 유형, 상대 폭로 여부)

### TruthGuard
- LLM 응답의 `mentionedTruthIds`가 `forbiddenTruthIds`에 포함되면 경고 + 누출 ID 제거

### Eval 시스템
- WebAdmin에 Eval Test 페이지 (Preset 15케이스 + Custom 테스트)
- 검증: JSON 파싱, 최소 길이, truth 누출, stance 범위, responseMode, 금지 키워드

---

## Part 3: Eval 테스트 결과 (9 PASS / 6 FAIL)

| ID | 결과 | stance | 비고 |
|----|------|--------|------|
| E01 | ✅ | deny | |
| E02 | ❌ | hedge ✓ | mode: empathy_approach (기대: answer_only) |
| E03 | ✅ | reframe | |
| E04 | ❌ | deny | S3에서 deny (기대: partial_admit/hedge) |
| E05 | ❌ | deny | S4+confidential에서 deny (기대: partial_admit/reframe) |
| E06 | ✅ | deny | |
| E07 | ✅ | hedge | |
| E08 | ✅ | deny | |
| E09 | ❌ | deny | S3에서 deny |
| E10 | ❌ | deny | S4+confidential에서 deny |
| E11 | ✅ | deny | |
| E12 | ✅ | hedge | |
| E13 | ✅ | reframe | |
| E14 | ❌ | deny | S3에서 deny |
| E15 | ✅ | admit | |

---

## Part 4: 설계 고민 13가지

### 고민 1~5: 액션/심문/증거/스킬 차별화

**1. 하위 액션(fact/motive/empathy) 차별화 부족**
- 현재: 세 액션의 결과 내용이 거의 동일. 말투만 약간 다름.
- 방향: lieMotive × 액션 상성으로 답변 내용 + 점수 차별화

**2. 심문 순서에 따른 답변/점수 차이**
- 현재: historyContext로 맥락은 전달되지만 점수에 미반영
- 방향: 효율적 순서로 심문하면 보너스? 특정 쟁점 먼저 풀면 다른 쟁점 전이가 쉬워지는 의존 관계?

**3. 증거 ↔ 심문 연계**
- 현재: 증거 제시 → lie state 전이 트리거. 하지만 "증거를 보여준 후 심문"의 시너지가 약함.
- 방향: 증거 제시 후 심문이 더 효과적이어야 (점수 + AI 응답 깊이)

**4. eval stance 기준**
- S3~S4에서 deny가 반복. "버그"인지 "사실적"인지 판단 필요.

**5. 스킬 타이밍/콤보**
- 적절한 타이밍에 스킬 사용 → 보너스? 분리심문→비공개→공감 콤보?

### 고민 6~10: 캐릭터/증인/Phase 변별력

**6. 증인 말투/성격 변별력**
- 현재: speechStyle 1줄로만 구분. 기관 담당자와 가족과 친구가 비슷하게 말함.
- 방향: 증인 유형별 예시 증언(few-shot) 추가

**7. NPC 아키타입(성격) 실질 반영**
- 현재: behaviorHint에만 영향. 대사 내용 자체에는 영향 약함.
- 방향: "avoidant는 직접 답 안 하고 동선으로 시간 벌기" 같은 강한 규칙

**8. 교차 당사자 반응 자연스러움**
- 현재: 자동 트리거(S3→반박, S4/S5→충격)는 있지만 구체적 발언 참조 약함

**9. Phase 간 체감 차이**
- Phase 3(경계) vs Phase 5(고백 가능)의 깊이 차이가 불충분

**10. 증거 유형별 반응 차이**
- 은행 기록(hard) vs 메신저 캡처(soft)에 대한 구체적 반응 패턴 부재

### 고민 11~13: 시스템 설계 (신규)

**11. 태그 기반 액션 상성 시스템**
- **캐릭터에 성향 태그**: `["회피형", "수치심_민감", "체면_중시"]`
- **쟁점에 특성 태그**: `["금전", "관계_배신", "비밀_은닉"]`
- 태그 매칭으로 상성 계산 → 확장성 높음, 새 캐릭터/쟁점 추가 시 태그만 부여

**12. 심층 확장 (심문/증거로 이야기 확장)**
- 심문 깊이에 따라 **새로운 사실/반전** 해금
- 표면 truth → 심층 truth → 핵심 truth 계층 구조
- 반전 모듈(TW-1~TW-6)이 이미 설계되어 있지만 런타임 활성화 구조 필요

**13. 스코어링 재설계**
- **기본 점수**: 사실 판단 정확도 + 책임 비율 + 해결책
- **과정 보너스**: 필수 경로를 충실히 거쳤을 때 최고 점수. 최소 턴이 최고가 아님.
  - 상성 맞는 액션 선택 보너스
  - 심층 truth 해금 보너스
  - 양측 균형 심문 보너스
- **과정 패널티**: 불필요한 반복, 상성 안 맞는 액션 남발, 증거 없이 S5 달성

---

## Part 5: truthPolicy 84개 생성에 함께 추가 요청

현재 GPT가 4개씩 배치로 진행 중 (2배치 완료, 19배치 남음).
아래 데이터를 **나머지 배치에 함께 포함**시키고, 완료된 2배치는 보충하면 효율적입니다.

| 추가 데이터 | 내용 | 작업량 |
|------------|------|--------|
| **personalityTags** | 캐릭터 성향 태그 (캐릭터당 3~5개) | 작음 |
| **contentTags** | 쟁점 특성 태그 (쟁점당 2~3개) | 작음 |
| **truthCategory** | truth별 fact/motive/emotion 분류 (truth당 1개) | 작음 |
| **actionAffinity** | 쟁점별 최적/최악 액션 + 점수 가중치 | 중간 |
| **optimalPath** | 쟁점별 최적 심문 경로 + 필수 액션 | 중간 |
| **witnessSpeechSample** | 증인별 예시 증언 1~2개 | 중간 |

---

## Part 6: 논의 요청

### 요청 1: 설계 방향 확정
- 고민 11(태그 상성) / 고민 12(심층 확장) / 고민 13(스코어링) 중 이번 버전에서 반영할 범위
- 태그 시스템 채택 시 기본 태그 체계(어떤 태그들이 있어야 하는지)

### 요청 2: 상성표 검토
- lieMotive × 액션 상성 초안 검토 및 보완
- 점수 가중치 구체화 (상성 맞으면 몇 배? 안 맞으면?)

### 요청 3: truthPolicy 생성 프롬프트 업데이트
- 위 추가 데이터를 포함한 수정된 배치 요청 프롬프트 작성

### 요청 4: eval 기대값 조정
- S3~S4에서 deny를 허용할지
- responseMode 혼동 방지 방안
- 분리심문/비공개보호의 설계 의도 재확인

---

## 첨부 파일 목록

| 파일 | 내용 |
|------|------|
| **설계_고민_종합정리.md** | 이 문서 |
| **사건 JSON 샘플** | spouse-01.json (구조 참고용) |
| **evalCases.ts** | 15개 eval 케이스 데이터 |
| **llmDialogueResolver.ts** | 핵심 엔진 코드 (변수 생성, 라우팅, TruthGuard) |
| **verdictEngine.ts** | 현재 점수 계산 로직 |
| **lieStateMachine.ts** | 거짓말 전이 규칙 |

# CT 세션 인수인계 (2026-04-06)

> 발신: 현재 CT 세션
> 수신: 다음 CT 세션
> 상태: Phase 1 품질 잠금 2차 시도 실패, 2차 수정 후 재재검증 필요

---

## 이번 세션에서 완료한 것

### Codex 협업 체계 확인
- 합의 문서 8개 전수 숙지 (master-plan-v3, 엔진 감사, Phase 2 설계 등)
- R&R 확정: CT=통합판단+실행조율, Codex=독립검증+구조피드백, GPT Pro=대량데이터

### Codex 84×3 LLM 테스트 수신 + 분석
- 84건×3회=252회/5,040턴 결과 수신 (`tests/84-llm-quality-report.md`)
- 결과: **Phase 1 실패** — CRITICAL 13, FAIL 32 (기준: CRITICAL 0, FAIL ≤10)

### B4 근본 원인 발견
- S5 v2-atoms의 금액 포함 atom이 `usableInSubActions: ["fact_pursuit", "evidence_present"]`로 제한
- motive_search/empathy_approach에서 금액 atom 접근 불가 → **데이터 이슈**
- 엔진(stance=confess 매핑)과 프롬프트(Truth Throttle open)는 정상 확인

### Phase 1 P0/P1 수정 9단계 완료
- `postProcessNpcText()` 공통 후처리 함수 추출 (두 경로 통합)
- `enforceTruthThrottle` (S0-S1 금액/실명 치환)
- `enforceMonetaryGuard` (비금전 사건 금전 표현 치환)
- `atomSelectionEngine` S0-S1 강제 neutral + slotMaterial 제외
- `enforceHaeyoMidSentence` (문장 중간 해요체)
- `enforceClicheFilter` (미리말씀/불찰/특정X)
- "만을" 정규식 수정
- S5 exact-slot rescue (조건부 보강)
- S5 후처리 검증 (금액 미포함 경고 로그)
- **tsc + build 통과 확인**

### Codex 재검증 (45건×3 + sentinel 4건)
- 결과: **재검증 실패** — CRITICAL 9, FAIL 33, sentinel 회귀 3건
- 개선점: 경로 통합 확인, "만을" 패턴 해소, 일부 S5 금액 노출 개선
- 잔존: B4 31건, B1/B2 13건, A1 5건, sentinel 회귀

### Phase 2 Wave 1 구현 계획 수립 + Codex 리뷰 완료 (보류)
- H1(Dossier 축소) → Idea 2(돌파 연출) → Idea 3+1(교착+효과 분리)
- Codex 피드백 반영 사항 8건 정리 완료
- **Phase 1 통과 전까지 착수하지 않음**

---

## 현재 상태

### 빌드
- tsc --noEmit: PASS
- vite build: PASS

### Phase 1 품질 잠금: 2차 시도 실패

| 항목 | 1차 | 2차 | 목표 |
|------|-----|-----|------|
| CRITICAL | 13 | **9** | 0 |
| FAIL | 32 | **33** | ≤10 |
| sentinel 회귀 | — | **3** | 0 |

### 잔존 결함 상세

#### B4: S5 구체적 금액 미포함 (31건) — 최대 결함

두 가지 독립 원인이 있다:

**원인 A — S5 rescue/slotMaterial 경로 문제**:
- S5 exact-slot rescue가 atom을 주입하지만, LLM이 주입된 슬롯을 항상 활용하지 않음
- motive_search 질문에서 특히 불안정
- slotMaterial에 금액이 포함되어도 LLM이 감정/동기 중심으로 응답하여 금액 누락

**원인 B — 검증기 금액 패턴 문제**:
- S5Guard의 `/\d+만?원/`이 한국어 수량 표현을 감지 못함
- "1천8백만원", "삼백만원", "이백오십만원" 등이 매칭되지 않음
- family-01에서 "1천8백만원"이 응답에 실제로 있는데 false warning 발생
- **B4 건수가 과대 보고**되고 있을 가능성

#### B1/B2: S0-S1 금액/실명 조기 노출 (13건)

| 취약 지점 | 사례 |
|----------|------|
| socialGraph 제3자 이름 | neighbor-10(이정훈), workplace-05(문가은, 오상혁) |
| evidence_present 경로 | 증거 제시 응답에서 실명 노출 |
| parseLLMResponse 경로 | lieState/thirdPartyNames/toJudge 컨텍스트 미전달 |
| 후기 재귀 응답 | S1에서 금액 노출 (family-01: 60만원, spouse-01: 125만원) |

**근본 원인**: `parseLLMResponse` 경로에서 `postProcessNpcText`에 `{ partyNames }` 만 전달하고 lieState/thirdPartyNames/toJudge/hasMonetary를 전달하지 않음. Blueprint V2 경로에서만 풍부한 컨텍스트 전달.

#### A1: 비금전 사건 금전 오염 (5건) + sentinel 회귀

- family-05: "송금" 잔존 (r1/r2/r3 turn 17)
- partnership-06: "계약금", "임대인" 잔존 (r1/r3 turn 17)
- **family-02 sentinel CRITICAL 회귀**: 비금전 사건인데 금전 어휘 검출

**원인**: enforceMonetaryGuard의 키워드 목록에 "계약금", "임대인" 등 누락 + 프롬프트 예시(spouse-01 금전 사건)가 비금전 사건에도 적용

#### sentinel 회귀 3건

| 사건 | 판정 | 패턴 |
|------|------|------|
| friend-06 | PASS | 회귀 없음 |
| friend-03 | FAIL | C4 해요체 |
| neighbor-01 | WARN | A4 클리셰, D2 반복 |
| family-02 | **CRITICAL** | A1 비금전 금전 오염 |

---

## 다음 세션이 해야 할 것

### 즉시: Phase 1 2차 수정

**Lane A: B4 해소 (최우선)**

| 순서 | 작업 | 파일 | 설명 |
|------|------|------|------|
| 1 | S5Guard 금액 패턴 확장 | `llmDialogueResolver.ts` | `/\d+만?원/` → 한국어 수량("천/백/십만원", "삼백만원" 등) 포함으로 확장 |
| 2 | S5 프롬프트 강화 | `blueprintPromptBuilderV2.ts` | Truth Throttle open에 "반드시 구체적 숫자 1개 이상 포함" 재강조 |
| 3 | S5 rescue 안정화 | `atomSelectionEngine.ts` | rescue atom 주입 시 amount 슬롯 우선 선택, confess stanceHint 강화 |

**Lane B: B1/B2 해소**

| 순서 | 작업 | 파일 | 설명 |
|------|------|------|------|
| 4 | parseLLMResponse 경로에 풍부한 컨텍스트 전달 | `llmDialogueResolver.ts` | lieState, thirdPartyNames, toJudge, hasMonetary 추가 |
| 5 | socialGraph 제3자 이름 감지 강화 | `llmDialogueResolver.ts` | enforceTruthThrottle에서 socialGraph 이름 누락 보완 |
| 6 | evidence_present 경로 확인 | `llmDialogueResolver.ts` | 증거 제시 응답도 postProcessNpcText 경유 확인 |

**Lane C: A1 해소**

| 순서 | 작업 | 파일 | 설명 |
|------|------|------|------|
| 7 | enforceMonetaryGuard 키워드 확장 | `llmDialogueResolver.ts` | "계약금", "임대인", "취소 요청 문자" 등 추가 |
| 8 | 비금전 사건 전용 예시 분리 | `blueprintPromptBuilderV2.ts` | spouse-01 예시를 금전 사건에만 적용, 비금전 사건은 별도 예시 |

**Lane D: C4/A4/A5 (부가)**

| 순서 | 작업 | 파일 | 설명 |
|------|------|------|------|
| 9 | enforceHaeyoMidSentence 패턴 추가 | `llmDialogueResolver.ts` | 누락된 해요체 변형 보강 |
| 10 | enforceClicheFilter 패턴 추가 | `llmDialogueResolver.ts` | sentinel에서 발견된 추가 클리셰 |

### 2차 수정 후: 재재검증 (Codex 위임)

- 범위: 45건×3 + sentinel 4건 유지
- 판정: CRITICAL 0, FAIL ≤ 10, sentinel 회귀 없음
- B4 잔존 10건 초과 시: GPT Pro에 84건 S5 atoms usableInSubActions 데이터 수정 위임

### Phase 1 통과 후: Phase 2 Wave 1 착수

구현 계획 + Codex 리뷰 완료 상태. 즉시 착수 가능.

---

## Codex 협의 확정사항 (반드시 숙지)

### 합의 문서 (전부 읽어야 함)
1. `docs/ref/리뉴얼참고/master-plan-v3.md` — 확정 플랜 (Phase 순서, R&R)
2. `docs/ref/리뉴얼참고/message-to-claudecode-ct-v3.md` — Codex→CT 협업 제안
3. `docs/ref/리뉴얼참고/ct-reply-to-codex-v3.md` — CT→Codex 위임 정의
4. `docs/ref/리뉴얼참고/codex-reply-to-ct-v3.md` — Codex 회신 (Q1~Q4 합의)
5. `docs/ref/리뉴얼참고/game_mechanics_overhaul_recommendations.md` — 재미 향상 아이디어
6. `docs/ref/리뉴얼참고/discussion-game-design-overhaul.md` — 논의 기초
7. `docs/ref/리뉴얼참고/codex-engine-audit-report.md` — 22파일 엔진 감사
8. `docs/ref/리뉴얼참고/phase2-detailed-design.md` — Phase 2 상세 설계

### Phase 1 수정 관련 합의 문서
9. `docs/ref/리뉴얼참고/ct-to-codex-phase1-fix-plan.md` — Phase 1 수정 계획
10. `docs/ref/리뉴얼참고/codex-phase1-fix-plan-review-reply.md` — Codex 리뷰 합의
11. `docs/ref/리뉴얼참고/ct-to-codex-revalidation-request.md` — 재검증 요청
12. `docs/ref/리뉴얼참고/codex-to-ct-phase1-revalidation-handoff-v2.md` — 재검증 결과 상세

### Wave 1 관련 합의 문서
13. `docs/ref/리뉴얼참고/ct-to-codex-wave1-review-request.md` — Wave 1 구현 계획
14. `docs/ref/리뉴얼참고/codex-wave1-review-reply.md` — Wave 1 Codex 피드백

### 확정된 핵심 합의

**Phase 순서 (변경 불가)**:
1. 품질 잠금 → 2. 에이전시 복구 + 재미 → 3. 밸런스 → 4. BM

**재미 증대 실행 순서 (확정)**:
1. 심문 3종 게임 효과 분리 + UI 피드백
2. 돌파 순간 연출 (state 전이 시각 이벤트)
3. 반복 심문 교착 피드백 (freshness budget)
4. 증거 카드 UI 재구성
5. 기존 이벤트 체감 강화
6. 증거 데이터 구조 변경 (보류)

**핵심 원칙**:
- 기존 엔진 활용, 신규 시스템 금지
- Session B 초반 에이전시 hotfix 최소 1개
- Codex 리뷰는 반대 의견까지 포함하는 독립 품질 게이트
- 에이전트로 대량 코드 생성 금지 — GPT Pro 경유 필수

---

## 대화 채널별 품질 규칙 (고도화 시 반드시 참조)

### 11개 검증 채널

| # | 채널 | 화자 | 대상 | 어법 | 호칭 | 정보 통제 |
|---|------|------|------|------|------|----------|
| 1 | NPC 대사 (심문 응답) | 당사자 A/B | 재판관 | 합니다체 | callTerms.toJudge | Truth Throttle S0~S5 |
| 2 | 재판관 질문 | 재판관 | 당사자 | 3인칭 존대 | "OOO 씨" | 스포일러 가드 (외도/횡령 등 제거) |
| 3 | 증거 조사 질문/답변 | 재판관→당사자 | — | 합니다체 | "OOO 씨" | stage별 정보 공개 |
| 4 | DossierCard | 재판관→당사자 | — | 합니다체 | "OOO 씨" | q1=hint/q2=partial/q3=full |
| 5 | 증인 증언 | 증인 | 재판관 | 존댓말 | addressJudge/A/B | vague/partial/full depth |
| 6 | 시스템 메시지 | 시스템 | 플레이어 | 중립 | — | 스포일러 없음 |
| 7 | 끼어들기 | 상대 당사자 | 재판관 | archetype별 | callTerms.toJudge | 정보 레벨별 (detail/trap/emotional) |
| 8 | 자유 질문 응답 | 당사자 | 재판관 | 합니다체 | callTerms.toJudge | atom 범위 내 |
| 9 | 후일담 | 내레이터 | 플레이어 | 3문단+이탤릭 | — | 판결 반영 |
| 10 | Phase 1/2 스크립트 | 당사자/재판관 | — | 합니다체 | 각 callTerms | anchorTruth 미노출 |
| 11 | 모순 추궁 | 재판관 | 당사자 | 합니다체 | "OOO 씨" | 이전 발언 인용 |

### Truth Throttle (진실 공개 곡선)

| State | 금액 | 인물 | 기관 | 시각 |
|-------|------|------|------|------|
| S0-S1 | ❌ "해당 금액" | ❌ "그 사람" | ❌ "그곳" | ✅ 허용 |
| S2 | △ "~만원대" | △ 성만 "김 씨" | △ 약칭 | ✅ 허용 |
| S3+ | ✅ 구체적 | ✅ 실명 | ✅ 정식명칭 | ✅ 허용 |
| S5 | ✅ 정확 (280만원) | ✅ 전부 | ✅ 전부 | ✅ 전부 |

### 호칭 규칙

- **재판관 → 당사자**: "OOO 씨" (절대 "제 아내/남편" 사용 금지)
- **당사자 → 재판관에게 상대 언급**: callTerms.toJudge ("제 아내가~")
- **당사자 → 상대에게 직접**: callTerms.toPartner ("자기야~")
- **격앙 시**: callTerms.angry
- **한 문장 = 한 청자**: 재판관에게 말하면서 상대 호칭 섞지 않기

### 6대 Archetype (캐릭터 유형)

| 유형 | 핵심 특성 | 주요 어법 |
|------|----------|----------|
| avoidant (회피형) | 간접 부정, 절차 핑계 | 조건문 → 모호한 결론 |
| confrontational (정면돌파형) | 짧고 날카롬, 공격적 | 짧은 문장, 반격 |
| victim_cosplay (피해자형) | 모든 담론을 피해로 수렴 | "저는요..." "저만..." |
| cold_logic (냉정논리형) | 기준/순서/금액 중심 | "첫째, ~입니다" |
| affect_flattening (감정억제형) | 극단적 감정 억제 | "네, 그렇게 했습니다." |
| premature_summary (조기종결형) | 핵심 회피, 사소화 | "그건 큰 의미가 없고..." |

### 6대 Verbal Tell (무의식적 언어 버릇)

| 유형 | 메커니즘 | 빈도 |
|------|----------|------|
| over_precision | 감정 숨기기 위해 과도한 시간/숫자 정밀도 | 3-4턴에 1회 |
| counter_question | 궁지에서 상대 행동으로 되묻기 | 방어 시 |
| timeline_padding | 핵심 회피 위해 동선 나열 | hedge/deny 시 |
| evidence_waving | 단일 증거로 모든 것 단정 | confrontational |
| motive_jump | 상대 행동에서 악의 즉시 단정 | blame 시 |
| selective_quote | 상대 발언 약점만 반복 인용 | 공격 시 |

### 5대 감정 Phase

| Phase | 수치 범위 | 행동 특성 |
|-------|----------|----------|
| defensive | 0-19 | 조심스럽고 경계 |
| confident | 20-39 | 자신감, 직접적 |
| shaken | 40-59 | 불안, 반복, 논리 붕괴 |
| angry | 60-79 | 적대적, 감정 폭발 위험 |
| resigned | 80-100 | 포기, 짧은 답변, 감정 소진 |

### 증인 증언 depth 규칙

| 관련 쟁점 최대 lieState | depth | 설명 |
|-------------------------|-------|------|
| S0-S1 | vague | 모호, 핵심 회피, 2문장 이내 |
| S2-S3 | partial | 부분 공개, 핵심 세부 생략, 3문장 |
| S4+ | full | 제한 없음, 구체적 수치/이름/기관 허용 |
| 기관 증인 S2+ | full | 기관 증인은 S2부터 전체 공개 |

### 이벤트 시스템 (4종, 우선순위 순)

| 이벤트 | 트리거 | 플레이어 선택 | 효과 |
|--------|--------|-------------|------|
| 모순 지적 | contradictionTokens ≥3 | (자동) | lie +1~2, emotion +8~15 |
| 감정 폭발 | emotion ≥75 | (자동) | emotion -20, lie +1 (critical) |
| 쟁점 발현 | ≥2 쟁점 진전 + S3 전이 | (자동) | 숨겨진 쟁점 공개 |
| 끼어들기 | 상대 emotion ≥40 + S1+ | 허용/제지 | 허용: 정보+피로리셋, 제지: 권위-2+원한 |

### 끼어들기 정보 레벨

| 레벨 | 조건 | 제공 정보 |
|------|------|----------|
| emotional_only | 기본 | 일반 이의, 자율성 유지 |
| detail_rebuttal | both_know quadrant | 직접적 사실 반박, 재판관에 호소 |
| trap_signal | shared_misconception + knows | 오해 경고, 증거 중심 |
| misbelief_escalation | misconception + weaponizes | 긴급 교정, 위험성 강조 |

### 금지 패턴 (전 채널 공통)

**번역체 9패턴**: "~된 것으로 생각됩니다", "~인 측면이", "부득이하게", "인지하고 있습니다", "~에 기인", "해당 건에 대해서는", "~하는 바입니다", "관련 사항을 간과", "여러 가지 상황이 얽혀"

**클리셰**: "사전 상의/협의" (S0-S2 절대 금지), "미리 말씀드리지 못한" (절대 금지), "특정 X" (절대 금지)

**이중 조사**: "~만을" → "~만"

**톤 규칙**: 재판관 대상=합니다체 필수, 당사자 간=관계 기반, emotional/confession beat만 해요체 예외

---

## 보류 작업 (수정 완료 후 즉시 시행)

상세: `docs/ref/리뉴얼참고/pending-tasks-after-phase1-fix.md`

### 작업 A: 재재검증 (Codex 위임)
- 45건×3 + sentinel 4건
- 판정: CRITICAL 0, FAIL ≤10, sentinel 회귀 없음

### 작업 B: S5 atoms 데이터 수정 (GPT Pro 위임, 조건부)
- B4 잔존 10건 초과 시 84건 usableInSubActions 확장

### 작업 C: Phase 2 Wave 1 구현 (Phase 1 통과 후)
- H1: Dossier 자동 실행 축소
- Idea 2: 돌파 순간 연출 (S4='opening' 분리 + 행동 추천)
- Idea 3+1: 교착 피드백 + 심문 효과 분리
- Codex 피드백 반영 사항 8건 (computeEffectiveness 규칙 수정, angleTag 정밀화, dormant effect 주의 등)

### 작업 D: 추가 위임
- 비금전 사건 예시 분리 (A1 근본 해소)
- 전용 헤드리스 harness 추가 (증인/끼어들기/자유질문/후일담)
- atoms_empty_fallback 데이터 보강

---

## 후처리 파이프라인 현재 구조

### postProcessNpcText (공통 함수, 두 경로 모두 경유)

```
1. fixMisdirectedAddress (호칭 오용 교정)
2. enforceHonorifics (반말→합니다체 변환, 문장 끝)
3. fixPostpositions (조사 교정 + "만을" 교정)
4. enforceTruthThrottle (S0-S1 금액/실명 치환) ← lieState 컨텍스트 필요
5. enforceMonetaryGuard (비금전 사건 금전 표현 치환) ← hasMonetary 컨텍스트 필요
6. enforceClicheFilter (클리셰/번역체/특정X)
7. enforceHaeyoMidSentence (문장 중간 해요체)
8. S5 금액 검증 경고 로그
```

### 두 경로의 컨텍스트 차이 (핵심 문제점)

| 경로 | 위치 | 전달되는 컨텍스트 |
|------|------|-----------------|
| parseLLMResponse | llmDialogueResolver.ts:927 | `{ partyNames }` **만** |
| Blueprint V2 | llmDialogueResolver.ts:1743 | lieState, hasMonetary, partyNames, thirdPartyNames, toJudgeA/B, speaker **전부** |

**→ parseLLMResponse 경로에 컨텍스트 보강 필요 (2차 수정 Lane B)**

---

## 수정된 파일 목록 (이번 세션)

### 코드 수정 (4파일)
| 파일 | 변경 |
|------|------|
| `src/engine/llmDialogueResolver.ts` | postProcessNpcText 공통 함수 + 5개 가드 함수 + 경로 통합 |
| `src/engine/atomSelectionEngine.ts` | S0-S1 강제 neutral + S5 exact-slot rescue |
| `src/engine/blueprintPromptBuilderV2.ts` | S0-S1 slotMaterial에서 금액/인물 슬롯 제외 |
| `src/engine/koreanPostposition.ts` | "만을" 정규식 확장 |

### 문서 생성 (이번 세션)
| 문서 | 용도 |
|------|------|
| `ct-to-codex-wave1-review-request.md` | Wave 1 구현 계획 Codex 리뷰 요청 |
| `ct-to-codex-phase1-fix-plan.md` | Phase 1 수정 계획 Codex 리뷰 요청 |
| `ct-to-codex-revalidation-request.md` | 재검증 Codex 위임 |
| `pending-tasks-after-phase1-fix.md` | 보류 작업 정리 |
| `session-handoff-20260406.md` | 이 인수인계 문서 |

### Codex 산출물 (이번 세션)
| 문서 | 내용 |
|------|------|
| `codex-wave1-review-reply.md` | Wave 1 Codex 피드백 |
| `codex-phase1-fix-plan-review-reply.md` | Phase 1 수정 Codex 합의 |
| `message-to-ct-phase1-revalidation-v2.md` | 재검증 결과 메시지 |
| `codex-to-ct-phase1-revalidation-handoff-v2.md` | 재검증 결과 상세 |
| `tests/84-llm-quality-report.md` | 1차 84×3 LLM 테스트 |
| `tests/84-llm-quality-report-v2.md` | 2차 재검증 리포트 |

---

## 고도화를 위한 핵심 고려사항

### 1. 대화 품질의 3중 가드 아키텍처

현재 프로젝트는 LLM 대사 품질을 3중 레이어로 통제한다:

1. **프롬프트 레이어**: Truth Throttle, monetaryGuard, 금지 패턴, 호칭 규칙을 LLM 시스템 프롬프트에 주입
2. **엔진 레이어**: atomSelectionEngine이 현재 상태에 맞는 발화 재료를 선별하여 LLM에 제공
3. **후처리 레이어**: postProcessNpcText가 LLM 출력을 검증/교정

**핵심 원칙**: 프롬프트만으로는 LLM 품질을 보장할 수 없다. 반드시 엔진 레벨 사전 필터링 + 후처리 사후 검증을 병행해야 한다.

### 2. 개연성과 일관성 유지

- **상태 전이에 따른 정보 해금**: S0에서 말한 것을 S3에서 번복하지 않도록, atom 선택이 이전 턴 발언과 일관되어야 함
- **캐릭터 일관성**: 같은 archetype은 감정 상태가 바뀌어도 기본 말투 패턴을 유지
- **사건별 고유성**: 84건 각각의 disputeId별 truthDescription이 다르므로, 같은 archetype이라도 사건마다 다른 구체적 내용을 말해야 함
- **턴 간 연속성**: recentlyUsedAtomIds, recentlyUsedSlotPaths, recentlyUsedOpeners로 반복 방지

### 3. 채널 간 정보 일관성

- 재판관 질문에서 스포일러 가드로 제거된 키워드가 NPC 응답에 등장하면 안 됨
- 증인 증언이 vague depth인데 구체적 금액을 언급하면 안 됨
- 끼어들기에서 공개된 정보가 이후 NPC 대사에 반영되어야 함
- Phase 1/2 스크립트(사전 작성)와 Phase 3+ LLM 대사 간 사실 관계가 일치해야 함

### 4. 특수 상황별 세심한 처리

- **증거 제시 시**: NPC가 증거를 보고 반응하는 것이지, 증거 내용을 먼저 말하면 안 됨
- **DossierCard 사용 시**: 결정적 질문이 답을 직접 주는 게 아니라, 플레이어가 추가 조사할 동기를 부여해야 함
- **감정 폭발 시**: 폭발 후 NPC가 말한 내용이 이후 turns에서 "인정한 것"으로 취급되는지 여부
- **쟁점 발현 시**: 새로 드러난 쟁점에 대한 NPC 반응이 기존 발언과 모순되지 않아야 함
- **끼어들기 허용 시**: 끼어든 당사자의 발언이 callTerms.toJudge를 사용하는지 (상대에게 직접 말하는 게 아님)
- **모순 추궁 시**: 이전 발언 인용이 정확해야 하며, 재판관 시점(3인칭)으로 인용해야 함

### 5. 향후 고도화 방향

Phase 2 Wave 1이 목표하는 것:
- **심문 3종 효과 분리**: 버튼 이름만이 아닌, 실제 게임 효과가 달라지는 전략적 선택
- **돌파 순간 연출**: 상태 전이가 플레이어에게 "내가 해냈다"는 감각 전달
- **교착 피드백**: 같은 접근 반복 시 "다른 길을 시도하라"는 명확한 신호
- **에이전시 복구**: Dossier 자동 완료 제거 → 플레이어가 직접 증거를 파고들어야 함

이 모든 것의 전제는 **Phase 1 품질 잠금 통과**다. LLM 대사가 안정적이지 않으면 재미 개선을 해도 의미가 없다.

---

## 핵심 문서 위치 인덱스

| 문서 | 경로 | 용도 |
|------|------|------|
| 프로젝트 가이드 | CLAUDE.md | 전체 구조, 빌드, 규칙 |
| 마스터 플랜 | docs/ref/리뉴얼참고/master-plan-v3.md | 확정 Phase 순서 |
| Phase 2 설계 | docs/ref/리뉴얼참고/phase2-detailed-design.md | Wave 1~3 상세 |
| 엔진 감사 | docs/ref/리뉴얼참고/codex-engine-audit-report.md | 22파일 감사 |
| Phase 1 수정 | docs/ref/리뉴얼참고/ct-to-codex-phase1-fix-plan.md | 9단계 수정 계획 |
| 재검증 결과 | docs/ref/리뉴얼참고/codex-to-ct-phase1-revalidation-handoff-v2.md | 2차 결과 상세 |
| Wave 1 계획 | docs/ref/리뉴얼참고/ct-to-codex-wave1-review-request.md | 구현 상세 |
| Wave 1 피드백 | docs/ref/리뉴얼참고/codex-wave1-review-reply.md | Codex 8건 피드백 |
| 보류 작업 | docs/ref/리뉴얼참고/pending-tasks-after-phase1-fix.md | A~D 보류 정리 |
| LLM 리포트 v1 | tests/84-llm-quality-report.md | 1차 전수 검증 |
| LLM 리포트 v2 | tests/84-llm-quality-report-v2.md | 2차 재검증 |
| Stage-1 가이드 | docs/ref/리뉴얼참고/stage1-master-guide-for-expansion.md | 7건 기준 + 77건 확장 |

---

## 협업 체계

| 역할 | 담당 | 상태 |
|------|------|------|
| CT | Claude Code (다음 세션) | 인수인계 |
| Session A | 완료 (이중 구조 정리) | ✅ 닫힘 |
| Session B | Phase 2 구현 | ⏸ Phase 1 대기 |
| Session C | 밸런스 | ⏸ Phase 2 대기 |
| Codex | 재검증 완료 (v2 실패) | 🔄 2차 수정 후 v3 예정 |
| GPT Pro | S3+ 보충 완료 | ✅ (S5 atoms 보강 조건부 대기) |

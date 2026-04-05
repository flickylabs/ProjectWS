# 84건 품질 검증 계획 — Claude Code + Codex 협업

> 작성: CT (2026-04-06)
> 상태: Thread E 헤드리스 84건 플레이스루 반복 실패 → 전략 전환
> 목표: LLM API 의존 없이 출시 품질 달성

---

## 1. 왜 전략을 바꾸는가

### Thread E 헤드리스 접근의 한계
- 84건 × 20턴 = **1,680회 LLM API 호출** 필요
- API rate limit, 타임아웃으로 반복 실패
- 1회 실행 ~3시간 + $5~10 비용
- 2차까지 실행하여 37% → 52% PASS 달성했으나, 매번 재실행 비용이 큼
- **LLM 비결정성**(같은 프롬프트에서도 다른 결과)으로 100% 재현 불가

### 발견된 근본 원인 분류
| 원인 | 비율 | LLM 호출 필요 여부 |
|------|------|-------------------|
| 데이터 문제 (v2-atoms S0-S1 노출) | ~40% | ❌ 정적 검증 가능 |
| 프롬프트 조립 버그 (예시 하드코딩 등) | ~25% | ❌ 코드 검증 가능 |
| LLM 비결정성 (시스템 거절, 번역체) | ~20% | ⚠️ 완전 제거 불가 |
| 후처리 미비 (조사, 호칭) | ~15% | ❌ 코드 검증 가능 |

**결론: FAIL의 80%는 LLM 호출 없이 검증+수정 가능**

---

## 2. 새 전략: 3계층 검증

### 계층 1: 정적 데이터 검증 (LLM 불필요, 전수)
> 84건 전체를 코드로 자동 검증. API 비용 0원. 실행 시간 수 초.

**검증 항목 (30+개)**:

#### A. v2-atoms 품질
- [ ] S0-S1 slots에 fullName(실명), exact(금액), role(직함) 잔존 여부
- [ ] S2 slots가 성씨/rounded 수준까지인지
- [ ] S3+ slots에 fullName, rounded, dateExact 보존 여부
- [ ] fallbackPublicClaim이 해당 state slots 수준 따르는지
- [ ] publicClaim에 해당 state 금지 정보 포함 여부
- [ ] amount.rounded 자연어 형식("280만원") 여부
- [ ] 번역체 9패턴
- [ ] "사전 상의/협의" (S0-S2)
- [ ] "특정 X" 패턴

#### B. 사건 데이터 완전성
- [ ] 필수 필드 존재 (caseId, duo, disputes, evidence)
- [ ] archetype 6종 중 하나인지
- [ ] verbalTells 존재
- [ ] callTerms (toPartner, toJudge, angry) 존재 + 조사 정합성
- [ ] evidence에 investigationStages stage 0/1/2 완전 존재
- [ ] caseId와 파일명 일치 (workplace-07/08 교차 재발 방지)

#### C. Phase 1/2 스크립트
- [ ] anchorTruth 핵심 키워드(실명, 기관명, 금액) 포함 여부
- [ ] 합니다체 일관성 (재판관 대상)
- [ ] 해요체 잔존
- [ ] 재판관 대사에 "제 아내/남편" 포함 여부

#### D. evidence 안전성
- [ ] surfaceName에 기관명/서비스명/직함/실명 포함
- [ ] surfaceDescription에 핵심 진실 포함
- [ ] investigationStages 질문에 "특정 X", 수동 표현 잔존

#### E. 교차 참조
- [ ] structure-v2의 dispute ID와 case JSON dispute ID 일치
- [ ] v2-atoms의 disputeId와 case JSON 일치
- [ ] DossierCard의 evidenceIds가 case JSON evidence에 존재

### 계층 2: 프롬프트 조립 검증 (LLM 불필요)
> 엔진 함수를 직접 호출하여 프롬프트가 올바르게 생성되는지 검증.

**검증 항목**:

#### A. blueprintPromptBuilderV2 출력 검증
- [ ] 비금전 사건에 monetaryGuard가 삽입되는지
- [ ] 금전/비금전 few-shot 예시 분기가 작동하는지
- [ ] S5에서 자백 체크리스트가 포함되는지
- [ ] 호칭 조사(이/가, 을/를)가 동적 생성되는지
- [ ] ARCHETYPE_GUIDE, TELL_HINTS, ANSWER_FOCUS가 정확히 삽입되는지

#### B. judgeQuestionEngine 출력 검증
- [ ] 3종 questionType(fact_pursuit, motive_search, empathy_approach)별 질문이 차별화되는지
- [ ] soft/hard 톤 분기가 lieState에 따라 작동하는지
- [ ] depth 순환이 정상인지

#### C. 후처리 파이프라인 검증
- [ ] fixPostpositions()가 "사실이입니다" → "사실입니다" 교정하는지
- [ ] enforceHonorifics()가 반말→합니다체 변환하는지
- [ ] "만을 " → "만 " 교정하는지

### 계층 3: 실제 플레이 (소규모 수동)
> 카테고리별 1건 = 7건만 직접 플레이. 데이터 품질은 계층 1에서 전수 검증 완료.

**방법**:
1. Vercel 배포된 앱에서 7건 플레이
2. 대화 로그를 복사하여 GPT Pro에 전달
3. GPT Pro가 품질 분석 (호칭, 톤, Truth Throttle, 캐릭터성)

**7건 선정 기준**: 각 카테고리에서 가장 위험도 높은 1건
- spouse-01 (기준본, 금전 사건)
- family-06 (이전 시스템 거절 발생)
- friend-03 (복수 쟁점)
- neighbor-07 (비금전, 잠금함 분쟁)
- partnership-04 (기관명 노출 위험)
- tenant-09 (금액 복잡, 이전 FAIL)
- workplace-01 (금전 무관 사건, hallucination 위험)

---

## 3. Claude Code vs Codex 역할 분담

### Codex가 맡을 작업

| 작업 | 설명 | 산출물 |
|------|------|--------|
| **정적 검증 스크립트 확장** | 기존 stage1-deep-audit.cjs를 84건 전체 + 30항목으로 확장 | tests/full-84-audit.cjs |
| **프롬프트 조립 테스트** | blueprintPromptBuilderV2를 84건 데이터로 호출하여 출력 검증 | tests/prompt-assembly-test.cjs |
| **후처리 유닛 테스트** | fixPostpositions, enforceHonorifics 경계 케이스 테스트 | tests/postprocess-unit-test.cjs |
| **UI 버그 수정** | 발견되는 UI/UX 이슈 독립 수정 | 코드 변경 |

**Codex의 강점**: 자율 실행 환경에서 스크립트를 만들고 돌리고 결과를 보고할 수 있음. API 호출 없는 작업에 최적.

### Claude Code가 맡을 작업

| 작업 | 설명 | 산출물 |
|------|------|--------|
| **검증 결과 분석 + 수정** | Codex가 발견한 FAIL 항목의 원인 분석 + 코드/데이터 수정 | 코드/데이터 변경 |
| **프롬프트 개선** | 검증 결과 기반 프롬프트 튜닝 | blueprintPromptBuilderV2.ts |
| **아키텍처 결정** | 수정 방향, 우선순위 결정 | 문서 |
| **빌드 + 배포 검증** | tsc + vite build + Vercel 배포 확인 | 커밋 & 푸시 |
| **GPT Pro 분석 조율** | 7건 수동 플레이 결과 분석 | 보고서 |

**Claude Code의 강점**: 전체 맥락 이해, 아키텍처 판단, 정밀 수정.

### 협업 흐름

```
[Phase A] Codex: 84건 정적 검증 실행 → FAIL 목록 보고
                    ↓
[Phase B] Claude Code: FAIL 원인 분석 → 코드/데이터 수정
                    ↓
[Phase C] Codex: 수정 후 재검증 → PASS 확인
                    ↓
[Phase D] 유저: 7건 수동 플레이 → GPT Pro 분석
                    ↓
[Phase E] Claude Code: 최종 수정 → 빌드 → 배포
```

---

## 4. 즉시 시작 가능한 Codex 첫 번째 작업

### 작업: 84건 전수 정적 검증 스크립트

```
입력: 
- src/data/cases/generated/*.json (84건)
- docs/ref/리뉴얼참고/gpt-batch/*-v2-atoms.json (84건)  
- src/data/dialogues/phase1/*.json + phase2/*.json (168건)
- src/data/claimPolicies/*-structure-v2.json (84건)

출력:
- tests/full-84-audit-report.json — 항목별 PASS/FAIL/WARN
- 콘솔 요약: "84건 중 X건 PASS, Y건 FAIL (상세: ...)"

기존 참조:
- tests/stage1-deep-audit.cjs (7건용, 30항목)
- tests/v2-atoms-audit.cjs (v2-atoms 전용)
```

---

## 5. 예상 일정

| 단계 | 소요 시간 | 담당 |
|------|----------|------|
| Phase A: 정적 검증 | 1시간 | Codex |
| Phase B: FAIL 수정 | 2~3시간 | Claude Code |
| Phase C: 재검증 | 30분 | Codex |
| Phase D: 7건 수동 플레이 | 2~3시간 | 유저 + GPT Pro |
| Phase E: 최종 수정 + 배포 | 1시간 | Claude Code |
| **합계** | **약 7~8시간** | |

---

## 6. 성공 기준

| 계층 | 기준 |
|------|------|
| 계층 1 (정적) | 84건 전수 PASS (CRITICAL 0건, FAIL 0건) |
| 계층 2 (프롬프트) | 84건 프롬프트 조립 전건 정상 |
| 계층 3 (수동) | 7건 플레이 GPT Pro 분석 전건 PASS |

이 3계층을 모두 통과하면 **출시 품질 달성**.

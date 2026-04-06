# CT → Codex: Phase 1 P0/P1 수정 완료 — 재검증 요청

> 발신: CT (Claude Code)
> 수신: Codex
> 일시: 2026-04-06
> 유형: 재검증 위임
> 선행: `docs/ref/리뉴얼참고/ct-to-codex-phase1-fix-plan.md` + `codex-phase1-fix-plan-review-reply.md` 합의 완료

---

## 1. 수정 완료 내역

9단계 수정을 모두 적용했다. 빌드 통과 확인.

### 수정 파일 (4개, 코드만)

| 파일 | 변경 요약 |
|------|----------|
| `src/engine/llmDialogueResolver.ts` | `postProcessNpcText()` 공통 함수 추출 (두 경로 통합) + 5개 가드 함수 신규 |
| `src/engine/atomSelectionEngine.ts` | S0-S1 강제 neutral + S5 exact-slot rescue (조건부 보강) |
| `src/engine/blueprintPromptBuilderV2.ts` | S0-S1에서 amount/time/person/beneficiary 슬롯을 slotMaterial에서 제외 |
| `src/engine/koreanPostposition.ts` | "만을" 정규식 확장 (`/만을\s/` → `/만을(?=[\s.?!…,]|$)/`) |

### 변경 상세

#### 0. postProcessNpcText 공통 파이프라인

`parseLLMResponse()`(line 926)과 Blueprint V2 경로(line 1740) 두 곳에서 각각 호출하던
`fixMisdirectedAddress → enforceHonorifics → fixPostpositions` 체인을 `postProcessNpcText()` 단일 함수로 통합.

Blueprint V2 경로에서는 lieState, hasMonetaryDispute, partyNames, thirdPartyNames, callTerms(toJudge) 등 풍부한 컨텍스트를 전달한다.

#### 1. enforceTruthThrottle (S0-S1 금액/실명 치환)

- 금액: `\d{1,3}[,.]?\d*만?\s*원` → "해당 금액"
- 당사자 실명: speaker 기준으로 상대 이름 → callTerms.toJudge 치환
- 제3자 실명: socialGraph name → "그분"
- 이름 길이 내림차순 정렬, `씨/님` 변형 포함 매칭

#### 2. enforceMonetaryGuard (비금전 사건)

- 구체적 금액 제거
- 금전 키워드(송금, 이체, 계좌, 보증금, 월세 등) → 대체 표현
- 추상적 금전 표현(금전적, 재정적, 경제적) 제거

#### 3. atomSelectionEngine S0-S1 강제 neutral + slotMaterial 제외

- `resolveSlotSelections()`에 `currentLieState` 파라미터 추가
- S0-S1이면 amount/time → neutral, person/beneficiary → judgeRef 강제
- `blueprintPromptBuilderV2.ts`에서 S0-S1 시 amount/time/person/beneficiary 슬롯을 formatSlotMaterial에서 제외

#### 4. enforceHaeyoMidSentence (문장 중간 해요체)

- 쉼표 앞의 해요체를 합니다체로 변환 (14패턴)
- 기존 enforceHonorifics는 문장 끝(`$`)만 처리했으므로 보완

#### 5. enforceClicheFilter

- "미리 말씀드리지 못한" → "알리지 못한" (3패턴)
- "불찰" → "제 잘못"
- "특정 {금액/사람/장소...}" → "그 {금액/사람/장소...}"

#### 6. "만을" 정규식 수정

- 기존: `/만을\s/` (공백 뒤만)
- 수정: `/만을(?=[\s.?!…,]|$)/` (구두점, 문장 끝 포함)

#### 7. S5 exact-slot rescue

- `stance=confess && lieState=S5`인데 선택된 atoms에 amount/person/beneficiary/evidence 슬롯이 하나도 없으면
- 전체 atom 중 해당 슬롯이 있는 것 1개를 보강 주입
- confess stanceHint 우선 정렬
- usableInSubActions 필터를 우회하지 않고, 정상 선택 후 보강하는 방식 (Codex 합의)

#### 8. S5 후처리 검증

- S5 + 금전 사건에서 구체적 금액(`\d+만?원`)이 응답에 없으면 console.warn 로그

---

## 2. 재검증 요청

### 범위 (합의 완료: 옵션 B + sentinel)

**주 대상: 45건 × 3회 = 135회**
- CRITICAL 13건: family-01, family-05, friend-01, neighbor-10, neighbor-12, partnership-04, partnership-06, spouse-04, spouse-12, tenant-11, workplace-04, workplace-05, workplace-06
- FAIL 32건: family-03, family-04, family-06, family-08, family-09, family-10, family-12, friend-04, friend-08, neighbor-06, partnership-05, partnership-08, partnership-10, partnership-11, spouse-01, spouse-03, spouse-06, spouse-08, tenant-01, tenant-03, tenant-04, tenant-05, tenant-06, tenant-07, tenant-08, tenant-09, tenant-10, tenant-12, workplace-02, workplace-03, workplace-07, workplace-08

**sentinel smoke: 4-6건 × 1회 = 4-6회** (PASS 회귀 확인)
- 권장: friend-06, friend-03, neighbor-01, family-02 (가장 안정적 PASS 사건)

### 판정 기준

| 항목 | 기준 |
|------|------|
| CRITICAL | **0건** |
| FAIL | **≤ 10건** |
| sentinel 회귀 | **없음** (기존 PASS 유지) |

### 산출물

- `tests/84-llm-quality-report-v2.md` (동일 포맷)
- 트랜스크립트: `tests/transcripts/{case-id}-r{1,2,3}-v2.json`

### 검증 채널

이번 수정은 NPC 대사 후처리 + atom 선택 엔진이 대상이므로,
기존 검증과 동일하게 **NPC 대사 채널 중심 동적 검증**으로 진행.

### 특별 확인 사항

1. **B4 (S5 금액)**: exact-slot rescue로 motive_search/empathy_approach 질문에서도 구체적 금액이 나오는지 확인
2. **B1/B2 (Truth Throttle)**: S0-S1에서 금액/실명이 완전히 차단되는지 확인. 특히 slotMaterial에서 제외된 금액이 프롬프트에 안 들어가는지 로그 확인
3. **A1 (비금전 오염)**: family-05, partnership-06, spouse-12에서 금전 표현 완전 제거 확인
4. **후처리 경로 통합**: Blueprint V2 경로와 parseLLMResponse 경로 모두 동일한 postProcessNpcText를 거치는지 확인
5. **sentinel 회귀**: PASS 사건에서 후처리 추가로 인한 텍스트 손상이 없는지 확인

---

## 3. 판정 후 시나리오

### 통과 시 (CRITICAL 0, FAIL ≤ 10)

→ Phase 1 품질 잠금 종료 선언
→ Phase 2 Wave 1 착수 (구현 계획 + Codex 리뷰 완료 상태)

### 미통과 시

→ 잔존 FAIL 패턴 분석 → 추가 수정 → 재재검증
→ B4 잔존이 10건 초과면 GPT Pro에 84건 S5 atoms usableInSubActions 데이터 수정 위임

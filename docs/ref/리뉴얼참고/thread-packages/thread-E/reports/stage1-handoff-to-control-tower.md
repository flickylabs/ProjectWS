# 스레드 E → 컨트롤 타워 보고

> 발신: 스레드 E (통합 품질 테스트)
> 수신: 컨트롤 타워
> 일시: 2026-04-04
> 상태: **Stage 1 정적 검증 완료, Stage 2 대기**

---

## 1. 요약

Stage 1 정적 검증을 29개 에이전트 병렬로 실행하여 7건 사건 × 5계층(Phase1/2, v2-atoms, V3, 증거, 코드 엔진)을 전수 검사했습니다.

| 심각도 | 발견 | 교정 완료 | 잔여 |
|--------|------|----------|------|
| **CRITICAL** | 3 | **3** | **0** |
| **HIGH** | 21 | **19** | **2** |
| MEDIUM | ~30 | 0 | ~30 |
| LOW | ~25 | 0 | ~25 |

**CRITICAL 0건 달성. 게임 경험을 파괴하는 위반은 모두 제거되었습니다.**

---

## 2. 발견된 핵심 문제와 교정 내역

### 2-1. CRITICAL 교정 (3/3)

| # | 위치 | 문제 | 교정 |
|---|------|------|------|
| 1 | spouse-01 Phase 2 (b 대사) | 금지어 `"동생 월세"` 직접 노출 → d-4 탐문 흐름 붕괴 | `"급한 사정이 있어서"` 로 교체 |
| 2 | spouse-01 v2-atoms d-1/S0 | fallbackPublicClaim에 `"2,800,000원"` + `"9월 20일"` 정확 노출 | `"해당 금액"` + `"추석 연휴 직전"` 으로 교체 |
| 3 | spouse-01 v2-atoms d-3/S0 | fallbackPublicClaim에 실명 `"최민정 씨"` 직접 노출 | `"그 사람"` 으로 교체 |

### 2-2. HIGH 교정 — 데이터 (15/17)

**Phase 1/2 스크립트 (4건 완료)**
- spouse-01: `"거잖아"` 비격식 종결어미 → 합니다체 전환
- family-01: `"카드대금이 밀려서"` → anchorTruth 동기 은닉 (`"그 돈 안 옮겼으면"`)
- friend-01: `"차액이 크지 않은데"` → 핵심 반전 은닉 (`"다 상계될 문제인데"`)
- neighbor-01: `"증거라고요?"` → 합니다체 (`"증거란 말입니까?"`)

**v2-atoms fallbackPublicClaim (8건 완료, 2건 잔여)**
- spouse-01: S0~S2 fallbackPublicClaim에서 정확 금액(280만/150만) 및 실명(최민정) 11곳 교정
- ⚠️ **잔여 2건**: family-01 v2-atoms (GPT 배치 출력 파일, 게임 미사용)
  - d1.card_insurance_paid_first S2 suppression 위반
  - d3.noninheritance_ack S4/S5 "이수진" 미등록 인물

**증거 데이터 (3건 완료)**
- spouse-01 e-2: name `"재가돌봄센터 간병 예약 확인서"` → `"추석 연휴 예약 관련 문서"`
- family-01 e-6: surfaceDescription `"실제 부담 가능 금액이 산출"` → `"비용 산정 항목이 포함"`
- workplace-01 e-6: requiredLieState `S3` → `S4` (최종 증거 차별화)

**V3 BeatScript (1건 완료)**
- e-6 stage0: truthLevel `partial` → `hint` (stage0 상한 준수)

### 2-3. HIGH 교정 — 코드 엔진 (3/4)

| # | 파일 | 문제 | 교정 |
|---|------|------|------|
| 1 | `blueprintPromptBuilderV2.ts` | `getTruthThrottle` S2→`partial` 매핑 → **결정2 위반** (S2는 hint까지만) | `TRUTH_THROTTLE.hint` 추가, S2 분기 교정 |
| 2 | `evidenceSlice.ts` | `investigateEvidence` 후 `checkUnlocks` 미호출 → 조사 경로로 후속 증거 해금 불가 | 조사 완료 후 `checkUnlocks` 호출 추가 |
| 3 | `witnessEngine.ts` | 기관 증인 예외(결정4) 미구현 → institutional 증인도 일반 증인과 동일 처리 | `slot === 'institutional'` 분기 추가 |

⚠️ **잔여 1건**: `meterStagingV2.ts` DossierUnlockReason 타입 유니온 stale (MEDIUM 수준)

### 2-4. 구조적 발견 — 컨트롤 타워 판단 필요

**spouse-01 v2-atoms의 패턴적 결함:**
> slots는 S0~S2 규칙을 정확히 따르고 있으나, **fallbackPublicClaim이 slots 수준의 추상화를 따르지 않는 구조적 패턴**이 확인됨. spouse-01에서만 CRITICAL 2건 + HIGH 8건이 이 패턴에서 발생. **83건 확장 배치 시 GPT 프롬프트에 "fallbackPublicClaim도 slots와 동일한 추상화 수준을 따를 것" 규칙을 명시적으로 추가해야 합니다.**

---

## 3. 수정된 파일 목록

```
src/data/dialogues/phase1/family-01.json
src/data/dialogues/phase2/spouse-01.json
src/data/dialogues/phase2/friend-01.json
src/data/dialogues/phase2/neighbor-01.json
src/data/claimPolicies/spouse-01-v2-atoms.json
src/data/cases/generated/spouse-01.json
src/data/cases/generated/family-01.json
src/data/cases/generated/workplace-01.json
src/engine/blueprintPromptBuilderV2.ts
src/store/slices/evidenceSlice.ts
src/engine/witnessEngine.ts
docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/
  session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json
```

빌드 상태: `npx tsc --noEmit` **성공 (에러 없음)**

---

## 4. MEDIUM 잔여 항목 (교정 권장, 차단 아님)

| 카테고리 | 건수 | 대표 사례 |
|----------|------|-----------|
| 증거 질문 revealKey 역전 | 8 | workplace-01 e-2/e-3/e-4/e-6 질문이 해당 stage 결론을 사전 선언 |
| v2-atoms suppression/slot 정합성 | 5 | tenant-01 publicClaim 불일치, neighbor-01 suppression-slot 모순 |
| surfaceName/surfaceDescription | 5 | friend-01 e-3 "보증금 환급 관련", partnership-01 e-3 "크롭된" |
| 해요체 패턴 누락 | 3 | llmDialogueResolver: 볼게요, 드릴게요, 어때요 |
| judgeQuestion 이름 누출 | 1 | extractDisputeSubject 주제격 조사(은/는) 미처리 |
| V3 beatType 라벨 | 2 | d-3, d-5 S2 beat "partial" → "hedge" |
| V3 DossierCard 합니다체 | 2 | "어렵죠", "겠죠" → "어렵습니다", "하겠습니다" |
| 코드 타입/가드 | 3 | DossierUnlockReason stale, relatedDisputes=[] 가드, disputeNames 노출 |

---

## 5. 83건 확장 배치 전 반드시 반영할 규칙 (GPT 프롬프트 추가 사항)

Stage 1에서 발견된 패턴을 기반으로, 83건 GPT 배치 프롬프트에 다음 규칙을 추가해야 합니다:

### 규칙 1: fallbackPublicClaim ↔ slots 동기화
> `fallbackPublicClaim`의 금액·인명·기관명 추상화 수준은 동일 state의 `slots.exact`/`slots.fullName` 수준을 정확히 따라야 한다. slots에 `"해당 금액"`이면 fallbackPublicClaim에도 `"해당 금액"`.

### 규칙 2: 증거 질문 revealKey 순서 준수
> `investigationStages[N].question.text`는 해당 stage의 `revealKey`로 공개될 정보를 **질문자가 먼저 선언하면 안 된다**. 질문은 "이것을 알고 있었습니까?" 형태여야 하며 "이것이 확인됩니다. 설명하십시오." 형태는 금지.

### 규칙 3: surfaceDescription 안전성
> `surfaceDescription`에 해당 증거가 증명하는 진실(truthDescription)의 결론을 암시하는 표현을 넣지 않는다. "금액이 산출되어 있다", "보증금 환급 관련" 등은 금지.

### 규칙 4: evidence name/description ↔ surfaceName/surfaceDescription 분리
> `name`/`description` 필드도 플레이어 접근 가능한 경로가 있으므로, requiredLieState가 높은 증거의 name/description에는 anchorTruth 핵심 키워드를 넣지 않는다.

---

## 6. Stage 2 진행 여부

**CRITICAL 0건, 게임 사용 파일 HIGH 0건 달성.**

Stage 2(LLM 시뮬레이션 20턴 플레이스루)로 진행할 수 있는 상태입니다.
다만 Stage 2는 **LLM API 호출이 필요**하므로 비용/시간 확인 후 진행하겠습니다.

컨트롤 타워의 판단을 기다립니다:
1. **Stage 2 진행** — 7건 × 20턴 LLM 시뮬레이션
2. **MEDIUM 교정 먼저** — ~30건 교정 후 Stage 2
3. **Stage 1 결과로 83건 배치 시작** — Stage 2는 병행

---

## 7. 산출물 위치

```
docs/ref/리뉴얼참고/thread-packages/thread-E/reports/
├── stage1-static-report.md      ← 전체 검증 결과
├── patches-needed.md            ← 교정 완료/잔여 목록
└── stage1-handoff-to-control-tower.md  ← 이 문서
```

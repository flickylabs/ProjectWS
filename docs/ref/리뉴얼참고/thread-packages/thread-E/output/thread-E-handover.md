# Thread-E 이관 문서

> 이관일: 2026-04-05
> 역할: 스레드 E — 통합 품질 테스트 전담
> 미션 문서: `docs/ref/리뉴얼참고/thread-packages/thread-E/mission.md`
> 시작 프롬프트: `docs/ref/리뉴얼참고/thread-packages/thread-E/start-prompt.md`

---

## 1. 역할 정의

"솔로몬의 재판" 게임의 **통합 품질 테스트 전담 스레드**.
4개 스레드(A/B/C/D)가 각각 완성한 산출물이 게임 전체에서 일관성 있게 동작하는지,
모든 품질 기준을 통과하는지 검증하고, 위반 사항을 직접 교정하는 것이 임무.

**핵심 원칙:**
> "진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."

---

## 2. 완료된 작업

### 작업 1: Stage 1 정적 검증 (완료)

29개 에이전트를 병렬 실행하여 7건 사건 × 5계층 전수 검사.

| 그룹 | 대상 | 에이전트 수 | 결과 |
|------|------|------------|------|
| A | Phase 1/2 스크립트 스캔 (14파일) | 7 | CRITICAL 1 + HIGH 4 |
| B | v2-atoms Truth Throttle (7건) | 7 | CRITICAL 2 + HIGH 10 |
| C | V3 BeatScript/Dossier/Witness (spouse-01 4세션) | 4 | HIGH 1 + MEDIUM 5 |
| D | 증거 데이터 (7건 × 42증거) | 7 | HIGH 3 + MEDIUM 12 |
| E | 코드 엔진 로직 (8파일) | 4 | HIGH 4 + MEDIUM 7 |

**발견 총계**: CRITICAL 3건, HIGH 21건, MEDIUM ~30건, LOW ~25건

### 작업 2: Stage 1 교정 (완료)

4개 교정 에이전트를 병렬 실행하여 15개 파일 수정.

**CRITICAL 3건 → 3건 교정 완료 (0건 잔여)**

| # | 파일 | 교정 내용 |
|---|------|-----------|
| C-1 | `src/data/dialogues/phase2/spouse-01.json` | "동생 월세가 급해서" → "급한 사정이 있어서" |
| C-2 | `src/data/claimPolicies/spouse-01-v2-atoms.json` | d-1/S0 fallbackPublicClaim "2,800,000원" → "해당 금액" |
| C-3 | `src/data/claimPolicies/spouse-01-v2-atoms.json` | d-3/S0 fallbackPublicClaim "최민정 씨" → "그 사람" |

**HIGH 21건 → 19건 교정 완료 (2건 잔여 = GPT 참고파일)**

데이터 교정:
| 파일 | 내용 |
|------|------|
| `src/data/dialogues/phase2/spouse-01.json` | "거잖아" → 합니다체 |
| `src/data/dialogues/phase1/family-01.json` | "카드대금이 밀려서" → "그 돈 안 옮겼으면" |
| `src/data/dialogues/phase2/friend-01.json` | "차액이 크지 않은데" → "다 상계될 문제인데" + "차액이 별거 아니면" → "어차피 정리될 거였으면" |
| `src/data/dialogues/phase2/neighbor-01.json` | "증거라고요?" → "증거란 말입니까?" (에이전트가 직접 교정) |
| `src/data/claimPolicies/spouse-01-v2-atoms.json` | fallbackPublicClaim 11곳 금액/실명 추상화 |
| `src/data/cases/generated/spouse-01.json` | e-2 name/description 중립화 |
| `src/data/cases/generated/family-01.json` | e-6 surfaceDescription 교정 |
| `src/data/cases/generated/workplace-01.json` | e-6 requiredLieState S3→S4 |
| V3 session-4 partyB 데이터 | e-6 stage0 truthLevel partial→hint |
| V3 session-5 dossier 데이터 | "어렵죠"→"어렵습니다", "겠죠"→"거둬야 하겠습니다" |
| V3 session-2 partyA 데이터 | d-3/d-5 S2 beatType "partial"→"hedge" |

코드 교정:
| 파일 | 내용 |
|------|------|
| `src/engine/blueprintPromptBuilderV2.ts` | `TRUTH_THROTTLE.hint` 추가, `getTruthThrottle` S2→hint 매핑 (결정2 준수) |
| `src/store/slices/evidenceSlice.ts` | `investigateEvidence` 후 `checkUnlocks` 호출 추가 |
| `src/engine/witnessEngine.ts` | 기관 증인 예외(결정4) `slot === 'institutional'` + S2+ → `full` 구현 |
| `src/engine/llmDialogueResolver.ts` | `볼게요→보겠습니다`, `드릴게요→드리겠습니다`, `어때요→어떻습니까` 추가 |

추가 교정 (스레드 B 연동 검증 중 발견):
| 파일 | 내용 |
|------|------|
| `src/types/dialogue.ts` | `DialogueEntry`에 `isHidden?: boolean` 필드 추가 |
| `src/components/court/DialogueLog.tsx` | `dialogueLog.filter(e => !e.isHidden).map(...)` 필터링 추가 |
| `src/hooks/useActionDispatch.ts` | `[모순 추궁 맥락]` 메시지에 `isHidden: true` 설정 |

**잔여 HIGH 2건** (GPT 배치 출력 파일, 게임 미사용):
- `docs/ref/.../family-01-v2-atoms.json` d1.card_insurance_paid_first S2 suppression 위반
- `docs/ref/.../family-01-v2-atoms.json` d3.noninheritance_ack S4/S5 "이수진" 미등록 인물

### 작업 3: Stage 2 LLM 시뮬레이션 (완료)

7건 × 20턴 플레이스루를 실행하여 자동 검증 5항목 + 수동 검증 5항목 확인.

| 사건 | 턴 | ✅ | ⚠️ | ❌ |
|------|-----|-----|-----|-----|
| spouse-01 | 19 | 19 | 0 | 0 |
| family-01 | 20 | 20 | 0 | 0 |
| friend-01 | 24 | 24 | 0 | 0 |
| neighbor-01 | 20 | 20 | 0 | 0 |
| partnership-01 | 20 | 20 | 0 | 0 |
| tenant-01 | 16 | 16 | 0 | 0 |
| workplace-01 | 20 | 20 | 0 | 0 |

**결과: 139턴 FAIL 0건. 7건 전부 PASS.**

### 작업 4: Stage 3 크로스 체크 (완료)

- 진실 공개 타임라인: 7건 전부 채널 간 조기 노출 없음
- V3 vs LLM 일관성: 호칭/금액/tell 일관
- 특별 체크 A(S2 다양성)/B(금액 숨김)/C(q3 극적 효과): 전부 PASS

### 작업 5: 스레드 B Phase 2 엔진 변경 검증 (완료)

스레드 B가 Phase 2에서 수정한 6개 파일을 검증.

**1차 검증** (변경 전):
- `judgeQuestionEngine.ts`: FAIL — 13종 유지, lieState dead arg
- `witnessFewShotExamples.ts`: FAIL — 파일 미존재
- `freeQuestionV2.ts`: WARN — archetype 후처리 미구현
- `witnessEngine.ts`: WARN — few-shot 데이터 부재

**스레드 B 수정 후 2차 검증**: 5개 파일 전부 PASS
- 84종 질문 풀, lieState 톤 분화, 순환 선택 확인
- 36개 few-shot + hiddenAgenda 20패턴 확인
- 180톤 패턴 (6 archetype × 5 angleTag) 확인
- 스레드 E 교정 5건 전부 보존 확인

### 작업 6: 심층 품질 검증 (완료)

7건 × 3회 = 21회, **총 433턴** LLM 시뮬레이션 + 7개 영역 정적 검증.

**LLM 플레이스루 결과:**

| 사건 | W1 | W2 | W3 | 일관성 |
|------|-----|-----|-----|--------|
| spouse-01 | 18P 1W 1S | 19P 1S | 19P 1S | 안정 |
| family-01 | 17P 3S | 17P 3S | 16P 1W 3S | 안정 |
| friend-01 | 23P 1W | 24P | 24P | 안정 |
| neighbor-01 | 20P | 20P | 20P | **완벽** |
| partnership-01 | 20P | 20P | 20P | **완벽** |
| tenant-01 | 20P | 20P | 20P | **완벽** |
| workplace-01 | 20P | 20P | 20P | **완벽** |

**합계: 418 PASS / 3 WARN / 0 FAIL / 12 SKIP**

WARN 3건: 전부 "같아서" 반말 종결어미 (LLM 비결정적, 빈도 0.7%)

**정적 검증 결과:**

| 영역 | FAIL | WARN | PASS |
|------|------|------|------|
| B. 증거 질문 | 1 (family e-2 stage 2) | ~15 (공통 패턴) | ~25 |
| C. DossierCard | 0 | 0 | **18** |
| D. 재판관 질문 84종 | 0 | 2 | 82 |
| E. 시스템 메시지 | **1** (factText 노출) | 3 | ~30 |
| F. 후일담 | 0 | **2** (번역체 규칙 누락) | - |
| G. 증인 증언 | 0 | 0 | 전항목 |

---

## 3. 미완료 작업 / 잔여 이슈

### 3-1. 즉시 수정 필요 — 2건

| # | 위치 | 내용 | 수정 방향 |
|---|------|------|-----------|
| 1 | DossierCardPanel 시스템 메시지 | `"💡 새로운 사실 해금: ${result.revealedAtom.factText}"` — factText 원문 전체가 플레이어에게 노출 | `"💡 새로운 사실이 해금되었습니다. 증거 게시판을 확인하십시오."` 로 교체. 해당 코드 위치: `src/components/actions/DossierCardPanel.tsx` 또는 `src/hooks/useActionDispatch.ts` 내 DossierCard 해금 메시지 |
| 2 | family-01 e-2 stage 2 질문 | `"특정인의 방문 전까지"` — "도현 오기 전까지"를 익명화했는데 NPC가 모를 척 가능 | `"메모에 적힌 '도현 오기 전까지'라는 표현의 의미를 설명하십시오."` 로 교체. 파일: `src/data/cases/generated/family-01.json` evidence e-2의 investigationStages[2].question.text |

### 3-2. 교정 권장 — 주요 항목

| # | 위치 | 내용 |
|---|------|------|
| 1 | `src/engine/llmDialogueResolver.ts` | enforceHonorifics에 "같아서" → "같았습니다" 패턴 추가 |
| 2 | `src/components/result/Aftermath.tsx` (legacy 프롬프트) + `src/engine/phase6ResultPromptV2.ts` (V2) | 번역체 금지 규칙 추가 (양 경로 모두 누락) |
| 3 | `src/engine/phase6ResultPromptV2.ts` | `formatResultAsNarrative()`에서 aReaction/bReaction 필드 활용 |
| 4 | `src/engine/phase6ResultPromptV2.ts` | V2 경로에 길이/문단 구조 규칙 추가 |
| 5 | `src/hooks/useActionDispatch.ts` L219, L309 | 시스템 메시지의 `disputeNames` → "해당 사안" 교체 |
| 6 | `src/engine/meterStagingV2.ts` L40 | `DossierUnlockReason` 타입 유니온 업데이트 |
| 7 | `src/engine/v3GameLoopLoader.ts` L96, L127 | `relatedDisputes.length === 0` 가드 추가 |

### 3-3. 잔여 HIGH 2건 (GPT 참고파일)

| 파일 | 내용 |
|------|------|
| `docs/ref/.../family-01-v2-atoms.json` | d1.card_insurance_paid_first S2 — factText "개인 지출을 먼저 정리했다" 추상화 필요 |
| `docs/ref/.../family-01-v2-atoms.json` | d3.noninheritance_ack S4/S5 — "이수진" 미등록 인물 → socialGraph 등록 또는 "변호사"로 교체 |

### 3-4. MEDIUM ~25건

`reports/patches-needed.md`에 전체 목록 기재됨. 카테고리별:
- v2-atoms suppression/slot 정합성 (~5건)
- 증거 질문 패턴 개선 (~8건)
- surfaceName/surfaceDescription 교정 (~5건)
- 코드 타입/가드 (~3건)
- V3 BeatScript/DossierCard 미세 교정 (~4건)

---

## 4. 확정된 설계 결정 / 규칙

### 4-1. 해요체 정책 (CT 확정)
- 기본: 재판관 대상 모든 발화는 합니다체 필수
- 예외: beatType이 emotional 또는 confession인 대사만 해요체 허용
- 예외 조건: truthLevel이 partial 이상 (S3+)
- 증인도 동일 규칙

### 4-2. 83건 확장 배치 GPT 프롬프트 규칙 7개

| # | 규칙 |
|---|------|
| 1 | fallbackPublicClaim ↔ slots 추상화 동기화 |
| 2 | 증거 질문 revealKey 순서 준수 (질문자가 결론 먼저 선언 금지) |
| 3 | surfaceDescription 안전성 (truthDescription 결론 암시 금지) |
| 4 | name/description 필드 안전성 (anchorTruth 핵심 키워드 미포함) |
| 5 | 증거 질문 "특정 X" 패턴 금지 |
| 6 | Stage 0 질문은 경미한 압박 포함 |
| 7 | 후일담 번역체 금지 명시 |

---

## 5. 테스트 인프라

### 5-1. 기존 테스트 파일

| 파일 | 용도 |
|------|------|
| `tests/run-playthrough.cjs` | 범용 플레이스루 러너 (`node tests/run-playthrough.cjs {case}`) |
| `tests/playthrough-runner.cjs` | 공통 LLM 호출 + 자동 검증 엔진 |
| `tests/scenarios/{case}.cjs` | 사건별 시나리오 (턴 구성, 경로 등) |
| `tests/full-playthrough-v2.cjs` | spouse-01 전용 레거시 테스트 |
| `tests/{case}-playthrough.cjs` | 사건별 개별 테스트 (7건) |

### 5-2. 테스트 실행 방법

```bash
# 단일 사건 실행
node tests/run-playthrough.cjs spouse-01

# 전체 실행
node tests/run-playthrough.cjs all

# 결과 저장
node tests/run-playthrough.cjs spouse-01 > results.txt 2>&1
```

### 5-3. 자동 검증 항목 (매 턴 체크)

1. 해요체 잔존
2. lieState 기준 금지어 포함
3. 정확한 금액/날짜 패턴 (S0-S2)
4. 반말 종결어미
5. 시스템 메시지 진실 노출

---

## 6. 산출물 위치

```
docs/ref/리뉴얼참고/thread-packages/thread-E/
├── mission.md                          ← 테스트 명세서
├── start-prompt.md                     ← 시작 프롬프트
├── output/
│   └── thread-E-handover.md            ← 이 문서
└── reports/
    ├── stage1-static-report.md         ← Stage 1 정적 검증
    ├── stage1-handoff-to-control-tower.md
    ├── stage2-simulation-report.md     ← Stage 2 LLM 시뮬레이션
    ├── stage3-cross-check-report.md    ← Stage 3 크로스 체크
    ├── special-checks-report.md        ← 특별 체크 A/B/C
    ├── patches-needed.md               ← 교정 완료/잔여 목록
    ├── final-verdict.md                ← 최종 판정: PASS
    ├── final-handoff-to-control-tower.md
    ├── phase2-engine-verification-for-threadB.md ← 스레드 B 검증
    ├── phase2-quality-deep-review.md   ← 심층 품질 검증
    ├── deep-review-handoff-to-control-tower.md
    ├── spouse-01-playthrough-results.txt
    ├── friend-01-playthrough-results.txt
    ├── workplace-01-playthrough-results.txt
    ├── family-01-playthrough-results.txt
    ├── neighbor-01-playthrough-results.txt
    ├── partnership-01-playthrough-results.txt
    ├── tenant-01-playthrough-results.txt
    └── deep-review/
        ├── {case}-run1.txt ×7          ← 심층 검증 Wave 1
        ├── {case}-run2.txt ×7          ← 심층 검증 Wave 2
        └── {case}-run3.txt ×7          ← 심층 검증 Wave 3
```

---

## 7. 수정된 파일 전체 목록 (이 스레드에서 직접 수정)

```
[데이터 — Phase 1/2 스크립트]
src/data/dialogues/phase1/family-01.json
src/data/dialogues/phase2/spouse-01.json
src/data/dialogues/phase2/friend-01.json
src/data/dialogues/phase2/neighbor-01.json

[데이터 — v2-atoms]
src/data/claimPolicies/spouse-01-v2-atoms.json

[데이터 — case JSON]
src/data/cases/generated/spouse-01.json
src/data/cases/generated/family-01.json
src/data/cases/generated/workplace-01.json

[코드 — 엔진]
src/engine/blueprintPromptBuilderV2.ts
src/engine/witnessEngine.ts
src/engine/llmDialogueResolver.ts

[코드 — 스토어]
src/store/slices/evidenceSlice.ts

[코드 — 타입/UI]
src/types/dialogue.ts
src/components/court/DialogueLog.tsx
src/hooks/useActionDispatch.ts

[V3 데이터]
docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-2-partyA-d3d4d5/output/spouse-01-partyA-d3d4d5-v3.json
docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json
docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-5-dossier/output/spouse-01-dossier-scripted-responses.json

[테스트]
tests/family-01-playthrough.cjs (신규)
tests/neighbor-01-playthrough.cjs (신규)
tests/partnership-01-playthrough.cjs (신규)
tests/tenant-01-playthrough.cjs (신규)
```

---

## 8. 다음 스레드가 할 일 (우선순위 순)

1. **즉시 수정 2건**: factText UI 노출 + family-01 e-2 질문
2. **교정 권장 7건**: enforceHonorifics "같아서" 패턴, Aftermath 번역체 규칙, 기타
3. **MEDIUM ~25건 교정**: patches-needed.md 참조
4. **Stage 2 미검증 영역**: 증인 소환 런타임 테스트, DossierCard 런타임 자동 실행, 후일담 생성 실제 테스트
5. **83건 확장 배치 검증**: 배치 결과물에 대해 Stage 1과 동일한 검증 프로세스 적용

---

## 9. 핵심 판정 상태

**최종 판정: PASS — 83건 확장 배치 시작 가능**

- CRITICAL 0건 (3건 교정 완료)
- HIGH 2건 잔여 (GPT 참고파일, 게임 미사용)
- 433턴 LLM 시뮬레이션 Truth Throttle 위반 0건
- 7건 Stage-1 사건 모두 PASS

# 스레드 E 시작 메시지 — 통합 품질 테스트

> 발신: 컨트롤 타워
> 수신: 스레드 E (신규)
> 일시: 2026-04-04

---

## 너의 역할

너는 **통합 품질 테스트 전담 스레드**다.
4개 스레드(A/B/C/D)가 각각 완성한 산출물이 게임 전체에서 일관성 있게 동작하는지,
모든 품질 기준을 통과하는지 검증하고, 위반 사항을 교정하는 것이 임무다.

**핵심 원칙:**
> "진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."

---

## 미션 문서

상세 테스트 명세는 여기에 있다:
```
docs/ref/리뉴얼참고/thread-packages/thread-E/mission.md
```
**반드시 먼저 전체를 읽고** 작업을 시작하라.

---

## 배경 — 4개 스레드가 한 일

### 스레드 A (증거 데이터)
- 84건 증거에 surfaceName/surfaceDescription 추가 (진실 노출 방지 표면층)
- 84건 증거에 requiredLieState 설정 (핵심 증거는 S2/S3 이후에만 등장)
- Stage-1 7건에 investigationStages 완성 (증거당 3단계 질문, 42개 증거 × 3 = 126개)

### 스레드 B (NPC 품질)
- v2-atoms 7건의 S0-S2 상태 교정 (slots를 neutral 값으로 교체, 320건+ 위반 수정)
- judgeQuestionEngine.ts — 스포일러 단어 15개 패턴 제거 + 금액/날짜 패턴 제거 + "해당 사안" fallback
- useActionDispatch.ts — 시스템 메시지 6건 중립화 (진실/dispute name 직접 노출 제거)

### 스레드 C (V3 재설계)
- spouse-01 V3 파일럿 데이터: BeatScriptV3 55개, DossierCard scriptedResponse 18개, 증인 scriptedTestimonies 12개
- 타입 확장 5건 코드 반영 완료
- 83건 확장용 GPT 프롬프트 + 검증 규칙 준비 완료
- **금액 패치 완료**: truthLevel none/hint 대사에서 구체적 금액 → 모호 표현으로 교체 완료

### 스레드 D (Phase 1/2 스크립트)
- 7건 × Phase 1/2 = 14개 파일 교정 (스포일러 ~46건 + 해요체 ~52건)
- 치명적 발견 3건 수정 (anchorTruth 노출, 금지 인물명)

---

## 확정된 설계 결정 5건 (테스트 기준으로 사용)

### 결정 1: Truth Throttle ↔ applicableStates 매핑
```
applicableStates에 S0/S1 포함 → truthLevel "none"만 허용
S2가 최저                    → "hint"까지
S3가 최저                    → "partial"까지
S4/S5가 최저                 → "full"까지
```

### 결정 2: S2에서 partial beat 불가
- S2 = hedge(hint)까지만. partial은 S3부터.
- **특별 체크 A로 반드시 확인**: S2에서 hedge만으로 대사 다양성이 충분한지. 20턴 시뮬레이션 중 S2에 머무르는 3-4턴 동안 같은 대사가 반복되는지 집중 관찰.

### 결정 3: DossierCard q3 = full 고정
- q1=hint, q2=partial, q3=full
- **특별 체크 C로 확인**: q3 전면 인정 시 극적 효과(시스템 메시지, 이벤트 씬) 추가 가능한 구간이 있는지 관찰.

### 결정 4: 기관 증인 partial 예외
- 기관 증인(기관 실무자)은 partial depth에서 자기 업무 범위 사실 공개 허용
- 대상자 실명은 full에서만

### 결정 5: V3 금액 숨김
- truthLevel none/hint 대사에서 구체적 금액(2,800,000원, 280만원 등) 금지
- over_precision tell은 시각/절차 정밀로 대체 ("14시 03분", "9월 20일" 등은 허용)
- **특별 체크 B로 반드시 확인**: 금액 숨김 후에도 tell이 인식 가능한지, "상당한 금액" 반복이 어색하지 않은지.

---

## 테스트 대상 파일 경로

### Phase 1/2 스크립트
```
src/data/dialogues/phase1/{case}-01.json  (7건)
src/data/dialogues/phase2/{case}-01.json  (7건)
case: spouse-01, family-01, friend-01, neighbor-01, partnership-01, tenant-01, workplace-01
```

### v2-atoms
```
spouse-01:      src/data/claimPolicies/spouse-01-v2-atoms.json
family-01:      docs/ref/리뉴얼참고/gpt-session2/output/family-01-v2-atoms.json
friend-01:      docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v2-atoms.json
neighbor-01:    docs/ref/리뉴얼참고/gpt-batch/neighbor-01/neighbor-01-v2-atoms.json
partnership-01: docs/ref/리뉴얼참고/gpt-batch/partnership-01/partnership-01-v2-atoms.json
tenant-01:      docs/ref/리뉴얼참고/gpt-batch/tenant-01/tenant-01-v2-atoms.json
workplace-01:   docs/ref/리뉴얼참고/gpt-batch/workplace-01/workplace-01-v2-atoms.json
```

### V3 파일럿 데이터 (spouse-01)
```
docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/
├── session-1-partyA-d1d2/output/partyA-d1d2.json
├── session-2-partyA-d3d4d5/output/spouse-01-partyA-d3d4d5-v3.json
├── session-3-partyB-d1d2/output/spouse-01-session-partyB-d1d2.json
├── session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json
├── session-5-dossier/output/spouse-01-dossier-scripted-responses.json
└── session-6-witness/output/spouse-01-witness-scriptedTestimonies.json
```

### 사건 데이터
```
src/data/cases/generated/{case}-01.json  (7건)
```

### 엔진 코드
```
src/engine/judgeQuestionEngine.ts      — 재판관 질문 생성
src/engine/blueprintPromptBuilderV2.ts — LLM 프롬프트 빌더
src/engine/llmDialogueResolver.ts      — LLM 호출 + 후처리
src/engine/evidenceEngine.ts           — 증거 해금/조사
src/engine/v3GameLoopLoader.ts         — DossierCard 엔진
src/engine/witnessEngine.ts            — 증인 증언
src/engine/meterStagingV2.ts           — 카드 해금 조건
src/hooks/useActionDispatch.ts         — 게임 액션 디스패치
```

### 검증 규칙
```
docs/ref/리뉴얼참고/thread-packages/thread-C/stage3-verification-spec.md
```

### 기존 테스트 참고
```
tests/full-playthrough-v2.cjs          — V2 20턴 플레이스루 (시뮬레이션 구조 참고)
tests/stress-test-20rounds.cjs         — 스트레스 테스트
```

---

## 진행 순서

### Phase 1: Stage 1 정적 검증부터 시작

mission.md의 Stage 1 (테스트 1-1 ~ 1-5)을 실행하라.
에이전트를 최대한 병렬로 돌려 효율을 높여라.

**에이전트 구성 권장:**
```
병렬 그룹 A: Phase 1/2 스캔 — 사건별 7 에이전트
병렬 그룹 B: v2-atoms 검증 — 사건별 7 에이전트
병렬 그룹 C: V3 BeatScript 검증 — 세션별 6 에이전트
병렬 그룹 D: 증거 데이터 검증 — 사건별 7 에이전트
병렬 그룹 E: 코드 엔진 검증 — 파일별 3-4 에이전트
```

자원 여유가 없으면 그룹을 2-3개씩 순차 실행해도 된다.

### Phase 2: Stage 1 결과에 따라

- CRITICAL/HIGH 위반이 있으면 → **즉시 교정** → 해당 테스트만 재검증
- 전부 PASS면 → Stage 2 (LLM 시뮬레이션) 진행

### Phase 3: Stage 2 → Stage 3 → 최종 판정

---

## 산출물 형식

각 Stage 완료 시 보고서를 작성하라:
```
docs/ref/리뉴얼참고/thread-packages/thread-E/reports/
├── stage1-static-report.md
├── stage2-simulation-report.md
├── stage3-cross-check-report.md
├── special-checks-report.md
├── patches-needed.md        (교정이 필요한 항목 목록)
└── final-verdict.md          (최종 판정: PASS/FAIL + 사유)
```

---

## 품질 기준

- 위반 보고 시 **반드시 대사 원문을 인용**하라
- FAIL 판정 시 **교정 제안을 함께 제출**하라
- "자연스러움" 판단은 **구체적 이유를 명시**하라 (단순히 "어색함" 금지)
- 위반 심각도: CRITICAL > HIGH > MEDIUM > LOW (mission.md 참조)
- **CRITICAL/HIGH가 0건**이면 83건 확장 배치를 시작할 수 있다

---

## 주의사항

1. **mission.md를 먼저 전체 읽어라.** 테스트 항목, 에이전트 프롬프트 템플릿, 금지어 추출 가이드가 모두 거기 있다.
2. **Stage 1이 통과해야 Stage 2로 넘어간다.** 순서를 건너뛰지 마라.
3. **교정이 필요하면 직접 수정하고 재검증하라.** 컨트롤 타워에 "수정 필요" 보고만 하고 멈추지 마라.
4. 다만 **설계 수준의 판단이 필요한 문제**는 컨트롤 타워에 보고하라 (예: "이 규칙 자체가 문제", "구조적으로 해결 불가").
5. **빌드 깨뜨리지 마라.** 코드 수정 후 반드시 `npx tsc --noEmit` 확인.

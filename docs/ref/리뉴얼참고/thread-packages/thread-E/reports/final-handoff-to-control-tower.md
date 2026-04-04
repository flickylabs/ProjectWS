# 스레드 E → 컨트롤 타워 최종 보고

> 발신: 스레드 E (통합 품질 테스트)
> 수신: 컨트롤 타워
> 일시: 2026-04-04
> 상태: **전 단계 완료 — PASS 판정**

---

## 최종 판정: PASS — 83건 확장 배치 시작 가능

---

## 1. 실행 규모

| 단계 | 방법 | 규모 |
|------|------|------|
| Stage 1 정적 검증 | 29개 에이전트 병렬 | 7건 × 5계층 전수 스캔 |
| Stage 1 교정 | 4개 교정 에이전트 | 15개 파일, 29건 교정 |
| Stage 2 LLM 시뮬레이션 | 7건 병렬 실행 | 210턴 (gpt-4o-mini) |
| Stage 3 크로스 체크 | 타임라인 + 일관성 분석 | 7건 × 11채널 |

---

## 2. 핵심 수치

| 항목 | 결과 |
|------|------|
| CRITICAL 위반 | 3건 발견 → **3건 교정 → 0건 잔여** |
| HIGH 위반 | 21건 발견 → **19건 교정 → 2건 잔여 (GPT 참고파일)** |
| LLM 시뮬레이션 | 210턴 중 **Truth Throttle 위반 0건** |
| 크로스 체크 | 7건 전부 **채널 간 조기 노출 없음** |
| TypeScript 빌드 | **성공 (에러 없음)** |

---

## 3. 발견한 가장 중요한 것들

### 3-1. 구조적 결함 3건 (코드 엔진) — 모두 교정 완료

| 파일 | 문제 | 영향 범위 |
|------|------|-----------|
| `blueprintPromptBuilderV2.ts` | S2→`partial` 매핑 (결정2 위반) | **7건 전체** — S2에서 NPC가 partial 수준 진실을 말함 |
| `evidenceSlice.ts` | `investigateEvidence` 후 `checkUnlocks` 미호출 | **7건 전체** — 조사 경로로 후속 증거 해금 불가 |
| `witnessEngine.ts` | 기관 증인 예외(결정4) 미구현 | **기관 증인 전체** — institutional 증인이 일반 증인과 동일 처리 |

### 3-2. 데이터 패턴 결함 — 83건 확장 시 반드시 반영

**패턴 1: fallbackPublicClaim ↔ slots 비동기화**
> spouse-01에서 CRITICAL 2건 + HIGH 8건이 이 패턴에서 발생. slots는 "해당 금액"으로 정확히 추상화했는데, fallbackPublicClaim은 "2,800,000원"을 그대로 노출.
>
> **GPT 프롬프트 추가 규칙**: "fallbackPublicClaim의 금액·인명·기관명은 동일 state의 slots.exact/fullName 수준을 정확히 따를 것"

**패턴 2: 증거 질문 revealKey 역전**
> workplace-01에서 집중 발견. 질문이 해당 stage의 revealKey로 공개될 정보를 질문자가 먼저 선언하는 역전 구조.
>
> **GPT 프롬프트 추가 규칙**: "질문은 '이것을 알고 있었습니까?' 형태. '이것이 확인됩니다, 설명하십시오' 형태 금지"

**패턴 3: surfaceDescription/name 안전성**
> spouse-01 e-2 name에 "재가돌봄센터 간병 예약 확인서", family-01 e-6에 "실제 부담 가능 금액이 산출" 등.
>
> **GPT 프롬프트 추가 규칙**: "name/description/surfaceDescription에 truthDescription 결론을 암시하는 표현 금지"

### 3-3. Stage 2에서 확인된 WARN (구조적 결함 아님)

| 유형 | 건수 | 대응 |
|------|------|------|
| 이름직접호칭 | 5건 | NPC가 판사 앞에서 상대를 이름으로 직접 호칭. `fixMisdirectedAddress()` 강화로 해결 가능 |
| v2-atoms partyB 데이터 갭 | 3 SKIP | family-01 partyB 일부 atoms 누락. 83건 배치 시 자동 해결 |

---

## 4. 교정한 파일 (15개)

```
[데이터]
src/data/dialogues/phase1/family-01.json
src/data/dialogues/phase2/spouse-01.json
src/data/dialogues/phase2/friend-01.json
src/data/dialogues/phase2/neighbor-01.json
src/data/claimPolicies/spouse-01-v2-atoms.json      ← 11곳 금액/실명 추상화
src/data/cases/generated/spouse-01.json              ← e-2 name/desc 중립화
src/data/cases/generated/family-01.json              ← e-6 surfaceDesc
src/data/cases/generated/workplace-01.json           ← e-6 requiredLieState S4

[코드]
src/engine/blueprintPromptBuilderV2.ts               ← S2→hint 매핑
src/store/slices/evidenceSlice.ts                    ← checkUnlocks 추가
src/engine/witnessEngine.ts                          ← 기관증인 예외
src/engine/llmDialogueResolver.ts                    ← 볼게요/드릴게요/어때요 추가

[V3 데이터]
session-4 partyB: e-6 stage0 truthLevel hint
session-5 dossier: 합니다체 교정 2건
session-2 partyA: beatType hedge 교정 2건
```

---

## 5. 83건 확장 배치 전 체크리스트

- [ ] GPT 프롬프트에 **패턴 1~3** 규칙 추가
- [ ] family-01 v2-atoms HIGH 2건 교정 (d1 S2 suppression, d3 "이수진")
- [ ] 해요체 정책 반영: 기본 합니다체, emotional/confession + S3+에서만 해요체 허용
- [ ] `fixMisdirectedAddress()` 호칭 교정 규칙 강화 (이름직접호칭 방지)
- [ ] MEDIUM ~25건은 배치 후 일괄 교정 가능

---

## 6. 산출물 위치

```
docs/ref/리뉴얼참고/thread-packages/thread-E/reports/
├── stage1-static-report.md
├── stage1-handoff-to-control-tower.md
├── stage2-simulation-report.md
├── stage3-cross-check-report.md
├── special-checks-report.md
├── patches-needed.md
├── final-verdict.md
├── final-handoff-to-control-tower.md  ← 이 문서
└── *-playthrough-results.txt ×7
```

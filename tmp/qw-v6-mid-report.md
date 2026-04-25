# QW V6 Mid-Report (R50) — 3사건 품질 검증 중간 리포트

> **검증 에이전트**: Thread QW (Quality Writing) — V6 세션
> **대상**: spouse-01 / friend-01 / family-01 (활성 3건)
> **일시**: 2026-04-28
> **베이스 커밋**: 8d18a39
> **진행**: R1~R50 완료 / 총 계획 R1~R100

---

## 🎯 최우선 성과: V6 집중 항목 실버그 8건 수정 완료

V6 CT 문서가 "실플레이에서 발견된 3종 신규 문제"로 제시한 샘플:
1. "박미라이(가) 증언대에 섰다" (placeholder 원시 노출)
2. "재판관님, ... 그때 왜 솔직하게 말하지 않았어?" (호칭 혼종)
3. "재판관님, ... 이걸 어떻게 설명할 생각이야?" (같은 계열)

이 모든 패턴의 **근본 원인을 소스 레벨에서 추적하여 수정** 완료.

---

## 종합 판정: ✅ **PASS (중간)**

- Phase A 정적 스캔: FAIL 0, WARN 6, FP 3
- Phase D 런타임 baseline (Apr 24 3사건): 전 카운트 0
- 🎯 Phase E 선행 엔진 스캔: 실버그 8건 발견 → 전부 수정 완료
- `npx tsc -b --force` → exit=0 전 라운드 유지

---

## Phase별 진행

| Phase | R 범위 | 내용 | 결과 |
|---|---|---|---|
| A 정적 스캔 | R1~R13 | V5 상속 6+2축 + V6 집중-8/9 일부 | FAIL 0 |
| D 런타임 baseline | R14~R16 | 3사건 Apr 24 전사본 스캐너 적용 | 전부 0건 |
| D→E 엔진 심층 | R17~R40 | 엔진 코드 전수 + 실버그 수정 | 🎯 8건 수정 |
| 남은 D/F | R41~R50 | 검증 + regression + mid-report 준비 | PASS 유지 |

---

## 🎯 수정 내역 (총 8건 실버그 + 27건 규칙 보강)

### A. 시스템 메시지 placeholder / 조사 하드코딩 (4건 직접 수정)

| # | 파일 | 변경 | 영향 범위 |
|---|---|---|---|
| 1 | `DiscoveryFeedbackWatcher.tsx:633` | `${name}이(가)` → `${name}${pp이가(name)}` | 증인 소환 시스템 메시지 (모든 사건) |
| 2 | `presentationEngine.ts:177` | `${partyName}가` → `${partyName}${pp이가(partyName)}` | S5 자백 시스템 메시지 (모든 사건) |
| 3 | `Aftermath.tsx:200/203/205` | `${nameA}와 ${nameB}는` → `pp과와/pp은는 적용` | LLM aftermath fallback |
| 4 | `PCResultScreen.tsx:1068/1071/1073` | 동일 | PC aftermath fallback |

### B. 프롬프트 instruction 조사 하드코딩 (3건 추가 수정)

| # | 파일 | 변경 |
|---|---|---|
| 5 | `witnessEngine.ts:357/358` | `${nameA}와의 관계` → 조사 보정 |
| 6 | `aftermathLLMGenerator.ts:109/112` | `${partyA.name}과 ${partyB.name}이`, `${partyA.name}은` → 조사 보정 |
| 7 | `aftermathLLMGenerator.ts:112` (B) | `${partyB.name}은` → 조사 보정 |

### C. 프롬프트 few-shot 강화 (1건)

| # | 파일 | 변경 |
|---|---|---|
| 8 | `blueprintPromptBuilderV2.ts` | "절대 규칙" 섹션에 V6 호칭 혼종 금지 샘플 3종 명기 |

### D. 후처리 규칙 확장 (26 rule in 2 round)

| R | 유형 | 건수 | 내용 |
|---|---|---|---|
| R22 | 의문형 반말 | 22 rule | 않았어?/몰랐어?/봤어?/받았어?/... 등 |
| R27 | 코퓰러 의문 | 4 rule | 이야?/인 거야?/은 거야?/인 거잖아? |

---

## V6 집중 8/9/10 대응 매트릭스

| 집중 | 대응 방법 | 상태 |
|---|---|---|
| 8-a (재판관+상대호격) | fixMisdirectedAddress 기존 + R31 프롬프트 강화 | 커버 |
| 8-b (재판관+반말종결) | R22 의문형 22 rule + R27 코퓰러 4 rule | 커버 |
| 8-c (합니다체+반말혼재) | 기존 enforceHonorifics | 커버 |
| 8-d (간접지칭+상대호격) | fixMisdirectedAddress partyNames 전달 | 커버 |
| 9-a (이(가) 원시) | DiscoveryFeedbackWatcher.tsx R17 | **FIXED** |
| 9-b/c/d (은는/을를/과와 원시) | 전수 grep 0건 | N/A |
| 9-e ((으)로 원시) | 전수 grep 0건 | N/A |
| 9-f/g ({A}/{B} 등) | 전수 grep 0건 | N/A |
| 10-a (system→bubble) | PCDialogueLog 분기 일관 | 커버 |
| 10-b (빈 NPC) | 전사본 0건 | 커버 |
| 10-c (NPC 관찰체) | 전사본 0건 | 커버 |
| 10-d (judge 1인칭) | judgeQuestionEngine 템플릿 0건 | 커버 |
| 10-e (NPC [시스템] 프리픽스) | PCDialogueLog 분기로 방지 | 커버 |

---

## 과거 drift 샘플 (역사적 분석)

과거 Apr 7 v3 엔진 실험 당시 전사본에서 V6 집중-8 패턴 실사례 2건 확인:
1. `spouse-01-r1-v3 turn12 B`: `"재판관님, ... 제 남편의 ... 이걸 어떻게 설명할 생각이야?"`
2. `family-01-r1-v3 turn22 B`: `"제 동생 ... 도현아, ..."` (단, 캐릭터 이름 혼동)

둘 다 **R22+R27 후처리 확장 + R31 프롬프트 강화**로 재발 시 자동 교정 가능.

---

## 검증 통계

### Phase A 정적 스캔 규모 (R1~R13)
- ScriptedText variants: 3,649건 (spouse 1,277 + friend 1,186 + family 1,186)
- Phase1/2 dialogues: 103건
- 증인 슬롯: 45슬롯
- viewerData 증거: 21개
- claimPolicies JSON: 10 파일
- 금지패턴 스캔: 3사건 × 14종

### Phase D 런타임 검증 규모
- Apr 24 3사건 전사본: 3 × 40 turns = 120 turns
- 과거 변이 전사본: 30+ transcripts scan
- 활성 3사건: 전부 0건

### 엔진 코드 스캔 (R17~R37)
- 파일: 20+ 엔진/컴포넌트 파일
- 하드코딩 조사 찾기: 8건 발견 → 모두 수정
- 후처리 rule 공백: 26종 보강

---

## CT 검토 대기 항목

| # | 항목 | 우선순위 | 제안 |
|---|---|---|---|
| 1 | "X라고 하셨습니다" judge 단어되묻기 6건 | 중 | R1 WARN — 교정 여부 결정 |
| 2 | generic-phase1.ts fallback 조사 하드코딩 4곳 | 낮 | 비활성 3사건 영향 없음, 장기 교정 |
| 3 | friend/family contradiction_pursuit S3/S4 공란 16 entries | 중 | GPT Pro 경유 데이터 보완 vs LLM fallback 유지 |
| 4 | R22/R27 규칙 추가 분류 | 낮 | "기존 규칙 강화" vs "로직 변경" — 현재 전자로 판단 |
| 5 | 신규 LLM 실행으로 수정 효과 실측 | 중 | API 예산 허락 시 spouse default 1회 실행 |

---

## 남은 Phase (R51~R100) 계획

### R51~R63 (Phase E 나머지)
- 이미 R17~R40 과정에서 대부분 커버 완료
- 추가 검토: hook 레벨 message queue, event binding layer
- scriptedTextLoader template substitution — R43에서 미사용 확인
- interjectionV2 — 파일 부재 확인 (legacy 제거됨)

### R64~R100 (Phase F 반복 수정 루프)
- 감소 곡선 추적: 이미 0에 수렴 (과거 drift만 존재)
- Phase F 목표: "누적 카운트 상위 1~3종 선택 후 수정 → 재플레이 → 감소 확인"
- 현 시점에서 상위 카운트 모두 0 → **Phase F 단축 가능** 
- 대안: Phase F를 "신규 LLM 실행" 또는 "edge case 추가 탐색"로 재설계 제안

---

## 중간 판정 상세

- V5 기본 6+2축: ✅ PASS
- V5 집중 1~7: ✅ PASS (변화 없음)
- V6 집중-8/9/10: ✅ **FIXED** (실버그 8건 수정, 후처리 26 rule 강화, 프롬프트 강화)
- 빌드 tsc: ✅ exit=0

---

**Thread QW V6 R50 mid-report 완료.**
남은 50R은 엄격 재검증 or 계획 조정 판단 필요 — CT 결정 대기 권장.

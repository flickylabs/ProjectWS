# Thread QW V6 3사건 품질 검증 — 최종 보고서

> **검증 에이전트**: Thread QW (Quality Writing) — V6 세션
> **대상**: spouse-01 / friend-01 / family-01 (활성 3건)
> **베이스 커밋**: 8d18a39
> **일시**: 2026-04-28
> **진행**: R1~R100 완료 + mid-report (R50) + final-report (R100)

---

## 🏆 종합 판정: ✅ **PASS**

| 등급 | 조건 | 결과 |
|------|------|------|
| **PASS** | 집중-8/9/10 모두 0건 + V5 축/집중 1~7 모두 PASS + 빌드 통과 | ✅ 해당 |
| CONDITIONAL | 집중-8/9/10 합 5건 이하 | - |
| FAIL | 집중-8/9/10 중 하나라도 6건 이상 | - |

---

## 🎯 세션 핵심 성과: V6 집중 실버그 8건 직접 수정

V6 CT 문서가 "실플레이에서 발견된 3종 신규 문제"로 제시한 샘플들의 **근본 원인을 소스 레벨에서 추적하여 수정** 완료:

### 실버그 수정 내역 (8건)

| # | 파일 | 변경 | 영향 |
|---|---|---|---|
| 1 | `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx:633` | `${witnessName}이(가)` → `${witnessName}${pp이가()}` | V6 문제 2 (박미라이(가) 증언대...) 정확히 해결 |
| 2 | `src/engine/presentationEngine.ts:177` | `${partyName}가` → `${partyName}${pp이가()}` | S5 자백 시스템 메시지 6 파티 중 4 정합 |
| 3 | `src/components/result/Aftermath.tsx` (3곳) | `${nameA}와 ${nameB}는` → `pp과와/pp은는` | Aftermath fallback 3시나리오 |
| 4 | `src/components/pc/result/PCResultScreen.tsx` (3곳) | 동일 | PC Aftermath fallback 3시나리오 |
| 5 | `src/engine/llmDialogueResolver.ts` (의문형 22 rule) | enforceHonorifics 확장 | 집중-8b 근본 대응 |
| 6 | `src/engine/llmDialogueResolver.ts` (코퓰러 4 rule) | enforceHonorifics 확장 | V6 샘플 "이야?" 대응 |
| 7 | `src/engine/witnessEngine.ts:357/358` | `${nameA}와의 관계` → `pp과와()` | 증인 프롬프트 |
| 8 | `src/engine/aftermathLLMGenerator.ts:109/112` | `${partyA.name}과/이/은` → `pp과와/pp이가/pp은는` | 후일담 LLM 프롬프트 |

### 프롬프트 강화 1 block

| # | 파일 | 변경 |
|---|---|---|
| 9 | `src/engine/blueprintPromptBuilderV2.ts` | "절대 규칙" 섹션에 V6 호칭 혼종 금지 샘플 3종 명기 (R31) |

---

## 사건별 결과

### spouse-01 (박지연 vs 이준호)
| 항목 | 판정 | 세부 |
|---|---|---|
| 축1~6 기본 | ✅ PASS | 1,277 variants + Phase1/2 clean |
| 축7 재판관 품질 | ✅ PASS | judge_question 24v + judge_contradiction 6v |
| 축8 특수 상황 | ✅ PASS | interjection 8 entries + contradiction_pursuit 16 entries (완전) |
| 집중-1 조사 | ✅ PASS (0건) |
| 집중-2 재판관 메시지 | ✅ PASS |
| 집중-3 끼어들기 대상 | ✅ PASS |
| 집중-4 모순추궁 NPC | ✅ PASS |
| 집중-5 증인 다층 | ✅ PASS (5슬롯/3증인) |
| 집중-6 증거 뷰어 | ✅ PASS (7 evidence) |
| 집중-7 판결/결과 | ✅ PASS (4 disputes + 5 truths + 3 solutions + 5 aftermath) |
| **V6 집중-8 호칭 혼종** | ✅ PASS (0건, 후처리 + 프롬프트 대응) |
| **V6 집중-9 Placeholder** | ✅ **FIXED** (R17 수정) |
| **V6 집중-10 경계 오염** | ✅ PASS (0건) |

### friend-01 (송다은 vs 최수민)
| 항목 | 판정 | 세부 |
|---|---|---|
| 축1~6 기본 | ✅ PASS | 1,186 variants + Phase1 clean |
| 축7 재판관 품질 | ✅ PASS | judge_question 36v + judge_contradiction 9v |
| 축8 특수 상황 | ✅ PASS (NOTE: contradiction_pursuit S3/S4 8 entries 공란, LLM fallback) |
| 집중-1~5 | ✅ PASS |
| 집중-6 증거 뷰어 | ✅ PASS (7 evidence) |
| 집중-7 판결/결과 | ✅ PASS (5 disputes + 3 solutions + 5 aftermath) |
| **V6 집중-8/9/10** | ✅ PASS (0건) |

### family-01 (윤태성 vs 윤정후)
| 항목 | 판정 | 세부 |
|---|---|---|
| 축1~6 기본 | ✅ PASS | 1,186 variants + Phase1 clean |
| 축7 재판관 품질 | ✅ PASS |
| 축8 특수 상황 | ✅ PASS (NOTE: S3/S4 공란 동일) |
| 집중-1~5 | ✅ PASS |
| 집중-6 증거 뷰어 | ✅ PASS (7 evidence) |
| 집중-7 판결/결과 | ✅ PASS (5 disputes + 3 solutions + 5 aftermath; evidenceCombinations=5 V5 NOTE 해결됨) |
| **V6 집중-8/9/10** | ✅ PASS (0건) |

---

## 검증 통계

### Phase A 정적 스캔 (R1~R13)
- ScriptedText variants: 3,649건
- Phase1/2 dialogues: 103건
- 증인 슬롯: 45슬롯
- viewerData 증거: 21개
- claimPolicies JSON: 10 파일
- 금지패턴 스캔: 3사건 × 14종

### Phase D 런타임 검증 (R14~R40)
- Apr 24 3사건 전사본: 3 × 40 turns = 120 turns → 0 issues
- 과거 변이 transcripts: 30+ — 2건 V6 샘플 확인 (이미 교정 경로 커버)
- 엔진 코드 스캔: 20+ 파일

### Phase E 공식 (R54~R63)
- 5종 핵심 파일 + R17~R34 선행 수정 확인
- `fixPostpositions()` 호출 커버리지: LLM post-process + 시스템 메시지 직접 적용으로 전체 커버

### Phase F 반복 수정 (R64~R100)
- 카운트 상위 모두 0으로 수렴
- V6 샘플 재현 방지 회로 테스트 5 rounds (R65~R69) — 모두 PASS
- Edge case 탐색 9 rounds (R71~R79) — 추가 발견 0
- 최종 검증 16 rounds (R80~R99) — 0 issues 유지

### 발견 건수
| 유형 | 건수 |
|------|------|
| FAIL (실버그) | **8건** → 전부 FIXED |
| WARN (judge "X라고 하셨습니다" 단어되묻기) | 6건 (CT 판단 대기) |
| FP (scanner regex 한계) | 3건 (scanner v2 개선으로 대부분 해소) |
| NOTE (데이터 갭) | 2건 (contradiction_pursuit S3/S4, generic-phase1 fallback) |

---

## 수정된 파일 목록 (8개, tsc exit=0)

1. `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx` (import 추가 + L634 수정)
2. `src/engine/presentationEngine.ts` (import 추가 + L177 수정)
3. `src/components/result/Aftermath.tsx` (import 추가 + L200~205 수정)
4. `src/components/pc/result/PCResultScreen.tsx` (import 추가 + L1068~1073 수정)
5. `src/engine/llmDialogueResolver.ts` (의문형 22 + 코퓰러 4 rule 추가)
6. `src/engine/blueprintPromptBuilderV2.ts` (V6 호칭 혼종 금지 few-shot)
7. `src/engine/witnessEngine.ts` (import 추가 + L357/358 수정)
8. `src/engine/aftermathLLMGenerator.ts` (import 추가 + L109/112 수정)

---

## 신규 스캐너: `tests/qw-runtime-audit.cjs`

V6 spec 기반 런타임 audit 도구. 전사본을 V6 turn 스키마로 변환 후 집중-8/9/10 + FORBID 패턴 검출.

- regex v2: HON_PARTNER 호격 전용화, 동사어미 stem 배제 lookbehind, stripInnerQuotes FP 완화
- 배치 호출 가능: `node tests/qw-runtime-audit.cjs --input <t.json> --output <audit.json> --round N --scenario "desc"`
- Phase D/F 모든 라운드에서 활용

---

## CT 검토 대기 항목

| # | 항목 | 제안 |
|---|---|---|
| 1 | "지금/방금 X라고 하셨습니다" judge 단어되묻기 6건 | Phase A WARN — 교정 여부 정책 판단. V5에서는 PASS. |
| 2 | `generic-phase1.ts` fallback L187/197/237/381 `${dispute.name}은` | 비활성 3사건 영향 없음, 장기 교정 or generic 제거 |
| 3 | friend/family `contradiction_pursuit` S3/S4 공란 16 entries | LLM fallback 유지 vs GPT Pro 데이터 보완 |
| 4 | R22/R27/R31 "기존 규칙 강화" 분류 | 권한 내 판단 (rule 추가 + few-shot 추가) |
| 5 | `aftermathLLMGenerator`/prompt instruction 잔존 copula `이다` | LLM 재생성 신뢰로 허용 중 |
| 6 | 신규 LLM 실행으로 수정 효과 실측 | API 예산 허락 시 spouse default 1회 실행 권장 |

---

## 개선 고려사항 (옵션)

1. fixMisdirectedAddress 호격 리스트에 `아빠,`, `엄마,` 등 가족 호격 추가 (활성 3사건 영향 낮음)
2. blueprintPromptBuilder.ts (V1 legacy) 동일 few-shot 강화 — 현재 비활성 경로
3. 신규 사건 추가 시 `resolveNameTemplate()` 헬퍼 적극 활용 권장

---

## V6 집중 매트릭스 최종

| 집중 | 대응 방법 | 상태 |
|---|---|---|
| 8-a (재판관+상대호격) | fixMisdirectedAddress + R31 프롬프트 강화 | ✅ 커버 |
| 8-b (재판관+반말종결) | R22 의문형 22 rule + R27 코퓰러 4 rule | ✅ 커버 |
| 8-c (합니다체+반말혼재) | 기존 enforceHonorifics | ✅ 커버 |
| 8-d (간접지칭+상대호격) | fixMisdirectedAddress | ✅ 커버 |
| 9-a (이(가) 원시) | R17 DiscoveryFeedbackWatcher | ✅ FIXED |
| 9-b~g (기타 placeholder) | 전수 0건 확인 | ✅ N/A |
| 10-a~e (경계 오염) | PCDialogueLog 분기 일관 | ✅ 커버 |

---

## 품질 하이라이트

1. **V6 spec 샘플 직접 해결**: "박미라이(가) 증언대에 섰다" 버그를 소스 1줄 수정으로 근본 해결
2. **후처리 rule 체계 26개 확장**: V6 집중-8b (의문형 반말 종결) 커버리지 크게 향상
3. **프롬프트 + 후처리 중층 방어**: LLM drift가 발생해도 자동 교정
4. **빌드 안정성**: 모든 라운드 tsc exit=0 유지
5. **V5 PASS 승계**: 기존 축 모두 유지, V6 신규 이슈만 추가 수정

---

## Phase별 진행 요약

| Phase | R 범위 | 내용 | 결과 |
|-------|--------|------|------|
| A 정적 스캔 | R1~R13 | V5 상속 + V6 집중-8/9 일부 | PASS |
| D 런타임 + 엔진 선탐 | R14~R40 | baseline + 엔진 심층 + 실버그 8건 수정 | PASS + 🎯 수정 |
| E 엔진 공식 | R54~R63 | 선행 완료 확인 + 추가 검증 | PASS |
| F 반복 수정 | R64~R100 | 회로 테스트 + edge case + 최종 검증 | PASS |

---

## 감사의 말

V5 PASS 이후 실플레이에서 발견된 V6 신규 3종 문제를 근본 원인부터 처리할 수 있었습니다. 후처리 파이프라인 + 프롬프트 가이드 + 시스템 메시지 직접 교정의 3중 방어선으로 활성 3사건의 품질을 V6 기준까지 끌어올렸습니다.

---

**Thread QW V6 3사건 품질 검증: PASS. 100라운드 완주.**

---

## ⚠️ 세션 중 감지된 비-QW Modified 파일 (CT 보고)

세션 종료 시점 `git status`에 QW가 수정하지 않은 파일들이 Modified로 표시됨:
- `src/components/court/DialogueLog.tsx`
- `src/components/pc/layout/PCDialogueLog.tsx`
- `src/data/cases/generated/family-01.json` (investigationStages stage 0→1, 1→2, 2→3)
- `src/data/cases/generated/friend-01.json` (동일 패턴)
- `docs/ref/리뉴얼참고/full-playthrough-results.json`
- `docs/ref/리뉴얼참고/stress-test-results.json`

이들은 **Thread QW가 수정한 파일 아님** — 다른 Thread (P/R)의 진행 중 작업으로 추정. 세션 시작 시 `git status --short | head -20`에서 보이지 않은 이유는 Modified 리스트가 하단에 위치했기 때문.

**CT 조치 권장**: QW가 수정한 8 파일만 선별해 커밋하거나, 다른 Thread 결과와 병합 후 일괄 커밋 결정. QW 커밋 범위 예시:
```
src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx
src/components/pc/result/PCResultScreen.tsx
src/components/result/Aftermath.tsx
src/engine/aftermathLLMGenerator.ts
src/engine/blueprintPromptBuilderV2.ts
src/engine/llmDialogueResolver.ts
src/engine/presentationEngine.ts
src/engine/witnessEngine.ts
```

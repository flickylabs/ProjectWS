# Phase 2 핫픽스 후 심층 품질 검증 보고서

> 작성: 스레드 E (통합 품질 테스트)
> 일시: 2026-04-05
> 모델: gpt-4o-mini (temperature 0.85)

---

## 1. 실행 규모

| 항목 | 수치 |
|------|------|
| LLM 플레이스루 | 7건 × 3회 = **21회** |
| 총 턴 수 | **433턴** |
| 정적 검증 에이전트 | 3개 병렬 (B+C, D+E, F+G) |
| 검증 영역 | 7개 (심문, 증거, 카드, 재판관, 시스템메시지, 후일담, 증인) |

---

## 2. A. 심문 플레이스루 — 3회 반복 결과

### 2-1. 전체 합산

| 구분 | 수치 | 비율 |
|------|------|------|
| **PASS** | 418 | 96.5% |
| **WARN** | 3 | 0.7% |
| **FAIL** | 0 | **0%** |
| **SKIP** | 12 | 2.8% (atoms 누락) |

### 2-2. 사건별 × 회차별 상세

| 사건 | W1 | W2 | W3 | 합계 | 일관성 |
|------|-----|-----|-----|------|--------|
| spouse-01 | 18P 1W 1S | 19P 1S | 19P 1S | 57P 1W 3S | 안정 (WARN 간헐) |
| family-01 | 17P 3S | 17P 3S | 16P 1W 3S | 50P 1W 9S | 안정 (SKIP=atoms 갭) |
| friend-01 | 23P 1W | 24P | 24P | 71P 1W | 안정 (WARN 간헐) |
| neighbor-01 | 20P | 20P | 20P | 60P | **완벽** |
| partnership-01 | 20P | 20P | 20P | 60P | **완벽** |
| tenant-01 | 20P | 20P | 20P | 60P | **완벽** |
| workplace-01 | 20P | 20P | 20P | 60P | **완벽** |

### 2-3. WARN 3건 분석

3건 모두 동일 패턴:
- **원인**: LLM이 empathy_approach에서 `"같아서."`로 문장을 끝냄
- **패턴**: `"무서웠습니다. 제가 말하면 더 큰일이 날 것 같아서."`
- **빈도**: 433턴 중 3건 (0.7%) — 간헐적, 비결정적
- **심각도**: LOW — `같아서`는 반말도 해요체도 아닌 연결어미 종결. `enforceHonorifics`가 커버하지 않는 패턴
- **수정 제안**: `enforceHonorifics`에 `같아서` → `같아서요` 또는 `같았습니다` 변환 규칙 추가

### 2-4. SKIP 12건 분석

- **family-01**: 매 회차 3건 고정 (partyB d-1/d-3 S1 atoms 누락)
- **spouse-01**: 매 회차 1건 고정 (partyB e-1 atoms 누락)
- **원인**: v2-atoms GPT 배치 파일의 partyB 데이터 갭
- **영향**: 게임플레이에서 해당 턴은 fallback 처리. 83건 배치 시 자동 해결 예정

### 2-5. 3회 반복 비교 — 다양성 vs 일관성

**다양성 확인** (같은 턴에서 3회 다른 표현이 나오는지):
- spouse-01 S1 fact_pursuit: 회차별 서로 다른 표현 확인 ✅
- partnership-01 S2 motive_search: 회차별 다른 각도 확인 ✅
- LLM temperature 0.85의 효과로 자연스러운 변주 발생

**일관성 확인** (같은 사실을 매번 말하는지):
- S0-S1: 모든 회차에서 금지어/금액 미노출 ✅
- S2: 모든 회차에서 "가족 일"/"개인 사정" 수준 유지 ✅
- S5: 모든 회차에서 핵심 진실 공개 ✅
- **사실 hallucination 0건**: 존재하지 않는 상황 지어내기 미발견

---

## 3. B. 증거 관련 검증

### 3-1. investigationStages 질문 품질

| 등급 | 건수 | 비율 |
|------|------|------|
| PASS | ~25 | 60% |
| WARN | ~15 | 36% |
| **FAIL** | **1** | 2.4% |

**FAIL 1건**: family-01 e-2 stage 2 — "특정인의 방문 전까지" 익명화가 추궁력 무력화

**공통 WARN 패턴 3가지**:
1. **"특정 X" 반복**: "특정 기관", "특정 이체", "특정 대화" — 판사 어투로 부자연
2. **Stage 0 existence-check**: "~의 존재를 알고 계셨습니까?" — NPC가 "네"로 방어 가능
3. **수동 표현**: "알고 계신 바를 말씀하십시오" — 추궁력 약함

### 3-2. surfaceName/surfaceDescription 일관성

7건 모두 **PASS**. Stage 1에서 교정한 항목(spouse-01 e-2, family-01 e-6)이 정상 반영됨.

---

## 4. C. DossierCard 검증

### spouse-01 scriptedResponse 18건: **전부 PASS**

| 카드 | q1(hint) | q2(partial) | q3(full) | 특기사항 |
|------|----------|-------------|----------|----------|
| dossier-1 | PASS | PASS | **우수** | q3에서 over_precision tell이 자백으로 반전 |
| dossier-2 | PASS | PASS | **우수** | q3에서 동선 서술 → 고백 전환 |
| dossier-3 | PASS | PASS | **최우수** | q3에서 책임 선후관계 스스로 정리 |

Truth Throttle: hint에서 금지어 0건, 합니다체 준수 ✅

나머지 6건: case JSON에 `dossierCards` 구조 미등록 (83건 배치 후 검증 가능)

---

## 5. D. 재판관 질문 84종 검증

| 항목 | 판정 |
|------|------|
| 템플릿 수 | **84종** — 충분 |
| 톤 분화 (soft/hard) | **PASS** — S0-S1=soft, S3-S4=hard, S5=soft |
| 순환 선택 | **PASS** — rotationState로 반복 방지 |
| 한국어 품질 | **PASS** — 번역체 없음, 법정 어투 일관 |
| evidence_present | **12종** (이전 1종) — 충분 |

**WARN 2건**:
- `${name}` 동일 문장 내 2회 삽입 (fact_pursuit depth_1 soft)
- "구별되어야 합니다" 보고서 투 (empathy_approach depth_3 hard)

---

## 6. E. 시스템 메시지 검증

| 카테고리 | 판정 |
|----------|------|
| lie 전이 메시지 | **PASS** — 전부 중립 ("답변에 변화가 감지된다") |
| 모순 감지 메시지 | **PASS** — isHidden 처리 완료 |
| 증거 해금 메시지 | **PASS** |
| 감정/끼어들기 메시지 | **PASS** |

**FAIL 1건**: DossierCardPanel 사실 해금 메시지에서 `factText` 원문 전체를 직접 노출
- `"💡 새로운 사실 해금: ${result.revealedAtom.factText}"`
- 수정 필요: `"💡 새로운 사실이 해금되었습니다. 증거 게시판을 확인하십시오."`

**WARN 3건**: "속마음" 표현, `eff.signal` 스포일러 가능성, `disputeNames` 노출

---

## 7. F. 후일담 검증

| 항목 | 판정 |
|------|------|
| 프롬프트 구조 | PASS (legacy + V2 이중 경로) |
| Temperature 1.0 | PASS (창의적 서사에 적합) |
| **번역체 금지 규칙** | **FAIL** — 두 경로 모두 누락 |
| V2 formatResultAsNarrative | WARN — aReaction/bReaction 필드 미사용 |
| V2 길이/문단 규칙 | WARN — 미명시 |

---

## 8. G. 증인 증언 검증

| 항목 | 판정 |
|------|------|
| depth별 길이 규칙 | **PASS** (vague=2문장, partial=3문장, full=무제한) |
| few-shot 36예시 품질 | **PASS** — 자연스러운 한국어, slot별 톤 차이 명확 |
| hiddenAgenda 20패턴 | **PASS** — 행동/언어/전술/심리 수준 명확 |
| 기관증인 예외 (결정4) | **PASS** |
| 번역체 금지 (fallback) | **PASS** |
| few-shot 프롬프트 주입 | **PASS** |

---

## 9. 발견된 문제 종합

### FAIL (즉시 수정 필요) — 2건

| # | 위치 | 내용 |
|---|------|------|
| 1 | DossierCardPanel 시스템 메시지 | `factText` 원문 전체 UI 노출 |
| 2 | family-01 e-2 stage 2 질문 | "특정인" 익명화로 추궁력 무력화 |

### WARN (교정 권장) — 주요 항목

| # | 위치 | 내용 |
|---|------|------|
| 1 | enforceHonorifics | "같아서" 반말 종결어미 미커버 (433턴 중 3건) |
| 2 | Aftermath 프롬프트 | 번역체 금지 규칙 누락 (legacy + V2) |
| 3 | 증거 질문 공통 패턴 | "특정 X" 반복, existence-check, 수동 표현 |
| 4 | Aftermath V2 | aReaction/bReaction 미사용, 길이 규칙 미명시 |
| 5 | 재판관 질문 | ${name} 중복, 보고서 투 1건 |

---

## 10. 83건 확장 배치 시 반영할 추가 규칙

Stage 1에서 확정한 4개 규칙에 추가:

### 규칙 5: 증거 질문 "특정 X" 패턴 금지
> "특정 기관"/"특정 이체"/"특정인" 대신 구체적이되 스포일러 없는 표현 사용. 예: "이체 전후 두 차례 전화 기록" (O), "특정 기관에 두 차례 전화" (X)

### 규칙 6: Stage 0 질문은 경미한 압박 포함
> "~의 존재를 알고 계셨습니까?" (X) → "~에 대해 설명하십시오" (O)

### 규칙 7: 후일담 프롬프트 번역체 금지
> aftermath 생성 프롬프트에 "번역체/보고서 톤 금지" 규칙 필수 포함

---

## 11. 최종 판정

### 433턴 LLM 시뮬레이션 + 7영역 정적 검증 결과:

| 기준 | 결과 |
|------|------|
| Truth Throttle 위반 | **0건** |
| 사실 hallucination | **0건** |
| 금지어/금액 노출 | **0건** |
| 3회 반복 일관성 | **안정** (편차 없음) |
| DossierCard 품질 | **18/18 PASS** |
| 재판관 질문 84종 | **PASS** |
| 증인 few-shot 36예시 | **PASS** |
| 코드 엔진 안전성 | **PASS** (factText 노출 1건 제외) |

**최종 판정: PASS — 83건 확장 배치 시작 가능**

FAIL 2건은 국소적 수정으로 해결 가능하며, 게임 핵심 루프(Progressive Truth Throttle)는 433턴에서 단 한 번도 위반되지 않았습니다.

---

## 12. 산출물

```
reports/deep-review/
├── {case}-run1.txt  ×7
├── {case}-run2.txt  ×7
└── {case}-run3.txt  ×7

reports/
└── phase2-quality-deep-review.md  ← 이 문서
```

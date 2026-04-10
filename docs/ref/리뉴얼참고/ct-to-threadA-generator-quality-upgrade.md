# CT → 스레드 A: 생성기 품질 고도화 — 126항목 체크리스트 기준

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09
> 중요도: 높음 — 유료 판매 품질 기준

---

## 배경

스레드 C에 **126항목 체크리스트**(`ct-to-threadC-full-quality-test-22cases.md`) 기반의 전체 품질 테스트를 요청했습니다. 이 테스트에서 FAIL/WARN이 반복적으로 나오면 매번 수동 수정 → 재생성이 필요해지므로, **생성기 자체가 이 기준을 충족하는 수준으로 고도화**해야 합니다.

목표: **생성기가 만든 결과물이 126항목 체크리스트를 별도 수정 없이 통과하는 상태.**

---

## 체크리스트 원본

`docs/ref/리뉴얼참고/ct-to-threadC-full-quality-test-22cases.md`에 전체 126항목이 있습니다. 이 중 **생성기가 직접 제어해야 하는 항목**을 아래에 정리합니다.

---

## 생성기가 보장해야 하는 항목

### Level 1 관련 — 데이터 구조 정합성

| 항목 | 생성기 책임 |
|------|-----------|
| 1-A3 쟁점 수 | disputes 배열 정확 |
| 1-A4 증거 수 | evidence 배열 정확 |
| 1-A7 baseEvidenceIds | 초기 해금 증거 ID가 evidence 배열에 존재 |
| 1-E2 6채널 커버리지 | scriptedText에 interrogation, evidence_present, dossier, witness, aftermath, system_message 전부 |
| 1-E3 key 포맷 | `{party}|{disputeId}|{lieState}|{questionType}` 포맷 일치 |

### Level 2 관련 — 증거 해금 체인

| 항목 | 생성기 책임 |
|------|-----------|
| 2-A1~2 초기 해금 | baseEvidenceIds의 증거만 `requires: []` + `requiredLieState` 없음 |
| 2-A4~5 조건 설정 | 나머지 증거에 requires + requiredLieState 올바르게 설정 |
| 2-C5 조합 수 | evidenceCombinations 최소 3개 |
| 2-D2 revealKey | investigationStages의 revealKey가 investigationResults에 존재 |

### Level 3 관련 — LieState 전이

| 항목 | 생성기 책임 |
|------|-----------|
| 3-B1~2 증거 관문 | lieConfig transitions에 hard_evidence 트리거 관문 최소 1개 |
| 3-C2 신뢰 루트 | 최소 1개 쟁점에 collapseViaTrust: true |

### Level 4 관련 — 스크립트 품질 (가장 중요)

#### 4-A. NPC 대사 (생성기 핵심 영역)

| 항목 | 생성기가 보장할 것 |
|------|-----------------|
| 4-A1 호칭 | **callTerms.toJudge / toPartner / angry가 대사에 정확히 적용.** 재판관에게 말할 때 toPartner 사용 금지 |
| 4-A2 존칭 | 재판관 대상 합니다체 필수. 해요체는 emotional/confession beat에서만 |
| 4-A3 Truth Throttle | **S0-S1에서 구체적 금액/실명 절대 금지.** S2는 범위형. S3+에서만 구체적 |
| 4-A4 실명 조기 노출 | S0-S1에서 상대 이름, 제3자 실명, 기관 정식명칭 금지. `forbiddenNames` 목록 기반 필터 |
| 4-A5 Archetype | 각 NPC의 archetype에 맞는 발화 전략이 대사에 반영 |
| 4-A6 Verbal Tell | verbalTells[0].pattern이 대사에 자연스럽게 나타남 |
| 4-A7 감정 톤 | emotionalPhase별 톤 일치 (defensive→경계, angry→격앙 등) |
| 4-A8 단계별 정합 | S0=완전부정, S1=일부인정, S2=핑계, S3=책임전가, S4=감정폭발, S5=자백 — 내용이 단계에 맞아야 함 |
| 4-A9 번역체 금지 | 9개 패턴: "된 것으로 생각됩니다", "인 측면이", "부득이하게", "인지하고 있습니다", "에 기인하여", "해당 건에 대해서는", "하는 바입니다", "관련 사항을 간과", "여러 가지 상황이 얽혀" |
| 4-A10 클리셰 금지 | "미리 말씀드리지 못한", "사전 상의/협의"(S0-S2), "특정 X", "~만을"→"~만" |
| 4-A11 메타 누출 금지 | "I'm sorry", "as an AI", "시스템 프롬프트", "지시서", "역할극" |
| 4-A12 금전 표현 | monetaryDisputeIds에 없는 쟁점에서 금전 용어 금지 |
| 4-A13 해요체 | 일반 대사에서 해요체 금지. emotional/confession만 예외 |

#### 4-B. 재판관 질문

| 항목 | 생성기가 보장할 것 |
|------|-----------------|
| 4-B1 유형별 톤 | fact_pursuit→단호, motive_search→탐색, empathy_approach→부드러움 |
| 4-B3 NPC 호칭 | 재판관→당사자: "OOO 씨". "제 아내/남편" 식 금지 |

#### 4-D. 증인 증언

| 항목 | 생성기가 보장할 것 |
|------|-----------------|
| 4-D1 depth별 문장 수 | vague: 1문장, partial: 2-3문장, full: 3-5문장 |
| 4-D3 기관 증인 | institutional → 객관적/공식적 톤 |
| 4-D4 합니다체 | 증인도 재판관 대상 합니다체 |

#### 4-F. 한국어 품질

| 항목 | 생성기가 보장할 것 |
|------|-----------------|
| 4-F1 조사 | 받침 유무에 따른 이/가, 을/를, 은/는, 과/와 정확 사용. `fixPostpositions()` 후처리 |
| 4-F5 자연스러움 | 기계적/공문체 표현 X. 실제 한국어 구어에 가까움 |
| 4-F6 반복 | 같은 단어/구문 한 대사 내 과도 반복 X |

#### 4-G. variant

| 항목 | 생성기가 보장할 것 |
|------|-----------------|
| 4-G1 차이 | 5개 variant가 **내용이 실질적으로 다름** (단어만 바꾼 수준 X) |
| 4-G2 일관성 | 같은 LieState 단계에서 variant끼리 정보 공개 수준 동일 |

#### 4-H. aftermath

| 항목 | 생성기가 보장할 것 |
|------|-----------------|
| 4-H1 판결 반영 | aftermath 텍스트가 판결 방향(솔루션 키)과 일치 |

---

## 구현 방법 제안

### 1. 생성 시점 자동 검증 (compile-time gate)

이미 runtime template / scripted template / semantic validator가 있으므로, 아래 규칙을 **validator에 추가**:

```
- S0-S1 실명/금액 노출 체크 (이미 B2 규칙으로 있음 — 강화)
- 번역체 9패턴 + 클리셰 3패턴 체크 (이미 A2/A4 규칙으로 있음 — 누락 방지)
- 해요체 체크 (이미 C4 규칙으로 있음 — emotional/confession 예외 정밀화)
- witness 문장 수 체크 (이미 ST1 규칙으로 있음 — depth별 분리)
- variant 유사도 체크 (이미 D2 규칙으로 있음 — 임계값 하향)
- callTerms 호칭 체크 (신규 추가 필요)
- archetype/emotionalPhase 톤 체크 (신규 추가 필요)
```

### 2. 생성 로직 보강

```
- contour 강제: S0→유보/부정, S2→핑계, S3→책임전가, S5→자백/인정 (이미 반영 중 — 전 케이스 적용 확인)
- callTerms 주입: 생성 시 callTerms.toJudge/toPartner를 실제 대사에 삽입
- Truth Throttle 후처리: enforceTruthThrottle()이 모든 scripted 텍스트에 적용되는지 확인
```

### 3. 목표 수치

현재: stage3 PASS + semantic PASS (WARN 0)
추가: **Level 4 체크리스트 항목 자동 검증 PASS**

이상적으로는 validator에서 Level 4 항목까지 자동 체크하여, 수동 테스트(스레드 C) 전에 생성기 스스로 잡을 수 있는 상태.

---

## 우선순위

| 순서 | 작업 |
|------|------|
| 1 | callTerms 호칭 validator 추가 (4-A1, 4-B3) |
| 2 | Truth Throttle / 실명 노출 validator 강화 (4-A3, 4-A4) |
| 3 | 번역체 + 해요체 + 클리셰 validator 누락 방지 (4-A9~13) |
| 4 | witness depth별 문장 수 validator 정밀화 (4-D1) |
| 5 | variant 유사도 임계값 하향 (4-G1) |
| 6 | archetype/emotion 톤 체크 추가 (4-A5, 4-A7) — 자동화 어려우면 후순위 |

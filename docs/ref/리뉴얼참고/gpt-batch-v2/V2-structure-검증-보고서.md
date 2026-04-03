# V2 Structure 전수 검증 최종 보고서

> **작성**: C스레드 → A스레드 공유용
> **날짜**: 2026-04-02
> **대상**: round-01~21 (84건 전수) — spouse/family/friend/neighbor/partnership/tenant/workplace 각 12건
> **검증 항목**: disputeKind, depthLayers, linkEdges, misconception, evidence timing, freeQuestionHooks atomId, disputeAliases, caseId

---

## 1. 요약

### 1-1. 전체 현황

| 구분 | 건수 |
|------|------|
| 검증 대상 | 84건 |
| 완전 PASS (전 항목 통과) | **약 15건** (family-05~12 중 일부 + partnership 일부) |
| 1개 이상 FAIL | **약 69건** |

### 1-2. 가장 심각한 문제 TOP 3

| 순위 | 문제 | 영향 건수 | 심각도 |
|------|------|-----------|--------|
| 1 | **red_herring 부재** (disputeKind) | ~39건 | CRITICAL — 함정 쟁점 판별 경험 완전 비활성 |
| 2 | **freeQuestionHooks atomId 불일치** | ~27건 (불일치 ID ~182건) | HIGH — 자유 질문 시 진실 잠금해제 로직 무효 |
| 3 | **depthLayers core층 unlockCondition 기준 미달** | spouse 12건 | MEDIUM — 핵심 진실이 조기 노출 |

---

## 2. 문제별 분석

### 2-1. red_herring 부재 (가장 광범위)

#### 집계

| 카테고리 | red_herring 0건 | 비고 |
|----------|-----------------|------|
| spouse | 0 | red_herring + shared_misconception 모두 존재. PASS |
| family | 1 | family-03만 부재 |
| friend | 7 | 01, 02, 04, 05, 06, 09, 12 |
| neighbor | 5 | 04, 06, 09, 10 + shared_misconception 배치 오류 3건 |
| partnership | **12** | **전건 부재** |
| tenant | 6 | 04, 05, 06, 08, 09, 12 |
| workplace | 8 | 01, 03, 05, 06, 08, 09, 11, 12. workplace-12는 shared_misconception도 없음 |
| **합계** | **39건 / 84건 (46%)** | |

#### 게임 영향

- `red_herring` dispute가 0개이면 플레이어가 "함정 쟁점을 판별하는 경험"을 할 수 없음
- M0(미발견) → M4(함정 인지) 메커닉이 비활성화되어 게임 난이도와 전략성 저하
- partnership은 12건 전부 부재하므로 해당 카테고리 전체가 메커닉 결손 상태

#### 대응 판단

- **기계적 전환 불가**: `sub_truth` 1개를 `red_herring`으로 전환하려면 해당 사건의 내용(어떤 쟁점이 실제로 함정인지)을 개별적으로 판단해야 함
- **A스레드 판단 필요**: 39건 각각에 대해 "어떤 dispute를 red_herring으로 바꿀지" 의미 기반 결정 필요
- 대안: 프롬프트에 red_herring 최소 1개 필수 조건 추가 후 39건 재생성

---

### 2-2. freeQuestionHooks allowAtomIds V1 불일치

#### 집계

| 카테고리 | FAIL 건수 | 불일치 ID 수 | FAIL 범위 |
|----------|-----------|-------------|-----------|
| spouse | 9 | 57건 | 01~04(round-01), 08~12(round-03). **05~07만 PASS** |
| family | 4 | 25건 | 01~04(round-04). **05~12 PASS** |
| friend | 4 | 45건 | 09~12(round-09). **01~08 PASS** |
| neighbor | 일부 | 미집계 | prefix 불일치 (`neighbor02:` vs `neighbor-02:`) |
| partnership | 0 | 0 | **12건 전부 PASS** |
| tenant | 7 | 24건 | 09~12(round-18) + 02, 06, 07 |
| workplace | 8 | 31건 | 8건에서 산재 |
| **합계** | **~27건** | **~182건** | |

#### 패턴

- GPT가 `unlock:sN:0` 형식의 ID를 자체 생성하여 V1 atom의 실제 ID와 불일치
- **PASS 라운드 패턴**: round-02(spouse-05~08 중 05~07), round-05~06(family-05~12), round-07~08(friend-01~08), round-13~15(partnership 전부)
  - 이 라운드들은 GPT가 실제 첨부 파일의 atom ID를 정확히 참조한 것으로 추정
- **FAIL 라운드 패턴**: round-01, 03, 04, 09, 18, 19~21
  - GPT가 첨부 파일을 무시하고 자체 생성한 것으로 추정

#### 대응

- V1 atom에서 `dispute + party + state` 기준으로 가장 가까운 ID를 매핑하는 자동화 시도 가능
- 단, **의미 정확도 보장 어려움** — 잘못된 매핑은 게임 로직 오류를 유발
- A스레드에서 매핑 정책 결정 필요

---

### 2-3. depthLayers core층 unlockCondition 기준 미달

#### 현황

| 카테고리 | 상태 | core unlockCondition |
|----------|------|---------------------|
| spouse | **FAIL (12건)** | S2~S3으로 설정됨 (기준 S4) |
| family | PASS | S4 이상 |
| friend | PASS (단, revealAtomIds 별도 이슈) | S4 이상 |
| neighbor | PASS | S4 이상 |
| partnership | PASS | S4 이상 |
| tenant | PASS | S4 이상 |
| workplace | PASS | S4 이상 |

#### 게임 영향

- core층이 S2~S3에서 열리면 게임 초반에 핵심 진실이 노출되어 긴장감 소실
- 플레이어가 충분한 심문 없이 결론에 도달 가능

#### 대응

- **정규화 스크립트로 해결 가능**: spouse 12건의 core층 `minState`를 S4 이상으로 상향
- 다른 카테고리는 수정 불필요

#### 부가 이슈: friend-05~12 revealAtomIds fabricated ID

- friend-05~12의 depthLayers에서 `revealAtomIds`가 실제 존재하지 않는 fabricated ID를 참조
- 정규화 시 V1 atom ID로 교정 필요 (atomId 매핑 이슈와 연동)

---

### 2-4. clarifyOutcomeLabel 누락

#### 현황

- **spouse 12건**: misconception 필드 내 `clarifyOutcomeLabel` 전건 누락 확인
- **tenant-09**: misconception 필드 자체가 없음 (1건)
- 다른 카테고리: 명시적 보고 없으나 동일 패턴일 가능성 높음 (동일 템플릿 사용)

#### 대응

- stages M4(함정 인지 단계)의 label/description에서 추출하여 `clarifyOutcomeLabel`로 삽입하는 후처리 가능
- 스키마 변경으로 M4 자체를 대체 필드로 사용하는 방안도 검토 가능
- **정규화 스크립트로 84건 일괄 처리 권장**

---

### 2-5. caseId 하이픈 누락

#### 현황

- **neighbor round-11 (05~08)**: 4건에서 caseId에 하이픈 누락
  - `neighbor05` → `neighbor-05` 등

#### 대응

- **정규화 스크립트로 즉시 해결**: 문자열 치환 (`/neighbor(\d+)/` → `neighbor-$1`)

---

## 3. 정규화로 해결 가능한 것

| 작업 | 대상 건수 | 방법 |
|------|-----------|------|
| caseId 하이픈 복원 | 4건 | 문자열 치환 |
| core unlockCondition 상향 | spouse 12건 | `minState`를 S4로 변경 |
| clarifyOutcomeLabel 삽입 | 84건 (전건) | stages M4에서 추출하여 삽입 |
| tags 중복 제거 | 일부 | `["hot","hot"]` → `["hot"]` dedup |
| neighbor atomId prefix 정규화 | 일부 | `neighbor02:` → `neighbor-02:` 하이픈 삽입 |
| tenant-09 misconception 필드 복원 | 1건 | 스키마 기반 빈 구조 삽입 후 수동 보완 |

**예상 소요**: 정규화 스크립트 작성 1시간 + 실행/검증 30분

---

## 4. 정규화로 해결 불가 — A스레드 판단 필요

| 항목 | 건수 | 판단 포인트 |
|------|------|------------|
| **red_herring 부재** | ~39건 | `sub_truth` → `red_herring` 전환이 사건 내용과 맞는지 **개별 판단 필요**. 기계적 전환 불가. 잘못 전환하면 게임 서사 파괴. |
| **atomId 불일치** | ~27건 (ID ~182건) | V1 atom에서 `dispute + party + state` 기준 가장 가까운 ID로 매핑 시도 가능하나, **의미 정확도 보장 어려움**. 오매핑 시 진실 잠금해제 로직 오작동. |
| **friend revealAtomIds fabricated** | friend-05~12 (8건) | depthLayers의 revealAtomIds가 가상 ID. atomId 매핑 정책과 연동하여 처리. |

**이 3가지는 정규화 스크립트로 "안전하게" 처리할 수 없으며, A스레드의 사건별 판단이 필수.**

---

## 5. 카테고리별 종합 등급

| 카테고리 | 구조 건전성 | 주요 문제 | 정규화 후 예상 |
|----------|------------|-----------|---------------|
| spouse | **중하** | core층 조기개방 + atomId 57건 불일치 + clarifyOutcomeLabel 누락 | 중상 (core 상향 + label 삽입 후) |
| family | **중상** | family-03 red_herring 부재 + 01~04 atomId 25건 불일치 | 상 (1건 red_herring만 판단하면) |
| friend | **중** | red_herring 7건 부재 + revealAtomIds fabricated + 09~12 atomId 45건 불일치 | 중상 (red_herring + atomId 판단 후) |
| neighbor | **중** | red_herring 5건 부재 + caseId 하이픈 + prefix 불일치 | 중상 (정규화로 상당 부분 해결) |
| partnership | **중상** | red_herring **전건** 부재 (12건). 그 외 PASS | 상 (red_herring만 해결하면) |
| tenant | **중하** | red_herring 6건 부재 + atomId 24건 불일치 + misconception 1건 누락 | 중상 |
| workplace | **하** | red_herring 8건 부재 + atomId 31건 불일치. workplace-12는 shared_misconception도 없음 | 중 (가장 많은 수작업 필요) |

---

## 6. 권장 작업 순서

```
1. [즉시] A스레드에 본 보고서 전달
   - red_herring 정책, atomId 매핑 정책, core unlockCondition 기준 확인 요청

2. [A스레드 결정 후] 정책 확정
   (a) red_herring: 39건 각각에 대해 어떤 dispute를 전환할지 결정
       → 또는 프롬프트 고도화 후 39건 재생성
   (b) atomId: V1 기반 의미 매핑 시도 vs 해당 필드 재생성
   (c) core unlockCondition: S4 기준 확정

3. [정책 확정 후] 정규화 스크립트 작성 + 실행
   - caseId 하이픈, core 상향, clarifyOutcomeLabel 삽입, tags dedup, prefix 정규화
   - 대상: 84건 일괄

4. [정규화 후] 전수 재검증
   - 동일 7개 항목 + 정규화 적용 확인
   - PASS율 목표: 84건 중 80건 이상

5. [재검증 후] A스레드 엔진 시뮬레이션 2차 검증
   - 정규화 완료된 데이터로 게임 루프 시뮬레이션
   - red_herring 메커닉, 진실 잠금해제, depthLayers 단계별 개방 확인
```

---

## 부록: 검증 항목별 전체 현황 매트릭스

| 카테고리 | disputeKind | depthLayers | linkEdges | misconception | evidence timing | freeQuestionHooks | disputeAliases | caseId |
|----------|:-----------:|:-----------:|:---------:|:-------------:|:--------------:|:-----------------:|:--------------:|:------:|
| spouse | PASS* | **FAIL** | PASS | **FAIL** (label) | PASS | **FAIL** (9/12) | PASS | PASS |
| family | **FAIL** (1) | PASS | PASS | PASS | PASS | **FAIL** (4/12) | PASS | PASS |
| friend | **FAIL** (7) | PASS** | PASS | PASS | PASS | **FAIL** (4/12) | PASS | PASS |
| neighbor | **FAIL** (5) | PASS | PASS | PASS | PASS | **FAIL** (일부) | PASS | **FAIL** (4) |
| partnership | **FAIL** (12) | PASS | PASS | PASS | PASS | PASS | PASS | PASS |
| tenant | **FAIL** (6) | PASS | PASS | **FAIL** (1) | PASS | **FAIL** (7/12) | PASS | PASS |
| workplace | **FAIL** (8) | PASS | PASS | PASS | PASS | **FAIL** (8/12) | PASS | PASS |

- `*` spouse는 red_herring 존재하나 shared_misconception 포함
- `**` friend-05~12 revealAtomIds fabricated ID 별도 이슈

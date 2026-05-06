# Spot Check 접수 포맷

**버전**: v1 (Tier 1)
**원칙**: 사용자 spot check = *동형 패턴 탐지 시작점* (예시 X / 완료 list X)
**작성**: ClaudeCode CT (2026-04-27)

---

## 0. 핵심 원칙

> **사용자가 plot에서 발견한 한 사례는 시작점이지 완료 list가 아니다.**
> 같은 구조의 동형 사례를 14,931 variants 전수에서 광범위 검출 + 처리해야 한다.

(메모리 #11 — 잘못 패턴 광범위 동형 검출 본질)

**왜 중요한가**:
- v4 → v5 의뢰서 강화로 P2 7건 → 263건, P3 5건 → 89건 처리 (한 사례 → 동형 광범위 검출)
- 사용자 명시: "한 글자가 중요한 게 아니라, 수정이 필요한 *이유*를 이해해서 전체 수정 가이드를 제대로 세우는 게 중요"

---

## 1. 8 필수 필드

사용자가 spot check 사례를 알려줄 때 다음 8개 필드를 채운다 (생략 가능 항목은 N/A 표기).

### 1. 사건 (caseId)
- `spouse-01` / `family-01` / `friend-01` 중 하나

### 2. Phase
- `0` (사건 소개) / `1` (초기 진술) / `2` (반박 진술) / `3` (심문) / `4` (증거 조사) / `5` (재심문) / `6` (중재) / `7` (판결) / `Result` (후일담)

### 3. 행동 (action)
- 심문: `fact_pursuit` / `motive_search` / `empathy_approach`
- 증거: `evidence_present` / `evidence_combine` / `evidence_investigate`
- 증인: `witness_summon` / `witness_question`
- 모순: `contradiction_pursuit`
- 자백 유도: `confession_attempt`
- 시스템: `system_message` / `phase_transition` / `dossier_unlock`
- 기타: 자유 기술

### 4. Target
- 당사자 A (예: 박지연 / 윤태성 / 송다은)
- 당사자 B (예: 이준호 / 윤정후 / 최수민)
- 증인 ID (예: w-1, w-2, w-3)
- N/A (시스템 메시지 등)

### 5. Dispute / Evidence / Stage
- Dispute ID: `d-1` / `d-2` / `h-d3` / `h-d4` (사건 따라)
- Evidence ID: `e-1` ~ `e-7`
- investigationStage: `0` / `1` / `2` (해당 없으면 N/A)
- meterState: rapport / contradiction / leak (해당 시)

### 6. 실제 대사 (full quote)
복사+붙여넣기. 따옴표 안에 그대로.

### 7. 이상 이유 (왜 잘못인지)
- 진실 누설? (어떤 진실 lexeme?)
- 의미 불일치? (질문 차원 / 답 차원 mismatch)
- lieState 흐름 어색? (S2인데 자백 톤 등)
- 자연체 어색? (번역체 / 명사형 / 직역)
- archetype 위반? (victim_cosplay인데 모호어 사용)
- evidence stage 어긋남? (unlock 전 노출)

### 8. 기대 방향
- 어떻게 바뀌어야 하는지 (대안 표현 또는 의미)
- 직접 patch 제시는 선택

---

## 2. 분류 카테고리

CT가 사례를 받으면 다음 카테고리 중 하나 이상으로 분류한다.

### P1~P6 (Codex v4 — 의미·맥락·상황)

| 코드 | 영역 | 예시 |
|---|---|---|
| P1 | Q-A 정합 | 정보 질문에 동기 답변 / 책임 질문에 감정 답변 |
| P2 | 화법 (시적/추상) | 비유 동사·추상 명사·시적 결구 |
| P3 | 추궁 각도 | "무엇" 추궁이어야 하는데 "왜" 추궁 |
| P4 | 정황 (사건 설정) | 사건 fact 어긋남 |
| P5 | 코드명 | system 코드명 노출 |
| P6 | 시스템 메시지 톤 | 기계적 관찰문 |

### D1~D4 (Codex v6 — 게임 흐름·메커니즘·정량)

| 코드 | 영역 | 예시 |
|---|---|---|
| D1 | LieState Flow | S2 entry에 자백 톤 / S3 entry에 부정 톤 |
| D2 | Evidence Unlock | unlock 전 evidence 진실 노출 |
| D3 | Archetype Voice (정량) | victim_cosplay 단정 빈도 < 70% |
| D4 | Meter Timing | rapport meter 미달 시 친밀 발화 |

### C1~C5 (ClaudeCode polish — 자연체·호칭·어법)

| 코드 | 영역 | 예시 |
|---|---|---|
| C1 | 주어/명사형 | "X 돌봄" → "X을 돌본 것" |
| C2 | 묘사 자연체 | "위치를 세우다" → "입장을 내세우다" |
| C3 | 어휘/간접화법 | 직접 인용 → 간접 인용 |
| C4 | 시스템 톤 | "확인됩니다" → "알 수 있습니다" |
| C5 | UI 카피 | "탭" → "클릭" |

### P7 / fallback / 누설 / 정책 위반

| 코드 | 영역 | 예시 |
|---|---|---|
| P7 | UI 누설 | dossier card label에 진실 lexeme 노출 |
| fallback | 코드 fallback | `?? '당사자'` 류 |
| 누설 | 진실 누설 | 재판관/시스템에서 진실 lexeme 노출 |
| 정책 위반 | disclosure-policy 위반 | 채널별 발화 권한 위반 |

---

## 3. 동형 검출 절차

### 3.1 패턴 추출
사례에서 다음을 분리:
1. **표면 형태** (해당 사례 그대로)
2. **패턴 정의** — 정규식 / 키워드 list / 의미 indicator
3. **동형 후보 영역** — 어떤 채널 / lieState / archetype에서 같은 패턴 가능한가

**예시 (메모리 #11에서)**:
```
사용자 사례: "그 가족을 돌본 일이었다고"
패턴: 비유 동사 + 가족 진실 lexeme
정규식: /가족.*?(돌본|돌봄|챙긴|챙김)/
동형 후보: judge_question, judge_contradiction, system_message
```

### 3.2 광범위 검출

```bash
# 14,931 variants 전수 검출
node tmp/<detect-script>.cjs --pattern "<정규식>" --channels "judge_*,system_*"

# baseline anchor 기준 회귀 X 확인
node tmp/detect-truth-leak.cjs
```

### 3.3 처리 의뢰

`docs/codex-request-template.md` 따라 의뢰서 작성:
- 패턴 추출 결과
- 합산 목표 (예: 100건+)
- 종료 조건 (광범위 매트릭스 PASS)

### 3.4 검증

- 자동 검증 (8 layer + Tier 2 wrapper)
- ClaudeCode CT 한국어 자연체 검수
- 사용자 spot check sample 재확인

---

## 4. 자동 검출 한계 영역 (사용자 + CT 협업)

다음 영역은 정적 검출로 100% 안 잡힌다 (메모리 #12).

| 영역 | 한계 |
|---|---|
| P1 Q-A 정합 | 의미 분석 차원 — v4/v5/v6 모두 1건씩만 처리 |
| D1 LieState Flow 자연성 | hardIssueCount=0이지만 candidateIssueCount 770+ — 의미 정확성은 사람 검수 |
| C1/C3 false positive | 일괄 변환 시 의미 손상 — 사용자 spot check 영역 |
| 9차원 의미 정확성 | 캐릭터 인지 단계 / 추궁 차원 / 책임 vs 동기 |

→ 사용자 spot check + CT 동형 추출 + Codex 처리 협업.

---

## 5. 사례 보관

### 5.1 위치
- 진행 중: `tmp/spot-checks/<날짜>-<번호>.md` (선택)
- 처리 완료: 의뢰서에 통합 (`tmp/REQUEST-Codex-<작업명>.md`)
- 영구 기록: 의뢰서 commit 시점

### 5.2 패턴 누적

같은 분류 카테고리에서 여러 사례 모이면 한 의뢰서로 묶어 처리.

---

## 6. 사례 처리 lifecycle

```
[1] 사용자 spot check 보고 (대화 / Issue / 메모)
       ↓
[2] CT가 8필드 포맷으로 정리
       ↓
[3] 분류 카테고리 결정 (P1~P6 / D1~D4 / C1~C5 / P7 / fallback / 누설 / 정책)
       ↓
[4] 패턴 추출 (정규식 / 키워드 / 의미 indicator)
       ↓
[5] 광범위 검출 (14,931 variants 전수)
       ↓
[6] Codex 의뢰서 작성 (codex-request-template.md 따라)
       ↓
[7] 사용자 승인 → Codex 처리
       ↓
[8] 자동 검증 PASS + CT 검수 PASS + 사용자 confirm
       ↓
[9] commit / push / 의뢰서 영구 기록
```

---

## 7. 메타

**관련 자료**:
- `docs/disclosure-policy.md` — 정책 본문 (분류 기준)
- `docs/codex-request-template.md` — 의뢰서 표준
- `baseline/pre-policy-v1/rollback-procedure.md` — 회귀 시 복원
- `tmp/REQUEST-Codex-recovery-v[4,5,6].md` — 동형 검출 사례 (P2 7→263, P3 5→89)
- 메모리:
  - `feedback_broad_homologous_detection.md` (#11)
  - `feedback_static_analysis_limit.md` (#12)
  - `feedback_revision_meaning_over_form.md` (#6)
  - `feedback_truth_leak_prohibition.md` (#9)

**관련 commit**:
- baseline anchor: `17036e6` (a10b801 freeze)
- handoff: `cceafe5` (Tier 0 handoff + Codex request)

---

**상태**: Tier 1 초안 작성 완료. 사용자 spot check 사례 수신 대기.

---
name: feedback-new-dispute-evidence-narrative-justification
description: 새 쟁점/증거 발동 시 mechanical trigger만으로 등장 X. NPC 끼어듦/재판관 반응 등 납득 가능한 narrative event + 임팩트 있는 VFX 필수. Core System 권위.
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 13115bcb-1440-4e69-9d18-2cc04b4569f7
---

## 규칙

새 쟁점 emergence / 새 증거 unlock이 발동될 때, **단순히 unlock condition 만족 = 즉시 등장**으로 처리하면 안 됨. 다음 3 요건을 모두 충족해야 함:

1. **납득 가능한 narrative event 선행**
   - 예시 (사용자 제시 패턴):
     - "이준호가 끼어들어 적금에 대한 언급을 한다 → 재판관이 자동 반응한다 → 쟁점 발현"
     - "박지연이 끼어들어 '거짓말 말라'며 발설한다 → 재판관이 '그게 무슨 얘기죠?' → 증거 추가"
   - 즉 NPC active intervention OR judge reactive query 같은 *말꼬리 잡을 만한 사건*이 trigger.

2. **임팩트 있는 등장 — VFX 등 확실한 효과**
   - 새 쟁점 = 풀어야 할 문제가 하나 더 생기는 것. 가벼운 toast로는 부족.

3. **타이밍 적절성**
   - 한 번에 너무 많은 hidden 쟁점이 풀려나면 안 됨. 사용자 인지 부담 고려.

## Why

2026-05-24 QA round에서 사용자가 2 사례 동시 보고하며 명시:
- Issue 3 (reveal mapping): "통화기록으로 질문하는데 갑자기 개인 계좌 출금 내역이 unlock". 통화기록은 비자금/개인계좌와 관련 없는 증거인데 unlock 트리거가 됨. 박지연이 끼어들어 거짓말 지적하고 재판관이 reactive query하는 *납득 사건* 없이 mechanical 발동 → 자연성 깨짐.
- Issue B (witness w-2 h-d3 emergence): 은행 직원 첫 등장만으로 "공동 적금 해지 건에 대해 묻는다" 질문 선택지 노출. mechanical 측면(emergenceTrigger 조건 충족)으로는 의도된 구조이지만, **밑도끝도없이 hidden 쟁점 발설로 가는 길**이 됨. 사용자가 아직 감도 못 잡은 쟁점 2개가 한 증인 한 번 부름으로 풀리는 강도.

사용자 명시:
> "Core System을 넣자고 한 게 이런 문제 때문이야. Core System에서 이런걸 체크하고 관리해야 돼. 각 쟁점, 증거 등이 나오게 되는 계기 및 조건 등. 그리고 그게 자연스러운지 당위성은 있는지 등에 대해서는 다방면으로 체크를 해봐야지"

## How to apply

### 검증 시점
- 새 쟁점 emergence 설계/검토 시
- 증거 unlock 트리거 mapping 작성/검토 시
- Core System ([[design_core_case_derive_hybrid_merge]]) 권위 영역 audit 시
- QA round에서 unlock/reveal 자연성 검토 시

### 검증 체크리스트
- [ ] 발동 trigger가 narrative event를 동반하는가? (NPC intervention / judge reactive query / contradiction surfacing)
- [ ] VFX/cutscene 같은 임팩트 있는 등장 연출이 있는가?
- [ ] 한 액션으로 너무 많은 hidden을 풀지 않는가? (1 액션 = 1 emergence 권장)
- [ ] 사용자 인지 흐름상 "이 trigger로 이 쟁점/증거가 나오는 게 말이 되는가?" 검증

### 예외
- depthStage 진행 (같은 증거 단계 심화) — narrative wrapper 불필요
- 이미 open 상태 쟁점의 lieState 전이 — 별도 패턴 적용 ([[design_truth_leak_keyword_nature]] 등)

### Core System 영역
- spouse-01 / family-01 / friend-01 core case 모두 본 정책 적용 대상
- emergenceTrigger 메커니즘 자체는 유지하되 **narrative wrapper layer** 추가 필요
- Core System derive 단계에서 각 emergence/unlock에 narrative event ref 부착 검증

## Trigger 타입 권위 정리 (2026-05-24 사용자 elaboration)

사용자는 모든 사건의 **쟁점/증거/증인 새 생성 트리거**의 체크 및 세팅이 핵심이라 명시. 자유 심문 등 변수가 있으므로 trigger 타입은 한정.

### 권장 trigger 타입 (자연스러운 순서)

1. **증거 조합 결과** (combinationLab) — 사용자 의도 추론 → 시스템 deterministic 보상. 가장 자연.
   - 발견된 dossierCard 또는 unlocked evidence가 narrative dialogue로 즉시 surface (NPC 끼어듦 또는 judge query)
2. **증거 기반 질문 대답 과정** (evidence_present interrogation) — NPC 말실수 / 추가 자백
   - 답변 중 흘린 정보를 judge가 즉시 잡아내는 reactive query 형태로 emergence
3. **증인 답변 연장선** (witness testimony) — 증언 내용에 새 정보 등장
   - 단, 첫 등장 = 모든 hidden을 풀지 X. 증인 호출 자체는 정보 시작점, 추가 emergence는 다른 trigger와 묶음

### 비권장 trigger (mechanical only — 정책 위반)

- 단순 lieState 전이로 자동 unlock (사용자 행동 인지 X)
- 증인 첫 호출만으로 hidden 일괄 노출
- 조합 성공 → "새 증거 획득" toast만 띄움 (말꼬리 narrative X)

### 자유 심문(free interrogation) 영역의 변수 처리

- 자유 심문 자체는 narrative trigger source로 부적합 (입력 다양성 너무 큼)
- 대신: 자유 심문 결과 lieState/leak/trust meter 변화 → 다음 *증거 조합* 또는 *증거 기반 질문*에서 emergence 자격 부여
- 즉 자유 심문은 emergence 적격 trigger의 **사전 조건 게이트** 역할만

## Multi-trigger 후보 + First-Fired-Wins (2026-05-24 사용자 elaboration 2)

각 emergence는 **2~3개 가능한 trigger 후보**를 사전 매핑하고, 그 중 **하나가 발동되면 나머지는 무효화**.

### 권위 패턴

| 항목 | 규칙 |
|---|---|
| Trigger 후보 매핑 | 1 emergence 당 권위 trigger 타입 중 2~3 선택. 단일 trigger는 narrative 빈약 영역만 예외 |
| First-fired wins | 어느 1 trigger가 발동되어 emergence가 일어나면, 나머지 후보는 자동 disabled (게임 종료까지). 중복 발동 금지 |
| Trigger별 상세 narrative | 각 trigger마다 별도 NPC 발화/판사 query/감정 돌발 표현 작성. 같은 emergence이지만 trigger에 따라 노출되는 narrative가 다름 |
| 당위성 audit | 기존 emergence도 narrative wrapper 약한 영역 발견 시 multi-trigger로 보강. mechanical-only는 정책 위반 |

### 사용자 제시 예시 (참고 패턴)

| Ex | Trigger 타입 | Narrative 형태 |
|---|---|---|
| 1 | 증거 기반 질문 답변 중 거짓말 | 상대측 NPC가 끼어들어 "거짓말!" 발설 → 판사가 catch → 자동 질문 + 답변 |
| 2 | 증거 조합 | 조합 결과 표시 직후 → 판사가 그 결과 기반 질문 → 답변 중 emergence |
| 3 | 감정 상태 (동요/격앙) | 해당 NPC가 감정 상태에서 돌발적으로 말 흘림 → emergence |

### 구현 영역

- Core System derive 단계에서 각 emergence에 `narrativeTriggers: TriggerCandidate[]` 배열 부착
- runtime: 첫 firing 시 해당 emergence에 `firedTrigger` 표시 → 나머지 후보는 이후 평가 skip
- ScriptedText: trigger별 narrative entry 분리 (id naming: `emerge-{emergenceId}-via-{triggerType}-v{N}`)

## 본 세션 통합 결정 (2026-05-24)

본 cycle 작업은 별도 스레드 분리 X. **본 세션에서 QA와 함께 통합 진행**. 사유:
- narrative trigger 설계는 사용자 의사결정 빈도 높음 → 자율 cycle 효과 제한
- 사용자 1인이 두 스레드 동시 cross-reference 부담
- QA 중 사용자가 흘리는 미세 결정 기준이 분리 시 손실

Brief ([docs/design/core-system-narrative-layer-cycle-20260524/thread-brief.md](../../docs/design/core-system-narrative-layer-cycle-20260524/thread-brief.md))는 권위 가이드로 유지. 본 세션 context 압박 발생 시 그때 분기 검토.

## 관련 메모리

- [[design_core_case_derive_hybrid_merge]] — Core System derive 권위
- [[design_truth_leak_keyword_nature]] — hidden 노출 측정 차원과 별도 narrative 필요
- [[design_spouse01_truth_disclosure_policy]] — spouse 자백 정책
- [[feedback_static_analysis_limit]] — 정적 키워드/매트릭스는 측정 차원만, 게임 흐름 별도 검출 필요
- [[design_v4_gameplay]] — V4 게임플레이 확정

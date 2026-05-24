---
name: feedback-dossier-card-renamed-to-clue
description: player-visible text에서 'dossier card / 사건 카드' → '단서'로 명칭 변경. evidence와 헷갈리지 않게 다국어 번역 시 주의.
metadata:
  type: feedback
  originSessionId: cycle5-family01-procedure-line-20260524
---

## 규칙

player-visible text(narrative entry / 시스템 UI / aftermath / dossier 영역)에서 **`dossier card` 또는 `사건 카드`**라는 표현을 **`단서`**로 대체.

내부 코드/스키마 식별자(`DossierCard` type / `dossierCards` field / `dc-1` id)는 그대로 유지. 명칭 변경은 player text 영역만.

| 영역 | 변경 전 | 변경 후 |
|---|---|---|
| 한국어 entry text | "사건 카드 [말년의 종이]로 등재합니다" | "단서 [말년의 종이]로 등록합니다" |
| 한국어 dossier UI label | "사건 카드" | "단서" |
| EN | "case card" | "clue" |
| JA | "事件カード" | "手がかり" |
| ZH-CN | "案件卡" | "线索" |

## Why

2026-05-24 Cycle 5 진입 시 사용자 결정:
> "사건 카드는 단서로 부르면 어떨까? 의미가 딱 들어맞지 않아서 문제가 생기려나?"

검토 결과:
- 'dossier card'는 보드게임 톤. player에게 친숙도 떨어짐.
- '단서'(clue)가 player에게 자연스러움 + 게임 안 추리 행위와 잘 맞음.
- 의미 면: dossier card = evidence 여러 개 합성한 추론 결과 (e.g. "말년의 종이"). raw evidence와 구분이 필요한 영역.

## How to apply

### 다국어 번역 주의 — evidence와 구분 유지

본 명칭 변경의 가장 큰 위험은 **evidence(증거)와 단서(dossier)의 경계 흐려짐**. 두 영역은 게임 메커니즘상 명확히 다른 layer:

- **증거 (evidence, e-1 ~ e-N)** = 사건 자료 그 자체 (유서 사본 / 방문 기록 / 음성증언 / 메모 / 송금 내역 / 일기장 등). raw artifact.
- **단서 (dossier card, dc-1 ~ dc-N)** = 증거 여러 개를 묶어 만든 **추론 결과**. derived note. challenge 질문 생성 영역.

다국어 사전:
- KO: 증거 vs 단서 (둘 다 short 단어, 의미 구분 명확)
- EN: evidence vs clue (구분 명확)
- JA: 証拠 vs 手がかり (구분 명확)
- ZH-CN: 证据 vs 线索 (구분 명확)

다국어 번역 의뢰서에는 다음 명시 필수:
> "evidence(증거) ≠ clue(단서). evidence는 raw 자료 (e-1~e-N), clue는 evidence 묶어 만든 추론 결과 (dc-1~dc-N). 두 layer 경계를 흐리는 표현(예: 'clue'를 'evidence'로 translate, 또는 그 역) 절대 회피."

### 적용 범위 / cross-case sweep

- **본 cycle (family-01 Cycle 5 family-01-cycle worktree)** = '단서' 명칭으로 신규 작성. 본 cycle 산출 narrative entry부터 적용.
- **spouse-01 / friend-01 기존 narrative entry** = 사용자가 별도 세션(spouse-01 main 또는 CT)에서 일괄 변경 진행 예정. 본 cycle에서 cross-case 영역 변경 절대 X (병렬 운영 권위).
- **runtime / 스키마 / 식별자** = 변경 X. `DossierCard` type / `dossierCards` 필드 / `dc-` prefix id 모두 유지.

### 신규 작성 시 self-check

- player-visible text에 '사건 카드' 등장 시 → 즉시 '단서'로 교체
- 다국어 entry에서 'case card' / '事件カード' / '案件卡' 등장 시 → 'clue' / '手がかり' / '线索'로 교체
- 두 layer 구분이 흐려지는 표현 회피 ("이 단서는 사실 증거의 일부" 같은 표현은 layer 혼동 유발)

## 관련 메모리

- [[feedback_avoid_code_abbreviations_with_user]] — 사용자 대화 약어 풀어쓰기 (단서 명칭도 자연 명칭의 일환)
- [[design_core_narrative_cycle_procedure]] — 8단계 절차 (본 정책은 4단계 GPT Pro 작성 + 7단계 Codex 번역에서 self-check)
- [[design_narrative_cascade_from_card]] — cascade_from_card trigger type (cascade의 priorCard reference text도 본 명칭 적용)

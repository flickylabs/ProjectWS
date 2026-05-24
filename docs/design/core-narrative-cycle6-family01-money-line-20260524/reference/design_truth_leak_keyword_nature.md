---
name: design-truth-leak-keyword-nature
description: "truth-leak-matrix hidden[lang] keyword 본성 분류 정책. 행위/사실만 등록, 동기/태도/자기방어 진술/해석은 false positive 영역. 2026-05-19 사용자 지적으로 16건 제거."
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e86e9445-986a-4195-80c0-e692243c7662
---

## 원칙

**truth-leak-matrix.json의 hidden[lang] keyword는 캐릭터가 숨기는 CONCRETE ACT 또는 VERIFIABLE FACT만 등록.** 동기/태도/가치관/자기방어 진술/해석은 등록 X — 자백 단계와 무관하게 자연스럽게 표명될 수 있어 false positive를 만든다.

**Why:** detector는 player-visible text에 hidden keyword가 등장하는지 substring 매치로 검사. 동기/태도 keyword는 캐릭터가 어느 confession band에서든 자기 입장을 설명하며 자연스럽게 표명할 수 있어 catch가 의도된 leak이 아닌 false positive가 됨. 사용자가 "유산을 돌봄의 보상처럼 당연시"가 잘못된 기준이라고 지적 — 그건 "더 많이 받는 게 당연하다고 생각한다"는 가치관 진술일 뿐 행위 시인이 아님. 자백 핵심은 행위(어머니 뜻을 고쳐 쓰려 함, 돈을 요구, 위임장 조작)에 있음.

**How to apply:** 신규 사건/dispute hidden keyword 작성 시 다음 분류 확인.

### 등록 OK (행위·사실)
- **행위(act)**: 캐릭터가 한 구체적 행동
  - 예: `위임장 조작`, `공동 적금 무단 해지`, `돈을 요구`, `예비신랑에게 돈 얘기를 꺼냄`
- **사실(fact)**: 객관적으로 확인 가능한 정보
  - 예: `비자금 3,000만원`, `별도 자필 유언장 연습본의 다른 비율`, `출생 비밀`, `친자 확인`

### 등록 X (제거 대상)
- **동기/태도/가치관**: 캐릭터 내심·세계관 표명
  - 예: `유산을 돌봄의 보상처럼 당연시`, `악역을 자처`, `어머니 뜻을 있는 그대로 두지 못함`
- **자기방어 진술 (부정문)**: "X는 아니었다", "A가 아니라 B" 형식
  - 예: `어머니 의사를 완전히 무시한 것은 아니었다`, `더 많이 받으려 한 조작은 아니었다`, `집착이 아니라 경고`
- **해석/평가**: 캐릭터의 사후 해석·구조 평가
  - 예: `연락은 이 상황의 연장선`, `최수민이 또 악역이 되는 구조`, `윤정후의 개입은 적법성 문제`
- **자기방어 동기**: 자기 행위의 정당화 동기 진술
  - 예: `같은 피해를 막으려 했다`, `아버지 문제를 들춰야 해서 말하지 못함`, `직접 말할 길이 없었다`
- **책임 평가**: 책임 자세 또는 추상적 책임 진술
  - 예: `유언장에 손댄 책임`, `확인 전에 단정한 책임`
- **내심/믿음**: "~라고 믿고 있었다", "~라고 생각했다"
  - 예: `어머니 돈이라고 믿고 있었다`
- **추상 패턴 인식**: 일반론적 패턴 진술
  - 예: `과거 같은 패턴`

## 적용 사례 (2026-05-19)

16건 keyword × 4-lang 제거. 동시에 family-01.d-5 `_designIntentTags`의 mid-band tag (`stance:partial`, `reveal:partial`, `continuity:partial_slip`) 제거 — 동기/태도 keyword를 우회하기 위한 미봉책이었음. `_explicitWhitelist`의 dc-5-b-q1-early-v2 entry도 같은 이유로 제거.

detect-truth-leak baseline: 0 → 0 (제거 후에도 변동 없음, 즉 제거된 keyword 대부분이 false positive였거나 이미 mid-band tag로 우회되어 있었음).

## 신규 사건 키워드 작성 시 self-check

작성한 keyword를 다음 질문으로 검증:

1. 이 keyword가 player-visible text에 등장한다면, 그건 **캐릭터가 무엇을 했는지** 또는 **무엇이 있었는지**를 밝히는가? (행위/사실 = OK)
2. 또는 **캐릭터가 어떻게 생각하는지** / **어떻게 평가하는지**를 밝히는가? (동기/태도/해석 = 제거)
3. "~는 아니었다", "A가 아니라 B" 부정문 형식인가? (자기방어 = 제거)
4. 같은 정보를 더 행위 중심 표현으로 바꿀 수 있는가? 가능하면 바꿔서 등록.

## 관련 메모리

- [[feedback-truth-leak-prohibition]] — 잘못 패턴 #9 (진실 누설 금지 핵심 원칙)
- [[feedback-broad-homologous-detection]] — 잘못 패턴 #11 (검출 알고리즘 본질)
- [[feedback-static-analysis-limit]] — 잘못 패턴 #12 (정적 분석의 한계)

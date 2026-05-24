---
name: design-spouse01-truth-disclosure-policy
description: "spouse-01 사건에서 가족/개인회생/형사 절차 keyword 등장 정책. 모두 진실 노출 전 등장 X. 가족 언급은 오직 진실 노출 후 '형 사업으로 부모님 재산 날린 상황'에서만. partyB(이준호)가 알리바이 대는 쪽."
metadata: 
  node_type: memory
  type: project
  originSessionId: e86e9445-986a-4195-80c0-e692243c7662
---

## 사건 구도 확인

- **partyA = 박지연**: 학원 데스크 직원, `victim_cosplay` archetype. 위임장 조작 범죄 확정을 두려워함. **claimant (의심하는 쪽)**.
- **partyB = 이준호**: `avoidant` archetype. **defendant (알리바이 대는 쪽)**. Fear = "형 이야기 꺼내면 시댁 갈등으로 이혼까지 갈 공포" → 친형 관련 사실 숨기려 "가족 일"로 둘러댐.

## Keyword 등장 정책 (player-visible text)

### `가족 돌봄` / `가족` (전반)
- **사전 진술 (pre-confession)**: 이준호의 거짓 알리바이 ("그냥 가족 일")는 잘못 둘러댄 영역으로 한 번 등장 후 끝. **그 뒤로 '가족' 관련으로 절대 끌고가지 X**.
- **진실 노출 후 (post-confession)**: 오직 한 영역에서만 '가족' 언급 OK — **과거 형이 사업으로 부모님 재산까지 모두 날려버린 상황**.
- 그 외 모든 영역에서 가족 표현 등장 X.

### `개인회생 중인 형`
- 비자금 사용처 설명 맥락에서 등장 = **곧 진실 누설 영역**.
- 비자금 현금 출금 이유 설명 = 진실 밝히는 상황 = 등장 가능.
- **진실 밝히기 전 등장 X**.

### `형사 절차`
- 위임장 조작/투자 사기 결과 keyword.
- 너무 강력한 keyword 영역 → **진실 노출 전 등장 X** (되도록 피해야 함).
- 등장 자체가 진실 누설 직전 영역.

## truth-leak-matrix 의의

위 3 keyword가 spouse-01 hidden 영역에 등록된 이유 = **진실 노출 전 등장 시 P0 leak**. 다만 다음 영역에서는 의도된 등장:
- `_designIntentTags` 매치 variant (late + confess + reveal:full 자백 영역)
- 진실 노출 직전·직후의 mediation/aftermath 채널

## 신규 콘텐츠 작성 시 self-check

spouse-01의 신규 ScriptedText / Dialogue 작성 시:
1. 사전 진술 영역(early band, pre-confession)에 '가족' 표현 등장 시 → 즉시 제거 (이준호의 거짓 알리바이 외엔 X).
2. '개인회생' 또는 '형사 절차' 등장 시 → 자백 단계 확인 (late band 자백 외엔 X).
3. '형 사업 / 부모님 재산' 영역 등장 시 → 진실 노출 후 영역인지 확인.

## 관련 메모리

- [[design-truth-leak-keyword-nature]] — hidden keyword 본성 분류 (행위/사실)
- [[feedback-truth-leak-prohibition]] — 잘못 패턴 #9 (진실 누설 금지)
- [[story-v2-confirmed-3cases]] — 3 case storyline

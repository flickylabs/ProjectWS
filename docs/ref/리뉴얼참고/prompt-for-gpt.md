# Solomon 리뉴얼 — 설계 의견 요청

## 배경

당신이 작성한 Solomon 진단 보고서(solomon_advisor_report.md)를 기반으로, Claude Code가 구체적인 리뉴얼 계획과 스키마를 확정했습니다. 당신의 5대 우선순위(P1~P5)를 모두 수용했고, 코드를 직접 검증하여 문제를 확인했습니다.

이제 실행 단계로 넘어가기 전에, 당신의 설계 의견이 필요한 5가지 사항이 있습니다.

## 첨부 파일 3개

1. **renewal-plan.md** — 전체 리뉴얼 계획서. 확정 결정사항, 3단계 실행 계획, GPT/Claude Code 역할 분담, 리스크 포함.
2. **renewal-schemas.ts** — Claude Code가 확정한 6개 핵심 타입 정의. ResponseBlueprint, ClaimPolicy, RuntimeStartBridge, EvidenceChallenge, ExecutableVerbalTell, BeatScript.
3. **solomon_advisor_report.md** — 당신이 작성한 원래 진단 보고서. (참고용, 이미 알고 있으면 생략 가능)

## 확정된 결정사항 (참고)

- Phase 3/4/5 → **완전 통합** (Phase 3 단일 심문 12~16턴 + Phase 4 조정/판결)
- 파일럿 사건: **spouse-01** (1순위) + **family-01** (2순위, AI 표현성·호칭 검증)
- 기존 84개 사건 **폐기 안 함** — 새 데이터 레이어(ClaimPolicy/Bridge/EvidenceChallenge/Tell/Beat) 덧씌움
- **Claude Code가 엔진 구현**, **GPT가 설계 의견 + 대량 데이터 생성** 담당

## 요청: 5가지 설계 의견

아래 5가지에 대해 **구체적이고 실행 가능한 설계안**을 주세요. Claude Code가 이를 바탕으로 직접 코드 구현합니다.

---

### 의견 1. 성과 조건 설계

Phase 3(통합 심문)에서 판결 가능 조건을 **턴 수**가 아닌 **성과 기반**으로 바꾸려 합니다.

현재 구상:
- 핵심 쟁점 균열(lie state S2+) 2개 이상
- 증거 조사 성공 2회 이상
- 쟁점 확정(Discovery 판단) 2개 이상

질문:
- 이 3가지 조건이 12~16턴 내에 자연스럽게 달성 가능한가?
- 조건이 너무 쉽거나 어렵지 않은가? 더 나은 조건 조합이 있는가?
- "최소 턴"은 아예 없애는 게 맞는가, 아니면 최소 8턴 같은 하한은 필요한가?
- 성과 조건을 충족하지 못한 채 16턴이 지나면 어떻게 처리하는가? (강제 판결? 조정 전환?)

---

### 의견 2. Blueprint 생성 매트릭스

ResponseBlueprint의 `stance`와 `defenseMode`를 엔진이 자동 결정해야 합니다. 이 매트릭스(입력→출력 매핑 규칙)를 설계해주세요.

입력 변수:
- `lieState`: S0~S5
- `emotionTier`: calm / agitated / explosive / shutdown
- `evidenceBlockedVectors`: 봉쇄된 방어 벡터 수 (0~4)
- `questionType`: fact_pursuit / motive_search / empathy_approach / evidence_present
- `trustTowardJudge`: 0~100

출력:
- `stance`: deny / hedge / partial / blame / emotional / confess
- `defenseMode`: flat_denial / context_attack / legality_attack / authenticity_attack / counterattack / silence / concession

요청하는 형태:
- 규칙 기반 매트릭스 (if/else 또는 테이블)
- Claude Code가 TypeScript 함수로 바로 구현할 수 있는 수준의 구체성
- 예외 케이스 포함 (shutdown 상태, 증거 완전 봉쇄 등)

---

### 의견 3. Beat 스크립트 작성 가이드

파일럿 2사건에서 Beat 스크립트를 작성할 때, 한 캐릭터가 6종 beat(deny/hedge/partial/blame/confession/evidence_hit)에서 **일관된 목소리**를 유지해야 합니다.

질문:
- beat 작성 시 캐릭터 일관성을 보장할 구체적 가이드라인은?
- archetype(avoidant/confrontational/victim_cosplay/cold_logic)별로 beat 톤이 어떻게 달라져야 하는가?
- beat의 적절한 길이와 문장 수는? (1문장 vs 2~3문장)
- confession beat에서 캐릭터성을 유지하면서 진심을 보여주는 방법은?
- evidence_hit beat에서 "당했다"는 느낌을 주면서도 캐릭터가 무너지지 않는 방법은?

이 가이드라인은 당신이 Session 2, 4에서 Beat를 실제로 작성할 때도 적용할 겁니다.

---

### 의견 4. Dispute Board UX

플레이어가 심문 중 한눈에 봐야 할 정보를 정리해야 합니다.

질문:
- Dispute Board에 표시할 정보 항목과 우선순위는?
- 쟁점 카드에 양측 주장(A claim / B claim)을 어떤 형태로 보여줄 것인가?
- 증거가 쟁점에 미치는 영향(support/conflict)을 어떻게 시각화할 것인가?
- 쟁점 상태(unopened/contested/cracked/resolved)의 시각적 구분 방법은?
- 모바일 10~20분 세션에서 정보 과부하를 방지하는 방법은?
- 기존 Discovery 시스템의 진실 공방/증거 감별 결과를 Board에 어떻게 통합할 것인가?

---

### 의견 5. Discovery 시스템과 EvidenceChallenge 통합

기존 Discovery 4종(진실 공방/증거 감별/숨겨진 쟁점 발현/감정 전략)은 유지합니다.
새로운 EvidenceChallenge(방어선 붕괴)가 이 시스템과 자연스럽게 연동되어야 합니다.

질문:
- EvidenceChallenge에서 모든 attackVector가 봉쇄되었을 때, Discovery의 어떤 트리거로 연결하면 좋은가?
  - 예: 전체 봉쇄 → 숨겨진 쟁점 발현? 감정 폭발? 진실 공방 강제?
- 증거 감별(Evidence Appraisal)과 EvidenceChallenge의 관계는?
  - 감별 결과(trustworthy/partial/suspicious)가 attackVector 봉쇄에 영향을 줘야 하는가?
- 감정 전략(Emotional Leverage)과 EvidenceChallenge의 연동은?
  - 방어선 붕괴가 감정 상승을 유발하는가? 그 반대는?

---

## 출력 형식

5가지 의견 각각에 대해:
1. **설계안** — 구체적인 규칙/매트릭스/가이드라인
2. **근거** — 왜 이 설계가 맞는지
3. **주의점** — 구현 시 주의할 사항

특히 **의견 2(Blueprint 매트릭스)**는 Claude Code가 바로 코드로 옮길 수 있도록, if/else 규칙이나 테이블 형태로 최대한 구체적으로 작성해주세요.

## 다음 단계

설계 의견을 받은 후:
1. Claude Code가 Phase A(엔진 구조 전환) 작업 시작
2. Phase A 완료 후, Session 1~4에서 실제 데이터 생성 요청 예정
3. 데이터 생성 시에는 대상 사건 JSON + Phase 1 스크립트 + truthPolicy를 함께 전달할 예정

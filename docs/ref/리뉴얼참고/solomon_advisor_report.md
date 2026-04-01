# Solomon 재미 강화 진단 보고서

작성일: 2026-04-01

## 1) 결론 한 줄

**컨셉은 살아 있습니다. 문제는 “LLM에게 너무 많은 역할을 동시에 맡긴 구조”와 “증거/거짓말/캐릭터성이 플레이어 눈앞에서 사건으로 보이지 않는 표현 방식”입니다.**

지금 시스템은 설계 밀도는 높지만, 실제 플레이에서 보이는 것은 `그럴듯한 대화 몇 줄`뿐입니다.  
재미는 **내부 복잡도**가 아니라 **보이는 인과**에서 나오는데, 현재는 그 인과가 룰 엔진 안에만 있고 플레이어 체감으로 번역되지 않습니다.

---

## 2) 핵심 진단

### 진단 A. 지금의 S0~S5는 “거짓말 연기 상태”가 아니라 “프롬프트 분위기 상태”에 가깝다
현재 구조에서는 S0~S1에서 `truthDescription`을 LLM에 주지 않아서, NPC가 자기가 실제로 무엇을 했는지 모르는 채 부정하도록 되어 있습니다.  
이 방식은 **진실 누설 방지**에는 도움이 되지만, **전략적 거짓말**은 불가능하게 만듭니다.

결과:
- S0는 “알면서 부정하는 사람”이 아니라 “그냥 정보가 없는 사람”처럼 말함
- S1/S2/S3의 차이가 서사적으로 분화되지 않음
- 증거가 나와도 “뭘 어떻게 둘러대야 하는지”를 몰라 generic denial로 흐름

즉, **누설 방지와 거짓말 시뮬레이션이 서로 충돌하는 구조**입니다.

### 진단 B. 실제 Phase 1~2와 runtime Phase 3~5가 다른 게임처럼 느껴질 가능성이 높다
사전 생성 Phase 1 스크립트는 캐릭터성이 꽤 선명합니다.
그런데 runtime 구간은 GPT-4o-mini가 긴 시스템 프롬프트를 받아 즉석 생성합니다.

여기서 큰 문제가 하나 더 있습니다.

- Phase 1 스크립트에서는 이미 “송금 사실 인정”, “100만원 상의 약속 일부 인정”, “세린의 휴대폰 열람 문제 제기”가 나옴
- 그런데 lieConfig는 같은 dispute의 initialState를 S0로 둠

문서만으로는 Phase 1~2 이후 runtime start state를 따로 브리징하는지 확정할 수 없지만,  
**만약 브리징이 없다면** 플레이어는 “방금 인정하던 사람이 왜 갑자기 완전 부정하지?”를 느끼게 됩니다.  
**브리징이 있더라도**, 현재 시스템은 “Phase 1의 작가가 쓴 캐릭터”와 “Phase 3의 모델이 즉석으로 만든 캐릭터”가 다른 목소리로 느껴질 가능성이 큽니다.

### 진단 C. 증거는 많지만, “방어 방식”이 구조화되어 있지 않아서 손맛이 없다
증거 데이터는 매우 좋습니다.  
원본 확인, 메타데이터, 맥락 복원, 출처 검증, 편집 탐지, 취득 경위까지 들어가 있습니다.

하지만 runtime 대화에서는 이 증거가 LLM에게 “말로 설명해야 할 텍스트”로만 들어가고,  
NPC가 취할 수 있는 반응이 **명시적인 방어 모드**로 구조화되어 있지 않습니다.

그래서 플레이어 체감은 이렇게 됩니다.
- 증거를 냈다
- 상대가 뭔가 말은 한다
- 하지만 “내가 저 방어선을 하나 무너뜨렸다”는 느낌이 없다

증거는 **사실/맥락/적법성 중 무엇을 공격하는지**가 선명해야 재미가 납니다.  
지금은 엔진은 알고 있어도 플레이어가 보지 못합니다.

### 진단 D. 캐릭터 설정이 “묘사”로는 훌륭하지만 “실행 규칙”으로는 약하다
`speechStyle`, `verbalTells`, `archetype` 모두 훌륭합니다.  
문제는 이 값들이 대부분 **문장 설명**이라는 점입니다.

예:
- avoidant: “숫자로 감정을 숨긴다”
- confrontational: “같은 질문을 어조만 바꿔 반복한다”
- cold_logic: “절차를 세워 책임 주체를 흐린다”

이건 작가가 보면 바로 쓰지만, mini 모델은 turn-by-turn으로 안정적으로 재현하기 어렵습니다.  
특히 한국어 높임말/간접 호칭/감정 억양까지 동시에 요구하면 더 무너집니다.

즉, 지금 데이터는 **작가 친화적 정의**지, **엔진 친화적 정의**가 아닙니다.

### 진단 E. 10~20분 세션에 비해 내부 시스템이 너무 많고, 턴 수가 길다
현재는 Phase 3→4→5를 거치고, 총 30턴 이상 써야 판결이 가능하도록 보입니다.

문제는:
- 플레이어는 30턴 동안 같은 사건을 붙들고 있어야 함
- AI 답변이 2~3문장만 반복돼도 피로해짐
- 내부적으로는 복잡한 FSM/감정/Discovery가 돌아가지만 플레이어는 그 복잡도를 “재미”로 못 읽음

이 구조는 시스템 덕후에게는 아름답지만, 플레이 감각으로는 늘어질 가능성이 큽니다.

---

## 3) 무엇이 모델 한계이고, 무엇이 설계 문제인가

## 모델 한계에 가까운 부분
1. **저비용 모델에게 한국어 경어법 + 미세한 연기 + 거짓말 단계 + 증거 반응 + JSON 출력까지 동시에 요구**
2. 긴 시스템 프롬프트를 매턴 읽히는 구조
3. verbal tell을 확률적으로 자연스럽게 반복 발현시키는 것
4. 같은 캐릭터를 10~20분 세션 내내 안정적으로 유지하는 것

이건 상위 모델이 분명 더 낫습니다.  
하지만 **상위 모델로 바꿔도 구조 문제가 남아 있으면 결국 “좀 덜 망가진 즉흥 연기”에 그칩니다.**

## 설계/데이터 문제라서 고칠 수 있는 부분
1. 거짓말 상태와 실제 알고 있는 진실의 관계
2. 증거 제시 시 가능한 반응 종류의 구조화
3. Phase 1~2와 runtime의 상태/목소리 연결
4. verbalTell을 실행 규칙으로 바꾸는 것
5. 판결까지 필요한 턴 수와 페이즈 길이
6. 플레이어가 “지금 내가 무엇을 깼는지” 보게 하는 UI/피드백

핵심은 **모델 업그레이드보다 먼저 역할을 줄이는 것**입니다.

---

## 4) 가장 우선순위 높은 조치 5개

## P1. S0~S5를 “모델이 해석하는 상태”가 아니라 “엔진이 정한 발화 블루프린트”로 바꾸기
**효과:** 매우 큼  
**비용:** 중간

LLM에게 “지금 S2니까 알아서 부분 인정해”라고 맡기지 말고,  
룰 엔진이 먼저 아래를 결정한 뒤 LLM은 표현만 하게 하세요.

- 이번 턴 focus dispute
- stance (deny / hedge / partial / blame / emotional / confess)
- defenseMode (flat denial / context attack / legality attack / counterattack / silence / concession)
- mustUseTell
- bannedLexemes
- allowedClaims
- forbiddenClaims
- sentenceCount
- counterQuestion 여부

즉, LLM은 **결정자**가 아니라 **배우**가 되어야 합니다.

### 제안 스키마
```ts
type ResponseBlueprint = {
  focusDisputeId: string
  stance: 'deny' | 'hedge' | 'partial' | 'blame' | 'emotional' | 'confess'
  defenseMode:
    | 'flat_denial'
    | 'context_attack'
    | 'legality_attack'
    | 'authenticity_attack'
    | 'counterattack'
    | 'silence'
    | 'concession'
  allowedClaimAtoms: string[]
  forbiddenClaimAtoms: string[]
  mustUseTell?: string
  bannedLexemes?: string[]
  sentenceCount: 1 | 2 | 3
  honorificMode: 'judge_formal'
  partnerReferenceMode: 'indirect'
  shouldCounterQuestion: boolean
}
```

LLM 프롬프트는 이렇게 단순화합니다:

```text
너는 이번 턴의 의미를 결정하지 않는다.
이미 정해진 BLUEPRINT를 한국어 대사 2문장으로 연기만 한다.

규칙:
- 재판관에게는 반드시 존댓말.
- 상대방은 직접 부르지 말고 간접 지칭.
- bannedLexemes는 절대 쓰지 말 것.
- allowedClaimAtoms 밖의 사실을 추가하지 말 것.
- mustUseTell이 있으면 반드시 그 버릇을 1회 발현할 것.
```

이렇게 하면 S0~S5 차이는 모델이 아니라 **엔진이 보장**합니다.

---

## P2. truthPolicy를 “말해도 되는 진실 ID 목록”에서 “현재 공적 주장 카드”로 바꾸기
**효과:** 매우 큼  
**비용:** 중간

지금 truthPolicy는 `allowed` / `forbidden` 중심입니다.  
이 구조는 “누설 방지”엔 좋지만 “거짓말의 형태”를 만들지는 못합니다.

대신 각 state마다 아래를 명시하세요.

```ts
type ClaimPolicy = {
  disputeId: string
  state: 'S0'|'S1'|'S2'|'S3'|'S4'|'S5'
  publicClaim: string[]         // 지금 법정에서 주장하는 것
  privateKnowledge: string[]    // 실제로 알고 있는 것
  suppressions: string[]        // 절대 꺼내지 않을 것
  emotionalLeakRisk: 'none'|'low'|'mid'|'high'
  tellPool: string[]
}
```

예: d-1 / S0
```json
{
  "publicClaim": [
    "송금 사실만으로 부정한 의도를 단정할 수 없다",
    "용도를 지금 설명하는 것은 순서상 적절하지 않다"
  ],
  "privateKnowledge": [
    "280만원은 간병 예약금이다",
    "사전 상의 약속을 어겼다"
  ],
  "suppressions": [
    "간병 예약금",
    "미리 상의 못한 건 내 잘못"
  ],
  "emotionalLeakRisk": "none",
  "tellPool": ["over_precision", "counter_question"]
}
```

이렇게 해야 모델이 “알고 있지만 숨기는 사람”으로 연기할 수 있습니다.

---

## P3. 증거를 ‘텍스트’가 아니라 ‘깨야 하는 방어선’으로 바꾸기
**효과:** 매우 큼  
**비용:** 중간

각 증거마다 NPC가 취할 수 있는 방어 방식과, 조사 결과로 봉쇄되는 방어 방식을 추가하세요.

```ts
type EvidenceChallenge = {
  evidenceId: string
  disputeId: string[]
  attackVectors: Array<'authenticity'|'context'|'legality'|'identity'>
  resolvedBy: {
    request_original?: Array<'authenticity'>
    restore_context?: Array<'context'>
    verify_source?: Array<'identity'>
    question_acquisition?: Array<'legality'>
    check_edits?: Array<'authenticity'>
  }
  whenAllResolved: {
    forceDefenseMode?: 'concession' | 'silence'
    minLieAdvance?: 1 | 2
  }
}
```

### 실제 체감이 어떻게 달라지나
예를 들어 `e-3 메신저 캡처본`은:
- 초반엔 상대가 “잘린 캡처잖아요” (context attack)
- 취득 경위를 캐면 “불법으로 얻은 거잖아요” (legality attack)
- 맥락 복원까지 끝내면 context 공격이 봉쇄
- 적법성도 정리되면 이제 더는 버티기 어려움 → concession or counterattack only

이러면 플레이어는  
**“내가 증거를 조사해서 저 사람의 방어 옵션을 하나씩 없앴다”**는 손맛을 느낍니다.

---

## P4. verbalTell을 ‘설명문’에서 ‘실행 규칙’으로 바꾸기
**효과:** 큼  
**비용:** 낮음~중간

현재:
```json
{
  "type": "over_precision",
  "trigger": "lying",
  "pattern": "불편한 질문이 올수록 숫자가 정밀해진다..."
}
```

권장:
```json
{
  "id": "over_precision",
  "appliesWhen": ["lying", "cornered"],
  "lexicalHooks": ["기준으로", "정확히", "딱"],
  "numericGranularity": "exact_amount_or_minute",
  "cadence": "once_every_2_turns",
  "sentenceShape": "number_first"
}
```

현재:
```json
{
  "type": "counter_question",
  "trigger": "cornered",
  "pattern": "의도를 추궁당하면 답 대신 되묻는다..."
}
```

권장:
```json
{
  "id": "counter_question",
  "appliesWhen": ["cornered"],
  "cadence": "max_once_per_turn",
  "questionShape": "why-did-you",
  "requiresSecondSentence": true
}
```

그리고 post-process에서 실제로 강제합니다.

### 예시
- `mustUseTell = over_precision`
- 응답에 정확한 시각/금액/기준 표현이 없으면 재생성 or 수동 주입
- `counter_question`이 필요한데 문장 끝이 질문이 아니면 재생성

즉, verbalTell을 “기대사항”이 아니라 “검사 가능한 규칙”으로 바꾸세요.

---

## P5. Phase 1~2 → Phase 3 브리지 테이블을 반드시 만들기
**효과:** 큼  
**비용:** 낮음

이건 빠르게 고칠 수 있습니다.

```ts
type RuntimeStartBridge = {
  caseId: string
  disputeId: string
  phase3StartState: 'S0'|'S1'|'S2'|'S3'
  alreadyPubliclyAdmitted: string[]
  playerKnownHooks: string[]
  carryOverTellBias?: string[]
}
```

spouse-01 예시:
- d-1: `S2` 시작이 자연스러움  
  (송금 사실 인정, 용도 숨김)
- d-5: `S1~S2`  
  (약속 문제를 이미 말함)
- d-3: `S0~S1`  
  (외도 여부는 여전히 회피 가능)

이 브리지가 없으면 runtime 첫 턴부터 톤이 깨집니다.

---

## 5) 재미 강화용 플레이 구조 개편

## 지금처럼 “심문 Phase 3/4/5 분리”보다, 플레이어 입장에서는 한 개의 압축된 심문 라운드가 낫다
권장 구조:

### 개편안
- Phase 0 사건 개요
- Phase 1~2 오프닝/반박 (유지)
- **Phase 3 통합 심문** (12~16턴)
  - 3턴마다 한 번 “돌파구 체크”
  - 증거/질문/증인/공감 모두 여기서 사용
- Phase 4 조정/판결
- 결과

### 왜 줄여야 하나
현재 30턴 이상 판결 가능 조건은 모바일 10~20분 세션에 비해 깁니다.  
진실을 감 잡은 뒤에도 시스템이 더 물으라고 강제하면, 추리 게임이 아니라 채우기 게임이 됩니다.

**권장:** 판결 가능 조건을 12~16턴 수준으로 줄이고,  
대신 3개의 “의미 있는 돌파구”를 요구하세요.

예:
1. 핵심 dispute 1개 이상 균열
2. 증거 조사 2회 이상 성공
3. 쟁점 확정 2개 이상

즉, **턴 수**보다 **성과 조건**으로 바꾸는 것이 좋습니다.

---

## 6) 증거 재미를 살리는 구체 메커닉

## A. 사건 보드(Dispute Board)를 추가
각 dispute를 카드로 보여주세요.

```ts
type DisputeBoardCard = {
  disputeId: string
  title: string
  aClaim?: string
  bClaim?: string
  evidenceSupport: number
  evidenceConflict: number
  status: 'unopened' | 'contested' | 'cracked' | 'resolved'
}
```

플레이어는 지금 어디가 열린 쟁점이고, 어느 증거가 누구 말을 밀어주는지 한눈에 봐야 합니다.

## B. 증거 제시 후 결과를 3단계로 명확히
- **버팀**: 말만 바꿈, 상태 유지
- **균열**: 방어 모드 축소, state +1
- **붕괴**: confession beat or S5

이 결과는 UI에 명시적으로 떠야 합니다.

## C. Soft evidence 두 개를 합쳐 Hard처럼 쓰게 하기
현재 soft evidence는 “두 개 모이면 hard 업그레이드” 개념이 이미 있습니다.  
이걸 플레이어가 직접 느끼게 해야 합니다.

예:
- `잘린 캡처본 + 맥락 복원 결과`
- `이체 내역 + 예약 확인서`

두 개를 조합하면 “결정적 제시” 버튼이 열리게 하세요.  
이 순간이 추리 게임의 쾌감 포인트입니다.

---

## 7) 캐릭터 연기를 살리는 실전 운영법

## 가장 현실적인 해법: “오프라인 작성 + 런타임 변주”
당장 84사건을 전면 재작성할 필요는 없습니다.  
대신 **고비가 되는 대사만 사전 생성**하면 됩니다.

### 오프라인으로 미리 만들어 둘 것
각 case × 핵심 dispute × state cluster에 대해:
- deny beat
- hedge beat
- partial admit beat
- blame beat
- confession beat
- evidence hit beat

예시 수량:
- 사건당 핵심 dispute 3개
- dispute당 6개 beat
- 양측 2명
- 84 cases

대략 3,024개 beat 수준입니다.  
전면 대사집으로 보면 많지만, “핵심만” 만들면 1인 개발로도 불가능한 양은 아닙니다.  
게다가 GPT Pro 오프라인 생성 + 수동 선별로 충분히 돌릴 수 있습니다.

### 런타임에서는
- 현재 상황에 가장 가까운 beat를 선택
- LLM은 1문장 정도만 덧칠
- 실패 시 beat 원문 fallback

이 방식이 가장 안전합니다.

---

## 8) 지금 제거/축소를 권하는 것

## 줄일 것 1. 플레이어에게 안 보이는 복잡도
7 lie types × 7 motives × 6 states × 4 emotion tiers는 엔진 안에서는 멋있지만,
플레이어가 체감 못하면 비용만 듭니다.

권장:
- 내부는 유지하되 runtime generation에는 4개 정도의 surface mode만 쓰기
  - deny
  - deflect
  - blame
  - confess

## 줄일 것 2. free_question 의존도
자유 질문은 멋있지만 가장 불안정합니다.  
핵심 루프는 tagged action으로 잡고, free question은 **보너스 경로** 정도로 두는 편이 낫습니다.

## 줄일 것 3. 랜덤 끼어들기
무작위 25%는 법정의 혼란을 만들지만, 전략 재미보다는 잡음을 늘릴 수 있습니다.

권장:
- evidence가 상대방도 건드릴 때만 끼어들기
- 해당 dispute가 상대 sensitivePoint일 때만 끼어들기
- 끼어들기에도 목적을 달기

## 줄일 것 4. 미니게임 우선순위
핵심 심문 루프가 재미있기 전에는 미니게임이 본질을 구해주지 못합니다.  
메모리 퍼즐/심박 연출은 나중 문제입니다.

---

## 9) 모델 전략

## 결론
- **모델 업그레이드는 “도움”은 되지만 “해결책”은 아닙니다.**
- 먼저 해야 할 일은 **한 턴에서 모델이 결정해야 하는 것을 줄이는 것**입니다.

## 권장 라우팅
- 일반 심문 턴: 현 모델 유지 가능
- 아래 턴만 상위 모델 검토
  - S4/S5 confession
  - 증인 testimony
  - Phase 6 mediation
  - 자유 질문 중 고난도 감정 턴

즉, **고비용 모델을 전체가 아니라 클라이맥스에만 쓰는 방식**이 현실적입니다.

---

## 10) 2주 실행 플랜

## 1주차
1. Phase 3 start bridge 추가
2. response blueprint 구조 추가
3. banned lexeme validator 추가
4. honorific/post-process 강화
5. 판결 가능 최소 턴 축소

## 2주차
1. evidence attack vector 시스템 추가
2. dispute board UI 추가
3. spouse-01 / workplace-01 두 사건으로 파일럿
4. 핵심 beat 사전 생성
5. A/B 테스트
   - 기존
   - bridge only
   - bridge + blueprint
   - bridge + blueprint + evidence vectors

### 꼭 측정할 지표
- turn당 평균 응답 길이
- S0/S1 누설률
- tell 발현률
- evidence 제시 후 state advance율
- 플레이어가 판결 직전까지 유지한 dispute 수
- case completion time
- “내가 거짓말을 깼다” 주관 점수

---

## 11) 참고 사례에서 배울 점

## Ace Attorney
배울 점:
- 증거 제시는 “말 많은 대화”가 아니라 “명확한 모순 제시”여야 함
- 모순 지적 순간이 게임의 보상 포인트

## Contradiction: Spot The Liar
배울 점:
- 진술 A와 진술 B를 짝지어 충돌시키는 구조가 핵심 재미
- “둘 중 뭐가 틀렸는지”를 플레이어가 직접 꽂는 설계가 중요

## Her Story
배울 점:
- 모든 걸 실시간 논쟁으로 만들지 않아도 된다
- 플레이어가 정보 조각을 재구성하는 과정 자체가 재미가 될 수 있다

## Golden Idol
배울 점:
- 추리는 결국 “빈칸을 채우는 구조적 만족감”
- 정보가 아무리 자유로워도, 마지막에는 명시적 추론 인터페이스가 필요하다

## LLM 사례
현재 공개된 LLM 캐릭터 플랫폼들도 대체로
- 캐릭터 프로필
- 감정/관계 상태
- 대화 생성
을 분리하거나,
- 수치화된 감정 조건
- 명시적 그래프/서사 구조
를 둡니다.

즉, **좋은 결과는 “프롬프트에 성격을 많이 적는 것”보다 “상태를 구조화해서 넘기는 것”에서 나옵니다.**

---

## 12) 최종 판단

**이 컨셉은 버릴 필요가 없습니다.**
오히려 강합니다.

다만 지금 방식대로는  
“정교한 사건 데이터 + 복잡한 룰 엔진 + 저비용 LLM 즉흥 연기”가  
서로의 장점을 깎아먹고 있습니다.

정리하면:
1. **LLM이 진실을 모른 채 거짓말하게 하지 말 것**
2. **LLM이 의미를 결정하지 말고, 엔진이 결정한 발화 블루프린트를 연기하게 할 것**
3. **증거를 텍스트가 아니라 방어선 붕괴 메커닉으로 바꿀 것**
4. **Phase 1~2와 runtime를 브리지할 것**
5. **30턴 구조를 줄이고, 돌파구 중심으로 재설계할 것**

이 다섯 가지만 해도, 지금보다 훨씬 “거짓말을 간파하는 게임”에 가까워질 가능성이 높습니다.

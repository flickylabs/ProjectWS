# Solomon 리뉴얼 — 5개 설계 의견

아래 의견은 현재 확정된 리뉴얼 방향(Phase 3/4/5 통합, 12~16턴 단일 심문, ResponseBlueprint/EvidenceChallenge/BeatScript 중심 구조)에 맞춰 정리한 실행안이다.

## 1. 성과 조건 설계

### 설계안
현재 제안된 `균열 2 / 조사 성공 2 / 쟁점 확정 2`는 방향은 맞지만, 그대로 하드 게이트로 쓰면 사건 난이도와 플레이 스타일에 따라 너무 경직될 가능성이 있다. 특히 감정 전략 중심 플레이나 빠른 모순 추궁 플레이가 불리해질 수 있다. 따라서 **하드 게이트 + 가중 점수**의 혼합형을 권한다.

#### A. 핵심 정의
- **cracked dispute**: 해당 쟁점의 lieState가 `S2+`
- **resolved dispute**: 해당 쟁점이 `S4+`에 도달했거나 Discovery에서 `resolved` 판정
- **investigation success**: 조사 액션이 실제로 1개 이상의 attackVector를 봉쇄함
- **full collapse**: 어떤 EvidenceChallenge의 attackVector가 전부 봉쇄됨
- **major breakthrough**: `resolved dispute` 또는 `full collapse` 또는 `confession`

#### B. 판결 가능 조건
```ts
verdictEligible =
  (turn >= 8 || earlyFinishException) &&
  readinessScore >= 5 &&
  progressedDisputeCount >= 2 &&
  majorBreakthroughCount >= 1
```

#### C. readinessScore 산식
```ts
score = 0
score += min(crackedDisputeCount, 2) * 1
score += min(resolvedDisputeCount, 2) * 2
score += min(investigationSuccessCount, 2) * 1
score += min(fullCollapseCount, 2) * 1
score += min(hiddenDisputeRevealCount, 1) * 1
score += min(confessionCount, 1) * 2
```

#### D. 조기 종료 예외
아래 중 하나면 `turn >= 8` 조건 없이 `turn >= 6`부터 판결 가능:
- `confessionCount >= 1`
- `resolvedDisputeCount >= 2`
- `resolvedDisputeCount >= 1 && fullCollapseCount >= 1 && investigationSuccessCount >= 2`

#### E. 16턴 종료 처리
16턴이 지났는데 `verdictEligible === false`이면 **강제 판결로 전환**하되, 실패 처리로 끊지 말고 `불충분 심리` 상태를 붙인다.

```ts
if (turn === 16 && !verdictEligible) {
  phase = 'verdict'
  verdictMode = 'forced_incomplete'
  confidencePenalty = true
}
```

강제 판결 시:
- 플레이어는 여전히 판결/조정 선택 가능
- 미해결 쟁점은 판결 신뢰도 패널티 반영
- 보상/평가에서 감점
- UI에 “핵심 쟁점이 충분히 정리되지 않았습니다” 경고 표시

### 근거
12~16턴 구조에서는 정확히 2/2/2를 모든 사건에 동일하게 강제하는 방식보다, **여러 플레이 루트가 같은 목표를 향해 수렴**하도록 만드는 편이 자연스럽다. 현재 계획도 단일 심문 Phase와 성과 조건 판결을 전제로 하고 있고, Discovery와 EvidenceChallenge를 병행 유지하려고 하므로, 결과를 단일 숫자가 아니라 “균열·조사·확정”의 조합으로 읽는 것이 더 잘 맞는다.

### 주의점
- 같은 증거 하나로 생긴 `investigation success`와 `full collapse`를 무한 중복 가산하면 안 된다.
- `resolved dispute`는 `S2`가 아니라 `S4+` 또는 별도 확정 판정으로 잡아야 한다.
- 조기 종료는 드물어야 한다. 너무 쉽게 열리면 10분 이하로 붕괴한다.
- `forced_incomplete`는 실패 화면이 아니라 “불리한 상태의 판결”이어야 한다.

---

## 2. Blueprint 생성 매트릭스

### 설계안
이건 **단일 거대 테이블**보다 **순차 규칙 파이프라인**으로 구현하는 게 안정적이다.

단, 한 가지는 분명히 짚어야 한다.
`evidenceBlockedVectors: 0~4` **개수만으로는** `context_attack / legality_attack / authenticity_attack` 중 무엇을 써야 하는지 결정할 수 없다. 따라서 실제 함수에는 아래 둘 중 하나가 추가로 들어가야 한다.

```ts
availableAttackVectors: AttackVector[]
// 또는
preferredAttackOrder: AttackVector[]
```

이 값은 `EvidenceChallenge.attackVectors`와 `resolvedBy`에서 바로 유도 가능하다.

#### 2-A. 전처리
```ts
const stateRank = { S0:0, S1:1, S2:2, S3:3, S4:4, S5:5 }[lieState]
const trustBand = trustTowardJudge >= 70 ? 'high'
  : trustTowardJudge <= 30 ? 'low'
  : 'mid'
```

#### 2-B. stance용 기본값
```ts
function baseStance(lieState, trustTowardJudge): Stance {
  switch (lieState) {
    case 'S0': return 'deny'
    case 'S1': return 'hedge'
    case 'S2': return 'partial'
    case 'S3': return trustTowardJudge < 40 ? 'blame' : 'partial'
    case 'S4': return trustTowardJudge >= 60 ? 'confess' : 'emotional'
    case 'S5': return 'confess'
  }
}
```

#### 2-C. 특수 예외 먼저 처리
```ts
if (lieState === 'S5') {
  return { stance:'confess', defenseMode:'concession' }
}

if (emotionTier === 'shutdown') {
  if (evidenceBlockedVectors >= 3 || trustTowardJudge >= 70) {
    return {
      stance: stateRank >= 4 ? 'confess' : 'emotional',
      defenseMode: evidenceBlockedVectors === 4 ? 'concession' : 'silence'
    }
  }
  return { stance:'emotional', defenseMode:'silence' }
}

if (questionType === 'evidence_present' && evidenceBlockedVectors === 4) {
  return {
    stance:
      stateRank >= 4 || trustTowardJudge >= 45 || emotionTier !== 'calm'
        ? 'confess'
        : 'partial',
    defenseMode:'concession'
  }
}
```

#### 2-D. stance 보정 규칙
기본 stance를 만든 뒤, 아래 순서로 보정한다.

##### 1) 질문 유형 보정
```ts
switch (questionType) {
  case 'fact_pursuit':
    // 기본 유지
    break

  case 'motive_search':
    stance = soften(stance) // deny→hedge, hedge→partial, partial→emotional, emotional→confess
    break

  case 'empathy_approach':
    if (trustTowardJudge >= 50) stance = soften(stance)
    else if (trustTowardJudge < 35 && emotionTier !== 'calm') stance = harden(stance)
    break

  case 'evidence_present':
    if (evidenceBlockedVectors <= 1 && trustTowardJudge < 50) {
      stance = harden(stance)
    } else if (evidenceBlockedVectors >= 2) {
      stance = soften(stance)
    }
    break
}
```

`soften / harden`은 아래처럼 둔다.
```ts
function soften(s: Stance): Stance {
  if (s === 'deny') return 'hedge'
  if (s === 'hedge') return 'partial'
  if (s === 'blame') return 'partial'
  if (s === 'partial') return 'emotional'
  if (s === 'emotional') return 'confess'
  return s
}

function harden(s: Stance): Stance {
  if (s === 'confess') return 'emotional'
  if (s === 'emotional') return 'partial'
  if (s === 'partial') return 'hedge'
  if (s === 'hedge') return 'deny'
  return s
}
```

##### 2) 감정 상태 보정
```ts
if (emotionTier === 'agitated') {
  if (stance === 'deny') stance = 'hedge'
  else if (stance === 'hedge') stance = 'partial'
  else if (stance === 'partial') {
    stance = trustTowardJudge < 40 ? 'blame' : 'emotional'
  }
}

if (emotionTier === 'explosive') {
  if (evidenceBlockedVectors >= 3) {
    stance = trustTowardJudge >= 50 ? 'emotional' : 'blame'
  } else {
    stance = trustTowardJudge < 60 ? 'blame' : 'emotional'
  }
}
```

##### 3) 공격적 전가 강제 규칙
```ts
if (
  (emotionTier === 'explosive' || trustTowardJudge <= 25) &&
  ['S2','S3'].includes(lieState) &&
  questionType !== 'empathy_approach' &&
  evidenceBlockedVectors <= 2
) {
  stance = 'blame'
}
```

#### 2-E. defenseMode 결정 규칙
먼저 벡터 공격 선택기:
```ts
function pickVectorDefense(
  available: AttackVector[],
  questionType,
  trustTowardJudge
): DefenseMode | null {
  const order =
    trustTowardJudge <= 35
      ? ['legality', 'authenticity', 'context', 'identity']
      : questionType === 'fact_pursuit'
      ? ['context', 'authenticity', 'identity', 'legality']
      : questionType === 'evidence_present'
      ? ['authenticity', 'context', 'identity', 'legality']
      : questionType === 'motive_search'
      ? ['identity', 'context', 'authenticity', 'legality']
      : ['context', 'identity', 'authenticity', 'legality']

  const picked = order.find(v => available.includes(v))
  if (picked === 'context') return 'context_attack'
  if (picked === 'legality') return 'legality_attack'
  if (picked === 'authenticity') return 'authenticity_attack'
  if (picked === 'identity') return 'authenticity_attack' // 현 스키마에 identity 전용 mode가 없으므로 authenticity로 흡수
  return null
}
```

그 다음 최종 매핑:
```ts
if (stance === 'confess') {
  defenseMode = 'concession'
}
else if (stance === 'emotional') {
  defenseMode =
    evidenceBlockedVectors >= 3 || trustTowardJudge >= 60
      ? 'concession'
      : 'silence'
}
else if (stance === 'blame') {
  const vectorMode =
    questionType === 'evidence_present' && evidenceBlockedVectors <= 1
      ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
      : null
  defenseMode = vectorMode ?? 'counterattack'
}
else if (stance === 'partial') {
  const vectorMode =
    questionType === 'evidence_present' && evidenceBlockedVectors <= 2
      ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
      : null
  defenseMode = vectorMode ?? 'concession'
}
else if (stance === 'hedge') {
  const vectorMode =
    questionType === 'evidence_present' && evidenceBlockedVectors <= 2
      ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
      : null
  defenseMode =
    emotionTier === 'shutdown'
      ? 'silence'
      : (vectorMode ?? 'flat_denial')
}
else { // deny
  const vectorMode =
    questionType === 'evidence_present' && evidenceBlockedVectors <= 1
      ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
      : null

  if (questionType === 'empathy_approach' && trustTowardJudge < 35) {
    defenseMode = 'silence'
  } else {
    defenseMode = vectorMode ?? 'flat_denial'
  }
}
```

#### 2-F. 부가 Blueprint 규칙
`ResponseBlueprint`에는 문장 수와 되묻기 여부도 있으므로 같이 묶는 편이 좋다.

```ts
sentenceCount =
  stance === 'confess' ? 3
  : stance === 'emotional' ? 2
  : stance === 'partial' ? 2
  : stance === 'blame' ? 2
  : 1

shouldCounterQuestion =
  stance === 'blame' ||
  (stance === 'hedge' && trustTowardJudge < 40 && evidenceBlockedVectors <= 1)

if (shouldCounterQuestion && sentenceCount === 1) sentenceCount = 2
if (mustUseTell?.requiresSecondSentence && sentenceCount === 1) sentenceCount = 2
```

### 근거
현재 스키마는 `ResponseBlueprint`가 stance/defenseMode/allowedClaimAtoms/forbiddenClaimAtoms/sentenceCount/shouldCounterQuestion를 모두 묶는 구조이고, `EvidenceChallenge`는 attackVectors와 resolvedBy, whenAllResolved를 따로 들고 있다. 즉 의미 결정은 엔진이, 연기는 LLM이 맡는 현재 방향에 이 규칙형 파이프라인이 정확히 맞는다.

### 주의점
- `identity`는 현재 `DefenseMode`에 별도 타입이 없다. 지금처럼 `authenticity_attack`으로 흡수할지, `identity_attack`를 추가할지 초기에 결정해야 한다.
- `availableAttackVectors` 없이 blocked count만으로는 방어 모드가 논리적으로 흔들린다.
- `shouldCounterQuestion=true`이면 `sentenceCount`는 최소 2로 강제해야 한다.
- `mustUseTell.requiresSecondSentence`와 sentenceCount 충돌을 validator에서 막아야 한다.

---

## 3. Beat 스크립트 작성 가이드

### 설계안
Beat는 “상태별 다른 말”이 아니라, **한 인물이 압박 수준에 따라 같은 성격으로 다른 방어를 하는 것**처럼 들려야 한다. 그래서 각 캐릭터마다 먼저 `Voice Sheet`를 만든 뒤, 6개 beat를 그 위에 쓰는 방식을 권한다.

#### 3-A. 캐릭터별 Voice Sheet 8항목
Beat 쓰기 전에 캐릭터마다 아래를 먼저 고정한다.
1. **호칭/경어 기준선** — 재판관, 상대방, 가족에게 각각 어떤 높임말을 쓰는가
2. **기본 문장 길이** — 짧고 끊나 / 중간 길이 / 설명형인가
3. **핵심 lexical family** — 자주 쓰는 어휘군 3~6개
4. **기본 tell** — over_precision, 되묻기, 반복, 조건문 등
5. **회피 방식** — 직접 부정 / 불확실성 강조 / 맥락 이동 / 감정 전환
6. **공격 방식** — 상대 탓 / 절차 탓 / 오해 탓 / 상황 탓
7. **수치심 표현 방식** — 사과 / 침묵 / 정정 / 짜증 / 울컥
8. **진실 인정 상한선** — 어디까지는 먼저 인정하고, 어디서부터 막는가

6개 beat는 이 8개 중 최소 5개를 공유해야 한다. 바뀌는 것은 **사실 노출량**과 **감정 개방도**뿐이다.

#### 3-B. beat 공통 작법 규칙
- 한 beat에는 **새 사실 원자 1개만** 푼다. confession만 예외적으로 2개까지 허용.
- 한 beat는 **주장 + 성격 흔적 + 방어 후속동작**의 3층 구조로 쓴다.
- tell은 beat마다 1개만 강하게 넣는다. 2개 이상 겹치면 캐릭터가 아니라 장치처럼 보인다.
- 같은 캐릭터의 deny/partial/confession에서도 **호칭 체계는 함부로 바뀌면 안 된다.**
- family-01에서는 부모-자녀 높임/낮춤이 가장 먼저 고정돼야 한다.

#### 3-C. beat별 권장 길이
- `deny`: 1~2문장
- `hedge`: 2문장
- `partial`: 2문장
- `blame`: 2문장
- `evidence_hit`: 2문장
- `confession`: 2~3문장

이 길이는 현재 BeatScript 스키마의 `line: 1~3문장` 제약과도 맞다.

#### 3-D. beat별 구조 템플릿
**deny**
- 1문장째: 핵심 부정
- 2문장째(선택): 짧은 되묻기 또는 범위 축소

**hedge**
- 1문장째: 불확실성/기억 흐림/정황 분산
- 2문장째: 쟁점 축소 또는 맥락 흐리기

**partial**
- 1문장째: 저위험 사실 인정
- 2문장째: 고위험 의미는 부정

**blame**
- 1문장째: 억울함 또는 반격 포지션 선점
- 2문장째: 상대/상황/절차 쪽으로 책임 이동

**evidence_hit**
- 1문장째: 순간 균열(멈춤, 반복, 정정, 말줄임)
- 2문장째: 캐릭터 고유의 회복 동작

**confession**
- 1문장째: 핵심 사실 인정
- 2문장째: 왜 숨겼는지 자기식 설명
- 3문장째(선택): 관계 감정 또는 후회

#### 3-E. archetype별 톤 차이
**avoidant**
- 직접 명사보다 대명사/완곡어가 많다.
- 사과도 단정이 아니라 “그렇게 보이셨다면” 식으로 비껴간다.
- confession은 “제가 그 부분을 피한 건 맞습니다”처럼 **행동 회피의 인정**으로 들어간다.
- evidence_hit에서도 바로 무너지지 않고, 말끝을 흐리거나 정정한다.

**confrontational**
- 짧고 날카롭다.
- 부정이든 인정이든 늘 주도권을 잡으려 든다.
- confession도 “네, 그건 제가 했습니다. 그런데 이유는 들어보셨습니까?”처럼 **공격성**이 남아야 한다.
- evidence_hit에서는 움찔한 다음 바로 반격성 2문장으로 복구한다.

**victim_cosplay**
- 모든 beat가 자기 상처, 억울함, 불균형으로 수렴한다.
- denial도 사실 부정보다 “왜 저만 문제 삼느냐”가 먼저 튀어나온다.
- confession은 “제가 한 건 맞지만, 그때 저는 정말 몰려 있었습니다”처럼 **상처 서사**를 통해 나온다.
- evidence_hit에서는 객관 반박보다 감정적 억울함이 먼저 새어 나온다.

**cold_logic**
- 감정보다 기준, 순서, 시점, 액수를 앞세운다.
- 부정과 인정 모두 범위를 세밀하게 자른다.
- confession도 “송금 사실은 맞습니다. 다만 목적은 생활비 보전이 아니라 예약금이었습니다”처럼 **정밀 분해형**이어야 한다.
- evidence_hit에서는 말문이 막히기보다 표현이 더 건조해진다.

#### 3-F. confession beat 원칙
confession은 “좋은 사람이 된 순간”이 아니다. **여전히 같은 사람인데, 더는 못 버티는 지점에 도달한 순간**이어야 한다.

따라서 confession에서는 아래 셋 중 최소 둘을 유지한다.
- 기존 호칭 체계
- 기존 tell 1개
- 기존 책임 해석 방식
- 기존 감정 언어의 밀도

예:
- avoidant: 사실 인정 + 시선 회피 + 최소 사과
- confrontational: 사실 인정 + 이유 주장 + 억울함 유지
- victim_cosplay: 사실 인정 + 상처 호소 + 자기방어
- cold_logic: 사실 인정 + 범위 한정 + 감정 절제

#### 3-G. evidence_hit beat 원칙
evidence_hit는 “무너짐”이 아니라 **금이 가는 순간**이다.

그래서 2문장 구조를 권한다.
1. **균열 문장** — 반복, 정정, 비정상적 정밀도, 짧은 멈춤
2. **회복 문장** — 원래 archetype 방식으로 다시 방어

이렇게 해야 “당했다”는 손맛은 나지만 캐릭터가 한순간에 다른 사람처럼 바뀌지 않는다.

### 근거
계획서상 BeatScript는 파일럿 사건에서만 우선 생성하고, 1~3문장, behaviorHint 포함 구조로 쓰게 되어 있다. 또 family-01은 가족 관계 호칭과 감정 표현이 핵심 검증 포인트다. 따라서 Beat의 일관성은 문장 미감보다 **호칭·길이·tell·방어 습관의 고정**으로 잡는 편이 가장 안전하다.

### 주의점
- Beat는 ClaimPolicy를 넘어서는 사실을 새로 만들면 안 된다.
- confession도 suppressions 전체를 한 번에 토해내면 안 된다.
- evidence_hit는 고백 beat가 아니다. 금 가는 순간과 붕괴 순간을 분리해야 한다.
- family-01에서 감정이 세졌다고 반말/존댓말 체계가 갑자기 뒤집히면 바로 캐릭터 붕괴로 느껴진다.

---

## 4. Dispute Board UX

### 설계안
모바일 10~20분 세션에서는 Board가 “수사 노트”처럼 복잡하면 안 된다. **한눈에 현재 싸움의 구조를 읽게 하는 것**이 우선이다. 그래서 3단 정보 구조를 권한다.

#### 4-A. 정보 우선순위
**항상 보이는 정보 (Tier 1)**
1. 현재 focus dispute
2. 각 쟁점의 상태: unopened / contested / cracked / resolved
3. 양측 현재 주장 요약(A claim / B claim)
4. 해당 쟁점에 연결된 증거 수와 영향 방향
5. 판결 준비도 요약(균열 / 조사 / 확정)

**펼쳤을 때 보이는 정보 (Tier 2)**
6. 관련 증거 칩 목록
7. Discovery 결과 요약(진실 공방, 증거 감별, 숨겨진 쟁점, 감정 전략)
8. 최근 의미 있는 진전 1~2개

**별도 시트/드로어 정보 (Tier 3)**
9. 증거 원문/조사 로그
10. attackVector 세부 상태
11. blockedClaims 세부 목록

#### 4-B. 레이아웃 권장
**상단 고정 바**
- 좌: `턴 9 / 16`
- 중: 현재 focus dispute 이름
- 우: 판결 준비도 3칸 요약
  - 균열
  - 조사
  - 확정

**중앙: dispute 카드 영역**
- 3~5개 카드
- 한 번에 **1개만 확장**
- 현재 쟁점 카드는 자동 확장
- 나머지는 접힌 상태에서 상태/요약만 보임

**하단: evidence bottom sheet**
- 증거 선택 시만 열림
- 해당 증거가 어느 쟁점에 영향을 주는지 표시
- 여기서 조사 결과와 감별 결과 확인

#### 4-C. 쟁점 카드 구조
접힌 카드:
- 쟁점 제목
- 상태 칩
- A claim 한 줄
- B claim 한 줄
- 증거 배지: `지지 1 / 충돌 2`

펼친 카드:
- A 주장 2줄, B 주장 2줄
- 연결 증거 칩들
- 최근 진전 2개
- 숨겨진 쟁점 발현 시 `NEW` 리본

#### 4-D. 양측 주장 표기 방식
긴 문장을 그대로 넣지 말고, `ClaimPolicy.publicClaim`을 **Board용 요약문**으로 1차 압축해서 쓴다.

예:
- A says: “송금은 했지만 의도는 다르다”
- B says: “송금 자체가 부정의 증거다”

규칙:
- 접힌 카드: 1줄 18~26자 내외
- 펼친 카드: 최대 2줄
- 원문 publicClaim 전체는 툴팁/드로어에서만

#### 4-E. 증거 영향 시각화
모바일에서는 선으로 잇는 그래프보다 **칩 + 배지**가 낫다.

권장 방식:
- 카드 하단에 `지지` / `충돌` 증거 칩 분리
- 각 칩은 상태 아이콘 보유
  - 미검토: 빈 원
  - 조사 중: 점선 방패
  - 검증됨: 실선 방패
  - 방어선 붕괴: 깨진 방패
- 증거 선택 시 영향을 받는 dispute 카드만 하이라이트

#### 4-F. 쟁점 상태 시각 규칙
- `unopened`: 회색 윤곽, 주장 숨김
- `contested`: 노란 테두리, A/B 주장 모두 선명
- `cracked`: 금 간 아이콘, 한쪽 주장 일부 흐림, “모순 발견” 태그
- `resolved`: 채워진 배지 + 체크, 요약 결론 1줄

#### 4-G. 정보 과부하 방지 규칙
- 동시 확장 카드 1개만
- 화면에 항상 보이는 claim은 양측 각 1개만
- 증거 원문은 메인 보드에 넣지 않음
- 감정 상태는 숫자 대신 아이콘 또는 짧은 상태어만
- 새로 열린 hidden dispute는 애니메이션보다 `NEW` 태그로 충분

#### 4-H. 기존 Discovery 통합 방식
- `진실 공방`: crack meter에 반영
- `증거 감별`: 각 증거 칩에 `신뢰 / 부분 / 의심` 배지 부여
- `숨겨진 쟁점 발현`: 새 카드 등장 + NEW 태그
- `감정 전략`: 인물 초상/카드 우측 상단에 작은 상태 아이콘

### 근거
계획서에서도 Phase C에 Dispute Board UI, 증거 영향 표시, 상태 변화, 증거 결과의 3단계 피드백이 별도로 잡혀 있다. 즉 Board의 역할은 “텍스트를 많이 보여주는 것”이 아니라 **상태 변화를 보이게 하는 것**이다.

### 주의점
- 카드 간 연결선을 많이 쓰면 모바일에서 바로 난잡해진다.
- raw 증거 텍스트를 보드에 직접 노출하면 집중점이 흩어진다.
- crack와 resolved를 같은 강도로 보이면 플레이어가 다음 행동 우선순위를 읽기 어렵다.
- 판결 준비도는 세부 점수보다 달성 조각을 보여주는 편이 체감이 좋다.

---

## 5. Discovery 시스템과 EvidenceChallenge 통합

### 설계안
기존 Discovery 4종은 유지하되, EvidenceChallenge는 별도 미니게임이 아니라 **Discovery 트리거를 더 정밀하게 발생시키는 압력 시스템**으로 쓰는 게 맞다.

핵심은 다음 두 문장으로 정리된다.
- **Evidence Appraisal은 “이 증거를 믿어도 되는가”를 판단한다.**
- **EvidenceChallenge는 “믿는다고 할 때, NPC가 어떤 방어를 더 못 쓰게 되는가”를 판단한다.**

#### 5-A. 이벤트 계약
```ts
onInvestigationResolved(evidenceId, action)
  -> block attack vectors
  -> emit('evidence_vector_blocked')

if (all attackVectors blocked)
  -> emit('evidence_challenge_collapsed')
```

#### 5-B. 전체 봉쇄 시 Discovery 트리거 우선순위
`evidence_challenge_collapsed`가 발생하면 다음 우선순위로 처리:

**1순위. Hidden Dispute Reveal**
- `blockedClaims`가 아직 unopened 상태의 dispute와 연결돼 있으면
- 새 dispute 카드를 연다
- 이 경우 “숨겨진 쟁점 발현”을 1차 이벤트로 사용

**2순위. Truth Duel 강제 진입**
- 이미 열린 dispute라면
- 다음 관련 질문 1회에 대해 `defenseMode = concession | silence` 우선 적용
- `whenAllResolved.minLieAdvance`만큼 lieState 강제 전진

**3순위. Emotional Leverage 기회 생성**
- `emotionalLeakRisk`가 `mid/high`이거나 emotionTier가 `agitated+`이면
- 다음 1~2턴 동안 공감형 질문 보너스 부여
- 예: trustTowardJudge +15, soften(stance) 1회 적용

즉, “전체 봉쇄 = 항상 감정 폭발”이 아니라,
- 새 쟁점이 나오면 hidden dispute,
- 아니면 진실 공방,
- 감정 누설 위험이 높을 때만 emotional leverage window를 여는 구조가 가장 자연스럽다.

#### 5-C. Evidence Appraisal과의 관계
증거 감별 결과는 **vector 봉쇄의 강도**에 영향을 줘야 한다.

```ts
if appraisal === 'trustworthy':
  apply resolvedBy normally

if appraisal === 'partial':
  apply only 1 blocked vector now
  // 나머지는 corroboration 필요

if appraisal === 'suspicious':
  apply 0 blocked vectors
  // 필요시 authenticity 방어 여지 유지
```

권장 세부 규칙:
- `trustworthy`: resolvedBy에 적힌 벡터 전부 봉쇄
- `partial`: 가장 핵심 벡터 1개만 우선 봉쇄, 나머지는 보류
- `suspicious`: 봉쇄 없음. 다만 “검증 대기” 상태로 보드에 남김

이렇게 해야 감별과 챌린지가 중복되지 않는다.

#### 5-D. Emotional Leverage와의 관계
감정 전략은 **벡터를 직접 봉쇄하면 안 된다.**
그건 증거 조사와 역할이 겹친다.

대신 감정 전략은 아래만 바꾼다.
- `trustTowardJudge`
- `emotionTier`
- `stance` softening chance
- `concession / confession` 확률

권장 규칙:
- full collapse 발생 시 emotionTier +1 (최대 explosive)
- 단, cold_logic 캐릭터는 +0 또는 조건부 +1
- empathy_approach 성공 시 trustTowardJudge +10~15
- emotional success는 남은 vector를 “봉쇄”하지 않고, **그 vector를 쓰지 못하게 만드는 stance 변화**만 유도

#### 5-E. Truth Duel과의 연동
Truth Duel은 EvidenceChallenge 결과를 소비하는 핵심 루프가 돼야 한다.

예:
- evidence collapsed
- 다음 턴 relevant dispute에서
- `stance`가 soften되거나 `defenseMode=concession`
- 그 결과 crack 또는 resolve가 일어남

즉,
- EvidenceChallenge = 방어 옵션 삭제
- Truth Duel = 삭제된 방어 위에서 lieState를 실제로 전진시키는 단계

#### 5-F. Hidden Dispute 발현 규칙
EvidenceChallenge의 `blockedClaims`는 숨겨진 쟁점과 연결하기 좋다.

예:
- 어떤 증거가 “송금 의도 부인”을 막았는데
- 그 blockedClaim이 사실상 새 동기/새 합의/새 관계 문제를 시사하면
- unopened dispute를 reveal

이 방식이면 hidden dispute가 뜬금없는 이벤트가 아니라,
**플레이어가 방어선을 무너뜨린 결과 새 층이 드러나는 경험**이 된다.

### 근거
현재 스키마는 `EvidenceChallenge`에 attackVectors, resolvedBy, whenAllResolved, blockedClaims가 이미 있고, 계획서에서도 Discovery는 유지하면서 EvidenceChallenge와 병렬 운영한다고 잡혀 있다. 따라서 교체가 아니라 **트리거 체계의 재배선**으로 접근하는 게 가장 리스크가 낮다.

### 주의점
- 감정 전략이 증거 자체를 검증하는 역할까지 가져가면 시스템 경계가 흐려진다.
- `partial` 감별인데 모든 vector를 한 번에 막아버리면 Evidence Appraisal이 의미 없어진다.
- full collapse에서 hidden dispute, truth duel, emotional spike를 한꺼번에 다 터뜨리면 과밀해진다. 1차/2차 이벤트로 나눠라.
- blockedClaims는 너무 많이 달지 말고 “실제로 다음 쟁점을 여는 주장”만 넣어라.


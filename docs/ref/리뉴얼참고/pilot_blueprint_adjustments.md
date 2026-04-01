# Solomon 파일럿 후 Blueprint/심문 구조 보정 의견

## 핵심 결론
이번 파일럿 문제는 LLM 품질보다 **의미 계층이 아직 충분히 분리되지 않은 것**에 가깝다.

우선순위는 아래 순서가 맞다.
1. `stance`-`defenseMode` 호환성 강제
2. Phase 1 인정 사실을 엔진 레벨에서 재부정 불가 처리
3. 재판관 질문을 엔진이 의미적으로 생성
4. 심문 하위 액션을 `톤 보정`이 아니라 `응답 초점 전환`으로 재정의
5. 초기 쟁점 노출을 축소하고 중립 라벨로 전환

---

## 1. stance-defenseMode 매핑 보정

### 결론
`hedge -> flat_denial`은 금지해야 한다.

현재 구조에서 `flat_denial`은 사실상 **행위 자체 부정**인데, `hedge`는 **말을 흐리되 완전 부정은 하지 않는 태도**라서 둘은 의미적으로 충돌한다.

### 권장안 A — 최소 수정안 (현재 스키마 유지)
새 defenseMode 추가 없이 즉시 패치하려면 아래 호환 테이블을 쓰는 것이 안전하다.

```ts
const ALLOWED_MODES_BY_STANCE: Record<Stance, DefenseMode[]> = {
  deny: ['flat_denial', 'context_attack', 'legality_attack', 'authenticity_attack', 'silence'],
  hedge: ['silence', 'context_attack', 'legality_attack', 'authenticity_attack'],
  partial: ['concession', 'context_attack', 'legality_attack', 'authenticity_attack', 'counterattack'],
  blame: ['counterattack', 'context_attack', 'legality_attack', 'authenticity_attack'],
  emotional: ['silence', 'concession', 'counterattack'],
  confess: ['concession']
}
```

핵심 규칙:
- `flat_denial`은 **deny 전용**
- `hedge`의 기본 fallback은 `silence`
- `partial`의 기본 fallback은 `concession`
- `blame`의 기본 fallback은 `counterattack`
- `confess`는 무조건 `concession`

보정 함수:

```ts
function coerceDefenseMode(stance: Stance, requested: DefenseMode): DefenseMode {
  const allowed = ALLOWED_MODES_BY_STANCE[stance]
  if (allowed.includes(requested)) return requested

  if (stance === 'hedge') return 'silence'
  if (stance === 'partial') return 'concession'
  if (stance === 'blame') return 'counterattack'
  if (stance === 'emotional') return 'silence'
  if (stance === 'confess') return 'concession'
  return 'flat_denial'
}
```

### 권장안 B — 정석 수정안 (스키마 확장 허용)
가능하면 `DefenseMode`에 아래 2개를 추가하는 편이 맞다.
- `deflection` — 쟁점 핵심 대신 순서/맥락/다른 얘기로 미룸
- `vague_denial` — “그렇게 단정할 일은 아닙니다”, “그 표현은 맞지 않습니다”처럼 애매 부정

이 둘이 있어야 `hedge`가 `silence`에 과도하게 몰리지 않는다.

### 추가 필수 장치: admission floor
브리지에 의해 이미 인정된 사실이 있으면, stance와 defenseMode 하한을 같이 걸어야 한다.

```ts
type AdmissionFloor = 'none' | 'action_admitted' | 'rule_admitted' | 'motive_opened'
```

예:
- `action_admitted`면 `stance !== 'deny'`
- `action_admitted`면 `defenseMode !== 'flat_denial'`
- `rule_admitted`면 “약속 자체 없음” 류 문구 금지

```ts
if (admissionFloor === 'action_admitted') {
  if (stance === 'deny') stance = 'hedge'
  if (defenseMode === 'flat_denial') defenseMode = 'silence'
}
```

---

## 2. 재판관 질문 생성 방식

### 결론
**엔진 템플릿 + 선택적 LLM 표면화**의 하이브리드가 맞다.
하지만 의미 결정은 반드시 엔진이 해야 한다.

즉:
- 질문의 **의도, 구조, 핵심 슬롯**은 엔진이 결정
- LLM은 원하면 마지막 문장 다듬기만 수행
- 실패 시 템플릿 원문 그대로 사용 가능해야 함

### 권장 구조

```ts
interface JudgeQuestionSpec {
  disputeId: string
  subAction: 'fact_pursuit' | 'motive_search' | 'empathy_approach' | 'evidence_present'
  focus: 'act' | 'timeline' | 'motive' | 'emotion' | 'evidence'
  targetAtomIds: string[]
  mustRespectAdmissions: string[]
  templateKey: string
}
```

### 서브액션별 템플릿 규칙

#### fact_pursuit
- 무엇을 했는지 / 언제 / 누구에게 / 어떤 절차로 했는지
- 동기나 감정 질문 금지
- 예: “9월 20일 280만원 송금을 직접 진행한 사실 자체는 인정하십니까?”

#### motive_search
- 왜 숨겼는지 / 왜 미뤘는지 / 무엇을 막으려 했는지
- 행위 여부보다 **선택 이유** 중심
- 예: “그 송금을 먼저 말하지 못한 이유가 무엇이었습니까?”

#### empathy_approach
- 두려움 / 체면 / 부담 / 수치심 / 관계 손상 우려
- 판단보다 정서 접근
- 예: “그때 미리 말하면 어떤 시선이나 반응이 가장 두려우셨습니까?”

#### evidence_present
- 증거의 어느 부분을 어디까지 인정하는지
- 벡터 방어를 유도하기 좋음
- 예: “이 예약 확인서에 적힌 신청인과 대상자 정보까지는 인정하십니까?”

### 구현 원칙
- 재판관 질문은 LLM이 새 의미를 만들면 안 된다.
- `alreadyPubliclyAdmitted`가 있으면 그걸 부정하는 질문을 만들면 안 된다.
- 질문은 **한 턴 1핵심**만 다뤄야 한다.

---

## 3. 심문 하위 액션 재설계

### 결론
하위 액션은 **유지**하는 편이 맞다.
하지만 지금처럼 `stance`를 조금 부드럽게 만드는 수준이면 체감 차이가 거의 없다.

하위 액션은 앞으로 **응답 초점(answer focus)을 바꾸는 장치**여야 한다.

### 지금 필요한 구조 변화
현재 `publicClaim: string[]`만으로는 같은 claim을 세 액션이 돌려 쓰게 된다.
이 상태에선 액션 차이를 크게 만들 수 없다.

가장 좋은 해결은 `ClaimPolicy`를 아래처럼 atom/tag 구조로 확장하는 것이다.

```ts
interface ClaimAtom {
  id: string
  text: string
  tags: Array<'act' | 'timeline' | 'motive' | 'emotion' | 'rule' | 'counter' | 'evidence'>
}
```

확장이 부담되면 최소한 런타임용으로라도 아래 버킷을 따로 만들어야 한다.

```ts
interface ClaimFocusBuckets {
  fact: string[]
  motive: string[]
  empathy: string[]
  evidence: string[]
}
```

### 서브액션별 의미 정의

#### fact_pursuit
- 답변 초점: `act/timeline/rule`
- 사용 claim: 행위, 시간, 절차, 수치
- 부가 효과: 모순 검출에 유리
- 대표 tell: 정밀 숫자, 반복 확인

#### motive_search
- 답변 초점: `motive/justification`
- 사용 claim: 숨긴 이유, 우선순위, 자기합리화
- 부가 효과: `emotionalLeakRisk +1` 또는 `soften chance +1`
- 대표 tell: 변명형 맥락 늘리기, 책임 분산

#### empathy_approach
- 답변 초점: `emotion/fear/shame`
- 사용 claim: 체면, 두려움, 상처, 부담
- 부가 효과: `trustTowardJudge +10~15`, 단 trust 낮고 explosive면 역효과 가능
- 대표 tell: 한숨, 멈춤, 억울함/수치심 노출

#### evidence_present
- 답변 초점: `evidence-specific`
- 사용 claim: 해당 증거에 대한 인정/반박/맥락 공격
- 부가 효과: vector defense 우선 선택, collapse와 직접 연결
- 대표 tell: 증거 흔들기, 출처 공격, 맥락 공격

### Blueprint에 추가 권장 필드

```ts
type AnswerFocus = 'fact' | 'motive' | 'emotion' | 'evidence'
```

엔진 순서:
1. subAction → `answerFocus` 결정
2. `answerFocus`에 맞는 claim bucket만 열기
3. stance/defenseMode는 그 다음 보정

즉, **무엇에 답할지**를 먼저 정하고, **어떤 태도로 답할지**를 나중에 정해야 한다.

---

## 4. Phase 1 인정 사실의 Phase 3 연결 강화

### 결론
`alreadyPubliclyAdmitted`를 프롬프트에 넣는 것만으로는 부족하다.
이건 **엔진 강제 규칙**으로 올려야 한다.

### 필수 보강 1 — admission-aware forbidden claims
브리지에서 받은 인정 사실을 blueprint 단계에서 바로 금지 규칙으로 바꿔야 한다.

```ts
function deriveForbiddenFromAdmissions(admitted: string[]): string[] {
  // 예: "공동통장에서 280만원이 빠진 건 맞습니다"
  // => "그런 적 없습니다", "송금 안 했습니다", "돈은 안 나갔습니다" 류 금지
}
```

### 필수 보강 2 — stance floor
인정 강도에 따라 시작 가능한 최소 stance를 고정한다.

```ts
function deriveMinStance(admittedFacts: string[]): Stance {
  if (admitsActionAndBreach(admittedFacts)) return 'partial'
  if (admitsAction(admittedFacts)) return 'hedge'
  return 'deny'
}
```

그리고 최종 stance 계산 후:

```ts
stance = maxByDisclosure(stance, minStance)
```

#### spouse-01 예시
- 지석 d-1: “2,800,000원이 빠진 건 맞습니다” → 최소 `hedge`
- 지석 d-5: “100만원 넘는 지출을 미리 상의하지 못한 건 제 잘못” → 최소 `partial`
- 세린 d-2: “새벽에 폰을 본 잘못이 있습니다” → 최소 `partial`

### 필수 보강 3 — prompt가 아니라 post-check
LLM 출력 뒤에 한 번 더 검사해야 한다.

```ts
if (contradictsAlreadyAdmitted(response, alreadyPubliclyAdmitted)) {
  regenerateWithPenalty('You contradicted an already admitted fact. Keep the admission and only dispute motive/context.')
}
```

### 상태 의미 재정의
S1 의미를 더 분명히 잡아야 한다.

- `S0`: 행위 자체 부정 가능
- `S1`: 행위는 인정, 의미/용도/의도는 흐림
- `S2`: 일부 핵심 맥락 인정, 책임 범위 축소
- `S3`: 상대 책임/상황 탓 적극화
- `S4`: 정서적 인정 또는 실질 인정
- `S5`: 핵심 사실 시인

이 재정의가 없으면 브리지로 S1에 올려도 실제 발화는 계속 S0처럼 나간다.

---

## 5. 사건 개요 쟁점 노출 범위

### 결론
초기에는 **1개 명시 + 1개 암시**, 많아도 **2개까지만 노출**하는 것이 좋다.
나머지는 심문/증거/반격을 통해 발현시켜야 한다.

### 노출 원칙

#### 초기에 보여줄 것
- 플레이어가 이미 눈으로 확인한 직접 이상 징후
- 사건을 시작하게 만든 즉시 갈등 1~2개

#### 초기에 숨길 것
- 메타 쟁점 (`d-5` 같은 약속 위반 총합)
- 제3자 정체의 결론형 쟁점
- 상대의 반사 과실
- 원인보다 결과를 요약한 판정형 제목

### 라벨 3단계 구조 권장
내부 dispute name은 유지하고, UI 라벨만 계층화하면 된다.

```ts
interface DisputeBoardLabel {
  hiddenLabel: string
  initialLabel: string
  crackedLabel: string
  resolvedLabel: string
}
```

#### spouse-01 예시
- d-1
  - initial: `공동계좌 이상 송금`
  - cracked: `배우자 비공개 송금`
  - resolved: `간병 예약금이었지만 사전 상의는 없었음`

- d-3
  - hidden: `정체 미상의 제3자 접촉`
  - cracked: `외도 의심과 상담 일정이 충돌`
  - resolved: `외도 상대가 아니라 돌봄센터 상담팀장`

- d-5
  - hidden only at start
  - reveal trigger: d-1 또는 d-4 관련 증거가 둘 다 열린 뒤

### 추천 reveal 순서 (spouse-01)
1. 시작: d-1만 명시, d-2는 암시 또는 약하게 노출
2. e-3 또는 상호 비난 누적 후: d-3 발현
3. e-5/e-6 또는 역공 성공 후: d-4 발현
4. 양측 고액 지출이 둘 다 열린 뒤: d-5 발현

이렇게 해야 “심문을 통해 구조가 열린다”는 감각이 살아난다.

---

## 최종 권고 — 바로 고칠 것 4개

### 즉시 패치
1. `hedge -> flat_denial` 금지
2. `alreadyPubliclyAdmitted`가 있으면 `flat_denial` 금지
3. 재판관 질문은 엔진 템플릿 우선
4. Phase 0 쟁점 노출 2개 이하로 축소

### 다음 단계 구조 수정
1. `answerFocus` 추가
2. claim atom tagging 또는 focus buckets 추가
3. `AdmissionFloor` 도입
4. 가능하면 `DefenseMode`에 `deflection` / `vague_denial` 추가

# Case Authoring Spec v1

## 목적
- 사람이 사건을 설계할 때 사용하는 원본 규격이다.
- `재미`, `양측 공방`, `증거 해석`, `재판관 성향 분화`를 먼저 설계하고, 이후 `RuntimeCaseData`로 컴파일한다.
- 이 문서는 엔진 직결 스키마가 아니라 저자용 스키마다.

## 핵심 원칙
- 사건은 `표면 스캔들`과 `판결 회색지대`를 동시에 가져야 한다.
- 양측 모두 `정당한 주장 1개`와 `숨기는 사실 1개`를 가져야 한다.
- 증거는 `진짜인데 해석이 갈리는 것`이 최소 2개 이상 있어야 한다.
- 최종 판단은 `누가 더 나쁜가`보다 `무엇을 더 무겁게 볼 것인가`로 귀결되어야 한다.
- 각 사건은 최소 한 번 이상 `첫 인상 뒤집기`가 있어야 한다.

## 권장 기본 볼륨
- 쟁점: 4개 권장, 허용 3~5개
- 코어 증거: 6개 고정
- 증인/제3자: 3명 권장, 허용 2~4명
- 솔루션 축: 3개 이상

## AuthoringSpec
```ts
interface CaseAuthoringSpec {
  caseId: string                    // canonical: "spouse-01"
  legacyCaseId?: string             // optional: "case-spouse-01"
  title: string
  category: string                  // spouse | family | friend | neighbor | partnership | tenant | workplace
  summary: string                   // 1~2문장
  headlineHook: string              // 첫 10초를 잡는 표면 스캔들
  sensitivityTags?: string[]        // stalking, drug_allegation, privacy, family_finance 등

  meta: AuthoringMeta
  duo: DuoAuthoring
  context: ContextAuthoring
  disputes: DisputeAuthoring[]
  evidence: EvidenceAuthoring[]
  witnessPool: WitnessAuthoring[]
  dilemmaAxes: DilemmaAxis[]
  solutions: Record<string, string[]>
}
```

## Meta
```ts
interface AuthoringMeta {
  relationshipType: string
  difficulty: 'easy' | 'medium' | 'hard'
  conflictSeed: string
  twistModule?: string | null
  emotionalBait: string
  anchorTruth: string
  resolutionDilemma: string
}
```

## Duo
```ts
interface DuoAuthoring {
  partyA: PartyAuthoring
  partyB: PartyAuthoring
  relationshipLedger: LedgerAuthoring[]
}
```

### PartyAuthoring
```ts
interface PartyAuthoring {
  id: 'a' | 'b'
  name: string
  age: number
  occupation: string
  incomeBracket: 'low' | 'mid' | 'high'

  archetype: 'avoidant' | 'confrontational' | 'victim_cosplay' | 'cold_logic' | 'affect_flattening' | 'premature_summary'
  publicMask?: 'reasonable' | 'victim' | 'professional' | 'aggrieved' | 'calm' | 'chaotic' // FUTURE: authoring-only 필드, 현재 런타임 미구현
  pressureResponse?: 'withdraw' | 'attack' | 'self_justify' | 'perform_victimhood' | 'over_explain' // FUTURE: authoring-only 필드, 현재 런타임 미구현
  reputationAxis?: 'family' | 'career' | 'public_image' | 'money' | 'morality' | 'privacy' // FUTURE: authoring-only 필드, 현재 런타임 미구현

  speechStyle: string
  pride: number
  fear: string
  riskAppetite: number
  digitalHabit: string              // authoring 입력값. 신규 작성은 canonical 3종 사용 권장, legacy 별칭은 compiler 정규화 전제
  dailyRoutine: string
  sensitivePoints: string[]

  verbalTells: Array<{
    type: string
    trigger: 'lying' | 'cornered' | 'emotional' | 'avoiding' | 'shame' | 'hurt' | 'defensive'
    pattern: string
  }>

  callTerms?: {
    toPartner: string
    toJudge: string
    angry: string
  }
}
```

## PartyAuthoring 메모
- `publicMask`, `pressureResponse`, `reputationAxis`는 현재 코드에 없는 `authoring-only / FUTURE` 필드다.
- 이 3개는 사건 설계와 프롬프트 주입 품질을 높이기 위해 유지하되, 런타임 반영 전에는 compiler에서 제거하거나 별도 주입 레이어로 내려야 한다.
- `digitalHabit`는 현재 런타임 타입(`CharacterProfile.digitalHabit`) 기준으로는 아래 3종 canonical 값을 가진다.
  - `sns_active`
  - `messenger_main`
  - `minimal`
- 현재 레거시 사건 JSON에는 `banking_app_heavy`, `shared_calendar_main`, `slack_power_user` 같은 더 풍부한 raw 문자열이 이미 존재한다.
- 이 raw 문자열들은 런타임에서 직접 쓰이는 enum이 아니라, [caseLoader.ts](/d:/ProjectWS/src/data/cases/caseLoader.ts)의 `normalizeDigitalHabit()`가 canonical 3종으로 정규화한다.
- 따라서 **신규 authoring 기본 원칙**은 아래와 같다.
  - 가능하면 canonical 3종 중 하나를 직접 쓴다.
  - 더 구체적인 authoring 라벨이 꼭 필요하면, compiler / loader에 정규화 규칙이 먼저 있어야 한다.
  - 정규화 규칙이 없는 임의 문자열은 넣지 않는다.
- `callTerms`는 런타임에서 optional이므로 authoring에서도 optional로 둔다. 다만 scripted text 품질을 위해 실제 작성 시에는 채우는 것을 강하게 권장한다.

## Context
```ts
interface ContextAuthoring {
  contextType: string
  description: string
  emotionalPressure: number
  affects: 'a' | 'b' | 'both'
  triggerAmplifier: string
}
```

## Dispute
```ts
interface DisputeAuthoring {
  id: string
  name: string
  claimA: string                    // A가 지금 법정에서 밀고 싶은 버전
  claimB: string                    // B가 지금 법정에서 밀고 싶은 버전
  publicSummary?: string            // UI/phase 요약용

  truthDescription: string
  hiddenUntil?: 'phase3' | 'evidence' | 'witness' | 'never_explicit'

  quadrant: 'both_know' | 'a_only' | 'b_only' | 'neither_knows' | 'shared_misconception'
  ambiguity: 'none' | 'low' | 'high'
  weight: 'high' | 'medium' | 'low'

  legitimacyIssue: boolean
  relatedEvidenceIds: string[]
  mediationLink: string

  correctResponsibility: { a: number; b: number }

  aSide: {
    justifiedPoint: string
    hiddenPoint: string
  }
  bSide: {
    justifiedPoint: string
    hiddenPoint: string
  }
}
```

## Evidence
```ts
interface EvidenceAuthoring {
  id: string
  name: string
  surfaceName?: string
  description: string
  surfaceDescription?: string

  type: 'bank' | 'chat' | 'cctv' | 'contract' | 'testimony' | 'log' | 'device' | 'sns'
  viewerType?: 'bank' | 'chat' | 'cctv' | 'contract' | 'testimony' | 'log' | 'device' | 'sns'

  reliability: 'hard' | 'soft'
  completeness: 'original' | 'edited' | 'partial' | 'context_missing'
  provenance: 'self_possessed' | 'third_party' | 'anonymous' | 'institutional'
  legitimacy: 'lawful' | 'privacy_concern' | 'unlawful'

  proves: string[]
  isTrap: boolean
  requires: string[]
  requiredLieState?: 'S0' | 'S1' | 'S2' | 'S3' | 'S4'
  subjectParty?: 'a' | 'b' | 'both'

  isBaseEvidence?: boolean          // 기본 3장 후보
  viewerDraft?: unknown             // PC viewerData 초안
  metaDraft?: {
    trustLevel: 'high' | 'mid' | 'low'
    source: 'a' | 'b' | 'org' | 'third'
    legality: 'ok' | 'sus' | 'unlawful'
    stage: 1 | 2 | 3
  }
}
```

## Witness Pool
```ts
interface WitnessAuthoring {
  id: string
  slot: string
  name: string
  relationTo: 'a' | 'b' | 'both'
  knowledgeScope: string
  surfaceKnowledge?: string
  witnessedDirectly: boolean
  bias: string
  distortionRisk: string
  relatedDisputeIds?: string[]
  hiddenAgenda?: string
}
```

## DilemmaAxes
```ts
interface DilemmaAxis {
  id: string
  left: string                      // 절차 우선
  right: string                     // 실체 우선
  affectedDisputeIds: string[]
}
```

## 반드시 채워야 하는 재미 필드
- `headlineHook`
- `claimA`, `claimB`
- 양측 `justifiedPoint`, `hiddenPoint`
- `surfaceName`, `surfaceDescription`
- `hiddenAgenda` 또는 `distortionRisk`
- `dilemmaAxes`

## 품질 체크리스트
- 양측 모두 순수 피해자/순수 가해자처럼 보이지 않는가
- 첫 1분 안에 오해할 만한 강한 표면 사건이 있는가
- 뒤집히는 증거가 최소 2개 이상 있는가
- 증거 6개가 각기 다른 역할을 맡는가
- 제3자 증언이 단순 정답 제공자가 아닌가
- 해결안이 `처벌/보호/봉합` 중 어디를 중시할지 갈라지는가

## 작성 금지
- 한쪽만 전부 거짓이고 다른 한쪽은 거의 무결한 구조
- 증거 1개로 사건이 즉시 끝나는 구조
- 사회 이슈만 강하고 판결 가치 충돌이 없는 구조
- 실제 특정 사건을 거의 그대로 옮긴 구조

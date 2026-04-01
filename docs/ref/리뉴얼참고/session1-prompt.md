# Session 1: spouse-01 — ClaimPolicy + RuntimeStartBridge + EvidenceChallenge

## 배경

Phase A(엔진 구조 전환)가 완료되었습니다. 아래가 구현됐습니다:

1. **blueprintEngine.ts** — 당신이 설계한 매트릭스(의견 2)를 그대로 TypeScript로 구현. baseStance → 예외처리 → 질문유형 보정 → 감정 보정 → 공격전가 강제 → defenseMode 결정 순서의 파이프라인.
2. **readinessEngine.ts** — 당신이 설계한 성과 조건(의견 1)을 구현. readinessScore 산식, verdictEligible, 조기종료 예외, forced_incomplete 모두 포함.
3. **bridgeEngine.ts** — Phase 1→3 브리지 적용. `applyBridge(caseId, party, lieStateMap)` 함수가 Phase 3 진입 시 호출됨.
4. **blueprintPromptBuilder.ts** — blueprint 기반 경량 프롬프트. LLM에게 "의미를 결정하지 말고 연기만 하라" 지시.
5. **claimPolicyLoader.ts / executableTellLoader.ts** — 데이터 로더. `registerClaimPolicies(caseId, data)` 로 등록하면 활성화.

**현재 상태**: 엔진은 준비됐지만 데이터가 없습니다. ClaimPolicy가 등록되지 않은 사건은 기존 경로(truthPolicy 기반)로 자동 폴백됩니다.

## 이번 Session에서 생성해야 할 것

### 1. ClaimPolicy (60개 항목)

spouse-01의 2명(한지석/오세린) × 쟁점 × 6상태(S0~S5)

**스키마** (renewal-schemas.ts에서 발췌):
```ts
interface ClaimPolicy {
  disputeId: string
  state: 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5'
  publicClaim: string[]        // 지금 법정에서 주장하는 것 (한국어 자연문)
  privateKnowledge: string[]   // 실제로 알고 있는 진실 (LLM에게 항상 제공)
  suppressions: string[]       // 이 상태에서 절대 꺼내지 않을 사실
  emotionalLeakRisk: 'none' | 'low' | 'mid' | 'high'
  tellPool: string[]           // 발현 가능한 verbalTell ID
}
```

**규칙**:
- publicClaim: 이 상태에서 NPC가 법정에서 공개적으로 말할 수 있는 주장. 2~3개 자연문.
- privateKnowledge: NPC가 실제로 알고 있는 진실. "알면서 숨기는 연기"의 재료. S0에서도 반드시 제공.
- suppressions: 이 상태에서 절대 꺼내지 않는 사실. forbiddenClaimAtoms + bannedLexemes의 원천.
- emotionalLeakRisk: 감정적 실수로 누설될 위험도. S0~S1은 보통 none~low, S3~S4는 mid~high.
- tellPool: 한지석의 tell ID는 `over_precision`, `counter_question`, `timeline_padding`. 오세린의 tell ID는 `evidence_waving`, `motive_jump`, `selective_quote`.

**쟁점 분배**:
- 한지석(a): d-1(280만원 송금), d-3(제3자 정체), d-5(100만원 상의 약속)
- 오세린(b): d-2(새벽 휴대폰 열람), d-4(150만원 별도 계좌), d-5(100만원 상의 약속)

### 2. RuntimeStartBridge (10개 항목)

Phase 1 스크립트(첨부 session1-spouse-01-phase1.json)를 분석하여, Phase 3 시작 시 각 쟁점의 lieState를 결정해주세요.

**스키마**:
```ts
interface RuntimeStartBridge {
  caseId: string
  disputeId: string
  phase3StartState: 'S0' | 'S1' | 'S2' | 'S3'
  alreadyPubliclyAdmitted: string[]  // Phase 1에서 이미 인정한 사실
  playerKnownHooks: string[]         // 플레이어가 이미 알게 된 정보
  carryOverTellBias?: string[]       // Phase 1에서 드러난 tell 편향
}
```

**분석 기준**: Phase 1 스크립트에서:
- 한지석이 "2,800,000원이 빠진 건 맞습니다"라고 인정 → d-1은 S0이 아닌 S1~S2로 시작해야
- 한지석이 "100만원 넘는 지출을 미리 상의하지 못한 건 제 잘못"이라고 인정 → d-5도 S0이 아님
- 오세린이 "새벽에 폰을 본 잘못이 있습니다"라고 인정 → d-2도 S0이 아님
- 양측이 d-4(150만원)에 대해 언급 → 시작 상태 판단 필요

### 3. EvidenceChallenge (증거 수만큼)

spouse-01의 각 증거에 대해 attackVectors, resolvedBy, whenAllResolved를 매핑해주세요.

**스키마**:
```ts
interface EvidenceChallenge {
  evidenceId: string
  disputeIds: string[]
  attackVectors: Array<'authenticity' | 'context' | 'legality' | 'identity'>
  resolvedBy: Partial<Record<InvestigationAction, AttackVector[]>>
  whenAllResolved: {
    forceDefenseMode?: 'concession' | 'silence'
    minLieAdvance?: 1 | 2
  }
  blockedClaims?: string[]  // 봉쇄되는 NPC 주장
}
```

**InvestigationAction 종류**: `request_original`, `restore_context`, `verify_source`, `question_acquisition`, `check_edits`, `check_metadata`

**매핑 기준**: 각 증거의 `type`, `reliability`, `completeness`, `provenance`, `legitimacy`와 `investigationResults`를 분석하여:
- 어떤 방어 벡터로 공격 가능한지 (authenticity/context/legality/identity)
- 어떤 조사 액션이 어떤 벡터를 봉쇄하는지
- 모든 벡터 봉쇄 시 어떤 효과가 발생하는지

## 첨부 파일

1. **session1-spouse-01-case.json** — 사건 전체 데이터 (캐릭터, 쟁점, 증거, truthTable, lieConfig)
2. **session1-spouse-01-phase1.json** — Phase 1 스크립트 (양측 초기 주장)
3. **renewal-schemas.ts** — 전체 타입 정의 (이전에 공유한 것과 동일)

기존 truthPolicy(spouse-01 부분)는 참고용입니다 — ClaimPolicy가 이를 대체하므로, 기존 allowed/forbidden ID 매핑의 의도를 살리되 publicClaim/privateKnowledge/suppressions 구조로 확장해주세요.

## 출력 형식

JSON 파일 하나로 통합해주세요:

```json
{
  "caseId": "spouse-01",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": { "disputeId": "d-1", "state": "S0", "publicClaim": [...], "privateKnowledge": [...], "suppressions": [...], "emotionalLeakRisk": "...", "tellPool": [...] },
        "S1": { ... },
        ...
      },
      ...
    },
    "b": { ... }
  },
  "bridges": [
    { "party": "a", "entries": [ { "caseId": "spouse-01", "disputeId": "d-1", "phase3StartState": "...", ... }, ... ] },
    { "party": "b", "entries": [ ... ] }
  ],
  "evidenceChallenges": [
    { "evidenceId": "e-1", ... },
    ...
  ]
}
```

작업량이 많습니다. 하나하나 꼼꼼하게 작성해주세요. 특히 publicClaim과 privateKnowledge의 한국어 자연문이 캐릭터 목소리와 일치해야 합니다.

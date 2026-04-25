# ContradictionEventV2 + ConflictEventV2 — 타입 정의

> 추가 위치: `src/types/renewal.ts` (기존 V1 옆에 신규 export, V1은 `@deprecated` JSDoc만 추가하여 보존)

```ts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12.1 ContradictionEventV2 — 같은 캐릭터의 진술 변화만이 모순
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type SpoilerLevel = 'safe' | 'partial' | 'full'
// safe   = S0~S2 (모호 신호, truth 키워드 0)
// partial= S3~S4 (부분 인정, truth 키워드 일부 허용)
// full   = S5    (자백 본문, truth 키워드 전체 허용)

export interface ContradictionEventV2 {
  id: string                       // ex. 'spouse-01-d1-a-S2-c1'
  caseId: string
  disputeId: string
  defenderParty: PartyId           // 추궁받는 자 = 모순 발생 캐릭터
  defenderLieState: LieState       // 이 데이터가 적용 가능한 상태
  spoilerLevel: SpoilerLevel       // 노출 안전성 등급
  previousStatement: string        // 같은 캐릭터의 이전 발화 요약 (30~60자)
  currentStatement: string         // 현재 발화의 변화 신호 (30~60자, truth X at safe)
  judgePursuitLine: string         // 재판관 추궁 (30~60자, ${name} 호명 가능)
  defenderReactionLine: string     // NPC 방어 발화 (40~80자, lieState 일치)
  options: {
    point_out: { label: string; effect: string }
    let_go:    { label: string; effect: string }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12.2 ConflictEventV2 — 양측 주장 충돌 (의견 충돌, 극단 한정)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ConflictEventV2 {
  id: string
  caseId: string
  disputeId: string
  partyA: { name: string; statement: string }   // 양측 입장 명확
  partyB: { name: string; statement: string }
  triggerCondition: 'extreme_only'              // 누설미터>=80 OR 감정차>=30 OR critical 모순 후속
  judgeMediationLine: string                    // 재판관 중재 (50~90자)
  effect: {
    emotionDelta?: { a?: number; b?: number }   // 권장 -8 ~ -15
    trustDelta?:   { a?: number; b?: number }   // trustTowardJudge
  }
  options: {
    mediate:  { label: string; effect: string } // 양측 진정시키기
    escalate: { label: string; effect: string } // 충돌 그대로 진행
  }
}

export interface GameEventTextsV2 {
  contradictions: ContradictionEventV2[]   // ~24/사건 (4 dispute × 2 party × 3 spoilerLevel)
  conflicts:      ConflictEventV2[]        // 6~8/사건
  interjections:  InterjectionEvent[]      // 기존 유지
  emotionalOutbursts: EmotionalOutburstEvent[] // 기존 유지
}
```

## spoilerLevel ↔ LieState 적용 규칙

| spoilerLevel | 적용 LieState | 노출 허용 truth 키워드 | 모달 표시 정책 |
|---|---|---|---|
| `safe` | S0, S1, S2 | 0 (truth keyword 미포함 강제) | `previousStatement` + `currentStatement` 양쪽 노출 OK |
| `partial` | S3, S4 | 부분 (요약형, 직접 인용 X) | 전체 노출 OK |
| `full` | S5 | 전체 (자백 본문) | 전체 노출 + truth 강조 |

엔진 매칭: `gameEventTriggerEngine.checkContradiction`이 `defenderParty.lieStateMap[disputeId].currentState`로 적합한 spoilerLevel만 후보 풀에 두고 그 중 token 수 기반 선택.

## Backward Compatibility (V1 → V2)

- V1 `statementA`(원고측 주장) + `statementB`(피고측 주장) = 사실상 ConflictEventV2의 두 statement에 해당 → V1 데이터를 ConflictEventV2로 자동 변환하는 어댑터를 `v3GameLoopLoader.ts`에 추가
- V1의 `npcReaction`은 ContradictionEventV2.`defenderReactionLine`으로는 못 쓰는 경우가 다수 → 안전한 기본값 `buildContradictionFallbackLine(lie)` 그대로 폴백

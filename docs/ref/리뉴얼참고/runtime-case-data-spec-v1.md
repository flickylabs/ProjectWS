# Runtime Case Data Spec v1

## 목적
- 이 문서는 엔진과 UI가 실제로 소비하는 런타임 규격이다.
- 현재 기준 타입은 [src/types/case.ts](/d:/ProjectWS/src/types/case.ts), [src/types/character.ts](/d:/ProjectWS/src/types/character.ts)를 따른다.
- `CaseAuthoringSpec`를 이 구조로 컴파일하는 것을 전제로 한다.

## 현재 기준
- `duo.partyA / duo.partyB` 구조 유지
- `verbalTells[]` 유지
- 증인은 별도 `witnesses[]`가 아니라 `socialGraph` 중심
- `ScriptedText`는 런타임 케이스와 분리
- `duo.duoId`, `duo.relationshipType`는 이미 런타임 필수 필드다
- `evidence.investigationResults`, `evidence.investigationStages`, `evidence.partyContext`는 이미 런타임에 존재한다
- `dossierCards`는 `CaseData`가 아니라 [src/types/renewal.ts](/d:/ProjectWS/src/types/renewal.ts)의 `V3GameLoopData` 쪽에 있다

## 권장 canonical caseId
- 권장 canonical: `spouse-01`
- 호환용 legacy: `case-spouse-01`
- 마이그레이션 완료 전에는 둘 다 허용하되, 신규 작성은 canonical 기준으로 맞춘다

## RuntimeCaseData — 현재 코드 기준
```ts
interface RuntimeCaseData {
  caseId: string

  meta?: CaseMeta
  duo: DuoSeed
  context: ContextSeed
  disputes: Dispute[]
  evidence: RuntimeEvidenceNode[]
  evidenceCombinations: EvidenceCombination[]
  truthTable: TruthItem[]
  lieConfigA: LieConfig[]
  lieConfigB: LieConfig[]
  solutions: Record<string, string[]>
  activeLedgerEntries: string[]
  activeThirdParties: string[]
}
```

## DuoSeed — 현재 코드 기준
```ts
interface DuoSeed {
  duoId: string
  relationshipType: RelationshipType
  partyA: CharacterProfile
  partyB: CharacterProfile
  relationshipLedger: LedgerEntry[]
  socialGraph: ThirdParty[]
}
```

## RuntimeEvidenceNode — 현재 코드 기준
```ts
interface RuntimeEvidenceNode extends EvidenceNode {
  viewerData?: EvidenceViewerData
  meta?: {
    trustLevel: 'high' | 'mid' | 'low'
    source: 'a' | 'b' | 'org' | 'third'
    legality: 'ok' | 'sus' | 'unlawful'
    stage: 1 | 2 | 3
    highlights?: string[]
    sourceNote?: string
  }
}
```

## EvidenceNode — 현재 코드 기준에서 중요하게 봐야 할 필드
```ts
interface EvidenceNode {
  id: string
  name: string
  description: string
  surfaceName?: string
  surfaceDescription?: string
  type: EvidenceType
  reliability: Reliability
  completeness: Completeness
  provenance: Provenance
  legitimacy: Legitimacy
  proves: string[]
  isTrap: boolean
  requires: string[]
  requiredLieState?: 'S0' | 'S1' | 'S2' | 'S3' | 'S4'
  subjectParty?: 'a' | 'b' | 'both'
  investigationResults: Record<string, string>
  investigationStages?: {
    stage: number
    revealKey: string
    question: {
      text: string
      attackVector: string
    }
    scriptedNpcResponses?: {
      a?: { npcResponse: string; behaviorHint: string; truthLevel: TruthLevel }
      b?: { npcResponse: string; behaviorHint: string; truthLevel: TruthLevel }
    }
  }[]
  partyContext?: {
    a?: {
      questionAngle: string
      implication: string
    }
    b?: {
      questionAngle: string
      implication: string
    }
  }
}
```

## 제안 확장 — CT 구현 예정
```ts
interface RuntimeCaseDataPlannedExtension {
  legacyCaseId?: string
  baseEvidenceIds?: [string, string, string]
  monetaryDisputeIds?: string[]
}
```

- `legacyCaseId`: 아직 `CaseData` 타입에는 없다. `caseId` 정규화 마이그레이션용 제안 필드다.
- `baseEvidenceIds`: 아직 `CaseData` 타입에는 없다. 현재 UI는 `처음 해금된 3개` fallback을 사용한다.
- `monetaryDisputeIds`: 아직 `CaseData` 타입에는 없다. 현재는 prompt builder / validator가 동적 판별한다.
- 위 3개는 **문서상 제안 확장**이며, CT가 코드 측 구현을 진행하기 전까지는 실제 런타임 필드로 간주하면 안 된다.

## 왜 `hasMonetaryDispute` 대신 `monetaryDisputeIds`인가
- 케이스 전체가 금전 사건인지 아닌지보다, 특정 쟁점이 금전 쟁점인지가 중요하다.
- 현재 스크립트 검증도 쟁점 단위로 금전 표현을 보는 편이 더 정확하다.
- 권장:
```ts
monetaryDisputeIds: ['d-1', 'd-4']
```

## baseEvidenceIds 규칙
- 길이 3 고정
- 선택 기준
- 1장: 표면 사건을 여는 증거
- 1장: 기관/중립 타임라인 증거
- 1장: 뒤집기의 씨앗
- 함정 증거는 최대 1장

## EvidenceViewerData 권장 구조
```ts
type EvidenceViewerData =
  | { type: 'bank'; rows: BankRow[]; warnings?: string[] }
  | { type: 'chat'; header?: string; messages: ChatMessage[]; warnings?: string[] }
  | { type: 'cctv'; events: CCTVEvent[]; warnings?: string[] }
  | { type: 'contract'; title?: string; rows: ContractRow[]; signature?: string; warnings?: string[] }
  | { type: 'testimony'; witness: string; role: string; statement: string; confidence: 'high'|'mid'|'low'; bias: 'a'|'neutral'|'b'; directWitness: boolean }
  | { type: 'log'; rows: LogRow[]; note?: string; warnings?: string[] }
  | { type: 'device'; ownerName?: string; sections: DeviceSection[]; warnings?: string[] }
  | { type: 'sns'; post: SNSPost; warnings: string[] }
```

## 자동 생성 가능한 것
- `baseEvidenceIds`
- `meta.trustLevel`
- `meta.source`
- `meta.legality`
- `meta.stage`
- `viewerData`의 skeleton

## 수동 보정이 필요한 것
- `surfaceName`, `surfaceDescription`
- `viewerData`의 실제 텍스트 행
- `warnings`, `highlights`
- `sourceNote`

## 호환성 메모
- 현재 [EvidencePresenter.tsx](/d:/ProjectWS/src/components/actions/EvidencePresenter.tsx)와 [PCLeftPanel.tsx](/d:/ProjectWS/src/components/pc/panels/PCLeftPanel.tsx)는 `baseEvidenceIds`가 없으면 `처음 해금된 3개`를 fallback으로 사용한다.
- 이 fallback은 임시용이다. `baseEvidenceIds`가 타입에 추가되면 신규 사건부터 실제 데이터에 넣는 것을 원칙으로 한다.
- `caseHelpers.ts` 기준 `relationshipType`은 `meta.relationshipType -> duo.relationshipType -> ''` 순으로 폴백된다.
- `caseLoader.ts` 기준 `duo.duoId`가 없으면 `duo-${caseId}`로 보정되고, `digitalHabit`은 런타임 허용값으로 정규화된다.

## 컴파일 파이프라인
1. `CaseAuthoringSpec` 입력
2. `CaseData compiler` 실행
3. `lieConfigA/B`, `truthTable`, `activeLedgerEntries`, `activeThirdParties` 생성
4. `baseEvidenceIds`, `meta`, `viewerData skeleton`, `monetaryDisputeIds` 생성
5. `generated/{caseId}.json` 저장
6. `claimPolicies / structure-v2 / beats-v2` 생성
7. validator 실행

## 런타임에 남겨야 하는 필드
- `surfaceName`, `surfaceDescription`
- `surfaceKnowledge`
- `hiddenAgenda`
- `requiredLieState`
- `scriptedTestimonies`
- `scriptedNpcResponses`

이 필드들은 단순 authoring 보조가 아니라 실제 UI/엔진에서 이미 활용 중이다.

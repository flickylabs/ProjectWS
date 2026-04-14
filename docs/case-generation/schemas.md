# 데이터 스키마 레퍼런스

> spouse-01 기준 추출. 필드 타입 + 필수 여부 + 설명.

---

## 1. 케이스 JSON

경로: `src/data/cases/generated/{caseId}.json`

### 최상위

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `caseId` | string | ✓ | `"case-{caseId}"` 형식 |
| `sensitivityTags` | string[] | ✓ | 민감도 태그 (minor_privacy, family_debt 등) |
| `meta` | object | ✓ | 사건 메타데이터 |
| `duo` | object | ✓ | 양 당사자 + 관계 정보 |
| `context` | object | ✓ | 사건 배경 + 감정 압력 |
| `disputes` | object[] | ✓ | 쟁점 목록 (3~5개) |
| `evidence` | object[] | ✓ | 증거 목록 (5~7개) |
| `truthTable` | object[] | ✓ | 진실 항목 목록 |
| `lieConfigA` | object[] | ✓ | A의 거짓말 전이 설정 |
| `lieConfigB` | object[] | ✓ | B의 거짓말 전이 설정 |
| `solutions` | object | ✓ | 해결안 옵션 |
| `activeLedgerEntries` | string[] | ✓ | 활성 관계 이력 항목 ID |
| `activeThirdParties` | string[] | ✓ | 활성 제3자 ID |
| `baseEvidenceIds` | string[] | ✓ | 초기 공개 증거 ID |
| `monetaryDisputeIds` | string[] | ✓ | 금전 관련 쟁점 ID |
| `combinationLab` | object | ✓ | 증거 조합 그래프 |
| `v3Design` | object | ✓ | V3 설계 메타 (hiddenDisputes, leadLines 등) |
| `evidenceCombinations` | object[] | ✓ | 증거 조합 규칙 |

### meta

| 필드 | 타입 | 설명 |
|------|------|------|
| `relationshipType` | string | 관계 유형 (spouse/family/friend 등) |
| `conflictSeed` | string | 사건 씨앗 코드 |
| `variableModules` | string[] | 가변 모듈 ID |
| `twistModule` | string | 반전 모듈 ID |
| `difficulty` | string | 난이도 (easy/mid/hard) |
| `anchorTruth` | string | 실제 진실 요약 (내부용, 플레이어 미노출) |
| `emotionalBait` | string | 초반 오해 유발 감정 미끼 |
| `resolutionDilemma` | string | 판결 딜레마 서술 |
| `title` | string | 사건 제목 |

### duo.partyA / duo.partyB

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | `"a"` 또는 `"b"` |
| `name` | string | 실명 (한국어) |
| `age` | number | 나이 |
| `occupation` | string | 직업 |
| `incomeBracket` | string | 소득 수준 |
| `archetype` | string | avoidant / confrontational / victim_cosplay / cold_logic / affect_flattening / premature_summary |
| `speechStyle` | string | 발화 스타일 설명 |
| `pride` | number | 자존심 (1~10) |
| `fear` | string | 핵심 공포 |
| `riskAppetite` | number | 위험 감수 (1~10) |
| `digitalHabit` | string | 디지털 사용 패턴 |
| `dailyRoutine` | string | 일상 패턴 |
| `sensitivePoints` | string[] | 민감 쟁점 |
| `verbalTells` | object[] | `{ type, trigger, pattern }` |
| `callTerms` | object | `{ toPartner, toJudge, angry }` |
| `pcFaceType` | string | UI 얼굴 타입 (woman/man) |

### duo.relationshipLedger 항목

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 항목 ID |
| `category` | string | distorted / silenced / confirmed |
| `description` | string | 관계 이력 서술 |
| `isReal` | boolean | 실제 발생 여부 |
| `whoRemembersAccurately` | string | 정확히 기억하는 주체 |
| `whoDistorts` | string | 왜곡 주체 |
| `distortionDirection` | string | 왜곡 방향 |
| `currentlyResolved` | string | surface_only / unresolved |
| `emotionalResidue` | string | 감정 잔재 강도 |
| `connectionToCurrent` | string | 현재 사건 연관성 |

### duo.socialGraph 항목 (증인)

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 증인 ID (w-N) |
| `slot` | string | 역할 슬롯명 |
| `name` | string | 증인 이름 |
| `relationTo` | string | neutral / a / b |
| `knowledgeScope` | string | 알고 있는 내용 |
| `witnessedDirectly` | boolean | 직접 목격 여부 |
| `bias` | string | 편향 방향 |
| `relatedDisputeIds` | string[] | 관련 쟁점 ID |
| `witnessProfile` | object | age, occupation, relationToA/B, sentimentToA/B, speechStyle, addressJudge/A/B, hiddenAgenda |

### disputes 항목

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | ✓ | d-N 또는 h-dN |
| `name` | string | ✓ | 쟁점 이름 (20자 이내 권장) |
| `truth` | boolean | ✓ | 진실 여부 |
| `truthDescription` | string | ✓ | 실제 진실 설명 |
| `quadrant` | string | ✓ | both / a_only / b_only / shared_misconception |
| `requiredEvidence` | string[] | ✓ | 필요 증거 ID |
| `correctResponsibility` | `{a:N, b:N}` | ✓ | 합계 100 |
| `ambiguity` | string | ✓ | none / low / mid / high |
| `weight` | string | ✓ | high / mid / low |
| `mediationLink` | string | ✓ | 조정 연결 키워드 |
| `legitimacyIssue` | boolean | ✓ | 법적 정당성 이슈 |
| `judgmentStatement` | string | ✓ | 판결 요약 1문장 |
| `hidden` | boolean | ✓ | 초기 숨김 |
| `v3Visibility` | string | ✓ | initial / hidden |
| `unlockCondition` | object | 선택 | `{ requireDispute: {id, minState, party?} }` 또는 배열 |
| `v3UnlockPlan` | object | 선택 | `{ runtimeRule, authoredRule }` |
| `verdictOptions` | object | ✓ | `{ wrong, partial, truth, defer }` 각 string |

### evidence 항목

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | e-N |
| `name` | string | 증거 이름 |
| `surfaceName` | string | 화면 표시용 |
| `description` | string | 상세 설명 |
| `surfaceDescription` | string | 초기 표시 설명 |
| `type` | string | log / device / chat / bank / contract / testimony / cctv / sns |
| `reliability` | string | hard / medium / soft |
| `completeness` | string | 완전성 |
| `provenance` | string | institutional / personal |
| `legitimacy` | string | lawful |
| `proves` | string[] | 입증 쟁점 ID |
| `isTrap` | boolean | 함정 여부 |
| `requires` | string[] | 선행 증거 ID |
| `investigationResults` | object | revealKey → 텍스트 맵 |
| `subjectParty` | string | a / b |
| `investigationStages` | object[] | 아래 참조 |
| `partyContext` | object | `{ a: {questionAngle, implication}, b: {...} }` |

### evidence.investigationStages 항목

| 필드 | 타입 | 설명 |
|------|------|------|
| `stage` | number | 0부터 시작 |
| `revealKey` | string | investigationResults 키 매핑 |
| `question` | `{text, attackVector}` | 조사 질문 |
| `label` | string | 단계 레이블 |
| `unlockHint` | string\|null | 잠금해제 힌트 (첫 단계는 null) |

---

## 2. ScriptedText

경로: `src/data/scriptedText/{caseId}.json`

### 최상위

| 필드 | 타입 | 설명 |
|------|------|------|
| `schemaVersion` | number | 1 |
| `caseId` | string | 사건 ID (case- 접두어 없음) |
| `generatedAt` | string | ISO 8601 |
| `notes` | string[] | 생성 메모 |
| `coverage` | object | 채널별 커버리지 메타 |
| `channels` | object | 채널별 entries/paths |

### 공통 variant 구조

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | 변형 고유 ID |
| `text` | string | 발화 텍스트 |
| `behaviorHint` | string | 행동 힌트 (aftermath/system_message 제외) |
| `tags` | string[] | 메타 태그 |
| `sourceRefs` | string[] | 참조 ID |

> 채널별 상세 → [scripted-text-channels.md](scripted-text-channels.md)

---

## 3. Phase 1 대화

경로: `src/data/dialogues/phase1/{caseId}.json`

### 최상위

| 필드 | 타입 | 설명 |
|------|------|------|
| `caseId` | string | `"case-{caseId}"` 형식 주의 |
| `dialogues` | object[] | 대화 항목 |

### dialogues 항목

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `speaker` | string | ✓ | system / a / b / choice |
| `text` | string | ✓ | 발화 (choice는 `""`) |
| `relatedDisputes` | string[] | ✓ | 관련 쟁점 ID |
| `behaviorHint` | string\|null | ✓ | 행동 힌트 |
| `branchCondition` | string | 선택 | 선택지 결과 ID 조건 |
| `choiceId` | string | choice만 | 선택지 그룹 ID |
| `options` | `{id, text}[]` | choice만 | 선택 항목 |

---

## 4. 증인 증언

경로: `src/data/witnessTestimonyData/{caseId}.ts`

### TestimonySlot

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | string | ✓ | `"w1-d1-topic"` 형식 |
| `witnessId` | string | ✓ | w-N |
| `topic` | string | ✓ | 질문 주제 요약 |
| `question` | string | ✓ | 재판관 질문 (합니다체) |
| `depth` | number | ✓ | 1~3 |
| `testimony` | string | ✓ | 증언 텍스트 |
| `behaviorHint` | string | ✓ | 행동 힌트 |
| `conditions` | object | 선택 | 표시 조건 |
| `effect` | object | ✓ | 증언 효과 |

### conditions

| 필드 | 타입 | 설명 |
|------|------|------|
| `prevSlotRequired` | string | 선행 슬롯 ID |
| `disputeState` | `{id, visibility?, minLieState?}` | 쟁점 상태 조건 |

### effect

| 필드 | 타입 | 설명 |
|------|------|------|
| `favorDirection` | string | pro_a / pro_b / mixed |
| `relatedDisputes` | string[] | 영향 쟁점 |
| `emotionDelta` | number | 감정 변화량 (선택) |
| `lieStateNudge` | `{party, dispute}` | lie 상태 넛지 (선택) |
| `emergenceTrigger` | string | 숨김 쟁점 발현 트리거 (선택) |

---

## 5. SolutionOrientations

경로: `src/data/solutionOrientations.ts`

```ts
export type SolutionOrientation = 'principle' | 'reconcile' | 'hybrid'
export const SOLUTION_ORIENTATIONS: Record<string, SolutionOrientation> = {
  "{caseId}::{카테고리}::0": "principle",
  "{caseId}::{카테고리}::1": "reconcile",
  ...
}
```

- `principle`: 규범/제도/절차 중심
- `reconcile`: 관계 회복/소통/양보 중심
- `hybrid`: 원칙과 화해 혼합
- 사건당 약 9개 항목 (3카테고리 × 3옵션)

---

## 6. V3 GameLoop Data (DossierCards)

경로: `docs/ref/리뉴얼참고/{caseId}-v3-game-loop-data.json` (또는 별도 JSON)

### 최상위

| 필드 | 타입 | 설명 |
|------|------|------|
| `caseId` | string | 사건 ID |
| `dossierCards` | object[] | DossierCard 목록 |
| `stateUnlockAtoms` | object | `{ a: {disputeId: {state: atom[]}}, b: {...} }` |
| `transitionBeats` | object[] | 상태 전환 비트 |

### DossierCard

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | `dc-N` 형식 필수 |
| `name` | string | 카드 제목 (10자 이내) |
| `description` | string | 역할 설명 1문장 |
| `evidenceIds` | string[] | 연관 증거 ID |
| `relatedDisputes` | string[] | 연관 쟁점 ID |
| `subjectParty` | string | a / b / both |
| `leadId` | string | 연관 리드 ID |
| `successConditionSummary` | string[] | 성공 조건 |
| `successEffects` | string[] | 성공 효과 |
| `challenges` | object[] | 챌린지 목록 |

### challenges[].questions 항목

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | `dc-N.{party}.qN` 형식 |
| `text` | string | 질문 텍스트 (합니다체) |
| `lockedHint` | string | 잠금 힌트 |
| `attackVector` | string | context / authenticity / timeline / contradiction / responsibility |
| `requiredLieState` | string | 최소 lie 상태 |
| `onSuccess` | object | `{ blockVector, revealAtom, lieAdvance }` |

---

## 7. Structure V2

경로: `src/data/claimPolicies/{caseId}-structure-v2.json`

### 최상위

| 필드 | 타입 | 설명 |
|------|------|------|
| `caseId` | string | 사건 ID (case- 접두어 없음) |
| `schemaVersion` | string | `"structure_v2"` |
| `disputes` | object[] | 쟁점 확장 정보 |
| `evidence` | object[] | 증거 타이밍 메타 |

### disputes 항목 (케이스 JSON 필드 + 확장)

| 추가 필드 | 타입 | 설명 |
|----------|------|------|
| `disputeKind` | string | core_truth / sub_truth / red_herring / shared_misconception |
| `depthLayers` | object[] | 3층 깊이 구조 |
| `linkEdges` | object[] | `{ target, relation }` 쟁점 간 관계 |
| `misconception` | object | red_herring일 때만 — 오해 구조 정의 |

### depthLayers 항목

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | surface / motive / core |
| `label` | string | 층 이름 (5~10자) |
| `summary` | string | 다루는 내용 (1~2문장) |
| `lockedSummary` | string | 잠긴 상태 힌트 |
| `revealAtomIds` | string[] | 해금 원자 ID (빈 배열 허용) |
| `uiStyle` | string | card_expand / relation_core |
| `unlockCondition` | object | `{ requireDisputes: [{id, minState}], requireFlags?: string[] }` (surface 제외) |

### evidence 항목

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | string | e-N |
| `type` | string | 증거 타입 |
| `timing` | object | `{ bestPhase, impactCurve }` |

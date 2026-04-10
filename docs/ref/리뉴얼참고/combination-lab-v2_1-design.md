# 조합 실험실 V2.1 설계안

## 1. 목표

V2가 `새 질문`, `새 증거`, `새 메모`를 여는 구조였다면, V2.1은 한 단계 더 나아가 `기존 노드를 발전시키고 재해석하는 구조`를 추가한다.

핵심 방향은 다음이다.

- 새 질문을 여는 것뿐 아니라 기존 질문을 더 날카로운 질문으로 발전시킨다.
- 새 증거를 얻는 것뿐 아니라 기존 증거를 더 신뢰도 높은 증거로 승격시킨다.
- 숨겨진 쟁점을 여는 것뿐 아니라 기존 쟁점을 분할, 통합, 재프레이밍한다.
- 조합의 결과가 단순 보상 아이템이 아니라 사건 해석의 구조를 바꾸게 만든다.

즉, 조합 실험실은 `unlock system`이 아니라 `node evolution system`으로 진화해야 한다.

## 2. V2 대비 확장 포인트

기존 V2 결과물:

- `derived_evidence`
- `derived_note`
- `question_unlock`
- `witness_angle`
- `mediation_hint`

V2.1 추가 결과물:

- `upgrade_question`
- `upgrade_evidence`
- `upgrade_dispute`
- `reframe_question`
- `reframe_evidence`
- `reframe_dispute`
- `split_dispute`
- `merge_disputes`
- `elevate_reliability`
- `expand_context`
- `narrow_scope`
- `shift_legality_weight`

즉, 결과는 크게 3축으로 나뉜다.

- 새로 연다
- 더 정밀하게 만든다
- 의미를 바꾼다

## 3. 기본 원칙

### 3-1. 조합 대상은 그대로 3종

- `evidence + evidence`
- `pinned note + pinned note`
- `evidence + pinned note`

Raw 대사 전체는 조합하지 않는다.  
조합 대상 메시지는 반드시 `핀 고정 노트` 또는 `파생 노트`여야 한다.

### 3-2. 후보는 규칙으로, 결과는 authoring으로

후보 탐색은 태그와 축으로 자동 제안할 수 있다.

- 시점
- 행위자
- 대상
- dispute 연결
- 감정
- 은폐 방식
- 적법성
- 출처
- 공개 가능 범위

하지만 결과 노드는 자동 문장 생성이 아니라 authoring된 결과물을 우선 사용해야 한다.

### 3-3. 모든 성공이 하드 증거는 아니다

조합 결과는 다음 중 하나일 수 있다.

- 새 증거
- 증거 승격
- 질문 승격
- 쟁점 재구성
- 증인 각도
- 조정 힌트
- 가치 충돌 메모

## 4. 권장 결과 타입 체계

### 4-1. 새 노드 해금

- `unlock_evidence`
- `unlock_note`
- `unlock_question`
- `unlock_statement`
- `unlock_dispute`
- `unlock_witness_angle`
- `unlock_interjection`
- `unlock_mediation_hint`

### 4-2. 기존 노드 발전

- `upgrade_question`
- `upgrade_evidence`
- `upgrade_dispute`
- `elevate_reliability`
- `expand_context`
- `narrow_scope`

### 4-3. 해석 전환

- `reframe_question`
- `reframe_evidence`
- `reframe_dispute`
- `shift_legality_weight`
- `shift_responsibility_weight`

### 4-4. 쟁점 지도 재편

- `split_dispute`
- `merge_disputes`

## 5. 권장 스키마

현재 [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)의 `evidenceCombinations`는 유지하고, 그 위에 `combinationLab`을 추가하는 것이 맞다.

```ts
type CombinationNodeType =
  | 'evidence'
  | 'note'
  | 'derived_note'
  | 'derived_evidence'
  | 'question'
  | 'statement'
  | 'dispute'
  | 'witness_angle'
  | 'mediation_hint'

type CombinationResultKind =
  | 'unlock_evidence'
  | 'unlock_note'
  | 'unlock_question'
  | 'unlock_statement'
  | 'unlock_dispute'
  | 'unlock_witness_angle'
  | 'unlock_interjection'
  | 'unlock_mediation_hint'
  | 'upgrade_question'
  | 'upgrade_evidence'
  | 'upgrade_dispute'
  | 'reframe_question'
  | 'reframe_evidence'
  | 'reframe_dispute'
  | 'split_dispute'
  | 'merge_disputes'
  | 'elevate_reliability'
  | 'expand_context'
  | 'narrow_scope'
  | 'shift_legality_weight'
  | 'shift_responsibility_weight'

interface CombinationLabNode {
  id: string
  type: CombinationNodeType
  label: string
  sourceRef?: string
  linkedDisputeIds?: string[]
  linkedEvidenceIds?: string[]
  linkedQuestionIds?: string[]
  visibility: 'base' | 'hidden' | 'derived'
}

interface CombinationLabEffect {
  kind: CombinationResultKind
  targetId?: string
  unlockNodeId?: string
  upgradeFromId?: string
  upgradeToId?: string
  reframeFromId?: string
  reframeToId?: string
  splitFromId?: string
  splitIntoIds?: string[]
  mergeFromIds?: string[]
  mergeToId?: string
  evidenceUpgrade?: {
    evidenceId: string
    toReliability?: 'hard'
    toCompleteness?: 'original' | 'context_missing' | 'partial' | 'edited'
    addContextTags?: string[]
  }
  disputeUpgrade?: {
    disputeId: string
    weight?: 'high' | 'medium' | 'low'
    ambiguity?: 'none' | 'low' | 'high'
    legitimacyIssue?: boolean
  }
  questionUpgrade?: {
    questionId: string
    tier?: 'advanced' | 'pressure' | 'closing'
  }
}

interface CombinationLabOutput {
  id: string
  label: string
  summary: string
  nodeType: CombinationNodeType
  effects: CombinationLabEffect[]
  judgeHint?: string
}

interface CombinationLabRecipe {
  id: string
  inputs: string[]
  cost: number
  hidden?: boolean
  repeatable?: boolean
  failHint?: string
  discoveryText: string
  outputId: string
}

interface CombinationLabConfig {
  analysisPointsBase: number
  analysisPointRefundOnFirstHidden?: number
  nodes: CombinationLabNode[]
  outputs: CombinationLabOutput[]
  recipes: CombinationLabRecipe[]
}
```

권장 추가 위치:

```ts
interface CaseData {
  ...
  combinationLab?: CombinationLabConfig
}
```

## 6. 질문/증거/쟁점의 진화 규칙

### 6-1. 질문 진화

질문은 보통 4단계로 보는 게 좋다.

- `basic`
- `advanced`
- `pressure`
- `closing`

예:

- 기본 질문: "그날 왜 그렇게 했습니까?"
- 발전 질문: "왜 원본이 아니라 편집본만 제출했습니까?"
- 압박 질문: "공익 목적이었다면 왜 공개 직전 거래 제안을 했습니까?"
- 종결 질문: "거래 시도와 편집 과장을 인정합니까?"

즉 조합 결과는 `새 질문 추가`뿐 아니라 `기존 질문의 tier 업그레이드`가 가능해야 한다.

### 6-2. 증거 진화

증거는 다음 방향으로 발전할 수 있다.

- `soft -> hard`
- `partial -> contextualized`
- `edited -> corroborated`
- `ambiguous -> scoped`

예:

- 편집본 + 원본 -> 편집 과장 메모
- CCTV + 기관 점검표 -> 실제 위반 범위 재구성본
- DM + 업로드 시점 -> 폭로 전 거래 시도 정황

즉 새 증거가 생기기도 하지만, 기존 증거의 신뢰도와 의미가 승격될 수도 있어야 한다.

### 6-3. 쟁점 진화

쟁점은 새로 열리는 것보다 `재구성`이 더 중요할 수 있다.

가능한 변화:

- `split_dispute`
- `merge_disputes`
- `upgrade_dispute`
- `reframe_dispute`

예:

- 원래 하나였던 `공익성과 편집성`을 둘로 쪼갠다
- 부차 쟁점이던 `보복성 유포`를 핵심 쟁점으로 승격한다
- `평판전`처럼 보이던 사건을 `거래성 폭로` 사건으로 재프레임한다

## 7. 사건당 권장 조합 수

최소선:

- 모든 사건 `8개 이상`

권장:

- 일반 사건 `10~12개`

강한 사건:

- `12~16개`

headline/대표 사건:

- `16~24개`

권장 분포:

- 새 노드 해금 25%
- 질문/증거 업그레이드 25%
- 쟁점 재구성 20%
- 해석 메모/가치 충돌 힌트 20%
- hidden combo 10%

## 8. 106건 전체 적용 전략

기존 106건 모두에 같은 밀도로 수작업 authoring을 하는 건 비효율적이다. 아래 3층 구조가 맞다.

### 8-1. 전 사건 공통 자동층

사건당 `4~6개`

자동 생성 가능한 기본 축:

- 같은 dispute를 증명하는 증거끼리
- 기관 기록 vs 당사자 주장
- 원본 vs 편집본
- 타임라인 vs 진술
- 공개 로그 vs 비공개 메시지
- 증거 vs 말 바꾸기 노트

이 층은 전 사건 공통 generator로 처리한다.

### 8-2. 사건별 반자동 보강층

사건당 `2~4개`

여기서는 사건별 구체 텍스트만 보정한다.

- derived note
- witness angle
- mediation hint
- advanced question

### 8-3. 핵심 사건 수동 강화층

사건당 `2~8개`

대상:

- headline 사건
- core 6
- 마케팅용 대표 사건
- 반전 구조가 강한 사건

여기서는 hidden combo, dispute split, evidence upgrade chain까지 설계한다.

## 9. UI/리소스 권장안

- 2슬롯 비교 트레이는 유지
- 후반 해금으로 3중 조합을 일부 허용
- 분석 포인트는 사건당 `6~8`
- 성공 hidden combo는 `1 환급`
- 실패 조합도 짧은 실패 힌트를 남긴다

예:

- "연결은 되지만 결정적이진 않다"
- "시점은 맞지만 출처가 약하다"
- "의심은 커지지만 법적으로는 부족하다"

## 10. 다음 단계

1. [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)에 `combinationLab` 타입 초안 추가
2. `headline-01`에 V2.1 파일럿 데이터 authoring
3. 조합 결과에 따라 질문/증거/쟁점이 실제로 진화하는 store 흐름 설계
4. 전 사건 자동 생성용 기본 규칙 작성


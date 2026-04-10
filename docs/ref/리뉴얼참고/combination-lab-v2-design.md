# 조합 실험실 V2 설계안

## 1. 목표

조합 실험실을 `증거 두 개를 합쳐 Hard로 승격`하는 좁은 기능에서, 아래 3종을 다루는 핵심 추리 루프로 확장한다.

- 증거 + 증거
- 핀 고정 노트 + 핀 고정 노트
- 증거 + 핀 고정 노트

핵심 재미는 다음이다.

- 의외의 조합으로 새로운 단서를 발견한다.
- 모든 성공 조합이 곧바로 하드 증거가 되지 않는다.
- 조합 1회마다 분석 포인트를 소비해 신중한 선택을 요구한다.
- 사건별로 서로 다른 조합망이 존재해, “명사만 갈아끼운 템플릿”이 아니라 사건 고유 추리 동선이 만들어진다.

## 2. 현재 구조와 연결 포인트

현재 코드 기준으로 아래 훅은 이미 존재한다.

- 기존 증거 조합 데이터: [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)
- 기존 증거 조합 처리: [D:\ProjectWS\src\store\slices\evidenceSlice.ts](D:/ProjectWS/src/store/slices/evidenceSlice.ts)
- 퍼크 슬롯 중 비교/정리/힌트 계열: [D:\ProjectWS\src\store\useGameStore.ts](D:/ProjectWS/src/store/useGameStore.ts)
- 발견/판단 계열 상태 타입: [D:\ProjectWS\src\types\discovery.ts](D:/ProjectWS/src/types/discovery.ts)

즉, V2는 기존 `evidenceCombinations`를 없애는 게 아니라 다음처럼 확장하는 쪽이 맞다.

- `evidenceCombinations`: 기존의 하드 증거 승격용 최소 구조 유지
- `combinationLab`: 증거/노트/파생노드를 포함하는 상위 실험실 구조 추가

## 3. 설계 원칙

### 3-1. raw 대사 전체는 조합하지 않는다

대사 전체를 직접 조합 대상으로 쓰면 authoring 비용이 폭발한다.  
조합 대상 메시지는 `핀 고정 노트`여야 한다.

예:

- "그날 새벽 4시엔 자고 있었다"
- "병원은 바로 데려갔다"
- "그 영상은 일부만 본 것이다"
- "그 문서는 정리본일 뿐이다"

이런 노트끼리 조합하면:

- 시간 모순
- 책임 회피 패턴
- 편집 정황
- 동기 메모
- 추가 질문 해금

같은 결과가 나온다.

### 3-2. 결과물은 여러 종류여야 한다

조합 성공 결과는 최소 5종으로 나눈다.

- `derived_evidence`
- `derived_note`
- `question_unlock`
- `witness_angle`
- `mediation_hint`

모든 조합을 하드 증거로 만들면 사건이 너무 빨리 풀리고, 실패 조합이 전부 꽝처럼 느껴진다.

### 3-3. “후보는 규칙, 결과는 authoring”

조합 후보 탐색은 태그/축으로 계산 가능하다.

- 시점
- 행위자
- 대상
- 쟁점
- 감정
- 은폐 방식
- 출처 신뢰도
- 적법성
- 공개 가능 범위

하지만 조합 결과 텍스트와 효과는 반드시 authoring된 결과여야 한다.  
즉, 자동 추천은 가능하지만 결과물은 설계형이어야 품질이 유지된다.

## 4. 자원 구조

사건당 `분석 포인트`를 둔다.

권장 기본:

- 기본 포인트: `4`
- evidence + evidence: `1`
- note + note: `1`
- evidence + note: `2`
- 3중 조합: `3`

보정:

- 사건 첫 hidden combo 성공 시 포인트 `1` 환급
- 같은 조합 재시도는 무료
- 실패 조합도 짧은 실패 힌트는 남김

실패 힌트 예:

- "연결은 되지만 법적 효력은 약하다"
- "시점은 겹치지만 책임까지 이어지진 않는다"
- "맥락상 의심은 커지지만 결정적이지 않다"

## 5. 데이터 구조 제안

기존 [D:\ProjectWS\src\types\case.ts](D:/ProjectWS/src/types/case.ts)에 아래 선택 필드를 추가하는 방식이 적절하다.

```ts
export type LabNodeKind =
  | 'evidence'
  | 'note'
  | 'derived_note'
  | 'derived_evidence'
  | 'question_unlock'
  | 'witness_angle'
  | 'mediation_hint'

export interface CombinationLabNode {
  id: string
  kind: LabNodeKind
  title: string
  summary: string
  sourceRef?: string
  party?: 'a' | 'b' | 'both' | 'neutral'
  disputeIds?: string[]
  tags: string[]
  hidden?: boolean
}

export interface CombinationLabRecipe {
  id: string
  inputs: string[]
  cost: number
  resultType: 'node' | 'upgrade' | 'unlock'
  outputId: string
  repeatable?: boolean
  hidden?: boolean
  rarity?: 'common' | 'uncommon' | 'rare'
  failHint?: string
  requires?: {
    evidencePresented?: string[]
    minLieState?: { disputeId: string; state: 'S1' | 'S2' | 'S3' | 'S4' | 'S5' }
    notePinned?: string[]
  }
}

export interface CombinationLabOutput {
  id: string
  kind: LabNodeKind
  title: string
  text: string
  effect?: {
    unlockEvidenceId?: string
    unlockQuestionId?: string
    unlockWitnessAngleId?: string
    addDisputeFocus?: string
    addHardEvidenceTo?: string[]
  }
}

export interface CombinationLabConfig {
  startingPoints: number
  refundOnFirstHiddenSuccess?: number
  nodes: CombinationLabNode[]
  recipes: CombinationLabRecipe[]
  outputs: CombinationLabOutput[]
}
```

`CaseData`에는 선택 필드로 추가:

```ts
combinationLab?: CombinationLabConfig
```

## 6. UI 제안

최소 구현은 `2슬롯 비교 트레이`다.

- 좌슬롯 / 우슬롯
- 소스: 증거 카드, 핀 노트 카드
- `조합 시도` 버튼
- 예상 비용 표기
- 결과 카드 즉시 표시

권장 보조 기능:

- `비교 보관함` 퍼크와 연동
- `선례 감각` 퍼크가 조합 후보 힌트 제공
- `재정리 선언` 퍼크가 노트를 조합 가능한 형태로 압축
- `최근 발견` 로그

## 7. 결과 타입별 처리 규칙

### 7-1. derived_evidence

가장 강한 결과.  
새 evidence node로 등록되거나, 기존 evidence의 `reliability`를 승격한다.

### 7-2. derived_note

플레이어 판단용 메모.  
직접 Hard는 아니지만 `새 질문`, `새 추궁 각`, `판결 메모`의 재료가 된다.

### 7-3. question_unlock

특정 dispute/questionType에 신규 템플릿을 연다.  
예: `timeline_lock_break`, `pressure_origin`, `private_confession`

### 7-4. witness_angle

증인에게 던질 수 있는 새 각도를 연다.  
예: “왜 그날 원본이 아니라 정리본을 봤는가”

### 7-5. mediation_hint

최종 해결 단계에서 선택지 해석을 바꾸는 힌트다.  
예: “공개 사과보다 비공개 시정안이 실제 피해 축소에 유리”

## 8. 사건당 권장 수량

일반 사건:

- 강한 조합 2
- 중간 조합 2~3
- 전술 조합 2
- 숨은 조합 1
- 낚시 조합 1

합계 `7~9`

headline 사건:

- `10~12`

## 9. 밸런스 규칙

- 3중 조합은 사건당 최대 1~2개
- hidden combo는 너무 초반에 열리지 않게 `requires`와 `minLieState`를 같이 쓴다
- 결과 노드가 또 다른 조합 입력이 되는 2단 체인 정도까지만 허용
- 모든 성공 조합이 즉시 승리 루프를 만들지 않게 한다

## 10. 구현 단계 제안

### Phase A

- `combinationLab` 타입 추가
- UI 2슬롯 비교 트레이 추가
- evidence + evidence 조합만 우선 지원

### Phase B

- 핀 노트 시스템 연결
- note + note, evidence + note 추가
- 결과 타입 `derived_note`, `question_unlock` 연결

### Phase C

- witness_angle, mediation_hint 연결
- 퍼크/히트로그/추천 힌트 추가

## 11. 추천 파일럿

첫 파일럿은 아래 중 하나가 적합하다.

- `headline-01`
- `headline-02`

이유:

- 증거 성격이 분명하게 다르고
- 편집/출처/보복/거래성이라는 서로 다른 축이 있어
- 증거+노트 조합이 잘 작동한다


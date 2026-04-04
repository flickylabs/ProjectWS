# V3 스키마 확장 제안서

> 스레드 C 산출물 1 — 2026-04-04
> 목적: LLM 100% 대체를 위한 V3 스크립트 구조 재설계

---

## 요약: 4가지 확장

| # | 대상 | 변경 | 이유 |
|---|------|------|------|
| 1 | `BeatScript` → `BeatScriptV3` | truthLevel, questionType, afterInvestigationStage, alternatives 추가 | Truth Throttle 준수 + 반복 방지 + 질문유형별 분기 |
| 2 | `DossierChallengeQuestion` | `scriptedResponse` 필드 추가 | 카드 실행 시 LLM 없이 NPC 응답 |
| 3 | `ThirdParty` | `scriptedTestimonies` 필드 추가 | 증인 증언 LLM 대체 |
| 4 | `InvestigationStage` | `scriptedNpcResponse` 필드 추가 | 증거 조사 질문에 대한 NPC 응답 |

---

## 1. BeatScriptV3 — 핵심 대사 스크립트 확장

### 현재 문제
- `line`이 하나뿐 → 반복 플레이 시 같은 대사
- `applicableStates`로 상태 필터만 → Truth Throttle 위반 검증 불가
- 질문 유형(사실추궁/동기탐색/공감접근/증거제시) 분기 없음
- 증거 조사 단계(investigationStage) 연계 없음

### 확장 인터페이스

```typescript
/** Truth Throttle 수준 — 대사 내 진실 노출 정도 */
export type TruthLevel = 'none' | 'hint' | 'partial' | 'full'

export interface BeatScriptV3 {
  caseId: string
  party: PartyId
  disputeId: string
  beatType: BeatType

  // ── 기존 필드 (의미 동일) ──
  /** 핵심 대사 (1~3문장) */
  line: string
  /** 행동 힌트 (연출용) */
  behaviorHint: string
  /** 적용되는 lie state 범위 */
  applicableStates: LieState[]
  /** 특정 증거 제시 후에만 사용 */
  afterEvidence?: string

  // ── V3 확장 필드 ──
  /** 이 대사가 대응하는 질문 유형 (미지정 시 모든 질문에 범용) */
  questionType?: QuestionType
  /** 이 대사가 대응하는 증거 조사 단계 번호 (investigationStages 연계) */
  afterInvestigationStage?: number
  /** 같은 조건에서의 대체 대사 (반복 방지, 최소 2개 권장) */
  alternatives?: string[]
  /** 진실 노출 수준 — Truth Throttle 검증용 */
  truthLevel: TruthLevel
}
```

### Truth Throttle ↔ truthLevel 매핑 규칙

| LieState | 허용 truthLevel | 대사 내 금지 요소 |
|----------|----------------|------------------|
| S0, S1 | `none` | 기관명, 인물 직함, 서비스명, 구체적 금액 용처 |
| S2 | `none`, `hint` | 구체적 기관명/직함 (단, "개인 사정"/"가족 일" 수준 OK) |
| S3 | `hint`, `partial` | 행위 인정 가능, 상대 탓 가능, 전체 진실 X |
| S4 | `partial`, `full` | 대부분의 진실 포함 가능 |
| S5 | `full` | 전체 진실 + 맥락 + 감정까지 포함 |

### 선택 알고리즘 (getFallbackBeat 확장)

```
1. (party, disputeId, lieState) 필터
2. questionType 매칭 (있으면 우선, 없으면 범용)
3. afterEvidence 매칭 (증거 제시 상황이면 우선)
4. afterInvestigationStage 매칭 (조사 단계 이후면 우선)
5. beatType 매칭 (stance → beatType 매핑)
6. 이미 사용된 line이면 alternatives에서 순환
7. truthLevel 검증 (현재 state에서 허용 범위 초과 시 경고 로그)
```

---

## 2. DossierChallengeQuestion — scriptedResponse 추가

### 현재 문제
카드 질문 성공 시 NPC 반응을 LLM이 생성. V3에서는 미리 작성된 응답 필요.

### 확장

```typescript
export interface DossierChallengeQuestion {
  id: string
  text: string
  lockedHint?: string
  attackVector: AttackVector
  requiredLieState?: 'S0' | 'S1' | 'S2' | 'S3' | 'S4'
  onSuccess: {
    blockVector: AttackVector
    revealAtom?: string
    lieAdvance?: boolean
  }

  // ── V3 확장 ──
  /** V3: 카드 질문에 대한 NPC 스크립트 응답 */
  scriptedResponse?: {
    /** NPC의 응답 대사 (1~3문장) */
    npcResponse: string
    /** 행동 힌트 (연출용) */
    behaviorHint: string
    /** 진실 노출 수준 */
    truthLevel: TruthLevel
  }
}
```

### 설계 결정
- `scriptedResponse`는 optional → V2(LLM)에서도 기존처럼 동작
- V3 로더가 있으면 `scriptedResponse` 우선, 없으면 LLM fallback
- truthLevel은 해당 질문의 requiredLieState 이상이므로 hint~full 범위

---

## 3. ThirdParty — scriptedTestimonies 추가

### 현재 문제
증인 증언은 전부 LLM 생성. V3에서는 depth별 사전 작성 필요.

### 확장

```typescript
export interface ThirdParty {
  // ... 기존 필드 전부 유지 ...

  // ── V3 확장 ──
  /** V3: depth별 증인 증언 스크립트 */
  scriptedTestimonies?: {
    /** 소환 직후 — 모호하고 조심스러운 증언 */
    vague: {
      testimony: string
      behaviorHint: string
      truthLevel: TruthLevel
    }
    /** 추가 질문 후 — 핵심 일부 공개 */
    partial: {
      testimony: string
      behaviorHint: string
      truthLevel: TruthLevel
    }
    /** 충분한 압박 후 — 알고 있는 전부 공개 */
    full: {
      testimony: string
      behaviorHint: string
      truthLevel: TruthLevel
    }
  }
}
```

### depth 게이팅 규칙
| depth | 해금 조건 | truthLevel 상한 |
|-------|----------|----------------|
| vague | 소환 즉시 | `hint` |
| partial | 관련 dispute S2+ 또는 증거 1개 이상 조사 완료 | `partial` |
| full | 관련 dispute S3+ 또는 증거 완전 봉쇄 | `full` |

---

## 4. InvestigationStage — scriptedNpcResponse 추가

### 현재 문제
증거 조사 후 해금되는 질문(`investigationStages[].question`)에 대한 NPC 응답이 없음.
현재는 LLM이 BeatScript + Blueprint 조합으로 생성.

### 확장

```typescript
export interface InvestigationStage {
  stage: number
  revealKey: string
  question: {
    text: string
    attackVector: AttackVector
  }

  // ── V3 확장 ──
  /** V3: 이 조사 질문에 대한 NPC 스크립트 응답 (party별) */
  scriptedNpcResponses?: {
    a?: {
      npcResponse: string
      behaviorHint: string
      truthLevel: TruthLevel
    }
    b?: {
      npcResponse: string
      behaviorHint: string
      truthLevel: TruthLevel
    }
  }
}
```

### 설계 근거
- 같은 증거라도 partyA/B에게 물을 때 반응이 다름
- subjectParty가 해당 party면 방어적 응답, 아니면 공격적/관찰자 응답
- truthLevel은 해당 stage의 revealKey 수준에 연동

---

## 하위 호환성

모든 확장 필드는 **optional** (`?`). 기존 V2 데이터는 변경 없이 동작:
- `BeatScriptV3`의 `truthLevel`만 required → 기존 BeatScript와 별도 인터페이스
- 로더에서 `truthLevel` 없으면 state 기반 추정 로직 추가
- V3 데이터 파일에서만 확장 필드 사용

---

## 타입 변경 요약

| 파일 | 변경 |
|------|------|
| `src/types/renewal.ts` | `TruthLevel` 타입 추가, `BeatScriptV3` 인터페이스 추가, `DossierChallengeQuestion.scriptedResponse` 추가, `InvestigationStage` 타입 추가 |
| `src/types/character.ts` | `ThirdParty.scriptedTestimonies` 추가 |
| `src/engine/v3GameLoopLoader.ts` | `getFallbackBeat` 확장 (questionType, alternatives 순환, truthLevel 검증) |

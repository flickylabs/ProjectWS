# 스레드 C — V3 스크립트 구조 재설계

> 담당: LLM 100% 대체를 목표로 한 V3 스크립트 구조를 이번 변경에 맞게 재설계
> 주 도구: GPT Pro (설계) + Claude Code (검증/구현)
> 산출물: V3 스키마 업데이트 제안서 + spouse-01 파일럿 데이터

---

## 1. V3의 목표

**LLM 호출 없이 게임을 완전히 진행할 수 있는 스크립트 시스템.**

현재 LLM이 담당하는 것:
- NPC 대사 생성 (Phase 3 심문 응답)
- 자유 질문 분류 + 응답
- 증인 증언 생성

V3 스크립트가 이것들을 모두 대체해야 한다.

---

## 2. 이번에 바뀐 것 — V3에 미치는 영향

### 변경 1: Progressive Truth Throttle
**영향**: V3 스크립트 대사가 상태별로 다른 수준의 진실을 포함해야 한다.

현재 V3 `BeatScript`는 `applicableStates: ['S1']`처럼 상태를 지정하지만,
대사 자체에 진실 수준 제어가 없다. 같은 S2 대사라도 "가족 일" 이상을 말하면 안 된다.

**필요**: BeatScript 대사를 Truth Throttle 규칙에 맞게 작성/검증하는 기준.

### 변경 2: 증거 조사 → 심문 연계
**영향**: V3에서 증거 조사 후 해금되는 질문에 대한 NPC 응답 스크립트가 필요하다.

현재 `BeatScript`에 `afterEvidence?: string`이 있지만,
**"어떤 조사 단계 이후의 어떤 질문에 대한 응답"**이라는 세밀한 분기는 없다.

**필요**: `investigationStages`의 각 stage 질문에 매칭되는 NPC 응답 스크립트.

### 변경 3: 카드 오토 정답지
**영향**: 카드 자동 실행 시 NPC 응답도 스크립트로 제공해야 한다.

현재 카드 실행 시 LLM이 응답을 생성한다.
V3에서는 DossierCard 질문별로 미리 작성된 NPC 응답이 있어야 한다.

**필요**: `DossierChallengeQuestion`에 `scriptedResponse` 필드 추가, 또는 별도 매핑.

### 변경 4: 증인 게이팅
**영향**: 증인 증언도 상태별 스크립트가 필요하다.

현재 증인은 LLM이 증언을 생성한다.
V3에서는 depth 단계별(vague/partial/full) 미리 작성된 증언이 있어야 한다.

**필요**: `ThirdParty`에 `scriptedTestimonies: { vague: string, partial: string, full: string }` 추가.

---

## 3. 현재 V3 데이터 구조

### 3-1. BeatScript (NPC 대사 폴백)
```typescript
interface BeatScript {
  caseId: string; party: PartyId; disputeId: string
  beatType: BeatType  // deny/hedge/partial/blame/emotional/confession/evidence_hit
  line: string; behaviorHint: string
  applicableStates: LieState[]
  afterEvidence?: string
}
```
문제: `line`이 하나뿐. 같은 beatType+state에서 반복 시 같은 대사.

### 3-2. TransitionBeat (상태 전이 대사)
```typescript
interface TransitionBeat {
  id: string; caseId: string; party: PartyId; disputeId: string
  fromState: LieState; toState: LieState
  primaryBeatType: BeatType; line: string; behaviorHint: string
}
```
이것은 잘 동작한다. 상태 전이 시 LLM 대신 사용됨.

### 3-3. StateUnlockAtom (상태별 해금 사실)
```typescript
interface StateUnlockAtom {
  id: string; factText: string; tags: string[]
  unlockedAtState: LieState
  slots: Record<string, Record<string, string>>
  stanceHints: Stance[]
}
```
현재 LLM 프롬프트에 주입됨. V3에서는 이것이 BeatScript 대사의 소재가 된다.

### 3-4. DossierCard 질문
```typescript
interface DossierChallengeQuestion {
  id: string; text: string; lockedHint?: string
  attackVector: AttackVector
  requiredLieState?: 'S0'|'S1'|'S2'|'S3'|'S4'
  onSuccess: { blockVector: AttackVector; revealAtom?: string; lieAdvance?: boolean }
}
```
문제: NPC 응답 스크립트가 없다. LLM이 생성해야 한다.

---

## 4. 제안: V3 스키마 확장

### 4-1. BeatScript 확장
```typescript
interface BeatScriptV3 extends BeatScript {
  /** 이 대사가 대응하는 질문 유형 (fact_pursuit/motive_search/empathy_approach) */
  questionType?: QuestionType
  /** 이 대사가 대응하는 증거 조사 단계 (investigationStages 연계) */
  afterInvestigationStage?: number
  /** 같은 조건에서의 대체 대사 (반복 방지) */
  alternatives?: string[]
  /** 진실 노출 수준 (Truth Throttle 검증용) */
  truthLevel: 'none' | 'hint' | 'partial' | 'full'
}
```

### 4-2. DossierCard 응답 추가
```typescript
interface DossierChallengeQuestion {
  // ... 기존 필드 ...
  /** V3: 카드 질문에 대한 NPC 스크립트 응답 */
  scriptedResponse?: {
    npcResponse: string
    behaviorHint: string
  }
}
```

### 4-3. 증인 증언 스크립트
```typescript
interface ThirdParty {
  // ... 기존 필드 ...
  scriptedTestimonies?: {
    vague: { testimony: string; behaviorHint: string }
    partial: { testimony: string; behaviorHint: string }
    full: { testimony: string; behaviorHint: string }
  }
}
```

---

## 5. 이번 작업 범위

### Phase 1: 스키마 확정
- 위 제안을 검토하고 최종 V3 스키마를 확정
- TypeScript 타입 업데이트

### Phase 2: spouse-01 파일럿
- spouse-01의 BeatScript를 V3 확장 버전으로 재작성
  - 질문유형별 분기
  - investigationStage 연계
  - truthLevel 검증
  - alternatives 최소 2개
- DossierCard 질문별 scriptedResponse 작성
- 증인 scriptedTestimonies 작성 (증인이 있는 경우)

### Phase 3: 검증
- LLM 없이 spouse-01 게임 루프가 완전히 동작하는지 확인
- BeatScript 폴백만으로 20턴 시뮬레이션

---

## 6. 입력 파일

```
현재 V3 타입:    src/types/renewal.ts
V3 로더:        src/engine/v3GameLoopLoader.ts
Beat 셀렉터:    src/engine/beatSelectorV2.ts
LLM 리졸버:     src/engine/llmDialogueResolver.ts (폴백 경로 확인용)

spouse-01 V3 데이터:
  tells-beats: docs/ref/리뉴얼참고/spouse-01-tells-beats.json (없으면 src/data/claimPolicies/spouse-01-tells-beats.json)
  v3-game-loop: docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.ts
  supplement: docs/ref/리뉴얼참고/gpt-session1/output/spouse-01-v3-supplement.ts

다른 사건 V3 데이터 (구조 참고):
  friend-01: docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-v3-game-loop-data.json
  friend-01: docs/ref/리뉴얼참고/gpt-batch/friend-01/friend-01-tells-beats.json
```

---

## 7. 산출물

1. **V3 스키마 확장 제안서** — TypeScript 인터페이스 + 변경 이유
2. **spouse-01 V3 파일럿 데이터** — 확장된 BeatScript + DossierCard scriptedResponse
3. **V3 데이터 작성 가이드** — 83건 확장 시 GPT에 전달할 템플릿

---

## 8. 핵심 원칙

> "V3 스크립트의 모든 대사는 Truth Throttle 규칙을 따라야 한다."

- S0-S1 대사: 기관명/인물직함/서비스명 절대 불포함
- S2 대사: "개인 사정"/"가족 일" 수준
- S3 대사: 행위 인정, 상대 탓, 구체적 진실 없음
- S4-S5 대사: 전체 진실 포함 가능

이것이 BeatScript의 `truthLevel` 필드와 대응된다.

---

## 9. 직접 수행 가이드

### 추천 방식: 설계→파일럿→검증 3단계, 각각 에이전트 분리

이 스레드는 **설계 + 데이터 생성**이 모두 필요하므로 단계를 철저히 분리해야 한다.

#### 1단계: 스키마 설계 에이전트
```
현재 V3 타입(src/types/renewal.ts)과 V3 로더(src/engine/v3GameLoopLoader.ts)를 읽고,
다음 변경 사항을 반영한 V3 스키마 확장을 설계하라:

[변경 사항]
1. Progressive Truth Throttle — 대사별 진실 노출 수준 제어 필요
2. investigationStages 연계 — 증거 조사 단계별 NPC 응답 스크립트 필요
3. 카드 오토 정답지 — DossierCard 질문별 NPC 스크립트 응답 필요
4. 증인 게이팅 — depth별(vague/partial/full) 증언 스크립트 필요

제안할 것:
- 확장/신규 TypeScript 인터페이스
- 기존 인터페이스와의 호환성 유지 방안
- V3 로더에 필요한 변경
```

#### 2단계: spouse-01 파일럿 작성 에이전트 (GPT Pro 활용 추천)
스키마가 확정되면:
```
확정된 V3 스키마에 따라 spouse-01의 파일럿 데이터를 작성하라.

[입력]
- spouse-01 사건원본 (src/data/cases/generated/spouse-01.json)
- 기존 V3 데이터 (docs/ref/리뉴얼참고/spouse-01-v3-game-loop-data.ts)
- 기존 tells-beats (src/data/claimPolicies/spouse-01-tells-beats.json)
- v2-atoms (src/data/claimPolicies/spouse-01-v2-atoms.json)

[작성할 것]
1. BeatScript 확장 — 기존 BeatScript에 questionType, afterInvestigationStage, alternatives, truthLevel 추가
2. DossierCard scriptedResponse — 18개 질문 각각에 NPC 응답 스크립트
3. 증인 scriptedTestimonies — (증인이 있는 경우)

[진실 노출 규칙 — 반드시 따를 것]
- truthLevel 'none' (S0-S1): 기관명/직함/서비스명 금지
- truthLevel 'hint' (S2): "가족 일"/"개인 사정" 수준
- truthLevel 'partial' (S3): 행위 인정, 구체적 진실 금지
- truthLevel 'full' (S4-S5): 전체 허용
```

#### 3단계: 검증 에이전트
```
spouse-01 V3 파일럿 데이터를 검증하라.

[검증 기준]
1. truthLevel과 대사 내용이 일치하는가?
   - truthLevel:'none'인 대사에 기관명/직함이 있으면 FAIL
2. BeatScript가 모든 질문유형 × lieState 조합을 커버하는가?
   - fact_pursuit/motive_search/empathy_approach/evidence_present × S0~S5
3. DossierCard scriptedResponse가 합니다체인가?
4. alternatives가 원본과 충분히 다른가? (같은 내용의 말바꾸기 아닌가)
5. LLM 없이 20턴 시뮬레이션이 가능한 수준인가? (대사 다양성)
```

### GPT Pro 활용 시 (BeatScript 대량 생성)
```
gpt-session-C1/
  v3-schema.md              ← 확정된 V3 스키마
  spouse-01-case.json       ← 사건 데이터
  spouse-01-atoms.json      ← v2-atoms (대사 소재)
  truth-throttle-rules.md   ← 진실 노출 규칙
  prompt.md                 ← "모든 조합에 대해 BeatScript를 작성하라"
```
**주의: BeatScript 대사량이 많다 (질문유형 4 × lieState 6 × party 2 × dispute 5 = 최대 240개). GPT Pro에 세션을 나눠서 전달해야 한다.**

### 주의
- V3 스키마는 컨트롤 타워 승인 후 확정한다. 독단적으로 타입을 변경하지 마라.
- 파일럿 데이터는 **소량이라도 완벽한 품질**이어야 한다. 양보다 질.

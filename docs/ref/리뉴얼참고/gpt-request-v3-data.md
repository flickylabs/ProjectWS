# V3 게임 루프 데이터 생성 요청 — GPT

## 배경

당신의 게임 메커닉 재설계 권고안(game_mechanics_overhaul_recommendations.md)을 채택합니다. Claude Code가 엔진/UI를 병렬 구현하는 동안, 아래 4가지 데이터를 생성해 주세요.

대상 사건: **spouse-01**

---

## 요청 1: 도시에(Dossier) 카드 설계

기존 증거 6개를 **3~4개의 플레이어블 카드**로 묶어 주세요.

```ts
interface DossierCard {
  id: string                    // "dossier-1"
  name: string                  // "자금 흐름"
  description: string           // 플레이어에게 보이는 1줄 설명
  evidenceIds: string[]         // 포함된 원본 증거 ID ["e-1", "e-2"]
  relatedDisputes: string[]     // 관련 쟁점
  subjectParty: 'a' | 'b' | 'both'

  /** 대상별 challenge 질문 — 증거를 내밀며 할 수 있는 구체적 질문 */
  challenges: {
    targetParty: 'a' | 'b'
    questions: Array<{
      id: string                // "dossier-1.a.q1"
      text: string              // "이 수취인이 누구입니까?"
      attackVector: 'identity' | 'context' | 'legality' | 'authenticity'
      /** 이 질문이 성공했을 때 봉쇄되는 방어 */
      onSuccess: {
        blockVector?: string
        lieAdvance?: boolean
        revealAtom?: string     // 새로 드러나는 atom ID
      }
    }>
  }[]
}
```

spouse-01 권장 묶음 (당신의 권고 기반):
- 도시에 1: e-1 + e-2 → "자금 흐름" (송금 내역 + 예약 확인서)
- 도시에 2: e-3 + e-4 → "잘린 대화" (메신저 캡처 + CCTV)
- 도시에 3: e-5 + e-6 → "우회 송금" (세린의 별도 계좌)
- (또는 다른 묶음이 더 나으면 자유롭게)

### 중요
- 각 도시에마다 **A 대상 질문 2~3개 + B 대상 질문 2~3개**
- both 도시에는 양측에 각각 1회 사용 가능
- 질문 텍스트는 재판관 말투 (격식체, "~하십시오", "~입니까")

---

## 요청 2: State별 신규 해금 Atom

현재 V2 atom은 S0~S5 전체에서 같은 atom을 stance만 바꿔서 사용합니다. 이러면 S1→S2 전이 후에도 "비슷한 말의 변주"가 나옵니다.

**각 state에서 처음 열리는 신규 atom 1~2개**를 추가해 주세요.

```
Surface (S0~S1): 기존 atom 유지
Structural (S2): 새로 드러나는 사실 1~2개
  예: "가족 쪽 급한 일이 있었다" (구체적 대상은 아직 숨김)
Core (S4): 핵심 동기/감정 해금
  예: "처가 살림을 못 챙기는 사람처럼 보일까 두려웠다"
Confession (S5): 전면 공개
  예: "간병 예약금이었다"
```

대상: 한지석 d-1, d-3, d-5 + 오세린 d-2, d-4, d-5
(기존 V2 atom에 추가하는 형태)

atom 구조는 기존 V2와 동일:
```ts
{
  id: string, factText: string, tags: ClaimAtomTag[],
  slots?: ClaimAtomSlots, stanceHints?: Stance[],
  // 추가: 이 state에서 처음 해금됨을 표시
  unlockedAtState: 'S2' | 'S3' | 'S4' | 'S5'
}
```

---

## 요청 3: 이벤트 텍스트 + 선택지

4종 이벤트의 **spouse-01용 구체적 텍스트**를 작성해 주세요.

### 3-1. 모순 지적
```ts
interface ContradictionEvent {
  id: string
  /** 모순이 되는 두 발언의 요약 */
  statementA: string  // "송금 사실을 부정했습니다"
  statementB: string  // "그런데 금액과 시점을 구체적으로 언급했습니다"
  /** 플레이어 선택지 */
  options: {
    point_out: { label: string, effect: string }   // "이 모순을 지적한다"
    let_go: { label: string, effect: string }       // "넘어간다"
  }
  /** 지적 성공 시 NPC 반응 (beat 수준) */
  npcReaction: string
}
```

spouse-01에서 발생 가능한 모순 2~3개

### 3-2. 끼어들기
```ts
interface InterjectionEvent {
  id: string
  /** 끼어드는 당사자 */
  interruptor: 'a' | 'b'
  /** 끼어들기 대사 */
  interjectionLine: string
  /** 플레이어 선택지 */
  options: {
    allow: { label: string, effect: string }   // "허용한다" → 새 단서
    block: { label: string, effect: string }   // "제지한다" → 압박 보너스
  }
}
```

spouse-01에서 발생 가능한 끼어들기 2~3개

### 3-3. 감정 폭발
```ts
interface EmotionalOutburstEvent {
  id: string
  party: 'a' | 'b'
  /** 폭발 대사 */
  outburstLine: string
  /** 플레이어 선택지 */
  options: {
    press: { label: string, effect: string }    // "더 압박한다"
    calm: { label: string, effect: string }     // "진정시킨다"
  }
}
```

양측 각 1~2개

---

## 요청 4: BeatScript 보강 — 전이 앵커

현재 beat 36개는 일반 fallback용입니다. 여기에 **state 전이 순간 전용 beat**를 추가해 주세요.

```
S1→S2 전이: evidence_hit + partial beat (균열 순간)
S2→S3 전이: blame beat (전가로 전환하는 순간)
S3→S4 전이: emotional beat (방어가 무너지기 시작)
S4→S5 전이: confession beat (결정적 시인)
```

한지석 d-1 + 오세린 d-2 우선. 각 전이당 1개씩 = 8개.
이건 LLM이 아닌 **사전 작성 대사**로, 전이 순간에 강제 삽입됩니다.

---

## 출력 형식

JSON 1개로 통합:
```json
{
  "caseId": "spouse-01",
  "dossierCards": [...],
  "stateUnlockAtoms": { "a": { "d-1": { "S2": [...], "S4": [...] }, ... }, "b": { ... } },
  "events": {
    "contradictions": [...],
    "interjections": [...],
    "emotionalOutbursts": [...]
  },
  "transitionBeats": [...]
}
```

## 참고 파일
- spouse-01 사건 데이터 (session1-spouse-01-case.json)
- 기존 V2 atom (spouse-01-claimpolicy-v2-atoms.json)
- 기존 beat (session2-spouse-01-executabletell-beatscript.json)

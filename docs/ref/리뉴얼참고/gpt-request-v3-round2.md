# V3 게임 루프 데이터 2차 요청 — GPT (2세션 체제)

## 상황 요약

1차 요청(spouse-01 V3 game loop data) 결과를 Claude Code가 전부 엔진에 통합 완료했습니다.
테스트 81/81 PASS, 빌드 정상.

**2세션**으로 나누어 진행합니다.

---

# 세션 1: spouse-01 보충 + family-01 Tell/Beat

이 세션의 산출물: **2개 파일**

---

## 1-A. spouse-01 TransitionBeat 보충 (d-3, d-4, d-5)

### 배경
1차에서 전이 앵커 beat가 **a/d-1 한지석, b/d-2 오세린** 2개 쟁점만 커버합니다.
나머지 3개 쟁점에도 전이 순간 강제 삽입 대사가 필요합니다.

### 필요한 beat

| 쟁점 | 파티 | 전이 | 주요 내용 |
|------|------|------|-----------|
| **d-3** 잘린 캡처와 골목 오해 | a (한지석) | S1→S2 | 캡처가 잘렸다는 건 인정, 하지만 맥락은 다르다 |
| d-3 | a | S2→S3 | 오해를 바로잡지 않은 건 아내 탓 전가 |
| d-3 | a | S3→S4 | 장모 건강 얘기 꺼내는 게 수치스러웠다 |
| d-3 | a | S4→S5 | 카페→상담동 후문 동선 전면 공개 |
| **d-4** 150만원 우회 송금 | b (오세린) | S1→S2 | 정우성 경유 인정, 동생 월세 위급 상황 |
| d-4 | b | S2→S3 | 자기 150만원만 문제 삼으면 280만원도 같이 봐야 한다 |
| d-4 | b | S3→S4 | 동생 돈 문제가 수치스러워서 숨겼다 |
| d-4 | b | S4→S5 | 3개월 연체 월세 150만원, 입금 18분 뒤 빠져나간 흐름 인정 |
| **d-5** 사전 상의 약속 위반 | a (한지석) | S1→S2 | 기준 넘는 걸 알면서 보냈다 인정 |
| d-5 | a | S2→S3 | 자기만 배신자 안 되려고 아내 150만원 끌어왔다 |
| d-5 | a | S3→S4 | 가족 일이니 이번만 예외라고 혼자 허락했다 |
| d-5 | a | S4→S5 | 선후관계상 자신이 먼저 깼다, 책임이 더 무겁다 |
| d-5 | b (오세린) | S1→S2 | 자기 150만원도 기준 넘은 건 안다 |
| d-5 | b | S2→S3 | 같은 위반이라도 선후관계와 숨긴 방식이 다르다 |
| d-5 | b | S3→S4 | 약속 먼저 제안한 쪽이 자기라서 더 창피했다 |
| d-5 | b | S4→S5 | 배신감이 이유여도 면책은 안 된다 인정 |

총 **16개** beat.

### 스키마 (1차와 동일)
```ts
interface TransitionBeat {
  id: string              // "tb-a-d3-s1-s2"
  caseId: "spouse-01"
  party: "a" | "b"
  disputeId: string       // "d-3", "d-4", "d-5"
  fromState: "S1" | "S2" | "S3" | "S4"
  toState: "S2" | "S3" | "S4" | "S5"
  primaryBeatType: "evidence_hit" | "partial" | "blame" | "emotional" | "confession"
  secondaryBeatType?: string
  line: string            // 1~3문장, 캐릭터 말투 반영
  behaviorHint: string    // 행동/표정 연출 지시
}
```

### 참고
- 1차 beat(tb-a-d1-*, tb-b-d2-*)의 톤과 길이를 맞춰 주세요
- d-5는 **쌍방 위반**이므로 양측 모두의 시인이 필요합니다
- 기존 stateUnlockAtoms의 factText를 beat 대사에 자연스럽게 녹여 주세요

---

## 1-B. spouse-01 이벤트 텍스트 추가

### 배경
현재 이벤트: 모순 3 + 끼어들기 3 + 감정폭발 4 = 10개.
16턴 심문에서 같은 이벤트가 반복되지 않으려면 추가 필요합니다.

### 추가 필요

**모순 3~4개 추가** (d-3, d-4, d-5 관련):
- d-3: 캡처 맥락이 잘렸다고 인정하면서도 오해를 바로잡지 않은 모순
- d-4: 우회 송금의 급박성을 말하면서도 추석 뒤 설명으로 미룬 모순
- d-5: 쌍방 위반을 인정하면서도 자기 건만 예외를 주장하는 양측 모순
- (추가 1개 자유)

**끼어들기 2개 추가**:
- d-5 관련: 한지석이 오세린의 150만원을 끌어올리는 끼어들기
- d-3 관련: 오세린이 골목 오해를 다시 꺼내는 끼어들기

**감정 폭발 2개 추가**:
- 한지석 d-3: 장모 건강 문제를 법정에서 꺼내야 하는 수치심
- 오세린 d-4: 동생 돈 문제를 또 꺼내야 하는 수치심

### 스키마 (1차와 동일)
ContradictionEvent, InterjectionEvent, EmotionalOutburstEvent — 1차 출력물의 형식 그대로.

---

## 1-C. family-01 ExecutableVerbalTell + BeatScript

### 배경
family-01은 Session 3까지만 완성. Tell과 Beat가 아직 없습니다.

### 사건 정보

**당사자**:
- a: **윤서아** (42세, 프리랜서 보험설계사, archetype: victim_cosplay)
- b: **윤도현** (38세, 냉동설비 정비사, archetype: cold_logic)

**쟁점 5개**:
- d-1: 서아의 부모 예금 선이체
- d-2: 도현의 간병비 분담 지연
- d-3: 아버지 수첩 메모는 상속 예고인가
- d-4: 첫 달 간병비는 전액 형제 사비로만 감당해야 했는가
- d-5: 공동 기록 원칙의 쌍방 위반

### Tell 대상
family-01-data.json의 tellPool에 정의된 6종:

**서아(a)**: sacrifice_rollcall, tear_brake, echo_blame
- sacrifice_rollcall: 궁지에 몰리면 자기가 한 간병 일정을 나열
- tear_brake: 목이 잠기며 "저 아니었으면 무너졌을 거예요" 반복
- echo_blame: "그러면 당신은 어떻게 했겠어요?" 되물음

**도현(b)**: receipt_stack, clipped_denial, dry_sarcasm
- receipt_stack: 날짜/금액을 빠르게 나열하며 방어
- clipped_denial: "그건 아닌데요", "엄밀히 말하면 늦은 거지" 짧은 부정
- dry_sarcasm: "저는 돈이 없고 몸뚱이만 있으니까요" 건조한 비아냥

### 스키마
```ts
interface ExecutableVerbalTell {
  id: string
  appliesWhen: TellTrigger[]  // 'lying'|'cornered'|'emotional'|'avoiding'|'shame'|'hurt'|'defensive'
  lexicalHooks: string[]       // 텍스트에 반드시 포함될 어휘
  sentenceShape?: SentenceShape // 'number_first'|'question_end'|'enumeration'|'echo_repeat'|'conditional'|'self_reference'
  cadence: TellCadence         // 'every_turn'|'once_every_2_turns'|'max_once_per_turn'|'on_trigger_only'
  numericGranularity?: string
  requiresSecondSentence?: boolean
  originalPattern: string       // 원본 패턴 설명
}

interface BeatScript {
  caseId: string
  party: 'a' | 'b'
  disputeId: string
  beatType: 'deny' | 'hedge' | 'partial' | 'blame' | 'confession' | 'evidence_hit'
  line: string                  // 1~3문장
  behaviorHint: string
  applicableStates: LieState[]
  afterEvidence?: string        // 특정 증거 제시 후 전용
}
```

Tell 양측 각 3개 = **6개**, BeatScript 약 **30~40개**

---

## 세션 1 출력 형식

### 파일 1: `spouse-01-v3-supplement.json`
```json
{
  "caseId": "spouse-01",
  "supplemental": true,
  "transitionBeats": [ ... 16개 (1-A) ... ],
  "events": {
    "contradictions": [ ... 추가 3~4개 (1-B) ... ],
    "interjections": [ ... 추가 2개 (1-B) ... ],
    "emotionalOutbursts": [ ... 추가 2개 (1-B) ... ]
  }
}
```

### 파일 2: `family-01-tells-beats.json`
```json
{
  "caseId": "family-01",
  "executableTells": {
    "a": [ ... 서아 tell 3개 ... ],
    "b": [ ... 도현 tell 3개 ... ]
  },
  "beatScripts": [ ... 30~40개 ... ]
}
```

+ TS export 파일 + 작업 메모

---

# 세션 2: family-01 V2 Atom + V3 Game Loop

이 세션의 산출물: **2개 파일**
세션 1 산출물(family-01-tells-beats.json)의 tell ID를 참조합니다.

---

## 2-A. family-01 V2 ClaimPolicy Atom

spouse-01의 V2 atom(155개)과 같은 형식으로, family-01의 각 쟁점/state별 atom을 생성해 주세요.

### 스키마
```ts
interface ClaimAtom {
  id: string          // "family01:a:d-1:act:0"
  factText: string    // "1,800만원을 선이체한 것은 사실입니다"
  tags: ClaimAtomTag[]
  slots?: ClaimAtomSlots  // amount, time, person, evidence, rule 등
  stanceHints?: Stance[]
  usableInSubActions?: QuestionType[]
  requiresEvidenceIds?: string[]
}
```

**범위**: a(d-1, d-3, d-5) + b(d-2, d-4, d-5) × S0~S5 → 쟁점당 15~25개 atom
**참고**: 첨부된 family-01-data.json의 publicClaim/privateKnowledge/suppressions를 atom으로 분해

**증거 6개** (requiresEvidenceIds 참고용):
- e-1: 부모 관리계좌 거래내역 + 서아 개인계좌 입금확인서 (hard)
- e-2: 서아 휴대폰 메모 복원본 + 자동이체 실패 알림 (soft)
- e-3: 가족 단톡 + 간병 스케줄표 원본 (soft)
- e-4: 2021년 아버지 수첩 메모 사진 (soft, **함정 증거** — 잘린 사진)
- e-5: 상속 상담 변호사 확인서 + 수첩 전체 스캔본 (hard)
- e-6: 병원 사회복지사 장기요양 경감 신청 기록 (hard)

---

## 2-B. family-01 V3 Game Loop Data

spouse-01 V3와 완전히 동일한 구조.

### DossierCard 3개
- 도시에 1: e-1 + e-2 → 부모 예금 흐름
- 도시에 2: e-3 + e-4 → 가족 기록과 수첩
- 도시에 3: e-5 + e-6 → 법적 확인 + 의료 기록
- (더 나은 묶음이 있으면 자유롭게)

각 카드: A 대상 3질문 + B 대상 3질문

### StateUnlockAtom
a(d-1, d-3, d-5) + b(d-2, d-4, d-5) × S2/S3/S4/S5 각 1~2개

**중요**: 여기서 만드는 atom ID가 DossierCard의 revealAtom에서 참조됩니다. 같은 세션에서 작업하므로 ID를 맞춰 주세요.

### 이벤트 텍스트
- 모순 3~4개
- 끼어들기 3개
- 감정 폭발 양측 각 2개

### TransitionBeat
- a/d-1: S1→S2~S4→S5 (4개)
- b/d-2: S1→S2~S4→S5 (4개)
- a/d-3: S1→S2~S4→S5 (4개)
- b/d-4: S1→S2~S4→S5 (4개)
- d-5 양측: 각 S1→S2~S4→S5 (8개)
- 총 **24개**

---

## 세션 2 출력 형식

### 파일 1: `family-01-v2-atoms.json`
```json
{
  "caseId": "family-01",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": { "disputeId": "d-1", "state": "S0", "publicClaim": [...], "privateKnowledge": [...], "suppressions": [...], "emotionalLeakRisk": "...", "tellPool": [...], "claimAtoms": [...] },
        ...
      },
      ...
    },
    "b": { ... }
  }
}
```

### 파일 2: `family-01-v3-game-loop-data.json`
```json
{
  "caseId": "family-01",
  "dossierCards": [...],
  "stateUnlockAtoms": { "a": {...}, "b": {...} },
  "events": { "contradictions": [...], "interjections": [...], "emotionalOutbursts": [...] },
  "transitionBeats": [...]
}
```

+ TS export 파일 + 작업 메모

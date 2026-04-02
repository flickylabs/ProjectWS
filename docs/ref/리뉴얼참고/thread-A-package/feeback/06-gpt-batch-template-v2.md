# V3 배치 요청서 V2 — GPT

## 프로젝트 목표

Solomon은 **엔진이 의미를 결정하고, 스크립트가 Phase 3 응답을 고정 품질로 제공하는** 모바일 심문 게임입니다.

이번 배치는 기존 V2 atom / V3 game loop 생성에 더해 아래를 추가합니다.

1. **BeatScript V2** — responseIntent + angleTag 2축, 가변 밀도, antiRepeat, fatigue / misconception 대응
2. **Dispute 구조 확장** — surface / motive / core 3층, disputeKind, linkEdges, misconception(M0~M4)
3. **Evidence 타이밍 메타** — intent + role + bestAtStates / weakAtStates
4. **자유 심문 hook** — intent 태그 + 허용 envelope + 거부 템플릿
5. **Phase 6 / Result용 구조화 로그 힌트**

---

## 아키텍처 리마인드

- Phase 1~2: JSON 스크립트
- Phase 3: BeatScript V2 선택기
- Phase 6 / Result: AI 유지
- 질문 카드: `fact_pursuit / motive_search / empathy_approach / evidence_present`
- lieState: `S0~S5`
- red herring / shared misconception 전용 misconception state: `M0~M4`
- **절대 금지**: `질문유형 × 상태 × 증거 × 분기 × 변형` 전면 카르테시안 스크립트화

---

## 출력 파일 (사건별 4개)

### 파일 1 — `{{CASE_ID}}-v2-atoms.json`
기존 ClaimPolicyV2 output.
단, 아래 타입 drift를 반영해도 좋습니다.

- `fallbackPublicClaim` 허용
- slot 확장 허용: `place`, `dateTimeExact`, `thresholdExact`, `thresholdNeutral`
- tag 확장 허용: `location`

### 파일 2 — `{{CASE_ID}}-beats-v2.json`
```json
{
  "caseId": "{{CASE_ID}}",
  "schemaVersion": "beat_v2",
  "executableTells": { "a": [...], "b": [...] },
  "beatScripts": [...]
}
```

### 파일 3 — `{{CASE_ID}}-v3-game-loop-v2.json`
```json
{
  "caseId": "{{CASE_ID}}",
  "dossierCards": [...],
  "stateUnlockAtoms": { "a": {...}, "b": {...} },
  "events": { "contradictions": [...], "interjections": [...], "emotionalOutbursts": [...] },
  "transitionBeats": [...]
}
```

### 파일 4 — `{{CASE_ID}}-structure-v2.json`
```json
{
  "caseId": "{{CASE_ID}}",
  "disputes": [...],
  "evidence": [...],
  "freeQuestionHooks": [...],
  "phase3LogHints": {...}
}
```

---

## 요청 A — ClaimPolicy V2 (기존 + 타입 drift 반영)

각 파티 × 쟁점 × S0~S5 state마다 ClaimPolicyV2 생성.

### 원칙
1. publicClaim / fallbackPublicClaim의 각 문장을 1~2개 atom으로 분해
2. 숫자/날짜/인명/장소는 반드시 slot으로 분리
3. S0~S1은 회피/부정, S2~S3은 부분 인정/반격, S4~S5는 감정/시인
4. privateKnowledge는 고 state atom의 소재로 재사용
5. 가짜 쟁점은 **lieState 자백용 atom**이 아니라 **오해/맥락 복원용 atom** 우선
6. 기존 atom 태그 외 `location`이 필요하면 허용

---

## 요청 B — BeatScript V2

### 핵심 필드
각 beat는 아래 구조를 따릅니다.

```json
{
  "id": "spouse01.a.d1.surface.s1.pressure.timeline.01",
  "schemaVersion": "beat_v2",
  "caseId": "spouse-01",
  "party": "a",
  "disputeId": "d-1",
  "beatType": "deny",
  "line": "대사",
  "behaviorHint": "연출",
  "applicableStates": ["S0", "S1"],

  "layer": "surface",
  "issueRole": "core_truth",
  "responseIntent": "pressure_response",
  "angleTag": "timeline",
  "actionFamily": "question",
  "questionTypes": ["fact_pursuit"],

  "conditions": {
    "emotionTiers": ["calm", "agitated"],
    "trustWindowBands": ["closed", "narrow"],
    "fatigueLevels": ["fresh", "wary"],
    "blockedVectors": [],
    "requiresFlags": [],
    "forbidsFlags": []
  },

  "truthEnvelope": {
    "allowAtomIds": ["d1.movement_only"],
    "forbidAtomIds": ["d1.recipient_identity_full"]
  },

  "weight": 6,
  "priority": 30,
  "cooldownTurns": 2,
  "maxUsesPerCase": 1,
  "antiRepeatGroup": "a.d1.surface.pressure.timeline",
  "coverageKey": "a.d1.surface.early.pressure.timeline",
  "variantTarget": 6,
  "setFlags": ["d1.surface.timeline_pressed"],
  "tags": ["number_first"]
}
```

### 반드시 반영할 설계
1. **responseIntent + angleTag** 2축
2. **조건 분기 6축**
   - afterEvidence
   - emotionTier
   - trustWindow
   - fatigueLevel
   - interjectionState / trapState
   - blockedVectors
3. **truthEnvelope** (allow / forbid atom)
4. **antiRepeatGroup + cooldown**
5. **beliefMode** (`knows / suspects / misbelief / weaponizes`) — red_herring/shared_misconception일 때만

### Beat density 규칙
- **핫 노드**: 6~8 variants
- **중간 노드**: 4~5 variants
- **콜드 노드**: 2~3 variants
- **TransitionBeat**: 1~2 variants
- 균등 ×5 금지

### Beat coverage matrix (필수)
아래 조합은 최소 1개 이상 authoring.
주요 dispute 기준으로 빠짐없이 생성해 주세요.

- `question × early(S0~S1) × timeline`
- `question × early(S0~S1) × identity/context`
- `question × mid(S2~S3) × responsibility`
- `question × mid(S2~S3) × motive`
- `question × late(S4~S5) × emotion`
- `evidence × early|mid × context|identity|legality`
- `fatigue × mid × responsibility|timeline`
- `free_question × late × motive|emotion`
- `red_herring × M0~M2 × identity|context`
- `red_herring × M3~M4 × context|emotion`

### Fatigue beats (필수)
각 핵심 dispute에 최소 다음 3종:
1. **2회차 짜증**
2. **3회차 차단**
3. **고피로 반격**

### Interjection beats (필수)
allow 시:
- 새 정보 / link reveal / trap signal 중 최소 1개

block 시:
- sentenceCount 감소 / authority 변화 / resentment flag 중 최소 1개

### Free question hooks (필수)
질문 intent 분류용 태그를 함께 만듭니다.

intent 예시:
- identity_check
- motive_probe
- schedule_check
- responsibility_probe
- relationship_probe
- emotional_probe

각 hook에는:
- `allowedAtStates`
- `allowedIssueRoles`
- `answerEnvelope` (말해도 되는 atom / 금지 atom)
- `refusalTemplates` 2~3개

**금지:** 자유 심문 단독으로 lieState +1

---

## 요청 C — Structure V2 (신규)

### Dispute 확장
모든 dispute에 아래를 생성합니다.

```json
{
  "id": "d-1",
  "name": "쟁점명",
  "disputeKind": "core_truth",
  "depthLayers": [
    {
      "id": "surface",
      "label": "표면",
      "summary": "무슨 일이 있었나",
      "lockedSummary": "겉으로 보이는 사실만 보입니다.",
      "unlockCondition": {}
    },
    {
      "id": "motive",
      "label": "동기",
      "summary": "왜 그랬나",
      "lockedSummary": "아직 이 쟁점의 이유가 남아 있습니다.",
      "unlockCondition": {
        "requireDisputes": [{ "id": "d-1", "minState": "S2" }]
      }
    },
    {
      "id": "core",
      "label": "핵심",
      "summary": "관계의 본질",
      "lockedSummary": "이 쟁점의 안쪽이 아직 닫혀 있습니다.",
      "unlockCondition": {
        "requireDisputes": [{ "id": "d-1", "minState": "S4" }]
      }
    }
  ]
}
```

### disputeKind
- `core_truth`
- `sub_truth`
- `red_herring`
- `shared_misconception`

### misconception (red_herring/shared_misconception만)
```json
{
  "beliefModeByParty": { "a": "knows", "b": "misbelief" },
  "stages": [
    { "state": "M0", "summary": "외형상 의심", "npcMode": "confused_defensive" },
    { "state": "M1", "summary": "방어/당황", "npcMode": "mistaken_certainty" },
    { "state": "M2", "summary": "잘못된 해석 고착", "npcMode": "mistaken_certainty" },
    { "state": "M3", "summary": "혼란/확신 약화", "npcMode": "doubt_creeping" },
    { "state": "M4", "summary": "오해 해소", "npcMode": "clarified" }
  ],
  "trapSignals": ["cropped_chat", "ambiguous_location"],
  "truthExitEvidenceIds": ["e-3", "e-4"]
}
```

### Link Edge
사건당 총 3~5개, 쟁점당 최대 2개.

타입:
- `supports`
- `weakens_counter`
- `unlocks_layer`
- `retaliation`

예시:
```json
{
  "id": "link-d1-d5-01",
  "fromDisputeId": "d-1",
  "toDisputeId": "d-5",
  "type": "supports",
  "when": { "minState": "S3", "minLayer": "motive" },
  "effect": { "supportBonus": 15, "grantFlag": "d1_supports_d5" },
  "uiLabel": "먼저 깬 쪽"
}
```

---

## 요청 D — Evidence timing metadata

각 evidence에 아래를 생성합니다.

```json
{
  "id": "e-1",
  "timing": {
    "intent": "expose",
    "role": "establish",
    "bestAtStates": ["S1", "S2"],
    "weakAtStates": ["S0"],
    "preferredQuestionTypes": ["fact_pursuit", "evidence_present"],
    "preferredAngles": ["timeline", "responsibility"],
    "blockedVectorsHelp": ["identity", "context"],
    "criticalWindows": [
      {
        "disputeId": "d-1",
        "state": "S2",
        "multiplier": 1.35,
        "note": "부분 인정 직후 제시"
      }
    ]
  }
}
```

intent:
- `expose`
- `contextualize`
- `corroborate`
- `disarm_trap`

role:
- `establish`
- `reframe`
- `impeach`
- `finish`

---

## 요청 E — V3 Game Loop (기존 + 확장)

### DossierCard
기존 구조 유지.
단, target question text는 가능하면 `angleTag`가 드러나게 작성합니다.

### StateUnlockAtom
기존 구조 유지.
단, surface / motive / core 중 어느 층에서 주로 쓰이는지 추정 가능하게 factText를 작성합니다.

### Events
- contradiction 3~4개
- interjection 3개
- emotionalOutburst 양측 각 2개
- event text는 main beat를 대체하지 않는 **UI lane 텍스트**로 작성

### TransitionBeat
- 파티 × 핵심 dispute × S1→S2→S3→S4→S5
- `primaryBeatType`는 `emotional`을 사용할 수 있음

---

## 요청 F — Phase 6 / Result용 구조화 로그 힌트

structure file에 아래를 포함합니다.

```json
{
  "phase3LogHints": {
    "relationCoreDisputes": ["d-1", "d-5"],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "trap_chaser",
      "link_first"
    ]
  }
}
```

실제 런타임 로그 필드:
- `revealedAtoms`
- `disprovedFakeIssues`
- `resolvedLinks`
- `relationCoreRevealed`
- `playerStyleTags`

---

## 작성 규칙

1. **작성 단가 1분 이하 필드만 추가**
2. layer는 무조건 `surface / motive / core` 3층
3. 사건당 red_herring는 1~2개
4. link는 총 3~5개
5. fatigue beat / misconception beat / free question refusal을 반드시 포함
6. 숫자/날짜/이름/장소는 slot 분리
7. 기존 데이터와 충돌하면 **의미 일관성 > 문장 재사용**
8. raw prose 대신 **게임에서 고르는 데이터**를 우선 생성

---

## 이번 배치 대상 사건

{{CASE_LIST}}

각 사건 원본 JSON을 읽고 사건별로 위 4개 파일과 TS export 버전을 생성해 주세요.
JSON은 유효해야 하며, 동일 사건 안에서 ID 충돌이 없어야 합니다.

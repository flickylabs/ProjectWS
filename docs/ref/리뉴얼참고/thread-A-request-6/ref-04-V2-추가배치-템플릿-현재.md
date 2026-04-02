# V2 추가 배치 요청서 — GPT

## 전제 조건

이 요청서는 **V1 배치가 이미 완료된 사건**에 V2 확장 데이터를 추가 생성합니다.
V1 산출물(v2-atoms + tells-beats + v3-game-loop-data)이 첨부되어 있어야 합니다.

---

## 프로젝트 배경

Solomon은 **엔진이 의미를 결정하고, 스크립트가 Phase 3 응답을 고정 품질로 제공하는** 모바일 심문 게임입니다.

Phase 3의 NPC 응답은 BeatScript V2 선택기가 결정합니다:
- 질문 카드: `fact_pursuit / motive_search / empathy_approach / evidence_present`
- lieState: `S0~S5`
- red herring / shared misconception 전용: `M0~M4`
- **절대 금지**: `질문유형 × 상태 × 증거 × 분기 × 변형` 전면 카르테시안 스크립트화

---

## ⚠️ 필수 규칙: ID 네이밍

> **아래 규칙은 절대적**입니다. V1 배치와 동일한 ID 규칙을 따릅니다.

### 공통 규칙
- **구분자는 반드시 콜론(`:`)** — 점(`.`), 언더스코어(`_`), 하이픈(`-`)을 구분자로 쓰지 마세요
- **caseId 접두사에 하이픈 없음**: `family02`, `friend05` (O) / `family-02`, `friend-05` (X)
- **state는 소문자**: `s0`, `s1`, `s2` (O) / `S0`, `S1` (X) (단, `applicableStates` 배열값은 대문자 `"S0"`, `"S2"` 사용)

### BeatScript V2 ID 패턴
```
{{CASE}}:beat_v2:{{PARTY}}:{{DISPUTE}}:{{LAYER}}:{{INTENT}}:{{ANGLE}}:{{INDEX}}
```
- 예: `family02:beat_v2:a:d-1:surface:pressure:timeline:01`
- `{{CASE}}`: hyphens 제거 (`family-02` → `family02`)
- `{{PARTY}}`: `a` 또는 `b`
- `{{DISPUTE}}`: `d-1`, `d-2` 등
- `{{LAYER}}`: `surface`, `motive`, `core`
- `{{INTENT}}`: `pressure`, `motive`, `rapport`, `evidence`, `fatigue`, `trap`
- `{{ANGLE}}`: `timeline`, `responsibility`, `identity`, `context`, `emotion`, `legality`, `motive`
- `{{INDEX}}`: `01`, `02`, `03`...

### antiRepeatGroup 패턴
```
{{PARTY}}:{{DISPUTE}}:{{LAYER}}:{{INTENT}}:{{ANGLE}}
```
- 예: `a:d-1:surface:pressure:timeline`

### coverageKey 패턴
```
{{PARTY}}:{{DISPUTE}}:{{LAYER}}:{{STAGE}}:{{INTENT}}:{{ANGLE}}
```
- 예: `a:d-1:surface:early:pressure:timeline`

### setFlags / requiresFlags 패턴
```
{{DISPUTE}}:{{LAYER}}:{{FLAG_NAME}}
```
- 예: `d-1:surface:timeline_pressed`

### Link Edge ID 패턴
```
link:{{FROM}}:{{TO}}:{{TYPE}}
```
- 예: `link:d-1:d-5:supports`

### truthEnvelope atom ID
- V1의 ClaimAtom ID를 그대로 사용: `{{CASE}}:{{PARTY}}:{{DISPUTE}}:{{TAG}}:{{INDEX}}`
- V1에 없는 atom은 proposed ID: `{{CASE}}:{{PARTY}}:{{DISPUTE}}:unlock:{{STATE}}:{{INDEX}}`

---

## 출력 파일 (사건별 2개)

### 파일 1 — `{{CASE_ID}}-structure-v2.json`
```json
{
  "caseId": "{{CASE_ID}}",
  "schemaVersion": "structure_v2",
  "disputes": [...],
  "evidence": [...],
  "freeQuestionHooks": [...],
  "phase3LogHints": {...}
}
```

### 파일 2 — `{{CASE_ID}}-beats-v2-full.json`
```json
{
  "caseId": "{{CASE_ID}}",
  "schemaVersion": "beat_v2_full",
  "coverageSummary": { "totalBeats": N, ... },
  "beats": [...]
}
```

각 파일의 TS export 버전도 함께 출력해 주세요.

---

## 요청 A — Structure V2

### Dispute 확장
모든 dispute에 아래를 생성합니다.

**disputeKind** (필수):
- `core_truth` — 사건의 핵심 쟁점
- `sub_truth` — 핵심의 하위 맥락
- `red_herring` — 가짜 쟁점 (오해)
- `shared_misconception` — 양측 모두 잘못 믿는 쟁점

**depthLayers** (필수, 3층):
```json
{
  "id": "surface",
  "label": "표면",
  "summary": "무슨 일이 있었나",
  "lockedSummary": "겉으로 보이는 사실만 보입니다.",
  "unlockCondition": {},
  "revealAtomIds": ["V1 atom ID 또는 proposed ID"],
  "uiStyle": "card_expand"
}
```
- `surface`: 항상 열림 (`unlockCondition: {}`)
- `motive`: `requireDisputes: [{ "id": "d-1", "minState": "S2" }]` 등
- `core`: `requireDisputes` + `requireFlags` 조합. `uiStyle: "relation_core"`

**misconception** (red_herring / shared_misconception만):
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
  "trapSignals": ["..."],
  "truthExitEvidenceIds": ["e-3", "e-4"]
}
```

**linkEdges** (사건당 3~5개, 쟁점당 최대 2개):
```json
{
  "id": "link:d-1:d-5:supports",
  "fromDisputeId": "d-1",
  "toDisputeId": "d-5",
  "type": "supports",
  "when": { "minState": "S2", "minLayer": "surface" },
  "effect": { "supportBonus": 12, "grantFlag": "d-5:first_breach_enabled" },
  "uiLabel": "먼저 깬 쪽"
}
```
타입: `supports` / `weakens_counter` / `unlocks_layer` / `retaliation`

### Evidence timing metadata
각 evidence에 아래를 추가:
```json
{
  "id": "e-1",
  "timing": {
    "intent": "expose|contextualize|corroborate|disarm_trap",
    "role": "establish|reframe|impeach|finish",
    "bestAtStates": ["S1", "S2"],
    "weakAtStates": ["S0"],
    "preferredQuestionTypes": ["fact_pursuit"],
    "preferredAngles": ["timeline"],
    "blockedVectorsHelp": ["identity", "context"],
    "criticalWindows": [{ "disputeId": "d-1", "state": "S2", "multiplier": 1.35, "note": "..." }]
  }
}
```

### Free question hooks (6~8개)
```json
{
  "id": "fq:d-1:recipient_identity",
  "intentTag": "identity_check",
  "allowedAtStates": ["S2", "S3", "S4"],
  "allowedIssueRoles": ["core_truth"],
  "answerEnvelope": {
    "disputeId": "d-1",
    "allowAtomIds": ["V1 atom ID"],
    "preferredAngleTags": ["identity"]
  },
  "refusalTemplates": ["거부 대사 1", "거부 대사 2"]
}
```
**금지:** 자유 심문 단독으로 lieState +1

### Phase 3 log hints
```json
{
  "phase3LogHints": {
    "relationCoreDisputes": ["d-1", "d-5"],
    "playerStyleTagCandidates": ["pressure_heavy", "rapport_heavy", "evidence_closer", "trap_chaser"]
  }
}
```

---

## 요청 B — BeatScript V2

### 핵심 필드
```json
{
  "id": "family02:beat_v2:a:d-1:surface:pressure:timeline:01",
  "schemaVersion": "beat_v2",
  "caseId": "family-02",
  "party": "a",
  "disputeId": "d-1",
  "beatType": "deny",
  "line": "대사 1~3문장",
  "behaviorHint": "연출 지시",
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
    "fatigueLevels": ["fresh", "wary"]
  },

  "truthEnvelope": {
    "allowAtomIds": ["family02:a:d-1:act:0"],
    "forbidAtomIds": ["family02:a:d-1:admission:0"]
  },

  "weight": 6,
  "priority": 30,
  "cooldownTurns": 2,
  "maxUsesPerCase": 1,
  "antiRepeatGroup": "a:d-1:surface:pressure:timeline",
  "coverageKey": "a:d-1:surface:early:pressure:timeline",
  "variantTarget": 6,
  "setFlags": ["d-1:surface:timeline_pressed"],
  "tags": ["hot"]
}
```

### responseIntent (6종)
- `pressure_response` — 사실추궁 계열
- `motive_response` — 동기탐색 계열
- `rapport_response` — 공감접근 계열
- `evidence_response` — 증거 제시 후
- `fatigue_response` — 피로 누적 시
- `trap_confusion_response` — red_herring/misconception

### angleTag (7종)
- `timeline` / `motive` / `responsibility` / `identity` / `context` / `legality` / `emotion`

### Beat density 규칙
- **핫 노드** (S0~S1 사실추궁): 6~8 variants
- **중간 노드** (S2~S3 다양 질문): 4~5 variants
- **콜드 노드** (증거/희귀): 2~3 variants
- **TransitionBeat**: 1~2 variants
- 균등 ×5 금지

### Beat coverage matrix (필수)
- `question × early(S0~S1) × timeline`
- `question × early(S0~S1) × identity/context`
- `question × mid(S2~S3) × responsibility`
- `question × mid(S2~S3) × motive`
- `question × late(S4~S5) × emotion`
- `evidence × early|mid × context|identity|legality`
- `fatigue × mid × responsibility|timeline` (각 핵심 dispute에 3종: 2회차 짜증/3회차 차단/고피로 반격)
- `free_question × late × motive|emotion`
- `red_herring × M0~M2 × identity|context` (red_herring 쟁점이 있을 때만)
- `red_herring × M3~M4 × context|emotion` (red_herring 쟁점이 있을 때만)

### Interjection beats (필수)
- allow 2개 + block 2개 (최소)
- `tags: ["interjection", "allow"]` 또는 `["interjection", "block"]`

### 총 40~60개 beat / 사건

---

## 작성 규칙

1. **작성 단가 1분 이하 필드만 추가**
2. layer는 무조건 `surface / motive / core` 3층
3. 사건당 red_herring는 1~2개 (해당 사건에 오해 쟁점이 있을 때만)
4. link는 총 3~5개
5. fatigue beat / interjection beat을 반드시 포함
6. 숫자/날짜/이름/장소는 slot 분리
7. truthEnvelope의 atom ID는 첨부된 V1 `v2-atoms.json`에서 검색하여 사용
8. V1에 없는 atom은 `proposedUnlockAtoms` 배열에 추가

---

## 최종 체크리스트

- [ ] 모든 ID가 콜론(`:`) 구분자 사용
- [ ] caseId 접두사에 하이픈 없음 (`family02` O, `family-02` X)
- [ ] disputeKind가 모든 dispute에 있음
- [ ] depthLayers가 모든 dispute에 3층
- [ ] linkEdges 3~5개
- [ ] evidence timing이 모든 evidence에 있음
- [ ] freeQuestionHooks 6~8개
- [ ] beats 총 40~60개 + fatigue 3종/dispute + interjection allow2+block2
- [ ] truthEnvelope atom ID가 V1 데이터와 일치

---

## 이번 배치 대상 사건

{{CASE_LIST}}

각 사건의 V1 산출물(v2-atoms.json + v3-game-loop-data.json + 사건원본.json)이 첨부되어 있습니다.
사건별로 위 2개 파일(structure-v2 + beats-v2-full)과 TS export 버전을 생성해 주세요.

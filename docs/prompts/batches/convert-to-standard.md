당신이 이전에 생성한 2개 사건 JSON 배열을 아래의 정확한 스키마로 변환해 주세요.

## 핵심 원칙

1. 스토리, 캐릭터, 쟁점, 증거, 거짓말의 **핵심 설정과 관계는 보존**.
2. 각 필드의 **형식, 길이, 구조는 아래 스키마 예시에 맞게 다시 작성**. 원문을 그대로 복사하지 마세요.
3. 원본에 없는 필드는 사건 맥락에 맞게 **창작**.

## Before/After 예시

### Before (비표준)
```json
"parties": {
  "a": {
    "name": "김나연",
    "role": "705호 아랫집 입주민",
    "archetype": "기록 집착형 피해자",
    "verbalTells": ["정확히 말하면", "기록은 남아 있어요", "저만 예민한 게 아니에요"]
  }
}
```

### After (표준)
```json
"duo": {
  "partyA": {
    "name": "김나연",
    "age": 34,
    "occupation": "705호 아랫집 입주민 (프리랜서 번역가)",
    "incomeBracket": "mid",
    "archetype": "cold_logic",
    "speechStyle": "문제가 생기면 즉시 시간, 날짜, 데시벨 수치를 나열하며 감정 대신 기록으로 말한다. 불리해지면 '기록을 보시죠'라며 대화를 데이터 싸움으로 전환한다.",
    "pride": 7,
    "fear": "자신의 민원이 예민한 사람의 투정으로 치부되는 것",
    "riskAppetite": 3,
    "digitalHabit": "messenger_main",
    "dailyRoutine": "오전엔 재택 번역, 오후엔 카페 작업, 밤에는 층간소음이 걱정되어 일찍 취침하려 한다.",
    "sensitivePoints": ["예민하다는 평가", "혼자 산다는 사실", "이전 민원 이력"],
    "verbalTells": [
      {"type": "data_shield", "trigger": "lying", "pattern": "불리한 질문이 오면 '기록을 보시면 됩니다'라며 감정을 차단하고 수치로 대응한다."},
      {"type": "repetition_emphasis", "trigger": "cornered", "pattern": "'정확히 말하면'을 반복하며 시간을 벌고, 핵심 질문에서 벗어나려 한다."},
      {"type": "victim_framing", "trigger": "emotional", "pattern": "'저만 예민한 게 아니에요'라며 다른 피해자가 있다는 뉘앙스를 풍긴다."}
    ]
  }
}
```

### Before (비표준 issues)
```json
"issues": [{
  "issueId": "I1",
  "statement": "B는 항의를 받은 뒤에도 자정 이후 제습기를 최소 두 번 가동했다.",
  "truth": true,
  "knowledgeQuadrant": "both_know",
  "whyItMatters": "A의 수면 방해가 실제였는지와 B의 배려 의무 위반을 가른다."
}]
```

### After (표준 disputes)
```json
"disputes": [{
  "id": "d-1",
  "name": "B의 자정 이후 제습기 가동",
  "truth": true,
  "truthDescription": "B는 A의 항의 이후에도 자정 넘어 제습기를 최소 두 번 가동했다. A의 수면 방해는 실재했으며 B의 배려 의무 위반이 인정된다.",
  "quadrant": "both_know",
  "requiredEvidence": ["e-1", "e-4"],
  "correctResponsibility": {"a": 20, "b": 80},
  "ambiguity": "low",
  "weight": "high",
  "mediationLink": "소음관리",
  "legitimacyIssue": false
}]
```

### Before (비표준 evidence)
```json
"evidence": [{
  "evidenceId": "E1",
  "title": "스마트폰 소음 측정 스크린샷",
  "type": "소음 측정기록",
  "holder": "A",
  "summary": "비가 많이 오던 이틀 밤 23:48, 00:11에 52~58dB 급상승이 찍혀 있다.",
  "reveals": ["I1"],
  "requires": [],
  "strength": "soft",
  "legitimacy": "clean",
  "isTrap": true
}]
```

### After (표준 evidence)
```json
"evidence": [{
  "id": "e-1",
  "name": "스마트폰 소음 측정 스크린샷",
  "description": "비가 많이 오던 이틀 밤 23:48과 00:11에 52~58dB 급상승이 기록돼 있다. 소음 존재는 확인되지만 소음의 정확한 원인(제습기인지, 빗소리인지)은 이 자료만으로 특정할 수 없다.",
  "type": "device",
  "reliability": "soft",
  "completeness": "partial",
  "provenance": "self_possessed",
  "legitimacy": "lawful",
  "proves": ["d-1"],
  "isTrap": true,
  "requires": [],
  "investigationResults": {
    "request_original": "앱 원본 기록에는 측정 시각과 dB 수치가 남아 있으나 소음원 분석 기능은 없다.",
    "check_metadata": "스크린샷 촬영 시각은 새벽 0시 15분이며 측정 앱 버전과 기기 모델이 일치한다.",
    "restore_context": "같은 시간대에 장마 빗소리가 있었고, 제습기와 빗소리를 분리할 근거는 부족하다.",
    "verify_source": "A 본인 기기에서 직접 측정한 자료로, 외부 검증 기관을 거치지 않았다.",
    "check_edits": "스크린샷 자체의 편집 흔적은 없으나 측정 전후 기록이 잘려 있다.",
    "question_acquisition": "자기 집 내부에서 측정한 것이라 취득 경위에 문제는 없다."
  }
}]
```

### Before (비표준 lies)
```json
"lies": {
  "a": [{
    "lieId": "A-L1",
    "statement": "나는 B 집을 특정해서 공개한 적 없다.",
    "type": "LT-1",
    "motive": "face_saving",
    "collapseViaEvidence": ["E2"],
    "collapseViaTrust": false
  }]
}
```

### After (표준 lieConfig)
```json
"lieConfigA": [{
  "disputeId": "d-2",
  "lieType": "LT-1",
  "lieIntensity": "L2",
  "lieMotive": "face_saving",
  "initialState": "S0",
  "collapseViaTrust": false,
  "transitions": [
    {"from": "S0", "to": "S1", "trigger": "direct_question"},
    {"from": "S1", "to": "S2", "trigger": "e-2_presented"},
    {"from": "S2", "to": "S3", "trigger": "motive_question"},
    {"from": "S3", "to": "S5", "trigger": "e-2_and_e-3_combined"}
  ]
}]
```

## 필드별 상세 변환 규칙

### ID 변환
- issueId `I1`→`d-1`, `I2`→`d-2` ...
- evidenceId `E1`→`e-1`, `E2`→`e-2` ...
- 모든 참조(reveals, requires, collapseViaEvidence 등)의 ID도 변환

### meta (원본 최상위 필드에서 조합)
| 원본 | 표준 |
|------|------|
| `conflictCode` | `meta.conflictSeed` |
| `variantCode` | `meta.variableModules` (배열: `"VM-C"` → `["VM-C"]`) |
| `twist.code` | `meta.twistModule` (없으면 `null`) |
| `difficulty` | `meta.difficulty` |
| `anchorTruth` | `meta.anchorTruth` |
| `resolutionDilemma` | `meta.resolutionDilemma` |
| `summary`에서 추출 | `meta.emotionalBait` — 플레이어가 처음 착각할 표면 이슈 1문장 |
| `relationship` | `meta.relationshipType` + `duo.relationshipType` (둘 다) |

### duo.partyA / partyB
| 원본 | 표준 | 주의 |
|------|------|------|
| `parties.a.name` | `duo.partyA.name` | |
| `parties.a.role` | `duo.partyA.occupation` | |
| `parties.a.archetype` (한글) | `duo.partyA.archetype` | 아래 변환표 사용 |
| `parties.a.verbalTells` (문자열[]) | `duo.partyA.verbalTells` (객체[]) | 아래 변환 규칙 |
| 없음 | `age` | 사건 맥락에 맞게 창작 (25~65) |
| 없음 | `incomeBracket` | `low\|mid\|high` |
| 없음 | `speechStyle` | **2~3문장**으로 말투 묘사. verbalTells를 복사하지 말 것 |
| 없음 | `pride` | 1~10, archetype 참고 |
| 없음 | `fear` | 이 사건에서 가장 두려운 것 1문장 |
| 없음 | `riskAppetite` | 1~10 |
| 없음 | `digitalHabit` | `sns_active\|messenger_main\|minimal` |
| 없음 | `dailyRoutine` | 직업에 맞는 생활패턴 1문장 |
| 없음 | `sensitivePoints` | 2~3개, 사건 관련 민감 주제 |
| `openingStatements` | 버림 | speechStyle 톤 참고만 |

### archetype 한글 → 영문
- 회피/체면/소극 → `avoidant`
- 공격/직설/집착/즉시/공개 → `confrontational`
- 피해/호소/감정 → `victim_cosplay`
- 논리/기록/정밀/계산/규칙 → `cold_logic`

### verbalTells 변환
원본 문자열 하나당 → 객체 하나. trigger 배정:
- 첫 번째 → `lying` (거짓말할 때 나오는 습관)
- 두 번째 → `cornered` (궁지에 몰렸을 때)
- 세 번째 → `emotional` (감정적일 때)

**pattern은 원본 문자열을 그대로 쓰지 말고**, 위 Before/After 예시처럼 상황과 함께 2문장으로 확장.

### relationshipLedger
```
원본: {"status": "confirmed", "entry": "택배를 대신 받아 준 적이 있다."}
표준: {"id": "ledger-1", "category": "confirmed", "description": "작년 겨울 B가 A의 택배를 대신 받아 준 적이 있어 완전히 단절된 사이는 아니었다.", "isReal": true, "whoRemembersAccurately": "both", "whoDistorts": "none", "distortionDirection": "", "currentlyResolved": "surface_only", "emotionalResidue": "mild", "connectionToCurrent": "indirect"}
```
- `status` → `category` (confirmed/distorted/silenced)
- `entry` → `description` (2문장으로 확장)
- 나머지 필드는 사건 맥락에 맞게 채우기

### socialGraph
```
원본: {"name": "이주연", "role": "관리사무소 대리", "connectionToA": "민원 접수...", "connectionToB": "점검 요청..."}
표준: {"id": "tp-1", "slot": "institutional", "name": "이주연 (관리사무소 대리)", "relationTo": "both", "knowledgeScope": "A의 민원 3회 접수와 B의 점검 일정 연기 2회를 직접 처리했다.", "witnessedDirectly": true, "bias": "neutral", "distortionRisk": "accurate"}
```
- slot: 가족→`family_1`/`family_2`, 지인→`acquaintance_1`/`acquaintance_2`, 기관→`institutional`
- knowledgeScope: connectionToA + connectionToB를 합쳐서 1~2문장

### context
| 원본 | 표준 | 주의 |
|------|------|------|
| `setting` | `context.description` | **2~3문장으로 확장** |
| 없음 | `context.contextType` | setting에서 추론 (rainy_season, post_meeting, moving 등) |
| 없음 | `context.emotionalPressure` | 1~10, 사건 긴장도에 맞게 |
| 없음 | `context.affects` | `a\|b\|both` |
| `summary` 일부 | `context.triggerAmplifier` | 왜 지금 이 시점에 터졌는지 1문장 |

### disputes
| 원본 | 표준 | 주의 |
|------|------|------|
| `issues[].issueId` | `disputes[].id` | I1→d-1 |
| `issues[].statement` | `disputes[].name` | **40자 이하 라벨로 요약** (원문 복사 금지) |
| `issues[].truth` | `disputes[].truth` | |
| `issues[].whyItMatters` | `disputes[].truthDescription` | **2~3문장으로 다시 작성** |
| `issues[].knowledgeQuadrant` | `disputes[].quadrant` | |
| 없음 | `requiredEvidence` | evidence.proves에서 역추적 |
| `faultShare` 참고 | `correctResponsibility` | **쟁점마다 다르게** (faultShare는 전체 평균) |
| 없음 | `ambiguity` | `none\|low\|high` |
| 없음 | `weight` | `high`(핵심 2개) / `medium`(2개) / `low`(1개) |
| 없음 | `mediationLink` | 해결책 카테고리명 |
| 없음 | `legitimacyIssue` | 증거 취득 정당성 관련이면 true |

### evidence
| 원본 | 표준 | 주의 |
|------|------|------|
| `evidenceId` | `id` | E1→e-1 |
| `title` | `name` | |
| `summary` | `description` | **2~3문장으로 확장** |
| `type` (한글) | `type` | `bank\|chat\|cctv\|contract\|testimony\|log\|device\|sns` |
| `strength` | `reliability` | soft/hard |
| `legitimacy` | `legitimacy` | clean→`lawful`, questionable→`privacy_concern`, illegal→`unlawful` |
| `reveals` | `proves` | ID 변환 |
| `requires` | `requires` | ID 변환 |
| `holder` | `provenance` | A/B→`self_possessed`, 이름→`third_party`, 기관→`institutional` |
| 없음 | `completeness` | `original\|edited\|partial\|context_missing` |
| 없음 | `investigationResults` | **6가지 모두 필수**, 각 1~2문장 |

### evidenceCombinations (원본에 없음, 창작)
soft 증거 2개를 조합하면 hard로 격상되는 조합 최소 1개. 예시:
```json
{"requires": ["e-1", "e-4"], "upgradesTo": "hard", "proves": ["d-1"]}
```

### truthTable (원본 issues에서 변환)
쟁점 수만큼 생성:
```json
{"id": "t-1", "fact": "쟁점의 진실을 한 문장으로", "isTrue": true, "weight": 10, "quadrant": "both_know"}
```

### lieConfig (원본 lies에서 변환)
| 원본 | 표준 | 주의 |
|------|------|------|
| `lies.a[]` | `lieConfigA[]` | |
| `lies[].type` | `lieType` | LT-1~LT-7 |
| `lies[].motive` | `lieMotive` | |
| `lies[].collapseViaTrust` | `collapseViaTrust` | |
| 없음 | `disputeId` | **collapseViaEvidence의 증거가 어떤 쟁점(proves)을 가리키는지 역추적** |
| 없음 | `lieIntensity` | LT-1(완전부정): L2~L3, LT-2(부분인정): L1~L2, LT-3~7: 상황 판단 |
| `collapseViaEvidence` | `transitions` | **사건 맞춤 전이 경로** 3~4단계. 위 Before/After 예시 참고 |

### solutions (원본 solutionOptions에서 변환)
원본이 전체 1세트(온건/중립/강경)이면, 주요 쟁점 2~3개에 대해 카테고리별로 나눠서 작성:
```json
"solutions": {
  "소음관리": ["온건: ...", "중립: ...", "강경: ..."],
  "사생활보호": ["온건: ...", "중립: ...", "강경: ..."]
}
```

## 출력 JSON 전체 구조

```json
[
  {
    "caseId": "case-neighbor-NN",
    "meta": {
      "relationshipType": "neighbor",
      "conflictSeed": "CS-N",
      "variableModules": ["VM-X"],
      "twistModule": "TW-N 또는 null",
      "difficulty": "easy|medium|hard",
      "anchorTruth": "핵심 사실 한 줄",
      "emotionalBait": "표면 이슈 한 줄",
      "resolutionDilemma": "처분이 어려운 지점 한 줄"
    },
    "duo": {
      "partyA": {
        "name": "이름", "age": 35, "occupation": "직업",
        "incomeBracket": "mid",
        "archetype": "avoidant|confrontational|victim_cosplay|cold_logic",
        "speechStyle": "말투 2~3문장",
        "pride": 7, "fear": "두려운 것 1문장", "riskAppetite": 5,
        "digitalHabit": "sns_active|messenger_main|minimal",
        "dailyRoutine": "생활패턴 1문장",
        "sensitivePoints": ["주제1", "주제2"],
        "verbalTells": [
          {"type": "타입명", "trigger": "lying", "pattern": "상황 포함 2문장"},
          {"type": "타입명", "trigger": "cornered", "pattern": "상황 포함 2문장"},
          {"type": "타입명", "trigger": "emotional", "pattern": "상황 포함 2문장"}
        ]
      },
      "partyB": { "...동일 구조, archetype은 A와 다르게..." },
      "relationshipLedger": [
        {"id": "ledger-1", "category": "confirmed", "...전체 필드...": "..."},
        {"id": "ledger-2", "category": "distorted", "...": "..."},
        {"id": "ledger-3", "category": "silenced", "...": "..."}
      ],
      "socialGraph": [
        {"id": "tp-1", "slot": "...", "...전체 필드...": "..."},
        {"id": "tp-2", "...": "..."},
        {"id": "tp-3", "slot": "institutional", "...": "..."}
      ]
    },
    "context": {
      "contextType": "...",
      "description": "배경 2~3문장",
      "emotionalPressure": 7,
      "affects": "a|b|both",
      "triggerAmplifier": "촉발 맥락 1문장"
    },
    "disputes": [
      "...5개, 각각 전체 필드 포함..."
    ],
    "evidence": [
      "...6개, 각각 investigationResults 6가지 포함..."
    ],
    "evidenceCombinations": [
      {"requires": ["e-X", "e-Y"], "upgradesTo": "hard", "proves": ["d-Z"]}
    ],
    "truthTable": [
      "...쟁점 수만큼..."
    ],
    "lieConfigA": ["...A의 거짓말 2~3개, transitions 포함..."],
    "lieConfigB": ["...B의 거짓말 2~3개, transitions 포함..."],
    "solutions": {
      "카테고리1": ["온건", "중립", "강경"],
      "카테고리2": ["온건", "중립", "강경"]
    },
    "activeLedgerEntries": ["ledger-1", "ledger-2"],
    "activeThirdParties": ["tp-3"]
  }
]
```

## 출력 형식

- 반드시 `[사건1, 사건2]` JSON 배열로 출력
- JSON만 출력. 설명, 마크다운, 코드블록 없이 `[` 로 시작해서 `]` 로 끝나야 합니다

---

## 변환할 데이터

아래는 이전에 생성한 2개 사건 JSON 배열입니다. 위 규칙에 따라 변환해 주세요.


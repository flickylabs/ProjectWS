당신이 이전에 생성한 2개 사건 JSON 배열을 아래의 정확한 스키마로 변환해 주세요.

## 변환 규칙

스토리, 캐릭터, 쟁점, 증거, 거짓말 **내용은 100% 보존**하면서, 구조만 아래 스키마에 맞춰 변환합니다.

### 필드 매핑
- `parties.a/b` → `duo.partyA/partyB`
- `issues[]` → `disputes[]` (issueId `I1`→`d-1`, `I2`→`d-2` ...)
- `evidence[].evidenceId` → `evidence[].id` (`E1`→`e-1`, `E2`→`e-2` ...)
- `evidence[].title` → `evidence[].name`
- `evidence[].summary` → `evidence[].description`
- `evidence[].strength` → `evidence[].reliability`
- `evidence[].reveals` → `evidence[].proves` (ID도 변환)
- `evidence[].requires` → `evidence[].requires` (ID도 변환)
- `evidence[].legitimacy`: clean→`lawful`, questionable→`privacy_concern`, illegal→`unlawful`
- `lies.a/b` → `lieConfigA/lieConfigB`
- `relationship` → `duo.relationshipType`
- `solutionOptions` → `solutions`

### 누락 필드는 반드시 창작 추가
- `speechStyle`: archetype과 verbalTells 기반으로 말투 2~3문장
- `fear`: 이 인물이 이 사건에서 가장 두려워하는 것
- `sensitivePoints`: 2~3개, 사건 관련 민감 주제
- `age`, `dailyRoutine`, `pride`(1~10), `riskAppetite`(1~10)
- `digitalHabit`: `sns_active|messenger_main|minimal`
- `incomeBracket`: `low|mid|high`
- `context.emotionalPressure`(1~10), `context.triggerAmplifier`
- `disputes[].weight`: `high|medium|low` — 쟁점마다 다르게
- `disputes[].ambiguity`: `none|low|high`
- `disputes[].correctResponsibility`: **쟁점마다 a+b=100으로 각각 다르게**
- `evidence[].investigationResults`: 증거마다 6가지 조사 결과 텍스트
- `evidence[].completeness`: `original|edited|partial|context_missing`
- `evidenceCombinations`: soft 2개 조합→hard 격상 최소 1개
- `lieConfig[].transitions`: 사건에 맞는 구체적 전이 경로 (어떤 증거/질문이 상태 변화 유발)

### archetype 변환
- 회피/체면/소극 → `avoidant`
- 공격/직설/집착/즉시/공개 → `confrontational`
- 피해/호소/감정 → `victim_cosplay`
- 논리/기록/정밀/계산/규칙 → `cold_logic`

### verbalTells 변환
문자열 → `{"type": "설명", "trigger": "lying|cornered|emotional|avoiding", "pattern": "원본 문자열"}`

### relationshipLedger 변환
`{"status": "confirmed", "entry": "..."}` → `{"id": "ledger-1", "category": "confirmed", "description": "...", "isReal": true, "whoRemembersAccurately": "both", "whoDistorts": "none", "distortionDirection": "", "currentlyResolved": "unresolved", "emotionalResidue": "mild|strong", "connectionToCurrent": "direct|indirect"}`

### socialGraph 변환
`{"name": "...", "role": "...", "connectionToA": "...", "connectionToB": "..."}` → `{"id": "tp-1", "slot": "family_1|acquaintance_1|institutional", "name": "이름 (역할)", "relationTo": "a|b|both", "knowledgeScope": "아는 범위", "witnessedDirectly": true|false, "bias": "pro_a|pro_b|neutral|self_interest", "distortionRisk": "intentional|unconscious|accurate"}`

## 출력 JSON 스키마

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
      "emotionalBait": "표면 이슈",
      "resolutionDilemma": "처분이 어려운 지점"
    },
    "duo": {
      "partyA": {
        "name": "이름", "age": 35, "occupation": "직업",
        "incomeBracket": "mid",
        "archetype": "avoidant|confrontational|victim_cosplay|cold_logic",
        "speechStyle": "말투 2~3문장",
        "pride": 7, "fear": "두려운 것", "riskAppetite": 5,
        "digitalHabit": "sns_active|messenger_main|minimal",
        "dailyRoutine": "생활패턴",
        "sensitivePoints": ["주제1", "주제2"],
        "verbalTells": [
          {"type": "타입명", "trigger": "lying|cornered|emotional|avoiding", "pattern": "습관"}
        ]
      },
      "partyB": { "...동일 구조..." },
      "relationshipLedger": [
        {"id": "ledger-1", "category": "confirmed|distorted|silenced", "description": "...", "isReal": true, "whoRemembersAccurately": "a|b|both", "whoDistorts": "a|b|both|none", "distortionDirection": "", "currentlyResolved": "resolved|unresolved|surface_only", "emotionalResidue": "none|mild|strong", "connectionToCurrent": "direct|indirect|none"}
      ],
      "socialGraph": [
        {"id": "tp-1", "slot": "institutional", "name": "이름 (역할)", "relationTo": "both", "knowledgeScope": "아는 범위", "witnessedDirectly": true, "bias": "neutral", "distortionRisk": "accurate"}
      ]
    },
    "context": {
      "contextType": "상황",
      "description": "배경 2~3문장",
      "emotionalPressure": 7,
      "affects": "a|b|both",
      "triggerAmplifier": "촉발 맥락"
    },
    "disputes": [
      {"id": "d-1", "name": "쟁점명 40자 이하", "truth": true, "truthDescription": "진실 설명", "quadrant": "both_know|a_only|b_only|neither_knows|shared_misconception", "requiredEvidence": ["e-1"], "correctResponsibility": {"a": 60, "b": 40}, "ambiguity": "none|low|high", "weight": "high|medium|low", "mediationLink": "해결 카테고리", "legitimacyIssue": false}
    ],
    "evidence": [
      {"id": "e-1", "name": "증거명", "description": "설명", "type": "bank|chat|cctv|contract|testimony|log|device|sns", "reliability": "hard|soft", "completeness": "original|edited|partial|context_missing", "provenance": "self_possessed|third_party|anonymous|institutional", "legitimacy": "lawful|privacy_concern|unlawful", "proves": ["d-1"], "isTrap": false, "requires": [], "investigationResults": {"request_original": "...", "check_metadata": "...", "restore_context": "...", "verify_source": "...", "check_edits": "...", "question_acquisition": "..."}}
    ],
    "evidenceCombinations": [
      {"requires": ["e-3", "e-4"], "upgradesTo": "hard", "proves": ["d-3"]}
    ],
    "truthTable": [
      {"id": "t-1", "fact": "...", "isTrue": true, "weight": 10, "quadrant": "a_only"}
    ],
    "lieConfigA": [
      {"disputeId": "d-1", "lieType": "LT-1", "lieIntensity": "L2", "lieMotive": "face_saving", "initialState": "S0", "collapseViaTrust": false, "transitions": [{"from": "S0", "to": "S1", "trigger": "..."}, {"from": "S1", "to": "S2", "trigger": "..."}, {"from": "S2", "to": "S5", "trigger": "..."}]}
    ],
    "lieConfigB": ["...동일 구조..."],
    "solutions": {
      "카테고리1": ["온건", "중립", "강경"]
    },
    "activeLedgerEntries": ["ledger-1"],
    "activeThirdParties": ["tp-1"]
  }
]
```

## 출력 형식

- 반드시 `[사건1, 사건2]` JSON 배열로 출력
- JSON만 출력. 설명, 마크다운, 코드블록 없이 `[` 로 시작해서 `]` 로 끝나야 합니다

---

## 변환할 데이터

아래는 이전에 생성한 2개 사건 JSON 배열입니다. 위 스키마로 변환해 주세요.

[
{
"caseId": "case-neighbor-03",
"title": "복도 펫드라이룸의 17초",
"relationship": "neighbor",
"difficulty": "hard",
"conflictCode": "CS-3",
"variantCode": "VM-D+VM-B",
"twist": {
"code": "TW-4",
"reveal": "B가 관리사무소 원본이라고 주장한 영상은 단순히 앞뒤를 자른 편집본이 아니라, 시간표시 레이어와 반복된 짖는 소리를 덧씌운 위조본이었다."
},
"setting": "장대비가 오던 저녁, 단지 반려동물 세척실이 고장 나 몇몇 주민이 복도에서 반려견 털을 말리던 시기",
"summary": "A는 B가 공용 복도를 자기 반려견 건조 공간처럼 쓰다가 사고를 냈고, 이후 편집된 CCTV로 자신을 가해자처럼 몰았다고 주장한다. B는 A가 자기 집 문턱 안까지 들어와 목줄을 잡는 바람에 사고가 커졌다고 맞선다. 실제로 사고 순간에는 B가 복도에 건조 매트, 이동장, 드라이어 선을 펼쳐 통행 공간을 침범했고, A도 자신의 반려견 줄을 느슨하게 한 채 문턱 안으로 개입했다. 더 큰 문제는 B가 원본이라며 돌린 영상이 사고 직전 장면을 잘라내고 시간표시와 소리를 덧씌운 위조본이었다는 점이다. 또한 A 반려견의 상처는 양측이 믿은 물림보다 금속 리드줄 클립이나 발톱에 의한 열상에 가까웠다.",
"openingStatements": {
"a": "B가 복도를 자기 집처럼 쓰다가 우리 개가 다쳤어요. 그런데 제가 먼저 들어왔다며 잘린 영상으로 저를 가해자처럼 만들었습니다.",
"b": "A가 우리 집 문턱까지 들어와 제 개 목줄을 거칠게 잡아서 사고가 커진 겁니다. 제가 낸 영상은 그 장면을 보여 준 것뿐이에요."
},
"parties": {
"a": {
"name": "유다은",
"role": "1502호 반려견 보호자",
"archetype": "과보호형 즉시공개자",
"verbalTells": [
"제가 직접 봤어요",
"우리 개가 먼저 다쳤어요",
"그건 말이 안 되죠"
]
},
"b": {
"name": "강재윤",
"role": "1503호 반려견 보호자",
"archetype": "통제형 합리화가",
"verbalTells": [
"상황을 전체로 보셔야죠",
"그 정도는 통상적이었어요",
"결국 먼저 건드린 건 그쪽입니다"
]
}
},
"relationshipLedger": [
{
"status": "confirmed",
"entry": "두 사람은 예전에는 엘리베이터에서 반려견이 마주치지 않도록 산책 시간을 서로 조율한 적이 있다."
},
{
"status": "distorted",
"entry": "A는 B의 개가 늘 풀려 있었다고 말하지만, 실제로는 대부분 자동줄을 잠근 상태로 데리고 나왔고 사고 당일만 줄 길이가 길었다."
},
{
"status": "silenced",
"entry": "B는 사고 일주일 전 경비원에게 복도에 드라이어 선과 이동장을 두지 말라는 주의를 한 번 받은 사실을 숨긴다."
}
],
"socialGraph": [
{
"name": "조혜인",
"role": "관리사무소 주임",
"connectionToA": "A의 반려견 부상 민원과 전체 CCTV 열람 요청을 접수했다.",
"connectionToB": "B가 단톡방에 올린 17초 영상을 원본이라고 설명하며 제출받았다."
},
{
"name": "이강호",
"role": "야간 경비원",
"connectionToA": "사고 직후 놀란 A를 도와 반려견을 차까지 옮겨 줬다.",
"connectionToB": "이전 순찰 때 B에게 복도 드라이어 선과 매트를 치워 달라고 주의한 적이 있다."
},
{
"name": "문소라",
"role": "1501호 입주민 겸 반려견 보호자",
"connectionToA": "실랑이 직전 A가 떨어뜨린 휴대폰을 줍는 모습을 봤다.",
"connectionToB": "사고 전 이틀 동안 B가 복도에서 개 털을 말리는 장면을 본 적이 있다."
}
],
"issues": [
{
"issueId": "I1",
"statement": "B는 사고 직전 공용 복도에 반려견 건조 매트, 이동장, 드라이어 선을 펼쳐 통행 공간을 좁혔다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "공용 공간 침범과 B의 1차 과실을 가른다."
},
{
"issueId": "I2",
"statement": "A는 실랑이 중 B 집 문턱과 안전펜스 안쪽으로 발을 들여 목줄을 잡았다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "A의 권한 침범과 사고 확대 책임을 판단하게 한다."
},
{
"issueId": "I3",
"statement": "A는 휴대폰을 줍는 순간 자신의 반려견 목줄을 느슨하게 놓아 먼저 접근하게 했다.",
"truth": true,
"knowledgeQuadrant": "a_only",
"whyItMatters": "A도 통제 의무를 다하지 못했는지 판정한다."
},
{
"issueId": "I4",
"statement": "B가 주민들과 관리사무소에 제출한 원본 CCTV는 편집본이며 일부 시간표시와 소리가 덧씌워진 위조본이었다.",
"truth": true,
"knowledgeQuadrant": "b_only",
"whyItMatters": "B의 사후 은폐와 증거 신빙성을 무너뜨리는 핵심이다."
},
{
"issueId": "I5",
"statement": "A 반려견의 상처 직접 원인은 B 반려견의 이빨 물림이었다.",
"truth": false,
"knowledgeQuadrant": "shared_misconception",
"whyItMatters": "핵심 피해 원인이 물림인지 접촉사고인지에 따라 책임 배분이 달라진다."
}
],
"evidence": [
{
"evidenceId": "E1",
"title": "청소 직원 사진과 복도 미끄럼 민원 메모",
"type": "관리사무소 민원기록",
"holder": "관리사무소",
"summary": "사고 20분 전 복도 바닥에 젖은 건조 매트, 이동장, 드라이어 선이 1503호 앞까지 나와 있는 사진과 미끄럼 주의 메모가 남아 있다.",
"reveals": [
"I1"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E2",
"title": "주민 단톡방에 공유된 17초 CCTV 클립",
"type": "CCTV",
"holder": "B",
"summary": "영상은 이미 실랑이가 시작된 뒤부터 나오며 A가 문턱을 넘는 장면과 팔을 뻗는 장면만 두드러지게 보인다. 앞선 복도 점유 상황은 빠져 있고 시간표시와 짖는 소리가 강조돼 있다.",
"reveals": [
"I2"
],
"requires": [],
"strength": "soft",
"legitimacy": "questionable",
"isTrap": true
},
{
"evidenceId": "E3",
"title": "CCTV 반출대장과 서버 저장시간 대조 메모",
"type": "관리사무소 민원기록",
"holder": "조혜인",
"summary": "B가 원본이라고 주장한 파일명과 관리사무소 서버의 공식 추출 기록이 일치하지 않고, 저장 시간도 사고 다음 날 늦은 밤으로 잡혀 있다.",
"reveals": [
"I4"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E4",
"title": "1501호 목격 진술과 경비원 순찰 메모",
"type": "이웃 목격진술",
"holder": "관리사무소",
"summary": "문소라는 사고 직전 A가 떨어뜨린 휴대폰을 줍느라 줄이 잠시 느슨해진 모습을 봤다고 진술했고, 경비원 메모에는 B가 전날에도 복도에 드라이어 선을 깔았다는 기록이 남아 있다.",
"reveals": [
"I1",
"I3"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E5",
"title": "원본 복도 CCTV와 디지털 포렌식 의견서",
"type": "CCTV",
"holder": "관리사무소",
"summary": "원본 54초 파일에는 B가 먼저 복도를 점유한 장면, A의 줄이 순간 느슨해진 장면, A가 문턱 안으로 들어가는 장면이 순서대로 보인다. 포렌식 의견서에는 B가 돌린 17초 파일이 재인코딩됐고 시간표시 레이어와 짖는 소리가 중복 삽입됐다고 적혀 있다.",
"reveals": [
"I1",
"I2",
"I3",
"I4"
],
"requires": [
"E2",
"E3"
],
"strength": "hard",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E6",
"title": "동물병원 진료기록과 상처 패턴 비교 사진",
"type": "동물병원 기록",
"holder": "담당 수의사",
"summary": "상처는 짝으로 난 송곳니 자국이 아니라 길게 긁힌 열상에 가깝고, 리드줄 금속 클립이나 발톱에 의한 접촉 손상 가능성이 높다고 적혀 있다.",
"reveals": [
"I5"
],
"requires": [
"E4",
"E5"
],
"strength": "hard",
"legitimacy": "clean",
"isTrap": false
}
],
"lies": {
"a": [
{
"lieId": "A-L1",
"statement": "나는 사고 내내 우리 개 줄을 단단히 잡고 있었다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E4",
"E5"
],
"collapseViaTrust": false
},
{
"lieId": "A-L2",
"statement": "문턱 안으로 들어간 적은 없고 복도에서만 말렸다.",
"type": "LT-1",
"motive": "self_protection",
"collapseViaEvidence": [
"E2",
"E5"
],
"collapseViaTrust": false
}
],
"b": [
{
"lieId": "B-L1",
"statement": "복도에는 우리 집 물건을 펼쳐 둔 적이 없고 사고는 전부 A가 다가와서 생겼다.",
"type": "LT-5",
"motive": "face_saving",
"collapseViaEvidence": [
"E1",
"E4",
"E5"
],
"collapseViaTrust": false
},
{
"lieId": "B-L2",
"statement": "단톡방에 올린 CCTV는 관리사무소에서 받은 원본 그대로다.",
"type": "LT-7",
"motive": "self_protection",
"collapseViaEvidence": [
"E3",
"E5"
],
"collapseViaTrust": true
},
{
"lieId": "B-L3",
"statement": "우리 쪽 책임은 0이고, 개가 안 물었으니 사과할 이유도 없다.",
"type": "LT-5",
"motive": "self_protection",
"collapseViaEvidence": [
"E5",
"E6"
],
"collapseViaTrust": true
}
]
},
"anchorTruth": "사고는 한쪽의 일방 가해가 아니라, B의 공용 복도 점유와 A의 통제 실패 및 문턱 침범이 겹쳐 발생했다. 다만 사후에 증거를 위조해 책임을 덮으려 한 쪽은 B였다.",
"resolutionDilemma": "공동 과실 사고에서 현장 과실과 사후 증거 위조 중 무엇을 더 무겁게 볼지, 또 실제 상처 원인이 물림이 아니었다는 점을 손해배상에 어떻게 반영할지 정해야 한다.",
"faultShare": {
"a": 35,
"b": 65
},
"solutionOptions": {
"lenient": {
"label": "온건",
"action": "A와 B가 서로의 과장된 게시글과 영상을 삭제하고, B는 복도 건조 행위를 중단하며 A와 B 모두 공용공간 반려견 이동 수칙을 서면으로 확인한다. 진료비는 B가 더 큰 비율로 분담하되 일부는 공동 부담한다.",
"tradeoff": "즉각적인 봉합은 가능하지만 위조 증거에 대한 경고가 약하게 남는다."
},
"neutral": {
"label": "중립",
"action": "B는 위조 영상 유포에 대해 공식 사과하고 진료비와 복도 청소비의 다수를 부담한다. A는 문턱 침범과 줄 통제 실패를 인정하는 정정문을 내고, 관리사무소는 반려동물 세척실 고장 기간 임시 사용 규칙을 새로 만든다.",
"tradeoff": "양측 책임을 균형 있게 남기지만 서로 체면 손상이 커질 수 있다."
},
"strict": {
"label": "강경",
"action": "B에게 증거 위조와 공용복도 점유에 대한 공식 제재 및 비용 부담을 부과하고, A에게도 사유 공간 침범과 부주의한 리드줄 관리에 대한 별도 경고를 준다. 재발 시 CCTV 열람과 게시글 공유에 대한 추가 제한을 둔다.",
"tradeoff": "재발 방지 효과는 크지만 같은 층 이웃 관계는 장기적으로 냉각될 수 있다."
}
}
},
{
"caseId": "case-neighbor-04",
"title": "막힌 차 뒤의 지난가을 약속",
"relationship": "neighbor",
"difficulty": "medium",
"conflictCode": "CS-6",
"variantCode": "VM-E",
"twist": {
"code": "TW-1",
"reveal": "피해를 호소하던 A가 먼저 지난가을의 주차 합의를 깨고, 최근 보복의 증거라며 올린 차량 흠집 사진도 몇 달 전 사진을 다시 쓴 것으로 드러난다."
},
"setting": "주차면 보수 공사로 외부 빈자리가 줄고, B 부친의 새벽 통원 일정이 겹치던 늦가을",
"summary": "A는 B가 공용주차장에서 자신의 차를 반복적으로 막고 흠집까지 냈다고 주장한다. B는 A가 오래전 합의를 깨고 다시 자리를 점유해 벌어진 일이라고 맞선다. 실제로 두 사람 사이에는 지난가을부터 이어진 시간대별 주차 합의가 있었고, 최근 A가 그 약속을 어긴 채 새벽에도 자리를 쓰고 가족에게 리모컨까지 빌려줬다. A는 그 뒤 B의 보복을 호소하며 막힌 차 사진과 흠집 사진을 퍼뜨렸지만, 흠집 사진은 이번 분쟁보다 몇 달 앞선 옛 사고 사진이었다. 다만 B 역시 보복성 이중주차와 날 선 쪽지로 출차를 막아 갈등을 키웠다.",
"openingStatements": {
"a": "B가 갑자기 제 차를 막고 흠집까지 문제 삼으며 괴롭혔어요. 저는 예전처럼 잠깐 주차했을 뿐입니다.",
"b": "갑자기가 아니에요. A가 지난 합의를 깨고 가족까지 리모컨을 쓰게 하니까 참다못해 대응한 겁니다. 막은 건 잘못이지만 이유 없는 보복은 아닙니다."
},
"parties": {
"a": {
"name": "한서윤",
"role": "704호 입주민",
"archetype": "피해호소형 계산가",
"verbalTells": [
"저만 당했어요",
"그건 잠깐이었어요",
"원래 그렇게 해왔잖아요"
]
},
"b": {
"name": "민준호",
"role": "706호 입주민",
"archetype": "원칙형 분노폭발자",
"verbalTells": [
"약속은 약속이죠",
"한두 번이 아니었습니다",
"저도 참을 만큼 참았어요"
]
}
},
"relationshipLedger": [
{
"status": "confirmed",
"entry": "두 사람은 지난가을 공용주차장 안쪽 자리를 시간대별로 나눠 쓰기로 합의하며 리모컨 사용 규칙까지 정한 적이 있다."
},
{
"status": "distorted",
"entry": "A는 그 합의가 그냥 구두 양해였다고 말하지만, 실제로는 시간과 조건이 적힌 문자 캡처가 남아 있다."
},
{
"status": "silenced",
"entry": "A는 최근 자신의 리모컨으로 동생 차량을 단지 안으로 들여보낸 사실을 숨긴다."
}
],
"socialGraph": [
{
"name": "남궁세라",
"role": "관리사무소 실장",
"connectionToA": "A의 피해 주장 글과 원본 사진 파일 제출을 요청받았다.",
"connectionToB": "B가 두 차례 중재를 요청하며 새벽 병원 이동 사정을 설명했다."
},
{
"name": "최동민",
"role": "경비원",
"connectionToA": "막힌 차량 신고를 받고 차단기 출입기록을 함께 확인했다.",
"connectionToB": "B에게 이중주차도 규정 위반이라고 경고했다."
},
{
"name": "배소희",
"role": "701호 입주민",
"connectionToA": "주차장에서 A가 예전처럼 잠깐 쓰면 된다고 말하는 것을 들었다.",
"connectionToB": "B 부친의 새벽 통원 일정 때문에 아침 자리가 필요했다는 사정을 알고 있었다."
}
],
"issues": [
{
"issueId": "I1",
"statement": "A와 B 사이에는 지난가을부터 평일 밤만 사용, 오전 7시 전 이동, 리모컨 타인 공유 금지라는 공용주차장 합의가 문자로 남아 있었다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "현재 분쟁이 단순 갑질인지, 과거 합의 파기 사건인지 구분한다."
},
{
"issueId": "I2",
"statement": "A는 최근 그 합의를 어긴 채 새벽 시간대에도 자리를 쓰고, 한 번은 자신의 리모컨으로 가족 차량을 들여보냈다.",
"truth": true,
"knowledgeQuadrant": "a_only",
"whyItMatters": "A가 먼저 약속을 깼는지와 피해자 서사의 진위를 판단한다."
},
{
"issueId": "I3",
"statement": "B는 문제의 아침 A 차량 뒤에 보복성으로 이중주차를 하고 날 선 쪽지를 남겼다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "B의 현재 보복 행위가 실제로 있었는지 가른다."
},
{
"issueId": "I4",
"statement": "B는 차를 막기 전 이미 관리사무소에 두 차례 중재를 요청했다.",
"truth": true,
"knowledgeQuadrant": "b_only",
"whyItMatters": "B가 즉흥적으로 폭발했는지, 공식 절차를 먼저 거쳤는지 판단하게 한다."
},
{
"issueId": "I5",
"statement": "A가 최근 분쟁의 증거라며 퍼뜨린 차량 긁힘 사진은 이번 사건 직후 생긴 것이다.",
"truth": false,
"knowledgeQuadrant": "shared_misconception",
"whyItMatters": "A가 제시한 핵심 피해 증거의 신빙성을 판정한다."
}
],
"evidence": [
{
"evidenceId": "E1",
"title": "지난가을 카카오톡 합의 캡처",
"type": "사진/영상",
"holder": "A와 B 모두",
"summary": "평일 밤 8시 이후만 사용, 오전 7시 전 이동, 리모컨 가족 공유 금지라는 문장이 날짜와 함께 남아 있다.",
"reveals": [
"I1"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E2",
"title": "A가 올린 막힌 차량 사진과 쪽지 사진",
"type": "사진/영상",
"holder": "A",
"summary": "B의 차량이 A 차량 뒤를 막고 있고 쪽지에는 오늘은 먼저 약속부터 지키세요라는 문구가 보인다. 다만 사진은 시간과 앞선 상황이 잘린 채 올라왔다.",
"reveals": [
"I3"
],
"requires": [],
"strength": "soft",
"legitimacy": "questionable",
"isTrap": true
},
{
"evidenceId": "E3",
"title": "차단기 출입 로그와 리모컨 번호 기록",
"type": "경비실 기록",
"holder": "최동민",
"summary": "A의 리모컨이 최근 여러 차례 오전 7시 전 사용됐고, 한 번은 A 차량이 없는 상태에서 A 동생 차량 번호가 같은 리모컨으로 들어온 기록이 남아 있다.",
"reveals": [
"I2"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E4",
"title": "관리사무소 중재 요청 기록",
"type": "관리사무소 민원기록",
"holder": "남궁세라",
"summary": "B는 새벽 병원 이동 때문에 기존 합의를 다시 지켜 달라고 두 차례 중재를 요청했고, A는 공동 면담 일정을 미뤘다는 메모가 남아 있다.",
"reveals": [
"I4"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E5",
"title": "정비업체 견적서와 원본 사진 메타데이터",
"type": "차량 수리기록",
"holder": "정비업체",
"summary": "A가 이번 분쟁의 보복 흔적이라며 올린 긁힘 사진의 원본 생성일은 네 달 전이며, 그 날짜의 수리 견적서와 흠집 위치가 정확히 일치한다.",
"reveals": [
"I5"
],
"requires": [
"E2"
],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E6",
"title": "주차장 CCTV와 출입로그 종합 검토서",
"type": "CCTV",
"holder": "관리사무소",
"summary": "영상과 로그를 함께 보면 A의 가족 차량이 제한된 아침 시간에 들어와 안쪽 자리를 쓰고, 그 뒤 B가 기다리다 A 차량을 막고 쪽지를 남기는 순서가 확인된다.",
"reveals": [
"I2",
"I3"
],
"requires": [
"E3",
"E4"
],
"strength": "hard",
"legitimacy": "clean",
"isTrap": false
}
],
"lies": {
"a": [
{
"lieId": "A-L1",
"statement": "우리 사이에 그런 조건의 주차 약속은 없었다.",
"type": "LT-2",
"motive": "self_protection",
"collapseViaEvidence": [
"E1",
"E4"
],
"collapseViaTrust": false
},
{
"lieId": "A-L2",
"statement": "합의 뒤에는 그 자리를 다시 쓴 적도, 리모컨을 남에게 준 적도 없다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E3",
"E6"
],
"collapseViaTrust": false
},
{
"lieId": "A-L3",
"statement": "올린 긁힘 사진은 이번 보복의 직접 증거다.",
"type": "LT-7",
"motive": "revenge",
"collapseViaEvidence": [
"E5"
],
"collapseViaTrust": true
}
],
"b": [
{
"lieId": "B-L1",
"statement": "차를 막은 건 아니고 잠깐 세워 둔 것뿐이다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E2",
"E6"
],
"collapseViaTrust": false
},
{
"lieId": "B-L2",
"statement": "쪽지는 경고였을 뿐 출차를 못 하게 할 의도는 없었다.",
"type": "LT-5",
"motive": "self_protection",
"collapseViaEvidence": [
"E2",
"E6"
],
"collapseViaTrust": true
}
]
},
"anchorTruth": "이번 사건에서 먼저 피해자 행세를 한 쪽은 A였지만, 실제 시작점은 A의 과거 합의 파기와 과장된 피해 연출이었다. 그렇다고 해도 B의 보복성 이중주차는 별개의 잘못으로 남는다.",
"resolutionDilemma": "과거의 합의 파기와 현재의 차량 봉쇄 중 무엇을 더 무겁게 볼지, 그리고 거짓 피해 증거를 내세운 책임을 어느 정도까지 제재할지 정해야 한다.",
"faultShare": {
"a": 60,
"b": 40
},
"solutionOptions": {
"lenient": {
"label": "온건",
"action": "A는 과장된 피해 게시글과 오래된 흠집 사진을 내리고, B는 이중주차와 쪽지에 대해 사과한다. 관리사무소는 두 사람의 주차 시간대를 다시 문서로 정리하고 리모컨 대여 금지 규칙을 재고지한다.",
"tradeoff": "관계 회복은 빠르지만 누가 먼저 약속을 깼는지에 대한 책임이 흐려질 수 있다."
},
"neutral": {
"label": "중립",
"action": "A는 허위에 가까운 흠집 게시물에 대한 정정문을 올리고 일정 기간 공용 안쪽 자리 사용 권한을 제한받는다. B는 차량 봉쇄 행위에 대해 공식 경고를 받고, 관리사무소는 차단기 로그를 기준으로 주차 위반을 즉시 통보하는 체계를 만든다.",
"tradeoff": "양측 책임을 고르게 남기지만 주차 편의가 당분간 크게 줄어든다."
},
"strict": {
"label": "강경",
"action": "A에게 과거 합의 파기와 허위 피해 자료 유포에 대한 더 무거운 책임을 묻고 공용주차장 사용 우선권을 박탈한다. 동시에 B에게도 보복성 이중주차에 대한 벌점과 추가 제재를 부과해 재발 시 견인 조치를 예고한다.",
"tradeoff": "기준은 분명해지지만 같은 동 주민 사이의 감정 골은 오래 남을 수 있다."
}
}
}
]
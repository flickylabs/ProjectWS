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
"caseId": "case-neighbor-05",
"title": "회색 발매트 앞의 두 상자",
"relationship": "neighbor",
"difficulty": "medium",
"conflictCode": "CS-4",
"variantCode": "VM-A",
"twist": {
"code": "TW-6",
"reveal": "A와 B가 서로를 범인으로 본 핵심 근거는 같은 배송사고에서 나온 조각들이었다. 배송기사가 오배송을 정정하려다 동일 포장의 두 상자를 함께 회수했고, 잘못 붙은 문앞 인증사진과 뒤늦은 재배송 때문에 두 사람 모두 상대가 훔쳤다고 믿게 됐다."
},
"setting": "명절 전 물량이 몰리고, 단지 무인택배함이 교체 중이라 문앞 배송이 잦던 주간",
"summary": "A는 고가의 택배가 배송완료로 뜬 뒤 사라졌고, 배송앱 사진이 B 집 발매트 앞처럼 보여 B가 가져갔다고 의심한다. B는 처음엔 억울해했지만, 곧 자기 문앞에 있던 비슷한 상자와 자기 몫의 상자까지 함께 사라진 걸 보고 오히려 A가 슬쩍해 놓고 누명을 씌운다고 맞선다. 실제로는 배송기사가 A의 상자를 B 집 앞으로 오배송한 뒤 정정하려고 다시 올라왔다가, 동일 포장의 두 상자를 함께 회수하는 배송 사고를 냈다. 그중 하나는 다음 날 재배송됐고, 다른 하나는 젖은 바코드가 훼손돼 반송 흐름으로 들어갔다. 다만 B가 비를 피해 A 상자를 잠깐 들여놓은 사실을 바로 말하지 않았고, A와 B 모두 확인 전 실명 의심을 퍼뜨려 신뢰를 무너뜨렸다.",
"openingStatements": {
"a": "문앞 인증사진이 분명 B 집 앞처럼 보였고, 그 직후 상자가 사라졌어요. 예전엔 서로 택배도 맡아줬는데 이번엔 끝까지 모른 척했습니다.",
"b": "저희도 비슷한 상자가 같이 없어졌어요. 먼저 도둑 취급해 놓고 이제 와서 배송사고라고 하면 끝인가요."
},
"parties": {
"a": {
"name": "임수아",
"role": "1002호 입주민",
"archetype": "신뢰배신에 예민한 공개추궁형",
"verbalTells": [
"사진이 있잖아요",
"그 집 앞이었어요",
"제가 왜 없는 말을 하겠어요"
]
},
"b": {
"name": "배정민",
"role": "1003호 입주민",
"archetype": "억울함 과장형 방어자",
"verbalTells": [
"우리 것도 없어졌어요",
"먼저 의심한 건 그쪽이죠",
"상식적으로 생각해 보세요"
]
}
},
"relationshipLedger": [
{
"status": "confirmed",
"entry": "두 사람은 작년부터 서로 외출 중일 때 택배를 대신 받아 준 적이 몇 번 있었다."
},
{
"status": "distorted",
"entry": "A는 B가 항의 문자에 한 번도 답하지 않았다고 말하지만, 실제로는 18분 뒤 짧게라도 답장을 보냈다."
},
{
"status": "silenced",
"entry": "B는 비를 피해 A 이름의 상자를 자기 집 안쪽 현관에 잠깐 들였다가 다시 내놓은 사실을 초반에는 숨긴다."
}
],
"socialGraph": [
{
"name": "허민재",
"role": "담당 택배기사",
"connectionToA": "A의 배송완료 사진과 고객센터 문의 기록의 당사자다.",
"connectionToB": "오배송 정정 때문에 B 집 앞으로 다시 올라왔고 상자를 회수했다."
},
{
"name": "노유진",
"role": "관리사무소 대리",
"connectionToA": "A의 CCTV 열람 요청과 주민 단톡방 분쟁 민원을 접수했다.",
"connectionToB": "B가 억울함을 호소하며 원본 영상 확인을 요청했다."
},
{
"name": "권세은",
"role": "1001호 입주민",
"connectionToA": "A가 B를 의심하는 말을 처음 직접 들은 이웃이다.",
"connectionToB": "B가 나중에 A가 자기 상자도 가져간 것 같다고 말한 상대다."
}
],
"issues": [
{
"issueId": "I1",
"statement": "A는 확인 전에 주민 단톡방에서 B의 호수와 이름을 직접 언급하며 의심 글을 올렸다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "A가 피해 호소를 넘어 공개적인 도난 의심을 퍼뜨렸는지 판단하게 한다."
},
{
"issueId": "I2",
"statement": "B는 비를 피해 A 상자를 잠깐 자기 집 안쪽 현관에 들였다가 다시 내놓고도 그 사실을 바로 알리지 않았다.",
"truth": true,
"knowledgeQuadrant": "b_only",
"whyItMatters": "B의 초기 비협조와 숨김이 왜 의심을 키웠는지 설명한다."
},
{
"issueId": "I3",
"statement": "B는 자기 상자도 사라진 뒤 1001호에게 A가 가져간 것 같다고 말하며 맞소문을 냈다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "B가 단순 피해자가 아니라 소문 확산에도 가담했는지 가른다."
},
{
"issueId": "I4",
"statement": "오배송 정정 때문에 택배기사가 같은 날 다시 1003호 앞에 올라왔다.",
"truth": true,
"knowledgeQuadrant": "b_only",
"whyItMatters": "사건의 직접 원인이 이웃 절도가 아니라 배송 과정일 가능성을 여는 핵심 사실이다."
},
{
"issueId": "I5",
"statement": "상대방이 내 택배를 훔쳤다.",
"truth": false,
"knowledgeQuadrant": "shared_misconception",
"whyItMatters": "양측 감정의 출발점이 된 핵심 믿음이 사실인지 아닌지를 판정한다."
}
],
"evidence": [
{
"evidenceId": "E1",
"title": "배송앱 문앞 인증 사진",
"type": "배송앱 기록",
"holder": "A",
"summary": "회색 발매트와 갈색 우산꽂이가 찍혀 있어 A는 B 집 앞이라고 확신한다. 그러나 각도와 초점이 흐려 사진만으로 누가 상자를 가져갔는지는 특정되지 않는다.",
"reveals": [
"I5"
],
"requires": [],
"strength": "soft",
"legitimacy": "questionable",
"isTrap": true
},
{
"evidenceId": "E2",
"title": "복도 CCTV 일부 장면",
"type": "CCTV",
"holder": "관리사무소",
"summary": "비가 세게 들이치던 순간 B가 A 이름이 붙은 상자를 집 안쪽 방풍 현관으로 잠깐 옮겼다가 몇 분 뒤 다시 문밖에 내놓는 모습이 나온다.",
"reveals": [
"I2"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E3",
"title": "주민 단톡방 및 1001호와의 대화 캡처",
"type": "대화기록",
"holder": "권세은",
"summary": "A가 B를 실명으로 언급한 글과, B가 나중에 1001호에게 A가 자기 상자도 가져간 것 같다고 말한 대화가 함께 남아 있다.",
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
"evidenceId": "E4",
"title": "택배기사 단말 스캔 로그와 고객센터 메모",
"type": "택배사 상담기록",
"holder": "택배사",
"summary": "같은 운송장에 배송완료 스캔 뒤 오배송 정정 메모가 붙어 있고, 8분 뒤 같은 기사 ID로 재방문 처리 기록이 남아 있다. 이후에는 바코드 훼손으로 예외 처리된 시간이 이어진다.",
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
"title": "원본 복도 CCTV 4분 영상",
"type": "CCTV",
"holder": "관리사무소",
"summary": "택배기사가 다시 올라와 문앞에 놓인 동일 포장 상자 두 개를 함께 들고 내려가는 장면이 보인다. 하나는 A 이름 상자이고, 다른 하나는 B의 미수령 상자로 추정된다.",
"reveals": [
"I2",
"I4",
"I5"
],
"requires": [
"E2",
"E4"
],
"strength": "hard",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E6",
"title": "재배송 완료 및 반송 이력서",
"type": "택배사 배송기록",
"holder": "택배사",
"summary": "B의 상자는 다음 날 재라벨링 뒤 재배송 완료로 바뀌고, A의 상자는 젖은 운송장 때문에 반송·보상 접수 흐름으로 넘어간 기록이 남아 있다.",
"reveals": [
"I4",
"I5"
],
"requires": [
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
"statement": "나는 B를 실명으로 지목한 적이 없다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E3"
],
"collapseViaTrust": false
},
{
"lieId": "A-L2",
"statement": "문앞 사진과 B의 행동만 보면 택배를 숨긴 게 확실하다.",
"type": "LT-7",
"motive": "revenge",
"collapseViaEvidence": [
"E4",
"E5",
"E6"
],
"collapseViaTrust": true
}
],
"b": [
{
"lieId": "B-L1",
"statement": "나는 A 택배를 만진 적도 집 안에 들인 적도 없다.",
"type": "LT-1",
"motive": "self_protection",
"collapseViaEvidence": [
"E2",
"E5"
],
"collapseViaTrust": false
},
{
"lieId": "B-L2",
"statement": "택배기사가 다시 온 적은 없고, 우리 상자가 사라진 건 A가 가져갔기 때문이다.",
"type": "LT-6",
"motive": "self_protection",
"collapseViaEvidence": [
"E4",
"E5",
"E6"
],
"collapseViaTrust": true
},
{
"lieId": "B-L3",
"statement": "나는 다른 집에 A가 가져간 것 같다고 말한 적이 없다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E3"
],
"collapseViaTrust": false
}
]
},
"anchorTruth": "둘 다 상대가 훔쳤다고 믿을 만한 조각을 봤지만, 실제로 택배를 사라지게 만든 건 오배송 정정 과정의 배송 사고였다. B의 잠깐의 숨김과 A·B의 성급한 실명 의심이 신뢰를 무너뜨렸다.",
"resolutionDilemma": "직접 원인은 배송사고인데도, 서로를 도둑으로 지목한 공개 비난과 초기 숨김을 얼마나 무겁게 볼지 정해야 한다.",
"faultShare": {
"a": 55,
"b": 45
},
"solutionOptions": {
"lenient": {
"label": "온건",
"action": "A와 B가 서로의 도난 의심 글과 말을 거둬들이고 공동 사과한다. 택배사에는 두 사람이 함께 사실확인과 보상 절차를 진행한다.",
"tradeoff": "관계 회복은 빠르지만 공개 비난의 책임이 다소 약하게 남는다."
},
"neutral": {
"label": "중립",
"action": "A는 주민 단톡방에 정정문을 올리고, B는 1001호를 포함해 자신이 퍼뜨린 의심을 바로잡는다. 관리사무소는 향후 오배송 분쟁을 위해 CCTV 확인과 택배사 연락 절차를 표준화한다.",
"tradeoff": "양측의 잘못과 제3자 책임을 함께 다루지만 서로 체면 손상이 남는다."
},
"strict": {
"label": "강경",
"action": "A와 B 모두 근거 없는 절도 의심 유포에 대해 공식 경고를 받고, B는 오배송 상자를 잠깐 들여놓고도 바로 알리지 않은 점에 대해 추가 경고를 받는다. 이후 문앞 배송 사고는 모두 관리사무소 경유 신고로만 처리한다.",
"tradeoff": "재발 방지에는 효과적이지만 이웃 간 신뢰 회복은 더디다."
}
}
},
{
"caseId": "case-neighbor-06",
"title": "고장 난 방화문과 빠진 8만 원",
"relationship": "neighbor",
"difficulty": "easy",
"conflictCode": "CS-1",
"variantCode": "VM-D",
"twist": null,
"setting": "겨울 바람이 세고, 오래된 빌라 3층 공용 방화문이 자주 쾅 닫히던 시기",
"summary": "A는 B가 접이식 손수레로 공용 방화문을 세게 밀어 도어클로저를 망가뜨렸으니 수리비 전액을 내야 한다고 주장한다. B는 문이 이미 흔들리고 있었고, A가 평소 택배나 장보기 때 문을 고무 받침으로 고정해 마모를 키웠다고 맞선다. 실제로 기사 점검 결과 문은 반복적인 고정 사용으로 암 부위가 먼저 약해져 있었고, B의 손수레 충격이 마지막 고장을 만든 것으로 확인된다. 또 A는 24만 원 전액을 청구하면서 건물 유지보수비에서 8만 원을 돌려받은 사실과, 18만 원짜리 부분수리 선택지가 있었는데도 상의 없이 전체교체를 택한 사실을 숨겼다. 분쟁의 핵심은 누가 얼마를 내느냐에 있는 단순한 공동 책임 사건이다.",
"openingStatements": {
"a": "손수레로 세게 밀고 지나가다 문을 망가뜨린 건 B예요. 제가 요구한 건 고친 비용뿐입니다.",
"b": "문은 이미 비틀거렸고 A가 늘 받침으로 고정해 둬서 약해져 있었어요. 일부 책임은 져도 전액은 낼 수 없습니다."
},
"parties": {
"a": {
"name": "최하린",
"role": "301호 입주민",
"archetype": "영수증 앞세우는 실무형",
"verbalTells": [
"수리비는 수리비죠",
"제가 먼저 처리한 거예요",
"영수증이 있잖아요"
]
},
"b": {
"name": "정우석",
"role": "303호 입주민",
"archetype": "손해회피형 현실주의자",
"verbalTells": [
"그 문은 원래 약했어요",
"전액은 과하죠",
"정확히 나눠서 봐야 합니다"
]
}
},
"relationshipLedger": [
{
"status": "confirmed",
"entry": "두 사람은 이전에 층 복도 전구값을 반반씩 나눠 낸 적이 있어 기본적인 비용 분담 전례는 있었다."
},
{
"status": "distorted",
"entry": "A는 방화문이 문제 생기기 전까지 멀쩡했다고 주장하지만, 실제로는 며칠 전부터 닫힘이 약하다는 말이 오갔다."
},
{
"status": "silenced",
"entry": "A는 수리 다음 날 건물 유지보수비에서 8만 원을 돌려받았다는 사실을 처음 청구할 때 숨긴다."
}
],
"socialGraph": [
{
"name": "손예린",
"role": "건물 관리 대리",
"connectionToA": "A가 수리비 청구와 영수증 사진을 보내며 중재를 요청했다.",
"connectionToB": "B가 CCTV 확인과 유지보수비 처리 내역 공개를 요구했다."
},
{
"name": "오경택",
"role": "수리기사",
"connectionToA": "A에게 부분수리와 전체교체 두 견적을 모두 설명했다.",
"connectionToB": "문이 이미 마모돼 있었고 마지막 충격이 겹쳤다고 설명했다."
},
{
"name": "박은미",
"role": "302호 입주민",
"connectionToA": "A가 장볼 때 문을 받침으로 고정해 두는 모습을 여러 번 봤다.",
"connectionToB": "사고 당일 B의 손수레가 문에 닿는 소리를 들었다."
}
],
"issues": [
{
"issueId": "I1",
"statement": "A는 평소 택배나 장보기 때 공용 방화문을 고무 받침이나 물병으로 고정해 둔 적이 여러 번 있다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "방화문의 사전 마모가 누구의 사용 습관에서 비롯됐는지 판단하게 한다."
},
{
"issueId": "I2",
"statement": "B의 접이식 손수레가 사고 당일 방화문에 강하게 부딪혀 최종 고장을 만들었다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "직접적인 마지막 충격 책임이 B에게 있는지 가르는 핵심이다."
},
{
"issueId": "I3",
"statement": "A는 B에게 24만 원 전액을 요구하면서 건물 유지보수비 8만 원 환급 사실을 알리지 않았다.",
"truth": true,
"knowledgeQuadrant": "a_only",
"whyItMatters": "실제 부담액보다 더 큰 금액을 청구했는지 판단하게 한다."
},
{
"issueId": "I4",
"statement": "A는 18만 원짜리 부분수리 선택지가 있었는데도 B와 상의 없이 24만 원 전체교체를 선택했다.",
"truth": true,
"knowledgeQuadrant": "a_only",
"whyItMatters": "수리 방식 선택에 따른 추가 비용을 누구 책임으로 볼지 정하게 한다."
},
{
"issueId": "I5",
"statement": "문이 원래 낡았으니 B는 아무 돈도 낼 필요가 없다.",
"truth": false,
"knowledgeQuadrant": "shared_misconception",
"whyItMatters": "노후 시설이라는 이유만으로 직접 충격 책임이 사라지는지 판단한다."
}
],
"evidence": [
{
"evidenceId": "E1",
"title": "복도 사진과 302호 메시지",
"type": "사진/영상",
"holder": "박은미",
"summary": "며칠 전 복도 사진에 방화문 아래 고무 받침과 생수병이 보이고, 302호가 문을 막아 두지 말아 달라고 보낸 메시지가 남아 있다.",
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
"title": "A가 보낸 수리비 청구 사진",
"type": "대화기록",
"holder": "B",
"summary": "24만 원 영수증 사진과 함께 전액 입금을 요구하는 메시지가 남아 있다. 그러나 환급 내역이나 다른 견적은 포함돼 있지 않다.",
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
"title": "계단실 CCTV 12초 영상",
"type": "CCTV",
"holder": "건물 관리",
"summary": "B가 접이식 손수레로 방화문을 밀고 지나가다 반쯤 열린 문과 부딪히는 장면이 찍혀 있고, 직후 도어클로저 암이 내려앉는 모습이 보인다.",
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
"title": "수리기사 점검서",
"type": "수리기록",
"holder": "오경택",
"summary": "도어클로저 암 연결부가 반복적인 강제 고정 사용으로 먼저 마모돼 있었고, 마지막 측면 충격으로 완전히 이탈했다는 소견이 적혀 있다. 전체교체가 필수는 아니었다는 문구도 포함된다.",
"reveals": [
"I1",
"I2",
"I5"
],
"requires": [],
"strength": "hard",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E5",
"title": "건물 유지보수비 환급 내역",
"type": "회계기록",
"holder": "손예린",
"summary": "수리 다음 날 A 계좌로 8만 원이 이체된 기록과, 공용시설 긴급수리 지원금 항목이 함께 남아 있다.",
"reveals": [
"I3"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E6",
"title": "비교 견적서 2종과 통화 메모",
"type": "수리기록",
"holder": "오경택",
"summary": "18만 원 부분수리 견적과 24만 원 전체교체 견적이 함께 있고, A가 B와 상의하기 전 전체교체를 선택했다고 적힌 통화 메모가 있다.",
"reveals": [
"I4"
],
"requires": [
"E2"
],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
}
],
"lies": {
"a": [
{
"lieId": "A-L1",
"statement": "나는 실제로 낸 돈만 청구했을 뿐이고 따로 돌려받은 돈은 없다.",
"type": "LT-7",
"motive": "self_protection",
"collapseViaEvidence": [
"E2",
"E5"
],
"collapseViaTrust": true
},
{
"lieId": "A-L2",
"statement": "문은 원래 멀쩡했고 B가 한 번 밀어서만 망가졌다.",
"type": "LT-5",
"motive": "face_saving",
"collapseViaEvidence": [
"E1",
"E4"
],
"collapseViaTrust": false
}
],
"b": [
{
"lieId": "B-L1",
"statement": "내 손수레는 문에 닿지 않았다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E3",
"E4"
],
"collapseViaTrust": false
},
{
"lieId": "B-L2",
"statement": "건물이 낡았으니 나는 1원도 낼 이유가 없다.",
"type": "LT-5",
"motive": "self_protection",
"collapseViaEvidence": [
"E3",
"E4"
],
"collapseViaTrust": true
}
]
},
"anchorTruth": "방화문 고장은 A의 반복적인 문 고정 습관과 B의 손수레 충격이 겹쳐 발생했다. 실제 계산은 8만 원 환급을 먼저 뺀 뒤, 전체교체를 상의 없이 선택한 추가 비용까지 따로 봐야 한다.",
"resolutionDilemma": "직접적인 마지막 충격을 준 B의 책임과, 환급 사실을 숨기고 더 비싼 수리를 일방적으로 택한 A의 책임 중 무엇을 더 크게 볼지 정해야 한다.",
"faultShare": {
"a": 45,
"b": 55
},
"solutionOptions": {
"lenient": {
"label": "온건",
"action": "8만 원 환급을 먼저 제외한 실제 순수리비 16만 원만 남긴 뒤, 두 사람이 8만 원씩 반반 부담한다. 앞으로 공용시설 수리는 사전 상의 후 진행한다.",
"tradeoff": "빨리 끝낼 수 있지만 전체교체 선택과 숨긴 환급 문제는 가볍게 넘어간다."
},
"neutral": {
"label": "중립",
"action": "환급 후 남은 16만 원을 기준으로 B가 9만 원, A가 7만 원을 부담하고, A는 전액 청구 메시지를 정정한다. 관리 측은 공용문 임의 고정 금지와 손수레 통행 주의를 공지한다.",
"tradeoff": "직접 충격과 사전 마모를 함께 반영하지만 양측 모두 일부 불만이 남는다."
},
"strict": {
"label": "강경",
"action": "필수 수리비는 18만 원 부분수리 기준으로 다시 계산하고, 환급 8만 원을 빼 남는 10만 원에 대해서만 공동 책임을 인정한다. 그 10만 원은 B 6만 원, A 4만 원으로 나누고, 전체교체로 늘어난 추가비용 6만 원은 상의 없이 결정한 A가 단독 부담한다.",
"tradeoff": "정산 기준은 가장 명확하지만 이미 지출한 비용을 다시 계산해야 해서 감정 소모가 커진다."
}
}
}
]
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
"caseId": "case-neighbor-01",
"title": "빗물 자국과 자정의 웅웅 소리",
"relationship": "neighbor",
"difficulty": "easy",
"conflictCode": "CS-3",
"variantCode": "VM-C",
"twist": null,
"setting": "장마철, 오래된 아파트 외벽 배수 문제가 잦은 주간",
"summary": "아랫집 A는 윗집 B가 자정 이후 기계를 돌리고 물까지 넘쳐 자신의 욕실 천장에 누수가 생겼다고 믿는다. B는 A가 빗소리와 생활 소음을 과장했고, 자기 집 앞 사진까지 퍼뜨렸다고 반발한다. 실제로 A의 피해는 실재했지만, 직접 원인은 B의 세탁기 넘침이 아니라 장마철 빗물 역류와 B의 발코니 배수구 주변 적치물이었다. 다만 B의 늦은 점검 협조와 밤늦은 제습기 사용이 오해를 키웠고, A의 공개 비난과 사생활 침해성 사진 공유가 분쟁을 악화시켰다.",
"openingStatements": {
"a": "윗집이 밤마다 기계를 돌리고 물까지 넘쳐서 제 천장이 샜어요. 그런데도 확인도 안 해주고 제가 예민하다고만 했습니다.",
"b": "저는 일부 소음은 인정하지만 세탁기를 넘친 적은 없어요. 오히려 아랫집이 제 현관 사진을 퍼뜨리며 사람을 범인처럼 만들었습니다."
},
"parties": {
"a": {
"name": "김나연",
"role": "705호 아랫집 입주민",
"archetype": "기록 집착형 피해자",
"verbalTells": [
"정확히 말하면",
"기록은 남아 있어요",
"저만 예민한 게 아니에요"
]
},
"b": {
"name": "오세진",
"role": "805호 윗집 입주민",
"archetype": "체면 중시형 회피자",
"verbalTells": [
"그건 상식적으로",
"굳이 그걸 문제 삼나요",
"과장하시는 거죠"
]
}
},
"relationshipLedger": [
{
"status": "confirmed",
"entry": "작년 겨울 B가 A의 택배를 대신 받아 준 적이 있어 완전히 단절된 사이는 아니었다."
},
{
"status": "distorted",
"entry": "A는 B가 '한 번도 답을 안 했다'고 말하지만 실제로 첫 항의 문자에는 짧게나마 답장이 왔다."
},
{
"status": "silenced",
"entry": "B는 장마 시작 전 관리사무소로부터 발코니 배수구 주변 적치물을 치워 달라는 안내를 한 번 받은 사실을 숨긴다."
}
],
"socialGraph": [
{
"name": "이주연",
"role": "관리사무소 대리",
"connectionToA": "민원 접수와 점검 일정 조율을 담당했다.",
"connectionToB": "점검 협조 요청을 두 차례 전달했다."
},
{
"name": "박성훈",
"role": "야간 경비원",
"connectionToA": "새벽 소음 민원을 직접 받았다.",
"connectionToB": "늦은 밤 제습기 물통과 화분 받침을 옮기는 모습을 봤다."
},
{
"name": "최은서",
"role": "동대표",
"connectionToA": "주민 단톡방 관리자로 A의 글을 확인했다.",
"connectionToB": "복도 및 발코니 적치 관련 생활규정 안내를 한 적이 있다."
}
],
"issues": [
{
"issueId": "I1",
"statement": "B는 항의를 받은 뒤에도 자정 이후 제습기를 최소 두 번 가동했다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "A의 수면 방해가 실제였는지와 B의 배려 의무 위반을 가른다."
},
{
"issueId": "I2",
"statement": "A는 공식 점검 전 B의 현관문과 호수가 보이게 찍힌 사진을 주민 단톡방에 올렸다.",
"truth": true,
"knowledgeQuadrant": "a_only",
"whyItMatters": "A의 공개 비난과 사생활 침해 책임을 판단하게 한다."
},
{
"issueId": "I3",
"statement": "B는 관리사무소의 점검 요청을 두 차례 미루며 '아랫집 결로일 것'이라 단정했다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "오해를 풀 기회를 B가 스스로 늦췄는지 판단하게 한다."
},
{
"issueId": "I4",
"statement": "B는 장마 기간 발코니 배수구 주변에 화분 받침과 우산 건조대를 두어 빗물 흐름을 방해했다.",
"truth": true,
"knowledgeQuadrant": "b_only",
"whyItMatters": "누수의 간접 원인과 공동생활 규정 위반 여부를 가른다."
},
{
"issueId": "I5",
"statement": "A 욕실 천장 누수의 직접 원인은 B의 세탁기 넘침이었다.",
"truth": false,
"knowledgeQuadrant": "b_only",
"whyItMatters": "핵심 비난이 단순한 오해인지, 고의 은폐가 있었는지를 판정한다."
}
],
"evidence": [
{
"evidenceId": "E1",
"title": "스마트폰 소음 측정 스크린샷",
"type": "소음 측정기록",
"holder": "A",
"summary": "비가 많이 오던 이틀 밤 23:48, 00:11에 52~58dB 급상승이 찍혀 있다. 소음 존재는 보이지만 소음의 정확한 원인은 특정되지 않는다.",
"reveals": [
"I1"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": true
},
{
"evidenceId": "E2",
"title": "주민 단톡방 캡처",
"type": "사진/영상",
"holder": "최은서",
"summary": "A가 B의 현관과 호수가 보이는 사진을 올리며 '윗집 물 새는 것 같다'고 적은 장면이 남아 있다.",
"reveals": [
"I2"
],
"requires": [],
"strength": "soft",
"legitimacy": "questionable",
"isTrap": false
},
{
"evidenceId": "E3",
"title": "관리사무소 민원 및 점검 일정 기록",
"type": "관리사무소 민원기록",
"holder": "이주연",
"summary": "A의 민원 3회, B의 점검 일정 연기 2회, 그리고 B가 '아랫집 결로 같다'고 말한 메모가 남아 있다.",
"reveals": [
"I3"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E4",
"title": "야간 경비실 엘리베이터 CCTV 열람 메모",
"type": "CCTV",
"holder": "박성훈",
"summary": "B가 밤 11시 50분쯤 제습기 물통과 젖은 화분 받침을 들고 이동하는 장면이 기록돼 있다.",
"reveals": [
"I1",
"I4"
],
"requires": [
"E3"
],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E5",
"title": "설비기사 현장 사진",
"type": "사진/영상",
"holder": "관리사무소",
"summary": "B 발코니의 배수구 주변이 화분 받침과 우산 건조대로 가려져 있고, 욕실 외벽 쪽으로 빗물이 고인 모습이 찍혀 있다.",
"reveals": [
"I4"
],
"requires": [
"E3",
"E4"
],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E6",
"title": "누수 원인 점검서",
"type": "관리사무소 민원기록",
"holder": "설비업체",
"summary": "세탁기 넘침 흔적은 없고, 외벽면 빗물 역류와 배수구 주변 적치로 인한 수분 유입 패턴이라는 결론이 적혀 있다.",
"reveals": [
"I5"
],
"requires": [
"E3",
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
"statement": "나는 B 집을 특정해서 공개한 적 없다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E2"
],
"collapseViaTrust": false
},
{
"lieId": "A-L2",
"statement": "관리사무소 결과가 나오기 전에는 B가 원인이라고 단정하지 않았다.",
"type": "LT-4",
"motive": "self_protection",
"collapseViaEvidence": [
"E2",
"E3"
],
"collapseViaTrust": false
}
],
"b": [
{
"lieId": "B-L1",
"statement": "자정 이후에는 제습기든 뭐든 아무 기계도 돌리지 않았다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E1",
"E4"
],
"collapseViaTrust": false
},
{
"lieId": "B-L2",
"statement": "점검은 바로 받으려 했고, 우리 집 쪽 배수 문제는 전혀 없었다.",
"type": "LT-5",
"motive": "self_protection",
"collapseViaEvidence": [
"E3",
"E5",
"E6"
],
"collapseViaTrust": true
}
]
},
"anchorTruth": "A의 누수와 수면 방해는 실제였다. 다만 A가 특정한 '세탁기 넘침'만 틀렸고, B의 늦은 협조와 배수구 주변 적치가 피해를 키웠다.",
"resolutionDilemma": "악의적 가해가 아닌 오해 사건에서, 사생활 침해성 공개 비난을 더 무겁게 볼지, 공동배수 방해와 점검 회피를 더 무겁게 볼지 정해야 한다.",
"faultShare": {
"a": 45,
"b": 55
},
"solutionOptions": {
"lenient": {
"label": "온건",
"action": "서로 글과 사진을 삭제하고 상호 사과한다. B는 배수구 주변 적치물을 즉시 치우고 야간 제습기 사용 시간을 제한한다.",
"tradeoff": "관계 회복은 빠르지만 공식 책임이 약하게 남는다."
},
"neutral": {
"label": "중립",
"action": "A는 주민 단톡방에 정정문을 올리고, B는 소음 완충 조치와 소규모 누수 보수 비용 일부를 부담한다. 관리사무소는 장마철 재점검을 실시한다.",
"tradeoff": "양측 책임을 균형 있게 남기지만 누구도 완전히 만족하지 못한다."
},
"strict": {
"label": "강경",
"action": "B에게 공용 배수 방해와 점검 지연에 대한 공식 경고 및 보수 비용 부담을 부과하고, A에게 사생활 침해성 사진 공유에 대한 별도 경고를 부과한다.",
"tradeoff": "기준은 명확해지지만 이웃 관계는 장기적으로 얼어붙을 수 있다."
}
}
},
{
"caseId": "case-neighbor-02",
"title": "반상회 뒤에 돌기 시작한 CCTV 소문",
"relationship": "neighbor",
"difficulty": "hard",
"conflictCode": "CS-5",
"variantCode": "VM-A",
"twist": {
"code": "TW-2",
"reveal": "반상회 직후 편집된 CCTV 캡처와 익명 인쇄물을 먼저 퍼뜨린 사람은 A도 B도 아닌 현 동대표 박경수였다. 그는 자신의 권한 남용과 친척의 공용공간 적치 문제를 가리기 위해 둘을 서로의 가해자로 보이게 만들었다."
},
"setting": "아파트 반상회 이후, 택배실과 CCTV 열람 규정을 두고 주민 감정이 예민해진 시기",
"summary": "A는 B가 자신을 '이웃을 CCTV로 감시하는 사람'으로 소문냈다고 주장하고, B는 A가 반상회 뒤 자신과 가족을 택배 문제와 엮어 망신줬다고 맞선다. 실제로는 반상회 직후 현 동대표 박경수가 편집된 CCTV 캡처와 익명 인쇄물을 뿌려 두 사람의 불신을 자극했다. 그러나 A도 확인 없이 B의 이름을 공개적으로 거론했고, B도 최초 발신자가 A가 아니라는 정황을 알고도 소문을 여러 세대에 퍼뜨려 명예훼손을 키웠다.",
"openingStatements": {
"a": "B가 우리 집을 CCTV로 이웃 감시하는 집처럼 몰아갔어요. 반상회에서 본인 기분 상했다고 사람을 이상한 집으로 만들었습니다.",
"b": "반상회 뒤 A가 우리 가족을 택배 문제와 엮었다는 말이 돌았고, 저도 그에 대응했을 뿐입니다. 먼저 우리 집 체면을 망가뜨린 건 A 쪽이에요."
},
"parties": {
"a": {
"name": "서민아",
"role": "1203호 입주민",
"archetype": "규칙 집착형 기록가",
"verbalTells": [
"정확한 표현으로는",
"증빙은 남겨뒀어요",
"그건 절차가 아니죠"
]
},
"b": {
"name": "정도윤",
"role": "1205호 입주민",
"archetype": "체면형 여론 플레이어",
"verbalTells": [
"그 정도는 다들 해요",
"저만 찍어 말씀하시네",
"분위기 보시면 알잖아요"
]
}
},
"relationshipLedger": [
{
"status": "confirmed",
"entry": "작년 가을 A가 B 집 택배를 대신 맡아 준 적이 있어 둘 사이에 최소한의 신뢰는 있었다."
},
{
"status": "distorted",
"entry": "반상회에서 A가 'B 아들이 택배를 훔쳤다'고 말했다는 소문이 돌지만, 회의록에는 그런 표현이 없다."
},
{
"status": "silenced",
"entry": "B는 첫 익명 캡처와 인쇄물을 박경수 동대표 쪽에서 먼저 받았다는 사실을 숨긴다."
}
],
"socialGraph": [
{
"name": "윤지아",
"role": "관리사무소 대리",
"connectionToA": "A의 글 삭제 및 정정 요청을 접수했다.",
"connectionToB": "B의 명예훼손 민원을 다음 날 접수했다."
},
{
"name": "한민수",
"role": "경비원",
"connectionToA": "A에게 CCTV는 화면 확인만 가능하고 복사는 안 된다고 안내했다.",
"connectionToB": "새벽에 게시판 근처에서 익명 인쇄물이 붙는 걸 목격했다."
},
{
"name": "박경수",
"role": "현 동대표",
"connectionToA": "반상회에서 A의 CCTV 열람 규정 문제 제기를 불편해했다.",
"connectionToB": "평소 B와 주차 스티커 문제로 연락을 주고받았다."
}
],
"issues": [
{
"issueId": "I1",
"statement": "A는 소문 출처를 확인하기 전에 주민 단톡방에서 B의 이름을 직접 거론했다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "A의 공개적 명예훼손 책임이 있는지를 판단한다."
},
{
"issueId": "I2",
"statement": "B는 'A가 CCTV로 이웃을 감시한다'는 말을 여러 세대에 전달하거나 동조했다.",
"truth": true,
"knowledgeQuadrant": "both_know",
"whyItMatters": "B가 단순 피해자인지, 소문 증폭자인지를 가른다."
},
{
"issueId": "I3",
"statement": "A는 자신의 글이 과했다는 걸 깨닫고 당일 관리사무소에 삭제와 정정 안내를 요청했지만 공개 사과는 미뤘다.",
"truth": true,
"knowledgeQuadrant": "a_only",
"whyItMatters": "A의 후속 조치가 있었는지와 진정성의 범위를 보여준다."
},
{
"issueId": "I4",
"statement": "B는 첫 익명 캡처와 인쇄물이 박경수 동대표 쪽에서 먼저 왔다는 사실을 알고도 숨겼다.",
"truth": true,
"knowledgeQuadrant": "b_only",
"whyItMatters": "B가 제3자의 개입을 알고도 보복성 대응을 선택했는지 판정한다."
},
{
"issueId": "I5",
"statement": "소문의 최초 발신자는 상대방(A 또는 B)이다.",
"truth": false,
"knowledgeQuadrant": "shared_misconception",
"whyItMatters": "사건 전체의 해석을 뒤집는 핵심 오해이자 배후 반전의 축이다."
}
],
"evidence": [
{
"evidenceId": "E1",
"title": "반상회 회의록과 좌석 사진",
"type": "관리사무소 민원기록",
"holder": "관리사무소",
"summary": "A는 택배실 공용공간 적치와 CCTV 열람 규정 정비를 요구했지만, B 가족을 직접 절도와 연결한 발언은 없다.",
"reveals": [
"I5"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E2",
"title": "주민 단톡방 캡처와 익명 인쇄문 사진",
"type": "사진/영상",
"holder": "주민 제보",
"summary": "익명 글에는 A가 CCTV로 이웃을 본다는 문구와 B 가족이 택배 문제로 지목됐다는 문장이 섞여 있다. 닉네임과 말투가 양쪽을 모두 의심하게 만들어 오판을 유도한다.",
"reveals": [
"I1",
"I2"
],
"requires": [],
"strength": "soft",
"legitimacy": "questionable",
"isTrap": true
},
{
"evidenceId": "E3",
"title": "관리사무소 민원 및 삭제 요청 기록",
"type": "관리사무소 민원기록",
"holder": "윤지아",
"summary": "A는 글 삭제와 정정 안내를 요청했고, 같은 기록에는 A에게 CCTV 복사본이 발급되지 않았다는 메모가 남아 있다. B의 명예훼손 민원은 그 다음 날 접수됐다.",
"reveals": [
"I3"
],
"requires": [],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E4",
"title": "경비실 CCTV 열람대장",
"type": "경비실 기록",
"holder": "한민수",
"summary": "반상회 다음 날 CCTV USB 반출 요청자는 박경수뿐이며, A는 화면 확인만 했고 복사 반출은 없었다.",
"reveals": [
"I4",
"I5"
],
"requires": [
"E3"
],
"strength": "soft",
"legitimacy": "clean",
"isTrap": false
},
{
"evidenceId": "E5",
"title": "택배실 원본 CCTV 전체 영상",
"type": "CCTV",
"holder": "관리사무소",
"summary": "B의 가족은 단지 자기 택배를 옮겼을 뿐이고, A는 분실 택배 위치를 문의하는 장면만 나온다. 익명 글에 쓰인 정지화면은 중간 장면을 잘라낸 편집본이며, 박경수 친척이 공용 선반에 개인 물건을 쌓는 부분이 삭제돼 있다.",
"reveals": [
"I5"
],
"requires": [
"E3",
"E4"
],
"strength": "hard",
"legitimacy": "questionable",
"isTrap": false
},
{
"evidenceId": "E6",
"title": "새벽 게시판 복도 카메라와 경비실 프린트 사용 기록",
"type": "경비실 기록",
"holder": "경비실",
"summary": "새벽 5시 42분 박경수가 경비실 프린터를 사용한 뒤 익명 인쇄물을 게시판에 붙이는 장면이 남아 있고, 출력 파일명은 제보된 인쇄문과 일치한다.",
"reveals": [
"I4",
"I5"
],
"requires": [
"E1",
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
"statement": "나는 B를 직접 지목한 적이 없다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E2"
],
"collapseViaTrust": false
},
{
"lieId": "A-L2",
"statement": "나는 CCTV 관련 민원을 넣은 적도, 자료 확인을 요구한 적도 없다.",
"type": "LT-2",
"motive": "self_protection",
"collapseViaEvidence": [
"E3",
"E4"
],
"collapseViaTrust": false
},
{
"lieId": "A-L3",
"statement": "B가 먼저 우리 가족을 망신줬고, 나는 완전히 방어만 했다.",
"type": "LT-5",
"motive": "revenge",
"collapseViaEvidence": [
"E2",
"E6"
],
"collapseViaTrust": true
}
],
"b": [
{
"lieId": "B-L1",
"statement": "나는 그 소문을 다른 집에 퍼뜨린 적이 없다.",
"type": "LT-1",
"motive": "face_saving",
"collapseViaEvidence": [
"E2"
],
"collapseViaTrust": false
},
{
"lieId": "B-L2",
"statement": "익명 자료가 박경수 쪽에서 왔다는 건 전혀 몰랐다.",
"type": "LT-6",
"motive": "third_party_protection",
"collapseViaEvidence": [
"E4",
"E6"
],
"collapseViaTrust": true
},
{
"lieId": "B-L3",
"statement": "A가 우리 아이를 절도범이라고 단정했다.",
"type": "LT-5",
"motive": "revenge",
"collapseViaEvidence": [
"E1",
"E5"
],
"collapseViaTrust": false
}
]
},
"anchorTruth": "A와 B 모두 상대가 먼저 시작했다고 믿을 만한 조각 증거를 봤다. 그러나 최초 유포와 편집본 배포는 제3자였고, A와 B는 그 위에 각자 검증 없는 실명 비난을 덧붙였다.",
"resolutionDilemma": "배후 조작이 확인된 사건에서 A와 B의 맞대응성 명예훼손을 얼마나 강하게 제재할지, 또 공동체 권한 남용 문제를 별도로 얼마나 크게 다룰지 판단해야 한다.",
"faultShare": {
"a": 35,
"b": 65
},
"solutionOptions": {
"lenient": {
"label": "온건",
"action": "A와 B가 공동 정정문과 상호 사과문을 올리고, 이후 실명 거론 금지 규칙을 자율 합의한다. 관리사무소는 CCTV 열람 절차를 공개하고 박경수 건을 주민위원회에 넘긴다.",
"tradeoff": "공동체 복원에는 유리하지만 명예훼손 책임이 약하게 정리된다."
},
"neutral": {
"label": "중립",
"action": "A는 B 실명 거론 글을 정정하고, B는 소문 전달 범위와 횟수에 비례한 공식 사과를 한다. 관리사무소는 CCTV 반출 권한을 재정비하고 박경수의 열람 권한을 즉시 중지한다.",
"tradeoff": "양측 잘못과 배후 책임을 함께 다루지만 절차가 길어진다."
},
"strict": {
"label": "강경",
"action": "B에게 반복 유포 책임에 대한 더 무거운 제재와 손해배상 부담을 부과하고, A에게도 확인 전 실명 비난에 대한 공식 경고를 내린다. 동시에 박경수에 대한 주민 징계 절차와 별도 고발을 병행한다.",
"tradeoff": "재발 방지 효과는 크지만 주민 사회의 균열이 오래 남는다."
}
}
}
]


# 10. 실제 데이터 샘플 — 게임에 들어가는 날 것 그대로

> 이 문서는 "이론상 이런 구조"가 아니라, **실제로 게임에 투입되는 데이터**를 보여줍니다.
> AI 답변 품질 문제를 논의하려면 이 데이터를 반드시 참고해야 합니다.

---

## A. 사건 JSON 전체 — spouse-01 "비밀 송금 의혹"

### A-1. 메타 정보
```json
{
  "caseId": "case-spouse-01",
  "meta": {
    "relationshipType": "spouse",
    "conflictSeed": "CS-1",
    "variableModules": ["VM-C"],
    "twistModule": "TW-6",
    "difficulty": "medium",
    "anchorTruth": "지석이 낯선 여자 이름으로 보낸 280만원은 외도 자금이 아니었다. 추석 연휴, 비어버린 간병 구간을 메우려 몰래 보낸 돌봄센터 예약금이었다.",
    "emotionalBait": "낯선 여자 이름으로 빠져나간 280만원, 밤 9시 모텔 골목 출입기록, '조용한 데서 보자'는 메시지 — 세 가지가 겹치면 누구라도 외도를 의심한다.",
    "resolutionDilemma": "아내 몰래 처가 어머니를 챙긴 남편의 선의와, 새벽에 남편 폰을 열어본 아내의 불안 — 어느 쪽이 더 무거운가?"
  }
}
```

### A-2. 캐릭터 프로필 (partyA — 한지석)
```json
{
  "name": "한지석",
  "age": 39,
  "occupation": "물류센터 야간 운영팀장",
  "incomeBracket": "mid",
  "archetype": "avoidant",
  "speechStyle": "곤란한 질문에는 '9월 20일 기준으로 말씀드리면'처럼 숫자부터 꺼내며 감정을 뒤로 미룬다. 궁지에 몰리면 '그건 순서가 있습니다'라며 흐름을 자기 쪽으로 잡으려 든다.",
  "pride": 7,
  "fear": "처가 살림을 혼자 감당 못 하는 무능한 남편, 돈 앞에서 쩔쩔매는 가장이라는 시선이 가장 두렵다.",
  "riskAppetite": 4,
  "digitalHabit": "banking_app_heavy",
  "dailyRoutine": "오후에 출근해 밤샘 근무를 하고, 새벽 귀가 후 오전엔 은행·관공서 일을 몰아서 처리한다.",
  "sensitivePoints": ["가장 역할", "처가 지원 문제", "실패한 투자 전력"],
  "verbalTells": [
    {
      "type": "over_precision",
      "trigger": "lying",
      "pattern": "불편한 질문이 올수록 숫자가 정밀해진다. '한 9시쯤'이 아니라 '9시 12분쯤', '280만원 정도'가 아니라 '2,800,000원 딱' — 정확함 뒤에 감정을 숨기는 버릇이다."
    },
    {
      "type": "counter_question",
      "trigger": "cornered",
      "pattern": "의도를 추궁당하면 답 대신 되묻는다. '왜 그랬냐고요? 그럼 당신은 왜 그걸 봤는데요?'"
    },
    {
      "type": "timeline_padding",
      "trigger": "shame",
      "pattern": "본론에 다가갈수록 업무 동선을 길게 늘어놓는다. '그날 저녁 8시 반에 물류 마감 끝내고, 동료한테 인수인계하고, 주차장까지 걸어가는데…' — 핵심을 에둘러 시간을 번다."
    }
  ],
  "callTerms": {
    "toPartner": "자기",
    "toJudge": "제 아내",
    "angry": "오세린 씨!"
  }
}
```

### A-3. 쟁점 (Disputes) — 5개 전부
```json
[
  {
    "id": "d-1",
    "name": "지석의 비밀 송금 280만원",
    "truth": true,
    "truthDescription": "지석은 세린에게 한마디 상의 없이 공동생활비 계좌에서 280만원을 빼냈다. 받는 사람은 재가돌봄센터 상담팀장 최민정. 목적은 추석 연휴 간병 예약금이었지만, 숨긴 것 자체가 약속 위반이다.",
    "quadrant": "a_only",
    "requiredEvidence": ["e-1", "e-2"],
    "correctResponsibility": { "a": 70, "b": 30 },
    "ambiguity": "none",
    "weight": "high",
    "judgmentStatement": "지석은 세린에게 비밀 송금을 했다."
  },
  {
    "id": "d-2",
    "name": "세린의 새벽 휴대폰 열람",
    "truth": true,
    "truthDescription": "세린은 새벽 2시에 잠든 지석의 휴대폰 잠금을 풀고 메신저 대화를 캡처했다. 그 캡처를 언니에게 보내며 '이거 외도 맞지?'라고 물었다.",
    "quadrant": "b_only",
    "requiredEvidence": ["e-3"],
    "correctResponsibility": { "a": 20, "b": 80 },
    "ambiguity": "none",
    "weight": "high",
    "judgmentStatement": "세린은 지석의 휴대폰을 열람했다."
  },
  {
    "id": "d-3",
    "name": "최민정은 외도 상대인가",
    "truth": false,
    "truthDescription": "최민정은 외도 상대가 아니다. 재가돌봄센터 상담팀장이며, 모텔 골목에서 만난 것처럼 보인 장면은 같은 블록에 붙은 센터 후문 상담실에서 간병 일정을 잡은 것이었다.",
    "quadrant": "shared_misconception",
    "requiredEvidence": ["e-3", "e-4"],
    "correctResponsibility": { "a": 40, "b": 60 },
    "ambiguity": "low",
    "weight": "high",
    "judgmentStatement": "최민정은 외도 상대가 아니다."
  },
  {
    "id": "d-4",
    "name": "세린의 우회 송금 150만원",
    "truth": true,
    "truthDescription": "세린도 깨끗하지 않다. 동생의 밀린 월세 3개월치를 막으려 대학 동기 정우성 계좌를 경유해 150만원을 우회 송금했다.",
    "quadrant": "b_only",
    "requiredEvidence": ["e-5", "e-6"],
    "correctResponsibility": { "a": 25, "b": 75 },
    "ambiguity": "none",
    "weight": "high",
    "judgmentStatement": "세린은 150만원을 우회 송금했다."
  },
  {
    "id": "d-5",
    "name": "100만원 사전 상의 약속 위반",
    "truth": true,
    "truthDescription": "재작년에 세운 '100만원 이상은 반드시 상의' 약속을 두 사람 모두 어겼다.",
    "quadrant": "both_know",
    "requiredEvidence": ["e-1", "e-6"],
    "correctResponsibility": { "a": 55, "b": 45 },
    "ambiguity": "none",
    "weight": "medium",
    "judgmentStatement": "지석과 세린은 약속을 위반했다."
  }
]
```

### A-4. 증거 (Evidence) — 대표 3개
```json
[
  {
    "id": "e-1",
    "name": "공동계좌→최민정 280만원 이체 내역",
    "type": "bank",
    "reliability": "hard",
    "completeness": "original",
    "provenance": "institutional",
    "legitimacy": "lawful",
    "proves": ["d-1", "d-5"],
    "isTrap": false,
    "requires": [],
    "subjectParty": "a",
    "investigationResults": {
      "request_original": "은행 발급 원본에 이체 시각 '9월 20일 14:03', 수취인 '최민정'이 찍혀 있다. 금액 2,800,000원. 메모란은 비어 있다.",
      "check_metadata": "이체 단말은 지석 명의 휴대폰, 공인인증도 지석 본인 명의다.",
      "restore_context": "이체 7분 전과 23분 전, 돌봄센터 대표번호(1588-XXXX)로 두 차례 통화한 기록이 있다.",
      "verify_source": "은행 고객센터에 대조한 결과, PDF 해시값이 원본과 일치한다. 위·변조 흔적 없음.",
      "check_edits": "은행 시스템에서 직접 출력한 PDF 발급본이다. 수정 이력이나 이미지 편집 흔적은 없다.",
      "question_acquisition": "부부 공동명의 계좌이므로 어느 쪽이든 조회할 권리가 있다."
    }
  },
  {
    "id": "e-3",
    "name": "지석 휴대폰 메신저 캡처본",
    "type": "chat",
    "reliability": "soft",
    "completeness": "cropped",
    "provenance": "personal_device",
    "legitimacy": "privacy_concern",
    "proves": ["d-2", "d-3"],
    "isTrap": true,
    "requires": [],
    "subjectParty": "both",
    "partyContext": {
      "a": {
        "questionAngle": "한지석에게: \"최민정은 외도 상대인가\" 관련 해명 요구",
        "implication": "이 증거는 한지석의 \"최민정은 외도 상대인가\" 쟁점과 관련된다."
      },
      "b": {
        "questionAngle": "오세린에게: \"세린의 새벽 휴대폰 열람\" 관련 해명 요구",
        "implication": "이 증거는 오세린의 \"세린의 새벽 휴대폰 열람\" 쟁점과 관련된다."
      }
    },
    "investigationResults": {
      "request_original": "전체 대화 원본은 제출되지 않았다. 세린이 캡처한 스크린샷 1장뿐이며, 앞뒤 수십 줄이 잘려 있다.",
      "check_metadata": "캡처 파일의 생성 시각이 새벽 2시 07분이다. 지석이 잠든 사이에 폰을 열어 찍은 것으로 보인다.",
      "restore_context": "'조용한 데서 보죠'만 떼어 보면 밀회처럼 읽히지만, 앞뒤가 잘려 있어 상담 장소 약속인지 사적 만남인지 이 캡처만으로는 알 수 없다.",
      "check_edits": "글자를 고치거나 합성한 흔적은 없다. 다만 대화의 위아래를 의도적으로 잘라낸 선택적 크롭이 확인된다.",
      "question_acquisition": "새벽에 잠든 배우자의 휴대폰 잠금을 풀고 무단 열람해 얻은 자료다. 취득 과정 자체가 사생활 침해에 해당할 수 있다."
    }
  },
  {
    "id": "e-2",
    "name": "재가돌봄센터 간병 예약 확인서",
    "type": "contract",
    "reliability": "hard",
    "completeness": "original",
    "provenance": "institutional",
    "legitimacy": "lawful",
    "proves": ["d-1", "d-3"],
    "isTrap": false,
    "requires": ["e-1"],
    "subjectParty": "a",
    "investigationResults": {
      "request_original": "예약서 신청인란에 '한지석', 돌봄 대상자란에 '오미숙(처모)'. 기간은 추석 연휴 3일, 예약금 280만원 수납 완료.",
      "check_metadata": "예약서 작성 시각은 송금 당일 14:31, 이체 28분 뒤다.",
      "restore_context": "상담 사유란에 '추석 연휴 기간 가족 돌봄 공백 — 가족 간 일정 조율 전 긴급 예약'이라고 적혀 있다.",
      "verify_source": "센터 직인, 대표번호, 사업자등록번호를 대조한 결과 모두 실제 기관 정보와 일치.",
      "check_edits": "전자서명 유효성 검증 통과. 발급 이후 한 글자도 수정되지 않았다.",
      "question_acquisition": "돌봄센터가 직접 발급한 기관 제출본이라 취득 경위에 문제없다."
    }
  }
]
```

### A-5. 진실 테이블 (Truth Table)
```json
[
  { "id": "t-1", "fact": "지석이 최민정에게 보낸 280만원은 연휴 간병 예약금이었다.", "isTrue": true, "weight": 10, "quadrant": "a_only" },
  { "id": "t-2", "fact": "세린은 지석의 휴대폰을 무단 열람해 캡처를 제3자에게 보냈다.", "isTrue": true, "weight": 9, "quadrant": "b_only" },
  { "id": "t-3", "fact": "골목 만남처럼 보인 접촉은 돌봄센터 후문 상담 일정이었다.", "isTrue": true, "weight": 8, "quadrant": "shared_misconception" },
  { "id": "t-4", "fact": "세린도 동생을 위해 150만원을 우회 송금했다.", "isTrue": true, "weight": 8, "quadrant": "b_only" },
  { "id": "t-5", "fact": "두 사람 모두 100만원 이상 사전 상의 약속을 다른 방식으로 어겼다.", "isTrue": true, "weight": 7, "quadrant": "both_know" }
]
```

---

## B. 거짓말 설정 (Lie Config) — spouse-01 partyA

LLM은 이 설정에 따라 "어떻게 거짓말하고, 어떤 트리거에 어떤 순서로 무너지는지"를 제어받는다.

```json
[
  {
    "disputeId": "d-1",
    "lieType": "LT-2",
    "lieIntensity": "L2",
    "lieMotive": "face_saving",
    "initialState": "S0",
    "collapseViaTrust": false,
    "transitions": [
      { "from": "S0", "to": "S1", "trigger": "bank_transfer_question" },
      { "from": "S1", "to": "S2", "trigger": "e-1_presented" },
      { "from": "S2", "to": "S3", "trigger": "purpose_followup" },
      { "from": "S3", "to": "S5", "trigger": "e-2_or_responsibility_question" }
    ]
  },
  {
    "disputeId": "d-3",
    "lieType": "LT-6",
    "lieIntensity": "L3",
    "lieMotive": "relationship_maintenance",
    "initialState": "S0",
    "collapseViaTrust": true,
    "transitions": [
      { "from": "S0", "to": "S1", "trigger": "cropped_chat_presented" },
      { "from": "S1", "to": "S2", "trigger": "location_timeline_question" },
      { "from": "S2", "to": "S4", "trigger": "nonjudgmental_question_about_mother_in_law" },
      { "from": "S4", "to": "S5", "trigger": "e-4_or_emotion_threshold" }
    ]
  },
  {
    "disputeId": "d-5",
    "lieType": "LT-3",
    "lieIntensity": "L1",
    "lieMotive": "self_protection",
    "initialState": "S0",
    "collapseViaTrust": false,
    "transitions": [
      { "from": "S0", "to": "S1", "trigger": "agreement_reminder" },
      { "from": "S1", "to": "S2", "trigger": "e-6_presented" },
      { "from": "S2", "to": "S5", "trigger": "shared_responsibility_question" }
    ]
  }
]
```

**핵심 포인트**: d-3("최민정은 외도 상대인가")에서 `collapseViaTrust: true`이다. 즉 압박이 아니라 **공감 루트**로도 무너뜨릴 수 있다. 신뢰가 임계치를 넘으면 자발적 고백(S5 직행).

---

## C. 진실 공개 정책 (Truth Policy) — spouse-01, partyA

LLM이 각 lie state에서 **어떤 진실을 말해도 되고, 어떤 진실을 절대 말하면 안 되는지** 제어한다.

```
spouse-01 → partyA → d-1 (비밀 송금 280만원):
  S0: allowed=[], forbidden=[t-1,t-2,t-3,t-4,t-5]  ← 전부 금지
  S1: allowed=[], forbidden=[t-1,t-2,t-3,t-4,t-5]  ← 전부 금지
  S2: allowed=[t-3], forbidden=[t-1,t-2,t-4,t-5]    ← "골목 만남=상담" 만 허용
  S3: allowed=[t-3], forbidden=[t-1,t-2,t-4,t-5]
  S4: allowed=[t-3,t-5], forbidden=[t-1,t-2,t-4]    ← "약속 위반" 추가 허용
  S5: allowed=[t-1~t-5], forbidden=[]                ← 전부 공개
```

**이것이 왜 중요한가**: LLM은 사건의 모든 정보를 system prompt로 받지만, truth policy가 "지금 이 상태에서 이 진실은 말하면 안 된다"를 강제한다. **이 가드가 제대로 작동하지 않으면 AI가 너무 일찍 진실을 누설**한다.

---

## D. 증인 예산 (Witness Budget) — spouse-01

각 증인이 **말해도 되는 것 / 불확실한 것 / 절대 말하면 안 되는 것**을 정의한다.

```
tp-1: 오미숙 (세린의 어머니) — bias: pro_b
  canState:
    - "추석 연휴에 본인 돌봄 공백이 생겨 가족이 간병 인력을 알아보던 분위기가 있었다."
    - "세린이 동생 돈 문제를 남편에게 바로 말하지 못해 마음이 급해 보였다."
  uncertain:
    - "280만원 송금의 정확한 시각과 명목은 직접 보지 못했다."
    - "최민정을 만난 밤 골목 접촉의 실제 목적은 전해 들은 수준이다."
  forbidden:
    - "세린의 휴대폰 무단 열람과 제3자 캡처 공유의 구체적 경위"
    - "정우성 계좌를 거친 150만원의 실제 금융 흐름"

tp-3: 최민정 (재가돌봄센터 상담팀장) — bias: neutral
  canState:
    - "지석이 280만원을 추석 연휴 간병 예약금으로 납부했고 대상자가 오미숙이었다."
    - "문제의 만남은 센터 후문 상담 일정이었고 사적 밀회가 아니었다."
    - "예약서, 직인, 수납 기록 등 기관 원본으로 그 사실을 확인할 수 있다."
  uncertain:
    - "부부 사이에 100만원 이상 사전 상의 약속이 어떻게 정해졌는지는 모른다."
  forbidden:
    - "세린의 휴대폰 열람·캡처 공유 경위"
    - "세린 동생의 월세 사정과 150만원 우회 송금 세부"
```

---

## E. Phase 1 스크립트 (사전 생성) — spouse-01

Phase 1~2는 LLM이 아닌 **미리 생성된 스크립트**가 자동 재생된다. 실제 대사:

```json
[
  {
    "speaker": "system",
    "text": "추석을 앞두고 간병 공백과 빠듯한 살림 속에서, 부부가 서로의 침묵을 의심으로 받아들인 사건이다."
  },
  {
    "speaker": "a",
    "text": "재판관님, 9월 20일 기준으로 공동통장에서 2,800,000원이 빠진 건 맞습니다. 다만 그 돈의 용도는 제가 설명드릴 수 있고, 100만원 넘는 지출을 미리 상의하지 못한 건 제 잘못입니다.",
    "relatedDisputes": ["d-1", "d-5"],
    "behaviorHint": "손가락으로 금액을 짚으며 숨을 고르고 말한다."
  },
  {
    "speaker": "b",
    "text": "자기야, 세 번째로 묻는 건데 그 280만원 어디 쓴 거야. 그 여자 이름으로 새벽 문자까지 오갔는데 내가 뭘 믿어야 해.",
    "relatedDisputes": ["d-1", "d-3"],
    "behaviorHint": "휴대폰 캡처 화면을 들어 보이며 몰아붙인다."
  },
  {
    "speaker": "a",
    "text": "9시 12분에 메시지가 온 건 맞아. 하지만 그게 외도라는 뜻은 아니야. 그건 순서가 있어 — 문자보다 먼저, 왜 새벽에 내 폰을 열어봤는지부터 말해.",
    "relatedDisputes": ["d-2", "d-3"],
    "behaviorHint": "시선을 피하다가 마지막 문장에서만 고개를 든다."
  },
  {
    "speaker": "b",
    "text": "폰을 안 봤으면 내가 계속 바보처럼 명절상만 차렸겠지. 자기가 숨긴 건 280만원 하나가 아니라 나를 속인 거잖아.",
    "relatedDisputes": ["d-2", "d-1"],
    "behaviorHint": "팔짱을 끼고 단어마다 힘을 준다."
  },
  {
    "speaker": "a",
    "text": "왜 그랬냐고 묻기 전에 자기는 왜 150만원을 다른 계좌로 돌려보냈어. 서로 100만원 넘는 돈은 먼저 상의하자고 해놓고 둘 다 그 약속을 깬 거잖아.",
    "relatedDisputes": ["d-4", "d-5"],
    "behaviorHint": "방어적으로 되묻다가 입술을 한 번 깨문다."
  },
  {
    "speaker": "b",
    "text": "내 150만원은 급해서 다른 계좌로 돌린 거야. 그런데 자기는 출처도 안 말하고 낯선 여자 이름이 찍혀 있으니까 내가 의심할 수밖에 없었잖아.",
    "relatedDisputes": ["d-4", "d-3", "d-1"],
    "behaviorHint": "억울함에 웃듯 숨을 뱉고 다시 쏘아본다."
  },
  {
    "speaker": "a",
    "text": "그날 저녁 8시 반에 물류 마감 끝내고, 동료한테 인수인계하고, 주차장까지 걸어가는 동안 연락이 온 거라서 바로 설명을 못 했어. 그리고… 처가 살림도 제대로 못 감당하는 사람처럼 보일까 봐 말을 미뤘어.",
    "relatedDisputes": ["d-1", "d-3"],
    "behaviorHint": "업무 동선을 길게 늘어놓다가 끝내 목소리가 낮아진다."
  },
  {
    "speaker": "system",
    "text": "양측 모두 진정해 주십시오. 휴대폰 열람과 송금 경위를 구분해서 정리해 주시기 바랍니다."
  },
  {
    "speaker": "b",
    "text": "재판관님, 저는 새벽에 폰을 본 잘못이 있습니다. 하지만 제 남편은 공동통장 송금도, 100만원 상의 약속도, 외도처럼 보일 정황도 먼저 숨겼고 — 그래서 신뢰가 무너진 겁니다.",
    "relatedDisputes": ["d-1", "d-2", "d-3", "d-5"],
    "behaviorHint": "감정을 누르려 입술을 다문 채 또렷하게 정리한다."
  }
]
```

---

## F. LLM 시스템 프롬프트 구성 — 실제 코드

Phase 3~5에서 LLM에 보내는 시스템 프롬프트는 다음과 같이 조립된다:

### F-1. 거짓말 상태별 지시문 (stateInstructions)
```
S0: "이 쟁점을 완전히 부정하세요. 자신감 있게, 흔들림 없이.
     거짓말 방식: [LT에 따라 다름]
     ★ 핵심 행위를 절대 인정하지 마세요.
     ★ 부정하면서 동시에 죄책감/불안/후회를 표현하지 마세요. 모순됩니다.
       ❌ '안 했습니다. 다만 불안한 마음에...' (부정과 죄책감이 동시에 → 모순)
       ✅ '그런 적 없습니다. 상대방의 오해입니다.' (깨끗한 부정)"

S1: "약간 흔들리고 있지만 아직 핵심은 부정합니다.
     배경이나 주변 상황은 인정할 수 있지만, 핵심 행위 자체는 부정 유지."

S2: "일부를 인정합니다. '맞지만 이유가 달랐다'는 식으로.
     행위 자체는 인정하되, 의도나 맥락을 다르게 설명."

S3: "상대 탓으로 돌리세요. '내가 그런 건 상대 때문이다'."

S4: "감정적으로 호소하세요. '그때 얼마나 힘들었는지...'
     이전에 거짓말한 것에 대해 '말하기 두려웠다'고 인정 가능."

S5: "인정합니다. 사실을 인정하되 자기 입장에서 재해석하세요."
```

### F-2. 쟁점 컨텍스트 구성 (상태에 따라 달라짐)
```
S0~S1: "상대방이 '지석의 비밀 송금 280만원' 건에 대해 당신을 추궁하고 있다.
        당신은 이 사안의 핵심을 부정하는 입장이다.
        숨기려는 이유: 체면을 지키려는 마음
        ★ 진실을 모르는 것처럼 행동하세요. 구체적 사실을 스스로 꺼내지 마세요."

S2~S3: "일부 사실이 드러나고 있다. 행위 자체는 부분적으로 인정하지만,
        의도나 맥락은 다르게 설명하는 입장이다."

S5:    "당신은 진실을 인정한 상태다.
        사실: [truthDescription 전체 공개]"
```

**핵심**: S0~S1에서는 `truthDescription`을 LLM에 주지 않는다. NPC는 "자기가 뭘 했는지"를 프롬프트에서 모른다. 이것이 진실 누설 방지의 핵심 메커니즘.

### F-3. LLM 응답 JSON 형식
```json
{
  "npcResponse": "2~3문장 대사 (괄호 행동묘사 가능)",
  "behaviorHint": "행동 묘사",
  "stance": "deny|hedge|partial_admit|admit|reframe",
  "mentionedTruthIds": ["t-1", "t-2"],
  "responseMode": "answer_only|answer_then_counter|evidence_rebuttal|private_confession",
  "requestedFollowup": "추가 심문 요청 (선택)"
}
```

### F-4. 후처리 (Post-processing)
1. **호칭 교정**: LLM이 상대 호칭을 잘못 쓰면 자동 교정 (예: 상대에게 "자기야"라고 했는데 재판관 앞이면 "제 아내"로)
2. **존댓말 강제**: 재판관에게 반말을 쓰면 ~습니다/~요로 자동 변환
3. **truth 누출 체크**: mentionedTruthIds가 forbidden 리스트에 있으면 필터링

---

## G. 다른 관계유형 샘플 — workplace-01 "보고서 공 가로채기"

다른 분위기의 사건 예시:

```json
{
  "caseId": "case-work-01",
  "meta": {
    "relationshipType": "boss_employee",
    "conflictSeed": "CS-2",
    "twistModule": "TW-4",
    "difficulty": "hard",
    "anchorTruth": "서윤 명의가 찍힌 23:48 수정 기록은 관리자 대리발급 토큰으로 덮어쓴 흔적이다. 서윤의 실제 마지막 편집은 20:17에 끝났다.",
    "emotionalBait": "승진 심사 마감 3일 전, 밤 11시 캡처에 찍힌 서윤 이름 하나가 '보고서를 망친 후배 vs 성과를 훔친 상사' 구도를 완성한다."
  },
  "duo": {
    "partyA": {
      "name": "윤태성", "age": 42, "occupation": "퍼포먼스마케팅팀 팀장",
      "archetype": "cold_logic",
      "speechStyle": "\"프로세스상 그렇게 처리된 겁니다.\" 불리한 질문이 나오면 감정 대신 절차를 세워 책임 주체를 흐린다.",
      "verbalTells": [
        { "type": "process_shield", "trigger": "lying", "pattern": "자기 결정을 물어도 절차 뒤에 숨어 주체를 지운다." },
        { "type": "premature_summary", "trigger": "cornered", "pattern": "상대 질문이 끝나기 전에 끊고 요약해 쟁점 범위를 자기가 정한다." },
        { "type": "pronoun_blur", "trigger": "avoiding", "pattern": "'우리가 정리했고, 그쪽에서 올렸죠.' 주어를 흐려 자기 손이 닿은 지점을 감춘다." }
      ]
    },
    "partyB": {
      "name": "박서윤", "age": 31, "occupation": "그로스분석 대리",
      "archetype": "confrontational",
      "speechStyle": "\"가로챘다고요? 제가 가로챈 거라고요?\" 상대 표현을 되받아 반복한다. 억울할수록 말이 빨라진다.",
      "verbalTells": [
        { "type": "timestamp_barrage", "trigger": "lying", "pattern": "불리하면 분 단위 시간표로 덮는다." },
        { "type": "echo_challenge", "trigger": "cornered", "pattern": "상대 표현을 비꼬듯 되물으며 주도권을 잡으려 한다." }
      ]
    }
  }
}
```

---

## H. 현재 AI 답변 문제 (알려진 이슈)

### 문제 1: 진실 조기 누설
- S0~S1인데도 AI가 죄책감이나 후회를 표현하여 사실상 "내가 뭔가 했다"를 암시
- truthPolicy의 forbidden을 프롬프트에 넣어도 LLM이 무시하는 경우 있음
- **원인 추정**: system prompt가 너무 길어서 LLM이 뒷부분 지시를 놓침

### 문제 2: 호칭/존댓말 혼란
- 재판관에게 반말, 상대에게 존댓말 등이 뒤섞임
- 후처리로 교정하지만 100% 잡히지 않음
- **원인 추정**: 한국어 경어법의 복잡성 + GPT-4o-mini의 한국어 한계

### 문제 3: 캐릭터성 유지 실패
- avoidant 캐릭터가 돌연 공격적으로 변하거나, confrontational이 갑자기 순해짐
- verbalTell이 발현되지 않는 경우가 많음
- **원인 추정**: speechStyle, verbalTells를 프롬프트에 넣어도 LLM이 자기 스타일로 답변

### 문제 4: 반복적/뻔한 답변
- 같은 질문 유형에 비슷한 패턴의 답변
- "그건 제가 말씀드린 것처럼..." 같은 회피 패턴 반복
- **원인 추정**: temperature 설정 (0.85)이 충분하지 않거나, 프롬프트에 다양성 지시 부족

[
{
"caseId": "case-spouse-01",
"meta": {
"relationshipType": "spouse",
"conflictSeed": "CS-1",
"variableModules": [
"VM-C"
],
"twistModule": "TW-6",
"difficulty": "medium",
"anchorTruth": "한지석이 여성 명의로 보낸 280만원은 외도 자금이 아니라 추석 연휴용 간병 예약금이었다.",
"emotionalBait": "여성 이름 송금, 늦은 밤 골목 만남, 모텔가 인근 위치기록이 겹치며 외도가 핵심처럼 보인다.",
"resolutionDilemma": "선의로 숨긴 가족지원과 명백한 사생활 침해 중 무엇을 더 무겁게 판단하고, 부부 재정 통제권을 어떻게 다시 설계할지가 어렵다."
},
"duo": {
"partyA": {
"name": "한지석",
"age": 39,
"occupation": "물류센터 야간 운영팀장",
"incomeBracket": "mid",
"archetype": "avoidant",
"speechStyle": "질문을 받으면 먼저 날짜와 금액부터 말하며 감정 설명을 뒤로 미룬다. 불리해지면 '그건 나중에'라며 순서를 통제하려 한다.",
"pride": 7,
"fear": "무능한 가장으로 보이거나 처가 문제를 감당 못 한다는 평가를 듣는 것",
"riskAppetite": 4,
"digitalHabit": "banking_app_heavy",
"dailyRoutine": "오후에 출근해 밤샘 근무를 하고, 새벽 귀가 후 오전엔 은행·관공서 일을 몰아서 처리한다.",
"sensitivePoints": [
"가장 역할",
"처가 지원 문제",
"실패한 투자 전력"
],
"verbalTells": [
{
"type": "over_precision",
"trigger": "lying",
"pattern": "불편한 질문이 나오면 '9시 12분쯤', '2,800,000원 딱'처럼 숫자를 과하게 정밀하게 말한다."
},
{
"type": "counter_question",
"trigger": "cornered",
"pattern": "자신의 의도를 묻는 대신 '그럼 당신은 왜 그걸 봤는데?'라고 질문을 되돌린다."
},
{
"type": "timeline_padding",
"trigger": "shame",
"pattern": "핵심 전후에 업무 동선을 길게 붙여 본론을 늦춘다."
}
]
},
"partyB": {
"name": "오세린",
"age": 36,
"occupation": "프리랜서 플로리스트",
"incomeBracket": "mid",
"archetype": "confrontational",
"speechStyle": "같은 질문을 어조만 바꿔 세 번쯤 반복하며 상대의 표정 변화를 본다. 확신이 서면 감정과 사실을 한 문장에 섞어 몰아붙인다.",
"pride": 6,
"fear": "배우자에게 속은 채 명절상을 차리는 사람으로 남는 것",
"riskAppetite": 6,
"digitalHabit": "messenger_main",
"dailyRoutine": "오전엔 꽃시장, 오후엔 주문 제작, 밤에는 가족 단톡과 정산 앱을 함께 본다.",
"sensitivePoints": [
"외도 의심",
"동생의 반복된 금전 문제",
"시댁 앞에서 체면 구기는 일"
],
"verbalTells": [
{
"type": "evidence_waving",
"trigger": "lying",
"pattern": "캡처 한 장을 흔들며 전체 맥락을 이미 안다는 듯 단정한다."
},
{
"type": "motive_jump",
"trigger": "hurt",
"pattern": "행동 하나를 곧바로 '그러니까 날 속인 거잖아' 같은 의도 단정으로 연결한다."
},
{
"type": "selective_quote",
"trigger": "defensive",
"pattern": "상대가 한 긴 문장에서 불리한 짧은 구절만 반복 인용한다."
}
]
},
"relationshipLedger": [
{
"id": "ledger-1",
"category": "confirmed",
"description": "재작년 지석의 소액 투자 손실 이후 두 사람은 100만원 이상 지출은 사전에 상의하기로 합의했다.",
"isReal": true,
"whoRemembersAccurately": "both",
"whoDistorts": "none",
"distortionDirection": "",
"currentlyResolved": "surface_only",
"emotionalResidue": "strong",
"connectionToCurrent": "direct"
},
{
"id": "ledger-2",
"category": "distorted",
"description": "세린의 동생이 작년에 급전 요청을 했을 때 지석이 한 번만 돕자고 했던 일을 두 사람 모두 다르게 기억한다.",
"isReal": true,
"whoRemembersAccurately": "both",
"whoDistorts": "both",
"distortionDirection": "A: '그때가 마지막이라고 분명히 말했다' / B: '급하면 가족을 도울 수 있다고 열어뒀다'",
"currentlyResolved": "unresolved",
"emotionalResidue": "mild",
"connectionToCurrent": "indirect"
},
{
"id": "ledger-3",
"category": "silenced",
"description": "세린 어머니의 가을 수술 뒤 연휴 간병을 누가 얼마나 맡을지 끝내 정하지 못한 채 말을 덮어둔 적이 있다.",
"isReal": true,
"whoRemembersAccurately": "both",
"whoDistorts": "none",
"distortionDirection": "",
"currentlyResolved": "surface_only",
"emotionalResidue": "strong",
"connectionToCurrent": "direct"
}
],
"socialGraph": [
{
"id": "tp-1",
"slot": "family_1",
"name": "오미숙 (세린의 어머니)",
"relationTo": "b",
"knowledgeScope": "연휴 간병이 필요하다는 사실과 딸이 동생 문제를 배우자에게 숨기려 한 정황 일부를 안다.",
"witnessedDirectly": false,
"bias": "pro_b",
"distortionRisk": "unconscious"
},
{
"id": "tp-2",
"slot": "acquaintance_1",
"name": "이재훈 (지석의 직장 동료)",
"relationTo": "a",
"knowledgeScope": "지석이 추석 직전 재가돌봄센터 견적을 여러 번 물어봤다는 사실을 안다.",
"witnessedDirectly": false,
"bias": "pro_a",
"distortionRisk": "accurate"
},
{
"id": "tp-3",
"slot": "institutional",
"name": "최민정 (재가돌봄센터 상담팀장)",
"relationTo": "both",
"knowledgeScope": "지석의 상담 예약, 입금 목적, 상담 장소와 시간을 원본 기준으로 확인할 수 있다.",
"witnessedDirectly": true,
"bias": "neutral",
"distortionRisk": "accurate"
}
]
},
"context": {
"contextType": "holiday",
"description": "추석 일주일 전, 두 사람은 명절 차례비와 병원비, 처가 방문 일정까지 한 번에 맞춰야 했다. 연휴 동안 어머니 간병 인력이 비는 구간이 생기자 돈과 시간이 동시에 부족해졌고, 둘 다 상대가 먼저 말해주길 기다리다 의심부터 키웠다.",
"emotionalPressure": 8,
"affects": "both",
"triggerAmplifier": "명절 직전이라 추가 지출을 설명하기 어려웠고, 가족 단위 일정이 촘촘해 작은 은닉도 곧 외도나 배신처럼 보이게 됐다."
},
"disputes": [
{
"id": "d-1",
"name": "지석의 비밀 송금",
"truth": true,
"truthDescription": "지석은 세린과 상의 없이 공동생활비에서 280만원을 빼 재가돌봄센터 상담팀장 최민정에게 송금했다.",
"quadrant": "a_only",
"requiredEvidence": [
"e-1",
"e-2"
],
"correctResponsibility": {
"a": 70,
"b": 30
},
"ambiguity": "none",
"weight": "high",
"mediationLink": "재정투명화",
"legitimacyIssue": false
},
{
"id": "d-2",
"name": "세린의 휴대폰 열람과 제3자 공유",
"truth": true,
"truthDescription": "세린은 지석의 휴대폰을 무단으로 확인해 대화 일부를 캡처했고, 이를 언니에게 보내며 외도 의심을 확산시켰다.",
"quadrant": "b_only",
"requiredEvidence": [
"e-3"
],
"correctResponsibility": {
"a": 20,
"b": 80
},
"ambiguity": "none",
"weight": "high",
"mediationLink": "사생활경계",
"legitimacyIssue": true
},
{
"id": "d-3",
"name": "최민정과의 관계는 외도인가",
"truth": false,
"truthDescription": "최민정은 외도 상대가 아니라 돌봄센터 상담팀장이며, 골목 만남처럼 보인 접촉도 연휴 간병 상담이었다.",
"quadrant": "shared_misconception",
"requiredEvidence": [
"e-3",
"e-4"
],
"correctResponsibility": {
"a": 40,
"b": 60
},
"ambiguity": "low",
"weight": "high",
"mediationLink": "신뢰회복",
"legitimacyIssue": true
},
{
"id": "d-4",
"name": "세린의 우회 가족지원",
"truth": true,
"truthDescription": "세린도 동생의 밀린 월세를 막기 위해 지석 몰래 150만원을 지인 정우성 계좌로 우회 송금했다.",
"quadrant": "b_only",
"requiredEvidence": [
"e-5",
"e-6"
],
"correctResponsibility": {
"a": 25,
"b": 75
},
"ambiguity": "none",
"weight": "high",
"mediationLink": "재정투명화",
"legitimacyIssue": false
},
{
"id": "d-5",
"name": "사전 상의 약속의 쌍방 위반",
"truth": true,
"truthDescription": "두 사람은 이미 100만원 이상 지출 사전 상의를 약속했지만, 지석은 비밀 송금으로 약속을 깼고 세린은 우회 송금으로 약속의 취지를 무너뜨렸다.",
"quadrant": "both_know",
"requiredEvidence": [
"e-1",
"e-6"
],
"correctResponsibility": {
"a": 55,
"b": 45
},
"ambiguity": "none",
"weight": "medium",
"mediationLink": "재정투명화",
"legitimacyIssue": false
}
],
"evidence": [
{
"id": "e-1",
"name": "공동계좌 거래내역서",
"description": "9월 20일 공동생활비 계좌에서 최민정 명의로 280만원이 이체된 원본 거래내역이다.",
"type": "bank",
"reliability": "hard",
"completeness": "original",
"provenance": "institutional",
"legitimacy": "lawful",
"proves": [
"d-1",
"d-5"
],
"isTrap": false,
"requires": [],
"investigationResults": {
"request_original": "은행 원본에는 이체 시각과 수취인 실명이 남아 있다.",
"check_metadata": "조회 단말은 지석의 휴대폰이지만 공인인증 기록은 본인 명의다.",
"restore_context": "이체 직전 돌봄센터 대표번호로 두 차례 통화가 있었다.",
"verify_source": "은행 고객센터 확인으로 위·변조 흔적이 없었다.",
"check_edits": "편집 흔적이 없는 PDF 발급본이다.",
"question_acquisition": "부부 공동계좌라 조회 정당성에는 문제가 없지만 사용 동의 여부는 별도 쟁점이다."
}
},
{
"id": "e-2",
"name": "재가돌봄센터 상담예약 확인서",
"description": "최민정이 상담팀장으로 기재된 추석 연휴 간병 예약서와 280만원 예약금 영수증이다.",
"type": "contract",
"reliability": "hard",
"completeness": "original",
"provenance": "institutional",
"legitimacy": "lawful",
"proves": [
"d-1",
"d-3"
],
"isTrap": false,
"requires": [
"e-1"
],
"investigationResults": {
"request_original": "원본 예약서는 지석 이름으로 접수돼 있고 대상자는 세린 어머니로 적혀 있다.",
"check_metadata": "작성 시간은 송금 직후이며 수정 이력은 없다.",
"restore_context": "상담 사유란에 '추석 연휴 가족 돌봄 공백'이 명시돼 있다.",
"verify_source": "센터 대표번호와 사업자등록번호가 일치했다.",
"check_edits": "전자서명 검증 결과 편집본이 아니다.",
"question_acquisition": "기관 제출본이라 적법하지만 어머니의 건강정보 일부는 최소한으로만 공개된다."
}
},
{
"id": "e-3",
"name": "세린이 캡처한 메신저 대화 일부",
"description": "'지난번처럼 조용한 데서 보죠'라는 문장이 포함된 지석-최민정 대화 캡처다.",
"type": "chat",
"reliability": "soft",
"completeness": "cropped",
"provenance": "personal_device",
"legitimacy": "privacy_concern",
"proves": [
"d-2",
"d-3"
],
"isTrap": true,
"requires": [],
"investigationResults": {
"request_original": "원본 전체 대화는 제출되지 않았고 캡처본만 있다.",
"check_metadata": "세린 휴대폰 갤러리 생성 시각이 새벽 2시로 남아 있다.",
"restore_context": "앞뒤 문맥이 잘려 있어 장소가 무엇인지 단정할 수 없다.",
"verify_source": "지석 계정의 대화창 화면을 직접 캡처한 것으로 보인다.",
"check_edits": "문자열 편집 흔적은 없지만 선택적 크롭이 확인된다.",
"question_acquisition": "잠금 해제 직후 무단 열람으로 얻은 자료라 사생활 침해 소지가 크다."
}
},
{
"id": "e-4",
"name": "상담 건물 출입기록과 카페 영수증",
"description": "문제의 밤 지석이 들어간 건물이 모텔이 아니라 돌봄센터 후문과 붙은 상담동이었음을 보여주는 출입기록과 1층 카페 영수증이다.",
"type": "access_log",
"reliability": "soft",
"completeness": "partial",
"provenance": "mixed",
"legitimacy": "lawful",
"proves": [
"d-3"
],
"isTrap": false,
"requires": [],
"investigationResults": {
"request_original": "출입명부와 카드결제 영수증 원본 번호가 일치한다.",
"check_metadata": "시간대가 e-3 대화 캡처와 같은 날 21시 14분으로 맞아떨어진다.",
"restore_context": "해당 블록은 모텔가로 보이지만 실제 상담실 후문이 같은 골목에 붙어 있다.",
"verify_source": "건물 관리인과 카드사 양쪽에서 확인됐다.",
"check_edits": "영수증은 편집 흔적이 없고 출입기록은 출력본이다.",
"question_acquisition": "지석이 동의해 제출한 자료라 절차상 문제는 적다."
}
},
{
"id": "e-5",
"name": "세린-정우성 송금 요청 메시지",
"description": "세린이 대학 동기 정우성에게 '지석한테는 추석 지나고 말할게'라며 150만원 우회 송금을 부탁한 대화 원본이다.",
"type": "chat",
"reliability": "soft",
"completeness": "original",
"provenance": "personal_device",
"legitimacy": "lawful",
"proves": [
"d-4"
],
"isTrap": false,
"requires": [],
"investigationResults": {
"request_original": "정우성이 보관한 대화 원본과 세린 휴대폰 대화가 일치한다.",
"check_metadata": "전송 시각은 지석 송금 다음 날 오전이다.",
"restore_context": "수신자는 세린 동생이 아니라 중간 전달자인 정우성이다.",
"verify_source": "두 단말의 해시 비교로 동일성이 확인됐다.",
"check_edits": "삭제 복원 흔적은 있으나 본문 조작은 없다.",
"question_acquisition": "정우성이 임의 제출했지만 본인 대화 상대 자료라 위법성은 낮다."
}
},
{
"id": "e-6",
"name": "정우성 계좌 입금확인서와 월세 납부증",
"description": "정우성 계좌로 들어온 150만원이 곧바로 세린 동생의 연체 월세로 사용됐음을 보여주는 입금확인서와 납부증이다.",
"type": "bank",
"reliability": "hard",
"completeness": "original",
"provenance": "institutional",
"legitimacy": "lawful",
"proves": [
"d-4",
"d-5"
],
"isTrap": false,
"requires": [
"e-5"
],
"investigationResults": {
"request_original": "정우성 계좌 입금 내역과 임대인 수납증 원본이 연결된다.",
"check_metadata": "중간 전달 시간차는 18분으로 우회 송금 구조가 선명하다.",
"restore_context": "세린 동생 명의 채무를 긴급히 막기 위한 일회성 지급이었다.",
"verify_source": "은행과 임대인 영수증 양쪽 검증이 끝났다.",
"check_edits": "기관 발급 원본이라 편집 흔적이 없다.",
"question_acquisition": "제3자의 재정정보가 포함돼 있어 사용 범위는 최소화해야 한다."
}
}
],
"evidenceCombinations": [
{
"requires": [
"e-3",
"e-4"
],
"upgradesTo": "hard",
"proves": [
"d-3"
]
}
],
"truthTable": [
{
"id": "t-1",
"fact": "지석이 최민정에게 보낸 280만원은 연휴 간병 예약금이었다.",
"isTrue": true,
"weight": 10,
"quadrant": "a_only"
},
{
"id": "t-2",
"fact": "세린은 지석의 휴대폰을 무단 열람해 캡처를 제3자에게 보냈다.",
"isTrue": true,
"weight": 9,
"quadrant": "b_only"
},
{
"id": "t-3",
"fact": "골목 만남처럼 보인 접촉은 돌봄센터 후문 상담 일정이었다.",
"isTrue": true,
"weight": 8,
"quadrant": "shared_misconception"
},
{
"id": "t-4",
"fact": "세린도 동생을 위해 150만원을 우회 송금했다.",
"isTrue": true,
"weight": 8,
"quadrant": "b_only"
},
{
"id": "t-5",
"fact": "두 사람 모두 100만원 이상 사전 상의 약속을 다른 방식으로 어겼다.",
"isTrue": true,
"weight": 7,
"quadrant": "both_know"
}
],
"lieConfigA": [
{
"disputeId": "d-1",
"lieType": "LT-2",
"lieIntensity": "L2",
"lieMotive": "face_saving",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "bank_transfer_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-1_presented"
},
{
"from": "S2",
"to": "S3",
"trigger": "purpose_followup"
},
{
"from": "S3",
"to": "S5",
"trigger": "e-2_or_responsibility_question"
}
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
{
"from": "S0",
"to": "S1",
"trigger": "cropped_chat_presented"
},
{
"from": "S1",
"to": "S2",
"trigger": "location_timeline_question"
},
{
"from": "S2",
"to": "S4",
"trigger": "nonjudgmental_question_about_mother_in_law"
},
{
"from": "S4",
"to": "S5",
"trigger": "e-4_or_emotion_threshold"
}
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
{
"from": "S0",
"to": "S1",
"trigger": "agreement_reminder"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-6_presented"
},
{
"from": "S2",
"to": "S5",
"trigger": "shared_responsibility_question"
}
]
}
],
"lieConfigB": [
{
"disputeId": "d-2",
"lieType": "LT-1",
"lieIntensity": "L2",
"lieMotive": "self_protection",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "phone_access_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-3_presented"
},
{
"from": "S2",
"to": "S3",
"trigger": "third_party_share_question"
},
{
"from": "S3",
"to": "S5",
"trigger": "sister_reference"
}
]
},
{
"disputeId": "d-4",
"lieType": "LT-2",
"lieIntensity": "L2",
"lieMotive": "third_party_protection",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "missing_money_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-5_presented"
},
{
"from": "S2",
"to": "S3",
"trigger": "beneficiary_question"
},
{
"from": "S3",
"to": "S5",
"trigger": "e-6_presented"
}
]
},
{
"disputeId": "d-5",
"lieType": "LT-4",
"lieIntensity": "L1",
"lieMotive": "face_saving",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "agreement_reminder"
},
{
"from": "S1",
"to": "S2",
"trigger": "joint_rule_question"
},
{
"from": "S2",
"to": "S5",
"trigger": "shared_responsibility_question"
}
]
}
],
"solutions": {
"재정투명화": [
"추석 이후 한 달간 50만원 이상 지출만 공동 기록표에 적고 과거 추궁은 보류한다.",
"공동계좌와 개인계좌를 분리하되 100만원 이상 가족지원은 사전 서면 동의를 의무화한다.",
"한시적으로 제3의 재무중재인에게 생활비 배분 권한을 맡기고 약속 위반 시 공동계좌 접근권을 제한한다."
],
"사생활경계": [
"서로의 휴대폰 비밀번호를 즉시 바꾸고, 의심이 생기면 직접 질문 1회 후 제3자 상담으로 넘긴다.",
"가족이나 형제자매에게 배우자 의심 정황을 공유하기 전 당사자 확인 절차를 문서로 정한다.",
"다시 무단 열람이 발생하면 별거 중 정보접근 규칙을 적용하는 경계 합의를 체결한다."
],
"신뢰회복": [
"최민정 상담팀장 확인 하에 오해가 된 문장과 장소를 함께 재구성하고 사과문을 교환한다.",
"명절 이후 처가 지원과 동생 지원을 구분한 우선순위 회의를 정식으로 연다.",
"외도 의심을 반복 무기로 쓰는 경우 부부상담을 의무화하고 미이행 시 재정 분리 수위를 높인다."
]
},
"activeLedgerEntries": [
"ledger-1",
"ledger-3"
],
"activeThirdParties": [
"tp-1",
"tp-3"
]
},
{
"caseId": "case-spouse-02",
"meta": {
"relationshipType": "spouse",
"conflictSeed": "CS-4",
"variableModules": [
"VM-E"
],
"twistModule": "TW-1",
"difficulty": "hard",
"anchorTruth": "나희주의 과거 상담 종결서 일부를 학교와 학부모 채널에 흘린 출발점은 강도윤의 보조 이메일과 스캔 기록이었다.",
"emotionalBait": "공유 프린터에서 나온 희주의 학교 메일 초안 때문에, 처음에는 희주가 먼저 남편을 학교에서 배제하려 한 가해자로 보인다.",
"resolutionDilemma": "도윤이 '아이를 지키려 했다'고 주장하더라도 배우자의 과거 정신건강 기록을 무기화한 행위를 어디까지 용인할 수 있는지, 또 희주의 무단 열람을 어떻게 함께 다뤄야 할지가 어렵다."
},
"duo": {
"partyA": {
"name": "나희주",
"age": 34,
"occupation": "소아병동 간호사",
"incomeBracket": "mid",
"archetype": "hyper_responsible",
"speechStyle": "감정을 억누른 채 핵심 문장부터 짧게 말하고, 불안해지면 확인된 사실과 추정을 엄격히 구분하려 든다. 그러나 억울함이 커지면 갑자기 속도가 빨라진다.",
"pride": 8,
"fear": "엄마 자격과 돌봄 안정성을 의심받는 것",
"riskAppetite": 3,
"digitalHabit": "calendar_and_notes",
"dailyRoutine": "새벽 출근과 교대근무 사이에 아이 입학 서류를 정리하고, 밤에는 메모앱으로 다음 날 동선을 체크한다.",
"sensitivePoints": [
"과거 상담 기록",
"양육 적합성",
"아이 앞에서의 체면"
],
"verbalTells": [
{
"type": "self_editing",
"trigger": "lying",
"pattern": "말을 시작한 뒤 '아니, 정확히는'이라고 스스로 정정하며 표현 수위를 낮춘다."
},
{
"type": "legalistic_framing",
"trigger": "cornered",
"pattern": "'확인한 것'과 '열람한 것'을 구분하며 행위의 명칭을 축소한다."
},
{
"type": "breath_counting",
"trigger": "shame",
"pattern": "대답 전 숨을 세 번 고르고 짧게 끊어 답한다."
}
]
},
"partyB": {
"name": "강도윤",
"age": 37,
"occupation": "교육 스타트업 영업팀장",
"incomeBracket": "high",
"archetype": "martyr",
"speechStyle": "자신이 참고 버틴 시간을 길게 설명하며 피해자의 호흡을 만든다. 곤란해지면 '난 아이 생각만 했다'는 문장으로 감정을 덮는다.",
"pride": 8,
"fear": "좋은 아빠라는 이미지와 학교 네트워크에서의 평판을 잃는 것",
"riskAppetite": 7,
"digitalHabit": "multiple_accounts",
"dailyRoutine": "출근 전 아이 등교 루틴을 시뮬레이션하고, 점심시간에는 학부모 채팅방과 학교 공지를 수시로 확인한다.",
"sensitivePoints": [
"아버지 역할 평가",
"직장 평판",
"과거 별거 위기"
],
"verbalTells": [
{
"type": "sacrifice_stack",
"trigger": "lying",
"pattern": "'내가 병원도 다니고 설명회도 갔고'처럼 희생 목록을 길게 쌓아 의심을 눌러버린다."
},
{
"type": "victim_preload",
"trigger": "defensive",
"pattern": "본론 전에 '이런 말 또 해야 하네'라고 미리 상처받은 표정을 만든다."
},
{
"type": "moral_reframe",
"trigger": "cornered",
"pattern": "배신을 추궁받으면 '그건 보호였지 공격이 아니야'라고 도덕 프레임을 바꾼다."
}
]
},
"relationshipLedger": [
{
"id": "ledger-1",
"category": "confirmed",
"description": "2023년 별거 직전 두 사람은 과거의 상처와 상담 기록을 새로운 싸움의 무기로 쓰지 않겠다고 합의했다.",
"isReal": true,
"whoRemembersAccurately": "both",
"whoDistorts": "none",
"distortionDirection": "",
"currentlyResolved": "surface_only",
"emotionalResidue": "strong",
"connectionToCurrent": "direct"
},
{
"id": "ledger-2",
"category": "distorted",
"description": "아이 유치원 마지막 발표회 때 도윤이 보호자 대표처럼 나섰던 일을 두 사람은 정반대로 해석한다.",
"isReal": true,
"whoRemembersAccurately": "both",
"whoDistorts": "both",
"distortionDirection": "A: '내 말을 끊고 혼자 결정했다' / B: '네가 힘들어 보여 내가 대신했다'",
"currentlyResolved": "unresolved",
"emotionalResidue": "mild",
"connectionToCurrent": "indirect"
},
{
"id": "ledger-3",
"category": "silenced",
"description": "희주가 산후불안으로 상담을 받던 시기 도윤이 관련 서류를 대신 보관해주겠다고 했던 일은 고마움과 원망이 섞인 채 묻혀 있다.",
"isReal": true,
"whoRemembersAccurately": "both",
"whoDistorts": "none",
"distortionDirection": "",
"currentlyResolved": "surface_only",
"emotionalResidue": "strong",
"connectionToCurrent": "direct"
}
],
"socialGraph": [
{
"id": "tp-1",
"slot": "family_1",
"name": "문정자 (도윤의 어머니)",
"relationTo": "b",
"knowledgeScope": "도윤이 손주의 입학 문제에 과몰입해 있다는 점과 희주의 과거 상담 사실 일부를 안다.",
"witnessedDirectly": false,
"bias": "pro_b",
"distortionRisk": "unconscious"
},
{
"id": "tp-2",
"slot": "acquaintance_1",
"name": "백소라 (희주의 병원 동료)",
"relationTo": "a",
"knowledgeScope": "희주가 익명 글을 본 뒤 극도로 불안해하며 도윤 메일을 확인한 경위를 안다.",
"witnessedDirectly": false,
"bias": "pro_a",
"distortionRisk": "accurate"
},
{
"id": "tp-3",
"slot": "institutional",
"name": "정해린 (학교 학부모지원 담당)",
"relationTo": "both",
"knowledgeScope": "익명 제보 메일, 보호자 연락처 변경 관련 문의, 파일 보류 사유를 원본 로그 기준으로 확인할 수 있다.",
"witnessedDirectly": true,
"bias": "neutral",
"distortionRisk": "accurate"
}
]
},
"context": {
"contextType": "school_admission",
"description": "아이의 초등학교 입학을 열흘 앞두고 보호자 연락처, 전입 확인, 학부모 오리엔테이션 명단이 한꺼번에 확정되는 시기였다. 학교와 다른 부모들의 시선이 동시에 걸린 상황에서, 오래 덮어둔 과거 기록이 다시 소환되며 누가 아이를 더 안전하게 돌볼 사람이냐는 프레임이 생겼다.",
"emotionalPressure": 9,
"affects": "both",
"triggerAmplifier": "입학 직전이라 작은 평판 훼손도 바로 아이의 자리와 보호자 권한 문제로 번졌고, 과거 상처를 끌어오는 말 한 번이 현재의 자격 싸움으로 확대됐다."
},
"disputes": [
{
"id": "d-1",
"name": "도윤의 상담기록 무단 전달",
"truth": true,
"truthDescription": "도윤은 희주의 과거 상담 종결서 일부를 동의 없이 학교 학부모지원 담당에게 전달해 희주의 양육 안정성에 의문을 심게 했다.",
"quadrant": "b_only",
"requiredEvidence": [
"e-4",
"e-5"
],
"correctResponsibility": {
"a": 10,
"b": 90
},
"ambiguity": "none",
"weight": "high",
"mediationLink": "신뢰회복",
"legitimacyIssue": true
},
{
"id": "d-2",
"name": "희주의 무단 열람과 제한 요청 초안",
"truth": true,
"truthDescription": "희주는 공유 노트북에서 도윤의 메일 계정과 프린터 기록을 무단 확인했고, 학교에 도윤을 임시 연락망에서 빼달라는 초안을 작성했다.",
"quadrant": "a_only",
"requiredEvidence": [
"e-1",
"e-2"
],
"correctResponsibility": {
"a": 75,
"b": 25
},
"ambiguity": "low",
"weight": "high",
"mediationLink": "사생활경계",
"legitimacyIssue": true
},
{
"id": "d-3",
"name": "익명 학부모방 경고글의 출처",
"truth": true,
"truthDescription": "외부 학부모의 오해처럼 보였던 익명 경고글과 첨부 파일의 실질적 출처는 도윤이 사용한 보조 계정과 스캔 기록으로 이어진다.",
"quadrant": "b_only",
"requiredEvidence": [
"e-3",
"e-4",
"e-5"
],
"correctResponsibility": {
"a": 15,
"b": 85
},
"ambiguity": "low",
"weight": "high",
"mediationLink": "학교절차복구",
"legitimacyIssue": true
},
{
"id": "d-4",
"name": "과거 상처 비무기화 약속의 파기",
"truth": true,
"truthDescription": "두 사람은 과거 상처를 새 갈등에 끌어오지 않기로 했지만, 도윤은 상담 기록을 유포했고 희주는 도윤의 예전 별거 위기 발언을 학교 초안에 적어 넣으며 약속을 깼다.",
"quadrant": "both_know",
"requiredEvidence": [
"e-2",
"e-4"
],
"correctResponsibility": {
"a": 40,
"b": 60
},
"ambiguity": "none",
"weight": "medium",
"mediationLink": "과거청산",
"legitimacyIssue": false
},
{
"id": "d-5",
"name": "입학 파일 보류의 실제 원인",
"truth": true,
"truthDescription": "아이 입학 파일이 보류된 직접 원인은 배우자 신고가 아니라 관리사무소가 전입 확인서에 구 동호수를 기재한 행정 오류였다.",
"quadrant": "neither_knows",
"requiredEvidence": [
"e-6"
],
"correctResponsibility": {
"a": 35,
"b": 65
},
"ambiguity": "none",
"weight": "high",
"mediationLink": "학교절차복구",
"legitimacyIssue": false
}
],
"evidence": [
{
"id": "e-1",
"name": "공유 프린터에서 나온 학교 메일 초안",
"description": "희주가 작성한 '도윤을 임시 연락망에서 제외해달라'는 학교 이메일 초안 출력물이다.",
"type": "document",
"reliability": "soft",
"completeness": "partial",
"provenance": "household_device",
"legitimacy": "privacy_concern",
"proves": [
"d-2"
],
"isTrap": true,
"requires": [],
"investigationResults": {
"request_original": "출력물만 남아 있고 발송 완료 메일은 없다.",
"check_metadata": "프린트 시각은 밤 11시 52분으로 저장돼 있다.",
"restore_context": "문장 일부에 '익명 글 확인 후'라는 문구가 보여 선행 사건이 있었음을 암시한다.",
"verify_source": "가정용 프린터 로그와 용지 일련번호가 일치한다.",
"check_edits": "손글씨 수정은 없고 출력본만 존재한다.",
"question_acquisition": "공유 프린터에서 발견됐지만 개인 의도가 담긴 초안이라 사생활 침해 우려가 있다."
}
},
{
"id": "e-2",
"name": "초안 메일 버전기록과 계정 접근 로그",
"description": "초안 메일이 실제 발송되지 않았고, 희주의 무단 열람이 익명 글 노출 이후에 일어났음을 보여주는 클라우드 버전기록과 로그인 로그다.",
"type": "cloud_log",
"reliability": "hard",
"completeness": "original",
"provenance": "platform",
"legitimacy": "lawful",
"proves": [
"d-2",
"d-4"
],
"isTrap": false,
"requires": [
"e-1"
],
"investigationResults": {
"request_original": "메일 초안 버전과 로그인 IP 원본이 보존돼 있다.",
"check_metadata": "희주의 접근은 익명 글 캡처가 유포된 뒤 37분 후로 찍힌다.",
"restore_context": "초안은 저장 후 발송되지 않았고 다음 날 삭제 시도도 있었다.",
"verify_source": "메일 플랫폼 보안기록으로 출처가 검증된다.",
"check_edits": "버전 이력상 본문 수정은 두 차례뿐이다.",
"question_acquisition": "플랫폼 제공 로그라 적법하지만 타인의 계정 접속 사실 자체는 별도 위법 소지가 있다."
}
},
{
"id": "e-3",
"name": "입학 예정 학부모방 익명 글 캡처",
"description": "희주의 과거 불안 증세를 암시하는 익명 글과 상담서 일부 이미지가 올라온 폐쇄형 학부모방 캡처다.",
"type": "chat",
"reliability": "soft",
"completeness": "cropped",
"provenance": "third_party",
"legitimacy": "privacy_concern",
"proves": [
"d-3"
],
"isTrap": false,
"requires": [],
"investigationResults": {
"request_original": "방 관리자 전체 내역은 받지 못했고 회원이 전달한 캡처만 있다.",
"check_metadata": "이미지 파일 생성 시각은 오리엔테이션 명단 공지 직후다.",
"restore_context": "익명 작성자는 '보호자 한쪽의 과거 기록'이라는 표현을 써 내부 사정을 아는 사람처럼 보인다.",
"verify_source": "방 관리자 진술로 실제 게시가 있었음은 확인됐다.",
"check_edits": "크롭과 블러가 있어 단독 증거력은 약하다.",
"question_acquisition": "폐쇄형 단체방 자료라 사적 커뮤니티 침해 문제가 남는다."
}
},
{
"id": "e-4",
"name": "학교 학부모지원 담당의 메일 헤더 회신",
"description": "학교가 받은 익명 제보 메일의 헤더와 첨부 파일 해시값, 그리고 도윤의 보조 이메일로 이어지는 복구 정보가 담긴 회신이다.",
"type": "email",
"reliability": "hard",
"completeness": "original",
"provenance": "institutional",
"legitimacy": "lawful",
"proves": [
"d-1",
"d-3",
"d-4"
],
"isTrap": false,
"requires": [
"e-3"
],
"investigationResults": {
"request_original": "학교 서버에 남은 원본 헤더가 제출됐다.",
"check_metadata": "발신 보조계정의 복구 이메일과 전화번호 일부가 도윤 정보와 일치한다.",
"restore_context": "메일 본문은 '학교가 미리 알아야 할 사정'이라는 표현으로 희주의 기록을 소개한다.",
"verify_source": "학교 정보보호 담당 확인이 끝났다.",
"check_edits": "서버 추출본이라 편집 흔적이 없다.",
"question_acquisition": "기관이 비식별 처리 후 제공해 적법하다."
}
},
{
"id": "e-5",
"name": "가정용 복합기 스캔 기록과 가족클라우드 동기화 이력",
"description": "도윤 로그인 상태에서 희주의 상담 종결서가 스캔돼 가족클라우드 임시폴더로 올라간 기록이다.",
"type": "device_log",
"reliability": "soft",
"completeness": "original",
"provenance": "household_device",
"legitimacy": "lawful",
"proves": [
"d-1",
"d-3"
],
"isTrap": false,
"requires": [],
"investigationResults": {
"request_original": "복합기 관리자 로그와 클라우드 접속 이력이 일치한다.",
"check_metadata": "스캔 시각은 익명 글 게시 사흘 전이다.",
"restore_context": "파일명은 'school_ref'로 바뀌어 자동 동기화됐다.",
"verify_source": "가정용 장비 관리자 계정으로 직접 확인됐다.",
"check_edits": "문서 원본 스캔 후 자르기만 있었고 본문 조작은 없다.",
"question_acquisition": "공유 장비 기록이라 적법성은 상대적으로 높지만 의료정보가 포함돼 취급 제한이 필요하다."
}
},
{
"id": "e-6",
"name": "관리사무소 정정서와 학교 파일 보류 메모",
"description": "전입 확인서의 구 동호수 기재 오류를 정정한 관리사무소 문서와, 학교가 그 오류 때문에 파일을 보류했다는 내부 메모다.",
"type": "institutional_note",
"reliability": "hard",
"completeness": "original",
"provenance": "institutional",
"legitimacy": "lawful",
"proves": [
"d-5"
],
"isTrap": false,
"requires": [
"e-4"
],
"investigationResults": {
"request_original": "관리사무소 정정 공문과 학교 보류 메모 원본이 제출됐다.",
"check_metadata": "보류 처리 시각이 익명 메일 도착보다 앞선다.",
"restore_context": "학교는 주소 불일치가 해소될 때까지 자동 보류 절차를 밟았다.",
"verify_source": "관리사무소와 학교 행정실 양측 확인이 일치한다.",
"check_edits": "기관 문서라 편집 흔적이 없다.",
"question_acquisition": "아동 입학 행정자료이므로 사용 범위는 분쟁 해결로 한정돼야 한다."
}
}
],
"evidenceCombinations": [
{
"requires": [
"e-3",
"e-5"
],
"upgradesTo": "hard",
"proves": [
"d-1",
"d-3"
]
}
],
"truthTable": [
{
"id": "t-1",
"fact": "학교에 전달된 희주의 상담 기록 일부는 도윤의 보조 이메일과 연결된다.",
"isTrue": true,
"weight": 10,
"quadrant": "b_only"
},
{
"id": "t-2",
"fact": "희주의 학교 메일은 초안으로만 존재했고 실제 발송되지는 않았다.",
"isTrue": true,
"weight": 8,
"quadrant": "a_only"
},
{
"id": "t-3",
"fact": "익명 학부모방 글과 첨부 파일은 도윤 쪽 스캔 기록과 이어진다.",
"isTrue": true,
"weight": 9,
"quadrant": "b_only"
},
{
"id": "t-4",
"fact": "두 사람은 과거 상처와 상담 기록을 새 분쟁에 쓰지 않겠다고 합의했었다.",
"isTrue": true,
"weight": 7,
"quadrant": "both_know"
},
{
"id": "t-5",
"fact": "입학 파일 보류의 직접 원인은 관리사무소의 주소 확인 오류였다.",
"isTrue": true,
"weight": 10,
"quadrant": "neither_knows"
}
],
"lieConfigA": [
{
"disputeId": "d-2",
"lieType": "LT-2",
"lieIntensity": "L2",
"lieMotive": "self_protection",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "printer_draft_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-1_presented"
},
{
"from": "S2",
"to": "S3",
"trigger": "login_log_question"
},
{
"from": "S3",
"to": "S5",
"trigger": "e-2_presented"
}
]
},
{
"disputeId": "d-4",
"lieType": "LT-3",
"lieIntensity": "L1",
"lieMotive": "face_saving",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "old_promise_reminder"
},
{
"from": "S1",
"to": "S2",
"trigger": "draft_content_question"
},
{
"from": "S2",
"to": "S5",
"trigger": "shared_responsibility_question"
}
]
},
{
"disputeId": "d-5",
"lieType": "LT-4",
"lieIntensity": "L1",
"lieMotive": "shame_avoidance",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "school_hold_reason_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-6_presented"
},
{
"from": "S2",
"to": "S5",
"trigger": "timeline_reconstruction"
}
]
}
],
"lieConfigB": [
{
"disputeId": "d-1",
"lieType": "LT-1",
"lieIntensity": "L3",
"lieMotive": "career_preservation",
"initialState": "S0",
"collapseViaTrust": true,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "school_mail_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-5_presented"
},
{
"from": "S2",
"to": "S4",
"trigger": "child_safety_nonjudgment_question"
},
{
"from": "S4",
"to": "S5",
"trigger": "e-4_presented"
}
]
},
{
"disputeId": "d-3",
"lieType": "LT-4",
"lieIntensity": "L2",
"lieMotive": "self_protection",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "anonymous_post_question"
},
{
"from": "S1",
"to": "S2",
"trigger": "e-3_presented"
},
{
"from": "S2",
"to": "S3",
"trigger": "scan_log_question"
},
{
"from": "S3",
"to": "S5",
"trigger": "e-4_or_e-5_presented"
}
]
},
{
"disputeId": "d-4",
"lieType": "LT-7",
"lieIntensity": "L2",
"lieMotive": "relationship_maintenance",
"initialState": "S0",
"collapseViaTrust": false,
"transitions": [
{
"from": "S0",
"to": "S1",
"trigger": "old_promise_reminder"
},
{
"from": "S1",
"to": "S2",
"trigger": "small_admission_about_worry"
},
{
"from": "S2",
"to": "S3",
"trigger": "medical_record_specific_question"
},
{
"from": "S3",
"to": "S5",
"trigger": "responsibility_question"
}
]
}
],
"solutions": {
"신뢰회복": [
"도윤이 학교와 희주에게 각각 기록 유포 사실을 인정하고 회수 요청을 먼저 한다.",
"희주의 무단 열람 사과와 도윤의 기록 유포 사과를 분리해 받고, 재발 방지 문구를 공동 합의문으로 남긴다.",
"치료·상담 기록을 다시 무기화할 경우 양육 의사결정에서 일정 기간 배제하는 강한 경계 규칙을 둔다."
],
"사생활경계": [
"공유 노트북과 프린터를 가족용·개인용으로 분리하고 로그인 자동저장을 해제한다.",
"학교 관련 계정과 개인 계정을 분리하며, 상대 계정 열람이 필요하면 제3자 입회하에만 확인한다.",
"재차 무단 열람이나 계정 위장이 발생하면 별거 상태의 디지털 경계 규약을 적용한다."
],
"학교절차복구": [
"관리사무소 정정서를 먼저 제출해 보류를 해소하고, 학교에는 부부 갈등과 별개로 사실만 정정한다.",
"학부모지원 담당과 면담해 익명 제보 및 보호자 연락체계를 모두 원점에서 재설정한다.",
"학교 커뮤니티에 남은 허위 암시가 반복되면 정식 정정 요청과 법적 보존조치를 함께 밟는다."
],
"과거청산": [
"별거 위기와 상담 시기를 다시 꺼낼 때 사용할 금지 표현 목록을 정한다.",
"과거 사건은 상담실에서만 다루고 학교·가족 앞에서는 언급하지 않는 분리 규칙을 세운다.",
"과거 상처를 현재 양육 자격 공격에 사용하면 즉시 조정 절차와 외부 상담 개입을 발동한다."
]
},
"activeLedgerEntries": [
"ledger-1",
"ledger-3"
],
"activeThirdParties": [
"tp-3",
"tp-1"
]
}
]

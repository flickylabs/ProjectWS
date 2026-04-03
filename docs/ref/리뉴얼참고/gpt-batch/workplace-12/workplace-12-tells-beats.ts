export const workplace12TellsBeats = {
  "caseId": "workplace-12",
  "executableTells": {
    "a": [
      {
        "id": "workplace-12:a:tell:metric_shield",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "SLA",
          "응답 공백"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "무엇을 얼마나 들여다봤는지 대신 SLA 숫자와 응답 공백을 먼저 꺼내 감시 수단을 정당화한다."
      },
      {
        "id": "workplace-12:a:tell:policy_narrowing",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "출석 확인",
          "상시 촬영은 아닙니다"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "웹캠 확인을 상시 촬영이 아니라 출석 확인 정도였다고 계속 낮춰 말한다."
      },
      {
        "id": "workplace-12:a:tell:outcome_jump",
        "appliesWhen": [
          "avoiding",
          "defensive",
          "emotional"
        ],
        "lexicalHooks": [
          "업무 결과",
          "운영 공백"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "감시 절차를 묻는 질문에 바로 업무 결과와 운영 공백 이야기로 점프한다."
      }
    ],
    "b": [
      {
        "id": "workplace-12:b:tell:quote_back",
        "appliesWhen": [
          "lying",
          "defensive",
          "emotional"
        ],
        "lexicalHooks": [
          "공지 문구",
          "그대로 읽어드리면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 적은 공지 문구를 그대로 읽어 주며 자신의 실제 공백 시간을 잠시 가린다."
      },
      {
        "id": "workplace-12:b:tell:wording_shrink",
        "appliesWhen": [
          "cornered",
          "lying",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "표현 문제",
          "잠깐 비운 거"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "자리를 비운 것이 아니라 잠깐 비운 거였고 표현 문제였다고 말해 문제 범위를 줄인다."
      },
      {
        "id": "workplace-12:b:tell:sharp_overlap",
        "appliesWhen": [
          "emotional",
          "hurt",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "그 문장",
          "지금도 보시잖아요"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "억울해지면 상대 말을 끊고 그 문장을 반복하며 지금도 보시잖아요 같은 압박감을 되받아친다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-12:beat:a:d-1:deny",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 사생활을 본 적 없습니다. SLA와 응답 공백 때문에 출석 확인을 한 것이지, 상시 촬영은 아닙니다.",
      "behaviorHint": "숫자를 먼저 정리하듯 손가락으로 책상을 두드리고 표정은 굳힌다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-1:hedge",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "SLA와 운영 공백이 커져 출석 확인 요청을 한 건 맞습니다. 다만 상시 촬영은 아닙니다, 업무 결과를 지키려던 예외 대응이었습니다.",
      "behaviorHint": "호흡을 고르고 모니터를 보는 듯 시선을 아래로 내린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-1:partial",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 출석 확인 범위를 넓힌 건 맞습니다. 다만 SLA와 응답 공백이 누적돼 업무 결과를 지키려던 판단이었습니다.",
      "behaviorHint": "입술을 짧게 다문 뒤 고개만 작게 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-1:blame",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 출석 확인과 화면 확인을 과하게 한 부분은 있습니다. 다만 오수민 씨 쪽도 SLA를 흔들 만큼 응답 공백을 만들었고, 업무 결과와 운영 공백을 같이 키웠습니다.",
      "behaviorHint": "상대 쪽을 한번 보고 다시 정면으로 시선을 회수한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-1:confession",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 SLA와 운영 공백만 앞세워 출석 확인을 웹캠과 화면 캡처까지 넓힌 건 제 잘못입니다. 상시 촬영은 아닙니다라고 축소해 말한 책임도 제게 있습니다.",
      "behaviorHint": "어깨가 내려앉고 메모하던 손을 멈춘다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-1:evidence_hit",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "e-1과 e-4까지 나오면 제가 출석 확인이라고 줄여 말해도 부정할 수 없습니다. SLA와 운영 공백을 이유로 상시 촬영은 아닙니다라고 버틴 건 한계가 있습니다.",
      "behaviorHint": "잠깐 말을 멈추고 종이 가장자리를 만지작거린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-12:beat:a:d-3:deny",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 HR 자료를 왜곡한 적 없습니다. SLA와 응답 공백, 업무 결과를 정리한 것이고 출석 확인 문맥을 숨긴 건 아닙니다.",
      "behaviorHint": "문서 순서를 손으로 가리키며 설명하는 자세를 취한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-3:hedge",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "SLA와 응답 공백, 업무 결과를 먼저 보이게 정리한 건 맞습니다. 다만 출석 확인 관련 문구를 뺀다고 해도 상시 촬영은 아닙니다라는 설명이 따라간다고 봤습니다.",
      "behaviorHint": "서류 한 장을 넘기듯 손을 옆으로 젓는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-3:partial",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 PDF를 발췌본으로 낸 건 맞습니다. 다만 SLA와 응답 공백, 업무 결과를 먼저 설명하려다 출석 확인 문맥이 뒤로 밀렸습니다.",
      "behaviorHint": "시선을 피하지 않으려 애쓰면서도 턱에 힘이 들어간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-3:blame",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 발췌 제출을 한 건 인정합니다. 다만 오수민 씨 쪽도 SLA를 깨는 응답 공백을 만들었고, 업무 결과와 운영 공백을 함께 흔든 건 사실입니다.",
      "behaviorHint": "손바닥을 위로 펴 보이며 책임 분산을 시도한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-3:confession",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 SLA와 응답 공백만 두드러지게 보이도록 PDF를 고른 건 제 잘못입니다. 출석 확인과 상시 촬영은 아닙니다라고 축소한 문맥을 뺀 책임도 제게 있습니다.",
      "behaviorHint": "문서에서 눈을 떼지 못한 채 낮은 목소리로 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-3:evidence_hit",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "raw export까지 나오면 제가 SLA와 업무 결과만 앞세워도 부정할 수 없습니다. 출석 확인 문맥과 응답 공백 배열을 제가 유리하게 다룬 건 드러납니다.",
      "behaviorHint": "정리된 문서를 다시 맞추려다 손을 멈춘다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-12:beat:a:d-5:deny",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 정식 절차를 버린 적 없습니다. SLA와 운영 공백이 커서 출석 확인을 먼저 본 것이지, 상시 촬영은 아닙니다라는 선에서 관리하려 한 겁니다.",
      "behaviorHint": "의자를 반듯하게 고쳐 앉고 말끝을 단정하게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-5:hedge",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "SLA와 응답 공백 때문에 출석 확인을 앞세운 건 맞습니다. 다만 업무 결과를 지키려는 임시 대응이었고, 상시 촬영은 아닙니다라고 선을 그으려 했습니다.",
      "behaviorHint": "한숨을 삼키고 다시 숫자부터 설명한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-5:partial",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공식 절차보다 출석 확인과 모니터링을 먼저 둔 건 맞습니다. 다만 SLA와 운영 공백이 급해서 업무 결과부터 막으려 했습니다.",
      "behaviorHint": "손가락으로 순서를 세며 자신을 설득하듯 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-5:blame",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 절차를 늦춘 건 인정합니다. 다만 오수민 씨 쪽도 SLA와 응답 공백을 숨기며 업무 결과와 운영 공백을 더 키웠습니다.",
      "behaviorHint": "상대 이름을 말할 때만 목소리가 딱딱해진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-5:confession",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 SLA와 운영 공백만 보고 출석 확인을 절차보다 앞세운 건 제 잘못입니다. 상시 촬영은 아닙니다라고 좁혀 말하며 버틴 책임도 제게 있습니다.",
      "behaviorHint": "등받이에서 몸을 떼고 정면을 향해 짧게 고개를 숙인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:a:d-5:evidence_hit",
      "caseId": "workplace-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "HR 메모와 SLA 기록까지 나오면 제가 업무 결과만 앞세워도 부정할 수 없습니다. 출석 확인을 절차 대신 쓴 탓에 운영 공백과 응답 공백을 더 악화시킨 점이 보입니다.",
      "behaviorHint": "입가가 굳고 서류를 덮지 못한 채 멈춘다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "workplace-12:beat:b:d-2:deny",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 근무를 속인 적 없어요. 공지 문구를 그대로 읽어드리면, 제가 잠깐 비운 거를 전부 근태 가장으로 모는 건 표현 문제예요.",
      "behaviorHint": "몸을 앞으로 기울이며 말을 빠르게 밀어붙인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-2:hedge",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "제가 잠깐 비운 거는 있었어요. 다만 공지 문구를 그대로 읽어드리면 그걸 하루 전체 문제로 키우는 건 표현 문제라고 생각해요.",
      "behaviorHint": "손바닥을 펼쳐 보이며 억울하다는 표정을 짓는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-2:partial",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 자리를 비운 시간이 있었던 건 맞아요. 다만 공지 문구를 그대로 읽어드리면 계속 감시받는 흐름이었고, 잠깐 비운 거를 숨기려 한 건 표현 문제로 돌리고 싶었어요.",
      "behaviorHint": "입술을 깨물고도 말을 멈추지 않는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-2:blame",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 상태를 유지하려고 한 건 맞아요. 다만 백지훈 씨 쪽도 공지 문구와 그 문장을 들이밀면서 지금도 보시잖아요 같은 압박을 줬어요.",
      "behaviorHint": "상대 말을 자르듯 상체를 들썩이며 쏘아붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-2:confession",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 마우스 지글러로 온라인 상태를 유지한 건 제 잘못이에요. 공지 문구를 핑계로 잠깐 비운 거를 표현 문제라고 돌린 책임도 제게 있어요.",
      "behaviorHint": "목소리가 낮아지지만 마지막 단어는 또렷하게 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-2:evidence_hit",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "엔드포인트 로그까지 나오면 제가 잠깐 비운 거를 표현 문제라고만 말할 수 없어요. 공지 문구를 그대로 읽어드리며 버텼지만, 그 문장만으로는 부정할 수 없어요.",
      "behaviorHint": "눈을 크게 뜬 채 말이 끊기고 손끝이 떨린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-12:beat:b:d-4:deny",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 화면을 속이려고 꾸민 게 아니에요. 공지 문구를 그대로 읽어드리면 제가 잠깐 비운 거를 정리해 보낸 수준이고, 그걸 조작이라고 하는 건 표현 문제예요.",
      "behaviorHint": "턱을 들어 올리고 문구를 되받아 읽는 톤으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-4:hedge",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "캡처를 손본 건 맞아요. 다만 공지 문구를 그대로 읽어드리면 그 정도 정리는 다들 하는 줄 알았고, 잠깐 비운 거를 숨기려던 건 아니라는 표현 문제예요.",
      "behaviorHint": "손으로 허공에 작은 따옴표를 그리며 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-4:partial",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 캡처를 정리해서 보낸 건 맞아요. 다만 잠깐 비운 거가 드러나면 바로 낙인찍힐까 봐 공지 문구와 그 문장만 붙잡고 버텼어요.",
      "behaviorHint": "시선이 흔들리지만 말은 더 빨라진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-4:blame",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 보고 화면을 꾸민 건 맞아요. 다만 백지훈 씨 쪽도 공지 문구와 그 문장을 들이밀면서 지금도 보시잖아요 같은 압박을 계속 줬어요.",
      "behaviorHint": "상대 쪽을 쳐다보다가 비웃듯 짧게 숨을 내쉰다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-4:confession",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 상태창과 캘린더 캡처를 편집한 건 제 잘못이에요. 공지 문구를 핑계로 잠깐 비운 거를 표현 문제라고 돌린 책임도 제게 있어요.",
      "behaviorHint": "어깨를 움츠리고 눈을 피한 채 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-4:evidence_hit",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "DM과 캡처 수정 시각까지 나오면 제가 표현 문제라고만 버틸 수 없어요. 공지 문구를 그대로 읽어드리며 숨었지만, 그 문장보다 기록이 더 선명해요.",
      "behaviorHint": "입술이 굳고 손으로 휴대폰 없는 주머니를 만지는 버릇이 나온다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-12:beat:b:d-5:deny",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 정식 절차를 피하려고 한 적 없어요. 공지 문구를 그대로 읽어드리면 이미 감시가 먼저 들어왔고, 제가 잠깐 비운 거를 모두 제 탓으로만 묶는 건 표현 문제예요.",
      "behaviorHint": "방어적으로 웃다가 곧바로 목소리를 높인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-5:hedge",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "정식으로 workload 조정을 요청하지 못한 건 맞아요. 다만 공지 문구와 그 문장이 계속 위에서 내려오니, 잠깐 비운 거를 먼저 숨기게 된 표현 문제도 있었어요.",
      "behaviorHint": "한숨 섞인 목소리로도 말의 속도는 늦추지 않는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-5:partial",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 편집 캡처와 우회로로 버틴 건 맞아요. 다만 공지 문구를 그대로 읽어드리면 이미 지금도 보시잖아요 같은 감시가 깔려 있었어요.",
      "behaviorHint": "손으로 공중에 따옴표를 그리며 '감시'를 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-5:blame",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 공식 요청 대신 버틴 건 맞아요. 다만 백지훈 씨 쪽도 그 문장과 공지 문구로 압박하면서, 지금도 보시잖아요 같은 분위기를 만들었어요.",
      "behaviorHint": "이름을 부를 때만 또렷하게 힘을 주고 곧바로 말을 잇는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-5:confession",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 정식 절차 대신 편집 캡처와 우회 수단으로 버틴 건 제 잘못이에요. 공지 문구를 핑계로 잠깐 비운 거를 표현 문제라고 돌리며 숨긴 책임도 제게 있어요.",
      "behaviorHint": "결국 정면을 보고 짧게 숨을 고른 뒤 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-12:beat:b:d-5:evidence_hit",
      "caseId": "workplace-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "HR 메모와 SLA 기록까지 나오면 제가 표현 문제라고만 버틸 수 없어요. 공지 문구를 그대로 읽어드리며 맞섰지만, 잠깐 비운 거와 우회로가 같이 남아 있어요.",
      "behaviorHint": "말을 잇다가 중간에 목이 잠겨 물을 찾는 시늉을 한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

export const neighbor03TellsBeats = {
  "caseId": "neighbor-03",
  "executableTells": {
    "a": [
      {
        "id": "neighbor03:a:tell:rule_buffer",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "원래 다들 급하면",
          "예외는 있죠",
          "그 정도는 관행입니다"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "자신이 한 선택을 설명할 때는 '원래 다들 급하면 그렇게 한다'며 예외를 관행처럼 말한다."
      },
      {
        "id": "neighbor03:a:tell:timestamp_chain",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "몇 초 차이로",
          "그 다음에",
          "순서대로 말씀드리면"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "문이 열린 초 단위와 이동 순서를 촘촘히 나열해 핵심 위반을 흐린다."
      },
      {
        "id": "neighbor03:a:tell:affect_freeze",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "앞발 패드",
          "귀 표면",
          "그 거리만 보면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "반려견 상처를 말할 때도 표정을 굳히고 손상 부위와 거리만 숫자로 반복한다."
      }
    ],
    "b": [
      {
        "id": "neighbor03:b:tell:injury_loop",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame"
        ],
        "lexicalHooks": [
          "애가 소리를 질렀고",
          "피가 났고",
          "그 장면부터 떠올라요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "불안해지면 '그때 애가 소리를 질렀고 피가 났고'를 반복해 장면의 충격을 먼저 고정한다."
      },
      {
        "id": "neighbor03:b:tell:tiny_words",
        "appliesWhen": [
          "lying",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "잠깐",
          "살짝",
          "문만 조금"
        ],
        "sentenceShape": "self_reference",
        "cadence": "every_turn",
        "originalPattern": "불리한 행동은 '잠깐', '살짝', '문만 조금 열었다' 같은 축소어로 바꿔 말한다."
      },
      {
        "id": "neighbor03:b:tell:blame_echo",
        "appliesWhen": [
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "그쪽이 먼저",
          "먼저 그랬잖아요",
          "제가 왜요?"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "질문을 받으면 '그쪽이 먼저'라는 문장을 되풀이하며 자기 선택 설명을 늦춘다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "neighbor03:beat:a:d-1:deny",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 무단 사용이라고 볼 건 아닙니다. 마감 직전 예외 상황이었고 문만 잠깐 연 겁니다.",
      "behaviorHint": "표정 변화 없이 어깨를 굳히고 손가락으로 순서를 세듯 책상을 두드린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-1:hedge",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "어떤 코드였는지보다 그때 열 수밖에 있었는지가 먼저죠. 승인 경계가 늘 그렇게 딱 잘리진 않습니다.",
      "behaviorHint": "시선을 비스듬히 피하며 규정 문구처럼 말끝을 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-1:partial",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 누른 건 맞습니다. 다만 안이 빈 줄 알고 잠깐 정리하려던 겁니다.",
      "behaviorHint": "한 번 짧게 고개를 끄덕인 뒤 곧바로 상황 설명으로 넘어간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-1:blame",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "마감 직전엔 다들 급하면 그렇게 처리하기도 합니다. 문제를 키운 건 그 뒤 동시 입실입니다.",
      "behaviorHint": "입꼬리를 거의 움직이지 않은 채 상대 쪽으로 턱만 돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-1:confession",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "청소용역 임시 PIN을 메모해 두고 제가 먼저 문을 열었습니다. 관리 승인 없는 사용이 맞습니다.",
      "behaviorHint": "말끝에서 처음으로 숨을 길게 내쉬고 시선을 아래로 떨군다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-1:evidence_hit",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 로그까지 있으면 더 부인할 여지는 없네요. 제 계정이 아니라 그 임시 PIN이 찍힌 건 맞습니다.",
      "behaviorHint": "로그 자료에 눈이 멈추고 손가락 움직임이 끊긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "neighbor03:beat:a:d-3:deny",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그 영상은 제가 본 화면을 급히 보낸 정도입니다. 원본을 왜곡하려고 만든 파일은 아닙니다.",
      "behaviorHint": "팔짱을 낀 채 건조하게 문장을 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-3:hedge",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "원본 전체를 뽑을 권한이 없어서 보이는 장면만 전달한 겁니다. 취지는 상황 설명이었습니다.",
      "behaviorHint": "권한 문제를 말할 때만 속도를 올리고 핵심 질문은 비껴간다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-3:partial",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "앞부분이 빠진 전달본인 건 인정합니다. 그래도 제가 본 핵심 장면을 보여주려던 겁니다.",
      "behaviorHint": "입술을 한 번 눌렀다가 곧바로 '핵심'이라는 단어를 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-3:blame",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "관리사무소 원본이 늦어질 것 같아서 먼저 보낸 겁니다. 서아 씨 행동이 더 직접적으로 보여서 그 부분을 앞세운 겁니다.",
      "behaviorHint": "상대 이름을 또렷하게 부르며 화면의 한 지점을 손끝으로 가리킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-3:confession",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "돌아다닌 19초 파일은 원본이 아니었습니다. 앞부분을 빼고 속도와 타임스탬프까지 달라진 전달본을 제가 돌렸습니다.",
      "behaviorHint": "입술이 굳은 채로도 마지막 문장에서는 더 이상 변명을 덧붙이지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-3:evidence_hit",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "해시랑 타임코드 비교까지 나오면 끝이죠. 그 19초 파일이 원본이 아니라는 건 인정하겠습니다.",
      "behaviorHint": "비교보고를 넘겨보던 손이 멈추고 한동안 페이지를 바라본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "neighbor03:beat:a:d-5:deny",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "절차를 제가 먼저 깼다고 보긴 어렵습니다. 사고가 났으니 상황 확인부터 하려던 겁니다.",
      "behaviorHint": "상체를 꼿꼿이 세운 채 감정보다 순서를 강조한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-5:hedge",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "그날은 비도 많이 왔고 마감 직전이라 예외가 겹쳤습니다. 그걸 바로 절차 위반으로 단정하는 건 과합니다.",
      "behaviorHint": "말끝마다 '예외'를 반복하며 책임 언어를 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-5:partial",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예약을 잡지 않고 먼저 들어간 건 맞습니다. 다만 사고 직후엔 상황 파악이 먼저라고 봤습니다.",
      "behaviorHint": "고개를 짧게 숙였다가 다시 들며 설명 모드로 돌아간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-5:blame",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "서아 씨도 원본 확인 전에 단체방부터 돌렸습니다. 절차가 무너진 건 둘 다였습니다.",
      "behaviorHint": "상대의 메시지 시각을 집요하게 짚으며 균형을 맞추려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-5:confession",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "예약·원본 확인 절차를 둘 다 어겼고 시작은 제가 직원 PIN으로 먼저 들어간 데서 열렸습니다.",
      "behaviorHint": "체면을 내려놓듯 목소리가 한 톤 낮아지고 문장이 짧아진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:a:d-5:evidence_hit",
      "caseId": "neighbor-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "메시지 시각이랑 출입 로그를 같이 보면 순서를 부정하긴 어렵겠네요. 제가 먼저 규칙 경계를 흐린 건 맞습니다.",
      "behaviorHint": "자료 두 장을 번갈아 본 뒤 처음으로 시선을 피하지 못한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "neighbor03:beat:b:d-2:deny",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 문만 조금 연 거예요. 안에 누가 그렇게 가까이 있을 줄은 정말 몰랐어요.",
      "behaviorHint": "양손을 가슴 쪽으로 모으고 '조금'이라는 말을 두 번쯤 되풀이한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-2:hedge",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "잠깐 비 피하려던 거였고 줄도 완전히 푼 건 아니었어요. 너무 순식간이었어요.",
      "behaviorHint": "말끝이 떨리며 축소어를 이어 붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-2:partial",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "예약 없이 문을 연 건 맞아요. 그런데 그때 애가 울어서 줄을 바로 못 감았어요.",
      "behaviorHint": "반려견을 안아 올리듯 팔을 움켜쥐고 변명과 사과 사이에서 흔들린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-2:blame",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "이미 안쪽에 사람이 서 있는 줄 알았으면 저도 안 밀고 들어갔겠죠. 먼저 들어와 있던 쪽이 한 발만 비켜줬어도 덜 꼬였을 거예요.",
      "behaviorHint": "상대 쪽을 힐끗 보다가 금세 시선을 피한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-2:confession",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "예약 없이 동시 입실했고 자동줄도 길게 둔 게 사실입니다. 그 상태가 사고 위험을 키웠어요.",
      "behaviorHint": "어깨가 내려앉고 마지막 문장은 거의 속삭이듯 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-2:evidence_hit",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "그 사진이면 줄이 길게 늘어진 건 숨길 수 없네요. 제가 바로 못 감은 건 맞아요.",
      "behaviorHint": "현장 사진을 보자 손끝이 떨리고 말이 잠깐 끊긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "neighbor03:beat:b:d-4:deny",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그때는 정말 물린 줄 알았어요. 큰 개가 으르렁거렸고 우리 애 귀에 피가 있었어요.",
      "behaviorHint": "사고 장면을 먼저 길게 묘사하며 숨을 고른다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-4:hedge",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "제가 직접 이빨 닿는 걸 본 건 아니어도 장면이 너무 그랬어요. 누구라도 물림이라고 생각했을 거예요.",
      "behaviorHint": "시선을 크게 흔들며 '그랬어요'를 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-4:partial",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "병원에서 발 상처 모양을 보더니 물림이 아닐 수도 있다고 하셨어요. 물림이라고 단정한 건 맞아요. 그래도 저는 그때 너무 무서웠고, 큰 개가 으르렁거리는 장면에서 그렇게 받아들일 수밖에 없었어요.",
      "behaviorHint": "의무기록을 보다가도 다시 반려견 쪽으로 시선을 돌린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-4:blame",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "귀에 피가 보이고 으르렁거림이 들리니 제가 그렇게 받아들인 건 있어요. 하지만 그런 장면이 만들어진 건 현우 씨 동선 탓도 컸어요.",
      "behaviorHint": "고개를 젓다가 상대 이름을 말할 때만 목소리가 날카로워진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-4:confession",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "직접 원인은 물림이 아니라 자동줄이 배수구 철망과 문하부 레일에 걸린 마찰 열상이었습니다. 제가 그걸 물림으로 단정해 말했어요.",
      "behaviorHint": "말끝에서 입술을 깨물고 손으로 눈가를 잠깐 누른다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-4:evidence_hit",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "이 진료소견이면 제가 본 장면하고 실제 상처 원인이 다를 수밖에 없네요. 물림이라고 단정한 건 제가 빨랐어요.",
      "behaviorHint": "차트를 보며 목이 잠기고 문장을 끝까지 밀어내듯 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "neighbor03:beat:b:d-5:deny",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "전 원본도 못 본 채 애부터 안고 있었어요. 절차를 어기려고 한 게 아니라 너무 급했던 거예요.",
      "behaviorHint": "가슴 앞에서 두 손을 모은 채 부상 장면부터 먼저 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-5:hedge",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "관리사무소에 바로 못 간 건 쇼크 때문이었어요. 단체방도 도움 받으려고 보낸 거지 절차 무시는 아니었어요.",
      "behaviorHint": "설명할수록 목이 잠기고 말끝이 올라간다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-5:partial",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "원본 확인 전 메시지를 보낸 건 맞아요. 그때는 애 상태가 먼저여서 생각이 짧았습니다.",
      "behaviorHint": "자기 무릎을 움켜쥔 채 미안하다는 표정이 스친다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-5:blame",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "하지만 현우 씨도 예약 규칙을 깨고 먼저 들어갔잖아요. 절차 위반을 저만 한 것처럼 볼 수는 없어요.",
      "behaviorHint": "울컥한 표정으로 상대 쪽을 한 번 바라보고 문장을 밀어붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-5:confession",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저도 예약·원본 확인 절차를 어겼습니다. 원본 요청 전에 단체방에서 현우 씨를 먼저 지목한 게 사실입니다.",
      "behaviorHint": "어깨를 웅크린 채 더 이상 변명 없이 짧게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor03:beat:b:d-5:evidence_hit",
      "caseId": "neighbor-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "메시지 시각이 이렇게 찍혀 있으면 제가 먼저 퍼뜨린 건 부인 못 해요. 원본 확인 전에 사람들부터 붙잡은 게 맞아요.",
      "behaviorHint": "채팅 출력물을 보며 한숨을 내쉬고 눈을 감았다 뜬다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

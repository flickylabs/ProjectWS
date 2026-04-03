export const tenant03TellsBeats = {
  "caseId": "tenant-03",
  "executableTells": {
    "a": [
      {
        "id": "tenant03:a:tell:source_lock",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "누가 먼저",
          "출처부터",
          "그 문구는",
          "처음 말한 사람"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대 설명이 길어지면 '그 말 누가 처음 했어요'라고 끊고 출처를 고정하려 한다."
      },
      {
        "id": "tenant03:a:tell:pdf_shield",
        "appliesWhen": [
          "cornered",
          "defensive",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "PDF 보면",
          "캡처 먼저",
          "순서대로 보면",
          "서류상으론"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "자신의 판단이 성급했다는 질문을 받으면 휴대폰 PDF나 캡처를 먼저 보여주며 감정 설명을 뒤로 미룬다."
      },
      {
        "id": "tenant03:a:tell:measured_breath",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame",
          "cornered"
        ],
        "lexicalHooks": [
          "천천히 말씀드리면",
          "정리하면",
          "그건 아닙니다",
          "끝까지 들으시면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "억울해질수록 말 속도는 느려지지만 문장 끝을 더 또렷하게 끊어 냉정한 사람처럼 보이려 한다."
      }
    ],
    "b": [
      {
        "id": "tenant03:b:tell:suffering_preface",
        "appliesWhen": [
          "lying",
          "cornered",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "저도 그때",
          "죽을 맛이었어요",
          "이자며 공사비며",
          "제 사정도"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 질문이 나오면 '저도 그때 죽을 맛이었어요'로 문장을 시작해 책임 비중을 낮추려 한다."
      },
      {
        "id": "tenant03:b:tell:third_party_buffer",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "중개사가",
          "그쪽에서",
          "그렇게 하자고",
          "제가 왜"
        ],
        "sentenceShape": "question_end",
        "cadence": "every_turn",
        "originalPattern": "직접 답해야 할 순간에도 '중개사가 그렇게 하자고 해서'라는 문장을 끼워 넣어 본인 결정을 흐린다."
      },
      {
        "id": "tenant03:b:tell:slow_sigh_reset",
        "appliesWhen": [
          "emotional",
          "shame",
          "hurt",
          "cornered"
        ],
        "lexicalHooks": [
          "하…",
          "제가요",
          "정말 억울한데",
          "그래도 말씀드리면"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "분노가 올라오면 대답 전에 길게 한숨을 쉬며 피해자 역할의 톤으로 다시 말하기 시작한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant03:beat:a:d-4:deny",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "확인만 조금 더 하려던 거였지, 잔금을 일부러 막은 건 아닙니다. 전입도 그렇게까지 늦어질 줄은 몰랐어요.",
      "behaviorHint": "휴대폰 화면을 켠 채 시선을 내리지 않고 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-4:hedge",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "완전히 멈춘 건 아니고요, 안전 확인 때문에 흐름이 조금 밀린 겁니다. 그날 상황이 너무 급했습니다.",
      "behaviorHint": "송금 시각을 손가락으로 세며 건조하게 설명한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-4:partial",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 제가 일부를 이틀 보류한 건 맞습니다. 그때는 안 멈추면 더 위험하다고 느꼈습니다.",
      "behaviorHint": "짧게 인정한 뒤 입술을 다물고 숨을 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-4:blame",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "일정이 밀린 건 제 선택이지만, 그렇게 멈추게 만든 건 추가 담보와 흐린 설명이었습니다. 그 배경 없이 저만 탓할 수는 없습니다.",
      "behaviorHint": "서류 순서를 짚다가 마지막 문장에서 목소리가 딱 끊긴다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-4:confession",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "가족 돈이 섞여 있어서 저는 그날 송금 버튼을 못 눌렀습니다. 겁이 나서 멈춘 거고, 그 결과 전입도 늦어졌습니다. 제 잘못이었습니다.",
      "behaviorHint": "휴대폰을 내려놓고 한 박자 늦게 시선을 든다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-4:evidence_hit",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "이 거래기록이면 제가 이틀 보류한 건 더 숨길 수 없네요. 왜 멈췄는지는 같이 봐주셔야 합니다.",
      "behaviorHint": "계좌기록을 보자마자 숨을 길게 내쉬고 말 속도가 느려진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant03:beat:a:d-2:deny",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 분명 집주인 쪽에서도 보험이 된다는 뜻으로 받아들였습니다. 그렇게 들리게 말한 건 사실이잖아요.",
      "behaviorHint": "말을 자르듯 짧게 끊고 바로 다음 문장으로 넘어간다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-2:hedge",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "누가 정확히 첫 문장을 했는지는 헷갈릴 수 있어도, 태수 씨가 그 흐름을 막지는 않았습니다. 그래서 같은 뜻으로 들었습니다.",
      "behaviorHint": "출처를 묻는 문장을 끝에 붙이며 시선을 고정한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-2:partial",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "확정적인 표현은 한별 쪽에서 먼저 나왔을 수 있습니다. 그래도 저는 태수 씨가 승인한 말처럼 들었습니다.",
      "behaviorHint": "손으로 채팅 순서를 넘기는 시늉을 하며 조심스럽게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-2:blame",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "처음 안심 문구는 한별이 꺼냈고, 저는 그걸 집주인 발언과 같은 무게로 들었습니다. 정정하지 않은 책임은 남습니다.",
      "behaviorHint": "문장 사이를 길게 띄우며 마지막 단어를 또렷하게 끊는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-2:confession",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "보험 가능을 확정적으로 안심시킨 출발점은 한별이 먼저였습니다. 저는 그걸 태수 씨 책임으로 너무 단순화했습니다.",
      "behaviorHint": "캡처 화면을 접고 천천히 고개를 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-2:evidence_hit",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "녹음을 들으면 누가 먼저 말했는지는 부정하기 어렵네요. 제가 출처를 섞어 말한 부분은 인정하겠습니다.",
      "behaviorHint": "녹음 재생이 끝나자 입술을 깨물고 짧게 인정한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "tenant03:beat:a:d-5:deny",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "당일 확인 원칙을 먼저 무너뜨린 건 태수 씨 쪽입니다. 저는 확인만 되면 바로 진행하려고 했습니다.",
      "behaviorHint": "계약서 특약 문구를 먼저 읽고 감정은 뒤에 붙인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-5:hedge",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 원칙을 무시한 건 아니고, 지키려다 멈춘 겁니다. 서류가 비어 있는데 그대로 갈 수는 없었습니다.",
      "behaviorHint": "문구를 짚으며 짧게 숨을 고른다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-5:partial",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "계약서 순서를 끝까지 실행하지 못한 건 맞습니다. 다만 최신 말소 자료가 없어서 제 절차도 멈췄습니다.",
      "behaviorHint": "인정과 반박을 한 문장씩 분리해 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-5:blame",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "저는 잔금을 멈춰 원칙을 흔들었고, 태수 씨는 최신 대출 구조를 직접 내놓지 않아 그 원칙을 더 무너뜨렸습니다. 둘 다 문장을 행동으로 못 옮긴 겁니다.",
      "behaviorHint": "시선은 낮추되 마지막 문장에서 상대를 바로 본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-5:confession",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "당일 확인 원칙은 태수 씨만이 아니라 저도 무너뜨렸습니다. 저는 최신 확인 전 잔금을 멈췄고 그 책임을 처음엔 너무 적게 말했습니다.",
      "behaviorHint": "한숨처럼 웃다가 곧바로 표정을 굳힌다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:a:d-5:evidence_hit",
      "caseId": "tenant-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "계약서 특약을 다시 보면 제가 원칙을 끝까지 지켰다고는 못 하겠습니다. 이건 제 쪽도 인정해야겠네요.",
      "behaviorHint": "특약 문구를 손끝으로 짚다가 손을 거둔다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "tenant03:beat:b:d-1:deny",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저도 그때 죽을 맛이었어요. 그 대출은 잔금으로 바로 정리될 거라 큰 문제라고 보지 않았습니다.",
      "behaviorHint": "먼저 고통을 호소하고 핵심 수치는 흐리게 넘긴다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-1:hedge",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "세부 잔액은 중개사가 정리 중인 줄 알았습니다. 저는 말소 흐름만 공유하면 되는 줄 알았어요.",
      "behaviorHint": "손을 펴 보이며 설명 책임을 바깥으로 민다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-1:partial",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "추가 브리지대출이 있었던 건 맞습니다. 다만 곧 상환될 거라 제가 심각성을 낮게 봤습니다.",
      "behaviorHint": "문장 앞부분은 빨리 말하고 인정 대목에서 목이 잠긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-1:blame",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "한별이 앞에서 괜찮다고 하니 저도 그 뒤에 기대 버렸습니다. 그래도 최신 잔액을 다시 말했어야 했다는 책임은 피하기 어렵네요.",
      "behaviorHint": "한숨 뒤에 중개사 탓을 먼저 꺼내고 끝에서 자신을 묶는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-1:confession",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "추가 브리지대출과 최신 상환 잔액을 알면서도 직접 다시 설명하지 않았습니다. 기존 안내가 계속 통하는 것처럼 둔 건 제 잘못입니다.",
      "behaviorHint": "시선을 피하다가 마지막 문장에서만 정면을 본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-1:evidence_hit",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "이 최신 잔액표가 나오면 제가 예전 설명만 붙들고 있었다는 건 변명하기 어렵습니다. 중개사 뒤에 숨은 것도 맞습니다.",
      "behaviorHint": "서류를 넘기다 멈추고 한숨을 길게 뱉는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant03:beat:b:d-3:deny",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그 180만원은 제 돈이 아닙니다. 중개사 쪽 정산인데 왜 저한테 다 뒤집어씌우십니까?",
      "behaviorHint": "억울하다는 표정을 크게 쓰며 되묻는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-3:hedge",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "정식 보수 외 금액 얘기는 들었지만 세부 수납은 사무실에서 알아서 하는 줄 알았습니다. 제 통장으로 들어온 돈은 없어요.",
      "behaviorHint": "'제 통장'을 반복해 직접 수령만 부인한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-3:partial",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 직접 받은 건 아니지만 그 돈 구조를 제대로 따져 묻지 않은 건 제 쪽 잘못도 있습니다. 당시엔 자금 흐름이 너무 급했습니다.",
      "behaviorHint": "손을 모아 쥔 채 인정과 변명을 한 번에 내놓는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-3:blame",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "한별이 개인 계좌로 받은 구조였다면 저는 그걸 알고도 계약만 되면 된다는 식으로 넘겼습니다. 책임을 중개사 뒤로만 미루긴 어렵겠습니다.",
      "behaviorHint": "중개사 이름을 먼저 내뱉고 뒤늦게 자신을 묶는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-3:confession",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "180만원을 실제로 받은 사람은 제가 아니라 한별입니다. 하지만 그 돈 구조를 검증하지 않고 계약에 붙게 둔 책임은 제게도 있습니다.",
      "behaviorHint": "처음엔 고개를 저었다가 두 번째 문장에서 천천히 수긍한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-3:evidence_hit",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "정산표까지 나오면 '제 통장에 안 왔다'는 말만으로는 안 되겠네요. 방치한 책임은 인정하겠습니다.",
      "behaviorHint": "서류를 보며 목소리가 작아지고 말끝이 갈라진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "tenant03:beat:b:d-5:deny",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "당일 확인 원칙은 저는 지키려 했어요. 마지막에 잔금을 멈춘 건 세입자 쪽 아닙니까?",
      "behaviorHint": "반문형으로 밀어붙이며 자기 몫을 빼낸다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-5:hedge",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "계약서 흐름은 준비돼 있었고 저는 중개사 통해 필요한 설명은 했다고 생각했습니다. 실무가 그렇게 굴러갔습니다.",
      "behaviorHint": "'그렇게 굴러갔다'는 말로 책임 주체를 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-5:partial",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "최신 말소 증빙과 대출 구조를 제가 직접 보여주지 못한 건 맞습니다. 그래도 절차를 먼저 끊은 건 서윤 씨 쪽이었습니다.",
      "behaviorHint": "앞문장에서는 인정하고 뒷문장에서는 손바닥을 뒤집듯 책임을 나눈다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-5:blame",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "한별 말에 기대며 저는 집주인 확인 의무를 비웠고, 서윤 씨는 확인 전 잔금을 멈춰 서로 원칙을 흔들었습니다. 처음엔 제 몫을 너무 작게 말했습니다.",
      "behaviorHint": "고개를 숙였다가 마지막 문장에서 씁쓸하게 웃는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-5:confession",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "당일 확인 원칙은 서윤 씨만 아니라 저도 무너뜨렸습니다. 저는 최신 대출 구조와 말소 증빙을 직접 제시하지 않은 채 중개사 설명에 기대었습니다. 제 잘못이었습니다.",
      "behaviorHint": "한숨을 삼킨 뒤 피해자 톤을 걷어내고 담담하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant03:beat:b:d-5:evidence_hit",
      "caseId": "tenant-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "계약서와 최신 서류를 같이 놓고 보면 제가 원칙을 다 지켰다고는 못 하겠습니다. 세입자 중단만 탓한 건 제 체면이었네요.",
      "behaviorHint": "특약을 읽다가 눈을 감고 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-1"
    }
  ]
}


export const partnership04TellsBeats = {
  "caseId": "partnership-04",
  "executableTells": {
    "a": [
      {
        "id": "partnership-04:a:tell:ledger_walkthrough",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "계좌번호로 보면",
          "전표상으로는",
          "흐름만 자르면"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "의도를 묻는 질문에도 계좌번호, 분개명, 전표순으로 대답해 감정적 쟁점을 뒤로 미룬다."
      },
      {
        "id": "partnership-04:a:tell:past_minimization",
        "appliesWhen": [
          "cornered",
          "shame",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "그건 이미 정리된 건",
          "규정으로 봉합됐고",
          "당시 건은 끝난 얘기입니다"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "과거 배신이 나오면 '그건 이미 규정으로 봉합됐다'며 당시 충격을 과소화한다."
      },
      {
        "id": "partnership-04:a:tell:precision_burst",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding"
        ],
        "lexicalHooks": [
          "원금, 부가세, 수수료가",
          "정산계정 기준으로는",
          "숫자를 세 갈래로 보면"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "현재 혐의를 부정할 때 지나치게 세부 계좌 흐름을 늘어놓아 큰 질문을 흐리려 한다."
      }
    ],
    "b": [
      {
        "id": "partnership-04:b:tell:history_stack",
        "appliesWhen": [
          "lying",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "그때도 그랬고",
          "이번에도 결국",
          "한 번이 아니었어요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "현재 질문을 받으면 과거 배신 사례를 길게 쌓아 지금 행동을 정당화한다."
      },
      {
        "id": "partnership-04:b:tell:evidence_dramatization",
        "appliesWhen": [
          "cornered",
          "emotional",
          "shame"
        ],
        "lexicalHooks": [
          "제가 눈으로 봤고",
          "그 캡처가 말해주잖아요",
          "그 문서가 그렇게 보였어요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "한 장의 PDF나 캡처를 '이번엔 눈으로 봤다'는 식으로 과장해 말한다."
      },
      {
        "id": "partnership-04:b:tell:moral_pivot",
        "appliesWhen": [
          "emotional",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "왜 그런 의심이 생겼겠어요",
          "누가 저를 그렇게 만들었는데요",
          "그 질문 전에 이유부터 보셔야죠"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "증거의 진위를 묻는 질문을 받으면 곧바로 '그런 의심을 갖게 만든 건 누구냐'는 도덕 프레임으로 옮긴다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-04:beat:a:d-2:deny",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 건은 운영상 예외 정산입니다. 친구 회사가 끼었다고 곧바로 리베이트라고 부를 일은 아닙니다.",
      "behaviorHint": "시선은 서류에 고정하고 손가락으로 거래 순서를 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-2:hedge",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "공유가 매끄럽지 않았던 건 인정합니다. 다만 당시엔 일정과 품질 이슈가 먼저였어요.",
      "behaviorHint": "말끝을 낮추며 숫자 용어를 덧붙여 시간을 번다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-2:partial",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "일부 정산을 투명하게 못 드러낸 건 제 잘못입니다. 다만 그 부분은 숨겼다고 보셔도 됩니다.",
      "behaviorHint": "짧게 숨을 고르고 일부 단어를 또박또박 분리한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-2:blame",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "하지만 그 시기엔 릴리즈 압박도 컸고, 예외 승인도 전부 저 혼자 만든 구조는 아니었습니다.",
      "behaviorHint": "턱을 굳히고 상대를 보지 않은 채 맥락을 길게 늘인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-2:confession",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "결국 제가 친구 회사 정산을 숨긴 겁니다. 그 일 때문에 지금까지 신뢰가 무너진 것도 압니다. 설명을 늦춘 건 제 잘못입니다.",
      "behaviorHint": "불편한 침묵 뒤에 낮은 목소리로 핵심만 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-2:evidence_hit",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "그 메모와 계약서가 같이 나오면 더 돌릴 말은 없네요. 기록이 제가 선을 넘은 지점을 정확히 찍고 있습니다.",
      "behaviorHint": "제시된 문서를 멈춰 들여다본 뒤 한 박자 늦게 답한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-04:beat:a:d-3:deny",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "세 줄로 보인다고 해서 세 건 유출이 되는 건 아닙니다. 제 개인 유용은 아닙니다.",
      "behaviorHint": "시선은 서류에 고정하고 손가락으로 거래 순서를 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-3:hedge",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "주말 심야라 오해할 수는 있습니다. 그래도 외부로 빼돌린 흐름은 아니에요.",
      "behaviorHint": "말끝을 낮추며 숫자 용어를 덧붙여 시간을 번다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-3:partial",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "표기 방식이 헷갈리게 만든 건 맞습니다. 다만 제가 그 설명을 바로 못 한 것도 맞고요.",
      "behaviorHint": "짧게 숨을 고르고 일부 단어를 또박또박 분리한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-3:blame",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "거기에 과거 사건까지 겹쳐 읽으니 뭐든 배신처럼 보였던 겁니다.",
      "behaviorHint": "턱을 굳히고 상대를 보지 않은 채 맥락을 길게 늘인다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-3:confession",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "원본으로 보면 그건 환급보증금과 퇴직충당금 이동입니다. 제가 방어적으로 숫자만 늘어놓느라 설명을 늦췄습니다. 설명을 늦춘 건 제 잘못입니다.",
      "behaviorHint": "불편한 침묵 뒤에 낮은 목소리로 핵심만 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-3:evidence_hit",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 CSV와 은행 확인서까지 나오면 개인유용 주장은 성립하지 않습니다. 그 부분은 접겠습니다.",
      "behaviorHint": "제시된 문서를 멈춰 들여다본 뒤 한 박자 늦게 답한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-04:beat:a:d-4:deny",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 일은 이미 정리된 건입니다. 지금 협상에 계속 끌어올 이유는 없습니다.",
      "behaviorHint": "시선은 서류에 고정하고 손가락으로 거래 순서를 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-4:hedge",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "신뢰 이력으로 언급될 수는 있어도, 현재 쟁점을 대신할 정도는 아닙니다.",
      "behaviorHint": "말끝을 낮추며 숫자 용어를 덧붙여 시간을 번다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-4:partial",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "저도 그 과거를 완전히 떼어놓진 못했습니다. 다만 제게 불리한 대목은 작게 말했죠.",
      "behaviorHint": "짧게 숨을 고르고 일부 단어를 또박또박 분리한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-4:blame",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "다만 이미 일부 정산과 규정 변경이 끝난 사건을 계속 현재형으로 부르는 건 상대 쪽에도 유리한 선택이었습니다.",
      "behaviorHint": "턱을 굳히고 상대를 보지 않은 채 맥락을 길게 늘인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-4:confession",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "맞습니다. 저는 그 사건이 다시 제 이름표가 될까 봐 축소하면서도 방어 카드로 관리했습니다. 설명을 늦춘 건 제 잘못입니다.",
      "behaviorHint": "불편한 침묵 뒤에 낮은 목소리로 핵심만 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:a:d-4:evidence_hit",
      "caseId": "partnership-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "조정인 메일까지 붙으면 제가 '이미 끝난 일'이라고만 말할 수는 없겠네요. 현재 협상에서 그 과거를 의식하고 있었던 게 드러납니다.",
      "behaviorHint": "제시된 문서를 멈춰 들여다본 뒤 한 박자 늦게 답한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-04:beat:b:d-1:deny",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그 자료는 정리본이었지 조작본이라고 생각하진 않았어요. 흐름 자체는 같다고 봤습니다.",
      "behaviorHint": "숨을 들이마시고 억울하다는 표정으로 되묻듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-1:hedge",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "원본 형식은 아니었을 수 있어도, 제가 본 위험 신호까지 사라지는 건 아니잖아요.",
      "behaviorHint": "목이 잠긴 듯 천천히 말하며 정당화를 덧댄다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-1:partial",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "편집본이라는 형식 문제는 인정할게요. 다만 그때 저는 그게 실질을 보여준다고 믿었습니다.",
      "behaviorHint": "시선을 흔들며 일부 인정 뒤에 피해 서사를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-1:blame",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "왜 그렇게까지 붙잡았겠어요. 민재 씨가 만든 과거가 저를 그렇게 보게 만든 거죠.",
      "behaviorHint": "상대를 겨누듯 몸을 틀고 도덕적 질문으로 방향을 튼다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-1:confession",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 저는 편집본이라는 걸 알면서도 협상에서 원본처럼 계속 썼습니다. 또 놓치고 싶지 않았습니다. 그건 제 잘못입니다.",
      "behaviorHint": "잠시 침묵한 뒤 젖은 목소리로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-1:evidence_hit",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "편집 로그와 원본 요청 메일이 같이 나오면 제가 몰랐다고는 못 하죠. 거기서 이미 정리본이라는 걸 알고 있었습니다.",
      "behaviorHint": "제시된 문서를 오래 보고 말문이 끊겼다가 힘없이 잇는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-04:beat:b:d-3:deny",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "주말 심야에 세 줄이면 누가 봐도 이상하잖아요. 저는 그걸 외부유출로 읽었습니다.",
      "behaviorHint": "숨을 들이마시고 억울하다는 표정으로 되묻듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-3:hedge",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "확인 전까지는 의심할 수밖에 없었습니다. 그 시간대와 그 캡처를 보고 어떻게 가볍게 넘겨요.",
      "behaviorHint": "목이 잠긴 듯 천천히 말하며 정당화를 덧댄다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-3:partial",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 그 세 줄을 너무 빨리 하나의 서사로 묶은 건 맞아요. 캡처와 과거 기억이 겹쳤으니까요.",
      "behaviorHint": "시선을 흔들며 일부 인정 뒤에 피해 서사를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-3:blame",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "그런 의심을 갖게 만든 사람이 누구였는데요. 민재 씨의 전력이 없었다면 그렇게까지 몰아붙이지 않았을 겁니다.",
      "behaviorHint": "상대를 겨누듯 몸을 틀고 도덕적 질문으로 방향을 튼다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-3:confession",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "결국 그 세 줄은 분리 표기였고, 저는 그 오해를 끝까지 놓지 않았어요. 이번엔 반드시 잡아내야 한다는 마음이 더 컸습니다. 그건 제 잘못이에요.",
      "behaviorHint": "잠시 침묵한 뒤 젖은 목소리로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-3:evidence_hit",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 거래내역과 은행 설명서가 나오면 제가 붙잡은 그림이 무너지는 건 인정할 수밖에 없어요. 그건 세 건 유출이 아니었네요.",
      "behaviorHint": "제시된 문서를 오래 보고 말문이 끊겼다가 힘없이 잇는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-04:beat:b:d-4:deny",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 일을 꺼낸 건 압박하려고가 아니라 왜 제가 이렇게 예민한지 설명하려는 거였어요.",
      "behaviorHint": "숨을 들이마시고 억울하다는 표정으로 되묻듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-4:hedge",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "신뢰 붕괴의 맥락을 말한 거지, 그 과거만으로 지금을 재단하려던 건 아니에요.",
      "behaviorHint": "목이 잠긴 듯 천천히 말하며 정당화를 덧댄다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-4:partial",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "그래도 협상에서 제 입장을 세우려고 그 사건을 다시 올린 건 맞습니다.",
      "behaviorHint": "시선을 흔들며 일부 인정 뒤에 피해 서사를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-4:blame",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "이미 정리됐다고만 말하는 민재 씨 쪽 태도가 있었으니 저도 더 세게 붙들 수밖에 없었어요.",
      "behaviorHint": "상대를 겨누듯 몸을 틀고 도덕적 질문으로 방향을 튼다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-4:confession",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "네, 저는 과거 배신 사건을 현재 협상 카드로 썼습니다. 상처를 근거로 도덕적 우위를 만들려 했어요. 그건 제 잘못이에요.",
      "behaviorHint": "잠시 침묵한 뒤 젖은 목소리로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-04:beat:b:d-4:evidence_hit",
      "caseId": "partnership-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "과거 메모와 조정인 메일까지 나란히 놓이면 제가 그 사건을 현재 압박용으로 다시 얹은 게 보이네요.",
      "behaviorHint": "제시된 문서를 오래 보고 말문이 끊겼다가 힘없이 잇는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    }
  ]
};

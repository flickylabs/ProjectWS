export const partnership12TellsBeats = {
  "caseId": "partnership-12",
  "executableTells": {
    "a": [
      {
        "id": "partnership-12:a:tell:schedule_recital",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "샘플 승인",
          "출고 가능 수량",
          "납기"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "험담 의도를 묻는 질문에도 먼저 어떤 날짜에 어떤 샘플이 밀렸는지부터 숫자로 읊는다."
      },
      {
        "id": "partnership-12:a:tell:venting_downgrade",
        "appliesWhen": [
          "cornered",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "그냥 하소연",
          "실무 얘기",
          "그 정도"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "외부 인력에게 한 말을 지적받으면 '그건 그냥 하소연이었다'며 의미를 축소한다."
      },
      {
        "id": "partnership-12:a:tell:emotion_cut",
        "appliesWhen": [
          "avoiding",
          "hurt",
          "emotional"
        ],
        "lexicalHooks": [
          "감정 말고",
          "발화 경로",
          "운영 혼선"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "상대가 명예 훼손을 말하면 '감정 말고 발화 경로를 보자'며 정서적 쟁점을 잘라낸다."
      }
    ],
    "b": [
      {
        "id": "partnership-12:b:tell:betrayal_headline",
        "appliesWhen": [
          "lying",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "결국",
          "내 욕",
          "바이어 앞에서"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "세부 사실보다 '결국 바이어 앞에서 내 욕 한 거잖아' 같은 결론 문장부터 던진다."
      },
      {
        "id": "partnership-12:b:tell:pressure_echo",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "왜 건너뛰었죠",
          "그랬잖아요",
          "같은 말"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "every_turn",
        "originalPattern": "같은 질문을 짧게 되풀이하며 상대가 자신을 건너뛴 순간을 집요하게 파고든다."
      },
      {
        "id": "partnership-12:b:tell:proof_zoom",
        "appliesWhen": [
          "emotional",
          "lying",
          "cornered"
        ],
        "lexicalHooks": [
          "그 한 줄",
          "그 캡처",
          "바이어 반응"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "음성전사 한 줄이나 바이어 반응 한 문장을 전체 의도의 증거처럼 키워 해석한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-12:beat:a:d-1:deny",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그렇게 말할 성질의 건이 아닙니다. 그때는 샘플 승인 시각이랑 출고 가능 수량 정리만 한 겁니다.",
      "behaviorHint": "손가락으로 순서를 짚으며 감정을 잘라낸다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-1:hedge",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "홍세진에게 일정 압박을 말한 건 맞습니다. 그래도 그걸 장수진 대표 평판을 깎으려는 발화로 묶는 건 과합니다.",
      "behaviorHint": "짧게 숨을 고르고 문장을 건조하게 덧댄다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-1:partial",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 밖에서 장수진 대표 불만처럼 들릴 말을 한 건 맞습니다. 다만 바이어에게 돌리려던 건 아니고 실무 하소연이라고 낮춰 생각했습니다.",
      "behaviorHint": "시선을 피하다가도 끝부분에서 다시 일정 얘기로 돌아간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-1:blame",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "그날은 약속이 생산 가능 수량보다 먼저 나가고 있었습니다. 그 압박을 밖에서 풀면 안 됐는데, 출발점이 그 긴장이었던 건 사실입니다.",
      "behaviorHint": "턱을 굳히고 상대의 약속 방식을 배경처럼 깔아 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-1:confession",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 홍세진에게 장수진 대표 불만을 털어놓았습니다. 직접 바이어 험담은 아니어도 외부 비방 금지 원칙을 어긴 건 제 책임입니다.",
      "behaviorHint": "한 박자 늦게 고개를 끄덕이며 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-1:evidence_hit",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "원본 카톡이면 부정할 건 없네요. 저 메시지는 바이어용이 아니라 홍세진 개인 계정으로 보낸 거고, 그래서 더 경솔했습니다.",
      "behaviorHint": "증거를 보자마자 말수가 줄고 톤이 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-12:beat:a:d-3:deny",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "당시엔 수진 대표가 거래처 쪽에 제 얘길 직접 넣었다고 본 겁니다. 그때 바이어 반응은 다른 설명이 안 됐습니다.",
      "behaviorHint": "입술을 다문 채 확신을 유지하려 든다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-3:hedge",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "원문을 다 본 건 아니어도, 그 캡처와 바이어 질문이 한 방향을 가리켰습니다. 그래서 저는 직접 험담으로 읽었습니다.",
      "behaviorHint": "캡처를 보는 듯 손끝으로 허공을 짚는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-3:partial",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "지금 보면 그 캡처만으로 수신자를 못 박을 수는 없습니다. 그래도 당시 제겐 직접 발화처럼 들렸습니다.",
      "behaviorHint": "확신을 낮추지만 끝문장에서 여전히 방어적인 표정을 짓는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-3:blame",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "행사 직후 평판이 흔들리면 생산 쪽은 바로 주문량으로 타격을 받습니다. 그 압박이 제 해석을 더 거칠게 만들었습니다.",
      "behaviorHint": "말을 멈췄다가 주문서와 평판을 연결해 설명한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-3:confession",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "수진 대표가 바이어에게 직접 험담한 건 아니었습니다. 제가 경로보다 배신감부터 읽었고, 홍세진의 요약 문장을 상대 발화로 오해했습니다. 그 판단은 제 잘못입니다.",
      "behaviorHint": "어깨 힘이 빠지며 문장을 짧게 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-3:evidence_hit",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "크롭 전사만 붙들고 있었는데 원본 follow-up을 보니 전제가 무너집니다. 문제 문장은 홍세진 쪽 요약이었네요.",
      "behaviorHint": "증거를 다시 보며 한숨을 길게 내쉰다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-12:beat:a:d-4:deny",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "규칙을 무시하려고 한 건 아닙니다. 저는 행사 혼선 설명과 비방을 분리해 생각했습니다.",
      "behaviorHint": "서류를 보는 시늉으로 규칙과 상황을 갈라 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-4:hedge",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "문서를 읽고 체크한 건 맞습니다. 다만 당시엔 실무 얘기 정도는 괜찮다고 제 선을 낮췄습니다.",
      "behaviorHint": "체크 사실은 인정하지만 시선은 문서 밖으로 돌린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-4:partial",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 외부 인력 앞에서 상대 불만을 꺼낸 순간 이미 다만 원칙 위반입니다. 그 점은 부인하기 어렵습니다.",
      "behaviorHint": "짧게 인정하고 곧바로 말수를 줄인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-4:blame",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그 원칙은 양쪽 모두 깼습니다. 제 잘못이 줄진 않지만, 사건 구조가 한쪽만의 일탈은 아니었습니다.",
      "behaviorHint": "손을 모은 채 공동 책임 구도를 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-4:confession",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저와 수진 대표 모두 상호 비방 금지 원칙을 어겼습니다. 체크까지 해놓고 선을 넘은 건 제 책임이고, 그 틈이 소문 재료가 됐습니다.",
      "behaviorHint": "문서가 적힌 지점을 한 번 보고 고개를 숙인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:a:d-4:evidence_hit",
      "caseId": "partnership-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "e-5를 보면 제가 규칙을 몰랐다는 말은 못 하겠습니다. 알고도 그날은 예외를 스스로 만들었습니다.",
      "behaviorHint": "증거 문구를 읽고 입술을 한 번 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-12:beat:b:d-2:deny",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 류선우 대표를 찍어내리려고 밖에서 판 깐 적 없어요. 그때는 상담 직전 현장 설명이었지, 뒤에서 사람 하나 세우려던 게 아닙니다.",
      "behaviorHint": "상체를 앞으로 기울여 결론부터 세게 내민다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-2:hedge",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "보조 스태프랑 홍세진에게 답답하다고 말한 건 맞아요. 그래도 그걸 바로 평판 훼손 의도라고 몰아가면 순서가 뒤집히죠.",
      "behaviorHint": "같은 표현을 짧게 반복하며 방어선을 친다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-2:partial",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 밖에서 선우 대표 승인 지연과 출고 얘기를 꺼냈습니다. 하지만 바이어한테 직접 던진 건 아니고, 그땐 저는 현장 수습이라고 생각했어요.",
      "behaviorHint": "말끝을 세게 누르다가도 마지막엔 속도를 늦춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-2:blame",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "그날 상담 직전마다 일정이 막히니까 누군가는 왜 오더가 흔들리는지 설명해야 했습니다. 제가 선을 넘은 건 맞지만, 원인 쪽 책임까지 사라지진 않아요.",
      "behaviorHint": "손바닥으로 책상을 가볍게 누르며 원인을 앞세운다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-2:confession",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "저도 외부 인력에게 선우 대표 불만을 흘렸습니다. 직접 바이어에게 험담한 건 아니어도 금지 원칙을 깬 책임은 인정합니다.",
      "behaviorHint": "한숨을 섞어 말하며 어조가 한 단계 내려간다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-2:evidence_hit",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "원본 대화가 이렇게 남아 있으면 부정은 못 하죠. 저는 현장 설명이라고 생각했지만, 밖에선 충분히 책임 돌리기로 들렸겠습니다.",
      "behaviorHint": "증거를 보자마자 목소리가 조금 가라앉는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-12:beat:b:d-3:deny",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "결국 선우 대표가 바이어 앞에서 제 평판을 깎았다고 믿었어요. 그 캡처 한 줄이랑 반응이 딱 그렇게 붙었으니까요.",
      "behaviorHint": "상대를 똑바로 보며 결론 문장을 먼저 던진다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-3:hedge",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "원문 전부를 본 건 아니어도, 그때 제겐 직접 험담 말고는 설명이 안 됐어요. 그래서 결론부터 먼저 갔습니다.",
      "behaviorHint": "짧은 질문형 억양으로 같은 포인트를 되풀이한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-3:partial",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "지금은 알아요. 그 캡처만으론 수신자도 앞뒤도 안 보입니다. 그래도 그 시점의 저는 누가 제 이름을 건너뛰어 말한 줄 알았어요.",
      "behaviorHint": "캡처를 가리키는 손짓을 하다가 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-3:blame",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "행사 직후 바이어 관계가 흔들리면 제 쪽은 바로 신뢰가 무너집니다. 그 공포가 경로 확인보다 결론을 먼저 밀어 올렸어요.",
      "behaviorHint": "눈썹을 세우고도 마지막 문장에서는 힘이 빠진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-3:confession",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "선우 대표가 바이어에게 직접 험담한 건 아니었습니다. 제가 의도부터 먼저 단정했고, 홍세진이 양쪽 불만을 섞어 과장한 요약을 상대 발화로 몰아갔어요. 그건 제 잘못이에요.",
      "behaviorHint": "말끝에서 배신감 대신 자책이 묻어난다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-3:evidence_hit",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 follow-up을 보니까 제가 붙든 캡처 한 줄이 전체가 아니네요. 문제 문장은 홍세진 요약에서 커진 거였어요.",
      "behaviorHint": "짧게 침묵했다가 문장을 낮게 이어 간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-12:beat:b:d-4:deny",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "규칙이 있었다고 해서 현장 문제까지 입 다물라는 뜻은 아니었다고 봤어요. 그때 저는 그렇게 합리화했습니다.",
      "behaviorHint": "양손을 펴 보이며 규칙 해석을 넓히려 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-4:hedge",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "문서 체크는 했죠. 그런데 상담이 흔들리니까 선우 대표 얘기를 밖으로 꺼내도 된다고 저부터 선을 낮췄어요.",
      "behaviorHint": "인정과 반박 사이를 오가며 말끝을 세운다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-4:partial",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "맞아요. 외부 인력 앞에서 상대 얘기를 꺼낸 순간 다만 이미 규칙 위반입니다. 그 선을 제가 넘었습니다.",
      "behaviorHint": "짧게 인정하고 턱을 들어 올린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-4:blame",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "저만 어긴 건 아닙니다. 선우 대표도 같은 선을 넘었고, 그래서 소문 재료가 양쪽에서 생겼어요.",
      "behaviorHint": "상대를 가볍게 가리키며 공동 위반을 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-4:confession",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "둘 다 상호 비방 금지 원칙을 깼습니다. 확인 체크까지 해놓고도 감정이 올라오자 규칙을 접은 건 제 책임입니다.",
      "behaviorHint": "숨을 내쉬며 스스로를 겨누듯 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-12:beat:b:d-4:evidence_hit",
      "caseId": "partnership-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "e-5랑 e-6을 같이 보면 규칙 위반이라는 말은 피할 수 없네요. 제가 예외를 만든 순간부터 밖으로 새어 나갈 구멍이 생긴 겁니다.",
      "behaviorHint": "문서를 내려놓고 시선을 잠깐 떨군다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
};

export const tenant05TellsBeats = {
  "caseId": "tenant-05",
  "executableTells": {
    "a": [
      {
        "id": "tenant05:a:tell:quote_repeat",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "그 표현",
          "문제 세입자라니",
          "그렇게 말하셨죠"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 한 말이 불리하다고 느끼면 그 문장을 거의 그대로 반복해 되물으며 말꼬리를 잡는다."
      },
      {
        "id": "tenant05:a:tell:receipt_flash",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "여기 보세요",
          "캡처 먼저 보세요",
          "기록은 남아 있어요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "책임을 묻는 질문이 나오면 설명보다 먼저 계좌 캡처와 사진첩을 빠르게 넘겨 보인다."
      },
      {
        "id": "tenant05:a:tell:dry_laugh_break",
        "appliesWhen": [
          "emotional",
          "shame",
          "hurt",
          "cornered"
        ],
        "lexicalHooks": [
          "하...",
          "웃기네요",
          "그게 그렇게 되나요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "억울할수록 짧게 웃어 넘기려다 곧바로 목소리가 높아지며 말이 빨라진다."
      }
    ],
    "b": [
      {
        "id": "tenant05:b:tell:community_shield",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "새로 들어올 분들",
          "건물 전체 평판",
          "제가 먼저 막아야 해서"
        ],
        "sentenceShape": "enumeration",
        "cadence": "every_turn",
        "originalPattern": "불리해지면 '새로 들어올 분들이 먼저 걱정해서'라고 말해 자신이 주도했다는 인상을 줄인다."
      },
      {
        "id": "tenant05:b:tell:past_stack",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "그때도요",
          "그 전에도",
          "예전부터"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "한 번의 옛 사건도 여러 번 있었던 것처럼 날짜를 길게 나열하며 현재 분쟁과 묶는다."
      },
      {
        "id": "tenant05:b:tell:injured_pause",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame",
          "cornered"
        ],
        "lexicalHooks": [
          "제가 다 감당하느라",
          "제가 먼저 상처를",
          "하... 제가요"
        ],
        "sentenceShape": "question_end",
        "cadence": "once_every_2_turns",
        "originalPattern": "대답 전에 길게 숨을 내쉬고, 마치 자신이 먼저 상처받은 사람처럼 느린 톤으로 다시 말을 시작한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant05:beat:a:d-3:deny",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그건 아직 정산 중이던 항목이었어요. 일부러 숨긴 것처럼 말씀하시면 곤란합니다.",
      "behaviorHint": "상대 표현을 그대로 따라 하며 바로 반박하고, 휴대폰 화면을 쥔 손에 힘이 들어간다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-3:hedge",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "카드랑 소액 처리비는 마지막에 같이 맞추려던 거였습니다. 크게 만들 사안은 아니라고 본 거예요.",
      "behaviorHint": "시선을 비껴 두고 말끝을 살짝 흐리며 정당화를 먼저 꺼낸다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-3:partial",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "출입카드 분실이랑 소액 처리비가 남은 건 맞아요. 다만 그걸로 제가 떼먹으려 했다는 식으로 몰아가는 건 과합니다.",
      "behaviorHint": "인정과 반박을 한 문장 안에 섞어 빠르게 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-3:blame",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "네, 남은 건 맞아요. 그런데 민재 씨는 그 작은 걸 붙들고 다른 공제까지 다 정당화하려 했잖아요.",
      "behaviorHint": "영수증 쪽을 탁 짚고 상대를 노려보며 문장을 밀어붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-3:confession",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "출입카드 1장과 음식물 처리비를 먼저 알리지 않은 건 제 책임입니다. 그 부분은 제가 정산하겠습니다.",
      "behaviorHint": "짧게 숨을 고르고 말속도를 늦추며 또렷하게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-3:evidence_hit",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "여기 기록까지 나오면 제가 끝까지 부인할 수는 없죠. 금액 규모가 작다는 건 같이 봐야 합니다.",
      "behaviorHint": "자료를 급히 넘겨 보이다가 마지막 문장에서 톤이 확 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant05:beat:a:d-4:deny",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "실내 흡연 같은 건 없었습니다. 그 얘길 또 꺼내는 것 자체가 저한텐 모욕이에요.",
      "behaviorHint": "짧게 웃어 넘기려다 곧 표정이 굳고, 상대 표현을 되받아친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-4:hedge",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "예전 옥상에서 잠깐 말이 나온 적은 있어도, 그걸 지금까지 끌어와 사람 전체를 재단하면 안 되죠.",
      "behaviorHint": "어조는 세지만 핵심 사실은 약간 비켜 가며 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-4:partial",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 한 번 있었던 일까지는 인정합니다. 하지만 반복 문제나 실내 흡연처럼 말한 건 과장이에요.",
      "behaviorHint": "한 손으로 머리카락을 넘기며 마지못해 일부만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-4:blame",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 아예 없었다고 한 건, 그 한 번의 일로 계속 낙인찍히는 게 싫어서였어요. 그걸 여기까지 끌고 온 건 민재 씨 쪽입니다.",
      "behaviorHint": "감정이 올라와 말이 빨라지고, 끝에서 목소리가 높아진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-4:confession",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "옥상 민원은 한 번 있었고 제가 사과한 것도 맞습니다. 그 사건은 종결됐고, 지금 분쟁의 상습성 근거가 될 수는 없습니다. 제 잘못이었습니다.",
      "behaviorHint": "시선을 내렸다가 다시 올리며 문장을 분리해 차분히 정리한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-4:evidence_hit",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "캡처가 나오면 제가 '아예 없었다'고만 하긴 어렵습니다. 그래도 한 번과 상습은 다르잖아요.",
      "behaviorHint": "자료를 본 뒤 웃음기가 사라지고, 인정 문장은 낮게 내뱉는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant05:beat:a:d-5:deny",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그 공제 통보는 처음부터 과했습니다. 장롱문 교체비랑 탈취비까지 제가 다 낼 이유는 없어요.",
      "behaviorHint": "책상 가장자리를 손가락으로 두드리며 단호하게 선을 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-5:hedge",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공동 점검도 안 끝난 상태였으니까요. 적어도 저 큰 항목들부터 먼저 빼는 건 맞지 않았습니다.",
      "behaviorHint": "상대 말 한 조각을 인용해 되묻고, 이어서 계약 절차를 들먹인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-5:partial",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "소액 정산이 일부 있을 수는 있어도, 지금 통보된 범위는 전혀 다른 문제예요. 계약서랑 기록을 같이 보셔야 합니다.",
      "behaviorHint": "자료를 내밀며 항목을 나눠 설명하려 하지만 아직 방어적이다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-5:blame",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 부담할 건 카드비랑 처리비 정도입니다. 민재 씨는 퇴거 뒤 생긴 손상까지 붙여서 공제를 키웠죠.",
      "behaviorHint": "손가락을 접어 항목별로 세며 상대 책임을 분명히 찍는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-5:confession",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "카드 재발급비와 음식물 처리비는 제가 정산하겠습니다. 대신 과대하게 잡힌 교체비와 탈취비는 빠져야 합니다. 제 잘못이었습니다.",
      "behaviorHint": "호흡을 가다듬고 선명한 톤으로 항목별 결론만 짧게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:a:d-5:evidence_hit",
      "caseId": "tenant-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "관리비 자료가 나오면 작은 항목까지 없다고 하긴 어렵죠. 하지만 그걸 빌미로 큰 공제까지 정당화할 수는 없습니다.",
      "behaviorHint": "증거를 보는 순간 눈썹이 살짝 찌푸려지고, 곧바로 범위 구분으로 화제를 옮긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant05:beat:b:d-1:deny",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "새로 들어올 분들이 먼저 물으셔서 설명드린 겁니다. 제가 사람을 헐뜯으려고 한 건 아니었습니다.",
      "behaviorHint": "길게 숨을 내쉰 뒤 손바닥을 펼쳐 억울한 사람처럼 보이려 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-1:hedge",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "예전 옥상 일도 있었고 정산 문제도 남아 있었으니, 제가 조심스럽게 말할 사정은 있었지요.",
      "behaviorHint": "과거 일을 길게 늘어놓으며 현재 판단을 희석한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-1:partial",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "표현이 조금 셌던 건 인정합니다. 다만 입주 예정자 입장에선 알아야 할 부분이라고 생각했습니다.",
      "behaviorHint": "문장을 길게 이어 붙이며 잘못을 일부만 좁게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-1:blame",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "선우 씨가 아예 없던 일처럼 말하니 저도 그 우려를 더 강하게 전달하게 된 겁니다. 집주인 입장도 생각해 주셔야죠.",
      "behaviorHint": "피해자처럼 느린 톤을 유지하다가 마지막 문장에서 책임을 돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-1:confession",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "옥상 민원 한 번, 뒤늦은 손상, 소액 미납을 한데 묶어 과장한 건 제 잘못입니다. 그 표현은 정정하겠습니다.",
      "behaviorHint": "어깨가 내려가고, 문장 사이마다 짧게 멈춰 실제 사과처럼 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-1:evidence_hit",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "캡처가 이렇게 남아 있으면 제 표현이 먼저 나간 건 부인하기 어렵습니다. 그때는 계약이 깨질까 정말 급했습니다.",
      "behaviorHint": "캡처를 본 뒤 목을 가다듬고, 변명과 인정이 섞인 어조로 바뀐다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant05:beat:b:d-2:deny",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 손상은 원래 있었을 수도 있습니다. 적어도 제가 만든 것처럼 단정하는 건 무리입니다.",
      "behaviorHint": "고개를 약간 젖히고 단정적으로 말하지만 손끝은 불안하게 움직인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-2:hedge",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "퇴거 뒤에 들어간 건 맞습니다만, 그때도 이미 상태가 좋지 않다고 봤습니다. 확인하러 간 거였어요.",
      "behaviorHint": "말끝을 남기며 확신을 낮추고, 시선은 정면을 피한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-2:partial",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "공동 점검 전에 먼저 들어간 건 인정합니다. 공실을 줄이려 서둘렀던 건데, 그게 이렇게까지 번질 줄은 몰랐습니다.",
      "behaviorHint": "한숨을 섞어 말하며 절차 위반은 인정하되 손상 책임은 아직 붙들고 있다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-2:blame",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "선우 씨가 워낙 강하게 나오니 제가 다 뒤집어쓰는 느낌입니다. 선우 씨가 짐 빼면서 이미 긁힘이 있었고, 저는 상태를 확인한 것뿐이라고 본 겁니다.",
      "behaviorHint": "억울한 표정을 지으며 속도를 늦추고, 스스로를 피해자로 배치한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-2:confession",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "조카와 정리하다 문짝과 걸레받이를 건드린 게 맞습니다. 그 손상을 선우 씨 책임으로 돌린 건 제 잘못입니다.",
      "behaviorHint": "문장 초반에 숨을 길게 내쉬고, 마지막에 고개를 떨군다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-2:evidence_hit",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "영상에 제가 먼저 들어간 게 저렇게 남아 있으면 더는 숨기기 어렵군요. 그때는 공실 걱정이 너무 컸습니다.",
      "behaviorHint": "CCTV를 보는 순간 자세가 움츠러들고, 곧바로 공실 압박을 호소한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant05:beat:b:d-5:deny",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "복구 비용이 드니 공제는 당연하다고 본 겁니다. 새 세입자를 받으려면 넉넉히 볼 수밖에 없었습니다.",
      "behaviorHint": "건물 평판과 입주 준비를 앞세워 숫자 질문을 피한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-5:hedge",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "계약 조항은 압니다만, 현장에서는 냄새며 문짝이며 한꺼번에 정리해야 했습니다. 그래서 범위를 넓게 본 겁니다.",
      "behaviorHint": "말을 길게 늘이며 실무 부담을 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-5:partial",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "실제 확인 항목만 공제라는 원칙은 인정합니다. 다만 당시엔 수리비와 공실 부담이 겹쳐 금액을 보수적으로 잡았습니다.",
      "behaviorHint": "계약서를 흘끗 보고 나서야 인정 문장을 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-5:blame",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "미납도 있었고 집 상태도 좋지 않아 보여서 크게 잡은 겁니다. 제가 다 감당해야 한다는 압박도 있었습니다.",
      "behaviorHint": "피해자처럼 숨을 길게 내쉬고, 현재 책임을 전체 사정으로 희석한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-5:confession",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "이제 보니 실제 공제 가능한 건 카드 재발급비와 소액 미납 정도였습니다. 큰 공제 통보는 제가 과하게 잡은 겁니다. 제 잘못이었습니다.",
      "behaviorHint": "어조가 조용해지고, 결론만 짧게 인정하며 더는 변명하지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant05:beat:b:d-5:evidence_hit",
      "caseId": "tenant-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "계약서가 나오니 제가 범위를 넓게 본 건 맞습니다. 그래도 당시엔 새 입주를 바로 맞춰야 해서 마음이 급했습니다.",
      "behaviorHint": "특약 문구를 읽는 순간 말을 멈췄다가, 느린 톤으로 자기 사정을 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    }
  ]
}


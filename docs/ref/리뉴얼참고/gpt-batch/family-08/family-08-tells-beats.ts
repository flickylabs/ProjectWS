export const family08TellsBeats = {
  "caseId": "family-08",
  "executableTells": {
    "a": [
      {
        "id": "family08:a:tell:timeline_press",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "몇 시",
          "그 다음",
          "먼저",
          "나중에"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "밀리기 시작하면 몇 시에 누가 무엇을 알았는지 시간표를 빠르게 읽어 상대의 해명을 끊는다."
      },
      {
        "id": "family08:a:tell:betrayal_echo",
        "appliesWhen": [
          "lying",
          "hurt",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "또",
          "숨겼잖아",
          "나만",
          "나중에"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리한 공개비난 질문에도 '결국 또 숨겼잖아'를 반복해 자신의 과한 반응을 배신에 대한 자연스러운 결과처럼 만든다."
      },
      {
        "id": "family08:a:tell:past_overlay",
        "appliesWhen": [
          "emotional",
          "cornered",
          "hurt"
        ],
        "lexicalHooks": [
          "그때도",
          "ICU",
          "마찬가지",
          "이번에도"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "현재 쟁점이 막히면 아버지 ICU 연락이 늦었던 일을 바로 끌어와 사건을 하나의 패턴으로 묶는다."
      }
    ],
    "b": [
      {
        "id": "family08:b:tell:urgency_buffer",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "배회",
          "넘어짐",
          "경보",
          "일단 안전부터"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "핵심 질문에 바로 답하지 않고 배회, 넘어짐, 가스 경보 같은 긴급 상황을 길게 늘어놓는다."
      },
      {
        "id": "family08:b:tell:soft_minimizing",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그냥",
          "자리만",
          "잡아둔",
          "평가부터"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "대기등록과 평가입소를 '그냥 자리만 잡아둔 거야'라고 줄여 말해 통보 누락의 무게를 낮춘다."
      },
      {
        "id": "family08:b:tell:care_burden_shield",
        "appliesWhen": [
          "cornered",
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "밤마다",
          "찾으러",
          "세 번",
          "내가 다 뛰었다"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "궁지에 몰리면 자신이 밤마다 몇 번씩 어머니를 찾으러 나간 일을 길게 말하며 절차보다 현장 고생을 방패로 세운다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "family08:beat:a:d-2:deny",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 친척들한테 확인을 부탁한 겁니다. 준호를 공개적으로 매도하려던 건 아니었습니다.",
      "behaviorHint": "파일을 정리하듯 손끝으로 공중에 순서를 세운다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "id": "family08:beat:a:d-2:hedge",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "표현이 좀 셌을 수는 있죠. 그런데 그때 제 손에 있던 건 설명 없는 송금뿐이었습니다.",
      "behaviorHint": "말끝을 짧게 끊고 곧바로 송금 쪽으로 화제를 되돌린다.",
      "applicableStates": [
        "S1",
        "S2"
      ]
    },
    {
      "id": "family08:beat:a:d-2:evidence_hit",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "원문을 보니 '몰래 넣었다'는 식으로 들릴 수 있겠네요. 제가 도움 요청이라고만 말하기엔 문장이 너무 앞서갔습니다.",
      "behaviorHint": "출력물을 보는 눈동자가 잠깐 멈춘 뒤 속도를 늦춘다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "family08:beat:a:d-2:partial",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 친척방으로 말이 커진 건 인정합니다. 다만 그 반응은 또 숨겼다는 제 인식에서 바로 튀어나온 겁니다.",
      "behaviorHint": "한 번 인정한 뒤 즉시 원인 설명을 덧붙인다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family08:beat:a:d-2:blame",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 과했더라도, 준호가 그날 바로 설명했으면 친척방까지 갈 이유가 없었습니다. 먼저 비운 건 준호 쪽입니다.",
      "behaviorHint": "문서 끝을 탁 치며 원인 화살표를 상대에게 돌린다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ]
    },
    {
      "id": "family08:beat:a:d-2:confession",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "계약 성격도 확인하기 전에 친척들 앞에서 준호를 먼저 규정한 건 제 잘못입니다. 공개 비난으로 사건을 키웠습니다.",
      "behaviorHint": "자료를 내려놓고 숨을 고른 뒤 낮은 톤으로 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family08:beat:a:d-4:deny",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "작년 가을에 입소 조건까지 합의됐다고 보긴 어렵습니다. 그때는 상담이 필요하면 알아보자는 정도였습니다.",
      "behaviorHint": "표현을 회계 항목처럼 잘게 나눠 차갑게 말한다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "id": "family08:beat:a:d-4:hedge",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "은솔요양원 이야기가 나온 건 맞을 수 있습니다. 하지만 '바로 진행'까지 같은 문장으로 묶는 건 과장입니다.",
      "behaviorHint": "핵심 단어만 따옴표를 치듯 강조한다.",
      "applicableStates": [
        "S1",
        "S2"
      ]
    },
    {
      "id": "family08:beat:a:d-4:evidence_hit",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "잘린 노트 사진만으로는 전부를 못 보지만, '은솔 대기' 문구 자체는 부인하기 어렵네요.",
      "behaviorHint": "사진 하단 잘린 부분을 손가락으로 짚으며 시선을 떨군다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "family08:beat:a:d-4:partial",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "사전합의가 아주 없었다기보다 범위를 좁게 기억하고 있었던 것 같습니다. 저는 통보 조항이 더 먼저 떠올랐습니다.",
      "behaviorHint": "처음으로 '합의'라는 단어를 피하지 않고 입에 올린다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family08:beat:a:d-4:blame",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "합의가 있었다 해도 준호 혼자 실행하라는 뜻은 아니었습니다. 같은 날 공유를 빼고 말하면 전혀 다른 규칙이 됩니다.",
      "behaviorHint": "문장 끝을 냉정하게 정리하듯 딱 잘라 말한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ]
    },
    {
      "id": "family08:beat:a:d-4:confession",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "네, 작년 가을에 사전합의는 있었습니다. 다만 저는 그 합의를 인정하는 순간 어머니를 포기한 사람처럼 느껴져서, 존재 자체를 줄여 말했습니다.",
      "behaviorHint": "한 박자 쉬고 마지막 문장에서만 감정이 새어 나온다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family08:beat:a:d-5:deny",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "배신 프레임을 키운 건 준호의 늦은 통보입니다. 저는 그 반응을 했을 뿐, 처음 불을 붙인 사람은 아닙니다.",
      "behaviorHint": "상대 책임 비율을 계산하듯 차분하게 말한다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "id": "family08:beat:a:d-5:hedge",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "ICU 때 다섯 시간 늦었던 기억이 있으니 제가 그렇게 읽은 데엔 이유가 있습니다. 완전히 없는 배신 서사는 아니었다는 뜻입니다.",
      "behaviorHint": "연도와 시간부터 먼저 읽고 마지막에 결론을 덧붙인다.",
      "applicableStates": [
        "S1",
        "S2"
      ]
    },
    {
      "id": "family08:beat:a:d-5:evidence_hit",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "기록을 보니 제 감정만 내세울 수는 없겠네요. 준호의 공백이 있었고, 저는 그 위에 과거 기억을 바로 덧씌웠습니다.",
      "behaviorHint": "말의 속도가 갑자기 줄고 계산하듯 문장을 재배열한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "family08:beat:a:d-5:partial",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "친척방으로 말이 커진 건 인정합니다. 다만 그 전에 제가 또 마지막이었다는 감각이 먼저 폭발했습니다.",
      "behaviorHint": "인정과 반박을 한 문장 안에 붙여 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family08:beat:a:d-5:blame",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 패턴으로 읽은 건 사실이지만, 그런 패턴을 다시 만든 건 준호입니다. 같은 날만 알렸어도 친척방까지는 안 갔습니다.",
      "behaviorHint": "손으로 공백 시간을 길게 그어 보인다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ]
    },
    {
      "id": "family08:beat:a:d-5:confession",
      "caseId": "family-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저도 과거 ICU 기억을 현재 사건 위에 덧씌우고, 친척들 앞에서 먼저 배신 서사를 퍼뜨렸습니다. 공동 책임을 부인하지 않겠습니다.",
      "behaviorHint": "말끝을 흐리지 않고 또렷하게 마무리한다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family08:beat:b:d-1:deny",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 엄마를 정식 입소시킨 돈이 아니라 그냥 자리부터 잡아둔 겁니다. 누나를 빼놓으려던 건 아닙니다.",
      "behaviorHint": "배회와 침상 이야기를 길게 깔고 핵심 부정은 뒤에 붙인다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "id": "family08:beat:b:d-1:hedge",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그날 밤엔 배회, 통화, 현장 정리까지 겹쳤습니다. 아침에 설명하려던 거지 숨기려던 건 아닙니다.",
      "behaviorHint": "손가락으로 동선을 하나씩 세며 말한다.",
      "applicableStates": [
        "S1",
        "S2"
      ]
    },
    {
      "id": "family08:beat:b:d-1:evidence_hit",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "기록대로라면 제가 먼저 보내고도 같은 날 단톡에 못 올린 건 맞습니다. 그 부분은 부인하기 어렵습니다.",
      "behaviorHint": "통화 로그를 본 뒤 한숨을 짧게 쉰다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "family08:beat:b:d-1:partial",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "먼저 보낸 건 맞지만, 그때 제 머릿속엔 일단 안전부터라는 생각뿐이었습니다. 절차보다 침상 확보가 먼저였어요.",
      "behaviorHint": "시선이 흔들리지만 '안전'이라는 단어만은 또렷하게 찍는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family08:beat:b:d-1:blame",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 바로 말했으면 좋았겠지만, 누나가 들으면 무조건 막을 거라는 생각도 있었습니다. 그래서 아침까지 미뤘습니다.",
      "behaviorHint": "말끝에서 상대 반응을 겁내는 표정이 드러난다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ]
    },
    {
      "id": "family08:beat:b:d-1:confession",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "평가입소 자리 확보라는 판단과 별개로, 같은 날 공유를 어긴 건 제 잘못입니다. 그 점에서 누나에게 또 배신처럼 느끼게 만들었습니다.",
      "behaviorHint": "핑계 없이 핵심 문장 두 개만 짧게 말한다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family08:beat:b:d-3:deny",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "150만원은 영구입소 계약금이 아닙니다. 그냥 평가 자리 잡는 돈인데 너무 무겁게 받아들인 겁니다.",
      "behaviorHint": "숫자를 먼저 꺼내고 뒤에 의미를 가볍게 덧붙인다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "id": "family08:beat:b:d-3:hedge",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "정식 계약은 아니고 평가부터 보자는 쪽이었습니다. 세세한 규정은 그때 다 말하면 더 복잡해질까 싶었습니다.",
      "behaviorHint": "말끝이 흐려지며 '복잡해질까'에서 시선이 옆으로 빠진다.",
      "applicableStates": [
        "S1",
        "S2"
      ]
    },
    {
      "id": "family08:beat:b:d-3:evidence_hit",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "신청서대로 보면 맞습니다. 영구입소 확정금이 아니라 평가입소 대기금입니다.",
      "behaviorHint": "문서의 명칭을 또박또박 읽어 내려간다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "family08:beat:b:d-3:partial",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "의미 자체는 그렇게 보는 게 맞습니다. 다만 저는 그 차이를 누나한테 너무 짧게, 너무 쉽게 말했습니다.",
      "behaviorHint": "손바닥을 아래로 내리며 의미를 눌러 말하던 습관이 드러난다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family08:beat:b:d-3:blame",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "누나도 영수증만 보고 최악으로 읽었지만, 제가 '그냥 자리만'이라고 줄여 말한 탓이 큰 건 압니다.",
      "behaviorHint": "상대 탓을 하다가 마지막에 자기 책임으로 돌아온다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ]
    },
    {
      "id": "family08:beat:b:d-3:confession",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "150만원은 환불 가능한 평가입소 대기금이 맞습니다. 그런데 저는 그 차이를 충분히 설명하지 않고 줄여 말해 오해를 키웠습니다.",
      "behaviorHint": "영수증과 환불 규정 메일을 번갈아 보며 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "family08:beat:b:d-4:deny",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "작년 가을에 이미 조건은 정해졌습니다. 배회나 화재 위험이 다시 나오면 은솔 쪽으로 가기로 했던 겁니다.",
      "behaviorHint": "문장을 짧게 자르며 이미 끝난 일처럼 단정한다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "id": "family08:beat:b:d-4:hedge",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "노트에도 은솔 대기라고 적혀 있습니다. 그래서 전 새 허락을 받는 게 아니라 기존 조건을 실행한 거라고 본 겁니다.",
      "behaviorHint": "잘린 사진을 내밀며 자신 있는 척하지만 눈은 불안정하다.",
      "applicableStates": [
        "S1",
        "S2"
      ]
    },
    {
      "id": "family08:beat:b:d-4:evidence_hit",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "네, 저 사진은 제 쪽에 유리한 문장만 먼저 보이게 잘린 겁니다. 전체 문맥까지 보여주진 못하죠.",
      "behaviorHint": "사진을 거두며 말끝을 낮춘다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "family08:beat:b:d-4:partial",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "사전합의가 있었다는 건 맞습니다. 다만 저는 그 안의 같은 날 공유 조항은 제 편한 쪽으로 뒤로 밀어뒀습니다.",
      "behaviorHint": "합의와 조항을 손가락 두 개로 분리해 보여 준다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "id": "family08:beat:b:d-4:blame",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "누나도 합의 존재를 거의 지워 버렸지만, 저도 반대로 공유 조항을 빼고 말했습니다. 둘 다 자기 쪽에 유리하게 기억한 셈입니다.",
      "behaviorHint": "고개를 끄덕이며 상대와 자신을 같은 선에 올린다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ]
    },
    {
      "id": "family08:beat:b:d-4:confession",
      "caseId": "family-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "사전합의는 있었지만 그건 제 단독 진행권이 아니었습니다. 저는 '이미 다 합의됐다'는 말로 통보 의무를 덮으려 했습니다.",
      "behaviorHint": "어깨가 내려가고 시선이 바닥에 고정된다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    }
  ]
}

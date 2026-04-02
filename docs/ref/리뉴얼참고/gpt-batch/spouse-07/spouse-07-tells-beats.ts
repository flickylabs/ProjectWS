export const spouse07TellsBeats = {
  "caseId": "spouse-07",
  "executableTells": {
    "a": [
      {
        "id": "spouse07:a:tell:evidence_dump",
        "appliesWhen": [
          "lying",
          "cornered",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "영수증 보면",
          "캘린더에 다 있어요",
          "이 날짜들 보세요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "억울해지면 며칠치 영수증과 캘린더를 한꺼번에 보여 주며 맥락보다 양으로 밀어붙인다."
      },
      {
        "id": "spouse07:a:tell:late_correction",
        "appliesWhen": [
          "hurt",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "그때 말 못 했지만",
          "정리해 보니",
          "나중에 다시 보니까"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "즉석에서 반박하지 못하다가 며칠 뒤 메모를 정리해 '그때 말 못 했지만'으로 시작한다."
      },
      {
        "id": "spouse07:a:tell:numeric_flattening",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "이번 주",
          "총 건수로 보면",
          "숫자로 놓고 보면"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "감정 갈등을 '이번 주 17건 중 9건'처럼 숫자로 평평하게 만든다."
      }
    ],
    "b": [
      {
        "id": "spouse07:b:tell:scene_expansion",
        "appliesWhen": [
          "lying",
          "emotional",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "그날 아침에",
          "현관 앞에서",
          "정말 전쟁 같았어요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "자신이 한 장면 하나를 길게 늘여 전체 기여처럼 보이게 만든다."
      },
      {
        "id": "spouse07:b:tell:hero_frame",
        "appliesWhen": [
          "hurt",
          "cornered",
          "emotional",
          "defensive"
        ],
        "lexicalHooks": [
          "결국 제가",
          "마지막엔 제가",
          "누가 뛰었는데요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "'결국 내가 뛰었잖아' 같은 문장으로 위기 해결자 역할을 강조한다."
      },
      {
        "id": "spouse07:b:tell:selective_memory",
        "appliesWhen": [
          "defensive",
          "avoiding",
          "lying"
        ],
        "lexicalHooks": [
          "등원은 제가",
          "행사는 제가",
          "보이는 건 제가 했어요"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "등원·행사처럼 사람들 눈에 보인 일만 먼저 꺼내고 밤 준비나 행정노동은 뒤로 미룬다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse07:beat:a:d-2:deny",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그건 편집이 아니라 제가 맡은 쪽만 따로 본 겁니다. 없는 걸 만든 건 아니에요.",
      "behaviorHint": "시선은 피하지만 말끝을 단정하게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-2:hedge",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "전체를 숨기려던 건 아니고, 그 순간 제 억울함이 제일 잘 보이는 부분을 뽑은 겁니다.",
      "behaviorHint": "손가락으로 보이지 않는 표를 그리듯 범위를 나눈다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-2:partial",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 밤·주말만 뽑았습니다. 다만 그건 안 보이는 일을 보이게 하려던 과한 방식이었습니다.",
      "behaviorHint": "짧게 인정한 뒤 곧바로 이유를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-2:blame",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "다혜 씨가 공개적으로 크게 말하지 않았으면 저도 그렇게까지 안 잘랐을 겁니다.",
      "behaviorHint": "한 박자 늦게 상대 쪽을 보며 책임을 돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-2:confession",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "선택 편집이 맞습니다. 저는 집안일 안 하는 남편으로 굳어질까 무서워서 맥락을 잘랐습니다.",
      "behaviorHint": "캘린더를 펼치려다 멈추고 한숨을 내쉰다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-2:evidence_hit",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "원본 이력까지 같이 나오면 더는 부인하기 어렵습니다. 제가 아침 카테고리를 뺀 건 맞습니다.",
      "behaviorHint": "손에 쥔 파일을 천천히 내려놓는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "spouse07:beat:a:d-4:deny",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "제가 먼저 점수판을 꺼낸 건 아닙니다. 해명하려고 적기 시작한 거예요.",
      "behaviorHint": "턱을 굳히고 냉장고 메모 쪽을 보지 않는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-4:hedge",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "정산하려고 적은 건 맞지만, 상대를 깎아내리려던 의도는 아니었습니다.",
      "behaviorHint": "숫자를 세는 손짓을 하다가 멈춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-4:partial",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 저도 '몇 건'으로 대응했습니다. 다만 그 전에 이미 공개적으로 판이 깔려 있었어요.",
      "behaviorHint": "인정 뒤 바로 선행 사정을 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-4:blame",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "다혜 씨 말이 계속 남으니까 저도 숫자로라도 남겨야 한다고 생각했습니다.",
      "behaviorHint": "억눌린 표정으로 메모를 손끝으로 두드린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-4:confession",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "아이 앞 냉장고에 그 숫자를 붙여 둔 건 제 잘못입니다. 반박이라는 명분 뒤에 숨어 있었어요.",
      "behaviorHint": "시선을 내리고 목소리가 낮아진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-4:evidence_hit",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "사진과 대화가 같이 나오면 변명할 수 없네요. 저도 점수판 언어에 올라탄 게 맞습니다.",
      "behaviorHint": "입술을 깨물고 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse07:beat:a:d-5:deny",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "최근 무너진 건 결국 다혜 씨가 제 기여를 계속 깎아 말했기 때문입니다.",
      "behaviorHint": "상대를 바로 보지 않고 책상 가장자리를 쥔다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-5:hedge",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "그 말이 불을 붙인 건 맞고, 일정이 겹친 주간이 유난히 버거웠던 것도 사실입니다.",
      "behaviorHint": "말을 고르며 두 원인을 나란히 놓는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-5:partial",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "한 사람의 태만만으로 설명되진 않습니다. 그래도 저는 그 공개 발언이 결정타였다고 느꼈습니다.",
      "behaviorHint": "양보하듯 시작하지만 마지막에 힘을 준다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-5:blame",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "구조 문제가 있었어도, 그 압박을 제일 먼저 사람 탓으로 만든 건 다혜 씨 쪽이었다고 봅니다.",
      "behaviorHint": "숨을 길게 내쉬고 손바닥을 펴 보인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-5:confession",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "실은 둘 다 버틸 힘이 없어진 상태였습니다. 저는 그 공포를 다혜 씨 책임으로 몰아 일을 더 키웠습니다.",
      "behaviorHint": "어깨가 내려앉고 말 속도가 느려진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:a:d-5:evidence_hit",
      "caseId": "spouse-07",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "도우미 종료 문자와 일정표를 같이 보니, 이걸 한 사람 게으름으로만 말하긴 어렵습니다.",
      "behaviorHint": "캘린더 화면을 보다가 시선을 떼지 못한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "spouse07:beat:b:d-1:deny",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "제가 그렇게 말한 건 그만큼 아침을 제가 버텼기 때문이에요. 공을 뺏으려던 건 아니었어요.",
      "behaviorHint": "빠르게 대꾸하며 당시 장면을 먼저 꺼낸다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-1:hedge",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "표현이 세긴 했어도, 그날 아침 강도를 생각하면 완전히 뜬금없는 말은 아니었어요.",
      "behaviorHint": "한 장면을 길게 묘사하며 여지를 만든다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-1:partial",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "등원만 보면 제가 많이 한 건 맞지만, 평일 전체처럼 들리게 만든 건 인정해요.",
      "behaviorHint": "고개를 끄덕인 뒤 곧바로 아침 이야기로 돌아간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-1:blame",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 인정받고 싶었던 건 맞지만, 태준 씨도 그 뒤로 숫자 싸움으로 더 크게 만들었잖아요.",
      "behaviorHint": "목소리가 올라가며 억울함을 섞는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-1:confession",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "상담과 단톡에서 제가 공을 너무 단수형으로 말했습니다. 같은 채널에서 다시 바로잡아야 했어요.",
      "behaviorHint": "입술을 다문 채 잠깐 말을 멈춘다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-1:evidence_hit",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "상담 메모랑 단톡 문구가 같이 나오면 제가 어떻게 말했는지 부인하긴 어렵네요.",
      "behaviorHint": "사진을 보는 손길이 느려지고 시선이 흔들린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse07:beat:b:d-3:deny",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "체감상으론 제가 거의 다 버틴 것 같았어요. 그래서 그렇게 느낀 거예요.",
      "behaviorHint": "그날 아침 장면을 숨 돌릴 틈 없이 풀어낸다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-3:hedge",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 단정하려던 건 아니어도, 적어도 아침과 행사 쪽은 제가 거의 다 뛰었어요.",
      "behaviorHint": "자기 몫의 장면을 반복해서 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-3:partial",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "아침 루틴만 보면 제가 많이 했지만, 태준 씨가 거의 안 했다고 말한 건 과했어요.",
      "behaviorHint": "말을 낮추지만 여전히 아침의 강도를 앞세운다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-3:blame",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 장면만 앞세운 건 맞아도, 태준 씨도 자기 유리한 기록만 먼저 꺼냈잖아요.",
      "behaviorHint": "상대 쪽 자료를 손으로 가리키며 맞선다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-3:confession",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "태준 씨가 집안일과 육아를 거의 안 한 건 아닙니다. 제가 보이는 아침 전쟁을 전체처럼 말했어요.",
      "behaviorHint": "숨을 고르고 나서야 문장을 천천히 끝낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-3:evidence_hit",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "등하원 기록이랑 병원·세탁 기록을 같이 보면, 제가 너무 한쪽만 보고 말한 게 맞아요.",
      "behaviorHint": "표정이 굳다가 곧 힘이 빠진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse07:beat:b:d-5:deny",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "최근 무너진 건 태준 씨가 제때 움직이지 않고 뒤늦게 자료만 들이민 탓이 컸어요.",
      "behaviorHint": "손을 모았다 펴며 상대 반응을 문제 삼는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-5:hedge",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "태준 씨 대응이 느렸던 건 맞지만, 일정이 한꺼번에 꼬인 것도 있었어요.",
      "behaviorHint": "불만과 상황 설명을 번갈아 내놓는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-5:partial",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "한 사람의 게으름만으로 보긴 어렵습니다. 그래도 그때는 제가 정말 혼자 뛴 느낌이 컸어요.",
      "behaviorHint": "'결국 제가'라는 말이 입가에 맴돈다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-5:blame",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "구조 문제가 있었다 해도, 태준 씨가 더 빨리 운영 얘기를 꺼냈으면 덜 무너졌다고 봐요.",
      "behaviorHint": "말끝마다 아쉬움과 비난이 함께 실린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-5:confession",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "결국 최근 붕괴는 태준 씨 한 사람의 태만이 아니라 도우미 종료와 일정 충돌이 겹친 결과였어요. 제가 그 압박을 사람 문제처럼 말했죠.",
      "behaviorHint": "목소리가 풀리며 감정의 힘이 빠진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse07:beat:b:d-5:evidence_hit",
      "caseId": "spouse-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "도우미 종료 문자와 양쪽 야근 일정이 같이 보이면, 이걸 성향 문제로만 말할 수는 없네요.",
      "behaviorHint": "캘린더를 넘기다 말고 한숨을 쉰다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
} as const;



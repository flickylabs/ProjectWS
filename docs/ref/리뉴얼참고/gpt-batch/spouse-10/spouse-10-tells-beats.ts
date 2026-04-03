export const spouse10TellsBeats = {
  "caseId": "spouse-10",
  "executableTells": {
    "a": [
      {
        "id": "spouse10:a:tell:quote_readback",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "제가 보낸 문장 그대로",
          "그 표현 자체는"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리해지면 자신이 보낸 문장을 그대로 다시 읽으며 그 표현 자체는 틀리지 않았다고 버틴다."
      },
      {
        "id": "spouse10:a:tell:term_fixation",
        "appliesWhen": [
          "defensive",
          "avoiding",
          "hurt"
        ],
        "lexicalHooks": [
          "본가라고 썼지",
          "네 집이라고는 안 썼잖아요"
        ],
        "sentenceShape": "question_end",
        "cadence": "once_every_2_turns",
        "originalPattern": "'본가라고 썼지 네 집이라고 안 썼잖아'처럼 단어 뜻싸움으로 논점을 좁힌다."
      },
      {
        "id": "spouse10:a:tell:silent_assumption",
        "appliesWhen": [
          "cornered",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "당연히 그렇게 읽히는 줄",
          "굳이 다시 확인까지"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "직접 확인을 안 한 이유를 묻는 질문에 '그건 당연히 그렇게 읽히는 줄 알았지'라고 답한다."
      }
    ],
    "b": [
      {
        "id": "spouse10:b:tell:mood_confirmation",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그 분위기였잖아",
          "그 정도면 된 거 아니야"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "확정 여부를 묻는 질문에 '그 분위기였잖아'라며 기분을 합의처럼 말한다."
      },
      {
        "id": "spouse10:b:tell:time_blur",
        "appliesWhen": [
          "cornered",
          "lying",
          "avoiding"
        ],
        "lexicalHooks": [
          "점심쯤",
          "오전쯤"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "'점심쯤' '오전쯤' 같은 뭉툭한 시간을 써서 실제 약속 강도를 흐린다."
      },
      {
        "id": "spouse10:b:tell:question_flip",
        "appliesWhen": [
          "hurt",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "그럼 넌 왜",
          "본가라고만 적었는데"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "자신의 일방 약속을 추궁받으면 '그럼 넌 왜 본가라고만 적었는데?'라고 되묻는다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse10:beat:a:d-2:deny",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 '토 11시 본가'라고 정확히 적었어요. 그걸 두고 친정인지 모르겠다는 건 좀 이상하잖아요.",
      "behaviorHint": "턱을 조금 들고 캘린더 문구를 또박또박 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-2:hedge",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "우리 사이에선 늘 그렇게 불렀어요. 굳이 단어를 더 붙여야 했나 싶어요.",
      "behaviorHint": "말끝을 낮추며 같은 단어를 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-2:partial",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 친정이라고 풀어서 쓰진 않았고 다시 확인도 안 했어요. 그건 제 실수예요.",
      "behaviorHint": "시선을 잠깐 내리며 짧게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-2:blame",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "그래도 애매했다면 묻는 게 먼저죠. 혼자 점심부터 굳힌 건 기현 씨였잖아요.",
      "behaviorHint": "손가락으로 상대 쪽을 짧게 가리킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-2:confession",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제 말이 자동으로 같은 뜻으로 읽힐 거라고 믿은 게 잘못이었어요.",
      "behaviorHint": "숨을 고르고 단어 선택을 천천히 한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-2:evidence_hit",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "캘린더 원본이 이렇게 나오면, 제가 '본가'라고만 남긴 건 부인 못 하네요.",
      "behaviorHint": "입술을 다물었다가 캘린더 화면을 오래 바라본다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "spouse10:beat:a:d-3:deny",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그날 친정이 계속 뒤로 밀렸는데 제가 일부러 아니라고 느끼기 어려웠어요.",
      "behaviorHint": "어깨를 굳힌 채 서운함을 먼저 내세운다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-3:hedge",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "고의라고 단정한 건 아니지만, 적어도 우리 집이 덜 급해 보인 건 맞잖아요.",
      "behaviorHint": "말끝을 흐리면서도 눈은 피하지 않는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-3:partial",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "통화랑 동선을 보니 고의로 무시했다고 단정하긴 어렵네요. 그래도 그때는 그렇게 느꼈어요.",
      "behaviorHint": "증거를 확인한 뒤 천천히 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-3:blame",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "예전부터 친정 일정을 흐리게 넘긴 서운함이 쌓여 있었어요. 그래서 이번에도 먼저 의심했습니다.",
      "behaviorHint": "손을 모았다 풀며 과거 감정을 끌어온다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-3:confession",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "기현 씨가 일부러 장인댁을 무시한 건 아니었던 것 같아요. 제 서운함이 고의 판단을 세게 만들었어요.",
      "behaviorHint": "목소리가 조금 잠기며 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-3:evidence_hit",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "이 기록대로면 일부러 빼려던 흐름보단 각자 다른 계획을 믿고 간 쪽에 가깝네요.",
      "behaviorHint": "하이패스 시각을 보고 한 박자 쉬어 간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse10:beat:a:d-5:deny",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "처음엔 이게 거의 기현 씨 일방 확정 탓이라고 봤어요. 악의가 아니라는 말은 잘 안 들어왔고요.",
      "behaviorHint": "팔짱을 풀지 않은 채 원인 책임을 좁힌다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-5:hedge",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "길이 막힌 문제보다도 누가 먼저 부모님께 말을 박았는지가 더 커 보였어요.",
      "behaviorHint": "원인을 하나로 정리하려 하며 문장을 짧게 끊는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-5:partial",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제 '본가', '가까운 쪽 먼저' 같은 표현이 오해를 키운 건 맞습니다.",
      "behaviorHint": "단어를 그대로 되읽으며 일부 책임을 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-5:blame",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "그래도 기현 씨가 이동시간이랑 점심 준비를 너무 쉽게 본 것도 크죠.",
      "behaviorHint": "고개를 저으며 상대의 낙관을 짚는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-5:confession",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "지금은 악의보다 모호한 표현과 이동시간 오판이 겹친 일이라고 봐요.",
      "behaviorHint": "숨을 길게 내쉬고 결론을 정리해 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:a:d-5:evidence_hit",
      "caseId": "spouse-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "음성메시지랑 대화를 같이 보니, 저도 말만 던져 놓고 같은 그림을 기대했네요.",
      "behaviorHint": "음성메시지 재생이 끝난 뒤 눈을 감았다 뜬다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse10:beat:b:d-1:deny",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "점심을 확정했다기보다 먼저 들를 수 있다는 얘기였어요. 그렇게까지 못 박은 건 아닙니다.",
      "behaviorHint": "고개를 살짝 젖히며 말을 가볍게 만든다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-1:hedge",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 '점심쯤'이라고 했지 시간을 딱 정한 건 아니잖아요. 그 정도면 여지도 있다고 생각했죠.",
      "behaviorHint": "손바닥을 펴 보이며 모호함을 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-1:partial",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "어머니께 먼저 말씀드리고 선물 예약까지 한 건 맞습니다. 그땐 수아 씨도 비슷하게 아는 줄 알았어요.",
      "behaviorHint": "한숨을 섞어 사실관계를 일부 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-1:blame",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "수아 씨가 '본가', '가까운 쪽 먼저'라고만 하니까 저는 우리 집 점심 먼저로 굳었어요.",
      "behaviorHint": "말끝에 억울함을 얹어 반문하듯 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-1:confession",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "배우자 확인도 안 하고 어머니께 토요일 점심처럼 말한 건 제 잘못입니다.",
      "behaviorHint": "시선을 떨어뜨리고 짧게 자책한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-1:evidence_hit",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "단톡이랑 픽업 예약이 이어져 있으면, 제가 어머니 쪽엔 거의 확정처럼 말한 셈이네요.",
      "behaviorHint": "입술을 깨물고 화면을 두 번 확인한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse10:beat:b:d-3:deny",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "장인어른 댁을 일부러 무시한 건 아닙니다. 저는 그 순서가 그렇게 된 줄 알고 움직인 거예요.",
      "behaviorHint": "몸을 앞으로 조금 숙여 의도 부재를 먼저 강조한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-3:hedge",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "안 가려던 게 아니라 먼저 어디를 가는지만 다르게 이해한 겁니다.",
      "behaviorHint": "손으로 순서를 그리듯 공중에 선을 긋는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-3:partial",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "최종 통화 뒤 제 차가 부모님 쪽으로 먼저 간 건 맞아요. 다만 그게 친정을 버리자는 뜻은 아니었습니다.",
      "behaviorHint": "사실을 인정하면서도 즉시 뜻을 해명한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-3:blame",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "수아 씨가 애매하게 말하니까 저는 제 식으로 정리해 버렸어요. 그 착각이 문제였죠.",
      "behaviorHint": "억울한 표정으로 단어를 하나씩 끊어 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-3:confession",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "의도적으로 무시한 건 아니지만, 제 행동 순서가 그렇게 보이게 만든 책임은 인정합니다.",
      "behaviorHint": "어깨가 내려가며 목소리가 차분해진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-3:evidence_hit",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "이 이동 기록을 보면 일부러 뺀 것처럼 설명하기는 어렵겠네요. 각자 다른 계획을 믿고 움직인 게 맞습니다.",
      "behaviorHint": "동선 자료를 보며 변명 속도를 늦춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse10:beat:b:d-5:deny",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 그냥 길이랑 타이밍이 꼬인 정도라고 본 겁니다. 굳이 일을 키우고 싶진 않았어요.",
      "behaviorHint": "어색하게 웃으며 사안을 축소한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-5:hedge",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "서로 좀 서두르다 엇갈린 거지, 원인을 하나로 딱 잘라 말하긴 어렵지 않나요.",
      "behaviorHint": "반문형으로 정리하며 갈등 온도를 낮추려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-5:partial",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "단순 지연만은 아니었어요. 저도 너무 급하게 이해했고 서로 다른 확정안을 믿고 있었죠.",
      "behaviorHint": "표정을 굳히며 축소 설명을 거둬들인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-5:blame",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "수아 씨 표현이 애매했던 데다 저도 이동시간을 쉽게 봤습니다. 둘이 겹쳐서 꼬였어요.",
      "behaviorHint": "양손을 벌려 두 원인을 나눠 설명한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-5:confession",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "핵심은 악의가 아니라 모호한 표현과 이동시간 오판이었습니다. 제가 그걸 덮으려 한 것도 잘못이죠.",
      "behaviorHint": "고개를 끄덕이며 원인과 자기 방어를 함께 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse10:beat:b:d-5:evidence_hit",
      "caseId": "spouse-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "선물 주문이 이렇게 따로 굴러간 걸 보면, 단순히 늦은 게 아니라 애초에 다른 계획이 돌아간 거네요.",
      "behaviorHint": "자료를 보다가 짧게 헛웃음을 내고 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
} as const;

export default spouse10TellsBeats;

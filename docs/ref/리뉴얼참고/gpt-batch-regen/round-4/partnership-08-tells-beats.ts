export const partnership08TellsBeats = {
  "caseId": "partnership-08",
  "executableTells": {
    "a": [
      {
        "id": "partnership-08:a:tell:threshold_recital",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "현금보유액",
          "리스 조건",
          "버티는 숫자"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "약속을 왜 미뤘는지 묻는 질문에도 현금보유액과 대출 조건을 길게 읊으며 감정적 배신 문제를 뒤로 민다."
      },
      {
        "id": "partnership-08:a:tell:condition_shield",
        "appliesWhen": [
          "cornered",
          "lying",
          "self_protection"
        ],
        "lexicalHooks": [
          "조건부",
          "자동은 아님",
          "발동"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "상대가 '약속했잖아'라고 몰아붙이면 '조건부였지 무조건은 아니었다'며 약속 자체의 무게를 좁힌다."
      },
      {
        "id": "partnership-08:a:tell:precision_burst",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "임대료",
          "리스료",
          "리텐션"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "관계 질문이 나오면 임대료, 리스료, 리텐션 수치를 지나치게 자세히 나열한다."
      }
    ],
    "b": [
      {
        "id": "partnership-08:b:tell:injury_stack",
        "appliesWhen": [
          "lying",
          "hurt",
          "emotional"
        ],
        "lexicalHooks": [
          "5년 동안",
          "회원 증가",
          "브랜드"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "현재 질문을 받으면 지난 5년간 자신이 만든 회원 증가와 브랜드 성과를 길게 쌓아 지금 행동의 정당성을 먼저 만든다."
      },
      {
        "id": "partnership-08:b:tell:betrayal_zoom",
        "appliesWhen": [
          "cornered",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "그 한마디",
          "그날 이후",
          "배신"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "가계약 보류나 한 문장 약속을 크게 확대해 전체 관계가 한순간에 무너진 것처럼 묘사한다."
      },
      {
        "id": "partnership-08:b:tell:moral_pivot",
        "appliesWhen": [
          "emotional",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "살 길",
          "제가 왜",
          "그렇게까지"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "별도 사업 준비를 묻는 질문에는 곧바로 '그렇게까지 내가 대비해야 했던 이유를 보라'며 도덕 프레임으로 방향을 튼다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-08:beat:a:d-1:deny",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "가계약을 접은 게 아닙니다. 현금보유액이 버티는지 보느라 잠깐 멈춘 거예요.",
      "behaviorHint": "시선을 자료 쪽으로 두고 손가락으로 숫자를 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-1:hedge",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "무조건 간다고 한 건 아니었죠. 조건이 맞으면 가자는 흐름이었고, 그 조건이 흔들린 겁니다.",
      "behaviorHint": "짧게 한숨을 내쉰 뒤 '조건'이라는 단어를 또렷하게 끊는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-1:partial",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 보류 통보를 먼저 한 건 맞습니다. 다만 리스료와 보증금이 겹치면 버티기 어렵다고 봤어요.",
      "behaviorHint": "고개를 한번 끄덕이며 일부만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-1:blame",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "최종 미팅 없이 처리한 건 제 실수지만, 누군가는 숫자를 보고 브레이크를 밟아야 했습니다.",
      "behaviorHint": "입술을 굳게 다문 채 어깨를 펴고 버틴다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-1:confession",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 저는 마지막 조율 없이 홀드를 놓았습니다. 조건 문제는 사실이었어도 처리 방식은 제 책임입니다.",
      "behaviorHint": "시선을 잠시 내리고 말끝을 낮춘다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-1:evidence_hit",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 메일은 제가 단독으로 보류를 결정했다는 뜻으로 읽혀도 부인 못 하겠습니다. 그 시점엔 이미 방향을 바꾼 상태였어요.",
      "behaviorHint": "증거를 본 뒤 말 속도가 느려지고 손이 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-08:beat:a:d-3:deny",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "지아 씨를 순수한 피해자라고만 보는 건 틀렸습니다. 이미 다른 판을 같이 보고 있었으니까요.",
      "behaviorHint": "턱을 살짝 들고 반박을 먼저 던진다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-3:hedge",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "서로 어긋난 겁니다. 저만 가해자, 지아 씨만 피해자라고 정리할 일은 아니에요.",
      "behaviorHint": "어조는 낮추지만 핵심 표현은 또렷하게 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-3:partial",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 먼저 기대를 꺾은 건 맞습니다. 그래도 지아 씨도 동시에 백업이 아니라 별도 준비를 만졌어요.",
      "behaviorHint": "인정과 반박을 같은 호흡에 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-3:blame",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "배신자처럼 몰리니까 저도 그 준비 정황을 더 세게 말하게 됐습니다. 제 설명을 지키려던 거죠.",
      "behaviorHint": "입꼬리를 굳히고 시선을 피하지 않는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-3:confession",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "저는 지아 씨의 준비 사실을 제 방패처럼 썼습니다. 순수 피해자 서사가 거짓이라 해도 제 단독 보류 책임이 사라지는 건 아니었습니다.",
      "behaviorHint": "어깨 힘을 빼고 문장을 끊어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-3:evidence_hit",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "그 DM이 나온 이상 '순수한 피해자'라는 말은 흔들립니다. 적어도 그 무렵 다른 출구를 보고 있었다는 정황은 생깁니다.",
      "behaviorHint": "증거를 확인하고 잠시 멈췄다가 말을 잇는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "partnership-08:beat:a:d-5:deny",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "조건이 안 됐는데 무슨 자동 발동입니까. 8천만원 2개월 유지가 먼저였어요.",
      "behaviorHint": "숫자를 바로 꺼내며 감정 질문을 자른다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-5:hedge",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "기념식 분위기와 서면 발동은 다르죠. 감정적으로 가까웠을 뿐 숫자는 아직 아니었습니다.",
      "behaviorHint": "손바닥을 아래로 누르듯 말의 온도를 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-5:partial",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "문서상 미달이었던 건 맞고 그 기준을 근거로 멈췄습니다. 다만 그걸 제때 다시 공유하지 못했어요.",
      "behaviorHint": "자료를 넘기다 멈추고 짧게 시인한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-5:blame",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "지아 씨도 숫자를 끝까지 확인하진 않았습니다. 저만 알고 있듯 굴면서 관계를 더 망친 건 인정하지만요.",
      "behaviorHint": "방어적으로 팔짱을 끼려다 풀어낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-5:confession",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "자동 발동이 아니었다는 사실을 저는 나중에 방패처럼 썼습니다. 숫자는 사실이었어도 말하는 방식은 제 책임입니다.",
      "behaviorHint": "표정이 굳다가 마지막 문장에서 힘을 뺀다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:a:d-5:evidence_hit",
      "caseId": "partnership-08",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "부속메모와 보고서가 같이 나오면 미달 사실 자체는 숨길 수 없습니다. 문제는 제가 그 사실을 언제, 어떻게 말했느냐죠.",
      "behaviorHint": "종이를 한번 정렬한 뒤 더는 숫자를 부정하지 않는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-08:beat:b:d-2:deny",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "따로 스튜디오를 차리려던 게 아니에요. 그냥 제가 무너질 때 대비할 숨통을 찾은 거예요.",
      "behaviorHint": "목소리를 눌렀다가 마지막 단어에서 살짝 떨린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-2:hedge",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 DM 한 장으로 독립 준비라고 단정하는 건 너무 빠르죠. 맥락이 다 잘렸잖아요.",
      "behaviorHint": "질문 끝마다 되묻듯 시선을 올린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-2:partial",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "불안해서 백업처럼 상상한 건 맞아요. 그래도 그때 바로 나가겠다고 확정한 건 아니었어요.",
      "behaviorHint": "자신 쪽 문장을 먼저 길게 깔고 마지막에만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-2:blame",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "시원 씨가 언제든 끊을 수 있다는 불안이 컸어요. 그래서 제가 먼저 도망칠 구멍을 판 겁니다.",
      "behaviorHint": "손끝을 움켜쥐며 방어적인 미소를 지운다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-2:confession",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "네, 저는 별도 스튜디오 준비를 실제로 했습니다. 상처를 이유로 말했지만 회사 밖 판까지 짜고 있었어요. 그건 제 잘못이에요.",
      "behaviorHint": "말하다가 시선을 떨구고 숨을 고른다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-2:evidence_hit",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "법인 초안과 강사 시트가 나오면 그걸 단순 위로라고만은 못 하죠. 이미 준비가 실제 단계였다는 뜻이니까요.",
      "behaviorHint": "증거를 보고 입술을 깨물며 문장을 짧게 끊는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-08:beat:b:d-3:deny",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 일방적으로 약속을 깨진 사람입니다. 그게 이 일의 시작이에요.",
      "behaviorHint": "상처받은 표정을 숨기지 않고 정면을 본다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-3:hedge",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "뭘 준비했다 해도 그건 먼저 끊긴 뒤에 버티려고 본 길이었어요.",
      "behaviorHint": "자기 공로를 짧게 덧붙인 뒤 원인으로 되돌린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-3:partial",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "시원 씨가 마지막에 보류한 건 분명하고, 그래서 제가 무너진 것도 맞아요.",
      "behaviorHint": "고개를 끄덕이며 상처 사실부터 붙든다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-3:blame",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 그렇게까지 대비해야 했던 이유는 보셔야죠. 먼저 흔든 쪽이 있었으니까요.",
      "behaviorHint": "목이 잠긴 채로도 질문 끝을 되묻듯 올린다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-3:confession",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "시원 씨가 상처를 준 건 사실이지만 저도 동시에 다른 길을 준비하고 있었습니다. 순수한 피해자라고만 한 건 사실을 줄인 말이었어요. 그건 제 잘못이에요.",
      "behaviorHint": "말끝에서 힘이 빠지고 손이 무릎 위에 멈춘다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-3:evidence_hit",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "별도 법인 초안까지 나오면 제가 순수한 피해자라고만 버틸 수는 없어요. 그건 저도 이미 다른 출구를 준비했다는 뜻이니까요.",
      "behaviorHint": "증거를 본 뒤 목을 가다듬고 시선을 내린다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-08:beat:b:d-4:deny",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "부속합의는 시원 씨가 먼저 깬 거예요. 저는 그 뒤에 밀려나서 흔들린 거고요.",
      "behaviorHint": "억울함을 앞세워 말을 빠르게 몰아친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-4:hedge",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "그 합의가 살아 있었다면 왜 제게 먼저 묻지 않았겠어요. 적어도 시작점은 시원 씨 쪽이었죠.",
      "behaviorHint": "짧게 웃듯 내뱉고 곧바로 되묻는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-4:partial",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "서면 조건이 남아 있었던 건 맞고, 저도 그 틀 안에서 완전히 안전하게 움직인 건 아니었어요.",
      "behaviorHint": "인정하되 문장 끝을 흐리며 몸을 웅크린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-4:blame",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그래도 저는 밀려난 쪽이었습니다. 따로 준비한 것도 그 압박에서 나온 반응이었어요.",
      "behaviorHint": "가슴 쪽을 짚으며 상처를 근거로 든다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-4:confession",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "네, 부속합의는 시원 씨만이 아니라 저도 깼습니다. 제가 회사 밖 준비를 비밀로 한 순간 같은 틀을 같이 무너뜨렸어요. 그건 제 잘못이에요.",
      "behaviorHint": "말을 멈췄다가 천천히 마지막 문장을 내놓는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-08:beat:b:d-4:evidence_hit",
      "caseId": "partnership-08",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "부속메모가 원본으로 나오면 그 틀을 몰랐다고는 못 하죠. 남은 건 제가 왜 그 틀 밖으로 움직였는지입니다.",
      "behaviorHint": "증거를 보고 손가락을 모으고 자세를 낮춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    }
  ]
} as const;


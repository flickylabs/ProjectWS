export const spouse03TellsBeats = {
  "caseId": "spouse-03",
  "executableTells": {
    "a": [
      {
        "id": "spouse03:a:tell:over_precision",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "일단 결론부터",
          "숫자로 보면",
          "159만 8천원"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "숨긴 지출을 설명할 때 예산표처럼 수치부터 제시하며 세부 금액을 과하게 정밀하게 말한다."
      },
      {
        "id": "spouse03:a:tell:minimization",
        "appliesWhen": [
          "shame",
          "hurt",
          "emotional",
          "lying"
        ],
        "lexicalHooks": [
          "잠깐",
          "며칠만",
          "메꾼 거야"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 행동을 '잠깐 메운 것'처럼 줄여 말해 규모와 규칙 위반의 무게를 낮춘다."
      },
      {
        "id": "spouse03:a:tell:future_offset",
        "appliesWhen": [
          "cornered",
          "defensive",
          "shame",
          "emotional"
        ],
        "lexicalHooks": [
          "다음 급여 들어오면",
          "바로 채울게",
          "정산되면"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "현재 잘못을 추궁받으면 다음 급여와 정산 계획을 먼저 꺼내 책임 시점을 미래로 미룬다."
      }
    ],
    "b": [
      {
        "id": "spouse03:b:tell:joke_shield",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "건조기도 질투하네",
          "웃자고 한 말이지",
          "됐어"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "찔리는 질문이 나오면 농담을 먼저 던져 시간을 벌다가 추궁이 이어지면 갑자기 짧게 끊어 말한다."
      },
      {
        "id": "spouse03:b:tell:commonsense_frame",
        "appliesWhen": [
          "defensive",
          "lying",
          "avoiding",
          "hurt"
        ],
        "lexicalHooks": [
          "이 정도는 다 해",
          "상식적으로",
          "생활 굴리려면"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "자신의 숨긴 결정을 생활 상식과 요령으로 포장하며 여러 이유를 짧게 늘어놓는다."
      },
      {
        "id": "spouse03:b:tell:question_flip",
        "appliesWhen": [
          "cornered",
          "defensive",
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "내가 살림 모르냐",
          "그럼 네 건 뭐였는데",
          "나만 그래"
        ],
        "sentenceShape": "question_end",
        "cadence": "once_every_2_turns",
        "originalPattern": "책임이 자신에게 모이면 곧바로 되묻는 문장으로 주도권을 되찾으려 한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse03:beat:a:d-1:deny",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "일단 결론부터, 그 돈을 빼돌린 것처럼 말하진 말아 주세요. 이직 첫 주에 잠깐 메운 비용이었어요.",
      "behaviorHint": "입술을 다문 채 손가락으로 허공에 금액을 세듯 움직인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-1:hedge",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "159만 8천원 정도였고 전부가 같은 성격의 지출은 아니었어요. 다음 급여 들어오면 바로 채울 생각도 있었고요.",
      "behaviorHint": "정확한 숫자를 말하며 시선을 아래로 떨군다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-1:partial",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "공동 비상금에서 인출한 건 맞아요. 다만 정장, 구두, 정기권이 한꺼번에 겹친 시점이었다는 맥락은 같이 봐 주세요.",
      "behaviorHint": "가방에서 영수증이 있는지 찾듯 손을 더듬는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-1:blame",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 먼저 말하지 못한 건 맞지만, 그때 집안 전체가 이미 현금에 예민했잖아요. 저만 계획 없이 움직인 사람처럼 들리게 하진 말아 주세요.",
      "behaviorHint": "호흡이 짧아지며 문장 끝을 또렷하게 끊는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-1:confession",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 160만원을 상의 없이 뺀 건 제 잘못입니다. 필요 비용이었다 해도 공동 비상금을 혼자 정한 책임은 못 피하겠어요.",
      "behaviorHint": "어깨를 낮추고 메모하듯 작은 목소리로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-1:evidence_hit",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "은행 인출내역까지 나오면 더 부인할 수는 없죠. 인출 자체는 제가 했고, 그래서 더 용도 설명부터 하려 했어요.",
      "behaviorHint": "종이를 한 번 훑어본 뒤 숨을 길게 내쉰다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse03:beat:a:d-3:deny",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "백화점 결제가 다 사치였던 건 아니에요. 필요한 준비를 한 번에 처리한 걸 상호만 보고 단정하신 거예요.",
      "behaviorHint": "입꼬리를 굳힌 채 문장을 차분하게 나눈다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-3:hedge",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "일단 결론부터, 생활용 쇼핑이라기보다 회사 때문에 나간 돈이 많았어요. 세부 내역을 다 말하면 오히려 더 오해할까 싶었고요.",
      "behaviorHint": "손바닥을 펴 보이며 설명을 촘촘히 덧붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-3:partial",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "승인 알림만 보면 사치처럼 보일 수는 있어요. 그래도 실제로는 정장, 구두, 교통 준비비가 섞여 있었어요.",
      "behaviorHint": "머리를 작게 끄덕이며 인정과 반박을 한 문장에 묶는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-3:blame",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 먼저 맥락을 말하지 않은 건 맞지만, 상호만 보고 철없다고 몰아붙인 쪽도 있었잖아요. 그래서 더 입이 닫혔어요.",
      "behaviorHint": "눈가가 굳고 말끝이 점점 빨라진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-3:confession",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "그 결제를 사치성 쇼핑으로 부를 수는 없어요. 하지만 필요한 비용이었더라도 미리 맥락을 말하지 않고 숨긴 건 제 잘못이에요.",
      "behaviorHint": "시선을 잠깐 피했다가 다시 정면을 본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-3:evidence_hit",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "잘린 승인 알림 말고 회사 가이드까지 붙으면 얘기가 달라지죠. 제가 왜 그 결제를 했는지는 그 자료가 더 정확히 말해 줘요.",
      "behaviorHint": "자료를 넘겨보며 목소리가 한 톤 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "spouse03:beat:a:d-5:deny",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "생활비 구멍을 전부 제 쪽 탓으로 돌리는 건 맞지 않아요. 적금 중단이랑 건조기 할부가 더 직접적으로 눌렀다고 봤거든요.",
      "behaviorHint": "손바닥을 아래로 눌러 진정을 요구하듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-5:hedge",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제 인출이 영향이 없었다고는 안 해요. 다만 그때는 인호 씨 조정이 먼저 집을 흔든다고 느꼈어요.",
      "behaviorHint": "한숨을 삼키고 문장을 조심스럽게 골라낸다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-5:partial",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "비상금 인출도 공백을 키운 건 맞아요. 하지만 첫 급여 지연과 적금 중단이 겹치면서 체감이 더 커진 거예요.",
      "behaviorHint": "숫자를 머릿속으로 다시 맞춰 보듯 시선을 흐린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-5:blame",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "결국 둘 다 숨겼다는 건 인정하지만, 당시엔 제 지출만 문제처럼 몰리는 느낌이 너무 강했어요. 그래서 더 방어적으로 굴었고요.",
      "behaviorHint": "말끝마다 짧은 숨을 붙이며 억울함을 드러낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-5:confession",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "생활비 구멍은 한 사람 탓이 아니었어요. 제 160만원 인출과 인호 씨의 자동이체 중단·건조기 할부가 함께 만든 공백이에요.",
      "behaviorHint": "고개를 숙였다가 천천히 들어 올리며 결론을 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:a:d-5:evidence_hit",
      "caseId": "spouse-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "비상금 인출과 적금 정지 기록이 같이 놓이면 저도 더는 한쪽만 말할 수 없어요. 그 공백이 겹쳤다는 건 숫자로도 보이니까요.",
      "behaviorHint": "자료의 날짜를 손끝으로 짚어가며 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse03:beat:b:d-2:deny",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "적금을 없앤 것도 아니고 잠깐 텀 준 거예요. 생활비 숨통 트이게 한 건데 그걸 무슨 큰 숨김처럼 말해요.",
      "behaviorHint": "처음엔 어깨를 으쓱하지만 끝문장은 짧게 잘라낸다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-2:hedge",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "두 달만 멈춘 거고 다시 채울 생각이었다니까요. 제가 살림 모르겠어요, 그냥 버티려고 계산한 거예요.",
      "behaviorHint": "턱을 들고 되묻듯 말한 뒤 입을 굳게 다문다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-2:partial",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "자동이체를 정지한 건 맞아요. 그날 현금이 너무 비어 보여서 먼저 돌려쓴 거죠.",
      "behaviorHint": "손을 비비며 인정하되 시선은 옆으로 흘린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-2:blame",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "건조기 초회금까지 겹치니까 더 급했어요. 말하면 바로 안 된다고 할 것 같아서 제가 먼저 굴린 거고요.",
      "behaviorHint": "의자 끝에 몸을 걸치고 짧은 문장으로 밀어붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-2:confession",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "적금 자동이체를 두 달 멈추고 숨긴 건 제 잘못이에요. 생활비 압박이 이유였어도 같이 정했어야 했어요.",
      "behaviorHint": "헛웃음을 한 번 삼킨 뒤 낮은 톤으로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-2:evidence_hit",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "은행 기록이랑 메모까지 나오면 말 더 길게 못 하죠. 멈춘 것도 저고, 다시 채울 생각이었다는 것도 저예요.",
      "behaviorHint": "자료를 보자마자 농담을 접고 짧게 답한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse03:beat:b:d-4:deny",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "건조기도 질투하네요, 그건 집 굴리려고 한 선택이에요. 규칙 깨려고 일부러 한 건 아니라고요.",
      "behaviorHint": "웃어 넘기려다 마지막 문장은 급히 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-4:hedge",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "50만원은 넘었어도 빨래 시간 줄이는 게 바로 이득이잖아요. 이 정도는 다들 생활 편의 때문에 빨리 정해요.",
      "behaviorHint": "손가락을 접어가며 이유를 늘어놓는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-4:partial",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "상의 없이 할부를 잡은 건 맞아요. 그래도 그때는 그게 제일 현실적인 선택처럼 보였어요.",
      "behaviorHint": "고개를 작게 끄덕이며 인정의 폭을 제한한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-4:blame",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "적금 정지까지 묶어서 보면 제가 더 나빠 보이겠죠. 그런데 그때 집이 굴러가게 하려면 누군가는 빨리 정해야 했어요.",
      "behaviorHint": "어깨를 굳히고 눈썹을 치켜세운다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-4:confession",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "건조기 할부와 적금 조정을 먼저 상의하지 않은 건 규칙 위반이에요. 생활 편의라는 이유로 제가 예외를 만든 거죠.",
      "behaviorHint": "입술을 깨물었다가 짧게 사과한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-4:evidence_hit",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "배송 문자까지 붙으면 더 웃고 넘길 건 아니죠. 제가 그걸 계획 안에서 묶어 처리한 건 맞아요.",
      "behaviorHint": "무릎 위 손이 멈추고 시선이 바닥으로 떨어진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "spouse03:beat:b:d-5:deny",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "생활비 구멍이 왜 전부 제 조정 탓이에요. 솔직히 그땐 유진 쪽 결제가 더 크게 보였어요.",
      "behaviorHint": "웃음기 없이 바로 반박하며 상체를 앞으로 숙인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-5:hedge",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제 조정이 영향 없었다고는 안 해요. 그래도 시작은 유진 지출이라고 느껴져서 저부터 몰리는 게 억울했죠.",
      "behaviorHint": "혀끝을 차고 짧게 문장을 나눠 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-5:partial",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "적금 중단과 건조기 할부도 구멍을 키운 건 맞아요. 다만 첫 급여일이 밀리면서 더 크게 터져 보인 거예요.",
      "behaviorHint": "손등으로 턱을 문지르며 시선을 피한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-5:blame",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "결국 둘 다 숨겼다는 점에선 제 탓도 절반이에요. 그런데 그때는 제가 가장 노릇 못 한 사람처럼 보일까 너무 버텼어요.",
      "behaviorHint": "목소리가 낮아지지만 마지막 문장은 세게 내뱉는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-5:confession",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "생활비 공백은 제 조정과 유진의 인출이 겹친 결과였어요. 한 사람 탓으로 몰던 태도부터 제가 거둬야 해요.",
      "behaviorHint": "양손을 무릎 위에 올리고 더는 되받아치지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse03:beat:b:d-5:evidence_hit",
      "caseId": "spouse-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "비상금 내역이랑 자동이체 기록이 같이 뜨면 한쪽만 말할 수 없죠. 그 주간에 구멍이 양쪽에서 났다는 건 저도 알아요.",
      "behaviorHint": "자료 사이를 번갈아 보며 목소리를 낮춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    }
  ]
} as const;

export default spouse03TellsBeats;

export const family01TellsBeats = {
  "caseId": "family-01",
  "executableTells": {
    "a": [
      {
        "id": "sacrifice_rollcall",
        "appliesWhen": [
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "병원 접수",
          "장보기",
          "목욕",
          "약 챙김",
          "제가 다"
        ],
        "sentenceShape": "enumeration",
        "cadence": "every_turn",
        "originalPattern": "불리한 송금 질문이 나오면 자신이 한 병원 접수, 식사 준비, 목욕 도움을 한 호흡에 열거해 쟁점을 희생 경쟁으로 바꾼다."
      },
      {
        "id": "tear_brake",
        "appliesWhen": [
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "저 아니었으면",
          "무너졌을 거예요",
          "제가 안 했으면",
          "누가 했겠어요",
          "버텼습니다"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "목소리가 갈라질 듯 멈칫하며 '내가 안 했으면 누가 했겠어'를 반복해 판정 자체를 잔인한 일처럼 만든다."
      },
      {
        "id": "echo_blame",
        "appliesWhen": [
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "그러면",
          "그럼",
          "어떻게 했겠어요",
          "누가 했겠어요",
          "제 동생은"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "requiresSecondSentence": true,
        "originalPattern": "상대 비난을 끝말처럼 되받아치며 '그럼 네가 했어?'라고 반문해 질문의 초점을 흐린다."
      }
    ],
    "b": [
      {
        "id": "receipt_stack",
        "appliesWhen": [
          "lying",
          "avoiding"
        ],
        "lexicalHooks": [
          "기준으로",
          "기록상",
          "시점",
          "금액으로",
          "날짜를 보면"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "numericGranularity": "exact_amount_or_minute",
        "originalPattern": "공격받으면 날짜와 금액을 연달아 읊으며 감정 질문을 계산 문제로 바꾼다."
      },
      {
        "id": "clipped_denial",
        "appliesWhen": [
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "그건 아니고",
          "정확히는",
          "엄밀히 말하면",
          "늦은 겁니다",
          "전액은 아닙니다"
        ],
        "cadence": "every_turn",
        "originalPattern": "불리한 약속 위반은 '그건 아니야', '정확히는 미뤘어'처럼 짧게 잘라 축소한다."
      },
      {
        "id": "dry_sarcasm",
        "appliesWhen": [
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "저는 몸만",
          "통장도 없고",
          "몸뚱이만",
          "숫자로만",
          "그러니까 저는"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "억울함이 커지면 '나는 통장도 없고 몸만 있지' 같은 마른 빈정거림이 섞인다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "재판관님, 아버지 관리계좌에서 돈이 움직였다고 해서 저를 곧장 탐욕스러운 사람처럼 세우면 너무 억울합니다. 병원 접수부터 어머니 식사 챙김까지 제가 붙든 자리를 빼고 그 이체만 보면 그림이 틀어집니다.",
      "behaviorHint": "손가락으로 해온 일을 하나씩 세다가, 마지막 문장에서만 목이 살짝 잠긴다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "1,800만원이 제 계좌로 들어온 건 부정하지 않겠습니다. 다만 그걸 제 살림만 챙긴 선이체로 잘라 버리면, 그 무렵 아버지와 어머니 일이 한꺼번에 무너지던 상황은 전부 빠집니다.",
      "behaviorHint": "첫 문장은 곧게 말하고, 두 번째 문장부터 희생 서사를 길게 붙인다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 그 1,800만원을 제가 먼저 옮긴 건 맞습니다. 카드대금과 보험료를 막은 것도 사실이지만, 그 시기에 어머니 간병이 겹쳐 있었으니 그 돈을 순수한 사적 인출로만 읽진 말아 주십시오.",
      "behaviorHint": "금액을 인정한 뒤 곧바로 어머니 간병 장면을 덧붙이며 억울함을 되살린다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제 동생은 1,800만원 숫자만 들이밀지만, 제가 병원 접수하고 목욕 보조하고 밤을 메운 시간은 계산에서 빼버립니다. 그 공백을 전부 제 욕심으로만 부르면, 도현이 편한 쪽으로만 진실이 정리됩니다.",
      "behaviorHint": "증거를 보다가 곧바로 '제 동생' 쪽으로 시선을 돌리며 말끝을 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 원본 거래내역까지 나오면, 네, 제 계좌로 먼저 들어온 건 숨길 수 없습니다. 그래도 그 돈이 왜 그런 식으로 움직였는지까지 탐욕 한 단어로 덮을 순 없었습니다.",
      "behaviorHint": "입금 시각 앞에서 말이 잠깐 멈추고, 두 번째 문장에서 급하게 자기 사정을 덧댄다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-1"
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "재판관님, 제가 아버지 관리계좌에서 1,800만원을 제 계좌로 먼저 옮긴 건 사실입니다. 그 돈으로 제 카드대금과 보험료를 막은 뒤 나중에 간병비처럼 정리해 보려 했고, 돌봄을 떠안은 장녀라는 명분으로 그 경계를 제 마음대로 넘었습니다.",
      "behaviorHint": "정확한 금액은 또렷하게 말하지만, '장녀라는 명분'에서 고개가 천천히 숙어진다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "재판관님, 아버지 수첩의 그 한 줄을 무슨 유산 욕심의 증거처럼만 보시면 저는 너무 억울합니다. 그동안 아버지 서류랑 어머니 병원 일을 누가 붙들고 있었는지도 같이 보셔야 합니다.",
      "behaviorHint": "수첩 문구를 짚으며 말하다가, '누가 붙들고 있었는지'에서 희생 목록이 이어질 듯 숨을 고른다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "'집 일은 서아가 맡아'가 유언장 문구처럼 딱 잘린 표현은 아니라는 건 압니다. 그래도 그 말을 제가 맡아온 역할과 완전히 떼어 놓으라는 건, 제 시간을 통째로 지우라는 말처럼 들렸습니다.",
      "behaviorHint": "한 줄 메모를 눈으로 더듬다가 마지막 문장에서 감정이 먼저 올라온다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "상속 지정으로 법적으로 완성된 문장은 아니라는 건 인정합니다. 하지만 아버지가 세금이랑 병원 서류를 제게 맡기던 시간까지 없던 일처럼 만들 수는 없어서, 저는 그 한 줄을 제 자리의 표시처럼 붙들었습니다.",
      "behaviorHint": "'인정합니다'는 짧게 말하고, 이후엔 붙들어 온 시간을 길게 늘어놓는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제 동생은 늘 그 한 줄만 떼서 제가 욕심낸 것처럼 말합니다. 그런데 아버지와 어머니 일은 저한테 맡겨 놓고, 그 흔적까지 다 지운 채 제가 과장했다고만 하면 너무 편한 결론 아닙니까.",
      "behaviorHint": "눈가에 힘이 들어가고, '제 동생'과 '너무 편한 결론'에서 말끝이 단단해진다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "그 잘린 사진만 보면 상속처럼 보일 수 있다는 건 압니다. 그래도 그 한 줄 앞뒤를 다 보기 전까지, 제가 왜 그 말을 그렇게 붙들었는지까지 탐욕으로 단정하진 말아 주십시오.",
      "behaviorHint": "사진을 보는 손끝이 잠깐 멈추고, 두 번째 문장에서만 간신히 감정을 누른다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "재판관님, 아버지 수첩의 '집 일은 서아가 맡아'는 상속 지정이 아니었습니다. 당시 세금과 병원 서류를 맡기겠다는 맥락이었는데, 저는 그 말을 제가 해온 돌봄과 뒤섞어 재산 권한처럼 붙들었습니다. 제 자리가 사라질까 무서워서 그 한 줄을 제 쪽으로 과장한 겁니다.",
      "behaviorHint": "처음엔 또렷하게 바로잡다가, '제 자리가 사라질까'에서만 눈가가 흔들린다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "공유표 기준이 있었다고 해서 저를 곧장 규칙 파괴자로만 부르면 너무 가혹합니다. 50만원 넘는 돈을 남기지 못한 제 잘못과, 제가 실제로 붙들고 있던 돌봄 부담은 분리해서 봐주셔야 합니다.",
      "behaviorHint": "고개를 끄덕여 기준 존재는 받되, 곧장 억울함이 섞인 설명으로 넘어간다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공유표 원칙은 기억하고 있습니다. 다만 병원, 장보기, 어머니 약 챙김이 한꺼번에 몰릴 때는 기록보다 급한 일부터 막아야 한다고 느꼈고, 그게 결국 제 판단을 흐렸습니다.",
      "behaviorHint": "첫 문장은 절차적으로 답하고, 두 번째 문장에서 희생 장면을 길게 덧씌운다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "결국 공유표 원칙을 저도 어긴 건 맞습니다. 1,800만원을 먼저 옮기고 남기지 않았으니까요. 그래도 제 동생까지 완벽히 지킨 사람처럼 놓고 저만 규칙 밖에 세우는 건 또 다른 왜곡입니다.",
      "behaviorHint": "자기 잘못은 짧게 인정하고, 곧바로 형평성 문제를 끌어와 숨을 고른다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "왜 저만 규칙을 깬 사람처럼 남겨 두십니까. 제 동생도 약값이랑 보호사 비용 기록을 뒤늦게 올렸는데, 저를 몰아세우는 순간 그건 다 '작은 실수'가 돼 버리잖아요.",
      "behaviorHint": "손바닥을 위로 펴 보이며 되받아치고, 마지막 단어를 억눌러 묻는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "그 계좌 원본까지 나오면, 네, 제가 공유표에 남기지 않은 채 먼저 움직인 건 숨길 수 없겠습니다. 그래도 그 순간의 저에겐 기록보다 어머니 곁이 먼저였다는 말까지 거짓으로 만들 수는 없습니다.",
      "behaviorHint": "원본 내역 앞에서 한 번 숨이 막히고, 두 번째 문장에서 다시 희생 서사를 붙인다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-1"
    },
    {
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "공유표 원칙은 저희 둘 다 어겼지만, 먼저 그리고 더 크게 무너뜨린 쪽은 저였습니다. 저는 1,800만원 선이체를 숨겼고, 돌봄을 떠안았다는 명분으로 규칙 밖에 서도 된다고 착각했습니다. 인정받고 싶다는 마음으로 제 동생의 늦은 기록만 붙들고 버틴 것도 사실입니다.",
      "behaviorHint": "첫 문장부터 책임을 받아들이되, '인정받고 싶다'에서 입술이 떨리듯 멈춘다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "재판관님, 첫 주 60만원 건은 미납이라기보다 지급 시점이 뒤로 밀린 쪽에 가깝습니다. 야간 교대 1회도 완전 공백으로 보긴 어렵고, 기록상 제 직접 결제 내역도 남아 있습니다.",
      "behaviorHint": "금액과 횟수를 먼저 세고, 감정 표현은 최대한 잘라낸다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "60만원이 제때 안 들어간 건 인정하겠습니다. 다만 그걸 곧바로 '아무것도 안 한 동생'으로 연결하는 건 과합니다. 기준으로 보면 지연과 공백은 있었지만, 동시에 제가 직접 낸 약값과 이동도 존재했습니다.",
      "behaviorHint": "처음엔 짧게 인정하고, 이후엔 기준·기록이라는 말로 범위를 정리한다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "60만원이 12일 늦었고 야간 교대도 한 번 비운 건 사실입니다. 그렇지만 같은 기간 약값을 직접 낸 기록까지 지워 버리면, 제 책임 범위가 실제보다 더 넓어집니다.",
      "behaviorHint": "사실을 빠르게 두 개 나열한 뒤, 마지막만 조금 낮은 목소리로 바로잡는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제 누나는 빈칸 하나를 전체 방치처럼 말합니다. 그런데 기록으로 보면 저는 늦었지, 사라진 건 아닙니다. 제가 만든 지연 책임까지 부정하진 않겠지만, 희생 서사 때문에 숫자까지 다 지워지게 둘 수는 없습니다.",
      "behaviorHint": "표를 짚어가며 말하다가 '늦었지, 사라진 건 아닙니다'에서만 단호하게 잘라 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "그 원본 스케줄표가 나오면 60만원 12일 지연은 더는 줄여 말할 수 없습니다. 그래도 그 안에는 제가 직접 결제한 약값과 이동시간도 같이 찍혀 있다는 점은 같이 봐주셔야 합니다.",
      "behaviorHint": "첫 문장은 수긍하듯 짧게 내고, 두 번째 문장에선 표의 다른 칸을 손끝으로 짚는다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "첫 주 야간 보호사 비용 60만원을 제가 12일 늦게 낸 건 사실입니다. 야간 교대도 한 차례 비웠고, 그 공백 부담이 제 누나에게 간 것도 인정합니다. 약값을 직접 낸 기록이 있어도 그 지연 책임까지 없어지는 건 아닙니다.",
      "behaviorHint": "날짜와 금액을 또렷하게 읊은 뒤, 마지막 문장에서만 목소리가 조금 내려간다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "퇴원 직후 첫 달 예상비용은 당시 계산으로 210만원 수준이었습니다. 그 시점 기준으로는 사비와 현금 투입 말고 다른 대안이 보이지 않았고, 나중 기준으로 절차를 들이대는 건 정확하지 않습니다.",
      "behaviorHint": "숫자를 먼저 놓고, 감정 대신 '당시 기준'을 반복하며 선을 긋는다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "경감 절차가 있었을 가능성은 부정하지 않겠습니다. 다만 그때 저는 첫 달 비용을 당장 마련해야 한다고 봤고, 그 판단 위에서 움직였습니다. 결과적으로 제가 안내를 놓쳤을 수는 있어도, 압박 자체가 과장이었던 건 아닙니다.",
      "behaviorHint": "문장마다 기준선을 다시 세우듯 끊어 말하고, 마지막만 낮게 정리한다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "첫 달 비용을 전액 사비로만 막아야 했다는 제 판단은 틀렸을 수 있습니다. 그래도 그 시점에 제가 비용 압박을 실제로 크게 느꼈던 것까지 거짓은 아니었습니다.",
      "behaviorHint": "잘못 가능성은 짧게 인정하고, 두 번째 문장에 체감과 판단을 분리해 놓는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제 누나만 성급했다고 몰아가기엔 저도 절차 확인을 끝까지 하지 못했습니다. 그런데 반대로, 그 부담이 전부 없었던 것처럼 나중 서류만 들이대는 것도 정확한 복원은 아닙니다.",
      "behaviorHint": "책임을 반쯤 받다가도, '정확한 복원'에서 다시 절차 언어로 방어선을 세운다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "그 사회복지사 기록이 나오면, 네, 첫 달 210만원 전액을 형제 사비로 막아야 했다는 제 계산은 무너집니다. 다만 그때 제가 어머니 퇴원 직후 비용 공포에 매달려 있었다는 사실까지 사라지는 건 아닙니다.",
      "behaviorHint": "서류 하단 숫자를 읽듯 말하다가, '비용 공포'에서만 숨이 한 번 거칠어진다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-6"
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "첫 달 간병비를 형제 사비로만 감당해야 했던 건 아니었습니다. 퇴원 전 경감 신청과 단기돌봄 연계 절차가 있었는데, 제가 그걸 끝까지 확인하지 못했습니다. 그래서 제 누나만 성급했다고 말할 수 없고, 절차를 놓친 제 책임도 분명합니다.",
      "behaviorHint": "객관식 정답을 읽듯 정리하다가, 마지막 문장에서만 말끝이 무거워진다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "50만원 이상 지출과 아버지 관리계좌 사용은 공유표에 먼저 남기기로 했습니다. 기준으로 보면 1,800만원 선이체가 핵심 위반이고, 제 늦은 기록을 같은 선으로 놓는 건 비율상 맞지 않습니다.",
      "behaviorHint": "숫자와 기준부터 제시하고, 평가는 최대한 비율 문제로 환원한다.",
      "applicableStates": [
        "S0",
        "S1"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저도 공유표 원칙을 완전히 지켰다고 말하진 않겠습니다. 다만 약값과 야간보호사 비용 기록을 늦게 올린 것과 1,800만원 선이체 은닉은 성격과 규모가 다릅니다.",
      "behaviorHint": "짧게 한 발 물러난 뒤, 곧바로 '성격'과 '규모'를 분리해 세운다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "결론적으로 저도 공유표 원칙을 어긴 건 맞습니다. 약값과 보호사 비용 기록을 뒤늦게 올렸으니까요. 그렇지만 제가 규칙 안쪽에 있었던 것처럼 말한 적은 있어도, 1,800만원 은닉과 동일하다고는 보지 않습니다.",
      "behaviorHint": "인정과 선긋기를 같은 호흡에 이어 붙이며 눈을 떼지 않는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제 누나는 '둘 다 어겼다'는 말로 무게를 평평하게 만듭니다. 그런데 기록으로 보면 시작점도 규모도 다릅니다. 제가 체면 때문에 제 위반을 작게 말한 건 맞아도, 같은 칸에 그대로 눕히는 건 계산이 틀립니다.",
      "behaviorHint": "표를 넘기듯 손을 움직이며, '시작점'과 '규모'를 또렷하게 끊는다.",
      "applicableStates": [
        "S2",
        "S3"
      ]
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "그 공유표 원본이 나오면 제가 기록을 늦게 올린 건 더는 깎아 말할 수 없습니다. 그래도 그 표에 찍힌 건 지연 기록이지, 1,800만원 같은 선이체 은닉과 같은 층의 숨김은 아닙니다.",
      "behaviorHint": "첫 문장은 단호하게 수긍하고, 두 번째 문장에선 표의 행을 구분하듯 손을 내린다.",
      "applicableStates": [
        "S0",
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "공유표 원칙은 저희 둘 다 어겼습니다. 제 누나는 1,800만원 선이체를 숨겼고, 저는 약값과 야간보호사 비용 기록을 늦게 올렸습니다. 규모 차이를 붙들며 제가 규칙 안쪽에 있었던 것처럼 말한 건 제 체면 보호였습니다.",
      "behaviorHint": "사실을 순서대로 열거하다가, 마지막 '체면 보호'에서만 짧게 자조가 섞인다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    }
  ]
} as const;

export default family01TellsBeats;

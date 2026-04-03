export const friend05TellsBeats = {
  "caseId": "friend-05",
  "executableTells": {
    "a": [
      {
        "id": "friend05:a:tell:receipt_fan",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "48만원",
          "이체내역",
          "여기 보세요",
          "숫자"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 질문이 나오면 이체내역 캡처를 여러 장 넘기며 숫자 자체로 결론이 끝났다는 듯 말한다."
      },
      {
        "id": "friend05:a:tell:moral_cut",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "지금 안 갚은 건",
          "그건 다른 얘기",
          "본질",
          "지금 문제"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "상대가 과거 맥락을 꺼내면 '지금 안 갚은 건 안 갚은 거잖아'라고 도덕 판단으로 쟁점을 잘라낸다."
      },
      {
        "id": "friend05:a:tell:short_breath",
        "appliesWhen": [
          "emotional",
          "hurt",
          "cornered"
        ],
        "lexicalHooks": [
          "아니",
          "됐고",
          "지금",
          "끊자"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "분노가 올라오면 숨이 짧아지고 문장 끝을 세게 끊어 말한다."
      }
    ],
    "b": [
      {
        "id": "friend05:b:tell:archive_shuffle",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "잠깐만",
          "그때 캡처",
          "파일",
          "순서가"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "곤란한 질문이 나오면 오래된 캡처와 사진을 찾느라 말을 끊고, 자료를 찾는 동안 직접 답을 미룬다."
      },
      {
        "id": "friend05:b:tell:offset_murmur",
        "appliesWhen": [
          "cornered",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "계산상",
          "남는 돈",
          "빼면",
          "원래"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "'계산상 남는 돈이 있었잖아'라는 말을 낮게 반복하며 명시적 합의의 부재를 흐린다."
      },
      {
        "id": "friend05:b:tell:delay_nod",
        "appliesWhen": [
          "avoiding",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "맞아",
          "근데",
          "다만",
          "그때는"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "먼저 고개를 끄덕여 수긍하는 듯 보인 뒤, 잠시 뜸을 들이고 조건을 덧붙여 답을 바꾼다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "몇 장 보여준 걸 가지고 제가 무슨 사람 하나 매장하려 든 것처럼 말하지 마세요. 지금 안 갚은 장면이 있었으니까 그걸 보낸 거예요.",
      "behaviorHint": "휴대폰 화면을 재빨리 넘기다 말고 마지막 문장을 세게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend05:beat:a:d-2:deny"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "단체방이랑 스토리에 올린 건 맞아요. 그런데 그때는 답이 없어서 현재 장면부터 보여준 거예요.",
      "behaviorHint": "시선을 피했다가 다시 올리며 '현재'라는 단어에 힘을 준다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend05:beat:a:d-2:hedge"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 현재 48만원 장면만 먼저 보이게 한 건 맞아요. 그때는 제가 당한 쪽처럼 느껴져서 그 맥락만 붙잡았어요.",
      "behaviorHint": "한 번 숨을 들이쉰 뒤 고개를 작게 끄덕인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend05:beat:a:d-2:partial"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "근데 제가 그렇게까지 간 건 태오 씨가 계속 말 안 하고 미뤘기 때문이기도 해요. 혼자 만든 그림은 아니죠.",
      "behaviorHint": "손바닥을 위로 펴 보이며 책임을 상대 쪽으로 돌린다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "id": "friend05:beat:a:d-2:blame"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "맞아요. 저는 더 큰 과거 채무를 빼고 현재 48만원만 보여 줬어요. 친구들 앞에서라도 제가 완전히 바보는 아니라는 확인을 받고 싶었어요.",
      "behaviorHint": "짧게 웃듯 숨을 내쉬고 휴대폰을 내려놓는다.",
      "applicableStates": [
        "S5"
      ],
      "id": "friend05:beat:a:d-2:confession"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "...단체방이랑 스토리 시간까지 다 붙었네요. 여기까지 나오면 '잠깐 보여준 것뿐'이라고는 못 하겠어요.",
      "behaviorHint": "증거 화면을 한 번 더 확대해 보다가 입술을 깨문다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "afterEvidence": "e-6",
      "id": "friend05:beat:a:d-2:evidence_hit"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "186만원은요, 그때그때 갚은 거랑 제가 해준 일들까지 보면 사실상 끝난 돈이에요. 지금 와서 그걸 그대로 빚이라고 다시 세우는 건 너무 편한 계산이죠.",
      "behaviorHint": "금액부터 먼저 말하고 손가락으로 순서를 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend05:beat:a:d-3:deny"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "정확히 액수까지는 지금 바로 못 말하겠어요. 그래도 체감상 거의 정리된 분위기였던 건 맞아요.",
      "behaviorHint": "말끝을 흐리면서도 '거의'라는 표현을 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend05:beat:a:d-3:hedge"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "대납이랑 현금 상환이 있었던 건 인정해요. 다만 저는 그 뒤에 서로 주고받은 도움까지 묶이면 끝난 쪽에 가깝다고 느꼈어요.",
      "behaviorHint": "처음엔 단호하다가 마지막 문장에서 목소리가 조금 낮아진다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend05:beat:a:d-3:partial"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "시트를 끝까지 다시 쓰자고 먼저 말하지 않은 건 태오 씨도 마찬가지였잖아요. 저만 일부러 숨긴 것처럼 말하면 그건 또 다른 잘라내기예요.",
      "behaviorHint": "의자 등받이에서 몸을 떼며 빠르게 반박한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "id": "friend05:beat:a:d-3:blame"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "맞아요. 186만원은 끝난 돈이 아니었어요. 제가 꽃장식이랑 호의를 마음대로 상환처럼 계산하면서, 아직 큰돈을 남긴 사람이라는 사실을 피했어요.",
      "behaviorHint": "두 손을 모았다가 천천히 풀며 시선을 아래로 내린다.",
      "applicableStates": [
        "S5"
      ],
      "id": "friend05:beat:a:d-3:confession"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "잔액 칸이 그대로 남아 있네요... 여기까지 남아 있으면 '끝난 분위기'라는 말로는 버티기 어렵죠.",
      "behaviorHint": "시트의 남은 금액 칸에서 손가락이 멈춘다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "afterEvidence": "e-4",
      "id": "friend05:beat:a:d-3:evidence_hit"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "규칙을 깼다고요? 저는 지금 피해를 말한 거예요. 상계는 합의 후라는 선을 먼저 넘은 건 그쪽이잖아요.",
      "behaviorHint": "상체를 앞으로 기울이며 마지막 문장을 짧게 자른다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend05:beat:a:d-5:deny"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "급해서 먼저 말한 건 맞아요. 그렇다고 제가 규칙 자체를 무시하려고 한 건 아니에요.",
      "behaviorHint": "손으로 선을 긋듯 허공을 가르며 변명의 범위를 좁힌다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend05:beat:a:d-5:hedge"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "현재 피해만 퍼뜨린 건 인정해요. 그런데 그때는 적어도 제가 왜 화가 났는지 누군가는 알아야 한다고 생각했어요.",
      "behaviorHint": "잠시 입술을 깨물고 난 뒤 인정과 해명을 붙여 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend05:beat:a:d-5:partial"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "그래도 태오 씨가 조용히 빼고 끝내려 한 게 없었다면 여기까지 안 왔어요. 저만 규칙 위반자로 남는 건 또 이상하죠.",
      "behaviorHint": "한 손으로 책상을 두드리고 바로 손을 거둔다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "id": "friend05:beat:a:d-5:blame"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "네, 저도 규칙을 반만 썼어요. 친구들 앞에서 먼저 피해자 자리를 잡고 싶어서 현재 장면만 퍼뜨렸어요.",
      "behaviorHint": "결론부터 말한 뒤 숨을 짧게 내쉬며 고개를 떨군다.",
      "applicableStates": [
        "S5"
      ],
      "id": "friend05:beat:a:d-5:confession"
    },
    {
      "caseId": "friend-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "단체방이랑 스토리 보관본까지 같이 나오면, 제가 '확인만 구했다'는 말도 많이 약해지네요.",
      "behaviorHint": "잠깐 말을 멈추고 화면을 끈다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "afterEvidence": "e-6",
      "id": "friend05:beat:a:d-5:evidence_hit"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "48만원 받은 건 맞아요. 그걸 바로 '안 갚는 사람'으로 닫아 버리면, 앞에 남아 있던 정산 맥락이 너무 사라져서요.",
      "behaviorHint": "고개를 한 번 끄덕인 뒤 서류 순서를 더듬는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend05:beat:b:d-1:deny"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "다음 월급 주간에 갚겠다고 한 것도 맞고요... 근데 그 주간을 넘긴 뒤에 바로 뭐라고 말해야 할지 못 정했어요.",
      "behaviorHint": "문장 중간에 멈춰 오래된 대화창을 찾는 척한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend05:beat:b:d-1:hedge"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "별도 송금 못 한 건 맞아요. 저는 그걸 부정한 게 아니라, 예전 남은 돈이 계속 걸려서 현재 말을 더 늦췄어요.",
      "behaviorHint": "처음엔 수긍하듯 끄덕이다가 이유를 덧붙인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend05:beat:b:d-1:partial"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 잘했다는 건 아니에요. 그런데 현재 장면만 퍼지니까 제가 습관적으로 떼먹는 사람처럼 굳는 것도 너무 빨랐어요.",
      "behaviorHint": "목소리를 낮춘 채 '너무 빨랐어요'에서만 힘을 준다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "id": "friend05:beat:b:d-1:blame"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "맞아요. 현재 48만원은 먼저 따로 갚았어야 했어요. 관계를 덜 상하게 하겠다는 말로 제 책임을 뒤로 미뤘어요.",
      "behaviorHint": "두 손을 모은 채 시선을 고정하지 못한다.",
      "applicableStates": [
        "S5"
      ],
      "id": "friend05:beat:b:d-1:confession"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "송금이랑 약속 메시지가 이렇게 바로 붙어 있으면, 제가 기한을 몰랐다고는 못 하겠네요.",
      "behaviorHint": "휴대폰을 내려다보며 말끝이 점점 작아진다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "afterEvidence": "e-2",
      "id": "friend05:beat:b:d-1:evidence_hit"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "무단 상계라고까지 부르면 좀 세요. 저는 원래 남아 있던 돈 안에서 계산하면 되는 줄 알고 있었어요.",
      "behaviorHint": "숫자를 먼저 낮게 읊조리고 잠시 뜸을 들인다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend05:beat:b:d-4:deny"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "말을 안 한 건 맞아요. 다만 예전 돈을 다시 꺼내는 방식이 더 상처가 클까 봐, 혼자 정리하는 쪽으로 기울었던 거예요.",
      "behaviorHint": "고개를 끄덕였다가 마지막 문장에서 눈을 피한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend05:beat:b:d-4:hedge"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "하린한테 먼저 말한 것도, 현재 48만원을 예전 잔액에서 빼면 된다고 적어 둔 것도 맞아요. 그걸 먼저 직접 못 말한 게 제 문제죠.",
      "behaviorHint": "메모 화면을 넘기며 두 번째 문장부터 속도가 느려진다.",
      "applicableStates": [
        "S2",
        "S4"
      ],
      "id": "friend05:beat:b:d-4:partial"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그래도 서윤 씨가 현재 장면만 퍼뜨리지 않았다면, 저도 이렇게까지 숨어서 계산하지 않았을 거예요. 잘못의 방향이 달랐던 거지, 맥락이 완전히 없는 건 아니잖아요.",
      "behaviorHint": "변명처럼 들릴까 조심하며 문장 끝을 질문형에 가깝게 흐린다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "id": "friend05:beat:b:d-4:blame"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "맞아요. 상계는 서로 동의해야 하는데 저는 개인 계산표로 끝내려 했어요. 관계를 지킨다는 말은 그냥 대면을 피한 핑계였어요.",
      "behaviorHint": "길게 숨을 내쉰 뒤 손에 든 휴대폰을 뒤집어 놓는다.",
      "applicableStates": [
        "S5"
      ],
      "id": "friend05:beat:b:d-4:confession"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "메모앱이랑 하린한테 보낸 말이 같이 나오면, 이건 제 머릿속에서 이미 상계가 끝나 있던 거네요.",
      "behaviorHint": "말을 멈추고 메모 작성 시각을 한 번 더 확인한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "afterEvidence": "e-5",
      "id": "friend05:beat:b:d-4:evidence_hit"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "규칙을 몰랐던 건 아니에요. 이걸 완전히 새 건으로 적으면 친구 관계가 장부처럼 굳을까 봐, 예전 흐름 안에서 보려 했어요.",
      "behaviorHint": "규칙 문구를 보지 않고도 기억하듯 낮게 읊는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "friend05:beat:b:d-5:deny"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "즉시 기록 안 한 건 맞지만, 싸움을 키우고 싶지 않아서 그랬어요. 규칙을 없애려던 건 아니고요.",
      "behaviorHint": "수긍의 고개짓 다음에 조건을 덧붙인다.",
      "applicableStates": [
        "S1"
      ],
      "id": "friend05:beat:b:d-5:hedge"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "상계는 합의 후라는 문구를 알면서도 혼자 계산한 건 인정해요. 대신 서윤 씨도 현재 피해만 퍼뜨려 규칙 균형을 깼다는 생각은 여전히 있어요.",
      "behaviorHint": "책임을 인정하는 대목에서는 작게, 뒤의 문장에서는 더 또렷하게 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "friend05:beat:b:d-5:partial"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "저만 규칙을 깬 사람으로 남으면 또 절반만 본 거잖아요. 서로 규칙을 알고도 각자 편한 쪽으로 쓴 면이 있었어요.",
      "behaviorHint": "상대를 바로 쏘아보지 않고 테이블 가운데를 보며 말한다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "id": "friend05:beat:b:d-5:blame"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "맞아요. 저도 규칙을 반만 지켰어요. 알면서 기록을 미뤘고, 합의 없이 현재 돈을 예전 돈과 섞었어요.",
      "behaviorHint": "마지막 단어마다 간격을 두며 천천히 말한다.",
      "applicableStates": [
        "S5"
      ],
      "id": "friend05:beat:b:d-5:confession"
    },
    {
      "caseId": "friend-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "시트 문구가 이렇게 남아 있으면, '말만 못 꺼냈다'는 변명은 거의 못 하겠네요. 규칙은 알고 있었어요.",
      "behaviorHint": "시트 캡처에서 '상계는 합의 후' 문구를 오래 바라본다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "afterEvidence": "e-4",
      "id": "friend05:beat:b:d-5:evidence_hit"
    }
  ]
}

export const friend07TellsBeats = {
  "caseId": "friend-07",
  "executableTells": {
    "a": [
      {
        "id": "friend07:a:tell:timeline_stitch",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "그날",
          "전날 밤",
          "그다음",
          "시각상"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리한 질문이 나오면 시각과 요일을 연속으로 읊으며 핵심 책임보다 흐름 재구성에 몰입한다."
      },
      {
        "id": "friend07:a:tell:term_freeze",
        "appliesWhen": [
          "cornered",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "전달",
          "폭로는 아니고",
          "비교",
          "편집은 아니고"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "'전달'과 '폭로', '비교'와 '편집' 같은 단어 차이를 붙잡아 행위의 수위를 낮추려 한다."
      },
      {
        "id": "friend07:a:tell:quiet_cutoff",
        "appliesWhen": [
          "emotional",
          "hurt",
          "cornered"
        ],
        "lexicalHooks": [
          "됐고요",
          "아니요",
          "그건 아니죠",
          "딱 그거예요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "감정이 올라오면 목소리를 낮춘 채 문장을 아주 짧게 끊어 상대 답변을 중간에서 잘라 버린다."
      }
    ],
    "b": [
      {
        "id": "friend07:b:tell:pressure_preface",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그때는 다들 예민했고",
          "분위기가",
          "압박이",
          "한꺼번에"
        ],
        "sentenceShape": "enumeration",
        "cadence": "every_turn",
        "originalPattern": "질문을 받으면 먼저 '그때는 다들 예민했고'라고 압박 상황을 설명해 자신의 선택이 불가피했다는 프레임을 만든다."
      },
      {
        "id": "friend07:b:tell:intent_shield",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame"
        ],
        "lexicalHooks": [
          "망치려던 게 아니고",
          "숨기려던 건 아니고",
          "타이밍을",
          "의도는"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "비밀 은닉을 묻으면 '숨기려던 게 아니라 타이밍을 못 잡은 거야'라고 의도를 먼저 꺼낸다."
      },
      {
        "id": "friend07:b:tell:wounded_pause",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "하...",
          "솔직히",
          "그건 좀",
          "상처였어요"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "억울함을 강조할 때 말을 멈추고 한숨을 길게 쉰 뒤 상처받은 표정으로 문장을 잇는다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "friend07:beat:a:d-2:deny",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 이미지는 없는 말을 만든 조작은 아니에요. 대화 흐름을 한 장으로 정리한 거죠.",
      "behaviorHint": "손가락으로 순서를 짚듯 공중에 선을 그린다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend07:beat:a:d-2:hedge",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "'폭로'는 아니고요, 전달이었어요. 확인이 필요하다고 본 사람들한테 보낸 겁니다.",
      "behaviorHint": "‘폭로’와 ‘전달’ 단어를 또렷하게 끊어 발음한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend07:beat:a:d-2:partial",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 서로 다른 시점 메시지를 붙인 건 맞아요. 그래야 성호가 저를 어떻게 썼는지 한눈에 보였으니까요.",
      "behaviorHint": "인정은 하되 표정은 굳힌 채 시선을 정면으로 고정한다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend07:beat:a:d-2:blame",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "양소라에서 끝냈으면 또 묻혔을 겁니다. 먼저 선을 넘은 건 성호였고, 저는 도망칠 구멍을 막으려 했어요.",
      "behaviorHint": "문장 앞부분은 건조하게, 마지막 문장은 날카롭게 누른다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend07:beat:a:d-2:confession",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "맞아요. 저는 그 캡처가 더 나쁘게 보이게 한다는 걸 알고도 보냈습니다. 사실 확인만으로는 제 분이 안 풀렸어요.",
      "behaviorHint": "목소리를 낮추고 마지막 문장만 짧게 끊는다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "friend07:beat:a:d-2:evidence_hit",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "진아가 양소라와 운영진에게 보낸 편집 캡처하고 진아-성호 원본 메신저 export를 붙여 보면 제가 순서를 바꾼 건 부정 못 하겠네요. 대신 그때 왜 그렇게까지 몰렸는지도 같이 봐 주세요.",
      "behaviorHint": "원본을 보는 순간 잠깐 말이 멎었다가 변명보다 이유를 먼저 꺼낸다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "friend07:beat:a:d-3:deny",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "선발 직전 비밀 연애를 숨긴 사람이면 특혜 의심은 당연한 거 아닌가요. 저는 그 구조를 말한 겁니다.",
      "behaviorHint": "시간 순서를 먼저 읊고 결론을 뒤에 붙인다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend07:beat:a:d-3:hedge",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "정확히는 '특혜였을 수 있다'는 취지였어요. 신고도 안 된 상태면 누가 봐도 공정성은 흔들리죠.",
      "behaviorHint": "‘확정’ 대신 ‘취지’, ‘정황’을 반복한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend07:beat:a:d-3:partial",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 캡처가 제 판단을 세게 밀어 올린 건 맞아요. 성호가 이득 계산을 하는 사람처럼 보였으니까요.",
      "behaviorHint": "인정하면서도 상대 이름을 부를 때만 힘이 들어간다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend07:beat:a:d-3:blame",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "점수표를 보기 전까지는 그렇게 의심할 이유가 충분했어요. 숨긴 쪽이 먼저 공정성을 무너뜨린 거니까요.",
      "behaviorHint": "증거를 받아든 뒤에도 완전히 물러서지 않고 책임 논점으로 옮긴다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend07:beat:a:d-3:confession",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "리더 선발 자체가 연애 특혜였다고는 끝내 입증 못 했습니다. 그 부분을 사실처럼 밀어붙인 건 제 과장이었어요.",
      "behaviorHint": "한 박자 쉬고 시선을 내린다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "friend07:beat:a:d-3:evidence_hit",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "부회장 제외 로그가 나오면 특혜 단정은 접어야죠. 대신 제가 왜 거기까지 갔는지는 지워지지 않습니다.",
      "behaviorHint": "자료를 확인한 뒤 입술을 눌러 다문다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "friend07:beat:a:d-4:deny",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "합의가 있었다고 해도 먼저 무너뜨린 건 성호 쪽이었어요. 저는 이미 깨진 규칙의 파편을 밖으로 보여 준 쪽에 가깝습니다.",
      "behaviorHint": "합의 문구를 짚으며도 자기 책임 부분은 빠르게 넘긴다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend07:beat:a:d-4:hedge",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "그 합의는 지정 운영진 공동 고지가 전제될 때 의미가 있죠. 저는 그 전제가 이미 무너졌다고 봤습니다.",
      "behaviorHint": "‘전제’라는 단어를 두 번 되풀이한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend07:beat:a:d-4:partial",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 노션 문구와 확인 이모지까지 다 기억해요. 그래서 더 창피하지만, 그때는 성호가 그 규칙을 안 지킬 거라고 봤어요.",
      "behaviorHint": "인정 뒤에 짧은 한숨을 붙인다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend07:beat:a:d-4:blame",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 지정 경로를 건너뛴 건 맞습니다. 하지만 조용히 그 길만 밟으면 결국 또 제가 비밀 보관자로 남을 상황이었어요.",
      "behaviorHint": "차갑게 말하다가 마지막 문장만 감정이 묻어난다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend07:beat:a:d-4:confession",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "결국 저도 합의를 깼습니다. 성호가 먼저 어겼다는 사실이 제 확산 책임을 없애 주진 않아요.",
      "behaviorHint": "문장을 짧게 끊고 더 이상의 수식 없이 끝낸다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "friend07:beat:a:d-4:evidence_hit",
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "작년 소문 사태 뒤 작성한 제한 공개 합의 노션을 다시 보면 빠져나갈 구멍이 없네요. 지정 운영진 1명, 그 조항을 알면서도 저는 다른 길을 택했습니다.",
      "behaviorHint": "노션 문구를 보고 눈을 피한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "friend07:beat:b:d-1:deny",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그때는 다들 예민했고 일정도 뒤엉켜 있었어요. 저는 잠깐 상황 설명을 부탁한 거지, 알리바이를 짠 건 아닙니다.",
      "behaviorHint": "먼저 분위기와 압박을 길게 깔고 핵심 문장은 짧게 흐린다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend07:beat:b:d-1:hedge",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 말을 세게 쓴 건 인정해요. 그래도 '거짓말해 줘'가 아니라 '대신 설명 좀 해 줘'에 더 가까웠어요.",
      "behaviorHint": "같은 의미의 표현을 바꿔 반복한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend07:beat:b:d-1:partial",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "원본에 그 문구가 남아 있으면 부정 못 하죠. 저는 그냥 그날만 넘기면 될 줄 알고 진아한테 기대 버렸습니다.",
      "behaviorHint": "시선이 흔들리다가 마지막에 작게 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend07:beat:b:d-1:blame",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "맞아요, 저는 다른 동선에 있었어요. 하지만 진아를 함정에 빠뜨리려던 게 아니라, 들키면 다 무너질 것 같아서 순간적으로 매달린 겁니다.",
      "behaviorHint": "억울함을 섞되 '의도는 아니었다'를 힘줘 반복한다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend07:beat:b:d-1:confession",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "결과적으로 저는 진아를 친구보다 방패처럼 썼어요. 그건 일정 정리가 아니라 사실상 알리바이 요청이었습니다.",
      "behaviorHint": "한숨을 길게 쉰 뒤 마지막 문장을 거의 속삭인다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "friend07:beat:b:d-1:evidence_hit",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "연습 스케줄 변경표와 택시 영수증까지 붙으면 제가 빠져나갈 말은 없네요. 진아가 그 시간을 메우는 동안 저는 제 일부터 숨기고 있었습니다.",
      "behaviorHint": "자료를 보다가 말을 멈추고 목을 축인다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "friend07:beat:b:d-4:deny",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 합의가 아주 빡빡한 규칙처럼 작동하진 않았어요. 저는 영영 숨기려던 게 아니라 공개 타이밍을 못 잡은 거예요.",
      "behaviorHint": "합의의 무게를 줄여 말하며 손바닥을 아래로 누른다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend07:beat:b:d-4:hedge",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "결국 둘 다 원칙을 지키지 못한 건 맞잖아요. 저는 통제를 못 했고, 진아는 밖으로 번지게 했고요.",
      "behaviorHint": "양쪽을 병렬로 나열하며 균등 책임처럼 들리게 만든다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend07:beat:b:d-4:partial",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 그 문서를 제가 확인한 것도 맞습니다. 그래서 더 창피하지만 선발 직전엔 그 규칙을 밟을 용기가 없었어요.",
      "behaviorHint": "문서 기억을 인정하며 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend07:beat:b:d-4:blame",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 먼저 흔든 건 맞아요. 그래도 진아도 여러 채널로 퍼뜨리면서 우리 둘 다 그 약속을 끝내 복구하지 못했습니다.",
      "behaviorHint": "자기 인정 뒤 곧바로 상대 행동을 병치한다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend07:beat:b:d-4:confession",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "관계도, 자리도, 친구도 다 놓치기 싫어서 더 비겁해졌습니다. 그렇게 다 붙잡으려다 합의를 제가 먼저 깨 버렸어요.",
      "behaviorHint": "어깨가 내려앉고 문장 사이에 긴 쉼이 들어간다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "friend07:beat:b:d-4:evidence_hit",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "제한 공개 합의 노션을 보면 제가 모른 척할 수는 없네요. 그 조항을 알면서도 진아를 먼저 찾았다는 게 제일 크죠.",
      "behaviorHint": "합의 문서를 보며 고개를 천천히 젓는다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "friend07:beat:b:d-5:deny",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 운영진에 아예 아무 말도 안 한 건 아니에요. 기록이 바로 안 잡힌다고 해서 고지가 없었다고 단정하긴 어렵습니다.",
      "behaviorHint": "신고와 고지의 개념을 일부러 넓게 섞어 말한다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "friend07:beat:b:d-5:hedge",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "정식 양식 전이었을 뿐, 곧 정리해 말할 흐름은 있었어요. 그래서 '이미 얘기했다'는 표현도 완전히 허공의 말은 아니었습니다.",
      "behaviorHint": "말끝을 흐리며 여지를 남긴다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "friend07:beat:b:d-5:partial",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "합의 규칙을 알았고, 선발 전에 절차를 끝냈다고 말하긴 어렵습니다. 그냥 스스로 '곧 할 거니까 된 거다'라고 합리화했어요.",
      "behaviorHint": "억지로 웃다가 금방 표정을 거둔다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "friend07:beat:b:d-5:blame",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "기록이 늦게 남은 건 맞지만 저는 일이 터진 뒤라도 맞추려 했습니다. 숨기려던 것보다 수습하려던 쪽이었어요. 진아 쪽도 지정 경로를 건너뛰고 여러 채널로 먼저 퍼뜨렸잖아요.",
      "behaviorHint": "사후 정리를 선의처럼 포장하며 양손을 모은다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "friend07:beat:b:d-5:confession",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저는 아직 안 한 고지를 이미 된 일처럼 말했습니다. 선발이랑 이미지가 무너지지 않게 보이게 하려고요.",
      "behaviorHint": "목이 잠긴 채 '이미'라는 단어에서 잠깐 멈춘다.",
      "applicableStates": [
        "S4",
        "S5"
      ]
    },
    {
      "id": "friend07:beat:b:d-5:evidence_hit",
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "연합공연제 리더 선발 점수표 타임스탬프가 나오면 더는 못 버티죠. 실제 신고는 뒤였고, 저는 시간을 앞당겨 말했습니다.",
      "behaviorHint": "기록 화면을 보자마자 어깨가 굳는다.",
      "applicableStates": [
        "S3",
        "S5"
      ],
      "afterEvidence": "e-4"
    }
  ]
}

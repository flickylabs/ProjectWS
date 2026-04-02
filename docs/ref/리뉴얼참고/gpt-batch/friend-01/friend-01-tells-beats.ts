export const friend01TellsBeats = {
  "caseId": "friend-01",
  "executableTells": {
    "a": [
      {
        "id": "tell:a:tell:number_buffering",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "정확히는",
          "일단 숫자로 보면",
          "9만2천, 아니 92,000원"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "곤란한 질문이 나오면 숫자를 세분해 본질보다 계산 자체를 붙든다."
      },
      {
        "id": "tell:a:tell:scope_shift",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "lying"
        ],
        "lexicalHooks": [
          "그건 합쳐서 봐야 해",
          "여행 전체로 보면",
          "항목 하나만 떼면"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "개별 지출을 묻으면 범위를 넓혀 현재 질문을 큰 흐름 속에 묻어버린다."
      },
      {
        "id": "tell:a:tell:late_disclosure",
        "appliesWhen": [
          "avoiding",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "그리고 하나 더",
          "아, 그건 뒤에 말하려던 건데",
          "마지막으로 말하면"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "핵심 사정을 바로 말하지 않고 대화 끝무렵에 덧붙여 이미 지나간 얘기처럼 만든다."
      }
    ],
    "b": [
      {
        "id": "tell:b:tell:screenshot_tapping",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "여기 캡처 보이죠",
          "이 화면 그대로",
          "이거부터 보세요"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "캡처 화면을 손가락으로 두드리며 이미 결론이 끝났다는 듯 말한다."
      },
      {
        "id": "tell:b:tell:motive_leap",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "그러니까 일부러",
          "결국 숨길 생각이었네",
          "처음부터 그 의도였던 거잖아"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "행동 설명을 듣기도 전에 의도를 먼저 단정한다."
      },
      {
        "id": "tell:b:tell:pressure_loop",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame"
        ],
        "lexicalHooks": [
          "질문 돌리지 말고",
          "그럼 보증금은 왜",
          "그 얘기 전에 이거부터"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "자신의 공개 저격을 추궁받으면 상대의 숨긴 행동을 반복 소환해 질문을 되돌린다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "friend01:beat:a:d-1:deny",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "보증금 건은 아직 따로 떼어 말할 숫자가 아니었어. 체크아웃 직후엔 변수가 있어서 전체 정산으로 봐야 해.",
      "behaviorHint": "시선을 아래로 두고 손가락으로 허공에 숫자를 정리하듯 세어 본다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-1:hedge",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "92,000원이 들어온 건 맞는데 그걸 따로 띄우면 택시비랑 어긋나. 그래서 같이 맞추려던 거야.",
      "behaviorHint": "금액을 정정하듯 한 번 더 반복하고 문장 끝을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-1:partial",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "내 계좌로 받은 건 인정해. 다만 숨기려기보다 한 번에 정리하려고 했어.",
      "behaviorHint": "짧게 인정한 뒤 바로 설명을 덧붙이며 몸을 뒤로 뺀다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-1:blame",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "설명하려는 순간마다 중간 캡처 얘기부터 나오니까 더 꼬였어. 항목 하나만 들이밀면 맥락이 사라져.",
      "behaviorHint": "어깨를 움츠린 채 손바닥을 펴 보이며 억울함을 섞는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-1:confession",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "내가 먼저 말했어야 했어. 상계는 내 혼자 판단할 일이 아니었고, 그게 제일 잘못이야.",
      "behaviorHint": "한 박자 쉬고 시선을 들었다가 곧바로 다시 내린다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-1:evidence_hit",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "은행 기록까지 나오면 부정할 건 없어. 환급을 받은 건 맞고, 바로 공유 안 한 것도 맞아.",
      "behaviorHint": "입술을 눌러 다문 뒤 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "friend01:beat:a:d-3:deny",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "18만4천? 그건 중간 화면이야. 정확히는 아직 환급도 취소도 안 들어간 숫자였어.",
      "behaviorHint": "숫자를 다시 읽어주듯 빠르게 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-3:hedge",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "보여준 숫자가 그렇게 읽힌 건 알아. 그런데 여행 전체 배분이 끝나기 전 화면이면 과소비 결론은 보류해야 해.",
      "behaviorHint": "손으로 큰 원을 그리며 '전체'라는 말을 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-3:partial",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "중간 화면이 부풀려졌다는 건 원본 보면 확인돼. 다만 내 7만원 차용금까지 같이 섞여 보인 건 내가 설명을 늦춘 탓도 있어.",
      "behaviorHint": "앞문장은 단단하게 말하고 뒷문장에서 속도를 낮춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-3:blame",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "하린이 그 캡처를 최종처럼 돌리지만 않았어도 과소비 프레임은 이렇게 커지지 않았어.",
      "behaviorHint": "손끝으로 보이지 않는 화면을 밀어내듯 제스처한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-3:confession",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "최종 차액은 2만2천원 수준이 맞아. 그래도 차용금은 별도였는데 내가 그 선을 흐렸어.",
      "behaviorHint": "숫자를 먼저 말한 뒤 낮은 목소리로 책임 문장을 덧붙인다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-3:evidence_hit",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "CSV랑 취소 내역이 같이 나오면 18만4천이 최종이 아니라는 건 설명돼. 그다음 남는 건 내 차용금 문제지.",
      "behaviorHint": "버티던 자세를 풀고 증거 화면 쪽으로 턱을 한번 끄덕인다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "friend01:beat:a:d-4:deny",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "택시비 7만원은 미반환이라기보다 보증금 들어오면 맞춰질 금액이었어.",
      "behaviorHint": "짧게 말한 뒤 이어질 설명을 머릿속에서 정리하는 듯 멈춘다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-4:hedge",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "내 몫이 남아 있던 건 맞는데, 그날은 승인 취소까지 겹쳐서 한 번에 정리하려 했어.",
      "behaviorHint": "말끝마다 '정리'를 반복하며 직접 미반환이라는 단어를 피한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-4:partial",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "메모도 있고 7만원이 내 몫인 것도 맞아. 문제는 내가 상계를 먼저 말해도 되는 줄 안 거야.",
      "behaviorHint": "고개를 끄덕이며 인정하지만 손은 꼭 쥔 채 놓지 않는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-4:blame",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "관계를 덜 각박하게 끝내려 한 건데 그게 오히려 책임 회피처럼 보였어. 전체 정산이 꼬인 것도 사실이고.",
      "behaviorHint": "쓴웃음을 짓고 문장 끝에서 잠깐 숨을 고른다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-4:confession",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "7만원은 내가 먼저 보내야 했어. 좋게 넘기자는 말로 미룬 건 결국 회피였지.",
      "behaviorHint": "마지막 문장에서 목소리가 작아지고 어깨가 내려앉는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:a:d-4:evidence_hit",
      "caseId": "friend-01",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "영수증이랑 메모가 같이 나오면 따로 변명할 수는 없어. 차용금이 남은 건 명확해.",
      "behaviorHint": "메모 언급에서 잠깐 눈을 피했다가 체념하듯 인정한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "friend01:beat:b:d-2:deny",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "이름 직접 쓴 적 없어요. 답답해서 올린 거지 공개적으로 못 박으려던 건 아니었어요.",
      "behaviorHint": "휴대폰 화면을 잡은 손이 살짝 들썩이며 방어적으로 웃는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-2:hedge",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "캡처를 보낸 건 맞는데 그때 화면상으론 제가 18만4천원을 떠안을 수도 있었어요. 그래서 확인받고 싶었던 거예요.",
      "behaviorHint": "같은 단어를 두 번 반복해 정당성을 밀어붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-2:partial",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "원본 전에 보낸 건 인정해요. 스토리도 도윤을 떠올리게 한 건 맞는데, 그때는 숨긴 게 너무 많아 보였어요.",
      "behaviorHint": "앞부분은 단호하게 인정하고 뒷부분에서 속도를 높인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-2:blame",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 먼저 세게 반응한 건 맞죠. 그런데 도윤이 환급이랑 택시 얘기 바로 했으면 이런 식으로 안 갔어요.",
      "behaviorHint": "책임을 인정하면서도 손가락 끝은 상대를 향한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-2:confession",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "중간 캡처랑 스토리로 압박한 건 제 책임이에요. 이름 안 썼다는 말로 빠져나갈 수 있는 수준은 아니었어요.",
      "behaviorHint": "문장 사이사이 짧게 숨을 쉬며 감정이 내려가는 걸 스스로 붙든다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-2:evidence_hit",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "스토리 보관본까지 나오면 부인 못 해요. 친한친구라도 그 문구면 누굴 말하는지 다 알죠.",
      "behaviorHint": "증거를 보다가 잠깐 입술을 깨물고 시선을 옆으로 돌린다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "friend01:beat:b:d-3:deny",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "제가 본 건 18만4천원 화면이었어요. 그 숫자를 기준으로 화난 건 당연한 반응이었죠.",
      "behaviorHint": "캡처 화면을 손가락으로 톡 치며 시작한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-3:hedge",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "원본 보기 전까진 그 화면이 사실상 전부였어요. 다만 지금 보면 최종처럼 말한 건 너무 빨랐던 것 같아요.",
      "behaviorHint": "강하게 말하다가 중간에서 속도를 늦춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-3:partial",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "CSV 보니까 자동분배 전 숫자였더라고요. 그래서 과소비 단정은 거둬야 맞아요.",
      "behaviorHint": "증거를 확인한 뒤 짧고 단단하게 결론을 수정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-3:blame",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "그래도 제가 그 숫자를 믿게 만든 건 도윤 쪽 침묵이었어요. 환급과 차용 얘기가 안 보였으니까요.",
      "behaviorHint": "인정 문장 뒤에 바로 원인을 붙여 압박을 되돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-3:confession",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "과소비라고 몰아간 건 틀렸어요. 최종 차액은 2만2천원 수준이고, 남는 건 7만원 차용이죠.",
      "behaviorHint": "한 번 멈췄다가 숫자를 또렷하게 읽고 마지막 문장을 낮게 누른다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-3:evidence_hit",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 로그랑 취소 내역이 같이 붙으면 제가 붙잡은 숫자가 중간값이었다는 건 인정할 수밖에 없어요.",
      "behaviorHint": "캡처를 내려놓고 두 손을 모은 채 문장을 짧게 끊는다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "friend01:beat:b:d-5:deny",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "약속을 먼저 깬 건 도윤 쪽이라고 봤어요. 저는 보여준 거지, 없는 얘길 퍼뜨린 건 아니라고 생각했어요.",
      "behaviorHint": "공격받는 느낌이 들면 말끝이 빨라지고 고개가 앞으로 나온다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-5:hedge",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "원본 전에 보낸 건 맞아요. 그래도 그땐 도윤이 이미 설명을 숨긴 뒤라 제 공유가 전부 잘못 같진 않았어요.",
      "behaviorHint": "자기 책임을 인정하면서도 바로 비교 문장을 덧붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-5:partial",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제 쪽도 약속을 건드린 건 인정해요. 친한친구라 괜찮다고 본 판단이 틀렸죠.",
      "behaviorHint": "짧게 수긍하고는 입술을 다물어 다음 반격을 눌러 참는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-5:blame",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "저만 문제였던 건 아니에요. 도윤도 김수아에게 상계 얘기 먼저 흘렸잖아요.",
      "behaviorHint": "질문을 되돌리듯 마지막을 올려 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-5:confession",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "양쪽 다 규칙을 깼지만, 공개성 때문에 제 쪽 파장이 더 컸어요. 삭제와 정정까지 제가 해야죠.",
      "behaviorHint": "처음엔 날카롭다가 마지막 문장에서 힘이 빠진다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "friend01:beat:b:d-5:evidence_hit",
      "caseId": "friend-01",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "스토리 원본이랑 친한친구 목록까지 나오면 '그냥 감정글'이라고 버틸 수는 없어요.",
      "behaviorHint": "핸드폰을 내려놓고 한숨을 짧게 내쉰다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-5"
    }
  ]
}

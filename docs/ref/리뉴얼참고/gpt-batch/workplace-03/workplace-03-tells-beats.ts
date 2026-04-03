export const workplace03TellsBeats = {
  "caseId": "workplace-03",
  "executableTells": {
    "a": [
      {
        "id": "workplace-03:a:tell:hurt_first_frame",
        "appliesWhen": [
          "lying",
          "emotional",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "저도 사람이에요",
          "제가 더 상처받았어요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "사실 여부를 묻기 전에 '난 이미 충분히 상처받았다'며 피해자 위치를 먼저 점한다."
      },
      {
        "id": "workplace-03:a:tell:half_laugh_soften",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그 정도로까지",
          "웃으면서 말씀드리지만"
        ],
        "sentenceShape": "question_end",
        "cadence": "once_every_2_turns",
        "originalPattern": "난감한 질문이 나오면 짧게 웃고 '그 정도로까지 받아들일 줄은'이라며 발언 강도를 줄인다."
      },
      {
        "id": "workplace-03:a:tell:we_all_were_drunk",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "다들 취해 있었잖아요",
          "그 자리 분위기"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "구체적 표현 대신 '다들 취해 있었잖아'라고 집단 상황으로 책임을 희석한다."
      }
    ],
    "b": [
      {
        "id": "workplace-03:b:tell:timestamp_stack",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "7시 42분",
          "전달 순서대로"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "핵심 인정 대신 캡처 시간과 전달 순서를 길게 읊어 사실 판단을 늦춘다."
      },
      {
        "id": "workplace-03:b:tell:definition_narrowing",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "확인하려던 겁니다",
          "퍼뜨린 건 아닙니다"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "'퍼뜨린 건 아니고 확인하려던 것'처럼 단어 정의를 좁혀 책임 범위를 잘라낸다."
      },
      {
        "id": "workplace-03:b:tell:flat_voice_push",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "사실관계만 보시죠",
          "결론은 하나입니다"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "감정이 올라올수록 오히려 더 낮고 평평한 목소리로 단정적인 결론을 말한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-03:beat:a:d-1:deny",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저도 사람이에요. 제가 더 상처받았어요, 다들 취해 있었잖아요. 그 자리 분위기에서 희주 씨를 깎아내린 말을 한 적은 없어요.",
      "behaviorHint": "숨을 길게 들이마시고 가슴 쪽을 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-1:hedge",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "저는 웃으면서 말씀드리지만, 그 정도로까지 받아들일 줄은 몰랐어요. 다들 취해 있었잖아요, 그 자리 분위기에서 말이 거칠어진 건 있어도 비방 의도는 아니었어요.",
      "behaviorHint": "짧게 헛웃음을 흘리고 시선을 옆으로 뺀다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-1:partial",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "웃으면서 말씀드리지만, 제가 HJ라는 표현을 쓴 건 맞아요. 다만 그 자리 분위기에서 다들 취해 있었잖아요, 희주 씨를 공개적으로 깎아내리려던 건 아니었어요.",
      "behaviorHint": "입술을 깨물고 손가락으로 테이블을 한 번 두드린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-1:blame",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "저도 사람이에요. 제가 표현을 거칠게 한 건 맞아요. 다만 웃으면서 말씀드리지만, 그 정도로까지 잘라 퍼뜨린 희주 씨 쪽도 일을 키운 책임이 있어요.",
      "behaviorHint": "어깨를 움츠리다가 끝 문장에서 상대를 짧게 바라본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-1:confession",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 그 자리에서 위험한 평판 발언을 했어요. 웃으면서 말씀드리지만 같은 말로 그 정도로까지 넘길 일이 아니었고, 저도 사람이에요라고 먼저 피해를 내세운 것까지 제 잘못이에요.",
      "behaviorHint": "고개를 숙였다가 마지막 문장에서 천천히 들어 올린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-1:evidence_hit",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 자리 분위기 앞부분과 좌석 정보까지 나오면 더는 부정할 수 없어요. 다들 취해 있었잖아요라고 그 정도로까지 넘기기엔 제가 HJ를 입에 올린 사실이 남아요.",
      "behaviorHint": "말끝이 짧아지고 손을 무릎 위로 모은다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-4:deny",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저도 사람이에요. 제가 더 상처받았어요, 그 정도로까지 몰릴 일은 아니고 희주 씨 해명도 듣기 전에 HR에 불이익성 메모를 넣거나 발표에서 뺀 적은 없어요.",
      "behaviorHint": "억울하다는 듯 손바닥을 위로 펼친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-4:hedge",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "저는 웃으면서 말씀드리지만, 그 정도로까지 보실 일은 아니에요. 그 자리 분위기 이후 리허설 구성을 다시 본 건 맞아도 희주 씨를 배제하려던 건 아니었어요.",
      "behaviorHint": "난처하게 미소 짓고 말을 천천히 늘인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-4:partial",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 HR에 상황을 먼저 알린 건 맞아요. 다만 저도 사람이에요, 관리자 평판이 흔들리는 상황이라 그 정도로까지 생각 못 했고 다들 취해 있었잖아요라는 분위기 탓에 웃으면서 말씀드리듯 급히 움직였어요.",
      "behaviorHint": "턱을 만지며 변명하듯 숨을 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-4:blame",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "저도 사람이에요. 제가 선제 조치를 한 건 맞아요. 다만 웃으면서 말씀드리지만, 그 정도로까지 번진 데에는 희주 씨 쪽도 단정 DM으로 팀 전체를 흔든 책임이 있어요.",
      "behaviorHint": "의자 등받이에 기대었다가 마지막 문장에서 몸을 앞으로 숙인다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-4:confession",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 희주 씨 해명을 듣기 전에 HR에 평판 리스크 메모를 남기고 발표 배정을 바꿨어요. 저도 사람이에요라는 핑계로 그 정도로까지 끌고 갔고, 다들 취해 있었잖아요 같은 말로 돌린 것까지 제 책임이에요.",
      "behaviorHint": "양손을 맞잡고 한 박자 쉬었다가 또렷하게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-4:evidence_hit",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "HR 입력 시각과 배정 변경 기록까지 나오면 더는 부인할 수 없어요. 웃으면서 말씀드리지만, 그 정도로까지 가기 전에 다들 취해 있었잖아요 같은 핑계로 제가 먼저 움직였다는 사실이 남아요.",
      "behaviorHint": "입꼬리가 굳고 눈을 내리깐다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-5:deny",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "다들 취해 있었잖아요. 제가 더 상처받았어요, 그 정도로까지 보실 일은 아니고 정식 정정 전에 희주 씨를 겨냥해 소문전에 가담한 적은 없어요.",
      "behaviorHint": "한숨을 쉬며 고개를 젓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-5:hedge",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저도 사람이에요. 그 정도로까지 볼 일은 아니고, 제가 팀 명예 얘기를 하긴 했어도 그 자리 분위기를 수습하려던 말이었어요.",
      "behaviorHint": "손끝으로 넥타이를 고치며 말을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-5:partial",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "웃으면서 말씀드리지만, 제가 '어제 일로 팀 명예가 흔들렸다'고 말한 건 맞아요. 다만 다들 취해 있었잖아요, 그 자리 분위기에서 희주 씨를 찍어 소문내려던 의도는 아니었어요.",
      "behaviorHint": "시선을 피했다가 마지막 문장에서 재판관을 본다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-5:blame",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 암시를 남긴 건 맞아요. 다만 웃으면서 말씀드리지만, 그 정도로까지 번진 데에는 희주 씨 쪽도 멘토방과 동료들에게 단정 메시지를 돌린 책임이 있고 그 자리 분위기를 더 흔들었어요.",
      "behaviorHint": "짧게 웃다가 금세 표정을 굳힌다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-5:confession",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 공식 정정 전에 팀 회의에서 희주 씨를 떠올리게 하는 말을 했어요. 저도 사람이에요라고 먼저 방어했고, 웃으면서 말씀드리지만 그 자리 분위기에 기대 소문전에 가담한 건 제 잘못이에요.",
      "behaviorHint": "어깨를 떨구고 고개를 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:a:d-5:evidence_hit",
      "caseId": "workplace-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "회의 직후 반응과 DM 흐름이 같이 붙으면 부정할 수 없어요. 다들 취해 있었잖아요라는 말로 그 정도로까지 덮기엔, 그 자리 분위기 속에서 제가 남긴 암시가 너무 선명해요.",
      "behaviorHint": "입술이 말라 보일 만큼 입을 다문 뒤 짧게 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-2:deny",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "사실관계만 보시죠. 전달 순서대로 보셔도 결론은 하나입니다, 저는 '팀장이 제 채용 배경을 씹었다'고 단정해 퍼뜨린 적 없습니다.",
      "behaviorHint": "턱을 들고 메모를 보는 듯 허공을 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-2:hedge",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "저는 퍼뜨린 건 아닙니다. 7시 42분 메시지는 확인하려던 겁니다, 사실관계만 보시죠, 멘토방에 물은 수준이었습니다.",
      "behaviorHint": "건조한 표정으로 손가락 두 개를 접어 보이며 범위를 좁힌다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-2:partial",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "전달 순서대로 보면 제가 몇 사람에게 보낸 건 맞습니다. 다만 확인하려던 겁니다, 퍼뜨린 건 아닙니다라고 생각했고 당시엔 제 얘기로 믿었습니다.",
      "behaviorHint": "문장마다 짧게 끊어 말하고 손을 모은다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-2:blame",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "사실관계만 보시죠. 제가 단정 표현을 쓴 건 맞지만, 강도윤 씨 쪽도 회식 발언과 다음 날 암시로 이미 의심을 키웠습니다. 전달 순서대로 봐도 결론은 하나입니다.",
      "behaviorHint": "표정 변화 없이 상대 쪽으로 시선만 돌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-2:confession",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "7시 42분부터 전달 순서대로 제가 멘토방과 동료 둘에게 단정 메시지를 보냈습니다. 확인하려던 겁니다라고 좁혀 말한 것도 제 잘못입니다.",
      "behaviorHint": "숨을 한 번 참고 또박또박 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-2:evidence_hit",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "원본 대화와 수신 시각을 전달 순서대로 대조하면 부정할 수 없습니다. 퍼뜨린 건 아닙니다라고 버티기엔, 사실관계만 보시죠, 제 메시지 수위가 이미 단정이었습니다.",
      "behaviorHint": "시선을 내리지 않은 채 입술만 굳힌다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-3:deny",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "사실관계만 보시죠. 결론은 하나입니다, 그 HJ가 다른 사람이라는 설명은 맞지 않습니다. 전달 순서대로 본 정황상 저는 제 이야기로 들을 수밖에 없었습니다.",
      "behaviorHint": "차분한 목소리로 문장 끝을 단단히 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-3:hedge",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "저는 전달 순서대로 보면 단정이 조금 빨랐을 수는 있다고 봅니다. 하지만 사실관계만 보시죠, 19초 클립과 최근 전배 맥락상 확인하려던 겁니다라고만 보긴 어렵습니다.",
      "behaviorHint": "말수는 적지만 단어마다 힘을 준다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-3:partial",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 제 이야기라고 강하게 받아들인 건 맞습니다. 다만 사실관계만 보시죠, 전달 순서대로 그때는 HJ가 외부 후보 약어라는 자료를 못 봤고 결론은 하나입니다라고 스스로 서둘렀습니다.",
      "behaviorHint": "메모를 펴 보듯 손바닥을 펼친다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-3:blame",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "사실관계만 보시죠. 제가 의도를 너무 빨리 단정한 건 맞습니다. 다만 강도윤 씨 쪽도 내부 인원을 떠올리게 할 만큼 모호하게 말해서, 전달 순서대로 봐도 결론은 하나입니다, 제가 그렇게 읽을 수밖에 없었습니다.",
      "behaviorHint": "표정은 평평하지만 마지막 문장에서 턱이 굳는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-3:confession",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "전달 순서대로 증거를 다시 보니 HJ가 저를 뜻한 건 아니었습니다. 사실관계만 보시죠, 결론은 하나입니다, 제가 잘린 클립만으로 직접 겨냥이라고 단정한 건 제 책임입니다.",
      "behaviorHint": "어깨를 곧게 세운 채 눈을 피하지 않는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-3:evidence_hit",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "공유노트와 원본 로그까지 나오면 부정할 수 없습니다. 사실관계만 보시죠, 전달 순서대로 다시 놓아 보면 결론은 하나입니다, 제가 본 19초만으로는 서두른 게 맞습니다.",
      "behaviorHint": "짧게 숨을 내쉰 뒤 더 낮은 톤으로 마무리한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-5:deny",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "사실관계만 보시죠. 결론은 하나입니다, 저는 정식 정정 전까지 강도윤 씨를 비방하는 소문전에 가담한 적 없습니다. 전달 순서대로 봐도 그렇게 볼 기록은 없다고 생각했습니다.",
      "behaviorHint": "양손을 가지런히 놓고 한 박자 쉬어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-5:hedge",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "저는 퍼뜨린 건 아닙니다. 7시 42분부터 전달 순서대로 보셔도 확인하려던 겁니다, 멘토방과 동료에게 정리해서 물은 수준이었습니다.",
      "behaviorHint": "차분히 숫자를 세듯 손가락을 접는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-5:partial",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 억울함을 여러 사람에게 말한 건 맞습니다. 다만 사실관계만 보시죠, 퍼뜨린 건 아닙니다라고 생각했고 전달 순서대로는 공식 대응을 찾으려던 겁니다.",
      "behaviorHint": "시선을 고정한 채 속도를 늦춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-5:blame",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "사실관계만 보시죠. 제가 감정 섞인 메시지를 보낸 건 맞습니다. 다만 강도윤 씨 쪽도 팀 회의에서 저를 떠올리게 했고, 전달 순서대로 봐도 결론은 하나입니다, 그래서 서로 일이 더 커졌습니다.",
      "behaviorHint": "입꼬리 하나 움직이지 않고 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-5:confession",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "7시 42분부터 전달 순서대로 제가 여러 사람에게 단정 메시지를 보내 소문전에 가담했습니다. 퍼뜨린 건 아닙니다라고 좁혀 말한 것도 제 잘못입니다.",
      "behaviorHint": "손끝을 맞잡고 숨을 고른 뒤 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-03:beat:b:d-5:evidence_hit",
      "caseId": "workplace-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "DM 수신 범위와 HR 접수 전후 흐름까지 이어 놓으면 부정할 수 없습니다. 결론은 하나입니다, 사실관계만 보시죠, 전달 순서대로 보면 제가 확인보다 전파를 먼저 했습니다.",
      "behaviorHint": "평평한 목소리로 끝내고 시선을 고정한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    }
  ]
}


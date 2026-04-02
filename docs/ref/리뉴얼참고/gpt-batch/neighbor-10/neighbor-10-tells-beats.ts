export const neighbor10TellsBeats = {
  "caseId": "neighbor-10",
  "executableTells": {
    "a": [
      {
        "id": "neighbor10:a:tell:crying_anchor",
        "appliesWhen": [
          "lying",
          "cornered",
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "애가 울면서",
          "표정이 딱",
          "그렇게 와서"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "객관적 사실보다 '애가 그렇게 울면서 왔다'는 장면을 먼저 고정해 추정을 사실처럼 만든다."
      },
      {
        "id": "neighbor10:a:tell:missing_slot_focus",
        "appliesWhen": [
          "cornered",
          "defensive",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "빈 칸이",
          "그 한정판",
          "그 자리"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "every_turn",
        "originalPattern": "반박을 받으면 비어 있던 앨범 칸과 한정판 이름을 반복해 의심을 되살린다."
      },
      {
        "id": "neighbor10:a:tell:quick_publicity",
        "appliesWhen": [
          "emotional",
          "defensive",
          "shame",
          "avoiding"
        ],
        "lexicalHooks": [
          "부모방에",
          "먼저 같이 보자고",
          "알릴 수밖에"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "억울함이 커지면 당사자 확인보다 부모방에 먼저 상황을 공유해 동의를 얻으려 한다."
      }
    ],
    "b": [
      {
        "id": "neighbor10:b:tell:reputation_shield",
        "appliesWhen": [
          "lying",
          "hurt",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "우리 애가",
          "이미 상처를",
          "평판이"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "자기 말이 과했는지 묻는 질문에 먼저 '우리 애 이미 상처받았다'며 평판 피해를 앞세운다."
      },
      {
        "id": "neighbor10:b:tell:habit_generalization",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "원래",
          "평소에도",
          "자주"
        ],
        "sentenceShape": "enumeration",
        "cadence": "every_turn",
        "originalPattern": "한 번의 싸움을 설명하면서 상대 아이가 '원래' 그런 편이라고 일반화한다."
      },
      {
        "id": "neighbor10:b:tell:low_scope_claim",
        "appliesWhen": [
          "avoiding",
          "lying",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "몇 분한테만",
          "크게 돌린 건 아니고",
          "조심스럽게"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "소문 전파 범위를 묻는 말에 '몇 분한테만 말한 것'이라며 전달 범위를 줄여 말한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "neighbor10:beat:a:d-1:deny",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "전 절도라고 단정한 적 없어요. 애가 울면서 들어왔고, 가져간 것 같다고 하니까 같이 확인해 보자는 뜻이었어요.",
      "behaviorHint": "말을 빠르게 잇고 손으로 '잠깐' 제스처를 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-1:hedge",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "이름을 적은 건 맞지만, 그때는 너무 급했어요. 그냥 의심 상황을 공유한 거지 낙인찍으려던 건 아니었어요.",
      "behaviorHint": "시선을 비껴가며 문장 끝을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-1:partial",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "공개 글이 먼저 나간 건 제 불찰이에요. 다만 하윤이 표정이 너무 심상치 않아서 제가 앞서간 겁니다.",
      "behaviorHint": "숨을 고르고 한 번 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-1:blame",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 서두른 건 맞지만, 정훈 씨도 바로 사실 설명을 해주진 않았잖아요. 그 공백이 더 불안을 키웠어요.",
      "behaviorHint": "입술을 깨물다 상대를 짧게 바라본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-1:confession",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 직접 확인보다 공개 글이 먼저였고 그건 제 책임입니다. 아이를 지키겠다는 마음이 판단을 앞질렀어요.",
      "behaviorHint": "어깨가 내려가고 목소리가 낮아진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-1:evidence_hit",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "그 캡처 시각이 그렇게 찍혀 있으면 제가 먼저 올린 건 부정 못 하겠네요. 의심이라고 썼어도 받아들이는 사람들에겐 다르게 들렸겠죠.",
      "behaviorHint": "휴대폰 화면을 보다 말끝이 짧아진다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "neighbor10:beat:a:d-3:deny",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "빈 칸이 있었고 애도 민우가 가져갔다고 했어요. 그 상황이면 누가 봐도 없어졌다고 생각할 수밖에 없었어요.",
      "behaviorHint": "손가락으로 빈 칸 크기를 그리듯 보인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-3:hedge",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 완전히 봤다는 건 아니지만, 적어도 하윤 눈에는 사라진 걸로 보였어요. 그래서 민우 쪽을 먼저 의심한 거예요.",
      "behaviorHint": "한숨을 삼키며 단서를 붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-3:partial",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "포켓에서 나온 건 맞아요. 하지만 그 전까진 정말 안 보였고, 저는 분실이 아니라 가져간 걸로 느껴졌어요.",
      "behaviorHint": "고개를 숙였다가 다시 든다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-3:blame",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "민우가 훔친 건 아닐 수 있어도, 둘이 잡아당기며 상황을 키운 건 사실이잖아요. 그 혼란 때문에 제가 더 확신해 버렸어요.",
      "behaviorHint": "손을 모았다 펴며 책임을 나누려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-3:confession",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "결론적으로 민우가 훔친 건 아니었어요. 비어 보인 칸과 아이 첫말만으로 절도라고 판단한 건 제 잘못이었습니다.",
      "behaviorHint": "목소리가 작아지고 눈을 내리깐다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-3:evidence_hit",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "사진상으로는 하윤 앨범 안쪽에서 나온 게 맞네요. 그러면 '가져갔다'는 제 전제부터 다시 봐야겠어요.",
      "behaviorHint": "사진을 오래 보다가 입술을 다문다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "neighbor10:beat:a:d-5:deny",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "약속을 깨려던 건 아니에요. 그날은 너무 급했고, 먼저 알리면 같이 확인이 빨라질 거라고 생각했어요.",
      "behaviorHint": "급히 손사래를 치며 부정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-5:hedge",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "순서가 조금 어긋난 건 맞아요. 그래도 바로 연락하려던 참이었고, 공개적으로 몰아가려던 의도는 아니었어요.",
      "behaviorHint": "'조금'이라는 단어를 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-5:partial",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 부모끼리 먼저 보자던 약속보다 단체방 글이 먼저였어요. 다만 그만큼 제가 하윤 말을 급하게 믿었던 겁니다.",
      "behaviorHint": "짧게 인정한 뒤 이유를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-5:blame",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "저만 순서를 어긴 건 아니잖아요. 정훈 씨도 저한테 바로 묻기보다 다른 부모들부터 접촉했으니까요.",
      "behaviorHint": "표정을 굳히며 균형을 요구한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-5:confession",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "공동픽업까지 맡기던 사이였는데 제가 먼저 그 신뢰 절차를 무너뜨렸어요. 먼저 1:1로 확인했어야 했습니다.",
      "behaviorHint": "어깨를 말아쥐고 후회를 드러낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:a:d-5:evidence_hit",
      "caseId": "neighbor-10",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "연락 순서표까지 보면 변명하기 어렵네요. 제가 약속을 지키지 못한 쪽이라는 건 인정합니다.",
      "behaviorHint": "시선을 떨군 채 짧게 끊어 말한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "neighbor10:beat:b:d-2:deny",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "소문을 돌렸다기보다 상황 설명을 한 겁니다. 우리 애가 도둑처럼 보이는 걸 그냥 두고 볼 수는 없었어요.",
      "behaviorHint": "말수를 줄이고 턱을 굳힌다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-2:hedge",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "몇 분한테만 조심스럽게 말한 거예요. 하윤이를 깎아내리려던 게 아니라 민우 쪽 사정을 설명한 겁니다.",
      "behaviorHint": "'몇 분'을 낮게 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-2:partial",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "음성 보낸 건 맞습니다. 하지만 저는 절도라고 단정한 게 아니라, 규칙 문제가 있었다는 취지로 말했어요.",
      "behaviorHint": "문장 사이를 길게 끊으며 최소화한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-2:blame",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "그런데 하윤이가 평소에도 기준을 자주 바꿔서 애들이 헷갈린 건 사실 아닙니까. 그 배경 없이 우리 애만 몰린 것처럼 보였어요.",
      "behaviorHint": "의자에 등을 기대고 반문하듯 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-2:confession",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "네, 사실 확인도 끝나기 전에 하윤이를 '원래 그런 아이'처럼 말하고 다녔습니다. 우리 애 평판을 막겠다고 상대 아이 평판을 건드렸어요.",
      "behaviorHint": "입을 꾹 다물었다가 천천히 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-2:evidence_hit",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "그 음성과 전달 캡처가 제 거라면 범위를 줄여 말한 것도 의미가 없겠네요. 이미 제가 성격 일반화까지 한 셈입니다.",
      "behaviorHint": "한쪽 손으로 이마를 문지른다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "neighbor10:beat:b:d-4:deny",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "오해라고 보기엔 하윤 쪽이 먼저 교환이 끝난 것처럼 받아들인 겁니다. 민우는 자기 기준대로 보고 있었어요.",
      "behaviorHint": "짧고 단정적으로 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-4:hedge",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "규칙을 다르게 이해했을 가능성은 있겠죠. 그래도 그 순간 먼저 울음으로 번진 쪽은 하윤이었습니다.",
      "behaviorHint": "한쪽 어깨를 으쓱하며 여지를 남긴다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-4:partial",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "교사 메모대로 서로 다르게 받아들인 건 맞습니다. 다만 민우 입장에선 갑자기 판이 바뀐 느낌이었을 거예요.",
      "behaviorHint": "메모를 보며 신중한 척 속도를 늦춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-4:blame",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그래도 하윤 쪽이 규칙을 자주 바꾼다고 느낀 누적이 있었어요. 이번 일만 뚝 떼서 보면 민우도 억울합니다.",
      "behaviorHint": "손바닥을 펴 보이며 맥락을 늘린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-4:confession",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "맞습니다. 절도가 아니라 교환 규칙을 서로 다르게 이해한 상태에서 앨범을 같이 잡아당긴 게 핵심이었어요.",
      "behaviorHint": "표정이 풀리며 사실관계를 차분히 정리한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-4:evidence_hit",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "상담 메모가 이렇게 적혀 있으면 '원래 저랬다'는 식으로만 말할 수는 없네요. 이번 건 규칙 오해가 중심이 맞습니다.",
      "behaviorHint": "메모를 내려놓고 짧게 숨을 뱉는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "neighbor10:beat:b:d-5:deny",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "제가 약속을 깼다기보다 공개 글 뒤에 대응한 겁니다. 먼저 방어하지 않으면 우리 애만 그대로 남는다고 봤어요.",
      "behaviorHint": "어조를 낮추지만 단호하게 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-5:hedge",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "직접 확인보다 앞선 연락이 조금 있었던 건 사실입니다. 그래도 불을 키우려는 의도보단 수습하려는 마음이 컸어요.",
      "behaviorHint": "손끝으로 책상을 두드리며 말을 고른다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-5:partial",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 다른 부모들에게 먼저 말한 건 맞습니다. 그때는 민우가 도둑으로 굳어질까 봐 눈앞이 좁아졌어요.",
      "behaviorHint": "숨을 길게 내쉬며 부분 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-5:blame",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "하지만 순서를 먼저 무너뜨린 건 소연 씨 쪽 공개 글이었잖아요. 저는 그 뒤에 방어적으로 움직인 겁니다.",
      "behaviorHint": "상대를 보며 책임 배분을 시도한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-5:confession",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "결국 저도 약속을 지키지 못했습니다. 부모끼리 먼저 확인하자던 원칙보다 민우 평판 방어를 앞세웠어요.",
      "behaviorHint": "고개를 끄덕이며 짧게 자인한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor10:beat:b:d-5:evidence_hit",
      "caseId": "neighbor-10",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "연락 순서표를 보면 저도 직접 확인보다 주변 부모들부터 찾았네요. 그 약속을 저도 깬 겁니다.",
      "behaviorHint": "시선을 내리고 목을 한 번 가다듬는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

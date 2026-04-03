export const neighbor09TellsBeats = {
  "caseId": "neighbor-09",
  "executableTells": {
    "a": [
      {
        "id": "neighbor09:a:tell:measurement_stack",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "23시 14분",
          "48dB",
          "2차 측정",
          "그다음 줄"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "자신에게 유리한 날의 수치와 시간만 길게 나열해 전체 흐름을 이미 입증된 사실처럼 만든다."
      },
      {
        "id": "neighbor09:a:tell:effort_credit",
        "appliesWhen": [
          "cornered",
          "hurt",
          "emotional",
          "shame"
        ],
        "lexicalHooks": [
          "관리실도 제가 다녔고",
          "기사도 제가 기다렸고",
          "녹음도 접었고"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "추가 보강 요청을 묻는 말이 나오면 '제가 관리실에 다니고 기사 기다리고 녹음도 접었다'며 수고를 먼저 꺼낸다."
      },
      {
        "id": "neighbor09:a:tell:narrow_term",
        "appliesWhen": [
          "avoiding",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "미세 조정",
          "마감 보완",
          "한 줄만"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "추가 시공 항목을 말할 때는 '미세 조정', '마감 보완' 같은 작은 표현으로 축소한다."
      }
    ],
    "b": [
      {
        "id": "neighbor09:b:tell:cost_slice",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "내 바닥",
          "저쪽 천장",
          "내 책임 구간",
          "그 구간만"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "every_turn",
        "originalPattern": "전체 합의보다 '내 바닥', '저쪽 천장'처럼 비용을 임의 구간으로 잘라 자기 부담을 줄여 말한다."
      },
      {
        "id": "neighbor09:b:tell:short_offer",
        "appliesWhen": [
          "cornered",
          "hurt",
          "shame"
        ],
        "lexicalHooks": [
          "30만은 바로",
          "일단 보낸 거고",
          "제 몫 먼저"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "불리해지면 '그래서 30만은 바로 보냈다'며 일부 지급만 강조해 약속 위반을 덮으려 한다."
      },
      {
        "id": "neighbor09:b:tell:promise_blur",
        "appliesWhen": [
          "avoiding",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "검토하자는 취지",
          "바로 확정은 아니고",
          "상황 보자는 거였다"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "사전 합의를 묻는 질문에는 '그건 검토하자는 취지였다'며 명확한 동의를 흐린다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "neighbor09:beat:a:d-2:deny",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그건 추가 공사라기보다 원래 마감에서 조금 더 본 수준이었습니다. 제가 크게 바꿔 달라고 한 건 아니에요.",
      "behaviorHint": "손바닥을 작게 펴 보이며 '조금'이라는 크기를 시각적으로 강조한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-2:hedge",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "침실 쪽을 한 번 더 봐 달라고는 했지만, 그게 별도 금액으로 크게 잡힐 줄은 몰랐습니다.",
      "behaviorHint": "시선을 옆으로 빼며 문장 끝을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-2:partial",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "공진이 심한 줄이 있어서 한 줄 보완을 요청한 건 맞습니다. 그때는 그게 꼭 필요해 보였어요.",
      "behaviorHint": "말속도를 늦추고 '한 줄'에서 손가락 하나를 든다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-2:blame",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "추가된 건 사실이지만 처음부터 바닥만 손보면 끝날 구조가 아니었습니다. 그 판단을 저 혼자 욕심낸 것처럼 보긴 어렵습니다.",
      "behaviorHint": "표정이 굳으며 측정표를 가리키려는 몸짓을 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-2:confession",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 침실 천장 패치 한 줄을 더 넣어 달라고 했고, 그 때문에 18만 원이 늘었습니다. 그 요청은 작업을 계속하려면 필요하다고 느꼈습니다.",
      "behaviorHint": "입술을 잠깐 깨물고 난 뒤 짧게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-2:evidence_hit",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "변경요청서에 제 서명이 있네요. 그러면 '마감 보완'이라고만 말한 건 너무 좁게 말한 셈입니다.",
      "behaviorHint": "서류를 오래 바라보다가 어깨를 한 번 내린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "neighbor09:beat:a:d-3:deny",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "핵심은 윗집 바닥 충격이었습니다. 제 천장 구조를 먼저 문제 삼는 건 순서가 뒤바뀐다고 생각했어요.",
      "behaviorHint": "턱을 조금 들고 단정적으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-3:hedge",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "공진 얘기가 없었던 건 아니지만, 처음 체감된 건 계속 위에서 내려오는 충격음이었습니다.",
      "behaviorHint": "문장 사이를 길게 끊으며 강조점을 '처음'에 둔다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-3:partial",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "측정표에 제 침실 천장 구간이 따로 표시된 건 압니다. 그렇다고 그게 단독 원인이라는 뜻은 아니라고 봤습니다.",
      "behaviorHint": "서류를 보며 고개를 작게 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-3:blame",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제 구조 문제가 아예 없었다는 건 아니지만, 그 공진을 키운 건 반복된 윗집 충격입니다. 그래서 제 쪽만 따로 떼어 말하기 어려웠습니다.",
      "behaviorHint": "한숨을 짧게 쉬고 손을 맞잡는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-3:confession",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "소음은 지훈 씨 바닥만의 문제가 아니라 제 천장 공진 구조까지 겹친 공동 문제였습니다. 제가 그 부분을 먼저 숨긴 건 방어였어요.",
      "behaviorHint": "고개를 숙였다가 마지막 문장에서 눈을 맞춘다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-3:evidence_hit",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "측정표에 공진 줄이 저렇게 선명하게 찍혀 있으면, 제가 바닥 문제만으로 말한 건 너무 단선적이었네요.",
      "behaviorHint": "자료 위를 손끝으로 따라가다가 말끝을 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "neighbor09:beat:a:d-5:deny",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 일을 키우려던 게 아니라 답이 너무 늦어서 상황을 적은 겁니다. 공개 압박까지 의도한 건 아니었습니다.",
      "behaviorHint": "양손을 펴며 변명보다 해명이라는 태도를 취한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-5:hedge",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "순서를 어긴 건 맞아도 그 글이 그렇게 크게 번질 줄은 몰랐습니다.",
      "behaviorHint": "작게 숨을 들이마시고 끝말을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-5:partial",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "공지 전에 글을 올린 건 사실입니다. 다만 그때는 관리실 안내가 또 밀릴까 봐 불안했습니다.",
      "behaviorHint": "손끝으로 책상을 두드리다 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-5:blame",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제 글이 먼저였던 건 맞지만, 지훈 씨도 같은 날 공지 전에 30만 원만 보내고 버티고 있었습니다. 절차를 기다리지 못한 건 저만은 아니었습니다.",
      "behaviorHint": "목소리가 잠깐 빨라졌다가 다시 눌린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-5:confession",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 주민앱에 먼저 올려 공개 압박을 건 건 맞습니다. 그게 중재 순서를 흐리게 만들었다는 것도 인정합니다.",
      "behaviorHint": "눈을 감았다 뜬 뒤 짧게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:a:d-5:evidence_hit",
      "caseId": "neighbor-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "게시 시각이 공지보다 먼저면 제 의도가 단순 하소연만은 아니었다고 보셔도 됩니다.",
      "behaviorHint": "휴대폰 화면을 보다가 체념한 듯 내려놓는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "neighbor09:beat:b:d-1:deny",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 반반 확정이 아니라 일단 상황을 보자는 취지였습니다. 저는 그렇게 이해했습니다.",
      "behaviorHint": "의자에 기대 앉아 단어를 짧게 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-1:hedge",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "200만 원 안이면 다시 보자는 정도였지, 바로 못 박은 합의로 받아들이진 않았습니다.",
      "behaviorHint": "입술을 눌렀다가 '정도'라는 말을 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-1:partial",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "반반 얘기가 나온 건 맞습니다. 다만 추가 항목 없이 처음 계획대로 끝난다는 전제가 깔린 줄 알았습니다.",
      "behaviorHint": "손으로 범위를 자르듯 선을 긋는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-1:blame",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "아랫집 천장 요구가 붙으면서 처음 얘기와 달라졌다고 느꼈습니다. 그래서 제 바닥 구간만 계산하자고 한 겁니다.",
      "behaviorHint": "짧게 고개를 끄덕이며 '제 바닥'을 반복한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-1:confession",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "원래 반반 합의가 있었는데 제가 30만 원만 보내며 사실상 그 약속을 뒤집었습니다. 추가 항목이 억울하다는 감정이 앞섰습니다.",
      "behaviorHint": "두 손을 모았다가 풀며 시선을 잠깐 내린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-1:evidence_hit",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "메시지에 '내 바닥 책임만'이라고 적은 이상, 제가 합의 문구보다 제 계산을 앞세운 건 부정하기 어렵네요.",
      "behaviorHint": "휴대폰 캡처를 보며 턱을 한 번 쓸어내린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "neighbor09:beat:b:d-4:deny",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "최종 금액이 그렇게까지 정리됐는지 저는 확신이 없었습니다. 공지가 늦으니 더 못 믿겠더라고요.",
      "behaviorHint": "어깨를 으쓱하며 숫자를 흐린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-4:hedge",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "보전금이 붙는다는 얘기는 들었지만 계산표를 보기 전에는 못 믿겠다고 생각했습니다.",
      "behaviorHint": "시선을 내리고 손가락으로 책상 모서리를 문지른다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-4:partial",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "정산서상 잔액이 184만 원으로 찍힌 건 압니다. 그래도 그 안에 제 몫 아닌 부분이 섞여 있다고 봤습니다.",
      "behaviorHint": "종이를 한 번 들었다가 다시 내려놓는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-4:blame",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "각자 92만 원이라는 계산은 알지만, 저는 아래층 추가 요청 몫까지 그대로 낼 생각은 없었습니다. 그래서 '내 책임 구간'만 따로 본 겁니다.",
      "behaviorHint": "손으로 구간을 자르듯 짧게 두 번 긋는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-4:confession",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "최종 잔액 184만 원, 각자 92만 원이 맞는데 제가 그 숫자를 받아들이지 않고 버틴 게 맞습니다. 체면도 있고 겁도 났습니다.",
      "behaviorHint": "한숨을 내쉬고 마지막 문장을 낮게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-4:evidence_hit",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "전표랑 계산서가 다 연결돼 있으면 숫자 자체는 더 이상 부정하기 어렵습니다.",
      "behaviorHint": "정산표를 천천히 넘기다 손을 멈춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "neighbor09:beat:b:d-5:deny",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "공지 전에는 저도 최종 금액을 인정한 적 없습니다. 30만 원은 일단 제 구간만 먼저 보낸 겁니다.",
      "behaviorHint": "짧고 단호하게 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-5:hedge",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공지가 늦으니 일부라도 보낸 건데 그걸 바로 거부라고만 보긴 억울합니다.",
      "behaviorHint": "입꼬리를 굳힌 채 '일부라도'를 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-5:partial",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제가 공식 공지 전에 30만 원을 보낸 건 맞습니다. 그때는 그게 제 선이라고 생각했습니다.",
      "behaviorHint": "몸을 앞으로 숙여 짧게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-5:blame",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "하지만 그 전에 연우 씨가 주민앱에 먼저 글을 올려 버렸습니다. 저도 방어적으로 굴 수밖에 없었습니다.",
      "behaviorHint": "말이 빨라지며 손바닥으로 탁자를 한 번 누른다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-5:confession",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저는 공지 전에 30만 원만 보내고 나머지를 거부했습니다. 그게 중재 절차를 더 꼬이게 만든 것도 인정합니다.",
      "behaviorHint": "고개를 젓다가 마지막엔 멈추고 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "neighbor09:beat:b:d-5:evidence_hit",
      "caseId": "neighbor-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "공지 예약보다 19분 빨리 보낸 기록이면, 제가 일부 송금을 방패처럼 쓴 건 맞습니다.",
      "behaviorHint": "송금 시각을 확인하고 시선을 피한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-6"
    }
  ]
}


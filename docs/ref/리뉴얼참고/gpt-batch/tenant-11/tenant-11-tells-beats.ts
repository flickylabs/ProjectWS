export const tenant11TellsBeats = {
  "caseId": "tenant-11",
  "executableTells": {
    "a": [
      {
        "id": "tenant11:a:tell:before_after_push",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "전후 사진",
          "분위기",
          "제가 다 해놨잖아요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 질문이 나오면 공사 전후 사진을 빠르게 넘겨 보이며 구조 변경보다 미적 개선 성과를 먼저 보이려 한다."
      },
      {
        "id": "tenant11:a:tell:receipt_stack",
        "appliesWhen": [
          "cornered",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "영수증",
          "계좌이체",
          "제가 쓴 돈"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "비용 부풀리기 지적이 나오면 영수증과 계좌 캡처를 연달아 띄워 총액의 인상을 크게 만든다."
      },
      {
        "id": "tenant11:a:tell:flat_voice_press",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "억울하죠",
          "제가요",
          "그래서요"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "억울해질수록 목소리가 오히려 평평해지고 문장 끝을 짧게 끊어 상대를 압박한다."
      }
    ],
    "b": [
      {
        "id": "tenant11:b:tell:clause_reset",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "특약",
          "원상복구",
          "계약 조항"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "공로 가로채기 지적이 나오면 곧바로 계약서 원상복구 조항을 읽으며 현재 쟁점을 규칙 문제로 되돌린다."
      },
      {
        "id": "tenant11:b:tell:scope_narrowing",
        "appliesWhen": [
          "cornered",
          "self_protection",
          "avoiding"
        ],
        "lexicalHooks": [
          "조명 몇 개",
          "그 정도",
          "일부만"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "자신이 계속 사용할 개선 항목을 묻는 질문에는 '조명 몇 개는 그대로 둘 수 있다'처럼 범위를 작게 축소해 말한다."
      },
      {
        "id": "tenant11:b:tell:numeric_cooldown",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "견적 합계",
          "품목 수",
          "숫자로 보죠"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "감정이 올라오면 다시 견적 합계와 품목 수만 읽어 내려가며 대화를 계산 문제처럼 재설정한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant11:beat:a:d-1:deny",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "전후 상태 다 보셨잖아요. 저는 처음에 허용된 범위 안에서 분위기만 살린 거예요.",
      "behaviorHint": "휴대폰 사진을 급히 넘기며 시선을 맞추지 않는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-1:hedge",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "그때 '크게만 안 건드리면 된다'고 들었으니 제가 넓게 이해한 건 맞죠. 딱 잘라 금지라고 느끼진 못했어요.",
      "behaviorHint": "말끝을 흐리며 손가락으로 계약서 가장자리를 두드린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-1:partial",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "붙박이장 문 쪽이 걸릴 수 있다는 건 이제 알아요. 다만 성필 씨도 좋아진 집은 보고 계셨잖아요.",
      "behaviorHint": "숨을 고르고 고개를 약간 숙인 채 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-1:blame",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "허용선이 그렇게 중요했으면 처음부터 서면으로 못 박았어야죠. 모호하게 말해놓고 전부 저한테만 돌리면 답답해요.",
      "behaviorHint": "입술을 다문 채 짧게 끊어 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-1:confession",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 구조 변경까지 허용된 건 아니었어요. 제가 제 해석으로 밀어붙인 부분은 인정합니다.",
      "behaviorHint": "사진을 내려놓고 천천히 고개를 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-1:evidence_hit",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "전체 대화에 '되돌릴 수 있게'라는 단서가 있었네요. 제가 듣고 싶은 부분만 붙잡고 있었던 것 같아요.",
      "behaviorHint": "스크린을 오래 바라보다가 한 박자 늦게 답한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "tenant11:beat:a:d-2:deny",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그건 뜯어고친 게 아니라 작업 동선 맞춘 정도예요. 집을 망가뜨리려던 건 아니었어요.",
      "behaviorHint": "손으로 공간 크기를 그리며 빠르게 설명한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-2:hedge",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "고정된 걸 조금 손본 건 있어도, 다 원상으로 돌릴 수 있다고 생각했어요. 그렇게 큰 구조 변경이라고는 안 봤죠.",
      "behaviorHint": "어깨를 움츠리고 사진 일부만 짚는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-2:partial",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문짝하고 상부장 일부를 뗀 건 맞아요. 그래도 완전 파손처럼 몰리면 너무 과해요.",
      "behaviorHint": "입술을 깨물었다가 바로 반박을 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-2:blame",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "처음 집 상태가 멀쩡했다면 제가 그렇게까지 손댈 이유가 없었어요. 누수 자국이랑 답답한 수납이 저를 밀었죠.",
      "behaviorHint": "숨을 길게 내쉬며 의자에 등을 붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-2:confession",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "붙박이장 문 두 짝, 상부장, 앵커, 배선까지 제가 건드렸어요. 개선이라고 불렀지만 승인 없는 구조 변경이었던 건 맞아요. 제 잘못이었습니다.",
      "behaviorHint": "두 손을 모아 테이블 위에 올리고 정면을 본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-2:evidence_hit",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "계좌이체 내역까지 붙으니 제가 어디까지 작업 맡겼는지 숨기기 어렵네요. 정리 수준이라고만 말한 건 무리였어요.",
      "behaviorHint": "영수증 화면에서 손을 떼고 잠시 말을 멈춘다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant11:beat:a:d-3:deny",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "430만원은 실제로 다 나간 돈이에요. 제가 이 집에 쏟아 넣은 손해를 말하는데 왜 잘라서 보죠.",
      "behaviorHint": "계좌 캡처와 영수증을 연달아 띄운다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-3:hedge",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "세부 품목이 섞인 건 있어도 전부 공간 살리려고 든 돈이었어요. 한 줄씩 잘라버리면 맥락이 사라져요.",
      "behaviorHint": "영수증 묶음을 쥔 손에 힘이 들어간다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-3:partial",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "이동식 가구랑 소품이 섞인 건 인정해요. 그래도 남는 고정 개선비가 핵심이었다는 점까지 지워지면 안 돼요.",
      "behaviorHint": "고개를 끄덕이며 바로 손바닥을 펴 보인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-3:blame",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "총액으로 말한 건 제가 기여한 게 너무 작게 취급될까 봐서였어요. 상대가 애초에 하나도 인정 안 하니 저도 크게 말할 수밖에 없었죠.",
      "behaviorHint": "영수증을 정리하다가 한 장을 탁 내려놓는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-3:confession",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "430만원 전액을 공간 가치 상승비로 밀어붙인 건 맞지 않아요. 남는 항목과 개인용 지출을 나눠 봐야 합니다. 제 잘못이었습니다.",
      "behaviorHint": "목소리가 낮아지며 숫자를 또박또박 분리해 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:a:d-3:evidence_hit",
      "caseId": "tenant-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "견적서에 이동식 거울장이랑 소품이 따로 찍혀 있네요. 이걸 전부 고정 개선비라고 한 건 제가 너무 묶어서 말한 거예요.",
      "behaviorHint": "시공업체 톡을 읽다가 눈을 감고 짧게 숨을 내쉰다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant11:beat:b:d-1:deny",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 도배나 조명 정도만 염두에 둔 겁니다. 붙박이장을 손대라는 뜻으로 말한 적은 없어요.",
      "behaviorHint": "계약서 특약 부분을 손가락으로 정확히 짚는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-1:hedge",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "좋게 꾸미라는 표현이 넓게 들릴 수는 있어도 전제는 되돌릴 수 있는 선이었습니다. 상식적으로 구조 변경은 아니죠.",
      "behaviorHint": "말끝을 짧게 끊으며 안경을 고쳐 쓴다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-1:partial",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제 말이 부드러웠던 건 인정합니다. 하지만 특약이 바뀐 건 아니에요.",
      "behaviorHint": "시선을 아래로 내렸다가 곧바로 계약서로 되돌린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-1:blame",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "집 상태가 낡았다고 해서 승인 절차까지 사라지는 건 아닙니다. 애매한 말을 했더라도 선을 넘은 책임은 별개예요.",
      "behaviorHint": "의자 팔걸이를 한 번 잡았다 놓는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-1:confession",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 말을 느슨하게 해서 분쟁을 키운 건 맞습니다. 그래도 허용 범위가 구조 변경까지였던 건 아닙니다. 제 잘못이었습니다.",
      "behaviorHint": "한숨을 내쉰 뒤 낮은 톤으로 마무리한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-1:evidence_hit",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "특약 문구까지 같이 보니 구두 표현만 내세우긴 어렵네요. 제가 선을 다시 못 박지 않은 건 사실입니다.",
      "behaviorHint": "계약서를 다시 넘기다 손을 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "tenant11:beat:b:d-4:deny",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "모집글은 현재 집 상태를 설명한 겁니다. 세입자 공을 훔치려는 의도는 없었어요.",
      "behaviorHint": "캡처 화면을 보지 않고 짧게 부인한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-4:hedge",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "좋아 보이는 사진을 쓴 건 맞지만 공로를 빼앗겠다는 건 과한 해석입니다. 공실 안내 문구였어요.",
      "behaviorHint": "입술을 굳게 다문 채 어깨를 펴고 앉는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-4:partial",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "문구가 과해 보일 수는 있습니다. 다만 그때는 공실 안내가 급했고 의도적으로 조롱한 건 아니에요.",
      "behaviorHint": "목을 한 번 가다듬고 말끝을 낮춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-4:blame",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "세입자 쪽 위반 문제가 없었다면 이런 표현도 덜 문제였겠죠. 기여 인정과 책임 문제가 엉켜서 저도 방어적으로 쓴 겁니다.",
      "behaviorHint": "손바닥을 아래로 눌러 진정시키듯 제스처한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-4:confession",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "'집주인 감성 리뉴얼'이라는 표현은 제 쪽 공처럼 보이게 만들었습니다. 그 부분은 인정합니다.",
      "behaviorHint": "시선을 피하지 않고 짧게 고개를 숙인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-4:evidence_hit",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "저 문구는 변명하기 어렵네요. 현재 상태 설명이라고만 하기엔 제가 너무 앞에 나섰습니다.",
      "behaviorHint": "모집글 캡처를 본 뒤 턱을 만지며 말을 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "tenant11:beat:b:d-5:deny",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "원래대로 돌리려면 그 정도 비용이 듭니다. 집주인 입장에선 전면 정리가 맞아요.",
      "behaviorHint": "견적 총액부터 먼저 읽어 내려간다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-5:hedge",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "부분만 손보면 색 차이와 자국이 남으니 전체 작업을 본 겁니다. 안전 문제도 고려했어요.",
      "behaviorHint": "견적서 항목을 짧게 짚으며 말수를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-5:partial",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "부분복구 견적이 있다는 건 압니다. 그래도 공실 일정까지 겹치니 넉넉히 잡고 싶었던 거예요.",
      "behaviorHint": "어깨를 한 번 굳혔다가 숫자를 다시 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-5:blame",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "추가 하자나 분쟁이 생기면 결국 집주인이 다 떠안습니다. 크게 잡은 건 자기보호였지만, 세입자 쪽 변경이 없었다면 이런 계산도 필요 없었겠죠.",
      "behaviorHint": "손가락으로 책상을 천천히 두드린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-5:confession",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "480만원 전액을 그대로 청구한 건 과했습니다. 실제 정산은 부분복구 기준으로 다시 나눠야 해요. 제 잘못이었습니다.",
      "behaviorHint": "견적서 두 장을 나란히 두고 고개를 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant11:beat:b:d-5:evidence_hit",
      "caseId": "tenant-11",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "비교 견적을 같이 놓고 보니 전면복구만 정답이라고 하긴 어렵군요. 제가 기준점을 너무 크게 잡았습니다.",
      "behaviorHint": "큰 견적서에서 시선을 떼고 작은 견적서에 손을 올린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
}


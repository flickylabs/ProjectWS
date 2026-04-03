export const tenant07TellsBeats = {
  "caseId": "tenant-07",
  "executableTells": {
    "a": [
      {
        "id": "tenant07:a:tell:source_lock",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "그 표현",
          "누가 먼저",
          "출처"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 말을 돌리면 '그 표현 누가 먼저 썼죠'라고 끊으며 출처를 고정하려 한다."
      },
      {
        "id": "tenant07:a:tell:timeline_board",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive",
          "lying"
        ],
        "lexicalHooks": [
          "먼저",
          "그 다음",
          "캡처상"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리한 질문이 나오면 감정보다 일정표와 캡처를 시간순으로 늘어놓아 자신의 기억이 더 정확하다는 인상을 만든다."
      },
      {
        "id": "tenant07:a:tell:measured_cutoff",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame",
          "cornered"
        ],
        "lexicalHooks": [
          "아니요",
          "그건 아니고",
          "그 문장"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "억울할수록 목소리는 오히려 차분해지지만 문장 끝을 더 짧게 끊어 상대를 밀어붙인다."
      }
    ],
    "b": [
      {
        "id": "tenant07:b:tell:market_shield",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "요즘 시장",
          "시세가",
          "다 그렇다"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리해지면 '요즘 시장이 다 그렇다'는 말로 자신의 선택을 외부 시세 탓으로 넓혀 버린다."
      },
      {
        "id": "tenant07:b:tell:past_stack",
        "appliesWhen": [
          "cornered",
          "hurt",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "그때도",
          "몇 년 전",
          "날짜로 보면"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "현재 질문을 받으면 몇 년 전 경고까지 날짜를 붙여 나열해 상대의 신뢰 문제처럼 다시 포장한다."
      },
      {
        "id": "tenant07:b:tell:injured_sigh_reset",
        "appliesWhen": [
          "emotional",
          "shame",
          "cornered",
          "hurt"
        ],
        "lexicalHooks": [
          "하...",
          "저도",
          "봐줄 만큼"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "대답 전 길게 숨을 내쉰 뒤 자신이 더 손해 보는 사람처럼 느린 톤으로 다시 말을 시작한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant07:beat:a:d-1:deny",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그날은 이미 4%로 끝난 자리였습니다. 남은 건 서류 순서뿐이었어요.",
      "behaviorHint": "캡처 순서를 짚듯 손가락을 움직이며 단정적으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-1:hedge",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "'정리하자'는 표현이 먼저였고, 저는 그걸 합의로 이해했습니다.",
      "behaviorHint": "문장 하나를 반복해 출처를 고정하려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-1:partial",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "서명은 남아 있었지만 방향 자체는 이미 확인됐습니다. 다만 최종 서류가 안 끝났다는 점은 인정합니다.",
      "behaviorHint": "사실관계를 인정하되 핵심 선은 지키려는 표정이다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-1:blame",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 늦게 낸 틈은 있지만, 말을 바꾼 건 새 문의가 들어온 뒤였습니다.",
      "behaviorHint": "짧게 숨을 고른 뒤 상대 시선을 똑바로 본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-1:confession",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "저는 합의의 확정성을 더 세게 말했고, 제 지연이 만든 틈을 작게 보이려 했습니다. 제 잘못이었습니다.",
      "behaviorHint": "목소리가 낮아지고 문장 끝이 짧아진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-1:evidence_hit",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "잘린 캡처 앞뒤를 보면 4% 정리 뒤 서류만 맞추자는 흐름이 드러납니다.",
      "behaviorHint": "화면을 오래 보다가 체념 섞인 어조로 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant07:beat:a:d-3:deny",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "크게 늦은 건 아닙니다. 절차를 맞추느라 바로 못 낸 겁니다.",
      "behaviorHint": "손끝으로 날짜를 세며 감정을 눌러 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-3:hedge",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "사흘 안에 보냈고, 미루려던 건 아니었습니다.",
      "behaviorHint": "사흘이라는 숫자를 짧게 덧붙이며 시선을 피한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-3:partial",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "네, 중개사가 바라던 시점보다 사흘 늦었습니다. 다만 그 사이에 절차를 맞추려는 노력은 있었습니다.",
      "behaviorHint": "한 번 고개를 끄덕이며 사실만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-3:blame",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "설명을 못 한 제 책임은 있지만, 그걸로 재계약 판을 다시 짠 건 과했습니다.",
      "behaviorHint": "자기 잘못을 말한 뒤 곧바로 상대의 과잉 대응을 지적한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-3:confession",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "정확히 사흘 늦었고, 저는 체면 때문에 그 사실을 축소했습니다. 제 잘못이었습니다.",
      "behaviorHint": "어깨가 조금 내려가고 말투가 한층 부드러워진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-3:evidence_hit",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "초안 PDF와 서명란 상태를 보면, 늦었더라도 그 초안이 먼저 있었던 건 분명합니다.",
      "behaviorHint": "문서를 다시 확인하듯 시선을 내리고 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "tenant07:beat:a:d-4:deny",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "반복 문제였던 적은 없습니다. 지금 들이대실 성격도 아니고요.",
      "behaviorHint": "표정은 굳어지지만 톤은 낮게 유지한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-4:hedge",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "생활 안내를 한 번 받은 정도지, 계속 지적받은 세입자는 아니었습니다.",
      "behaviorHint": "문장 끝을 짧게 끊으며 선을 긋는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-4:partial",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 2년 전 한 차례 경고는 있었습니다. 하지만 재발은 없었습니다.",
      "behaviorHint": "민망함을 누른 채 기록의 범위만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-4:blame",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 부정한 건 부끄러워서였고, 도형 씨는 그 한 번을 반복 문제처럼 키웠습니다.",
      "behaviorHint": "눈빛이 흔들리다가도 상대 이름에서 다시 단단해진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-4:confession",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "한 차례 있었고 바로 종결됐습니다. 저는 그 사실을 지웠고, 상대는 그 기록을 과장했습니다. 제 잘못이었습니다.",
      "behaviorHint": "숨을 길게 내쉬며 수치심을 억누른다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:a:d-4:evidence_hit",
      "caseId": "tenant-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "관리사무소 기록이 한 번으로 남아 있다면, 그 부분은 제가 더 못 버팁니다.",
      "behaviorHint": "입술을 다문 뒤 짧게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant07:beat:b:d-2:deny",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그건 빈말이 아니라 실제 문의였습니다. 집주인 입장에선 무시할 수 없었어요.",
      "behaviorHint": "길게 한숨을 쉰 뒤 장황하게 설명을 늘어놓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-2:hedge",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "예약금은 없어도 금액 의사는 분명하다고 들었습니다.",
      "behaviorHint": "핵심을 흐리듯 '들었다'는 표현에 기대어 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-2:partial",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "가예약 단계는 아니었지만 당시엔 현실적인 대안처럼 느꼈습니다.",
      "behaviorHint": "눈가를 문지르며 톤이 약간 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-2:blame",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "아들 말과 시장 압박이 겹치니 제가 과하게 받아들인 겁니다.",
      "behaviorHint": "피해자인 듯 어깨를 늘어뜨리고 변명한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-2:confession",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "결국 탐색 문의였고, 제가 그걸 크게 불려 압박 카드로 썼습니다. 제 잘못이었습니다.",
      "behaviorHint": "체념한 듯 고개를 여러 번 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-2:evidence_hit",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "문의표가 그 수준이라면, 네, 제가 무게를 너무 실은 셈입니다.",
      "behaviorHint": "손으로 이마를 쓸며 말을 늦춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant07:beat:b:d-5:deny",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "일방 통보가 아닙니다. 시장에 맞춰 조건을 다시 설명한 겁니다.",
      "behaviorHint": "손바닥을 펴 보이며 자신도 어쩔 수 없었다는 식으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-5:hedge",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "서명 전이면 조정 여지는 남아 있지 않습니까. 제안한 것도 최소한이었어요.",
      "behaviorHint": "문장 끝을 되묻는 어조로 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-5:partial",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "12%와 추가 조건을 다시 꺼낸 건 맞습니다. 그때는 그대로 가기 어렵다고 봤습니다.",
      "behaviorHint": "변명과 인정이 섞인 느린 톤으로 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-5:blame",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "서명도 늦고 문의도 들어왔으니 제가 부담을 덜 방향을 찾은 겁니다.",
      "behaviorHint": "과거 호의를 셈하듯 손가락을 접어 나간다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-5:confession",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "4% 뒤에 12%와 추가 조건을 붙인 건 기존 합의를 넘는 일방 변경이었습니다. 제 잘못이었습니다.",
      "behaviorHint": "목이 잠긴 듯 낮은 소리로 마무리한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-5:evidence_hit",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "대화 전체를 보면 제가 조건을 다시 열어 버린 모양새라는 건 부인하기 어렵네요.",
      "behaviorHint": "긴 한숨 뒤에 말을 억지로 이어 간다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant07:beat:b:d-4:deny",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 문제는 한 번으로 끝난 게 아닙니다. 집주인은 그런 인상을 쉽게 못 지웁니다.",
      "behaviorHint": "예전 날짜를 떠올리듯 손가락을 접어 나간다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-4:hedge",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "기록만 한 번일 뿐이지 생활 불편은 더 누적됐다고 느꼈습니다.",
      "behaviorHint": "객관 기록보다 느낌을 길게 설명하며 버틴다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-4:partial",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "공식 접수는 한 번뿐이었다는 건 인정합니다. 그래도 생활 불편 체감은 그 이상이었습니다.",
      "behaviorHint": "속도를 늦추며 겨우 사실을 받는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-4:blame",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그래도 그 인상이 남았고, 저는 그 불만을 지금까지 끌고 온 겁니다.",
      "behaviorHint": "억울하다는 듯 어깨를 세우며 과거를 다시 꺼낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-4:confession",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "반복 문제처럼 말한 건 과장이었고, 현재 인상 요구를 방어하려는 계산도 있었습니다. 제 잘못이었습니다.",
      "behaviorHint": "체면을 내려놓듯 시선을 떨군다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant07:beat:b:d-4:evidence_hit",
      "caseId": "tenant-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "기록이 한 번뿐이면, 적어도 공식 근거를 여러 번인 것처럼 말하긴 어렵습니다.",
      "behaviorHint": "말끝이 흐려지며 힘이 빠진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    }
  ]
}


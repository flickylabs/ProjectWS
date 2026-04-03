export const partnership11TellsBeats = {
  "caseId": "partnership-11",
  "executableTells": {
    "a": [
      {
        "id": "partnership-11:a:tell:clause_shield",
        "appliesWhen": [
          "lying",
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "조항상",
          "수치상",
          "마감 기준으로는"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "의도를 묻는 질문에도 계약 조항과 숫자를 먼저 길게 읽어 관계적 쟁점을 뒤로 민다."
      },
      {
        "id": "partnership-11:a:tell:deadline_timeline",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "hold 마감이",
          "브로커가 독촉했고",
          "공실 일정상"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "자신의 단독 결정을 지적받으면 hold 마감, 브로커 독촉, 공실 일정 순으로 시간표를 재구성해 정당화한다."
      },
      {
        "id": "partnership-11:a:tell:affect_flattening",
        "appliesWhen": [
          "avoiding",
          "hurt",
          "emotional",
          "defensive"
        ],
        "lexicalHooks": [
          "감정은 별개고",
          "운영 판단으로는",
          "기회 확보 차원에서"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "상대가 배신감을 말하면 '감정은 별개고 기회 확보 문제였다'며 정서적 손상을 절차 문제로 납작하게 만든다."
      }
    ],
    "b": [
      {
        "id": "partnership-11:b:tell:history_stack",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그 전에",
          "제가 해온 건",
          "팝업 때부터"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "현재 질문을 받으면 과거 팝업 손실, 자신이 따온 매출, 브랜딩 기여를 길게 쌓아 지금 행동의 정당성을 먼저 만든다."
      },
      {
        "id": "partnership-11:b:tell:betrayal_zoom",
        "appliesWhen": [
          "cornered",
          "hurt",
          "emotional"
        ],
        "lexicalHooks": [
          "그 계약 한 장이",
          "그날 이후로",
          "그게 다 말해주잖아요"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "지점 계약 한 장을 전체 관계 파탄의 증거처럼 크게 확대해 말한다."
      },
      {
        "id": "partnership-11:b:tell:moral_pivot",
        "appliesWhen": [
          "emotional",
          "cornered",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "그렇게까지 대비해야 했던 이유를",
          "누가 먼저 몰았는지",
          "제가 왜 그랬겠어요"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "별도 법인 준비를 묻는 질문에는 곧바로 '그렇게까지 대비해야 했던 이유를 보라'며 도덕 판단으로 방향을 튼다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-11:beat:a:d-1:deny",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "정식 오픈을 밀어붙인 게 아닙니다. 성수 건은 그냥 기회를 날리지 않으려던 선확보였습니다.",
      "behaviorHint": "계약서 페이지 대신 손익표와 일정표를 먼저 꺼내 보인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-1:hedge",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "임대차 문서와 이체가 있었던 건 맞습니다. 다만 hold 마감 때문에 임시로 걸어 둔 조치였고 최종 확정은 아니었습니다.",
      "behaviorHint": "눈을 마주치지 않고 시간표를 순서대로 읊는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-1:partial",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 먼저 계약서와 보증금을 움직인 건 맞습니다. 그때는 놓치면 끝이라고 봐서 우선 확보라고 판단했습니다.",
      "behaviorHint": "짧게 인정한 뒤 곧바로 '우선 확보'라는 표현을 반복한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-1:blame",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "아린 씨 쪽 답이 계속 늦었습니다. 운영총괄인 제가 마감 앞에서 아무것도 안 할 수는 없었습니다.",
      "behaviorHint": "손가락으로 테이블을 두드리며 상대의 지연을 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-1:confession",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "본법인 명의로 6개월 임대차계약을 체결했고 보증금 1,500만원도 공동승인 없이 집행했습니다. 절차 위반이 맞습니다. 그 선택은 제 책임입니다.",
      "behaviorHint": "서류를 내려놓고 낮은 목소리로 책임을 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-1:evidence_hit",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "전자서명 시각과 이체번호까지 같으면 더 숨길 건 없겠네요. 제가 먼저 움직인 건 부인하지 않겠습니다.",
      "behaviorHint": "계약서의 서명란을 보고 입술을 한 번 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-11:beat:a:d-3:deny",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "아린 씨가 순수 피해자인 척하는 건 사실관계와 다릅니다. 그 사람도 이미 다른 출구를 만들고 있었습니다.",
      "behaviorHint": "상대를 보지 않고 차갑게 잘라 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-3:hedge",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제 계약이 문제인 건 알아도 순수 피해자라는 표현은 틀립니다. 그 시점에 이미 별도 구조가 돌아가고 있었습니다.",
      "behaviorHint": "한 번 인정한 뒤 곧바로 반박 문장으로 넘어간다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-3:partial",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 지점 계약을 독단으로 한 사실과 별개로, 아린 씨도 법인과 거래처 분리를 준비했습니다. 한쪽만 피해자인 구조는 아니었습니다.",
      "behaviorHint": "문장 앞부분은 낮게, 뒷부분은 또렷하게 힘을 준다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-3:blame",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "저는 그 준비 사실을 알고 더 과하게 버텼습니다. 상대가 거짓말을 한다는 생각이 제 잘못까지 덮어줬다고 착각했습니다.",
      "behaviorHint": "어깨 힘이 빠지지만 여전히 상대를 곁눈질한다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-3:confession",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "아린 씨는 순수 피해자가 아니지만, 그렇다고 제가 가해 책임에서 벗어나는 것도 아닙니다. 두 사실이 같이 맞습니다.",
      "behaviorHint": "짧게 숨을 고른 뒤 문장을 분리해서 또박또박 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-3:evidence_hit",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "등기부 날짜가 제 계약 공개보다 앞서면, 제가 붙들고 있던 '순수 피해자' 그림은 깨집니다. 그 부분은 인정하겠습니다.",
      "behaviorHint": "등기부 날짜를 확인하고 눈썹이 굳는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-11:beat:a:d-5:deny",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "핵심 거래처나 상표 이슈는 조정 가능한 운영 문제라고 봤습니다. 단독 지점이 곧바로 불가능하다고 생각하진 않았습니다.",
      "behaviorHint": "법률 문구보다 오픈 일정표를 먼저 넘긴다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-5:hedge",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "세부 부속조항까지 다 본 건 아니지만, 문제 생기면 조정하면 된다고 생각했습니다. 불가능하다는 정도로 읽지는 않았습니다.",
      "behaviorHint": "말끝이 흐려지지만 '조정'이라는 단어를 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-5:partial",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "분리 운영 메모를 짜면서도 독점공급과 상표 범위를 가볍게 본 건 맞습니다. 실행 제약을 충분히 검토하지 못했습니다.",
      "behaviorHint": "메모를 바라보다가 마지막 문장에서 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-5:blame",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "법률의견서가 나오기 전까지는 이렇게까지 막히는 구조인 줄 심각하게 보지 못했습니다. 오픈 일정이 눈앞이라 계약 확인을 뒤로 미뤘습니다.",
      "behaviorHint": "변명하듯 말하다가 중간에 속도를 늦춘다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-5:confession",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "기존 법인 동의 없이 단독 지점이나 거래처 분리를 밀면 위약과 상표 분쟁이 같이 납니다. 그걸 놓친 채 실행 가능하다고 본 제 판단이 틀렸습니다. 그 부분은 제 책임입니다.",
      "behaviorHint": "법률의견서 문구를 읽다가 스스로 문장을 정정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:a:d-5:evidence_hit",
      "caseId": "partnership-11",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "분리 운영 메모랑 공급 구조가 이렇게 겹치면, 제가 실행 문턱을 너무 낮게 본 거네요. 그건 인정합니다.",
      "behaviorHint": "메모의 항목을 따라가다 손을 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-11:beat:b:d-2:deny",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "별도 법인은 혹시 모를 상황에 대비한 껍데기였어요. 거래처 전환을 확정한 적은 없습니다.",
      "behaviorHint": "목을 가다듬으며 말끝을 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-2:hedge",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "등기와 DM, 메일이 있었던 건 맞지만 세무 구조를 알아보는 수준이었어요. 그걸 바로 거래처 탈취 준비라고 보긴 어렵죠.",
      "behaviorHint": "과거 팝업 손실 이야기로 문장을 길게 열었다가 본론으로 들어온다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-2:partial",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "법인을 세우고 견적안을 만든 건 맞아요. 다만 재원 씨가 먼저 회사를 갈라버릴까 봐 백업 구조를 본 거였어요.",
      "behaviorHint": "한숨을 쉬고 '백업'이라는 표현에 힘을 준다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-2:blame",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "브랜드를 키운 제가 밀려나는 징후가 너무 많았어요. 그래서 핵심 거래처를 지켜보려면 따로 구조를 준비할 수밖에 없다고 느꼈습니다.",
      "behaviorHint": "자신의 기여를 하나씩 세다가 마지막에 목소리가 떨린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-2:confession",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 아린셀렉트F&B를 세우고 두 핵심 거래처에 전환 견적과 미팅 제안을 보낸 건 사실입니다. 그걸 숨긴 채 피해자처럼만 말한 건 제 잘못이에요.",
      "behaviorHint": "시선을 내리고 손끝을 만지작거린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-2:evidence_hit",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "등기부랑 원본 메일까지 같이 나오면 더는 '아이디어'라고만 할 수 없네요. 준비가 실제 수준이었다는 건 인정할게요.",
      "behaviorHint": "원본 메일 헤더를 보며 말이 잠시 끊긴다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-11:beat:b:d-3:deny",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 재원 씨의 일방적 확장 침해를 당한 피해자였어요. 그때 저는 브랜드를 지키려던 사람일 뿐이었습니다.",
      "behaviorHint": "피해 장면을 크게 그리듯 손을 펼친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-3:hedge",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "별도 구조를 생각한 적은 있어도 그건 피해를 막기 위한 상상 수준이었어요. 순수 피해자라는 그림이 크게 틀리진 않습니다.",
      "behaviorHint": "되묻는 어미를 붙여 동의를 유도한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-3:partial",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 계약서가 나오기 전부터 백업 구조를 본 건 맞아요. 하지만 그 출발은 제가 먼저 몰렸다는 공포였어요.",
      "behaviorHint": "문장을 인정으로 시작하지만 곧바로 숨이 가빠진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-3:blame",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "순수 피해자만은 아니었습니다. 저도 상대를 믿지 못해 먼저 출구를 만들었고, 그 불신은 재원 씨가 먼저 만든 거라고 느꼈어요.",
      "behaviorHint": "자책과 원망이 섞인 표정으로 말을 잇는다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-3:confession",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "재원 씨의 독단 계약도 사실이고 저의 별도 법인 준비도 사실입니다. 지금 갈등을 순수 피해자 대 가해자로만 말한 건 제 왜곡이었어요. 그건 제 잘못이에요.",
      "behaviorHint": "긴 침묵 뒤에 천천히 문장을 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-3:evidence_hit",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "계약서 날짜와 제 준비 시점이 같이 놓이면, 제가 순수 피해자라고만 말할 수는 없겠네요. 그 부분은 접겠습니다.",
      "behaviorHint": "계약서와 등기부를 번갈아 보다 목이 잠긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-11:beat:b:d-4:deny",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "공동 기회 조항을 깬 건 재원 씨 쪽이에요. 저는 밀려나는 상황에서 방어만 한 겁니다.",
      "behaviorHint": "피해 호소를 앞세우며 손을 가슴 쪽으로 모은다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-4:hedge",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "별도 법인 구상은 있었어도 실제 공동 기회를 빼돌린 건 아니었어요. 그걸 바로 조항 위반이라고 보긴 어렵죠.",
      "behaviorHint": "질문 끝에 짧게 되묻는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-4:partial",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "합의상 별도 법인도 공동 기회라는 건 알고 있었어요. 그런데 그 무렵엔 제가 배제된다고 느껴 공개를 미뤘습니다.",
      "behaviorHint": "인정하는 순간 목소리가 낮아지고 손가락을 꼼지락거린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-4:blame",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "재원 씨가 먼저 지점 lease를 움직였기 때문에 저도 거래처 방어선을 따로 쌓았어요. 적어도 저 혼자 그 조항을 무너뜨린 건 아니에요.",
      "behaviorHint": "상대 쪽을 향해 고개를 들어 원인을 짚는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-4:confession",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저는 별도 법인과 거래처 전환 준비로, 재원 씨는 단독 지점 계약으로 공동 기회 조항을 함께 무너뜨렸습니다. 저도 책임을 피할 수 없어요.",
      "behaviorHint": "마지막 문장에서 힘이 빠지며 눈을 내리깐다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-11:beat:b:d-4:evidence_hit",
      "caseId": "partnership-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "승인 시트와 제 우선순위 시트가 같이 나오면 '방어만 했다'고 버티기 어렵네요. 저도 합의를 따로 비켜 간 건 맞습니다.",
      "behaviorHint": "서류 위에 올린 손을 천천히 거둔다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    }
  ]
} as const;

export default partnership11TellsBeats;

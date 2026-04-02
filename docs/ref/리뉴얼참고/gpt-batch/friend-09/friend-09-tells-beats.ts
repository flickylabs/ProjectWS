export const friend09TellsBeats = {
  "caseId": "friend-09",
  "executableTells": {
    "a": [
      {
        "id": "friend09:a:tell:quote_reassembly",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "원문",
          "그 문장",
          "순서대로",
          "그대로 읽으면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 질문이 나오면 상대 문장을 한 줄씩 다시 읽으며 자기 해석이 아니라 원문이라는 인상을 만든다."
      },
      {
        "id": "friend09:a:tell:term_downgrade",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "정리",
          "공유",
          "표시",
          "재배열"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "'조언'과 '공유', '정리'와 '편집'을 구분하며 행위의 수위를 낮추려 한다."
      },
      {
        "id": "friend09:a:tell:cool_pause",
        "appliesWhen": [
          "emotional",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "파일명",
          "날짜",
          "시각",
          "그 캡처"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "화가 날수록 말을 줄이고 파일명과 날짜만 또박또박 읊는다."
      }
    ],
    "b": [
      {
        "id": "friend09:b:tell:pressure_preface",
        "appliesWhen": [
          "lying",
          "avoiding",
          "hurt"
        ],
        "lexicalHooks": [
          "그때 분위기가",
          "이미 이상했고",
          "제가 받은 압박이",
          "그 흐름에서"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "질문을 받으면 '그때 공구방 분위기가 이미 이상했고'라고 먼저 말해 자신의 행동이 반응일 뿐이었다는 틀을 만든다."
      },
      {
        "id": "friend09:b:tell:tool_minimizing",
        "appliesWhen": [
          "cornered",
          "defensive",
          "lying"
        ],
        "lexicalHooks": [
          "계정 하나",
          "도구만",
          "올린 건",
          "그건 별개잖아요"
        ],
        "sentenceShape": "question_end",
        "cadence": "once_every_2_turns",
        "originalPattern": "익명계정 개설을 묻으면 '계정 하나 판 거지 글 내용은 따로였잖아'라며 도구와 책임을 분리한다."
      },
      {
        "id": "friend09:b:tell:wounded_pause",
        "appliesWhen": [
          "emotional",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "제가 좀",
          "억울한 건",
          "숨 좀 고르고",
          "이용당한 느낌"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "억울할 때 대답 전 숨을 길게 쉬고 자신이 이용당했다는 정서를 먼저 깐다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "첫째, 제가 만든 이미지가 아니라 이미 돌던 걸 받은 겁니다. 둘째, 잘라 붙여서 조가람을 왜곡한 적은 없습니다.",
      "behaviorHint": "손가락으로 허공에 항목을 세듯 끊어 말하며, '정리'와 '편집'을 구분하는 어조를 유지한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-2:deny"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "원문 그대로 보면 여러 캡처를 한 폴더에 정리한 건 맞지만, 편집이라기보다 참고용 정리였어요. 밖으로 더 퍼질 줄은 몰랐습니다.",
      "behaviorHint": "상대 표현을 짧게 되풀이한 뒤, 파일명이나 날짜처럼 차가운 정보로 말을 흘린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-2:hedge"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "후기와 DM을 한 장에 붙여 보기 쉽게 만든 건 맞습니다. 다만 상습 문제 셀러처럼 보이게 하려던 건 아니라 비교하려던 거였어요.",
      "behaviorHint": "시선은 자료에 두고 인정할 부분만 잘게 끊어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-2:partial"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "말풍선 일부와 환불 뒤 문장을 뺀 건 제 선택이었습니다. 그리고 그래도 커뮤니티에서 더 세게 소비되게 만든 건 도건 쪽 확산 방식이 컸어요.",
      "behaviorHint": "말수는 줄이되 끝 문장에서만 상대 책임을 건조하게 밀어 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-2:blame"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "파일명과 시각부터 보면 숨길 수 없어요. 콜라주 이미지는 제가 직접 만들었고, 어떤 후기와 DM을 남기고 뺄지 제가 골랐습니다. 오픈채팅과 지인 쪽 재유포까지 제가 했고 조가람이 상습 문제 셀러처럼 읽히길 의도했습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 날짜와 파일명을 먼저 읊고, 마지막 문장에서 의도를 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-2:confession"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "편집앱 프로젝트 파일까지 맞춰 보면 더는 '정리'라고만 못 하겠습니다. 가람이 저를 공개 지적했던 기억이 남아서 정상 응대 부분을 굳이 안 넣었습니다. 그때는 사실 확인보다 불리해 보이게 만드는 게 먼저였어요.",
      "behaviorHint": "증거를 보는 순간 표정이 굳고, 곧바로 용어를 낮추려다 결국 핵심을 인정한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-5",
      "id": "friend09:beat:a:d-2:evidence_hit"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "첫째, 시즌마켓 직전에 일부러 판을 흔들려고 공모한 적 없습니다. 둘째, 그때는 가람 때문에 다들 시끄러웠고 저도 피해를 막으려던 거였어요.",
      "behaviorHint": "손가락으로 허공에 항목을 세듯 끊어 말하며, '정리'와 '편집'을 구분하는 어조를 유지한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-4:deny"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "원문 그대로 보면 조가람 얘기를 서로 한 건 맞지만 경쟁자 매장을 떨어뜨리자는 식의 계획은 아니었습니다. 감정 섞인 푸념이 과장돼 보이는 겁니다.",
      "behaviorHint": "상대 표현을 짧게 되풀이한 뒤, 파일명이나 날짜처럼 차가운 정보로 말을 흘린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-4:hedge"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "부스 심사 전 타이밍을 의식하고 자료를 모은 건 맞아요. 그래도 처음부터 제거용 공모라고 부를 정도로 냉정하게 짠 건 아니었습니다.",
      "behaviorHint": "시선은 자료에 두고 인정할 부분만 잘게 끊어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-4:partial"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "예전 라벨 공개 지적 건이 머리에 남아 있어서 시즌마켓 전에 가람 신뢰를 흔들고 싶었던 마음은 있었습니다. 그리고 도건도 그 감정을 알고 같이 움직였고 저 혼자 복수극을 만든 건 아닙니다.",
      "behaviorHint": "말수는 줄이되 끝 문장에서만 상대 책임을 건조하게 밀어 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-4:blame"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "파일명과 시각부터 보면 숨길 수 없어요. 우리는 시즌마켓 심사 직전에 조가람 신뢰를 떨어뜨리기 위해 역할을 나눠 공모했습니다. 제 오래된 앙금과 도건의 손실 기억을 동력으로 삼아 판을 흔들려 했습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 날짜와 파일명을 먼저 읊고, 마지막 문장에서 의도를 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-4:confession"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "원본 메신저 대화까지 맞춰 보면 더는 '정리'라고만 못 하겠습니다. 직접적 매출 손실을 겪고도 웃으며 넘긴 척했는데 심사 직전이 되자 복수심이 다시 올라왔습니다. 그래서 익명 폭로와 후기 캡처를 같이 굴리면 부스 평가가 흔들릴 거라 계산했습니다.",
      "behaviorHint": "증거를 보는 순간 표정이 굳고, 곧바로 용어를 낮추려다 결국 핵심을 인정한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2",
      "id": "friend09:beat:a:d-4:evidence_hit"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "첫째, 폭로가 들통난 뒤에도 저는 옛 분쟁을 숨기려 한 적 없습니다. 둘째, 도건이 먼저 이상하게 움직여서 저도 뒤늦게 대응한 거예요.",
      "behaviorHint": "손가락으로 허공에 항목을 세듯 끊어 말하며, '정리'와 '편집'을 구분하는 어조를 유지한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-5:deny"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "원문 그대로 보면 가람과 예전에 마찰이 있었던 건 사실이지만 이번 소명에서 굳이 꺼낼 필요는 없다고 본 거예요. 책임을 넘기려 한 건 아니라 상황을 단순하게 설명한 겁니다.",
      "behaviorHint": "상대 표현을 짧게 되풀이한 뒤, 파일명이나 날짜처럼 차가운 정보로 말을 흘린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-5:hedge"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "운영자와 친구들에게 예전 분쟁을 뺀 건 맞아요. 그 얘기까지 나오면 제가 사적인 앙금으로 움직인 사람처럼 보일까 봐 겁났습니다.",
      "behaviorHint": "시선은 자료에 두고 인정할 부분만 잘게 끊어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-5:partial"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "도건이 먼저 저를 끌어들였다고 했고 저도 그 틀에 기대서 각자 따로 말했습니다. 그리고 공동 준비 사실을 뺀 채 상대를 더 앞세운 건 분명한 책임전가였어요.",
      "behaviorHint": "말수는 줄이되 끝 문장에서만 상대 책임을 건조하게 밀어 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-5:blame"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "파일명과 시각부터 보면 숨길 수 없어요. 우리는 과거 가람 분쟁과 공동 준비 사실을 숨긴 채 서로를 단독 주범처럼 말했습니다. 그건 사후 방어가 아니라 책임전가였고 친구 사이 신뢰를 마지막까지 망가뜨린 행동이었습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 날짜와 파일명을 먼저 읊고, 마지막 문장에서 의도를 인정한다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:a:d-5:confession"
    },
    {
      "caseId": "friend-09",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "운영자 소명 대화까지 맞춰 보면 더는 '정리'라고만 못 하겠습니다. 사실 제일 부끄러웠던 건 8개월 전 일을 아직도 못 놓고 있었다는 점입니다. 그래서 들통난 뒤에도 사실표 대신 변명부터 만들었습니다.",
      "behaviorHint": "증거를 보는 순간 표정이 굳고, 곧바로 용어를 낮추려다 결국 핵심을 인정한다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-6",
      "id": "friend09:beat:a:d-5:evidence_hit"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그때 분위기가 이미 이상했고요. 문제 계정이 제 거라고 단정할 수는 없습니다. 계정 하나 만들었다는 말이 왜 제가 폭로글까지 올렸다는 뜻이 되죠.",
      "behaviorHint": "숨을 한번 길게 들이쉰 뒤 커뮤니티 분위기와 압박을 먼저 늘어놓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-1:deny"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제가 숨 좀 고르고 말씀드리면, 보조 메일로 새 계정을 판 건 맞아도 그걸 실사용까지 한 건 별개입니다. 글까지 제가 올렸다고 보기엔 그때 커뮤니티 분위기가 이미 끓고 있었어요.",
      "behaviorHint": "질문 끝을 되묻듯 받아치며 행동과 도구를 분리해 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-1:hedge"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "계정 생성과 로그인은 제가 했습니다. 그래도 하지만 최종 글 방향은 이미 유리가 넘긴 자료와 분위기 때문에 정해져 있었어요.",
      "behaviorHint": "어깨를 움츠리고 자기 몫을 인정하되 곧바로 상대 준비물을 끌어온다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-1:partial"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "첫 댓글이랑 삭제 시도까지 제 손에서 나간 건 맞습니다. 그런데 그래도 저는 도구를 잡은 쪽이었고 어떤 내용을 얹을지는 유리와 같이 맞췄습니다.",
      "behaviorHint": "억울한 표정을 유지한 채 자신은 실행 도구였다는 프레임을 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-1:blame"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "더는 도구 얘기로만 못 버팁니다. 익명 계정은 제가 보조 메일과 기기로 만들었고 최종 폭로글과 첫 댓글도 제가 올렸습니다. 다만 그 게시가 혼자 튀어나온 건 아니고 유리와 맞춘 문구와 자료를 들고 제가 실행했습니다.",
      "behaviorHint": "목이 잠긴 듯 한 박자 쉬고, 자신이 숨긴 결정 장면을 낮게 털어놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-1:confession"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "운영자 로그까지 나오면 잘라 말해도 소용이 없죠. 운영자 문의가 오자마자 지우자고 상의한 건 제가 이미 제 일인 걸 알고 있었기 때문입니다. 그때는 혼자 뒤집어쓰면 끝날 줄 알고 더 잘라 말했어요.",
      "behaviorHint": "증거가 들이밀리면 먼저 숨을 고르고, 더는 잘라 말할 수 없다는 듯 시선을 떨군다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-4",
      "id": "friend09:beat:b:d-1:evidence_hit"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그때 분위기가 이미 이상했고요. 이걸 제 단독 범행이라고 하는 건 말이 안 됩니다. 유리가 자료랑 말투를 다 짜 놓고 저는 계정만 만든 거예요.",
      "behaviorHint": "숨을 한번 길게 들이쉰 뒤 커뮤니티 분위기와 압박을 먼저 늘어놓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-3:deny"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 숨 좀 고르고 말씀드리면, 최종 버튼은 제가 눌렀어도 내용은 거의 유리 쪽 준비물이었다고 보시면 됩니다. 저 혼자 누군가를 박살내려 했던 건 아니에요.",
      "behaviorHint": "질문 끝을 되묻듯 받아치며 행동과 도구를 분리해 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-3:hedge"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "단독은 아니지만 제가 더 눈에 띄는 자리를 잡은 건 맞습니다. 그래도 유리가 문구와 이미지의 골격을 제공했고 저는 게시 실행을 맡았습니다.",
      "behaviorHint": "어깨를 움츠리고 자기 몫을 인정하되 곧바로 상대 준비물을 끌어온다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-3:partial"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "공모였는데도 저는 계속 도구만 잡은 사람처럼 잘라 말했습니다. 그런데 실제로는 첫 댓글 톤과 삭제 타이밍까지 제가 조절했어요.",
      "behaviorHint": "억울한 표정을 유지한 채 자신은 실행 도구였다는 프레임을 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-3:blame"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "더는 도구 얘기로만 못 버팁니다. 문제의 명예훼손은 제 단독 범행이 아니라 유리와 제가 역할을 나눠 벌인 공모였습니다. 유리는 설계와 자료를, 저는 계정과 업로드를 맡았고 둘 다 결과를 원했습니다.",
      "behaviorHint": "목이 잠긴 듯 한 박자 쉬고, 자신이 숨긴 결정 장면을 낮게 털어놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-3:confession"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 메신저 대화까지 나오면 잘라 말해도 소용이 없죠. 유리 뒤에 숨으면 제 책임이 반으로 줄 것 같아서 계속 혼자 한 건 아니라고만 반복했습니다. 그 말 속에 제가 한 결정들을 일부러 뭉갰어요.",
      "behaviorHint": "증거가 들이밀리면 먼저 숨을 고르고, 더는 잘라 말할 수 없다는 듯 시선을 떨군다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-2",
      "id": "friend09:beat:b:d-3:evidence_hit"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그때 분위기가 이미 이상했고요. 운영자에게는 제가 본 사실만 말했지 책임을 떠넘긴 적은 없습니다. 예전 가람 일이 이번이랑 무슨 상관이죠.",
      "behaviorHint": "숨을 한번 길게 들이쉰 뒤 커뮤니티 분위기와 압박을 먼저 늘어놓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-5:deny"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 숨 좀 고르고 말씀드리면, 과거 분쟁까지 소명에 넣지 않은 건 맞지만 일단 급해서 핵심만 말한 겁니다. 유리가 저를 먼저 잘라낼 줄은 몰랐어요.",
      "behaviorHint": "질문 끝을 되묻듯 받아치며 행동과 도구를 분리해 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-5:hedge"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예전 앙금과 공동 준비 사실을 뺀 채 제가 끌려갔다고 말한 건 사실입니다. 그래도 그렇게 해야 제가 최소한 덜 악질처럼 보일 거라 생각했어요.",
      "behaviorHint": "어깨를 움츠리고 자기 몫을 인정하되 곧바로 상대 준비물을 끌어온다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-5:partial"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "유리도 같이 준비한 건 알지만 저는 계속 이용당한 사람처럼 말했습니다. 그런데 운영자한테는 예전 얘기 빼자고 먼저 맞춘 것도 저예요.",
      "behaviorHint": "억울한 표정을 유지한 채 자신은 실행 도구였다는 프레임을 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-5:blame"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "더는 도구 얘기로만 못 버팁니다. 폭로가 드러난 뒤 우리는 8개월 전 가람 분쟁과 공동 준비 사실을 숨긴 채 서로를 단독 주범처럼 설명했습니다. 저도 체면을 지키려고 그 틀을 이용했고 그게 책임전가였다는 걸 인정합니다.",
      "behaviorHint": "목이 잠긴 듯 한 박자 쉬고, 자신이 숨긴 결정 장면을 낮게 털어놓는다.",
      "applicableStates": [
        "S4",
        "S5"
      ],
      "afterEvidence": null,
      "id": "friend09:beat:b:d-5:confession"
    },
    {
      "caseId": "friend-09",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "운영자 소명 대화까지 나오면 잘라 말해도 소용이 없죠. 8개월 전 손실을 아직 품고 있었다는 걸 인정하면 제가 너무 옹졸해 보일까 봐 무서웠습니다. 그래서 들통난 뒤에도 유리 뒤에 숨어 면피할 문장부터 찾았습니다.",
      "behaviorHint": "증거가 들이밀리면 먼저 숨을 고르고, 더는 잘라 말할 수 없다는 듯 시선을 떨군다.",
      "applicableStates": [
        "S1",
        "S2",
        "S3"
      ],
      "afterEvidence": "e-6",
      "id": "friend09:beat:b:d-5:evidence_hit"
    }
  ]
}

export const spouse05TellsBeats = {
  "caseId": "spouse-05",
  "executableTells": {
    "a": [
      {
        "id": "spouse05:a:tell:rule_speak",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "권한",
          "프로토콜",
          "보안",
          "접근범위"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "문제를 묻으면 '권한이 없었어', '프로토콜상 안 돼'처럼 관계 갈등을 규정 위반 언어로 바꿔 말한다."
      },
      {
        "id": "spouse05:a:tell:timeline_fogging",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "택배",
          "렌더",
          "백업",
          "클라이언트"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "택배 수령, 렌더 확인, 백업 정리 같은 세부 동선을 길게 나열해 핵심 질문을 늦춘다."
      },
      {
        "id": "spouse05:a:tell:partial_admission",
        "appliesWhen": [
          "shame",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "정리한 거야",
          "소리만",
          "핵심만",
          "설명용"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "편집을 추궁받으면 '소리만 좀 정리한 거야'처럼 일부만 인정하며 의도를 축소한다."
      }
    ],
    "b": [
      {
        "id": "spouse05:b:tell:numeric_comparison",
        "appliesWhen": [
          "lying",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "12분",
          "한 번만",
          "딱",
          "잠깐"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "'난 12분만 썼어', '한 번만 들어갔어'처럼 자신의 침범을 분 단위로 줄여 말한다."
      },
      {
        "id": "spouse05:b:tell:motive_jump",
        "appliesWhen": [
          "hurt",
          "emotional",
          "defensive"
        ],
        "lexicalHooks": [
          "그러니까",
          "덜 중요",
          "네 일만",
          "지위"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "행동 하나를 곧바로 '그러니까 내 일은 덜 중요하단 거잖아' 같은 의도 단정으로 연결한다."
      },
      {
        "id": "spouse05:b:tell:selective_confession",
        "appliesWhen": [
          "cornered",
          "shame",
          "avoiding"
        ],
        "lexicalHooks": [
          "들어간 건 맞아",
          "그건 했어",
          "근데 그 뒤는",
          "나중에 말할게"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "서재에 들어간 사실은 인정해도 마이크 사용이나 자료 검색 같은 부가 행동은 뒤늦게 조금씩 꺼낸다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse05:beat:a:d-2:deny",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "권한을 빼앗은 게 아니라 보안주간 설정을 조정한 겁니다. 접근 범위를 잠깐 손본 걸 독점으로 부르면 곤란합니다.",
      "behaviorHint": "턱을 들고 일정표를 먼저 언급한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-2:hedge",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "전일 블록이 길어 보였을 수는 있습니다. 그때는 클라이언트 요청이 연달아 붙어 있었어요.",
      "behaviorHint": "시선을 피하며 달력을 손가락으로 짚는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-2:partial",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "제가 권한을 혼자 바꾼 건 맞습니다. 그래도 파일이랑 장비가 얽힌 방이라 임시 조치라고 본 겁니다.",
      "behaviorHint": "작게 한숨을 쉬고 '임시'를 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-2:blame",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "문제는 그 전에 이미 코드가 남아 있었다는 점이죠. 통제가 느슨했으니 제가 더 세게 잠근 겁니다.",
      "behaviorHint": "어깨를 굳히고 책임을 분산시키려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-2:confession",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "결국 서재를 공유 공간이 아니라 제 작업실처럼 다뤘습니다. 보안 불안을 핑계로 소담 씨 권한을 일방적으로 줄였습니다.",
      "behaviorHint": "목소리가 낮아지고 손을 모은다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-2:evidence_hit",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "…11시 47분 알림까지 남아 있네요. 제가 같은 날 상의하지 않았다는 건 부인하기 어렵겠습니다.",
      "behaviorHint": "말끝이 짧아지고 캘린더 화면을 오래 본다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "spouse05:beat:a:d-4:deny",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "원본을 바꾼 게 아니라 듣기 좋게 정리한 겁니다. 의미를 뒤집은 편집은 아니에요.",
      "behaviorHint": "입술을 굳게 다물고 '정리'라는 단어를 반복한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-4:hedge",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "편집 앱으로 export한 건 맞아도 설명용 클립일 뿐입니다. 그걸 조작이라고까지 부르는 건 과합니다.",
      "behaviorHint": "말의 주어를 흐리고 손짓으로 범위를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-4:partial",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "두 원본에서 필요한 구간만 뽑은 건 맞습니다. 당시엔 핵심 문장만 보여주면 된다고 생각했습니다.",
      "behaviorHint": "고개를 조금 숙이지만 곧바로 이유를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-4:blame",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그 문장들이 나온 배경에는 실제 갈등이 있었어요. 저는 맥락을 줄인 거지, 없는 말을 만든 건 아니라고 버텼던 겁니다.",
      "behaviorHint": "손바닥을 펼치며 '없던 말을 만든 건 아니다'를 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-4:confession",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "오한결 씨에게 두 날짜 파일을 보내 하나처럼 들리게 정리하게 했고, 그걸 원본처럼 내밀었습니다. 제 평판을 지키려다 선을 넘었습니다.",
      "behaviorHint": "한 번 눈을 감았다가 천천히 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-4:evidence_hit",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "오한결 씨 대화랑 렌더 로그까지 붙으면 더는 '정리'라고만 말하기 어렵네요. 제가 만든 형식이 이미 원본의 경계를 넘었습니다.",
      "behaviorHint": "목이 잠기고 시선이 아래로 떨어진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse05:beat:a:d-5:deny",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그날이 망가진 건 결국 소담 씨가 제 블록을 깨고 들어왔기 때문입니다. 그 선만 안 넘었으면 됐습니다.",
      "behaviorHint": "단호하게 선을 긋는 제스처를 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-5:hedge",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "회선 문제나 일정 겹침이 있었던 건 맞아도, 직접 파국을 만든 건 무단 출입이었습니다.",
      "behaviorHint": "짧게 인정한 뒤 곧장 결론을 되돌린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-5:partial",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "거실 인터넷이 흔들리고 일정이 겹친 건 압니다. 다만 저는 그 변수들보다 출입 위반을 먼저 본 겁니다.",
      "behaviorHint": "어깨를 누르듯 낮추며 문장을 끊는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-5:blame",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 권한을 잠근 건 사실이지만, 그 전에 서재 경계가 이미 흔들리고 있었어요. 그래서 더 세게 통제한 겁니다.",
      "behaviorHint": "보안 압박을 길게 설명해 시간을 번다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-5:confession",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "이제 보니 파국을 소담 씨 침범 하나로 몰 수는 없습니다. 제 봉쇄와 회선 문제, 일정 충돌이 다 겹쳤습니다.",
      "behaviorHint": "고개를 천천히 끄덕이며 말을 정리한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:a:d-5:evidence_hit",
      "caseId": "spouse-05",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "13시 41분 장애 접수와 14시 15분, 14시 30분 일정이 같이 뜨면 얘기가 단순해지진 않네요. 환경 변수도 분명 있었습니다.",
      "behaviorHint": "달력과 문자 기록을 번갈아 보며 말이 느려진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "spouse05:beat:b:d-1:deny",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 서재를 점거한 게 아니라 12분만 급히 쓴 겁니다. 그걸 바로 침범으로만 부르긴 억울해요.",
      "behaviorHint": "손가락으로 짧은 시간을 표시한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-1:hedge",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "들어간 건 맞아도 심사 직전이라 한 번 버티려던 거였어요. 일부러 규칙을 깨서 흔들어 놓으려던 건 아니었습니다.",
      "behaviorHint": "속도를 높여 이유를 먼저 늘어놓는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-1:partial",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "구 관리자 코드를 쓴 건 맞습니다. 거실 회선이 흔들려서 그때는 그 선택밖에 안 보였어요.",
      "behaviorHint": "입술을 깨물고 숫자를 줄이듯 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-1:blame",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 사전 고지 못 한 건 잘못이지만, 민재 씨가 이미 방을 잠가 두고 있었잖아요. 저는 늘 밀린 자리에서 급히 반응한 겁니다.",
      "behaviorHint": "상체가 앞으로 쏠리고 억울함이 묻어난다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-1:confession",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "민재 씨 예약 블록에 허락 없이 들어간 건 제 잘못입니다. 일을 망치려 들어간 게 아니라 심사를 살리려다 선을 넘었습니다.",
      "behaviorHint": "한 박자 쉬고 책임을 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-1:evidence_hit",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "14시 08분 출입기록이랑 제 노트북 접속까지 찍히면 더는 '잠깐 문만 열어봤다'고는 못 하겠네요. 들어가서 바로 일한 건 맞습니다.",
      "behaviorHint": "어깨가 내려가고 손을 접는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse05:beat:b:d-3:deny",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 민재 씨 회의를 망치겠다고 협박한 적 없어요. 그 파일은 그렇게 들리게 잘린 거예요.",
      "behaviorHint": "눈썹을 좁히고 즉각 부인한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-3:hedge",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "거친 말이 있었던 건 맞지만, 그건 책상 배치랑 백업 문제로 욱한 거였어요. 실제 방해 예고는 아니었습니다.",
      "behaviorHint": "말끝을 다듬으면서도 억울함이 남는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-3:partial",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "제가 화난 톤으로 말한 건 인정합니다. 그래도 녹취 속 두 문장은 같은 날, 같은 맥락이 아닙니다.",
      "behaviorHint": "짧게 인정한 뒤 날짜를 또박또박 짚는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-3:blame",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제 말투를 탓할 수는 있어도, 두 날짜 문장을 이어 붙여 버리면 의미가 완전히 달라지잖아요. 그건 제 책임만으로 못 돌립니다.",
      "behaviorHint": "손바닥을 펼쳐 두 조각이 붙었다는 식으로 보인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-3:confession",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 화를 참지 못하고 거친 말을 한 건 사실입니다. 민재 씨 회의를 방해하겠다는 뜻까지 담긴 건 아니었지만, 그렇게 들릴 수 있는 말을 한 건 제 잘못입니다.",
      "behaviorHint": "숨을 고른 뒤 낮고 선명하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-3:evidence_hit",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "7월 8일, 7월 11일 원본이 따로 뜨면 이제 설명이 됩니다. 제가 왜 '같은 대화가 아니다'라고 했는지요.",
      "behaviorHint": "안도의 숨과 서운함이 동시에 비친다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse05:beat:b:d-5:deny",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "이 파국을 제 침범 하나로 설명하는 건 공정하지 않아요. 시작은 민재 씨가 공유 공간을 잠근 데 있었어요.",
      "behaviorHint": "즉시 공정성 프레임으로 받아친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-5:hedge",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "제가 잘한 건 아니어도, 거실 회선이 멀쩡하고 서재가 완전히 잠겨 있지 않았다면 그렇게까지 몰리진 않았습니다.",
      "behaviorHint": "문장 앞은 인정하고 뒤에서 방향을 튼다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-5:partial",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "마감이 급해서 제가 무단으로 들어간 선택이 나온 건 맞아요. 하지만 그 선택이 나온 환경도 같이 봐야 합니다.",
      "behaviorHint": "손끝을 모으며 억울함을 누른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-5:blame",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제 출입이 불을 붙였더라도 불쏘시개는 전용 블록, 회선 문제, 겹친 일정이었어요. 민재 씨 쪽 구조 책임도 큽니다.",
      "behaviorHint": "숫자를 세듯 원인을 하나씩 나열한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-5:confession",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "이제는 제 침범을 '잠깐'이라고만 줄여 말할 수 없습니다. 파국은 제 선택과 민재 씨의 봉쇄, 환경 문제가 한꺼번에 겹친 결과예요.",
      "behaviorHint": "어깨 힘이 빠지고 말이 또렷해진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse05:beat:b:d-5:evidence_hit",
      "caseId": "spouse-05",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "장애 접수 시간하고 두 일정표가 같이 놓이면, 저도 그날이 단순한 변명 거리만은 아니었다는 걸 보여줄 수 있네요. 동시에 제 무단 출입도 숨길 수는 없고요.",
      "behaviorHint": "표정이 누그러지지만 끝내 눈을 내리깐다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
} as const;

export default spouse05TellsBeats;

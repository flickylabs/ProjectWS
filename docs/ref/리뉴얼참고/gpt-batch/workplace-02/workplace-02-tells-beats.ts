export const workplace02TellsBeats = {
  "caseId": "workplace-02",
  "executableTells": {
    "a": [
      {
        "id": "workplace-02:a:tell:delay_frame",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "지금 그걸 따질 때가 아니다",
          "감사 끝나고 보자",
          "타이밍"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "'지금 그걸 따질 때가 아니다'라며 사실 판단보다 시기 문제를 앞세운다."
      },
      {
        "id": "workplace-02:a:tell:softened_order",
        "appliesWhen": [
          "cornered",
          "defensive",
          "shame",
          "lying"
        ],
        "lexicalHooks": [
          "그런 취지였다",
          "정리하자는 뜻",
          "권고였다"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "직접 지시를 했어도 '그런 취지로 말했을 뿐'이라며 명령을 조언처럼 줄인다."
      },
      {
        "id": "workplace-02:a:tell:topic_glide",
        "appliesWhen": [
          "avoiding",
          "lying",
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "감사 일정",
          "팀 안정",
          "불안정해진다"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "유출 경로 질문을 받으면 곧바로 감사 일정이나 팀 불안정 이야기로 화제를 미끄러뜨린다."
      }
    ],
    "b": [
      {
        "id": "workplace-02:b:tell:log_recital",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered",
          "avoiding"
        ],
        "lexicalHooks": [
          "로그상",
          "버전",
          "시각상"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "핵심 행위보다 파일명과 초 단위 시각을 길게 읊어 질문의 무게를 분산시킨다."
      },
      {
        "id": "workplace-02:b:tell:precision_wall",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "정확히 말하면",
          "기술적으로는",
          "범위를 나누면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "'정확히 말하면', '기술적으로는' 같은 표현으로 인정 범위를 아주 좁게 자른다."
      },
      {
        "id": "workplace-02:b:tell:jaw_set_pause",
        "appliesWhen": [
          "emotional",
          "hurt",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "...",
          "지금 말씀드리면",
          "한 번에 말씀드리죠"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "대답 전에 짧게 입을 다문 채 멈췄다가 한 번에 긴 문장으로 밀어붙인다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-02:beat:a:d-1:deny",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 징계가 아니라 잠정 차단이었습니다. 지금 그걸 따질 때가 아니라 감사 직전엔 그런 보안 조치가 먼저 갈 수 있습니다.",
      "behaviorHint": "시선을 옆으로 흘리며 손끝으로 책상 모서리를 두드린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-1:hedge",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "민아 씨 이름을 찍어 말한 적은 없습니다. 다만 그 시점엔 그쪽 접근을 잠시 묶어 두자는 뜻이었고, 그런 취지의 권고였습니다.",
      "behaviorHint": "질문 끝을 되묻듯 올리며 말을 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-1:partial",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "공식 사건번호 전 조정은 맞습니다. 하지만 감사 일정이 코앞이었고, 그 타이밍엔 확산 차단이 절차보다 앞선다고 판단했습니다.",
      "behaviorHint": "짧게 한숨을 쉬고 단어를 골라 천천히 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-1:blame",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "민아 씨 쪽 정황이 한두 개가 아니었습니다. 심야 다운로드, 외부 연락, 개인 저장 흔적이 겹치니 팀 안정이 순식간에 불안정해진다고 봤습니다.",
      "behaviorHint": "손가락으로 항목을 세듯 나열한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-1:confession",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "결국 제가 너무 빨리 한 사람을 범인처럼 봤습니다. 확인도 끝나기 전에 차단하고, 감사 일정 전에 팀을 정리하겠다는 마음으로 분위기까지 몰아간 건 제 잘못입니다.",
      "behaviorHint": "어깨를 굳힌 채 시선을 내리깔고 짧게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-1:evidence_hit",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "권한 회수가 52분 먼저였다는 기록이 나오면, 타이밍 문제로만 넘길 수는 없습니다. 제가 절차를 앞질렀다는 말은 피하기 어렵습니다.",
      "behaviorHint": "입술을 한 번 다문 뒤 말속도가 느려진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-02:beat:a:d-4:deny",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "입막음을 한 게 아닙니다. 감사 끝나고 보자, 정리 순서를 맞추자는 뜻이었습니다.",
      "behaviorHint": "손바닥을 아래로 내리며 진정시키려는 제스처를 한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-4:hedge",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "위험 메모도 낙인이 아니라 분류 차원이었습니다. 그런 취지였다, 정리하자는 뜻이었다는 말이 그렇게까지 읽힐 줄은 몰랐습니다.",
      "behaviorHint": "'그런 취지'라는 표현을 반복하며 톤을 낮춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-4:partial",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 메모는 먼저 들어갔습니다. 당시엔 제보와 유출 의심이 서로 엉켜 보여서, 감사 끝나고 보자는 권고가 먼저 나갔습니다.",
      "behaviorHint": "말끝을 자주 끊으며 스스로 표현을 수정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-4:blame",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "감사 직전에 비용 건까지 정식으로 올리면 라인이 무너질 수 있다고 봤습니다. 팀 안정이 불안정해지는 걸 막겠다고 혼선 통제를 먼저 택한 겁니다.",
      "behaviorHint": "턱을 문지르며 조직 구조를 설명하듯 장황해진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-4:confession",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 먼저 위험 인물 프레임을 깔고, 비용 건은 뒤로 미루게 했습니다. 정리하자는 뜻이었다고 말해도 결과적으로 제보를 막은 건 제 책임입니다.",
      "behaviorHint": "숨을 길게 내쉰 뒤 짧은 문장으로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-4:evidence_hit",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "HR 원본 로그가 나오면 부인하기 어렵습니다. 면담 전에 제가 먼저 방향을 적어 넣었고, 감사 끝나고 보자는 말이 사실상 제보를 눌렀습니다.",
      "behaviorHint": "목이 잠긴 듯 낮아진 목소리로 답한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-02:beat:a:d-5:deny",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 소문을 돌린 게 아니라 팀 불안을 관리한 겁니다. 이름을 찍어 말한 적도 없고, 확인 안 된 말을 더 키우지 말자는 취지였습니다.",
      "behaviorHint": "손을 펴 보이며 '과장'이라는 표정을 짓는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-5:hedge",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "공지 문구가 거칠었을 수는 있어도 특정인을 겨냥한 건 아니었습니다. 팀 안정 차원에서 불안을 진정시키자는 뜻이었습니다.",
      "behaviorHint": "말끝에 짧은 되물음을 붙이며 거리를 둔다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-5:partial",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "제 말과 공지가 합쳐지면 민아 씨로 읽힐 수 있었다는 건 인정합니다. 하지만 당시엔 감사 일정 앞에서 팀이 더 불안정해지지 않게 하자는 취지였습니다.",
      "behaviorHint": "고개를 한 번 끄덕이지만 시선은 피한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-5:blame",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "하지만 단톡에서 희생양 얘기와 상사 비리설을 키운 건 민아 씨 쪽입니다. 소문전은 한쪽만의 일이 아니었고, 감사 일정 내내 팀 안정이 더 흔들렸습니다.",
      "behaviorHint": "손가락으로 양쪽을 번갈아 가리키듯 균형을 주장한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-5:confession",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "공식 조사 전에 저도 여론을 움직이려 했습니다. 상대를 먼저 고립시키면 정리가 쉬울 거라 봤고, 그건 관리가 아니라 소문이었다는 점을 인정합니다.",
      "behaviorHint": "목소리가 갈라지며 마지막 문장을 짧게 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:a:d-5:evidence_hit",
      "caseId": "workplace-02",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "팀 공지와 접근권 회수 기록이 같이 나오면, 제가 불씨를 줄인 게 아니라 방향을 준 셈이 됩니다. 팀 안정이라는 말로 덮긴 어렵습니다.",
      "behaviorHint": "입꼬리를 굳히고 잠시 말을 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "workplace-02:beat:b:d-2:deny",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "개인 드라이브에 원본을 통째로 뺀 건 아닙니다. 외부 대화도 시각상 경력 상담 범위를 넘지 않았습니다.",
      "behaviorHint": "입을 다문 채 짧게 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-2:hedge",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "정확히 말하면, 보호용 메모와 초안 일부가 따로 저장된 겁니다. 기술적으로는 원본 전체 유출과 범위를 나누면 다른 문제예요.",
      "behaviorHint": "'정확히 말하면'을 반복하며 인정 범위를 좁힌다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-2:partial",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "... 한 번에 말씀드리죠. 업로드는 있었습니다. 로그상 익명 유출 얘기가 돈 뒤였고, 저도 잘릴까 봐 흔적을 남긴 겁니다.",
      "behaviorHint": "잠깐 침묵했다가 한 문장씩 밀어붙이듯 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-2:blame",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "외부 상담도 했습니다. 로그상 그 시각엔 이미 제가 먼저 찍혀 있었고, 안전한 내부 채널이 없다고 느꼈습니다.",
      "behaviorHint": "로그와 시각을 짚은 뒤 마지막에 상대 책임을 덧붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-2:confession",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "... 지금 말씀드리면, 무단 복사와 외부 상담 둘 다 했습니다. 최초 원본 유출과는 다르지만 제 보호를 이유로 선을 넘은 건 제 잘못입니다.",
      "behaviorHint": "입술을 굳게 다문 뒤 한 번에 길게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-2:evidence_hit",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "그 드라이브 기록이 뜨면 더는 저장 자체를 부정할 수 없습니다. 버전과 시각상 제가 말할 수 있는 건 동기와 범위뿐입니다.",
      "behaviorHint": "시선을 고정한 채 문장 길이가 길어진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-02:beat:b:d-3:deny",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "제가 원본 유출자라는 말은 성립하지 않습니다. 로그상 제 흔적을 가장 편한 답으로 붙인 겁니다.",
      "behaviorHint": "턱을 굳히고 짧은 부정을 반복한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-3:hedge",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "정확히 말하면, 제 개인 드라이브 흔적과 원본 반출 시점은 맞지 않습니다. 시각상 타임라인은 저를 가리키지 않아요.",
      "behaviorHint": "초 단위 시각을 먼저 꺼내며 차갑게 정리한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-3:partial",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "... 한 번에 말씀드리죠. 회수되지 않은 링크가 있었다면 흐름은 달라집니다. 제가 만진 파일보다 먼저 열린 경로와 버전을 먼저 보셔야 합니다.",
      "behaviorHint": "잠깐 멈춘 뒤 '링크'와 '시점'을 또박또박 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-3:blame",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "저는 억울해서 규원 실장님 의도를 단정해 버렸습니다. 하지만 기술적으로는 실제 문제를 링크와 토큰 관리 범위로 나눠 봐야 합니다.",
      "behaviorHint": "마지막 문장에서 건조한 비아냥이 스친다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-3:confession",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "... 지금 말씀드리면, 최초 원본 반출은 제가 아니었습니다. 다만 그 사실을 모르면서 규원 실장님 책임을 과장해 밀어붙인 건 인정합니다.",
      "behaviorHint": "고개를 살짝 들고 정확한 단어를 골라 결론만 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-3:evidence_hit",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "그 공유링크 기록만으로도 제 개인 드라이브보다 먼저 살아 있던 경로가 보입니다. 로그상 그 순간부터 저도 서사를 바꿔야 합니다.",
      "behaviorHint": "말하기 전 짧게 멈췄다가 속도를 높인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-02:beat:b:d-5:deny",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 소문을 퍼뜨린 게 아니라 방어적으로 반응한 겁니다. 시각상 이미 제 이름이 먼저 돌고 있었습니다.",
      "behaviorHint": "입꼬리를 굳힌 채 짧게 잘라 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-5:hedge",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "하소연은 했습니다. 정확히 말하면 단톡에서 숨 돌릴 틈 없이 한 말이었고, 그걸 소문전이라고 부르려면 먼저 불씨를 만든 쪽도 같이 봐야 합니다.",
      "behaviorHint": "문장 앞은 건조하고 뒤는 날카롭게 치고 올라간다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-5:partial",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 단톡에서 제가 희생양이라고 말했습니다. 그때는 공식 채널보다 그 말이 더 빨리 저를 지켜줄 거라 착각했습니다.",
      "behaviorHint": "손을 꽉 쥔 채 시선만 고정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-5:blame",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "... 한 번에 말씀드리죠. 감정이 올라오면서 상사 비리설 비슷한 말도 섞였습니다. 먼저 낙인찍힌 데 대한 반격이었지만 결과적으로는 저도 키웠습니다.",
      "behaviorHint": "숨을 한 번 멈췄다가 끝 문장을 낮게 떨어뜨린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-5:confession",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "지금 말씀드리면, 공식 조사 전에 저도 여론전에 기대었습니다. 살아남으려는 마음으로 단톡과 주변 말을 이용한 건 제 잘못입니다.",
      "behaviorHint": "어깨를 굳힌 채 변명 없이 끝낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-02:beat:b:d-5:evidence_hit",
      "caseId": "workplace-02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "그 드라이브 기록과 단톡 맥락이 붙으면 '방어만 했다'는 말은 오래 못 갑니다. 로그와 시각상 제가 먼저 여론을 건드린 부분이 남습니다.",
      "behaviorHint": "짧게 웃음기 없이 숨을 내쉰다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    }
  ]
}

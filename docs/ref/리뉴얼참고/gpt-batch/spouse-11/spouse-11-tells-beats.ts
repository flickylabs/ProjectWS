export const spouse11TellsBeats = {
  "caseId": "spouse-11",
  "executableTells": {
    "a": [
      {
        "id": "spouse11:a:tell:scope_split",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "캡처만",
          "들어간 건 맞지만",
          "변경은 안 했어",
          "저장은 했지"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "권한 침범을 추궁받으면 '캡처만 했지 보낸 건 아니야', '들어간 건 맞지만 변경은 안 했어'처럼 단계를 분리한다."
      },
      {
        "id": "spouse11:a:tell:visual_overload",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "사진 보세요",
          "캡처부터",
          "견적서도",
          "기록은 있어"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "문제가 된 행위를 묻는 대신 사진, 캡처, 견적서를 여러 장 연달아 꺼내 핵심 질문을 흐린다."
      },
      {
        "id": "spouse11:a:tell:result_reframe",
        "appliesWhen": [
          "shame",
          "hurt",
          "emotional",
          "lying"
        ],
        "lexicalHooks": [
          "다 살리려고",
          "결국은 복구",
          "망치려던 건 아니야",
          "수습하려고"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "'어차피 다 살리려고 한 거야'라며 의도보다 결과 개선 명분을 앞세운다."
      }
    ],
    "b": [
      {
        "id": "spouse11:b:tell:task_listing",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "주차 정산",
          "누수 확인",
          "자재 반품",
          "현장 정리"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "질문을 받으면 주차 정산, 누수 확인, 자재 반품처럼 자잘한 동선을 길게 나열한다."
      },
      {
        "id": "spouse11:b:tell:time_bargain",
        "appliesWhen": [
          "shame",
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "반나절만",
          "하루만",
          "잠깐",
          "조금 늦춘 거야"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "'반나절만 늦춘 거야', '하루만 두려던 거였어'처럼 피해 확대 결정을 시간 단위로 축소한다."
      },
      {
        "id": "spouse11:b:tell:question_flip",
        "appliesWhen": [
          "cornered",
          "defensive",
          "lying",
          "hurt"
        ],
        "lexicalHooks": [
          "그럼 너는",
          "뭐였는데",
          "그건 왜",
          "먼저 말해 봐"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "자신의 권한 변경을 묻는 순간 '그럼 네가 내 아이디로 들어간 건 뭐였는데?'라고 곧바로 되묻는다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse11:beat:a:d-1:deny",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "난 현장 정리 때문에 자료를 본 거예요. 남의 권한을 털어서 판을 흔든 사람처럼 몰아가진 말아 주세요.",
      "behaviorHint": "태블릿을 가슴 쪽으로 끌어안고 단정하게 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-1:hedge",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "들어간 건 맞아요. 그런데 캡처만 저장한 거지, 변경이랑 실행까지 한 것처럼 묶는 건 과해요.",
      "behaviorHint": "문장을 둘로 쪼개며 손가락으로 단계 구분을 짚는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-1:partial",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "로그인은 했어요. 그때는 꼬인 현장을 기록으로라도 붙잡아야 했거든요.",
      "behaviorHint": "자료 화면을 먼저 내밀고 표정은 굳힌다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-1:blame",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "공사중지 요청이 내 손에서 시작된 건 맞을 수 있어요. 하지만 승호 씨가 권한을 움켜쥐고 설명을 미루니까 나도 자료부터 확보하려 한 거예요.",
      "behaviorHint": "시선을 옆으로 빼며 상대 쪽을 짧게 가리킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-1:confession",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 제 손으로 승호 계정과 도어락 권한을 무단으로 써서 공사중지 요청과 CCTV 반출을 이어서 처리했어요. 통제권을 먼저 잡고 싶었습니다.",
      "behaviorHint": "말끝에서 숨을 길게 내쉬고 태블릿을 내려놓는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-1:evidence_hit",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "한 세션으로 붙어 버리면 더는 '저장만 했다'고 밀기 어렵네요. 제가 선을 넘은 건 맞아요.",
      "behaviorHint": "감사로그 화면을 보고 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse11:beat:a:d-3:deny",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "큰 손상은 기본적으로 시공사 하자에서 시작됐어요. 내가 저장한 캡처만으로 우리가 판을 키웠다고 단정할 순 없어요.",
      "behaviorHint": "캡처 이미지를 정렬해 책상 위에 펼친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-3:hedge",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "홍대성 씨 심야 재출입이 수상했으니까 자료를 남긴 거예요. 시공사 과실부터 보는 게 순서라고 생각했어요.",
      "behaviorHint": "사진과 알람 이력을 번갈아 가리키며 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-3:partial",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "초기 누수가 하자였던 건 맞지만, 이후 손상 흐름을 우리가 완전히 통제하지 못한 것도 맞아요. 그래도 그때는 시공사 책임을 먼저 잡아야 한다고 봤어요.",
      "behaviorHint": "문서의 앞부분만 넘기고 뒤쪽은 손으로 덮는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-3:blame",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "캡처를 유리한 장면 위주로 본 건 인정해요. 그런데 그때 현장 설명도, 긴급 대응도 전부 제때 오지 않았어요.",
      "behaviorHint": "서류를 가지런히 모으다가 마지막 문장에서 목소리가 날카로워진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-3:confession",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "초기 누수는 하자였지만 큰 손상은 우리 지연 대응과 선택적 자료 제시 때문에 커졌어요. 나는 심야 캡처와 사진 배열로 시공사 단독 책임처럼 보이게 만들려 했습니다.",
      "behaviorHint": "시선을 내리고 사진 순서표를 천천히 밀어놓는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-3:evidence_hit",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본이 아니라는 건 알고 있었어요. 그 장면이 제일 유리해 보여서 잘린 캡처를 먼저 내세웠습니다.",
      "behaviorHint": "트랩 캡처의 시간 정보를 보고 목이 잠긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "spouse11:beat:a:d-4:deny",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "보험금 얘기는 막막해서 꺼낸 한숨에 가까웠어요. 둘이 짜고 손상을 키웠다는 말은 받아들이기 어려워요.",
      "behaviorHint": "메신저 화면을 바로 닫고 시선을 고정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-4:hedge",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "천장이나 마루 비용을 보험으로 돌릴 수 있는지 묻긴 했어요. 하지만 그게 곧 손상을 일부러 키우자는 합의는 아니었어요.",
      "behaviorHint": "문장 끝마다 '가능성'이라는 말을 덧붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-4:partial",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "메신저에서 계산을 주고받은 건 맞아요. 그땐 예산 구멍을 어떻게든 메워야 한다는 생각뿐이었어요.",
      "behaviorHint": "대화 복원본을 보면서도 구체 금액 부분은 넘긴다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-4:blame",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "손상이 더 커 보이면 보험 범위가 넓어질 수 있다는 계산을 둘 다 했어요. 나만 몰아가면 그때 같이 숫자 맞춰 보던 승호 씨는 빠져나가는 거죠.",
      "behaviorHint": "차분하게 말하다가 마지막 문장에서 상대를 정면으로 본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-4:confession",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "우리는 보험금으로 천장, 마루, 일부 가구비까지 메울 수 있는지 계산하며 손상 확대를 사실상 공동 기획했어요. 나는 그 대화를 지우고도 상담일 뿐이라고 버텼습니다.",
      "behaviorHint": "손을 모아 쥔 채 한 문장씩 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:a:d-4:evidence_hit",
      "caseId": "spouse-11",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "삭제한 대화가 다시 살아나면 더는 '막연한 얘기'라고만 할 수 없네요. 사용처까지 계산한 건 사실이에요.",
      "behaviorHint": "복원된 메신저를 보자 어깨가 내려앉는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse11:beat:b:d-2:deny",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그때는 현장이 급했어요. 일부러 피해를 키우려고 건조를 늦춘 게 아니라 임시조치부터 해 놓은 거예요.",
      "behaviorHint": "손가락으로 할 일 순서를 세며 말수를 늘인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-2:hedge",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "제습기 전원이 잠깐 끊긴 건 맞아도 반나절만 정리하려던 수준이었어요. 권한 재설정도 혼선 막으려던 거고요.",
      "behaviorHint": "시간 단위를 먼저 말하고 뒤에 이유를 붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-2:partial",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "방문을 다음 날로 미루고 권한을 제 쪽으로 묶은 건 맞아요. 그래도 그때는 제가 현장을 잡아야 추가 사고가 안 난다고 봤어요.",
      "behaviorHint": "시선을 피한 채 체크리스트를 훑는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-2:blame",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "솔직히 손상 범위가 조금 더 보이면 보험 협상도 달라질 수 있겠다고 생각했어요. 하지만 그 판을 혼자 만든 것처럼 말하는 건 아니죠.",
      "behaviorHint": "말 끝을 흐리다가 상대 반응을 먼저 살핀다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-2:confession",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "저는 제습기 스마트플러그를 꺼 두고 긴급건조 방문을 다음 날로 미뤘고, 권한도 제 쪽으로 다시 묶었어요. 그건 임시조치가 아니라 손상 흐름을 제가 쥐려 한 결정이었어요.",
      "behaviorHint": "손으로 이마를 문지르며 짧게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-2:evidence_hit",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "로그가 이렇게 길게 남으면 '잠깐'이었다고만은 못 하겠네요. 제가 시간을 흥정한 건 맞아요.",
      "behaviorHint": "스마트플러그 시간대를 보고 한숨을 내쉰다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "spouse11:beat:b:d-3:deny",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "큰 손상은 시공사 하자에서 시작된 거예요. 초기 대응이 완벽하진 않아도 전적으로 우리 책임은 아니죠.",
      "behaviorHint": "턱을 당기고 단호하게 선을 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-3:hedge",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "하자가 먼저였고 저는 현장을 막아 보려다 순서가 꼬인 거예요. 시공사 쪽 재출입과 부실 설명이 더 컸다고 봤어요.",
      "behaviorHint": "자잘한 현장 동선을 길게 나열한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-3:partial",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "하자에서 시작된 건 맞지만 우리가 긴급조치를 제때 못 한 탓이 손상을 더 키운 것도 부인 못 해요. 그래도 전 수습한다고 생각했어요.",
      "behaviorHint": "말을 길게 끌다가 마지막에서만 짧게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-3:blame",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "시공사 하자를 앞세우면 제 지연 판단이 덜 보인다고 생각한 건 맞아요. 그렇다고 손상 서사를 혼자 만든 건 아니에요.",
      "behaviorHint": "손바닥을 펴 보이며 공동 책임을 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-3:confession",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "초기 누수는 시공사 하자와 연결됐지만 큰 손상은 제가 건조를 늦추고 우리가 자료를 유리하게 배열하면서 커졌어요. 시공사 단독 과실이라고 밀어붙인 건 제 체면을 지키려는 거짓말이었어요.",
      "behaviorHint": "목소리가 낮아지며 마지막 문장을 거의 속삭이듯 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-3:evidence_hit",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "센서 곡선이 계단처럼 올라가면 더는 시공사 탓만 하긴 어렵죠. 제가 늦춘 시간이 그대로 남아 있네요.",
      "behaviorHint": "분석보고서의 그래프를 손끝으로 더듬는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse11:beat:b:d-4:deny",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "보험 얘긴 막힌 돈줄 때문에 한 소리였어요. 둘이 짜고 판을 만든 건 아니에요.",
      "behaviorHint": "입술을 굳게 다문 채 짧게 자른다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-4:hedge",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "지급금으로 뭘 메울 수 있는지 따져본 건 있어요. 그래도 그걸 손상을 키우자는 합의로 바로 묶는 건 억울해요.",
      "behaviorHint": "숫자를 말할 때만 또렷해지고 결론에서는 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-4:partial",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "예산 메모랑 메신저 대화가 남아 있는 건 맞아요. 그땐 잔금이랑 가구비를 어떻게 버틸지만 보였어요.",
      "behaviorHint": "메모 항목을 손으로 짚으며 현실 얘기였다고 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-4:blame",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "손상이 커 보이면 보험 범위가 넓어질 수 있다는 계산을 둘 다 했어요. 저만 생활 압박을 핑계 댄 것처럼 말하면 반쪽짜리 얘기죠.",
      "behaviorHint": "상대를 한번 본 뒤 책상 모서리를 두드린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-4:confession",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "우리는 보험금으로 천장, 마루, 붙박이장 비용까지 메울 수 있는지 함께 계산했고 손상 확대를 멈추지 않는 쪽으로 사실상 뜻을 맞췄어요. 저는 그걸 가족을 지키려는 선택인 것처럼 꾸며 버텼어요.",
      "behaviorHint": "말끝이 갈라지며 손을 내려다본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse11:beat:b:d-4:evidence_hit",
      "caseId": "spouse-11",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "복원된 대화에 사용처가 이렇게 남아 있으면 더는 살 길만 찾았다고 못 하겠네요. 선을 넘은 계산이었어요.",
      "behaviorHint": "복원 메신저를 읽다가 중간에 말을 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    }
  ]
} as const;

export default spouse11TellsBeats;

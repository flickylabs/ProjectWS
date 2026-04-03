export const workplace06TellsBeats = {
  "caseId": "workplace-06",
  "executableTells": {
    "a": [
      {
        "id": "workplace-06:a:tell:chaos_cover",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "통합 첫 2주",
          "전체 KPI"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "구체적 월권 여부를 묻는 질문에도 '그날은 시스템이 다 흔들렸다'며 혼란 자체를 방패로 쓴다."
      },
      {
        "id": "workplace-06:a:tell:temporary_language",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame"
        ],
        "lexicalHooks": [
          "잠깐 손댄 겁니다",
          "멈추지 않게 하려던 겁니다"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "'잠깐 손댄 거다', '임시로 돌린 거다'처럼 조치의 강도를 계속 축소한다."
      },
      {
        "id": "workplace-06:a:tell:order_skip",
        "appliesWhen": [
          "avoiding",
          "cornered",
          "emotional"
        ],
        "lexicalHooks": [
          "지연률",
          "매출"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "누가 먼저 승인 절차를 건너뛰었는지 대신 결과가 나빴다는 이야기로 점프한다."
      }
    ],
    "b": [
      {
        "id": "workplace-06:b:tell:quote_and_point",
        "appliesWhen": [
          "lying",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "문장 그대로 보시면",
          "'공동 승인'"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "상대가 남긴 공지 문장을 그대로 되읽으며 자기 월권 사실을 잠시 가린다."
      },
      {
        "id": "workplace-06:b:tell:permission_narrowing",
        "appliesWhen": [
          "cornered",
          "lying",
          "shame"
        ],
        "lexicalHooks": [
          "수정이 아니라 복구",
          "막기 위한 임시 조치"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "'수정'이 아니라 '복구'였다고 명칭을 바꾸며 권한 남용 범위를 줄인다."
      },
      {
        "id": "workplace-06:b:tell:sharp_overlap",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "박준호 씨 쪽도",
          "제 업무영역은"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "억울함이 커지면 상대 말을 끊고 자신의 업무영역 정의를 반복해 대화가 점점 더 충돌적으로 변한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "workplace-06:beat:a:d-1:deny",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "통합 첫 2주에 전체 KPI랑 지연률이 같이 흔들려서 흐름만 본 거예요. 저는 이서린 씨 계정을 직접 재배정하거나 기준을 바꾼 적은 없어요.",
      "behaviorHint": "시선을 아래로 두고 손가락으로 책상 가장자리를 두드린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-1:hedge",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "통합 첫 2주에 전체 KPI랑 매출이 밀려서 몇 건은 잠깐 손댄 겁니다. 멈추지 않게 하려던 겁니다만, 그걸 월권처럼 보실 정도는 아니에요.",
      "behaviorHint": "어깨를 좁히고 말을 고르며 속도를 늦춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-1:partial",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "통합 첫 2주에 전체 KPI와 지연률이 급해서 제가 계정을 건드린 건 맞아요. 다만 잠깐 손댄 겁니다, 멈추지 않게 하려던 겁니다.",
      "behaviorHint": "고개를 한 번 끄덕이고 바로 단서를 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-1:blame",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "통합 첫 2주에 전체 KPI랑 매출이 무너져서 제가 먼저 손댄 건 맞아요. 그래도 이서린 씨 쪽도 현장 정보를 쥐고 있어서, 저는 멈추지 않게 하려던 겁니다.",
      "behaviorHint": "말끝에서 상대 쪽을 잠깐 바라보며 책임을 나눈다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-1:confession",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "통합 첫 2주에 전체 KPI와 지연률이 흔들리자 제가 계정을 재배정하고 대시보드 기준까지 바꿨어요. 잠깐 손댄 겁니다라고 버틴 건 제 잘못이고, 공동 승인 안 지킨 제 책임이에요.",
      "behaviorHint": "입술을 다문 뒤 짧게 숨을 내쉬고 정면을 본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-1:evidence_hit",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "통합 큐 재배정 기록과 대시보드 편집 이력까지 나오면 통합 첫 2주에 제가 잠깐 손댄 겁니다라는 말로는 못 버텨요. 전체 KPI랑 매출을 이유로 먼저 움직인 건 부정할 수 없어요.",
      "behaviorHint": "로그 항목을 한 번 보고 시선을 피한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "workplace-06:beat:a:d-4:deny",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "통합 첫 2주에 전체 KPI와 매출 압박이 컸어도, 저는 이서린 씨를 먼저 낙인찍은 적 없어요. 경계 위반 같은 표현을 평가로 넣은 일도 없어요.",
      "behaviorHint": "손바닥을 가볍게 펼쳐 부인하고 바로 눈을 피한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-4:hedge",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "통합 첫 2주라 전체 KPI랑 지연률이 흔들려서 메모를 남기긴 했어요. 그래도 잠깐 손댄 겁니다 수준의 관리 메모였고, 사람을 규정하려던 건 아니에요.",
      "behaviorHint": "목소리를 낮추고 문장 사이를 길게 끊는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-4:partial",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "통합 첫 2주에 전체 KPI와 매출 압박 때문에 제가 코멘트를 먼저 적은 건 맞아요. 다만 잠깐 손댄 겁니다라는 식의 초안 메모였고, 최종 평가로 굳히려던 건 아니었어요.",
      "behaviorHint": "고개를 숙인 채 손으로 안경다리를 만진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-4:blame",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "통합 첫 2주에 전체 KPI랑 지연률이 흔들려서 제가 메모를 앞당긴 건 맞아요. 그래도 이서린 씨 쪽도 선을 넘는 조치가 이어져서, 저는 멈추지 않게 하려던 겁니다처럼 관리 포인트를 남긴 거예요.",
      "behaviorHint": "단어를 고르다 상대 이름에서만 힘이 들어간다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-4:confession",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "통합 첫 2주에 전체 KPI와 매출 압박을 핑계로 제가 HR 초안에 이서린 씨를 먼저 규정해 적었어요. 그건 제 잘못이고, 사실 확인 전에 사람을 낙인찍은 제 책임이에요.",
      "behaviorHint": "손을 모아 쥔 채 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-4:evidence_hit",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "HR 캘리브레이션 초안과 매니저 코멘트 원문까지 나오면 통합 첫 2주에 제가 메모를 남긴 사실은 부정할 수 없어요. 전체 KPI랑 지연률을 이유로 들었어도, 잠깐 손댄 겁니다라고 넘길 수준은 아니네요.",
      "behaviorHint": "메모 시각 표시를 보고 입술을 한 번 깨문다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "workplace-06:beat:a:d-5:deny",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "그날 전체 KPI랑 지연률, 매출까지 같이 흔들렸어요. 저는 고객 흐름만 본 거지, 이서린 씨를 제치고 독단적으로 핫픽스를 한 적은 없어요.",
      "behaviorHint": "몸을 약간 뒤로 빼며 손을 저어 부인한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-5:hedge",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "전체 KPI와 매출이 미끄러져서 몇 건은 잠깐 손댄 겁니다. 멈추지 않게 하려던 겁니다만, PM 핑이 늦었다고 해서 독단으로만 보긴 어려워요.",
      "behaviorHint": "문장 끝을 흐리며 시선을 재판관에게 다시 맞춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-5:partial",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "지연률이 튀고 매출도 흔들려서 제가 계정을 먼저 돌린 건 맞아요. 다만 잠깐 손댄 겁니다, 멈추지 않게 하려던 겁니다라고 생각했어요.",
      "behaviorHint": "짧게 인정한 뒤 바로 설명을 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-5:blame",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "전체 KPI와 지연률이 같이 깨져서 제가 먼저 움직인 건 맞아요. 그래도 이서린 씨 쪽도 자동화 규칙을 손봐서, 저는 멈추지 않게 하려던 겁니다만 현장은 더 꼬였어요.",
      "behaviorHint": "손바닥을 위로 보이며 서로의 행동이 겹쳤다고 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-5:confession",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "지연률과 매출이 같이 흔들리자 제가 계정을 직접 돌리고 PM 에스컬레이션도 늦췄어요. 잠깐 손댄 겁니다라고 버틴 건 제 잘못이고, 공동운영 원칙을 깬 제 책임이에요.",
      "behaviorHint": "한숨을 짧게 내쉰 뒤 문장을 끊지 않고 끝까지 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:a:d-5:evidence_hit",
      "caseId": "workplace-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "부서통합 PM 회의록과 에스컬레이션 체크리스트까지 나오면 전체 KPI와 지연률을 이유로 먼저 움직인 건 부정할 수 없어요. 제가 잠깐 손댄 겁니다라고 설명해도 PM 기록을 늦춘 사실은 남네요.",
      "behaviorHint": "체크리스트 문구를 보다가 고개를 천천히 끄덕인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "workplace-06:beat:b:d-2:deny",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "문장 그대로 보시면 '공동 승인'이 원칙이잖아요. 제 업무영역은 고객 흐름 확인이었고, 저는 타팀 규칙을 바꾼 적 없어요.",
      "behaviorHint": "턱을 살짝 들고 또박또박 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-2:hedge",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "문장 그대로 보시면 '공동 승인'이 맞지만, 제가 한 건 수정이 아니라 복구예요. 막기 위한 임시 조치였고 제 업무영역은 고객 지연을 막는 쪽이었어요.",
      "behaviorHint": "손끝으로 공중에 따옴표를 그리듯 '복구'를 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-2:partial",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "문장 그대로 보시면 '공동 승인'을 안 지킨 건 맞아요. 다만 수정이 아니라 복구였고, 막기 위한 임시 조치라고 본 거예요.",
      "behaviorHint": "빠르게 인정한 뒤 바로 반박의 톤으로 전환한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-2:blame",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "문장 그대로 보시면 '공동 승인'이 필요했죠. 그래도 박준호 씨 쪽도 먼저 큐를 흔들었고, 제 업무영역은 무너지고 있어서 수정이 아니라 복구를 한 거예요.",
      "behaviorHint": "상대 이름에서만 목소리를 한 톤 높인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-2:confession",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "문장 그대로 보시면 '공동 승인' 없이 제가 레거시 관리자 권한으로 규칙과 태그를 바꾼 거예요. 수정이 아니라 복구라고 버틴 건 제 잘못이고, 타팀 큐를 건드린 제 책임이에요.",
      "behaviorHint": "입술을 세게 다문 뒤 짧고 단단하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-2:evidence_hit",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "레거시 관리자 권한 감사 로그와 라우팅 규칙 변경 내역까지 나오면 문장 그대로 보시면 제 계정이 찍혀 있잖아요. '공동 승인'도 없이 손댄 건 부정할 수 없고, 수정이 아니라 복구라는 말만으로는 못 버텨요.",
      "behaviorHint": "로그 시간대를 손가락으로 짚으며 말을 멈춘다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "workplace-06:beat:b:d-3:deny",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "문장 그대로 보시면 '공동 승인'보다 앞 문구가 먼저 눈에 들어왔잖아요. 제 업무영역은 고객 쪽을 먼저 막는 거였고, 그 공지가 저더러 손 떼라는 뜻은 아니었어요.",
      "behaviorHint": "자료를 보며 특정 문구를 읽어 주듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-3:hedge",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "문장 그대로 보시면 '공동 승인'도 있지만, 저는 수정이 아니라 복구를 하라는 취지로 읽었어요. 제 업무영역은 비는 구간을 막는 거였고, 그건 막기 위한 임시 조치라고 본 거예요.",
      "behaviorHint": "문서의 한 줄을 반복해 읽고 바로 해석을 붙인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-3:partial",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "문장 그대로 보시면 '공동 승인' 조건까지 챙기지 못한 건 맞아요. 다만 저는 수정이 아니라 복구라고 이해했고, 제 업무영역은 먼저 막는 쪽이라고 여겼어요.",
      "behaviorHint": "짧게 인정한 뒤 말의 속도를 더 올린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-3:blame",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "문장 그대로 보시면 '공동 승인'이 원칙인 건 맞죠. 그래도 박준호 씨 쪽도 그 문장을 자기 권한처럼 말했고, 제 업무영역은 비어 가고 있어서 막기 위한 임시 조치라고 본 거예요.",
      "behaviorHint": "상대를 향해 몸을 조금 돌리며 불만을 숨기지 않는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-3:confession",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "문장 그대로 보시면 '공동 승인'과 PM 기록이 전제인 공지였어요. 그런데도 제가 수정이 아니라 복구라고 우기며 제 업무영역은 따로 있다고 읽은 건 제 잘못이고, 제 해석 책임이에요.",
      "behaviorHint": "자료에서 눈을 떼지 못하다가 마지막 문장에서 정면을 본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-3:evidence_hit",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "공식 통합 RACI 문서와 임시권한 해설 메모까지 붙으면 문장 그대로 보시면 '공동 승인'이 빠질 수 없잖아요. 그 정도면 제가 제 업무영역은 예외라고 읽은 해석을 더는 부정할 수 없어요.",
      "behaviorHint": "RACI 항목을 보다가 숨을 짧게 들이쉰다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "workplace-06:beat:b:d-5:deny",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "문장 그대로 보시면 '공동 승인'이 원칙인데, 저는 규칙을 독단으로 바꾼 적 없어요. 제 업무영역은 잘린 흐름을 확인하는 쪽이었지, 핫픽스를 밀어붙인 건 아니에요.",
      "behaviorHint": "손을 모은 채 빠르게 부인하고 다시 자료를 본다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-5:hedge",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "문장 그대로 보시면 '공동 승인'이 맞지만, 제가 한 건 수정이 아니라 복구예요. 막기 위한 임시 조치였고 제 업무영역은 끊긴 고객 흐름을 붙이는 쪽이었어요.",
      "behaviorHint": "말을 겹치듯 이어서 상대의 끼어듦을 막는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-5:partial",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "문장 그대로 보시면 '공동 승인' 없이 제가 몇 군데를 건드린 건 맞아요. 다만 수정이 아니라 복구였고, 막기 위한 임시 조치라고 생각한 거예요.",
      "behaviorHint": "인정 직후 손바닥을 앞으로 내밀며 선을 긋는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-5:blame",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "문장 그대로 보시면 '공동 승인'이 필요했죠. 그래도 박준호 씨 쪽도 계정부터 건드렸고, 제 업무영역은 이미 무너지고 있어서 막기 위한 임시 조치를 한 거예요.",
      "behaviorHint": "상대 이름을 강하게 찍고 바로 자신 쪽 사정을 덧붙인다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-5:confession",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "문장 그대로 보시면 '공동 승인' 없이 제가 자동화 규칙을 바꾸고 PM 기록도 늦춘 거예요. 수정이 아니라 복구라고 버틴 건 제 잘못이고, 절차를 비켜 간 제 책임이에요.",
      "behaviorHint": "숨을 길게 내쉬고 마지막 문장을 또렷하게 맺는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "workplace-06:beat:b:d-5:evidence_hit",
      "caseId": "workplace-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "부서통합 PM 회의록과 에스컬레이션 체크리스트까지 나오면 문장 그대로 보시면 제가 체크리스트를 열어 보고도 안 남긴 게 보이잖아요. '공동 승인'도 없이 막기 위한 임시 조치라고만 말하는 건 더는 어렵네요.",
      "behaviorHint": "체크리스트 열람 기록을 보고 미간을 찌푸린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
}


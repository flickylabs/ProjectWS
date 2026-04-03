export const tenant06TellsBeats = {
  "caseId": "tenant-06",
  "executableTells": {
    "a": [
      {
        "id": "tenant06:a:tell:memory_softener",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "대충 그런 뉘앙스였어요",
          "편하게 쓰라 하셔서"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "정확한 문구를 묻는 질문엔 '대충 그런 뉘앙스였다'며 기억을 둥글게 만든다."
      },
      {
        "id": "tenant06:a:tell:photo_stack",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "사진 보시면",
          "같은 각도라도"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "설명 대신 같은 각도의 사진 여러 장을 빠르게 보여주며 자기 해석이 맞다는 분위기를 만든다."
      },
      {
        "id": "tenant06:a:tell:quiet_surge",
        "appliesWhen": [
          "emotional",
          "hurt",
          "shame",
          "cornered"
        ],
        "lexicalHooks": [
          "그날부터",
          "제가 그걸 다"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "처음엔 조용히 말하다가 억울한 지점에 오면 문장이 길어지고 쉬지 않고 말한다."
      }
    ],
    "b": [
      {
        "id": "tenant06:b:tell:document_gate",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "문서로 확정된 건 아니잖아요",
          "문구가 남아야죠"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "자신의 말이 불리해지면 '문서로 확정된 건 아니잖아요'라는 문장을 반복해 구두 허용의 무게를 줄인다."
      },
      {
        "id": "tenant06:b:tell:condition_backfill",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "잠깐만이었습니다",
          "한 칸만이었죠"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "처음엔 말하지 않았던 '잠깐만' '한 칸만' 같은 조건을 나중에 덧붙인다."
      },
      {
        "id": "tenant06:b:tell:numeric_reset",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "한 칸입니다",
          "통로 폭이요"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "감정이 격해질수록 날짜, 칸 수, 통로 폭 같은 숫자를 다시 읽으며 대화를 수치 문제로 재설정한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant06:beat:a:d-1:deny",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 그냥 편하게 쓰라고 하셔서 그렇게 이해한 거예요. 전용권을 달라고 우긴 적은 없습니다.",
      "behaviorHint": "시선을 피한 채 말끝을 눌러 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-1:hedge",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "정확한 문장은 지금 다 못 옮기겠지만, 적어도 그때 제 귀엔 '쓰지 말라'는 뜻으로 들리진 않았어요.",
      "behaviorHint": "휴대폰 사진을 찾는 척 숨을 고르며 답한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-1:partial",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "뒤에 조건이 붙어 있었던 건 알아요. 그래도 당시엔 상시 금지까지는 아니라고 받아들였어요.",
      "behaviorHint": "작게 고개를 끄덕인 뒤 단서를 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-1:blame",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 넓게 본 건 맞을 수 있어도, 선을 다시 그어 주셨어야죠. 애매하게 두고 나중에만 엄하게 말하신 거잖아요.",
      "behaviorHint": "서운한 표정으로 상대 쪽 책임을 다시 꺼낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-1:confession",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "결국 제한적 허용이었는데 제가 편하다는 말만 잡고 범위를 넓게 읽었어요. 다시 묻지 않은 책임도 제게 있습니다.",
      "behaviorHint": "한숨을 내쉰 뒤 문장을 길게 이어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-1:evidence_hit",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "이 메시지 흐름을 보니 제가 앞줄만 붙잡고 말한 건 맞네요. 뒤 조건까지 같이 봐야 했어요.",
      "behaviorHint": "사진이나 문자를 보다가 잠깐 멈추고 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant06:beat:a:d-2:deny",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그건 상시 적치가 아니라 작업하다 잠깐 둔 거예요. 옥상을 막아 놓겠다는 생각은 없었어요.",
      "behaviorHint": "시선을 피한 채 말끝을 눌러 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-2:hedge",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "며칠 두고 오간 적은 있어도 그렇게 심각하게 남겨 둔 건 아니라고 생각했어요.",
      "behaviorHint": "휴대폰 사진을 찾는 척 숨을 고르며 답한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-2:partial",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "오래 남은 물건이 있었던 건 인정해요. 그래도 완전 봉쇄처럼 말씀하시는 건 과합니다.",
      "behaviorHint": "작게 고개를 끄덕인 뒤 단서를 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-2:blame",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 치우는 타이밍을 놓친 건 맞는데, 그동안은 아무 말씀 없다가 한꺼번에 문제 삼으신 것도 있잖아요.",
      "behaviorHint": "서운한 표정으로 상대 쪽 책임을 다시 꺼낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-2:confession",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "화분대랑 박스를 몇 주씩 둔 건 맞아요. 통로랑 배수에 부담을 줬는데, 제가 체면 때문에 그걸 줄여 말했어요. 제 잘못이었습니다.",
      "behaviorHint": "한숨을 내쉰 뒤 문장을 길게 이어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-2:evidence_hit",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "이 사진이면 오래 남아 있었다는 말은 피하기 어렵네요. 제가 '잠깐'이라고만 말한 건 무리였어요.",
      "behaviorHint": "사진이나 문자를 보다가 잠깐 멈추고 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant06:beat:a:d-5:deny",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "손상은 거의 다 갑자기 옮기신 뒤에 생긴 거예요. 제 쪽 보관 탓으로 돌릴 일은 아니라고 봐요.",
      "behaviorHint": "시선을 피한 채 말끝을 눌러 짧게 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-5:hedge",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "적어도 문제의 시작은 그 이동이었어요. 그 전까지는 그렇게까지 망가졌다고 보진 않았거든요.",
      "behaviorHint": "휴대폰 사진을 찾는 척 숨을 고르며 답한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-5:partial",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "직접 계기가 이동인 건 분명한데, 제가 물건을 완벽하게 덮진 못했던 건 있어요.",
      "behaviorHint": "작게 고개를 끄덕인 뒤 단서를 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-5:blame",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "포장 미흡이 조금 있었다고 해도 예고 없이 건드린 책임이 더 크죠. 그 부분까지 제 탓으로만 돌릴 순 없어요.",
      "behaviorHint": "서운한 표정으로 상대 쪽 책임을 다시 꺼낸다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-5:confession",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "무단 이동이 직접 계기였지만 일부 젖음은 제 비닐 덮개 미흡도 겹쳤어요. 정산은 둘 다 반영하는 게 맞아요. 제 잘못이었습니다.",
      "behaviorHint": "한숨을 내쉰 뒤 문장을 길게 이어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:a:d-5:evidence_hit",
      "caseId": "tenant-06",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "이 시간대랑 사진을 같이 보니까 이동 뒤에 문제가 이어진 건 분명하네요. 제 포장 상태도 완전히 떳떳하진 않았어요.",
      "behaviorHint": "사진이나 문자를 보다가 잠깐 멈추고 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant06:beat:b:d-1:deny",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "전용으로 쓰라고 한 적 없습니다. 공용 공간 편의 사용을 봐준 걸 권리처럼 보신 거죠.",
      "behaviorHint": "턱을 들고 짧고 단정하게 부정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-1:hedge",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "문서로 딱 박아 두지 않았더라도 처음부터 단시간 사용과 한 칸 보관이 전제였습니다.",
      "behaviorHint": "문서 문구를 떠올리듯 눈을 가늘게 뜨고 설명한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-1:partial",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "카카오톡 표현이 짧았던 건 인정합니다. 하지만 취지 자체가 독점 허용은 아니었습니다.",
      "behaviorHint": "안경을 고쳐 쓰며 일부만 골라 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-1:blame",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 문구를 더 분명히 남겼어야 한 건 맞지만, 유진 씨도 호의를 너무 넓게 해석하신 겁니다.",
      "behaviorHint": "손가락으로 항목을 세듯 책임을 분산시킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-1:confession",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "실제로는 전용 허용도 전면 금지도 아니었습니다. 제가 애매한 안내를 방치해 해석 싸움을 키웠습니다. 제 잘못이었습니다.",
      "behaviorHint": "잠시 침묵한 뒤 목소리를 낮춰 정리하듯 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-1:evidence_hit",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "계약서와 확인서를 같이 보니 제한적 허용으로 정리하는 게 맞겠군요. 제 설명도 초반엔 너무 느슨했습니다.",
      "behaviorHint": "제출된 자료를 다시 넘겨 보며 계산적으로 표현을 고친다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "tenant06:beat:b:d-3:deny",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "점검 때문에 잠깐 제한한 겁니다. 무단으로 뭘 빼돌리거나 그런 성격의 조치는 아니었습니다.",
      "behaviorHint": "턱을 들고 짧고 단정하게 부정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-3:hedge",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "안내 문자는 드렸고, 복도에 잠시 둔 겁니다. 급한 상황이어서 절차가 거칠었던 것뿐입니다.",
      "behaviorHint": "문서 문구를 떠올리듯 눈을 가늘게 뜨고 설명한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-3:partial",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "문자가 교체 뒤에 간 건 맞습니다. 그래도 위험 요소를 그냥 둘 수는 없어서 먼저 움직였습니다.",
      "behaviorHint": "안경을 고쳐 쓰며 일부만 골라 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-3:blame",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 동의를 일일이 받지 않은 건 맞지만, 유진 씨 적치가 계속돼 통로가 좁아진 것도 원인이었습니다.",
      "behaviorHint": "손가락으로 항목을 세듯 책임을 분산시킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-3:confession",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "사전 합의 없이 비밀번호를 바꾸고 박스를 먼저 옮긴 뒤 문자로 알린 건 제 잘못입니다. 점검 압박이 있었다고 해도 절차를 넘었습니다.",
      "behaviorHint": "잠시 침묵한 뒤 목소리를 낮춰 정리하듯 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-3:evidence_hit",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "이 문자 시각과 CCTV 순서를 보면 제가 사후 통보를 한 건 부인할 수 없네요. 표현을 고치겠습니다.",
      "behaviorHint": "제출된 자료를 다시 넘겨 보며 계산적으로 표현을 고친다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant06:beat:b:d-5:deny",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "크게 망가진 물건은 없었습니다. 이동과 손상을 바로 묶는 건 성급합니다.",
      "behaviorHint": "턱을 들고 짧고 단정하게 부정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-5:hedge",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "잠깐 옮겼다고 곧바로 손상 책임이 생기진 않습니다. 보관 상태 자체도 함께 봐야죠.",
      "behaviorHint": "문서 문구를 떠올리듯 눈을 가늘게 뜨고 설명한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-5:partial",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "가방 젖음 얘기는 들었습니다. 다만 목록과 범위가 늦게 나와서 바로 인정하긴 어려웠습니다.",
      "behaviorHint": "안경을 고쳐 쓰며 일부만 골라 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-5:blame",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 거칠게 옮긴 부분은 있어도, 포장 미흡까지 전부 제 이동 책임으로 계산하는 건 과합니다.",
      "behaviorHint": "손가락으로 항목을 세듯 책임을 분산시킨다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-5:confession",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "예고 없는 이동이 손상의 직접 계기가 된 건 맞습니다. 일부 젖음은 유진 씨 포장 미흡이 겹쳤으니 공동 원인으로 봐야 합니다. 제 잘못이었습니다.",
      "behaviorHint": "잠시 침묵한 뒤 목소리를 낮춰 정리하듯 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant06:beat:b:d-5:evidence_hit",
      "caseId": "tenant-06",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "이 영상 흐름이면 이동이 먼저였고 손상 논쟁이 뒤따랐다는 건 분명합니다. 전부 부정하긴 어렵습니다.",
      "behaviorHint": "제출된 자료를 다시 넘겨 보며 계산적으로 표현을 고친다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    }
  ]
}


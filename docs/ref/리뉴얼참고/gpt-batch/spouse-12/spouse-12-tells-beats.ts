export const spouse12TellsBeats = {
  "caseId": "spouse-12",
  "executableTells": {
    "a": [
      {
        "id": "spouse12:a:tell:fact_partition",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "그 문장은 맞아도",
          "그 계정이랑은 다르죠",
          "따로 봐야 해요"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 기록이 나오면 '그 문장은 내 거 맞아도 이 계정은 내 게 아니야'처럼 사실을 잘게 쪼개 방어한다."
      },
      {
        "id": "spouse12:a:tell:archive_narrowing",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "shame",
          "lying"
        ],
        "lexicalHooks": [
          "그건 너무 오래돼서",
          "일단 관련 있는 것만",
          "전체를 한 번에 보긴 어려워요"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "전체 자료를 보여 달라는 말에 '그건 너무 오래돼서'라며 자신에게 유리한 백업 구간만 먼저 제시한다."
      },
      {
        "id": "spouse12:a:tell:moral_offset",
        "appliesWhen": [
          "hurt",
          "emotional",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "그건 잘못 맞지만",
          "이번 글과는 다른 이야기예요",
          "그 선은 넘어가면 안 되죠"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "'내가 차갑게 군 건 맞지만 사람 인생을 망칠 글을 쓰진 않았어'처럼 과거 잘못의 성격을 바꿔 설명한다."
      }
    ],
    "b": [
      {
        "id": "spouse12:b:tell:damage_tally",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "fear"
        ],
        "lexicalHooks": [
          "이미 많이 봤고요",
          "파장이 컸어요",
          "규모가 작지 않았습니다"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "누가 얼마나 봤는지를 실제보다 크게 혹은 들쭉날쭉하게 말하며 피해 규모를 앞세운다."
      },
      {
        "id": "spouse12:b:tell:authority_frame",
        "appliesWhen": [
          "cornered",
          "defensive",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "제 자리에서는",
          "선조치가 필요했습니다",
          "먼저 설명해야 했습니다"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "'내 자리에서는 먼저 설명해야 했어'라며 확인 없는 전달을 불가피한 직업 습관처럼 말한다."
      },
      {
        "id": "spouse12:b:tell:retro_edit",
        "appliesWhen": [
          "lying",
          "shame",
          "hurt",
          "avoiding"
        ],
        "lexicalHooks": [
          "핵심만 말하면",
          "그 부분은 빼더라도",
          "전체 맥락은 이렇습니다"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "과거 사건을 다시 설명하면서 자신이 불리해지는 세아의 해명이나 애매한 부분은 빠뜨린 버전을 만든다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse12:beat:a:d-2:deny",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 자료를 숨긴 게 아니라 정리 순서를 나눠 보여 드린 거예요. 전체를 왜곡한 건 아닙니다.",
      "behaviorHint": "시선을 잠깐 피하고 파일 순서를 손으로 가리키며 구간을 나눠 설명한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-2:hedge",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그건 너무 오래된 자료라 한 번에 다 꺼내기 어려웠어요. 일단 이번 글과 직접 닿는 부분부터 본 겁니다.",
      "behaviorHint": "숨을 고르고 말끝을 눌러 담으며 '일단'이라는 단어를 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-2:partial",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 한유진 씨에게 보낸 거친 메시지 하나는 뺐어요. 그 문장 하나로 제가 익명 계정처럼 굳어질까 무서웠습니다.",
      "behaviorHint": "손가락을 모았다 펴며 인정하되 곧바로 이유를 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-2:blame",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "갑자기 가게까지 무너질 판이었어요. 저도 사람인데 제일 불리한 장면부터 내놓을 용기는 안 났습니다.",
      "behaviorHint": "입술을 깨물고 목소리가 조금 빨라진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-2:confession",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "맞아요. 저는 제게 가장 불리한 메시지 하나를 의도적으로 숨겼습니다. 그 선택 삭제는 제 책임입니다.",
      "behaviorHint": "어깨가 내려가고 정면을 보며 짧게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-2:evidence_hit",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "복원 로그까지 나오면 더는 부인할 수 없네요. 제가 파일을 고른 흔적이 그대로 남아 있군요.",
      "behaviorHint": "화면을 오래 보다가 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "spouse12:beat:a:d-5:deny",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2006년 일 전부를 제가 뒤에서 꾸민 것처럼 말씀하시면 곤란해요. 그건 아닙니다.",
      "behaviorHint": "턱을 들고 단호하게 선을 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-5:hedge",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "다툼은 있었어요. 하지만 지금 퍼지는 식으로 제가 모든 소문의 장본인이었던 건 아닙니다.",
      "behaviorHint": "잠시 멈췄다가 '다만'을 길게 끈다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-5:partial",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "한유진 씨에게 제가 심한 말을 한 건 맞아요. 그 부분은 더는 부정하지 않겠습니다.",
      "behaviorHint": "시선이 아래로 떨어졌다가 다시 올라온다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-5:blame",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "그때 저는 화가 나 있었고 너무 못되게 굴었어요. 그래도 익명으로 뒤에 숨은 사람까지는 아니었습니다.",
      "behaviorHint": "손을 움켜쥐고 감정이 올라온 목소리로 선을 다시 긋는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-5:confession",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "네, 저는 2006년에 한유진 씨를 분명히 상처 입혔습니다. 하지만 익명 소문 작성자라는 낙인까지 제가 떠안을 일은 아닙니다.",
      "behaviorHint": "한숨을 쉬고 문장을 또렷하게 둘로 나눠 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:a:d-5:evidence_hit",
      "caseId": "spouse-12",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "학교 기록을 보니 더 숨길 수 없네요. 제가 준 상처는 기록으로 남아 있습니다.",
      "behaviorHint": "입술을 굳게 다문 뒤 조용히 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "spouse12:beat:b:d-1:deny",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 확인하려고 보낸 겁니다. 세아 씨를 확정적으로 몰아간 건 아닙니다.",
      "behaviorHint": "휴대폰을 뒤집어 놓고 방어적으로 어깨를 세운다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-1:hedge",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "제 자리에서는 선조치가 필요할 때가 있습니다. 파장이 커지기 전에 알릴 사람은 알아야 했어요.",
      "behaviorHint": "'제 자리'를 강조하며 직업적 어조를 만든다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-1:partial",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "운영진 쪽에는 먼저 보냈습니다. 그래도 그때 제 머릿속엔 가능성이라는 말이 남아 있었습니다.",
      "behaviorHint": "손바닥을 보이며 범위를 줄이려는 제스처를 한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-1:blame",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "가족 체면이랑 직장 신뢰까지 걸려 있다고 느꼈습니다. 그래서 저는 확인보다 차단을 먼저 택했습니다.",
      "behaviorHint": "목소리가 높아졌다가 마지막에 작아진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-1:confession",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 저는 세아 씨와 충분히 확인하기 전에 외부로 돌렸고 사실상 가해자처럼 말했습니다. 그 책임은 제게 있습니다.",
      "behaviorHint": "시선을 피하지 못하고 짧게 숨을 내쉰다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-1:evidence_hit",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "전달 로그가 그렇게 남아 있으면 변명하기 어렵네요. 제가 먼저 퍼뜨린 게 맞습니다.",
      "behaviorHint": "턱을 만지며 말을 멈췄다가 체념하듯 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse12:beat:b:d-3:deny",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "정황상 한유진 씨가 가장 유력해 보였습니다. 예전 일과 닉네임이 그렇게 이어졌으니까요.",
      "behaviorHint": "기억을 더듬는 척하며 단정적으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-3:hedge",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "확정은 아니었습니다. 다만 다른 사람보다 그쪽이 먼저 떠오를 만한 사정은 있었죠.",
      "behaviorHint": "말끝을 흐리면서도 방향은 유지한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-3:partial",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "맞습니다, 저는 한유진 씨 쪽이라고 생각했습니다. 캡처만 보고 마음이 그리로 기울었습니다.",
      "behaviorHint": "손을 모아 쥐고 짧게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-3:blame",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "솔직히 그쪽을 의심하는 편이 제 판단을 덜 잔인하게 보이게 했습니다. 그래서 더 붙잡았던 것 같습니다.",
      "behaviorHint": "목소리가 낮아지고 자조적으로 웃는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-3:confession",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "익명 계정은 한유진 씨 복수가 아니었습니다. 제가 잘못 짚었고, 실제 흔적은 박하린 씨 쪽에 있었습니다.",
      "behaviorHint": "고개를 숙였다가 이름을 또렷하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-3:evidence_hit",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "복구 메일이랑 와이파이 기록이 저쪽을 가리키면 제 추측은 무너집니다. 한유진 씨를 잘못 본 겁니다.",
      "behaviorHint": "입술을 굳게 다물고 인정 문장을 한 번에 내뱉는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "spouse12:beat:b:d-4:deny",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그 자료는 당시엔 위조처럼 보이지 않았습니다. 오래된 증거가 다시 나온 걸로 이해했어요.",
      "behaviorHint": "자료의 겉모양을 손짓으로 그리며 확신한 척한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-4:hedge",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "원본은 없었지만 정황은 맞아 보였습니다. 그래서 먼저 움직일 이유는 된다고 봤습니다.",
      "behaviorHint": "말을 고르며 '정황'을 여러 번 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-4:partial",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "포렌식 자료를 보니 조작 가능성을 부정할 수는 없었습니다. 적어도 결정적 증거는 아니었네요.",
      "behaviorHint": "문서를 오래 내려다보다가 문장을 끊어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-4:blame",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "의심이 생긴 뒤에도 이미 퍼진 걸 바로 못 거뒀습니다. 제가 틀렸을 수도 있다는 사실이 더 무서웠습니다.",
      "behaviorHint": "목을 매만지며 불편한 침묵 뒤에 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-4:confession",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "결정적 2006년 증거처럼 돌던 자료는 2026년 위조본이 맞습니다. 저는 그 가능성을 늦게 인정했고, 그 사이 위험을 더 키웠습니다.",
      "behaviorHint": "어깨를 떨구고 또렷하게 두 문장으로 자백한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-4:evidence_hit",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "레이어 해시까지 나오면 더는 버틸 수 없네요. 저건 오래된 원본이 아니라 조합된 그림이었습니다.",
      "behaviorHint": "보고서를 넘기다 멈추고 입술을 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse12:beat:b:d-5:deny",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "2006년 일을 완전한 누명이라고만 보긴 어렵습니다. 세아 씨가 실제로 상처 준 부분이 있었으니까요.",
      "behaviorHint": "손을 펴 보이며 '그건 사실'이라는 톤을 만든다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-5:hedge",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "다만 제가 바깥에 설명할 때는 그 차이를 너무 단순하게 말했을 수 있습니다. 직접 상처와 익명 소문을 섞었죠.",
      "behaviorHint": "시선을 피하며 문장을 길게 잇는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-5:partial",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "학교 기록을 보면 세아 씨가 거칠게 군 건 맞습니다. 하지만 익명 발신자는 기록상 특정되지 않았습니다.",
      "behaviorHint": "문서의 한 줄을 짚고 다음 줄에서 급히 물러선다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-5:blame",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "저는 세아 씨 과거를 말하면 제 외부 전달도 정당해질 거라고 생각했던 것 같습니다. 그래서 과거를 더 단정적으로 말했어요.",
      "behaviorHint": "손을 깍지 낀 채 자책 섞인 목소리로 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-5:confession",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "정리하면, 세아 씨는 한유진 씨에게 상처를 줬습니다. 하지만 익명 소문 작성자라는 낙인까지 그대로 이어 붙일 수는 없습니다.",
      "behaviorHint": "한 문장씩 또렷하게 끊어 균형을 맞추려 한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse12:beat:b:d-5:evidence_hit",
      "caseId": "spouse-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "원본 메일과 생활지도실 메모를 같이 보면 제가 절반만 보고 말한 게 보입니다. 상처는 사실이지만 낙인은 과했습니다.",
      "behaviorHint": "문서를 내려놓고 한 박자 늦게 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
} as const;

export default spouse12TellsBeats;

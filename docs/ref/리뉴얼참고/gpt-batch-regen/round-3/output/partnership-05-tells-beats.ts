export const partnership05TellsBeats = {
  "caseId": "partnership-05",
  "executableTells": {
    "a": [
      {
        "id": "partnership-05:a:tell:account_chain_recital",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "운영계좌",
          "전표",
          "발행 시각"
        ],
        "sentenceShape": "number_first",
        "cadence": "every_turn",
        "originalPattern": "의도를 묻는 질문에도 계정명, 전표번호, 발행 시각을 길게 나열해 본심 진술을 늦춘다."
      },
      {
        "id": "partnership-05:a:tell:necessity_frame",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "선택지",
          "불가피",
          "조사 대응"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "공동 승인 누락을 지적받으면 '그때는 선택지가 없었다'며 위기 대응의 불가피성으로 초점을 옮긴다."
      },
      {
        "id": "partnership-05:a:tell:affect_pruning",
        "appliesWhen": [
          "avoiding",
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "감정은 이해하지만",
          "지금은",
          "구조를 보자"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 배신감을 말하면 '감정은 이해하지만 지금은 세목 구조를 보자'며 정서 표현을 잘라낸다."
      }
    ],
    "b": [
      {
        "id": "partnership-05:b:tell:injury_stack",
        "appliesWhen": [
          "lying",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "예전에도",
          "또",
          "누락"
        ],
        "sentenceShape": "enumeration",
        "cadence": "every_turn",
        "originalPattern": "현재 질문을 받으면 예전 누락, 늦은 보고, 장부 정정 사례를 한꺼번에 꺼내 지금 행동의 정당성을 먼저 만든다."
      },
      {
        "id": "partnership-05:b:tell:proof_dramatization",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "눈으로 봤다",
          "캡처",
          "등기부"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "캡처 한 장이나 등기부 한 줄을 '이번엔 눈으로 봤다'는 식으로 확대해 전체 의도의 증거처럼 말한다."
      },
      {
        "id": "partnership-05:b:tell:moral_redirect",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "왜 그런 의심이 생겼겠어요",
          "누가 만들었는데",
          "또"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "원본 제출 여부를 묻는 질문을 받으면 곧바로 '그런 의심을 만든 사람이 누구냐'는 도덕 판단으로 방향을 튼다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-05:beat:a:d-1:deny",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "운영계좌에서 자문사로 나간 선급금일 뿐입니다. 개인 용도로 빼돌렸다는 식의 질문은 전제부터 틀립니다.",
      "behaviorHint": "서류를 곧게 맞추며 목소리를 낮춘다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-1:hedge",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "최종 승인 표시가 늦게 남은 건 맞습니다. 그래도 그때는 조사 대응 흐름이 먼저 움직이고 있어서 공백을 메운 겁니다.",
      "behaviorHint": "시선을 서류에 두고 승인 시점을 구분해 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-1:partial",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "제가 먼저 보낸 건 맞습니다. 다만 세무사 제안과 자료 요청이 동시에 와서 미루면 더 크게 터질 거라 봤습니다.",
      "behaviorHint": "한 번 숨을 고르고 숫자를 짧게 끊어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-1:blame",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "절차 책임은 제가 지겠습니다. 하지만 소라 씨도 같은 메일을 받고 있었고, 구조 자체는 세무사 쪽에서 짠 판이었습니다.",
      "behaviorHint": "턱을 굳힌 채 세무사와 공동 수신자를 번갈아 언급한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-1:confession",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "승인 없이 2,400만원을 먼저 이체한 건 제 잘못입니다. 개인 유용은 아니었지만 통제를 깨뜨린 책임까지 피하진 않겠습니다.",
      "behaviorHint": "어깨를 조금 내리고 정면을 본다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-1:evidence_hit",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "이체확인서와 선급금 전표까지 나오면 부인할 건 없네요. 토큰 없이 제가 실행한 흔적이 남아 있으니, 이제는 왜 그랬는지를 말해야겠습니다.",
      "behaviorHint": "전표를 내려다보다가 짧게 한숨 쉰다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-05:beat:a:d-3:deny",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그 구조는 제가 혼자 만든 게 아닙니다. 당시 분위기상 소라 씨도 그 방향을 사실상 밀고 있었다고 봤습니다.",
      "behaviorHint": "입꼬리를 굳히고 단정적으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-3:hedge",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "표현의 원문이 세무사 메일에 있었을 수는 있습니다. 하지만 실행으로 기운 건 소라 씨의 반대 부재가 컸습니다.",
      "behaviorHint": "문구와 실행을 구분하며 손가락으로 순서를 짚는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-3:partial",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "구체 문구는 박태성 쪽에서 먼저 나왔습니다. 그래도 저는 소라 씨가 막지 않을 거라고 읽고 그대로 탔습니다.",
      "behaviorHint": "시선을 잠시 내리며 '먼저'라는 표현을 조심스럽게 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-3:blame",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 소라 씨를 공동 설계자처럼 말한 건 책임이 한쪽으로 몰리는 걸 막으려는 면피도 있었습니다. 근본적으로는 세무사가 판을 깔았습니다.",
      "behaviorHint": "체면을 지키려는 듯 턱선을 세운다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-3:confession",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "배후 제안자는 소라 씨가 아니라 박태성 세무사였습니다. 제가 체면 때문에 소라 씨 책임을 부풀린 건 맞습니다.",
      "behaviorHint": "표정을 누그러뜨리고 이름을 또렷하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-3:evidence_hit",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "메일과 약정서까지 이어지면 더는 소라 씨 탓으로 버틸 수 없죠. 시작점이 세무사였다는 걸 인정하겠습니다.",
      "behaviorHint": "말끝이 짧아지고 시선이 메일 출력물에 고정된다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-05:beat:a:d-4:deny",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "팀에 비용을 넓게 설명한 건 불안을 막기 위한 임시 정리였습니다. 은폐라고 부를 정도로 뒤집은 건 아닙니다.",
      "behaviorHint": "냉정하게 단어 선택만 바로잡으려 든다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-4:hedge",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "조사대응이라는 말을 빼고 일반 관리비성으로 적은 건 맞습니다. 그래도 당시엔 운영 혼선을 먼저 막아야 했습니다.",
      "behaviorHint": "손끝으로 공지 문구를 짚으며 '임시'를 강조한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-4:partial",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "회의 메모대로 우리 둘 다 완화 문구에 동의했습니다. 실제 목적을 축소한 설명이었다는 점도 인정합니다.",
      "behaviorHint": "고개를 작게 끄덕이며 동의 범위를 좁혀 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-4:blame",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 문구를 더 건조하게 다듬은 책임은 있습니다. 하지만 소라 씨도 최종 문구를 보고 동의했기에 단독 은폐로 몰 수는 없습니다.",
      "behaviorHint": "책임을 나누려는 듯 상대를 곁눈질한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-4:confession",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "조사대응 비용을 일부러 일반 관리비처럼 축소해 알린 건 사실입니다. 그 은폐성 표현에 제 책임이 있습니다.",
      "behaviorHint": "목소리가 낮아지고 문장을 짧게 끝낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:a:d-4:evidence_hit",
      "caseId": "partnership-05",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "노지훈 메모까지 나오면 임시 표현이었다는 말만으로는 안 되겠네요. 같이 만든 축소 문구였다는 걸 인정합니다.",
      "behaviorHint": "메모를 확인하자마자 말 속도가 눈에 띄게 느려진다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-05:beat:b:d-2:deny",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 보이는 위험을 말했을 뿐이에요. 개인 유용 프레임을 꾸며냈다고까지 말하는 건 과해요.",
      "behaviorHint": "억울한 표정으로 손을 펼친다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-2:hedge",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "동문 캡처와 심야 이체가 겹치면 누구라도 의심합니다. 저는 그 의심을 말한 겁니다.",
      "behaviorHint": "캡처와 심야라는 단어를 차례로 세어 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-2:partial",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 제안 메일을 읽은 흔적은 있어요. 그래도 현우 씨를 믿지 못해서 그 사실보다 의혹을 먼저 밀었어요.",
      "behaviorHint": "목이 잠긴 채 문장을 한 번 끊고 다시 잇는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-2:blame",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "그 표현을 강하게 쓴 건 제 선택이에요. 하지만 그렇게까지 가게 만든 건 현우 씨의 누락과 설명 지연도 있었어요.",
      "behaviorHint": "상대를 바라보다가 곧바로 시선을 피한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-2:confession",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "저는 공동 메일을 본 사실을 숨기고도 개인 비자금 의혹을 고착했어요. 그건 보복과 자기보호가 섞인 제 잘못이에요.",
      "behaviorHint": "입술을 깨물고 낮은 목소리로 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-2:evidence_hit",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "드래프트와 회의 메모가 같이 나오면 더는 '몰랐다'고 못 하겠네요. 제가 의심을 일부러 키운 부분을 인정하겠어요.",
      "behaviorHint": "드래프트 언급 순간 호흡이 흔들린다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-05:beat:b:d-3:deny",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "그 구조는 현우 씨가 자기 식으로 밀어붙였다고 봤어요. 적어도 제 눈엔 그렇게 보일 이유가 충분했어요.",
      "behaviorHint": "말끝을 강하게 올리며 단정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-3:hedge",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "세무사 문구가 있었다 해도 현우 씨가 너무 빨리 실행했어요. 그래서 저는 그가 설계자라고 믿었어요.",
      "behaviorHint": "실행 속도를 손짓으로 크게 그린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-3:partial",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "이제 보면 첫 문구는 박태성 메일에서 나왔어요. 그런데 저는 현우 씨의 집행 속도 때문에 원인을 그에게 붙였어요.",
      "behaviorHint": "잠시 멈추고 '지금 보면'을 힘주어 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-3:blame",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 현우 씨를 배후 설계자로 단정한 건 오판이었어요. 다만 그 오판을 부른 건 크롭 캡처와 누적 불신이었어요.",
      "behaviorHint": "상처받은 표정으로 캡처를 내려다본다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-3:confession",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "선급금 구조의 최초 제안자는 현우 씨가 아니라 박태성 세무사였어요. 제가 현우 씨를 설계자처럼 말한 건 제 오해와 자기보호였어요. 그건 제 잘못이에요.",
      "behaviorHint": "어깨가 내려가고 시선이 바닥으로 향한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-3:evidence_hit",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "메일과 수수료 약정까지 이어지면 더는 현우 씨를 배후라고 할 수 없죠. 세무사가 시작점이었다는 걸 인정하겠어요.",
      "behaviorHint": "증거를 보며 목소리가 급격히 낮아진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-05:beat:b:d-4:deny",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "팀 공지는 혼란을 막기 위한 임시 표현이었어요. 은폐라고 단정할 정도로 숨긴 건 아닙니다.",
      "behaviorHint": "손으로 선을 긋듯 '임시 표현'을 강조한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-4:hedge",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "조사대응이라는 말을 빼고 일반 관리비처럼 적은 건 맞아요. 하지만 그때는 직원 불안부터 막아야 했어요.",
      "behaviorHint": "직원 불안이라는 말을 반복하며 감정 호소를 섞는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-4:partial",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "저도 완화 문구를 확인하고 통과시켰어요. 실제 목적을 축소한 설명이었다는 점은 인정해요.",
      "behaviorHint": "짧게 고개를 숙이고 확인 사실을 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-4:blame",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "현우 씨 혼자 숨긴 일은 아닙니다. 저도 동의했고, 그래서 초반에 부인으로 버틴 책임이 있어요.",
      "behaviorHint": "스스로도 포함시키며 책임을 분산해 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-4:confession",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "조사대응 비용을 일반 관리비처럼 축소 설명한 데 저도 가담했어요. 그 은폐 책임을 인정해요.",
      "behaviorHint": "표정이 굳다가 마지막에 힘이 빠진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-05:beat:b:d-4:evidence_hit",
      "caseId": "partnership-05",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "회의 메모와 초안이 같이 나오면 빠져나갈 수 없네요. 제가 문구를 확인하고도 고치지 않은 사실을 인정하겠어요.",
      "behaviorHint": "초안 언급 순간 숨을 들이마시고 말을 고른다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-5"
    }
  ]
} as const;

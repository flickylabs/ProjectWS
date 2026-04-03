export const tenant12TellsBeats = {
  "caseId": "tenant-12",
  "executableTells": {
    "a": [
      {
        "id": "tenant12:a:tell:sender_fixation",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그 말 누가 처음",
          "처음 보낸 사람",
          "출처부터"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "상대가 설명을 넓히면 '그 말 누가 처음 보냈죠'라고 끊고 발신자를 고정하려 한다."
      },
      {
        "id": "tenant12:a:tell:screenshot_burst",
        "appliesWhen": [
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "캡처 보세요",
          "시간 찍혔죠",
          "이 장면"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 질문이 오면 맥락 설명보다 캡처 여러 장을 한꺼번에 보여 주며 자신이 확실한 증거를 쥐고 있다는 분위기를 만든다."
      },
      {
        "id": "tenant12:a:tell:heated_overlap",
        "appliesWhen": [
          "emotional",
          "hurt",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "아니, 그게 아니라",
          "제가 그때는",
          "그걸 왜"
        ],
        "sentenceShape": "self_reference",
        "cadence": "max_once_per_turn",
        "originalPattern": "억울해지면 질문이 끝나기 전에 끼어들어 사실과 해석을 한 번에 쏟아낸다."
      }
    ],
    "b": [
      {
        "id": "tenant12:b:tell:delegation_shield",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "그건 관리인이",
          "관리실에서",
          "제가 직접 한 건"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리해지면 '그건 관리인이 응대한 겁니다'를 반복해 자신의 책임선을 뒤로 밀어낸다."
      },
      {
        "id": "tenant12:b:tell:passive_voice_escape",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "그렇게 전달된 모양",
          "그렇게 이해된 것 같습니다",
          "오해가 있었던 듯합니다"
        ],
        "sentenceShape": "question_end",
        "cadence": "max_once_per_turn",
        "originalPattern": "소문을 왜 바로잡지 않았냐는 질문에는 '그렇게 전달된 모양' 같은 수동형 표현으로 행위 주체를 흐린다."
      },
      {
        "id": "tenant12:b:tell:silence_stretch",
        "appliesWhen": [
          "emotional",
          "cornered",
          "hurt"
        ],
        "lexicalHooks": [
          "원칙상",
          "규칙대로",
          "민원 절차는"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "감정이 올라오면 잠깐 침묵한 뒤 원칙과 관리 규칙만 짧게 읽어 내려간다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "tenant12:beat:a:d-1:deny",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그 말 누가 처음 보냈죠? 저는 집주인 쪽에서 저를 문제 세입자로 찍었다고 들었습니다.",
      "behaviorHint": "말을 자르며 발신자를 집요하게 고정한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-1:hedge",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "직접 썼는지보다 집주인 라인에서 나온 말이냐가 중요합니다. 저는 그렇게 들을 수밖에 없었어요.",
      "behaviorHint": "휴대폰을 들어 캡처를 곧 보여 줄 듯 흔든다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-1:partial",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "미령 씨가 처음 말했을 수는 있죠. 다만 관리실 선에서 퍼진 거면 저한텐 같은 문제였습니다.",
      "behaviorHint": "빠른 말투를 유지하지만 중간에서 한 번 숨을 고른다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-1:blame",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "경수 씨가 직접 입으로 안 했다고 끝날 일이 아니에요. 집주인으로서 자기 선에서 나온 말을 바로 안 잘랐잖아요.",
      "behaviorHint": "상체를 앞으로 내밀며 책임선을 문경수에게 다시 묶는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-1:confession",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 직접 퍼뜨렸다고 단정한 건 과했습니다. 하지만 정정이 늦어서 제 낙인이 굳은 건 맞습니다. 제 잘못이었습니다.",
      "behaviorHint": "시선을 잠깐 내렸다가 마지막 문장은 또렷하게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-1:evidence_hit",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "이 음성과 잘린 캡처를 같이 보면 제가 왜 그렇게 믿었는지 아실 겁니다. 처음 문장이 경수 씨 직언은 아니라는 건 지금 보이네요.",
      "behaviorHint": "스크린을 넘기다 손이 멈추고 말 속도가 잠시 줄어든다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant12:beat:a:d-3:deny",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "저는 공격한 게 아니라 정정하려고 올린 겁니다. 가만히 있으면 거짓말이 사실처럼 굳잖아요.",
      "behaviorHint": "말끝마다 '정정'이라는 단어를 힘줘 반복한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-3:hedge",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "캡처를 공개한 건 맞지만, 그때는 더 퍼지기 전에 막아야 했습니다.",
      "behaviorHint": "캡처 화면을 들이밀 듯 손을 앞으로 뻗는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-3:partial",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "감정적으로 올린 건 인정해요. 그래도 먼저 공개 낙인을 당했다고 느꼈습니다.",
      "behaviorHint": "목소리는 높지만 마지막 단어에서 미묘하게 흔들린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-3:blame",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "성급했던 건 맞아도, 아무도 아니라고 안 해주니 제가 단톡에서라도 선을 그을 수밖에 없었어요.",
      "behaviorHint": "턱을 들고 방어와 역비난을 한 문장에 섞어 내뱉는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-3:confession",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "출처를 다 확인하기 전에 공개 단톡에서 경수 씨와 미령 씨를 비난해 갈등을 키웠습니다. 제 잘못이었습니다.",
      "behaviorHint": "한숨처럼 짧게 숨을 내쉰 뒤 인정 문장을 끊어 읽는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-3:evidence_hit",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "백업 시각까지 찍히니까 부정하긴 어렵네요. 캡처 받고 25분 만에 올린 건 제가 너무 빨랐어요.",
      "behaviorHint": "휴대폰 시간을 다시 확인하다가 시선이 떨어진다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "tenant12:beat:a:d-4:deny",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "생활 불편이라고 할 정도는 아니었습니다. 그걸 문제 세입자 근거처럼 붙인 게 더 이상하죠.",
      "behaviorHint": "불편의 강도를 손짓으로 작게 잘라 보인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-4:hedge",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "늦은 택배나 방문객은 다들 있잖아요. 그 정도를 큰 문제처럼 말하진 말아 주세요.",
      "behaviorHint": "어깨를 으쓱하며 일반적인 일상처럼 넘기려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-4:partial",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "복도 대화가 조금 길어진 적이랑 분리배출 재안내 정도는 있었습니다.",
      "behaviorHint": "빠른 말 속에서도 인정하는 부분에서는 볼륨이 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-4:blame",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "그 정도 불편을 상습 소음처럼 묶어 말한 쪽이 과한 겁니다.",
      "behaviorHint": "손바닥을 펼쳐 '그 정도'라는 선을 명확히 긋는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-4:confession",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "한두 차례 불편은 있었어요. 하지만 그걸 낙인과 섞어 상습 문제처럼 본 건 과했습니다. 제 잘못이었습니다.",
      "behaviorHint": "고개를 끄덕이며 일부 인정 뒤 경계를 다시 세운다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:a:d-4:evidence_hit",
      "caseId": "tenant-12",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "민원대장 세 건이면 '아무것도 없었다'고는 못 하겠네요. 기록만 보면 큰 문제도 아니잖아요.",
      "behaviorHint": "기록 수치를 보고 잠깐 멈춘 뒤 바로 선을 그어 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "tenant12:beat:b:d-2:deny",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 표현은 민원을 조용히 확인하겠다는 뜻이었습니다. 그 이상으로 볼 말은 아닙니다.",
      "behaviorHint": "등받이에 기대고 직접 표현을 최소화한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-2:hedge",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "주변에서 과하게 받아들인 면이 있습니다. 원래 취지는 관리인이 먼저 확인하겠다는 거였어요.",
      "behaviorHint": "관리인을 언급하며 손바닥을 아래로 눌러 진정시키려 한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-2:partial",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 표현이 애매했던 건 인정합니다. 다만 원래 취지는 조용히 확인하겠다는 뜻이었습니다.",
      "behaviorHint": "잠깐 침묵한 뒤 짧게 핵심만 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-2:blame",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "미령이 옆집을 달래는 자리였고, 그 말이 몇 번 돌면서 더 세게 굳어진 겁니다.",
      "behaviorHint": "손가락으로 전달 경로를 순서대로 짚으며 책임을 분산한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-2:confession",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "원래 취지는 조용한 확인이었지만, 표현이 모호했고 제가 바로잡지도 못했습니다. 제 잘못이었습니다.",
      "behaviorHint": "목소리를 낮추고 규칙 읽듯 또박또박 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-2:evidence_hit",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "음성 원문을 들으니 '조용히 보고 있다'가 오해될 만하군요. 제가 너무 취지만 보고 있었네요.",
      "behaviorHint": "입술을 다문 채 파일 재생 시간을 한 번 더 확인한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "tenant12:beat:b:d-5:deny",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "정정이 그렇게 늦은 건 아닙니다. 관리인이 설명 중인 걸로 알았습니다.",
      "behaviorHint": "짧게 부인한 뒤 시선을 옆으로 뺀다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-5:hedge",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "별도 공지를 내면 일이 더 커질까 봐 관리실 선에서 정리되는 줄 알았습니다.",
      "behaviorHint": "말끝을 흐리며 관리인 쪽으로 책임선을 민다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-5:partial",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "정정문을 바로 내지 않은 건 맞습니다. 다만 관리실 선에서 정리되고 있다고 생각했습니다.",
      "behaviorHint": "한 번 숨을 멈춘 뒤 인정 문장을 짧게 잘라 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-5:blame",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "전달 과정이 엉켜서 그렇게 된 겁니다. 그걸 제가 너무 늦게 봤습니다.",
      "behaviorHint": "경로를 손으로 그리며 주체보다 흐름을 먼저 설명한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-5:confession",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "소문이 퍼지는 동안 정정 공지를 내지 않고 관리실에만 맡긴 건 제 판단이었습니다. 정정 지연과 방관 책임은 결국 제게 있습니다.",
      "behaviorHint": "등을 펴고 더는 빙 돌리지 않겠다는 듯 낮게 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-5:evidence_hit",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "문자 시각이 남으니 더는 미룰 말이 없네요. 제가 '조용히 처리하라'고 두고 본 시간이 있었습니다.",
      "behaviorHint": "문자 시간대를 보는 순간 표정이 굳고 목소리가 낮아진다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "tenant12:beat:b:d-4:deny",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "불편이 한두 번이 아니었습니다. 계속 이야기가 들어왔어요.",
      "behaviorHint": "기록보다 체감을 먼저 꺼내며 단정적으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-4:hedge",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "늦은 방문객이며 분리배출이며 자꾸 말이 나왔습니다.",
      "behaviorHint": "항목을 하나씩 나열하며 반복성을 암시한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-4:partial",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "기록상 큰 민원이 누적된 건 아니지만 불편 호소는 있었습니다.",
      "behaviorHint": "잠깐 침묵 뒤 기록과 체감을 나눠 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-4:blame",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제가 다른 세입자들 말에 너무 무게를 두고 체감을 키운 면도 있겠지요.",
      "behaviorHint": "말끝을 낮추며 자기 체감과 타인 말을 섞어 설명한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-4:confession",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "실제 생활 불편은 제한적이었고, 제가 그 이상으로 인상을 키운 부분이 있습니다. 제 잘못이었습니다.",
      "behaviorHint": "시선을 아래로 두고 인정 문장을 또박또박 읽는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "tenant12:beat:b:d-4:evidence_hit",
      "caseId": "tenant-12",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "민원대장을 보니 세 건이 전부군요. 제가 체감 불편을 기록 이상으로 크게 말했습니다.",
      "behaviorHint": "기록 숫자를 보고 잠시 멈췄다가 한숨과 함께 인정한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-6"
    }
  ]
}


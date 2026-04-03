export const family04TellsBeats = {
  "caseId": "family-04",
  "executableTells": {
    "a": [
      {
        "id": "family04:a:tell:file_stack",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "파일명",
          "날짜",
          "계좌 메모",
          "보시죠"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "밀리기 시작하면 캡처와 메모를 여러 장 연달아 제시해 질문의 속도를 서류 속도로 바꾼다."
      },
      {
        "id": "family04:a:tell:narrowed_answer",
        "appliesWhen": [
          "lying",
          "avoiding",
          "shame"
        ],
        "lexicalHooks": [
          "그 시점만 보면",
          "그 화면 기준으로",
          "적어도 그때는"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 부분은 '그 시점만 보면' 같은 표현으로 범위를 좁혀 전체 맥락을 잘라낸다."
      },
      {
        "id": "family04:a:tell:interpretive_lead",
        "appliesWhen": [
          "emotional",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "그러니까",
          "결국",
          "그래서"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "사실을 말하는 척하면서 끝부분에 '그러니까 네가 건드린 거지' 같은 해석을 붙인다."
      }
    ],
    "b": [
      {
        "id": "family04:b:tell:martyr_checklist",
        "appliesWhen": [
          "lying",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "보일러",
          "약",
          "우편",
          "병원"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "불리한 반출 질문이 나오면 보일러 수리, 약 사다 준 일, 우편 찾은 일을 연속으로 말해 희생 서사로 덮는다."
      },
      {
        "id": "family04:b:tell:indignation_echo",
        "appliesWhen": [
          "cornered",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "내가?",
          "왜 나부터",
          "또 나야"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 '네가 가져갔지'라고 하면 '내가? 내가?'처럼 되묻고 억울함을 크게 부풀린다."
      },
      {
        "id": "family04:b:tell:injured_jump",
        "appliesWhen": [
          "emotional",
          "avoiding",
          "hurt"
        ],
        "lexicalHooks": [
          "도둑 취급",
          "결국 나만",
          "역시 또"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "작은 의심에도 바로 '역시 나만 도둑 취급이지'라는 결론으로 뛰어간다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "family04:beat:a:d-2:deny",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "잔액이 비어 있는 화면을 먼저 보낸 겁니다. 메모를 숨기려던 조작은 아니었습니다.",
      "behaviorHint": "목소리는 낮고 빠르며, 손가락으로 화면 가장자리만 짚는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family04:beat:a:d-2:hedge",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 시점만 보면 잔액 확인이 우선이었습니다. 전체 맥락은 뒤에서 더 붙일 수 있다고 봤습니다.",
      "behaviorHint": "문장 앞에 '그 시점만 보면'을 붙이고 시선을 피하지 않는다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family04:beat:a:d-2:partial",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "잘린 캡처를 따로 저장해 보낸 건 맞습니다. 다만 바로 범인으로 확정하려던 건 아니었습니다.",
      "behaviorHint": "입술을 한번 다물고, 인정하는 대목만 짧게 끊어 말한다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family04:beat:a:d-2:blame",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "원본을 먼저 안 보낸 책임은 제게 있습니다. 대신 민규가 파일 맥락을 '정리본'으로 흐려 둔 상태였다는 점도 같이 보셔야 합니다.",
      "behaviorHint": "서류를 한 장 더 꺼내며 책임 일부를 상대 쪽으로 밀어 넣는다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "family04:beat:a:d-2:confession",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 원본을 보고도 잘린 잔액 화면만 보냈습니다. 그 선택이 민규 의심을 키웠습니다.",
      "behaviorHint": "시선이 잠깐 아래로 떨어지고, 마지막 문장에서 속도가 느려진다.",
      "applicableStates": [
        "S5"
      ]
    },
    {
      "id": "family04:beat:a:d-2:evidence_hit",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "크롭 기록이 연속으로 남아 있다면, 일부만 골라 보낸 사실 자체는 부정하지 않겠습니다.",
      "behaviorHint": "표정이 굳고, 즉시 다른 자료를 더 꺼내며 통제권을 되찾으려 한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "family04:beat:a:d-4:deny",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "공동 폴더 원칙을 깨려던 건 아닙니다. 확인용 화면을 먼저 올린 겁니다.",
      "behaviorHint": "단정적으로 말하되 감정은 거의 드러내지 않는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family04:beat:a:d-4:hedge",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "그때는 잘린 화면을 임시로 올린 정도였습니다. 원본을 나중에 붙이면 된다고 봤습니다.",
      "behaviorHint": "문장 끝을 흐리지 않고 '임시'라는 단어를 눌러 말한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family04:beat:a:d-4:partial",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 원본 대신 크롭본을 먼저 올렸고 설명도 비워 뒀습니다. 원칙 위반이라는 지적은 받아들이겠습니다. 다만 민규도 파일명을 '정리본'으로 흐려 둔 상태였다는 점은 같이 봐야 합니다.",
      "behaviorHint": "짧게 수긍한 뒤 곧바로 다음 설명으로 넘어간다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family04:beat:a:d-4:blame",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제 위반 이전에 민규가 기부 자료 파일명을 흐려 둔 것도 사실입니다. 폴더가 헷갈리게 된 건 한쪽만의 행동이 아니었습니다.",
      "behaviorHint": "폴더 변경 이력을 가리키며 문장을 차례로 쌓는다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "family04:beat:a:d-4:confession",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "공동 폴더 규칙은 저도 어겼습니다. 원본과 설명 대신 잘린 캡처를 먼저 올린 건 제 잘못입니다.",
      "behaviorHint": "숨을 한번 고르고, 군더더기 없이 결론만 말한다.",
      "applicableStates": [
        "S5"
      ]
    },
    {
      "id": "family04:beat:a:d-4:evidence_hit",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "파일명 변경 이력과 제 업로드 시각이 나란히 잡히면, 제가 원칙을 어겼다는 건 피해가기 어렵습니다.",
      "behaviorHint": "손을 멈추고 로그를 잠깐 응시한 뒤 인정으로 전환한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "family04:beat:a:d-5:deny",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "외부 문의는 대응 절차를 알아본 정도였습니다. 부모님 앞에서도 확정이 아니라 가능성으로 말했습니다.",
      "behaviorHint": "차갑게 단어를 골라 말하며 감정은 잘라낸다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family04:beat:a:d-5:hedge",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "그 시점만 보면 저는 법적 가능성을 묻고 있었을 뿐입니다. 단정을 말한 건 아니라고 생각했습니다.",
      "behaviorHint": "'법적 가능성' 같은 제도 언어로 감정을 덮는다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family04:beat:a:d-5:partial",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "부모님보다 외부 지인에게 먼저 물은 순서는 잘못됐습니다. 예전 차용금 기억이 저를 너무 앞서가게 했습니다.",
      "behaviorHint": "어깨가 조금 굳고, 마지막 문장에서만 감정이 새어 나온다.",
      "applicableStates": [
        "S2",
        "S4"
      ]
    },
    {
      "id": "family04:beat:a:d-5:blame",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "민규를 전제로 물은 책임은 제게 있습니다. 그 배경엔 오래된 차용금과 반복된 불신이 있었습니다.",
      "behaviorHint": "스스로를 탓하다가도 곧바로 오래된 맥락을 덧붙인다.",
      "applicableStates": [
        "S3",
        "S4"
      ]
    },
    {
      "id": "family04:beat:a:d-5:confession",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "저는 부모님께 확인하기 전에 세무 지인에게 먼저 물었고, 부모님 앞에서도 의심을 먼저 꺼냈습니다. 그건 분명히 제 잘못입니다.",
      "behaviorHint": "결론을 단문으로 끊고, 이후 해명 없이 침묵이 길어진다.",
      "applicableStates": [
        "S5"
      ]
    },
    {
      "id": "family04:beat:a:d-5:evidence_hit",
      "caseId": "family-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "메시지 원문이 그대로 남아 있다면 제 문의가 중립적이었다고 하긴 어렵겠습니다.",
      "behaviorHint": "입술이 잠깐 굳고, 질문형 변명을 접는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "family04:beat:b:d-3:deny",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "훔쳐 간 게 아닙니다. 잠깐 안전한 데 옮겨 둔 겁니다.",
      "behaviorHint": "억울하다는 표정으로 고개를 세게 젓는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family04:beat:b:d-3:hedge",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "집에 두는 것보다 제 금고가 낫다고 본 겁니다. 바로 말 못 한 건 싸움이 커질까 봐서였고요.",
      "behaviorHint": "목이 잠긴 채 변명과 하소연을 섞어 말한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family04:beat:b:d-3:partial",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "네, 제가 인감하고 등기 원본을 작업실 금고로 옮겼습니다. 보관 목적이었지만 무단 반출이라는 점은 피하기 어렵네요.",
      "behaviorHint": "어깨를 움츠리고, '보관'이라는 단어에서만 힘을 준다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family04:beat:b:d-3:blame",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 숨긴 건 잘못입니다. 그런데 누나가 문서를 혼자 쥐고 갈 것 같다는 불안이 계속 있었어요.",
      "behaviorHint": "인정 뒤에 바로 누나 이야기를 길게 덧붙인다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "family04:beat:b:d-3:confession",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "제가 사흘 동안 원본을 제 작업실 금고에 두고 바로 알리지 않았습니다. 그건 절차 위반이고 제 잘못입니다.",
      "behaviorHint": "말끝이 작아지고, 마지막 문장은 고개를 숙인 채 나온다.",
      "applicableStates": [
        "S5"
      ]
    },
    {
      "id": "family04:beat:b:d-3:evidence_hit",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "도어락 기록이랑 금고 사진이 같이 맞아떨어지면, 제가 안 가져갔다고는 더 못 하죠.",
      "behaviorHint": "짧게 한숨을 쉬고 손을 무릎 위에 꽉 쥔다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "family04:beat:b:d-4:deny",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "파일명 좀 정리한 걸로 무슨 은폐까지 갑니까. 보기 좋게 바꾼 거예요.",
      "behaviorHint": "되묻는 어조로 시작하고 억울한 웃음을 짧게 섞는다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family04:beat:b:d-4:hedge",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "'정리본'은 임시 제목이었습니다. 설명은 나중에 달 생각이었어요.",
      "behaviorHint": "문장을 길게 늘이며 의도를 선하다고 포장한다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family04:beat:b:d-4:partial",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, 기부 자료 파일명을 모호하게 바꿨고 설명도 비워 뒀습니다. 그건 규칙 위반 맞습니다. 그래도 누나도 잘린 캡처를 먼저 올린 건 같이 봐야 하지 않나요.",
      "behaviorHint": "인정은 하되 목소리에 여전히 억울함이 남아 있다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family04:beat:b:d-4:blame",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "근데 누나도 잘린 화면을 올렸잖아요. 폴더가 헷갈리게 된 건 저 혼자 만든 게 아닙니다.",
      "behaviorHint": "손바닥을 펴 보이며 책임을 반으로 나누려 한다.",
      "applicableStates": [
        "S3"
      ]
    },
    {
      "id": "family04:beat:b:d-4:confession",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "정리 습관이라고 넘길 일이 아니었습니다. 제가 모호한 이름을 붙이고 설명을 비워 둔 게 오해를 키웠습니다.",
      "behaviorHint": "억울한 톤이 빠지고 문장이 짧아진다.",
      "applicableStates": [
        "S5"
      ]
    },
    {
      "id": "family04:beat:b:d-4:evidence_hit",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "로그에 제 계정으로 파일명 바꾼 시간이 박혀 있으면, 임시였다는 말만으론 안 되겠네요.",
      "behaviorHint": "시선이 흔들리고 이후 말수를 줄인다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "family04:beat:b:d-5:deny",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "저는 재산 보호 차원에서 물어본 겁니다. 누나를 밖에서 범인 취급한 건 아니에요.",
      "behaviorHint": "억울한 표정을 먼저 만들고 답을 시작한다.",
      "applicableStates": [
        "S0"
      ]
    },
    {
      "id": "family04:beat:b:d-5:hedge",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "혹시 먼저 움직일 수 있는지만 확인한 거죠. 훔쳤다고 확정한 건 아니었습니다.",
      "behaviorHint": "끝을 질문처럼 올려 자기 말을 누그러뜨린다.",
      "applicableStates": [
        "S1"
      ]
    },
    {
      "id": "family04:beat:b:d-5:partial",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 부모님보다 먼저 부동산 지인에게 물었습니다. 순서가 잘못된 건 인정합니다.",
      "behaviorHint": "짧게 인정한 뒤 바로 변명할 말을 찾는다.",
      "applicableStates": [
        "S2"
      ]
    },
    {
      "id": "family04:beat:b:d-5:blame",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "누나가 문서를 쥐고 있고 잘린 화면까지 보냈으니 제가 겁이 날 수밖에 없었어요. 그래서 먼저 물어본 겁니다.",
      "behaviorHint": "억울함과 두려움을 번갈아 올리며 말이 길어진다.",
      "applicableStates": [
        "S3",
        "S4"
      ]
    },
    {
      "id": "family04:beat:b:d-5:confession",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "제가 부모님께 먼저 확인하지 않고 밖으로 의심을 꺼냈습니다. 억울함을 방패 삼아 일을 더 키웠습니다.",
      "behaviorHint": "목소리가 내려가고, 마지막 문장 뒤에 시선이 바닥으로 떨어진다.",
      "applicableStates": [
        "S5"
      ]
    },
    {
      "id": "family04:beat:b:d-5:evidence_hit",
      "caseId": "family-04",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "통화 기록하고 메시지가 다 남아 있으면, 제가 먼저 누나 쪽으로 의심을 돌린 건 부정 못 하죠.",
      "behaviorHint": "입안이 마른 듯 말을 끊어 가며 이어간다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-6"
    }
  ]
}

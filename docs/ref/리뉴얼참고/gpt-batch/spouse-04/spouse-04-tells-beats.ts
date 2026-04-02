export const spouse04TellsBeats = {
  "caseId": "spouse-04",
  "executableTells": {
    "a": [
      {
        "id": "spouse04:a:tell:task_listing",
        "appliesWhen": [
          "lying",
          "avoiding",
          "cornered"
        ],
        "lexicalHooks": [
          "공방 정리",
          "차 빼고",
          "전화 받고"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "핵심 질문을 받으면 '공방 정리하고, 차 빼고, 전화 받고'처럼 자잘한 동선을 길게 나열한다."
      },
      {
        "id": "spouse04:a:tell:passive_voice",
        "appliesWhen": [
          "shame",
          "defensive",
          "emotional"
        ],
        "lexicalHooks": [
          "그렇게 되더라",
          "일이 꼬였다",
          "말이 늦어졌다"
        ],
        "sentenceShape": "conditional",
        "cadence": "once_every_2_turns",
        "originalPattern": "'그렇게 되더라', '일이 꼬였다'처럼 주체를 흐리는 수동형을 쓴다."
      },
      {
        "id": "spouse04:a:tell:time_bargain",
        "appliesWhen": [
          "cornered",
          "hurt",
          "face_saving"
        ],
        "lexicalHooks": [
          "30분만",
          "잠깐",
          "금방 끝낼 생각이었다"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "'30분만 이해했으면 됐잖아'처럼 잘못의 크기를 시간 단위로 깎아 말한다."
      }
    ],
    "b": [
      {
        "id": "spouse04:b:tell:timeline_crosscheck",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "18시 07분",
          "26분 전",
          "그 다음 분에"
        ],
        "sentenceShape": "number_first",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 시간을 말하면 곧바로 다른 기록과 분 단위로 대조한다."
      },
      {
        "id": "spouse04:b:tell:symbolic_weight",
        "appliesWhen": [
          "hurt",
          "emotional",
          "shame"
        ],
        "lexicalHooks": [
          "첫 결혼기념일",
          "그날",
          "상징"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "once_every_2_turns",
        "originalPattern": "'그날이 첫 기념일이었다'며 행동의 의미를 더 크게 부풀려 말한다."
      },
      {
        "id": "spouse04:b:tell:evidence_stack",
        "appliesWhen": [
          "defensive",
          "cornered",
          "avoiding"
        ],
        "lexicalHooks": [
          "캡처",
          "통화기록",
          "백업본"
        ],
        "sentenceShape": "enumeration",
        "cadence": "on_trigger_only",
        "originalPattern": "한 증거가 부족해도 세 개쯤 연달아 꺼내며 이미 결론이 났다는 듯 압박한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "spouse04:beat:a:d-1:deny",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그날은 진짜 작업실이 뒤집혀서 먼저 가야 했습니다. 그걸 거짓말이라고만 보시면 억울합니다.",
      "behaviorHint": "시선을 피한 채 손가락으로 할 일을 하나씩 세며 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-1:hedge",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "클라이언트 호출이라는 표현이 과했을 수는 있어도, 당시엔 다 급하게 겹쳐 있었습니다.",
      "behaviorHint": "문장 앞을 길게 끌고 마지막 단어를 흐린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-1:partial",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "업무 호출은 아니었습니다. 어머니 댁에 맡겨 둔 물건을 찾으러 잠깐 들른 건 맞습니다.",
      "behaviorHint": "한숨을 삼키고 인정할 부분만 짧게 꺼낸다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-1:blame",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "선물 준비를 가족 손을 빌려 하다 보니 동선이 꼬였습니다. 제가 숨긴 건 맞지만, 다은 씨를 버리려던 건 아니었습니다.",
      "behaviorHint": "어깨를 움츠리고 변명과 해명을 섞어 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-1:confession",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "긴급업무는 핑계였습니다. 저는 작업실에서 바로 어머니 아파트로 갔고, 그 거짓말로 첫 기념일 약속을 깨뜨렸습니다.",
      "behaviorHint": "고개를 들지 못한 채 짧게 끊어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-1:evidence_hit",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "출입기록까지 나오면 더는 우길 수 없습니다. 적어도 그 문자가 사실이 아니었다는 건 인정하겠습니다.",
      "behaviorHint": "입술을 깨물고 말의 속도가 갑자기 느려진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "spouse04:beat:a:d-4:deny",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "가족을 끼운다기보다 보관만 잠깐 맡긴 수준이었습니다. 식사 자리에 부른 건 아니잖아요.",
      "behaviorHint": "손바닥을 펴 보이며 개입의 크기를 축소한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-4:hedge",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "직접 참여를 시킨 건 아니고 준비 과정에서 도움을 받은 정도였습니다.",
      "behaviorHint": "문장 끝을 낮추며 '정도'라는 말을 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-4:partial",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "맞습니다. 선물 케이스와 장식은 어머니에게 맡겼습니다. 그 시점에서 약속을 어긴 겁니다.",
      "behaviorHint": "빠르게 인정한 뒤 바로 다음 설명으로 넘어가려 한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-4:blame",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "하지만 다은 씨도 브로치를 빌리며 예약 정보를 보냈습니다. 저만 가족을 우회로로 쓴 건 아닙니다.",
      "behaviorHint": "시선을 올리며 책임을 반씩 나누려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-4:confession",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "제가 먼저 경계를 느슨하게 만든 건 맞습니다. 서프라이즈라는 명분으로 가족을 끌어들여 둘만의 약속을 무너뜨렸습니다.",
      "behaviorHint": "손을 모은 채 변명 없이 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-4:evidence_hit",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "메신저와 주차기록이 같이 나오면 '잠깐 보관'이라고만 할 수는 없네요. 준비 단계부터 가족을 끼운 건 맞습니다.",
      "behaviorHint": "말하다가 멈추고 낮게 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "spouse04:beat:a:d-5:deny",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "어머니가 일부러 망치려 했다는 건 너무 나간 해석 같습니다. 참견은 있었어도 그 정도라고는 못 보겠습니다.",
      "behaviorHint": "어머니라는 단어 앞에서 숨을 고르며 시선을 돌린다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-5:hedge",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "개입이 있었다고 해도 오해에서 비롯된 참견일 수 있습니다. 의도적 방해라고 단정하긴 어렵습니다.",
      "behaviorHint": "손끝을 비비며 문장을 조건절로 길게 늘인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-5:partial",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예약 코드와 케이크 문구를 아는 사람이 움직인 건 맞습니다. 다만 그때 저는 어머니를 바로 지목하고 싶지 않았습니다.",
      "behaviorHint": "사실을 반쯤 인정하면서도 주어를 흐린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-5:blame",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "솔직히 저는 가능성을 알고도 외면했습니다. 어머니를 막지 못한 것도, 다은 씨에게 바로 말하지 않은 것도 제 잘못입니다.",
      "behaviorHint": "목이 잠긴 채 단어를 끊어 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-5:confession",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "배후에는 어머니 강정희의 의도적 개입이 있었습니다. 저는 그 징후를 보고도 가족을 감싸며 거짓말로 시간을 벌었습니다.",
      "behaviorHint": "고개를 숙인 채 단정적으로 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:a:d-5:evidence_hit",
      "caseId": "spouse-04",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "통화기록과 변경대장이 나오면 누군가 코드로 움직였다는 건 부인할 수 없습니다. 그 연결점이 어머니라는 것도 압니다.",
      "behaviorHint": "턱을 굳히고 잠시 침묵한 뒤 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse04:beat:b:d-2:deny",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "저는 태블릿을 뒤진 게 아닙니다. 눈앞에 뜬 알림을 본 정도였어요.",
      "behaviorHint": "정확한 단어 선택에 집착하며 손가락으로 경계를 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-2:hedge",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "메일함 전체를 뒤진 건 아니었고, 이미 떠 있던 알림을 확인한 겁니다.",
      "behaviorHint": "문구 차이를 강조하듯 짧게 끊어 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-2:partial",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 알림을 캡처한 건 맞습니다. 그때는 하준이 직접 예약을 바꾼 줄 알았습니다.",
      "behaviorHint": "시선을 고정한 채 사실과 해석을 분리해 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-2:blame",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "친구들에게 보낸 것도 맞지만, 그만큼 제가 혼자 감당할 수 없을 만큼 상처가 컸습니다.",
      "behaviorHint": "입술을 굳게 다문 채 감정의 크기를 강조한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-2:confession",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "저는 동기화된 태블릿을 무단 확인했고, 캡처를 친구 단톡에 먼저 공유했습니다. 의심이 생겨도 먼저 본인에게 확인했어야 했습니다.",
      "behaviorHint": "호흡을 길게 내쉰 뒤 또박또박 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-2:evidence_hit",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "캡처 시각과 전송본이 같이 나오면 '잠깐 본 것'이라고는 못 하겠네요. 제가 선을 넘은 건 맞습니다.",
      "behaviorHint": "어깨가 굳고 목소리가 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "spouse04:beat:b:d-3:deny",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "하준 태블릿에 변경 알림이 떴다면 당연히 하준이 직접 바꿨다고 볼 수밖에 없었습니다.",
      "behaviorHint": "분 단위 타임라인을 세며 확신하듯 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-3:hedge",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 본 건 변경 완료 알림이었고, 그 순간엔 다른 발신자를 떠올릴 근거가 없었습니다.",
      "behaviorHint": "문장마다 근거라는 단어에 힘을 준다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-3:partial",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "맞아요, 알림만으로는 직접 취소를 단정할 수 없었습니다. 그래도 제 눈엔 그렇게 보였습니다.",
      "behaviorHint": "인정하는 대목마다 짧게 멈칫한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-3:blame",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 하준을 범인처럼 몰아간 건 인정하지만, 그렇게 보이도록 상황이 짜여 있었다고도 생각합니다.",
      "behaviorHint": "억울함과 인정이 섞인 표정으로 말한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-3:confession",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "실제 변경 요청자는 별도 발신자였습니다. 저는 잘린 알림 하나로 하준이 직접 취소했다고 단정했습니다.",
      "behaviorHint": "손에 쥔 물건을 내려놓고 시선을 내린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-3:evidence_hit",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "통화기록 요약이 나오면 더는 '하준이 직접 했다'고만 말할 수 없습니다. 알림과 요청 주체가 다르네요.",
      "behaviorHint": "말을 멈추고 기록 쪽으로 시선을 돌린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "spouse04:beat:b:d-4:deny",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "브로치를 빌리려고 연락한 건 맞지만, 그걸 가족 개입이라고까지 보진 않았습니다.",
      "behaviorHint": "어깨를 세운 채 행위의 의미를 줄여 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-4:hedge",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "식사 자리에 가족을 부른 건 아니고, 준비 때문에 잠깐 연락한 정도였습니다.",
      "behaviorHint": "준비라는 말을 반복하며 선을 긋는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-4:partial",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "브로치를 빌리려 연락했고 예약 캡처도 보냈습니다. 그건 선을 넘은 행동이었습니다.",
      "behaviorHint": "정확한 순서대로 사실을 정리하며 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-4:blame",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "하지만 하준도 선물과 케이크를 어머니 쪽에 맡겼습니다. 둘 다 각자 가족을 우회로로 쓴 겁니다.",
      "behaviorHint": "상대와 자신을 번갈아 가리키며 균형을 잡으려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-4:confession",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저 역시 가족 개입의 통로를 열었습니다. '가족은 끼우지 말자'는 문장을 제 쪽에서도 먼저 지키지 못했습니다.",
      "behaviorHint": "표정이 무너지며 말끝을 작게 내린다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "spouse04:beat:b:d-4:evidence_hit",
      "caseId": "spouse-04",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "가족단톡 백업본이 나오면 더는 '잠깐 연락'이라고만 할 수 없어요. 코드까지 보낸 건 분명한 제 잘못입니다.",
      "behaviorHint": "휴대폰을 내려다보다가 시선을 떼지 못한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    }
  ]
} as const;

export default spouse04TellsBeats;

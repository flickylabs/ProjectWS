export const partnership01TellsBeats = {
  "caseId": "partnership-01",
  "executableTells": {
    "a": [
      {
        "id": "partnership-01:a:tell:clause_recital",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "계약상",
          "숫자로 보면",
          "조항상"
        ],
        "sentenceShape": "number_first",
        "cadence": "on_trigger_only",
        "originalPattern": "핵심 의도를 묻는 질문이 나오면 계약 문구와 숫자를 길게 인용해 본심 설명을 뒤로 미룬다."
      },
      {
        "id": "partnership-01:a:tell:sequence_lock",
        "appliesWhen": [
          "cornered",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "순서대로",
          "먼저",
          "그다음"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "자신이 정한 시간순서대로만 답하겠다며 질문의 초점을 다시 배열하려 든다."
      },
      {
        "id": "partnership-01:a:tell:affect_flattening",
        "appliesWhen": [
          "emotional",
          "avoiding",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "감정은 별개고",
          "구조를 보죠",
          "절차상"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "상대가 배신감을 말하면 '감정은 별개고 구조를 보자'며 정서적 쟁점을 절차 문제로 납작하게 만든다."
      }
    ],
    "b": [
      {
        "id": "partnership-01:b:tell:headline_accusation",
        "appliesWhen": [
          "lying",
          "defensive",
          "cornered"
        ],
        "lexicalHooks": [
          "결국",
          "요점은",
          "그러니까"
        ],
        "sentenceShape": "question_end",
        "cadence": "every_turn",
        "originalPattern": "세부 사실보다 '결국 돈을 뺐다는 거네' 같은 헤드라인 결론을 먼저 던진다."
      },
      {
        "id": "partnership-01:b:tell:pressure_repeat",
        "appliesWhen": [
          "cornered",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "맞죠",
          "그렇죠",
          "아니죠"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "같은 질문을 짧게 세 번쯤 반복하며 상대의 표정 변화로 빈틈을 찾으려 한다."
      },
      {
        "id": "partnership-01:b:tell:context_cut",
        "appliesWhen": [
          "emotional",
          "hurt",
          "defensive"
        ],
        "lexicalHooks": [
          "앞뒤 말고",
          "그 한 줄로",
          "핵심만"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "불리한 앞뒤 맥락은 자르고 가장 자극적인 한 줄만 계속 되짚는다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-01:beat:a:d-1:deny",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "1,800만원 송금을 '무단'으로 부르는 건 과합니다. 숫자만 보지 말고 당시엔 브리지 투자 검토 창을 붙잡기 위한 예치 단계였다는 순서를 먼저 봐야 합니다.",
      "behaviorHint": "손가락으로 금액과 날짜를 짚으며 냉정하게 정리한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:a:d-1:hedge",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "최종 전자결재가 남지 않은 건 인정합니다. 다만 그날 안에 신탁계좌를 확보하지 않으면 검토 자체가 무산되는 구조였습니다.",
      "behaviorHint": "고개를 약간 숙인 채 절차와 마감 시점을 분리해서 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-01:beat:a:d-1:partial",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "네, 공동승인 토큰 없이 보낸 건 맞습니다. 하지만 전날 2,000만원 한도까지는 먼저 예치하자는 구두 합의가 있었기 때문에 저는 집행만 앞당긴다고 생각했습니다.",
      "behaviorHint": "한 번 짧게 인정한 뒤 즉시 근거 문맥을 덧댄다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-01:beat:a:d-1:blame",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "형식은 제 손에서 끝났어도 판단의 출발선까지 제가 혼자 만든 건 아닙니다. 한도를 열어놓고 나중에 '그런 승인 없었다'고 돌아서면 그 공백은 전부 제 단독 폭주처럼 남습니다.",
      "behaviorHint": "입술을 굳힌 채 상대를 보지 않고 정면만 응시한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-01:beat:a:d-1:confession",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "네, 최종 서면 승인 없이 1,800만원을 보낸 건 제 잘못입니다. 회사가 버틸지부터 생각하다 보니 최소한의 문서화조차 뒤로 미뤘습니다.",
      "behaviorHint": "어깨를 약간 내리고 짧게 한숨 쉰 뒤 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-01:beat:a:d-1:evidence_hit",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "은행 원본과 예치 초안이 같이 나오면 더는 '예정된 단계였다'는 말로 숨을 수 없습니다. 승인 토큰이 비어 있는 순간 제 판단이 먼저 뛰어간 사실이 그대로 남습니다.",
      "behaviorHint": "서류를 한 번 보고 턱을 굳히며 말수를 줄인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-01:beat:a:d-2:deny",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "제 개인 빚으로 간 돈이면 법무사 신탁계좌와 투자 검토 문서가 같이 붙을 이유가 없습니다. 개인 채무 프레임은 캡처 한 장만 떼서 만든 오독입니다.",
      "behaviorHint": "숫자 대신 계좌 흐름을 짚으며 단정적으로 끊는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:a:d-2:hedge",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "그 캡처가 수상해 보인다는 건 압니다. 그래서 더더욱 원본 문맥과 투자자 비밀유지 사정을 같이 봐야지 문장 하나로 개인 용도라고 결론낼 수는 없습니다.",
      "behaviorHint": "말끝을 낮추며 문맥 복원을 반복 요구한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "partnership-01:beat:a:d-2:partial",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "예치금과 법률 검토비였다는 점은 분명합니다. 다만 저는 초기 브리핑에 누가 있었는지까지는 굳이 먼저 꺼내지 않았습니다.",
      "behaviorHint": "인정은 하되 특정 이름을 늦게 꺼내며 통제한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:a:d-2:blame",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 설명을 늦춘 건 맞지만 그 공백에 '개인 빚'이라는 말을 가장 먼저 꽂아 넣은 건 저 아닙니다. 크롭된 한 줄을 가장 나쁜 의미로 몰아간 해석이 이 프레임을 키웠습니다.",
      "behaviorHint": "시선을 들고 상대 쪽으로 짧게 고개를 돌린다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "partnership-01:beat:a:d-2:confession",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "1,800만원은 개인 채무가 아니라 브리지 투자 예치와 법률 검토를 위한 돈이었습니다. 저는 상대를 감싸겠다는 핑계로 설명을 늦췄고 그 탓에 더 큰 의심을 불렀습니다. 설명을 늦춘 건 제 잘못입니다.",
      "behaviorHint": "한 박자 쉬고 핵심 용도를 또렷하게 못 박는다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "partnership-01:beat:a:d-2:evidence_hit",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "투자자 확인 메일까지 나오면 개인 채무 프레임은 끝입니다. 그 순간 남는 건 제가 왜 그 사실을 더 빨리 더 분명하게 말하지 않았느냐는 질문뿐입니다.",
      "behaviorHint": "증거를 보는 순간 말 속도가 잠시 느려진다.",
      "applicableStates": [
        "S4"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "partnership-01:beat:a:d-5:deny",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "전액 손실이 이미 확정된 것처럼 말하는 건 과합니다. 당시 초안은 환급 가능성을 전제로 움직였고 비환급이 있다 해도 확정 규모라고 보긴 어려웠습니다.",
      "behaviorHint": "손바닥을 아래로 누르며 위험 규모를 낮춰 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:a:d-5:hedge",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "초안에 법률검토비 문구가 있었다는 건 부정하지 않습니다. 다만 초안 단계에서 얼마가 언제 전환되는지까지 확정 문장처럼 들이밀면 해석이 앞서는 겁니다.",
      "behaviorHint": "문구와 확정 사이를 구분하듯 손으로 선을 그린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-01:beat:a:d-5:partial",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "네, 320만원 비환급 위험은 있었습니다. 다만 제가 그 조항을 충분히 짚어 설명하지 않은 것도 맞습니다.",
      "behaviorHint": "짧게 인정하고 시선을 문서로 내린다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-01:beat:a:d-5:blame",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "하지만 그 문구를 저 혼자만 봤다는 식으로 정리하면 안 됩니다. 모두가 전액 환급 쪽 기대를 붙들고 싶어 했고 그 조급함이 작은 문구를 밀어낸 겁니다.",
      "behaviorHint": "문장 후반에서 '모두'를 눌러 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-01:beat:a:d-5:confession",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "실제론 320만원이 자동 비환급 법률검토비로 전환될 수 있었습니다. 그 위험을 축소해서 들은 척한 건 제 책임입니다.",
      "behaviorHint": "숫자를 또렷하게 발음한 뒤 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-01:beat:a:d-5:evidence_hit",
      "caseId": "partnership-01",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "세무사 메모까지 붙으면 숫자는 더 이상 숨지 않습니다. 그때부터는 제가 조항을 몰랐는지가 아니라 왜 그 위험을 공유하지 않았는지가 핵심이 됩니다.",
      "behaviorHint": "증빙을 보고 입술을 잠깐 깨문다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-01:beat:b:d-3:deny",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "결국 회식 자리에서 가능성 얘기한 걸 왜 최종 승인으로 바꿉니까. 저는 '보내라'고 말한 적 없습니다.",
      "behaviorHint": "턱을 들고 짧게 끊어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:b:d-3:hedge",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "2,000만원 한도 얘길 했더라도 그건 투자 성사 전제를 놓고 해본 말입니다. 요점은 정식 승인 절차를 대신할 수는 없어요.",
      "behaviorHint": "같은 핵심어를 반복하며 의미 축소를 시도한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:b:d-3:partial",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "네, 먼저 예치 가자고 한 취지의 말은 했습니다. 그래도 그걸 바로 송금하라는 최종 오케이로 보는 건 제 의도와 다릅니다, 맞죠?",
      "behaviorHint": "짧게 인정한 뒤 곧바로 어조를 높여 선을 긋는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-01:beat:b:d-3:blame",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "서준 씨는 정식 승인도 안 받아놓고 제 회식 발언 하나를 면책증거처럼 들고 나왔습니다. 그러니까 모호한 구두 대화를 자기 절차 위반의 방패로 쓰면 안 되죠.",
      "behaviorHint": "상대 쪽을 향해 손끝을 짧게 내민다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-01:beat:b:d-3:confession",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "맞아요, 저는 그날 구두로 먼저 예치하자고 말했습니다. 그리고 투자 분위기가 흔들리자 그 동의를 공개석상에서 부인했습니다. 그 판단은 제 잘못입니다.",
      "behaviorHint": "세게 붙잡던 어조가 갑자기 낮아진다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "partnership-01:beat:b:d-3:evidence_hit",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 단톡과 음성메모가 동시에 나오면 '그런 말 한 적 없다'는 선은 바로 무너집니다. 핵심만 남죠, 그 말을 왜 나중에 없던 일로 만들었느냐.",
      "behaviorHint": "표정이 굳고 같은 문장을 두 번 되뇐다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-01:beat:b:d-4:deny",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "세무사에게 허위 분개를 지시한 적 없습니다. 요점은 서준 씨가 자기 송금을 덮으려고 회계 명목을 끌어다 쓴 거예요.",
      "behaviorHint": "결론부터 던지고 설명을 뒤로 미룬다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:b:d-4:hedge",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "앞뒤 말고 보세요, 직원 불안을 막자고 표현을 순하게 하자는 말과 공식 분개 지시는 다른 문제입니다. 위기관리 멘트를 회계 명령으로 키워 읽지 마세요.",
      "behaviorHint": "단어 하나를 집어 반복하며 의미를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:b:d-4:partial",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "네, '일단 컨설팅비처럼 잡아달라'는 말은 했습니다. 하지만 그건 임시 표기 차원이지 영구 은폐까지 뜻한 건 아니었습니다.",
      "behaviorHint": "말끝을 세우며 '임시'를 반복 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-01:beat:b:d-4:blame",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "제 위기관리용 말을 서준 씨는 자기 방패처럼 써버렸습니다. 결국 제가 던진 임시 표현을 회계 처리 면허로 받아쓴 다음 책임만 다시 제 쪽에 밀고 있잖아요.",
      "behaviorHint": "목소리를 높이며 같은 요지를 어조만 바꿔 되풀이한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-01:beat:b:d-4:confession",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "맞습니다, 제가 먼저 컨설팅비 임시 분개를 제안했고 나중엔 그 사실을 숨겼습니다. 직원 불안을 막겠다는 명분으로 선을 넘었습니다. 설명을 늦춘 건 제 잘못입니다.",
      "behaviorHint": "빠르게 몰아붙이던 리듬이 끊기고 짧게 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-01:beat:b:d-4:evidence_hit",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "세무사 원본 메일이 나오면 말은 끝나요. 그 한 줄로 누가 먼저 그 명목을 제안했는지가 남으니까요.",
      "behaviorHint": "증거를 보는 순간 턱이 잠깐 굳는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-01:beat:b:d-2:deny",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "그 캡처를 보면 누구라도 같은 의심을 합니다. 그러니까 개인 채무부터 막은 거 아니냐는 해석이 왜 이상하죠?",
      "behaviorHint": "질문 끝을 올리며 결론부터 밀어붙인다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-01:beat:b:d-2:hedge",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "원본이 없어서 단정은 못 해도 그 한 줄로 수상하다는 인상까지 지워지진 않습니다. 설명을 안 한 사람이 먼저 책임져야죠, 그렇죠?",
      "behaviorHint": "같은 인상어를 짧게 두 번 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "partnership-01:beat:b:d-2:partial",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "지금은 개인 채무라고 확정할 수 없다는 건 압니다. 그래도 그 의심을 부른 건 서준 씨의 비밀주의와 승인 없는 이체였습니다.",
      "behaviorHint": "한 번 물러선 뒤 즉시 상대 동기를 겨냥한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "partnership-01:beat:b:d-2:blame",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 그 프레임을 세게 민 건 사실이지만 애초에 가장 나쁜 상상을 하게 만든 쪽도 서준 씨입니다. 앞뒤 말고 캡처만 남게 해놓고 왜 의심은 제 몫만 되나요.",
      "behaviorHint": "속도를 높여 말한 뒤 마지막 문장을 되받아친다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-3"
    },
    {
      "id": "partnership-01:beat:b:d-2:confession",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "예치금은 개인 채무 상환이 아니었습니다. 저는 화가 나서 그 크롭 캡처를 무기처럼 썼고 그게 사실보다 앞섰습니다. 그건 제 잘못입니다.",
      "behaviorHint": "짧은 침묵 뒤 단정 어조를 내려놓고 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "partnership-01:beat:b:d-2:evidence_hit",
      "caseId": "partnership-01",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "투자자 확인 메일이 붙는 순간 '개인 빚'이라는 말은 버려야 합니다. 핵심만 남죠, 제가 왜 약한 캡처를 강한 비난으로 키웠느냐는 문제뿐입니다.",
      "behaviorHint": "메일을 읽다 말고 같은 단어를 작게 되뇐다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
};

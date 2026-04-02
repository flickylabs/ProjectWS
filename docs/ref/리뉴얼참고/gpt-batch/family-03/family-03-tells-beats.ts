export const family03TellsBeats = {
  "caseId": "family-03",
  "executableTells": {
    "a": [
      {
        "id": "family03:a:tell:hardship_rollcall",
        "appliesWhen": [
          "lying",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "월세",
          "전기료",
          "약값",
          "반찬값"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "불리한 사용처 질문이 나오면 월세, 전기료, 약값, 반찬값을 한 번에 나열해 쟁점을 생활고 전체로 키운다."
      },
      {
        "id": "family03:a:tell:tear_pause",
        "appliesWhen": [
          "emotional",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "하…",
          "내가",
          "그걸"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "결정적인 반박 직전에 말을 잠깐 멈추고 한숨을 길게 쉬어, 질문 자체가 모질게 느껴지도록 만든다."
      },
      {
        "id": "family03:a:tell:borrowed_authority",
        "appliesWhen": [
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "네 아버지도",
          "장남",
          "집안"
        ],
        "sentenceShape": "question_end",
        "cadence": "once_every_2_turns",
        "originalPattern": "'네 아버지도 장남은 다르다 했어'처럼 현재 쟁점과 직접 무관한 가족 권위를 끌어와 압박한다."
      }
    ],
    "b": [
      {
        "id": "family03:b:tell:delay_buffer",
        "appliesWhen": [
          "avoiding",
          "lying",
          "defensive"
        ],
        "lexicalHooks": [
          "순서대로",
          "일단",
          "출근이"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "답을 바로 하지 않고 '그건 순서대로 말해야 해'라며 설명 순서를 자신에게 유리하게 늦춘다."
      },
      {
        "id": "family03:b:tell:soft_minimizing",
        "appliesWhen": [
          "lying",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "조금",
          "한 번",
          "비튼 거지"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "감액이나 지연은 '조금 밀린 거지', '한 번 비튼 거지'처럼 규모를 줄여 표현한다."
      },
      {
        "id": "family03:b:tell:clipped_apology",
        "appliesWhen": [
          "cornered",
          "emotional",
          "hurt"
        ],
        "lexicalHooks": [
          "미안한 건 맞아",
          "근데",
          "사정이"
        ],
        "sentenceShape": "conditional",
        "cadence": "on_trigger_only",
        "originalPattern": "궁지에 몰리면 '미안한 건 맞아'라고 짧게 인정한 뒤, 곧바로 다른 사정 설명으로 화제를 옮긴다."
      }
    ]
  },
  "beatScripts": [
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "월세, 전기료, 약값, 반찬값까지 다 제 통장에서 나갔어요. 그 돈을 제가 어디 딴 데 쓸 정신이 있었겠어요?",
      "behaviorHint": "손가락으로 지출 항목을 하나씩 세며 시선을 정면으로 피하지 않는다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family03:beat:a:d-3:deny"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "가족 안에서 잠깐 돈이 돌았을 수는 있어도 결국 다 집안 살림이었어요. 부모 마음은 자식이 잘 몰라요.",
      "behaviorHint": "숨을 길게 쉬고 두 번째 문장을 낮게 끌어 말한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family03:beat:a:d-3:hedge"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "수빈이 쪽으로 조금 간 건 맞아요. 그래도 그때도 집안 급한 숨통을 막으려던 수준이었지, 제가 숨겨 빼돌린 건 아니에요.",
      "behaviorHint": "처음엔 고개를 끄덕였다가 곧 손사래를 친다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family03:beat:a:d-3:partial"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "정우가 꼭 장부 검사하듯 묻지 않았어도 제가 그렇게까지 숨기진 않았을 거예요. 장남 돈이라고 말을 세게 하니까 더 말문이 막힌 거죠.",
      "behaviorHint": "입술을 깨물다가 마지막 문장에서 목소리를 높인다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family03:beat:a:d-3:blame"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "맞아요, 그 돈 일부를 수빈 학원비랑 교통비에 보냈어요. 전부 약값이라 한 건 제 체면 지키려던 거짓말이었어요.",
      "behaviorHint": "말끝이 짧아지고 마지막에 시선을 내리깐다.",
      "applicableStates": [
        "S5"
      ],
      "id": "family03:beat:a:d-3:confession"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "…같은 날 송금 내역이 저렇게 찍혀 있네요. 하, 그건 제가 더 둘러댈 말이 없어요.",
      "behaviorHint": "한숨을 길게 내쉬고 손으로 이마를 문지른다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-3",
      "id": "family03:beat:a:d-3:evidence_hit"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "그걸 무슨 망신 주려고 올렸겠어요? 친척이든 교회든 제가 숨 좀 쉬려고 말 꺼낸 거예요.",
      "behaviorHint": "억울하다는 듯 두 손을 벌렸다가 금세 모은다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family03:beat:a:d-4:deny"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "문장이 세 보였을 수는 있어도 그 방 사람들이 다 사정을 아는 식구들이잖아요. 상의하려던 거지 공개재판은 아니었어요.",
      "behaviorHint": "말끝마다 작게 되묻듯 올리며 반응을 살핀다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family03:beat:a:d-4:hedge"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제가 먼저 올린 건 맞아요. 그래도 답답하니까 누가 좀 중간에서 말해주길 바랐던 거예요.",
      "behaviorHint": "어깨가 처지다가도 중간 문장에서 손으로 원을 그리듯 설명한다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family03:beat:a:d-4:partial"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "정우가 제 전화를 피하지만 않았어도 제가 방에까지 올리지 않았겠죠. 저 혼자 들고 있으면 다 제가 구걸하는 사람처럼 보이니까요.",
      "behaviorHint": "눈시울이 붉어지고 마지막 문장을 급히 내뱉는다.",
      "applicableStates": [
        "S3"
      ],
      "id": "family03:beat:a:d-4:blame"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "단톡에 캡처 올려서 사람들 시선까지 끌어들인 건 제가 넘은 거예요. 하소연이 아니라 압박이 된 것도 알아요.",
      "behaviorHint": "고개를 숙인 채 짧게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "id": "family03:beat:a:d-4:confession"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "내보내기 파일이 그렇게 먼저 찍혀 있으면 제가 부인해도 소용없네요. 정우보다 방에 먼저 올린 건 맞아요.",
      "behaviorHint": "말을 멈췄다가 천천히 인정하는 표정으로 돌아선다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-4",
      "id": "family03:beat:a:d-4:evidence_hit"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "전기료, 관리비, 약값이 날짜마다 다 다른데 그걸 그 사람이 제대로 챙긴 적이 있었나요? 말만 있었지 굴러간 합의는 아니었어요.",
      "behaviorHint": "지출 항목을 빠르게 나열하며 상대 쪽을 짧게 흘겨본다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family03:beat:a:d-5:deny"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "한번 해보자는 정도였지 제가 현금 얘기를 영영 안 하겠다는 건 아니었어요. 살림은 말처럼 딱딱 안 움직여요.",
      "behaviorHint": "손바닥을 아래로 눌러 진정시키듯 말한다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family03:beat:a:d-5:hedge"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예, 제가 다시 현금 얘기를 꺼낸 건 맞아요. 그런데 영수증까지 다 내밀라니 제가 무슨 감사를 받는 사람 같았어요.",
      "behaviorHint": "처음엔 인정하다가 두 번째 문장에서 눈살을 찌푸린다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "id": "family03:beat:a:d-5:partial"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "정우가 한 번 내고도 루틴을 잡아주지 않으니 결국 다시 현금으로 돌아갈 수밖에 없었어요. 저 혼자만 깬 합의처럼 몰면 억울합니다.",
      "behaviorHint": "의자 등받이에서 몸을 떼며 방어적으로 앞으로 숙인다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "id": "family03:beat:a:d-5:blame"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "맞아요, 그 합의는 저도 못 지켰어요. 현금 요구로 돌아서고 영수증 공유를 멈춘 건 제 책임입니다.",
      "behaviorHint": "마른침을 삼키고 짧게 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "id": "family03:beat:a:d-5:confession"
    },
    {
      "caseId": "family-03",
      "party": "a",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "통화 녹음이랑 상담서까지 같이 나오면 제가 '그런 합의 없었다'고는 못 하죠. 있었고, 제가 끝까지 못 버틴 겁니다.",
      "behaviorHint": "고개를 끄덕이되 시선은 아래에 둔다.",
      "applicableStates": [
        "S2",
        "S3",
        "S4"
      ],
      "afterEvidence": "e-6",
      "id": "family03:beat:a:d-5:evidence_hit"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "평생 60만원 고정, 그건 아닙니다. 이사 직후 정리용이었지 무기한 부양 약속은 아니었어요.",
      "behaviorHint": "숫자를 먼저 짚고 마지막 문장은 빠르게 잘라낸다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family03:beat:b:d-1:deny"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "도와주자는 말은 했어요. 다만 그걸 정확히 얼마나, 언제까지로 들었는지는 좀 맥락이 있어요.",
      "behaviorHint": "답을 바로 끝내지 않고 순서를 정리하듯 손가락을 접는다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family03:beat:b:d-1:hedge"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "원본 보면 6개월, 60만원 맞습니다. 제가 그 부분까지는 인정합니다.",
      "behaviorHint": "짧게 인정하고 곧바로 자세를 고쳐 앉는다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family03:beat:b:d-1:partial"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "근데 어머니가 그걸 장남 의무하고 섞으니까 말을 바로잡는 순간 제가 아주 냉정한 사람이 되는 분위기였어요.",
      "behaviorHint": "어깨를 움츠리고 마지막에 작게 한숨을 쉰다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "id": "family03:beat:b:d-1:blame"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "독립할 때 6개월간 월 60만원 보내겠다고 한 건 제 약속입니다. 그걸 흐리게 만든 것도 제 잘못입니다.",
      "behaviorHint": "말을 짧게 마무리한 뒤 시선을 고정한다.",
      "applicableStates": [
        "S5"
      ],
      "id": "family03:beat:b:d-1:confession"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "잘린 캡처 말고 은행 등록 기록까지 나오면 더 못 미룹니다. 약속했고 처음 두 달은 그대로 보낸 것도 맞아요.",
      "behaviorHint": "입술을 다문 채 고개를 한 번 끄덕인다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2",
      "id": "family03:beat:b:d-1:evidence_hit"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "자동이체를 끊은 게 아니라 그달 수입이 꼬여서 직접 보낸 겁니다. 생활비를 아예 외면한 건 아니에요.",
      "behaviorHint": "앞문장을 빨리 말한 뒤 뒷문장에서 속도를 낮춘다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family03:beat:b:d-2:deny"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "35, 40으로 내려간 게 커 보일 수는 있는데, 진짜 한 번씩 비튼 수준이었어요. 계속 안 보낸 건 아니잖아요.",
      "behaviorHint": "숫자를 앞세워 말한 다음 되묻듯 끝맺는다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family03:beat:b:d-2:hedge"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "셋째 달에 자동이체 해지한 건 맞습니다. 이후엔 제가 직접 맞춰 보내려 했어요.",
      "behaviorHint": "인정 문장은 짧게, 해명 문장은 길게 이어 붙인다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family03:beat:b:d-2:partial"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "현장 수입이 매달 같은 것도 아니고, 어머니는 날짜 하루만 밀려도 바로 불효처럼 받아들였어요. 설명할 타이밍이 점점 사라졌습니다.",
      "behaviorHint": "손바닥으로 무릎을 두드리며 답답함을 드러낸다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "id": "family03:beat:b:d-2:blame"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "제가 미리 말하고 조정했어야 했는데, 그냥 줄여 보내고 나중에 설명하려 든 게 잘못이었습니다.",
      "behaviorHint": "첫 절은 낮게, 마지막은 짧게 끊는다.",
      "applicableStates": [
        "S5"
      ],
      "id": "family03:beat:b:d-2:confession"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "해지 로그가 제 휴대폰 인증으로 남아 있으면 부인할 건 없네요. 제가 끊었고, 그 뒤 감액 송금도 제가 한 겁니다.",
      "behaviorHint": "표정을 굳힌 채 문장 사이를 짧게 쉰다.",
      "applicableStates": [
        "S1",
        "S2"
      ],
      "afterEvidence": "e-2",
      "id": "family03:beat:b:d-2:evidence_hit"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "직접 납부는 얘기만 오간 거지, 완전히 바꿔 굴러가는 시스템처럼 정해진 건 아니었습니다.",
      "behaviorHint": "문장을 잘게 끊어 단정적으로 말한다.",
      "applicableStates": [
        "S0"
      ],
      "id": "family03:beat:b:d-5:deny"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "한 번 냈고 그다음엔 사진도 띄엄띄엄 오고 다시 현금 얘기가 나와서 저도 흐려졌어요. 저만 놓은 건 아니에요.",
      "behaviorHint": "순서를 설명하듯 손가락으로 공중에 선을 긋는다.",
      "applicableStates": [
        "S1"
      ],
      "id": "family03:beat:b:d-5:hedge"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "예, 한 차례만 직접 낸 건 맞습니다. 그 뒤 루틴을 못 만든 건 제 몫입니다.",
      "behaviorHint": "인정 후 짧게 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "id": "family03:beat:b:d-5:partial"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "영수증 공유가 끊기면 제가 뭘 얼마나 직접 낼지 기준이 흔들렸어요. 현금 요구가 다시 나오니까 그냥 예전 방식으로 밀렸습니다.",
      "behaviorHint": "설명 순서를 길게 끌다가 마지막에 작게 목소리를 낮춘다.",
      "applicableStates": [
        "S3",
        "S4"
      ],
      "id": "family03:beat:b:d-5:blame"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "결국 직접 납부 방식은 저도 못 지켰습니다. 어머니 탓만 할 일이 아니라 제가 계속 실행했어야 했어요.",
      "behaviorHint": "짧은 사과 뒤 변명 없이 마무리한다.",
      "applicableStates": [
        "S5"
      ],
      "id": "family03:beat:b:d-5:confession"
    },
    {
      "caseId": "family-03",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "녹음이랑 상담 확인서가 같이 있으면 합의 자체를 빼긴 어렵죠. 합의했고, 제가 한 번밖에 못 지킨 겁니다.",
      "behaviorHint": "숨을 짧게 들이쉬고 한 번에 말한다.",
      "applicableStates": [
        "S2",
        "S3"
      ],
      "afterEvidence": "e-6",
      "id": "family03:beat:b:d-5:evidence_hit"
    }
  ]
}

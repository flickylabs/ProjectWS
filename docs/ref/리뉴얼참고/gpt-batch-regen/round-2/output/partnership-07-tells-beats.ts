export const partnership07TellsBeats = {
  "caseId": "partnership-07",
  "executableTells": {
    "a": [
      {
        "id": "partnership-07:a:tell:mail_chain_recital",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "메일 제목",
          "발신 시각",
          "첨부파일명",
          "그 순서대로"
        ],
        "sentenceShape": "enumeration",
        "cadence": "once_every_2_turns",
        "originalPattern": "의도를 묻는 질문에도 메일 제목과 발신 시각, 첨부파일명을 차례로 외워 말하며 핵심 판단을 늦춘다."
      },
      {
        "id": "partnership-07:a:tell:risk_separation",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "의도와 절차는 다릅니다",
          "부주의와 유출은 다릅니다",
          "층위가 다릅니다"
        ],
        "sentenceShape": "conditional",
        "cadence": "max_once_per_turn",
        "originalPattern": "상대가 배신을 말하면 '부주의와 유출은 다르다'며 도덕 문제를 절차 구분으로 바꾸려 한다."
      },
      {
        "id": "partnership-07:a:tell:affect_trim",
        "appliesWhen": [
          "avoiding",
          "emotional",
          "shame",
          "hurt"
        ],
        "lexicalHooks": [
          "감정은 알겠는데",
          "로그를 보죠",
          "흐름부터 보시죠"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "명예 실추 이야기가 나오면 '감정은 알겠는데 로그를 보자'며 정서 반응을 잘라낸다."
      }
    ],
    "b": [
      {
        "id": "partnership-07:b:tell:headline_accusation",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive"
        ],
        "lexicalHooks": [
          "결국 네가 넘긴 거잖아",
          "내부에서 샌 거네",
          "핵심은 그거잖아"
        ],
        "sentenceShape": "self_reference",
        "cadence": "every_turn",
        "originalPattern": "세부 사실보다 '자료를 판 건 결국 내부라는 거네' 같은 결론 문장을 먼저 던진다."
      },
      {
        "id": "partnership-07:b:tell:pressure_repeat",
        "appliesWhen": [
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "맞잖아",
          "그거잖아",
          "그래서 누구였는데"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "같은 질문을 짧게 되풀이하며 상대 표정이 흔들리는 순간을 잡으려 한다."
      },
      {
        "id": "partnership-07:b:tell:proof_magnification",
        "appliesWhen": [
          "emotional",
          "shame",
          "defensive"
        ],
        "lexicalHooks": [
          "캡처에도 나오잖아",
          "이름이 이미 떴잖아",
          "정황이 다 말하잖아"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "on_trigger_only",
        "originalPattern": "캡처 한 장이나 이름 하나를 전체 배신의 증거처럼 키워 해석한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership-07:beat:a:d-2:blame",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "제가 절차를 건너뛴 건 맞지만, 그걸 곧바로 배신으로 읽은 건 과합니다. 판단이 두 단계나 건너뛴 겁니다.",
      "behaviorHint": "말끝을 낮추며 숫자를 세듯 '하나, 둘' 호흡을 넣는다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-2:confession",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "의도와 별개로, 비식별 없는 전체 덱을 외부에 첨부한 건 제 잘못입니다. 이 부분은 제가 사과하겠습니다.",
      "behaviorHint": "어깨 힘이 빠지고 눈을 내리깔며 짧게 고개를 숙인다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-2:deny",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "프로젝터 체크 요청에 회신한 겁니다. 외부 유출이 아니라 운영 프로세스였어요.",
      "behaviorHint": "시선은 정면을 피하고 손가락으로 순서를 접듯이 세어 말한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-2:evidence_hit",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "메일 헤더와 첨부파일명이 다 맞네요. 이건 부정할 수 없겠습니다.",
      "behaviorHint": "서류 쪽으로 시선을 고정한 채 목소리가 한 톤 낮아진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership-07:beat:a:d-2:hedge",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "파일이 갔다는 표현만 떼면 커 보이죠. 하지만 수신처가 운영사였다는 점은 같이 보셔야 합니다.",
      "behaviorHint": "짧게 숨을 고르고 문장을 끊어 말한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-2:partial",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "네, 전체 덱이 첨부로 간 건 맞습니다. 다만 그때 저는 그걸 테스트 범위라고 착각했습니다.",
      "behaviorHint": "입술을 한 번 누르고 인정하되 곧바로 절차 구분을 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-3:blame",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "저도, 유나 씨도 먼저 배신 서사에 올라탔습니다. 실제 경로보다 감정이 앞섰던 겁니다.",
      "behaviorHint": "상대를 잠깐 보다가 곧바로 시선을 거둔다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-3:confession",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "결국 우리 중 누가 판 게 아니었습니다. 운영사 후속메일 오발송이 실제 경로였습니다. 그건 제 잘못입니다.",
      "behaviorHint": "문장을 짧게 끊고 마지막 단어에서만 힘을 준다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-3:deny",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "내부에서 일부러 경쟁사에 판 사람을 지금 단정할 근거는 없습니다.",
      "behaviorHint": "손을 맞잡고 최대한 건조하게 선을 긋는다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-3:evidence_hit",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 단톡을 보면 그 말은 프로젝터 테스트 얘기 뒤에 바로 이어집니다. 적어도 직접 판매 정황은 아닙니다.",
      "behaviorHint": "캡처 대신 원본 흐름을 손으로 길게 그리며 설명한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-07:beat:a:d-3:hedge",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "그 캡처만으로는 '저쪽'이 누구인지도 확정이 안 됩니다. 문맥이 빠졌습니다.",
      "behaviorHint": "캡처의 빈 여백을 짚듯 손끝으로 허공을 가리킨다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-3:partial",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "오해가 생길 만한 조각은 있었어요. 그래도 내부 공모라고 말할 선은 아닙니다.",
      "behaviorHint": "한 번 인정한 뒤 바로 기준선을 다시 긋는다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-4:blame",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "저만의 문제로 끝낼 수는 없습니다. 둘 다 합의한 선을 각자 다른 방식으로 넘었습니다.",
      "behaviorHint": "건조하게 말하지만 마지막 문장에 비아냥이 살짝 묻어난다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-4:confession",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "예외라고 부른 순간 이미 원칙은 깨진 거였습니다. 그 책임은 인정합니다.",
      "behaviorHint": "입술을 다물고 한 박자 쉰 뒤 담담히 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-4:deny",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "원칙은 기억합니다. 다만 그때는 운영 예외라고 판단했습니다.",
      "behaviorHint": "턱을 괴고 잠시 멈춘 뒤 절차라는 단어에 힘을 준다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-4:evidence_hit",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "노션 기록과 링크 변경 로그까지 같다면, 이건 원칙 위반으로 봐야겠네요.",
      "behaviorHint": "서류를 넘기다 손이 멈추고 체념한 듯 고개를 끄덕인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-07:beat:a:d-4:hedge",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "프로젝터 체크와 바이어 배포는 같은 층위가 아니라고 봤습니다.",
      "behaviorHint": "문장을 짧게 자르며 층위라는 표현을 반복한다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:a:d-4:partial",
      "caseId": "partnership-07",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제 첨부도, 유나 씨의 링크 교체도 원칙 밖으로 나간 건 맞습니다. 다만 프로젝터 체크와 바이어 배포는 층위가 다르다고 봤습니다.",
      "behaviorHint": "양쪽 손을 번갈아 펴며 '둘 다'를 강조한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-1:blame",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "확인 전에 이름을 먼저 올린 건 성급했어요. 그런데 그만큼 정황이 한쪽으로 몰려 보였어요.",
      "behaviorHint": "손으로 한 점을 찍듯 태경 쪽을 향했다가 스스로 멈춘다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-1:confession",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "제가 업계에 태경 씨를 누설자처럼 말한 건 잘못이었어요. 제가 정정하고 사과할게요.",
      "behaviorHint": "입술을 깨물다 끝내 시선을 내리고 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-1:deny",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "저는 누설자라고 확정한 게 아니에요. 위험 신호를 말한 거예요.",
      "behaviorHint": "턱을 치켜들고 결론부터 던진다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-1:evidence_hit",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "메시지 시각이 이렇게 붙어 있네요. 제가 생각보다 훨씬 빨리 태경 씨 이름을 꺼냈군요.",
      "behaviorHint": "휴대폰을 내려놓고 같은 문장을 작게 한 번 더 되뇐다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-2"
    },
    {
      "id": "partnership-07:beat:b:d-1:hedge",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "같은 일정, 같은 할인율이 바로 튀어나왔는데 의심을 안 하라고요? 그건 아니죠.",
      "behaviorHint": "짧은 질문형으로 몰아붙이며 끝을 올린다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-1:partial",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "맞아요, 제가 태경 씨 쪽이 샌 것 같다고 말했어요. 다만 그때는 정황이 한쪽으로 몰려 보여서 거의 그렇게 믿었어요.",
      "behaviorHint": "처음 문장만 빠르게 인정하고 다음 문장에서 다시 확신을 덧붙인다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-3:blame",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "제가 문맥보다 결론을 먼저 붙잡았어요. 배신처럼 보이는 조각을 너무 크게 봤어요.",
      "behaviorHint": "손바닥으로 이마를 쓸며 말 속도가 잠깐 늦어진다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-3:confession",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "우리 중 누가 경쟁사에 판 게 아니었어요. 운영사 오발송을 제가 배신으로 읽은 거예요. 그건 제 잘못이에요.",
      "behaviorHint": "끝 문장에서 힘이 빠지며 스스로를 탓하듯 웃음 없는 숨을 낸다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-3:deny",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "정황상 내부 아니면 설명이 안 됐어요. 누군가 일부러 넘긴 줄 알았어요.",
      "behaviorHint": "문장 첫머리를 세게 끊고 바로 결론으로 간다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-3:evidence_hit",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "원본 단톡에 바로 '프로젝터 테스트용'이 붙어 있네요. 이 캡처만 믿고 밀어붙인 건 제가 너무 갔어요.",
      "behaviorHint": "종이 끝을 만지작거리며 눈을 피한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership-07:beat:b:d-3:hedge",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "캡처도 있고 인맥도 있는데, 그걸 그냥 우연으로 보긴 어렵잖아요.",
      "behaviorHint": "같은 단어를 두 번 반복하며 상대 반응을 살핀다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-3:partial",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "그 캡처 한 장으로 범인을 못 박은 건 과했어요. 그래도 당시엔 배신처럼 보였어요.",
      "behaviorHint": "한 번 물러섰다가 감정 단어에서 다시 목소리가 커진다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-4:blame",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "태경 씨 첨부만 문제 삼았지만, 제 교체도 같은 줄기의 위반이었어요. 그건 인정해요.",
      "behaviorHint": "한숨을 쉬고 어깨를 으쓱이며 자존심 상한 표정을 숨기지 못한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-4:confession",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "보안 원칙 위반은 쌍방이었어요. 제 QR 링크 변경도 분명한 책임이에요.",
      "behaviorHint": "턱을 내리고 또박또박 끊어 말한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-4:deny",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "저는 설명 업데이트를 한 거예요. 원칙을 깨려고 한 건 아니었어요.",
      "behaviorHint": "양손을 펼치며 의도와 결과를 분리하려 든다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-4:evidence_hit",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "링크 수정 이력이 이렇게 남아 있으면, 제가 바꿨다는 건 부정 못 하겠네요.",
      "behaviorHint": "손끝으로 테이블을 두 번 두드리다가 멈춘다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership-07:beat:b:d-4:hedge",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "행사 당일엔 최신본이 필요했어요. 그 판단 자체를 전부 악의로 볼 순 없잖아요.",
      "behaviorHint": "말끝을 올리며 상대 동의를 강요하듯 묻는다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership-07:beat:b:d-4:partial",
      "caseId": "partnership-07",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "맞아요, redacted 링크를 끄고 최신 전체 덱으로 바꿨어요. 다만 행사 당일이라 최신본이 필요하다는 판단이었어요.",
      "behaviorHint": "인정은 짧게 하고 바로 표정을 굳힌다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    }
  ]
} as const;

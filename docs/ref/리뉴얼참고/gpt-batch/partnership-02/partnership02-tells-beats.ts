export const partnership02TellsBeats = {
  "caseId": "partnership02",
  "executableTells": {
    "a": [
      {
        "id": "partnership02:a:tell:martyr_stack",
        "appliesWhen": [
          "lying",
          "cornered",
          "defensive",
          "hurt"
        ],
        "lexicalHooks": [
          "제가 먼저",
          "몇 번을",
          "그 밤에도"
        ],
        "sentenceShape": "enumeration",
        "cadence": "max_once_per_turn",
        "originalPattern": "자신이 이동한 거리, 밤샘 횟수, 선행 접촉 횟수를 길게 쌓아 현재 질문을 압도하려 한다."
      },
      {
        "id": "partnership02:a:tell:victim_frame_return",
        "appliesWhen": [
          "cornered",
          "hurt",
          "defensive",
          "shame"
        ],
        "lexicalHooks": [
          "근데 제 이름은",
          "결국 저는",
          "왜 저는 빠집니까"
        ],
        "sentenceShape": "question_end",
        "cadence": "on_trigger_only",
        "originalPattern": "구체적 증거를 들이대도 곧바로 '근데 내 이름은 왜 뺐는데'로 프레임을 원래 피해 서사로 되돌린다."
      },
      {
        "id": "partnership02:a:tell:motive_fog",
        "appliesWhen": [
          "avoiding",
          "lying",
          "emotional",
          "defensive"
        ],
        "lexicalHooks": [
          "확장 가능성",
          "그 정도 검토",
          "탐색 차원"
        ],
        "sentenceShape": "self_reference",
        "cadence": "once_every_2_turns",
        "originalPattern": "별도 거래 의도를 묻는 질문에는 '확장 가능성 탐색이었을 뿐'이라며 경계선을 흐린다."
      }
    ],
    "b": [
      {
        "id": "partnership02:b:tell:document_shield",
        "appliesWhen": [
          "lying",
          "avoiding",
          "defensive"
        ],
        "lexicalHooks": [
          "버전",
          "결재본",
          "부속합의서"
        ],
        "sentenceShape": "number_first",
        "cadence": "once_every_2_turns",
        "originalPattern": "결정 동기를 묻는 질문에도 문서 제목과 버전 번호만 열거하며 판단의 주체를 흐린다."
      },
      {
        "id": "partnership02:b:tell:scope_narrowing",
        "appliesWhen": [
          "cornered",
          "defensive",
          "avoiding"
        ],
        "lexicalHooks": [
          "최종 제출 책임",
          "그 범위만",
          "실무상"
        ],
        "sentenceShape": "echo_repeat",
        "cadence": "max_once_per_turn",
        "originalPattern": "전체 공로 문제를 '최종 제출 책임'이라는 좁은 범위로 줄여 유리한 구간만 남긴다."
      },
      {
        "id": "partnership02:b:tell:pause_and_prune",
        "appliesWhen": [
          "emotional",
          "cornered",
          "shame"
        ],
        "lexicalHooks": [
          "정리하면",
          "핵심만",
          "그 부분은"
        ],
        "sentenceShape": "self_reference",
        "cadence": "on_trigger_only",
        "originalPattern": "대답 전 짧게 멈춘 뒤 가장 불리한 한 문장을 아예 생략한 채 요약본처럼 말한다."
      }
    ]
  },
  "beatScripts": [
    {
      "id": "partnership02:beat:a:d-1:deny",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "deny",
      "line": "그건 본계약을 빼돌리려는 거래가 아니라 유지보수 확장 가능성을 가볍게 본 수준이었습니다.",
      "behaviorHint": "손바닥을 펴 보이며 자신의 고생부터 길게 끌어온다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-1:hedge",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "hedge",
      "line": "본계약과 분리된 후속 운영 옵션을 떠본 건 맞지만, 정식 제안까지 간 건 아니었습니다.",
      "behaviorHint": "말끝을 흐리며 '그 정도' 같은 표현으로 범위를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-1:partial",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "partial",
      "line": "시훈데이터랩 명의의 파일럿 가능성을 고객사에 물어본 건 맞습니다.",
      "behaviorHint": "시선을 잠깐 피했다가 핵심 사실 하나만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-1:blame",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "blame",
      "line": "제가 라인을 우회한 건 경솔했지만, 유지보수 분리 아이디어를 회사 안에서 꺼냈을 때 결론이 계속 미뤄진 것도 사실입니다.",
      "behaviorHint": "상대 이름을 끌어오며 책임을 함께 묶으려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-1:confession",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "confession",
      "line": "저는 계약 서명 8일 전에 고객사에 사촌 회사 사업자등록증까지 붙여 별도 유지보수 파일럿을 타진했습니다.",
      "behaviorHint": "목이 잠긴 채 짧게 멈춘 뒤 직접 시인한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-1:evidence_hit",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-1",
      "beatType": "evidence_hit",
      "line": "헤더까지 남은 원본 메일이면 제가 '가볍게 본 정도'라고만 말할 수는 없겠네요. 여기까지 나오면 우회 제안이었다는 건 숨기기 어렵습니다.",
      "behaviorHint": "증거를 보자 속도가 빨라졌다가 마지막 문장에서 멈칫한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-4"
    },
    {
      "id": "partnership02:beat:a:d-3:deny",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "deny",
      "line": "적어도 이 건에서 저는 당한 쪽입니다.",
      "behaviorHint": "손바닥을 펴 보이며 자신의 고생부터 길게 끌어온다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-3:hedge",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "hedge",
      "line": "제가 먼저 리드를 잡고 제안서를 만든 건 분명하고, 다른 행동은 그 뒤에 따라온 일입니다.",
      "behaviorHint": "말끝을 흐리며 '그 정도' 같은 표현으로 범위를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-3:partial",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "partial",
      "line": "피해를 입은 건 맞지만 제 판단이 완전히 깨끗했다고는 못 하겠습니다.",
      "behaviorHint": "시선을 잠깐 피했다가 핵심 사실 하나만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-3:blame",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "blame",
      "line": "공로를 빼앗긴 분노 때문에 제 잘못을 계속 뒤로 미뤘습니다.",
      "behaviorHint": "상대 이름을 끌어오며 책임을 함께 묶으려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-3:confession",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "confession",
      "line": "저는 초기 영업 기여를 한 것도 사실이지만, 별도 유지보수 제안까지 했기 때문에 순수한 피해자라는 말은 성립하지 않습니다.",
      "behaviorHint": "목이 잠긴 채 짧게 멈춘 뒤 직접 시인한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-3:evidence_hit",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-3",
      "beatType": "evidence_hit",
      "line": "CRM이랑 초안 로그가 같이 뜨면 제가 먼저 뛰었던 건 확실하죠. 그래서 더더욱, 그 뒤에 제가 한 일을 피해자 서사 뒤로만 숨길 수는 없습니다.",
      "behaviorHint": "증거를 보자 속도가 빨라졌다가 마지막 문장에서 멈칫한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-1"
    },
    {
      "id": "partnership02:beat:a:d-4:deny",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "RACI를 먼저 깬 건 민경 쪽입니다.",
      "behaviorHint": "손바닥을 펴 보이며 자신의 고생부터 길게 끌어온다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-4:hedge",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "제가 외부 라인을 살짝 벗어난 건 있어도, 공로 규칙 자체를 뒤엎은 건 아닙니다.",
      "behaviorHint": "말끝을 흐리며 '그 정도' 같은 표현으로 범위를 줄인다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-4:partial",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "제 별도 문의가 공식 커뮤니케이션 원칙을 건드린 건 인정합니다.",
      "behaviorHint": "시선을 잠깐 피했다가 핵심 사실 하나만 인정한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-4:blame",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "다만 민경도 최종 보고서와 보상안에서 공동 발표 원칙을 깼습니다.",
      "behaviorHint": "상대 이름을 끌어오며 책임을 함께 묶으려 한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-4:confession",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "저는 공식 라인을 우회했고, 민경은 공로 구조를 단독으로 바꿨습니다. 둘 다 RACI 합의를 어겼습니다.",
      "behaviorHint": "목이 잠긴 채 짧게 멈춘 뒤 직접 시인한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:a:d-4:evidence_hit",
      "caseId": "partnership02",
      "party": "a",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "서명된 RACI와 편집 로그가 같이 보이면 저도 규칙 바깥에 서 있었다는 걸 못 피합니다. 다만 그 규칙을 민경도 자기 쪽으로만 썼다는 점까지 같이 봐주셔야 합니다.",
      "behaviorHint": "증거를 보자 속도가 빨라졌다가 마지막 문장에서 멈칫한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "partnership02:beat:b:d-2:deny",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "deny",
      "line": "최종 제출 책임 기준으로 정리한 것뿐, 공로를 훔친 건 아닙니다.",
      "behaviorHint": "턱을 들고 역할과 단계부터 차갑게 구분한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-2:hedge",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "hedge",
      "line": "보상안이 제 중심으로 보일 수는 있지만 수주 직후 운영 리스크를 정리한 맥락이 있었습니다.",
      "behaviorHint": "문서 제목을 먼저 말하고 판단 단어는 뒤로 미룬다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-2:partial",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "partial",
      "line": "최종 부속문서와 승인안에서 제 이름이 단독 주공로처럼 남은 건 사실입니다.",
      "behaviorHint": "짧게 숨을 고른 뒤 필요한 사실만 남겨 잘라 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-2:blame",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "blame",
      "line": "준오의 원천 영업 기여를 낮춰 잡은 건, 컴플라이언스 이슈 이후 외부 설명선을 통일하려는 판단도 섞여 있었습니다.",
      "behaviorHint": "항목을 나누듯 상대의 행동을 끌어와 책임을 분산한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-2:confession",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "confession",
      "line": "저는 최종 문서와 보상안에서 준오의 원천 기여를 축소했고, 그 결과 성과급을 단독에 가깝게 가져가려 했습니다.",
      "behaviorHint": "표정 변화 없이 문장을 짧게 끊어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-2:evidence_hit",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-2",
      "beatType": "evidence_hit",
      "line": "편집 이력까지 연결되면 '실무 정리'라는 말로는 부족합니다. 제 판단이 준오의 이름과 점수를 실제로 줄였다는 점은 인정합니다.",
      "behaviorHint": "잠깐 멈춘 뒤 불리한 문장을 더는 생략하지 못한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-6"
    },
    {
      "id": "partnership02:beat:b:d-5:deny",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "deny",
      "line": "고객사가 저를 단독 창구로 본 건 운영 일관성이 필요해서였습니다.",
      "behaviorHint": "턱을 들고 역할과 단계부터 차갑게 구분한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-5:hedge",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "hedge",
      "line": "준오 문제만이 전부라고 단정하긴 어렵지만, 외부 접점 관리 이슈가 있었던 건 사실입니다.",
      "behaviorHint": "문서 제목을 먼저 말하고 판단 단어는 뒤로 미룬다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-5:partial",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "partial",
      "line": "단일 창구 요청은 고객사가 먼저 했고, 그 직후 문서 정리가 제 중심으로 몰린 것도 맞습니다.",
      "behaviorHint": "짧게 숨을 고른 뒤 필요한 사실만 남겨 잘라 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-5:blame",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "blame",
      "line": "제가 그 요청의 배경을 '실무 정리'라고만 설명하면서 컴플라이언스 우려라는 핵심 사유를 숨겼습니다.",
      "behaviorHint": "항목을 나누듯 상대의 행동을 끌어와 책임을 분산한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-5:confession",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "confession",
      "line": "고객사가 저를 단독 창구로 지정한 핵심 이유는 준오의 별도 유지보수 제안과 사업자등록증 첨부로 생긴 컴플라이언스 우려였습니다.",
      "behaviorHint": "표정 변화 없이 문장을 짧게 끊어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-5:evidence_hit",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-5",
      "beatType": "evidence_hit",
      "line": "검토 메모가 나오면 단일 창구 이유를 더는 운영 일관성으로만 설명할 수 없습니다. 컴플라이언스 우려가 핵심이었습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 불리한 문장을 더는 생략하지 못한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": "e-5"
    },
    {
      "id": "partnership02:beat:b:d-4:deny",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "deny",
      "line": "공식 문서는 제가 맡았으니 그 범위 안에서 정리한 겁니다.",
      "behaviorHint": "턱을 들고 역할과 단계부터 차갑게 구분한다.",
      "applicableStates": [
        "S0"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-4:hedge",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "hedge",
      "line": "공동 발표 원칙을 완전히 무시하려던 건 아니고, 고객사 요청에 맞춰 창구를 줄인 측면이 있었습니다.",
      "behaviorHint": "문서 제목을 먼저 말하고 판단 단어는 뒤로 미룬다.",
      "applicableStates": [
        "S1"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-4:partial",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "partial",
      "line": "최종 보고서와 보상안에서 공동 공로 구조가 제 단독 구조처럼 바뀐 건 사실입니다.",
      "behaviorHint": "짧게 숨을 고른 뒤 필요한 사실만 남겨 잘라 말한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-4:blame",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "blame",
      "line": "준오의 우회 제안이 규칙을 흔든 뒤라 저도 통제 쪽으로 과하게 쏠렸습니다.",
      "behaviorHint": "항목을 나누듯 상대의 행동을 끌어와 책임을 분산한다.",
      "applicableStates": [
        "S3"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-4:confession",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "confession",
      "line": "준오는 외부 라인을 우회했고, 저는 RACI와 공동 발표 원칙을 깨고 단독 공로 구조를 만들었습니다.",
      "behaviorHint": "표정 변화 없이 문장을 짧게 끊어 인정한다.",
      "applicableStates": [
        "S5"
      ],
      "afterEvidence": null
    },
    {
      "id": "partnership02:beat:b:d-4:evidence_hit",
      "caseId": "partnership02",
      "party": "b",
      "disputeId": "d-4",
      "beatType": "evidence_hit",
      "line": "RACI 시트와 최종 편집 로그가 같이 제시되면 제가 공동 구조를 좁혔다는 사실을 피하기 어렵습니다. 규칙 준수라는 표현이 과했습니다.",
      "behaviorHint": "잠깐 멈춘 뒤 불리한 문장을 더는 생략하지 못한다.",
      "applicableStates": [
        "S2"
      ],
      "afterEvidence": "e-6"
    }
  ]
} as const;

export default partnership02TellsBeats;

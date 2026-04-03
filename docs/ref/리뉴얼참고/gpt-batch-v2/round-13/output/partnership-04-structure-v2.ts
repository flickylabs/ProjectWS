export const partnership04StructureV2 = {
  "caseId": "partnership-04",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "라희 측 편집 거래내역의 제출과 지속 사용",
      "disputeKind": "core_truth",
      "truthDescription": "라희는 원본이 아니라 편집본이라는 점을 알고도, 민재의 횡령 정황처럼 보이는 거래내역 PDF를 해지 협상 자료로 계속 사용했다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 18,
        "b": 82
      },
      "disputeAliases": [
        "라희 측 편집 거래내역의 제출과 지속 사용",
        "편집 거래내역 PDF",
        "해지 협상 기간",
        "한지훈",
        "과거 리베이트 불신",
        "또 속지 않겠다는 불안"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "라희 측 편집 거래내역의 제출과 지속 사용",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-04:a:d-1:evidence:0",
            "partnership-04:b:d-1:denial:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "누가 왜 선을 넘었고 어떤 자기방어가 뒤따랐는지가 드러납니다.",
          "lockedSummary": "행동 동기와 숨긴 계산은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-1:responsibility:0",
            "partnership-04:b:d-1:motive:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "라희는 원본이 아니라 편집본이라는 점을 알고도, 민재의 횡령 정황처럼 보이는 거래내역 PDF를 해지 협상 자료로 계속 사용했다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-1:institution:0",
            "partnership-04:b:d-1:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "민재의 과거 외주 리베이트 은폐",
      "disputeKind": "sub_truth",
      "truthDescription": "민재는 2년 전 친구 회사로 overflow QA를 넘기며 일부 리베이트성 정산을 숨겼고, 그 사실이 현재 불신의 배경이 됐다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 74,
        "b": 26
      },
      "disputeAliases": [
        "민재의 과거 외주 리베이트 은폐",
        "친구 회사",
        "2024년 외주 리베이트 정산",
        "2024년 8월~9월",
        "일정 압박과 품질 이슈",
        "외주 리베이트 은폐"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "민재의 과거 외주 리베이트 은폐",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-04:a:d-2:denial:0",
            "partnership-04:b:d-2:evidence:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "숨긴 맥락과 책임을 나눠 말하는 방식이 드러납니다.",
          "lockedSummary": "행동 동기와 숨긴 계산은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-2:motive:1",
            "partnership-04:b:d-2:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "민재는 2년 전 친구 회사로 overflow QA를 넘기며 일부 리베이트성 정산을 숨겼고, 그 사실이 현재 불신의 배경이 됐다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-2:admission:0",
            "partnership-04:b:d-2:institution:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가",
      "disputeKind": "shared_misconception",
      "truthDescription": "둘 다 주말에 쪼개진 세 줄을 별도 외부유출로 읽었지만, 실제로는 해지 정산을 위한 고객 환급보증금과 퇴직충당금 이동이 분리 표기된 것이었다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 43,
        "b": 57
      },
      "disputeAliases": [
        "주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가",
        "주말 세 줄 이체",
        "주말 심야",
        "정산용 계좌",
        "해지 정산용 이동",
        "오민재"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "둘 다 주말에 쪼개진 세 줄을 별도 외부유출로 읽었지만, 실제로는 해지 정산을 위한 고객 환급보증금과 퇴직충당금 이동이 분리 표기된 것이었다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-04:a:d-3:denial:0",
            "partnership-04:b:d-3:evidence:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 그 장면을 그렇게 읽었는지와 오해가 굳어진 경로가 드러납니다.",
          "lockedSummary": "행동 동기와 숨긴 계산은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "M2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-3:relationship:0",
            "partnership-04:b:d-3:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "둘 다 주말에 쪼개진 세 줄을 별도 외부유출로 읽었지만, 실제로는 해지 정산을 위한 고객 환급보증금과 퇴직충당금 이동이 분리 표기된 것이었다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "M4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:misbelief_seen"
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-3:admission:0",
            "partnership-04:b:d-3:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "misbelief"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "외형상 의심",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어/당황",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석 고착",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "혼란/확신 약화",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해 해소",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "은행 도장처럼 보이는 PDF",
          "주말 세 줄을 따로 읽는 착시",
          "수취인 별칭 축약을 외부업체로 오독한 흐름"
        ],
        "truthExitEvidenceIds": [
          "e-1",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-4",
      "name": "과거 배신 사건의 협상용 소환",
      "disputeKind": "sub_truth",
      "truthDescription": "두 사람은 2년 전 사건이 일부 제도 개선과 정산으로 봉합됐다는 점을 알면서도, 현재 해지 협상에서 각자 유리한 방향으로 그 사건을 반복 소환했다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 48,
        "b": 52
      },
      "disputeAliases": [
        "과거 배신 사건의 협상용 소환",
        "과거 리베이트 배신 사건",
        "2년 전",
        "김라희",
        "커리어 보존",
        "과거 배신 사건 소환"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "과거 배신 사건의 협상용 소환",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-04:a:d-4:rule:1",
            "partnership-04:b:d-4:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "숨긴 맥락과 책임을 나눠 말하는 방식이 드러납니다.",
          "lockedSummary": "행동 동기와 숨긴 계산은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-4:motive:0",
            "partnership-04:b:d-4:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "두 사람은 2년 전 사건이 일부 제도 개선과 정산으로 봉합됐다는 점을 알면서도, 현재 해지 협상에서 각자 유리한 방향으로 그 사건을 반복 소환했다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-4:admission:0",
            "partnership-04:b:d-4:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "겉보기 손실 규모를 키운 은행 표시 방식 변화",
      "disputeKind": "sub_truth",
      "truthDescription": "은행 시스템 마이그레이션으로 주말 예약이체가 원금·부가세·수수료로 분리 표기되고 수취인 별칭이 바뀌어, 겉보기 손실이 실제보다 1,240만원 크게 보였다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 46,
        "b": 54
      },
      "disputeAliases": [
        "겉보기 손실 규모를 키운 은행 표시 방식 변화",
        "1,240만원 겉보기 손실",
        "시스템 전환 직후",
        "문세정",
        "분리 표기와 별칭 축약",
        "표기 방식 변화"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉보기 손실 규모를 키운 은행 표시 방식 변화",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-04:a:d-5:rule:1",
            "partnership-04:b:d-5:rule:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "숨긴 맥락과 책임을 나눠 말하는 방식이 드러납니다.",
          "lockedSummary": "행동 동기와 숨긴 계산은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-5:responsibility:0",
            "partnership-04:b:d-5:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "은행 시스템 마이그레이션으로 주말 예약이체가 원금·부가세·수수료로 분리 표기되고 수취인 별칭이 바뀌어, 겉보기 손실이 실제보다 1,240만원 크게 보였다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "partnership-04:a:d-5:responsibility:0",
            "partnership-04:b:d-5:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-2:d-1:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-1:retaliation:edge_01"
      },
      "uiLabel": "과거 리베이트 불신이 편집본 사용을 밀어올림"
    },
    {
      "id": "link:d-1:d-3:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 11,
        "grantFlag": "d-3:supports:edge_02"
      },
      "uiLabel": "편집 거래내역이 외부유출 오해를 강화"
    },
    {
      "id": "link:d-5:d-3:weakens_counter",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-3",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -10,
        "grantFlag": "d-3:weakens_counter:edge_03"
      },
      "uiLabel": "표시 방식 변화가 외부유출 프레임을 무너뜨림"
    },
    {
      "id": "link:d-4:d-1:supports",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-1:supports:edge_04"
      },
      "uiLabel": "과거 배신 소환이 현재 협상 압박을 유지"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "원본 은행 거래내역과 이체확인서",
      "description": "문제의 주말 이체에 대한 은행 원본 CSV, PDF 이체확인서, 실제 수취계좌 귀속 확인 자료로 환급보증금과 퇴직충당금 이동이었음을 보여준다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 원본 CSV와 서버 발급 PDF, 수취계좌 확인서가 함께 확보됐다.",
        "check_metadata": "출력 시각과 전산 전표번호가 일치하며, 수취 계좌는 개인계좌가 아니라 법무 자문이 지정한 정산용 계좌다.",
        "restore_context": "문제의 금액은 고객 환급보증금과 퇴직충당금으로 나뉘어 예약 이체된 것이지 민재 개인 계좌나 지인 회사로 흐르지 않았다.",
        "verify_source": "거래은행 서버 원장과 발급본 해시가 일치한다.",
        "check_edits": "원본 파일로 편집 흔적이 없다.",
        "question_acquisition": "법인계좌 자료라 해지 협상 목적 열람은 적법하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "오민재에게: \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 오민재의 \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 쟁점과 관련된다. 오민재은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "김라희에게: \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 김라희의 \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 쟁점과 관련된다. 김라희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
        "role": "establish",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.3,
            "note": "d-5의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "2024년 외주 리베이트 정산 메모와 친구 회사 계약서",
      "description": "민재가 2년 전 overflow QA를 친구 회사로 넘기며 일부 리베이트성 정산을 숨겼다가 뒤늦게 시인하고 규정을 고친 당시 메모와 계약서다.",
      "type": "document",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "당시 회의록, 친구 회사 계약서, 정산 메모 원본이 모두 확보됐다.",
        "check_metadata": "문서 작성 시각은 2024년 8월과 9월로 이어지고, 민재의 시인 메일이 첨부돼 있다.",
        "restore_context": "사건은 완전히 허구가 아니라 실제로 존재했던 신뢰 위반이며, 이후 거래공개 규칙을 만들게 된 계기였다.",
        "verify_source": "전자결재 기록과 메일 스레드, 계약 원본 번호가 모두 일치한다.",
        "check_edits": "원본 문서에서 후편집 흔적이 없다.",
        "question_acquisition": "과거 회사 분쟁 자료라 제출은 적법하지만 외부 공개는 제한돼야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "오민재에게: \"민재의 과거 외주 리베이트 은폐\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 오민재의 \"민재의 과거 외주 리베이트 은폐\" 쟁점과 관련된다. 오민재은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "김라희에게: \"과거 배신 사건의 협상용 소환\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 김라희의 \"과거 배신 사건의 협상용 소환\" 쟁점과 관련된다. 김라희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "contextualize",
        "role": "reframe",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-2의 주장을 정리할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.3,
            "note": "d-4의 주장을 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "은행 도장처럼 보이는 거래내역 PDF 캡처",
      "description": "라희가 해지 협상 테이블에 처음 제출한 자료로, 주말 이체 세 건이 특정 외주업체로 흘러간 것처럼 표시되고 은행 직인처럼 보이는 이미지가 들어가 있다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "mixed",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "PDF 전체가 아니라 협상용 출력본과 화면 캡처만 먼저 제출됐다.",
        "check_metadata": "파일 생성 프로그램 정보가 은행 발급기가 아니라 일반 스프레드시트 PDF 변환기로 남아 있다.",
        "restore_context": "행 제목과 수취인 별칭이 실제 은행 양식과 미묘하게 다르고, 강조표시가 과도하게 삽입돼 있다.",
        "verify_source": "원본 출처가 회계보조 스프레드시트인지 은행 서버인지 처음에는 확인되지 않았다.",
        "check_edits": "글꼴 혼합과 해상도 차이로 편집 가능성이 높다.",
        "question_acquisition": "출처 불명 편집본이라 증거능력이 약하고, 개인정보가 섞여 있어 사용 범위도 제한된다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "오민재에게: \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 오민재의 \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 쟁점과 관련된다. 오민재은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "김라희에게: \"라희 측 편집 거래내역의 제출과 지속 사용\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 김라희의 \"라희 측 편집 거래내역의 제출과 지속 사용\" 쟁점과 관련된다. 김라희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0",
          "S1"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-1의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-3",
            "state": "M1",
            "multiplier": 1.3,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "편집 원본 스프레드시트와 위조 직인 이미지 파일",
      "description": "거래내역 PDF의 바탕이 된 스프레드시트 원본, 숨김 열, 삽입된 직인 PNG 파일로 수취인 별칭과 금액 강조 행이 수동 편집됐음을 보여준다.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "클라우드 드라이브의 버전 기록, 숨김 열, 이미지 삽입 로그가 함께 확보됐다.",
        "check_metadata": "편집본은 라희 팀 폴더에서 생성됐고, 직인 이미지는 외부 인터넷 다운로드 파일로 삽입된 기록이 남아 있다.",
        "restore_context": "원본 거래내역을 '보기 쉽게' 정리한다는 명목이었지만 실제로는 수취인 별칭과 강조 행이 바뀌어 의미가 달라졌다.",
        "verify_source": "파일 해시와 수정 로그가 연속적으로 이어진다.",
        "check_edits": "행 병합, 별칭 변경, 이미지 삽입 흔적이 명확하다.",
        "question_acquisition": "회사 공용 드라이브 자료라 적법하게 확보됐지만 사용 목적은 분쟁 해결로 제한돼야 한다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "expose",
        "role": "establish",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-1의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "조정인 메일과 라희의 확인 회신",
      "description": "외부 조정인이 제출 자료의 원본 여부를 묻자 라희가 '정리본이지만 흐름은 같다'고 답한 메일과, 과거 사건을 현재 협상에 다시 얹겠다고 언급한 회신이다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "third_party",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-2",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "investigationResults": {
        "request_original": "조정인 발신 원문과 라희 회신, 첨부 목록이 모두 확보됐다.",
        "check_metadata": "라희는 원본 제출 요청을 받은 다음 날에도 같은 편집 PDF를 다시 보냈다.",
        "restore_context": "라희가 편집본이라는 사실을 인지했음에도 '실질은 같다'며 협상 자료로 계속 사용한 정황이 드러난다.",
        "verify_source": "조정인 메일 서버 헤더와 수신 확인 로그가 일치한다.",
        "check_edits": "헤더 포함 원본이라 수정 흔적이 없다.",
        "question_acquisition": "중재 절차 중 생성된 자료라 적법하지만 외부 유출은 제한된다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "오민재에게: \"민재의 과거 외주 리베이트 은폐\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 오민재의 \"민재의 과거 외주 리베이트 은폐\" 쟁점과 관련된다. 오민재은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "김라희에게: \"라희 측 편집 거래내역의 제출과 지속 사용\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 김라희의 \"라희 측 편집 거래내역의 제출과 지속 사용\" 쟁점과 관련된다. 김라희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "finish",
        "bestAtStates": [
          "S2",
          "S3",
          "S4"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "motive"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.25,
            "note": "d-1의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-2의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "은행 마이그레이션 공지와 표기 방식 설명서",
      "description": "은행이 시스템 변경 후 예약이체를 원금·부가세·수수료로 분리 표기하고 수취인 별칭을 축약 표시하게 됐다는 공지와, 해당 거래에 적용된 세부 설명서다.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "은행 공지 원문, FAQ, 담당자 확인 메모가 함께 제출됐다.",
        "check_metadata": "시스템 전환은 문제 거래 일주일 전에 적용됐고, 예약이체 분리 표기 규칙이 명시돼 있다.",
        "restore_context": "주말 이체 세 건은 외부 유출 세 건이 아니라 하나의 환급보증금 이동과 하나의 퇴직충당금 이동이 분리 표기된 결과로 해석돼야 한다.",
        "verify_source": "거래은행 문서번호와 담당자 확인 회신이 일치한다.",
        "check_edits": "기관 발급본이라 편집 흔적이 없다.",
        "question_acquisition": "은행 공용 안내 자료와 담당 확인 문서라 적법하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "오민재에게: \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 오민재의 \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 쟁점과 관련된다. 오민재은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "김라희에게: \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 김라희의 \"주말 세 줄 이체는 서로 다른 비정상 외부유출 세 건이었는가\" 쟁점과 관련된다. 김라희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "finish",
        "bestAtStates": [
          "S2",
          "S3",
          "S4"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "motive",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.25,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-5의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:recipient_identity",
      "intentTag": "identity_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "partnership-04:a:d-1:responsibility:0",
          "partnership-04:b:d-1:act:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "실명까지 못 박으면 지금은 방어만 세집니다.",
        "그 인물 지목은 한 단계 더 열려야 말할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:timeline_gap",
      "intentTag": "timeline_probe",
      "allowedAtStates": [
        "S1",
        "S2",
        "S3"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "partnership-04:a:d-1:rule:0",
          "partnership-04:b:d-1:act:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "순서를 바로 고정하긴 이릅니다.",
        "그 시점은 원본 흐름과 함께 봐야 대답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:frame_source",
      "intentTag": "context_probe",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "partnership-04:a:d-3:act:0",
          "partnership-04:b:d-3:act:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "앞뒤 맥락을 빼면 다시 오해가 커집니다.",
        "그건 맥락이 같이 열려야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:motive_trigger",
      "intentTag": "motive_probe",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "partnership-04:a:d-2:motive:1",
          "partnership-04:b:d-2:legacy_sentence:1"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "동기를 단정해 말하면 더 틀어집니다.",
        "그 질문은 감정선이 조금 더 열려야 답이 됩니다."
      ]
    },
    {
      "id": "fq:d-4:rule_break_origin",
      "intentTag": "legality_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "partnership-04:a:d-4:responsibility:1",
          "partnership-04:b:d-4:responsibility:1"
        ],
        "preferredAngleTags": [
          "legality",
          "context"
        ]
      },
      "refusalTemplates": [
        "규정 문제는 문서를 같이 봐야 답할 수 있습니다.",
        "절차를 떼어내면 왜곡돼서 지금은 못 박기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-5:hidden_context",
      "intentTag": "context_probe",
      "allowedAtStates": [
        "S2",
        "S3",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "partnership-04:a:d-5:beneficiary:0",
          "partnership-04:b:d-5:beneficiary:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "앞뒤 맥락을 빼면 다시 오해가 커집니다.",
        "그건 맥락이 같이 열려야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:emotional_trigger",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "partnership-04:a:d-1:emotion:0",
          "partnership-04:b:d-1:emotion:0"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "지금은 그 감정을 바로 꺼내고 싶지 않습니다.",
        "그 부분은 더 밀리면 방어적으로만 말하게 됩니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-2"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "trap_chaser"
    ]
  },
  "proposedUnlockAtoms": []
};

export const partnership01StructureV2 = {
  "caseId": "partnership-01",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "서준의 무단 예치금 송금",
      "disputeKind": "core_truth",
      "truthDescription": "서준은 해나의 최종 서면 승인 없이 법인 준비금 1,800만원을 법무사 신탁계좌로 송금했다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 68,
        "b": 32
      },
      "disputeAliases": [
        "서준의 무단 예치금 송금",
        "1,800만원",
        "9월 3일",
        "법인 준비금 계좌",
        "법무사 신탁계좌",
        "2,000만원"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서준의 무단 예치금 송금",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-01:a:d-1:denial:0",
            "partnership-01:b:d-1:denial:0"
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
            "partnership-01:a:d-1:responsibility:3",
            "partnership-01:b:d-1:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "서준은 해나의 최종 서면 승인 없이 법인 준비금 1,800만원을 법무사 신탁계좌로 송금했다.",
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
            "partnership-01:a:d-1:admission:5",
            "partnership-01:b:d-1:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "예치금은 서준의 개인 채무 상환이었는가",
      "disputeKind": "shared_misconception",
      "truthDescription": "문제의 1,800만원은 서준의 개인 빚을 막은 돈이 아니라 외부 브리지 투자 검토를 위한 예치금과 법률 검토비였다.",
      "requiredEvidenceIds": [
        "e-3",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 42,
        "b": 58
      },
      "disputeAliases": [
        "예치금은 서준의 개인 채무 상환이었는가",
        "1,800만원",
        "크롭된 메신저 캡처",
        "‘일단 제 이름으로 돌려놓고 나중에 정리하죠’",
        "법무사 신탁계좌",
        "투자자 측 담당 확인 메일"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "예치금은 서준의 개인 채무 상환이었는가",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-01:a:d-2:denial:0",
            "partnership-01:b:d-2:denial:0"
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
                "id": "d-2",
                "minState": "M2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-01:a:d-2:responsibility:3",
            "partnership-01:b:d-2:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "문제의 1,800만원은 서준의 개인 빚을 막은 돈이 아니라 외부 브리지 투자 검토를 위한 예치금과 법률 검토비였다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "M4"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:misbelief_seen"
            ]
          },
          "revealAtomIds": [
            "partnership-01:a:d-2:admission:5",
            "partnership-01:b:d-2:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "knows",
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
          "잘린 '제 이름으로 돌려놓고' 한 줄",
          "신탁계좌를 개인계좌처럼 읽는 해석",
          "비밀주의가 만든 개인채무 프레임"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-3",
      "name": "해나의 사전 구두 동의 번복",
      "disputeKind": "core_truth",
      "truthDescription": "해나는 2주년 회식 직후 원본 단톡과 음성메모에서 준비금 2,000만원 한도 내 예치 집행에 동의했지만, 투자 성사가 흔들리자 직원들 앞에서 그런 승인 자체가 없었다고 말했다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 47,
        "b": 53
      },
      "disputeAliases": [
        "해나의 사전 구두 동의 번복",
        "2,000만원",
        "송금 하루 전 회식 직후",
        "원본 단톡과 음성메모",
        "음성메모",
        "투자자 측 담당 확인 메일"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "해나의 사전 구두 동의 번복",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-01:a:d-3:denial:0",
            "partnership-01:b:d-3:denial:0"
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
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-01:a:d-3:responsibility:3",
            "partnership-01:b:d-3:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "해나는 2주년 회식 직후 원본 단톡과 음성메모에서 준비금 2,000만원 한도 내 예치 집행에 동의했지만, 투자 성사가 흔들리자 직원들 앞에서 그런 승인 자체가 없었다고 말했다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "partnership-01:a:d-3:admission:5",
            "partnership-01:b:d-3:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-4",
      "name": "해나의 회계분류 지시 은폐",
      "disputeKind": "sub_truth",
      "truthDescription": "해나는 세무사에게 이 예치금을 당분간 '2주년 캠페인 컨설팅비'로 분개해 직원 불안을 막자고 제안했고, 이후 자신이 그런 제안을 했다는 점을 숨기며 서준의 단독 판단처럼 몰아갔다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 35,
        "b": 65
      },
      "disputeAliases": [
        "해나의 회계분류 지시 은폐",
        "2주년 캠페인 컨설팅비",
        "송금 당일 오전",
        "세무사",
        "세무사 회계분개 지시 메일",
        "윤해나"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "해나의 회계분류 지시 은폐",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-01:a:d-4:denial:0",
            "partnership-01:b:d-4:denial:0"
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
            "partnership-01:a:d-4:responsibility:3",
            "partnership-01:b:d-4:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "해나는 세무사에게 이 예치금을 당분간 '2주년 캠페인 컨설팅비'로 분개해 직원 불안을 막자고 제안했고, 이후 자신이 그런 제안을 했다는 점을 숨기며 서준의 단독 판단처럼 몰아갔다.",
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
            "partnership-01:a:d-4:admission:5",
            "partnership-01:b:d-4:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "비환급 법률검토비의 실제 규모",
      "disputeKind": "sub_truth",
      "truthDescription": "두 사람 모두 예치금 전액이 되돌아올 것처럼 말했지만, 계약 초안상 320만원은 자동으로 비환급 법률검토비로 전환되도록 되어 있었다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 56,
        "b": 44
      },
      "disputeAliases": [
        "비환급 법률검토비의 실제 규모",
        "320만원",
        "브리지 투자 예치계약 초안",
        "송금 43분 전",
        "세무사 회계분개 지시 메일",
        "1,800만원"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "비환급 법률검토비의 실제 규모",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-01:a:d-5:denial:0",
            "partnership-01:b:d-5:denial:0"
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
            "partnership-01:a:d-5:responsibility:3",
            "partnership-01:b:d-5:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "두 사람 모두 예치금 전액이 되돌아올 것처럼 말했지만, 계약 초안상 320만원은 자동으로 비환급 법률검토비로 전환되도록 되어 있었다.",
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
            "partnership-01:a:d-5:admission:5",
            "partnership-01:b:d-5:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-3:d-1:supports",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-1:supports:edge_01"
      },
      "uiLabel": "구두 동의가 송금 맥락을 보강"
    },
    {
      "id": "link:d-4:d-3:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-3",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-3:retaliation:edge_02"
      },
      "uiLabel": "회계은폐가 번복 갈등을 키움"
    },
    {
      "id": "link:d-2:d-1:weakens_counter",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -9,
        "grantFlag": "d-1:weakens_counter:edge_03"
      },
      "uiLabel": "개인채무 프레임이 깨지면 횡령 주장이 약해짐"
    },
    {
      "id": "link:d-5:d-1:unlocks_layer",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-1",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-1:unlocks_layer:edge_04"
      },
      "uiLabel": "비환급 비용이 조급한 집행 동기를 연다"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "법인계좌 송금 내역서",
      "description": "9월 3일 법인 준비금 계좌에서 정민우 법무사 신탁계좌로 1,800만원이 이체된 원본 거래내역이다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-2"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 원본에는 법인계좌 번호, 수취인 실명, 신탁계좌 식별명이 모두 남아 있다.",
        "check_metadata": "이체 실행 단말은 서준의 태블릿이지만 공동승인 토큰은 사용되지 않았다.",
        "restore_context": "송금 직전 정민우 법무사와 두 차례 통화한 기록이 이어진다.",
        "verify_source": "은행 고객센터 확인 결과 발급본과 서버 원장이 일치했다.",
        "check_edits": "편집 흔적이 없는 원본 PDF다.",
        "question_acquisition": "법인계좌 자료이므로 열람 자체는 적법하지만, 공동대표 승인 방식의 적정성은 별도 쟁점이다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이서준에게: \"서준의 무단 예치금 송금\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 이서준의 \"서준의 무단 예치금 송금\" 쟁점과 관련된다. 이서준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "윤해나에게: \"예치금은 서준의 개인 채무 상환이었는가\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 윤해나의 \"예치금은 서준의 개인 채무 상환이었는가\" 쟁점과 관련된다. 윤해나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-1의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.3,
            "note": "d-2의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "브리지 투자 예치계약 초안과 신탁원장",
      "description": "예치금의 목적이 외부 브리지 투자 독점검토와 법률 실사였음을 보여주는 계약 초안, 신탁원장, 비환급 검토비 조항이다.",
      "type": "contract",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "원본 초안에는 예치금 총액과 비환급 법률검토비 320만원 조항이 함께 적혀 있다.",
        "check_metadata": "작성 시간은 송금 43분 전이며 수정 이력의 마지막 열람자는 서준이다.",
        "restore_context": "예치금은 개인 대여가 아니라 투자 검토 독점권을 잠시 확보하기 위한 장치로 설명돼 있다.",
        "verify_source": "법무사 사무실 문서번호와 신탁원장 번호가 일치했다.",
        "check_edits": "전자서명 검증 결과 편집 흔적이 없다.",
        "question_acquisition": "기관 제출본이라 적법하지만 미완성 투자 조건이 포함돼 사용 범위는 분쟁 해결로 한정해야 한다."
      },
      "subjectParty": "a",
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
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-1의 주장을 정리할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.3,
            "note": "d-5의 주장을 정리할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "크롭된 메신저 캡처",
      "description": "서준이 법무사에게 '일단 제 이름으로 돌려놓고 나중에 정리하죠'라고 말한 부분만 잘린 채 남은 캡처다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "전체 대화는 제출되지 않았고 캡처 한 장만 남아 있다.",
        "check_metadata": "해나 휴대폰 갤러리 생성 시각은 새벽 1시 14분이다.",
        "restore_context": "앞뒤 문장이 잘려 있어 '제 이름'이 계좌 귀속인지, 파일명 정리인지 단정할 수 없다.",
        "verify_source": "서준 계정 대화창을 촬영한 것으로 보이지만 원본 대화 내보내기는 없다.",
        "check_edits": "문자열 조작 흔적은 없으나 선택적 크롭이 명확하다.",
        "question_acquisition": "개인 단말에서 무단 확보된 자료라 사생활 및 업무비밀 침해 소지가 크다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이서준에게: \"예치금은 서준의 개인 채무 상환이었는가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 이서준의 \"예치금은 서준의 개인 채무 상환이었는가\" 쟁점과 관련된다. 이서준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "윤해나에게: \"예치금은 서준의 개인 채무 상환이었는가\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 윤해나의 \"예치금은 서준의 개인 채무 상환이었는가\" 쟁점과 관련된다. 윤해나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "M1",
            "multiplier": 1.2,
            "note": "d-2의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "2주년 회식 후 원본 단톡과 음성메모 전사",
      "description": "해나가 '준비금 2천 안에서 먼저 예치 가자'고 말하고, 직원들에게는 계약 전까지 컨설팅비처럼만 설명하자고 덧붙인 원본 대화와 음성메모 전사다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "양측 기기에서 동일한 음성메모와 대화 내보내기 파일이 확인됐다.",
        "check_metadata": "작성 시각은 2주년 회식 종료 18분 후로 송금 하루 전이다.",
        "restore_context": "문제의 예치금과 임시 회계표기가 같은 대화 흐름 안에서 함께 언급된다.",
        "verify_source": "대화 해시와 음성파일 길이가 서로 일치했다.",
        "check_edits": "삭제 복원 흔적은 있으나 본문 자체의 조작은 없다.",
        "question_acquisition": "공동 경영 논의를 담은 자료라 제출 정당성은 높지만 사적 감정 대화 일부는 최소한으로만 사용해야 한다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "corroborate",
        "role": "establish",
        "bestAtStates": [
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
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
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.3,
            "note": "d-4의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "세무사 회계분개 지시 메일과 예정신고 메모",
      "description": "해나가 세무사에게 예치금을 일단 2주년 캠페인 컨설팅비로 잡아달라고 보낸 메일과, 320만원 비환급 검토비가 반영된 예정신고 메모다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-4"
      ],
      "investigationResults": {
        "request_original": "세무사 보관 원본 메일에는 해나 발신 주소와 분개 요청 문구가 그대로 남아 있다.",
        "check_metadata": "발신 시각은 송금 당일 오전이며 법률검토비 반영 메모는 그 이틀 뒤 작성됐다.",
        "restore_context": "직원 불안을 막기 위한 임시 표기라는 설명이 함께 붙어 있어 단순 오기와 구분된다.",
        "verify_source": "세무사 사무실 서버 보관본과 출력본이 일치했다.",
        "check_edits": "기관 보관 메일이라 수정 흔적이 없다.",
        "question_acquisition": "회사 회계자료라 적법하지만 미확정 투자 정보가 포함돼 외부 공개는 제한돼야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이서준에게: \"비환급 법률검토비의 실제 규모\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 이서준의 \"비환급 법률검토비의 실제 규모\" 쟁점과 관련된다. 이서준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "윤해나에게: \"해나의 회계분류 지시 은폐\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 윤해나의 \"해나의 회계분류 지시 은폐\" 쟁점과 관련된다. 윤해나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.25,
            "note": "d-4의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-5의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "투자자 측 담당 확인 메일",
      "description": "예치금이 개인 채무 상환이 아니라 브리지 투자 독점검토를 위한 비용이었고, 해나도 1차 브리핑에 참여했다는 투자자 측 담당의 확인 메일이다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "third_party",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "투자자 측 보관 원본에는 예치 목적과 브리핑 참석자 이름이 모두 적혀 있다.",
        "check_metadata": "메일 헤더상 첫 발신은 투자 검토 개시 당일 오후다.",
        "restore_context": "문제의 돈은 개인 계좌로 흐르지 않고 법무사 신탁계좌에만 머문 것으로 정리된다.",
        "verify_source": "도메인 인증과 회신 경로가 실제 투자사 서버와 일치했다.",
        "check_edits": "헤더 포함 원본이라 편집 흔적이 없다.",
        "question_acquisition": "제3자 확인자료라 적법하지만 투자사 내부 평가 문장은 비식별 처리돼 있다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이서준에게: \"예치금은 서준의 개인 채무 상환이었는가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 이서준의 \"예치금은 서준의 개인 채무 상환이었는가\" 쟁점과 관련된다. 이서준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "윤해나에게: \"예치금은 서준의 개인 채무 상환이었는가\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 윤해나의 \"예치금은 서준의 개인 채무 상환이었는가\" 쟁점과 관련된다. 윤해나은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.25,
            "note": "d-2의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
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
          "partnership-01:a:d-1:admission:2",
          "partnership-01:b:d-1:admission:2"
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
          "partnership-01:a:d-1:uncertainty:1",
          "partnership-01:b:d-1:uncertainty:1"
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
      "id": "fq:d-2:frame_source",
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
        "disputeId": "d-2",
        "allowAtomIds": [
          "partnership-01:a:d-2:responsibility:3",
          "partnership-01:b:d-2:responsibility:3"
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
      "id": "fq:d-3:motive_trigger",
      "intentTag": "motive_probe",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "partnership-01:a:d-3:emotion:4",
          "partnership-01:b:d-3:emotion:4"
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
          "partnership-01:a:d-4:responsibility:3",
          "partnership-01:b:d-4:responsibility:3"
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
          "partnership-01:a:d-5:admission:2",
          "partnership-01:b:d-5:admission:2"
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
          "partnership-01:a:d-1:emotion:4",
          "partnership-01:b:d-1:emotion:4"
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
      "d-3"
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

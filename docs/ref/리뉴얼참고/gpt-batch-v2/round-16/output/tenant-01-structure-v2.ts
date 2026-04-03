export const tenant01StructureV2 = {
  "caseId": "tenant-01",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "하림의 마지막 월세 지연",
      "judgmentStatement": "하림은 월세를 5일 늦게 납부했다.",
      "requiredEvidence": [
        "e-2"
      ],
      "truthDescription": "하림은 계약 종료 한 달 전 월세를 자동이체 한도 문제로 5일 늦게 납부했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "5일",
        "월세 지연",
        "자동이체 한도",
        "관리비",
        "약정일",
        "같은 주 정리"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "하림의 마지막 월세 지연에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant01:a:d-1:timeline:0",
            "tenant01:b:d-1:timeline:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "하림의 마지막 월세 지연 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-1:fear:0",
            "tenant01:b:d-1:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "하림의 마지막 월세 지연의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-1:admission:1",
            "tenant01:b:d-1:admission:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "거실 벽지 전면 교체 필요성",
      "judgmentStatement": "거실 벽지 교체는 불필요하다.",
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "truthDescription": "입주 사진과 퇴거 사진을 비교하면 변색과 들뜸 대부분은 기존 상태였고, 세입자 책임 범위는 반려묘 긁힘이 있는 거실 한 면의 부분 보수 수준이다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "거실 한 면",
        "반려묘 긁힘",
        "전면 도배",
        "입주 사진",
        "비교 견적",
        "기존 변색"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "거실 벽지 전면 교체 필요성에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant01:a:d-2:counter:0",
            "tenant01:b:d-2:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "거실 벽지 전면 교체 필요성 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-2:fear:0",
            "tenant01:b:d-2:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "거실 벽지 전면 교체 필요성의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-2:admission:1",
            "tenant01:b:d-2:responsibility:1"
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
            "summary": "외형상 의심만 남아 있다",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어와 당황이 앞선다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석이 굳어진다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "혼란이 들어오며 확신이 흔들린다",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해가 정리되고 맥락이 복원된다",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "전면 도배 견적만 먼저 꺼낸다",
          "반려묘 흔적을 집 전체 손상처럼 확장한다",
          "크롭된 벽 사진만 반복한다"
        ],
        "truthExitEvidenceIds": [
          "e-1",
          "e-4"
        ],
        "clarifyOutcomeLabel": "오해가 정리되고 맥락이 복원된다"
      }
    },
    {
      "id": "d-3",
      "name": "욕실 수전 누수의 책임",
      "judgmentStatement": "누수 책임은 상우에게 있다.",
      "requiredEvidence": [
        "e-5"
      ],
      "truthDescription": "욕실 수전 누수는 입주 전부터 이어진 노후 부품 문제였고, 하림이 다시 강하게 알린 시점은 늦었지만 주된 수리 책임은 상우에게 있다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "욕실 수전",
        "누수",
        "노후 부품",
        "관리실 기록",
        "재통지 지연",
        "공실 때 수리"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "욕실 수전 누수의 책임에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant01:a:d-3:timeline:0",
            "tenant01:b:d-3:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "욕실 수전 누수의 책임 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-3:fear:1",
            "tenant01:b:d-3:motive:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "욕실 수전 누수의 책임의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-3:admission:1",
            "tenant01:b:d-3:admission:2"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-4",
      "name": "퇴거 당일 보증금 반환 약속",
      "judgmentStatement": "상우는 보증금을 이사 당일 송금하겠다고 했다.",
      "requiredEvidence": [
        "e-3",
        "e-6"
      ],
      "truthDescription": "중개사 포함 메시지와 통화 요약에 따르면, 상우는 미납 월세와 실제 복구비만 정산하면 나머지 보증금을 이사 당일 송금하겠다고 말했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "이사 당일",
        "보증금 반환",
        "정산 후 송금",
        "김도현",
        "조건부 약속",
        "카카오톡"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "퇴거 당일 보증금 반환 약속에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant01:a:d-4:timeline:0",
            "tenant01:b:d-4:rule:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "퇴거 당일 보증금 반환 약속 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-4:fear:1",
            "tenant01:b:d-4:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "퇴거 당일 보증금 반환 약속의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-4:quote:1",
            "tenant01:b:d-4:quote:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "상우의 전면 공제 통보 범위",
      "judgmentStatement": "상우의 공제 범위는 계약을 초과했다.",
      "requiredEvidence": [
        "e-4",
        "e-6"
      ],
      "truthDescription": "상우가 실제 필요한 범위보다 넓은 전면 도배와 노후 수전 교체까지 한꺼번에 공제 항목에 넣어 통보한 범위는 계약 특약과 견적 범위를 넘어섰다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "전면 공제",
        "노후 수전 교체",
        "부분 보수",
        "계약 특약",
        "일괄 공제 통보",
        "복구비"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "상우의 전면 공제 통보 범위에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant01:a:d-5:responsibility:0",
            "tenant01:b:d-5:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "상우의 전면 공제 통보 범위 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-5:fear:1",
            "tenant01:b:d-5:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "상우의 전면 공제 통보 범위의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant01:a:d-5:responsibility:1",
            "tenant01:b:d-5:admission:2"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-1:d-4:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-4",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-4:late_payment_context"
      },
      "uiLabel": "지연 인정 뒤 반환 논의"
    },
    {
      "id": "link:d-2:d-5:weakens_counter",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -12,
        "grantFlag": "d-5:repair_scope_doubted"
      },
      "uiLabel": "전면 공제 흔들림"
    },
    {
      "id": "link:d-3:d-5:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": -10,
        "grantFlag": "d-5:faucet_cost_removed"
      },
      "uiLabel": "노후 수전 제외"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "입주·퇴거 비교 사진 묶음",
      "description": "하림이 입주 첫날과 계약 종료 직전 촬영한 거실 벽·주방·욕실 사진 원본 묶음이다.",
      "type": "photo",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-2"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "원본 사진 파일에는 입주 직후와 퇴거 전 촬영 시각이 각각 보존돼 있다.",
        "check_metadata": "입주 사진은 열쇠 인도 당일 오전, 퇴거 사진은 계약 만료 한 달 전 저녁으로 찍혀 있다.",
        "restore_context": "거실 반대편 벽의 변색과 들뜸이 입주 당시부터 있었던 장면이 함께 확인된다.",
        "verify_source": "하림의 휴대폰과 클라우드 백업 해시값이 일치한다.",
        "check_edits": "색보정 흔적은 없고 자동 압축만 적용된 파일이다.",
        "question_acquisition": "자신이 거주하던 공간을 촬영한 자료라 취득 절차상 문제는 크지 않다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "contextualize",
        "role": "establish",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "장면의 실제 범위를 복원해야 하는 시점"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "월세·관리비 입금 내역",
      "description": "마지막 두 달 월세와 관리비, 지연 입금 시각이 표시된 계좌 거래내역이다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 발급 원본에는 월세 자동이체 실패 뒤 재입금된 시각이 분 단위로 남아 있다.",
        "check_metadata": "지연된 달의 재입금은 약정일보다 정확히 5일 뒤에 기록돼 있다.",
        "restore_context": "관리비는 같은 주 안에 함께 정산돼 미납이 장기화되진 않았다.",
        "verify_source": "집주인 계좌 입금표와 세입자 출금내역이 서로 맞아떨어진다.",
        "check_edits": "기관 PDF 원본이라 편집 흔적이 없다.",
        "question_acquisition": "정산 분쟁을 위한 계좌 자료 제출로 정당성에 큰 문제는 없다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "corroborate",
        "role": "impeach",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "숫자 부인이 막히는 시점"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "공인중개사 포함 카카오톡 캡처와 통화 녹취 요약",
      "description": "퇴거 한 달 전 상우, 하림, 중개사가 나눈 메시지 일부와 통화 요약본이다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "처음 제출된 것은 일부 캡처뿐이었고 전체 대화방 원문은 뒤늦게 추가됐다.",
        "check_metadata": "캡처 생성 시각은 정산 다툼이 시작된 다음 날 새벽으로 남아 있다.",
        "restore_context": "전체 문맥에는 '미납 월세와 실제 수리비 정산 후'라는 조건 문장이 빠져 있었다.",
        "verify_source": "세 사람 단말의 메시지 순서와 통화 시각이 대체로 일치한다.",
        "check_edits": "문장 자체 편집은 없지만 핵심 앞뒤를 잘라 오해를 키운 선택적 크롭이 확인된다.",
        "question_acquisition": "중개사가 당사자였던 대화지만 통화 요약 전송에 대한 별도 동의는 명확하지 않아 사생활 우려가 남는다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤하림에게: \"퇴거 당일 보증금 반환 약속\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 윤하림의 \"퇴거 당일 보증금 반환 약속\" 쟁점과 관련된다. 윤하림은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최상우에게: \"퇴거 당일 보증금 반환 약속\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최상우의 \"퇴거 당일 보증금 반환 약속\" 쟁점과 관련된다. 최상우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "잘린 맥락을 원문으로 되돌려야 하는 시점"
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.2,
            "note": "잘린 맥락을 원문으로 되돌려야 하는 시점"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "벽지 부분보수·전면도배 비교 견적서",
      "description": "같은 거실 벽을 기준으로 부분 보수 견적과 전면 도배 견적을 나란히 받은 수리업체 견적서다.",
      "type": "estimate",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "기사 서명이 있는 원본 견적서 두 장이 모두 제출됐다.",
        "check_metadata": "두 견적은 같은 날 같은 벽 치수를 기준으로 작성돼 비교 가능하다.",
        "restore_context": "긁힘이 있는 한 면 보수 비용과 집 전체 도배 비용 차이가 크게 드러난다.",
        "verify_source": "배성훈 기사와 업체 대표번호 확인 결과 발행 경로가 일치한다.",
        "check_edits": "항목 추가나 단가 수정 흔적이 없는 출력 원본이다.",
        "question_acquisition": "수리 범위 산정을 위한 통상적 자료라 적법성 문제는 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤하림에게: \"거실 벽지 전면 교체 필요성\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 윤하림의 \"거실 벽지 전면 교체 필요성\" 쟁점과 관련된다. 윤하림은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최상우에게: \"상우의 전면 공제 통보 범위\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최상우의 \"상우의 전면 공제 통보 범위\" 쟁점과 관련된다. 최상우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "reframe",
        "role": "reframe",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S5"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "범위 과장을 줄여야 하는 시점"
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.2,
            "note": "범위 과장을 줄여야 하는 시점"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "관리비 고지서와 수전 민원 접수기록",
      "description": "입주 전후 욕실 수전 누수 관련 관리실 전달 내용과 최근 관리비 고지서 메모가 담긴 기록이다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "관리실 원장과 고지서 메모 원본에 같은 세대 호수와 접수번호가 적혀 있다.",
        "check_metadata": "첫 누수 접수 시점이 하림 입주 이전으로 남아 있다.",
        "restore_context": "이후 하림이 다시 강하게 알리기 전까지 임대인 쪽에서 본수리를 미룬 흐름이 보인다.",
        "verify_source": "관리실 담당자 확인과 고지서 발급 기록이 서로 맞는다.",
        "check_edits": "스캔본과 원본 대조 결과 내용 변형은 없었다.",
        "question_acquisition": "건물 관리기록이라 분쟁 해결 목적의 제출 정당성은 충분하다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "corroborate",
        "role": "establish",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "기관 기록이 말보다 앞서는 시점"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "임대차계약서 특약본",
      "description": "원상복구 범위와 보증금 정산 시점을 적은 임대차계약서 및 특약란 원본이다.",
      "type": "contract",
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
        "e-3"
      ],
      "investigationResults": {
        "request_original": "계약서 원본에는 자필 서명과 특약란 수정 흔적 없이 문구가 보존돼 있다.",
        "check_metadata": "특약 작성일과 재계약일이 메시지에서 언급된 일정과 일치한다.",
        "restore_context": "특약은 통상 마모와 고의·과실 손상을 구분하고 정산 후 반환 순서를 적어 둔다.",
        "verify_source": "중개보조원 보관 사본과 당사자 원본 내용이 동일하다.",
        "check_edits": "추가 덧씌움이나 재작성 흔적이 없다.",
        "question_acquisition": "당사자들이 각자 보유한 계약서라 제출 절차에 별다른 문제는 없다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤하림에게: \"퇴거 당일 보증금 반환 약속\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 윤하림의 \"퇴거 당일 보증금 반환 약속\" 쟁점과 관련된다. 윤하림은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최상우에게: \"퇴거 당일 보증금 반환 약속\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최상우의 \"퇴거 당일 보증금 반환 약속\" 쟁점과 관련된다. 최상우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
        "bestAtStates": [
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "S5"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.35,
            "note": "문구 전체를 복원해 조건 범위를 잡아 주는 시점"
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.2,
            "note": "문구 전체를 복원해 조건 범위를 잡아 주는 시점"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:payment_timeline",
      "intentTag": "timeline_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "tenant01:a:d-1:fear:0",
          "tenant01:b:d-1:fear:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:repair_scope",
      "intentTag": "legality_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "tenant01:a:d-2:fear:0",
          "tenant01:b:d-2:fear:0"
        ],
        "preferredAngleTags": [
          "legality",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:leak_history",
      "intentTag": "context_probe",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "tenant01:a:d-3:fear:1",
          "tenant01:b:d-3:motive:1"
        ],
        "preferredAngleTags": [
          "context",
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:promise_scope",
      "intentTag": "context_probe",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "tenant01:a:d-4:fear:1",
          "tenant01:b:d-4:fear:0"
        ],
        "preferredAngleTags": [
          "context",
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:deduction_basis",
      "intentTag": "legality_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "tenant01:a:d-5:fear:1",
          "tenant01:b:d-5:fear:0"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:return_pressure",
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
        "disputeId": "d-5",
        "allowAtomIds": [
          "tenant01:a:d-5:fear:1",
          "tenant01:b:d-5:fear:0"
        ],
        "preferredAngleTags": [
          "motive",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-4",
      "d-5"
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

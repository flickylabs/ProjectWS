export const partnership05StructureV2 = {
  "caseId": "partnership-05",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "현우의 무단 조사대응 선급금 이체",
      "truth": true,
      "truthDescription": "현우는 소라의 최종 승인 없이 법인 운영계좌에서 2,400만원을 박태성 세무사가 지정한 제휴 자문사 계좌로 선급 이체했다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 68,
        "b": 32
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "세무대응권한재설계",
      "legitimacyIssue": false,
      "judgmentStatement": "현우는 소라 승인 없이 2,400만원을 이체했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "2400만원",
        "세움조세자문",
        "선급 처리",
        "공동승인 누락",
        "심야 이체",
        "조사대응 자문"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "누가 먼저 어떤 행동을 했는지가 보입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-05:a:d-1:denial:0",
            "partnership-05:a:d-1:uncertainty:2",
            "partnership-05:a:d-1:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "그 선택을 정당화하거나 몰아붙인 계산이 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-1:self_justification:5",
            "partnership-05:a:d-1:counter:7",
            "partnership-05:a:d-1:responsibility:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "책임과 상처의 무게가 함께 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-1:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-1:admission:9",
            "partnership-05:a:d-1:emotion:8",
            "partnership-05:a:d-1:admission:10"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "소라의 개인 유용 프레임 고착",
      "truth": true,
      "truthDescription": "소라는 자신도 세무사의 조사대응 선급금 제안 메일을 받은 사실을 숨기고, 해지 협상 테이블과 임원 회의에서 이를 현우의 개인 비자금 의혹처럼 몰아갔다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 34,
        "b": 66
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": true,
      "judgmentStatement": "소라는 조사대응 선급금을 숨겼다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "개인 비자금",
        "공동 메일",
        "드래프트",
        "협상 테이블",
        "임원 회의",
        "개인 유용 프레임"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉에서 확인되는 사실과 발화가 정리됩니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-05:b:d-2:denial:0",
            "partnership-05:b:d-2:uncertainty:2",
            "partnership-05:b:d-2:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "그 선택을 정당화하거나 몰아붙인 계산이 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-05:b:d-2:self_justification:5",
            "partnership-05:b:d-2:counter:7",
            "partnership-05:b:d-2:responsibility:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "책임과 상처의 무게가 함께 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-2:motive:frame_origin_named"
            ]
          },
          "revealAtomIds": [
            "partnership-05:b:d-2:admission:9",
            "partnership-05:b:d-2:emotion:8",
            "partnership-05:b:d-2:admission:10"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "선급금 구조의 배후 제안자는 상대 공동대표였는가",
      "truth": false,
      "truthDescription": "현우는 소라가 장부 리스크를 덮으려 밀었다고, 소라는 현우가 공금을 숨기려 설계했다고 믿었지만, 실제 선급금 구조와 계정명은 박태성 세무사의 구체적 제안에서 시작됐다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 47,
        "b": 53
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "증거검증프로토콜",
      "legitimacyIssue": false,
      "judgmentStatement": "선급금 구조는 박태성 제안이다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "박태성",
        "배후 설계",
        "동문 캡처",
        "등기부",
        "계정명 완화",
        "누가 먼저"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로는 그럴듯해 보였던 오해의 표면이 드러납니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-05:a:d-3:denial:0",
            "partnership-05:a:d-3:uncertainty:2",
            "partnership-05:a:d-3:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 서로 그 오해를 붙들었는지가 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "M2"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-3:self_justification:5",
            "partnership-05:a:d-3:counter:7",
            "partnership-05:a:d-3:responsibility:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 깨는 진짜 연결고리가 보입니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "M3"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:trap_named"
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-3:admission:9",
            "partnership-05:a:d-3:emotion:8",
            "partnership-05:a:d-3:admission:10"
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
            "summary": "상대 공동대표가 선급금 구조의 설계자라는 믿음이 겉으로 그럴듯해 보입니다.",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "오해를 사실처럼 붙들며 방어가 빨라집니다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘린 단서와 기억의 편집이 해석을 고착시킵니다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "앞뒤 맥락이 들어오며 확신이 흔들리기 시작합니다.",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "외부 경로와 실제 책임선이 정리되며 오해가 해소됩니다.",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "동문 관계만 부각된 등기부 캡처",
          "이름 겹침을 강조한 단체방 스크린샷",
          "계정명 완화만 떼어낸 조각 정보"
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-6"
        ],
        "clarifyOutcomeLabel": "외부 경로와 실제 책임선이 정리되며 오해가 해소됩니다."
      }
    },
    {
      "id": "d-4",
      "name": "조사대응 비용 성격의 쌍방 은폐",
      "truth": true,
      "truthDescription": "두 사람은 모두 직원과 일부 거래처 문의에 선급금을 '서버 이전·관리비 선급' 정도로만 설명하며 실제 조사대응 자문 목적을 감췄다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 52,
        "b": 48
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "과거장부정리",
      "legitimacyIssue": false,
      "judgmentStatement": "두 사람은 조사대응 자문을 은폐했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "일반 관리비",
        "서버 이전",
        "팀 공지",
        "노지훈 메모",
        "비용 축소",
        "조사대응 숨김"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉에서 확인되는 사실과 발화가 정리됩니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-05:a:d-4:denial:0",
            "partnership-05:a:d-4:uncertainty:2",
            "partnership-05:a:d-4:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "핵심 갈등을 보강한 배경과 방어 논리가 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-4:self_justification:5",
            "partnership-05:a:d-4:counter:7",
            "partnership-05:a:d-4:responsibility:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계를 비틀었던 보강 사실의 핵심이 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              },
              {
                "id": "d-4",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-4:motive:concealment_named"
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-4:admission:9",
            "partnership-05:a:d-4:emotion:8",
            "partnership-05:a:d-4:admission:10"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "세무사의 제휴 자문사 이해충돌",
      "truth": true,
      "truthDescription": "박태성 세무사는 자신이 추천한 자문사와 별도 소개수수료 약정을 맺고 있었고, 이 관계를 두 공동대표에게 명확히 밝히지 않았다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 44,
        "b": 56
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "세무대응권한재설계",
      "legitimacyIssue": false,
      "judgmentStatement": "박태성은 자문사와 수수료 약정을 했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "소개수수료",
        "제휴 자문사",
        "이해충돌",
        "세무사 메모",
        "수수료 약정",
        "세움 추천"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉에서 확인되는 사실과 발화가 정리됩니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-05:a:d-5:denial:0",
            "partnership-05:a:d-5:uncertainty:2",
            "partnership-05:a:d-5:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "핵심 갈등을 보강한 배경과 방어 논리가 드러납니다.",
          "lockedSummary": "왜 그런 판단이 나왔는지는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-5:self_justification:5",
            "partnership-05:a:d-5:counter:7",
            "partnership-05:a:d-5:responsibility:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계를 비틀었던 보강 사실의 핵심이 연결됩니다.",
          "lockedSummary": "핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              },
              {
                "id": "d-5",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-5:motive:conflict_named"
            ]
          },
          "revealAtomIds": [
            "partnership-05:a:d-5:admission:9",
            "partnership-05:a:d-5:emotion:8",
            "partnership-05:a:d-5:admission:10"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-1:d-5:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-5:surface:source_named"
      },
      "uiLabel": "외부 조언의 그림자"
    },
    {
      "id": "link:d-2:d-1:weakens_counter",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "counterPenalty": 10,
        "grantFlag": "d-1:motive:frame_checked"
      },
      "uiLabel": "프레임이 책임을 덮음"
    },
    {
      "id": "link:d-3:d-5:unlocks_layer",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "unlocks_layer",
      "when": {
        "minState": "M3",
        "minLayer": "surface"
      },
      "effect": {
        "unlockLayer": "core",
        "grantFlag": "d-5:motive:conflict_named"
      },
      "uiLabel": "배후 오해가 풀리면"
    },
    {
      "id": "link:d-4:d-2:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-2",
      "type": "retaliation",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "retaliationRisk": 8,
        "grantFlag": "d-2:core:cover_story_seen"
      },
      "uiLabel": "숨김이 되받아침"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "법인계좌 이체확인서와 자문사 선급금 전표",
      "description": "세무조사 통지 이틀 뒤 법인 운영계좌에서 제휴 자문사 '세움조세자문' 계좌로 2,400만원이 이체된 은행 원본 확인서와 ERP 선급금 전표다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "최현우에게: \"현우의 무단 조사대응 선급금 이체\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 최현우의 \"현우의 무단 조사대응 선급금 이체\" 쟁점과 관련된다. 최현우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정소라에게: \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 정소라의 \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 쟁점과 관련된다. 정소라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.35,
            "note": "오해가 흔들리기 시작하는 구간에서 제시하면 상대 비난 서사를 빠르게 꺾는다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "박태성 세무사의 조사대응 제안 메일과 체크리스트",
      "description": "박태성이 '조사 전에 자문 선급금을 먼저 집행하고 문제 항목은 일반 관리비 계정으로 임시 정리하자'고 제안한 원본 메일과 첨부 체크리스트다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "third_party",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "최현우에게: \"현우의 무단 조사대응 선급금 이체\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 최현우의 \"현우의 무단 조사대응 선급금 이체\" 쟁점과 관련된다. 최현우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정소라에게: \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 정소라의 \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 쟁점과 관련된다. 정소라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.35,
            "note": "오해가 흔들리기 시작하는 구간에서 제시하면 상대 비난 서사를 빠르게 꺾는다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "법인등기부 캡처와 동문 단체방 스크린샷",
      "description": "제휴 자문사 대표가 현우의 대학 동문이라는 점과 이름이 겹친다는 이유로 개인 친분 거래처럼 보이게 만든 등기부 캡처와 단체방 스크린샷이다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "최현우에게: \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최현우의 \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 쟁점과 관련된다. 최현우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정소라에게: \"소라의 개인 유용 프레임 고착\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 정소라의 \"소라의 개인 유용 프레임 고착\" 쟁점과 관련된다. 정소라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
        "bestAtStates": [
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S4",
          "S5"
        ],
        "preferredQuestionTypes": [
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M2",
            "multiplier": 1.4,
            "note": "잘린 단서를 더 오래 붙들기 전에 맥락을 복원할 때 효율이 가장 높다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "공동 받은 메일 스레드와 소라의 회신 초안",
      "description": "소라도 조사대응 선급금 제안과 계정 임시 변경 방안을 읽고 '우선 자료만 정리하자'고 답하려다 보낸 흔적이 남은 메일 스레드와 임시 저장 초안이다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "최현우에게: \"조사대응 비용 성격의 쌍방 은폐\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 최현우의 \"조사대응 비용 성격의 쌍방 은폐\" 쟁점과 관련된다. 최현우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정소라에게: \"소라의 개인 유용 프레임 고착\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 정소라의 \"소라의 개인 유용 프레임 고착\" 쟁점과 관련된다. 정소라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "부분 인정 직전의 방어를 넘어 실제 실행 주체를 굳히기 좋다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "재무대리 노지훈의 회의 메모와 팀 공지 초안",
      "description": "선급금 명목을 팀에는 일반 관리비로만 공유하자는 두 대표의 회의 메모, 그리고 실제로 그렇게 작성된 내부 공지 초안이다.",
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
      "requires": [
        "e-4"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "최현우에게: \"조사대응 비용 성격의 쌍방 은폐\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 최현우의 \"조사대응 비용 성격의 쌍방 은폐\" 쟁점과 관련된다. 최현우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정소라에게: \"소라의 개인 유용 프레임 고착\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 정소라의 \"소라의 개인 유용 프레임 고착\" 쟁점과 관련된다. 정소라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "부분 인정 직전의 방어를 넘어 실제 실행 주체를 굳히기 좋다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "제휴 자문사 소개수수료 약정서와 세무사 사무실 회계메모",
      "description": "박태성이 추천한 세움조세자문과 별도 소개수수료 약정을 맺고 있었음을 보여주는 약정서와 사무실 회계메모다.",
      "type": "contract",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "third_party",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "최현우에게: \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최현우의 \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 쟁점과 관련된다. 최현우은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정소라에게: \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 정소라의 \"선급금 구조의 배후 제안자는 상대 공동대표였는가\" 쟁점과 관련된다. 정소라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.35,
            "note": "오해가 흔들리기 시작하는 구간에서 제시하면 상대 비난 서사를 빠르게 꺾는다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:timeline_chain",
      "intentTag": "timeline_check",
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
          "partnership-05:a:d-1:admission:4",
          "partnership-05:a:d-1:self_justification:5"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "지금은 2400만원 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-1:decision_identity",
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
          "partnership-05:a:d-1:admission:4",
          "partnership-05:a:d-1:responsibility:6"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 2400만원 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-2:frame_origin",
      "intentTag": "contradiction_probe",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "partnership-05:b:d-2:counter:7",
          "partnership-05:b:d-2:self_justification:5"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "지금은 개인 비자금 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-3:misbelief_source",
      "intentTag": "source_check",
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
          "partnership-05:a:d-3:admission:4",
          "partnership-05:a:d-3:responsibility:6"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "지금은 박태성 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-4:rule_edge",
      "intentTag": "rule_check",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "partnership-05:a:d-4:responsibility:6",
          "partnership-05:a:d-4:admission:10"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "지금은 일반 관리비 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-5:outside_motive",
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
        "disputeId": "d-5",
        "allowAtomIds": [
          "partnership-05:a:d-5:counter:7",
          "partnership-05:a:d-5:responsibility:6"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "지금은 소개수수료 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
      ]
    },
    {
      "id": "fq:d-1:emotion_tail",
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
          "partnership-05:a:d-1:emotion:8",
          "partnership-05:a:d-1:admission:9"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "지금은 2400만원 이야기부터 정리해야 합니다.",
        "그 질문은 아직 답할 단계가 아닙니다."
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

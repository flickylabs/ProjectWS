export const tenant_12_structure_v2 = {
  "caseId": "tenant-12",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "경수가 직접 '문제 세입자'라고 퍼뜨렸는가",
      "truth": false,
      "truthDescription": "경수가 직접 이웃들에게 소담을 문제 세입자라고 지목해 퍼뜨린 정황은 없고, 소문의 직접 출발점은 미령의 애매한 설명과 이웃 간 재전달이었다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "소문출처복구",
      "legitimacyIssue": true,
      "judgmentStatement": "경수는 문제 세입자라고 퍼뜨리지 않았다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "문제 세입자",
        "직접 유포",
        "재전달 두 번",
        "관리실 라인",
        "경수 책임",
        "낙인"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "경수가 직접 '문제 세입자'라고 퍼뜨렸는가에서 서로 다른 해석이 어디서 갈렸는지 보는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant12:a:d-1:act:0",
            "tenant12:a:d-1:quote:1",
            "tenant12:a:d-1:context:2",
            "tenant12:b:d-1:act:0",
            "tenant12:b:d-1:quote:1",
            "tenant12:b:d-1:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "경수가 직접 '문제 세입자'라고 퍼뜨렸는가을 그렇게 믿게 된 심리와 전달 경로를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "M2"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-1:context:2",
            "tenant12:a:d-1:responsibility:3",
            "tenant12:a:d-1:emotion:4",
            "tenant12:b:d-1:context:2",
            "tenant12:b:d-1:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "경수는 문제 세입자라고 퍼뜨리지 않았다.에 도달하기 위한 오해 해소 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "M4"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:identity_pressed",
              "d-1:surface:source_restored"
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-1:emotion:4",
            "tenant12:a:d-1:admission:5",
            "tenant12:b:d-1:emotion:4",
            "tenant12:b:d-1:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "shared_misconception",
      "requiredEvidenceIds": [
        "e-2",
        "e-5"
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "misbelief"
        },
        "trapSignals": [
          "문제 세입자",
          "관리실 라인",
          "재전달 캡처"
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-5"
        ],
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
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-2",
      "name": "미령 발언의 원래 취지",
      "truth": true,
      "truthDescription": "미령은 늦은 시간 복도 냄새와 방문객 질문을 두고 '4층 분 건은 제가 조용히 보고 있다'고 말했을 뿐, 상습 문제 세입자라고 낙인찍으려던 것은 아니었다. 다만 표현이 지나치게 애매해 오해를 불렀다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-2",
        "e-3"
      ],
      "correctResponsibility": {
        "a": 40,
        "b": 60
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "소문출처복구",
      "legitimacyIssue": false,
      "judgmentStatement": "미령은 상습 문제 세입자라고 하지 않았다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "조용히 보고 있다",
        "미령 음성",
        "옆집 달래기",
        "냄새 질문",
        "애매한 표현",
        "오해 확대"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "미령 발언의 원래 취지에 얽힌 표면 정황을 정리하는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant12:a:d-2:act:0",
            "tenant12:a:d-2:quote:1",
            "tenant12:a:d-2:context:2",
            "tenant12:b:d-2:act:0",
            "tenant12:b:d-2:quote:1",
            "tenant12:b:d-2:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "미령 발언의 원래 취지을 확대하거나 축소한 이유를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-2:context:2",
            "tenant12:a:d-2:responsibility:3",
            "tenant12:a:d-2:emotion:4",
            "tenant12:b:d-2:context:2",
            "tenant12:b:d-2:responsibility:3",
            "tenant12:b:d-2:emotion:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "미령은 상습 문제 세입자라고 하지 않았다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:context_pressed"
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-2:emotion:4",
            "tenant12:a:d-2:admission:5",
            "tenant12:b:d-2:emotion:4",
            "tenant12:b:d-2:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "sub_truth",
      "requiredEvidenceIds": [
        "e-2",
        "e-3"
      ]
    },
    {
      "id": "d-3",
      "name": "소담의 공개 단톡 반박과 역비난",
      "truth": true,
      "truthDescription": "소담은 출처를 완전히 확인하기 전에 건물 단톡방에 '집주인과 관리인이 거짓 소문을 낸다'고 공개 반박하며 캡처를 올려 갈등을 더 크게 만들었다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 70,
        "b": 30
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "공개정정조율",
      "legitimacyIssue": true,
      "judgmentStatement": "소담은 출처 확인 없이 반박했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "공개 단톡",
        "25분 뒤 게시",
        "거짓 소문",
        "캡처 공개",
        "역비난",
        "출처 미확인"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "소담의 공개 단톡 반박과 역비난에 얽힌 표면 정황을 정리하는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant12:a:d-3:act:0",
            "tenant12:a:d-3:quote:1",
            "tenant12:a:d-3:context:2",
            "tenant12:b:d-3:act:0",
            "tenant12:b:d-3:quote:1",
            "tenant12:b:d-3:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "소담의 공개 단톡 반박과 역비난을 확대하거나 축소한 이유를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-3:context:2",
            "tenant12:a:d-3:responsibility:3",
            "tenant12:a:d-3:emotion:4",
            "tenant12:b:d-3:context:2",
            "tenant12:b:d-3:responsibility:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "소담은 출처 확인 없이 반박했다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
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
            "tenant12:a:d-3:emotion:4",
            "tenant12:a:d-3:admission:5",
            "tenant12:b:d-3:emotion:4",
            "tenant12:b:d-3:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "sub_truth",
      "requiredEvidenceIds": [
        "e-4",
        "e-5"
      ]
    },
    {
      "id": "d-4",
      "name": "실제 생활 불편의 정도",
      "truth": true,
      "truthDescription": "택배와 늦은 방문객으로 복도 대화가 한두 번 길어지고 분리배출 안내를 다시 받은 적은 있지만, 반복 소음·악취·무단투숙 같은 상습 문제로 확인된 기록은 없다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 55,
        "b": 45
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "생활불편분리",
      "legitimacyIssue": false,
      "judgmentStatement": "상습 문제는 확인되지 않았다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "복도 소음 2건",
        "분리배출 재안내",
        "한 달 세 건",
        "상습 아님",
        "무단투숙 없음",
        "늦은 방문객"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "실제 생활 불편의 정도에 얽힌 표면 정황을 정리하는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant12:a:d-4:act:0",
            "tenant12:a:d-4:quote:1",
            "tenant12:a:d-4:context:2",
            "tenant12:b:d-4:act:0",
            "tenant12:b:d-4:quote:1",
            "tenant12:b:d-4:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "실제 생활 불편의 정도을 확대하거나 축소한 이유를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-4:context:2",
            "tenant12:a:d-4:responsibility:3",
            "tenant12:a:d-4:emotion:4",
            "tenant12:b:d-4:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "상습 문제는 확인되지 않았다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-4:emotion:4",
            "tenant12:a:d-4:admission:5",
            "tenant12:b:d-4:emotion:4",
            "tenant12:b:d-4:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "sub_truth",
      "requiredEvidenceIds": [
        "e-1",
        "e-6"
      ]
    },
    {
      "id": "d-5",
      "name": "경수의 정정 지연과 방관",
      "truth": true,
      "truthDescription": "경수는 소문이 돈다는 말을 들은 뒤에도 '관리인이 알아서 말한 것'이라며 명확한 정정문을 바로 내지 않았고, 그 사이 이웃들 사이 인상이 굳어졌다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 25,
        "b": 75
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "공개정정조율",
      "legitimacyIssue": true,
      "judgmentStatement": "경수는 정정을 지연했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "정정 지연",
        "방치",
        "관리인이 알아서",
        "공백 시간",
        "방관 책임",
        "소문 고착"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "경수의 정정 지연과 방관의 겉 주장과 실제 사실을 먼저 맞춰 보는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant12:a:d-5:act:0",
            "tenant12:a:d-5:quote:1",
            "tenant12:a:d-5:context:2",
            "tenant12:b:d-5:act:0",
            "tenant12:b:d-5:quote:1",
            "tenant12:b:d-5:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "경수의 정정 지연과 방관을 각자가 왜 끝까지 붙들었는지 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              },
              {
                "id": "d-1",
                "minState": "M2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-5:context:2",
            "tenant12:a:d-5:responsibility:3",
            "tenant12:a:d-5:emotion:4",
            "tenant12:b:d-5:context:2",
            "tenant12:b:d-5:responsibility:3",
            "tenant12:b:d-5:emotion:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "경수는 정정을 지연했다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "M2"
              }
            ],
            "requireFlags": [
              "d-5:surface:responsibility_pressed",
              "d-5:motive:correction_delay_visible"
            ]
          },
          "revealAtomIds": [
            "tenant12:a:d-5:emotion:4",
            "tenant12:a:d-5:admission:5",
            "tenant12:b:d-5:emotion:4",
            "tenant12:b:d-5:admission:5"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "core_truth",
      "requiredEvidenceIds": [
        "e-3",
        "e-5"
      ]
    }
  ],
  "linkEdges": [
    {
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-1:surface:source_restored"
      },
      "uiLabel": "발화 원점",
      "id": "link:d-2:d-1:supports"
    },
    {
      "fromDisputeId": "d-1",
      "toDisputeId": "d-5",
      "type": "unlocks_layer",
      "when": {
        "minState": "M3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-5:motive:correction_delay_visible"
      },
      "uiLabel": "직접 유포는 약함",
      "id": "link:d-1:d-5:unlocks_layer"
    },
    {
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:core:public_escalation_seen"
      },
      "uiLabel": "공개 역비난",
      "id": "link:d-3:d-5:retaliation"
    },
    {
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -7,
        "grantFlag": "d-1:surface:minor_inconvenience_only"
      },
      "uiLabel": "경미한 불편",
      "id": "link:d-4:d-1:weakens_counter"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "임대차계약서와 건물 생활규칙 원본",
      "description": "민원은 먼저 당사자에게 알리고, 확인되지 않은 생활 문제를 공개적으로 특정 세대에 연결하지 않는다는 문구가 적힌 계약서와 생활규칙 원본이다.",
      "type": "contract",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "당사자 계약서 원본과 관리사무소 보관 생활규칙 사본이 함께 제출됐다.",
        "check_metadata": "생활규칙은 입주 시점에 이미 배포된 고정 양식으로 확인됐다.",
        "restore_context": "계약 구조는 생활 불편을 바로 낙인찍어 공개하기보다 먼저 사실 확인과 개별 고지를 원칙으로 하고 있다.",
        "verify_source": "관리사무소 등록번호와 당사자 서명, 규칙 문구가 보관본과 일치한다.",
        "check_edits": "추가 삽입이나 재작성 흔적이 없다.",
        "question_acquisition": "당사자 계약 및 건물 규칙 문서라 제출 정당성은 충분하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이소담에게: \"실제 생활 불편의 정도\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 이소담의 \"실제 생활 불편의 정도\" 쟁점과 관련된다. 이소담은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "문경수에게: \"실제 생활 불편의 정도\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 문경수의 \"실제 생활 불편의 정도\" 쟁점과 관련된다. 문경수은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "실제 생활 불편의 정도 쟁점이 본격적으로 열릴 때 임대차계약서와 건물 생활규칙 원본의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "이웃 사이드챗 캡처와 미령 음성메모",
      "description": "이웃 세입자가 받은 사이드챗 캡처와, 미령이 '4층 분 건은 제가 조용히 보고 있다'고 말한 짧은 음성메모가 묶인 자료다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "third_party",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-2"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "처음에는 캡처와 음성 발췌만 있었고, 이후 이웃 쪽 전체 대화 일부와 미령의 원본 파일이 추가 제출됐다.",
        "check_metadata": "문제의 발언은 소담이 공개 반박하기 전날 저녁에 생성된 것으로 남아 있다.",
        "restore_context": "처음 캡처에는 '문제라 지켜본다'는 인상만 남았지만, 전체 문맥에는 냄새 질문을 진정시키며 '제가 먼저 확인하겠다'는 취지가 앞에 있었다.",
        "verify_source": "이웃 세입자 단말과 미령 휴대폰 백업의 시각 흐름이 대체로 일치한다.",
        "check_edits": "본문 편집은 없지만 핵심 앞뒤가 빠진 선택적 크롭이 확인된다.",
        "question_acquisition": "제3자가 있는 사적 대화라 공개 범위와 사생활 보호에 주의가 필요하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이소담에게: \"경수가 직접 '문제 세입자'라고 퍼뜨렸는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 이소담의 \"경수가 직접 '문제 세입자'라고 퍼뜨렸는가\" 쟁점과 관련된다. 이소담은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "문경수에게: \"미령 발언의 원래 취지\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 문경수의 \"미령 발언의 원래 취지\" 쟁점과 관련된다. 문경수은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
        "bestAtStates": [
          "M1",
          "M2"
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
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "M2",
            "multiplier": 1.22,
            "note": "경수가 직접 '문제 세입자'라고 퍼뜨렸는가 쟁점이 본격적으로 열릴 때 이웃 사이드챗 캡처와 미령 음성메모의 설득력이 커진다."
          },
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.22,
            "note": "미령 발언의 원래 취지 쟁점이 본격적으로 열릴 때 이웃 사이드챗 캡처와 미령 음성메모의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "미령 업무일지와 경수-미령 문자",
      "description": "관리인 업무일지, 경수가 미령에게 민원은 조용히 처리하라고 보낸 문자, 그리고 소문 이후 정정 여부를 미룬 정황이 담긴 기록이다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "업무일지 원본과 경수-미령 문자 원문이 함께 제출돼 발언 취지와 후속 대응을 연결해 볼 수 있었다.",
        "check_metadata": "미령의 사이드챗 직전과 직후 경수와 주고받은 문자가 같은 시간대에 남아 있다.",
        "restore_context": "경수는 공개 낙인을 지시한 적은 없지만, 미령의 애매한 표현을 알게 된 뒤에도 명확한 정정을 바로 보내지 않았다.",
        "verify_source": "관리실 일지 시간과 문자 발신 시각, 경수 휴대폰 수신 기록이 서로 맞는다.",
        "check_edits": "업무일지와 문자 원문 모두 사후 편집 흔적이 없다.",
        "question_acquisition": "관리실 기록과 개인 문자가 함께 포함돼 있어 필요한 부분만 사용해야 한다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "corroborate",
        "role": "impeach",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "미령 발언의 원래 취지 쟁점이 본격적으로 열릴 때 미령 업무일지와 경수-미령 문자의 설득력이 커진다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "경수의 정정 지연과 방관 쟁점이 본격적으로 열릴 때 미령 업무일지와 경수-미령 문자의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "건물 단톡방 공개 반박 캡처",
      "description": "소담이 건물 단톡방에 올린 공개 반박문과, 경수와 미령이 거짓 소문을 냈다고 적은 메시지 캡처다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "소담 휴대폰의 단톡 원문과 관리자 백업 일부가 함께 제출됐다.",
        "check_metadata": "공개 반박은 소문 캡처를 전달받은 지 약 25분 뒤 바로 올라온 것으로 확인된다.",
        "restore_context": "사실 확인을 위한 별도 문의 없이 공개 비난과 캡처 공유가 동시에 이뤄져 갈등을 키운 흐름이 드러난다.",
        "verify_source": "관리자 백업본과 소담 휴대폰 저장 시각이 일치한다.",
        "check_edits": "메시지 원문이라 편집 흔적이 없다.",
        "question_acquisition": "여러 입주민이 있는 단톡 자료라 공개 범위에 각별한 주의가 필요하다."
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
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "motive"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.22,
            "note": "소담의 공개 단톡 반박과 역비난 쟁점이 본격적으로 열릴 때 건물 단톡방 공개 반박 캡처의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "입주민 채팅 내보내기와 루머 전파 시간표",
      "description": "입주민 채팅 내보내기 파일과, 미령 발언이 어떤 순서로 이웃들에게 전달돼 소담에게까지 들어왔는지 정리한 시간표다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "관리자 내보내기 파일과 시간대별 전달자 정리표가 함께 제출됐다.",
        "check_metadata": "미령의 발언이 한 이웃에게 전달된 뒤 두 차례 재전달을 거쳐 '문제 세입자' 표현으로 굳어지는 흐름이 분 단위로 남아 있다.",
        "restore_context": "소담이 처음 접한 표현은 이미 여러 단계 과장을 거친 버전이었고, 경수의 정정 지연도 그 사이에 끼어 있었다.",
        "verify_source": "채팅 내보내기 시각과 각 단말 저장 시각, 관리실 통화 기록이 서로 맞아떨어진다.",
        "check_edits": "내보내기 원본과 정리표의 순서가 일치해 후작성 가능성은 낮다.",
        "question_acquisition": "다수 입주민 정보가 포함돼 있어 필요한 부분만 가려 사용해야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이소담에게: \"경수가 직접 '문제 세입자'라고 퍼뜨렸는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 이소담의 \"경수가 직접 '문제 세입자'라고 퍼뜨렸는가\" 쟁점과 관련된다. 이소담은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "문경수에게: \"경수의 정정 지연과 방관\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 문경수의 \"경수의 정정 지연과 방관\" 쟁점과 관련된다. 문경수은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "impeach",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "M2",
            "multiplier": 1.35,
            "note": "경수가 직접 '문제 세입자'라고 퍼뜨렸는가 쟁점이 본격적으로 열릴 때 입주민 채팅 내보내기와 루머 전파 시간표의 설득력이 커진다."
          },
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "소담의 공개 단톡 반박과 역비난 쟁점이 본격적으로 열릴 때 입주민 채팅 내보내기와 루머 전파 시간표의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "민원대장과 복도 확인 기록",
      "description": "택배 시간대 짧은 복도 소음 민원 두 건, 분리배출 재안내 한 건, 공용부 오염 확인 여부가 적힌 민원대장과 확인 기록이다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "관리사무소 민원대장 원본과 복도 확인 메모가 함께 제출됐다.",
        "check_metadata": "관련 민원은 한 달 동안 세 건에 그치고 이후 반복 기록은 없다.",
        "restore_context": "생활 불편이 전혀 없었다고 보긴 어렵지만, 상습 악취·무단투숙·심야 소음 같은 중대한 문제로 누적되지는 않았다.",
        "verify_source": "민원대장 번호와 CCTV 확인 메모 시각, 관리실 순찰 기록이 맞아떨어진다.",
        "check_edits": "전산 입력과 종이 대장이 동일해 사후 수정 가능성은 낮다.",
        "question_acquisition": "건물 관리기록이라 분쟁 해결 목적 범위에서 적법성이 높다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이소담에게: \"실제 생활 불편의 정도\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 이소담의 \"실제 생활 불편의 정도\" 쟁점과 관련된다. 이소담은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "문경수에게: \"실제 생활 불편의 정도\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 문경수의 \"실제 생활 불편의 정도\" 쟁점과 관련된다. 문경수은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "실제 생활 불편의 정도 쟁점이 본격적으로 열릴 때 민원대장과 복도 확인 기록의 설득력이 커진다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:source_origin",
      "intentTag": "identity_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "tenant12:a:d-1:responsibility:3",
          "tenant12:b:d-2:context:2"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 사람 이름보다 흐름부터 정리해야 합니다.",
        "그 이름을 먼저 꺼내면 말이 더 꼬입니다."
      ]
    },
    {
      "id": "fq:d-2:phrase_intent",
      "intentTag": "context_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "tenant12:a:d-2:admission:5",
          "tenant12:b:d-2:responsibility:3"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "배경을 설명하려면 앞 맥락부터 다시 봐야 합니다.",
        "그 전후를 같이 놓지 않으면 오해가 생깁니다."
      ]
    },
    {
      "id": "fq:d-3:why_public_post",
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
        "disputeId": "d-3",
        "allowAtomIds": [
          "tenant12:a:d-3:emotion:4",
          "tenant12:a:d-3:admission:5"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 마음까지 지금 바로 꺼내고 싶진 않습니다.",
        "이유를 묻는 질문은 조금 더 뒤에 답하겠습니다."
      ]
    },
    {
      "id": "fq:d-4:actual_inconvenience",
      "intentTag": "timeline_check",
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
          "tenant12:a:d-4:context:2",
          "tenant12:b:d-4:context:2"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "순서를 한 번에 다 설명하긴 어렵습니다.",
        "그 시점 이야기는 아직 여기서 바로 못 하겠습니다."
      ]
    },
    {
      "id": "fq:d-5:correction_delay",
      "intentTag": "responsibility_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "tenant12:a:d-1:admission:5",
          "tenant12:b:d-5:context:2"
        ],
        "preferredAngleTags": [
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "지금은 제 몫과 남의 몫을 바로 자르기 어렵습니다.",
        "책임선을 지금 한 문장으로 자르긴 어렵습니다."
      ]
    },
    {
      "id": "fq:d-1:stigma_impact",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "tenant12:a:d-1:emotion:4",
          "tenant12:a:d-1:admission:5"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "감정 얘기는 아직 바로 꺼내기 어렵습니다.",
        "그 부분은 지금 말하면 더 격해질 것 같습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-5"
    ],
    "playerStyleTagCandidates": [
      "trap_chaser",
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer"
    ]
  },
  "proposedUnlockAtoms": [
    {
      "id": "tenant12:a:d-1:unlock:s2:0",
      "factText": "잘린 캡처의 원문을 잇자, 소문의 직접 출발점이 경수의 직언보다 미령의 애매한 말에 가깝게 복원된다.",
      "tags": [
        "context",
        "quote",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "조미령",
          "neutral": "그 사람",
          "fullName": "조미령",
          "judgeRef": "관리인"
        },
        "quote": {
          "exact": "4층 분 건은 제가 조용히 보고 있다",
          "neutral": "그 문장"
        },
        "record": {
          "exact": "e-2 원문 복원",
          "neutral": "그 자료"
        }
      },
      "stanceHints": [
        "partial",
        "uncertainty"
      ]
    },
    {
      "id": "tenant12:a:d-1:unlock:s3:0",
      "factText": "루머 전파 시간표상 '문제 세입자'라는 표현은 두 차례 재전달 뒤에 굳어진다.",
      "tags": [
        "timeline",
        "quote",
        "evidence"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "quote": {
          "exact": "문제 세입자",
          "neutral": "그 표현"
        },
        "record": {
          "exact": "e-5 전파 시간표",
          "neutral": "그 시간표"
        },
        "time": {
          "exact": "두 차례 재전달 뒤",
          "neutral": "그 흐름",
          "period": "전파 중간"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ]
    },
    {
      "id": "tenant12:a:d-1:unlock:s4:0",
      "factText": "소담은 이웃 시선에 눌려 관리인 발언과 집주인 책임을 하나의 낙인으로 받아들였다.",
      "tags": [
        "fear",
        "context",
        "identity"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "이웃 세입자들",
          "neutral": "주변 사람들",
          "fullName": "이웃 세입자들",
          "judgeRef": "이웃들"
        },
        "person2": {
          "exact": "문경수",
          "neutral": "상대",
          "fullName": "문경수",
          "judgeRef": "집주인"
        },
        "fear": {
          "exact": "문제 세입자 낙인",
          "neutral": "그 낙인"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant12:a:d-1:unlock:s5:0",
      "factText": "경수의 직접 유포 정황은 약하지만, 정정 지연이 소담에게 남은 낙인을 굳히는 데 영향을 줬다.",
      "tags": [
        "admission",
        "responsibility",
        "harm"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "문경수",
          "neutral": "상대",
          "fullName": "문경수",
          "judgeRef": "집주인"
        },
        "act": {
          "exact": "정정 지연",
          "neutral": "그 대응"
        },
        "effect": {
          "exact": "낙인 고착",
          "neutral": "그 결과"
        }
      },
      "stanceHints": [
        "confess",
        "blame"
      ]
    },
    {
      "id": "tenant12:a:d-3:unlock:s2:0",
      "factText": "단톡 공개 반박은 소문 캡처를 전달받은 지 약 25분 뒤, 별도 사실 확인 없이 게시됐다.",
      "tags": [
        "timeline",
        "act",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "time": {
          "exact": "약 25분 뒤",
          "neutral": "그 직후",
          "period": "캡처 수신 직후"
        },
        "channel": {
          "exact": "건물 단톡방",
          "neutral": "그 방"
        },
        "record": {
          "exact": "e-4 관리자 백업",
          "neutral": "그 기록"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ]
    },
    {
      "id": "tenant12:a:d-3:unlock:s3:0",
      "factText": "공개 게시문에는 '집주인과 관리인이 거짓 소문을 낸다'는 단정형 문장이 포함돼 있었다.",
      "tags": [
        "quote",
        "harm",
        "privacy"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "quote": {
          "exact": "집주인과 관리인이 거짓 소문을 낸다",
          "neutral": "그 문장"
        },
        "personA": {
          "exact": "문경수",
          "neutral": "상대",
          "fullName": "문경수",
          "judgeRef": "집주인"
        },
        "personB": {
          "exact": "조미령",
          "neutral": "그 사람",
          "fullName": "조미령",
          "judgeRef": "관리인"
        }
      },
      "stanceHints": [
        "partial",
        "admission"
      ]
    },
    {
      "id": "tenant12:a:d-3:unlock:s4:0",
      "factText": "소담은 공개 반박에서 확인된 사실과 추정을 한 문장에 섞어 수치심을 공격성으로 바꿨다.",
      "tags": [
        "emotion",
        "shame",
        "context"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "act": {
          "exact": "사실과 추정 혼합",
          "neutral": "그 방식"
        },
        "fear": {
          "exact": "문제 세입자 취급",
          "neutral": "그 취급"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant12:a:d-3:unlock:s5:0",
      "factText": "루머 전파 시간표를 보면 소담의 공개 글이 기존 오해를 정면충돌 국면으로 확대했다.",
      "tags": [
        "admission",
        "harm",
        "timeline"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "record": {
          "exact": "e-5 루머 전파 시간표",
          "neutral": "그 시간표"
        },
        "channel": {
          "exact": "공개 단톡 글",
          "neutral": "그 게시"
        },
        "effect": {
          "exact": "정면충돌 국면 확대",
          "neutral": "그 파장"
        }
      },
      "stanceHints": [
        "confess",
        "admit_harm"
      ]
    },
    {
      "id": "tenant12:a:d-4:unlock:s2:0",
      "factText": "민원대장에는 한 달 동안 짧은 복도 소음 두 건과 분리배출 재안내 한 건만 남아 있다.",
      "tags": [
        "evidence",
        "timeline",
        "threshold"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "record": {
          "exact": "민원대장 세 건",
          "neutral": "그 기록"
        },
        "issue": {
          "exact": "짧은 복도 소음 두 건과 분리배출 재안내 한 건",
          "neutral": "그 정도 불편"
        },
        "time": {
          "exact": "한 달 동안",
          "neutral": "그 기간",
          "period": "최근 한 달"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ]
    },
    {
      "id": "tenant12:a:d-4:unlock:s3:0",
      "factText": "반복 악취·무단투숙·심야 소음 같은 중대 기록은 확인되지 않는다.",
      "tags": [
        "threshold",
        "evidence",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "major": {
          "exact": "반복 악취·무단투숙·심야 소음",
          "neutral": "그 수준"
        },
        "record": {
          "exact": "복도 확인 기록",
          "neutral": "그 기록"
        }
      },
      "stanceHints": [
        "partial",
        "contextualize"
      ]
    },
    {
      "id": "tenant12:a:d-4:unlock:s4:0",
      "factText": "소담은 늦은 방문객 응대와 문 앞 동선이 복도에서 눈에 띌 수 있다는 점을 뒤늦게 받아들인다.",
      "tags": [
        "emotion",
        "shame",
        "context"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "issue": {
          "exact": "늦은 방문객 응대와 문 앞 동선",
          "neutral": "그 생활 동선"
        },
        "location": {
          "exact": "복도",
          "neutral": "그 공간"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant12:a:d-4:unlock:s5:0",
      "factText": "계약서와 생활규칙은 생활 불편 확인과 낙인성 공개를 분리하도록 설계돼 있다.",
      "tags": [
        "rule",
        "evidence",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "record": {
          "exact": "임대차계약서와 생활규칙",
          "neutral": "그 문서"
        },
        "rule": {
          "exact": "개별 고지 후 사실 확인",
          "neutral": "그 원칙"
        },
        "quote": {
          "exact": "낙인성 공개 금지",
          "neutral": "그 금지선"
        }
      },
      "stanceHints": [
        "confess",
        "contextualize"
      ]
    },
    {
      "id": "tenant12:b:d-2:unlock:s2:0",
      "factText": "미령 음성메모 원문에는 '4층 분 건은 제가 조용히 보고 있다'는 문장이 그대로 남아 있다.",
      "tags": [
        "quote",
        "evidence",
        "context"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "조미령",
          "neutral": "그 사람",
          "fullName": "조미령",
          "judgeRef": "관리인"
        },
        "quote": {
          "exact": "4층 분 건은 제가 조용히 보고 있다",
          "neutral": "그 문장"
        },
        "record": {
          "exact": "e-2 음성 원문",
          "neutral": "그 파일"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ]
    },
    {
      "id": "tenant12:b:d-2:unlock:s3:0",
      "factText": "전체 대화 문맥을 붙이면 그 발언은 냄새 질문을 달래며 먼저 확인하겠다는 취지였다.",
      "tags": [
        "context",
        "quote",
        "evidence"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "channel": {
          "exact": "옆집 달래기 대화 전체 문맥",
          "neutral": "그 문맥"
        },
        "quote": {
          "exact": "제가 먼저 확인하겠다",
          "neutral": "그 취지"
        }
      },
      "stanceHints": [
        "partial",
        "contextualize"
      ]
    },
    {
      "id": "tenant12:b:d-2:unlock:s4:0",
      "factText": "그 취지와 별개로 문장 형태는 특정 세대를 감시 중인 듯한 인상을 남겼다.",
      "tags": [
        "context",
        "harm",
        "uncertainty"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "quote": {
          "exact": "조용히 보고 있다",
          "neutral": "그 문장 형태"
        },
        "effect": {
          "exact": "감시 인상",
          "neutral": "그 인상"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant12:b:d-2:unlock:s5:0",
      "factText": "경수는 해당 표현의 모호함을 알고도 미령에게 즉시 정정 지시를 하지 않았다.",
      "tags": [
        "responsibility",
        "admission",
        "evidence"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "문경수",
          "neutral": "저",
          "fullName": "문경수",
          "judgeRef": "본인"
        },
        "person2": {
          "exact": "조미령",
          "neutral": "그 사람",
          "fullName": "조미령",
          "judgeRef": "관리인"
        },
        "act": {
          "exact": "즉시 정정 지시 부재",
          "neutral": "그 대응"
        }
      },
      "stanceHints": [
        "confess",
        "admit_responsibility"
      ]
    },
    {
      "id": "tenant12:b:d-4:unlock:s2:0",
      "factText": "공식 민원 기록은 한 달 세 건으로 제한되어 있다.",
      "tags": [
        "evidence",
        "timeline",
        "threshold"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "record": {
          "exact": "민원대장 세 건",
          "neutral": "그 기록"
        },
        "time": {
          "exact": "한 달",
          "neutral": "그 기간",
          "period": "최근 한 달"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ]
    },
    {
      "id": "tenant12:b:d-4:unlock:s3:0",
      "factText": "복도 확인 기록에도 상습 악취나 무단투숙 정황은 없다.",
      "tags": [
        "evidence",
        "threshold",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "record": {
          "exact": "복도 확인 기록",
          "neutral": "그 기록"
        },
        "major": {
          "exact": "상습 악취·무단투숙 정황 없음",
          "neutral": "그 부재"
        }
      },
      "stanceHints": [
        "partial",
        "contextualize"
      ]
    },
    {
      "id": "tenant12:b:d-4:unlock:s4:0",
      "factText": "문경수는 다른 세입자들의 체감 민원을 생활기록보다 더 크게 받아들였다.",
      "tags": [
        "motive",
        "context",
        "fear"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "다른 세입자들",
          "neutral": "주변 사람들",
          "fullName": "다른 세입자들",
          "judgeRef": "세입자들"
        },
        "record": {
          "exact": "공식 생활기록",
          "neutral": "그 기록"
        },
        "issue": {
          "exact": "체감 민원",
          "neutral": "그 불편감"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant12:b:d-4:unlock:s5:0",
      "factText": "생활 불편 자체는 경미했는데도 문경수의 설명은 그것을 반복 문제처럼 부풀렸다.",
      "tags": [
        "admission",
        "harm",
        "threshold"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "문경수",
          "neutral": "저",
          "fullName": "문경수",
          "judgeRef": "본인"
        },
        "minor": {
          "exact": "경미한 생활 불편",
          "neutral": "그 정도"
        },
        "major": {
          "exact": "반복 문제처럼 보인 인상",
          "neutral": "그 인상"
        }
      },
      "stanceHints": [
        "confess",
        "admit_responsibility"
      ]
    },
    {
      "id": "tenant12:b:d-5:unlock:s2:0",
      "factText": "경수-미령 문자에는 '민원은 조용히 처리하라'는 지시가 남아 있고, 즉각 정정문 흔적은 없다.",
      "tags": [
        "evidence",
        "quote",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "record": {
          "exact": "경수-미령 문자",
          "neutral": "그 문자"
        },
        "quote": {
          "exact": "민원은 조용히 처리하라",
          "neutral": "그 지시"
        },
        "act": {
          "exact": "즉각 정정문 없음",
          "neutral": "그 부재"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ]
    },
    {
      "id": "tenant12:b:d-5:unlock:s3:0",
      "factText": "경수는 소문 이후에도 관리인이 알아서 설명할 것이라 보고 직접 공지를 미뤘다.",
      "tags": [
        "context",
        "responsibility",
        "institution"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "조미령",
          "neutral": "그 사람",
          "fullName": "조미령",
          "judgeRef": "관리인"
        },
        "act": {
          "exact": "직접 공지 미룸",
          "neutral": "그 대응"
        },
        "channel": {
          "exact": "관리인 설명에 기대기",
          "neutral": "그 판단"
        }
      },
      "stanceHints": [
        "partial",
        "admit_issue"
      ]
    },
    {
      "id": "tenant12:b:d-5:unlock:s4:0",
      "factText": "경수의 지연 동기에는 건물 이미지 악화 우려와 갈등 확대 회피가 겹쳐 있다.",
      "tags": [
        "motive",
        "fear",
        "context"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "fear": {
          "exact": "건물 이미지 악화",
          "neutral": "그 우려"
        },
        "motive": {
          "exact": "갈등 확대 회피",
          "neutral": "그 계산"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant12:b:d-5:unlock:s5:0",
      "factText": "루머 전파 시간표상 정정 공백 동안 '문제 세입자' 인상이 굳어졌다.",
      "tags": [
        "timeline",
        "harm",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "record": {
          "exact": "e-5 루머 전파 시간표",
          "neutral": "그 시간표"
        },
        "quote": {
          "exact": "문제 세입자 인상",
          "neutral": "그 인상"
        },
        "time": {
          "exact": "정정 공백 동안",
          "neutral": "그 기간",
          "period": "지연 구간"
        }
      },
      "stanceHints": [
        "confess",
        "admit_harm"
      ]
    }
  ]
} as const;

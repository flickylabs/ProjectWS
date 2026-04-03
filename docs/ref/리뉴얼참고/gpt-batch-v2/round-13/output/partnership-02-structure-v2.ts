export const partnership02StructureV2 = {
  "caseId": "partnership-02",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "준오의 별도 유지보수 제안",
      "disputeKind": "core_truth",
      "truthDescription": "준오는 본계약 체결 전 세한리테일에 사촌 회사 명의의 별도 유지보수 파일럿을 붙일 수 있는지 타진했다.",
      "requiredEvidenceIds": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 78,
        "b": 22
      },
      "disputeAliases": [
        "준오의 별도 유지보수 제안",
        "본계약 서명 8일 전",
        "시훈데이터랩 사업자등록증",
        "유지보수 확장 가능성 확인",
        "본계약과 별개의 옵션",
        "본계약 체결 전"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "준오의 별도 유지보수 제안",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-02:a:d-1:denial:0",
            "partnership-02:b:d-1:act:0"
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
            "partnership-02:a:d-1:relationship:0",
            "partnership-02:b:d-1:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "준오는 본계약 체결 전 세한리테일에 사촌 회사 명의의 별도 유지보수 파일럿을 붙일 수 있는지 타진했다.",
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
            "partnership-02:a:d-1:admission:0",
            "partnership-02:b:d-1:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "민경의 공로 축소와 성과급 독식 시도",
      "disputeKind": "core_truth",
      "truthDescription": "민경은 최종 계약 부속문서와 사내 성과급 승인안에서 준오의 원천 영업 기여를 축소하고 자신을 단독 주공로자로 올렸다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 33,
        "b": 67
      },
      "disputeAliases": [
        "민경의 공로 축소와 성과급 독식 시도",
        "서민경",
        "최종 표지와 보상안",
        "박준오",
        "원천 영업 기여",
        "후반 운영 기여"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "민경의 공로 축소와 성과급 독식 시도",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-02:a:d-2:context:0",
            "partnership-02:b:d-2:denial:0"
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
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "partnership-02:a:d-2:threshold:0",
            "partnership-02:b:d-2:self_justification:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "민경은 최종 계약 부속문서와 사내 성과급 승인안에서 준오의 원천 영업 기여를 축소하고 자신을 단독 주공로자로 올렸다.",
          "lockedSummary": "관계의 핵심 책임선은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "partnership-02:a:d-2:evidence:0",
            "partnership-02:b:d-2:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "준오는 순수한 피해자였는가",
      "disputeKind": "shared_misconception",
      "truthDescription": "준오는 실제로 리드를 발굴하고 초기 제안을 만들었지만, 동시에 숨겨진 별도 유지보수 거래를 시도했기 때문에 공로를 빼앗기기만 한 순수한 피해자라고 볼 수는 없다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 61,
        "b": 39
      },
      "disputeAliases": [
        "준오는 순수한 피해자였는가",
        "당한 사람",
        "공로 탈취 사건",
        "세한리테일 리드 최초 등록",
        "첫 제안서 구조 작성",
        "완전히 깨끗한 판단"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "준오는 순수한 피해자였는가",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-02:a:d-3:timeline:0",
            "partnership-02:b:d-3:context:0"
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
            "partnership-02:a:d-3:self_justification:0",
            "partnership-02:b:d-3:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "준오는 실제로 리드를 발굴하고 초기 제안을 만들었지만, 동시에 숨겨진 별도 유지보수 거래를 시도했기 때문에 공로를 빼앗기기만 한 순수한 피해자라고 볼 수는 없다.",
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
            "partnership-02:a:d-3:admission:0",
            "partnership-02:b:d-3:threshold:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "weaponizes"
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
          "순수 피해자 프레임",
          "CRM 공로만 앞세우는 설명",
          "우회 메일을 뒤로 미루는 서사"
        ],
        "truthExitEvidenceIds": [
          "e-1",
          "e-4"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-4",
      "name": "RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반",
      "disputeKind": "sub_truth",
      "truthDescription": "두 사람은 공로와 외부 발표를 RACI 시트에 따르기로 서명했지만, 준오는 별도 거래로 공식 라인을 우회했고 민경은 최종 보고서와 보상안에서 단독 공로 구조를 만들었다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 46,
        "b": 54
      },
      "disputeAliases": [
        "RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반",
        "최종 보고서와 보상안",
        "공동 발표 원칙",
        "RACI 공로규칙",
        "민경 쪽 선위반",
        "외부 라인 이탈"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-02:a:d-4:act:0",
            "partnership-02:b:d-4:rule:0"
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
            "partnership-02:a:d-4:responsibility:0",
            "partnership-02:b:d-4:shame:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "두 사람은 공로와 외부 발표를 RACI 시트에 따르기로 서명했지만, 준오는 별도 거래로 공식 라인을 우회했고 민경은 최종 보고서와 보상안에서 단독 공로 구조를 만들었다.",
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
            "partnership-02:a:d-4:admission:0",
            "partnership-02:b:d-4:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "고객사가 민경을 단독 창구로 지정한 실제 원인",
      "disputeKind": "sub_truth",
      "truthDescription": "고객사가 민경을 단독 외부 창구로 정리한 실제 이유는 민경의 로비가 아니라, 준오의 별도 유지보수 제안과 제3자 사업자등록증 첨부로 촉발된 컴플라이언스 우려였다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 58,
        "b": 42
      },
      "disputeAliases": [
        "고객사가 민경을 단독 창구로 지정한 실제 원인",
        "컴플라이언스 우려",
        "민경의 선점 움직임",
        "단독 창구 지정",
        "내 잘못 외 다른 정치",
        "이름 누락"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "고객사가 민경을 단독 창구로 지정한 실제 원인",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-02:a:d-5:uncertainty:0",
            "partnership-02:b:d-5:denial:0"
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
            "partnership-02:a:d-5:fear:0",
            "partnership-02:b:d-5:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "고객사가 민경을 단독 외부 창구로 정리한 실제 이유는 민경의 로비가 아니라, 준오의 별도 유지보수 제안과 제3자 사업자등록증 첨부로 촉발된 컴플라이언스 우려였다.",
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
            "partnership-02:a:d-5:institution:0",
            "partnership-02:b:d-5:admission:0"
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
        "grantFlag": "d-5:supports:edge_01"
      },
      "uiLabel": "우회 제안이 컴플라이언스 우려를 촉발"
    },
    {
      "id": "link:d-5:d-2:supports",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-2",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-2:supports:edge_02"
      },
      "uiLabel": "단일 창구 지정이 공로 재편의 명분이 됨"
    },
    {
      "id": "link:d-4:d-2:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-2",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-2:unlocks_layer:edge_03"
      },
      "uiLabel": "RACI 위반이 보상 독식 구조를 드러냄"
    },
    {
      "id": "link:d-3:d-2:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-2",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -8,
        "grantFlag": "d-2:weakens_counter:edge_04"
      },
      "uiLabel": "피해자 프레임이 깨지면 공로 다툼이 재구성됨"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "CRM 리드 이력과 초기 제안서 버전 로그",
      "description": "세한리테일 리드가 준오 계정으로 처음 등록됐고, 초기 제안서의 핵심 구조와 첫 미팅 메모가 준오 작성으로 남아 있는 CRM 기록과 버전 로그다.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "CRM 원본 내보내기와 제안서 버전 기록이 함께 확보됐다.",
        "check_metadata": "리드 최초 생성자와 첫 견적 초안 작성자는 준오 계정으로 일치한다.",
        "restore_context": "민경이 후반 운영 범위와 리스크 관리 문단을 추가한 흔적도 함께 남아 있어 공로가 한쪽만은 아니었음이 드러난다.",
        "verify_source": "플랫폼 관리자 로그와 파일 해시가 서로 맞아떨어진다.",
        "check_edits": "삭제 복원이나 이름 바꾸기 흔적 없이 연속 버전이 이어져 있다.",
        "question_acquisition": "회사 공용 영업 플랫폼 자료라 확보 자체는 적법하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준오에게: \"준오는 순수한 피해자였는가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 박준오의 \"준오는 순수한 피해자였는가\" 쟁점과 관련된다. 박준오은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서민경에게: \"민경의 공로 축소와 성과급 독식 시도\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 서민경의 \"민경의 공로 축소와 성과급 독식 시도\" 쟁점과 관련된다. 서민경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-2의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.3,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "최종 계약 부속합의서와 성과급 승인안",
      "description": "최종 계약 부속문서, 보도자료 초안, 그리고 민경을 단독 주공로자로 적은 사내 성과급 승인안 묶음이다.",
      "type": "contract",
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
        "e-1"
      ],
      "investigationResults": {
        "request_original": "고객 서명본 부속합의서와 내부 결재용 보상안 원본이 함께 제출됐다.",
        "check_metadata": "문서 생성 시각은 고객사 단일 창구 요청 직후로 몰려 있다.",
        "restore_context": "원천 영업, 최종 협상, 운영 인수인계가 분리되어 있었는데 최종본에서는 민경 중심 서사만 남는다.",
        "verify_source": "전자결재 기록과 고객사 수신본 파일명이 일치한다.",
        "check_edits": "마지막 트랙체인지에서 준오 이름과 공동 발표 문구가 삭제된 흔적이 남아 있다.",
        "question_acquisition": "계약·보상 문서라 적법하지만 보너스 산정 기준 노출 범위는 내부로 제한돼야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준오에게: \"RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 박준오의 \"RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반\" 쟁점과 관련된다. 박준오은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서민경에게: \"민경의 공로 축소와 성과급 독식 시도\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 서민경의 \"민경의 공로 축소와 성과급 독식 시도\" 쟁점과 관련된다. 서민경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
      "name": "공유 태블릿에서 확보된 음성메모 캡처",
      "description": "준오가 '유지보수는 우리 말고 시훈 쪽으로 빼면 돼'라고 말한 대목만 짧게 남은 음성메모 자동전사 캡처다.",
      "type": "chat",
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
        "request_original": "원본 음성파일 전체가 아니라 자동전사 화면 캡처만 제출됐다.",
        "check_metadata": "캡처는 야근 중 회사 공유 태블릿에 동기화된 뒤 저장된 것으로 보인다.",
        "restore_context": "이 문장만으로는 정식 하도급 논의인지 사적 리베이트 구상인지 단정할 수 없다.",
        "verify_source": "준오 계정의 음성메모 앱 화면과 글꼴 구성이 일치한다.",
        "check_edits": "텍스트 조작 흔적은 없지만 앞뒤 문장이 제거돼 선택적 편집이 뚜렷하다.",
        "question_acquisition": "공유기기 동기화 자료를 명시적 동의 없이 확보한 것이어서 사생활·영업비밀 침해 우려가 있다."
      },
      "subjectParty": "a",
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
      "name": "원본 이메일 스레드와 시훈데이터랩 사업자등록증 첨부본",
      "description": "준오가 세한리테일 구매팀에 본계약과 별도로 사촌 회사 시훈데이터랩의 유지보수 파일럿 가능성을 묻고 사업자등록증을 첨부한 원본 메일 스레드다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "발신 원본, 수신 헤더, 첨부된 사업자등록증 사본이 모두 확보됐다.",
        "check_metadata": "메일 발신 시각은 본계약 서명 8일 전이며 내부 참조자는 비워져 있다.",
        "restore_context": "유지보수 범위를 본계약과 분리해 별도 논의하자는 문구가 있어 공식 라인 밖 제안임이 드러난다.",
        "verify_source": "고객사 서버 헤더와 시훈데이터랩 등록번호가 서로 맞는다.",
        "check_edits": "헤더 포함 원본이라 수정 흔적이 없다.",
        "question_acquisition": "회사 메일과 고객사 회신을 통해 확보한 자료라 적법하지만 제3자 사업자 정보가 포함돼 사용 범위는 제한돼야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준오에게: \"준오의 별도 유지보수 제안\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 박준오의 \"준오의 별도 유지보수 제안\" 쟁점과 관련된다. 박준오은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서민경에게: \"고객사가 민경을 단독 창구로 지정한 실제 원인\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 서민경의 \"고객사가 민경을 단독 창구로 지정한 실제 원인\" 쟁점과 관련된다. 서민경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "multiplier": 1.2,
            "note": "d-1의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.3,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "세한리테일 컴플라이언스 검토 메모와 담당자 회신",
      "description": "고객사가 별도 유지보수 제안과 제3자 사업자등록증 첨부를 리스크로 보고, 민경을 단일 공식 창구로 요청한 이유가 적힌 검토 메모와 담당자 회신이다.",
      "type": "institutional_note",
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
        "e-4"
      ],
      "investigationResults": {
        "request_original": "비식별 처리된 내부 검토 메모와 조수빈 차장의 확인 회신이 같이 제출됐다.",
        "check_metadata": "메모 작성 시각은 e-4 발신 다음 날 오전으로 찍혀 있다.",
        "restore_context": "단일 창구 지정은 공로 인정이 아니라 거래질서·이해충돌 통제를 위한 임시 조치로 설명된다.",
        "verify_source": "고객사 문서번호와 담당자 직인이 회신 메일 정보와 일치한다.",
        "check_edits": "기관 발급본이라 편집 흔적이 없고 비식별만 적용됐다.",
        "question_acquisition": "거래처 내부 검토자료라 제공 범위는 엄격히 제한되지만 분쟁 해결 목적 제출은 허용됐다."
      },
      "subjectParty": "b",
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
      "name": "공로배분 RACI 시트와 최종 보고서 편집 이력",
      "description": "원천 발굴·최종 협상·실행 인수인계의 공로 배분과 외부 발표 원칙을 적은 서명 RACI 시트, 그리고 준오 이름이 빠진 최종 보고서 편집 이력이다.",
      "type": "document",
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
      "investigationResults": {
        "request_original": "서명된 RACI 시트와 클라우드 문서 편집 로그 원본이 함께 제출됐다.",
        "check_metadata": "RACI 시트는 수주 두 달 전 서명됐고, 최종 편집은 수주 다음 날 민경 계정에서 이뤄졌다.",
        "restore_context": "원래 안은 원천 영업 6, 최종 협상 4의 성과급 구조와 공동 외부 발표 원칙을 담고 있었다.",
        "verify_source": "전자서명 검증과 드라이브 활동 로그가 서로 일치한다.",
        "check_edits": "최종본에서 준오 관련 줄이 삭제되고 민경 중심 문장이 삽입된 흔적이 선명하다.",
        "question_acquisition": "회사 내부 문서와 로그라 적법하게 확보됐지만 평가·보상 정보는 내부 한정 사용이 원칙이다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준오에게: \"RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 박준오의 \"RACI 공로규칙과 외부 커뮤니케이션의 쌍방 위반\" 쟁점과 관련된다. 박준오은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "서민경에게: \"민경의 공로 축소와 성과급 독식 시도\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 서민경의 \"민경의 공로 축소와 성과급 독식 시도\" 쟁점과 관련된다. 서민경은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "partnership-02:a:d-1:act:0",
          "partnership-02:b:d-1:responsibility:0"
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
          "partnership-02:a:d-1:uncertainty:0",
          "partnership-02:b:d-1:timeline:0"
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
          "partnership-02:a:d-3:threshold:0",
          "partnership-02:b:d-3:act:0"
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
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "partnership-02:a:d-2:threshold:0",
          "partnership-02:b:d-2:self_justification:0"
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
          "partnership-02:a:d-4:responsibility:0",
          "partnership-02:b:d-4:act:0"
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
          "partnership-02:a:d-5:context:0",
          "partnership-02:b:d-5:institution:0"
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
          "partnership-02:a:d-1:shame:0",
          "partnership-02:b:d-1:fear:0"
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

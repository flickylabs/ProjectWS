export const workplace_06_structure_v2 = {
  "caseId": "workplace-06",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "준호의 일괄 재배정과 대시보드 수정",
      "truth": true,
      "truthDescription": "준호는 인수인계 완료 전 서린 관할 계정을 일괄 재배정하고, 헬스 점수 임계값까지 직접 수정했다.",
      "weight": "high",
      "quadrant": "both_know",
      "legitimacyIssue": false,
      "disputeKind": "core_truth",
      "disputeAliases": [
        "계정 재배정",
        "헬스 점수 기준",
        "통합 첫 2주",
        "권하늘 PM",
        "공동 승인",
        "대시보드 수정"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "몇 건을 잠깐 돌린 건 있어도 임시로 멈추지 않게 하려던 겁니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-06:a:d-1:act:0",
            "workplace-06:a:d-1:context:0",
            "workplace-06:a:d-1:rule:0",
            "workplace-06:a:d-1:admission:0",
            "workplace-06:a:d-1:responsibility:0",
            "workplace-06:b:d-1:uncertainty:0",
            "workplace-06:b:d-1:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "통합 첫 주에 고객 지연과 전체 KPI가 한꺼번에 올라와서 팀장인 제가 숫자부터 막아야 한다는 압박이 컸습니다.",
          "lockedSummary": "아직 이 쟁점의 동기층은 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-1:responsibility:0",
            "workplace-06:a:d-1:counter:0",
            "workplace-06:a:d-1:responsibility:1",
            "workplace-06:a:d-1:admission:0",
            "workplace-06:b:d-1:harm:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "제가 공식 인수인계 전 고객 계정을 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했습니다.",
          "lockedSummary": "핵심 관계와 책임 고리는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-1:emotion:0",
            "workplace-06:a:d-1:shame:0",
            "workplace-06:a:d-1:admission:1",
            "workplace-06:a:d-1:responsibility:2",
            "workplace-06:b:d-1:emotion:0",
            "workplace-06:b:d-1:harm:2",
            "workplace-06:b:d-1:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "judgmentStatement": "준호는 계정을 재배정했다.",
      "mediationLink": "권한경계재설정",
      "correctResponsibility": {
        "a": 70,
        "b": 30
      }
    },
    {
      "id": "d-2",
      "name": "서린의 레거시 권한 사용과 라우팅 변경",
      "truth": true,
      "truthDescription": "서린은 삭제됐어야 할 레거시 관리자 권한으로 새벽에 수익운영 큐 라우팅과 벤더 태그를 수정했다.",
      "weight": "high",
      "quadrant": "b_only",
      "legitimacyIssue": false,
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "레거시 관리자 권한",
        "라우팅 규칙",
        "벤더 태그",
        "새벽 수정",
        "타팀 큐",
        "권한 잔존"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "건드린 게 있다 해도 수정이 아니라 복구였습니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-06:a:d-2:uncertainty:0",
            "workplace-06:a:d-2:context:0",
            "workplace-06:a:d-2:quote:0",
            "workplace-06:a:d-2:rule:0",
            "workplace-06:b:d-2:act:0",
            "workplace-06:b:d-2:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "통합 뒤에도 제 영역을 못 지킨 사람처럼 보일까 봐, 남아 있던 권한을 붙잡고라도 막아야 한다고 생각했습니다.",
          "lockedSummary": "아직 이 쟁점의 동기층은 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-2:responsibility:0",
            "workplace-06:a:d-2:responsibility:1",
            "workplace-06:a:d-2:institution:0",
            "workplace-06:b:d-2:responsibility:0",
            "workplace-06:b:d-2:counter:0",
            "workplace-06:b:d-2:responsibility:1",
            "workplace-06:b:d-2:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "제가 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했습니다.",
          "lockedSummary": "핵심 관계와 책임 고리는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:breach_named"
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-2:emotion:0",
            "workplace-06:a:d-2:harm:0",
            "workplace-06:a:d-2:admission:0",
            "workplace-06:b:d-2:emotion:0",
            "workplace-06:b:d-2:shame:0",
            "workplace-06:b:d-2:admission:1",
            "workplace-06:b:d-2:responsibility:2"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "requiredEvidence": [
        "e-2"
      ],
      "judgmentStatement": "서린은 레거시 권한으로 수정했다.",
      "mediationLink": "권한경계재설정",
      "correctResponsibility": {
        "a": 25,
        "b": 75
      }
    },
    {
      "id": "d-3",
      "name": "통합 공지의 단독 통제권 부여 여부",
      "truth": false,
      "truthDescription": "공지는 임시 안정화 지침일 뿐 단독 통제권은 없었다. RACI에 'co-sign + PM log' 필수가 명시돼 있다.",
      "weight": "high",
      "quadrant": "shared_misconception",
      "legitimacyIssue": false,
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "팀즈 통합공지",
        "temporary stabilization",
        "잘린 역할표",
        "통합 RACI",
        "co-sign",
        "PM log"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "공지 문구가 모호했고, 그때는 공동 승인 조건보다 안정화 책임이 먼저 보였습니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-06:a:d-3:quote:0",
            "workplace-06:a:d-3:uncertainty:0",
            "workplace-06:a:d-3:context:0",
            "workplace-06:a:d-3:rule:0",
            "workplace-06:b:d-3:quote:0",
            "workplace-06:b:d-3:rule:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "통합 리더십을 잃어 보일까 봐 모호한 문구를 제 쪽 책임 범위로 끌어당기고 싶었습니다.",
          "lockedSummary": "아직 이 쟁점의 동기층은 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-3:responsibility:0",
            "workplace-06:a:d-3:responsibility:1",
            "workplace-06:a:d-3:counter:0",
            "workplace-06:b:d-3:admission:0",
            "workplace-06:b:d-3:rule:1",
            "workplace-06:b:d-3:counter:0",
            "workplace-06:b:d-3:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "그 공지는 누구에게도 단독 통제권을 주지 않았고, 공동 승인과 PM 기록이 전제였습니다.",
          "lockedSummary": "핵심 관계와 책임 고리는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:misbelief_cracked"
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-3:fear:0",
            "workplace-06:a:d-3:harm:0",
            "workplace-06:a:d-3:admission:1",
            "workplace-06:a:d-3:responsibility:2",
            "workplace-06:b:d-3:fear:0",
            "workplace-06:b:d-3:harm:0",
            "workplace-06:b:d-3:admission:1",
            "workplace-06:b:d-3:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "requiredEvidence": [
        "e-1",
        "e-3",
        "e-6"
      ],
      "judgmentStatement": "통합 공지는 단독 통제권이 아니다.",
      "mediationLink": "역할명문화",
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "misbelief"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "외형상 그럴듯해 보이는 오해",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어적 확신이 붙는 단계",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석이 고착되는 단계",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "증거가 들어오며 균열이 생기는 단계",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해가 해소되고 책임만 남는 단계",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "잘린 역할표",
          "temporary stabilization 단독 인용",
          "전화 지시의 과잉해석"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해가 해소되고 책임만 남는 단계"
      }
    },
    {
      "id": "d-4",
      "name": "준호의 선행 캘리브레이션 메모",
      "truth": true,
      "truthDescription": "준호는 역할 경계 정리 전날 밤 HR 캘리브레이션에 서린을 'boundary-blind'로 적어 선행 낙인을 만들었다.",
      "weight": "medium",
      "quadrant": "a_only",
      "legitimacyIssue": false,
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "HR 캘리브레이션 초안",
        "boundary-blind",
        "경계 위반",
        "선행 메모",
        "리더십 평가",
        "통합 첫 2주"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "초안 메모에 우려를 적어 둔 건 있어도 공식 평가로 돌린 건 아닙니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-06:a:d-4:identity:0",
            "workplace-06:a:d-4:context:0",
            "workplace-06:a:d-4:self_justification:0",
            "workplace-06:a:d-4:rule:0",
            "workplace-06:a:d-4:admission:0",
            "workplace-06:a:d-4:responsibility:0",
            "workplace-06:b:d-4:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "새 팀 리더십 평가가 바로 붙는 상황이라 제가 통제력을 잃었다는 말을 들을까 두려웠습니다.",
          "lockedSummary": "아직 이 쟁점의 동기층은 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-4:responsibility:0",
            "workplace-06:a:d-4:counter:0",
            "workplace-06:a:d-4:rule:1",
            "workplace-06:a:d-4:admission:0",
            "workplace-06:b:d-4:harm:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "제가 역할 경계가 정리되기 전에 HR 초안에 이서린 씨를 'boundary-blind'처럼 읽히는 코멘트로 먼저 낙인찍었습니다.",
          "lockedSummary": "핵심 관계와 책임 고리는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:retaliation_named"
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-4:fear:0",
            "workplace-06:a:d-4:shame:0",
            "workplace-06:a:d-4:admission:1",
            "workplace-06:a:d-4:responsibility:1",
            "workplace-06:b:d-4:emotion:0",
            "workplace-06:b:d-4:harm:2",
            "workplace-06:b:d-4:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "requiredEvidence": [
        "e-5"
      ],
      "judgmentStatement": "준호는 서린을 'boundary-blind'로 적었다.",
      "mediationLink": "평가보류",
      "correctResponsibility": {
        "a": 85,
        "b": 15
      }
    },
    {
      "id": "d-5",
      "name": "지연 경고 후 쌍방 독단 핫픽스",
      "truth": true,
      "truthDescription": "지연 경고 후 준호는 계정을 직접 돌리고 서린은 자동화 규칙을 독단 수정했다. 둘 다 PM 에스컬레이션을 늦췄다.",
      "weight": "medium",
      "quadrant": "both_know",
      "legitimacyIssue": false,
      "disputeKind": "core_truth",
      "disputeAliases": [
        "고객 지연 신호",
        "핫픽스",
        "PM 에스컬레이션",
        "독단 수정",
        "공동운영 복구",
        "지연 경고"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "막히는 부분을 조금 건드린 건 있어도, 그건 잘린 고객 흐름을 막기 위한 임시 조치였습니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-06:a:d-5:act:0",
            "workplace-06:a:d-5:context:0",
            "workplace-06:a:d-5:rule:0",
            "workplace-06:a:d-5:admission:0",
            "workplace-06:a:d-5:responsibility:0",
            "workplace-06:b:d-5:act:0",
            "workplace-06:b:d-5:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "통합 후에도 제 일이 아닌 것처럼 밀려나는데 고객 손실 책임만 제 몫이 될까 봐 수치스러웠습니다.",
          "lockedSummary": "아직 이 쟁점의 동기층은 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-5:responsibility:0",
            "workplace-06:a:d-5:counter:0",
            "workplace-06:a:d-5:responsibility:1",
            "workplace-06:a:d-5:admission:0",
            "workplace-06:b:d-5:responsibility:0",
            "workplace-06:b:d-5:admission:0",
            "workplace-06:b:d-5:counter:0",
            "workplace-06:b:d-5:responsibility:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "고객 지연 신호 뒤에 제가 자동화 규칙을 독단적으로 수정했고 에스컬레이션도 늦췄습니다.",
          "lockedSummary": "핵심 관계와 책임 고리는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-5:motive:legacy_named"
            ]
          },
          "revealAtomIds": [
            "workplace-06:a:d-5:emotion:0",
            "workplace-06:a:d-5:shame:0",
            "workplace-06:a:d-5:admission:1",
            "workplace-06:a:d-5:responsibility:2",
            "workplace-06:b:d-5:emotion:0",
            "workplace-06:b:d-5:shame:0",
            "workplace-06:b:d-5:admission:1",
            "workplace-06:b:d-5:responsibility:2"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "requiredEvidence": [
        "e-2",
        "e-4",
        "e-6"
      ],
      "judgmentStatement": "준호는 계정을 직접 돌렸다.",
      "mediationLink": "공동운영복구",
      "correctResponsibility": {
        "a": 45,
        "b": 55
      }
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
        "grantFlag": "d-5:surface:first_hotfix_visible"
      },
      "uiLabel": "첫 독단"
    },
    {
      "id": "link:d-3:d-1:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "weakenCounterBy": 12,
        "grantFlag": "d-1:motive:solo_authority_denied"
      },
      "uiLabel": "공지 오독"
    },
    {
      "id": "link:d-2:d-5:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "retaliationBonus": 10,
        "grantFlag": "d-5:motive:retaliatory_loop_visible"
      },
      "uiLabel": "새벽 수정 반격"
    },
    {
      "id": "link:d-4:d-2:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-2",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "retaliationBonus": 8,
        "grantFlag": "d-2:motive:stigma_triggered"
      },
      "uiLabel": "선행 낙인 반발"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "팀즈 통합공지 캡처와 잘린 역할표",
      "description": "잘린 팀즈 공지 캡처. 'temporary stabilization' 뒤의 조건 문장이 빠져 단독 권한처럼 읽힌다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "partial",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "캡처가 아닌 공지 원문과 답글 스레드 전체를 함께 확인해야 한다.",
        "check_metadata": "'temporary stabilization' 뒤 조건 문장이 잘려 단독 권한 부여로 오독되기 쉽다.",
        "restore_context": "원 공지는 공동 승인+PM 기록을 전제로 한 임시 운영 지침이다.",
        "verify_source": "팀즈 메시지 ID와 캡처 시간은 일치. 다만 절삭 범위 때문에 해석이 달라진다.",
        "check_edits": "문장 조작은 없으나 절삭·하이라이트로 의미가 과장됐다.",
        "question_acquisition": "개인 단말 저장 조직 공지 캡처. 제출 범위·인명 노출 제한 필요."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준호에게: \"준호의 일괄 재배정과 대시보드 수정\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 박준호의 \"준호의 일괄 재배정과 대시보드 수정\" 쟁점과 관련된다. 박준호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "이서린에게: \"통합 공지의 단독 통제권 부여 여부\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 이서린의 \"통합 공지의 단독 통제권 부여 여부\" 쟁점과 관련된다. 이서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S3",
            "multiplier": 1.4,
            "note": "팀즈 통합공지 캡처와 잘린 역할표의 해석이 d-1 전개를 가장 크게 바꾸는 창입니다."
          },
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.4,
            "note": "팀즈 통합공지 캡처와 잘린 역할표의 해석이 d-3 전개를 가장 크게 바꾸는 창입니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "레거시 관리자 권한 감사 로그와 라우팅 규칙 변경 내역",
      "description": "서린의 레거시 관리자 권한 잔존 기록과, 새벽 시간대 라우팅·벤더 태그 변경 감사 로그.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "요약이 아닌 권한 부여 이력과 세부 변경 로그를 함께 추출해야 한다.",
        "check_metadata": "서린 계정 새벽 규칙 수정. 통합 후 삭제 대상 관리자 그룹이 아직 잔존.",
        "restore_context": "서린은 지연 방어를 주장하지만, 공식 승인 없이 타팀 큐를 건드린 사실은 남는다.",
        "verify_source": "권한관리 콘솔과 라우팅 엔진 로그가 같은 계정·세션 ID를 가리킨다.",
        "check_edits": "자동 감사 로그. 사후 편집 흔적 없음.",
        "question_acquisition": "시스템 운영 로그. 조사 범위 내 적법 열람 가능."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준호에게: \"지연 경고 후 쌍방 독단 핫픽스\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 박준호의 \"지연 경고 후 쌍방 독단 핫픽스\" 쟁점과 관련된다. 박준호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "이서린에게: \"서린의 레거시 권한 사용과 라우팅 변경\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 이서린의 \"서린의 레거시 권한 사용과 라우팅 변경\" 쟁점과 관련된다. 이서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "레거시 관리자 권한 감사 로그와 라우팅 규칙 변경 내역의 해석이 d-2 전개를 가장 크게 바꾸는 창입니다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "레거시 관리자 권한 감사 로그와 라우팅 규칙 변경 내역의 해석이 d-5 전개를 가장 크게 바꾸는 창입니다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "공식 통합 RACI 문서와 임시권한 해설 메모",
      "description": "계정 변경·규칙 수정에 'co-sign + PM log' 필수라고 명시된 통합 RACI와 해설 메모.",
      "type": "document",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "최종 배포본과 배포 직전 첨부된 해설 메모를 함께 확인해야 한다.",
        "check_metadata": "계정 변경·라우팅 수정 옆에 'co-sign + PM log' 필수가 명시돼 있다.",
        "restore_context": "임시 운영 범위가 오해됐을 뿐, 어느 쪽 단독 소관으로 정리된 적은 없다.",
        "verify_source": "PMO 저장소와 배포 메일 첨부본이 같은 버전 해시를 가진다.",
        "check_edits": "버전 이력 보존. 배포 당시 상태 복원 가능.",
        "question_acquisition": "통합 운영 문서. 업무 확인 적법."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "corroborate",
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
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "공식 통합 RACI 문서와 임시권한 해설 메모의 해석이 d-3 전개를 가장 크게 바꾸는 창입니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "통합 큐 재배정 기록과 대시보드 편집 이력",
      "description": "준호의 일괄 계정 재배정과 서린 팀 대시보드 점수 임계값 수정이 찍힌 CRM 감사 로그.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "결과표가 아닌 전후 오너십 변경 기록과 편집 이력을 함께 확인해야 한다.",
        "check_metadata": "준호 계정에서 짧은 시간 안에 일괄 재배정→점수 임계값 수정이 연속 실행.",
        "restore_context": "준호는 매출 방어를 주장하나, 인수인계 전 타팀 기준을 직접 바꾼 사실은 분명하다.",
        "verify_source": "CRM 감사 로그와 대시보드 기록이 같은 사용자·세션을 가리킨다.",
        "check_edits": "플랫폼 원본 로그. 사후 편집 흔적 없음.",
        "question_acquisition": "고객 계정 운영 기록. 분쟁 해결 범위 내 적법."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준호에게: \"준호의 일괄 재배정과 대시보드 수정\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 박준호의 \"준호의 일괄 재배정과 대시보드 수정\" 쟁점과 관련된다. 박준호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "이서린에게: \"지연 경고 후 쌍방 독단 핫픽스\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 이서린의 \"지연 경고 후 쌍방 독단 핫픽스\" 쟁점과 관련된다. 이서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "통합 큐 재배정 기록과 대시보드 편집 이력의 해석이 d-1 전개를 가장 크게 바꾸는 창입니다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "통합 큐 재배정 기록과 대시보드 편집 이력의 해석이 d-5 전개를 가장 크게 바꾸는 창입니다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "HR 캘리브레이션 초안과 매니저 코멘트",
      "description": "준호가 서린을 'boundary-blind'로 적은 HR 캘리브레이션 초안. 역할 정리 전날 밤 입력.",
      "type": "institutional_note",
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
        "request_original": "요약이 아닌 초기 입력본과 수정본을 모두 확인해야 한다.",
        "check_metadata": "역할 경계 정리 전날 밤 준호 계정에서 'boundary-blind' 코멘트가 먼저 입력.",
        "restore_context": "징계가 아닌 캘리브레이션 메모가 통합 초기 평판을 선행적으로 형성했다.",
        "verify_source": "HR 시스템 관리자 조회본과 출력본이 일치한다.",
        "check_edits": "수정 이력 보존. 표현 완화 전 원문까지 확인 가능.",
        "question_acquisition": "인사자료. 사용 목적은 분쟁 해결에 한정."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "contextualize",
        "role": "establish",
        "bestAtStates": [
          "S1",
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
          "context",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "motive",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "HR 캘리브레이션 초안과 매니저 코멘트의 해석이 d-4 전개를 가장 크게 바꾸는 창입니다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "부서통합 PM 회의록과 에스컬레이션 체크리스트",
      "description": "권한 충돌 시 'PM 즉시 기록+공동 승인'이라고 적힌 통합 회의록과 에스컬레이션 체크리스트.",
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
        "e-3"
      ],
      "investigationResults": {
        "request_original": "확정본과 당일 체크리스트 제출 여부, 댓글 스레드를 함께 확인해야 한다.",
        "check_metadata": "지연 알림 당일 두 사람 모두 체크리스트를 열람했으나 PM 핑은 늦게 남았다.",
        "restore_context": "혼선이 있었더라도 즉시 에스컬레이션 루트는 이미 마련돼 있었다.",
        "verify_source": "PM 도구 알림과 회의록 링크가 같은 이벤트 ID로 연결된다.",
        "check_edits": "보존된 협업 문서. 사후 편집 흔적 없음.",
        "question_acquisition": "통합 운영 회의 자료. 업무 목적 확인 적법."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "박준호에게: \"지연 경고 후 쌍방 독단 핫픽스\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 박준호의 \"지연 경고 후 쌍방 독단 핫픽스\" 쟁점과 관련된다. 박준호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "이서린에게: \"통합 공지의 단독 통제권 부여 여부\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 이서린의 \"통합 공지의 단독 통제권 부여 여부\" 쟁점과 관련된다. 이서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "establish",
        "bestAtStates": [
          "S1",
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
          "context",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "motive",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "부서통합 PM 회의록과 에스컬레이션 체크리스트의 해석이 d-3 전개를 가장 크게 바꾸는 창입니다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "부서통합 PM 회의록과 에스컬레이션 체크리스트의 해석이 d-5 전개를 가장 크게 바꾸는 창입니다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:credit_identity",
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
          "workplace-06:a:d-1:admission:0",
          "workplace-06:a:d-1:responsibility:0",
          "workplace-06:a:d-1:counter:0",
          "workplace-06:a:d-1:responsibility:1"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:motive_gap",
      "intentTag": "motive_probe",
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
          "workplace-06:a:d-1:emotion:0",
          "workplace-06:a:d-1:shame:0"
        ],
        "preferredAngleTags": [
          "motive",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:procedure_scope",
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
        "disputeId": "d-2",
        "allowAtomIds": [
          "workplace-06:b:d-2:admission:0",
          "workplace-06:b:d-2:responsibility:0",
          "workplace-06:b:d-2:admission:1",
          "workplace-06:b:d-2:responsibility:2"
        ],
        "preferredAngleTags": [
          "legality",
          "context"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:origin_or_authenticity",
      "intentTag": "context_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "workplace-06:a:d-3:counter:0",
          "workplace-06:a:d-3:harm:0"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:preemptive_note",
      "intentTag": "responsibility_probe",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "workplace-06:a:d-4:counter:0",
          "workplace-06:a:d-4:rule:1",
          "workplace-06:a:d-4:admission:1",
          "workplace-06:a:d-4:responsibility:1"
        ],
        "preferredAngleTags": [
          "responsibility",
          "timeline"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:legacy_pattern",
      "intentTag": "context_check",
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
          "workplace-06:b:d-5:counter:0",
          "workplace-06:b:d-5:responsibility:1",
          "workplace-06:b:d-5:admission:0",
          "workplace-06:b:d-5:responsibility:0"
        ],
        "preferredAngleTags": [
          "context",
          "motive"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:repair_emotion",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "workplace-06:b:d-5:emotion:0",
          "workplace-06:b:d-5:shame:0",
          "workplace-06:b:d-5:counter:0"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "지금은 그 질문에 바로 답할 만큼 정리가 되지 않았습니다.",
        "그 부분은 먼저 앞선 사실관계를 정리해야 말씀드릴 수 있습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
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
} as const;

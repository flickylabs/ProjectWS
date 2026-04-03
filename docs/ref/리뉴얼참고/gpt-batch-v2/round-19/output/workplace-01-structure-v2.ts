export const workplace_01_structure_v2 = {
  "caseId": "workplace-01",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "태성의 단독 명의 제출",
      "truthDescription": "태성은 서윤이 설계한 전환율 분석 프레임과 KPI 표를 그대로 쓰면서 제출 메일·표지에서 서윤 이름을 삭제했다.",
      "weight": "high",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "단독 명의",
        "표지 이름 삭제",
        "박서윤 오너",
        "초안 메일",
        "회의록",
        "KPI 표"
      ],
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "태성의 단독 명의 제출에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-01:a:d-1:timeline:2",
            "workplace-01:a:d-1:context:5",
            "workplace-01:b:d-1:identity:0",
            "workplace-01:b:d-1:admission:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "태성의 단독 명의 제출 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
          "lockedSummary": "숨은 동기와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-1:fear:6",
            "workplace-01:a:d-1:emotion:8",
            "workplace-01:b:d-1:counter:6",
            "workplace-01:b:d-1:shame:8"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "태성의 단독 명의 제출가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
          "lockedSummary": "핵심 책임선과 관계 연결은 아직 잠겨 있습니다.",
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
            "workplace-01:a:d-1:responsibility:10",
            "workplace-01:b:d-1:admission:10",
            "workplace-01:b:d-1:responsibility:11",
            "workplace-01:a:d-1:motive:11"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "서윤의 인사 화면 무단 열람·유포",
      "truthDescription": "서윤은 공유폴더에 남은 권한으로 새벽 1시에 평가 메모를 열고 캡처해 동료 둘에게 보냈다. '태성이 점수를 깎았다'는 소문이 번졌다.",
      "weight": "high",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "새벽 1시 캡처",
        "평가 화면",
        "슬랙 캡처",
        "두 명 전송",
        "무단 열람",
        "인사 메모"
      ],
      "requiredEvidence": [
        "e-5"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서윤의 인사 화면 무단 열람·유포에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-01:a:d-2:timeline:3",
            "workplace-01:a:d-2:emotion:4",
            "workplace-01:b:d-2:denial:0",
            "workplace-01:b:d-2:context:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "서윤의 인사 화면 무단 열람·유포 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
          "lockedSummary": "숨은 동기와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-2:emotion:4",
            "workplace-01:a:d-2:relationship:8",
            "workplace-01:b:d-2:fear:5",
            "workplace-01:b:d-2:fear:8"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "서윤의 인사 화면 무단 열람·유포가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
          "lockedSummary": "핵심 책임선과 관계 연결은 아직 잠겨 있습니다.",
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
            "workplace-01:b:d-2:responsibility:11",
            "workplace-01:a:d-2:privacy:10",
            "workplace-01:a:d-2:context:11",
            "workplace-01:b:d-2:privacy:10"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "수정 로그의 최종 수정자 진위",
      "truthDescription": "23:48 최종 수정자=서윤이라는 주장은 조작된 PDF에 근거한다. 서버 원본에는 같은 시각 관리자 대리발급 토큰의 메타 덮어쓰기가 찍혀 있다.",
      "weight": "high",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "23:48 수정자",
        "잘린 PDF",
        "원본 감사 로그",
        "관리자 토큰",
        "공용 PC",
        "최종 수정자"
      ],
      "requiredEvidence": [
        "e-2",
        "e-3",
        "e-6"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "수정 로그의 최종 수정자 진위를 둘 다 같은 방향으로 오해하고 있습니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-01:a:d-3:evidence:0",
            "workplace-01:a:d-3:context:5",
            "workplace-01:b:d-3:uncertainty:1",
            "workplace-01:b:d-3:institution:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "수정 로그의 최종 수정자 진위 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
          "lockedSummary": "숨은 동기와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-3:admission:4",
            "workplace-01:a:d-3:fear:8",
            "workplace-01:b:d-3:evidence:4",
            "workplace-01:b:d-3:fear:8"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "수정 로그의 최종 수정자 진위가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
          "lockedSummary": "핵심 책임선과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-3:surface:identity_evidenced"
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-3:admission:10",
            "workplace-01:a:d-3:institution:11",
            "workplace-01:b:d-3:responsibility:11"
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
            "summary": "방어와 당황",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석 고착",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "혼란과 확신 약화",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해 해소",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "23:48 이름만 남은 잘린 PDF",
          "공용 PC·관리자 토큰 열이 빠진 출력본"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-4",
      "name": "태성의 비공식 평가 코멘트",
      "truthDescription": "태성은 점수 확정 전 HR에 \"기여는 있으나 리스크가 크다\"는 비공개 코멘트를 넣었고, 직후 서윤의 기여 항목이 축소됐다.",
      "weight": "high",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "HR 비공개 메모",
        "기여는 있으나 리스크",
        "보고서 오너",
        "보조 분석",
        "평가 초안",
        "점수 보정"
      ],
      "requiredEvidence": [
        "e-4"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "태성의 비공식 평가 코멘트에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-01:a:d-4:denial:0",
            "workplace-01:a:d-4:admission:4",
            "workplace-01:b:d-4:timeline:2",
            "workplace-01:b:d-4:evidence:4",
            "workplace-01:b:d-4:motive:5"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "태성의 비공식 평가 코멘트 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
          "lockedSummary": "숨은 동기와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-4:quote:5",
            "workplace-01:a:d-4:fear:8",
            "workplace-01:b:d-4:motive:5",
            "workplace-01:b:d-4:fear:8"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "태성의 비공식 평가 코멘트가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
          "lockedSummary": "핵심 책임선과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S3"
              },
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:legality_evidenced"
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-4:responsibility:10",
            "workplace-01:b:d-4:responsibility:11",
            "workplace-01:a:d-4:motive:11",
            "workplace-01:b:d-4:evidence:10"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "성과 배분 합의의 쌍방 위반",
      "truthDescription": "병기 합의를 태성은 단독 명의 제출로 깨뜨렸고, 서윤은 인사 화면 무단 캡처·유포로 정식 이의 절차를 무너뜨렸다. 쌍방 위반이다.",
      "weight": "medium",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "실무 기여자 병기",
        "단독 명의",
        "정식 이의 절차",
        "성과 배분",
        "쌍방 위반",
        "소문 확산"
      ],
      "requiredEvidence": [
        "e-1",
        "e-5"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "성과 배분 합의의 쌍방 위반에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-01:a:d-5:rule:0",
            "workplace-01:a:d-5:admission:4",
            "workplace-01:b:d-5:denial:0",
            "workplace-01:b:d-5:context:6"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "성과 배분 합의의 쌍방 위반 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
          "lockedSummary": "숨은 동기와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-5:admission:4",
            "workplace-01:a:d-5:emotion:8",
            "workplace-01:b:d-5:admission:4",
            "workplace-01:b:d-5:motive:8"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "성과 배분 합의의 쌍방 위반가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
          "lockedSummary": "핵심 책임선과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S3"
              },
              {
                "id": "d-3",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-5:surface:context_evidenced"
            ]
          },
          "revealAtomIds": [
            "workplace-01:a:d-5:rule:10",
            "workplace-01:b:d-5:responsibility:10",
            "workplace-01:a:d-5:counter:11",
            "workplace-01:b:d-5:motive:11"
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
        "grantFlag": "d-5:surface:first_breach_seen"
      },
      "uiLabel": "먼저 깬 쪽"
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
        "supportBonus": 10,
        "grantFlag": "d-1:core:evaluation_bias_seen"
      },
      "uiLabel": "평가 개입 흔적"
    },
    {
      "id": "link:d-3:d-2:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-2",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-2:motive:trap_frame_broken"
      },
      "uiLabel": "로그 프레임 균열"
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
        "supportBonus": 8,
        "grantFlag": "d-5:motive:retaliation_loop_seen"
      },
      "uiLabel": "보복성 확산"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "프로젝트 초안 제출 이메일 체인과 주간회의록",
      "description": "서윤이 올린 분석 프레임·KPI 표 초안과, 같은 주간회의록에 '실무 오너: 서윤'으로 기록된 자료 묶음이다.",
      "type": "email",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "메일 원본(.eml)과 회의록 초안·확정본 3건이 모두 서버에 보존돼 있다.",
        "check_metadata": "초안 첨부 Author=박서윤, 회의록 최초 입력자=박서윤. 두 메타 모두 서윤 계정이다.",
        "restore_context": "태성 회신에 \"임원용 문안은 내가 다듬겠다\"는 역할 분담 문장이 함께 적혀 있다.",
        "verify_source": "사내 메일 서버 아카이브와 개인 받은편지함 사본 헤더·본문이 일치한다.",
        "check_edits": "첨부 파일 SHA-256 해시가 서버 보존본과 동일. 사후 편집 흔적 없음.",
        "question_acquisition": "팀 프로젝트 공용 메일함 자료. 제출 절차상 문제 없음."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤태성에게: \"태성의 단독 명의 제출\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 윤태성의 \"태성의 단독 명의 제출\" 쟁점과 관련된다. 윤태성은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박서윤에게: \"태성의 단독 명의 제출\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 박서윤의 \"태성의 단독 명의 제출\" 쟁점과 관련된다. 박서윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
        "role": "finish",
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
            "state": "S2",
            "multiplier": 1.2,
            "note": "핵심 사실선을 고정하는 구간입니다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.2,
            "note": "핵심 사실선을 고정하는 구간입니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "태성이 제출한 문서 수정 이력 PDF",
      "description": "23:48 최종 수정자=박서윤으로 찍힌 보고서 이력 캡처 PDF. 단, 서버 직출력본이 아니다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "서버 감사 로그 원본이 아닌 PDF 출력본만 제출됐다. 원본 대조가 필요하다.",
        "check_metadata": "생성 시각이 추출 시각보다 14분 늦고, Creator 필드가 일반 내보내기와 다르다.",
        "restore_context": "관리자 토큰 열과 이전 편집 열이 잘려 있다. 이 PDF만으로 최종 수정자 확정 불가.",
        "verify_source": "공용 PC에서 생성된 파일이나 문서 서버 직출력 여부는 미확인.",
        "check_edits": "글꼴 레이어와 표 간격이 한 행만 어긋남. 선택적 행 편집 가능성이 있다.",
        "question_acquisition": "태성 자발 제출이라 입수 경위는 적법. 다만 진본성은 별도 쟁점이다."
      },
      "subjectParty": "a",
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
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "오해 프레임이 고착되기 전에 제시하면 반전 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "문서 서버 원본 감사 로그",
      "description": "서버 원본 감사 로그. 서윤의 마지막 정상 편집은 20:17, 23:41에 관리자 대리발급 토큰이 메타를 덮어쓴 기록이 남아 있다.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "서버 raw log에 사용자 ID·토큰 종류·편집 범위가 줄 단위로 보존돼 있다.",
        "check_metadata": "23:41 행에 서윤 계정이 아닌 관리자 대리발급 토큰+공용 PC 세션 ID가 찍혀 있다.",
        "restore_context": "본문 수정은 20:17 이전에 완료. 23시대 기록은 메타데이터 덮어쓰기에 해당한다.",
        "verify_source": "문서 서버 감사 콘솔과 백업 서버 로그의 타임스탬프·순서가 일치한다.",
        "check_edits": "서버 추출 CSV 원본. 사후 편집 흔적 없음.",
        "question_acquisition": "감사팀 입회 하 추출 원본. 증거 능력 높음."
      },
      "subjectParty": "a",
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
            "multiplier": 1.35,
            "note": "오해 프레임이 고착되기 전에 제시하면 반전 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "HR 평가 초안 버전기록과 코멘트 메모",
      "description": "평가 초안 v1→v2에서 서윤 기여가 '보고서 오너'→'보조 분석'으로 축소되고, 태성의 비공개 코멘트가 끼어든 버전기록.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "HR 평가 시스템 원본 버전 2건과 코멘트 입력 기록이 보존돼 있다.",
        "check_metadata": "점수 보정 직전, 태성 계정에서 비공개 메모 입력 시각이 로그에 남아 있다.",
        "restore_context": "v1에 '보고서 오너: 서윤'이 명시됐으나 v2에서 '보조 분석'으로 축소됐다.",
        "verify_source": "HR 시스템 관리자 확인본과 출력본이 일치한다.",
        "check_edits": "버전 이력은 수정 불가 감사 로그. 편집 흔적 없음.",
        "question_acquisition": "인사 자료이므로 열람·제출 범위는 분쟁 해결 목적에 한정해야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤태성에게: \"태성의 단독 명의 제출\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 윤태성의 \"태성의 단독 명의 제출\" 쟁점과 관련된다. 윤태성은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박서윤에게: \"태성의 단독 명의 제출\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 박서윤의 \"태성의 단독 명의 제출\" 쟁점과 관련된다. 박서윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
        "role": "finish",
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
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "legality",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.2,
            "note": "핵심 사실선을 고정하는 구간입니다."
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.2,
            "note": "핵심 사실선을 고정하는 구간입니다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "서윤이 전달한 슬랙 캡처 묶음",
      "description": "서윤이 새벽 1시에 동료 둘에게 보낸 슬랙 DM과 평가 화면 크롭 캡처. 의도적으로 잘린 부분이 있다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "원본 대화 전체가 아닌 갤러리 묶음 캡처 5장만 제출됐다.",
        "check_metadata": "캡처 생성 시각이 01:02~01:14에 몰려 있다. 평가 열람 직후 촬영.",
        "restore_context": "수정 지시와 평가 문장이 일부 크롭돼 있다. 잘린 맥락 복원이 필요.",
        "verify_source": "동료 2명 단말 수신 파일명과 서윤 갤러리 원본 파일명이 일치한다.",
        "check_edits": "텍스트 변조는 없으나 의도적 크롭과 순서 재배치가 확인된다.",
        "question_acquisition": "잔존 권한으로 인사 화면을 열람해 얻은 자료. 인사정보 침해 우려가 크다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "contextualize",
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
          "emotion"
        ],
        "blockedVectorsHelp": [
          "context",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.2,
            "note": "핵심 사실선을 고정하는 구간입니다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.2,
            "note": "핵심 사실선을 고정하는 구간입니다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "감사팀 포렌식 메모와 관리자 토큰 발급 기록",
      "description": "오지훈이 공용 PC에서 대리발급 토큰을 사용한 기록과, 태성 제출 PDF 해시≠공식 추출본 해시라는 감사팀 포렌식 메모.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "대리발급 토큰 기록과 PDF 해시 비교표가 함께 첨부돼 있다.",
        "check_metadata": "공식 추출본과 태성 제출 PDF 사이에 11분 시차와 해시 불일치가 있다.",
        "restore_context": "오지훈이 토큰 사용을 숨기려 내보내기 PDF에서 관련 열을 제거한 것으로 정리된다.",
        "verify_source": "감사팀 저장소와 IT 운영 기록이 동일한 결론을 가리킨다.",
        "check_edits": "감사팀 서명본 포렌식 메모. 사후 수정 흔적 없음.",
        "question_acquisition": "내부 조사 문건으로 적법. 다만 관리자 개인 징계 정보는 최소 공개 원칙 적용."
      },
      "subjectParty": "a",
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
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "legality",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "오해 프레임이 고착되기 전에 제시하면 반전 효율이 높습니다."
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
          "workplace-01:a:d-1:admission:4",
          "workplace-01:b:d-1:admission:4",
          "workplace-01:b:d-1:rule:5"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 이름만으로 책임을 단정할 단계가 아닙니다.",
        "역할선이 더 열린 뒤에 답하겠습니다."
      ]
    },
    {
      "id": "fq:d-1:timeline_commitment",
      "intentTag": "timeline_probe",
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
          "workplace-01:a:d-1:admission:4",
          "workplace-01:a:d-1:context:5",
          "workplace-01:b:d-1:admission:4",
          "workplace-01:b:d-1:rule:5"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "약속 시각을 지금 잘라 말하면 오해가 커집니다.",
        "순서를 더 맞춘 뒤에 답하는 편이 정확합니다."
      ]
    },
    {
      "id": "fq:d-2:motive_boundary",
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
          "workplace-01:a:d-2:emotion:4",
          "workplace-01:b:d-2:fear:5"
        ],
        "preferredAngleTags": [
          "motive",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "동기만 떼어 묻기엔 아직 사실선이 덜 열렸습니다.",
        "그 감정은 더 깊은 층위에서 답하겠습니다."
      ]
    },
    {
      "id": "fq:d-3:source_authenticity",
      "intentTag": "authenticity_probe",
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
          "workplace-01:a:d-3:context:5",
          "workplace-01:b:d-3:institution:6"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 자료의 진본성은 아직 단정 답변이 어렵습니다.",
        "원본과 출력본의 맥락이 더 붙어야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:backchannel_reason",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "workplace-01:a:d-4:admission:4",
          "workplace-01:b:d-4:evidence:4",
          "workplace-01:b:d-4:motive:5"
        ],
        "preferredAngleTags": [
          "context",
          "legality"
        ]
      },
      "refusalTemplates": [
        "그 뒷채널은 아직 설명 순서가 남아 있습니다.",
        "공식 기록과 비공식 의도를 함께 봐야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:repair_intent",
      "intentTag": "repair_intent",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "workplace-01:a:d-5:emotion:8",
          "workplace-01:b:d-5:admission:4"
        ],
        "preferredAngleTags": [
          "emotion",
          "motive"
        ]
      },
      "refusalTemplates": [
        "정리 의도는 아직 감정이 덜 가라앉아 답하기 어렵습니다.",
        "그 관계 복구 질문은 마지막 층위에서 답하겠습니다."
      ]
    }
  ],
  "proposedUnlockAtoms": [
    {
      "id": "workplace-01:a:d-1:unlock:s2:0",
      "factText": "초안 메일과 주간회의록에는 박서윤이 핵심 분석 프레임의 실무 오너로 적혀 있었다.",
      "tags": [
        "evidence",
        "identity"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "role": {
          "exact": "보고서 오너",
          "neutral": "그 주도 역할"
        },
        "evidence": {
          "exact": "프로젝트 초안 메일과 주간회의록",
          "neutral": "그 자료 묶음"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S2"
    },
    {
      "id": "workplace-01:a:d-1:unlock:s3:0",
      "factText": "작년 하반기부터 대외 제출본에는 실무 기여자를 병기하기로 팀 내 합의가 이어지고 있었다.",
      "tags": [
        "rule",
        "relationship"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "rule": {
          "exact": "실무 기여자 병기 관행",
          "neutral": "그 기여자 표기 규칙"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S3"
    },
    {
      "id": "workplace-01:a:d-1:unlock:s4:0",
      "factText": "윤태성은 승진 심사 주간에 팀 통제력이 흔들려 보일까 두려워 이름 표기를 좁혔다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        },
        "time": {
          "exact": "평가 시즌",
          "dateExact": "평가 시즌",
          "period": "승진 심사 주간",
          "neutral": "그 시각"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S4"
    },
    {
      "id": "workplace-01:a:d-1:unlock:s5:0",
      "factText": "제출 메일과 표지에서 박서윤 이름을 뺀 최종 판단은 윤태성 본인이 내린 것이었다.",
      "tags": [
        "responsibility",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S5"
    },
    {
      "id": "workplace-01:a:d-2:unlock:s2:0",
      "factText": "박서윤은 새벽 1시대에 평가 화면 일부를 캡처해 동료 두 명에게 전송했다.",
      "tags": [
        "privacy",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "time": {
          "exact": "새벽 1시대",
          "dateExact": "새벽 1시대",
          "period": "평가 캡처가 몰린 시각",
          "neutral": "그 시각"
        },
        "count": {
          "exact": "2명",
          "neutral": "그 인원",
          "rounded": "두 명"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-2",
      "_state": "S2"
    },
    {
      "id": "workplace-01:a:d-2:unlock:s3:0",
      "factText": "슬랙 캡처 묶음은 평가 문장과 야간 수정 지시를 부분적으로 잘라 맥락을 재배치한 흔적이 있다.",
      "tags": [
        "evidence",
        "harm"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "evidence": {
          "exact": "슬랙 캡처 묶음",
          "neutral": "그 캡처 묶음"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-2",
      "_state": "S3"
    },
    {
      "id": "workplace-01:a:d-2:unlock:s4:0",
      "factText": "윤태성의 늦은 밤 수정 지시와 비공식 평가 코멘트가 박서윤의 불신을 키운 배경으로 작용했다.",
      "tags": [
        "context",
        "relationship"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-2",
      "_state": "S4"
    },
    {
      "id": "workplace-01:a:d-2:unlock:s5:0",
      "factText": "무단 열람과 유포 책임은 박서윤에게 있지만, 그 불신의 배경을 만든 관리 방식 일부는 윤태성 쪽에도 있었다.",
      "tags": [
        "responsibility",
        "context"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "admission",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-2",
      "_state": "S5"
    },
    {
      "id": "workplace-01:a:d-3:unlock:s2:0",
      "factText": "문서 수정 이력 PDF는 원본 감사 로그가 아니라 잘린 출력본으로 단독 증거력이 약하다.",
      "tags": [
        "evidence",
        "uncertainty"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "evidence": {
          "exact": "문서 수정 이력 PDF",
          "neutral": "그 PDF"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-3",
      "_state": "S2"
    },
    {
      "id": "workplace-01:a:d-3:unlock:s3:0",
      "factText": "제출된 PDF는 주장된 추출 시각보다 생성 시각이 늦고 관련 열이 빠져 있어 선택적 편집 가능성이 보인다.",
      "tags": [
        "timeline",
        "evidence"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "time": {
          "exact": "23시 48분",
          "dateExact": "23시 48분",
          "period": "PDF상 최종 수정 시각",
          "neutral": "그 시각"
        },
        "evidence": {
          "exact": "문서 수정 이력 PDF",
          "neutral": "그 PDF"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-3",
      "_state": "S3"
    },
    {
      "id": "workplace-01:a:d-3:unlock:s4:0",
      "factText": "윤태성은 공용 PC와 관리자 대리발급 토큰 가능성을 알면서도 원본 로그 대신 PDF 프레임을 유지했다.",
      "tags": [
        "institution",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "session": {
          "exact": "공용 PC 세션",
          "neutral": "그 공용 PC 세션"
        },
        "token": {
          "exact": "관리자 대리발급 토큰",
          "neutral": "그 관리자 토큰"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-3",
      "_state": "S4"
    },
    {
      "id": "workplace-01:a:d-3:unlock:s5:0",
      "factText": "윤태성은 박서윤 책임을 먼저 고정하기 위해 약한 PDF를 사실상 결정적 근거처럼 사용했다.",
      "tags": [
        "admission",
        "beneficiary"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "evidence": {
          "exact": "문서 수정 이력 PDF",
          "neutral": "그 PDF"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-3",
      "_state": "S5"
    },
    {
      "id": "workplace-01:a:d-4:unlock:s2:0",
      "factText": "점수 보정 직전 HR 버전기록에 윤태성 계정의 비공개 메모 입력 시각이 남아 있다.",
      "tags": [
        "institution",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "institution": {
          "exact": "HR",
          "neutral": "인사 부서",
          "judgeRef": "HR"
        },
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        },
        "evidence": {
          "exact": "HR 평가 초안 버전기록",
          "neutral": "그 평가 기록"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S2"
    },
    {
      "id": "workplace-01:a:d-4:unlock:s3:0",
      "factText": "같은 평가 흐름에서 박서윤의 기여 표기는 '보고서 오너'에서 '보조 분석'으로 축소됐다.",
      "tags": [
        "evidence",
        "harm"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "role": {
          "exact": "보고서 오너",
          "neutral": "그 주도 역할"
        },
        "role_support": {
          "exact": "보조 분석",
          "neutral": "그 축소된 역할"
        },
        "evidence": {
          "exact": "HR 평가 초안 버전기록",
          "neutral": "그 평가 기록"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S3"
    },
    {
      "id": "workplace-01:a:d-4:unlock:s4:0",
      "factText": "윤태성은 승진 심사와 보고 라인 신뢰를 지키려는 이유로 리스크 문구를 미리 심었다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        },
        "time": {
          "exact": "평가 시즌",
          "dateExact": "평가 시즌",
          "period": "승진 심사 주간",
          "neutral": "그 시각"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S4"
    },
    {
      "id": "workplace-01:a:d-4:unlock:s5:0",
      "factText": "비공식 코멘트는 단순 참고가 아니라 서윤 평가의 하향 방향에 실제 영향을 주었다.",
      "tags": [
        "responsibility",
        "institution"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "institution": {
          "exact": "HR",
          "neutral": "인사 부서",
          "judgeRef": "HR"
        },
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S5"
    },
    {
      "id": "workplace-01:a:d-5:unlock:s2:0",
      "factText": "팀 내에서는 대외 제출본에도 실무 오너와 검토자를 병기하는 규칙이 이미 굳어져 있었다.",
      "tags": [
        "rule",
        "legacy_sentence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "rule": {
          "exact": "실무 기여자 병기 관행",
          "neutral": "그 기여자 표기 규칙"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S2"
    },
    {
      "id": "workplace-01:a:d-5:unlock:s3:0",
      "factText": "윤태성의 단독 명의 제출이 성과 배분 규칙을 먼저 깨뜨린 시작점이었다.",
      "tags": [
        "responsibility",
        "rule"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S3"
    },
    {
      "id": "workplace-01:a:d-5:unlock:s4:0",
      "factText": "윤태성은 박서윤의 캡처 유포를 더 크게 부각해 자신의 선행 위반을 흐리려 했다.",
      "tags": [
        "counter",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S4"
    },
    {
      "id": "workplace-01:a:d-5:unlock:s5:0",
      "factText": "성과 배분 규칙은 윤태성의 명의 삭제와 박서윤의 소문 확산으로 서로 다른 방식으로 무너졌다.",
      "tags": [
        "rule",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "rule": {
          "exact": "실무 기여자 병기 관행",
          "neutral": "그 기여자 표기 규칙"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S5"
    },
    {
      "id": "workplace-01:b:d-1:unlock:s2:0",
      "factText": "메일 원본과 회의록은 핵심 분석 프레임과 KPI 표의 실무 작성자가 박서윤이었음을 뒷받침한다.",
      "tags": [
        "evidence",
        "identity"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "evidence": {
          "exact": "프로젝트 초안 메일과 주간회의록",
          "neutral": "그 자료 묶음"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-1",
      "_state": "S2"
    },
    {
      "id": "workplace-01:b:d-1:unlock:s3:0",
      "factText": "임원용 문안 정리와 최종 승인 절차에는 윤태성의 역할도 분명히 포함돼 있었다.",
      "tags": [
        "context",
        "relationship"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-1",
      "_state": "S3"
    },
    {
      "id": "workplace-01:b:d-1:unlock:s4:0",
      "factText": "박서윤은 이름이 빠진 뒤 자신의 기여 전체가 사라지는 모멸감을 강하게 느꼈다.",
      "tags": [
        "shame",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-1",
      "_state": "S4"
    },
    {
      "id": "workplace-01:b:d-1:unlock:s5:0",
      "factText": "박서윤은 보고서를 전부 자신의 단독 성과처럼 말한 과장은 인정하지만, 이름 삭제가 부당했다는 핵심 주장은 유지된다.",
      "tags": [
        "admission",
        "counter"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-1",
      "_state": "S5"
    },
    {
      "id": "workplace-01:b:d-2:unlock:s2:0",
      "factText": "박서윤은 평가 화면 일부를 캡처해 동료 두 명에게 실제로 공유했다.",
      "tags": [
        "privacy",
        "admission"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "count": {
          "exact": "2명",
          "neutral": "그 인원",
          "rounded": "두 명"
        },
        "evidence": {
          "exact": "슬랙 캡처 묶음",
          "neutral": "그 캡처 묶음"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S2"
    },
    {
      "id": "workplace-01:b:d-2:unlock:s3:0",
      "factText": "남은 권한이 열람의 문을 열어 준 것은 사실이지만, 공유와 소문 확산은 별도의 선택이었다.",
      "tags": [
        "threshold",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "institution": {
          "exact": "HR",
          "neutral": "인사 부서",
          "judgeRef": "HR"
        },
        "rule": {
          "exact": "인사 정보 공유 금지",
          "neutral": "그 금지선"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S3"
    },
    {
      "id": "workplace-01:b:d-2:unlock:s4:0",
      "factText": "박서윤은 '마지막에 사고 친 사람'으로 낙인찍힐까 두려워 캡처를 방패처럼 쥐었다.",
      "tags": [
        "fear",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S4"
    },
    {
      "id": "workplace-01:b:d-2:unlock:s5:0",
      "factText": "불안과 억울함이 이유였더라도 박서윤의 행위는 무단 열람과 유포에 해당한다.",
      "tags": [
        "responsibility",
        "privacy"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S5"
    },
    {
      "id": "workplace-01:b:d-3:unlock:s2:0",
      "factText": "문서 서버 원본 로그상 박서윤의 마지막 정상 편집은 20시 17분에 끝난다.",
      "tags": [
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "time": {
          "exact": "20시 17분",
          "dateExact": "20시 17분",
          "period": "서윤의 마지막 정상 편집 시각",
          "neutral": "그 시각"
        },
        "evidence": {
          "exact": "문서 서버 원본 감사 로그",
          "neutral": "그 원본 로그"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S2"
    },
    {
      "id": "workplace-01:b:d-3:unlock:s3:0",
      "factText": "23시 41분 기록에는 박서윤 계정이 아니라 관리자 대리발급 토큰과 공용 PC 세션이 찍혀 있다.",
      "tags": [
        "institution",
        "evidence"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "time": {
          "exact": "23시 41분",
          "dateExact": "23시 41분",
          "period": "관리자 토큰 덮어쓰기 시각",
          "neutral": "그 시각"
        },
        "token": {
          "exact": "관리자 대리발급 토큰",
          "neutral": "그 관리자 토큰"
        },
        "session": {
          "exact": "공용 PC 세션",
          "neutral": "그 공용 PC 세션"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S3"
    },
    {
      "id": "workplace-01:b:d-3:unlock:s4:0",
      "factText": "제출된 PDF 해시는 공식 추출본과 다르고, 공식 추출 시각과 제출본 생성 시각 사이에 공백이 남아 있다.",
      "tags": [
        "evidence",
        "uncertainty"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "evidence": {
          "exact": "문서 수정 이력 PDF",
          "neutral": "그 PDF"
        },
        "token": {
          "exact": "해시 불일치",
          "neutral": "그 해시 차이"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S4"
    },
    {
      "id": "workplace-01:b:d-3:unlock:s5:0",
      "factText": "따라서 박서윤을 막판 오류의 최종 수정자로 확정한 비난은 원본 증거 기준으로 무너진다.",
      "tags": [
        "responsibility",
        "counter"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        },
        "evidence": {
          "exact": "문서 서버 원본 감사 로그",
          "neutral": "그 원본 로그"
        }
      },
      "stanceHints": [
        "admission",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S5"
    },
    {
      "id": "workplace-01:b:d-4:unlock:s2:0",
      "factText": "HR 평가 버전기록에는 윤태성의 비공개 메모 입력 직후 박서윤 기여 문구가 축소된 흐름이 남아 있다.",
      "tags": [
        "institution",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "institution": {
          "exact": "HR",
          "neutral": "인사 부서",
          "judgeRef": "HR"
        },
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-4",
      "_state": "S2"
    },
    {
      "id": "workplace-01:b:d-4:unlock:s3:0",
      "factText": "비공개 메모의 핵심은 '기여는 있으나 리스크가 크다'는 식의 방향성 있는 평가 문장이었다.",
      "tags": [
        "quote",
        "motive"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "term": {
          "exact": "기여는 있으나 리스크가 크다",
          "neutral": "그 코멘트"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-4",
      "_state": "S3"
    },
    {
      "id": "workplace-01:b:d-4:unlock:s4:0",
      "factText": "박서윤은 점수보다도 '문제 있는 사람'으로 정리될까 봐 더 크게 무너졌다.",
      "tags": [
        "fear",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "박서윤",
          "fullName": "박서윤",
          "judgeRef": "박 대리",
          "neutral": "그 실무자"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-4",
      "_state": "S4"
    },
    {
      "id": "workplace-01:b:d-4:unlock:s5:0",
      "factText": "윤태성의 비공식 코멘트는 정식 권한 바깥에서 서윤 평가 방향을 누르는 효과를 냈다.",
      "tags": [
        "responsibility",
        "institution"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        },
        "institution": {
          "exact": "HR",
          "neutral": "인사 부서",
          "judgeRef": "HR"
        }
      },
      "stanceHints": [
        "admission",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-4",
      "_state": "S5"
    },
    {
      "id": "workplace-01:b:d-5:unlock:s2:0",
      "factText": "박서윤은 일이 그냥 묻히지 않길 바라는 마음으로 먼저 몇 사람에게 캡처 이야기를 꺼냈다.",
      "tags": [
        "motive",
        "admission"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "count": {
          "exact": "2명",
          "neutral": "그 인원",
          "rounded": "두 명"
        },
        "evidence": {
          "exact": "슬랙 캡처 묶음",
          "neutral": "그 캡처 묶음"
        }
      },
      "stanceHints": [
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-5",
      "_state": "S2"
    },
    {
      "id": "workplace-01:b:d-5:unlock:s3:0",
      "factText": "정식 고충 절차를 건너뛴 선택이 소문 확산과 보복 감정을 결합시켰다.",
      "tags": [
        "harm",
        "threshold"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "channel": {
          "exact": "정식 고충 절차",
          "neutral": "그 공식 절차"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-5",
      "_state": "S3"
    },
    {
      "id": "workplace-01:b:d-5:unlock:s4:0",
      "factText": "박서윤에게는 억울함과 함께 윤태성도 곤란해지길 바라는 복수심이 분명히 있었다.",
      "tags": [
        "motive",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "윤태성",
          "fullName": "윤태성",
          "judgeRef": "윤 팀장",
          "neutral": "그 팀장"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-5",
      "_state": "S4"
    },
    {
      "id": "workplace-01:b:d-5:unlock:s5:0",
      "factText": "박서윤은 되갚으려는 마음으로 캡처와 소문을 이용했고, 그 점에서 자신도 규칙을 무너뜨렸다.",
      "tags": [
        "responsibility",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "evidence": {
          "exact": "슬랙 캡처 묶음",
          "neutral": "그 캡처 묶음"
        },
        "rule": {
          "exact": "실무 기여자 병기 관행",
          "neutral": "그 기여자 표기 규칙"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-5",
      "_state": "S5"
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-5"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "evidence_closer",
      "trap_chaser",
      "rapport_heavy"
    ]
  }
} as const;

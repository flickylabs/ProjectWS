export const workplace_03_structure_v2 = {
  "caseId": "workplace-03",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "도윤의 취중 HJ 발언",
      "truthDescription": "도윤은 2차에서 \"라인 타고 들어온 HJ, 포장이 실력보다 앞서\"라고 말했다. 대상을 특정하지 않았지만 오해를 부를 위험한 발언이었다.",
      "weight": "high",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "라인 타고 들어온 HJ",
        "회식 2차",
        "19초 클립",
        "위험한 평판 발언",
        "포장이 실력보다 앞서",
        "취중 발언"
      ],
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "도윤의 취중 HJ 발언에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-03:a:d-1:denial:0",
            "workplace-03:a:d-1:counter:0",
            "workplace-03:b:d-1:act:0",
            "workplace-03:b:d-1:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "도윤의 취중 HJ 발언 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
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
            "workplace-03:a:d-1:motive:0",
            "workplace-03:a:d-1:emotion:0",
            "workplace-03:b:d-1:counter:0",
            "workplace-03:b:d-1:harm:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "도윤의 취중 HJ 발언가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
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
            "workplace-03:a:d-1:admission:0",
            "workplace-03:a:d-1:harm:0",
            "workplace-03:b:d-1:admission:1",
            "workplace-03:b:d-1:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "희주의 단정 DM 전파",
      "truthDescription": "희주는 HJ=자신이라 단정하고 \"팀장이 내 채용 배경을 씹었다\"는 DM을 멘토방·동료 둘에게 아침 7시에 보냈다.",
      "weight": "high",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "아침 7시 42분",
        "멘토방",
        "동료 둘",
        "팀장이 내 배경을 씹었다",
        "단정 DM",
        "확인 메시지"
      ],
      "requiredEvidence": [
        "e-2"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "희주의 단정 DM 전파에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-03:a:d-2:counter:0",
            "workplace-03:a:d-2:counter:2",
            "workplace-03:b:d-2:denial:0",
            "workplace-03:b:d-2:counter:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "희주의 단정 DM 전파 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
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
            "workplace-03:a:d-2:relationship:1",
            "workplace-03:a:d-2:emotion:0",
            "workplace-03:b:d-2:motive:0",
            "workplace-03:b:d-2:emotion:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "희주의 단정 DM 전파가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
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
            "workplace-03:a:d-2:harm:0",
            "workplace-03:b:d-2:admission:0",
            "workplace-03:b:d-2:harm:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "HJ 발언의 실제 대상은 누구인가",
      "truthDescription": "HJ는 외부 연계 후보 한재균이었다. 인력배치 메모에 'HJ=Han Jae-gyun'으로 표기돼 있고, 자동 클립이 앞 8초를 잘라 양쪽 모두 오해했다.",
      "weight": "high",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "HJ 약어",
        "한재균",
        "앞 8초 누락",
        "공유노트 초안",
        "자동 하이라이트",
        "실제 대상"
      ],
      "requiredEvidence": [
        "e-1",
        "e-3",
        "e-6"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "HJ 발언의 실제 대상은 누구인가를 둘 다 같은 방향으로 오해하고 있습니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-03:a:d-3:denial:0",
            "workplace-03:a:d-3:context:1",
            "workplace-03:b:d-3:denial:0",
            "workplace-03:b:d-3:act:0",
            "workplace-03:b:d-3:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "HJ 발언의 실제 대상은 누구인가 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
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
            "workplace-03:a:d-3:counter:0",
            "workplace-03:a:d-3:emotion:0",
            "workplace-03:b:d-3:motive:0",
            "workplace-03:b:d-3:emotion:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "HJ 발언의 실제 대상은 누구인가가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
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
            "workplace-03:a:d-3:admission:0",
            "workplace-03:a:d-3:responsibility:2",
            "workplace-03:b:d-3:admission:0",
            "workplace-03:b:d-3:harm:0"
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
          "19초 자동 하이라이트가 앞 8초를 잘라 냄",
          "HJ 약어만 남고 대상 설명이 사라짐"
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
      "name": "도윤의 선제 HR 메모와 발표 배제",
      "truthDescription": "도윤은 희주 면담 전 HR에 '평판 리스크 인원'이라 적고, 다음 주 리허설 발표에서 희주를 뺐다. 사실상 선제 조치다.",
      "weight": "high",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "평판 리스크 인원",
        "HR 비공식 메모",
        "리허설 배정 변경",
        "선제 배제",
        "면담 전날 밤",
        "발표 제외"
      ],
      "requiredEvidence": [
        "e-5"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "도윤의 선제 HR 메모와 발표 배제에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-03:a:d-4:denial:0",
            "workplace-03:a:d-4:counter:0",
            "workplace-03:b:d-4:act:0",
            "workplace-03:b:d-4:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "도윤의 선제 HR 메모와 발표 배제 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
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
            "workplace-03:a:d-4:motive:0",
            "workplace-03:a:d-4:emotion:0",
            "workplace-03:b:d-4:counter:0",
            "workplace-03:b:d-4:harm:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "도윤의 선제 HR 메모와 발표 배제가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
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
            "workplace-03:a:d-4:admission:0",
            "workplace-03:a:d-4:harm:0",
            "workplace-03:b:d-4:admission:1",
            "workplace-03:b:d-4:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "정정 전 쌍방 소문전 가담",
      "truthDescription": "도윤은 팀 회의에서 \"어제 일로 팀 명예가 흔들렸다\"고 암시했고, 희주는 단정 DM을 여러 명에게 돌렸다. 쌍방 소문전이다.",
      "weight": "medium",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "팀 명예가 흔들렸다",
        "정정 전 소문전",
        "암시 발언",
        "단정 전파",
        "쌍방 소문",
        "명예 논란"
      ],
      "requiredEvidence": [
        "e-2",
        "e-5"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "정정 전 쌍방 소문전 가담에서 표면적으로 확인되는 기록과 행동입니다.",
          "lockedSummary": "겉으로 드러난 사실만 열려 있습니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-03:a:d-5:denial:0",
            "workplace-03:a:d-5:counter:0",
            "workplace-03:b:d-5:denial:0",
            "workplace-03:b:d-5:act:0",
            "workplace-03:b:d-5:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "정정 전 쌍방 소문전 가담 뒤에 숨어 있는 계산과 감정, 방어 이유를 봅니다.",
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
            "workplace-03:a:d-5:motive:0",
            "workplace-03:a:d-5:emotion:0",
            "workplace-03:b:d-5:motive:0",
            "workplace-03:b:d-5:emotion:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "정정 전 쌍방 소문전 가담가 관계 전체와 최종 책임선에 어떤 의미를 남기는지 연결합니다.",
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
            "workplace-03:a:d-5:admission:0",
            "workplace-03:a:d-5:harm:0",
            "workplace-03:b:d-5:admission:0",
            "workplace-03:b:d-5:harm:0"
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
        "supportBonus": 10,
        "grantFlag": "d-5:surface:risk_phrase_seen"
      },
      "uiLabel": "발언이 번진 경로"
    },
    {
      "id": "link:d-3:d-1:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 11,
        "grantFlag": "d-1:motive:target_misread_seen"
      },
      "uiLabel": "잘린 맥락 복원"
    },
    {
      "id": "link:d-4:d-5:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-5:core:managerial_retaliation_seen"
      },
      "uiLabel": "선제 조치 여파"
    },
    {
      "id": "link:d-2:d-5:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:motive:dm_spread_seen"
      },
      "uiLabel": "DM 확산"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "사내 공유앨범 19초 회식 영상 클립",
      "description": "회식 2차 자동 하이라이트 19초 클립. 발언 앞 8초가 잘려 대상 설명이 빠져 있다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "platform",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "19초 클립이 아닌 원본 라이브포토와 연속 영상 전체를 요청해야 한다.",
        "check_metadata": "클립 시작이 촬영보다 7.8초 늦다. 대상 설명이 빠진 채 발언 중간부터 담겼다.",
        "restore_context": "앞부분 누락으로 HJ를 누가 먼저 꺼냈는지, 내부인인지 외부 후보인지 판단 불가.",
        "verify_source": "앨범 업로드 시각과 참석자 단말 백업 시각 일치. 당일 생성본 확인.",
        "check_edits": "이어붙이기 흔적은 없으나 자동 추출이라 맥락 손실이 핵심 문제다.",
        "question_acquisition": "직원 얼굴·음성이 포함된 사적 회식 영상. 활용 범위를 제한해야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"도윤의 취중 HJ 발언\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 강도윤의 \"도윤의 취중 HJ 발언\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최희주에게: \"HJ 발언의 실제 대상은 누구인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최희주의 \"HJ 발언의 실제 대상은 누구인가\" 쟁점과 관련된다. 최희주은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "multiplier": 1.35,
            "note": "오해 프레임이 고착되기 전에 제시하면 반전 효율이 높습니다."
          },
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
      "id": "e-2",
      "name": "희주의 멘토방 DM와 동료 전달 메시지",
      "description": "희주가 아침 7시 42분~8시 사이 멘토방·동료 둘에게 보낸 \"팀장이 내 배경을 씹었다\" DM 캡처 묶음.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "partial",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "캡처가 아닌 대화방 전체 원본과 전달 순서를 확인해야 한다.",
        "check_metadata": "07:42~08:00 사이 3명에게 연속 전송. 출근 전 확산이 시작됐다.",
        "restore_context": "첫 메시지는 확인 질문이었으나 후반에 '내 얘기 맞다'로 단정이 강해진다.",
        "verify_source": "멘토방과 동료 수신자 단말의 파일명·시각이 서로 일치한다.",
        "check_edits": "본문 변조 없으나 일부 답장이 잘려 있어 반박 맥락이 누락됐다.",
        "question_acquisition": "사적 조언 대화. 정당한 문제 제기와 명예훼손 경계를 구분해 다뤄야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"정정 전 쌍방 소문전 가담\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 강도윤의 \"정정 전 쌍방 소문전 가담\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최희주에게: \"희주의 단정 DM 전파\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 최희주의 \"희주의 단정 DM 전파\" 쟁점과 관련된다. 최희주은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
      "id": "e-3",
      "name": "인력배치 공유노트 초안의 HJ 표기",
      "description": "인력배치 공유노트 초안. HJ 옆에 'Han Jae-gyun/partner shortlist' 메모가 회식 전 시각에 입력돼 있다.",
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
        "request_original": "현재본이 아닌 회식 당일 밤 버전 이력과 약어 설명 칸을 함께 확인해야 한다.",
        "check_metadata": "HJ 옆 메모 'Han Jae-gyun/partner shortlist' 입력 시각이 회식 전으로 찍혀 있다.",
        "restore_context": "같은 페이지에 희주는 한글 실명으로 별도 기재. HJ와 분리돼 있다.",
        "verify_source": "공유드라이브 버전 이력과 본부 차장 열람 기록이 일치한다.",
        "check_edits": "버전 로그 보존 문서. 사후 편집 흔적 없이 원본성 높음.",
        "question_acquisition": "업무용 공유 문서. 분쟁 해결 범위 내 열람 적법."
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
            "state": "S2",
            "multiplier": 1.35,
            "note": "오해 프레임이 고착되기 전에 제시하면 반전 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "법인카드 정산 메모와 식당 CCTV 좌석 정보",
      "description": "법인카드 정산 메모와 식당 CCTV. 희주는 다른 테이블에 앉아 발언을 실시간으로 듣지 못한 것이 확인된다.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "클립 시각에 해당하는 CCTV 구간과 정산 메모 원본을 함께 확인해야 한다.",
        "check_metadata": "클립 시작 직전 윤세아가 '한재균 라인 이슈'를 꺼내는 장면이 CCTV에 찍혀 있다.",
        "restore_context": "희주는 다른 테이블에 앉아 발언을 직접 못 듣고 나중에 클립으로 접했다.",
        "verify_source": "총무팀 CCTV와 법인카드 정산 시각이 같은 타임라인을 형성한다.",
        "check_edits": "기관 보존본. 편집·절삭 흔적 없음.",
        "question_acquisition": "CCTV·결제 정보 포함. 필요 구간만 제한적으로 확인해야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"도윤의 취중 HJ 발언\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 강도윤의 \"도윤의 취중 HJ 발언\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최희주에게: \"HJ 발언의 실제 대상은 누구인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 최희주의 \"HJ 발언의 실제 대상은 누구인가\" 쟁점과 관련된다. 최희주은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "note": "핵심 사실선을 고정하는 구간입니다."
          },
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
      "id": "e-5",
      "name": "HR 상담 접수와 발표 리허설 배정 변경 기록",
      "description": "도윤의 HR 비공식 '평판 리스크' 메모와, 희주가 리허설 발표에서 빠진 배정 변경 기록.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "HR 상담 로그 원본과 발표 배정표의 변경 전·후 버전을 함께 확인해야 한다.",
        "check_metadata": "도윤의 '평판 리스크' 메모가 희주 면담 전날 밤에, 배정 변경은 다음 날 오전에 처리됐다.",
        "restore_context": "공식 징계가 아닌 발표 배제가 사실상 선제 불이익처럼 작동했다.",
        "verify_source": "HR 관리자 조회본과 팀 캘린더 배정 이력이 일치한다.",
        "check_edits": "초기 메모→수정본 모두 보존. 편집 경로 투명.",
        "question_acquisition": "인사자료. 분쟁 해결 목적 외 공개는 제한돼야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"도윤의 선제 HR 메모와 발표 배제\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 강도윤의 \"도윤의 선제 HR 메모와 발표 배제\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최희주에게: \"정정 전 쌍방 소문전 가담\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 최희주의 \"정정 전 쌍방 소문전 가담\" 쟁점과 관련된다. 최희주은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-4",
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
      "name": "공유앨범 원본 메타데이터와 자동 하이라이트 생성 로그",
      "description": "자동 클립 생성 로그. 웃음 소리 급등 시점에서 추출이 시작돼 앞 7.8초가 잘린 과정이 기록돼 있다.",
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
        "e-1"
      ],
      "investigationResults": {
        "request_original": "관리자 권한으로 원본 파일 패키지와 하이라이트 생성 로그를 추출해야 한다.",
        "check_metadata": "웃음 급등 시점에서 자동 클립 시작. 대상 설명이 담긴 앞 8초가 잘렸다.",
        "restore_context": "잘린 앞부분에 '외부 후보 HJ'라는 표현이 있어 희주 직접 지칭으로 보기 어렵다.",
        "verify_source": "플랫폼 로그와 관리 콘솔 기록이 같은 자동 추출 규칙을 보여준다.",
        "check_edits": "수동 편집이 아닌 시스템 자동 추출. 조작이 아니라 오해가 핵심 문제다.",
        "question_acquisition": "단말 식별자 포함. 필요 메타만 제한 공개해야 한다."
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
          "workplace-03:a:d-1:act:0",
          "workplace-03:b:d-1:identity:1"
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
          "workplace-03:a:d-1:act:0",
          "workplace-03:b:d-1:identity:1"
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
          "workplace-03:a:d-2:relationship:1",
          "workplace-03:b:d-2:motive:0"
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
          "workplace-03:a:d-3:context:1",
          "workplace-03:b:d-3:act:0",
          "workplace-03:b:d-3:motive:0"
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
          "workplace-03:a:d-4:act:0",
          "workplace-03:b:d-4:context:1"
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
          "workplace-03:a:d-5:motive:0",
          "workplace-03:b:d-5:motive:0"
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
      "id": "workplace-03:a:d-1:unlock:s2:0",
      "factText": "도윤은 19초 클립 구간에서 실제로 '라인 타고 들어온 HJ'라는 표현을 사용했다.",
      "tags": [
        "quote",
        "act"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "phrase": {
          "exact": "라인 타고 들어온 HJ",
          "neutral": "그 표현"
        },
        "moment": {
          "exact": "회식 2차 19초 클립 구간",
          "neutral": "그 구간",
          "period": "그날 늦은 술자리"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S2"
    },
    {
      "id": "workplace-03:a:d-1:unlock:s3:0",
      "factText": "도윤은 발언 직전 대화가 외부 후보 한재균 이야기였다는 점을 알면서도, 내부 인원을 떠올리게 하는 위험성을 바로 정정하지 않았다.",
      "tags": [
        "context",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "한재균",
          "neutral": "다른 HJ",
          "fullName": "한재균",
          "judgeRef": "외부 후보"
        },
        "phrase": {
          "exact": "내부 인원을 떠올리게 하는 표현",
          "neutral": "그 표현"
        },
        "moment": {
          "exact": "클립 시작 직전 8초",
          "neutral": "그 앞부분",
          "period": "발언 직전"
        }
      },
      "stanceHints": [
        "blame",
        "evidence_present"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S3"
    },
    {
      "id": "workplace-03:a:d-1:unlock:s4:0",
      "factText": "도윤은 자신의 말이 희주를 직접 지목한 것은 아니어도 관리자 평판 발언으로 들릴 만큼 위험했다는 점을 감정적으로 인식한다.",
      "tags": [
        "emotion",
        "harm"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "exact": "최희주",
          "neutral": "그 팀원",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
        },
        "risk": {
          "exact": "관리자 평판 발언",
          "neutral": "그 위험한 말"
        },
        "moment": {
          "exact": "회식 다음 날 해명 국면",
          "neutral": "그 뒤 상황",
          "period": "다음 날"
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
      "id": "workplace-03:a:d-1:unlock:s5:0",
      "factText": "도윤은 직접 겨냥 의도는 아니었더라도, 특정인을 연상시키는 회식 발언으로 상처와 소문을 만든 책임을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "최희주",
          "neutral": "상대방",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
        },
        "phrase": {
          "exact": "특정인을 연상시키는 회식 발언",
          "neutral": "그 발언"
        },
        "harm": {
          "exact": "상처와 소문",
          "neutral": "그 피해"
        }
      },
      "stanceHints": [
        "confession",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-1",
      "_state": "S5"
    },
    {
      "id": "workplace-03:a:d-4:unlock:s2:0",
      "factText": "도윤은 희주의 면담 전날 밤 HR 화면에 '평판 리스크가 큰 인원'이라는 비공식 메모를 먼저 남겼다.",
      "tags": [
        "evidence",
        "act"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "institution": {
          "exact": "HR 비공식 메모",
          "neutral": "그 메모"
        },
        "phrase": {
          "exact": "평판 리스크가 큰 인원",
          "neutral": "그 표현"
        },
        "moment": {
          "exact": "희주 면담 전날 밤",
          "neutral": "그 전날",
          "period": "면담 전"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S2"
    },
    {
      "id": "workplace-03:a:d-4:unlock:s3:0",
      "factText": "도윤의 메모는 공식 징계는 아니었지만, 다음 날 발표 리허설 배정 변경과 붙어 사실상 선제 불이익처럼 작동했다.",
      "tags": [
        "rule",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "institution": {
          "exact": "발표 리허설 배정 변경",
          "neutral": "그 배정 변경"
        },
        "moment": {
          "exact": "다음 날 오전",
          "neutral": "그 다음 시점",
          "period": "다음 날"
        },
        "effect": {
          "exact": "사실상 선제 불이익",
          "neutral": "그 불이익"
        }
      },
      "stanceHints": [
        "blame",
        "evidence_present"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S3"
    },
    {
      "id": "workplace-03:a:d-4:unlock:s4:0",
      "factText": "도윤은 관리자 평판이 무너질까 두려워 사실확인보다 먼저 통제 조치를 택했다는 심리 동기를 드러낸다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "fear": {
          "exact": "관리자 평판 상실",
          "neutral": "그 두려움"
        },
        "institution": {
          "exact": "통제 조치",
          "neutral": "그 선제 조치"
        },
        "person": {
          "exact": "최희주",
          "neutral": "그 팀원",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
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
      "id": "workplace-03:a:d-4:unlock:s5:0",
      "factText": "도윤은 희주의 설명을 듣기 전에 HR 메모와 발표 배제를 진행해 평판 불이익을 키운 책임을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "institution": {
          "exact": "HR 메모와 발표 배제",
          "neutral": "그 선제 조치"
        },
        "person": {
          "exact": "최희주",
          "neutral": "상대방",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
        },
        "harm": {
          "exact": "평판 불이익",
          "neutral": "그 피해"
        }
      },
      "stanceHints": [
        "confession",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-4",
      "_state": "S5"
    },
    {
      "id": "workplace-03:a:d-5:unlock:s2:0",
      "factText": "도윤은 정식 정정 전 팀 회의에서 '어제 일로 팀 명예가 흔들렸다'는 표현으로 특정인을 떠올리게 했다.",
      "tags": [
        "quote",
        "act"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "phrase": {
          "exact": "어제 일로 팀 명예가 흔들렸다",
          "neutral": "그 팀 명예 발언"
        },
        "moment": {
          "exact": "정식 정정 전 팀 회의",
          "neutral": "그 회의",
          "period": "정정 전"
        },
        "person": {
          "exact": "최희주",
          "neutral": "특정 팀원",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S2"
    },
    {
      "id": "workplace-03:a:d-5:unlock:s3:0",
      "factText": "도윤의 암시성 발언은 이름을 직접 말하지 않았어도 희주를 의심 대상으로 고정하는 데 기여했다.",
      "tags": [
        "context",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "최희주",
          "neutral": "상대방",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
        },
        "phrase": {
          "exact": "암시성 발언",
          "neutral": "그 말"
        },
        "harm": {
          "exact": "의심 대상 고정",
          "neutral": "그 효과"
        }
      },
      "stanceHints": [
        "blame",
        "evidence_present"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S3"
    },
    {
      "id": "workplace-03:a:d-5:unlock:s4:0",
      "factText": "도윤은 자신이 먼저 상처받았다는 프레임으로 소문 책임을 희석하려 했다는 정서적 방어를 드러낸다.",
      "tags": [
        "emotion",
        "self_justification"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "emotion": {
          "exact": "제가 더 상처받았습니다",
          "neutral": "그 피해자 프레임"
        },
        "harm": {
          "exact": "소문 책임 희석",
          "neutral": "그 방어"
        },
        "moment": {
          "exact": "정정 전 대응",
          "neutral": "그 대응",
          "period": "정정 전"
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
      "id": "workplace-03:a:d-5:unlock:s5:0",
      "factText": "도윤은 공식 확인 전에 암시성 발언으로 소문전에 가담했고, 팀장으로서 그 책임을 절반 이상 져야 한다고 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "institution": {
          "exact": "팀장 위치",
          "neutral": "그 자리"
        },
        "moment": {
          "exact": "공식 확인 전",
          "neutral": "그 전 단계",
          "period": "정정 전"
        },
        "harm": {
          "exact": "소문전 가담",
          "neutral": "그 참여"
        }
      },
      "stanceHints": [
        "confession",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "a",
      "_dispute": "d-5",
      "_state": "S5"
    },
    {
      "id": "workplace-03:b:d-2:unlock:s2:0",
      "factText": "희주는 회식 다음 날 오전 7시 42분부터 18분 사이 멘토방과 동료 둘에게 단정 메시지를 연속 전송했다.",
      "tags": [
        "timeline",
        "act"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "moment": {
          "exact": "오전 7시 42분부터 18분 사이",
          "neutral": "그 시간대",
          "dateExact": "회식 다음 날 오전"
        },
        "channel": {
          "exact": "멘토방과 동료 둘",
          "neutral": "몇몇 수신자"
        },
        "phrase": {
          "exact": "팀장이 내 채용 배경을 씹었다",
          "neutral": "그 단정 문장"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S2"
    },
    {
      "id": "workplace-03:b:d-2:unlock:s3:0",
      "factText": "희주의 메시지는 처음엔 확인성 질문처럼 시작했지만 뒤로 갈수록 '내 얘기 맞다'는 단정으로 강도가 올라갔다.",
      "tags": [
        "context",
        "threshold"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "phrase": {
          "exact": "내 얘기 맞다",
          "neutral": "그 단정 표현"
        },
        "channel": {
          "exact": "연속 DM",
          "neutral": "그 메시지 흐름"
        },
        "moment": {
          "exact": "같은 오전 대화 후반",
          "neutral": "그 후반부",
          "period": "전송 후반"
        }
      },
      "stanceHints": [
        "blame",
        "evidence_present"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S3"
    },
    {
      "id": "workplace-03:b:d-2:unlock:s4:0",
      "factText": "희주는 억울함과 창피함이 커질수록 '확인'과 '전파'의 경계를 스스로 좁혀 해석했다.",
      "tags": [
        "shame",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "emotion": {
          "exact": "억울함과 창피함",
          "neutral": "그 감정"
        },
        "channel": {
          "exact": "확인과 전파의 경계",
          "neutral": "그 선"
        },
        "person": {
          "exact": "강도윤",
          "neutral": "상대방",
          "fullName": "강도윤",
          "judgeRef": "강도윤 씨"
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
      "id": "workplace-03:b:d-2:unlock:s5:0",
      "factText": "희주는 사적 조언을 구한다는 말로 범위를 좁혔지만, 실제로는 팀장 비방 단정 메시지를 퍼뜨린 책임을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "channel": {
          "exact": "사적 조언 명목의 전송",
          "neutral": "그 명목"
        },
        "phrase": {
          "exact": "팀장 비방 단정 메시지",
          "neutral": "그 메시지"
        },
        "person": {
          "exact": "강도윤",
          "neutral": "상대방",
          "fullName": "강도윤",
          "judgeRef": "강도윤 씨"
        }
      },
      "stanceHints": [
        "confession",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-2",
      "_state": "S5"
    },
    {
      "id": "workplace-03:b:d-3:unlock:s2:0",
      "factText": "희주는 19초 자동 하이라이트와 최근 전배 맥락만으로 HJ가 자신을 가리킨다고 확신했다.",
      "tags": [
        "identity",
        "context"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "phrase": {
          "exact": "19초 자동 하이라이트",
          "neutral": "그 짧은 클립"
        },
        "person": {
          "exact": "최희주",
          "neutral": "자기 자신",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
        },
        "moment": {
          "exact": "회식 다음 날 아침",
          "neutral": "그 직후",
          "period": "다음 날"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S2"
    },
    {
      "id": "workplace-03:b:d-3:unlock:s3:0",
      "factText": "공유노트 초안에는 HJ가 외부 연계 후보 한재균을 뜻한다는 메모가 이미 회식 전부터 남아 있었다.",
      "tags": [
        "evidence",
        "identity"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "person": {
          "exact": "한재균",
          "neutral": "다른 HJ",
          "fullName": "한재균",
          "judgeRef": "외부 후보"
        },
        "institution": {
          "exact": "인력배치 공유노트 초안",
          "neutral": "그 노트"
        },
        "phrase": {
          "exact": "Han Jae-gyun/partner shortlist",
          "neutral": "그 약어 메모"
        }
      },
      "stanceHints": [
        "blame",
        "evidence_present"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S3"
    },
    {
      "id": "workplace-03:b:d-3:unlock:s4:0",
      "factText": "희주는 문제 발언이 나온 순간 같은 테이블에 없어서 실시간 청취가 아니라 잘린 영상으로만 상황을 이해했다.",
      "tags": [
        "timeline",
        "uncertainty"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "moment": {
          "exact": "다른 테이블",
          "neutral": "그 자리 밖",
          "period": "발언 당시"
        },
        "phrase": {
          "exact": "실시간 청취 부재",
          "neutral": "직접 듣지 못한 상태"
        },
        "person": {
          "exact": "최희주",
          "neutral": "당사자",
          "fullName": "최희주",
          "judgeRef": "희주 씨"
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
      "id": "workplace-03:b:d-3:unlock:s5:0",
      "factText": "희주는 HJ가 자신이 아니라 한재균이었다는 원본 맥락을 받아들이고, 직접 겨냥 명예훼손이라고 단정한 책임을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person": {
          "exact": "한재균",
          "neutral": "다른 HJ",
          "fullName": "한재균",
          "judgeRef": "외부 후보"
        },
        "phrase": {
          "exact": "직접 겨냥 명예훼손 단정",
          "neutral": "그 단정"
        },
        "harm": {
          "exact": "오해 확산",
          "neutral": "그 파장"
        }
      },
      "stanceHints": [
        "confession",
        "emotional"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-3",
      "_state": "S5"
    },
    {
      "id": "workplace-03:b:d-5:unlock:s2:0",
      "factText": "희주는 정식 정정 전에 멘토방과 동료 둘에게 자신의 해석을 공유하며 비공식 평판전에 들어갔다.",
      "tags": [
        "act",
        "relationship"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "channel": {
          "exact": "멘토방과 동료 둘",
          "neutral": "주변 사람들"
        },
        "moment": {
          "exact": "정식 정정 전",
          "neutral": "그 전 단계",
          "period": "정정 전"
        },
        "phrase": {
          "exact": "자신의 해석 공유",
          "neutral": "그 메시지"
        }
      },
      "stanceHints": [
        "partial",
        "evidence_hit"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-5",
      "_state": "S2"
    },
    {
      "id": "workplace-03:b:d-5:unlock:s3:0",
      "factText": "희주의 전달은 확인 요청을 넘어 '팀장이 나를 공개 비하했다'는 서사를 주변에 고정시키는 효과를 냈다.",
      "tags": [
        "harm",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "phrase": {
          "exact": "팀장이 나를 공개 비하했다",
          "neutral": "그 서사"
        },
        "channel": {
          "exact": "주변 전파 효과",
          "neutral": "그 확산"
        },
        "person": {
          "exact": "강도윤",
          "neutral": "상대방",
          "fullName": "강도윤",
          "judgeRef": "강도윤 씨"
        }
      },
      "stanceHints": [
        "blame",
        "evidence_present"
      ],
      "_source": "unlock",
      "_party": "b",
      "_dispute": "d-5",
      "_state": "S3"
    },
    {
      "id": "workplace-03:b:d-5:unlock:s4:0",
      "factText": "희주는 창피함과 입지 상실 공포 때문에 정식 창구보다 먼저 가까운 사람들에게 의지했다.",
      "tags": [
        "fear",
        "motive"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "emotion": {
          "exact": "창피함과 입지 상실 공포",
          "neutral": "그 불안"
        },
        "channel": {
          "exact": "가까운 사람들",
          "neutral": "주변 인맥"
        },
        "institution": {
          "exact": "정식 창구보다 먼저",
          "neutral": "그 순서"
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
      "id": "workplace-03:b:d-5:unlock:s5:0",
      "factText": "희주는 공식 확인 전에 단정 메시지로 소문전에 가담했고, 억울함이 있어도 그 선택은 자신의 잘못이라고 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "phrase": {
          "exact": "단정 메시지",
          "neutral": "그 메시지"
        },
        "moment": {
          "exact": "공식 확인 전",
          "neutral": "그 전 단계",
          "period": "정정 전"
        },
        "harm": {
          "exact": "소문전 가담",
          "neutral": "그 참여"
        }
      },
      "stanceHints": [
        "confession",
        "emotional"
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
      "rapport_heavy",
      "pressure_heavy",
      "evidence_closer",
      "trap_chaser"
    ]
  }
} as const;

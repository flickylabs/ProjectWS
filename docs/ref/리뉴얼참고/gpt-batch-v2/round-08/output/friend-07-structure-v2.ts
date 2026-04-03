export const friend_07_structure_v2 = {
  "caseId": "friend-07",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "성호의 비밀 연애 은닉과 진아에게 알리바이 요청",
      "truth": true,
      "truthDescription": "성호는 부회장과의 비밀 연애를 숨긴 채 진아에게 자신이 소품 정리 중이라고 말해 달라고 요청하며 사실상 알리바이를 부탁했다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 25,
        "b": 75
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "비밀경계",
      "legitimacyIssue": false,
      "judgmentStatement": "성호는 진아에게 알리바이를 요청했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "비밀 연애",
        "부회장",
        "소품 정리",
        "같이 있었다고",
        "알리바이",
        "전날 밤"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "성호의 비밀 연애 은닉과 진아에게 알리바이 요청에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend07:a:d-1:S0:act:0",
            "friend07:b:d-1:S0:deny:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "성호의 비밀 연애 은닉과 진아에게 알리바이 요청 뒤에 깔린 선택 이유",
          "lockedSummary": "말의 뒤쪽 계산과 감정은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-1:S2:quote:0",
            "friend07:b:d-1:S2:admission:0",
            "friend07:b:d-1:S3:evidence:0",
            "friend07:b:d-1:S3:fear:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "성호의 비밀 연애 은닉과 진아에게 알리바이 요청를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:alibi_line_named"
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-1:S4:emotion:0",
            "friend07:b:d-1:S4:emotion:0",
            "friend07:b:d-1:S5:confession:0",
            "friend07:b:d-1:S5:legacy:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "진아의 메시지 편집과 다중 채널 확산",
      "truth": true,
      "truthDescription": "진아는 성호의 여러 시점 메시지를 이어 붙여 의도가 더 악하게 보이도록 편집했고, 이를 공통 친구와 동문 단톡, 운영진에게 연달아 보냈다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 78,
        "b": 22
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "친구관계재설계",
      "legitimacyIssue": true,
      "judgmentStatement": "진아는 성호의 메시지를 편집했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "편집 캡처",
        "임원 연애는 숨겨야 이득",
        "양소라",
        "동문 단톡",
        "친한친구 스토리",
        "여러 날짜"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "진아의 메시지 편집과 다중 채널 확산에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend07:a:d-2:S0:act:0",
            "friend07:b:d-2:S0:edit:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "진아의 메시지 편집과 다중 채널 확산 뒤에 깔린 선택 이유",
          "lockedSummary": "말의 뒤쪽 계산과 감정은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-2:S2:admission:0",
            "friend07:b:d-2:S2:compare:0",
            "friend07:a:d-2:S3:channel:0",
            "friend07:a:d-2:S3:blame:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "진아의 메시지 편집과 다중 채널 확산를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              },
              {
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:splice_named"
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-2:S4:emotion:0",
            "friend07:b:d-2:S4:stigma:0",
            "friend07:a:d-2:S5:confession:0",
            "friend07:a:d-2:S5:rule:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "성호는 연애 관계를 이용해 리더 선발을 따냈는가",
      "truth": false,
      "truthDescription": "성호의 비밀 연애와 은닉은 문제였지만, 실제 리더 선발에서는 부회장이 채점에서 제외돼 있었고 성호의 선발 자체가 연애 특혜로 확정되지는 않는다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 42,
        "b": 58
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "운영절차복구",
      "legitimacyIssue": true,
      "judgmentStatement": "성호는 연애 특혜로 선발되지 않았다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "리더 선발",
        "특혜 의혹",
        "채점 제외",
        "이해충돌 로그",
        "점수표",
        "연애 이득"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "성호는 연애 관계를 이용해 리더 선발을 따냈는가에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend07:a:d-3:S0:suspicion:0",
            "friend07:b:d-3:S0:deny:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "성호는 연애 관계를 이용해 리더 선발을 따냈는가 뒤에 깔린 선택 이유",
          "lockedSummary": "말의 뒤쪽 계산과 감정은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              },
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-3:S2:admission:0",
            "friend07:b:d-3:S2:admission:0",
            "friend07:a:d-3:S3:evidence:0",
            "friend07:a:d-3:S3:blame:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "성호는 연애 관계를 이용해 리더 선발을 따냈는가를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:favoritism_doubt_named"
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-3:S4:emotion:0",
            "friend07:b:d-3:S4:fear:0",
            "friend07:a:d-3:S5:confession:0",
            "friend07:a:d-3:S5:separation:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "knows"
        },
        "trapSignals": [
          "편집 캡처 한 장으로 특혜를 확정하는 말",
          "선발 직전 타이밍만으로 점수 개입을 단정하는 주장",
          "채점 제외 로그를 보기 전 인상 확신"
        ],
        "truthExitEvidenceIds": [
          "e-4"
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
      "id": "d-4",
      "name": "작년 비밀 유지 합의의 쌍방 파기",
      "truth": true,
      "truthDescription": "둘은 운영 충돌이 있는 비밀 연애는 지정 운영진 한 명에게만 함께 알리기로 했지만, 성호는 먼저 관계를 숨긴 채 알리바이를 요청했고 진아는 지정 경로 대신 편집 캡처를 여러 채널로 확산시켰다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-2",
        "e-3",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 52,
        "b": 48
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "운영절차복구",
      "legitimacyIssue": false,
      "judgmentStatement": "진아는 비밀 연애 내용을 확산했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "제한 공개 합의",
        "지정 운영진 1명",
        "노션",
        "스크린샷 금지",
        "함께 알리기",
        "합의 파기"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "작년 비밀 유지 합의의 쌍방 파기에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend07:a:d-4:S0:rule:0",
            "friend07:b:d-4:S0:minimize:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "작년 비밀 유지 합의의 쌍방 파기 뒤에 깔린 선택 이유",
          "lockedSummary": "말의 뒤쪽 계산과 감정은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-4:S2:admission:0",
            "friend07:b:d-4:S2:admission:0",
            "friend07:a:d-4:S3:channel:0",
            "friend07:a:d-4:S3:fear:1",
            "friend07:b:d-4:S3:cover:0",
            "friend07:b:d-4:S3:shared:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "작년 비밀 유지 합의의 쌍방 파기를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:rule_memory_named"
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-4:S4:shame:0",
            "friend07:b:d-4:S4:emotion:0",
            "friend07:a:d-4:S5:confession:0",
            "friend07:a:d-4:S5:shared:1",
            "friend07:b:d-4:S5:confession:0",
            "friend07:b:d-4:S5:sequence:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "성호의 '이미 운영진에게 제한 고지했다' 주장",
      "truth": false,
      "truthDescription": "성호는 선발 전에 이미 운영진에게 관계를 알렸다고 말했지만, 실제 이해충돌 신고 기록과 운영진 DM 시각은 진아의 캡처 확산 뒤에야 남아 있다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 30,
        "b": 70
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "운영절차복구",
      "legitimacyIssue": false,
      "judgmentStatement": "성호는 운영진에 고지하지 않았다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "이미 알렸다",
        "사전 고지",
        "운영진 DM",
        "신고 시각",
        "사후 수습",
        "기록 없음"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "성호의 '이미 운영진에게 제한 고지했다' 주장에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend07:a:d-5:S0:claim:0",
            "friend07:b:d-5:S0:claim:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "성호의 '이미 운영진에게 제한 고지했다' 주장 뒤에 깔린 선택 이유",
          "lockedSummary": "말의 뒤쪽 계산과 감정은 아직 잠겨 있습니다.",
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
            "friend07:a:d-5:S2:evidence:0",
            "friend07:b:d-5:S2:admission:0",
            "friend07:b:d-5:S3:timestamp:0",
            "friend07:b:d-5:S3:retro:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "성호의 '이미 운영진에게 제한 고지했다' 주장를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:surface:pre_notice_named",
              "d-5:motive:record_gap_named"
            ]
          },
          "revealAtomIds": [
            "friend07:a:d-5:S4:emotion:0",
            "friend07:b:d-5:S4:emotion:0",
            "friend07:b:d-5:S5:confession:0",
            "friend07:b:d-5:S5:motive:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "suspects",
          "b": "weaponizes"
        },
        "trapSignals": [
          "'이미 알렸다'는 말뿐이고 사전 기록이 비는 상태",
          "사후 신고를 사전 고지처럼 포장하는 타임스탬프",
          "제한 공개 합의의 지정 경로를 흐리는 표현"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-4"
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
        "supportBonus": 12,
        "grantFlag": "d-4:surface:rule_memory_named"
      },
      "uiLabel": "알리바이 요청이 규칙 위반 시작"
    },
    {
      "id": "link:d-2:d-4:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-4",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-4:motive:route_skip_named"
      },
      "uiLabel": "편집 확산의 역위반"
    },
    {
      "id": "link:d-5:d-4:weakens_counter",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-4",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "counterPenalty": 10,
        "grantFlag": "d-4:core:shared_breach_open"
      },
      "uiLabel": "사전 고지 주장 붕괴"
    },
    {
      "id": "link:d-3:d-2:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-2",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "counterPenalty": 9,
        "grantFlag": "d-2:motive:spread_choice_named"
      },
      "uiLabel": "특혜 서사 약화"
    },
    {
      "id": "link:d-1:d-5:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:surface:pre_notice_named"
      },
      "uiLabel": "은닉과 사전고지 충돌"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "진아가 양소라와 운영진에게 보낸 편집 캡처",
      "description": "성호가 '임원 연애는 숨겨야 이득'이라고 말한 것처럼 보이는 한 장짜리 메신저 캡처와 전달본이다.",
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
      "investigationResults": {
        "request_original": "처음에는 진아가 저장한 이미지 한 장과 양소라에게 보낸 전달 화면만 제출됐다.",
        "check_metadata": "파일 생성 시각이 성호의 해당 발언 시각보다 뒤이고, 저장 경로에 편집앱 임시 폴더 흔적이 남아 있다.",
        "restore_context": "프로필, 시간표시, 앞뒤 문맥이 잘려 있어 별개의 대화 조각이 한 흐름처럼 읽힌다.",
        "verify_source": "진아 휴대폰 원본 파일과 양소라 수신본의 해시가 일치한다.",
        "check_edits": "말풍선 간 간격과 글자 안티앨리어싱 값이 일정하지 않아 합성 편집 흔적이 확인된다.",
        "question_acquisition": "사적인 비밀 연애 대화를 제3자에게 전달한 자료라 사생활 침해 우려가 크다."
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
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "편집 캡처가 여러 날짜를 한 장처럼 만들었는지 가르는 창"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "진아-성호 원본 메신저 export와 일정 맞바꿈 대화",
      "description": "성호가 관계를 당분간 숨기자고 말하고, 진아에게 소품 정리 중이라고 대신 말해 달라고 부탁한 전체 대화 원본이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "양측 메신저 export와 원본 대화창 캡처가 함께 제출돼 누락 구간을 대조할 수 있었다.",
        "check_metadata": "알리바이 요청 메시지는 리더 선발 사전 인터뷰 전날 밤, 캡처에 쓰인 문장 조각들은 서로 다른 날짜에 전송된 것으로 나타난다.",
        "restore_context": "성호는 직접 '네가 연습실에 나랑 있었다고만 해줘'라고 적었고, 연애를 운영진 한 명에게만 알려야 하는지에 대한 언급도 있었다.",
        "verify_source": "플랫폼 export ID와 양측 단말의 전송 순서가 일치한다.",
        "check_edits": "다운로드 원본과 대조해 문장 내용의 사후 수정 흔적은 없다.",
        "question_acquisition": "당사자들이 각자 제출한 원본 대화라 절차상 문제는 낮지만 연애 상대의 이름은 최소 공개가 바람직하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "서진아에게: \"작년 비밀 유지 합의의 쌍방 파기\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 서진아의 \"작년 비밀 유지 합의의 쌍방 파기\" 쟁점과 관련된다. 서진아은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박성호에게: \"성호의 비밀 연애 은닉과 진아에게 알리바이 요청\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 박성호의 \"성호의 비밀 연애 은닉과 진아에게 알리바이 요청\" 쟁점과 관련된다. 박성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "S4"
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
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "알리바이 요청과 제한 공개 합의 언급이 실제로 있었는지 못 박는 창"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "작년 소문 사태 뒤 작성한 제한 공개 합의 노션",
      "description": "운영 충돌이 있는 비밀 연애는 지정 운영진 한 명에게만 함께 알리고 스크린샷 확산은 금지한다는 문구가 담긴 노션 페이지와 확인 이모지 기록이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "노션 원본 페이지와 버전 기록, 확인 반응 로그가 함께 제출됐다.",
        "check_metadata": "문서는 작년 겨울 소문 사태 직후 작성됐고, 성호와 진아 모두 같은 밤 확인 이모지를 남겼다.",
        "restore_context": "예외 조항은 지정 운영진 1명에 대한 공동 고지뿐이며, 일반 단톡이나 동문방 공유는 금지로 적혀 있다.",
        "verify_source": "이도현 운영진 계정에서 내려받은 페이지와 진아가 보관한 링크 내용이 일치한다.",
        "check_edits": "핵심 규칙 문장은 작성 이후 수정된 이력이 없다.",
        "question_acquisition": "공동 운영 문서라 적법하지만 다른 동호회 내규 부분은 최소 범위만 인용하는 것이 바람직하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "서진아에게: \"작년 비밀 유지 합의의 쌍방 파기\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 서진아의 \"작년 비밀 유지 합의의 쌍방 파기\" 쟁점과 관련된다. 서진아은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박성호에게: \"작년 비밀 유지 합의의 쌍방 파기\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 박성호의 \"작년 비밀 유지 합의의 쌍방 파기\" 쟁점과 관련된다. 박성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "finish",
        "bestAtStates": [
          "S2",
          "S4"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "legality",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "legality",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.3,
            "note": "지정 운영진 1명 제한 공개 규칙을 기준으로 대조하는 창"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "연합공연제 리더 선발 점수표와 이해충돌 제외 로그",
      "description": "성호의 리더 선발 점수, 부회장의 채점 제외 여부, 실제 이해충돌 신고 접수 시각을 보여주는 원본 기록이다.",
      "type": "platform_log",
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
        "request_original": "운영간사의 선발 시트 export와 이해충돌 체크 로그 원본이 제출됐다.",
        "check_metadata": "부회장은 성호의 평가 항목에서 자동 제외되어 있었고, 성호 관련 신고 접수는 진아의 캡처 전송 이후에야 생성됐다.",
        "restore_context": "성호의 선발은 연애 특혜로 확정되지 않지만, 신고가 사전에 이뤄지지 않았다는 점은 분명하다.",
        "verify_source": "정선우 운영간사의 로컬 저장본과 플랫폼 관리자 로그의 값이 서로 일치한다.",
        "check_edits": "서버 보존 기록이라 후편집 흔적이 없다.",
        "question_acquisition": "동호회 선발 자료라 적법하지만 다른 지원자 점수는 비식별화해 다루어야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "서진아에게: \"성호는 연애 관계를 이용해 리더 선발을 따냈는가\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 서진아의 \"성호는 연애 관계를 이용해 리더 선발을 따냈는가\" 쟁점과 관련된다. 서진아은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박성호에게: \"성호의 '이미 운영진에게 제한 고지했다' 주장\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 박성호의 \"성호의 '이미 운영진에게 제한 고지했다' 주장\" 쟁점과 관련된다. 박성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "채점 제외 로그로 특혜 의혹을 식히는 창"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "진아의 동문 단톡 전달 기록과 친한친구 스토리 보관본",
      "description": "진아가 편집 캡처를 동문 단톡과 공통 친구들에게 보내고, 같은 날 암시성 스토리를 올린 기록이다.",
      "type": "sns",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
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
        "request_original": "동문 단톡 원본 대화와 인스타 스토리 보관함 화면이 함께 제출됐다.",
        "check_metadata": "양소라에게 1차 전달된 뒤 17분 안에 동문 단톡 공유와 스토리 게시가 연속으로 이뤄졌다.",
        "restore_context": "진아는 처음엔 '확인 필요'라고 적었지만 곧바로 성호의 의도를 단정하는 문장을 덧붙였다.",
        "verify_source": "수신자 대화창과 진아 단말의 메시지 순서가 서로 맞아떨어진다.",
        "check_edits": "앱 내 원본과 대화창이라 후편집 흔적은 없지만 전달 범위가 넓다.",
        "question_acquisition": "업계와 동문이 섞인 방에 사적 비밀을 전파한 자료라 평판 훼손 위험이 높다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "서진아에게: \"진아의 메시지 편집과 다중 채널 확산\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 서진아의 \"진아의 메시지 편집과 다중 채널 확산\" 쟁점과 관련된다. 서진아은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박성호에게: \"작년 비밀 유지 합의의 쌍방 파기\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 박성호의 \"작년 비밀 유지 합의의 쌍방 파기\" 쟁점과 관련된다. 박성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
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
          "identity",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "identity",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.3,
            "note": "여론성 다중 채널 확산 규모를 고정하는 창"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "연습 스케줄 변경표와 택시 영수증, 통화기록",
      "description": "진아가 성호 대신 소품 정리를 맡은 시간대와, 성호가 부회장과 별도 이동한 정황을 보여주는 일정표와 이동 기록이다.",
      "type": "receipt",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "공유 연습 스프레드시트 원본, 택시 영수증, 통화기록이 묶여 제출됐다.",
        "check_metadata": "진아가 소품 정리로 표시된 시각과 성호가 연습실 외부에서 통화·이동한 시각이 분 단위로 겹친다.",
        "restore_context": "단순 일정 혼선이 아니라 성호가 진아에게 자신의 부재를 덮어 달라고 한 뒤 실제로 다른 이동을 했다는 흐름이 보인다.",
        "verify_source": "스프레드시트 수정 기록과 영수증 발행 시각, 통화기록이 서로 보강된다.",
        "check_edits": "원본 전자영수증과 시트 버전 기록이라 편집 흔적이 없다.",
        "question_acquisition": "이동 동선과 통화정보가 포함돼 있어 분쟁 해결 범위 밖의 세부 위치 정보는 가려야 한다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S3",
            "multiplier": 1.3,
            "note": "실제 동선이 알리바이 설명과 어긋나는지 보여 주는 창"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:repayment_timeline",
      "intentTag": "timeline_pin",
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
        "disputeId": "d-1",
        "allowAtomIds": [
          "friend07:a:d-1:S2:quote:0",
          "friend07:b:d-1:S2:admission:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "지금은 순서까지 다 풀고 싶지 않아.",
        "그 시점은 기록을 같이 보면서 말해야 해."
      ]
    },
    {
      "id": "fq:d-1:core_emotion",
      "intentTag": "emotion_probe",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "friend07:a:d-1:S4:emotion:0",
          "friend07:b:d-1:S4:emotion:0"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "감정 얘기는 지금 꺼내면 더 커져.",
        "그때 감정은 아직 정리되지 않았어."
      ]
    },
    {
      "id": "fq:d-2:frame_context",
      "intentTag": "context_check",
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
        "disputeId": "d-2",
        "allowAtomIds": [
          "friend07:a:d-2:S2:admission:0",
          "friend07:b:d-2:S2:compare:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "앞뒤 맥락을 떼면 오히려 더 틀어져.",
        "그건 한 줄로 자를 수 없는 이야기야."
      ]
    },
    {
      "id": "fq:d-2:spread_motive",
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
          "friend07:a:d-2:S3:channel:0",
          "friend07:b:d-2:S3:spread:0"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "속내를 지금 바로 입으로 꺼내긴 어렵다.",
        "의도까지 한 문장으로 잘라 말하고 싶지 않아."
      ]
    },
    {
      "id": "fq:d-3:misread_identity",
      "intentTag": "identity_check",
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
          "friend07:a:d-3:S2:admission:0",
          "friend07:b:d-3:S2:admission:0"
        ],
        "preferredAngleTags": [
          "identity",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 부분을 사람 평가로 넓히고 싶진 않아.",
        "이미지 얘기로 번지면 답을 아끼게 돼."
      ]
    },
    {
      "id": "fq:d-4:rule_line",
      "intentTag": "rule_check",
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
          "friend07:a:d-4:S2:admission:0",
          "friend07:b:d-4:S2:admission:0"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "규칙 얘기는 문서랑 같이 봐야 해.",
        "기억만으로 단정해 말하고 싶진 않아."
      ]
    },
    {
      "id": "fq:d-5:shared_responsibility",
      "intentTag": "responsibility_check",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "friend07:a:d-5:S3:timestamp:0",
          "friend07:b:d-5:S3:timestamp:0"
        ],
        "preferredAngleTags": [
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "누구 책임인지 한 칼에 자르긴 어렵다.",
        "그건 더 열린 사실을 보고 말해야 해."
      ]
    },
    {
      "id": "fq:d-1:identity_pressure",
      "intentTag": "identity_check",
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
        "disputeId": "d-1",
        "allowAtomIds": [
          "friend07:a:d-1:S3:evidence:0",
          "friend07:b:d-1:S3:evidence:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 부분을 사람 평가로 넓히고 싶진 않아.",
        "이미지 얘기로 번지면 답을 아끼게 돼."
      ]
    }
  ],
  "proposedUnlockAtoms": [
    {
      "id": "friend07:a:d-2:unlock:s2:01",
      "factText": "서진아가 서로 다른 날짜의 문장을 잘라 한 장짜리 캡처로 이어 붙였다는 사실",
      "tags": [
        "context",
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "evidence": {
          "exact": "e-1 편집 캡처",
          "neutral": "편집 캡처",
          "judgeRef": "e-1"
        },
        "evidence2": {
          "exact": "e-2 메신저 export",
          "neutral": "메신저 원본",
          "judgeRef": "e-2"
        },
        "quote": {
          "exact": "임원 연애는 숨겨야 이득",
          "neutral": "연애를 숨기면 유리하다는 취지",
          "judgeRef": "문제의 문장"
        }
      },
      "stanceHints": [
        "partial",
        "correct"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.unlock.a.s2.splice_dates"
    },
    {
      "id": "friend07:a:d-2:unlock:s3:01",
      "factText": "양소라 전달 뒤 17분 안에 운영진·동문 단톡·친한친구 스토리까지 연속 확산했다는 사실",
      "tags": [
        "act",
        "timeline",
        "harm"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "channel": {
          "exact": "양소라 DM → 운영진 전달 → 동문 단톡 → 친한친구 스토리",
          "neutral": "여러 채널",
          "judgeRef": "확산 경로"
        },
        "time": {
          "dateExact": "양소라 1차 전달 뒤 17분 안",
          "period": "같은 밤",
          "neutral": "짧은 시간 안"
        },
        "evidence": {
          "exact": "e-5 동문 단톡·스토리 기록",
          "neutral": "확산 기록",
          "judgeRef": "e-5"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.unlock.a.s3.multi_channel"
    },
    {
      "id": "friend07:a:d-2:unlock:s4:01",
      "factText": "서진아가 사실 확인보다 성호의 의도를 더 악하게 보이게 만들고 싶어 편집 강도를 높였다는 감정",
      "tags": [
        "motive",
        "emotion",
        "shame"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "fullName": "박성호",
          "judgeRef": "박성호 씨",
          "neutral": "B"
        },
        "quote": {
          "exact": "임원 연애는 숨겨야 이득",
          "neutral": "연애를 숨기면 유리하다는 취지",
          "judgeRef": "문제의 문장"
        }
      },
      "stanceHints": [
        "emotional",
        "admission"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.unlock.a.s4.punitive_intent"
    },
    {
      "id": "friend07:a:d-2:unlock:s5:01",
      "factText": "서진아가 지정 운영진 1명 공동 고지 규칙을 알면서도 여론성 확산을 택했다는 최종 인정",
      "tags": [
        "rule",
        "responsibility",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "route": {
          "exact": "이도현 운영진 1명에게 공동 고지",
          "neutral": "지정 경로",
          "judgeRef": "합의된 고지 경로"
        },
        "person": {
          "fullName": "이도현",
          "judgeRef": "이도현 운영진",
          "neutral": "지정 운영진"
        },
        "evidence": {
          "exact": "e-3 제한 공개 합의 노션",
          "neutral": "합의 노션",
          "judgeRef": "e-3"
        }
      },
      "stanceHints": [
        "confession",
        "settle"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.unlock.a.s5.route_breach"
    },
    {
      "id": "friend07:a:d-3:unlock:s2:01",
      "factText": "특혜 의심의 출발점이 원본 점수표가 아니라 편집 캡처와 선발 직전 타이밍이었다는 사실",
      "tags": [
        "context",
        "evidence",
        "uncertainty"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "evidence": {
          "exact": "e-1 편집 캡처",
          "neutral": "편집 캡처",
          "judgeRef": "e-1"
        },
        "time": {
          "dateExact": "연합공연제 리더 선발 직전",
          "period": "선발 즈음",
          "neutral": "그 선발 때"
        }
      },
      "stanceHints": [
        "partial",
        "correct"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.unlock.a.s2.capture_basis"
    },
    {
      "id": "friend07:a:d-3:unlock:s3:01",
      "factText": "부회장 채점 제외 로그를 확인한 뒤에도 곧바로 특혜 의심을 정정하지 않았다는 사실",
      "tags": [
        "institution",
        "responsibility",
        "timeline"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "evidence": {
          "exact": "e-4 점수표·이해충돌 로그",
          "neutral": "선발/신고 원본",
          "judgeRef": "e-4"
        },
        "person": {
          "fullName": "동호회 부회장",
          "judgeRef": "그 부회장",
          "neutral": "연애 상대"
        },
        "scoring": {
          "exact": "리더 선발 점수표와 부회장 채점 제외 로그",
          "neutral": "선발 원본 기록",
          "judgeRef": "채점 제외 로그"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.unlock.a.s3.exclusion_known"
    },
    {
      "id": "friend07:a:d-3:unlock:s4:01",
      "factText": "서진아가 선발 특혜 의혹을 붙든 핵심 감정이 배신감과 복수심이었다는 사실",
      "tags": [
        "motive",
        "emotion",
        "harm"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "fullName": "박성호",
          "judgeRef": "박성호 씨",
          "neutral": "B"
        },
        "quote": {
          "exact": "네가 연습실에 나랑 있었다고만 해줘",
          "neutral": "같이 있었다고 말해 달라는 취지",
          "judgeRef": "알리바이 부탁 문구"
        }
      },
      "stanceHints": [
        "emotional",
        "admission"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.unlock.a.s4.revenge_core"
    },
    {
      "id": "friend07:a:d-3:unlock:s5:01",
      "factText": "리더 선발 자체가 연애 특혜였다는 점은 끝내 입증되지 않았다는 최종 인정",
      "tags": [
        "institution",
        "responsibility",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "evidence": {
          "exact": "e-4 점수표·이해충돌 로그",
          "neutral": "선발/신고 원본",
          "judgeRef": "e-4"
        },
        "person": {
          "fullName": "정선우",
          "judgeRef": "정선우 운영간사",
          "neutral": "운영간사"
        }
      },
      "stanceHints": [
        "confession",
        "settle"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.unlock.a.s5.no_proof"
    },
    {
      "id": "friend07:a:d-4:unlock:s2:01",
      "factText": "서진아가 작년 제한 공개 합의 노션과 확인 이모지 기록을 정확히 기억하고 있었다는 사실",
      "tags": [
        "legacy_sentence",
        "rule",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "evidence": {
          "exact": "e-3 제한 공개 합의 노션",
          "neutral": "합의 노션",
          "judgeRef": "e-3"
        },
        "time": {
          "dateExact": "작년 겨울 소문 사태 직후 같은 밤",
          "period": "작년 겨울",
          "neutral": "그때"
        }
      },
      "stanceHints": [
        "partial",
        "correct"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.a.s2.rule_memory"
    },
    {
      "id": "friend07:a:d-4:unlock:s3:01",
      "factText": "서진아가 지정 운영진 경로 대신 양소라와 동문 단톡을 첫 확산 경로로 택했다는 사실",
      "tags": [
        "act",
        "rule",
        "timeline"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "route": {
          "exact": "이도현 운영진 1명에게 공동 고지",
          "neutral": "지정 경로",
          "judgeRef": "합의된 고지 경로"
        },
        "channel": {
          "exact": "양소라 DM → 운영진 전달 → 동문 단톡 → 친한친구 스토리",
          "neutral": "여러 채널",
          "judgeRef": "확산 경로"
        },
        "evidence": {
          "exact": "e-5 동문 단톡·스토리 기록",
          "neutral": "확산 기록",
          "judgeRef": "e-5"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.a.s3.route_skip"
    },
    {
      "id": "friend07:a:d-4:unlock:s4:01",
      "factText": "서진아가 또다시 비밀 보관자처럼 남을까 봐 수치심 속에서 규칙을 버렸다는 감정",
      "tags": [
        "shame",
        "fear",
        "legacy_sentence"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "person2": {
          "fullName": "박성호",
          "judgeRef": "박성호 씨",
          "neutral": "B"
        }
      },
      "stanceHints": [
        "emotional",
        "admission"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.a.s4.shame_repeat"
    },
    {
      "id": "friend07:a:d-4:unlock:s5:01",
      "factText": "성호의 선제 위반과 별개로 자신도 합의를 함께 깼다는 최종 인정",
      "tags": [
        "responsibility",
        "relationship",
        "admission"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person1": {
          "fullName": "박성호",
          "judgeRef": "박성호 씨",
          "neutral": "B"
        },
        "person2": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "evidence": {
          "exact": "e-3 제한 공개 합의 노션",
          "neutral": "합의 노션",
          "judgeRef": "e-3"
        }
      },
      "stanceHints": [
        "confession",
        "settle"
      ],
      "caseId": "friend-07",
      "party": "a",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.a.s5.shared_breach"
    },
    {
      "id": "friend07:b:d-1:unlock:s2:01",
      "factText": "박성호가 진아에게 '같이 있었다고만 해 달라'는 직접 문구를 보냈다는 사실",
      "tags": [
        "act",
        "quote",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "quote": {
          "exact": "네가 연습실에 나랑 있었다고만 해줘",
          "neutral": "같이 있었다고 말해 달라는 취지",
          "judgeRef": "알리바이 부탁 문구"
        },
        "evidence": {
          "exact": "e-2 메신저 export",
          "neutral": "메신저 원본",
          "judgeRef": "e-2"
        },
        "time": {
          "dateExact": "리더 선발 사전 인터뷰 전날 밤",
          "period": "선발 직전",
          "neutral": "그 전날"
        }
      },
      "stanceHints": [
        "partial",
        "correct"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.unlock.b.s2.direct_request"
    },
    {
      "id": "friend07:b:d-1:unlock:s3:01",
      "factText": "진아가 소품 정리를 맡은 시간에 박성호는 연습실 외부 동선과 통화를 하고 있었다는 사실",
      "tags": [
        "timeline",
        "evidence",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "evidence": {
          "exact": "e-6 스케줄표·택시 영수증·통화기록",
          "neutral": "이동/일정 기록",
          "judgeRef": "e-6"
        },
        "time": {
          "dateExact": "연습 스케줄 변경 당일 저녁",
          "period": "그날 저녁",
          "neutral": "그 시간대"
        },
        "person": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.unlock.b.s3.false_cover"
    },
    {
      "id": "friend07:b:d-1:unlock:s4:01",
      "factText": "선발 직전 낙인을 피하려고 진아를 친구보다 방패로 썼다는 감정적 자각",
      "tags": [
        "emotion",
        "fear",
        "relationship"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "time": {
          "dateExact": "연합공연제 리더 선발 직전",
          "period": "선발 즈음",
          "neutral": "그 선발 때"
        }
      },
      "stanceHints": [
        "emotional",
        "admission"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.unlock.b.s4.use_friend"
    },
    {
      "id": "friend07:b:d-1:unlock:s5:01",
      "factText": "비밀 연애 은닉 상태에서 진아에게 사실상 알리바이를 부탁했다는 최종 인정",
      "tags": [
        "admission",
        "responsibility",
        "relationship"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person1": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "person2": {
          "fullName": "동호회 부회장",
          "judgeRef": "그 부회장",
          "neutral": "연애 상대"
        },
        "evidence": {
          "exact": "e-2 메신저 export",
          "neutral": "메신저 원본",
          "judgeRef": "e-2"
        }
      },
      "stanceHints": [
        "confession",
        "settle"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.unlock.b.s5.alibi_confess"
    },
    {
      "id": "friend07:b:d-4:unlock:s2:01",
      "factText": "박성호가 작년 제한 공개 합의 내용을 알고 있었고 직접 확인 반응도 남겼다는 사실",
      "tags": [
        "legacy_sentence",
        "rule",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "evidence": {
          "exact": "e-3 제한 공개 합의 노션",
          "neutral": "합의 노션",
          "judgeRef": "e-3"
        },
        "time": {
          "dateExact": "작년 겨울 소문 사태 직후 같은 밤",
          "period": "작년 겨울",
          "neutral": "그때"
        }
      },
      "stanceHints": [
        "partial",
        "correct"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.b.s2.rule_known"
    },
    {
      "id": "friend07:b:d-4:unlock:s3:01",
      "factText": "박성호가 지정 운영진 공동 고지 전에 먼저 진아를 커버로 세웠다는 사실",
      "tags": [
        "act",
        "rule",
        "relationship"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "route": {
          "exact": "이도현 운영진 1명에게 공동 고지",
          "neutral": "지정 경로",
          "judgeRef": "합의된 고지 경로"
        },
        "person": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "evidence": {
          "exact": "e-2 메신저 export",
          "neutral": "메신저 원본",
          "judgeRef": "e-2"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.b.s3.cover_before_route"
    },
    {
      "id": "friend07:b:d-4:unlock:s4:01",
      "factText": "관계·자리·친구를 동시에 지키려다 규칙을 버린 욕심이 있었다는 감정",
      "tags": [
        "motive",
        "emotion",
        "fear"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "person1": {
          "fullName": "동호회 부회장",
          "judgeRef": "그 부회장",
          "neutral": "연애 상대"
        },
        "person2": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "time": {
          "dateExact": "연합공연제 리더 선발 직전",
          "period": "선발 즈음",
          "neutral": "그 선발 때"
        }
      },
      "stanceHints": [
        "emotional",
        "admission"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.b.s4.keep_everything"
    },
    {
      "id": "friend07:b:d-4:unlock:s5:01",
      "factText": "합의를 먼저 깬 쪽이 자신이었다는 점과 이후 양측 파기를 함께 인정한다는 사실",
      "tags": [
        "responsibility",
        "admission",
        "relationship"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "person1": {
          "fullName": "박성호",
          "judgeRef": "박성호 씨",
          "neutral": "B"
        },
        "person2": {
          "fullName": "서진아",
          "judgeRef": "서진아 씨",
          "neutral": "A"
        },
        "evidence": {
          "exact": "e-3 제한 공개 합의 노션",
          "neutral": "합의 노션",
          "judgeRef": "e-3"
        }
      },
      "stanceHints": [
        "confession",
        "settle"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.unlock.b.s5.first_breaker"
    },
    {
      "id": "friend07:b:d-5:unlock:s2:01",
      "factText": "선발 전 지정 운영진 공동 고지나 정식 신고 기록이 없었다는 사실",
      "tags": [
        "institution",
        "rule",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "route": {
          "exact": "이도현 운영진 1명에게 공동 고지",
          "neutral": "지정 경로",
          "judgeRef": "합의된 고지 경로"
        },
        "record": {
          "exact": "이해충돌 신고 접수 로그",
          "neutral": "신고 기록",
          "judgeRef": "신고 타임스탬프"
        },
        "evidence": {
          "exact": "e-3 제한 공개 합의 노션",
          "neutral": "합의 노션",
          "judgeRef": "e-3"
        }
      },
      "stanceHints": [
        "partial",
        "correct"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.unlock.b.s2.no_pre_record"
    },
    {
      "id": "friend07:b:d-5:unlock:s3:01",
      "factText": "이해충돌 신고 접수 시각이 진아의 캡처 확산 이후로 남아 있다는 사실",
      "tags": [
        "timeline",
        "institution",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "record": {
          "exact": "이해충돌 신고 접수 로그",
          "neutral": "신고 기록",
          "judgeRef": "신고 타임스탬프"
        },
        "time": {
          "dateExact": "진아의 캡처 확산 이후",
          "period": "사후 신고 시점",
          "neutral": "그 뒤"
        },
        "evidence": {
          "exact": "e-4 점수표·이해충돌 로그",
          "neutral": "선발/신고 원본",
          "judgeRef": "e-4"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.unlock.b.s3.after_spread"
    },
    {
      "id": "friend07:b:d-5:unlock:s4:01",
      "factText": "선발과 이미지를 지키려고 아직 안 한 고지를 이미 된 일처럼 말했다는 감정적 고백",
      "tags": [
        "motive",
        "fear",
        "shame"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "time": {
          "dateExact": "연합공연제 리더 선발 직전",
          "period": "선발 즈음",
          "neutral": "그 선발 때"
        },
        "person": {
          "fullName": "박성호",
          "judgeRef": "박성호 씨",
          "neutral": "B"
        }
      },
      "stanceHints": [
        "emotional",
        "admission"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.unlock.b.s4.image_preserve"
    },
    {
      "id": "friend07:b:d-5:unlock:s5:01",
      "factText": "박성호가 실제로는 사후 신고를 해 놓고 사전 고지처럼 말한 거짓을 인정한다는 사실",
      "tags": [
        "admission",
        "institution",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "record": {
          "exact": "이해충돌 신고 접수 로그",
          "neutral": "신고 기록",
          "judgeRef": "신고 타임스탬프"
        },
        "evidence": {
          "exact": "e-4 점수표·이해충돌 로그",
          "neutral": "선발/신고 원본",
          "judgeRef": "e-4"
        },
        "time": {
          "dateExact": "진아의 캡처 확산 이후",
          "period": "사후 신고 시점",
          "neutral": "그 뒤"
        }
      },
      "stanceHints": [
        "confession",
        "settle"
      ],
      "caseId": "friend-07",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.unlock.b.s5.retro_report"
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
  }
} as const;

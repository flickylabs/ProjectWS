export const friend_06_structure_v2 = {
  "caseId": "friend-06",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "다솔의 직접 수정과 핀댓글 삭제",
      "truth": true,
      "truthDescription": "다솔은 해온과 같은 날 추가 확인 없이 블로그 본문과 유튜브 설명란을 직접 고치고, 기존 핀댓글까지 삭제했다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "게시물복구",
      "legitimacyIssue": false,
      "judgmentStatement": "다솔은 블로그와 유튜브를 수정했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "블로그 본문",
        "유튜브 설명란",
        "핀댓글 삭제",
        "같은 세션",
        "직접 수정",
        "revision log"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "다솔의 직접 수정과 핀댓글 삭제에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend06:a:d-1:s0:act:0",
            "friend06:b:d-1:s0:denial:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "다솔의 직접 수정과 핀댓글 삭제 뒤에 깔린 선택 이유",
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
            "friend06:a:d-1:s2:context:0",
            "friend06:b:d-1:s2:admission:0",
            "friend06:b:d-1:s3:counter:0",
            "friend06:b:d-1:s3:scope:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "다솔의 직접 수정과 핀댓글 삭제를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-3",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:edit_range_named"
            ]
          },
          "revealAtomIds": [
            "friend06:a:d-1:s4:emotion:0",
            "friend06:b:d-1:s4:emotion:0",
            "friend06:b:d-1:s5:confession:0",
            "friend06:b:d-1:s5:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "해온의 공개 비난과 일방적 접근 차단",
      "truth": true,
      "truthDescription": "해온은 권한 범위를 확인하기 전에 창작자 단톡에 비교 캡처를 올려 다솔을 공개 비난했고, 곧바로 블로그와 채널 접근권을 끊었다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 76,
        "b": 24
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "협업경계",
      "legitimacyIssue": true,
      "judgmentStatement": "해온은 다솔을 공개 비난했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "창작자 단톡",
        "비교 캡처",
        "접근권 회수",
        "공개 비난",
        "업계방",
        "14분 안"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "해온의 공개 비난과 일방적 접근 차단에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend06:a:d-2:s0:denial:0",
            "friend06:b:d-2:s0:act:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "해온의 공개 비난과 일방적 접근 차단 뒤에 깔린 선택 이유",
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
            "friend06:a:d-2:s2:admission:0",
            "friend06:b:d-2:s2:context:0",
            "friend06:a:d-2:s3:counter:0",
            "friend06:a:d-2:s3:scope:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "해온의 공개 비난과 일방적 접근 차단를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              },
              {
                "id": "d-5",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:public_callout_named"
            ]
          },
          "revealAtomIds": [
            "friend06:a:d-2:s4:emotion:0",
            "friend06:b:d-2:s4:emotion:0",
            "friend06:a:d-2:s5:confession:0",
            "friend06:a:d-2:s5:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "다솔은 원래 수정 권한이 없었는데 무단 침입한 것인가",
      "truth": false,
      "truthDescription": "다솔에게는 해온이 이전에 수락한 블로그 편집자와 유튜브 브랜드계정 매니저 권한이 실제로 부여되어 있었고, 둘 다 그 권한 범위를 정확히 이해하지 못했다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-2",
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 48,
        "b": 52
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "권한재설정",
      "legitimacyIssue": false,
      "judgmentStatement": "다솔은 권한이 부여된 상태였다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "블로그 편집자",
        "브랜드계정 매니저",
        "함께 수정",
        "권한 수락",
        "초대메일",
        "무단 침입"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "다솔은 원래 수정 권한이 없었는데 무단 침입한 것인가에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend06:a:d-3:s0:denial:0",
            "friend06:b:d-3:s0:identity:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "다솔은 원래 수정 권한이 없었는데 무단 침입한 것인가 뒤에 깔린 선택 이유",
          "lockedSummary": "말의 뒤쪽 계산과 감정은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              },
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend06:a:d-3:s2:admission:0",
            "friend06:b:d-3:s2:context:0",
            "friend06:a:d-3:s3:counter:0",
            "friend06:a:d-3:s3:scope:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "다솔은 원래 수정 권한이 없었는데 무단 침입한 것인가를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              },
              {
                "id": "d-5",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:role_scope_named"
            ]
          },
          "revealAtomIds": [
            "friend06:a:d-3:s4:emotion:0",
            "friend06:b:d-3:s4:emotion:0",
            "friend06:a:d-3:s5:confession:0",
            "friend06:a:d-3:s5:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "misbelief",
          "b": "misbelief"
        },
        "trapSignals": [
          "모바일의 '함께 수정' 라벨만 근거로 권한 범위를 단정하는 말",
          "권한 초대 사실을 빼고 무단 침입처럼만 보이게 하는 비교 캡처",
          "예전 라이브 링크 수정 전례를 일반 수정권으로 확대하는 해석"
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
    },
    {
      "id": "d-4",
      "name": "제3자 수정 요청 범위를 넘긴 편집",
      "truth": true,
      "truthDescription": "브랜드 측은 광고 표기와 가격 문구 정정만 요청했지만, 다솔은 그 범위를 넘어 제목, 썸네일 문구, 핀댓글까지 바꿨다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 30,
        "b": 70
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "게시물복구",
      "legitimacyIssue": false,
      "judgmentStatement": "다솔은 요청 범위를 초과했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "광고 표기",
        "가격 날짜",
        "코디네이터 DM",
        "제목 수정",
        "썸네일 문구",
        "범위 초과"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "제3자 수정 요청 범위를 넘긴 편집에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend06:a:d-4:s0:act:0",
            "friend06:b:d-4:s0:denial:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "제3자 수정 요청 범위를 넘긴 편집 뒤에 깔린 선택 이유",
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
            "friend06:a:d-4:s2:context:0",
            "friend06:b:d-4:s2:admission:0",
            "friend06:b:d-4:s3:counter:0",
            "friend06:b:d-4:s3:scope:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "제3자 수정 요청 범위를 넘긴 편집를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-5",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:request_scope_named"
            ]
          },
          "revealAtomIds": [
            "friend06:a:d-4:s4:emotion:0",
            "friend06:b:d-4:s4:emotion:0",
            "friend06:b:d-4:s5:confession:0",
            "friend06:b:d-4:s5:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "최종 확인과 공동 스레드 원칙의 쌍방 위반",
      "truth": true,
      "truthDescription": "둘은 최종 공개 전 상호 확인과 협찬 수정 요청의 공동 공유를 약속했지만, 다솔은 직접 수정했고 해온은 단톡 공개 비난과 즉시 차단으로 절차를 깨뜨렸다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 53,
        "b": 47
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "협업경계",
      "legitimacyIssue": false,
      "judgmentStatement": "다솔은 수정 요청을 무시했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "공동 스레드",
        "최종 확인",
        "협업 노션",
        "공개 전 승인",
        "직접 수정",
        "즉시 차단"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "최종 확인과 공동 스레드 원칙의 쌍방 위반에서 바로 드러나는 장면",
          "lockedSummary": "겉으로 드러난 사실선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend06:a:d-5:s0:denial:0",
            "friend06:b:d-5:s0:denial:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "최종 확인과 공동 스레드 원칙의 쌍방 위반 뒤에 깔린 선택 이유",
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
            "friend06:a:d-5:s2:admission:0",
            "friend06:b:d-5:s2:admission:0",
            "friend06:a:d-5:s3:counter:0",
            "friend06:a:d-5:s3:scope:1",
            "friend06:b:d-5:s3:counter:0",
            "friend06:b:d-5:s3:scope:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "최종 확인과 공동 스레드 원칙의 쌍방 위반를 뒤집는 숨은 책임 연결",
          "lockedSummary": "핵심 책임 연결은 더 확인이 필요합니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              },
              {
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:surface:rule_doc_named"
            ]
          },
          "revealAtomIds": [
            "friend06:a:d-5:s4:emotion:0",
            "friend06:b:d-5:s4:emotion:0",
            "friend06:a:d-5:s5:confession:0",
            "friend06:a:d-5:s5:responsibility:1",
            "friend06:b:d-5:s5:confession:0",
            "friend06:b:d-5:s5:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-3:d-1:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "counterPenalty": 12,
        "grantFlag": "d-1:motive:control_loss_named"
      },
      "uiLabel": "무단 침입 서사 약화"
    },
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
        "grantFlag": "d-4:surface:request_scope_named"
      },
      "uiLabel": "실제 변경 범위"
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
        "supportBonus": 10,
        "grantFlag": "d-5:surface:rule_doc_named"
      },
      "uiLabel": "공개 비난의 역효과"
    },
    {
      "id": "link:d-4:d-5:unlocks_layer",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "unlockLayer": "core",
        "grantFlag": "d-5:motive:same_rule_named"
      },
      "uiLabel": "요청 범위 확인"
    },
    {
      "id": "link:d-3:d-5:supports",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:core:shared_break_open"
      },
      "uiLabel": "권한 오해 해소"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "블로그 revision과 유튜브 변경 로그",
      "description": "블로그 제목·본문 수정, 유튜브 설명란 편집, 핀댓글 삭제와 관련된 플랫폼 원본 변경 기록이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "블로그 CMS export와 유튜브 스튜디오 변경 로그 원본이 함께 제출됐다.",
        "check_metadata": "브랜드 코디네이터의 연락 직후 11분 안에 제목, 설명란, 핀댓글 변경이 연속으로 일어났다.",
        "restore_context": "광고 표기 수정 외에 제목과 썸네일 문구, 핀댓글 삭제까지 같은 세션에서 이루어졌다.",
        "verify_source": "플랫폼 서버 로그와 오한결 매니저가 내려받은 기록이 서로 일치한다.",
        "check_edits": "서버 보존본이라 사후 편집 흔적은 없다.",
        "question_acquisition": "공동 채널의 운영 로그라 적법하지만 조회수와 수익 수치는 최소 범위만 공개해야 한다."
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
          "S4"
        ],
        "preferredQuestionTypes": [
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "직접 수정과 핀댓글 삭제가 같은 세션에서 일어난 점을 못 박는 창"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "해온이 창작자 단톡에 올린 비교 캡처와 비난 메시지",
      "description": "바뀐 제목과 썸네일, 삭제된 핀댓글 화면을 비교하며 다솔이 권한을 넘었다고 적은 해온의 단톡 메시지다.",
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
        "request_original": "처음에는 단톡에 올린 비교 캡처 두 장만 제출됐고, 그 앞뒤의 권한 초대와 브랜드 연락 내용은 빠져 있었다.",
        "check_metadata": "다솔의 수정 직후 14분 안에 단톡에 전송된 기록으로 남아 있다.",
        "restore_context": "캡처에는 실제로 보유한 역할 권한과 브랜드 요청 범위가 빠져 있어 순수한 무단 침입처럼 읽히게 만든다.",
        "verify_source": "해온 휴대폰 원본과 단톡 수신자 화면의 메시지 ID가 일치한다.",
        "check_edits": "문자 조작 흔적은 없지만 비교 대상과 시간표시가 선택적으로 잘려 있다.",
        "question_acquisition": "업계 단톡 자료라 제3자 닉네임과 반응이 섞여 있어 사적 확산 문제를 낳는다."
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
            "note": "권한 확인 전 공개 비난이 먼저였는지 가르는 창"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "블로그 초대메일과 유튜브 브랜드계정 역할 화면",
      "description": "해온이 다솔에게 보낸 블로그 편집자 초대와 유튜브 브랜드계정 매니저 역할 수락 화면, 역할 설명 페이지다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "초대메일 원문, 수락 로그, 역할 설명 페이지가 함께 보존돼 있다.",
        "check_metadata": "블로그 편집 권한은 지난달, 유튜브 브랜드계정 매니저 권한은 그 전주에 이미 수락된 상태였다.",
        "restore_context": "모바일 화면의 '함께 수정' 문구 때문에 해온은 제안권에 가깝게 이해했고, 다솔은 공개 수정권까지 포함된다고 받아들였다.",
        "verify_source": "플랫폼 보안 로그와 오한결의 관리 패널 기록이 같은 권한 부여 사실을 가리킨다.",
        "check_edits": "플랫폼 출력본이라 후편집 흔적이 없다.",
        "question_acquisition": "당사자 동의와 플랫폼 회신을 통해 확보한 자료라 적법성은 높다."
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
          "identity",
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
            "note": "무단 침입 프레임을 실제 권한 문제로 바꾸는 창"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "임세진 코디네이터의 수정 요청 DM과 메일 스레드",
      "description": "브랜드 협찬 담당이 다솔에게 직접 보낸 광고 표기 수정 요청과, 요구 범위가 적힌 메일 원본이다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "임세진의 메일 원본과 인스타 DM, 그리고 브랜드 내부 요청 문구가 함께 제출됐다.",
        "check_metadata": "코디네이터는 해온이 여섯 시간째 회신하지 않자 다솔에게 직접 연락했고, 그 직후 수정이 시작됐다.",
        "restore_context": "요청 범위는 광고 표기 문장과 가격 날짜 업데이트였고, 제목·썸네일·핀댓글 변경은 포함되지 않았다.",
        "verify_source": "브랜드 메일 서버 기록과 다솔의 DM export가 동일한 시간대와 문구를 보여준다.",
        "check_edits": "메일 헤더와 DM 원본이라 편집 흔적이 없다.",
        "question_acquisition": "협찬 계약 내용이 일부 포함돼 있어 금액과 내부 일정은 제한적으로만 다뤄야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤해온에게: \"다솔은 원래 수정 권한이 없었는데 무단 침입한 것인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 윤해온의 \"다솔은 원래 수정 권한이 없었는데 무단 침입한 것인가\" 쟁점과 관련된다. 윤해온은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최다솔에게: \"다솔의 직접 수정과 핀댓글 삭제\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 최다솔의 \"다솔의 직접 수정과 핀댓글 삭제\" 쟁점과 관련된다. 최다솔은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "expose",
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
          "motive_search"
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
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "브랜드 요청 범위가 어디까지였는지 잘라내는 창"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "협업 노션 운영 규칙과 버전기록",
      "description": "최종 공개 전 상호 확인, 협찬 수정 요청은 공동 스레드에 공유한다는 규칙이 적힌 노션 문서와 버전기록이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "노션 페이지 원본과 과거 버전기록, 확인용 체크 이모지 내역이 함께 제출됐다.",
        "check_metadata": "이 문서는 지난가을 제목 싸움 직후 만들어졌고, 둘 다 같은 날 확인 표시를 남겼다.",
        "restore_context": "응급 오탈자 수정은 예외로 남겨 두었지만 협찬 수정 요청은 반드시 공동 스레드에 먼저 올리게 되어 있다.",
        "verify_source": "노션의 작성·열람 로그와 정수민의 캡처가 내용상 일치한다.",
        "check_edits": "버전 이력상 핵심 규칙 문장은 변경된 적이 없다.",
        "question_acquisition": "공동 업무문서라 제출은 적법하지만 다른 협업 파트의 내용은 최소 공개가 바람직하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤해온에게: \"최종 확인과 공동 스레드 원칙의 쌍방 위반\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 윤해온의 \"최종 확인과 공동 스레드 원칙의 쌍방 위반\" 쟁점과 관련된다. 윤해온은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최다솔에게: \"최종 확인과 공동 스레드 원칙의 쌍방 위반\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 최다솔의 \"최종 확인과 공동 스레드 원칙의 쌍방 위반\" 쟁점과 관련된다. 최다솔은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.3,
            "note": "공동 스레드 원칙이 실제 약속이었음을 못 박는 창"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "접근권 회수 로그와 업로드 지연 알림",
      "description": "해온이 다솔의 편집 권한을 끊은 시각과, 그 결과 예약된 수정 업로드가 지연됐다는 플랫폼 알림 기록이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "블로그와 유튜브의 권한 회수 로그, 예약 수정 실패 알림이 함께 제출됐다.",
        "check_metadata": "해온은 단톡 비난 메시지 이후 9분 안에 다솔의 접근권을 모두 회수했다.",
        "restore_context": "권한 회수는 문제 게시물 하나가 아니라 공동 채널 전체에 적용돼 이후 예정됐던 수정과 업로드 일정도 멈췄다.",
        "verify_source": "오한결의 관리 패널 기록과 플랫폼 시스템 알림 시간이 정확히 일치한다.",
        "check_edits": "서버 보존 로그라 후편집 흔적은 없다.",
        "question_acquisition": "플랫폼 운영 로그라 적법하지만 다른 게시물 일정과 수익 정보는 가려서 다루어야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "윤해온에게: \"해온의 공개 비난과 일방적 접근 차단\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 윤해온의 \"해온의 공개 비난과 일방적 접근 차단\" 쟁점과 관련된다. 윤해온은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "최다솔에게: \"최종 확인과 공동 스레드 원칙의 쌍방 위반\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 최다솔의 \"최종 확인과 공동 스레드 원칙의 쌍방 위반\" 쟁점과 관련된다. 최다솔은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.3,
            "note": "공개 비난 직후 전면 차단까지 갔는지 보여 주는 창"
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
          "friend06:a:d-1:s2:context:0",
          "friend06:b:d-1:s2:admission:0"
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
          "friend06:a:d-1:s4:emotion:0",
          "friend06:b:d-1:s4:emotion:0"
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
          "friend06:a:d-2:s2:admission:0",
          "friend06:b:d-2:s2:context:0"
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
          "friend06:a:d-2:s3:counter:0",
          "friend06:b:d-2:s3:rule:0"
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
          "friend06:a:d-3:s2:admission:0",
          "friend06:b:d-3:s2:context:0"
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
          "friend06:a:d-4:s2:context:0",
          "friend06:b:d-4:s2:admission:0"
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
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "friend06:a:d-5:s5:confession:0",
          "friend06:b:d-5:s5:confession:0"
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
          "friend06:a:d-1:s3:rule:0",
          "friend06:b:d-1:s3:counter:0"
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
      "id": "friend06:a:d-2:unlock:s2:01",
      "factText": "해온은 실제 역할 권한을 확인하기 전에 창작자 단톡에 비교 캡처를 먼저 올렸다.",
      "tags": [
        "act",
        "timeline",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "audience": {
          "exact": "창작자 단톡",
          "judgeRef": "단톡",
          "neutral": "업계 단체대화방"
        },
        "time": {
          "relativeExact": "수정 직후 14분 안",
          "period": "수정 직후",
          "neutral": "그때"
        },
        "evidence": {
          "primary": "e-2",
          "supporting": "e-6",
          "neutral": "단톡 캡처와 회수 로그"
        }
      },
      "stanceHints": [
        "partial",
        "defensive"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.a.unlock.s2.public_callout_before_check"
    },
    {
      "id": "friend06:a:d-2:unlock:s3:01",
      "factText": "해온의 조치는 문제 게시물 잠금이 아니라 블로그와 채널 전체 접근권 회수로 이어졌다.",
      "tags": [
        "act",
        "harm",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "revocation": {
          "relativeExact": "단톡 전송 후 9분 안",
          "period": "곧바로",
          "neutral": "바로"
        },
        "evidence": {
          "primary": "e-2",
          "supporting": "e-6",
          "neutral": "단톡 캡처와 회수 로그"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.a.unlock.s3.total_access_revocation"
    },
    {
      "id": "friend06:a:d-2:unlock:s4:01",
      "factText": "해온은 업계방에서 통제권을 잃은 창작자로 보일까 봐 체면 공포를 크게 느꼈다.",
      "tags": [
        "emotion",
        "fear",
        "identity"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "audience": {
          "exact": "창작자 단톡",
          "judgeRef": "단톡",
          "neutral": "업계 단체대화방"
        }
      },
      "stanceHints": [
        "emotional",
        "hurt"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.a.unlock.s4.identity_panic"
    },
    {
      "id": "friend06:a:d-2:unlock:s5:01",
      "factText": "해온은 사적 확인보다 공개 비난과 전면 차단을 앞세운 자신의 선택이 잘못이었다고 인정한다.",
      "tags": [
        "admission",
        "responsibility",
        "harm"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "audience": {
          "exact": "창작자 단톡",
          "judgeRef": "단톡",
          "neutral": "업계 단체대화방"
        },
        "revocation": {
          "relativeExact": "단톡 전송 후 9분 안",
          "period": "곧바로",
          "neutral": "바로"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-2",
      "sourceUnlockId": "d2.a.unlock.s5.public_shaming_admission"
    },
    {
      "id": "friend06:a:d-3:unlock:s2:01",
      "factText": "다솔에게는 블로그 편집자와 유튜브 브랜드계정 매니저 권한이 실제로 부여되어 있었다.",
      "tags": [
        "identity",
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "roleBlog": {
          "exact": "블로그 편집자",
          "judgeRef": "편집자 권한",
          "neutral": "블로그 권한"
        },
        "roleYoutube": {
          "exact": "유튜브 브랜드계정 매니저",
          "judgeRef": "매니저 역할",
          "neutral": "채널 역할"
        },
        "time": {
          "relativeExact": "지난달 / 그 전주",
          "period": "이전부터",
          "neutral": "이미"
        },
        "evidence": {
          "primary": "e-3",
          "supporting": "e-4",
          "neutral": "초대 로그와 요청 스레드"
        }
      },
      "stanceHints": [
        "partial",
        "defensive"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.a.unlock.s2.granted_roles_exist"
    },
    {
      "id": "friend06:a:d-3:unlock:s3:01",
      "factText": "해온은 모바일의 '함께 수정' 같은 표시를 제안권에 가까운 범위로 좁게 읽고 있었다.",
      "tags": [
        "context",
        "uncertainty",
        "rule"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "roleBlog": {
          "exact": "블로그 편집자",
          "judgeRef": "편집자 권한",
          "neutral": "블로그 권한"
        },
        "roleYoutube": {
          "exact": "유튜브 브랜드계정 매니저",
          "judgeRef": "매니저 역할",
          "neutral": "채널 역할"
        },
        "time": {
          "relativeExact": "지난달 / 그 전주",
          "period": "이전부터",
          "neutral": "이미"
        }
      },
      "stanceHints": [
        "partial",
        "explain"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.a.unlock.s3.mobile_label_misread"
    },
    {
      "id": "friend06:a:d-3:unlock:s4:01",
      "factText": "예전 라이브 링크 수정 때 감사만 하고 권한 경계를 말로 못 박지 않은 기억이 이번 판단을 더 흔들었다.",
      "tags": [
        "relationship",
        "legacy_sentence",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "time": {
          "relativeExact": "지난달 / 그 전주",
          "period": "이전부터",
          "neutral": "이미"
        }
      },
      "stanceHints": [
        "emotional",
        "shame"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.a.unlock.s4.unspoken_boundary_past_fix"
    },
    {
      "id": "friend06:a:d-3:unlock:s5:01",
      "factText": "해온은 무단 침입이라는 규정을 철회하고 자신이 더 넓은 권한을 주고도 설명하지 않았다고 인정한다.",
      "tags": [
        "admission",
        "responsibility",
        "identity"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "roleBlog": {
          "exact": "블로그 편집자",
          "judgeRef": "편집자 권한",
          "neutral": "블로그 권한"
        },
        "roleYoutube": {
          "exact": "유튜브 브랜드계정 매니저",
          "judgeRef": "매니저 역할",
          "neutral": "채널 역할"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-3",
      "sourceUnlockId": "d3.a.unlock.s5.false_intrusion_label"
    },
    {
      "id": "friend06:a:d-5:unlock:s2:01",
      "factText": "해온은 협업 노션의 공동 스레드 원칙과 최종 확인 규칙을 알고 있었고 직접 확인 표시도 남겼다.",
      "tags": [
        "rule",
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "ruleDoc": {
          "exact": "협업 노션 운영 규칙",
          "judgeRef": "노션 규칙",
          "neutral": "공동 규칙 문서"
        },
        "rule": {
          "exact": "최종 공개 전 상호 확인 / 협찬 수정 요청은 공동 스레드 공유",
          "judgeRef": "공동 원칙",
          "neutral": "공동 스레드 원칙"
        },
        "time": {
          "relativeExact": "지난가을 합의 이후",
          "period": "기존 협업 절차",
          "neutral": "평소"
        },
        "evidence": {
          "primary": "e-5",
          "supporting": "e-6",
          "neutral": "노션 규칙과 회수 로그"
        }
      },
      "stanceHints": [
        "partial",
        "admission"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.a.unlock.s2.rule_was_known"
    },
    {
      "id": "friend06:a:d-5:unlock:s3:01",
      "factText": "해온은 규칙을 아는 상태에서도 당사자 확인보다 단톡 공개와 전체 권한 회수를 먼저 택했다.",
      "tags": [
        "act",
        "responsibility",
        "rule"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "rule": {
          "exact": "최종 공개 전 상호 확인 / 협찬 수정 요청은 공동 스레드 공유",
          "judgeRef": "공동 원칙",
          "neutral": "공동 스레드 원칙"
        },
        "evidence": {
          "primary": "e-5",
          "supporting": "e-6",
          "neutral": "노션 규칙과 회수 로그"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.a.unlock.s3.skipped_private_check"
    },
    {
      "id": "friend06:a:d-5:unlock:s4:01",
      "factText": "해온은 관계를 지키고 싶다고 생각했지만 실제로는 업계방 체면과 통제권 회복 욕구가 규칙보다 앞섰다.",
      "tags": [
        "emotion",
        "fear",
        "relationship"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "ruleDoc": {
          "exact": "협업 노션 운영 규칙",
          "judgeRef": "노션 규칙",
          "neutral": "공동 규칙 문서"
        }
      },
      "stanceHints": [
        "emotional",
        "shame"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.a.unlock.s4.face_over_rule"
    },
    {
      "id": "friend06:a:d-5:unlock:s5:01",
      "factText": "해온은 다솔의 위반을 비난하면서도 자신도 같은 공동 확인 원칙을 깨뜨렸다고 인정한다.",
      "tags": [
        "admission",
        "responsibility",
        "relationship"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "counterparty": {
          "fullName": "최다솔",
          "judgeRef": "다솔 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "rule": {
          "exact": "최종 공개 전 상호 확인 / 협찬 수정 요청은 공동 스레드 공유",
          "judgeRef": "공동 원칙",
          "neutral": "공동 스레드 원칙"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ],
      "caseId": "friend-06",
      "party": "a",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.a.unlock.s5.same_rule_broken"
    },
    {
      "id": "friend06:b:d-1:unlock:s2:01",
      "factText": "다솔은 브랜드 연락 직후 같은 세션에서 블로그 본문과 유튜브 설명란을 직접 수정했다.",
      "tags": [
        "act",
        "timeline",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "time": {
          "relativeExact": "브랜드 연락 직후 11분 안",
          "period": "같은 수정 세션",
          "neutral": "그때"
        },
        "platform": {
          "exact": "블로그 본문·유튜브 설명란·핀댓글",
          "judgeRef": "해당 게시물",
          "neutral": "게시물 주요 요소"
        },
        "evidence": {
          "primary": "e-1",
          "supporting": "e-4",
          "neutral": "변경 로그와 브랜드 요청"
        }
      },
      "stanceHints": [
        "partial",
        "admission"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.b.unlock.s2.direct_edit_same_session"
    },
    {
      "id": "friend06:b:d-1:unlock:s3:01",
      "factText": "핀댓글 삭제도 같은 수정 세션 안에서 발생했고 다솔은 그 결과 책임을 피하기 어렵다.",
      "tags": [
        "act",
        "harm",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "time": {
          "relativeExact": "브랜드 연락 직후 11분 안",
          "period": "같은 수정 세션",
          "neutral": "그때"
        },
        "platform": {
          "exact": "블로그 본문·유튜브 설명란·핀댓글",
          "judgeRef": "해당 게시물",
          "neutral": "게시물 주요 요소"
        },
        "evidence": {
          "primary": "e-1",
          "supporting": "e-4",
          "neutral": "변경 로그와 브랜드 요청"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.b.unlock.s3.pin_comment_removed"
    },
    {
      "id": "friend06:b:d-1:unlock:s4:01",
      "factText": "해온이 여섯 시간째 답을 주지 않는 사이 광고가 내려갈 수 있다는 압박이 다솔에게 구조자 강박처럼 작용했다.",
      "tags": [
        "motive",
        "threshold",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "time": {
          "relativeExact": "브랜드 연락 직후 11분 안",
          "period": "같은 수정 세션",
          "neutral": "그때"
        }
      },
      "stanceHints": [
        "emotional",
        "self_justify"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.b.unlock.s4.sponsor_pressure_after_silence"
    },
    {
      "id": "friend06:b:d-1:unlock:s5:01",
      "factText": "다솔은 직접 수정과 핀댓글 삭제를 먼저 알리지 않은 선택이 자신의 책임이었다고 인정한다.",
      "tags": [
        "admission",
        "responsibility",
        "rule"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "platform": {
          "exact": "블로그 본문·유튜브 설명란·핀댓글",
          "judgeRef": "해당 게시물",
          "neutral": "게시물 주요 요소"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-1",
      "sourceUnlockId": "d1.b.unlock.s5.direct_edit_admission"
    },
    {
      "id": "friend06:b:d-4:unlock:s2:01",
      "factText": "임세진 코디네이터의 원문 요청 범위는 광고 표기 문장과 가격 날짜 업데이트에 한정돼 있었다.",
      "tags": [
        "context",
        "institution",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "coordinator": {
          "fullName": "임세진",
          "judgeRef": "코디네이터",
          "neutral": "브랜드 담당자",
          "relation": "제3자"
        },
        "scope": {
          "exact": "광고 표기 문장과 가격 날짜 업데이트",
          "judgeRef": "요청 범위",
          "neutral": "요청된 정정 범위"
        },
        "evidence": {
          "primary": "e-4",
          "supporting": "e-1",
          "neutral": "브랜드 요청 원문과 로그"
        }
      },
      "stanceHints": [
        "partial",
        "admission"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.b.unlock.s2.request_scope_was_limited"
    },
    {
      "id": "friend06:b:d-4:unlock:s3:01",
      "factText": "다솔은 그 범위를 넘어 제목과 썸네일 문구, 핀댓글까지 추가로 손댔다.",
      "tags": [
        "act",
        "threshold",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "scope": {
          "exact": "광고 표기 문장과 가격 날짜 업데이트",
          "judgeRef": "요청 범위",
          "neutral": "요청된 정정 범위"
        },
        "platform": {
          "exact": "제목·썸네일 문구·핀댓글",
          "judgeRef": "추가 편집",
          "neutral": "추가로 손댄 요소"
        },
        "evidence": {
          "primary": "e-4",
          "supporting": "e-1",
          "neutral": "브랜드 요청 원문과 로그"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.b.unlock.s3.extra_surface_edit"
    },
    {
      "id": "friend06:b:d-4:unlock:s4:01",
      "factText": "다솔은 광고를 살려야 한다는 결과 논리를 앞세우며 창작 수정과 정정 작업의 경계를 흐렸다.",
      "tags": [
        "motive",
        "self_justification",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "coordinator": {
          "fullName": "임세진",
          "judgeRef": "코디네이터",
          "neutral": "브랜드 담당자",
          "relation": "제3자"
        }
      },
      "stanceHints": [
        "emotional",
        "self_justify"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.b.unlock.s4.result_first_justification"
    },
    {
      "id": "friend06:b:d-4:unlock:s5:01",
      "factText": "다솔은 살리려던 의도와 별개로 브랜드 요청 범위를 넘긴 편집이 절차 위반이었다고 인정한다.",
      "tags": [
        "admission",
        "responsibility",
        "rule"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "scope": {
          "exact": "광고 표기 문장과 가격 날짜 업데이트",
          "judgeRef": "요청 범위",
          "neutral": "요청된 정정 범위"
        },
        "platform": {
          "exact": "제목·썸네일 문구·핀댓글",
          "judgeRef": "추가 편집",
          "neutral": "추가로 손댄 요소"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-4",
      "sourceUnlockId": "d4.b.unlock.s5.scope_overrun_admission"
    },
    {
      "id": "friend06:b:d-5:unlock:s2:01",
      "factText": "다솔도 협업 노션의 공동 스레드 원칙과 최종 확인 규칙을 알고 있었고 확인 표시를 남긴 상태였다.",
      "tags": [
        "rule",
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "ruleDoc": {
          "exact": "협업 노션 운영 규칙",
          "judgeRef": "노션 규칙",
          "neutral": "공동 규칙 문서"
        },
        "rule": {
          "exact": "최종 공개 전 상호 확인 / 협찬 수정 요청은 공동 스레드 공유",
          "judgeRef": "공동 원칙",
          "neutral": "공동 스레드 원칙"
        },
        "time": {
          "relativeExact": "지난가을 합의 이후",
          "period": "기존 협업 절차",
          "neutral": "평소"
        },
        "evidence": {
          "primary": "e-5",
          "supporting": "e-6",
          "neutral": "노션 규칙과 회수 로그"
        }
      },
      "stanceHints": [
        "partial",
        "admission"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.b.unlock.s2.rule_was_known"
    },
    {
      "id": "friend06:b:d-5:unlock:s3:01",
      "factText": "다솔은 규칙을 알고도 공동 스레드에 요청 원문을 올리기 전에 직접 수정부터 시작했다.",
      "tags": [
        "act",
        "responsibility",
        "rule"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "rule": {
          "exact": "최종 공개 전 상호 확인 / 협찬 수정 요청은 공동 스레드 공유",
          "judgeRef": "공동 원칙",
          "neutral": "공동 스레드 원칙"
        },
        "evidence": {
          "primary": "e-5",
          "supporting": "e-6",
          "neutral": "노션 규칙과 회수 로그"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.b.unlock.s3.edited_before_shared_thread"
    },
    {
      "id": "friend06:b:d-5:unlock:s4:01",
      "factText": "예전 라이브 링크 수정 전례와 관계를 지키고 싶다는 마음이 다솔에게 응급 예외를 스스로 허용하게 만들었다.",
      "tags": [
        "legacy_sentence",
        "relationship",
        "emotion"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "ruleDoc": {
          "exact": "협업 노션 운영 규칙",
          "judgeRef": "노션 규칙",
          "neutral": "공동 규칙 문서"
        }
      },
      "stanceHints": [
        "emotional",
        "shame"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.b.unlock.s4.past_live_fix_gray_zone"
    },
    {
      "id": "friend06:b:d-5:unlock:s5:01",
      "factText": "다솔은 급박함이 공동 확인 규칙 위반을 지워 주지 못한다는 점을 받아들인다.",
      "tags": [
        "admission",
        "responsibility",
        "relationship"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "counterparty": {
          "fullName": "윤해온",
          "judgeRef": "해온 씨",
          "neutral": "상대방",
          "relation": "협업 파트너"
        },
        "rule": {
          "exact": "최종 공개 전 상호 확인 / 협찬 수정 요청은 공동 스레드 공유",
          "judgeRef": "공동 원칙",
          "neutral": "공동 스레드 원칙"
        }
      },
      "stanceHints": [
        "confess",
        "responsibility"
      ],
      "caseId": "friend-06",
      "party": "b",
      "disputeId": "d-5",
      "sourceUnlockId": "d5.b.unlock.s5.urgency_not_excuse"
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

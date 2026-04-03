export const spouse_06_structure_v2 = {
  "caseId": "spouse-06",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "스토리가 남편 직접 겨냥 폭로인가",
      "truth": false,
      "truthDescription": "스토리에 이름·회사명은 없었고 문장은 북클럽 초안 복사다. 그러나 배지에 회사 로고가 보이고 주차권 날짜가 컨퍼런스와 일치해 특정인을 가리키는 구조였는지가 판단 포인트다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-1",
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "게시물경계",
      "legitimacyIssue": true,
      "judgmentStatement": "스토리는 특정인을 겨냥했다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "친한 친구 스토리",
        "거짓말은 늘 미안하단 메시지",
        "행사 배지",
        "호텔 주차권",
        "구겨진 셔츠",
        "직접 저격"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "스토리는 특정인을 겨냥했다.",
          "lockedSummary": "겉으로 보이는 사실만 먼저 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse06:a:d-1:act:0",
            "spouse06:b:d-1:act:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "배경",
          "summary": "겉에 드러난 말 뒤의 이유와 방어가 보입니다.",
          "lockedSummary": "배경과 방어 논리는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-1:counter:0",
            "spouse06:b:d-1:counter:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "결정적인 책임과 관계 파열의 핵심이 보입니다.",
          "lockedSummary": "핵심 책임과 관계의 깊은 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:surface:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-1:emotion:0",
            "spouse06:b:d-1:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "knows",
          "b": "misbelief"
        },
        "trapSignals": [
          "배지 로고와 주차권 날짜가 실제 인물을 떠올리게 한다",
          "해시태그가 화면 아래로 밀려 장르 맥락이 사라진다",
          "크롭 캡처가 원래 게시물보다 훨씬 날카롭게 보인다"
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-6"
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
      "name": "친한 친구 목록 공개 범위 관리 책임",
      "truth": true,
      "truthDescription": "서희는 '북클럽용 목록'이라 생각했지만 23명 중 직장 인맥 3명이 섞여 있었다. 둘 다 알면서 정리를 미뤘으므로 관리 실패 책임이 서희에게만 있는지가 쟁점이다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-2",
        "e-3"
      ],
      "correctResponsibility": {
        "a": 75,
        "b": 25
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "게시물경계",
      "legitimacyIssue": false,
      "judgmentStatement": "서희는 목록 관리에 실패했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "친한 친구 23명",
        "김태훈",
        "목록 export",
        "조회 로그",
        "작년 가족행사",
        "목록 방치"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서희는 목록 관리에 실패했다.",
          "lockedSummary": "겉으로 보이는 사실만 먼저 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse06:a:d-2:privacy:0",
            "spouse06:a:d-2:privacy:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "배경",
          "summary": "겉에 드러난 말 뒤의 이유와 방어가 보입니다.",
          "lockedSummary": "배경과 방어 논리는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-2:counter:0",
            "spouse06:a:d-2:privacy:3"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "결정적인 책임과 관계 파열의 핵심이 보입니다.",
          "lockedSummary": "핵심 책임과 관계의 깊은 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-2:privacy:5",
            "spouse06:a:d-2:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "김태훈 캡처 — 확인인가 유포인가",
      "truth": false,
      "truthDescription": "김태훈의 첫 메시지는 '혹시 우람 팀장 건 얘기예요?'로 질문 형태였다. 다만 캡처를 첨부한 시점에서 유통 효과가 발생했는지가 판단 포인트다.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-3",
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 40,
        "b": 60
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "직장복구",
      "legitimacyIssue": true,
      "judgmentStatement": "김태훈은 질문 형태로 메시지를 보냈다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "혹시 우람 팀장 건",
        "질문형 메시지",
        "팀채널 공개 9분 전",
        "팀 선임 DM",
        "캡처 유통",
        "확인인가 유포인가"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "김태훈은 질문 형태로 메시지를 보냈다.",
          "lockedSummary": "겉으로 보이는 사실만 먼저 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse06:a:d-3:motive:0",
            "spouse06:b:d-3:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "배경",
          "summary": "겉에 드러난 말 뒤의 이유와 방어가 보입니다.",
          "lockedSummary": "배경과 방어 논리는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-3:motive:2",
            "spouse06:b:d-3:motive:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "결정적인 책임과 관계 파열의 핵심이 보입니다.",
          "lockedSummary": "핵심 책임과 관계의 깊은 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-3:responsibility:0",
            "spouse06:b:d-3:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "suspects",
          "b": "misbelief"
        },
        "trapSignals": [
          "첫 문장은 질문형인데 캡처 첨부 순간 유통 효과가 생긴다",
          "공개 전 9분이라는 짧은 간격이 악의처럼 보인다",
          "메신저 한 장면만 보면 확인과 유포가 뒤섞인다"
        ],
        "truthExitEvidenceIds": [
          "e-4",
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
      "id": "d-4",
      "name": "팀채널 선제 해명이 소문을 줄였나 키웠나",
      "truth": true,
      "truthDescription": "우람은 서희에게 확인 문자 보내기 6분 전에 팀채널 32명과 HR에 해명문을 올렸다. 김태훈과 선임만 알던 내용을 팀 전체가 알게 됐다. 소문을 막으려는 행동이 범위를 넓혔는지가 핵심이다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-5"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "직장복구",
      "legitimacyIssue": false,
      "judgmentStatement": "팀채널 해명은 소문을 키웠다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "팀채널 32명",
        "HR 문의",
        "6분 전 해명",
        "선조치",
        "해명문",
        "소문 확대"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "팀채널 해명은 소문을 키웠다.",
          "lockedSummary": "겉으로 보이는 사실만 먼저 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse06:b:d-4:institution:0",
            "spouse06:b:d-4:institution:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "배경",
          "summary": "겉에 드러난 말 뒤의 이유와 방어가 보입니다.",
          "lockedSummary": "배경과 방어 논리는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse06:b:d-4:counter:0",
            "spouse06:b:d-4:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "결정적인 책임과 관계 파열의 핵심이 보입니다.",
          "lockedSummary": "핵심 책임과 관계의 깊은 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:surface:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse06:b:d-4:institution:5",
            "spouse06:b:d-4:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "과실 연쇄에서 가장 큰 고리는 누구인가",
      "truth": true,
      "truthDescription": "서희의 모호한 픽션, 김태훈의 오해 캡처, 우람의 32명 대상 선제 해명이 도미노로 이어졌다. 명시적 악의는 없지만 부주의와 성급함이 겹쳤다. 가장 큰 과실 고리가 어디인지가 판단 포인트다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-1",
        "e-2",
        "e-3",
        "e-4",
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": false,
      "judgmentStatement": "가장 큰 과실 고리는 서희이다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "승진 면담 D-3",
        "픽션 초안",
        "오해 캡처",
        "선제 해명",
        "과실 연쇄",
        "직장 복구"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "가장 큰 과실 고리는 서희이다.",
          "lockedSummary": "겉으로 보이는 사실만 먼저 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse06:a:d-5:context:0",
            "spouse06:b:d-5:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "배경",
          "summary": "겉에 드러난 말 뒤의 이유와 방어가 보입니다.",
          "lockedSummary": "배경과 방어 논리는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-5:context:2",
            "spouse06:b:d-5:context:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "결정적인 책임과 관계 파열의 핵심이 보입니다.",
          "lockedSummary": "핵심 책임과 관계의 깊은 층은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:surface:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse06:a:d-5:context:5",
            "spouse06:b:d-5:context:5"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-2:d-1:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 11,
        "grantFlag": "d-1:surface:audience_leak_seen"
      },
      "uiLabel": "닫힌 목록이 아니었다"
    },
    {
      "id": "link:d-1:d-4:retaliation",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-4",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-4:surface:career_alarm_triggered"
      },
      "uiLabel": "직장 반응 촉발"
    },
    {
      "id": "link:d-3:d-4:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-4",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "counterPenalty": 9,
        "grantFlag": "d-4:motive:leak_not_malice"
      },
      "uiLabel": "첫 유통의 성격"
    },
    {
      "id": "link:d-4:d-5:supports",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "core"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-5:core:escalation_path_locked"
      },
      "uiLabel": "확대의 결정타"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "김태훈이 저장한 문제의 친한 친구 스토리 캡처",
      "description": "구겨진 셔츠, 주차권, 배지 위에 '거짓말은 늘 미안하단 메시지로 온다'가 얹힌 스토리 캡처다. 이름은 없지만 배지 로고와 주차권 날짜로 특정인 유추가 가능하다.",
      "type": "social_post",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "third_party",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "김태훈 기기에 저장된 스크린샷 1장만 존재하며, 플랫폼 앱에서 본 전체 보기 화면(해시태그 영역·전후 스토리 포함)은 확보되지 않았다.",
        "check_metadata": "캡처 시각은 게시 후 11분(오후 2:28), 상단 친한 친구 표시가 크롭돼 있어 공개 범위를 판단 불가.",
        "restore_context": "해시태그와 전후 스토리 2장이 빠져 있어 픽션 연재의 일부라는 맥락을 캡처만 보고는 알 수 없다.",
        "verify_source": "갤러리 캡처 시각(14:28)과 선임에게 메시지 보낸 시각(14:31)이 3분 차이로 일치한다.",
        "check_edits": "합성·편집 흔적은 없다. 상단 표시와 하단 해시태그가 크롭돼 있어 의도적인지 우연인지는 불분명.",
        "question_acquisition": "친한 친구 한정 사적 스토리를 캡처해 업무 인맥에게 전송한 자료다. 무단 캡처·유통이라 사생활 침해 소지가 있다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "전서희에게: \"스토리가 남편 직접 겨냥 폭로인가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 전서희의 \"스토리가 남편 직접 겨냥 폭로인가\" 쟁점과 관련된다. 전서희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정우람에게: \"김태훈 캡처 — 확인인가 유포인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 정우람의 \"김태훈 캡처 — 확인인가 유포인가\" 쟁점과 관련된다. 정우람은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "note": "오해가 굳기 전에 형식과 맥락을 분리할수록 효율이 높다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "원본 게시 예약본과 메모앱 초안",
      "description": "북클럽 메모 3회 차에 동일 문장이 이틀 전 작성돼 있고, 예약본에는 해시태그가 있다. 창작 목적을 보여주지만 최종본에서 태그가 안 보인 점은 별도 확인 필요.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "스토리 업로드 예약본(해시태그 포함), 삭제 직전 미리보기 캡처, 메모앱 연재 초안 원본 3건이 함께 제출됐다.",
        "check_metadata": "초안 작성은 목요일 밤(게시 이틀 전), 예약본 저장은 게시 37분 전이다. 며칠 전부터 준비된 창작물임을 보여준다.",
        "restore_context": "예약본에는 해시태그가 상단이었지만 최종 업로드에서 하단으로 밀려 스크롤 없이는 보이지 않게 됐다.",
        "verify_source": "메모앱 클라우드 버전 이력 3건(초안·수정·최종)과 기기 동기화 시각이 모두 일치하여 사후 조작 가능성은 낮다.",
        "check_edits": "캡션 수정은 없다. 사진만 두 차례 크롭됐고, 두 번째에서 배지 글자가 더 흐려졌다.",
        "question_acquisition": "서희 본인 계정의 클라우드 백업과 기기 저장 자료라 확보 절차상 문제없다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "전서희에게: \"스토리가 남편 직접 겨냥 폭로인가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 전서희의 \"스토리가 남편 직접 겨냥 폭로인가\" 쟁점과 관련된다. 전서희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정우람에게: \"과실 연쇄에서 가장 큰 고리는 누구인가\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 정우람의 \"과실 연쇄에서 가장 큰 고리는 누구인가\" 쟁점과 관련된다. 정우람은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
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
            "multiplier": 1.25,
            "note": "시간 순서를 먼저 잠그면 뒤쪽 책임 공방을 정리하기 쉽다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "친한 친구 목록 export와 조회자 로그",
      "description": "친한 친구 목록 23명 명단과 스토리 조회자 로그다. 김태훈이 가족행사 후 추가된 뒤 제거되지 않았고 게시 11분 후 조회 기록이 남아 있다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "플랫폼 '내 데이터 다운로드' 기능으로 추출한 친한 친구 목록 JSON과 해당 스토리 조회자 로그 원본이 제출됐다.",
        "check_metadata": "김태훈 추가일은 가족행사 다음 날이며 이후 제거·재추가 기록 없다. 목록 23명 중 직장 인맥 3명.",
        "restore_context": "서희는 북클럽 공유용이라 주장하지만 대학 동기·북클럽·직장 인맥이 혼재돼 있다.",
        "verify_source": "플랫폼 서버에서 직접 추출한 데이터라 조작 가능성이 없으며, 조회자 로그의 타임스탬프도 서버 시각 기준이다.",
        "check_edits": "서버 추출 원본이므로 사용자 측 편집이 불가능하다. 데이터 무결성이 보장된다.",
        "question_acquisition": "계정 소유자 서희가 자발적으로 다운로드·제출한 자료라 적법하다. 제3자 계정 정보(김태훈 등)가 포함돼 있으나 플랫폼 기본 제공 범위 내다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "전서희에게: \"친한 친구 목록 공개 범위 관리 책임\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 전서희의 \"친한 친구 목록 공개 범위 관리 책임\" 쟁점과 관련된다. 전서희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정우람에게: \"김태훈 캡처 — 확인인가 유포인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 정우람의 \"김태훈 캡처 — 확인인가 유포인가\" 쟁점과 관련된다. 정우람은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.25,
            "note": "시간 순서를 먼저 잠그면 뒤쪽 책임 공방을 정리하기 쉽다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "김태훈-팀 선임 확인 메시지와 스크린샷 전송기록",
      "description": "김태훈이 팀 선임에게 '우람 팀장 건 얘기예요?'라며 캡처를 첨부한 메신저 대화다. 질문 형태이지만 캡처 유통 효과는 별도 판단 필요.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "third_party",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "김태훈-팀 선임 간 메신저 원본 대화 전문과 메시지별 전송 시각 로그가 함께 제출됐다.",
        "check_metadata": "김태훈 첫 메시지 오후 2:31, 우람 해명문 2:40 — 김태훈이 9분 먼저. 소문 확산 순서를 확정하는 핵심 데이터.",
        "restore_context": "'혹시 우람 팀장 건 얘기예요?'는 의문형이다. 확인 시도로 볼 여지가 있지만 캡처 첨부의 유통 효과는 별도 판단 필요.",
        "verify_source": "김태훈 기기 백업본과 팀 선임 기기 백업본의 대화 내용·타임스탬프가 메시지 단위로 일치한다. 어느 한쪽이 삭제하거나 편집한 흔적이 없다.",
        "check_edits": "대화 중간에 삭제된 메시지가 없고, 첨부 캡처 이미지의 크롭·편집 흔적도 확인되지 않는다.",
        "question_acquisition": "대화 당사자인 팀 선임이 동의하여 제출했다. 일방 동의 제출이므로 적법성에 큰 하자 없다."
      },
      "subjectParty": "b",
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
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.3,
            "note": "형식보다 맥락이 중요한 자료라 중반 이후에 들이밀수록 반응이 갈린다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "우람의 팀채널 해명문과 HR 문의 접수내역",
      "description": "우람이 팀채널 32명에게 올린 해명문과 같은 시각 HR 문의 기록이다. 서희에게 확인 문자 보내기 6분 전에 게시됐다는 타임라인이 핵심.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "팀 협업툴(슬랙 유사 플랫폼)에 게시된 해명문 원문과 HR 윤리담당 접수 시스템의 문의 원본이 함께 제출됐다.",
        "check_metadata": "해명문 2:40, 서희에게 첫 문자 2:46 — 아내 확인 6분 전 팀 32명에게 해명. HR 문의는 2:43으로 거의 동시.",
        "restore_context": "해명문에 스크린샷 존재를 언급하면서 김태훈과 선임만 알던 내용을 팀 전체가 알게 된 계기가 됐다.",
        "verify_source": "협업툴 관리자 로그의 게시 시각·작성자 ID와 HR 접수 시스템의 접수번호·시각이 교차 확인돼 일치한다.",
        "check_edits": "협업툴과 HR 시스템 모두 기관 관리 기록이라 사용자가 사후 편집할 수 없는 구조다. 게시 후 수정 이력도 없다.",
        "question_acquisition": "우람 본인 요청으로 최소 범위 비식별 처리 후 제출됐다. 팀원 반응은 포함되지 않았다."
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
          "fact_pursuit"
        ],
        "preferredAngles": [
          "timeline",
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
            "multiplier": 1.25,
            "note": "시간 순서를 먼저 잠그면 뒤쪽 책임 공방을 정리하기 쉽다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "원본 사진 EXIF와 소품 사용 문자",
      "description": "원본 사진 EXIF와 전날 문자 '배지랑 주차권 써도 돼?'가 포함된 자료다. 소품 사용 허락은 보이지만 노출 수준까지 허락했는지는 불분명.",
      "type": "photo",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "스토리에 사용된 원본 사진 파일(EXIF 포함)과 전날 저녁 부부 간 문자 대화 원본이 제출됐다.",
        "check_metadata": "촬영 토요일 오후 1:05, 전날 문자에 서희가 소품 사용을 물었고 우람은 허락했다.",
        "restore_context": "서희는 허락받은 소품이라 주장하지만 어디에 올릴지, 배지 로고 노출 수준까지는 논의되지 않았다.",
        "verify_source": "EXIF 촬영 시각(토요일 오후 1:05)과 문자 서버 기록(전날 밤 허락 문자)이 시간순으로 자연스럽게 이어져 조작 가능성이 낮다.",
        "check_edits": "크롭 전 원본에서 배지 글자가 또렷하다. 크롭 후 흐려졌지만 완전히 사라지지는 않았다.",
        "question_acquisition": "서희 본인이 촬영한 원본 사진과 부부 간 문자 대화라 확보 절차상 문제가 없다. 우람도 자신의 문자가 포함된 점에 동의했다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "전서희에게: \"스토리가 남편 직접 겨냥 폭로인가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 전서희의 \"스토리가 남편 직접 겨냥 폭로인가\" 쟁점과 관련된다. 전서희은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "정우람에게: \"과실 연쇄에서 가장 큰 고리는 누구인가\" 관련 해명 요구 (방어 동기: 수치심 회피)",
          "implication": "이 증거는 정우람의 \"과실 연쇄에서 가장 큰 고리는 누구인가\" 쟁점과 관련된다. 정우람은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "multiplier": 1.3,
            "note": "형식보다 맥락이 중요한 자료라 중반 이후에 들이밀수록 반응이 갈린다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:story_target",
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
          "spouse06:a:d-1:act:4",
          "spouse06:b:d-1:act:4"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "그걸 여기서 바로 특정해 말하긴 어렵습니다.",
        "대상부터 단정하면 제 말이 또 비뚤어집니다."
      ]
    },
    {
      "id": "fq:d-1:prop_identity",
      "intentTag": "context_check",
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
          "spouse06:a:d-1:act:4",
          "spouse06:b:d-1:act:4"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "그건 지금 바로 한 줄로 답하기 어렵습니다.",
        "맥락을 빼고 그 질문만 받으면 또 왜곡됩니다."
      ]
    },
    {
      "id": "fq:d-2:audience_scope",
      "intentTag": "responsibility_check",
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
          "spouse06:a:d-2:privacy:4"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "책임만 따로 떼어 말하면 맥락이 빠집니다.",
        "그 부분은 앞뒤를 같이 봐야 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:first_forward",
      "intentTag": "authenticity_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "spouse06:a:d-3:responsibility:0",
          "spouse06:b:d-3:responsibility:0"
        ],
        "preferredAngleTags": [
          "identity",
          "context"
        ]
      },
      "refusalTemplates": [
        "그걸 여기서 바로 특정해 말하긴 어렵습니다.",
        "대상부터 단정하면 제 말이 또 비뚤어집니다."
      ]
    },
    {
      "id": "fq:d-4:team_channel_order",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "spouse06:b:d-4:fear:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 순서를 지금 단정해서 말하고 싶진 않습니다.",
        "시점만 따로 떼면 또 다른 오해가 생깁니다."
      ]
    },
    {
      "id": "fq:d-5:creative_intent",
      "intentTag": "motive_check",
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
          "spouse06:a:d-5:context:4",
          "spouse06:b:d-5:context:4"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 감정은 지금 쉽게 한 문장으로 못 자르겠습니다.",
        "의도부터 확정해 말하면 또 방어적으로 들릴 겁니다."
      ]
    },
    {
      "id": "fq:d-5:chain_fault",
      "intentTag": "responsibility_check",
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
          "spouse06:a:d-5:context:4",
          "spouse06:b:d-5:context:4"
        ],
        "preferredAngleTags": [
          "responsibility",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "책임만 따로 떼어 말하면 맥락이 빠집니다.",
        "그 부분은 앞뒤를 같이 봐야 답할 수 있습니다."
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
  }
} as const;

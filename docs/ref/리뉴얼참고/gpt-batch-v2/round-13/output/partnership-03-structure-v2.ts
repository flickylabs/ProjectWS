export const partnership03StructureV2 = {
  "caseId": "partnership-03",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "도윤의 무통보 런오브쇼 수정",
      "disputeKind": "core_truth",
      "truthDescription": "도윤은 최종 확인 없이 새벽 0시 47분 공유 캘린더 첨부 아젠다를 수정해 자신을 오프닝 발표자로 올렸다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 66,
        "b": 34
      },
      "disputeAliases": [
        "도윤의 무통보 런오브쇼 수정",
        "도윤 lead",
        "공유 캘린더 아젠다",
        "새벽 0시 47분",
        "공유 캘린더 아젠다 수정",
        "IR 컨설턴트 음성메모·단톡"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "도윤의 무통보 런오브쇼 수정",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-03:a:d-1:denial:0",
            "partnership-03:b:d-1:counter:0"
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
            "partnership-03:a:d-1:motive:0",
            "partnership-03:b:d-1:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "도윤은 최종 확인 없이 새벽 0시 47분 공유 캘린더 첨부 아젠다를 수정해 자신을 오프닝 발표자로 올렸다.",
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
            "partnership-03:a:d-1:admission:0",
            "partnership-03:b:d-1:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "서린의 단독 발표용 덱 출력 지시",
      "disputeKind": "core_truth",
      "truthDescription": "서린은 도윤과 재확인하기 전에 디자이너에게 자신의 오프닝 스크립트가 들어간 단독 발표용 덱과 인쇄본을 먼저 뽑아달라고 지시했다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 38,
        "b": 62
      },
      "disputeAliases": [
        "서린의 단독 발표용 덱 출력 지시",
        "내 오프닝 버전 먼저",
        "디자인 툴 코멘트",
        "디자인 툴 덱 코멘트",
        "도윤의 캘린더 수정 12분 뒤",
        "새벽"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "서린의 단독 발표용 덱 출력 지시",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-03:a:d-2:counter:0",
            "partnership-03:b:d-2:denial:0"
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
            "partnership-03:a:d-2:motive:0",
            "partnership-03:b:d-2:motive:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "서린은 도윤과 재확인하기 전에 디자이너에게 자신의 오프닝 스크립트가 들어간 단독 발표용 덱과 인쇄본을 먼저 뽑아달라고 지시했다.",
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
            "partnership-03:a:d-2:admission:0",
            "partnership-03:b:d-2:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "상대가 일부러 약속을 깨고 발표권을 빼앗았는가",
      "disputeKind": "shared_misconception",
      "truthDescription": "둘 다 상대의 악의적 탈취라고 믿었지만, 실제로는 같은 IR 음성메모와 자동 생성된 캘린더 문구를 서로 다르게 해석한 공유 오해였다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 49,
        "b": 51
      },
      "disputeAliases": [
        "상대가 일부러 약속을 깨고 발표권을 빼앗았는가",
        "lead presenter",
        "IR 컨설턴트 음성메모",
        "처음은 내가 끊을게",
        "도윤 lead",
        "IR 컨설턴트 음성메모·단톡"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "상대가 일부러 약속을 깨고 발표권을 빼앗았는가",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-03:a:d-3:denial:0",
            "partnership-03:b:d-3:denial:0"
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
            "partnership-03:a:d-3:responsibility:0",
            "partnership-03:b:d-3:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "둘 다 상대의 악의적 탈취라고 믿었지만, 실제로는 같은 IR 음성메모와 자동 생성된 캘린더 문구를 서로 다르게 해석한 공유 오해였다.",
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
            "partnership-03:a:d-3:admission:0",
            "partnership-03:b:d-3:admission:0"
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
          "'처음은 내가 끊을게' 크롭 캡처",
          "'lead presenter' 자동 문구",
          "파일명 하나를 의도 전체로 읽는 습관"
        ],
        "truthExitEvidenceIds": [
          "e-4",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-4",
      "name": "전날 밤 10시 문서화 약속의 쌍방 위반",
      "disputeKind": "sub_truth",
      "truthDescription": "두 사람은 발표 역할을 캘린더 아젠다에 확정하겠다는 기존 약속을 어기고, 각각 다른 버전으로 리허설을 진행하면서도 다시 확인하지 않았다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 52,
        "b": 48
      },
      "disputeAliases": [
        "전날 밤 10시 문서화 약속의 쌍방 위반",
        "전날 밤 10시까지 역할 문서화",
        "공유 캘린더 아젠다",
        "자신이 오프닝을 맡는 12분 버전",
        "서린 오프닝 11분 버전",
        "자신이 11분을 끊는 버전"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "전날 밤 10시 문서화 약속의 쌍방 위반",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-03:a:d-4:denial:0",
            "partnership-03:b:d-4:denial:0"
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
            "partnership-03:a:d-4:responsibility:0",
            "partnership-03:b:d-4:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "두 사람은 발표 역할을 캘린더 아젠다에 확정하겠다는 기존 약속을 어기고, 각각 다른 버전으로 리허설을 진행하면서도 다시 확인하지 않았다.",
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
            "partnership-03:a:d-4:admission:0",
            "partnership-03:b:d-4:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "투자자 측의 실제 발표 요청 범위",
      "disputeKind": "sub_truth",
      "truthDescription": "투자자 측이 원한 것은 첫 4분 오프닝과 시간관리만 한 사람이 맡는 구조였지, 회의 전체를 한 명이 주도하라는 요청은 아니었다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "disputeAliases": [
        "투자자 측의 실제 발표 요청 범위",
        "첫 4분 오프닝과 시간관리만 한 사람이 맡는 구조",
        "회의 전체를 한 명이 리드해야 한다는 요청",
        "한 명이 회의 전체를 주도하라는 요청",
        "lead presenter 문구와 컨설턴트 음성메모",
        "공유 캘린더 아젠다 수정"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "투자자 측의 실제 발표 요청 범위",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "partnership-03:a:d-5:denial:0",
            "partnership-03:b:d-5:denial:0"
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
            "partnership-03:a:d-5:responsibility:0",
            "partnership-03:b:d-5:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "투자자 측이 원한 것은 첫 4분 오프닝과 시간관리만 한 사람이 맡는 구조였지, 회의 전체를 한 명이 주도하라는 요청은 아니었다.",
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
            "partnership-03:a:d-5:admission:0",
            "partnership-03:b:d-5:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-5:d-1:weakens_counter",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -10,
        "grantFlag": "d-1:weakens_counter:edge_01"
      },
      "uiLabel": "실제 투자자 요청 범위가 무통보 수정을 약화"
    },
    {
      "id": "link:d-5:d-3:unlocks_layer",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-3",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-3:unlocks_layer:edge_02"
      },
      "uiLabel": "요청 범위가 오해의 핵심을 연다"
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
        "grantFlag": "d-4:retaliation:edge_03"
      },
      "uiLabel": "단독 출력 지시가 문서화 위반을 확대"
    },
    {
      "id": "link:d-1:d-3:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 11,
        "grantFlag": "d-3:supports:edge_04"
      },
      "uiLabel": "새벽 수정이 의도 오해의 불씨가 됨"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "공유 캘린더 아젠다 수정 이력",
      "description": "리드 투자사 미팅 초대장에 첨부된 런오브쇼 문서와 캘린더 수정 로그로, 도윤이 새벽 0시 47분 자신을 오프닝 발표자로 올린 기록이다.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "캘린더 활동 로그와 첨부 문서 버전 기록이 함께 확보됐다.",
        "check_metadata": "마지막 편집자는 도윤 계정이며 수정 시각은 리허설 종료 후 31분 뒤다.",
        "restore_context": "기존 안에는 '서린 오프닝 5분 / 도윤 데모 7분'으로 남아 있었으나, 최종본에는 '도윤 lead'로 바뀌어 있다.",
        "verify_source": "플랫폼 감사 로그와 문서 히스토리가 일치한다.",
        "check_edits": "삭제와 삽입 이력이 모두 남아 있어 조작 흔적은 없다.",
        "question_acquisition": "회사 공용 일정과 문서 기록이라 적법하게 확보됐다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"도윤의 무통보 런오브쇼 수정\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 강도윤의 \"도윤의 무통보 런오브쇼 수정\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "나서린에게: \"전날 밤 10시 문서화 약속의 쌍방 위반\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 나서린의 \"전날 밤 10시 문서화 약속의 쌍방 위반\" 쟁점과 관련된다. 나서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.2,
            "note": "d-1의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.3,
            "note": "d-4의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "디자인 툴 덱 출력 요청 로그",
      "description": "서린이 새벽에 디자이너에게 자신의 오프닝 스크립트가 포함된 발표자용 덱과 인쇄본을 먼저 뽑아달라고 남긴 코멘트 기록이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-2"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "디자인 툴 코멘트와 자동 저장된 덱 사본이 원본 그대로 확보됐다.",
        "check_metadata": "지시 시각은 도윤의 캘린더 수정 12분 뒤이며 서린 계정으로 기록돼 있다.",
        "restore_context": "서린은 '내 오프닝 버전 먼저'라고 적었지만, 도윤 파트를 영구 삭제하라는 말은 남기지 않았다.",
        "verify_source": "디자이너 계정 알림 로그와 댓글 원문이 일치한다.",
        "check_edits": "댓글 수정 흔적 없이 원문이 남아 있다.",
        "question_acquisition": "회사 디자인 협업 도구 기록이라 적법하다."
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
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "크롭된 메신저 캡처",
      "description": "한밤중 대화 중 '처음은 내가 끊을게'라는 한 줄만 남은 캡처로, 누구의 발언인지와 앞뒤 맥락이 빠져 있다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1",
        "d-2",
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "전체 대화 내보내기는 제출되지 않았고 화면 캡처 한 장만 있다.",
        "check_metadata": "캡처 저장 시각은 오전 1시 08분으로, 긴장된 리허설 직후다.",
        "restore_context": "누가 무엇을 어떤 범위까지 맡는지를 알 수 있는 앞뒤 문장이 잘려 있어 단독 증거로는 의미가 약하다.",
        "verify_source": "양측 모두 자신의 대화가 맞다고 인정하지만 원본 전문은 아직 없다.",
        "check_edits": "문자열 변조 흔적은 없으나 선택적 크롭이 명확하다.",
        "question_acquisition": "사적 메신저 캡처라 제출 범위와 사생활 침해 여부를 따져야 한다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"도윤의 무통보 런오브쇼 수정\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 강도윤의 \"도윤의 무통보 런오브쇼 수정\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "나서린에게: \"서린의 단독 발표용 덱 출력 지시\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 나서린의 \"서린의 단독 발표용 덱 출력 지시\" 쟁점과 관련된다. 나서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.3,
            "note": "d-2의 주장을 압박할 때 효율이 높습니다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "IR 컨설턴트 음성메모와 원본 단톡",
      "description": "오세진 컨설턴트가 '첫 10분은 한 명이 끊고 숫자랑 제품은 바로 넘기자'고 말한 음성메모와, 이를 두 사람이 서로 다르게 해석하는 원본 대화다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3"
      ],
      "isTrap": false,
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "양측 기기와 컨설턴트 계정에서 동일한 음성파일과 단톡 내보내기 파일이 확인됐다.",
        "check_metadata": "음성메모는 전날 밤 11시 18분에 발송됐고, 각자 해석이 갈리는 답장은 7분 간격으로 이어졌다.",
        "restore_context": "컨설턴트 문장 자체가 오프닝 담당자와 전체 리드 발표자를 명확히 구분하지 않아 중첩 해석이 가능했다.",
        "verify_source": "음성 길이, 해시값, 단톡 타임스탬프가 모두 일치한다.",
        "check_edits": "본문 조작 흔적 없이 삭제 복원만 일부 존재한다.",
        "question_acquisition": "공동 경영 논의를 담은 자료여서 제출 정당성은 높다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"도윤의 무통보 런오브쇼 수정\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 강도윤의 \"도윤의 무통보 런오브쇼 수정\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "나서린에게: \"상대가 일부러 약속을 깨고 발표권을 빼앗았는가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 나서린의 \"상대가 일부러 약속을 깨고 발표권을 빼앗았는가\" 쟁점과 관련된다. 나서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "establish",
        "bestAtStates": [
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "context"
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
      "name": "리허설 체크리스트와 회의실 화이트보드 사진",
      "description": "전날 밤 리허설 체크리스트, 회의실 화이트보드 사진, 발표 스톱워치 메모로 두 사람이 서로 다른 버전으로 리허설했다는 기록이다.",
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
        "e-2"
      ],
      "investigationResults": {
        "request_original": "화이트보드 사진 원본과 체크리스트 파일, 스톱워치 스크린샷이 함께 확보됐다.",
        "check_metadata": "서린 체크리스트에는 자신이 11분을 맡는 안이, 도윤 메모에는 자신이 12분을 맡는 안이 따로 적혀 있다.",
        "restore_context": "둘 다 상대가 이미 다른 안으로 준비 중이라는 신호를 봤지만, 밤 10시 문서 확정 절차를 다시 열지 않았다.",
        "verify_source": "회의실 예약 기록과 사진 촬영 시각이 맞아떨어진다.",
        "check_edits": "메타데이터와 이미지 원본에서 편집 흔적이 없다.",
        "question_acquisition": "회사 회의실과 공용 문서 기록이라 적법하게 수집됐다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"전날 밤 10시 문서화 약속의 쌍방 위반\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 강도윤의 \"전날 밤 10시 문서화 약속의 쌍방 위반\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "나서린에게: \"서린의 단독 발표용 덱 출력 지시\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 나서린의 \"서린의 단독 발표용 덱 출력 지시\" 쟁점과 관련된다. 나서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
      "id": "e-6",
      "name": "투자사 어소시에이트 확인 메일과 초대장 템플릿 설명",
      "description": "백지수가 보낸 확인 메일로, 투자자 측은 첫 4분 오프닝과 시간관리 담당만 한 명으로 정해달라고 했고 초대장 템플릿의 'lead presenter' 문구가 자동 삽입됐다는 설명이다.",
      "type": "email",
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
        "e-1"
      ],
      "investigationResults": {
        "request_original": "메일 헤더, 첨부 템플릿 설명, 회신 스레드 전체가 확보됐다.",
        "check_metadata": "최초 회신은 미팅 하루 전 오후였고, 자동 템플릿 문구가 붙은 시각도 서버 로그로 확인된다.",
        "restore_context": "투자자 측 요청은 전체 단독 발표가 아니라 시작 4분의 흐름 정리와 타임키핑에 한정돼 있었다.",
        "verify_source": "투자사 도메인 인증과 캘린더 시스템 로그가 서로 일치한다.",
        "check_edits": "헤더 포함 원본이라 편집 흔적이 없다.",
        "question_acquisition": "제3자 미팅 운영 자료지만 분쟁 해결 목적 제출은 허용됐다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "강도윤에게: \"상대가 일부러 약속을 깨고 발표권을 빼앗았는가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 강도윤의 \"상대가 일부러 약속을 깨고 발표권을 빼앗았는가\" 쟁점과 관련된다. 강도윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "나서린에게: \"상대가 일부러 약속을 깨고 발표권을 빼앗았는가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 나서린의 \"상대가 일부러 약속을 깨고 발표권을 빼앗았는가\" 쟁점과 관련된다. 나서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
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
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.25,
            "note": "d-3의 주장을 압박할 때 효율이 높습니다."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.35,
            "note": "d-5의 주장을 압박할 때 효율이 높습니다."
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
          "partnership-03:a:d-1:act:1",
          "partnership-03:b:d-1:act:0"
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
          "partnership-03:a:d-1:act:0",
          "partnership-03:b:d-1:act:0"
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
          "partnership-03:a:d-3:evidence:0",
          "partnership-03:b:d-3:evidence:0"
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
          "partnership-03:a:d-2:motive:0",
          "partnership-03:b:d-2:motive:0"
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
          "partnership-03:a:d-4:responsibility:0",
          "partnership-03:b:d-4:responsibility:0"
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
          "partnership-03:a:d-5:context:0",
          "partnership-03:b:d-5:context:0"
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
          "partnership-03:a:d-1:emotion:0",
          "partnership-03:b:d-1:emotion:0"
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

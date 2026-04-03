export const workplace11StructureV2 = {
  "caseId": "workplace-11",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "발명자 삭제와 성과 단독화",
      "summary": "태준은 서린의 핵심 청구항·실험표를 출원 브리핑에 넣으면서 기여표와 슬라이드에서 서린 이름을 지우고 대표 성과로 제시했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "발명자 표기",
        "기여표 수정",
        "대표 슬라이드",
        "노서린 이름",
        "청구항 기여",
        "성과 단독화"
      ],
      "requiredEvidenceIds": [
        "e-1",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 80,
        "b": 20
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "발명자 삭제와 성과 단독화의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-11:a:d-1:rule:0",
            "workplace-11:b:d-1:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "발명자 삭제와 성과 단독화에 얽힌 이유와 방어",
          "lockedSummary": "왜 그렇게 움직였는지는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:timeline_pressed"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-1:context:1",
            "workplace-11:b:d-1:admission:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "발명자 삭제와 성과 단독화의 최종 책임과 남는 상처",
          "lockedSummary": "핵심 책임과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:core:emotion_opened"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-1:responsibility:3",
            "workplace-11:b:d-1:responsibility:3"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "브로커 우회 접촉과 전달",
      "summary": "서린은 승인 없이 개인 메일·텔레그램으로 브로커에게 청구항 정리본과 실험 요약 ZIP을 보내고 수수료를 논의했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "개인메일 ZIP",
        "텔레그램 수수료",
        "외부 브로커",
        "유다인",
        "승인 없는 전달",
        "정리본"
      ],
      "requiredEvidenceIds": [
        "e-2"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "legitimacyIssue": true,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "브로커 우회 접촉과 전달의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-11:b:d-2:denial:0",
            "workplace-11:a:d-2:rule:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "브로커 우회 접촉과 전달에 얽힌 이유와 방어",
          "lockedSummary": "왜 그렇게 움직였는지는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:identity_checked"
            ]
          },
          "revealAtomIds": [
            "workplace-11:b:d-2:context:1",
            "workplace-11:a:d-2:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "브로커 우회 접촉과 전달의 최종 책임과 남는 상처",
          "lockedSummary": "핵심 책임과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:evidence_aired"
            ]
          },
          "revealAtomIds": [
            "workplace-11:b:d-2:responsibility:3",
            "workplace-11:a:d-2:responsibility:3"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "유출 범위 — 브로커 1건인가",
      "summary": "브로커 1건만 생각했지만, 작업 링크 재공유와 파라리걸 자동 전달로 패키지 일부가 경쟁사 자문 변리사 폴더까지 넘어갔다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "DLP 경보 캡처",
        "재공유 링크",
        "브로커 1건",
        "파라리걸 전달",
        "경쟁사 자문 폴더",
        "유출 범위"
      ],
      "requiredEvidenceIds": [
        "e-3",
        "e-4",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "유출 범위 — 브로커 1건인가의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-11:a:d-3:uncertainty:0",
            "workplace-11:b:d-3:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "유출 범위 — 브로커 1건인가가 왜 오해로 굳어졌는지",
          "lockedSummary": "왜 그렇게 움직였는지는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
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
            "workplace-11:a:d-3:evidence:1",
            "workplace-11:b:d-3:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "유출 범위 — 브로커 1건인가의 실제 사실선과 해소 지점",
          "lockedSummary": "핵심 책임과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d-3:motive:misbelief_shaken"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-3:responsibility:3",
            "workplace-11:b:d-3:responsibility:3"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "weaponizes",
          "b": "misbelief"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "겉보기 단서가 먼저 의심을 만든다.",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "오해를 사실처럼 붙잡고 방어한다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석이 말의 기준이 된다.",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "원본 맥락이 열리며 확신이 흔들린다.",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해가 걷히고 실제 사실선이 드러난다.",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "잘린 DLP 경보 캡처",
          "재공유 가능한 작업 링크",
          "브로커 한 건만 본 요약"
        ],
        "truthExitEvidenceIds": [
          "e-4",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해가 걷히고 실제 사실선이 드러난다."
      }
    },
    {
      "id": "d-4",
      "name": "선행 기밀위험 낙인",
      "summary": "사실 확인 전 태준은 HR 평가에 서린을 '기밀취급 위험'으로 먼저 적고 브리핑·발표 권한을 축소했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "기밀취급 위험",
        "HR 평가 초안",
        "발표 제외",
        "선행 낙인",
        "보안 감사",
        "포렌식 전"
      ],
      "requiredEvidenceIds": [
        "e-5"
      ],
      "correctResponsibility": {
        "a": 85,
        "b": 15
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "선행 기밀위험 낙인의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-11:a:d-4:rule:0",
            "workplace-11:b:d-4:evidence:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "선행 기밀위험 낙인에 얽힌 이유와 방어",
          "lockedSummary": "왜 그렇게 움직였는지는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:legality_seen"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-4:context:1",
            "workplace-11:b:d-4:admission:2"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "선행 기밀위험 낙인가 본건의 책임선을 어떻게 바꾸는지",
          "lockedSummary": "핵심 책임과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-4:responsibility:3",
            "workplace-11:b:d-4:responsibility:3"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "다툼의 공모 은폐 설계 여부",
      "summary": "겉으로는 발명자 다툼으로 서로를 고발했지만, 실제로는 브로커에게 자료를 넘기고 책임을 분산할 수 있게 갈등을 연출한 공모였다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "연출된 발명자 다툼",
        "공모 은폐",
        "수수료 분배",
        "갈등 연출",
        "책임 분산",
        "브로커 공모"
      ],
      "requiredEvidenceIds": [
        "e-1",
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "다툼의 공모 은폐 설계 여부의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-11:a:d-5:context:1",
            "workplace-11:b:d-5:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "다툼의 공모 은폐 설계 여부에 얽힌 이유와 방어",
          "lockedSummary": "왜 그렇게 움직였는지는 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:surface:context_checked"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-5:context:1",
            "workplace-11:b:d-5:context:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "다툼의 공모 은폐 설계 여부가 본건의 책임선을 어떻게 바꾸는지",
          "lockedSummary": "핵심 책임과 관계 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:motive_opened"
            ]
          },
          "revealAtomIds": [
            "workplace-11:a:d-5:responsibility:3",
            "workplace-11:b:d-5:responsibility:3"
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
        "grantFlag": "d-5:surface:credit_conflict_cover"
      },
      "uiLabel": "삭제가 공모 은폐와 맞물림"
    },
    {
      "id": "link:d-2:d-3:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-3",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-3:surface:broker_path_opened"
      },
      "uiLabel": "우회 전달이 범위 확대를 부름"
    },
    {
      "id": "link:d-4:d-1:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-1:motive:stigma_path_seen"
      },
      "uiLabel": "선행 낙인이 공로 다툼을 키움"
    },
    {
      "id": "link:d-3:d-5:unlocks_layer",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "unlocks_layer",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "unlockLayer": "core",
        "grantFlag": "d-5:core:spread_beyond_broker"
      },
      "uiLabel": "브로커 밖 확산이 공모를 드러냄"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "발명자 기여표와 잠정출원 초안 버전 이력",
      "description": "서린 청구항 초안에서 태준 최종 슬라이드까지 발명자 표기가 바뀌는 과정을 보여 주는 기여표·출원초안 묶음.",
      "type": "institutional_note",
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
        "request_original": "발명신고서·기여표·출원 초안의 버전 이력을 함께 열어야 한다.",
        "check_metadata": "서린 계정의 핵심 청구항 입력 후 브리핑 직전 태준 계정에서 발명자 표기 열이 수정됐다.",
        "restore_context": "태준이 발표 구조를 정리한 것은 맞지만 청구항 뼈대는 서린 초안에서 왔다.",
        "verify_source": "연구소 드라이브 버전과 특허관리 시스템 문서 ID가 동일하게 연결된다.",
        "check_edits": "버전 이력 기반 — 사후 편집 흔적 없이 변경 단계 보존.",
        "question_acquisition": "회사 지식재산 문서 — 감사·분쟁 해결 목적 적법 열람."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "권태준에게: \"발명자 삭제와 성과 단독화\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 권태준의 \"발명자 삭제와 성과 단독화\" 쟁점과 관련된다. 권태준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "노서린에게: \"다툼의 공모 은폐 설계 여부\" 관련 해명 요구 (방어 동기: 복수심)",
          "implication": "이 증거는 노서린의 \"다툼의 공모 은폐 설계 여부\" 쟁점과 관련된다. 노서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "S5"
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
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          },
          {
            "disputeId": "d-5",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "서린의 개인메일 전달본과 텔레그램 수수료 대화",
      "description": "서린이 브로커에게 암호화 ZIP을 보낸 개인메일과 수수료 단가를 논의한 텔레그램 캡처.",
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
        "request_original": "캡처뿐 아니라 발신 헤더와 텔레그램 원문 내보내기를 함께 확인해야 한다.",
        "check_metadata": "내부검토 전날 밤 서린 계정에서 ZIP 발송과 수수료 논의가 연속으로 남아 있다.",
        "restore_context": "'설명용 정리본'이라 주장하지만 첨부에 청구항 문장과 실험 요약이 함께 들어 있다.",
        "verify_source": "개인 메일 헤더와 브로커 수신 단말이 동일 파일 해시를 가리킨다.",
        "check_edits": "변조 없으나 답장·첨부 일부 절삭 — 범위 확인에 원문 대조 필요.",
        "question_acquisition": "개인 단말·사설 메신저 포함 — 조사 목적 외 재배포 제한."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "권태준에게: \"다툼의 공모 은폐 설계 여부\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 권태준의 \"다툼의 공모 은폐 설계 여부\" 쟁점과 관련된다. 권태준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "노서린에게: \"브로커 우회 접촉과 전달\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 노서린의 \"브로커 우회 접촉과 전달\" 쟁점과 관련된다. 노서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present",
          "motive_search"
        ],
        "preferredAngles": [
          "identity",
          "emotion"
        ],
        "blockedVectorsHelp": [
          "identity",
          "emotion"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.22,
            "note": "보낸 대상과 감정의 결을 함께 흔들 수 있다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.22,
            "note": "보낸 대상과 감정의 결을 함께 흔들 수 있다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "태준이 제출한 DLP 경보 캡처 PDF",
      "description": "서린 계정만 강조된 DLP 경보 PDF. 단독 유출처럼 보이지만 재전송 열과 세션 정보가 잘려 있다.",
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
        "request_original": "PDF뿐 아니라 경보 원본 이벤트와 연관 링크 로그를 함께 봐야 한다.",
        "check_metadata": "서린 이벤트만 보이고 같은 시간대 재전송 열·수신 세션 정보가 잘려 있다.",
        "restore_context": "단독으론 서린 유출처럼 보이지만 링크 생성자·재열람자 정보가 빠져 있다.",
        "verify_source": "플랫폼 형식과 유사하지만 관리자 리포트 전체 열 구성과 다르다.",
        "check_edits": "변조 없으나 절삭·강조로 서린 단독 유출 프레임이 과장됐다.",
        "question_acquisition": "태준 자발 제출 — 입수 적법하지만 완전성 별도 검증 필요."
      },
      "subjectParty": "b",
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.4,
            "note": "잘린 자료나 요약 프레임을 걷어낼 때 효율이 높다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "메일 게이트웨이 원본 로그와 외부공유 링크 재전송 기록",
      "description": "작업 링크가 브로커 → 파라리걸 → 경쟁사 자문 폴더로 재전달된 경로를 보여 주는 게이트웨이·링크 로그.",
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
        "e-3"
      ],
      "investigationResults": {
        "request_original": "요약이 아니라 원본 SMTP 로그와 링크 리디렉션 표를 함께 열어야 한다.",
        "check_metadata": "브로커 수신 7분 뒤 파라리걸이 같은 링크를 열고 경쟁사 자문 도메인으로 재공유한 세션이 확인된다.",
        "restore_context": "1:1 브로커 검토를 넘어 경쟁사 자문까지 퍼진 것은 링크 설정과 재전송이 겹친 결과였다.",
        "verify_source": "보안 게이트웨이 로그와 외부세션 CSV가 동일 링크 해시를 가리킨다.",
        "check_edits": "플랫폼 원본 추출본 — 사후 편집 흔적 없음.",
        "question_acquisition": "보안사고 조사 범위 원본 로그 — 적법성 높음."
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
          "S5"
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
            "disputeId": "d-3",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "HR 평가 초안과 기밀취급 위험 메모",
      "description": "포렌식 결과 전에 태준이 서린을 '기밀위험'으로 적고 브리핑을 줄인 HR 평가·보안 메모.",
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
        "request_original": "요약이 아니라 초기 입력본·수정본·브리핑 배정 변경 기록을 함께 확인해야 한다.",
        "check_metadata": "포렌식 결과 전 태준 계정에서 '기밀위험' 코멘트와 발표 제외 메모가 먼저 입력됐다.",
        "restore_context": "예방이라 주장하지만 발명자 다툼과 결합된 선행 낙인이 인사·역할에 반영됐다.",
        "verify_source": "HR 로그와 브리핑 일정 변경 기록이 동일 시간 순서.",
        "check_edits": "초기본·수정본 모두 남아 사후 미화 여부 구분 가능.",
        "question_acquisition": "인사자료 — 분쟁 해결 목적 외 공개 제한."
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
          "S5"
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
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          },
          {
            "disputeId": "d-4",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "외부 브로커 송장과 가상자산 입금 추적 포렌식 정리",
      "description": "브로커 송장, 둘에게 연결된 지갑 입금 내역, 경쟁사 자문 폴더 도달 경로를 묶은 포렌식 정리.",
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
        "e-2"
      ],
      "investigationResults": {
        "request_original": "송장뿐 아니라 지갑 거래내역, 해시 비교표, 브로커 계약 메모를 함께 봐야 한다.",
        "check_metadata": "수수료가 둘의 별도 지갑으로 분할 입금, 경쟁사 자문 폴더 도달이 직후로 남아 있다.",
        "restore_context": "공동 대가 기대와 자료 전달, 통제 밖 유출 확장 경로가 한 번에 확인된다.",
        "verify_source": "가상자산 추적, 송장 번호, 게이트웨이 사건 ID가 서로 대응.",
        "check_edits": "감사팀 서명본·원본 거래 로그 — 사후 편집 흔적 없음.",
        "question_acquisition": "감사·법무 검토 확보 자료 — 적법하지만 외부 인물 식별 정보 최소 공개."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "권태준에게: \"다툼의 공모 은폐 설계 여부\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 권태준의 \"다툼의 공모 은폐 설계 여부\" 쟁점과 관련된다. 권태준은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "노서린에게: \"유출 범위 — 브로커 1건인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 노서린의 \"유출 범위 — 브로커 1건인가\" 쟁점과 관련된다. 노서린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "S5"
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
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          },
          {
            "disputeId": "d-5",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:inventor_order",
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
          "workplace-11:a:d-1:admission:2"
        ],
        "preferredAngleTags": [
          "timeline",
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 순서를 길게 풀고 싶지 않습니다.",
        "시점을 다 펼치면 제 판단이 먼저 드러납니다."
      ]
    },
    {
      "id": "fq:d-1:why_removed_name",
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
        "disputeId": "d-1",
        "allowAtomIds": [
          "workplace-11:a:d-1:responsibility:3",
          "workplace-11:a:d-1:emotion:4"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 이유를 바로 말하면 제 속내가 먼저 열립니다.",
        "동기까지는 아직 정리해서 말하고 싶지 않습니다."
      ]
    },
    {
      "id": "fq:d-2:broker_channel",
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
        "disputeId": "d-2",
        "allowAtomIds": [
          "workplace-11:b:d-2:admission:2"
        ],
        "preferredAngleTags": [
          "identity",
          "legality"
        ]
      },
      "refusalTemplates": [
        "지금은 그 대상을 특정해 말하고 싶지 않습니다.",
        "이름을 바로 꺼내면 다른 해명까지 엮입니다."
      ]
    },
    {
      "id": "fq:d-4:risk_memo_order",
      "intentTag": "responsibility_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S5"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "workplace-11:a:d-4:admission:2",
          "workplace-11:a:d-4:admission:5"
        ],
        "preferredAngleTags": [
          "legality",
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "책임 표현으로 바로 묶는 건 아직 받아들이기 어렵습니다.",
        "그 부분은 평가처럼 들려 지금은 답을 줄이겠습니다."
      ]
    },
    {
      "id": "fq:d-5:cover_story",
      "intentTag": "context_check",
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
          "workplace-11:a:d-5:admission:2",
          "workplace-11:a:d-5:admission:5"
        ],
        "preferredAngleTags": [
          "context",
          "motive"
        ]
      },
      "refusalTemplates": [
        "배경을 다 펼치면 다른 사람 이야기까지 함께 나옵니다.",
        "상황 맥락은 아직 조심스럽습니다."
      ]
    },
    {
      "id": "fq:d-5:collusion_fear",
      "intentTag": "emotion_check",
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
          "workplace-11:b:d-5:emotion:4"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "감정부터 말하면 제가 더 무너질 것 같습니다.",
        "그 감정은 지금 꺼내기 어렵습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-5"
    ],
    "playerStyleTagCandidates": [
      "evidence_closer",
      "trap_chaser",
      "pressure_heavy",
      "rapport_heavy"
    ]
  },
  "proposedUnlockAtoms": []
};

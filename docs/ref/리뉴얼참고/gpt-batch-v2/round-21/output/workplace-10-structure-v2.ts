export const workplace10StructureV2 = {
  "caseId": "workplace-10",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "반복된 전환 약속과 막판 번복",
      "summary": "도현은 '런칭만 넘기면 올릴게'라며 세 차례 핵심 업무를 맡겨 놓고, 막판에 기준과 시점을 바꾸며 전환을 미뤘다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "전환안 올릴게",
        "런칭 끝나면",
        "세 번 약속",
        "야간 인수인계",
        "막판 번복",
        "장혜린"
      ],
      "requiredEvidenceIds": [
        "e-1",
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 75,
        "b": 25
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "반복된 전환 약속과 막판 번복의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-10:a:d-1:denial:0",
            "workplace-10:b:d-1:quote:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "반복된 전환 약속과 막판 번복에 얽힌 이유와 방어",
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
            "workplace-10:a:d-1:beneficiary:0",
            "workplace-10:b:d-1:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "반복된 전환 약속과 막판 번복의 최종 책임과 남는 상처",
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
            "workplace-10:a:d-1:fear:0",
            "workplace-10:b:d-1:harm:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "이중 계약과 근무시간 은폐",
      "summary": "혜린은 전환 발표 전 타사와 겹치는 고정 근무 계약을 체결하고 공유하지 않았다. 평일 일부 시간대에 양쪽 업무를 병행한 VPN 로그가 남아 있다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "타사 계약서",
        "온보딩 메일",
        "이중 계약",
        "VPN 겹침",
        "병행 근무",
        "공유 안 함"
      ],
      "requiredEvidenceIds": [
        "e-2",
        "e-6"
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
          "summary": "이중 계약과 근무시간 은폐의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-10:b:d-2:denial:0",
            "workplace-10:a:d-2:act:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "이중 계약과 근무시간 은폐에 얽힌 이유와 방어",
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
            "workplace-10:b:d-2:context:0",
            "workplace-10:a:d-2:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "이중 계약과 근무시간 은폐의 최종 책임과 남는 상처",
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
            "workplace-10:b:d-2:shame:0",
            "workplace-10:a:d-2:harm:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "순수 피해자 여부",
      "summary": "도현의 약속 번복은 실제지만, 혜린도 같은 시기 타사 계약과 가용시간 충돌을 숨겼다. 순수한 무과실 피해자로만 볼 수는 없다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "순수 피해자",
        "생계용 보험",
        "무과실 피해자",
        "숨긴 계약",
        "가용시간 충돌",
        "피해자 서사"
      ],
      "requiredEvidenceIds": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "순수 피해자 여부의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-10:b:d-3:harm:0",
            "workplace-10:a:d-3:identity:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "순수 피해자 여부가 왜 오해로 굳어졌는지",
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
            "workplace-10:b:d-3:counter:0",
            "workplace-10:a:d-3:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "순수 피해자 여부의 실제 사실선과 해소 지점",
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
            "workplace-10:b:d-3:threshold:0",
            "workplace-10:a:d-3:harm:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "knows",
          "b": "weaponizes"
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
          "잘린 보류 캡처",
          "구두 약속만 남은 1:1 문장",
          "\"보험\"으로 낮춰 부른 타사 계약"
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
      "name": "헤드카운트 핑계와 선행 메모",
      "summary": "슬롯이 보류·재요청 가능인 상태에서 도현은 '어쩔 수 없다'고 말하고, HR 트래커에 'commitment concern' 메모를 먼저 남겼다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "헤드카운트 보류",
        "추가요청 가능",
        "commitment concern",
        "선행 메모",
        "HR 트래커",
        "예산 핑계"
      ],
      "requiredEvidenceIds": [
        "e-3",
        "e-4"
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
          "summary": "헤드카운트 핑계와 선행 메모의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-10:a:d-4:denial:0",
            "workplace-10:b:d-4:institution:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "헤드카운트 핑계와 선행 메모에 얽힌 이유와 방어",
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
            "workplace-10:a:d-4:responsibility:0",
            "workplace-10:b:d-4:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "헤드카운트 핑계와 선행 메모가 본건의 책임선을 어떻게 바꾸는지",
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
            "workplace-10:a:d-4:shame:1",
            "workplace-10:b:d-4:harm:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "구두 약속 위의 쌍방 의존",
      "summary": "도현은 미문서화 약속으로 혜린을 붙잡고, 혜린은 타사 계약을 숨긴 채 전환 일정을 확인했다. 양쪽 모두 불완전한 정보 위에서 관계를 유지했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "구두 약속",
        "다음 사이클",
        "잔류 요청",
        "문서화 누락",
        "불완전한 정보",
        "쌍방 의존"
      ],
      "requiredEvidenceIds": [
        "e-1",
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 55,
        "b": 45
      },
      "legitimacyIssue": false,
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "구두 약속 위의 쌍방 의존의 겉으로 드러난 흐름",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "workplace-10:a:d-5:denial:0",
            "workplace-10:b:d-5:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "구두 약속 위의 쌍방 의존에 얽힌 이유와 방어",
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
            "workplace-10:a:d-5:act:0",
            "workplace-10:b:d-5:privacy:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "구두 약속 위의 쌍방 의존가 본건의 책임선을 어떻게 바꾸는지",
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
            "workplace-10:a:d-5:fear:0",
            "workplace-10:b:d-5:fear:1"
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
        "grantFlag": "d-5:surface:promise_loop_seen"
      },
      "uiLabel": "약속이 의존을 키움"
    },
    {
      "id": "link:d-4:d-1:weakens_counter",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "counterPenalty": 12,
        "grantFlag": "d-1:core:budget_excuse_broken"
      },
      "uiLabel": "예산 핑계 약화"
    },
    {
      "id": "link:d-2:d-3:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-3:surface:hidden_contract_seen"
      },
      "uiLabel": "피해자 서사에 균열"
    },
    {
      "id": "link:d-5:d-2:retaliation",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-2",
      "type": "retaliation",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-2:motive:dependency_loop_seen"
      },
      "uiLabel": "의존이 은폐를 부름"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "1:1 메모와 전환 약속 메신저 스레드",
      "description": "'런칭 끝나면 전환안 올릴게'라는 도현의 1:1 문서·메신저 스레드. 약속의 강도와 반복 횟수를 보여 준다.",
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
        "request_original": "캡처뿐 아니라 1:1 문서 원본과 스레드 전체를 열어 약속 강도를 확인해야 한다.",
        "check_metadata": "출시 직전·직후 도현 계정에서 '전환안 올릴게' 유사 문장이 3회 반복 입력돼 있다.",
        "restore_context": "약속 직후 혜린이 야간 인수인계·교육을 맡아 잔류 유인으로 작동한 흐름이 보인다.",
        "verify_source": "1:1 노트와 메신저 원본이 동일 날짜·문구를 가리킨다.",
        "check_edits": "버전 이력 보존 — 사후 덧붙이기 흔적 없음.",
        "question_acquisition": "업무 1:1·메신저 자료 — 분쟁 해결 목적 적법 열람."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "임도현에게: \"반복된 전환 약속과 막판 번복\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 임도현의 \"반복된 전환 약속과 막판 번복\" 쟁점과 관련된다. 임도현은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "장혜린에게: \"구두 약속 위의 쌍방 의존\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 장혜린의 \"구두 약속 위의 쌍방 의존\" 쟁점과 관련된다. 장혜린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
      "name": "혜린의 타사 근로계약서 사본과 온보딩 메일",
      "description": "혜린의 타사 계약서 사본과 중복 기간 온보딩 메일. 계약 체결 시점이 전환 기대 기간과 겹친다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "partial",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "PDF뿐 아니라 서명 완료본과 발신 메일 원문을 함께 확인해야 한다.",
        "check_metadata": "계약 체결일·온보딩 메일 수신일이 혜린의 마지막 전환 기대 기간과 겹친다.",
        "restore_context": "체결은 분명하지만 실제 겹침 범위는 출입·VPN 로그로 보강해야 한다.",
        "verify_source": "혜린 제출 파일명과 타사 온보딩 메일 헤더 일치.",
        "check_edits": "변조 없으나 일부 페이지 누락 — 중복근무 범위 단독 확정 어려움.",
        "question_acquisition": "개인 고용계약 자료 — 공개 범위 최소 제한."
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
            "multiplier": 1.2,
            "note": "단독보다 원본 대조와 함께 써야 의미가 선명해진다."
          },
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.2,
            "note": "단독보다 원본 대조와 함께 써야 의미가 선명해진다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "도현이 제시한 헤드카운트 보류 캡처",
      "description": "도현이 제출한 예산·헤드카운트 캡처. 슬롯이 완전 폐쇄처럼 보이지만 '추가요청 가능' 영역이 잘려 있다.",
      "type": "document",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "캡처가 아니라 슬롯 상태 변화 로그와 코멘트 전체를 같이 봐야 한다.",
        "check_metadata": "보류만 보이고 '추가요청 가능'·매니저 코멘트 영역이 절삭돼 있다.",
        "restore_context": "단독으론 원천 불가처럼 보이지만 매니저 재요청 라인이 살아 있었는지 별도 확인 필요.",
        "verify_source": "HR 대시보드 형식과 유사하지만 공식 출력본은 아니다.",
        "check_edits": "변조 없으나 절삭·하이라이트로 전환 불가 프레임이 과장됐다.",
        "question_acquisition": "인사 캡처 — 분쟁 해결 목적에만 한정 사용."
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
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.4,
            "note": "잘린 자료나 요약 프레임을 걷어낼 때 효율이 높다."
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.4,
            "note": "잘린 자료나 요약 프레임을 걷어낼 때 효율이 높다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "HR 전환 리뷰 트래커와 매니저 코멘트 이력",
      "description": "혜린 전환 상태, 도현 코멘트, 슬롯 재요청 가능 여부가 시간순으로 남은 HR 원본 기록.",
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
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "상태 화면뿐 아니라 코멘트 최초 입력본과 수정본까지 함께 봐야 한다.",
        "check_metadata": "'commitment concern' 메모가 재심 최종 결정보다 먼저 입력. 슬롯은 보류·재요청 가능 상태였다.",
        "restore_context": "예산만의 문제가 아니라 도현의 코멘트·지연 판단이 전환 결론에 직접 영향을 줬다.",
        "verify_source": "HR 관리자 조회와 고현정 로그 내역 동일.",
        "check_edits": "원본 이력 기반 — 사후 편집 흔적 없음.",
        "question_acquisition": "인사자료 — 공개 최소화, 분쟁 해결 목적 적법 열람."
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
      "id": "e-5",
      "name": "지난 두 차례 계약연장 메일과 잔류 요청 기록",
      "description": "두 차례 갱신 때마다 '다음 사이클이면 된다'며 런칭·교육을 맡긴 메일·회의록. 잔류 유인의 반복 패턴이 보인다.",
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
        "request_original": "갱신 메일뿐 아니라 당시 회의록과 역할 재배정 기록을 함께 봐야 한다.",
        "check_metadata": "두 번의 연장 직전 모두 '이번 사이클만 버텨 달라'는 도현 문장이 남아 있다.",
        "restore_context": "단발이 아니라 반복된 잔류 유인·전환 암시가 누적돼 현재 기대를 키운 배경이 드러난다.",
        "verify_source": "메일 아카이브와 회의록 링크가 동일 캘린더 이벤트를 가리킨다.",
        "check_edits": "원본 메일·협업 문서 — 사후 수정 흔적 없음.",
        "question_acquisition": "계약 연장·배치 기록 — 적법 확인 가능."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "임도현에게: \"반복된 전환 약속과 막판 번복\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 임도현의 \"반복된 전환 약속과 막판 번복\" 쟁점과 관련된다. 임도현은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "장혜린에게: \"구두 약속 위의 쌍방 의존\" 관련 해명 요구 (방어 동기: 직장/평판 보호)",
          "implication": "이 증거는 장혜린의 \"구두 약속 위의 쌍방 의존\" 쟁점과 관련된다. 장혜린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "finish",
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
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.25,
            "note": "앞서 나온 말과 실제 흐름을 맞대기 좋다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.25,
            "note": "앞서 나온 말과 실제 흐름을 맞대기 좋다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "노무 컴플라이언스 메모와 출입·VPN 겹침 로그",
      "description": "타사 고용기간과 사내 출입·VPN 시간이 평일 3일 겹친 노무 검토 메모와 원본 로그.",
      "type": "access_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "요약뿐 아니라 출입기록, VPN 접속시각, 중복 가입 확인 자료를 함께 봐야 한다.",
        "check_metadata": "타사 계약 기간과 출입·VPN 로그가 평일 3일 중복 — 예비가 아니라 실제 병행 가능성 높다.",
        "restore_context": "약속 위반과 별개로 혜린이 가용시간·고용상태를 투명하게 밝히지 않은 점이 분명해진다.",
        "verify_source": "노무 담당 검토표와 원본 시스템 로그가 동일 날짜를 가리킨다.",
        "check_edits": "기관 보존 로그·검토문서 — 사후 편집 흔적 없음.",
        "question_acquisition": "노무·보안 자료 — 접근 엄격 제한, 조사 목적 적법."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "임도현에게: \"구두 약속 위의 쌍방 의존\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 임도현의 \"구두 약속 위의 쌍방 의존\" 쟁점과 관련된다. 임도현은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "장혜린에게: \"이중 계약과 근무시간 은폐\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 장혜린의 \"이중 계약과 근무시간 은폐\" 쟁점과 관련된다. 장혜린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S1",
            "multiplier": 1.3,
            "note": "원본 로그나 기관 기록으로 방어 문장을 짧게 끊을 수 있다."
          },
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
      "id": "fq:d-1:promise_wording",
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
          "workplace-10:a:d-1:act:0",
          "workplace-10:a:d-1:responsibility:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "지금은 그 순서를 길게 풀고 싶지 않습니다.",
        "시점을 다 펼치면 제 판단이 먼저 드러납니다."
      ]
    },
    {
      "id": "fq:d-1:retention_reason",
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
          "workplace-10:a:d-1:responsibility:0",
          "workplace-10:a:d-1:fear:0"
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
      "id": "fq:d-2:contract_overlap",
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
          "workplace-10:b:d-2:act:0",
          "workplace-10:b:d-2:timeline:0"
        ],
        "preferredAngleTags": [
          "identity",
          "timeline"
        ]
      },
      "refusalTemplates": [
        "지금은 그 대상을 특정해 말하고 싶지 않습니다.",
        "이름을 바로 꺼내면 다른 해명까지 엮입니다."
      ]
    },
    {
      "id": "fq:d-4:memo_order",
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
          "workplace-10:a:d-4:evidence:1",
          "workplace-10:a:d-4:responsibility:0"
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
      "id": "fq:d-5:oral_dependency",
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
          "workplace-10:a:d-5:relationship:0",
          "workplace-10:a:d-5:fear:0"
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
      "id": "fq:d-5:why_stayed",
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
          "workplace-10:b:d-5:fear:1",
          "workplace-10:b:d-5:self_justification:0"
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
      "pressure_heavy",
      "evidence_closer",
      "trap_chaser",
      "rapport_heavy"
    ]
  },
  "proposedUnlockAtoms": []
};

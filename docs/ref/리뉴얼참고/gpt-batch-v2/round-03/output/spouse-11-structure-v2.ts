export const spouse_11_structure_v2 = {
  "caseId": "spouse-11",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "유림의 무단 포털 접속·반출",
      "truth": true,
      "truthDescription": "유림은 승호 아이디로 포털에 접속해 공사중지 요청과 CCTV 반출을 한 세션에서 처리했다. 캡처만 했다는 주장은 감사로그와 맞지 않는다. 포털 접속 자체가 합의 위반.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1"
      ],
      "correctResponsibility": {
        "a": 85,
        "b": 15
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "공사권한분리",
      "legitimacyIssue": true,
      "judgmentStatement": "유림은 무단으로 포털에 접속했다.",
      "caseId": "spouse-11",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "포털 접속",
        "승호 아이디",
        "공사중지 요청",
        "CCTV 반출",
        "유림 태블릿",
        "도어락 관리자"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "유림의 무단 포털 접속·반출의 겉면과 즉시 확인 가능한 사실선입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse11:a:d-1:act:0",
            "spouse11:a:d-1:act:1",
            "spouse11:a:d-1:motive:0",
            "spouse11:b:d-1:act:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "유림의 무단 포털 접속·반출 뒤에 깔린 해석, 불안, 계산이 드러납니다.",
          "lockedSummary": "동기 층은 아직 풀리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-1:act:1",
            "spouse11:a:d-1:counter:0",
            "spouse11:a:d-1:responsibility:0",
            "spouse11:b:d-1:admission:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "유림의 무단 포털 접속·반출가 관계 책임과 사건 구조에 어떻게 연결되는지 정리됩니다.",
          "lockedSummary": "핵심 구조는 아직 연결되지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:motive:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-1:fear:0",
            "spouse11:a:d-1:admission:1",
            "spouse11:a:d-1:responsibility:1",
            "spouse11:b:d-1:shame:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "승호의 건조 지연·권한 봉쇄",
      "truth": true,
      "truthDescription": "승호는 제습기를 6시간 끄고 건조업체를 취소한 뒤 도어락 권한을 단독 재설정했다. 급한 상황이었다면 제습기를 켜 두는 게 맞고 건조를 취소할 이유도 없다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-2"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "공사권한분리",
      "legitimacyIssue": false,
      "judgmentStatement": "승호는 건조를 취소하고 권한을 재설정했다.",
      "caseId": "spouse-11",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "제습기 OFF",
        "6시간 12분",
        "건조 취소",
        "권한 재설정",
        "스마트플러그",
        "긴급건조"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "승호의 건조 지연·권한 봉쇄의 겉면과 즉시 확인 가능한 사실선입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse11:a:d-2:act:0",
            "spouse11:b:d-2:act:0",
            "spouse11:b:d-2:admission:0",
            "spouse11:b:d-2:self_justification:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "승호의 건조 지연·권한 봉쇄 뒤에 깔린 해석, 불안, 계산이 드러납니다.",
          "lockedSummary": "동기 층은 아직 풀리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-2:evidence:0",
            "spouse11:b:d-2:admission:0",
            "spouse11:b:d-2:motive:0",
            "spouse11:b:d-2:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "승호의 건조 지연·권한 봉쇄가 관계 책임과 사건 구조에 어떻게 연결되는지 정리됩니다.",
          "lockedSummary": "핵심 구조는 아직 연결되지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:responsibility_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-2:fear:0",
            "spouse11:b:d-2:fear:0",
            "spouse11:b:d-2:admission:1",
            "spouse11:b:d-2:responsibility:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "대규모 손상 — 시공 하자인가 지연인가",
      "truth": false,
      "truthDescription": "초기 누수는 시공 하자이고 보수비는 120만 원 안팎. 그러나 제습 6시간 중단과 건조 취소 후 수분센서가 계단형 급상승. 손상 확대의 직접 원인은 긴급조치 지연.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-3",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "보험청구정정",
      "legitimacyIssue": true,
      "judgmentStatement": "손상 확대 원인은 긴급조치 지연이다.",
      "caseId": "spouse-11",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "심야 재출입",
        "홍대성",
        "잘린 CCTV",
        "수분센서 곡선",
        "시공 하자",
        "손상 확대"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "대규모 손상 — 시공 하자인가 지연인가의 겉면과 즉시 확인 가능한 사실선입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse11:a:d-3:rule:0",
            "spouse11:a:d-3:context:0",
            "spouse11:a:d-3:motive:0",
            "spouse11:b:d-3:rule:0",
            "spouse11:b:d-3:admission:0",
            "spouse11:b:d-3:self_justification:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "대규모 손상 — 시공 하자인가 지연인가 뒤에 깔린 해석, 불안, 계산이 드러납니다.",
          "lockedSummary": "동기 층은 아직 풀리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-3:context:0",
            "spouse11:a:d-3:evidence:1",
            "spouse11:a:d-3:responsibility:0",
            "spouse11:b:d-3:admission:0",
            "spouse11:b:d-3:counter:1",
            "spouse11:b:d-3:evidence:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "대규모 손상 — 시공 하자인가 지연인가가 관계 책임과 사건 구조에 어떻게 연결되는지 정리됩니다.",
          "lockedSummary": "핵심 구조는 아직 연결되지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:trap_disarmed"
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-3:shame:0",
            "spouse11:a:d-3:admission:1",
            "spouse11:a:d-3:responsibility:1",
            "spouse11:b:d-3:shame:0",
            "spouse11:b:d-3:admission:1",
            "spouse11:b:d-3:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "weaponizes",
          "b": "suspects"
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
            "summary": "오해 해소 직전",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "앞뒤 11초가 잘린 CCTV",
          "심야 재출입만 남긴 선택 캡처",
          "초기 하자와 확대 원인을 섞는 프레임"
        ],
        "truthExitEvidenceIds": [
          "e-5",
          "e-2"
        ],
        "clarifyOutcomeLabel": "오해 해소 직전"
      }
    },
    {
      "id": "d-4",
      "name": "보험금 공모와 손상 확대",
      "truth": true,
      "truthDescription": "삭제 복원 메신저에 유림은 손상 넓으면 천장도 간다, 승호는 잔금이랑 카드대금 나누자고 답했다. 한쪽 주도가 아니라 양쪽이 번갈아 계산을 구체화한 공동 기획.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-4",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 50,
        "b": 50
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "보험청구정정",
      "legitimacyIssue": true,
      "judgmentStatement": "유림과 승호는 공동 기획했다.",
      "caseId": "spouse-11",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "보험금 계산",
        "삭제 복원 메신저",
        "잔금",
        "카드대금",
        "천장도 간다",
        "공동 기획"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "보험금 공모와 손상 확대의 겉면과 즉시 확인 가능한 사실선입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse11:a:d-4:motive:0",
            "spouse11:a:d-4:evidence:0",
            "spouse11:a:d-4:self_justification:0",
            "spouse11:b:d-4:motive:0",
            "spouse11:b:d-4:evidence:0",
            "spouse11:b:d-4:self_justification:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "보험금 공모와 손상 확대 뒤에 깔린 해석, 불안, 계산이 드러납니다.",
          "lockedSummary": "동기 층은 아직 풀리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-4:evidence:0",
            "spouse11:a:d-4:admission:0",
            "spouse11:a:d-4:responsibility:0",
            "spouse11:b:d-4:evidence:0",
            "spouse11:b:d-4:admission:0",
            "spouse11:b:d-4:self_justification:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "보험금 공모와 손상 확대가 관계 책임과 사건 구조에 어떻게 연결되는지 정리됩니다.",
          "lockedSummary": "핵심 구조는 아직 연결되지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:motive_pressed"
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-4:fear:0",
            "spouse11:a:d-4:admission:2",
            "spouse11:a:d-4:responsibility:1",
            "spouse11:b:d-4:shame:0",
            "spouse11:b:d-4:admission:2",
            "spouse11:b:d-4:responsibility:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "지급 보류 — 보복인가 이상징후인가",
      "truth": false,
      "truthDescription": "지급 보류는 홍대성 분쟁 제기보다 이틀 앞서 결정됐다. 사유서에 제습 중단 로그, 수분센서 이상 곡선, 사진 순서 불일치가 명시. 시공사 보복이 아니라 보험사 내부 탐지.",
      "quadrant": "neither_knows",
      "requiredEvidence": [
        "e-2",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 45,
        "b": 55
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "주거복구운영",
      "legitimacyIssue": false,
      "judgmentStatement": "지급 보류는 보험사 내부 탐지이다.",
      "caseId": "spouse-11",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "지급 보류",
        "보복 신고",
        "조사유예",
        "이상징후",
        "사진 순서 불일치",
        "보험사 내부 탐지"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "지급 보류 — 보복인가 이상징후인가의 겉면과 즉시 확인 가능한 사실선입니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "spouse11:a:d-5:counter:0",
            "spouse11:a:d-5:institution:0",
            "spouse11:a:d-5:uncertainty:1",
            "spouse11:b:d-5:counter:0",
            "spouse11:b:d-5:institution:1",
            "spouse11:b:d-5:uncertainty:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "지급 보류 — 보복인가 이상징후인가 뒤에 깔린 해석, 불안, 계산이 드러납니다.",
          "lockedSummary": "동기 층은 아직 풀리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-5:institution:0",
            "spouse11:a:d-5:counter:2",
            "spouse11:a:d-5:responsibility:0",
            "spouse11:b:d-5:institution:1",
            "spouse11:b:d-5:motive:0",
            "spouse11:b:d-5:responsibility:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "지급 보류 — 보복인가 이상징후인가가 관계 책임과 사건 구조에 어떻게 연결되는지 정리됩니다.",
          "lockedSummary": "핵심 구조는 아직 연결되지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:surface:trap_disarmed"
            ]
          },
          "revealAtomIds": [
            "spouse11:a:d-5:fear:0",
            "spouse11:a:d-5:institution:1",
            "spouse11:a:d-5:responsibility:1",
            "spouse11:b:d-5:fear:0",
            "spouse11:b:d-5:institution:2",
            "spouse11:b:d-5:responsibility:1"
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
            "summary": "오해 해소 직전",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "시공사 보복 서사 고정",
          "보류 사유보다 분쟁 타이밍만 강조"
        ],
        "truthExitEvidenceIds": [
          "e-6",
          "e-2",
          "e-5"
        ],
        "clarifyOutcomeLabel": "오해 해소 직전"
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
        "supportBonus": 11,
        "grantFlag": "d-4:surface:data_weaponized"
      },
      "uiLabel": "자료 선점"
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
        "supportBonus": 13,
        "grantFlag": "d-3:surface:delay_damage_visible"
      },
      "uiLabel": "지연이 손상 키움"
    },
    {
      "id": "link:d-3:d-5:weakens_counter",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "weakens_counter",
      "when": {
        "minState": "S3",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-5:motive:contractor_blame_softened"
      },
      "uiLabel": "시공사 탓 약화"
    },
    {
      "id": "link:d-4:d-5:supports",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-5:core:insurance_scheme_visible"
      },
      "uiLabel": "공동 계산 흔적"
    },
    {
      "id": "link:d-2:d-4:retaliation",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-4",
      "type": "retaliation",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-4:core:delay_used_as_leverage"
      },
      "uiLabel": "지연을 지렛대로 씀"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "현장관리 포털 접속감사로그와 도어락 관리자 기록",
      "description": "유림 태블릿에서 승호 아이디로 포털 접속한 감사로그. 공사중지 요청, CCTV 캡처 반출, 도어락 접근이 한 세션에 기록. 승호의 사전 인지 여부는 불명.",
      "type": "cloud_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "포털 서버 감사로그(세션 ID·IP·타임스탬프)와 스마트락 서버의 관리자 접근기록 원본이 함께 제출됐다.",
        "check_metadata": "승호 계정 접속과 유림 태블릿 지문이 동일 세션. 접속 3분 내 공사중지→CCTV 반출 연속 실행. 캡처만 했다는 주장과 불일치.",
        "restore_context": "유림은 캡처를 따로 했다고 하지만 감사로그에는 로그인→공사중지→CCTV 반출이 단일 세션·연속 타임스탬프로 기록돼 있다.",
        "verify_source": "시공사 포털 관리자 추출 로그와 스마트락 서버 기록의 시각·세션 ID가 일치한다. 두 독립 시스템이 교차 검증된다.",
        "check_edits": "포털 서버와 스마트락 서버에서 직접 추출한 로그이므로 사용자 측 수동 편집이 구조적으로 불가능하다.",
        "question_acquisition": "공동 주거공간 공사 계정의 감사로그로, 계약 당사자 요청에 의해 적법하게 확보됐다."
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "context",
          "timeline"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "유림의 무단 포털 접속·반출의 사실선을 고정하는 타이밍."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "제습기 스마트플러그 로그와 긴급건조 연기 보고서",
      "description": "제습기 OFF 로그(6시간 12분), 건조업체 취소 기록, 도어락 권한 단독 재설정 보고서. 승호의 일방 조치를 보여주지만 유림 사전 통보 여부는 없다.",
      "type": "device_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "스마트플러그 ON/OFF 관리자 로그(기기 ID·시각·조작 계정)와 건조업체 CRM 일정 변경 보고서가 함께 제출됐다.",
        "check_metadata": "제습기 OFF 후 6시간 12분 지속. 건조업체 방문은 같은 날 밤 취소. 누수 직후 제습기를 끄는 것은 정상 대응이 아니다.",
        "restore_context": "승호 말대로 급했다면 제습기를 끄고 권한까지 바꿀 이유가 없다. OFF→권한 재설정→건조 취소가 같은 세션에서 연속 처리됐다.",
        "verify_source": "스마트홈 서버 로그의 OFF 시각과 복구업체 CRM의 일정 취소 시각이 동일 날짜·시간대로 부합한다.",
        "check_edits": "스마트홈 서버 및 건조업체 CRM 시스템에서 직접 추출한 원본이므로 사용자 편집 흔적이 없다.",
        "question_acquisition": "공동 주거공간 소유 기기 로그와 계약 건조업체 기록이므로 확보 절차상 문제없다."
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
          "context"
        ],
        "blockedVectorsHelp": [
          "context",
          "timeline"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.3,
            "note": "승호의 건조 지연·권한 봉쇄의 사실선을 고정하는 타이밍."
          },
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.3,
            "note": "지급 보류 — 보복인가 이상징후인가에서 잘못된 해석을 되돌리는 창."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "유림이 저장한 심야 CCTV 캡처와 현장 알람 이력",
      "description": "홍대성 심야 재출입 CCTV 캡처와 도어락 알람. 앞뒤 11초가 잘린 선택적 추출이며, 실제로는 8분간 밸브 점검 후 퇴장. 무단 반출 자료라는 절차 문제도 있다.",
      "type": "video",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "전체 CCTV 원본 영상이 아니라, 유림이 포털에서 내보낸 정지화면 캡처 3장과 짧은 클립(약 11초 분량)만 제출됐다.",
        "check_metadata": "캡처 생성: 공사중지 직후. 전체 대비 앞뒤 11초 잘림. 홍대성 입장만 남고 퇴장과 작업 내용이 빠져 목적 판단 불가.",
        "restore_context": "도어락 전체 로그 대조 시 홍대성의 재출입은 8분 체류, 밸브 점검 후 퇴장. 잘린 11초에 출입 목적과 퇴장이 포함돼 있었을 가능성.",
        "verify_source": "도어락 현장 알람 이력에서 홍대성의 재출입 자체는 사실로 확인된다. 그러나 8분간 현장에서 무엇을 했는지는 잘린 캡처만으로 단정할 수 없다.",
        "check_edits": "합성 흔적 없다. 다만 전체 영상에서 특정 구간만 선택 추출한 것이므로 보여주지 않는 앞뒤 맥락이 존재한다.",
        "question_acquisition": "승호 계정 무단 사용으로 포털에서 반출한 CCTV. 공동 공간이라도 타인 계정 접속이므로 권한 침해 소지."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "차유림에게: \"대규모 손상 — 시공 하자인가 지연인가\" 관련 해명 요구",
          "implication": "이 증거는 차유림의 \"대규모 손상 — 시공 하자인가 지연인가\" 쟁점과 관련된다. 차유림은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "백승호에게: \"대규모 손상 — 시공 하자인가 지연인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 백승호의 \"대규모 손상 — 시공 하자인가 지연인가\" 쟁점과 관련된다. 백승호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
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
            "multiplier": 1.4,
            "note": "대규모 손상 — 시공 하자인가 지연인가에서 부분 자료의 함정을 벗겨내는 분기점."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "삭제 복원된 부부 메신저와 예산 메모",
      "description": "삭제 복원 메신저와 클라우드 예산 메모. 양쪽 모두 보험금으로 잔금·카드대금을 메우려 계산한 흔적. 단독 주도가 아닌 공동 기획을 보여준다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "양쪽 기기에서 삭제 복원된 메신저 대화와 가족 클라우드 예산 메모 원본이 함께 확인됐다.",
        "check_metadata": "대화 클러스터 두 개: 건조 취소 직전(손상 넓으면 천장도 가능)과 보험 상담 직후(잔금·카드 분배). 같은 취지 반복으로 충동이 아닌 계산.",
        "restore_context": "유림이 먼저 쓰고 승호가 이어받는 구조. 한쪽 유혹이 아니라 양쪽이 번갈아 아이디어를 보태며 계산을 구체화했다.",
        "verify_source": "메신저 서버 백업의 대화 타임스탬프와 메모앱 버전 이력의 편집 시각이 일치한다. 양쪽 기기에서 동일 문구가 확인된다.",
        "check_edits": "삭제 복원 흔적은 있으나 문구 자체에 조작 없다. 삭제 시도 자체가 증거 인식을 보여주는 정황이기도 하다.",
        "question_acquisition": "당사자 각자의 기기 백업과 공동 가족 클라우드에서 확인된 자료이므로 취득 절차상 문제없다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "차유림에게: \"대규모 손상 — 시공 하자인가 지연인가\" 관련 해명 요구",
          "implication": "이 증거는 차유림의 \"대규모 손상 — 시공 하자인가 지연인가\" 쟁점과 관련된다. 차유림은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "백승호에게: \"대규모 손상 — 시공 하자인가 지연인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 백승호의 \"대규모 손상 — 시공 하자인가 지연인가\" 쟁점과 관련된다. 백승호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "fact_pursuit",
          "motive_search"
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
            "state": "S3",
            "multiplier": 1.35,
            "note": "대규모 손상 — 시공 하자인가 지연인가에서 잘못된 해석을 되돌리는 창."
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.25,
            "note": "보험금 공모와 손상 확대의 사실선을 고정하는 타이밍."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "보험청구서 초안과 수분센서 분석보고",
      "description": "청구서에는 갑작스런 붕괴로 적혔지만 수분센서 CSV는 계단형 상승, 사진 촬영 순서와 손상 진행이 불일치. 갑작스런 사고 서사가 사실과 다르다는 증거.",
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
      "requires": [
        "e-3"
      ],
      "investigationResults": {
        "request_original": "보험청구 초안(사진 첨부 포함), 손해사정인 현장 보고서, 수분센서 원본 CSV(5분 간격 기록)가 함께 제출됐다.",
        "check_metadata": "사진 EXIF: 3→1→2로 재배치, 손상 큰 사진 맨 앞. 센서 CSV는 제습 OFF 후 계단형 상승. 갑작스런 붕괴 서사와 불일치.",
        "restore_context": "센서 시간축: 초기 누수 미미→제습 OFF 후 6시간 급상승→건조 취소 후 추가 상승. 갑작스런 붕괴가 아니라 며칠간 점진적 확대.",
        "verify_source": "보험사 접수 시스템의 청구 접수 시각과 현장 수분센서 기록의 타임라인이 서로 부합한다. 손해사정 보고서의 현장 방문 일시도 일치한다.",
        "check_edits": "센서 CSV와 사진 EXIF에 후편집 흔적 없다. 청구서 서술은 사람 작성 초안이므로 주관이 개입돼 있다.",
        "question_acquisition": "보험사 손해사정 조사 과정에서 정식 절차를 거쳐 확보된 자료이므로 취득 적법성에 문제없다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "차유림에게: \"대규모 손상 — 시공 하자인가 지연인가\" 관련 해명 요구",
          "implication": "이 증거는 차유림의 \"대규모 손상 — 시공 하자인가 지연인가\" 쟁점과 관련된다. 차유림은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "백승호에게: \"대규모 손상 — 시공 하자인가 지연인가\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 백승호의 \"대규모 손상 — 시공 하자인가 지연인가\" 쟁점과 관련된다. 백승호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.35,
            "note": "대규모 손상 — 시공 하자인가 지연인가에서 잘못된 해석을 되돌리는 창."
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.25,
            "note": "보험금 공모와 손상 확대의 사실선을 고정하는 타이밍."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "보험사 조사유예 통지와 복구업체 진술서",
      "description": "보험사 조사유예 통지서(홍대성 분쟁 제기 전 결정)와 복구업체 진술서. 보류 사유는 제습 중단·센서 이상·사진 불일치. 외부 보복이 아닌 내부 탐지 결과.",
      "type": "institutional_note",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "보험사 조사유예 통지서(결정일·사유 명시)와 복구업체 현장 진술서(방문 일시·현장 상태 기록)가 함께 제출됐다.",
        "check_metadata": "보류 결정: 홍대성 분쟁 이틀 전. 사유: 제습 로그+센서 이상+사진 순서 불일치. 시공사 신고는 시간상 보류 원인이 될 수 없다.",
        "restore_context": "부부는 홍대성 보복 신고를 의심했지만 통지서 날짜 대조 시 보험사 SIU 내부 탐지가 분쟁 제기보다 먼저 작동한 상태였다.",
        "verify_source": "보험사 SIU 내부 기록의 보류 결정 타임라인과 복구업체 방문 일지의 현장 확인 날짜가 일치한다.",
        "check_edits": "보험사 발급 통지서와 복구업체 작성 진술서 모두 기관 원본이므로 사용자 측 편집이 구조적으로 불가능하다.",
        "question_acquisition": "보험사 조사 절차 내에서 계약자에게 정식 통지된 자료이며, 복구업체 진술서도 조사 과정에서 적법하게 확보됐다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "차유림에게: \"지급 보류 — 보복인가 이상징후인가\" 관련 자신이 아는 바를 진술",
          "implication": "이 증거는 차유림이 직접적 당사자가 아닌 쟁점이다. 차유림이 이 상황에 대해 알고 있는 바를 확인한다."
        },
        "b": {
          "questionAngle": "백승호에게: \"지급 보류 — 보복인가 이상징후인가\" 관련 자신이 아는 바를 진술",
          "implication": "이 증거는 백승호이 직접적 당사자가 아닌 쟁점이다. 백승호이 이 상황에 대해 알고 있는 바를 확인한다."
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
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.35,
            "note": "지급 보류 — 보복인가 이상징후인가에서 잘못된 해석을 되돌리는 창."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:admin_access_scope",
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
          "spouse11:a:d-1:act:1",
          "spouse11:a:d-1:motive:0",
          "spouse11:b:d-1:admission:0"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 특정인 이름부터 다시 단정하고 싶지 않습니다.",
        "그 사람을 다시 지목하는 방식으로는 답하고 싶지 않아요."
      ]
    },
    {
      "id": "fq:d-2:drying_gap",
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
        "disputeId": "d-2",
        "allowAtomIds": [
          "spouse11:a:d-2:evidence:0",
          "spouse11:b:d-2:admission:0",
          "spouse11:b:d-2:self_justification:0"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 순서를 한 줄로 정리할 준비가 아직 안 됐습니다.",
        "시점부터 다시 세워야 해서 지금은 바로 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-3:clip_context",
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
          "spouse11:a:d-3:context:0",
          "spouse11:a:d-3:motive:0",
          "spouse11:b:d-3:admission:0",
          "spouse11:b:d-3:self_justification:0"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "원본 맥락 없이 진짜냐부터 묻는 질문엔 신중히 답하겠습니다.",
        "조각난 자료만 놓고 진위를 단정하는 방식엔 바로 답하지 않겠습니다."
      ]
    },
    {
      "id": "fq:d-4:insurance_scope",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "spouse11:a:d-4:evidence:0",
          "spouse11:a:d-4:self_justification:0",
          "spouse11:b:d-4:evidence:0",
          "spouse11:b:d-4:self_justification:0"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "의도부터 단정하는 질문에는 바로 답하고 싶지 않습니다.",
        "왜 그랬는지 말하려면 감정선부터 정리해야 합니다."
      ]
    },
    {
      "id": "fq:d-5:hold_reason",
      "intentTag": "legality_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "spouse11:a:d-5:institution:0",
          "spouse11:a:d-5:uncertainty:1",
          "spouse11:b:d-5:institution:1",
          "spouse11:b:d-5:uncertainty:1"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "규칙 이야기만 먼저 꺼내면 제가 숨긴 감정이 또 빠집니다.",
        "절차만으로는 다 설명되지 않아 지금은 답을 아끼겠습니다."
      ]
    },
    {
      "id": "fq:d-4:budget_pressure",
      "intentTag": "emotion_check",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-4",
        "allowAtomIds": [
          "spouse11:a:d-4:evidence:0",
          "spouse11:a:d-4:self_justification:0",
          "spouse11:b:d-4:evidence:0",
          "spouse11:b:d-4:self_justification:0"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 감정은 아직 그대로 말하기 어렵습니다.",
        "그 부분은 지금 꺼내면 말이 무너질 것 같습니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-4"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "trap_chaser"
    ]
  }
} as const;

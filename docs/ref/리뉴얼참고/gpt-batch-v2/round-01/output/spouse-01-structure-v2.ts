export const spouse01StructureV2 = {
  "caseId": "spouse-01",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "지석의 비밀 송금 280만원",
      "truth": true,
      "truthDescription": "지석은 세린에게 한마디 상의 없이 공동생활비 계좌에서 280만원을 빼냈다. 받는 사람은 재가돌봄센터 상담팀장 최민정. 목적은 추석 연휴 간병 예약금이었지만, 숨긴 것 자체가 약속 위반이다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 70,
        "b": 30
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "재정투명화",
      "legitimacyIssue": false,
      "judgmentStatement": "지석은 세린에게 비밀 송금을 했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "280만원",
        "비밀 송금",
        "최민정",
        "돌봄센터",
        "간병 예약금",
        "공동계좌",
        "처모 간병",
        "추석 연휴"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "지석의 비밀 송금 280만원의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "d1.movement_only",
            "d1.transfer_ack"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 숨기거나 밀어붙였는지 동기가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "d1.prior_consult_missed",
            "d1.unlock.s3.suspicion_hardened_silence",
            "d1.partner_suspicion_counter"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계 규칙이 어디서 무너졌는지 핵심이 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
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
            "d1.provider_shame",
            "d1.unlock.s4.investment_failure_echo",
            "d1.unlock.s4.handle_inlaw_alone"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "세린의 새벽 휴대폰 열람",
      "truth": true,
      "truthDescription": "세린은 새벽 2시에 잠든 지석의 휴대폰 잠금을 풀고 메신저 대화를 캡처했다. 그 캡처를 언니에게 보내며 '이거 외도 맞지?'라고 물었다. 의심이 확인되기도 전에 제3자에게 퍼뜨린 셈이다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-3"
      ],
      "correctResponsibility": {
        "a": 20,
        "b": 80
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "사생활경계",
      "legitimacyIssue": true,
      "judgmentStatement": "세린은 지석의 휴대폰을 열람했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "새벽 2시",
        "휴대폰 열람",
        "캡처본",
        "언니 전송",
        "외도 맞지",
        "잠금 해제",
        "메신저 확인"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "세린의 새벽 휴대폰 열람의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "d2.phone_access_ack",
            "d2.action_wrong_but_triggered"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "행동의 계산과 방어 논리가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-2:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "d2.action_wrong_but_triggered",
            "d2.only_me_counter",
            "d2.unlock.s2.captured_before_asking"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "본안과 연결된 책임과 경계 문제가 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "d2.fool_wife_fear",
            "d2.unlock.s4.inlaw_table_fear",
            "d2.unlock.s4.anger_masked_shame"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "최민정은 외도 상대인가",
      "truth": false,
      "truthDescription": "최민정은 외도 상대가 아니다. 재가돌봄센터 상담팀장이며, 모텔 골목에서 만난 것처럼 보인 장면은 같은 블록에 붙은 센터 후문 상담실에서 간병 일정을 잡은 것이었다.",
      "quadrant": "shared_misconception",
      "requiredEvidence": [
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 40,
        "b": 60
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "신뢰회복",
      "legitimacyIssue": true,
      "judgmentStatement": "최민정은 외도 상대가 아니다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "최민정",
        "외도 상대",
        "조용한 데서 보자",
        "모텔 골목",
        "상담동 후문",
        "카페 영수증",
        "잘린 대화",
        "오해 동선"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "최민정은 외도 상대인가을 둘러싼 오해가 어떻게 생겼는지 봅니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "d3.contact_ack",
            "d3.affair_denial"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 양측이 잘못된 인과를 붙잡았는지 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "d3.evidence_incomplete_counter",
            "d3.unlock.s2.alley_misread_layout",
            "d3.unlock.s2.consult_not_date"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 벗기고 실제 원인과 상처를 분리합니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:motive:context_named"
            ]
          },
          "revealAtomIds": [
            "d3.motherinlaw_shame",
            "d3.unlock.s4.health_topic_shame",
            "d3.unlock.s4.pity_from_wife_fear"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "knows",
          "b": "misbelief"
        },
        "stages": [
          {
            "state": "M0",
            "summary": "겉증거가 먼저 눈에 들어온 단계",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "의심을 사실처럼 말하기 시작한 단계",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 인과를 굳혀 버린 단계",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "자료 모순이 보이며 확신이 흔들리는 단계",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "실제 맥락과 요청 주체가 드러나는 단계",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "잘린 메신저 한 문장",
          "모텔 골목처럼 보이는 위치",
          "카페 영수증과 출입기록의 분리"
        ],
        "truthExitEvidenceIds": [
          "e-3",
          "e-4"
        ],
        "clarifyOutcomeLabel": "실제 맥락과 요청 주체가 드러나는 단계"
      }
    },
    {
      "id": "d-4",
      "name": "세린의 우회 송금 150만원",
      "truth": true,
      "truthDescription": "세린도 깨끗하지 않다. 동생의 밀린 월세 3개월치를 막으려 대학 동기 정우성 계좌를 경유해 150만원을 우회 송금했다. '추석 지나고 말할게'라는 메시지가 고스란히 남아 있다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-5",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 25,
        "b": 75
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "재정투명화",
      "legitimacyIssue": false,
      "judgmentStatement": "세린은 150만원을 우회 송금했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "150만원",
        "정우성",
        "우회 송금",
        "동생 월세",
        "추석 지나고 말할게",
        "친구 계좌",
        "3개월 밀린 월세"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "세린의 우회 송금 150만원의 표면 사실을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "d4.amount_move_ack",
            "d4.route_temporary_frame"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "행동의 계산과 방어 논리가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "d4.method_not_clean_ack",
            "d4.unlock.s3.equalization_anger",
            "d4.you_started_breach"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "본안과 연결된 책임과 경계 문제가 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "d4.money_talk_choke",
            "d4.unlock.s4.sibling_money_shame",
            "d4.family_need_generic"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "100만원 사전 상의 약속 위반",
      "truth": true,
      "truthDescription": "재작년에 세운 '100만원 이상은 반드시 상의' 약속을 두 사람 모두 어겼다. 지석은 280만원을 몰래 보냈고, 세린은 150만원을 돌려서 보냈다. 방법만 달랐을 뿐, 약속을 깬 건 똑같다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-1",
        "e-6"
      ],
      "correctResponsibility": {
        "a": 55,
        "b": 45
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "재정투명화",
      "legitimacyIssue": false,
      "judgmentStatement": "지석과 세린은 약속을 위반했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "100만원 약속",
        "사전 상의",
        "먼저 상의",
        "규칙 위반",
        "280만원",
        "150만원",
        "재정 투명화"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "100만원 사전 상의 약속 위반의 겉사실을 정리합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "d5a.self_cross_ack",
            "d5a.intent_rule_split"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 숨기거나 밀어붙였는지 동기가 드러납니다.",
          "lockedSummary": "숨긴 이유와 계산은 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-5:surface:evidence_shown"
            ]
          },
          "revealAtomIds": [
            "d5a.unlock.s2.knew_threshold_before_send",
            "d5a.rule_exists",
            "d5a.mutual_breach_frame"
          ],
          "uiStyle": "thread_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "관계 규칙이 어디서 무너졌는지 핵심이 드러납니다.",
          "lockedSummary": "관계 핵심과 진짜 상처는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:motive:responsibility_named"
            ]
          },
          "revealAtomIds": [
            "d5a.unlock.s4.rule_as_pride_guard",
            "d5a.investment_shame",
            "d5a.mutual_breach_frame"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "공동계좌→최민정 280만원 이체 내역",
      "description": "9월 20일, 부부 공동생활비 계좌에서 '최민정'이라는 이름으로 280만원이 빠져나간 은행 원본 거래내역이다. 이체 시각과 수취인 실명이 고스란히 찍혀 있다.",
      "type": "bank",
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
        "request_original": "은행 발급 원본에 이체 시각 '9월 20일 14:03', 수취인 '최민정'이 찍혀 있다. 금액 2,800,000원. 메모란은 비어 있다.",
        "check_metadata": "이체 단말은 지석 명의 휴대폰, 공인인증도 지석 본인 명의다. 타인이 대신 보낸 흔적은 없다.",
        "restore_context": "이체 7분 전과 23분 전, 돌봄센터 대표번호(1588-XXXX)로 두 차례 통화한 기록이 있다. 외도 상대에게 보내는 돈이라면 센터에 전화할 이유가 없다.",
        "verify_source": "은행 고객센터에 대조한 결과, PDF 해시값이 원본과 일치한다. 위·변조 흔적 없음.",
        "check_edits": "은행 시스템에서 직접 출력한 PDF 발급본이다. 수정 이력이나 이미지 편집 흔적은 없다.",
        "question_acquisition": "부부 공동명의 계좌이므로 어느 쪽이든 조회할 권리가 있다. 다만 280만원을 상의 없이 인출한 행위 자체는 합의 위반이다."
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
            "multiplier": 1.35,
            "note": "수취인 실명과 통화 흐름이 송금 목적의 첫 전환점이 된다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "재가돌봄센터 간병 예약 확인서",
      "description": "재가돌봄센터가 발급한 추석 연휴 간병 예약서다. 상담팀장 최민정 이름으로 접수돼 있고, 대상자란에 '오미숙(세린 어머니)'이 적혀 있다. 280만원 예약금 영수증이 함께 붙어 있다.",
      "type": "contract",
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
        "request_original": "예약서 신청인란에 '한지석', 돌봄 대상자란에 '오미숙(처모)'이 적혀 있다. 기간은 추석 연휴 3일, 예약금 280만원 수납 완료 도장이 찍혀 있다.",
        "check_metadata": "예약서 작성 시각은 송금 당일 14:31, 이체 28분 뒤다. 이후 수정이나 취소 기록은 없다.",
        "restore_context": "상담 사유란에 '추석 연휴 기간 가족 돌봄 공백 — 가족 간 일정 조율 전 긴급 예약'이라고 적혀 있다. 세린에게 미리 말하지 못한 정황이 읽힌다.",
        "verify_source": "예약서에 찍힌 센터 직인, 대표번호, 사업자등록번호를 대조한 결과 모두 실제 기관 정보와 일치한다. 위장 기관이 아니다.",
        "check_edits": "전자서명 유효성 검증 통과. 발급 이후 한 글자도 수정되지 않았다.",
        "question_acquisition": "돌봄센터가 직접 발급한 기관 제출본이라 취득 경위에 문제없다. 다만 대상자(어머니)의 건강 상세는 개인정보 보호를 위해 최소한만 공개된다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "contextualize",
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
          "identity"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S3",
            "multiplier": 1.4,
            "note": "외도 오해를 간병 예약으로 뒤집는 핵심 문서다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "지석 휴대폰 메신저 캡처본",
      "description": "세린이 지석 휴대폰에서 캡처한 메신저 대화 일부다. '지난번처럼 조용한 데서 보죠'라는 문장이 찍혀 있지만, 앞뒤 맥락이 잘려 있어 상담 약속인지 밀회 약속인지 이것만으로는 알 수 없다.",
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
        "request_original": "전체 대화 원본은 제출되지 않았다. 세린이 캡처한 스크린샷 1장뿐이며, 앞뒤 수십 줄이 잘려 있다.",
        "check_metadata": "캡처 파일의 생성 시각이 새벽 2시 07분이다. 지석이 잠든 사이에 폰을 열어 찍은 것으로 보인다.",
        "restore_context": "'조용한 데서 보죠'만 떼어 보면 밀회처럼 읽히지만, 앞뒤가 잘려 있어 상담 장소 약속인지 사적 만남인지 이 캡처만으로는 알 수 없다.",
        "verify_source": "화면 상단 프로필 이미지와 계정명이 지석의 메신저 계정과 일치한다. 세린이 지석 폰에서 직접 캡처한 것으로 보인다.",
        "check_edits": "글자를 고치거나 합성한 흔적은 없다. 다만 대화의 위아래를 의도적으로 잘라낸 선택적 크롭이 확인된다. 불리한 맥락만 남기고 나머지를 잘라낸 셈이다.",
        "question_acquisition": "새벽에 잠든 배우자의 휴대폰 잠금을 풀고 무단 열람해 얻은 자료다. 내용이 사실이라 해도 취득 과정 자체가 사생활 침해에 해당할 수 있다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "한지석에게: \"최민정은 외도 상대인가\" 관련 해명 요구 (방어 동기: 관계 유지)",
          "implication": "이 증거는 한지석의 \"최민정은 외도 상대인가\" 쟁점과 관련된다. 한지석은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "오세린에게: \"세린의 새벽 휴대폰 열람\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 오세린의 \"세린의 새벽 휴대폰 열람\" 쟁점과 관련된다. 오세린은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "disarm_trap",
        "role": "impeach",
        "bestAtStates": [
          "M0",
          "M1",
          "M2",
          "S0",
          "S1"
        ],
        "weakAtStates": [
          "S4",
          "S5",
          "M4"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M1",
            "multiplier": 1.45,
            "note": "잘린 대화라는 한계를 바로 짚을수록 오해 고착을 늦춘다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "상담동 출입기록과 카페 영수증",
      "description": "문제의 그 밤, 지석이 들어간 건물의 출입기록과 1층 카페 영수증이다. 모텔 골목으로 보이지만 실제로는 돌봄센터 후문과 같은 골목에 붙은 상담동이었음을 보여준다. 시각은 밤 9시 14분.",
      "type": "access_log",
      "reliability": "soft",
      "completeness": "partial",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-3"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "건물 1층 출입명부에 '한지석, 21:14 입장'이 수기로 적혀 있고, 같은 건물 카페 영수증의 카드 승인번호와 시각이 이와 일치한다.",
        "check_metadata": "출입 시각 21:14는 메신저 대화(e-3)에서 '조용한 데서 보자'고 약속한 바로 그날 저녁이다. 시간대가 정확히 맞아떨어진다.",
        "restore_context": "이 골목은 모텔 간판이 늘어선 거리처럼 보이지만, 안쪽으로 20미터만 더 들어가면 돌봄센터 상담동 후문이 나온다. 겉모습만 보고 판단하면 오해하기 딱 좋은 위치다.",
        "verify_source": "건물 관리인이 출입명부 원본을 확인해줬고, 카드사에서도 해당 시간·장소 결제를 승인했다. 이중 교차 검증이 된 셈이다.",
        "check_edits": "카드 영수증은 POS 원본 출력이라 편집 여지가 없다. 출입명부는 수기 작성본을 복사한 것인데, 필적이 일관되어 사후 조작 가능성은 낮다.",
        "question_acquisition": "지석 본인이 자발적으로 제출한 자료다. '제가 그날 어디 있었는지 증명하겠습니다'라며 직접 꺼냈으므로 취득 경위에 문제없다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "corroborate",
        "role": "reframe",
        "bestAtStates": [
          "M2",
          "M3",
          "S2"
        ],
        "weakAtStates": [
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "timeline"
        ],
        "blockedVectorsHelp": [
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.32,
            "note": "골목 이미지와 실제 상담동 동선을 분리해 준다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "세린→정우성 150만원 송금 요청",
      "description": "세린이 대학 동기 정우성에게 보낸 메신저 대화 원본이다. '지석한테는 추석 지나고 말할게, 일단 이거 동생한테 좀 넘겨줘'라는 메시지와 함께 150만원 송금 요청이 담겨 있다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "정우성 폰에 남아 있는 대화 원본과 세린 폰의 동일 대화를 대조한 결과, 내용과 시각이 완전히 일치한다.",
        "check_metadata": "세린이 정우성에게 메시지를 보낸 시각은 9월 21일 오전 10:22 — 지석이 280만원을 송금한 바로 다음 날 아침이다. 남편의 비밀 송금을 알게 된 직후, 자신도 우회 송금을 시작한 셈이다.",
        "restore_context": "150만원의 최종 수취인은 세린 동생이지만, 세린은 직접 보내지 않고 정우성을 경유했다. 남편에게 들키지 않으려 중간 전달자를 쓴 것이다.",
        "verify_source": "세린 폰과 정우성 폰, 양쪽 메신저 대화의 해시값을 대조한 결과 100% 일치한다. 어느 한쪽이 조작한 흔적은 없다.",
        "check_edits": "세린 폰에서 이 대화를 한 차례 삭제했다 복원한 흔적이 있다. 증거 인멸을 시도했을 가능성이 있지만, 복원된 본문 자체는 조작되지 않았다.",
        "question_acquisition": "정우성이 자발적으로 제출한 자료다. 본인이 참여한 대화이므로 상대방(세린) 동의 없이 제출해도 위법성은 낮다."
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
          "identity",
          "context"
        ],
        "blockedVectorsHelp": [
          "context",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.3,
            "note": "우회 송금의 중간 경로를 처음 확정한다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "정우성→동생 월세 납부 내역",
      "description": "정우성 계좌에 들어온 150만원이 18분 만에 세린 동생의 연체 월세로 빠져나간 기록이다. 입금확인서와 임대인 발급 납부증이 이어져 있어 우회 송금의 흐름이 선명하게 드러난다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4",
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-5"
      ],
      "investigationResults": {
        "request_original": "정우성 계좌에 150만원이 입금된 내역과, 세린 동생의 임대인이 발급한 월세 수납증이 시간순으로 이어진다. 돈의 흐름이 한눈에 읽힌다.",
        "check_metadata": "입금 시각과 월세 납부 시각의 차이가 겨우 18분이다. 중간에 보관하거나 다른 용도로 쓴 흔적이 없다. 처음부터 월세용으로 짜인 우회 송금이다.",
        "restore_context": "세린 동생은 월세를 3개월째 밀리고 있었고, 임대인이 내용증명을 보낸 직후였다. 세린은 명절 전에 급히 막으려 했고, 남편에게는 '추석 지나고 말할게'라며 일단 숨겼다.",
        "verify_source": "은행 이체 기록과 임대인 발급 수납증을 교차 검증했다. 금액, 날짜, 수취인이 모두 일치한다. 조작 가능성 없음.",
        "check_edits": "은행 발급 입금확인서와 임대인 직인이 찍힌 수납증, 모두 기관 원본이다. 편집이나 변조 여지가 없다.",
        "question_acquisition": "정우성과 세린 동생이라는 제3자의 금융 정보가 포함돼 있다. 이 사건 판단에 필요한 범위 안에서만 사용해야 하며, 불필요한 공개는 개인정보 침해에 해당한다."
      },
      "subjectParty": "b",
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
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "legality",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S3",
            "multiplier": 1.28,
            "note": "150만원이 실제로 월세로 쓰였음을 마무리해 준다."
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
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "d1.recipient_identity_full",
          "d1.professional_link_generic",
          "d1.unlock.s2.recipient_is_center_side"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:holiday_gap",
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
        "disputeId": "d-1",
        "allowAtomIds": [
          "d1.professional_link_generic",
          "d1.unlock.s2.recipient_is_center_side",
          "d1.care_reservation_confess"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:meeting_route",
      "intentTag": "timeline_check",
      "allowedAtStates": [
        "M2",
        "M3",
        "M4"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "d3.contact_ack",
          "d3.location_full",
          "d3.unlock.s5.cafe_then_backdoor_route"
        ],
        "preferredAngleTags": [
          "timeline",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:relay_transfer",
      "intentTag": "causal_link",
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
          "d4.unlock.s5.eighteen_minute_flow",
          "d4.intermediary_ack",
          "d4.unlock.s2.eviction_notice_pressure"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:first_breach",
      "intentTag": "rule_check",
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
        "disputeId": "d-5",
        "allowAtomIds": [
          "d5a.intent_rule_split",
          "d5a.rule_exists",
          "d5a.unlock.s2.rule_born_from_loss"
        ],
        "preferredAngleTags": [
          "legality",
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:betrayal_weight",
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
          "d5a.unlock.s3.dragged_her_case_to_survive",
          "d5a.unlock.s2.rule_born_from_loss",
          "d5a.mutual_breach_frame"
        ],
        "preferredAngleTags": [
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단정해서 말하면 더 왜곡됩니다.",
        "먼저 연결된 사실부터 맞춰야 그 부분도 답할 수 있습니다."
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
        "grantFlag": "d-5:surface:first_breach_enabled"
      },
      "uiLabel": "먼저 깬 100만원 선"
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
        "supportBonus": 10,
        "grantFlag": "d-2:core:affair_claim_weakened"
      },
      "uiLabel": "외도 오해 약화"
    },
    {
      "id": "link:d-4:d-5:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:motive:retaliation_frame_open"
      },
      "uiLabel": "맞불 송금"
    },
    {
      "id": "link:d-1:d-3:unlocks_layer",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-3",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "grantFlag": "d-3:motive:center_context_open",
        "unlockLayer": "motive"
      },
      "uiLabel": "돌봄센터 맥락"
    }
  ],
  "proposedUnlockAtoms": []
};

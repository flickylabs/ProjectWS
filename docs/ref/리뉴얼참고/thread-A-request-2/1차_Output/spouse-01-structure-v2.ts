/* Auto-generated spouse-01 pilot data export */
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
      "depthLayers": [
        {
          "id": "surface",
          "label": "송금의 겉면",
          "summary": "280만원 이동, 낯선 이름, 외도처럼 보이는 첫 인상을 다루는 층.",
          "lockedSummary": "금액과 이름은 보이지만 용도와 관계 맥락은 아직 잠겨 있다.",
          "revealAtomIds": [
            "d1.unlock.s2.holiday_care_gap_exists",
            "d1.unlock.s2.recipient_is_center_side"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "왜 바로 말하지 못했나",
          "summary": "가족 쪽 급한 일이라면서도 왜 아내에게 설명보다 침묵을 택했는지를 다루는 층.",
          "lockedSummary": "송금 자체보다 '왜 숨겼나'의 층이 아직 접혀 있다.",
          "revealAtomIds": [
            "d1.unlock.s3.suspicion_hardened_silence",
            "d1.unlock.s4.investment_failure_echo"
          ],
          "uiStyle": "card_expand",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d1.surface.timeline_pressed"
            ]
          }
        },
        {
          "id": "core",
          "label": "가장 체면과 관계 핵심",
          "summary": "처가 문제를 혼자 해결해 인정받고 싶었던 자존심, 그리고 그 과정에서 생긴 관계 배제를 다루는 핵심 층.",
          "lockedSummary": "이 쟁점의 안쪽에는 돈보다 체면과 인정의 문제가 남아 있다.",
          "revealAtomIds": [
            "d1.unlock.s4.handle_inlaw_alone",
            "d1.unlock.s5.target_is_omisuk_three_days",
            "d1.unlock.s5.self_authenticated_transfer"
          ],
          "uiStyle": "relation_core",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d1.care_identity_revealed"
            ]
          }
        }
      ],
      "linkEdges": [
        {
          "id": "link.d1.to.d5.supports",
          "fromDisputeId": "d-1",
          "toDisputeId": "d-5",
          "type": "supports",
          "when": {
            "minState": "S2",
            "minLayer": "surface",
            "requireFlags": [
              "d1.surface.timeline_pressed"
            ]
          },
          "effect": {
            "supportBonus": 12,
            "grantFlag": "d5.first_breach_frame_enabled"
          },
          "uiLabel": "송금 사실이 열리면 '누가 먼저 약속을 깼나' 축이 강해진다"
        },
        {
          "id": "link.d1.to.d4.weakens_counter",
          "fromDisputeId": "d-1",
          "toDisputeId": "d-4",
          "type": "weakens_counter",
          "when": {
            "minState": "S3",
            "minLayer": "motive"
          },
          "effect": {
            "weakenCounterTags": [
              "whataboutism",
              "equalization",
              "family_emergency"
            ],
            "grantFlag": "d4.counter_weakened"
          },
          "uiLabel": "280만원의 맥락이 드러나면 150만원 방어가 얇아진다"
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
      "disputeKind": "core_truth",
      "depthLayers": [
        {
          "id": "surface",
          "label": "열람의 사실면",
          "summary": "새벽 2시 열람, 캡처, 선확인의 순서를 다루는 층.",
          "lockedSummary": "휴대폰을 열어본 사실은 보이지만 왜 그 전까지 갔는지는 아직 안쪽이다.",
          "revealAtomIds": [
            "d2.unlock.s2.captured_before_asking",
            "d2.unlock.s2.checked_while_he_slept"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "왜 확인보다 침해가 먼저였나",
          "summary": "제3자 확인 충동과 '모른 척 명절상 차리는 아내'가 될까 두려웠던 감정을 다루는 층.",
          "lockedSummary": "의심의 촉발은 드러났지만, 왜 그 불안이 그렇게 커졌는지는 아직 잠겨 있다.",
          "revealAtomIds": [
            "d2.unlock.s3.third_party_validation_impulse",
            "d2.unlock.s4.inlaw_table_fear"
          ],
          "uiStyle": "card_expand",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          }
        },
        {
          "id": "core",
          "label": "확답을 찾던 공포",
          "summary": "진실보다 불안을 대신 확정해 줄 답을 찾으려 했던 공포와 부끄러움을 드러내는 핵심 층.",
          "lockedSummary": "이 쟁점의 핵심은 열람 사실보다, 왜 그 순간 확답이 진실보다 중요해졌는가에 있다.",
          "revealAtomIds": [
            "d2.unlock.s4.anger_masked_shame",
            "d2.unlock.s5.sent_to_sister_before_confirmation",
            "d2.unlock.s5.wanted_confirmation_not_truth"
          ],
          "uiStyle": "relation_core",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d2.motive.exposed"
            ]
          }
        }
      ],
      "linkEdges": [
        {
          "id": "link.d2.to.d3.unlocks_layer",
          "fromDisputeId": "d-2",
          "toDisputeId": "d-3",
          "type": "unlocks_layer",
          "when": {
            "minState": "S2",
            "minLayer": "surface"
          },
          "effect": {
            "unlockLayer": "motive",
            "grantFlag": "d3.crop_context_opened"
          },
          "uiLabel": "열람 경위를 파면 캡처 오해의 안쪽 층이 열린다"
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
      "disputeKind": "red_herring",
      "depthLayers": [
        {
          "id": "surface",
          "label": "외도처럼 보이는 조합",
          "summary": "잘린 캡처, 밤 시간, 골목 위치가 겹쳐 외도처럼 읽히는 표면 층.",
          "lockedSummary": "보이는 조합만으로도 충분히 헷갈리지만, 아직 맥락이 빠져 있다.",
          "revealAtomIds": [
            "d3b.unlock.m0.suspicious_triad",
            "d3b.unlock.m1.identity_blank_affair_guess",
            "d3.unlock.s2.consult_not_date",
            "d3.unlock.s2.alley_misread_layout"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "오해가 굳는 과정",
          "summary": "잘린 자료를 붙잡고 왜 해석이 확신으로 굳었는지, 그리고 왜 한지석이 그 오해를 바로잡지 못했는지를 다루는 층.",
          "lockedSummary": "이 오해는 단서 하나 때문이 아니라, 잘린 자료와 침묵이 겹쳐 커졌다.",
          "revealAtomIds": [
            "d3b.unlock.m2.cropped_chat_locked_belief",
            "d3.unlock.s3.let_crop_mislead",
            "d3b.unlock.m3.context_breaks_certainty"
          ],
          "uiStyle": "card_expand",
          "unlockCondition": {
            "requireFlags": [
              "d3.crop_context_opened"
            ]
          }
        },
        {
          "id": "core",
          "label": "오해 해소 뒤 남는 관계 상처",
          "summary": "외도가 아니라는 사실이 정리된 뒤에도, 왜 숨긴 방식이 신뢰를 무너뜨렸는지 남는 층.",
          "lockedSummary": "가짜 쟁점의 종착점에는 '거짓 외도'가 아니라 '왜 그렇게 보이게 숨겼는가'가 남는다.",
          "revealAtomIds": [
            "d3.unlock.s4.health_topic_shame",
            "d3.unlock.s4.pity_from_wife_fear",
            "d3.unlock.s5.cafe_then_backdoor_route",
            "d3.unlock.s5.quote_meant_consult_room",
            "d3b.unlock.m4.clarify_false"
          ],
          "uiStyle": "relation_core",
          "unlockCondition": {
            "requireEvidenceIds": [
              "e-4"
            ]
          }
        }
      ],
      "linkEdges": [
        {
          "id": "link.d3.to.d1.retaliation",
          "fromDisputeId": "d-3",
          "toDisputeId": "d-1",
          "type": "retaliation",
          "when": {
            "minLayer": "surface",
            "requireFlags": [
              "d3.red_herring_pressed"
            ]
          },
          "effect": {
            "retaliationAngleTag": "responsibility",
            "grantFlag": "d1.retaliation_window"
          },
          "uiLabel": "외도 몰이를 세게 밀면 송금/열람 책임 반격이 열린다"
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
            "summary": "잘린 캡처, 밤 시간, 골목 위치가 겹쳐 외도처럼 보이는 외형상 의심",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M1",
            "summary": "최민정의 정체를 모른 채 '그 여자'라는 공백에 외도 서사를 채워 넣는 방어/당황",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M2",
            "summary": "앞뒤 맥락이 없는 캡처를 붙잡고 잘못된 해석이 거의 확신처럼 굳는 구간",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "상담동·센터·예약 맥락이 붙으면서 의심의 확신이 흔들리고 혼란이 커지는 구간",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "외도 오해는 해소되지만, 숨긴 방식이 왜 그렇게 불안을 키웠는지 재정리하는 구간",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "잘린 메신저 캡처 한 장만 남아 있다",
          "새벽 2시 07분 무단 캡처라 취득 맥락이 이미 기울어져 있다",
          "모텔가처럼 보이는 골목 인상만 강조되고 상담동 후문 맥락은 빠져 있다",
          "\"지난번처럼 조용한 데서 보죠\"라는 문장만 떼어 읽게 되어 있다"
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-4"
        ],
        "clarifyOutcomeLabel": "외도 오해 해소"
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
      "depthLayers": [
        {
          "id": "surface",
          "label": "150만원 흐름의 표면",
          "summary": "세린이 직접 보내지 않고 정우성을 경유한 150만원의 겉흐름을 다루는 층.",
          "lockedSummary": "돈이 갔다는 사실은 보이지만, 왜 굳이 친구 계좌를 거쳤는지는 아직 안쪽이다.",
          "revealAtomIds": [
            "d4a.unlock.s1.intermediary_smells_hidden",
            "d4a.unlock.s2.friend_route_not_clean"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "왜 우회했나",
          "summary": "동생 월세 압박과 남편이 거절할까 봐 정우성 경유를 택한 동기를 다루는 층.",
          "lockedSummary": "이 우회는 단순한 전달이 아니라, 추석 전 갈등을 미루려는 계산과 겹쳐 있다.",
          "revealAtomIds": [
            "d4.unlock.s2.eviction_notice_pressure",
            "d4.unlock.s2.husband_would_refuse",
            "d4.unlock.s3.equalization_anger"
          ],
          "uiStyle": "card_expand",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          }
        },
        {
          "id": "core",
          "label": "가족 수치심과 숨김의 핵심",
          "summary": "동생 돈 문제를 또 꺼내는 수치심, 그리고 친구 계좌를 쓴 계산된 숨김을 다루는 핵심 층.",
          "lockedSummary": "이 쟁점의 핵심은 150만원보다, 가족 문제를 어떤 방식으로 숨겼는가에 있다.",
          "revealAtomIds": [
            "d4.unlock.s4.sibling_money_shame",
            "d4.unlock.s4.used_friend_to_hide",
            "d4.unlock.s5.three_month_rent_full",
            "d4.unlock.s5.eighteen_minute_flow"
          ],
          "uiStyle": "relation_core",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S3"
              }
            ]
          }
        }
      ],
      "linkEdges": [
        {
          "id": "link.d4.to.d5.supports",
          "fromDisputeId": "d-4",
          "toDisputeId": "d-5",
          "type": "supports",
          "when": {
            "minState": "S2",
            "minLayer": "surface"
          },
          "effect": {
            "supportBonus": 10,
            "grantFlag": "d5.symmetric_breach_visible"
          },
          "uiLabel": "150만원 흐름이 열리면 쌍방 약속 위반 구조가 고정된다"
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
      "depthLayers": [
        {
          "id": "surface",
          "label": "약속의 표면",
          "summary": "100만원 사전 상의 약속의 존재와 양측의 기준선 위반을 다루는 층.",
          "lockedSummary": "누가 얼마를 넘겼는지는 보이지만, 왜 그 약속이 그렇게 무거운지는 아직 안쪽이다.",
          "revealAtomIds": [
            "d5a.unlock.s2.rule_born_from_loss",
            "d5a.unlock.s2.knew_threshold_before_send",
            "d5b.unlock.s2.rule_bent_by_betrayal",
            "d5b.unlock.s2.knew_my_case_crossed_line"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "왜 서로 자기 예외를 만들었나",
          "summary": "지석은 이번만 예외라고 생각했고, 세린은 배신감 속에서 자기 150만원만 별개로 두고 싶어 했던 동기를 다루는 층.",
          "lockedSummary": "같은 약속 위반이지만, 각자 왜 '이번만은'이라고 여겼는지가 남아 있다.",
          "revealAtomIds": [
            "d5a.unlock.s3.dragged_her_case_to_survive",
            "d5a.unlock.s4.one_time_exception_self",
            "d5b.unlock.s3.not_same_order_or_scale",
            "d5b.unlock.s4.one_exception_for_sibling"
          ],
          "uiStyle": "card_expand",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          }
        },
        {
          "id": "core",
          "label": "신뢰 규칙의 본체",
          "summary": "재작년 손실 이후 어렵게 세운 경계선, 누가 먼저 깼는지, 그리고 결국 둘 다 관계 규칙을 무너뜨렸다는 핵심 층.",
          "lockedSummary": "이 쟁점의 안쪽에는 돈의 액수보다 '우리가 어떤 규칙으로 서로를 지켜왔나'가 있다.",
          "revealAtomIds": [
            "d5a.unlock.s4.rule_as_pride_guard",
            "d5a.unlock.s5.i_broke_first",
            "d5a.unlock.s5.my_weight_heavier",
            "d5b.unlock.s4.i_first_proposed_rule",
            "d5b.unlock.s5.next_morning_after_his_transfer",
            "d5b.unlock.s5.reason_not_excuse"
          ],
          "uiStyle": "relation_core",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S3"
              }
            ],
            "requireFlags": [
              "d5.first_breach_frame_enabled"
            ]
          }
        }
      ],
      "linkEdges": []
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
          "S0",
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S4",
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S1",
            "multiplier": 1.45,
            "note": "용도는 감추되 송금 사실만 남는 흔들림 구간에서 결정적이다."
          },
          {
            "disputeId": "d-5",
            "state": "S1",
            "multiplier": 1.3,
            "note": "약속 위반의 시작점을 못 박을 때 가장 선명하다."
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
        "role": "reframe",
        "bestAtStates": [
          "S1",
          "S2",
          "M1",
          "M2"
        ],
        "weakAtStates": [
          "S0",
          "M4"
        ],
        "preferredQuestionTypes": [
          "evidence_present",
          "motive_search"
        ],
        "preferredAngles": [
          "context",
          "identity"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context",
          "authenticity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.5,
            "note": "부분 인정 직후 내밀면 송금의 의미가 외도 프레임에서 가족 돌봄 프레임으로 뒤집힌다."
          },
          {
            "disputeId": "d-3",
            "state": "M2",
            "multiplier": 1.55,
            "note": "최민정의 정체와 예약 목적을 동시에 밝혀 red herring를 해체한다."
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
          "S0",
          "S1",
          "M0",
          "M1",
          "M2"
        ],
        "weakAtStates": [
          "S5",
          "M4"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "identity",
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
            "state": "S1",
            "multiplier": 1.35,
            "note": "열람 경위와 잘린 맥락을 동시에 찌를 수 있는 출발점이다."
          },
          {
            "disputeId": "d-3",
            "state": "M1",
            "multiplier": 1.25,
            "note": "오해의 재료를 일부러 잘린 상태 그대로 드러내 trap_confusion을 키운다."
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
        "intent": "contextualize",
        "role": "finish",
        "bestAtStates": [
          "M2",
          "M3",
          "S2",
          "S3"
        ],
        "weakAtStates": [
          "M0",
          "S0"
        ],
        "preferredQuestionTypes": [
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "timeline"
        ],
        "blockedVectorsHelp": [
          "context",
          "authenticity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "M3",
            "multiplier": 1.6,
            "note": "상담동 후문 맥락이 붙는 순간 오해를 clarify_false로 종결시킨다."
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
          "S0",
          "S1",
          "S2"
        ],
        "weakAtStates": [
          "S4",
          "S5"
        ],
        "preferredQuestionTypes": [
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context",
          "responsibility"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S1",
            "multiplier": 1.45,
            "note": "추석 뒤에 말하려 했다는 메신저 문장이 우회 동기의 숨김성을 가장 선명하게 만든다."
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
          "evidence_present",
          "fact_pursuit"
        ],
        "preferredAngles": [
          "context",
          "responsibility",
          "timeline"
        ],
        "blockedVectorsHelp": [
          "authenticity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S3",
            "multiplier": 1.5,
            "note": "18분 흐름이 드러나면 '임시 전달' 방어가 사실상 끝난다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "쌍방 약속 위반 구조를 숫자와 흐름으로 굳혀준다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq.d1.recipient_identity",
      "intentTag": "identity_check",
      "description": "최민정이 누구인지, 개인 관계인지 기관 실무선인지 직접 찌르는 자유 질문 훅.",
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
          "d1.recipient_identity_full"
        ],
        "forbidAtomIds": [
          "d1.care_reservation_confess"
        ],
        "preferredAngleTags": [
          "identity",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 이름부터 바로 밝히면 오히려 설명이 더 왜곡됩니다.",
        "상대 실명만 떼어 답하는 건 아직 곤란합니다."
      ]
    },
    {
      "id": "fq.d1.why_not_tell_wife",
      "intentTag": "motive_hidden",
      "description": "왜 아내에게 먼저 말하지 못했는지, 체면과 자존심 축을 여는 질문 훅.",
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
          "d1.provider_shame"
        ],
        "preferredAngleTags": [
          "motive",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 부분은 아직 제가 정리해서 말할 자신이 없습니다.",
        "용도보다 더 안쪽 이야기라, 지금 바로 꺼내긴 어렵습니다."
      ]
    },
    {
      "id": "fq.d2.why_open_phone_before_asking",
      "intentTag": "privacy_motive",
      "description": "왜 묻기보다 먼저 폰을 열어봤는지, 확인보다 침해가 앞선 동기를 묻는 훅.",
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
          "d2.action_wrong_but_triggered",
          "d2.fool_wife_fear"
        ],
        "preferredAngleTags": [
          "motive",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그때는 이유를 설명하기보다 변명처럼 들릴까 봐 싫었습니다.",
        "무단 열람 자체가 잘못이라, 동기까지 꺼내면 더 비겁해 보일 것 같았습니다."
      ]
    },
    {
      "id": "fq.d2.third_party_share",
      "intentTag": "third_party_share",
      "description": "캡처를 다른 사람에게 보여줬는지, 불안을 대신 확정받으려 했는지 묻는 훅.",
      "allowedAtStates": [
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "core_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-2",
        "allowAtomIds": [
          "d2.third_party_share_confess",
          "d2.privacy_line_confess"
        ],
        "preferredAngleTags": [
          "responsibility",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 부분은 제가 제일 부끄러워하는 대목입니다.",
        "누구에게까지 말했는지는 지금 바로 꺼내고 싶지 않습니다."
      ]
    },
    {
      "id": "fq.d3.what_made_it_look_like_affair",
      "intentTag": "trap_read",
      "description": "외도로 보이게 만든 조합이 무엇이었는지, red herring를 직접 해부하는 훅.",
      "allowedAtStates": [
        "S0",
        "S1",
        "S2",
        "M0",
        "M1",
        "M2",
        "M3"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "d3b.unlock.m0.suspicious_triad",
          "d3b.unlock.m2.cropped_chat_locked_belief",
          "d3.unlock.s2.alley_misread_layout"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 조합을 다시 말하면 제가 또 그 오해를 붙들게 됩니다.",
        "보이는 것만 다시 나열한다고 진실이 더 가까워지진 않습니다."
      ]
    },
    {
      "id": "fq.d4.why_use_friend_route",
      "intentTag": "intermediary_route",
      "description": "왜 직접 보내지 않고 정우성을 경유했는지, 우회 루트를 찌르는 훅.",
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
          "d4.intermediary_ack",
          "d4.post_holiday_plan",
          "d4.friend_route_full"
        ],
        "preferredAngleTags": [
          "context",
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "그 친구 이름을 거기까지 끌어들이는 건 지금도 망설여집니다.",
        "왜 우회했는지 말하려면, 제가 숨기려던 마음부터 같이 인정해야 합니다."
      ]
    },
    {
      "id": "fq.d5.where_rule_came_from",
      "intentTag": "rule_origin",
      "description": "100만원 약속이 언제, 왜 생겼는지 묻는 훅.",
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
          "d5a.rule_exists",
          "d5a.investment_shame",
          "d5b.rule_reopen_shame"
        ],
        "preferredAngleTags": [
          "context",
          "emotion"
        ]
      },
      "refusalTemplates": [
        "그 약속이 생긴 배경까지 꺼내면 결국 예전 상처를 다시 건드리게 됩니다.",
        "돈 기준 하나를 묻는 줄 알았는데, 그 뒤의 기억까지 묻고 계십니다."
      ]
    },
    {
      "id": "fq.core.what_was_each_protecting",
      "intentTag": "relation_core",
      "description": "양쪽이 무엇을 보호하려다 결국 서로를 배제했는지 묻는 관계 핵심 훅.",
      "allowedAtStates": [
        "S4",
        "S5",
        "M4"
      ],
      "allowedIssueRoles": [
        "core_truth",
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "d1.provider_shame",
          "d5a.shared_trust_break",
          "d5b.shared_rule_confess"
        ],
        "preferredAngleTags": [
          "emotion",
          "relationship"
        ]
      },
      "refusalTemplates": [
        "그 질문은 사실 하나보다 더 아픈 답을 요구합니다.",
        "누굴 지키려 했는지 말하면, 결국 누굴 배제했는지도 같이 인정해야 합니다."
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-1",
      "d-5"
    ],
    "playerStyleTagCandidates": [
      "presses_timeline",
      "presses_responsibility",
      "builds_context_before_finishing",
      "shows_empathy_when_open",
      "loops_same_angle",
      "switches_targets_well",
      "allows_interjection",
      "blocks_interjection",
      "trap_chaser",
      "red_herring_disprover",
      "evidence_finisher",
      "relation_core_hunter"
    ]
  },
  "proposedUnlockAtoms": [
    {
      "id": "d3b.unlock.m0.suspicious_triad",
      "sourceDisputeId": "d-3",
      "ownerParty": "b",
      "stage": "M0",
      "factText": "캡처·밤 시간대·골목 위치가 겹쳐 외도처럼 읽혔다는 초기 오해",
      "tags": [
        "evidence",
        "timeline",
        "identity",
        "misbelief"
      ],
      "usedByCoverageKeys": [
        "b.d3.surface.misbelief.trap.identity"
      ],
      "note": "ref-04에는 b:d-3 claim atom이 없어 red_herring용 최소 bridge atom으로 제안."
    },
    {
      "id": "d3b.unlock.m1.identity_blank_affair_guess",
      "sourceDisputeId": "d-3",
      "ownerParty": "b",
      "stage": "M1",
      "factText": "최민정의 정체를 모른 채 여자 이름만 남아 외도 상대로 추정했다는 고착",
      "tags": [
        "identity",
        "context",
        "misbelief"
      ],
      "usedByCoverageKeys": [
        "b.d3.surface.misbelief.trap.identity"
      ],
      "note": "b의 misbelief selector truthEnvelope용."
    },
    {
      "id": "d3b.unlock.m2.cropped_chat_locked_belief",
      "sourceDisputeId": "d-3",
      "ownerParty": "b",
      "stage": "M2",
      "factText": "잘린 캡처만 붙잡고 의심을 확신처럼 밀어붙였다는 오판",
      "tags": [
        "evidence",
        "context",
        "misbelief",
        "responsibility"
      ],
      "usedByCoverageKeys": [
        "b.d3.surface.misbelief.trap.identity"
      ],
      "note": "M2 trap_confusion_response용."
    },
    {
      "id": "d3b.unlock.m3.context_breaks_certainty",
      "sourceDisputeId": "d-3",
      "ownerParty": "b",
      "stage": "M3",
      "factText": "상담동·센터·돌봄 맥락이 붙으면서 외도 확신이 흔들리기 시작했다는 전환",
      "tags": [
        "context",
        "identity",
        "misbelief"
      ],
      "usedByCoverageKeys": [
        "b.d3.core.clarify.evidence.context"
      ],
      "note": "clarify 구간 evidence_response용."
    },
    {
      "id": "d3b.unlock.m4.clarify_false",
      "sourceDisputeId": "d-3",
      "ownerParty": "b",
      "stage": "M4",
      "factText": "외도 오해는 해소됐지만 숨긴 방식이 신뢰를 흔들었다는 정리",
      "tags": [
        "clarify_false",
        "relationship",
        "responsibility"
      ],
      "usedByCoverageKeys": [
        "b.d3.core.clarify.evidence.context"
      ],
      "note": "red_herring 종착 beat용."
    },
    {
      "id": "d4a.unlock.s1.intermediary_smells_hidden",
      "sourceDisputeId": "d-4",
      "ownerParty": "a",
      "stage": "S1",
      "factText": "정우성 계좌를 끼운 순간 이미 떳떳하지 않은 흐름이라고 보는 의심",
      "tags": [
        "context",
        "identity",
        "responsibility"
      ],
      "usedByCoverageKeys": [
        "a.d4.surface.early.pressure.context"
      ],
      "note": "ref-04에는 a:d-4 claim atom이 없어 cross-view pressure용 bridge atom으로 제안."
    },
    {
      "id": "d4a.unlock.s2.friend_route_not_clean",
      "sourceDisputeId": "d-4",
      "ownerParty": "a",
      "stage": "S2",
      "factText": "동생 사정이 급했더라도 친구 계좌를 경유한 방식은 숨김으로 본다는 주장",
      "tags": [
        "context",
        "responsibility",
        "identity"
      ],
      "usedByCoverageKeys": [
        "a.d4.surface.early.pressure.context"
      ],
      "note": "a가 d-4를 추궁할 때 최소 truthEnvelope anchor."
    },
    {
      "id": "d4a.unlock.s3.route_named_now",
      "sourceDisputeId": "d-4",
      "ownerParty": "a",
      "stage": "S3",
      "factText": "정우성 경유-동생 월세라는 흐름을 이제 구체적으로 지적할 수 있다는 확보감",
      "tags": [
        "timeline",
        "context",
        "responsibility"
      ],
      "usedByCoverageKeys": [
        "a.d4.surface.early.pressure.context"
      ],
      "note": "필요 시 higher state 확장용."
    }
  ]
} as const

export type Spouse01StructureV2 = typeof spouse01StructureV2

export default spouse01StructureV2

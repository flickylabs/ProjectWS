export const friend_10_structure_v2 = {
  "caseId": "friend-10",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "다정의 사전 확정 공지와 이름 선사용",
      "summary": "다정은 서아의 명시적 '확정' 메시지 없이도 웨딩플래너, 가족 단톡, 리허설표에 서아를 들러리 겸 축가로 기재했다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-4"
      ],
      "weight": "high",
      "ambiguity": "none",
      "mediationLink": "역할재정리",
      "legitimacyIssue": false,
      "judgmentStatement": "다정은 서아를 들러리로 기재했다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "가족단톡",
        "플래너전달본",
        "리허설표",
        "이름선사용",
        "들러리겸축가",
        "확정문구",
        "사전공지"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 실행과 부인의 모양이 보인다.",
          "lockedSummary": "겉으로 드러난 실행선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend10:a:d-1:act:0",
            "friend10:a:d-1:timeline:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 이 행동을 택했는지와 누구를 겨냥했는지가 드러난다.",
          "lockedSummary": "왜 그런 선택이 겹쳤는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend10:a:d-1:act:0",
            "friend10:a:d-1:timeline:1",
            "d1.a.unlock.s2.internal_draft",
            "d1.a.unlock.s3.no_confirm_text"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "행동, 판단, 사후 책임선이 어떻게 맞물렸는지가 드러난다.",
          "lockedSummary": "관계와 책임이 얽힌 핵심 구조는 아직 잠겨 있습니다.",
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
            "friend10:a:d-1:act:0",
            "friend10:a:d-1:timeline:1",
            "friend10:a:d-1:self_justification:2",
            "d1.a.unlock.s2.internal_draft",
            "d1.a.unlock.s3.no_confirm_text",
            "d1.a.unlock.s4.face_before_family",
            "d1.a.unlock.s5.own_premature_notice"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-2",
      "name": "서아의 애매한 수락성 답장과 늦은 정정",
      "summary": "서아는 '그 주 비워볼게', '키 한번 보자', 드레스 치수 제출 같은 행동으로 기대를 키운 뒤, 최종 불가 입장을 드레스 피팅 이후에야 분명히 했다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-3",
        "e-6"
      ],
      "weight": "high",
      "ambiguity": "none",
      "mediationLink": "일정복구",
      "legitimacyIssue": false,
      "judgmentStatement": "서아는 드레스 피팅 후 불가 입장을 밝혔다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "그주비워볼게",
        "키한번보자",
        "치수제출",
        "드레스피팅",
        "음성메모",
        "늦은정정",
        "가예약"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉으로 드러난 실행과 부인의 모양이 보인다.",
          "lockedSummary": "겉으로 드러난 실행선만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend10:b:d-2:denial:0",
            "friend10:b:d-2:motive:1"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 이 행동을 택했는지와 누구를 겨냥했는지가 드러난다.",
          "lockedSummary": "왜 그런 선택이 겹쳤는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend10:b:d-2:denial:0",
            "friend10:b:d-2:motive:1",
            "d2.b.unlock.s2.knew_it_sounded_like_yes",
            "d2.b.unlock.s3.voice_note_after_fitting"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "행동, 판단, 사후 책임선이 어떻게 맞물렸는지가 드러난다.",
          "lockedSummary": "관계와 책임이 얽힌 핵심 구조는 아직 잠겨 있습니다.",
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
            "friend10:b:d-2:denial:0",
            "friend10:b:d-2:motive:1",
            "friend10:b:d-2:evidence:2",
            "d2.b.unlock.s2.knew_it_sounded_like_yes",
            "d2.b.unlock.s3.voice_note_after_fitting",
            "d2.b.unlock.s4.afraid_to_be_bad_friend",
            "d2.b.unlock.s5.admit_late_correction"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "서아가 들러리와 축가를 둘 다 명시적으로 확정했는가",
      "summary": "두 역할을 한 번에 확정하는 명시적 메시지는 없었고, 공유 체크리스트의 상태 표시와 댓글, 서아의 조건부 답장이 서로 다른 의미로 읽히며 오해가 쌓였다.",
      "requiredEvidenceIds": [
        "e-1",
        "e-2",
        "e-3"
      ],
      "weight": "high",
      "ambiguity": "low",
      "mediationLink": "역할재정리",
      "legitimacyIssue": false,
      "judgmentStatement": "서아는 두 역할을 확정하지 않았다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "둘다확정",
        "들러리축가",
        "상태범례",
        "모바일요약뷰",
        "명시적확정",
        "오해누적"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "겉보기엔 그럴듯한 오해의 모양이 보인다.",
          "lockedSummary": "지금은 오해의 껍데기만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend10:a:d-3:context:0",
            "friend10:b:d-3:rule:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 둘 다 그 오해를 붙잡았는지 드러난다.",
          "lockedSummary": "왜 이 오해가 굳었는지는 아직 보이지 않습니다.",
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
            "friend10:a:d-3:context:0",
            "friend10:a:d-3:evidence:1",
            "d3.a.unlock.s2.relied_on_cropped_chat",
            "friend10:b:d-3:rule:0",
            "friend10:b:d-3:evidence:1",
            "d3.b.unlock.s2.bridesmaid_vs_song_split"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "오해를 벗기면 실제 책임 배치가 드러난다.",
          "lockedSummary": "오해 뒤의 실제 구조는 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:misbelief_shaken"
            ]
          },
          "revealAtomIds": [
            "friend10:a:d-3:context:0",
            "friend10:a:d-3:evidence:1",
            "friend10:a:d-3:self_justification:2",
            "d3.a.unlock.s2.relied_on_cropped_chat",
            "d3.a.unlock.s3.sheet_status_conflation",
            "d3.a.unlock.s4.did_not_want_to_reopen",
            "friend10:b:d-3:rule:0",
            "friend10:b:d-3:evidence:1",
            "friend10:b:d-3:uncertainty:2",
            "d3.b.unlock.s2.bridesmaid_vs_song_split",
            "d3.b.unlock.s3.ambiguous_wording_helped_confusion",
            "d3.b.unlock.s4.felt_obligated_by_old_jokes"
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
          "잘린 카톡 한 장만 보면 두 역할을 한꺼번에 수락한 듯 보인다.",
          "모바일 요약뷰에서 상태 범례가 접히면 이름 두 칸만 남는다.",
          "반주자 가예약 메모를 빼면 축가 확정처럼 읽힌다."
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-3",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    },
    {
      "id": "d-4",
      "name": "이전 '확정 후 공지' 규칙의 쌍방 위반",
      "summary": "둘은 예전부터 웨딩 역할은 한 채팅방에서 명시적 '확정'을 받은 뒤에만 알리기로 했지만, 다정은 먼저 이름을 써 버렸고 서아는 오해가 커지는 동안 바로 정정하지 않았다.",
      "requiredEvidenceIds": [
        "e-4",
        "e-5"
      ],
      "weight": "medium",
      "ambiguity": "none",
      "mediationLink": "친구경계",
      "legitimacyIssue": false,
      "judgmentStatement": "다정은 규칙을 위반했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "확정후공지",
        "웨딩역할",
        "같은채팅방",
        "예전규칙",
        "쌍방위반",
        "먼저기재",
        "바로정정"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "앞뒤 맥락과 후속 조치의 겉면이 보인다.",
          "lockedSummary": "주변 맥락은 아직 흐릿합니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend10:a:d-4:rule:0",
            "friend10:a:d-4:act:1",
            "friend10:b:d-4:rule:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "체면, 관계, 불안이 왜 개입했는지 드러난다.",
          "lockedSummary": "왜 그 맥락이 중요해졌는지는 아직 보이지 않습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "friend10:a:d-4:rule:0",
            "friend10:a:d-4:act:1",
            "d4.a.unlock.s2.knew_rule_exactly",
            "d4.a.unlock.s3.used_silence_as_cover"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "주요 쟁점을 지탱하거나 흔드는 연결 구조가 드러난다.",
          "lockedSummary": "연결된 책임 구조는 아직 잠겨 있습니다.",
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
              "d-4:motive:context_open"
            ]
          },
          "revealAtomIds": [
            "friend10:a:d-4:rule:0",
            "friend10:a:d-4:act:1",
            "friend10:a:d-4:counter:2",
            "d4.a.unlock.s2.knew_rule_exactly",
            "d4.a.unlock.s3.used_silence_as_cover",
            "d4.a.unlock.s4.shame_about_repeating_old_mistake",
            "friend10:b:d-4:rule:0",
            "friend10:b:d-4:motive:1",
            "friend10:b:d-4:harm:2",
            "d4.b.unlock.s2.small_admission_delay",
            "d4.b.unlock.s3.text_correction_avoided",
            "d4.b.unlock.s4.guilt_watching_it_spread"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "서아의 들러리 참여 자체도 전부 미확정이었는가",
      "summary": "축가는 끝까지 후보 단계였지만, 서아는 드레스 치수 제출과 입장 동선 확인까지 마쳐 들러리 역할은 사실상 수락 단계에 가까웠다.",
      "requiredEvidenceIds": [
        "e-2",
        "e-6"
      ],
      "weight": "high",
      "ambiguity": "low",
      "mediationLink": "일정복구",
      "legitimacyIssue": false,
      "judgmentStatement": "서아는 들러리 역할을 수락했다.",
      "disputeKind": "red_herring",
      "disputeAliases": [
        "들러리수락",
        "입장동선",
        "치수표",
        "후보아님",
        "거의확정",
        "축가만후보"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "주목을 빼앗는 가짜 쟁점의 외형이 보인다.",
          "lockedSummary": "눈길을 빼앗는 가짜 쟁점만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "friend10:a:d-5:act:0",
            "friend10:b:d-5:denial:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "왜 이 가짜 쟁점이 쉽게 믿어졌는지 드러난다.",
          "lockedSummary": "왜 이 쟁점이 크게 보였는지는 아직 모릅니다.",
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
            "friend10:a:d-5:act:0",
            "friend10:a:d-5:threshold:1",
            "d5.a.unlock.s2.bridesmaid_near_acceptance",
            "friend10:b:d-5:denial:0",
            "friend10:b:d-5:context:1",
            "d5.b.unlock.s2.bridesmaid_was_far_along"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "가짜 쟁점을 걷어내야 본래 핵심이 드러난다.",
          "lockedSummary": "본래 핵심은 아직 가려져 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:surface:misbelief_shaken"
            ]
          },
          "revealAtomIds": [
            "friend10:a:d-5:act:0",
            "friend10:a:d-5:threshold:1",
            "friend10:a:d-5:context:2",
            "d5.a.unlock.s2.bridesmaid_near_acceptance",
            "d5.a.unlock.s3.linked_song_too",
            "d5.a.unlock.s4.felt_revision_impossible",
            "friend10:b:d-5:denial:0",
            "friend10:b:d-5:context:1",
            "friend10:b:d-5:evidence:2",
            "d5.b.unlock.s2.bridesmaid_was_far_along",
            "d5.b.unlock.s3.held_song_back_only",
            "d5.b.unlock.s4.did_not_want_bride_angry"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "misconception": {
        "beliefModeByParty": {
          "a": "suspects",
          "b": "weaponizes"
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
          "축가가 후보였다는 사실을 들러리 동선까지 전부 미확정으로 밀어붙인다.",
          "음성메모 지연만 보면 실제로 진행된 치수·동선 제출이 가려진다."
        ],
        "truthExitEvidenceIds": [
          "e-2",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해 해소"
      }
    }
  ],
  "linkEdges": [
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
        "supportBonus": 12,
        "grantFlag": "d-3:surface:pre_notice_seen"
      },
      "uiLabel": "선공지로 오해가 굳어짐"
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
        "supportBonus": 12,
        "grantFlag": "d-3:surface:ambiguous_reply_seen"
      },
      "uiLabel": "애매한 답장이 오해를 키움"
    },
    {
      "id": "link:d-4:d-1:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-1",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-1:core:rule_break_seen"
      },
      "uiLabel": "예전 규칙이 먼저 깨짐"
    },
    {
      "id": "link:d-5:d-3:weakens_counter",
      "fromDisputeId": "d-5",
      "toDisputeId": "d-3",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-3:core:bridesmaid_progress_seen"
      },
      "uiLabel": "들러리 진행이 전면 미확정을 약화"
    },
    {
      "id": "link:d-2:d-5:supports",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:surface:delay_seen"
      },
      "uiLabel": "늦은 정정이 구분을 더 흐림"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "서아의 '그 주 비워볼게' 카톡 캡처",
      "description": "서아가 그 주를 비워보겠고 노래 키를 보자는 말만 보이는 잘린 카카오톡 캡처다.",
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
      "timing": {
        "intent": "disarm_trap",
        "role": "reframe",
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
          "context",
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
            "multiplier": 1.35,
            "note": "잘린 첫 인상이 굳기 전에 제시할수록 오해를 빨리 걷어낸다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "공유 웨딩 체크리스트 revision history와 상태 범례",
      "description": "서아의 이름이 들러리와 축가 항목에 함께 올라가 있었지만, 들러리는 진행중·축가는 후보로 따로 표시된 공유 문서 원본이다.",
      "type": "platform_log",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "platform",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "timing": {
        "intent": "expose",
        "role": "establish",
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
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.3,
            "note": "행위 주체와 시점을 먼저 못 박는 데 가장 강하다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "유상우 반주자 DM과 가예약 메모",
      "description": "유상우가 키를 먼저 확인해 보자고 했고, 축가 슬롯은 가예약 상태로만 잡혀 있었다는 DM과 메모다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-3"
      ],
      "isTrap": false,
      "timing": {
        "intent": "contextualize",
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
          "motive_search",
          "evidence_present"
        ],
        "preferredAngles": [
          "context",
          "motive"
        ],
        "blockedVectorsHelp": [
          "context",
          "motive"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.25,
            "note": "앞뒤 맥락을 붙여 해석 충돌을 정리할 때 가장 효율적이다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "다정의 가족 단톡·플래너 전달 라인업과 리허설표",
      "description": "다정이 서아를 들러리 겸 축가로 적어 가족 단톡과 플래너에게 전달한 라인업, 리허설표 원본이다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-4"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
        "role": "establish",
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
          "motive_search",
          "evidence_present"
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
            "state": "S2",
            "multiplier": 1.25,
            "note": "말의 순서와 뉘앙스를 비교해 책임선을 좁히는 데 유리하다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "이전 결혼식 뒤 '확정' 규칙 대화",
      "description": "두 사람이 예전에 웨딩 역할은 한 채팅방에서 명시적 '확정'을 받은 뒤에만 알리자고 합의한 카카오톡 원본이다.",
      "type": "chat",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "timing": {
        "intent": "corroborate",
        "role": "establish",
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
          "motive_search",
          "evidence_present"
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
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.25,
            "note": "말의 순서와 뉘앙스를 비교해 책임선을 좁히는 데 유리하다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "드레스 치수표, 입장 동선 확인표, 서아 음성메모",
      "description": "서아가 들러리 드레스 치수와 입장 동선을 보냈고, 이후 음성메모에서 목 상태 때문에 축가는 아직 확답 못 한다고 말한 자료다.",
      "type": "document",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "mixed",
      "legitimacy": "lawful",
      "proves": [
        "d-2",
        "d-5"
      ],
      "isTrap": false,
      "timing": {
        "intent": "expose",
        "role": "establish",
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
          "timeline",
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.3,
            "note": "행위 주체와 시점을 먼저 못 박는 데 가장 강하다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:pre_notice_scope",
      "intentTag": "context_check",
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
          "friend10:a:d-1:act:0",
          "friend10:a:d-1:timeline:1",
          "d1.a.unlock.s2.internal_draft",
          "friend10:b:d-1:act:0",
          "friend10:b:d-1:harm:1",
          "d1.b.unlock.s2.no_explicit_consent"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "맥락까지 다 풀면 여기서 끝나지 않아요.",
        "앞뒤를 다 말해야 해서 지금은 짧게 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-1:no_confirm_text",
      "intentTag": "timeline_check",
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
          "friend10:a:d-1:act:0",
          "friend10:a:d-1:timeline:1",
          "d1.a.unlock.s2.internal_draft",
          "friend10:b:d-1:act:0",
          "friend10:b:d-1:harm:1",
          "d1.b.unlock.s2.no_explicit_consent"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 순서를 다시 꺼내면 얘기가 더 꼬여요.",
        "그 시점은 지금 한 줄로 잘라 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-2:reply_signal_scope",
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
          "friend10:a:d-2:act:0",
          "friend10:a:d-2:timeline:1",
          "d2.a.unlock.s2.treated_as_yes",
          "friend10:b:d-2:denial:0",
          "friend10:b:d-2:motive:1",
          "d2.b.unlock.s2.knew_it_sounded_like_yes"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 주체를 바로 잘라 말하고 싶지 않아요.",
        "누가 먼저였는지까지는 아직 정리해서 말하겠습니다."
      ]
    },
    {
      "id": "fq:d-2:delay_reason",
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
          "friend10:a:d-2:act:0",
          "friend10:a:d-2:timeline:1",
          "friend10:a:d-2:harm:2",
          "d2.a.unlock.s2.treated_as_yes",
          "d2.a.unlock.s3.kept_preparation_running",
          "d2.a.unlock.s4.felt_left_holding_bag",
          "friend10:b:d-2:denial:0",
          "friend10:b:d-2:motive:1",
          "friend10:b:d-2:evidence:2",
          "d2.b.unlock.s2.knew_it_sounded_like_yes",
          "d2.b.unlock.s3.voice_note_after_fitting",
          "d2.b.unlock.s4.afraid_to_be_bad_friend"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "의도 얘기까지 가면 감정이 너무 섞여요.",
        "왜 그랬는지까지는 아직 바로 말하고 싶지 않습니다."
      ]
    },
    {
      "id": "fq:d-3:double_confirm_scope",
      "intentTag": "context_check",
      "allowedAtStates": [
        "M1",
        "M2",
        "M3"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-3",
        "allowAtomIds": [
          "friend10:a:d-3:context:0",
          "friend10:a:d-3:evidence:1",
          "d3.a.unlock.s2.relied_on_cropped_chat",
          "friend10:b:d-3:rule:0",
          "friend10:b:d-3:evidence:1",
          "d3.b.unlock.s2.bridesmaid_vs_song_split"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "맥락까지 다 풀면 여기서 끝나지 않아요.",
        "앞뒤를 다 말해야 해서 지금은 짧게 답하기 어렵습니다."
      ]
    },
    {
      "id": "fq:d-4:rule_recall",
      "intentTag": "rule_check",
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
          "friend10:a:d-4:rule:0",
          "friend10:a:d-4:act:1",
          "d4.a.unlock.s2.knew_rule_exactly",
          "friend10:b:d-4:rule:0",
          "friend10:b:d-4:motive:1",
          "d4.b.unlock.s2.small_admission_delay"
        ],
        "preferredAngleTags": [
          "legality"
        ]
      },
      "refusalTemplates": [
        "규칙 문제까지 지금 당장 단정하긴 어렵습니다.",
        "그건 먼저 기록을 같이 보고 말해야 합니다."
      ]
    },
    {
      "id": "fq:d-5:bridesmaid_progress",
      "intentTag": "responsibility_check",
      "allowedAtStates": [
        "M2",
        "M3",
        "M4"
      ],
      "allowedIssueRoles": [
        "red_herring"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "friend10:a:d-5:act:0",
          "friend10:a:d-5:threshold:1",
          "d5.a.unlock.s2.bridesmaid_near_acceptance",
          "friend10:b:d-5:denial:0",
          "friend10:b:d-5:context:1",
          "d5.b.unlock.s2.bridesmaid_was_far_along"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 그 주체를 바로 잘라 말하고 싶지 않아요.",
        "누가 먼저였는지까지는 아직 정리해서 말하겠습니다."
      ]
    }
  ],
  "proposedUnlockAtoms": [
    {
      "id": "friend10:a:d-1:unlock:s2:01",
      "legacySourceId": "d1.a.unlock.s2.internal_draft",
      "party": "a",
      "disputeId": "d-1",
      "unlockedAtState": "S2",
      "factText": "플래너 전달본과 가족 공유를 스스로는 내부 초안급으로 여기며 이름 선사용을 정당화한 사실",
      "tags": [
        "context",
        "self_justification",
        "institution"
      ],
      "slots": {
        "institution": {
          "exact": "오혜민 플래너 공유 라인업",
          "judgeRef": "플래너",
          "neutral": "준비 기관"
        },
        "channels": {
          "exact": "가족 단톡",
          "neutral": "가족 공유"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend10:a:d-1:unlock:s3:01",
      "legacySourceId": "d1.a.unlock.s3.no_confirm_text",
      "party": "a",
      "disputeId": "d-1",
      "unlockedAtState": "S3",
      "factText": "서아의 명시적 '확정' 문구가 없다는 걸 알면서도 이름을 빼면 더 혼란스러울까 봐 그대로 둔 사실",
      "tags": [
        "admission",
        "timeline",
        "fear"
      ],
      "slots": {
        "person": {
          "fullName": "한서아",
          "judgeRef": "서아 씨",
          "neutral": "상대"
        },
        "quote": {
          "exact": "확정",
          "neutral": "그 문구"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-1:unlock:s4:01",
      "legacySourceId": "d1.a.unlock.s4.face_before_family",
      "party": "a",
      "disputeId": "d-1",
      "unlockedAtState": "S4",
      "factText": "가족 단톡까지 간 이름을 거두면 자신이 준비를 망친 사람처럼 보일까 봐 겁났던 감정",
      "tags": [
        "emotion",
        "fear",
        "relationship"
      ],
      "slots": {
        "channels": {
          "exact": "가족 단톡",
          "neutral": "가족 공유"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:a:d-1:unlock:s5:01",
      "legacySourceId": "d1.a.unlock.s5.own_premature_notice",
      "party": "a",
      "disputeId": "d-1",
      "unlockedAtState": "S5",
      "factText": "서아의 약속이 아니라 자신의 성급한 결정으로 이름을 선사용했다는 인정",
      "tags": [
        "responsibility",
        "admission",
        "admission"
      ],
      "slots": {
        "person": {
          "fullName": "한서아",
          "judgeRef": "서아 씨",
          "neutral": "상대"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-2:unlock:s2:01",
      "legacySourceId": "d2.a.unlock.s2.treated_as_yes",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S2",
      "factText": "다정이 그 표현들을 사실상 수락 신호로 굳혀 읽은 사실",
      "tags": [
        "context",
        "self_justification",
        "quote"
      ],
      "slots": {
        "quote": {
          "exact": "그 주 비워볼게 / 키 한번 보자",
          "neutral": "그 표현들"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend10:a:d-2:unlock:s3:01",
      "legacySourceId": "d2.a.unlock.s3.kept_preparation_running",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S3",
      "factText": "서아가 바로 정정하지 않으니 준비를 계속 밀어도 된다고 믿은 사실",
      "tags": [
        "timeline",
        "motive",
        "admission"
      ],
      "slots": {
        "person": {
          "fullName": "한서아",
          "judgeRef": "서아 씨",
          "neutral": "상대"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-2:unlock:s4:01",
      "legacySourceId": "d2.a.unlock.s4.felt_left_holding_bag",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S4",
      "factText": "혼자 일정 복구를 떠안게 될까 봐 배신감이 커졌던 감정",
      "tags": [
        "emotion",
        "harm",
        "relationship"
      ],
      "slots": {},
      "stanceHints": [
        "emotional",
        "blame"
      ]
    },
    {
      "id": "friend10:a:d-2:unlock:s5:01",
      "legacySourceId": "d2.a.unlock.s5.admit_overread_signals",
      "party": "a",
      "disputeId": "d-2",
      "unlockedAtState": "S5",
      "factText": "서아의 책임과 별개로 자신도 애매한 답을 확정으로 앞질러 읽었다는 인정",
      "tags": [
        "admission",
        "responsibility",
        "uncertainty"
      ],
      "slots": {
        "person": {
          "fullName": "한서아",
          "judgeRef": "서아 씨",
          "neutral": "상대"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-3:unlock:s2:01",
      "legacySourceId": "d3.a.unlock.s2.relied_on_cropped_chat",
      "party": "a",
      "disputeId": "d-3",
      "unlockedAtState": "S2",
      "factText": "잘린 캡처의 강한 뉘앙스를 전체 맥락보다 더 믿은 사실",
      "tags": [
        "evidence",
        "context",
        "privacy"
      ],
      "slots": {
        "quote": {
          "exact": "그 주 비워볼게",
          "neutral": "잘린 문장"
        },
        "channels": {
          "exact": "잘린 카카오톡 캡처",
          "neutral": "캡처 자료"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend10:a:d-3:unlock:s3:01",
      "legacySourceId": "d3.a.unlock.s3.sheet_status_conflation",
      "party": "a",
      "disputeId": "d-3",
      "unlockedAtState": "S3",
      "factText": "모바일 요약뷰에서 이름만 두 칸에 보여 상태 범례를 제대로 보지 못한 사실",
      "tags": [
        "admission",
        "evidence",
        "context"
      ],
      "slots": {
        "roles": {
          "exact": "들러리 / 축가",
          "split": "들러리 / 축가",
          "neutral": "예식 역할"
        },
        "channels": {
          "exact": "공유 체크리스트 모바일 요약뷰",
          "neutral": "공유 시트"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-3:unlock:s4:01",
      "legacySourceId": "d3.a.unlock.s4.did_not_want_to_reopen",
      "party": "a",
      "disputeId": "d-3",
      "unlockedAtState": "S4",
      "factText": "두 역할을 다시 나누어 확인하면 이미 해 둔 공지를 모두 뒤집어야 할까 봐 피한 감정",
      "tags": [
        "fear",
        "emotion",
        "relationship"
      ],
      "slots": {
        "roles": {
          "exact": "들러리 / 축가",
          "split": "들러리 / 축가",
          "neutral": "예식 역할"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:a:d-3:unlock:s5:01",
      "legacySourceId": "d3.a.unlock.s5.admit_no_explicit_double_confirm",
      "party": "a",
      "disputeId": "d-3",
      "unlockedAtState": "S5",
      "factText": "둘 다를 명시적으로 확정한 메시지는 없었다는 점을 인정",
      "tags": [
        "admission",
        "admission",
        "threshold"
      ],
      "slots": {
        "quote": {
          "exact": "둘 다 확정",
          "neutral": "그 문장"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-4:unlock:s2:01",
      "legacySourceId": "d4.a.unlock.s2.knew_rule_exactly",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S2",
      "factText": "이번 일에서도 명시적 '확정' 문구가 필요하다는 걸 정확히 알고 있었다는 사실",
      "tags": [
        "admission",
        "rule",
        "quote"
      ],
      "slots": {
        "quote": {
          "exact": "확정",
          "neutral": "그 문구"
        }
      },
      "stanceHints": [
        "partial",
        "shame"
      ]
    },
    {
      "id": "friend10:a:d-4:unlock:s3:01",
      "legacySourceId": "d4.a.unlock.s3.used_silence_as_cover",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S3",
      "factText": "서아가 바로 반발하지 않는 침묵을 사실상 허락처럼 사용한 사실",
      "tags": [
        "admission",
        "relationship",
        "counter"
      ],
      "slots": {
        "person": {
          "fullName": "한서아",
          "judgeRef": "서아 씨",
          "neutral": "상대"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "friend10:a:d-4:unlock:s4:01",
      "legacySourceId": "d4.a.unlock.s4.shame_about_repeating_old_mistake",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S4",
      "factText": "2년 전 겪은 일을 또 반복했다는 사실이 부끄러웠던 감정",
      "tags": [
        "shame",
        "emotion",
        "legacy_sentence"
      ],
      "slots": {
        "time": {
          "dateExact": "2년 전",
          "period": "예전 결혼식 역할 혼선 이후",
          "neutral": "예전"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:a:d-4:unlock:s5:01",
      "legacySourceId": "d4.a.unlock.s5.admit_rule_break_first",
      "party": "a",
      "disputeId": "d-4",
      "unlockedAtState": "S5",
      "factText": "규칙을 먼저 깬 쪽은 자신이었다는 인정",
      "tags": [
        "admission",
        "responsibility",
        "admission"
      ],
      "slots": {},
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-5:unlock:s2:01",
      "legacySourceId": "d5.a.unlock.s2.bridesmaid_near_acceptance",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S2",
      "factText": "적어도 들러리 쪽은 실무상 거의 확정처럼 굴러갔다는 사실",
      "tags": [
        "threshold",
        "evidence",
        "context"
      ],
      "slots": {
        "roles": {
          "exact": "거의 확정",
          "split": "들러리",
          "neutral": "역할 상태"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend10:a:d-5:unlock:s3:01",
      "legacySourceId": "d5.a.unlock.s3.linked_song_too",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S3",
      "factText": "그 흐름을 축가 수락 가능성까지 확장해서 읽은 사실",
      "tags": [
        "admission",
        "identity",
        "self_justification"
      ],
      "slots": {
        "roles": {
          "exact": "들러리 → 축가",
          "split": "들러리 / 축가",
          "neutral": "역할 연결"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:a:d-5:unlock:s4:01",
      "legacySourceId": "d5.a.unlock.s4.felt_revision_impossible",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S4",
      "factText": "들러리까지 다시 미확정으로 돌리면 준비 전체가 무너질까 봐 겁났던 감정",
      "tags": [
        "fear",
        "emotion",
        "harm"
      ],
      "slots": {},
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:a:d-5:unlock:s5:01",
      "legacySourceId": "d5.a.unlock.s5.admit_no_text_but_real_progress",
      "party": "a",
      "disputeId": "d-5",
      "unlockedAtState": "S5",
      "factText": "확정 문자는 없었지만 들러리 준비가 깊게 진행된 것도 사실이고 자신이 그 진행을 더 과신한 것도 사실이라는 인정",
      "tags": [
        "admission",
        "admission",
        "responsibility"
      ],
      "slots": {
        "quote": {
          "exact": "확정",
          "neutral": "그 문구"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-1:unlock:s2:01",
      "legacySourceId": "d1.b.unlock.s2.no_explicit_consent",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S2",
      "factText": "자신은 끝내 '확정' 문구를 보내지 않았다는 기억",
      "tags": [
        "quote",
        "denial",
        "evidence"
      ],
      "slots": {
        "quote": {
          "exact": "확정",
          "neutral": "그 문구"
        }
      },
      "stanceHints": [
        "partial",
        "counter"
      ]
    },
    {
      "id": "friend10:b:d-1:unlock:s3:01",
      "legacySourceId": "d1.b.unlock.s3.could_not_pull_name_back",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S3",
      "factText": "이미 여러 사람에게 이름이 퍼진 뒤라 당장 빼 달라고 하기가 늦어졌던 사실",
      "tags": [
        "timeline",
        "fear",
        "relationship"
      ],
      "slots": {
        "channels": {
          "exact": "가족 단톡·플래너 전달본",
          "neutral": "주변 공유"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-1:unlock:s4:01",
      "legacySourceId": "d1.b.unlock.s4.used_without_consent",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S4",
      "factText": "가까운 친구의 호의가 동의 없는 공식 역할처럼 소비됐다고 느낀 감정",
      "tags": [
        "emotion",
        "harm",
        "relationship"
      ],
      "slots": {
        "roles": {
          "exact": "공식 들러리·축가",
          "split": "들러리 / 축가",
          "neutral": "공식 역할"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:b:d-1:unlock:s5:01",
      "legacySourceId": "d1.b.unlock.s5.admit_delayed_pushback",
      "party": "b",
      "disputeId": "d-1",
      "unlockedAtState": "S5",
      "factText": "이름 선사용은 다정의 잘못이지만, 자신도 초기에 강하게 제동을 못 걸어 오해를 키웠다는 인정",
      "tags": [
        "responsibility",
        "admission",
        "relationship"
      ],
      "slots": {
        "person": {
          "fullName": "문다정",
          "judgeRef": "다정 씨",
          "neutral": "상대"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-2:unlock:s2:01",
      "legacySourceId": "d2.b.unlock.s2.knew_it_sounded_like_yes",
      "party": "b",
      "disputeId": "d-2",
      "unlockedAtState": "S2",
      "factText": "비워볼게와 키 확인이 다정에게는 예스로 읽힐 수 있다는 걸 알고 있었던 사실",
      "tags": [
        "admission",
        "quote",
        "relationship"
      ],
      "slots": {
        "person": {
          "fullName": "문다정",
          "judgeRef": "다정 씨",
          "neutral": "상대"
        },
        "quote": {
          "exact": "그 주 비워볼게 / 키 한번 보자",
          "neutral": "그 표현들"
        }
      },
      "stanceHints": [
        "partial",
        "shame"
      ]
    },
    {
      "id": "friend10:b:d-2:unlock:s3:01",
      "legacySourceId": "d2.b.unlock.s3.voice_note_after_fitting",
      "party": "b",
      "disputeId": "d-2",
      "unlockedAtState": "S3",
      "factText": "최종 불가 설명을 드레스 피팅 주간의 음성메모까지 끌었던 사실",
      "tags": [
        "timeline",
        "evidence",
        "admission"
      ],
      "slots": {
        "time": {
          "dateExact": "드레스 피팅 주간",
          "period": "예식 직전",
          "neutral": "그 무렵"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-2:unlock:s4:01",
      "legacySourceId": "d2.b.unlock.s4.afraid_to_be_bad_friend",
      "party": "b",
      "disputeId": "d-2",
      "unlockedAtState": "S4",
      "factText": "거절하는 순간 결혼식을 망친 친구로 찍힐까 두려웠던 감정",
      "tags": [
        "fear",
        "emotion",
        "relationship"
      ],
      "slots": {
        "person": {
          "fullName": "문다정",
          "judgeRef": "다정 씨",
          "neutral": "친구"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:b:d-2:unlock:s5:01",
      "legacySourceId": "d2.b.unlock.s5.admit_late_correction",
      "party": "b",
      "disputeId": "d-2",
      "unlockedAtState": "S5",
      "factText": "확정은 아니었지만 기대를 키운 채 늦게 정정한 책임은 자신의 몫이라는 인정",
      "tags": [
        "responsibility",
        "admission",
        "admission"
      ],
      "slots": {},
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-3:unlock:s2:01",
      "legacySourceId": "d3.b.unlock.s2.bridesmaid_vs_song_split",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S2",
      "factText": "자신은 들러리와 축가를 마음속에서 분리해 생각하고 있었다는 사실",
      "tags": [
        "context",
        "identity",
        "admission"
      ],
      "slots": {
        "roles": {
          "exact": "들러리 / 축가",
          "split": "들러리 / 축가",
          "neutral": "예식 역할"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-3:unlock:s3:01",
      "legacySourceId": "d3.b.unlock.s3.ambiguous_wording_helped_confusion",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S3",
      "factText": "하지만 텍스트에서는 그 역할 분리가 충분히 드러나지 않았다는 인정",
      "tags": [
        "admission",
        "quote",
        "responsibility"
      ],
      "slots": {
        "quote": {
          "exact": "아마 / 일정만 되면 / 목만 괜찮으면",
          "neutral": "그 단서들"
        }
      },
      "stanceHints": [
        "partial",
        "shame"
      ]
    },
    {
      "id": "friend10:b:d-3:unlock:s4:01",
      "legacySourceId": "d3.b.unlock.s4.felt_obligated_by_old_jokes",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S4",
      "factText": "예전 축가 농담과 과거 도움 때문에 더 단호하게 선을 못 그은 감정",
      "tags": [
        "legacy_sentence",
        "emotion",
        "relationship"
      ],
      "slots": {
        "time": {
          "dateExact": "대학 졸업공연 이후",
          "period": "오래된 농담의 연장선",
          "neutral": "예전"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:b:d-3:unlock:s5:01",
      "legacySourceId": "d3.b.unlock.s5.admit_mixed_signal_package",
      "party": "b",
      "disputeId": "d-3",
      "unlockedAtState": "S5",
      "factText": "둘 다 확정은 아니었지만 패키지 수락처럼 들릴 신호를 보낸 책임은 인정",
      "tags": [
        "responsibility",
        "admission",
        "admission"
      ],
      "slots": {
        "roles": {
          "exact": "들러리·축가 패키지",
          "split": "들러리 / 축가",
          "neutral": "예식 역할"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-4:unlock:s2:01",
      "legacySourceId": "d4.b.unlock.s2.small_admission_delay",
      "party": "b",
      "disputeId": "d-4",
      "unlockedAtState": "S2",
      "factText": "다정을 다치게 하기 싫어서 바로 '아니야'라고 못 했다는 작은 인정",
      "tags": [
        "admission",
        "relationship",
        "fear"
      ],
      "slots": {
        "person": {
          "fullName": "문다정",
          "judgeRef": "다정 씨",
          "neutral": "친구"
        },
        "quote": {
          "exact": "아니야",
          "neutral": "그 정정"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-4:unlock:s3:01",
      "legacySourceId": "d4.b.unlock.s3.text_correction_avoided",
      "party": "b",
      "disputeId": "d-4",
      "unlockedAtState": "S3",
      "factText": "음성메모로 길게 설명하면서 문자로 명확히 끊는 걸 피한 사실",
      "tags": [
        "admission",
        "quote",
        "context"
      ],
      "slots": {
        "channels": {
          "exact": "음성메모",
          "neutral": "그 형식"
        }
      },
      "stanceHints": [
        "partial",
        "shame"
      ]
    },
    {
      "id": "friend10:b:d-4:unlock:s4:01",
      "legacySourceId": "d4.b.unlock.s4.guilt_watching_it_spread",
      "party": "b",
      "disputeId": "d-4",
      "unlockedAtState": "S4",
      "factText": "가족과 플래너까지 이름이 퍼지는 걸 보며 죄책감이 쌓였던 감정",
      "tags": [
        "emotion",
        "shame",
        "relationship"
      ],
      "slots": {
        "channels": {
          "exact": "가족 단톡·플래너 전달본",
          "neutral": "주변 공유"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:b:d-4:unlock:s5:01",
      "legacySourceId": "d4.b.unlock.s5.admit_rule_break_by_silence",
      "party": "b",
      "disputeId": "d-4",
      "unlockedAtState": "S5",
      "factText": "직접 공지한 건 아니어도 바로 정정하지 않은 침묵으로 규칙을 함께 깼다는 인정",
      "tags": [
        "admission",
        "responsibility",
        "admission"
      ],
      "slots": {},
      "stanceHints": [
        "confess",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-5:unlock:s2:01",
      "legacySourceId": "d5.b.unlock.s2.bridesmaid_was_far_along",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S2",
      "factText": "들러리 준비는 검토 수준을 넘어 상당히 진행돼 있었다는 사실",
      "tags": [
        "admission",
        "threshold",
        "evidence"
      ],
      "slots": {
        "roles": {
          "exact": "상당히 진행",
          "split": "들러리",
          "neutral": "역할 상태"
        }
      },
      "stanceHints": [
        "partial",
        "shame"
      ]
    },
    {
      "id": "friend10:b:d-5:unlock:s3:01",
      "legacySourceId": "d5.b.unlock.s3.held_song_back_only",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S3",
      "factText": "끝까지 붙잡고 있던 건 주로 축가 확답이었다는 사실",
      "tags": [
        "identity",
        "admission",
        "context"
      ],
      "slots": {
        "roles": {
          "exact": "축가 확답",
          "split": "축가",
          "neutral": "역할 상태"
        }
      },
      "stanceHints": [
        "partial",
        "emotional"
      ]
    },
    {
      "id": "friend10:b:d-5:unlock:s4:01",
      "legacySourceId": "d5.b.unlock.s4.did_not_want_bride_angry",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S4",
      "factText": "들러리마저 빼겠다고 하면 다정이 완전히 무너질까 두려웠던 감정",
      "tags": [
        "fear",
        "emotion",
        "relationship"
      ],
      "slots": {
        "person": {
          "fullName": "문다정",
          "judgeRef": "다정 씨",
          "neutral": "친구"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "friend10:b:d-5:unlock:s5:01",
      "legacySourceId": "d5.b.unlock.s5.admit_bridesmaid_near_yes",
      "party": "b",
      "disputeId": "d-5",
      "unlockedAtState": "S5",
      "factText": "들러리는 사실상 수락 단계에 가까웠고, 전부 미확정이었다고 말한 건 과장이라는 인정",
      "tags": [
        "admission",
        "responsibility",
        "admission"
      ],
      "slots": {
        "roles": {
          "exact": "사실상 수락 단계",
          "split": "들러리",
          "neutral": "역할 상태"
        }
      },
      "stanceHints": [
        "confess",
        "emotional"
      ]
    }
  ],
  "phase3LogHints": {
    "relationCoreDisputes": [
      "d-3",
      "d-4"
    ],
    "playerStyleTagCandidates": [
      "pressure_heavy",
      "rapport_heavy",
      "evidence_closer",
      "rule_enforcer"
    ]
  }
} as const;

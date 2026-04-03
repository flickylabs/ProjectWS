export const tenant04StructureV2 = {
  "caseId": "tenant-04",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "월세→전세 전환이 이미 확정됐는가",
      "judgmentStatement": "전환 계약은 완성되지 않았다.",
      "requiredEvidence": [
        "e-1",
        "e-6"
      ],
      "truthDescription": "두 사람은 전환 방향에만 가까워졌을 뿐, 최종 금액·시작일·중개보수·공동명의 서명이 빠져 있어 완성된 전세 전환 계약으로 보긴 어렵다.",
      "disputeKind": "shared_misconception",
      "disputeAliases": [
        "거의 됐다",
        "가자는 방향",
        "서류 보고 정리",
        "전세 전환",
        "초안 빈칸",
        "공유 오해"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "월세→전세 전환이 이미 확정됐는가에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant04:a:d-1:uncertainty:0",
            "tenant04:b:d-1:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "월세→전세 전환이 이미 확정됐는가 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-1:fear:0",
            "tenant04:b:d-1:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "월세→전세 전환이 이미 확정됐는가의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-1:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-1:admission:1",
            "tenant04:b:d-1:admission:1"
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
            "summary": "외형상 의심만 남아 있다",
            "npcMode": "confused_defensive"
          },
          {
            "state": "M1",
            "summary": "방어와 당황이 앞선다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M2",
            "summary": "잘못된 해석이 굳어진다",
            "npcMode": "mistaken_certainty"
          },
          {
            "state": "M3",
            "summary": "혼란이 들어오며 확신이 흔들린다",
            "npcMode": "doubt_creeping"
          },
          {
            "state": "M4",
            "summary": "오해가 정리되고 맥락이 복원된다",
            "npcMode": "clarified"
          }
        ],
        "trapSignals": [
          "가자는 방향만 기억한다",
          "서류 보고 정리 단서를 지운다",
          "초안 빈칸을 무시하고 확정 단계로 해석한다"
        ],
        "truthExitEvidenceIds": [
          "e-1",
          "e-6"
        ],
        "clarifyOutcomeLabel": "오해가 정리되고 맥락이 복원된다"
      }
    },
    {
      "id": "d-2",
      "name": "성호의 공동명의 동의와 대출 비용 비공개",
      "judgmentStatement": "성호는 조건을 충분히 알리지 않았다.",
      "requiredEvidence": [
        "e-4",
        "e-6"
      ],
      "truthDescription": "성호는 아내 공동명의 서명과 기존 담보대출 중도상환수수료가 해결돼야 실제 전환이 가능하다는 핵심 조건을 초기 설명에서 충분히 알리지 않았다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "공동명의 서명",
        "중도상환수수료",
        "상환예상서",
        "아내 동의",
        "핵심 조건",
        "초기 비공개"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "성호의 공동명의 동의와 대출 비용 비공개에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant04:a:d-2:context:0",
            "tenant04:b:d-2:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "성호의 공동명의 동의와 대출 비용 비공개 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-2:emotion:0",
            "tenant04:b:d-2:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "성호의 공동명의 동의와 대출 비용 비공개의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-2:admission:0",
            "tenant04:b:d-2:admission:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-3",
      "name": "다은의 월세 중단",
      "judgmentStatement": "다은은 월세를 내지 않았다.",
      "requiredEvidence": [
        "e-2",
        "e-3"
      ],
      "truthDescription": "다은은 추가 보증금 송금 뒤 다음 달부터 월세가 바로 멈춘다고 믿고 한 달치 월세를 내지 않았다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "월세 한 달",
        "전환 준비금",
        "다음 달부터 멈춤",
        "2천만원 송금",
        "미납",
        "카카오톡 문맥"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "다은의 월세 중단에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant04:a:d-3:uncertainty:0",
            "tenant04:b:d-3:context:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "다은의 월세 중단 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-3:shame:0",
            "tenant04:b:d-3:emotion:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "다은의 월세 중단의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-3:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-3:admission:1",
            "tenant04:b:d-3:admission:0"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-4",
      "name": "성호의 예비 임차인 안내 통지",
      "judgmentStatement": "성호는 다은에게 협의 결렬을 통지하지 않았다.",
      "requiredEvidence": [
        "e-2",
        "e-5"
      ],
      "truthDescription": "성호는 전환 협의가 아직 미완이라고 판단해 집을 다른 예비 임차인에게 보여줬지만, 그 전에 다은에게 협의 결렬 의사를 분명히 통지하지는 않았다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "예비 임차인",
        "결렬 통지",
        "예약문자",
        "방문일지",
        "그다음 날",
        "집 보여주기"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "성호의 예비 임차인 안내 통지에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant04:a:d-4:rule:0",
            "tenant04:b:d-4:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "성호의 예비 임차인 안내 통지 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-4:emotion:0",
            "tenant04:b:d-4:fear:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "성호의 예비 임차인 안내 통지의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-4:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-4:admission:0",
            "tenant04:b:d-4:admission:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    },
    {
      "id": "d-5",
      "name": "추가 보증금 2천만원의 정산 기준",
      "judgmentStatement": "성호는 2천만원을 전액 몰취할 수 없다.",
      "requiredEvidence": [
        "e-3",
        "e-6"
      ],
      "truthDescription": "2천만원은 확정된 전세금 일부로 보기 어렵고, 그렇다고 성호가 전액 몰취할 수도 없다. 협의 실패 시 사용 기간과 약정 메모를 반영해 일부 차감 후 반환 기준을 다시 세워야 한다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "2천만원",
        "전환 준비금",
        "정산 기준",
        "일부 차감",
        "몰취 불가",
        "영수 메모"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "추가 보증금 2천만원의 정산 기준에서 겉으로 먼저 드러난 말과 장면을 확인합니다.",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant04:a:d-5:uncertainty:0",
            "tenant04:b:d-5:uncertainty:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "추가 보증금 2천만원의 정산 기준 뒤에 있는 불안과 계산을 드러냅니다.",
          "lockedSummary": "겉말 뒤의 계산과 불안은 아직 닫혀 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-5:shame:0",
            "tenant04:b:d-5:emotion:0"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "추가 보증금 2천만원의 정산 기준의 책임 경계와 실제 정산 기준을 확정합니다.",
          "lockedSummary": "책임과 기준을 가르는 핵심 층은 아직 열리지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-5",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-5:surface:opened"
            ]
          },
          "revealAtomIds": [
            "tenant04:a:d-5:admission:1",
            "tenant04:b:d-5:admission:1"
          ],
          "uiStyle": "relation_core"
        }
      ]
    }
  ],
  "linkEdges": [
    {
      "id": "link:d-2:d-1:unlocks_layer",
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "unlocks_layer",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-1:hidden_conditions_seen"
      },
      "uiLabel": "조건 비공개가 오해 해소"
    },
    {
      "id": "link:d-1:d-3:supports",
      "fromDisputeId": "d-1",
      "toDisputeId": "d-3",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-3:conversion_assumed"
      },
      "uiLabel": "확정 오해가 월세 중단으로 번짐"
    },
    {
      "id": "link:d-3:d-5:supports",
      "fromDisputeId": "d-3",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S3",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 8,
        "grantFlag": "d-5:rent_offset_needed"
      },
      "uiLabel": "미납 월세 차감"
    },
    {
      "id": "link:d-4:d-5:retaliation",
      "fromDisputeId": "d-4",
      "toDisputeId": "d-5",
      "type": "retaliation",
      "when": {
        "minState": "S2",
        "minLayer": "core"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-5:notice_order_focus"
      },
      "uiLabel": "안내 순서가 정산 감정 악화"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "전환 논의 음성메모와 통화 녹취 일부",
      "description": "다은이 중개사 사무실 방문 뒤 남긴 음성메모, 그리고 성호와 통화하며 '가자는 방향'이라는 표현이 오간 녹취 일부다.",
      "type": "record",
      "reliability": "soft",
      "completeness": "original",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-1"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "음성메모 원본과 통화 파일 원본이 함께 제출돼 발췌 편집 여부를 비교할 수 있었다.",
        "check_metadata": "메모는 중개사 사무실을 다녀온 직후 밤 10시대에 기록됐고, 통화 파일은 그보다 43분 앞선다.",
        "restore_context": "전체를 들으면 성호는 '가자는 방향'이라고 말하지만, 동시에 '서류 보고 정리하자'는 단서를 붙인다.",
        "verify_source": "휴대폰 파일 생성 시간과 통화 목록 시각이 일치한다.",
        "check_edits": "오디오 컷 편집 흔적은 없고 연속 녹음 구간이 자연스럽다.",
        "question_acquisition": "당사자 대화 녹취라 사용 가능성이 높지만 제3자 이름과 금융 조건이 포함돼 있어 공개 범위는 제한돼야 한다."
      },
      "subjectParty": "a",
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
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "기관 기록이 말보다 앞서는 시점"
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "공인중개사 포함 카카오톡 캡처",
      "description": "다은이 '다음 달부터 월세는 멈추는 거죠'라고 묻고, 성호가 즉답 대신 초안 이야기를 꺼내는 대화 일부 캡처다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-3",
        "d-4"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "처음 제출된 것은 다은 쪽 캡처뿐이었고, 나중에 성호 측 전체 대화 일부가 추가로 확보됐다.",
        "check_metadata": "캡처 생성 시각은 월세 미납이 확인된 당일 저녁으로 남아 있다.",
        "restore_context": "전체 문맥에는 성호가 '초안 보고 최종 정하자'고 쓴 문장이 바로 앞에 있었는데, 첫 제출본에서는 빠져 있었다.",
        "verify_source": "세 사람 단말의 메시지 순서와 읽음 시각이 대체로 맞아떨어진다.",
        "check_edits": "텍스트 자체 수정 흔적은 없지만 문맥을 바꾸는 선택적 크롭이 확인됐다.",
        "question_acquisition": "당사자와 중개사가 함께 있는 대화라 제3자 발언 공유에 대한 사생활 주의가 필요하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이다은에게: \"다은의 월세 중단\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 이다은의 \"다은의 월세 중단\" 쟁점과 관련된다. 이다은은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "장성호에게: \"성호의 예비 임차인 안내 통지\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 장성호의 \"성호의 예비 임차인 안내 통지\" 쟁점과 관련된다. 장성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "잘린 맥락을 원문으로 되돌려야 하는 시점"
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.2,
            "note": "잘린 맥락을 원문으로 되돌려야 하는 시점"
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "2천만원 추가 보증금 송금 내역과 영수 메모",
      "description": "다은이 성호 계좌로 2천만원을 보낸 거래내역과, 이체 메모란의 '전환 준비금' 표시 및 간단한 수기 영수 메모다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-5"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 발급 거래내역과 성호가 써준 영수 메모 원본이 함께 제출됐다.",
        "check_metadata": "송금은 중개사 초안 발송 하루 전 오후에 이뤄졌고, 메모 작성 시각은 그날 저녁으로 남아 있다.",
        "restore_context": "메모에는 '전환 준비금'이라고만 적혀 있어 확정 전세금인지, 가계약금인지 표현이 비어 있다.",
        "verify_source": "다은 출금 기록과 성호 수금 기록의 거래번호가 서로 일치한다.",
        "check_edits": "기관 발급본과 수기 메모 모두 사후 수정 흔적은 보이지 않는다.",
        "question_acquisition": "정산 분쟁을 위한 통상적 계좌 자료 제출이므로 적법성은 충분하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이다은에게: \"다은의 월세 중단\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 이다은의 \"다은의 월세 중단\" 쟁점과 관련된다. 이다은은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "장성호에게: \"추가 보증금 2천만원의 정산 기준\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 장성호의 \"추가 보증금 2천만원의 정산 기준\" 쟁점과 관련된다. 장성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
        "role": "impeach",
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
          "timeline",
          "legality"
        ],
        "blockedVectorsHelp": [
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "숫자 부인이 막히는 시점"
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.2,
            "note": "숫자 부인이 막히는 시점"
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "공동명의 등기부와 담보대출 상환예상서",
      "description": "주택 공동명의 등기부, 기존 담보대출 잔액표, 중도상환수수료 예상액이 적힌 은행 안내서다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-2"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "등기부 원본과 은행의 상환예상서가 모두 제출돼 공동명의와 비용 구조를 함께 볼 수 있었다.",
        "check_metadata": "상환예상서는 전환 논의가 시작된 주간에 이미 발급돼 성호가 비용 문제를 일찍 인지했음을 보여준다.",
        "restore_context": "전세 전환을 하려면 아내 공동명의 서명과 중도상환 비용 반영이 필요하다는 사정이 문서상 분명해진다.",
        "verify_source": "등기소 열람번호와 은행 발급번호가 각 기관 확인 결과와 일치한다.",
        "check_edits": "금액·명의·발급일에 재가공 흔적이 없고 원본 상태가 유지돼 있다.",
        "question_acquisition": "공동명의와 대출 정보는 민감하지만 당사자 간 계약 해석 분쟁과 직접 관련돼 제출 정당성이 인정된다."
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
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "기관 기록이 말보다 앞서는 시점"
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "중개사 방문일지와 예비 임차인 예약문자",
      "description": "서미현 중개사가 남긴 방문일지와, 성호가 예비 임차인에게 보여주기 시간을 잡은 예약문자다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-4"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "방문일지 원본과 예비 임차인 예약문자 원문이 제출됐다.",
        "check_metadata": "집을 보여준 시각은 다은이 월세 중단을 알린 다음 날 오후로 확인된다.",
        "restore_context": "성호는 협의가 미완이라고 판단했지만, 다은에게 먼저 결렬 통보를 보내진 않았다.",
        "verify_source": "중개사 일정표와 문자 발신 목록의 시간이 서로 맞아떨어진다.",
        "check_edits": "방문일지와 문자 원문 모두 편집 흔적 없이 남아 있다.",
        "question_acquisition": "중개 업무 기록과 당사자 문자라 제출 절차상 문제는 낮다."
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
          "fact_pursuit",
          "evidence_present"
        ],
        "preferredAngles": [
          "timeline",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity",
          "legality"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "기관 기록이 말보다 앞서는 시점"
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "월세→전세 전환 계약 초안과 은행 상담 접수기록",
      "description": "중개사가 보낸 전환 계약 초안, 빠진 공동명의 서명란, 그리고 다은의 전세대출 상담 접수기록이다.",
      "type": "contract",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
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
        "request_original": "중개사 발송 메일 원문과 은행 접수내역 원본이 함께 제출됐다.",
        "check_metadata": "초안 발송은 2천만원 송금 다음 날, 은행 상담 접수는 그날 저녁으로 이어진다.",
        "restore_context": "초안에는 전환 시작일과 총액이 비어 있고 공동명의 서명란도 미완으로 남아 있어, 방향은 잡혔지만 최종 합의는 끝나지 않았음을 보여준다.",
        "verify_source": "중개사 메일 헤더와 은행 접수번호가 각 기관 기록과 일치한다.",
        "check_edits": "문서 본문 수정 흔적 없이 최초 발송본이다.",
        "question_acquisition": "계약과 대출 진행 여부를 확인하는 통상 자료여서 적법성 문제는 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "이다은에게: \"월세→전세 전환이 이미 확정됐는가\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 이다은의 \"월세→전세 전환이 이미 확정됐는가\" 쟁점과 관련된다. 이다은은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "장성호에게: \"성호의 공동명의 동의와 대출 비용 비공개\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 장성호의 \"성호의 공동명의 동의와 대출 비용 비공개\" 쟁점과 관련된다. 장성호은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
          "S5"
        ],
        "preferredQuestionTypes": [
          "evidence_present"
        ],
        "preferredAngles": [
          "legality",
          "context"
        ],
        "blockedVectorsHelp": [
          "identity"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S3",
            "multiplier": 1.35,
            "note": "문구 전체를 복원해 조건 범위를 잡아 주는 시점"
          },
          {
            "disputeId": "d-2",
            "state": "S3",
            "multiplier": 1.2,
            "note": "문구 전체를 복원해 조건 범위를 잡아 주는 시점"
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:conversion_stage",
      "intentTag": "context_probe",
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
        "disputeId": "d-1",
        "allowAtomIds": [
          "tenant04:a:d-1:fear:0",
          "tenant04:b:d-1:fear:0"
        ],
        "preferredAngleTags": [
          "context",
          "identity"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-2:undisclosed_conditions",
      "intentTag": "legality_check",
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
          "tenant04:a:d-2:emotion:0",
          "tenant04:b:d-2:fear:0"
        ],
        "preferredAngleTags": [
          "legality",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-3:rent_stop_basis",
      "intentTag": "timeline_check",
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
        "disputeId": "d-3",
        "allowAtomIds": [
          "tenant04:a:d-3:admission:1",
          "tenant04:b:d-3:emotion:0"
        ],
        "preferredAngleTags": [
          "timeline",
          "context"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-4:notice_before_showing",
      "intentTag": "responsibility_probe",
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
          "tenant04:a:d-4:emotion:0",
          "tenant04:b:d-4:fear:0"
        ],
        "preferredAngleTags": [
          "responsibility",
          "timeline"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-5:settlement_formula",
      "intentTag": "legality_check",
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
          "tenant04:a:d-5:shame:0",
          "tenant04:b:d-5:emotion:0"
        ],
        "preferredAngleTags": [
          "legality",
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
      ]
    },
    {
      "id": "fq:d-1:wedding_pressure",
      "intentTag": "motive_probe",
      "allowedAtStates": [
        "S3",
        "S4",
        "S5"
      ],
      "allowedIssueRoles": [
        "shared_misconception"
      ],
      "answerEnvelope": {
        "disputeId": "d-1",
        "allowAtomIds": [
          "tenant04:a:d-1:fear:0",
          "tenant04:b:d-1:fear:0"
        ],
        "preferredAngleTags": [
          "emotion",
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 질문은 지금 단계에서는 바로 답하기 어렵습니다.",
        "자료와 상태가 더 열리면 그때는 말씀드릴 수 있습니다."
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
  "proposedUnlockAtoms": []
};

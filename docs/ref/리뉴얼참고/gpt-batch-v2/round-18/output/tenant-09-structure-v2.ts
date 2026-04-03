export const tenant_09_structure_v2 = {
  "caseId": "tenant-09",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "계약서상 8천만원 보증금의 실제 귀속",
      "truth": true,
      "truthDescription": "최종 계약서에는 8천만원으로 적혔지만, 태윤이 실제로 받은 보증금은 6천만원뿐이었고 나머지 2천만원은 우석 측 계좌로 빠져 임대보증금으로 보관되지 않았다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-1",
        "e-2"
      ],
      "correctResponsibility": {
        "a": 70,
        "b": 30
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "계약구조재구성",
      "legitimacyIssue": false,
      "judgmentStatement": "태윤이 실제 받은 보증금은 6천만원이다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "8천만원",
        "6천 수령",
        "2천 정리비",
        "분할 송금",
        "우석 계좌",
        "계약서 금액"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "계약서상 8천만원 보증금의 실제 귀속의 겉 주장과 실제 사실을 먼저 맞춰 보는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant09:a:d-1:timeline:1",
            "tenant09:a:d-1:uncertainty:2",
            "tenant09:a:d-1:act:4",
            "tenant09:a:d-1:evidence:5",
            "tenant09:b:d-1:self_justification:1",
            "tenant09:b:d-1:uncertainty:2",
            "tenant09:b:d-1:act:4",
            "tenant09:b:d-1:relationship:5"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "계약서상 8천만원 보증금의 실제 귀속을 각자가 왜 끝까지 붙들었는지 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
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
            "tenant09:a:d-1:evidence:5",
            "tenant09:a:d-1:act:4",
            "tenant09:a:d-1:responsibility:6",
            "tenant09:a:d-1:self_justification:7",
            "tenant09:a:d-1:fear:9",
            "tenant09:a:d-1:emotion:8",
            "tenant09:b:d-1:relationship:5",
            "tenant09:b:d-1:act:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "태윤이 실제 받은 보증금은 6천만원이다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-1",
                "minState": "S4"
              },
              {
                "id": "d-2",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-1:surface:timeline_pressed",
              "d-1:motive:collusion_seen"
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-1:emotion:8",
            "tenant09:a:d-1:fear:9",
            "tenant09:a:d-1:admission:10",
            "tenant09:a:d-1:responsibility:11",
            "tenant09:b:d-1:fear:9",
            "tenant09:b:d-1:emotion:8",
            "tenant09:b:d-1:admission:10",
            "tenant09:b:d-1:responsibility:11"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "core_truth",
      "requiredEvidenceIds": [
        "e-1",
        "e-2"
      ]
    },
    {
      "id": "d-2",
      "name": "세라-우석의 보증금 부풀리기 공모",
      "truth": true,
      "truthDescription": "세라는 우석과 상의해 정책자금 상담과 이후 협상에 유리하도록 보증금을 실제보다 크게 적은 계약을 유지했고, 2천만원은 허위 정리비와 컨설팅비 명목으로 우석 측이 가져갔다.",
      "quadrant": "a_only",
      "requiredEvidence": [
        "e-2",
        "e-3",
        "e-4"
      ],
      "correctResponsibility": {
        "a": 85,
        "b": 15
      },
      "ambiguity": "none",
      "weight": "high",
      "mediationLink": "제3자책임분리",
      "legitimacyIssue": false,
      "judgmentStatement": "세라는 우석과 공모해 보증금을 부풀렸다.",
      "disputeKind": "core_truth",
      "disputeAliases": [
        "허위 정리비",
        "컨설팅비",
        "정책자금",
        "카톡 대화",
        "우석 공모",
        "8천 유지"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "세라-우석의 보증금 부풀리기 공모의 겉 주장과 실제 사실을 먼저 맞춰 보는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant09:a:d-2:legacy_sentence:1",
            "tenant09:a:d-2:context:2",
            "tenant09:a:d-2:act:5",
            "tenant09:b:d-2:self_justification:1",
            "tenant09:b:d-2:context:2",
            "tenant09:b:d-2:evidence:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "세라-우석의 보증금 부풀리기 공모을 각자가 왜 끝까지 붙들었는지 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-2:evidence:4",
            "tenant09:a:d-2:act:5",
            "tenant09:a:d-2:beneficiary:6",
            "tenant09:a:d-2:responsibility:7",
            "tenant09:a:d-2:shame:9",
            "tenant09:a:d-2:emotion:8",
            "tenant09:b:d-2:shame:5",
            "tenant09:b:d-2:evidence:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "세라는 우석과 공모해 보증금을 부풀렸다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-2",
                "minState": "S4"
              }
            ],
            "requireFlags": [
              "d-2:surface:context_pressed"
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-2:emotion:8",
            "tenant09:a:d-2:shame:9",
            "tenant09:a:d-2:admission:10",
            "tenant09:a:d-2:institution:11",
            "tenant09:b:d-2:emotion:8",
            "tenant09:b:d-2:fear:9",
            "tenant09:b:d-2:responsibility:11",
            "tenant09:b:d-2:admission:10"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "core_truth",
      "requiredEvidenceIds": [
        "e-2",
        "e-3",
        "e-4"
      ]
    },
    {
      "id": "d-3",
      "name": "태윤의 무항목 보증금 반환 지연",
      "truth": true,
      "truthDescription": "분쟁이 터진 뒤 태윤은 다투지 않는 6천만원 부분도 바로 나누어 반환하지 않고, 공실손실과 에어컨 세척비 같은 항목을 크게 적어 5주 넘게 반환을 늦췄다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-6"
      ],
      "correctResponsibility": {
        "a": 40,
        "b": 60
      },
      "ambiguity": "low",
      "weight": "high",
      "mediationLink": "보증금정산",
      "legitimacyIssue": false,
      "judgmentStatement": "태윤은 보증금을 지연 반환했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "5주 지연",
        "공실손실",
        "세척비",
        "다투지 않는 6천",
        "반환 보류",
        "정산표"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "태윤의 무항목 보증금 반환 지연에 얽힌 표면 정황을 정리하는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant09:a:d-3:timeline:1",
            "tenant09:a:d-3:rule:2",
            "tenant09:a:d-3:evidence:4",
            "tenant09:b:d-3:denial:0",
            "tenant09:b:d-3:uncertainty:2",
            "tenant09:b:d-3:evidence:4",
            "tenant09:b:d-3:act:5"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "태윤의 무항목 보증금 반환 지연을 확대하거나 축소한 이유를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S2"
              },
              {
                "id": "d-4",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-3:harm:5",
            "tenant09:a:d-3:evidence:4",
            "tenant09:a:d-3:responsibility:6",
            "tenant09:a:d-3:threshold:7",
            "tenant09:a:d-3:fear:9",
            "tenant09:a:d-3:emotion:8",
            "tenant09:b:d-3:act:5",
            "tenant09:b:d-3:evidence:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "태윤은 보증금을 지연 반환했다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-3",
                "minState": "S4"
              },
              {
                "id": "d-4",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-3:surface:timeline_pressed",
              "d-3:surface:minor_arrears_only"
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-3:fear:9",
            "tenant09:a:d-3:emotion:8",
            "tenant09:a:d-3:admission:10",
            "tenant09:a:d-3:rule:11",
            "tenant09:b:d-3:fear:9",
            "tenant09:b:d-3:emotion:8",
            "tenant09:b:d-3:admission:10",
            "tenant09:b:d-3:responsibility:11"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "sub_truth",
      "requiredEvidenceIds": [
        "e-6"
      ]
    },
    {
      "id": "d-4",
      "name": "세라의 실제 미납 월세와 간판 철거비",
      "truth": true,
      "truthDescription": "세라는 폐업 직전 마지막 월세 일부를 9일 늦게 냈고, 외부 간판 철거비도 명도 뒤에야 정산했다. 금액은 제한적이지만 실제 미정산은 맞다.",
      "quadrant": "both_know",
      "requiredEvidence": [
        "e-6"
      ],
      "correctResponsibility": {
        "a": 75,
        "b": 25
      },
      "ambiguity": "none",
      "weight": "medium",
      "mediationLink": "보증금정산",
      "legitimacyIssue": false,
      "judgmentStatement": "세라는 월세를 9일 늦게 냈다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "9일 연체",
        "마지막 월세",
        "간판 철거비",
        "명도 뒤 정산",
        "소액 미정산",
        "폐업 직전"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "세라의 실제 미납 월세와 간판 철거비에 얽힌 표면 정황을 정리하는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant09:a:d-4:denial:0",
            "tenant09:a:d-4:uncertainty:2",
            "tenant09:a:d-4:evidence:4",
            "tenant09:a:d-4:act:5",
            "tenant09:b:d-4:act:0",
            "tenant09:b:d-4:timeline:2",
            "tenant09:b:d-4:evidence:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "세라의 실제 미납 월세와 간판 철거비을 확대하거나 축소한 이유를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S2"
              },
              {
                "id": "d-3",
                "minState": "S2"
              }
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-4:act:5",
            "tenant09:a:d-4:evidence:4",
            "tenant09:a:d-4:self_justification:6",
            "tenant09:a:d-4:responsibility:7",
            "tenant09:a:d-4:emotion:8",
            "tenant09:a:d-4:shame:9",
            "tenant09:b:d-4:threshold:5",
            "tenant09:b:d-4:evidence:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "세라는 월세를 9일 늦게 냈다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
          "unlockCondition": {
            "requireDisputes": [
              {
                "id": "d-4",
                "minState": "S4"
              },
              {
                "id": "d-3",
                "minState": "S2"
              }
            ],
            "requireFlags": [
              "d-4:surface:timeline_pressed",
              "d-4:core:delay_split"
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-4:shame:9",
            "tenant09:a:d-4:emotion:8",
            "tenant09:a:d-4:admission:10",
            "tenant09:a:d-4:responsibility:11",
            "tenant09:b:d-4:emotion:9",
            "tenant09:b:d-4:shame:8",
            "tenant09:b:d-4:responsibility:11",
            "tenant09:b:d-4:admission:10"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "sub_truth",
      "requiredEvidenceIds": [
        "e-6"
      ]
    },
    {
      "id": "d-5",
      "name": "태윤의 최종 계약서 확인 소홀",
      "truth": true,
      "truthDescription": "태윤은 보증금 액수와 계좌 입금 내역을 마지막 출력본과 대조하지 않은 채 서명과 날인을 넘겼고, 그 틈을 우석이 이용해 8천만원 표기를 굳혔다.",
      "quadrant": "b_only",
      "requiredEvidence": [
        "e-1",
        "e-5"
      ],
      "correctResponsibility": {
        "a": 25,
        "b": 75
      },
      "ambiguity": "low",
      "weight": "medium",
      "mediationLink": "증거신뢰회복",
      "legitimacyIssue": false,
      "judgmentStatement": "태윤은 계약서 확인을 소홀히 했다.",
      "disputeKind": "sub_truth",
      "disputeAliases": [
        "최종 스캔본",
        "6천 초안",
        "8천 최종본",
        "통화 19분 후",
        "대조 누락",
        "날인 확인"
      ],
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면",
          "summary": "태윤의 최종 계약서 확인 소홀에 얽힌 표면 정황을 정리하는 층",
          "lockedSummary": "겉으로 보이는 사실만 보입니다.",
          "unlockCondition": {},
          "revealAtomIds": [
            "tenant09:a:d-5:rule:1",
            "tenant09:a:d-5:timeline:3",
            "tenant09:a:d-5:evidence:4",
            "tenant09:b:d-5:identity:1",
            "tenant09:b:d-5:context:2",
            "tenant09:b:d-5:evidence:4"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기",
          "summary": "태윤의 최종 계약서 확인 소홀을 확대하거나 축소한 이유를 보는 층",
          "lockedSummary": "왜 그렇게 말했는지는 아직 드러나지 않았습니다.",
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
            "tenant09:a:d-5:responsibility:5",
            "tenant09:a:d-5:evidence:4",
            "tenant09:a:d-5:responsibility:6",
            "tenant09:a:d-5:shame:7",
            "tenant09:a:d-5:emotion:8",
            "tenant09:a:d-5:rule:9",
            "tenant09:b:d-5:evidence:4",
            "tenant09:b:d-5:responsibility:5"
          ],
          "uiStyle": "card_expand"
        },
        {
          "id": "core",
          "label": "핵심",
          "summary": "태윤은 계약서 확인을 소홀히 했다.로 수렴하는 핵심 책임 층",
          "lockedSummary": "책임선과 핵심 연결은 아직 잠겨 있습니다.",
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
              "d-5:surface:identity_pressed",
              "d-5:surface:final_check_gap"
            ]
          },
          "revealAtomIds": [
            "tenant09:a:d-5:rule:9",
            "tenant09:a:d-5:emotion:8",
            "tenant09:a:d-5:admission:10",
            "tenant09:a:d-5:rule:11",
            "tenant09:b:d-5:emotion:8",
            "tenant09:b:d-5:shame:9",
            "tenant09:b:d-5:admission:10",
            "tenant09:b:d-5:responsibility:11"
          ],
          "uiStyle": "relation_core"
        }
      ],
      "issueRole": "sub_truth",
      "requiredEvidenceIds": [
        "e-1",
        "e-5"
      ]
    }
  ],
  "linkEdges": [
    {
      "fromDisputeId": "d-2",
      "toDisputeId": "d-1",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 12,
        "grantFlag": "d-1:motive:collusion_seen"
      },
      "uiLabel": "허위 구조",
      "id": "link:d-2:d-1:supports"
    },
    {
      "fromDisputeId": "d-1",
      "toDisputeId": "d-5",
      "type": "supports",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": 10,
        "grantFlag": "d-5:surface:final_check_gap"
      },
      "uiLabel": "실수령 6천",
      "id": "link:d-1:d-5:supports"
    },
    {
      "fromDisputeId": "d-4",
      "toDisputeId": "d-3",
      "type": "weakens_counter",
      "when": {
        "minState": "S2",
        "minLayer": "surface"
      },
      "effect": {
        "supportBonus": -8,
        "grantFlag": "d-3:surface:minor_arrears_only"
      },
      "uiLabel": "제한적 미정산",
      "id": "link:d-4:d-3:weakens_counter"
    },
    {
      "fromDisputeId": "d-3",
      "toDisputeId": "d-4",
      "type": "retaliation",
      "when": {
        "minState": "S3",
        "minLayer": "motive"
      },
      "effect": {
        "supportBonus": 9,
        "grantFlag": "d-4:core:delay_split"
      },
      "uiLabel": "지연과 공제 분리",
      "id": "link:d-3:d-4:retaliation"
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "name": "임대차계약서 원본과 초안 변경본",
      "description": "중개사 보관 계약서 원본, 1차 초안, 최종 스캔본이 함께 남아 있는 계약 문서 묶음이다.",
      "type": "contract",
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
        "request_original": "중개사 보관 계약서 원본과 사무실 PC에 남은 1차와 최종 초안이 함께 제출됐다.",
        "check_metadata": "1차 초안은 보증금 6천만원, 최종 스캔본은 8천만원으로 바뀌어 있고 변경 시각이 서명 직전으로 남아 있다.",
        "restore_context": "월세와 시설 인수 메모는 거의 그대로인데 보증금 줄만 커져 있어 단순 재출력 이상의 구조 변경이 드러난다.",
        "verify_source": "서명과 도장 위치, 파일 해시, 중개사 보관본 문구가 서로 일치한다.",
        "check_edits": "보증금 항목의 줄 간격과 스캔 순서가 다른 조항보다 어색하게 맞물려 최종본 대조 필요성이 확인된다.",
        "question_acquisition": "당사자 계약 문서와 중개사 보관본이라 제출 절차상 문제는 낮다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "김세라에게: \"계약서상 8천만원 보증금의 실제 귀속\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 김세라의 \"계약서상 8천만원 보증금의 실제 귀속\" 쟁점과 관련된다. 김세라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박태윤에게: \"계약서상 8천만원 보증금의 실제 귀속\" 관련 해명 요구 (방어 동기: 자기 보호)",
          "implication": "이 증거는 박태윤의 \"계약서상 8천만원 보증금의 실제 귀속\" 쟁점과 관련된다. 박태윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
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
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "계약서상 8천만원 보증금의 실제 귀속 쟁점이 본격적으로 열릴 때 임대차계약서 원본과 초안 변경본의 설득력이 커진다."
          },
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "태윤의 최종 계약서 확인 소홀 쟁점이 본격적으로 열릴 때 임대차계약서 원본과 초안 변경본의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-2",
      "name": "보증금 분할 송금 내역과 우석 측 수령증",
      "description": "세라가 태윤 계좌로 6천만원, 우석 측 계좌로 2천만원을 각각 보낸 은행 내역과 정리비 수령증이다.",
      "type": "bank",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-1",
        "d-2"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "은행 발급 원본 거래내역과 우석 측이 건넨 수령증 사진 원본이 함께 제출됐다.",
        "check_metadata": "두 송금은 같은 날 14분 차이로 이뤄졌고, 2천만원 이체는 보증금이 아니라 정리비로 적혀 있다.",
        "restore_context": "태윤 수령액은 6천만원으로 고정돼 있어 계약서상 8천만원 전액을 받았다고 보기 어렵다.",
        "verify_source": "세라 출금내역과 각 수취 계좌 입금내역의 거래번호가 서로 맞아떨어진다.",
        "check_edits": "기관 발급 PDF와 앱 원본 화면 대조 결과 수정 흔적이 없다.",
        "question_acquisition": "분쟁 정산을 위한 계좌 자료 제출로 정당성은 충분하지만 계좌번호는 최소 범위만 사용해야 한다."
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
          "identity",
          "context"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-1",
            "state": "S2",
            "multiplier": 1.35,
            "note": "계약서상 8천만원 보증금의 실제 귀속 쟁점이 본격적으로 열릴 때 보증금 분할 송금 내역과 우석 측 수령증의 설득력이 커진다."
          },
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "세라-우석의 보증금 부풀리기 공모 쟁점이 본격적으로 열릴 때 보증금 분할 송금 내역과 우석 측 수령증의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-3",
      "name": "세라-우석 카카오톡과 음성메모",
      "description": "보증금을 크게 적어 두면 정책자금과 나중 정리 때 편하다는 취지의 대화가 남은 카카오톡과 짧은 음성메모다.",
      "type": "chat",
      "reliability": "soft",
      "completeness": "cropped",
      "provenance": "personal_device",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-2"
      ],
      "isTrap": true,
      "requires": [],
      "investigationResults": {
        "request_original": "처음에는 요약 캡처만 제출됐고, 이후 전체 대화와 음성 파일 원본 일부가 추가 확보됐다.",
        "check_metadata": "문제의 대화는 최종 계약 스캔 30분 전부터 이어졌고, 음성메모 생성 시각도 그 직후로 남아 있다.",
        "restore_context": "처음 제출본에서는 정책자금 이야기만 보였지만 전체 문맥에는 나중 분쟁이 생겨도 계약서 기준이 남는다는 표현이 더해져 있었다.",
        "verify_source": "세라 휴대폰 백업과 우석 측 메신저 기록 시각이 대체로 일치한다.",
        "check_edits": "본문 편집은 없지만 앞뒤 문장을 잘라 의도성을 약하게 보이게 한 선택적 크롭이 확인된다.",
        "question_acquisition": "당사자와 제3자 사이 사적 대화라 공개 범위는 분쟁 해결에 필요한 최소 부분으로 제한돼야 한다."
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
            "multiplier": 1.22,
            "note": "세라-우석의 보증금 부풀리기 공모 쟁점이 본격적으로 열릴 때 세라-우석 카카오톡과 음성메모의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-4",
      "name": "우석 사무실 회계전표와 컨설팅비 세금계산서",
      "description": "2천만원이 보증금이 아니라 컨설팅비와 정리비로 처리된 사무실 회계전표, 세금계산서, 카드 사용기록 묶음이다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-2"
      ],
      "isTrap": false,
      "requires": [
        "e-2"
      ],
      "investigationResults": {
        "request_original": "우석 사무실 회계 프로그램 출력본과 세금계산서 원본, 같은 날 사용된 카드 전표가 함께 제출됐다.",
        "check_metadata": "2천만원 수납일은 e-2의 송금일과 같고, 같은 날 사무실 운영비와 개인 카드대금이 이어서 결제됐다.",
        "restore_context": "보증금 보관 계정이 아니라 일반 수익 항목으로 처리돼 애초부터 임대보증금이 아니었음이 드러난다.",
        "verify_source": "전표 번호와 세금계산서 발행 기록이 회계 프로그램 로그와 정확히 맞는다.",
        "check_edits": "회계 로그가 끊기지 않고 전표 번호도 연속이라 사후 삽입 가능성은 낮다.",
        "question_acquisition": "비용 분쟁 해결을 위해 회계 자료가 제출됐고 관련 항목만 열람돼 적법성 문제는 낮다."
      },
      "subjectParty": "a",
      "timing": {
        "intent": "corroborate",
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
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-2",
            "state": "S2",
            "multiplier": 1.35,
            "note": "세라-우석의 보증금 부풀리기 공모 쟁점이 본격적으로 열릴 때 우석 사무실 회계전표와 컨설팅비 세금계산서의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-5",
      "name": "중개사 사무실 스캔 로그와 태윤-우석 통화요약",
      "description": "사무실 복합기 스캔 로그, 계약 파일 업로드 기록, 그리고 태윤이 6천으로 다시 맞춰 달라고 말한 통화 요약 메모다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "privacy_concern",
      "proves": [
        "d-5"
      ],
      "isTrap": false,
      "requires": [
        "e-1"
      ],
      "investigationResults": {
        "request_original": "사무실 복합기 로그 원본과 우석이 남긴 통화요약 메모, 업로드 기록이 함께 제출됐다.",
        "check_metadata": "태윤과 우석의 통화 뒤 19분 후 최종 8천만원본이 스캔돼 서버에 올라간 흔적이 남아 있다.",
        "restore_context": "태윤은 실수 없이 정리된 수정본이 가는 줄 알았지만, 실제 업로드된 파일은 보증금이 다시 커진 최종본이었다.",
        "verify_source": "복합기 시리얼, 서버 업로드 시각, 중개사 일정표의 회의 종료 시점이 서로 맞아떨어진다.",
        "check_edits": "로그 자체는 기관 시스템 출력본이라 후편집 흔적이 없고 시각 흐름도 연속적이다.",
        "question_acquisition": "중개업소 내부 기록과 통화 메모라 사생활 주의는 필요하지만 분쟁 핵심 경위를 확인하는 데 직접 관련된다."
      },
      "subjectParty": "b",
      "timing": {
        "intent": "corroborate",
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
          "context",
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-5",
            "state": "S2",
            "multiplier": 1.35,
            "note": "태윤의 최종 계약서 확인 소홀 쟁점이 본격적으로 열릴 때 중개사 사무실 스캔 로그와 태윤-우석 통화요약의 설득력이 커진다."
          }
        ]
      }
    },
    {
      "id": "e-6",
      "name": "월세 미납·간판 철거비 정산표와 반환 지연 계좌기록",
      "description": "마지막 월세, 관리비, 간판 철거비, 보증금 반환 지연 시점이 함께 적힌 정산표와 계좌기록이다.",
      "type": "record",
      "reliability": "hard",
      "completeness": "original",
      "provenance": "institutional",
      "legitimacy": "lawful",
      "proves": [
        "d-3",
        "d-4"
      ],
      "isTrap": false,
      "requires": [],
      "investigationResults": {
        "request_original": "태윤이 보낸 정산표 원본과 세라 계좌의 최종 반환 내역, 간판 철거 업체 영수증이 함께 제출됐다.",
        "check_metadata": "세라의 마지막 월세 일부 입금은 약정일보다 9일 늦고, 태윤의 보증금 반환은 명도 뒤 5주 넘게 지나서야 이뤄졌다.",
        "restore_context": "실제 미정산 항목은 존재하지만 태윤이 적은 공실손실과 에어컨 세척비는 별도 합의나 원본 견적 없이 크게 부풀려져 있었다.",
        "verify_source": "은행 거래번호, 철거 업체 영수증 번호, 태윤의 정산표 항목명이 서로 대체로 일치한다.",
        "check_edits": "기관 발급 거래내역과 업체 영수증은 수정 흔적이 없고 정산표만 후작성 문서다.",
        "question_acquisition": "정산 분쟁을 위한 기초 자료라 제출 정당성은 충분하다."
      },
      "subjectParty": "both",
      "partyContext": {
        "a": {
          "questionAngle": "김세라에게: \"세라의 실제 미납 월세와 간판 철거비\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 김세라의 \"세라의 실제 미납 월세와 간판 철거비\" 쟁점과 관련된다. 김세라은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        },
        "b": {
          "questionAngle": "박태윤에게: \"태윤의 무항목 보증금 반환 지연\" 관련 해명 요구 (방어 동기: 체면 유지)",
          "implication": "이 증거는 박태윤의 \"태윤의 무항목 보증금 반환 지연\" 쟁점과 관련된다. 박태윤은 이에 대해 해명하거나 자신의 입장을 밝혀야 한다."
        }
      },
      "timing": {
        "intent": "corroborate",
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
          "legality"
        ],
        "blockedVectorsHelp": [
          "timeline",
          "responsibility"
        ],
        "criticalWindows": [
          {
            "disputeId": "d-3",
            "state": "S2",
            "multiplier": 1.35,
            "note": "태윤의 무항목 보증금 반환 지연 쟁점이 본격적으로 열릴 때 월세 미납·간판 철거비 정산표와 반환 지연 계좌기록의 설득력이 커진다."
          },
          {
            "disputeId": "d-4",
            "state": "S2",
            "multiplier": 1.35,
            "note": "세라의 실제 미납 월세와 간판 철거비 쟁점이 본격적으로 열릴 때 월세 미납·간판 철거비 정산표와 반환 지연 계좌기록의 설득력이 커진다."
          }
        ]
      }
    }
  ],
  "freeQuestionHooks": [
    {
      "id": "fq:d-1:actual_recipient",
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
          "tenant09:a:d-1:act:4",
          "tenant09:a:d-1:evidence:5",
          "tenant09:b:d-1:act:4",
          "tenant09:b:d-1:relationship:5"
        ],
        "preferredAngleTags": [
          "identity"
        ]
      },
      "refusalTemplates": [
        "지금은 사람 이름보다 흐름부터 정리해야 합니다.",
        "그 이름을 먼저 꺼내면 말이 더 꼬입니다."
      ]
    },
    {
      "id": "fq:d-1:flow_timeline",
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
          "tenant09:a:d-1:act:4",
          "tenant09:a:d-1:evidence:5",
          "tenant09:b:d-1:responsibility:6",
          "tenant09:b:d-1:shame:7"
        ],
        "preferredAngleTags": [
          "timeline"
        ]
      },
      "refusalTemplates": [
        "순서를 한 번에 다 설명하긴 어렵습니다.",
        "그 시점 이야기는 아직 여기서 바로 못 하겠습니다."
      ]
    },
    {
      "id": "fq:d-2:policy_fund_motive",
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
          "tenant09:a:d-2:beneficiary:6",
          "tenant09:a:d-2:admission:10",
          "tenant09:a:d-2:institution:11"
        ],
        "preferredAngleTags": [
          "motive"
        ]
      },
      "refusalTemplates": [
        "그 마음까지 지금 바로 꺼내고 싶진 않습니다.",
        "이유를 묻는 질문은 조금 더 뒤에 답하겠습니다."
      ]
    },
    {
      "id": "fq:d-3:refund_split",
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
        "disputeId": "d-3",
        "allowAtomIds": [
          "tenant09:a:d-3:rule:11",
          "tenant09:b:d-3:responsibility:6",
          "tenant09:b:d-3:emotion:7"
        ],
        "preferredAngleTags": [
          "responsibility"
        ]
      },
      "refusalTemplates": [
        "지금은 제 몫과 남의 몫을 바로 자르기 어렵습니다.",
        "책임선을 지금 한 문장으로 자르긴 어렵습니다."
      ]
    },
    {
      "id": "fq:d-5:final_scan_responsibility",
      "intentTag": "context_check",
      "allowedAtStates": [
        "S2",
        "S3",
        "S4"
      ],
      "allowedIssueRoles": [
        "sub_truth"
      ],
      "answerEnvelope": {
        "disputeId": "d-5",
        "allowAtomIds": [
          "tenant09:b:d-5:evidence:4",
          "tenant09:b:d-5:responsibility:5",
          "tenant09:b:d-5:admission:10",
          "tenant09:b:d-5:responsibility:11"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "배경을 설명하려면 앞 맥락부터 다시 봐야 합니다.",
        "그 전후를 같이 놓지 않으면 오해가 생깁니다."
      ]
    },
    {
      "id": "fq:d-4:minor_arrears_scope",
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
        "disputeId": "d-4",
        "allowAtomIds": [
          "tenant09:a:d-4:responsibility:7",
          "tenant09:a:d-4:admission:10",
          "tenant09:a:d-4:responsibility:11"
        ],
        "preferredAngleTags": [
          "context"
        ]
      },
      "refusalTemplates": [
        "배경을 설명하려면 앞 맥락부터 다시 봐야 합니다.",
        "그 전후를 같이 놓지 않으면 오해가 생깁니다."
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
      "rapport_heavy",
      "trap_chaser"
    ]
  },
  "proposedUnlockAtoms": [
    {
      "id": "tenant09:a:d-1:unlock:s2:0",
      "factText": "태윤 계좌 입금은 6천만원뿐이고, 같은 날 14분 차이로 2천만원이 우석 측 계좌로 따로 빠져나갔다.",
      "tags": [
        "act",
        "evidence"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "received_amount": {
          "exact": "6천만원",
          "neutral": "실수령액",
          "rounded": "6천"
        },
        "broker_amount": {
          "exact": "2천만원",
          "neutral": "그 차액",
          "rounded": "2천"
        },
        "time": {
          "exact": "같은 날 14분 차이",
          "neutral": "그때",
          "dateExact": "같은 날 14분 차이",
          "period": "계약 당일"
        }
      },
      "stanceHints": [
        "partial",
        "evidence"
      ]
    },
    {
      "id": "tenant09:a:d-1:unlock:s3:0",
      "factText": "세라는 그 2천만원이 임대보증금으로 보관되지 않고 정리비 명목으로 처리된다는 점을 알고 있었다.",
      "tags": [
        "responsibility",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "broker_amount": {
          "exact": "2천만원",
          "neutral": "그 차액",
          "rounded": "2천"
        },
        "broker_person": {
          "exact": "오우석",
          "neutral": "중개사",
          "fullName": "오우석",
          "judgeRef": "우석 씨"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "tenant09:a:d-1:unlock:s4:0",
      "factText": "가족 투자금과 정책자금 압박 때문에 세라는 8천만원 숫자를 포기하지 못했고, 그 감정이 사실 확인을 눌렀다.",
      "tags": [
        "emotion",
        "fear"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "contract_amount": {
          "exact": "8천만원",
          "neutral": "계약서상 보증금",
          "rounded": "8천"
        },
        "institution": {
          "exact": "소상공인정책자금 상담",
          "neutral": "정책자금 상담",
          "fullName": "문정인",
          "judgeRef": "심사역"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant09:a:d-1:unlock:s5:0",
      "factText": "세라는 태윤이 실제로 6천만원만 받았다는 걸 알면서도 계약서상 8천만원 전액 반환 주장을 밀어붙였다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "received_amount": {
          "exact": "6천만원",
          "neutral": "실수령액",
          "rounded": "6천"
        },
        "contract_amount": {
          "exact": "8천만원",
          "neutral": "계약서상 보증금",
          "rounded": "8천"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ]
    },
    {
      "id": "tenant09:a:d-2:unlock:s2:0",
      "factText": "카카오톡 전체 문맥에는 큰 보증금 숫자가 정책자금 상담과 이후 협상에 유리하다는 계산이 함께 들어 있다.",
      "tags": [
        "evidence",
        "motive"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "contract_amount": {
          "exact": "8천만원",
          "neutral": "부풀린 보증금 액수",
          "rounded": "8천"
        },
        "institution": {
          "exact": "소상공인정책자금 상담",
          "neutral": "정책자금 상담",
          "fullName": "문정인",
          "judgeRef": "심사역"
        },
        "time": {
          "exact": "최종 계약 스캔 30분 전",
          "neutral": "그 대화 시점",
          "dateExact": "최종 계약 스캔 30분 전",
          "period": "서명 직전"
        }
      },
      "stanceHints": [
        "partial",
        "evidence"
      ]
    },
    {
      "id": "tenant09:a:d-2:unlock:s3:0",
      "factText": "세라는 우석과 함께 8천만원 숫자가 서로에게 이익이 된다는 점을 알고도 최종 스캔 직전까지 구조를 유지했다.",
      "tags": [
        "beneficiary",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "contract_amount": {
          "exact": "8천만원",
          "neutral": "부풀린 보증금 액수",
          "rounded": "8천"
        },
        "broker_person": {
          "exact": "오우석",
          "neutral": "중개사",
          "fullName": "오우석",
          "judgeRef": "우석 씨"
        },
        "time": {
          "exact": "최종 계약 스캔 30분 전",
          "neutral": "그 대화 시점",
          "dateExact": "최종 계약 스캔 30분 전",
          "period": "서명 직전"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "tenant09:a:d-2:unlock:s4:0",
      "factText": "세라는 가족 투자금과 정책자금 심사 앞에서 실패한 점주로 보일까 두려워 허위 구조를 멈추지 못했다.",
      "tags": [
        "emotion",
        "shame"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "institution": {
          "exact": "소상공인정책자금 상담",
          "neutral": "정책자금 상담",
          "fullName": "문정인",
          "judgeRef": "심사역"
        },
        "contract_amount": {
          "exact": "8천만원",
          "neutral": "부풀린 보증금 액수",
          "rounded": "8천"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant09:a:d-2:unlock:s5:0",
      "factText": "2천만원은 임대보증금이 아니라 허위 정리비·컨설팅비로 처리돼 우석 측 일반 수익으로 남았다.",
      "tags": [
        "admission",
        "institution"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "broker_amount": {
          "exact": "2천만원",
          "neutral": "허위 정리비 금액",
          "rounded": "2천"
        },
        "invoice": {
          "exact": "컨설팅비 세금계산서",
          "neutral": "그 세금계산서"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ]
    },
    {
      "id": "tenant09:a:d-4:unlock:s2:0",
      "factText": "마지막 월세 일부는 약정일보다 9일 늦게 입금됐다.",
      "tags": [
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "rent_item": {
          "exact": "마지막 월세 일부",
          "neutral": "그 월세 일부"
        },
        "delay": {
          "exact": "약정일보다 9일 뒤",
          "neutral": "그 며칠 뒤",
          "dateExact": "약정일보다 9일 뒤",
          "period": "폐업 직전"
        }
      },
      "stanceHints": [
        "partial",
        "evidence"
      ]
    },
    {
      "id": "tenant09:a:d-4:unlock:s3:0",
      "factText": "외부 간판 철거비는 명도 뒤에야 따로 정산됐다.",
      "tags": [
        "act",
        "context"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "sign_item": {
          "exact": "외부 간판 철거비",
          "neutral": "그 철거비"
        },
        "handover": {
          "exact": "명도 뒤",
          "neutral": "그 이후",
          "period": "명도 직후"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "tenant09:a:d-4:unlock:s4:0",
      "factText": "폐업 직전 자금 압박과 수치심 때문에 세라는 미정산 항목을 스스로도 축소해 말했다.",
      "tags": [
        "emotion",
        "shame"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "delay": {
          "exact": "약정일보다 9일 뒤",
          "neutral": "그 며칠 뒤",
          "dateExact": "약정일보다 9일 뒤",
          "period": "폐업 직전"
        },
        "time": {
          "exact": "폐업 직전",
          "neutral": "그 시기",
          "period": "폐업 직전"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant09:a:d-4:unlock:s5:0",
      "factText": "세라는 금액이 크지 않더라도 마지막 월세 일부와 간판 철거비가 실제 미정산이었다는 점을 인정한다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "rent_item": {
          "exact": "마지막 월세 일부",
          "neutral": "그 월세 일부"
        },
        "sign_item": {
          "exact": "외부 간판 철거비",
          "neutral": "그 철거비"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ]
    },
    {
      "id": "tenant09:b:d-5:unlock:s2:0",
      "factText": "태윤은 6천만원으로 다시 맞춰 달라는 통화 뒤 올라온 최종 8천만원 스캔본을 직접 대조하지 않았다.",
      "tags": [
        "evidence",
        "responsibility"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "draft_amount": {
          "exact": "6천만원",
          "neutral": "초안 보증금",
          "rounded": "6천"
        },
        "final_amount": {
          "exact": "8천만원",
          "neutral": "최종본 보증금",
          "rounded": "8천"
        },
        "time": {
          "exact": "통화 뒤 19분 후",
          "neutral": "그 직후",
          "dateExact": "통화 뒤 19분 후",
          "period": "서명 당일"
        }
      },
      "stanceHints": [
        "partial",
        "evidence"
      ]
    },
    {
      "id": "tenant09:b:d-5:unlock:s3:0",
      "factText": "복합기 로그상 통화 19분 후 업로드된 파일이 그대로 최종 계약본이 되었지만, 태윤은 그 파일을 열어보지 않았다.",
      "tags": [
        "timeline",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "doc_final": {
          "exact": "최종 스캔본",
          "neutral": "그 최종본"
        },
        "time": {
          "exact": "통화 뒤 19분 후",
          "neutral": "그 직후",
          "dateExact": "통화 뒤 19분 후",
          "period": "서명 당일"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "tenant09:b:d-5:unlock:s4:0",
      "factText": "공실과 세금 부담이 겹친 날이라는 사정은 있었지만, 태윤은 그 조급함을 이유로 최종 확인을 남에게 넘겼다.",
      "tags": [
        "emotion",
        "self_justification"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "broker_person": {
          "exact": "오우석",
          "neutral": "중개사",
          "fullName": "오우석",
          "judgeRef": "우석 씨"
        },
        "time": {
          "exact": "서명 당일",
          "neutral": "그날",
          "period": "바쁜 서명일"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant09:b:d-5:unlock:s5:0",
      "factText": "태윤은 마지막 출력본과 실제 입금 내역을 직접 맞춰보지 않은 채 서명과 날인을 넘겼다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "doc_final": {
          "exact": "최종 스캔본",
          "neutral": "그 최종본"
        },
        "draft_amount": {
          "exact": "6천만원",
          "neutral": "초안 보증금",
          "rounded": "6천"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ]
    },
    {
      "id": "tenant09:b:d-3:unlock:s2:0",
      "factText": "태윤은 다투지 않는 6천만원 부분도 즉시 반환하지 않고 명도 뒤 5주 넘게 묶어 두었다.",
      "tags": [
        "evidence",
        "timeline"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "received_amount": {
          "exact": "6천만원",
          "neutral": "다투지 않는 보증금",
          "rounded": "6천"
        },
        "delay": {
          "exact": "명도 뒤 5주 넘게",
          "neutral": "그 지연 기간",
          "period": "반환 지연 기간"
        }
      },
      "stanceHints": [
        "partial",
        "evidence"
      ]
    },
    {
      "id": "tenant09:b:d-3:unlock:s3:0",
      "factText": "공실손실과 에어컨 세척비는 원본 견적 없이 정산표에 크게 들어가 반환 지연의 명분으로 쓰였다.",
      "tags": [
        "harm",
        "responsibility"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "item_vacancy": {
          "exact": "공실손실",
          "neutral": "그 손실 항목"
        },
        "item_cleaning": {
          "exact": "에어컨 세척비",
          "neutral": "그 청소비"
        },
        "settlement": {
          "exact": "정산표",
          "neutral": "그 정산표"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "tenant09:b:d-3:unlock:s4:0",
      "factText": "태윤은 자신이 더 손해 봤다는 피해의식 때문에 반환 기준을 실제보다 넓게 잡았다.",
      "tags": [
        "emotion",
        "self_justification"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "item_vacancy": {
          "exact": "공실손실",
          "neutral": "그 손실 항목"
        },
        "received_amount": {
          "exact": "6천만원",
          "neutral": "다투지 않는 보증금",
          "rounded": "6천"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant09:b:d-3:unlock:s5:0",
      "factText": "실제 미정산 항목과 별개로, 반환 지연과 과장 공제에 대한 태윤의 책임이 남는다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "received_amount": {
          "exact": "6천만원",
          "neutral": "다투지 않는 보증금",
          "rounded": "6천"
        },
        "settlement": {
          "exact": "정산표",
          "neutral": "그 정산표"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ]
    },
    {
      "id": "tenant09:b:d-1:unlock:s2:0",
      "factText": "태윤 계좌로 실제 들어온 보증금은 6천만원뿐이었다.",
      "tags": [
        "evidence",
        "act"
      ],
      "unlockedAtState": "S2",
      "slots": {
        "received_amount": {
          "exact": "6천만원",
          "neutral": "실수령액",
          "rounded": "6천"
        },
        "time": {
          "exact": "같은 날 14분 차이",
          "neutral": "그때",
          "dateExact": "같은 날 14분 차이",
          "period": "계약 당일"
        }
      },
      "stanceHints": [
        "partial",
        "evidence"
      ]
    },
    {
      "id": "tenant09:b:d-1:unlock:s3:0",
      "factText": "나머지 2천만원을 우석이 정리한다고 하자 태윤은 직접 확인하지 않은 채 계약서 문구를 그대로 뒀다.",
      "tags": [
        "responsibility",
        "relationship"
      ],
      "unlockedAtState": "S3",
      "slots": {
        "broker_amount": {
          "exact": "2천만원",
          "neutral": "그 차액",
          "rounded": "2천"
        },
        "broker_person": {
          "exact": "오우석",
          "neutral": "중개사",
          "fullName": "오우석",
          "judgeRef": "우석 씨"
        }
      },
      "stanceHints": [
        "partial",
        "blame"
      ]
    },
    {
      "id": "tenant09:b:d-1:unlock:s4:0",
      "factText": "세금과 공실 부담 속에서 태윤은 계약 구조를 깊게 따질 여유가 없다고 스스로 합리화했다.",
      "tags": [
        "emotion",
        "self_justification"
      ],
      "unlockedAtState": "S4",
      "slots": {
        "time": {
          "exact": "계약 체결 무렵",
          "neutral": "그 무렵",
          "period": "공실 압박기"
        },
        "broker_person": {
          "exact": "오우석",
          "neutral": "중개사",
          "fullName": "오우석",
          "judgeRef": "우석 씨"
        }
      },
      "stanceHints": [
        "emotional",
        "partial"
      ]
    },
    {
      "id": "tenant09:b:d-1:unlock:s5:0",
      "factText": "태윤도 8천만원 문구와 실수령 6천만원의 차이를 방치해 분쟁의 틈을 키웠다.",
      "tags": [
        "admission",
        "responsibility"
      ],
      "unlockedAtState": "S5",
      "slots": {
        "contract_amount": {
          "exact": "8천만원",
          "neutral": "계약서상 보증금",
          "rounded": "8천"
        },
        "received_amount": {
          "exact": "6천만원",
          "neutral": "실수령액",
          "rounded": "6천"
        }
      },
      "stanceHints": [
        "confess",
        "admission"
      ]
    }
  ]
} as const;

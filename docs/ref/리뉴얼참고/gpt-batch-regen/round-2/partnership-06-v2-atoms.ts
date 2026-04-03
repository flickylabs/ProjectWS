export const partnership06V2Atoms = {
  "caseId": "partnership-06",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "제가 임의로 확정한 게 아닙니다. 그날은 안 움직이면 오픈이 밀리는 상황이라 선택지만 먼저 잡아둔 겁니다."
          ],
          "privateKnowledge": [
            "보라 최종 확인 없이 대체 모델 코드가 반영됐다.",
            "변경 대상이 보라가 민감하게 보던 브랜드 포인트 구역에 몰려 있었다."
          ],
          "suppressions": [
            "발주서가 실제로 생성됐다는 점",
            "공동 승인 시트에 이미 서명해 둔 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-1:context:0",
              "factText": "오픈 주간이라 승인 지연보다 매장 재오픈 차질을 더 크게 봤다는 주장",
              "tags": [
                "context",
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-1:denial:1",
              "factText": "대체 발주는 최종 확정이 아니라 현장용 선택지 확보였다는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "진열집기·조명 일부",
                  "neutral": "해당 품목"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "현장에서 납기 확인을 돌린 건 맞지만, 최종 발주처럼 몰아가면 과합니다.",
            "피드백이 그때 왔으면 그렇게까지 안 갔습니다."
          ],
          "privateKnowledge": [
            "통화 직후 PM 로그와 발주서에 대체 모델 코드가 연속 반영됐다.",
            "보라 확인 없이 진행하면 문제라는 걸 알고 있었다."
          ],
          "suppressions": [
            "통화 후 14분 반영 기록",
            "최종 확인 누락"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-1:context:0",
              "factText": "오픈 주간이라 승인 지연보다 매장 재오픈 차질을 더 크게 봤다는 주장",
              "tags": [
                "context",
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-1:denial:1",
              "factText": "대체 발주는 최종 확정이 아니라 현장용 선택지 확보였다는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "진열집기·조명 일부",
                  "neutral": "해당 품목"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:evidence:3",
              "factText": "가람 통화 뒤 14분 안에 대체 모델 코드가 발주서와 PM 로그에 연속 반영된 기록",
              "tags": [
                "evidence",
                "timeline",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통화 후 14분",
                  "neutral": "짧은 간격"
                },
                "institution": {
                  "exact": "시공 PM 변경지시 로그",
                  "neutral": "현장 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "대체 모델 얘기를 꺼낸 건 맞습니다.",
            "하지만 그건 재오픈을 맞추려던 판단이었지, 브랜드를 무시하려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "실질적 대체 발주가 실행됐다.",
            "변경이 브랜드 포인트 구역에 집중된 걸 알고 있었다."
          ],
          "suppressions": [
            "공동 승인 원칙을 어긴 점",
            "상대 영역 침범이라는 인식"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-1:context:0",
              "factText": "오픈 주간이라 승인 지연보다 매장 재오픈 차질을 더 크게 봤다는 주장",
              "tags": [
                "context",
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-1:act:2",
              "factText": "보라의 최종 확인 없이 진열집기와 조명 일부를 다른 모델로 대체 발주한 사실",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "진열집기·조명 일부",
                  "neutral": "해당 품목"
                },
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:evidence:3",
              "factText": "가람 통화 뒤 14분 안에 대체 모델 코드가 발주서와 PM 로그에 연속 반영된 기록",
              "tags": [
                "evidence",
                "timeline",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통화 후 14분",
                  "neutral": "짧은 간격"
                },
                "institution": {
                  "exact": "시공 PM 변경지시 로그",
                  "neutral": "현장 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "제가 선을 넘은 부분이 없다고는 안 하겠습니다.",
            "다만 보라 쪽 최종 확인이 계속 늦어져 현장에선 결정을 미룰 수 없었습니다."
          ],
          "privateKnowledge": [
            "보라 확인이 없는데도 실행했다.",
            "공동 승인 시트를 예외처럼 취급했다."
          ],
          "suppressions": [
            "상대가 늦었다는 말로 자신의 결정을 먼저 정당화한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-1:act:2",
              "factText": "보라의 최종 확인 없이 진열집기와 조명 일부를 다른 모델로 대체 발주한 사실",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "진열집기·조명 일부",
                  "neutral": "해당 품목"
                },
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:evidence:3",
              "factText": "가람 통화 뒤 14분 안에 대체 모델 코드가 발주서와 PM 로그에 연속 반영된 기록",
              "tags": [
                "evidence",
                "timeline",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통화 후 14분",
                  "neutral": "짧은 간격"
                },
                "institution": {
                  "exact": "시공 PM 변경지시 로그",
                  "neutral": "현장 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:rule:4",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인 대상이었다는 원칙",
              "tags": [
                "rule",
                "threshold",
                "relationship"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "그날은 제가 오픈을 살려야 한다는 생각에 너무 매달렸습니다.",
            "관리소 시간 제한까지 겹치니 승인선을 지켜야 한다는 판단이 뒤로 밀렸습니다."
          ],
          "privateKnowledge": [
            "긴급성을 명분으로 승인선을 넘었다.",
            "브랜드 포인트 구역을 건드린다는 자각도 있었다."
          ],
          "suppressions": [
            "처음부터 사실을 말하지 않고 긴급성부터 내세운 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-1:context:0",
              "factText": "오픈 주간이라 승인 지연보다 매장 재오픈 차질을 더 크게 봤다는 주장",
              "tags": [
                "context",
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-1:rule:4",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인 대상이었다는 원칙",
              "tags": [
                "rule",
                "threshold",
                "relationship"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:admission:5",
              "factText": "브랜드 포인트 구역이라는 점을 알면서도 납기와 예산을 이유로 승인선을 넘었다는 자인",
              "tags": [
                "admission",
                "motive",
                "identity",
                "fear"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역 품목",
                  "neutral": "민감한 구역"
                },
                "reason": {
                  "exact": "납기·예산 압박",
                  "neutral": "그 사정"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 보라 최종 확인 없이 집기와 조명 일부를 대체 발주했습니다.",
            "오픈 압박과 예산을 이유로 제가 공동 승인선을 넘었습니다."
          ],
          "privateKnowledge": [
            "브랜드 포인트 구역이라는 걸 알면서도 실행했다.",
            "처음엔 상대 책임을 앞세워 제 결정을 가렸다."
          ],
          "suppressions": [
            "상대를 먼저 탓하며 시간을 끈 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-1:act:2",
              "factText": "보라의 최종 확인 없이 진열집기와 조명 일부를 다른 모델로 대체 발주한 사실",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "진열집기·조명 일부",
                  "neutral": "해당 품목"
                },
                "time": {
                  "exact": "주말 재오픈 직전",
                  "neutral": "그 시점",
                  "period": "오픈 주간"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:rule:4",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인 대상이었다는 원칙",
              "tags": [
                "rule",
                "threshold",
                "relationship"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-1:admission:5",
              "factText": "브랜드 포인트 구역이라는 점을 알면서도 납기와 예산을 이유로 승인선을 넘었다는 자인",
              "tags": [
                "admission",
                "motive",
                "identity",
                "fear"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역 품목",
                  "neutral": "민감한 구역"
                },
                "reason": {
                  "exact": "납기·예산 압박",
                  "neutral": "그 사정"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "카운터 위치랑 철거 순서를 먼저 흔든 건 보라 쪽입니다.",
            "현장에서는 이미 그 지시가 내려온 뒤였어요."
          ],
          "privateKnowledge": [
            "브랜딩 툴 댓글과 수정 평면도 흐름을 알고 있다.",
            "그 뒤 자신도 현장판을 따로 밀어 혼선을 키웠다."
          ],
          "suppressions": [
            "자신도 후속 혼선에 관여한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-2:act:0",
              "factText": "보라가 카운터 위치와 철거 순서를 다시 바꾸라고 시공팀에 지시했다는 주장",
              "tags": [
                "act",
                "timeline",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:relationship:4",
              "factText": "가람은 수정 코멘트와 평면도가 돌아간 뒤에야 상황을 파악했다는 입장",
              "tags": [
                "relationship",
                "timeline",
                "denial"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "디자인 코멘트라고 부르지만, 현장에선 철거 순서까지 바뀐 걸로 받아들였습니다.",
            "제가 뒤늦게 맞춰본 거지 먼저 흔든 건 아닙니다."
          ],
          "privateKnowledge": [
            "댓글 후 22분 만에 수정 평면도가 생성됐다.",
            "자신도 즉시 제동하지는 못했다."
          ],
          "suppressions": [
            "자신이 이후 현장판을 더 밀어붙인 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-2:act:0",
              "factText": "보라가 카운터 위치와 철거 순서를 다시 바꾸라고 시공팀에 지시했다는 주장",
              "tags": [
                "act",
                "timeline",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:evidence:1",
              "factText": "브랜딩 툴 코멘트 뒤 22분 만에 수정 평면도가 생성된 흐름",
              "tags": [
                "evidence",
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "댓글 후 22분",
                  "neutral": "짧은 간격"
                },
                "item": {
                  "exact": "수정 평면도",
                  "neutral": "그 도면"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:relationship:4",
              "factText": "가람은 수정 코멘트와 평면도가 돌아간 뒤에야 상황을 파악했다는 입장",
              "tags": [
                "relationship",
                "timeline",
                "denial"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "카운터 이동 지시 자체는 보라 쪽에서 시작된 게 맞습니다.",
            "다만 제가 그걸 멈추기보다 현장식으로 덮으려 한 건 있습니다."
          ],
          "privateKnowledge": [
            "브랜드 포인트와 시야를 이유로 보라가 움직였다.",
            "그 뒤 자신도 대응을 단독으로 밀어붙였다."
          ],
          "suppressions": [
            "상대만의 문제처럼 정리한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-2:act:0",
              "factText": "보라가 카운터 위치와 철거 순서를 다시 바꾸라고 시공팀에 지시했다는 주장",
              "tags": [
                "act",
                "timeline",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:evidence:1",
              "factText": "브랜딩 툴 코멘트 뒤 22분 만에 수정 평면도가 생성된 흐름",
              "tags": [
                "evidence",
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "댓글 후 22분",
                  "neutral": "짧은 간격"
                },
                "item": {
                  "exact": "수정 평면도",
                  "neutral": "그 도면"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:motive:2",
              "factText": "보라가 카운터 시야와 브랜드 포인트를 이유로 현장 순서를 다시 건드렸다는 해석",
              "tags": [
                "motive",
                "identity",
                "counter"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 시야·브랜드 포인트",
                  "neutral": "그 기준"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "보라는 브랜드 일관성이라고 말하지만 실제로는 일정까지 건드렸습니다.",
            "저도 그 뒤 대응을 단독으로 밀어붙여 상황을 더 헷갈리게 했습니다."
          ],
          "privateKnowledge": [
            "서로 다른 권위가 현장에 생겼다.",
            "혼선은 한쪽만의 결과가 아니었다."
          ],
          "suppressions": [
            "초기에는 보라만 월권한 사람처럼 몰아간 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-2:act:0",
              "factText": "보라가 카운터 위치와 철거 순서를 다시 바꾸라고 시공팀에 지시했다는 주장",
              "tags": [
                "act",
                "timeline",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:motive:2",
              "factText": "보라가 카운터 시야와 브랜드 포인트를 이유로 현장 순서를 다시 건드렸다는 해석",
              "tags": [
                "motive",
                "identity",
                "counter"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 시야·브랜드 포인트",
                  "neutral": "그 기준"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:harm:3",
              "factText": "카운터 재배치 지시 때문에 현장 철거와 설치 순서를 다시 맞춰야 했다는 현장 부담",
              "tags": [
                "harm",
                "responsibility",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "오픈 직전 이틀",
                  "neutral": "막바지 일정"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "보라의 카운터 재지시가 충격파였던 건 맞지만, 그걸 제 변경으로 받아친 순간 승인선이 같이 무너졌습니다."
          ],
          "privateKnowledge": [
            "공동 책임 구조를 알고 있었다.",
            "자신의 현장 대응도 상황을 악화시켰다."
          ],
          "suppressions": [
            "자신의 반응적 월권을 바로 인정하지 않은 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-2:motive:2",
              "factText": "보라가 카운터 시야와 브랜드 포인트를 이유로 현장 순서를 다시 건드렸다는 해석",
              "tags": [
                "motive",
                "identity",
                "counter"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 시야·브랜드 포인트",
                  "neutral": "그 기준"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:harm:3",
              "factText": "카운터 재배치 지시 때문에 현장 철거와 설치 순서를 다시 맞춰야 했다는 현장 부담",
              "tags": [
                "harm",
                "responsibility",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "오픈 직전 이틀",
                  "neutral": "막바지 일정"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "보라가 재확인 없이 카운터 위치와 철거 순서를 바꾼 건 맞습니다.",
            "그리고 저는 그 뒤 제 판단을 또 따로 밀어붙여 결국 둘 다 선을 넘었습니다."
          ],
          "privateKnowledge": [
            "자신도 뒤늦게 현장판을 최종안처럼 전달했다.",
            "상대를 먼저 범인처럼 몰아간 건 방어였다."
          ],
          "suppressions": [
            "자신의 공격적 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-2:act:0",
              "factText": "보라가 카운터 위치와 철거 순서를 다시 바꾸라고 시공팀에 지시했다는 주장",
              "tags": [
                "act",
                "timeline",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-2:harm:3",
              "factText": "카운터 재배치 지시 때문에 현장 철거와 설치 순서를 다시 맞춰야 했다는 현장 부담",
              "tags": [
                "harm",
                "responsibility",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "오픈 직전 이틀",
                  "neutral": "막바지 일정"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "그 원칙은 평소 기준이지, 그 주말까지 똑같이 적용하긴 어려웠습니다."
          ],
          "privateKnowledge": [
            "공동 승인 원칙 문서에 이미 서명했다.",
            "예외 범위는 문서에 없었다."
          ],
          "suppressions": [
            "자신도 원칙을 벗어난 실행 지시를 한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인해야 한다는 합의",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:self_justification:1",
              "factText": "현장 예외가 불가피해 합의 문구가 실제 상황을 다 담지 못했다는 주장",
              "tags": [
                "self_justification",
                "context",
                "uncertainty"
              ],
              "slots": {
                "institution": {
                  "exact": "관리소 공사시간 제한",
                  "neutral": "외부 제약"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "관리소 제약까지 생겨서 모든 걸 공동 승인으로 묶으면 현장이 멈췄습니다."
          ],
          "privateKnowledge": [
            "긴급 현장판단 범위를 다시 정하지 못했다.",
            "예외 규정 없이도 스스로 예외처럼 행동했다."
          ],
          "suppressions": [
            "서명 문서 존재",
            "자신의 실행 지시"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-3:self_justification:1",
              "factText": "현장 예외가 불가피해 합의 문구가 실제 상황을 다 담지 못했다는 주장",
              "tags": [
                "self_justification",
                "context",
                "uncertainty"
              ],
              "slots": {
                "institution": {
                  "exact": "관리소 공사시간 제한",
                  "neutral": "외부 제약"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-3:context:4",
              "factText": "긴급 현장판단 허용 범위를 다시 정하지 못한 채 리뉴얼을 시작한 배경",
              "tags": [
                "context",
                "institution",
                "legacy_sentence"
              ],
              "slots": {
                "institution": {
                  "exact": "복합상가 관리소",
                  "neutral": "외부 관리 주체"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "문서에 적힌 원칙이 있었다는 건 압니다.",
            "저도 그 선을 완전히 지키진 못했습니다."
          ],
          "privateKnowledge": [
            "자신도 공동 승인 없이 실행했다.",
            "보라도 같은 방식으로 움직였다."
          ],
          "suppressions": [
            "상대만 원칙을 어긴 것처럼 말한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인해야 한다는 합의",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:self_justification:1",
              "factText": "현장 예외가 불가피해 합의 문구가 실제 상황을 다 담지 못했다는 주장",
              "tags": [
                "self_justification",
                "context",
                "uncertainty"
              ],
              "slots": {
                "institution": {
                  "exact": "관리소 공사시간 제한",
                  "neutral": "외부 제약"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-3:admission:2",
              "factText": "가람 자신도 공동 승인 없이 실행 지시를 내렸다는 사실",
              "tags": [
                "admission",
                "act",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "제가 원칙을 먼저 완벽히 지킨 건 아닙니다.",
            "그렇지만 보라도 자기 변경을 예외처럼 밀었습니다."
          ],
          "privateKnowledge": [
            "둘 다 예외를 자기 편의대로 만들었다.",
            "문서 기준보다 즉시 실행을 앞세웠다."
          ],
          "suppressions": [
            "원칙 위반을 공동 문제로 바로 인정하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인해야 한다는 합의",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:admission:2",
              "factText": "가람 자신도 공동 승인 없이 실행 지시를 내렸다는 사실",
              "tags": [
                "admission",
                "act",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:counter:3",
              "factText": "보라도 같은 원칙을 자신의 변경에서 지키지 않았다는 반박",
              "tags": [
                "counter",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "결국 둘 다 '긴급'이라는 말을 공동 승인보다 위에 올려놨습니다."
          ],
          "privateKnowledge": [
            "관리소 제한을 핑계로 삼았지만 문서엔 예외가 없었다.",
            "긴급 현장판단 범위를 재정의하지 않은 채 시작한 게 핵심이었다."
          ],
          "suppressions": [
            "문제를 상대 탓과 상황 탓 사이에서 흔든 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-3:self_justification:1",
              "factText": "현장 예외가 불가피해 합의 문구가 실제 상황을 다 담지 못했다는 주장",
              "tags": [
                "self_justification",
                "context",
                "uncertainty"
              ],
              "slots": {
                "institution": {
                  "exact": "관리소 공사시간 제한",
                  "neutral": "외부 제약"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-3:admission:2",
              "factText": "가람 자신도 공동 승인 없이 실행 지시를 내렸다는 사실",
              "tags": [
                "admission",
                "act",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:counter:3",
              "factText": "보라도 같은 원칙을 자신의 변경에서 지키지 않았다는 반박",
              "tags": [
                "counter",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:context:4",
              "factText": "긴급 현장판단 허용 범위를 다시 정하지 못한 채 리뉴얼을 시작한 배경",
              "tags": [
                "context",
                "institution",
                "legacy_sentence"
              ],
              "slots": {
                "institution": {
                  "exact": "복합상가 관리소",
                  "neutral": "외부 관리 주체"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 오픈 주간 공동 승인 원칙은 두 사람 다 어겼습니다.",
            "문서에 예외가 없었는데도 각자 자기 예외를 만들었습니다."
          ],
          "privateKnowledge": [
            "서명한 규칙을 알면서도 각자 실행을 밀었다.",
            "상대만의 월권처럼 보이게 말했던 부분이 있다."
          ],
          "suppressions": [
            "책임을 반반으로 말하기 전까지의 방어적 서술"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인해야 한다는 합의",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:admission:2",
              "factText": "가람 자신도 공동 승인 없이 실행 지시를 내렸다는 사실",
              "tags": [
                "admission",
                "act",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:counter:3",
              "factText": "보라도 같은 원칙을 자신의 변경에서 지키지 않았다는 반박",
              "tags": [
                "counter",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-3:context:4",
              "factText": "긴급 현장판단 허용 범위를 다시 정하지 못한 채 리뉴얼을 시작한 배경",
              "tags": [
                "context",
                "institution",
                "legacy_sentence"
              ],
              "slots": {
                "institution": {
                  "exact": "복합상가 관리소",
                  "neutral": "외부 관리 주체"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "지연이 길어진 건 보라가 카운터랑 철거 순서를 늦게 뒤집었기 때문입니다."
          ],
          "privateKnowledge": [
            "e-6에는 자신의 대체 발주와 보라 재지시가 모두 기록됐다.",
            "오픈을 망친 운영총괄로 보일까 두려웠다."
          ],
          "suppressions": [
            "자신의 대체 발주 영향",
            "공동 결과 구조"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-4:counter:0",
              "factText": "지연의 시작은 보라가 카운터 동선과 철거 순서를 뒤집은 데 있었다는 주장",
              "tags": [
                "counter",
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 동선·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "제 발주 변경만으로 지연이 났다는 건 아닙니다.",
            "현장을 실제로 꼬이게 한 건 그 뒤 동선 재지시였습니다."
          ],
          "privateKnowledge": [
            "현장일지에는 두 변경이 함께 적혀 있다.",
            "자신의 변경도 추가 조율을 만들었다."
          ],
          "suppressions": [
            "상대만 지연 원인처럼 몰아가는 방식"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-4:counter:0",
              "factText": "지연의 시작은 보라가 카운터 동선과 철거 순서를 뒤집은 데 있었다는 주장",
              "tags": [
                "counter",
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 동선·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-4:act:1",
              "factText": "실제 지연은 가람의 대체 발주와 보라의 카운터 재지시가 서로 겹치며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "대체 발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "제 대체 발주가 추가 조율을 만든 건 인정합니다.",
            "하지만 지연이 커진 건 보라 재지시가 같은 구간에 겹쳤기 때문입니다."
          ],
          "privateKnowledge": [
            "지연은 단일 원인이 아니라 순서 충돌이었다.",
            "추가견적서에도 복합 원인이 드러난다."
          ],
          "suppressions": [
            "오픈 실패 책임이 자신에게 돌아올 두려움"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-4:act:1",
              "factText": "실제 지연은 가람의 대체 발주와 보라의 카운터 재지시가 서로 겹치며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "대체 발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-4:evidence:2",
              "factText": "시공 PM 현장일지와 추가견적서가 하루 지연과 추가비용을 시간순으로 나눠 기록한 점",
              "tags": [
                "evidence",
                "harm",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "하루 지연",
                  "neutral": "추가 지연"
                },
                "item": {
                  "exact": "추가비용",
                  "neutral": "추가 손실"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "사실 저는 오픈을 망친 사람처럼 보일까 봐 보라 책임을 더 먼저 내세웠습니다.",
            "그래도 한 사람 탓으로 정리되진 않습니다."
          ],
          "privateKnowledge": [
            "두려움이 공격적인 프레임을 만들었다.",
            "자신도 공동 원인임을 알고 있었다."
          ],
          "suppressions": [
            "처음부터 감정과 두려움을 숨긴 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-4:act:1",
              "factText": "실제 지연은 가람의 대체 발주와 보라의 카운터 재지시가 서로 겹치며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "대체 발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-4:fear:3",
              "factText": "오픈을 망친 운영총괄로 보일까 두려워 보라 책임을 먼저 밀어 올렸다는 심리",
              "tags": [
                "fear",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "그때는 누가 먼저 넘었느냐보다 다시 문을 여는 게 더 무서웠습니다.",
            "그래서 저도 상대 한 명 책임처럼 몰아간 부분이 있습니다."
          ],
          "privateKnowledge": [
            "현장판단과 월권의 경계를 다시 정하지 못한 상태였다.",
            "문을 빨리 열어야 한다는 압박이 판단을 흐렸다."
          ],
          "suppressions": [
            "보라만의 월권 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-4:evidence:2",
              "factText": "시공 PM 현장일지와 추가견적서가 하루 지연과 추가비용을 시간순으로 나눠 기록한 점",
              "tags": [
                "evidence",
                "harm",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "하루 지연",
                  "neutral": "추가 지연"
                },
                "item": {
                  "exact": "추가비용",
                  "neutral": "추가 손실"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-4:fear:3",
              "factText": "오픈을 망친 운영총괄로 보일까 두려워 보라 책임을 먼저 밀어 올렸다는 심리",
              "tags": [
                "fear",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-4:admission:4",
              "factText": "한 사람의 월권만이 아니라 승인선 붕괴 전체가 지연 원인이었다는 인정",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "승인선 붕괴",
                  "neutral": "그 문제"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "지연은 보라 한 사람의 월권 때문만이 아니었습니다.",
            "제 대체 발주와 보라의 카운터 재지시가 겹친 공동 결과였습니다."
          ],
          "privateKnowledge": [
            "승인선 붕괴를 한 사람 책임처럼 말한 건 자기보호였다.",
            "실제 기록은 공동 결과를 보여 준다."
          ],
          "suppressions": [
            "처음의 단독 책임 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-4:act:1",
              "factText": "실제 지연은 가람의 대체 발주와 보라의 카운터 재지시가 서로 겹치며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "대체 발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-4:evidence:2",
              "factText": "시공 PM 현장일지와 추가견적서가 하루 지연과 추가비용을 시간순으로 나눠 기록한 점",
              "tags": [
                "evidence",
                "harm",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "하루 지연",
                  "neutral": "추가 지연"
                },
                "item": {
                  "exact": "추가비용",
                  "neutral": "추가 손실"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-4:admission:4",
              "factText": "한 사람의 월권만이 아니라 승인선 붕괴 전체가 지연 원인이었다는 인정",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "승인선 붕괴",
                  "neutral": "그 문제"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "제가 보낸 건 현장 작업판이지 별도 최종안은 아니었습니다.",
            "직원들이 헷갈린 건 보라 쪽 버전이 계속 바뀌었기 때문입니다."
          ],
          "privateKnowledge": [
            "자신도 수정 일정표를 사실상 최종안처럼 돌렸다.",
            "부매니저 캡처는 약하지만 다른 기록과 맞물린다."
          ],
          "suppressions": [
            "자신 버전 전달 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-5:denial:0",
              "factText": "현장에 전달한 것은 작업용 버전일 뿐 별도 최종안은 아니었다는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "작업용 버전",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:counter:2",
              "factText": "보라도 다른 일정표와 평면도를 최종안처럼 돌려 혼선을 키웠다는 반박",
              "tags": [
                "counter",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "현장에서는 당장 쓸 버전이 필요해서 공유한 겁니다.",
            "그걸 경쟁하는 최종안이라고 부르면 억울합니다."
          ],
          "privateKnowledge": [
            "협력업체에도 같은 버전을 보냈다.",
            "현장에선 그 버전이 권위 있게 읽힐 걸 알았다."
          ],
          "suppressions": [
            "외부에도 별도 버전이 돌았다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-5:denial:0",
              "factText": "현장에 전달한 것은 작업용 버전일 뿐 별도 최종안은 아니었다는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "작업용 버전",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:act:1",
              "factText": "가람이 자신의 수정안을 직원과 협력업체에 사실상 최종안처럼 전달한 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "수정 일정표·현장판",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "제 작업판이 현장에선 최종안처럼 받아들여졌을 수는 있습니다.",
            "하지만 보라도 자기 버전을 같은 자리에 올려놨습니다."
          ],
          "privateKnowledge": [
            "자신 버전도 실무자에겐 최종안으로 들렸다.",
            "혼선은 두 대표의 병렬 지시 때문이었다."
          ],
          "suppressions": [
            "자신이 먼저 권위 경쟁에 들어간 시점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-5:denial:0",
              "factText": "현장에 전달한 것은 작업용 버전일 뿐 별도 최종안은 아니었다는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "작업용 버전",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:act:1",
              "factText": "가람이 자신의 수정안을 직원과 협력업체에 사실상 최종안처럼 전달한 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "수정 일정표·현장판",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:counter:2",
              "factText": "보라도 다른 일정표와 평면도를 최종안처럼 돌려 혼선을 키웠다는 반박",
              "tags": [
                "counter",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "네, 저도 제 버전을 더 강하게 밀었습니다.",
            "다만 혼선은 두 사람이 각자 마지막 말을 하려 해서 생긴 겁니다."
          ],
          "privateKnowledge": [
            "직원과 시공팀이 두 대표를 각각 최종 승인자처럼 봤다.",
            "혼선을 공동 문제로 알고 있다."
          ],
          "suppressions": [
            "상대만 혼선을 만든 것처럼 말한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-5:act:1",
              "factText": "가람이 자신의 수정안을 직원과 협력업체에 사실상 최종안처럼 전달한 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "수정 일정표·현장판",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:counter:2",
              "factText": "보라도 다른 일정표와 평면도를 최종안처럼 돌려 혼선을 키웠다는 반박",
              "tags": [
                "counter",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:harm:3",
              "factText": "직원과 시공팀이 서로 다른 권위 있는 지시를 동시에 참고하게 된 결과",
              "tags": [
                "harm",
                "context",
                "relationship"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 일정표·평면도",
                  "neutral": "서로 다른 버전"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "직원들이 대표 둘 중 누구 말을 따라야 할지 몰랐다는 말이 가장 아프더군요.",
            "그 장면에 제 책임도 있습니다."
          ],
          "privateKnowledge": [
            "부매니저 캡처는 약하지만 기관 기록과 현장일지까지 붙으면 자신의 책임이 선명해진다.",
            "실무자를 두 권위 사이에 세웠다."
          ],
          "suppressions": [
            "작업판이라고 축소해 온 말"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-5:act:1",
              "factText": "가람이 자신의 수정안을 직원과 협력업체에 사실상 최종안처럼 전달한 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "수정 일정표·현장판",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:harm:3",
              "factText": "직원과 시공팀이 서로 다른 권위 있는 지시를 동시에 참고하게 된 결과",
              "tags": [
                "harm",
                "context",
                "relationship"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 일정표·평면도",
                  "neutral": "서로 다른 버전"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-5:evidence:4",
              "factText": "부매니저 단톡 캡처는 약하지만 관리소 기록과 PM 일지까지 붙으면 복수 최종안이 드러난다는 점",
              "tags": [
                "evidence",
                "privacy",
                "institution"
              ],
              "slots": {
                "institution": {
                  "exact": "관리소 기록·PM 일지",
                  "neutral": "다른 기록"
                },
                "item": {
                  "exact": "부매니저 단톡 캡처",
                  "neutral": "대화 캡처"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 저는 제 수정안을 직원과 협력업체에 최종안처럼 전달했습니다.",
            "보라도 다른 버전을 돌렸고, 그 결과 팀이 서로 다른 표를 봤습니다."
          ],
          "privateKnowledge": [
            "자신의 작업판이 곧 최종안처럼 읽히리라는 걸 알았다.",
            "혼선을 상대 탓만으로 정리할 수 없다는 걸 알고 있었다."
          ],
          "suppressions": [
            "초기의 축소 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:a:tell:urgency_assertion",
            "partnership-06:a:tell:blame_snap",
            "partnership-06:a:tell:site_authority_claim"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:a:d-5:act:1",
              "factText": "가람이 자신의 수정안을 직원과 협력업체에 사실상 최종안처럼 전달한 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "본인",
                  "fullName": "이가람",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "수정 일정표·현장판",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:counter:2",
              "factText": "보라도 다른 일정표와 평면도를 최종안처럼 돌려 혼선을 키웠다는 반박",
              "tags": [
                "counter",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "상대",
                  "fullName": "최보라",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:a:d-5:harm:3",
              "factText": "직원과 시공팀이 서로 다른 권위 있는 지시를 동시에 참고하게 된 결과",
              "tags": [
                "harm",
                "context",
                "relationship"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 일정표·평면도",
                  "neutral": "서로 다른 버전"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:a:d-5:evidence:4",
              "factText": "부매니저 단톡 캡처는 약하지만 관리소 기록과 PM 일지까지 붙으면 복수 최종안이 드러난다는 점",
              "tags": [
                "evidence",
                "privacy",
                "institution"
              ],
              "slots": {
                "institution": {
                  "exact": "관리소 기록·PM 일지",
                  "neutral": "다른 기록"
                },
                "item": {
                  "exact": "부매니저 단톡 캡처",
                  "neutral": "대화 캡처"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        }
      }
    },
    "b": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "가람이 승인된 디자인을 운영 판단으로 바꾼 겁니다.",
            "조달 조정이라고 부르기엔 바뀐 구역이 너무 핵심이었습니다."
          ],
          "privateKnowledge": [
            "자신도 이후 반응적으로 설계 지시를 강화했다.",
            "가람 발주가 브랜드 포인트 구역에 집중됐다."
          ],
          "suppressions": [
            "자신의 후속 일정 개입"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-1:act:0",
              "factText": "가람이 승인된 집기와 조명 모델을 운영 판단으로 바꿨다는 주장",
              "tags": [
                "act",
                "relationship",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "집기·조명 모델",
                  "neutral": "그 품목"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:evidence:1",
              "factText": "발주서와 PM 로그가 브랜드 포인트 구역 품목부터 바뀐 흐름을 보여 준다는 점",
              "tags": [
                "evidence",
                "timeline",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역",
                  "neutral": "민감 구역"
                },
                "institution": {
                  "exact": "발주서·PM 로그",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "그 변경은 단순 납기 대응이 아니라 브랜드 포인트를 건드린 발주였습니다."
          ],
          "privateKnowledge": [
            "가람 변경이 브랜드 정체성에 직접 닿는 지점이었다.",
            "자신도 그 분노 때문에 더 강하게 대응했다."
          ],
          "suppressions": [
            "후속 설계 지시가 공정을 흔든 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-1:act:0",
              "factText": "가람이 승인된 집기와 조명 모델을 운영 판단으로 바꿨다는 주장",
              "tags": [
                "act",
                "relationship",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "집기·조명 모델",
                  "neutral": "그 품목"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:evidence:1",
              "factText": "발주서와 PM 로그가 브랜드 포인트 구역 품목부터 바뀐 흐름을 보여 준다는 점",
              "tags": [
                "evidence",
                "timeline",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역",
                  "neutral": "민감 구역"
                },
                "institution": {
                  "exact": "발주서·PM 로그",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:motive:2",
              "factText": "가람이 납기와 조달 편의를 브랜드 완성도보다 먼저 놓았다는 해석",
              "tags": [
                "motive",
                "counter",
                "identity"
              ],
              "slots": {
                "reason": {
                  "exact": "납기·조달 편의",
                  "neutral": "그 이유"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "가람의 대체 발주가 먼저 있었던 건 맞습니다.",
            "다만 저도 그 뒤 설계 지시를 더 밀어붙였습니다."
          ],
          "privateKnowledge": [
            "자신도 공동 승인선이 이미 흔들렸다고 느꼈다.",
            "상대만의 월권으로는 정리되지 않는다는 걸 알고 있다."
          ],
          "suppressions": [
            "자신의 대응이 충돌을 키운 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-1:act:0",
              "factText": "가람이 승인된 집기와 조명 모델을 운영 판단으로 바꿨다는 주장",
              "tags": [
                "act",
                "relationship",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "집기·조명 모델",
                  "neutral": "그 품목"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:evidence:1",
              "factText": "발주서와 PM 로그가 브랜드 포인트 구역 품목부터 바뀐 흐름을 보여 준다는 점",
              "tags": [
                "evidence",
                "timeline",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역",
                  "neutral": "민감 구역"
                },
                "institution": {
                  "exact": "발주서·PM 로그",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:rule:4",
              "factText": "최종 확인과 공동 승인선이 빠진 상태였다는 점",
              "tags": [
                "rule",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "운영이 브랜드 결정을 대신한 건 분명하지만, 저도 그걸 바로잡는다는 명분으로 선을 좁게 보지 못했습니다."
          ],
          "privateKnowledge": [
            "가람 월권을 크게 말할수록 자신의 일정 개입은 작아 보인다고 느꼈다.",
            "반응적 개입이 있었다."
          ],
          "suppressions": [
            "감정이 섞인 과장"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-1:motive:2",
              "factText": "가람이 납기와 조달 편의를 브랜드 완성도보다 먼저 놓았다는 해석",
              "tags": [
                "motive",
                "counter",
                "identity"
              ],
              "slots": {
                "reason": {
                  "exact": "납기·조달 편의",
                  "neutral": "그 이유"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:harm:3",
              "factText": "초점 구역의 모델 변경이 매장 정체성과 첫 인상을 흔들었다는 인식",
              "tags": [
                "harm",
                "identity",
                "emotion"
              ],
              "slots": {
                "item": {
                  "exact": "초점 구역 첫 인상",
                  "neutral": "브랜드 인상"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-1:rule:4",
              "factText": "최종 확인과 공동 승인선이 빠진 상태였다는 점",
              "tags": [
                "rule",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "저는 그 구역 완성도가 무너지는 게 너무 싫어서 가람의 월권을 더 크게 말했습니다."
          ],
          "privateKnowledge": [
            "브랜드 포인트 집착이 언어를 더 날카롭게 만들었다.",
            "자신도 후속 충돌의 일부다."
          ],
          "suppressions": [
            "상대 월권만 강조해 온 서술"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-1:evidence:1",
              "factText": "발주서와 PM 로그가 브랜드 포인트 구역 품목부터 바뀐 흐름을 보여 준다는 점",
              "tags": [
                "evidence",
                "timeline",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역",
                  "neutral": "민감 구역"
                },
                "institution": {
                  "exact": "발주서·PM 로그",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:harm:3",
              "factText": "초점 구역의 모델 변경이 매장 정체성과 첫 인상을 흔들었다는 인식",
              "tags": [
                "harm",
                "identity",
                "emotion"
              ],
              "slots": {
                "item": {
                  "exact": "초점 구역 첫 인상",
                  "neutral": "브랜드 인상"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-1:rule:4",
              "factText": "최종 확인과 공동 승인선이 빠진 상태였다는 점",
              "tags": [
                "rule",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "가람이 제 최종 확인 없이 집기와 조명을 바꾼 건 맞습니다.",
            "그리고 그 일에 제가 반응적으로 더 강한 지시를 얹으면서 충돌이 커졌습니다."
          ],
          "privateKnowledge": [
            "상대 월권은 사실이지만 자신의 반응도 공동 원인이었다.",
            "한쪽만의 책임처럼 말한 부분이 있었다."
          ],
          "suppressions": [
            "초기의 단독 비난 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-1:act:0",
              "factText": "가람이 승인된 집기와 조명 모델을 운영 판단으로 바꿨다는 주장",
              "tags": [
                "act",
                "relationship",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "집기·조명 모델",
                  "neutral": "그 품목"
                }
              },
              "stanceHints": [
                "blame",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:evidence:1",
              "factText": "발주서와 PM 로그가 브랜드 포인트 구역 품목부터 바뀐 흐름을 보여 준다는 점",
              "tags": [
                "evidence",
                "timeline",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 포인트 구역",
                  "neutral": "민감 구역"
                },
                "institution": {
                  "exact": "발주서·PM 로그",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-1:rule:4",
              "factText": "최종 확인과 공동 승인선이 빠진 상태였다는 점",
              "tags": [
                "rule",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        }
      },
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "저는 위치와 동선에 대한 디자인 조정을 말한 겁니다.",
            "철거 일정까지 제가 결정했다는 표현은 과합니다."
          ],
          "privateKnowledge": [
            "댓글에 철거 순서 변경 문구가 있었다.",
            "관리소 허가 변경과 게이트 로그가 자신의 시간대를 남겼다."
          ],
          "suppressions": [
            "가람 재확인 없이 말했다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-2:denial:0",
              "factText": "자신의 지시는 디자인 조정일 뿐 공정 지시는 아니라는 주장",
              "tags": [
                "denial",
                "self_justification",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "디자인 조정",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "카운터 위치는 브랜드 구조의 일부입니다.",
            "공정 판단은 현장과 시공팀이 가져가는 영역이었습니다."
          ],
          "privateKnowledge": [
            "카운터 이동이 실제 공정에 영향을 준다는 걸 알고 있었다.",
            "댓글과 평면도에 순서 변경이 남아 있다."
          ],
          "suppressions": [
            "철거 순서 변경 문구",
            "자신의 영향력"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-2:denial:0",
              "factText": "자신의 지시는 디자인 조정일 뿐 공정 지시는 아니라는 주장",
              "tags": [
                "denial",
                "self_justification",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "디자인 조정",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "partnership-06:b:d-2:motive:2",
              "factText": "브랜드 일관성과 동선 전환율을 이유로 카운터 시야를 끝까지 고집한 점",
              "tags": [
                "motive",
                "identity",
                "self_justification"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 일관성·동선 전환율",
                  "neutral": "그 기준"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "네, 제가 카운터 이동과 철거 순서에 함께 손댄 건 맞습니다.",
            "당시엔 브랜드 일관성이 깨진다고 봤습니다."
          ],
          "privateKnowledge": [
            "가람과 재확인하지 않은 채 말했다.",
            "댓글 후 22분 만에 수정 평면도가 생성됐다."
          ],
          "suppressions": [
            "관리소 허가 변경까지 이어진 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-2:act:1",
              "factText": "가람과 재확인하지 않은 채 카운터 위치와 철거 순서를 바꾸라고 말한 사실",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:motive:2",
              "factText": "브랜드 일관성과 동선 전환율을 이유로 카운터 시야를 끝까지 고집한 점",
              "tags": [
                "motive",
                "identity",
                "self_justification"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 일관성·동선 전환율",
                  "neutral": "그 기준"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:evidence:3",
              "factText": "디자인 협업 툴 댓글과 수정 평면도에 철거 순서 변경 문구가 함께 남은 기록",
              "tags": [
                "evidence",
                "timeline",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "협업 툴 댓글·수정 평면도",
                  "neutral": "그 기록"
                },
                "time": {
                  "exact": "댓글 후 22분",
                  "neutral": "짧은 간격"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "문제를 디자인 범주로 잘게 나눠 말한 건 사실입니다.",
            "실제로는 관리소 허가와 외부 일정에까지 영향이 갔습니다."
          ],
          "privateKnowledge": [
            "외부 허가 변경으로 자신의 지시가 남았다.",
            "범위를 좁혀 말하면 경력상 타격을 줄일 수 있다고 느꼈다."
          ],
          "suppressions": [
            "경력 보호를 위한 축소"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-2:denial:0",
              "factText": "자신의 지시는 디자인 조정일 뿐 공정 지시는 아니라는 주장",
              "tags": [
                "denial",
                "self_justification",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "디자인 조정",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "partnership-06:b:d-2:evidence:3",
              "factText": "디자인 협업 툴 댓글과 수정 평면도에 철거 순서 변경 문구가 함께 남은 기록",
              "tags": [
                "evidence",
                "timeline",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "협업 툴 댓글·수정 평면도",
                  "neutral": "그 기록"
                },
                "time": {
                  "exact": "댓글 후 22분",
                  "neutral": "짧은 간격"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:institution:4",
              "factText": "관리소 허가 변경 기록과 게이트 로그가 보라 요청 시간을 외부적으로 남긴 점",
              "tags": [
                "institution",
                "evidence",
                "timeline"
              ],
              "slots": {
                "institution": {
                  "exact": "복합상가 관리소",
                  "neutral": "외부 관리 주체"
                },
                "item": {
                  "exact": "허가 변경 기록·게이트 로그",
                  "neutral": "외부 기록"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "제가 '브랜드 일관성'이라는 말로 일정 개입을 작게 보이게 만든 건 인정합니다.",
            "그게 제 경력을 지키는 말이었던 것도 압니다."
          ],
          "privateKnowledge": [
            "브랜드 명분 뒤에 일정 권한 침범을 숨겼다.",
            "월권으로 보일까 두려웠다."
          ],
          "suppressions": [
            "디자인 조정이라는 축소 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-2:motive:2",
              "factText": "브랜드 일관성과 동선 전환율을 이유로 카운터 시야를 끝까지 고집한 점",
              "tags": [
                "motive",
                "identity",
                "self_justification"
              ],
              "slots": {
                "item": {
                  "exact": "브랜드 일관성·동선 전환율",
                  "neutral": "그 기준"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:institution:4",
              "factText": "관리소 허가 변경 기록과 게이트 로그가 보라 요청 시간을 외부적으로 남긴 점",
              "tags": [
                "institution",
                "evidence",
                "timeline"
              ],
              "slots": {
                "institution": {
                  "exact": "복합상가 관리소",
                  "neutral": "외부 관리 주체"
                },
                "item": {
                  "exact": "허가 변경 기록·게이트 로그",
                  "neutral": "외부 기록"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:admission:5",
              "factText": "브랜드 명분으로 설명했지만 실제로는 일정 권한까지 넘겨짚었다는 자인",
              "tags": [
                "admission",
                "rule",
                "shame"
              ],
              "slots": {
                "reason": {
                  "exact": "브랜드 일관성 유지",
                  "neutral": "그 명분"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 저는 가람과 다시 확인하지 않은 채 카운터 위치와 철거 순서를 바꾸라고 말했습니다.",
            "브랜드 명분으로 설명했지만 일정 권한까지 건드린 월권이었습니다."
          ],
          "privateKnowledge": [
            "관리소 기록까지 맞물려 자신의 지시가 남아 있다.",
            "처음엔 축소 프레임으로 빠져나가려 했다."
          ],
          "suppressions": [
            "위치만 말했다는 초반 주장"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-2:act:1",
              "factText": "가람과 재확인하지 않은 채 카운터 위치와 철거 순서를 바꾸라고 말한 사실",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "카운터 위치·철거 순서",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:evidence:3",
              "factText": "디자인 협업 툴 댓글과 수정 평면도에 철거 순서 변경 문구가 함께 남은 기록",
              "tags": [
                "evidence",
                "timeline",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "협업 툴 댓글·수정 평면도",
                  "neutral": "그 기록"
                },
                "time": {
                  "exact": "댓글 후 22분",
                  "neutral": "짧은 간격"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:institution:4",
              "factText": "관리소 허가 변경 기록과 게이트 로그가 보라 요청 시간을 외부적으로 남긴 점",
              "tags": [
                "institution",
                "evidence",
                "timeline"
              ],
              "slots": {
                "institution": {
                  "exact": "복합상가 관리소",
                  "neutral": "외부 관리 주체"
                },
                "item": {
                  "exact": "허가 변경 기록·게이트 로그",
                  "neutral": "외부 기록"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-2:admission:5",
              "factText": "브랜드 명분으로 설명했지만 실제로는 일정 권한까지 넘겨짚었다는 자인",
              "tags": [
                "admission",
                "rule",
                "shame"
              ],
              "slots": {
                "reason": {
                  "exact": "브랜드 일관성 유지",
                  "neutral": "그 명분"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "공동 승인 원칙은 큰 비용과 큰 공정 변경을 위한 기준이었습니다.",
            "모든 디자인 수정이 거기에 들어가진 않는다고 봤습니다."
          ],
          "privateKnowledge": [
            "서명 문서에 예외 조항이 없다.",
            "자신도 원칙을 쪼개 말하며 빠져나가려 했다."
          ],
          "suppressions": [
            "카운터 이동이 승인 대상이었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인이라는 기본선",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-3:self_justification:1",
              "factText": "카운터 이동은 디자인 범주라서 승인 규칙 바깥이라고 쪼개 말한 프레임",
              "tags": [
                "self_justification",
                "denial",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 이동",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "오픈 주간엔 세부 수정이 너무 촘촘해서 한 줄 한 줄 공동 승인으로 묶기 어려웠습니다."
          ],
          "privateKnowledge": [
            "세부 수정이라는 말로 원칙의 효력을 낮췄다.",
            "현장 압박을 핑계 삼았다."
          ],
          "suppressions": [
            "자신의 변경이 실질적 공정 수정이었던 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-3:self_justification:1",
              "factText": "카운터 이동은 디자인 범주라서 승인 규칙 바깥이라고 쪼개 말한 프레임",
              "tags": [
                "self_justification",
                "denial",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 이동",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "partnership-06:b:d-3:context:3",
              "factText": "오픈 주간의 세부 변경이 너무 촘촘했다는 이유로 규칙을 느슨하게 본 배경",
              "tags": [
                "context",
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "오픈 주간",
                  "neutral": "그 주"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "지금 보면 카운터 이동은 그 규칙 바깥이라고 보기 어렵습니다.",
            "가람도 발주 변경을 따로 밀었고요."
          ],
          "privateKnowledge": [
            "자신의 변경도 공동 승인 대상이었다.",
            "상대만의 위반처럼 보이게 분류를 나눴다."
          ],
          "suppressions": [
            "자신의 범주 쪼개기"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인이라는 기본선",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-3:self_justification:1",
              "factText": "카운터 이동은 디자인 범주라서 승인 규칙 바깥이라고 쪼개 말한 프레임",
              "tags": [
                "self_justification",
                "denial",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 이동",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "partnership-06:b:d-3:counter:2",
              "factText": "가람도 발주 변경을 공동 승인 없이 밀어 넣었다는 반박",
              "tags": [
                "counter",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "결국 저도 규칙을 지키기보다 나중에 설명하기 쉽게 쪼갰습니다.",
            "가람과 저 모두 각자 자기 예외를 만들었습니다."
          ],
          "privateKnowledge": [
            "문서 규칙보다 설명 가능한 말의 구조를 먼저 만들었다.",
            "공동 책임임을 안다."
          ],
          "suppressions": [
            "브랜드 예외라는 자기 서사"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-3:self_justification:1",
              "factText": "카운터 이동은 디자인 범주라서 승인 규칙 바깥이라고 쪼개 말한 프레임",
              "tags": [
                "self_justification",
                "denial",
                "identity"
              ],
              "slots": {
                "item": {
                  "exact": "카운터 이동",
                  "neutral": "그 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "partnership-06:b:d-3:counter:2",
              "factText": "가람도 발주 변경을 공동 승인 없이 밀어 넣었다는 반박",
              "tags": [
                "counter",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-3:admission:4",
              "factText": "결국 두 사람 모두 그 규칙을 나중에 책임 추궁용으로만 썼다는 인정",
              "tags": [
                "admission",
                "legacy_sentence",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "공동 승인 원칙",
                  "neutral": "그 규칙"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "브랜드 영역을 지키겠다는 마음이 컸지만, 그게 규칙을 가볍게 보는 핑계가 됐습니다."
          ],
          "privateKnowledge": [
            "원칙을 지키면 속도가 늦어진다고 생각했다.",
            "그 생각이 선을 흐렸다."
          ],
          "suppressions": [
            "상대 책임을 더 또렷하게 보이게 하려 한 태도"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-3:context:3",
              "factText": "오픈 주간의 세부 변경이 너무 촘촘했다는 이유로 규칙을 느슨하게 본 배경",
              "tags": [
                "context",
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "오픈 주간",
                  "neutral": "그 주"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-3:admission:4",
              "factText": "결국 두 사람 모두 그 규칙을 나중에 책임 추궁용으로만 썼다는 인정",
              "tags": [
                "admission",
                "legacy_sentence",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "공동 승인 원칙",
                  "neutral": "그 규칙"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 300만원 이상 변경과 오픈 주간 수정은 둘 다 공동 승인 대상이었고, 우리 둘 다 그 선을 어겼습니다."
          ],
          "privateKnowledge": [
            "분류를 나눠 말해도 실제 위반은 사라지지 않는다.",
            "문서를 책임 추궁용으로만 쓴 셈이다."
          ],
          "suppressions": [
            "자기 변경을 작은 조정으로만 말한 방식"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-3:rule:0",
              "factText": "300만원 이상 변경과 오픈 주간 공정 수정은 공동 승인이라는 기본선",
              "tags": [
                "rule",
                "threshold",
                "legacy_sentence"
              ],
              "slots": {
                "amount": {
                  "exact": "300만원 이상",
                  "neutral": "기준 금액 이상의 변경",
                  "rounded": "300만원대 이상"
                },
                "time": {
                  "exact": "오픈 주간 공정 수정",
                  "neutral": "그 주 변경"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-3:counter:2",
              "factText": "가람도 발주 변경을 공동 승인 없이 밀어 넣었다는 반박",
              "tags": [
                "counter",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-3:admission:4",
              "factText": "결국 두 사람 모두 그 규칙을 나중에 책임 추궁용으로만 썼다는 인정",
              "tags": [
                "admission",
                "legacy_sentence",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "공동 승인 원칙",
                  "neutral": "그 규칙"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "지연의 핵심 원인은 가람의 재발주였습니다.",
            "그 순간부터 공정 순서가 깨졌습니다."
          ],
          "privateKnowledge": [
            "e-6는 두 사람 지시를 따로 지연 원인으로 기록한다.",
            "일정 개입을 인정하면 브랜드 총괄 평가가 흔들릴까 두려웠다."
          ],
          "suppressions": [
            "자신의 카운터 재지시 영향",
            "공동 책임 구조"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-4:counter:0",
              "factText": "지연의 주된 단초는 가람이 승인된 발주를 바꾼 데 있다는 주장",
              "tags": [
                "counter",
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "대체 발주",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "제 코멘트가 불편을 더했을 수는 있어도, 지연의 첫 단추는 가람 발주 변경이었습니다."
          ],
          "privateKnowledge": [
            "자신의 코멘트도 작업 순서를 흔들었다.",
            "하지만 그 말을 줄이면 가람 책임이 커 보인다고 생각했다."
          ],
          "suppressions": [
            "자신의 개입 비중"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-4:counter:0",
              "factText": "지연의 주된 단초는 가람이 승인된 발주를 바꾼 데 있다는 주장",
              "tags": [
                "counter",
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이가람",
                  "neutral": "상대",
                  "fullName": "이가람",
                  "judgeRef": "상대방"
                },
                "item": {
                  "exact": "대체 발주",
                  "neutral": "그 변경"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-4:act:1",
              "factText": "실제 지연은 가람의 재발주와 보라의 카운터 재지시가 동시에 적용되며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "재발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "제 재지시도 추가 작업을 만들었습니다.",
            "하지만 현장이 꼬인 건 가람 재발주와 제 수정이 같은 구간에 겹쳤기 때문입니다."
          ],
          "privateKnowledge": [
            "현장일지에는 두 변경의 충돌이 나뉘어 적혔다.",
            "한 사람 탓만으론 설명되지 않는다."
          ],
          "suppressions": [
            "자신의 개입을 먼저 말하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-4:act:1",
              "factText": "실제 지연은 가람의 재발주와 보라의 카운터 재지시가 동시에 적용되며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "재발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-4:evidence:2",
              "factText": "현장일지와 추가견적서가 두 대표 지시를 별개의 지연 요인으로 분리 기록한 점",
              "tags": [
                "evidence",
                "harm",
                "timeline"
              ],
              "slots": {
                "item": {
                  "exact": "현장일지·추가견적서",
                  "neutral": "그 기록"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "사실 저는 일정까지 건드렸다는 평가가 두려워서 가람 책임을 더 크게 부풀렸습니다."
          ],
          "privateKnowledge": [
            "가람 월권을 키울수록 자신의 일정 개입은 작아 보였다.",
            "두려움이 말의 강도를 키웠다."
          ],
          "suppressions": [
            "자기보호 심리"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-4:act:1",
              "factText": "실제 지연은 가람의 재발주와 보라의 카운터 재지시가 동시에 적용되며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "재발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-4:fear:3",
              "factText": "디자인 총괄이 일정까지 건드렸다는 평가를 피하려고 가람 탓을 더 키웠다는 심리",
              "tags": [
                "fear",
                "shame",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "그날 저는 브랜드 완성도를 지키려다 현장의 이미 무너진 순서를 보지 못했습니다.",
            "그래서 가람 한 사람 탓이라는 말이 더 쉬웠습니다."
          ],
          "privateKnowledge": [
            "현장 스트레스를 평가하지 못했다.",
            "한 사람 탓 프레임은 자기방어였다."
          ],
          "suppressions": [
            "지연 원인을 단독 월권으로 묶은 서술"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-4:evidence:2",
              "factText": "현장일지와 추가견적서가 두 대표 지시를 별개의 지연 요인으로 분리 기록한 점",
              "tags": [
                "evidence",
                "harm",
                "timeline"
              ],
              "slots": {
                "item": {
                  "exact": "현장일지·추가견적서",
                  "neutral": "그 기록"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-4:fear:3",
              "factText": "디자인 총괄이 일정까지 건드렸다는 평가를 피하려고 가람 탓을 더 키웠다는 심리",
              "tags": [
                "fear",
                "shame",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-4:admission:4",
              "factText": "한쪽의 월권만이 아니라 서로 다른 변경이 동시에 적용돼 지연이 커졌다는 인정",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 변경의 동시 적용",
                  "neutral": "그 충돌"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "지연은 가람의 재발주만으로 생긴 게 아닙니다.",
            "제 카운터 재지시와 그의 발주 변경이 동시에 적용되며 생긴 공동 결과였습니다."
          ],
          "privateKnowledge": [
            "공동 결과임을 알면서도 단독 책임처럼 말해 왔다.",
            "기록은 복합 충돌을 보여 준다."
          ],
          "suppressions": [
            "단독 책임 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-4:act:1",
              "factText": "실제 지연은 가람의 재발주와 보라의 카운터 재지시가 동시에 적용되며 생긴 충돌",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "재발주와 카운터 재지시",
                  "neutral": "두 변경"
                },
                "time": {
                  "exact": "오픈 직전 하루",
                  "neutral": "그 하루"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-4:evidence:2",
              "factText": "현장일지와 추가견적서가 두 대표 지시를 별개의 지연 요인으로 분리 기록한 점",
              "tags": [
                "evidence",
                "harm",
                "timeline"
              ],
              "slots": {
                "item": {
                  "exact": "현장일지·추가견적서",
                  "neutral": "그 기록"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-4:admission:4",
              "factText": "한쪽의 월권만이 아니라 서로 다른 변경이 동시에 적용돼 지연이 커졌다는 인정",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 변경의 동시 적용",
                  "neutral": "그 충돌"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        }
      },
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "저는 혼선을 정리하려고 핵심만 요약한 겁니다.",
            "경쟁하는 최종안을 또 만든 건 아닙니다."
          ],
          "privateKnowledge": [
            "자신의 요약본이 실무자에겐 최종안처럼 읽혔다.",
            "e-3 단독으론 약하지만 e-5와 e-6이 흐름을 보강한다."
          ],
          "suppressions": [
            "자신 버전이 두 번째 권위가 된 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-5:denial:0",
              "factText": "자신은 혼선을 정리하는 요약만 보냈을 뿐 경쟁하는 최종안을 만든 것은 아니라는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "요약 메시지",
                  "neutral": "그 정리"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "누군가는 정리본을 보내야 했습니다.",
            "그걸 복수 최종안이라고 부르면 설명이 과장됩니다."
          ],
          "privateKnowledge": [
            "정리본과 수정 평면도가 사실상 최종안처럼 읽혔다.",
            "외부 협력업체에도 같은 톤으로 전달됐다."
          ],
          "suppressions": [
            "정리 행위가 권위 행위가 된 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-5:denial:0",
              "factText": "자신은 혼선을 정리하는 요약만 보냈을 뿐 경쟁하는 최종안을 만든 것은 아니라는 주장",
              "tags": [
                "denial",
                "self_justification",
                "act"
              ],
              "slots": {
                "item": {
                  "exact": "요약 메시지",
                  "neutral": "그 정리"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "partnership-06:b:d-5:act:1",
              "factText": "보라의 한 줄 요약과 수정 평면도가 직원과 협력업체에 최종안처럼 읽힌 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "한 줄 요약·수정 평면도",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "제 정리본이 직원들에겐 최종안처럼 읽혔을 수는 있습니다.",
            "그때는 혼선을 줄이려는 쪽에 더 신경이 갔습니다."
          ],
          "privateKnowledge": [
            "정리 의도가 결과를 지워 주진 않는다.",
            "자신의 메시지가 두 번째 최종안이 되었다."
          ],
          "suppressions": [
            "외부에도 같은 버전이 돌았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-5:act:1",
              "factText": "보라의 한 줄 요약과 수정 평면도가 직원과 협력업체에 최종안처럼 읽힌 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "한 줄 요약·수정 평면도",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-5:admission:4",
              "factText": "질서를 세우려던 건 맞지만 자신의 정리본이 또 다른 권위가 됐다는 자인",
              "tags": [
                "admission",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "reason": {
                  "exact": "혼선 정리",
                  "neutral": "그 의도"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "부매니저 캡처 하나만 보면 약하지만, 다른 기록까지 붙이면 서로 다른 최종안이 돈 건 부정하기 어렵습니다."
          ],
          "privateKnowledge": [
            "단톡 캡처는 약해도 관리소와 PM 기록이 보강한다.",
            "복수 최종안 흐름을 알고 있다."
          ],
          "suppressions": [
            "정리라는 명분"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-5:act:1",
              "factText": "보라의 한 줄 요약과 수정 평면도가 직원과 협력업체에 최종안처럼 읽힌 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "한 줄 요약·수정 평면도",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-5:harm:2",
              "factText": "직원과 시공팀이 서로 다른 일정표와 평면도를 동시에 참고하게 된 혼선",
              "tags": [
                "harm",
                "context",
                "relationship"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 일정표·평면도",
                  "neutral": "복수 버전"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-5:evidence:3",
              "factText": "부매니저 단톡 캡처는 약하지만 관리소 기록과 PM 일지까지 더하면 복수 최종안 흐름이 입증된다는 점",
              "tags": [
                "evidence",
                "privacy",
                "institution"
              ],
              "slots": {
                "item": {
                  "exact": "부매니저 단톡 캡처",
                  "neutral": "대화 캡처"
                },
                "institution": {
                  "exact": "관리소 기록·PM 일지",
                  "neutral": "다른 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "질서를 세우려고 보낸 한 줄이 오히려 또 다른 권위가 된 건 인정합니다.",
            "그 순간 저는 정리자라고 생각했지 가해자라고 생각하지 않았습니다."
          ],
          "privateKnowledge": [
            "혼선을 줄이려는 의도가 오히려 혼선을 추가했다.",
            "직원들이 두 대표를 동시에 최종 승인자로 봤다."
          ],
          "suppressions": [
            "자신을 단순 정리자로만 본 시선"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-5:harm:2",
              "factText": "직원과 시공팀이 서로 다른 일정표와 평면도를 동시에 참고하게 된 혼선",
              "tags": [
                "harm",
                "context",
                "relationship"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 일정표·평면도",
                  "neutral": "복수 버전"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-5:evidence:3",
              "factText": "부매니저 단톡 캡처는 약하지만 관리소 기록과 PM 일지까지 더하면 복수 최종안 흐름이 입증된다는 점",
              "tags": [
                "evidence",
                "privacy",
                "institution"
              ],
              "slots": {
                "item": {
                  "exact": "부매니저 단톡 캡처",
                  "neutral": "대화 캡처"
                },
                "institution": {
                  "exact": "관리소 기록·PM 일지",
                  "neutral": "다른 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-5:admission:4",
              "factText": "질서를 세우려던 건 맞지만 자신의 정리본이 또 다른 권위가 됐다는 자인",
              "tags": [
                "admission",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "reason": {
                  "exact": "혼선 정리",
                  "neutral": "그 의도"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 저는 제 정리본과 수정 평면도를 직원과 협력업체에 사실상 최종안처럼 보냈습니다.",
            "그 결과 사람들은 대표 둘의 서로 다른 최종안을 동시에 참고했습니다."
          ],
          "privateKnowledge": [
            "정리본이 곧 최종안처럼 읽히리라는 걸 알고 있었다.",
            "혼선을 한 줄 요약으로 덮으려 했다."
          ],
          "suppressions": [
            "초기의 요약 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-06:b:tell:category_split",
            "partnership-06:b:tell:scope_narrowing",
            "partnership-06:b:tell:clean_summary"
          ],
          "claimAtoms": [
            {
              "id": "partnership-06:b:d-5:act:1",
              "factText": "보라의 한 줄 요약과 수정 평면도가 직원과 협력업체에 최종안처럼 읽힌 사실",
              "tags": [
                "act",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "최보라",
                  "neutral": "본인",
                  "fullName": "최보라",
                  "judgeRef": "본인"
                },
                "item": {
                  "exact": "한 줄 요약·수정 평면도",
                  "neutral": "그 버전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-5:harm:2",
              "factText": "직원과 시공팀이 서로 다른 일정표와 평면도를 동시에 참고하게 된 혼선",
              "tags": [
                "harm",
                "context",
                "relationship"
              ],
              "slots": {
                "item": {
                  "exact": "서로 다른 일정표·평면도",
                  "neutral": "복수 버전"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "partnership-06:b:d-5:evidence:3",
              "factText": "부매니저 단톡 캡처는 약하지만 관리소 기록과 PM 일지까지 더하면 복수 최종안 흐름이 입증된다는 점",
              "tags": [
                "evidence",
                "privacy",
                "institution"
              ],
              "slots": {
                "item": {
                  "exact": "부매니저 단톡 캡처",
                  "neutral": "대화 캡처"
                },
                "institution": {
                  "exact": "관리소 기록·PM 일지",
                  "neutral": "다른 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "partnership-06:b:d-5:admission:4",
              "factText": "질서를 세우려던 건 맞지만 자신의 정리본이 또 다른 권위가 됐다는 자인",
              "tags": [
                "admission",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "reason": {
                  "exact": "혼선 정리",
                  "neutral": "그 의도"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        }
      }
    }
  }
} as const;


export const family04V2Atoms = {
  "caseId": "family-04",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "공동 폴더에 남은 잔액 화면과 민규 쪽 접근 사정을 보면, 3,200만원은 동생이 먼저 건드린 것처럼 보였습니다.",
            "그때 제게는 부모님이 장학재단으로 바로 보냈다는 설명이 전혀 전달되지 않았습니다."
          ],
          "privateKnowledge": [
            "민규의 2022년 차용금 기억 때문에 저는 같은 금액 변동을 더 위험하게 읽고 있었습니다.",
            "파일명이 '정리본' 류로 바뀌어 있던 점이 제 추정을 사실처럼 굳히게 했습니다."
          ],
          "suppressions": [
            "제가 부모님께 직접 기부 여부를 먼저 확인하지 않았다는 점",
            "원본 거래내역 전체를 확보하기 전에 결론부터 붙였다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-1:s0:atom0",
              "factText": "3,200만원이 빠진 직후 민규 쪽 접근 가능성이 먼저 눈에 들어왔다는 판단",
              "tags": [
                "act",
                "context",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-1:s0:atom1",
              "factText": "민규의 과거 차용금 기억이 의심의 기준선으로 작동했다는 내면 사정",
              "tags": [
                "motive",
                "fear",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "적어도 그 시점만 보면 동생이 설명 없이 접근했고, 저는 사라진 금액의 용처를 확인할 수 없었습니다.",
            "저는 횡령이라고 단정했다기보다, 가장 의심되는 방향을 먼저 좁힌 겁니다."
          ],
          "privateKnowledge": [
            "공동 폴더 맥락이 비어 있어도 저는 스스로 그 빈칸을 민규 쪽으로 채우고 있었습니다.",
            "부모 재산 정리에서 배제될 수 있다는 불안이 판단을 서두르게 했습니다."
          ],
          "suppressions": [
            "상대 계좌명이 보이는 은행 원본을 아직 보지 않았다는 점",
            "제 추정이 파일명과 과거 기억 위에 세워졌다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-1:s1:atom0",
              "factText": "'그 시점만 보면' 민규가 가장 의심스러웠다는 범위 축소형 주장",
              "tags": [
                "context",
                "uncertainty",
                "denial"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:a:d-1:s1:atom1",
              "factText": "부모 재산 정리에서 밀려날까 봐 빈칸을 최악의 방향으로 해석했다는 감정",
              "tags": [
                "fear",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "지금 보면 돈이 어디로 갔는지보다, 민규가 먼저 만든 폴더 맥락이 오해를 키운 건 맞습니다.",
            "다만 그 단계에서도 저는 형제 계좌가 아닌 제3의 용처 가능성을 충분히 열어두지 않았습니다."
          ],
          "privateKnowledge": [
            "모호한 파일명 변경 기록이 제 추정을 지지해 주는 증거처럼 느껴졌습니다.",
            "실제로는 '기부' 쪽 단서가 일부 남아 있었는데도 그 무게를 낮게 봤습니다."
          ],
          "suppressions": [
            "메모 단서가 불리하게 작게 보여도 완전히 사라진 건 아니었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:file_stack",
            "family04:a:tell:narrowed_answer"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-1:s2:atom0",
              "factText": "모호한 파일명 변경이 실제로 오해를 증폭시켰다는 중간 인정",
              "tags": [
                "evidence",
                "context",
                "admission"
              ],
              "slots": {
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                },
                "time": {
                  "dateExact": "잘린 캡처보다 2시간 전",
                  "period": "같은 날 이른 시각",
                  "neutral": "조금 앞선 시점"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-1:s2:atom1",
              "factText": "'향토장학기금' 단서를 보고도 다른 가능성을 충분히 검토하지 않았다는 부분 인정",
              "tags": [
                "evidence",
                "uncertainty",
                "responsibility"
              ],
              "slots": {
                "memo": {
                  "exact": "향토장학기금",
                  "neutral": "기부 목적 메모",
                  "judgeRef": "장학기금 메모"
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
            "돈이 민규 개인계좌로 간 증거는 없었는데, 저는 정황을 이어 횡령처럼 말했습니다.",
            "파일명 변경이 수상했던 것과 제가 결론을 앞세운 건 별개로 봐야 합니다."
          ],
          "privateKnowledge": [
            "부모님께 바로 묻지 않고 제가 먼저 판정을 내려버렸습니다.",
            "동생이 가까이 산다는 점과 예전 빚을 하나의 서사로 묶어버린 책임이 있습니다."
          ],
          "suppressions": [
            "제가 상대 계좌명 확인 전부터 사실상 범인을 정해 두었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-1:s3:atom0",
              "factText": "민규 개인계좌 유입 증거 없이도 횡령 서사를 만든 비약",
              "tags": [
                "responsibility",
                "admission",
                "harm"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                },
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
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
              "id": "family04:a:d-1:s3:atom1",
              "factText": "가까이 산 동생과 과거 차용금 기억을 한 줄로 엮어버린 책임",
              "tags": [
                "context",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "blame",
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
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "제가 과하게 반응한 건, 부모 재산 정리에서 욕심 많은 딸처럼 보일까 두려웠기 때문입니다.",
            "민규가 먼저 움직였다는 해석은 사실보다 제 불안을 반영한 면이 컸습니다."
          ],
          "privateKnowledge": [
            "문서를 오래 정리해 온 사람이 오히려 통제 욕구가 있는 사람처럼 보일까 무서웠습니다.",
            "그래서 의심과 결론을 거의 한 문장으로 붙여 말했습니다."
          ],
          "suppressions": [
            "제 공포가 판단을 얼마나 밀어 올렸는지",
            "부모님이 저를 신뢰하지 않을 수 있다는 감정"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-1:s4:atom0",
              "factText": "욕심 많은 딸로 보일까 봐 먼저 단정적인 언어를 꺼냈다는 감정 고백",
              "tags": [
                "emotion",
                "fear",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
              "id": "family04:a:d-1:s4:atom1",
              "factText": "의심과 결론을 거의 같은 문장으로 붙인 자기 방식에 대한 자각",
              "tags": [
                "self_justification",
                "admission",
                "quote"
              ],
              "slots": {},
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
            "3,200만원은 민규의 횡령이 아니라 부모님이 향토장학재단에 기부한 돈이었습니다.",
            "저는 잘린 자료와 모호한 파일명, 예전 기억을 붙여 동생을 범인처럼 몰았습니다."
          ],
          "privateKnowledge": [
            "부모님의 기부를 제가 더 일찍 확인할 수도 있었는데 그러지 않았습니다.",
            "오해의 발단은 있었어도 최종 단정은 제 책임으로 남습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-1:s5:atom0",
              "factText": "3,200만원의 실제 수취인이 형제가 아니라 향토장학재단이었다는 최종 시인",
              "tags": [
                "institution",
                "beneficiary",
                "admission",
                "act"
              ],
              "slots": {
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
                },
                "institution": {
                  "fullName": "향토장학재단",
                  "judgeRef": "장학재단",
                  "neutral": "외부 기관"
                },
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-1:s5:atom1",
              "factText": "잘린 자료와 과거 기억을 붙여 민규를 횡령범처럼 몰았다는 책임 인정",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
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
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "제가 민규에게 보낸 건 확인을 위한 잔액 화면이었지, 이체 메모를 숨기려는 조작은 아니었습니다.",
            "당시에는 잔액이 비어 있다는 사실 자체가 급했고, 화면 전체를 정리할 여유가 없었습니다."
          ],
          "privateKnowledge": [
            "원본 거래내역을 이미 확인했지만, 민규에게는 가장 자극적인 부분만 먼저 보냈습니다.",
            "제가 먼저 결론을 쥐고 있다는 인상을 주지 않으려 했지만 결과는 반대였습니다."
          ],
          "suppressions": [
            "잘라 저장한 기록이 연속으로 남아 있다는 점",
            "메모 상단에 '향토장학기금' 단서가 일부라도 보였다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family04:a:tell:narrowed_answer",
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-2:s0:atom0",
              "factText": "잔액 화면 공유는 확인용이었고 의도적 누락은 아니라는 전면 부인",
              "tags": [
                "act",
                "denial",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-2:s0:atom1",
              "factText": "급한 확인 때문에 전체 화면 대신 일부를 먼저 보냈다는 자기정당화",
              "tags": [
                "self_justification",
                "context",
                "motive"
              ],
              "slots": {
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "그 시점만 보면 잔액 확인이 우선이었고, 메모란은 아래까지 다 보이지 않는 상태였습니다.",
            "부분 캡처였다는 지적은 가능해도, 그걸 곧바로 악의로 읽는 건 과합니다."
          ],
          "privateKnowledge": [
            "범위를 좁혀 말하면 제가 본 원본의 무게를 덜어낼 수 있다고 생각했습니다.",
            "민규가 바로 감정적으로 반응할 걸 예상하고도 자극적인 화면을 골랐습니다."
          ],
          "suppressions": [
            "메모란이 완전히 사라진 게 아니라 크롭된 것이라는 점",
            "원본을 함께 보낼 선택지가 있었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-2:s1:atom0",
              "factText": "'그 시점만 보면' 메모보다 잔액이 먼저였다는 범위 축소형 해명",
              "tags": [
                "context",
                "uncertainty",
                "denial"
              ],
              "slots": {
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                },
                "memo": {
                  "exact": "향토장학기금",
                  "neutral": "기부 목적 메모",
                  "judgeRef": "장학기금 메모"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-2:s1:atom1",
              "factText": "부분 캡처를 보냈어도 악의적 조작으로 몰아가선 안 된다는 방어",
              "tags": [
                "counter",
                "denial",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "counter"
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
            "네, 잘린 캡처를 따로 저장해서 보낸 건 맞습니다.",
            "다만 그때 제 목적은 민규를 범인으로 확정하는 것보다, 이상 징후를 빨리 짚는 데 있었다고 생각했습니다."
          ],
          "privateKnowledge": [
            "잘라 저장한 기록이 여러 장 남아 있다는 걸 알고 있습니다.",
            "속도를 이유로 들지만 실제로는 제 판단에 맞는 화면을 골라낸 면이 있습니다."
          ],
          "suppressions": [
            "질문용이었다면서도 가장 의심을 키우는 프레임을 택했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:file_stack",
            "family04:a:tell:narrowed_answer"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-2:s2:atom0",
              "factText": "잘린 캡처를 별도로 저장해 보냈다는 사실 자체의 인정",
              "tags": [
                "act",
                "admission",
                "evidence"
              ],
              "slots": {
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
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
              "id": "family04:a:d-2:s2:atom1",
              "factText": "속도를 이유로 들지만 실제로는 판단에 맞는 화면을 골랐다는 부분 인정",
              "tags": [
                "motive",
                "self_justification",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "원본 거래내역을 보고도 잘린 화면을 먼저 보낸 건 제 선택이었습니다.",
            "하지만 그 선택은 민규가 기부 자료 파일명을 흐리게 바꿔 둔 상황 위에서 나온 겁니다."
          ],
          "privateKnowledge": [
            "저는 원본을 함께 보내면 제 의심이 약해질 걸 알고 있었습니다.",
            "그래서 사실 확인보다 해석 우위를 먼저 확보하려 했습니다."
          ],
          "suppressions": [
            "제가 원본 공개를 의도적으로 늦췄다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-2:s3:atom0",
              "factText": "원본을 보고도 잘린 화면만 먼저 공유한 선택",
              "tags": [
                "act",
                "admission",
                "responsibility"
              ],
              "slots": {
                "memo": {
                  "exact": "향토장학기금",
                  "neutral": "기부 목적 메모",
                  "judgeRef": "장학기금 메모"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
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
              "id": "family04:a:d-2:s3:atom1",
              "factText": "민규의 모호한 파일명 변경이 내 선택을 부추겼다는 책임 전가",
              "tags": [
                "context",
                "counter",
                "responsibility"
              ],
              "slots": {
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "제가 그 화면을 고른 건, 부모 재산 정리에서 제가 방심했다는 말을 듣기 싫어서였습니다.",
            "욕심 많은 딸처럼 보이지 않으려 했는데, 오히려 가장 공격적인 방식으로 움직였습니다."
          ],
          "privateKnowledge": [
            "문서를 다루는 사람이 먼저 허술했다는 평가를 받을까 봐 겁났습니다.",
            "그래서 메모가 보이는 원본보다 의심이 또렷한 장면을 택했습니다."
          ],
          "suppressions": [
            "제 체면 방어가 자료 선택 기준이 되었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-2:s4:atom0",
              "factText": "방심한 딸처럼 보이기 싫어서 공격적인 자료 선택을 했다는 감정 고백",
              "tags": [
                "fear",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
              "id": "family04:a:d-2:s4:atom1",
              "factText": "체면 방어가 원본 대신 크롭본을 택하게 한 결정 요인이었다는 자각",
              "tags": [
                "motive",
                "shame",
                "admission"
              ],
              "slots": {},
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
            "저는 이체 메모가 보이는 원본 거래내역을 이미 보고도, 민규에게는 잘린 잔액 캡처만 보냈습니다.",
            "그 선택이 민규의 횡령 의심을 키웠고, 부분 캡처 공유는 제 잘못이 맞습니다."
          ],
          "privateKnowledge": [
            "텍스트를 위조한 건 아니지만, 맥락을 잘라낸 것만으로 충분히 오도적이었습니다.",
            "원본을 함께 보냈다면 이 쟁점은 크게 줄어들었을 겁니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-2:s5:atom0",
              "factText": "원본을 보고도 잘린 잔액 캡처만 공유했다는 최종 시인",
              "tags": [
                "act",
                "admission",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
                },
                "memo": {
                  "exact": "향토장학기금",
                  "neutral": "기부 목적 메모",
                  "judgeRef": "장학기금 메모"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-2:s5:atom1",
              "factText": "부분 캡처 공유가 동생의 횡령 의심을 확대했다는 피해 결과 인정",
              "tags": [
                "harm",
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
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
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "인감과 등기 원본은 민규가 가져간 게 맞고, 저는 그 반출이 무단이었다고 봅니다.",
            "서류가 사라진 날 민규 동선 외에 설명 가능한 흐름이 거의 없었습니다."
          ],
          "privateKnowledge": [
            "민규가 가까이 산다는 점과 열쇠 접근성이 제 판단을 더 빠르게 만들었습니다.",
            "저는 이 반출을 곧바로 재산 선점 시도로 읽었습니다."
          ],
          "suppressions": [
            "제가 문서 통제를 강하게 해 온 탓에 민규가 불안을 느낄 여지도 있었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family04:a:tell:file_stack",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-3:s0:atom0",
              "factText": "민규가 인감·등기 원본을 집 밖으로 가져갔다는 초기 단정",
              "tags": [
                "act",
                "denial",
                "evidence"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-3:s0:atom1",
              "factText": "가까이 사는 동선과 접근성이 반출 판단을 밀어 올렸다는 배경",
              "tags": [
                "context",
                "timeline",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
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
            "적어도 그날 서류봉투가 집에서 빠져나갔고, 민규가 즉시 알리지 않은 건 분명합니다.",
            "보관 목적이었다고 해도 통지 없는 반출은 허용될 수 없는 방식입니다."
          ],
          "privateKnowledge": [
            "저는 '보관'이라는 해명보다 '먼저 챙겼다'는 신호에 더 민감했습니다.",
            "민규가 예전 빚 때문에 무언가를 미리 확보하려는 것 같다고 해석했습니다."
          ],
          "suppressions": [
            "보관 동기를 전혀 검토하지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer",
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-3:s1:atom0",
              "factText": "반출 자체보다 통지 없는 방식이 문제라는 제한적 정리",
              "tags": [
                "rule",
                "act",
                "responsibility"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-3:s1:atom1",
              "factText": "예전 빚 기억 때문에 '보관'보다 '선점'으로 읽었다는 내면 해석",
              "tags": [
                "motive",
                "fear",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
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
            "작업실 금고로 옮긴 사실이 확인되면, 민규가 최소한 무단 반출을 한 건 부정하기 어렵습니다.",
            "다만 그 목적이 곧바로 횡령은 아니었다는 점까지는 구분해서 봐야 합니다."
          ],
          "privateKnowledge": [
            "저도 반출 사실을 보자마자 횡령 쪽으로 너무 빨리 연결했습니다.",
            "증거가 말하는 건 '무단 반출'이지, 재산 이동 전체는 아니었습니다."
          ],
          "suppressions": [
            "반출과 횡령을 한 줄로 연결해 말해 온 제 습관"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-3:s2:atom0",
              "factText": "작업실 금고 보관이 확인되면 무단 반출 사실은 성립한다는 정리",
              "tags": [
                "evidence",
                "act",
                "admission"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                },
                "location": {
                  "exact": "민규 작업실 금고",
                  "neutral": "외부 보관 장소",
                  "judgeRef": "작업실 금고"
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
              "id": "family04:a:d-3:s2:atom1",
              "factText": "반출과 횡령은 분리해서 판단해야 한다는 중간 수정",
              "tags": [
                "rule",
                "threshold",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "민규가 사흘간 원본 반출 사실을 숨긴 건 잘못입니다.",
            "그와 별개로, 제가 문서 통제를 강하게 해 온 태도가 민규의 불안을 키운 부분도 있습니다."
          ],
          "privateKnowledge": [
            "저는 문서 기준을 제가 정해야 안전하다고 믿어 왔습니다.",
            "그게 민규에게는 '누나가 먼저 뭔가 할 수 있다'는 공포로 읽혔을 수 있습니다."
          ],
          "suppressions": [
            "제 통제 성향이 이 반출의 배경 중 하나라는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-3:s3:atom0",
              "factText": "사흘간 반출 사실을 알리지 않은 부분이 핵심 잘못이라는 정리",
              "tags": [
                "timeline",
                "responsibility",
                "act"
              ],
              "slots": {
                "time": {
                  "dateExact": "사흘간",
                  "period": "며칠 동안",
                  "neutral": "그 기간"
                },
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
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
              "id": "family04:a:d-3:s3:atom1",
              "factText": "내 문서 통제 성향이 민규의 불안을 자극했을 수 있다는 부분 인정",
              "tags": [
                "relationship",
                "context",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "blame",
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
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "제가 이 반출에 예민했던 건, 부모 재산 정리에서 제가 밀릴 수 있다는 공포가 컸기 때문입니다.",
            "민규의 행동이 잘못인 건 맞아도, 저는 그걸 곧바로 더 큰 선점 시도로 확대 해석했습니다."
          ],
          "privateKnowledge": [
            "문서를 오래 맡아 온 사람이 배제되면 모든 노력이 무너진다고 느꼈습니다.",
            "그래서 서류봉투 이동 하나에도 결론을 너무 크게 붙였습니다."
          ],
          "suppressions": [
            "제 배제 공포가 판단을 과장했다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-3:s4:atom0",
              "factText": "재산 정리에서 밀릴까 봐 반출을 더 큰 선점 시도로 읽었다는 공포",
              "tags": [
                "emotion",
                "fear",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
              "id": "family04:a:d-3:s4:atom1",
              "factText": "서류봉투 이동 하나에 과도한 결론을 덧붙였다는 자각",
              "tags": [
                "harm",
                "shame",
                "admission"
              ],
              "slots": {},
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
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "민규의 인감·등기 원본 무단 반출은 사실이고, 즉시 알리지 않은 점도 잘못입니다.",
            "다만 저는 그 잘못을 곧바로 횡령과 선처분 의도까지 연결해 과장했습니다."
          ],
          "privateKnowledge": [
            "반출 사실과 동기의 범위를 구분했어야 했습니다.",
            "제 불안이 그 구분을 무너뜨렸습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-3:s5:atom0",
              "factText": "민규의 무단 반출과 무통지가 사실이라는 최종 정리",
              "tags": [
                "act",
                "admission",
                "evidence"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                },
                "time": {
                  "dateExact": "사흘간",
                  "period": "며칠 동안",
                  "neutral": "그 기간"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-3:s5:atom1",
              "factText": "그 사실을 횡령 의도까지 곧장 확장한 내 과장을 함께 인정",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
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
            "저는 공동 폴더 원칙을 아예 어긴 게 아니라, 확인용 자료를 먼저 올린 겁니다.",
            "민규가 파일명을 먼저 흐리게 바꿔 둔 상태라 원본 구조가 이미 깔끔하지 않았습니다."
          ],
          "privateKnowledge": [
            "원칙대로라면 원본 스캔과 설명을 같이 올렸어야 한다는 걸 알고 있었습니다.",
            "하지만 그 순간에는 제 해석을 먼저 밀어 넣는 게 더 중요했습니다."
          ],
          "suppressions": [
            "제가 잘린 캡처만 올리고 설명을 비워 둔 점",
            "원본을 뒤로 미룬 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family04:a:tell:narrowed_answer",
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-4:s0:atom0",
              "factText": "공동 폴더에 확인용 자료를 먼저 올렸을 뿐 원칙 위반은 아니라는 부인",
              "tags": [
                "rule",
                "denial",
                "context"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-4:s0:atom1",
              "factText": "민규의 모호한 파일명 변경이 먼저 있었다는 선행 맥락 강조",
              "tags": [
                "context",
                "counter",
                "evidence"
              ],
              "slots": {
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                },
                "time": {
                  "dateExact": "잘린 캡처보다 2시간 전",
                  "period": "같은 날 이른 시각",
                  "neutral": "조금 앞선 시점"
                }
              },
              "stanceHints": [
                "counter",
                "deny"
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
            "그 시점만 보면 저는 잘린 화면을 올렸을 뿐이고, 나중에 원본을 더 붙이면 된다고 생각했습니다.",
            "공동 폴더 전체를 왜곡하려는 의도까지는 아니었습니다."
          ],
          "privateKnowledge": [
            "원칙 위반을 '임시 업로드'처럼 축소하면 방어가 쉬울 거라 생각했습니다.",
            "실제로는 설명 없는 부분 캡처가 가장 오해를 키우는 형식이었습니다."
          ],
          "suppressions": [
            "제가 오해 가능성을 알면서도 임시라고 합리화한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-4:s1:atom0",
              "factText": "잘린 화면 업로드를 임시 조치로 축소하는 해명",
              "tags": [
                "rule",
                "uncertainty",
                "denial"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:a:d-4:s1:atom1",
              "factText": "전체 왜곡 의도는 아니었다는 악의 부인",
              "tags": [
                "denial",
                "counter",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "네, 저는 공동 폴더에 원본 대신 잘린 캡처를 먼저 올렸고 설명도 충분히 달지 않았습니다.",
            "그 점은 원칙 위반으로 볼 수 있습니다."
          ],
          "privateKnowledge": [
            "원본을 같이 올리면 제 의심이 약해질 수 있어 미뤘습니다.",
            "민규 파일명이 이상하다는 점을 제 위반의 방패로 쓰고 있었습니다."
          ],
          "suppressions": [
            "원칙 위반을 인식하고도 그대로 갔다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-4:s2:atom0",
              "factText": "원본 대신 잘린 캡처를 먼저 올리고 설명을 비워 둔 사실 인정",
              "tags": [
                "rule",
                "act",
                "admission"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
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
              "id": "family04:a:d-4:s2:atom1",
              "factText": "원본 공개를 미뤄 의심의 우위를 유지하려 했다는 내면",
              "tags": [
                "motive",
                "shame",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
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
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "제 위반은 제 위반이고, 민규가 기부 자료 파일명을 '정리본'처럼 바꾼 것도 별도의 위반입니다.",
            "저는 잘린 캡처를 올렸고, 민규는 파일 맥락 자체를 흐렸습니다."
          ],
          "privateKnowledge": [
            "서로 다른 방식으로 같은 규칙을 무너뜨렸다는 걸 압니다.",
            "다만 저는 아직도 민규의 선행 위반을 더 크게 느끼고 있습니다."
          ],
          "suppressions": [
            "제 잘못을 상대의 선행 잘못 뒤로 숨기려는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-4:s3:atom0",
              "factText": "잘린 캡처 업로드와 모호한 파일명 변경이 서로 다른 형태의 동시 위반이라는 정리",
              "tags": [
                "rule",
                "counter",
                "responsibility"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-4:s3:atom1",
              "factText": "상대의 선행 위반을 내 방패로 계속 쓰고 있다는 자각",
              "tags": [
                "shame",
                "admission",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
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
            "공동 폴더 원칙을 가장 먼저 무너뜨린 건 제 불안이었습니다.",
            "원본을 올리면 제 판단이 약해질까 봐, 저는 의심에 맞는 자료 형식을 택했습니다."
          ],
          "privateKnowledge": [
            "문서를 정리하는 사람으로서 통제권을 놓치기 싫었습니다.",
            "그래서 규칙보다 제 해석을 먼저 폴더 안에 심어 두려 했습니다."
          ],
          "suppressions": [
            "통제 욕구가 규칙보다 앞섰다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-4:s4:atom0",
              "factText": "원본이 내 판단을 약하게 만들까 봐 규칙보다 해석을 앞세웠다는 고백",
              "tags": [
                "emotion",
                "fear",
                "motive"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
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
              "id": "family04:a:d-4:s4:atom1",
              "factText": "통제권 유지 욕구가 공동 폴더 원칙을 밀어냈다는 자각",
              "tags": [
                "relationship",
                "shame",
                "admission"
              ],
              "slots": {},
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
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "공동 폴더 원칙은 저도 어겼습니다.",
            "원본 스캔과 설명 대신 잘린 캡처를 먼저 올린 건 제 책임이고, 민규의 모호한 파일명과 함께 오해를 키웠습니다."
          ],
          "privateKnowledge": [
            "제가 원칙 위반을 선명하게 인정해야 이 쟁점이 정리됩니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-4:s5:atom0",
              "factText": "원본 대신 잘린 캡처를 올린 공동 폴더 원칙 위반의 최종 시인",
              "tags": [
                "rule",
                "act",
                "admission"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-4:s5:atom1",
              "factText": "내 위반과 민규의 모호한 파일명이 함께 오해를 키웠다는 공동 책임 인정",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                }
              },
              "stanceHints": [
                "confess",
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
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "저는 부모님 앞에서 민규를 횡령범으로 단정했다기보다, 법적으로 어떤 대응이 가능한지 미리 알아본 겁니다.",
            "세무 지인 문의도 확인 절차의 일부였지, 외부로 의심을 퍼뜨리려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "문의 문구가 이미 민규를 전제로 깔고 있었던 걸 압니다.",
            "부모님보다 외부 지인에게 먼저 물은 건 저 스스로도 방어적이라는 걸 알고 있었습니다."
          ],
          "suppressions": [
            "세무 지인에게 '가족 간 증여 회수'를 먼저 물었다는 점",
            "부모님 사실 확인 전에 민규 책임을 전제로 두었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-5:s0:atom0",
              "factText": "외부 문의는 확인 절차였을 뿐 횡령 단정은 아니었다는 부인",
              "tags": [
                "act",
                "denial",
                "self_justification"
              ],
              "slots": {
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:a:d-5:s0:atom1",
              "factText": "부모님보다 지인에게 먼저 묻고도 그 순서를 방어적으로 합리화한 상태",
              "tags": [
                "timeline",
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                },
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
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
            "그 시점만 보면 저는 법적 가능성을 물었을 뿐, 민규를 확정적으로 지목한 건 아니라고 생각했습니다.",
            "부모님 앞에서도 '혹시'라는 표현 안에서 말하려고 했습니다."
          ],
          "privateKnowledge": [
            "실제로는 '혹시'라는 말 뒤에 제 결론이 이미 붙어 있었습니다.",
            "질문 형식으로 말해도 내용은 거의 단정에 가까웠습니다."
          ],
          "suppressions": [
            "의심을 질문형으로 포장했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:a:tell:narrowed_answer"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-5:s1:atom0",
              "factText": "법적 가능성 문의였을 뿐 확정적 지목은 아니라는 범위 축소",
              "tags": [
                "uncertainty",
                "denial",
                "quote"
              ],
              "slots": {
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:a:d-5:s1:atom1",
              "factText": "질문형 표현으로 사실상 단정을 숨겼다는 내면",
              "tags": [
                "shame",
                "context",
                "admission"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "저는 민규가 예전 차용금을 아직 다 정리하지 못한 점이 떠올라, 혹시 같은 방식으로 돈을 움직인 건 아닌지 외부 조언을 구했습니다.",
            "그렇다고 해도 부모님보다 외부 지인에게 먼저 물은 순서는 변명하기 어렵습니다."
          ],
          "privateKnowledge": [
            "차용금 기억이 사실 확인보다 앞서 뛰었습니다.",
            "외부 문의는 제 불안을 합법성 언어로 포장한 면이 있습니다."
          ],
          "suppressions": [
            "제가 이미 민규를 염두에 두고 질문했다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:narrowed_answer",
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-5:s2:atom0",
              "factText": "예전 차용금 기억이 외부 문의의 직접 배경이었다는 설명",
              "tags": [
                "motive",
                "context",
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "family04:a:d-5:s2:atom1",
              "factText": "부모님 확인보다 외부 문의가 먼저였다는 절차상 잘못의 인정",
              "tags": [
                "timeline",
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                },
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "메시지 문구를 보면 제가 사실상 민규를 전제로 두고 세무 지인에게 물은 게 맞습니다.",
            "부모님 앞에서도 확인보다 의심을 먼저 꺼냈고, 그건 관계를 해치는 방식이었습니다."
          ],
          "privateKnowledge": [
            "의심을 법률 언어로 바꾸면 더 정당해 보일 거라 생각했습니다.",
            "제가 먼저 바깥 판단을 빌려 와 민규를 압박하려 했습니다."
          ],
          "suppressions": [
            "외부 권위를 빌려 의심을 굳히려 했다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-5:s3:atom0",
              "factText": "세무 지인 문의 문구가 이미 민규 책임을 전제로 했다는 인정",
              "tags": [
                "act",
                "admission",
                "evidence"
              ],
              "slots": {
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                },
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
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
              "id": "family04:a:d-5:s3:atom1",
              "factText": "부모님 앞 확인보다 의심을 먼저 꺼내 관계를 해쳤다는 책임",
              "tags": [
                "harm",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "partial",
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
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "제가 그렇게 먼저 물어본 건, 민규의 예전 빚이 다시 부모 재산을 건드리는 장면으로 이어질까 무서웠기 때문입니다.",
            "솔직히 부모님 앞에서조차 침착하게 묻기보다 먼저 막아야 한다는 마음이 앞섰습니다."
          ],
          "privateKnowledge": [
            "동생을 보호하기보다 견제해야 한다는 마음이 이미 커져 있었습니다.",
            "비난보다 질문처럼 말하면 덜 잔인해 보일 거라고 생각했습니다."
          ],
          "suppressions": [
            "두려움이 외부 문의를 정당화하는 방패가 되었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:interpretive_lead"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-5:s4:atom0",
              "factText": "예전 빚 기억이 다시 반복될까 봐 먼저 막으려 했다는 공포 고백",
              "tags": [
                "emotion",
                "fear",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
              "id": "family04:a:d-5:s4:atom1",
              "factText": "비난을 질문처럼 포장해 덜 잔인해 보이려 했다는 자기 인식",
              "tags": [
                "shame",
                "quote",
                "admission"
              ],
              "slots": {},
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
            "저는 부모님께 사실을 먼저 확인하기 전에, 민규를 전제로 세무 지인에게 문의했고 부모님 앞에서도 횡령 의심을 먼저 꺼냈습니다.",
            "그 순서와 표현 모두 잘못이었고, 관계 유지를 핑계로 단정을 질문형으로만 감쌌을 뿐입니다."
          ],
          "privateKnowledge": [
            "저는 관계를 지키려 했다기보다, 제 불안을 합리적인 절차처럼 꾸몄습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:a:tell:file_stack"
          ],
          "claimAtoms": [
            {
              "id": "family04:a:d-5:s5:atom0",
              "factText": "부모님 확인 전 세무 지인 문의와 부모 앞 의심 제기를 한 최종 시인",
              "tags": [
                "act",
                "timeline",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                },
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:a:d-5:s5:atom1",
              "factText": "단정을 질문형으로 감싼 채 관계 유지 명분을 내세웠다는 책임 인정",
              "tags": [
                "relationship",
                "responsibility",
                "admission"
              ],
              "slots": {},
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
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
            "누나가 서류를 쥐고 움직이던 흐름이라, 3,200만원도 누나 쪽에서 먼저 처리한 것처럼 보였습니다.",
            "저는 돈을 가져간 사람이 아니라, 비어 있는 잔액을 보고 뒤늦게 놀란 쪽이었습니다."
          ],
          "privateKnowledge": [
            "공동 폴더 파일명을 제가 바꾼 적은 있어도, 그때는 그게 범행 은폐처럼 읽힐 줄 몰랐습니다.",
            "누나가 문서와 설명을 먼저 쥐고 있다는 느낌 때문에 늘 한 박자 늦는다고 생각했습니다."
          ],
          "suppressions": [
            "제가 파일명을 모호하게 정리해 오해의 틈을 만들었다는 점",
            "저도 부모님께 사실 확인보다 누나 의심을 먼저 키웠다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo",
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-1:s0:atom0",
              "factText": "문서를 먼저 다루던 누나가 돈도 먼저 움직였을 것 같다는 초기 판단",
              "tags": [
                "act",
                "context",
                "denial"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-1:s0:atom1",
              "factText": "늘 누나가 설명의 우위를 가진다고 느껴온 관계 불균형",
              "tags": [
                "relationship",
                "fear",
                "context"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
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
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "적어도 그때 화면만 보면 누나가 일부만 보여 준 상태였고, 저는 그 빈칸을 의심할 수밖에 없었습니다.",
            "제가 단정했다기보다, 누나가 먼저 알고 있는 걸 숨긴다고 본 겁니다."
          ],
          "privateKnowledge": [
            "과거 사업 빚 때문에 제가 의심받기 쉬운 걸 알았고, 그래서 더 빨리 맞받아쳤습니다.",
            "스크린샷 하나로도 누나가 주도권을 쥐었다는 느낌이 강했습니다."
          ],
          "suppressions": [
            "저도 증거보다 감정으로 빈칸을 채웠다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-1:s1:atom0",
              "factText": "부분 화면이 숨김으로 느껴져 의심이 강화됐다는 축소형 진술",
              "tags": [
                "context",
                "uncertainty",
                "denial"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-1:s1:atom1",
              "factText": "과거 사업 빚 때문에 내가 먼저 의심받을 걸 예상하고 방어적으로 반응했다는 심리",
              "tags": [
                "fear",
                "emotion",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "지금 보면 누나가 일부를 잘라 보낸 것도 문제였지만, 제가 파일명을 흐리게 바꾼 것도 같은 오해를 키웠습니다.",
            "돈의 실제 용처보다 서로가 상대를 먼저 의심하게 만드는 장치가 계속 겹쳤습니다."
          ],
          "privateKnowledge": [
            "기부 파일명을 '정리본'으로 바꾼 건 정리 습관이었지만, 결과적으로 설명을 지운 셈이 됐습니다.",
            "저도 그 시점에 제3자 기관 이체 가능성을 깊게 보지 않았습니다."
          ],
          "suppressions": [
            "모호한 파일명이 누나의 오해를 실질적으로 강화했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist",
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-1:s2:atom0",
              "factText": "기부 자료 파일명을 모호하게 바꿔 오해의 배경을 만든 사실",
              "tags": [
                "evidence",
                "context",
                "admission"
              ],
              "slots": {
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                },
                "time": {
                  "dateExact": "잘린 캡처보다 2시간 전",
                  "period": "같은 날 이른 시각",
                  "neutral": "조금 앞선 시점"
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
              "id": "family04:b:d-1:s2:atom1",
              "factText": "기관 이체 가능성을 충분히 보지 않고 누나 의심으로 바로 넘어간 판단",
              "tags": [
                "uncertainty",
                "responsibility",
                "motive"
              ],
              "slots": {
                "institution": {
                  "fullName": "향토장학재단",
                  "judgeRef": "장학재단",
                  "neutral": "외부 기관"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "누나가 돈을 가져갔다는 증거는 없었는데, 저는 서류 통제 이미지에 기대어 그렇게 몰아갔습니다.",
            "제가 만든 모호한 파일명은 실수였고, 그 위에 제 피해감정까지 얹었습니다."
          ],
          "privateKnowledge": [
            "가까이 산다는 이유로 늘 범인 후보가 되는 게 싫어서, 누나를 먼저 가리키는 쪽이 마음이 편했습니다.",
            "오래된 빚 이야기가 다시 나올까 봐 더 예민했습니다."
          ],
          "suppressions": [
            "제가 감정적으로 선제공격을 택했다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump",
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-1:s3:atom0",
              "factText": "서류 통제 이미지를 근거처럼 써서 누나를 횡령범으로 몰아간 비약",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-1:s3:atom1",
              "factText": "가까이 사는 사람으로 늘 의심받는다는 피해감정이 공격을 앞당겼다는 고백",
              "tags": [
                "emotion",
                "relationship",
                "fear"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "저는 늘 '가까이 사는 민규'부터 의심받는다고 느껴서, 이번에도 누나를 먼저 지목해야 버틸 수 있다고 생각했습니다.",
            "억울함이 커질수록 사실 확인보다 누나의 통제성을 먼저 공격했습니다."
          ],
          "privateKnowledge": [
            "예전 차용금이 다시 올라오면 제 말이 전부 약해질까 봐 겁났습니다.",
            "그래서 누나가 잘못한 부분을 증거 이상으로 키웠습니다."
          ],
          "suppressions": [
            "제가 먼저 상처받은 사람 자리에 서려 했다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-1:s4:atom0",
              "factText": "'가까이 산다'는 이유로 범인 취급받는다는 피해감정",
              "tags": [
                "emotion",
                "fear",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서민규",
                  "judgeRef": "동생",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-1:s4:atom1",
              "factText": "예전 차용금이 떠오를까 봐 누나 쪽 혐의를 더 크게 키웠다는 심리",
              "tags": [
                "fear",
                "motive",
                "self_justification"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
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
            "3,200만원은 누나나 제가 빼돌린 돈이 아니라 부모님이 향토장학재단에 낸 기부금이었습니다.",
            "저는 파일명 변경과 피해감정을 섞어 누나를 먼저 범인처럼 몰았습니다."
          ],
          "privateKnowledge": [
            "정리 습관이라고 넘긴 파일명 변경이 실제로는 중요한 설명을 지워버렸습니다.",
            "저도 부모님께 먼저 확인하지 않고 외부로 의심을 넓혔습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-1:s5:atom0",
              "factText": "3,200만원의 실제 목적지가 향토장학재단이었다는 최종 인정",
              "tags": [
                "institution",
                "beneficiary",
                "admission",
                "act"
              ],
              "slots": {
                "amount": {
                  "exact": "32,000,000원",
                  "rounded": "3,200만원",
                  "neutral": "해당 금액"
                },
                "institution": {
                  "fullName": "향토장학재단",
                  "judgeRef": "장학재단",
                  "neutral": "외부 기관"
                },
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-1:s5:atom1",
              "factText": "모호한 파일명과 피해감정으로 누나를 횡령범처럼 몰았다는 책임 인정",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                }
              },
              "stanceHints": [
                "confess",
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
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "누나가 보낸 화면은 누가 봐도 메모가 잘린 상태였고, 저는 그걸 의도적이라고 받아들였습니다.",
            "그 화면만으로도 누나가 저를 먼저 범인으로 몰려 한다는 느낌이 강했습니다."
          ],
          "privateKnowledge": [
            "저는 원본을 요구하기 전에 이미 누나의 의도를 악의 쪽으로 정해 두고 있었습니다.",
            "과거 빚 때문에 또 제가 도둑 취급받을까 봐 화면 하나에도 과민하게 반응했습니다."
          ],
          "suppressions": [
            "부분 캡처를 본 직후 제가 바로 감정적으로 튀어올랐다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo",
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-2:s0:atom0",
              "factText": "메모가 잘린 화면을 보고 의도적 누락으로 받아들였다는 초기 판단",
              "tags": [
                "act",
                "context",
                "counter"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-2:s0:atom1",
              "factText": "또 내가 도둑 취급받을까 봐 화면 하나에 과민해졌다는 심리",
              "tags": [
                "fear",
                "emotion",
                "relationship"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
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
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "적어도 누나가 보낸 자료가 오해를 부르기 쉬운 방식이었던 건 분명합니다.",
            "저는 누나가 전부를 숨겼다고까지는 몰라도, 최소한 저에게 불리한 프레임을 골랐다고 봤습니다."
          ],
          "privateKnowledge": [
            "원본을 먼저 받아 봤다면 제 확신은 조금 늦춰질 수도 있었습니다.",
            "하지만 저는 그런 절차보다 '또 나부터냐'는 감정을 앞세웠습니다."
          ],
          "suppressions": [
            "제가 증거 요구보다 감정 표현을 먼저 한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-2:s1:atom0",
              "factText": "누나가 내게 불리한 프레임의 자료를 골랐다고 보는 제한적 주장",
              "tags": [
                "context",
                "uncertainty",
                "counter"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-2:s1:atom1",
              "factText": "원본 요구보다 억울함 표현이 먼저 나갔다는 반응 패턴",
              "tags": [
                "emotion",
                "quote",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "원본을 확인해 보니 누나가 문구를 조작한 건 아니었습니다.",
            "그래도 메모가 안 보이게 잘라 보낸 건 맞고, 그 때문에 저는 잘못된 확신을 더 빨리 가졌습니다."
          ],
          "privateKnowledge": [
            "저는 원본이 나오기 전까지 누나가 일부러 숨긴다고 믿고 있었습니다.",
            "원본을 본 뒤에도 제 감정은 바로 식지 않았습니다."
          ],
          "suppressions": [
            "화면이 오도적이긴 했지만 제 추정도 과속이었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo",
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-2:s2:atom0",
              "factText": "원본 확인 결과 텍스트 위조는 아니었지만 크롭은 실제였다는 정리",
              "tags": [
                "evidence",
                "act",
                "admission"
              ],
              "slots": {
                "memo": {
                  "exact": "향토장학기금",
                  "neutral": "기부 목적 메모",
                  "judgeRef": "장학기금 메모"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
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
              "id": "family04:b:d-2:s2:atom1",
              "factText": "오도적인 화면이 내 확신을 너무 빨리 굳혔다는 인정",
              "tags": [
                "harm",
                "responsibility",
                "emotion"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
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
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "누나의 부분 캡처는 잘못이지만, 제가 그걸 붙잡고 바로 횡령이라고 달려간 것도 제 책임입니다.",
            "특히 제 과거 빚이 다시 언급될까 두려워서 더 예민하게 반응했습니다."
          ],
          "privateKnowledge": [
            "누나가 저를 미리 범인으로 만들었다는 이야기 속에 들어가면 제가 방어하기 쉬웠습니다.",
            "그래서 원본 확인보다 억울함 서사를 먼저 키웠습니다."
          ],
          "suppressions": [
            "부분 캡처와 제 감정 폭주가 서로를 밀어 올렸다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-2:s3:atom0",
              "factText": "부분 캡처를 횡령 확신으로 바로 연결한 내 과속 판단",
              "tags": [
                "responsibility",
                "admission",
                "harm"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-2:s3:atom1",
              "factText": "과거 빚이 다시 문제 될까 봐 더 과하게 억울함을 키웠다는 심리",
              "tags": [
                "fear",
                "emotion",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
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
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "누나가 저를 또 의심한다는 느낌 하나로, 저는 화면의 빈칸을 전부 공격의 증거로 읽었습니다.",
            "사실 확인보다 상처받은 사람 자리를 먼저 잡으려 했습니다."
          ],
          "privateKnowledge": [
            "부모 집 심부름을 계속한 사람이 도둑 취급받는다는 게 견디기 어려웠습니다.",
            "그래서 누나가 잘못한 지점만 크게 확대했습니다."
          ],
          "suppressions": [
            "억울함을 방어 수단으로 썼다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump",
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-2:s4:atom0",
              "factText": "화면의 빈칸을 전부 공격 신호로 읽은 피해감정",
              "tags": [
                "emotion",
                "relationship",
                "fear"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-2:s4:atom1",
              "factText": "상처받은 사람 자리를 선점하려고 누나의 잘못을 더 크게 부풀렸다는 자각",
              "tags": [
                "shame",
                "motive",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
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
            "누나가 메모가 잘린 캡처를 보낸 건 잘못이 맞습니다.",
            "다만 저는 그 화면 하나에 제 두려움과 억울함을 얹어, 누나를 바로 횡령 쪽으로 단정했습니다."
          ],
          "privateKnowledge": [
            "원본을 먼저 요구했으면 저도 덜 망가졌을 겁니다.",
            "누나의 부분 캡처와 제 감정적 비약이 함께 이 쟁점을 키웠습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-2:s5:atom0",
              "factText": "누나의 부분 캡처 공유가 실제 잘못이라는 최종 인정",
              "tags": [
                "act",
                "admission",
                "evidence"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-2:s5:atom1",
              "factText": "그 화면을 붙잡고 내가 횡령 확신을 키운 책임도 함께 인정",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
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
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "저는 원본을 훔쳐 간 게 아니라 잠깐 안전한 데 옮겨 둔 겁니다.",
            "누나가 먼저 뭘 진행할까 봐 불안했을 뿐, 제 걸 만들려는 의도는 없었습니다."
          ],
          "privateKnowledge": [
            "집에 두면 누나가 문서를 선점할 수 있다고 과하게 상상했습니다.",
            "반출 사실을 바로 말하면 더 큰 싸움이 날까 봐 일부러 미뤘습니다."
          ],
          "suppressions": [
            "서류봉투를 작업실 금고로 가져간 사실",
            "아무에게도 즉시 알리지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist",
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-3:s0:atom0",
              "factText": "원본 서류 반출이 아니라 잠깐의 안전 보관이었다는 전면 부인",
              "tags": [
                "act",
                "denial",
                "self_justification"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                },
                "location": {
                  "exact": "민규 작업실 금고",
                  "neutral": "외부 보관 장소",
                  "judgeRef": "작업실 금고"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-3:s0:atom1",
              "factText": "누나가 먼저 진행할까 봐 불안해서 움직였다는 동기 설명",
              "tags": [
                "motive",
                "fear",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
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
            "그날 집에 두는 것보다 제 금고가 안전하다고 판단했습니다.",
            "바로 알리진 못했지만, 숨기려 했다기보다는 싸움이 커질까 봐 미룬 겁니다."
          ],
          "privateKnowledge": [
            "통지를 미룬 순간부터 제 행동이 떳떳하지 않다는 걸 저도 알고 있었습니다.",
            "누나의 문서 통제에 대한 반감이 판단을 합리화해 줬습니다."
          ],
          "suppressions": [
            "사흘이나 지나도록 명확히 알리지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-3:s1:atom0",
              "factText": "집보다 금고가 안전하다고 본 자기 합리화",
              "tags": [
                "self_justification",
                "context",
                "rule"
              ],
              "slots": {
                "location": {
                  "exact": "민규 작업실 금고",
                  "neutral": "외부 보관 장소",
                  "judgeRef": "작업실 금고"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-3:s1:atom1",
              "factText": "통지를 미루면서도 떳떳하지 않다는 걸 알고 있었다는 내면",
              "tags": [
                "shame",
                "uncertainty",
                "admission"
              ],
              "slots": {
                "time": {
                  "dateExact": "사흘간",
                  "period": "며칠 동안",
                  "neutral": "그 기간"
                }
              },
              "stanceHints": [
                "hedge",
                "admission"
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
            "네, 제가 인감과 등기 원본을 작업실 금고로 옮긴 건 맞습니다.",
            "다만 그건 누나가 먼저 건드릴까 봐 겁이 나서 한 보관 행동이지, 제 이익을 위한 이동은 아니었습니다."
          ],
          "privateKnowledge": [
            "사실상 무단 반출이라는 표현을 피하기 어렵다는 걸 압니다.",
            "그날 바로 공유했어야 했는데 그러지 않았습니다."
          ],
          "suppressions": [
            "보관이라는 명분만으로 절차 위반이 없어지는 건 아니라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist",
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-3:s2:atom0",
              "factText": "인감·등기 원본을 작업실 금고로 옮긴 사실의 인정",
              "tags": [
                "act",
                "admission",
                "evidence"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                },
                "location": {
                  "exact": "민규 작업실 금고",
                  "neutral": "외부 보관 장소",
                  "judgeRef": "작업실 금고"
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
              "id": "family04:b:d-3:s2:atom1",
              "factText": "누나 선점 공포를 이유로 든 보관형 자기정당화",
              "tags": [
                "motive",
                "fear",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "제가 그 서류를 사흘간 제 작업실에 둔 건 절차상 명백히 잘못이었습니다.",
            "그래도 그 배경에는 누나가 문서를 혼자 정리해 버릴지 모른다는 불신이 있었습니다."
          ],
          "privateKnowledge": [
            "문서 통제를 빼앗기기 싫어서 저도 몰래 맞대응한 셈입니다.",
            "보관이었다는 말 뒤에 제 반감과 경쟁심이 섞여 있었습니다."
          ],
          "suppressions": [
            "반감과 경쟁심이 실제 행동 동기였다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump",
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-3:s3:atom0",
              "factText": "사흘간 무단 보관을 이어간 절차 위반의 인정",
              "tags": [
                "timeline",
                "responsibility",
                "admission"
              ],
              "slots": {
                "time": {
                  "dateExact": "사흘간",
                  "period": "며칠 동안",
                  "neutral": "그 기간"
                },
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
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
              "id": "family04:b:d-3:s3:atom1",
              "factText": "누나의 문서 통제 불신이 반출을 정당화해 준 배경",
              "tags": [
                "relationship",
                "context",
                "counter"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "저는 가까이 산다는 이유로 늘 의심받는다고 느껴서, 서류만큼은 제 손에 둬야 안심됐습니다.",
            "그 불안이 결국 무단 반출이라는 잘못으로 나온 겁니다."
          ],
          "privateKnowledge": [
            "예전 빚이 다시 문제 되면 누나 말이 더 먹힐 거라고 생각했습니다.",
            "그래서 원본을 손에 쥐고 있어야 제 몫이 사라지지 않는다고 느꼈습니다."
          ],
          "suppressions": [
            "불안이 아니라 통제 욕구도 있었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-3:s4:atom0",
              "factText": "원본을 손에 둬야 안심된다는 불안이 무단 반출로 번졌다는 고백",
              "tags": [
                "emotion",
                "fear",
                "admission"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
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
              "id": "family04:b:d-3:s4:atom1",
              "factText": "예전 빚 때문에 누나 말이 더 힘을 가질까 봐 서류 통제를 시도했다는 심리",
              "tags": [
                "fear",
                "motive",
                "relationship"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
                },
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
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
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "제가 인감과 등기 원본을 사흘간 작업실 금고에 무단 반출해 둔 건 사실입니다.",
            "보관 목적이었다고 해도 바로 알리지 않은 이상, 그건 절차 위반이고 제 잘못입니다."
          ],
          "privateKnowledge": [
            "누나를 못 믿는 감정이 절차를 무시하게 만들었습니다.",
            "상대가 먼저 할까 봐 제가 먼저 움켜쥔 셈입니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-3:s5:atom0",
              "factText": "인감·등기 원본을 사흘간 작업실 금고에 둔 무단 반출의 최종 시인",
              "tags": [
                "act",
                "admission",
                "responsibility"
              ],
              "slots": {
                "document": {
                  "exact": "인감과 부동산 등기 원본",
                  "neutral": "원본 서류",
                  "judgeRef": "인감·등기 원본"
                },
                "location": {
                  "exact": "민규 작업실 금고",
                  "neutral": "외부 보관 장소",
                  "judgeRef": "작업실 금고"
                },
                "time": {
                  "dateExact": "사흘간",
                  "period": "며칠 동안",
                  "neutral": "그 기간"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-3:s5:atom1",
              "factText": "누나 불신 때문에 절차를 무시하고 원본을 움켜쥐었다는 동기 인정",
              "tags": [
                "motive",
                "relationship",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
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
            "파일명을 정리한 건 보기 좋게 하려던 거지, 뭘 숨기려던 게 아닙니다.",
            "공동 폴더를 헷갈리게 만든 쪽은 오히려 누나가 올린 잘린 화면이 더 컸습니다."
          ],
          "privateKnowledge": [
            "설명란을 비워 둔 채 '정리본'처럼 바꾸면 정보가 흐려진다는 걸 아주 몰랐던 건 아닙니다.",
            "그래도 저는 누나 쪽 잘못이 더 커 보여 제 쪽은 사소하다고 밀어붙였습니다."
          ],
          "suppressions": [
            "기부 자료 파일명을 모호하게 바꿨다는 점",
            "설명란을 비워 둔 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo",
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-4:s0:atom0",
              "factText": "파일명 변경은 정리 목적일 뿐 은폐가 아니라는 부인",
              "tags": [
                "rule",
                "denial",
                "self_justification"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-4:s0:atom1",
              "factText": "공동 폴더 혼선의 주된 원인을 누나의 잘린 화면으로 돌리는 반격",
              "tags": [
                "counter",
                "context",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "time": {
                  "dateExact": "추궁 11분 전",
                  "period": "같은 날 오전",
                  "neutral": "그 직전"
                }
              },
              "stanceHints": [
                "counter",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "정리본 같은 이름은 임시 제목이었고, 나중에 설명을 달 생각이었습니다.",
            "원칙 위반이라고 해도 의도적 은폐와는 거리가 있습니다."
          ],
          "privateKnowledge": [
            "임시라고 말하면 제가 만든 모호함을 줄여 보일 수 있다고 생각했습니다.",
            "사실 그 순간에는 이름만 바꾸고 설명까지 챙길 마음이 없었습니다."
          ],
          "suppressions": [
            "설명을 나중에도 달지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-4:s1:atom0",
              "factText": "'정리본'이 임시 제목일 뿐이었다는 축소형 해명",
              "tags": [
                "uncertainty",
                "rule",
                "denial"
              ],
              "slots": {
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-4:s1:atom1",
              "factText": "의도적 은폐와는 다르다고 선을 긋는 방어",
              "tags": [
                "counter",
                "denial",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "네, 기부 자료 파일명을 '정리본'처럼 바꾸고 설명란도 비워 둔 건 맞습니다.",
            "그건 공동 폴더 원칙에 어긋났고, 누나가 오해할 여지를 준 행동이었습니다."
          ],
          "privateKnowledge": [
            "정리 습관이라는 말로 버텨도, 결과적으로 중요한 설명을 지운 셈입니다.",
            "누나가 잘린 화면을 올리기 전부터 폴더 맥락은 제가 흐려 놨습니다."
          ],
          "suppressions": [
            "내 위반이 선행했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist",
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-4:s2:atom0",
              "factText": "기부 자료 파일명을 모호하게 바꾸고 설명란을 비운 사실 인정",
              "tags": [
                "rule",
                "act",
                "admission"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                },
                "time": {
                  "dateExact": "잘린 캡처보다 2시간 전",
                  "period": "같은 날 이른 시각",
                  "neutral": "조금 앞선 시점"
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
              "id": "family04:b:d-4:s2:atom1",
              "factText": "내 선행 위반이 누나 오해의 바탕을 만들었다는 부분 인정",
              "tags": [
                "responsibility",
                "context",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "제가 파일명으로 맥락을 흐렸고, 누나는 잘린 캡처로 같은 폴더를 더 오도적으로 만들었습니다.",
            "즉, 이 규칙 위반은 한쪽만의 잘못으로 정리할 수 없습니다."
          ],
          "privateKnowledge": [
            "저는 누나 잘못을 키워 제 선행 위반의 무게를 줄이려 했습니다.",
            "그래도 폴더 첫 단추를 흐리게 만든 건 저였습니다."
          ],
          "suppressions": [
            "선행 위반의 주도성을 끝까지 완전히 인정하지 않으려는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:indignation_echo",
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-4:s3:atom0",
              "factText": "파일명 변경과 잘린 캡처가 함께 규칙을 무너뜨렸다는 공동 책임 정리",
              "tags": [
                "rule",
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-4:s3:atom1",
              "factText": "누나 잘못을 키워 내 선행 위반의 무게를 덜려 했다는 자각",
              "tags": [
                "shame",
                "admission",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
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
            "저는 공동 폴더가 누나 방식대로만 굴러가는 게 싫어서, 대충 아는 표현으로 파일명을 바꿔 버렸습니다.",
            "그 반감이 결국 규칙을 가볍게 보게 만들었습니다."
          ],
          "privateKnowledge": [
            "정리보다 '내가 완전히 끌려가진 않는다'는 표시를 하고 싶었습니다.",
            "설명란 공백도 사실은 무심함이 아니라 반감의 흔적이었습니다."
          ],
          "suppressions": [
            "반감과 경쟁심이 파일명 변경에 들어 있었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-4:s4:atom0",
              "factText": "누나 방식대로만 폴더가 굴러가는 게 싫어 모호한 이름을 택했다는 감정",
              "tags": [
                "emotion",
                "relationship",
                "motive"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
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
              "id": "family04:b:d-4:s4:atom1",
              "factText": "설명란 공백이 무심함이 아니라 반감의 흔적이었다는 고백",
              "tags": [
                "shame",
                "admission",
                "context"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
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
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "공동 폴더 원칙은 저도 어겼습니다.",
            "기부 자료 파일명을 '정리본'처럼 바꾸고 설명을 비워 둔 게 제 잘못이고, 누나의 잘린 캡처와 함께 오해를 키웠습니다."
          ],
          "privateKnowledge": [
            "정리 습관이라는 변명으로는 이 위반을 덮을 수 없습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-4:s5:atom0",
              "factText": "기부 자료를 모호한 파일명과 공백 설명으로 올린 공동 폴더 원칙 위반의 최종 시인",
              "tags": [
                "rule",
                "act",
                "admission"
              ],
              "slots": {
                "platform": {
                  "exact": "공동 폴더",
                  "neutral": "공유 공간",
                  "judgeRef": "공동 폴더"
                },
                "fileName": {
                  "exact": "정리본-2 / 보낸 것",
                  "neutral": "모호한 파일명",
                  "judgeRef": "'정리본' 류 이름"
                },
                "time": {
                  "dateExact": "잘린 캡처보다 2시간 전",
                  "period": "같은 날 이른 시각",
                  "neutral": "조금 앞선 시점"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-4:s5:atom1",
              "factText": "내 파일명 변경과 누나의 잘린 캡처가 함께 오해를 만들었다는 공동 책임 인정",
              "tags": [
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
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
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "저는 부동산 지인에게 누나가 먼저 뭔가 할 수 있는지 물어본 것뿐이지, 누나를 횡령범으로 퍼뜨린 건 아닙니다.",
            "부모님 앞에서도 답답해서 걱정을 말한 거지, 단정하려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "문의 내용이 사실상 누나 선처분을 전제로 깔고 있었다는 걸 압니다.",
            "먼저 억울한 사람 자리를 잡아야 제가 밀리지 않는다고 느꼈습니다."
          ],
          "suppressions": [
            "부모님 확인 전 외부 지인에게 먼저 물었다는 점",
            "누나 선처분 가능성을 기정사실처럼 다뤘다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo",
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-5:s0:atom0",
              "factText": "외부 문의는 재산 보호 차원일 뿐 누나를 퍼뜨린 건 아니라는 부인",
              "tags": [
                "act",
                "denial",
                "self_justification"
              ],
              "slots": {
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                },
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-5:s0:atom1",
              "factText": "부모님 앞 발언을 걱정 표출로 축소하는 방어",
              "tags": [
                "quote",
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
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
            "혹시 누나가 먼저 움직일 수 있는지 확인한 거지, 누나가 훔쳤다고 단정한 건 아니었습니다.",
            "그때는 제가 계속 의심받는 입장이라고 느껴서 대비를 서둘렀습니다."
          ],
          "privateKnowledge": [
            "질문 형식이어도 속뜻은 이미 누나 쪽을 향하고 있었습니다.",
            "또 나만 당할 수 없다는 마음이 컸습니다."
          ],
          "suppressions": [
            "질문 형식 뒤에 단정이 숨어 있었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-5:s1:atom0",
              "factText": "선처분 가능성 확인이었을 뿐 확정적 고발은 아니라는 범위 축소",
              "tags": [
                "uncertainty",
                "denial",
                "quote"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "family04:b:d-5:s1:atom1",
              "factText": "또 나만 당할 수 없다는 방어심리가 문의를 앞당겼다는 내면",
              "tags": [
                "fear",
                "emotion",
                "motive"
              ],
              "slots": {},
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "네, 저는 같은 날 오후 부동산 지인에게 누나가 선처분할 수 있는지 먼저 물었습니다.",
            "그건 부모님께 직접 확인하기 전이었고, 지금 보면 순서가 잘못됐습니다."
          ],
          "privateKnowledge": [
            "누나의 문서 통제와 잘린 화면이 제 질문을 더 공격적으로 만들었습니다.",
            "하지만 외부 문의를 먼저 한 건 결국 제 선택이었습니다."
          ],
          "suppressions": [
            "문의 문구가 중립적이지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family04:b:tell:martyr_checklist",
            "family04:b:tell:indignation_echo"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-5:s2:atom0",
              "factText": "부모님 확인 전 같은 날 오후 외부 지인에게 먼저 문의한 사실 인정",
              "tags": [
                "timeline",
                "act",
                "admission"
              ],
              "slots": {
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                },
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
              "id": "family04:b:d-5:s2:atom1",
              "factText": "문서 통제와 잘린 화면이 질문을 더 공격적으로 만들었지만 선택은 내 것이었다는 인정",
              "tags": [
                "context",
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "메시지와 통화 흐름을 보면 저는 누나가 먼저 움직일 수 있다는 전제를 깔고 밖에 물었습니다.",
            "부모님 앞에서도 그 의심을 사실 확인보다 먼저 꺼냈고, 그건 관계를 더 망가뜨린 방식이었습니다."
          ],
          "privateKnowledge": [
            "저는 늘 의심받는다고 느끼다 보니, 이번에는 먼저 의심하는 쪽으로 버텼습니다.",
            "바깥 사람 말을 빌리면 제 억울함이 더 정당해 보일 거라 생각했습니다."
          ],
          "suppressions": [
            "외부 권위를 이용해 의심을 굳히려 한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump",
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-5:s3:atom0",
              "factText": "외부 문의 문구가 누나 선처분 전제를 깔고 있었다는 인정",
              "tags": [
                "act",
                "admission",
                "evidence"
              ],
              "slots": {
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                },
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
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
              "id": "family04:b:d-5:s3:atom1",
              "factText": "사실 확인보다 의심을 먼저 꺼내 관계를 악화시켰다는 책임",
              "tags": [
                "relationship",
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
                }
              },
              "stanceHints": [
                "partial",
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
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "저는 가까이 산다는 이유로 또 제가 몰릴까 봐, 이번엔 누나를 먼저 의심해야 덜 무너질 것 같았습니다.",
            "그래서 부모님께 묻기보다 밖에서 먼저 확인받고 싶었습니다."
          ],
          "privateKnowledge": [
            "예전 빚 이야기가 겹치면 제 말이 또 밀릴 거라 생각했습니다.",
            "억울함을 앞세우면 절차가 뒤집혀도 괜찮다고 느꼈습니다."
          ],
          "suppressions": [
            "억울함이 외부 문의를 정당화하는 핑계가 되었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:injured_jump"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-5:s4:atom0",
              "factText": "또 내가 몰릴까 봐 누나를 먼저 의심해야 버틸 수 있었다는 고백",
              "tags": [
                "emotion",
                "fear",
                "relationship"
              ],
              "slots": {
                "person": {
                  "fullName": "서영복 부부",
                  "judgeRef": "부모님",
                  "neutral": "부모"
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
              "id": "family04:b:d-5:s4:atom1",
              "factText": "예전 빚 기억 때문에 억울함을 앞세우며 절차를 뒤집었다는 심리",
              "tags": [
                "fear",
                "motive",
                "shame"
              ],
              "slots": {
                "amount": {
                  "exact": "10,000,000원",
                  "rounded": "1,000만원",
                  "neutral": "예전 차용금"
                },
                "time": {
                  "dateExact": "2022년",
                  "period": "사업대금이 막혔던 때",
                  "neutral": "예전 그 시기"
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
            "저는 부모님께 먼저 사실을 확인하기 전에, 누나가 선처분할 수 있다는 전제로 부동산 지인에게 문의했고 부모님 앞에서도 의심을 먼저 꺼냈습니다.",
            "그건 억울함을 방패로 삼아 의심을 밖으로 확산한 제 잘못입니다."
          ],
          "privateKnowledge": [
            "제가 먼저 의심하는 쪽에 서야 덜 상처받는다고 믿었습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family04:b:tell:martyr_checklist"
          ],
          "claimAtoms": [
            {
              "id": "family04:b:d-5:s5:atom0",
              "factText": "부모님 확인 전 외부 문의와 부모 앞 의심 제기를 한 최종 시인",
              "tags": [
                "act",
                "timeline",
                "admission"
              ],
              "slots": {
                "institution": {
                  "fullName": "세무·부동산 지인",
                  "judgeRef": "외부 지인",
                  "neutral": "제3자"
                },
                "person": {
                  "fullName": "서하린",
                  "judgeRef": "누나",
                  "neutral": "상대"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "family04:b:d-5:s5:atom1",
              "factText": "억울함을 방패로 삼아 의심을 확산했다는 책임 인정",
              "tags": [
                "responsibility",
                "emotion",
                "admission"
              ],
              "slots": {},
              "stanceHints": [
                "confess",
                "emotional"
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
}

export const tenant09V2Atoms = {
  "caseId": "tenant-09",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "계약서에 적힌 보증금은 8천만원이었고, 저는 그 기준으로 정산을 요구한 겁니다.",
            "송금 구조가 복잡했던 건 맞지만 계약 자체를 제가 따로 비튼 건 아닙니다."
          ],
          "privateKnowledge": [
            "태윤 계좌로 실제로 들어간 돈은 6천만원뿐이고, 2천만원은 우석 측 계좌로 갔다는 걸 알고 있다.",
            "8천만원 숫자가 유지되면 이후 반환 협상과 정책자금 설명에 유리하다고 봤다."
          ],
          "suppressions": [
            "우석 측 계좌로 빠진 2천만원이 임대보증금으로 보관되지 않았다는 인식",
            "큰 보증금 숫자를 유지하려고 계약서 문구를 그대로 두기로 한 동기"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-1:denial:0",
              "factText": "계약서상 보증금 기준으로만 정산을 말했다는 사실",
              "tags": [
                "denial",
                "legacy_sentence"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "계약서상 보증금",
                  "rounded": "8천"
                },
                "final_time": {
                  "exact": "서명 직전",
                  "neutral": "마지막 시점",
                  "dateExact": "서명 직전",
                  "period": "최종 계약 직전"
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
              "id": "tenant09:a:d-1:timeline:1",
              "factText": "송금 구조가 복잡했을 뿐 자신이 구조를 설계한 것은 아니라는 주장",
              "tags": [
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "time": {
                  "exact": "같은 날 14분 차이",
                  "neutral": "그때",
                  "dateExact": "같은 날 14분 차이",
                  "period": "계약 당일"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "태윤 사장님 계좌와 우석 쪽 정리 계좌가 따로 움직인 건 맞지만, 당시엔 다 계약 정리 과정으로 이해했습니다.",
            "저는 총액만 맞으면 된다고 들었습니다."
          ],
          "privateKnowledge": [
            "2천만원이 보증금이 아니라 정리비 명목으로 빠진다는 설명을 들었다.",
            "그래도 최종 문서에는 8천만원을 남겨 두는 편이 자신에게 더 안전하다고 판단했다."
          ],
          "suppressions": [
            "2천만원이 실제 보증금 보관금이 아니라는 점을 알고도 묵인한 사실",
            "총액이 맞으면 된다는 말을 스스로 유리하게 해석한 경위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-1:uncertainty:2",
              "factText": "두 계좌가 따로 움직였지만 모두 계약 정리 과정이라고 받아들였다는 진술",
              "tags": [
                "uncertainty",
                "context"
              ],
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
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-1:context:3",
              "factText": "총액이 맞으면 된다고 우석 설명을 따랐다는 사실",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "계약서상 보증금",
                  "rounded": "8천"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justification"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "태윤 사장님 계좌로는 6천만원이 들어간 게 맞습니다.",
            "다만 나머지 2천만원도 저는 계약을 맞추기 위한 정리금처럼 이해했습니다."
          ],
          "privateKnowledge": [
            "실수령액이 6천만원뿐이라는 점이 나중에 분쟁이 되면 약점이 된다는 걸 알았다.",
            "그래서 2천만원 흐름은 우석이 정리한 별도 구조라고 밀어두려 했다."
          ],
          "suppressions": [
            "6천만원만 실제 보증금으로 인정될 수 있다는 위험 인식",
            "2천만원 흐름을 보증금과 분리해 보이도록 말한 전략"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-1:act:4",
              "factText": "태윤 계좌 실수령액이 6천만원뿐이었다는 사실",
              "tags": [
                "act",
                "evidence"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-1:evidence:5",
              "factText": "나머지 2천만원을 계약 정리금처럼 이해했다고 선을 긋는 진술",
              "tags": [
                "evidence",
                "self_justification"
              ],
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
              ],
              "usableInSubActions": [
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "솔직히 말하면 2천만원이 태윤 사장님 보증금 계좌로 안 들어간다는 건 알고 있었습니다.",
            "우석이 나중에 정리해도 계약서는 남으니 문제 없다고 해서 그 말을 탔습니다."
          ],
          "privateKnowledge": [
            "계약서 숫자와 실수령액 차이를 이용하면 반환 협상에서 우위를 잡을 수 있다고 계산했다.",
            "우석이 먼저 제안했더라도 자신이 이익을 보고 있었다는 점을 안다."
          ],
          "suppressions": [
            "계약서 문구가 훗날 협상 지렛대가 될 수 있다고 본 계산",
            "우석 제안을 그냥 들은 수준이 아니라 스스로도 편의성을 인정한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-1:responsibility:6",
              "factText": "2천만원이 태윤 보증금 계좌로 들어가지 않는다는 걸 알고도 따랐다는 사실",
              "tags": [
                "responsibility",
                "context"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-1:self_justification:7",
              "factText": "우석이 계약서는 남는다고 말해 안심했다는 진술",
              "tags": [
                "self_justification",
                "quote"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "계약서상 보증금",
                  "rounded": "8천"
                },
                "final_time": {
                  "exact": "서명 직전",
                  "neutral": "마지막 시점",
                  "dateExact": "서명 직전",
                  "period": "최종 계약 직전"
                }
              },
              "stanceHints": [
                "blame",
                "self_justification"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "가게가 무너지는 상황에서 가족 돈이랑 정책자금 설명까지 겹치니까, 저는 8천만원 숫자를 놓치기가 무서웠습니다.",
            "그래서 실제 흐름이 어긋나는 걸 알면서도 바로잡지 못했습니다."
          ],
          "privateKnowledge": [
            "큰 숫자가 있어야 실패한 점주로 보이지 않는다는 자존심도 작동했다.",
            "태윤에게 8천만원 전부가 그의 돈처럼 말하는 건 무리라는 걸 이미 알고 있었다."
          ],
          "suppressions": [
            "가족 투자금과 대출 압박이 판단을 흐린 감정적 배경",
            "8천만원 전액 반환 주장 자체가 과하다는 자기 인식"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-1:emotion:8",
              "factText": "가족 투자금과 정책자금 압박 때문에 8천만원 숫자를 붙들었다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "계약서상 보증금",
                  "rounded": "8천"
                },
                "time": {
                  "exact": "폐업 직전",
                  "neutral": "그 무렵",
                  "period": "폐업 직전"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-1:fear:9",
              "factText": "실제 흐름이 어긋난 걸 알면서도 숫자를 고치지 못했다는 고백",
              "tags": [
                "fear",
                "responsibility"
              ],
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
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "네, 태윤 사장님이 실제로 받은 보증금은 6천만원뿐이었습니다.",
            "저는 그걸 알면서도 우석과 만든 2천만원 구조를 숨긴 채 계약서상 8천만원 전체를 제 기준으로 붙잡고 있었습니다."
          ],
          "privateKnowledge": [
            "2천만원이 임대보증금이 아니라 우석 측에 남는 구조라는 점을 처음부터 이해하고 있었다.",
            "정책자금과 반환 협상에서 유리해지려는 욕심이 있었다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-1:admission:10",
              "factText": "태윤이 실제 받은 보증금은 6천만원뿐이었다는 인정",
              "tags": [
                "admission",
                "act"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-1:responsibility:11",
              "factText": "우석과 만든 2천만원 구조를 숨긴 채 8천만원 전체를 주장했다는 책임 인정",
              "tags": [
                "responsibility",
                "motive"
              ],
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
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "우석 씨와 공모해서 보증금을 부풀렸다는 표현은 과합니다.",
            "저는 필요한 서류 정리가 된다고 들었을 뿐, 누가 일부를 가져가는 구조까지 제가 짠 건 아닙니다."
          ],
          "privateKnowledge": [
            "정책자금 상담과 폐업 후 협상에서 큰 보증금 숫자가 유리하다고 판단했다.",
            "2천만원이 허위 정리비 구조로 처리된다는 설명을 받아들였다."
          ],
          "suppressions": [
            "큰 보증금 숫자를 유지하는 데 자신도 이익이 있었다는 점",
            "2천만원이 우석 측 수익으로 남는 구조를 알았다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-2:denial:0",
              "factText": "우석과 공모했다는 표현 자체를 부인하는 사실",
              "tags": [
                "denial",
                "counter"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "부풀린 보증금 액수",
                  "rounded": "8천"
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
              "id": "tenant09:a:d-2:legacy_sentence:1",
              "factText": "서류 정리만 믿었지 구조 설계에는 관여하지 않았다는 주장",
              "tags": [
                "legacy_sentence",
                "uncertainty"
              ],
              "slots": {
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
                },
                "institution": {
                  "exact": "소상공인정책자금 상담",
                  "neutral": "정책자금 상담",
                  "fullName": "문정인",
                  "judgeRef": "심사역"
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
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "정책자금 상담 때문에 계약서 숫자를 크게 두면 편하다는 얘기는 들었습니다.",
            "하지만 그걸 바로 공모라고 묶는 건 다릅니다."
          ],
          "privateKnowledge": [
            "우석과 나눈 대화에서 '나중 분쟁이 생겨도 계약서 기준이 남는다'는 표현까지 들었다.",
            "자신도 그 효과를 기대했다."
          ],
          "suppressions": [
            "계약서 기준이 남는다는 말을 듣고도 반대하지 않은 사실",
            "정책자금과 이후 분쟁을 함께 계산했다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-2:context:2",
              "factText": "정책자금 상담에 큰 숫자가 편하다는 말을 들었다는 사실",
              "tags": [
                "context",
                "motive"
              ],
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
                "hedge",
                "self_justification"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:a:d-2:uncertainty:3",
              "factText": "그 대화를 공모로 볼 수 있는지에 선을 긋는 진술",
              "tags": [
                "uncertainty",
                "counter"
              ],
              "slots": {
                "chat_time": {
                  "exact": "최종 계약 스캔 30분 전",
                  "neutral": "그 대화 시점",
                  "dateExact": "최종 계약 스캔 30분 전",
                  "period": "서명 직전"
                },
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "카카오톡에 큰 보증금 숫자가 정책자금에 낫다는 취지의 대화가 있는 건 맞습니다.",
            "다만 저는 그때도 2천만원이 결국 정리비처럼 처리될 거라고만 생각했습니다."
          ],
          "privateKnowledge": [
            "전체 대화 문맥에는 나중 분쟁에서 계약서 기준을 남긴다는 계산도 담겨 있다.",
            "공모라는 단어를 피하고 싶지만 실질적으로는 공동 이해관계였다."
          ],
          "suppressions": [
            "나중 분쟁에서도 8천만원 문구를 지렛대로 쓸 수 있다고 본 점",
            "공모의 시점이 최종 스캔 직전까지 이어졌다는 흐름"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-2:evidence:4",
              "factText": "정책자금에 큰 보증금 숫자가 낫다는 카카오톡 대화가 있다는 사실",
              "tags": [
                "evidence",
                "motive"
              ],
              "slots": {
                "chat_time": {
                  "exact": "최종 계약 스캔 30분 전",
                  "neutral": "그 대화 시점",
                  "dateExact": "최종 계약 스캔 30분 전",
                  "period": "서명 직전"
                },
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "부풀린 보증금 액수",
                  "rounded": "8천"
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-2:act:5",
              "factText": "2천만원을 정리비처럼 처리될 금액으로 이해했다는 진술",
              "tags": [
                "act",
                "self_justification"
              ],
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
                "partial",
                "blame"
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
            "네, 우석 씨와 저는 8천만원 숫자가 남아 있으면 서로 편해진다는 걸 알고 있었습니다.",
            "저는 가족 투자금 설명과 정책자금 상담 때문에, 우석은 2천만원을 별도 수익으로 처리할 수 있어서 그 구조를 밀었습니다."
          ],
          "privateKnowledge": [
            "자신이 단순 피동자가 아니라 이해관계의 한 축이었다는 사실을 인정하게 됐다.",
            "우석이 먼저 말을 꺼냈더라도 자신이 동의한 순간 공모가 성립했다."
          ],
          "suppressions": [
            "공모라는 단어 자체를 끝까지 피하고 싶은 마음",
            "2천만원이 우석 개인 카드대금 등 일반 수익으로 쓰인 정황"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-2:beneficiary:6",
              "factText": "8천만원 숫자가 남아 있으면 세라와 우석 모두 이익을 본다는 사실",
              "tags": [
                "beneficiary",
                "motive"
              ],
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
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:a:d-2:responsibility:7",
              "factText": "자신도 이해관계 때문에 그 구조에 동의했다는 책임 인정",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "institution": {
                  "exact": "소상공인정책자금 상담",
                  "neutral": "정책자금 상담",
                  "fullName": "문정인",
                  "judgeRef": "심사역"
                },
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
                }
              },
              "stanceHints": [
                "blame",
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
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "그때 저는 카페를 살려야 한다는 생각밖에 없었습니다.",
            "가족 돈도 들어가 있었고, 큰 보증금 숫자가 있어야 상담 자리에서 덜 초라해 보인다고 믿었습니다."
          ],
          "privateKnowledge": [
            "정책자금 심사와 가족 투자 설명에서 허위 구조가 들키면 더 수치스럽다는 डर/수치심이 있었다.",
            "우석이 책임을 더 져야 한다고 생각하면서도 자신이 먼저 말하지 않은 점을 안다."
          ],
          "suppressions": [
            "실패한 점주로 보일까 두려워 숫자를 키운 감정적 이유",
            "자신이 먼저 멈출 기회가 있었는데 놓친 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-2:emotion:8",
              "factText": "가게와 가족 투자금을 지키려는 압박이 공모 판단을 흐렸다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "institution": {
                  "exact": "소상공인정책자금 상담",
                  "neutral": "정책자금 상담",
                  "fullName": "문정인",
                  "judgeRef": "심사역"
                },
                "time": {
                  "exact": "가게 운영이 무너지던 시기",
                  "neutral": "그 시기",
                  "period": "폐업 압박기"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-2:shame:9",
              "factText": "큰 숫자가 있어야 덜 초라해 보인다고 믿었다는 고백",
              "tags": [
                "shame",
                "self_justification"
              ],
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
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 저는 우석과 상의해 실제보다 큰 8천만원 계약을 유지했고, 2천만원이 허위 정리비와 컨설팅비 명목으로 빠져나가는 구조를 알고도 이용했습니다.",
            "그건 정책자금 상담과 이후 협상에 유리하다고 봤기 때문입니다."
          ],
          "privateKnowledge": [
            "2천만원이 임대보증금이 아니라 우석 측 일반 수익으로 처리된다는 점을 이해하고 있었다.",
            "자신의 이익을 위해 허위 구조를 유지했다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-2:admission:10",
              "factText": "실제보다 큰 8천만원 계약을 우석과 유지했다는 인정",
              "tags": [
                "admission",
                "act"
              ],
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
              "id": "tenant09:a:d-2:institution:11",
              "factText": "2천만원이 허위 정리비와 컨설팅비 명목으로 처리됐다는 인정",
              "tags": [
                "institution",
                "responsibility"
              ],
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
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
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
            "다투는 항목이 있더라도, 최소한 바로 돌려줄 수 있는 보증금까지 한꺼번에 묶어 둘 이유는 없었습니다.",
            "태윤 사장님은 손실 얘기를 너무 길게 붙였습니다."
          ],
          "privateKnowledge": [
            "세라는 자신의 일부 미정산 항목이 있더라도 6천만원 전체를 오래 붙잡을 근거는 약하다고 본다.",
            "태윤이 공실손실과 세척비를 방패처럼 늘어놓는 패턴을 기억한다."
          ],
          "suppressions": [
            "자신의 마지막 월세 일부와 간판 철거비 문제",
            "초기에는 감정적으로 전액 반환만 요구했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-3:counter:0",
              "factText": "다투지 않는 금액까지 한꺼번에 묶어 둘 이유가 없었다는 주장",
              "tags": [
                "counter",
                "rule"
              ],
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
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-3:timeline:1",
              "factText": "태윤이 손실 항목을 길게 늘어놓으며 반환을 늦췄다는 사실",
              "tags": [
                "timeline",
                "harm"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
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
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "반환이 늦어질 수는 있어도, 적어도 기준이 되는 6천만원은 먼저 떼어서 얘기할 수 있었다고 봅니다.",
            "정산표에는 나중에 붙인 항목들이 너무 많았습니다."
          ],
          "privateKnowledge": [
            "세라는 정산표가 후작성 문서라는 인상을 강하게 받았다.",
            "다투지 않는 금액과 다투는 비용을 분리하지 않은 게 핵심 문제라고 본다."
          ],
          "suppressions": [
            "자신도 정산 압박 속에서 거칠게 통화한 부분",
            "초기에는 지연이 전부 악의라고 단정한 감정"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-3:rule:2",
              "factText": "다투지 않는 6천만원은 별도로 논의할 수 있었다는 사실",
              "tags": [
                "rule",
                "context"
              ],
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
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-3:harm:3",
              "factText": "정산표에 항목이 뒤늦게 덧붙여진 듯 보였다는 진술",
              "tags": [
                "harm",
                "evidence"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "실제로 반환은 명도 뒤 5주가 넘어서야 이뤄졌습니다.",
            "그 사이 태윤 사장님은 공실손실이니 에어컨 세척비니 하면서 다투지 않는 돈까지 같이 붙잡았습니다."
          ],
          "privateKnowledge": [
            "지연 사실과 항목 부풀리기는 원본 계좌기록과 정산표로 증명된다고 안다.",
            "자신의 미정산 항목은 있더라도 지연 폭을 정당화할 정도는 아니라고 본다."
          ],
          "suppressions": [
            "자신의 미납 월세 일부와 간판 철거비가 실제로 존재했다는 점",
            "전액 반환 주장만 반복했던 초반 태도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-3:evidence:4",
              "factText": "반환이 명도 뒤 5주 넘게 늦어졌다는 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
              "slots": {
                "delay": {
                  "exact": "명도 뒤 5주 넘게",
                  "neutral": "그 지연 기간",
                  "period": "반환 지연 기간"
                },
                "settlement": {
                  "exact": "정산표",
                  "neutral": "그 정산표"
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:a:d-3:harm:5",
              "factText": "공실손실과 세척비가 다투지 않는 돈까지 묶는 명분으로 쓰였다는 사실",
              "tags": [
                "harm",
                "counter"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
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
            "제가 끝까지 8천만원을 말하긴 했어도, 태윤 사장님은 적어도 자기 계좌로 받은 6천만원 기준 정산은 먼저 할 수 있었습니다.",
            "그 부분까지 미룬 건 정산이 아니라 압박이었습니다."
          ],
          "privateKnowledge": [
            "세라는 자신의 과장 주장과 태윤의 지연이 별개라는 점을 분리해서 본다.",
            "태윤이 '당장 못 준다'는 태도로 우위를 잡으려 했다고 느꼈다."
          ],
          "suppressions": [
            "자신도 분쟁 초반에는 감정적으로 몰아붙였다는 점",
            "자신의 일부 미정산이 논쟁의 빌미가 된 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-3:responsibility:6",
              "factText": "세라의 과장 주장과 별개로 태윤이 6천만원 기준 정산을 먼저 할 수 있었다는 사실",
              "tags": [
                "responsibility",
                "counter"
              ],
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
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-3:threshold:7",
              "factText": "반환 지연이 정산보다 압박으로 작동했다는 진술",
              "tags": [
                "threshold",
                "emotion"
              ],
              "slots": {
                "settlement": {
                  "exact": "정산표",
                  "neutral": "그 정산표"
                },
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                }
              },
              "stanceHints": [
                "blame",
                "emotional"
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
            "가게 접고 가족 돈 막아야 하는데, '조금만 더 보자'는 말로 몇 주씩 끌리니까 정말 바닥나는 기분이었습니다.",
            "그 시간은 숫자보다 더 아팠습니다."
          ],
          "privateKnowledge": [
            "세라는 반환 지연이 생활 압박과 실패감으로 직결됐다고 느낀다.",
            "태윤의 손실 호소가 사실 질문을 흐리는 연기처럼 들렸다."
          ],
          "suppressions": [
            "상대를 도둑처럼 몰아붙인 표현",
            "자신도 감정적으로 통화한 부분"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-3:emotion:8",
              "factText": "반환 지연이 생활 압박과 실패감으로 이어졌다는 사실",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "delay": {
                  "exact": "명도 뒤 5주 넘게",
                  "neutral": "그 지연 기간",
                  "period": "반환 지연 기간"
                },
                "received_amount": {
                  "exact": "6천만원",
                  "neutral": "다투지 않는 보증금",
                  "rounded": "6천"
                }
              },
              "stanceHints": [
                "emotional",
                "harm"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:a:d-3:fear:9",
              "factText": "몇 주씩 끌리는 동안 바닥나는 기분을 느꼈다는 진술",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "명도 뒤 5주 넘게",
                  "neutral": "그 지연 기간",
                  "period": "반환 지연 기간"
                },
                "settlement": {
                  "exact": "정산표",
                  "neutral": "그 정산표"
                }
              },
              "stanceHints": [
                "emotional",
                "hurt"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "사실관계로만 말하면, 태윤 사장님은 다투지 않는 6천만원 부분도 바로 떼어 반환하지 않았고, 공실손실과 에어컨 세척비를 넓게 잡아 5주 넘게 지연했습니다.",
            "제 쪽 미정산 항목이 일부 있었어도 그 지연 전체를 설명하진 못합니다."
          ],
          "privateKnowledge": [
            "이 쟁점에서는 자신의 피해 주장만으로 끝낼 수 없고 일부 미정산도 함께 인정해야 균형이 맞는다고 본다.",
            "핵심은 지연 책임과 실제 공제 항목을 분리하는 데 있다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-3:admission:10",
              "factText": "태윤이 다투지 않는 6천만원 부분도 바로 반환하지 않았다는 사실",
              "tags": [
                "admission",
                "timeline"
              ],
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
                "confess",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-3:rule:11",
              "factText": "세라의 일부 미정산과 태윤의 과도한 지연은 별도로 봐야 한다는 정리",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "confess",
                "balanced"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "월세나 간판 문제는 거의 정리된 상태였고, 태윤 사장님이 그걸 과장해서 붙인 겁니다.",
            "큰 미납처럼 말할 정도는 아닙니다."
          ],
          "privateKnowledge": [
            "마지막 월세 일부가 약정일보다 9일 늦었고 간판 철거비도 명도 뒤에 정산됐다는 걸 안다.",
            "금액이 크지 않다는 이유로 스스로 중요하지 않다고 밀어두었다."
          ],
          "suppressions": [
            "실제 미정산 항목이 존재했다는 점",
            "폐업 압박 때문에 정산 순서를 뒤로 미뤘다는 사정"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-4:denial:0",
              "factText": "월세와 간판 문제는 거의 정리됐다는 주장",
              "tags": [
                "denial",
                "counter"
              ],
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
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-4:counter:1",
              "factText": "태윤이 작은 비용을 부풀려 말한다는 반격",
              "tags": [
                "counter",
                "harm"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "정확히는 폐업 정리 막바지라 며칠 밀린 항목이 있었습니다.",
            "그래도 바로 메우려고 했고, 태윤 사장님이 말하는 식의 큰 체납은 아니었습니다."
          ],
          "privateKnowledge": [
            "월세 일부와 간판 철거비를 즉시 끝내지 못했다.",
            "다만 그것이 전체 보증금 지연의 주된 근거로 쓰일 정도는 아니라는 생각을 유지한다."
          ],
          "suppressions": [
            "9일 지연이라는 구체적인 시간",
            "간판 철거비가 명도 뒤에야 처리됐다는 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-4:uncertainty:2",
              "factText": "폐업 정리 막바지라 며칠 밀린 항목이 있었다는 진술",
              "tags": [
                "uncertainty",
                "context"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "rent_item": {
                  "exact": "마지막 월세 일부",
                  "neutral": "그 월세 일부"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-4:counter:3",
              "factText": "큰 체납은 아니라며 범위를 줄이는 주장",
              "tags": [
                "counter",
                "threshold"
              ],
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
                "hedge",
                "self_justification"
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
            "네, 마지막 월세 일부는 약정일보다 9일 늦게 냈습니다.",
            "간판 철거비도 명도 뒤에 정산됐습니다. 다만 규모가 크진 않았습니다."
          ],
          "privateKnowledge": [
            "실제 미정산 항목을 더는 부인하기 어렵다.",
            "정산을 미룬 이유가 자금 압박과 폐업 정리 혼선이었음을 말할 준비를 한다."
          ],
          "suppressions": [
            "당시 현금흐름이 거의 끊긴 상태였다는 사정",
            "정산 순서를 뒤로 미루면서도 '곧 끝낸다'고 반복한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-4:evidence:4",
              "factText": "마지막 월세 일부가 약정일보다 9일 늦었다는 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "rent_item": {
                  "exact": "마지막 월세 일부",
                  "neutral": "그 월세 일부"
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:a:d-4:act:5",
              "factText": "간판 철거비가 명도 뒤에 정산됐다는 사실",
              "tags": [
                "act",
                "context"
              ],
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
            "제가 정산을 미룬 건 맞지만, 그때는 가게가 무너지는 속도에 맞춰 돈을 돌릴 수가 없었습니다.",
            "태윤 사장님이 그 작은 항목을 전체 반환 지연의 핑계로 키운 것도 사실입니다."
          ],
          "privateKnowledge": [
            "폐업 압박을 이유로 들지만 그것이 면책은 아니라는 걸 안다.",
            "자신의 미정산이 상대의 지연 논리에 빌미를 줬다는 점을 인정한다."
          ],
          "suppressions": [
            "가게 운영 실패와 빚 압박이 판단을 흐린 감정",
            "미정산 사실을 초기에 지나치게 축소한 태도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-4:self_justification:6",
              "factText": "폐업 압박 때문에 정산을 미뤘다는 사실",
              "tags": [
                "self_justification",
                "emotion"
              ],
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
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant09:a:d-4:responsibility:7",
              "factText": "작은 항목이 상대 지연 논리에 빌미를 준 사실",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "폐업 직전에 통장에 남는 돈이 거의 없었습니다.",
            "그래서 마지막 월세 일부와 간판 철거비를 바로 못 끝냈고, 그걸 인정하는 게 너무 창피해서 계속 '거의 정리됐다'고 말했습니다."
          ],
          "privateKnowledge": [
            "실패한 점주로 보일까 두려워 실제 미정산을 축소했다.",
            "가족 투자금과 빚 압박이 부끄러움으로 연결됐다."
          ],
          "suppressions": [
            "정산을 못 끝낸 자신의 수치심",
            "실패를 인정하기 싫어 사실을 눌러 말한 감정"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-4:emotion:8",
              "factText": "폐업 직전 자금 압박 때문에 정산을 미뤘다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "time": {
                  "exact": "폐업 직전",
                  "neutral": "그때",
                  "period": "폐업 직전"
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
              "id": "tenant09:a:d-4:shame:9",
              "factText": "미정산을 인정하기 창피해서 거의 정리됐다고 말한 사실",
              "tags": [
                "shame",
                "admission"
              ],
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
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 마지막 월세 일부는 9일 늦었고, 외부 간판 철거비도 명도 뒤에야 정산했습니다.",
            "금액은 제한적이었지만 실제 미정산이 있었고, 저는 그걸 체면 때문에 축소했습니다."
          ],
          "privateKnowledge": [
            "정산이 제한적이었다는 점과 실제 미정산이 있었다는 점을 함께 인정한다.",
            "이 쟁점은 자신의 체면과 실패감이 거짓을 만들었다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-4:admission:10",
              "factText": "마지막 월세 일부와 간판 철거비가 실제로 미정산이었다는 인정",
              "tags": [
                "admission",
                "act"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-4:responsibility:11",
              "factText": "체면 때문에 제한적인 미정산을 축소했다는 책임 인정",
              "tags": [
                "responsibility",
                "shame"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
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
            "태윤 사장님은 마지막 계약서만 제대로 대조했어도 이 분쟁이 이렇게 커지진 않았습니다.",
            "자기 계좌에 들어온 금액하고 서류 숫자를 직접 맞춰봤어야 했습니다."
          ],
          "privateKnowledge": [
            "세라는 태윤이 서명 직전 세부 확인을 건너뛴 사실을 알고 있다.",
            "그 빈틈이 있었기에 우석과 자신이 만든 구조가 굳어졌다고 본다."
          ],
          "suppressions": [
            "자신도 그 빈틈을 이용했다는 점",
            "상대 탓만으로 끝낼 수 없다는 사실"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-5:counter:0",
              "factText": "태윤이 마지막 계약서와 입금액을 직접 대조했어야 했다는 주장",
              "tags": [
                "counter",
                "responsibility"
              ],
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
                }
              },
              "stanceHints": [
                "counter",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-5:rule:1",
              "factText": "실수령액과 서류 숫자를 맞춰보는 절차가 빠졌다는 사실",
              "tags": [
                "rule",
                "timeline"
              ],
              "slots": {
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                },
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "우석 씨가 수정본을 올린다고 말했더라도, 태윤 사장님이 마지막 출력본을 직접 봤다면 8천만원 줄은 눈에 띄었을 겁니다.",
            "그 확인을 남에게 넘긴 건 분명한 실수입니다."
          ],
          "privateKnowledge": [
            "세라는 태윤이 우석 말을 지나치게 믿었다고 본다.",
            "자신도 그 허술함을 계산에 넣었다."
          ],
          "suppressions": [
            "자신이 허술함을 알면서도 바로잡지 않은 점",
            "우석 제안 구조를 따라간 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-5:context:2",
              "factText": "수정본을 올린다는 말만 믿고 마지막 출력본을 직접 보지 않았다는 사실",
              "tags": [
                "context",
                "rule"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-5:timeline:3",
              "factText": "최종 8천만원 줄은 마지막 출력본에서 충분히 눈에 띄었다는 진술",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "final_amount": {
                  "exact": "8천만원",
                  "neutral": "최종본 보증금",
                  "rounded": "8천"
                },
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "초안은 6천만원이었고, 최종 스캔본은 8천만원으로 올라갔습니다.",
            "태윤 사장님은 통화 뒤 19분 후 올라간 최종본을 직접 대조하지 않았습니다."
          ],
          "privateKnowledge": [
            "세라는 증거 흐름상 태윤의 확인 소홀이 명백하다고 본다.",
            "상대의 허술함이 없었다면 자신의 허위 구조도 완성되기 어려웠다."
          ],
          "suppressions": [
            "자신이 그 허술함을 이용했다는 자백",
            "상대와 중개사 사이 오해를 방치한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-5:evidence:4",
              "factText": "초안 6천만원과 최종본 8천만원이 갈린 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
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
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:a:d-5:responsibility:5",
              "factText": "태윤이 통화 뒤 19분 후 올라간 최종본을 직접 대조하지 않았다는 사실",
              "tags": [
                "responsibility",
                "act"
              ],
              "slots": {
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
                },
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
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
            "저도 그 틈을 이용했지만, 태윤 사장님이 보증금 액수와 계좌 입금을 마지막에 한 번만 맞춰봤어도 8천만원 표기는 굳지 않았습니다.",
            "결국 자기 확인을 남에게 맡긴 겁니다."
          ],
          "privateKnowledge": [
            "세라는 자신의 가담과 태윤의 부주의가 동시에 작동했다고 본다.",
            "상대가 창피해서 이 부분을 더 세게 부인한다고 느낀다."
          ],
          "suppressions": [
            "자신이 일부 이용했다는 점 외에는 큰 숨김 없음",
            "상대의 수치심을 이용하고 싶다는 감정"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:timeline_lock",
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-5:responsibility:6",
              "factText": "세라의 가담과 별개로 태윤의 자기 확인 의무가 있었다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "final_amount": {
                  "exact": "8천만원",
                  "neutral": "최종본 보증금",
                  "rounded": "8천"
                },
                "draft_amount": {
                  "exact": "6천만원",
                  "neutral": "초안 보증금",
                  "rounded": "6천"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-5:shame:7",
              "factText": "자기 확인을 남에게 맡긴 일이 창피한 지점이라는 진술",
              "tags": [
                "shame",
                "identity"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                }
              },
              "stanceHints": [
                "blame",
                "emotion"
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
            "그날 태윤 사장님도 바빴겠죠. 공실이랑 세금 얘기를 계속했으니까요.",
            "그래도 그 급한 마음 때문에 마지막 줄을 안 본 건 결국 본인 책임입니다."
          ],
          "privateKnowledge": [
            "세라는 상대가 공실과 세금 부담 속에서 조급했다는 점을 안다.",
            "다만 그 사정을 이해해도 확인 소홀은 남는다고 본다."
          ],
          "suppressions": [
            "자신이 그 조급함을 이용한 점",
            "감정적으로 상대를 무능하게 보고 있다는 속내"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-5:emotion:8",
              "factText": "공실과 세금 부담이 확인 절차를 흐렸다는 사실",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
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
                "counter"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:a:d-5:rule:9",
              "factText": "급한 마음과 별개로 마지막 줄 확인 책임은 본인에게 있다는 정리",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "final_amount": {
                  "exact": "8천만원",
                  "neutral": "최종본 보증금",
                  "rounded": "8천"
                },
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                }
              },
              "stanceHints": [
                "admission",
                "counter"
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
            "사실관계로 정리하면, 태윤 사장님은 초안 6천만원과 최종본 8천만원을 마지막에 직접 대조하지 않았고, 그 틈을 우석이 이용했습니다.",
            "저도 그 빈틈을 이용했지만, 확인 소홀 자체는 분명히 태윤 사장님 책임입니다."
          ],
          "privateKnowledge": [
            "세라는 이 쟁점에서 자신의 가담과 상대의 확인 소홀을 함께 인정해야 정확하다고 본다.",
            "핵심은 최종본 검증 절차 부재다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:a:tell:receipt_stack",
            "tenant09:a:tell:flat_voice_press"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:a:d-5:admission:10",
              "factText": "초안 6천만원과 최종본 8천만원을 태윤이 직접 대조하지 않았다는 사실",
              "tags": [
                "admission",
                "evidence"
              ],
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
                }
              },
              "stanceHints": [
                "confess",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:a:d-5:rule:11",
              "factText": "최종본 검증 절차 부재가 분쟁의 틈이 됐다는 정리",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
                },
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                }
              },
              "stanceHints": [
                "confess",
                "balanced"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
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
            "저도 계약서에는 8천만원으로 알고 있었고, 그 기준으로 세입자를 들인 사람입니다.",
            "분할 송금이 있었다고 해서 제가 2천만원을 떼먹은 사람처럼 몰아가면 안 됩니다."
          ],
          "privateKnowledge": [
            "자기 계좌로 실제 들어온 돈이 6천만원뿐이라는 건 알고 있었다.",
            "하지만 계약서 8천만원 문구를 유지하면 자신의 책임을 늦출 수 있다고 생각했다."
          ],
          "suppressions": [
            "실수령액 6천만원과 계약서 8천만원의 차이를 이미 인지했다는 점",
            "2천만원 흐름을 확인하지 않은 자기 과실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-1:denial:0",
              "factText": "계약서 8천만원 기준으로 움직였다는 사실만 앞세우는 진술",
              "tags": [
                "denial",
                "legacy_sentence"
              ],
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
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-1:self_justification:1",
              "factText": "분할 송금이 있었다고 자신을 가해자로 몰 수는 없다는 주장",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
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
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "제 계좌에 먼저 들어온 건 6천만원이 맞습니다.",
            "하지만 우석이가 나머지도 정리된다고 해서 전체 구조가 8천으로 맞는 줄 알았습니다."
          ],
          "privateKnowledge": [
            "실제 입금이 6천만원에 그쳤는데도 최종 계약 문구를 직접 고치지 않았다.",
            "우석 설명을 믿는 척하면서도 문서 확인을 미뤘다."
          ],
          "suppressions": [
            "나머지 2천만원의 귀속을 끝까지 확인하지 않았다는 점",
            "6천만원만 받은 상태에서 계약서 8천만원을 유지한 모순"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-1:uncertainty:2",
              "factText": "자기 계좌 실수령액은 6천만원이지만 전체 구조는 8천으로 맞는 줄 알았다는 진술",
              "tags": [
                "uncertainty",
                "context"
              ],
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
                "hedge",
                "self_justification"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-1:context:3",
              "factText": "우석이 나머지를 정리한다고 말해 믿었다는 사실",
              "tags": [
                "context",
                "relationship"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "그 차액",
                  "rounded": "2천"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "네, 제 계좌로 실제 받은 돈은 6천만원뿐이었습니다.",
            "다만 그때는 우석이가 나머지 2천만원도 계약 정리 안에서 움직인다고 해서 깊게 따지지 못했습니다."
          ],
          "privateKnowledge": [
            "실수령액 6천만원이 기준이 되어야 할 수도 있다는 걸 느끼기 시작했다.",
            "동시에 자신이 그 차이를 바로 문제 삼지 않아 지금의 분쟁 틈을 만들었다는 점을 안다."
          ],
          "suppressions": [
            "실수령액 기준 정산을 바로 제시하지 않고 시간을 끈 점",
            "우석 말만 믿고 확인을 멈춘 자신감 부족"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-1:act:4",
              "factText": "자기 계좌 실수령액이 6천만원뿐이었다는 사실",
              "tags": [
                "act",
                "evidence"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-1:relationship:5",
              "factText": "우석이 나머지 2천만원을 정리한다고 해 깊게 따지지 못했다는 진술",
              "tags": [
                "relationship",
                "self_justification"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "그 차액",
                  "rounded": "2천"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
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
            "솔직히 말하면 저는 6천만원만 받은 상태에서 서류가 8천만원으로 굳는 걸 막지 못했습니다.",
            "우석이가 정리해 준다고 하니 그대로 믿고 넘긴 제 책임도 있습니다."
          ],
          "privateKnowledge": [
            "계약서 숫자와 실수령액 차이를 이용해 세라 요구를 눌러보려는 계산도 조금 있었다.",
            "하지만 근본적으로는 자기 확인을 안 한 부끄러움이 더 크다."
          ],
          "suppressions": [
            "분쟁 후에도 계약서 8천만원 문구를 방패로 오래 쓴 점",
            "자기 과실을 인정하면 허술한 건물주로 보일까 두려운 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-1:responsibility:6",
              "factText": "6천만원만 받은 상태에서 8천만원 문구가 굳는 걸 막지 못했다는 사실",
              "tags": [
                "responsibility",
                "admission"
              ],
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
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant09:b:d-1:shame:7",
              "factText": "우석 말을 믿고 넘긴 일이 자기 부주의였다는 진술",
              "tags": [
                "shame",
                "relationship"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "final_time": {
                  "exact": "서명 직전",
                  "neutral": "마지막 시점",
                  "dateExact": "서명 직전",
                  "period": "최종 계약 직전"
                }
              },
              "stanceHints": [
                "blame",
                "emotion"
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
            "그때는 공실도 세금도 한꺼번에 몰려 있었고, 저는 중개사가 정리해 준다는 말에 기대 버렸습니다.",
            "그래서 6천만원만 받은 걸 알고도 끝까지 종이를 다시 들여다보지 않았습니다."
          ],
          "privateKnowledge": [
            "자신이 숫자 관리를 제대로 못한 건물주로 보일까 두렵다.",
            "세라와 우석 둘 다에게 휘둘렸다는 피해의식으로 책임을 희석하고 싶다."
          ],
          "suppressions": [
            "허술한 관리자로 보일까 두려운 감정",
            "계약 검증을 안 한 부끄러움"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-1:emotion:8",
              "factText": "공실과 세금 압박 속에서 중개사 말에 기대 버렸다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "서명 당일",
                  "neutral": "그날",
                  "period": "서명 당일"
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
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-1:fear:9",
              "factText": "6천만원만 받은 걸 알고도 종이를 다시 보지 못했다는 고백",
              "tags": [
                "fear",
                "responsibility"
              ],
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
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 제가 실제로 받은 보증금은 6천만원뿐이었습니다.",
            "나머지 2천만원이 우석 쪽으로 빠진 걸 제대로 확인하지 않은 채 계약서 8천만원 문구를 방치했고, 그 모순을 뒤늦게 제 방패로도 썼습니다."
          ],
          "privateKnowledge": [
            "실수령액과 계약 문구 차이를 방치한 자기 책임을 인정한다.",
            "피해자처럼만 말해서는 이 쟁점을 설명할 수 없다는 걸 안다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-1:admission:10",
              "factText": "실제 수령 보증금이 6천만원뿐이었다는 인정",
              "tags": [
                "admission",
                "act"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-1:responsibility:11",
              "factText": "나머지 2천만원 흐름을 확인하지 않고 8천만원 문구를 방치했다는 책임 인정",
              "tags": [
                "responsibility",
                "relationship"
              ],
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
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 세라 씨랑 우석이가 뒤에서 무슨 얘길 했는지 모릅니다.",
            "다만 결과적으로 저만 종이 한 장 믿고 끼어든 셈이 됐죠."
          ],
          "privateKnowledge": [
            "직접 공모 장면을 본 적은 없지만 구조가 이상하다는 의심은 있었다.",
            "그 의심을 빨리 문제 삼지 않고 피해자 서사로 밀어붙였다."
          ],
          "suppressions": [
            "공모를 눈치챘을 수도 있다는 감각",
            "이상한 구조를 방치한 자기 소홀"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-2:denial:0",
              "factText": "세라와 우석의 뒤거래를 직접 알지 못한다는 주장",
              "tags": [
                "denial",
                "relationship"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "chat_time": {
                  "exact": "최종 계약 스캔 30분 전",
                  "neutral": "그 대화 시점",
                  "dateExact": "최종 계약 스캔 30분 전",
                  "period": "서명 직전"
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
              "id": "tenant09:b:d-2:self_justification:1",
              "factText": "자신은 종이만 믿고 끼어든 피해자라는 진술",
              "tags": [
                "self_justification",
                "identity"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "부풀린 보증금 액수",
                  "rounded": "8천"
                },
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
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
            "직접 들은 건 없지만, 2천만원이 제 계좌가 아니라 우석 쪽으로 갔다는 순간부터는 정상적인 보증금 구조가 아니라는 느낌은 있었습니다.",
            "그걸 제가 끝까지 못 파고든 겁니다."
          ],
          "privateKnowledge": [
            "공모 가능성을 의심했지만 건드리면 본인 확인 소홀도 드러날까 주저했다.",
            "우석을 추궁하기보다 세라에게 분노를 돌렸다."
          ],
          "suppressions": [
            "의심이 이미 있었다는 점",
            "확인 소홀과 수치심"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-2:context:2",
              "factText": "2천만원이 자기 계좌가 아닌 우석 쪽으로 간 순간부터 이상함을 느꼈다는 사실",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
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
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-2:responsibility:3",
              "factText": "이상한 구조를 끝까지 못 파고든 자신의 소홀",
              "tags": [
                "responsibility",
                "shame"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "부풀린 보증금 액수",
                  "rounded": "8천"
                },
                "chat_time": {
                  "exact": "최종 계약 스캔 30분 전",
                  "neutral": "그 대화 시점",
                  "dateExact": "최종 계약 스캔 30분 전",
                  "period": "서명 직전"
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
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "지금 증거를 보고 나면 세라 씨와 우석이가 8천만원 숫자를 서로에게 유리하게 유지한 건 맞아 보입니다.",
            "저는 그 구조를 몰랐다기보다, 의심하고도 제대로 끊지 못했습니다."
          ],
          "privateKnowledge": [
            "공모 정황을 인정하면 자기 확인 소홀도 함께 드러난다.",
            "그래서 피해자처럼만 말해 왔다."
          ],
          "suppressions": [
            "피해자 서사를 방패처럼 썼다는 점",
            "의심을 행동으로 옮기지 않은 이유"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-2:evidence:4",
              "factText": "세라와 우석이 8천만원 숫자를 서로에게 유리하게 유지한 정황이 보인다는 사실",
              "tags": [
                "evidence",
                "beneficiary"
              ],
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
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-2:shame:5",
              "factText": "의심하고도 끊지 못한 자신을 인정하는 진술",
              "tags": [
                "shame",
                "responsibility"
              ],
              "slots": {
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
                },
                "chat_time": {
                  "exact": "최종 계약 스캔 30분 전",
                  "neutral": "그 대화 시점",
                  "dateExact": "최종 계약 스캔 30분 전",
                  "period": "서명 직전"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "결국 두 사람 다 8천만원 숫자에서 이익을 봤다고 봅니다.",
            "세라는 상담과 협상에서, 우석은 2천만원을 수익처럼 가져가는 데요. 저는 그 사이에서 확인도 못 하고 끌려다녔습니다."
          ],
          "privateKnowledge": [
            "세라-우석 공모를 보는 동시에 자기 무능을 느낀다.",
            "그래서 더 크게 피해를 호소해 균형을 맞추고 싶다."
          ],
          "suppressions": [
            "피해를 과장해 자기 책임을 흐린 점",
            "공모를 일찍 끊지 못한 불안"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-2:beneficiary:6",
              "factText": "세라와 우석 모두 8천만원 숫자에서 이익을 봤다는 사실",
              "tags": [
                "beneficiary",
                "motive"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "부풀린 보증금 액수",
                  "rounded": "8천"
                },
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-2:identity:7",
              "factText": "자신은 그 사이에서 확인도 못 하고 끌려다녔다는 진술",
              "tags": [
                "identity",
                "emotion"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "institution": {
                  "exact": "소상공인정책자금 상담",
                  "neutral": "정책자금 상담",
                  "fullName": "문정인",
                  "judgeRef": "심사역"
                }
              },
              "stanceHints": [
                "blame",
                "emotion"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "가장 창피한 건, 제가 이상하다고 느끼고도 '중개사가 정리하겠지' 하고 넘긴 겁니다.",
            "그래서 두 사람이 짜고 움직였다는 느낌이 들어도 바로 못 끊었습니다."
          ],
          "privateKnowledge": [
            "피해자라고만 말하면 자기 부주의를 가릴 수 있다고 생각했다.",
            "속았다는 감정과 놓쳤다는 수치심이 함께 있다."
          ],
          "suppressions": [
            "자기 부주의를 가리려는 심리",
            "피해자 서사 과장"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-2:emotion:8",
              "factText": "이상하다고 느끼고도 중개사가 정리하겠지 하고 넘긴 사실",
              "tags": [
                "emotion",
                "shame"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "chat_time": {
                  "exact": "최종 계약 스캔 30분 전",
                  "neutral": "그 대화 시점",
                  "dateExact": "최종 계약 스캔 30분 전",
                  "period": "서명 직전"
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
              "id": "tenant09:b:d-2:fear:9",
              "factText": "공모 느낌이 들어도 바로 못 끊었다는 고백",
              "tags": [
                "fear",
                "relationship"
              ],
              "slots": {
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
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
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "직접 대화를 본 건 아니어도, 지금 남은 자료로 보면 세라 씨와 우석이는 8천만원 계약과 2천만원 정리비 구조를 서로 이익이 되게 유지했습니다.",
            "저는 그걸 초기에 끊지 못했고, 그래서 공모를 더 키운 주변 책임이 있습니다."
          ],
          "privateKnowledge": [
            "공모의 직접 당사자는 아니지만 방치 책임이 있다는 점을 인정한다.",
            "이 쟁점은 피해자감정만으로 설명되지 않는다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-2:admission:10",
              "factText": "세라와 우석이 8천만원 계약과 2천만원 정리비 구조를 이익되게 유지했다는 정리",
              "tags": [
                "admission",
                "beneficiary"
              ],
              "slots": {
                "contract_amount": {
                  "exact": "8천만원",
                  "neutral": "부풀린 보증금 액수",
                  "rounded": "8천"
                },
                "broker_amount": {
                  "exact": "2천만원",
                  "neutral": "허위 정리비 금액",
                  "rounded": "2천"
                }
              },
              "stanceHints": [
                "confess",
                "evidence"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-2:responsibility:11",
              "factText": "공모를 초기에 끊지 못한 주변 책임을 인정하는 사실",
              "tags": [
                "responsibility",
                "shame"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "institution": {
                  "exact": "소상공인정책자금 상담",
                  "neutral": "정책자금 상담",
                  "fullName": "문정인",
                  "judgeRef": "심사역"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
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
            "보증금은 정산이 끝나야 돌려주는 겁니다. 저는 항목이 남아 있어서 기다린 겁니다.",
            "저도 공실비와 세금까지 떠안은 사람인데, 마치 일부러 붙잡은 것처럼 말하면 곤란합니다."
          ],
          "privateKnowledge": [
            "다투지 않는 6천만원 부분도 따로 떼어 바로 돌려주지 않았다는 걸 안다.",
            "공실손실과 세척비를 크게 말하면 협상 우위를 잡을 수 있다고 생각했다."
          ],
          "suppressions": [
            "5주 넘게 반환을 지연한 기간",
            "공실손실과 세척비를 원본 근거 없이 크게 부풀린 부분"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-3:denial:0",
              "factText": "정산이 끝나야만 보증금을 돌려줄 수 있었다는 주장",
              "tags": [
                "denial",
                "rule"
              ],
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
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-3:self_justification:1",
              "factText": "공실비와 세금까지 떠안은 자신이 더 큰 피해자라는 진술",
              "tags": [
                "self_justification",
                "emotion"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
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
            "반환이 빨랐다고는 못 하겠지만, 미납 월세와 철거비, 시설 상태를 먼저 정리해야 했습니다.",
            "그 과정에서 금액을 넉넉하게 잡은 건 안전하게 보려던 겁니다."
          ],
          "privateKnowledge": [
            "안전하게 본다는 말로 사실상 과장 공제를 합리화했다.",
            "즉시 반환할 수 있는 범위를 분리하지 않은 건 자신의 선택이었다."
          ],
          "suppressions": [
            "다투지 않는 6천만원을 먼저 분리하지 않은 점",
            "정산표가 후작성 문서라는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-3:uncertainty:2",
              "factText": "반환이 늦었지만 먼저 정리할 항목이 있었다는 진술",
              "tags": [
                "uncertainty",
                "context"
              ],
              "slots": {
                "settlement": {
                  "exact": "정산표",
                  "neutral": "그 정산표"
                },
                "received_amount": {
                  "exact": "6천만원",
                  "neutral": "다투지 않는 보증금",
                  "rounded": "6천"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-3:context:3",
              "factText": "금액을 넉넉하게 잡은 건 안전하게 보려던 선택이라는 주장",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justification"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "네, 반환이 명도 뒤 5주를 넘긴 건 맞습니다.",
            "하지만 그때는 미납 월세와 철거비가 실제로 있었고, 저는 공실손실까지 한 번에 잡아야 한다고 생각했습니다."
          ],
          "privateKnowledge": [
            "실제 미정산은 제한적이었는데도 공실손실과 세척비를 과도하게 넣었다.",
            "다투지 않는 6천만원도 같이 붙잡아 둔 건 지나쳤다는 걸 안다."
          ],
          "suppressions": [
            "실제 미정산보다 과도하게 공실손실을 얹은 점",
            "다투지 않는 6천만원을 별도 반환하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-3:evidence:4",
              "factText": "반환이 명도 뒤 5주를 넘겼다는 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
              "slots": {
                "delay": {
                  "exact": "명도 뒤 5주 넘게",
                  "neutral": "그 지연 기간",
                  "period": "반환 지연 기간"
                },
                "settlement": {
                  "exact": "정산표",
                  "neutral": "그 정산표"
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-3:act:5",
              "factText": "미납 월세와 철거비 외에 공실손실까지 한 번에 잡으려 했다는 진술",
              "tags": [
                "act",
                "self_justification"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "지금 돌아보면, 다투지 않는 6천만원 부분은 먼저 떼어 반환할 수도 있었습니다.",
            "저는 제가 더 손해 봤다는 마음에 공실손실과 세척비를 너무 넓게 걸었습니다."
          ],
          "privateKnowledge": [
            "피해의식이 정산 기준을 흐렸다는 점을 인정한다.",
            "세라의 잘못을 이용해 자신의 지연을 정당화했다."
          ],
          "suppressions": [
            "상대를 압박하려고 시간을 끈 심리",
            "원본 견적 없는 항목을 크게 쓴 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-3:responsibility:6",
              "factText": "다투지 않는 6천만원 부분은 먼저 반환할 수도 있었다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
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
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-3:emotion:7",
              "factText": "자신이 더 손해 봤다는 마음에 공실손실과 세척비를 넓게 걸었다는 진술",
              "tags": [
                "emotion",
                "self_justification"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "blame",
                "emotion"
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
            "하... 그때는 공실로 비는 동안 나가는 돈이 너무 컸습니다.",
            "그래서 세라 씨가 제때 못 낸 항목을 보자마자, 저도 모르게 '내 손해를 여기서라도 메워야 한다'는 쪽으로 기울었습니다."
          ],
          "privateKnowledge": [
            "피해자처럼 말하는 습관이 자신의 과잉 공제를 가리는 방식이었음을 느낀다.",
            "분노와 불안이 반환 지연으로 이어졌다."
          ],
          "suppressions": [
            "과잉 공제를 스스로도 자각한 점",
            "정산보다 감정이 앞섰다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-3:emotion:8",
              "factText": "공실로 비는 동안 나가는 돈 압박이 컸다는 사실",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "delay": {
                  "exact": "명도 뒤 5주 넘게",
                  "neutral": "그 지연 기간",
                  "period": "반환 지연 기간"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-3:fear:9",
              "factText": "자기 손해를 여기서라도 메워야 한다는 쪽으로 기울었다는 고백",
              "tags": [
                "fear",
                "admission"
              ],
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
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 실제 미정산 항목은 있었지만, 저는 다투지 않는 6천만원 부분도 바로 나누어 돌려주지 않았고 반환을 5주 넘게 끌었습니다.",
            "공실손실과 에어컨 세척비도 근거보다 넓게 잡았습니다."
          ],
          "privateKnowledge": [
            "이 쟁점은 피해자 호소로 덮을 수 없는 자신의 지연 책임이다.",
            "실제 미정산과 과장 공제를 분리해야 한다는 걸 인정한다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-3:admission:10",
              "factText": "다투지 않는 6천만원 부분도 바로 반환하지 않고 5주 넘게 끌었다는 인정",
              "tags": [
                "admission",
                "timeline"
              ],
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
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-3:responsibility:11",
              "factText": "공실손실과 에어컨 세척비를 근거보다 넓게 잡았다는 책임 인정",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
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
            "세라 씨 쪽에 미납 월세랑 간판 철거비가 남아 있었던 건 사실입니다.",
            "제가 그걸 없는 말처럼 꾸민 건 아닙니다."
          ],
          "privateKnowledge": [
            "미정산 항목이 실제로 있었기 때문에 자신은 그 사실을 강하게 말한다.",
            "다만 그 항목이 전체 지연을 정당화할 만큼 크진 않았다는 것도 안다."
          ],
          "suppressions": [
            "그 항목이 제한적이었다는 점",
            "자신이 그걸 반환 지연 핑계로 키운 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-4:act:0",
              "factText": "세라 쪽에 미납 월세와 간판 철거비가 남아 있었다는 사실",
              "tags": [
                "act",
                "evidence"
              ],
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
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-4:denial:1",
              "factText": "그 항목을 꾸며낸 것은 아니라는 주장",
              "tags": [
                "denial",
                "counter"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "마지막 월세 일부가 9일 늦었고 간판 철거비도 명도 뒤에 들어왔습니다.",
            "작은 돈이라고 해도 건물주 입장에서는 확인이 필요했습니다."
          ],
          "privateKnowledge": [
            "증거상 구체적 지연 시점과 항목이 분명하다는 걸 안다.",
            "하지만 확인 필요와 반환 지연을 섞어 말해 왔다."
          ],
          "suppressions": [
            "지연과 공제를 함께 묶은 자신의 화법",
            "피해를 과장한 부분"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-4:timeline:2",
              "factText": "마지막 월세 일부가 9일 늦고 간판 철거비가 명도 뒤에 들어왔다는 사실",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-4:rule:3",
              "factText": "작은 돈이어도 건물주 입장에서는 확인이 필요했다는 진술",
              "tags": [
                "rule",
                "identity"
              ],
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
                "hedge",
                "self_justification"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "네, 세라 씨 쪽 미정산은 실제로 있었습니다. 마지막 월세 일부는 9일 늦었고 간판 철거비도 뒤늦게 정리됐습니다.",
            "다만 금액 자체는 제한적이었습니다."
          ],
          "privateKnowledge": [
            "이 쟁점만 놓고 보면 자신 말이 완전히 틀린 건 아니라고 본다.",
            "그러나 제한적이었다는 말을 자주 빼먹었다."
          ],
          "suppressions": [
            "제한적인 규모라는 점",
            "그 항목을 다른 손실과 한데 묶은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-4:evidence:4",
              "factText": "세라 쪽 미정산이 실제로 있었다는 사실",
              "tags": [
                "evidence",
                "act"
              ],
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
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-4:threshold:5",
              "factText": "금액 자체는 제한적이었다는 사실",
              "tags": [
                "threshold",
                "rule"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
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
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "저는 그 제한적인 미정산을 공실손실 같은 다른 문제와 한데 묶어 더 크게 말했습니다.",
            "세라 씨 잘못이 실제로 있었으니 그걸 제가 제 손해 전체를 말하는 입구로 쓴 겁니다."
          ],
          "privateKnowledge": [
            "미정산 사실을 과장된 총손실 서사로 연결했다는 점을 안다.",
            "피해자처럼 말할수록 상대 반박이 약해질 거라 봤다."
          ],
          "suppressions": [
            "자신의 전략적 과장",
            "피해자 연기의 계산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-4:responsibility:6",
              "factText": "제한적인 미정산을 공실손실 등 다른 문제와 한데 묶어 크게 말했다는 사실",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "rent_item": {
                  "exact": "마지막 월세 일부",
                  "neutral": "그 월세 일부"
                },
                "item_vacancy": {
                  "exact": "공실손실",
                  "neutral": "그 손실 항목"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-4:identity:7",
              "factText": "세라의 실제 잘못을 자기 손해 전체를 말하는 입구로 썼다는 진술",
              "tags": [
                "identity",
                "self_justification"
              ],
              "slots": {
                "sign_item": {
                  "exact": "외부 간판 철거비",
                  "neutral": "그 철거비"
                },
                "item_cleaning": {
                  "exact": "에어컨 세척비",
                  "neutral": "그 청소비"
                }
              },
              "stanceHints": [
                "blame",
                "emotion"
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
            "건물주 체면상 '작은 돈은 됐다'고 바로 말하기가 싫었습니다.",
            "그래서 실제로는 작은 항목이었는데도, 제 손해와 섞어 말하면서 더 크게 잡았습니다."
          ],
          "privateKnowledge": [
            "체면과 손실감이 합쳐져 작은 항목을 키웠다는 걸 인정한다.",
            "세라에게 휘둘린 건물주처럼 보이기 싫었다."
          ],
          "suppressions": [
            "허술하고 약한 건물주로 보일까 두려운 감정",
            "피해 서사 과장"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-4:shame:8",
              "factText": "작은 돈은 됐다고 바로 말하기 싫었다는 사실",
              "tags": [
                "shame",
                "identity"
              ],
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
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-4:emotion:9",
              "factText": "작은 항목을 자기 손해와 섞어 더 크게 잡았다는 고백",
              "tags": [
                "emotion",
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "사실관계로 보면 세라 씨 쪽 미정산은 실제로 있었습니다. 마지막 월세 일부는 9일 늦었고 간판 철거비도 명도 뒤에 정리됐습니다.",
            "다만 그건 제한적인 항목이었고, 저는 그걸 제 다른 손실과 섞어 더 크게 말했습니다."
          ],
          "privateKnowledge": [
            "이 쟁점에서는 세라의 실제 미정산과 자기 과장 화법을 함께 인정해야 한다.",
            "핵심은 제한적 공제와 과장 공제를 나누는 데 있다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-4:admission:10",
              "factText": "세라 쪽 미정산이 실제로 있었지만 제한적이었다는 정리",
              "tags": [
                "admission",
                "threshold"
              ],
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
                "evidence"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-4:responsibility:11",
              "factText": "그 제한적 항목을 다른 손실과 섞어 더 크게 말했다는 책임 인정",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "delay": {
                  "exact": "약정일보다 9일 뒤",
                  "neutral": "그 며칠 뒤",
                  "dateExact": "약정일보다 9일 뒤",
                  "period": "폐업 직전"
                },
                "handover": {
                  "exact": "명도 뒤",
                  "neutral": "그 이후",
                  "period": "명도 직후"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
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
            "최종 계약서는 중개사가 정리해서 가져온 거고, 저는 통상적인 확인은 다 했습니다.",
            "저를 무슨 서류도 못 보는 사람처럼 말하는 건 억울합니다."
          ],
          "privateKnowledge": [
            "보증금 액수와 실제 입금 내역을 마지막 출력본과 직접 대조하지 않았다.",
            "그 부끄러움을 감추려고 '통상적 확인'이라는 표현으로 뭉개고 있다."
          ],
          "suppressions": [
            "최종 계약서의 보증금 줄을 직접 확인하지 않은 사실",
            "우석에게 최종 검증을 떠넘긴 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-5:denial:0",
              "factText": "통상적인 확인은 다 했다는 주장",
              "tags": [
                "denial",
                "legacy_sentence"
              ],
              "slots": {
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                },
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
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
              "id": "tenant09:b:d-5:identity:1",
              "factText": "서류도 못 보는 사람처럼 말하는 건 억울하다는 반응",
              "tags": [
                "identity",
                "emotion"
              ],
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
                }
              },
              "stanceHints": [
                "deny",
                "emotion"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "6천만원으로 다시 맞춰 달라고는 분명히 말했습니다.",
            "그래서 우석이가 정리한 최종본도 그렇게 돼 있을 거라고 믿었습니다."
          ],
          "privateKnowledge": [
            "말로만 수정 요청하고 마지막 종이를 눈으로 확인하지 않았다.",
            "바쁜 날이었다는 이유로 자기 확인을 생략했다."
          ],
          "suppressions": [
            "수정 요청 뒤 최종본 대조를 하지 않은 점",
            "서명과 날인을 서두른 사정"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-5:context:2",
              "factText": "6천만원으로 다시 맞춰 달라고 말한 사실",
              "tags": [
                "context",
                "quote"
              ],
              "slots": {
                "draft_amount": {
                  "exact": "6천만원",
                  "neutral": "초안 보증금",
                  "rounded": "6천"
                },
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justification"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-5:uncertainty:3",
              "factText": "우석이 정리한 최종본도 그렇게 돼 있을 거라고 믿었다는 진술",
              "tags": [
                "uncertainty",
                "relationship"
              ],
              "slots": {
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                },
                "final_amount": {
                  "exact": "8천만원",
                  "neutral": "최종본 보증금",
                  "rounded": "8천"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
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
            "초안이 6천만원이었다는 건 압니다.",
            "그런데 최종 스캔본이 8천만원으로 올라간 걸 저는 그 자리에서 직접 못 봤습니다. 아니, 안 봤다고 해야 맞겠네요."
          ],
          "privateKnowledge": [
            "직접 못 봤다는 말보다 안 봤다는 말이 더 정확하다는 자각이 생긴다.",
            "자기 확인 소홀이 분쟁의 핵심 고리라는 걸 인정하기 시작한다."
          ],
          "suppressions": [
            "통화 뒤 19분 후 업로드된 최종본을 확인할 기회가 있었다는 점",
            "확인하지 않은 것이 단순 실수 이상이라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-5:evidence:4",
              "factText": "초안은 6천만원이고 최종 스캔본은 8천만원이었다는 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
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
                }
              },
              "stanceHints": [
                "partial",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant09:b:d-5:responsibility:5",
              "factText": "최종 8천만원본을 그 자리에서 직접 보지 않았다는 사실",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
                },
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "통화 뒤 바로 올라간 파일을 제가 한 번만 열어봤어도 됐습니다.",
            "결국 우석 말을 믿고 마지막 확인을 남에게 넘긴 거죠."
          ],
          "privateKnowledge": [
            "이 상태는 사실상 시인 직전이며, 부주의가 핵심이라는 걸 안다.",
            "피해자처럼만 말하던 태도를 계속 유지하기 어렵다."
          ],
          "suppressions": [
            "상대에게 허술한 건물주로 보일까 두려운 감정",
            "분쟁 후에도 이 책임을 축소해 말한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:cost_scatter",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-5:responsibility:6",
              "factText": "통화 뒤 바로 올라간 파일을 한 번만 열어봤어도 됐다는 사실",
              "tags": [
                "responsibility",
                "timeline"
              ],
              "slots": {
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
                },
                "doc_final": {
                  "exact": "최종 스캔본",
                  "neutral": "그 최종본"
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
              "id": "tenant09:b:d-5:relationship:7",
              "factText": "우석 말을 믿고 마지막 확인을 남에게 넘겼다는 진술",
              "tags": [
                "relationship",
                "shame"
              ],
              "slots": {
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                },
                "final_amount": {
                  "exact": "8천만원",
                  "neutral": "최종본 보증금",
                  "rounded": "8천"
                }
              },
              "stanceHints": [
                "blame",
                "emotion"
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
            "그날은 공실 문의도 겹치고 세금 얘기도 머리에 차 있었어요.",
            "그래서 '6천으로 다시 맞췄다'는 말만 듣고 마지막 종이를 직접 안 봤습니다. 그게 제일 창피합니다."
          ],
          "privateKnowledge": [
            "바빴다는 사정이 면책이 아니란 걸 안다.",
            "허술한 건물주처럼 보이는 수치심 때문에 계속 부인했다."
          ],
          "suppressions": [
            "최종 확인을 안 한 자신의 수치심",
            "세라와 우석 모두에게 휘둘렸다는 자존심 상처"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-5:emotion:8",
              "factText": "공실 문의와 세금 압박 속에서 마지막 종이를 직접 안 봤다는 사실",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "call_gap": {
                  "exact": "통화 뒤 19분 후",
                  "neutral": "그 직후",
                  "dateExact": "통화 뒤 19분 후",
                  "period": "서명 당일"
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
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "tenant09:b:d-5:shame:9",
              "factText": "그 일이 제일 창피하다고 느낀다는 진술",
              "tags": [
                "shame",
                "identity"
              ],
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
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 저는 보증금 액수와 실제 입금 내역을 마지막 출력본과 직접 맞춰보지 않은 채 서명과 날인을 넘겼습니다.",
            "그 틈을 우석이 이용해 8천만원 표기를 굳혔고, 제 확인 소홀이 분쟁의 한 축이 됐습니다."
          ],
          "privateKnowledge": [
            "자신의 확인 소홀이 분쟁의 직접 원인 중 하나였음을 인정한다.",
            "피해자라는 말만으로는 이 쟁점을 설명할 수 없음을 안다."
          ],
          "suppressions": [
            "없음",
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant09:b:tell:betrayal_preface",
            "tenant09:b:tell:slow_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant09:b:d-5:admission:10",
              "factText": "마지막 출력본과 실제 입금 내역을 직접 맞춰보지 않고 서명했다는 인정",
              "tags": [
                "admission",
                "act"
              ],
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
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant09:b:d-5:responsibility:11",
              "factText": "8천만원 표기를 굳히게 한 자신의 확인 소홀을 인정하는 사실",
              "tags": [
                "responsibility",
                "relationship"
              ],
              "slots": {
                "final_amount": {
                  "exact": "8천만원",
                  "neutral": "최종본 보증금",
                  "rounded": "8천"
                },
                "broker_person": {
                  "exact": "오우석",
                  "neutral": "중개사",
                  "fullName": "오우석",
                  "judgeRef": "우석 씨"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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


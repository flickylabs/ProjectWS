export const tenant07V2Atoms = {
  "caseId": "tenant-07",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "그날은 사실상 4% 인상 재계약으로 끝난 자리였습니다.",
            "남은 건 서명 순서와 자동이체 날짜 같은 형식뿐이었어요."
          ],
          "privateKnowledge": [
            "서명본을 바로 내지 못해 도형이 '완전히 끝난 건 아니다'라고 빠져나갈 틈이 생겼다는 점은 알고 있다.",
            "중개사도 '서류만 맞추자'고 말해 구두 합의를 사실상 확정으로 받아들였다."
          ],
          "suppressions": [
            "하나가 서명본을 사흘 뒤에야 보낸 사실",
            "보증인 상담 때문에 시작일 조정 이야기가 잠깐 더 오간 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-1:act:0",
              "factText": "그날은 사실상 4% 인상 재계약으로 끝난 자리였습니다",
              "tags": [
                "act",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:rule:0",
              "factText": "남은 건 서명 순서와 자동이체 날짜 같은 형식뿐이었어요",
              "tags": [
                "rule",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "'정리하자'는 문장이 먼저 나왔고, 저는 그걸 합의로 이해했습니다.",
            "제가 나중에 서류를 낸 건 절차 문제였지 합의를 다시 열자는 뜻은 아니었어요."
          ],
          "privateKnowledge": [
            "도형이 그 표현을 '임시 정리'라고 돌릴 수 있다는 점을 예상한다.",
            "서류 지연이 생기면서 자신의 주장이 약해졌다고 느낀다."
          ],
          "suppressions": [
            "정확히 사흘 늦어진 발송 시각",
            "보증인 변경 상담 내용을 미리 충분히 설명하지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-1:act:1",
              "factText": "'정리하자'는 문장이 먼저 나왔고, 저는 그걸 합의로 이해했습니다",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:rule:1",
              "factText": "제가 나중에 서류를 낸 건 절차 문제였지 합의를 다시 열자는 뜻은 아니었어요",
              "tags": [
                "rule",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "네, 서명은 남아 있었지만 4% 방향 자체는 이미 서로 확인한 상태였습니다.",
            "제가 서류를 바로 못 낸 틈을 타서 판을 다시 흔든 건 맞습니다."
          ],
          "privateKnowledge": [
            "서류가 늦어진 순간부터 도형이 번복 명분을 찾고 있다고 느꼈다.",
            "중개사 일정표에 4% 안으로 서류 발송 계획이 잡혀 있음을 안다."
          ],
          "suppressions": [
            "자동이체 일정 조정이 조금 더 필요했던 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-1:act:2",
              "factText": "네, 서명은 남아 있었지만 4% 방향 자체는 이미 서로 확인한 상태였습니다",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
              "id": "tenant07:a:d-1:rule:2",
              "factText": "제가 서류를 바로 못 낸 틈을 타서 판을 다시 흔든 건 맞습니다",
              "tags": [
                "rule",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:context:0",
              "factText": "서류가 늦어진 순간부터 도형이 번복 명분을 찾고 있다고 느꼈다",
              "tags": [
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "제가 서명본을 늦게 낸 건 맞지만, 그 전까지는 4%로 가는 흐름이 분명했습니다.",
            "새 임차인 문의가 들어오고 나서야 도형 씨 표현이 바뀌었죠."
          ],
          "privateKnowledge": [
            "지연이 없었다면 자신의 주장이 더 깔끔했을 거라고 인정한다.",
            "고가 문의가 번복의 직접 계기라고 거의 확신한다."
          ],
          "suppressions": [
            "불안해서 PDF와 캡처를 반복 확인하느라 대응이 늦어진 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-1:act:3",
              "factText": "제가 서명본을 늦게 낸 건 맞지만, 그 전까지는 4%로 가는 흐름이 분명했습니다",
              "tags": [
                "act",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:rule:3",
              "factText": "새 임차인 문의가 들어오고 나서야 도형 씨 표현이 바뀌었죠",
              "tags": [
                "rule",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
              "id": "tenant07:a:d-1:context:1",
              "factText": "지연이 없었다면 자신의 주장이 더 깔끔했을 거라고 인정한다",
              "tags": [
                "context",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "저도 사흘 지연이 약점이 된다는 건 알았습니다.",
            "그래도 그 약점을 이유로 이미 잡힌 4% 합의 전체를 없던 것처럼 돌린 건 너무 가혹했습니다."
          ],
          "privateKnowledge": [
            "재계약이 무너질까 봐 더 단정적으로 말해 왔음을 자각한다.",
            "도형이 시세 압박을 앞세워 마음을 바꿨다고 느낀다."
          ],
          "suppressions": [
            "합의의 확정성을 일부러 더 세게 표현한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-1:act:4",
              "factText": "저도 사흘 지연이 약점이 된다는 건 알았습니다",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:rule:4",
              "factText": "그래도 그 약점을 이유로 이미 잡힌 4% 합의 전체를 없던 것처럼 돌린 건 너무 가혹했습니다",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:context:2",
              "factText": "재계약이 무너질까 봐 더 단정적으로 말해 왔음을 자각한다",
              "tags": [
                "context",
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "정확히 말하면 그날 완성된 건 '4%로 재계약하고 서류만 맞추자'는 합의 방향이었습니다.",
            "저는 그걸 거의 끝난 계약처럼 말하며 제 서명 지연이 만든 틈을 작게 보이려 했습니다."
          ],
          "privateKnowledge": [
            "4% 합의가 존재했다는 핵심은 변하지 않는다.",
            "자신이 불안을 덮으려고 합의의 확정성을 과장했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-1:act:5",
              "factText": "정확히 말하면 그날 완성된 건 '4%로 재계약하고 서류만 맞추자'는 합의 방향이었습니다",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:rule:5",
              "factText": "저는 그걸 거의 끝난 계약처럼 말하며 제 서명 지연이 만든 틈을 작게 보이려 했습니다",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:context:3",
              "factText": "4% 합의가 존재했다는 핵심은 변하지 않는다",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-1:context:4",
              "factText": "자신이 불안을 덮으려고 합의의 확정성을 과장했다",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "저는 그 새 임차인 이야기가 거의 없는 얘기라고 봤습니다.",
            "예약금도 없는 문의를 확정 카드처럼 들이민 건 부풀리기였어요."
          ],
          "privateKnowledge": [
            "그 순간에는 실제 문의표를 보지 못했지만 압박용 말이라고 느꼈다.",
            "나중에야 예약금이 없었다는 확인이 붙으며 감이 맞았다고 본다."
          ],
          "suppressions": [
            "처음 당시에는 문의의 정확한 형식을 단정할 자료가 없었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-2:counter:0",
              "factText": "저는 그 새 임차인 이야기가 거의 없는 얘기라고 봤습니다",
              "tags": [
                "counter",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:context:0",
              "factText": "예약금도 없는 문의를 확정 카드처럼 들이민 건 부풀리기였어요",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "진우 씨가 '더 주는 사람이 있다'고 꺼냈을 때도 구체한 이름이나 날짜는 없었습니다.",
            "저로선 협상 압박용 말처럼 들렸습니다."
          ],
          "privateKnowledge": [
            "직접 본 자료가 없어 말의 세기를 느낌으로 판단했다.",
            "확정 계약 여부를 즉시 반박할 수 없었던 불안이 컸다."
          ],
          "suppressions": [
            "당시에는 그 말을 완전히 거짓이라고 증명하지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-2:counter:1",
              "factText": "진우 씨가 '더 주는 사람이 있다'고 꺼냈을 때도 구체한 이름이나 날짜는 없었습니다",
              "tags": [
                "counter",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:context:1",
              "factText": "저로선 협상 압박용 말처럼 들렸습니다",
              "tags": [
                "context",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "나중에 보니 실제로는 가능 금액을 묻는 수준이더군요.",
            "처음부터 확정 계약이라고 단정할 수는 없었지만, 적어도 제가 들은 설명과는 거리가 멀었습니다."
          ],
          "privateKnowledge": [
            "문의가 전혀 없었다기보다는 탐색 수준이었다는 구별을 인식한다.",
            "도형이 그 차이를 흐리게 써먹었다고 느낀다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-2:counter:2",
              "factText": "나중에 보니 실제로는 가능 금액을 묻는 수준이더군요",
              "tags": [
                "counter",
                "timeline"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
              "id": "tenant07:a:d-2:context:2",
              "factText": "처음부터 확정 계약이라고 단정할 수는 없었지만, 적어도 제가 들은 설명과는 거리가 멀었습니다",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:fear:0",
              "factText": "문의가 전혀 없었다기보다는 탐색 수준이었다는 구별을 인식한다",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "새 문의가 있었다는 사실 자체까지 부정하진 않겠습니다.",
            "다만 도형 씨는 탐색 문의를 거의 성사된 대안처럼 말하며 재계약 조건을 흔들었습니다."
          ],
          "privateKnowledge": [
            "자신도 초반에는 문의 자체를 전부 허풍이라고 몰아붙였다.",
            "예약금이 없다는 사실이 핵심 기준이라고 배웠다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-2:counter:3",
              "factText": "새 문의가 있었다는 사실 자체까지 부정하진 않겠습니다",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:context:3",
              "factText": "다만 도형 씨는 탐색 문의를 거의 성사된 대안처럼 말하며 재계약 조건을 흔들었습니다",
              "tags": [
                "context",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
              "id": "tenant07:a:d-2:fear:1",
              "factText": "자신도 초반에는 문의 자체를 전부 허풍이라고 몰아붙였다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "그때 저는 바로 밀려날까 봐 그 문의를 전부 허풍이라고 몰아붙였습니다.",
            "실제론 문의는 있었지만 제 자리를 흔들 정도의 확정 대안은 아니었죠."
          ],
          "privateKnowledge": [
            "퇴거 공포 때문에 단어를 더 세게 골랐다.",
            "도형이 그 공포를 협상 카드로 썼다고 본다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-2:counter:4",
              "factText": "그때 저는 바로 밀려날까 봐 그 문의를 전부 허풍이라고 몰아붙였습니다",
              "tags": [
                "counter",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:context:4",
              "factText": "실제론 문의는 있었지만 제 자리를 흔들 정도의 확정 대안은 아니었죠",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:fear:2",
              "factText": "퇴거 공포 때문에 단어를 더 세게 골랐다",
              "tags": [
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "정확히는 '새 임차인 문의가 전혀 없었다'가 아니라, 예약금도 확정 의사도 없는 탐색 문의였습니다.",
            "저도 불안해서 그 차이를 뭉뚱그려 말했습니다."
          ],
          "privateKnowledge": [
            "문의의 존재와 실체를 구분해야 한다는 점을 받아들인다.",
            "핵심은 그 문의가 기존 합의를 뒤집을 정도의 대안이 아니었다는 것이다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-2:counter:5",
              "factText": "정확히는 '새 임차인 문의가 전혀 없었다'가 아니라, 예약금도 확정 의사도 없는 탐색 문의였습니다",
              "tags": [
                "counter",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:context:5",
              "factText": "저도 불안해서 그 차이를 뭉뚱그려 말했습니다",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-2:fear:3",
              "factText": "문의의 존재와 실체를 구분해야 한다는 점을 받아들인다",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
            },
            {
              "id": "tenant07:a:d-2:fear:4",
              "factText": "핵심은 그 문의가 기존 합의를 뒤집을 정도의 대안이 아니었다는 것이다",
              "tags": [
                "fear",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
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
            "서명본이 크게 늦었다고 볼 정도는 아니었습니다.",
            "보증인 상담과 자동이체 날짜를 맞추느라 바로 못 낸 것뿐이에요."
          ],
          "privateKnowledge": [
            "중개사가 원한 시점보다 정확히 사흘 늦었다는 걸 안다.",
            "미리 충분히 설명했어야 한다는 부담을 느낀다."
          ],
          "suppressions": [
            "초안 수신 직후 바로 보내지 못한 이유를 먼저 설명하지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-3:timeline:0",
              "factText": "서명본이 크게 늦었다고 볼 정도는 아니었습니다",
              "tags": [
                "timeline",
                "denial"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:responsibility:0",
              "factText": "보증인 상담과 자동이체 날짜를 맞추느라 바로 못 낸 것뿐이에요",
              "tags": [
                "responsibility",
                "uncertainty"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "초안 수신 직후 바로 확인했고, 사흘 안에 보냈습니다.",
            "절차 조정이 있었던 거지 계약을 미루려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "사흘이라는 시간 자체가 자신에게 불리한 숫자라는 걸 의식한다.",
            "도형이 그 시간을 신뢰 문제로 확대할 수 있다고 본다."
          ],
          "suppressions": [
            "보증인 변경 상담 때문에 판단이 늦어진 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-3:timeline:1",
              "factText": "초안 수신 직후 바로 확인했고, 사흘 안에 보냈습니다",
              "tags": [
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:responsibility:1",
              "factText": "절차 조정이 있었던 거지 계약을 미루려던 건 아니었습니다",
              "tags": [
                "responsibility",
                "denial"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "네, 중개사가 원하는 시점보다 사흘 늦게 보낸 건 맞습니다.",
            "다만 그 사이에도 저는 4% 재계약 자체를 뒤집을 생각은 없었습니다."
          ],
          "privateKnowledge": [
            "지연이 계약 안정성을 흔들 수 있다는 점을 알고 있었다.",
            "메일 헤더가 자신에게 불리한 기준점이 될 수 있음을 안다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-3:timeline:2",
              "factText": "네, 중개사가 원하는 시점보다 사흘 늦게 보낸 건 맞습니다",
              "tags": [
                "timeline"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
              "id": "tenant07:a:d-3:responsibility:2",
              "factText": "다만 그 사이에도 저는 4% 재계약 자체를 뒤집을 생각은 없었습니다",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:shame:0",
              "factText": "지연이 계약 안정성을 흔들 수 있다는 점을 알고 있었다",
              "tags": [
                "shame",
                "context"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "제가 보증인 상담 때문에 설명을 충분히 못 한 책임은 있습니다.",
            "하지만 그 사흘 지연이 12% 인상 통보를 정당화하진 않습니다."
          ],
          "privateKnowledge": [
            "체면 때문에 '별일 아니었다'고 먼저 말해 버렸다.",
            "실제로는 그 사흘 내내 재계약이 깨질까 봐 조마조마했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-3:timeline:3",
              "factText": "제가 보증인 상담 때문에 설명을 충분히 못 한 책임은 있습니다",
              "tags": [
                "timeline",
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:responsibility:3",
              "factText": "하지만 그 사흘 지연이 12% 인상 통보를 정당화하진 않습니다",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:shame:1",
              "factText": "체면 때문에 '별일 아니었다'고 먼저 말해 버렸다",
              "tags": [
                "shame",
                "motive"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "서명본이 늦어진 건 사실이고, 그게 제 입장을 약하게 만든다는 것도 알았습니다.",
            "괜히 덜 불안해 보이려고 '별일 아니었다'고 축소했습니다."
          ],
          "privateKnowledge": [
            "지연 자체보다 미리 설명하지 못한 점이 더 부끄럽다.",
            "절차를 놓친 책임을 인정해야 한다고 느낀다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-3:timeline:4",
              "factText": "서명본이 늦어진 건 사실이고, 그게 제 입장을 약하게 만든다는 것도 알았습니다",
              "tags": [
                "timeline",
                "emotion"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:responsibility:4",
              "factText": "괜히 덜 불안해 보이려고 '별일 아니었다'고 축소했습니다",
              "tags": [
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:shame:2",
              "factText": "지연 자체보다 미리 설명하지 못한 점이 더 부끄럽다",
              "tags": [
                "shame",
                "fear"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "정확히는 초안 수신 후 사흘 뒤에 서명본을 보냈습니다.",
            "저는 체면 때문에 그 지연과 미리 설명하지 못한 점을 작게 말해 왔습니다."
          ],
          "privateKnowledge": [
            "절차상 자신의 과실이 있었다고 받아들인다.",
            "다만 그 과실이 기존 4% 방향을 지우는 이유는 아니라고 본다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-3:timeline:5",
              "factText": "정확히는 초안 수신 후 사흘 뒤에 서명본을 보냈습니다",
              "tags": [
                "timeline",
                "admission"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:responsibility:5",
              "factText": "저는 체면 때문에 그 지연과 미리 설명하지 못한 점을 작게 말해 왔습니다",
              "tags": [
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-3:shame:3",
              "factText": "절차상 자신의 과실이 있었다고 받아들인다",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
            },
            {
              "id": "tenant07:a:d-3:shame:4",
              "factText": "다만 그 과실이 기존 4% 방향을 지우는 이유는 아니라고 본다",
              "tags": [
                "shame",
                "admission"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
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
            "그런 경고가 현재까지 문제 될 정도로 있었던 적은 없습니다.",
            "반복 민원처럼 말하는 건 사실과 다릅니다."
          ],
          "privateKnowledge": [
            "2년 전 자전거와 분리배출로 한 차례 안내를 받은 사실은 기억한다.",
            "그 일을 다시 꺼내면 문제 세입자로 보일까 봐 즉각 부정하고 싶다."
          ],
          "suppressions": [
            "당시 사과하고 바로 정리한 적이 있다는 점",
            "한 번의 공식 기록이 남아 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-4:context:0",
              "factText": "그런 경고가 현재까지 문제 될 정도로 있었던 적은 없습니다",
              "tags": [
                "context",
                "denial"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:counter:0",
              "factText": "반복 민원처럼 말하는 건 사실과 다릅니다",
              "tags": [
                "counter",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "제가 기억하는 건 생활 안내를 한번 받은 정도지, 계속 지적받은 세입자는 아니었습니다.",
            "그걸 지금 재계약 카드처럼 꺼내는 건 부당합니다."
          ],
          "privateKnowledge": [
            "단호하게 부정하다가도 '한번 정도'라는 표현으로 슬쩍 물러설 준비를 한다.",
            "재발이 없었다는 사실이 핵심 방어선이라고 본다."
          ],
          "suppressions": [
            "공식 기록에 자전거와 분리배출 항목이 함께 적힌 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-4:context:1",
              "factText": "제가 기억하는 건 생활 안내를 한번 받은 정도지, 계속 지적받은 세입자는 아니었습니다",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:counter:1",
              "factText": "그걸 지금 재계약 카드처럼 꺼내는 건 부당합니다",
              "tags": [
                "counter",
                "denial"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "네, 2년 전 자전거와 분리배출로 한 차례 안내를 받은 건 맞습니다.",
            "하지만 그 뒤 재발 기록은 없었고 상습 문제도 아니었습니다."
          ],
          "privateKnowledge": [
            "처음에 너무 세게 부정한 건 부끄러움 때문이었다.",
            "도형이 그 한 번을 계속 가져올 거라 생각해 방어적으로 굳었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-4:context:2",
              "factText": "네, 2년 전 자전거와 분리배출로 한 차례 안내를 받은 건 맞습니다",
              "tags": [
                "context",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
              "id": "tenant07:a:d-4:counter:2",
              "factText": "하지만 그 뒤 재발 기록은 없었고 상습 문제도 아니었습니다",
              "tags": [
                "counter",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:shame:0",
              "factText": "처음에 너무 세게 부정한 건 부끄러움 때문이었다",
              "tags": [
                "shame",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "그때 제가 민망해서 '전혀 없었다'고 잘라 말한 건 인정합니다.",
            "도형 씨도 그 한 번을 반복 문제처럼 부풀렸고요."
          ],
          "privateKnowledge": [
            "과거 생활 문제를 현재 계약 안정성과 섞이는 순간 수치심이 커졌다.",
            "자신도 사실을 통째로 지워 말한 건 잘못이라고 느낀다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-4:context:3",
              "factText": "그때 제가 민망해서 '전혀 없었다'고 잘라 말한 건 인정합니다",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:counter:3",
              "factText": "도형 씨도 그 한 번을 반복 문제처럼 부풀렸고요",
              "tags": [
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
              "id": "tenant07:a:d-4:shame:1",
              "factText": "과거 생활 문제를 현재 계약 안정성과 섞이는 순간 수치심이 커졌다",
              "tags": [
                "shame",
                "motive"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "솔직히 그 경고를 다시 듣는 순간 제가 문제 세입자로 찍힐까 봐 부끄러웠습니다.",
            "그래서 한 번 있었던 일까지 아예 없었다고 밀어버렸습니다."
          ],
          "privateKnowledge": [
            "도형이 예전 일을 협상 카드로 꺼내는 방식에 모욕감을 느꼈다.",
            "자기 부정이 더 큰 의심을 불렀다는 점을 안다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-4:context:4",
              "factText": "솔직히 그 경고를 다시 듣는 순간 제가 문제 세입자로 찍힐까 봐 부끄러웠습니다",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:counter:4",
              "factText": "그래서 한 번 있었던 일까지 아예 없었다고 밀어버렸습니다",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:shame:2",
              "factText": "도형이 예전 일을 협상 카드로 꺼내는 방식에 모욕감을 느꼈다",
              "tags": [
                "shame",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "정확히는 2년 전 한 차례 경고가 있었고 바로 정리돼 종결됐습니다.",
            "저는 부끄러움 때문에 그 사실 자체를 부정했고, 도형 씨는 그걸 현재 협상 카드처럼 과장했습니다."
          ],
          "privateKnowledge": [
            "과거와 현재를 분리해서 말했어야 했다고 인정한다.",
            "단발성 경고와 반복 문제는 전혀 다른 이야기라고 본다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-4:context:5",
              "factText": "정확히는 2년 전 한 차례 경고가 있었고 바로 정리돼 종결됐습니다",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:counter:5",
              "factText": "저는 부끄러움 때문에 그 사실 자체를 부정했고, 도형 씨는 그걸 현재 협상 카드처럼 과장했습니다",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-4:shame:3",
              "factText": "과거와 현재를 분리해서 말했어야 했다고 인정한다",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
            },
            {
              "id": "tenant07:a:d-4:shame:4",
              "factText": "단발성 경고와 반복 문제는 전혀 다른 이야기라고 본다",
              "tags": [
                "shame",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
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
            "12% 인상에 주차비 별도, 부분 도배 선납까지는 처음 합의 범위를 넘는 요구였습니다.",
            "저는 그 통보를 사실상 판 뒤집기로 받아들였습니다."
          ],
          "privateKnowledge": [
            "자신의 서명 지연이 도형을 더 강하게 만들었을 수 있다고 생각한다.",
            "그래도 기존 초안에 없던 조건이 새로 붙었다는 점은 분명하다고 본다."
          ],
          "suppressions": [
            "감정이 올라와 표현을 더 날카롭게 한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-5:act:0",
              "factText": "12% 인상에 주차비 별도, 부분 도배 선납까지는 처음 합의 범위를 넘는 요구였습니다",
              "tags": [
                "act",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:rule:0",
              "factText": "저는 그 통보를 사실상 판 뒤집기로 받아들였습니다",
              "tags": [
                "rule",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "4%로 정리된 뒤에 갑자기 12%와 추가 조건이 나왔습니다.",
            "서류가 늦었다고 해도 그건 별개로 붙은 새 요구였어요."
          ],
          "privateKnowledge": [
            "지연과 번복이 시간상 엮였다는 점을 안다.",
            "그러나 요구 수준이 과도했다는 확신이 있다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-5:act:1",
              "factText": "4%로 정리된 뒤에 갑자기 12%와 추가 조건이 나왔습니다",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:rule:1",
              "factText": "서류가 늦었다고 해도 그건 별개로 붙은 새 요구였어요",
              "tags": [
                "rule",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "제가 사흘 늦은 건 맞지만, 그 뒤 나온 12%와 별도 조건은 여전히 과했습니다.",
            "기존 초안에 없던 항목이 한꺼번에 붙었으니까요."
          ],
          "privateKnowledge": [
            "도형이 절차 지연을 지렛대로 사용했다고 본다.",
            "새 문의가 없었다면 이런 조건을 바로 꺼내지 않았을 거라 생각한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-5:act:2",
              "factText": "제가 사흘 늦은 건 맞지만, 그 뒤 나온 12%와 별도 조건은 여전히 과했습니다",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
              "id": "tenant07:a:d-5:rule:2",
              "factText": "기존 초안에 없던 항목이 한꺼번에 붙었으니까요",
              "tags": [
                "rule",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:fear:0",
              "factText": "도형이 절차 지연을 지렛대로 사용했다고 본다",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "도형 씨는 시장과 과거 경고를 섞어 그 요구를 합리화했지만, 실은 새 문의가 들어온 뒤 조건을 올린 겁니다.",
            "절차 지연이 있었다 해도 협상판을 다시 쓰는 수준은 아니었습니다."
          ],
          "privateKnowledge": [
            "자신도 공포 때문에 도형의 의도를 더 악의적으로 해석한 순간이 있다.",
            "핵심 책임은 번복과 추가 조건 통보에 있다고 본다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:a:tell:source_lock",
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-5:act:3",
              "factText": "도형 씨는 시장과 과거 경고를 섞어 그 요구를 합리화했지만, 실은 새 문의가 들어온 뒤 조건을 올린 겁니다",
              "tags": [
                "act",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:rule:3",
              "factText": "절차 지연이 있었다 해도 협상판을 다시 쓰는 수준은 아니었습니다",
              "tags": [
                "rule",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
              "id": "tenant07:a:d-5:fear:1",
              "factText": "자신도 공포 때문에 도형의 의도를 더 악의적으로 해석한 순간이 있다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "그 통보를 받았을 때 저는 당장 쫓겨나는 느낌이 들어서 모든 걸 악의로만 해석했습니다.",
            "지금 봐도 과한 요구지만, 제가 느낀 공포 때문에 표현을 더 날카롭게 했습니다."
          ],
          "privateKnowledge": [
            "주거 불안이 판단과 표현을 동시에 밀어 올렸다.",
            "그래도 요구 자체가 기존 합의 범위를 넘었다는 생각은 유지한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-5:act:4",
              "factText": "그 통보를 받았을 때 저는 당장 쫓겨나는 느낌이 들어서 모든 걸 악의로만 해석했습니다",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:rule:4",
              "factText": "지금 봐도 과한 요구지만, 제가 느낀 공포 때문에 표현을 더 날카롭게 했습니다",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:fear:2",
              "factText": "주거 불안이 판단과 표현을 동시에 밀어 올렸다",
              "tags": [
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "핵심은 4% 방향 뒤에 12% 인상, 주차비 별도, 부분 도배 선납 조건이 추가로 통보됐다는 점입니다.",
            "저도 제 지연 때문에 더 예민해져 있었지만 그 요구가 일방 변경이라는 판단은 바뀌지 않습니다."
          ],
          "privateKnowledge": [
            "자기 불안이 서술의 톤을 세게 만들었다는 걸 안다.",
            "추가 조건은 기존 합의와 별개였다고 본다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:a:tell:timeline_board",
            "tenant07:a:tell:measured_cutoff"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:a:d-5:act:5",
              "factText": "핵심은 4% 방향 뒤에 12% 인상, 주차비 별도, 부분 도배 선납 조건이 추가로 통보됐다는 점입니다",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:rule:5",
              "factText": "저도 제 지연 때문에 더 예민해져 있었지만 그 요구가 일방 변경이라는 판단은 바뀌지 않습니다",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:a:d-5:fear:3",
              "factText": "자기 불안이 서술의 톤을 세게 만들었다는 걸 안다",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
            },
            {
              "id": "tenant07:a:d-5:fear:4",
              "factText": "추가 조건은 기존 합의와 별개였다고 본다",
              "tags": [
                "fear",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
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
            "4%라는 말은 나왔어도 그건 방향만 잡아 본 겁니다.",
            "세입자 쪽 서류가 안 들어온 상태에서 제가 최종 확답을 준 건 아니에요."
          ],
          "privateKnowledge": [
            "중개사에게 4% 기준 초안을 보내도록 두었고 그 자리를 사실상 합의 단계로 느꼈다.",
            "진우가 높은 문의를 가져온 뒤부터 그 자리를 '임시'로 다시 부르고 있다."
          ],
          "suppressions": [
            "새 문의가 마음을 바꾸게 한 직접 계기였다는 점",
            "자신이 먼저 4% 안으로 정리해도 된다고 말한 뉘앙스"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-1:act:0",
              "factText": "4%라는 말은 나왔어도 그건 방향만 잡아 본 겁니다",
              "tags": [
                "act",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:responsibility:0",
              "factText": "세입자 쪽 서류가 안 들어온 상태에서 제가 최종 확답을 준 건 아니에요",
              "tags": [
                "responsibility",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "중개사가 4%로 적어 본 건 맞지만 서명 전이었잖아요.",
            "저는 그때도 시장 상황을 더 봐야 한다고 생각했습니다."
          ],
          "privateKnowledge": [
            "시장 상황을 더 보겠다는 말을 회의 자리에서는 분명하게 꺼내지 않았다.",
            "서류가 늦자 마음을 바꾸기 쉬워졌다고 느꼈다."
          ],
          "suppressions": [
            "높은 문의가 들어오기 전까지는 4%로 가도 되겠다고 생각한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-1:act:1",
              "factText": "중개사가 4%로 적어 본 건 맞지만 서명 전이었잖아요",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:responsibility:1",
              "factText": "저는 그때도 시장 상황을 더 봐야 한다고 생각했습니다",
              "tags": [
                "responsibility",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "예, 4%와 2년 재계약 쪽으로 먼저 정리한 건 맞습니다.",
            "다만 하나 씨 서류가 늦어지니 제가 그걸 확정 전 단계로 다시 보기 시작한 겁니다."
          ],
          "privateKnowledge": [
            "서류 지연이 번복의 명분이 되리라고 계산했다.",
            "중개사 일정표가 이미 4% 안을 전제로 짜여 있었다는 점을 안다."
          ],
          "suppressions": [
            "진우가 가져온 문의가 결정적인 자극이었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-1:act:2",
              "factText": "예, 4%와 2년 재계약 쪽으로 먼저 정리한 건 맞습니다",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
              "id": "tenant07:b:d-1:responsibility:2",
              "factText": "다만 하나 씨 서류가 늦어지니 제가 그걸 확정 전 단계로 다시 보기 시작한 겁니다",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:motive:0",
              "factText": "서류 지연이 번복의 명분이 되리라고 계산했다",
              "tags": [
                "motive",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "처음엔 4%로 가도 되겠다고 했습니다.",
            "그런데 진우가 더 높은 문의를 가져오고 서명도 늦어지니 제가 마음을 바꿨죠."
          ],
          "privateKnowledge": [
            "세금보다 시세를 놓치는 모양새가 더 불편했다.",
            "자기 번복을 합리화하려고 '아직 안 끝난 일'이라는 표현을 반복했다."
          ],
          "suppressions": [
            "추가 조건을 한꺼번에 붙인 과도함"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-1:act:3",
              "factText": "처음엔 4%로 가도 되겠다고 했습니다",
              "tags": [
                "act",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:responsibility:3",
              "factText": "그런데 진우가 더 높은 문의를 가져오고 서명도 늦어지니 제가 마음을 바꿨죠",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:motive:1",
              "factText": "세금보다 시세를 놓치는 모양새가 더 불편했다",
              "tags": [
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "솔직히 말하면 세금보다 '시세를 놓친 집주인'으로 보일까 봐 흔들렸습니다.",
            "그래서 이미 잡아 둔 4% 합의를 임시였다고 더 세게 말했습니다."
          ],
          "privateKnowledge": [
            "가족 압박과 주변 시세 이야기가 자신의 체면을 건드렸다.",
            "합의 자체보다 자기 판단 실패가 들통나는 걸 더 두려워했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-1:act:4",
              "factText": "솔직히 말하면 세금보다 '시세를 놓친 집주인'으로 보일까 봐 흔들렸습니다",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:responsibility:4",
              "factText": "그래서 이미 잡아 둔 4% 합의를 임시였다고 더 세게 말했습니다",
              "tags": [
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:motive:2",
              "factText": "가족 압박과 주변 시세 이야기가 자신의 체면을 건드렸다",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "중개사 입회 아래 4% 인상과 2년 재계약 방향을 먼저 정리한 건 사실입니다.",
            "제가 서명 지연과 시세 문의를 핑계로 그 합의의 무게를 깎아 말했습니다."
          ],
          "privateKnowledge": [
            "그 자리에서 사실상 재계약 기준선이 잡혔다고 인정한다.",
            "자신이 번복 책임을 줄이려고 표현을 바꿨음을 안다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-1:act:5",
              "factText": "중개사 입회 아래 4% 인상과 2년 재계약 방향을 먼저 정리한 건 사실입니다",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:responsibility:5",
              "factText": "제가 서명 지연과 시세 문의를 핑계로 그 합의의 무게를 깎아 말했습니다",
              "tags": [
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-1:motive:3",
              "factText": "그 자리에서 사실상 재계약 기준선이 잡혔다고 인정한다",
              "tags": [
                "motive",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
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
            },
            {
              "id": "tenant07:b:d-1:motive:4",
              "factText": "자신이 번복 책임을 줄이려고 표현을 바꿨음을 안다",
              "tags": [
                "motive",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "4% 인상",
                  "rounded": "약 4%",
                  "neutral": "그 인상률"
                },
                "term": {
                  "exact": "2년 재계약",
                  "neutral": "그 재계약 기간"
                },
                "time": {
                  "exact": "계약 만료 두 달 전 중개사 사무실 협의",
                  "dateExact": "계약 만료 두 달 전",
                  "period": "재계약 협의 당일",
                  "neutral": "그 자리"
                },
                "person": {
                  "exact": "남서희",
                  "fullName": "남서희 공인중개사",
                  "judgeRef": "중개사",
                  "neutral": "그 중개사"
                },
                "document": {
                  "exact": "갱신 초안 PDF",
                  "neutral": "그 초안 문서"
                },
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
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
            "진우가 가져온 건 그냥 소문이 아니라 실제로 더 높은 금액을 낼 수 있다는 문의였습니다.",
            "집 비우면 바로 받을 사람처럼 들었기 때문에 저는 그걸 무시할 수 없었어요."
          ],
          "privateKnowledge": [
            "예약금도 가예약도 없었다는 점을 안다.",
            "협상에서 밀리지 않으려 그 문의를 실제 대안처럼 크게 받아들였다."
          ],
          "suppressions": [
            "문의가 증액 번복 통보 두 시간 전에 들어왔다는 점",
            "중개사가 확정 계약으로 보지 않았다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-2:context:0",
              "factText": "진우가 가져온 건 그냥 소문이 아니라 실제로 더 높은 금액을 낼 수 있다는 문의였습니다",
              "tags": [
                "context",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-2:self_justification:0",
              "factText": "집 비우면 바로 받을 사람처럼 들었기 때문에 저는 그걸 무시할 수 없었어요",
              "tags": [
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "예약금까지 간 건 아니어도, 금액 의사는 분명히 확인된 줄 알았습니다.",
            "그래서 기존 조건을 다시 봐야 한다고 생각했어요."
          ],
          "privateKnowledge": [
            "확인된 건 금액 관심뿐이었고 계약 의사는 아니었다.",
            "진우 말과 시장 분위기를 섞어 실제보다 무겁게 받아들였다."
          ],
          "suppressions": [
            "그 문의를 직접 검증하지 않고 자신의 판단에 유리하게 해석한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-2:context:1",
              "factText": "예약금까지 간 건 아니어도, 금액 의사는 분명히 확인된 줄 알았습니다",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-2:self_justification:1",
              "factText": "그래서 기존 조건을 다시 봐야 한다고 생각했어요",
              "tags": [
                "self_justification",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "지금 보니 그 문의가 가예약 단계는 아니었습니다.",
            "그래도 당시엔 진우 말과 주변 시세를 묶어서 꽤 현실적인 대안이라고 여겼습니다."
          ],
          "privateKnowledge": [
            "자기 체면 때문에 '현실적인 대안'이라는 표현을 붙였음을 안다.",
            "예약금 유무가 결정적이라는 사실을 알면서도 흐렸다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-2:context:2",
              "factText": "지금 보니 그 문의가 가예약 단계는 아니었습니다",
              "tags": [
                "context",
                "timeline"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
              "id": "tenant07:b:d-2:self_justification:2",
              "factText": "그래도 당시엔 진우 말과 주변 시세를 묶어서 꽤 현실적인 대안이라고 여겼습니다",
              "tags": [
                "self_justification",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-2:fear:0",
              "factText": "자기 체면 때문에 '현실적인 대안'이라는 표현을 붙였음을 안다",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "실제 확정 임차인은 아니었지만, 저 혼자 그렇게 무게를 키워 받아들인 건 맞습니다.",
            "서명도 늦고 시장도 오르니 제 판단이 더 공격적으로 기울었습니다."
          ],
          "privateKnowledge": [
            "진우의 말이 자신의 번복을 정당화해 준다고 느꼈다.",
            "탐색 문의를 거의 된 거래처럼 말한 것은 과장이었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-2:context:3",
              "factText": "실제 확정 임차인은 아니었지만, 저 혼자 그렇게 무게를 키워 받아들인 건 맞습니다",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-2:self_justification:3",
              "factText": "서명도 늦고 시장도 오르니 제 판단이 더 공격적으로 기울었습니다",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-2:fear:1",
              "factText": "진우의 말이 자신의 번복을 정당화해 준다고 느꼈다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "아들이 가져온 말을 놓치면 제가 너무 둔한 집주인처럼 보일까 봐 겁이 났습니다.",
            "그래서 탐색 문의를 거의 된 거래처럼 말한 겁니다."
          ],
          "privateKnowledge": [
            "약해 보일까 두려워 사실보다 강한 언어를 택했다.",
            "공실과 시세 불안이 체면 문제와 엉겨 있었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-2:context:4",
              "factText": "아들이 가져온 말을 놓치면 제가 너무 둔한 집주인처럼 보일까 봐 겁이 났습니다",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-2:self_justification:4",
              "factText": "그래서 탐색 문의를 거의 된 거래처럼 말한 겁니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-2:fear:2",
              "factText": "약해 보일까 두려워 사실보다 강한 언어를 택했다",
              "tags": [
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "결국 진우가 말한 건 예약금도 없는 탐색 문의였습니다.",
            "저는 그걸 체면을 지키려는 카드로 크게 부풀려 하나 씨를 압박했습니다."
          ],
          "privateKnowledge": [
            "문의의 실체가 기존 합의를 뒤집을 정도는 아니었다고 인정한다.",
            "자신이 외부 대안을 협상 무기로 사용했다는 걸 안다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-2:context:5",
              "factText": "결국 진우가 말한 건 예약금도 없는 탐색 문의였습니다",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-2:self_justification:5",
              "factText": "저는 그걸 체면을 지키려는 카드로 크게 부풀려 하나 씨를 압박했습니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-2:fear:3",
              "factText": "문의의 실체가 기존 합의를 뒤집을 정도는 아니었다고 인정한다",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
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
            },
            {
              "id": "tenant07:b:d-2:fear:4",
              "factText": "자신이 외부 대안을 협상 무기로 사용했다는 걸 안다",
              "tags": [
                "fear",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상 수용 문의",
                  "rounded": "약 12% 수준 문의",
                  "neutral": "그 고액 문의"
                },
                "time": {
                  "exact": "증액 번복 통보 두 시간 전",
                  "dateExact": "증액 번복 통보 직전",
                  "period": "그 직전 시점",
                  "neutral": "그때"
                },
                "person": {
                  "exact": "권진우",
                  "fullName": "권진우",
                  "judgeRef": "아드님",
                  "neutral": "그 가족"
                },
                "document": {
                  "exact": "공실 문의표",
                  "neutral": "그 문의표"
                },
                "money": {
                  "exact": "예약금 없음",
                  "neutral": "그 부재 사실"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
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
            "서명본이 늦어졌으니 제가 불안해진 건 당연합니다.",
            "집주인 입장에선 그 사이 다른 가능성도 볼 수밖에 없어요."
          ],
          "privateKnowledge": [
            "사흘 지연이 아주 긴 기간은 아니라는 걸 안다.",
            "이미 새 문의 이야기에 마음이 흔들리고 있었다."
          ],
          "suppressions": [
            "기존 4% 초안이 이미 만들어져 있었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-3:timeline:0",
              "factText": "서명본이 늦어졌으니 제가 불안해진 건 당연합니다",
              "tags": [
                "timeline",
                "denial"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-3:self_justification:0",
              "factText": "집주인 입장에선 그 사이 다른 가능성도 볼 수밖에 없어요",
              "tags": [
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "중개사 초안을 보내고도 사흘 동안 답이 없었잖아요.",
            "저는 그걸 재계약 의사가 흔들리는 신호로 봤습니다."
          ],
          "privateKnowledge": [
            "답이 없던 사흘 동안 스스로도 번복 명분을 찾고 있었다.",
            "세입자 신뢰 문제로 몰면 자신이 덜 나빠 보인다고 느꼈다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-3:timeline:1",
              "factText": "중개사 초안을 보내고도 사흘 동안 답이 없었잖아요",
              "tags": [
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-3:self_justification:1",
              "factText": "저는 그걸 재계약 의사가 흔들리는 신호로 봤습니다",
              "tags": [
                "self_justification",
                "denial"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "지금 보면 지연은 딱 사흘이었고 이유도 보증인 상담 때문이었습니다.",
            "그래도 그때 제 입장에선 확답이 늦다고 느껴졌습니다."
          ],
          "privateKnowledge": [
            "느낌의 문제를 사실보다 크게 말했음을 안다.",
            "지연보다 새 문의가 실제로는 더 큰 영향을 줬다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-3:timeline:2",
              "factText": "지금 보면 지연은 딱 사흘이었고 이유도 보증인 상담 때문이었습니다",
              "tags": [
                "timeline"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
              "id": "tenant07:b:d-3:self_justification:2",
              "factText": "그래도 그때 제 입장에선 확답이 늦다고 느껴졌습니다",
              "tags": [
                "self_justification",
                "admission"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-3:motive:0",
              "factText": "느낌의 문제를 사실보다 크게 말했음을 안다",
              "tags": [
                "motive",
                "context"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "사흘 지연 자체는 사실이지만, 제가 그걸 과하게 키워 말한 면도 있습니다.",
            "이미 새 문의 얘기에 마음이 흔들린 상태였으니까요."
          ],
          "privateKnowledge": [
            "지연을 붙잡아 기존 합의를 흔드는 데 활용했다.",
            "상대 신뢰 문제를 전면에 세운 건 자기 방어였다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-3:timeline:3",
              "factText": "사흘 지연 자체는 사실이지만, 제가 그걸 과하게 키워 말한 면도 있습니다",
              "tags": [
                "timeline",
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-3:self_justification:3",
              "factText": "이미 새 문의 얘기에 마음이 흔들린 상태였으니까요",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-3:motive:1",
              "factText": "지연을 붙잡아 기존 합의를 흔드는 데 활용했다",
              "tags": [
                "motive"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "솔직히 그 사흘을 붙잡은 건 번복 명분이 필요했기 때문이기도 합니다.",
            "세입자 신뢰 문제처럼 몰아가면 제가 덜 나빠 보였거든요."
          ],
          "privateKnowledge": [
            "시세 압박을 드러내는 것보다 절차 지연을 탓하는 편이 유리했다.",
            "자신의 계산이 뒤늦게 부끄럽다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-3:timeline:4",
              "factText": "솔직히 그 사흘을 붙잡은 건 번복 명분이 필요했기 때문이기도 합니다",
              "tags": [
                "timeline",
                "emotion"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-3:self_justification:4",
              "factText": "세입자 신뢰 문제처럼 몰아가면 제가 덜 나빠 보였거든요",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-3:motive:2",
              "factText": "시세 압박을 드러내는 것보다 절차 지연을 탓하는 편이 유리했다",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "하나 씨가 서명본을 사흘 늦게 보낸 건 맞습니다.",
            "하지만 그 정도 절차 지연을 이유로 기존 4% 합의까지 흔든 건 제가 과장한 대응이었습니다."
          ],
          "privateKnowledge": [
            "지연은 사실이지만 중대한 파기 사유처럼 포장한 건 자신이었다.",
            "번복 책임의 비중이 자기 쪽에 더 크다고 본다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-3:timeline:5",
              "factText": "하나 씨가 서명본을 사흘 늦게 보낸 건 맞습니다",
              "tags": [
                "timeline",
                "admission"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-3:self_justification:5",
              "factText": "하지만 그 정도 절차 지연을 이유로 기존 4% 합의까지 흔든 건 제가 과장한 대응이었습니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-3:motive:3",
              "factText": "지연은 사실이지만 중대한 파기 사유처럼 포장한 건 자신이었다",
              "tags": [
                "motive",
                "emotion"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
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
            },
            {
              "id": "tenant07:b:d-3:motive:4",
              "factText": "번복 책임의 비중이 자기 쪽에 더 크다고 본다",
              "tags": [
                "motive",
                "admission"
              ],
              "slots": {
                "delay": {
                  "exact": "사흘 지연",
                  "neutral": "그 지연"
                },
                "time": {
                  "exact": "초안 수신 후 사흘 뒤 발송",
                  "dateExact": "초안 수신 후 사흘 뒤",
                  "period": "서명본 발송 시점",
                  "neutral": "그 발송 시점"
                },
                "document": {
                  "exact": "서명본 발송 메일 기록",
                  "neutral": "그 메일 기록"
                },
                "procedure": {
                  "exact": "보증인 상담 및 자동이체 일정 조정",
                  "neutral": "그 절차 조정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
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
            "그 문제는 한 번으로 끝난 게 아닙니다.",
            "복도 자전거며 분리배출이며 제가 몇 번이나 주의를 줬어요."
          ],
          "privateKnowledge": [
            "공식 기록은 2년 전 한 차례뿐이라는 걸 안다.",
            "재계약 협상에서 하나를 불리하게 보이게 하려고 기억을 크게 부풀린다."
          ],
          "suppressions": [
            "이후 같은 항목 재접수가 없었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-4:context:0",
              "factText": "그 문제는 한 번으로 끝난 게 아닙니다",
              "tags": [
                "context",
                "denial"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-4:self_justification:0",
              "factText": "복도 자전거며 분리배출이며 제가 몇 번이나 주의를 줬어요",
              "tags": [
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "관리사무소 기록만 한 번일 뿐, 생활 불편은 그보다 더 오래 누적됐습니다.",
            "집주인으로서 신뢰를 볼 수밖에 없었죠."
          ],
          "privateKnowledge": [
            "누적됐다고 말할 만한 객관 기록은 없다.",
            "옛 불만을 현재 판단의 근거처럼 보이게 만들고 싶다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-4:context:1",
              "factText": "관리사무소 기록만 한 번일 뿐, 생활 불편은 그보다 더 오래 누적됐습니다",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-4:self_justification:1",
              "factText": "집주인으로서 신뢰를 볼 수밖에 없었죠",
              "tags": [
                "self_justification",
                "denial"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "공식 접수는 한 번뿐이었다는 건 인정합니다.",
            "그래도 저는 그때 받은 인상을 쉽게 지우지 못했습니다."
          ],
          "privateKnowledge": [
            "기록보다 인상을 앞세우면 과장이 된다는 걸 안다.",
            "과거 민원을 현재 협상에 끌어오는 게 유리하다고 계산했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-4:context:2",
              "factText": "공식 접수는 한 번뿐이었다는 건 인정합니다",
              "tags": [
                "context",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
              "id": "tenant07:b:d-4:self_justification:2",
              "factText": "그래도 저는 그때 받은 인상을 쉽게 지우지 못했습니다",
              "tags": [
                "self_justification",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-4:fear:0",
              "factText": "기록보다 인상을 앞세우면 과장이 된다는 걸 안다",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "반복 기록이 없는데도 제가 여러 번 있었던 일처럼 말한 건 맞습니다.",
            "재계약 때 제 불만을 정당화하려고 예전 일을 크게 끌어왔죠."
          ],
          "privateKnowledge": [
            "세입자 관리 실패처럼 보일까 봐 경고를 크게 불렸다.",
            "현재 인상 요구를 방어하려는 의도가 섞여 있었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-4:context:3",
              "factText": "반복 기록이 없는데도 제가 여러 번 있었던 일처럼 말한 건 맞습니다",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-4:self_justification:3",
              "factText": "재계약 때 제 불만을 정당화하려고 예전 일을 크게 끌어왔죠",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-4:fear:1",
              "factText": "세입자 관리 실패처럼 보일까 봐 경고를 크게 불렸다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "세입자 관리도 못 한 집주인처럼 보이기 싫어서 그 한 번을 계속 쌓인 문제처럼 말했습니다.",
            "지금 생각하면 체면 때문에 부풀린 겁니다."
          ],
          "privateKnowledge": [
            "예전 민원을 붙잡는 것이 현재 책임을 흐리는 방식이었음을 안다.",
            "그 과장을 접어야 한다는 압박을 느낀다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-4:context:4",
              "factText": "세입자 관리도 못 한 집주인처럼 보이기 싫어서 그 한 번을 계속 쌓인 문제처럼 말했습니다",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-4:self_justification:4",
              "factText": "지금 생각하면 체면 때문에 부풀린 겁니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-4:fear:2",
              "factText": "예전 민원을 붙잡는 것이 현재 책임을 흐리는 방식이었음을 안다",
              "tags": [
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "실제로 남아 있는 공식 기록은 2년 전 한 차례뿐입니다.",
            "저는 그 종결된 민원을 현재 인상 요구의 뒷받침처럼 다시 꺼내며 과장했습니다."
          ],
          "privateKnowledge": [
            "과거 민원은 현재 증액 사유와 별개라고 인정한다.",
            "반복 문제처럼 말한 건 자신의 체면 방어였다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-4:context:5",
              "factText": "실제로 남아 있는 공식 기록은 2년 전 한 차례뿐입니다",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-4:self_justification:5",
              "factText": "저는 그 종결된 민원을 현재 인상 요구의 뒷받침처럼 다시 꺼내며 과장했습니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-4:fear:3",
              "factText": "과거 민원은 현재 증액 사유와 별개라고 인정한다",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
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
            },
            {
              "id": "tenant07:b:d-4:fear:4",
              "factText": "반복 문제처럼 말한 건 자신의 체면 방어였다",
              "tags": [
                "fear",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전 여름 한 차례 경고",
                  "dateExact": "2년 전 여름",
                  "period": "과거 종결 시점",
                  "neutral": "그 과거 경고"
                },
                "document": {
                  "exact": "관리사무소 민원 종결 기록",
                  "neutral": "그 종결 기록"
                },
                "issue": {
                  "exact": "복도 자전거 주차와 분리배출",
                  "neutral": "그 생활 민원"
                },
                "result": {
                  "exact": "재발 기록 없음",
                  "neutral": "그 이후 상황"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
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
            "제가 12%를 일방 통보했다기보다, 시장에 맞게 조건을 다시 설명한 겁니다.",
            "주차비나 도배 이야기도 통상 조정 범위였어요."
          ],
          "privateKnowledge": [
            "이미 4% 기준으로 초안이 잡혀 있었음을 안다.",
            "새 문의와 시세 불안이 없었다면 그 수준의 조건을 한 번에 내지 않았을 것이다."
          ],
          "suppressions": [
            "12% 인상과 추가 조건이 기존 초안에는 없었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-5:act:0",
              "factText": "제가 12%를 일방 통보했다기보다, 시장에 맞게 조건을 다시 설명한 겁니다",
              "tags": [
                "act",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-5:self_justification:0",
              "factText": "주차비나 도배 이야기도 통상 조정 범위였어요",
              "tags": [
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "4% 초안이 있었다 해도 서명 전이면 조정 여지는 남아 있습니다.",
            "제가 제시한 추가 조건은 손해를 줄이기 위한 최소한이었습니다."
          ],
          "privateKnowledge": [
            "최소한이라고 말하지만 실제론 시장가를 더 반영하려는 욕심이 컸다.",
            "절차 지연을 조정 여지의 명분으로 사용한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-5:act:1",
              "factText": "4% 초안이 있었다 해도 서명 전이면 조정 여지는 남아 있습니다",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-5:self_justification:1",
              "factText": "제가 제시한 추가 조건은 손해를 줄이기 위한 최소한이었습니다",
              "tags": [
                "self_justification",
                "denial"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "네, 12%와 몇 가지 조건을 다시 꺼낸 건 맞습니다.",
            "하지만 서명 지연과 시장 상승이 겹치니 기존 안을 그대로 가기 어렵다고 봤습니다."
          ],
          "privateKnowledge": [
            "기존 안을 그대로 가기 싫었던 마음이 이미 커져 있었다.",
            "새 문의가 자기 판단을 정당화해 준다고 믿고 싶었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-5:act:2",
              "factText": "네, 12%와 몇 가지 조건을 다시 꺼낸 건 맞습니다",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
              "id": "tenant07:b:d-5:self_justification:2",
              "factText": "하지만 서명 지연과 시장 상승이 겹치니 기존 안을 그대로 가기 어렵다고 봤습니다",
              "tags": [
                "self_justification",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-5:fear:0",
              "factText": "기존 안을 그대로 가기 싫었던 마음이 이미 커져 있었다",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
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
            "지금 생각하면 주차비 별도와 부분 도배 선납까지 한꺼번에 붙인 건 과했습니다.",
            "저는 새 문의와 예전 불만을 핑계로 제 부담을 세입자 쪽에 넘기려 했습니다."
          ],
          "privateKnowledge": [
            "시장 압박보다 자기 손실 회피가 더 직접적 동기였음을 안다.",
            "여러 조건을 섞으면 요구가 합리적으로 보일 거라 계산했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant07:b:tell:market_shield",
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-5:act:3",
              "factText": "지금 생각하면 주차비 별도와 부분 도배 선납까지 한꺼번에 붙인 건 과했습니다",
              "tags": [
                "act",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-5:self_justification:3",
              "factText": "저는 새 문의와 예전 불만을 핑계로 제 부담을 세입자 쪽에 넘기려 했습니다",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-5:fear:1",
              "factText": "시장 압박보다 자기 손실 회피가 더 직접적 동기였음을 안다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "세금이 아니라도, 시세를 놓친 집주인처럼 보일까 봐 조급했습니다.",
            "그래서 이미 잡힌 4% 위에 12%와 다른 조건을 덧붙이며 제 불안을 방어했습니다."
          ],
          "privateKnowledge": [
            "체면과 손실 회피가 판단을 밀었다.",
            "시장 일반론으로 자기 선택을 덮으려 했음을 안다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-5:act:4",
              "factText": "세금이 아니라도, 시세를 놓친 집주인처럼 보일까 봐 조급했습니다",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-5:self_justification:4",
              "factText": "그래서 이미 잡힌 4% 위에 12%와 다른 조건을 덧붙이며 제 불안을 방어했습니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-5:fear:2",
              "factText": "체면과 손실 회피가 판단을 밀었다",
              "tags": [
                "fear"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "맞습니다. 저는 4% 방향이 잡힌 뒤 12% 인상과 주차비 별도, 부분 도배 선납을 추가로 통보했습니다.",
            "그건 기존 합의를 넘어서는 일방 변경이었고, 저는 손해를 피하려고 그 사실을 축소해 말했습니다."
          ],
          "privateKnowledge": [
            "기존 합의를 자신이 흔들었다는 점을 인정한다.",
            "추가 조건이 자기 방어의 산물이었다는 걸 안다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant07:b:tell:past_stack",
            "tenant07:b:tell:injured_sigh_reset"
          ],
          "claimAtoms": [
            {
              "id": "tenant07:b:d-5:act:5",
              "factText": "맞습니다. 저는 4% 방향이 잡힌 뒤 12% 인상과 주차비 별도, 부분 도배 선납을 추가로 통보했습니다",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "empathy_approach"
              ]
            },
            {
              "id": "tenant07:b:d-5:self_justification:5",
              "factText": "그건 기존 합의를 넘어서는 일방 변경이었고, 저는 손해를 피하려고 그 사실을 축소해 말했습니다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "tenant07:b:d-5:fear:3",
              "factText": "기존 합의를 자신이 흔들었다는 점을 인정한다",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
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
            },
            {
              "id": "tenant07:b:d-5:fear:4",
              "factText": "추가 조건이 자기 방어의 산물이었다는 걸 안다",
              "tags": [
                "fear",
                "admission"
              ],
              "slots": {
                "amount": {
                  "exact": "12% 인상",
                  "rounded": "약 12%",
                  "neutral": "그 높은 인상률"
                },
                "conditionA": {
                  "exact": "주차비 별도",
                  "neutral": "그 추가 조건"
                },
                "conditionB": {
                  "exact": "부분 도배 선납",
                  "neutral": "그 선납 조건"
                },
                "time": {
                  "exact": "4% 방향 정리 뒤 추가 통보",
                  "period": "번복 통보 시점",
                  "neutral": "그 뒤 통보"
                },
                "document": {
                  "exact": "기존 갱신 초안과 상담 녹음 요약",
                  "neutral": "그 기존 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        }
      }
    }
  }
}


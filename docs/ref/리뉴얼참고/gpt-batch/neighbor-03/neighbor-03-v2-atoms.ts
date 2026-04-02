export const neighbor03V2Atoms = {
  "caseId": "neighbor-03",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "세척실 문은 급한 상황에서 잠깐 열린 것뿐이라 무단 사용까지는 아닙니다."
          ],
          "privateKnowledge": [
            "청소용역 임시 PIN 일부를 휴대폰 메모에 남겨둔 사실을 안다.",
            "관리 승인 없이 제한 시간에 먼저 문을 열었다는 점이 문제 될 수 있음을 안다."
          ],
          "suppressions": [
            "코드 출처가 청소용역 임시 PIN이라는 점",
            "관리사무소 확인 없이 선입실한 순서"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-1:denial:0",
              "factText": "출입이 예외 상황 처리였다는 주장",
              "tags": [
                "denial",
                "rule",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-1:timeline:0",
              "factText": "문이 열린 순서를 기술적으로만 말하는 방식",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
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
            "직원용 코드인지보다 그때 잠깐 열 수밖에 있었는지가 더 중요합니다."
          ],
          "privateKnowledge": [
            "자기 계정이 아닌 코드를 눌렀다는 점이 드러나면 불리하다.",
            "절차보다 예외를 앞세워 논점을 옮기려 한다."
          ],
          "suppressions": [
            "주민 예약권한과 무관한 코드였다는 점",
            "예외를 자의적으로 해석했다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-1:rule:0",
              "factText": "코드 종류보다 예외 사유를 앞세우는 설명",
              "tags": [
                "rule",
                "self_justification",
                "context"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "hedge",
                "redirect"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-1:uncertainty:0",
              "factText": "승인 경계가 애매했다는 식의 흐리기",
              "tags": [
                "uncertainty",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "hedge",
                "redirect"
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
            "제가 코드를 누른 건 맞지만 안이 비어 있다고 보고 잠깐 정리하려던 수준이었습니다."
          ],
          "privateKnowledge": [
            "누른 코드는 청소용역 임시 PIN이었다.",
            "이미 출입 제한 시간이라는 점을 알고 있었다."
          ],
          "suppressions": [
            "개인 편의를 위한 사용이었다는 점",
            "예약 절차를 건너뛴 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-1:admission:0",
              "factText": "코드를 직접 입력했다는 부분 인정",
              "tags": [
                "admission",
                "act",
                "identity"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "partial",
                "context"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-1:context:0",
              "factText": "안이 비어 있다고 스스로 판단했다는 변명",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "partial",
                "context"
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
            "마감 직전엔 다들 급하면 그렇게 처리하기도 합니다. 동시 입실이 겹치며 통제가 무너진 겁니다."
          ],
          "privateKnowledge": [
            "관행처럼 말하지만 실제로는 승인 없는 예외 사용이었다.",
            "서아의 동시 입실을 끌어와 자신의 선행 위반을 희석하려 한다."
          ],
          "suppressions": [
            "관행 주장이 규정 위반을 덮지 못한다는 점",
            "자신이 먼저 경계를 무너뜨렸다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-1:self_justification:0",
              "factText": "예외를 관행처럼 말하며 위반 강도를 낮추는 설명",
              "tags": [
                "self_justification",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame",
                "justify"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-1:counter:0",
              "factText": "상대의 동시 입실을 끌어와 책임을 분산하는 말",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                },
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                }
              },
              "stanceHints": [
                "blame",
                "justify"
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
            "그 문을 먼저 연 순간부터 경계가 흐려진 건 압니다. 그때 멈췄어야 했습니다."
          ],
          "privateKnowledge": [
            "자신의 편의가 사고 출발점이었다는 자책이 올라온다.",
            "직원 권한을 사적으로 쓴 모양새가 부끄럽다."
          ],
          "suppressions": [
            "서아의 잘못만 강조하고 싶은 방어심",
            "직원처럼 보이고 싶었던 체면 의식"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-1:shame:0",
              "factText": "먼저 문을 연 선택 자체를 부끄러워하는 감정",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "emotional",
                "hesitate"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-1:responsibility:0",
              "factText": "선행 행위가 경계를 무너뜨렸다는 자각",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "emotional",
                "hesitate"
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
            "청소용역 임시 PIN을 메모해 두고 제가 먼저 문을 연 건 사실입니다. 관리 승인 없는 무단 사용이었습니다."
          ],
          "privateKnowledge": [
            "클립 편집 이전에 이미 자신이 출발점을 만들었다는 점까지 인정한다."
          ],
          "suppressions": [
            "상대의 잘못도 있었지만 시작은 자신이었다는 결론"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-1:admission:1",
              "factText": "청소용역 임시 PIN을 써서 선입실했다는 시인",
              "tags": [
                "admission",
                "act",
                "rule"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                },
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-1:motive:0",
              "factText": "편의를 위해 절차를 건너뛰었다는 동기 인정",
              "tags": [
                "motive",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
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
            "문이 갑자기 열리면서 작은 개 쪽 줄이 길게 들어왔습니다."
          ],
          "privateKnowledge": [
            "자신이 이미 안쪽에 있었다는 점을 안다.",
            "하지만 그 전에 자신이 무단 선입실했다는 사실은 숨긴다."
          ],
          "suppressions": [
            "자신의 PIN 무단 사용",
            "공간 점유 상태에서 먼저 비켜주지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-2:act:0",
              "factText": "문이 열리며 긴 줄이 한꺼번에 들어온 장면 인식",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                },
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "assert",
                "observe"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-2:context:0",
              "factText": "문틈과 젖은 바닥이 위험을 키웠다는 관찰",
              "tags": [
                "context",
                "harm"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
                }
              },
              "stanceHints": [
                "assert",
                "observe"
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
            "예약된 입실처럼 보이지 않았고 자동줄이 회수되지 않은 채 문틈으로 길게 갔습니다."
          ],
          "privateKnowledge": [
            "상대의 예약 부재를 강하게 말할수록 자신의 선입실도 드러날 수 있다."
          ],
          "suppressions": [
            "자신이 규칙을 지킨 쪽은 아니라는 점",
            "상대를 일방 가해자로 만들고 싶은 마음"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-2:rule:0",
              "factText": "예약 여부가 확인되지 않은 입실이었다는 지적",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                }
              },
              "stanceHints": [
                "suspect",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-2:act:1",
              "factText": "줄이 회수되지 않은 채 길게 뻗었다는 설명",
              "tags": [
                "act",
                "harm"
              ],
              "slots": {
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "suspect",
                "hedge"
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
            "동시 입실과 긴 자동줄이 겹친 건 맞습니다. 그 상태에서 바닥이 젖어 있었으니 위험했습니다."
          ],
          "privateKnowledge": [
            "자신이 먼저 안에 있어 통로를 좁혔다는 점도 안다."
          ],
          "suppressions": [
            "자신의 선입실이 위험을 키운 부분",
            "줄 문제만으로 설명되지 않는 공동 원인"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-2:evidence:0",
              "factText": "동시 입실과 긴 줄이 현장 자료로 확인된다는 주장",
              "tags": [
                "evidence",
                "act"
              ],
              "slots": {
                "guard": {
                  "exact": "오세훈 경비원의 현장 사진과 사고보고 메모",
                  "neutral": "현장 자료"
                },
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-2:harm:0",
              "factText": "젖은 바닥 환경에서 긴 줄이 위험을 키웠다는 설명",
              "tags": [
                "harm",
                "context",
                "threshold"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "제가 먼저 안에 있었더라도 줄을 짧게 잡았으면 그 정도로 얽히진 않았을 겁니다."
          ],
          "privateKnowledge": [
            "자신의 위반을 일부 인정하면서도 상대의 통제 실패를 더 크게 보이게 하고 싶다."
          ],
          "suppressions": [
            "자신이 먼저 들어가 공간을 막은 점",
            "상대에게만 임계 책임을 씌우려는 의도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-2:counter:0",
              "factText": "자신의 선입실과 별개로 줄 관리 실패를 부각하는 말",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "counter",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-2:threshold:0",
              "factText": "줄을 짧게 잡았다면 사고 강도가 달랐을 거라는 추정",
              "tags": [
                "threshold",
                "harm",
                "uncertainty"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "애가 다친 장면이 먼저 남아서 누구라도 놀랐겠지만 문틈으로 길게 들어온 자동줄이 직접적인 위험이었습니다."
          ],
          "privateKnowledge": [
            "자신도 큰 개 보호자라는 이유로 먼저 의심받을까 두려웠다."
          ],
          "suppressions": [
            "상대의 공포 자체는 이해한다는 점",
            "자신 역시 방어적으로 말해 왔다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-2:emotion:0",
              "factText": "반려견 부상 장면이 판단을 흐리게 했다는 이해",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "reflect",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-2:harm:1",
              "factText": "직접 위험 요인이 긴 자동줄이었다는 결론",
              "tags": [
                "harm",
                "evidence"
              ],
              "slots": {
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                },
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
                }
              },
              "stanceHints": [
                "reflect",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "원본 영상과 현장 사진을 보면 예약 없는 동시 입실과 자동줄 방치가 있었다는 건 분명합니다."
          ],
          "privateKnowledge": [
            "공동 책임이지만 상대 쪽 안전수칙 위반이 명확하다는 확신을 갖는다."
          ],
          "suppressions": [
            "자신의 선입실까지 포함한 전체 책임 비율 문제"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-2:evidence:1",
              "factText": "원본 영상과 현장 사진이 동시 입실과 긴 줄을 함께 보여준다는 정리",
              "tags": [
                "evidence",
                "act",
                "rule"
              ],
              "slots": {
                "clip": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                },
                "guard": {
                  "exact": "오세훈 경비원의 현장 사진과 사고보고 메모",
                  "neutral": "현장 자료"
                }
              },
              "stanceHints": [
                "settle",
                "conclude"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-2:responsibility:0",
              "factText": "안전수칙 위반이 사고 위험을 키웠다는 결론",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                },
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "settle",
                "conclude"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "돌던 영상은 제가 본 화면을 급히 보낸 정도지 따로 손댄 원본 왜곡은 아니었습니다."
          ],
          "privateKnowledge": [
            "앞부분을 뺀 19초 전달본이었다.",
            "휴대폰 화면녹화로 다시 저장했다는 점을 안다."
          ],
          "suppressions": [
            "삭제된 앞구간",
            "재생속도와 타임스탬프 차이"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-3:denial:0",
              "factText": "전달본일 뿐 조작본은 아니라는 주장",
              "tags": [
                "denial",
                "evidence",
                "privacy"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-3:context:0",
              "factText": "급히 보여준 상황 설명이었다는 명분",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "source": {
                  "exact": "휴대폰 화면녹화 재인코딩",
                  "neutral": "재저장 흔적"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "원본 전체를 뽑을 권한이 없어서 보이는 장면만 전달한 겁니다. 취지는 상황 설명이었습니다."
          ],
          "privateKnowledge": [
            "권한이 없었다는 말로 편집 책임을 희석하려 한다.",
            "불리한 앞구간이 빠진 건 알고 있다."
          ],
          "suppressions": [
            "원본 확인 전 유포한 점",
            "자신에게 불리한 장면이 삭제된 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-3:rule:0",
              "factText": "원본 추출 권한 부재를 핑계로 드는 설명",
              "tags": [
                "rule",
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "clip": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                }
              },
              "stanceHints": [
                "hedge",
                "redirect"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-3:privacy:0",
              "factText": "보이는 장면만 전달했다는 제한적 표현",
              "tags": [
                "privacy",
                "evidence"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "hedge",
                "redirect"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "앞부분이 빠진 전달본인 건 인정합니다. 그래도 제가 본 핵심 장면을 보여주려던 겁니다."
          ],
          "privateKnowledge": [
            "삭제된 8초에 자신이 먼저 들어간 장면이 있었다.",
            "전달 목적이 자기 방어였다는 걸 안다."
          ],
          "suppressions": [
            "잘린 구간이 책임 판단에 결정적이었다는 점",
            "상대를 먼저 몰아가려는 의도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-3:admission:0",
              "factText": "앞부분이 빠진 전달본이었다는 부분 인정",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                },
                "cut": {
                  "exact": "앞부분 8초 삭제",
                  "neutral": "빠진 앞구간"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-3:motive:0",
              "factText": "핵심 장면이라는 명목으로 자기 방어를 우선했다는 동기",
              "tags": [
                "motive",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "관리사무소 원본이 늦어질 것 같아서 먼저 보낸 겁니다. 서아 씨 행동이 더 직접적으로 보여서 그 부분을 앞세운 겁니다."
          ],
          "privateKnowledge": [
            "속도 조정과 타임스탬프 차이까지 남은 걸 알고 있다.",
            "상대 장면만 강조해 책임 프레임을 만든 사실을 부정하기 어렵다."
          ],
          "suppressions": [
            "편집 효과가 상대를 일방 가해자로 보이게 했다는 점",
            "자신의 선택이 증거절차 위반이라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-3:counter:0",
              "factText": "상대의 장면이 더 직접적이었다며 선택 편집을 정당화하는 말",
              "tags": [
                "counter",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                },
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "blame",
                "justify"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-3:evidence:0",
              "factText": "원본 지연을 이유로 전달본을 먼저 썼다는 설명",
              "tags": [
                "evidence",
                "context",
                "rule"
              ],
              "slots": {
                "clip": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                }
              },
              "stanceHints": [
                "blame",
                "justify"
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
            "그 장면 하나로 상대를 몰아가면 안 됐다는 건 압니다. 다친 개를 봤을 때 저도 겁이 나서 제 쪽 방어부터 했습니다."
          ],
          "privateKnowledge": [
            "상대가 먼저 비난받게 만들면 자신에게 향할 시선이 줄 것이라 계산했다."
          ],
          "suppressions": [
            "사고 직후 죄책감보다 체면 방어가 먼저였다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-3:fear:0",
              "factText": "비난이 자신에게 돌아올까 두려워 방어가 앞섰다는 감정",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "hesitate"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-3:shame:0",
              "factText": "한 장면으로 상대를 몰아간 선택을 부끄러워함",
              "tags": [
                "shame",
                "responsibility"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "emotional",
                "hesitate"
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
            "돌아다닌 19초 파일은 원본이 아니었습니다. 앞부분을 빼고 속도와 타임스탬프까지 달라진 전달본을 제가 돌렸습니다."
          ],
          "privateKnowledge": [
            "편집본 제출이 증거절차를 크게 어겼다는 점까지 인정한다."
          ],
          "suppressions": [
            "상대의 잘못이 있어도 위조본 유포는 별개라는 결론"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-3:admission:1",
              "factText": "짧은 클립이 원본이 아니라는 시인",
              "tags": [
                "admission",
                "evidence",
                "privacy"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                },
                "clip_original": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-3:responsibility:0",
              "factText": "삭제와 속도 조정, 타임스탬프 교체가 있었다는 인정",
              "tags": [
                "responsibility",
                "evidence"
              ],
              "slots": {
                "cut": {
                  "exact": "앞부분 8초 삭제",
                  "neutral": "빠진 앞구간"
                },
                "edit": {
                  "exact": "0.85배 속도 조정과 타임스탬프 교체",
                  "neutral": "편집 흔적"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "제 개가 직접 문 건 아닙니다. 상처 위치부터가 그렇게 보이지 않았습니다."
          ],
          "privateKnowledge": [
            "정확한 직접 원인은 당시 자신도 몰랐다.",
            "하지만 물림으로 굳어지면 보호자 자격 전체가 흔들린다고 느낀다."
          ],
          "suppressions": [
            "자신이 먼저 공간을 점유한 점",
            "으르렁거림이 공포를 키웠다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-4:denial:0",
              "factText": "직접 물림은 아니었다는 즉각 반박",
              "tags": [
                "denial",
                "harm"
              ],
              "slots": {
                "wound": {
                  "exact": "앞발 패드 열상",
                  "neutral": "핵심 상처"
                },
                "ear": {
                  "exact": "귀 표면 찰과상",
                  "neutral": "얕은 상처"
                }
              },
              "stanceHints": [
                "deny",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-4:fear:0",
              "factText": "큰 개 보호자라는 낙인이 두려워 선을 긋는 태도",
              "tags": [
                "fear",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "deny",
                "assert"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "귀 쪽은 스친 수준이었고 결정적인 건 발 쪽처럼 보여서 물림 단정은 어렵습니다."
          ],
          "privateKnowledge": [
            "자신도 발 상처가 더 크다는 인상만 있었지 메커니즘은 몰랐다."
          ],
          "suppressions": [
            "현장 당시 개가 으르렁거렸다는 점",
            "상대가 왜 물림으로 느꼈는지 이해한 부분"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-4:harm:0",
              "factText": "귀보다 발 부위 손상이 핵심처럼 보였다는 관찰",
              "tags": [
                "harm",
                "uncertainty"
              ],
              "slots": {
                "ear": {
                  "exact": "귀 표면 찰과상",
                  "neutral": "얕은 상처"
                },
                "wound": {
                  "exact": "앞발 패드 열상",
                  "neutral": "핵심 상처"
                }
              },
              "stanceHints": [
                "hedge",
                "observe"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-4:uncertainty:0",
              "factText": "물림 단정은 어렵다는 신중한 표현",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "medical": {
                  "exact": "24시동물메디컬센터 상처도면과 진료소견",
                  "neutral": "병원 기록"
                }
              },
              "stanceHints": [
                "hedge",
                "observe"
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
            "병원 기록을 보면 물림보다 끌림과 마찰에 가까운 양상입니다."
          ],
          "privateKnowledge": [
            "자신에게 유리한 부분이지만 의료기록이 가장 설득력 있다는 점을 안다."
          ],
          "suppressions": [
            "자신의 선입실이 원인 구조를 만든 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-4:evidence:0",
              "factText": "병원 기록이 상처 양상을 물림보다 마찰로 본다는 설명",
              "tags": [
                "evidence",
                "harm",
                "institution"
              ],
              "slots": {
                "medical": {
                  "exact": "24시동물메디컬센터 상처도면과 진료소견",
                  "neutral": "병원 기록"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-4:harm:1",
              "factText": "핵심 손상이 발 패드 쪽에 집중됐다는 정리",
              "tags": [
                "harm",
                "context"
              ],
              "slots": {
                "wound": {
                  "exact": "앞발 패드 열상",
                  "neutral": "핵심 상처"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
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
            "으르렁거림과 피 때문에 다들 물림으로 받아들였겠지만 실제 손상은 줄과 레일 쪽이 더 설명됩니다."
          ],
          "privateKnowledge": [
            "공포 장면이 상대를 밀어붙였다는 점은 인정한다.",
            "그러나 자신의 개 공격성 프레임은 반드시 막고 싶다."
          ],
          "suppressions": [
            "자신이 먼저 안에 있었다는 점",
            "공동 책임 구조"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-4:context:0",
              "factText": "공포 장면이 인식을 물림으로 몰았다는 해석",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "ear": {
                  "exact": "귀 표면 찰과상",
                  "neutral": "얕은 상처"
                }
              },
              "stanceHints": [
                "counter",
                "context"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "neighbor03:a:d-4:counter:0",
              "factText": "실제 직접 원인은 줄과 레일 쪽이라는 반박",
              "tags": [
                "counter",
                "evidence",
                "harm"
              ],
              "slots": {
                "cause": {
                  "exact": "배수구 철망과 문하부 레일에 걸린 마찰",
                  "neutral": "그 직접 원인"
                }
              },
              "stanceHints": [
                "counter",
                "context"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "그때 누구라도 큰 개를 의심했을 장면이었지만 그 프레임 때문에 원인이 잘못 굳었습니다."
          ],
          "privateKnowledge": [
            "자신도 상대의 공포를 이해하지만 억울함이 크다."
          ],
          "suppressions": [
            "상대의 잘못만 강조하던 태도",
            "자신 역시 방어적으로만 말해 온 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-4:emotion:0",
              "factText": "큰 개 프레임이 먼저 굳은 데 대한 억울함",
              "tags": [
                "emotion",
                "identity",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "reflect",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-4:context:1",
              "factText": "장면 프레임이 직접 원인 판단을 왜곡했다는 설명",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "reflect",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "원본 영상과 진료소견을 합치면 직접 원인은 물림이 아니라 자동줄과 배수구 철망, 문하부 레일에 걸린 마찰 열상입니다."
          ],
          "privateKnowledge": [
            "공동 원인 구조 속에서도 물림 프레임은 정정돼야 한다는 확신이 있다."
          ],
          "suppressions": [
            "자신의 선입실 책임 비율 문제는 별도로 남는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-4:evidence:1",
              "factText": "원본 영상과 진료소견이 직접 원인을 마찰 열상으로 수렴시킨다는 결론",
              "tags": [
                "evidence",
                "harm",
                "institution"
              ],
              "slots": {
                "clip": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                },
                "medical": {
                  "exact": "24시동물메디컬센터 상처도면과 진료소견",
                  "neutral": "병원 기록"
                }
              },
              "stanceHints": [
                "conclude",
                "settle"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-4:responsibility:0",
              "factText": "물림 단정과 직접 원인 판단은 분리해야 한다는 정리",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "cause": {
                  "exact": "배수구 철망과 문하부 레일에 걸린 마찰",
                  "neutral": "그 직접 원인"
                }
              },
              "stanceHints": [
                "conclude",
                "settle"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
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
            "절차를 먼저 깬 사람으로 몰릴 정도는 아닙니다. 사고가 난 뒤 영상부터 확인하려 한 것뿐입니다."
          ],
          "privateKnowledge": [
            "예전에 예약 후 단독 이용, 원본만 보기로 한 약속을 안다.",
            "자신이 먼저 직원 PIN으로 들어갔다는 점을 숨긴다."
          ],
          "suppressions": [
            "관리사무소보다 먼저 움직인 순서",
            "원본이 아닌 전달본을 돌린 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-5:denial:0",
              "factText": "절차 전체를 깬 건 아니라는 주장",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-5:context:0",
              "factText": "사고 직후 상황 확인이 먼저였다는 명분",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "그날은 비도 많이 왔고 마감 직전이라 예외가 겹친 겁니다. 절차 위반이라고 단정하긴 어렵습니다."
          ],
          "privateKnowledge": [
            "예외를 강조할수록 과거 합의가 선명해진다는 걸 안다."
          ],
          "suppressions": [
            "예약 후 단독 이용 약속",
            "원본만 보기로 했던 합의"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-5:rule:0",
              "factText": "날씨와 마감 상황을 들어 절차 위반을 흐리는 설명",
              "tags": [
                "rule",
                "context",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "hedge",
                "redirect"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:a:d-5:legacy_sentence:0",
              "factText": "이전 합의가 있었다는 사실을 직접 말하지 않는 회피",
              "tags": [
                "legacy_sentence",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "redirect"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "예약을 잡지 않고 먼저 들어간 건 맞습니다. 다만 사고 직후엔 상황 파악이 먼저라고 생각했습니다."
          ],
          "privateKnowledge": [
            "원본 확인 전 전달본을 돌린 일도 이어졌다.",
            "자신이 순서를 어겼다는 자각이 있다."
          ],
          "suppressions": [
            "선입실과 전달본 유포가 연결된 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-5:admission:0",
              "factText": "예약 없이 먼저 들어갔다는 부분 인정",
              "tags": [
                "admission",
                "rule",
                "act"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                },
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "partial",
                "context"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-5:context:1",
              "factText": "상황 파악을 이유로 절차를 뒤로 미뤘다는 설명",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "partial",
                "context"
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
            "서아 씨도 원본 확인 전에 단체방부터 돌렸습니다. 절차가 무너진 건 둘 다였습니다."
          ],
          "privateKnowledge": [
            "공동 위반을 말하면 자신의 시작 위반이 희석된다고 계산한다."
          ],
          "suppressions": [
            "자신이 먼저 경계를 무너뜨린 선행성",
            "상대의 메시지를 이용해 균형 맞추려는 의도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-5:counter:0",
              "factText": "상대의 단체방 지목을 끌어와 공동 위반을 강조",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                },
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-5:rule:1",
              "factText": "원본 확인 절차가 양쪽 모두 무너졌다는 주장",
              "tags": [
                "rule",
                "relationship"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "제가 먼저 규칙 경계를 흐린 탓에 이후 확인 절차도 거칠어졌다는 건 압니다."
          ],
          "privateKnowledge": [
            "자신의 선입실이 이후 유포와 추궁의 문을 열었다는 죄책감이 있다."
          ],
          "suppressions": [
            "상대만 탓하며 버티고 싶은 마음",
            "직원 권한 이미지가 무너지는 두려움"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-5:shame:0",
              "factText": "처음 경계를 흐린 쪽이 자신이었다는 자책",
              "tags": [
                "shame",
                "responsibility"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "emotional",
                "reflect"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:a:d-5:relationship:0",
              "factText": "자신의 선행 위반이 이후 절차 붕괴를 불렀다는 인식",
              "tags": [
                "relationship",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "emotional",
                "reflect"
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
            "예약·원본 확인 절차를 둘 다 어겼고 시작은 제가 직원 PIN으로 먼저 들어간 데서 열렸습니다."
          ],
          "privateKnowledge": [
            "공동 책임을 말하더라도 자신의 시작 책임을 먼저 인정해야 한다고 받아들인다."
          ],
          "suppressions": [
            "상대의 위반도 남지만 자신의 선행 책임이 크다는 결론"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:a:tell:rule_buffer",
            "neighbor03:a:tell:timestamp_chain",
            "neighbor03:a:tell:affect_freeze"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:a:d-5:admission:1",
              "factText": "직원 PIN 선입실이 절차 붕괴의 시작이었다는 시인",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                },
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:a:d-5:relationship:1",
              "factText": "이후 원본 확인과 메시지 순서까지 모두 꼬이게 만들었다는 인정",
              "tags": [
                "relationship",
                "responsibility"
              ],
              "slots": {
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
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
            "그 시간에 문이 그냥 열릴 수는 없었어요. 누가 일반 예약 말고 다른 방식으로 연 것 같았습니다."
          ],
          "privateKnowledge": [
            "안에 현우가 먼저 있었다는 건 안다.",
            "하지만 자신도 예약 없이 문을 열었다는 점은 숨긴다."
          ],
          "suppressions": [
            "자신의 동시 입실",
            "현우의 선입실을 보고도 멈추지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-1:rule:0",
              "factText": "정상 예약과 다른 방식의 출입이 있었을 것이라는 추정",
              "tags": [
                "rule",
                "uncertainty",
                "identity"
              ],
              "slots": {
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "suspect",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-1:timeline:0",
              "factText": "상대가 이미 안쪽에 있었다는 초기 인식",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "suspect",
                "assert"
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
            "관리 승인 시간도 아니었는데 이미 현우 씨가 안에서 움직이고 있었어요. 정상 입실처럼 보이지 않았습니다."
          ],
          "privateKnowledge": [
            "그 문이 먼저 열리지 않았다면 자신도 그렇게 급히 들어오지 않았을 거라 느낀다."
          ],
          "suppressions": [
            "자신 역시 규칙을 지키지 않았다는 점",
            "상대를 출발점으로만 만들고 싶은 마음"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-1:timeline:1",
              "factText": "상대가 먼저 안에 있었다는 관찰",
              "tags": [
                "timeline",
                "identity",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "assert",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-1:rule:1",
              "factText": "정상 입실 절차와 달라 보였다는 평가",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "assert",
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "출입 로그까지 보면 직원용 PIN 같은 예외 코드가 쓰인 거잖아요."
          ],
          "privateKnowledge": [
            "직접 본 건 아니지만 로그가 자신의 의심을 뒷받침한다고 본다."
          ],
          "suppressions": [
            "자신도 함께 절차를 어겼다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-1:evidence:0",
              "factText": "출입 로그가 예외 코드 사용을 가리킨다는 주장",
              "tags": [
                "evidence",
                "identity",
                "institution"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                },
                "time": {
                  "exact": "사고 4분 전 사용 기록",
                  "neutral": "그 시점의 사용 기록",
                  "period": "마감 직전 제한 시간"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-1:responsibility:0",
              "factText": "상대의 선입실이 출발점이라는 판단",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "그 문이 먼저 안 열렸으면 저는 그렇게 급히 문을 밀지도 않았을 거예요."
          ],
          "privateKnowledge": [
            "자신의 panic과 규칙 위반을 상대의 선행 위반으로 덮고 싶다."
          ],
          "suppressions": [
            "자신이 멈출 기회가 있었던 점",
            "공동 책임 구조"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-1:counter:0",
              "factText": "상대의 선입실이 자신의 행동을 유발했다는 말",
              "tags": [
                "counter",
                "context",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                },
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "counter",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-1:threshold:0",
              "factText": "출발점이 달랐으면 사고 강도가 달라졌을 거라는 추정",
              "tags": [
                "threshold",
                "uncertainty",
                "harm"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "그 장면이 억울해서 자꾸 다친 애만 붙들고 있었지만 출발점이 이상했다는 느낌은 처음부터 있었어요."
          ],
          "privateKnowledge": [
            "반려견 부상이 너무 커서 절차 판단이 뒤로 밀렸다는 걸 안다."
          ],
          "suppressions": [
            "자신이 감정부터 앞세웠다는 점",
            "원본 확인 전에 사람들부터 붙잡은 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-1:emotion:0",
              "factText": "반려견 부상 때문에 판단보다 억울함이 먼저였다는 고백",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "reflect"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-1:context:0",
              "factText": "출발점 자체가 정상적이지 않았다는 지속된 의심",
              "tags": [
                "context",
                "rule"
              ],
              "slots": {
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "emotional",
                "reflect"
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
            "현우 씨가 청소용역 임시 PIN으로 먼저 들어간 게 맞습니다. 그게 공용공간 경계를 무너뜨린 시작이었습니다."
          ],
          "privateKnowledge": [
            "자신의 위반과 별개로 상대의 선행 위반은 분명하다고 본다."
          ],
          "suppressions": [
            "공동 책임 비율 문제는 남는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-1:evidence:1",
              "factText": "상대의 청소용역 임시 PIN 사용이 확인됐다는 정리",
              "tags": [
                "evidence",
                "identity",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                },
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "conclude",
                "settle"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-1:responsibility:1",
              "factText": "공용공간 경계를 먼저 무너뜨린 시작점이라는 결론",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "conclude",
                "settle"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
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
            "저는 문만 조금 연 거예요. 안에 누가 그렇게 가까이 서 있을 줄은 몰랐어요."
          ],
          "privateKnowledge": [
            "예약 없이 문을 열었다.",
            "자동줄을 짧게 회수하지 못했다."
          ],
          "suppressions": [
            "문이 열리자마자 줄이 길게 들어간 점",
            "안에 누군가 있는 걸 보고도 멈추지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-2:denial:0",
              "factText": "입실이 잠깐 열어본 수준이었다는 축소",
              "tags": [
                "denial",
                "act",
                "context"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-2:uncertainty:0",
              "factText": "안쪽 상황을 몰랐다는 식의 거리 두기",
              "tags": [
                "uncertainty",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
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
            "잠깐 비 피하려던 거였고 줄도 완전히 푼 건 아니었어요. 너무 순식간이었어요."
          ],
          "privateKnowledge": [
            "바닥이 젖어 있어 위험하다는 점을 봤다.",
            "그럼에도 줄을 바로 감지 못했다."
          ],
          "suppressions": [
            "동시 입실 자체",
            "예약 부재"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-2:context:0",
              "factText": "비를 피하려 했다는 상황 설명",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
                }
              },
              "stanceHints": [
                "hedge",
                "self_protect"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-2:act:0",
              "factText": "줄을 완전히 푼 건 아니라며 위험 강도를 낮추는 말",
              "tags": [
                "act",
                "denial",
                "harm"
              ],
              "slots": {
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "hedge",
                "self_protect"
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
            "예약 없이 문을 연 건 맞아요. 그런데 그때 애가 울어서 줄을 바로 못 감았어요."
          ],
          "privateKnowledge": [
            "이미 안에 사람이 있다는 걸 보자 더 당황했다.",
            "동시 입실이 규정 위반이라는 건 안다."
          ],
          "suppressions": [
            "문을 닫고 다시 나갔어야 했다는 점",
            "줄 회수 실패가 직접 위험이 된 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-2:admission:0",
              "factText": "예약 없이 문을 열었다는 부분 인정",
              "tags": [
                "admission",
                "rule",
                "act"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-2:emotion:0",
              "factText": "반려견 울음 때문에 줄을 바로 회수하지 못했다는 설명",
              "tags": [
                "emotion",
                "harm",
                "self_justification"
              ],
              "slots": {
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "이미 안쪽에 사람이 서 있는 줄 몰랐고 먼저 들어와 있던 쪽이 한 발만 비켜줬어도 덜 꼬였을 거예요."
          ],
          "privateKnowledge": [
            "자신의 panic을 상대의 공간 점유와 엮어 책임을 나누고 싶다."
          ],
          "suppressions": [
            "멈출 수 있었던 자기 선택",
            "줄을 짧게 잡지 못한 자신의 직접 과실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-2:counter:0",
              "factText": "상대의 선입실과 공간 점유를 끌어와 책임을 나누는 말",
              "tags": [
                "counter",
                "context",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-2:threshold:0",
              "factText": "상대가 비켜줬다면 얽힘 정도가 달랐을 거라는 추정",
              "tags": [
                "threshold",
                "uncertainty",
                "harm"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
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
            "제가 놀라서 줄을 짧게 못 잡은 건 맞아요. 애가 비명을 지르니까 머리가 하얘졌어요."
          ],
          "privateKnowledge": [
            "자신이 기본 안전수칙을 놓친 걸 인정한다.",
            "작은 개 보호자라는 편견이 두려워 더 방어적이었다."
          ],
          "suppressions": [
            "규칙을 몰랐던 게 아니라 놓쳤다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-2:shame:0",
              "factText": "줄을 짧게 못 잡은 자신을 부끄러워하는 감정",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-2:admission:1",
              "factText": "기본 안전수칙을 놓쳤다는 인정",
              "tags": [
                "admission",
                "responsibility",
                "rule"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                },
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "예약 없이 동시 입실했고 자동줄도 길게 둔 게 사실입니다. 그 상태가 사고 위험을 키웠어요."
          ],
          "privateKnowledge": [
            "공포 때문에 먼저 숨겼지만 자기 과실을 인정한다."
          ],
          "suppressions": [
            "상대의 선입실 책임도 남지만 자신의 안전수칙 위반이 분명하다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-2:admission:2",
              "factText": "예약 없는 동시 입실과 긴 자동줄 방치를 시인",
              "tags": [
                "admission",
                "act",
                "rule"
              ],
              "slots": {
                "entry": {
                  "exact": "예약 없는 동시 입실",
                  "neutral": "그 입실 방식"
                },
                "leash": {
                  "exact": "회수되지 않은 자동줄",
                  "neutral": "그 줄"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-2:responsibility:0",
              "factText": "그 상태가 사고 위험을 키웠다는 결론",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "surface": {
                  "exact": "젖은 바닥과 문틈",
                  "neutral": "그 환경"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "돌던 영상은 처음부터 너무 짧았어요. 딱 저만 나쁘게 보이는 장면만 있었어요."
          ],
          "privateKnowledge": [
            "원본이 아니라는 직감이 있었다.",
            "하지만 자신도 원본 확인 전 그 영상 프레임을 따라 말해 버렸다."
          ],
          "suppressions": [
            "자신의 단체방 지목 메시지",
            "영상만 보고 원인을 단정한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-3:uncertainty:0",
              "factText": "영상 길이가 지나치게 짧아 원본 같지 않았다는 감각",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "suspect",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-3:harm:0",
              "factText": "자신만 나쁘게 보이는 프레임이 먼저 씌워졌다는 상처",
              "tags": [
                "harm",
                "emotion",
                "privacy"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "suspect",
                "hurt"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "원본이면 왜 문 열리기 전이 없겠어요. 제가 본 건 누가 잘라 돌린 전달본 같았습니다."
          ],
          "privateKnowledge": [
            "잘린 앞구간이 있을 거라 의심한다."
          ],
          "suppressions": [
            "자신도 그 전달본을 근거로 현우를 몰아붙인 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-3:evidence:0",
              "factText": "문 열리기 전 구간 부재가 비정상이라는 의심",
              "tags": [
                "evidence",
                "context",
                "uncertainty"
              ],
              "slots": {
                "cut": {
                  "exact": "앞부분 8초 삭제",
                  "neutral": "빠진 앞구간"
                }
              },
              "stanceHints": [
                "assert",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-3:privacy:0",
              "factText": "누가 잘라 돌린 전달본 같다는 표현",
              "tags": [
                "privacy",
                "evidence"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "assert",
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
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "포렌식 전이라도 화면녹화 흔적이 보였고 타임스탬프도 이상했습니다."
          ],
          "privateKnowledge": [
            "자세한 편집 방식은 몰라도 정상 서버 원본과 달라 보인다고 느꼈다."
          ],
          "suppressions": [
            "자신이 그 이상함을 확인하고도 감정적으로 먼저 반응한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-3:evidence:1",
              "factText": "화면녹화 재인코딩 흔적과 이상한 타임스탬프를 짚는 말",
              "tags": [
                "evidence",
                "privacy"
              ],
              "slots": {
                "source": {
                  "exact": "휴대폰 화면녹화 재인코딩",
                  "neutral": "재저장 흔적"
                },
                "edit": {
                  "exact": "0.85배 속도 조정과 타임스탬프 교체",
                  "neutral": "편집 흔적"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-3:context:0",
              "factText": "정상 서버 원본과 달라 보였다는 설명",
              "tags": [
                "context",
                "institution"
              ],
              "slots": {
                "clip": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                }
              },
              "stanceHints": [
                "evidence",
                "assert"
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
            "그 영상이 제 panic 장면만 남겨서 제가 먼저 가해자처럼 굳어졌어요."
          ],
          "privateKnowledge": [
            "자신의 panic이 실제로 위험을 키운 부분도 있지만 그 프레임이 과장됐다고 느낀다."
          ],
          "suppressions": [
            "자신의 규칙 위반",
            "상대의 편집 의도에 기대 책임을 덜고 싶은 마음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-3:harm:1",
              "factText": "panic 장면만 남아 자기 책임이 과장됐다는 인식",
              "tags": [
                "harm",
                "emotion",
                "counter"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "hurt",
                "counter"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-3:counter:0",
              "factText": "편집이 책임 프레임을 한쪽으로 고정했다는 비판",
              "tags": [
                "counter",
                "evidence",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "hurt",
                "counter"
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
            "다친 애를 안고 있는데 잘린 영상까지 돌자 진짜 숨이 막혔어요."
          ],
          "privateKnowledge": [
            "자신이 더 크게 놀라 군중의 판단에 휩쓸렸다는 걸 안다."
          ],
          "suppressions": [
            "원본 확인보다 감정 호소부터 한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-3:emotion:0",
              "factText": "부상 직후 잘린 영상이 돌며 압박감을 키웠다는 감정",
              "tags": [
                "emotion",
                "harm",
                "privacy"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "emotional",
                "reflect"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-3:responsibility:0",
              "factText": "군중 판단이 자신과 상대 모두를 왜곡했다는 자각",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "emotional",
                "reflect"
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
            "19초 클립은 원본이 아니었습니다. 앞부분이 빠지고 속도랑 타임스탬프까지 바뀐 위조 전달본이었어요."
          ],
          "privateKnowledge": [
            "원본과 전달본을 구분해야 한다는 교훈을 강하게 느낀다."
          ],
          "suppressions": [
            "자신도 원본 확인 전 메시지를 보낸 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-3:evidence:2",
              "factText": "짧은 클립이 앞구간 삭제와 속도·타임스탬프 변경이 있는 전달본이라는 결론",
              "tags": [
                "evidence",
                "privacy",
                "institution"
              ],
              "slots": {
                "clip": {
                  "exact": "19초 전달본",
                  "neutral": "그 영상"
                },
                "cut": {
                  "exact": "앞부분 8초 삭제",
                  "neutral": "빠진 앞구간"
                },
                "edit": {
                  "exact": "0.85배 속도 조정과 타임스탬프 교체",
                  "neutral": "편집 흔적"
                }
              },
              "stanceHints": [
                "conclude",
                "settle"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-3:rule:0",
              "factText": "원본 확인 없는 유포는 별도로 제재돼야 한다는 인식",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "clip": {
                  "exact": "원본 CCTV 4분 추출본",
                  "neutral": "원본 영상"
                }
              },
              "stanceHints": [
                "conclude",
                "settle"
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
            "그때는 분명 물린 줄 알았어요. 큰 개가 으르렁거렸고 우리 애 귀에 피가 있었어요."
          ],
          "privateKnowledge": [
            "직접 이빨이 닿는 순간은 못 봤다.",
            "발 패드 쪽 손상이 더 크다는 점도 나중에 떠올린다."
          ],
          "suppressions": [
            "핵심 상처가 발 쪽이라는 점",
            "자신이 장면을 원인으로 곧바로 단정한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-4:harm:0",
              "factText": "귀에 피가 보여 물림으로 받아들인 첫 인식",
              "tags": [
                "harm",
                "emotion",
                "uncertainty"
              ],
              "slots": {
                "ear": {
                  "exact": "귀 표면 찰과상",
                  "neutral": "얕은 상처"
                }
              },
              "stanceHints": [
                "deny",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "neighbor03:b:d-4:fear:0",
              "factText": "큰 개 으르렁거림이 판단을 물림 쪽으로 몰았다는 공포",
              "tags": [
                "fear",
                "emotion",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "deny",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "제가 직접 입 안을 본 건 아니어도 장면이 너무 그렇게 보였어요. 누구라도 물림으로 생각했을 거예요."
          ],
          "privateKnowledge": [
            "직접 본 장면과 추정이 섞였다는 걸 안다."
          ],
          "suppressions": [
            "추정을 사실처럼 말해 온 점",
            "발 상처의 형태"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-4:uncertainty:0",
              "factText": "직접 본 순간은 없지만 물림처럼 느꼈다는 설명",
              "tags": [
                "uncertainty",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "self_protect"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-4:context:0",
              "factText": "장면 전체가 물림 인상을 줬다는 정당화",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "ear": {
                  "exact": "귀 표면 찰과상",
                  "neutral": "얕은 상처"
                }
              },
              "stanceHints": [
                "hedge",
                "self_protect"
              ],
              "usableInSubActions": [
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
            "병원에서 발 상처 모양을 보더니 물림이 아닐 수도 있다고 하셨어요. 그래도 저는 그때 너무 무서워서 그렇게 믿었습니다."
          ],
          "privateKnowledge": [
            "의료기록이 자신의 단정을 흔든다.",
            "공포 때문에 첫 프레임을 놓지 못했다."
          ],
          "suppressions": [
            "자신이 물림 단정을 반복해 퍼뜨린 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-4:admission:0",
              "factText": "병원에서 물림이 아닐 수 있다고 들었다는 부분 인정",
              "tags": [
                "admission",
                "evidence",
                "institution"
              ],
              "slots": {
                "medical": {
                  "exact": "24시동물메디컬센터 상처도면과 진료소견",
                  "neutral": "병원 기록"
                },
                "wound": {
                  "exact": "앞발 패드 열상",
                  "neutral": "핵심 상처"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-4:fear:1",
              "factText": "공포 때문에 첫 믿음을 놓지 못했다는 고백",
              "tags": [
                "fear",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "귀에 난 피와 으르렁거림이 먼저 보여서 제가 물림으로 몰아간 건 있어요. 하지만 그 장면을 만든 동선은 현우 씨 쪽도 컸어요."
          ],
          "privateKnowledge": [
            "자신의 단정이 틀릴 수 있음을 알면서도 책임을 나누고 싶다."
          ],
          "suppressions": [
            "자신의 동시 입실과 자동줄 문제",
            "상대를 더 큰 가해자로 남기고 싶은 마음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-4:admission:1",
              "factText": "자신이 물림 프레임을 앞세웠다는 인정",
              "tags": [
                "admission",
                "responsibility",
                "harm"
              ],
              "slots": {
                "ear": {
                  "exact": "귀 표면 찰과상",
                  "neutral": "얕은 상처"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-4:counter:0",
              "factText": "그 장면을 만든 동선 책임을 상대에게 돌리는 말",
              "tags": [
                "counter",
                "context",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "애가 비명을 지르는 걸 보고 제가 원인을 확인하기보다 먼저 물렸다고 붙잡았어요. 그게 제 실수였어요."
          ],
          "privateKnowledge": [
            "반려견을 지키지 못했다는 죄책감이 크다."
          ],
          "suppressions": [
            "원본 확인 전 단정한 말들을 퍼뜨린 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-4:shame:0",
              "factText": "원인 확인보다 물림 단정이 먼저였던 자신을 자책",
              "tags": [
                "shame",
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-4:admission:2",
              "factText": "원인 판단 절차를 놓친 실수 인정",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "직접 원인은 물림이 아니라 자동줄이 배수구 철망과 문하부 레일에 걸린 마찰 열상이었습니다. 제가 그걸 물림으로 단정해 말했습니다."
          ],
          "privateKnowledge": [
            "직접 원인을 바로잡아야 한다는 데 동의한다."
          ],
          "suppressions": [
            "상대의 선입실과 자신의 동시 입실이 함께 만든 구조라는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-4:admission:3",
              "factText": "직접 원인이 물림이 아니었다는 시인",
              "tags": [
                "admission",
                "harm",
                "evidence"
              ],
              "slots": {
                "cause": {
                  "exact": "배수구 철망과 문하부 레일에 걸린 마찰",
                  "neutral": "그 직접 원인"
                },
                "wound": {
                  "exact": "앞발 패드 열상",
                  "neutral": "핵심 상처"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-4:responsibility:0",
              "factText": "자신이 물림 단정을 퍼뜨린 책임 인정",
              "tags": [
                "responsibility",
                "emotion"
              ],
              "slots": {
                "medical": {
                  "exact": "24시동물메디컬센터 상처도면과 진료소견",
                  "neutral": "병원 기록"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
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
            "전 원본도 못 본 채 애부터 안고 있었어요. 절차를 어기려고 한 게 아니라 너무 급했던 거예요."
          ],
          "privateKnowledge": [
            "원본 확인 전 현우를 지목하는 메시지를 먼저 보냈다.",
            "예약 여부도 확인하지 않았다."
          ],
          "suppressions": [
            "관리사무소보다 단체방이 먼저였던 점",
            "자신도 절차 위반 당사자라는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-5:denial:0",
              "factText": "절차 위반 의도가 아니라 급박함이었다는 주장",
              "tags": [
                "denial",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "deny",
                "self_protect"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor03:b:d-5:harm:0",
              "factText": "부상한 반려견을 먼저 안고 있었다는 장면 고정",
              "tags": [
                "harm",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "deny",
                "self_protect"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "관리사무소에 바로 못 간 건 쇼크 때문이었어요. 단체방도 도움 받으려고 보낸 거지 절차 무시는 아니었어요."
          ],
          "privateKnowledge": [
            "단체방 지목이 도움 요청만은 아니었다.",
            "현우를 먼저 특정하면 여론이 자신 쪽에 설 거라 생각했다."
          ],
          "suppressions": [
            "원본 요청보다 11분 빨랐던 메시지",
            "도움 요청보다 비난이 먼저였던 문장"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-5:emotion:0",
              "factText": "쇼크 때문에 순서를 놓쳤다는 설명",
              "tags": [
                "emotion",
                "self_justification"
              ],
              "slots": {
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "hedge",
                "justify"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "neighbor03:b:d-5:privacy:0",
              "factText": "단체방 발신을 도움 요청으로 축소하는 말",
              "tags": [
                "privacy",
                "denial",
                "context"
              ],
              "slots": {
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "hedge",
                "justify"
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
            "원본 확인 전 메시지를 보낸 건 맞아요. 그때는 애 상태가 먼저여서 생각이 짧았습니다."
          ],
          "privateKnowledge": [
            "자신이 순서를 어겼다는 걸 인정한다.",
            "원본 확인이 늦어진 데 자기 몫이 있다는 걸 안다."
          ],
          "suppressions": [
            "현우를 특정하는 표현이 빨랐던 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-5:admission:0",
              "factText": "원본 확인 전 메시지 발신을 인정",
              "tags": [
                "admission",
                "privacy",
                "rule"
              ],
              "slots": {
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "partial",
                "shame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-5:shame:0",
              "factText": "부상한 반려견 때문에 판단 순서를 놓쳤다는 자책",
              "tags": [
                "shame",
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "shame"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "하지만 현우 씨도 예약 규칙을 깨고 먼저 들어갔잖아요. 절차 위반을 저만 한 것처럼 볼 수는 없어요."
          ],
          "privateKnowledge": [
            "공동 위반 구조를 내세워 자신의 부끄러움을 덜고 싶다."
          ],
          "suppressions": [
            "자신의 메시지가 여론을 흔든 점",
            "상대의 위반을 방패로 쓰는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-5:counter:0",
              "factText": "상대의 선입실을 끌어와 자기 위반을 상쇄하려는 말",
              "tags": [
                "counter",
                "responsibility",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                },
                "code": {
                  "exact": "청소용역 임시 PIN",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-5:relationship:0",
              "factText": "절차 위반이 한쪽만의 일이 아니었다는 주장",
              "tags": [
                "relationship",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "놀란 마음으로 사람들한테 먼저 말부터 한 게 부끄럽습니다. 애 상처를 본 순간 순서를 놓쳤어요."
          ],
          "privateKnowledge": [
            "작은 개 보호자라는 편견이 두려워 더 크게 호소했다."
          ],
          "suppressions": [
            "상대를 먼저 지목해 버린 문장들"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-5:emotion:1",
              "factText": "놀란 마음이 메시지 순서를 무너뜨렸다는 고백",
              "tags": [
                "emotion",
                "harm",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "진서아",
                  "neutral": "상대방",
                  "fullName": "진서아",
                  "judgeRef": "서아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "neighbor03:b:d-5:shame:1",
              "factText": "사람들에게 먼저 말부터 한 행동을 부끄러워함",
              "tags": [
                "shame",
                "privacy",
                "responsibility"
              ],
              "slots": {
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
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
            "저도 예약·원본 확인 절차를 어겼습니다. 원본 요청 전에 단체방에서 현우 씨를 먼저 지목한 게 사실입니다."
          ],
          "privateKnowledge": [
            "공동 책임이지만 자신의 메시지 책임을 인정한다."
          ],
          "suppressions": [
            "상대의 선입실 책임과 별개로 자기 몫의 절차 위반"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor03:b:tell:injury_loop",
            "neighbor03:b:tell:tiny_words",
            "neighbor03:b:tell:blame_echo"
          ],
          "claimAtoms": [
            {
              "id": "neighbor03:b:d-5:admission:1",
              "factText": "예약·원본 확인 절차를 어겼다는 시인",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "예약 후 단독 이용 및 원본 확인 절차",
                  "neutral": "그 절차"
                },
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor03:b:d-5:privacy:1",
              "factText": "단체방에서 상대를 먼저 지목한 사실 인정",
              "tags": [
                "privacy",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "강현우",
                  "neutral": "상대방",
                  "fullName": "강현우",
                  "judgeRef": "현우 씨"
                },
                "message": {
                  "exact": "원본 요청 11분 전 단체방 지목 메시지",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "confess",
                "accept"
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

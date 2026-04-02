export const spouse04V2Atoms = {
  "caseId": "spouse-04",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "그날은 정말 작업실 쪽에서 급한 연락이 와서 먼저 움직일 수밖에 없었습니다."
          ],
          "privateKnowledge": [
            "실제 긴급 납품 일정은 없었고, 저는 작업실에서 바로 어머니 아파트로 가 시계 케이스를 찾으러 갔습니다."
          ],
          "suppressions": [
            "어머니와 미리 물건 수령 약속을 잡아 둔 사실",
            "다은에게 보낸 '클라이언트 긴급 호출' 문자가 핑계였다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-1:denial:0",
              "factText": "그날은 정말 작업실 쪽에서 급한 연락이 와서 먼저 움직일 수밖에 없었습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
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
            "클라이언트 호출까지는 아니어도 작업실에서 급하게 정리할 일이 있었고, 바로 끝낼 생각이었습니다."
          ],
          "privateKnowledge": [
            "어머니 집에 잠깐 들러 선물 케이스만 받고 돌아오면 된다고 스스로 합리화했습니다."
          ],
          "suppressions": [
            "실제 도착지가 작업실이 아니라 어머니 아파트였다는 사실",
            "긴급업무라는 표현이 거짓이었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-1:uncertainty:1",
              "factText": "클라이언트 호출까지는 아니어도 작업실에서 급하게 정리할 일이 있었고, 바로 끝낼 생각이었습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "업무 호출까지는 아니었고, 맡겨 둔 물건을 찾으러 잠깐 돌아간 건 맞습니다."
          ],
          "privateKnowledge": [
            "그 물건은 기념일 선물용 시계 케이스였고, 오전부터 어머니와 전달 얘기를 해 두었습니다."
          ],
          "suppressions": [
            "다은이 모르게 어머니를 기념일 준비에 끼워 넣은 사실",
            "문자 내용을 의도적으로 오해하게 만든 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-1:admission:2",
              "factText": "업무 호출까지는 아니었고, 맡겨 둔 물건을 찾으러 잠깐 돌아간 건 맞습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "거짓말한 건 맞지만, 다은을 버리려던 게 아니라 선물 때문에 동선이 꼬였던 겁니다."
          ],
          "privateKnowledge": [
            "어머니가 선물 케이스를 쥐고 있어 결국 그쪽으로 갈 수밖에 없었고, 늦을 걸 알면서도 솔직히 말하지 못했습니다."
          ],
          "suppressions": [
            "어머니가 예약 코드와 일정 전체를 더 많이 알고 있었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-1:responsibility:3",
              "factText": "거짓말한 건 맞지만, 다은을 버리려던 게 아니라 선물 때문에 동선이 꼬였던 겁니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
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
            "제가 무책임하게 둘 사이를 다 붙잡으려다가 기념일 약속을 먼저 깨뜨렸습니다. 변명보다 수습부터 하려 했습니다."
          ],
          "privateKnowledge": [
            "다은이 어머니 개입을 싫어한다는 걸 알면서도 숨겼고, 문제의 본질이 신뢰 훼손이라는 것도 알고 있었습니다."
          ],
          "suppressions": [
            "어머니가 예약 변경에도 손댔을 수 있다는 의심"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-1:emotion:4",
              "factText": "제가 무책임하게 둘 사이를 다 붙잡으려다가 기념일 약속을 먼저 깨뜨렸습니다. 변명보다 수습부터 하려 했습니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "긴급업무는 거짓말이었고, 저는 작업실에서 바로 어머니 아파트로 가 선물 케이스를 찾았습니다. 그 선택과 거짓말 모두 제 책임입니다."
          ],
          "privateKnowledge": [
            "어머니를 끊지 못한 태도가 이후 개입을 키웠다는 점까지 인정합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-1:admission:5",
              "factText": "긴급업무는 거짓말이었고, 저는 작업실에서 바로 어머니 아파트로 가 선물 케이스를 찾았습니다. 그 선택과 거짓말 모두 제 책임입니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
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
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "다은이 화면을 본 건 알림이 떠 있어서 우연히 본 정도라고 생각했습니다."
          ],
          "privateKnowledge": [
            "정확히 어디까지 봤는지는 몰랐고, 그래서 더 큰 문제로 키우고 싶지 않았습니다."
          ],
          "suppressions": [
            "기기 동기화를 느슨하게 둔 제 책임"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-2:denial:0",
              "factText": "다은이 화면을 본 건 알림이 떠 있어서 우연히 본 정도라고 생각했습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
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
            "적어도 제 태블릿을 먼저 확인한 건 맞지만, 그때는 너무 흥분해서 과하게 본 걸로 알았습니다."
          ],
          "privateKnowledge": [
            "단순 확인이 아니라 캡처까지 했을 수 있다는 의심이 들었습니다."
          ],
          "suppressions": [
            "친구들에게 공유됐을 가능성"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-2:uncertainty:1",
              "factText": "적어도 제 태블릿을 먼저 확인한 건 맞지만, 그때는 너무 흥분해서 과하게 본 걸로 알았습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "태블릿 알림을 캡처한 건 맞고, 제 동의 없는 확인이었습니다."
          ],
          "privateKnowledge": [
            "그 자료가 대면 전에 만들어졌다는 걸 알면 더 상처가 커질까 두려웠습니다."
          ],
          "suppressions": [
            "친구 단톡 전송 사실"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-2:admission:2",
              "factText": "태블릿 알림을 캡처한 건 맞고, 제 동의 없는 확인이었습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "문제는 본 것에서 끝난 게 아니라, 저와 확인하기 전에 제3자에게 먼저 돌렸다는 겁니다."
          ],
          "privateKnowledge": [
            "신뢰가 둘 사이 대화보다 외부 판단으로 먼저 넘어갔다고 느꼈습니다."
          ],
          "suppressions": [
            "제가 먼저 거짓말한 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-2:responsibility:3",
              "factText": "문제는 본 것에서 끝난 게 아니라, 저와 확인하기 전에 제3자에게 먼저 돌렸다는 겁니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                },
                "recipient": {
                  "exact": "친구 단톡",
                  "neutral": "외부 대화방"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "저도 거짓말을 했지만, 다은이 제 기기를 열고 친구들에게 돌린 건 별개의 선을 넘은 행동이었습니다."
          ],
          "privateKnowledge": [
            "결국 둘 다 경계를 무너뜨린 싸움이었다는 걸 압니다."
          ],
          "suppressions": [
            "그 행동을 유발한 직접 원인 일부가 제게 있었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-2:emotion:4",
              "factText": "저도 거짓말을 했지만, 다은이 제 기기를 열고 친구들에게 돌린 건 별개의 선을 넘은 행동이었습니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                },
                "recipient": {
                  "exact": "친구 단톡",
                  "neutral": "외부 대화방"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "다은은 제 동기화 태블릿을 무단 확인해 예약 변경 알림을 캡처했고, 그걸 친구 단톡에 먼저 공유했습니다. 저는 그 사실을 뒤늦게 알고 사생활 경계가 무너졌다고 느꼈습니다."
          ],
          "privateKnowledge": [
            "제가 먼저 신뢰를 흔들었어도, 무단 열람과 제3자 공유는 따로 정리해야 할 문제라고 봅니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-2:admission:5",
              "factText": "다은은 제 동기화 태블릿을 무단 확인해 예약 변경 알림을 캡처했고, 그걸 친구 단톡에 먼저 공유했습니다. 저는 그 사실을 뒤늦게 알고 사생활 경계가 무너졌다고 느꼈습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                },
                "recipient": {
                  "exact": "친구 단톡",
                  "neutral": "외부 대화방"
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
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "예약을 제가 직접 취소한 건 아닙니다."
          ],
          "privateKnowledge": [
            "누군가 예약 코드와 케이크 문구를 알고 움직일 수 있는 상황이 이미 만들어져 있었습니다."
          ],
          "suppressions": [
            "그 정보가 가족 쪽으로 흘러간 경로",
            "변경 알림을 보고도 바로 설명하지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-3:denial:0",
              "factText": "예약을 제가 직접 취소한 건 아닙니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "알림이 제 기기로 갔다고 해서 제가 직접 변경한 건 아닙니다. 결과 통지만 온 겁니다."
          ],
          "privateKnowledge": [
            "실제 변경 시각은 제가 작업실을 떠나기 전이어서 제 직접 조작과 맞지 않습니다."
          ],
          "suppressions": [
            "예약 코드 관리가 느슨했던 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-3:uncertainty:1",
              "factText": "알림이 제 기기로 갔다고 해서 제가 직접 변경한 건 아닙니다. 결과 통지만 온 겁니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "제가 직접 전화하거나 앱에서 취소한 건 아닙니다. 누군가 코드와 문구를 알고 먼저 변경한 겁니다."
          ],
          "privateKnowledge": [
            "어머니가 코드와 케이크 문구를 알고 있었다는 사실을 떠올리고 있었습니다."
          ],
          "suppressions": [
            "어머니 쪽 개입 가능성을 입 밖에 내지 않는 태도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-3:admission:2",
              "factText": "제가 직접 전화하거나 앱에서 취소한 건 아닙니다. 누군가 코드와 문구를 알고 먼저 변경한 겁니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "문제는 제가 안 했다는 사실만이 아니라, 그렇게 될 수 있는 판을 제가 열어뒀다는 점입니다."
          ],
          "privateKnowledge": [
            "선물 케이스와 가족 연락으로 정보가 분산됐고, 저는 그 통제를 포기했습니다."
          ],
          "suppressions": [
            "어머니를 보호하려는 마음"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-3:responsibility:3",
              "factText": "문제는 제가 안 했다는 사실만이 아니라, 그렇게 될 수 있는 판을 제가 열어뒀다는 점입니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "제가 직접 취소한 건 아니지만, 코드가 돌게 만든 책임은 피하기 어렵습니다. 다은이 보기엔 제가 한 것처럼 보였을 겁니다."
          ],
          "privateKnowledge": [
            "즉시 해명하지 못한 제 태도가 오해를 굳혔다는 걸 압니다."
          ],
          "suppressions": [
            "어머니 의도성에 대한 확신 없는 의심"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-3:emotion:4",
              "factText": "제가 직접 취소한 건 아니지만, 코드가 돌게 만든 책임은 피하기 어렵습니다. 다은이 보기엔 제가 한 것처럼 보였을 겁니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "예약 변경은 제 직접 취소가 아니었습니다. 하지만 어머니가 코드와 케이크 문구를 알 수 있게 두었고, 그 결과가 제 기기 알림으로 와서 다은이 저를 범인으로 믿게 만들었습니다."
          ],
          "privateKnowledge": [
            "직접 취소가 아니라도 배경 책임은 제게 있었다는 점까지 인정합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-3:admission:5",
              "factText": "예약 변경은 제 직접 취소가 아니었습니다. 하지만 어머니가 코드와 케이크 문구를 알 수 있게 두었고, 그 결과가 제 기기 알림으로 와서 다은이 저를 범인으로 믿게 만들었습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
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
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "저는 가족을 끼우려던 게 아니라, 선물 보관만 잠깐 맡겨 둔 정도였습니다."
          ],
          "privateKnowledge": [
            "어머니에게 시계 케이스와 케이크 장식을 맡겼고, 그 자체로 이미 약속의 경계를 흔들었습니다."
          ],
          "suppressions": [
            "기념일 정보와 동선을 어머니가 알게 한 점",
            "약속 위반임을 알고도 가볍게 본 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-4:denial:0",
              "factText": "저는 가족을 끼우려던 게 아니라, 선물 보관만 잠깐 맡겨 둔 정도였습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스와 케이크 장식",
                  "neutral": "그 준비물"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "직접 식사 자리에 가족을 부른 건 아니었고, 준비 과정에서 잠깐 도움을 받은 거였습니다."
          ],
          "privateKnowledge": [
            "행사 당일 오전에도 어머니와 케이스 전달을 조율했습니다."
          ],
          "suppressions": [
            "다은이 싫어할 걸 알면서 숨긴 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-4:uncertainty:1",
              "factText": "직접 식사 자리에 가족을 부른 건 아니었고, 준비 과정에서 잠깐 도움을 받은 거였습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스와 케이크 장식",
                  "neutral": "그 준비물"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "네, 선물 케이스와 장식은 어머니에게 맡겼습니다. 그 순간 이미 '가족은 빼자'는 약속을 어긴 겁니다."
          ],
          "privateKnowledge": [
            "깜짝 준비라는 명분으로 제 예외를 스스로 합리화했습니다."
          ],
          "suppressions": [
            "다은도 브로치 때문에 먼저 연락했다는 사실을 방패처럼 쓰고 싶은 마음"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-4:admission:2",
              "factText": "네, 선물 케이스와 장식은 어머니에게 맡겼습니다. 그 순간 이미 '가족은 빼자'는 약속을 어긴 겁니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스와 케이크 장식",
                  "neutral": "그 준비물"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "저만 그런 건 아니고, 다은도 브로치를 빌리면서 예약 캡처와 코드를 어머니께 보냈습니다."
          ],
          "privateKnowledge": [
            "상대도 약속을 흔들었다는 사실에 기대 책임을 나누고 싶었습니다."
          ],
          "suppressions": [
            "제가 먼저 큰 정보를 넘겼을 가능성"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-4:responsibility:3",
              "factText": "저만 그런 건 아니고, 다은도 브로치를 빌리면서 예약 캡처와 코드를 어머니께 보냈습니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스와 케이크 장식",
                  "neutral": "그 준비물"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "둘 다 서프라이즈를 지키려다 가족을 우회로로 썼고, 그게 첫 약속을 무너뜨렸습니다."
          ],
          "privateKnowledge": [
            "문제는 도움의 크기가 아니라 경계의 원칙이었다는 걸 뒤늦게 봤습니다."
          ],
          "suppressions": [
            "어머니가 그 틈을 의도적으로 활용했을 수 있다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-4:emotion:4",
              "factText": "둘 다 서프라이즈를 지키려다 가족을 우회로로 썼고, 그게 첫 약속을 무너뜨렸습니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스와 케이크 장식",
                  "neutral": "그 준비물"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "저는 선물 케이스와 케이크 장식을 어머니에게 맡겨 가족 개입의 문을 열었습니다. 다은도 브로치를 빌리며 코드를 보냈지만, 제 쪽에서 먼저 그 경계를 느슨하게 만든 책임이 있습니다."
          ],
          "privateKnowledge": [
            "관계를 지키겠다는 명분으로 오히려 둘만의 자리를 무너뜨렸습니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-4:admission:5",
              "factText": "저는 선물 케이스와 케이크 장식을 어머니에게 맡겨 가족 개입의 문을 열었습니다. 다은도 브로치를 빌리며 코드를 보냈지만, 제 쪽에서 먼저 그 경계를 느슨하게 만든 책임이 있습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스와 케이크 장식",
                  "neutral": "그 준비물"
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
            "어머니가 일부러 기념일을 망치려 했다고까지는 생각하지 않습니다."
          ],
          "privateKnowledge": [
            "어머니는 예약 코드와 선물 계획을 알고 있었고, 결과적으로 이상한 변경이 같은 날 겹쳤습니다."
          ],
          "suppressions": [
            "어머니가 동선을 흔들었을 수 있다는 의심",
            "어머니를 감싸고 싶은 마음"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-5:denial:0",
              "factText": "어머니가 일부러 기념일을 망치려 했다고까지는 생각하지 않습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "개입이 있었다 해도 오해에서 비롯된 참견일 수는 있어도, 의도적 방해라고 단정하긴 어렵습니다."
          ],
          "privateKnowledge": [
            "어머니는 레스토랑과 제과점에 연락할 수 있는 정보와 동기를 이미 갖고 있었습니다."
          ],
          "suppressions": [
            "제가 그 통로를 만들었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:a:tell:task_listing",
            "spouse04:a:tell:passive_voice"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-5:uncertainty:1",
              "factText": "개입이 있었다 해도 오해에서 비롯된 참견일 수는 있어도, 의도적 방해라고 단정하긴 어렵습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "예약 코드와 케이크 문구를 알고 있던 사람이 움직인 건 맞습니다. 다만 그게 어머니의 의도적 방해였는지는 저는 바로 말하기 어렵습니다."
          ],
          "privateKnowledge": [
            "레스토랑과 제과점 기록을 보면 어머니가 가장 강한 연결고리라는 걸 알고 있습니다."
          ],
          "suppressions": [
            "어머니가 둘만의 기념일을 못마땅해했다는 기억"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-5:admission:2",
              "factText": "예약 코드와 케이크 문구를 알고 있던 사람이 움직인 건 맞습니다. 다만 그게 어머니의 의도적 방해였는지는 저는 바로 말하기 어렵습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "지금 생각하면 어머니가 일부러 판을 흔든 정황이 있습니다. 저는 그 가능성을 알면서도 끝까지 외면했습니다."
          ],
          "privateKnowledge": [
            "가족 충성심 때문에 의심을 말로 옮기지 못했고, 대신 거짓말로 시간을 벌었습니다."
          ],
          "suppressions": [
            "음성메모가 나오면 의도성이 거의 굳어진다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-5:responsibility:3",
              "factText": "지금 생각하면 어머니가 일부러 판을 흔든 정황이 있습니다. 저는 그 가능성을 알면서도 끝까지 외면했습니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "어머니를 막지 못한 것도, 의심하면서 덮은 것도 제 책임입니다. 다은이 저를 믿지 못하게 된 이유를 압니다."
          ],
          "privateKnowledge": [
            "둘 사이보다 어머니 눈치를 먼저 본 제 태도에 수치심을 느낍니다."
          ],
          "suppressions": [
            "직접 음성메모 내용을 먼저 입 밖에 내지 않는 태도"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-5:emotion:4",
              "factText": "어머니를 막지 못한 것도, 의심하면서 덮은 것도 제 책임입니다. 다은이 저를 믿지 못하게 된 이유를 압니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "약속 파기 배후에는 어머니 강정희의 의도적 개입이 있었습니다. 어머니는 예약 코드와 선물 계획을 알고 레스토랑과 제과점에 연락했고, 저는 그 가능성을 외면한 채 거짓말로 시간을 벌었습니다."
          ],
          "privateKnowledge": [
            "직접 취소하지 않았더라도 그 개입을 방치한 제 책임을 인정합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:a:tell:passive_voice",
            "spouse04:a:tell:time_bargain"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:a:d-5:admission:5",
              "factText": "약속 파기 배후에는 어머니 강정희의 의도적 개입이 있었습니다. 어머니는 예약 코드와 선물 계획을 알고 레스토랑과 제과점에 연락했고, 저는 그 가능성을 외면한 채 거짓말로 시간을 벌었습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
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
      }
    },
    "b": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "하준은 그날 클라이언트 긴급호출이라고 했고, 저는 그 말을 반박할 근거가 없었습니다."
          ],
          "privateKnowledge": [
            "문자 톤이 평소보다 급했고 첫 결혼기념일 약속과 정면으로 충돌해 더 배신처럼 느껴졌습니다."
          ],
          "suppressions": [
            "가짜일 수도 있다는 직감"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-1:denial:0",
              "factText": "하준은 그날 클라이언트 긴급호출이라고 했고, 저는 그 말을 반박할 근거가 없었습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
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
            "적어도 문자 내용만 보면 작업실 일처럼 꾸며져 있었고, 그래서 더 배신처럼 느껴졌습니다."
          ],
          "privateKnowledge": [
            "하준 말과 실제 일정이 맞는지 타임라인을 확인하고 싶은 충동이 올라왔습니다."
          ],
          "suppressions": [
            "시가 쪽 개입 가능성에 대한 막연한 의심"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-1:uncertainty:1",
              "factText": "적어도 문자 내용만 보면 작업실 일처럼 꾸며져 있었고, 그래서 더 배신처럼 느껴졌습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "출입기록을 보면 긴급 납품은 없었습니다. 하준이 다른 이유를 숨긴 건 분명합니다."
          ],
          "privateKnowledge": [
            "작업실 퇴실 시각과 하준의 문자가 어긋나고, 그 다음 동선도 저에게 설명되지 않았습니다."
          ],
          "suppressions": [
            "바로 어머니 집으로 갔을 가능성"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-1:admission:2",
              "factText": "출입기록을 보면 긴급 납품은 없었습니다. 하준이 다른 이유를 숨긴 건 분명합니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "저는 그 거짓말이 단순 지각 핑계가 아니라, 어머니 쪽 동선을 감추려는 말이었다고 봅니다."
          ],
          "privateKnowledge": [
            "하준은 가족 이야기가 나오면 늘 주어를 흐리고, 그래서 이번에도 가족 경유를 숨겼다고 느꼈습니다."
          ],
          "suppressions": [
            "어머니가 실제로 더 크게 움직였을 수 있다는 추정"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-1:responsibility:3",
              "factText": "저는 그 거짓말이 단순 지각 핑계가 아니라, 어머니 쪽 동선을 감추려는 말이었다고 봅니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
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
            "문제는 30분이 아니라 첫 기념일 약속보다 다른 쪽 눈치를 먼저 봤다는 점입니다."
          ],
          "privateKnowledge": [
            "시간이 아니라 상징이 무너졌다고 느껴서 더 날카롭게 반응했습니다."
          ],
          "suppressions": [
            "제가 태블릿을 본 잘못"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-1:emotion:4",
              "factText": "문제는 30분이 아니라 첫 기념일 약속보다 다른 쪽 눈치를 먼저 봤다는 점입니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "하준은 긴급업무를 꾸며 말했고 실제로는 어머니 아파트로 향했습니다. 그 거짓말이 기념일 전체를 무너뜨린 출발점이었습니다."
          ],
          "privateKnowledge": [
            "직접 취소까지는 아닐 수 있다는 점도 이제는 함께 봐야 한다고 생각합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-1:admission:5",
              "factText": "하준은 긴급업무를 꾸며 말했고 실제로는 어머니 아파트로 향했습니다. 그 거짓말이 기념일 전체를 무너뜨린 출발점이었습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "기념일 당일 저녁",
                  "neutral": "그 시점",
                  "dateExact": "기념일 당일 저녁",
                  "period": "저녁 약속 직전"
                },
                "occasion": {
                  "exact": "첫 결혼기념일 저녁 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "어머니"
                },
                "item": {
                  "exact": "시계 케이스",
                  "neutral": "그 물건"
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
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "저는 태블릿을 뒤진 게 아니라, 눈앞에 뜬 알림을 확인한 정도였습니다."
          ],
          "privateKnowledge": [
            "동기화된 태블릿에서 예약 변경 알림을 캡처했습니다."
          ],
          "suppressions": [
            "친구 단톡에 먼저 보낸 사실",
            "당사자 확인보다 제 확신을 앞세운 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-2:denial:0",
              "factText": "저는 태블릿을 뒤진 게 아니라, 눈앞에 뜬 알림을 확인한 정도였습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
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
            "정확히 말하면 메일함을 다 뒤진 건 아니고, 이미 떠 있던 알림을 본 겁니다."
          ],
          "privateKnowledge": [
            "그 알림을 저장해 두고 사실상 증거처럼 쥐고 있었습니다."
          ],
          "suppressions": [
            "한예슬 등이 있는 단톡 전송"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-2:uncertainty:1",
              "factText": "정확히 말하면 메일함을 다 뒤진 건 아니고, 이미 떠 있던 알림을 본 겁니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "네, 동기화된 태블릿에서 알림을 캡처한 건 맞습니다. 그때는 하준이 직접 예약을 버린 줄 알았습니다."
          ],
          "privateKnowledge": [
            "캡처 시각이 대면 26분 전이었고, 감정이 올라가 바로 외부 확인을 구했습니다."
          ],
          "suppressions": [
            "친구들에게 먼저 판단을 맡긴 부분"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-2:admission:2",
              "factText": "네, 동기화된 태블릿에서 알림을 캡처한 건 맞습니다. 그때는 하준이 직접 예약을 버린 줄 알았습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "친구들에게 보낸 것도 맞지만, 저 혼자 보면 제가 미친 사람처럼 보일까 봐 확인받고 싶었습니다."
          ],
          "privateKnowledge": [
            "상처를 증명받고 싶은 마음이 사생활 경계보다 앞섰습니다."
          ],
          "suppressions": [
            "사생활 침해가 명백하다는 점을 인정하기 싫었던 마음"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-2:responsibility:3",
              "factText": "친구들에게 보낸 것도 맞지만, 저 혼자 보면 제가 미친 사람처럼 보일까 봐 확인받고 싶었습니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                },
                "recipient": {
                  "exact": "친구 단톡",
                  "neutral": "외부 대화방"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "첫 결혼기념일이 무너졌다고 느껴서 경계를 넘었습니다. 잘못인 걸 알면서도 그 순간엔 사실을 붙잡는 게 먼저였습니다."
          ],
          "privateKnowledge": [
            "그날의 상징이 커서 행동이 더 과격해졌다는 걸 스스로도 압니다."
          ],
          "suppressions": [
            "친구 단톡에서 하준을 사실상 유죄처럼 몰아간 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-2:emotion:4",
              "factText": "첫 결혼기념일이 무너졌다고 느껴서 경계를 넘었습니다. 잘못인 걸 알면서도 그 순간엔 사실을 붙잡는 게 먼저였습니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                },
                "recipient": {
                  "exact": "친구 단톡",
                  "neutral": "외부 대화방"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "저는 하준의 동기화된 태블릿을 무단 확인했고, 예약 변경 알림을 캡처해 친구 단톡에 먼저 공유했습니다. 의심이 생겼어도 먼저 본인에게 확인했어야 했습니다."
          ],
          "privateKnowledge": [
            "사실을 빨리 붙잡으려다 제 선을 먼저 넘었다는 걸 인정합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-2:admission:5",
              "factText": "저는 하준의 동기화된 태블릿을 무단 확인했고, 예약 변경 알림을 캡처해 친구 단톡에 먼저 공유했습니다. 의심이 생겼어도 먼저 본인에게 확인했어야 했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "device": {
                  "exact": "동기화된 태블릿",
                  "neutral": "그 기기"
                },
                "time": {
                  "exact": "대면 26분 전",
                  "neutral": "그때",
                  "dateExact": "대면 26분 전",
                  "period": "대면 직전"
                },
                "recipient": {
                  "exact": "친구 단톡",
                  "neutral": "외부 대화방"
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
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "예약 변경 알림이 하준 태블릿에 떴다면, 보통은 하준이 직접 바꿨다고 볼 수밖에 없었습니다."
          ],
          "privateKnowledge": [
            "발신자 정보가 잘린 캡처라 직접 변경 증거는 아니었지만, 그 순간엔 그렇게 읽혔습니다."
          ],
          "suppressions": [
            "변경 요청자가 따로 있을 수 있다는 가능성",
            "캡처가 함정 증거일 수 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-3:denial:0",
              "factText": "예약 변경 알림이 하준 태블릿에 떴다면, 보통은 하준이 직접 바꿨다고 볼 수밖에 없었습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "제가 본 건 변경 완료 알림이었고, 그 시점엔 하준 말고 다른 사람을 떠올릴 이유가 없었습니다."
          ],
          "privateKnowledge": [
            "정확한 요청자 정보는 없었고, 저는 결과 알림을 곧바로 원인으로 받아들였습니다."
          ],
          "suppressions": [
            "제가 결론을 너무 서둘렀다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-3:uncertainty:1",
              "factText": "제가 본 건 변경 완료 알림이었고, 그 시점엔 하준 말고 다른 사람을 떠올릴 이유가 없었습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "맞아요, 캡처만으로는 직접 취소를 단정할 수 없었습니다. 그래도 제 눈엔 하준이 그렇게 보였습니다."
          ],
          "privateKnowledge": [
            "증거가 잘린 상태라는 걸 알고도 상징적 배신감 때문에 멈추지 못했습니다."
          ],
          "suppressions": [
            "시어머니가 코드까지 알고 있었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-3:admission:2",
              "factText": "맞아요, 캡처만으로는 직접 취소를 단정할 수 없었습니다. 그래도 제 눈엔 하준이 그렇게 보였습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "제가 하준을 범인처럼 몰아간 건 인정하지만, 그렇게 보이도록 판이 짜여 있었다는 생각도 듭니다."
          ],
          "privateKnowledge": [
            "거짓 문자와 알림 타이밍이 이상하게 겹쳐 누군가 외부에서 흔든 것처럼 느껴졌습니다."
          ],
          "suppressions": [
            "어머니 개입 가능성을 바로 말하기 어려운 이유"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-3:responsibility:3",
              "factText": "제가 하준을 범인처럼 몰아간 건 인정하지만, 그렇게 보이도록 판이 짜여 있었다는 생각도 듭니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "그날 저는 분 단위로 맞춰 보며 하준이 직접 취소했다고 믿었습니다. 지금 보니 알림 결과와 실제 요청 주체는 다를 수 있었습니다."
          ],
          "privateKnowledge": [
            "제 확신이 사생활 침해를 정당화하지 못한다는 것도 압니다."
          ],
          "suppressions": [
            "친구 단톡 전송에 대한 수치심"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-3:emotion:4",
              "factText": "그날 저는 분 단위로 맞춰 보며 하준이 직접 취소했다고 믿었습니다. 지금 보니 알림 결과와 실제 요청 주체는 다를 수 있었습니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "예약 변경 알림만으로는 하준이 직접 취소했다고 단정할 수 없었습니다. 실제 변경 요청자는 별도 발신자였고, 저는 잘린 증거 하나로 하준을 바로 범인으로 몰았습니다."
          ],
          "privateKnowledge": [
            "오판이었더라도 그 오판이 생기게 된 배경은 끝까지 따져야 한다고 생각합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-3:admission:5",
              "factText": "예약 변경 알림만으로는 하준이 직접 취소했다고 단정할 수 없었습니다. 실제 변경 요청자는 별도 발신자였고, 저는 잘린 증거 하나로 하준을 바로 범인으로 몰았습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "notice": {
                  "exact": "예약 변경 완료 알림",
                  "neutral": "그 알림"
                },
                "institution": {
                  "exact": "레스토랑 예약센터",
                  "neutral": "그 예약처"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
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
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "브로치를 빌리려고 연락한 건 맞지만, 그걸 가족 개입이라고까지 생각하진 않았습니다."
          ],
          "privateKnowledge": [
            "예약 캡처와 코드까지 시어머니에게 보냈습니다."
          ],
          "suppressions": [
            "그 정보가 일정 변경에 쓰일 수 있었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-4:denial:0",
              "factText": "브로치를 빌리려고 연락한 건 맞지만, 그걸 가족 개입이라고까지 생각하진 않았습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "item": {
                  "exact": "브로치와 예약 캡처",
                  "neutral": "그 준비물"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "저는 식사 자리에 가족을 끼운 게 아니라 옷차림 준비 때문에 잠깐 연락한 거였습니다."
          ],
          "privateKnowledge": [
            "예약 정보 일부를 넘긴 건 사실입니다."
          ],
          "suppressions": [
            "약속의 핵심이 '정보 공유 금지'였다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-4:uncertainty:1",
              "factText": "저는 식사 자리에 가족을 끼운 게 아니라 옷차림 준비 때문에 잠깐 연락한 거였습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "item": {
                  "exact": "브로치와 예약 캡처",
                  "neutral": "그 준비물"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "브로치를 빌리려 연락했고, 그 과정에서 예약 캡처도 보냈습니다. 선을 넘은 건 인정합니다."
          ],
          "privateKnowledge": [
            "코드까지 보낸 건 부주의였고, 그때는 그 위험을 작게 봤습니다."
          ],
          "suppressions": [
            "하준 쪽 개입 규모가 더 크다고 비교하고 싶은 마음"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-4:admission:2",
              "factText": "브로치를 빌리려 연락했고, 그 과정에서 예약 캡처도 보냈습니다. 선을 넘은 건 인정합니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "item": {
                  "exact": "브로치와 예약 캡처",
                  "neutral": "그 준비물"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "하지만 저만 그런 게 아니라 하준도 선물과 케이크를 어머니 쪽에 맡겼습니다. 둘 다 각자 가족을 우회로로 쓴 겁니다."
          ],
          "privateKnowledge": [
            "제 수치심을 균형론으로 덮고 싶은 마음이 있습니다."
          ],
          "suppressions": [
            "제 정보 제공이 결정적 통로였을 수 있다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-4:responsibility:3",
              "factText": "하지만 저만 그런 게 아니라 하준도 선물과 케이크를 어머니 쪽에 맡겼습니다. 둘 다 각자 가족을 우회로로 쓴 겁니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "item": {
                  "exact": "브로치와 예약 캡처",
                  "neutral": "그 준비물"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "첫 기념일에 가족을 끼우지 않겠다는 문장을 제가 먼저 깨끗하게 지키지 못했습니다. 하준만 탓하며 말하기 어려운 이유가 그겁니다."
          ],
          "privateKnowledge": [
            "상징을 지키려다 원칙을 깨뜨렸다는 자책이 남아 있습니다."
          ],
          "suppressions": [
            "친구 단톡 전송까지 이어진 행동"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-4:emotion:4",
              "factText": "첫 기념일에 가족을 끼우지 않겠다는 문장을 제가 먼저 깨끗하게 지키지 못했습니다. 하준만 탓하며 말하기 어려운 이유가 그겁니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "item": {
                  "exact": "브로치와 예약 캡처",
                  "neutral": "그 준비물"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "저는 브로치를 빌리려 시어머니와 연락하면서 예약 캡처와 코드까지 보냈습니다. 그 순간 이미 '가족은 끼우지 말자'는 약속을 제 쪽에서도 어긴 겁니다."
          ],
          "privateKnowledge": [
            "하준 책임과 별개로 제가 연 통로도 분명했다는 점을 인정합니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-4:admission:5",
              "factText": "저는 브로치를 빌리려 시어머니와 연락하면서 예약 캡처와 코드까지 보냈습니다. 그 순간 이미 '가족은 끼우지 말자'는 약속을 제 쪽에서도 어긴 겁니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "가족을 끼우지 않겠다는 기념일 약속",
                  "neutral": "그 약속"
                },
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "item": {
                  "exact": "브로치와 예약 캡처",
                  "neutral": "그 준비물"
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
            "처음엔 그냥 하준이 직접 기념일을 버린 거라고 생각했습니다."
          ],
          "privateKnowledge": [
            "예약 변경 알림과 거짓 긴급업무 문자가 같은 날 겹쳐서 하준이 범인처럼 보였습니다."
          ],
          "suppressions": [
            "시어머니가 코드를 알고 있었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-5:denial:0",
              "factText": "처음엔 그냥 하준이 직접 기념일을 버린 거라고 생각했습니다.",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "적어도 누군가 바깥에서 건드렸을 수 있다는 생각은 들었지만, 그때는 하준이 어머니를 막지 않은 쪽이 더 크게 보였습니다."
          ],
          "privateKnowledge": [
            "가족 연락 흔적과 예약 정보 유출 가능성이 머릿속에서 연결되기 시작했습니다."
          ],
          "suppressions": [
            "저도 시어머니에게 캡처를 보낸 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:symbolic_weight"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-5:uncertainty:1",
              "factText": "적어도 누군가 바깥에서 건드렸을 수 있다는 생각은 들었지만, 그때는 하준이 어머니를 막지 않은 쪽이 더 크게 보였습니다.",
              "tags": [
                "uncertainty",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
                }
              },
              "stanceHints": [
                "hedge",
                "delay"
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
            "예약 코드를 아는 제3자가 있었고, 그래서 하준의 직접 취소만으로 보긴 어려워졌습니다."
          ],
          "privateKnowledge": [
            "시어머니가 가장 유력한 연결점이라는 걸 점점 인정하게 됐습니다."
          ],
          "suppressions": [
            "그 정보 경로에 저도 얽혀 있다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-5:admission:2",
              "factText": "예약 코드를 아는 제3자가 있었고, 그래서 하준의 직접 취소만으로 보긴 어려워졌습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
                }
              },
              "stanceHints": [
                "partial",
                "justify"
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
            "지금은 강정희 씨가 의도적으로 둘 사이 시간을 꼬았을 가능성을 강하게 봅니다. 하준은 그걸 막지 못했고요."
          ],
          "privateKnowledge": [
            "가족 개입이 단순 참견을 넘어선 방해일 수 있다는 판단이 섰습니다."
          ],
          "suppressions": [
            "제가 증거를 먼저 밖으로 돌린 잘못"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse04:b:tell:timeline_crosscheck",
            "spouse04:b:tell:evidence_stack"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-5:responsibility:3",
              "factText": "지금은 강정희 씨가 의도적으로 둘 사이 시간을 꼬았을 가능성을 강하게 봅니다. 하준은 그걸 막지 못했고요.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "더 아픈 건 하준만의 배신이 아니라, 첫 기념일이 가족의 계산 속에서 흔들렸다는 점입니다."
          ],
          "privateKnowledge": [
            "상징이 훼손된 감각 때문에 사실보다 감정을 먼저 붙들었습니다."
          ],
          "suppressions": [
            "상대를 완전 가해자로만 볼 수 없게 됐다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-5:emotion:4",
              "factText": "더 아픈 건 하준만의 배신이 아니라, 첫 기념일이 가족의 계산 속에서 흔들렸다는 점입니다.",
              "tags": [
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "약속 파기의 배후에는 강정희 씨의 의도적 개입이 있었습니다. 하준이 직접 취소한 건 아니었지만, 어머니를 끊지 못하고 진실을 숨긴 탓에 저는 끝까지 하준이 저를 버렸다고 믿게 됐습니다."
          ],
          "privateKnowledge": [
            "제 오판과 하준의 은폐가 함께 지금의 파국을 만들었다고 봅니다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse04:b:tell:symbolic_weight",
            "spouse04:b:tell:timeline_crosscheck"
          ],
          "claimAtoms": [
            {
              "id": "spouse04:b:d-5:admission:5",
              "factText": "약속 파기의 배후에는 강정희 씨의 의도적 개입이 있었습니다. 하준이 직접 취소한 건 아니었지만, 어머니를 끊지 못하고 진실을 숨긴 탓에 저는 끝까지 하준이 저를 버렸다고 믿게 됐습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강정희",
                  "neutral": "그 사람",
                  "fullName": "강정희",
                  "judgeRef": "강정희 씨"
                },
                "code": {
                  "exact": "예약 코드",
                  "neutral": "그 코드"
                },
                "institution": {
                  "exact": "레스토랑 예약센터와 제과점",
                  "neutral": "해당 업체들"
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
      }
    }
  }
} as const;

export default spouse04V2Atoms;

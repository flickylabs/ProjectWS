export const tenant02V2Atoms = {
  "caseId": "tenant-02",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 그때 이미 합의 전 출입이 있었다고 봤습니다.",
            "안 된다고 한 날 이후 집 안 흔적이 바뀌었거든요."
          ],
          "privateKnowledge": [
            "방향제 위치가 바뀐 일을 떠올리며 이번에도 누군가 들어왔다고 거의 확신했다."
          ],
          "suppressions": [
            "직접 본 장면이 없었다는 약점은 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-1:act:0",
              "factText": "저는 그때 이미 합의 전 출입이 있었다고 봤습니다. 안 된다고 한 날 이후 집 안 흔적이 바뀌었거든요.",
              "tags": [
                "act",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "deny",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-1:privacy:1",
              "factText": "방향제 위치가 바뀐 일을 떠올리며 이번에도 누군가 들어왔다고 거의 확신했다.",
              "tags": [
                "privacy",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "deny",
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
            "정확히 본 건 없어도, 거절 직후에 찍힌 사진과 집 안 상태가 너무 맞물립니다."
          ],
          "privateKnowledge": [
            "예전 봄철의 예외 발언이 오해 소지가 있었다는 점은 알고 있다."
          ],
          "suppressions": [
            "한 번은 급하면 볼 수 있다고 말이 오간 사실은 낮춘다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-1:act:2",
              "factText": "정확히 본 건 없어도, 거절 직후에 찍힌 사진과 집 안 상태가 너무 맞물립니다.",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:a:d-1:privacy:3",
              "factText": "예전 봄철의 예외 발언이 오해 소지가 있었다는 점은 알고 있다.",
              "tags": [
                "privacy",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "카톡 시각과 사진 흐름을 보면 합의된 날보다 먼저 들어온 정황이 선명합니다."
          ],
          "privateKnowledge": [
            "증거가 아직 정황 중심이라 결정타는 원본 사진이라고 본다."
          ],
          "suppressions": [
            "사진 타임스탬프까지는 아직 스스로 완전히 입증 못 했다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-1:act:4",
              "factText": "카톡 시각과 사진 흐름을 보면 합의된 날보다 먼저 들어온 정황이 선명합니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:a:d-1:privacy:5",
              "factText": "증거가 아직 정황 중심이라 결정타는 원본 사진이라고 본다.",
              "tags": [
                "privacy",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
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
            "누수가 급했어도 제가 거절한 뒤 먼저 들어온 건 별개 문제입니다."
          ],
          "privateKnowledge": [
            "규철이 정말 겁이 났을 수 있다는 점은 어렴풋이 안다."
          ],
          "suppressions": [
            "상대의 조급함 사정은 입 밖에 덜 낸다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-1:act:6",
              "factText": "누수가 급했어도 제가 거절한 뒤 먼저 들어온 건 별개 문제입니다.",
              "tags": [
                "act",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:a:d-1:privacy:7",
              "factText": "규철이 정말 겁이 났을 수 있다는 점은 어렴풋이 안다.",
              "tags": [
                "privacy",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "partial",
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
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "제 작업실 같은 집에 허락도 없이 들어온 순간부터 저는 사람을 못 믿게 됐습니다."
          ],
          "privateKnowledge": [
            "장비보다도 통제권을 잃었다는 모멸감이 더 컸다."
          ],
          "suppressions": [
            "두려움 때문에 이후 대응이 과격해진 부분은 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-1:act:8",
              "factText": "제 작업실 같은 집에 허락도 없이 들어온 순간부터 저는 사람을 못 믿게 됐습니다.",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-1:privacy:9",
              "factText": "장비보다도 통제권을 잃었다는 모멸감이 더 컸다.",
              "tags": [
                "privacy",
                "shame"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
            "합의 전 무단 출입과 촬영이 있었고, 그 뒤 제 불신이 수리 절차 전체를 망가뜨렸습니다."
          ],
          "privateKnowledge": [
            "자신의 불신이 일정 지연으로 이어졌다는 연결을 인정한다."
          ],
          "suppressions": [
            "이 쟁점에서는 이후 자신의 협조 거부 비중을 크게 꺼내지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-1:act:10",
              "factText": "합의 전 무단 출입과 촬영이 있었고, 그 뒤 제 불신이 수리 절차 전체를 망가뜨렸습니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-1:privacy:11",
              "factText": "자신의 불신이 일정 지연으로 이어졌다는 연결을 인정한다.",
              "tags": [
                "privacy",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전 오후",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "person": {
                  "exact": "한규철",
                  "neutral": "상대방",
                  "fullName": "한규철",
                  "judgeRef": "집주인"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
        }
      },
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "곰팡이는 건물 쪽 누수 때문이지 제 생활 습관 때문이 아닙니다."
          ],
          "privateKnowledge": [
            "짐이 많고 환기를 길게 못 한 날들이 있었다."
          ],
          "suppressions": [
            "장비 때문에 창문을 오래 못 열었던 사정은 뺀다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-2:context:0",
              "factText": "곰팡이는 건물 쪽 누수 때문이지 제 생활 습관 때문이 아닙니다.",
              "tags": [
                "context",
                "counter"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
              "id": "tenant02:a:d-2:fear:1",
              "factText": "짐이 많고 환기를 길게 못 한 날들이 있었다.",
              "tags": [
                "fear",
                "self_justification"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "장비 때문에 조심한 건 있어도 1차 원인이 저라는 말은 과합니다."
          ],
          "privateKnowledge": [
            "신고 시점을 하루이틀 더 두고 본 적이 있다."
          ],
          "suppressions": [
            "처음 물자국을 보고도 바로 강하게 알리지 않은 점을 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-2:context:2",
              "factText": "장비 때문에 조심한 건 있어도 1차 원인이 저라는 말은 과합니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
              "id": "tenant02:a:d-2:fear:3",
              "factText": "신고 시점을 하루이틀 더 두고 본 적이 있다.",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "관리기록이 맞다면 배관 문제가 먼저였던 건 분명합니다."
          ],
          "privateKnowledge": [
            "기사 접근이 불편할 만큼 짐 적치가 있었던 건 안다."
          ],
          "suppressions": [
            "자기 적치가 악화 요인일 수 있다는 부분은 아직 닫아 둔다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-2:context:4",
              "factText": "관리기록이 맞다면 배관 문제가 먼저였던 건 분명합니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
              "id": "tenant02:a:d-2:fear:5",
              "factText": "기사 접근이 불편할 만큼 짐 적치가 있었던 건 안다.",
              "tags": [
                "fear",
                "responsibility"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "누수가 먼저였더라도 제 쪽 대응이 사태를 편하게 만들진 못했습니다."
          ],
          "privateKnowledge": [
            "초기 대응을 더 빨리 했으면 퍼짐은 덜했을 수 있다고 생각한다."
          ],
          "suppressions": [
            "자기 책임 비율은 아직 크게 말하지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-2:context:6",
              "factText": "누수가 먼저였더라도 제 쪽 대응이 사태를 편하게 만들진 못했습니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
              "id": "tenant02:a:d-2:fear:7",
              "factText": "초기 대응을 더 빨리 했으면 퍼짐은 덜했을 수 있다고 생각한다.",
              "tags": [
                "fear",
                "self_justification"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
            "장비가 젖거나 파일이 날아갈까 봐 집 상태를 인정하는 말도 쉽게 못 했습니다."
          ],
          "privateKnowledge": [
            "생계 불안 때문에 생활 요인 이야기를 과민하게 밀어냈다."
          ],
          "suppressions": [
            "그 두려움이 방어적 태도를 키웠다는 점을 완전히 시인하진 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-2:context:8",
              "factText": "장비가 젖거나 파일이 날아갈까 봐 집 상태를 인정하는 말도 쉽게 못 했습니다.",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-2:fear:9",
              "factText": "생계 불안 때문에 생활 요인 이야기를 과민하게 밀어냈다.",
              "tags": [
                "fear",
                "shame"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
            "1차 원인은 배관 누수였고, 제 적치와 늦은 신고는 악화 요인이었습니다."
          ],
          "privateKnowledge": [
            "자신이 완전히 무관한 사람은 아니라는 점을 받아들인다."
          ],
          "suppressions": [
            "생활 습관 전체가 원인이라는 낙인은 끝까지 거부한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-2:context:10",
              "factText": "1차 원인은 배관 누수였고, 제 적치와 늦은 신고는 악화 요인이었습니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-2:fear:11",
              "factText": "자신이 완전히 무관한 사람은 아니라는 점을 받아들인다.",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "짐 적치와 늦은 신고",
                  "neutral": "그 대응"
                },
                "object": {
                  "exact": "편집 장비와 원본 파일",
                  "neutral": "장비"
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
            "저 사진 날짜는 처음부터 너무 절묘해서 오히려 이상했습니다."
          ],
          "privateKnowledge": [
            "합의 전 이미 찍어 둔 사진일 수 있다고 강하게 의심했다."
          ],
          "suppressions": [
            "원본 파일을 보지 못한 상태의 추정이라는 점은 낮춘다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-3:evidence:0",
              "factText": "저 사진 날짜는 처음부터 너무 절묘해서 오히려 이상했습니다.",
              "tags": [
                "evidence",
                "counter"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
                }
              },
              "stanceHints": [
                "deny",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-3:emotion:1",
              "factText": "합의 전 이미 찍어 둔 사진일 수 있다고 강하게 의심했다.",
              "tags": [
                "emotion",
                "self_justification"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
                }
              },
              "stanceHints": [
                "deny",
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "캡처에 보이는 날짜만으로 합의된 점검일 촬영이라고 믿기 어렵습니다."
          ],
          "privateKnowledge": [
            "사진 속 장비 배치가 외출하던 날 기억과 맞아떨어진다."
          ],
          "suppressions": [
            "기억에 의존한 부분이라는 약점은 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-3:evidence:2",
              "factText": "캡처에 보이는 날짜만으로 합의된 점검일 촬영이라고 믿기 어렵습니다.",
              "tags": [
                "evidence",
                "uncertainty"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
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
              "id": "tenant02:a:d-3:emotion:3",
              "factText": "사진 속 장비 배치가 외출하던 날 기억과 맞아떨어진다.",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
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
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "원본과 캡처를 같이 보면 표시 시각이 뒤늦게 붙은 흔적이 보입니다."
          ],
          "privateKnowledge": [
            "규철이 분쟁용으로 화면을 정리했다면 날짜도 의도적으로 보였을 거라 본다."
          ],
          "suppressions": [
            "아직은 의도보다 결과 중심으로 말해야 설득된다는 계산을 한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-3:evidence:4",
              "factText": "원본과 캡처를 같이 보면 표시 시각이 뒤늦게 붙은 흔적이 보입니다.",
              "tags": [
                "evidence",
                "admission"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
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
              "id": "tenant02:a:d-3:emotion:5",
              "factText": "규철이 분쟁용으로 화면을 정리했다면 날짜도 의도적으로 보였을 거라 본다.",
              "tags": [
                "emotion",
                "responsibility"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "예약금 흐름까지 보면 사진이 먼저 있고 합의된 날은 나중 설명처럼 붙었습니다."
          ],
          "privateKnowledge": [
            "타임스탬프 문제를 입증하면 무단 출입까지 함께 묶인다고 생각한다."
          ],
          "suppressions": [
            "상대를 조작범으로 몰아붙이고 싶은 감정은 누른다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-3:evidence:6",
              "factText": "예약금 흐름까지 보면 사진이 먼저 있고 합의된 날은 나중 설명처럼 붙었습니다.",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
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
              "id": "tenant02:a:d-3:emotion:7",
              "factText": "타임스탬프 문제를 입증하면 무단 출입까지 함께 묶인다고 생각한다.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
                }
              },
              "stanceHints": [
                "partial",
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
            "그 날짜 하나 때문에 제가 괜히 예민한 세입자처럼 보였다는 게 제일 화가 납니다."
          ],
          "privateKnowledge": [
            "자신의 말보다 캡처 한 장이 더 믿어졌던 경험이 억울하다."
          ],
          "suppressions": [
            "그 억울함이 다른 쟁점 판단까지 거칠게 만들었다는 점은 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-3:evidence:8",
              "factText": "그 날짜 하나 때문에 제가 괜히 예민한 세입자처럼 보였다는 게 제일 화가 납니다.",
              "tags": [
                "evidence",
                "emotion"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-3:emotion:9",
              "factText": "자신의 말보다 캡처 한 장이 더 믿어졌던 경험이 억울하다.",
              "tags": [
                "emotion",
                "shame"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
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
            "제출된 표시 시각은 원본이 아니었고, 합의 전 촬영분이 점검일 사진처럼 보이게 됐습니다."
          ],
          "privateKnowledge": [
            "이제는 자신의 의심이 사실로 굳었다고 본다."
          ],
          "suppressions": [
            "날짜 문제 이후의 배상 비율 논의는 이 자리에서 미룬다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-3:evidence:10",
              "factText": "제출된 표시 시각은 원본이 아니었고, 합의 전 촬영분이 점검일 사진처럼 보이게 됐습니다.",
              "tags": [
                "evidence",
                "admission"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-3:emotion:11",
              "factText": "이제는 자신의 의심이 사실로 굳었다고 본다.",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "file": {
                  "exact": "원본 사진과 제출 캡처본",
                  "neutral": "사진 자료"
                },
                "time": {
                  "exact": "표시 시각 불일치",
                  "neutral": "날짜 문제"
                },
                "action": {
                  "exact": "합의 전 촬영분",
                  "neutral": "그 사진"
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
        }
      },
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "제가 수리를 막았다는 건 왜곡입니다.",
            "확인 없는 방문을 거절했을 뿐입니다."
          ],
          "privateKnowledge": [
            "실제로는 이틀 동안 전면 거부했다."
          ],
          "suppressions": [
            "정확한 이틀이라는 기간을 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-4:act:0",
              "factText": "제가 수리를 막았다는 건 왜곡입니다. 확인 없는 방문을 거절했을 뿐입니다.",
              "tags": [
                "act",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
              "id": "tenant02:a:d-4:responsibility:1",
              "factText": "실제로는 이틀 동안 전면 거부했다.",
              "tags": [
                "responsibility",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "무조건 안 된다고 한 게 아니라 누가 언제 들어오는지 밝히라고 한 겁니다."
          ],
          "privateKnowledge": [
            "그때는 어떤 기사도 믿을 수 없어 문 자체를 열기 싫었다."
          ],
          "suppressions": [
            "기사까지 묶어 불신했던 감정은 줄여 말한다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-4:act:2",
              "factText": "무조건 안 된다고 한 게 아니라 누가 언제 들어오는지 밝히라고 한 겁니다.",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
              "id": "tenant02:a:d-4:responsibility:3",
              "factText": "그때는 어떤 기사도 믿을 수 없어 문 자체를 열기 싫었다.",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "네, 그 이틀은 제가 기사 방문을 끊었습니다."
          ],
          "privateKnowledge": [
            "무단 출입 의심이 없었으면 그렇게까지 버티지 않았을 거라고 안다."
          ],
          "suppressions": [
            "지연 비용이 생길 수 있다는 건 알고도 강행한 점은 감춘다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-4:act:4",
              "factText": "네, 그 이틀은 제가 기사 방문을 끊었습니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
              "id": "tenant02:a:d-4:responsibility:5",
              "factText": "무단 출입 의심이 없었으면 그렇게까지 버티지 않았을 거라고 안다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "일정을 민 건 맞지만, 먼저 선을 넘은 쪽이 있었으니 제가 겁먹은 겁니다."
          ],
          "privateKnowledge": [
            "화가 나서 일부러 바로 일정 재조율을 안 한 마음도 있었다."
          ],
          "suppressions": [
            "분노 섞인 보복 심리는 아직 숨긴다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-4:act:6",
              "factText": "일정을 민 건 맞지만, 먼저 선을 넘은 쪽이 있었으니 제가 겁먹은 겁니다.",
              "tags": [
                "act",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
              "id": "tenant02:a:d-4:responsibility:7",
              "factText": "화가 나서 일부러 바로 일정 재조율을 안 한 마음도 있었다.",
              "tags": [
                "responsibility",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
            "제가 먼저 숙이면 제가 괜한 사람 되는 것 같아서 더 버텼습니다."
          ],
          "privateKnowledge": [
            "체면 때문에 재조율 제안을 늦췄다."
          ],
          "suppressions": [
            "합리화였다는 자각은 아직 끝까지 내놓지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-4:act:8",
              "factText": "제가 먼저 숙이면 제가 괜한 사람 되는 것 같아서 더 버텼습니다.",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-4:responsibility:9",
              "factText": "체면 때문에 재조율 제안을 늦췄다.",
              "tags": [
                "responsibility",
                "shame"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
            "무단 출입 의심이 계기였어도, 제가 이틀간 협조를 멈춰 일정이 밀린 건 인정합니다."
          ],
          "privateKnowledge": [
            "재방문 비용까지 자신의 선택이 이어졌다고 받아들인다."
          ],
          "suppressions": [
            "수리 외 다른 갈등 감정은 이 쟁점에서 앞세우지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-4:act:10",
              "factText": "무단 출입 의심이 계기였어도, 제가 이틀간 협조를 멈춰 일정이 밀린 건 인정합니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-4:responsibility:11",
              "factText": "재방문 비용까지 자신의 선택이 이어졌다고 받아들인다.",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간",
                  "neutral": "그 기간",
                  "dateExact": "기사 거절 이틀",
                  "period": "재조율 전"
                },
                "action": {
                  "exact": "기사 방문 전면 거부",
                  "neutral": "방문 거절"
                },
                "cost": {
                  "exact": "재방문 수수료",
                  "neutral": "그 비용"
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
            "그 조항은 긴급 상황이어도 제 확인 없는 출입을 열어 준다고 보지 않았습니다."
          ],
          "privateKnowledge": [
            "봄철 예외 발언 이후 문구를 더 엄격하게 붙잡았다."
          ],
          "suppressions": [
            "문구에 1회 긴급 확인 여지가 있는 점은 꺼낸다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-5:rule:0",
              "factText": "그 조항은 긴급 상황이어도 제 확인 없는 출입을 열어 준다고 보지 않았습니다.",
              "tags": [
                "rule",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
              "id": "tenant02:a:d-5:privacy:1",
              "factText": "봄철 예외 발언 이후 문구를 더 엄격하게 붙잡았다.",
              "tags": [
                "privacy",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "설령 긴급 확인이 가능해도 연락과 통지가 먼저여야 했습니다."
          ],
          "privateKnowledge": [
            "문구 자체가 완전 금지는 아니라는 점은 안다."
          ],
          "suppressions": [
            "자신이 조항을 가장 좁게 읽고 있다는 점을 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-5:rule:2",
              "factText": "설령 긴급 확인이 가능해도 연락과 통지가 먼저여야 했습니다.",
              "tags": [
                "rule",
                "uncertainty"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
              "id": "tenant02:a:d-5:privacy:3",
              "factText": "문구 자체가 완전 금지는 아니라는 점은 안다.",
              "tags": [
                "privacy",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "특약상 1회 긴급 확인은 열려 있어도, 즉시 통지와 보관 고지는 별개입니다."
          ],
          "privateKnowledge": [
            "최소한 한 번의 확인 가능성은 인정한다."
          ],
          "suppressions": [
            "자기 해석이 너무 절대적이었다는 평가는 미룬다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-5:rule:4",
              "factText": "특약상 1회 긴급 확인은 열려 있어도, 즉시 통지와 보관 고지는 별개입니다.",
              "tags": [
                "rule",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
              "id": "tenant02:a:d-5:privacy:5",
              "factText": "최소한 한 번의 확인 가능성은 인정한다.",
              "tags": [
                "privacy",
                "threshold"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "저도 한 번의 급한 확인 여지는 압니다.",
            "하지만 그래서 무단 촬영까지 받아들일 수는 없었습니다."
          ],
          "privateKnowledge": [
            "무단 출입 의심이 생긴 뒤에는 어떤 출입도 같은 침범으로 느꼈다."
          ],
          "suppressions": [
            "조항 논리보다 감정이 더 앞섰다는 점을 뺀다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:a:tell:screenshot_strike",
            "tenant02:a:tell:interruption_ramp"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-5:rule:6",
              "factText": "저도 한 번의 급한 확인 여지는 압니다. 하지만 그래서 무단 촬영까지 받아들일 수는 없었습니다.",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
              "id": "tenant02:a:d-5:privacy:7",
              "factText": "무단 출입 의심이 생긴 뒤에는 어떤 출입도 같은 침범으로 느꼈다.",
              "tags": [
                "privacy",
                "fear"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
            "그 문구를 볼 때마다 계약 문제가 아니라 제 방이 열렸다는 감정이 먼저 올라왔습니다."
          ],
          "privateKnowledge": [
            "조항 해석과 사생활 침해 감정을 일부러 분리하지 못했다."
          ],
          "suppressions": [
            "그 감정이 판단을 과하게 만들었다는 인정은 아직 주저한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-5:rule:8",
              "factText": "그 문구를 볼 때마다 계약 문제가 아니라 제 방이 열렸다는 감정이 먼저 올라왔습니다.",
              "tags": [
                "rule",
                "emotion"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-5:privacy:9",
              "factText": "조항 해석과 사생활 침해 감정을 일부러 분리하지 못했다.",
              "tags": [
                "privacy",
                "shame"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
            "긴급 조항에 1회 확인 여지는 있었지만, 촬영 보관과 날짜 위장은 그 범위를 넘습니다."
          ],
          "privateKnowledge": [
            "자신도 조항을 지나치게 좁게 본 부분은 받아들인다."
          ],
          "suppressions": [
            "긴급 상황에서의 협조 필요성 자체는 여전히 약하게만 말한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:a:tell:interruption_ramp",
            "tenant02:a:tell:locked_door_repetition"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:a:d-5:rule:10",
              "factText": "긴급 조항에 1회 확인 여지는 있었지만, 촬영 보관과 날짜 위장은 그 범위를 넘습니다.",
              "tags": [
                "rule",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:a:d-5:privacy:11",
              "factText": "자신도 조항을 지나치게 좁게 본 부분은 받아들인다.",
              "tags": [
                "privacy",
                "harm"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 긴급 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "privacy": {
                  "exact": "사생활 침해 감정",
                  "neutral": "그 감정"
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
      }
    },
    "b": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "그건 무단 출입이 아니라 누수 확인이었습니다."
          ],
          "privateKnowledge": [
            "세입자가 안 된다고 했지만 그냥 먼저 봤다."
          ],
          "suppressions": [
            "거절 직후 들어간 timing을 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-1:act:0",
              "factText": "그건 무단 출입이 아니라 누수 확인이었습니다.",
              "tags": [
                "act",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:b:d-1:fear:1",
              "factText": "세입자가 안 된다고 했지만 그냥 먼저 봤다.",
              "tags": [
                "fear",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "봄에도 급하면 키로 볼 수 있다는 얘기가 있었고 저는 그 연장선으로 이해했습니다."
          ],
          "privateKnowledge": [
            "그 말이 한 번의 예외였을 수 있다는 불안이 있다."
          ],
          "suppressions": [
            "합의일 이틀 전이라는 점을 흐린다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-1:act:2",
              "factText": "봄에도 급하면 키로 볼 수 있다는 얘기가 있었고 저는 그 연장선으로 이해했습니다.",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:b:d-1:fear:3",
              "factText": "그 말이 한 번의 예외였을 수 있다는 불안이 있다.",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "합의된 날보다 먼저 들어간 건 맞습니다.",
            "하지만 상황이 급하다고 봤습니다."
          ],
          "privateKnowledge": [
            "먼저 거절을 받고도 들어가면 문제 될 걸 알고 있었다."
          ],
          "suppressions": [
            "즉시 통지하지 않은 점은 뺀다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-1:act:4",
              "factText": "합의된 날보다 먼저 들어간 건 맞습니다. 하지만 상황이 급하다고 봤습니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:b:d-1:fear:5",
              "factText": "먼저 거절을 받고도 들어가면 문제 될 걸 알고 있었다.",
              "tags": [
                "fear",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "예전 말 한마디를 제가 넓게 받아들인 건 있을 수 있습니다.",
            "그래도 누수 번짐이 무서워 선확인을 택했습니다."
          ],
          "privateKnowledge": [
            "자기 편한 해석이었다는 자각이 있다."
          ],
          "suppressions": [
            "세입자 의사보다 건물 불안을 우선한 판단을 축소한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:blame_loop",
            "tenant02:b:tell:sacrifice_rollcall"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-1:act:6",
              "factText": "예전 말 한마디를 제가 넓게 받아들인 건 있을 수 있습니다. 그래도 누수 번짐이 무서워 선확인을 택했습니다.",
              "tags": [
                "act",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
              "id": "tenant02:b:d-1:fear:7",
              "factText": "자기 편한 해석이었다는 자각이 있다.",
              "tags": [
                "fear",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
            "그때는 장마 전에 집이 더 망가질까 무서웠습니다.",
            "겁이 나니 절차보다 확인이 먼저였습니다."
          ],
          "privateKnowledge": [
            "피해자처럼 말하면 비난이 줄 거라는 계산도 있다."
          ],
          "suppressions": [
            "자신이 먼저 선을 넘었다는 문장은 아직 직접 피한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-1:act:8",
              "factText": "그때는 장마 전에 집이 더 망가질까 무서웠습니다. 겁이 나니 절차보다 확인이 먼저였습니다.",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-1:fear:9",
              "factText": "피해자처럼 말하면 비난이 줄 거라는 계산도 있다.",
              "tags": [
                "fear",
                "shame"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
            "네, 저는 합의 전 먼저 들어가 사진을 찍었습니다.",
            "급했다는 사정이 있어도 사전 동의 없는 출입이었습니다."
          ],
          "privateKnowledge": [
            "자신의 출입이 이후 불신과 지연의 시발점이었다고 안다."
          ],
          "suppressions": [
            "그 출입이 만든 후속 비용 문제는 여기서는 크게 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-1:act:10",
              "factText": "네, 저는 합의 전 먼저 들어가 사진을 찍었습니다. 급했다는 사정이 있어도 사전 동의 없는 출입이었습니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-1:fear:11",
              "factText": "자신의 출입이 이후 불신과 지연의 시발점이었다고 안다.",
              "tags": [
                "fear",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "합의된 점검일 이틀 전",
                  "neutral": "그때",
                  "dateExact": "점검일 이틀 전",
                  "period": "합의 전"
                },
                "tool": {
                  "exact": "마스터키",
                  "neutral": "열쇠"
                },
                "action": {
                  "exact": "사전 동의 없는 출입과 촬영",
                  "neutral": "그 출입"
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
            "곰팡이는 환기 안 하고 짐을 쌓아 둔 탓이 컸습니다."
          ],
          "privateKnowledge": [
            "배관 문제일 수도 있다는 말은 기사에게 얼핏 들었다."
          ],
          "suppressions": [
            "공용배관 점검 메모 존재를 앞으로 미룬다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-2:context:0",
              "factText": "곰팡이는 환기 안 하고 짐을 쌓아 둔 탓이 컸습니다.",
              "tags": [
                "context",
                "counter"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "deny",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-2:responsibility:1",
              "factText": "배관 문제일 수도 있다는 말은 기사에게 얼핏 들었다.",
              "tags": [
                "responsibility",
                "self_justification"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "deny",
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
            "누수 영향이 없다는 건 아니지만, 생활 관리 문제가 더 커 보였습니다."
          ],
          "privateKnowledge": [
            "확실한 진단 없이 생활 탓으로 먼저 몰아간 면이 있다."
          ],
          "suppressions": [
            "원인을 정확히 모른다는 불확실성을 낮춘다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-2:context:2",
              "factText": "누수 영향이 없다는 건 아니지만, 생활 관리 문제가 더 커 보였습니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
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
              "id": "tenant02:b:d-2:responsibility:3",
              "factText": "확실한 진단 없이 생활 탓으로 먼저 몰아간 면이 있다.",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
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
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "관리기록을 보니 배관 쪽 흔적이 먼저 있었던 건 인정해야겠군요."
          ],
          "privateKnowledge": [
            "자신이 건물 책임을 피하려 생활 요인을 크게 본 면이 있다."
          ],
          "suppressions": [
            "초기 대응이 늦었다는 자기 쪽 부담은 아직 줄인다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-2:context:4",
              "factText": "관리기록을 보니 배관 쪽 흔적이 먼저 있었던 건 인정해야겠군요.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
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
              "id": "tenant02:b:d-2:responsibility:5",
              "factText": "자신이 건물 책임을 피하려 생활 요인을 크게 본 면이 있다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "1차 원인은 배관 누수였고, 세입자 짐 적치와 지연은 악화 요인 정도로 보입니다."
          ],
          "privateKnowledge": [
            "생활 탓만 고집하면 사진 문제까지 함께 불리해진다고 판단한다."
          ],
          "suppressions": [
            "자신의 공용배관 관리 부실 프레임은 완만하게 표현한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:blame_loop",
            "tenant02:b:tell:sacrifice_rollcall"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-2:context:6",
              "factText": "1차 원인은 배관 누수였고, 세입자 짐 적치와 지연은 악화 요인 정도로 보입니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
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
              "id": "tenant02:b:d-2:responsibility:7",
              "factText": "생활 탓만 고집하면 사진 문제까지 함께 불리해진다고 판단한다.",
              "tags": [
                "responsibility",
                "fear"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "partial",
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
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "집주인으로서 관리 못 했다는 말이 제일 아팠습니다.",
            "그래서 생활 탓을 더 붙들고 있었던 것 같습니다."
          ],
          "privateKnowledge": [
            "평판을 지키려 원인 판단을 자신에게 유리하게 끌고 갔다."
          ],
          "suppressions": [
            "방어 심리가 강했다는 표현은 끝까지는 줄인다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-2:context:8",
              "factText": "집주인으로서 관리 못 했다는 말이 제일 아팠습니다. 그래서 생활 탓을 더 붙들고 있었던 것 같습니다.",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-2:responsibility:9",
              "factText": "평판을 지키려 원인 판단을 자신에게 유리하게 끌고 갔다.",
              "tags": [
                "responsibility",
                "shame"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
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
            "1차 원인은 공용배관 연결부 누수였고, 세입자 쪽 적치와 지연은 악화 요인이었습니다."
          ],
          "privateKnowledge": [
            "60대40 정도로 책임이 갈린다고 받아들인다."
          ],
          "suppressions": [
            "세부 비용 정산 방식은 이 쟁점에서 바로 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-2:context:10",
              "factText": "1차 원인은 공용배관 연결부 누수였고, 세입자 쪽 적치와 지연은 악화 요인이었습니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-2:responsibility:11",
              "factText": "60대40 정도로 책임이 갈린다고 받아들인다.",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "cause": {
                  "exact": "공용배관 연결부 누수",
                  "neutral": "배관 문제"
                },
                "factor": {
                  "exact": "세입자 짐 적치와 지연",
                  "neutral": "세입자 측 대응"
                },
                "institution": {
                  "exact": "관리기록과 기사 진단",
                  "neutral": "기록"
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
        }
      },
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "사진 시각은 제가 바꾼 게 아닙니다.",
            "보이는 화면 그대로 냈습니다."
          ],
          "privateKnowledge": [
            "원본과 다른 화면 캡처를 제출했다."
          ],
          "suppressions": [
            "캡처 생성 시점을 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-3:evidence:0",
              "factText": "사진 시각은 제가 바꾼 게 아닙니다. 보이는 화면 그대로 냈습니다.",
              "tags": [
                "evidence",
                "counter"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
              "id": "tenant02:b:d-3:shame:1",
              "factText": "원본과 다른 화면 캡처를 제출했다.",
              "tags": [
                "shame",
                "self_justification"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
            "원본 시간과 화면 표시가 다르게 보일 수는 있습니다."
          ],
          "privateKnowledge": [
            "합의된 점검일처럼 보이는 화면을 골라 냈다는 자각이 있다."
          ],
          "suppressions": [
            "원본 파일도 함께 들고 있었다는 사실을 뒤로 미룬다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-3:evidence:2",
              "factText": "원본 시간과 화면 표시가 다르게 보일 수는 있습니다.",
              "tags": [
                "evidence",
                "uncertainty"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
              "id": "tenant02:b:d-3:shame:3",
              "factText": "합의된 점검일처럼 보이는 화면을 골라 냈다는 자각이 있다.",
              "tags": [
                "shame",
                "context"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "캡처본 표시가 원본과 다르게 보일 수는 있겠습니다.",
            "분쟁용으로 정리한 화면이었으니까요."
          ],
          "privateKnowledge": [
            "날짜가 안전해 보이길 바라는 마음이 있었다."
          ],
          "suppressions": [
            "의도성을 전면 부인한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-3:evidence:4",
              "factText": "캡처본 표시가 원본과 다르게 보일 수는 있겠습니다. 분쟁용으로 정리한 화면이었으니까요.",
              "tags": [
                "evidence",
                "admission"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
              "id": "tenant02:b:d-3:shame:5",
              "factText": "날짜가 안전해 보이길 바라는 마음이 있었다.",
              "tags": [
                "shame",
                "responsibility"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "원본은 있었고 제출용 캡처를 따로 만든 것도 맞습니다.",
            "보기 좋게 정리하려다 선을 넘었습니다."
          ],
          "privateKnowledge": [
            "원본을 내면 합의 전 출입이 드러날까 걱정했다."
          ],
          "suppressions": [
            "관리 부실 집주인처럼 보일까 두려웠다는 동기를 약하게 말한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:blame_loop",
            "tenant02:b:tell:sacrifice_rollcall"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-3:evidence:6",
              "factText": "원본은 있었고 제출용 캡처를 따로 만든 것도 맞습니다. 보기 좋게 정리하려다 선을 넘었습니다.",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
              "id": "tenant02:b:d-3:shame:7",
              "factText": "원본을 내면 합의 전 출입이 드러날까 걱정했다.",
              "tags": [
                "shame",
                "fear"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
            "그 날짜가 다르게 보인다고 해서 제가 다 거짓인 사람처럼 되는 게 제일 두려웠습니다."
          ],
          "privateKnowledge": [
            "평판 방어를 위해 캡처를 고른 선택이었다."
          ],
          "suppressions": [
            "자기보호 때문에 날짜 문제를 덮으려 했다는 직접 표현은 주저한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-3:evidence:8",
              "factText": "그 날짜가 다르게 보인다고 해서 제가 다 거짓인 사람처럼 되는 게 제일 두려웠습니다.",
              "tags": [
                "evidence",
                "emotion"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-3:shame:9",
              "factText": "평판 방어를 위해 캡처를 고른 선택이었다.",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
            "제가 낸 표시 시각은 원본 촬영시각이 아니었습니다.",
            "합의된 점검일처럼 보이는 캡처를 제출했습니다."
          ],
          "privateKnowledge": [
            "증거 신뢰를 스스로 무너뜨렸다는 점을 안다."
          ],
          "suppressions": [
            "제출 이후 신뢰 회복 방안은 아직 스스로 먼저 내놓지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-3:evidence:10",
              "factText": "제가 낸 표시 시각은 원본 촬영시각이 아니었습니다. 합의된 점검일처럼 보이는 캡처를 제출했습니다.",
              "tags": [
                "evidence",
                "admission"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-3:shame:11",
              "factText": "증거 신뢰를 스스로 무너뜨렸다는 점을 안다.",
              "tags": [
                "shame",
                "harm"
              ],
              "slots": {
                "file": {
                  "exact": "제출용 갤러리 캡처",
                  "neutral": "캡처본"
                },
                "time": {
                  "exact": "원본과 다른 표시 시각",
                  "neutral": "날짜 표시"
                },
                "purpose": {
                  "exact": "분쟁용 정리",
                  "neutral": "제출 정리"
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
            "민석 씨가 이틀 동안 기사 방문을 막아 일정이 밀렸습니다."
          ],
          "privateKnowledge": [
            "그 전에 자신이 불신 원인을 만들었다는 점은 안다."
          ],
          "suppressions": [
            "무단 출입 의심의 계기를 줄여 말한다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-4:act:0",
              "factText": "민석 씨가 이틀 동안 기사 방문을 막아 일정이 밀렸습니다.",
              "tags": [
                "act",
                "counter"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
                }
              },
              "stanceHints": [
                "deny",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-4:counter:1",
              "factText": "그 전에 자신이 불신 원인을 만들었다는 점은 안다.",
              "tags": [
                "counter",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
                }
              },
              "stanceHints": [
                "deny",
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "장비를 치울 시간 달라는 수준이 아니라 아예 방문을 못 하게 했습니다."
          ],
          "privateKnowledge": [
            "그 거절이 단순 변덕만은 아니었다고 느낀다."
          ],
          "suppressions": [
            "세입자 불안을 유발한 자기 행동을 후순위로 둔다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-4:act:2",
              "factText": "장비를 치울 시간 달라는 수준이 아니라 아예 방문을 못 하게 했습니다.",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
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
              "id": "tenant02:b:d-4:counter:3",
              "factText": "그 거절이 단순 변덕만은 아니었다고 느낀다.",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
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
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "실제로는 무단 출입 의심이 커진 뒤 거절이 굳어진 것으로 보입니다."
          ],
          "privateKnowledge": [
            "그 의심이 근거 없는 게 아니라는 점을 알기 시작한다."
          ],
          "suppressions": [
            "일정 지연 책임을 자신과 나눠 가져야 한다는 말은 아직 미룬다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-4:act:4",
              "factText": "실제로는 무단 출입 의심이 커진 뒤 거절이 굳어진 것으로 보입니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
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
              "id": "tenant02:b:d-4:counter:5",
              "factText": "그 의심이 근거 없는 게 아니라는 점을 알기 시작한다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "지연은 세입자 쪽이 직접 만들었지만, 그 불신을 키운 배경에는 제 행동도 있었습니다."
          ],
          "privateKnowledge": [
            "재방문 비용을 들며 더 억울한 피해자처럼 굴고 싶었다."
          ],
          "suppressions": [
            "피해자 프레임의 계산은 숨긴다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:blame_loop",
            "tenant02:b:tell:sacrifice_rollcall"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-4:act:6",
              "factText": "지연은 세입자 쪽이 직접 만들었지만, 그 불신을 키운 배경에는 제 행동도 있었습니다.",
              "tags": [
                "act",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
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
              "id": "tenant02:b:d-4:counter:7",
              "factText": "재방문 비용을 들며 더 억울한 피해자처럼 굴고 싶었다.",
              "tags": [
                "counter",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
                }
              },
              "stanceHints": [
                "partial",
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
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "돈 넣고 기사 돌리고 다시 부른 입장에서 화가 컸습니다.",
            "그래서 세입자 지연만 더 크게 말했습니다."
          ],
          "privateKnowledge": [
            "일정 비용을 앞세우면 자신의 선넘음이 가려진다고 느꼈다."
          ],
          "suppressions": [
            "자기방어 계산을 완전히 털어놓진 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-4:act:8",
              "factText": "돈 넣고 기사 돌리고 다시 부른 입장에서 화가 컸습니다. 그래서 세입자 지연만 더 크게 말했습니다.",
              "tags": [
                "act",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-4:counter:9",
              "factText": "일정 비용을 앞세우면 자신의 선넘음이 가려진다고 느꼈다.",
              "tags": [
                "counter",
                "shame"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
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
            "민석 씨가 이틀간 협조를 멈춰 일정이 밀린 건 맞지만, 그 불신의 원인에는 제 무단 출입도 있었습니다."
          ],
          "privateKnowledge": [
            "지연 책임을 단독으로 세입자에게 돌릴 수 없다고 받아들인다."
          ],
          "suppressions": [
            "세부 손해배상 기준은 아직 분리해 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-4:act:10",
              "factText": "민석 씨가 이틀간 협조를 멈춰 일정이 밀린 건 맞지만, 그 불신의 원인에는 제 무단 출입도 있었습니다.",
              "tags": [
                "act",
                "admission"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-4:counter:11",
              "factText": "지연 책임을 단독으로 세입자에게 돌릴 수 없다고 받아들인다.",
              "tags": [
                "counter",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "이틀간 기사 방문 중단",
                  "neutral": "그 기간"
                },
                "cost": {
                  "exact": "예약금과 재방문 수수료",
                  "neutral": "그 비용"
                },
                "action": {
                  "exact": "협조 지연",
                  "neutral": "지연"
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
        }
      },
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "긴급 하자 조항이면 먼저 들어가 확인하고 기록할 수 있다고 봤습니다."
          ],
          "privateKnowledge": [
            "보관 고지가 따로라는 문구를 기억한다."
          ],
          "suppressions": [
            "조항의 한계를 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-5:rule:0",
              "factText": "긴급 하자 조항이면 먼저 들어가 확인하고 기록할 수 있다고 봤습니다.",
              "tags": [
                "rule",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
              "id": "tenant02:b:d-5:self_justification:1",
              "factText": "보관 고지가 따로라는 문구를 기억한다.",
              "tags": [
                "self_justification",
                "fear"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "적어도 급한 상황에서는 확인과 기록 정도는 허용된다고 이해했습니다."
          ],
          "privateKnowledge": [
            "그 해석이 자신에게 유리하다는 것도 안다."
          ],
          "suppressions": [
            "반복 촬영과 보관은 별도라는 점을 흐린다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-5:rule:2",
              "factText": "적어도 급한 상황에서는 확인과 기록 정도는 허용된다고 이해했습니다.",
              "tags": [
                "rule",
                "uncertainty"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
              "id": "tenant02:b:d-5:self_justification:3",
              "factText": "그 해석이 자신에게 유리하다는 것도 안다.",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "무제한 면책은 아니어도 긴급 확인과 촬영은 함께 갈 수 있다고 생각했습니다."
          ],
          "privateKnowledge": [
            "사실 문구가 확인과 보관 고지를 분리한다는 점을 안다."
          ],
          "suppressions": [
            "자기 해석이 넓다는 자각은 감춘다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:sacrifice_rollcall",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-5:rule:4",
              "factText": "무제한 면책은 아니어도 긴급 확인과 촬영은 함께 갈 수 있다고 생각했습니다.",
              "tags": [
                "rule",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
              "id": "tenant02:b:d-5:self_justification:5",
              "factText": "사실 문구가 확인과 보관 고지를 분리한다는 점을 안다.",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "지금 보니 제가 그 조항을 넓게 붙잡고 있었던 건 맞습니다.",
            "그래도 급박함이 있었습니다."
          ],
          "privateKnowledge": [
            "세입자 협조 부족 프레임으로 조항 문제를 덮고 싶었다."
          ],
          "suppressions": [
            "자기 선의 서사가 방패였다는 점을 줄인다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant02:b:tell:blame_loop",
            "tenant02:b:tell:sacrifice_rollcall"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-5:rule:6",
              "factText": "지금 보니 제가 그 조항을 넓게 붙잡고 있었던 건 맞습니다. 그래도 급박함이 있었습니다.",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
              "id": "tenant02:b:d-5:self_justification:7",
              "factText": "세입자 협조 부족 프레임으로 조항 문제를 덮고 싶었다.",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
            "저는 건물 지키느라 뛰어다녔는데, 그 과정 전체가 다 악의였던 것처럼 보이는 게 제일 억울했습니다."
          ],
          "privateKnowledge": [
            "피해자처럼 들리면 조항 과장이 덜 문제 될 거라 계산했다."
          ],
          "suppressions": [
            "그 계산을 인정하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-5:rule:8",
              "factText": "저는 건물 지키느라 뛰어다녔는데, 그 과정 전체가 다 악의였던 것처럼 보이는 게 제일 억울했습니다.",
              "tags": [
                "rule",
                "emotion"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-5:self_justification:9",
              "factText": "피해자처럼 들리면 조항 과장이 덜 문제 될 거라 계산했다.",
              "tags": [
                "self_justification",
                "shame"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
            "긴급출입 조항은 1회 확인과 즉시 통지 정도만 허용할 뿐, 반복 촬영과 보관, 날짜 문제까지 면책하지 않습니다."
          ],
          "privateKnowledge": [
            "자신이 조항을 방패처럼 넓게 썼다고 받아들인다."
          ],
          "suppressions": [
            "긴급 상황의 실제 압박은 변명처럼 보일까 봐 짧게만 덧붙인다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant02:b:tell:wounded_tone",
            "tenant02:b:tell:blame_loop"
          ],
          "claimAtoms": [
            {
              "id": "tenant02:b:d-5:rule:10",
              "factText": "긴급출입 조항은 1회 확인과 즉시 통지 정도만 허용할 뿐, 반복 촬영과 보관, 날짜 문제까지 면책하지 않습니다.",
              "tags": [
                "rule",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "tenant02:b:d-5:self_justification:11",
              "factText": "자신이 조항을 방패처럼 넓게 썼다고 받아들인다.",
              "tags": [
                "self_justification",
                "harm"
              ],
              "slots": {
                "rule": {
                  "exact": "1회 확인과 즉시 통지",
                  "neutral": "긴급 조항"
                },
                "storage": {
                  "exact": "촬영자료 보관 별도 고지",
                  "neutral": "보관 고지"
                },
                "frame": {
                  "exact": "세입자 협조 부족 프레임",
                  "neutral": "그 프레임"
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
      }
    }
  }
}


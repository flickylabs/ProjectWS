export const workplace08V2Atoms = {
  "caseId": "workplace-08",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 그 결제를 개인상환·상계로 합의한 적이 없습니다.",
            "김나래 씨가 보류 탭에 임의로 넣은 겁니다."
          ],
          "privateKnowledge": [
            "최정훈은 월말 전에 개인분을 메우고 닫자고 먼저 말해 놓고, 감사가 시작되자 그 합의를 부인했다.",
            "승진 심사와 비용통제 평판이 걸리자 김나래에게 단독 책임을 씌우는 쪽으로 태도를 바꿨다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "클로징 메일에 남은 자신의 회신 문구",
            "메신저에서 보류 탭 입력 뒤 상환 시점을 계속 확인한 흐름",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-1:denial:0",
              "factText": "저는 그 결제를 개인상환·상계로 합의한 적이 없습니다.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-1:responsibility:1",
              "factText": "김나래 씨가 보류 탭에 임의로 넣은 겁니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
            "보류 항목을 월말에 다시 보자는 얘기는 있었습니다.",
            "하지만 개인 결제를 묵인한 합의는 아니었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 월말 전에 개인분을 메우고 닫자고 먼저 말해 놓고, 감사가 시작되자 그 합의를 부인했다.",
            "승진 심사와 비용통제 평판이 걸리자 김나래에게 단독 책임을 씌우는 쪽으로 태도를 바꿨다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "클로징 메일에 남은 자신의 회신 문구",
            "메신저에서 보류 탭 입력 뒤 상환 시점을 계속 확인한 흐름",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-1:context:2",
              "factText": "보류 항목을 월말에 다시 보자는 얘기는 있었습니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-1:rule:3",
              "factText": "하지만 개인 결제를 묵인한 합의는 아니었습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "제가 월말 정리 얘기를 한 건 맞습니다.",
            "다만 사적 사용분까지 허용한 건 아니었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 월말 전에 개인분을 메우고 닫자고 먼저 말해 놓고, 감사가 시작되자 그 합의를 부인했다.",
            "승진 심사와 비용통제 평판이 걸리자 김나래에게 단독 책임을 씌우는 쪽으로 태도를 바꿨다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "클로징 메일에 남은 자신의 회신 문구",
            "메신저에서 보류 탭 입력 뒤 상환 시점을 계속 확인한 흐름",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-1:admission:4",
              "factText": "제가 월말 정리 얘기를 한 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:a:d-1:rule:5",
              "factText": "다만 사적 사용분까지 허용한 건 아니었습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 보류 탭 정리를 말한 건 맞습니다.",
            "그래도 김나래 씨 쪽도 사적 항목을 숨기는 선택을 했습니다."
          ],
          "privateKnowledge": [
            "최정훈은 월말 전에 개인분을 메우고 닫자고 먼저 말해 놓고, 감사가 시작되자 그 합의를 부인했다.",
            "승진 심사와 비용통제 평판이 걸리자 김나래에게 단독 책임을 씌우는 쪽으로 태도를 바꿨다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "클로징 메일에 남은 자신의 회신 문구",
            "메신저에서 보류 탭 입력 뒤 상환 시점을 계속 확인한 흐름",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-1:admission:6",
              "factText": "제가 보류 탭 정리를 말한 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-1:counter:7",
              "factText": "그래도 김나래 씨 쪽도 사적 항목을 숨기는 선택을 했습니다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "감사가 시작되자 제가 말을 줄인 건 사실입니다.",
            "승진 심사 평판이 걸려 있어 합의를 축소했습니다."
          ],
          "privateKnowledge": [
            "최정훈은 월말 전에 개인분을 메우고 닫자고 먼저 말해 놓고, 감사가 시작되자 그 합의를 부인했다.",
            "승진 심사와 비용통제 평판이 걸리자 김나래에게 단독 책임을 씌우는 쪽으로 태도를 바꿨다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "클로징 메일에 남은 자신의 회신 문구",
            "메신저에서 보류 탭 입력 뒤 상환 시점을 계속 확인한 흐름",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-1:emotion:8",
              "factText": "감사가 시작되자 제가 말을 줄인 건 사실입니다.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-1:motive:9",
              "factText": "승진 심사 평판이 걸려 있어 합의를 축소했습니다.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
            "제가 먼저 개인상환·상계로 닫자고 합의했습니다.",
            "그 뒤 감사가 시작되자 김나래 씨 단독 책임처럼 돌린 제 책임입니다."
          ],
          "privateKnowledge": [
            "최정훈은 월말 전에 개인분을 메우고 닫자고 먼저 말해 놓고, 감사가 시작되자 그 합의를 부인했다.",
            "승진 심사와 비용통제 평판이 걸리자 김나래에게 단독 책임을 씌우는 쪽으로 태도를 바꿨다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "클로징 메일에 남은 자신의 회신 문구",
            "메신저에서 보류 탭 입력 뒤 상환 시점을 계속 확인한 흐름",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-1:admission:10",
              "factText": "제가 먼저 개인상환·상계로 닫자고 합의했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:a:d-1:harm:11",
              "factText": "그 뒤 감사가 시작되자 김나래 씨 단독 책임처럼 돌린 제 책임입니다.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 정리 방식"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
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
            "영수증 재발급과 품목 축소는 김나래 씨가 한 일입니다.",
            "저는 그런 방식까지 지시한 적이 없습니다."
          ],
          "privateKnowledge": [
            "최정훈은 김나래가 감사 직후 재발급 영수증과 품목 축소를 요청한 사실을 안다.",
            "동시에 자신이 월말 전에 문제를 덜 보이게 닫으려 압박한 분위기가 있었음을 안다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "문제 품목이 드러나지 않길 바랐던 자신의 이해관계",
            "김나래가 그렇게 움직일 만한 압박을 자신이 준 사실",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-2:denial:0",
              "factText": "영수증 재발급과 품목 축소는 김나래 씨가 한 일입니다.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-2:responsibility:1",
              "factText": "저는 그런 방식까지 지시한 적이 없습니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
            "품목 정리가 있었다는 보고는 들었습니다.",
            "하지만 구체적 문구 변경까지 승인한 건 아닙니다."
          ],
          "privateKnowledge": [
            "최정훈은 김나래가 감사 직후 재발급 영수증과 품목 축소를 요청한 사실을 안다.",
            "동시에 자신이 월말 전에 문제를 덜 보이게 닫으려 압박한 분위기가 있었음을 안다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "문제 품목이 드러나지 않길 바랐던 자신의 이해관계",
            "김나래가 그렇게 움직일 만한 압박을 자신이 준 사실",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-2:context:2",
              "factText": "품목 정리가 있었다는 보고는 들었습니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-2:rule:3",
              "factText": "하지만 구체적 문구 변경까지 승인한 건 아닙니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
            "재발급이 있었다는 건 알았습니다.",
            "다만 감사용 세탁까지 예상한 건 아니었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 김나래가 감사 직후 재발급 영수증과 품목 축소를 요청한 사실을 안다.",
            "동시에 자신이 월말 전에 문제를 덜 보이게 닫으려 압박한 분위기가 있었음을 안다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "문제 품목이 드러나지 않길 바랐던 자신의 이해관계",
            "김나래가 그렇게 움직일 만한 압박을 자신이 준 사실",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-2:admission:4",
              "factText": "재발급이 있었다는 건 알았습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:a:d-2:rule:5",
              "factText": "다만 감사용 세탁까지 예상한 건 아니었습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 정산 압박을 준 건 맞습니다.",
            "그래도 김나래 씨 쪽도 주류와 개인물품 표기를 줄이는 선택을 했습니다."
          ],
          "privateKnowledge": [
            "최정훈은 김나래가 감사 직후 재발급 영수증과 품목 축소를 요청한 사실을 안다.",
            "동시에 자신이 월말 전에 문제를 덜 보이게 닫으려 압박한 분위기가 있었음을 안다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "문제 품목이 드러나지 않길 바랐던 자신의 이해관계",
            "김나래가 그렇게 움직일 만한 압박을 자신이 준 사실",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-2:admission:6",
              "factText": "제가 정산 압박을 준 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-2:counter:7",
              "factText": "그래도 김나래 씨 쪽도 주류와 개인물품 표기를 줄이는 선택을 했습니다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
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
            "결과적으로 제가 빨리 덮으려 한 분위기가 품목 축소로 이어진 건 압니다.",
            "관리자인 제가 그 선을 분명히 못 그었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 김나래가 감사 직후 재발급 영수증과 품목 축소를 요청한 사실을 안다.",
            "동시에 자신이 월말 전에 문제를 덜 보이게 닫으려 압박한 분위기가 있었음을 안다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "문제 품목이 드러나지 않길 바랐던 자신의 이해관계",
            "김나래가 그렇게 움직일 만한 압박을 자신이 준 사실",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-2:emotion:8",
              "factText": "결과적으로 제가 빨리 덮으려 한 분위기가 품목 축소로 이어진 건 압니다.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-2:motive:9",
              "factText": "관리자인 제가 그 선을 분명히 못 그었습니다.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
            "영수증 세탁은 김나래 씨가 직접 했습니다.",
            "그 일을 부른 압박을 제가 준 책임도 제 몫입니다."
          ],
          "privateKnowledge": [
            "최정훈은 김나래가 감사 직후 재발급 영수증과 품목 축소를 요청한 사실을 안다.",
            "동시에 자신이 월말 전에 문제를 덜 보이게 닫으려 압박한 분위기가 있었음을 안다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "문제 품목이 드러나지 않길 바랐던 자신의 이해관계",
            "김나래가 그렇게 움직일 만한 압박을 자신이 준 사실",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-2:admission:10",
              "factText": "영수증 세탁은 김나래 씨가 직접 했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:a:d-2:harm:11",
              "factText": "그 일을 부른 압박을 제가 준 책임도 제 몫입니다.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "그 상계표는 감사 직전에 급히 만든 참고표로 보였습니다.",
            "원본으로 믿을 근거가 없었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 절삭 PDF만 먼저 내고 상계표 원본과 자동백업을 끝까지 확인하지 않았다.",
            "감사가 자신의 승인 흔적과 오프북 관행까지 번질까 두려워 상계표를 나래의 급조 자료처럼 몰았다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "홍예진의 자동백업본과 카드사 메모필드 원본을 확인하지 않은 점",
            "자신이 제출한 PDF가 일부 열이 절삭된 요약본이라는 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-3:denial:0",
              "factText": "그 상계표는 감사 직전에 급히 만든 참고표로 보였습니다.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-3:responsibility:1",
              "factText": "원본으로 믿을 근거가 없었습니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
            "재무 쪽 파일일 가능성은 있었습니다.",
            "하지만 동시대 원본인지 바로 확정할 수는 없었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 절삭 PDF만 먼저 내고 상계표 원본과 자동백업을 끝까지 확인하지 않았다.",
            "감사가 자신의 승인 흔적과 오프북 관행까지 번질까 두려워 상계표를 나래의 급조 자료처럼 몰았다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "홍예진의 자동백업본과 카드사 메모필드 원본을 확인하지 않은 점",
            "자신이 제출한 PDF가 일부 열이 절삭된 요약본이라는 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-3:context:2",
              "factText": "재무 쪽 파일일 가능성은 있었습니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-3:rule:3",
              "factText": "하지만 동시대 원본인지 바로 확정할 수는 없었습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "제가 제출한 캡처만 보면 사후 정리처럼 보인 건 맞습니다.",
            "다만 그 인상에 기대어 원본 확인을 늦췄습니다."
          ],
          "privateKnowledge": [
            "최정훈은 절삭 PDF만 먼저 내고 상계표 원본과 자동백업을 끝까지 확인하지 않았다.",
            "감사가 자신의 승인 흔적과 오프북 관행까지 번질까 두려워 상계표를 나래의 급조 자료처럼 몰았다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "홍예진의 자동백업본과 카드사 메모필드 원본을 확인하지 않은 점",
            "자신이 제출한 PDF가 일부 열이 절삭된 요약본이라는 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-3:admission:4",
              "factText": "제가 제출한 캡처만 보면 사후 정리처럼 보인 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:a:d-3:rule:5",
              "factText": "다만 그 인상에 기대어 원본 확인을 늦췄습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "홍예진 씨 파일이 있었을 가능성을 제가 가볍게 본 건 맞습니다.",
            "그래도 김나래 씨 쪽도 그 표를 자기 방어에 유리하게 밀었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 절삭 PDF만 먼저 내고 상계표 원본과 자동백업을 끝까지 확인하지 않았다.",
            "감사가 자신의 승인 흔적과 오프북 관행까지 번질까 두려워 상계표를 나래의 급조 자료처럼 몰았다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "홍예진의 자동백업본과 카드사 메모필드 원본을 확인하지 않은 점",
            "자신이 제출한 PDF가 일부 열이 절삭된 요약본이라는 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-3:admission:6",
              "factText": "홍예진 씨 파일이 있었을 가능성을 제가 가볍게 본 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-3:counter:7",
              "factText": "그래도 김나래 씨 쪽도 그 표를 자기 방어에 유리하게 밀었습니다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "불리한 열이 빠진 PDF만 보고 판단한 건 사실입니다.",
            "제 승인 흔적까지 번질까 두려워 원본 확인을 미뤘습니다."
          ],
          "privateKnowledge": [
            "최정훈은 절삭 PDF만 먼저 내고 상계표 원본과 자동백업을 끝까지 확인하지 않았다.",
            "감사가 자신의 승인 흔적과 오프북 관행까지 번질까 두려워 상계표를 나래의 급조 자료처럼 몰았다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "홍예진의 자동백업본과 카드사 메모필드 원본을 확인하지 않은 점",
            "자신이 제출한 PDF가 일부 열이 절삭된 요약본이라는 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-3:emotion:8",
              "factText": "불리한 열이 빠진 PDF만 보고 판단한 건 사실입니다.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-3:motive:9",
              "factText": "제 승인 흔적까지 번질까 두려워 원본 확인을 미뤘습니다.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
            "상계표는 사후 조작이 아니라 클로징 당시 자료였습니다.",
            "제가 절삭 PDF를 내며 나래의 급조 자료처럼 보이게 만든 제 책임입니다."
          ],
          "privateKnowledge": [
            "최정훈은 절삭 PDF만 먼저 내고 상계표 원본과 자동백업을 끝까지 확인하지 않았다.",
            "감사가 자신의 승인 흔적과 오프북 관행까지 번질까 두려워 상계표를 나래의 급조 자료처럼 몰았다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "홍예진의 자동백업본과 카드사 메모필드 원본을 확인하지 않은 점",
            "자신이 제출한 PDF가 일부 열이 절삭된 요약본이라는 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-3:admission:10",
              "factText": "상계표는 사후 조작이 아니라 클로징 당시 자료였습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:a:d-3:harm:11",
              "factText": "제가 절삭 PDF를 내며 나래의 급조 자료처럼 보이게 만든 제 책임입니다.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "카드 승인내역 캡처 PDF",
                  "neutral": "그 캡처본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "감사 메모는 일반 리스크 정리였을 뿐입니다.",
            "김나래 씨를 선행 낙인찍은 적은 없습니다."
          ],
          "privateKnowledge": [
            "최정훈은 나래 면담 전에 이미 감사 대응 초안과 평가 코멘트에 부정적 문구를 넣었다.",
            "사실확인보다 관리 책임과 평판 방어를 앞세운 판단이었다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "면담 전 입력된 '비용 통제 취약' 문구",
            "초기본과 수정본이 모두 남아 선행 낙인 흐름이 드러나는 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-4:denial:0",
              "factText": "감사 메모는 일반 리스크 정리였을 뿐입니다.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
              "id": "workplace-08:a:d-4:responsibility:1",
              "factText": "김나래 씨를 선행 낙인찍은 적은 없습니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
            "초안 메모는 있었지만 참고 수준이었습니다.",
            "인사평가를 미리 굳히려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "최정훈은 나래 면담 전에 이미 감사 대응 초안과 평가 코멘트에 부정적 문구를 넣었다.",
            "사실확인보다 관리 책임과 평판 방어를 앞세운 판단이었다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "면담 전 입력된 '비용 통제 취약' 문구",
            "초기본과 수정본이 모두 남아 선행 낙인 흐름이 드러나는 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-4:context:2",
              "factText": "초안 메모는 있었지만 참고 수준이었습니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-4:rule:3",
              "factText": "인사평가를 미리 굳히려던 건 아니었습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "제가 비용 통제 취약 표현을 적은 건 맞습니다.",
            "다만 확정 판단이 아니라 참고 메모라고 여겼습니다."
          ],
          "privateKnowledge": [
            "최정훈은 나래 면담 전에 이미 감사 대응 초안과 평가 코멘트에 부정적 문구를 넣었다.",
            "사실확인보다 관리 책임과 평판 방어를 앞세운 판단이었다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "면담 전 입력된 '비용 통제 취약' 문구",
            "초기본과 수정본이 모두 남아 선행 낙인 흐름이 드러나는 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-4:admission:4",
              "factText": "제가 비용 통제 취약 표현을 적은 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:a:d-4:rule:5",
              "factText": "다만 확정 판단이 아니라 참고 메모라고 여겼습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "partial"
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
            "면담 전에 문구를 넣은 건 맞습니다.",
            "그래도 김나래 씨 쪽도 설명 없는 보류로 의심을 키웠습니다."
          ],
          "privateKnowledge": [
            "최정훈은 나래 면담 전에 이미 감사 대응 초안과 평가 코멘트에 부정적 문구를 넣었다.",
            "사실확인보다 관리 책임과 평판 방어를 앞세운 판단이었다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "면담 전 입력된 '비용 통제 취약' 문구",
            "초기본과 수정본이 모두 남아 선행 낙인 흐름이 드러나는 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-4:admission:6",
              "factText": "면담 전에 문구를 넣은 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
              "id": "workplace-08:a:d-4:counter:7",
              "factText": "그래도 김나래 씨 쪽도 설명 없는 보류로 의심을 키웠습니다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "blame"
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
            "제가 먼저 프레임을 만든 건 사실입니다.",
            "감사 전에 관리 책임이 흔들릴까 급해서 그랬습니다."
          ],
          "privateKnowledge": [
            "최정훈은 나래 면담 전에 이미 감사 대응 초안과 평가 코멘트에 부정적 문구를 넣었다.",
            "사실확인보다 관리 책임과 평판 방어를 앞세운 판단이었다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "면담 전 입력된 '비용 통제 취약' 문구",
            "초기본과 수정본이 모두 남아 선행 낙인 흐름이 드러나는 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-4:emotion:8",
              "factText": "제가 먼저 프레임을 만든 건 사실입니다.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-4:motive:9",
              "factText": "감사 전에 관리 책임이 흔들릴까 급해서 그랬습니다.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
            "제가 나래 면담 전에 '비용 통제 취약' 문구를 넣었습니다.",
            "사실확인 전 선행 낙인을 만든 제 잘못이고 제 책임입니다."
          ],
          "privateKnowledge": [
            "최정훈은 나래 면담 전에 이미 감사 대응 초안과 평가 코멘트에 부정적 문구를 넣었다.",
            "사실확인보다 관리 책임과 평판 방어를 앞세운 판단이었다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "면담 전 입력된 '비용 통제 취약' 문구",
            "초기본과 수정본이 모두 남아 선행 낙인 흐름이 드러나는 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-4:admission:10",
              "factText": "제가 나래 면담 전에 '비용 통제 취약' 문구를 넣었습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:a:d-4:harm:11",
              "factText": "사실확인 전 선행 낙인을 만든 제 잘못이고 제 책임입니다.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "오프북 상계 관행이라고 부를 만큼 돌린 적은 없습니다.",
            "일시 보류가 있었을 뿐입니다."
          ],
          "privateKnowledge": [
            "최정훈은 사적 결제를 상환 전까지 임시 상계표와 보류 탭으로 돌리는 관행을 허용했다.",
            "그 관행이 반복되며 공식 정산 절차 밖의 편법으로 굳었다는 점을 안다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "관리자가 그 관행을 끊지 않고 오히려 확인해 준 점",
            "김나래와 함께 항목을 묶고 넘긴 반복성",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-5:denial:0",
              "factText": "오프북 상계 관행이라고 부를 만큼 돌린 적은 없습니다.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-5:responsibility:1",
              "factText": "일시 보류가 있었을 뿐입니다.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
            "임시로 넘긴 적은 있어도 숨기려던 건 아니었습니다.",
            "공식 정산 전 정리 단계라고 봤습니다."
          ],
          "privateKnowledge": [
            "최정훈은 사적 결제를 상환 전까지 임시 상계표와 보류 탭으로 돌리는 관행을 허용했다.",
            "그 관행이 반복되며 공식 정산 절차 밖의 편법으로 굳었다는 점을 안다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "관리자가 그 관행을 끊지 않고 오히려 확인해 준 점",
            "김나래와 함께 항목을 묶고 넘긴 반복성",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-5:context:2",
              "factText": "임시로 넘긴 적은 있어도 숨기려던 건 아니었습니다.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-5:rule:3",
              "factText": "공식 정산 전 정리 단계라고 봤습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "임시 상계표를 쓴 건 맞습니다.",
            "다만 월말 마감 편의 차원이라고 여겼습니다."
          ],
          "privateKnowledge": [
            "최정훈은 사적 결제를 상환 전까지 임시 상계표와 보류 탭으로 돌리는 관행을 허용했다.",
            "그 관행이 반복되며 공식 정산 절차 밖의 편법으로 굳었다는 점을 안다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "관리자가 그 관행을 끊지 않고 오히려 확인해 준 점",
            "김나래와 함께 항목을 묶고 넘긴 반복성",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-5:admission:4",
              "factText": "임시 상계표를 쓴 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:a:d-5:rule:5",
              "factText": "다만 월말 마감 편의 차원이라고 여겼습니다.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 그 방식을 허용한 건 맞습니다.",
            "그래도 김나래 씨 쪽도 품목 재분류와 보류 탭 묶기에 적극 가담했습니다."
          ],
          "privateKnowledge": [
            "최정훈은 사적 결제를 상환 전까지 임시 상계표와 보류 탭으로 돌리는 관행을 허용했다.",
            "그 관행이 반복되며 공식 정산 절차 밖의 편법으로 굳었다는 점을 안다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "관리자가 그 관행을 끊지 않고 오히려 확인해 준 점",
            "김나래와 함께 항목을 묶고 넘긴 반복성",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-5:admission:6",
              "factText": "제가 그 방식을 허용한 건 맞습니다.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:a:d-5:counter:7",
              "factText": "그래도 김나래 씨 쪽도 품목 재분류와 보류 탭 묶기에 적극 가담했습니다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
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
            "공식 시스템 밖으로 넘긴 게 관행처럼 굳은 건 인정합니다.",
            "관리자인 제가 그 흐름을 끊지 못했습니다."
          ],
          "privateKnowledge": [
            "최정훈은 사적 결제를 상환 전까지 임시 상계표와 보류 탭으로 돌리는 관행을 허용했다.",
            "그 관행이 반복되며 공식 정산 절차 밖의 편법으로 굳었다는 점을 안다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "관리자가 그 관행을 끊지 않고 오히려 확인해 준 점",
            "김나래와 함께 항목을 묶고 넘긴 반복성",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-5:emotion:8",
              "factText": "공식 시스템 밖으로 넘긴 게 관행처럼 굳은 건 인정합니다.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:a:d-5:motive:9",
              "factText": "관리자인 제가 그 흐름을 끊지 못했습니다.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
            "제가 상환 전까지 임시 상계표로 돌리게 했습니다.",
            "김나래 씨와 함께 오프북 상계 관행을 만든 제 책임도 분명합니다."
          ],
          "privateKnowledge": [
            "최정훈은 사적 결제를 상환 전까지 임시 상계표와 보류 탭으로 돌리는 관행을 허용했다.",
            "그 관행이 반복되며 공식 정산 절차 밖의 편법으로 굳었다는 점을 안다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "관리자가 그 관행을 끊지 않고 오히려 확인해 준 점",
            "김나래와 함께 항목을 묶고 넘긴 반복성",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:a:tell:policy_detour",
            "workplace-08:a:tell:future_cleanup",
            "workplace-08:a:tell:subject_blur"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:a:d-5:admission:10",
              "factText": "제가 상환 전까지 임시 상계표로 돌리게 했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:a:d-5:harm:11",
              "factText": "김나래 씨와 함께 오프북 상계 관행을 만든 제 책임도 분명합니다.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김나래",
                  "fullName": "김나래",
                  "judgeRef": "김나래 씨",
                  "neutral": "상대 직원"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "최정훈 씨가 먼저 월말 전에 메우고 닫자고 했어요.",
            "그래서 저는 보류 탭에 넣은 거예요."
          ],
          "privateKnowledge": [
            "김나래는 최정훈이 월말 전에 개인분을 메우고 닫자고 먼저 말한 사실을 기억한다.",
            "그 합의를 문서로 남기지 않은 탓에 자신만 단독 유용자로 낙인찍힐까 두려워한다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "구두 합의를 공식 절차로 올리지 않고 따른 자신의 가담",
            "처음부터 위험하다고 느끼고도 반대하지 못한 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-1:denial:0",
              "factText": "최정훈 씨가 먼저 월말 전에 메우고 닫자고 했어요.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-1:responsibility:1",
              "factText": "그래서 저는 보류 탭에 넣은 거예요.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
            "문서로 남기진 못했지만 구두 합의는 분명히 있었어요.",
            "제가 단독으로 숨긴 건 아니에요."
          ],
          "privateKnowledge": [
            "김나래는 최정훈이 월말 전에 개인분을 메우고 닫자고 먼저 말한 사실을 기억한다.",
            "그 합의를 문서로 남기지 않은 탓에 자신만 단독 유용자로 낙인찍힐까 두려워한다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "구두 합의를 공식 절차로 올리지 않고 따른 자신의 가담",
            "처음부터 위험하다고 느끼고도 반대하지 못한 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-1:context:2",
              "factText": "문서로 남기진 못했지만 구두 합의는 분명히 있었어요.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-1:rule:3",
              "factText": "제가 단독으로 숨긴 건 아니에요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "메일과 메신저 흐름상 제가 임의로 처리한 건 아니에요.",
            "다만 제가 기록을 안 남긴 책임은 있어요."
          ],
          "privateKnowledge": [
            "김나래는 최정훈이 월말 전에 개인분을 메우고 닫자고 먼저 말한 사실을 기억한다.",
            "그 합의를 문서로 남기지 않은 탓에 자신만 단독 유용자로 낙인찍힐까 두려워한다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "구두 합의를 공식 절차로 올리지 않고 따른 자신의 가담",
            "처음부터 위험하다고 느끼고도 반대하지 못한 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-1:admission:4",
              "factText": "메일과 메신저 흐름상 제가 임의로 처리한 건 아니에요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:b:d-1:rule:5",
              "factText": "다만 제가 기록을 안 남긴 책임은 있어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 그 합의를 따라간 건 맞아요.",
            "그래도 최정훈 씨 쪽도 갑자기 제 단독 은닉처럼 돌린 건 부당해요."
          ],
          "privateKnowledge": [
            "김나래는 최정훈이 월말 전에 개인분을 메우고 닫자고 먼저 말한 사실을 기억한다.",
            "그 합의를 문서로 남기지 않은 탓에 자신만 단독 유용자로 낙인찍힐까 두려워한다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "구두 합의를 공식 절차로 올리지 않고 따른 자신의 가담",
            "처음부터 위험하다고 느끼고도 반대하지 못한 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-1:admission:6",
              "factText": "제가 그 합의를 따라간 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-1:counter:7",
              "factText": "그래도 최정훈 씨 쪽도 갑자기 제 단독 은닉처럼 돌린 건 부당해요.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "그때 바로 반대하지 못한 건 제 약점이에요.",
            "실장님이 뒤집는 순간 혼자 낙인찍힐까 무서웠어요."
          ],
          "privateKnowledge": [
            "김나래는 최정훈이 월말 전에 개인분을 메우고 닫자고 먼저 말한 사실을 기억한다.",
            "그 합의를 문서로 남기지 않은 탓에 자신만 단독 유용자로 낙인찍힐까 두려워한다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "구두 합의를 공식 절차로 올리지 않고 따른 자신의 가담",
            "처음부터 위험하다고 느끼고도 반대하지 못한 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-1:emotion:8",
              "factText": "그때 바로 반대하지 못한 건 제 약점이에요.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-1:motive:9",
              "factText": "실장님이 뒤집는 순간 혼자 낙인찍힐까 무서웠어요.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
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
            "최정훈 씨가 먼저 월말 상계를 제안했고 제가 거기에 가담했어요.",
            "그 합의를 숨긴 채 저만 책임지게 된 건 분명한 피해예요."
          ],
          "privateKnowledge": [
            "김나래는 최정훈이 월말 전에 개인분을 메우고 닫자고 먼저 말한 사실을 기억한다.",
            "그 합의를 문서로 남기지 않은 탓에 자신만 단독 유용자로 낙인찍힐까 두려워한다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "구두 합의를 공식 절차로 올리지 않고 따른 자신의 가담",
            "처음부터 위험하다고 느끼고도 반대하지 못한 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-1:admission:10",
              "factText": "최정훈 씨가 먼저 월말 상계를 제안했고 제가 거기에 가담했어요.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:b:d-1:harm:11",
              "factText": "그 합의를 숨긴 채 저만 책임지게 된 건 분명한 피해예요.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "plan": {
                  "exact": "월말 전에 개인분 메우고 닫기",
                  "neutral": "그 합의"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이틀 전",
                  "period": "월말 클로징 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
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
            "저는 영수증을 세탁한 적 없어요.",
            "누락 서류를 정리했을 뿐이에요."
          ],
          "privateKnowledge": [
            "김나래는 감사 공지 다음 날 새벽에 직접 품목 축소와 재발급을 요청했다.",
            "그 행동을 '정리'라고 축소해 말하지만 실제로는 문제 품목을 덜 보이게 만들려는 의도가 있었다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "점장과 주고받은 문자에서 품목명을 줄여 달라고 한 표현",
            "원본과 재발급본의 차이를 스스로 알고 있었다는 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-2:denial:0",
              "factText": "저는 영수증을 세탁한 적 없어요.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-2:responsibility:1",
              "factText": "누락 서류를 정리했을 뿐이에요.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
            "재발급은 있었어도 분류를 맞춘 수준이었어요.",
            "품목을 숨기려던 건 아니에요."
          ],
          "privateKnowledge": [
            "김나래는 감사 공지 다음 날 새벽에 직접 품목 축소와 재발급을 요청했다.",
            "그 행동을 '정리'라고 축소해 말하지만 실제로는 문제 품목을 덜 보이게 만들려는 의도가 있었다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "점장과 주고받은 문자에서 품목명을 줄여 달라고 한 표현",
            "원본과 재발급본의 차이를 스스로 알고 있었다는 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-2:context:2",
              "factText": "재발급은 있었어도 분류를 맞춘 수준이었어요.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-2:rule:3",
              "factText": "품목을 숨기려던 건 아니에요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
            "제가 재발급 요청한 건 맞아요.",
            "다만 감사용 조작이 아니라 정리하려던 거예요."
          ],
          "privateKnowledge": [
            "김나래는 감사 공지 다음 날 새벽에 직접 품목 축소와 재발급을 요청했다.",
            "그 행동을 '정리'라고 축소해 말하지만 실제로는 문제 품목을 덜 보이게 만들려는 의도가 있었다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "점장과 주고받은 문자에서 품목명을 줄여 달라고 한 표현",
            "원본과 재발급본의 차이를 스스로 알고 있었다는 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-2:admission:4",
              "factText": "제가 재발급 요청한 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:b:d-2:rule:5",
              "factText": "다만 감사용 조작이 아니라 정리하려던 거예요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 품목 일부를 줄여 달라고 한 건 맞아요.",
            "그래도 최정훈 씨 쪽도 눈에 덜 띄게 맞추라고 압박했잖아요."
          ],
          "privateKnowledge": [
            "김나래는 감사 공지 다음 날 새벽에 직접 품목 축소와 재발급을 요청했다.",
            "그 행동을 '정리'라고 축소해 말하지만 실제로는 문제 품목을 덜 보이게 만들려는 의도가 있었다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "점장과 주고받은 문자에서 품목명을 줄여 달라고 한 표현",
            "원본과 재발급본의 차이를 스스로 알고 있었다는 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-2:admission:6",
              "factText": "제가 품목 일부를 줄여 달라고 한 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-2:counter:7",
              "factText": "그래도 최정훈 씨 쪽도 눈에 덜 띄게 맞추라고 압박했잖아요.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
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
            "문자와 POS 기록이 나오면 제가 축소한 건 부인 못 해요.",
            "혼자 뒤집어쓸까 무서워서 그걸 정리라고 줄여 말했어요."
          ],
          "privateKnowledge": [
            "김나래는 감사 공지 다음 날 새벽에 직접 품목 축소와 재발급을 요청했다.",
            "그 행동을 '정리'라고 축소해 말하지만 실제로는 문제 품목을 덜 보이게 만들려는 의도가 있었다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "점장과 주고받은 문자에서 품목명을 줄여 달라고 한 표현",
            "원본과 재발급본의 차이를 스스로 알고 있었다는 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-2:emotion:8",
              "factText": "문자와 POS 기록이 나오면 제가 축소한 건 부인 못 해요.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-2:motive:9",
              "factText": "혼자 뒤집어쓸까 무서워서 그걸 정리라고 줄여 말했어요.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
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
            "제가 품목명을 축소한 재발급 영수증을 요청했습니다.",
            "그걸 정리라고 포장한 제 잘못이고 제 책임이에요."
          ],
          "privateKnowledge": [
            "김나래는 감사 공지 다음 날 새벽에 직접 품목 축소와 재발급을 요청했다.",
            "그 행동을 '정리'라고 축소해 말하지만 실제로는 문제 품목을 덜 보이게 만들려는 의도가 있었다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "점장과 주고받은 문자에서 품목명을 줄여 달라고 한 표현",
            "원본과 재발급본의 차이를 스스로 알고 있었다는 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-2:admission:10",
              "factText": "제가 품목명을 축소한 재발급 영수증을 요청했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:b:d-2:harm:11",
              "factText": "그걸 정리라고 포장한 제 잘못이고 제 책임이에요.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "receipt": {
                  "exact": "재발급 영수증",
                  "neutral": "그 영수증"
                },
                "item": {
                  "exact": "주류·개인물품 표기",
                  "neutral": "문제 품목명"
                },
                "time": {
                  "exact": "감사 공지 다음 날 새벽",
                  "dateExact": "감사 공지 다음 날",
                  "period": "감사 직후",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "상계표는 제가 꾸민 게 아니에요.",
            "원래 돌던 파일이고 실장님도 알고 있었어요."
          ],
          "privateKnowledge": [
            "김나래는 상계표가 홍예진이 만든 동시대 자료라는 사실을 안다.",
            "하지만 그 자료를 자기 방어에 유리하게 사용하며 최정훈의 승인 범위를 실제보다 넓게 말한 적이 있다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "실장님의 명시 승인 범위를 과장해 말한 부분",
            "상계표가 실존한다는 사실과 승인 범위를 일부러 섞어 말한 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-3:denial:0",
              "factText": "상계표는 제가 꾸민 게 아니에요.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-3:responsibility:1",
              "factText": "원래 돌던 파일이고 실장님도 알고 있었어요.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
            "파일이 원래 있던 건 맞아요.",
            "다만 누가 어디까지 자세히 본 건지는 조금 엇갈릴 수 있어요."
          ],
          "privateKnowledge": [
            "김나래는 상계표가 홍예진이 만든 동시대 자료라는 사실을 안다.",
            "하지만 그 자료를 자기 방어에 유리하게 사용하며 최정훈의 승인 범위를 실제보다 넓게 말한 적이 있다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "실장님의 명시 승인 범위를 과장해 말한 부분",
            "상계표가 실존한다는 사실과 승인 범위를 일부러 섞어 말한 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-3:context:2",
              "factText": "파일이 원래 있던 건 맞아요.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-3:rule:3",
              "factText": "다만 누가 어디까지 자세히 본 건지는 조금 엇갈릴 수 있어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "홍예진 씨가 만든 파일인 건 맞아요.",
            "다만 제가 그걸 실장님 전면 승인표처럼 말한 건 있었어요."
          ],
          "privateKnowledge": [
            "김나래는 상계표가 홍예진이 만든 동시대 자료라는 사실을 안다.",
            "하지만 그 자료를 자기 방어에 유리하게 사용하며 최정훈의 승인 범위를 실제보다 넓게 말한 적이 있다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "실장님의 명시 승인 범위를 과장해 말한 부분",
            "상계표가 실존한다는 사실과 승인 범위를 일부러 섞어 말한 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-3:admission:4",
              "factText": "홍예진 씨가 만든 파일인 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:b:d-3:rule:5",
              "factText": "다만 제가 그걸 실장님 전면 승인표처럼 말한 건 있었어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 승인 범위를 세게 말한 건 맞아요.",
            "그래도 최정훈 씨 쪽도 그 파일이 있던 걸 알고 모른 척했잖아요."
          ],
          "privateKnowledge": [
            "김나래는 상계표가 홍예진이 만든 동시대 자료라는 사실을 안다.",
            "하지만 그 자료를 자기 방어에 유리하게 사용하며 최정훈의 승인 범위를 실제보다 넓게 말한 적이 있다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "실장님의 명시 승인 범위를 과장해 말한 부분",
            "상계표가 실존한다는 사실과 승인 범위를 일부러 섞어 말한 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-3:admission:6",
              "factText": "제가 승인 범위를 세게 말한 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-3:counter:7",
              "factText": "그래도 최정훈 씨 쪽도 그 파일이 있던 걸 알고 모른 척했잖아요.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "백업본과 메모필드까지 나오면 급조 자료가 아니라는 건 분명해요.",
            "저도 체면 때문에 허락 범위를 너무 넓게 말했어요."
          ],
          "privateKnowledge": [
            "김나래는 상계표가 홍예진이 만든 동시대 자료라는 사실을 안다.",
            "하지만 그 자료를 자기 방어에 유리하게 사용하며 최정훈의 승인 범위를 실제보다 넓게 말한 적이 있다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "실장님의 명시 승인 범위를 과장해 말한 부분",
            "상계표가 실존한다는 사실과 승인 범위를 일부러 섞어 말한 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-3:emotion:8",
              "factText": "백업본과 메모필드까지 나오면 급조 자료가 아니라는 건 분명해요.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-3:motive:9",
              "factText": "저도 체면 때문에 허락 범위를 너무 넓게 말했어요.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
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
            "상계표는 진짜였지만 제가 승인 범위를 과장했습니다.",
            "그걸 방패처럼 쓴 제 잘못이고 제 책임도 있습니다."
          ],
          "privateKnowledge": [
            "김나래는 상계표가 홍예진이 만든 동시대 자료라는 사실을 안다.",
            "하지만 그 자료를 자기 방어에 유리하게 사용하며 최정훈의 승인 범위를 실제보다 넓게 말한 적이 있다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "실장님의 명시 승인 범위를 과장해 말한 부분",
            "상계표가 실존한다는 사실과 승인 범위를 일부러 섞어 말한 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-3:admission:10",
              "factText": "상계표는 진짜였지만 제가 승인 범위를 과장했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:b:d-3:harm:11",
              "factText": "그걸 방패처럼 쓴 제 잘못이고 제 책임도 있습니다.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "홍예진",
                  "fullName": "홍예진",
                  "judgeRef": "홍예진 씨",
                  "neutral": "재무 담당자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "doc": {
                  "exact": "자동백업본",
                  "neutral": "그 백업본"
                },
                "time": {
                  "exact": "감사 공지 이전",
                  "dateExact": "감사 플래그 생성 이전",
                  "period": "클로징 당시",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "실장님이 이미 절 문제 인원처럼 보고 있다는 느낌은 받았어요.",
            "처음부터 질문 톤이 달랐어요."
          ],
          "privateKnowledge": [
            "김나래는 면담 전부터 질문 톤이 이미 정해져 있었다고 느꼈고, 이후 선행 메모 존재를 확인했다.",
            "정식 설명 기회를 갖기 전에 자신이 취약 인원으로 굳어졌다는 억울함이 크다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "초기에 불이익이 두려워 강하게 항의하지 못한 점",
            "자신의 정산 혼선이 의심의 빌미를 준 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-4:denial:0",
              "factText": "실장님이 이미 절 문제 인원처럼 보고 있다는 느낌은 받았어요.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
              "id": "workplace-08:b:d-4:responsibility:1",
              "factText": "처음부터 질문 톤이 달랐어요.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
            "면담 전부터 뭔가 써 놓은 상태 같았어요.",
            "그때 이미 결론이 정해진 느낌이었어요."
          ],
          "privateKnowledge": [
            "김나래는 면담 전부터 질문 톤이 이미 정해져 있었다고 느꼈고, 이후 선행 메모 존재를 확인했다.",
            "정식 설명 기회를 갖기 전에 자신이 취약 인원으로 굳어졌다는 억울함이 크다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "초기에 불이익이 두려워 강하게 항의하지 못한 점",
            "자신의 정산 혼선이 의심의 빌미를 준 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-4:context:2",
              "factText": "면담 전부터 뭔가 써 놓은 상태 같았어요.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-4:rule:3",
              "factText": "그때 이미 결론이 정해진 느낌이었어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "감사 초안에 제 이름이 먼저 올라간 건 알았어요.",
            "다만 그때는 평가 코멘트까지 들어간 줄은 몰랐어요."
          ],
          "privateKnowledge": [
            "김나래는 면담 전부터 질문 톤이 이미 정해져 있었다고 느꼈고, 이후 선행 메모 존재를 확인했다.",
            "정식 설명 기회를 갖기 전에 자신이 취약 인원으로 굳어졌다는 억울함이 크다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "초기에 불이익이 두려워 강하게 항의하지 못한 점",
            "자신의 정산 혼선이 의심의 빌미를 준 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-4:admission:4",
              "factText": "감사 초안에 제 이름이 먼저 올라간 건 알았어요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:b:d-4:rule:5",
              "factText": "다만 그때는 평가 코멘트까지 들어간 줄은 몰랐어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 정산을 꼬이게 만든 건 맞아요.",
            "그래도 최정훈 씨 쪽도 사실 확인 전에 낙인을 찍은 건 별개예요."
          ],
          "privateKnowledge": [
            "김나래는 면담 전부터 질문 톤이 이미 정해져 있었다고 느꼈고, 이후 선행 메모 존재를 확인했다.",
            "정식 설명 기회를 갖기 전에 자신이 취약 인원으로 굳어졌다는 억울함이 크다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "초기에 불이익이 두려워 강하게 항의하지 못한 점",
            "자신의 정산 혼선이 의심의 빌미를 준 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-4:admission:6",
              "factText": "제가 정산을 꼬이게 만든 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
              "id": "workplace-08:b:d-4:counter:7",
              "factText": "그래도 최정훈 씨 쪽도 사실 확인 전에 낙인을 찍은 건 별개예요.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "blame"
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
            "그 문구를 나중에 보고 정말 억울했어요.",
            "저는 설명 기회도 없이 취약 인원처럼 굳어 있었어요."
          ],
          "privateKnowledge": [
            "김나래는 면담 전부터 질문 톤이 이미 정해져 있었다고 느꼈고, 이후 선행 메모 존재를 확인했다.",
            "정식 설명 기회를 갖기 전에 자신이 취약 인원으로 굳어졌다는 억울함이 크다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "초기에 불이익이 두려워 강하게 항의하지 못한 점",
            "자신의 정산 혼선이 의심의 빌미를 준 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-4:emotion:8",
              "factText": "그 문구를 나중에 보고 정말 억울했어요.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-4:motive:9",
              "factText": "저는 설명 기회도 없이 취약 인원처럼 굳어 있었어요.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
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
            "최정훈 씨가 면담 전에 저를 비용 통제 취약 인원으로 적어 둔 건 사실이에요.",
            "그 선입견이 제 진술 전체를 눌렀어요."
          ],
          "privateKnowledge": [
            "김나래는 면담 전부터 질문 톤이 이미 정해져 있었다고 느꼈고, 이후 선행 메모 존재를 확인했다.",
            "정식 설명 기회를 갖기 전에 자신이 취약 인원으로 굳어졌다는 억울함이 크다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "초기에 불이익이 두려워 강하게 항의하지 못한 점",
            "자신의 정산 혼선이 의심의 빌미를 준 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-4:admission:10",
              "factText": "최정훈 씨가 면담 전에 저를 비용 통제 취약 인원으로 적어 둔 건 사실이에요.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:b:d-4:harm:11",
              "factText": "그 선입견이 제 진술 전체를 눌렀어요.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "memo": {
                  "exact": "감사 대응 초안",
                  "neutral": "그 초안"
                },
                "rating": {
                  "exact": "비용 통제 취약",
                  "neutral": "그 평가 문구"
                },
                "time": {
                  "exact": "나래 면담 전",
                  "dateExact": "면담 전 입력 시각",
                  "period": "초기 감사 정리 단계",
                  "neutral": "그 이전"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "저는 오프북 관행에 가담한 적 없어요.",
            "지시받은 건만 잠깐 들고 있었어요."
          ],
          "privateKnowledge": [
            "김나래는 자신이 임시 상계표와 보류 탭으로 문제 항목을 반복해서 넘긴 사실을 안다.",
            "그런데도 혼자 사적 유용자로 낙인찍힐까 두려워 관행성을 끝까지 축소하려 한다.",
            "핵심 사실을 드러내면 감사와 인사평가에 불리해질 거라 계산한다."
          ],
          "suppressions": [
            "보류 코드와 상환 예정일을 반복 입력한 기록",
            "재무나 감사에 정식으로 올리지 않고 공식 절차 밖에서 굴린 점",
            "자신의 직접 지시 또는 가담 정도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-5:denial:0",
              "factText": "저는 오프북 관행에 가담한 적 없어요.",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-5:responsibility:1",
              "factText": "지시받은 건만 잠깐 들고 있었어요.",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
            "보류에 묶어 둔 적은 있어도 관행처럼 돌린 건 아니에요.",
            "월말 전에 잠깐 정리한 수준이었어요."
          ],
          "privateKnowledge": [
            "김나래는 자신이 임시 상계표와 보류 탭으로 문제 항목을 반복해서 넘긴 사실을 안다.",
            "그런데도 혼자 사적 유용자로 낙인찍힐까 두려워 관행성을 끝까지 축소하려 한다.",
            "표현 범위를 좁혀 말하면 아직은 책임을 통제할 수 있다고 본다."
          ],
          "suppressions": [
            "보류 코드와 상환 예정일을 반복 입력한 기록",
            "재무나 감사에 정식으로 올리지 않고 공식 절차 밖에서 굴린 점",
            "합의나 관여의 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-5:context:2",
              "factText": "보류에 묶어 둔 적은 있어도 관행처럼 돌린 건 아니에요.",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-5:rule:3",
              "factText": "월말 전에 잠깐 정리한 수준이었어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "제가 임시 상계표에 넣은 건 맞아요.",
            "다만 월말 압박 때문에 잠깐 정리한 거였어요."
          ],
          "privateKnowledge": [
            "김나래는 자신이 임시 상계표와 보류 탭으로 문제 항목을 반복해서 넘긴 사실을 안다.",
            "그런데도 혼자 사적 유용자로 낙인찍힐까 두려워 관행성을 끝까지 축소하려 한다.",
            "증거가 누적되자 일부만 인정하고 선을 긋는 쪽으로 기운다."
          ],
          "suppressions": [
            "보류 코드와 상환 예정일을 반복 입력한 기록",
            "재무나 감사에 정식으로 올리지 않고 공식 절차 밖에서 굴린 점",
            "먼저 꺼낸 말이나 선행 행동"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-5:admission:4",
              "factText": "제가 임시 상계표에 넣은 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-08:b:d-5:rule:5",
              "factText": "다만 월말 압박 때문에 잠깐 정리한 거였어요.",
              "tags": [
                "rule",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "partial"
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
            "제가 공식 절차 밖에서 넘긴 건 맞아요.",
            "그래도 최정훈 씨 쪽도 그 방식을 계속 허용하고 확인했잖아요."
          ],
          "privateKnowledge": [
            "김나래는 자신이 임시 상계표와 보류 탭으로 문제 항목을 반복해서 넘긴 사실을 안다.",
            "그런데도 혼자 사적 유용자로 낙인찍힐까 두려워 관행성을 끝까지 축소하려 한다.",
            "자기 가담을 인정하되 상대 책임을 같이 묶어야 한다고 느낀다."
          ],
          "suppressions": [
            "보류 코드와 상환 예정일을 반복 입력한 기록",
            "재무나 감사에 정식으로 올리지 않고 공식 절차 밖에서 굴린 점",
            "상대를 탓하기 전에 자신의 선행 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-5:admission:6",
              "factText": "제가 공식 절차 밖에서 넘긴 건 맞아요.",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
              "id": "workplace-08:b:d-5:counter:7",
              "factText": "그래도 최정훈 씨 쪽도 그 방식을 계속 허용하고 확인했잖아요.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "blame"
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
            "로그와 메모가 다 남아 있으면 제가 축소한 건 맞아요.",
            "혼자 낙인찍힐까 부끄럽고 무서워서 그랬어요."
          ],
          "privateKnowledge": [
            "김나래는 자신이 임시 상계표와 보류 탭으로 문제 항목을 반복해서 넘긴 사실을 안다.",
            "그런데도 혼자 사적 유용자로 낙인찍힐까 두려워 관행성을 끝까지 축소하려 한다.",
            "체면과 불안이 앞서 감정적 누수가 시작된다."
          ],
          "suppressions": [
            "보류 코드와 상환 예정일을 반복 입력한 기록",
            "재무나 감사에 정식으로 올리지 않고 공식 절차 밖에서 굴린 점",
            "처음부터 알고 있던 핵심 사실"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-5:emotion:8",
              "factText": "로그와 메모가 다 남아 있으면 제가 축소한 건 맞아요.",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "workplace-08:b:d-5:motive:9",
              "factText": "혼자 낙인찍힐까 부끄럽고 무서워서 그랬어요.",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
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
            "제가 오프북 상계 관행에 가담했습니다.",
            "그걸 실장님과 함께 굴린 제 잘못이고 제 책임이에요."
          ],
          "privateKnowledge": [
            "김나래는 자신이 임시 상계표와 보류 탭으로 문제 항목을 반복해서 넘긴 사실을 안다.",
            "그런데도 혼자 사적 유용자로 낙인찍힐까 두려워 관행성을 끝까지 축소하려 한다.",
            "핵심 행위와 그 후폭풍까지 더는 부인하기 어렵다고 받아들인다."
          ],
          "suppressions": [
            "보류 코드와 상환 예정일을 반복 입력한 기록",
            "재무나 감사에 정식으로 올리지 않고 공식 절차 밖에서 굴린 점",
            "징계와 평판 손실을 두려워하는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-08:b:tell:line_item_barrage",
            "workplace-08:b:tell:approval_echo",
            "workplace-08:b:tell:paper_shuffle"
          ],
          "claimAtoms": [
            {
              "id": "workplace-08:b:d-5:admission:10",
              "factText": "제가 오프북 상계 관행에 가담했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-08:b:d-5:harm:11",
              "factText": "그걸 실장님과 함께 굴린 제 잘못이고 제 책임이에요.",
              "tags": [
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최정훈",
                  "fullName": "최정훈",
                  "judgeRef": "최정훈 씨",
                  "neutral": "상대 관리자"
                },
                "sheet": {
                  "exact": "임시 상계표",
                  "neutral": "그 표"
                },
                "tab": {
                  "exact": "보류 탭",
                  "neutral": "그 탭"
                },
                "time": {
                  "exact": "월말 클로징",
                  "dateExact": "클로징 주간",
                  "period": "마감 직전",
                  "neutral": "그 시점"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        }
      }
    }
  }
}


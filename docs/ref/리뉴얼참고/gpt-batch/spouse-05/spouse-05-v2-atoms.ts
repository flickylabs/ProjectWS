export const spouse05V2Atoms = {
  "caseId": "spouse-05",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "소담 씨가 제 예약 블록 시간에 서재에 들어간 건 사실입니다.",
            "보안 장비가 있는 방이라 사전 고지 없는 출입은 절차상 그냥 넘길 수 없었습니다."
          ],
          "privateKnowledge": [
            "그날 거실 회선이 불안정했고 소담 씨가 조용한 방을 급히 찾는 상황이라는 걸 알고 있었습니다.",
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "suppressions": [
            "그날 거실 회선이 불안정했고 소담 씨가 조용한 방을 급히 찾는 상황이라는 걸 알고 있었습니다.",
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-1:act:0",
              "factText": "소담 씨가 제 예약 블록 시간에 서재에 들어간 건 사실입니다.",
              "tags": [
                "act",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            },
            {
              "id": "spouse05:a:d-1:rule:0",
              "factText": "보안 장비가 있는 방이라 사전 고지 없는 출입은 절차상 그냥 넘길 수 없었습니다.",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "14시 08분 출입기록과 직후의 서재 와이파이 접속이 같은 흐름으로 남아 있습니다."
          ],
          "privateKnowledge": [
            "그날 거실 회선이 불안정했고 소담 씨가 조용한 방을 급히 찾는 상황이라는 걸 알고 있었습니다.",
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "suppressions": [
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-1:timeline:0",
              "factText": "14시 08분 출입기록과 직후의 서재 와이파이 접속이 같은 흐름으로 남아 있습니다.",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
              "id": "spouse05:a:d-1:counter:0",
              "factText": "보안 장비가 있는 방이라 사전 고지 없는 출입은 절차상 그냥 넘길 수 없었습니다.",
              "tags": [
                "counter",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "그날 소담 씨가 14시 15분 화상심사를 앞두고 있었다는 사정은 알고 있었습니다."
          ],
          "privateKnowledge": [
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "suppressions": [
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-1:context:0",
              "factText": "그날 소담 씨가 14시 15분 화상심사를 앞두고 있었다는 사정은 알고 있었습니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-1:counter:1",
              "factText": "소담 씨가 제 예약 블록 시간에 서재에 들어간 건 사실입니다.",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "무단 출입은 잘못이지만, 제가 사흘 전 권한을 바꿔 정식 진입 경로를 좁혀 놓은 책임도 있습니다."
          ],
          "privateKnowledge": [
            "제가 사흘 전 잠금권한과 예약 블록을 먼저 바꿔 소담 씨 선택지를 줄였다는 점은 낮은 상태에서 숨기고 싶습니다."
          ],
          "suppressions": [
            "결론적으로 소담 씨의 무단 출입은 맞지만, 제가 공간을 과도하게 잠가 둔 탓에 충돌을 키운 몫도 있습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-1:responsibility:0",
              "factText": "무단 출입은 잘못이지만, 제가 사흘 전 권한을 바꿔 정식 진입 경로를 좁혀 놓은 책임도 있습니다.",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-1:counter:2",
              "factText": "소담 씨가 제 예약 블록 시간에 서재에 들어간 건 사실입니다.",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "그 방 문이 열렸다는 사실보다, 집 안에서 제 일터 경계가 무너졌다는 감각이 더 크게 왔습니다."
          ],
          "privateKnowledge": [
            "결론적으로 소담 씨의 무단 출입은 맞지만, 제가 공간을 과도하게 잠가 둔 탓에 충돌을 키운 몫도 있습니다."
          ],
          "suppressions": [
            "결론적으로 소담 씨의 무단 출입은 맞지만, 제가 공간을 과도하게 잠가 둔 탓에 충돌을 키운 몫도 있습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-1:emotion:0",
              "factText": "그 방 문이 열렸다는 사실보다, 집 안에서 제 일터 경계가 무너졌다는 감각이 더 크게 왔습니다.",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "emotional",
                "counter"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-1:relationship:0",
              "factText": "그래서 저는 출입 사실 자체를 곧바로 신뢰 붕괴로 받아들였습니다.",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "emotional",
                "counter"
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
            "결론적으로 소담 씨의 무단 출입은 맞지만, 제가 공간을 과도하게 잠가 둔 탓에 충돌을 키운 몫도 있습니다."
          ],
          "privateKnowledge": [
            "결론적으로 소담 씨의 무단 출입은 맞지만, 제가 공간을 과도하게 잠가 둔 탓에 충돌을 키운 몫도 있습니다."
          ],
          "suppressions": [
            "상대 잘못만으로 단정하는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-1:responsibility:1",
              "factText": "결론적으로 소담 씨의 무단 출입은 맞지만, 제가 공간을 과도하게 잠가 둔 탓에 충돌을 키운 몫도 있습니다.",
              "tags": [
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-1:legacy_sentence:0",
              "factText": "재발을 막으려면 출입 절차와 대체 작업 공간을 같이 정해야 합니다.",
              "tags": [
                "legacy_sentence",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
            "권한을 빼앗은 게 아니라 보안주간에 맞춰 접근 범위를 조정한 겁니다."
          ],
          "privateKnowledge": [
            "소담 씨에게는 일반 알림만 가고 바로 항의하기 어렵다는 점을 알고 있었습니다.",
            "프린터와 모니터까지 묶어 두면 서재 운영권이 제 쪽으로 굳는다는 계산도 있었습니다."
          ],
          "suppressions": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다.",
            "프린터와 모니터까지 묶어 두면 서재 운영권이 제 쪽으로 굳는다는 계산도 있었습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-2:denial:0",
              "factText": "권한을 빼앗은 게 아니라 보안주간에 맞춰 접근 범위를 조정한 겁니다.",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
              "id": "spouse05:a:d-2:self_justification:0",
              "factText": "클라이언트 보안 요구가 갑자기 강해져 서재와 장비를 묶어 관리할 필요가 있었습니다.",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "전일 블록 확대와 읽기 전용 전환은 임시 조치였고, 영구 봉쇄까지 생각한 건 아니었습니다."
          ],
          "privateKnowledge": [
            "소담 씨에게는 일반 알림만 가고 바로 항의하기 어렵다는 점을 알고 있었습니다.",
            "클라이언트 보안 요구가 갑자기 강해져 서재와 장비를 묶어 관리할 필요가 있었습니다."
          ],
          "suppressions": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다.",
            "소담 씨에게는 일반 알림만 가고 바로 항의하기 어렵다는 점을 알고 있었습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-2:uncertainty:0",
              "factText": "전일 블록 확대와 읽기 전용 전환은 임시 조치였고, 영구 봉쇄까지 생각한 건 아니었습니다.",
              "tags": [
                "uncertainty",
                "threshold"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
              "id": "spouse05:a:d-2:context:0",
              "factText": "클라이언트 보안 요구가 갑자기 강해져 서재와 장비를 묶어 관리할 필요가 있었습니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "서재 스마트락 권한과 프린터 접근 계정을 혼자 바꾼 건 맞지만, 그때는 파일 보안이 먼저라고 봤습니다."
          ],
          "privateKnowledge": [
            "프린터와 모니터까지 묶어 두면 서재 운영권이 제 쪽으로 굳는다는 계산도 있었습니다.",
            "보안 사고가 한 번만 나도 클라이언트 신뢰와 수입이 무너질까 봐 과하게 움켜쥐었습니다."
          ],
          "suppressions": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-2:admission:0",
              "factText": "서재 스마트락 권한과 프린터 접근 계정을 혼자 바꾼 건 맞지만, 그때는 파일 보안이 먼저라고 봤습니다.",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
              "id": "spouse05:a:d-2:context:1",
              "factText": "공유 고지 절차를 건너뛴 건 잘못이지만, 장비와 작업파일이 얽힌 방이라 제 쪽 통제가 필요하다고 여겼습니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "공유 고지 절차를 건너뛴 건 잘못이지만, 장비와 작업파일이 얽힌 방이라 제 쪽 통제가 필요하다고 여겼습니다."
          ],
          "privateKnowledge": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다.",
            "보안 사고가 한 번만 나도 클라이언트 신뢰와 수입이 무너질까 봐 과하게 움켜쥐었습니다."
          ],
          "suppressions": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-2:counter:0",
              "factText": "공유 고지 절차를 건너뛴 건 잘못이지만, 장비와 작업파일이 얽힌 방이라 제 쪽 통제가 필요하다고 여겼습니다.",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-2:responsibility:0",
              "factText": "결국 10시간 전용 블록과 읽기 전용 전환이 겹치면서 서재가 공동 공간이 아니라 제 작업실처럼 보이게 됐습니다.",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "보안 사고가 한 번만 나도 클라이언트 신뢰와 수입이 무너질까 봐 과하게 움켜쥐었습니다."
          ],
          "privateKnowledge": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다."
          ],
          "suppressions": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-2:fear:0",
              "factText": "보안 사고가 한 번만 나도 클라이언트 신뢰와 수입이 무너질까 봐 과하게 움켜쥐었습니다.",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
              "id": "spouse05:a:d-2:harm:0",
              "factText": "그 불안 때문에 저는 절차보다 통제를 앞세웠고, 소담 씨가 받는 모멸감은 뒤로 밀었습니다.",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다."
          ],
          "privateKnowledge": [
            "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다."
          ],
          "suppressions": [
            "상대를 깎아내리며 책임을 흐리는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-2:admission:1",
              "factText": "사건 사흘 전 밤 11시 47분에 권한을 일방적으로 바꾸고 10시간 전용 블록까지 걸어 공동 공간을 사실상 독점했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-2:relationship:0",
              "factText": "보안 압박은 실제였지만, 그걸 이유로 공유 공간을 혼자 잠근 선택까지 정당화되진 않습니다.",
              "tags": [
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "그 녹취에서 들리는 '회의 망쳐버릴까'라는 말은 당시 제 일정에 대한 직접적 위협으로 들렸습니다."
          ],
          "privateKnowledge": [
            "편집 앱에서 export된 파일이라 원본 세션 전체가 아니라는 점을 처음부터 알고 있었습니다.",
            "배경 소음이 두 번 비정상적으로 끊기는 걸 보면서도, 제 불안을 정당화하는 증거로 먼저 읽었습니다."
          ],
          "suppressions": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다.",
            "배경 소음이 두 번 비정상적으로 끊기는 걸 보면서도, 제 불안을 정당화하는 증거로 먼저 읽었습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-3:quote:0",
              "factText": "그 녹취에서 들리는 '회의 망쳐버릴까'라는 말은 당시 제 일정에 대한 직접적 위협으로 들렸습니다.",
              "tags": [
                "quote",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:a:d-3:evidence:0",
              "factText": "1분 12초 파일 안에 회의를 무너뜨리겠다는 취지의 문장이 연속으로 담겨 있다고 봤습니다.",
              "tags": [
                "evidence",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "1분 12초 파일 안에 회의를 무너뜨리겠다는 취지의 문장이 연속으로 담겨 있다고 봤습니다."
          ],
          "privateKnowledge": [
            "편집 앱에서 export된 파일이라 원본 세션 전체가 아니라는 점을 처음부터 알고 있었습니다.",
            "배경 소음이 두 번 비정상적으로 끊기는 걸 보면서도, 제 불안을 정당화하는 증거로 먼저 읽었습니다."
          ],
          "suppressions": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-3:uncertainty:0",
              "factText": "1분 12초 파일 안에 회의를 무너뜨리겠다는 취지의 문장이 연속으로 담겨 있다고 봤습니다.",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            },
            {
              "id": "spouse05:a:d-3:quote:1",
              "factText": "그 녹취에서 들리는 '회의 망쳐버릴까'라는 말은 당시 제 일정에 대한 직접적 위협으로 들렸습니다.",
              "tags": [
                "quote",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "원본 세션 전체가 아니라 내보내기된 파일이라는 점은 알았지만, 그때는 문장 의미를 더 크게 봤습니다."
          ],
          "privateKnowledge": [
            "배경 소음이 두 번 비정상적으로 끊기는 걸 보면서도, 제 불안을 정당화하는 증거로 먼저 읽었습니다."
          ],
          "suppressions": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-3:admission:0",
              "factText": "원본 세션 전체가 아니라 내보내기된 파일이라는 점은 알았지만, 그때는 문장 의미를 더 크게 봤습니다.",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:a:d-3:context:0",
              "factText": "지금 돌아보면 7월 8일과 7월 11일의 다른 맥락이 섞였을 가능성을 보고도 충분히 확인하지 않았습니다.",
              "tags": [
                "context",
                "quote"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
            "지금 돌아보면 7월 8일과 7월 11일의 다른 맥락이 섞였을 가능성을 보고도 충분히 확인하지 않았습니다."
          ],
          "privateKnowledge": [
            "배경 소음이 두 번 비정상적으로 끊기는 걸 보면서도, 제 불안을 정당화하는 증거로 먼저 읽었습니다."
          ],
          "suppressions": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-3:timeline:0",
              "factText": "지금 돌아보면 7월 8일과 7월 11일의 다른 맥락이 섞였을 가능성을 보고도 충분히 확인하지 않았습니다.",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:a:d-3:responsibility:0",
              "factText": "제가 두 번 끊기는 소음과 호흡 변화를 불안 속에서 하나의 의도로 해석한 셈입니다.",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "클라이언트 리뷰 직전에 들은 말이라 객관적 검증보다 공포가 먼저 작동했습니다."
          ],
          "privateKnowledge": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "suppressions": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-3:fear:0",
              "factText": "클라이언트 리뷰 직전에 들은 말이라 객관적 검증보다 공포가 먼저 작동했습니다.",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:a:d-3:harm:0",
              "factText": "그래서 저는 편집 가능성보다 '나를 망치려 든다'는 감정에 붙잡혀 있었습니다.",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "privateKnowledge": [
            "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다."
          ],
          "suppressions": [
            "단정적 협박 프레임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-3:admission:1",
              "factText": "지금 보면 그 파일만으로 소담 씨가 제 업무를 망치겠다고 협박했다고 단정할 수는 없습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-3:relationship:0",
              "factText": "녹취를 쓸 거였다면 원본 전체와 날짜 구분부터 확인했어야 했습니다.",
              "tags": [
                "relationship",
                "legacy_sentence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
            "원본을 조작한 게 아니라 설명이 들리게 잡음만 정리한 요약 클립이었습니다."
          ],
          "privateKnowledge": [
            "편집 앱 export 흔적이 남는다는 걸 알면서도 제출했습니다.",
            "상담 자리와 임대인 면담에서 그 파일이 원본처럼 들리도록 일부러 설명했습니다."
          ],
          "suppressions": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다.",
            "상담 자리와 임대인 면담에서 그 파일이 원본처럼 들리도록 일부러 설명했습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-4:denial:0",
              "factText": "원본을 조작한 게 아니라 설명이 들리게 잡음만 정리한 요약 클립이었습니다.",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
              "id": "spouse05:a:d-4:self_justification:0",
              "factText": "그때는 전후 맥락보다 핵심 문장만 들려주면 제 입장이 전달된다고 생각했습니다.",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "끊긴 부분이 있어도 의미를 바꾸려는 편집은 아니었다고 스스로는 여겼습니다."
          ],
          "privateKnowledge": [
            "편집 앱 export 흔적이 남는다는 걸 알면서도 제출했습니다.",
            "그때는 전후 맥락보다 핵심 문장만 들려주면 제 입장이 전달된다고 생각했습니다."
          ],
          "suppressions": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다.",
            "편집 앱 export 흔적이 남는다는 걸 알면서도 제출했습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-4:uncertainty:0",
              "factText": "끊긴 부분이 있어도 의미를 바꾸려는 편집은 아니었다고 스스로는 여겼습니다.",
              "tags": [
                "uncertainty",
                "threshold"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
              "id": "spouse05:a:d-4:context:0",
              "factText": "그때는 전후 맥락보다 핵심 문장만 들려주면 제 입장이 전달된다고 생각했습니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "편집 앱에서 내보낸 파일인 건 맞고, 두 원본에서 필요한 부분을 추린 것도 맞습니다."
          ],
          "privateKnowledge": [
            "상담 자리와 임대인 면담에서 그 파일이 원본처럼 들리도록 일부러 설명했습니다.",
            "클라이언트와 임대인 앞에서 제가 통제를 잃은 사람으로 보일까 봐 제 입장을 입증할 도구를 만들고 싶었습니다."
          ],
          "suppressions": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-4:admission:0",
              "factText": "편집 앱에서 내보낸 파일인 건 맞고, 두 원본에서 필요한 부분을 추린 것도 맞습니다.",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
              "id": "spouse05:a:d-4:context:1",
              "factText": "오한결 씨에게 정리해 달라고 보낸 건 맞지만, 당시에는 설명용 클립과 원본의 경계를 너무 가볍게 봤습니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "오한결 씨에게 정리해 달라고 보낸 건 맞지만, 당시에는 설명용 클립과 원본의 경계를 너무 가볍게 봤습니다."
          ],
          "privateKnowledge": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다.",
            "클라이언트와 임대인 앞에서 제가 통제를 잃은 사람으로 보일까 봐 제 입장을 입증할 도구를 만들고 싶었습니다."
          ],
          "suppressions": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-4:counter:0",
              "factText": "오한결 씨에게 정리해 달라고 보낸 건 맞지만, 당시에는 설명용 클립과 원본의 경계를 너무 가볍게 봤습니다.",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-4:responsibility:0",
              "factText": "결과적으로 서로 다른 날짜의 음성을 하나의 연속 녹취처럼 만들었고, 그걸 원본처럼 쓰는 쪽으로 흘렀습니다.",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "클라이언트와 임대인 앞에서 제가 통제를 잃은 사람으로 보일까 봐 제 입장을 입증할 도구를 만들고 싶었습니다."
          ],
          "privateKnowledge": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다."
          ],
          "suppressions": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-4:fear:0",
              "factText": "클라이언트와 임대인 앞에서 제가 통제를 잃은 사람으로 보일까 봐 제 입장을 입증할 도구를 만들고 싶었습니다.",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
              "id": "spouse05:a:d-4:harm:0",
              "factText": "그 불안 때문에 저는 자료의 형식을 흐렸고, 소담 씨를 의도적 방해범처럼 보이게 하는 손상을 만들었습니다.",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다."
          ],
          "privateKnowledge": [
            "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다."
          ],
          "suppressions": [
            "상대를 깎아내리며 책임을 흐리는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-4:admission:1",
              "factText": "오한결 씨에게 두 날짜 음성을 보내 하나의 연속 녹취처럼 정리하게 했고, 그 파일을 부부상담과 임대인 면담에서 원본처럼 제시했습니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-4:relationship:0",
              "factText": "제 불안과 평판 걱정은 이해되더라도, 편집본을 원본처럼 낸 선택은 명백히 잘못이었습니다.",
              "tags": [
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "재택근무 파국은 결국 소담 씨가 제 예약 블록을 깨고 들어온 순간 시작됐습니다."
          ],
          "privateKnowledge": [
            "그날 거실 회선 장애와 일정 중복이 있었다는 걸 알고 있습니다.",
            "제가 10시간 전용 블록을 걸어 선택지를 좁혀 놓았습니다."
          ],
          "suppressions": [
            "제가 공간을 먼저 봉쇄한 사실",
            "거실 회선 장애와 일정 중복"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-5:counter:0",
              "factText": "소담 씨의 무단 출입이 그날 충돌의 직접 점화점이었다는 서술",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            },
            {
              "id": "spouse05:a:d-5:counter:1",
              "factText": "예약 블록이 지켜졌다면 그날 업무 충돌은 없었을 것이라는 주장",
              "tags": [
                "counter",
                "rule"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
            "블록만 지켜졌으면 적어도 그날은 파국까지 가지 않았다고 봅니다."
          ],
          "privateKnowledge": [
            "거실 회선이 13시 41분에 흔들렸고 두 사람 일정이 겹친 것도 압니다.",
            "보안주간을 이유로 전용 블록을 너무 길게 잡았습니다."
          ],
          "suppressions": [
            "13시 41분 장애 접수",
            "10시간 전용 블록"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-5:threshold:0",
              "factText": "무단 출입이 없었으면 상황이 버틸 수 있었을 것이라는 임계점 판단",
              "tags": [
                "threshold",
                "counter"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
              "id": "spouse05:a:d-5:context:0",
              "factText": "저는 여전히 원인을 출입 위반 쪽에 더 많이 묶어 두려 합니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "다만 거실 인터넷이 불안정했고 14시 15분과 14시 30분 일정이 겹친 건 분명한 사실입니다."
          ],
          "privateKnowledge": [
            "그 사정을 알면서도 권한 변경을 철회하지 않았습니다.",
            "소담 씨가 조용한 방을 급히 찾을 거라고 예상했습니다."
          ],
          "suppressions": [
            "제가 미리 대체 공간을 제안하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-5:context:1",
              "factText": "회선 장애와 연속 화상일정이 충돌을 키운 환경 요인이었다는 인정",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-5:admission:0",
              "factText": "저도 대체 공간과 권한 복구를 먼저 제안하지 않았다는 부분 인정",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 권한을 너무 잠가 둔 탓에 작은 충돌이 바로 생계 싸움으로 커진 것도 맞습니다."
          ],
          "privateKnowledge": [
            "보안 이유 뒤에 서재 통제권을 놓치기 싫은 마음도 있었습니다.",
            "소담 씨 일의 긴급성을 낮게 본 적이 있습니다."
          ],
          "suppressions": [
            "서재 통제권을 놓치기 싫었던 마음"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:a:tell:rule_speak",
            "spouse05:a:tell:partial_admission"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-5:responsibility:0",
              "factText": "권한 봉쇄가 갈등을 구조적으로 키웠다는 자각",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-5:self_justification:0",
              "factText": "그럼에도 저는 여전히 제 보안 불안을 앞세워 책임 비율을 줄이고 싶어 합니다.",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "집에서까지 제 일터를 지켜야 한다는 압박이 사람보다 장비와 통제를 먼저 보게 만들었습니다."
          ],
          "privateKnowledge": [
            "소담 씨의 일도 생계라는 사실을 알면서 밀어냈습니다.",
            "통제를 잃는 장면 자체를 견디기 어려워했습니다."
          ],
          "suppressions": [
            "상대 일을 낮게 본 태도"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-5:fear:0",
              "factText": "클라이언트 신뢰 상실과 통제 붕괴에 대한 두려움이 과잉 통제로 이어졌다는 고백",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
              "id": "spouse05:a:d-5:harm:0",
              "factText": "그 두려움이 소담 씨의 작업 조건을 실제로 손상시켰다는 자각",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
            "재택근무 파국은 소담 씨의 침범만이 아니라 제 권한 봉쇄, 회선 문제, 일정 충돌이 함께 만든 겁니다."
          ],
          "privateKnowledge": [
            "상대가 먼저 잘못했다는 말로 제 책임을 덜어 보려던 태도를 내려놓습니다."
          ],
          "suppressions": [
            "상대 잘못만으로 돌리는 단정"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:a:tell:partial_admission",
            "spouse05:a:tell:timeline_fogging"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:a:d-5:responsibility:1",
              "factText": "파국의 원인이 무단 출입, 권한 봉쇄, 회선 장애, 일정 충돌이 겹친 결과라는 시인",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:a:d-5:relationship:0",
              "factText": "공간 규칙과 감정 정산을 분리하지 않으면 같은 구조가 반복된다는 결론",
              "tags": [
                "relationship",
                "legacy_sentence"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
    },
    "b": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "정식으로 점거한 게 아니라 화상심사 직전 조용한 배경을 잠깐 쓴 것뿐입니다."
          ],
          "privateKnowledge": [
            "14시 08분에 문을 열면 민재 씨가 당연히 알게 될 수 있다는 걸 알고도 들어갔습니다.",
            "서재에 들어가 화상심사만 한 게 아니라 마이크와 자리 배치도 제 쪽에 맞게 손댔습니다."
          ],
          "suppressions": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다.",
            "서재에 들어가 화상심사만 한 게 아니라 마이크와 자리 배치도 제 쪽에 맞게 손댔습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-1:denial:0",
              "factText": "정식으로 점거한 게 아니라 화상심사 직전 조용한 배경을 잠깐 쓴 것뿐입니다.",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
              "id": "spouse05:b:d-1:self_justification:0",
              "factText": "그때는 거실 회선이 흔들려서 다른 선택지가 거의 없었습니다.",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "들어간 시간이 길지 않았고, 제 입장에선 한 번 버티기 위한 임시 대응이었습니다."
          ],
          "privateKnowledge": [
            "14시 08분에 문을 열면 민재 씨가 당연히 알게 될 수 있다는 걸 알고도 들어갔습니다.",
            "그때는 거실 회선이 흔들려서 다른 선택지가 거의 없었습니다."
          ],
          "suppressions": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다.",
            "14시 08분에 문을 열면 민재 씨가 당연히 알게 될 수 있다는 걸 알고도 들어갔습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-1:uncertainty:0",
              "factText": "들어간 시간이 길지 않았고, 제 입장에선 한 번 버티기 위한 임시 대응이었습니다.",
              "tags": [
                "uncertainty",
                "threshold"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
              "id": "spouse05:b:d-1:context:0",
              "factText": "그때는 거실 회선이 흔들려서 다른 선택지가 거의 없었습니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "구 관리자 코드를 써서 서재에 들어간 건 맞지만, 해외 화상심사를 놓치지 않으려던 목적이었습니다."
          ],
          "privateKnowledge": [
            "서재에 들어가 화상심사만 한 게 아니라 마이크와 자리 배치도 제 쪽에 맞게 손댔습니다.",
            "그 순간 가장 크게 든 생각은 제 일이 늘 뒤로 밀려도 되는 일로 취급된다는 서러움이었습니다."
          ],
          "suppressions": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-1:admission:0",
              "factText": "구 관리자 코드를 써서 서재에 들어간 건 맞지만, 해외 화상심사를 놓치지 않으려던 목적이었습니다.",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
              "id": "spouse05:b:d-1:context:1",
              "factText": "사전 고지를 못 한 건 잘못이지만, 14시 15분 심사를 앞두고 회선과 소음이 한꺼번에 무너져 너무 급했습니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "사전 고지를 못 한 건 잘못이지만, 14시 15분 심사를 앞두고 회선과 소음이 한꺼번에 무너져 너무 급했습니다."
          ],
          "privateKnowledge": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다.",
            "그 순간 가장 크게 든 생각은 제 일이 늘 뒤로 밀려도 되는 일로 취급된다는 서러움이었습니다."
          ],
          "suppressions": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-1:counter:0",
              "factText": "사전 고지를 못 한 건 잘못이지만, 14시 15분 심사를 앞두고 회선과 소음이 한꺼번에 무너져 너무 급했습니다.",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-1:responsibility:0",
              "factText": "제가 들어간 시간대가 민재 씨 예약 블록이었다는 점은 알고 있었고, 그래서 더 방어적으로 굴었습니다.",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "그 순간 가장 크게 든 생각은 제 일이 늘 뒤로 밀려도 되는 일로 취급된다는 서러움이었습니다."
          ],
          "privateKnowledge": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다."
          ],
          "suppressions": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-1:fear:0",
              "factText": "그 순간 가장 크게 든 생각은 제 일이 늘 뒤로 밀려도 되는 일로 취급된다는 서러움이었습니다.",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
              "id": "spouse05:b:d-1:harm:0",
              "factText": "그래서 저는 잠깐 쓴 행위를 무단 출입보다 생존용 대응처럼 축소해서 말했습니다.",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
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
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다."
          ],
          "privateKnowledge": [
            "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다."
          ],
          "suppressions": [
            "상대를 깎아내리며 책임을 흐리는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-1:admission:1",
              "factText": "민재 씨 예약 블록에 구 관리자 코드를 써서 들어가고, 사전 고지 없이 화상심사를 진행한 건 제 잘못입니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-1:relationship:0",
              "factText": "다만 그 선택은 일을 망치려는 의도가 아니라, 잠긴 공유공간과 흔들리는 거실 회선 속에서 나온 급한 판단이었습니다.",
              "tags": [
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "time": {
                  "exact": "14시 08분",
                  "neutral": "그 시점",
                  "dateExact": "사건 당일 14시 08분",
                  "period": "14시 15분 화상심사 직전"
                },
                "space": {
                  "exact": "서재",
                  "neutral": "그 방"
                },
                "code": {
                  "exact": "구 관리자 코드",
                  "neutral": "이전 코드"
                },
                "duration": {
                  "exact": "약 12분",
                  "neutral": "짧은 사용 시간",
                  "rounded": "12분"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
            "민재 씨가 서재 잠금권한과 프린터 접근을 혼자 바꿔 공유 공간을 자기 방처럼 만든 건 사실입니다.",
            "공유 공간이라면 같은 날 같이 알리고 승인받는 절차가 먼저였어야 합니다."
          ],
          "privateKnowledge": [
            "제가 뒤늦게 구 관리자 코드를 이용한 행동 때문에 제 주장도 일부 약해질 수 있다는 걸 압니다.",
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "suppressions": [
            "제가 뒤늦게 구 관리자 코드를 이용한 행동 때문에 제 주장도 일부 약해질 수 있다는 걸 압니다.",
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-2:act:0",
              "factText": "민재 씨가 서재 잠금권한과 프린터 접근을 혼자 바꿔 공유 공간을 자기 방처럼 만든 건 사실입니다.",
              "tags": [
                "act",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            },
            {
              "id": "spouse05:b:d-2:rule:0",
              "factText": "공유 공간이라면 같은 날 같이 알리고 승인받는 절차가 먼저였어야 합니다.",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "11시 47분 권한 변경 알림과 10시간 전용 블록 기록이 한꺼번에 남아 있습니다."
          ],
          "privateKnowledge": [
            "제가 뒤늦게 구 관리자 코드를 이용한 행동 때문에 제 주장도 일부 약해질 수 있다는 걸 압니다.",
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "suppressions": [
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-2:timeline:0",
              "factText": "11시 47분 권한 변경 알림과 10시간 전용 블록 기록이 한꺼번에 남아 있습니다.",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
              "id": "spouse05:b:d-2:counter:0",
              "factText": "공유 공간이라면 같은 날 같이 알리고 승인받는 절차가 먼저였어야 합니다.",
              "tags": [
                "counter",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
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
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "제가 이후에도 구 관리자 코드를 지워 두지 않은 책임이 전혀 없다고는 말 못 합니다."
          ],
          "privateKnowledge": [
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "suppressions": [
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-2:context:0",
              "factText": "제가 이후에도 구 관리자 코드를 지워 두지 않은 책임이 전혀 없다고는 말 못 합니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-2:counter:1",
              "factText": "민재 씨가 서재 잠금권한과 프린터 접근을 혼자 바꿔 공유 공간을 자기 방처럼 만든 건 사실입니다.",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "보안 요구가 있었다 해도 읽기 전용 전환과 프린터 잠금까지 한 건 분명 과했습니다."
          ],
          "privateKnowledge": [
            "민재 씨에게 실제 보안 압박이 있었더라도 그 방식이 과했다는 점을 더 또렷하게 드러내고 싶습니다."
          ],
          "suppressions": [
            "권한 일방 변경이 구조적 출발점이었지만, 저도 그 뒤 무단으로 들어가 상황을 더 악화시킨 책임이 있습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-2:responsibility:0",
              "factText": "보안 요구가 있었다 해도 읽기 전용 전환과 프린터 잠금까지 한 건 분명 과했습니다.",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-2:counter:2",
              "factText": "민재 씨가 서재 잠금권한과 프린터 접근을 혼자 바꿔 공유 공간을 자기 방처럼 만든 건 사실입니다.",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "그 알림을 보는 순간 제 일은 언제든 뒤로 밀려도 되는 일이라는 메시지처럼 느껴졌습니다."
          ],
          "privateKnowledge": [
            "권한 일방 변경이 구조적 출발점이었지만, 저도 그 뒤 무단으로 들어가 상황을 더 악화시킨 책임이 있습니다."
          ],
          "suppressions": [
            "권한 일방 변경이 구조적 출발점이었지만, 저도 그 뒤 무단으로 들어가 상황을 더 악화시킨 책임이 있습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-2:emotion:0",
              "factText": "그 알림을 보는 순간 제 일은 언제든 뒤로 밀려도 되는 일이라는 메시지처럼 느껴졌습니다.",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "emotional",
                "counter"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-2:relationship:0",
              "factText": "그래서 저는 권한 변경을 단순한 설정이 아니라 지위 싸움의 선언으로 받아들였습니다.",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "emotional",
                "counter"
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
            "권한 일방 변경이 구조적 출발점이었지만, 저도 그 뒤 무단으로 들어가 상황을 더 악화시킨 책임이 있습니다."
          ],
          "privateKnowledge": [
            "권한 일방 변경이 구조적 출발점이었지만, 저도 그 뒤 무단으로 들어가 상황을 더 악화시킨 책임이 있습니다."
          ],
          "suppressions": [
            "상대 잘못만으로 단정하는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-2:responsibility:1",
              "factText": "권한 일방 변경이 구조적 출발점이었지만, 저도 그 뒤 무단으로 들어가 상황을 더 악화시킨 책임이 있습니다.",
              "tags": [
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-2:legacy_sentence:0",
              "factText": "다음에는 권한 변경과 일정 변경을 같은 문서에서 함께 승인받아야 합니다.",
              "tags": [
                "legacy_sentence",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "강민재",
                  "neutral": "상대방",
                  "fullName": "강민재",
                  "judgeRef": "민재 씨"
                },
                "time": {
                  "exact": "사건 사흘 전 밤 11시 47분",
                  "neutral": "그 시점",
                  "dateExact": "사건 사흘 전 밤 11시 47분",
                  "period": "권한 변경 알림 직후"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "길어진 예약 블록"
                },
                "access": {
                  "exact": "읽기 전용",
                  "neutral": "제한된 권한"
                },
                "device": {
                  "exact": "프린터 접근 계정",
                  "neutral": "공유 장비 접근"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "저는 민재 씨 회의를 망치겠다고 협박한 적 없습니다."
          ],
          "privateKnowledge": [
            "7월 8일과 7월 11일에 따로 한 말을 민재 씨가 한 파일처럼 들리게 낸 사실을 알고 있습니다.",
            "제 말투가 실제보다 더 위협적으로 들릴 수 있다는 점이 부끄러워 처음엔 설명을 미뤘습니다."
          ],
          "suppressions": [
            "7월 8일과 7월 11일에 따로 한 말을 민재 씨가 한 파일처럼 들리게 낸 사실을 알고 있습니다.",
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-3:denial:0",
              "factText": "저는 민재 씨 회의를 망치겠다고 협박한 적 없습니다.",
              "tags": [
                "denial",
                "quote"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:b:d-3:context:0",
              "factText": "문제의 문장은 책상 배치와 백업 파일 공유 문제로 욱해서 나온 불평이지, 실제 방해 예고가 아니었습니다.",
              "tags": [
                "context",
                "quote"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
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
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "문제의 문장은 책상 배치와 백업 파일 공유 문제로 욱해서 나온 불평이지, 실제 방해 예고가 아니었습니다."
          ],
          "privateKnowledge": [
            "7월 8일과 7월 11일에 따로 한 말을 민재 씨가 한 파일처럼 들리게 낸 사실을 알고 있습니다.",
            "제 말투가 실제보다 더 위협적으로 들릴 수 있다는 점이 부끄러워 처음엔 설명을 미뤘습니다."
          ],
          "suppressions": [
            "7월 8일과 7월 11일에 따로 한 말을 민재 씨가 한 파일처럼 들리게 낸 사실을 알고 있습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-3:quote:0",
              "factText": "문제의 문장은 책상 배치와 백업 파일 공유 문제로 욱해서 나온 불평이지, 실제 방해 예고가 아니었습니다.",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-3:uncertainty:0",
              "factText": "저는 민재 씨 회의를 망치겠다고 협박한 적 없습니다.",
              "tags": [
                "uncertainty",
                "denial"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "화가 나서 거친 말을 한 건 맞지만, 녹취 속 두 문장은 같은 날 같은 맥락이 아닙니다."
          ],
          "privateKnowledge": [
            "7월 8일과 7월 11일에 따로 한 말을 민재 씨가 한 파일처럼 들리게 낸 사실을 알고 있습니다.",
            "제 말투가 실제보다 더 위협적으로 들릴 수 있다는 점이 부끄러워 처음엔 설명을 미뤘습니다."
          ],
          "suppressions": [
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-3:admission:0",
              "factText": "화가 나서 거친 말을 한 건 맞지만, 녹취 속 두 문장은 같은 날 같은 맥락이 아닙니다.",
              "tags": [
                "admission",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-3:context:1",
              "factText": "7월 8일 말은 거실 소음에 대한 불평이었고, 7월 11일 말은 백업 드라이브 공유 문제를 두고 한 말이었습니다.",
              "tags": [
                "context",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
            "7월 8일 말은 거실 소음에 대한 불평이었고, 7월 11일 말은 백업 드라이브 공유 문제를 두고 한 말이었습니다."
          ],
          "privateKnowledge": [
            "제 말투가 실제보다 더 위협적으로 들릴 수 있다는 점이 부끄러워 처음엔 설명을 미뤘습니다."
          ],
          "suppressions": [
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-3:timeline:0",
              "factText": "7월 8일 말은 거실 소음에 대한 불평이었고, 7월 11일 말은 백업 드라이브 공유 문제를 두고 한 말이었습니다.",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:b:d-3:counter:0",
              "factText": "제 말투가 날카로워 오해를 부를 수 있었다는 점은 인정하지만, 고의 업무방해 의도까지는 아니었습니다.",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 일을 망치려는 사람처럼 편집된 순간, 제 직업 자체가 가벼운 일로 취급된 기분이었습니다."
          ],
          "privateKnowledge": [
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "suppressions": [
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-3:shame:0",
              "factText": "제가 일을 망치려는 사람처럼 편집된 순간, 제 직업 자체가 가벼운 일로 취급된 기분이었습니다.",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
              "id": "spouse05:b:d-3:harm:0",
              "factText": "그래서 저는 무단 출입 문제보다도 '고의 방해범'으로 박제된 느낌에 더 크게 반응했습니다.",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
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
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "privateKnowledge": [
            "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다."
          ],
          "suppressions": [
            "상대를 고의 방해범으로 고정하는 서술"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-3:admission:1",
              "factText": "제가 분노를 드러낸 건 사실이지만, 문제 녹취는 업무방해 협박의 증거가 아니라 맥락이 갈라진 불만 조각입니다.",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-3:relationship:0",
              "factText": "거친 문장을 따질수록 원본 날짜와 상황을 같이 놓고 봐야 합니다.",
              "tags": [
                "relationship",
                "legacy_sentence"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대방",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "file": {
                  "exact": "1분 12초 m4a 파일",
                  "neutral": "해당 오디오 파일"
                },
                "quote": {
                  "exact": "'회의 망쳐버릴까'",
                  "neutral": "그 문장"
                },
                "quote2": {
                  "exact": "'파일 좀 보내면 끝나'",
                  "neutral": "다른 문장"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 녹음일",
                  "dateExact": "7월 8일",
                  "period": "거실 소음 불평이 나온 날"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "둘째 녹음일",
                  "dateExact": "7월 11일",
                  "period": "백업 드라이브 문제를 말한 날"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
            "민재 씨가 서로 다른 날짜의 음성을 붙여 놓고 원본처럼 제시한 건 사실입니다.",
            "증거를 낼 거였다면 원본 세션과 날짜부터 분리해 설명했어야 합니다."
          ],
          "privateKnowledge": [
            "제가 실제로는 화를 낸 문장 때문에 방어 논리가 과격해질 수 있다는 점을 압니다.",
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "suppressions": [
            "제가 실제로는 화를 낸 문장 때문에 방어 논리가 과격해질 수 있다는 점을 압니다.",
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-4:act:0",
              "factText": "민재 씨가 서로 다른 날짜의 음성을 붙여 놓고 원본처럼 제시한 건 사실입니다.",
              "tags": [
                "act",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            },
            {
              "id": "spouse05:b:d-4:rule:0",
              "factText": "증거를 낼 거였다면 원본 세션과 날짜부터 분리해 설명했어야 합니다.",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "편집 앱 export 흔적, 7월 8일·11일 원본, 오한결 씨 렌더 로그가 한 줄로 이어집니다."
          ],
          "privateKnowledge": [
            "제가 실제로는 화를 낸 문장 때문에 방어 논리가 과격해질 수 있다는 점을 압니다.",
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "suppressions": [
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-4:timeline:0",
              "factText": "편집 앱 export 흔적, 7월 8일·11일 원본, 오한결 씨 렌더 로그가 한 줄로 이어집니다.",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
              "id": "spouse05:b:d-4:counter:0",
              "factText": "증거를 낼 거였다면 원본 세션과 날짜부터 분리해 설명했어야 합니다.",
              "tags": [
                "counter",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
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
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "제가 화를 낸 문장 일부가 오해를 부를 수 있다는 점은 압니다."
          ],
          "privateKnowledge": [
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "suppressions": [
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-4:context:0",
              "factText": "제가 화를 낸 문장 일부가 오해를 부를 수 있다는 점은 압니다.",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-4:counter:1",
              "factText": "민재 씨가 서로 다른 날짜의 음성을 붙여 놓고 원본처럼 제시한 건 사실입니다.",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "제 무단 출입이 있었다고 해서 편집본을 원본처럼 쓰는 일까지 정당화되진 않습니다."
          ],
          "privateKnowledge": [
            "그래도 제 잘못과 별개로 증거 편집은 다른 층위의 문제라는 점을 분리해서 말하고 싶습니다."
          ],
          "suppressions": [
            "저도 분노를 키운 책임은 있지만, 증거 형식을 바꿔 내는 선까지 넘어간 잘못은 민재 씨 쪽이 더 큽니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-4:responsibility:0",
              "factText": "제 무단 출입이 있었다고 해서 편집본을 원본처럼 쓰는 일까지 정당화되진 않습니다.",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-4:counter:2",
              "factText": "민재 씨가 서로 다른 날짜의 음성을 붙여 놓고 원본처럼 제시한 건 사실입니다.",
              "tags": [
                "counter",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "상담 자리와 임대인 면담에서 제가 고의 방해범처럼 재생된 파일이 가장 아팠습니다."
          ],
          "privateKnowledge": [
            "저도 분노를 키운 책임은 있지만, 증거 형식을 바꿔 내는 선까지 넘어간 잘못은 민재 씨 쪽이 더 큽니다."
          ],
          "suppressions": [
            "저도 분노를 키운 책임은 있지만, 증거 형식을 바꿔 내는 선까지 넘어간 잘못은 민재 씨 쪽이 더 큽니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-4:emotion:0",
              "factText": "상담 자리와 임대인 면담에서 제가 고의 방해범처럼 재생된 파일이 가장 아팠습니다.",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "emotional",
                "counter"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-4:relationship:0",
              "factText": "그 파일은 사실 확인 도구가 아니라 제 전문성과 품위를 깎는 장치처럼 작동했습니다.",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "emotional",
                "counter"
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
            "저도 분노를 키운 책임은 있지만, 증거 형식을 바꿔 내는 선까지 넘어간 잘못은 민재 씨 쪽이 더 큽니다."
          ],
          "privateKnowledge": [
            "저도 분노를 키운 책임은 있지만, 증거 형식을 바꿔 내는 선까지 넘어간 잘못은 민재 씨 쪽이 더 큽니다."
          ],
          "suppressions": [
            "상대 잘못만으로 단정하는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-4:responsibility:1",
              "factText": "저도 분노를 키운 책임은 있지만, 증거 형식을 바꿔 내는 선까지 넘어간 잘못은 민재 씨 쪽이 더 큽니다.",
              "tags": [
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-4:legacy_sentence:0",
              "factText": "이미 퍼진 편집본은 원본과 구분해 정정하고, 전달받은 사람들에게 설명까지 따라가야 합니다.",
              "tags": [
                "legacy_sentence",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "오한결",
                  "neutral": "보조편집자",
                  "fullName": "오한결",
                  "judgeRef": "오한결 씨"
                },
                "file": {
                  "exact": "병합 export 파일",
                  "neutral": "편집본"
                },
                "quote": {
                  "exact": "'핵심만 하나로 정리'",
                  "neutral": "그 지시"
                },
                "date1": {
                  "exact": "7월 8일",
                  "neutral": "첫 원본 날짜",
                  "dateExact": "7월 8일",
                  "period": "첫 번째 원본 녹음일"
                },
                "date2": {
                  "exact": "7월 11일",
                  "neutral": "두 번째 원본 날짜",
                  "dateExact": "7월 11일",
                  "period": "두 번째 원본 녹음일"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "재택근무 파국의 출발은 민재 씨가 공유 공간을 봉쇄한 데 있지, 제 침범 하나 때문만은 아닙니다."
          ],
          "privateKnowledge": [
            "그래도 저는 그날 무단으로 들어갔고 사전 고지를 하지 않았습니다.",
            "마감 압박 때문에 제 선택이 더 거칠어졌습니다."
          ],
          "suppressions": [
            "제가 무단으로 들어간 사실",
            "사전 고지 없이 행동한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-5:counter:0",
              "factText": "갈등의 구조적 시작을 민재 씨의 권한 봉쇄 쪽에 두는 주장",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-5:counter:1",
              "factText": "제 침범만으로 파국을 설명하려는 프레임을 거부하는 반박",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "적어도 거실 회선이 멀쩡했다면 제가 그렇게까지 몰리진 않았다고 생각합니다."
          ],
          "privateKnowledge": [
            "14시 15분 심사를 앞두고 제가 서재를 유일한 답으로 본 건 사실입니다.",
            "권한 봉쇄에 대한 분노가 선택을 더 공격적으로 만들었습니다."
          ],
          "suppressions": [
            "14시 15분 심사를 앞둔 조급함"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-5:threshold:0",
              "factText": "회선 장애가 없었다면 무단 진입까지 가지 않았을 것이라는 임계점 주장",
              "tags": [
                "threshold",
                "context"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-5:context:0",
              "factText": "저는 여전히 출입 자체보다 환경 압박을 더 크게 말하고 싶어 합니다.",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "hedge",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "마감이 급해서 무단으로 들어간 선택이 제 쪽에서도 나온 건 맞습니다."
          ],
          "privateKnowledge": [
            "한 번만 쓰면 된다고 스스로를 설득했습니다.",
            "들어간 뒤 마이크와 자리 배치도 손봤습니다."
          ],
          "suppressions": [
            "들어가서 자리 배치까지 손댄 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-5:admission:0",
              "factText": "시간 압박 속에서 무단 진입을 선택한 부분 인정",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
              "id": "spouse05:b:d-5:context:1",
              "factText": "그 선택 뒤에는 회선 장애와 권한 봉쇄가 동시에 있었다는 설명",
              "tags": [
                "context",
                "counter"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제 출입이 불을 붙인 건 맞지만, 민재 씨의 전용 블록과 일정 겹침이 불쏘시개였습니다."
          ],
          "privateKnowledge": [
            "제 분노가 상황을 지위 싸움으로 더 빨리 번지게 했습니다.",
            "민재 씨 일만 더 중요하다고 단정해 버린 적도 있습니다."
          ],
          "suppressions": [
            "제가 감정적으로 의도를 단정한 태도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse05:b:tell:numeric_comparison",
            "spouse05:b:tell:motive_jump"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-5:responsibility:0",
              "factText": "제 행동이 점화점이었지만 구조적 조건은 이미 악화돼 있었다는 정리",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-5:motive:0",
              "factText": "권한 봉쇄를 곧바로 지위 싸움으로 읽어 갈등을 더 키운 심리",
              "tags": [
                "motive",
                "emotion"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
            "집에서 하는 제 일이 계속 덜 중요한 일 취급을 받는다고 느껴서 더 세게 밀어붙였습니다."
          ],
          "privateKnowledge": [
            "그래서 저는 12분이었다는 식으로 제 행동을 줄여 말했습니다."
          ],
          "suppressions": [
            "제가 행동을 분 단위로 축소해 온 습관"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-5:shame:0",
              "factText": "제 일이 취미처럼 취급된다는 수치감이 무단 진입을 합리화하게 만들었다는 고백",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
              "id": "spouse05:b:d-5:harm:0",
              "factText": "그 감정이 실제로는 민재 씨 일정과 제 신뢰를 동시에 손상시켰다는 자각",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
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
            "파국은 제 침범과 민재 씨의 봉쇄, 회선 문제, 화상일정 충돌이 한꺼번에 겹친 결과입니다."
          ],
          "privateKnowledge": [
            "이제는 제 무단 출입을 '잠깐'으로만 줄여 말할 수 없다는 걸 압니다."
          ],
          "suppressions": [
            "시간만 짧았다고 책임을 줄이는 표현"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse05:b:tell:motive_jump",
            "spouse05:b:tell:selective_confession"
          ],
          "claimAtoms": [
            {
              "id": "spouse05:b:d-5:responsibility:1",
              "factText": "재택근무 파국이 한 사람의 잘못이 아니라 복합 원인의 결합이었다는 수용",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse05:b:d-5:relationship:0",
              "factText": "공간 규칙과 일의 존중을 함께 복원하지 않으면 같은 파국이 반복된다는 결론",
              "tags": [
                "relationship",
                "legacy_sentence"
              ],
              "slots": {
                "time1": {
                  "exact": "14시 15분",
                  "neutral": "첫 화상 일정",
                  "dateExact": "사건 당일 14시 15분",
                  "period": "소담 화상심사 시간"
                },
                "time2": {
                  "exact": "14시 30분",
                  "neutral": "두 번째 화상 일정",
                  "dateExact": "사건 당일 14시 30분",
                  "period": "민재 클라이언트 리뷰 시간"
                },
                "net": {
                  "exact": "13시 41분 장애 접수",
                  "neutral": "그날 회선 장애",
                  "dateExact": "사건 당일 13시 41분",
                  "period": "거실 회선 품질 저하 접수"
                },
                "block": {
                  "exact": "10시간 전용 블록",
                  "neutral": "전용 예약"
                },
                "space": {
                  "exact": "서재와 거실",
                  "neutral": "집 안 작업 공간"
                }
              },
              "stanceHints": [
                "emotional",
                "confess"
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
} as const;

export default spouse05V2Atoms;

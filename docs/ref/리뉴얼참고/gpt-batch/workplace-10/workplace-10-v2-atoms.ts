export const workplace10V2Atoms = {
  "caseId": "workplace-10",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 혜린 씨에게 정규직 전환을 확정 약속으로 말한 적이 없습니다.",
            "헤드카운트와 예산이 정해지지 않은 상태에서 검토 가능성만 언급한 것입니다."
          ],
          "privateKnowledge": [
            "제가 남긴 문장이 확정처럼 들릴 수 있다는 점은 알고 있었습니다."
          ],
          "suppressions": [
            "같은 취지의 문구를 두 차례 이상 반복한 사실",
            "그 직후 혜린 씨에게 핵심 인수인계 업무를 맡긴 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-1:denial:0",
              "factText": "정규직 전환이 확정 약속은 아니었다는 주장",
              "tags": [
                "denial",
                "act",
                "timeline"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-1:uncertainty:0",
              "factText": "헤드카운트와 예산 미확정 상태를 앞세워 문장 강도를 낮추는 사실",
              "tags": [
                "uncertainty",
                "self_justification",
                "context"
              ],
              "slots": {
                "status": {
                  "exact": "헤드카운트·예산 미확정",
                  "neutral": "불확실한 상태"
                },
                "time": {
                  "exact": "런칭 전",
                  "neutral": "그때",
                  "period": "출시 직전"
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
            "제가 혜린 씨를 기대하게 했을 수는 있습니다.",
            "다만 '올려 보겠다'는 취지였지 확정 통보는 아니었습니다."
          ],
          "privateKnowledge": [
            "런칭만 넘기면 팀 공백을 막을 수 있다는 계산이 있었습니다."
          ],
          "suppressions": [
            "마지막 결정 이전에도 기대가 유지되도록 표현을 반복한 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-1:quote:0",
              "factText": "'전환안 올릴게'라는 문구를 가능성 표현으로 낮추는 시도",
              "tags": [
                "quote",
                "denial",
                "self_justification"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-1:motive:0",
              "factText": "팀 공백을 막기 위해 전환 기대를 유지하려 한 동기",
              "tags": [
                "motive",
                "fear",
                "beneficiary"
              ],
              "slots": {
                "team": {
                  "exact": "팀 공백 방지",
                  "neutral": "운영 유지"
                },
                "time": {
                  "exact": "런칭 막판",
                  "neutral": "그 무렵",
                  "period": "출시 직전"
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "제가 기대를 키운 건 맞습니다.",
            "다만 그 표현은 전환안을 올려 보겠다는 뜻이었고, 최종 승인은 남아 있었습니다."
          ],
          "privateKnowledge": [
            "혜린 씨가 그 말을 믿고 잔류와 추가 업무를 감수한다는 걸 알고 있었습니다."
          ],
          "suppressions": [
            "반복 약속이 단순 격려가 아니라 잔류 유인으로 작동한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-1:act:0",
              "factText": "반복된 전환 문구가 실제 잔류 유인으로 작동했다는 사실",
              "tags": [
                "act",
                "evidence",
                "timeline"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-1:beneficiary:0",
              "factText": "혜린 씨가 약속 직후 야간 인수인계와 교육을 맡게 된 흐름",
              "tags": [
                "beneficiary",
                "context",
                "responsibility"
              ],
              "slots": {
                "task": {
                  "exact": "야간 인수인계와 신규 인력 교육",
                  "neutral": "추가 핵심 업무"
                },
                "time": {
                  "exact": "약속 직후",
                  "neutral": "그 직후",
                  "period": "런칭 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
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
            "제가 전환 기대를 유지한 건 맞습니다.",
            "다만 당시에는 팀 공백과 일정 압박이 컸고, 혜린 씨도 그 말을 확정처럼 받아들였습니다."
          ],
          "privateKnowledge": [
            "저는 전환 슬롯이 아직 확정되지 않았다는 걸 알면서도 그 말을 거두지 않았습니다."
          ],
          "suppressions": [
            "표현을 정리해 기록하지 않은 채 계속 같은 기대를 유지한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-1:responsibility:0",
              "factText": "전환 슬롯 미확정 상태를 알면서도 기대를 지속시킨 책임",
              "tags": [
                "responsibility",
                "timeline",
                "motive"
              ],
              "slots": {
                "status": {
                  "exact": "전환 슬롯 미확정",
                  "neutral": "불확실한 상태"
                },
                "time": {
                  "exact": "발표 전",
                  "neutral": "그 무렵",
                  "period": "분기 말"
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
              "id": "workplace-10:a:d-1:relationship:0",
              "factText": "상대도 확정처럼 받아들였다는 식으로 책임을 분산하는 태도",
              "tags": [
                "relationship",
                "counter",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                },
                "phrase": {
                  "exact": "확정처럼 들린 문장",
                  "neutral": "그 말"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "그 시기 저는 전환보다 런칭 공백을 먼저 막으려 했습니다.",
            "그래서 불확실한 상태를 알면서도 기대를 접지 못하게 했습니다."
          ],
          "privateKnowledge": [
            "그 말이 약속처럼 들린다는 걸 알았고, 일부러 정정하지 않았습니다."
          ],
          "suppressions": [
            "런칭 이후에도 기준과 시점을 다시 바꿀 수 있다는 계산"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-1:fear:0",
              "factText": "팀 운영이 무너질까 두려워 약속을 정정하지 못한 감정",
              "tags": [
                "fear",
                "emotion",
                "motive"
              ],
              "slots": {
                "team": {
                  "exact": "팀 운영 붕괴 우려",
                  "neutral": "운영 불안"
                },
                "time": {
                  "exact": "출시 직전",
                  "neutral": "그 시점",
                  "period": "런칭 막판"
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
              "id": "workplace-10:a:d-1:admission:0",
              "factText": "불확실성을 알면서도 기대를 유지하게 만든 사실",
              "tags": [
                "admission",
                "responsibility",
                "context"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
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
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "제가 혜린 씨를 붙잡아 두기 위해 전환안을 올리겠다는 말을 반복했습니다.",
            "막판에 기준과 시점을 바꿔 기대를 무너뜨린 건 제 책임입니다."
          ],
          "privateKnowledge": [
            "전환 약속을 관리 도구처럼 사용한 점이 가장 큰 잘못이라는 걸 압니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-1:admission:1",
              "factText": "전환안을 올리겠다는 말을 반복해 혜린 씨를 붙잡아 둔 사실",
              "tags": [
                "admission",
                "act",
                "responsibility"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:a:d-1:harm:0",
              "factText": "막판 번복으로 혜린 씨의 기대와 생계 계획을 무너뜨린 책임",
              "tags": [
                "harm",
                "responsibility",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                },
                "time": {
                  "exact": "계약 종료 직전",
                  "neutral": "막판",
                  "period": "발표 주간"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
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
            "전환이 보류된 건 헤드카운트와 예산 문제였지, 제가 개인적으로 막은 건 아닙니다."
          ],
          "privateKnowledge": [
            "보류 캡처만으로는 실제 상태를 다 보여 주지 않는다는 걸 알고 있었습니다."
          ],
          "suppressions": [
            "재요청 가능 상태와 코멘트 영역이 잘린 점",
            "commitment concern 메모를 먼저 남긴 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-4:denial:0",
              "factText": "전환 보류가 전적으로 예산과 헤드카운트 때문이었다는 주장",
              "tags": [
                "denial",
                "context",
                "institution"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-4:uncertainty:0",
              "factText": "보류 화면 하나로 실제 HR 상태를 단순화하는 태도",
              "tags": [
                "uncertainty",
                "evidence",
                "self_justification"
              ],
              "slots": {
                "screen": {
                  "exact": "절삭된 보류 캡처",
                  "neutral": "그 캡처"
                },
                "status": {
                  "exact": "완전 차단처럼 보이는 상태",
                  "neutral": "막힌 것처럼 보인 상태"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "캡처가 전부는 아니지만, 당시에는 그렇게 설명할 수밖에 없었습니다.",
            "저는 보류 상태를 먼저 본 것이지 의도적으로 속이려던 건 아닙니다."
          ],
          "privateKnowledge": [
            "이미 부정적 코멘트를 남긴 상태라 예산만으로 말하는 편이 저에게 유리하다는 걸 알았습니다."
          ],
          "suppressions": [
            "예산 설명 뒤에 제 코멘트 영향력을 숨긴 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-4:evidence:0",
              "factText": "절삭된 캡처가 전체 상태를 숨긴 불완전 자료라는 사실",
              "tags": [
                "evidence",
                "context",
                "institution"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "hedge",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-4:shame:0",
              "factText": "관리자로서 직접 막은 사람처럼 보이기 싫어 예산 설명에 숨은 심리",
              "tags": [
                "shame",
                "fear",
                "motive"
              ],
              "slots": {
                "fear": {
                  "exact": "관리자 신뢰 상실",
                  "neutral": "평가 하락"
                },
                "reason": {
                  "exact": "예산 설명",
                  "neutral": "그 설명"
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
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "제가 예산과 헤드카운트 얘기만 앞세운 건 맞습니다.",
            "다만 그때도 보류와 재요청 가능이 섞여 있었고, 최종 결론은 남아 있었습니다."
          ],
          "privateKnowledge": [
            "메모가 전환 심사에 영향을 줄 수 있다는 점을 알고 있었습니다."
          ],
          "suppressions": [
            "선행 부정 메모를 먼저 남긴 사실"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-4:evidence:1",
              "factText": "보류 상태와 재요청 가능 상태가 동시에 존재했던 사실",
              "tags": [
                "evidence",
                "timeline",
                "institution"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-4:responsibility:0",
              "factText": "매니저 코멘트가 심사에 영향을 줄 수 있음을 알면서도 숨긴 점",
              "tags": [
                "responsibility",
                "rule",
                "context"
              ],
              "slots": {
                "memo": {
                  "exact": "commitment concern 메모",
                  "neutral": "그 메모"
                },
                "institution": {
                  "exact": "HR 전환 리뷰 트래커",
                  "neutral": "HR 기록"
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
            "제가 메모를 먼저 남긴 건 맞습니다.",
            "다만 당시에는 혜린 씨의 잔류 여부와 팀 운영까지 함께 봐야 한다고 생각했습니다."
          ],
          "privateKnowledge": [
            "예산보다 제 판단이 먼저 개입했다는 걸 인정하기 싫어서 설명 순서를 바꿨습니다."
          ],
          "suppressions": [
            "예산 문제보다 제 선행 판단이 먼저였다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-4:timeline:0",
              "factText": "부정 메모가 최종 헤드카운트 결정 이전에 입력된 사실",
              "tags": [
                "timeline",
                "evidence",
                "responsibility"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
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
              "id": "workplace-10:a:d-4:self_justification:0",
              "factText": "팀 운영을 이유로 판단 개입을 정당화하는 태도",
              "tags": [
                "self_justification",
                "motive",
                "fear"
              ],
              "slots": {
                "team": {
                  "exact": "팀 유지",
                  "neutral": "운영 안정"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "솔직히 말씀드리면, 저는 전환 불가를 설명하기보다 제 판단을 방어하려 했습니다.",
            "예산 뒤에 숨으면 제가 먼저 길을 좁혔다는 사실이 덜 드러날 거라고 생각했습니다."
          ],
          "privateKnowledge": [
            "체면을 지키려는 마음이 예산 설명보다 앞섰습니다."
          ],
          "suppressions": [
            "혜린 씨에게 '어쩔 수 없다'고만 말해 판단 개입을 가린 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-4:shame:1",
              "factText": "체면을 지키기 위해 예산 뒤에 숨으려 한 감정",
              "tags": [
                "shame",
                "emotion",
                "motive"
              ],
              "slots": {
                "fear": {
                  "exact": "관리자 체면 손상",
                  "neutral": "체면 손상"
                },
                "reason": {
                  "exact": "예산 핑계",
                  "neutral": "그 핑계"
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
              "id": "workplace-10:a:d-4:admission:0",
              "factText": "제가 먼저 길을 좁혀 놓고도 '어쩔 수 없다'고만 말한 사실",
              "tags": [
                "admission",
                "responsibility",
                "harm"
              ],
              "slots": {
                "memo": {
                  "exact": "선행 부정 메모",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
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
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "제가 선행 메모를 먼저 남기고도 예산과 헤드카운트만 이유처럼 말했습니다.",
            "화면을 잘라 보여 주며 제 판단 개입을 줄여 말한 건 제 책임입니다."
          ],
          "privateKnowledge": [
            "혜린 씨 전환 가능성을 제가 더 좁혔다는 사실을 인정합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-4:admission:1",
              "factText": "선행 부정 메모와 절삭된 캡처로 판단 개입을 축소한 사실",
              "tags": [
                "admission",
                "evidence",
                "responsibility"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "confession",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-4:harm:0",
              "factText": "예산 핑계로 혜린 씨의 전환 판단 기회를 더 좁힌 책임",
              "tags": [
                "harm",
                "responsibility",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                },
                "institution": {
                  "exact": "전환 리뷰 절차",
                  "neutral": "심사 절차"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
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
            "저는 구두 약속으로 혜린 씨를 붙잡아 둔 적이 없습니다.",
            "그 시기에는 서로 상황을 보며 계속 일한 것이지, 숨긴 사실 위에서 관계를 굴린 건 아닙니다."
          ],
          "privateKnowledge": [
            "문서 대신 말로 관계를 유지하면 제가 설명을 바꿀 여지가 생긴다는 걸 알고 있었습니다."
          ],
          "suppressions": [
            "반복된 잔류 요청과 문서화 누락",
            "혜린 씨가 다른 사정을 숨길 수도 있다는 불안"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-5:denial:0",
              "factText": "구두 약속이 관계 유지 수단이 아니었다는 주장",
              "tags": [
                "denial",
                "relationship",
                "context"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-5:privacy:0",
              "factText": "상대의 다른 사정을 확인하지 않은 채 관계를 이어 간 구조",
              "tags": [
                "privacy",
                "uncertainty",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "계약 종료 전까지"
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
            "제가 구두로 전환 얘기를 한 건 맞습니다.",
            "다만 확정은 아니었고, 서로 당장 일을 멈출 수 없는 상태에서 계속 확인한 것입니다."
          ],
          "privateKnowledge": [
            "공식 문장으로 남기지 않으면 혜린 씨를 더 오래 붙잡아 둘 수 있다고 여겼습니다."
          ],
          "suppressions": [
            "전환 기준과 승인권자를 같은 문장으로 기록하지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-5:quote:0",
              "factText": "문서화 없이 구두 약속만 반복한 사실",
              "tags": [
                "quote",
                "relationship",
                "rule"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
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
              "id": "workplace-10:a:d-5:motive:0",
              "factText": "업무 공백을 막기 위해 관계를 느슨하게 유지하려 한 동기",
              "tags": [
                "motive",
                "fear",
                "relationship"
              ],
              "slots": {
                "team": {
                  "exact": "업무 공백 방지",
                  "neutral": "운영 유지"
                },
                "time": {
                  "exact": "런칭 사이클 동안",
                  "neutral": "그 기간",
                  "period": "현재 분기"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "제가 말로 기대를 이어 가며 관계를 유지한 건 맞습니다.",
            "다만 혜린 씨도 자기 사정을 모두 공유하지 않은 채 전환 일정만 계속 확인했습니다."
          ],
          "privateKnowledge": [
            "서로가 불완전한 정보를 쥔 채 버틴 관계라는 걸 느끼고 있었습니다."
          ],
          "suppressions": [
            "과거 두 차례 연장에서도 같은 방식이 반복된 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-5:act:0",
              "factText": "반복된 잔류 요청이 관계 유지 장치로 작동한 사실",
              "tags": [
                "act",
                "relationship",
                "timeline"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-5:counter:0",
              "factText": "상대도 사정을 숨긴 채 전환 일정만 확인했다는 인식",
              "tags": [
                "counter",
                "privacy",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                },
                "contract": {
                  "exact": "다른 회사 계약 가능성",
                  "neutral": "다른 사정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "제가 기록 원칙을 지키지 않은 건 맞습니다.",
            "다만 혜린 씨 쪽도 다른 계약 사실을 말하지 않고 그 관계를 계속 이용했습니다."
          ],
          "privateKnowledge": [
            "문서화만 했어도 이 관계가 여기까지 끌리지 않았을 거라는 걸 압니다."
          ],
          "suppressions": [
            "상호 의존 구조를 알면서도 정리하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-5:rule:0",
              "factText": "1:1 문서와 HR 기록에 같은 문장을 남기지 않은 위반",
              "tags": [
                "rule",
                "evidence",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "같은 문장 기록 원칙",
                  "neutral": "기록 원칙"
                },
                "doc": {
                  "exact": "1:1 문서와 HR 트래커",
                  "neutral": "공식 문서"
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
              "id": "workplace-10:a:d-5:relationship:0",
              "factText": "상호 은폐를 알면서도 관계를 끌고 간 구조",
              "tags": [
                "relationship",
                "counter",
                "responsibility"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
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
            "저는 혜린 씨가 불안해한다는 걸 알면서도 구두 약속을 끊지 못했습니다.",
            "그 말이 관계 유지 수단이라는 걸 알면서도 팀이 먼저라고 스스로 합리화했습니다."
          ],
          "privateKnowledge": [
            "상대가 떠날까 두려워 약속을 정리하지 못했습니다."
          ],
          "suppressions": [
            "불안을 알면서도 잔류 유인으로 사용한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-5:fear:0",
              "factText": "혜린 씨가 떠날까 두려워 구두 약속을 계속한 감정",
              "tags": [
                "fear",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                },
                "emotion": {
                  "exact": "이탈 불안",
                  "neutral": "그 두려움"
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
              "id": "workplace-10:a:d-5:self_justification:0",
              "factText": "팀 유지 명분으로 구두 약속을 정당화한 사실",
              "tags": [
                "self_justification",
                "motive",
                "responsibility"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "제가 문서화되지 않은 약속으로 혜린 씨를 붙잡아 두고 관계를 유지했습니다.",
            "상대가 사정을 숨겼더라도, 그 출발점을 만든 건 제 책임입니다."
          ],
          "privateKnowledge": [
            "불완전한 관계를 방치한 관리 책임을 인정합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:promise_softener",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-5:admission:0",
              "factText": "문서화되지 않은 약속 위에서 관계를 유지한 사실",
              "tags": [
                "admission",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:a:d-5:legacy_sentence:0",
              "factText": "'다음 사이클이면 정리된다'는 누적 약속이 관계를 연명시킨 구조",
              "tags": [
                "legacy_sentence",
                "timeline",
                "harm"
              ],
              "slots": {
                "phrase": {
                  "exact": "다음 사이클이면 정리된다",
                  "neutral": "그 약속"
                },
                "time": {
                  "exact": "지난 두 차례 연장부터",
                  "neutral": "그전부터",
                  "period": "누적 기간"
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
            "혜린 씨가 전환 발표 전 이미 다른 회사와 겹치는 계약을 잡아 두고도 이를 공유하지 않았다는 점입니다."
          ],
          "privateKnowledge": [
            "혜린 씨가 떠날까 걱정하면서도 계약 검증은 뒤로 미뤘습니다."
          ],
          "suppressions": [
            "제가 겹침 징후를 일찍 확인하지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-2:act:0",
              "factText": "혜린 씨가 전환 발표 전 이미 다른 회사와 겹치는 계약을 잡아 두고도 이를 공유하지 않았다는 점입니다.",
              "tags": [
                "act",
                "context"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
                "fact"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-2:uncertainty:0",
              "factText": "혜린 씨가 떠날까 걱정하면서도 계약 검증은 뒤로 미뤘습니다.",
              "tags": [
                "uncertainty",
                "relationship",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
                "withhold"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다."
          ],
          "privateKnowledge": [
            "저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다."
          ],
          "suppressions": [
            "제가 겹침 징후를 일찍 확인하지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-2:evidence:0",
              "factText": "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다.",
              "tags": [
                "evidence",
                "timeline",
                "context"
              ],
              "slots": {
                "log": {
                  "exact": "출입·VPN 겹침 로그",
                  "neutral": "원본 로그"
                },
                "time": {
                  "exact": "일부 평일 시간대",
                  "neutral": "겹친 시간대",
                  "period": "평일 근무시간"
                },
                "contract": {
                  "exact": "타사 계약 유효기간",
                  "neutral": "그 계약 기간"
                }
              },
              "stanceHints": [
                "assert",
                "evidence"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-2:quote:0",
              "factText": "저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다.",
              "tags": [
                "quote",
                "emotion",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
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
            "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다.",
            "다만 저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다."
          ],
          "privateKnowledge": [
            "저 역시 그 시기 판단이 완전히 정리돼 있지 않았습니다."
          ],
          "suppressions": [
            "제가 겹침 징후를 일찍 확인하지 못한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-2:context:0",
              "factText": "핵심 사실은 유지하되 자신의 맹점을 일부 인정하는 진술",
              "tags": [
                "context",
                "threshold",
                "emotion"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "balanced"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:a:d-2:context:1",
              "factText": "저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다.",
              "tags": [
                "context",
                "relationship",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial"
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
            "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다.",
            "반복된 전환 지연이 있었다고 해도, 그 사실이 disclosure 누락을 면책하지는 않습니다."
          ],
          "privateKnowledge": [
            "상대 책임을 강조하면서도 제 설명에도 빈틈이 있었다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-2:responsibility:0",
              "factText": "반복된 전환 지연이 있었다고 해도, 그 사실이 disclosure 누락을 면책하지는 않습니다.",
              "tags": [
                "responsibility",
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "blame",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-10:a:d-2:evidence:1",
              "factText": "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다.",
              "tags": [
                "evidence",
                "context",
                "timeline"
              ],
              "slots": {
                "log": {
                  "exact": "출입·VPN 겹침 로그",
                  "neutral": "원본 로그"
                },
                "time": {
                  "exact": "일부 평일 시간대",
                  "neutral": "겹친 시간대",
                  "period": "평일 근무시간"
                },
                "contract": {
                  "exact": "타사 계약 유효기간",
                  "neutral": "그 계약 기간"
                }
              },
              "stanceHints": [
                "blame",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다.",
            "팀 배치와 보안·가용시간 판단이 모두 흔들렸습니다."
          ],
          "privateKnowledge": [
            "핵심 사실을 증명하는 것만큼, 그때 받은 충격과 불안도 큽니다."
          ],
          "suppressions": [
            "저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-2:harm:0",
              "factText": "팀 배치와 보안·가용시간 판단이 모두 흔들렸습니다.",
              "tags": [
                "harm",
                "emotion",
                "relationship"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "assert"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-2:fear:0",
              "factText": "그 시기 받은 충격과 불안을 설명하는 진술",
              "tags": [
                "fear",
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "계약서와 온보딩 메일, 그리고 겹침 로그를 함께 보면 숨긴 계약이 실제 근무 가능성까지 이어졌다는 점이 분명합니다.",
            "동시에 저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다."
          ],
          "privateKnowledge": [
            "핵심 사실과 제 맹점을 함께 말해야 전체 구조가 보인다고 생각합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-2:threshold:0",
              "factText": "핵심 사실을 유지하면서 자신의 맹점도 함께 올려놓는 정리",
              "tags": [
                "threshold",
                "admission",
                "context"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "balanced",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:a:d-2:responsibility:1",
              "factText": "저도 당시에는 이상 징후를 더 빨리 확인하지 못했습니다.",
              "tags": [
                "responsibility",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "balanced",
                "admission"
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
            "혜린 씨가 약속 파기의 피해를 입은 건 맞지만, 순수한 무과실 피해자로만 보기는 어렵습니다."
          ],
          "privateKnowledge": [
            "피해자 서사에 가려진 숨긴 계약이 나중에 더 크게 돌아올 거라고 생각했습니다."
          ],
          "suppressions": [
            "제가 약속으로 기대를 키운 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-3:identity:0",
              "factText": "혜린 씨가 약속 파기의 피해를 입은 건 맞지만, 순수한 무과실 피해자로만 보기는 어렵습니다.",
              "tags": [
                "identity",
                "context"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "assert",
                "fact"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-3:uncertainty:0",
              "factText": "피해자 서사에 가려진 숨긴 계약이 나중에 더 크게 돌아올 거라고 생각했습니다.",
              "tags": [
                "uncertainty",
                "relationship",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
                "withhold"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다."
          ],
          "privateKnowledge": [
            "저 역시 그 불안을 키운 약속을 했다는 점은 압니다."
          ],
          "suppressions": [
            "제가 약속으로 기대를 키운 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-3:evidence:0",
              "factText": "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다.",
              "tags": [
                "evidence",
                "timeline",
                "context"
              ],
              "slots": {
                "log": {
                  "exact": "출입·VPN 겹침 로그",
                  "neutral": "원본 로그"
                },
                "time": {
                  "exact": "일부 평일 시간대",
                  "neutral": "겹친 시간대",
                  "period": "평일 근무시간"
                },
                "contract": {
                  "exact": "타사 계약 유효기간",
                  "neutral": "그 계약 기간"
                }
              },
              "stanceHints": [
                "assert",
                "evidence"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:a:d-3:quote:0",
              "factText": "저 역시 그 불안을 키운 약속을 했다는 점은 압니다.",
              "tags": [
                "quote",
                "emotion",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
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
            "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다.",
            "다만 저 역시 그 불안을 키운 약속을 했다는 점은 압니다."
          ],
          "privateKnowledge": [
            "저 역시 그 시기 판단이 완전히 정리돼 있지 않았습니다."
          ],
          "suppressions": [
            "제가 약속으로 기대를 키운 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-3:counter:0",
              "factText": "핵심 사실은 유지하되 자신의 맹점을 일부 인정하는 진술",
              "tags": [
                "counter",
                "threshold",
                "emotion"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "partial",
                "balanced"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:a:d-3:context:0",
              "factText": "저 역시 그 불안을 키운 약속을 했다는 점은 압니다.",
              "tags": [
                "context",
                "relationship",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial"
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
            "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다.",
            "약속 번복의 책임이 제 쪽에 있어도, 순수 피해자 서사는 사실을 덜어 낸 표현입니다."
          ],
          "privateKnowledge": [
            "상대 책임을 강조하면서도 제 설명에도 빈틈이 있었다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "저 역시 그 불안을 키운 약속을 했다는 점은 압니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-3:responsibility:0",
              "factText": "약속 번복의 책임이 제 쪽에 있어도, 순수 피해자 서사는 사실을 덜어 낸 표현입니다.",
              "tags": [
                "responsibility",
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "blame",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-10:a:d-3:evidence:1",
              "factText": "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다.",
              "tags": [
                "evidence",
                "context",
                "timeline"
              ],
              "slots": {
                "log": {
                  "exact": "출입·VPN 겹침 로그",
                  "neutral": "원본 로그"
                },
                "time": {
                  "exact": "일부 평일 시간대",
                  "neutral": "겹친 시간대",
                  "period": "평일 근무시간"
                },
                "contract": {
                  "exact": "타사 계약 유효기간",
                  "neutral": "그 계약 기간"
                }
              },
              "stanceHints": [
                "blame",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다.",
            "전환 적격성과 상호 신뢰 판단이 동시에 흔들렸습니다."
          ],
          "privateKnowledge": [
            "핵심 사실을 증명하는 것만큼, 그때 받은 충격과 불안도 큽니다."
          ],
          "suppressions": [
            "저 역시 그 불안을 키운 약속을 했다는 점은 압니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-3:harm:0",
              "factText": "전환 적격성과 상호 신뢰 판단이 동시에 흔들렸습니다.",
              "tags": [
                "harm",
                "emotion",
                "relationship"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "emotional",
                "assert"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:a:d-3:fear:0",
              "factText": "그 시기 받은 충격과 불안을 설명하는 진술",
              "tags": [
                "fear",
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "타사 계약서와 겹침 로그가 있는 이상, 피해 사실과 별개로 숨긴 계약 책임도 함께 봐야 합니다.",
            "동시에 저 역시 그 불안을 키운 약속을 했다는 점은 압니다."
          ],
          "privateKnowledge": [
            "핵심 사실과 제 맹점을 함께 말해야 전체 구조가 보인다고 생각합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:a:tell:budget_screen",
            "workplace-10:a:tell:timeline_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:a:d-3:threshold:0",
              "factText": "핵심 사실을 유지하면서 자신의 맹점도 함께 올려놓는 정리",
              "tags": [
                "threshold",
                "admission",
                "context"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "balanced",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:a:d-3:responsibility:1",
              "factText": "저 역시 그 불안을 키운 약속을 했다는 점은 압니다.",
              "tags": [
                "responsibility",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "balanced",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        }
      }
    },
    "b": {
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "저는 타사와 겹치는 고정 근무를 한 적이 없습니다.",
            "있었다면 생계 불안 때문에 대비용으로 검토한 수준이지, 병행을 숨긴 건 아닙니다."
          ],
          "privateKnowledge": [
            "계약서와 온보딩 메일이 공개되면 부정이 오래 가지 못한다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "이미 서명 완료본과 온보딩 메일을 받은 사실",
            "일부 시간대 겹침 가능성을 알고도 공유하지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-2:denial:0",
              "factText": "타사와 겹치는 고정 근무 계약 자체를 부정하는 주장",
              "tags": [
                "denial",
                "act",
                "privacy"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-2:self_justification:0",
              "factText": "다른 회사 계약을 단순 대비 검토로 축소하는 태도",
              "tags": [
                "self_justification",
                "uncertainty",
                "motive"
              ],
              "slots": {
                "label": {
                  "exact": "생계용 대비",
                  "neutral": "대비용 표현"
                },
                "emotion": {
                  "exact": "생계 불안",
                  "neutral": "그 불안"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "계약 자체는 대비 차원에서 잡아 둔 것이었습니다.",
            "저는 그걸 실제 병행 근무가 아니라 보험처럼 본 겁니다."
          ],
          "privateKnowledge": [
            "전환이 또 미뤄질까 두려워 disclosure 시점을 뒤로 미뤘습니다."
          ],
          "suppressions": [
            "계약 체결일이 마지막 전환 기대 기간과 정확히 겹치는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-2:quote:0",
              "factText": "'생계용 대비'와 '보험'이라는 표현으로 계약 무게를 낮추는 시도",
              "tags": [
                "quote",
                "self_justification",
                "privacy"
              ],
              "slots": {
                "label": {
                  "exact": "생계용 대비, 보험",
                  "neutral": "그 표현"
                },
                "contract": {
                  "exact": "타사 근로계약",
                  "neutral": "다른 계약"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-2:fear:0",
              "factText": "전환이 또 미뤄질까 두려워 계약 공개를 미룬 감정",
              "tags": [
                "fear",
                "motive",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "마지막 전환 기대 기간",
                  "neutral": "그 기간",
                  "period": "발표 전"
                },
                "emotion": {
                  "exact": "전환 지연 불안",
                  "neutral": "그 불안"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
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
            "제가 다른 회사 계약서를 잡아 둔 건 맞습니다.",
            "다만 그때는 전환이 될 수도 있다고 믿어서 실제 충돌을 가볍게 봤습니다."
          ],
          "privateKnowledge": [
            "이미 일정표와 온보딩 메일을 함께 관리하며 두 선택지를 병행 준비하고 있었습니다."
          ],
          "suppressions": [
            "계약 사실을 회사에 전혀 알리지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-2:act:0",
              "factText": "타사 계약서와 온보딩 메일을 이미 받은 사실",
              "tags": [
                "act",
                "timeline",
                "evidence"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:b:d-2:context:0",
              "factText": "전환 기대와 다른 회사 준비를 동시에 관리한 정황",
              "tags": [
                "context",
                "counter",
                "relationship"
              ],
              "slots": {
                "doc": {
                  "exact": "일정표와 온보딩 메일",
                  "neutral": "준비 기록"
                },
                "time": {
                  "exact": "같은 시기",
                  "neutral": "동일 시점",
                  "period": "발표 전"
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
            "일부 시간대가 겹친 건 맞습니다.",
            "다만 전환이 계속 미뤄진 상황이 아니었다면 저는 그 계약을 그렇게 오래 끌지 않았을 겁니다."
          ],
          "privateKnowledge": [
            "실제 병행 가능성이 있다는 걸 알고도 회사 신뢰보다 생존을 우선했습니다."
          ],
          "suppressions": [
            "겹치는 평일 시간대 로그가 남아 있다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-2:timeline:0",
              "factText": "타사 계약 기간과 출입·VPN 로그가 일부 평일에 겹친 사실",
              "tags": [
                "timeline",
                "evidence",
                "rule"
              ],
              "slots": {
                "log": {
                  "exact": "출입·VPN 겹침 로그",
                  "neutral": "원본 로그"
                },
                "time": {
                  "exact": "일부 평일 시간대",
                  "neutral": "겹친 시간대",
                  "period": "평일 근무시간"
                },
                "contract": {
                  "exact": "타사 계약 유효기간",
                  "neutral": "그 계약 기간"
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
              "id": "workplace-10:b:d-2:counter:0",
              "factText": "반복된 전환 지연이 disclosure 미루기의 핑계가 된 구조",
              "tags": [
                "counter",
                "motive",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                },
                "time": {
                  "exact": "반복 지연 시점",
                  "neutral": "그때마다",
                  "period": "여러 차례"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "저는 그 계약을 '이중 계약'이 아니라 생계용 대비라고 계속 부르며 버텼습니다.",
            "낙인찍힐까 두려워 표현을 바꿔 무게를 줄였습니다."
          ],
          "privateKnowledge": [
            "겹친 시간대가 보이는데도 표현부터 바꾸려 한 건 부끄러운 대응이었습니다."
          ],
          "suppressions": [
            "보험이라는 말로 은폐의 무게를 줄인 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-2:shame:0",
              "factText": "이중 계약자라는 낙인을 피하려 표현을 바꾼 감정",
              "tags": [
                "shame",
                "emotion",
                "self_justification"
              ],
              "slots": {
                "label": {
                  "exact": "생계용 대비, 보험",
                  "neutral": "그 표현"
                },
                "emotion": {
                  "exact": "낙인 회피",
                  "neutral": "그 두려움"
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
              "id": "workplace-10:b:d-2:privacy:0",
              "factText": "표현을 바꾸며 disclosure 책임을 줄여 보이려 한 사실",
              "tags": [
                "privacy",
                "responsibility",
                "self_justification"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "제가 다른 회사와 겹치는 계약을 맺고 일부 병행 가능성을 숨겼습니다.",
            "그 사실을 공유하지 않은 건 제 잘못이고, 이 점의 책임은 제게 있습니다."
          ],
          "privateKnowledge": [
            "피해자라는 위치를 지키려 disclosure를 더 미뤘다는 것도 인정합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-2:admission:0",
              "factText": "타사와 겹치는 계약과 병행 가능성을 숨긴 사실",
              "tags": [
                "admission",
                "privacy",
                "responsibility"
              ],
              "slots": {
                "contract": {
                  "exact": "타사 근로계약서와 온보딩 메일",
                  "neutral": "그 계약 자료"
                },
                "time": {
                  "exact": "전환 발표 전 겹치는 기간",
                  "neutral": "그 기간",
                  "period": "발표 전후"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-2:harm:0",
              "factText": "겹치는 근무 가능성으로 회사 신뢰와 업무 안전선을 흔든 책임",
              "tags": [
                "harm",
                "responsibility",
                "rule"
              ],
              "slots": {
                "log": {
                  "exact": "출입·VPN 겹침 로그",
                  "neutral": "원본 로그"
                },
                "time": {
                  "exact": "일부 평일 시간대",
                  "neutral": "겹친 시간대",
                  "period": "평일 근무시간"
                },
                "contract": {
                  "exact": "타사 계약 유효기간",
                  "neutral": "그 계약 기간"
                }
              },
              "stanceHints": [
                "confession",
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
            "저는 약속 파기의 피해자입니다.",
            "다른 선택지를 검토했다는 이유만으로 그 피해가 사라지지는 않습니다."
          ],
          "privateKnowledge": [
            "숨긴 계약이 드러나면 '순수한 피해자'라는 표현이 흔들릴 수 있다는 걸 압니다."
          ],
          "suppressions": [
            "피해 진술에서 다른 회사 계약 존재를 빼고 말해 온 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-3:identity:0",
              "factText": "자신을 순수한 피해자로만 고정해 말하는 주장",
              "tags": [
                "identity",
                "harm",
                "denial"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-3:harm:0",
              "factText": "반복 약속과 막판 번복으로 실제 피해를 입은 사실",
              "tags": [
                "harm",
                "timeline",
                "relationship"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 약속"
                },
                "time": {
                  "exact": "계약 종료 직전",
                  "neutral": "막판",
                  "period": "발표 주간"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
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
            "약속 파기로 제가 피해를 본 건 분명합니다.",
            "다만 그 시기에 대비 계약을 잡아 둔 선택이 있었다는 점까지는 부정하지 않겠습니다."
          ],
          "privateKnowledge": [
            "피해를 강조할수록 다른 계약은 더 숨기고 싶었습니다."
          ],
          "suppressions": [
            "피해와 별개로 제 신뢰도도 흔들릴 수 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-3:context:0",
              "factText": "피해 사실과 대비 계약을 분리해 설명하려는 시도",
              "tags": [
                "context",
                "identity",
                "uncertainty"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
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
              "id": "workplace-10:b:d-3:shame:0",
              "factText": "피해자 위치를 잃을까 두려워 다른 계약을 감춘 심리",
              "tags": [
                "shame",
                "fear",
                "motive"
              ],
              "slots": {
                "identity": {
                  "exact": "피해자 위치",
                  "neutral": "그 위치"
                },
                "contract": {
                  "exact": "대비 계약",
                  "neutral": "다른 선택지"
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
            "제가 순수한 피해자라고만 말해 온 건 과했습니다.",
            "다만 약속 파기의 피해 자체는 실제였고, 저는 그걸 버틸 근거로 삼았습니다."
          ],
          "privateKnowledge": [
            "캡처와 1:1 문구를 내세우며 다른 계약 사실을 뒤로 밀어 둔 건 계산된 선택이었습니다."
          ],
          "suppressions": [
            "피해 서사로 다른 계약의 의미를 가린 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-3:counter:0",
              "factText": "순수 피해자 서사 뒤에 다른 계약을 가려 둔 사실",
              "tags": [
                "counter",
                "identity",
                "context"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:b:d-3:quote:0",
              "factText": "캡처와 1:1 문구를 앞세워 책임 비율을 줄여 보인 태도",
              "tags": [
                "quote",
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "doc": {
                  "exact": "캡처와 1:1 문구",
                  "neutral": "그 기록"
                },
                "time": {
                  "exact": "심문 초반",
                  "neutral": "초반",
                  "period": "초기 진술"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "전환 무산 전에 다른 회사 계약이 있었다는 점은 맞습니다.",
            "다만 그 계약을 들고 가게 만든 시작점은 반복된 약속과 지연이었습니다."
          ],
          "privateKnowledge": [
            "제 진술이 완전 무과실로 들리게 설계됐다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "가용시간 충돌 가능성을 알면서도 계속 순수 피해자라는 말로 밀어붙인 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-3:timeline:0",
              "factText": "전환 무산 전부터 숨긴 계약과 충돌 가능성을 알고 있던 사실",
              "tags": [
                "timeline",
                "context",
                "responsibility"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
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
              "id": "workplace-10:b:d-3:counter:1",
              "factText": "반복 약속이 제 선택의 출발점이었다며 상대 책임도 함께 묶는 태도",
              "tags": [
                "counter",
                "relationship",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                },
                "phrase": {
                  "exact": "반복된 전환 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "약속 파기의 피해가 사실이어도, 제 자격과 신뢰도 역시 흔들리고 있었다는 걸 압니다.",
            "그래서 더더욱 순수한 피해자라는 말에 매달렸습니다."
          ],
          "privateKnowledge": [
            "저를 완전히 피해자로만 보지 않을까 봐 두려웠습니다."
          ],
          "suppressions": [
            "피해 표현에 제 책임을 의도적으로 덜 섞은 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-3:threshold:0",
              "factText": "피해와 자기 책임이 동시에 존재한다는 경계 인식",
              "tags": [
                "threshold",
                "emotion",
                "identity"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
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
              "id": "workplace-10:b:d-3:fear:0",
              "factText": "피해자 위치를 잃을까 두려워 진술을 단순화한 감정",
              "tags": [
                "fear",
                "shame",
                "emotion"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자 위치",
                  "neutral": "그 위치"
                },
                "emotion": {
                  "exact": "자격 박탈 불안",
                  "neutral": "그 두려움"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "약속 파기의 피해는 있었지만, 제가 무과실 피해자라고만 말한 건 틀렸습니다.",
            "숨긴 계약과 disclosure 누락을 빼고 말한 건 제 잘못입니다."
          ],
          "privateKnowledge": [
            "피해와 책임을 분리하지 않고 한쪽만 내세운 진술이었습니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-3:admission:0",
              "factText": "무과실 피해자라고만 말한 진술이 불완전했다는 인정",
              "tags": [
                "admission",
                "identity",
                "responsibility"
              ],
              "slots": {
                "identity": {
                  "exact": "순수한 피해자",
                  "neutral": "피해자 서사"
                },
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "time": {
                  "exact": "전환 무산 직전",
                  "neutral": "그 직전",
                  "period": "발표 전"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-3:responsibility:0",
              "factText": "숨긴 계약 때문에 제 신뢰도와 적격성도 흔들렸다는 사실",
              "tags": [
                "responsibility",
                "harm",
                "threshold"
              ],
              "slots": {
                "contract": {
                  "exact": "숨긴 타사 계약",
                  "neutral": "숨긴 계약"
                },
                "status": {
                  "exact": "적격성과 신뢰도 흔들림",
                  "neutral": "평가 손상"
                }
              },
              "stanceHints": [
                "confession",
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
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "저는 약속을 확인하며 버틴 것이지, 숨긴 사실 위에서 관계를 굴린 건 아닙니다."
          ],
          "privateKnowledge": [
            "다른 계약을 말하면 전환 가능성이 완전히 닫힐까 봐 관계를 두 겹으로 유지했습니다."
          ],
          "suppressions": [
            "보험처럼 잡아 둔 계약과 전환 확인을 동시에 이어 간 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-5:denial:0",
              "factText": "숨긴 계약이 관계 유지의 일부였다는 점을 부정하는 주장",
              "tags": [
                "denial",
                "relationship",
                "privacy"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-5:fear:0",
              "factText": "다른 계약 공개가 전환 가능성을 닫을까 두려워한 감정",
              "tags": [
                "fear",
                "motive",
                "relationship"
              ],
              "slots": {
                "contract": {
                  "exact": "보험성 타사 계약",
                  "neutral": "그 계약"
                },
                "emotion": {
                  "exact": "전환 가능성 상실 우려",
                  "neutral": "그 두려움"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "저는 전환 약속이 정리되면 다른 계약도 정리할 수 있다고 봤습니다.",
            "그래서 disclosure 시점을 늦춘 것이지, 관계 자체를 이용하려던 건 아닙니다."
          ],
          "privateKnowledge": [
            "이미 반복 지연을 겪어 온 탓에 말보다 대비 계약을 더 오래 붙들었습니다."
          ],
          "suppressions": [
            "계속 확인하면서도 공개는 뒤로 미룬 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-5:uncertainty:0",
              "factText": "전환이 곧 정리될 거라는 기대를 근거로 disclosure를 미룬 사실",
              "tags": [
                "uncertainty",
                "relationship",
                "context"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
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
              "id": "workplace-10:b:d-5:legacy_sentence:0",
              "factText": "반복 지연 경험이 보험성 계약을 놓지 못하게 만든 배경",
              "tags": [
                "legacy_sentence",
                "timeline",
                "fear"
              ],
              "slots": {
                "phrase": {
                  "exact": "다음 사이클이면 정리된다",
                  "neutral": "그 약속"
                },
                "time": {
                  "exact": "이전 두 차례 연장부터",
                  "neutral": "그전부터",
                  "period": "누적 기간"
                }
              },
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "제가 보험처럼 잡아 둔 계약을 숨긴 채 버틴 건 맞습니다.",
            "다만 반복된 약속 때문에 곧 정리될 거라고 본 겁니다."
          ],
          "privateKnowledge": [
            "일정표와 1:1 문구를 동시에 보며 두 경로를 모두 유지했습니다."
          ],
          "suppressions": [
            "전환 일정 확인과 타사 준비를 병행한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-5:privacy:0",
              "factText": "보험성 계약을 숨긴 채 관계를 유지한 사실",
              "tags": [
                "privacy",
                "relationship",
                "act"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:b:d-5:timeline:0",
              "factText": "전환 일정 확인과 다른 회사 준비가 같은 시기에 병행된 흐름",
              "tags": [
                "timeline",
                "counter",
                "context"
              ],
              "slots": {
                "doc": {
                  "exact": "일정표와 1:1 문구",
                  "neutral": "그 기록"
                },
                "time": {
                  "exact": "같은 시기",
                  "neutral": "동일 시점",
                  "period": "발표 전후"
                }
              },
              "stanceHints": [
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
            "제가 정보를 다 열지 않은 건 맞습니다.",
            "다만 도현 씨도 구두 약속으로 기대를 붙잡아 두면서 이 관계를 계속 굴렸습니다."
          ],
          "privateKnowledge": [
            "말하지 않은 제 책임과, 붙잡아 둔 상대 책임이 동시에 있다는 식으로 정리하고 싶었습니다."
          ],
          "suppressions": [
            "불완전한 정보 구조를 알면서도 둘 다 유지한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-5:counter:0",
              "factText": "구두 약속과 숨긴 계약이 함께 관계를 연명시킨 구조",
              "tags": [
                "counter",
                "relationship",
                "context"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-5:responsibility:0",
              "factText": "공유 누락이 관계 왜곡의 한 축이었다는 사실",
              "tags": [
                "responsibility",
                "privacy",
                "relationship"
              ],
              "slots": {
                "contract": {
                  "exact": "숨긴 보험성 계약",
                  "neutral": "숨긴 계약"
                },
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "저는 약속이 또 미뤄질까 두려워 disclosure를 계속 뒤로 미뤘습니다.",
            "그게 결국 관계를 연명시키는 방식이 됐다는 것도 알고 있습니다."
          ],
          "privateKnowledge": [
            "떠밀려 버티는 척했지만, 저 역시 그 구조를 이용했습니다."
          ],
          "suppressions": [
            "생계 불안을 이유로 관계 연명을 합리화한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-5:fear:1",
              "factText": "재차 지연이 두려워 disclosure를 미룬 감정",
              "tags": [
                "fear",
                "emotion",
                "relationship"
              ],
              "slots": {
                "emotion": {
                  "exact": "재차 지연 우려",
                  "neutral": "그 두려움"
                },
                "time": {
                  "exact": "반복 약속 시기마다",
                  "neutral": "그때마다",
                  "period": "여러 차례"
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
              "id": "workplace-10:b:d-5:self_justification:0",
              "factText": "생계 불안을 이유로 관계 연명을 정당화한 태도",
              "tags": [
                "self_justification",
                "motive",
                "relationship"
              ],
              "slots": {
                "emotion": {
                  "exact": "생계 불안",
                  "neutral": "그 불안"
                },
                "relation": {
                  "exact": "관계 연명",
                  "neutral": "그 유지"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "제가 불완전한 정보 위에서 관계를 이어 왔습니다.",
            "생계용 대비 계약을 숨긴 채 전환 약속만 확인한 건 제 잘못이고 제 책임입니다."
          ],
          "privateKnowledge": [
            "구두 약속을 탓하기 전에 제가 숨긴 부분도 같이 봐야 한다는 걸 압니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:survival_relabel",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-5:admission:0",
              "factText": "숨긴 보험성 계약 위에서 관계를 이어 온 사실",
              "tags": [
                "admission",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "promise": {
                  "exact": "문서화되지 않은 전환 약속",
                  "neutral": "구두 약속"
                },
                "time": {
                  "exact": "반복 지연 기간",
                  "neutral": "그 기간",
                  "period": "지난 여러 사이클"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-5:privacy:1",
              "factText": "전환 약속 확인과 disclosure 누락을 함께 끌고 간 책임",
              "tags": [
                "privacy",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "contract": {
                  "exact": "생계용 대비 계약",
                  "neutral": "숨긴 계약"
                },
                "doc": {
                  "exact": "1:1 문구와 일정표",
                  "neutral": "그 기록"
                }
              },
              "stanceHints": [
                "confession",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            }
          ]
        }
      },
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "도현 씨는 출시만 넘기면 전환안을 올리겠다고 여러 차례 말했습니다."
          ],
          "privateKnowledge": [
            "문서가 완전히 확정 표현은 아니라는 불안이 있었지만 믿고 싶었습니다."
          ],
          "suppressions": [
            "약속을 확정처럼 받아들이며 스스로도 선택지를 관리한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-1:quote:0",
              "factText": "도현 씨는 출시만 넘기면 전환안을 올리겠다고 여러 차례 말했습니다.",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
                "fact"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-1:uncertainty:0",
              "factText": "문서가 완전히 확정 표현은 아니라는 불안이 있었지만 믿고 싶었습니다.",
              "tags": [
                "uncertainty",
                "relationship",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "assert",
                "withhold"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다."
          ],
          "privateKnowledge": [
            "저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다."
          ],
          "suppressions": [
            "약속을 확정처럼 받아들이며 스스로도 선택지를 관리한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-1:evidence:0",
              "factText": "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다.",
              "tags": [
                "evidence",
                "timeline",
                "context"
              ],
              "slots": {
                "task": {
                  "exact": "야간 인수인계와 신규 인력 교육",
                  "neutral": "추가 핵심 업무"
                },
                "time": {
                  "exact": "약속 직후",
                  "neutral": "그 직후",
                  "period": "런칭 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "assert",
                "evidence"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:b:d-1:quote:1",
              "factText": "저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다.",
              "tags": [
                "quote",
                "emotion",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "assert",
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
            "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다.",
            "다만 저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다."
          ],
          "privateKnowledge": [
            "저 역시 그 시기 판단이 완전히 정리돼 있지 않았습니다."
          ],
          "suppressions": [
            "약속을 확정처럼 받아들이며 스스로도 선택지를 관리한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-1:context:0",
              "factText": "핵심 사실은 유지하되 자신의 맹점을 일부 인정하는 진술",
              "tags": [
                "context",
                "threshold",
                "emotion"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
                "balanced"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-1:context:1",
              "factText": "저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다.",
              "tags": [
                "context",
                "relationship",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "partial"
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
            "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다.",
            "제가 불안을 안고 버틴 부분이 있어도, 약속을 반복하고 막판에 바꾼 책임은 도현 씨에게 있습니다."
          ],
          "privateKnowledge": [
            "상대 책임을 강조하면서도 제 설명에도 빈틈이 있었다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-1:responsibility:0",
              "factText": "제가 불안을 안고 버틴 부분이 있어도, 약속을 반복하고 막판에 바꾼 책임은 도현 씨에게 있습니다.",
              "tags": [
                "responsibility",
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "blame",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-10:b:d-1:evidence:1",
              "factText": "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다.",
              "tags": [
                "evidence",
                "context",
                "timeline"
              ],
              "slots": {
                "task": {
                  "exact": "야간 인수인계와 신규 인력 교육",
                  "neutral": "추가 핵심 업무"
                },
                "time": {
                  "exact": "약속 직후",
                  "neutral": "그 직후",
                  "period": "런칭 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "blame",
                "evidence"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다.",
            "야간 인수인계와 신규 교육까지 맡으며 생활 계획이 그 약속에 걸렸습니다."
          ],
          "privateKnowledge": [
            "핵심 사실을 증명하는 것만큼, 그때 받은 충격과 불안도 큽니다."
          ],
          "suppressions": [
            "저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-1:harm:0",
              "factText": "야간 인수인계와 신규 교육까지 맡으며 생활 계획이 그 약속에 걸렸습니다.",
              "tags": [
                "harm",
                "emotion",
                "relationship"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "assert"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-1:fear:0",
              "factText": "그 시기 받은 충격과 불안을 설명하는 진술",
              "tags": [
                "fear",
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "1:1 문구와 메신저, 그리고 이전 연장 메일까지 보면 그 말은 단발성 격려가 아니라 반복된 약속이었습니다.",
            "동시에 저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다."
          ],
          "privateKnowledge": [
            "핵심 사실과 제 맹점을 함께 말해야 전체 구조가 보인다고 생각합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-1:threshold:0",
              "factText": "핵심 사실을 유지하면서 자신의 맹점도 함께 올려놓는 정리",
              "tags": [
                "threshold",
                "admission",
                "context"
              ],
              "slots": {
                "phrase": {
                  "exact": "이번 런칭 끝나면 전환안 올릴게",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "런칭 종료 직후",
                  "neutral": "그 시점",
                  "period": "출시 막판"
                },
                "person": {
                  "exact": "장혜린",
                  "neutral": "상대방",
                  "fullName": "장혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "balanced",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-1:responsibility:1",
              "factText": "저도 그 말을 사실상 확정으로 받아들이며 다른 선택지를 조용히 준비했습니다.",
              "tags": [
                "responsibility",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "balanced",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
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
            "도현 씨는 헤드카운트와 예산을 이유로 말했지만, 실제로는 본인 코멘트가 먼저 들어간 상태였습니다."
          ],
          "privateKnowledge": [
            "단순 보류가 아니라는 느낌은 있었지만 계속 믿고 버텼습니다."
          ],
          "suppressions": [
            "제가 보류 화면에만 매달렸던 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-4:institution:0",
              "factText": "도현 씨는 헤드카운트와 예산을 이유로 말했지만, 실제로는 본인 코멘트가 먼저 들어간 상태였습니다.",
              "tags": [
                "institution",
                "context"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "assert",
                "fact"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-4:uncertainty:0",
              "factText": "단순 보류가 아니라는 느낌은 있었지만 계속 믿고 버텼습니다.",
              "tags": [
                "uncertainty",
                "relationship",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "assert",
                "withhold"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다."
          ],
          "privateKnowledge": [
            "저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다."
          ],
          "suppressions": [
            "제가 보류 화면에만 매달렸던 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-4:evidence:0",
              "factText": "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다.",
              "tags": [
                "evidence",
                "timeline",
                "context"
              ],
              "slots": {
                "institution": {
                  "exact": "HR 전환 리뷰 트래커",
                  "neutral": "HR 기록"
                },
                "memo": {
                  "exact": "commitment concern 메모",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "최종 결정보다 이전",
                  "neutral": "그 이전",
                  "period": "검토 단계"
                }
              },
              "stanceHints": [
                "assert",
                "evidence"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-10:b:d-4:quote:0",
              "factText": "저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다.",
              "tags": [
                "quote",
                "emotion",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "assert",
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
            "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다.",
            "다만 저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다."
          ],
          "privateKnowledge": [
            "저 역시 그 시기 판단이 완전히 정리돼 있지 않았습니다."
          ],
          "suppressions": [
            "제가 보류 화면에만 매달렸던 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-4:context:0",
              "factText": "핵심 사실은 유지하되 자신의 맹점을 일부 인정하는 진술",
              "tags": [
                "context",
                "threshold",
                "emotion"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "partial",
                "balanced"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-4:context:1",
              "factText": "저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다.",
              "tags": [
                "context",
                "relationship",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "partial"
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
            "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다.",
            "제가 낙관한 부분이 있어도, 판단 개입을 숨기고 예산 탓만 한 책임은 도현 씨 쪽에 있습니다."
          ],
          "privateKnowledge": [
            "상대 책임을 강조하면서도 제 설명에도 빈틈이 있었다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-4:responsibility:0",
              "factText": "제가 낙관한 부분이 있어도, 판단 개입을 숨기고 예산 탓만 한 책임은 도현 씨 쪽에 있습니다.",
              "tags": [
                "responsibility",
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "blame",
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-10:b:d-4:evidence:1",
              "factText": "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다.",
              "tags": [
                "evidence",
                "context",
                "timeline"
              ],
              "slots": {
                "institution": {
                  "exact": "HR 전환 리뷰 트래커",
                  "neutral": "HR 기록"
                },
                "memo": {
                  "exact": "commitment concern 메모",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "최종 결정보다 이전",
                  "neutral": "그 이전",
                  "period": "검토 단계"
                }
              },
              "stanceHints": [
                "blame",
                "evidence"
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
            "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다.",
            "전환 심사 기준과 제 평가 전망이 동시에 왜곡됐습니다."
          ],
          "privateKnowledge": [
            "핵심 사실을 증명하는 것만큼, 그때 받은 충격과 불안도 큽니다."
          ],
          "suppressions": [
            "저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-4:harm:0",
              "factText": "전환 심사 기준과 제 평가 전망이 동시에 왜곡됐습니다.",
              "tags": [
                "harm",
                "emotion",
                "relationship"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "emotional",
                "assert"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-10:b:d-4:fear:0",
              "factText": "그 시기 받은 충격과 불안을 설명하는 진술",
              "tags": [
                "fear",
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "잘린 보류 캡처와 HR 원본 이력을 함께 보면 예산 핑계만으로는 설명되지 않습니다.",
            "동시에 저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다."
          ],
          "privateKnowledge": [
            "핵심 사실과 제 맹점을 함께 말해야 전체 구조가 보인다고 생각합니다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-10:b:tell:promise_quote_stack",
            "workplace-10:b:tell:calendar_tap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-10:b:d-4:threshold:0",
              "factText": "핵심 사실을 유지하면서 자신의 맹점도 함께 올려놓는 정리",
              "tags": [
                "threshold",
                "admission",
                "context"
              ],
              "slots": {
                "screen": {
                  "exact": "헤드카운트 보류 화면",
                  "neutral": "그 화면"
                },
                "status": {
                  "exact": "추가요청 가능",
                  "neutral": "다른 가능 상태"
                },
                "memo": {
                  "exact": "commitment concern",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "balanced",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-10:b:d-4:responsibility:1",
              "factText": "저도 그 화면 하나에 기대어 버티며 상황을 낙관했습니다.",
              "tags": [
                "responsibility",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "임도현",
                  "neutral": "상대방",
                  "fullName": "임도현",
                  "judgeRef": "도현 씨"
                }
              },
              "stanceHints": [
                "balanced",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        }
      }
    }
  }
}


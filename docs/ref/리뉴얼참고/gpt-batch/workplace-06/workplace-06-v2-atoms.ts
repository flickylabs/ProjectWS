export const workplace06V2Atoms = {
  "caseId": "workplace-06",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "그날은 시스템이 다 흔들려서 우선순위만 정리했을 뿐입니다.",
            "제가 이서린 씨 계정을 대거 재배정하거나 기준을 바꾼 건 아닙니다."
          ],
          "privateKnowledge": [
            "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
            "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실"
          ],
          "suppressions": [
            "조치의 실제 범위",
            "공동 승인 누락 순서"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-1:act:0",
              "factText": "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
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
              "id": "workplace-06:a:d-1:context:0",
              "factText": "통합 첫 2주에 통합 큐와 전체 KPI가 크게 흔들려 운영 압박이 컸다는 사실",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "몇 건을 잠깐 돌린 건 있어도 임시로 멈추지 않게 하려던 겁니다.",
            "대시보드 기준을 손봤다는 표현은 과합니다."
          ],
          "privateKnowledge": [
            "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
            "통합 첫 2주에 통합 큐와 전체 KPI가 크게 흔들려 운영 압박이 컸다는 사실",
            "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실"
          ],
          "suppressions": [
            "조치가 '임시'를 넘었던 사실",
            "PM 기록을 늦춘 이유"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:temporary_language",
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-1:self_justification:0",
              "factText": "통합 첫 2주에 통합 큐와 전체 KPI가 크게 흔들려 운영 압박이 컸다는 상황",
              "tags": [
                "self_justification",
                "motive"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-06:a:d-1:rule:0",
              "factText": "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "제가 계정을 재배정한 건 맞습니다.",
            "다만 통합 첫 2주라 멈추지 않게 하려다 보니 PM 기록을 바로 남기지 못했습니다."
          ],
          "privateKnowledge": [
            "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
            "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실",
            "통합 첫 2주에 통합 큐와 전체 KPI가 크게 흔들려 운영 압박이 컸다는 사실"
          ],
          "suppressions": [
            "대시보드·규칙·계정을 함께 건드린 범위",
            "상대에게 먼저 공유하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:temporary_language",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-1:admission:0",
              "factText": "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
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
              "id": "workplace-06:a:d-1:responsibility:0",
              "factText": "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "partial",
                "hedge"
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
            "재배정과 기준 조정을 제가 먼저 한 건 맞습니다.",
            "그래도 이서린 씨 쪽도 현장 정보를 자기 쪽에 묶어 두고 있어서 단독 대응처럼 보이게 됐습니다."
          ],
          "privateKnowledge": [
            "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
            "이서린이 당시 고객 상태와 레거시 설정을 계속 관리하고 있었다는 사실",
            "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실"
          ],
          "suppressions": [
            "자기 조치가 먼저였다는 순서",
            "상대 책임으로 상쇄하려는 계산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:order_skip",
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-1:counter:0",
              "factText": "이서린이 당시 고객 상태와 레거시 설정을 계속 관리하고 있었다는 사실",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-06:a:d-1:responsibility:1",
              "factText": "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame"
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
            "통합 첫 주에 고객 지연과 전체 KPI가 한꺼번에 올라와서 팀장인 제가 숫자부터 막아야 한다는 압박이 컸습니다.",
            "그래서 선을 넘었습니다."
          ],
          "privateKnowledge": [
            "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
            "통합 첫 2주에 통합 큐와 전체 KPI가 크게 흔들려 운영 압박이 컸다는 사실",
            "박준호가 통합 리더십을 잃은 관리자로 보일까 두려워했다는 사실"
          ],
          "suppressions": [
            "체면과 평가 불안",
            "공식 절차를 두려움보다 뒤로 미룬 이유"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-1:emotion:0",
              "factText": "박준호가 통합 리더십을 잃은 관리자로 보일까 두려워했다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
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
              "id": "workplace-06:a:d-1:shame:0",
              "factText": "서린 팀의 업무영역과 기준이 한꺼번에 흔들렸다는 결과",
              "tags": [
                "shame",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "제가 공식 인수인계 전 고객 계정을 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했습니다.",
            "공동 승인 절차를 무시한 제 잘못입니다."
          ],
          "privateKnowledge": [
            "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
            "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실",
            "박준호가 통합 리더십을 잃은 관리자로 보일까 두려워했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-1:admission:1",
              "factText": "박준호가 공식 인수인계 전 고객 계정을 대거 재배정하고 헬스 점수 대시보드 기준까지 직접 수정했다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-1:responsibility:2",
              "factText": "계정 오너 변경과 기준 수정은 공동 승인 후 권하늘 PM에게 기록해야 했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "새벽에 규칙이 바뀐 건 나중에 알았습니다.",
            "레거시 관리자 권한이 아직 남아 있는 줄도 몰랐습니다."
          ],
          "privateKnowledge": [
            "통합 후에도 삭제돼야 할 관리자 그룹이 남아 있었다는 사실"
          ],
          "suppressions": [
            "권한 회수 관리 책임"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-2:uncertainty:0",
              "factText": "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
                }
              },
              "stanceHints": [
                "uncertain"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-2:context:0",
              "factText": "통합 후에도 삭제돼야 할 관리자 그룹이 남아 있었다는 사실",
              "tags": [
                "context",
                "legacy_sentence"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                }
              },
              "stanceHints": [
                "uncertain",
                "hedge"
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
            "처음엔 이서린 씨가 복구 차원에서 만진 줄 알았습니다.",
            "라우팅 규칙과 벤더 태그까지 바꾼 건 그때는 분명하지 않았습니다."
          ],
          "privateKnowledge": [
            "통합 후에도 삭제돼야 할 관리자 그룹이 남아 있었다는 사실",
            "이서린이 고객 지연을 막으려는 명분으로 새벽 시간대에 조치를 했다는 사실"
          ],
          "suppressions": [
            "문제 징후를 보고도 바로 확인하지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-2:quote:0",
              "factText": "이서린이 고객 지연을 막으려는 명분으로 새벽 시간대에 조치를 했다는 사실",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
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
              "id": "workplace-06:a:d-2:rule:0",
              "factText": "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "감사 로그를 보면 이서린 씨 계정에서 레거시 관리자 권한으로 규칙이 바뀐 건 맞습니다.",
            "제가 권한 회수를 미리 챙기지 못했습니다."
          ],
          "privateKnowledge": [
            "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
            "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실"
          ],
          "suppressions": [
            "팀장으로서 권한 회수를 놓친 책임"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-2:evidence:0",
              "factText": "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
              "tags": [
                "evidence",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-06:a:d-2:responsibility:0",
              "factText": "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실",
              "tags": [
                "responsibility",
                "institution"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "admit"
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
            "이서린 씨가 타팀 큐를 건드린 건 분명하지만, 숨은 권한이 남아 있던 구조를 관리한 책임은 저에게도 있습니다."
          ],
          "privateKnowledge": [
            "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
            "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실",
            "타팀 큐가 승인 없이 바뀌며 월권 판단이 더 어려워졌다는 결과"
          ],
          "suppressions": [
            "자기 관리 소홀"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-2:responsibility:1",
              "factText": "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "partial",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-2:institution:0",
              "factText": "통합 후에도 삭제돼야 할 관리자 그룹이 남아 있었다는 사실",
              "tags": [
                "institution",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                }
              },
              "stanceHints": [
                "contextualize"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "통합 준비를 제대로 못해서 남아 있던 권한을 못 걷어낸 점이 불안합니다.",
            "그 빈틈이 월권의 빌미가 됐습니다."
          ],
          "privateKnowledge": [
            "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
            "박준호가 통합 준비 미흡을 드러낼까 불안해한다는 사실",
            "타팀 큐가 승인 없이 바뀌며 월권 판단이 더 어려워졌다는 결과"
          ],
          "suppressions": [
            "준비 미흡 불안"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-2:emotion:0",
              "factText": "박준호가 통합 준비 미흡을 드러낼까 불안해한다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
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
              "id": "workplace-06:a:d-2:harm:0",
              "factText": "타팀 큐가 승인 없이 바뀌며 월권 판단이 더 어려워졌다는 결과",
              "tags": [
                "harm",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "이서린 씨가 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정한 건 사실입니다.",
            "그리고 그 권한을 남겨 둔 관리 책임을 제가 가볍게 볼 수 없습니다."
          ],
          "privateKnowledge": [
            "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
            "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실",
            "박준호가 통합 준비 미흡을 드러낼까 불안해한다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-2:act:0",
              "factText": "이서린 계정에 남아 있던 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그가 수정됐다는 사실",
              "tags": [
                "act",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-2:admission:0",
              "factText": "숨은 권한 회수와 예외 승인 관리가 팀장 책임 범위에 포함됐다는 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "admit"
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
            "저는 팀즈 공지의 안정화 문구를 보고 제가 먼저 큐를 챙기라는 뜻으로 이해했습니다.",
            "단독 통제권까지 준다고 단정한 건 아닙니다."
          ],
          "privateKnowledge": [
            "잘린 공지 캡처가 안정화 문구만 남겨 오해를 키웠다는 사실"
          ],
          "suppressions": [
            "잘린 캡처에 기대어 해석한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-3:quote:0",
              "factText": "잘린 공지 캡처가 안정화 문구만 남겨 오해를 키웠다는 사실",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:a:d-3:uncertainty:0",
              "factText": "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
              "tags": [
                "uncertainty",
                "rule"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
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
            "공지 문구가 모호했고, 그때는 공동 승인 조건보다 안정화 책임이 먼저 보였습니다."
          ],
          "privateKnowledge": [
            "잘린 공지 캡처가 안정화 문구만 남겨 오해를 키웠다는 사실",
            "RACI와 해설 메모에 공동 승인과 PM 기록이 명시돼 있었다는 사실"
          ],
          "suppressions": [
            "공동 승인 문구를 뒷순위로 본 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-3:context:0",
              "factText": "잘린 공지 캡처가 안정화 문구만 남겨 오해를 키웠다는 사실",
              "tags": [
                "context",
                "legacy_sentence"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:a:d-3:rule:0",
              "factText": "RACI와 해설 메모에 공동 승인과 PM 기록이 명시돼 있었다는 사실",
              "tags": [
                "rule",
                "institution"
              ],
              "slots": {
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "공지 전체를 보면 제 단독 권한은 아니었습니다.",
            "다만 제가 그렇게 말한 듯 들리게 운영 쪽 표현을 강하게 쓴 건 있습니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "RACI와 해설 메모에 공동 승인과 PM 기록이 명시돼 있었다는 사실"
          ],
          "suppressions": [
            "단독 권한처럼 들리게 말한 부분"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-3:admission:0",
              "factText": "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
              "tags": [
                "admission",
                "rule"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
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
              "id": "workplace-06:a:d-3:responsibility:0",
              "factText": "박준호가 현장에서 안정화 책임을 반복해서 강조해 오해를 키운 사실",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
            "공동 승인과 PM 기록이 원칙이었다는 건 인정합니다.",
            "그래도 현장에서는 제가 수치 안정화를 맡는다고 반복해서 말해 오해를 키웠습니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "RACI와 해설 메모에 공동 승인과 PM 기록이 명시돼 있었다는 사실",
            "박준호가 현장에서 안정화 책임을 반복해서 강조해 오해를 키운 사실"
          ],
          "suppressions": [
            "현장에서 권한을 과장한 태도"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-3:responsibility:1",
              "factText": "RACI와 해설 메모에 공동 승인과 PM 기록이 명시돼 있었다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                }
              },
              "stanceHints": [
                "blame",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-3:counter:0",
              "factText": "박준호가 현장에서 안정화 책임을 반복해서 강조해 오해를 키운 사실",
              "tags": [
                "counter",
                "quote"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
            "통합 리더십을 잃어 보일까 봐 모호한 문구를 제 쪽 책임 범위로 끌어당기고 싶었습니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "박준호가 통합 리더십을 잃어 보일까 두려워했다는 사실"
          ],
          "suppressions": [
            "리더십 불안"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-3:fear:0",
              "factText": "박준호가 통합 리더십을 잃어 보일까 두려워했다는 사실",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:a:d-3:harm:0",
              "factText": "모호한 공지 해석이 월권을 정당화하는 근거처럼 쓰였다는 결과",
              "tags": [
                "harm",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "그 공지는 누구에게도 단독 통제권을 주지 않았고, 공동 승인과 PM 기록이 전제였습니다.",
            "제가 단독으로 해석될 말을 한 부분은 제 책임입니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "RACI와 해설 메모에 공동 승인과 PM 기록이 명시돼 있었다는 사실",
            "박준호가 현장에서 안정화 책임을 반복해서 강조해 오해를 키운 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-3:admission:1",
              "factText": "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
              "tags": [
                "admission",
                "rule"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-3:responsibility:2",
              "factText": "박준호가 현장에서 안정화 책임을 반복해서 강조해 오해를 키운 사실",
              "tags": [
                "responsibility",
                "quote"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
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
            "캘리브레이션에 최종 평가를 넣은 적은 없습니다.",
            "경계 위반 같은 낙인을 먼저 찍은 것도 아닙니다."
          ],
          "privateKnowledge": [
            "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
            "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실"
          ],
          "suppressions": [
            "초기 입력 시점",
            "평가 초안의 표현 강도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-4:identity:0",
              "factText": "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
              "tags": [
                "identity",
                "denial"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:a:d-4:context:0",
              "factText": "통합 직후 리더십 평가 압박이 강했다는 사실",
              "tags": [
                "context",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
            "초안 메모에 우려를 적어 둔 건 있어도 공식 평가로 돌린 건 아닙니다.",
            "통합 혼선 메모 수준이었습니다."
          ],
          "privateKnowledge": [
            "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
            "통합 직후 리더십 평가 압박이 강했다는 사실",
            "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실"
          ],
          "suppressions": [
            "초안 메모가 낙인으로 읽힐 수 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-4:self_justification:0",
              "factText": "통합 직후 리더십 평가 압박이 강했다는 상황",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-06:a:d-4:rule:0",
              "factText": "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
            "제가 초안에 이서린 씨 관련 코멘트를 먼저 남긴 건 맞습니다.",
            "다만 사실 확인 전 경향을 단정하려던 의도까지는 아니었습니다."
          ],
          "privateKnowledge": [
            "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
            "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실"
          ],
          "suppressions": [
            "사실 확인 전에 먼저 적은 순서"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:temporary_language",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-4:admission:0",
              "factText": "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:a:d-4:responsibility:0",
              "factText": "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
            "메모를 먼저 남긴 건 맞지만, 이서린 씨 쪽도 여러 번 선을 넘는 듯한 조치를 보여서 관리 메모가 필요하다고 봤습니다."
          ],
          "privateKnowledge": [
            "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
            "지난 분기 야간 라우팅 수정 기억이 준호의 경계 불안을 키웠다는 사실",
            "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실"
          ],
          "suppressions": [
            "과거 불안을 현재 낙인 근거로 쓴 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-4:counter:0",
              "factText": "지난 분기 야간 라우팅 수정 기억이 준호의 경계 불안을 키웠다는 사실",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-06:a:d-4:rule:1",
              "factText": "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "blame"
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
            "새 팀 리더십 평가가 바로 붙는 상황이라 제가 통제력을 잃었다는 말을 들을까 두려웠습니다.",
            "그 불안 때문에 사람을 먼저 규정했습니다."
          ],
          "privateKnowledge": [
            "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
            "박준호가 통제력을 잃은 팀장으로 보일까 두려워했다는 사실",
            "이서린의 통합 초기 평판이 사실확인 전부터 굳어졌다는 결과"
          ],
          "suppressions": [
            "리더십 평가 두려움"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-4:fear:0",
              "factText": "박준호가 통제력을 잃은 팀장으로 보일까 두려워했다는 사실",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:a:d-4:shame:0",
              "factText": "이서린의 통합 초기 평판이 사실확인 전부터 굳어졌다는 결과",
              "tags": [
                "shame",
                "harm"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "제가 역할 경계가 정리되기 전에 HR 초안에 이서린 씨를 'boundary-blind'처럼 읽히는 코멘트로 먼저 낙인찍었습니다.",
            "제 잘못이고, 평가에 섞었으면 안 됐습니다."
          ],
          "privateKnowledge": [
            "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
            "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실",
            "박준호가 통제력을 잃은 팀장으로 보일까 두려워했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-4:admission:1",
              "factText": "박준호가 역할 경계가 정리되기 전 HR 캘리브레이션 초안에 이서린을 경계 위반 성향처럼 적어 넣었다는 사실",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-4:responsibility:1",
              "factText": "사실확인 전 비공식 평가 메모가 평판에 선행 낙인으로 작동할 수 있다는 사실",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
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
            "고객 지연 신호 뒤에 제가 독단적으로 핫픽스를 한 건 아닙니다.",
            "운영 흐름만 보고 있었지 절차를 무시한 건 아닙니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실"
          ],
          "suppressions": [
            "조치의 실제 범위",
            "공동 승인 누락 순서"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-5:act:0",
              "factText": "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
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
              "id": "workplace-06:a:d-5:context:0",
              "factText": "고객 지연 경고와 KPI 압박이 동시에 올라온 상황이었다는 사실",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "몇 건을 먼저 돌려 본 건 있지만 멈추지 않게 하려던 임시 대응이었습니다.",
            "PM 핑이 늦었다고 해서 독단으로 몰아갈 정도는 아닙니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
            "고객 지연 경고와 KPI 압박이 동시에 올라온 상황이었다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실"
          ],
          "suppressions": [
            "조치가 '임시'를 넘었던 사실",
            "PM 기록을 늦춘 이유"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:a:tell:temporary_language",
            "workplace-06:a:tell:chaos_cover"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-5:self_justification:0",
              "factText": "고객 지연 경고와 KPI 압박이 동시에 올라온 상황이었다는 상황",
              "tags": [
                "self_justification",
                "motive"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-06:a:d-5:rule:0",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "제가 지연 계정을 직접 돌린 건 맞습니다.",
            "다만 통합 초기라 먼저 살리고 기록하자는 판단을 했고, 그게 절차를 비켜 간 건 인정합니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
            "고객 지연 경고와 KPI 압박이 동시에 올라온 상황이었다는 사실"
          ],
          "suppressions": [
            "대시보드·규칙·계정을 함께 건드린 범위",
            "상대에게 먼저 공유하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-5:admission:0",
              "factText": "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
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
              "id": "workplace-06:a:d-5:responsibility:0",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "partial",
                "hedge"
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
            "제가 먼저 계정을 건드리고 PM 핑을 늦춘 건 맞습니다.",
            "그래도 이서린 씨 쪽도 자동화 규칙을 손봐서 현장이 더 꼬였습니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
            "이서린도 같은 시점에 자동화 규칙을 수정했다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실"
          ],
          "suppressions": [
            "자기 조치가 먼저였다는 순서",
            "상대 책임으로 상쇄하려는 계산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:a:tell:order_skip"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-5:counter:0",
              "factText": "이서린도 같은 시점에 자동화 규칙을 수정했다는 사실",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-06:a:d-5:responsibility:1",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "고객 지연 알림이 뜨자 제가 팀장 체면보다 숫자 급락이 더 두려웠습니다.",
            "그래서 절차보다 핫픽스를 앞세웠습니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
            "고객 지연 경고와 KPI 압박이 동시에 올라온 상황이었다는 사실",
            "박준호가 숫자 급락과 리더십 평가를 함께 두려워했다는 사실"
          ],
          "suppressions": [
            "체면과 평가 불안",
            "공식 절차를 두려움보다 뒤로 미룬 이유"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:chaos_cover",
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-5:emotion:0",
              "factText": "박준호가 숫자 급락과 리더십 평가를 함께 두려워했다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
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
              "id": "workplace-06:a:d-5:shame:0",
              "factText": "독단적 조치가 겹치며 통합 큐가 더 꼬였다는 결과",
              "tags": [
                "shame",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "고객 지연 신호 뒤에 제가 계정을 직접 돌리고 에스컬레이션도 늦췄습니다.",
            "공동운영 원칙을 어긴 제 책임입니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
            "박준호가 숫자 급락과 리더십 평가를 함께 두려워했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:a:tell:temporary_language"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:a:d-5:admission:1",
              "factText": "고객 지연 신호 뒤에 박준호가 계정을 직접 돌리고 PM 에스컬레이션을 늦췄다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "이서린",
                  "neutral": "상대방",
                  "fullName": "이서린",
                  "judgeRef": "이서린 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:a:d-5:responsibility:2",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "처음엔 박준호 씨가 제 계정을 직접 건드린다는 말이 과장인 줄 알았습니다.",
            "숫자가 흔들린 건 봤어도 이유는 분명하지 않았습니다."
          ],
          "privateKnowledge": [
            "대시보드 수치와 계정 오너십이 갑자기 바뀌어 업무영역이 흔들렸다는 사실"
          ],
          "suppressions": [
            "자신의 방어적 반응"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-1:uncertainty:0",
              "factText": "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "uncertain"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-1:context:0",
              "factText": "대시보드 수치와 계정 오너십이 갑자기 바뀌어 업무영역이 흔들렸다는 사실",
              "tags": [
                "context",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "uncertain"
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
            "대시보드 기준이 달라진 건 느꼈지만, 그게 박준호 씨의 직접 수정인지 확신하지 못했습니다."
          ],
          "privateKnowledge": [
            "대시보드 수치와 계정 오너십이 갑자기 바뀌어 업무영역이 흔들렸다는 사실",
            "공동 승인 없는 재배정과 기준 수정은 허용되지 않았다는 사실"
          ],
          "suppressions": [
            "직접 수정 가능성을 이미 의심한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point",
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-1:uncertainty:1",
              "factText": "대시보드 수치와 계정 오너십이 갑자기 바뀌어 업무영역이 흔들렸다는 사실",
              "tags": [
                "uncertainty",
                "threshold"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
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
              "id": "workplace-06:b:d-1:rule:0",
              "factText": "공동 승인 없는 재배정과 기준 수정은 허용되지 않았다는 사실",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "재배정 기록과 편집 이력을 보면 박준호 씨가 제 쪽 계정과 기준을 직접 손댄 건 맞습니다."
          ],
          "privateKnowledge": [
            "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
            "재배정과 기준 수정이 고객 대응 흐름을 끊었다는 결과"
          ],
          "suppressions": [
            "그 뒤 자신의 말투가 날카로워진 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-1:evidence:0",
              "factText": "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
              "tags": [
                "evidence",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-1:harm:0",
              "factText": "재배정과 기준 수정이 고객 대응 흐름을 끊었다는 결과",
              "tags": [
                "harm",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "assert"
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
            "인수인계 전 재배정과 기준 수정은 명백히 제 영역을 넘은 겁니다.",
            "그게 이후 제 대응을 더 거칠게 만들었습니다."
          ],
          "privateKnowledge": [
            "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
            "재배정과 기준 수정이 고객 대응 흐름을 끊었다는 결과",
            "그 일 이후 이서린의 후속 대응이 더 날카로워졌다는 사실"
          ],
          "suppressions": [
            "후속 대응이 거칠어졌다는 자기 인식"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-1:responsibility:0",
              "factText": "공동 승인 없는 재배정과 기준 수정은 허용되지 않았다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-1:harm:1",
              "factText": "그 일 이후 이서린의 후속 대응이 더 날카로워졌다는 사실",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                }
              },
              "stanceHints": [
                "contextualize"
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
            "그때 제 업무영역이 한 번에 지워지는 느낌이어서 방어적으로 굴었습니다."
          ],
          "privateKnowledge": [
            "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
            "이서린이 자기 업무영역이 지워질까 불안했다는 사실",
            "재배정과 기준 수정이 고객 대응 흐름을 끊었다는 결과"
          ],
          "suppressions": [
            "영역 상실감"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-1:emotion:0",
              "factText": "이서린이 자기 업무영역이 지워질까 불안했다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
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
              "id": "workplace-06:b:d-1:harm:2",
              "factText": "재배정과 기준 수정이 고객 대응 흐름을 끊었다는 결과",
              "tags": [
                "harm",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "박준호 씨가 인수인계 전 계정을 재배정하고 대시보드 기준까지 바꾼 건 사실입니다.",
            "그 압박이 제 후속 대응을 공격적으로 만든 점도 부인하지 않겠습니다."
          ],
          "privateKnowledge": [
            "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
            "그 일 이후 이서린의 후속 대응이 더 날카로워졌다는 사실",
            "이서린이 자기 업무영역이 지워질까 불안했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-1:act:0",
              "factText": "박준호가 인수인계 전 고객 계정을 재배정하고 대시보드 기준까지 직접 수정했다는 사실",
              "tags": [
                "act",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "threshold": {
                  "exact": "헬스 점수 대시보드 기준",
                  "neutral": "그 기준"
                },
                "account": {
                  "exact": "고객 계정 오너십",
                  "neutral": "그 계정 배정"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-1:admission:0",
              "factText": "그 일 이후 이서린의 후속 대응이 더 날카로워졌다는 사실",
              "tags": [
                "admission",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                }
              },
              "stanceHints": [
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
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
            "저는 타팀 라우팅 규칙을 수정한 적 없습니다.",
            "남아 있던 권한으로 뭔가를 넓힌 것도 아닙니다."
          ],
          "privateKnowledge": [
            "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
            "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실"
          ],
          "suppressions": [
            "조치의 실제 범위",
            "공동 승인 누락 순서"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point",
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-2:act:0",
              "factText": "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
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
              "id": "workplace-06:b:d-2:context:0",
              "factText": "고객 지연을 막으려는 압박 속에서 새벽 시간대에 수정이 이뤄졌다는 사실",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "건드린 게 있다 해도 수정이 아니라 복구였습니다.",
            "고객 지연을 막기 위한 임시 조치였지 권한을 행사하려던 게 아닙니다."
          ],
          "privateKnowledge": [
            "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
            "고객 지연을 막으려는 압박 속에서 새벽 시간대에 수정이 이뤄졌다는 사실",
            "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실"
          ],
          "suppressions": [
            "조치가 '임시'를 넘었던 사실",
            "PM 기록을 늦춘 이유"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing",
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-2:self_justification:0",
              "factText": "고객 지연을 막으려는 압박 속에서 새벽 시간대에 수정이 이뤄졌다는 상황",
              "tags": [
                "self_justification",
                "motive"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-06:b:d-2:rule:0",
              "factText": "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "제 계정으로 규칙과 태그를 바꾼 건 맞습니다.",
            "다만 그건 틀어진 흐름을 막기 위한 임시 조치였고, 레거시 권한을 넓게 쓰려던 건 아닙니다."
          ],
          "privateKnowledge": [
            "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
            "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실",
            "고객 지연을 막으려는 압박 속에서 새벽 시간대에 수정이 이뤄졌다는 사실"
          ],
          "suppressions": [
            "대시보드·규칙·계정을 함께 건드린 범위",
            "상대에게 먼저 공유하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing",
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-2:admission:0",
              "factText": "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
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
              "id": "workplace-06:b:d-2:responsibility:0",
              "factText": "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "partial",
                "hedge"
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
            "제가 레거시 관리자 권한으로 손댄 건 맞지만, 박준호 씨 쪽도 통합 큐를 먼저 건드려서 현장에선 막을 방법이 없다고 느꼈습니다."
          ],
          "privateKnowledge": [
            "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
            "박준호가 이미 통합 큐와 계정 오너십을 먼저 흔들었다는 사실",
            "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실"
          ],
          "suppressions": [
            "자기 조치가 먼저였다는 순서",
            "상대 책임으로 상쇄하려는 계산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap",
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-2:counter:0",
              "factText": "박준호가 이미 통합 큐와 계정 오너십을 먼저 흔들었다는 사실",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-06:b:d-2:responsibility:1",
              "factText": "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame"
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
            "통합 뒤에도 제 영역을 못 지킨 사람처럼 보일까 봐, 남아 있던 권한을 붙잡고라도 막아야 한다고 생각했습니다."
          ],
          "privateKnowledge": [
            "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
            "고객 지연을 막으려는 압박 속에서 새벽 시간대에 수정이 이뤄졌다는 사실",
            "이서린이 자기 영역을 지키지 못한 사람으로 보일까 두려워했다는 사실"
          ],
          "suppressions": [
            "체면과 평가 불안",
            "공식 절차를 두려움보다 뒤로 미룬 이유"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap",
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-2:emotion:0",
              "factText": "이서린이 자기 영역을 지키지 못한 사람으로 보일까 두려워했다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
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
              "id": "workplace-06:b:d-2:shame:0",
              "factText": "권한 남용으로 타팀 큐 경계가 무너졌다는 결과",
              "tags": [
                "shame",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "제가 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했습니다.",
            "공식 승인 없이 타팀 큐를 건드린 제 잘못입니다."
          ],
          "privateKnowledge": [
            "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
            "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실",
            "이서린이 자기 영역을 지키지 못한 사람으로 보일까 두려워했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-2:admission:1",
              "factText": "이서린이 레거시 관리자 권한으로 라우팅 규칙과 벤더 태그를 수정했다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "legacy": {
                  "exact": "레거시 관리자 권한",
                  "neutral": "그 권한"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                },
                "tag": {
                  "exact": "벤더 태그",
                  "neutral": "그 태그"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-2:responsibility:2",
              "factText": "타팀 큐 수정은 공동 승인과 PM 기록이 필요했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
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
            "그 통합 공지는 박준호 씨만 단독으로 움직이라는 문서도, 저더러 손 떼라는 문서도 아니었습니다.",
            "저는 제 영역을 막을 임시 재량이 있다고 읽었습니다."
          ],
          "privateKnowledge": [
            "잘린 공지 캡처가 'temporary stabilization' 문구만 남겨 오해를 키웠다는 사실"
          ],
          "suppressions": [
            "공지를 자기 쪽 방패로 읽은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-3:quote:0",
              "factText": "잘린 공지 캡처가 'temporary stabilization' 문구만 남겨 오해를 키웠다는 사실",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:b:d-3:rule:0",
              "factText": "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "문구가 모호해서 'temporary stabilization'만 보고 각자 자기 영역은 먼저 막아도 된다고 이해했습니다."
          ],
          "privateKnowledge": [
            "잘린 공지 캡처가 'temporary stabilization' 문구만 남겨 오해를 키웠다는 사실",
            "이서린이 통합 뒤 자기 영역이 사라질까 두려워했다는 사실"
          ],
          "suppressions": [
            "'temporary stabilization'만 붙잡은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point",
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-3:quote:1",
              "factText": "잘린 공지 캡처가 'temporary stabilization' 문구만 남겨 오해를 키웠다는 사실",
              "tags": [
                "quote",
                "uncertainty"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:b:d-3:self_justification:0",
              "factText": "이서린이 통합 뒤 자기 영역이 사라질까 두려워했다는 사실",
              "tags": [
                "self_justification",
                "fear"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
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
            "잘린 공지를 근거로 그렇게 이해한 건 맞습니다.",
            "다만 공동 승인 조건까지 챙기지 못했습니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "잘린 공지 캡처가 'temporary stabilization' 문구만 남겨 오해를 키웠다는 사실",
            "RACI와 PM 체크리스트가 공동 승인과 PM 기록을 요구했다는 사실"
          ],
          "suppressions": [
            "공동 승인 조건 누락"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing",
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-3:admission:0",
              "factText": "잘린 공지 캡처가 'temporary stabilization' 문구만 남겨 오해를 키웠다는 사실",
              "tags": [
                "admission",
                "quote"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:b:d-3:rule:1",
              "factText": "RACI와 PM 체크리스트가 공동 승인과 PM 기록을 요구했다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
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
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "공지 전체를 다 안 본 건 제 실수지만, 박준호 씨도 그 문장을 자기 단독 권한처럼 말해 와서 오해가 더 커졌습니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "박준호가 현장에서 안정화 책임을 자기 쪽 권한처럼 말한 장면이 있었다는 사실",
            "RACI와 PM 체크리스트가 공동 승인과 PM 기록을 요구했다는 사실"
          ],
          "suppressions": [
            "상대 해석에 기대 자기 오독을 정당화한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap",
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-3:counter:0",
              "factText": "박준호가 현장에서 안정화 책임을 자기 쪽 권한처럼 말한 장면이 있었다는 사실",
              "tags": [
                "counter",
                "quote"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-06:b:d-3:responsibility:0",
              "factText": "RACI와 PM 체크리스트가 공동 승인과 PM 기록을 요구했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                }
              },
              "stanceHints": [
                "blame"
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
            "통합 와중에 제 영역이 사라질까 봐 그 한 문장을 제 쪽 방패처럼 붙들었습니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "이서린이 통합 뒤 자기 영역이 사라질까 두려워했다는 사실",
            "모호한 공지 해석이 월권을 정당화하는 근거로 쓰였다는 결과"
          ],
          "suppressions": [
            "영역 상실 두려움"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-3:fear:0",
              "factText": "이서린이 통합 뒤 자기 영역이 사라질까 두려워했다는 사실",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:b:d-3:harm:0",
              "factText": "모호한 공지 해석이 월권을 정당화하는 근거로 쓰였다는 결과",
              "tags": [
                "harm",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "그 공지는 누구에게도 단독 통제권을 준 게 아니고, 공동 승인과 PM 기록이 전제였습니다.",
            "제가 제 쪽에 유리하게 읽은 제 책임입니다."
          ],
          "privateKnowledge": [
            "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
            "RACI와 PM 체크리스트가 공동 승인과 PM 기록을 요구했다는 사실",
            "이서린이 통합 뒤 자기 영역이 사라질까 두려워했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-3:admission:1",
              "factText": "통합 공지는 누구에게도 단독 통제권을 주지 않았다는 사실",
              "tags": [
                "admission",
                "rule"
              ],
              "slots": {
                "document": {
                  "exact": "팀즈 통합공지",
                  "neutral": "그 공지"
                },
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-3:responsibility:1",
              "factText": "RACI와 PM 체크리스트가 공동 승인과 PM 기록을 요구했다는 사실",
              "tags": [
                "responsibility",
                "institution"
              ],
              "slots": {
                "rule": {
                  "exact": "통합 RACI 문서",
                  "neutral": "그 문서"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
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
            "박준호 씨가 저를 문제 인력처럼 본다는 느낌은 있었지만, 메모가 먼저 들어간 줄은 몰랐습니다."
          ],
          "privateKnowledge": [
            "이서린이 설명 기회도 없이 낙인찍혔다고 느꼈다는 사실"
          ],
          "suppressions": [
            "상대가 자신을 문제 인력으로 본다는 추정"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-4:uncertainty:0",
              "factText": "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
              "tags": [
                "uncertainty",
                "identity"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "uncertain"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-4:relationship:0",
              "factText": "이서린이 설명 기회도 없이 낙인찍혔다고 느꼈다는 사실",
              "tags": [
                "relationship",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "hedge"
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
            "평가 쪽에서 제 이름이 먼저 돌았다는 얘길 들었지만 공식 확인은 없었습니다."
          ],
          "privateKnowledge": [
            "역할 경계가 정리되기 전 평가 메모가 먼저 입력됐다는 사실"
          ],
          "suppressions": [
            "소문만 듣고 방어적으로 굳어진 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-4:quote:0",
              "factText": "역할 경계가 정리되기 전 평가 메모가 먼저 입력됐다는 사실",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:b:d-4:identity:0",
              "factText": "비공식 평가 메모도 통합 초기 평판 형성에 영향을 준다는 사실",
              "tags": [
                "identity",
                "harm"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
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
            "초안과 수정 이력을 보면 박준호 씨가 경계 위반 성향처럼 적어 둔 메모가 먼저 있었습니다."
          ],
          "privateKnowledge": [
            "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
            "메모가 공격적 대응과 상호 불신을 키웠다는 결과"
          ],
          "suppressions": [
            "그 뒤 태도가 더 공격적으로 바뀐 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point",
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-4:evidence:0",
              "factText": "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
              "tags": [
                "evidence",
                "identity"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-4:harm:0",
              "factText": "메모가 공격적 대응과 상호 불신을 키웠다는 결과",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
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
            "그 메모는 역할 경계가 정리되기 전 선행 낙인이었다고 봅니다.",
            "그래서 제가 이후 더 공격적으로 제 영역을 지키려 했습니다."
          ],
          "privateKnowledge": [
            "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
            "메모가 공격적 대응과 상호 불신을 키웠다는 결과",
            "이 메모가 이후 이서린의 방어적 태도를 키웠다는 사실"
          ],
          "suppressions": [
            "선행 낙인에 대한 분노"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-4:harm:1",
              "factText": "메모가 공격적 대응과 상호 불신을 키웠다는 결과",
              "tags": [
                "harm",
                "identity"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-4:relationship:1",
              "factText": "이 메모가 이후 이서린의 방어적 태도를 키웠다는 사실",
              "tags": [
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "contextualize"
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
            "제가 아직 설명할 기회도 없는데 사람을 먼저 규정당한 느낌이 컸습니다."
          ],
          "privateKnowledge": [
            "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
            "이서린이 설명 기회도 없이 낙인찍혔다고 느꼈다는 사실"
          ],
          "suppressions": [
            "설명 기회를 잃었다는 감정"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-4:emotion:0",
              "factText": "이서린이 설명 기회도 없이 낙인찍혔다고 느꼈다는 사실",
              "tags": [
                "emotion",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
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
              "id": "workplace-06:b:d-4:harm:2",
              "factText": "메모가 공격적 대응과 상호 불신을 키웠다는 결과",
              "tags": [
                "harm",
                "identity"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "박준호 씨가 제 행동을 'boundary-blind'처럼 적은 메모를 먼저 남긴 건 사실입니다.",
            "그 기록이 제 방어적 대응을 세게 만든 것도 사실입니다."
          ],
          "privateKnowledge": [
            "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
            "이 메모가 이후 이서린의 방어적 태도를 키웠다는 사실",
            "이서린이 설명 기회도 없이 낙인찍혔다고 느꼈다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-4:act:0",
              "factText": "박준호가 HR 초안에 이서린을 경계 위반 성향처럼 적었다는 사실",
              "tags": [
                "act",
                "evidence"
              ],
              "slots": {
                "document": {
                  "exact": "HR 캘리브레이션 초안",
                  "neutral": "그 메모"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "assert"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-4:admission:0",
              "factText": "이 메모가 이후 이서린의 방어적 태도를 키웠다는 사실",
              "tags": [
                "admission",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "time": {
                  "exact": "통합 첫 2주",
                  "neutral": "그 시기",
                  "period": "통합 초기"
                }
              },
              "stanceHints": [
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
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
            "고객 지연이 떴다고 제가 규칙을 독단적으로 바꾼 건 아닙니다.",
            "저는 잘려 나간 흐름을 확인하고 있었을 뿐입니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실"
          ],
          "suppressions": [
            "조치의 실제 범위",
            "공동 승인 누락 순서"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:quote_and_point",
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-5:act:0",
              "factText": "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
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
              "id": "workplace-06:b:d-5:context:0",
              "factText": "이미 계정 재배정과 지연 경보가 겹쳐 흐름이 잘린 상태였다는 사실",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "막히는 부분을 조금 건드린 건 있어도, 그건 잘린 고객 흐름을 막기 위한 임시 조치였습니다.",
            "PM 기록을 늦춘 건 맞아도 독단이라고만 보긴 어렵습니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
            "이미 계정 재배정과 지연 경보가 겹쳐 흐름이 잘린 상태였다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실"
          ],
          "suppressions": [
            "조치가 '임시'를 넘었던 사실",
            "PM 기록을 늦춘 이유"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-5:self_justification:0",
              "factText": "이미 계정 재배정과 지연 경보가 겹쳐 흐름이 잘린 상태였다는 상황",
              "tags": [
                "self_justification",
                "motive"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-06:b:d-5:rule:0",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
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
            "제가 몇 군데 자동화 규칙을 먼저 건드린 건 맞습니다.",
            "다만 박준호 씨 쪽에서 이미 계정이 흔들린 뒤라 급한 불을 끄려던 판단이었습니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
            "이미 계정 재배정과 지연 경보가 겹쳐 흐름이 잘린 상태였다는 사실"
          ],
          "suppressions": [
            "대시보드·규칙·계정을 함께 건드린 범위",
            "상대에게 먼저 공유하지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing",
            "workplace-06:b:tell:sharp_overlap"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-5:admission:0",
              "factText": "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
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
              "id": "workplace-06:b:d-5:responsibility:0",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "partial",
                "hedge"
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
            "제가 규칙을 수정하고 PM 핑을 늦춘 건 맞습니다.",
            "그래도 박준호 씨 쪽도 계정 재배정부터 해 놓고 저만 독단이라고 할 수는 없습니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
            "박준호도 같은 시점에 계정을 직접 돌렸다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실"
          ],
          "suppressions": [
            "자기 조치가 먼저였다는 순서",
            "상대 책임으로 상쇄하려는 계산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap",
            "workplace-06:b:tell:quote_and_point"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-5:counter:0",
              "factText": "박준호도 같은 시점에 계정을 직접 돌렸다는 사실",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "workplace-06:b:d-5:responsibility:1",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "통합 후에도 제 일이 아닌 것처럼 밀려나는데 고객 손실 책임만 제 몫이 될까 봐 수치스러웠습니다.",
            "그래서 절차보다 막는 행동을 먼저 했습니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
            "이미 계정 재배정과 지연 경보가 겹쳐 흐름이 잘린 상태였다는 사실",
            "이서린이 고객 손실 책임만 떠안을까 수치스럽고 불안했다는 사실"
          ],
          "suppressions": [
            "체면과 평가 불안",
            "공식 절차를 두려움보다 뒤로 미룬 이유"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:sharp_overlap",
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-5:emotion:0",
              "factText": "이서린이 고객 손실 책임만 떠안을까 수치스럽고 불안했다는 사실",
              "tags": [
                "emotion",
                "fear"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
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
              "id": "workplace-06:b:d-5:shame:0",
              "factText": "양측 핫픽스가 겹쳐 통합 큐 복구가 더 늦어졌다는 결과",
              "tags": [
                "shame",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                }
              },
              "stanceHints": [
                "emotional",
                "admit"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "고객 지연 신호 뒤에 제가 자동화 규칙을 독단적으로 수정했고 에스컬레이션도 늦췄습니다.",
            "절차를 비켜 간 제 책임입니다."
          ],
          "privateKnowledge": [
            "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
            "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
            "이서린이 고객 손실 책임만 떠안을까 수치스럽고 불안했다는 사실"
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-06:b:tell:permission_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "workplace-06:b:d-5:admission:1",
              "factText": "고객 지연 신호 뒤에 이서린이 자동화 규칙을 독단 수정하고 PM 에스컬레이션을 늦췄다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "person": {
                  "exact": "박준호",
                  "neutral": "상대방",
                  "fullName": "박준호",
                  "judgeRef": "박준호 씨"
                },
                "hotfix": {
                  "exact": "고객 지연 신호 후 핫픽스",
                  "neutral": "그 조치"
                },
                "routing": {
                  "exact": "라우팅 규칙",
                  "neutral": "그 규칙"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-06:b:d-5:responsibility:2",
              "factText": "핫픽스보다 먼저 공동 승인과 PM 기록을 남겨야 했다는 사실",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "고객 지연 신호 직후",
                  "neutral": "그 시점",
                  "period": "지연 경보 직후"
                },
                "institution": {
                  "exact": "권하늘 PM",
                  "neutral": "PM",
                  "fullName": "권하늘",
                  "judgeRef": "권하늘 PM"
                },
                "rule": {
                  "exact": "공동 승인 + PM 기록 규칙",
                  "neutral": "그 절차"
                }
              },
              "stanceHints": [
                "confess",
                "admit"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        }
      }
    }
  }
}


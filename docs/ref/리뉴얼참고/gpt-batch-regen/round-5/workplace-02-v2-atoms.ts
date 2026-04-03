export const workplace02V2Atoms = {
  "caseId": "workplace-02",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "접근권 조정은 감사 직전의 일반적인 선제 보안 조치였고, 누구를 유출자로 확정한 건 아니었습니다."
          ],
          "privateKnowledge": [
            "민아의 심야 다운로드와 외부 접촉 정황이 겹쳐 위험 신호로 봤다."
          ],
          "suppressions": [
            "공식 조사번호보다 먼저 권한을 회수한 사실",
            "팀 공지가 민아 한 명만 겨냥했다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-1:act:0",
              "factText": "특정 직원의 접근권 조정이 표준 보안 조치였다는 주장",
              "tags": [
                "act",
                "rule"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
              "id": "workplace-02:a:d-1:motive:1",
              "factText": "조직 안정이 개별 판단보다 우선이었다는 프레임",
              "tags": [
                "motive",
                "context"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            "이름을 적시한 적은 없고, 시기상 접근을 잠시 묶어 둔 겁니다."
          ],
          "privateKnowledge": [
            "팀이 이미 민아를 의심하기 시작해 불안이 커지고 있었다."
          ],
          "suppressions": [
            "민아 한 명만 대상이었다는 점",
            "사실상 징계 예고처럼 들린 표현"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-1:uncertainty:2",
              "factText": "특정인 지목 없이 접근을 잠시 묶었다는 해명",
              "tags": [
                "uncertainty",
                "act"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
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
              "id": "workplace-02:a:d-1:context:3",
              "factText": "팀 불안이 먼저 커져 선제 차단이 필요했다는 설명",
              "tags": [
                "context",
                "fear"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
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
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "공식 번호가 뜨기 전에 권한을 건드린 건 맞지만, 당시엔 확산을 막는 게 먼저라고 판단했습니다."
          ],
          "privateKnowledge": [
            "HR 사건번호 생성 52분 전에 접근권을 회수했다."
          ],
          "suppressions": [
            "확정 증거가 없었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-1:act:4",
              "factText": "공식 절차 이전에 접근권을 먼저 조정한 사실",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
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
              "id": "workplace-02:a:d-1:rule:5",
              "factText": "확산 차단을 절차보다 앞세운 판단",
              "tags": [
                "rule",
                "motive"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
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
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "민아만 먼저 본 건 사실입니다. 심야 다운로드, 개인 드라이브 업로드, 외부 DM이 한꺼번에 올라왔으니까요."
          ],
          "privateKnowledge": [
            "하나로는 확증이 아니었지만 묶이면 충분히 의심된다고 봤다."
          ],
          "suppressions": [
            "팀 공지가 낙인 효과를 냈다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-1:responsibility:6",
              "factText": "여러 정황을 묶어 특정 직원 한 사람을 먼저 의심한 사실",
              "tags": [
                "responsibility",
                "act"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "late_download": {
                  "exact": "심야 다운로드 직후",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
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
              "id": "workplace-02:a:d-1:counter:7",
              "factText": "정황의 중첩을 확정 증거처럼 취급한 판단",
              "tags": [
                "counter",
                "uncertainty"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "late_download": {
                  "exact": "심야 다운로드 직후",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
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
            "절차가 깨질 수 있다는 건 알았습니다. 그래도 감사 직전에 팀이 흔들리는 그림을 막고 싶었습니다."
          ],
          "privateKnowledge": [
            "팀 관리 실패와 보복성 대응으로 보일까 두려웠다."
          ],
          "suppressions": [
            "본인 평판을 지키려는 동기"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-1:emotion:8",
              "factText": "조직 안정 명분이 절차 위로 올라간 사실",
              "tags": [
                "emotion",
                "rule"
              ],
              "slots": {
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
              "id": "workplace-02:a:d-1:fear:9",
              "factText": "본부 신뢰를 잃을까 두려워 판단이 기울어진 심리",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
            "제가 너무 빨리 민아를 유출자로 몰았습니다. 확인도 끝나기 전에 접근권을 끊고 팀 앞에서 낙인을 찍었습니다."
          ],
          "privateKnowledge": [
            "확정 증거 없이 선제 차단과 암시성 공지를 했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-1:admission:10",
              "factText": "확정 증거 없이 특정 직원을 유출자로 몰고 접근권을 끊은 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
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
              "id": "workplace-02:a:d-1:harm:11",
              "factText": "팀 앞 암시성 공지로 낙인 효과를 만든 사실",
              "tags": [
                "harm",
                "quote"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
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
            "민아가 자료를 밖으로 뺐다는 건 아직 단정할 수 없지만, 개인 저장 흔적과 외부 대화는 위험했습니다."
          ],
          "privateKnowledge": [
            "개인 드라이브 업로드 이력 일부를 봤다."
          ],
          "suppressions": [
            "외부상담의 범위를 자신도 정확히 모른다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-2:act:0",
              "factText": "개인 저장 흔적과 외부 대화가 위험 신호였다는 판단",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
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
            },
            {
              "id": "workplace-02:a:d-2:context:1",
              "factText": "외부상담의 실제 범위는 알지 못한 채 의심을 키운 상태",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
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
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "적어도 사내 통제 밖으로 복사하려 한 정황은 있었고, 그래서 제가 더 예민해졌습니다."
          ],
          "privateKnowledge": [
            "DM 원문은 다 보지 못했다."
          ],
          "suppressions": [
            "민아가 자기보호 심리였을 가능성"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-2:act:2",
              "factText": "사내 통제 밖 저장을 시도한 정황이 있었다는 인식",
              "tags": [
                "act",
                "privacy"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            },
            {
              "id": "workplace-02:a:d-2:evidence:3",
              "factText": "전체 맥락 없이 일부 캡처만 본 상태",
              "tags": [
                "evidence",
                "uncertainty"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "개인 드라이브에 초안 일부가 올라간 건 부정하기 어렵습니다. 다만 그게 곧 원본 유출과 같다고 보긴 어려웠습니다."
          ],
          "privateKnowledge": [
            "업로드 시각이 익명 유출 소문이 돈 뒤라는 점도 확인했다."
          ],
          "suppressions": [
            "자신이 그 차이를 팀에 설명하지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-2:admission:4",
              "factText": "개인 드라이브 업로드 자체는 있었다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "late_download": {
                  "exact": "심야 다운로드 직후",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-2:timeline:5",
              "factText": "업로드 시각이 익명 유출 정황 뒤였다는 맥락",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "late_download": {
                  "exact": "심야 다운로드 직후",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "외부 상담도 있었다고 봅니다. 그런데 범위보다 무서웠던 건, 민감한 자료를 회사 밖 판단 프레임으로 들고나갔다는 점이었습니다."
          ],
          "privateKnowledge": [
            "민아가 제보 채널을 불신했다는 걸 어렴풋이 알았다."
          ],
          "suppressions": [
            "안전한 내부 채널을 열어주지 않았다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-2:privacy:6",
              "factText": "외부 상담 자체가 있었다는 판단",
              "tags": [
                "privacy",
                "act"
              ],
              "slots": {
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-2:context:7",
              "factText": "내부 보호 채널 부재가 자기방어성 외부상담을 부른 정황",
              "tags": [
                "context",
                "motive"
              ],
              "slots": {
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "돌이켜 보면, 그 행위를 순수한 유출 의도와 자기방어를 분리해서 봤어야 했습니다."
          ],
          "privateKnowledge": [
            "민아가 이미 희생양이 될까 두려워하고 있었다."
          ],
          "suppressions": [
            "자신의 선행 낙인이 공포를 키웠다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-2:emotion:8",
              "factText": "자기방어성 복사와 악의적 유출을 구분하지 못한 판단",
              "tags": [
                "emotion",
                "counter"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
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
              "id": "workplace-02:a:d-2:fear:9",
              "factText": "상대의 희생양 공포를 읽고도 분리 처리하지 못한 심리",
              "tags": [
                "fear",
                "relationship"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
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
            "민아가 무단 복사와 외부 상담을 한 건 맞습니다. 다만 저는 그 범위도 제대로 모르면서 그걸 곧바로 유출자로 몰아가는 재료로 써 버렸습니다."
          ],
          "privateKnowledge": [
            "행위와 해석을 섞어 버린 책임이 있다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-2:responsibility:10",
              "factText": "무단 복사 사실과 유출자 단정을 섞어 사용한 책임",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-2:uncertainty:11",
              "factText": "행위의 범위를 모른 채 해석을 앞세운 사실",
              "tags": [
                "uncertainty",
                "harm"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "제 눈에는 민아 쪽 흔적이 제일 먼저 겹쳐 보였습니다. 당시엔 다른 경로를 상상하기 어려웠습니다."
          ],
          "privateKnowledge": [
            "e-2 정황 때문에 민아를 유력하게 봤다."
          ],
          "suppressions": [
            "공유링크 관리 누락 가능성"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-3:act:0",
              "factText": "한 직원 주변 흔적이 가장 먼저 겹쳐 보였다는 초기 판단",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:a:d-3:context:1",
              "factText": "다른 반출 경로를 상상하지 못한 상태",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                }
              },
              "stanceHints": [
                "deny",
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "직접 내려받는 장면을 본 건 아닙니다. 다만 감사 직전 자료를 밖으로 돌릴 수 있는 사람으로 민아가 가장 가까워 보였습니다."
          ],
          "privateKnowledge": [
            "원본 로그를 아직 보지 못했다."
          ],
          "suppressions": [
            "확정 근거 부재"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-3:uncertainty:2",
              "factText": "직접 증거 없이도 가장 가까운 용의자로 특정한 상태",
              "tags": [
                "uncertainty",
                "identity"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            },
            {
              "id": "workplace-02:a:d-3:evidence:3",
              "factText": "원본 로그를 보기 전 추정이 먼저 굳어진 상황",
              "tags": [
                "evidence",
                "threshold"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            "오래 살아 있던 링크가 있었다면 얘기가 달라집니다. 적어도 민아 개인 드라이브 업로드보다 먼저 열린 경로가 있는지 봐야 합니다."
          ],
          "privateKnowledge": [
            "노지원 쪽 오래된 링크 가능성을 처음 들었다."
          ],
          "suppressions": [
            "자신의 초기 단정"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-3:timeline:4",
              "factText": "개인 업로드보다 앞선 경로를 확인해야 한다는 인식",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "two_hours_before": {
                  "exact": "민아 업로드 2시간 전",
                  "neutral": "그보다 앞선 시점",
                  "period": "감사 직전"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
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
              "id": "workplace-02:a:d-3:context:5",
              "factText": "오래 살아 있던 공유 경로 가능성이 새로 떠오른 상태",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "two_hours_before": {
                  "exact": "민아 업로드 2시간 전",
                  "neutral": "그보다 앞선 시점",
                  "period": "감사 직전"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
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
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "문제는 단일 행위자가 아니라 회수되지 않은 링크 관리였습니다. 제가 민아 흔적만 보고 그 구조적 구멍을 놓쳤습니다."
          ],
          "privateKnowledge": [
            "노지원이나 외주 검토선이 개입했을 가능성을 배제할 수 없었다."
          ],
          "suppressions": [
            "본인 판단의 성급함"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-3:rule:6",
              "factText": "회수되지 않은 공유 경로 관리가 핵심 변수였다는 사실",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "vendor": {
                  "exact": "외부 번역업체",
                  "neutral": "그 외부 업체"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
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
              "id": "workplace-02:a:d-3:identity:7",
              "factText": "제3자 검토선 개입 가능성을 뒤늦게 본 상태",
              "tags": [
                "identity",
                "evidence"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "vendor": {
                  "exact": "외부 번역업체",
                  "neutral": "그 외부 업체"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
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
            "범인을 빨리 정해야 팀이 정리된다고 생각했습니다. 그래서 로그보다 그림을 먼저 붙잡았습니다."
          ],
          "privateKnowledge": [
            "본부 신뢰를 잃을까 두려워 신속한 희생양을 찾았다."
          ],
          "suppressions": [
            "평판 방어 동기"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-3:fear:8",
              "factText": "정확한 로그보다 빠른 범인 특정이 우선이 된 심리",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
              "id": "workplace-02:a:d-3:shame:9",
              "factText": "조직 신뢰를 지키려 희생양을 서둘러 찾은 두려움",
              "tags": [
                "shame",
                "fear"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            "원본을 먼저 밖으로 뺀 쪽은 민아가 아니었습니다. 회수되지 않은 링크와 임시토큰이 남아 있었고, 저는 그 전에 민아를 범인처럼 몰았습니다."
          ],
          "privateKnowledge": [
            "제3자 경로를 보기 전에 민아를 사실상 확정했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-3:admission:10",
              "factText": "실제 원본 반출 경로가 제3자 재사용 경로였다는 사실",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "token": {
                  "exact": "임시다운로드 토큰",
                  "neutral": "그 토큰"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-3:responsibility:11",
              "factText": "그 사실을 보기 전에 한 직원을 범인으로 몰아간 책임",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "token": {
                  "exact": "임시다운로드 토큰",
                  "neutral": "그 토큰"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "민아에게 제보를 막으라고 한 적은 없습니다. 감사 중이니 정리 순서를 맞추자고 한 겁니다."
          ],
          "privateKnowledge": [
            "비용처리 건을 감사 후로 미루자고 말했다."
          ],
          "suppressions": [
            "HR에 '보안상 위험 인물' 메모를 먼저 남긴 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-4:denial:0",
              "factText": "제보를 막은 것이 아니라 순서를 조정했다는 주장",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
              "id": "workplace-02:a:d-4:timeline:1",
              "factText": "비용처리 이상 징후를 감사 뒤로 미루려 한 사실",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            "위험 메모는 조사 편의를 위한 분류였지, 낙인을 찍자는 뜻은 아니었습니다."
          ],
          "privateKnowledge": [
            "민아 면담 전에 HR에 선행 코멘트를 남겼다."
          ],
          "suppressions": [
            "그 메모가 제보 억제와 연결된 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-4:rule:2",
              "factText": "보안 리스크 분류를 조사 편의라고 축소하는 설명",
              "tags": [
                "rule",
                "quote"
              ],
              "slots": {
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-4:timeline:3",
              "factText": "면담 이전에 선행 코멘트를 입력해 둔 상태",
              "tags": [
                "timeline",
                "institution"
              ],
              "slots": {
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "네, HR에 보안 리스크 취지의 메모를 먼저 남겼습니다. 다만 그때는 제보와 유출 의심이 한꺼번에 엉켜 있었습니다."
          ],
          "privateKnowledge": [
            "초기 입력본이 수정 전 더 거칠었다."
          ],
          "suppressions": [
            "비용 건은 감사 후 보자고 사실상 막은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-4:institution:4",
              "factText": "한 직원 면담 이전에 인사 기록에 위험 메모를 먼저 남긴 사실",
              "tags": [
                "institution",
                "timeline"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-4:quote:5",
              "factText": "초기 입력본이 더 노골적인 낙인 표현이었다는 정황",
              "tags": [
                "quote",
                "harm"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "제가 '감사 끝날 때까지 구두로만 정리하자'고 한 건 맞습니다. 제보가 아니라 혼선 통제라고 생각했지만 결과적으로는 막은 셈이 됐습니다."
          ],
          "privateKnowledge": [
            "공식 채널로 올라가면 본인 관리 실패가 드러날까 부담스러웠다."
          ],
          "suppressions": [
            "자기 경력 보전 동기"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-4:act:6",
              "factText": "정식 제보를 구두 정리로 묶어 두려 한 사실",
              "tags": [
                "act",
                "rule"
              ],
              "slots": {
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-4:fear:7",
              "factText": "관리 실패가 드러날까 두려워 제보 채널을 막은 심리",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "솔직히 말하면, 감사 직전에 제보와 보안사고가 동시에 터지면 제 라인 전체가 무너질까 겁났습니다."
          ],
          "privateKnowledge": [
            "보복으로 보일 위험을 알면서도 먼저 눌렀다."
          ],
          "suppressions": [
            "선행 낙인의 고의성"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-4:fear:8",
              "factText": "감사 대응 평판을 지키려는 두려움이 제보 보호보다 앞선 사실",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
              "id": "workplace-02:a:d-4:shame:9",
              "factText": "보복으로 보일 위험을 알면서도 눌러 둔 심리",
              "tags": [
                "shame",
                "fear"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
            "제가 먼저 민아를 위험 인물처럼 적어 두고, 비용 건은 감사 후에 보자며 입을 좁혔습니다. 제보 절차를 보호하지 못했고 사실상 입막음이었습니다."
          ],
          "privateKnowledge": [
            "선행 낙인과 비공식 입막음 둘 다 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-4:admission:10",
              "factText": "선행 낙인 메모와 비공식 입막음 지시가 함께 존재한 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-4:motive:11",
              "factText": "제보 절차보다 자기 보호를 우선한 책임",
              "tags": [
                "motive",
                "shame"
              ],
              "slots": {
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "저는 소문을 퍼뜨린 게 아니라 팀 불안을 달래려 한 겁니다. 확인 안 된 이름을 굳이 꺼낸 적도 없습니다."
          ],
          "privateKnowledge": [
            "팀원들이 이미 민아를 떠올리게 될 표현을 썼다."
          ],
          "suppressions": [
            "'외부랑 붙었다'는 식의 암시"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-5:denial:0",
              "factText": "소문이 아니라 팀 안정용 언급이었다는 주장",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
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
              "id": "workplace-02:a:d-5:quote:1",
              "factText": "이름 없이도 대상을 떠올리게 할 표현을 사용한 상태",
              "tags": [
                "quote",
                "identity"
              ],
              "slots": {
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
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
            "공지 문구가 거칠었다는 건 인정하지만, 특정인을 찍어 돌리려던 건 아닙니다."
          ],
          "privateKnowledge": [
            "이름은 안 썼어도 대상을 알 수 있게 만들었다."
          ],
          "suppressions": [
            "민아를 고립시키는 효과"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-5:uncertainty:2",
              "factText": "익명 공지였다는 축소 설명",
              "tags": [
                "uncertainty",
                "quote"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-5:identity:3",
              "factText": "대상이 누구인지 팀이 알 수 있게 만든 구조",
              "tags": [
                "identity",
                "harm"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "네, 제가 불씨를 줄인다고 하면서 오히려 방향을 준 건 맞습니다. 팀 공지와 제 말이 합쳐지면 민아로 읽힐 수 있었습니다."
          ],
          "privateKnowledge": [
            "보안 리스크 인원이라는 표현이 민아 한 명에게만 적용됐다."
          ],
          "suppressions": [
            "자신의 관리권 방어"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-5:identity:4",
              "factText": "익명 공지처럼 보였지만 실제로는 한 사람을 향한 소문 재료였던 사실",
              "tags": [
                "identity",
                "harm"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
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
              "id": "workplace-02:a:d-5:quote:5",
              "factText": "팀 공지와 주변 말이 같은 방향으로 읽히게 만든 구조",
              "tags": [
                "quote",
                "context"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
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
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "하지만 소문전은 저 혼자 한 게 아닙니다. 민아도 단톡에서 자신이 희생양이라며 상사 비리설을 키웠습니다."
          ],
          "privateKnowledge": [
            "서로 먼저 상대를 압박하려 했다."
          ],
          "suppressions": [
            "본인이 먼저 시작한 측면"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-5:counter:6",
              "factText": "관리자 쪽 암시와 상대 쪽 비공식 대화 발언이 맞물려 소문전이 커진 사실",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:a:d-5:context:7",
              "factText": "쌍방이 공식 조사 전에 여론전을 택한 구조",
              "tags": [
                "context",
                "responsibility"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "감사 전 분위기를 틀어쥐려고 말을 흘린 건 부인하기 어렵습니다. 팀이 흔들리면 제 책임이 되니까요."
          ],
          "privateKnowledge": [
            "소문으로 여론을 선점하려 했다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-5:motive:8",
              "factText": "팀 통제권을 지키려 소문으로 분위기를 선점하려 한 사실",
              "tags": [
                "motive",
                "act"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
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
              "id": "workplace-02:a:d-5:fear:9",
              "factText": "감사 전 책임 회피 심리가 소문 유포로 이어진 상태",
              "tags": [
                "fear",
                "responsibility"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
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
            "공식 조사 전에 저도 소문을 썼습니다. 민아가 외부와 붙었다는 취지로 말해 먼저 낙인을 만들었고, 그게 쌍방 소문전의 출발점이 됐습니다."
          ],
          "privateKnowledge": [
            "공식 절차보다 비공식 압박을 택했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:a:tell:delay_frame",
            "workplace-02:a:tell:softened_order",
            "workplace-02:a:tell:topic_glide"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:a:d-5:admission:10",
              "factText": "공식 조사 전 상대를 압박하려는 의도로 소문을 사용한 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
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
              "id": "workplace-02:a:d-5:responsibility:11",
              "factText": "낙인 효과를 알면서도 비공식 압박을 택한 책임",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "rumor_quote": {
                  "exact": "'외부랑 붙었다'",
                  "neutral": "그 암시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
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
            "제 접근권은 사건번호도 뜨기 전에 끊겼습니다. 그걸 표준 조치라고 부르면 저는 설명할 말이 없습니다."
          ],
          "privateKnowledge": [
            "같은 날 팀 공지까지 돌아 사실상 제가 지목됐다고 느꼈다."
          ],
          "suppressions": [
            "공포 때문에 즉시 맞서지 못한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-1:timeline:0",
              "factText": "공식 조사 전 접근권 차단이 먼저 일어난 사실",
              "tags": [
                "timeline",
                "harm"
              ],
              "slots": {
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-1:emotion:1",
              "factText": "같은 날 공지까지 이어져 자신이 지목됐다고 느낀 상태",
              "tags": [
                "emotion",
                "identity"
              ],
              "slots": {
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hurt"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "이름은 안 썼어도 그 공지는 저를 가리켰습니다. 접근권이 저 하나만 빠졌으니까요."
          ],
          "privateKnowledge": [
            "규원이 확정 증거 없이 팀 불안을 앞세웠다고 본다."
          ],
          "suppressions": [
            "자신도 이후 감정적으로 대응한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-1:identity:2",
              "factText": "익명 공지가 실제로는 자신 한 사람을 가리켰다는 사실",
              "tags": [
                "identity",
                "quote"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-1:motive:3",
              "factText": "조직 안정 명분이 확정 증거보다 먼저 앞섰다는 인식",
              "tags": [
                "motive",
                "context"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "hurt"
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
            "권한 회수 시각이 공식 조사보다 앞섰다는 기록이 있습니다. 절차가 아니라 선제 낙인이 먼저 온 겁니다."
          ],
          "privateKnowledge": [
            "HR 접수보다 52분 빠른 회수 사실이 확인된다."
          ],
          "suppressions": [
            "당시 자신도 방어적으로 자료를 모은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-1:timeline:4",
              "factText": "공식 조사 단계보다 앞서 접근권이 회수된 사실",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-1:harm:5",
              "factText": "절차보다 선제 낙인이 먼저 왔다는 구조",
              "tags": [
                "harm",
                "rule"
              ],
              "slots": {
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
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
            "문제는 차단만이 아니었습니다. 팀 공지의 '보안 리스크' 문구가 저 혼자에게 붙으면서, 저는 조사 전부터 유출자처럼 취급됐습니다."
          ],
          "privateKnowledge": [
            "팀원 반응이 즉각 바뀌었다."
          ],
          "suppressions": [
            "소문전에 자신도 가담한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-1:harm:6",
              "factText": "익명 팀 공지가 사실상 한 사람에게만 낙인 효과를 냈던 사실",
              "tags": [
                "harm",
                "identity"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-1:relationship:7",
              "factText": "공지가 팀 내 인간관계를 바로 바꿔 놓은 상태",
              "tags": [
                "relationship",
                "emotion"
              ],
              "slots": {
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "hurt"
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
            "저는 그때 제보자도, 피의자도 아닌데 두 이름을 같이 뒤집어쓴 기분이었습니다. 규원 실장님은 조직 안정이라는 말로 제 입을 먼저 묶었습니다."
          ],
          "privateKnowledge": [
            "자신이 희생양으로 정리될까 두려웠다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-1:emotion:8",
              "factText": "조직 안정 명분 아래 제보 가능성과 유출 의심이 한 사람에게 겹쳐 씌워진 사실",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-1:fear:9",
              "factText": "희생양이 될까 두려워 입을 닫게 된 심리",
              "tags": [
                "fear",
                "shame"
              ],
              "slots": {
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "hurt"
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
            "규원 실장님이 저를 너무 일찍 유출자로 봤습니다. 확인도 끝나기 전에 접근권을 끊고, 팀 안에서 제가 위험 인물인 것처럼 읽히게 만들었습니다."
          ],
          "privateKnowledge": [
            "선제 지목과 접근 차단, 낙인 효과를 모두 인정받고 싶다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-1:admission:10",
              "factText": "확정 증거 없는 선제 지목과 접근 차단이 있었다는 사실",
              "tags": [
                "admission",
                "harm"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                }
              },
              "stanceHints": [
                "confess",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-1:responsibility:11",
              "factText": "그 조치가 팀 안 낙인으로 이어졌다는 사실",
              "tags": [
                "responsibility",
                "identity"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "team_notice": {
                  "exact": "보안 리스크 인원 공지",
                  "neutral": "그 공지"
                },
                "case52": {
                  "exact": "공식 조사번호 생성 52분 전",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                }
              },
              "stanceHints": [
                "confess",
                "hurt"
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
            "개인 드라이브에 원본을 빼낸 적은 없습니다. 바깥 대화도 이직이나 경력 얘기 수준이었고요."
          ],
          "privateKnowledge": [
            "일부 초안을 개인 공간에 올린 건 맞다."
          ],
          "suppressions": [
            "감사 초안 일부를 DM 문장으로 보낸 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-2:denial:0",
              "factText": "개인 저장은 없었다는 부정",
              "tags": [
                "denial",
                "privacy"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
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
              "id": "workplace-02:b:d-2:act:1",
              "factText": "실제로는 일부 초안을 개인 공간에 옮긴 상태",
              "tags": [
                "act",
                "privacy"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
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
            "정확히 말하면, 제 보호용 메모와 초안 일부가 잠깐 따로 저장된 겁니다. 기술적으로 원본 전체를 외부 유출한 건 아니에요."
          ],
          "privateKnowledge": [
            "소문이 돈 뒤 증빙용으로 모았다고 스스로 합리화한다."
          ],
          "suppressions": [
            "회사 밖 저장공간 사용 사실"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-2:uncertainty:2",
              "factText": "보호용 저장이었다며 인정 범위를 좁히는 설명",
              "tags": [
                "uncertainty",
                "privacy"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
              "id": "workplace-02:b:d-2:self_justification:3",
              "factText": "자기보호 합리화로 무단 복사를 축소한 상태",
              "tags": [
                "self_justification",
                "motive"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "audit_before": {
                  "exact": "감사 직전",
                  "neutral": "그때",
                  "period": "감사 착수 이틀 전"
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
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "네, 개인 드라이브 업로드는 있었습니다. 다만 익명 유출 정황이 돌기 시작한 뒤였고, 제가 당장 잘릴까 봐 흔적을 남긴 겁니다."
          ],
          "privateKnowledge": [
            "자기보호 목적이었지만 무단 복사라는 점은 안다."
          ],
          "suppressions": [
            "외부 동료에게 일부 문장을 보낸 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-2:timeline:4",
              "factText": "유출 정황 뒤 개인 보관공간에 감사 초안 일부를 올린 사실",
              "tags": [
                "timeline",
                "act"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "late_download": {
                  "exact": "심야 다운로드 직후",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-2:fear:5",
              "factText": "잘릴까 두려워 흔적을 남기려 했던 동기",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "late_download": {
                  "exact": "심야 다운로드 직후",
                  "neutral": "그 시점",
                  "period": "감사 직전"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "전 직장 동료에게 연락한 것도 맞습니다. 법무 쪽 시각을 물어보려 했고, 그 과정에서 몇 문장이 넘어갔습니다. 안전한 내부 채널이 없다고 느꼈습니다."
          ],
          "privateKnowledge": [
            "규원에게 말하면 먼저 찍힐 거라 생각했다."
          ],
          "suppressions": [
            "사적 외부 상담이 규정 위반이라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-2:privacy:6",
              "factText": "회사 밖 상담 과정에서 일부 문장이 실제로 전송된 사실",
              "tags": [
                "privacy",
                "act"
              ],
              "slots": {
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
              "id": "workplace-02:b:d-2:fear:7",
              "factText": "내부 채널 불신과 낙인 공포가 회사 밖 상담을 부른 상태",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
            "저는 그때 이미 유출자 취급을 받고 있었습니다. 그래서 보존과 누설의 경계를 냉정하게 못 지켰습니다."
          ],
          "privateKnowledge": [
            "억울함과 공포 때문에 범위를 좁혀 인정하려 든다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-2:fear:8",
              "factText": "희생양 공포가 자기방어성 무단 복사를 부른 사실",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
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
              "id": "workplace-02:b:d-2:shame:9",
              "factText": "억울함 때문에 인정 범위를 계속 좁혀 말한 심리",
              "tags": [
                "shame",
                "self_justification"
              ],
              "slots": {
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
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
            "저는 무단 복사를 했고 외부 상담도 했습니다. 원본 전체를 먼저 유출한 건 아니지만, 제 보호를 이유로 규정을 넘었습니다."
          ],
          "privateKnowledge": [
            "행위 자체는 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-2:admission:10",
              "factText": "자기보호 목적이었어도 무단 복사와 회사 밖 상담이 실제로 있었다는 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-2:responsibility:11",
              "factText": "원본 최초 유출과는 구분되지만 규정을 넘은 책임",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "dm": {
                  "exact": "전 직장 동료 DM",
                  "neutral": "그 외부 대화"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "제가 원본 유출자라는 말은 성립하지 않습니다. 오히려 누군가 저한테 그림을 덮어씌운 겁니다."
          ],
          "privateKnowledge": [
            "자신이 최초 유출자가 아님은 확신한다."
          ],
          "suppressions": [
            "누가 실제 유출자인지는 모른다는 점",
            "분노 때문에 규원 의도를 단정하는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-3:denial:0",
              "factText": "자신이 원본 유출자일 수 없다는 강한 부정",
              "tags": [
                "denial",
                "identity"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-3:uncertainty:1",
              "factText": "무고함은 확신하지만 실제 경로는 모르는 상태",
              "tags": [
                "uncertainty",
                "emotion"
              ],
              "slots": {
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                }
              },
              "stanceHints": [
                "deny",
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "적어도 제 개인 드라이브 흔적과 원본 외부 반출 시점은 맞지 않습니다. 저를 먼저 범인으로 정한 다음 증거를 끼워 맞춘 거죠."
          ],
          "privateKnowledge": [
            "원본 로그를 보진 못했지만 타임라인 불일치를 직감한다."
          ],
          "suppressions": [
            "규원을 범인으로 단정할 근거는 없다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-3:timeline:2",
              "factText": "개인 보관 흔적과 원본 반출 시점이 맞지 않는다는 주장",
              "tags": [
                "timeline",
                "counter"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "two_hours_before": {
                  "exact": "민아 업로드 2시간 전",
                  "neutral": "그보다 앞선 시점",
                  "period": "감사 직전"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            },
            {
              "id": "workplace-02:b:d-3:uncertainty:3",
              "factText": "로그 전 확인 없이도 타임라인 불일치를 감지한 상태",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
                },
                "two_hours_before": {
                  "exact": "민아 업로드 2시간 전",
                  "neutral": "그보다 앞선 시점",
                  "period": "감사 직전"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "회수되지 않은 링크 얘기가 나오면 흐름이 달라집니다. 제가 만진 파일보다 먼저 살아 있던 경로가 있었다면, 원본 유출자는 다른 사람일 수밖에 없습니다."
          ],
          "privateKnowledge": [
            "노지원 이름까지는 몰라도 외부 링크 재사용 가능성을 잡는다."
          ],
          "suppressions": [
            "자신도 이 틈을 이용해 규원 악의를 부각한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-3:timeline:4",
              "factText": "개인 보관 흔적보다 앞선 외부 경로가 존재할 수 있다는 사실",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "two_hours_before": {
                  "exact": "민아 업로드 2시간 전",
                  "neutral": "그보다 앞선 시점",
                  "period": "감사 직전"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
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
              "id": "workplace-02:b:d-3:context:5",
              "factText": "회수되지 않은 공유 경로 재사용 가능성이 처음 선명해진 상태",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "two_hours_before": {
                  "exact": "민아 업로드 2시간 전",
                  "neutral": "그보다 앞선 시점",
                  "period": "감사 직전"
                },
                "drive": {
                  "exact": "개인 드라이브",
                  "neutral": "그 저장공간"
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
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "문제의 핵심은 오래 살아 있던 링크와 다운로드 토큰입니다. 저는 억울함 때문에 규원 실장님이 의도적으로 날 묻으려 했다고 밀어붙였지만, 실제 유출선은 그보다 구조적이었습니다."
          ],
          "privateKnowledge": [
            "자신도 보복심으로 해석을 키웠다."
          ],
          "suppressions": [
            "규원에 대한 추론을 단정적으로 말한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-3:rule:6",
              "factText": "실제 핵심이 개인 악의보다 공유 경로와 토큰 관리였다는 사실",
              "tags": [
                "rule",
                "evidence"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "token": {
                  "exact": "임시다운로드 토큰",
                  "neutral": "그 토큰"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
              "id": "workplace-02:b:d-3:motive:7",
              "factText": "무고함을 증명하려다 상대 의도를 과장한 상태",
              "tags": [
                "motive",
                "emotion"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "token": {
                  "exact": "임시다운로드 토큰",
                  "neutral": "그 토큰"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
            "저는 유출자가 아니었지만, 억울해서 '누군가 일부러 나를 범인으로 만들었다'는 문장을 너무 빨리 섞었습니다."
          ],
          "privateKnowledge": [
            "보복심 때문에 규원 의도를 단정하는 문장이 늘었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-3:emotion:8",
              "factText": "무고함과 별개로 상대 의도를 단정하며 서사를 키운 사실",
              "tags": [
                "emotion",
                "counter"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-3:motive:9",
              "factText": "보복심이 논리 설명에 섞여 단정이 빨라진 심리",
              "tags": [
                "motive",
                "self_justification"
              ],
              "slots": {
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "원본을 먼저 밖으로 보낸 건 제가 아닙니다. 회수되지 않은 링크와 노지원 쪽 접근이 먼저였고, 저는 그 사실을 모르면서도 규원 실장님 책임을 과장해 밀어붙인 부분이 있습니다."
          ],
          "privateKnowledge": [
            "자신의 무고함과 과장된 역공을 함께 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-3:admission:10",
              "factText": "최초 원본 반출 경로가 제3자 재사용 경로였다는 사실",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
              "id": "workplace-02:b:d-3:responsibility:11",
              "factText": "그 사실을 모르면서 상대 책임을 과장해 밀어붙인 부분",
              "tags": [
                "responsibility",
                "emotion"
              ],
              "slots": {
                "old_link": {
                  "exact": "회수되지 않은 공유링크",
                  "neutral": "그 링크"
                },
                "nojw": {
                  "exact": "노지원",
                  "neutral": "그 컨설턴트",
                  "fullName": "노지원",
                  "judgeRef": "노지원 씨"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
            "규원 실장님은 '감사 끝날 때까지 말 키우지 말자'고 했습니다. 저는 그 말이 제보를 접으라는 뜻으로 들렸습니다."
          ],
          "privateKnowledge": [
            "공식 채널 대신 구두 정리만 하자는 압박을 기억한다."
          ],
          "suppressions": [
            "HR 선행 메모는 아직 모른다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-4:quote:0",
              "factText": "감사 종료 전까지 말을 키우지 말라는 지시가 있었다는 사실",
              "tags": [
                "quote",
                "act"
              ],
              "slots": {
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-4:rule:1",
              "factText": "공식 채널 대신 구두 정리만 요구받았다는 기억",
              "tags": [
                "rule",
                "context"
              ],
              "slots": {
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hurt"
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
            "느낌만의 문제가 아닙니다. 제가 비용처리 이상 징후를 꺼내자마자 보안 얘기가 먼저 붙었습니다."
          ],
          "privateKnowledge": [
            "유출 의심과 제보 얘기가 의도적으로 섞였다고 본다."
          ],
          "suppressions": [
            "증거가 부족한 부분"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-4:context:2",
              "factText": "비용처리 이상 징후 제기 직후 보안 리스크 프레임이 붙은 사실",
              "tags": [
                "context",
                "harm"
              ],
              "slots": {
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-4:motive:3",
              "factText": "제보와 유출 의심이 의도적으로 섞였다고 느낀 상태",
              "tags": [
                "motive",
                "uncertainty"
              ],
              "slots": {
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "hurt"
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
            "HR 메모를 보면 제 느낌이 아니었다는 게 드러납니다. 제가 면담하기도 전에 '위험 인물' 취지의 분류가 먼저 들어가 있었습니다."
          ],
          "privateKnowledge": [
            "선행 낙인 구조를 처음 확인한다."
          ],
          "suppressions": [
            "자신의 감정적 반응"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-4:institution:4",
              "factText": "면담 이전에 위험 인물 취지의 인사 기록이 먼저 입력된 사실",
              "tags": [
                "institution",
                "timeline"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-4:identity:5",
              "factText": "제보 이전에 이미 위험 인물 프레임이 깔려 있었다는 구조",
              "tags": [
                "identity",
                "harm"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "evidence_hit"
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
            "그리고 같은 메모 안에 비용 건은 감사 후에 보자는 지시가 이어집니다. 제보 채널을 열어주기보다 시간을 미루며 말문을 막은 거죠."
          ],
          "privateKnowledge": [
            "정식 제보를 올리면 더 불리해질까 두려웠다."
          ],
          "suppressions": [
            "소문전에 자신도 뛰어든 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-4:rule:6",
              "factText": "비용처리 이상 징후를 감사 후로 미루라는 지시가 함께 남은 사실",
              "tags": [
                "rule",
                "act"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-4:fear:7",
              "factText": "정식 제보를 올리면 더 불리해질까 두려워진 상태",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "hurt"
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
            "저는 그때, 문제를 말하면 유출자로 바뀌고 침묵하면 공범이 되는 줄 알았습니다."
          ],
          "privateKnowledge": [
            "희생양 취급 공포가 강했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-4:fear:8",
              "factText": "제보 시도가 유출 의심과 결합되며 침묵 압박이 생긴 사실",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-4:emotion:9",
              "factText": "희생양 취급 공포가 발언을 스스로 줄이게 만든 심리",
              "tags": [
                "emotion",
                "shame"
              ],
              "slots": {
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "hurt"
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
            "규원 실장님은 제 말을 공식 채널로 올리지 못하게 하면서, 저를 먼저 위험 인물처럼 분류해 두었습니다. 그게 비공식 입막음이었습니다."
          ],
          "privateKnowledge": [
            "감정이 아니라 문서로 입증되길 원한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-4:admission:10",
              "factText": "선행 낙인과 구두 정리 지시가 결합된 비공식 입막음 사실",
              "tags": [
                "admission",
                "harm"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                }
              },
              "stanceHints": [
                "confess",
                "hurt"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-02:b:d-4:institution:11",
              "factText": "문서로 확인되는 입막음 구조를 인정받으려는 상태",
              "tags": [
                "institution",
                "responsibility"
              ],
              "slots": {
                "hr": {
                  "exact": "HR 조사 접수 메모",
                  "neutral": "그 메모"
                },
                "risk_note": {
                  "exact": "보안상 위험 인물",
                  "neutral": "그 표현"
                },
                "verbal_only": {
                  "exact": "감사 끝날 때까지 구두 정리",
                  "neutral": "그 지시"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                }
              },
              "stanceHints": [
                "confess",
                "hurt"
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
            "저는 소문을 퍼뜨린 게 아니라, 이미 제 쪽으로 몰린 얘기에 방어적으로 반응했을 뿐입니다."
          ],
          "privateKnowledge": [
            "단톡에서 '희생양'이라는 표현을 썼다."
          ],
          "suppressions": [
            "상사 비리설을 암시한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-5:denial:0",
              "factText": "소문 유포가 아니라 방어 반응이었다는 주장",
              "tags": [
                "denial",
                "emotion"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-5:quote:1",
              "factText": "비공식 대화방에서 희생양이라는 표현을 먼저 꺼낸 상태",
              "tags": [
                "quote",
                "act"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "짧게 하소연한 건 맞습니다. 하지만 그걸 소문전이라고 부르면, 먼저 불씨를 만든 쪽이 누구였는지도 같이 봐야죠."
          ],
          "privateKnowledge": [
            "자신도 반격성 발언을 했다는 건 안다."
          ],
          "suppressions": [
            "단톡 영향력"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-5:self_justification:2",
              "factText": "하소연이었을 뿐이라며 범위를 줄이는 설명",
              "tags": [
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
            },
            {
              "id": "workplace-02:b:d-5:admission:3",
              "factText": "반격성 발언이 있었다는 내적 인식",
              "tags": [
                "admission",
                "emotion"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "네, 제가 '희생양'이라는 표현을 쓴 건 맞습니다. 그때는 공식 채널보다 단톡이 더 빨리 저를 살릴 거라고 착각했습니다."
          ],
          "privateKnowledge": [
            "공식 보고를 포기한 대신 여론을 택했다."
          ],
          "suppressions": [
            "상사 비리설로 확장한 부분"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-5:quote:4",
              "factText": "공식 보고 대신 비공식 대화방에서 자신을 희생양이라 부르며 여론전을 시작한 사실",
              "tags": [
                "quote",
                "act"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-5:motive:5",
              "factText": "공식 채널을 포기하고 빠른 방어를 택한 판단",
              "tags": [
                "motive",
                "context"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "그리고 감정이 올라오면서 상사 비리설 비슷한 말까지 섞였습니다. 먼저 낙인찍힌 데 대한 반격이었지만, 결과적으로는 저도 소문을 키웠습니다."
          ],
          "privateKnowledge": [
            "규원 선행 낙인이 기폭제였다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-5:relationship:6",
              "factText": "희생양 주장에 상사 비리 추론이 더해져 소문전이 확대된 사실",
              "tags": [
                "relationship",
                "counter"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
              "id": "workplace-02:b:d-5:motive:7",
              "factText": "선행 낙인이 반격성 소문을 촉발한 상태",
              "tags": [
                "motive",
                "harm"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "scapegoat": {
                  "exact": "'희생양'",
                  "neutral": "그 표현"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
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
            "저는 억울함을 사실 정리보다 먼저 앞세웠습니다. 그래서 로그와 시각을 말하면서도 사람들의 의도를 단정하는 문장이 같이 섞였습니다."
          ],
          "privateKnowledge": [
            "cold_logic 말투가 무너지며 단정이 빨라졌다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-5:emotion:8",
              "factText": "억울함이 커지며 로그 설명과 의도 추론이 섞여 단정이 빨라진 사실",
              "tags": [
                "emotion",
                "quote"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-5:relationship:9",
              "factText": "평소의 건조한 말투가 감정에 밀린 심리",
              "tags": [
                "relationship",
                "emotion"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
            "공식 조사 전에 저도 소문전에 가담했습니다. 먼저 살아남고 싶어서 단톡과 주변 말에 기대 상사 비리설까지 키웠습니다."
          ],
          "privateKnowledge": [
            "방어와 확산을 함께 했다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-02:b:tell:log_recital",
            "workplace-02:b:tell:precision_wall",
            "workplace-02:b:tell:jaw_set_pause"
          ],
          "claimAtoms": [
            {
              "id": "workplace-02:b:d-5:admission:10",
              "factText": "자기보호 명분 아래 공식 조사 전 소문 확산에 가담한 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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
              "id": "workplace-02:b:d-5:responsibility:11",
              "factText": "방어를 이유로 확산까지 수행한 책임",
              "tags": [
                "responsibility",
                "motive"
              ],
              "slots": {
                "group_chat": {
                  "exact": "단톡 발언",
                  "neutral": "그 말"
                },
                "gyuwon": {
                  "exact": "한규원",
                  "neutral": "그 상사",
                  "fullName": "한규원",
                  "judgeRef": "규원 씨"
                },
                "mina": {
                  "exact": "조민아",
                  "neutral": "그 직원",
                  "fullName": "조민아",
                  "judgeRef": "민아 씨"
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


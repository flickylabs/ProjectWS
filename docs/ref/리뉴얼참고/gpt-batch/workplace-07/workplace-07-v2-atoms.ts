export const workplace07V2Atoms = {
  "caseId": "workplace-07",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 익명 글 작성자를 특정해 한세린 씨를 찍어낸 적이 없습니다."
          ],
          "privateKnowledge": [
            "익명 글 직후 가장 먼저 한세린 씨를 유력 작성자로 의심했다."
          ],
          "suppressions": [
            "팀 미팅에서 특정 제보자를 암시하는 표현을 먼저 꺼낸 사실."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-1:denial:0",
              "factText": "익명 글 작성자를 특정하지 않았다는 주장",
              "tags": [
                "denial",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "익명 글 게시 직후",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 직후",
                  "period": "초기 대응"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-1:self_justification:0",
              "factText": "리뷰 참여 조정이 단순 운영 판단이었다는 설명",
              "tags": [
                "self_justification",
                "act"
              ],
              "slots": {
                "action": {
                  "exact": "리뷰 참여 조정",
                  "neutral": "그 조치"
                },
                "time": {
                  "exact": "익명 글 게시 직후",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 직후",
                  "period": "초기 대응"
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
            "유력 작성자 추정은 했지만 공식 지목이나 낙인은 아니었습니다."
          ],
          "privateKnowledge": [
            "이미 세린을 문제 인원처럼 보는 시선이 팀 안에 생기도록 내버려 두었다."
          ],
          "suppressions": [
            "공식 지목이 아니었다는 말 뒤에 숨어 팀 분위기를 방치한 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-1:uncertainty:0",
              "factText": "유력 작성자 추정이 있었지만 공식 특정은 아니었다는 주장",
              "tags": [
                "uncertainty",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "익명 글 게시 후 두 시간 이내",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 후 두 시간 이내",
                  "period": "게시 직후"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-1:self_justification:1",
              "factText": "배제를 보호적 분리로 부르며 낙인 효과를 줄여 말하는 설명",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "label": {
                  "exact": "보호적 분리",
                  "neutral": "그 표현"
                },
                "action": {
                  "exact": "역할 재배치",
                  "neutral": "그 재배치"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "익명 글 직후 한세린 씨를 유력 작성자로 본 건 맞습니다. 다만 혼선을 막으려는 판단이었습니다."
          ],
          "privateKnowledge": [
            "포렌식보다 먼저 추정과 배제를 동시에 돌렸다."
          ],
          "suppressions": [
            "의심과 조치를 같은 시점에 밀어 넣은 시간 순서."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-1:admission:0",
              "factText": "익명 글 직후 세린을 유력 작성자로 의심했다는 사실",
              "tags": [
                "admission",
                "identity",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "익명 글 게시 후 두 시간 이내",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 후 두 시간 이내",
                  "period": "게시 직후"
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
              "id": "workplace-07:a:d-1:motive:0",
              "factText": "혼선 방지라는 명목으로 보호보다 통제를 우선했다는 사실",
              "tags": [
                "motive",
                "self_justification"
              ],
              "slots": {
                "label": {
                  "exact": "보호적 분리",
                  "neutral": "그 표현"
                },
                "institution": {
                  "exact": "품질보증팀",
                  "neutral": "그 팀"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "리뷰 제외와 부정적 코멘트 입력은 있었습니다. 그래도 익명 글 확산 책임도 함께 봐야 합니다."
          ],
          "privateKnowledge": [
            "배제 조치가 한세린 씨를 사실상 유력 작성자로 굳히는 효과를 냈다."
          ],
          "suppressions": [
            "자신의 선행 낙인이 이후 여론과 평가에 미친 영향."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-1:act:0",
              "factText": "포렌식 전 리뷰 참여 제외와 부정적 평가 코멘트가 입력됐다는 사실",
              "tags": [
                "act",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "action": {
                  "exact": "리뷰 참여 제외와 평가 코멘트 입력",
                  "neutral": "그 조치"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-1:counter:0",
              "factText": "세린의 익명 글 확산을 내세워 자신의 선행 낙인을 상쇄하려는 태도",
              "tags": [
                "counter",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "evidence": {
                  "exact": "익명 게시글 보존본과 팀 미팅 메모",
                  "neutral": "그 자료"
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
            "익명 글로 제가 증거인멸을 지시한 관리자처럼 굳어질까 두려웠습니다."
          ],
          "privateKnowledge": [
            "제보자 보호보다 자신의 라인 평판 방어를 먼저 택했다."
          ],
          "suppressions": [
            "평판 공포가 과민 대응의 핵심 동기였다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-1:fear:0",
              "factText": "증거인멸 지시 관리자라는 낙인에 대한 두려움",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "harm": {
                  "exact": "증거인멸 지시 관리자라는 낙인",
                  "neutral": "그 낙인"
                },
                "institution": {
                  "exact": "품질총괄 라인",
                  "neutral": "상부 라인"
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
              "id": "workplace-07:a:d-1:motive:1",
              "factText": "평판 방어 때문에 익명 제보자 보호 원칙을 뒤로 미뤘다는 사실",
              "tags": [
                "motive",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "익명 제보자 보호",
                  "neutral": "그 원칙"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "포렌식 전에 한세린 씨를 문제 인원처럼 다루고 역할에서 밀어낸 건 제 잘못입니다."
          ],
          "privateKnowledge": [
            "보호적 분리라는 말은 사실상 보복성 대응을 가리는 덮개였다."
          ],
          "suppressions": [
            "배제가 보호가 아니라 보복이었음을 끝까지 말하지 않은 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-1:admission:1",
              "factText": "포렌식 전 세린을 문제 인원처럼 다룬 대응을 스스로 인정하는 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:a:d-1:relationship:0",
              "factText": "보호적 분리가 실제로는 보복성 대응이었다는 사실",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "label": {
                  "exact": "보호적 분리",
                  "neutral": "그 표현"
                },
                "truth": {
                  "exact": "보복성 대응",
                  "neutral": "실제 성격"
                }
              },
              "stanceHints": [
                "confess",
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
            "2년 전 저는 한세린 씨의 품질 우려를 묵살한 적이 없습니다."
          ],
          "privateKnowledge": [
            "등급 표현을 낮추자고 먼저 말한 쪽은 자신이었다."
          ],
          "suppressions": [
            "당시 회의에서 제안한 '표현 조정'의 시작점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-4:denial:0",
              "factText": "과거 제보 축소가 없었다는 주장",
              "tags": [
                "denial",
                "legacy_sentence"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-4:self_justification:0",
              "factText": "등급 조정 논의가 절차 관리였다는 설명",
              "tags": [
                "self_justification",
                "rule"
              ],
              "slots": {
                "label": {
                  "exact": "표현 조정",
                  "neutral": "그 표현"
                },
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "제가 말한 건 외부 공포를 막기 위한 문구 조정이었지, 문제를 없애자는 뜻은 아니었습니다."
          ],
          "privateKnowledge": [
            "공개 제기를 만류한 뒤 후속 메일까지 살폈다."
          ],
          "suppressions": [
            "문구 조정이라는 표현 뒤에 남은 실질적 개입."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-4:self_justification:1",
              "factText": "고객 공포 방지 명목으로 문구 조정을 정당화하는 설명",
              "tags": [
                "self_justification",
                "fear"
              ],
              "slots": {
                "quote": {
                  "exact": "'외부 공포를 키우지 말자'",
                  "neutral": "그 문장"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
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
              "id": "workplace-07:a:d-4:uncertainty:0",
              "factText": "문제 자체를 지운 건 아니라는 경계선 긋기",
              "tags": [
                "uncertainty",
                "context"
              ],
              "slots": {
                "label": {
                  "exact": "표현 조정",
                  "neutral": "그 표현"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "등급 표현을 낮추자고 한 건 맞습니다. 다만 당시엔 파장 관리가 더 급했습니다."
          ],
          "privateKnowledge": [
            "세린의 원안을 낮은 등급 문안으로 돌리는 데 실제로 개입했다."
          ],
          "suppressions": [
            "파장 관리 명분으로 원안 방향을 꺾은 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-4:admission:0",
              "factText": "2년 전 등급 표현을 낮추자고 직접 제안했다는 사실",
              "tags": [
                "admission",
                "legacy_sentence",
                "act"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "quote": {
                  "exact": "'등급 표현을 낮추자'",
                  "neutral": "그 제안"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-4:motive:0",
              "factText": "고객 공포와 출하 압박을 이유로 파장 관리를 우선했다는 사실",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "fear": {
                  "exact": "고객 공포와 출하 압박",
                  "neutral": "그 부담"
                },
                "institution": {
                  "exact": "품질 대응 라인",
                  "neutral": "그 라인"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "공개 제기를 만류하고 후속 메일까지 본 건 사실입니다. 그래도 당시 부담도 함께 보셔야 합니다."
          ],
          "privateKnowledge": [
            "만류와 문안 조정이 합쳐져 실질적 축소가 됐다."
          ],
          "suppressions": [
            "공개 제기 만류 자체가 개입이었다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-4:act:0",
              "factText": "세린의 공개 제기를 만류하고 후속 메일 체인을 관리한 사실",
              "tags": [
                "act",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "document": {
                  "exact": "후속 메일 체인",
                  "neutral": "그 메일"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-4:counter:0",
              "factText": "당시 조직 부담을 내세워 개입의 무게를 낮추려는 태도",
              "tags": [
                "counter",
                "self_justification"
              ],
              "slots": {
                "fear": {
                  "exact": "외부 확산 부담",
                  "neutral": "그 부담"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "솔직히 말씀드리면 고객 반응과 출하 문제가 더 무서워서 제보를 눌렀습니다."
          ],
          "privateKnowledge": [
            "두려움을 이유로 옳지 않은 개입을 반복했다."
          ],
          "suppressions": [
            "공포를 명분 삼아 제보를 약화시킨 반복 패턴."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-4:fear:0",
              "factText": "고객 반응과 출하 문제가 결정의 중심 공포였다는 사실",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "fear": {
                  "exact": "고객 반응과 출하 문제",
                  "neutral": "그 공포"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
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
              "id": "workplace-07:a:d-4:motive:1",
              "factText": "공포 때문에 제보를 살리기보다 눌렀다는 사실",
              "tags": [
                "motive",
                "responsibility"
              ],
              "slots": {
                "label": {
                  "exact": "표현 조정",
                  "neutral": "그 표현"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "2년 전 제보 축소와 이번 평가 개입이 이어진 건 제 잘못입니다."
          ],
          "privateKnowledge": [
            "과거의 개입이 현재 보복성 코멘트까지 이어졌다는 걸 안다."
          ],
          "suppressions": [
            "과거와 현재가 연결된 패턴임을 숨겨 온 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-4:admission:1",
              "factText": "과거 제보 축소와 현재 평가 개입을 하나의 책임으로 인정하는 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전과 현재",
                  "neutral": "두 시점",
                  "dateExact": "2년 전과 현재",
                  "period": "반복 패턴"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:a:d-4:legacy_sentence:0",
              "factText": "과거 개입이 현재의 불이익성 코멘트로 이어졌다는 사실",
              "tags": [
                "legacy_sentence",
                "harm"
              ],
              "slots": {
                "action": {
                  "exact": "제보 축소와 평가 개입",
                  "neutral": "그 반복"
                },
                "evidence": {
                  "exact": "윤리경영 접수기록과 인사 개입 로그",
                  "neutral": "그 로그"
                }
              },
              "stanceHints": [
                "confess",
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
            "저는 과거 미종결 사건을 끌어와 한세린 씨를 과장된 사람처럼 몰지 않았습니다."
          ],
          "privateKnowledge": [
            "현재 건과 과거 건을 인위적으로 잘라 말하면 자신에게 유리하다는 걸 알고 있었다."
          ],
          "suppressions": [
            "과거 사건 분리 프레임을 방어 논리로 쓴 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-5:denial:0",
              "factText": "과거 사건 재활용이 없었다는 주장",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-5:self_justification:0",
              "factText": "현재 판단 기준을 따로 세우려 했을 뿐이라는 설명",
              "tags": [
                "self_justification",
                "rule"
              ],
              "slots": {
                "label": {
                  "exact": "현재 건은 현재 건입니다",
                  "neutral": "그 선 긋기"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "deny",
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "현재 건을 따로 보자는 뜻이었지, 과거를 무기로 쓰려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "그 선 긋기가 오히려 세린의 신뢰를 깎는 방향으로 작동했다."
          ],
          "suppressions": [
            "중립적 분리처럼 말했지만 실제 효과는 불리익 프레임이었다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-5:uncertainty:0",
              "factText": "분리 의도는 있었지만 공격 의도는 아니었다는 주장",
              "tags": [
                "uncertainty",
                "context"
              ],
              "slots": {
                "label": {
                  "exact": "현재 건은 현재 건입니다",
                  "neutral": "그 선 긋기"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-5:self_justification:1",
              "factText": "보호적 분리라는 말로 과거 연결성을 차단하려는 태도",
              "tags": [
                "self_justification",
                "relationship"
              ],
              "slots": {
                "label": {
                  "exact": "보호적 분리",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "hedge"
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
            "제가 과거 사건을 떼어 놓으며 한세린 씨 문제제기의 신뢰를 낮춰 보이게 한 건 맞습니다."
          ],
          "privateKnowledge": [
            "과거 미종결을 언급받을수록 더 강하게 선을 그었다."
          ],
          "suppressions": [
            "상대를 '또 과장한다'는 프레임으로 읽히게 한 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-5:admission:0",
              "factText": "과거 사건 분리 논리가 세린의 현재 신뢰를 깎는 효과를 냈다는 사실",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "label": {
                  "exact": "현재 건은 현재 건입니다",
                  "neutral": "그 선 긋기"
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
              "id": "workplace-07:a:d-5:harm:0",
              "factText": "상대를 반복적으로 과장하는 사람처럼 보이게 만든 사실",
              "tags": [
                "harm",
                "identity"
              ],
              "slots": {
                "quote": {
                  "exact": "'또 과장한다'",
                  "neutral": "그 프레임"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "그렇게 선을 그은 건 맞지만, 한세린 씨도 과거를 현재 허위 캡처와 붙였습니다."
          ],
          "privateKnowledge": [
            "자신의 재활용과 상대의 과장을 서로 상쇄시키려 한다."
          ],
          "suppressions": [
            "공동 책임을 말하며 자기 쪽의 시작점을 흐리는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-5:counter:0",
              "factText": "세린의 허위 캡처 결합을 들어 자신의 프레임 재활용을 상쇄하려는 태도",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-07:a:d-5:act:0",
              "factText": "과거 미종결 사건을 현재 평가 재료로 다시 호출한 사실",
              "tags": [
                "act",
                "legacy_sentence"
              ],
              "slots": {
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                },
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "과거 사건이 다시 소환될수록 저는 평판을 지키려는 쪽으로 더 강하게 움직였습니다."
          ],
          "privateKnowledge": [
            "과거 미종결 자체가 두려움의 방아쇠였다."
          ],
          "suppressions": [
            "평판 공포 때문에 선 긋기가 더 거칠어졌다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-5:fear:0",
              "factText": "과거 미종결 사건 재소환이 평판 공포를 자극했다는 사실",
              "tags": [
                "fear",
                "context"
              ],
              "slots": {
                "fear": {
                  "exact": "품질은폐 관리자라는 평판",
                  "neutral": "그 평판"
                },
                "time": {
                  "exact": "과거 사건 재소환 국면",
                  "neutral": "그 국면",
                  "dateExact": "재조명 시점",
                  "period": "재조명 국면"
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
              "id": "workplace-07:a:d-5:emotion:0",
              "factText": "두려움 때문에 과거와 현재를 억지로 끊어 말한 사실",
              "tags": [
                "emotion",
                "self_justification"
              ],
              "slots": {
                "label": {
                  "exact": "현재 건은 현재 건입니다",
                  "neutral": "그 선 긋기"
                },
                "label2": {
                  "exact": "과거와 현재의 강한 분리",
                  "neutral": "그 선 긋기"
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
            "과거 미종결 사건을 제 방어 논리로 써서 한세린 씨 신뢰를 깎은 건 제 책임입니다."
          ],
          "privateKnowledge": [
            "공동 책임을 말하기 전에 자신의 재활용부터 인정해야 한다는 걸 안다."
          ],
          "suppressions": [
            "상대를 과장된 사람으로 보이게 만든 자기 역할."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-5:admission:1",
              "factText": "과거 미종결 사건을 현재 방어 논리로 사용한 책임을 인정하는 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "action": {
                  "exact": "현재 방어 논리로 사용",
                  "neutral": "그 사용"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:a:d-5:relationship:0",
              "factText": "그 재활용이 세린의 신뢰를 깎는 방향으로 작동했다는 사실",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "quote": {
                  "exact": "'또 과장한다'",
                  "neutral": "그 인상"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "confess",
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
            "한세린 씨가 익명 게시글로 저를 현재 범죄자처럼 몰아간 건 사실입니다."
          ],
          "privateKnowledge": [
            "캡처가 잘린 상태라는 점을 처음부터 알고 있었다."
          ],
          "suppressions": [
            "내 과거 대응이 이런 프레임이 먹히는 배경이 됐다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-2:act:0",
              "factText": "익명 게시글이 자신을 현재 범죄자처럼 보이게 만들었다는 주장",
              "tags": [
                "act",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "place": {
                  "exact": "사내 익명 게시판",
                  "neutral": "그 게시판"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "잘린 캡처와 게시판 확산은 절차를 벗어난 방식이었습니다."
          ],
          "privateKnowledge": [
            "형식 공격만으로는 문제의 배경이 설명되지 않는다는 것도 안다."
          ],
          "suppressions": [
            "절차 위반만 강조하며 자신의 과거 책임을 뒤로 미루는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-2:rule:0",
              "factText": "잘린 캡처와 게시판 확산이 절차를 벗어난 방식이라는 사실",
              "tags": [
                "rule",
                "evidence"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                },
                "place": {
                  "exact": "익명 게시판",
                  "neutral": "그 공간"
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
              "id": "workplace-07:a:d-2:counter:0",
              "factText": "절차 위반을 앞세워 배경 책임을 미루려는 태도",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "한세린 씨가 캡처를 익명 글에 붙여 올린 건 맞습니다."
          ],
          "privateKnowledge": [
            "이 시점부터 자신에게 유리한 절차 논리를 전면에 세운다."
          ],
          "suppressions": [
            "유포 사실을 말하며 배경 불신은 여전히 줄이는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-2:evidence:0",
              "factText": "세린이 캡처를 익명 글에 붙여 올렸다는 사실",
              "tags": [
                "evidence",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-2:harm:0",
              "factText": "익명 글 유포가 자신의 평판에 준 직접 피해",
              "tags": [
                "harm",
                "emotion"
              ],
              "slots": {
                "harm": {
                  "exact": "현재 범죄자처럼 보이는 평판 손상",
                  "neutral": "그 피해"
                },
                "time": {
                  "exact": "익명 글 게시 이후 확산 국면",
                  "neutral": "그 뒤",
                  "dateExact": "익명 글 게시 이후",
                  "period": "확산 국면"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "유포 책임은 분명합니다. 다만 그런 프레임이 먹힌 배경에 제 과거 대응도 있었다는 점은 부인하지 않겠습니다."
          ],
          "privateKnowledge": [
            "진짜와 가짜가 섞이게 된 토양을 자신도 만들었다."
          ],
          "suppressions": [
            "상대 책임을 말하며 토양 제공 책임을 최소화하는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-2:counter:1",
              "factText": "세린의 유포 책임이 크다는 지적",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-07:a:d-2:context:0",
              "factText": "자신의 과거 대응이 그 프레임이 먹히는 토양이 됐다는 사실",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
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
            "회사 전체가 보는 게시판에 제 이름이 그렇게 소비된 게 두려웠습니다."
          ],
          "privateKnowledge": [
            "분노보다 평판 공포가 먼저 올라왔다."
          ],
          "suppressions": [
            "피해 감정을 말하지만 선행 책임도 함께 존재한다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-2:fear:0",
              "factText": "게시판 확산으로 인한 평판 공포",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "place": {
                  "exact": "회사 전체가 보는 게시판",
                  "neutral": "그 공간"
                },
                "harm": {
                  "exact": "증거인멸 관리자 이미지",
                  "neutral": "그 이미지"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:a:d-2:emotion:0",
              "factText": "평판 공포가 절차 집착을 더 강하게 만들었다는 사실",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "rule": {
                  "exact": "절차 준수 집착",
                  "neutral": "그 반응"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "한세린 씨의 유포 책임은 분명하지만, 그 말이 쉽게 사실처럼 굳도록 만든 제 과거 대응도 인정합니다."
          ],
          "privateKnowledge": [
            "상대의 허위 유포와 자신의 과거 행위를 분리해 봐야 한다."
          ],
          "suppressions": [
            "허위 유포를 비판하면서도 자신의 배경 책임을 끝내 작게 말해 온 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-2:responsibility:0",
              "factText": "세린의 유포 책임과 자신의 배경 책임을 함께 본다는 사실",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                },
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "confess",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:a:d-2:legacy_sentence:0",
              "factText": "과거 대응이 현재 프레임의 설득력을 키웠다는 사실",
              "tags": [
                "legacy_sentence",
                "harm"
              ],
              "slots": {
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                },
                "time": {
                  "exact": "과거와 현재 연결선",
                  "neutral": "그 연결",
                  "dateExact": "2년 전부터 현재까지",
                  "period": "누적"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "그 핵심 스크린샷은 이번 사건의 원본이 아닙니다."
          ],
          "privateKnowledge": [
            "포렌식이 나오기 전부터 잘린 흔적을 느꼈다."
          ],
          "suppressions": [
            "그럼에도 자신의 과거 압박 문장이 편집에 재사용될 수 있다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-3:denial:0",
              "factText": "문제 스크린샷이 이번 사건 원본이 아니라는 주장",
              "tags": [
                "denial",
                "evidence"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "현재 채널 헤더와 본문 흐름이 자연스럽지 않다는 점은 처음부터 보였습니다."
          ],
          "privateKnowledge": [
            "편집 의혹을 설명하면서도 과거 문장의 재사용 가능성은 숨긴다."
          ],
          "suppressions": [
            "자신의 과거 대화가 재료가 되었을 수 있다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-3:evidence:0",
              "factText": "현재 채널 헤더와 본문 흐름이 어색하다는 판단",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                },
                "document": {
                  "exact": "현재 채널 헤더",
                  "neutral": "그 헤더"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-3:uncertainty:0",
              "factText": "편집 구조만 말하고 과거 문장 재사용 가능성은 말하지 않는 태도",
              "tags": [
                "uncertainty",
                "legacy_sentence"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "원본 export와 대조하면 2년 전 문장과 현재 헤더가 섞여 있습니다."
          ],
          "privateKnowledge": [
            "자신의 과거 압박 문장이 현 사건처럼 보이게 쓰였다."
          ],
          "suppressions": [
            "과거 진짜 문제 문장이 편집본 설득력을 키운 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-3:evidence:1",
              "factText": "2년 전 문장과 현재 헤더가 섞였다는 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
              "slots": {
                "evidence": {
                  "exact": "원본 export와 해시 비교표",
                  "neutral": "그 비교표"
                },
                "time": {
                  "exact": "2년 전 문장과 현재 헤더",
                  "neutral": "서로 다른 시점",
                  "dateExact": "2년 전과 현재",
                  "period": "혼합 시점"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:a:d-3:legacy_sentence:0",
              "factText": "자신의 과거 압박 문장이 편집본 설득력에 쓰였다는 사실",
              "tags": [
                "legacy_sentence",
                "harm"
              ],
              "slots": {
                "quote": {
                  "exact": "'지워, 밖으로 나가기 전에' 계열 압박 문장",
                  "neutral": "그 문장"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "현 시점 원본은 아니지만, 과거 패턴 때문에 사람들은 쉽게 믿었습니다."
          ],
          "privateKnowledge": [
            "편집본의 허위성과 자신의 과거 책임을 분리해 말한다."
          ],
          "suppressions": [
            "과거 패턴이 있었다는 점을 여전히 최소화하는 태도."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-3:counter:0",
              "factText": "현 시점 원본이 아니라는 점을 중심으로 반박하는 태도",
              "tags": [
                "counter",
                "evidence"
              ],
              "slots": {
                "evidence": {
                  "exact": "원본 export와 해시 비교표",
                  "neutral": "그 비교표"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-07:a:d-3:context:0",
              "factText": "과거 패턴이 의혹의 설득력을 키웠다는 사실",
              "tags": [
                "context",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
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
            "제가 실제 증거인멸 지시 관리자처럼 굳어지는 게 가장 두려웠습니다."
          ],
          "privateKnowledge": [
            "허위 캡처를 반박하면서도 과거 문장의 책임에서 완전히 자유롭지 않다."
          ],
          "suppressions": [
            "평판 공포와 과거 책임이 동시에 걸려 있다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-3:fear:0",
              "factText": "허위 캡처로 증거인멸 관리자 이미지가 굳는 것에 대한 두려움",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "harm": {
                  "exact": "증거인멸 관리자 이미지",
                  "neutral": "그 이미지"
                },
                "place": {
                  "exact": "사내 게시판과 본부 여론",
                  "neutral": "그 여론"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:a:d-3:emotion:0",
              "factText": "허위 반박 속에도 과거 문장 책임이 남아 있다는 압박",
              "tags": [
                "emotion",
                "legacy_sentence"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "evidence": {
                  "exact": "포렌식 레이어 분석과 편집 PC 로그",
                  "neutral": "그 포렌식 자료"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "그 캡처는 현 시점 원본이 아니지만, 제 과거 대응이 그런 허위를 쉽게 믿게 만든 건 인정합니다."
          ],
          "privateKnowledge": [
            "지금 문제와 과거 문제를 분리하되 둘 다 책임져야 한다."
          ],
          "suppressions": [
            "자신의 과거가 허위 프레임의 토양이 된 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:a:tell:context_split",
            "workplace-07:a:tell:format_attack",
            "workplace-07:a:tell:cool_relabel"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:a:d-3:admission:0",
              "factText": "스크린샷이 현 시점 원본이 아님을 확정하면서도 과거 책임을 함께 인정하는 사실",
              "tags": [
                "admission",
                "evidence",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "원본 export와 해시 비교표",
                  "neutral": "그 비교표"
                },
                "time": {
                  "exact": "현재와 과거의 분리",
                  "neutral": "그 구분",
                  "dateExact": "현재 사건과 2년 전 사건",
                  "period": "분리 판단"
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
              "id": "workplace-07:a:d-3:responsibility:0",
              "factText": "과거 대응이 허위 프레임의 토양이 됐다는 사실",
              "tags": [
                "responsibility",
                "legacy_sentence"
              ],
              "slots": {
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                },
                "person": {
                  "exact": "한세린",
                  "neutral": "상대방",
                  "fullName": "한세린",
                  "judgeRef": "한세린 씨"
                }
              },
              "stanceHints": [
                "confess"
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
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "장태욱 씨는 포렌식 결과도 나오기 전에 저를 유력 작성자처럼 다뤘어요."
          ],
          "privateKnowledge": [
            "팀 회의 뒤 바로 자신이 문제 인원처럼 읽힌다는 걸 느꼈다."
          ],
          "suppressions": [
            "제가 익명 글을 올린 사실이 있어도 선행 낙인은 별개라는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-1:act:0",
              "factText": "포렌식 전 유력 작성자처럼 취급받았다는 주장",
              "tags": [
                "act",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "time": {
                  "exact": "익명 글 게시 후 두 시간 이내",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 후 두 시간 이내",
                  "period": "게시 직후"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "이름을 직접 부르진 않았어도, 회의와 재배치 흐름은 다 저를 향하고 있었어요."
          ],
          "privateKnowledge": [
            "공식 지목이 없었다는 틈을 이용해 낙인 효과가 숨겨졌다."
          ],
          "suppressions": [
            "익명 글 작성과 선행 보복은 다른 판단이어야 한다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-1:context:0",
              "factText": "공식 지목 없이도 회의와 재배치 흐름이 자신을 향했다는 사실",
              "tags": [
                "context",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "익명 게시글 보존본과 팀 미팅 메모",
                  "neutral": "그 자료"
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
              "id": "workplace-07:b:d-1:counter:0",
              "factText": "공식 지목 부재를 이유로 낙인 효과를 지우려는 상대 논리",
              "tags": [
                "counter",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "익명 글 직후 저를 유력 작성자로 의심하고 리뷰 참여까지 건드린 건 맞아요."
          ],
          "privateKnowledge": [
            "의심과 배제가 거의 동시에 왔다."
          ],
          "suppressions": [
            "제 익명 글이 있었다는 이유로 그 순서를 정당화하려는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-1:evidence:0",
              "factText": "포렌식 전 의심과 리뷰 개입이 같이 진행됐다는 사실",
              "tags": [
                "evidence",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "윤리경영 접수기록과 인사 개입 로그",
                  "neutral": "그 로그"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-1:harm:0",
              "factText": "그 조치가 자신을 문제 인원처럼 굳혔다는 사실",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "action": {
                  "exact": "리뷰 참여 제외",
                  "neutral": "그 배제"
                },
                "time": {
                  "exact": "익명 글 게시 직후",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 직후",
                  "period": "초기 대응"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "제가 익명 글을 올린 책임과, 장태욱 씨가 저를 먼저 찍어낸 책임은 따로 봐야 해요."
          ],
          "privateKnowledge": [
            "상대의 선행 낙인이 제 확산 행동에도 영향을 줬다."
          ],
          "suppressions": [
            "제 쪽 잘못을 인정하면서도 그 순서를 계속 분리하려는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-1:counter:1",
              "factText": "자신의 익명 글 책임과 상대의 선행 낙인을 분리해야 한다는 주장",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "익명 게시글 보존본과 팀 미팅 메모",
                  "neutral": "그 자료"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "workplace-07:b:d-1:context:1",
              "factText": "선행 낙인이 이후 자신의 확산 행동에 영향을 줬다는 사실",
              "tags": [
                "context",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "익명 글 게시 이후 확산 국면",
                  "neutral": "그 뒤",
                  "dateExact": "익명 글 게시 이후",
                  "period": "확산 국면"
                },
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
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
            "그 회의 뒤부터 또 조용히 밀려날 거라는 공포가 확 올라왔어요."
          ],
          "privateKnowledge": [
            "과거 묵살 경험이 현재 선행 낙인 공포를 증폭시켰다."
          ],
          "suppressions": [
            "감정의 배경이 과거와 현재를 같이 누르고 있다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-1:fear:0",
              "factText": "회의와 재배치 뒤 다시 밀려날 것 같은 공포",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "익명 글 게시 직후",
                  "neutral": "그 직후",
                  "dateExact": "익명 글 게시 직후",
                  "period": "초기 대응"
                },
                "harm": {
                  "exact": "다시 조용히 밀려나는 상황",
                  "neutral": "그 공포"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-1:legacy_sentence:0",
              "factText": "과거 묵살 경험이 현재 선행 낙인 공포를 키웠다는 사실",
              "tags": [
                "legacy_sentence",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "장태욱 씨가 포렌식 전 저를 문제 인원처럼 다룬 건 분명한 보복성 대응이었어요. 다만 제 익명 글 확산 책임도 따로 남아요."
          ],
          "privateKnowledge": [
            "상대 책임과 자기 책임을 분리해 말할 준비가 되어 있다."
          ],
          "suppressions": [
            "상대의 선행 낙인과 내 확산 행위를 하나로 뭉개지 않으려는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-1:responsibility:0",
              "factText": "상대의 보복성 대응과 자신의 확산 책임을 분리해 보는 사실",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "윤리경영 접수기록과 인사 개입 로그",
                  "neutral": "그 로그"
                }
              },
              "stanceHints": [
                "confess",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-1:admission:0",
              "factText": "포렌식 전 문제 인원 취급이 실제로 있었다는 사실",
              "tags": [
                "admission",
                "harm"
              ],
              "slots": {
                "action": {
                  "exact": "문제 인원처럼 다뤄진 대응",
                  "neutral": "그 대응"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "confess"
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
            "장태욱 씨는 2년 전에도 제 품질 우려를 낮은 등급으로 돌렸어요."
          ],
          "privateKnowledge": [
            "그때의 만류와 조정이 단순 문구 문제는 아니었다."
          ],
          "suppressions": [
            "저도 그 사건을 오래 품고 있어 감정이 섞인다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-4:act:0",
              "factText": "2년 전 품질 우려를 낮은 등급으로 돌렸다는 주장",
              "tags": [
                "act",
                "legacy_sentence"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "문제 자체를 부정한 건 아니라고 해도, 공개 제기를 못 하게 만든 건 맞아요."
          ],
          "privateKnowledge": [
            "태욱의 말이 공식 재조사를 막는 방향으로 작동했다."
          ],
          "suppressions": [
            "문구 조정이라는 표현이 실질 억압을 가린다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-4:context:0",
              "factText": "문제 부정은 아니었어도 공개 제기를 막는 효과가 있었다는 사실",
              "tags": [
                "context",
                "rule"
              ],
              "slots": {
                "label": {
                  "exact": "표현 조정",
                  "neutral": "그 표현"
                },
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
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
              "id": "workplace-07:b:d-4:counter:0",
              "factText": "문구 조정이라는 표현이 실질 억압을 가리는 태도",
              "tags": [
                "counter",
                "self_justification"
              ],
              "slots": {
                "quote": {
                  "exact": "'외부 공포를 키우지 말자'",
                  "neutral": "그 문장"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "회의록과 메일을 보면 등급 표현을 낮추자는 방향을 장태욱 씨가 먼저 잡은 게 보여요."
          ],
          "privateKnowledge": [
            "원안이 실제로 꺾였고, 저는 그 뒤로 공식 채널을 믿지 못하게 됐다."
          ],
          "suppressions": [
            "과거 억압이 현재 행동 배경이 되지만 이번 편집 책임까지 없애 주진 않는다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-4:evidence:0",
              "factText": "회의록과 메일이 태욱의 선행 방향 설정을 보여 준다는 사실",
              "tags": [
                "evidence",
                "legacy_sentence"
              ],
              "slots": {
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                },
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-4:harm:0",
              "factText": "그 뒤로 공식 채널을 믿지 못하게 됐다는 사실",
              "tags": [
                "harm",
                "emotion"
              ],
              "slots": {
                "rule": {
                  "exact": "공식 채널 불신",
                  "neutral": "그 불신"
                },
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                }
              },
              "stanceHints": [
                "partial"
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
            "그때 장태욱 씨가 만든 억압 패턴이 이번에도 이어졌다고 저는 느꼈어요. 그래도 이번 편집 증거 문제는 별도로 보셔야 해요."
          ],
          "privateKnowledge": [
            "과거 억압과 현재 허위 편집을 분리해야 한다는 걸 안다."
          ],
          "suppressions": [
            "과거 억압을 강조하면서 현재 책임을 흐릴 유혹."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-4:legacy_sentence:0",
              "factText": "과거 억압 패턴이 현재에도 이어졌다고 느낀다는 사실",
              "tags": [
                "legacy_sentence",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "time": {
                  "exact": "2년 전부터 현재까지",
                  "neutral": "그 연속",
                  "dateExact": "2년 전부터 현재까지",
                  "period": "연속 패턴"
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
              "id": "workplace-07:b:d-4:responsibility:0",
              "factText": "과거 억압과 현재 편집 문제를 분리해야 한다는 인식",
              "tags": [
                "responsibility",
                "counter"
              ],
              "slots": {
                "evidence": {
                  "exact": "포렌식 레이어 분석과 편집 PC 로그",
                  "neutral": "그 포렌식 자료"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "그때 묵살당한 기억이 아직도 남아서, 같은 사람이 다시 평가권을 쥔 게 정말 무서웠어요."
          ],
          "privateKnowledge": [
            "과거 상처가 현재 판단을 더 극단으로 몰았다."
          ],
          "suppressions": [
            "상처가 현재 과잉 대응의 배경이 된다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-4:fear:0",
              "factText": "과거 묵살 기억 때문에 같은 관리자를 다시 상대하는 공포",
              "tags": [
                "fear",
                "legacy_sentence"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-4:emotion:0",
              "factText": "과거 상처가 현재 판단을 더 극단으로 몰았다는 사실",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                },
                "harm": {
                  "exact": "과잉 대응으로 기우는 판단",
                  "neutral": "그 기울기"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "장태욱 씨의 과거 제보 축소와 현재 평가 개입은 실제 문제예요. 다만 그 사실이 제 편집 행위를 정당화하진 않아요."
          ],
          "privateKnowledge": [
            "상대의 실제 잘못과 자기의 현재 잘못을 분리해 본다."
          ],
          "suppressions": [
            "상대 잘못이 내 위법성을 덮지 않는다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-4:responsibility:1",
              "factText": "상대의 실제 제보 축소와 자신의 편집 책임을 분리해 보는 사실",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
                }
              },
              "stanceHints": [
                "confess",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-4:admission:0",
              "factText": "과거 제보 축소가 실제 문제였다는 사실",
              "tags": [
                "admission",
                "legacy_sentence"
              ],
              "slots": {
                "evidence": {
                  "exact": "윤리경영 접수기록과 인사 개입 로그",
                  "neutral": "그 로그"
                },
                "time": {
                  "exact": "과거와 현재 반복",
                  "neutral": "그 반복",
                  "dateExact": "2년 전과 현재",
                  "period": "반복"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present",
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
            "저는 장태욱 씨를 현재 범죄자처럼 보이게 하려고 익명 글을 올린 게 아니에요."
          ],
          "privateKnowledge": [
            "익명 글과 캡처 확산이 장태욱을 직접 겨냥한다는 걸 알고 있었다."
          ],
          "suppressions": [
            "게시판 본문과 캡처 사용 범위를 줄여 말하는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-2:denial:0",
              "factText": "익명 글이 상대를 현재 범죄자처럼 보이게 하려는 의도가 아니었다는 주장",
              "tags": [
                "denial",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "place": {
                  "exact": "익명 게시글",
                  "neutral": "그 글"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-2:self_justification:0",
              "factText": "경고 차원이었다고 말하며 유포 의도를 낮추는 설명",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
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
            "제가 올린 건 경고였고, 장태욱 씨를 망가뜨리려는 계획적인 유포는 아니었어요."
          ],
          "privateKnowledge": [
            "게시판과 개인 전송이 동시에 여론을 만든다는 걸 알았다."
          ],
          "suppressions": [
            "경고라는 말로 유포 범위를 줄여 보이는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-2:uncertainty:0",
              "factText": "경고와 계획적 유포를 구분하려는 주장",
              "tags": [
                "uncertainty",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "place": {
                  "exact": "게시판과 개인 대화",
                  "neutral": "그 경로"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-2:self_justification:1",
              "factText": "과거 억압을 이유로 게시판 선택을 정당화하는 설명",
              "tags": [
                "self_justification",
                "legacy_sentence"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "rule": {
                  "exact": "핫라인 대신 게시판 선택",
                  "neutral": "그 선택"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "익명 글 본문에 그 캡처를 붙여 올린 건 맞아요. 다만 저는 그걸 사실을 보이려는 자료라고 생각했어요."
          ],
          "privateKnowledge": [
            "캡처가 잘리고 섞였다는 걸 어느 정도 인식한 채로 사용했다."
          ],
          "suppressions": [
            "단순 첨부처럼 말하지만 공격 효과를 알고 있었다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-2:admission:0",
              "factText": "익명 글 본문에 캡처를 붙여 올린 사실",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                },
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-2:motive:0",
              "factText": "그 자료가 사실을 보이게 한다고 스스로 믿었다는 사실",
              "tags": [
                "motive",
                "self_justification"
              ],
              "slots": {
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "멘토와 동료들에게도 보낸 건 맞아요. 그래도 저는 또 묻힐까 봐 그렇게까지 했어요."
          ],
          "privateKnowledge": [
            "확산 범위를 넓혀 여론을 만들었다."
          ],
          "suppressions": [
            "두려움을 이유로 재전송 책임을 줄이는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-2:act:0",
              "factText": "멘토와 동료들에게 추가 재전송한 사실",
              "tags": [
                "act",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "멘토와 동료들",
                  "neutral": "주변 사람들"
                },
                "action": {
                  "exact": "추가 재전송",
                  "neutral": "그 확산"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-2:counter:0",
              "factText": "또 묻힐 두려움을 들어 확산 책임을 희석하려는 태도",
              "tags": [
                "counter",
                "fear"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "harm": {
                  "exact": "다시 묻히는 상황",
                  "neutral": "그 공포"
                }
              },
              "stanceHints": [
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
            "허위 제보자라는 낙인이 먼저 찍힐까 봐 공개적으로라도 남기고 싶었어요."
          ],
          "privateKnowledge": [
            "두려움이 게시판 확산을 자기보호로 바꿔 불렀다."
          ],
          "suppressions": [
            "공개 유포를 자기보호로 재라벨링한 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-2:fear:0",
              "factText": "허위 제보자 낙인에 대한 두려움",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "harm": {
                  "exact": "허위 제보자 낙인",
                  "neutral": "그 낙인"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-2:self_justification:2",
              "factText": "공개 유포를 자기보호로 재라벨링한 사실",
              "tags": [
                "self_justification",
                "emotion"
              ],
              "slots": {
                "place": {
                  "exact": "공개 게시판 확산",
                  "neutral": "그 확산"
                },
                "rule": {
                  "exact": "자기보호 명분",
                  "neutral": "그 명분"
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
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "장태욱 씨가 현재 증거인멸을 지시한 것처럼 보이게 익명 글과 캡처를 퍼뜨린 건 제 책임이에요."
          ],
          "privateKnowledge": [
            "경고라는 말은 실제 유포 효과를 가리지 못한다."
          ],
          "suppressions": [
            "현재 범죄 프레임을 만든 직접 책임."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-2:admission:1",
              "factText": "상대를 현재 증거인멸 지시자로 보이게 유포한 책임을 인정하는 사실",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "harm": {
                  "exact": "현재 증거인멸 지시자처럼 보이게 한 유포",
                  "neutral": "그 유포"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-2:harm:0",
              "factText": "경고 명분과 별개로 실제 평판 피해가 발생했다는 사실",
              "tags": [
                "harm",
                "emotion"
              ],
              "slots": {
                "place": {
                  "exact": "사내 게시판과 개인 전송망",
                  "neutral": "그 확산 경로"
                },
                "time": {
                  "exact": "익명 글 게시 이후 확산 국면",
                  "neutral": "그 뒤",
                  "dateExact": "익명 글 게시 이후",
                  "period": "확산 국면"
                }
              },
              "stanceHints": [
                "confess"
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
            "그 캡처는 장태욱 씨가 이번에도 같은 흐름을 보였다는 걸 보여 주는 자료였어요."
          ],
          "privateKnowledge": [
            "현재 헤더와 과거 문장이 완전히 같은 시점 자료는 아니라는 걸 안다."
          ],
          "suppressions": [
            "단일 원본처럼 보이게 한 핵심 편집 구조."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-3:denial:0",
              "factText": "캡처가 현 흐름을 보여 주는 자료였다는 주장",
              "tags": [
                "denial",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-3:self_justification:0",
              "factText": "정확한 원본보다 흐름 전달이 중요했다고 여긴 설명",
              "tags": [
                "self_justification",
                "context"
              ],
              "slots": {
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "원문 그대로라고만 말하긴 어렵지만, 저는 그걸 맥락을 붙인 자료라고 생각했어요."
          ],
          "privateKnowledge": [
            "현재 사건처럼 보이도록 헤더를 붙인 건 사실상 연출 효과였다."
          ],
          "suppressions": [
            "맥락 복원이라는 말로 합성 구조를 줄여 부르는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-3:uncertainty:0",
              "factText": "원문 그대로는 아니지만 흐름 자료였다는 주장",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 메신저 스크린샷 묶음",
                  "neutral": "그 캡처"
                },
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-3:self_justification:1",
              "factText": "맥락 복원이라는 말로 합성 구조를 줄여 말하는 태도",
              "tags": [
                "self_justification",
                "shame"
              ],
              "slots": {
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "현재 헤더와 2년 전 문장을 붙인 건 맞아요. 다만 저는 그게 장태욱 씨의 반복 패턴을 보이는 방법이라고 생각했어요."
          ],
          "privateKnowledge": [
            "단일 원본이 아니라는 걸 알고도 올해 일처럼 읽히게 배치했다."
          ],
          "suppressions": [
            "반복 패턴을 보여 준다는 이유로 현재 허위성을 줄여 말하는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-3:admission:0",
              "factText": "현재 헤더와 2년 전 문장을 붙여 사용한 사실",
              "tags": [
                "admission",
                "timeline",
                "evidence"
              ],
              "slots": {
                "time": {
                  "exact": "현재 헤더와 2년 전 문장",
                  "neutral": "서로 다른 시점",
                  "dateExact": "현재와 2년 전",
                  "period": "혼합 시점"
                },
                "evidence": {
                  "exact": "원본 export와 해시 비교표",
                  "neutral": "그 비교표"
                }
              },
              "stanceHints": [
                "partial",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-3:context:0",
              "factText": "반복 패턴을 보이려는 의도로 현재 허위성을 스스로 줄여 본 사실",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "단일 원본이라고 보기 어렵다는 건 알아요. 그래도 장태욱 씨 쪽의 과거 억압 패턴이 그 자료를 더 믿게 만들었어요."
          ],
          "privateKnowledge": [
            "자신의 편집 책임과 상대의 과거 패턴을 같은 문장에 묶어 방어한다."
          ],
          "suppressions": [
            "허위성과 배경 책임을 섞어 판단을 흐리는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-3:counter:0",
              "factText": "과거 억압 패턴을 들어 편집 책임을 완화하려는 태도",
              "tags": [
                "counter",
                "legacy_sentence"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "2년 전 회의록과 후속 메일",
                  "neutral": "그 회의 자료"
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
              "id": "workplace-07:b:d-3:evidence:0",
              "factText": "단일 원본이 아니라는 사실을 인지하고 있다는 점",
              "tags": [
                "evidence",
                "admission"
              ],
              "slots": {
                "document": {
                  "exact": "단일 원본 주장 불가",
                  "neutral": "그 한계"
                },
                "evidence": {
                  "exact": "포렌식 레이어 분석과 편집 PC 로그",
                  "neutral": "그 포렌식 자료"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "솔직히 저는 제 편집을 '합성'이라고 부르면 너무 부끄러워서 계속 '맥락 복원'이라고만 했어요."
          ],
          "privateKnowledge": [
            "수치심 때문에 허위성을 축소하는 단어를 골랐다."
          ],
          "suppressions": [
            "편집 행위를 다른 말로 갈아 끼운 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-3:shame:0",
              "factText": "합성이라고 부르는 것에 대한 수치심",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                },
                "truth": {
                  "exact": "합성",
                  "neutral": "그 말"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-3:self_justification:2",
              "factText": "수치심 때문에 '맥락 복원'이라는 말을 방패로 쓴 사실",
              "tags": [
                "self_justification",
                "shame"
              ],
              "slots": {
                "label": {
                  "exact": "맥락 복원",
                  "neutral": "그 표현"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
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
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "그 캡처는 장태욱 씨의 현 시점 증거인멸 지시 원본이 아니었어요. 그렇게 보이게 만든 건 제 책임이에요."
          ],
          "privateKnowledge": [
            "과거 패턴이 있었다는 사실과 현재 허위 편집은 분리해 인정해야 한다."
          ],
          "suppressions": [
            "현 시점 원본이 아니라는 핵심을 더는 숨길 수 없는 단계."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-3:admission:1",
              "factText": "문제 캡처가 현 시점 증거인멸 지시 원본이 아니었다는 사실",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "evidence": {
                  "exact": "현 시점 증거인멸 지시 원본 아님",
                  "neutral": "그 핵심"
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
              "id": "workplace-07:b:d-3:responsibility:0",
              "factText": "그 자료를 현재 사건처럼 보이게 만든 직접 책임",
              "tags": [
                "responsibility",
                "harm"
              ],
              "slots": {
                "harm": {
                  "exact": "현재 사건처럼 보이게 한 편집",
                  "neutral": "그 편집"
                },
                "evidence": {
                  "exact": "포렌식 레이어 분석과 편집 PC 로그",
                  "neutral": "그 포렌식 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
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
            "저는 과거 일을 끌어와 장태욱 씨를 더 나쁜 사람처럼 만들려던 게 아니에요."
          ],
          "privateKnowledge": [
            "과거 미종결 사건이 현재 익명 글의 공격력을 키운다는 걸 알고 있었다."
          ],
          "suppressions": [
            "과거와 현재를 일부러 강하게 붙인 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-5:denial:0",
              "factText": "과거 일을 현재 공격용으로 쓰지 않았다는 주장",
              "tags": [
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-5:self_justification:0",
              "factText": "과거 설명이 필요했을 뿐이라는 설명",
              "tags": [
                "self_justification",
                "legacy_sentence"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
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
            "과거 이야기를 먼저 꺼낸 건 맞지만, 저는 왜 그 글을 올렸는지 설명하려고 한 거였어요."
          ],
          "privateKnowledge": [
            "설명과 공격의 경계가 이미 무너지고 있었다."
          ],
          "suppressions": [
            "배경 설명이라는 말로 공격 효과를 줄여 말하는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-5:uncertainty:0",
              "factText": "과거 이야기가 설명이지 공격은 아니었다는 주장",
              "tags": [
                "uncertainty",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "place": {
                  "exact": "현재 익명 글",
                  "neutral": "그 글"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-5:self_justification:1",
              "factText": "과거 억압 경험을 현재 동기의 증명으로 사용하는 태도",
              "tags": [
                "self_justification",
                "motive"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "rule": {
                  "exact": "동기 설명",
                  "neutral": "그 설명"
                }
              },
              "stanceHints": [
                "hedge"
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
            "과거 억압 경험을 현재 글의 배경으로 강하게 묶은 건 맞아요. 다만 그걸 빼면 아무도 안 믿을 것 같았어요."
          ],
          "privateKnowledge": [
            "과거 상처를 현재 공격력으로 바꿔 사용했다."
          ],
          "suppressions": [
            "믿게 만들려 했다는 동기가 공격적 사용과 맞닿는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-5:admission:0",
              "factText": "과거 억압 경험을 현재 글의 배경으로 강하게 묶은 사실",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "2년 전",
                  "neutral": "과거 시점",
                  "dateExact": "2년 전",
                  "period": "과거"
                },
                "place": {
                  "exact": "현재 익명 글",
                  "neutral": "그 글"
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
            },
            {
              "id": "workplace-07:b:d-5:fear:0",
              "factText": "배경을 빼면 아무도 안 믿을 것 같았다는 두려움",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "harm": {
                  "exact": "아무도 믿지 않는 상황",
                  "neutral": "그 두려움"
                }
              },
              "stanceHints": [
                "partial"
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
            "회사 전체가 보는 게시판을 택한 건 사실이에요. 그래도 저는 또 묻히지 않으려는 마음이 더 컸어요."
          ],
          "privateKnowledge": [
            "공개 게시판 선택이 사안을 명예전으로 키웠다."
          ],
          "suppressions": [
            "또 묻히지 않으려는 마음으로 확산 효과를 희석하는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-5:act:0",
              "factText": "회사 전체가 보는 게시판을 선택해 확산 범위를 키운 사실",
              "tags": [
                "act",
                "harm"
              ],
              "slots": {
                "place": {
                  "exact": "회사 전체가 보는 게시판",
                  "neutral": "그 공간"
                },
                "time": {
                  "exact": "익명 글 게시 이후 확산 국면",
                  "neutral": "그 뒤",
                  "dateExact": "익명 글 게시 이후",
                  "period": "확산 국면"
                }
              },
              "stanceHints": [
                "blame",
                "admission"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "workplace-07:b:d-5:counter:0",
              "factText": "묻히지 않으려는 마음을 들어 확산 책임을 완화하려는 태도",
              "tags": [
                "counter",
                "emotion"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "person": {
                  "exact": "장태욱",
                  "neutral": "상대방",
                  "fullName": "장태욱",
                  "judgeRef": "장태욱 씨"
                }
              },
              "stanceHints": [
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
            "그때도 묻혔다는 기억 때문에 저는 핫라인보다 게시판이 더 믿겼어요."
          ],
          "privateKnowledge": [
            "과거 상처가 절차보다 공개 확산을 택하게 만들었다."
          ],
          "suppressions": [
            "절차 위반을 감정으로 정당화하는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-5:fear:1",
              "factText": "과거 상처 때문에 핫라인보다 게시판을 택한 사실",
              "tags": [
                "fear",
                "legacy_sentence",
                "rule"
              ],
              "slots": {
                "quote": {
                  "exact": "그때도 묻혔다",
                  "neutral": "그 기억"
                },
                "rule": {
                  "exact": "핫라인보다 게시판 선택",
                  "neutral": "그 선택"
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
              "id": "workplace-07:b:d-5:emotion:0",
              "factText": "절차보다 공개 확산을 더 믿게 된 감정 상태",
              "tags": [
                "emotion",
                "context"
              ],
              "slots": {
                "place": {
                  "exact": "공개 게시판",
                  "neutral": "그 공간"
                },
                "time": {
                  "exact": "현재 사건 시점",
                  "neutral": "이번 시점",
                  "dateExact": "현재 사건 시점",
                  "period": "현재"
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
            "과거의 실제 상처와 현재의 허위 편집 증거를 제가 한 덩어리로 묶어 명예전을 키운 건 제 책임이에요."
          ],
          "privateKnowledge": [
            "과거 진실과 현재 허위를 분리하지 않은 것이 핵심 잘못이다."
          ],
          "suppressions": [
            "공동 책임을 말하기 전에 자신의 결합 행위가 시작점이었다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "workplace-07:b:tell:past_hurt_loop",
            "workplace-07:b:tell:edit_as_context",
            "workplace-07:b:tell:ally_chain"
          ],
          "claimAtoms": [
            {
              "id": "workplace-07:b:d-5:admission:1",
              "factText": "과거 상처와 현재 허위 편집 증거를 한 덩어리로 묶은 책임",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "truth": {
                  "exact": "과거 실제 상처와 현재 허위 편집의 결합",
                  "neutral": "그 결합"
                },
                "harm": {
                  "exact": "명예전 확대",
                  "neutral": "그 확대"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "workplace-07:b:d-5:context:0",
              "factText": "과거 진실과 현재 허위를 분리하지 않은 것이 핵심 잘못이라는 사실",
              "tags": [
                "context",
                "harm"
              ],
              "slots": {
                "time": {
                  "exact": "과거와 현재 혼합",
                  "neutral": "그 혼합",
                  "dateExact": "2년 전과 현재",
                  "period": "혼합"
                },
                "evidence": {
                  "exact": "포렌식 레이어 분석과 편집 PC 로그",
                  "neutral": "그 포렌식 자료"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "evidence_present",
                "motive_search"
              ]
            }
          ]
        }
      }
    }
  }
}


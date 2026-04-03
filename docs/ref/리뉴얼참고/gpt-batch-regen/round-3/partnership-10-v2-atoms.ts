export const partnership10V2Atoms = {
  "caseId": "partnership-10",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "민서에게 보낸 건 최종 채용 확정이 아니라 주말 공백을 메우기 위한 체험근무 안내였다."
          ],
          "privateKnowledge": [
            "오퍼 메일과 서류 요청 구성이 정식 합격 통보처럼 보일 수 있다는 건 알고 있다."
          ],
          "suppressions": [
            "혜린이 급여 시트를 아직 보지 못한 밤 9시대에 메일을 보냈다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-1:denial:0",
              "factText": "민서에게 보낸 메일을 최종 채용이 아니라 체험근무 안내로 규정합니다.",
              "tags": [
                "denial",
                "act",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "time": {
                  "exact": "밤 9시대",
                  "neutral": "그 시간대",
                  "dateExact": "발송 당일 밤 9시대",
                  "period": "급여표를 아직 보지 못한 그 밤"
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
              "id": "partnership-10:a:d-1:self_justification:0",
              "factText": "주말 반 공백을 메워야 했기 때문에 체험 일정부터 굴렸습니다.",
              "tags": [
                "self_justification",
                "context",
                "threshold"
              ],
              "slots": {},
              "stanceHints": [
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "그날은 승인선을 넘으려던 게 아니라 '이번 주부터 한번 같이 돌아보자'는 말을 체험 시작 신호로 받아들여 먼저 준비를 걸어둔 수준이었다."
          ],
          "privateKnowledge": [
            "공동 final message가 없었고 급여 칸도 비어 있었다."
          ],
          "suppressions": [
            "계좌정보 요청서까지 보냈다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-1:uncertainty:0",
              "factText": "혜린의 말을 체험 시작 신호로 읽었을 뿐 최종 승인을 확정적으로 인식하지는 않았습니다.",
              "tags": [
                "uncertainty",
                "quote",
                "timeline"
              ],
              "slots": {
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
                },
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
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
            "정식 오퍼 형식의 메일이 나간 건 맞다. 다만 제 기준에선 체험근무를 먼저 굴리기 위한 임시 세팅이었다."
          ],
          "privateKnowledge": [
            "민서 입장에서는 사실상 합격 통보로 읽힐 수 있었다."
          ],
          "suppressions": [
            "체험평가표와 급여 시트가 모두 비어 있었다는 점은 여전히 덜 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-1:admission:0",
              "factText": "정식 오퍼 형식의 메일과 서류 요청이 실제로 발송됐다는 점은 인정합니다.",
              "tags": [
                "admission",
                "act",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "time": {
                  "exact": "밤 9시대",
                  "neutral": "그 시간대",
                  "dateExact": "발송 당일 밤 9시대",
                  "period": "급여표를 아직 보지 못한 그 밤"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "partnership-10:a:d-1:self_justification:1",
              "factText": "그 발송을 최종 채용이 아니라 체험근무용 임시 세팅으로 축소해 설명합니다.",
              "tags": [
                "self_justification",
                "context",
                "counter"
              ],
              "slots": {
                "period": {
                  "exact": "체험근무 전제",
                  "neutral": "그 전제"
                }
              },
              "stanceHints": [
                "partial",
                "hedge"
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
            "급여표와 공동 final message가 비어 있었던 건 제 실수지만, 혜린 씨의 표현이 최종 승인처럼 들린 것도 사실이었다."
          ],
          "privateKnowledge": [
            "체크리스트상 최종 승인 단계가 오지 않았다는 걸 뒤늦게 확인했다."
          ],
          "suppressions": [
            "오퍼를 보낸 뒤 스스로 멈추지 않았다는 점은 완전히 열지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-1:responsibility:0",
              "factText": "급여 시트와 공동 final message가 비어 있었는데도 먼저 움직인 책임을 부분 인정합니다.",
              "tags": [
                "responsibility",
                "rule",
                "admission"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
                },
                "sheet": {
                  "exact": "민서 급여 시트",
                  "neutral": "급여 시트"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "partnership-10:a:d-1:quote:0",
              "factText": "혜린의 모호한 승인 표현이 제게 최종 승인처럼 들렸습니다.",
              "tags": [
                "quote",
                "counter",
                "uncertainty"
              ],
              "slots": {
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
                },
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
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
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "후보자 이탈이 무서워서 승인 확인을 건너뛰었다. 그걸 일정 문제처럼 축소해 설명한 건 제 방어였다."
          ],
          "privateKnowledge": [
            "배신감보다 운영 실패자로 보일까 두려워 더 버텼다."
          ],
          "suppressions": [
            "운영총괄로 성급해 보일까 두려웠다는 감정은 아직 짧게만 드러냅니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-1:fear:0",
              "factText": "후보자 이탈과 운영 공백에 대한 두려움 때문에 승인 확인을 건너뛰었습니다.",
              "tags": [
                "fear",
                "motive",
                "context"
              ],
              "slots": {},
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
              "id": "partnership-10:a:d-1:emotion:0",
              "factText": "배신감 문제를 일정 문제처럼 줄여 말한 것이 제 방어였습니다.",
              "tags": [
                "emotion",
                "self_justification",
                "admission"
              ],
              "slots": {},
              "stanceHints": [
                "emotional"
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
            "최종 공동 승인 없이 정식 오퍼와 온보딩 서류를 먼저 보낸 건 제 잘못이다. 체험근무라는 말로 이름을 바꿔도 절차 위반은 남는다."
          ],
          "privateKnowledge": [
            "민서와 혜린 모두에게 같은 혼선을 줬다는 사실을 인정합니다."
          ],
          "suppressions": [
            "그동안 체험근무라는 이름표로 위반을 덜어 보이려 했다는 마음을 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-1:admission:1",
              "factText": "최종 공동 승인 없이 정식 오퍼와 온보딩 서류를 먼저 보낸 제 잘못을 시인합니다.",
              "tags": [
                "admission",
                "rule",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
              "id": "partnership-10:a:d-1:rule:0",
              "factText": "체험근무라는 이름표를 붙여도 절차 위반 자체는 사라지지 않는다고 정리합니다.",
              "tags": [
                "rule",
                "admission",
                "legacy_sentence"
              ],
              "slots": {
                "quote": {
                  "exact": "체험근무",
                  "neutral": "그 이름표"
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
            "혜린 씨가 제 확인도 없이 민서 씨와 직원들한테 채용이 없던 일이라고 먼저 말했다."
          ],
          "privateKnowledge": [
            "제가 먼저 오퍼를 보내 혼선을 만들었다."
          ],
          "suppressions": [
            "직원들이 그렇게 반응한 배경에 제 메일이 있었다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-2:act:0",
              "factText": "혜린이 재확인 없이 후보자와 직원들에게 채용 보류를 먼저 알렸습니다.",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "message": {
                  "exact": "'채용은 없던 일'",
                  "neutral": "그 보류 통보"
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
            }
          ]
        },
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "보류가 필요했다면 저한테 먼저 말했어야지, 기존 트레이너들한테 먼저 퍼질 일은 아니었다."
          ],
          "privateKnowledge": [
            "그때 저는 이미 정식 오퍼 형식으로 움직여 놓은 상태였다."
          ],
          "suppressions": [
            "보류 메시지가 오퍼 1시간 뒤였다는 점을 이용해 제 선행 행위를 희석하고 싶어 한다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-2:responsibility:0",
              "factText": "혜린이 자신보다 기존 트레이너들과 후보자에게 먼저 설명한 절차를 문제 삼는다.",
              "tags": [
                "responsibility",
                "rule",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
                },
                "time": {
                  "exact": "1시간 뒤",
                  "neutral": "곧바로",
                  "period": "오퍼 직후"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
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
            "내가 오퍼를 먼저 보낸 책임은 있지만, 혜린 씨도 재확인 없이 '없던 일'이라고 못 박아 상황을 더 키웠다."
          ],
          "privateKnowledge": [
            "민서 입장에서는 둘 다 서로 다른 결론을 들려준 셈이었다."
          ],
          "suppressions": [
            "그 전에 제가 먼저 공동 final message를 깨뜨렸다는 점은 여전히 덜 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-2:admission:0",
              "factText": "제 오퍼 선행 책임을 일부 인정하면서도 혜린의 보류 통보가 혼선을 더 키웠습니다.",
              "tags": [
                "admission",
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
                },
                "message": {
                  "exact": "'채용은 없던 일'",
                  "neutral": "그 보류 통보"
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
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "혜린 씨는 품질 우려가 있었다고 해도 준서가 몰래 사람을 앉히려 했다는 취지까지 내부에 퍼뜨렸다. 그건 사실 판단보다 감정이 앞선 대응이었다."
          ],
          "privateKnowledge": [
            "제가 준 단서가 그 의심을 키웠다."
          ],
          "suppressions": [
            "제 행동이 의심의 재료를 제공했다는 인정은 더 늦춘다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-2:emotion:0",
              "factText": "혜린의 내부 확산이 사실 판단보다 배신감과 감정에 기운 대응이었다고 평가한다.",
              "tags": [
                "emotion",
                "counter",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
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
            "저도 혼선을 만들었고 혜린 씨도 의심을 사실처럼 말해버렸다. 결국 후보자와 직원들만 양쪽 말을 다 들었다."
          ],
          "privateKnowledge": [
            "배신자로 몰린 억울함이 커서 혜린 씨 책임만 밀어붙였다."
          ],
          "suppressions": [
            "억울함 때문에 제 선행 책임을 덜 보려 했던 마음을 짧게만 드러냅니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-2:harm:0",
              "factText": "양쪽의 다른 메시지 때문에 후보자와 직원들이 모두 상반된 설명을 듣게 됐습니다.",
              "tags": [
                "harm",
                "admission",
                "relationship"
              ],
              "slots": {
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
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
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "혜린 씨의 일방적 보류 통보와 내부 확산은 문제였지만, 그 출발점에 제 오퍼 선행이 있었다는 것도 인정합니다. 한 사람 잘못으로만 끝낼 일은 아니었다."
          ],
          "privateKnowledge": [
            "갈등의 시작을 상대 한 명에게만 돌리면 절차 복구가 안 된다는 걸 안다."
          ],
          "suppressions": [
            "제가 스스로 면책받고 싶어 했다는 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-2:admission:1",
              "factText": "혜린의 일방 통보 문제를 지적하면서도 그 출발점에 제 오퍼 선행이 있었다고 정리합니다.",
              "tags": [
                "admission",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
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
            }
          ]
        }
      },
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "저는 혜린 씨를 속여 사람을 몰래 앉히려 한 적 없습니다."
          ],
          "privateKnowledge": [
            "그 말이 승인처럼 들렸다는 자기 해석에 기대고 있다."
          ],
          "suppressions": [
            "원본 맥락을 끝까지 다시 확인하지 않았다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-3:denial:0",
              "factText": "동업자를 속여 독단 채용하려 했다는 의도를 전면 부정한다.",
              "tags": [
                "denial",
                "identity",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "deny"
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
            "'이번 주부터 한번 같이 돌아보자'면 저는 trial이든 시작 사인으로 읽을 수밖에 없었습니다. 속이려 했다면 굳이 업무용 메일과 툴에 흔적을 남기지도 않았을 겁니다."
          ],
          "privateKnowledge": [
            "정식 오퍼 형식이 배신처럼 보일 수 있다는 건 안다."
          ],
          "suppressions": [
            "캘린더 자동 초대를 최종 승인처럼 받아들인 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-3:quote:0",
              "factText": "혜린의 표현을 시작 신호로 읽었다며 속일 의도가 있었다면 흔적을 남기지 않았을 것이라고 항변한다.",
              "tags": [
                "quote",
                "self_justification",
                "counter"
              ],
              "slots": {
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
                },
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "크롭된 캡처만 보면 제가 승인 문장을 떼어먹은 사람처럼 보일 수 있다. 그런데 원본엔 '트라이얼로'가 있었고, 민서 씨도 3일 가능 시간표만 보냈다."
          ],
          "privateKnowledge": [
            "저 역시 체험과 최종 채용 경계를 느슨하게 읽었다."
          ],
          "suppressions": [
            "후보자 이탈이 두려워 선을 일부러 흐렸다는 의심 가능성은 덜 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-3:evidence:0",
              "factText": "크롭된 캡처만 보면 독단처럼 보이지만 원본에는 '트라이얼로'가 남아 있었다고 반박한다.",
              "tags": [
                "evidence",
                "quote",
                "counter"
              ],
              "slots": {
                "quote": {
                  "exact": "'트라이얼로'",
                  "neutral": "그 표현"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "partnership-10:a:d-3:timeline:0",
              "factText": "민서는 최종 합류 일정이 아니라 3일 가능한 시간표만 보냈다고 짚는다.",
              "tags": [
                "timeline",
                "context",
                "beneficiary"
              ],
              "slots": {
                "person": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "duration": {
                  "exact": "3일",
                  "neutral": "며칠",
                  "period": "체험근무 기간"
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
            "상대가 저를 배신자로 본 이유는 이해합니다. 다만 그 오해는 제 은폐보다 모호한 승인 표현과 시스템 문구가 겹쳐 생긴 쪽에 가깝습니다."
          ],
          "privateKnowledge": [
            "그 모호함을 확인하지 않은 책임이 제게도 있다."
          ],
          "suppressions": [
            "제가 마음속으로 이미 합류를 기정사실화했다는 점은 아직 다 꺼내지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-3:counter:0",
              "factText": "배신으로 보인 장면은 은폐보다 모호한 승인 표현과 시스템 문구가 겹친 결과입니다.",
              "tags": [
                "counter",
                "context",
                "institution"
              ],
              "slots": {
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
                },
                "tool": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "속이려던 건 아니었습니다. 사람 빠질 자리가 무서워서 trial 승인과 최종 승인을 제 편한 쪽으로 묶어 읽었습니다."
          ],
          "privateKnowledge": [
            "배신자로 보일까봐 아니라는 말부터 세게 했다."
          ],
          "suppressions": [
            "운영 공백에 대한 공포를 아직 완전히 풀어놓지는 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-3:fear:0",
              "factText": "운영 공백이 두려워 trial 승인과 최종 승인을 제게 유리한 방향으로 묶어 읽었습니다.",
              "tags": [
                "fear",
                "motive",
                "admission"
              ],
              "slots": {},
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
            "계획적인 독단 채용은 아니었지만, 제가 확인 없이 승인으로 해석해 움직인 탓에 속인 것처럼 보이게 만든 책임은 인정합니다."
          ],
          "privateKnowledge": [
            "관계를 지키고 싶어서 사실 일부를 늦게 꺼냈다."
          ],
          "suppressions": [
            "의도는 아니었다는 말로 결과 책임을 덜고 싶어 했던 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-3:admission:0",
              "factText": "계획적인 배신은 아니더라도 제가 확인 없이 승인으로 해석해 움직여 속인 것처럼 보이게 만들었습니다.",
              "tags": [
                "admission",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
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
            }
          ]
        }
      },
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "현장 공백이 급했을 뿐이지 프로토콜 자체를 무시하려던 건 아니었다."
          ],
          "privateKnowledge": [
            "체험평가표와 급여 시트가 비어 있는 걸 알면서 먼저 보냈다."
          ],
          "suppressions": [
            "공동 final message가 없었다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-4:self_justification:0",
              "factText": "현장 공백 대응을 이유로 프로토콜 위반 의도를 부정한다.",
              "tags": [
                "self_justification",
                "rule",
                "context"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
            "체험부터 붙여 놓고 나중에 정리하려 한 건 맞지만, 그걸 곧바로 규칙 파기라고 볼 건 아니라고 생각했다."
          ],
          "privateKnowledge": [
            "합의된 3단계를 제가 먼저 순서 밖으로 움직였다."
          ],
          "suppressions": [
            "민서 급여 시트 미완성은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-4:uncertainty:0",
              "factText": "체험부터 붙이고 나중에 정리하려 한 선택을 규칙 파기와는 다른 임시 운용으로 설명합니다.",
              "tags": [
                "uncertainty",
                "self_justification",
                "rule"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "체크리스트가 끝나기 전에 오퍼가 나간 건 제 위반이다. 다만 혜린 씨도 공동 메시지 대신 별도 보류를 먼저 보냈다."
          ],
          "privateKnowledge": [
            "서로 같은 규칙을 다른 방식으로 무너뜨렸다."
          ],
          "suppressions": [
            "제 위반 비중이 더 크다는 점은 여전히 덜 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-4:admission:0",
              "factText": "체크리스트 완료 전에 오퍼가 나간 제 위반을 인정하면서 혜린의 별도 보류 통보도 함께 언급한다.",
              "tags": [
                "admission",
                "rule",
                "counter"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
                },
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
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
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "체험평가표, 급여 시트, 공동 final message 세 단계가 다 비어 있었는데도 제가 먼저 움직였다. 그 뒤 혜린 씨가 별도 공지를 올리면서 절차는 완전히 찢어졌다."
          ],
          "privateKnowledge": [
            "처음 구멍을 낸 쪽은 저였다."
          ],
          "suppressions": [
            "제 선행 위반이 전체 붕괴의 출발점이었다는 표현은 조심한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-4:rule:0",
              "factText": "합의된 세 단계가 비어 있었는데도 제가 먼저 움직이며 절차 붕괴의 첫 구멍을 냈습니다.",
              "tags": [
                "rule",
                "responsibility",
                "admission"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
                },
                "person": {
                  "exact": "박혜린",
                  "neutral": "공동대표",
                  "fullName": "박혜린",
                  "judgeRef": "혜린 씨"
                }
              },
              "stanceHints": [
                "partial",
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
            "규칙이 있었는데도 급하다는 이유로 예외를 만들었습니다. 그 순간부터 서로 상대 탓을 하며 같은 원칙을 같이 무너뜨렸습니다."
          ],
          "privateKnowledge": [
            "과거 부적합 채용 이후 세운 룰을 가볍게 다뤘다."
          ],
          "suppressions": [
            "규칙을 세운 이유 자체를 잊었다는 자책은 짧게만 드러냅니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-4:emotion:0",
              "factText": "급하다는 이유로 예외를 만들며 둘이 함께 같은 원칙을 무너뜨렸다고 감정 섞어 인정합니다.",
              "tags": [
                "emotion",
                "rule",
                "relationship"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "공동 채용 프로토콜은 둘 다 어겼고, 오퍼를 먼저 보낸 제 쪽 책임이 더 큽니다. 체크리스트를 살릴 생각보다 공백 메우기에 먼저 매달렸습니다."
          ],
          "privateKnowledge": [
            "원칙보다 운영 압박을 우선한 선택이 갈등을 키웠다."
          ],
          "suppressions": [
            "없음 대신, 공백 메우기만 생각했다는 후회가 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-4:admission:1",
              "factText": "공동 채용 프로토콜을 둘 다 어겼지만 제가 먼저 오퍼를 보내 더 큰 책임이 있습니다.",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
            }
          ]
        }
      },
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "캘린더 초대는 제가 최종 합격 문구를 따로 쓴 게 아니라 툴이 자동으로 뿌린 일정일 뿐입니다."
          ],
          "privateKnowledge": [
            "그 문구가 최종 확정처럼 보일 수 있다는 건 몰랐다."
          ],
          "suppressions": [
            "후보자 이메일을 온보딩 단계에 넣은 건 제 조작이었다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-5:institution:0",
              "factText": "캘린더 초대는 제가 별도로 확정 문구를 쓴 것이 아니라 시스템 자동 발송이었습니다.",
              "tags": [
                "institution",
                "act",
                "denial"
              ],
              "slots": {
                "tool": {
                  "exact": "HR 툴 자동 캘린더",
                  "neutral": "그 시스템"
                },
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            "저는 그 초대를 출근 확정이라기보다 trial 일정 생성으로 봤습니다. 시스템이 과장된 이름표를 달았다고 생각했습니다."
          ],
          "privateKnowledge": [
            "'Day 1 Orientation'이라는 문구를 보고도 멈추지 않았다."
          ],
          "suppressions": [
            "혜린 씨도 그 일정 때문에 배신을 확신했다는 점은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-5:uncertainty:0",
              "factText": "자동 초대를 최종 합류가 아니라 trial 일정 생성으로 읽었고 시스템 이름표가 과장됐습니다.",
              "tags": [
                "uncertainty",
                "institution",
                "self_justification"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
                }
              },
              "stanceHints": [
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "실제로 민서 이메일이 온보딩 단계로 옮겨진 뒤 30초 안에 캘린더 초대가 발송됐다고 합니다. 그러니 제 의도와 별개로 최종 채용처럼 읽힌 건 맞습니다."
          ],
          "privateKnowledge": [
            "제가 그 자동화 조건을 정확히 모르고 쓴 상태였다."
          ],
          "suppressions": [
            "시스템 문구를 제 판단 근거로 삼았다는 점은 덜 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-5:evidence:0",
              "factText": "민서 이메일이 온보딩 단계로 옮겨진 뒤 30초 안에 자동 초대가 발송됐다는 시스템 사실을 인정합니다.",
              "tags": [
                "evidence",
                "institution",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "stage": {
                  "exact": "온보딩 단계",
                  "neutral": "그 단계"
                },
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "도구가 혼선을 키웠고, 저도 그걸 확인된 승인처럼 받아들였습니다. 시스템 탓만 할 수는 없지만 설명 없는 자동 발송은 분명 독단처럼 보이게 만들었습니다."
          ],
          "privateKnowledge": [
            "기술적 요인을 방패처럼 쓰고 싶다."
          ],
          "suppressions": [
            "승인 체크박스 없이 온보딩 단계로 넘긴 제 행동은 여전히 조심한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-5:counter:0",
              "factText": "설명 없는 자동 발송이 독단처럼 보이게 만들었지만 저도 그 신호를 승인처럼 받아들였습니다.",
              "tags": [
                "counter",
                "institution",
                "admission"
              ],
              "slots": {
                "tool": {
                  "exact": "HR 툴 자동 캘린더",
                  "neutral": "그 시스템"
                },
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "저는 일정 알림이 뜬 걸 보고 마음속으로 '이제 되는구나' 쪽으로 기울었습니다. 공백 압박이 커서 시스템 문구를 제 편한 해석으로 붙잡았습니다."
          ],
          "privateKnowledge": [
            "운영 실패가 두려워 도구 경고를 제대로 보지 않았다."
          ],
          "suppressions": [
            "도구를 핑계 삼고 싶은 마음은 짧게만 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-5:fear:0",
              "factText": "공백 압박 때문에 자동 일정 문구를 제게 유리한 승인 신호로 붙잡았습니다.",
              "tags": [
                "fear",
                "institution",
                "admission"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            "자동 캘린더 발송이 오해를 키운 건 사실이지만, 그 설정을 모른 채 온보딩 단계에 넣고 멈추지 않은 제 책임도 분명합니다."
          ],
          "privateKnowledge": [
            "도구 오해와 사람 판단 오류가 함께 겹쳤음을 인정합니다."
          ],
          "suppressions": [
            "기술 문제만 탓하고 싶던 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:a:tell:schedule_recital",
            "partnership-10:a:tell:trial_label",
            "partnership-10:a:tell:emotion_cut"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:a:d-5:admission:0",
              "factText": "자동 캘린더가 오해를 키웠지만 설정을 모른 채 온보딩 단계로 넘기고 멈추지 않은 제 책임을 인정합니다.",
              "tags": [
                "admission",
                "institution",
                "responsibility"
              ],
              "slots": {
                "stage": {
                  "exact": "온보딩 단계",
                  "neutral": "그 단계"
                },
                "tool": {
                  "exact": "HR 툴 자동 캘린더",
                  "neutral": "그 시스템"
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
            "준서 씨는 제 최종 승인 없이 민서 씨한테 사실상 합격 통보를 보냈습니다."
          ],
          "privateKnowledge": [
            "'이번 주부터 한번 같이 돌아보자'는 말을 제가 모호하게 썼다."
          ],
          "suppressions": [
            "그 표현이 trial 승인으로도 읽힐 수 있다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-1:act:0",
              "factText": "준서가 제 최종 승인 없이 민서에게 사실상 합격 통보를 보냈어요.",
              "tags": [
                "act",
                "timeline",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
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
            }
          ]
        },
        "S1": {
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "급여표도 안 끝났는데 왜 오퍼부터 나갔죠. 왜 제 이름을 건너뛰고 정식 서류부터 보냈죠."
          ],
          "privateKnowledge": [
            "그때 제 말이 준서에게 시작 신호처럼 들렸을 가능성은 안다."
          ],
          "suppressions": [
            "체험근무와 최종 채용 경계를 제가 다시 못 박지 않았다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-1:quote:0",
              "factText": "급여표도 안 끝났는데 왜 오퍼와 정식 서류가 먼저 나갔는지 추궁한다.",
              "tags": [
                "quote",
                "responsibility",
                "evidence"
              ],
              "slots": {
                "sheet": {
                  "exact": "민서 급여 시트",
                  "neutral": "급여 시트"
                },
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "오퍼 메일과 계좌정보 요청서가 정식 채용처럼 보였다는 건 분명합니다. 다만 제가 먼저 trial 범위를 더 명확히 끊었어야 했다는 부분은 인정합니다."
          ],
          "privateKnowledge": [
            "제 모호한 표현이 혼선을 키웠다."
          ],
          "suppressions": [
            "제가 기존 채용 상처 때문에 더 예민하게 해석했다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-1:admission:0",
              "factText": "오퍼 메일이 정식 채용처럼 보였다는 점을 강조하면서도 trial 범위를 더 명확히 했어야 했어요.",
              "tags": [
                "admission",
                "quote",
                "responsibility"
              ],
              "slots": {
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
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
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "제 승인 없는 오퍼가 핵심 문제였지만, 저는 '이번 주부터 같이 돌아보자'라고만 던져놓고 final message는 안 남겼습니다. 그래서 독단처럼 보인 장면에 제 모호함도 조금 섞였습니다."
          ],
          "privateKnowledge": [
            "배제감이 커서 의도 단정부터 했다."
          ],
          "suppressions": [
            "저도 준서를 배신자로 먼저 규정했다는 점은 덜 말해요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-1:quote:1",
              "factText": "제 모호한 표현과 final message 부재가 독단처럼 보인 장면에 일부 섞였어요.",
              "tags": [
                "quote",
                "rule",
                "admission"
              ],
              "slots": {
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
                },
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "저는 건너뛰였다고 느꼈고 그래서 의도부터 단정했습니다. 그런데 지금 보면 모호한 trial 표현과 자동 일정이 제 경계심을 더 세게 눌렀습니다."
          ],
          "privateKnowledge": [
            "예전 부적합 채용 기억 때문에 한 번 더 폭발했다."
          ],
          "suppressions": [
            "배제감이 사실 판단보다 앞섰다는 고백은 짧게만 한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-1:emotion:0",
              "factText": "건너뛰였다는 감정이 먼저 올라와 의도 단정으로 갔고 trial 표현과 자동 일정이 경계심을 키웠어요.",
              "tags": [
                "emotion",
                "fear",
                "context"
              ],
              "slots": {
                "quote": {
                  "exact": "'트라이얼로'",
                  "neutral": "그 표현"
                },
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            "준서 씨가 최종 승인 없이 오퍼를 보낸 건 사실이지만, 제 모호한 승인 표현이 오해의 발판이 된 것도 인정합니다."
          ],
          "privateKnowledge": [
            "의도 단정만으로는 이 사건이 정리되지 않는다는 걸 안다."
          ],
          "suppressions": [
            "없음 대신, 배제감에 붙잡혀 있던 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-1:admission:1",
              "factText": "준서의 무단 오퍼 발송은 사실이지만 제 모호한 승인 표현도 오해의 발판이 됐어요.",
              "tags": [
                "admission",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
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
            }
          ]
        }
      },
      "d-2": {
        "S0": {
          "disputeId": "d-2",
          "state": "S0",
          "publicClaim": [
            "저는 사고를 막으려고 멈춘 겁니다. 없던 사실을 퍼뜨리려던 게 아닙니다."
          ],
          "privateKnowledge": [
            "준서가 몰래 사람을 앉히려 했다는 의심을 사실처럼 말해버렸다."
          ],
          "suppressions": [
            "민서와 기존 트레이너에게 재확인 없이 먼저 말했다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-2:denial:0",
              "factText": "보류 통보와 내부 공지는 사고를 막기 위한 조치였을 뿐 상황 확산이 목적은 아니었어요.",
              "tags": [
                "denial",
                "self_justification",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
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
            "오퍼 메일 한 시간 뒤에라도 제가 보류를 안 걸었으면 현장에 바로 이름이 굳었을 겁니다. 그때는 수습이 먼저였어요."
          ],
          "privateKnowledge": [
            "직원 공지를 먼저 올린 건 감정이 앞선 대응이었다."
          ],
          "suppressions": [
            "준서 독단이라는 표현을 기정사실처럼 쓴 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-2:self_justification:0",
              "factText": "오퍼 메일 1시간 뒤의 보류 통보는 수습을 위한 긴급 조치였어요.",
              "tags": [
                "self_justification",
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "1시간 뒤",
                  "neutral": "곧바로",
                  "period": "오퍼 직후"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "민서 씨와 직원들에게 '아직 채용 확정 아님'이라고 먼저 알린 건 맞습니다. 하지만 그 직전에 준서 씨가 정식 오퍼처럼 보이는 걸 이미 보내 놓은 상태였습니다."
          ],
          "privateKnowledge": [
            "제 메시지 어조가 의심을 사실처럼 만들었다."
          ],
          "suppressions": [
            "후보자에게 '없던 일'이라고 못 박은 표현은 덜 말해요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-2:admission:0",
              "factText": "후보자와 직원들에게 먼저 알린 사실은 인정하지만 그 직전 준서의 오퍼가 이미 나가 있었어요.",
              "tags": [
                "admission",
                "counter",
                "timeline"
              ],
              "slots": {
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
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
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "품질 걱정이 있었다고 해도 저는 재확인 없이 보류 통보와 내부 공지를 먼저 돌렸습니다. 그 과정에서 준서가 몰래 사람을 앉히려 했다는 취지까지 실어 보낸 건 제 과장이었습니다."
          ],
          "privateKnowledge": [
            "배제된 기분이 커서 수습보다 비난이 먼저 나갔다."
          ],
          "suppressions": [
            "감정이 대응 순서를 바꿨다는 사실은 이제야 말해요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-2:responsibility:0",
              "factText": "품질 걱정과 별개로 재확인 없이 보류 통보와 내부 공지를 먼저 돌리고 과장된 취지를 실어 보낸 책임을 인정해요.",
              "tags": [
                "responsibility",
                "admission",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "evidence_present",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "사실 저는 멈추려던 것보다 먼저 단정하려던 쪽에 가까웠습니다. 제 영역이 무시됐다는 감정이 들어서 의심을 확인 전에 퍼뜨렸습니다."
          ],
          "privateKnowledge": [
            "예전 채용 실패가 겹쳐 더 과민해졌다."
          ],
          "suppressions": [
            "배제감이 너무 커서 말이 먼저 나갔다는 자책을 짧게 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-2:emotion:0",
              "factText": "제 영역이 무시됐다는 감정 때문에 의심을 확인 전에 퍼뜨렸다고 감정적으로 털어놓는다.",
              "tags": [
                "emotion",
                "fear",
                "admission"
              ],
              "slots": {},
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
            "재확인 없이 후보자와 직원들에게 보류를 먼저 알리고, 준서 씨 의도를 사실처럼 퍼뜨린 건 제 잘못입니다. 품질 우려가 있어도 그렇게 처리하면 안 됐습니다."
          ],
          "privateKnowledge": [
            "품질 우려를 절차 위반의 면책으로 삼을 수 없다는 걸 안다."
          ],
          "suppressions": [
            "없음 대신, 수습보다 단정이 먼저였다는 후회가 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-2:admission:1",
              "factText": "재확인 없는 보류 통보와 준서 의도 확산이 제 잘못이었다고 명확히 시인해요.",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
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
            }
          ]
        }
      },
      "d-3": {
        "S0": {
          "disputeId": "d-3",
          "state": "S0",
          "publicClaim": [
            "그때 제 눈엔 준서 씨가 저를 건너뛰고 사람을 넣은 걸로 보였습니다."
          ],
          "privateKnowledge": [
            "제가 본 건 크롭된 장면과 오퍼 결과물 중심이었다."
          ],
          "suppressions": [
            "원본 맥락을 끝까지 다시 안 봤다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-3:identity:0",
              "factText": "제가 준서에게 건너뛰였다고 느꼈기 때문에 독단 채용으로 해석했어요.",
              "tags": [
                "identity",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                }
              },
              "stanceHints": [
                "deny",
                "blame"
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
            "오퍼 메일, 온보딩 문서, 스케줄표에 새 이름이 다 올라왔는데 그걸 보고 어떻게 배신이 아니라고 합니까."
          ],
          "privateKnowledge": [
            "'트라이얼로'가 있었을 가능성을 알면서도 그 줄을 붙잡았다."
          ],
          "suppressions": [
            "제가 결론 문장부터 던졌다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-3:evidence:0",
              "factText": "오퍼 메일과 온보딩 문서, 스케줄표의 새 이름을 배신의 물증처럼 제시한다.",
              "tags": [
                "evidence",
                "quote",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
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
            "크롭된 캡처만 보면 제가 그렇게 믿은 이유는 설명됩니다. 하지만 원본을 보니 '트라이얼로'가 붙어 있었고, 민서 씨도 3일 가능한 시간만 보냈더군요."
          ],
          "privateKnowledge": [
            "제가 배제감 때문에 의도 단정으로 달렸다."
          ],
          "suppressions": [
            "시스템 자동 일정 가능성은 아직 모르고 있다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-3:evidence:1",
              "factText": "크롭된 캡처가 제 오해를 설명하지만 원본에는 '트라이얼로'가 있었고 민서는 3일 일정만 보냈어요.",
              "tags": [
                "evidence",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "'트라이얼로'",
                  "neutral": "그 표현"
                },
                "candidate": {
                  "exact": "한민서",
                  "neutral": "지원자",
                  "fullName": "한민서",
                  "judgeRef": "민서 씨"
                },
                "duration": {
                  "exact": "3일",
                  "neutral": "며칠",
                  "period": "체험근무 기간"
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
            "저는 그 장면을 독단 채용 증거처럼 확대해 읽었습니다. 실제로는 모호한 trial 표현과 제 경계심이 합쳐져 그렇게 보이게 만든 면이 있었습니다."
          ],
          "privateKnowledge": [
            "배신으로 규정해야 제 분노가 설명된다고 느꼈다."
          ],
          "suppressions": [
            "상대 의도를 악의로 먼저 정했다는 점은 더 천천히 드러내요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-3:legacy_sentence:0",
              "factText": "제가 장면 하나를 독단 채용 증거처럼 확대해 읽었고 trial 표현과 경계심이 그 해석을 키웠어요.",
              "tags": [
                "legacy_sentence",
                "admission",
                "emotion"
              ],
              "slots": {
                "quote": {
                  "exact": "'트라이얼로'",
                  "neutral": "그 표현"
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
            "속이려 한 장면만 찾으려고 했습니다. 제 승인권이 지워진다는 공포가 커서, 확인보다 배신이라는 단어를 먼저 붙였습니다."
          ],
          "privateKnowledge": [
            "기존 부적합 채용 기억이 지금 해석까지 끌고 왔다."
          ],
          "suppressions": [
            "분노가 사실 판단을 덮었다는 자책을 짧게만 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-3:fear:0",
              "factText": "승인권이 지워진다는 공포 때문에 확인보다 배신이라는 이름을 먼저 붙였어요.",
              "tags": [
                "fear",
                "emotion",
                "admission"
              ],
              "slots": {},
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
            "지금은 계획적인 독단 채용이었다고까지는 말할 수 없습니다. 승인 표현과 자동 일정, 그리고 제 과잉 해석이 겹친 오해였다고 보겠습니다."
          ],
          "privateKnowledge": [
            "배신이라는 단어로 상황을 너무 빨리 닫아버렸다는 걸 안다."
          ],
          "suppressions": [
            "없음 대신, 배제감이 해석을 몰고 갔던 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-3:admission:0",
              "factText": "계획적인 독단 채용이라고 단정할 수 없고 승인 표현, 자동 일정, 제 과잉 해석이 겹친 오해였다고 정리해요.",
              "tags": [
                "admission",
                "relationship",
                "institution"
              ],
              "slots": {
                "quote": {
                  "exact": "'이번 주부터 한번 같이 돌아보자'",
                  "neutral": "그 승인처럼 들린 말"
                },
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            }
          ]
        }
      },
      "d-4": {
        "S0": {
          "disputeId": "d-4",
          "state": "S0",
          "publicClaim": [
            "프로토콜을 먼저 무너뜨린 건 준서 씨 쪽입니다."
          ],
          "privateKnowledge": [
            "저도 공동 final message 대신 별도 보류 통보를 먼저 했다."
          ],
          "suppressions": [
            "제 위반은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-4:denial:0",
              "factText": "프로토콜 파기의 출발점은 준서의 오퍼 선행이었다고 책임을 돌린다.",
              "tags": [
                "denial",
                "rule",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
            }
          ]
        },
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "제가 보류를 건 건 사후 수습이었지 규칙 파기는 아니라고 생각했습니다."
          ],
          "privateKnowledge": [
            "그 수습 방식도 규칙 밖이었다."
          ],
          "suppressions": [
            "직원 단톡 공지를 먼저 올린 사실은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-4:self_justification:0",
              "factText": "제 보류 통보를 규칙 파기가 아니라 사후 수습이에요.",
              "tags": [
                "self_justification",
                "rule",
                "uncertainty"
              ],
              "slots": {
                "message": {
                  "exact": "'채용은 없던 일'",
                  "neutral": "그 보류 통보"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "준서 씨가 오퍼를 먼저 보낸 게 출발점이지만, 저도 공동 메시지 대신 별도 보류를 돌렸습니다."
          ],
          "privateKnowledge": [
            "둘 다 같은 체크리스트를 어겼다."
          ],
          "suppressions": [
            "공동 final message를 깨뜨린 책임은 덜 말해요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-4:admission:0",
              "factText": "준서의 오퍼 선행을 지적하면서도 자신 역시 공동 메시지 대신 별도 보류를 돌렸어요.",
              "tags": [
                "admission",
                "rule",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
                },
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "체험평가표, 급여 시트, 공동 final message 셋 다 안 끝난 상태였는데 저는 내부 공지로, 준서 씨는 오퍼로 먼저 움직였습니다."
          ],
          "privateKnowledge": [
            "배제감이 규칙 준수보다 먼저 올라왔다."
          ],
          "suppressions": [
            "제 공지가 절차 붕괴를 더 넓혔다는 점은 조심한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-4:rule:0",
              "factText": "세 단계가 안 끝난 상태에서 자신은 내부 공지로, 준서는 오퍼로 먼저 움직였다고 절차 붕괴를 요약한다.",
              "tags": [
                "rule",
                "relationship",
                "responsibility"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
                },
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
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
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "저는 규칙을 지키려던 사람이 아니라, 배제됐다고 느낀 순간 규칙까지 제 방식으로 뒤집은 사람이었습니다."
          ],
          "privateKnowledge": [
            "예전 실패 기억을 핑계 삼았다."
          ],
          "suppressions": [
            "규칙보다 감정이 먼저였다는 자책을 짧게 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-4:emotion:0",
              "factText": "배제감이 올라온 순간 저도 규칙을 자기 방식으로 뒤집었다고 감정적으로 인정해요.",
              "tags": [
                "emotion",
                "rule",
                "admission"
              ],
              "slots": {},
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
            "공동 채용 프로토콜은 둘 다 어겼고, 저는 수습이라는 이름으로 같은 규칙을 또 깼습니다."
          ],
          "privateKnowledge": [
            "수습이라는 말이 제 절차 위반을 가려주지 못한다는 걸 안다."
          ],
          "suppressions": [
            "없음 대신, 수습이라는 이름표 뒤에 숨고 싶던 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-4:admission:1",
              "factText": "공동 채용 프로토콜을 둘 다 어겼고 저도 수습이라는 이름으로 같은 규칙을 다시 깼어요.",
              "tags": [
                "admission",
                "rule",
                "legacy_sentence"
              ],
              "slots": {
                "protocol": {
                  "exact": "체험평가표, 급여 시트, 공동 final message",
                  "neutral": "합의된 3단계"
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
            }
          ]
        }
      },
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "'Day 1 Orientation' 초대까지 갔으면 누가 봐도 최종 채용처럼 보입니다."
          ],
          "privateKnowledge": [
            "그게 자동 발송일 수 있다는 건 아직 모른다."
          ],
          "suppressions": [
            "그 문구를 의도 증거로 너무 크게 잡고 있다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-5:institution:0",
              "factText": "Day 1 Orientation 초대는 누가 봐도 최종 채용처럼 보여요.",
              "tags": [
                "institution",
                "evidence",
                "counter"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "일정 제목이 저 정도면 저는 당연히 확정으로 읽습니다. 그걸 보고도 배신감을 안 느끼는 게 더 이상하죠."
          ],
          "privateKnowledge": [
            "시스템 작동 방식은 확인하지 않았다."
          ],
          "suppressions": [
            "캘린더 한 줄을 전체 의도처럼 확대하고 있다는 점은 숨겨요."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-5:legacy_sentence:0",
              "factText": "일정 제목 한 줄만으로도 확정과 배신으로 읽는 제 감정을 정당화해요.",
              "tags": [
                "legacy_sentence",
                "emotion",
                "institution"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
                }
              },
              "stanceHints": [
                "hedge",
                "blame"
              ],
              "usableInSubActions": [
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "나중에 보니 온보딩 단계에 넣는 순간 자동 초대가 나가는 구조였다고 하더군요. 그래서 그 문구 하나만으로 준서 씨 의도를 확정하는 건 어려워졌습니다."
          ],
          "privateKnowledge": [
            "그래도 저는 그 장면을 배제 증거처럼 붙들고 싶다."
          ],
          "suppressions": [
            "제 감정 해석이 더해졌다는 점은 덜 말해요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-5:evidence:0",
              "factText": "온보딩 단계에 넣는 순간 자동 초대가 나가는 구조였기 때문에 문구 하나만으로 준서의 의도를 확정하긴 어려워요.",
              "tags": [
                "evidence",
                "institution",
                "admission"
              ],
              "slots": {
                "stage": {
                  "exact": "온보딩 단계",
                  "neutral": "그 단계"
                },
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
                },
                "person": {
                  "exact": "오준서",
                  "neutral": "공동대표",
                  "fullName": "오준서",
                  "judgeRef": "준서 씨"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "도구 문구가 오해를 만든 건 맞습니다. 다만 저는 그 일정 제목을 곧바로 '나를 건너뛴 증거'로 써버렸습니다."
          ],
          "privateKnowledge": [
            "시스템보다 제 해석이 먼저 달렸다."
          ],
          "suppressions": [
            "감정보다 확인이 늦었다는 점은 조심해 말해요."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-5:counter:0",
              "factText": "도구 문구가 오해를 만들었지만 제가 그 제목을 곧바로 배제의 증거로 써버렸어요.",
              "tags": [
                "counter",
                "institution",
                "emotion"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            "솔직히 저는 그 일정 제목을 보는 순간 확인할 생각보다 배신으로 이름 붙일 생각이 먼저 들었습니다. 제 승인권이 무시됐다는 공포가 컸습니다."
          ],
          "privateKnowledge": [
            "품질과 철학이 흔들릴까 두려웠다."
          ],
          "suppressions": [
            "제 공포가 해석을 몰고 갔다는 고백은 짧게 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-5:fear:0",
              "factText": "일정 제목을 보자마자 확인보다 배신으로 이름 붙였고 승인권이 무시됐다는 공포가 컸어요.",
              "tags": [
                "fear",
                "emotion",
                "admission"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
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
            "자동 캘린더 초대가 최종 채용처럼 보이게 만든 건 기술적 문제였고, 저는 그걸 의도 증거처럼 과하게 읽었습니다."
          ],
          "privateKnowledge": [
            "시스템 오해와 제 해석 과잉이 동시에 있었다는 걸 안다."
          ],
          "suppressions": [
            "없음 대신, 그 제목 한 줄을 붙잡고 싶던 마음이 남아 있다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "partnership-10:b:tell:betrayal_headline",
            "partnership-10:b:tell:pressure_echo",
            "partnership-10:b:tell:proof_zoom"
          ],
          "claimAtoms": [
            {
              "id": "partnership-10:b:d-5:admission:0",
              "factText": "자동 캘린더 초대가 최종 채용처럼 보이게 만든 기술적 문제와 제가 그것을 의도 증거처럼 과하게 읽은 점을 함께 인정해요.",
              "tags": [
                "admission",
                "institution",
                "relationship"
              ],
              "slots": {
                "invite": {
                  "exact": "'Day 1 Orientation'",
                  "neutral": "첫 출근처럼 보이는 일정 문구"
                },
                "tool": {
                  "exact": "HR 툴 자동 캘린더",
                  "neutral": "그 시스템"
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
            }
          ]
        }
      }
    }
  }
} as const;


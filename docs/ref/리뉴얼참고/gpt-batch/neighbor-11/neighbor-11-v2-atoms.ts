export const neighbor11V2Atoms = {
  "caseId": "neighbor-11",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 무단 침입을 한 게 아니라 공용 설비 상태를 확인하려고 4층 창고 쪽에 잠깐 들어간 겁니다."
          ],
          "privateKnowledge": [
            "정식 승인 대신 휴대폰 NFC 복제앱으로 야간관리 태그 UID를 읽어 4층 서비스도어를 열었다.",
            "김라은과 출입 장면이 보이도록 시간과 동선을 사전에 맞췄다."
          ],
          "suppressions": [
            "문자나 관리대행사 입회 같은 공식 허락은 없었다.",
            "출입 자체가 보상 압박용 장면 연출의 일부였다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-1:denial:0",
              "factText": "4층 창고 출입이 무단 침입이 아니라 공용 설비 점검이었다는 주장",
              "tags": [
                "denial",
                "act",
                "context"
              ],
              "slots": {
                "location": {
                  "exact": "4층 창고",
                  "neutral": "그 공간"
                },
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "출입기록을 보시면 짧은 시간 열렸다 닫혔고, 그때는 장비 습도와 덕트 상태를 확인할 필요가 있었습니다."
          ],
          "privateKnowledge": [
            "짧은 출입기록이라는 형식 뒤에 복제 태그 사용 사실이 숨겨져 있다.",
            "라은이 창고 불을 켜 둔 상태에서 들어가면 된다는 신호를 먼저 줬다."
          ],
          "suppressions": [
            "핵심인 허락 관계를 로그 설명으로 흐리고 있다.",
            "정식 발급 태그가 아니라 복제본이 사용됐다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-1:timeline:0",
              "factText": "출입시각과 로그만 길게 말해 허락 여부를 흐리려는 진술",
              "tags": [
                "timeline",
                "evidence",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "exact": "사건 당일 새벽",
                  "neutral": "그때",
                  "period": "당일 새벽"
                },
                "device": {
                  "exact": "휴대폰 NFC 복제앱 기록",
                  "neutral": "그 앱 기록"
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
            "복제 흔적이 남았다면 문을 연 방식은 제 책임이지만, 그때 실제 누수 피해를 확인하려던 것도 사실입니다."
          ],
          "privateKnowledge": [
            "복제 태그 사용은 단순 확인보다 갈등 장면을 만들기 쉬운 방법이어서 선택했다."
          ],
          "suppressions": [
            "복제 대신 정식 허락을 구할 수 있었는데도 그렇게 하지 않았다.",
            "메신저에서 '이제 들어가면 된다'는 사전 합의가 있었다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:log_wall"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-1:act:0",
              "factText": "복제 태그 사용은 인정하면서도 실제 하자 확인 목적이었다고 함께 묶는 진술",
              "tags": [
                "act",
                "admission",
                "self_justification"
              ],
              "slots": {
                "method": {
                  "exact": "야간관리 태그 복제본",
                  "neutral": "그 출입수단"
                },
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
                }
              },
              "stanceHints": [
                "partial"
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
            "창고 불이 켜져 있었고 안쪽 동선도 이미 맞춰져 있었으니, 그 장면을 저 혼자 만든 것처럼 볼 수는 없습니다."
          ],
          "privateKnowledge": [
            "출입 장면은 둘이 같이 설계한 연출이었다."
          ],
          "suppressions": [
            "복제 태그를 쓴 주도적 선택은 자신의 판단이었다.",
            "라은이 몰랐던 부분과 알고 있던 부분을 일부러 섞어 말한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-1:responsibility:0",
              "factText": "출입 장면의 준비와 책임을 김라은과 나눠 가지려는 주장",
              "tags": [
                "responsibility",
                "relationship",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "location": {
                  "exact": "4층 창고",
                  "neutral": "그 공간"
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
            "정식 권한 없이 복제 태그를 쓴 건 선을 넘은 행동이었습니다. 밤에 남의 점포를 드나드는 사람처럼 보일까 봐 더 버텼습니다."
          ],
          "privateKnowledge": [
            "자신이 가장 취약하게 느끼는 지점이 출입권한 위반이라는 걸 안다."
          ],
          "suppressions": [
            "복제 태그 사용이 보상용 장면 연출의 출발점이었다는 말은 아직 전부 꺼내지 못한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-1:shame:0",
              "factText": "복제 태그 사용이 권한 경계를 넘은 행동이었다는 자각",
              "tags": [
                "shame",
                "emotion",
                "rule"
              ],
              "slots": {
                "method": {
                  "exact": "야간관리 태그 복제본",
                  "neutral": "그 출입수단"
                },
                "time": {
                  "exact": "사건 당일 새벽",
                  "neutral": "그때",
                  "period": "당일 새벽"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "제가 휴대폰으로 야간관리 태그를 복제해 4층 서비스도어를 열었고, 그 출입 장면을 보상 압박의 시작점으로 썼습니다."
          ],
          "privateKnowledge": [
            "출입 장면이 갈등 전체를 설계하는 첫 단계였음을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-1:admission:0",
              "factText": "유성재가 복제 태그로 4층 서비스도어를 열어 보상 압박용 장면을 만든 사실",
              "tags": [
                "admission",
                "act",
                "motive",
                "responsibility"
              ],
              "slots": {
                "method": {
                  "exact": "야간관리 태그 복제본",
                  "neutral": "그 출입수단"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "라은 씨가 낸 영상과 사진은 과장이 있을 수 있어도, 실제 하자 피해를 보여 주는 자료라고 봤습니다."
          ],
          "privateKnowledge": [
            "31초 클립이 앞뒤 맥락 없이 잘린 편집본이라는 걸 알고 있었다.",
            "재고 배열이 손실을 크게 보이게 다시 정리된 장면이라는 점도 눈치챘다."
          ],
          "suppressions": [
            "편집과 연출을 알면서도 자신의 주장에 유리하다고 이용했다.",
            "직원 진술 초안 존재를 직접 언급하지 않는다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-2:evidence:0",
              "factText": "편집본과 손실 사진을 실제 하자 피해 자료로 포장하는 입장",
              "tags": [
                "evidence",
                "context",
                "denial"
              ],
              "slots": {
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                },
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
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
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "영상 편집은 제가 한 게 아니고, 저는 그 자료에서 보이는 누수 흔적과 냄새 문제만 확인한 겁니다."
          ],
          "privateKnowledge": [
            "편집 주체를 라은에게만 넘기며 자신이 그 편집의 이익을 본 사실을 뺀다."
          ],
          "suppressions": [
            "편집본이라는 사실을 알고도 반박하지 않았다.",
            "재고손실이 모두 침입 이후 발생한 것처럼 말하는 프레임에 동조했다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-2:context:0",
              "factText": "편집 주체를 김라은에게 넘기며 자신은 실제 하자만 본 것처럼 말하는 진술",
              "tags": [
                "context",
                "uncertainty",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
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
            "31초만 돌린 건 압니다. 다만 실제 누수와 냉방 장애로 손실이 있었던 것도 사실이라 그 선을 제가 흐렸습니다."
          ],
          "privateKnowledge": [
            "실제 피해가 있다는 점을 방패로 삼아 편집과 연출을 묵인했다."
          ],
          "suppressions": [
            "클립이 사건 다음 날 아침 휴대폰 편집 앱으로 다시 인코딩된 자료라는 점은 아직 뺀다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:log_wall"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-2:counter:0",
              "factText": "31초 편집본이라는 점은 인정하면서도 실제 하자를 이유로 연출을 감싸는 진술",
              "tags": [
                "counter",
                "harm",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                },
                "loss": {
                  "exact": "장기화된 냉방 장애 손실",
                  "neutral": "누적된 손실"
                }
              },
              "stanceHints": [
                "partial"
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
            "박스 배열이나 직원 쪽 멘트는 라은 씨가 더 적극적으로 만든 부분이고, 저는 실제 하자 자료와 섞이는 걸 막지 못했습니다."
          ],
          "privateKnowledge": [
            "자신도 그 연출이 보상 요구에 도움이 된다고 판단했다."
          ],
          "suppressions": [
            "편집과 연출을 제때 끊지 않고 공모 구조를 유지했다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-2:self_justification:0",
              "factText": "재고 연출 주도는 김라은에게 돌리면서 자신의 묵인은 축소하는 진술",
              "tags": [
                "self_justification",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "evidence": {
                  "exact": "재고손실 사진 묶음",
                  "neutral": "그 사진들"
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
            "실제 하자 피해가 있었다고 해도, 연출된 손실까지 그대로 두면 결국 제가 거짓을 뒷받침한 셈이었습니다."
          ],
          "privateKnowledge": [
            "실제 피해와 연출 피해를 의도적으로 한 문장에 섞어 버텨 왔다."
          ],
          "suppressions": [
            "같은 상자를 여러 각도로 찍어 피해 범위를 넓혀 보이게 한 점을 아직 다 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-2:emotion:0",
              "factText": "실제 하자와 연출 손실을 섞어 준 책임을 자각하는 상태",
              "tags": [
                "emotion",
                "shame",
                "harm"
              ],
              "slots": {
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
                },
                "evidence": {
                  "exact": "재고손실 사진 묶음",
                  "neutral": "그 사진들"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "라은 씨가 만든 편집 영상과 연출된 재고손실이 과장이라는 걸 알면서도, 저는 그 자료를 실제 피해처럼 보상 요구에 써먹었습니다."
          ],
          "privateKnowledge": [
            "편집과 연출을 알면서도 공동 전략으로 활용했다는 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-2:admission:0",
              "factText": "편집 영상과 연출 손실이 과장임을 알면서도 유성재가 이용한 사실",
              "tags": [
                "admission",
                "evidence",
                "responsibility",
                "harm"
              ],
              "slots": {
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                },
                "document": {
                  "exact": "재고손실 사진 묶음",
                  "neutral": "그 사진들"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "저와 라은 씨는 같은 하자를 겪은 임차인일 뿐이고, 상층·하층 갈등을 짜 맞춘 적은 없습니다."
          ],
          "privateKnowledge": [
            "둘은 사건 전날 밤부터 침입 장면, 손실 자료, 보상 요구 강도를 함께 조율했다."
          ],
          "suppressions": [
            "비밀 메신저 대화와 같은 템플릿 문서 작성 정황을 숨긴다.",
            "갈등이 자연발생처럼 보이도록 각자 따로 문서를 낸 척했다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-3:denial:0",
              "factText": "공동 피해자였을 뿐 공모는 없었다는 주장",
              "tags": [
                "denial",
                "relationship",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
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
            "자료를 맞춰 본 건 있지만, 그건 민원 타이밍과 보상 항목을 정리한 수준이지 갈등 연출은 아니었습니다."
          ],
          "privateKnowledge": [
            "메신저에서 '싸우는 그림'과 출입 장면의 순서를 이미 논의했다."
          ],
          "suppressions": [
            "공동 민원 정리와 공모의 경계를 의도적으로 흐린다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-3:relationship:0",
              "factText": "민원 정리 수준이었다며 공모와의 경계를 흐리는 진술",
              "tags": [
                "relationship",
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
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
            "메시지를 주고받은 건 맞습니다. 다만 그때도 저는 하자 보상을 받기 위한 공동 대응이라고만 생각했습니다."
          ],
          "privateKnowledge": [
            "공동 대응이라는 표현 안에 갈등 연출과 보상 압박 계획이 함께 들어 있었다."
          ],
          "suppressions": [
            "'이제 들어가면 된다'는 식의 직접적 실행 신호를 숨긴다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:log_wall"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-3:context:0",
              "factText": "비밀 메신저 대화는 인정하지만 공동 대응이라는 표현으로 공모성을 누그러뜨리는 진술",
              "tags": [
                "context",
                "quote",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "비밀 메신저 대화",
                  "neutral": "그 대화"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "partial"
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
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "보상 요구 금액과 문구를 맞춘 건 사실이고, 싸우는 그림이 보여야 움직인다고 본 것도 둘 다였습니다."
          ],
          "privateKnowledge": [
            "자연 갈등처럼 보이게 별도 문서를 내고 서로를 비난하는 구조까지 설계했다."
          ],
          "suppressions": [
            "같은 노트북과 템플릿으로 문서를 만든 흔적은 아직 버틴다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-3:responsibility:0",
              "factText": "보상 요구 강도와 갈등 이미지가 공동 설계였음을 부분 인정하는 상태",
              "tags": [
                "responsibility",
                "motive",
                "quote"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
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
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "하자 보상을 받아야 한다는 생각이 맞더라도, 제가 그걸 갈등 설계로 바꿔 버린 순간부터는 다른 문제가 됐습니다."
          ],
          "privateKnowledge": [
            "정당한 민원을 설계된 분쟁으로 바꾼 책임을 스스로 안다."
          ],
          "suppressions": [
            "문서 포렌식 비교표가 나온 뒤에도 감정을 빼고 기술 설명으로 버티려 한 점을 뺀다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-3:emotion:0",
              "factText": "정당한 하자 민원을 설계된 갈등으로 바꾼 책임을 자각하는 상태",
              "tags": [
                "emotion",
                "shame",
                "motive"
              ],
              "slots": {
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
                },
                "document": {
                  "exact": "보상요구서 포렌식 비교표",
                  "neutral": "그 문서 비교표"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "저와 김라은 씨는 오래 방치된 하자 보상과 임대료 감면을 끌어내려고 침입 장면, 손실 자료, 요구서를 함께 설계했습니다."
          ],
          "privateKnowledge": [
            "갈등 전체가 공동 연출이었다는 핵심을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-3:admission:0",
              "factText": "상층·하층 갈등 자체가 보상과 감면을 노린 공동 연출이었다는 자백",
              "tags": [
                "admission",
                "relationship",
                "motive",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "건물주 쪽은 그때까지 보수나 임대료 감면을 검토한 적이 전혀 없다고 봤습니다."
          ],
          "privateKnowledge": [
            "실제 내부 검토 여부는 몰랐지만, 아무 움직임도 없다는 전제를 분쟁 전략의 근거로 삼았다."
          ],
          "suppressions": [
            "자신의 단정이 확인된 사실이 아니라 추정이었다.",
            "보상안 부재를 갈등 연출의 정당화 근거로 썼다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-4:institution:0",
              "factText": "건물주 측이 아무 보상안도 검토하지 않았다는 단정",
              "tags": [
                "institution",
                "denial",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "건물주 측",
                  "neutral": "상대 측",
                  "fullName": "건물주 측",
                  "judgeRef": "건물주 측"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "적어도 저희에게 공식 통지는 없었고, 그래서 현장에서는 아무 검토도 안 하는 걸로 보였습니다."
          ],
          "privateKnowledge": [
            "'통지가 없었다'와 '검토가 없었다'를 일부러 같은 말처럼 쓴다."
          ],
          "suppressions": [
            "관리대행사 내부에서 움직임이 있었을 가능성을 닫아 둔다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-4:uncertainty:0",
              "factText": "공식 통지 부재를 내부 검토 부재와 같은 뜻으로 묶는 진술",
              "tags": [
                "uncertainty",
                "institution",
                "counter"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "person": {
                  "exact": "건물주 측",
                  "neutral": "상대 측",
                  "fullName": "건물주 측",
                  "judgeRef": "건물주 측"
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
            "초안이 있었다면 저희한테는 전달되지 않은 겁니다. 저희 입장에선 계속 방치로 보일 수밖에 없었습니다."
          ],
          "privateKnowledge": [
            "내부 초안이 존재했다는 가능성을 처음 인정한다."
          ],
          "suppressions": [
            "사건 전날 밤 초안 이메일이 실제로 오갔다는 사실을 아직 체감적으로 받아들이지 못한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:log_wall"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-4:counter:0",
              "factText": "내부 초안 가능성은 인정하지만 전달되지 않았다는 점으로 책임을 되돌리려는 진술",
              "tags": [
                "counter",
                "institution",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "person": {
                  "exact": "건물주 측",
                  "neutral": "상대 측",
                  "fullName": "건물주 측",
                  "judgeRef": "건물주 측"
                }
              },
              "stanceHints": [
                "partial"
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
            "전날 밤 초안이 있었다면 제 '전혀 검토 안 했다'는 말은 과했지만, 몇 달 동안 지연된 불신이 그 단정을 키운 겁니다."
          ],
          "privateKnowledge": [
            "절대적 표현이 무너졌다는 걸 안다."
          ],
          "suppressions": [
            "초안 존재를 알았더라면 공개 압박 수위가 달라졌을 가능성을 뺀다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-4:threshold:0",
              "factText": "건물주 무대응이라는 절대적 단정이 과했다는 부분 인정",
              "tags": [
                "threshold",
                "institution",
                "emotion"
              ],
              "slots": {
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
                },
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
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
            "보상안이 이미 돌고 있었다는 걸 이제야 들으니, 제가 버텼던 전제가 많이 흔들립니다."
          ],
          "privateKnowledge": [
            "공모를 정당화하던 핵심 전제가 무너지는 순간에 당혹감을 느낀다."
          ],
          "suppressions": [
            "초안 보류의 원인이 공모 정황이었다는 점은 아직 바로 연결하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-4:emotion:0",
              "factText": "보상안 초안 존재를 뒤늦게 알며 자신의 전제가 흔들리는 상태",
              "tags": [
                "emotion",
                "institution",
                "uncertainty"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "건물주 측은 사건 전날 이미 보수와 한시 감면 초안을 검토 중이었고, 제가 '전혀 움직이지 않았다'고 단정한 건 틀렸습니다."
          ],
          "privateKnowledge": [
            "보상안 부재라는 전제가 사실이 아니었다는 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-4:admission:0",
              "factText": "건물주 측이 사건 전날 이미 보수·감면 초안을 검토 중이었다는 인정",
              "tags": [
                "admission",
                "institution",
                "rule",
                "responsibility"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "관리대행사 확인 전에 공개 압박을 한 건 아니고, 불편이 계속돼서 문제를 공유한 수준이었습니다."
          ],
          "privateKnowledge": [
            "원본 확인 뒤 공동 민원을 넣기로 해 놓고 편집본과 손실 요약을 먼저 돌렸다."
          ],
          "suppressions": [
            "여론 반응이 빨리 붙도록 표현 수위를 조정했다.",
            "공개 청구가 계획보다 앞당겨졌다는 점을 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-5:denial:0",
              "factText": "관리대행사 확인 전 공개 압박은 없었다는 주장",
              "tags": [
                "denial",
                "rule",
                "context"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "대행사 확인이 너무 늦어져서 예비 자료를 먼저 보낸 겁니다. 그때는 공식 압박이라기보다 사전 문제제기라고 생각했습니다."
          ],
          "privateKnowledge": [
            "예비 자료라는 표현 안에 편집본과 부풀린 손실 요약이 포함돼 있다."
          ],
          "suppressions": [
            "원래 합의했던 절차를 스스로 앞질렀다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:a:tell:log_wall",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-5:context:0",
              "factText": "절차를 앞당긴 이유를 지연 대응 탓으로 돌리는 진술",
              "tags": [
                "context",
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
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
            "결과적으로는 확인 전에 자료가 먼저 나간 게 맞습니다. 다만 그때는 실제 손실이 누적돼 있다는 생각이 더 컸습니다."
          ],
          "privateKnowledge": [
            "확인 전 공개가 전략적 선택이었다는 걸 안다."
          ],
          "suppressions": [
            "자료의 일부가 편집·연출된 점은 아직 함께 꺼내지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:log_wall"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-5:motive:0",
              "factText": "관리대행사 확인 전 자료 선배포는 인정하지만 누적 손실을 이유로 드는 진술",
              "tags": [
                "motive",
                "harm",
                "admission"
              ],
              "slots": {
                "loss": {
                  "exact": "장기화된 냉방 장애 손실",
                  "neutral": "누적된 손실"
                },
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                }
              },
              "stanceHints": [
                "partial"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "공개 압박 문구는 라은 씨 쪽 표현이 더 셌고, 저는 그 흐름을 말리지 않은 책임이 있습니다."
          ],
          "privateKnowledge": [
            "여론을 움직이면 건물주가 더 빨리 돈을 움직일 거라고 둘 다 봤다."
          ],
          "suppressions": [
            "자신도 문구와 발송 시점을 함께 맞췄다는 점을 축소한다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-5:responsibility:0",
              "factText": "공개 압박의 수위는 김라은 쪽이 세었다며 공동 책임을 분산하는 진술",
              "tags": [
                "responsibility",
                "relationship",
                "beneficiary"
              ],
              "slots": {
                "person": {
                  "exact": "김라은",
                  "neutral": "그 사람",
                  "fullName": "김라은",
                  "judgeRef": "김라은 씨"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
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
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "냉방 장애와 누수 손실이 길어지니 기다리는 쪽이 더 손해라고 느꼈습니다. 그래서 절차보다 압박 효과를 앞세웠습니다."
          ],
          "privateKnowledge": [
            "장기 손실에 대한 조급함이 절차 위반으로 이어졌다는 걸 안다."
          ],
          "suppressions": [
            "공개 압박이 다른 임차인 여론을 의도적으로 겨냥한 선택이었다는 점은 절반만 말한다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-5:emotion:0",
              "factText": "누적 손실과 조급함 때문에 절차보다 압박 효과를 우선했다는 고백",
              "tags": [
                "emotion",
                "harm",
                "motive"
              ],
              "slots": {
                "loss": {
                  "exact": "장기화된 냉방 장애 손실",
                  "neutral": "누적된 손실"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "저와 김라은 씨는 관리대행사 원본 확인보다 앞서 편집본과 손실 자료를 먼저 돌려 다른 임차인 여론과 보상 압박을 만들었습니다."
          ],
          "privateKnowledge": [
            "공식 확인보다 압박 효과를 우선한 공동 선택이었다는 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:a:tell:cause_merge",
            "neighbor11:a:tell:dry_tone"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:a:d-5:admission:0",
              "factText": "관리대행사 확인 전에 편집본과 손실 자료로 공개 압박을 만든 사실",
              "tags": [
                "admission",
                "rule",
                "beneficiary",
                "relationship"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "그날 밤 성재 씨가 제 창고 쪽으로 내려온 건 제가 보기에도 침입처럼 느껴졌고, 저는 창고 안전부터 걱정했습니다."
          ],
          "privateKnowledge": [
            "창고 출입 장면을 만들자는 큰 틀의 합의에는 동의했다.",
            "다만 복제 태그 사용 방식까지는 처음에 알지 못했다."
          ],
          "suppressions": [
            "창고 불을 켜 두고 시간대를 맞춰 준 사실을 숨긴다.",
            "사전 합의가 있었다는 점을 완전히 뺀다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-1:fear:0",
              "factText": "유성재의 창고 출입을 일방적 침입처럼 말하는 주장",
              "tags": [
                "fear",
                "act",
                "denial"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "location": {
                  "exact": "4층 창고",
                  "neutral": "그 공간"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "문이 어떻게 열린 건지는 몰랐고, 저는 심야에 창고 안쪽이 흔들린 정황만 본 겁니다."
          ],
          "privateKnowledge": [
            "출입 시간대와 촬영 각도는 사전에 맞춰 뒀다."
          ],
          "suppressions": [
            "출입 장면 자체는 미리 알고 있었다.",
            "복제 태그 의심이 들었어도 그대로 피해 서사를 밀었다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-1:uncertainty:0",
              "factText": "문이 열린 방식은 모른다며 출입 장면의 사전 합의를 숨기는 진술",
              "tags": [
                "uncertainty",
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "사건 당일 새벽",
                  "neutral": "그때",
                  "period": "당일 새벽"
                },
                "location": {
                  "exact": "4층 서비스도어",
                  "neutral": "그 문"
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
            "창고에 들어오는 장면 자체는 미리 알았지만, 야간관리 태그를 복제해서 열 줄은 그때 몰랐습니다."
          ],
          "privateKnowledge": [
            "출입 장면이 피해 서사의 핵심 장면이 되도록 준비해 뒀다."
          ],
          "suppressions": [
            "복제 사실을 뒤늦게 알아차린 뒤에도 영상 유포를 멈추지 않았다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:moral_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-1:admission:0",
              "factText": "창고 출입 장면 사전 합의는 인정하지만 복제 태그 사용은 몰랐다고 하는 진술",
              "tags": [
                "admission",
                "act",
                "uncertainty"
              ],
              "slots": {
                "method": {
                  "exact": "야간관리 태그 복제본",
                  "neutral": "그 출입수단"
                },
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                }
              },
              "stanceHints": [
                "partial"
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
            "복제 태그를 쓰는 방식과 서비스도어 경로는 성재 씨 판단이었고, 저는 그 장면을 피해처럼 보이게 돌린 책임이 있습니다."
          ],
          "privateKnowledge": [
            "복제 방식이 드러난 뒤에도 그 장면을 피해 프레임으로 적극 활용했다."
          ],
          "suppressions": [
            "자신도 강한 보상 압박을 위해 그 선택을 묵인했다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-1:responsibility:0",
              "factText": "복제 방식의 주도는 유성재에게 돌리면서 자신의 피해 프레임 활용은 일부 인정하는 상태",
              "tags": [
                "responsibility",
                "relationship",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "method": {
                  "exact": "야간관리 태그 복제본",
                  "neutral": "그 출입수단"
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
            "제가 사실상 허락해 놓고도 나중에는 완전한 침입처럼 말한 건 분명 잘못이었습니다."
          ],
          "privateKnowledge": [
            "피해자 자리를 선점하려고 자신의 동의를 지워 버렸다."
          ],
          "suppressions": [
            "출입 장면이 보상 전략의 일부였다는 전체 맥락은 아직 완전히 털어놓지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-1:shame:0",
              "factText": "사실상 허락해 놓고 침입으로만 말한 점에 대한 자책",
              "tags": [
                "shame",
                "emotion",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "location": {
                  "exact": "4층 창고",
                  "neutral": "그 공간"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "저는 성재 씨와 창고 출입 장면을 만들기로 합의했고, 복제 태그로 문이 열린 뒤에도 그 장면을 침입 피해처럼 돌렸습니다."
          ],
          "privateKnowledge": [
            "창고 출입을 피해 서사의 출발점으로 사용한 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-1:relationship:0",
              "factText": "김라은이 사전 합의된 창고 출입을 침입 피해처럼 유포한 사실",
              "tags": [
                "admission",
                "relationship",
                "act",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "method": {
                  "exact": "야간관리 태그 복제본",
                  "neutral": "그 출입수단"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "제가 돌린 31초 영상은 핵심만 보여 준 거고, 흐트러진 재고와 냄새, 매출 손실은 실제 피해였습니다."
          ],
          "privateKnowledge": [
            "영상은 앞뒤 18초를 자르고 밝기와 속도를 손본 편집본이다.",
            "재고 일부는 다시 배열해 피해가 더 넓어 보이도록 했다."
          ],
          "suppressions": [
            "같은 상자를 여러 각도로 반복 촬영한 점을 숨긴다.",
            "직원에게 성재가 만진 것처럼 말해 달라는 메모 초안을 뺀다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-2:evidence:0",
              "factText": "31초 편집본과 손실 사진을 핵심 피해 자료라고 주장하는 상태",
              "tags": [
                "evidence",
                "harm",
                "denial"
              ],
              "slots": {
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                },
                "document": {
                  "exact": "재고손실 사진 묶음",
                  "neutral": "그 사진들"
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
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "편집은 전달 편의를 위한 거였고, 젖은 종이 냄새나 손님 취소 같은 실제 손해가 있었잖아요."
          ],
          "privateKnowledge": [
            "편집 편의라는 표현으로 맥락 삭제와 재인코딩 흔적을 축소한다."
          ],
          "suppressions": [
            "영상 전후 문맥을 잘라 의도적으로 침입 서사를 강화했다.",
            "손님 취소와 창고 배열을 한 문장에 섞어 피해 규모를 키운다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-2:harm:0",
              "factText": "실제 손해를 앞세워 편집과 연출의 문제를 덮으려는 진술",
              "tags": [
                "harm",
                "context",
                "self_justification"
              ],
              "slots": {
                "loss": {
                  "exact": "장기화된 냉방 장애 손실",
                  "neutral": "누적된 손실"
                },
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
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
            "맞아요, 앞뒤를 잘라 돌렸고 박스도 더 눈에 띄게 다시 놨습니다. 그래도 실제 피해가 있었으니 완전한 허구는 아니라고 버텼습니다."
          ],
          "privateKnowledge": [
            "편집과 재배열이 피해자 자리를 선점하려는 계산이었다."
          ],
          "suppressions": [
            "메모 초안 작성 시점이 사진 촬영보다 앞섰다는 점을 숨긴다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:moral_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-2:admission:0",
              "factText": "영상 편집과 재고 재배열은 인정하지만 실제 피해를 이유로 정당화하려는 진술",
              "tags": [
                "admission",
                "evidence",
                "self_justification"
              ],
              "slots": {
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                },
                "document": {
                  "exact": "재고손실 사진 묶음",
                  "neutral": "그 사진들"
                }
              },
              "stanceHints": [
                "partial"
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
            "실제 누수와 냉방 장애가 계속됐으니, 저는 그 피해가 무시되지 않게 보이도록 더 세게 꾸민 겁니다."
          ],
          "privateKnowledge": [
            "'무시되지 않게'라는 말 안에 과장과 조작이 있다는 걸 안다."
          ],
          "suppressions": [
            "직원 진술 문구까지 설계한 책임을 아직 줄인다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-2:self_justification:0",
              "factText": "실제 하자가 있었으니 연출을 더 세게 했다는 자기정당화",
              "tags": [
                "self_justification",
                "motive",
                "harm"
              ],
              "slots": {
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
                },
                "document": {
                  "exact": "직원 진술 초안",
                  "neutral": "그 메모"
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
            "제가 피해를 쌓아 말하고 같은 상자까지 다시 찍으면서, 사실보다 큰 상처처럼 보이게 만든 건 맞습니다."
          ],
          "privateKnowledge": [
            "피해자 역할을 먼저 차지하고 싶었다는 동기를 인정하기 시작한다."
          ],
          "suppressions": [
            "성재와의 공모를 공동 피해 언어로 가린 점은 아직 일부 남긴다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-2:shame:0",
              "factText": "피해를 의도적으로 크게 보이게 만들었다는 자각",
              "tags": [
                "shame",
                "emotion",
                "harm"
              ],
              "slots": {
                "document": {
                  "exact": "재고손실 사진 묶음",
                  "neutral": "그 사진들"
                },
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-2",
          "state": "S5",
          "publicClaim": [
            "저는 31초 편집본을 돌리고 재고를 다시 배열했으며, 직원 진술 초안까지 만들어 성재 씨가 실제보다 더 많이 건드린 것처럼 꾸몄습니다."
          ],
          "privateKnowledge": [
            "피해 과장이 단순 과장이 아니라 증거 조작에 가까웠다는 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-2:responsibility:0",
              "factText": "김라은이 편집 영상, 재고 재배열, 직원 진술 초안으로 손실을 부풀린 사실",
              "tags": [
                "admission",
                "evidence",
                "harm",
                "responsibility"
              ],
              "slots": {
                "evidence": {
                  "exact": "31초 편집 클립",
                  "neutral": "그 영상"
                },
                "document": {
                  "exact": "직원 진술 초안",
                  "neutral": "그 메모"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "저와 성재 씨는 둘 다 같은 하자에 당한 사람들이지, 갈등을 꾸민 공모자는 아닙니다."
          ],
          "privateKnowledge": [
            "둘은 침입 장면, 손실 자료, 보상요구 문구를 함께 맞췄다."
          ],
          "suppressions": [
            "공동 피해 언어로 공모 사실을 가린다.",
            "비밀 메신저 대화의 실행 문구를 숨긴다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-3:relationship:0",
              "factText": "서로를 공동 피해자로 부르며 공모를 부인하는 주장",
              "tags": [
                "relationship",
                "denial",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "problem": {
                  "exact": "공용 덕트 누수와 냉방 장애",
                  "neutral": "그 하자"
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
            "우리가 한 건 공동 민원 이야기를 나눈 정도예요. 언제 말할지, 얼마나 손해 봤는지 맞춰 본 수준이었죠."
          ],
          "privateKnowledge": [
            "메신저에서는 공동 민원을 넘어 갈등 장면이 필요한지까지 논의했다."
          ],
          "suppressions": [
            "'우리 둘 다 당한 사람'이라는 말로 역할 분담을 덮는다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-3:timeline:0",
              "factText": "공동 민원 조율 정도였다고 범위를 축소하는 진술",
              "tags": [
                "timeline",
                "relationship",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
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
            "메신저로 보상 요구 시점과 금액을 이야기한 건 맞아요. 그래도 그때는 같이 버티는 방법을 찾는다고 생각했어요."
          ],
          "privateKnowledge": [
            "금액과 시점뿐 아니라 싸우는 그림의 효과까지 상의했다."
          ],
          "suppressions": [
            "출입 장면 실행 직전 확인 메시지를 아직 완전히 인정하지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:moral_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-3:context:0",
              "factText": "보상 요구 시점과 금액 조율은 인정하지만 공모 의도는 축소하는 진술",
              "tags": [
                "context",
                "quote",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "비밀 메신저 대화",
                  "neutral": "그 대화"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "partial"
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
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "결국 저희는 싸우는 그림이 나와야 건물주가 움직인다고 봤고, 그 판단을 성재 씨와 같이 밀어붙였습니다."
          ],
          "privateKnowledge": [
            "각자 독립 문서처럼 보이게 요구서를 나눠 만들었다."
          ],
          "suppressions": [
            "같은 노트북 템플릿을 쓴 사실은 아직 끝까지 버틴다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-3:quote:0",
              "factText": "갈등 이미지가 보상 움직임을 만들 거라고 둘이 판단했다는 부분 인정",
              "tags": [
                "quote",
                "motive",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
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
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "제가 '우리 둘 다 당한 사람'이라고 말한 건 사실 공모를 공동 피해 언어로 덮으려는 표현이었습니다."
          ],
          "privateKnowledge": [
            "피해자 자리를 먼저 차지하는 화법으로 공모 사실을 가려 왔다."
          ],
          "suppressions": [
            "문서 메타데이터가 보여 주는 공동 작성까지는 아직 한 번에 다 말하지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-3:emotion:0",
              "factText": "공동 피해 언어가 공모를 가리는 방패였다는 자각",
              "tags": [
                "emotion",
                "shame",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "evidence": {
                  "exact": "비밀 메신저 대화",
                  "neutral": "그 대화"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-3",
          "state": "S5",
          "publicClaim": [
            "저와 성재 씨는 하자 보상과 임대료 감면을 끌어내려고 침입 피해, 손실 자료, 요구서를 함께 짠 공모자였습니다."
          ],
          "privateKnowledge": [
            "갈등 전체가 공동 설계였다는 핵심을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-3:admission:0",
              "factText": "김라은과 유성재가 하자 보상과 감면을 위해 갈등 전체를 공동 설계한 사실",
              "tags": [
                "admission",
                "relationship",
                "motive",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "건물주 쪽은 끝까지 저희를 무시했고, 보상안 같은 건 애초에 검토하지도 않았다고 생각했습니다."
          ],
          "privateKnowledge": [
            "실제 내부 검토 여부는 몰랐지만 무시당했다는 감정이 사실 단정으로 굳어졌다."
          ],
          "suppressions": [
            "무대응이라는 믿음이 연출과 압박을 정당화하는 근거가 됐다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-4:institution:0",
              "factText": "건물주 측이 애초에 보상안을 검토하지 않았다는 믿음",
              "tags": [
                "institution",
                "emotion",
                "denial"
              ],
              "slots": {
                "person": {
                  "exact": "건물주 측",
                  "neutral": "상대 측",
                  "fullName": "건물주 측",
                  "judgeRef": "건물주 측"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "답을 받은 적이 없으니 없는 줄 알았어요. 현장에서는 진짜 아무것도 안 움직이는 것처럼 보였거든요."
          ],
          "privateKnowledge": [
            "답이 없었다는 경험과 내부 초안 부재를 같은 뜻으로 취급한다."
          ],
          "suppressions": [
            "자신의 판단이 확인된 사실이 아니라 체감이었다는 점을 줄인다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-4:uncertainty:0",
              "factText": "답변 부재를 내부 검토 부재와 같은 뜻으로 여긴 진술",
              "tags": [
                "uncertainty",
                "institution",
                "emotion"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "person": {
                  "exact": "건물주 측",
                  "neutral": "상대 측",
                  "fullName": "건물주 측",
                  "judgeRef": "건물주 측"
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
            "초안이 돌고 있었다면 저희한테 안 알려진 거죠. 그래서 저는 계속 무시당했다고 느낀 겁니다."
          ],
          "privateKnowledge": [
            "초안 존재 가능성을 처음 받아들이기 시작한다."
          ],
          "suppressions": [
            "사건 전날 밤 이메일과 일정표가 있었다는 사실이 자신의 피해 서사를 흔든다는 점을 아직 인정하지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:moral_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-4:counter:0",
              "factText": "보상안 초안 가능성은 인정하지만 미통지를 이유로 감정을 유지하는 진술",
              "tags": [
                "counter",
                "institution",
                "context"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
                }
              },
              "stanceHints": [
                "partial"
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
            "이미 검토 중이었다면 제 '전혀 안 봤다'는 말은 틀린 거예요. 다만 그만큼 쌓인 무시의 감정이 컸습니다."
          ],
          "privateKnowledge": [
            "건물주 완전 무대응이라는 서사가 깨지고 있다는 걸 안다."
          ],
          "suppressions": [
            "초안 보류가 공모 정황 때문이었다는 연결은 바로 말하지 않는다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-4:threshold:0",
              "factText": "건물주 완전 무대응이라는 절대적 표현이 틀렸음을 부분 인정하는 상태",
              "tags": [
                "threshold",
                "emotion",
                "institution"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "person": {
                  "exact": "건물주 측",
                  "neutral": "상대 측",
                  "fullName": "건물주 측",
                  "judgeRef": "건물주 측"
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
            "전날 밤 이미 감면안 초안이 있었다는 말을 들으니, 제가 붙들고 있던 피해 서사가 한 번에 무너지는 느낌입니다."
          ],
          "privateKnowledge": [
            "피해자 자리 선점의 핵심 명분이 흔들린다."
          ],
          "suppressions": [
            "공모 정황 때문에 제안이 보류됐다는 점은 아직 감정적으로 받아들이기 어렵다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-4:emotion:0",
              "factText": "초안 존재를 알고 피해 서사의 명분이 무너지는 상태",
              "tags": [
                "emotion",
                "institution",
                "shame"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "goal": {
                  "exact": "보수와 임대료 감면",
                  "neutral": "그 보상안"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "건물주 쪽은 사건 전날 이미 보수와 감면 초안을 검토하고 있었고, 제가 '아무것도 안 했다'고 단정한 건 사실과 달랐습니다."
          ],
          "privateKnowledge": [
            "무대응 서사가 완전한 사실이 아니었다는 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-4:admission:0",
              "factText": "건물주 측이 사건 전날 이미 보수·감면 초안을 검토 중이었다는 인정",
              "tags": [
                "admission",
                "institution",
                "rule",
                "responsibility"
              ],
              "slots": {
                "document": {
                  "exact": "보수·임대료 감면안 초안 이메일",
                  "neutral": "그 초안"
                },
                "time": {
                  "exact": "사건 전날 밤",
                  "neutral": "그 전날",
                  "period": "전날 밤"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
            "저는 도움을 요청한 거지, 관리대행사 확인도 없이 공개 압박부터 한 건 아니에요."
          ],
          "privateKnowledge": [
            "원본 확인 전 편집본과 손실 요약을 먼저 보내 여론을 움직이려 했다."
          ],
          "suppressions": [
            "다른 임차인 반응을 끌어오려는 계산이 있었다.",
            "공개 청구 시점을 의도적으로 앞당겼다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-5:denial:0",
              "factText": "관리대행사 확인 전 공개 압박은 아니었다는 주장",
              "tags": [
                "denial",
                "rule",
                "emotion"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
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
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "대행사 확인이 자꾸 늦으니까 먼저 알릴 수밖에 없었죠. 실제 손실이 계속 쌓이는데 기다리기만 할 순 없잖아요?"
          ],
          "privateKnowledge": [
            "지연 대응을 이유로 들지만, 실제로는 압박 효과를 노린 선행 공개였다."
          ],
          "suppressions": [
            "편집 영상과 부풀린 손실 자료가 포함됐다는 점을 흐린다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-5:harm:0",
              "factText": "누적 손실을 이유로 절차보다 선행 공개를 정당화하는 진술",
              "tags": [
                "harm",
                "context",
                "self_justification"
              ],
              "slots": {
                "loss": {
                  "exact": "장기화된 냉방 장애 손실",
                  "neutral": "누적된 손실"
                },
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
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
            "맞아요, 원본 확인 전에 영상이랑 손실 정리를 먼저 보냈어요. 그때는 그렇게라도 해야 움직일 거라고 생각했습니다."
          ],
          "privateKnowledge": [
            "선행 공개가 실수라기보다 전략이었다."
          ],
          "suppressions": [
            "성재와 발송 순서와 문구를 함께 맞췄다는 점을 아직 뺀다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:damage_stack",
            "neighbor11:b:tell:moral_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-5:motive:0",
              "factText": "관리대행사 확인 전 선행 공개는 인정하면서도 움직이게 하려는 목적을 강조하는 진술",
              "tags": [
                "motive",
                "beneficiary",
                "admission"
              ],
              "slots": {
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
                },
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                }
              },
              "stanceHints": [
                "partial"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "그 압박은 저 혼자 한 게 아니라 성재 씨와 같이 타이밍을 맞춘 거예요. 저도 피해자 자리를 지키려고 더 세게 밀었습니다."
          ],
          "privateKnowledge": [
            "공동 압박 계획을 공동 피해 언어로 덮어 왔다."
          ],
          "suppressions": [
            "자신이 더 감정적인 표현을 앞세워 여론을 붙였다는 점은 줄인다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-5:responsibility:0",
              "factText": "공개 압박의 타이밍이 유성재와 공동 조율이었다는 부분 인정",
              "tags": [
                "responsibility",
                "relationship",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
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
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "매출 손실이 계속 나는데 가만히 기다리면 제가 다 뒤집어쓸 것 같았어요. 그래서 절차보다 체면과 압박을 먼저 챙겼습니다."
          ],
          "privateKnowledge": [
            "체면을 잃지 않으려는 마음이 선행 공개를 밀었다."
          ],
          "suppressions": [
            "다른 임차인 여론을 적극적으로 이용한 계산은 아직 완전히 털어놓지 않는다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-5:emotion:0",
              "factText": "매출 손실과 체면 불안 때문에 절차보다 압박을 우선한 고백",
              "tags": [
                "emotion",
                "harm",
                "shame"
              ],
              "slots": {
                "loss": {
                  "exact": "장기화된 냉방 장애 손실",
                  "neutral": "누적된 손실"
                },
                "audience": {
                  "exact": "다른 임차인 여론",
                  "neutral": "주변 반응"
                }
              },
              "stanceHints": [
                "emotional",
                "admission"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "저는 관리대행사 원본 확인 전에 편집 영상과 손실 요약을 먼저 퍼뜨려 다른 임차인 여론과 건물주 압박을 만들었고, 그 시점도 성재 씨와 맞췄습니다."
          ],
          "privateKnowledge": [
            "공개 압박이 공동 전략이었다는 점을 인정한다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor11:b:tell:moral_jump",
            "neighbor11:b:tell:shared_pain_cover"
          ],
          "claimAtoms": [
            {
              "id": "neighbor11:b:d-5:admission:0",
              "factText": "관리대행사 확인 전에 편집 자료와 손실 요약으로 공개 압박을 만든 사실",
              "tags": [
                "admission",
                "rule",
                "relationship",
                "beneficiary"
              ],
              "slots": {
                "procedure": {
                  "exact": "관리대행사 원본 확인",
                  "neutral": "그 확인 절차"
                },
                "person": {
                  "exact": "유성재",
                  "neutral": "그 사람",
                  "fullName": "유성재",
                  "judgeRef": "유성재 씨"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
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
}

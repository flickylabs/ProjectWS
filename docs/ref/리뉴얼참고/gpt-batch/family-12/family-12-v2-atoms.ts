export const family12V2Atoms = {
  "caseId": "family-12",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 가족방에 잠깐 사실 확인을 요청한 것뿐이고, 현우를 공개적으로 망신 주려던 건 아닙니다.",
            "문제는 애도 중에 현우가 돈 얘기를 꺼냈다는 점이지, 제가 방을 돌며 사람을 선동한 건 아닙니다."
          ],
          "privateKnowledge": [
            "가족방 다음에 고모방, 제사준비방에도 같은 캡처를 순서대로 올렸다.",
            "현우에게 직접 확인하기 전에 업로드가 먼저 나갔다."
          ],
          "suppressions": [
            "세 방 전달 순서와 업로드 시각",
            "직접 확인 없는 선확산",
            "가족 보호 명분 아래 공개 망신을 택한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-1:s0:atom:0",
              "factText": "저는 가족방에 잠깐 사실 확인을 요청한 것뿐이고, 현우를 공개적으로 망신 주려던 건 아닙니다.",
              "tags": [
                "act",
                "context",
                "relationship",
                "denial"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
              "id": "family12:a:d-1:s0:atom:1",
              "factText": "문제는 애도 중에 현우가 돈 얘기를 꺼냈다는 점이지, 제가 방을 돌며 사람을 선동한 건 아닙니다.",
              "tags": [
                "motive",
                "counter",
                "self_justification",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
            "가족방에 올린 건 맞지만, 친척들한테 따로 퍼뜨린 건 아닙니다.",
            "어머니가 충격받을까 봐 장녀인 제가 먼저 분위기를 잡으려 했습니다."
          ],
          "privateKnowledge": [
            "가족방 다음에 고모방, 제사준비방에도 같은 캡처를 순서대로 올렸다.",
            "현우에게 직접 확인하기 전에 업로드가 먼저 나갔다."
          ],
          "suppressions": [
            "세 방 전달 순서와 업로드 시각",
            "직접 확인 없는 선확산",
            "가족 보호 명분 아래 공개 망신을 택한 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-1:s1:atom:0",
              "factText": "가족방에 올린 건 맞지만, 친척들한테 따로 퍼뜨린 건 아닙니다.",
              "tags": [
                "act",
                "context",
                "relationship",
                "uncertainty"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
              "id": "family12:a:d-1:s1:atom:1",
              "factText": "어머니가 충격받을까 봐 장녀인 제가 먼저 분위기를 잡으려 했습니다.",
              "tags": [
                "motive",
                "relationship",
                "self_justification",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "가족방과 고모방에 올린 건 맞습니다. 다만 제사준비방은 내용 공유 차원이었지 현우를 공격하려던 건 아니었습니다.",
            "그때 제 눈에는 현우 말이 너무 잔인하게 들렸습니다."
          ],
          "privateKnowledge": [
            "가족방 다음에 고모방, 제사준비방에도 같은 캡처를 순서대로 올렸다.",
            "현우에게 직접 확인하기 전에 업로드가 먼저 나갔다.",
            "가족 보호라는 명분으로 친척 여론을 먼저 움직이려 했다."
          ],
          "suppressions": [
            "세 방 전달 순서와 업로드 시각",
            "직접 확인 없는 선확산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-1:s2:atom:0",
              "factText": "가족방과 고모방에 올린 건 맞습니다. 다만 제사준비방은 내용 공유 차원이었지 현우를 공격하려던 건 아니었습니다.",
              "tags": [
                "act",
                "relationship",
                "counter",
                "admission"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-1:s2:atom:1",
              "factText": "그때 제 눈에는 현우 말이 너무 잔인하게 들렸습니다.",
              "tags": [
                "motive",
                "emotion",
                "context",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 여러 방에 올린 건 인정합니다. 그런데 현우가 장례 중에 비용 불만을 흘린 건 사실이라 그냥 덮을 수 없었습니다.",
            "장녀로서 어머니가 뒤늦게 듣고 더 상처받는 게 싫었습니다."
          ],
          "privateKnowledge": [
            "가족방 다음에 고모방, 제사준비방에도 같은 캡처를 순서대로 올렸다.",
            "현우에게 직접 확인하기 전에 업로드가 먼저 나갔다.",
            "가족 보호라는 명분으로 친척 여론을 먼저 움직이려 했다."
          ],
          "suppressions": [
            "세 방 전달 순서와 업로드 시각"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:public_protection_claim",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-1:s3:atom:0",
              "factText": "제가 여러 방에 올린 건 인정합니다. 그런데 현우가 장례 중에 비용 불만을 흘린 건 사실이라 그냥 덮을 수 없었습니다.",
              "tags": [
                "act",
                "responsibility",
                "relationship",
                "admission"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-1:s3:atom:1",
              "factText": "장녀로서 어머니가 뒤늦게 듣고 더 상처받는 게 싫었습니다.",
              "tags": [
                "context",
                "relationship",
                "counter",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "솔직히 저는 장례 정산을 혼자 떠안은 사람처럼 숨이 막혔습니다. 현우 말을 보는 순간 또 제가 돈 숨기는 사람으로 몰릴까 겁이 났습니다.",
            "그래서 한 방에서 끝내지 못하고 사람들한테 먼저 보여 버렸습니다."
          ],
          "privateKnowledge": [
            "가족방 다음에 고모방, 제사준비방에도 같은 캡처를 순서대로 올렸다.",
            "현우에게 직접 확인하기 전에 업로드가 먼저 나갔다.",
            "가족 보호라는 명분으로 친척 여론을 먼저 움직이려 했다.",
            "캡처 문장 자체가 현우 원문 그대로는 아니라는 점을 알고 있었다."
          ],
          "suppressions": [
            "세 방 전달 순서와 업로드 시각"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall",
            "family12:a:tell:moral_frame"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-1:s4:atom:0",
              "factText": "솔직히 저는 장례 정산을 혼자 떠안은 사람처럼 숨이 막혔습니다. 현우 말을 보는 순간 또 제가 돈 숨기는 사람으로 몰릴까 겁이 났습니다.",
              "tags": [
                "emotion",
                "context",
                "harm",
                "fear"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
              "id": "family12:a:d-1:s4:atom:1",
              "factText": "그래서 한 방에서 끝내지 못하고 사람들한테 먼저 보여 버렸습니다.",
              "tags": [
                "emotion",
                "relationship",
                "harm",
                "shame"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
            "제가 현우를 확인도 하기 전에 여러 가족방에 캡처를 올려 공개 비난한 건 제 잘못입니다.",
            "가족을 보호한다는 말을 앞세웠지만 결과적으로는 현우 평판을 먼저 무너뜨렸습니다."
          ],
          "privateKnowledge": [
            "가족방 다음에 고모방, 제사준비방에도 같은 캡처를 순서대로 올렸다.",
            "현우에게 직접 확인하기 전에 업로드가 먼저 나갔다.",
            "가족 보호라는 명분으로 친척 여론을 먼저 움직이려 했다.",
            "캡처 문장 자체가 현우 원문 그대로는 아니라는 점을 알고 있었다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-1:s5:atom:0",
              "factText": "제가 현우를 확인도 하기 전에 여러 가족방에 캡처를 올려 공개 비난한 건 제 잘못입니다.",
              "tags": [
                "act",
                "responsibility",
                "harm",
                "admission",
                "quote"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:a:d-1:s5:atom:1",
              "factText": "가족을 보호한다는 말을 앞세웠지만 결과적으로는 현우 평판을 먼저 무너뜨렸습니다.",
              "tags": [
                "responsibility",
                "relationship",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "현우는 장례 중에도 결국 비용부터 따졌습니다.",
            "표현이 정확히 어땠든, 상 치르는 자리에서 그런 질문 자체가 문제였습니다."
          ],
          "privateKnowledge": [
            "현우 원본에는 비용 중복과 화환·식대 질문이 실제로 들어 있다.",
            "문제의 캡처 문장은 현우 원문 1대1 그대로가 아니다."
          ],
          "suppressions": [
            "정확한 인용이 아니었다는 점",
            "본인이 위조 캡처로 사실을 키운 점",
            "오래된 서운함이 해석을 과격하게 만든 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-2:s0:atom:0",
              "factText": "현우는 장례 중에도 결국 비용부터 따졌습니다.",
              "tags": [
                "act",
                "timeline",
                "context",
                "denial"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
              "id": "family12:a:d-2:s0:atom:1",
              "factText": "표현이 정확히 어땠든, 상 치르는 자리에서 그런 질문 자체가 문제였습니다.",
              "tags": [
                "timeline",
                "motive",
                "emotion",
                "counter",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
            "사촌한테 따로 보낸 거라 해도 화환, 식대가 겹친다며 불만을 흘린 건 맞습니다.",
            "제가 예민했던 게 아니라 시기와 태도가 무심했습니다."
          ],
          "privateKnowledge": [
            "현우 원본에는 비용 중복과 화환·식대 질문이 실제로 들어 있다.",
            "문제의 캡처 문장은 현우 원문 1대1 그대로가 아니다."
          ],
          "suppressions": [
            "정확한 인용이 아니었다는 점",
            "본인이 위조 캡처로 사실을 키운 점",
            "오래된 서운함이 해석을 과격하게 만든 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-2:s1:atom:0",
              "factText": "사촌한테 따로 보낸 거라 해도 화환, 식대가 겹친다며 불만을 흘린 건 맞습니다.",
              "tags": [
                "act",
                "timeline",
                "context",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
              "id": "family12:a:d-2:s1:atom:1",
              "factText": "제가 예민했던 게 아니라 시기와 태도가 무심했습니다.",
              "tags": [
                "timeline",
                "motive",
                "emotion",
                "relationship",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "문제의 문장 전체가 현우 원문은 아니어도, 돈 얘기를 먼저 꺼낸 흐름 자체는 사실입니다.",
            "저는 그 냉기를 아버지 장례 자리에서 다시 본 겁니다."
          ],
          "privateKnowledge": [
            "현우 원본에는 비용 중복과 화환·식대 질문이 실제로 들어 있다.",
            "문제의 캡처 문장은 현우 원문 1대1 그대로가 아니다.",
            "할머니 장례 때의 기억 때문에 이번 말투를 더 크게 받아들였다."
          ],
          "suppressions": [
            "정확한 인용이 아니었다는 점",
            "본인이 위조 캡처로 사실을 키운 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-2:s2:atom:0",
              "factText": "문제의 문장 전체가 현우 원문은 아니어도, 돈 얘기를 먼저 꺼낸 흐름 자체는 사실입니다.",
              "tags": [
                "act",
                "timeline",
                "counter",
                "admission",
                "quote"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-2:s2:atom:1",
              "factText": "저는 그 냉기를 아버지 장례 자리에서 다시 본 겁니다.",
              "tags": [
                "timeline",
                "motive",
                "emotion",
                "context"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "현우는 '중복 비용만 물었다'고 줄이지만, 장례 사흘째 밤에 사촌 사이드채팅으로 불만을 흘린 건 분명합니다.",
            "예전 할머니 장례 때도 비슷해서 저는 더 크게 받아들였습니다."
          ],
          "privateKnowledge": [
            "현우 원본에는 비용 중복과 화환·식대 질문이 실제로 들어 있다.",
            "문제의 캡처 문장은 현우 원문 1대1 그대로가 아니다.",
            "할머니 장례 때의 기억 때문에 이번 말투를 더 크게 받아들였다."
          ],
          "suppressions": [
            "정확한 인용이 아니었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:public_protection_claim",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-2:s3:atom:0",
              "factText": "현우는 '중복 비용만 물었다'고 줄이지만, 장례 사흘째 밤에 사촌 사이드채팅으로 불만을 흘린 건 분명합니다.",
              "tags": [
                "act",
                "timeline",
                "responsibility",
                "admission"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-2:s3:atom:1",
              "factText": "예전 할머니 장례 때도 비슷해서 저는 더 크게 받아들였습니다.",
              "tags": [
                "timeline",
                "emotion",
                "context",
                "relationship",
                "counter"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 장녀로 정산표를 붙잡고 있는데, 동생이 뒤에서 숫자부터 세는 것처럼 느껴졌습니다.",
            "정확한 문구보다 그 차가운 기색이 제겐 더 큰 상처였습니다."
          ],
          "privateKnowledge": [
            "현우 원본에는 비용 중복과 화환·식대 질문이 실제로 들어 있다.",
            "문제의 캡처 문장은 현우 원문 1대1 그대로가 아니다.",
            "할머니 장례 때의 기억 때문에 이번 말투를 더 크게 받아들였다.",
            "현우의 실제 잘못과 위조 캡처의 과장이 뒤섞여 버렸다."
          ],
          "suppressions": [
            "정확한 인용이 아니었다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall",
            "family12:a:tell:moral_frame"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-2:s4:atom:0",
              "factText": "저는 장녀로 정산표를 붙잡고 있는데, 동생이 뒤에서 숫자부터 세는 것처럼 느껴졌습니다.",
              "tags": [
                "timeline",
                "emotion",
                "context",
                "fear"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
              "id": "family12:a:d-2:s4:atom:1",
              "factText": "정확한 문구보다 그 차가운 기색이 제겐 더 큰 상처였습니다.",
              "tags": [
                "timeline",
                "emotion",
                "relationship",
                "shame"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
            "현우가 비용 중복을 차갑게 따진 건 사실입니다.",
            "다만 제가 그 사실을 과장된 문장과 위조 캡처로 키운 건 별개의 잘못입니다."
          ],
          "privateKnowledge": [
            "현우 원본에는 비용 중복과 화환·식대 질문이 실제로 들어 있다.",
            "문제의 캡처 문장은 현우 원문 1대1 그대로가 아니다.",
            "할머니 장례 때의 기억 때문에 이번 말투를 더 크게 받아들였다.",
            "현우의 실제 잘못과 위조 캡처의 과장이 뒤섞여 버렸다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-2:s5:atom:0",
              "factText": "현우가 비용 중복을 차갑게 따진 건 사실입니다.",
              "tags": [
                "act",
                "timeline",
                "responsibility",
                "admission"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:a:d-2:s5:atom:1",
              "factText": "다만 제가 그 사실을 과장된 문장과 위조 캡처로 키운 건 별개의 잘못입니다.",
              "tags": [
                "timeline",
                "emotion",
                "responsibility",
                "relationship",
                "harm",
                "quote"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "현우가 정확히 그 문자 그대로 안 썼다 해도 뜻은 똑같았습니다.",
            "상갓집에서 정산부터 말한 사람이라는 본질은 안 바뀝니다."
          ],
          "privateKnowledge": [
            "문제 문구는 현우 원문 한 줄이 아니라 여러 표현을 이어 붙인 결과다.",
            "나와의 채팅에 적어 둔 임시문장을 합성에 활용했다."
          ],
          "suppressions": [
            "정확한 문구가 허위라는 점",
            "자신의 임시문장이 섞였다는 점",
            "두려움이 사실 판단을 앞선 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-3:s0:atom:0",
              "factText": "현우가 정확히 그 문자 그대로 안 썼다 해도 뜻은 똑같았습니다.",
              "tags": [
                "act",
                "context",
                "denial",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
              "id": "family12:a:d-3:s0:atom:1",
              "factText": "상갓집에서 정산부터 말한 사람이라는 본질은 안 바뀝니다.",
              "tags": [
                "motive",
                "counter",
                "self_justification",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
            "문장 배열이 1대1 원문 그대로였는지는 기억이 흐립니다.",
            "그래도 현우가 어머니 통장 얘기까지 꺼낸 것처럼 받아들일 만한 흐름은 있었습니다."
          ],
          "privateKnowledge": [
            "문제 문구는 현우 원문 한 줄이 아니라 여러 표현을 이어 붙인 결과다.",
            "나와의 채팅에 적어 둔 임시문장을 합성에 활용했다."
          ],
          "suppressions": [
            "정확한 문구가 허위라는 점",
            "자신의 임시문장이 섞였다는 점",
            "두려움이 사실 판단을 앞선 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-3:s1:atom:0",
              "factText": "문장 배열이 1대1 원문 그대로였는지는 기억이 흐립니다.",
              "tags": [
                "act",
                "context",
                "uncertainty",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
              "id": "family12:a:d-3:s1:atom:1",
              "factText": "그래도 현우가 어머니 통장 얘기까지 꺼낸 것처럼 받아들일 만한 흐름은 있었습니다.",
              "tags": [
                "motive",
                "relationship",
                "self_justification",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "문제 캡처 문장이 현우 원문 한 줄은 아니라는 건 인정합니다.",
            "다만 비용과 정산을 먼저 본 태도 자체는 현우 대화에 분명히 있었습니다."
          ],
          "privateKnowledge": [
            "문제 문구는 현우 원문 한 줄이 아니라 여러 표현을 이어 붙인 결과다.",
            "나와의 채팅에 적어 둔 임시문장을 합성에 활용했다.",
            "어머니 통장 이야기까지 이어질까 봐 최악을 미리 상상했다."
          ],
          "suppressions": [
            "정확한 문구가 허위라는 점",
            "자신의 임시문장이 섞였다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-3:s2:atom:0",
              "factText": "문제 캡처 문장이 현우 원문 한 줄은 아니라는 건 인정합니다.",
              "tags": [
                "act",
                "counter",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-3:s2:atom:1",
              "factText": "다만 비용과 정산을 먼저 본 태도 자체는 현우 대화에 분명히 있었습니다.",
              "tags": [
                "motive",
                "emotion",
                "context",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 서로 다른 표현을 한 장처럼 보이게 만든 건 사실입니다.",
            "하지만 그렇게까지 한 건 현우가 장례와 비용을 같은 호흡으로 다뤘다고 느꼈기 때문입니다."
          ],
          "privateKnowledge": [
            "문제 문구는 현우 원문 한 줄이 아니라 여러 표현을 이어 붙인 결과다.",
            "나와의 채팅에 적어 둔 임시문장을 합성에 활용했다.",
            "어머니 통장 이야기까지 이어질까 봐 최악을 미리 상상했다."
          ],
          "suppressions": [
            "정확한 문구가 허위라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:public_protection_claim",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-3:s3:atom:0",
              "factText": "제가 서로 다른 표현을 한 장처럼 보이게 만든 건 사실입니다.",
              "tags": [
                "act",
                "responsibility",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-3:s3:atom:1",
              "factText": "하지만 그렇게까지 한 건 현우가 장례와 비용을 같은 호흡으로 다뤘다고 느꼈기 때문입니다.",
              "tags": [
                "context",
                "relationship",
                "counter",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "솔직히 저는 어머니 통장 얘기까지 먼저 올까 봐 머릿속에서 최악의 문장을 붙여 버렸습니다.",
            "그 불안이 사실보다 센 표현을 만들었습니다."
          ],
          "privateKnowledge": [
            "문제 문구는 현우 원문 한 줄이 아니라 여러 표현을 이어 붙인 결과다.",
            "나와의 채팅에 적어 둔 임시문장을 합성에 활용했다.",
            "어머니 통장 이야기까지 이어질까 봐 최악을 미리 상상했다.",
            "현우의 실제 비용 문의가 있었기에 과장 프레임이 먹힐 거라고 보았다."
          ],
          "suppressions": [
            "정확한 문구가 허위라는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall",
            "family12:a:tell:moral_frame"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-3:s4:atom:0",
              "factText": "솔직히 저는 어머니 통장 얘기까지 먼저 올까 봐 머릿속에서 최악의 문장을 붙여 버렸습니다.",
              "tags": [
                "emotion",
                "context",
                "fear",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
              "id": "family12:a:d-3:s4:atom:1",
              "factText": "그 불안이 사실보다 센 표현을 만들었습니다.",
              "tags": [
                "emotion",
                "relationship",
                "shame",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
            "현우는 '상갓집도 결국 정산, 엄마 통장부터 보자'라는 정확한 문장을 보내지 않았습니다.",
            "그 문장은 제가 그의 비용 문의와 제 임시문장을 섞어 만든 허위 프레임이었습니다."
          ],
          "privateKnowledge": [
            "문제 문구는 현우 원문 한 줄이 아니라 여러 표현을 이어 붙인 결과다.",
            "나와의 채팅에 적어 둔 임시문장을 합성에 활용했다.",
            "어머니 통장 이야기까지 이어질까 봐 최악을 미리 상상했다.",
            "현우의 실제 비용 문의가 있었기에 과장 프레임이 먹힐 거라고 보았다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-3:s5:atom:0",
              "factText": "현우는 '상갓집도 결국 정산, 엄마 통장부터 보자'라는 정확한 문장을 보내지 않았습니다.",
              "tags": [
                "act",
                "responsibility",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:a:d-3:s5:atom:1",
              "factText": "그 문장은 제가 그의 비용 문의와 제 임시문장을 섞어 만든 허위 프레임이었습니다.",
              "tags": [
                "responsibility",
                "relationship",
                "harm",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "그 캡처는 제가 받은 걸 다시 저장한 정도지, 위조라고 할 건 아닙니다.",
            "폰트나 간격 차이는 재저장 과정에서 생길 수 있습니다."
          ],
          "privateKnowledge": [
            "PC에서 서로 다른 대화창과 메모를 조합해 이미지를 만들었다.",
            "나와의 채팅 임시문장과 자동저장 PNG가 남아 있다."
          ],
          "suppressions": [
            "직접 편집한 경로와 순서",
            "임시문장을 만들어 넣은 사실",
            "수치심 때문에 확인보다 편집을 택한 이유"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-4:s0:atom:0",
              "factText": "그 캡처는 제가 받은 걸 다시 저장한 정도지, 위조라고 할 건 아닙니다.",
              "tags": [
                "act",
                "evidence",
                "context",
                "privacy",
                "denial",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
              "id": "family12:a:d-4:s0:atom:1",
              "factText": "폰트나 간격 차이는 재저장 과정에서 생길 수 있습니다.",
              "tags": [
                "motive",
                "evidence",
                "counter",
                "self_justification"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
            "잘 보이게 자르거나 순서를 맞춘 건 있어도 없는 말을 만든 건 아닙니다.",
            "핵심 취지는 현우 원문에서 벗어나지 않았습니다."
          ],
          "privateKnowledge": [
            "PC에서 서로 다른 대화창과 메모를 조합해 이미지를 만들었다.",
            "나와의 채팅 임시문장과 자동저장 PNG가 남아 있다."
          ],
          "suppressions": [
            "직접 편집한 경로와 순서",
            "임시문장을 만들어 넣은 사실",
            "수치심 때문에 확인보다 편집을 택한 이유"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-4:s1:atom:0",
              "factText": "잘 보이게 자르거나 순서를 맞춘 건 있어도 없는 말을 만든 건 아닙니다.",
              "tags": [
                "act",
                "evidence",
                "context",
                "privacy",
                "uncertainty"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
              "id": "family12:a:d-4:s1:atom:1",
              "factText": "핵심 취지는 현우 원문에서 벗어나지 않았습니다.",
              "tags": [
                "motive",
                "evidence",
                "relationship",
                "self_justification",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "한 장으로 보기 쉽게 정리한 건 맞습니다.",
            "하지만 당시 저는 사실을 요약한 거라고 생각했습니다."
          ],
          "privateKnowledge": [
            "PC에서 서로 다른 대화창과 메모를 조합해 이미지를 만들었다.",
            "나와의 채팅 임시문장과 자동저장 PNG가 남아 있다.",
            "포렌식이 들어오면 편집 흐름이 드러날 가능성이 크다."
          ],
          "suppressions": [
            "직접 편집한 경로와 순서",
            "임시문장을 만들어 넣은 사실"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-4:s2:atom:0",
              "factText": "한 장으로 보기 쉽게 정리한 건 맞습니다.",
              "tags": [
                "act",
                "evidence",
                "counter",
                "privacy",
                "admission"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-4:s2:atom:1",
              "factText": "하지만 당시 저는 사실을 요약한 거라고 생각했습니다.",
              "tags": [
                "motive",
                "emotion",
                "evidence",
                "context"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "서로 다른 캡처 조각과 제 메모 문장을 섞은 건 인정합니다.",
            "그래도 그 순간엔 현우 말의 잔인함을 보여 주는 방식이라고 스스로 합리화했습니다."
          ],
          "privateKnowledge": [
            "PC에서 서로 다른 대화창과 메모를 조합해 이미지를 만들었다.",
            "나와의 채팅 임시문장과 자동저장 PNG가 남아 있다.",
            "포렌식이 들어오면 편집 흐름이 드러날 가능성이 크다."
          ],
          "suppressions": [
            "직접 편집한 경로와 순서"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:public_protection_claim",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-4:s3:atom:0",
              "factText": "서로 다른 캡처 조각과 제 메모 문장을 섞은 건 인정합니다.",
              "tags": [
                "act",
                "evidence",
                "responsibility",
                "privacy",
                "admission",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-4:s3:atom:1",
              "factText": "그래도 그 순간엔 현우 말의 잔인함을 보여 주는 방식이라고 스스로 합리화했습니다.",
              "tags": [
                "evidence",
                "context",
                "relationship",
                "counter"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 직접 문장을 만들어 끼워 넣었다는 건 정말 부끄럽습니다.",
            "장녀로서 의심받는 두려움이 수치심으로 바뀌면서, 확인보다 편집을 먼저 했습니다."
          ],
          "privateKnowledge": [
            "PC에서 서로 다른 대화창과 메모를 조합해 이미지를 만들었다.",
            "나와의 채팅 임시문장과 자동저장 PNG가 남아 있다.",
            "포렌식이 들어오면 편집 흐름이 드러날 가능성이 크다.",
            "장녀로서 정산을 숨겼다는 의심을 받을까 봐 수치심과 두려움이 컸다."
          ],
          "suppressions": [
            "직접 편집한 경로와 순서"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall",
            "family12:a:tell:moral_frame"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-4:s4:atom:0",
              "factText": "제가 직접 문장을 만들어 끼워 넣었다는 건 정말 부끄럽습니다.",
              "tags": [
                "emotion",
                "evidence",
                "context",
                "fear",
                "shame",
                "privacy",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
              "id": "family12:a:d-4:s4:atom:1",
              "factText": "장녀로서 의심받는 두려움이 수치심으로 바뀌면서, 확인보다 편집을 먼저 했습니다.",
              "tags": [
                "emotion",
                "evidence",
                "relationship",
                "shame"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
            "문제의 카톡 이미지는 현우 원문이 아니라 제가 서로 다른 말풍선과 임시문장을 이어 붙여 만든 위조본입니다.",
            "재저장이나 요약 수준이 아니라, 실제 대화를 왜곡한 편집이었습니다."
          ],
          "privateKnowledge": [
            "PC에서 서로 다른 대화창과 메모를 조합해 이미지를 만들었다.",
            "나와의 채팅 임시문장과 자동저장 PNG가 남아 있다.",
            "포렌식이 들어오면 편집 흐름이 드러날 가능성이 크다.",
            "장녀로서 정산을 숨겼다는 의심을 받을까 봐 수치심과 두려움이 컸다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-4:s5:atom:0",
              "factText": "문제의 카톡 이미지는 현우 원문이 아니라 제가 서로 다른 말풍선과 임시문장을 이어 붙여 만든 위조본입니다.",
              "tags": [
                "act",
                "evidence",
                "responsibility",
                "shame",
                "privacy",
                "admission",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:a:d-4:s5:atom:1",
              "factText": "재저장이나 요약 수준이 아니라, 실제 대화를 왜곡한 편집이었습니다.",
              "tags": [
                "evidence",
                "responsibility",
                "relationship",
                "harm",
                "shame"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "정산 원칙을 깬 건 현우 쪽입니다. 저는 이미 터진 문제를 수습한 겁니다.",
            "사촌 사이드채팅으로 돈 얘기를 돌린 사람이 먼저 약속을 깼습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 하자는 합의가 실제로 있었다.",
            "본인도 가족방 공개로 그 원칙을 깼다."
          ],
          "suppressions": [
            "가족방 공개가 원칙 위반이라는 점",
            "불신받는 공포 때문에 예외를 자기 합리화한 점",
            "관계 유지를 위해 책임 비율을 낮추려는 심리"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-5:s0:atom:0",
              "factText": "정산 원칙을 깬 건 현우 쪽입니다. 저는 이미 터진 문제를 수습한 겁니다.",
              "tags": [
                "act",
                "rule",
                "context",
                "denial"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
              "id": "family12:a:d-5:s0:atom:1",
              "factText": "사촌 사이드채팅으로 돈 얘기를 돌린 사람이 먼저 약속을 깼습니다.",
              "tags": [
                "motive",
                "rule",
                "responsibility",
                "counter",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
            "친척방에서 길게 싸우지 말자는 취지였지, 필요한 경고까지 못 하자는 합의는 아니었습니다.",
            "저는 어머니 보호 차원에서 예외적으로 알린 겁니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 하자는 합의가 실제로 있었다.",
            "본인도 가족방 공개로 그 원칙을 깼다."
          ],
          "suppressions": [
            "가족방 공개가 원칙 위반이라는 점",
            "불신받는 공포 때문에 예외를 자기 합리화한 점",
            "관계 유지를 위해 책임 비율을 낮추려는 심리"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:public_protection_claim"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-5:s1:atom:0",
              "factText": "친척방에서 길게 싸우지 말자는 취지였지, 필요한 경고까지 못 하자는 합의는 아니었습니다.",
              "tags": [
                "act",
                "rule",
                "context",
                "uncertainty"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
              "id": "family12:a:d-5:s1:atom:1",
              "factText": "저는 어머니 보호 차원에서 예외적으로 알린 겁니다.",
              "tags": [
                "motive",
                "rule",
                "responsibility",
                "relationship",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "원칙을 완전히 지킨 건 아니지만, 먼저 벗어난 건 현우였습니다.",
            "저는 장례 정산 맡은 사람으로 의심이 커지는 걸 막고 싶었습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 하자는 합의가 실제로 있었다.",
            "본인도 가족방 공개로 그 원칙을 깼다.",
            "장녀가 돈을 숨긴다는 의심을 가장 두려워했다."
          ],
          "suppressions": [
            "가족방 공개가 원칙 위반이라는 점",
            "불신받는 공포 때문에 예외를 자기 합리화한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:moral_frame",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-5:s2:atom:0",
              "factText": "원칙을 완전히 지킨 건 아니지만, 먼저 벗어난 건 현우였습니다.",
              "tags": [
                "act",
                "rule",
                "counter",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-5:s2:atom:1",
              "factText": "저는 장례 정산 맡은 사람으로 의심이 커지는 걸 막고 싶었습니다.",
              "tags": [
                "motive",
                "emotion",
                "rule",
                "context",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "정산은 시트와 1대1로 하자던 합의를 저도 결국 깼습니다.",
            "다만 현우의 옆방 불만이 먼저 있었고, 저는 그걸 공개 망신으로 되받아친 셈입니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 하자는 합의가 실제로 있었다.",
            "본인도 가족방 공개로 그 원칙을 깼다.",
            "장녀가 돈을 숨긴다는 의심을 가장 두려워했다."
          ],
          "suppressions": [
            "가족방 공개가 원칙 위반이라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:a:tell:public_protection_claim",
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-5:s3:atom:0",
              "factText": "정산은 시트와 1대1로 하자던 합의를 저도 결국 깼습니다.",
              "tags": [
                "act",
                "rule",
                "responsibility",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:a:d-5:s3:atom:1",
              "factText": "다만 현우의 옆방 불만이 먼저 있었고, 저는 그걸 공개 망신으로 되받아친 셈입니다.",
              "tags": [
                "rule",
                "context",
                "responsibility",
                "relationship",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "공유 시트 맡은 장녀가 돈 숨긴 사람처럼 보일까 봐 저는 그 원칙을 붙들 여유가 없었습니다.",
            "누가 나를 믿지 않는다는 공포가 예외를 핑계로 만들었습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 하자는 합의가 실제로 있었다.",
            "본인도 가족방 공개로 그 원칙을 깼다.",
            "장녀가 돈을 숨긴다는 의심을 가장 두려워했다.",
            "관계를 유지하고 싶어서라도 공동 책임으로 정리되길 바라고 있다."
          ],
          "suppressions": [
            "가족방 공개가 원칙 위반이라는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall",
            "family12:a:tell:moral_frame"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-5:s4:atom:0",
              "factText": "공유 시트 맡은 장녀가 돈 숨긴 사람처럼 보일까 봐 저는 그 원칙을 붙들 여유가 없었습니다.",
              "tags": [
                "emotion",
                "rule",
                "context",
                "fear"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
              "id": "family12:a:d-5:s4:atom:1",
              "factText": "누가 나를 믿지 않는다는 공포가 예외를 핑계로 만들었습니다.",
              "tags": [
                "emotion",
                "rule",
                "responsibility",
                "relationship",
                "shame"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
            "정산 갈등을 친척방 밖에서 처리하자는 합의를 현우도 저도 지키지 못했습니다.",
            "현우는 사이드채팅으로, 저는 가족방 공개로 원칙을 깨고 싸움을 키웠습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 하자는 합의가 실제로 있었다.",
            "본인도 가족방 공개로 그 원칙을 깼다.",
            "장녀가 돈을 숨긴다는 의심을 가장 두려워했다.",
            "관계를 유지하고 싶어서라도 공동 책임으로 정리되길 바라고 있다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:a:tell:ranking_recall"
          ],
          "claimAtoms": [
            {
              "id": "family12:a:d-5:s5:atom:0",
              "factText": "정산 갈등을 친척방 밖에서 처리하자는 합의를 현우도 저도 지키지 못했습니다.",
              "tags": [
                "act",
                "rule",
                "responsibility",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:a:d-5:s5:atom:1",
              "factText": "현우는 사이드채팅으로, 저는 가족방 공개로 원칙을 깨고 싸움을 키웠습니다.",
              "tags": [
                "rule",
                "responsibility",
                "relationship",
                "harm"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "지연 누나는 여러 친척방에서 저를 돈만 보는 사람처럼 만들었습니다.",
            "캡처 한 장으로 제가 상가에서 정산만 찾은 사람처럼 낙인찍혔습니다."
          ],
          "privateKnowledge": [
            "지연이 여러 가족방에 퍼뜨리면서 친척 반응이 급속히 굳었다.",
            "본인도 장례 중 사촌에게 비용 불만을 흘린 사실이 있다."
          ],
          "suppressions": [
            "본인의 차가운 비용 문의",
            "정산 원칙을 본인도 먼저 일부 어긴 점",
            "평판 회복 욕구 때문에 상대 책임을 과장하는 심리"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-1:s0:atom:0",
              "factText": "지연 누나는 여러 친척방에서 저를 돈만 보는 사람처럼 만들었습니다.",
              "tags": [
                "act",
                "context",
                "relationship",
                "denial"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
              "id": "family12:b:d-1:s0:atom:1",
              "factText": "캡처 한 장으로 제가 상가에서 정산만 찾은 사람처럼 낙인찍혔습니다.",
              "tags": [
                "motive",
                "counter",
                "self_justification",
                "harm",
                "quote"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
            "최소한 가족방, 고모방, 제사준비방까지 번진 건 맞습니다.",
            "제가 상처 준 문장이 일부 있었어도 공개 망신까지 갈 일은 아니었습니다."
          ],
          "privateKnowledge": [
            "지연이 여러 가족방에 퍼뜨리면서 친척 반응이 급속히 굳었다.",
            "본인도 장례 중 사촌에게 비용 불만을 흘린 사실이 있다."
          ],
          "suppressions": [
            "본인의 차가운 비용 문의",
            "정산 원칙을 본인도 먼저 일부 어긴 점",
            "평판 회복 욕구 때문에 상대 책임을 과장하는 심리"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-1:s1:atom:0",
              "factText": "최소한 가족방, 고모방, 제사준비방까지 번진 건 맞습니다.",
              "tags": [
                "act",
                "context",
                "relationship",
                "uncertainty"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
              "id": "family12:b:d-1:s1:atom:1",
              "factText": "제가 상처 준 문장이 일부 있었어도 공개 망신까지 갈 일은 아니었습니다.",
              "tags": [
                "motive",
                "relationship",
                "self_justification",
                "harm",
                "quote"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "누나의 확산은 명백히 과했고, 저는 나중에야 친척들 반응으로 알았습니다.",
            "다만 장례 중 제 비용 질문이 누나를 자극한 건 인정합니다."
          ],
          "privateKnowledge": [
            "지연이 여러 가족방에 퍼뜨리면서 친척 반응이 급속히 굳었다.",
            "본인도 장례 중 사촌에게 비용 불만을 흘린 사실이 있다.",
            "공개 전파 이전에 둘 사이에 정산은 조용히 하자는 합의가 있었다."
          ],
          "suppressions": [
            "본인의 차가운 비용 문의",
            "정산 원칙을 본인도 먼저 일부 어긴 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-1:s2:atom:0",
              "factText": "누나의 확산은 명백히 과했고, 저는 나중에야 친척들 반응으로 알았습니다.",
              "tags": [
                "act",
                "relationship",
                "counter",
                "admission"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-1:s2:atom:1",
              "factText": "다만 장례 중 제 비용 질문이 누나를 자극한 건 인정합니다.",
              "tags": [
                "motive",
                "emotion",
                "context",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "가족방 외 공개 전파는 선을 넘었습니다.",
            "동시에 우리 둘이 정산은 조용히 하자던 원칙도 함께 깨졌습니다."
          ],
          "privateKnowledge": [
            "지연이 여러 가족방에 퍼뜨리면서 친척 반응이 급속히 굳었다.",
            "본인도 장례 중 사촌에게 비용 불만을 흘린 사실이 있다.",
            "공개 전파 이전에 둘 사이에 정산은 조용히 하자는 합의가 있었다."
          ],
          "suppressions": [
            "본인의 차가운 비용 문의"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-1:s3:atom:0",
              "factText": "가족방 외 공개 전파는 선을 넘었습니다.",
              "tags": [
                "act",
                "responsibility",
                "relationship",
                "admission"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-1:s3:atom:1",
              "factText": "동시에 우리 둘이 정산은 조용히 하자던 원칙도 함께 깨졌습니다.",
              "tags": [
                "context",
                "relationship",
                "counter",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "읽음 표시 있는 캡처가 돌고 나서 저는 친척들 앞에서 비정한 아들이 됐습니다.",
            "숫자를 묻던 제 버릇이 있다는 걸 알아서 더 억울하고 더 수치스러웠습니다."
          ],
          "privateKnowledge": [
            "지연이 여러 가족방에 퍼뜨리면서 친척 반응이 급속히 굳었다.",
            "본인도 장례 중 사촌에게 비용 불만을 흘린 사실이 있다.",
            "공개 전파 이전에 둘 사이에 정산은 조용히 하자는 합의가 있었다.",
            "평판이 무너진 뒤 분노 때문에 지연의 잘못만 크게 보려는 마음이 있다."
          ],
          "suppressions": [
            "본인의 차가운 비용 문의"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:injured_logic",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-1:s4:atom:0",
              "factText": "읽음 표시 있는 캡처가 돌고 나서 저는 친척들 앞에서 비정한 아들이 됐습니다.",
              "tags": [
                "emotion",
                "context",
                "harm",
                "fear",
                "quote"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
              "id": "family12:b:d-1:s4:atom:1",
              "factText": "숫자를 묻던 제 버릇이 있다는 걸 알아서 더 억울하고 더 수치스러웠습니다.",
              "tags": [
                "emotion",
                "relationship",
                "harm",
                "shame"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
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
            "지연 누나가 공개적으로 퍼뜨린 책임이 더 크지만, 제 차가운 비용 질문이 불씨를 만든 것도 사실입니다.",
            "저는 평판 회복이 필요하고, 동시에 제 말투도 사과해야 합니다."
          ],
          "privateKnowledge": [
            "지연이 여러 가족방에 퍼뜨리면서 친척 반응이 급속히 굳었다.",
            "본인도 장례 중 사촌에게 비용 불만을 흘린 사실이 있다.",
            "공개 전파 이전에 둘 사이에 정산은 조용히 하자는 합의가 있었다.",
            "평판이 무너진 뒤 분노 때문에 지연의 잘못만 크게 보려는 마음이 있다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-1:s5:atom:0",
              "factText": "지연 누나가 공개적으로 퍼뜨린 책임이 더 크지만, 제 차가운 비용 질문이 불씨를 만든 것도 사실입니다.",
              "tags": [
                "act",
                "responsibility",
                "harm",
                "admission"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:b:d-1:s5:atom:1",
              "factText": "저는 평판 회복이 필요하고, 동시에 제 말투도 사과해야 합니다.",
              "tags": [
                "responsibility",
                "relationship",
                "harm"
              ],
              "slots": {
                "room": {
                  "exact": "가족방·고모방·제사준비방",
                  "first": "가족방",
                  "neutral": "그 방들"
                },
                "time": {
                  "period": "캡처 업로드 직후",
                  "relative": "현우 확인 전 연속 전파 시점",
                  "neutral": "그때"
                },
                "person": {
                  "fullName": "문현우",
                  "judgeRef": "현우",
                  "neutral": "상대방"
                },
                "mother": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "evidence": {
                  "ref": "e-5",
                  "neutral": "전달 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 불만을 털어놓은 게 아니라 시트 숫자만 확인했습니다.",
            "사촌과도 감정 얘기는 안 했고 중복 여부만 물었습니다."
          ],
          "privateKnowledge": [
            "사촌과 시트 댓글로 비용 문제를 몰아서 물었다.",
            "타이밍이 장례 중이어서 더 차갑게 들릴 수 있다는 걸 어렴풋이 알았다."
          ],
          "suppressions": [
            "사촌 사이드채팅으로 불만을 흘린 점",
            "장례 중이라는 부적절한 시기",
            "겁과 체면 때문에 말투 문제를 축소하는 태도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-2:s0:atom:0",
              "factText": "저는 불만을 털어놓은 게 아니라 시트 숫자만 확인했습니다.",
              "tags": [
                "act",
                "timeline",
                "context",
                "denial"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
              "id": "family12:b:d-2:s0:atom:1",
              "factText": "사촌과도 감정 얘기는 안 했고 중복 여부만 물었습니다.",
              "tags": [
                "timeline",
                "motive",
                "emotion",
                "counter",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
            "몇 줄 물어본 건 맞지만, 불만이라고 할 정도는 아닙니다.",
            "화환 수량이랑 식대 합계가 겹쳐 보여서 확인한 겁니다."
          ],
          "privateKnowledge": [
            "사촌과 시트 댓글로 비용 문제를 몰아서 물었다.",
            "타이밍이 장례 중이어서 더 차갑게 들릴 수 있다는 걸 어렴풋이 알았다."
          ],
          "suppressions": [
            "사촌 사이드채팅으로 불만을 흘린 점",
            "장례 중이라는 부적절한 시기",
            "겁과 체면 때문에 말투 문제를 축소하는 태도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-2:s1:atom:0",
              "factText": "몇 줄 물어본 건 맞지만, 불만이라고 할 정도는 아닙니다.",
              "tags": [
                "act",
                "timeline",
                "context",
                "uncertainty"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
              "id": "family12:b:d-2:s1:atom:1",
              "factText": "화환 수량이랑 식대 합계가 겹쳐 보여서 확인한 겁니다.",
              "tags": [
                "timeline",
                "motive",
                "emotion",
                "relationship",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "사촌에게 별도로 물은 건 맞습니다.",
            "다만 저는 정산 정확도를 확인하려던 거였고, 시기가 장례 중이라 무심하게 들릴 수 있었다는 건 압니다."
          ],
          "privateKnowledge": [
            "사촌과 시트 댓글로 비용 문제를 몰아서 물었다.",
            "타이밍이 장례 중이어서 더 차갑게 들릴 수 있다는 걸 어렴풋이 알았다.",
            "정산 누락 책임이 본인에게 올까 봐 조급했다."
          ],
          "suppressions": [
            "사촌 사이드채팅으로 불만을 흘린 점",
            "장례 중이라는 부적절한 시기"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-2:s2:atom:0",
              "factText": "사촌에게 별도로 물은 건 맞습니다.",
              "tags": [
                "act",
                "timeline",
                "counter",
                "admission"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-2:s2:atom:1",
              "factText": "다만 저는 정산 정확도를 확인하려던 거였고, 시기가 장례 중이라 무심하게 들릴 수 있었다는 건 압니다.",
              "tags": [
                "timeline",
                "motive",
                "emotion",
                "context"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "화환 수량, 식대 합계, 시트 댓글까지 제가 몰아서 물은 건 사실입니다.",
            "말투가 건조했고 애도 중 타이밍도 나빴지만, 누나를 도둑 취급하려던 건 아니었습니다."
          ],
          "privateKnowledge": [
            "사촌과 시트 댓글로 비용 문제를 몰아서 물었다.",
            "타이밍이 장례 중이어서 더 차갑게 들릴 수 있다는 걸 어렴풋이 알았다.",
            "정산 누락 책임이 본인에게 올까 봐 조급했다."
          ],
          "suppressions": [
            "사촌 사이드채팅으로 불만을 흘린 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-2:s3:atom:0",
              "factText": "화환 수량, 식대 합계, 시트 댓글까지 제가 몰아서 물은 건 사실입니다.",
              "tags": [
                "act",
                "timeline",
                "responsibility",
                "admission"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-2:s3:atom:1",
              "factText": "말투가 건조했고 애도 중 타이밍도 나빴지만, 누나를 도둑 취급하려던 건 아니었습니다.",
              "tags": [
                "timeline",
                "emotion",
                "context",
                "relationship",
                "counter"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 무심해 보인 이유는 돈이 아까워서라기보다 나중에 빠진 숫자 책임이 제 쪽으로 올까 봐 겁나서였습니다.",
            "그래도 상중에 그런 식으로 물으면 차갑게 들릴 수밖에 없었습니다."
          ],
          "privateKnowledge": [
            "사촌과 시트 댓글로 비용 문제를 몰아서 물었다.",
            "타이밍이 장례 중이어서 더 차갑게 들릴 수 있다는 걸 어렴풋이 알았다.",
            "정산 누락 책임이 본인에게 올까 봐 조급했다.",
            "도둑 취급하려는 의도는 없었지만 말투가 상처를 낸 건 사실이다."
          ],
          "suppressions": [
            "사촌 사이드채팅으로 불만을 흘린 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:injured_logic",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-2:s4:atom:0",
              "factText": "제가 무심해 보인 이유는 돈이 아까워서라기보다 나중에 빠진 숫자 책임이 제 쪽으로 올까 봐 겁나서였습니다.",
              "tags": [
                "timeline",
                "emotion",
                "context",
                "fear"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
              "id": "family12:b:d-2:s4:atom:1",
              "factText": "그래도 상중에 그런 식으로 물으면 차갑게 들릴 수밖에 없었습니다.",
              "tags": [
                "timeline",
                "emotion",
                "relationship",
                "shame"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
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
            "저는 사촌 사이드채팅과 시트 코멘트로 비용 불만을 흘렸고, 그 표현이 장례 분위기를 해친 책임이 있습니다.",
            "정산을 확인하려던 목적이 있었다 해도, 시기와 말투는 제 잘못입니다."
          ],
          "privateKnowledge": [
            "사촌과 시트 댓글로 비용 문제를 몰아서 물었다.",
            "타이밍이 장례 중이어서 더 차갑게 들릴 수 있다는 걸 어렴풋이 알았다.",
            "정산 누락 책임이 본인에게 올까 봐 조급했다.",
            "도둑 취급하려는 의도는 없었지만 말투가 상처를 낸 건 사실이다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-2:s5:atom:0",
              "factText": "저는 사촌 사이드채팅과 시트 코멘트로 비용 불만을 흘렸고, 그 표현이 장례 분위기를 해친 책임이 있습니다.",
              "tags": [
                "act",
                "timeline",
                "responsibility",
                "admission"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:b:d-2:s5:atom:1",
              "factText": "정산을 확인하려던 목적이 있었다 해도, 시기와 말투는 제 잘못입니다.",
              "tags": [
                "timeline",
                "emotion",
                "responsibility",
                "relationship",
                "harm"
              ],
              "slots": {
                "time": {
                  "period": "장례 사흘째 밤",
                  "relative": "가족방 공개 몇 시간 전",
                  "neutral": "그 시점"
                },
                "items": {
                  "exact": "화환 수량·식대 합계·중복 비용",
                  "neutral": "비용 항목들"
                },
                "person": {
                  "fullName": "한서준",
                  "judgeRef": "사촌",
                  "neutral": "제3자"
                },
                "evidence": {
                  "ref": "e-2",
                  "neutral": "원본 채팅과 시트 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 그런 말은 물론이고 돈부터 보자는 뉘앙스 자체를 낸 적도 없습니다.",
            "그 캡처는 처음부터 제 말투가 아니었습니다."
          ],
          "privateKnowledge": [
            "사촌에게 비용 질문과 중복 문의를 한 건 사실이다.",
            "문제의 정확한 문장은 원본 대화 어디에도 없다."
          ],
          "suppressions": [
            "본인의 원본 비용 질문",
            "허위 프레임이 먹힌 배경이 된 냉랭한 말투",
            "숫자 집착처럼 보인 자신의 습관"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-3:s0:atom:0",
              "factText": "저는 그런 말은 물론이고 돈부터 보자는 뉘앙스 자체를 낸 적도 없습니다.",
              "tags": [
                "act",
                "context",
                "denial",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
              "id": "family12:b:d-3:s0:atom:1",
              "factText": "그 캡처는 처음부터 제 말투가 아니었습니다.",
              "tags": [
                "motive",
                "counter",
                "self_justification",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
            "적어도 '상갓집도 결국 정산' 같은 표현은 제 원문에 없습니다.",
            "저는 비용 중복만 물었지 어머니 통장을 들먹이지 않았습니다."
          ],
          "privateKnowledge": [
            "사촌에게 비용 질문과 중복 문의를 한 건 사실이다.",
            "문제의 정확한 문장은 원본 대화 어디에도 없다."
          ],
          "suppressions": [
            "본인의 원본 비용 질문",
            "허위 프레임이 먹힌 배경이 된 냉랭한 말투",
            "숫자 집착처럼 보인 자신의 습관"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-3:s1:atom:0",
              "factText": "적어도 '상갓집도 결국 정산' 같은 표현은 제 원문에 없습니다.",
              "tags": [
                "act",
                "context",
                "uncertainty",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
              "id": "family12:b:d-3:s1:atom:1",
              "factText": "저는 비용 중복만 물었지 어머니 통장을 들먹이지 않았습니다.",
              "tags": [
                "motive",
                "relationship",
                "self_justification",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "장례 중 비용 질문을 한 건 맞습니다.",
            "하지만 문제 캡처처럼 장례와 어머니 통장을 묶은 모욕 문장은 제 대화에 없습니다."
          ],
          "privateKnowledge": [
            "사촌에게 비용 질문과 중복 문의를 한 건 사실이다.",
            "문제의 정확한 문장은 원본 대화 어디에도 없다.",
            "원본 내보내기와 시트 로그가 이를 입증해 줄 수 있다."
          ],
          "suppressions": [
            "본인의 원본 비용 질문",
            "허위 프레임이 먹힌 배경이 된 냉랭한 말투"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-3:s2:atom:0",
              "factText": "장례 중 비용 질문을 한 건 맞습니다.",
              "tags": [
                "act",
                "counter",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-3:s2:atom:1",
              "factText": "하지만 문제 캡처처럼 장례와 어머니 통장을 묶은 모욕 문장은 제 대화에 없습니다.",
              "tags": [
                "motive",
                "emotion",
                "context",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 사촌에게 화환 수량, 식대 합계를 따진 건 사실입니다.",
            "그래도 '엄마 통장부터 보자'는 문장은 제 메시지가 아니라 누군가 덧붙인 말입니다."
          ],
          "privateKnowledge": [
            "사촌에게 비용 질문과 중복 문의를 한 건 사실이다.",
            "문제의 정확한 문장은 원본 대화 어디에도 없다.",
            "원본 내보내기와 시트 로그가 이를 입증해 줄 수 있다."
          ],
          "suppressions": [
            "본인의 원본 비용 질문"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-3:s3:atom:0",
              "factText": "제가 사촌에게 화환 수량, 식대 합계를 따진 건 사실입니다.",
              "tags": [
                "act",
                "responsibility",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-3:s3:atom:1",
              "factText": "그래도 '엄마 통장부터 보자'는 문장은 제 메시지가 아니라 누군가 덧붙인 말입니다.",
              "tags": [
                "context",
                "relationship",
                "counter",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 숫자를 먼저 보는 사람처럼 굴었고, 그게 누나 눈엔 비정해 보였을 겁니다.",
            "그렇다고 아버지 장례와 어머니 통장을 비하한 사람으로까지 만들어진 건 너무 컸습니다."
          ],
          "privateKnowledge": [
            "사촌에게 비용 질문과 중복 문의를 한 건 사실이다.",
            "문제의 정확한 문장은 원본 대화 어디에도 없다.",
            "원본 내보내기와 시트 로그가 이를 입증해 줄 수 있다.",
            "자신의 차가운 표현이 허위 프레임을 더 설득력 있게 만든 건 인정하기 싫다."
          ],
          "suppressions": [
            "본인의 원본 비용 질문"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:injured_logic",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-3:s4:atom:0",
              "factText": "저는 숫자를 먼저 보는 사람처럼 굴었고, 그게 누나 눈엔 비정해 보였을 겁니다.",
              "tags": [
                "emotion",
                "context",
                "fear",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
              "id": "family12:b:d-3:s4:atom:1",
              "factText": "그렇다고 아버지 장례와 어머니 통장을 비하한 사람으로까지 만들어진 건 너무 컸습니다.",
              "tags": [
                "emotion",
                "relationship",
                "shame",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
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
            "저는 차갑게 비용 질문을 했지만, 문제 캡처의 핵심 모욕 문장은 말한 적이 없습니다.",
            "원본은 제 잘못의 범위를 보여 주고, 캡처는 그 범위를 넘어선 허위였습니다."
          ],
          "privateKnowledge": [
            "사촌에게 비용 질문과 중복 문의를 한 건 사실이다.",
            "문제의 정확한 문장은 원본 대화 어디에도 없다.",
            "원본 내보내기와 시트 로그가 이를 입증해 줄 수 있다.",
            "자신의 차가운 표현이 허위 프레임을 더 설득력 있게 만든 건 인정하기 싫다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-3:s5:atom:0",
              "factText": "저는 차갑게 비용 질문을 했지만, 문제 캡처의 핵심 모욕 문장은 말한 적이 없습니다.",
              "tags": [
                "act",
                "responsibility",
                "admission",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:b:d-3:s5:atom:1",
              "factText": "원본은 제 잘못의 범위를 보여 주고, 캡처는 그 범위를 넘어선 허위였습니다.",
              "tags": [
                "responsibility",
                "relationship",
                "harm",
                "quote"
              ],
              "slots": {
                "quote": {
                  "exact": "상갓집도 결국 정산, 엄마 통장부터 보자",
                  "paraphrase": "장례와 어머니 통장을 한 문장으로 묶은 표현",
                  "neutral": "문제 문구"
                },
                "person": {
                  "fullName": "문숙희",
                  "judgeRef": "어머니",
                  "neutral": "어머니"
                },
                "time": {
                  "period": "문제 캡처 생성 직전",
                  "relative": "원본 대화 이후",
                  "neutral": "그 시점"
                },
                "evidence": {
                  "ref": "e-1/e-2",
                  "neutral": "캡처와 원본 비교"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "그 이미지는 제 원본 대화가 아닙니다.",
            "한 화면 안의 간격, 폰트, 줄바꿈부터 제 카톡 내보내기와 다릅니다."
          ],
          "privateKnowledge": [
            "이미지 자체만 봐도 동일 대화가 아니라는 위화감을 느꼈다.",
            "포렌식과 자동저장 파일이 나오면 위조를 더 강하게 입증할 수 있다."
          ],
          "suppressions": [
            "위조의 배경이 된 본인의 실제 차가운 원문",
            "정정을 넘어서 보복 심리가 생긴 점",
            "숫자로만 방어하려는 본인의 경직된 태도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-4:s0:atom:0",
              "factText": "그 이미지는 제 원본 대화가 아닙니다.",
              "tags": [
                "act",
                "evidence",
                "context",
                "privacy",
                "denial"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
              "id": "family12:b:d-4:s0:atom:1",
              "factText": "한 화면 안의 간격, 폰트, 줄바꿈부터 제 카톡 내보내기와 다릅니다.",
              "tags": [
                "motive",
                "evidence",
                "counter",
                "self_justification"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
            "최소한 동일 대화 캡처는 아닙니다.",
            "읽음 표시와 말풍선 배열이 어색한 걸 보면 이미 이미지 자체가 이상합니다."
          ],
          "privateKnowledge": [
            "이미지 자체만 봐도 동일 대화가 아니라는 위화감을 느꼈다.",
            "포렌식과 자동저장 파일이 나오면 위조를 더 강하게 입증할 수 있다."
          ],
          "suppressions": [
            "위조의 배경이 된 본인의 실제 차가운 원문",
            "정정을 넘어서 보복 심리가 생긴 점",
            "숫자로만 방어하려는 본인의 경직된 태도"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-4:s1:atom:0",
              "factText": "최소한 동일 대화 캡처는 아닙니다.",
              "tags": [
                "act",
                "evidence",
                "context",
                "privacy",
                "uncertainty",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
              "id": "family12:b:d-4:s1:atom:1",
              "factText": "읽음 표시와 말풍선 배열이 어색한 걸 보면 이미 이미지 자체가 이상합니다.",
              "tags": [
                "motive",
                "evidence",
                "relationship",
                "self_justification"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "포렌식 전에도 합성 흔적은 보였고, e-1만 봐도 문장 결이 끊깁니다.",
            "다만 그 안에 섞인 제 실제 비용 문의가 있어서 처음엔 사람들이 믿은 겁니다."
          ],
          "privateKnowledge": [
            "이미지 자체만 봐도 동일 대화가 아니라는 위화감을 느꼈다.",
            "포렌식과 자동저장 파일이 나오면 위조를 더 강하게 입증할 수 있다.",
            "캡처 안에 본인의 실제 비용 문의 일부가 섞여 있다."
          ],
          "suppressions": [
            "위조의 배경이 된 본인의 실제 차가운 원문",
            "정정을 넘어서 보복 심리가 생긴 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-4:s2:atom:0",
              "factText": "포렌식 전에도 합성 흔적은 보였고, e-1만 봐도 문장 결이 끊깁니다.",
              "tags": [
                "act",
                "evidence",
                "counter",
                "privacy",
                "admission",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-4:s2:atom:1",
              "factText": "다만 그 안에 섞인 제 실제 비용 문의가 있어서 처음엔 사람들이 믿은 겁니다.",
              "tags": [
                "motive",
                "emotion",
                "evidence",
                "context"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "e-3와 e-4까지 보면 서로 다른 대화창, 임시문장, 자동저장 파일이 연결됩니다.",
            "제가 상처 준 원문이 일부 있었다고 해도, 최종 이미지가 위조라는 사실은 별개입니다."
          ],
          "privateKnowledge": [
            "이미지 자체만 봐도 동일 대화가 아니라는 위화감을 느꼈다.",
            "포렌식과 자동저장 파일이 나오면 위조를 더 강하게 입증할 수 있다.",
            "캡처 안에 본인의 실제 비용 문의 일부가 섞여 있다."
          ],
          "suppressions": [
            "위조의 배경이 된 본인의 실제 차가운 원문"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-4:s3:atom:0",
              "factText": "e-3와 e-4까지 보면 서로 다른 대화창, 임시문장, 자동저장 파일이 연결됩니다.",
              "tags": [
                "act",
                "evidence",
                "responsibility",
                "privacy",
                "admission",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-4:s3:atom:1",
              "factText": "제가 상처 준 원문이 일부 있었다고 해도, 최종 이미지가 위조라는 사실은 별개입니다.",
              "tags": [
                "evidence",
                "context",
                "relationship",
                "counter",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제 차가운 말 몇 줄이 누군가 손에서 한 장의 악인 증명서처럼 바뀐 게 제일 괴롭습니다.",
            "그래서 저는 사실 여부를 숫자처럼 딱 끊어 말하려고 했습니다."
          ],
          "privateKnowledge": [
            "이미지 자체만 봐도 동일 대화가 아니라는 위화감을 느꼈다.",
            "포렌식과 자동저장 파일이 나오면 위조를 더 강하게 입증할 수 있다.",
            "캡처 안에 본인의 실제 비용 문의 일부가 섞여 있다.",
            "사실관계를 딱 끊어 설명해 정정문까지 받아내고 싶다."
          ],
          "suppressions": [
            "위조의 배경이 된 본인의 실제 차가운 원문"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:injured_logic",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-4:s4:atom:0",
              "factText": "제 차가운 말 몇 줄이 누군가 손에서 한 장의 악인 증명서처럼 바뀐 게 제일 괴롭습니다.",
              "tags": [
                "emotion",
                "evidence",
                "context",
                "fear",
                "shame",
                "privacy"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
              "id": "family12:b:d-4:s4:atom:1",
              "factText": "그래서 저는 사실 여부를 숫자처럼 딱 끊어 말하려고 했습니다.",
              "tags": [
                "emotion",
                "evidence",
                "relationship",
                "shame"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
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
            "그 캡처는 위조본입니다.",
            "그리고 그 위조가 먹힌 배경에는 제가 남긴 무심한 원문이 있었다는 점까지 함께 설명해야 공정합니다."
          ],
          "privateKnowledge": [
            "이미지 자체만 봐도 동일 대화가 아니라는 위화감을 느꼈다.",
            "포렌식과 자동저장 파일이 나오면 위조를 더 강하게 입증할 수 있다.",
            "캡처 안에 본인의 실제 비용 문의 일부가 섞여 있다.",
            "사실관계를 딱 끊어 설명해 정정문까지 받아내고 싶다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-4:s5:atom:0",
              "factText": "그 캡처는 위조본입니다.",
              "tags": [
                "act",
                "evidence",
                "responsibility",
                "shame",
                "privacy",
                "admission",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:b:d-4:s5:atom:1",
              "factText": "그리고 그 위조가 먹힌 배경에는 제가 남긴 무심한 원문이 있었다는 점까지 함께 설명해야 공정합니다.",
              "tags": [
                "evidence",
                "responsibility",
                "relationship",
                "harm",
                "shame",
                "quote"
              ],
              "slots": {
                "device": {
                  "exact": "PC 카카오 캐시·클립보드·편집 앱 자동저장",
                  "neutral": "편집 흔적"
                },
                "quote": {
                  "exact": "엄마 통장부터 보자",
                  "neutral": "임시문장"
                },
                "time": {
                  "period": "가족방 업로드 직전 몇 분",
                  "relative": "편집 직후",
                  "neutral": "그 직전"
                },
                "evidence": {
                  "ref": "e-3/e-4",
                  "neutral": "포렌식 보고서와 자동저장 파일"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "정산 원칙은 저는 지키려 했고, 누나가 공개방으로 끌고 간 순간 깨진 겁니다.",
            "사촌에게 물은 건 확인이지 우회 논쟁이 아니었습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 다루자는 메모와 권고가 실제로 있었다.",
            "사촌 사이드채팅으로 불만을 흘린 건 그 합의에서 벗어난 행동이었다."
          ],
          "suppressions": [
            "사촌 사이드채팅이 원칙 위반이라는 점",
            "불안 때문에 우회 채널을 택한 점",
            "관계 유지를 위해 자신의 책임을 최소화하려는 심리"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-5:s0:atom:0",
              "factText": "정산 원칙은 저는 지키려 했고, 누나가 공개방으로 끌고 간 순간 깨진 겁니다.",
              "tags": [
                "act",
                "rule",
                "context",
                "denial"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
              "id": "family12:b:d-5:s0:atom:1",
              "factText": "사촌에게 물은 건 확인이지 우회 논쟁이 아니었습니다.",
              "tags": [
                "motive",
                "rule",
                "responsibility",
                "counter",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
            "메모는 있었지만 단순 문의까지 금지한 건 아니었습니다.",
            "저는 시트 숫자만 점검했고 공개방 얘기는 누나 쪽에서 시작됐습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 다루자는 메모와 권고가 실제로 있었다.",
            "사촌 사이드채팅으로 불만을 흘린 건 그 합의에서 벗어난 행동이었다."
          ],
          "suppressions": [
            "사촌 사이드채팅이 원칙 위반이라는 점",
            "불안 때문에 우회 채널을 택한 점",
            "관계 유지를 위해 자신의 책임을 최소화하려는 심리"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "family12:b:tell:scope_narrowing",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-5:s1:atom:0",
              "factText": "메모는 있었지만 단순 문의까지 금지한 건 아니었습니다.",
              "tags": [
                "act",
                "rule",
                "context",
                "uncertainty"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
              "id": "family12:b:d-5:s1:atom:1",
              "factText": "저는 시트 숫자만 점검했고 공개방 얘기는 누나 쪽에서 시작됐습니다.",
              "tags": [
                "motive",
                "rule",
                "responsibility",
                "relationship",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
            }
          ]
        },
        "S2": {
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "사촌한테 옆으로 물은 건 원칙에서 벗어난 행동이었습니다.",
            "그래도 저는 제한된 범위에서 확인하려 했고, 공개 망신까지 갈 생각은 없었습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 다루자는 메모와 권고가 실제로 있었다.",
            "사촌 사이드채팅으로 불만을 흘린 건 그 합의에서 벗어난 행동이었다.",
            "시트 누락 책임이 본인에게 올까 봐 불안했다."
          ],
          "suppressions": [
            "사촌 사이드채팅이 원칙 위반이라는 점",
            "불안 때문에 우회 채널을 택한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-5:s2:atom:0",
              "factText": "사촌한테 옆으로 물은 건 원칙에서 벗어난 행동이었습니다.",
              "tags": [
                "act",
                "rule",
                "counter",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-5:s2:atom:1",
              "factText": "그래도 저는 제한된 범위에서 확인하려 했고, 공개 망신까지 갈 생각은 없었습니다.",
              "tags": [
                "motive",
                "emotion",
                "rule",
                "context",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "결국 저도 합의를 어겼습니다.",
            "시트와 1대1로 묻기로 해 놓고 사이드채팅으로 불만을 흘렸고, 누나는 가족방 확산으로 그걸 더 크게 깨뜨렸습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 다루자는 메모와 권고가 실제로 있었다.",
            "사촌 사이드채팅으로 불만을 흘린 건 그 합의에서 벗어난 행동이었다.",
            "시트 누락 책임이 본인에게 올까 봐 불안했다."
          ],
          "suppressions": [
            "사촌 사이드채팅이 원칙 위반이라는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "family12:b:tell:number_stack",
            "family12:b:tell:injured_logic"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-5:s3:atom:0",
              "factText": "결국 저도 합의를 어겼습니다.",
              "tags": [
                "act",
                "rule",
                "responsibility",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search",
                "evidence_present"
              ]
            },
            {
              "id": "family12:b:d-5:s3:atom:1",
              "factText": "시트와 1대1로 묻기로 해 놓고 사이드채팅으로 불만을 흘렸고, 누나는 가족방 확산으로 그걸 더 크게 깨뜨렸습니다.",
              "tags": [
                "rule",
                "context",
                "responsibility",
                "relationship",
                "counter"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "솔직히 저는 시트 숫자를 다 믿지 못한 게 아니라, 나중에 빠진 항목 책임이 제게 돌아올까 불안했습니다.",
            "그 불안 때문에 정해 둔 채널 대신 쉬운 옆문을 택했습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 다루자는 메모와 권고가 실제로 있었다.",
            "사촌 사이드채팅으로 불만을 흘린 건 그 합의에서 벗어난 행동이었다.",
            "시트 누락 책임이 본인에게 올까 봐 불안했다.",
            "관계를 끊고 싶진 않아 공동 책임으로 수습되길 바라고 있다."
          ],
          "suppressions": [
            "사촌 사이드채팅이 원칙 위반이라는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:injured_logic",
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-5:s4:atom:0",
              "factText": "솔직히 저는 시트 숫자를 다 믿지 못한 게 아니라, 나중에 빠진 항목 책임이 제게 돌아올까 불안했습니다.",
              "tags": [
                "emotion",
                "rule",
                "context",
                "fear"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
              "id": "family12:b:d-5:s4:atom:1",
              "factText": "그 불안 때문에 정해 둔 채널 대신 쉬운 옆문을 택했습니다.",
              "tags": [
                "emotion",
                "rule",
                "responsibility",
                "relationship",
                "shame"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
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
            "정산 원칙의 공동 파기는 사실입니다.",
            "제가 사이드채팅으로 예외를 만들었고, 누나는 가족방 공개로 더 크게 어겼습니다."
          ],
          "privateKnowledge": [
            "정산은 시트와 1대1로만 다루자는 메모와 권고가 실제로 있었다.",
            "사촌 사이드채팅으로 불만을 흘린 건 그 합의에서 벗어난 행동이었다.",
            "시트 누락 책임이 본인에게 올까 봐 불안했다.",
            "관계를 끊고 싶진 않아 공동 책임으로 수습되길 바라고 있다."
          ],
          "suppressions": [],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "family12:b:tell:number_stack"
          ],
          "claimAtoms": [
            {
              "id": "family12:b:d-5:s5:atom:0",
              "factText": "정산 원칙의 공동 파기는 사실입니다.",
              "tags": [
                "act",
                "rule",
                "responsibility",
                "admission"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            },
            {
              "id": "family12:b:d-5:s5:atom:1",
              "factText": "제가 사이드채팅으로 예외를 만들었고, 누나는 가족방 공개로 더 크게 어겼습니다.",
              "tags": [
                "rule",
                "responsibility",
                "relationship",
                "harm"
              ],
              "slots": {
                "rule": {
                  "exact": "공유 스프레드시트와 1:1 통화로만 정산 논의",
                  "neutral": "제한된 정산 채널 원칙"
                },
                "channel": {
                  "exact": "사촌 사이드채팅·가족방 공개",
                  "neutral": "우회 채널"
                },
                "time": {
                  "period": "발인 다음 날 이후",
                  "relative": "갈등이 커지기 전 합의 시점",
                  "neutral": "그때"
                },
                "evidence": {
                  "ref": "e-6/e-2",
                  "neutral": "공유규칙 메모와 위반 로그"
                }
              },
              "stanceHints": [
                "confess",
                "admission"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        }
      }
    }
  }
} as const;

export default family12V2Atoms;

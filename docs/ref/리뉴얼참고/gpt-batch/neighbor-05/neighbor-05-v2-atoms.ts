export const neighbor05V2Atoms = {
  "caseId": "neighbor-05",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 절도라고 단정한 게 아니라, 흰 상자를 든 장면이 제 상자일 수 있는지 물어본 것뿐이에요."
          ],
          "privateKnowledge": [
            "캡처가 잘린 화면이라 송장과 전후 흐름이 없다는 점을 알고 있다."
          ],
          "suppressions": [
            "이 메시지를 이웃 여러 명에게 전달했다는 점",
            "배송사 확인보다 전송이 먼저였다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-1:act:0",
              "factText": "흰 상자를 든 장면을 자기 상자일 수 있는 장면으로 말했다",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:a:d-1:denial:0",
              "factText": "절도 암시가 아니라 질문이었다고 주장한다",
              "tags": [
                "denial",
                "responsibility"
              ],
              "slots": {
                "quote": {
                  "exact": "제 상자 아닐까요",
                  "neutral": "그 문구"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "배송완료 알림 직후였고 상자 규격도 같아서, 확인을 부탁하려고 캡처를 보낸 거예요."
          ],
          "privateKnowledge": [
            "캡처 저장 시각이 배송완료 알림 직후 14분 뒤라는 점을 기억한다."
          ],
          "suppressions": [
            "원본 영상 없이 정지 캡처만 돌렸다는 점",
            "받는 사람 이름을 확인하지 못했다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-1:timeline:0",
              "factText": "배송완료 알림 직후의 시간 겹침을 근거로 의심이 합리적이었다고 말한다",
              "tags": [
                "timeline",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "배송완료 알림 직후 14분 뒤",
                  "neutral": "그 직후",
                  "dateExact": "배송완료 알림 직후 14분 뒤",
                  "period": "같은 오후"
                },
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:a:d-1:context:0",
              "factText": "같은 규격 흰 상자라는 외형 유사성을 근거로 든다",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "제가 캡처를 돌린 건 맞아요. 다만 업무용 자재가 사라져서 그 장면을 놓칠 수 없다고 본 겁니다."
          ],
          "privateKnowledge": [
            "전달문구가 이웃들로 하여금 재현 씨를 의심하게 만들 수 있다는 점을 안다."
          ],
          "suppressions": [
            "관리사무소나 배송사보다 먼저 이웃 대화로 갔다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-1:admission:0",
              "factText": "캡처를 전송한 사실 자체는 인정한다",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:a:d-1:motive:0",
              "factText": "업무용 자재를 놓치면 작업 일정이 무너진다는 압박을 이유로 든다",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "item": {
                  "exact": "업무용 자재",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "partial",
                "self_justify"
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
            "공개 범위가 과했던 건 인정하지만, 예전에도 택배를 옮길 때 설명이 늦어서 더 의심이 커졌어요."
          ],
          "privateKnowledge": [
            "봄비 오던 날 재현이 자신의 젖은 박스를 공동선반으로 옮긴 기억을 이번 사건에 끌어왔다."
          ],
          "suppressions": [
            "잘린 캡처만으로 이웃 판단을 유도했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-1:counter:0",
              "factText": "예전에 상대가 택배를 옮긴 기억을 끌어와 현재 판단의 근거로 삼는다",
              "tags": [
                "counter",
                "relationship"
              ],
              "slots": {
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:a:d-1:responsibility:0",
              "factText": "공개 범위가 과했다는 점은 일부 인정한다",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "channel": {
                  "exact": "층 대화방과 1:1 대화",
                  "neutral": "그 대화 채널"
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
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "그때는 제 일감이 날아간 줄 알았고, 제가 허술하게 굴었다는 말까지 들을까 봐 겁이 났어요."
          ],
          "privateKnowledge": [
            "합리적 의심처럼 보이게 말했지만 실제로는 관리 실패자로 보일 두려움이 더 컸다."
          ],
          "suppressions": [
            "불안 때문에 단정으로 점프했다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-1:fear:0",
              "factText": "업무용 자재 관리에 실패한 사람으로 보일까 두려워했다",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "item": {
                  "exact": "업무용 자재",
                  "neutral": "그 물건"
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
              "id": "neighbor05:a:d-1:shame:0",
              "factText": "이웃을 근거 없이 도둑 취급한 사람으로 보일 수 있다는 수치심이 새어 나온다",
              "tags": [
                "shame",
                "privacy"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
            "저는 잘린 CCTV 캡처를 이웃들에게 돌리면서 재현 씨가 제 택배를 가져간 것처럼 읽히게 만들었습니다. 확인보다 제 불안을 먼저 앞세운 제 잘못입니다."
          ],
          "privateKnowledge": [
            "원본 영상 없이 캡처와 문구만으로 의심을 확산시킨 책임을 받아들인다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-1:admission:1",
              "factText": "잘린 CCTV 캡처와 문구로 상대가 절도한 듯한 인상을 퍼뜨렸다고 시인한다",
              "tags": [
                "admission",
                "harm",
                "privacy"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 CCTV 정지 캡처",
                  "neutral": "그 잘린 화면"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:a:d-1:responsibility:1",
              "factText": "확인 절차보다 자기 불안을 먼저 앞세운 책임을 인정한다",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "confess"
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
            "재현 씨는 그냥 기분 상했다고 말한 게 아니라, 제가 공동선반 물건을 먼저 챙긴다는 식으로 퍼뜨렸어요."
          ],
          "privateKnowledge": [
            "그가 1:1 대화와 층 대화방 양쪽에서 비슷한 표현을 반복했다는 점을 안다."
          ],
          "suppressions": [
            "처음엔 자신이 캡처 유포로 불씨를 만들었다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-2:act:0",
              "factText": "상대가 공동선반 택배를 먼저 챙긴다는 식의 말을 퍼뜨렸다고 주장한다",
              "tags": [
                "act",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
                },
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:a:d-2:quote:0",
              "factText": "기분 문제가 아니라 평판성 문구가 반복됐다고 짚는다",
              "tags": [
                "quote",
                "harm"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                },
                "channel": {
                  "exact": "층 대화방과 1:1 대화",
                  "neutral": "그 대화 채널"
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
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "한 번 툭 던진 말이 아니에요. 같은 표현이 여러 대화방에 두 시간 안에 겹쳐 나왔잖아요."
          ],
          "privateKnowledge": [
            "메신저 원문에서 같은 표현이 세 군데 반복된다는 사실을 기억한다."
          ],
          "suppressions": [
            "자신이 캡처를 돌린 직후라 상대의 방어 심리도 있었을 수 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-2:timeline:0",
              "factText": "비슷한 표현이 짧은 시간 안에 여러 채널로 반복됐다고 말한다",
              "tags": [
                "timeline",
                "evidence"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                },
                "time": {
                  "exact": "2시간 안 반복",
                  "neutral": "짧은 시간 안",
                  "period": "같은 오후"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-2:harm:0",
              "factText": "그 반복이 자신의 평판을 습관적 행위처럼 굳혔다고 느낀다",
              "tags": [
                "harm",
                "identity"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "절도라고 직접 썼는지는 몰라도, 남의 택배를 먼저 만지는 사람처럼 만든 건 같아요."
          ],
          "privateKnowledge": [
            "상대가 표현 수위를 조절했다는 점은 안다."
          ],
          "suppressions": [
            "자신도 상대를 절도범처럼 보이게 한 적이 있다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-2:threshold:0",
              "factText": "직접적 절도 단정이 없어도 평판 손상은 충분했다고 말한다",
              "tags": [
                "threshold",
                "harm"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:a:d-2:identity:0",
              "factText": "자신이 남의 택배를 먼저 만지는 사람처럼 인식되었다고 느낀다",
              "tags": [
                "identity",
                "harm"
              ],
              "slots": {
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-2",
          "state": "S3",
          "publicClaim": [
            "예전에 제가 공동선반을 자주 확인한 걸 끌어다가, 이번엔 아예 습관처럼 포장해 버렸죠."
          ],
          "privateKnowledge": [
            "상대가 자신을 공격할 만한 맥락을 일부 실제 기억에서 가져왔다는 점을 안다."
          ],
          "suppressions": [
            "자신의 캡처 유포가 상대의 방어적 공격을 자극했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-2:counter:0",
              "factText": "공동선반을 자주 확인한 과거 행동이 왜곡돼 현재 비난 근거로 쓰였다고 말한다",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
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
              "id": "neighbor05:a:d-2:relationship:0",
              "factText": "과거 상호대리수령 경험이 이번엔 불신의 재료가 됐다고 본다",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
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
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "그 말이 돌고 나서는 제가 남의 상자를 뒤적이는 사람처럼 보일까 봐 공동선반 앞에 서는 것도 신경 쓰였어요."
          ],
          "privateKnowledge": [
            "스스로도 평판에 예민해져 있었다."
          ],
          "suppressions": [
            "상대를 먼저 도둑처럼 몰았던 책임"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-2:fear:0",
              "factText": "공동선반 앞에만 서도 의심받는 사람처럼 보일까 두려웠다고 말한다",
              "tags": [
                "fear",
                "identity"
              ],
              "slots": {
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
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
              "id": "neighbor05:a:d-2:emotion:0",
              "factText": "생활 동선 자체가 신경 쓰일 만큼 평판 압박을 느꼈다고 털어놓는다",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
            "재현 씨는 제 캡처에 대응한다며, 제가 남의 택배를 먼저 챙긴다는 인상을 여러 대화에 퍼뜨렸습니다. 제 잘못이 먼저 있었다고 해도 그 역소문까지 정당해지진 않습니다."
          ],
          "privateKnowledge": [
            "상대의 잘못과 자신의 선행 잘못을 함께 인정할 준비가 된다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-2:admission:0",
              "factText": "상대가 여러 대화 채널에 평판성 의심을 반복한 사실을 정리한다",
              "tags": [
                "admission",
                "harm",
                "identity"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:a:d-2:threshold:1",
              "factText": "자신의 선행 잘못이 있어도 역소문까지 정당화되지는 않는다고 선을 긋는다",
              "tags": [
                "threshold",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
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
            "제 택배가 사라진 직후에 재현 씨가 비슷한 상자를 들고 있었으니, 가져갔다고 의심할 만했다고 봤어요."
          ],
          "privateKnowledge": [
            "자신은 실제로 상대가 자기 택배를 든 장면을 본 적이 없고, 비슷한 상자만 봤다는 점을 안다."
          ],
          "suppressions": [
            "배송사고 가능성을 충분히 확인하지 않았다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-3:act:0",
              "factText": "상대가 자신의 분실 택배를 가져갔을 수 있다고 본다",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
                },
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
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
              "id": "neighbor05:a:d-3:timeline:0",
              "factText": "분실 직후 비슷한 상자가 보였다는 시간 연접을 근거로 든다",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "time": {
                  "exact": "배송완료 알림 직후 14분 뒤",
                  "neutral": "그 직후",
                  "dateExact": "배송완료 알림 직후 14분 뒤",
                  "period": "같은 오후"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
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
            "배송완료 알림도 떠 있었고, 공동선반엔 같은 규격 상자들이 겹쳐 있었어요. 그 상황이면 누가 봐도 의심이 갈 수 있죠."
          ],
          "privateKnowledge": [
            "같은 규격 상자가 자주 헷갈린다는 예전 기억이 있었음에도 정식 민원은 넣지 않았었다."
          ],
          "suppressions": [
            "같은 포장 오배송 전력이 있는 건물이라는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-3:context:0",
              "factText": "배송완료 알림과 동일 포장 상자들이 의심을 부추겼다고 말한다",
              "tags": [
                "context",
                "uncertainty"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-3:quote:0",
              "factText": "불안이 커질수록 누구나 의심할 수 있었다고 단정한다",
              "tags": [
                "quote",
                "self_justification"
              ],
              "slots": {
                "quote": {
                  "exact": "그 정도면 누가 봐도",
                  "neutral": "그 단정"
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
            "지금 와서 보면 제가 단정한 건 아니지만, 당시엔 재현 씨 쪽으로 시선이 갈 수밖에 없었다고 생각했어요."
          ],
          "privateKnowledge": [
            "자기 택배가 실제로는 기사 단말 선스캔과 보류 처리로 사라져 있었다는 가능성을 받아들이기 시작한다."
          ],
          "suppressions": [
            "자신이 절도 추정에 매달린 이유가 창피함 회피이기도 했다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-3:uncertainty:0",
              "factText": "절도라고 확정할 수는 없지만 상대 쪽으로 의심이 쏠렸다고 말한다",
              "tags": [
                "uncertainty",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
                },
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-3:institution:0",
              "factText": "택배사 단말 기록이 다른 설명을 내놓을 수 있다는 가능성을 받아들이기 시작한다",
              "tags": [
                "institution",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-4 단말 스캔 로그",
                  "neutral": "그 스캔 기록"
                },
                "institution": {
                  "exact": "택배대리점",
                  "neutral": "그 대리점"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "대리점 로그에 문제가 있었던 건 알겠어요. 그래도 예전처럼 누군가 상자를 옮기면 설명이 있어야 했고, 그 빈칸이 저를 더 몰아갔습니다."
          ],
          "privateKnowledge": [
            "배송사고가 본질이라는 점을 알면서도, 여전히 상대의 행동 습관을 끼워 넣고 싶어 한다."
          ],
          "suppressions": [
            "절도 근거보다 체면 회복이 더 중요해졌다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-3:institution:1",
              "factText": "대리점 로그 문제가 있었음을 인정하면서도 의심의 빈칸을 상대 행동으로 메운다",
              "tags": [
                "institution",
                "counter"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-4 단말 스캔 로그",
                  "neutral": "그 스캔 기록"
                },
                "institution": {
                  "exact": "택배대리점",
                  "neutral": "그 대리점"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-3:relationship:0",
              "factText": "예전 택배 이동 경험이 설명 없는 빈칸으로 남아 있었다고 말한다",
              "tags": [
                "relationship",
                "context"
              ],
              "slots": {
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "솔직히 절도가 아니었다면, 저는 잘못 짚고도 끝까지 버틴 사람이 되는 거잖아요. 그게 너무 창피해서 바로 놓지 못했어요."
          ],
          "privateKnowledge": [
            "체면을 지키려는 마음이 사실 확인보다 앞섰다는 점을 안다."
          ],
          "suppressions": [
            "의심의 근거가 점점 약해졌는데도 버틴 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-3:shame:0",
              "factText": "절도가 아니면 자신이 잘못 짚고 버틴 사람이 된다는 수치심을 털어놓는다",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
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
              "id": "neighbor05:a:d-3:fear:0",
              "factText": "의심을 철회하면 허술하게 굴었다는 평가를 받을까 두려워했다",
              "tags": [
                "fear",
                "self_justification"
              ],
              "slots": {
                "item": {
                  "exact": "업무용 자재",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "emotional"
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
            "재현 씨가 제 택배를 가져간 적은 없습니다. 제 물건도 재현 씨 물건도 그 시간엔 층까지 올라오지 않았고, 둘 다 선스캔 뒤 대리점 보류함에 남아 있던 배송 사고였습니다."
          ],
          "privateKnowledge": [
            "절도 서사가 아니라 배송사고 정리가 핵심이었다는 점을 받아들인다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-3:admission:0",
              "factText": "상대가 자기 택배를 가져간 적이 없다고 시인한다",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
                },
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-3:institution:2",
              "factText": "두 분실 택배가 선스캔과 젖은 송장 예외로 대리점 보류함에 남아 있었다고 정리한다",
              "tags": [
                "institution",
                "timeline",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-4 단말 스캔 로그",
                  "neutral": "그 스캔 기록"
                },
                "place": {
                  "exact": "대리점 보류함",
                  "neutral": "그 보류 장소"
                },
                "issue": {
                  "exact": "젖은 송장 예외 처리",
                  "neutral": "그 예외 처리"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present"
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
            "그 흰 상자가 제 상자일 수 있다고 본 건 무리한 추정만은 아니었어요. 배송완료 직후였고 크기도 거의 같았으니까요."
          ],
          "privateKnowledge": [
            "상자 표면의 송장이나 수취인 이름을 확인하지 못했다는 점을 안다."
          ],
          "suppressions": [
            "파란 스티커 같은 식별 요소를 확인하지 않았다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-4:identity:0",
              "factText": "CCTV 속 흰 상자가 자기 물건일 수 있다고 봤다",
              "tags": [
                "identity",
                "uncertainty"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
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
              "id": "neighbor05:a:d-4:timeline:0",
              "factText": "배송완료 직후라는 시점 겹침을 상자 동일성 근거로 든다",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "배송완료 알림 직후 14분 뒤",
                  "neutral": "그 직후",
                  "dateExact": "배송완료 알림 직후 14분 뒤",
                  "period": "같은 오후"
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
        "S1": {
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "그 화면에 다른 식별 정보가 없으니, 저는 상자 크기와 움직인 시각으로 판단할 수밖에 없었죠."
          ],
          "privateKnowledge": [
            "크롭된 화면이라 식별 정보 자체가 빠져 있었다는 걸 안다."
          ],
          "suppressions": [
            "원본 영상을 보지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-4:evidence:0",
              "factText": "식별 정보 없는 크롭 화면에서는 크기와 시각에 의존할 수밖에 없었다고 말한다",
              "tags": [
                "evidence",
                "self_justification"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                },
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-4:uncertainty:0",
              "factText": "확정이 아니라 조건부 판단이었다고 선을 긋는다",
              "tags": [
                "uncertainty",
                "denial"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 CCTV 정지 캡처",
                  "neutral": "그 잘린 화면"
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
            "류다은 씨 상자라는 얘기를 듣고 나서야, 제가 상자 표면 특징을 거의 못 봤다는 걸 인정하게 됐어요."
          ],
          "privateKnowledge": [
            "파란 스티커와 테이프 자국을 자신은 제대로 기억하지 못한다."
          ],
          "suppressions": [
            "상자 동일성을 너무 빨리 단정한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-4:admission:0",
              "factText": "제3자 상자라는 가능성을 듣고 자신의 식별이 부정확했음을 인정한다",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "류다은",
                  "neutral": "그 주민",
                  "fullName": "류다은",
                  "judgeRef": "류다은 씨"
                },
                "evidence": {
                  "exact": "e-3 배송완료 사진 대조",
                  "neutral": "그 대조 자료"
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
              "id": "neighbor05:a:d-4:evidence:1",
              "factText": "파란 스티커 같은 표면 특징을 제대로 확인하지 못했다고 말한다",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "marker": {
                  "exact": "파란 스티커",
                  "neutral": "그 표시"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "예전에도 같은 흰 상자가 다른 동에 잘못 놓인다고 했잖아요. 그 기억 때문에 이번에도 제 물건일 거라고 더 붙잡았습니다."
          ],
          "privateKnowledge": [
            "동일 포장 오배송 전력을 이번 판단에 과도하게 끌어왔다."
          ],
          "suppressions": [
            "류다은 상자일 가능성을 뒤늦게 알면서도 바로 물러나지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-4:legacy_sentence:0",
              "factText": "같은 포장 오배송 전력이 이번 상자 판단을 더 굳히게 만들었다고 말한다",
              "tags": [
                "legacy_sentence",
                "context"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
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
              "id": "neighbor05:a:d-4:self_justification:0",
              "factText": "과거 경험 때문에 자신의 판단이 그때는 자연스러웠다고 정당화한다",
              "tags": [
                "self_justification",
                "uncertainty"
              ],
              "slots": {
                "parcel": {
                  "exact": "서윤의 분실 택배",
                  "neutral": "그 택배"
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
            "제 물건이 아니면 제가 사람까지 잘못 찍은 셈이 되니까, 그 상자가 제 것이라는 생각을 놓는 게 무서웠어요."
          ],
          "privateKnowledge": [
            "상자 동일성이 무너지면 d-1의 공개 의심도 함께 무너진다는 점을 안다."
          ],
          "suppressions": [
            "두려움 때문에 식별 오류를 끌고 간 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-4:fear:0",
              "factText": "상자 동일성을 놓으면 사람까지 잘못 찍은 셈이 된다는 두려움을 털어놓는다",
              "tags": [
                "fear",
                "identity"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:a:d-4:shame:0",
              "factText": "식별 오류가 드러나면 전체 판단이 무너진다는 수치심이 새어 나온다",
              "tags": [
                "shame",
                "responsibility"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
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
            "CCTV 속 흰 상자는 제 것도 재현 씨 것도 아니었습니다. 류다은 씨의 정기배송 상자였고, 파란 스티커와 배송완료 사진 대조로 그게 확인됐습니다."
          ],
          "privateKnowledge": [
            "잘못된 상자 동일성이 이번 오해의 핵심이었다는 점을 받아들인다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-4:admission:1",
              "factText": "CCTV 속 흰 상자가 제3자 상자였다고 인정한다",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "류다은",
                  "neutral": "그 주민",
                  "fullName": "류다은",
                  "judgeRef": "류다은 씨"
                },
                "box": {
                  "exact": "류다은 세대의 정기배송 흰 상자",
                  "neutral": "그 제3자 상자"
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
              "id": "neighbor05:a:d-4:evidence:2",
              "factText": "파란 스티커와 배송완료 사진 대조가 식별의 결정적 근거였다고 정리한다",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-3 배송완료 사진 대조",
                  "neutral": "그 대조 자료"
                },
                "marker": {
                  "exact": "파란 스티커",
                  "neutral": "그 표시"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
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
            "저는 공개 의심을 하려던 게 아니라, 빨리 확인하려고 캡처를 공유한 거예요."
          ],
          "privateKnowledge": [
            "과거에 먼저 배송사와 관리사무소 확인 후 서로 말하자고 합의했던 걸 기억한다."
          ],
          "suppressions": [
            "문의 접수 전에 캡처를 보냈다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-5:denial:0",
              "factText": "공개 의심이 아니라 빠른 확인 시도였다고 주장한다",
              "tags": [
                "denial",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                },
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
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
              "id": "neighbor05:a:d-5:legacy_sentence:0",
              "factText": "예전 확인 우선 합의를 알고도 이번 행동을 예외처럼 말한다",
              "tags": [
                "legacy_sentence",
                "responsibility"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
                }
              },
              "stanceHints": [
                "deny",
                "self_justify"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "배송사에도 바로 연락할 생각이었어요. 메시지가 먼저 나간 건 맞지만, 규칙을 깨려던 의도는 아니었습니다."
          ],
          "privateKnowledge": [
            "이번 사건의 첫 공개 의심이 배송사 문의 접수보다 앞섰다는 순서를 안다."
          ],
          "suppressions": [
            "행동 순서 자체가 약속 파기로 읽힐 수 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-5:timeline:0",
              "factText": "메시지가 먼저 나갔지만 의도는 확인이었다고 시간 순서를 완화한다",
              "tags": [
                "timeline",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "배송사 문의 접수 전 공개 의심이 먼저 올라간 시각",
                  "neutral": "확인 전 시점",
                  "dateExact": "문의 접수 이전",
                  "period": "사건 초반"
                },
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
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
              "id": "neighbor05:a:d-5:rule:0",
              "factText": "의도와 약속 위반 여부를 분리하려 한다",
              "tags": [
                "rule",
                "threshold"
              ],
              "slots": {
                "rule": {
                  "exact": "먼저 배송사와 관리사무소에 확인한다는 합의",
                  "neutral": "그 확인 우선 원칙"
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "결과적으로는 제가 확인 전에 캡처를 돌린 셈이죠. 그건 인정합니다."
          ],
          "privateKnowledge": [
            "업무용 자재 분실 불안이 규칙 기억보다 앞섰다."
          ],
          "suppressions": [
            "재현에게 먼저 1:1로 묻지 않은 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-5:admission:0",
              "factText": "확인 전에 캡처를 돌린 사실 자체는 인정한다",
              "tags": [
                "admission",
                "rule"
              ],
              "slots": {
                "time": {
                  "exact": "배송사 문의 접수 전 공개 의심이 먼저 올라간 시각",
                  "neutral": "확인 전 시점",
                  "dateExact": "문의 접수 이전",
                  "period": "사건 초반"
                },
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
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
              "id": "neighbor05:a:d-5:motive:0",
              "factText": "분실 불안이 규칙 기억보다 앞섰다고 드러낸다",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "item": {
                  "exact": "업무용 자재",
                  "neutral": "그 물건"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "약속의 글자만 보면 제가 먼저 어긴 게 맞을 수 있어요. 다만 그 순간엔 공개가 아니라 도움 요청이라고 스스로 합리화했습니다."
          ],
          "privateKnowledge": [
            "규칙의 '공개 의심 금지' 부분을 의도적으로 좁게 해석했다."
          ],
          "suppressions": [
            "도움 요청과 공개 의심의 경계를 자신에게 유리하게 바꿔 말한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:a:tell:tracking_recital",
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-5:threshold:0",
              "factText": "도움 요청과 공개 의심의 경계를 자신에게 유리하게 낮췄다고 드러난다",
              "tags": [
                "threshold",
                "self_justification"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:a:d-5:responsibility:0",
              "factText": "약속 문언상 먼저 어긴 쪽일 수 있음을 인정한다",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "그 약속을 알면서도 깨버렸다는 게 너무 부끄러웠어요. 일감이 걸리니까 평소 기준을 제가 스스로 밀어버린 거예요."
          ],
          "privateKnowledge": [
            "수치심 때문에 초반엔 의도만 강조하며 회피했다."
          ],
          "suppressions": [
            "규칙 위반을 인정하는 순간 체면이 더 무너질까 봐 버틴 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-5:shame:0",
              "factText": "약속을 알면서도 깨버렸다는 사실이 부끄러웠다고 인정한다",
              "tags": [
                "shame",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
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
              "id": "neighbor05:a:d-5:fear:0",
              "factText": "일감이 걸리자 평소 기준을 스스로 밀어버렸다고 털어놓는다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "item": {
                  "exact": "업무용 자재",
                  "neutral": "그 물건"
                }
              },
              "stanceHints": [
                "emotional"
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
            "저는 예전에 합의한 확인 우선 원칙을 알고도, 배송사 확인 전에 CCTV 캡처를 돌리며 공개 의심을 시작했습니다. 그 약속을 먼저 깬 책임을 인정합니다."
          ],
          "privateKnowledge": [
            "규칙 위반이 이번 분쟁을 키운 시작점 중 하나였음을 받아들인다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:a:tell:screenshot_anchor",
            "neighbor05:a:tell:certainty_jump"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:a:d-5:admission:1",
              "factText": "확인 우선 원칙을 알고도 공개 의심을 먼저 시작했다고 시인한다",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                },
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
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
              "id": "neighbor05:a:d-5:harm:0",
              "factText": "그 약속 파기가 분쟁을 크게 키웠다고 인정한다",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
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
            "그 캡처 한 장 때문에 저는 제 물건도 아닌 상자를 들었다가 도둑 취급을 받았습니다."
          ],
          "privateKnowledge": [
            "캡처가 원본 영상이 아니라 잘린 정지 화면이라는 점을 분명히 알고 있다."
          ],
          "suppressions": [
            "서윤이 느낀 불안 자체는 이해하고 있다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-1:harm:0",
              "factText": "잘린 캡처 한 장이 자신을 도둑처럼 보이게 만들었다고 말한다",
              "tags": [
                "harm",
                "privacy"
              ],
              "slots": {
                "evidence": {
                  "exact": "잘린 CCTV 정지 캡처",
                  "neutral": "그 잘린 화면"
                },
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "deny",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:b:d-1:identity:0",
              "factText": "자기 물건이 아닌 상자를 든 장면만으로 절도 이미지가 씌워졌다고 주장한다",
              "tags": [
                "identity",
                "harm"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "송장도 전후 영상도 없이 정지 캡처만 있으면, 누가 봐도 사실 확인이 아니라 낙인에 가깝죠."
          ],
          "privateKnowledge": [
            "전후 영상이 없다는 점이 자신에게 유리한 핵심이라는 것을 안다."
          ],
          "suppressions": [
            "서윤이 그 무렵 배송완료 알림을 받은 건 사실이라는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-1:evidence:0",
              "factText": "정지 캡처만으로는 수취인과 상자 흐름을 확인할 수 없다고 지적한다",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:b:d-1:threshold:0",
              "factText": "사실 확인과 공개 낙인은 다른 수준의 행동이라고 선을 긋는다",
              "tags": [
                "threshold",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
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
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "서윤 씨가 불안했던 건 알지만, 그럴수록 저한테 먼저 묻거나 관리사무소에 확인했어야 했습니다."
          ],
          "privateKnowledge": [
            "자신도 곧 역소문을 퍼뜨릴 생각을 하고 있었다."
          ],
          "suppressions": [
            "상대에게 1:1로 답할 여지도 없이 평판 피해를 먼저 느꼈다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-1:rule:0",
              "factText": "당사자나 관리사무소 확인이 먼저였어야 했다고 말한다",
              "tags": [
                "rule",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "먼저 배송사와 관리사무소에 확인한다는 합의",
                  "neutral": "그 확인 우선 원칙"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:b:d-1:emotion:0",
              "factText": "상대의 불안은 이해하지만 절차 위반은 별개라고 구분한다",
              "tags": [
                "emotion",
                "threshold"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
            "예전에도 공개 의심은 미루자고 해놓고 이번엔 캡처부터 돌렸잖아요. 저는 그 순간부터 변명할 틈도 없이 이름이 먼저 망가졌습니다."
          ],
          "privateKnowledge": [
            "자신이 그 후에 다른 채널로 맞소문을 퍼뜨린 점을 의도적으로 덜 말한다."
          ],
          "suppressions": [
            "자신도 약속을 깼다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-1:legacy_sentence:0",
              "factText": "예전 확인 우선 약속을 이번에 상대가 먼저 깼다고 강조한다",
              "tags": [
                "legacy_sentence",
                "rule"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                },
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
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
              "id": "neighbor05:b:d-1:harm:1",
              "factText": "변명할 틈도 없이 평판이 손상됐다고 호소한다",
              "tags": [
                "harm",
                "emotion"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
                }
              },
              "stanceHints": [
                "blame",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "층 사람들 시선이 전부 저를 향하는 것 같았어요. 야간근무를 핑계로 사각시간에 남의 택배를 건드린 사람처럼 보일까 봐 숨이 막혔습니다."
          ],
          "privateKnowledge": [
            "그 수치심이 뒤이어 자기 방어성 소문을 퍼뜨리게 만들었다."
          ],
          "suppressions": [
            "두려움 때문에 말의 범위를 줄여 표현하고 있다는 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-1:fear:0",
              "factText": "야간근무 동선을 이용한 절도범처럼 보일까 두려웠다고 말한다",
              "tags": [
                "fear",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "임재현",
                  "neutral": "상대방",
                  "fullName": "임재현",
                  "judgeRef": "재현 씨"
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
              "id": "neighbor05:b:d-1:emotion:1",
              "factText": "주민 시선이 전부 자신을 겨누는 듯한 압박을 털어놓는다",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
            "서윤 씨는 잘린 CCTV 캡처와 문구로 제가 훔친 것처럼 읽히게 만들었습니다. 절도는 없었더라도 그 공개 의심 자체가 제 평판을 크게 훼손했습니다."
          ],
          "privateKnowledge": [
            "상대의 불안이 있었다는 점과 자신이 받은 피해를 동시에 인정하려 한다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-1:harm:2",
              "factText": "상대의 공개 의심이 절도 프레임을 만들었다고 정리한다",
              "tags": [
                "harm",
                "privacy",
                "responsibility"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                },
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
              "id": "neighbor05:b:d-1:relationship:0",
              "factText": "절도 사실 유무와 별개로 이웃 간 신뢰가 깨졌다고 말한다",
              "tags": [
                "relationship",
                "harm"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
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
            "저는 소문을 퍼뜨린 게 아니라, 제 평판이 깨졌다는 얘기를 한 겁니다."
          ],
          "privateKnowledge": [
            "실제로는 1:1 대화와 층 대화방에서 비슷한 말을 반복했다."
          ],
          "suppressions": [
            "서윤이 남의 택배를 먼저 챙길 수 있다고 말한 부분"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-2:denial:0",
              "factText": "소문 전파가 아니라 평판 피해 호소였다고 주장한다",
              "tags": [
                "denial",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
              "id": "neighbor05:b:d-2:harm:0",
              "factText": "먼저 다친 쪽은 자신이라는 프레임을 세운다",
              "tags": [
                "harm",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "deny",
                "self_justify"
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
            "말한 범위도 과장됐어요. 몇 사람한테 제 입장을 설명한 정도였습니다."
          ],
          "privateKnowledge": [
            "같은 표현이 세 개 채널에 반복되었다는 메타데이터가 불리하다는 점을 안다."
          ],
          "suppressions": [
            "대화방과 1:1을 오간 실제 범위"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-2:threshold:0",
              "factText": "전파 범위를 몇 사람 수준으로 줄여 말한다",
              "tags": [
                "threshold",
                "denial"
              ],
              "slots": {
                "quote": {
                  "exact": "몇 사람한테만",
                  "neutral": "좁은 범위"
                },
                "channel": {
                  "exact": "층 대화방과 1:1 대화",
                  "neutral": "그 대화 채널"
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
              "id": "neighbor05:b:d-2:self_justification:0",
              "factText": "설명 목적이었지 낙인 목적은 아니었다고 말한다",
              "tags": [
                "self_justification",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
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
            "제가 '먼저 챙길 때가 있다'고 말한 건 맞습니다. 하지만 그때는 이미 제가 도둑처럼 돌아다니는 사람으로 찍힌 뒤였어요."
          ],
          "privateKnowledge": [
            "그 표현이 상대를 습관적 문제인물처럼 보이게 만들 수 있다는 점을 안다."
          ],
          "suppressions": [
            "확인 없는 추정이었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-2:admission:0",
              "factText": "상대가 공동선반 물건을 먼저 챙길 때가 있다고 말한 사실은 인정한다",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                },
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
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
              "id": "neighbor05:b:d-2:motive:0",
              "factText": "자신이 도둑처럼 낙인찍힌 뒤라 방어적으로 대응했다고 설명한다",
              "tags": [
                "motive",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                },
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
                }
              },
              "stanceHints": [
                "partial",
                "self_justify"
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
            "서윤 씨가 캡처를 돌린 뒤였으니, 저도 왜 그런 의심이 생겼는지 설명하려 했습니다. 다만 그 과정에서 범위를 줄여 말한 건 맞아요."
          ],
          "privateKnowledge": [
            "대화 범위를 의도적으로 축소해 진술하고 있다는 점을 안다."
          ],
          "suppressions": [
            "확인되지 않은 내용을 설명인 것처럼 포장한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-2:counter:0",
              "factText": "상대의 캡처 유포가 먼저였다고 책임을 일부 돌린다",
              "tags": [
                "counter",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                },
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:b:d-2:responsibility:0",
              "factText": "말한 범위를 줄여 진술하고 있다는 점이 새어 나온다",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {
                "channel": {
                  "exact": "층 대화방과 1:1 대화",
                  "neutral": "그 대화 채널"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "저는 병원에서 사람 상대하는 일을 해서 평판이 무너지면 오래 갑니다. 그 모욕을 그냥 삼키기가 너무 어려웠어요."
          ],
          "privateKnowledge": [
            "자존심과 평판 회복 욕구가 사실 확인보다 앞섰다."
          ],
          "suppressions": [
            "감정을 짧게 누르며 말 수위를 조절한 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-2:fear:0",
              "factText": "평판이 한번 망가지면 오래 간다는 두려움을 털어놓는다",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
              "id": "neighbor05:b:d-2:emotion:0",
              "factText": "받은 모욕을 그대로 삼키기 어려웠다고 인정한다",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
            "저는 서윤 씨가 남의 택배를 먼저 챙길 때가 있다는 식의 말을 여러 대화에 반복했습니다. 절도라고 단정하지는 않았어도, 확인 없는 평판성 의심을 퍼뜨린 건 제 책임입니다."
          ],
          "privateKnowledge": [
            "자신의 방어가 결국 또 다른 평판 공격이었음을 인정한다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-2:admission:1",
              "factText": "확인 없는 평판성 의심을 여러 대화에 반복했다고 시인한다",
              "tags": [
                "admission",
                "harm",
                "identity"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                },
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
              "id": "neighbor05:b:d-2:responsibility:1",
              "factText": "직접 절도 단정이 없었다는 변명으로 책임을 피할 수 없다고 인정한다",
              "tags": [
                "responsibility",
                "threshold"
              ],
              "slots": {
                "quote": {
                  "exact": "몇 사람한테만",
                  "neutral": "좁은 범위"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "motive_search",
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
            "저도 제 택배가 사라진 줄 알았으니, 서윤 씨가 먼저 만졌을 가능성을 떠올린 겁니다."
          ],
          "privateKnowledge": [
            "직접 가져가는 장면은 보지 못했고, 공동선반을 자주 확인한다는 인상만 있었다."
          ],
          "suppressions": [
            "절도 가능성을 뒷받침할 물증이 없다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-3:act:0",
              "factText": "상대가 자신의 분실 택배를 먼저 만졌을 수 있다고 본다",
              "tags": [
                "act",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                },
                "parcel": {
                  "exact": "재현의 분실 택배",
                  "neutral": "그 택배"
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
              "id": "neighbor05:b:d-3:context:0",
              "factText": "공동선반을 자주 확인한다는 인상이 의심의 바탕이 되었다고 말한다",
              "tags": [
                "context",
                "relationship"
              ],
              "slots": {
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
                },
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "deny",
                "hedge"
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
            "배송완료가 떴는데 물건은 없고, 같은 규격 상자가 오가면 저라도 의심하죠. 그때는 절도보다도 '누가 먼저 가져갔나' 쪽으로 생각이 갔습니다."
          ],
          "privateKnowledge": [
            "같은 포장 상자가 자주 오배송된다는 과거 기억을 떠올리고 있다."
          ],
          "suppressions": [
            "배송기사 시스템 문제 가능성"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-3:timeline:0",
              "factText": "배송완료 알림과 빈 공동선반이 절도 의심의 출발점이었다고 말한다",
              "tags": [
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "parcel": {
                  "exact": "재현의 분실 택배",
                  "neutral": "그 택배"
                },
                "place": {
                  "exact": "공동선반",
                  "neutral": "그 선반"
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
              "id": "neighbor05:b:d-3:threshold:0",
              "factText": "당시엔 절도 확정보다 누가 먼저 가져갔는지 추정했다고 말한다",
              "tags": [
                "threshold",
                "denial"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "지금 보면 서윤 씨가 가져갔다고 단정할 근거는 없었습니다. 다만 제가 그렇게 생각한 상황은 있었다는 겁니다."
          ],
          "privateKnowledge": [
            "기사 단말 로그가 실제 하차보다 빨리 찍혔다는 설명을 듣고 있다."
          ],
          "suppressions": [
            "자신도 추정에 기대고 있었다는 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-3:uncertainty:0",
              "factText": "상대가 가져갔다고 단정할 근거는 없었다고 인정한다",
              "tags": [
                "uncertainty",
                "admission"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                },
                "parcel": {
                  "exact": "재현의 분실 택배",
                  "neutral": "그 택배"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:b:d-3:institution:0",
              "factText": "기사 단말 로그가 다른 원인을 가리킬 수 있음을 받아들인다",
              "tags": [
                "institution",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-4 단말 스캔 로그",
                  "neutral": "그 스캔 기록"
                },
                "time": {
                  "exact": "실제 기사 동선보다 18분 빠른 선스캔 시각",
                  "neutral": "그 선스캔 시점",
                  "dateExact": "18분 빠른 완료 처리",
                  "period": "문제 시각"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "결국 배송사고가 더 큰 원인이었던 건 맞습니다. 그래도 그 순간엔 서윤 씨가 먼저 움직였을 거라는 인상을 떨치기 어려웠어요."
          ],
          "privateKnowledge": [
            "배송사고가 본질이지만, 자신이 형성한 상대 이미지가 의심을 끌었다는 점을 안다."
          ],
          "suppressions": [
            "이미지에 기대 의심을 유지한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-3:institution:1",
              "factText": "배송사고가 큰 원인이었다는 점은 인정한다",
              "tags": [
                "institution",
                "admission"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-5 GPS·콜센터 요약",
                  "neutral": "그 배송사 자료"
                },
                "institution": {
                  "exact": "택배대리점",
                  "neutral": "그 대리점"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:b:d-3:identity:0",
              "factText": "상대가 먼저 움직일 사람이라는 이미지를 끝까지 붙잡고 있었다고 드러낸다",
              "tags": [
                "identity",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
            "절도가 아니었다면 저도 헛짚은 건데, 그걸 인정하면 제가 괜히 사람을 몰아붙인 꼴이 되잖아요. 그게 싫었습니다."
          ],
          "privateKnowledge": [
            "모욕을 받은 뒤라 스스로도 쉽게 물러서지 못했다."
          ],
          "suppressions": [
            "자존심 때문에 추정을 놓지 않은 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-3:shame:0",
              "factText": "헛짚었다는 걸 인정하면 괜히 사람을 몰아붙인 꼴이 된다는 수치심을 말한다",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
              "id": "neighbor05:b:d-3:fear:0",
              "factText": "물러서면 억울함까지 전부 혼자 뒤집어쓴 느낌이 될까 두려웠다고 말한다",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
            "서윤 씨가 제 택배를 가져간 적도 없습니다. 제 택배와 서윤 씨 택배는 둘 다 기사 선스캔과 예외 처리 때문에 대리점 보류함에 남아 있었고, 저희는 배송사고를 절도로 착각한 겁니다."
          ],
          "privateKnowledge": [
            "절도 누명과 역의심 모두 배송사고 위에 세워졌다는 점을 인정한다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-3:admission:0",
              "factText": "상대가 자기 택배를 가져간 적이 없다고 인정한다",
              "tags": [
                "admission",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                },
                "parcel": {
                  "exact": "재현의 분실 택배",
                  "neutral": "그 택배"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:b:d-3:institution:2",
              "factText": "양쪽 택배가 기사 선스캔과 예외 처리로 보류함에 남아 있었다고 정리한다",
              "tags": [
                "institution",
                "timeline",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-5 GPS·콜센터 요약",
                  "neutral": "그 배송사 자료"
                },
                "place": {
                  "exact": "대리점 보류함",
                  "neutral": "그 보류 장소"
                },
                "issue": {
                  "exact": "배송완료 선스캔과 젖은 송장 예외",
                  "neutral": "그 배송 사고"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present"
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
            "그 상자는 제 상자처럼 보였어요. 같은 흰 박스였고, 제 것도 그때 안 보였으니까요."
          ],
          "privateKnowledge": [
            "실제로는 자신의 상자 송장 특징을 화면에서 확인하지 못했다."
          ],
          "suppressions": [
            "류다은 씨 상자일 가능성"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-4:identity:0",
              "factText": "CCTV 속 흰 상자를 자기 택배로 보았다고 말한다",
              "tags": [
                "identity",
                "uncertainty"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                },
                "parcel": {
                  "exact": "재현의 분실 택배",
                  "neutral": "그 택배"
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
              "id": "neighbor05:b:d-4:context:0",
              "factText": "자기 택배가 안 보이던 상황이 상자 동일성 판단을 부추겼다고 설명한다",
              "tags": [
                "context",
                "self_justification"
              ],
              "slots": {
                "parcel": {
                  "exact": "재현의 분실 택배",
                  "neutral": "그 택배"
                }
              },
              "stanceHints": [
                "deny",
                "self_justify"
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
            "그 각도에서 보면 누구라도 자기 상자라고 생각할 수 있습니다. 식별표가 안 보이는 캡처였잖아요."
          ],
          "privateKnowledge": [
            "식별표가 안 보이는 캡처라는 사실이 자신의 주장에 유일한 방패라는 점을 안다."
          ],
          "suppressions": [
            "파란 스티커를 확인하지 않은 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-4:evidence:0",
              "factText": "식별표가 보이지 않는 캡처 각도 탓에 오인 가능성이 컸다고 말한다",
              "tags": [
                "evidence",
                "uncertainty"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                },
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
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
              "id": "neighbor05:b:d-4:threshold:0",
              "factText": "누구라도 그렇게 생각할 수 있었다며 판단 문턱을 낮춘다",
              "tags": [
                "threshold",
                "self_justification"
              ],
              "slots": {
                "quote": {
                  "exact": "그 정도면 누가 봐도",
                  "neutral": "그 단정"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-4",
          "state": "S2",
          "publicClaim": [
            "e-3을 보고 나서야 파란 스티커를 제가 전혀 체크하지 않았다는 걸 알았습니다. 그 전엔 제 상자라는 쪽으로 마음이 너무 기울어 있었어요."
          ],
          "privateKnowledge": [
            "류다은 배송사진과 실제 상자 대조가 자신의 추정을 무너뜨린다는 점을 안다."
          ],
          "suppressions": [
            "캡처 한 장만으로 자기 방어 논리를 세운 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-4:admission:0",
              "factText": "파란 스티커를 확인하지 않은 채 상자를 자기 것으로 몰아갔다고 인정한다",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "marker": {
                  "exact": "파란 스티커",
                  "neutral": "그 표시"
                },
                "evidence": {
                  "exact": "e-3 배송완료 사진 대조",
                  "neutral": "그 대조 자료"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present"
              ]
            },
            {
              "id": "neighbor05:b:d-4:motive:0",
              "factText": "자기 방어가 필요해 상자 동일성을 너무 빨리 붙잡았다고 드러낸다",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "partial",
                "self_justify"
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
            "제가 그 상자를 붙들고 있었던 건, 그게 제 것도 아니면 제 반박 전체가 약해지기 때문이었습니다."
          ],
          "privateKnowledge": [
            "상자 동일성이 무너지면 자신이 받은 피해 호소만 남는다는 점을 안다."
          ],
          "suppressions": [
            "식별 오류를 인정하면 방어 논리가 약해진다는 계산"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-4:self_justification:0",
              "factText": "상자 동일성을 유지해야 자기 반박이 버틴다고 생각했다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "neighbor05:b:d-4:admission:1",
              "factText": "식별 오류를 인정하면 자신의 논리가 약해진다는 계산이 있었다고 드러난다",
              "tags": [
                "admission",
                "shame"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-4",
          "state": "S4",
          "publicClaim": [
            "그 상자까지 제 것 아니라고 하면, 저는 억울함만 남은 채 괜히 더 크게 떠든 사람이 됩니다. 그게 너무 싫었어요."
          ],
          "privateKnowledge": [
            "억울함을 붙잡으려다 사실관계를 늦게 받아들였다는 점을 안다."
          ],
          "suppressions": [
            "체면 때문에 오인을 오래 붙든 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-4:shame:0",
              "factText": "상자까지 자기 것이 아니면 괜히 더 크게 떠든 사람이 된다는 수치심을 말한다",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "box": {
                  "exact": "흰 상자",
                  "neutral": "그 상자"
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
              "id": "neighbor05:b:d-4:fear:0",
              "factText": "억울함만 남은 채 물러서야 하는 상황을 두려워했다고 말한다",
              "tags": [
                "fear",
                "harm"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
            "그 흰 상자는 제 것도 서윤 씨 것도 아니었습니다. 류다은 씨 상자였고, 파란 스티커와 배송완료 사진이 그걸 분명히 보여줍니다."
          ],
          "privateKnowledge": [
            "식별을 잘못 붙잡은 채 방어 논리를 세웠다는 점을 받아들인다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-4:admission:2",
              "factText": "CCTV 속 흰 상자가 제3자의 상자였다고 인정한다",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "류다은",
                  "neutral": "그 주민",
                  "fullName": "류다은",
                  "judgeRef": "류다은 씨"
                },
                "box": {
                  "exact": "류다은 세대의 정기배송 흰 상자",
                  "neutral": "그 제3자 상자"
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
              "id": "neighbor05:b:d-4:evidence:1",
              "factText": "파란 스티커와 배송완료 사진 대조가 오인을 바로잡았다고 말한다",
              "tags": [
                "evidence",
                "context"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-3 배송완료 사진 대조",
                  "neutral": "그 대조 자료"
                },
                "marker": {
                  "exact": "파란 스티커",
                  "neutral": "그 표시"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
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
            "제가 공개 의심을 시작한 건 아닙니다. 이미 캡처가 돌았으니 제 입장을 몇 군데 설명한 거예요."
          ],
          "privateKnowledge": [
            "예전 합의상 공개 채널에서 의심을 되받아치는 것도 금지라는 점을 안다."
          ],
          "suppressions": [
            "자신도 확인 전에 1:1과 대화방으로 말을 퍼뜨린 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-5:denial:0",
              "factText": "자신은 시작자가 아니라 대응자였다고 말한다",
              "tags": [
                "denial",
                "counter"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-1 CCTV 캡처",
                  "neutral": "그 캡처"
                },
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
              "id": "neighbor05:b:d-5:rule:0",
              "factText": "입장 설명과 공개 의심을 다른 행동처럼 나눠 말한다",
              "tags": [
                "rule",
                "threshold"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "deny",
                "self_justify"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "배송사 확인도 안 끝난 상태였지만, 제가 당한 모욕을 설명할 필요는 있었어요."
          ],
          "privateKnowledge": [
            "자신의 발언 시점 역시 배송사 확인 전에 있었다는 점을 안다."
          ],
          "suppressions": [
            "설명이 곧 의심 전파가 됐다는 점"
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-5:timeline:0",
              "factText": "배송사 확인 전이었어도 설명할 필요가 있었다고 말한다",
              "tags": [
                "timeline",
                "self_justification"
              ],
              "slots": {
                "time": {
                  "exact": "배송사 문의 접수 전 공개 의심이 먼저 올라간 시각",
                  "neutral": "확인 전 시점",
                  "dateExact": "문의 접수 이전",
                  "period": "사건 초반"
                },
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
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
              "id": "neighbor05:b:d-5:harm:0",
              "factText": "모욕을 설명하는 행위로 자기 행동을 정당화한다",
              "tags": [
                "harm",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
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
            "돌이켜보면 저도 확인 전에 말을 얹은 건 맞습니다. 다만 그때는 방어라고 생각했어요."
          ],
          "privateKnowledge": [
            "방어라고 생각했지만 결과적으로는 공개 의심을 확장했다는 걸 안다."
          ],
          "suppressions": [
            "확인 우선 원칙을 스스로 예외 처리한 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-5:admission:0",
              "factText": "확인 전에 말을 얹은 사실은 인정한다",
              "tags": [
                "admission",
                "rule"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-2 대화 캡처",
                  "neutral": "그 대화"
                },
                "time": {
                  "exact": "배송사 문의 접수 전 공개 의심이 먼저 올라간 시각",
                  "neutral": "확인 전 시점",
                  "dateExact": "문의 접수 이전",
                  "period": "사건 초반"
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
              "id": "neighbor05:b:d-5:self_justification:0",
              "factText": "그때는 방어라고 생각했다며 행동 의미를 줄인다",
              "tags": [
                "self_justification",
                "emotion"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "저는 제 쪽 범위를 줄여 말했지만, 결국 확인 전 공개 추정을 되받아친 셈이죠. 그건 부인하기 어렵습니다."
          ],
          "privateKnowledge": [
            "'몇 사람만'이라는 축소가 스스로도 설득력이 약하다는 걸 안다."
          ],
          "suppressions": [
            "방어라는 이름으로 규칙을 깬 점"
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning",
            "neighbor05:b:tell:reverse_question"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-5:threshold:0",
              "factText": "전파 범위를 줄여 말했어도 규칙 위반이라는 본질은 남는다고 인정한다",
              "tags": [
                "threshold",
                "admission"
              ],
              "slots": {
                "quote": {
                  "exact": "몇 사람한테만",
                  "neutral": "좁은 범위"
                },
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "neighbor05:b:d-5:responsibility:0",
              "factText": "확인 전 공개 추정을 되받아친 책임을 인정한다",
              "tags": [
                "responsibility",
                "rule"
              ],
              "slots": {
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "그 약속을 지키려면 제 억울함도 잠깐 삼켜야 했는데, 저는 그걸 못 했습니다. 체면이 너무 앞섰어요."
          ],
          "privateKnowledge": [
            "평판 회복 욕구가 합의 준수보다 컸다."
          ],
          "suppressions": [
            "자존심 때문에 약속을 미뤄둔 점"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-5:emotion:0",
              "factText": "억울함을 잠깐 삼키지 못했다고 인정한다",
              "tags": [
                "emotion",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
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
              "id": "neighbor05:b:d-5:fear:0",
              "factText": "체면과 평판 회복 욕구가 약속 준수보다 앞섰다고 털어놓는다",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "status": {
                  "exact": "층 주민 평판",
                  "neutral": "그 평판"
                }
              },
              "stanceHints": [
                "emotional"
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
            "저도 예전에 합의한 확인 우선 원칙을 알고 있었습니다. 그런데도 배송사 확인 전에 1:1 대화와 층 대화방에서 서윤 씨를 의심하는 말을 퍼뜨렸고, 그 약속을 깼습니다."
          ],
          "privateKnowledge": [
            "자신의 대응이 또 다른 공개 의심이었다는 점을 받아들인다."
          ],
          "suppressions": [
            "없음"
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "neighbor05:b:tell:reputation_shield",
            "neighbor05:b:tell:detail_pruning"
          ],
          "claimAtoms": [
            {
              "id": "neighbor05:b:d-5:admission:1",
              "factText": "확인 우선 원칙을 알고도 확인 전 의심을 퍼뜨렸다고 시인한다",
              "tags": [
                "admission",
                "rule",
                "responsibility"
              ],
              "slots": {
                "rule": {
                  "exact": "배송사 확인 전 공개 의심 금지 약속",
                  "neutral": "그 약속"
                },
                "evidence": {
                  "exact": "e-6 과거 약속 대화",
                  "neutral": "그 약속 자료"
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
              "id": "neighbor05:b:d-5:harm:1",
              "factText": "그 대응이 약속을 무너뜨리고 분쟁을 더 키웠다고 인정한다",
              "tags": [
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "오서윤",
                  "neutral": "상대방",
                  "fullName": "오서윤",
                  "judgeRef": "서윤 씨"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        }
      }
    }
  }
}


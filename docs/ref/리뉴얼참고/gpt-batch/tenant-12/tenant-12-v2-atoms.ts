export const tenant12V2Atoms = {
  "caseId": "tenant-12",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "경수 씨가 저를 아예 문제 세입자처럼 돌린 걸로 들렸습니다."
          ],
          "privateKnowledge": [
            "제가 직접 경수 씨 입으로 들은 건 아니고, 이웃 쪽에서 캡처와 말을 거쳐 들었습니다."
          ],
          "suppressions": [
            "경수 씨가 직접 말했다는 장면은 아직 잡히지 않는다는 점은 빼고 말합니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-1:act:0",
              "factText": "소담은 '문제 세입자'라는 말을 집주인 문경수가 직접 퍼뜨린 낙인으로 받아들인다.",
              "tags": [
                "act",
                "identity",
                "denial",
                "quote"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "rumor": {
                  "exact": "문제 세입자",
                  "neutral": "그 낙인"
                },
                "channel": {
                  "exact": "이웃 재전달",
                  "neutral": "그 경로"
                }
              },
              "stanceHints": [
                "deny",
                "assert"
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
            "직접 썼든 아니든 집주인 쪽에서 나온 말이라 저는 그렇게 들을 수밖에 없었습니다."
          ],
          "privateKnowledge": [
            "관리인과 집주인을 같은 선으로 묶어 버리면 제 판단이 더 정당해진다고 느낍니다."
          ],
          "suppressions": [
            "관리인 미령의 발언과 이웃 재전달 사이를 아직 분리하지 못했다는 점을 감춥니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-1:quote:1",
              "factText": "소담은 발신자가 문경수 본인이 아니어도 '집주인 쪽 말'이면 같은 책임이라고 밀어붙인다.",
              "tags": [
                "quote",
                "context",
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "institution": {
                  "exact": "집주인 쪽 전달",
                  "neutral": "그쪽 설명"
                },
                "channel": {
                  "exact": "관리실과 이웃 사이 대화",
                  "neutral": "그 대화 경로"
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
            "처음 말이 미령 씨 쪽이었다고 해도, 결국 관리실 라인에서 퍼진 건 맞다고 봤습니다."
          ],
          "privateKnowledge": [
            "잘린 캡처보다 전체 맥락을 보면 제가 단정한 부분이 있다는 걸 어렴풋이 압니다."
          ],
          "suppressions": [
            "초기 사이드챗이 냄새 질문을 달래는 맥락이었다는 점은 축소합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-1:context:2",
              "factText": "소담은 소문의 직접 발화자가 조미령일 수 있음을 인정하지만, 관리실 전체 책임으로 묶는다.",
              "tags": [
                "context",
                "identity",
                "uncertainty",
                "institution"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "quote": {
                  "exact": "4층 분 건은 제가 조용히 보고 있다",
                  "neutral": "그 말"
                },
                "channel": {
                  "exact": "관리실 라인",
                  "neutral": "그 경로"
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
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "경수 씨가 직접 퍼뜨렸다고 딱 잘라 말하긴 어려워도, 집주인 책임에서 빠질 수는 없다고 봅니다."
          ],
          "privateKnowledge": [
            "제가 '직접 봤다'가 아니라 '그렇게 믿었다'는 쪽으로 표현을 바꿔야 덜 틀린다는 걸 압니다."
          ],
          "suppressions": [
            "두 차례 재전달 뒤에야 '문제 세입자' 표현이 굳었다는 시간표는 먼저 꺼내지 않습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-1:responsibility:3",
              "factText": "소담은 직접 비방 정황은 약하다고 물러서면서도 최종 책임을 문경수에게 집중시킨다.",
              "tags": [
                "responsibility",
                "context",
                "counter",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "timeline": {
                  "exact": "재전달 두 단계 뒤",
                  "neutral": "그 흐름",
                  "period": "소문 확산 중간"
                },
                "rumor": {
                  "exact": "문제 세입자",
                  "neutral": "그 표현"
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
            "저는 그 시선이 너무 무서워서, 관리인 말이든 집주인 말이든 전부 저를 찍어놓은 걸로 받아들였습니다."
          ],
          "privateKnowledge": [
            "다음 계약과 이웃 시선이 흔들릴까 봐 출처보다 낙인의 강도를 먼저 붙잡았습니다."
          ],
          "suppressions": [
            "캡처를 받자마자 공포가 분노로 바뀌며 사실 확인보다 반응이 앞섰다는 점은 끝까지 버팁니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-1:emotion:4",
              "factText": "소담은 이웃 시선과 재계약 불안을 이유로 출처를 하나로 단정해 버린 감정적 배경을 드러낸다.",
              "tags": [
                "emotion",
                "fear",
                "identity",
                "context"
              ],
              "slots": {
                "fear": {
                  "exact": "문제 세입자 취급",
                  "neutral": "그 낙인"
                },
                "person": {
                  "exact": "이웃들",
                  "neutral": "주변 사람들",
                  "fullName": "이웃들",
                  "judgeRef": "이웃들"
                },
                "time": {
                  "exact": "공개 반박 직전",
                  "neutral": "그때",
                  "period": "캡처 확인 직후"
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
            "경수 씨가 직접 퍼뜨렸다고 단정한 건 과했습니다. 다만 정정을 늦춰서 그 낙인이 굳어진 건 맞습니다."
          ],
          "privateKnowledge": [
            "처음 화살을 잘못 겨눴다는 걸 인정해야 제 공개 반박도 설명할 수 있습니다."
          ],
          "suppressions": [
            "제가 문경수 개인의 직접 비방과 관리실의 방관을 오래 섞어 말해 왔다는 점은 최소화합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-1:admission:5",
              "factText": "소담은 직접 비방 단정은 거두지만, 정정 지연으로 낙인이 굳었다는 핵심 책임은 남긴다.",
              "tags": [
                "admission",
                "responsibility",
                "quote",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "rumor": {
                  "exact": "문제 세입자",
                  "neutral": "그 낙인"
                },
                "timeline": {
                  "exact": "정정 지연 기간",
                  "neutral": "그 기간",
                  "period": "소문 확산 뒤"
                }
              },
              "stanceHints": [
                "confess",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach",
                "evidence_present"
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
            "'조용히 보고 있다'는 말은 누가 들어도 저를 문제 인물처럼 찍어 둔 표현이었습니다."
          ],
          "privateKnowledge": [
            "저는 그 문장을 들은 순간 이미 낙인으로 해석할 준비가 돼 있었습니다."
          ],
          "suppressions": [
            "원문 앞에 냄새 질문을 잠재우는 맥락이 있었다는 점은 처음부터 작게 봅니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-2:act:0",
              "factText": "소담은 미령의 '조용히 보고 있다'는 표현을 사실상 문제 인물 낙인으로 받아들인다.",
              "tags": [
                "act",
                "quote",
                "identity",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "quote": {
                  "exact": "4층 분 건은 제가 조용히 보고 있다",
                  "neutral": "그 문장"
                }
              },
              "stanceHints": [
                "assert",
                "counter"
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
            "민원을 달래려는 말이었다고 해도, 표현 자체가 저를 지켜본다는 쪽으로 들렸습니다."
          ],
          "privateKnowledge": [
            "취지와 별개로 들린 느낌을 내세우면 제 해석이 틀렸다고만 보이지 않습니다."
          ],
          "suppressions": [
            "미령이 상습 문제라고 직접 말한 적은 없다는 점은 아직 강조하지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-2:quote:1",
              "factText": "소담은 미령의 취지와 별개로 표현 자체가 감시와 낙인으로 들렸다고 주장한다.",
              "tags": [
                "quote",
                "emotion",
                "context",
                "uncertainty"
              ],
              "slots": {
                "quote": {
                  "exact": "지켜본다",
                  "neutral": "그 뉘앙스"
                },
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "channel": {
                  "exact": "이웃 사이드챗",
                  "neutral": "그 대화"
                }
              },
              "stanceHints": [
                "hedge",
                "counter"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-2",
          "state": "S2",
          "publicClaim": [
            "미령 씨가 곧바로 '상습 문제 세입자'라고 한 건 아닐 수는 있습니다."
          ],
          "privateKnowledge": [
            "잘린 캡처가 제 판단을 한쪽으로 밀었다는 걸 알지만 쉽게 내려놓기 어렵습니다."
          ],
          "suppressions": [
            "전체 맥락을 보면 '먼저 확인하겠다'는 취지가 앞에 있었다는 점을 작게 만듭니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-2:context:2",
              "factText": "소담은 '상습 문제 세입자'라는 직접 낙인은 아니었을 수 있다고 부분 인정한다.",
              "tags": [
                "context",
                "quote",
                "uncertainty",
                "uncertainty"
              ],
              "slots": {
                "quote": {
                  "exact": "상습 문제 세입자",
                  "neutral": "그 직접 표현"
                },
                "record": {
                  "exact": "잘린 캡처",
                  "neutral": "그 캡처"
                },
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
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
            "결국 원래 취지는 민원을 조용히 확인하겠다는 말이었지만, 저를 찍어둔 것처럼 들릴 만큼 모호했습니다."
          ],
          "privateKnowledge": [
            "말의 취지와 전달 효과를 분리해서 말하면 제 감정도 어느 정도 설명됩니다."
          ],
          "suppressions": [
            "제가 이미 문제 세입자 소문에 예민해져 있던 상태였다는 점은 뒤로 미룹니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-2:responsibility:3",
              "factText": "소담은 원래 취지가 조용한 확인이었다는 점과, 전달 효과가 낙인처럼 들렸다는 점을 함께 말한다.",
              "tags": [
                "responsibility",
                "quote",
                "context",
                "counter"
              ],
              "slots": {
                "quote": {
                  "exact": "조용히 확인",
                  "neutral": "그 취지"
                },
                "effect": {
                  "exact": "문제 인물로 찍혔다",
                  "neutral": "그 인상"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
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
            "저는 이미 이웃 시선에 눌려 있어서, 그 말 한 줄이 사실 확인보다 먼저 낙인으로 꽂혔습니다."
          ],
          "privateKnowledge": [
            "문장 하나보다 그 말을 전해 준 이웃의 표정과 분위기가 더 크게 남아 있습니다."
          ],
          "suppressions": [
            "제 해석이 감정에 의해 증폭됐다는 말은 끝까지 조심스럽게만 꺼냅니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-2:emotion:4",
              "factText": "소담은 이웃 시선과 불안 때문에 애매한 문장을 더 강한 낙인으로 받아들였다고 털어놓는다.",
              "tags": [
                "emotion",
                "fear",
                "context",
                "quote"
              ],
              "slots": {
                "person": {
                  "exact": "이웃 세입자",
                  "neutral": "주변 사람",
                  "fullName": "이웃 세입자",
                  "judgeRef": "이웃"
                },
                "quote": {
                  "exact": "조용히 보고 있다",
                  "neutral": "그 한 줄"
                },
                "fear": {
                  "exact": "문제 세입자 낙인",
                  "neutral": "그 낙인"
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
            "미령 씨의 원래 취지는 민원을 조용히 확인하겠다는 말이었고, 그 표현이 너무 모호해서 오해를 키운 겁니다."
          ],
          "privateKnowledge": [
            "이제는 취지 자체보다 그 모호함이 왜 방치됐는지가 더 중요하다고 느낍니다."
          ],
          "suppressions": [
            "제가 그 말을 거의 확정적 낙인처럼 단정해 퍼뜨린 부분은 마지막까지 줄입니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-2:admission:5",
              "factText": "소담은 미령의 원래 취지는 조용한 확인이었으나, 애매한 표현이 오해를 키웠다고 정리한다.",
              "tags": [
                "admission",
                "quote",
                "context",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "quote": {
                  "exact": "4층 분 건은 제가 조용히 보고 있다",
                  "neutral": "그 문장"
                },
                "effect": {
                  "exact": "오해 확대",
                  "neutral": "그 결과"
                }
              },
              "stanceHints": [
                "confess",
                "contextualize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 공개 비난을 한 게 아니라 거짓 소문을 막으려고 정정 글을 올린 겁니다."
          ],
          "privateKnowledge": [
            "단톡방에 올린 표현이 강했다는 건 알지만 먼저 공격받았다는 생각이 앞섭니다."
          ],
          "suppressions": [
            "출처 확인 없이 올렸고 경수와 미령을 같이 지목했다는 점은 뺍니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-3:act:0",
              "factText": "소담은 단톡 공개 글을 공격이 아니라 즉시 정정이라고 규정한다.",
              "tags": [
                "act",
                "self_justification",
                "denial",
                "context"
              ],
              "slots": {
                "channel": {
                  "exact": "건물 단톡방",
                  "neutral": "그 방"
                },
                "act": {
                  "exact": "공개 정정 글",
                  "neutral": "그 글"
                },
                "quote": {
                  "exact": "거짓 소문",
                  "neutral": "그 소문"
                }
              },
              "stanceHints": [
                "deny",
                "self_justify"
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
            "캡처를 올리긴 했지만, 더 퍼지기 전에 막으려면 공개적으로 말할 수밖에 없었습니다."
          ],
          "privateKnowledge": [
            "사실은 공개 반응이 제 억울함을 바로 보여 주는 가장 빠른 방법이었습니다."
          ],
          "suppressions": [
            "공개 전에 1:1로 확인할 선택지가 있었던 건 언급하지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-3:quote:1",
              "factText": "소담은 캡처 공개를 불가피한 즉시 대응이었다고 합리화한다.",
              "tags": [
                "quote",
                "self_justification",
                "counter",
                "privacy"
              ],
              "slots": {
                "record": {
                  "exact": "캡처 여러 장",
                  "neutral": "그 자료"
                },
                "time": {
                  "exact": "캡처 전달 뒤 25분",
                  "neutral": "그 직후",
                  "period": "단톡 게시 직전"
                },
                "channel": {
                  "exact": "공개 단톡",
                  "neutral": "그 공개 채널"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
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
            "감정적으로 올린 건 맞지만, 그때는 제가 먼저 공개 낙인을 당했다고 느꼈습니다."
          ],
          "privateKnowledge": [
            "제가 확인된 사실과 추정을 한 문장에 섞어 썼다는 걸 스스로도 압니다."
          ],
          "suppressions": [
            "'집주인과 관리인이 거짓 소문을 낸다'는 표현이 단정형이었다는 점은 흐립니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-3:context:2",
              "factText": "소담은 공개 반박이 감정적이었다는 점은 인정하지만 선행 낙인에 대한 대응이었다고 본다.",
              "tags": [
                "context",
                "emotion",
                "uncertainty",
                "harm"
              ],
              "slots": {
                "quote": {
                  "exact": "집주인과 관리인이 거짓 소문을 낸다",
                  "neutral": "그 문장"
                },
                "fear": {
                  "exact": "공개 낙인",
                  "neutral": "그 취급"
                },
                "channel": {
                  "exact": "건물 단톡방",
                  "neutral": "그 방"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "출처를 다 확인하기 전에 단톡방에 올린 건 성급했습니다. 다만 그만큼 제가 몰린 상태였어요."
          ],
          "privateKnowledge": [
            "제가 먼저 전화 한 통만 했어도 흐름이 달라졌을 수 있다는 걸 압니다."
          ],
          "suppressions": [
            "캡처를 던지며 다른 입주민의 분노를 끌어낸 효과는 작게 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-3:responsibility:3",
              "factText": "소담은 출처 확인 전 공개 게시가 성급했다는 점을 인정하면서도 압박 상태를 이유로 든다.",
              "tags": [
                "responsibility",
                "admission",
                "context",
                "shame"
              ],
              "slots": {
                "time": {
                  "exact": "사실 확인 전",
                  "neutral": "그 전에",
                  "period": "게시 직전"
                },
                "channel": {
                  "exact": "단톡방 공개 글",
                  "neutral": "그 게시"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "문제 세입자 취급을 받는다는 수치심 때문에, 확인된 사실이랑 제 추정을 한꺼번에 쏟아냈습니다."
          ],
          "privateKnowledge": [
            "단톡에 올리는 순간만큼은 제가 통제권을 되찾는 기분이 들었습니다."
          ],
          "suppressions": [
            "그 글이 다른 세입자들의 판단까지 끌고 갔다는 파급은 애써 덜어 말합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-3:emotion:4",
              "factText": "소담은 수치심과 통제 상실감 때문에 사실과 추정을 섞어 공격적으로 올렸다고 털어놓는다.",
              "tags": [
                "emotion",
                "shame",
                "self_justification",
                "harm"
              ],
              "slots": {
                "fear": {
                  "exact": "문제 세입자 취급",
                  "neutral": "그 취급"
                },
                "act": {
                  "exact": "사실과 추정 혼합",
                  "neutral": "그 방식"
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
            "제가 출처를 끝까지 확인하기 전에 공개 단톡에서 경수 씨와 미령 씨를 비난해 갈등을 키운 건 맞습니다."
          ],
          "privateKnowledge": [
            "정정만 하겠다는 말로는 제 공개 역비난을 더는 숨기기 어렵습니다."
          ],
          "suppressions": [
            "여전히 출발점의 애매한 말이 없었다면 이렇게까지는 안 갔을 거라는 생각은 놓지 않습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-3:admission:5",
              "factText": "소담은 출처 미확인 상태의 공개 비난과 캡처 공유가 갈등 확산에 기여했음을 인정한다.",
              "tags": [
                "admission",
                "responsibility",
                "privacy",
                "harm"
              ],
              "slots": {
                "personA": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "personB": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "channel": {
                  "exact": "건물 단톡방",
                  "neutral": "그 방"
                }
              },
              "stanceHints": [
                "confess",
                "admit_harm"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "실제 생활 불편이라고 할 만한 건 거의 없었습니다."
          ],
          "privateKnowledge": [
            "복도에서 택배와 방문객 응대가 눈에 띈 건 있지만 문제로 불릴 수준은 아니라고 믿고 싶습니다."
          ],
          "suppressions": [
            "짧은 소음 민원과 분리배출 재안내가 있었던 기록은 먼저 말하지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-4:act:0",
              "factText": "소담은 자신의 생활로 인한 실질적 불편이 거의 없었다고 일괄 부인한다.",
              "tags": [
                "act",
                "denial",
                "threshold",
                "context"
              ],
              "slots": {
                "record": {
                  "exact": "생활 불편 기록 없음",
                  "neutral": "그 판단"
                },
                "channel": {
                  "exact": "복도 생활소음",
                  "neutral": "그 불편"
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
            "늦은 택배나 방문객은 누구나 있는 수준이었고, 그걸 문제 세입자 근거로 삼을 정도는 아니었습니다."
          ],
          "privateKnowledge": [
            "생활 패턴이 눈에 띄는 편이라는 건 알지만 그게 낙인으로 연결되는 건 억울합니다."
          ],
          "suppressions": [
            "이웃이 불편을 느낄 만한 순간이 몇 번 있었다는 점은 일반화로 덮습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-4:quote:1",
              "factText": "소담은 늦은 택배와 방문객 응대를 일상적 수준으로 축소해 말한다.",
              "tags": [
                "quote",
                "threshold",
                "context",
                "counter"
              ],
              "slots": {
                "issue": {
                  "exact": "늦은 택배와 방문객",
                  "neutral": "그 생활 패턴"
                },
                "rumor": {
                  "exact": "문제 세입자 근거",
                  "neutral": "그 근거"
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
            "복도 대화가 조금 길어진 적이랑 분리배출 재안내를 받은 적은 있습니다."
          ],
          "privateKnowledge": [
            "민원대장을 보면 제가 완전히 '아무 일도 없었다'고 하긴 어렵다는 걸 압니다."
          ],
          "suppressions": [
            "불편 횟수가 한 달 세 건뿐이라는 점을 당장 제가 먼저 꺼내진 않습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-4:context:2",
              "factText": "소담은 짧은 복도 대화와 분리배출 재안내 정도의 경미한 불편은 있었다고 인정한다.",
              "tags": [
                "context",
                "threshold",
                "uncertainty",
                "timeline"
              ],
              "slots": {
                "record": {
                  "exact": "민원 세 건",
                  "neutral": "그 기록"
                },
                "issue": {
                  "exact": "짧은 복도 대화와 분리배출 재안내",
                  "neutral": "그 정도 불편"
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
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "불편이 전혀 없진 않았지만, 상습 소음이나 악취 같은 수준으로 몰릴 일은 아니었습니다."
          ],
          "privateKnowledge": [
            "제가 인정하는 선을 '한두 번'으로 붙들어야 낙인과 분리할 수 있다고 느낍니다."
          ],
          "suppressions": [
            "복도에서 눈에 띄는 생활 동선이 계속 쌓였다는 이웃 체감은 작게 봅니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-4:responsibility:3",
              "factText": "소담은 경미한 생활 불편과 상습 문제 세입자 수준을 분리해 주장한다.",
              "tags": [
                "responsibility",
                "threshold",
                "counter",
                "context"
              ],
              "slots": {
                "minor": {
                  "exact": "한두 번 불편",
                  "neutral": "그 정도"
                },
                "major": {
                  "exact": "상습 소음·악취·무단투숙",
                  "neutral": "그 수준"
                }
              },
              "stanceHints": [
                "partial",
                "counter"
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
            "제 생활 패턴이 복도에서 좀 눈에 띄는 건 알면서도, 그걸 대수롭지 않게 넘긴 건 있습니다."
          ],
          "privateKnowledge": [
            "그 사소한 장면들이 누군가에겐 불편으로 남을 수 있다는 걸 뒤늦게 인정합니다."
          ],
          "suppressions": [
            "그래도 기록상 큰 문제는 아니라는 방어선은 끝까지 유지합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-4:emotion:4",
              "factText": "소담은 자신의 생활 동선이 타인 눈에 띄는 편이었다는 점과 무심함을 인정한다.",
              "tags": [
                "emotion",
                "shame",
                "context",
                "threshold"
              ],
              "slots": {
                "issue": {
                  "exact": "늦은 방문객 응대와 문 앞 동선",
                  "neutral": "그 생활 동선"
                },
                "location": {
                  "exact": "복도",
                  "neutral": "그 공간"
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
            "한두 차례 생활 불편은 있었지만, 그걸 소문과 섞어 상습 문제처럼 본 건 과했습니다."
          ],
          "privateKnowledge": [
            "저도 생활 불편과 낙인 문제를 분리해서 봐야 했다는 걸 인정해야 합니다."
          ],
          "suppressions": [
            "처음부터 이렇게 나눠 말했으면 덜 몰렸을 거라는 아쉬움은 남깁니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-4:admission:5",
              "factText": "소담은 실제 경미한 생활 불편은 인정하되, 그것이 상습 문제 낙인으로 번진 건 과장이라고 정리한다.",
              "tags": [
                "admission",
                "threshold",
                "harm",
                "context"
              ],
              "slots": {
                "minor": {
                  "exact": "한두 차례 생활 불편",
                  "neutral": "그 정도"
                },
                "major": {
                  "exact": "상습 문제 세입자",
                  "neutral": "그 낙인"
                }
              },
              "stanceHints": [
                "confess",
                "contextualize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "경수 씨는 소문이 돈다는 걸 알고도 사실상 가만히 있었습니다."
          ],
          "privateKnowledge": [
            "직접 만든 소문이 아니더라도, 집주인이 바로 선을 그어 주길 바랐습니다."
          ],
          "suppressions": [
            "그가 상황을 '오해쯤'으로 본 가능성은 고려하지 않고 말합니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-5:act:0",
              "factText": "소담은 문경수가 소문 확산을 알고도 사실상 방치했다고 본다.",
              "tags": [
                "act",
                "responsibility",
                "counter",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "act": {
                  "exact": "정정 없이 방치",
                  "neutral": "그 대응"
                },
                "timeline": {
                  "exact": "소문 확산 직후",
                  "neutral": "그때",
                  "period": "정정 지연 시점"
                }
              },
              "stanceHints": [
                "assert",
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
            "바로 정정만 했어도 제 인상이 그렇게 굳어지지는 않았을 겁니다."
          ],
          "privateKnowledge": [
            "저는 발화자보다도 '왜 아무도 바로 막지 않았나'를 더 크게 기억합니다."
          ],
          "suppressions": [
            "경수가 실제로는 상황 파악을 더디게 했을 수 있다는 점은 언급하지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-5:quote:1",
              "factText": "소담은 즉시 정정이 있었다면 낙인이 굳지 않았을 것이라고 강조한다.",
              "tags": [
                "quote",
                "responsibility",
                "harm",
                "timeline"
              ],
              "slots": {
                "act": {
                  "exact": "바로 정정",
                  "neutral": "그 조치"
                },
                "effect": {
                  "exact": "인상 고착",
                  "neutral": "그 결과"
                }
              },
              "stanceHints": [
                "counter",
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
          "disputeId": "d-5",
          "state": "S2",
          "publicClaim": [
            "직접 만든 소문은 아닐 수 있어도, 방관 책임은 분명히 경수 씨 쪽에 있습니다."
          ],
          "privateKnowledge": [
            "제가 d-1에서 단정한 부분을 조금 접으려면 d-5 책임을 더 또렷하게 붙들어야 합니다."
          ],
          "suppressions": [
            "정정 지연이 관리인에게 맡겨 둔 판단에서 비롯됐다는 구조는 당장 세밀하게 말하지 않습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-5:context:2",
              "factText": "소담은 직접 유포와 방관 책임을 분리해, 후자에 대한 문경수 책임을 선명하게 지목한다.",
              "tags": [
                "context",
                "responsibility",
                "uncertainty",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "act": {
                  "exact": "정정 지연과 방관",
                  "neutral": "그 책임"
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "경수 씨는 관리인 뒤에 숨어 전달 과정만 탓했고, 본인이 나서서 선을 긋지 않았습니다."
          ],
          "privateKnowledge": [
            "제가 제일 화가 난 건 누가 먼저 말했느냐보다, 집주인이 끝까지 앞에 안 나왔다는 점입니다."
          ],
          "suppressions": [
            "그 역시 건물 이미지가 흔들릴까 망설였을 거라는 추정은 아직 인정하지 않습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-5:responsibility:3",
              "factText": "소담은 문경수가 전달 과정 뒤로 물러나며 자신의 정정 책임을 회피했다고 본다.",
              "tags": [
                "responsibility",
                "institution",
                "counter",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "person2": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "act": {
                  "exact": "관리인 뒤로 숨음",
                  "neutral": "그 태도"
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
            "저는 매일 이웃 눈치를 보는데도 집주인 쪽에서는 아무도 분명하게 아니라고 말해 주지 않았습니다."
          ],
          "privateKnowledge": [
            "정정이 늦는 하루하루가 제겐 생활 전체를 의심받는 시간처럼 느껴졌습니다."
          ],
          "suppressions": [
            "제가 공개 반박으로 그 시간을 더 요란하게 만들었다는 점은 이 순간에도 덜어 냅니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-5:emotion:4",
              "factText": "소담은 정정 부재가 자신의 일상 평판을 계속 흔들었다는 감정적 상처를 드러낸다.",
              "tags": [
                "emotion",
                "fear",
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이웃들",
                  "neutral": "주변 사람들",
                  "fullName": "이웃들",
                  "judgeRef": "이웃"
                },
                "act": {
                  "exact": "분명한 정정 부재",
                  "neutral": "그 침묵"
                },
                "time": {
                  "exact": "하루하루",
                  "neutral": "그 시간",
                  "period": "소문 이후"
                }
              },
              "stanceHints": [
                "emotional",
                "blame"
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
            "경수 씨가 소문을 직접 만들진 않았어도, 정정을 늦춰서 제 인상을 굳힌 책임은 있습니다."
          ],
          "privateKnowledge": [
            "이제는 출발점보다 정정 실패를 더 정확히 짚는 편이 제 주장에도 맞습니다."
          ],
          "suppressions": [
            "저 역시 그 지연 사이 공개 단톡으로 사태를 키운 점은 여기선 최소화합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:a:tell:sender_fixation",
            "tenant12:a:tell:screenshot_burst",
            "tenant12:a:tell:heated_overlap"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:a:d-5:admission:5",
              "factText": "소담은 문경수의 직접 유포는 부정하되, 정정 지연과 방관 책임은 분명하다고 최종 정리한다.",
              "tags": [
                "admission",
                "responsibility",
                "harm",
                "timeline"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "상대",
                  "fullName": "문경수",
                  "judgeRef": "집주인"
                },
                "act": {
                  "exact": "정정 지연",
                  "neutral": "그 대응"
                },
                "effect": {
                  "exact": "인상 고착",
                  "neutral": "그 결과"
                }
              },
              "stanceHints": [
                "confess",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "제가 소담 씨를 문제 세입자라고 퍼뜨린 적은 없습니다."
          ],
          "privateKnowledge": [
            "소문이 커졌다는 말은 들었지만, 제 직접 발화가 아니라는 점만 붙잡고 싶습니다."
          ],
          "suppressions": [
            "관리인 말이 오해를 만들 수 있었고 제 관리 범위라는 점은 뒤로 뺍니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-1:act:0",
              "factText": "문경수는 자신이 직접 '문제 세입자'라는 말을 퍼뜨린 적은 없다고 단호히 부인한다.",
              "tags": [
                "act",
                "denial",
                "quote",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "quote": {
                  "exact": "문제 세입자",
                  "neutral": "그 표현"
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
            "민원 확인은 관리인에게 맡겼을 뿐이고, 특정 세대를 찍어 말하라고 한 적도 없습니다."
          ],
          "privateKnowledge": [
            "관리 위임을 말하면 적어도 직접 비방 책임에서는 멀어질 수 있다고 생각합니다."
          ],
          "suppressions": [
            "관리인에게 '조용히 처리하라'고 한 문자가 애매한 표현을 고착시킨 부분은 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-1:quote:1",
              "factText": "문경수는 관리 위임과 직접 비방 부재를 내세워 자신의 행위를 분리한다.",
              "tags": [
                "quote",
                "institution",
                "counter",
                "rule"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "act": {
                  "exact": "민원 확인 위임",
                  "neutral": "그 처리 방식"
                },
                "quote": {
                  "exact": "특정 세대 지목 없음",
                  "neutral": "그 선"
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
            "미령 씨 말이 돌아다니면서 그렇게 들렸을 수는 있습니다."
          ],
          "privateKnowledge": [
            "직접 퍼뜨리지는 않았어도 제 관리선에서 나온 말이었단 건 피하기 어렵다고 압니다."
          ],
          "suppressions": [
            "처음 오해를 알게 된 뒤에도 바로 공지하지 않은 점은 아직 말하지 않습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-1:context:2",
              "factText": "문경수는 직접 비방은 아니지만 관리인 발언이 재전달되며 그렇게 들렸을 수 있다고 인정한다.",
              "tags": [
                "context",
                "institution",
                "uncertainty",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "quote": {
                  "exact": "4층 분 건은 제가 조용히 보고 있다",
                  "neutral": "그 말"
                },
                "channel": {
                  "exact": "재전달 과정",
                  "neutral": "그 흐름"
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
            "제가 직접 말한 건 아니지만, 제 관리 체계 안에서 그런 오해가 나왔다는 책임까지는 피하기 어렵습니다."
          ],
          "privateKnowledge": [
            "발화와 관리 책임을 분리해도 결국 후자는 남는다는 걸 알고 있습니다."
          ],
          "suppressions": [
            "이 단계에서도 여전히 정정 지연 책임과는 분리해 말하고 싶어 합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-1:responsibility:3",
              "factText": "문경수는 직접 비방 부재를 유지하면서도 관리 책임의 일부는 수긍한다.",
              "tags": [
                "responsibility",
                "institution",
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "저",
                  "fullName": "문경수",
                  "judgeRef": "본인"
                },
                "institution": {
                  "exact": "관리 체계 안의 오해",
                  "neutral": "그 구조"
                }
              },
              "stanceHints": [
                "partial",
                "admit_responsibility"
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
            "낙인처럼 번진 걸 빨리 막지 못해 저도 당황스러웠습니다."
          ],
          "privateKnowledge": [
            "건물 이미지가 흔들릴까 판단을 미루는 동안 소담 씨가 더 몰렸다는 걸 이제는 봅니다."
          ],
          "suppressions": [
            "당황보다 체면 관리가 더 컸다는 동기는 완전히는 드러내지 않습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-1:emotion:4",
              "factText": "문경수는 소문이 낙인처럼 번진 상황을 제때 막지 못한 당혹감과 부담을 비친다.",
              "tags": [
                "emotion",
                "fear",
                "harm",
                "responsibility"
              ],
              "slots": {
                "quote": {
                  "exact": "낙인처럼 번짐",
                  "neutral": "그 결과"
                },
                "fear": {
                  "exact": "건물 평판 흔들림",
                  "neutral": "그 부담"
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
            "제가 직접 퍼뜨리진 않았지만, 제 관리선에서 나온 오해를 빨리 바로잡지 못한 책임은 있습니다."
          ],
          "privateKnowledge": [
            "이제는 '직접 안 했다'만으로는 다 설명되지 않는다는 걸 인정합니다."
          ],
          "suppressions": [
            "소담 씨의 공개 반박이 저를 더 몰아세웠다는 서운함은 여기선 줄입니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-1:admission:5",
              "factText": "문경수는 직접 유포는 부인하되, 자신의 관리선에서 나온 오해를 바로잡지 못한 책임을 인정한다.",
              "tags": [
                "admission",
                "responsibility",
                "institution",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "문경수",
                  "neutral": "저",
                  "fullName": "문경수",
                  "judgeRef": "본인"
                },
                "act": {
                  "exact": "빠른 정정 실패",
                  "neutral": "그 대응"
                },
                "quote": {
                  "exact": "문제 세입자 오해",
                  "neutral": "그 오해"
                }
              },
              "stanceHints": [
                "confess",
                "admit_responsibility"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "미령 씨 말은 그냥 민원을 조용히 확인하겠다는 취지였습니다."
          ],
          "privateKnowledge": [
            "그 표현이 거칠게 들릴 수 있다는 생각은 있지만, 취지 자체만 붙들고 싶습니다."
          ],
          "suppressions": [
            "문장 자체가 너무 모호해서 오해를 부를 수 있었다는 점은 뒤로 미룹니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-2:act:0",
              "factText": "문경수는 미령의 발언을 민원 확인 취지였다고 단순화해 설명한다.",
              "tags": [
                "act",
                "quote",
                "denial",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "quote": {
                  "exact": "조용히 확인",
                  "neutral": "그 취지"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
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
            "다른 뜻은 없었고, 주변에서 과하게 받아들인 겁니다."
          ],
          "privateKnowledge": [
            "취지와 결과를 분리하면 관리실 표현 문제를 제일 늦게 인정해도 된다고 생각합니다."
          ],
          "suppressions": [
            "옆집을 달래는 맥락 자체가 특정 세대를 암시하는 효과를 냈다는 점을 감춥니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-2:quote:1",
              "factText": "문경수는 의미 왜곡 책임을 주변의 과잉 해석으로 돌린다.",
              "tags": [
                "quote",
                "counter",
                "institution",
                "uncertainty"
              ],
              "slots": {
                "quote": {
                  "exact": "과하게 받아들임",
                  "neutral": "그 해석"
                },
                "channel": {
                  "exact": "이웃 재전달",
                  "neutral": "그 경로"
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
            "표현이 애매했다는 점은 인정합니다."
          ],
          "privateKnowledge": [
            "음성메모 원문을 들으면 '조용히 보고 있다'가 감시처럼 들릴 수 있다는 걸 압니다."
          ],
          "suppressions": [
            "애매하다는 말 뒤에 바로 '그래도 낙인은 아니었다'는 방어를 붙이고 싶어 합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-2:context:2",
              "factText": "문경수는 미령의 표현이 애매했다는 핵심 문제를 처음 인정한다.",
              "tags": [
                "context",
                "quote",
                "uncertainty",
                "admission"
              ],
              "slots": {
                "quote": {
                  "exact": "4층 분 건은 제가 조용히 보고 있다",
                  "neutral": "그 표현"
                },
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                }
              },
              "stanceHints": [
                "partial",
                "admit_issue"
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
            "민원을 달래려다 특정 세대를 지켜본다는 인상까지 준 건 사실입니다."
          ],
          "privateKnowledge": [
            "취지는 선했어도 표현이 낙인처럼 작동했다는 걸 부정하기 어려워집니다."
          ],
          "suppressions": [
            "제가 그 표현을 나중에 알고도 별다른 수정 지시를 안 한 점은 아직 아낍니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-2:responsibility:3",
              "factText": "문경수는 달래기용 발언이 특정 세대 감시 인상까지 준 효과를 인정한다.",
              "tags": [
                "responsibility",
                "quote",
                "context",
                "harm"
              ],
              "slots": {
                "quote": {
                  "exact": "지켜본다는 인상",
                  "neutral": "그 인상"
                },
                "channel": {
                  "exact": "옆집 달래기 대화",
                  "neutral": "그 장면"
                }
              },
              "stanceHints": [
                "partial",
                "admit_effect"
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
            "공개 낙인처럼 들릴 수 있다는 걸 제가 너무 늦게 봤습니다."
          ],
          "privateKnowledge": [
            "건물주인 제가 먼저 '그런 뜻 아니다'라고 잘랐어야 했다는 생각이 듭니다."
          ],
          "suppressions": [
            "체면 때문에 바로 인정하지 못했다는 감정은 최대한 눌러 담습니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-2:emotion:4",
              "factText": "문경수는 해당 표현이 공개 낙인처럼 들릴 수 있다는 점을 뒤늦게 깨달았다고 털어놓는다.",
              "tags": [
                "emotion",
                "fear",
                "quote",
                "responsibility"
              ],
              "slots": {
                "quote": {
                  "exact": "공개 낙인처럼 들림",
                  "neutral": "그 인상"
                },
                "person": {
                  "exact": "문경수",
                  "neutral": "저",
                  "fullName": "문경수",
                  "judgeRef": "본인"
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
            "원래 취지는 조용한 확인이었지만, 표현이 지나치게 모호했고 제가 바로잡지도 못했습니다."
          ],
          "privateKnowledge": [
            "미령 말의 취지와 제 사후 대응을 한꺼번에 인정해야 전체 그림이 맞습니다."
          ],
          "suppressions": [
            "그래도 처음 의도가 악의적 비방은 아니었다는 점은 마지막까지 붙듭니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-2:admission:5",
              "factText": "문경수는 원래 취지, 표현의 모호함, 그리고 자신이 바로잡지 못한 책임을 함께 인정한다.",
              "tags": [
                "admission",
                "quote",
                "responsibility",
                "context"
              ],
              "slots": {
                "quote": {
                  "exact": "조용한 확인",
                  "neutral": "그 취지"
                },
                "issue": {
                  "exact": "표현의 모호함",
                  "neutral": "그 문제"
                },
                "act": {
                  "exact": "사후 정정 실패",
                  "neutral": "그 대응"
                }
              },
              "stanceHints": [
                "confess",
                "admit_responsibility"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "소담 씨가 공개 단톡으로 일을 키운 건 분명합니다."
          ],
          "privateKnowledge": [
            "적어도 이 쟁점에서는 제가 방어보다 반격을 하는 편이 유리하다고 느낍니다."
          ],
          "suppressions": [
            "그 공개 글의 배경에 제 늦은 대응이 있었다는 점은 처음엔 빼고 말합니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-3:act:0",
              "factText": "문경수는 공개 단톡 게시가 갈등을 키운 핵심 계기라고 본다.",
              "tags": [
                "act",
                "counter",
                "harm",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "channel": {
                  "exact": "건물 단톡방",
                  "neutral": "그 방"
                },
                "act": {
                  "exact": "공개 반박 글",
                  "neutral": "그 게시"
                }
              },
              "stanceHints": [
                "assert",
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "확인도 없이 집주인과 관리인을 거짓말쟁이로 몰아붙였으니 다른 세입자들이 더 흥분한 겁니다."
          ],
          "privateKnowledge": [
            "소담 씨의 과한 표현을 내세우면 제 책임이 뒤로 밀립니다."
          ],
          "suppressions": [
            "제가 먼저 '아니다'라고 정리했어야 할 타이밍을 놓친 건 말하지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-3:quote:1",
              "factText": "문경수는 소담의 미확인 공개 비난이 다른 세입자 반응까지 자극했다고 주장한다.",
              "tags": [
                "quote",
                "counter",
                "privacy",
                "harm"
              ],
              "slots": {
                "quote": {
                  "exact": "집주인과 관리인이 거짓말을 한다",
                  "neutral": "그 문장"
                },
                "person": {
                  "exact": "이소담",
                  "neutral": "상대",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                }
              },
              "stanceHints": [
                "counter",
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
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "억울했겠지만 공개 반박은 과했습니다."
          ],
          "privateKnowledge": [
            "정정이 늦은 제 책임을 생각하면 '과했다'는 말 뒤에 다른 문장이 붙어야 한다는 걸 압니다."
          ],
          "suppressions": [
            "공개 전에 사실 확인이 어려울 정도로 이미 분위기가 나빠졌다는 배경은 축소합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-3:context:2",
              "factText": "문경수는 소담의 억울함은 일부 인정하면서도 공개 반박의 과도함을 강조한다.",
              "tags": [
                "context",
                "counter",
                "uncertainty",
                "harm"
              ],
              "slots": {
                "act": {
                  "exact": "공개 반박",
                  "neutral": "그 대응"
                },
                "emotion": {
                  "exact": "억울함",
                  "neutral": "그 감정"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-3",
          "state": "S3",
          "publicClaim": [
            "제 정정이 늦었던 탓에 그런 공개 반응을 부추긴 면도 있습니다."
          ],
          "privateKnowledge": [
            "이 쟁점을 끝까지 소담 책임만으로 밀면 d-5와 모순된다는 걸 압니다."
          ],
          "suppressions": [
            "그래도 단톡 게시의 직접적 파급은 여전히 소담 쪽 책임으로 크게 남기고 싶습니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-3:responsibility:3",
              "factText": "문경수는 자신의 정정 지연이 소담의 공개 반응을 부추긴 점을 인정한다.",
              "tags": [
                "responsibility",
                "admission",
                "context",
                "harm"
              ],
              "slots": {
                "act": {
                  "exact": "정정 지연",
                  "neutral": "그 대응"
                },
                "effect": {
                  "exact": "공개 반응 촉발",
                  "neutral": "그 결과"
                }
              },
              "stanceHints": [
                "partial",
                "admit_responsibility"
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
            "그 글이 올라온 뒤 건물 분위기가 확 무너졌고, 저도 그때 일이 돌아갈 수 없게 됐다고 느꼈습니다."
          ],
          "privateKnowledge": [
            "체면도 있었지만, 건물주로서 통제력을 잃었다는 감정이 크게 남아 있습니다."
          ],
          "suppressions": [
            "그 전부터 이미 소문이 굳어 있었던 시간대는 여기선 덜 강조합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-3:emotion:4",
              "factText": "문경수는 공개 단톡 글 이후 건물 분위기가 무너졌다는 체감과 통제 상실감을 드러낸다.",
              "tags": [
                "emotion",
                "fear",
                "harm",
                "context"
              ],
              "slots": {
                "channel": {
                  "exact": "건물 단톡방",
                  "neutral": "그 방"
                },
                "effect": {
                  "exact": "건물 분위기 붕괴",
                  "neutral": "그 파장"
                }
              },
              "stanceHints": [
                "emotional",
                "blame"
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
            "소담 씨의 공개 비난이 갈등을 키운 건 맞지만, 그 배경에는 제가 늦게 움직인 책임도 있었습니다."
          ],
          "privateKnowledge": [
            "이제는 상대의 과잉 대응과 제 지연을 같이 인정하는 편이 모순이 적습니다."
          ],
          "suppressions": [
            "그래도 공개 글의 수위가 너무 높았다는 불만은 남겨 둡니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-3:admission:5",
              "factText": "문경수는 소담의 공개 비난과 자신의 늦은 대응이 함께 갈등을 키웠다고 최종 정리한다.",
              "tags": [
                "admission",
                "harm",
                "responsibility",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "이소담",
                  "neutral": "상대",
                  "fullName": "이소담",
                  "judgeRef": "소담 씨"
                },
                "channel": {
                  "exact": "건물 단톡방",
                  "neutral": "그 방"
                },
                "act": {
                  "exact": "늦은 대응",
                  "neutral": "그 대응"
                }
              },
              "stanceHints": [
                "confess",
                "contextualize"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "생활 불편이 한두 번이 아니었습니다."
          ],
          "privateKnowledge": [
            "기록보다 체감 민원이 먼저 쌓였다는 인상을 아직 붙들고 싶습니다."
          ],
          "suppressions": [
            "전산 기록상 큰 민원 누적이 없다는 점은 내놓지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-4:act:0",
              "factText": "문경수는 소담 관련 생활 불편이 반복적이었다고 크게 말한다.",
              "tags": [
                "act",
                "threshold",
                "counter",
                "denial"
              ],
              "slots": {
                "issue": {
                  "exact": "반복 생활 불편",
                  "neutral": "그 문제"
                },
                "record": {
                  "exact": "체감 민원",
                  "neutral": "그 이야기"
                }
              },
              "stanceHints": [
                "deny",
                "exaggerate"
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
            "늦은 방문객과 분리배출 문제로 계속 이야기가 나왔습니다."
          ],
          "privateKnowledge": [
            "몇 건 안 되는 기록을 '계속'으로 부풀리고 있다는 걸 완전히 모르는 건 아닙니다."
          ],
          "suppressions": [
            "민원대장이 세 건에 그친다는 수치는 먼저 말하지 않습니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-4:quote:1",
              "factText": "문경수는 늦은 방문객과 분리배출 문제를 지속적 불편처럼 부풀려 말한다.",
              "tags": [
                "quote",
                "threshold",
                "counter",
                "timeline"
              ],
              "slots": {
                "issue": {
                  "exact": "늦은 방문객과 분리배출 문제",
                  "neutral": "그 문제"
                },
                "timeline": {
                  "exact": "계속",
                  "neutral": "그동안",
                  "period": "한 달 사이"
                }
              },
              "stanceHints": [
                "hedge",
                "exaggerate"
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
            "기록상 큰 민원이 누적된 건 아니지만 불편 호소가 있었던 건 맞습니다."
          ],
          "privateKnowledge": [
            "민원대장을 보면 상습 문제라고까지 말하긴 어렵다는 걸 인정해야 합니다."
          ],
          "suppressions": [
            "다른 세입자들의 불편감이 사실 기록보다 제 판단에 더 큰 영향을 줬다는 점은 아직 감춥니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-4:context:2",
              "factText": "문경수는 공식 기록상 큰 누적은 없지만 불편 호소는 있었다고 한발 물러선다.",
              "tags": [
                "context",
                "threshold",
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "record": {
                  "exact": "민원대장 세 건",
                  "neutral": "그 공식 기록"
                },
                "issue": {
                  "exact": "불편 호소",
                  "neutral": "그 이야기"
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
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "상습 문제라고 볼 정도는 아니었습니다."
          ],
          "privateKnowledge": [
            "이 단계에 오면 제가 '문제 세입자 인상'을 생활기록보다 앞세웠다는 걸 피하기 어렵습니다."
          ],
          "suppressions": [
            "건물 이미지 관리 때문에 체감 불편을 더 크게 말한 부분은 아직 최소화합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-4:responsibility:3",
              "factText": "문경수는 소담의 생활 문제가 상습 문제 세입자 수준은 아니었다고 인정한다.",
              "tags": [
                "responsibility",
                "threshold",
                "admission",
                "context"
              ],
              "slots": {
                "major": {
                  "exact": "상습 문제 수준",
                  "neutral": "그 수준"
                },
                "minor": {
                  "exact": "경미한 생활 불편",
                  "neutral": "그 정도"
                }
              },
              "stanceHints": [
                "partial",
                "admit_issue"
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
            "다른 세입자 민원에 제가 과민하게 반응해서 체감이 실제보다 커진 면이 있습니다."
          ],
          "privateKnowledge": [
            "건물 평판을 지키려는 마음이 소담 씨를 더 문제 인물처럼 보이게 만들었습니다."
          ],
          "suppressions": [
            "그 과민 반응이 소문 정정 지연과도 이어졌다는 연결은 아직 약하게만 말합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-4:emotion:4",
              "factText": "문경수는 다른 세입자 민원과 건물 평판 걱정이 자신의 체감을 부풀렸다고 털어놓는다.",
              "tags": [
                "emotion",
                "fear",
                "threshold",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "다른 세입자들",
                  "neutral": "주변 사람들",
                  "fullName": "다른 세입자들",
                  "judgeRef": "세입자들"
                },
                "fear": {
                  "exact": "건물 평판 관리",
                  "neutral": "그 부담"
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
            "실제 생활 불편은 제한적이었고, 제가 그 이상으로 인상을 키운 부분이 있습니다."
          ],
          "privateKnowledge": [
            "기록과 체감의 차이를 인정해야 d-1과 d-5도 정리됩니다."
          ],
          "suppressions": [
            "그래도 생활 불편이 전혀 없었던 건 아니라는 선은 유지합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-4:admission:5",
              "factText": "문경수는 실제 불편은 제한적이었고 자신이 그 이상으로 인상을 부풀린 부분을 인정한다.",
              "tags": [
                "admission",
                "threshold",
                "responsibility",
                "context"
              ],
              "slots": {
                "record": {
                  "exact": "제한적 생활 불편",
                  "neutral": "그 수준"
                },
                "effect": {
                  "exact": "부풀려진 인상",
                  "neutral": "그 인상"
                }
              },
              "stanceHints": [
                "confess",
                "admit_responsibility"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "정정이 그렇게 늦은 건 아닙니다."
          ],
          "privateKnowledge": [
            "실제로는 관리인이 설명 중일 거라고 넘기며 시간을 보낸 부분이 있습니다."
          ],
          "suppressions": [
            "소문 이후 별도 공지를 바로 하지 않았다는 사실은 처음엔 숨깁니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-5:act:0",
              "factText": "문경수는 자신의 정정 지연을 먼저 부인하거나 축소한다.",
              "tags": [
                "act",
                "denial",
                "timeline",
                "self_justification"
              ],
              "slots": {
                "act": {
                  "exact": "정정 지연 부인",
                  "neutral": "그 주장"
                },
                "time": {
                  "exact": "늦지 않았다",
                  "neutral": "그 시차",
                  "period": "소문 직후"
                }
              },
              "stanceHints": [
                "deny",
                "minimize"
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
            "관리인이 설명 중이라 별도 공지까지는 필요 없다고 봤습니다."
          ],
          "privateKnowledge": [
            "건물주가 나서면 일이 더 커질까 봐 관리인 뒤에서 상황을 보려 했습니다."
          ],
          "suppressions": [
            "제가 판단을 미룬 사이 소문이 더 굳어졌다는 점은 아직 빼고 말합니다."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-5:quote:1",
              "factText": "문경수는 관리인 설명을 이유로 자신이 별도 정정을 하지 않은 판단을 합리화한다.",
              "tags": [
                "quote",
                "self_justification",
                "institution",
                "counter"
              ],
              "slots": {
                "person": {
                  "exact": "조미령",
                  "neutral": "그 사람",
                  "fullName": "조미령",
                  "judgeRef": "관리인"
                },
                "act": {
                  "exact": "별도 공지 불필요",
                  "neutral": "그 판단"
                }
              },
              "stanceHints": [
                "hedge",
                "self_justify"
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
            "정정문을 바로 내지 않은 건 맞습니다."
          ],
          "privateKnowledge": [
            "e-3가 나오면 더는 미룰 수 없고, 적어도 '바로 안 했다'는 건 인정해야 합니다."
          ],
          "suppressions": [
            "그 이후에도 여전히 전달 과정만 탓하며 본인이 안 움직였다는 점은 일부만 말합니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-5:context:2",
              "factText": "문경수는 즉각적인 정정문을 내지 않았다는 사실을 인정한다.",
              "tags": [
                "context",
                "admission",
                "timeline",
                "uncertainty"
              ],
              "slots": {
                "act": {
                  "exact": "즉시 정정문 미발송",
                  "neutral": "그 대응"
                },
                "record": {
                  "exact": "경수-미령 문자",
                  "neutral": "그 문자"
                }
              },
              "stanceHints": [
                "partial",
                "admit_issue"
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
            "전달 과정만 문제라고 보고 제 손으로는 정리를 미뤘습니다."
          ],
          "privateKnowledge": [
            "관리인이 알아서 설명할 거라는 말이 결국 제 책임 회피였다는 걸 압니다."
          ],
          "suppressions": [
            "그 미룸에 체면과 건물 이미지 계산이 있었다는 감정은 아직 절반만 드러냅니다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-5:responsibility:3",
              "factText": "문경수는 전달 과정을 탓하며 직접 정리를 미룬 자신의 회피를 인정한다.",
              "tags": [
                "responsibility",
                "institution",
                "admission",
                "motive"
              ],
              "slots": {
                "act": {
                  "exact": "직접 정리 미룸",
                  "neutral": "그 대응"
                },
                "channel": {
                  "exact": "전달 과정 탓",
                  "neutral": "그 설명"
                }
              },
              "stanceHints": [
                "blame_self",
                "partial"
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
            "괜히 더 시끄러워질까 봐 미루다가 인상이 굳었습니다."
          ],
          "privateKnowledge": [
            "사실은 건물 평판이 더 흔들릴까 걱정해 빨리 공지하지 못했습니다."
          ],
          "suppressions": [
            "소담 씨가 겪은 낙인 불안의 체감은 아직 완전히 제 말에 넣지 못합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-5:emotion:4",
              "factText": "문경수는 일을 키우고 싶지 않다는 이유와 건물 평판 걱정 때문에 정정을 미뤘다고 털어놓는다.",
              "tags": [
                "emotion",
                "fear",
                "motive",
                "harm"
              ],
              "slots": {
                "fear": {
                  "exact": "더 시끄러워질까 하는 우려",
                  "neutral": "그 걱정"
                },
                "effect": {
                  "exact": "인상 고착",
                  "neutral": "그 결과"
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
            "정정 지연과 방관 책임은 결국 제게 있습니다."
          ],
          "privateKnowledge": [
            "직접 유포와는 별개로, 제가 움직이지 않은 시간이 사건을 굳힌 핵심이었다고 인정합니다."
          ],
          "suppressions": [
            "그래도 최초 발화자는 제가 아니라는 선은 끝까지 남기고 싶어 합니다."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "tenant12:b:tell:delegation_shield",
            "tenant12:b:tell:passive_voice_escape",
            "tenant12:b:tell:silence_stretch"
          ],
          "claimAtoms": [
            {
              "id": "tenant12:b:d-5:admission:5",
              "factText": "문경수는 정정 지연과 방관 책임을 자신의 몫으로 명확히 인정한다.",
              "tags": [
                "admission",
                "responsibility",
                "harm",
                "timeline"
              ],
              "slots": {
                "act": {
                  "exact": "정정 지연과 방관",
                  "neutral": "그 책임"
                },
                "person": {
                  "exact": "문경수",
                  "neutral": "저",
                  "fullName": "문경수",
                  "judgeRef": "본인"
                }
              },
              "stanceHints": [
                "confess",
                "admit_responsibility"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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


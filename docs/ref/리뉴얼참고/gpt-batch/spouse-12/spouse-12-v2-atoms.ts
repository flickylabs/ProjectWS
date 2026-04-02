export const spouse12V2Atoms = {
  "caseId": "spouse-12",
  "claimPolicies": {
    "a": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 그 익명 계정을 한 적이 없어요.",
            "재우 씨가 저한테 확인도 하기 전에 밖으로 돌린 게 먼저 문제예요."
          ],
          "privateKnowledge": [
            "동창회 직후 붙은 캡처가 제 옛 닉네임을 닮아 보여 의심이 쉽게 붙을 수 있다는 건 안다."
          ],
          "suppressions": [
            "2006년에 한유진에게 모질게 보낸 메시지와, 그 기록을 재우에게 처음부터 다 공개하지 않은 사실."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-1:denial:0",
              "factText": "문세아는 익명 SNS 계정 운영자가 아니라는 주장",
              "tags": [
                "denial",
                "identity"
              ],
              "slots": {
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
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
              "id": "spouse12:a:d-1:act:0",
              "factText": "최재우가 문세아 확인 전에 외부 채널로 캡처를 돌렸다는 지적",
              "tags": [
                "act",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최재우",
                  "neutral": "상대방",
                  "fullName": "최재우",
                  "judgeRef": "최재우 씨"
                },
                "time": {
                  "exact": "세아에게 확인 문자 보내기 9분 전",
                  "neutral": "확인 전",
                  "period": "확인 직전"
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
            "그 사람이 불안했던 건 이해해도 순서는 거꾸로였어요.",
            "적어도 제 말은 듣고 보냈어야 했죠."
          ],
          "privateKnowledge": [
            "재우가 공적 이미지 때문에 평판 이슈를 유독 빠르게 차단하려 한다는 걸 오래전부터 알고 있었다."
          ],
          "suppressions": [
            "제가 과거 사건을 깔끔하게 설명할 자신이 없어서 재우에게 즉시 반박 자료를 못 준 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-1:rule:0",
              "factText": "배우자 확인이 외부 전달보다 앞서야 한다는 내부 약속",
              "tags": [
                "rule",
                "relationship"
              ],
              "slots": {
                "channel": {
                  "exact": "외부 전달",
                  "neutral": "바깥 공유"
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
            },
            {
              "id": "spouse12:a:d-1:fear:0",
              "factText": "문세아가 설명 기회를 잃었다는 두려움",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "reputation": {
                  "exact": "가게 평판",
                  "neutral": "지금의 평판"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "motive_search"
              ]
            }
          ]
        },
        "S2": {
          "disputeId": "d-1",
          "state": "S2",
          "publicClaim": [
            "제가 과거 기록을 다 못 보여 준 건 맞아요.",
            "그래도 그게 확인도 없이 유포해도 된다는 뜻은 아니에요."
          ],
          "privateKnowledge": [
            "재우가 제 불완전한 설명을 자기 불안에 맞는 단정으로 바꿨다고 느낀다."
          ],
          "suppressions": [
            "재우의 공황을 키운 제 선택 삭제가 어느 정도 빌미가 됐다는 자책."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-1:counter:0",
              "factText": "문세아의 자료 누락과 외부 유포 책임은 별개라는 주장",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "spouse12:a:d-1:relationship:0",
              "factText": "최재우가 배우자보다 여론을 먼저 택했다는 상처",
              "tags": [
                "relationship",
                "harm",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "최재우",
                  "neutral": "상대방",
                  "fullName": "최재우",
                  "judgeRef": "최재우 씨"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "재우 씨는 '아마 제가 맞는 것 같다'는 식으로 이미 방향을 정해 두고 돌렸어요.",
            "그건 확인이 아니라 사실상 단정이었어요."
          ],
          "privateKnowledge": [
            "전달 범위가 운영진만이 아니라 가족과 직장 인맥까지 번졌다는 걸 듣고 배신감이 더 커졌다."
          ],
          "suppressions": [
            "제가 숨긴 옛 메시지가 이 사안에서 완전히 무관하진 않다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-1:quote:0",
              "factText": "재우 메시지의 '아마 세아가 맞는 것 같다'는 단정형 표현",
              "tags": [
                "quote",
                "evidence",
                "responsibility"
              ],
              "slots": {
                "channel": {
                  "exact": "동창회 운영진 단톡",
                  "neutral": "그 채널"
                }
              },
              "stanceHints": [
                "blame"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:a:d-1:harm:0",
              "factText": "가족과 직장 인맥으로 번진 유포가 현재 생업을 흔들었다는 진술",
              "tags": [
                "harm",
                "fear",
                "context"
              ],
              "slots": {
                "channel1": {
                  "exact": "가족 단톡",
                  "neutral": "가족 채널"
                },
                "channel2": {
                  "exact": "가까운 직장 인맥",
                  "neutral": "직장 쪽"
                }
              },
              "stanceHints": [
                "blame",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "evidence_present"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-1",
          "state": "S4",
          "publicClaim": [
            "가장 아픈 건, 남편이 저를 먼저 의심한 채 사람들 앞에 내놓았다는 거예요.",
            "그 순간 저는 해명할 사람보다 처리할 대상이 된 기분이었어요."
          ],
          "privateKnowledge": [
            "내가 과거에 잘못한 장면이 있어서 재우의 공포를 완전히 부정하기도 어렵다."
          ],
          "suppressions": [
            "재우를 향한 분노 안에 '내가 빌미를 줬다'는 수치심도 섞여 있다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-1:emotion:0",
              "factText": "배우자에게 처리 대상으로 느껴졌다는 정서",
              "tags": [
                "emotion",
                "relationship",
                "harm"
              ],
              "slots": {},
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:a:d-1:shame:0",
              "factText": "문세아가 자신의 과거 잘못이 의심의 빌미가 됐다고 느끼는 수치심",
              "tags": [
                "shame",
                "fear",
                "context"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
            "제가 과거를 숨겨 재우 씨를 더 불안하게 만든 건 인정해요.",
            "그래도 확인 없는 외부 전달과 사실상 가해자 단정은 재우 씨 책임이 맞습니다."
          ],
          "privateKnowledge": [
            "재우가 사과와 정정을 하지 않으면 제 가게와 인간관계가 오래 흔들릴 거라고 본다."
          ],
          "suppressions": [
            "제가 바라는 건 복수보다 범위가 같은 정정과 사과라는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-1:admission:0",
              "factText": "문세아는 자신의 은폐가 최재우의 불안을 키운 점을 인정한다",
              "tags": [
                "admission",
                "context"
              ],
              "slots": {
                "person": {
                  "exact": "최재우",
                  "neutral": "상대방",
                  "fullName": "최재우",
                  "judgeRef": "최재우 씨"
                }
              },
              "stanceHints": [
                "confess",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:a:d-1:responsibility:0",
              "factText": "외부 전달과 사실상 가해자 단정의 주된 책임은 최재우에게 있다는 결론",
              "tags": [
                "responsibility",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "최재우",
                  "neutral": "상대방",
                  "fullName": "최재우",
                  "judgeRef": "최재우 씨"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저는 옛 자료를 거의 그대로 보여 줬어요.",
            "빠진 게 있다면 정리 중이던 중복 파일 정도였어요."
          ],
          "privateKnowledge": [
            "한유진에게 보낸 모진 메시지 1건을 별도 폴더로 옮겨 재우에게 보낸 압축파일에서 뺐다."
          ],
          "suppressions": [
            "문제 메시지를 익명 게시물 확산 2시간 뒤 숨김 처리했다는 로그."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-2:denial:0",
              "factText": "문세아는 백업 자료를 거의 그대로 공유했다는 주장",
              "tags": [
                "denial",
                "evidence"
              ],
              "slots": {
                "backup": {
                  "exact": "2006년 백업 자료",
                  "neutral": "옛 자료"
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
              "id": "spouse12:a:d-2:privacy:0",
              "factText": "빠진 파일은 정리 중인 일부에 불과했다는 방어",
              "tags": [
                "privacy",
                "self_justification"
              ],
              "slots": {
                "file": {
                  "exact": "중복 파일",
                  "neutral": "일부 파일"
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
            "너무 오래된 자료라 전체를 한 번에 펼치기 어려웠어요.",
            "일단 이번 익명 글과 직접 관련 있는 구간부터 보여 준 거예요."
          ],
          "privateKnowledge": [
            "익명 계정과 무관한 과거 감정표현까지 동시에 노출되면 설명이 무너질까 봐 범위를 좁혔다."
          ],
          "suppressions": [
            "'전체 목록부터 보자'는 요청이 나오면 방어가 어려워진다는 계산."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:archive_narrowing",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-2:context:0",
              "factText": "문세아는 오래된 자료라 관련 구간만 먼저 정리했다고 설명한다",
              "tags": [
                "context",
                "timeline",
                "self_justification"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
              "id": "spouse12:a:d-2:fear:0",
              "factText": "불리한 옛 표현이 현재 사건 설명을 덮을까 두려워한 심리",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "reputation": {
                  "exact": "가게 평판",
                  "neutral": "지금의 평판"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
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
            "한유진에게 심하게 보낸 메시지 하나는 뺐어요.",
            "그 문장까지 얹히면 제가 익명 계정 운영자처럼 굳어질까 봐 겁났어요."
          ],
          "privateKnowledge": [
            "삭제가 아니라 노출 범위 조정이라는 표현으로 스스로를 합리화하고 있다."
          ],
          "suppressions": [
            "그 메시지를 뺀 시점이 익명 게시물 확산 직후였다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-2:admission:0",
              "factText": "문세아가 한유진에게 보낸 모진 메시지 1건을 공유 파일에서 뺐다는 인정",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
                },
                "file": {
                  "exact": "재우에게 공유된 압축파일",
                  "neutral": "공유 파일"
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
              "id": "spouse12:a:d-2:fear:1",
              "factText": "그 메시지가 익명 계정 운영 근거처럼 굳어질까 두려웠다는 설명",
              "tags": [
                "fear",
                "motive",
                "identity"
              ],
              "slots": {
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "제가 한 건 원자료 조작이 아니라 노출 순서를 바꾼 거예요.",
            "그때는 억울함을 먼저 막아야 한다고 생각했어요."
          ],
          "privateKnowledge": [
            "실제로는 '순서 조정'보다 더 적극적인 선택 삭제였다는 걸 안다."
          ],
          "suppressions": [
            "재우가 전체 자료를 받지 못한 채 판단하게 된 원인 중 하나가 자신이라는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:archive_narrowing",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-2:self_justification:0",
              "factText": "문세아는 선택 삭제를 '노출 순서 조정'으로 축소해 말한다",
              "tags": [
                "self_justification",
                "counter"
              ],
              "slots": {},
              "stanceHints": [
                "blame",
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:a:d-2:responsibility:0",
              "factText": "전체 자료 없이 판단하게 만든 책임 일부가 자신에게 있다는 인식",
              "tags": [
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "최재우",
                  "neutral": "상대방",
                  "fullName": "최재우",
                  "judgeRef": "최재우 씨"
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
        "S4": {
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "솔직히 그 메시지는 제일 보여 주기 싫었어요.",
            "제가 좋은 어른이 아니었던 장면이 그대로 남아 있었으니까요."
          ],
          "privateKnowledge": [
            "익명 계정과 무관하다는 말 뒤에 과거의 잔인함을 숨기고 싶다는 수치심이 더 컸다."
          ],
          "suppressions": [
            "한유진에게 제대로 사과하지 못한 채 시간이 흘렀다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-2:shame:0",
              "factText": "문세아는 자신의 가장 잔인한 문장이 드러나는 것을 수치로 느낀다",
              "tags": [
                "shame",
                "emotion"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
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
              "id": "spouse12:a:d-2:legacy_sentence:0",
              "factText": "2006년의 모진 표현이 지금의 평판과 자아상에 남긴 흔적",
              "tags": [
                "legacy_sentence",
                "harm",
                "context"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
            "네, 저는 옛 백업에서 제게 가장 불리한 메시지 하나를 숨겼어요.",
            "익명 글이 거짓이라는 사실과 별개로, 그 선택 삭제는 제 책임입니다."
          ],
          "privateKnowledge": [
            "정면으로 인정해야 지금 사건의 허위 부분과 과거 잘못을 분리할 수 있다고 느낀다."
          ],
          "suppressions": [
            "재우보다 먼저 한유진에게 사과할 문제였다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-2:admission:1",
              "factText": "문세아는 가장 불리한 메시지 1건을 의도적으로 숨겼다고 시인한다",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
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
              "id": "spouse12:a:d-2:counter:0",
              "factText": "선택 삭제의 책임과 익명 게시물의 허위성은 분리돼야 한다는 정리",
              "tags": [
                "counter",
                "rule",
                "responsibility"
              ],
              "slots": {
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
                }
              },
              "stanceHints": [
                "confess",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "처음엔 저도 한유진 씨 쪽이 떠오르긴 했어요.",
            "예전 일과 닉네임이 겹쳐 보여서요."
          ],
          "privateKnowledge": [
            "한유진을 의심하면 자신에게 돌아올 비난의 방향을 잠시 늦출 수 있다는 계산이 있었다."
          ],
          "suppressions": [
            "그 추측이 증거가 아니라 감정에 가까웠다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-3:identity:0",
              "factText": "문세아가 한유진을 익명 계정 후보로 처음 떠올렸다는 진술",
              "tags": [
                "identity",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                },
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
                }
              },
              "stanceHints": [
                "hedge",
                "uncertainty"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "spouse12:a:d-3:timeline:0",
              "factText": "동창회 직후 오래된 닉네임이 다시 보였다는 정황",
              "tags": [
                "timeline",
                "context"
              ],
              "slots": {
                "time": {
                  "exact": "동창회 다음 날 새벽",
                  "neutral": "그 직후",
                  "period": "동창회 직후"
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
          "disputeId": "d-3",
          "state": "S1",
          "publicClaim": [
            "확신은 없었어요.",
            "다만 제 이름을 그렇게 다시 끌어올 사람으로는 그쪽이 제일 먼저 생각났던 거예요."
          ],
          "privateKnowledge": [
            "피해자였던 한유진을 다시 의심하는 말이 얼마나 가혹하게 들릴지 안다."
          ],
          "suppressions": [
            "그 의심을 재우가 더 크게 받아 외부에 말할 수 있다는 위험."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-3:uncertainty:0",
              "factText": "문세아는 확신 없이 한유진을 가장 먼저 떠올렸다고 말한다",
              "tags": [
                "uncertainty",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
              "id": "spouse12:a:d-3:fear:0",
              "factText": "자신의 이름을 다시 끌어올 사람을 찾는 조급함",
              "tags": [
                "fear",
                "motive"
              ],
              "slots": {
                "reputation": {
                  "exact": "가게 평판",
                  "neutral": "지금의 평판"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
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
            "맞아요, 저는 한유진 씨를 의심했어요.",
            "하지만 그건 오래된 감정 때문에 튀어나온 추측이었지 근거는 아니었어요."
          ],
          "privateKnowledge": [
            "재우에게도 '그럴 수도 있다'는 정도로 말했지만, 그 말이 방향을 만들었다."
          ],
          "suppressions": [
            "한유진에게 다시 상처를 줄 수 있다는 점을 충분히 생각하지 못했다."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-3:admission:0",
              "factText": "문세아가 한유진을 근거 없이 의심했다고 인정한다",
              "tags": [
                "admission",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "spouse12:a:d-3:motive:0",
              "factText": "오래된 감정이 추측을 사실처럼 밀어 올렸다는 설명",
              "tags": [
                "motive",
                "legacy_sentence",
                "emotion"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "저는 그 추측을 방패처럼 썼던 것 같아요.",
            "제가 아니라고 말하려다 보니 누군가를 빨리 상정해 버렸죠."
          ],
          "privateKnowledge": [
            "박하린 가능성을 제대로 떠올리지 못한 건 동창회 준비위원이라는 현재 맥락을 덜 봤기 때문이다."
          ],
          "suppressions": [
            "자기방어를 위해 피해자 쪽을 다시 의심했다는 윤리적 문제."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-3:self_justification:0",
              "factText": "문세아는 자신을 지키려다 다른 사람을 빨리 후보로 세웠다고 돌아본다",
              "tags": [
                "self_justification",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:a:d-3:context:0",
              "factText": "실제 동선과 접속 기록 같은 현재 맥락을 충분히 보지 못했다는 반성",
              "tags": [
                "context",
                "evidence"
              ],
              "slots": {
                "person": {
                  "exact": "박하린",
                  "neutral": "그 사람",
                  "fullName": "박하린",
                  "judgeRef": "박하린 씨"
                },
                "wifi": {
                  "exact": "동창회장 와이파이 접속기록",
                  "neutral": "행사장 접속 기록"
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
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "한유진 씨한테는 너무 잔인한 추측이었어요.",
            "제가 과거에 상처 준 사람을 이번에도 먼저 의심했으니까요."
          ],
          "privateKnowledge": [
            "이 지점은 억울함과 별개로 사과가 필요하다고 느낀다."
          ],
          "suppressions": [
            "스스로를 피해자처럼만 말해 온 태도."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-3:shame:0",
              "factText": "과거에 상처 준 한유진을 다시 의심한 데 대한 수치",
              "tags": [
                "shame",
                "relationship",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
              "id": "spouse12:a:d-3:admission:1",
              "factText": "문세아는 억울함과 별개로 이 추측 자체는 사과할 일이라고 본다",
              "tags": [
                "admission",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "emotional",
                "confess"
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
            "결론적으로 익명 계정은 한유진 씨 복수가 아니었어요.",
            "제가 잘못 의심했고, 실제 흔적은 박하린 씨 쪽으로 모입니다."
          ],
          "privateKnowledge": [
            "이 결론이 나와야 과거의 상처와 현재의 조작을 분리할 수 있다."
          ],
          "suppressions": [
            "한유진에게 먼저 씌운 의심을 어떻게 거둘지 아직 두렵다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-3:institution:0",
              "factText": "실제 운영 흔적이 박하린 쪽 네트워크에 모인다는 확인",
              "tags": [
                "institution",
                "evidence",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "박하린",
                  "neutral": "그 사람",
                  "fullName": "박하린",
                  "judgeRef": "박하린 씨"
                },
                "wifi": {
                  "exact": "동창회장 와이파이 접속기록",
                  "neutral": "행사장 접속 기록"
                },
                "mail": {
                  "exact": "버너계정 복구 메일",
                  "neutral": "계정 복구 기록"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:a:d-3:counter:0",
              "factText": "과거 피해자였던 한유진과 현재 조작자는 구분돼야 한다는 결론",
              "tags": [
                "counter",
                "rule",
                "relationship"
              ],
              "slots": {
                "person1": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                },
                "person2": {
                  "exact": "박하린",
                  "neutral": "그 사람",
                  "fullName": "박하린",
                  "judgeRef": "박하린 씨"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "저 캡처 묶음은 제 과거처럼 보이게 만들어졌지만, 제가 만든 건 아니에요.",
            "지금은 진짜 오래된 자료인지도 확신할 수 없어요."
          ],
          "privateKnowledge": [
            "폰트와 해상도가 묘하게 어긋난다는 인상은 받았지만 증명할 근거는 없었다."
          ],
          "suppressions": [
            "제 옛 닉네임과 과거 다툼이 실제로 들어 있어 사람들 눈에는 그럴듯하게 먹힌다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-4:denial:0",
              "factText": "문세아는 해당 캡처 묶음을 자신이 만들지 않았다고 부인한다",
              "tags": [
                "denial",
                "identity"
              ],
              "slots": {
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
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
              "id": "spouse12:a:d-4:uncertainty:0",
              "factText": "캡처가 진짜 오래된 원본인지조차 지금은 확신할 수 없다는 말",
              "tags": [
                "uncertainty",
                "evidence"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                },
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
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
            "오래돼 보인다고 해서 곧바로 진짜는 아니죠.",
            "원본 경로와 메타데이터 없이 저걸 결정적 증거로 삼는 건 위험해요."
          ],
          "privateKnowledge": [
            "재우가 그 위험을 알면서도 캡처 모양새에 끌려 움직였다고 본다."
          ],
          "suppressions": [
            "저 스스로도 처음엔 '너무 그럴듯하다'는 공포에 흔들렸다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:archive_narrowing",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-4:rule:0",
              "factText": "오래돼 보이는 캡처만으로는 결정적 증거가 될 수 없다는 원칙",
              "tags": [
                "rule",
                "evidence"
              ],
              "slots": {
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
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
              "id": "spouse12:a:d-4:fear:0",
              "factText": "캡처의 모양새가 너무 그럴듯해 자신도 흔들렸다는 심리",
              "tags": [
                "fear",
                "emotion"
              ],
              "slots": {
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
                }
              },
              "stanceHints": [
                "hedge",
                "emotional"
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
            "포렌식 보고서를 보고 나서야 확실해졌어요.",
            "저건 2006년 한 장면이 아니라, 서로 다른 원본을 2026년에 이어 붙인 위조본이에요."
          ],
          "privateKnowledge": [
            "이제는 억울함만 말할 게 아니라 위조 사실을 빠르게 정정해야 한다고 본다."
          ],
          "suppressions": [
            "제가 숨긴 과거 메시지 때문에 이 위조 정정이 늦어졌다는 부담."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:archive_narrowing"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-4:evidence:0",
              "factText": "플랫폼 포렌식이 캡처 묶음을 2026년 합성본으로 본다는 사실",
              "tags": [
                "evidence",
                "institution",
                "timeline"
              ],
              "slots": {
                "forensic": {
                  "exact": "플랫폼 포렌식 보고서",
                  "neutral": "포렌식 자료"
                },
                "year": {
                  "exact": "2026년",
                  "neutral": "이번",
                  "dateExact": "2026년",
                  "period": "동창회 직후"
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
              "id": "spouse12:a:d-4:counter:0",
              "factText": "겉보기의 오래됨과 실제 원본성은 다르다는 주장",
              "tags": [
                "counter",
                "rule"
              ],
              "slots": {
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "방명록 배경과 문자 말풍선 출처가 서로 달랐다고 하더군요.",
            "누군가 제 과거를 이용해 지금의 증거처럼 조합한 거예요."
          ],
          "privateKnowledge": [
            "박하린 쪽 접근 경로와 동창회 이후 업로드 흐름이 이어진다는 설명을 보고 퍼즐이 맞았다."
          ],
          "suppressions": [
            "'누가 왜 나를 이렇게까지'라는 분노에만 머무르면 사건 구조를 놓친다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:fact_partition",
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-4:timeline:0",
              "factText": "서로 다른 시기의 이미지 요소가 2026년에 조합됐다는 포렌식 해석",
              "tags": [
                "timeline",
                "evidence",
                "institution"
              ],
              "slots": {
                "year1": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                },
                "year2": {
                  "exact": "2026년",
                  "neutral": "이번",
                  "dateExact": "2026년",
                  "period": "동창회 직후"
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
              "id": "spouse12:a:d-4:motive:0",
              "factText": "누군가 문세아의 과거를 이용해 현재의 가해자 이미지로 고정하려 했다는 해석",
              "tags": [
                "motive",
                "harm",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "정말 무서웠던 건, 거짓인데도 제 과거 일부가 섞여 있어서 다들 더 쉽게 믿었다는 거예요.",
            "억울함과 부끄러움이 같이 올라왔어요."
          ],
          "privateKnowledge": [
            "위조가 드러나도 사람들 기억에는 '뭔가 있었던 사람'만 남을까 봐 두렵다."
          ],
          "suppressions": [
            "가게와 가족 생활이 무너질까 봐 감정적으로 과열됐던 순간들."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-4:emotion:0",
              "factText": "거짓 자료에 진짜 과거 조각이 섞여 더 잘 믿힌 데서 오는 공포",
              "tags": [
                "emotion",
                "fear",
                "harm"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                },
                "reputation": {
                  "exact": "가게 평판",
                  "neutral": "지금의 평판"
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
              "id": "spouse12:a:d-4:legacy_sentence:0",
              "factText": "과거 장면 일부가 현재 허위 유포의 재료가 된 구조",
              "tags": [
                "legacy_sentence",
                "context",
                "harm"
              ],
              "slots": {},
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
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "결정적이라고 돌던 2006년 증거는 2026년 위조본이 맞습니다.",
            "다만 그 위조가 먹힌 건 제 과거 상처가 실제로 존재했기 때문이기도 해요."
          ],
          "privateKnowledge": [
            "허위 조작 정정과 과거 행동 책임 인정을 분리해 병행해야 한다고 결심한다."
          ],
          "suppressions": [
            "위조 정정만 되면 모든 문제가 끝난다고 말하고 싶은 유혹."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-4:admission:0",
              "factText": "문세아는 위조 정정과 별개로 과거 상처가 실제로 있었다는 점을 인정한다",
              "tags": [
                "admission",
                "counter",
                "legacy_sentence"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                }
              },
              "stanceHints": [
                "confess",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:a:d-4:institution:0",
              "factText": "결정적 2006년 증거가 2026년 합성본이라는 최종 정리",
              "tags": [
                "institution",
                "evidence",
                "responsibility"
              ],
              "slots": {
                "forensic": {
                  "exact": "플랫폼 포렌식 보고서",
                  "neutral": "포렌식 자료"
                },
                "year": {
                  "exact": "2026년",
                  "neutral": "이번",
                  "dateExact": "2026년",
                  "period": "동창회 직후"
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
      "d-5": {
        "S0": {
          "disputeId": "d-5",
          "state": "S0",
          "publicClaim": [
            "2006년 일은 거의 누명에 가까웠어요.",
            "제가 지금처럼 퍼지는 소문의 장본인인 건 아니었어요."
          ],
          "privateKnowledge": [
            "한유진과 공개적으로 다투고 모진 개인 메시지를 보낸 기억이 또렷하다."
          ],
          "suppressions": [
            "당시 생활지도실 메모가 익명 소문 발신자를 특정하지 못했다는 점만 앞세우고, 공개 충돌은 약하게 말하려는 태도."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-5:denial:1",
              "factText": "문세아는 2006년 사건을 거의 누명에 가깝다고 말한다",
              "tags": [
                "denial",
                "counter",
                "timeline"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
              "id": "spouse12:a:d-5:identity:1",
              "factText": "익명 소문 장본인은 자신이 아니었다는 주장",
              "tags": [
                "identity",
                "denial"
              ],
              "slots": {
                "account": {
                  "exact": "익명 블로그·미니홈피 소문 발신자",
                  "neutral": "그 발신자"
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
            "다툼은 있었어요.",
            "하지만 지금 사람들 말처럼 제가 모든 걸 꾸민 건 아니에요."
          ],
          "privateKnowledge": [
            "'다툼'이라는 말로 공개 충돌과 모진 메시지의 수위를 낮춰 말하고 있다."
          ],
          "suppressions": [
            "한유진이 받은 실제 상처의 강도."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-5:uncertainty:0",
              "factText": "문세아는 다툼은 인정하지만 사건 전체 책임은 부인한다",
              "tags": [
                "uncertainty",
                "counter",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
              "id": "spouse12:a:d-5:privacy:0",
              "factText": "개인 메시지의 수위를 '다툼'으로 축소하는 방어",
              "tags": [
                "privacy",
                "self_justification"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
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
            "맞아요, 저는 한유진 씨에게 심하게 말했고 공개적으로도 부딪쳤어요.",
            "그건 부정하지 않겠습니다."
          ],
          "privateKnowledge": [
            "익명 소문 주체가 아니었다는 말이 과거 상처 책임을 덜어 주지는 않는다는 걸 안다."
          ],
          "suppressions": [
            "직접 사과보다 억울함 해명에 더 매달렸다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-5:admission:0",
              "factText": "문세아는 한유진에게 심한 말과 공개 충돌이 있었다고 인정한다",
              "tags": [
                "admission",
                "relationship",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                },
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:a:d-5:counter:0",
              "factText": "직접 상처를 준 사실과 익명 소문 작성은 구분돼야 한다는 주장",
              "tags": [
                "counter",
                "rule",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
            "그때 저는 화가 난 상태에서 너무 잔인하게 굴었어요.",
            "그래도 익명으로 뒤에서 퍼뜨린 사람은 아니었습니다."
          ],
          "privateKnowledge": [
            "자기 감정 폭발을 '어렸다'는 맥락으로 설명하며 수위를 조금 낮추고 싶다."
          ],
          "suppressions": [
            "한유진이 그 뒤로 얼마나 오래 그 일을 끌고 갔는지 충분히 알지 못한다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-5:shame:0",
              "factText": "문세아는 당시 자신이 잔인하게 굴었다고 수치심을 드러낸다",
              "tags": [
                "shame",
                "admission",
                "emotion"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:a:d-5:counter:1",
              "factText": "공개 충돌과 익명 유포는 행동 양식이 다르다는 선 긋기",
              "tags": [
                "counter",
                "identity",
                "rule"
              ],
              "slots": {},
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
            "제가 가장 숨기고 싶었던 건, 그때 제가 정말 못된 말을 했다는 사실이에요.",
            "누명이 전부라고 말하면 편하지만 그건 거짓말이죠."
          ],
          "privateKnowledge": [
            "익명 작성자가 아니었다는 억울함보다, 실제 상처를 준 사람이라는 죄책감이 앞선다."
          ],
          "suppressions": [
            "한유진과의 관계를 '오해' 정도로만 말해 왔던 습관."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:a:tell:moral_offset"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-5:shame:1",
              "factText": "문세아는 2006년에 실제로 못된 말을 했다는 사실을 가장 숨기고 싶어 했다",
              "tags": [
                "shame",
                "legacy_sentence",
                "admission"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
                },
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
              "id": "spouse12:a:d-5:responsibility:0",
              "factText": "'전부 누명'이라는 표현이 거짓이었다는 자기 정정",
              "tags": [
                "responsibility",
                "admission",
                "counter"
              ],
              "slots": {},
              "stanceHints": [
                "emotional",
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S5": {
          "disputeId": "d-5",
          "state": "S5",
          "publicClaim": [
            "2006년에 저는 한유진 씨에게 상처를 줬습니다.",
            "하지만 장학금 특혜 소문을 익명으로 퍼뜨린 장본인은 아니었어요."
          ],
          "privateKnowledge": [
            "이 문장을 분리해 말해야만 과거 책임과 현재 허위 낙인을 동시에 다룰 수 있다고 본다."
          ],
          "suppressions": [
            "사과가 늦었고, 그래서 지금 해명도 더 차갑게 들릴 수 있다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:a:tell:moral_offset",
            "spouse12:a:tell:fact_partition"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:a:d-5:admission:1",
              "factText": "문세아는 한유진에게 실제 상처를 줬다고 시인한다",
              "tags": [
                "admission",
                "harm",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:a:d-5:identity:2",
              "factText": "익명 장학금 특혜 소문 작성자는 문세아가 아니었다는 최종 주장",
              "tags": [
                "identity",
                "counter",
                "rule"
              ],
              "slots": {
                "account": {
                  "exact": "장학금 특혜 소문 작성자",
                  "neutral": "그 작성자"
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
      }
    },
    "b": {
      "d-1": {
        "S0": {
          "disputeId": "d-1",
          "state": "S0",
          "publicClaim": [
            "저는 몇 명에게 확인 차원으로만 공유했지, 세아 씨를 단정한 건 아닙니다.",
            "상황이 커질까 봐 최소한의 대응을 한 거예요."
          ],
          "privateKnowledge": [
            "세아에게 확인 문자를 보내기 9분 전에 이미 운영진 단톡으로 먼저 보냈고, 가족과 직장 인맥에도 연속 전달했다."
          ],
          "suppressions": [
            "메시지 안에 '아마 세아가 맞는 것 같다'는 표현이 반복된 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-1:denial:0",
              "factText": "최재우는 외부 공유가 확인 차원일 뿐 단정은 아니었다고 말한다",
              "tags": [
                "denial",
                "self_justification"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
                },
                "channel": {
                  "exact": "동창회 운영진 단톡",
                  "neutral": "그 채널"
                }
              },
              "stanceHints": [
                "deny"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "motive_search"
              ]
            },
            {
              "id": "spouse12:b:d-1:threshold:0",
              "factText": "상황이 커지기 전에 최소 대응이 필요했다고 주장한다",
              "tags": [
                "threshold",
                "motive",
                "rule"
              ],
              "slots": {
                "role": {
                  "exact": "구청 홍보팀 주무관",
                  "neutral": "공적 자리"
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
          "disputeId": "d-1",
          "state": "S1",
          "publicClaim": [
            "제 자리에서는 선조치가 필요한 경우가 있습니다.",
            "나중에 틀리더라도 일단 알릴 건 알려야 한다고 봤습니다."
          ],
          "privateKnowledge": [
            "직업 습관을 핑계로 사적 루머 전달 범위를 스스로 넓혔다는 걸 안다."
          ],
          "suppressions": [
            "가족과 직장 인맥까지 넣은 건 '최소한'이라는 주장과 맞지 않는다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-1:rule:0",
              "factText": "공적 자리에서는 선조치가 우선이라는 최재우의 프레임",
              "tags": [
                "rule",
                "self_justification",
                "institution"
              ],
              "slots": {
                "role": {
                  "exact": "구청 홍보팀 주무관",
                  "neutral": "공적 자리"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:b:d-1:responsibility:0",
              "factText": "직업 습관을 사적 루머 전달에 가져왔다는 문제",
              "tags": [
                "responsibility",
                "context"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "partial"
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
            "운영진 단톡에는 먼저 보냈습니다.",
            "다만 그때도 저는 가능성이라고 생각했지 확정이라고 본 건 아니었습니다."
          ],
          "privateKnowledge": [
            "실제 메시지에선 가능성보다 단정에 가까운 어투를 썼다."
          ],
          "suppressions": [
            "세아에게 묻기 전에 보낸 시점과 전달 범위."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-1:admission:0",
              "factText": "최재우는 운영진 단톡에 세아 확인 전에 먼저 보냈다고 인정한다",
              "tags": [
                "admission",
                "timeline",
                "act"
              ],
              "slots": {
                "channel": {
                  "exact": "동창회 운영진 단톡",
                  "neutral": "그 채널"
                },
                "time": {
                  "exact": "세아에게 확인 문자 보내기 9분 전",
                  "neutral": "확인 전",
                  "period": "확인 직전"
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
              "id": "spouse12:b:d-1:quote:0",
              "factText": "표현은 가능성 수준이었다고 주장하지만 실제 메시지 톤은 더 단정적이었다는 쟁점",
              "tags": [
                "quote",
                "counter",
                "evidence"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
                "hedge"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-1",
          "state": "S3",
          "publicClaim": [
            "그때는 세아 씨 개인 문제를 넘어서 제 가족 체면이랑 직장 신뢰까지 걸려 있다고 느꼈습니다.",
            "그래서 범위를 넓혔습니다."
          ],
          "privateKnowledge": [
            "평판 공포가 사실 확인 의무보다 앞섰다는 사실을 인정할 수밖에 없다."
          ],
          "suppressions": [
            "가족과 직장 인맥으로의 확산이 실제 피해를 더 키웠다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-1:fear:0",
              "factText": "최재우는 가족 체면과 직장 신뢰가 무너질까 두려워 범위를 넓혔다",
              "tags": [
                "fear",
                "motive",
                "context"
              ],
              "slots": {
                "channel1": {
                  "exact": "가족 단톡",
                  "neutral": "가족 채널"
                },
                "channel2": {
                  "exact": "가까운 직장 인맥",
                  "neutral": "직장 쪽"
                }
              },
              "stanceHints": [
                "blame",
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:b:d-1:responsibility:1",
              "factText": "평판 공포가 사실 확인보다 앞섰다는 점",
              "tags": [
                "responsibility",
                "threshold"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
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
            "돌이켜 보면 저는 배우자를 보호한 게 아니라 제 평판부터 방어한 겁니다.",
            "그게 더 부끄럽습니다."
          ],
          "privateKnowledge": [
            "확인 전에 확산시킨 행동이 부부 내부 합의도 깼다는 걸 깨닫는다."
          ],
          "suppressions": [
            "'공무원 입장'이라는 말 뒤에 숨어 사적 책임을 줄여 말해 온 습관."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-1:shame:0",
              "factText": "최재우는 배우자 보호보다 자기 평판 방어를 앞세운 점을 부끄러워한다",
              "tags": [
                "shame",
                "admission",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
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
              "id": "spouse12:b:d-1:rule:1",
              "factText": "부부 사이 확인 후 공유 원칙을 스스로 깼다는 인식",
              "tags": [
                "rule",
                "responsibility",
                "relationship"
              ],
              "slots": {},
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
          "disputeId": "d-1",
          "state": "S5",
          "publicClaim": [
            "네, 저는 세아 씨와 충분히 확인하기 전에 외부로 돌렸고 사실상 가해자처럼 말했습니다.",
            "그 책임은 제게 큽니다."
          ],
          "privateKnowledge": [
            "정정 메시지도 처음 퍼뜨린 범위와 같아야 한다고 받아들인다."
          ],
          "suppressions": [
            "사과가 직장 문제로 더 커질까 봐 아직도 주저한다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-1:admission:1",
              "factText": "최재우는 확인 전 외부 전달과 사실상 가해자 단정을 시인한다",
              "tags": [
                "admission",
                "responsibility",
                "act"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
                },
                "time": {
                  "exact": "세아에게 확인 문자 보내기 9분 전",
                  "neutral": "확인 전",
                  "period": "확인 직전"
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
              "id": "spouse12:b:d-1:beneficiary:0",
              "factText": "정정과 사과는 처음 전달한 동일 범위로 가야 한다는 수용",
              "tags": [
                "beneficiary",
                "rule",
                "responsibility"
              ],
              "slots": {
                "channel1": {
                  "exact": "동창회 운영진 단톡",
                  "neutral": "그 채널"
                },
                "channel2": {
                  "exact": "가족 단톡",
                  "neutral": "가족 채널"
                },
                "channel3": {
                  "exact": "가까운 직장 인맥",
                  "neutral": "직장 쪽"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "motive_search",
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
            "세아 씨가 자료를 다 보여 준 건 아니라고 봤습니다.",
            "그래서 더 의심이 커졌어요."
          ],
          "privateKnowledge": [
            "자신의 의심이 이미 커진 상태라 작은 누락도 큰 은폐처럼 받아들였다."
          ],
          "suppressions": [
            "그 의심을 근거로 앞선 외부 전달을 정당화하려는 마음."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-2:evidence:0",
              "factText": "최재우는 세아가 전체 자료를 다 보여 주지 않았다고 본다",
              "tags": [
                "evidence",
                "uncertainty"
              ],
              "slots": {
                "backup": {
                  "exact": "전체 백업 자료",
                  "neutral": "전체 자료"
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
              "id": "spouse12:b:d-2:motive:0",
              "factText": "자료 누락이 자신의 의심을 더 키웠다는 진술",
              "tags": [
                "motive",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
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
        "S1": {
          "disputeId": "d-2",
          "state": "S1",
          "publicClaim": [
            "오래된 자료라 일부만 먼저 보여 줄 수는 있겠죠.",
            "그래도 빠진 부분이 있으면 말은 했어야 한다고 생각합니다."
          ],
          "privateKnowledge": [
            "세아의 누락 지적은 타당하지만, 자신도 그 상황을 냉정하게 다루지 못했다."
          ],
          "suppressions": [
            "'말은 했어야 한다'는 기준을 자신은 외부 전달에 적용하지 않았다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-2:rule:0",
              "factText": "부분 제시는 가능해도 누락 사실은 먼저 밝혔어야 했다는 기준",
              "tags": [
                "rule",
                "evidence"
              ],
              "slots": {
                "backup": {
                  "exact": "부분 자료 제시",
                  "neutral": "일부 제시"
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
              "id": "spouse12:b:d-2:counter:0",
              "factText": "같은 기준을 자신은 외부 전달에 지키지 못했다는 역문제",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "partial"
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
            "복원 로그를 보니 정말로 메시지 하나를 빼고 보냈더군요.",
            "그건 저를 오판하게 만든 요소였습니다."
          ],
          "privateKnowledge": [
            "그 오판이 자신의 단독 책임을 없애 주지는 않는다는 걸 안다."
          ],
          "suppressions": [
            "선택 삭제와 익명 계정 운영 여부를 같은 선상에 올려버린 과장."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-2:evidence:1",
              "factText": "복원 로그상 문세아가 메시지 1건을 빼고 공유했다는 확인",
              "tags": [
                "evidence",
                "timeline"
              ],
              "slots": {
                "log": {
                  "exact": "옛 백업 복원 로그",
                  "neutral": "복원 로그"
                },
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
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
              "id": "spouse12:b:d-2:counter:1",
              "factText": "그 누락이 최재우의 오판 책임을 지워 주지는 않는다는 점",
              "tags": [
                "counter",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "최재우",
                  "neutral": "상대방",
                  "fullName": "최재우",
                  "judgeRef": "최재우 씨"
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
            "솔직히 저는 그 누락을 보자마자 '역시 숨기는 게 더 있구나' 쪽으로 달려갔습니다.",
            "그래서 더 거칠게 판단했습니다."
          ],
          "privateKnowledge": [
            "자료 누락을 빌미로 자기 추정을 사실처럼 밀어붙였다는 반성."
          ],
          "suppressions": [
            "세아가 숨긴 메시지의 수위만 반복해 말하면 사건 균형이 무너진다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:damage_tally"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-2:quote:0",
              "factText": "최재우는 누락을 본 뒤 '더 숨기는 게 있다'는 방향으로 달려갔다고 돌아본다",
              "tags": [
                "quote",
                "motive",
                "threshold"
              ],
              "slots": {},
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:b:d-2:responsibility:0",
              "factText": "선택 삭제를 빌미로 자신의 추정을 사실처럼 밀어붙인 책임",
              "tags": [
                "responsibility",
                "admission"
              ],
              "slots": {},
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
          "disputeId": "d-2",
          "state": "S4",
          "publicClaim": [
            "그 메시지를 보면 누구라도 충격받았을 겁니다.",
            "그런데 저는 그 충격을 확인보다 먼저 행동하는 면죄부처럼 썼어요."
          ],
          "privateKnowledge": [
            "세아의 잘못과 자신의 과잉 대응을 분리해서 봐야 한다고 느낀다."
          ],
          "suppressions": [
            "배우자의 과거를 본 순간 개인적 배신감이 크게 작동했다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-2:emotion:0",
              "factText": "숨겨진 메시지를 본 충격이 확인 절차를 밀어냈다는 고백",
              "tags": [
                "emotion",
                "fear",
                "admission"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "emotional",
                "partial"
              ],
              "usableInSubActions": [
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:b:d-2:counter:2",
              "factText": "문세아의 잘못과 자신의 과잉 대응은 별개로 판단해야 한다는 인식",
              "tags": [
                "counter",
                "rule",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "emotional"
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
            "세아 씨가 옛 메시지 하나를 숨긴 건 맞습니다.",
            "하지만 그 사실만으로 익명 계정 운영자나 현재 조작의 장본인이라고 몰 수는 없습니다."
          ],
          "privateKnowledge": [
            "지금은 자료 누락의 범위와 현재 허위 유포의 범위를 분리해야 한다는 걸 받아들인다."
          ],
          "suppressions": [
            "자신이 그 분리를 가장 늦게 한 사람일 수 있다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-2:admission:0",
              "factText": "문세아의 선택 삭제 자체는 사실이라고 최재우가 인정한다",
              "tags": [
                "admission",
                "evidence"
              ],
              "slots": {
                "message": {
                  "exact": "한유진에게 보낸 모진 메시지 1건",
                  "neutral": "그 메시지"
                }
              },
              "stanceHints": [
                "confess",
                "partial"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:b:d-2:rule:1",
              "factText": "선택 삭제 사실과 익명 계정·현재 조작 책임은 분리해야 한다는 결론",
              "tags": [
                "rule",
                "counter",
                "identity"
              ],
              "slots": {
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "정황상 한유진 씨가 가장 의심스러웠습니다.",
            "예전 일과 닉네임 흔적이 딱 맞아떨어져 보였어요."
          ],
          "privateKnowledge": [
            "실제론 원본 계정도, 로그인 기록도 확인하지 않은 상태였다."
          ],
          "suppressions": [
            "자신이 세아에게서 들은 추측을 더 단단한 사실처럼 받아 적었다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:damage_tally"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-3:identity:0",
              "factText": "최재우는 한유진을 익명 계정의 가장 유력한 운영자로 봤다",
              "tags": [
                "identity",
                "denial",
                "uncertainty"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                },
                "account": {
                  "exact": "익명 SNS 계정",
                  "neutral": "그 계정"
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
              "id": "spouse12:b:d-3:legacy_sentence:0",
              "factText": "예전 일과 닉네임 흔적이 맞아떨어져 보였다는 인상",
              "tags": [
                "legacy_sentence",
                "timeline",
                "context"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
            "확정은 아니었지만, 그쪽을 먼저 의심할 만한 사정이 있다고 봤습니다.",
            "적어도 다른 이름이 바로 떠오르진 않았어요."
          ],
          "privateKnowledge": [
            "'다른 이름이 떠오르지 않았다'는 말은 실제 조사보다 기억 의존이 컸다는 뜻이다."
          ],
          "suppressions": [
            "동창회 준비위원 쪽 접근 가능성을 거의 보지 않았다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:damage_tally"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-3:uncertainty:0",
              "factText": "최재우는 확정은 아니었다고 물러서지만 의심 방향은 유지한다",
              "tags": [
                "uncertainty",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
              "id": "spouse12:b:d-3:context:0",
              "factText": "다른 후보를 찾기보다 과거 기억에 의존했다는 점",
              "tags": [
                "context",
                "motive"
              ],
              "slots": {
                "person": {
                  "exact": "박하린",
                  "neutral": "그 사람",
                  "fullName": "박하린",
                  "judgeRef": "박하린 씨"
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
          "disputeId": "d-3",
          "state": "S2",
          "publicClaim": [
            "맞습니다, 저는 한유진 씨 쪽이라고 생각했습니다.",
            "캡처만 보고 성급하게 그쪽으로 마음이 기울었습니다."
          ],
          "privateKnowledge": [
            "오래된 피해자 서사를 현재 사건의 설명으로 재사용했다는 걸 안다."
          ],
          "suppressions": [
            "원본 계정 비활성화, 캡처 잘림, 접속기록 부재 같은 약한 증거 상태."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-3:admission:0",
              "factText": "최재우는 캡처만 보고 한유진 쪽으로 성급히 기울었다고 인정한다",
              "tags": [
                "admission",
                "evidence",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                },
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
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
              "id": "spouse12:b:d-3:motive:0",
              "factText": "과거 피해자 서사를 현재 사건 설명으로 끌어온 심리",
              "tags": [
                "motive",
                "legacy_sentence",
                "context"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
                }
              },
              "stanceHints": [
                "partial",
                "emotional"
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
            "세아 씨 과거를 알다 보니, 저는 한유진 씨가 다시 움직였다고 믿는 편이 더 편했습니다.",
            "그래야 제 판단도 덜 잔인해 보였거든요."
          ],
          "privateKnowledge": [
            "한유진을 가해자로 상정하면 자신이 세아를 퍼뜨린 책임이 덜해지는 효과가 있었다."
          ],
          "suppressions": [
            "피해자였던 사람을 다시 의심 대상으로 세운 윤리적 문제."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:damage_tally"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-3:self_justification:0",
              "factText": "한유진이 다시 움직였다고 믿는 편이 자신의 판단을 덜 잔인하게 만든다는 고백",
              "tags": [
                "self_justification",
                "motive",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:b:d-3:harm:0",
              "factText": "과거 피해자를 다시 의심 대상으로 세운 데 따른 2차 피해 가능성",
              "tags": [
                "harm",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                }
              },
              "stanceHints": [
                "partial",
                "blame"
              ],
              "usableInSubActions": [
                "empathy_approach",
                "fact_pursuit"
              ]
            }
          ]
        },
        "S4": {
          "disputeId": "d-3",
          "state": "S4",
          "publicClaim": [
            "생각해 보면 그 추측은 상처받은 사람에게 너무 쉬운 방향으로 칼끝을 돌린 거였습니다.",
            "저도 그게 부끄럽습니다."
          ],
          "privateKnowledge": [
            "세아를 지킨다고 하면서 실제로는 또 다른 사람을 희생양 삼았다."
          ],
          "suppressions": [
            "자신이 한유진에게 직접 정정이나 사과를 해야 할 수도 있다는 두려움."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-3:shame:0",
              "factText": "최재우는 상처받은 사람에게 의심의 칼끝을 돌린 점을 부끄러워한다",
              "tags": [
                "shame",
                "harm",
                "emotion"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
              "id": "spouse12:b:d-3:fear:0",
              "factText": "한유진에게 직접 정정해야 할 상황을 두려워한다",
              "tags": [
                "fear",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
            "익명 계정은 한유진 씨 복수가 아니었습니다.",
            "실제 운영 흔적은 박하린 씨 쪽에 있었고, 제가 잘못 짚었습니다."
          ],
          "privateKnowledge": [
            "자신의 잘못된 의심이 세아와 한유진 모두에게 추가 상처를 남겼다고 본다."
          ],
          "suppressions": [
            "정정하면 자신이 얼마나 성급했는지 드러난다는 두려움."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:damage_tally"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-3:institution:0",
              "factText": "플랫폼 계정 복구 기록과 와이파이 로그가 박하린 쪽을 가리킨다는 인정",
              "tags": [
                "institution",
                "evidence",
                "identity"
              ],
              "slots": {
                "person": {
                  "exact": "박하린",
                  "neutral": "그 사람",
                  "fullName": "박하린",
                  "judgeRef": "박하린 씨"
                },
                "mail": {
                  "exact": "버너계정 복구 메일",
                  "neutral": "계정 복구 기록"
                },
                "wifi": {
                  "exact": "동창회장 와이파이 접속기록",
                  "neutral": "행사장 접속 기록"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:b:d-3:admission:1",
              "factText": "최재우는 한유진을 잘못 짚었다고 시인한다",
              "tags": [
                "admission",
                "responsibility",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
            "그 캡처는 당시엔 위조처럼 보이지 않았습니다.",
            "오래된 자료가 다시 나온 걸로 이해했어요."
          ],
          "privateKnowledge": [
            "원본 계정 생성 정보와 댓글 흐름이 잘린 cropped 자료라는 점을 알 수 있었지만 깊게 보지 않았다."
          ],
          "suppressions": [
            "합성 가능성과 사생활 침해 우려가 모두 있는 캡처를 먼저 믿은 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-4:denial:0",
              "factText": "최재우는 해당 캡처가 당시엔 위조처럼 보이지 않았다고 말한다",
              "tags": [
                "denial",
                "evidence"
              ],
              "slots": {
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
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
              "id": "spouse12:b:d-4:timeline:0",
              "factText": "오래된 자료가 다시 등장한 것으로 이해했다는 초기 판단",
              "tags": [
                "timeline",
                "uncertainty",
                "context"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
          "disputeId": "d-4",
          "state": "S1",
          "publicClaim": [
            "원본은 없었지만 정황은 맞아 보였어요.",
            "그 정도면 먼저 움직일 이유는 된다고 생각했습니다."
          ],
          "privateKnowledge": [
            "'원본 없음'이야말로 멈췄어야 할 이유였다는 걸 안다."
          ],
          "suppressions": [
            "cropped 자료의 약한 증거력을 스스로 축소했다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-4:threshold:0",
              "factText": "원본이 없어도 정황이 맞아 보이면 먼저 움직일 수 있다고 본 기준",
              "tags": [
                "threshold",
                "rule",
                "self_justification"
              ],
              "slots": {
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:b:d-4:counter:0",
              "factText": "원본 부재가 오히려 중단 사유였다는 역설",
              "tags": [
                "counter",
                "responsibility",
                "evidence"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "partial"
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
            "포렌식 자료를 보고 나서는 조작 가능성을 부정할 수 없었습니다.",
            "적어도 결정적 증거는 아니었다는 건 인정합니다."
          ],
          "privateKnowledge": [
            "보고서를 보고도 이미 퍼진 말의 방향을 바로 꺾지 못했다."
          ],
          "suppressions": [
            "합성 지점과 재압축 흔적이 명확한데도 여지를 남긴 태도."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-4:admission:0",
              "factText": "최재우는 포렌식 자료를 본 뒤 조작 가능성을 부정할 수 없었다고 인정한다",
              "tags": [
                "admission",
                "institution",
                "evidence"
              ],
              "slots": {
                "forensic": {
                  "exact": "플랫폼 포렌식 보고서",
                  "neutral": "포렌식 자료"
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
              "id": "spouse12:b:d-4:counter:1",
              "factText": "캡처는 결정적 증거가 아니었다는 정정",
              "tags": [
                "counter",
                "rule",
                "evidence"
              ],
              "slots": {
                "capture": {
                  "exact": "미니홈피 방명록 캡처와 문자 이미지",
                  "neutral": "그 캡처 묶음"
                }
              },
              "stanceHints": [
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            }
          ]
        },
        "S3": {
          "disputeId": "d-4",
          "state": "S3",
          "publicClaim": [
            "의심이 생긴 뒤에도 이미 보낸 메시지를 바로 거두진 못했습니다.",
            "제가 틀렸을 수도 있다는 걸 알수록 더 망설였어요."
          ],
          "privateKnowledge": [
            "정정하면 자신이 얼마나 성급하게 퍼뜨렸는지 드러날까 봐 멈췄다."
          ],
          "suppressions": [
            "보고서 이후에도 전달본이 일부 채널에 남아 있었다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-4:admission:1",
              "factText": "최재우는 위조 의심 후에도 보낸 메시지를 바로 거두지 못했다고 인정한다",
              "tags": [
                "admission",
                "responsibility",
                "timeline"
              ],
              "slots": {
                "forensic": {
                  "exact": "플랫폼 포렌식 보고서",
                  "neutral": "포렌식 자료"
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
              "id": "spouse12:b:d-4:fear:0",
              "factText": "정정하면 자신의 성급함이 드러날까 망설였다는 두려움",
              "tags": [
                "fear",
                "shame",
                "motive"
              ],
              "slots": {},
              "stanceHints": [
                "partial",
                "emotional"
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
            "사실 저는 위조 여부보다도 '혹시 진짜면 내 공적 신뢰가 같이 무너진다'는 공포에 더 끌려갔습니다.",
            "그게 제 판단을 더 나쁘게 만들었어요."
          ],
          "privateKnowledge": [
            "배우자 문제와 자신의 승진·직장 이미지를 한 덩어리로 묶어버렸다."
          ],
          "suppressions": [
            "세아보다 먼저 자기 체면을 계산했다는 점."
          ],
          "emotionalLeakRisk": "high",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-4:fear:1",
              "factText": "공적 신뢰 붕괴 공포가 위조 여부 판단보다 앞섰다는 고백",
              "tags": [
                "fear",
                "motive",
                "institution"
              ],
              "slots": {
                "role": {
                  "exact": "구청 홍보팀 주무관",
                  "neutral": "공적 자리"
                }
              },
              "stanceHints": [
                "emotional"
              ],
              "usableInSubActions": [
                "motive_search",
                "empathy_approach"
              ]
            },
            {
              "id": "spouse12:b:d-4:relationship:0",
              "factText": "배우자 문제를 자기 체면과 승진 문제로 먼저 계산한 태도",
              "tags": [
                "relationship",
                "responsibility",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
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
          "disputeId": "d-4",
          "state": "S5",
          "publicClaim": [
            "결정적 2006년 증거처럼 돌던 자료는 2026년 위조본이 맞습니다.",
            "저는 그 가능성을 늦게 인정했고, 그 사이 계속 위험하게 퍼뜨렸습니다."
          ],
          "privateKnowledge": [
            "정정은 포렌식 결론 중심으로, 과거 비난은 접어야 한다고 받아들인다."
          ],
          "suppressions": [
            "사과가 곧 자기 무능 고백처럼 보일까 아직 겁난다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:authority_frame",
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-4:institution:0",
              "factText": "결정적 증거처럼 돌던 자료가 2026년 합성 위조본이라는 인정",
              "tags": [
                "institution",
                "evidence",
                "timeline"
              ],
              "slots": {
                "forensic": {
                  "exact": "플랫폼 포렌식 보고서",
                  "neutral": "포렌식 자료"
                },
                "year": {
                  "exact": "2026년",
                  "neutral": "이번",
                  "dateExact": "2026년",
                  "period": "동창회 직후"
                }
              },
              "stanceHints": [
                "confess"
              ],
              "usableInSubActions": [
                "evidence_present",
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:b:d-4:responsibility:0",
              "factText": "최재우는 위조 가능성 인지 이후에도 확산 위험을 키운 책임을 인정한다",
              "tags": [
                "responsibility",
                "admission",
                "harm"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
                }
              },
              "stanceHints": [
                "confess",
                "emotional"
              ],
              "usableInSubActions": [
                "fact_pursuit",
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
            "2006년 일을 완전한 누명이라고만 보긴 어렵습니다.",
            "세아 씨가 실제로 상처 준 부분이 있었으니까요."
          ],
          "privateKnowledge": [
            "익명 소문 발신자를 특정한 기록은 없다는 점도 알고 있다."
          ],
          "suppressions": [
            "자신이 타인에게 설명할 때는 세아의 거친 장면만 앞세워 말해 왔다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:damage_tally"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-5:counter:0",
              "factText": "최재우는 2006년 사건을 완전한 누명이라고만 보진 않는다",
              "tags": [
                "counter",
                "timeline",
                "relationship"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
              "id": "spouse12:b:d-5:harm:0",
              "factText": "문세아가 실제로 상처 준 부분이 있었다는 진술",
              "tags": [
                "harm",
                "admission",
                "relationship"
              ],
              "slots": {
                "person": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
                }
              },
              "stanceHints": [
                "hedge"
              ],
              "usableInSubActions": [
                "fact_pursuit",
                "empathy_approach"
              ]
            }
          ]
        },
        "S1": {
          "disputeId": "d-5",
          "state": "S1",
          "publicClaim": [
            "다만 제가 바깥에 말할 때는 그 뉘앙스를 너무 단순하게 전달했을 수 있습니다.",
            "익명 소문 문제와 직접 상처 준 문제를 섞어 버렸죠."
          ],
          "privateKnowledge": [
            "지금도 세아 과거를 설명할 때는 자신에게 유리한 버전만 떠오른다."
          ],
          "suppressions": [
            "생활지도실 메모가 익명 발신자를 특정하지 못했다는 핵심."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-5:admission:0",
              "factText": "최재우는 외부에 설명할 때 두 층위를 단순하게 섞었다고 인정한다",
              "tags": [
                "admission",
                "counter",
                "responsibility"
              ],
              "slots": {},
              "stanceHints": [
                "hedge",
                "partial"
              ],
              "usableInSubActions": [
                "fact_pursuit"
              ]
            },
            {
              "id": "spouse12:b:d-5:legacy_sentence:0",
              "factText": "자신에게 유리한 과거 서사만 반복해 왔다는 점",
              "tags": [
                "legacy_sentence",
                "self_justification",
                "context"
              ],
              "slots": {
                "year": {
                  "exact": "2006년",
                  "neutral": "그때",
                  "dateExact": "2006년",
                  "period": "학창시절"
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
            "원본 메일과 학교 기록을 보면 세아 씨가 거칠게 군 건 맞습니다.",
            "하지만 익명 소문 발신자는 기록상 특정되지 않았습니다."
          ],
          "privateKnowledge": [
            "자신이 '거칠게 군 것'을 곧바로 '익명 소문 주도'로 연결해 말해 온 사실을 안다."
          ],
          "suppressions": [
            "기록이 주는 절반의 결론만 취사선택했다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-5:evidence:0",
              "factText": "원본 메일과 학교 기록은 직접 상처는 확인하지만 익명 발신자는 특정하지 못한다",
              "tags": [
                "evidence",
                "counter",
                "institution"
              ],
              "slots": {
                "mail": {
                  "exact": "2006년 원본 메일 묶음과 생활지도실 메모",
                  "neutral": "학교 기록 묶음"
                },
                "school": {
                  "exact": "생활지도실 메모",
                  "neutral": "학교 기록"
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
              "id": "spouse12:b:d-5:responsibility:0",
              "factText": "최재우가 절반의 결론만 취해 더 센 해석을 붙여 왔다는 점",
              "tags": [
                "responsibility",
                "quote",
                "context"
              ],
              "slots": {},
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
          "disputeId": "d-5",
          "state": "S3",
          "publicClaim": [
            "저는 세아 씨 잘못을 말하면 제 외부 전달도 더 정당해질 거라고 생각했던 것 같습니다.",
            "그래서 과거를 더 단정적으로 말했습니다."
          ],
          "privateKnowledge": [
            "배우자의 과거 책임을 자기 현재 행동의 근거로 사용했다."
          ],
          "suppressions": [
            "세아의 직접 상처와 현재 허위 유포를 분리하는 게 오히려 자신의 책임을 키운다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-5:self_justification:0",
              "factText": "최재우는 세아의 과거 잘못을 자기 외부 전달의 근거로 삼았다고 돌아본다",
              "tags": [
                "self_justification",
                "motive",
                "responsibility"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
                }
              },
              "stanceHints": [
                "blame",
                "partial"
              ],
              "usableInSubActions": [
                "motive_search"
              ]
            },
            {
              "id": "spouse12:b:d-5:counter:1",
              "factText": "과거 직접 상처와 현재 허위 유포를 섞을수록 자신의 책임이 커진다는 인식",
              "tags": [
                "counter",
                "rule",
                "responsibility"
              ],
              "slots": {},
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
          "disputeId": "d-5",
          "state": "S4",
          "publicClaim": [
            "솔직히 저는 세아 씨 과거를 떠올릴수록 배우자보다 '내가 이런 사람과 엮여 보이면 어떡하나'를 먼저 생각했습니다.",
            "그건 비겁했습니다."
          ],
          "privateKnowledge": [
            "배우자의 과거를 관계 회복이 아니라 체면 관리 프레임으로 본 걸 부끄러워한다."
          ],
          "suppressions": [
            "한유진의 실제 상처보다 자신의 사회적 위치를 앞세웠다는 점."
          ],
          "emotionalLeakRisk": "medium",
          "tellPool": [
            "spouse12:b:tell:damage_tally",
            "spouse12:b:tell:retro_edit"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-5:shame:0",
              "factText": "최재우는 배우자의 과거를 자기 체면 문제로 먼저 계산한 점을 부끄러워한다",
              "tags": [
                "shame",
                "relationship",
                "fear"
              ],
              "slots": {
                "person": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
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
              "id": "spouse12:b:d-5:beneficiary:0",
              "factText": "과거 설명의 중심에 피해자보다 자신의 사회적 위치를 놓았다는 자각",
              "tags": [
                "beneficiary",
                "responsibility",
                "context"
              ],
              "slots": {
                "role": {
                  "exact": "구청 홍보팀 주무관",
                  "neutral": "공적 자리"
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
            "정리하면, 세아 씨는 2006년에 한유진 씨에게 상처를 줬습니다.",
            "하지만 익명 소문 작성자라는 현재 낙인까지 그대로 이어 붙일 수는 없습니다."
          ],
          "privateKnowledge": [
            "이 구분을 인정해야 지금 사과와 정정이 제대로 작동한다고 본다."
          ],
          "suppressions": [
            "그 구분을 자신이 가장 늦게 받아들였다는 점."
          ],
          "emotionalLeakRisk": "low",
          "tellPool": [
            "spouse12:b:tell:retro_edit",
            "spouse12:b:tell:authority_frame"
          ],
          "claimAtoms": [
            {
              "id": "spouse12:b:d-5:admission:1",
              "factText": "최재우는 문세아의 직접 상처 사실은 인정하되 현재 낙인과는 분리해야 한다고 정리한다",
              "tags": [
                "admission",
                "counter",
                "rule"
              ],
              "slots": {
                "person1": {
                  "exact": "문세아",
                  "neutral": "상대방",
                  "fullName": "문세아",
                  "judgeRef": "문세아 씨"
                },
                "person2": {
                  "exact": "한유진",
                  "neutral": "그 사람",
                  "fullName": "한유진",
                  "judgeRef": "한유진 씨"
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
              "id": "spouse12:b:d-5:identity:0",
              "factText": "익명 소문 작성자 낙인을 과거 상처 사실에 그대로 덧씌울 수 없다는 결론",
              "tags": [
                "identity",
                "counter",
                "responsibility"
              ],
              "slots": {
                "account": {
                  "exact": "익명 소문 작성자 낙인",
                  "neutral": "그 낙인"
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
      }
    }
  }
} as const;

export default spouse12V2Atoms;

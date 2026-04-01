export const family01V3GameLoopData = {
  "caseId": "family-01",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "선이체 자금 흐름",
      "description": "부모 관리계좌 원본과 복원 메모를 겹쳐, 1,800만원 선이체의 실제 용도와 은닉 의도를 함께 캐묻는 카드입니다.",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "이 1,800만원이 부모 관리계좌에서 곧바로 서아 씨 개인계좌로 들어간 흐름 자체는 인정하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.unlock.s2.personal_account_first_route"
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "이체 뒤 부모 병원비보다 카드대금과 보험료가 먼저 빠져나간 점을 보면, 이 선이체의 직접 목적이 무엇이었는지 설명하십시오.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.unlock.s2.transfer_before_care_formal_start"
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "복원 메모의 '먼저 메우고 간병비로 정리'라는 표현까지 확인되면, 나중에 간병비 명목으로 맞춰 말하려 한 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.unlock.s5.relabel_as_care_expense_plan"
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-1.b.q1",
              "text": "은행 원본과 복원 메모가 모두 맞더라도, 이 선이체를 여전히 순수한 횡령으로만 보실 겁니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "공유표 원칙을 들이밀기 전에, 약값과 야간보호사 비용을 뒤늦게 올린 기록은 본인도 인정하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d5b.unlock.s2.late_logs_of_drugs_and_carer"
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "누나의 1,800만원이 더 크다는 이유만으로, 자신의 늦은 기록은 규칙 위반이 아니었다고 보시는 겁니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5b.unlock.s2.not_rule_inside_afterall"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "가족 기록과 수첩",
      "description": "가족 단톡, 간병 스케줄표, 잘린 수첩 사진을 나란히 놓고 지연·공백·상속 해석의 왜곡을 함께 흔드는 카드입니다.",
      "evidenceIds": [
        "e-3",
        "e-4"
      ],
      "relatedDisputes": [
        "d-2",
        "d-3"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-2.a.q1",
              "text": "이 수첩 사진이 올해 2월 다시 저장된 잘린 사본이라는 점은 인정하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d3.unlock.s2.cropped_photo_not_full_context"
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "그 한 줄의 앞뒤 맥락을 보지 않은 채, 상속 예고처럼 꺼내 드신 이유가 무엇입니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.unlock.s3.used_line_as_authority"
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "결국 그 한 줄을 붙든 이유가 실제 상속보다, 해온 일이 지워질까 두려운 마음 쪽에 가까웠다는 점은 인정하십니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.unlock.s4.outside_family_role_fear"
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-2.b.q1",
              "text": "가족 단톡과 스케줄표 원본 기준으로 60만원 입금이 정확히 12일 늦은 건 사실입니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d2.unlock.s2.twelve_day_delay_exact"
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "야간 교대가 한 차례 실제로 비고, 그 시간대에 누나가 대신 움직인 기록은 인정하십니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.unlock.s2.one_shift_gap_exact"
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "약값 직접 결제 내역이 있다고 해서, 그 지연과 공백 책임까지 없어지는 건 아니라는 점도 인정하십니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.unlock.s5.direct_payments_do_not_cancel_delay"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "법적 확인과 의료 기록",
      "description": "변호사 확인서와 사회복지사 기록을 겹쳐, 상속 해석과 첫 달 비용 압박이 어디서부터 과장됐는지 가려내는 카드입니다.",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "d-1",
        "d-3",
        "d-4"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-3.a.q1",
              "text": "전체 수첩 스캔과 변호사 확인서까지 보신 뒤에도, 그 한 줄을 여전히 상속 예고처럼 쓰시겠습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.unlock.s5.full_scan_shows_tax_hospital_context"
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "정식 유언장이나 공증 이력이 없다는 기록까지 확인되면, 그 메모를 재산 권한 근거로 들 수 없다는 점은 인정하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "사회복지사 기록상 첫 달 비용이 98만원 수준까지 낮아질 수 있었다면, 1,800만원을 미리 옮길 필요가 있었다는 주장도 다시 봐야 하는 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d1.unlock.s4.propping_self_to_keep_care_going"
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-3.b.q1",
              "text": "사회복지사 기록 기준으로 퇴원 전 경감 신청과 단기돌봄 연계가 이미 열려 있었다는 점을 인정하십니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d4.unlock.s2.social_worker_guidance_existed"
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "첫 달 비용이 210만원 전액이 아니라 98만원 수준까지 낮아질 수 있었다면, '전액 사비' 판단은 틀렸다고 보십니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d4.unlock.s2.ninetyeight_possible_with_relief"
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "전체 수첩 스캔까지 본 뒤에도 누나를 상속 선점자로 단정하실 겁니까, 아니면 해석을 수정하시겠습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    }
  ],
  "stateUnlockAtoms": {
    "a": {
      "d-1": {
        "S2": [
          {
            "id": "d1.unlock.s2.transfer_before_care_formal_start",
            "factText": "선이체 시점이 본격 간병 시작보다 앞섰다는 사실",
            "tags": [
              "timeline",
              "context",
              "evidence",
              "harm"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "neutral": "그 돈",
                "exact": "1,800만원",
                "rounded": "1천8백만원"
              },
              "time": {
                "neutral": "그 무렵",
                "period": "간병 시작 3주 전"
              },
              "evidence": {
                "neutral": "그 거래내역",
                "fullName": "부모 관리계좌 거래내역과 서아 개인계좌 입금확인서",
                "shortName": "계좌 원본"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d1.unlock.s2.personal_account_first_route",
            "factText": "부모 계좌 돈이 서아 개인계좌를 먼저 거쳤다는 사실",
            "tags": [
              "act",
              "context",
              "identity",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "neutral": "그 돈",
                "exact": "1,800만원",
                "rounded": "1천8백만원"
              },
              "evidence": {
                "neutral": "그 거래내역",
                "fullName": "부모 관리계좌 거래내역과 서아 개인계좌 입금확인서",
                "shortName": "계좌 원본"
              },
              "action": {
                "neutral": "그 경유",
                "exact": "개인계좌 경유"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.unlock.s3.brother_delay_used_as_shield",
            "factText": "도현의 지연과 공백을 자신의 선이체를 방어하는 방패로 끌어왔다는 구조",
            "tags": [
              "relationship",
              "counter",
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "neutral": "동생",
                "fullName": "윤도현",
                "judgeRef": "제 동생",
                "directRef": "도현아",
                "angryRef": "도현!",
                "role": "동생"
              },
              "amount": {
                "neutral": "그 비용",
                "exact": "60만원",
                "rounded": "60만원"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.unlock.s4.fear_of_losing_dutiful_daughter_role",
            "factText": "효녀로 여겨지던 자리가 탐욕으로 뒤집힐까 두려웠다는 감정",
            "tags": [
              "emotion",
              "fear",
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "neutral": "부모님",
                "judgeRef": "부모님",
                "directRef": "부모님",
                "role": "가족 어른"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d1.unlock.s4.propping_self_to_keep_care_going",
            "factText": "자기 형편부터 붙들어야 부모 돌봄도 이어질 거라 믿었다는 속내",
            "tags": [
              "emotion",
              "motive",
              "harm",
              "beneficiary"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "neutral": "부모님",
                "judgeRef": "부모님",
                "directRef": "부모님",
                "role": "가족 어른"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.unlock.s5.card_and_insurance_paid_first",
            "factText": "부모 병원비보다 자신의 카드대금과 보험료가 먼저 처리됐다는 전면 공개",
            "tags": [
              "admission",
              "act",
              "timeline",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "evidence": {
                "neutral": "그 거래내역",
                "fullName": "부모 관리계좌 거래내역과 서아 개인계좌 입금확인서",
                "shortName": "계좌 원본"
              },
              "action": {
                "neutral": "그 처리",
                "exact": "카드대금·보험료 선처리"
              },
              "amount": {
                "neutral": "그 돈",
                "exact": "1,800만원",
                "rounded": "1천8백만원"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d1.unlock.s5.relabel_as_care_expense_plan",
            "factText": "나중에 간병비 선집행처럼 맞춰 말하려 했다는 전면 시인",
            "tags": [
              "admission",
              "motive",
              "quote",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "message": {
                "neutral": "그 메모 문장",
                "quoteExact": "엄마 통장에서 먼저 메우고 간병비로 정리",
                "quoteShort": "먼저 메우고 간병비로 정리"
              },
              "evidence": {
                "neutral": "그 메모",
                "fullName": "서아 휴대폰 메모 복원본과 자동이체 실패 알림",
                "shortName": "복원 메모"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.unlock.s2.cropped_photo_not_full_context",
            "factText": "수첩 사진이 강하게 잘려 있어 전체 맥락을 담지 못한다는 사실",
            "tags": [
              "context",
              "evidence",
              "quote",
              "privacy"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "neutral": "그 사진",
                "fullName": "2021년 아버지 수첩 메모 사진",
                "shortName": "수첩 사진"
              },
              "message": {
                "neutral": "그 한 줄",
                "quoteExact": "집 일은 서아가 맡아",
                "quoteShort": "집 일은 서아가 맡아"
              }
            },
            "stanceHints": [
              "partial",
              "emotional"
            ]
          },
          {
            "id": "d3.unlock.s2.line_meant_task_delegation",
            "factText": "그 문장이 상속이 아니라 당시 서류 실무 위임 맥락에 더 가깝다는 사실",
            "tags": [
              "context",
              "beneficiary",
              "institution",
              "quote"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "message": {
                "neutral": "그 한 줄",
                "quoteExact": "집 일은 서아가 맡아",
                "quoteShort": "집 일은 서아가 맡아"
              },
              "beneficiary": {
                "neutral": "부모님",
                "judgeRef": "부모님",
                "directRef": "부모님",
                "role": "가족 어른"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.unlock.s3.used_line_as_authority",
            "factText": "그 한 줄을 자신의 관리 권한 근거처럼 계속 밀어왔다는 구조",
            "tags": [
              "responsibility",
              "context",
              "relationship",
              "quote"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "message": {
                "neutral": "그 한 줄",
                "quoteExact": "집 일은 서아가 맡아",
                "quoteShort": "집 일은 서아가 맡아"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.unlock.s4.outside_family_role_fear",
            "factText": "돌봄과 서류를 맡아온 자리가 한순간에 집 밖 사람처럼 밀릴까 무서웠다는 감정",
            "tags": [
              "emotion",
              "fear",
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "beneficiary": {
                "neutral": "부모님",
                "judgeRef": "부모님",
                "directRef": "부모님",
                "role": "가족 어른"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d3.unlock.s4.mixed_care_credit_with_inheritance_expectation",
            "factText": "돌봄 인정 욕구를 상속 기대와 한 덩어리로 붙여 버렸다는 자각",
            "tags": [
              "emotion",
              "motive",
              "shame",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "message": {
                "neutral": "그 한 줄",
                "quoteExact": "집 일은 서아가 맡아",
                "quoteShort": "집 일은 서아가 맡아"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.unlock.s5.full_scan_shows_tax_hospital_context",
            "factText": "전체 스캔에는 '세금, 병원 서류' 맥락이 이어져 있다는 공개",
            "tags": [
              "admission",
              "context",
              "institution",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "evidence": {
                "neutral": "그 전체 자료",
                "fullName": "상속 상담 변호사 확인서와 수첩 전체 스캔본",
                "shortName": "전체 스캔본"
              },
              "message": {
                "neutral": "그 맥락",
                "quoteExact": "세금, 병원 서류",
                "quoteShort": "세금·병원 서류"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d3.unlock.s5.used_note_as_property_authority",
            "factText": "상속 지정이 아닌 메모를 재산 권한 근거처럼 사용했다는 시인",
            "tags": [
              "admission",
              "responsibility",
              "quote",
              "shame"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "message": {
                "neutral": "그 한 줄",
                "quoteExact": "집 일은 서아가 맡아",
                "quoteShort": "집 일은 서아가 맡아"
              },
              "evidence": {
                "neutral": "그 전체 자료",
                "fullName": "상속 상담 변호사 확인서와 수첩 전체 스캔본",
                "shortName": "전체 스캔본"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5a.unlock.s2.unlogged_1800_despite_rule",
            "factText": "공유표 원칙을 알면서도 1,800만원을 기록 없이 움직였다는 사실",
            "tags": [
              "rule",
              "threshold",
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              },
              "amount": {
                "neutral": "그 돈",
                "exact": "1,800만원",
                "rounded": "1천8백만원"
              },
              "evidence": {
                "neutral": "그 거래내역",
                "fullName": "부모 관리계좌 거래내역과 서아 개인계좌 입금확인서",
                "shortName": "계좌 원본"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          },
          {
            "id": "d5a.unlock.s2.brother_late_logs_exist",
            "factText": "도현 역시 약값과 보호사 비용 기록을 뒤늦게 올렸다는 사실",
            "tags": [
              "rule",
              "relationship",
              "context",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "neutral": "동생",
                "fullName": "윤도현",
                "judgeRef": "제 동생",
                "directRef": "도현아",
                "angryRef": "도현!",
                "role": "동생"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              }
            },
            "stanceHints": [
              "partial",
              "blame"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5a.unlock.s3.not_only_betrayer_frame",
            "factText": "혼자 배신자가 되지 않으려 동생의 늦은 기록을 함께 끌어왔다는 구조",
            "tags": [
              "relationship",
              "counter",
              "responsibility",
              "context"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person": {
                "neutral": "동생",
                "fullName": "윤도현",
                "judgeRef": "제 동생",
                "directRef": "도현아",
                "angryRef": "도현!",
                "role": "동생"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5a.unlock.s4.daughter_role_as_exception",
            "factText": "장녀로서 많이 했으니 이번엔 예외여도 된다고 스스로 허락했다는 감정",
            "tags": [
              "emotion",
              "motive",
              "shame",
              "rule"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d5a.unlock.s4.wanted_credit_more_than_rule",
            "factText": "규칙을 지키는 것보다 인정받는 쪽을 더 붙들었다는 속내",
            "tags": [
              "emotion",
              "motive",
              "relationship",
              "shame"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5a.unlock.s5.i_broke_first_and_bigger",
            "factText": "공유표 원칙을 먼저 그리고 더 크게 깬 쪽이 자신이라는 전면 인정",
            "tags": [
              "admission",
              "responsibility",
              "rule",
              "threshold"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "neutral": "그 돈",
                "exact": "1,800만원",
                "rounded": "1천8백만원"
              },
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d5a.unlock.s5.used_brother_delay_as_cover",
            "factText": "도현의 늦은 기록을 자기 위반을 덜어내는 방패로 썼다는 시인",
            "tags": [
              "admission",
              "relationship",
              "counter",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "neutral": "동생",
                "fullName": "윤도현",
                "judgeRef": "제 동생",
                "directRef": "도현아",
                "angryRef": "도현!",
                "role": "동생"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      }
    },
    "b": {
      "d-2": {
        "S2": [
          {
            "id": "d2.unlock.s2.twelve_day_delay_exact",
            "factText": "야간 보호사 비용 60만원이 정확히 12일 늦었다는 사실",
            "tags": [
              "timeline",
              "amount",
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "neutral": "그 비용",
                "exact": "60만원",
                "rounded": "60만원"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              },
              "time": {
                "neutral": "그만큼 늦게",
                "period": "12일 늦게"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          },
          {
            "id": "d2.unlock.s2.one_shift_gap_exact",
            "factText": "출장 때문에 야간 교대가 한 차례 실제로 비었다는 사실",
            "tags": [
              "timeline",
              "act",
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              },
              "time": {
                "neutral": "그 주",
                "period": "첫 주"
              },
              "action": {
                "neutral": "그 공백",
                "exact": "야간 교대 공백"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.unlock.s3.direct_payment_not_zero",
            "factText": "지연과 별개로 약값을 직접 낸 항목도 같이 존재한다는 사실",
            "tags": [
              "context",
              "evidence",
              "responsibility",
              "amount"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              },
              "action": {
                "neutral": "그 결제",
                "exact": "약값 직접 결제"
              }
            },
            "stanceHints": [
              "blame",
              "partial"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.unlock.s4.kept_calling_it_delay_only",
            "factText": "약속 위반을 계속 '미룬 것'이라고만 부르며 버텼다는 자각",
            "tags": [
              "emotion",
              "shame",
              "responsibility",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount": {
                "neutral": "그 비용",
                "exact": "60만원",
                "rounded": "60만원"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d2.unlock.s4.knew_sister_was_left_alone",
            "factText": "누나가 혼자 남겨졌다고 느낄 시간을 자신도 알고 있었다는 자각",
            "tags": [
              "emotion",
              "relationship",
              "harm",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "neutral": "누나",
                "fullName": "윤서아",
                "judgeRef": "제 누나",
                "directRef": "누나",
                "angryRef": "누나!",
                "role": "누나"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.unlock.s5.gap_burden_went_to_sister",
            "factText": "지연과 공백의 부담이 결국 제 누나에게 갔다는 전면 인정",
            "tags": [
              "admission",
              "relationship",
              "responsibility",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "neutral": "누나",
                "fullName": "윤서아",
                "judgeRef": "제 누나",
                "directRef": "누나",
                "angryRef": "누나!",
                "role": "누나"
              },
              "amount": {
                "neutral": "그 비용",
                "exact": "60만원",
                "rounded": "60만원"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d2.unlock.s5.direct_payments_do_not_cancel_delay",
            "factText": "직접 낸 약값이 있어도 지연 책임을 지우진 못한다는 인정",
            "tags": [
              "admission",
              "context",
              "responsibility",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              },
              "amount": {
                "neutral": "그 비용",
                "exact": "60만원",
                "rounded": "60만원"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.unlock.s2.social_worker_guidance_existed",
            "factText": "퇴원 전 사회복지사가 경감 신청과 단기돌봄 연계를 안내했다는 사실",
            "tags": [
              "institution",
              "evidence",
              "timeline",
              "context"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person": {
                "neutral": "사회복지사",
                "fullName": "조혜진",
                "judgeRef": "조혜진 사회복지사",
                "directRef": "조혜진 사회복지사",
                "role": "병원 사회복지사"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "병원 사회복지사 장기요양 경감 신청 기록과 첫 달 산정표",
                "shortName": "사회복지사 기록"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          },
          {
            "id": "d4.unlock.s2.ninetyeight_possible_with_relief",
            "factText": "경감과 단기돌봄을 적용하면 첫 달 비용이 98만원 수준까지 낮아질 수 있었다는 사실",
            "tags": [
              "institution",
              "amount",
              "context",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount": {
                "neutral": "그 수준",
                "exact": "98만원",
                "rounded": "98만원"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "병원 사회복지사 장기요양 경감 신청 기록과 첫 달 산정표",
                "shortName": "사회복지사 기록"
              },
              "person": {
                "neutral": "사회복지사",
                "fullName": "조혜진",
                "judgeRef": "조혜진 사회복지사",
                "directRef": "조혜진 사회복지사",
                "role": "병원 사회복지사"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.unlock.s3.assumption_spoken_as_fact",
            "factText": "확인하지 않은 비용 가정을 사실처럼 단정해 말해 왔다는 구조",
            "tags": [
              "responsibility",
              "context",
              "shame",
              "amount"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "neutral": "첫 달 비용",
                "exact": "210만원",
                "rounded": "210만원"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.unlock.s4.did_not_check_process_to_end",
            "factText": "절차를 끝까지 확인하지 못한 채 비용 공포만 크게 붙들었다는 자각",
            "tags": [
              "emotion",
              "shame",
              "institution",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person": {
                "neutral": "사회복지사",
                "fullName": "조혜진",
                "judgeRef": "조혜진 사회복지사",
                "directRef": "조혜진 사회복지사",
                "role": "병원 사회복지사"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "병원 사회복지사 장기요양 경감 신청 기록과 첫 달 산정표",
                "shortName": "사회복지사 기록"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d4.unlock.s4.panic_made_cash_only_assumption",
            "factText": "퇴원 직후의 공포가 '현금밖에 답이 없다'는 가정을 키웠다는 감정",
            "tags": [
              "emotion",
              "fear",
              "harm",
              "motive"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount": {
                "neutral": "첫 달 비용",
                "exact": "210만원",
                "rounded": "210만원"
              },
              "time": {
                "neutral": "그 주",
                "period": "첫 주"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.unlock.s5.first_month_not_all_private",
            "factText": "첫 달 비용을 형제 사비로만 감당해야 했던 것은 아니라는 전면 인정",
            "tags": [
              "admission",
              "context",
              "institution",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount": {
                "neutral": "그 수준",
                "exact": "98만원",
                "rounded": "98만원"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "병원 사회복지사 장기요양 경감 신청 기록과 첫 달 산정표",
                "shortName": "사회복지사 기록"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d4.unlock.s5.cannot_blame_sister_only",
            "factText": "이 부분을 제 누나만의 성급함으로 돌릴 수 없다는 인정",
            "tags": [
              "admission",
              "relationship",
              "responsibility"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "neutral": "누나",
                "fullName": "윤서아",
                "judgeRef": "제 누나",
                "directRef": "누나",
                "angryRef": "누나!",
                "role": "누나"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5b.unlock.s2.late_logs_of_drugs_and_carer",
            "factText": "약값과 야간보호사 비용 기록이 뒤늦게 올라간 사실",
            "tags": [
              "rule",
              "timeline",
              "evidence",
              "admission"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              },
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          },
          {
            "id": "d5b.unlock.s2.not_rule_inside_afterall",
            "factText": "자신도 공유표 원칙 안쪽에 있었던 사람은 아니라는 사실",
            "tags": [
              "rule",
              "responsibility",
              "admission",
              "shame"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "partial",
              "confess"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5b.unlock.s3.scale_difference_used_as_shield",
            "factText": "규모 차이를 방패로 삼아 자기 위반을 작게 말해온 구조",
            "tags": [
              "responsibility",
              "context",
              "rule",
              "shame"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount": {
                "neutral": "그 돈",
                "exact": "1,800만원",
                "rounded": "1천8백만원"
              },
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "blame",
              "emotional"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5b.unlock.s4.played_rule_guardian_to_save_face",
            "factText": "규칙 수호자처럼 말하며 체면을 세우려 했다는 감정",
            "tags": [
              "emotion",
              "shame",
              "rule",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              },
              "person": {
                "neutral": "누나",
                "fullName": "윤서아",
                "judgeRef": "제 누나",
                "directRef": "누나",
                "angryRef": "누나!",
                "role": "누나"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          },
          {
            "id": "d5b.unlock.s4.numbers_first_to_shrink_fault",
            "factText": "숫자와 분류를 앞세워 자신의 늦은 기록을 축소했다는 자각",
            "tags": [
              "emotion",
              "shame",
              "responsibility",
              "evidence"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              },
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              }
            },
            "stanceHints": [
              "emotional",
              "confess"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5b.unlock.s5.both_broke_rule_but_i_minimized_mine",
            "factText": "쌍방 위반이 맞더라도 자신의 위반을 지나치게 작게 말해 왔다는 시인",
            "tags": [
              "admission",
              "responsibility",
              "rule",
              "shame"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "rule": {
                "neutral": "그 기준",
                "exact": "50만원 이상 간병비와 부모 통장 사용은 공유표에 먼저 남긴다",
                "shortName": "공유표 원칙"
              },
              "person": {
                "neutral": "누나",
                "fullName": "윤서아",
                "judgeRef": "제 누나",
                "directRef": "누나",
                "angryRef": "누나!",
                "role": "누나"
              }
            },
            "stanceHints": [
              "confess"
            ]
          },
          {
            "id": "d5b.unlock.s5.my_delay_also_fed_distrust",
            "factText": "늦은 기록 역시 제 누나의 불신을 키웠다는 인정",
            "tags": [
              "admission",
              "relationship",
              "harm",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person": {
                "neutral": "누나",
                "fullName": "윤서아",
                "judgeRef": "제 누나",
                "directRef": "누나",
                "angryRef": "누나!",
                "role": "누나"
              },
              "evidence": {
                "neutral": "그 기록",
                "fullName": "가족 단톡과 간병 스케줄표 원본",
                "shortName": "스케줄표"
              }
            },
            "stanceHints": [
              "confess"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "contradiction-1",
        "statementA": "서아는 선이체가 집안 전체를 위한 급한 조치였다고 말했습니다.",
        "statementB": "그런데 계좌 원본과 복원 메모에는 부모 병원비보다 자신의 카드대금과 보험료가 먼저 처리된 흐름이 남아 있습니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-1에 contradiction token 생성, 서아의 다음 자기정당화 1회 축소, 적중 시 lieState +1"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "현재 추궁은 유지되지만 모순 토큰을 확보하지 못하고 지나간다"
          }
        },
        "npcReaction": "…그 순서가 그렇게 남아 있다면, 네, 제 형편을 먼저 세운 건 부정하지 못하겠습니다. 다만 그걸로 부모 일을 전혀 생각 안 했다고까지는 말하지 말아 주십시오."
      },
      {
        "id": "contradiction-2",
        "statementA": "서아는 아버지 수첩의 한 줄이 자신의 역할을 인정한 말이라고 주장했습니다.",
        "statementB": "하지만 전체 스캔과 변호사 확인서는 그 문장이 세금과 병원 서류 위임 맥락이라고 보여 줍니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-3에 contradiction token 생성, 서아의 상속 해석 방어 1회 차단, 적중 시 emotional path 개방"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "현재 흐름은 유지되지만 잘린 사진의 함정 효과를 플레이어가 직접 활용하지 못한다"
          }
        },
        "npcReaction": "그 한 줄이 전부는 아니라는 건 압니다. 그래도 저는 그 말을 붙들지 않으면 제가 해온 시간까지 같이 지워질 것 같았습니다."
      },
      {
        "id": "contradiction-3",
        "statementA": "도현은 60만원 건은 미납이 아니라 단지 미뤄진 것에 가깝다고 말했습니다.",
        "statementB": "그런데 원본 스케줄표에는 12일 지연과 한 차례 야간 공백이 분명히 남아 있습니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-2에 contradiction token 생성, 도현의 clipped_denial 1회 무효화, 적중 시 lieState +1"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "수치 기록은 남지만, 방어 축소 보너스 없이 다음 질문으로 넘어간다"
          }
        },
        "npcReaction": "…늦은 건 맞습니다. 제가 그걸 계속 '미뤘다'는 말 안으로만 넣어 두려 했다는 점도 부정하지 않겠습니다."
      },
      {
        "id": "contradiction-4",
        "statementA": "도현은 첫 달 비용을 형제 사비로만 막는 수밖에 없었다고 말했습니다.",
        "statementB": "하지만 사회복지사 기록에는 경감 신청과 단기돌봄 연계가 이미 열려 있었다고 적혀 있습니다.",
        "options": {
          "point_out": {
            "label": "이 모순을 지적한다",
            "effect": "d-4에 contradiction token 생성, 도현의 비용 공포 서술 1회 축소, 적중 시 confession window 1턴 개방"
          },
          "let_go": {
            "label": "넘어간다",
            "effect": "현재 카드 정보는 유지되지만, 비용 계산 오류를 직접 돌파하는 기회를 놓친다"
          }
        },
        "npcReaction": "기록이 그렇다면 제 계산이 틀렸던 겁니다. 다만 그때 제가 느낀 압박까지 없었던 일처럼 되진 않습니다."
      }
    ],
    "interjections": [
      {
        "id": "interjection-1",
        "interruptor": "a",
        "interjectionLine": "잠깐만요, 60만원 12일만 남기면 제가 밤마다 병원 뛰고 어머니 챙긴 시간은 다 빠집니다. 그 표는 빈칸만 아니라 누가 메웠는지도 같이 보셔야 합니다.",
        "options": {
          "allow": {
            "label": "허용한다",
            "effect": "d-2 관련 empathy hook 1개 획득, 서아 감정 노출 힌트 해금"
          },
          "block": {
            "label": "제지한다",
            "effect": "현재 focus dispute 유지, 다음 도현 응답 sentenceCount -1, 재판관 권위 보너스"
          }
        }
      },
      {
        "id": "interjection-2",
        "interruptor": "b",
        "interjectionLine": "누나, 잘린 수첩 사진 한 장으로 상속 얘기까지 가실 겁니까. 전체 스캔부터 보게 해 주세요, 그 한 줄만 들고 가면 또 결론부터 납니다.",
        "options": {
          "allow": {
            "label": "허용한다",
            "effect": "dossier-3의 context challenge 1회 무료 개방, d-3 hidden hook 강화"
          },
          "block": {
            "label": "제지한다",
            "effect": "현재 서아 추궁 흐름 유지, 대신 도현의 억울함 누설 위험 +1"
          }
        }
      },
      {
        "id": "interjection-3",
        "interruptor": "a",
        "interjectionLine": "그 98만원 계산표만 내밀면, 퇴원 직후 누가 부모님 앞에서 바로 돈부터 구해 뛰었는지는 또 빠집니다. 절차가 있었다고 해서 그날의 공포까지 없던 건 아니잖아요.",
        "options": {
          "allow": {
            "label": "허용한다",
            "effect": "d-4 감정 경로 힌트 해금, 현재 압박을 empathy_approach 우위로 전환"
          },
          "block": {
            "label": "제지한다",
            "effect": "d-4 사실추궁 보너스 +1, 서아의 희생 나열 1회 차단"
          }
        }
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "outburst-a-1",
        "party": "a",
        "outburstLine": "제가 안 당겨 썼으면 그 집 카드도 약값도 같이 무너졌어요. 돈만 남기면 저는 또 욕심낸 장녀 되는 거예요.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "서아 emotionalLeakRisk +1, 다음 사실추궁 적중 시 d-1 S4 진입 가능"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "trustTowardJudge +12, d-1 confession window 1턴 개방"
          }
        }
      },
      {
        "id": "outburst-a-2",
        "party": "a",
        "outburstLine": "아버지 그 한 줄마저 아니면 저는 집에서 뭐였습니까. 서류도 병원도 다 붙들어놓고, 이제 와서 탐욕이라고 하면 너무 잔인하잖아요.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "서아 emotionalLeakRisk +1, 다음 d-3 추궁 적중 시 상속 해석 왜곡 원인 노출"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "trustTowardJudge +10, d-3 emotional atom 우선 개방"
          }
        }
      },
      {
        "id": "outburst-b-1",
        "party": "b",
        "outburstLine": "60만원 12일 늦은 걸로 저를 평생 불효자처럼 세우실 겁니까. 늦은 건 맞지만, 제가 아예 도망간 사람은 아니었습니다.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "도현 emotionalLeakRisk +1, 다음 fact_pursuit 적중 시 d-2 S4 진입 가능"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "trustTowardJudge +10, d-2 confession window 1턴 개방"
          }
        }
      },
      {
        "id": "outburst-b-2",
        "party": "b",
        "outburstLine": "누나는 1,800만원을 숨기고도, 저는 늦게 올린 영수증 몇 장 때문에 규칙을 말할 자격도 없다는 겁니까. 그건 계산도, 사람 취급도 아닙니다.",
        "options": {
          "press": {
            "label": "더 압박한다",
            "effect": "도현 emotionalLeakRisk +1, 다음 d-5 동기탐색 적중 시 체면 보호 동기 노출"
          },
          "calm": {
            "label": "진정시킨다",
            "effect": "trustTowardJudge +11, d-5 emotional atom 우선 개방"
          }
        }
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "tb-a-d1-s1-s2",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "그 계좌 원본까지 보셨다면, 네, 1,800만원이 제 계좌로 먼저 들어온 건 숨기기 어렵습니다. 다만 그걸 제 욕심 한 단어로만 정리하시면, 그때 어머니 일과 집안 비용이 한꺼번에 몰린 사정은 전부 잘려 나갑니다.",
      "behaviorHint": "원본 거래내역 쪽에서 시선이 멈추고, 마지막 문장만 길게 이어 붙이며 억울함을 참는다."
    },
    {
      "id": "tb-a-d1-s2-s3",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "왜 저만 부모 돈 빼돌린 사람처럼 세우십니까. 도현아는 60만원도 제때 못 넣고 야간 칸까지 비워 놓고, 제 쪽에 남은 부담은 하나도 계산 안 하잖아요.",
      "behaviorHint": "손가락으로 동생 쪽을 짚다가 마지막 문장에서 목소리가 높아진다."
    },
    {
      "id": "tb-a-d1-s3-s4",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "네, 저는 그 1,800만원 앞에서 먼저 제 카드값이랑 보험료를 붙들었습니다. 아버지, 어머니 돌봄까지 무너지면 다 제 탓이 될까 봐, 제 형편부터 세워 놓고 버텨야 한다는 생각밖에 안 났어요.",
      "behaviorHint": "희생을 열거하다가 끊고, '제 탓이 될까 봐'에서만 목이 잠긴다."
    },
    {
      "id": "tb-a-d1-s4-s5",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "제가 아버지 관리계좌에서 1,800만원을 먼저 옮긴 건 사실입니다. 카드대금과 보험료를 막고, 나중에 간병비 선집행처럼 맞춰 보려 했습니다. 장녀라는 명분으로 부모 돈과 제 돈의 경계를 제가 먼저 무너뜨렸습니다.",
      "behaviorHint": "금액은 또렷하게 말하지만 마지막 문장으로 갈수록 시선이 바닥으로 떨어진다."
    },
    {
      "id": "tb-b-d2-s1-s2",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "그 원본 스케줄표까지 보셨다면, 60만원이 12일 늦은 건 더는 줄여 말할 수 없습니다. 야간 교대 한 번 비운 것도 사실이고요. 다만 그걸로 제가 아예 빠진 사람처럼 정리되면 기록이 반쪽이 됩니다.",
      "behaviorHint": "표의 날짜와 금액을 먼저 짚고, 마지막 문장에서만 입술을 한 번 깨문다."
    },
    {
      "id": "tb-b-d2-s2-s3",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "누나는 늘 빈 야간 칸이랑 12일 지연만 앞에 세웁니다. 그런데 같은 표에 약값 직접 결제랑 이동시간도 찍혀 있잖아요. 늦은 책임은 제 겁니다만, 희생 서사 때문에 숫자 전체를 잘라낼 수는 없습니다.",
      "behaviorHint": "차분하게 나열하다가 '희생 서사'에서만 짧게 비웃듯 숨을 뱉는다."
    },
    {
      "id": "tb-b-d2-s3-s4",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "저는 계속 '미뤘다'고만 부르며 버텼습니다. 사실은 누나가 혼자 남겨졌다고 느낄 만한 시간을 제가 만들었는데, 그걸 인정하면 곧바로 불효자 낙인이 찍힐 것 같아서요.",
      "behaviorHint": "초반에는 건조하게 말하다가 마지막 문장에서만 고개를 들지 못한다."
    },
    {
      "id": "tb-b-d2-s4-s5",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-2",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "첫 주 60만원을 제가 12일 늦게 낸 건 사실입니다. 야간 교대도 한 번 비웠고, 그 부담이 제 누나에게 간 것도 인정합니다. 제가 직접 약값을 낸 적이 있어도 그 지연 책임까지 없어지는 건 아닙니다.",
      "behaviorHint": "금액과 횟수를 또박또박 말한 뒤, 마지막 문장에서만 목소리가 낮아진다."
    },
    {
      "id": "tb-a-d3-s1-s2",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "그 사진이 잘린 사본이라는 점까지 보셨다면, 네, 그 한 줄만으로 상속이 확정된다고 말하긴 어렵습니다. 그래도 저는 아버지가 제게 맡겨 온 일들과 그 문장을 쉽게 떼어 놓을 수가 없었습니다.",
      "behaviorHint": "수첩 사진을 쥔 손에 힘이 들어가고, 두 번째 문장에서만 감정이 묻어난다."
    },
    {
      "id": "tb-a-d3-s2-s3",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "제 동생은 늘 '유언 아니면 아니다' 식으로 잘라 말합니다. 하지만 그렇게 잘라내면, 아버지 서류랑 어머니 병원 일을 붙들어 온 제 시간은 통째로 공짜가 됩니다.",
      "behaviorHint": "동생의 표현을 따라 하듯 되받아친 뒤, 마지막 문장에서 억울함을 밀어 넣는다."
    },
    {
      "id": "tb-a-d3-s3-s4",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "맞습니다, 그 한 줄이 법적으로 상속 지정은 아니었습니다. 그래도 제가 그 말을 그렇게까지 붙든 건, 아버지와 어머니 일을 해온 제가 한순간에 집 밖 사람처럼 밀려날까 무서웠기 때문입니다.",
      "behaviorHint": "처음엔 고집스럽게 버티다가 '무서웠기 때문입니다'에서만 목이 갈라진다."
    },
    {
      "id": "tb-a-d3-s4-s5",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-3",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "아버지 수첩의 '집 일은 서아가 맡아'는 상속 지정이 아니었습니다. 그건 세금과 병원 서류를 맡기겠다는 맥락이었는데, 저는 돌봄 인정 욕구를 거기다 덧씌워 재산 권한처럼 붙들었습니다. 그 과장은 제 몫입니다.",
      "behaviorHint": "수첩을 내려놓고 두 문장째부터는 재판관 쪽을 보지 못한다."
    },
    {
      "id": "tb-b-d4-s1-s2",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "그 사회복지사 기록이 있다면, 네, 제가 첫 달 비용을 너무 단선적으로 봤을 가능성은 인정하겠습니다. 다만 그때 제 눈에는 당장 현금부터 막아야 한다는 압박만 크게 보였습니다.",
      "behaviorHint": "서류를 넘기다 멈추고 첫 문장은 짧게, 두 번째 문장은 눌러 담듯 말한다."
    },
    {
      "id": "tb-b-d4-s2-s3",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "경감 절차가 있었다고 해서 그날 비용 공포가 없었던 건 아니잖습니까. 누나는 성급했고, 저도 절차 확인을 끝까지 못 했습니다. 그런데 지금 와서 그 부담을 전부 허상처럼 말하면 또 반쪽 복원입니다.",
      "behaviorHint": "숫자를 앞세워 말하다가 '반쪽 복원'에서만 마른 빈정거림이 섞인다."
    },
    {
      "id": "tb-b-d4-s3-s4",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "숫자로 정리하면 제가 틀렸습니다. 첫 달 210만원 전액을 형제 사비로 막아야 한다는 계산은 아니었고, 저는 그 절차를 확인하지 못했습니다. 솔직히 말하면 몸으로만 뛰다 서류를 놓친 쪽에 가까웠습니다.",
      "behaviorHint": "처음 두 문장은 딱딱하게 정리하지만, 마지막 문장에서만 스스로를 비꼬듯 웃는다."
    },
    {
      "id": "tb-b-d4-s4-s5",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-4",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "첫 달 간병비를 형제 사비로만 감당해야 했던 건 아니었습니다. 퇴원 전 경감 신청과 단기돌봄 연계가 열려 있었는데, 제가 그걸 끝까지 확인하지 못했습니다. 그래서 이 부분을 제 누나만의 성급함으로 돌릴 수는 없습니다.",
      "behaviorHint": "'아니었습니다'를 또렷하게 끊고, 마지막 문장에서만 고개를 숙인다."
    },
    {
      "id": "tb-a-d5-s1-s2",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "공유표 원칙이 있었다는 건 부정하지 않겠습니다. 네, 1,800만원을 먼저 옮기고도 그걸 바로 남기지 않았습니다. 다만 그때 제 머리에는 기록보다 어머니 곁이 먼저였다는 말까지 거짓으로 만들 순 없습니다.",
      "behaviorHint": "원칙을 인정하는 첫 문장은 낮게, 마지막 문장은 감정이 새도록 길어진다."
    },
    {
      "id": "tb-a-d5-s2-s3",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "왜 저만 규칙을 깬 사람처럼 남겨 두십니까. 도현아도 약값이랑 보호사 비용을 뒤늦게 올려놓고, 막상 저를 세울 땐 자기 기록 지연은 전부 작은 실수처럼 밀어 넣잖아요.",
      "behaviorHint": "고개를 들고 반문하듯 밀어붙이다가, 동생 이름에서만 힘이 세진다."
    },
    {
      "id": "tb-a-d5-s3-s4",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "제일 창피한 건, 제가 장녀니까 이번만큼은 예외여도 된다고 스스로 허락했다는 점입니다. 돌봄을 많이 했다는 마음에 규칙보다 인정받는 쪽을 더 붙들고 버텼습니다.",
      "behaviorHint": "희생을 말하다가 멈추고, '창피한 건' 이후부터는 눈을 들지 못한다."
    },
    {
      "id": "tb-a-d5-s4-s5",
      "caseId": "family-01",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "공유표 원칙은 저희 둘 다 어겼습니다. 그런데 먼저, 그리고 더 크게 무너뜨린 쪽은 저였습니다. 저는 1,800만원 선이체를 숨겼고, 도현이의 늦은 기록을 제 위반을 덜어내는 방패로 썼습니다.",
      "behaviorHint": "원칙 이야기를 꺼내며 숨을 고르고, 마지막 문장에서는 동생 이름을 작게 삼킨다."
    },
    {
      "id": "tb-b-d5-s1-s2",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "primaryBeatType": "evidence_hit",
      "secondaryBeatType": "partial",
      "line": "저도 공유표를 완벽히 지킨 건 아닙니다. 약값이랑 야간보호사 비용 기록을 늦게 올린 건 제 책임입니다. 다만 그걸 이유로 1,800만원 선이체 은닉까지 같은 무게로 접어 버리면 기준이 흐려집니다.",
      "behaviorHint": "처음 두 문장은 짧게 끊고, 마지막 문장에서만 계산하듯 속도를 늦춘다."
    },
    {
      "id": "tb-b-d5-s2-s3",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "primaryBeatType": "blame",
      "line": "누나는 '둘 다 어겼다'는 말로 시작점이랑 규모를 지워 버립니다. 제 늦은 기록이 책임이 없다는 뜻은 아니지만, 1,800만원 선이체랑 같은 칸에 눕히는 건 계산이 틀립니다.",
      "behaviorHint": "손으로 칸을 나누듯 허공을 자르며 말하고, 마지막 문장은 짧게 내리꽂는다."
    },
    {
      "id": "tb-b-d5-s3-s4",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S4",
      "primaryBeatType": "emotional",
      "line": "공유표 원칙을 가장 자주 들이민 사람이 저였는데, 정작 제 기록도 늦었습니다. 그래서 더 숫자와 분류만 붙들고 버텼던 것 같습니다. 규칙 수호자처럼 서야 제 체면이 남을 것 같았거든요.",
      "behaviorHint": "첫 문장은 딱딱하게 정리하지만, 마지막엔 자조가 섞인 짧은 웃음이 새어 나온다."
    },
    {
      "id": "tb-b-d5-s4-s5",
      "caseId": "family-01",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S5",
      "primaryBeatType": "confession",
      "line": "공유표 원칙은 저희 둘 다 어겼습니다. 제 누나는 1,800만원 선이체를 숨겼고, 저는 약값과 야간보호사 비용 기록을 늦게 올렸습니다. 규모 차이를 방패로 제 위반을 지나치게 작게 말한 건 제 체면 보호였습니다.",
      "behaviorHint": "항목을 나열하듯 또박또박 말하다가, 마지막 문장에서만 시선이 비껴난다."
    }
  ]
} as const;

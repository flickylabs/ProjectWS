export const family09V3GameLoopData = {
  "caseId": "family-09",
  "dossierCards": [
    {
      "id": "dossier-1",
      "name": "잘린 캡처와 원본 스레드",
      "description": "선택적 캡처가 만든 단독 횡령 서사와 원본 공모 맥락을 동시에 검증하는 카드",
      "evidenceIds": [
        "e-1",
        "e-2"
      ],
      "relatedDisputes": [
        "d-1",
        "d-3",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-1.a.q1",
              "text": "캡처를 잘라 제출할 때, 바로 앞 대화에 본인이 제 몫 입금 시점을 재촉한 문장이 있다는 점을 알고 계셨습니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.a.unlock.s2.broker_text_ack",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q2",
              "text": "재판관이 원본 스레드를 기준으로 묻습니다. '내 건 왜 아직이냐'는 문장을 보낸 뒤에도 자신이 분배 기준을 몰랐다고 답하시겠습니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.a.unlock.s3.equal_split_ack",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.a.q3",
              "text": "중개사 원본 대화에 '부모님 앞에서는 순수 매매가만'이라는 표현이 반복됩니다. 그 설명 톤에 본인도 동의한 사실을 부인하실 수 있습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.a.unlock.s2.net_price_alignment",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-1.b.q1",
              "text": "중개사가 '네 몫 먼저 보냈다'고 한 직후 2,400만원이 본인 계좌로 들어옵니다. 그 돈이 단순 보관이었다면 왜 공동보관이 아닌 본인 계좌였습니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d3.b.unlock.s2.side_transfer_admit",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q2",
              "text": "원본 메시지와 별도 이체 지시 메모를 함께 보면 형제 분배를 전제로 순서까지 맞춥니다. 여전히 현장 변수 정리였다고만 하시겠습니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d1.b.unlock.s3.split_accept",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-1.b.q3",
              "text": "부모 앞에서는 순매매가만 말하자는 문구를 먼저 꺼낸 쪽이 누구든, 그 방향에 본인도 동의했지요.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s2.centered_on_net_price",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-2",
      "name": "선서명과 선수령의 시간차",
      "description": "브리핑 전 선서명과 선수령 직후 개인 상환을 시간축으로 압박하는 카드",
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
              "text": "공식 시세 브리핑 하루 전 오후 2시 16분, 어머니를 법무사 사무실에 먼저 데려간 이유가 단순 문의였다면 왜 매매 관련 문구가 든 초안을 꺼냈습니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d2.a.unlock.s2.scope_narrowing",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q2",
              "text": "부분 위임장과 인감 사용 동의를 일부 받아 둔 뒤에도 그 서류가 나중 실무에 쓰일 수 있음을 몰랐다고 답하실 겁니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d2.a.unlock.s3.partial_signature",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.a.q3",
              "text": "재판관은 동기를 묻습니다. 동생보다 먼저 부동산 실무권을 잡고 싶었다는 마음이 전혀 없었다고 단언하실 수 있습니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d2.a.unlock.s4.control_motive",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-2.b.q1",
              "text": "2,400만원이 들어온 뒤 2시간 안에 장비리스와 카드대금이 결제됩니다. 이 흐름을 두고도 '잠깐 묶어 둔 돈'이라고만 답하시겠습니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d3.b.unlock.s3.debt_payment_specific",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q2",
              "text": "본인 생체인증으로 직접 상환 처리한 기록이 있습니다. 가족에게 들키면 실무권에서 배제될까 두려워 숨긴 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d3.b.unlock.s4.shame_of_debt",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-2.b.q3",
              "text": "재판관은 상환 의사를 묻습니다. 공동 정산 대상 자금을 개인 채무 1,300만원 상환에 돌린 사실과 반환 책임을 지금 인정하십니까.",
              "attackVector": "legality",
              "onSuccess": {
                "blockVector": "legality",
                "revealAtom": "d3.b.unlock.s5.full_misuse_confession",
                "lieAdvance": true
              }
            }
          ]
        }
      ]
    },
    {
      "id": "dossier-3",
      "name": "분배 메모와 부모 설명 녹취",
      "description": "33대33 분배 메모와 공식 브리핑 공백을 대조해 공모와 부모 비고지를 동시에 찌르는 카드",
      "evidenceIds": [
        "e-5",
        "e-6"
      ],
      "relatedDisputes": [
        "d-1",
        "d-4",
        "d-5"
      ],
      "subjectParty": "both",
      "challenges": [
        {
          "targetParty": "a",
          "questions": [
            {
              "id": "dossier-3.a.q1",
              "text": "중개사 수기 메모에 '민아/도윤 각 33'이 적혀 있습니다. 이 숫자가 단 한 번도 본인 몫으로 논의된 적 없었다고 말씀하시겠습니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.a.unlock.s5.full_collusion",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q2",
              "text": "법무사 설명 녹취 확인서 어디에도 별도 6,600만원 보전금은 없습니다. 부모가 알고 동의했다고 여전히 주장하실 겁니까.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d4.a.unlock.s3.parents_did_not_know",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.a.q3",
              "text": "부모 돌봄 이야기를 먼저 꺼낼수록 실제 돈 구조 질문이 흐려진다는 점을 알고도 그 화법을 쓴 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.a.unlock.s4.care_story_mask",
                "lieAdvance": true
              }
            }
          ]
        },
        {
          "targetParty": "b",
          "questions": [
            {
              "id": "dossier-3.b.q1",
              "text": "음성메모에 형제 각 3,300만원을 잡아 두겠다는 말이 나옵니다. 재판관이 묻습니다. 그 분배 구조를 실무처럼 밀어붙인 본인이 맞습니까.",
              "attackVector": "identity",
              "onSuccess": {
                "blockVector": "identity",
                "revealAtom": "d1.b.unlock.s5.collusion_confession",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q2",
              "text": "공식 브리핑에서 부모가 들은 건 순매매가와 통상 비용뿐입니다. 이 공백을 알고도 '큰 틀 동의'라고 부른 것이지요.",
              "attackVector": "authenticity",
              "onSuccess": {
                "blockVector": "authenticity",
                "revealAtom": "d4.b.unlock.s3.parents_not_informed",
                "lieAdvance": true
              }
            },
            {
              "id": "dossier-3.b.q3",
              "text": "시세와 명도 일정을 길게 설명하면 핵심 돈 흐름 질문이 뒤로 밀립니다. 그 화법으로 부모 설명 누락 책임까지 덜어 보려 한 것 아닙니까.",
              "attackVector": "context",
              "onSuccess": {
                "blockVector": "context",
                "revealAtom": "d5.b.unlock.s4.fieldwork_shield_breaks",
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
            "id": "d1.a.unlock.s2.broker_text_ack",
            "factText": "민아는 중개사가 계약서 밖 금액을 꺼냈을 때 그것이 단순 비용 정산이 아니라 형제 몫이 될 수 있다는 점을 이미 이해하고 있었다.",
            "tags": [
              "act",
              "context",
              "admission",
              "relationship",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "계약 밖 보전금"
              },
              "person_broker": {
                "fullName": "김태범",
                "judgeRef": "중개사",
                "neutral": "거래 실무자"
              },
              "time": {
                "dateExact": "공식 계약서 작성 전날 밤부터 당일 연속 연락",
                "period": "계약 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.a.unlock.s3.equal_split_ack",
            "factText": "민아는 계약 전부터 6,600만원을 형제 각 3,300만원으로 맞춰 보자는 정산 기준을 알고 있었고, 자기 몫 입금 시점도 재촉했다.",
            "tags": [
              "act",
              "timeline",
              "beneficiary",
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "계약 밖 보전금"
              },
              "amount_split": {
                "exact": "3,300만원",
                "rounded": "3천3백만원",
                "neutral": "각자 몫"
              },
              "time": {
                "dateExact": "공식 계약서 작성 전날 밤부터 당일 연속 연락",
                "period": "계약 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.a.unlock.s4.care_mask_shame",
            "factText": "민아는 돌봄 기여를 먼저 말하면 계약 밖 분배 공모에서 자신의 몫이 덜 무겁게 들릴 것이라고 계산했다.",
            "tags": [
              "emotion",
              "motive",
              "shame",
              "self_justification",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "공식 계약서 작성 전날 밤부터 당일 연속 연락",
                "period": "계약 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.a.unlock.s5.full_collusion",
            "factText": "민아는 도윤, 김태범 중개사와 함께 공식 매매가 6억4천만원 밖으로 6,600만원을 분리하고 부모에게는 순매매가만 들리게 하기로 합의했다.",
            "tags": [
              "act",
              "timeline",
              "responsibility",
              "admission",
              "rule",
              "beneficiary"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "contract_price": {
                "exact": "6억4천만원",
                "rounded": "6억대 중반",
                "neutral": "공식 매매가"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "계약 밖 보전금"
              },
              "person_broker": {
                "fullName": "김태범",
                "judgeRef": "중개사",
                "neutral": "거래 실무자"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-2": {
        "S2": [
          {
            "id": "d2.a.unlock.s2.scope_narrowing",
            "factText": "민아는 위임장 초안에 매매 관련 문구가 있다는 걸 알면서도 어머니에게는 '시세만 보는 서류'처럼 설명 범위를 줄였다.",
            "tags": [
              "rule",
              "act",
              "admission",
              "relationship",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "document": {
                "exact": "부분 위임장·인감 사용 동의",
                "neutral": "그 서류"
              },
              "person_mother": {
                "fullName": "최정자",
                "judgeRef": "어머니",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "공식 시세 브리핑 하루 전 오후 2시 16분",
                "period": "브리핑 전날",
                "neutral": "그날 오후"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d2.a.unlock.s3.partial_signature",
            "factText": "민아는 공식 브리핑 전에 부분 위임장과 인감 사용 동의를 일부 받아 두었고, 그 서류가 나중 실무에 쓰일 수 있음을 알고 있었다.",
            "tags": [
              "act",
              "timeline",
              "rule",
              "responsibility",
              "evidence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "document": {
                "exact": "부분 위임장·인감 사용 동의",
                "neutral": "그 서류"
              },
              "time": {
                "dateExact": "공식 시세 브리핑 하루 전 오후 2시 16분",
                "period": "브리핑 전날",
                "neutral": "그날 오후"
              },
              "person_notary": {
                "fullName": "윤하나",
                "judgeRef": "법무사 사무장",
                "neutral": "사무실 담당자"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d2.a.unlock.s4.control_motive",
            "factText": "민아가 서명을 앞당긴 동기에는 부모 보호만이 아니라 도윤보다 먼저 부동산 실무권을 잡겠다는 통제 욕구도 섞여 있었다.",
            "tags": [
              "motive",
              "emotion",
              "shame",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person_mother": {
                "fullName": "최정자",
                "judgeRef": "어머니",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "공식 시세 브리핑 하루 전 오후 2시 16분",
                "period": "브리핑 전날",
                "neutral": "그날 오후"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d2.a.unlock.s5.pre_signed_admission",
            "factText": "민아는 충분한 설명 없이 어머니의 선서명 성격 서류를 먼저 받아 두었고, 그것이 공동 의사결정을 앞질렀다는 점을 인정한다.",
            "tags": [
              "act",
              "rule",
              "responsibility",
              "admission",
              "relationship"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "document": {
                "exact": "부분 위임장·인감 사용 동의",
                "neutral": "그 서류"
              },
              "person_mother": {
                "fullName": "최정자",
                "judgeRef": "어머니",
                "neutral": "부모"
              },
              "person_notary": {
                "fullName": "윤하나",
                "judgeRef": "법무사 사무장",
                "neutral": "사무실 담당자"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.a.unlock.s2.briefing_gap",
            "factText": "민아는 공식 설명 체크리스트에 별도 6,600만원 보전금이 빠져 있다는 사실을 알고도 '나중에 말하면 된다'며 넘겼다.",
            "tags": [
              "rule",
              "context",
              "evidence",
              "admission",
              "beneficiary"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "별도 보전금"
              },
              "person_notary": {
                "fullName": "윤하나",
                "judgeRef": "법무사 사무장",
                "neutral": "사무실 담당자"
              },
              "time": {
                "dateExact": "위임장 방문 이틀 뒤 잔금 조건 확정 직전 브리핑",
                "period": "공식 설명 시점",
                "neutral": "그 설명 자리"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.a.unlock.s3.parents_did_not_know",
            "factText": "부모는 공식 매매가와 통상 비용만 들었고, 형제 분배 대상인 별도 보전금 구조는 듣지 못했다.",
            "tags": [
              "rule",
              "relationship",
              "admission",
              "counter",
              "evidence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "별도 보전금"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "위임장 방문 이틀 뒤 잔금 조건 확정 직전 브리핑",
                "period": "공식 설명 시점",
                "neutral": "그 설명 자리"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.a.unlock.s4.consented_fear",
            "factText": "민아는 부모가 정확히 알면 반대할 수 있다는 두려움 때문에 '대충은 아신다'는 식으로 동의 범위를 스스로 넓혔다.",
            "tags": [
              "fear",
              "emotion",
              "self_justification",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "위임장 방문 이틀 뒤 잔금 조건 확정 직전 브리핑",
                "period": "공식 설명 시점",
                "neutral": "그 설명 자리"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.a.unlock.s5.false_consent_claim",
            "factText": "민아는 부모가 계약 밖 보전금 구조를 알지 못했다는 사실을 알면서도, 이미 알고 동의한 것처럼 반복 주장했다.",
            "tags": [
              "rule",
              "responsibility",
              "admission",
              "relationship",
              "counter"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "별도 보전금"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "person_notary": {
                "fullName": "윤하나",
                "judgeRef": "법무사 사무장",
                "neutral": "사무실 담당자"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.a.unlock.s2.net_price_alignment",
            "factText": "민아는 부모 앞에서는 순매매가 기준만 먼저 말하고, 세금·명도비를 앞세워 실제 남는 구조를 뒤로 미루자는 데 동의했다.",
            "tags": [
              "context",
              "rule",
              "admission",
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "cost_labels": {
                "exact": "세금·수수료·명도비",
                "neutral": "비용 항목"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "부모 설명 브리핑 당일",
                "period": "잔금 조건 확정 직전",
                "neutral": "그 자리"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.a.unlock.s3.cost_excuse_cover",
            "factText": "민아는 비용 항목을 설명하는 척하면서 계약 밖 보전금이 형제 분배 대상이라는 핵심을 부모에게서 가렸다.",
            "tags": [
              "context",
              "rule",
              "responsibility",
              "admission",
              "beneficiary"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "cost_labels": {
                "exact": "세금·수수료·명도비",
                "neutral": "비용 항목"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "숨긴 보전금"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.a.unlock.s4.care_story_mask",
            "factText": "민아는 병원비와 돌봄 기여를 먼저 꺼내면 실제 돈 구조 설명 책임이 가벼워질 것처럼 느꼈고, 그 감정에 기대어 말을 흐렸다.",
            "tags": [
              "emotion",
              "motive",
              "shame",
              "self_justification",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "부모 설명 브리핑 당일",
                "period": "잔금 조건 확정 직전",
                "neutral": "그 자리"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.a.unlock.s5.joint_minimization_confession",
            "factText": "민아는 도윤과 함께 부모에게 세금·수수료·명도비만 강조하며 계약 밖 보전금을 숨긴 공동 축소 설명을 인정한다.",
            "tags": [
              "rule",
              "responsibility",
              "admission",
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "cost_labels": {
                "exact": "세금·수수료·명도비",
                "neutral": "비용 항목"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "숨긴 보전금"
              },
              "person_sibling": {
                "fullName": "최민아·최도윤",
                "judgeRef": "남매",
                "neutral": "형제"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      }
    },
    "b": {
      "d-1": {
        "S2": [
          {
            "id": "d1.b.unlock.s2.shared_net_price",
            "factText": "도윤은 부모 앞에서 순매매가만 말하자는 흐름이 형제 사이에 이미 공유돼 있었다는 점을 인정하기 시작한다.",
            "tags": [
              "context",
              "rule",
              "admission",
              "relationship",
              "counter"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "공식 계약서 작성 전날 밤부터 당일 연속 연락",
                "period": "계약 직전",
                "neutral": "그 무렵"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "계약 밖 보전금"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d1.b.unlock.s3.split_accept",
            "factText": "도윤은 계약 밖 6,600만원을 형제 각 3,300만원으로 두자는 분배 기준과 별도 이체 순서를 알고 있었고 그 실행을 밀었다.",
            "tags": [
              "act",
              "timeline",
              "beneficiary",
              "admission",
              "evidence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "계약 밖 보전금"
              },
              "amount_split": {
                "exact": "3,300만원",
                "rounded": "3천3백만원",
                "neutral": "각자 몫"
              },
              "person_broker": {
                "fullName": "김태범",
                "judgeRef": "중개사",
                "neutral": "거래 실무자"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d1.b.unlock.s4.face_saving_motive",
            "factText": "도윤은 빚 많은 아들로 다시 찍히지 않으려는 체면과 실무권을 잃기 싫은 마음 때문에 공모를 더 오래 숨겼다.",
            "tags": [
              "motive",
              "emotion",
              "fear",
              "shame",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "공식 계약서 작성 전날 밤부터 당일 연속 연락",
                "period": "계약 직전",
                "neutral": "그 무렵"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d1.b.unlock.s5.collusion_confession",
            "factText": "도윤은 민아, 김태범 중개사와 함께 계약서 밖 돈을 분리하고 부모에게는 순매매가만 들리게 한 공모를 전면 인정한다.",
            "tags": [
              "act",
              "rule",
              "responsibility",
              "admission",
              "relationship",
              "evidence"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "계약 밖 보전금"
              },
              "person_broker": {
                "fullName": "김태범",
                "judgeRef": "중개사",
                "neutral": "거래 실무자"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-3": {
        "S2": [
          {
            "id": "d3.b.unlock.s2.side_transfer_admit",
            "factText": "도윤은 계약 밖 보전금 중 2,400만원이 자신의 계좌로 먼저 들어왔다는 사실을 더는 부정하지 못한다.",
            "tags": [
              "act",
              "timeline",
              "admission",
              "beneficiary",
              "evidence"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "amount_received": {
                "exact": "2,400만원",
                "rounded": "2천4백만원",
                "neutral": "먼저 받은 몫"
              },
              "time": {
                "dateExact": "입금 뒤 2시간 이내",
                "period": "같은 날 오후",
                "neutral": "그 직후"
              },
              "person_broker": {
                "fullName": "김태범",
                "judgeRef": "중개사",
                "neutral": "거래 실무자"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d3.b.unlock.s3.debt_payment_specific",
            "factText": "도윤은 그중 1,300만원을 장비리스 연체와 카드대금 상환에 직접 사용했고, 부모 공동자금처럼 보관하지 않았음을 인정한다.",
            "tags": [
              "act",
              "harm",
              "admission",
              "evidence",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "amount_debt": {
                "exact": "1,300만원",
                "rounded": "1천3백만원",
                "neutral": "채무 상환액"
              },
              "institution_lease": {
                "fullName": "장비리스사",
                "judgeRef": "리스사",
                "neutral": "금융기관"
              },
              "time": {
                "dateExact": "입금 뒤 2시간 이내",
                "period": "같은 날 오후",
                "neutral": "그 직후"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d3.b.unlock.s4.shame_of_debt",
            "factText": "도윤이 선수령을 숨긴 핵심 감정은 돈을 떼먹으려는 욕심뿐 아니라 또다시 채무 문제로 가족 실무에서 배제될까 두려운 수치심이었다.",
            "tags": [
              "emotion",
              "fear",
              "shame",
              "motive",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "amount_received": {
                "exact": "2,400만원",
                "rounded": "2천4백만원",
                "neutral": "먼저 받은 몫"
              },
              "time": {
                "dateExact": "입금 뒤 2시간 이내",
                "period": "같은 날 오후",
                "neutral": "그 직후"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d3.b.unlock.s5.full_misuse_confession",
            "factText": "도윤은 공동 정산 대상이던 돈을 먼저 받아 개인 채무 1,300만원 상환에 돌린 사실과 그 은폐를 모두 인정한다.",
            "tags": [
              "act",
              "harm",
              "responsibility",
              "admission",
              "beneficiary"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "amount_received": {
                "exact": "2,400만원",
                "rounded": "2천4백만원",
                "neutral": "먼저 받은 몫"
              },
              "amount_debt": {
                "exact": "1,300만원",
                "rounded": "1천3백만원",
                "neutral": "채무 상환액"
              },
              "institution_lease": {
                "fullName": "장비리스사",
                "judgeRef": "리스사",
                "neutral": "금융기관"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-4": {
        "S2": [
          {
            "id": "d4.b.unlock.s2.briefing_omission",
            "factText": "도윤은 법무사 브리핑에 별도 보전금 구조가 빠졌다는 점을 알면서도, 나중 정산표로 메우면 된다고 가볍게 넘겼다.",
            "tags": [
              "rule",
              "context",
              "admission",
              "evidence",
              "institution"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "person_notary": {
                "fullName": "윤하나",
                "judgeRef": "법무사 사무장",
                "neutral": "사무실 담당자"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "별도 보전금"
              },
              "time": {
                "dateExact": "위임장 방문 이틀 뒤 잔금 조건 확정 직전 브리핑",
                "period": "공식 설명 시점",
                "neutral": "그 설명 자리"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d4.b.unlock.s3.parents_not_informed",
            "factText": "부모는 공식 매매가와 통상 비용만 들었고, 형제 분배 대상으로 빠진 6,600만원 구조를 듣지 못했다.",
            "tags": [
              "rule",
              "relationship",
              "admission",
              "counter",
              "evidence"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "별도 보전금"
              },
              "time": {
                "dateExact": "위임장 방문 이틀 뒤 잔금 조건 확정 직전 브리핑",
                "period": "공식 설명 시점",
                "neutral": "그 설명 자리"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d4.b.unlock.s4.exclusion_fear",
            "factText": "도윤은 그 구조를 제대로 말하면 거래가 깨지고 자신이 가족 부동산 실무에서 제외될까 봐 부모 동의를 과장했다.",
            "tags": [
              "fear",
              "emotion",
              "motive",
              "responsibility",
              "relationship"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "위임장 방문 이틀 뒤 잔금 조건 확정 직전 브리핑",
                "period": "공식 설명 시점",
                "neutral": "그 설명 자리"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d4.b.unlock.s5.false_consent_claim",
            "factText": "도윤은 부모가 계약 밖 보전금 구조를 몰랐다는 사실을 알고도, 큰 틀 동의가 있었다는 말로 설명 누락을 덮었다.",
            "tags": [
              "rule",
              "responsibility",
              "admission",
              "relationship",
              "counter"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "별도 보전금"
              },
              "person_notary": {
                "fullName": "윤하나",
                "judgeRef": "법무사 사무장",
                "neutral": "사무실 담당자"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      },
      "d-5": {
        "S2": [
          {
            "id": "d5.b.unlock.s2.centered_on_net_price",
            "factText": "도윤은 부모 설명에서 순매매가와 비용 항목만 앞세우고, 계약 밖 보전금은 뒤에서 정리될 돈처럼 밀어 두었다.",
            "tags": [
              "context",
              "rule",
              "admission",
              "harm",
              "relationship"
            ],
            "unlockedAtState": "S2",
            "slots": {
              "cost_labels": {
                "exact": "세금·수수료·명도비",
                "neutral": "비용 항목"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              },
              "time": {
                "dateExact": "부모 설명 브리핑 당일",
                "period": "잔금 조건 확정 직전",
                "neutral": "그 자리"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S3": [
          {
            "id": "d5.b.unlock.s3.shared_downplay",
            "factText": "도윤은 세금·명도비 핑계가 실제 비용 설명을 넘어 형제 분배 몫을 가리는 공동 언어였다는 점을 인정한다.",
            "tags": [
              "context",
              "rule",
              "beneficiary",
              "admission",
              "responsibility"
            ],
            "unlockedAtState": "S3",
            "slots": {
              "cost_labels": {
                "exact": "세금·수수료·명도비",
                "neutral": "비용 항목"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "숨긴 보전금"
              },
              "person_sibling": {
                "fullName": "최민아·최도윤",
                "judgeRef": "남매",
                "neutral": "형제"
              }
            },
            "stanceHints": [
              "partial",
              "admit"
            ]
          }
        ],
        "S4": [
          {
            "id": "d5.b.unlock.s4.fieldwork_shield_breaks",
            "factText": "도윤은 현장 노고와 일정 압박을 길게 말하면 부모 설명 누락 책임이 덜해 보일 것이라고 기대했고, 그 습관이 무너진다.",
            "tags": [
              "emotion",
              "motive",
              "self_justification",
              "shame",
              "responsibility"
            ],
            "unlockedAtState": "S4",
            "slots": {
              "time": {
                "dateExact": "부모 설명 브리핑 당일",
                "period": "잔금 조건 확정 직전",
                "neutral": "그 자리"
              },
              "person_parents": {
                "fullName": "최정자 외 1",
                "judgeRef": "부모님",
                "neutral": "부모"
              }
            },
            "stanceHints": [
              "emotional",
              "admit"
            ]
          }
        ],
        "S5": [
          {
            "id": "d5.b.unlock.s5.joint_minimization_confession",
            "factText": "도윤은 민아와 함께 부모에게 세금·수수료·명도비만 강조하며 계약 밖 보전금을 숨긴 공동 축소 설명을 전면 인정한다.",
            "tags": [
              "rule",
              "responsibility",
              "admission",
              "relationship",
              "harm"
            ],
            "unlockedAtState": "S5",
            "slots": {
              "cost_labels": {
                "exact": "세금·수수료·명도비",
                "neutral": "비용 항목"
              },
              "amount_total": {
                "exact": "6,600만원",
                "rounded": "6천6백만원",
                "neutral": "숨긴 보전금"
              },
              "person_sibling": {
                "fullName": "최민아·최도윤",
                "judgeRef": "남매",
                "neutral": "형제"
              }
            },
            "stanceHints": [
              "confess",
              "responsibility"
            ]
          }
        ]
      }
    }
  },
  "events": {
    "contradictions": [
      {
        "id": "ctr-1",
        "title": "잘린 캡처의 역전",
        "text": "민아가 제출한 잘린 캡처는 도윤 단독 선수령처럼 보이지만, 원본 스레드가 열리면 민아의 '내 건 왜 아직이냐' 문장이 바로 앞에 붙는다.",
        "trigger": [
          "e-1",
          "e-2"
        ],
        "relatedDisputes": [
          "d-1",
          "d-3"
        ],
        "recommendedFollowup": "선택적 제출 의도와 공동 분배 인식 여부를 함께 추궁"
      },
      {
        "id": "ctr-2",
        "title": "브리핑 전 선서명",
        "text": "법무사 예약표와 CCTV 시각은 공식 시세 브리핑 전날 이미 부분 위임장 절차가 시작됐음을 보여 준다.",
        "trigger": [
          "e-3"
        ],
        "relatedDisputes": [
          "d-2"
        ],
        "recommendedFollowup": "어머니가 실제로 들은 설명 범위와 서류 문구 차이를 대조"
      },
      {
        "id": "ctr-3",
        "title": "선수령과 개인 상환의 2시간",
        "text": "도윤은 '잠깐 보관'이라 말하지만, 계좌 입금 직후 2시간 안에 장비리스와 카드대금이 결제된다.",
        "trigger": [
          "e-4"
        ],
        "relatedDisputes": [
          "d-3"
        ],
        "recommendedFollowup": "개인 사용 고의성과 반환 계획 부재를 집중 추궁"
      },
      {
        "id": "ctr-4",
        "title": "부모 동의의 공백",
        "text": "공식 매매계약서 설명 체크리스트와 녹취 확인서 어디에도 별도 6,600만원 보전금 구조와 형제 분배는 등장하지 않는다.",
        "trigger": [
          "e-6"
        ],
        "relatedDisputes": [
          "d-4",
          "d-5"
        ],
        "recommendedFollowup": "부모가 안다고 주장한 근거와 실제 설명 기록의 차이 추궁"
      }
    ],
    "interjections": [
      {
        "id": "int-1",
        "speaker": "a",
        "text": "현장 처리라니, 결국 네 빚 막은 거잖아. 그걸 또 일정 탓으로 돌리면 끝이야?",
        "trigger": "b가 d-3에서 '잠깐 묶어둔 돈'을 반복할 때",
        "relatedDisputes": [
          "d-3"
        ]
      },
      {
        "id": "int-2",
        "speaker": "b",
        "text": "병원 얘기만 하면 다 덮여? 그 서류부터 먼저 받아 둔 건 누나잖아.",
        "trigger": "a가 d-2 또는 d-5에서 돌봄 서사를 길게 열거할 때",
        "relatedDisputes": [
          "d-2",
          "d-5"
        ]
      },
      {
        "id": "int-3",
        "speaker": "both",
        "text": "김태범 이름이 나오자 두 사람 모두 동시에 말을 자르며 '그 사람 말만 믿지 말라'고 반응한다.",
        "trigger": "재판관이 e-2 또는 e-5의 원본 제시 직후",
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      }
    ],
    "emotionalOutbursts": [
      {
        "id": "emo-a-1",
        "speaker": "a",
        "text": "내가 아니면 누가 부모 병원, 약값, 장보기 다 챙기는데요. 왜 돈 얘기만 나오면 제가 제일 나쁜 사람처럼 들려야 해요.",
        "trigger": "돌봄 기여가 무시된다고 느낄 때",
        "applicableStates": [
          "S3",
          "S4"
        ],
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      },
      {
        "id": "emo-a-2",
        "speaker": "a",
        "text": "엄마 앞에서 또 도윤 빚 얘기까지 터지면 집이 완전히 무너질까 봐 그랬어요. 그렇다고 제가 잘한 건 아니라는 거, 알아요.",
        "trigger": "d-2 책임과 d-4 설명 누락이 동시에 지적될 때",
        "applicableStates": [
          "S4",
          "S5"
        ],
        "relatedDisputes": [
          "d-2",
          "d-4"
        ]
      },
      {
        "id": "emo-b-1",
        "speaker": "b",
        "text": "또 나만 빚쟁이 아들로 찍어 버리면 편하죠. 내가 뛰어다닌 현장 시간은 다 지워지고 결과만 남는 거잖아요.",
        "trigger": "e-4 제시 후 채무 상환 사실이 고정될 때",
        "applicableStates": [
          "S3",
          "S4"
        ],
        "relatedDisputes": [
          "d-3"
        ]
      },
      {
        "id": "emo-b-2",
        "speaker": "b",
        "text": "다들 명도 일정, 공실 위험, 매수인 압박은 모르면서 결과만 욕합니다. 그래도 부모한테 숨긴 건 결국 제 잘못이에요.",
        "trigger": "d-1과 d-5 공동 은폐가 동시에 추궁될 때",
        "applicableStates": [
          "S4",
          "S5"
        ],
        "relatedDisputes": [
          "d-1",
          "d-5"
        ]
      }
    ]
  },
  "transitionBeats": [
    {
      "id": "family09:transition:a:d-2:s0_s1",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "power_of_attorney_question",
      "line": "그날은 절차만 물어본 거예요. 다만… 초안은 봤어요, 그건 맞아요.",
      "behaviorHint": "시선을 피하며 서류 명칭 대신 '그거'라고 부른다."
    },
    {
      "id": "family09:transition:a:d-2:s1_s2",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-3_presented",
      "line": "시세만 보는 서류라고 설명했어요. 그렇게밖에 말을 못 했다고요.",
      "behaviorHint": "입술을 깨물고 의자에 등을 붙인다."
    },
    {
      "id": "family09:transition:a:d-2:s2_s3",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "mother_consent_followup",
      "line": "매매 문구가 들어간 초안을 먼저 받아 뒀어요. 어머니한테는 그 부분을 자세히 말씀 안 드렸고요.",
      "behaviorHint": "목소리가 낮아지고 문장을 짧게 끊는다."
    },
    {
      "id": "family09:transition:a:d-2:s3_s5",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-2",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "responsibility_question",
      "line": "실무를 먼저 잡고 싶은 마음과 보호자라는 명분이 겹쳤어요. 서명을 유도한 거… 맞아요.",
      "behaviorHint": "숨을 길게 내쉬고 고개를 끄덕인다."
    },
    {
      "id": "family09:transition:a:d-1:s0_s1",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "off_contract_money_question",
      "line": "도윤이랑 중개사 사이 일이라고 생각했어요. 다만 별도 보전금 얘기가 오간 건… 알고 있었어요.",
      "behaviorHint": "돌봄 서사를 먼저 깔고 핵심 답을 미룬다."
    },
    {
      "id": "family09:transition:a:d-1:s1_s2",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "강하게 막지 못했어요. 알면서도 그냥 넘어간 거예요.",
      "behaviorHint": "손으로 눈가를 한번 눌렀다가 내려놓는다."
    },
    {
      "id": "family09:transition:a:d-1:s2_s3",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "broker_memo_followup",
      "line": "3,300만원 분배 이야기… 저도 알고 있었어요. 모르는 척한 거예요.",
      "behaviorHint": "상대를 보며 책임을 반쯤 넘기려 한다."
    },
    {
      "id": "family09:transition:a:d-1:s3_s5",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "공모한 거 맞아요. 숨긴 것도, 나중에 도윤한테만 돌린 것도요. 다 제 잘못이에요.",
      "behaviorHint": "한숨 뒤 목소리가 갈라진다."
    },
    {
      "id": "family09:transition:a:d-5:s0_s1",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "parent_explanation_question",
      "line": "비용을 설명한 것뿐이었어요. 다만… 표현이 좀 과했을 수도 있겠다는 생각은 해요.",
      "behaviorHint": "손가락으로 비용 항목을 셈하듯 움직인다."
    },
    {
      "id": "family09:transition:a:d-5:s1_s4",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S4",
      "trigger": "nonjudgmental_question_about_rehab_cost_pressure",
      "line": "제가 아니면 누가 해요… 재활비가 계속 나가는데. 죄책감이 있었어요, 솔직히.",
      "behaviorHint": "목이 잠기며 '제가 아니면 누가'라는 말이 튀어나온다."
    },
    {
      "id": "family09:transition:a:d-5:s4_s3",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S4",
      "toState": "S3",
      "trigger": "e-6_presented",
      "line": "부모님 앞에서 순매매가만 말씀드렸어요. 나머지는… 일부러 빼고 말한 거예요.",
      "behaviorHint": "손으로 입을 가렸다가 천천히 내린다."
    },
    {
      "id": "family09:transition:a:d-5:s3_s5",
      "caseId": "family-09",
      "party": "a",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "돌봄이라는 명분… 더 이상 못 쓰겠어요. 같이 숨긴 거예요. 제 책임이에요.",
      "behaviorHint": "눈을 감고 한 박자 쉬었다가 답한다."
    },
    {
      "id": "family09:transition:b:d-3:s0_s1",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "side_transfer_question",
      "line": "잠깐 묶어 둔 거였어요. 다만… 제 계좌로 먼저 들어온 건 맞아요.",
      "behaviorHint": "숫자를 빠르게 읊고 곧바로 현장 사정 설명으로 넘어간다."
    },
    {
      "id": "family09:transition:b:d-3:s1_s2",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-1_presented",
      "line": "먼저 받은 건 맞아요. 다시 맞추려고 했거든요. 그게 안 된 것도 알지만요.",
      "behaviorHint": "팔짱을 끼려다 풀고 의자 앞으로 기울인다."
    },
    {
      "id": "family09:transition:b:d-3:s2_s3",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "debt_payment_followup",
      "line": "1,300만원이 리스랑 카드값으로 갔어요. 그 부분은 숨길 수가 없네요.",
      "behaviorHint": "턱선이 굳고 대답이 짧아진다."
    },
    {
      "id": "family09:transition:b:d-3:s3_s5",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-3",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-4_presented",
      "line": "체면 때문에 숨긴 거예요. 두려워서요. 다 인정해요.",
      "behaviorHint": "눈을 떨군 채 손가락 움직임이 멈춘다."
    },
    {
      "id": "family09:transition:b:d-1:s0_s1",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "off_contract_money_question",
      "line": "현장 조정금 정도로 생각했거든요. 다만 별도 돈 얘기가 있긴 했어요.",
      "behaviorHint": "시세와 명도 일정을 먼저 장황하게 말한다."
    },
    {
      "id": "family09:transition:b:d-1:s1_s2",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-2_presented",
      "line": "부모님 앞에서 순매매가만 말하자는 공감대가 있었어요. 그건 인정해요.",
      "behaviorHint": "어깨를 으쓱이며 '거래 안 깨려던 것'이라 덧붙인다."
    },
    {
      "id": "family09:transition:b:d-1:s2_s3",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "split_agreement_followup",
      "line": "3,300만원씩 나눠 보자는 내부 기준이 있었어요. 누나도 알고 있었고요.",
      "behaviorHint": "상대도 알았다는 말을 반드시 붙인다."
    },
    {
      "id": "family09:transition:b:d-1:s3_s5",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-1",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "e-5_presented",
      "line": "더 이상 실무라는 말로 덮을 수 없을 것 같아요. 같이 숨긴 거 맞아요.",
      "behaviorHint": "짧은 침묵 뒤 단문으로 답한다."
    },
    {
      "id": "family09:transition:b:d-5:s0_s1",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S0",
      "toState": "S1",
      "trigger": "parent_explanation_question",
      "line": "필수 비용을 설명한 거였는데요. 다만 숫자를 좀 세게 잡은 건… 맞는 것 같아요.",
      "behaviorHint": "손으로 허공에 금액표를 그리듯 움직인다."
    },
    {
      "id": "family09:transition:b:d-5:s1_s2",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S1",
      "toState": "S2",
      "trigger": "e-6_presented",
      "line": "부모님 앞에서 순매매가 중심으로만 설명한 건 맞아요. 인정해요.",
      "behaviorHint": "입술을 다문 채 짧게 고개를 끄덕인다."
    },
    {
      "id": "family09:transition:b:d-5:s2_s3",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S2",
      "toState": "S3",
      "trigger": "same_day_disclosure_followup",
      "line": "비용이 크다는 핑계로 형제 몫을 가린 거예요. 같은 날 말하지 않은 건 일부러 그랬어요.",
      "behaviorHint": "현장 노고를 꺼내려다 말고 손을 내린다."
    },
    {
      "id": "family09:transition:b:d-5:s3_s5",
      "caseId": "family-09",
      "party": "b",
      "disputeId": "d-5",
      "fromState": "S3",
      "toState": "S5",
      "trigger": "shared_responsibility_question",
      "line": "실무라는 방패… 더 이상 못 쓰겠어요. 부모님 판단을 흐린 건 제 책임이에요.",
      "behaviorHint": "숨을 길게 들이쉬고 천천히 답한다."
    }
  ]
}

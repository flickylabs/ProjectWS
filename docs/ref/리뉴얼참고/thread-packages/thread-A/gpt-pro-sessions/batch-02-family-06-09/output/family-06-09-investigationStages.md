```json
{
  "case": "family-06",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "삭제 전 게시물 묶음과 스토리 기록에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "같은 게시물 묶음에 장소표시와 사진 일부를 연달아 둔 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "실명 없이도 주변이 해당 가정을 짐작하게 된 흐름을 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "협찬처와 지인방에 보낸 이 대화 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "익명 자료 도착 전 먼저 경고 메시지를 보낸 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "단순 상담이라면 반복된 평가 문구는 왜 넣었는지 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "헤더가 보이지 않는 이 캡처 묶음을 어떻게 확보했는지 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "스캔형 파일명만으로 발신자를 단정한 근거를 설명하십시오.",
          "attackVector": "authenticity"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "작성자 단서가 잘린 상태로도 책임을 바로 돌린 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "익명 발신 헤더와 접속기록 원본 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "게시 직후 전송 시각과 외부저장장치 연결이 겹친 점을 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "발신 직전 해당 계정에 남은 자료 경로의 의미를 설명하십시오.",
          "attackVector": "identity"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "오래된 스캔 백업과 동기화 기록의 보관 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "해당 폴더가 같은 계정에서 다시 열린 뒤 USB가 연결된 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "최근 열람 흔적이 다른 단말보다 한쪽에 몰린 이유를 설명하십시오.",
          "attackVector": "identity"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "협업 중단 메모와 통화 확인서 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "중단 결정이 첫 게시 직후가 아니라 추가 연락 뒤 내려진 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "브랜드가 공개 글보다 문서 확산 상황을 더 중하게 본 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ]
  }
}
```

```json
{
  "case": "family-07",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "초안·최종본·교정본이 서로 다르게 남은 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "초안 작성 계정과 최종 제출 계정이 갈린 이유를 설명하십시오.",
          "attackVector": "identity"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "최종본에서 빠진 역할 문구를 어떤 판단으로 정리했는지 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "인터뷰 전체본과 홍보 게시물 아카이브에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "수상 직후 같은 표현을 연달아 올린 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "온라인만 말한 것이라면 공방 전체를 바꾼 듯한 문장은 왜 남겼습니까?",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "온라인 지표와 생산 로그를 함께 묶어 제출한 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "유입 급증과 납기 회복 시점이 겹치는 흐름을 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "반품 감소와 신규 유입을 한 축만으로 설명하기 어려운 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "신청 안내문과 주문서 원본을 근거로 든 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "대표자 표기가 등록정보 기준으로 처리된 점을 설명하십시오.",
          "attackVector": "legality"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "이 표기를 곧바로 후계 판단으로 연결한 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "월별 비교표와 수정 이력 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "서로 다른 저점과 고점 구간만 남긴 기준을 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "숨김 처리된 달을 빼고도 공정한 비교라 본 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "회의록과 역할 진단표 원본을 제출한 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "수상 전 회의에서 단독 결정이 보류된 점을 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "외부 평가와 별개로 역할 분리부터 권고된 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ]
  }
}
```

```json
{
  "case": "family-08",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "대기등록 신청서와 입금 영수증 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "신청 명의와 입금 시각을 서둘러 정한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "입소 확정처럼 보이는 송금이 어떤 절차를 겨냥했는지 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "가족 대화와 통화기록 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "부재중 전화 뒤 설명이 다음 날 아침으로 밀린 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "같은 밤 외부 상담엔 답하면서 가족 공유를 미룬 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "친척방 메시지와 통화 메모 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "정식 설명보다 앞서 친척방에 알린 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "사실확인보다 단정적 표현을 먼저 택한 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "환불 규정 메일과 상담 녹취 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "입금 직후 받은 안내와 상담 표현을 어떻게 이해했는지 설명하십시오.",
          "attackVector": "legality"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "계좌 이체만 보고 영구 절차로 단정한 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "가족회의 노트 사진을 이렇게 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "회의 당일 사진을 최근 다시 잘라 저장한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "하단 조건과 서명란이 빠진 채 제시한 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "사례관리 기록과 서명 계획서 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "가스 사고 직후 작성된 계획서에 모두 서명한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "사전 합의에 붙어 있던 같은 날 공유 조건을 왜 다르게 이해했습니까?",
          "attackVector": "legality"
        }
      }
    ]
  }
}
```

```json
{
  "case": "family-09",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "잘린 메시지 캡처를 증거로 제시한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "부모에게 보여주기 직전 해당 캡처를 다시 저장한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "직전 대화가 빠진 상태로도 단독 선수령처럼 제시한 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "원본 대화와 통화녹취, 이체 메모에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "통화와 메시지, 이체 메모가 한날 이어진 흐름을 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "공식 계약 밖 정산을 누가 어떤 순서로 맞춘 것인지 설명하십시오.",
          "attackVector": "identity"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "예약표와 위임장 초안, 대기실 확인서에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "공식 설명 전 먼저 방문해 서류를 준비한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "가격 문의라면 매매 관련 문구가 이미 들어간 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "입금내역과 상환서 원본을 함께 낸 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "이체 직후 개인 채무를 먼저 정리한 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "잠시 보관이라면 공동 보관이 아닌 개인 상환으로 흐른 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "수기 메모와 음성메모 원본에 대해 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "공식 계약 전날 밤 분배 메모를 남긴 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "사후 정산이 아니라 사전 설계처럼 보이는 대목을 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "공식 계약서와 설명 확인서를 근거로 든 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "공식 브리핑 시점을 잔금 조건 직전에 둔 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "설명 과정에서 빠진 외부 정산 항목을 왜 언급하지 않았습니까?",
          "attackVector": "authenticity"
        }
      }
    ]
  }
}
```


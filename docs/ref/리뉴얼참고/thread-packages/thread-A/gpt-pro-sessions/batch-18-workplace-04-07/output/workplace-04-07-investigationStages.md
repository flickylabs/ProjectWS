```json
{
  "case": "case-work-04",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 회의록과 보드 코멘트 작성 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "16시대에 남긴 승인 확인 코멘트의 실행 경과를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "같은 회의록에 적힌 역할 분리를 이후 다르게 해석한 이유를 설명하십시오.",
          "attackVector": "identity"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 체크리스트 상태 변경과 실행 로그의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "스모크만 끝난 시점에 상태를 초록으로 바꾼 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "파일 교체가 이어지던 중 전체 검증을 뒤로 미룬 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 메신저 캡처를 제출한 범위와 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "21시 06분 장면만 남긴 기준이 무엇인지 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "잘려 나간 앞 대화에 다른 역할 지시가 있었는지 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 승인 메일 체인과 내부 전달 기록을 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "리마인드 뒤 장시간 공백 동안 어떤 중간 공유를 했는지 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "최종 회신 전까지 중간 상태 공유를 비워 둔 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 파이프라인 로그와 사고 메모를 확인한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "20시 31분 동시 경고를 본 뒤 누구에게 먼저 알렸는지 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "서로 다른 경고를 왜 한쪽 문제로만 판단했는지 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 보드 버전 이력과 변경 기록의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "19시 48분 새 작업 추가 뒤 책임 재지정을 하지 않은 이유를 설명하십시오.",
          "attackVector": "identity"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "메신저 요청만 남기고 공식 책임 구조를 갱신하지 않은 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ]
  }
}
```

```json
{
  "case": "case-work-05",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 회의록과 슬라이드 버전 이력을 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "초안 작성 계정과 표기 삭제 계정이 갈리는 이유를 설명하십시오.",
          "attackVector": "identity"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "제목만 손본 뒤 뼈대와 사례 배열을 그대로 둔 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 노트 사진과 화이트보드 캡처의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "날짜가 잘린 상태로 제출된 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "프레임 밖 날짜가 보이면 작성 시점 판단이 달라지는지 설명하십시오.",
          "attackVector": "timeline"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 다운로드 로그와 전송 기록이 남게 된 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "권한 회수 직전 일괄 확보와 링크 전송이 이어진 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "정식 이의 제기 전 비공식 공유를 먼저 한 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 보류 제안서와 주석본을 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "현재 실험명과 닮은 표현이 과거 주석에 남은 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "보류 뒤에도 남아 있던 자료를 이후 작업에 연결한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 심사 메모와 발표 순서 변경 기록의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "해명 전날 비공개 위험 메모가 먼저 입력된 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "순서 조정이 실질 평가에 미칠 영향을 왜 먼저 반영했는지 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 이메일 스레드와 첨부 문서의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "내부 공유만 하자는 회신 직후 감사 메일이 이어진 이유를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "당시 출처 문제를 공식 정리하지 않고 넘긴 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ]
  }
}
```

```json
{
  "case": "case-work-06",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 통합 공지 캡처와 역할표를 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "조건 문장이 잘린 화면만 남긴 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "잘린 뒷부분이 보이면 단독 권한 해석이 달라지는지 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 권한 감사 로그와 규칙 변경 내역을 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "삭제 대상 권한으로 새벽 규칙을 바꾼 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "승인 없이 다른 큐를 건드린 근거가 무엇인지 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 통합 문서와 해설 메모의 작성 취지를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "계정 변경 옆 공동 승인 문구가 적힌 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "임시 운영 지침을 단독 재량처럼 해석한 근거를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 재배정 기록과 편집 이력을 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "짧은 간격으로 재배정과 기준 수정을 연달아 한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "인수인계 전 상대 기준까지 손댄 근거가 무엇인지 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 캘리브레이션 초안과 코멘트 기록을 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "역할 정리 전날 밤 부정 코멘트를 먼저 남긴 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "공식 정리 전 평가성 문구를 남긴 목적을 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 PM 회의록과 체크리스트 제출 내역을 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "둘 다 열람한 날 PM 기록이 늦게 남은 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "즉시 올릴 절차가 있는데도 각자 처리로 남긴 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ]
  }
}
```

```json
{
  "case": "case-work-08",
  "evidenceStages": {
    "e-1": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 익명 글 보존본과 미팅 메모를 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "게시 뒤 두 시간도 안 돼 작성자 추정을 언급한 이유를 설명하십시오.",
          "attackVector": "identity"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "실명 없이도 대상이 좁혀질 표현을 왜 회의에서 사용했는지 설명하십시오.",
          "attackVector": "identity"
        }
      }
    ],
    "e-2": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 스크린샷 묶음과 원본 파일의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "본문과 헤더의 해상도가 다른 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "헤더와 시각 정보를 절삭한 상태로 한 장처럼 제시한 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-3": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 대화 export와 해시 비교표의 제출 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "문제 문장 ID가 다른 시기의 대화에 속한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "현재 대화 원문이 없는데 같은 취지로 제시한 근거를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ],
    "e-4": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 과거 회의록과 후속 메일을 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "제기 직후 등급을 낮추는 지시가 이어진 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "과거에도 공개를 누르는 방향이 반복된 이유를 설명하십시오.",
          "attackVector": "context"
        }
      }
    ],
    "e-5": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 조사 접수기록과 인사 로그를 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "결론 전 역할 배제와 부정 입력을 먼저 한 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "restore_context",
        "question": {
          "text": "보호 절차가 살아 있는 시점에 대상 배제를 병행한 이유를 설명하십시오.",
          "attackVector": "legality"
        }
      }
    ],
    "e-6": [
      {
        "stage": 0,
        "revealKey": "request_original",
        "question": {
          "text": "이 포렌식 메모와 작업 기록을 제출한 경위를 설명하십시오.",
          "attackVector": "context"
        }
      },
      {
        "stage": 1,
        "revealKey": "check_metadata",
        "question": {
          "text": "게시 직전 같은 편집 세션에 두 이미지가 열린 이유를 설명하십시오.",
          "attackVector": "timeline"
        }
      },
      {
        "stage": 2,
        "revealKey": "check_edits",
        "question": {
          "text": "서로 다른 시기 이미지를 한 작업 흐름에서 결합한 이유를 설명하십시오.",
          "attackVector": "authenticity"
        }
      }
    ]
  }
}
```


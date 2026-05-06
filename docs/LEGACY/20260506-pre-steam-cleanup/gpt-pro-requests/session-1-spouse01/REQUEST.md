# Session 1: spouse-01 Structure V2 신규 생성

## 배경

spouse-01의 기준 데이터는 **이준호(B)/박지연(A)** — 오피스텔 방문과 새벽 전화 사건입니다.
기존 structure-v2 파일은 한지석/오세린(다른 사건)으로 작성된 레거시라서 아카이빙했습니다.
이준호/박지연 기준으로 structure-v2를 새로 만들어야 합니다.

## 산출물

`spouse-01-structure-v2.json` 1개 파일

## 사건 구조 (첨부 spouse-01.json에서 발췌)

### 등장인물
- **partyA 박지연** (36세, 학원 데스크 직원, archetype: victim_cosplay)
- **partyB 이준호** (38세, 가전매장 직원, archetype: avoidant)

### 쟁점 4개
| ID | 이름 | hidden | v3Visibility | quadrant |
|----|------|--------|-------------|----------|
| d-1 | 오피스텔 방문과 새벽 전화 | false | initial | both |
| d-2 | 비자금 3,000만원 출금 | false | hidden | b_only |
| h-d3 | 공동 적금 2,000만원 해지 | true | hidden | b_only |
| h-d4 | 누가 먼저 숨기고 움직였는가 | true | hidden | both |

### 해금 체인
d-1(초기) → d-2(A의 d-1 S3 도달 시) → h-d3(d-2 S1 시 B 역공) → h-d4(d-2 S1 + h-d3 S1 모두)

### 증거 7개
| ID | 이름 | 타입 |
|----|------|------|
| e-1 | 영수증 묶음 (5장) | log |
| e-2 | 블랙박스 GPS 기록 | device |
| e-3 | 통화기록 | log |
| e-4 | 형 문자 스레드 | chat |
| e-5 | 이준호의 계좌 출금 내역 | bank |
| e-6 | 투자방 카톡 + 송금 기록 | chat |
| e-7 | 공동 적금 해지 서류 | contract |

## 스키마

```json
{
  "caseId": "spouse-01",
  "schemaVersion": "structure_v2",
  "disputes": [
    {
      "id": "d-1",
      "name": "쟁점 이름",
      "truth": true,
      "truthDescription": "진실 1~2문장",
      "quadrant": "both|a_only|b_only",
      "requiredEvidence": ["e-N"],
      "correctResponsibility": { "a": 50, "b": 50 },
      "ambiguity": "none|low|mid|high",
      "weight": "high|mid|low",
      "mediationLink": "중재 연결 키워드",
      "legitimacyIssue": false,
      "judgmentStatement": "판결 요약 1문장",
      "disputeKind": "core_truth|sub_truth|red_herring|shared_misconception",
      "depthLayers": [
        {
          "id": "surface",
          "label": "표면 층 (5~10자)",
          "summary": "이 층의 내용 (1~2문장)",
          "lockedSummary": "잠겨 있을 때 힌트 (1문장)",
          "revealAtomIds": [],
          "uiStyle": "card_expand"
        },
        {
          "id": "motive",
          "label": "동기 층",
          "unlockCondition": {
            "requireDisputes": [{ "id": "d-1", "minState": "S2" }]
          }
        },
        {
          "id": "core",
          "label": "핵심 층",
          "uiStyle": "relation_core",
          "unlockCondition": {
            "requireDisputes": [{ "id": "d-1", "minState": "S3" }]
          }
        }
      ],
      "linkEdges": [
        { "target": "d-2", "relation": "supports|weakens_counter|unlocks_layer|retaliation" }
      ]
    }
  ],
  "evidence": [
    {
      "id": "e-1",
      "type": "log",
      "timing": { "bestPhase": "phase3|phase4|phase5", "impactCurve": "early|mid|late" }
    }
  ]
}
```

## 규칙
1. dispute/evidence ID는 첨부 case JSON과 정확히 일치 (d-1, d-2, h-d3, h-d4 / e-1~e-7)
2. depthLayers 3층 (surface / motive / core)
3. revealAtomIds는 빈 배열 허용
4. correctResponsibility 합계 = 100
5. 한국어 자연어, 번역체 금지

## 첨부 파일
- `spouse-01.json` — 현재 런타임 케이스 (이준호/박지연)
- `spouse-01-structure-v2-LEGACY.json` — 한지석/오세린 구조 (**형식만** 참고, 내용 무시)

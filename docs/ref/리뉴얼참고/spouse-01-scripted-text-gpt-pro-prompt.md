# spouse-01 Scripted Text Pilot Prompt

## 목표
- `spouse-01`의 런타임 대사 채널을 사전 작성 JSON으로 생성한다.
- 출력은 반드시 JSON만 한다.
- 자연스러운 한국어, 존댓말 규칙, Truth Throttle, 반복 방지 규칙을 지킨다.

## 입력 자료
- `src/data/cases/generated/spouse-01.json`
- `tests/transcripts/spouse-01-r1-v3.json`
- `docs/ref/리뉴얼참고/thread-packages/thread-C/spouse-01-v3-pilot.json`
- `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-3-partyB-d1d2/output/spouse-01-session-partyB-d1d2.json`
- `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-2-partyA-d3d4d5/output/spouse-01-partyA-d3d4d5-v3.json`
- `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json`
- `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-5-dossier/output/spouse-01-dossier-scripted-responses.json`
- `docs/ref/리뉴얼참고/thread-packages/thread-C/gpt-sessions/session-6-witness/output/spouse-01-witness-scriptedTestimonies.json`

## 절대 규칙
- 재판관에게 말할 때는 존댓말만 사용한다.
- `a=한지석`은 배우자 `b`를 재판관 앞에서 `제 아내`로 지칭한다.
- `b=오세린`은 배우자 `a`를 재판관 앞에서 `제 남편`으로 지칭한다.
- `S0-S1 interrogation/dossier`에서는 정확한 금액과 제3자 실명을 먼저 꺼내지 마라.
- `evidence_present`는 증거 그 자체에 직접 반응해야 한다.
- `S5`는 최소 3문장, 인정 + 이유 + 감정/책임을 포함한다.
- 해요체, 번역체, 클리셰를 쓰지 마라.
- 출력 외 설명, 주석, 마크다운을 넣지 마라.

## 추천 참고 대사
```json
[
  {
    "channel": "interrogation",
    "target": "a",
    "disputeId": "d-1",
    "lieState": "S1",
    "questionType": "fact_pursuit",
    "text": "그 송금 자체는 있었던 게 맞습니다. 그런데 그 약속과 의미를 혼동한다면, 오해가 생길 수 있습니다."
  },
  {
    "channel": "interrogation",
    "target": "a",
    "disputeId": "d-1",
    "lieState": "S2",
    "questionType": "motive_search",
    "text": "적지 않은 돈이 오간 건 사실입니다. 그러나 그 돈은 급한 가족 어른과 관련된 일이었고, 당시에는 즉각적인 대응이 필요했습니다."
  },
  {
    "channel": "interrogation",
    "target": "a",
    "disputeId": "d-1",
    "lieState": "S5",
    "questionType": "fact_pursuit",
    "text": "280만원을 최민정 씨에게 보낸 건 사실입니다. 오미숙 장모님의 추석 연휴 간병을 위해서였고, 부족한 가장으로 보일까 두려워서 숨겼습니다. 더 이상 핑계되지 않고 솔직히 인정합니다."
  },
  {
    "channel": "interrogation",
    "target": "b",
    "disputeId": "d-2",
    "lieState": "S1",
    "questionType": "fact_pursuit",
    "text": "네, 새벽에 열람한 건 맞습니다. 그 메시지가 저를 불안하게 만들었습니다."
  },
  {
    "channel": "interrogation",
    "target": "b",
    "disputeId": "d-2",
    "lieState": "S3",
    "questionType": "fact_pursuit",
    "text": "네, 그 새벽에 그 확인을 한 건 맞습니다. 다만, 제 남편이 그 내용을 저에게 명확히 설명하지 않았던 걸 먼저 보셔야 하지 않겠습니까?"
  },
  {
    "channel": "interrogation",
    "target": "b",
    "disputeId": "d-2",
    "lieState": "S5",
    "questionType": "empathy_approach",
    "text": "사실은, 그 새벽에 제 남편의 휴대폰 메신저 캡처본을 봤습니다. 외도 여부를 혼자 확인하려고 했고 그걸 제3자에게 보내기도 했습니다. 바보 같은 아내가 되는 게 두려워서 말 못 했습니다."
  },
  {
    "channel": "evidence_present",
    "target": "a",
    "disputeId": "d-1",
    "lieBand": "early",
    "text": "그 송금 내역은 분명히 존재하지만, 거기에서 이름만 보고 결론을 내리는 건 아닙니다. 그 돈의 성격에 대해서는 다양한 해석 여지가 있습니다."
  },
  {
    "channel": "dossier",
    "questionId": "dossier-1.a.q3",
    "lieBand": "late",
    "text": "아니요. 더는 숨기지 않겠습니다. 그 자료들이 원본이라면 280만원은 추석 연휴 간병 예약금이었고, 상담팀장을 통해 직접 처리한 것이 맞습니다."
  },
  {
    "channel": "witness",
    "witnessId": "tp-3",
    "depth": "full",
    "text": "9월 20일 14시 03분에 280만원 예약금이 납부됐고 14시 31분에 예약서가 접수됐습니다. 한지석 씨는 같은 날 밤 9시 14분경 센터 후문 상담실에서 대면 상담을 진행했고, 돌봄 대상자는 장모님이었습니다. 메신저의 '조용한 곳에서 보자'는 문장은 상담실에서 서류를 보자는 의미였지, 사적 관계를 뜻한 바는 없습니다."
  }
]
```

## 출력 스키마
```json
{
  "schemaVersion": 1,
  "caseId": "spouse-01",
  "channels": {
    "interrogation": {
      "entries": [
        {
          "key": "a|d-1|S1|fact_pursuit",
          "party": "a",
          "disputeId": "d-1",
          "lieState": "S1",
          "questionType": "fact_pursuit",
          "variants": [
            { "id": "a_d1_s1_fact_01", "text": "...", "behaviorHint": "..." }
          ]
        }
      ]
    }
  }
}
```

## 생성 범위
- `interrogation`: `party(a,b) × dispute(d-1~d-5) × lieState(S0~S5) × questionType(3)` 전부
- `evidencePresent`: `party(a,b) × evidence(e-1~e-6) × lieBand(early,mid,late)` 전부
- `dossier`: spouse-01 dossier question 전부 × `lieBand(early,mid,late)`
- `witness`: `tp-1~tp-4 × vague/partial/full`
- `aftermath`: `clean_repair`, `uneasy_repair`, `mutual_fault`, `trust_collapse`, `procedural_relief`, `separation_path`
- `systemMessage`: 런타임 훅에 바로 연결 가능한 최소 세트

# 02 — family-01 JUDGE 발화 위반 entry 표 (14 entries)

본 sweep 영역 entries. 모두 `src/data/scriptedText/family-01.json` 의 channel 영역. id로 매핑.

## judge_question 채널 (7 entries)

| # | id | dispute / tone | 현 KO 위반 | 핵심 변환 방향 |
|---|---|---|---|---|
| 1 | `judgeq-d-1-motive-search-4-v3` | d-1 / motive_search | "윤정후 씨, 어머니를 돕는다는 명분으로 **선을 넘었다면** 왜 그랬습니까." | "선" frame 회피. "절차에 직접 손을 댔다면" / "어머니 의사 형성에 직접 손댔다면" |
| 2 | `judgeq-d-2-fact_pursuit-4-v1` | d-2 / fact_pursuit | "윤정후 씨, 본인의 이득만 챙긴 개입이 아니었다고 해도 왜 절차에 손대는 **선을 넘었습니까**." | "절차에 직접 손을 댄 이유" / "절차를 넘은 행동" |
| 3 | `judgeq-d-2-empathy_approach-1-v1` | d-2 / empathy_approach | "윤정후 씨, **그 문서**를 고치던 순간 가장 먼저 떠오른 사람이 누구였습니까." | "관련 문서를" / "수정 접수된 문서를" / "이 문서를" |
| 4 | `judgeq-d-2-empathy-approach-1-v5` | d-2 / empathy_approach | "두 분, **그 문서**가 각자에게 어떤 상처로 남았는지 말씀해 주십시오." | "관련 문서가" / "이 문서가" / "수정된 유서가" |
| 5 | `judgeq-d-2-empathy_approach-2-v2` | d-2 / empathy_approach | "윤태성 씨, **그 문서**를 보는 순간 장남으로서 자리가 무너진다고 느끼셨습니까." | "관련 문서를" / "수정된 유서를" / "변경된 유서를" |
| 6 | `judgeq-d-2-empathy-approach-4-v5` | d-2 / empathy_approach | "두 분, **그 문서**가 어머니 뜻을 얼마나 흐렸는지 답해 주십시오." | "관련 문서가" / "수정된 유서가" / "이 문서가" |
| 7 | `judgeq-d-4-motive-search-4-v1` | d-4 / motive_search | "윤정후 씨, 보호라는 이유로 법적 **선을 넘은** 판단을 설명해 주십시오." | "법적 절차를 넘은 판단" / "법적 절차에 직접 손댄 판단" |

## judge_contradiction 채널 (2 entries)

| # | id | dispute / tone | 현 KO 위반 | 핵심 변환 방향 |
|---|---|---|---|---|
| 8 | `judgec-d-1-hard-v5` | d-1 / hard | "윤정후 씨, 도움이라는 말로 대신 결정한 부분을 덮을 수 없습니다. 어디서 **선을 넘었습니까**." | "어디서 절차에 직접 손을 댔습니까" / "어디서 어머니 의사 영역을 넘었습니까" |
| 9 | `judgec-d-2-hard-v3` | d-2 / hard | "윤정후 씨, 보호였다는 말로 절차 개입 책임을 지울 수 없습니다. **어떤 선을 넘었는지** 답해 주십시오." | "어떤 절차를 넘었는지" / "어떤 행동으로 절차에 직접 손을 댔는지" |

## judge_evidence_combo 채널 (5 entries)

| # | id | dossierCardId / tone | 현 KO 위반 | 핵심 변환 방향 |
|---|---|---|---|---|
| 10 | `judgeec-dc-1-b-q2-hard-v1` | dc-1 / hard | "윤정후 씨, 어머니를 도왔다는 말만으로 방문기록과 낭독 증언을 덮을 수 없습니다. 어디서 **선을 넘었는지** 지금 말씀해 주십시오." | "어디서 절차에 직접 손을 댔는지" / "어디서 어머니 의사 영역을 넘었는지" |
| 11 | `judgeec-dc-2-b-q2-hard-v4` | dc-2 / hard | "윤정후 씨, 90에서 60으로 낮추고 윤태성 씨에게 40을 남긴 선택은 선의와 위법이 동시에 서는 지점입니다. **그 선을 넘은 이유**를 지금 답해 주십시오." | "절차에 직접 손댄 이유" / "법적 절차를 넘은 이유" |
| 12 | `judgeec-dc-3-b-q1-mid-v1` | dc-3 / mid | "자필 연습본과 계좌 **흐름**을 붙이면 오랫동안 이어진 정기 지원금과 사업 자금 **흐름이 보입니다**. 왜 처음부터 말하지 않았습니까." | "계좌 정황" / "계좌상 자금 이동 선후관계가 있습니다" / "계좌상 송금 흔적이 있습니다" |
| 13 | `judgeec-dc-3-b-q1-mid-v5` | dc-3 / mid | "윤정후 씨, 계좌 **흐름**은 작은 도움을 넘어선 **흐름**입니다. 자필 연습본과 맞물린 의미를 지금 설명해 주십시오." | "계좌 정황은 작은 도움 수준을 넘는 흔적입니다" / "계좌상 자금 이동은 작은 도움을 넘습니다" |
| 14 | `judgeec-dc-5-a-q1-soft-v5` | dc-5 / soft | "윤태성 씨, 변경된 유서를 보고 느낀 억울함과 계좌 **흐름이 보여 주는** 사실을 함께 봐야 합니다. 장남이라는 마음을 정리해 주십시오." | "계좌상 정황이 보여 주는" / "계좌상 송금 기록이 보여 주는" |

## 위반 어휘 분포

| 어휘 | 수 |
|---|---|
| "선을 넘" (행위 평가) | 7 |
| "그 X" (지시 대명사) | 4 |
| "흐름" (인과 평가) | 3 |
| **Total** | **14** |

## 변환 시 보존 영역

- **재판관 격식**: `...십시오` / `...습니까` (변경 X)
- **호칭**: "윤태성 씨" / "윤정후 씨" / "두 분" (변경 X)
- **dispute 관련 명사**: "유서" / "변경된 유서" / "수정된 유서" / "공증인 메모" / "자필 연습본" / "계좌 송금" / "정기 지원금" 등 (변경 X — 구체화 시 본문 명사 활용 OK)
- **tone**: mid/hard/soft/early/late marker는 entry id의 tone 정보 따라 자연 강도 유지

## 산출 형식

JSON으로 1 file에 14 entries 모아서 산출:

```json
{
  "case": "family-01",
  "channel": "mixed (judge_question + judge_contradiction + judge_evidence_combo)",
  "policy": "feedback_judge_dispassionate_action_focused",
  "polished": [
    {
      "id": "judgeq-d-1-motive-search-4-v3",
      "channel": "judge_question",
      "old": "윤정후 씨, 어머니를 돕는다는 명분으로 선을 넘었다면 왜 그랬습니까.",
      "new": "...",
      "rationale": "..."
    },
    ...
  ]
}
```

각 entry는 `new` 시안 1개 + `rationale` 1줄 (변환 사유). GPT Pro 작업.

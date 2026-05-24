# 02 — spouse-01 JUDGE 발화 위반 entry 표 (11 entries)

본 sweep 영역 entries. 모두 `src/data/scriptedText/spouse-01.json` 의 channel 영역. id로 매핑.

## judge_question 채널 (8 entries)

| # | id | dispute / tone | 현 KO 위반 | 핵심 변환 방향 |
|---|---|---|---|---|
| 1 | `judgeq-d-1-fact_pursuit-2-v1` | d-1 / fact_pursuit | "이준호 씨, 새벽마다 같은 번호와 짧게 통화하셨습니다. **그 통화** 상대가 누구였는지 말씀해 주시겠습니까." | 지시대명사 → 중립. "새벽 통화 상대" / "관련 통화 상대" |
| 2 | `judgeq-d-1-empathy_approach-1-v2` | d-1 / empathy_approach | "박지연 씨, **그 기록**을 처음 본 순간 몸이 먼저 반응한 감정이 무엇이었는지 들려주십시오." | "관련 기록을" / "해당 기록을" / 또는 구체화 ("통화 기록을") |
| 3 | `judgeq-d-2-motive_search-4-v2` | d-2 / motive_search | "박지연 씨, 제 몫을 지켜야 한다는 생각이 왜 이준호 씨를 추궁하는 **선을 넘게** 했습니까." | "선" frame 회피. "직접 추궁하게" / "추궁으로 옮기게" |
| 4 | `judgeq-d-2-empathy_approach-1-v4` | d-2 / empathy_approach | "박지연 씨, **그 기록**을 본 뒤 손이 먼저 굳었는지, 머릿속 계산이 먼저 돌았는지 말씀해 주십시오." | "관련 기록을" / 또는 구체화 ("출금 기록을") |
| 5 | `judgeq-h-d3-motive_search-4-v4` | h-d3 / motive_search | "두 분, 상대의 잘못을 이유로 본인이 **선을 넘은** 행동을 어디까지 설명할 수 있다고 보십니까." | "선" frame 회피. "절차에 손댄 행동" / "직접 옮긴 행동" |
| 6 | `judgeq-h-d4-fact_pursuit-3-a-v1` | h-d4 / fact_pursuit | "박지연 씨, 휴대폰 의학 검색 기록을 보았을 때 **그 자료**가 형 일과 다른 영역이라고 받아들이셨습니까?" | "해당 자료가" / "관련 자료가" / "이 자료가" |
| 7 | `judgeq-h-d4-fact_pursuit-3-b-v1` | h-d4 / fact_pursuit | "이준호 씨, 휴대폰 검색 기록이 본인 것이라는 점을 인정하십니까. **그 기록**이 남은 이유를 어떻게 설명하시겠습니까?" | "해당 기록이" / "관련 기록이" / "이 기록이" |
| 8 | `judgeq-h-d4-motive_search-1-a-v1` | h-d4 / motive_search | "박지연 씨, **그 자료들**이 출산 관련 조사였다는 설명을 들은 뒤 가장 먼저 든 생각은 무엇입니까?" | "해당 자료들이" / "관련 자료들이" |

## judge_contradiction 채널 (3 entries)

| # | id | dispute / tone | 현 KO 위반 | 핵심 변환 방향 |
|---|---|---|---|---|
| 9 | `judgec-d-2-mid-v5` | d-2 / mid | "박지연 씨, 이 출금을 문제 삼으려면 본인이 **그 기록**을 어떻게 알았는지도 함께 밝혀야 합니다." | "관련 기록을" / "이 기록을" / "출금 기록을" |
| 10 | `judgec-h-d3-mid-v1` | h-d3 / mid | "박지연 씨, 이미 배신당한 사람이라는 입장이 서류를 꾸민 행동까지 덮어 주지는 않습니다. 왜 **그 선을 넘었는지** 말씀하십시오." | "왜 절차에 직접 손을 댔는지" / "왜 서류를 직접 손댔는지" |
| 11 | `judgec-h-d3-hard-v4` | h-d3 / hard | "두 분, 숨김과 **선을 넘은 행동**은 무게가 다릅니다. 해지 절차 문제의 책임을 다른 쟁점 뒤로 돌리지 마십시오." | "절차를 손댄 행동" / "절차에 직접 손댄 행동" |

## 위반 어휘 분포

| 어휘 | 수 |
|---|---|
| "그 X" (지시 대명사) | 7 |
| "선을 넘" (행위 평가) | 4 |
| **Total** | **11** |

## 변환 시 보존 영역

- **재판관 격식**: `...십시오` / `...습니까` (변경 X)
- **호칭**: "박지연 씨" / "이준호 씨" (변경 X)
- **dispute 관련 명사**: "휴대폰 검색 기록" / "위임장" / "공동 적금" 등 (변경 X — 구체화 시 본문 명사 활용 OK)
- **tone**: mid/hard/soft/early/late marker는 entry id의 tone 정보 따라 자연 강도 유지
- **lieState 단계 의식**: S0~S5 lieState 깊이 따라 추궁 강도 조정 (이 정보는 각 entry의 sourceRefs로 확인 가능)

## 산출 형식

JSON으로 1 file에 11 entries 모아서 산출:

```json
{
  "case": "spouse-01",
  "channel": "mixed (judge_question + judge_contradiction)",
  "policy": "feedback_judge_dispassionate_action_focused",
  "polished": [
    {
      "id": "judgeq-d-1-fact_pursuit-2-v1",
      "channel": "judge_question",
      "old": "이준호 씨, 새벽마다 같은 번호와 짧게 통화하셨습니다. 그 통화 상대가 누구였는지 말씀해 주시겠습니까.",
      "new": "...",
      "rationale": "..."
    },
    ...
  ]
}
```

각 entry는 `new` 시안 1개 + `rationale` 1줄 (변환 사유). GPT Pro 작업.

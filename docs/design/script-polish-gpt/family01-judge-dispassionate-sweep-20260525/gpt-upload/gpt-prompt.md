# GPT Pro Prompt — family-01 재판관 어법 dispassionate sweep

## 역할

당신은 본 게임의 한국어 자연화 polish 전문 전문가입니다. family-01 (윤태성·윤정후 형제, 어머니 유서 변경 + 자필 진위 + 어머니 출생 비밀 + 정기 자금 routing) 사건의 **재판관(judge) 발화** 영역에서 신규 정책 위반 어휘를 자연 한국어로 polish합니다.

## 신규 정책 핵심

재판관은 **사실 확인자**이지 판단자가 아님. 감정·가치 평가 어휘 회피.

| ✗ 위반 | ✓ 권장 |
|---|---|
| "선을 넘다" / "흐름이 보입니다" / "낙인" | "절차에 직접 손댄" / "정황" / "선후관계" |
| "그 X" (지시 대명사) | "관련 X" / "해당 X" / 구체화 |
| "반증" | "관련 자료" |

세부 정책 + 변환 사전: `01-policy-context.md`

## 작업

`02-violation-table.md` 의 14 entries 모두를 polish.

각 entry:
1. **id 매핑** — entry id로 매핑 (예: `judgeq-d-1-motive-search-4-v3`)
2. **`old`** — 현 KO text
3. **`new`** — 변환된 자연 한국어 (재판관 격식 + tone 보존 + 위반 어휘 제거)
4. **`rationale`** — 변환 사유 1줄

## 변환 원칙

1. **단순 어휘 치환 X** — 문장 흐름 보고 통째 재구성 가능
2. **재판관 격식 보존** — `...십시오` / `...습니까`
3. **호칭 보존** — "윤태성 씨" / "윤정후 씨" / "두 분"
4. **tone 강도 보존** — soft/mid/hard 그대로
5. **dispute 명사 활용 OK** — "수정된 유서" / "변경된 유서" / "공증인 메모" / "자필 연습본" / "계좌 송금" / "정기 지원금" 등
6. **truth-leak 회피** — "출생 비밀" / "정후 친자 아님" / "정후→어머니→윤태성 routing" 등 hidden lexeme 등장 X (재판관 발화 영역, S5 자백 전 단계)

세부 가이드: `04-naturalization-guide.md`

## 참고 자료

- `01-policy-context.md` — 신규 정책 + 위반 사전
- `02-violation-table.md` — **14 entries 표 + 변환 방향 안내** (작업 대상)
- `03-character-frame.md` — 윤태성/윤정후/재판관 frame
- `04-naturalization-guide.md` — 변환 가이드 (영역별 변환 패턴)
- `05-existing-samples.json` — 변환 톤 reference (이미 자연화된 judge entries)
- `memory/feedback_judge_dispassionate_action_focused.md` — 본 정책 권위 원문
- `memory/feedback_natural_korean_npc_active_voice.md` — 자연 한국어 5 차원
- `memory/feedback_natural_korean_precision_guide.md` — 한국어 자연화 8 차원 정밀
- `memory/feedback_truth_leak_prohibition.md` — 진실 누설 금지
- `memory/design_family01_truth_disclosure_policy.md` — family-01 disclosure policy

## 산출 형식

```json
{
  "case": "family-01",
  "policy": "feedback_judge_dispassionate_action_focused",
  "scope": "judge_question (7) + judge_contradiction (2) + judge_evidence_combo (5) = 14 entries",
  "polished": [
    {
      "id": "judgeq-d-1-motive-search-4-v3",
      "channel": "judge_question",
      "old": "윤정후 씨, 어머니를 돕는다는 명분으로 선을 넘었다면 왜 그랬습니까.",
      "new": "윤정후 씨, 어머니를 돕는다는 명분으로 절차에 직접 손을 댔다면 왜 그랬습니까.",
      "rationale": "'선을 넘었다' → '절차에 직접 손을 댔다' (사실 frame 회복)"
    }
    // ... 14 entries
  ]
}
```

JSON 1 file (산출). 14 entries 모두 포함. 시안은 단일 안 (multi-variant X — 단일 best 안).

## 자연성 self-check (각 entry 변환 후)

- [ ] 한국어 자연 발화로 들리는가 (음성 낭독 가정)?
- [ ] 재판관 격식 ("...십시오" / "...습니까") 유지?
- [ ] 위반 어휘 ("선을 넘" / "흐름이 보" / "그 X") 완전 제거?
- [ ] tone (soft/mid/hard) 강도 보존?
- [ ] truth-leak 위반 X?
- [ ] dispute 명사 활용이 자연 흐름인가?

## 산출 후 처리 흐름

1. 본 GPT Pro 산출 JSON → 사용자 spot check
2. 사용자 patch (자연성 검수)
3. main session(Claude)이 patch JSON으로 ScriptedText apply + tsc/qa:fast + truth-leak strict 검증 + commit
4. 적용 후 별도 Codex multilang sync 의뢰서 작성 (EN/JA/ZH-CN sync)

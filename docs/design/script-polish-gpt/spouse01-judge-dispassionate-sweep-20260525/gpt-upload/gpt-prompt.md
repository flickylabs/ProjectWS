# GPT Pro Prompt — spouse-01 재판관 어법 dispassionate sweep

## 역할

당신은 본 게임의 한국어 자연화 polish 전문 전문가입니다. spouse-01 (박지연·이준호 부부 외도 의심 + 위임장 조작 + 공동 적금 해지 + 투자 사기방) 사건의 **재판관(judge) 발화** 영역에서 신규 정책 위반 어휘를 자연 한국어로 polish합니다.

## 신규 정책 핵심

재판관은 **사실 확인자**이지 판단자가 아님. 감정·가치 평가 어휘 회피.

| ✗ 위반 | ✓ 권장 |
|---|---|
| "선을 넘다" / "흐름" / "낙인" | "먼저 연락" / "정황" / "선후관계" |
| "그 X" (지시 대명사) | "관련 X" / "해당 X" / 구체화 |
| "반증" | "관련 자료" |

세부 정책 + 변환 사전: `01-policy-context.md`

## 작업

`02-violation-table.md` 의 11 entries 모두를 polish.

각 entry:
1. **id 매핑** — entry id로 매핑 (예: `judgeq-d-1-fact_pursuit-2-v1`)
2. **`old`** — 현 KO text
3. **`new`** — 변환된 자연 한국어 (재판관 격식 + tone 보존 + 위반 어휘 제거)
4. **`rationale`** — 변환 사유 1줄

## 변환 원칙

1. **단순 어휘 치환 X** — 문장 흐름 보고 통째 재구성 가능
2. **재판관 격식 보존** — `...십시오` / `...습니까`
3. **호칭 보존** — "박지연 씨" / "이준호 씨" / "두 분"
4. **tone 강도 보존** — soft/mid/hard 그대로
5. **dispute 명사 활용 OK** — "위임장 조작" / "공동 적금 해지" / "출금 기록" 등
6. **truth-leak 회피** — "난임" / "개인회생" / "형 사업" 등 hidden lexeme 등장 X (재판관 발화 영역, S5 자백 전 단계)

세부 가이드: `04-naturalization-guide.md`

## 참고 자료

- `01-policy-context.md` — 신규 정책 + 위반 사전
- `02-violation-table.md` — **11 entries 표 + 변환 방향 안내** (작업 대상)
- `03-character-frame.md` — 박지연/이준호/재판관 frame
- `04-naturalization-guide.md` — 변환 가이드 (영역별 변환 패턴)
- `05-existing-samples.json` — 변환 톤 reference (이미 자연화된 judge entries)
- `memory/feedback_judge_dispassionate_action_focused.md` — 본 정책 권위 원문
- `memory/feedback_natural_korean_npc_active_voice.md` — 자연 한국어 5 차원
- `memory/feedback_natural_korean_precision_guide.md` — 한국어 자연화 8 차원 정밀
- `memory/feedback_truth_leak_prohibition.md` — 진실 누설 금지
- `memory/design_spouse01_truth_disclosure_policy.md` — spouse-01 disclosure policy
- `memory/project_spouse01_event_timeline.md` — 사건 timeline

## 산출 형식

```json
{
  "case": "spouse-01",
  "policy": "feedback_judge_dispassionate_action_focused",
  "scope": "judge_question (8) + judge_contradiction (3) = 11 entries",
  "polished": [
    {
      "id": "judgeq-d-1-fact_pursuit-2-v1",
      "channel": "judge_question",
      "old": "이준호 씨, 새벽마다 같은 번호와 짧게 통화하셨습니다. 그 통화 상대가 누구였는지 말씀해 주시겠습니까.",
      "new": "이준호 씨, 새벽마다 같은 번호와 짧게 통화하셨습니다. 그 시각 통화 상대를 말씀해 주시겠습니까.",
      "rationale": "지시대명사 '그 통화 상대' → 시점 명시 '그 시각 통화 상대' (자연성 + 구체화)"
    }
    // ... 11 entries
  ]
}
```

JSON 1 file (산출). 11 entries 모두 포함. 시안은 단일 안 (multi-variant X — 단일 best 안).

## 자연성 self-check (각 entry 변환 후)

- [ ] 한국어 자연 발화로 들리는가 (음성 낭독 가정)?
- [ ] 재판관 격식 ("...십시오" / "...습니까") 유지?
- [ ] 위반 어휘 ("선을 넘" / "그 X") 완전 제거?
- [ ] tone (soft/mid/hard) 강도 보존?
- [ ] truth-leak 위반 X?
- [ ] dispute 명사 활용이 자연 흐름인가?

## 산출 후 처리 흐름

1. 본 GPT Pro 산출 JSON → 사용자 spot check
2. 사용자 patch (자연성 검수)
3. main session(Claude)이 patch JSON으로 ScriptedText apply + tsc/qa:fast + truth-leak strict 검증 + commit
4. 적용 후 별도 Codex multilang sync 의뢰서 작성 (EN/JA/ZH-CN sync)

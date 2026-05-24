# GPT Pro 의뢰서 — family-01 재판관 어법 dispassionate sweep (2026-05-25)

## 0. 개요

신규 정책 **[[feedback_judge_dispassionate_action_focused]]** (Cycle 7 도입) 의 cross-case sweep 영역. family-01 의 재판관(judge) 발화 채널에서 위반 어휘 14 entries (KO baseline) polish 시안 요청.

- **사건**: 윤태성·윤정후 형제, 어머니 유서 변경 (60:40) + 자필 진위 + 어머니 출생 비밀 (정후→어머니 친자 아님) + 정기 자금 routing (정후→어머니→윤태성 공장)
- **영역**: judge_question (7) + judge_contradiction (2) + judge_evidence_combo (5) = **14 entries**
- **위반 어휘 분포**: "선을 넘" 7 / "흐름" 3 / "그 X" 4
- **권한**: 본 의뢰서는 KO baseline polish 시안만 — 다국어(EN/JA/ZH-CN) sync는 적용 후 별도 Codex 의뢰서 작성

## 1. 정책 핵심

재판관은 **사실 확인자**이지 판단자가 아님 (사실 확정 전 단계). 감정·가치 평가 어휘 회피.

| ✗ 위반 (감정·가치) | ✓ 권장 (사실·행위) |
|---|---|
| "선을 넘다" / "흐름" / "낙인" | "먼저 연락" / "정황" / "선후관계" |
| "그 X" (지시 대명사) | "관련 X" / "해당 X" (중립) |
| "반증" (대립 frame) | "관련 자료" (중립) |

## 2. 의뢰서 자료 구조

```
family01-judge-dispassionate-sweep-20260525/
├── README.md (본 파일)
└── gpt-upload/
    ├── 01-policy-context.md      신규 정책 + 위반 사전
    ├── 02-violation-table.md     정확한 entry 표 + 권장 변환 방향
    ├── 03-character-frame.md     윤태성/윤정후/재판관 frame
    ├── 04-naturalization-guide.md 변환 가이드 (judge dispassionate 어법)
    ├── 05-existing-samples.json  변환 톤 reference (이미 자연화된 judge entries)
    ├── gpt-prompt.md              GPT Pro 입력 prompt 본문
    └── memory/                    self-contained 정책 메모리 복사
        ├── feedback_judge_dispassionate_action_focused.md
        ├── design_family01_truth_disclosure_policy.md
        ├── feedback_natural_korean_npc_active_voice.md
        ├── feedback_natural_korean_precision_guide.md
        └── feedback_truth_leak_prohibition.md
```

## 3. GPT Pro 작업 단계

1. `gpt-upload/` 폴더 자료 GPT Pro Projects에 일괄 upload
2. `gpt-prompt.md` 본문 입력
3. GPT Pro 시안 → JSON 산출 (id 매핑 + 변환 text)
4. 사용자 spot check (Claude KO polish 한계 권위 — 시안 작성 X, 검수만)
5. 사용자 patch → main session(Claude) apply + tsc/qa:fast 검증 + commit
6. 적용 후 Codex multilang sync 의뢰서 별도 작성 (EN/JA/ZH-CN 14 × 3 = 42 entries)

## 4. 산출 형식 (GPT Pro 출력)

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
      "new": "윤정후 씨, 어머니를 돕는다는 명분으로 절차에 직접 손을 댄 이유를 말씀하십시오.",
      "rationale": "'선을 넘었다' → '절차에 직접 손을 댄' (사실 frame 회복)"
    }
    // ... 14 entries
  ]
}
```

## 5. 권위 메모리 참조

- [[feedback_judge_dispassionate_action_focused]] — 본 정책 권위
- [[feedback_claude_korean_polish_limitation]] — Claude 한국어 polish 한계 (GPT Pro 경유 필수)
- [[design_family01_truth_disclosure_policy]] — 진실 노출 정책 (변환 시 truth leak 회피)
- [[feedback_truth_leak_prohibition]] — 진실 누설 금지 핵심 원칙
- [[feedback_natural_korean_npc_active_voice]] / [[feedback_natural_korean_precision_guide]] — 자연 한국어 가이드

## 6. 자매 의뢰서

- `spouse01-judge-dispassionate-sweep-20260525/` — spouse-01 사건 11 entries 동일 정책 sweep
- friend-01 본 cycle 7 영역은 적용 완료, line C 이후는 cycle 진행 시 자연 반영

## 7. 적용 순서

1. GPT Pro 시안 산출 (본 의뢰서)
2. 사용자 spot check + patch
3. Claude apply + tsc/qa:fast + truth-leak strict 검증 + commit
4. Codex multilang sync (EN/JA/ZH-CN) 별도 의뢰서 작성 후 worktree spawn
5. 사후 통합 (cherry-pick or merge) + 정책 [[feedback_baseline_anchor_scripted_text]] 따라 baseline anchor 자동 update

본 의뢰서는 family-01 Cycle 5/6 narrative wrapper 영역과 **분리 가능** (judge_question / judge_contradiction / judge_evidence_combo 채널은 dispute-stage 일관 영역이라 narrative wrapper의 emergence_narrative와 channel 충돌 X).

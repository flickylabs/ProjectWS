# spouse-01 Cycle 4 plot revision — ScriptedText KO base 갱신 의뢰서

**작성일**: 2026-05-24
**작업 영역**: CT 세션 — case content 본질 재설계 (narrative wrapper Cycle 4 영역 아님)
**HEAD 시점**: `c3109b58` (case.ts + derived layer 4개 commit 완료)
**대상 사건**: spouse-01 "새벽 통화기록"
**신규 plot 본질**: 비자금의 원래 목적 = 박지연 난임 치료비 (신혼 초기 진단 + 이준호 혼자 조사)

---

## 본 의뢰서 진행 흐름 (사용자 → GPT Pro)

1. 본 폴더를 GPT Pro Projects File에 업로드 (전체 폴더 한 번에 압축 권장)
2. `08-gpt-prompt.md` 본문을 GPT Pro에 prompt로 전달
3. GPT Pro가 batch별 KO 시안 작성
4. 사용자 spot check + patch
5. Claude (main CT 세션 또는 신규 세션)가 main에 적용 + 검증 + commit
6. **다국어 sync는 Cycle 4 narrative wrapper 세션 진입 후 별도 Codex worktree 의뢰** (본 의뢰서 영역 외)

---

## 본 의뢰서 작업 영역

신규 hidden 쟁점 **h-d4 "비자금의 원래 목적"** + 신규 증거 **e-8 "휴대폰 의학 검색 기록"** / **e-9 "보험사 견적 자료"** + 신규 단서 카드 **dc-8 "이준호의 또 다른 침묵"** 의 ScriptedText 채널 entry KO base 작성.

### 작성 대상 채널 (9개)

| 채널 | h-d4 추정 entry 수 | 비고 |
|---|---|---|
| `interrogation` | ~24 | S0~S5 × 2 party × 2 variant |
| `judge_question` | ~16 | dispute별 표면 질문 |
| `judge_evidence_combo` | ~6 | e-8/e-9 결합 영역 |
| `judge_contradiction` | ~6 | 단계별 contradiction |
| `judge_witness_summon` | ~2 | h-d4 link 영역 (의사 친구 영역 외부 증인 X — 본 사건 witness 3명 모두 다른 dispute link) |
| `evidence_present` | ~16 | e-8/e-9 제시 시 NPC 반응 |
| `dossier` | ~6 | dc-8 entry |
| `contradiction_pursuit` | ~6 | h-d4 contradiction 추궁 |
| `mediation` | ~2 | h-d4 S4 단계 |
| `aftermath` | ~2 | h-d4 S5 단계 |
| **합계** | **~86 entry** | 4언어로 sync 시 ~344 (다국어는 Cycle 4 영역) |

**※ emergence_narrative 채널은 본 의뢰서 영역 외 (Cycle 4 narrative wrapper 세션에서 작성)**

---

## 폴더 구조

```
spouse-01-cycle4-plot-revision-scripted-text-20260524/
├── README.md (본 파일 — index)
├── 01-context-and-plot.md (사건 context + 신규 plot 본질)
├── 02-case-authority-h-d4-full.md (h-d4 정의 전문 + truthStages 6단계)
├── 03-case-authority-e8-e9-dc8.md (신규 증거 + 단서 카드 정의)
├── 04-channel-entry-spec.md (채널별 entry 작성 명세)
├── 05-existing-samples/ (기존 h-d3 / dc-3 / dc-7 entry sample)
│   ├── h-d3-interrogation-sample.json
│   ├── h-d3-judge-question-sample.json
│   └── dc-7-dossier-sample.json
├── 06-policies/ (정책 메모리 사본)
│   ├── design-spouse01-truth-disclosure-policy.md
│   ├── feedback-family-address-speaker-perspective.md
│   ├── feedback-truth-leak-prohibition.md
│   ├── feedback-natural-korean-precision-guide.md
│   └── feedback-natural-korean-npc-active-voice.md
├── 07-character-frame.md (박지연/이준호 신규 backstory + speech tells)
└── 08-gpt-prompt.md (GPT Pro에 전달할 최종 prompt)
```

---

## 영역 외 (본 의뢰서 작성 X)

- ❌ narrative wrapper triggers (h-d4 / e-8 / e-9 / dc-8 narrativeTriggers 영역) — **Cycle 4 narrative wrapper 세션 영역**
- ❌ `emergence_narrative` 채널 entry — **Cycle 4 narrative wrapper 세션 영역**
- ❌ EN / JA / ZH-CN 다국어 sync — **Cycle 4 narrative wrapper 세션의 7단계 (별도 Codex worktree)**

---

## 권위 정책 (정독 필수)

- [`06-policies/design-spouse01-truth-disclosure-policy.md`](06-policies/design-spouse01-truth-disclosure-policy.md) — 진실 노출 정책 (난임/시험관/아내 모르게 등 hidden keyword 등장 단계)
- [`06-policies/feedback-truth-leak-prohibition.md`](06-policies/feedback-truth-leak-prohibition.md) — 잘못 패턴 #9 진실 누설 금지
- [`06-policies/feedback-family-address-speaker-perspective.md`](06-policies/feedback-family-address-speaker-perspective.md) — NPC 1인칭 본인 가족 호칭 자기시점
- [`06-policies/feedback-natural-korean-precision-guide.md`](06-policies/feedback-natural-korean-precision-guide.md) — 19 차원 자연성 가이드 (v7)
- [`06-policies/feedback-natural-korean-npc-active-voice.md`](06-policies/feedback-natural-korean-npc-active-voice.md) — NPC 적극 발화 5 차원

---

## 작성 결과 산출 형식

GPT Pro가 작성한 batch별 KO 시안은 다음 형식으로:

```json
{
  "key": "h-d4-interrogation-b-S0-q1-v1",
  "channel": "interrogation",
  "dispute": "h-d4",
  "speaker": "b",
  "lieState": "S0",
  "ko": "비자금이라뇨, 그냥 모은 돈입니다.",
  "stageGate": "S0-S2 forbiddenKeywords 영역 X",
  "naturalKoreanNotes": "..."
}
```

main 적용 시 Claude가 `src/data/scriptedText/spouse-01.json` channels 영역에 정확 ID로 등록.

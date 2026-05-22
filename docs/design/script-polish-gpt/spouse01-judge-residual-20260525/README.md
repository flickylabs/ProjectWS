# spouse-01 judge_evidence_combo 잔존 polish 의뢰 모음 (2026-05-25)

직전 21건 polish (commit `fa7df8f9`) 완료 후, 같은 channel의 **잔존 3 영역 × 15 entries = 45건** GPT Pro polish 의뢰 모음.

3 스레드 병렬 진행 권장.

---

## ★ 폴더 구성 (3 batch 병렬)

```
spouse01-judge-residual-20260525/
├── README.md              ← 본 file (사용자용)
├── prompt-master.md       ← 사용자용 (전체 brief 참고)
├── gpt-upload-batch1/     ← ★ GPT 스레드 A 업로드
│   ├── INSTRUCTIONS.md
│   ├── policy-01-natural-korean.md
│   ├── policy-02-truth-disclosure.md
│   └── batch-01-dc1-b-q1.md
├── gpt-upload-batch2/     ← ★ GPT 스레드 B 업로드 (★ 진실 누설 회피 핵심)
│   ├── INSTRUCTIONS.md
│   ├── policy-01-natural-korean.md
│   ├── policy-02-truth-disclosure.md
│   └── batch-02-dc3-b-q2.md
└── gpt-upload-batch3/     ← ★ GPT 스레드 C 업로드
    ├── INSTRUCTIONS.md
    ├── policy-01-natural-korean.md
    ├── policy-02-truth-disclosure.md
    └── batch-03-dc4-a-q2.md
```

각 batch 폴더는 자가완결 (INSTRUCTIONS + policy 2개 + 해당 batch file 1개 = 4 file).

---

## GPT Pro 사용법 (★ 3 스레드 병렬)

GPT Pro 새 채팅창 3개 동시 개설:

| 스레드 | 업로드 폴더 | 메시지 (동일) |
|--------|------------|--------------|
| A | `gpt-upload-batch1/` 내 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` |
| B | `gpt-upload-batch2/` 내 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` |
| C | `gpt-upload-batch3/` 내 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` |

각 스레드의 `INSTRUCTIONS.md`가 batch-specific으로 작성되어 있어 동일 메시지로 batch별 polish 진행. 숫자 변경 불필요.

---

## 의뢰 범위 요약

| Batch | 영역 | entries | 특이사항 |
|-------|------|---------|----------|
| 1 | dc-1.b.q1 (외도 evidence 조합) | 15 | 자연화 위주 |
| 2 | dc-3.b.q2 (B 개인 출금 책임) | 15 | ★ 진실 누설 회피 4 entries 필수 ("가족"/"집안" 직접 등장) |
| 3 | dc-4.a.q2 (A 박지연 송금 책임) | 15 | 자연화 위주 |

---

## 권장 운영 흐름

**3 스레드 GPT 병렬 + 분리 commit (3개) + 통합 sync (1개)** 권장.

GPT 단계: 병렬 (시간 단축)
Claude main session patch: batch별 분리 commit (회귀 안전성)
Codex 다국어 sync: 45 entries 통합 의뢰 (worktree 효율)

---

## 단계별 명령 (사용자 입장)

### Step 1. GPT Pro 3 스레드 병렬 의뢰

각 스레드:
1. GPT Pro 새 채팅창 열기
2. `gpt-upload-batchN/` 폴더 내 4 file 모두 업로드
3. 메시지 한 줄: `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘`
4. GPT 결과 받기 (15건 각각 "변경 후 / 변경 영역" 형식)

### Step 2. 사용자 spot check (3 스레드 결과 통합 검토)

각 batch 결과 검토:
- 자연 한국어 톤 / 의미 보존 / 진실 누설 회피 / 게임 톤
- 어색 영역 직접 patch 작성

★ Batch 2 결과는 특히 진실 누설 회피 4 entries (soft-v4 / mid-v1 / mid-v5 / hard-v3) 의 "가족"/"집안" → "다른 사정"/"별도 사용처" 변환 검증 필수

### Step 3. Claude main session에 batch별 patch 적용 의뢰

```
Batch 1 patch 적용해줘. 아래는 spot check 후 최종 KO:

judgecombo-dc-1-b-q1-soft-v1: [최종 KO]
...
judgecombo-dc-1-b-q1-hard-v5: [최종 KO]
```

Claude 실행:
1. `src/data/scriptedText/spouse-01.json` 의 15 entries `text` 영역 Edit
2. `npx tsc -b --force` (silent PASS 필수)
3. `npm run qa:fast` (P0=0 필수)
4. `node scripts/detect-truth-leak.cjs --strict` (findings=0 필수, Batch 2 핵심 검증)
5. commit + push

Batch 2 / Batch 3 동일 흐름 반복.

### Step 4. 통합 Codex 다국어 sync 의뢰서 작성

3 batch main commit 완료 후:

```
통합 Codex sync 의뢰서 작성해줘.
```

Claude 실행:
1. 의뢰서 작성: `docs/design/translation-spouse01-judge-polish-residual-20260525/codex-multilang-sync.md`
   - 45 entries × 3 lang (EN/JA/ZH-CN) = 135 변경 anchor
   - 각 batch별 commit hash 포함
   - 진실 누설 정책 + 번역체 회피 + detect-truth-leak 검증 명시
2. worktree spawn:
   ```
   git worktree add -b codex/spouse01-judge-polish-residual-sync ../ws-spouse01-judge-polish-residual-sync main
   git config --global --add safe.directory D:/ws-spouse01-judge-polish-residual-sync
   ```
3. 사용자: Codex 환경에서 worktree 진입 + 의뢰서 실행 + push

### Step 5. Codex push 후 cherry-pick

```
Codex 결과 cherry-pick + main push 해줘.
```

---

## 명령 요약

### 사용자 → GPT Pro (3 스레드 병렬)

모두 동일 메시지: `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘`

업로드 폴더만 다름 (batch1/batch2/batch3).

### 사용자 → Claude (5회)

| 차례 | 메시지 |
|------|--------|
| 1 | `Batch 1 patch 적용해줘` + spot check 본문 |
| 2 | `Batch 2 patch 적용해줘` + spot check 본문 |
| 3 | `Batch 3 patch 적용해줘` + spot check 본문 |
| 4 | `통합 Codex sync 의뢰서 작성해줘` |
| 5 | `Codex 결과 cherry-pick + main push 해줘` |

---

## 관련 정책

- [feedback_claude_korean_polish_limitation](../../../../memory/feedback_claude_korean_polish_limitation.md) — Claude 한국어 polish 시안 작성 X, GPT Pro 경유 정책
- [feedback_natural_korean_precision_guide](../../../../memory/feedback_natural_korean_precision_guide.md) — 한국어 자연화 19 차원 가이드
- [design_spouse01_truth_disclosure_policy](../../../../memory/design_spouse01_truth_disclosure_policy.md) — spouse-01 진실 누설 정책
- [feedback_claude_ko_needs_codex_multilang](../../../../memory/feedback_claude_ko_needs_codex_multilang.md) — KO 변경 시 Codex 다국어 sync 의뢰 필수
- [gpt-polish-prompt-template](../gpt-polish-prompt-template.md) — GPT prompt 표준 template

# spouse-01 evidence_present 진실 누설 회피 polish 의뢰 모음 (2026-05-25)

QA suite 진행 중 `evidence_present` channel의 early/mid stage에서 hidden 키워드 (가족 / 집안 / 시댁 / 횡령 / 사기) 직접 등장 **69건** 발견.

`detect-truth-leak` matrix는 PASS (designIntentTags `reveal:partial` 영역) — 그러나 [design_spouse01_truth_disclosure_policy](../../../../memory/design_spouse01_truth_disclosure_policy.md) frame 정책상 "사전 진술에서 한 번만 OK" 위반.

사용자 결정: **전면 polish (69건 모두 변환)**.

3 스레드 병렬 진행 권장.

---

## ★ 폴더 구성 (3 batch 병렬)

```
spouse01-evidence-residual-20260525/
├── README.md                        ← 본 file (사용자용)
├── gpt-upload-batch1/               ← ★ GPT 스레드 A (e-1 + e-2, 27건)
│   ├── INSTRUCTIONS.md
│   ├── policy-01-natural-korean.md
│   ├── policy-02-truth-disclosure.md
│   └── batch-01-e1-e2.md
├── gpt-upload-batch2/               ← ★ GPT 스레드 B (e-3 + e-4, 28건)
│   ├── INSTRUCTIONS.md
│   ├── policy-01-natural-korean.md
│   ├── policy-02-truth-disclosure.md
│   └── batch-02-e3-e4.md
└── gpt-upload-batch3/               ← ★ GPT 스레드 C (e-5 + a|e-6 + a|e-7 + b|e-6, 14건)
    ├── INSTRUCTIONS.md
    ├── policy-01-natural-korean.md
    ├── policy-02-truth-disclosure.md
    └── batch-03-e5-misc.md
```

---

## GPT Pro 사용법 (★ 3 스레드 병렬)

| 스레드 | 업로드 폴더 | 메시지 (동일) | entries |
|--------|------------|--------------|---------|
| A | `gpt-upload-batch1/` 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` | 27 |
| B | `gpt-upload-batch2/` 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` | 28 |
| C | `gpt-upload-batch3/` 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` | 14 |

각 INSTRUCTIONS는 batch-specific (Batch 1/2/3 영역만 다름). 동일 메시지로 진행.

---

## 의뢰 범위 요약

| Batch | Evidence | entries | 변환 영역 |
|-------|----------|---------|----------|
| 1 | e-1 (참고서) + e-2 (GPS) | 27 | 가족/집안 → 다른 사정. 횡령 2건 동일 문구. |
| 2 | e-3 (통화) + e-4 (문자) | 28 | 가족/집안/시댁 → 다른 사정. e-4 mid|1 4 variants 동일 frame. 횡령 1건. |
| 3 | e-5 (현금) + a|e-6 + a|e-7 + b|e-6 | 14 | 가족/집안 → 다른 사정. 사기 2건. 박지연 측 영역 frame 보존. |

---

## NPC 발화 특성 (★ 직전 judge_evidence_combo와 다름)

- `judge_evidence_combo`: **재판관 발화** — 격식체 ("말씀해 주십시오"), 추궁 톤
- `evidence_present`: **NPC 본인 발화** — 일상 격식체 ("~합니다 / ~네요 / ~겠습니다"), 변명·인정·회피 톤

따라서 polish 톤은 직전 batch와 다름. NPC 본인 입장에서 자연스럽게.

---

## 단계별 명령

### Step 1. GPT Pro 3 스레드 병렬 의뢰

각 스레드 새 채팅창 → `gpt-upload-batchN/` 4 file 업로드 → 메시지 한 줄.

### Step 2. spot check

각 batch 결과 검토. ★ 모든 entries 진실 누설 회피 변환 검증 필수.

### Step 3. Claude main session 적용

```
evidence Batch 1 patch 적용해줘. 아래는 spot check 후 최종 KO:
[27 entries 결과]
```

Claude:
1. `src/data/scriptedText/spouse-01.json` evidence_present entries 일괄 변경 (Node script)
2. `npx tsc -b --force` / `npm run qa:fast` / `node scripts/detect-truth-leak.cjs --strict`
3. commit + push

### Step 4. Batch 2/3 동일 흐름

### Step 5. 통합 Codex 다국어 sync 의뢰서 작성

3 batch main commit 완료 후:
```
evidence 통합 Codex sync 의뢰서 작성해줘.
```

---

## 사용자 → Claude 표준 명령

| 차례 | 메시지 |
|------|--------|
| 1 | `evidence Batch 1 patch 적용해줘` + spot check 본문 |
| 2 | `evidence Batch 2 patch 적용해줘` + spot check 본문 |
| 3 | `evidence Batch 3 patch 적용해줘` + spot check 본문 |
| 4 | `evidence 통합 Codex sync 의뢰서 작성해줘` |
| 5 | `Codex 결과 cherry-pick + main push 해줘` |

---

## 관련 정책

- [design_spouse01_truth_disclosure_policy](../../../../memory/design_spouse01_truth_disclosure_policy.md) — spouse-01 진실 누설 정책 (frame 권위)
- [feedback_claude_korean_polish_limitation](../../../../memory/feedback_claude_korean_polish_limitation.md) — Claude 한국어 polish 시안 작성 X, GPT Pro 경유
- [design_truth_leak_keyword_nature](../../../../memory/design_truth_leak_keyword_nature.md) — hidden keyword 본성 분류
- [spouse01-judge-residual-20260525](../spouse01-judge-residual-20260525/) — 직전 judge_evidence_combo polish 45 entries (commit 43be19a6)

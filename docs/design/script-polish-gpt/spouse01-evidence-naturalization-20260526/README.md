# spouse-01 evidence_present 잔존 자연화 polish 의뢰 모음 (2026-05-26)

직전 evidence_present 진실 누설 회피 69 variants polish 완료 (commit `1ae1fc5a`) 후, **잔존 자연화 후보 95 variants** GPT Pro polish 의뢰 모음.

본 batch는 **NPC 자기 발화 영역**. 어색 패턴 사전 검출 결과:
- 강조 부사 ("그렇게 / 차분히 / 끝까지"): 60 variants
- 추상명사 ("그 사정 / 그 흐름 / 그 판단"): 22 variants
- 직역 어미 ("가리킵니다 / 이어집니다 / 모입니다"): 12 variants
- 피동 어색 ("느껴집니다"): 1 variant

총 95 unique variants. party A (박지연) 53 + party B (이준호) 42.

2 batch frame 분리 → GPT Pro 2 스레드 병렬 권장.

---

## ★ 폴더 구성 (2 batch 병렬)

```
spouse01-evidence-naturalization-20260526/
├── README.md              ← 본 file (사용자용)
├── gpt-upload-batch1/     ← ★ GPT 스레드 A 업로드 (e-1+e-2+e-3 외도 evidence)
│   ├── INSTRUCTIONS.md
│   ├── policy-01-natural-korean.md
│   ├── policy-02-truth-disclosure.md
│   └── batch-01-e1-e2-e3.md
└── gpt-upload-batch2/     ← ★ GPT 스레드 B 업로드 (e-4~e-7 자금·송금·위임장)
    ├── INSTRUCTIONS.md
    ├── policy-01-natural-korean.md
    ├── policy-02-truth-disclosure.md
    └── batch-02-e4-e5-e6-e7.md
```

각 batch 폴더는 자가완결 (INSTRUCTIONS + policy 2개 + 해당 batch file 1개 = 4 file).

---

## GPT Pro 사용법 (★ 2 스레드 병렬)

GPT Pro 새 채팅창 2개 동시 개설:

| 스레드 | 업로드 폴더 | 메시지 (동일) |
|--------|------------|--------------|
| A | `gpt-upload-batch1/` 내 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` |
| B | `gpt-upload-batch2/` 내 4 file | `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘` |

각 스레드의 `INSTRUCTIONS.md`가 batch-specific으로 작성. 동일 메시지로 batch별 polish 진행.

---

## 의뢰 범위 요약

| Batch | 영역 | variants | 특이사항 |
|-------|------|---------|----------|
| 1 | e-1 (참고서) + e-2 (GPS) + e-3 (통화기록) | 50 | 외도 evidence 영역 |
| 2 | e-4 (문자) + e-5 (출금) + e-6 (투자방) + e-7 (송금) | 45 | B 자금 + A 송금·위임장 영역, 특수 stage 다수 |

---

## 진실 누설 정책

- 본 batch는 **진실 누설 회피 영역 X (직전 batch에서 완료)**.
- polish 시 hidden 키워드 ("가족 / 집안 / 시댁 / 형 / 회생 / 형사 / 사기 / 횡령 / 범죄 / 위조 / 위법") **신규 도입 X** 만 보장.
- **band=late entries** (진실 노출 단계) 원본에 등장하는 hidden 키워드는 **보존 OK** (제거 X) — 의도된 진실 인정 발화.

---

## 권장 운영 흐름

**2 스레드 GPT 병렬 + 분리 commit (2개) + 통합 sync (1개)**.

GPT 단계: 병렬 (시간 단축)
Claude main session patch: batch별 분리 commit (회귀 안전성)
Codex 다국어 sync: 95 variants 통합 의뢰 (worktree 효율)

---

## 단계별 명령 (사용자 입장)

### Step 1. GPT Pro 2 스레드 병렬 의뢰

각 스레드:
1. GPT Pro 새 채팅창 열기
2. `gpt-upload-batchN/` 폴더 내 4 file 모두 업로드
3. 메시지 한 줄: `INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘`
4. GPT 결과 받기 (각 batch 45~50건 "변경 후 / 변경 영역" 형식)

### Step 2. Claude에게 결과 보고 (사용자)

```
GPT 2 스레드 결과 전달 + 보수적 검증 + main 적용 진행해줘.
```

Claude 실행:
1. GPT 결과 raw save (gpt-results/)
2. ID 완전성 / hidden 키워드 자동 검증
3. 보수적 review (자기지시 / 의미 변형 / tone 보존)
4. 우려 영역만 사용자 보고
5. main 적용 (Node script 일괄) + qa:fast + truth-leak 검증
6. batch별 분리 commit + push

### Step 3. 통합 Codex 다국어 sync 의뢰

```
통합 Codex sync 의뢰서 작성해줘.
```

Claude 실행:
1. 의뢰서 작성: `docs/design/translation-spouse01-evidence-naturalization-20260526/codex-multilang-sync.md`
   - 95 variants × 3 lang (EN/JA/ZH-CN) = 285 변경 anchor
2. worktree spawn
3. 사용자: Codex 환경에서 worktree 진입 + 의뢰서 실행 + push

### Step 4. Codex push 후 cherry-pick

```
Codex 결과 cherry-pick + main push 해줘.
```

---

## 관련 정책

- [feedback_natural_korean_npc_active_voice](../../../../memory/feedback_natural_korean_npc_active_voice.md) — NPC 적극 발화 5 차원 (본 batch 핵심)
- [feedback_natural_korean_precision_guide](../../../../memory/feedback_natural_korean_precision_guide.md) — 한국어 자연화 19 차원
- [design_spouse01_truth_disclosure_policy](../../../../memory/design_spouse01_truth_disclosure_policy.md) — spouse-01 진실 누설 정책
- [design_gpt_batch_folder_structure](../../../../memory/design_gpt_batch_folder_structure.md) — GPT batch 폴더 구조 정립
- [feedback_claude_korean_polish_limitation](../../../../memory/feedback_claude_korean_polish_limitation.md) — Claude 한국어 polish 시안 X, GPT Pro 경유 정책

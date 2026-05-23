# spouse-01 evidence_present Batch 4 (동형 archetype 30 그룹 / 150 entries) — 2026-05-27

## 배경

evidence_present 1470 variants 중:
- 직전 polish (69 + 95 = 164 entries) 완료
- 잔존 1306 entries 광역 정찰 결과:
  - **동형 archetype 597 entries (45.6%)** = 123 duplicate groups
  - 어색 패턴 75 entries (5.7%)
- 본 batch = **Top 30 동형 그룹** × 5 evidence = **150 entries 일괄 polish**

## 효율

- Polish 작업 단위: 30 archetypes (GPT 시안 30건)
- 실제 적용: 150 entries (1 polish → 5 entries 동시 적용)
- **효율 5x per polish work**

## 폴더 구조

```
spouse01-evidence-batch4-homologous-20260527/
├── README.md (본 file)
└── gpt-upload-batch4/
    ├── INSTRUCTIONS.md                  # 작업 지시서
    ├── policy-01-natural-korean.md      # 자연화 정책 (직전 batch 복사)
    ├── policy-02-truth-disclosure.md    # 진실 누설 정책 (직전 batch 복사)
    └── batch-04-homologous.md           # 30 archetype 그룹 표
```

## 영역 분포

| lieBand | stage | archetype | entries |
|---------|-------|-----------|---------|
| early | 1 | 8 | 40 |
| early | 2 | 6 | 30 |
| early | 3 | 7 | 35 |
| mid | 1 | 7 | 35 |
| mid | 2 | 2 | 10 |
| **합계** | | **30** | **150** |

모두 party=A (박지연 claimant) — evidence 비 의존 archetype.

## GPT Pro 의뢰 방식

1. `gpt-upload-batch4/` 전체 file을 GPT Pro에 업로드
2. 사용자 메시지: "INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘"
3. 결과 도착 시 본 세션에 paste

## 적용 방식 (GPT 결과 도착 후)

1 GPT 시안 = 5 entries 일괄 적용 (Node script 자동 expansion):
```js
const PATCHES = {
  // GPT 시안 → 5 evidence 동시 적용
  'a-e-1-early-stage1-v3': gptGroup1Result,
  'a-e-2-early-stage1-v3': gptGroup1Result,
  'a-e-3-early-stage1-v3': gptGroup1Result,
  'a-e-4-early-stage1-v3': gptGroup1Result,
  'a-e-5-early-stage1-v3': gptGroup1Result,
  // ... 30 archetypes × 5 = 150 entries
}
```

## 진행 순서

1. Codex (83 entries 다국어 sync) 진행 중 — 본 batch 4 의뢰는 별도 트랙
2. GPT B3 (12 entries 재의뢰) 진행 중 — 본 batch 4도 별도 GPT 스레드
3. GPT B4 결과 도착 → Claude review → main apply + commit + Codex 다국어 sync 의뢰

## 향후

본 batch 4 (150) 완료 후:
- evidence_present 누적: 164 (기존) + 12 (B3) + 150 (B4) = **326 entries**
- 잔존: 1470 - 326 = **1144 entries**
  - 동형 잔존: 597 - 150 = 447 entries (Top 31~123 그룹)
  - 어색 75 entries
  - 미검출 잠재 영역 ~922 entries (사용자 spot check 필요)
- Batch 5 = Top 31~ 동형 그룹 + 어색 패턴 75 결합 가능

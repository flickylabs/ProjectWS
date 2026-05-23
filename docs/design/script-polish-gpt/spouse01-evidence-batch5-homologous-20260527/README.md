# spouse-01 evidence_present Batch 5 (Top 30 잔존 동형 archetype / 150 entries) — 2026-05-27

## 배경

spouse-01 evidence_present 1470 var 누적 polish 314 완료 후 잔존 1156 정찰:
- **Residual dupe groups (2+)**: 93 groups (447 variants in dupes)
- 본 Batch 5 = **Top 30 residual dupes × 5 evidence = 150 entries 일괄 polish**
- ★ Batch 4가 early stage 영역 처리했다면, Batch 5는 **mid-stage2/3 + late-stage1/2/3** (자기 반성·후회·인정 톤)

## 영역 분포

| lieBand | stage | archetype | entries |
|---------|-------|-----------|---------|
| mid | 2 | 3 | 15 |
| mid | 3 | 9 | 45 |
| late | 1 | 7 | 35 |
| late | 2 | 5 | 25 |
| late | 3 | 6 | 30 |
| **합계** | | **30** | **150** |

모두 party=A (박지연 claimant) — evidence 비 의존 archetype.

## 효율

- Polish 작업 단위: 30 archetypes (GPT 시안 30건)
- 실제 적용: 150 entries (1 polish → 5 entries 동시 적용)
- **효율 5x per polish work** (Batch 4와 동일)

## 폴더 구조

```
spouse01-evidence-batch5-homologous-20260527/
├── README.md (본 file)
└── gpt-upload-batch5/
    ├── INSTRUCTIONS.md                  # 작업 지시서
    ├── policy-01-natural-korean.md      # 자연화 정책
    ├── policy-02-truth-disclosure.md    # 진실 누설 정책
    └── batch-05-homologous.md           # 30 archetype 그룹 표
```

## GPT Pro 의뢰 방식

1. `gpt-upload-batch5/` 전체 file을 GPT Pro에 업로드
2. 사용자 메시지: "INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘"
3. 결과 도착 시 본 세션에 paste

## 적용 방식 (GPT 결과 도착 후)

apply stub: `scripts/tmp/apply-batch5-stub.mjs` (Batch 4 stub 패턴 재사용)

1 GPT 시안 = 5 entries 일괄 적용 (Node script 자동 expansion).

## 진행 순서

다른 batch 진행 중에도 별도 GPT 스레드로 병렬 가능.

## 향후 잔존

본 Batch 5 (150) 완료 후:
- spouse-01 evidence_present 누적: 314 + 150 = **464 entries** polish
- 잔존: 1006 entries
  - Top 31~ 동형 그룹 (297 variants in 63 groups 추정)
  - 미검출 단형 ~700 entries
- Batch 6 후보: Top 31~ 동형 + 어색 잔존

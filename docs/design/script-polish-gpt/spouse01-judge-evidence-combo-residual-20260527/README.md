# spouse-01 judge_evidence_combo 채널 자연화 17 entries (본인 제외) — 2026-05-27

## 배경

spouse-01 judge_evidence_combo 채널 정찰 결과:
- 120 variants / 어색 49 hits (40.8%)
- **본인 34 hits = 정책 부합 영역** (재판관 → NPC 가리킴, 통일 X)
- 본 batch = 본인 제외 잔존 어색 **17 entries**

## 어색 패턴 분포

| 패턴 | hits |
|---|---|
| 직역 어미 "가리킵니다" | 5 |
| 직역 어미 "드러납니다" | 5 |
| 강조 부사 "차분히" | 4 |
| 강조 부사 "끝까지" | 3 |
| 강조 부사 "그렇게" | 1 |
| (★ 본인은 정책 부합으로 제외) |  |

## 영역

- 재판관 발화 (제3자 → NPC 추궁)
- 변종 분포: soft / mid / hard (추궁 톤 강도)
- 진실 누설 정책: evidence 명칭 보존 OK / hidden keyword 신규 도입 X

## 폴더 구조

```
spouse01-judge-evidence-combo-residual-20260527/
├── README.md (본 file)
└── gpt-upload-judge-combo/
    ├── INSTRUCTIONS.md          # 작업 지시서
    ├── policy-01-natural-korean.md
    ├── policy-02-truth-disclosure.md
    └── batch-judge-combo.md     # 17 entries 표
```

## 처리 방향

- 직역 어미 "가리킵니다 / 드러납니다" → 자연 술어 ("맞물려 있습니다 / 확인됩니다" 등)
- 강조 부사 "끝까지 / 차분히" — 자연 영역 보존, 직역체에서만 자연화
- 재판관 청유 어미 다양화

## GPT Pro 의뢰 방식

1. `gpt-upload-judge-combo/` 전체 file을 GPT Pro에 업로드
2. 사용자 메시지: "INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘"
3. 결과 도착 시 본 세션에 paste

## 적용 방식

apply stub: `scripts/tmp/apply-judge-combo-stub.mjs` (Claude가 결과 도착 시 생성)

17 entries 직접 매핑 (동형 X).

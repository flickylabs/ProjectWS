# spouse-01 evidence_present Batch 3 (재의뢰 12 var) — 2026-05-27

## 배경

직전 Batch 2 (e-4~e-7, 2026-05-26 fac8d747) GPT 시안에서 12 entries가 자연화 부족:
- "그렇게" / "차분히" / "그 흐름" / "느껴집니다" / "그 판단" 명시 어색 패턴 보존
- b-e-{4,5}-mid-stage1-v5/v7 의 evidence-specific 동사 단일 처리

본 batch는 **단일 스레드 재의뢰** (12 entries는 작아서 batch 분할 불필요).

## 폴더 구조

```
spouse01-evidence-residual-batch3-20260527/
├── README.md (본 file)
└── gpt-upload-batch3/
    ├── INSTRUCTIONS.md          # 작업 지시서
    ├── policy-01-natural-korean.md  # 자연화 정책 (직전 batch 복사)
    ├── policy-02-truth-disclosure.md # 진실 누설 정책 (직전 batch 복사)
    └── batch-03-residual.md     # 12 var 재의뢰 표
```

## GPT Pro 의뢰 방식

1. `gpt-upload-batch3/` 전체 file을 GPT Pro에 업로드
2. 사용자 메시지: "INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘"
3. 결과 도착 시 본 세션에 paste

## 진행 예상

- GPT 결과 → Claude 보수적 review → 사용자 결정 → main patch + 검증 + commit + Codex 다국어 sync
- 본 batch 완료 후 evidence_present 95 var (B1 50 + B2 33 + B3 12) 전체 polish 완료

# friend-01 evidence_present 자연화 9 archetype / 80 entries — 2026-05-27

## 배경

friend-01 evidence_present 1485 var 정찰 결과:
- **동형 그룹 99.3%** (1475/1485 variants in dupes) — 거의 모든 텍스트가 archetype 공유
- 어색 패턴 80 hits → **9 unique archetypes**
- 효율 **8.9x** per polish work

## 어색 패턴 분포

| 패턴 | hits | archetypes |
|---|---|---|
| 직역어미 "이어집니다" | 35 | 4 (Arch 1 core x14 + 보강 4-6 x7×3) |
| 자기지시 "자신" (자신감 의미) | 35 | 4 (Arch 2 core x14 + 보강 7-9 x7×3) |
| 강조부사 "끝까지" | 10 | 1 (Arch 3 core x10) |

## 영역 구조

- **A 발화 (송다은, claimant)**: Archetype 1/4/5/6 — late e-5 (아버지 돈 정황 인정)
- **B 발화 (최수민, defendant)**:
  - Archetype 2/7/8/9 — early e-6 (송금 인정, 이유 회피)
  - Archetype 3 — late e-4 (첫 대화 단정 보류)

## 폴더 구조

```
friend01-evidence-naturalization-20260527/
├── README.md (본 file)
└── gpt-upload-friend01/
    ├── INSTRUCTIONS.md                  # 작업 지시서
    ├── policy-01-natural-korean.md      # 자연화 정책 (spouse-01 batch에서 복사)
    ├── policy-02-friend01-truth-disclosure.md  # ★ friend-01 전용 진실 정책
    └── batch-friend01-archetypes.md     # 9 archetype 표
```

## GPT Pro 의뢰 방식

1. `gpt-upload-friend01/` 전체 file을 GPT Pro에 업로드
2. 사용자 메시지: "INSTRUCTIONS.md를 읽고 그대로 작업을 진행해줘"
3. 결과 도착 시 본 세션에 paste

## 적용 방식 (GPT 결과 도착 후)

1 GPT 시안 = 7~14 entries 일괄 적용 (Node script):
- Archetype 1 → 14 entries
- Archetype 2 → 14 entries
- Archetype 3 → 10 entries
- Archetype 4-6 → 7 entries × 3 = 21 (Arch 1 + 보강)
- Archetype 7-9 → 7 entries × 3 = 21 (Arch 2 + 보강)
- 합계: **80 entries**

## 진행 순서

본 batch는 **spouse-01 Batch 4 (B4)와 별도 GPT 스레드**로 병렬 진행 가능. 현재 진행 중인 트랙:
1. GPT Thread A: spouse-01 B4 동형 30/150 (★ 진행 중)
2. Codex Thread A: spouse-01 B3 12 entries 다국어 sync (대기)
3. **GPT Thread B (★ 신규 의뢰서)**: friend-01 9 archetype/80 (본 batch)

## 향후

본 batch 완료 후:
- friend-01 evidence_present 어색 패턴 80/1485 entries (5.4%) 완료
- 잔존: friend-01 동형 그룹 Top 정렬 별도 정찰 → friend-01 추가 batch 가능
- family-01 evidence_present (19 hits 그_부분) 별도 작은 batch 가능

friend-01 자기지시 "자신" 35 entries는 [design_self_reference_bonin_consistency](../../../memory/design_self_reference_bonin_consistency.md) 정책 검증 영역. 단, 본 entries는 명사 "자신감"의 줄임이므로 정책과 다른 처리 (용기 / 차마 등 자연 표현 대체).

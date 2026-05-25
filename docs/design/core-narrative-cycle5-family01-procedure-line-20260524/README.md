# Cycle 5 — family-01 절차/판단 line emergence narrative (GPT Pro Upload, 3 Batch 병렬)

## Cycle 5 개요

가족 사건(family-01, 형제 유산 다툼)의 **Line A "절차/판단" 6 emergence**에 narrative wrapper 부착. family-01에 narrative wrapper 첫 적용 cycle. dc-1 → w-1 → d-2 → e-3 → dc-2 → w-2 인과 chain narrative 연결.

### 대상 emergence 6개 (Line A: 어머니 말년 절차 + 공증 절차)

| # | 영역 | id | 자연 명칭 | Batch |
|---|---|---|---|---|
| 1 | 단서(사건 카드) | `dc-1` | 말년의 종이 | **Batch 1** |
| 2 | 증인 | `w-1` | 전 요양보호사 최복순 | **Batch 1** |
| 3 | 쟁점 | `d-2` | 공증 절차의 개입 | **Batch 2** |
| 4 | 증거 | `e-3` | 전 요양보호사 음성증언 | **Batch 2** |
| 5 | 단서(사건 카드) | `dc-2` | **수정된 유언장** (라벨 변경: 기존 '줄인 유서' → '수정된 유언장') | **Batch 3** |
| 6 | 증인 | `w-2` | 공증인 메모 담당 김영수 | **Batch 3** |

### 절차/판단 line 인과 chain

```
[d-1 (열려있음, 사건 시작) — narrative wrapper 영역 아님]
      ↓
  dc-1 (말년의 종이)                  ← Batch 1
      ↓
  w-1 (최복순 호출 가능)               ← Batch 1
      ↓
  d-2 (공증 절차의 개입) — d-1 S3 도달  ← Batch 2
      ↓
  e-3 (전 요양보호사 음성증언)         ← Batch 2
      ↓
  dc-2 (수정된 유언장)                ← Batch 3
      ↓
  w-2 (김영수 호출 가능)              ← Batch 3
```

## 신규 정책 — 재판관 어법 사실/행위 중심 (Cycle 7 도입, 본 cycle 적용)

`feedback_judge_dispassionate_action_focused.md` 정책 (병렬 spouse-01 Cycle 7 세션에서 정립). 본 cycle 의뢰서 전체에 적용.

핵심:
- 재판관 발화에 감정·가치 어휘 회피 ("선을 넘다", "흐름", "낙인" X)
- 사실·행위·선후관계 중심 ("정황", "선후관계", "관련 자료")
- "반증/그 X" → "관련 X" 중립 표현
- **증인 호출 동사 다양화** (단일 "호출하겠습니다" 반복 X)
- dossier label도 "누구" frame X "행위/상황" frame ← 본 cycle dc-1 "말년의 종이", dc-2 "수정된 유언장" 모두 부합

본 cycle 영향:
- Batch 1 w-1 호출 narrative: 호출 동사 다양화 ("부르겠습니다" / "모시겠습니다" / "직접 들어보겠습니다" / "확인해 보겠습니다")
- Batch 2 d-2 / e-3 fallback: 평가성 어휘 ("충분히 정리됐다", "필요한 시점이라 봅니다") → 사실 진술 ("관련 자료가 모였다", "추가로 확보됐다")
- Batch 3 dc-2 / w-2 fallback: 평가성 어휘 회피 + 호출 동사 다양화

## 신규 정책 — '단서' 명칭 (Cycle 5 도입)

본 cycle부터 player-visible text에서 `사건 카드 / dossier card` → **`단서`** (clue) 표현 통일.

- 내부 코드/스키마 (`DossierCard` type, `dc-1` id 등) = 변경 X
- player-visible text (narrative entry, 시스템 UI, dossier 영역) = '단서' 사용
- 다국어: clue (EN) / 手がかり (JA) / 线索 (ZH-CN)
- **다국어 번역 시 evidence(증거)와 layer 구분 유지 필수** (evidence ≠ clue — 자료 vs 추론 결과)

자세한 정책: 본 폴더 `feedback_dossier_card_renamed_to_clue.md` 참조.

## `cascade_from_card` trigger (Cycle 2 도입, 본 cycle 활용)

family-01은 cascade가 핵심 라인 — dc-1 → w-1 / dc-1 → d-2 / dc-1 → e-3 / d-2 → dc-2 / dc-2 → w-2 모두 cascade 후보. 본 cycle의 dossier card / dispute / witness narrativeTriggers에 priorCard reference 명시.

상세 schema spec은 각 batch `gpt-pro-brief.md` §3 참조.

## Batch 분할 사유

총 ~18~24 KO entry 규모 (각 emergence 3 trigger × ~3 entry + fallback). GPT Pro 한 thread 부담 분산 + 자연 인과 짝 단위로 **3 batch 분할**:

| Batch | 폴더 | 처리 emergence | 인과 짝 |
|---|---|---|---|
| 1 | [batch1-dc1-w1/](batch1-dc1-w1/) | dc-1 + w-1 | 말년의 종이 단서 → 요양보호사 호출 |
| 2 | [batch2-d2-e3/](batch2-d2-e3/) | d-2 + e-3 | 공증 절차 쟁점 분리 → 음성증언 보강 |
| 3 | [batch3-dc2-w2/](batch3-dc2-w2/) | dc-2 + w-2 | 수정된 유언장 단서 → 공증인 메모 담당 호출 |

각 batch 폴더는 self-contained — 메모리/톤 sample 모두 복사돼 있어 외부 참조 X. **GPT Pro 3 thread 병렬 진행 권장**.

## GPT Pro 사용 절차

1. 각 batch 폴더를 GPT Pro Project에 업로드 (또는 채팅 첨부)
2. batch 폴더의 `README.md` 절차대로 진행
3. 모든 batch GPT 응답 도착 후 메인 Claude 세션에 일괄 전달

## 산출 처리 흐름 (메인 Claude 세션)

8단계 절차 ([[design_core_narrative_cycle_procedure]]) 기준:

- ✅ 0~2단계 완료 (정찰 / 기획 v3 / 사용자 승인)
- 🟢 **3단계 (본 폴더)** — GPT 의뢰서 준비
- ⬜ 4단계 — 사용자 GPT Pro 진행
- ⬜ 5단계 — Claude 검토 + 수정 시안 제안 + 사용자 승인
- ⬜ 6단계 — family-01.case.ts dc-2 label rename ('줄인 유서' → '수정된 유언장') + 6 entity narrativeTriggers 부착 + tsc/build/qa:fast PASS
- ⬜ 7단계 — Codex 다국어 sync 의뢰서 (KO entry × 3 lang)
- ⬜ 8단계 — 사후 통합

## 폴더 정책

본 폴더 + 모든 batch 하위 폴더는 self-contained.
권위: [[feedback-external-brief-self-contained-folder]] / [[feedback-external-brief-path-explicit]] / [[design_gpt_batch_folder_structure]]

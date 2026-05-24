# Cycle 2 — spouse-01 자금 흐름 line emergence narrative (GPT Pro Upload, 4 Batch 병렬)

## Cycle 2 개요

배우자 사건(spouse-01)의 **자금 흐름 line 잔존 emergence 8개**에 narrative wrapper 부착. Cycle 1 (e-5) 결과물에서 출발하여 dc-3 → e-7 → dc-7 → e-6 → dc-4 → w-3 까지 인과 chain을 narrative로 연결. 동시에 h-d3 쟁점 발현 + 은행 직원 증인(h-d3 영역) wrapper 포함.

### 대상 emergence 8개 (옵션 A1+ 결정)

| # | 영역 | id | 자연 명칭 | Batch |
|---|---|---|---|---|
| 1 | 사건 카드 | `dc-3` | 이준호의 비밀 개인 계좌 | **Batch 1** |
| 2 | 증거 | `e-7` | 공동 적금 해지 서류 | **Batch 1** |
| 3 | 사건 카드 | `dc-7` | 공동 적금 2,000만 원의 해지 | **Batch 2** |
| 4 | 증거 | `e-6` | 투자방 텔레그램 + 송금 기록 | **Batch 2** |
| 5 | 사건 카드 | `dc-4` | 돌이키고 싶은 2,000만 원 | **Batch 3** |
| 6 | 증인 | `w-3` | 박미라 (카페 운영) | **Batch 3** |
| 7 | 쟁점 | `h-d3` | 공동 적금 2,000만원 해지 경위 | **Batch 4** |
| 8 | 증인 | `w-2(h-d3)` | 은행 직원 (h-d3 영역) | **Batch 4** |

### 자금 흐름 인과 chain

```
[Cycle 1 결과]
  dc-cash-clue (정기 자금 이동 흔적)
      ↓
  e-5 emergence (개인 계좌 출금) [Cycle 1]

[Cycle 2 처리 영역]
  dc-3 (이준호의 비밀 개인 계좌)        ← Batch 1
      ↓
  e-7 (공동 적금 해지 서류)             ← Batch 1
      ↓
  dc-7 (공동 적금 2,000만 해지)          ← Batch 2
      ↓
  e-6 (투자방 송금 기록)                ← Batch 2
      ↓
  dc-4 (돌이키고 싶은 2,000만 원)         ← Batch 3
      ↓
  w-3 (박미라 — 링크 전달자)             ← Batch 3

[잠재 쟁점 라인 — 위와 병행 발현]
  h-d3 (공동 적금 해지 경위 쟁점)        ← Batch 4
  w-2(h-d3) (은행 직원 — 위임장 증언)    ← Batch 4
```

## 신규 정책: `cascade_from_card` trigger 타입

Cycle 1 정책 4 trigger (NPC 끼어듦 / 증거 조합 / 감정 돌발 / 판사 자발)에 더해 **신규 5번째 trigger 타입** 추가:

- **`cascade_from_card`** — 이전 사건 카드 발현 후, 그 narrative line의 자연 연속으로 다음 카드/증거 등장
- precondition에 `requirePriorCardFired: dossierCardId` 필드 추가
- ScriptedText: 본 trigger 전용 narrative entry (이전 카드 reference 포함)

상세 schema spec은 각 batch `gpt-pro-brief.md` §3 참조.

## Batch 분할 사유

총 ~90 KO entry 규모. Cycle 1 sample(17 entry)의 약 5배. GPT Pro 한 thread 응답 quality/길이 부담 회피 위해 **자연 인과 짝 단위 4 batch 분할**:

| Batch | 폴더 | 처리 emergence | 인과 짝 |
|---|---|---|---|
| 1 | [batch1-dc3-e7/](batch1-dc3-e7/) | dc-3 + e-7 | B 비자금 출처 → A 위임장 단서 |
| 2 | [batch2-dc7-e6/](batch2-dc7-e6/) | dc-7 + e-6 | A 절차 행위 확정 → 송금 행선지 |
| 3 | [batch3-dc4-w3/](batch3-dc4-w3/) | dc-4 + w-3 | A 사기 손실 line 종결 → 링크 전달자 |
| 4 | [batch4-hd3-w2/](batch4-hd3-w2/) | h-d3 + w-2(h-d3) | 잠재 쟁점 발현 + 은행 직원 증언 |

각 batch 폴더는 self-contained — 메모리/톤 sample 모두 복사돼 있어 외부 참조 X. **GPT Pro 4 thread 병렬 진행 권장**.

## GPT Pro 사용 절차

1. 각 batch 폴더를 GPT Pro Project에 업로드 (또는 채팅 첨부)
2. batch 폴더의 `README.md` 절차대로 진행
3. 모든 batch GPT 응답 도착 후 메인 Claude 세션에 일괄 전달

## 산출 처리 흐름 (메인 Claude 세션)

8단계 절차 ([[design_core_narrative_cycle_procedure]]) 기준:

- ✅ 0~2단계 완료 (정찰 / 기획 / 사용자 승인)
- 🟢 **3단계 (본 폴더)** — GPT 의뢰서 준비
- ⬜ 4단계 — 사용자 GPT Pro 진행
- ⬜ 5단계 — Claude 검토 + 수정 시안 제안 + 사용자 승인
- ⬜ 6단계 — schema 확장 (`cascade_from_card`) + dossierCard/witness narrativeTriggers 부착 + dispatch 통합 + tsc/build
- ⬜ 7단계 — Codex 다국어 sync 의뢰서 (약 90 × 3 lang = 270 entry)
- ⬜ 8단계 — 사후 통합

## 폴더 정책

본 폴더 + 모든 batch 하위 폴더는 self-contained.
권위: [[feedback-external-brief-self-contained-folder]] / [[feedback-external-brief-path-explicit]] / [[design_gpt_batch_folder_structure]]

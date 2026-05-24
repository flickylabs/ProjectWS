# Cycle 7 — friend-01 Line A+B emergence narrative (GPT Pro Upload, 4 Batch 병렬)

## Cycle 7 개요

친구 사건(friend-01)의 **Line A (낙인 시작 frame) + Line B (예비신랑 선 넘기 reframe)** 5 emergence에 narrative wrapper 부착. friend-01 cascade 시작 영역 — 단톡방 글 근거 → 예비신랑 reframe 까지. 아버지 사기/돈 접근(Line C)는 Cycle 8 영역.

### 대상 emergence 5개

| # | 영역 | id | 자연 명칭 (변경 후) | Batch |
|---|---|---|---|---|
| 1 | 단서 (사건 카드) | `dc-1` | **단톡방 글의 근거** (이름 변경: "확인 없이 매도한 건 누구인가" → "단톡방 글의 근거") | **Batch 1** |
| 2 | 단서 (사건 카드) | `dc-2` | 먼저 넘은 선 | **Batch 2** |
| 3 | 증거 | `e-4` | 예비신랑의 선 넘는 메시지와 최수민의 거절 답장 | **Batch 2** |
| 4 | 증인 | `w-1` | 김세라 (단톡방 동조) | **Batch 3** |
| 5 | 증인 | `w-2` | 박준혁 (예비신랑 회사 후배) | **Batch 4** |

### narrative line 인과 chain

```
[Line A — 낙인 시작 frame]
  e-1 + e-2 → dc-1 (단톡방 글의 근거)         ← Batch 1
                ↓
              w-1 (김세라)                     ← Batch 3

[Line B — 예비신랑 선 넘기 reframe]
  e-1 + e-4 → dc-2 (먼저 넘은 선)              ← Batch 2 (+ e-4 surface)
                ↓
              w-2 (박준혁)                     ← Batch 4

[다음 cycle — Line C 아버지 돈 line, Cycle 8 영역]
  dc-2 fired (d-2 S3) → d-3 unlock → ...
```

## 신규 정책 (본 cycle 적용)

### 정책 1: `cascade_from_card` trigger type (Cycle 2 도입)

기존 4 trigger (NPC 끼어듦 / 증거 조합 / 감정 돌발 / 판사 자발) + **5번째 trigger**:

- **`cascade_from_card`** — 이전 사건 카드(단서) fired 후, 그 narrative line의 자연 연속으로 다음 카드/증거/증인 등장
- precondition: `requirePriorCardFired: dossierCardId` 필드
- friend-01 적용 chain:
  - `dc-2 (먼저 넘은 선)`: priorCard = `dc-1`
  - `e-4`: priorCard = `dc-1`
  - `w-1`: priorCard = `dc-1`
  - `w-2`: priorCard = `dc-2`

### 정책 2: dossier card → "단서" 명칭 변경 (Cycle 5 도입)

player-visible text 영역에서 **"사건 카드" 또는 "dossier card" → "단서"** (clue). runtime 코드/스키마/id는 그대로.

- KO entry text 본문: "사건 카드 [X]" → "단서 [X]" 또는 단순히 "[X]" reference만
- 다국어 번역(Codex)에서 evidence(증거) ≠ clue(단서) 경계 명확 유지
- 본 cycle 4 batch에 사용되는 모든 dossier reference는 "단서" 또는 label만 사용
- 권위: `feedback_dossier_card_renamed_to_clue.md` (각 batch 폴더에 포함)

### 정책 3: dc-1 label 변경 — "확인 없이 매도한 건 누구인가" → "단톡방 글의 근거"

2단계 사용자 결정. "누구" frame이 아닌 "행위/상황/근거" frame:

- 인격 추궁 → 행위 근거 추궁 (게임 핵심에 더 적합)
- dossierCards[id='dc-1'].label, 그리고 cascade priorCard reference text 모두 새 label 사용
- 본 변경은 6단계 (Authority apply) 영역에서 `src/data/coreCases/friend-01.case.ts` dc-1 label 직접 변경
- 권위: `feedback_judge_dispassionate_action_focused.md` (각 batch 폴더에 포함)

### 정책 4: 재판관 어법 — 감정·가치 판단 회피, 사실/행위/선후관계 중심

본 cycle 2단계 사용자 강조:

- ✗ "선을 넘은 메시지" / "흐름입니다" / "반증 자료"
- ✓ "먼저 보낸 메시지" / "정황입니다" / "관련 자료"
- ✗ "낙인의 시작점이 정리됐으니..." (가치 평가)
- ✓ "앞서 [X]가 등재됐습니다. 관련 사실관계 확인이 필요합니다" (중립)
- 증인 호출 동사 다양화: "호출하겠습니다" / "증인으로 모시겠습니다" / "확인해 보겠습니다"
- 권위: `feedback_judge_dispassionate_action_focused.md`

## Batch 분할 사유

총 ~64 KO entry 규모. Cycle 2 (8 emergence × ~12 entry = ~97)의 절반 규모. self-contained 4 batch 분할 — GPT Pro 4 thread 병렬 진행 권장:

| Batch | 폴더 | 처리 emergence | 예상 KO entry 수 |
|---|---|---|---|
| 1 | [batch1-dc1/](batch1-dc1/) | dc-1 (단톡방 글의 근거) | ~13 |
| 2 | [batch2-dc2-e4/](batch2-dc2-e4/) | dc-2 (먼저 넘은 선) + e-4 | ~25 |
| 3 | [batch3-w1/](batch3-w1/) | w-1 (김세라 단톡방 동조) | ~13 |
| 4 | [batch4-w2/](batch4-w2/) | w-2 (박준혁 예비신랑 회사 후배) | ~13 |

각 batch 폴더는 self-contained — 메모리/톤 sample 모두 복사. 외부 참조 X.

## GPT Pro 사용 절차

1. 각 batch 폴더를 GPT Pro Project에 업로드 (또는 채팅 첨부)
2. batch 폴더의 `README.md` 절차대로 진행
3. 모든 batch GPT 응답 도착 후 메인 Claude 세션(ws-friend-01-cycle worktree)에 일괄 전달

## 산출 처리 흐름 (메인 Claude 세션 — ws-friend-01-cycle worktree)

8단계 절차 (`design_core_narrative_cycle_procedure.md`) 기준:

- ✅ 0~2단계 완료 (정찰 / 기획 / 사용자 승인 + 피드백 반영)
- 🟢 **3단계 (본 폴더)** — GPT 의뢰서 준비
- ⬜ 4단계 — 사용자 GPT Pro 진행
- ⬜ 5단계 — Claude 검토 + 수정 시안 제안 + 사용자 승인
- ⬜ 6단계 — Authority apply (dossierCard/witness/evidence narrativeTriggers 부착 + dc-1 label 변경) + ScriptedText apply + tsc/build + **qa:fast PASS 필수**
- ⬜ 7단계 — Codex 다국어 sync 의뢰서 (약 64 × 3 lang = 192 entry, 별도 self-contained 폴더)
- ⬜ 8단계 — 사후 통합 + cycle 핸드오프 → Cycle 8 진입 안내

### 6단계 schema 변경 영역 (예상)

Cycle 2에서 이미 schema 확장 완료 (DossierCard/Witness/Evidence/Dispute 모두 `narrativeTriggers` 필드 보유, `cascade_from_card` trigger type 등록). 본 cycle은 **데이터만 추가** (코드 변경 X 예상):
- `src/data/coreCases/friend-01.case.ts`: dc-1 label 변경 + dc-1/dc-2/e-4/w-1/w-2 `narrativeTriggers` 부착
- `src/data/scriptedText/friend-01.json`: `emergence_narrative` channel 신규 + ~64 entry 추가

## 폴더 정책

본 폴더 + 모든 batch 하위 폴더는 self-contained.
권위: `feedback_external_brief_self_contained_folder` / `feedback_external_brief_path_explicit` / `design_gpt_batch_folder_structure`

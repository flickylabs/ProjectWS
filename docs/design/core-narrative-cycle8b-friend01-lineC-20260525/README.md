# Cycle 8b — friend-01 Line C emergence narrative (GPT Pro Upload, 2 Batch 병렬)

## Cycle 8b 개요

친구 사건(friend-01)의 **Line C (아버지 돈 접근 패턴 + 과거 손절의 진짜 원인)** 7 emergence + w-2 dc-3 영역 확장 narrative wrapper 부착. friend-01 cascade 중반~후반 영역 — 현재 아버지 패턴 확인 → 과거 사기 + 손절 진실 + 증인까지. 종합 대조(Line D, Cycle 9 영역)는 분리.

### 기반: plot revision CT 영역 완료 baseline

본 cycle은 [친구-01 e-5 reframe plot revision CT 영역 commit `b77a27c5`](../friend01-plot-revision-e5-reframe-20260524/) 결과 위에서 진행. e-5 자료 자체 교체 (예비신랑 회사 단톡 떠벌림 + 최수민 9일간 차단) + d-3/w-2/dc-3/combine-3 영역 정합 reword + anchorTruth/combine-5 정합 모두 main 통합 완료된 상태.

### 대상 emergence 7 + 1 확장

| # | 영역 | id | 자연 명칭 | Batch |
|---|---|---|---|---|
| 1 | 증거 | `e-5` | 예비신랑 회사 단톡 떠벌림 + 최수민의 9일간 차단 연락 | **Batch 1** |
| 2 | 단서 | `dc-3` | 같은 부탁 | **Batch 1** |
| 3 | 쟁점 (hidden) | `d-3` | 아버지의 돈 접근 패턴 | **Batch 1** |
| 4 | 증거 | `e-6` | 과거 송금 영수증 + 문자 | **Batch 2** |
| 5 | 단서 | `dc-4` | **손절의 이유** (label 변경: 기존 "손절의 값") | **Batch 2** |
| 6 | 쟁점 (hidden, legitimacyIssue) | `d-4` | 과거 손절과 아버지의 사기 | **Batch 2** |
| 7 | 증인 | `w-3` | 오미경 (분식집 사장, pro_b) | **Batch 2** |
| 7b | 증인 (기존 확장) | `w-2` dc-3 영역 | 박준혁 (Cycle 7 dc-2 영역 + 본 cycle dc-3 영역 추가) | **Batch 2** |

### narrative line 인과 chain

```
[Line C-1 — 현재 아버지 패턴 확인 — Batch 1]
  d-2 fired (Cycle 7) → e-5 (회사 단톡 떠벌림 + 9일 차단)        ← Batch 1
                          ↓
                        dc-3 (같은 부탁) [combine-3]              ← Batch 1
                          ↓
                        d-3 (아버지의 돈 접근 패턴, hidden)        ← Batch 1

[Line C-2 — 과거 사기 + 손절의 진짜 원인 — Batch 2]
  d-3 fired → e-6 (과거 송금 영수증 + 문자)                       ← Batch 2
                ↓
              dc-4 (손절의 이유) [combine-4 = e-3 + e-6]          ← Batch 2
                ↓
              d-4 (과거 손절과 아버지의 사기, legitimacyIssue)     ← Batch 2
                ↓
              w-3 (오미경 분식집 사장, pro_b)                      ← Batch 2

[Line C 보조 — w-2 d-3 영역 확장 — Batch 2]
  dc-3 fired → w-2 (박준혁) d-3 영역 추가 호출                    ← Batch 2

[다음 cycle — Line D 종합, Cycle 9 영역]
  d-3 + d-4 S3 → e-7 (과거/현재 대조표) + d-5 + dc-5
```

## 본 cycle 신규 정책 / 학습

### 정책 1: B character `affect_flattening` 자제 톤 (CT plot revision 영역 권위)

B(최수민) character integrity 권위 — 자제 톤 유지. 본 cycle trigger 시안의 다음 영역 적용:

- **B 자발 자료 제출 (npc_interjection source: b)** = "어쩔 수 없이 단답으로 제출" frame. 길게 떠벌리거나 능동 발설 X. 짧고 사무적.
- **B 감정 격앙 (emotional_outburst source: b) = 본 cycle에 사용 X**. 모든 emergence에서 b-outburst trigger 후보 제거.
- **Cascade 매개 위주** — B 능동 자발 X, dc 또는 e fired 후 cascade를 통한 자연 등장이 본 cycle 핵심 패턴.

### 정책 2: A character `premature_summary` 부정 외침 영역 확대

A(송다은) character — 결론 먼저 + 부정 외침 frame. 본 cycle 7 emergence 중 5개에서 a-outburst trigger 후보 채용:

- **A 격앙 부정 (emotional_outburst source: a)**: "그건 조작이야!" / "다 끝난 일을 왜 또 끌고와서!" / "아버지 일 끌고 들어오지 마!" / "우리 아빠를 사기꾼으로 만들지 마!" frame
- 판사가 catch → emergence narrative 진행
- A가 자기 frame이 흔들릴 때 단정으로 막으려는 패턴이 본 cycle의 주요 trigger 영역

### 정책 3: 그룹 2/3/4 surface tier 단계별 (진실 노출 정책 핵심)

본 cycle은 [[design_friend01_truth_disclosure_policy]] 영역의 **그룹 2 (아버지 사기 / 투자 명목 / 미상환), 그룹 3 (B 경고 의도 / 같은 패턴 반복), 그룹 4 (과거 손절 = A 아버지 원인 / B 차마 못 말함)** 3개 surface tier 동시 작업. 매우 민감 — 단계별 노출 영역 self-check 필수:

- **e-5 surface (d-3 unlock 전)**: 아버지 사기 단어 X. 예비신랑이 단톡에서 토로한 영역까지만.
- **dc-3 surface**: 패턴 인식 영역. "사기"는 d-4 영역.
- **d-3 S3 이후**: B가 "본인이 과거 같은 흐름을 겪었다" 인정 (사기 단어 d-3 회피).
- **e-6 surface (d-4 unlock 전)**: 과거 송금 자료. 사기 평가는 d-4 S3 후.
- **dc-4 / d-4 S3+**: 사기 + 미상환 + 침묵 동기 surface 가능.
- **w-3 surface**: 분식집 사장 증인은 dc-4 unlock 영역 — 사기 영역 진입 후.

본 surface tier 위반은 P0 leak — 4단계 GPT Pro 작성 + 5단계 검토 시점 self-check 필수.

### 정책 4: dc-4 label 변경 — "손절의 값" → "손절의 이유"

[[feedback_judge_dispassionate_action_focused]] 영역. "값"은 결과 평가 frame, "이유"는 인과 frame. 본 cycle 6단계 (Authority apply)에서 `src/data/coreCases/friend-01.case.ts` dc-4.label 직접 변경 + cascade priorCard reference text 본문에도 "[손절의 이유]" 사용. 다국어 sync도 본 영역 동반.

### 정책 5: 재판관 어법 (Cycle 7 도입, 유지)

본 cycle도 [[feedback_judge_dispassionate_action_focused]] 영역 전부 준수:

- ✗ "선을 넘다" / "흐름입니다" / "반증 자료" / "그 자료"
- ✓ "먼저 보낸/시도한" / "정황입니다" / "관련 자료"
- 증인 호출 동사 다양화: "호출하겠습니다" / "증인으로 모시겠습니다" / "확인해 보겠습니다"
- "과거" 같은 불필요한 수식어 회피 ("관련 자료 확인" 우선)
- "정렬되다" 같은 번역체 회피 ("겹치는 정황", "이어지는 정황" 등 자연 표현)

## Batch 분할 사유

총 30 trigger candidate × ~13 variants = ~390 KO entry 규모 (Cycle 7의 ~1.7배). self-contained 2 batch 분할 — GPT Pro 2 thread 병렬 진행:

| Batch | 폴더 | 처리 emergence | 예상 KO entry 수 |
|---|---|---|---|
| 1 | [batch1-e5-dc3-d3/](batch1-e5-dc3-d3/) | e-5 + dc-3 + d-3 (현재 패턴 확인) | ~150 |
| 2 | [batch2-e6-dc4-d4-w3-w2dc3/](batch2-e6-dc4-d4-w3-w2dc3/) | e-6 + dc-4 + d-4 + w-3 + w-2 dc-3 영역 확장 (과거 사기 + 손절 + 증인) | ~240 |

각 batch 폴더는 self-contained — 메모리/톤 sample 모두 복사. 외부 참조 X.

## GPT Pro 사용 절차

1. 각 batch 폴더를 GPT Pro Project에 업로드 (또는 채팅 첨부)
2. batch 폴더의 `README.md` 절차대로 진행
3. 모든 batch GPT 응답 도착 후 메인 Claude 세션(ws-friend-01-cycle worktree, branch `friend-01-cycle-8b`)에 일괄 전달

## 산출 처리 흐름 (메인 Claude 세션 — ws-friend-01-cycle worktree)

8단계 절차 ([design_core_narrative_cycle_procedure.md](batch1-e5-dc3-d3/design_core_narrative_cycle_procedure.md)) 기준:

- ✅ 0~2단계 완료 (정찰 / 기획 / 사용자 승인 + dynamics 피드백 반영)
- ⏳ 3단계 현재 (본 폴더 = 의뢰서)
- ⏳ 4단계 사용자 진행 (GPT Pro 2 thread 병렬, ~390 KO entry 작성)
- ⏳ 5단계 (검토 + 사용자 의견)
- ⏳ 6단계 (로직 체크 — Authority `narrativeTriggers` 신규 + dc-4 label 변경 + ScriptedText emergence_narrative channel 추가)
- ⏳ 7단계 (Codex 다국어 sync 의뢰서 — plot revision sync + Cycle 8b narrative wrapper sync 두 영역)
- ⏳ 8단계 (사후 통합)

## 폴더 정책

self-contained — 외부 참조 X. 일관 정책: [[feedback_external_brief_self_contained_folder]] 권위.

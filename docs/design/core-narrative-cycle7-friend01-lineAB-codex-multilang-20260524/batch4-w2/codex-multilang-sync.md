# Codex Thread — friend-01 Cycle 7 Batch 4 (w-2 박준혁 예비신랑 회사 후배 증인) 다국어 sync

작성일: 2026-05-24 (skeleton — entry table은 5단계 검토 후 fill-in)
범위: w-2 (13 variants) × 3 lang = **39 entry sync**

---

## §0~§1. 진입 조건 / 작업 배경

(Batch 1, 2, 3와 동일)

worktree branch: `codex/friend01-cycle7-batch4-multilang`
Brief: `docs/design/core-narrative-cycle7-friend01-lineAB-20260524/batch4-w2/`

### Batch 4 처리 emergence

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 증인 | `w-2` | 박준혁 (예비신랑 회사 후배, neutral + accurate) | 4 (cascade:dc-2 / combo / npc / fallback) | 13 |

### 본 batch cascade 영역

- w-2 cascade: `priorCard:dc-2` (이전 단서 reference)

---

## §2. KO baseline (main HEAD)

⚠ **5단계 검토 후 fill-in 영역**.

### 영향 파일

```
src/data/scriptedText/friend-01.json  channels.emergence_narrative
```

### 13 entry 구조 (skeleton — 6단계 KO apply 후 fill-in)

| Trigger | # | ID 예상 | speaker→listener | 핵심 KO (fill-in 대기) |
|---|---|---|---|---|
| **w-2** cascade_from_card (priorCard:dc-2) | 1~3 | emerge-w2-via-cascade-* | 판사·A·B | 앞서 [먼저 넘은 선] 후 박준혁 호출 |
| **w-2** combination_result (combine-2/9) | 4~6 | emerge-w2-via-combo-* | 판사·A | combine-2/9 후 객관 확인 증인 |
| **w-2** npc_interjection | 7~10 | emerge-w2-via-npc-* | A·B·판사 | A "수민이만 일방적" 단정 + B "그 사람 회사에선..." 흘림 catch |
| **w-2** judge_auto_mention | 11~13 | emerge-w2-via-fallback-* | 판사·A | N턴 stall 후 자발 호출 |

⚠ 위 ID 예상. GPT Pro 실제 응답 + 5단계 검토 후 확정.

---

## §3. 다국어 번역 원칙

### 3.1~3.2. 판사/NPC 영역 + 재판관 어법

(Batch 1, 2, 3 §3.1~§3.3 동일)

### 3.3. cascade `priorCard:dc-2` 다국어 보존

cascade entry 1~3의 text 본문 "앞서 [먼저 넘은 선]" reference:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[먼저 넘은 선]` | (기존 다국어 label 그대로 — 기존 friend-01.{lang}.json dossierCards 영역에서 baseline 확인) | (동일) | (동일) |

⚠ dc-2 label은 본 cycle 변경 X. 기존 다국어 label 정합 그대로 사용. 만약 기존 다국어 영역이 "case card" / "事件カード" / "案件卡" 같은 dossier 명칭 사용한다면 본 batch에서도 일관성 위해 "clue" / "手がかり" / "线索"로 통일 (`feedback_dossier_card_renamed_to_clue` 권위).

### 3.4. 증인 호출 동사 다양화 (Cycle 7 신규 정책)

박준혁 호출 동사:
- T1 cascade: "박준혁 씨를 증인으로 모시겠습니다"
- T2 combo: "본 법정에 박준혁 씨를 증인으로 등록합니다"
- T3 npc: "박준혁 씨 측 확인을 진행하겠습니다"
- T4 fallback: "본 법정에 박준혁 씨를 증인으로 등록합니다" (자발 발견 어조)

다국어 4 표현 모두 다양화. 동일 동사 단일 반복 X.

### 3.5. 증인 voice 보존

박준혁 (w-2):
- 34세, 회사원, 예비신랑 김태윤 회사 후배
- neutral bias + accurate distortion
- hiddenAgenda: 예비신랑과 직장 관계 불편해질까 봐 조심
- 본 batch는 "호출 가능해짐" 시점 (실제 증언 영역 X — 별도 channel)

호칭:
- A → 박준혁: "그분" / "그 사람" (먼 호칭, 사적 관계 X)
- B → 박준혁: 직접 호칭 회피 → "그 사람 회사에선" 우회 인용
- 재판관 → "박준혁 씨"

### 3.6. 진실 노출 정책

- 본 batch 영역 OK:
  - "예비신랑 측 행적" / "예비신랑이 먼저" — dc-2 부상 후 영역
- 본 batch 영역 절대 X:
  - "아버지 사기" / "투자 명목" / "미상환" (Line C / Cycle 8 영역)

### 3.7. A reaction 표현 (의심 → 동요)

본 batch A 반응 특징:
- 박준혁이 예비신랑 회사 후배 → A는 한쪽 편향 의심 ("그 회사 사람이 객관적이겠습니까?")
- 단정 → 의심 → 동요 톤 변화 (premature_summary archetype)

다국어 번역에서 A의 단정형/의심형/동요형 톤 변화 모두 보존.

### 3.8. dynamics + "사건 카드" → "단서" 명칭

(Batch 1, 2, 3 동일)

---

## §4~§7. 작업 단계 / 검증 / 산출

(Batch 1, 2, 3 동일)

산출 commit:
```
git commit -m "i18n(friend-01): sync Cycle 7 Batch 4 — w-2 박준혁 증인 호출 narrative (13 variants × 3 lang)"
git push -u origin codex/friend01-cycle7-batch4-multilang
```

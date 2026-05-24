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

## §2. KO baseline (main HEAD `f2e9a529`, Cycle 7 6단계 commit 완료)

### 영향 파일

```
src/data/scriptedText/friend-01.json  channels.emergence_narrative  emerge-w-2 key (13 variants)
src/data/coreCases/friend-01.case.ts  witnesses[id='w-2']  knowledgeScope + address.fromB  (사용자 narrative 결정 — 박준혁 = B의 필라테스 수강생 이중 관계 추가)
```

### 13 entry 구조 (확정)

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **w-2** cascade_from_card | 1 | emerge-w2-via-cascade-judge-decree-v1 | 판사→전체 (priorCard:dc-2) | 앞서 [먼저 넘은 선] 단서 등록, 예비신랑 측 행적 확인 위해 박준혁 증인으로 모심 |
| w-2 cascade_from_card | 2 | emerge-w2-via-cascade-a-react-v1 | A→판사 (priorCard:dc-2) | A 의심 — 예비신랑 회사 사람까지요? 김태윤 후배라면 한쪽 얘기만 들릴 가능성 |
| w-2 cascade_from_card | 3 | emerge-w2-via-cascade-b-react-v1 | B→판사 (priorCard:dc-2) | B 평평 — 확인되면 좋겠다, 더 보탤 말 없다 |
| **w-2** combination_result | 4 | emerge-w2-via-combo-judge-mention-v1 | 판사→전체 | [먼저 넘은 선] 후 선후관계 더 확인 필요, 박준혁 증언 필요 |
| w-2 combination_result | 5 | emerge-w2-via-combo-a-react-v1 | A→판사 | A 편향 의심 — 회사 사람이 객관적이겠나, 같은 회사면 그쪽 사정 먼저 |
| w-2 combination_result | 6 | emerge-w2-via-combo-judge-decree-v1 | 판사→전체 | 편향 가능성 질문 범위에서 관리, 본 법정에 박준혁 증인 등록 |
| **w-2** npc_interjection | 7 | emerge-w2-via-npc-a-claim-v1 | A→판사 | A 단정 — 수민이가 일방적으로 메시지 보냈고 김태윤은 받기만, 그게 본 전부 |
| w-2 npc_interjection | 8 | emerge-w2-via-npc-b-interject-v1 | B→A | B 짧은 끼어듦 — "사실 그 사람 회사 후배가 제 수업 수강생입니다. 그 후배는 회사에서 별 이상한 이야기를 다 했다고 합니다. 직접 들어보시는 게 어떠신가요?" (B와 박준혁 이중 인연) |
| w-2 npc_interjection | 9 | emerge-w2-via-npc-judge-decree-v1 | 판사→전체 | 회사에서 알고 있다는 취지 발언, 박준혁 측 확인 진행 |
| w-2 npc_interjection | 10 | emerge-w2-via-npc-a-react-v1 | A→판사 | A 동요 — 그쪽 회사 사람한테 들으면 되겠다, 다만 그 말이 전부라 보긴 어렵다 |
| **w-2** judge_auto_mention | 11 | emerge-w2-via-fallback-judge-mention-v1 | 판사→전체 | N턴 stall — 예비신랑 측 행적 선후관계 미확인, 확인 가능 증인 필요 |
| w-2 judge_auto_mention | 12 | emerge-w2-via-fallback-a-react-v1 | A→판사 | A 의심 — 굳이 그쪽 회사 사람을요? 같은 회사면 말 조심스러울 텐데 |
| w-2 judge_auto_mention | 13 | emerge-w2-via-fallback-judge-decree-v1 | 판사→전체 | 편향 감안 질문 범위 사실관계로 제한, 박준혁 증언 청취 |

### 추가 다국어 변경 영역 (w-2 knowledgeScope + address)

본 batch는 ScriptedText 외에도 **w-2 metadata 다국어 영역 변경 필요**:

| field | 변경 전 | 변경 후 (KO baseline) |
|---|---|---|
| `witnesses[w-2].knowledgeScope` | "예비신랑의 회사 후배로, 예비신랑이 최수민에게 먼저 접근한 사실을 알고 있다." | **"예비신랑 김태윤의 회사 후배이자 최수민의 필라테스 수강생. 회사에서 예비신랑이 떠벌린 이야기를 우연히 듣고 최수민에게 알린 적이 있다."** |
| `witnesses[w-2].address.fromB` | "최수민 씨" | **"수민 선생님"** (수강생 → 강사 호칭) |

다국어 영역 (EN/JA/ZH-CN)에서도 동일 의미·정합 변경 필요. 영향 file:
- `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` witnesses[w-2] 영역

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

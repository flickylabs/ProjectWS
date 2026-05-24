# Codex Thread — spouse-01 Cycle 2 Batch 4 (h-d3 + w-2 h-d3 영역) 다국어 sync

작성일: 2026-05-24
범위: 신규 channel `emergence_narrative` Batch 4 — h-d3 (13 variants, 잠재 쟁점) + w-2 h-d3 영역 (9 variants, 증인 호출 분기) = 22 × 3 lang = **66 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-cycle2-batch4-multilang ../ws-spouse01-cycle2-batch4-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-cycle2-batch4-multilang` push |

---

## §1. 작업 배경

Cycle 2 자금 line과 병행 발현 batch.

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 쟁점 (hidden) | `h-d3` | 공동 적금 2,000만원 해지 경위 | 4 (npc / combo / emotional / fallback) | 13 |
| 증인 (h-d3 분기) | `w-2(h-d3)` | 은행 직원 (위임장 처리 증언) | 3 (cascade / npc / fallback) | 9 |

⚠ **w-2 증인의 특수성:** w-2는 d-2 영역과 h-d3 영역 모두 cover. 본 batch는 **h-d3 영역 호출 narrative만**. d-2 영역 증언은 별도 cycle.

⚠ **잠재 쟁점 발현의 무게:** h-d3은 hidden dispute. 발현 narrative가 결정적.

Brief: `docs/design/core-narrative-cycle2-spouse01-money-line-20260524/batch4-hd3-w2/` 정독 권장.

---

## §2. KO baseline (main HEAD `d885ac5f` 적용 완료)

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **h-d3** npc_interjection | 1 | emerge-hd3-via-b-interject-v1 | B→판사 | B 적극 끼어듦 — 별도 계좌만으로 설명 안 되는 부부 공동 적금 잔액 변화 짚음 |
| h-d3 npc_interjection | 2 | emerge-hd3-via-b-interject-judge-react-v1 | 판사→B | 변화 확인 시점/경위 질의 |
| h-d3 npc_interjection | 3 | emerge-hd3-via-b-interject-b-response-v1 | B→판사 | 통장 정리 중 발견 — 만기 전 해지, 본인 동의 절차와 불일치 |
| h-d3 npc_interjection | 4 | emerge-hd3-via-b-interject-judge-decree-v1 | 판사→전체 | [공동 적금 2,000만원 해지 경위] 별도 쟁점 추가 |
| **h-d3** combination_result | 5 | emerge-hd3-via-combo-judge-query-v1 | 판사→A | 해지 서류 + 앞선 설명 종합, 절차 진행 경위 별도 쟁점 확인 |
| h-d3 combination_result | 6 | emerge-hd3-via-combo-a-response-v1 | A→판사 | 사정 있어 어쩔 수 없었음 |
| h-d3 combination_result | 7 | emerge-hd3-via-combo-judge-decree-v1 | 판사→전체 | [공동 적금 2,000만원 해지 경위] 별도 쟁점 추가 |
| **h-d3** emotional_outburst | 8 | emerge-hd3-via-a-outburst-v1 | A→판사 | A 격앙 — 남편 별도 계좌 얘기에 반박, 공동 적금 손댈 수밖에 없었음 흘림 (HEAD `63eb67bf` polish 반영 — "하시는데" → "하는데") |
| h-d3 emotional_outburst | 9 | emerge-hd3-via-a-outburst-judge-catch-v1 | 판사→A | 방금 언급한 공동 적금 처리 경위 별도 검토 통보 |
| h-d3 emotional_outburst | 10 | emerge-hd3-via-a-outburst-a-admit-v1 | A→판사 | 절차 답변 수용 |
| h-d3 emotional_outburst | 11 | emerge-hd3-via-a-outburst-judge-decree-v1 | 판사→전체 | [공동 적금 2,000만원 해지 경위] 별도 쟁점 추가 |
| **h-d3** judge_auto_mention | 12 | emerge-hd3-via-judge-auto-decree-v1 | 판사→전체 | 5턴 fallback — 양측 자금 흐름 정리 후 해지 경위 확인 필요, [공동 적금 2,000만원 해지 경위] 별도 쟁점 추가 |
| h-d3 judge_auto_mention | 13 | emerge-hd3-via-judge-auto-a-respond-v1 | A→판사 | 수용 |
| **w-2(h-d3)** cascade_from_card | 14 | emerge-w2hd3-via-cascade-judge-mention-v1 | 판사→전체 | priorCard:dc-7 — 해지 절차 객관적 확인 필요, 은행 측 증언으로 위임장 처리 경위 검토 |
| w-2(h-d3) cascade_from_card | 15 | emerge-w2hd3-via-cascade-a-acknowledge-v1 | A→판사 | 절차 수용 |
| w-2(h-d3) cascade_from_card | 16 | emerge-w2hd3-via-cascade-judge-summon-v1 | 판사→전체 | 해당 은행 직원 위임장 처리 경위 증언 호출 가능 절차 허가 |
| **w-2(h-d3)** npc_interjection | 17 | emerge-w2hd3-via-b-interject-v1 | B→판사 | B 적극 끼어듦 — 위임장 처리 경위 객관적 증언 요청 |
| w-2(h-d3) npc_interjection | 18 | emerge-w2hd3-via-b-interject-judge-react-v1 | 판사→B | 구체적으로 어떤 증언 요청인지 확인 |
| w-2(h-d3) npc_interjection | 19 | emerge-w2hd3-via-b-interject-b-elaborate-v1 | B→판사 | 해지 절차 담당 은행 직원 증언 — 서류 확인 절차 진위 짚어 줄 것 요청 |
| w-2(h-d3) npc_interjection | 20 | emerge-w2hd3-via-b-interject-judge-summon-v1 | 판사→전체 | 해당 은행 직원 위임장 처리 경위 증언 호출 가능 절차 허가 |
| **w-2(h-d3)** judge_auto_mention | 21 | emerge-w2hd3-via-judge-auto-summon-v1 | 판사→전체 | 5턴 fallback — 위임장 처리 경위 확인 더 미룰 수 없음, 은행 측 직원 호출 절차 증언 청취 |
| w-2(h-d3) judge_auto_mention | 22 | emerge-w2hd3-via-judge-auto-a-respond-v1 | A→판사 | 수용 |

---

## §3. 다국어 번역 원칙

### 3.1. 잠재 쟁점 발현 무게감 (본 batch 핵심)

h-d3은 hidden dispute. 발현 narrative는 **결정적 톤** — 단정·강압 회피하되 무게감 강조.

- 판사 발현 선언: "본 법정에 [공동 적금 2,000만원 해지 경위] 쟁점을 추가로 다룹니다." — 추가 쟁점 등재의 무게 보존
- KO: "...쟁점을 추가로 다룹니다"
- EN: "This Court hereby adds [the Joint Savings Cancellation Matter] to the disputes under examination."
- JA: "本法廷は[共同積立預金2,000万ウォン解約の経緯]を追加の争点として扱います。"
- ZH-CN: "本法庭将[共同储蓄2000万韩元解约的经过]列为追加争议事项。"

### 3.2. 호칭

판사 / 박지연 / 이준호: Cycle 1 sync §3 동일.

은행 직원 호칭 (w-2):
- 본 batch는 w-2 호출 가능 surface까지만. 실제 w-2 증언은 별도 channel
- 판사 발화에서 "은행 직원" / "해지 처리 담당자" 등 일반 호명만 사용

### 3.3. cascade_from_card 다국어 보존

본 batch entry 14/15/16 (w-2 h-d3 cascade).

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[공동 적금 2,000만 원의 해지]` | `[Cancellation of the ₩20M Joint Savings]` | `[共同積立預金2,000万ウォンの解約]` | `[共同储蓄2000万韩元的取消]` |
| `[공동 적금 2,000만원 해지 경위]` (쟁점명) | `[Joint Savings Cancellation Matter]` | `[共同積立預金2,000万ウォン解約の経緯]` | `[共同储蓄2000万韩元解约的经过]` |

⚠ 쟁점명 baseline은 dispute name 영역 (h-d3.name in spouse-01.{lang}.json).

### 3.4. dynamics 차별성

- h-d3 npc_interjection: B "공동 적금도 비어 있더라" 흘림 — 발견적 톤
- h-d3 combination: combine-5 조합 — 발견적 톤 (e-7 surface와 거의 동시)
- h-d3 emotional_outburst: A 동요 → 적금 흘림 — 격앙·자기 폭로
- w-2(h-d3) cascade: dc-7 후 위임장 처리 절차 확인 → w-2 분기 진입
- w-2(h-d3) npc_interjection: B "위임장 진위 확인 부탁" 요청

### 3.5. 진실 노출 — Issue B 영역 직접 해결

- h-d3 발현 narrative: **"쟁점 자체의 등장"까지만 surface**
- "박지연 단독 해지" / "위임장 위조" / "투자방 송금 손실" 단정 surface 금지 — h-d3 S4/S5 이후만
- B 단호 발화도 "필적 차이" / "동의 없음"으로 표현. "위조" 단정 회피
- w-2(h-d3) 호출 narrative는 호출 분기 진입까지만 — 증언 내용은 별도 channel

---

## §4. 작업 단계

Batch 1 sync §4 동일. 외국어 3 file에 본 batch 22 entry 추가.

### tag 처리

- tag values 번역 X (`channel:emergence_narrative`, `speaker:b`, `trigger:cascade_from_card`, `priorCard:dc-7`, `comboRecipeId:combine-5`, `disputeContext:h-d3`, `continuity:summon` 등)
- `callTerm:박지연_씨` / `judgeAddress:재판관님` 그대로 유지

---

## §5. 검증

Batch 1 sync §5 동일.

---

## §6. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync Cycle 2 Batch 4 — h-d3 + w-2(h-d3) emergence narrative (22 variants × 3 lang)"
git push -u origin codex/spouse01-cycle2-batch4-multilang
```

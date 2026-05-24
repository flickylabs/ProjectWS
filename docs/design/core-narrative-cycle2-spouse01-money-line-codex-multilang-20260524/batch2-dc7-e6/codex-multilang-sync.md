# Codex Thread — spouse-01 Cycle 2 Batch 2 (dc-7 + e-6) 다국어 sync

작성일: 2026-05-24
범위: 신규 channel `emergence_narrative` Batch 2 — dc-7 (12 variants) + e-6 (13 variants) = 25 × 3 lang = **75 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-cycle2-batch2-multilang ../ws-spouse01-cycle2-batch2-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-cycle2-batch2-multilang` push |

---

## §1. 작업 배경

Cycle 2 자금 흐름 line 중간 batch.

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 사건 카드 | `dc-7` | 공동 적금 2,000만 원의 해지 | 4 (combo / cascade / npc / fallback) | 12 |
| 증거 | `e-6` | 투자방 텔레그램 + 송금 기록 | 4 (cascade / npc / emotional / fallback) | 13 |

Brief: `docs/design/core-narrative-cycle2-spouse01-money-line-20260524/batch2-dc7-e6/` 정독 권장.

---

## §2. KO baseline (main HEAD)

### 영향 파일

```
src/data/scriptedText/spouse-01.json  channels.emergence_narrative
```

### 25 entry 구조 (main HEAD `d885ac5f` 적용 완료, KO baseline 확정)

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **dc-7** combination_result | 1 | emerge-dc7-via-combo-judge-query-v1 | 판사→A | 위임장 서명/B 필적 불일치 + A 앞선 설명 종합, 해지 절차 책임 질의 |
| dc-7 combination_result | 2 | emerge-dc7-via-combo-a-response-v1 | A→판사 | 몰린 상태 단독 결정 시인, 잘한 일은 아님 |
| dc-7 combination_result | 3 | emerge-dc7-via-combo-judge-decree-v1 | 판사→전체 | [공동 적금 2,000만 원의 해지] 사건 카드 정식 등재 |
| **dc-7** cascade_from_card | 4 | emerge-dc7-via-cascade-judge-mention-v1 | 판사→A | priorCard:e-7 — 해지 서류 절차 책임 누적, 해지 절차 자체를 별도 책임 항목으로 정리 |
| dc-7 cascade_from_card | 5 | emerge-dc7-via-cascade-a-response-v1 | A→판사 | 판단 수용 |
| dc-7 cascade_from_card | 6 | emerge-dc7-via-cascade-judge-decree-v1 | 판사→전체 | [공동 적금 2,000만 원의 해지] 사건 카드 정식 등재 |
| **dc-7** npc_interjection | 7 | emerge-dc7-via-b-interject-v1 | B→판사 | B 적극 끼어듦 — 해지 동의한 적 없음 단호 |
| dc-7 npc_interjection | 8 | emerge-dc7-via-b-interject-judge-react-v1 | 판사→B | 입장을 절차 책임 관점에서 정리 요청 |
| dc-7 npc_interjection | 9 | emerge-dc7-via-b-interject-b-elaborate-v1 | B→판사 | 필적 차이 확인 + 절차 처리 책임 명확화 요청 |
| dc-7 npc_interjection | 10 | emerge-dc7-via-b-interject-judge-decree-v1 | 판사→전체 | [공동 적금 2,000만 원의 해지] 사건 카드 정식 등재 |
| **dc-7** judge_auto_mention | 11 | emerge-dc7-via-judge-auto-decree-v1 | 판사→전체 | 5턴 fallback — 해지 경위 논의 누적, [공동 적금 2,000만 원의 해지] 정식 등재 |
| dc-7 judge_auto_mention | 12 | emerge-dc7-via-judge-auto-a-respond-v1 | A→판사 | 수용 |
| **e-6** cascade_from_card | 13 | emerge-e6-via-cascade-judge-query-v1 | 판사→A | priorCard:dc-7 — 해지액 사용 흐름 확인, 자금 행선지 질의 |
| e-6 cascade_from_card | 14 | emerge-e6-via-cascade-a-response-v1 | A→판사 | 별도 운용 자금 시인, 투자방 기록 존재 언급 |
| e-6 cascade_from_card | 15 | emerge-e6-via-cascade-judge-decree-v1 | 판사→전체 | [투자방 텔레그램 + 송금 기록] 정식 등재 |
| **e-6** npc_interjection | 16 | emerge-e6-via-b-interject-v1 | B→판사 | B 적극 끼어듦 — 해지 2,000만 원 행선지 본 법정 밝힘 요청 |
| e-6 npc_interjection | 17 | emerge-e6-via-b-interject-judge-react-v1 | 판사→A | 자금 사용처 직접 답변 요청 |
| e-6 npc_interjection | 18 | emerge-e6-via-b-interject-a-response-v1 | A→판사 | 별도 운용 자금 시인 + 기록 제출 의사 |
| e-6 npc_interjection | 19 | emerge-e6-via-b-interject-judge-decree-v1 | 판사→전체 | [투자방 텔레그램 + 송금 기록] 정식 등재 |
| **e-6** emotional_outburst | 20 | emerge-e6-via-a-outburst-v1 | A→판사 | A 격앙 폭발 — 투자방 송금까지 본인이 직접 말해야 하느냐 항변 |
| e-6 emotional_outburst | 21 | emerge-e6-via-a-outburst-judge-catch-v1 | 판사→A | 방금 언급한 투자방 송금 기록 제출 요청 |
| e-6 emotional_outburst | 22 | emerge-e6-via-a-outburst-a-admit-v1 | A→판사 | 기록 제출 수용 (수치심 톤) |
| e-6 emotional_outburst | 23 | emerge-e6-via-a-outburst-judge-decree-v1 | 판사→전체 | [투자방 텔레그램 + 송금 기록] 정식 등재 |
| **e-6** judge_auto_mention | 24 | emerge-e6-via-judge-auto-decree-v1 | 판사→A | 5턴 fallback — 해지액 2,000만 원 사용 흐름 미정리, [투자방 텔레그램 + 송금 기록] 정식 등재 |
| e-6 judge_auto_mention | 25 | emerge-e6-via-judge-auto-a-respond-v1 | A→판사 | 제출 수용 (수치심 톤) |

---

## §3. 다국어 번역 원칙

### 3.1. 판사 + 파티

Cycle 1 sync 의뢰서 §3 동일. 본 batch는 **A 수치심·자기 폭로** dynamics 핵심 — emotional_outburst (entry 20~23) 다국어 톤 깊이 신경.

### 3.2. cascade_from_card 다국어 보존

본 batch entry 4/5/6 (dc-7 cascade) + 13/14/15 (e-6 cascade).

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[공동 적금 해지 서류]` | `[Joint Savings Cancellation Document]` | `[共同積立預金解約書類]` | `[共同储蓄解约文件]` |
| `[공동 적금 2,000만 원의 해지]` | `[Cancellation of the ₩20M Joint Savings]` | `[共同積立預金2,000万ウォンの解約]` | `[共同储蓄2000万韩元的取消]` |
| `[투자방 텔레그램 + 송금 기록]` | `[Telegram Investment Room + Transfer Records]` | `[投資チャットルーム + 送金記録]` | `[投资群组 + 转账记录]` |

⚠ 카드명 baseline은 기존 ScriptedText의 dossierCard label / evidence surfaceName 영역 (spouse-01.{lang}.json) 참조.

### 3.3. dynamics 차별성

- dc-7 combination: combine-5 (e-7 + A 자기방어) — 판사 위임장 위조 확정 narrative
- dc-7 cascade: e-7 정리 누적 후 절차 책임 카드 surface
- dc-7 npc_interjection: B "동의 없이 진행됐다" 단호 강조
- e-6 cascade: dc-7 후 "해지된 2,000만 원 행선지" 자연 추적
- e-6 emotional_outburst: A 수치심 폭발 — **다국어 핵심 dynamics**
- e-6 npc_interjection: B 직접 추궁

### 3.4. 진실 노출

- "위임장 위조" 단정 surface 금지 — B 본인 단호 발화 영역에서 "필적 차이"/"동의 없음"으로 surface OK
- "사기 손실" / "전액 잃음" — h-d3 S5 이후만. 본 batch는 "송금 기록 등재"까지만
- A 본인 발화: "투자방", "별도 운용" 단어 surface OK (자기 폭로)

---

## §4. 작업 단계

Batch 1 sync §4 동일. 외국어 3 file에 본 batch 25 entry 추가.

### tag 처리

- tag values 번역 X (`channel:emergence_narrative`, `speaker:a`, `trigger:cascade_from_card`, `priorCard:e-7|dc-7`, `comboRecipeId:combine-5` 등)
- `callTerm:박지연_씨` / `judgeAddress:재판관님` 그대로 유지

---

## §5. 검증

```
git status --short
npx tsc --noEmit
npm run build
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.en.json','utf8'))"
```

---

## §6. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync Cycle 2 Batch 2 — dc-7 + e-6 emergence narrative (25 variants × 3 lang)"
git push -u origin codex/spouse01-cycle2-batch2-multilang
```

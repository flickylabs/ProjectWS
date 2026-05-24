# Codex Thread — spouse-01 Cycle 2 Batch 3 (dc-4 + w-3) 다국어 sync

작성일: 2026-05-24
범위: 신규 channel `emergence_narrative` Batch 3 — dc-4 (12 variants) + w-3 (13 variants) = 25 × 3 lang = **75 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-cycle2-batch3-multilang ../ws-spouse01-cycle2-batch3-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-cycle2-batch3-multilang` push |

---

## §1. 작업 배경

Cycle 2 자금 흐름 line 종결 + 외부 증인 batch.

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 사건 카드 | `dc-4` | 돌이키고 싶은 2,000만 원 | 4 (combo / cascade / emotional / fallback) | 12 |
| 증인 | `w-3` | 박미라 (호출 가능 surface) | 4 (cascade / npc / emotional / fallback) | 13 |

⚠ w-3 emergence는 "박미라 증인 호출 가능" surface 시점의 narrative. 실제 박미라 증언은 별도 `witness` channel (본 batch 범위 외).

Brief: `docs/design/core-narrative-cycle2-spouse01-money-line-20260524/batch3-dc4-w3/` 정독 권장.

---

## §2. KO baseline (main HEAD `d885ac5f` 적용 완료)

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **dc-4** combination_result | 1 | emerge-dc4-via-combo-judge-query-v1 | 판사→A | 해지 서류 + 투자방 송금 기록 날짜/금액 일치, 해지액의 투자방 운영자 계좌 이동 이후 흐름 질의 |
| dc-4 combination_result | 2 | emerge-dc4-via-combo-a-response-v1 | A→판사 | 돈 돌아오지 않음, 약속 수익도 전부 사라짐 (자기 폭로) |
| dc-4 combination_result | 3 | emerge-dc4-via-combo-judge-decree-v1 | 판사→전체 | [돌이키고 싶은 2,000만 원] 사건 카드 정식 등재 |
| **dc-4** cascade_from_card | 4 | emerge-dc4-via-cascade-judge-mention-v1 | 판사→A | priorCard:e-6 — 송금 기록 + 해지 서류 종합, 해지액 마지막 흐름 정리 필요 |
| dc-4 cascade_from_card | 5 | emerge-dc4-via-cascade-a-response-v1 | A→판사 | 결과 수용 (수치) |
| dc-4 cascade_from_card | 6 | emerge-dc4-via-cascade-judge-decree-v1 | 판사→전체 | [돌이키고 싶은 2,000만 원] 사건 카드 정식 등재 |
| **dc-4** emotional_outburst | 7 | emerge-dc4-via-a-outburst-v1 | A→판사 | A 격앙 자기 폭로 — 돈 다 잃었음, 사기였음, 인정 못해 숨겼음 |
| dc-4 emotional_outburst | 8 | emerge-dc4-via-a-outburst-judge-catch-v1 | 판사→A | 방금 진술을 해지액 결과 직접 인정으로 수용 |
| dc-4 emotional_outburst | 9 | emerge-dc4-via-a-outburst-a-admit-v1 | A→판사 | 전부 본인 책임 수용 |
| dc-4 emotional_outburst | 10 | emerge-dc4-via-a-outburst-judge-decree-v1 | 판사→전체 | [돌이키고 싶은 2,000만 원] 사건 카드 정식 등재 |
| **dc-4** judge_auto_mention | 11 | emerge-dc4-via-judge-auto-decree-v1 | 판사→전체 | 5턴 fallback — 송금 이후 자금 결과 미정리, [돌이키고 싶은 2,000만 원] 추가 등재 |
| dc-4 judge_auto_mention | 12 | emerge-dc4-via-judge-auto-a-respond-v1 | A→판사 | 수용 |
| **w-3** cascade_from_card | 13 | emerge-w3-via-cascade-judge-mention-v1 | 판사→A | priorCard:dc-4 — 투자방 링크 전달 경위 확인, 전달자 존재 여부 질의 |
| w-3 cascade_from_card | 14 | emerge-w3-via-cascade-a-acknowledge-v1 | A→판사 | 지인 한 명 있었음 시인 |
| w-3 cascade_from_card | 15 | emerge-w3-via-cascade-judge-summon-v1 | 판사→전체 | 해당 인물 증인 호출 절차 허가 |
| **w-3** npc_interjection | 16 | emerge-w3-via-b-interject-v1 | B→판사 | B 적극 끼어듦 — 투자방 소개자 신원 밝힘 요청 |
| w-3 npc_interjection | 17 | emerge-w3-via-b-interject-judge-react-v1 | 판사→A | 링크 전달자 신원 본 법정 통보 요청 |
| w-3 npc_interjection | 18 | emerge-w3-via-b-interject-a-response-v1 | A→판사 | 본인 지인 한 명 시인 |
| w-3 npc_interjection | 19 | emerge-w3-via-b-interject-judge-summon-v1 | 판사→전체 | 해당 인물 증인 호출 절차 허가 |
| **w-3** emotional_outburst | 20 | emerge-w3-via-a-outburst-v1 | A→판사 | A 격앙 — "미라가 보내준 링크" 이름 흘림, 책임 분산 톤 |
| w-3 emotional_outburst | 21 | emerge-w3-via-a-outburst-judge-catch-v1 | 판사→A | 미라 씨 확인 필요 여부 판단 통보 |
| w-3 emotional_outburst | 22 | emerge-w3-via-a-outburst-a-admit-v1 | A→판사 | 미라 씨 호출 요청 수용 |
| w-3 emotional_outburst | 23 | emerge-w3-via-a-outburst-judge-summon-v1 | 판사→전체 | 박미라 씨 증인 호출 절차 허가 |
| **w-3** judge_auto_mention | 24 | emerge-w3-via-judge-auto-summon-v1 | 판사→전체 | 5턴 fallback — 투자방 링크 출처 확인 더 미룰 수 없음, 관련 인물 증인 호출 절차 개방 |
| w-3 judge_auto_mention | 25 | emerge-w3-via-judge-auto-a-respond-v1 | A→판사 | 수용 |

---

## §3. 다국어 번역 원칙

### 3.1. 판사 + 파티

Cycle 1 sync §3 동일. 본 batch는 **A 자기 폭로 climax** — emotional_outburst (entry 7~10, 20~23) 다국어 후회·수치 톤 핵심.

### 3.2. 박미라 호칭 (본 batch 신규)

박미라는 본 batch에서 증인 호출 가능 surface로 등장 (이름 surface 영역).

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `박미라` (제3자 referent) | `Ms. Park Mi-ra` | `パク・ミラさん` | `朴美罗女士` |
| `미라` (A 친밀 호명) | `Mi-ra` | `ミラ` | `美罗` |
| `미라 씨` (A 격식 친구) | `Ms. Mi-ra` | `ミラさん` | `美罗女士` |

판사 발화는 `박미라 씨` 일관, A 발화는 격식 환경에서 `미라 씨` 권장.

### 3.3. cascade_from_card 다국어 보존

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[투자방 텔레그램 + 송금 기록]` | `[Telegram Investment Room + Transfer Records]` | `[投資チャットルーム + 送金記録]` | `[投资群组 + 转账记录]` |
| `[돌이키고 싶은 2,000만 원]` | `[The ₩20M I Wish I Could Take Back]` | `[取り戻したい2,000万ウォン]` | `[想要挽回的2000万韩元]` |

⚠ 카드명 baseline은 기존 spouse-01.{lang}.json dossierCard label 영역.

### 3.4. dynamics 차별성

- dc-4 combination: combine-3 (e-6 + e-7) — 사기 손실 line 확정
- dc-4 cascade: e-6 후 송금 결과 cascade
- dc-4 emotional_outburst: A 사기 손실 자기 인정 — **수치·후회 톤 핵심**
- w-3 cascade: dc-4 후 "투자방 링크 출처는?" 자연 query
- w-3 npc_interjection: B 직접 출처 추궁
- w-3 emotional_outburst: A 박미라 이름 본인이 흘림 — 책임 분산 톤

### 3.5. 진실 노출

- "사기" / "전액 잃음" / "돌아오지 않음" — A 본인 발화로 surface OK (자기 폭로)
- "이혼 대비" / "수치심" 동기 frame — dc-4 q1/q2 별도 추궁에서 처리. emergence narrative에서는 surface X
- 박미라 이름 surface 시점: A emotional_outburst 본인이 흘림 OR judge cascade에서 "지인"으로 우회

---

## §4. 작업 단계

Batch 1 sync §4 동일. 외국어 3 file에 본 batch 25 entry 추가.

### tag 처리

- tag values 번역 X (`channel:emergence_narrative`, `speaker:a`, `trigger:cascade_from_card`, `priorCard:e-6|dc-4`, `comboRecipeId:combine-3`, `continuity:summon` 등)
- `callTerm:박지연_씨` / `callTerm:박미라` (KO 기준) 그대로 유지

---

## §5. 검증

Batch 1 sync §5 동일.

---

## §6. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync Cycle 2 Batch 3 — dc-4 + w-3 emergence narrative (25 variants × 3 lang)"
git push -u origin codex/spouse01-cycle2-batch3-multilang
```

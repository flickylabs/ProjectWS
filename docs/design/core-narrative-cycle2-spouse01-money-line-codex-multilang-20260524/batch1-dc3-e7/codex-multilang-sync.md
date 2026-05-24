# Codex Thread — spouse-01 Cycle 2 Batch 1 (dc-3 + e-7) 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역)
범위: 신규 channel `emergence_narrative` 의 Batch 1 entry — dc-3 (13 variants) + e-7 (12 variants) = 25 variants × 3 lang = **75 entry sync**

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-cycle2-batch1-multilang ../ws-spouse01-cycle2-batch1-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/spouse01-cycle2-batch1-multilang` push |

---

## §1. 작업 배경

Core System narrative wrapper layer Cycle 2 (자금 흐름 line) 첫 batch.

- KO commit: main branch에 25 entry (`src/data/scriptedText/spouse-01.json` channels.emergence_narrative.entries) 적용 완료
- 본 작업: EN/JA/ZH-CN sync 25 entry × 3 lang = 75 entry 작성
- Brief: `docs/design/core-narrative-cycle2-spouse01-money-line-20260524/batch1-dc3-e7/` 정독 권장 (특히 gpt-pro-brief.md + spouse01-tone-samples.md)

### Batch 1 처리 emergence

| 영역 | id | 자연 명칭 | trigger 수 | KO entry |
|---|---|---|---|---|
| 사건 카드 | `dc-3` | 이준호의 비밀 개인 계좌 | 4 (combo / cascade / npc / fallback) | 13 |
| 증거 | `e-7` | 공동 적금 해지 서류 | 4 (cascade / combo / npc / fallback) | 12 |

---

## §2. KO baseline (main HEAD)

### 영향 파일

```
src/data/scriptedText/spouse-01.json  channels.emergence_narrative
```

`emergence_narrative` 채널은 Cycle 1에서 도입됨 (emerge-e-5 17 entry 기존 존재). 본 batch는 같은 channel의 entries 배열에 dc-3 + e-7 keys 추가.

### 25 entry 구조

⚠ **entry id list는 메인 Claude 세션이 GPT Pro 응답 도착 후 본 영역에 채워서 사용자에게 전달.**

채우기 전 placeholder:

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **dc-3** combination_result | 1 | emerge-dc3-via-combo-judge-query-v1 | 판사→B | `{GPT 응답으로 채움}` |
| dc-3 combination_result | 2 | emerge-dc3-via-combo-b-response-v1 | B→판사 | `{...}` |
| dc-3 combination_result | 3 | emerge-dc3-via-combo-a-react-v1 | A→판사 | `{...}` |
| dc-3 combination_result | 4 | emerge-dc3-via-combo-judge-decree-v1 | 판사→전체 | `{...}` |
| **dc-3** cascade_from_card | 5 | emerge-dc3-via-cascade-judge-mention-v1 | 판사→B | `{...}` (priorCard:dc-cash-clue) |
| dc-3 cascade_from_card | 6 | emerge-dc3-via-cascade-b-response-v1 | B→판사 | `{...}` |
| dc-3 cascade_from_card | 7 | emerge-dc3-via-cascade-judge-decree-v1 | 판사→전체 | `{...}` |
| **dc-3** npc_interjection | 8 | emerge-dc3-via-a-interject-v1 | A→판사 | `{...}` |
| dc-3 npc_interjection | 9 | emerge-dc3-via-a-interject-judge-react-v1 | 판사→A | `{...}` |
| dc-3 npc_interjection | 10 | emerge-dc3-via-a-interject-a-response-v1 | A→판사 | `{...}` |
| dc-3 npc_interjection | 11 | emerge-dc3-via-a-interject-judge-decree-v1 | 판사→전체 | `{...}` |
| **dc-3** judge_auto_mention | 12 | emerge-dc3-via-judge-auto-decree-v1 | 판사→B | `{...}` |
| dc-3 judge_auto_mention | 13 | emerge-dc3-via-judge-auto-b-respond-v1 | B→판사 | `{...}` |
| **e-7** cascade_from_card | 14 | emerge-e7-via-cascade-judge-mention-v1 | 판사→전체 | `{...}` (priorCard:dc-3) |
| e-7 cascade_from_card | 15 | emerge-e7-via-cascade-b-response-v1 | B→판사 | `{...}` |
| e-7 cascade_from_card | 16 | emerge-e7-via-cascade-judge-decree-v1 | 판사→전체 | `{...}` |
| **e-7** combination_result | 17 | emerge-e7-via-combo-judge-analyze-v1 | 판사→전체 | `{...}` |
| e-7 combination_result | 18 | emerge-e7-via-combo-b-acknowledge-v1 | B→판사 | `{...}` |
| e-7 combination_result | 19 | emerge-e7-via-combo-judge-decree-v1 | 판사→전체 | `{...}` |
| **e-7** npc_interjection | 20 | emerge-e7-via-b-interject-v1 | B→판사 | `{...}` |
| e-7 npc_interjection | 21 | emerge-e7-via-b-interject-judge-react-v1 | 판사→B | `{...}` |
| e-7 npc_interjection | 22 | emerge-e7-via-b-interject-b-elaborate-v1 | B→판사 | `{...}` |
| e-7 npc_interjection | 23 | emerge-e7-via-b-interject-judge-decree-v1 | 판사→전체 | `{...}` |
| **e-7** judge_auto_mention | 24 | emerge-e7-via-judge-auto-decree-v1 | 판사→전체 | `{...}` |
| e-7 judge_auto_mention | 25 | emerge-e7-via-judge-auto-a-respond-v1 | A→판사 | `{...}` |

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역

- 판사: 격식 (`...십시오`, `...습니까`, `Your Honor`/`裁判官`/`审判官` 호명)
- 종래 spouse-01 톤 보존 — `Ms. Park` / `Mr. Lee Jun-ho` / `パク・ジヨンさん` / `イ・ジュノさん` / `朴智妍女士` / `李俊浩先生`

### 3.2. 파티 NPC 영역

- 박지연(A): 격앙·결단·후 시인. cascade에서는 차분, 끼어들기에서는 격앙
- 이준호(B): 본 batch에서는 **단호 톤** (위임장 진위 본인 단정)
- 호칭: `재판관님` / `判事様` / `Your Honor` / `审判官` 일관

### 3.3. cascade_from_card 신규 trigger의 다국어 보존 (핵심)

본 batch의 entry 5/6/7 (dc-3 cascade) + 14/15/16 (e-7 cascade)는 `cascade_from_card` 타입. 다국어 번역 시:

- `trigger:cascade_from_card` tag → 그대로 (번역 X)
- `priorCard:dc-cash-clue` (dc-3 cascade) / `priorCard:dc-3` (e-7 cascade) tag → 그대로
- text 본문의 이전 카드 reference는 카드명 일관 번역:

| KO | EN | JA | ZH-CN |
|---|---|---|---|
| `[정기 자금 이동의 흔적]` | `[Regular Movement of Funds]` | `[定期的な資金移動の痕跡]` | `[资金定期流动的痕迹]` |
| `[이준호의 비밀 개인 계좌]` | `[Mr. Lee Jun-ho's Hidden Personal Account]` | `[イ・ジュノの秘密の個人口座]` | `[李俊浩的秘密个人账户]` |

⚠ 카드명 baseline은 기존 ScriptedText의 dossierCard label 영역 (spouse-01.{lang}.json) 참조. 기존 번역과 충돌 X.

### 3.4. dynamics 차별성 보존

각 trigger마다 NPC 인지 상태가 다름:
- combination_result: 사용자 액션으로 시스템 deterministic 진입 — 판사 발견적 톤
- cascade_from_card: 이전 카드 결과의 자연 연속 — 판사 정리적 톤 (이전 카드 명시 인용)
- npc_interjection: 상대측 NPC 적극 개입 — 격앙·요청
- judge_auto_mention: 5턴 fallback — 판사 결정·종결

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.5. 진실 노출 정책

`design_spouse01_truth_disclosure_policy` 권위 준수.

- 본 batch surface 금지:
  - "형에게 현금 전달" / "형 빚" / "개인회생" (h-d3 S5 이후만)
  - "위임장 위조" 단정 — B 본인 단호 발화 영역에서는 "필적 차이" / "동의 없음" 표현 사용 OK
  - 구체 금액 — surface 가능하나 시점 신중

---

## §4. 작업 단계

1. worktree spawn (위 §0)
2. KO baseline 확인:
   ```
   git show main:src/data/scriptedText/spouse-01.json | grep -B2 -A40 "emerge-dc3\|emerge-e7"
   ```
3. 외국어 파일에 본 batch 25 entry 추가:
   - `src/data/scriptedText/spouse-01.en.json` channels.emergence_narrative.entries 배열에 추가
   - `src/data/scriptedText/spouse-01.ja.json` 동일
   - `src/data/scriptedText/spouse-01.zh-CN.json` 동일
4. 각 entry는 KO와 동일 구조 (id 동일, text 번역, behaviorHint 번역, tags 그대로, sourceRefs 그대로)

### tag 처리

- tag values는 번역 X (`channel:emergence_narrative`, `speaker:a`, `trigger:cascade_from_card`, `priorCard:dc-cash-clue` 등 그대로)
- `callTerm:박지연_씨` 같은 한국어 token도 그대로 유지 (시스템 lookup용)
- `judgeAddress:재판관님` 도 그대로 유지
- `comboRecipeId:combine-4` (dc-3 combination) 도 그대로 유지

---

## §5. 검증

```
git status --short  # 외국어 3 file만 modified 기대
npx tsc --noEmit
npm run build  # tsc -b --force + vite build — 사후 통합 시점 build 회귀 회피
npm run -s qa:fast 2>&1 | tail -20
```

bundle merge 검증:
```
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.ja.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.zh-CN.json','utf8'))"
```

---

## §6. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync Cycle 2 Batch 1 — dc-3 + e-7 emergence narrative (25 variants × 3 lang)"
git push -u origin codex/spouse01-cycle2-batch1-multilang
```

main session이 fast-forward merge 처리.

---

## §7. 자매 batch (참고)

| Batch | branch | entry | 의존성 |
|---|---|---|---|
| 1 (본) | `codex/spouse01-cycle2-batch1-multilang` | 25 | 없음 |
| 2 (dc-7 + e-6) | `codex/spouse01-cycle2-batch2-multilang` | 25 | 없음 |
| 3 (dc-4 + w-3) | `codex/spouse01-cycle2-batch3-multilang` | 25 | 없음 |
| 4 (h-d3 + w-2) | `codex/spouse01-cycle2-batch4-multilang` | 22 | 없음 |

4 batch ScriptedText entry id 영역 겹침 X → 병렬 worktree 안전.

# Codex Thread — friend-01 Cycle 7 Batch 1 (dc-1 단톡방 글의 근거) 다국어 sync

작성일: 2026-05-24 (skeleton — entry table은 5단계 검토 후 fill-in)
주체: Codex worktree (baseline anchor 영역)
범위: 신규 channel `emergence_narrative` 의 Batch 1 entry — dc-1 (13 variants) × 3 lang = **39 entry sync** + dc-1 label 다국어 일괄 변경

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/friend01-cycle7-batch1-multilang ../ws-friend01-cycle7-batch1-multilang main` (main HEAD 기준 — 5단계 검토 후 friend-01-cycle merge된 시점) |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean |
| PowerShell 회피 | Write/Edit tool로만 변경 (인코딩 mojibake 회피) |
| 산출 | branch `codex/friend01-cycle7-batch1-multilang` push |

---

## §1. 작업 배경

Core System narrative wrapper layer Cycle 7 (friend-01 Line A+B) 첫 batch.

- KO commit: main branch에 13 entry (`src/data/scriptedText/friend-01.json` channels.emergence_narrative.entries) 적용 완료 + dc-1 label KO 변경 완료 (Cycle 7 사전 commit `081e8dbc`)
- 본 작업: EN/JA/ZH-CN sync 13 entry × 3 lang = 39 entry 작성 + dc-1 label 다국어 일괄 변경 + dossier UI label/cases generated 다국어 영역 일괄 변경
- Brief: `docs/design/core-narrative-cycle7-friend01-lineAB-20260524/batch1-dc1/` 정독 권장 (특히 gpt-pro-brief.md + friend01-tone-samples.md)

### Batch 1 처리 emergence

| 영역 | id | 자연 명칭 (변경 후) | trigger 수 | KO entry |
|---|---|---|---|---|
| 단서 (dossier) | `dc-1` | **단톡방 글의 근거** (label 변경) | 4 (combo / npc / outburst / fallback) | 13 |

⚠ **dc-1 label 다국어 변경 영역 (본 batch 핵심 사이드 작업)**:
- KO Authority: 이미 변경 완료 (Cycle 7 사전 commit `081e8dbc`)
- 다국어 영역 변경 필요:
  - `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` dossierCards 영역
  - `src/data/scriptedText/friend-01.{en,ja,zh-CN}.json` dossier channel 영역 (dc-1 reference 부분)

⚠ Batch 1만 dc-1 label 변경 담당 (Batch 2~4는 emergence_narrative entry만 작업, label 단일 위치이므로 충돌 X).

---

## §2. KO baseline (main HEAD)

⚠ **5단계 검토 후 fill-in 영역** — GPT Pro 응답 도착 + 메인 세션 검토 + 6단계 KO apply commit 후 본 §2 entry table 채움.

### 영향 파일 (예상)

```
src/data/scriptedText/friend-01.json  channels.emergence_narrative  (신규 channel)
```

`emergence_narrative` 채널은 friend-01에서 신규 생성. 본 batch는 13 entry 추가.

### 13 entry 구조 (skeleton — 6단계 KO apply 후 fill-in)

| Trigger | # | ID | speaker→listener | 핵심 KO (1줄 요약) |
|---|---|---|---|---|
| **dc-1** combination_result | 1 | emerge-dc1-via-combo-judge-query-v1 | 판사→A | (fill-in 대기) |
| dc-1 combination_result | 2 | emerge-dc1-via-combo-a-response-v1 | A→판사 | (fill-in 대기) |
| dc-1 combination_result | 3 | emerge-dc1-via-combo-b-react-v1 | B→판사 | (fill-in 대기) |
| dc-1 combination_result | 4 | emerge-dc1-via-combo-judge-decree-v1 | 판사→전체 | (fill-in 대기) |
| **dc-1** npc_interjection | 5 | emerge-dc1-via-npc-b-interject-v1 | B→A | (fill-in 대기) |
| dc-1 npc_interjection | 6 | emerge-dc1-via-npc-judge-query-v1 | 판사→A | (fill-in 대기) |
| dc-1 npc_interjection | 7 | emerge-dc1-via-npc-judge-decree-v1 | 판사→전체 | (fill-in 대기) |
| **dc-1** emotional_outburst | 8 | emerge-dc1-via-outburst-a-confess-v1 | A→판사 | (fill-in 대기) |
| dc-1 emotional_outburst | 9 | emerge-dc1-via-outburst-judge-catch-v1 | 판사→A | (fill-in 대기) |
| dc-1 emotional_outburst | 10 | emerge-dc1-via-outburst-judge-decree-v1 | 판사→전체 | (fill-in 대기) |
| **dc-1** judge_auto_mention | 11 | emerge-dc1-via-fallback-judge-query-v1 | 판사→A | (fill-in 대기) |
| dc-1 judge_auto_mention | 12 | emerge-dc1-via-fallback-a-response-v1 | A→판사 | (fill-in 대기) |
| dc-1 judge_auto_mention | 13 | emerge-dc1-via-fallback-judge-decree-v1 | 판사→전체 | (fill-in 대기) |

⚠ 위 ID는 gpt-pro-brief.md §2 명세 기준 예상. GPT Pro 실제 응답에 따라 일부 변동 가능.

---

## §3. 다국어 번역 원칙

### 3.1. 판사 영역

- 판사: 격식 (`...십시오`, `...습니까`, `Your Honor`/`裁判官`/`审判官` 호명)
- friend-01 톤 보존 — friend-01.{en,ja,zh-CN}.json 기존 judge_question / judge_witness_summon / judge_evidence_combo 채널 톤 참조
- 캐릭터 호칭: `Ms. Song Da-eun` / `Mr.+Ms. Choi Su-min` / `ソン・ダウン氏` / `チェ・スミン氏` / `宋多恩女士` / `崔秀敏女士` (기존 friend-01 다국어 영역과 일관)

### 3.2. 파티 NPC 영역

- 송다은 (A, claimant): `premature_summary` archetype — 결론 먼저 + 부연. 단정 frame → 부분 시인 → 동요 (lieState 흔들림 시)
- 최수민 (B, defendant): `affect_flattening` archetype — 평평·짧음·사실만. 격앙도 단정형 짧고 평평.
- 호칭: A→B = "수민이/수민 씨", B→A = "다은아/다은 씨". friend-01.{en,ja,zh-CN}.json 기존 영역 일관

### 3.3. **재판관 어법 — 감정·가치 판단 회피 (Cycle 7 신규 정책)**

권위: `feedback_judge_dispassionate_action_focused`

| 영역 | ✗ 회피 (감정·가치 판단) | ✓ 권장 (사실·행위) |
|---|---|---|
| KO | "선을 넘다" / "흐름" / "낙인" | "먼저 연락" / "정황" / "선후관계" |
| EN | "crossed the line" / "trend" / "stigma" | "made first contact" / "circumstance" / "sequence of events" |
| JA | "一線を越えた" / "流れ" / "烙印" | "先に連絡した" / "経緯" / "前後関係" |
| ZH-CN | "越界" / "趋势" / "污名" | "率先联系" / "情况" / "前后关系" |

dossier label 인용은 OK (예: `[단톡방 글의 근거]` / `[Grounds for the Group Chat Post]`), 단 재판관이 emotional/value 평가를 직접 발화 X.

### 3.4. **dc-1 label 다국어 변경 (본 batch 사이드 작업, 필수)**

`dossierCards[id='dc-1'].label` 변경:

| 영역 | KO (변경 완료) | EN | JA | ZH-CN |
|---|---|---|---|---|
| 변경 전 | 확인 없이 매도한 건 누구인가 | Who maligned her without checking? / Who Condemned Without Checking? | 確認せず決めつけたのは誰か | 是谁未经确认就定罪 |
| 변경 후 | **단톡방 글의 근거** | (Codex 결정 + 메인 세션 검수) | (Codex 결정 + 메인 세션 검수) | (Codex 결정 + 메인 세션 검수) |

권장 baseline (Codex 검수 후 결정):
- EN: `Grounds for the Group Chat Post`
- JA: `グループチャット投稿の根拠`
- ZH-CN: `群聊帖子的依据`

변경 영역 (4 file × 2 위치 = 8개 변경):
1. `src/data/cases/generated/friend-01.en.json` (combinationLab outputs + dossierCards 영역)
2. `src/data/cases/generated/friend-01.ja.json` (동일)
3. `src/data/cases/generated/friend-01.zh-CN.json` (동일)
4. `src/data/scriptedText/friend-01.{en,ja,zh-CN}.json` 의 dossier channel에서 dc-1 entries (단서명 reference 포함 영역)

⚠ ScriptedText `dossier` channel은 단서 정식 등재 narrative 영역. dc-1 reference 본문 등장 시 모두 새 label로 통일.

### 3.5. `npc_interjection`/`emotional_outburst`/`judge_auto_mention` trigger의 다국어 보존

본 batch는 cascade_from_card 없음 (dc-1은 cascade 영역이 아닌 시작점). 4 trigger 모두 standard:
- `trigger:combination_result` / `npc_interjection` / `emotional_outburst` / `judge_auto_mention` tag → 그대로 (번역 X)
- `emerge:dc-1` tag → 그대로

### 3.6. dynamics 차별성 보존

각 trigger마다 발화 분위기 다름:
- combination_result: 사용자 액션 결과 → 판사 발견적·중립
- npc_interjection: B(최수민) 적극 개입 ("다은아 제대로 확인은 하고 말한 거야?") → 친구 호칭 어조 보존
- emotional_outburst: A(송다은) 감정 자백 ("솔직히 감정이 앞서서…") → 격앙·자기 통제 실패
- judge_auto_mention: N턴 fallback → 판사 결정·진행적

각 NPC/판사 발화 entry는 위 dynamics를 다국어에서 손실 X.

### 3.7. 진실 노출 정책

`design_friend01_truth_disclosure_policy` 권위 준수.

본 batch (dc-1 영역) 절대 surface 금지:
- "아버지 사기" / "투자 명목 사기" / "미상환" (d-4 S3 이상 이후만, Line C / Cycle 8 영역)
- "예비신랑이 먼저" / "선 넘는 메시지" / "최수민의 거절" (dc-2 부상 후만, 본 batch는 dc-1 영역이므로 등장 X)

### 3.8. "사건 카드" → "단서" 명칭 (4 lang)

`feedback_dossier_card_renamed_to_clue` 권위. 본 batch 영역에서 "case card" / "dossier card" / "事件カード" / "案件卡" 등장 시 모두 변경:
- KO: 사건 카드 → 단서
- EN: case card / dossier card → clue
- JA: 事件カード → 手がかり
- ZH-CN: 案件卡 → 线索

evidence(증거/evidence/証拠/证据) 영역과 layer 구분 절대 유지.

---

## §4. 작업 단계

1. worktree spawn (위 §0)
2. KO baseline 확인:
   ```
   git show main:src/data/scriptedText/friend-01.json | grep -B2 -A40 "emerge-dc1"
   git show main:src/data/coreCases/friend-01.case.ts | grep -B1 -A1 "단톡방 글의 근거"
   ```
3. 외국어 파일에 본 batch 13 entry 추가:
   - `src/data/scriptedText/friend-01.en.json` channels.emergence_narrative.entries 배열에 추가 (channel 영역 없으면 신규 생성)
   - `src/data/scriptedText/friend-01.ja.json` 동일
   - `src/data/scriptedText/friend-01.zh-CN.json` 동일
4. dc-1 label 다국어 변경 (cases/generated 다국어 file + ScriptedText dossier channel)
5. 각 entry는 KO와 동일 구조 (id 동일, text 번역, behaviorHint 번역, tags 그대로, sourceRefs 그대로)

### tag 처리

- tag values는 번역 X (`channel:emergence_narrative`, `speaker:a`, `trigger:combination_result`, `emerge:dc-1` 등 그대로)
- `callTerm:송다은_씨` 같은 한국어 token 등장 시 그대로 유지 (시스템 lookup용)
- `judgeAddress:재판관님` 도 그대로 유지

---

## §5. 검증

```
git status --short  # 외국어 3 + cases/generated 다국어 3 + ScriptedText dossier 영역만 modified 기대
npx tsc --noEmit
npm run build  # tsc -b --force + vite build — 사후 통합 시점 build 회귀 회피
npm run -s qa:fast 2>&1 | tail -20
```

bundle merge 검증:
```
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/friend-01.en.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/friend-01.ja.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('src/data/scriptedText/friend-01.zh-CN.json','utf8'))"
```

---

## §6. 산출

```
git add src/data/scriptedText/friend-01.en.json \
        src/data/scriptedText/friend-01.ja.json \
        src/data/scriptedText/friend-01.zh-CN.json \
        src/data/cases/generated/friend-01.en.json \
        src/data/cases/generated/friend-01.ja.json \
        src/data/cases/generated/friend-01.zh-CN.json
git commit -m "i18n(friend-01): sync Cycle 7 Batch 1 — dc-1 emergence narrative + label 변경 (13 variants × 3 lang)"
git push -u origin codex/friend01-cycle7-batch1-multilang
```

main session이 fast-forward merge 또는 JSON union script 처리.

---

## §7. 자매 batch (참고)

| Batch | branch | entry | dc-1 label 변경 | 의존성 |
|---|---|---|---|---|
| 1 (본) | `codex/friend01-cycle7-batch1-multilang` | 13 | **본 batch 담당** | 없음 |
| 2 (dc-2 + e-4) | `codex/friend01-cycle7-batch2-multilang` | 25 | X | 없음 |
| 3 (w-1) | `codex/friend01-cycle7-batch3-multilang` | 13 | X | 없음 |
| 4 (w-2) | `codex/friend01-cycle7-batch4-multilang` | 13 | X | 없음 |

4 batch ScriptedText entry id 영역 겹침 X → 병렬 worktree 안전.

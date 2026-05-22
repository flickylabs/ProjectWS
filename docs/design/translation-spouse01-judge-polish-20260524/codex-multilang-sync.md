# Codex Thread — spouse-01 judge_evidence_combo polish 다국어 sync

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)
관련 정책: [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
관련 정책: [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
관련 정책: [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
관련 정책: [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add ../ws-spouse01-judge-polish-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-judge-polish-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `judge_evidence_combo` channel 영역 15 entries polish (commit on main: 본 PR 이전 commit). EN/JA/ZH-CN 동일 anchor 동기 필요.

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json                         ← EN sync
src/data/scriptedText/spouse-01.ja.json                         ← JA sync
src/data/scriptedText/spouse-01.zh-CN.json                      ← ZH-CN sync
```

### 1.2. 작업 영역 외

- KO file (`spouse-01.json`) — main에 이미 적용 완료
- 다른 channel (`interrogation` / `evidence_present` / `judge_question` / `dossier` 등) — 본 의뢰 외
- 다른 case (`family-01` / `friend-01`) — 본 의뢰 외

---

## §2. Polish anchor (15 entries)

각 variant의 KO 변경 anchor. EN/JA/ZH-CN 동일 ID 영역 동기.

### dc-2.b.q1 (9건)

| ID | KO 변경 후 |
|----|------------|
| judgecombo-dc-2-b-q1-soft-v2 | 이준호 씨, 같은 번호의 새벽 통화와 발신자 미상 문자 내용이 맞닿아 있습니다. 그 사정을 박지연 씨에게 끝내 말씀하지 못하신 까닭을 들려주시겠습니까. |
| judgecombo-dc-2-b-q1-soft-v5 | 이준호 씨, 통화기록과 발신자 미상 문자를 나란히 놓으면 외도보다 다른 부담이 더 크게 느껴집니다. 그게 무엇인지 말씀해 주시겠습니까. |
| judgecombo-dc-2-b-q1-mid-v1 | 이준호 씨, 새벽 통화와 발신자 미상 문자가 같은 사정을 가리킵니다. 갈등이 두려워 계속 숨겨 오신 사항을 이제 말씀하셔야 합니다. |
| judgecombo-dc-2-b-q1-mid-v2 | 이준호 씨, 통화 상대와 발신자 미상 문자가 겹칩니다. 더이상 단순 연락으로 치부하실 수 없습니다. |
| judgecombo-dc-2-b-q1-mid-v4 | 이준호 씨, 발신자 미상 문자와 통화기록 앞에서 외도는 아니었다는 말만으로는 부족해 보입니다. 그 너머의 사정을 왜 끝까지 숨기셨습니까. |
| judgecombo-dc-2-b-q1-mid-v5 | 이준호 씨, 통화기록과 발신자 미상 문자는 숨긴 이유가 단순 연락 이상이었음을 의심하게 합니다. 두려웠다는 말만으로 설명을 대신하실 수는 없습니다. |
| judgecombo-dc-2-b-q1-hard-v1 | 이준호 씨, 통화기록과 발신자 미상 문자가 숨긴 사정을 직접 가리키고 있습니다. 그 상황에 대해 무엇을 숨기신 것인지 지금 답해 주십시오. |
| judgecombo-dc-2-b-q1-hard-v3 | 이준호 씨, 통화기록과 발신자 미상 문자 앞에서 그곳에 가신 것을 왜 끝까지 숨기셨는지도 밝히셔야 합니다. 바로 답해 주십시오. |
| judgecombo-dc-2-b-q1-hard-v5 | 이준호 씨, 발신자 미상 문자와 새벽 통화기록이 놓인 지금 두려웠다는 말만으로 은폐가 사라지지 않습니다. 무엇이 두려우셨던 것인지 지금 말씀해 주십시오. |

### dc-3.b.q1 (5건)

| ID | KO 변경 후 |
|----|------------|
| judgecombo-dc-3-b-q1-soft-v1 | 이준호 씨, 발신자 미상 문자와 개인 계좌 출금 내역을 함께 보겠습니다. 별도 사용처로 큰돈을 옮기신 것을 박지연 씨에게 왜 끝까지 알리지 못하셨는지 들려주시겠습니까. |
| judgecombo-dc-3-b-q1-soft-v4 | 이준호 씨, 문자에는 다른 사정이 있으셨다면, 그것을 왜 박지연 씨에게 알리지 못하셨는지 들려주시겠습니까. |
| judgecombo-dc-3-b-q1-soft-v5 | 이준호 씨, 발신자 미상 문자와 출금 내역을 보면 따로 급한 사정이 있으셨다 해도 큰돈을 따로 움직이신 것은 설명이 필요합니다. 그 경계를 차분히 말씀해 주십시오. |
| judgecombo-dc-3-b-q1-mid-v2 | 이준호 씨, 개인 계좌에서 현금이 빠진 사실은 또다른 문제가 됩니다. 개인적인 사용이라는 말로 덮으실 수 없습니다. |
| judgecombo-dc-3-b-q1-mid-v3 | 이준호 씨, 다른 사정이 있으신 것이라면 더욱 그 돈의 성격을 명확히 말씀하셔야 합니다. 공동 적금 의심과 섞이지 않게 답해 주십시오. |

### dc-4.a.q1 (1건)

| ID | KO 변경 후 |
|----|------------|
| judgecombo-dc-4-a-q1-hard-v2 | 박지연 씨, 투자방 텔레그램과 송금 기록은 이준호 씨에게 확인을 받기 전에 본인이 먼저 움직이셨음을 보여줍니다. 그 판단을 인정하고 말씀해 주십시오. |

---

## §3. 다국어 번역 원칙

### 3.1. 번역체 회피 (★ 핵심)

KO 변경의 핵심 의도 = **번역체 배제 + 자연 한국어 톤**. EN/JA/ZH-CN도 동일 원칙:
- 직역 어순 배제
- 추상명사 남발 X
- 원어 (영어/일본어/중국어) 자연 발화 톤
- "보인다 (it seems)" / "ように思われる" / "似乎" 등 추상 추측 부사는 원본 의도가 추측일 때만 사용
- 게임 톤 = 법정 재판관 발화. 격식 + 자연 + 직접 추궁 조합

### 3.2. 의미 보존 원칙

KO 변경의 의미 영역 — **불필요한 의미 추가 X**:
- KO에 없는 새 사실/단서 X
- KO에 없는 새 의도/평가 X
- 진실 누설 키워드 (시댁/가족/집안/형/회생/형사) 추가 X (KO도 회피한 영역)
- 모호 referent ("그 사정 / 그것") 영역 — 원어로 자연하게 명사구 보강 OK (예: EN "the matter / the situation")

### 3.3. 진실 누설 정책 (★ 절대 준수)

[design_spouse01_truth_disclosure_policy.md](../../../memory/design_spouse01_truth_disclosure_policy.md) 참조.

- 진실 노출 전 등장 금지 키워드 (EN): "in-law", "family conflict", "older brother", "personal rehab"
- 진실 노출 전 등장 금지 키워드 (JA): "婚家", "家族", "兄", "個人再生"
- 진실 노출 전 등장 금지 키워드 (ZH-CN): "婆家", "家族", "哥哥", "个人偿债"

본 polish는 dc-2 / dc-3 dossier 발견 후 단계지만, judge_evidence_combo channel은 외도 evidence 추궁이라 위 키워드 직접 link 회피.

### 3.4. truth-leak detector 검증

번역 후:
```
node scripts/detect-truth-leak.cjs --strict
```
모든 lang findings=0 PASS 필수.

---

## §4. 작업 순서

### Step 1: KO anchor 정독

위 §2 표 + main commit (이번 commit hash) git show로 KO 원본 vs 변경 diff 확인. 각 variant의 의도 영역 파악:
- 진실 누설 회피 (dc-2 시댁 키워드 제거)
- 자연 한국어 polish (사용자 patch 패턴)
- 데이터 매핑 정합 (dc-3 frame 분리 / dc-4 timeline 정합)

### Step 2: EN/JA/ZH-CN 동기

각 lang sidecar에서 동일 variant id 영역 검색 + KO 변경 의미에 맞게 재번역. **번역체 회피 + 의미 보존 + 진실 누설 회피** 3원칙.

### Step 3: detect-truth-leak --strict 검증

`node scripts/detect-truth-leak.cjs --strict` PASS 확인.

### Step 4: tsc / qa:fast 검증

`npx tsc -b --force` silent + `npm run qa:fast` P0=0.

### Step 5: commit + push

```
git add src/data/scriptedText/spouse-01.en.json
git add src/data/scriptedText/spouse-01.ja.json
git add src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): judge_evidence_combo 15 entries EN/JA/ZH-CN sync"
git push origin codex/spouse01-judge-polish-sync
```

---

## §5. 회피 영역

- **PowerShell file swap 절대 금지** (mojibake 사고 영역). Write/Edit tool 사용
- **새 의미 추가 X** — KO 원본에 없는 단어/암시/평가 추가 시 의도 변질
- **anchor variant 외 영역 변경 X** — 본 sync는 15 entries 한정. 다른 영역은 건드리지 X
- **detect-truth-leak findings 0 미달 시 commit X** — 진실 누설 발견 시 변경 재검토

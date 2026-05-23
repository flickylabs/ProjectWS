# Codex Thread — spouse-01 judge_evidence_combo 잔존 45 entries 다국어 sync

작성일: 2026-05-25
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)
관련 정책: [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
관련 정책: [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)
관련 정책: [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
관련 정책: [design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| **worktree spawn** | `git worktree add -b codex/spouse01-judge-polish-residual-sync ../ws-spouse01-judge-polish-residual-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-judge-polish-residual-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `judge_evidence_combo` channel 잔존 영역 **45 entries** polish (commit on main: `43be19a6`). EN/JA/ZH-CN 동일 anchor 동기.

3 batch × 15 entries × 3 tone (soft 5 / mid 5 / hard 5) = 45 entries.

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json                         ← EN sync
src/data/scriptedText/spouse-01.ja.json                         ← JA sync
src/data/scriptedText/spouse-01.zh-CN.json                      ← ZH-CN sync
```

### 1.2. 작업 영역 외

- KO file (`spouse-01.json`) — main에 이미 적용 완료 (commit 43be19a6)
- 다른 channel (`interrogation` / `evidence_present` / `judge_question` / `dossier` 등) — 본 의뢰 외
- 다른 case (`family-01` / `friend-01`) — 본 의뢰 외
- 직전 21건 sync (Codex worktree `D:/ws-spouse01-judge-polish-sync` 진행 중) — 별도 영역

---

## §2. Polish anchor (45 entries)

각 variant의 KO 변경 anchor. EN/JA/ZH-CN 동일 ID 영역 동기.

### Batch 1 — dc-1.b.q1 (15건)

| ID | KO 변경 후 |
|----|------------|
| judgecombo-dc-1-b-q1-soft-v1 | 이준호 씨, GPS 좌표와 발신자 미상 문자를 함께 보겠습니다. 두 자료의 시간대와 장소가 겹치는 만큼, 그 오피스텔 안에 누가 있었는지 들려주시겠습니까. |
| judgecombo-dc-1-b-q1-soft-v2 | 이준호 씨, GPS에 남은 정차 주소와 발신자 미상 문자가 같은 장소에서 겹칩니다. 그날 그곳에서 누구를 챙기고 계셨습니까. |
| judgecombo-dc-1-b-q1-soft-v3 | 이준호 씨, 방문 기록에는 오피스텔이, 발신자 미상 문자에는 다른 관련자의 생활이 남아 있습니다. 두 자료가 겹치는 부분을 말씀해 주시겠습니까. |
| judgecombo-dc-1-b-q1-soft-v4 | 이준호 씨, 좌표만 보면 외도 의심으로 이어지지만, 문자 내용까지 보면 다른 사람의 존재도 드러납니다. 그 사람이 누구였는지 들려주십시오. |
| judgecombo-dc-1-b-q1-soft-v5 | 이준호 씨, 오피스텔 출입 기록과 발신자 미상 문자를 함께 보면 장소와 사람이 좁혀집니다. 당시 정황을 말씀해 주십시오. |
| judgecombo-dc-1-b-q1-mid-v1 | 이준호 씨, GPS 좌표와 발신자 미상 문자의 시간대가 겹칩니다. 더는 밝히지 않은 사정을 빼고 오피스텔 방문만 설명하실 수 없습니다. |
| judgecombo-dc-1-b-q1-mid-v2 | 이준호 씨, 차량이 간 곳과 문자에 담긴 개인적인 일정이 같은 생활권에서 겹칩니다. 그곳에 있던 사람이 누구인지 더 미뤄둘 수 없습니다. |
| judgecombo-dc-1-b-q1-mid-v3 | 이준호 씨, 오피스텔 기록만 보면 외도 의심이 생기지만, 발신자 미상 문자까지 보면 누군가를 돌본 흔적도 드러납니다. 두 가지 내용을 어떻게 연결해야 하는지 말씀해 주십시오. |
| judgecombo-dc-1-b-q1-mid-v4 | 이준호 씨, GPS에 남은 주소와 발신자 미상 문자의 시간대가 겹치는 만큼 단순한 방문으로만 치부하실 수 없습니다. 누구를 위해 간 것인지 답해 주십시오. |
| judgecombo-dc-1-b-q1-mid-v5 | 이준호 씨, GPS 기록과 발신자 미상 문자에는 오피스텔에 숨겨 둔 생활의 흔적이 남아 있습니다. 그 생활이 누구의 것이었는지 밝혀야 합니다. |
| judgecombo-dc-1-b-q1-hard-v1 | 이준호 씨, GPS와 발신자 미상 문자를 함께 보면 한 가지 사실이 남습니다. 그 오피스텔에 누가 있었는지 지금 답하십시오. |
| judgecombo-dc-1-b-q1-hard-v2 | 이준호 씨, 좌표와 문자 내용을 함께 보면 누군가가 특정됩니다. 외도였는지, 다른 사정이 있었는지 지금 말씀해 주십시오. |
| judgecombo-dc-1-b-q1-hard-v3 | 이준호 씨, GPS 좌표와 발신자 미상 문자까지 나온 이상 장소만 말하고 사람을 빼고 넘어갈 수는 없습니다. 그 자리에 누가 있었는지 밝히십시오. |
| judgecombo-dc-1-b-q1-hard-v4 | 이준호 씨, 오피스텔 기록과 발신자 미상 문자가 함께 확인됐습니다. 숨기고 있던 사람이 누구인지 말씀해 주십시오. |
| judgecombo-dc-1-b-q1-hard-v5 | 이준호 씨, 두 자료는 같은 밤의 같은 장소로 이어집니다. 그 안에 있었던 일을 지금 인정해 주십시오. |

### Batch 2 — dc-3.b.q2 (15건) ★ 진실 누설 회피 4 entries (soft-v4 / mid-v1 / mid-v5 / hard-v3)

| ID | KO 변경 후 |
|----|------------|
| judgecombo-dc-3-b-q2-soft-v1 | 이준호 씨, 발신자 미상 문자와 출금 내역을 함께 보면 숨긴 자금 흐름이 드러납니다. 박지연 씨를 배제한 책임을 어떻게 보시는지 말씀해 주시겠습니까. |
| judgecombo-dc-3-b-q2-soft-v2 | 이준호 씨, 현금 출금이 발신자 미상 문자와 맞물린 사안이라면 선의였다고 볼 여지는 있습니다. 그래도 박지연 씨에게 알리지 않은 이유를 말씀해 주십시오. |
| judgecombo-dc-3-b-q2-soft-v3 | 이준호 씨, 발신자 미상 문자와 출금 내역으로 숨긴 자금 흐름이 확인된다 해도, 부부 사이에서 큰돈을 따로 움직인 문제는 남습니다. 그 기준을 어디에 두셨습니까. |
| **judgecombo-dc-3-b-q2-soft-v4** ★ | 이준호 씨, 문자가 시사하는 다른 사정과 출금 기록이 맞물립니다. 그때 박지연 씨와 상의해야 한다는 생각은 없으셨습니까. |
| judgecombo-dc-3-b-q2-soft-v5 | 이준호 씨, 발신자 미상 문자와 현금 출금이 어려운 사정을 돕기 위한 것이었다면, 왜 숨길 수밖에 없었는지 말씀해 주십시오. |
| **judgecombo-dc-3-b-q2-mid-v1** ★ | 이준호 씨, 발신자 미상 문자와 출금 내역상 별도 사용처를 위한 자금 흐름은 확인됩니다. 그러나 박지연 씨를 배제한 선택까지 설명되지는 않습니다. 그 부분을 답해 주십시오. |
| judgecombo-dc-3-b-q2-mid-v2 | 이준호 씨, 문자와 출금 기록으로 자금 처리 과정은 확인됩니다. 그렇다면 왜 혼자 처리하셨는지 답해 주십시오. |
| judgecombo-dc-3-b-q2-mid-v3 | 이준호 씨, 발신자 미상 문자와 출금 내역이 있는 이상 선의였다는 말만으로는 권한 문제를 덮을 수 없습니다. 박지연 씨에게 알리지 않은 이유를 밝히십시오. |
| judgecombo-dc-3-b-q2-mid-v4 | 이준호 씨, 발신자 미상 문자와 출금 기록의 사실관계와 별개로, 부부 사이의 신뢰를 깬 일은 또다른 문제입니다. 그 점을 고려해 말씀해 주십시오. |
| **judgecombo-dc-3-b-q2-mid-v5** ★ | 이준호 씨, 발신자 미상 문자와 출금 내역상 자금이 별도 사용처로 이어진 정황이 확인됩니다. 숨긴 의도도 그만큼 더 선명해졌습니다. 책임을 피해 가지 마십시오. |
| judgecombo-dc-3-b-q2-hard-v1 | 이준호 씨, 발신자 미상 문자와 출금 내역에 숨긴 사정이 있었다 해도, 박지연 씨를 배제한 책임은 사라지지 않습니다. 왜 혼자 결정하셨는지 답하십시오. |
| judgecombo-dc-3-b-q2-hard-v2 | 이준호 씨, 발신자 미상 문자와 출금 내역으로 본인이 결정하고 움직인 사실은 확인됩니다. 선의와 절차 위반은 분리해 인정하십시오. |
| **judgecombo-dc-3-b-q2-hard-v3** ★ | 이준호 씨, 발신자 미상 문자와 개인 출금이 있는 이상 배우자 몰래 큰돈을 움직인 사실을 더는 다른 사정이라는 말만으로 덮을 수 없습니다. 본인 판단을 밝히십시오. |
| judgecombo-dc-3-b-q2-hard-v4 | 이준호 씨, 발신자 미상 문자와 출금 내역이 확인된 이상, 그 일을 돕겠다는 이유로 부부 사이의 동의를 건너뛴 부분을 설명하십시오. |
| judgecombo-dc-3-b-q2-hard-v5 | 이준호 씨, 발신자 미상 문자와 출금 기록을 보면 본인이 알고 움직였다는 사실은 피하기 어렵습니다. 책임을 축소하지 말고 답하십시오. |

### Batch 3 — dc-4.a.q2 (15건)

| ID | KO 변경 후 |
|----|------------|
| judgecombo-dc-4-a-q2-soft-v1 | 박지연 씨, 투자방 텔레그램과 송금 기록에는 실제로 돈을 보낸 뒤 손실로 이어진 과정이 남아 있습니다. 그 사실을 숨기신 이유가 수치심이었는지 말씀해 주시겠습니까. |
| judgecombo-dc-4-a-q2-soft-v2 | 박지연 씨, 투자방 텔레그램과 송금 기록을 보면 송금이 손실로 이어졌습니다. 그때 어떤 마음 때문에 이준호 씨에게 말하지 못하셨는지 들려주시겠습니까. |
| judgecombo-dc-4-a-q2-soft-v3 | 박지연 씨, 투자방 대화가 계속 이어진 흔적과 송금 기록을 보면, 한동안 혼자 감당하려 하신 시간이 있었습니다. 왜 숨기셨습니까. |
| judgecombo-dc-4-a-q2-soft-v4 | 박지연 씨, 투자방 텔레그램과 송금 기록을 두고 손실을 인정하기 어려운 마음도, 피해자 위치에 서려는 마음도 있었습니까. |
| judgecombo-dc-4-a-q2-soft-v5 | 박지연 씨, 투자방 텔레그램과 송금 기록을 보며 수치심과 두려움 중 무엇이 더 컸는지 말씀해 주십시오. |
| judgecombo-dc-4-a-q2-mid-v1 | 박지연 씨, 투자방 텔레그램과 송금 기록에는 손실을 숨긴 시간까지 남아 있습니다. 수치심만으로 설명할 수는 없습니다. |
| judgecombo-dc-4-a-q2-mid-v2 | 박지연 씨, 송금 기록이 남아 있는데도 이준호 씨의 출금만 문제 삼으셨습니다. 본인의 손실은 왜 빼두셨습니까. |
| judgecombo-dc-4-a-q2-mid-v3 | 박지연 씨, 투자방 텔레그램과 송금 기록은 단순히 속은 정황이 아니라, 본인이 투자방에 들어가 송금하신 기록입니다. 그 선택을 말씀해 주셔야 합니다. |
| judgecombo-dc-4-a-q2-mid-v4 | 박지연 씨, 투자방 텔레그램과 송금 기록을 숨긴 채 상대 책임만 앞세우면 쟁점이 왜곡됩니다. 본인이 한 행동을 밝혀 주십시오. |
| judgecombo-dc-4-a-q2-mid-v5 | 박지연 씨, 투자방 텔레그램과 송금 기록에는 수치심 뒤에 숨긴 돈의 흐름이 남아 있습니다. 더는 감정만 말씀하실 수 없습니다. |
| judgecombo-dc-4-a-q2-hard-v1 | 박지연 씨, 투자방 텔레그램과 송금 기록에서 손실까지 이어진 본인 행동이 드러납니다. 왜 숨기셨는지 답하십시오. |
| judgecombo-dc-4-a-q2-hard-v2 | 박지연 씨, 송금 기록이 있는 이상 회피하실 수 없습니다. 투자방 손실을 감추고 이준호 씨 개인 계좌 출금만 문제 삼은 이유를 말씀해 주십시오. |
| judgecombo-dc-4-a-q2-hard-v3 | 박지연 씨, 투자방 텔레그램과 송금 기록이 있는 이상, 수치심이 있었다 해도 송금과 손실을 숨긴 사실은 남습니다. 그 경위를 밝히십시오. |
| judgecombo-dc-4-a-q2-hard-v4 | 박지연 씨, 투자방 텔레그램과 송금 기록이 있는 이상 피해를 막으려 했다는 말만으로는 버틸 수 없습니다. 본인이 잃은 돈을 말씀해 주십시오. |
| judgecombo-dc-4-a-q2-hard-v5 | 박지연 씨, 투자방 기록과 송금 내역은 하나로 이어져 있습니다. 숨긴 손실을 인정하고 답하십시오. |

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
- 모호 referent ("그 사정 / 그것") 영역 — 원어로 자연하게 명사구 보강 OK

### 3.3. 진실 누설 정책 (★ 절대 준수)

[design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md) 참조.

- 진실 노출 전 등장 금지 키워드 (EN): "in-law", "family conflict", "older brother", "personal rehab"
- 진실 노출 전 등장 금지 키워드 (JA): "婚家", "家族", "兄", "個人再生"
- 진실 노출 전 등장 금지 키워드 (ZH-CN): "婆家", "家族", "哥哥", "个人偿债"

특히 Batch 2의 4 entries (soft-v4 / mid-v1 / mid-v5 / hard-v3):
- KO 변환: "가족 쪽 사정" / "집안 사정" / "집안 쪽으로" → "다른 사정" / "별도 사용처" / "별도 사용처로"
- EN: "another matter" / "a separate destination" / "elsewhere" 등 모호 referent
- JA: "別の事情" / "別の用途" / "別の方へ" 등
- ZH-CN: "另有隐情" / "另有去处" / "另外的去向" 등

### 3.4. truth-leak detector 검증

번역 후:
```
node scripts/detect-truth-leak.cjs --strict
```
모든 lang findings=0 PASS 필수.

---

## §4. 작업 순서

### Step 1: KO anchor 정독

위 §2 표 + main commit `43be19a6` git show로 KO 원본 vs 변경 diff 확인. 각 batch의 의도 영역 파악:
- Batch 1: 외도 evidence 조합 자연화 (자연화 위주)
- Batch 2: B 개인 출금 책임 + 진실 누설 회피 4 entries
- Batch 3: A 박지연 송금 책임 자연화

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
git commit -m "i18n(spouse-01): judge_evidence_combo 잔존 45 entries EN/JA/ZH-CN sync (Phase 2a residual)"
git push origin codex/spouse01-judge-polish-residual-sync
```

---

## §5. 회피 영역

- **PowerShell file swap 절대 금지** (mojibake 사고 영역). Write/Edit tool 사용
- **새 의미 추가 X** — KO 원본에 없는 단어/암시/평가 추가 시 의도 변질
- **anchor variant 외 영역 변경 X** — 본 sync는 45 entries 한정. 다른 영역은 건드리지 X
- **detect-truth-leak findings 0 미달 시 commit X** — 진실 누설 발견 시 변경 재검토
- **직전 21건 sync worktree 영역과 충돌 X** — 본 worktree는 main HEAD 43be19a6 기준. 직전 sync는 별도 branch `codex/spouse01-judge-polish-sync` 진행 중

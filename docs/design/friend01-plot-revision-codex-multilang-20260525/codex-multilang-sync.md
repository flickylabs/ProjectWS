# Codex Thread — friend-01 e-5 reframe plot revision 다국어 sync (주 의뢰서)

작성일: 2026-05-25
주체: Codex worktree (baseline anchor 영역)
범위: CT 영역 plot revision 결과 (commit `b77a27c5`)의 EN/JA/ZH-CN 4언어 sync

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/friend01-plot-revision-multilang ../ws-friend01-plot-revision-multilang main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean + `git log -1 --oneline` = `b77a27c5` (또는 그 이상) |
| 파일 변경 도구 | Write/Edit tool 사용 (PowerShell 인코딩 mojibake 회피 — `feedback_powershell_encoding_utf8` 권위) |
| 산출 | branch `codex/friend01-plot-revision-multilang` push |

---

## §1. 작업 배경

friend-01 사건의 e-5 본질 reframe + 영향 영역 (d-3/w-2/dc-3/combine-3/combine-5/anchorTruth) 정합 reword. KO Authority + ScriptedText는 main에 이미 commit. 본 의뢰서는 외국어 영역 sync.

### CT 영역 commit 범위 (참고)

| commit | 영역 |
|---|---|
| `9572f4bb` | brief 폴더 |
| `394b9284` | Authority 변경 + derive sync (KO만) |
| `b77a27c5` | ScriptedText 155 KO entries reword |

본 의뢰서는 위 commit chain의 다국어 sync. ScriptedText KO baseline anchor = `b77a27c5`.

---

## §2. Authority 변경 영역 (KO baseline `394b9284`)

### 2.1 e-5 자료 자체 교체

**KO 영역 (이미 commit):**

| field | KO (변경 후) |
|---|---|
| `name` | 예비신랑 회사 단톡 떠벌림과 최수민의 9일간 차단 연락 |
| `surfaceName` | 떠벌림 흔적과 9일간 메시지 |
| `description` | 예비신랑 김태윤이 회사 동료 단톡방에서 "다은이 아버지가 결혼 자금 좀 도와달래"라며 토로한 캡처와, 그 시점 직후 최수민이 예비신랑에게 보낸 9일간의 차단 메시지 원본 |
| `surfaceDescription` | 예비신랑이 회사에서 떠벌린 단톡방 캡처와 최수민의 9일간 메시지 |
| `subjectParty` | `b` (변경 — 기존 `both`) |
| `partyContext.a.questionAngle` | 아버지가 예비신랑에게 결혼 자금을 시도했다는 사실을 알고 있었는지 |
| `partyContext.a.implication` | 인지·방관 여부 |
| `partyContext.b.questionAngle` | 9일간 연락의 실제 의도는 무엇이었는지 |
| `partyContext.b.implication` | 결혼 위기 차단 시도 + 과거 동일 패턴 인식 |
| `depthStages.*` | "결혼 자금 좀 도와달래" / "결혼 전에 한 번 얘기해요" 등 자료 인용 + 흐름 복원 |
| `trustStates.*` | 단톡 캡처 + 메시지 원본 frame |
| **`sensitiveSealTargets`** (신규) | labels: ["회사 동료 실명", "최수민 메시지의 사적 톤"], recommendedTiming + risks |

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` evidence id="e-5" 영역 전체

### 2.2 d-3 정합 reword

**KO 영역 (이미 commit):**

- `truthDescription`: "송다은 아버지가 예비신랑에게 돈 얘기를 꺼내고 있었고, 최수민은 과거에 같은 패턴을 당한 적이 있어 예비신랑에게 직접 막아보려 했다" (변경 — "경고하려" → "직접 막아보려")
- `verdictOptions.wrong/partial/truth/defer`: "꺼냈" → "시도했" / "경고" → "직접 막" 정합
- `truthStages.b.S2/S3/S5`: B가 "꺼냈" → "시도" / "경고" → "직접 막아" / "재빨리" → "혼자라도" 정합
- `truthStages.a.S5`: A 진실 완전 인정 영역도 "꺼냈" → "시도" 정합
- `progressionStages.S2.b.surfaceClaim`: 동일 정합

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` dispute id="d-3" 영역

### 2.3 w-2 testimony + 영역 확장

**KO 영역 (이미 commit):**

- `testimony.byDispute['d-3']` 신규 — canProve: ["예비신랑이 회사 동료 단톡방에서 '다은이 아버지가 결혼 자금 좀 도와달래' 토로한 시점", "그 토로 직후 본인이 최수민에게 알린 사실"] / cannotDisprove: ["실제 송다은 아버지가 예비신랑에게 보낸 직접 메시지는 본인이 본 영역 밖", "최수민과 예비신랑의 1:1 메시지 전체는 모름"]
- `unlockedByDossier`: ['dc-2','dc-3'] (변경 — 기존 ['dc-2']만)
- `relatedDisputes`: ['d-2','d-3'] (변경 — 기존 ['d-2']만)

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` witness id="w-2" 영역

### 2.4 dc-3 정합 reword

**KO 영역 (이미 commit):**

- `description`: "예비신랑이 떠벌린 흔적과 과거 송금 흐름을 붙여 아버지의 반복 시도 패턴을 확정하는 카드" (변경 — "현재 문자" → "떠벌린 흔적" / "반복 부탁 패턴" → "반복 시도 패턴")
- `noteText`: "송다은 아버지가 예비신랑에게 결혼 자금 명목으로 시도한 흐름이 과거 최수민에게 보낸 송금 부탁과 거의 동일하다" (변경)
- `successEffects[0]`: "송다은 아버지의 현재 시도가 과거와 연결됨" (변경 — "현재 접근" → "현재 시도")
- `challenges.b.q1.lockedHint`: "떠벌림 흔적과 과거 송금 흐름이 함께 열려야 보입니다" (변경 — "현재 문자" → "떠벌림 흔적")

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` dossierCard id="dc-3" 영역

### 2.5 combine-3 정합 reword

**KO 영역 (이미 commit):**

- `discoveryText` / `surfaceFallback`: "현재 문자" → "예비신랑이 떠벌린 흔적" 정합

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` recipe id="combine-3" 영역

### 2.6 combine-5 정합 reword (Line D 영역)

**KO 영역 (이미 commit):**

- `discoveryText`: "경고였다" → "결혼 위기 차단이었다" 정합

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` recipe id="combine-5" 영역

### 2.7 meta.anchorTruth 정합 reword

**KO 영역 (이미 commit):**

- `anchorTruth`: "송다은 아버지의 돈 접근 패턴을 결혼 직전 예비신랑에게 경고하려던 것이었다" → "송다은 아버지가 결혼 직전 예비신랑에게 돈 접근을 시도하는 흐름을 차단하려던 것이었다"

**다국어 sync 필요 file**: `src/data/cases/generated/friend-01.{en,ja,zh-CN}.json` meta.anchorTruth 영역

---

## §3. ScriptedText 변경 영역 (KO baseline `b77a27c5`, ~155 entries)

### 3.1 영향 file

```
src/data/scriptedText/friend-01.{en,ja,zh-CN}.json
```

### 3.2 Channel별 변경 entries

| Channel | KO entries (변경 완료) | 외국어 sync 필요 (× 3 lang) |
|---|---|---|
| `evidence_present` (e-5 영역) | 105 | 315 |
| `judge_evidence_combo` (combine-3 영역) | 30 | 90 |
| `evidence_present.stageQuestion` | 6 | 18 |
| `interrogation` (d-3 b/a 영역) | 14 | 42 |
| `aftermath` / `contradiction_pursuit` / `interjection` / `trust_action` / `judge_question` / `evidence_discovery` | ~10 | ~30 |
| **합계** | **~165** (CT 실제 155 + 본 표 추정 차이) | **~495** |

### 3.3 entry 식별 방법

KO 변경 영역은 `git diff 394b9284..b77a27c5 -- src/data/scriptedText/friend-01.json` 으로 확인.

각 entry ID를 외국어 file에서 정확히 찾아 text/behaviorHint 영역만 외국어로 sync. tags 영역은 KO와 동일 유지 (시스템 lookup).

### 3.4 변경 본질 (단어 정합 영역)

| KO (변경 후) | EN baseline | JA baseline | ZH-CN baseline |
|---|---|---|---|
| 아버지가 결혼 자금을 시도했다 | her father attempted to bring up wedding money | お父さんが結婚資金を試みた | 父亲尝试提出婚礼资金 |
| 다은이 아버지가 결혼 자금 좀 도와달래 | Daeun's father wants help with the wedding funds | ダウンのお父さんが結婚資金を少し手伝ってほしいと言ってる | 多恩的父亲想要婚礼资金的帮助 |
| 예비신랑이 단톡에서 토로한 얘기 | what the fiancé blurted out in the group chat | 婚約者がグループチャットで口走った話 | 未婚夫在群聊里脱口而出的话 |
| 직접 연락해 막으려 (했다) | tried to step in directly by reaching out | 直接連絡を取って止めようとした | 直接联系试图阻止 |
| 떠벌림 흔적 | traces of his blurting out | 口走った痕跡 | 脱口而出的痕迹 |

---

## §4. 호칭 영역 (변경 X, 검증만)

| referent | KO | EN | JA | ZH-CN |
|---|---|---|---|---|
| 송다은 (A) | 다은아 (B→A 친구), 다은 씨 (판사) | Daeun (B), Ms. Song (judge) | ダウンちゃん (B), ソン・ダウンさん (judge) | 多恩 (B), 宋小姐 (judge) |
| 최수민 (B) | 수민아 (A→B 친구), 수민 씨 (판사) | Sumin (A), Ms. Choi (judge) | スミンちゃん (A), チェ・スミンさん (judge) | 秀珉 (A), 崔小姐 (judge) |
| 송다은 아버지 | 다은이 아버지 / 아빠 | Daeun's father / her dad | ダウンのお父さん / お父さん | 多恩的父亲 / 父亲 |
| 예비신랑 김태윤 | 예비신랑 / 김태윤 씨 | the fiancé / Mr. Kim | 婚約者 / キム・テユンさん | 未婚夫 / 金先生 |
| 박준혁 (w-2) | 박준혁 씨 / 그분 (A) / 수민 선생님 (B) | Mr. Park / that person (A) / Ms. Choi (B) | パクさん / そちらの方 (A) / スミン先生 (B) | 朴先生 / 那位 (A) / 秀珉老师 (B) |

이미 base 영역. KO baseline 변경 영역에서 본 호칭 유지.

---

## §5. 검증 (Codex 작업 완료 시점)

작업 완료 후 다음 검증 모두 PASS:

```bash
npx tsc --noEmit
npm run build
npm run -s qa:fast      # RELEASE READY (static P0=0, route P0=0)
node scripts/detect-truth-leak.cjs --strict   # findings=0 (KO/EN/JA/ZH-CN 모두)
```

검증 PASS 후 commit + push:
```bash
git add src/data/cases/generated/friend-01.en.json src/data/cases/generated/friend-01.ja.json src/data/cases/generated/friend-01.zh-CN.json src/data/scriptedText/friend-01.en.json src/data/scriptedText/friend-01.ja.json src/data/scriptedText/friend-01.zh-CN.json
git commit -m "i18n(friend-01): e-5 reframe plot revision 다국어 sync — Authority + ScriptedText 4언어"
git push -u origin codex/friend01-plot-revision-multilang
```

---

## §6. 메인 Claude 세션 사후 통합

본 Codex sync 완료 → 메인 세션에서 8단계 사후 통합:
- `git fetch origin` + `git log origin/codex/friend01-plot-revision-multilang` 확인
- 변경 영역 정합 검증
- 통합 방식:
  - **fast-forward merge** — 본 의뢰서 영역만 single branch면 자연
  - **JSON union script** — Cycle 8b narrative wrapper 다국어 sync ([core-narrative-cycle8b-friend01-lineC-codex-multilang-20260525/](../core-narrative-cycle8b-friend01-lineC-codex-multilang-20260525/))와 같은 file의 같은 배열 영역에 변경 누적 시 union 필요
- 최종 검증 (tsc/build/qa:fast/truth-leak strict)
- main 통합

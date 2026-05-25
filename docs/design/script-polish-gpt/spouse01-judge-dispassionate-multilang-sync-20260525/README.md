# Codex Multilang Sync 의뢰서 — spouse-01 judge dispassionate sweep (2026-05-25)

## 0. 개요

본 의뢰서는 `spouse01-judge-dispassionate-sweep-20260525/` (KO baseline polish, commit `f227c800`)의 EN/JA/ZH-CN 다국어 sync 작업.

- **KO baseline commit**: `f227c800 polish(spouse-01): judge dispassionate KO sweep 적용 — 11 entries (GPT 10 + 사용자 patch 1)`
- **사용자 patch result**: `9b1c151a docs(spouse-01): judge dispassionate sweep GPT 시안 + 사용자 patch 보존`
- **영역**: judge_question (8) + judge_contradiction (3) = **11 entries × 3 lang = 33 외국어 entries**
- **권한**: Cycle 7 신규 정책 [[feedback_judge_dispassionate_action_focused]] 다국어 적용

## 1. 작업 단계 (Codex worktree)

### §0. 진입 조건

```
git worktree add -b codex/spouse01-judge-dispassionate-multilang ../ws-spouse01-judge-dispassionate-multilang main
git config --global --add safe.directory $worktree_path
```

작업 시작 전 `git status --short` clean.

### §1. KO baseline 확인

```bash
git show f227c800:src/data/scriptedText/spouse-01.json | grep -B2 -A4 "judgeq-d-1-fact_pursuit-2-v1"
```

본 KO commit이 변경한 11 entries의 ScriptedText id 목록 (sweep brief 02-violation-table.md 참조):

#### judge_question 채널 (8 entries)

| id | dispute / tone | KO 변경 본질 |
|---|---|---|
| `judgeq-d-1-fact_pursuit-2-v1` | d-1 / fact_pursuit | "그 통화" → "당시 통화" (지시대명사 → 시점 명시) |
| `judgeq-d-1-empathy_approach-1-v2` | d-1 / empathy_approach | "그 기록" → "통화 기록을 처음 확인했을 때" (구체화) |
| `judgeq-d-2-motive_search-4-v2` | d-2 / motive_search | "선을 넘게 했습니까" → "직접 추궁하는 행동으로 이어졌습니까" (평가 → 행위) |
| `judgeq-d-2-empathy_approach-1-v4` | d-2 / empathy_approach | "그 기록" → "출금 기록" (구체화) |
| `judgeq-h-d3-motive_search-4-v4` | h-d3 / motive_search | "선을 넘은 행동" → "해지 절차에 직접 손댄 행동" |
| `judgeq-h-d4-fact_pursuit-3-a-v1` | h-d4 / fact_pursuit | "그 자료가" → "해당 기록을 앞서 나온 설명과 별개의 자료로" |
| `judgeq-h-d4-fact_pursuit-3-b-v1` | h-d4 / fact_pursuit | "그 기록이" → "해당 검색 기록이" |
| `judgeq-h-d4-motive_search-1-a-v1` | h-d4 / motive_search | "그 자료들" → "해당 자료들이 의학 관련 조사였다는" (surface-safe 완화) |

#### judge_contradiction 채널 (3 entries)

| id | dispute / tone | KO 변경 본질 |
|---|---|---|
| `judgec-d-2-mid-v5` | d-2 / mid | "그 기록" → "해당 출금 / 출금 기록" (이중 구체화) |
| `judgec-h-d3-mid-v1` | h-d3 / mid | **사용자 patch**: "이미 외도 정황이 있었다고 보는 입장만으로는" → "만약 실제 배신을 당한 입장이라 하더라도" + "왜 그 선을 넘었는지" → "왜 해지 절차에 직접 손을 댔는지" |
| `judgec-h-d3-hard-v4` | h-d3 / hard | "숨김과 선을 넘은 행동은 무게가 다릅니다" → "숨긴 사실과 해지 절차에 직접 손댄 행동은 별개의 사안입니다" |

### §2. 다국어 baseline 단어 사전 (Codex 작업)

| KO 표현 (변경 후) | EN | JA | ZH-CN |
|---|---|---|---|
| "당시 통화" | "the call at that time" | "当時の通話" | "当时的通话" |
| "통화 기록" | "the call record" | "通話記録" | "通话记录" |
| "직접 추궁" | "directly press(ed) for an answer" | "直接問い詰める" | "直接质问" |
| "출금 기록" | "the withdrawal record" | "出金記録" | "取款记录" |
| "해지 절차에 직접 손댄 행동" | "the act of directly altering the termination procedure" | "解約手続きに直接手をつけた行為" | "直接干预解约程序的行为" |
| "해당 검색 기록" | "the relevant search record" | "該当の検索記録" | "相关搜索记录" |
| "의학 관련 조사" | "medical-related research" | "医学関連の調査" | "医学相关调查" |
| "해당 출금" | "the said withdrawal" | "該当の出金" | "该笔取款" |
| "왜 해지 절차에 직접 손을 댔는지" | "why you directly altered the termination procedure" | "なぜ解約手続きに直接手をつけたのか" | "为什么直接干预解约程序" |
| "숨긴 사실과 ... 별개의 사안" | "the concealed fact and ... are separate matters" | "隠した事実と ... は別個の事案" | "隐瞒的事实和……是另一回事" |

### §3. 변환 원칙

1. **재판관 격식 보존** — EN: "Mr./Ms. + Name, ..." / JA: "...様" + 격식 / ZH-CN: 격식 호명 + "请..."
2. **tone (soft / mid / hard) 강도 일관** — KO tone과 동일
3. **truth-leak 회피** — h-d4 영역 entries (3건)의 "난임" / "출산 관련 조사" 등 hidden lexeme 다국어 surface X (KO에서 "의학 관련 조사"로 완화된 영역 반영)
4. **호칭 보존** — "박지연 씨" / "이준호 씨" 다국어 일관 ("Ms. Park" / "Mr. Lee" 등 기존 영역 일관)

### §4. 산출

11 entries × 3 lang = 33 외국어 entries. 각 entry는 KO와 동일 구조 (id 동일, text 다국어 번역, behaviorHint 그대로 OR 다국어 sync, tags 그대로).

대상 file:
- `src/data/scriptedText/spouse-01.en.json`
- `src/data/scriptedText/spouse-01.ja.json`
- `src/data/scriptedText/spouse-01.zh-CN.json`

### §5. 검증

```
npx tsc --noEmit
npm run build
npm run -s qa:fast  # static P0=0 / route P0=0
node scripts/detect-truth-leak.cjs --strict  # findings=0 (KO/EN/JA/ZH-CN 모두)
```

JSON parse:
```
node -e "['en','ja','zh-CN'].forEach(l=>JSON.parse(require('fs').readFileSync('src/data/scriptedText/spouse-01.'+l+'.json','utf8'))); console.log('OK')"
```

### §6. 산출 commit

```
git add src/data/scriptedText/spouse-01.{en,ja,zh-CN}.json
git commit -m "i18n(spouse-01): sync judge dispassionate sweep multilang — 11 entries × 3 lang (33 외국어 entries)

KO baseline: f227c800
권위: feedback_judge_dispassionate_action_focused

Co-Authored-By: ..."
git push -u origin codex/spouse01-judge-dispassionate-multilang
```

main session이 fast-forward merge 또는 cherry-pick.

## 2. 권위 메모리 참조

- `../spouse01-judge-dispassionate-sweep-20260525/gpt-upload/result/spouse-01_judge_dispassionate_polished_cycle7.json` — KO patch JSON
- `../spouse01-judge-dispassionate-sweep-20260525/gpt-upload/memory/feedback_judge_dispassionate_action_focused.md` — 정책 원문
- [[feedback_codex_worktree_safe_directory]] — Codex worktree 진입 조건
- [[feedback_powershell_encoding_utf8]] — Write/Edit tool 사용 (PowerShell mojibake 회피)
- [[design_spouse01_truth_disclosure_policy]] — h-d4 영역 truth-leak 정책 (다국어 적용 시 surface lexeme 회피)

## 3. 자매 의뢰서

- `family01-judge-dispassionate-multilang-sync-20260525/` — family-01 14 entries × 3 lang = 42 외국어 entries (동일 패턴)

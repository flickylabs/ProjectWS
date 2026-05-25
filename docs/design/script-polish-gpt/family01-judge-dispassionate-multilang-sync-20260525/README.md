# Codex Multilang Sync 의뢰서 — family-01 judge dispassionate sweep (2026-05-25)

## 0. 개요

본 의뢰서는 `family01-judge-dispassionate-sweep-20260525/` (KO baseline polish, commit `539515d1`)의 EN/JA/ZH-CN 다국어 sync 작업.

- **KO baseline commit**: `539515d1 polish(family-01): judge dispassionate KO sweep 적용 — 14 entries (GPT 13 + 사용자 patch 1)`
- **사용자 patch result**: `a3dc540f docs(family-01): judge dispassionate sweep GPT 시안 + 사용자 patch 보존`
- **영역**: judge_question (7) + judge_contradiction (2) + judge_evidence_combo (5) = **14 entries × 3 lang = 42 외국어 entries**
- **권한**: Cycle 7 신규 정책 [[feedback_judge_dispassionate_action_focused]] 다국어 적용

## 1. 작업 단계 (Codex worktree)

### §0. 진입 조건

```
git worktree add -b codex/family01-judge-dispassionate-multilang ../ws-family01-judge-dispassionate-multilang main
git config --global --add safe.directory $worktree_path
```

### §1. KO baseline 확인

본 KO commit이 변경한 14 entries:

#### judge_question 채널 (7 entries)

| id | dispute / tone | KO 변경 본질 |
|---|---|---|
| `judgeq-d-1-motive-search-4-v3` | d-1 / motive_search | "선을 넘었다면" → "유서 작성 절차에 직접 손을 댔다면" |
| `judgeq-d-2-fact_pursuit-4-v1` | d-2 / fact_pursuit | "절차에 손대는 선을 넘었습니까" → "왜 유서 작성 절차에 직접 손을 댔습니까" |
| `judgeq-d-2-empathy_approach-1-v1` | d-2 / empathy_approach | "그 문서를 고치던 순간" → "유서를 수정하던 순간" |
| `judgeq-d-2-empathy-approach-1-v5` | d-2 / empathy_approach | "그 문서가" → "수정된 유서가" |
| `judgeq-d-2-empathy_approach-2-v2` | d-2 / empathy_approach | "그 문서를 보는 순간" → "변경된 유서를 보는 순간" |
| `judgeq-d-2-empathy-approach-4-v5` | d-2 / empathy_approach | "그 문서가 어머니 뜻을 얼마나 흐렸는지" → "수정된 유서가 어머니 뜻과 어디에서 달라졌다고 보는지" |
| `judgeq-d-4-motive-search-4-v1` | d-4 / motive_search | "법적 선을 넘은 판단" → "본인이 필요하다고 판단해 법적 절차에 직접 손을 댄 이유" |

#### judge_contradiction 채널 (2 entries)

| id | dispute / tone | KO 변경 본질 |
|---|---|---|
| `judgec-d-1-hard-v5` | d-1 / hard | "어디서 선을 넘었습니까" → "어디서 유서 작성 절차에 직접 손을 댔습니까" |
| `judgec-d-2-hard-v3` | d-2 / hard | "어떤 선을 넘었는지" → "어떤 행동으로 유서 작성 절차에 직접 손을 댔는지" |

#### judge_evidence_combo 채널 (5 entries)

| id | dossier / tone | KO 변경 본질 |
|---|---|---|
| `judgeec-dc-1-b-q2-hard-v1` | dc-1 / hard | "어디서 선을 넘었는지" → "어디서 유서 작성 절차에 직접 손을 댔는지" |
| `judgeec-dc-2-b-q2-hard-v4` | dc-2 / hard | **사용자 patch**: "공증인 메모와 수정된 유언장을 함께 보면 윤태성 씨 몫이 재조정된 정황이 확인됩니다. 법적 절차에 직접 손댄 이유를 지금 답해 주십시오." (Cycle 5 dc-2 rename "수정된 유언장" 명칭 통일) |
| `judgeec-dc-3-b-q1-mid-v1` | dc-3 / mid | "계좌 흐름이 보입니다" → "계좌 자료와 송금 선후관계가 있습니다" |
| `judgeec-dc-3-b-q1-mid-v5` | dc-3 / mid | "계좌 흐름은 작은 도움을 넘어선 흐름입니다" → "계좌상 자금 이동에는 반복성과 규모가 확인됩니다" |
| `judgeec-dc-5-a-q1-soft-v5` | dc-5 / soft | "계좌 흐름이 보여 주는 사실" → "계좌상 송금 기록에서 확인되는 사실" |

### §2. 다국어 baseline 단어 사전 (Codex 작업)

| KO 표현 (변경 후) | EN | JA | ZH-CN |
|---|---|---|---|
| "유서 작성 절차에 직접 손을 댔다" | "directly altered the will-drafting procedure" | "遺言書作成手続きに直接手をつけた" | "直接干预遗嘱起草程序" |
| "수정된 유서 / 수정된 유언장" | "the revised will" | "修正された遺言書" | "修改后的遗嘱" |
| "변경된 유서" | "the altered will" | "変更された遺言書" | "变更后的遗嘱" |
| "법적 절차에 직접 손을 댄" | "directly altered the legal procedure" | "法的手続きに直接手をつけた" | "直接干预法律程序" |
| "계좌 자료와 송금 선후관계" | "the account record and the sequence of remittances" | "口座記録と送金の前後関係" | "账户记录与汇款的先后关系" |
| "계좌상 자금 이동에는 반복성과 규모가 확인됩니다" | "the account shows repeated and substantial money movements" | "口座上の資金移動には反復性と規模が確認されます" | "账户上的资金流动有反复性和规模可以确认" |
| "계좌상 송금 기록에서 확인되는 사실" | "the facts confirmed in the account's remittance record" | "口座上の送金記録から確認される事実" | "账户汇款记录中确认的事实" |
| "재조정된 정황" | "the circumstance of re-adjustment" | "再調整された経緯" | "重新调整的情况" |
| "유서를 수정하던 순간" | "the moment of revising the will" | "遺言書を修正していた瞬間" | "修改遗嘱的那一刻" |

### §3. 변환 원칙

1. **재판관 격식 보존** — KO `...십시오` / `...습니까` 격식 다국어 일관
2. **호칭 보존** — "윤태성 씨" / "윤정후 씨" / "두 분" 다국어 일관
3. **tone (soft / mid / hard) 강도** — KO와 동일
4. **truth-leak 회피** — family-01 hidden 영역 (출생 비밀 / 정후→어머니→윤태성 routing) hidden lexeme 다국어 surface X
5. **dc-2 rename 명칭 일관** — "수정된 유언장" (Cycle 5 family-01 dc-2 rename 명칭) 다국어 통일 ("revised will" / "修正された遺言書" / "修改后的遗嘱")

### §4. 산출

14 entries × 3 lang = 42 외국어 entries. 대상 file:
- `src/data/scriptedText/family-01.en.json`
- `src/data/scriptedText/family-01.ja.json`
- `src/data/scriptedText/family-01.zh-CN.json`

### §5. 검증

```
npx tsc --noEmit
npm run build
npm run -s qa:fast  # static P0=0 / route P0=0
node scripts/detect-truth-leak.cjs --strict  # findings=0
```

### §6. 산출 commit

```
git add src/data/scriptedText/family-01.{en,ja,zh-CN}.json
git commit -m "i18n(family-01): sync judge dispassionate sweep multilang — 14 entries × 3 lang (42 외국어 entries)

KO baseline: 539515d1
권위: feedback_judge_dispassionate_action_focused

Co-Authored-By: ..."
git push -u origin codex/family01-judge-dispassionate-multilang
```

## 2. 권위 메모리 참조

- `../family01-judge-dispassionate-sweep-20260525/gpt-upload/result/family-01_judge_dispassionate_polished_cycle7.json` — KO patch JSON
- `../family01-judge-dispassionate-sweep-20260525/gpt-upload/memory/feedback_judge_dispassionate_action_focused.md` — 정책 원문
- [[feedback_codex_worktree_safe_directory]] — Codex worktree 진입 조건
- [[design_family01_truth_disclosure_policy]] — family-01 truth-leak 정책

## 3. 자매 의뢰서

- `spouse01-judge-dispassionate-multilang-sync-20260525/` — spouse-01 11 entries × 3 lang = 33 외국어 entries (동일 패턴)

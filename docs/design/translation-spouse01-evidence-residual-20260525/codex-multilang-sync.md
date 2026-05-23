# Codex Thread — spouse-01 evidence_present 69 entries 다국어 sync

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
| **worktree spawn** | `git worktree add -b codex/spouse01-evidence-residual-sync ../ws-spouse01-evidence-residual-sync main` |
| **safe.directory 설정** | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` 실행해 working tree clean 확인 |
| **PowerShell file swap 금지** | Get-Content 기본 ANSI mojibake. Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-evidence-residual-sync` push |

---

## §1. 작업 범위

KO `src/data/scriptedText/spouse-01.json`의 `evidence_present` channel 진실 누설 회피 + frame 일관성 polish **69 entries** (commit on main: `1ae1fc5a`). EN/JA/ZH-CN 동일 anchor 동기.

3 batch:
- Batch 1: e-1 (참고서) + e-2 (GPS) — 27건
- Batch 2: e-3 (통화) + e-4 (문자) — 28건
- Batch 3: e-5 (현금) + a|e-6 (투자방) + a|e-7 (송금) + b|e-6 — 14건

### 1.1. 영향 파일

```
src/data/scriptedText/spouse-01.en.json
src/data/scriptedText/spouse-01.ja.json
src/data/scriptedText/spouse-01.zh-CN.json
```

### 1.2. 작업 영역 외

- KO file (`spouse-01.json`) — main에 이미 적용 완료 (commit 1ae1fc5a)
- 다른 channel (`judge_evidence_combo` / `interrogation` / `dossier` 등) — 본 의뢰 외
- 다른 case — 본 의뢰 외

---

## §2. Polish anchor (69 entries)

main commit `1ae1fc5a`의 git show 결과로 KO diff 확인. 각 entry id는 다음 형식:
- `{a|b}-e-{N}-{stage}-{sub}-v{idx}` (예: `b-e-1-mid-stage2-v2`)

상세 anchor 표는 main commit message 또는 git show 1ae1fc5a 참조.

### 2.1. 통일 영역 (11 패턴 × 5 evidence)

| 패턴 ID | 영향 entries | KO 변경 후 (모두 동일) |
|---------|------------|----------------------|
| 횡령 5건 | b-e-{1~5}-early-stage1-v3 | 자료가 저와 관련된 건 맞습니다. 다만 그 자료만 보고 외도나 다른 문제로 단정짓지 말아 주십시오. |
| mid\|2-v2 5건 | b-e-{1~5}-mid-stage2-v2 | 그건 말씀드리기 어렵지만 다른 문제입니다. 제가 혼자 정리하려 했습니다. |
| mid\|2-v3 4건 | b-e-{1,2,4,5}-mid-stage2-v3 | 반복된 데는 이유가 있습니다. 제 도움이 필요한 일이 있었습니다. |
| mid\|2-v5 3건 | b-e-{1,2,4}-mid-stage2-v5 | 그 얘기를 숨긴 건 맞습니다. 사정이 있어 말을 꺼내기 어려웠습니다. |
| mid\|2-v6 뒷부분 4건 | b-e-{1,2,3,4}-mid-stage2-v6 | (앞부분 evidence별) + " 다른 사람의 사정까지 얽혀있어 말씀드리기 어렵습니다." |
| mid\|2-v8 5건 | b-e-{1~5}-mid-stage2-v8 | 같은 문제의 연장선으로 보이는 건 이해합니다. 저는 어떻게든 그걸 혼자 처리해보려 했습니다. |
| mid\|3-v2 5건 | b-e-{1~5}-mid-stage3-v2 | 개인적인 목적의 관계가 아니었습니다. 제 도움이 필요한 일이 있었습니다. |
| mid\|3-v4 5건 | b-e-{1~5}-mid-stage3-v4 | 저는 그저 문제를 해결하고 수습하고 싶었던 것 뿐입니다. 다만 아내에게 말하지 않은 건 분명 잘못입니다. |
| mid\|3-v5 5건 | b-e-{1~5}-mid-stage3-v5 | 제 도움이 필요했던 상황이라 어쩔 수 없었습니다. 하지만 그 방식에 문제가 있었던 것은 인정합니다. |
| mid\|3-v8 5건 | b-e-{1~5}-mid-stage3-v8 | 다른 사정이 있었습니다. 다만, 아내에게 숨긴 건 변명의 여지가 없습니다. |
| early\|3 5건 | b-e-{1~5}-early-stage3-v1 | (각 evidence별 본문 + "물으시면" 통일) |

### 2.2. 개별 영역 (18 entries)

main commit `1ae1fc5a` git show로 개별 anchor 확인.

---

## §3. 다국어 번역 원칙

### 3.1. 번역체 회피 (★ 핵심)

KO 변경의 핵심 의도 = **번역체 배제 + NPC 자연 발화 톤**. EN/JA/ZH-CN도 동일 원칙:
- 직역 어순 배제
- 추상명사 남발 X
- 원어 (영어/일본어/중국어) 자연 발화 톤
- 게임 톤 = NPC 본인 발화 (변명/인정/회피) — 재판관 격식 X. 일상 격식체.

### 3.2. 의미 보존 원칙

KO 변경의 의미 영역 — **불필요한 의미 추가 X**:
- KO에 없는 새 사실/단서 X
- KO에 없는 새 의도/평가 X
- 진실 누설 키워드 (시댁/가족/집안/형/회생/형사/사기/횡령) 추가 X (★ 본 batch 핵심)
- 모호 referent ("다른 사정 / 다른 문제 / 별도 사용처 / 제 도움이 필요한 일") 원어로 자연하게 명사구 보강 OK

### 3.3. 진실 누설 정책 (★ 절대 준수)

[design_spouse01_truth_disclosure_policy](../../../memory/design_spouse01_truth_disclosure_policy.md) 참조.

#### 진실 노출 전 등장 금지 키워드

| 언어 | 키워드 |
|------|--------|
| EN | "in-law", "family", "household", "older brother", "personal rehab", "embezzle", "fraud" |
| JA | "婚家", "家族", "家庭", "兄", "個人再生", "横領", "詐欺" |
| ZH-CN | "婆家", "家族", "家里", "哥哥", "个人偿债", "挪用", "诈骗" |

#### 변환 패턴 (참고)

- 횡령 → "다른 문제" → EN "other suspicions" / JA "別の疑い" / ZH-CN "其他嫌疑"
- 가족/집안 → "다른 사정" / "다른 문제" → EN "another matter" / JA "別の事情" / ZH-CN "另有隐情"
- 가족 부탁/일 → "제 도움이 필요한 일" → EN "something that needed my help" / JA "私の手助けが必要な事" / ZH-CN "需要我帮忙的事"
- 사기 (e-6) → "속았습니다" → EN "I was deceived" / JA "騙されました" / ZH-CN "被骗了"

### 3.4. truth-leak detector 검증

번역 후:
```
node scripts/detect-truth-leak.cjs --strict
```
모든 lang findings=0 PASS 필수.

---

## §4. 작업 순서

### Step 1: KO anchor 정독

main commit `1ae1fc5a` git show로 KO 원본 vs 변경 diff 확인. 각 batch의 의도 영역 파악:
- Batch 1 e-1 (참고서) + e-2 (GPS): 외도 의심 영역 evidence 변명
- Batch 2 e-3 (통화) + e-4 (문자): 발신자 미상 영역
- Batch 3 e-5 (현금) + a 측 e-6/e-7: 자금 / 박지연 송금 영역

### Step 2: EN/JA/ZH-CN 동기

각 lang sidecar에서 동일 variant id 영역 검색 + KO 변경 의미에 맞게 재번역. **번역체 회피 + 의미 보존 + 진실 누설 회피** 3원칙.

NPC 발화 톤 — 일상 격식체 (재판관 격식 X). 영어/일본어/중국어 모두 NPC 본인 발화 톤.

### Step 3: detect-truth-leak --strict 검증

`node scripts/detect-truth-leak.cjs --strict` PASS 확인. ★ 본 batch 핵심.

### Step 4: tsc / qa:fast 검증

`npx tsc -b --force` silent + `npm run qa:fast` P0=0.

### Step 5: commit + push

```
git add src/data/scriptedText/spouse-01.en.json
git add src/data/scriptedText/spouse-01.ja.json
git add src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): evidence_present 69 entries EN/JA/ZH-CN sync (진실 누설 회피)"
git push origin codex/spouse01-evidence-residual-sync
```

---

## §5. 회피 영역

- **PowerShell file swap 절대 금지** (mojibake 사고 영역). Write/Edit tool 사용
- **새 의미 추가 X** — KO 원본에 없는 단어/암시/평가 추가 시 의도 변질
- **anchor variant 외 영역 변경 X** — 본 sync는 69 entries 한정. 다른 영역은 건드리지 X
- **detect-truth-leak findings 0 미달 시 commit X** — 진실 누설 발견 시 변경 재검토
- **scriptedText json 영역만 변경. build-core-case --write 호출 X** (derive 영역 의도치 않은 변경 회피)
- **직전 sync worktree 영역과 충돌 X** — 본 worktree는 main HEAD 1ae1fc5a 기준

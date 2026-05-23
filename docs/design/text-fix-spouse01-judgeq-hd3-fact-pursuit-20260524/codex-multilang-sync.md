# Codex Thread — spouse-01 judgeq-h-d3-fact_pursuit-1 v1/v2/v5 다국어 sync (3 entries)

작성일: 2026-05-24
주체: Codex worktree (baseline anchor 영역 — main session 직접 작업 X)
범위: 3 entry 단일 batch (재판관 질문 명확화 polish)

관련 정책:
- [feedback_claude_ko_needs_codex_multilang](../../../memory/feedback_claude_ko_needs_codex_multilang.md)
- [feedback_baseline_anchor_scripted_text](../../../memory/feedback_baseline_anchor_scripted_text.md)
- [feedback_judge_question_quality](../../../memory/feedback_judge_question_quality.md)
- [feedback_codex_worktree_safe_directory](../../../memory/feedback_codex_worktree_safe_directory.md)
- [feedback_powershell_encoding_utf8](../../../memory/feedback_powershell_encoding_utf8.md)

---

## §0. 진입 조건

| 항목 | 조건 |
|---|---|
| worktree spawn | `git worktree add -b codex/spouse01-judgeq-hd3-fp-sync ../ws-spouse01-judgeq-hd3-fp-sync main` |
| safe.directory | `git config --global --add safe.directory $worktree_path` 필수 |
| 작업 시작 전 | `git status --short` clean 확인 |
| PowerShell 회피 | Write/Edit tool로만 변경 |
| 산출 | branch `codex/spouse01-judgeq-hd3-fp-sync` push |

---

## §1. 작업 배경

사용자 보고 (QA round, 2026-05-24): 재판관 fact_pursuit 질문 3개가 장황·어색·연속성 부적절.

채널: `judge_question`. 사건: spouse-01, dispute: h-d3 (공동 적금 해지). 심문 방식: 사실 추궁 - 모순에 집중하기. 박지연 씨(A) 대상 기초 표면 질문 layer.

---

## §2. KO 변경 (이미 main에 적용)

파일: `src/data/scriptedText/spouse-01.json`

### 2.1. judgeq-h-d3-fact_pursuit-1-v1

| 항목 | 내용 |
|---|---|
| 변경 전 | `박지연 씨, 공동 적금 해지가 시작된 날 은행에 갔던 사람이 누구였는지부터 말씀해 주십시오.` |
| 변경 후 | `박지연 씨, 공동 적금 해지가 이루어진 날 은행에 갔던 사람이 누구였는지부터 말씀해 주십시오.` |
| 사유 | "해지는 한 번 발생하는 것인데 '시작된 날'이라는 연속성 느낌의 표현은 부적절" (사용자) |

### 2.2. judgeq-h-d3-fact_pursuit-1-v2

| 항목 | 내용 |
|---|---|
| 변경 전 | `박지연 씨, 해지 서류를 손에 들기 전에 본인 명의와 이준호 씨 명의를 어떤 방식으로 확인하셨습니까.` |
| 변경 후 | `박지연 씨, 적금 해지를 위한 두 분의 명의 확인은 어떻게 진행하셨습니까.` |
| 사유 | "표현이 너무 장황하고 어색" (사용자) — 간결화 |

### 2.3. judgeq-h-d3-fact_pursuit-1-v5

| 항목 | 내용 |
|---|---|
| 변경 전 | `박지연 씨, 그 적금이 빠져나간 일을 단순한 절차로 보셨습니까, 아니면 직접 실행한 행동으로 보셨습니까.` |
| 변경 후 | `박지연 씨, 그 적금이 빠져나간 건 예정된 정상 절차였습니까, 아니면 직접 중도 해지를 하신 겁니까.` |
| 사유 | "표현이 훨씬 명확해야 함. 지금 표현은 이해하기 어려운 어색한 말" (사용자) — 의미 명확화 |

---

## §3. 외국어 sync 작업

### 3.1. 현 외국어 v1/v2/v5 (KO 구판 직역 — drift 없음)

영향 파일:
- `src/data/scriptedText/spouse-01.en.json` (line 21670/21675/21690)
- `src/data/scriptedText/spouse-01.ja.json` (line 22191/22196/22211)
- `src/data/scriptedText/spouse-01.zh-CN.json` (line 22914/22919/22934)

### 3.2. 동기 원칙

**핵심:** KO 변경은 표현 명확화·간결화·시제정확화. 의미 변경 미미하지만 톤·구체성 개선 필요. 외국어도 동일 방향(장황→간결, 어색→자연, 연속성느낌→완료시제)으로 polish.

#### v1 — 시제 정확화
- 변경 의도: "해지가 진행되는 과정"이 아니라 "해지가 발생한 그 날" 지목
- EN: `cancellation began` → `cancellation took place` 류
- JA: `始まった日` → `行われた日` 또는 `解約された日`
- ZH-CN: `取消开始当天` → `办理解约的那一天` 또는 `解约当日`

#### v2 — 간결화
- 변경 의도: "해지 서류를 손에 들기 전에 본인 명의와 이준호 씨 명의를 어떤 방식으로 확인" (3 절) → "적금 해지를 위한 두 분의 명의 확인은 어떻게 진행" (1 절)
- EN: 단문 1개. 예: `Ms. Park, how did you verify both names for the savings cancellation?`
- JA: 예: `パク・ジヨンさん、積立解約のためのお二人の名義確認はどのように進めましたか。`
- ZH-CN: 예: `朴智妍女士，办理共同储蓄解约时，二位的名义核对是如何进行的？`

#### v5 — 의미 명확화
- 변경 의도: 모호한 "단순한 절차 vs 직접 실행한 행동" → 구체적인 "예정된 정상 절차 vs 직접 중도 해지"
- 핵심 단어: "중도 해지" (early/mid-term cancellation 즉 만기 전 해지)
- EN: 예: `Ms. Park, was the savings being drawn out a routine scheduled procedure, or did you personally execute an early cancellation?`
- JA: 예: `パク・ジヨンさん、その積金が引き出されたのは予定された正規の手続きでしたか、それともご自身で中途解約をされたのですか。`
- ZH-CN: 예: `朴智妍女士，那笔储蓄被取出，是预定的正常程序，还是您亲自办理了中途解约？`

(위 예시는 참고용. Codex 자연성·register·길이 균형 우선 자율 polish)

### 3.3. 보존 사항

- `behaviorHint`는 변경 X (3 variants 동일 hint)
- `tags` 배열은 변경 X
- 호명 register: `Ms. Park / パク・ジヨンさん / 朴智妍女士` 유지

---

## §4. 검증

```
git status --short  # 변경 외국어 3 file만 modified 기대
npx tsc --noEmit
npm run -s qa:fast 2>&1 | tail -20
```

---

## §5. 산출

```
git add src/data/scriptedText/spouse-01.en.json \
        src/data/scriptedText/spouse-01.ja.json \
        src/data/scriptedText/spouse-01.zh-CN.json
git commit -m "i18n(spouse-01): sync judgeq-h-d3-fact_pursuit-1 v1/v2/v5 (3 entries)"
git push -u origin codex/spouse01-judgeq-hd3-fp-sync
```

main session이 cherry-pick + merge 처리.

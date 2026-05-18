# LQA Codex 병렬 오케스트레이션

작성일: 2026-05-19
관련: [execution-plan-v2.md](execution-plan-v2.md), [threads/](threads/) (자동 생성된 10 brief)
범위: Phase 2 외국어 LQA의 Codex 10-thread 병렬 운영

---

## §1. Thread 할당표

| Thread | Case | Lang | 출력 CSV | 추정 시간 |
|---|---|---|---|---|
| β1  | spouse-01 | en    | `reports/spouse-01_en.csv` | 1.5~2일 |
| β2  | spouse-01 | ja    | `reports/spouse-01_ja.csv` | 1.5~2일 |
| β3  | spouse-01 | zh-CN | `reports/spouse-01_zh-CN.csv` | 1.5~2일 |
| β4  | family-01 | en    | `reports/family-01_en.csv` | 1.5~2일 |
| β5  | family-01 | ja    | `reports/family-01_ja.csv` | 1.5~2일 |
| β6  | family-01 | zh-CN | `reports/family-01_zh-CN.csv` | 1.5~2일 |
| β7  | friend-01 | en    | `reports/friend-01_en.csv` | 1.5~2일 |
| β8  | friend-01 | ja    | `reports/friend-01_ja.csv` | 1.5~2일 |
| β9  | friend-01 | zh-CN | `reports/friend-01_zh-CN.csv` | 1.5~2일 |
| β10 | (UI global) | EN+JA+ZH | `reports/ui-global_{en,ja,zh-CN}.csv` (3개) | 1일 |

병렬 wall-clock: **약 2일** (가장 긴 thread 기준).

---

## §2. 진입 절차 (메인 세션 → Codex thread 각각)

### 2.1. 사전 체크 (메인 세션)

각 thread 진입 전 메인 세션이 보장:

1. **Phase 0 완료**: `scripts/verify-translations.cjs` v2 + `scripts/detect-truth-leak.cjs` 존재 + 동작 확인
2. **Phase 1 사인오프**: `docs/design/translation-lqa-phase/ko-baseline-signoff.md` 존재
3. **working tree clean**: `git status --short`가 빈 출력 또는 의도된 untracked만
4. **타겟 디렉토리 준비**: `docs/design/translation-lqa-phase/reports/` 비어있음 (기존 결과 있으면 archive)
5. **메모리 동기화**: 4 메모리 파일 최신 ([feedback_truth_leak_prohibition](memory) / [feedback_natural_korean_vs_translationese](memory) / [feedback_revision_meaning_over_form](memory) / [feedback_translation_pipeline_placeholder_leak](memory))

위 5개 모두 OK → 10 thread 동시 spawn 가능.

### 2.2. Codex thread spawn 방법 (사용자 운영)

각 thread = 별도 Codex 세션. 입력으로 해당 brief md 파일 전달:

```
[Codex 세션 β1 진입]
> docs/design/translation-lqa-phase/threads/thread-beta1-spouse-01-en.md 의뢰서 그대로 수행해줘.
```

10개 thread 모두 동일 방식. **같은 worktree에서 동시 동작 안전** (각 thread 출력 경로 disjoint).

---

## §3. 안전 규칙 (모든 thread 강제)

### 3.1. Worktree 안전

- ✅ READ from `src/` (검수 대상)
- ✅ READ from `docs/localization/...glossary_locked.csv`
- ✅ READ from `scripts/verify-translations.cjs`, `detect-truth-leak.cjs`
- ✅ WRITE to 자기 disjoint 경로 (단일 CSV — β1은 spouse-01_en.csv만, β10은 ui-global_{lang}.csv 3개만)
- ❌ WRITE to `src/` (절대 금지)
- ❌ WRITE to 다른 thread의 CSV
- ❌ WRITE to glossary
- ❌ commit에 `src/` 포함
- ❌ origin/main push

### 3.2. 충돌 방지

- 각 thread의 commit은 자기 CSV만 staged (commit 전 `git diff --cached --stat`로 검증 필수)
- 한 thread가 다른 thread의 작업 중 CSV를 read 가능 (cross-reference 위해), write는 불가
- 동시 commit 경쟁 시 git이 자동 정렬 (각 commit 작은 단위라 충돌 거의 없음)

### 3.3. P0 발견 시

즉시 메인 세션에 알림 (작업 중단 X, 계속 진행).
메인 세션 = 모든 thread 종료 후 P0 우선순위 정정 의사결정.

---

## §4. 모니터링 (메인 세션)

### 4.1. 1시간 간격 health check

```bash
# 각 thread별 진행 추정 (CSV 행 수)
for f in docs/design/translation-lqa-phase/reports/*.csv; do
  if [ -f "$f" ]; then
    count=$(($(wc -l < "$f") - 1))
    echo "$(basename $f): $count issues"
  fi
done

# 누가 src/ 건드렸는지 검사 (안전 규칙 #1 위배 검출)
git status --short src/
# 출력 비어있어야 함. 비어있지 않으면 위반 thread 식별 → 즉시 중단
```

### 4.2. Thread 종료 알림

각 thread 완료 시 메인 세션에 다음 형식으로 알림:

```
[β-N 종료] {case}/{lang}
- Issues: P0=x, P1=y, P2=z
- Hot category: judge_question_script (P0 z건 집중)
- Cross-reference 의심: friend-01에 동일 패턴 잠재
```

---

## §5. 집계 (모든 thread 종료 후)

### 5.1. 통합 dashboard

메인 세션이 다음 실행:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const reports = fs.readdirSync('docs/design/translation-lqa-phase/reports');
const totals = { P0: 0, P1: 0, P2: 0 };
const perFile = {};
for (const f of reports) {
  if (!f.endsWith('.csv')) continue;
  const lines = fs.readFileSync(path.join('docs/design/translation-lqa-phase/reports', f), 'utf8').split('\n').slice(1);
  const cnt = { P0: 0, P1: 0, P2: 0 };
  for (const ln of lines) {
    const cols = ln.split(',');
    if (cols.length < 6) continue;
    const sev = cols[5];
    if (cnt[sev] !== undefined) { cnt[sev]++; totals[sev]++; }
  }
  perFile[f] = cnt;
}
console.log('## LQA Phase 2 Dashboard');
console.log('Totals:', JSON.stringify(totals));
console.log('Per file:');
for (const f of Object.keys(perFile).sort()) {
  console.log('  ' + f + ':', JSON.stringify(perFile[f]));
}
"
```

### 5.2. P0/P1 우선순위

- 모든 P0를 한 표로 모음 (cross-thread)
- 사용자에게 boolean 정정 vs deferral 결정 의뢰
- 결정 결과 → Phase 4 merge script 입력

### 5.3. Cross-lang 패턴 분석

같은 row_id가 여러 lang에서 issue로 표시되었으면 → 번역 pipeline 구조적 문제 (Phase 0 검출 누락 패턴)
→ [feedback_translation_pipeline_placeholder_leak](memory)에 신규 패턴 추가 후 Phase 0 v2 보강 검토

---

## §6. 실패/재시도 처리

### 6.1. Thread 도중 실패

- 한 thread만 재시작: 해당 brief 그대로 다시 Codex 세션에 투입, 기존 CSV 있으면 ARCHIVE 후 새로 시작
- 다른 thread 영향 0 (disjoint)

### 6.2. Thread 결과 품질 불충분

- 메인 세션 spot check (각 thread CSV 10행 무작위 read)
- 부적합 thread → 다른 모델로 재시작 (e.g., Claude로) 또는 사용자 직접 검수

### 6.3. Phase 0 도구 버그 발견

- Phase 0 thread 재실행 → 도구 fix → Phase 2 thread 일부 재실행 (영향 받는 카테고리만)

---

## §7. Phase 3 / 4 와의 연결

### Phase 3 (인간 freelancer, 선택)
- 모든 thread의 P0 + P1 행을 통합 CSV로 export
- vendor에 전달, 정정 후 다시 통합

### Phase 4 (정정 적용)
- `scripts/apply-lqa-corrections.cjs` (TBD) — 모든 reports CSV의 recommendation을 source 파일에 적용
- merge 후 verify v2 + tsc + qa:fast 통과 게이트
- PC QA 사용자 직접 (4언어 × 3 케이스)

---

## §8. 비용 / 리소스

- **LLM 호출**: 약 50,000 cell 검수 × LLM call (cell당 1~2 call) = 약 75,000 call
- **Codex Pro quota**: 10 thread 동시 가능한지 사전 확인 필요
- **메인 세션 부담**: 1시간 health check + 종료 후 집계/우선순위 결정 = 약 1~2시간/일

---

## §9. 재생성

10 thread brief는 [generate-lqa-thread-briefs.cjs](../../../scripts/generate-lqa-thread-briefs.cjs) 로 언제든 재생성 가능:

```bash
node scripts/generate-lqa-thread-briefs.cjs
```

템플릿 변경 시 ([codex-thread-template-case-lang.md](codex-thread-template-case-lang.md) / [codex-thread-template-ui.md](codex-thread-template-ui.md)) → 재실행 → 10 파일 일괄 갱신.

---

**참조**:
- [execution-plan-v2.md](execution-plan-v2.md) — 전체 LQA 5 phase 계획
- [master-task.md](master-task.md) — v1 governance/framework (역사적)
- [feedback_shared_worktree_no_parallel_with_dirty](memory) — 병렬 안전 규칙

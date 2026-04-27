# Codex-Dev B Follow-up — FN Fix (의뢰서)

**작성**: CT-Main / 2026-04-27
**기준 HEAD**: `f03f49f feat(engine): tier-3 disclosure guard MVP — log mode + feature flag default off`
**Baseline anchor**: `acf5d27` (`baseline-pre-policy-v2`) + `a10b801` (`baseline-pre-policy-v1`)
**의뢰 본질**: QA-T3-GuardLog 발견 FN 1건 정밀 catch (regex matcher 영역)

---

## 의뢰 영역

### FN 1건 정확 영역
- **variant**: `family-01 / judgeq-d-3-fact_pursuit-1-v1` (judge_question)
- **source text**: `"윤정후 씨, 어머니 통장으로 정기적으로 돈을 보내신 사실은 인정하십니까."` (Dev-A 보정 후 텍스트)
- **현재 rule** (`src/engine/disclosureGuard.ts:45`): `{ label: '어머니 통장으로 정기적으로 돈을 보낸' }` (substring matcher)
- **원인**: `보낸` substring이 `보내신` 활용형 (한국어 존경 어미 `-시-` + 관형형 `-ㄴ`) 영역 catch X
- **현재 결과**: mode=log에서 action='pass' (FN)
- **기대 결과**: mode=log에서 action='log' + matched 명시

### 처리 방식 (사용자 명시 — 옵션 나)
- **정밀 regex / context-bound matcher 선호**
- `보낸` → `보내` 단순 확장 회피 (일반 동사 어간 catch FP 위험)
- 정확한 영역만 catch + 활용형 모두 포괄

### 권장 matcher 패턴 (사용자 예시)
```ts
{
  label: '어머니 통장으로 정기적으로 돈을 보내(신|시는|고|며|었|던)?',
  matcher: (text) => /어머니\s*통장으로\s*정기적으로\s*돈을\s*보내(신|시는|고|며|었|던)?/.test(text),
}
```

또는 동등한 context-bound matcher. label 영역은 보고 시 식별용.

### 추가 활용형 영역 (검토)
- `보내신` (존경 + 관형) ★ 현재 FN 대상
- `보내시는` (존경 + 진행 관형)
- `보내고` (연결)
- `보내며` (병렬)
- `보내었` (과거)
- `보내던` (회상 관형)
- `보낸다` / `보낼` 등은 평어 영역 (필요 시 추가 검토)

→ regex 영역에 `보내(신|시는|고|며|었|던)?` 정도면 발화 영역 활용형 충분

### context bound 영역 (FP 회피)
- `어머니\s*통장으로\s*정기적으로\s*돈을\s*보내` 영역으로 좁혀져 있어 일반 송금 표현 ("어머니께 돈을 보내") catch X
- 정확한 길이 + 명시 context = FP 안전

---

## 시작 조건 (반드시 먼저 실행)

```bash
git status --short --branch              # 상태 확인
git log --oneline -1                      # HEAD = f03f49f 확인
git diff --quiet && git diff --cached --quiet && echo "tracked clean" || echo "tracked dirty"
npm run check:all                         # PASS hard 0 / warnings 157
```

**중단 조건**:
- HEAD ≠ `f03f49f` (CT-Main 갱신 시 그 기준)
- `tracked dirty`
- `npm run check:all` hard issues > 0

---

## 작업 영역 (Dev-B 단독 / 작은 영역)

### 변경 가능
- `src/engine/disclosureGuard.ts` (PARAPHRASE_RULES family-01 영역, 1 rule 보강)

### 절대 금지선
- 다른 PARAPHRASE_RULES 영역 변경 X (FN 1건만)
- ScriptedText / caseData / UI 컴포넌트 / 정책 / 정책 JSON / wrapper / TC 문서 / 의뢰서 수정 X
- baseline anchor (a10b801 / acf5d27) 회귀 X
- baseline-pre-policy-v1 / v2 tag 변경 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- feature flag default 변경 X
- mode='sanitize' / mode='block' 본 구현 X
- `tryScriptedDialoguePath` 우회 X
- 다른 활용형 lexeme 추가 X (이번 의뢰 = FN 1건 정확 처리 영역)

---

## 검증 (사용자 명시 4 영역)

처리 후 다음 4 영역 모두 PASS:

```bash
npm run build                             # PASS
npx tsc -b --force                        # PASS
npm run check:all                         # PASS hard 0 / warnings 157 (baseline 보존)
```

### QA-T3-GuardLog targeted sample 재확인
- 동일 source text (`"...어머니 통장으로 정기적으로 돈을 보내신 사실..."`) 영역에서:
  - mode=off → action='pass' 유지
  - mode=log → action='log' + matched에 새 rule label 포함
- 다른 활용형 sample 영역 (`보내고`, `보내며` 등) 추가 검증
- 일반 송금 표현 ("어머니께 돈을 보내", "친구에게 돈을 보내신") 영역 → action='pass' 유지 (FP 회피 검증)

### regression 영역
- 기존 family-01 paraphrase rules 21개 영역 변경 X 확인
- spouse-01 / friend-01 영역 변경 X 확인
- gating 영역 변경 X 확인

---

## 결과 보고

### 보고서
`tmp/qa-codex-dev-b-followup-results/{YYYYMMDD}-fn-fix-summary.md`

영역:
- HEAD (수정 전후) / Scope / Commands run
- 변경 영역 (rule 1건 before/after)
- regex matcher spec
- 4 검증 영역 결과 (build / tsc / check:all / GuardLog targeted)
- FP 회피 검증 sample
- regression 영역 검증
- known finding vs new finding 분리

### Commit (선택)
- 작은 영역이라 Codex-Dev가 직접 commit 가능 / 또는 CT-Main 검수 후 commit
- commit message draft:
  ```
  fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase

  QA-T3-GuardLog FN 1건 처리. 정밀 regex matcher 영역 추가 — 활용형
  (보내신/보내시는/보내고/보내며/보내었/보내던) 모두 catch.

  단순 어간 확장 (보낸 → 보내) 회피 (FP 위험). context bound:
  '어머니 통장으로 정기적으로 돈을 보내(신|시는|고|며|었|던)?'

  검증:
  - npm run build PASS / npx tsc -b --force PASS
  - npm run check:all PASS (hard 0 / warnings 157, baseline 보존)
  - QA-T3-GuardLog targeted: 보내신/보내고/보내며 catch / 일반 송금 표현 pass
  ```

### 완료 시
CT-Main에 보고:
1. commit SHA (또는 commit X 시 working tree 영역)
2. 변경 rule before/after spec
3. 4 검증 영역 결과
4. FP 회피 검증 결과
5. regression 영역 검증 결과

→ CT-Main이 검수 + 사용자 confirm 영역 결정.

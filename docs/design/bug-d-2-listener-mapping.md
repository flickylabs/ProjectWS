---
name: bug-d-2-listener-mapping
description: PC QA 사용자 발견 — d-2 (남편 명의 계좌 목돈 출금) 영역에서 이준호 대상 motive_search 질문에 이준호 답변 누락 + 박지연이 이준호 의도 답변(a-d-2-S0-fact-pursuit-v2)을 발화하는 portrait 라벨 매핑 어긋남. Codex 진단 + fix 의뢰.
metadata:
  origin: claude (CT main thread)
  anchor: 24bb72a8
  severity: P0 (게임 진행 흐름 영향, 답변 누락)
  reproduction: spouse-01 d-2 영역 motive_search depth 1 질문 (이준호 대상) + 후속 fact_pursuit 질문 (박지연 대상) 흐름
---

# 이준호 답변 누락 + d-2 a/b variant 매핑 버그 진단/fix 의뢰서

Anchor: `24bb72a8`

---

## 1. 사용자 보고

PC QA 도중 발견. 스크린샷 첨부 (사용자 메시지):
- Q1: "이준호 씨, 돈 문제를 박지연 씨에게 열지 못하게 만든 가장 직접적인 두려움이 무엇이었습니까." → **이준호 대상** (감정 차원)
- Q2: "박지연 씨, 현금 출금이라는 방식을 보고 이 돈이 다른 생활과 연결됐다고 보신 근거는 무엇입니까." → 박지연 대상 (사실 추궁)
- 출력 답변 1개: "잔돈이 아닙니다. 한 번에 눈에 띄게 빠진 큰돈이었습니다." — **박지연 portrait + "박지연" 라벨로 표시**
- **이준호 답변 누락**.

사용자 진단: "목돈 관련 쟁점에서 감정을 묻는 질문에 대한 답변이 매핑이 잘못된 것 같아".

---

## 2. 메인 세션 1차 진단

### 2.1. 데이터 식별

| 항목 | 위치 / id | 설명 |
|---|---|---|
| Q1 (이준호 대상) | `src/data/scriptedText/spouse-01.json` `judgeq-d-2-motive_search-1-v1` (line 206419) | d-2 motive_search depth 1 v1 |
| 박지연이 발화한 답변 텍스트 | `src/data/scriptedText/spouse-01.json` `a-d-2-S0-fact-pursuit-v2` (line 16022) | **id에 `a-` prefix = A side (이준호) 의도** |
| Q2 (박지연 대상) | (별도 entry) | d-2 fact_pursuit depth 1 — 박지연 대상 |

스크린샷에서 출력된 답변 = `a-d-2-S0-fact-pursuit-v2` 텍스트와 정확 일치.

### 2.2. 데이터 tag 모순 확인

`a-d-2-S0-fact-pursuit-v2`:
```
"speaker:a"               ← 이준호 발화
"counterpartyRef:제_남편"   ← 모순. speaker가 a면 counterparty (B)를 부르는 호칭은 "제_아내"여야 함.
"callTerm:제_남편"          ← 동일 모순
```

`b-d-2-S0-fact-pursuit-v2` (line 23880):
```
"speaker:b"               ← 박지연 발화
"counterpartyRef:제_아내"   ← 모순. speaker가 b면 counterparty (A)를 부르는 호칭은 "제_남편"이어야 함.
"callTerm:제_아내"          ← 동일 모순
```

→ a-/b- 양쪽 모두 동일 systematic 모순 발견. d-2 영역 spec일 수 있고 또는 데이터 swap일 수 있음.

### 2.3. 가설

**가설 1 — 데이터 swap (가능성 높음)**:
- a-d-2-* variants 콘텐츠가 사실 박지연 발화로 작성됨 (B 측 발화자 톤). id prefix `a-`가 잘못.
- 또는 콘텐츠는 옳고 tag만 systematic하게 잘못 (data authoring 시점에 a/b swap).
- 스크린샷의 답변 텍스트 "잔돈이 아닙니다... 큰돈이었습니다"는 발화자가 자기 출금을 인정하는 톤. d-2 = 이준호 비자금 3,000만원 출금 → 정확하다면 이준호 발화. 그러나 게임에서 박지연 portrait. 엔진이 id prefix로 매핑한다면 정상이어야 하는데 어긋남.

**가설 2 — 엔진 매핑 오류**:
- 데이터는 옳음. 엔진의 portrait/listener party 매핑 로직 오류.
- 가능 위치: `src/engine/llmDialogueResolver.ts` / `src/engine/llmFreeQuestion.ts` / `src/hooks/useActionDispatch.ts` / `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`.

**가설 3 — variant fetch skip**:
- 이준호의 d-2 motive_search 답변 variants 데이터에 존재 (`a-d-2-S0-motive-search-v1`~`v10`, line 16400 etc.). 데이터 결손 아님.
- 그러나 어떤 dispatch 흐름에서 fetch 실패 → 박지연 답변만 출력.

### 2.4. 추가 확인 영역

- **d-2 전체 a-/b- variants의 tag 패턴 검증**: counterpartyRef / callTerm이 systematic하게 swap인지 sample audit.
- **다른 dispute (d-1, h-d3, h-d4) variants의 동일 tag 영역 비교**: d-2만 swap인지, 전체 swap인지.
- **engine dispatch 흐름**: questionDispatch → variant fetch → portrait/listener party mapping → render.

---

## 3. 작업 요청

### 3.1. 진단

1. **데이터 검증**:
   - `a-d-2-*` / `b-d-2-*` variants 전수 audit. tag `speaker:a/b` vs `counterpartyRef:제_남편/제_아내` 정합 검증.
   - d-1, h-d3, h-d4의 a-/b- variants도 sample audit (d-2만 swap인지 전체 swap인지).
   - 다른 case (family-01, friend-01) variants도 영향 검증.

2. **엔진 dispatch 검증**:
   - `src/engine/llmDialogueResolver.ts` / `llmFreeQuestion.ts` / `useActionDispatch.ts` / `DiscoveryFeedbackWatcher.tsx`의 variant fetch + portrait/listener party 매핑 흐름 trace.
   - id prefix 우선인지 tag `speaker:*` 우선인지 정책 식별.
   - 이준호 대상 질문 후 답변 fetch 실패하는 시나리오 확인 (예: variants가 매핑 안 됨 / fallback skip / 타이밍 race).

3. **재현**:
   - spouse-01 d-2 영역 진행: motive_search depth 1 (이준호 대상) → fact_pursuit depth 1 (박지연 대상). 재현 단계 정리.

### 3.2. Fix

진단 결과에 따라:

- **데이터 swap이면**: a-d-2-* / b-d-2-* variants의 tag (또는 콘텐츠) swap 정정. 4언어 sync 필요 시 의뢰서 후속.
- **엔진 매핑 오류면**: 매핑 로직 fix. 데이터 변경 X.
- **dispatch skip이면**: 이준호 답변 fetch 흐름 보강 (예: fallback variant, 타이밍 보장).

Fix 적용 후 동일 시나리오 재현으로 검증.

### 3.3. 검증

```bash
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs       # baseline 유지
run-pc.bat                               # 직접 PC 플레이로 spouse-01 d-2 영역 재현
```

---

## 4. 작업 환경

### 4.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-d2-bug -b codex/d-2-listener-mapping 24bb72a8
```

### 4.2. 산출물

- Fix 적용 commit (단일 또는 진단 + fix 분리)
- 결과 문서: `docs/design/bug-d-2-listener-mapping-result.md`
  - 진단 결과 (가설 1/2/3 중 어느 쪽)
  - 영향 범위 (d-2만 / 전체 case / 전체 engine)
  - 적용 fix 영역
  - 4언어 sync 필요 영역 (있다면 별도 의뢰서 권고)

---

## 5. 안전 규칙

- ✅ READ from `src/`, `docs/`
- ✅ WRITE to `src/data/scriptedText/*.json` (데이터 fix)
- ✅ WRITE to `src/engine/`, `src/hooks/`, `src/components/pc/feedback/` (엔진 fix)
- ❌ origin/main push
- ❌ glossary 수정
- ❌ Phase 1 산출물 영역 수정 (이미 commit됨, baseline)
- ❌ Phase 2 reports/ 영역 수정 (Phase 2 thread 영역)

---

## 6. 우선순위

**P0** — 게임 진행 흐름 영향. PC QA에서 사용자 직접 발견. 12 thread 운영과 병렬 진행 권장. Phase 2 cycle 종료 전 fix 권장.

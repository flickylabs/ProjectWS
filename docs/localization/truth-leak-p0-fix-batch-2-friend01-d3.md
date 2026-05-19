---
name: truth-leak-p0-fix-batch-2-friend01-d3
description: matrix d-3 broaden 후 신규 catch 27건 중 8 entries (judge_question 7 + judge_contradiction 1) 4-lang 추상화 의뢰서. judge_evidence_combo 2건은 별개 tag 보강 task.
metadata:
  origin: claude (CT main thread)
  anchor: 06e15594
  severity: P0 (게임 핵심 원칙 위반 — feedback_truth_leak_prohibition)
---

# Truth-Leak P0 Fix Batch 2 — friend-01 d-3 (4언어 일괄)

Anchor: `06e15594`

---

## 1. 배경

직전 `2e8c1504` (d-3 broaden) 적용 → detect-truth-leak 29 신규 catch 발견.

이후 `06e15594` (detector schema 확장 + protective_silence tag 추가) 적용 → 6 디자인 의도 자동 skip → 잔여 27 P0.

본 의뢰는 27 catches 중 **8 entries 25 catches** (judge_question 7 + judge_contradiction 1) 4-lang 추상화. judge_evidence_combo 2건은 D3 별개 task로 분리.

기준 메모리:
- [[feedback-truth-leak-prohibition]] — 잘못 패턴 #9 (재판관 채널 진실 노출 금지)
- [[feedback-claude-ko-needs-codex-multilang]] — 4-lang sync 필수
- 직전 의뢰서 [[truth-leak-p0-fix-batch]] — 동일 패턴 (이미 적용)

---

## 2. P0 Fix 대상 8 entries

### 2.1. judge_question entries (7건)

모두 `src/data/scriptedText/friend-01.{ko,en,ja,zh-CN}.json` 영역.

#### A. judge_question.entries[25].variants[0]
- 4-lang 모두 catch
- key: `d-3|fact_pursuit|2` (depth=2 fact_pursuit, target=b)
- KO text: "최수민 씨, 현재의 **돈을 빌려 달라**는 말과 과거 경험이 닮았다고 본 근거를 말씀해 주십시오."
- 영역: 최수민 → 송다은 측 돈 요구 패턴 비교 → d-3 진실 노출

#### B. judge_question.entries[26].variants[0]
- 4-lang 모두 catch
- key: `d-3|motive_search|2` (depth=2 motive_search, target=b)
- KO text: "최수민 씨, 반복되는 **돈을 빌려 달라**는 말의 순서를 과거와 현재로 나눠 설명하십시오."

#### C. judge_question.entries[29].variants[1]
- 4-lang 모두 catch
- KO text 확인: "송다은 씨, **돈을 빌려 달라**는 말을 가족 간 도움으로만 보려 한 이유는 무엇입니까."

#### D. judge_question.entries[31].variants[2]
- 4-lang 모두 catch
- (entries[31] = d-3 별도 entry)

#### E. judge_question.entries[32].variants[0]
- 4-lang 모두 catch

#### F. judge_question.entries[24].variants[4]
- ja + ko catch만 (en/zh-CN은 추상 표현 사용했음 — 부분 정렬됨)
- KO text: "송다은 씨, 그 **돈을 빌려 달라**는 말이 결혼 준비와 어떻게 맞물렸습니까."

#### G. judge_question.entries[26].variants[4]
- ko + zh-CN catch만
- KO text: "송다은 씨, 아버지의 **돈을 요구**한 흐름을 지금도 오해라고 보십니까."

### 2.2. judge_contradiction entries (1건)

#### H. judge_contradiction.entries[6].variants[2]
- ko only catch
- KO text: "두 분, **돈을 빌려 달라**는 말의 현재 기록과 과거 기억이 만나는 지점을 정리해 주십시오."
- en/ja/zh-CN 같은 entry는 이미 추상 표현 사용 (catch X) — KO만 정책 위반

---

## 3. 추상화 권고 패턴

d-3 hidden truth keyword 제거 + 의미 보존:

| 노출 keyword | 추상화 후보 |
|---|---|
| 돈을 빌려 달라 / 돈을 빌려달라 | 돈 관련 발언 / 자금 부탁 정황 / 금전 관련 발언 |
| 돈을 요구 (한 흐름) | 돈 관련 흐름 / 자금 관련 흐름 |
| borrow money / request for money | financial discussion / money-related conversation |
| 金を貸して(ほしい) | 金銭関連の発言 / 資金関連の話 |
| 借钱 / 要钱 | 金钱相关的话 / 资金相关的发言 |

각 entry 의미상 보존해야 할 핵심:
- A/B (최수민 측): 과거-현재 패턴 비교 → "패턴 / 흐름"으로 추상
- C: 송다은 측 시각 → "정황 / 발언" 추상
- D/E/F: 결혼 준비 + 시점 관계 → 시점 정황만 보존
- G: 송다은 측의 흐름 해석 의문 → "흐름" 보존
- H: 양측 현재-과거 정합 → "발언 / 정황 정합"

ko 추상화 우선, 외국어는 이미 부분 추상화된 entries 정렬 검토.

---

## 4. 4-lang sync 정책

- **모든 entries × 모든 lang 검토**: catch 없는 lang도 KO 새 의미와 정렬 확인 (의미 통일 — `feedback_claude_ko_needs_codex_multilang`).
- entries[24].v[4] / entries[26].v[4] 같은 partial-catch entries: catch 없는 lang은 이미 안전한 추상이나 KO 새 안과 의미 정렬 필요.
- entries[6].v[2] judgec ko-only: 외국어 그대로 두기 (이미 안전) + KO만 추상화 또는 외국어도 KO 새 안에 더 가깝게 정렬.

---

## 5. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs
```

**기대 결과**:
- truth-leak findings: 27 → **2** (judge_evidence_combo 2건만 잔존, D3 task 영역)
- byCase: friend-01:2
- byLang: ko:2
- tsc/qa:fast P0=0 유지

---

## 6. 작업 환경

### 6.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-truth-leak-p0-batch2 -b codex/truth-leak-p0-fix-batch2 06e15594
```

### 6.2. 산출물

- Fix commit (entry별 또는 일괄)
- `docs/localization/truth-leak-p0-fix-batch-2-result.md`
  - 각 entry 변경 전/후 4-lang
  - 추상화 패턴 결정 근거
  - 의미 보존 검증
  - detect-truth-leak before/after

---

## 7. 안전 규칙

- ✅ READ: `src/data/scriptedText/friend-01*.json`, matrix.json, 결과 보고서
- ✅ WRITE: `src/data/scriptedText/friend-01.{ko,en,ja,zh-CN}.json` (8 entries 위치만)
- ❌ matrix.json 수정 — 별개 task
- ❌ scriptedAngles 수정 — 영역 외
- ❌ judge_evidence_combo entries 수정 — D3 별개 task (tag 보강 방향)
- ❌ family-01 / spouse-01 수정 — 영역 외
- ❌ origin/main push
- ❌ glossary 수정

---

## 8. 우선순위

**P0** — 게임 핵심 원칙 위반. d-3 truth 누출 8 entries × 4-lang sync. 본 의뢰 완료 시 truth-leak baseline 2 (judgeec 영역만, D3 처리 대기).

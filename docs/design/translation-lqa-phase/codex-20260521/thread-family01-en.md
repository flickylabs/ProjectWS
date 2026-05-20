---
name: thread-family01-en
description: 2026-05-21 witness/case-data/cutscene KO 변경 다국어 적용 — family-01 EN (영역 최대)
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror + case truth correction
---

# Thread — family-01 EN

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 family-01 영역 + §3 family-01 case data 진실 정정 + §4 cutscene family-01 5 dispute의 **EN 적용**을 담당.

⚠️ **영역 최대** — case truth 정정이 포함되어 진실 누설 검증 필수.

---

## 1. 작업 범위

### 1.1. Witness overlay (en) — 13 slot

`src/data/witnessTestimonyData/localized.ts` 안의 `FAMILY_01_OVERLAYS.en`:

w-1 (최복순):
- `w1-d2-before-brother-arrives` (KO 변경)
- `w1-d3-avoid-conflict` ⭐ (KO 변경 + 매핑 d-5→d-4)

w-2 (김영수 공증인) — **출장 공증인 sweep 전체 적용**:
- `w2-d1-two-visits` (topic/question/testimony 모두 변경)
- `w2-d1-document-balance` (topic/question/testimony)
- `w2-d2-same-submitter` (topic/question/testimony) — "두 번째 방문 때 어머니 상태"로 영역 전환
- `w2-d2-ratio-change` (topic/question/testimony) — "비율 변경에 대한 인상"
- `w2-d3-benefit-direction` ⭐ (topic/question/testimony) — "수정 과정의 인상"

w-3 (박순애):
- `w3-d1-living-support`
- `w3-d1-secret-burden`
- `w3-d2-money-nature` (topic/question/testimony) — "큰아들 공장 위기와 해결 경위"
- `w3-d2-secret-reason`
- `w3-d3-why-kept-secret` ⭐ — **"아버지 친자가 아닌 것" 정확 번역 필수** (절대 윤정후를 가리키게 X)

base 의뢰서 §2 family-01 표 EN 가이드 그대로.

### 1.2. Case data 다국어 mirror — `src/data/cases/generated/family-01.en.json`

base 의뢰서 §3에 명시된 6 truth 영역 EN 적용:

1. partyB(윤정후) dailyRoutine — "the family factory that their parents originally intended to pass to him" / "yielded it to his older brother" / "started a small auto-parts shop himself"
2. d-3 truthDescription — "when the family factory he had yielded ran into crisis in his brother's hands"
3. **d-4 truthDescription** — 핵심 정정: "Yoon Tae-seong (the older brother) is not Father's biological son" + "from Mother's perspective, both sons were equally her children" + "Yoon Jeong-hu, who is the biological son, yielded the family factory to his brother despite knowing this" + "his proud older brother"
4. evidence e-7 restore_context — 같은 진실 의미
5. truthTable t-4 — 같은 정정
6. officialRecordRecommendations 4번 — "knew this and still yielded the family factory to his brother, and even altered the will to reduce his own share in order to protect his proud older brother"
7. evidence e-7 v3DepthPlan summary — "biological-son relationship hint" / "biological-son confirmation sentence and Mother's regret connected to the factory-yield record"
8. evidence-2 restore_context — "notary's home visit"

JSON 구조는 KO와 동일 위치. 변경된 KO 진실 영역만 정확하게 EN으로 mirror. 그 외 영역은 stale 유지하지 말고 변경 X 그대로.

### 1.3. Cutscene phase2 (en) — 5 dispute

`src/data/cutsceneText/family-01/{d-1, d-2, d-3, d-4, d-5}.json` → `slip_explosive.phase2.en`

base 의뢰서 §4 family-01 5 dispute EN 톤 가이드.

KO 원문 (참고):
- d-1: "그게... 어머니가 헷갈리실 때마다 옆에서 정리해드리려던 것뿐인데, 형님은 일로 바쁘셨고 종이 정도는 제가 충분히... 아닙니다, 그건 변명이 되네요."
- d-2: "그게... 어머니 자필이 그대로 남았으면 형이 그걸 보고 무너졌을 거예요. 그래서 일반적인 수준으로 낮춘 거였는데, 그래도 손댄 건 손댄 거고..."
- d-3: "그게... 형이 어머니 돈으로 받았다고 믿어야 자존심이 안 무너졌어요. 제 이름이 보이는 순간 다른 질문이 따라왔을 거고, 그게 결국 형의..."
- d-4: "그게... 일기장 그 한 줄은 형이 보면 안 됐어요. 형이 자존심으로 평생 버텨온 자리인데, 그걸 한 번에 잃으면 형은 더 이상..."
- d-5: "그게... 저도 어머니 뜻을 그대로 두지 못한 건 마찬가지예요. 형을 보호한다고 했지만, 결국 어머니 글씨 위에 제 글씨를 얹은 것이고..."

### 1.4. scriptedText family-01.en.json 검토

`src/data/scriptedText/family-01.en.json` 안에서 변경된 KO truth 영역 (특히 공장 양보 / 친자 / 일기) 관련 문장이 있다면 EN과 일치하는지 검토. 어긋난 부분만 수정.

---

## 2. 안전 규칙

- ✅ WRITE: family-01 EN 영역만
- ❌ KO 정본 (family-01.ts, family-01.json, cutsceneText ko 키) 수정 X
- ❌ JA / ZH-CN 영역 X
- ❌ spouse / friend 영역 X
- ❌ glossary / truth-leak-matrix X
- ❌ origin push X

---

## 3. 검증 — 진실 누설 zero tolerance

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs    # 0건 baseline 유지 — 회귀 시 stop
npm run qa:lqa                        # verify pass
```

⚠️ **d-4 truth 정정 영역**에서 "Yoon Jeong-hu is not the biological son" 같은 역방향 오류 발생하지 않게 검증. 박순애 testimony "본인이 아버지 친자가 아닌 것을 눈치채고"의 주어는 **윤태성 본인** (he himself = the older brother).

---

## 4. 작업 환경

### 4.1. Worktree

```powershell
git fetch
git worktree add D:/solomon-codex-family-en -b codex/witness-cutscene-family-en afbc7c4b
cd D:/solomon-codex-family-en
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-family-en
```

### 4.2. 산출물

- WRITE commits (witness / case data / cutscene 분리 가능)
- `docs/design/translation-lqa-phase/codex-20260521/result-family01-en.md` — 변경 요약 + truth-leak 검증 결과

---

## 5. 우선순위

P0 (case truth 정정) + P1 (mirror). 본 thread는 진실 정정이 포함되어 검증 가장 신중하게.

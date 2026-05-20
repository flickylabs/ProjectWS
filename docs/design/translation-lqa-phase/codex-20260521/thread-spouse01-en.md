---
name: thread-spouse01-en
description: 2026-05-21 witness/cutscene KO 변경 다국어 적용 — spouse-01 EN
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
  severity: KO 변경 mirror (P1 = stale overlay 해소)
---

# Thread — spouse-01 EN

Anchor: `afbc7c4b` (main HEAD).

본 thread는 [base 의뢰서](../codex-20260521-witness-family-cutscene-multilang.md) §2 spouse-01 영역 + §4 cutscene spouse-01 4 dispute의 **EN 적용**을 담당.

---

## 1. 작업 범위

### 1.1. 변경된 KO slot (witness — overlay 갱신)

`src/data/witnessTestimonyData/localized.ts` 안의 `SPOUSE_01_OVERLAYS.en` 영역에서 다음 slot 갱신:

| slot id | 비고 |
|---|---|
| `w1-d1-resident-info` | KO 변경 |
| `w1-d1-no-single-woman` | KO 변경 |
| `w1-d1-core` ⭐ | KO 변경 (결정타, "집주인 분께서 숨기시는 듯" / 작은아버지 호칭) |
| `w2-d2-cash-pattern` | KO 변경 (창구 출금 추가) |
| `w2-hd3-signature-doubt` | KO 변경 (부부니까 통과) |
| `w2-hd3-core` ⭐ | KO 변경 ("남편 분이 오셔서" 주체 명시) |

base 의뢰서 §2 spouse-01 표의 EN 가이드 그대로 따름.

### 1.2. 변경된 cutscene slip phase 2 (en 키 갱신)

`src/data/cutsceneText/spouse-01/`:
- `d-1.json` → `slip_explosive.phase2.en`
- `d-2.json` → 동일
- `h-d3.json` → 동일
- `h-d4.json` → 동일

base 의뢰서 §4 spouse-01 4 dispute의 EN 톤 가이드 ("It's just that..." → trailing ellipsis) 따름.

KO 원문 (참고):
- d-1: "그게... 형 일을 끌어들이지 않으려고 입을 닫은 건데, 그렇게 보일 수 있다는 걸 저도 알았어요. 그래서 더 설명을 못 했고..."
- d-2: "그게... 처음엔 잠깐만 막아주고 갚을 거라 했어요. 그러다 한 번이 두 번이 되고, 지연이한테 말할 타이밍은 자꾸 미뤄지고..."
- h-d3: "그게... 수익만 받고 바로 빼낼 생각이었어요. 그런데 그 채팅방이 사라지고 나서야, 제가 한 짓의 무게가 보이기 시작했고..."
- h-d4: "그게... 신혼 초부터 계좌를 본 건 사실이에요. 그래도 그게 다 준호 탓이라고는 못 하겠어요. 마지막 서류를 움직인 건 결국 제 손이었고..."

### 1.3. (조사) spouse-01.en.json mirror 영역

`src/data/cases/generated/spouse-01.en.json` / `src/data/scriptedText/spouse-01.en.json` 안에 본 batch에서 변경된 KO 영역(예: 변경된 witness testimony surface text나 cutscene confession 영역)의 EN mirror가 있다면 검토. 없으면 skip.

---

## 2. 안전 규칙

- ✅ WRITE: 위 1.1 ~ 1.3 EN 파일 영역
- ❌ KO 정본 (`spouse-01.ts`, cutsceneText.ko, etc.) 수정 X
- ❌ JA / ZH-CN overlay 수정 X (다른 thread)
- ❌ family / friend 영역 수정 X
- ❌ `glossary.csv`, `truth-leak-matrix.json` 수정 X
- ❌ origin push X

---

## 3. 검증

각 적용 후:
```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs    # 0건 baseline 유지
```

---

## 4. 작업 환경

### 4.1. Worktree

```powershell
git fetch
git worktree add D:/solomon-codex-spouse-en -b codex/witness-cutscene-spouse-en afbc7c4b
cd D:/solomon-codex-spouse-en
git config user.name "codex"
git config user.email "codex@anthropic.local"
git config commit.gpgsign false
git config --global --add safe.directory D:/solomon-codex-spouse-en
```

### 4.2. 산출물

- WRITE commit (1~3 commit 분리 가능)
- `docs/design/translation-lqa-phase/codex-20260521/result-spouse01-en.md` — 변경 요약 + 검증 결과

---

## 5. 우선순위

P1 — KO 변경 mirror. 사용자가 직접 작성한 KO 25 slot + cutscene 14 dispute의 EN 외국어 일관성 유지.

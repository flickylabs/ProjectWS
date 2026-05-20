---
name: codex-20260521-integration-report
description: 2026-05-21 9 thread (case+lang) Codex 통합 결과 — cherry-pick + 충돌 union resolve + 4단계 검증 모두 PASS
metadata:
  origin: claude (CT main thread)
  anchor: afbc7c4b
---

# Integration Report — 2026-05-21 9 thread 통합 완료

base anchor: `afbc7c4b`
final HEAD: `02345a17`
total commits: 14 (cutscene 구조 1 + Codex 9 thread 11 commits + main resolve 3)

---

## §1. cherry-pick 순서 + 결과

| # | Commit | branch | 충돌 | 영역 |
|---|---|---|---|---|
| 1 | eaf256a7 | (main) | — | Cutscene 구조 수정 (phase 2/3 분리, slip 위치, word-break) |
| 2 | 63d76749 | spouse-en | — | spouse-01 EN cutscene phase2 |
| 3 | 4c03f5d8 | spouse-ja | ✓ union (4 파일) | spouse-01 JA witness + cutscene |
| 4 | c6fdff99 | spouse-zh | ✓ union (4 파일) | spouse-01 ZH-CN witness + cutscene |
| 5 | f60066d3 | family-en | — | family-01 EN cutscene phase2 |
| 6 | e908c58a | family-en | — | family-01 EN result.md |
| 7 | 3e003d30 | spouse-en | — | spouse-01 EN witness mirrors (누락 backfill) |
| 8 | 4af612ba | family-en | — | family-01 EN witness overlays |
| 9 | 2b5075f5 | family-en | — | family-01 EN case truth data |
| 10 | b0b26b7c | family-ja | ✓ union (5 파일) | family-01 JA witness + case + cutscene + scriptedText |
| 11 | 8d0b5c78 | family-zh | ✓ union (5 파일) | family-01 ZH-CN witness + case + cutscene + scriptedText |
| 12 | 9bbf8416 | friend-en | — | friend-01 EN witness + cutscene |
| 13 | 9b017a1f | friend-ja | ✓ union (5 파일) | friend-01 JA witness + cutscene |
| 14 | 02345a17 | friend-zh | ✓ union (5 파일) | friend-01 ZH-CN witness + cutscene |

### 1.1. 충돌 영역 + resolve 방식

총 23개 cutsceneText 파일 (spouse 4 + family 5 + friend 5 × ja/zh) 충돌 발생.

**원인**: 9 thread 모두 같은 `cutsceneText/{case}/{dispute}.json` 파일의 `slip_explosive.phase2` 객체 내 인접 lang key를 수정. cherry-pick 시 file-level conflict.

**resolve**: 의미적 conflict X (각 lang key가 독립적) — manual union으로 모든 lang의 새 텍스트 결합.

**localized.ts**: auto-merge 성공 (case overlay 블록이 충분히 떨어져 있어 file-level conflict X).

---

## §2. 통합 검증 결과

```
npx tsc -b --noEmit              ✅ PASS
npm run qa:fast                  ✅ static P0=0, route P0=0, RELEASE READY
node scripts/detect-truth-leak   ✅ 0건 (KO/EN/JA/ZH-CN 모두)
npm run qa:cutscene              ✅ P0=0 (P1=159, length 변화 + emdash 패턴 — 의도)
```

### 2.1. truth-leak zero tolerance 통과

family-01 d-4 truth 정정 영역 (윤정후 배다른 → 윤태성 친자 X)에서 다국어 회귀 발견되지 X. 박순애 testimony 주체 ("본인" = 윤태성)도 EN/JA/ZH-CN 모두 정확히 큰아들 시점으로 적용됨.

### 2.2. qa:cutscene P1 분석

P1=159 (baseline P1=130 → +29):
- `length:slip_phase2`: 27 → 56 (+29) — 사용자 요청대로 phase 2를 1줄 placeholder에서 2-3문장 dismay로 보강한 결과. **의도된 증가**.
- `pattern:slip_phase2_emdash`: 14 — phase 2가 "...—" 패턴 종료 안 함 (사용자 요청 "그게..." trailing ellipsis). 의도된 변경.

P0=0이라 출시 차단 X.

---

## §3. 영역별 적용 통계

### 3.1. Witness testimony overlay (localized.ts)

| Case | EN | JA | ZH-CN | 총 slot |
|---|---|---|---|---|
| spouse-01 | 6 | 6 | 6 | 18 |
| family-01 | 13 | 13 | 13 | 39 |
| friend-01 | 12 | 12 | 12 | 36 |
| **소계** | **31** | **31** | **31** | **93** |

### 3.2. Cutscene phase 2 dismay (cutsceneText/{case}/*.json)

| Case | 영역 | EN | JA | ZH-CN |
|---|---|---|---|---|
| spouse-01 | 4 dispute (d-1, d-2, h-d3, h-d4) | ✅ | ✅ | ✅ |
| family-01 | 5 dispute (d-1~d-5) | ✅ | ✅ | ✅ |
| friend-01 | 5 dispute (d-1~d-5) | ✅ | ✅ | ✅ |

총 14 dispute × 3 lang = 42 phase 2 dismay 다국어 적용.

### 3.3. family-01 case data 진실 정정 mirror

| Lang | 영역 | 결과 |
|---|---|---|
| EN | 6 truth 영역 + e-2 sweep + e-7 v3DepthPlan + scriptedText.en 318 lines sweep | ✅ 일관 적용 |
| JA | 동일 영역 + scriptedText.ja | ✅ 일관 적용 |
| ZH-CN | 동일 영역 + scriptedText.zh-CN | ✅ 일관 적용 |

**핵심 정정**: "윤정후가 배다른 자식" → "Yoon Tae-seong is not Father's biological son" / "尹泰成が父の実子ではない" / "尹泰成不是父亲亲生" 모두 정확.

**공장 양보 맥락**: "친자인 윤정후가 그 사실을 알고도 가업 공장을 형에게 양보" → "Yoon Jeong-hu, who is the biological son, yielded the family factory to his brother despite knowing this" / 그 외 lang 모두 일관 적용.

---

## §4. 변경 파일 (afbc7c4b → 02345a17, 14 commits)

- `src/components/discovery/TruthRevealCutscene.tsx` (1 file) — slip 3단계 분리 로직
- `src/app/index.css` (1 file) — phase-1 위치 + word-break: keep-all
- `src/data/witnessTestimonyData/localized.ts` (1 file × 9 case+lang 영역)
- `src/data/cutsceneText/{spouse-01, family-01, friend-01}/*.json` (14 files × 3 lang phase2)
- `src/data/cases/generated/family-01.{en, ja, zh-CN}.json` (3 files)
- `src/data/scriptedText/family-01.{en, ja, zh-CN}.json` (3 files)
- `src/data/scriptedText/spouse-01.en.json` (1 file)
- `src/data/cases/generated/{spouse-01, friend-01}.en.json` (2 files)
- 9 thread result md (`docs/.../codex-20260521/result-{case}-{lang}.md`)

---

## §5. 후속 결정 대기

### 5.1. origin push

미push 누적: cf41ce93 + afbc7c4b + 14 cherry-pick commits = 16 commits. 사용자 결정 대기.

### 5.2. Worktree cleanup

9 worktree (`D:/solomon-codex-{case}-{lang}`) + 9 branch (`codex/witness-cutscene-{case}-{lang}`) 모두 정상 종료. 보존 여부 사용자 결정.

cleanup 명령 (필요 시):

```powershell
$worktrees = @(
  "D:/solomon-codex-spouse-en", "D:/solomon-codex-spouse-ja", "D:/solomon-codex-spouse-zh",
  "D:/solomon-codex-family-en", "D:/solomon-codex-family-ja", "D:/solomon-codex-family-zh",
  "D:/solomon-codex-friend-en", "D:/solomon-codex-friend-ja", "D:/solomon-codex-friend-zh"
)
foreach ($wt in $worktrees) { git worktree remove $wt --force }
$branches = @(
  "codex/witness-cutscene-spouse-en", "codex/witness-cutscene-spouse-ja", "codex/witness-cutscene-spouse-zh",
  "codex/witness-cutscene-family-en", "codex/witness-cutscene-family-ja", "codex/witness-cutscene-family-zh",
  "codex/witness-cutscene-friend-en", "codex/witness-cutscene-friend-ja", "codex/witness-cutscene-friend-zh"
)
foreach ($br in $branches) { git branch -D $br }
```

### 5.3. dev 시각 확인

컷씬 구조 변경 (slip 3단계 분리 + 빨간 글씨 위치 + word-break) 시각 확인 추천 — dev 서버에서 직접 truth_reveal_slip 컷씬 재생.

---

## §6. 관련 메모리

- [[session-handoff-20260521-witness-truth-cutscene-complete]] — 본 batch KO 영역 (afbc7c4b)
- [[feedback-codex-worktree-safe-directory]] — worktree spawn 패턴 (이번 9 worktree 정상)
- [[feedback-claude-ko-needs-codex-multilang]] — KO 변경 다국어 의뢰 원칙 (이번 적용)
- [[design-spouse01-truth-disclosure-policy]] — spouse 노출 정책 (truth-leak 0건 검증)
- [[design-truth-leak-keyword-nature]] — hidden keyword (family-01 d-4 정정 영역)

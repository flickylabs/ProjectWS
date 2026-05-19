---
name: thread-phase2-fix-family01-en
description: Phase 2 LQA fix cycle hot 영역 우선 진행 — family-01 EN 45 P0 + 163 P1 = 208 entries Codex single thread 적용 의뢰서. CSV recommendation 컬럼 기준 target_text 치환 + 검증.
metadata:
  origin: claude (CT main thread)
  anchor: 278767e4
  severity: P0 (외국어 LQA 누적 부채 해소)
---

# Phase 2 P0 Fix — family-01 EN Hot Batch 의뢰서

Anchor: `278767e4`

---

## 1. 배경

Phase 2 LQA cycle (commit 9dc12c0b~a868f6c5) 결과 12 CSV에 외국어 issue 발견:
- 총: 108 P0 / 407 P1 / 51 P2
- Hot 영역 = **family-01 EN (45 P0 / 163 P1 / 0 P2 = 208 entries)** — 다른 CSV 대비 5배 이상.

본 의뢰는 사용자 결정 "Hot 영역 먼저"에 따라 family-01 EN 208 entries 단일 thread 일괄 적용.

기준 메모리:
- [[feedback-revision-meaning-over-form]] — 보정 = 9차원 맥락-의미 정확성. 단순 어휘 교체 X.
- [[feedback-claude-ko-needs-codex-multilang]] — 본 의뢰는 EN 단독이므로 EN sync만 진행.

---

## 2. 입력

### 2.1. CSV (Phase 2 산출)

**파일**: `docs/design/translation-lqa-phase/reports/family-01_en.csv`

**Header**: `row_id,source_ko,target_text,category,issue_dim,severity,option_a,option_b,recommendation,confidence,notes`

**208 entries 구성**:
- P0=45, P1=163, P2=0
- row_id prefix 분포:
  - `family-01-a-*` (party A 박지연 측 발화): 100 entries
  - `family-01-b-*` (party B 윤정후 측 발화): 87 entries
  - `family-01-angle-*` (angle catalog): 12 entries
  - `family-01-witnessName*`: 3 entries
  - `family-01-mediation*`: 3 entries
  - `family-01-{number}-*` (dossier/judgec/judgeec): 3 entries

### 2.2. row_id → target 파일 매핑

- `family-01-a-*`, `family-01-b-*`: `src/data/scriptedText/family-01.en.json` 또는 `src/data/scriptedAngles/family-01_interrogation_answers.en.json` (id 검색)
- `family-01-angle-*`: `src/data/scriptedAngles/family-01_angle_catalog.en.json`
- `family-01-witnessName*`: `src/data/scriptedText/family-01.en.json` witness 채널 또는 case JSON
- `family-01-mediation*`: `src/data/scriptedText/family-01.en.json` mediation 채널
- `family-01-{number}-*`: 숫자 기반 row_id는 entry index/order — Codex가 row_id ↔ source_ko 매치로 정확 위치 식별

---

## 3. 작업

### 3.1. P0 우선 (45 entries)

각 P0 row에 대해:
1. row_id로 target 파일에서 entry 식별.
2. CSV `recommendation` 컬럼 (a 또는 b) 확인 → 해당 option_x 컬럼 값 채택.
3. JSON 파일의 target_text 필드 교체.
4. 9차원 의미 검증 ([[feedback-revision-meaning-over-form]]):
   - 캐릭터 인지 단계 보존 (lieState 진행)
   - 추궁 차원 (정보/동기/책임) 의미 보존
   - source_ko 톤/뉘앙스 보존

### 3.2. P1 후순위 (163 entries)

P0 완료 + tsc/qa:fast 통과 후 P1 일괄 적용.

### 3.3. P2 (0 entries)

해당 없음.

### 3.4. issue_dim 별 처리 가이드

CSV `issue_dim` 컬럼 (D1~D9):
- **D1 (game flow / lieState)**: lieState 진행 맥락 보존 검증 필수
- **D2 (consistency)**: glossary/용어 일관성
- **D3 (archetype voice)**: 캐릭터 발화 스타일 보존
- **D4 (meter)**: 사실/감정/책임 미터 영향
- 기타 차원: notes 참조

### 3.5. recommendation confidence 처리

- `confidence >= 0.85`: 추천 옵션 그대로 적용
- `confidence 0.6~0.85`: 추천 옵션 적용 + Codex 자체 retouch 가능
- `confidence < 0.6`: Codex 재작성 권장 (option_a/b 모두 부족 시 새 안 작성)

---

## 4. 검증

```powershell
npx tsc -b --noEmit
npm run qa:fast
node scripts/detect-truth-leak.cjs       # baseline 유지
npm run qa:lqa                           # 누적 strict 이슈 60,463 baseline에서 감소 기대
```

**기대 결과**:
- tsc PASS
- qa:fast P0=0 유지
- truth-leak: 본 의뢰 적용 전 후 동일 (P0 truth-leak 의뢰서 [[truth-leak-p0-fix-batch]]와 별개)
- qa:lqa: family-01 en 영역 verify-translations 이슈 감소 (정확 수치는 Codex 산출)

---

## 5. 작업 환경

### 5.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-phase2-family01-en -b codex/phase2-fix-family01-en 278767e4
```

### 5.2. 산출물

- Fix commits (P0 batch + P1 batch 분리 권장)
- `docs/design/translation-lqa-phase/reports/family-01_en_applied.csv`
  - 원본 CSV + 새 컬럼 `applied_text`, `applied_decision` (recommendation 그대로 / retouch / 재작성)
  - skip 행은 `applied_decision = "skip"` + 이유
- `docs/design/translation-lqa-phase/family-01-en-fix-result.md`
  - P0/P1 적용 건수
  - skip 건수 + 이유
  - 9차원 검증 메모
  - tsc/qa:fast/lqa 결과

---

## 6. 안전 규칙

- ✅ READ: `docs/design/translation-lqa-phase/reports/family-01_en.csv`, `src/data/scriptedText/family-01*.json`, `src/data/scriptedAngles/family-01_*.json`
- ✅ WRITE: `src/data/scriptedText/family-01.en.json`, `src/data/scriptedAngles/family-01_*.en.json` (EN만)
- ✅ WRITE: `docs/design/translation-lqa-phase/reports/family-01_en_applied.csv` (산출물)
- ❌ KO 원문 (`family-01.json` 등) 수정 X
- ❌ 다른 case (spouse/friend) 또는 다른 lang (ja/zh-CN) 수정 X
- ❌ matrix / truth-leak 파일 수정 X (별개 task)
- ❌ glossary 수정 X
- ❌ origin/main push

---

## 7. 우선순위

**P0** — 외국어 LQA 누적 부채 60,463건 중 family-01 en hot 영역 우선 해소. 본 의뢰 완료 후 다음 hot (friend-01 en 18 P0 / 38 P1 또는 spouse-01 ja 12 P0) cycle 결정.

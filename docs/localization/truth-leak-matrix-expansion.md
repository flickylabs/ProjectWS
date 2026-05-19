---
name: truth-leak-matrix-expansion
description: truth-leak matrix 확장 — family-01 d-1/d-2/d-3/d-5 + friend-01 d-1~d-5 + spouse-01 d-1/d-2 hidden/surface 키워드 4언어 추가. detect-truth-leak 커버리지 강화.
metadata:
  origin: claude (CT main thread)
  anchor: 8a17acb8
  parent_handoff: session_handoff_20260519_post_lqa_phase0 §B
  target_file: docs/localization/non-dialogue-extract/truth-leak-matrix.json
---

# truth-leak Matrix 확장 의뢰서

Anchor: `8a17acb8`
대상 파일: `docs/localization/non-dialogue-extract/truth-leak-matrix.json`
검출 스크립트: `scripts/detect-truth-leak.cjs`
정책 참조: `feedback_truth_leak_prohibition` — judge/system/dossier 채널에서 NPC 자백 전 진실 콘텐츠 직접 언급 금지.

---

## 1. 현재 상태

```json
{
  "spouse-01": { "h-d3": { ... }, "h-d4": { ... } },  // 2/4 disputes covered
  "family-01": { "d-4":  { ... } }                     // 1/5 disputes covered
  // friend-01 entire case missing                      // 0/5 disputes
}
```

총 dispute 14개 중 **현재 cover = 3개**. 미커버 = **11개**.

---

## 2. 확장 대상

### 2.1. spouse-01 추가 (2 disputes)

| Dispute | 위치 | 메모 |
|---|---|---|
| `d-1` | spouse-01.json line 268 | 박지연/이준호 visible dispute. hidden truth 영역 식별 후 키워드 추출. |
| `d-2` | spouse-01.json line 297 | 동상. |

기존 `h-d3` / `h-d4` 패턴 따라 hidden + surface 키워드 4언어 작성.

### 2.2. family-01 추가 (4 disputes)

| Dispute | 위치 | 메모 |
|---|---|---|
| `d-1` | family-01.json line 268 | 윤태성/윤정후 형제 분쟁 visible. hidden 영역 식별. |
| `d-2` | family-01.json line 296 | 동상. |
| `d-3` | family-01.json line 335 | 동상. |
| `d-5` | family-01.json line 411 | 동상. |

기존 `d-4` 패턴 따라.

**주의**: family-01 dc-4 dossier "출생 비밀" 직접 언급 3건 (post_lqa_phase0 §C.1 미해결)이 family-01의 hidden 영역 핵심. 디자인 의도 vs 정책 위배 판단 보류 중. matrix 작성 시 "출생 비밀" 관련 키워드는 reviewer 노트로 표시 + 사용자 판단 대기.

### 2.3. friend-01 신규 (5 disputes)

| Dispute | 위치 | 메모 |
|---|---|---|
| `d-1` | friend-01.json line 263, `"9일간의 연락 의도"` | hidden = 송다은 아버지 돈 접근 패턴 경고. surface = 9일간 연락 사실. |
| `d-2` | friend-01.json line 291, `"예비신랑의 선 넘는 접근"` | hidden = 예비신랑 선 넘는 메시지 + 거절. surface = 예비신랑과 메시지 교환. |
| `d-3` | friend-01.json (검색 필요) | hidden/surface 식별 필요. |
| `d-4` | friend-01.json (검색 필요) | 동상. |
| `d-5` | friend-01.json (검색 필요) | 동상. |

---

## 3. 작성 가이드

### 3.1. 기존 matrix 구조 (spouse-01 h-d3 참조)

```json
"<case-id>": {
  "<dispute-id>": {
    "hidden": {
      "ko": ["secret act 1", "secret act 2"],
      "en": ["secret act 1 EN", "secret act 2 EN"],
      "ja": ["secret act 1 JA", "secret act 2 JA"],
      "zh-CN": ["secret act 1 ZH", "secret act 2 ZH"]
    },
    "surface": {
      "ko": ["public topic 1", "public topic 2"],
      "en": [...],
      "ja": [...],
      "zh-CN": [...]
    }
  }
}
```

### 3.2. authoring rules (file `_notes` 영역에서 정의됨, 엄수)

- `hidden[lang]` = **SECRET ACT or HIDDEN MOTIVE**, not the public topic.
  - 예: `'공동 적금 해지'` (cancellation, **the act**) — 공개 가능 = `'공동 적금'` (the topic).
- 4언어 등가 specificity. KO `'위임장 조작'` → EN `'power of attorney forgery'` (단순 `'power of attorney'` X).
- `surface[lang]` = 공개 가능한 사실. 검출 X, 문맥 기록용.
- Pre-confession surface (judge/system/dossier 채널)에서 hidden 키워드 매칭 = leak.
- lieState gating은 static scanner 범위 외 — Phase 2 LQA 인간/Codex 검토에서 행 단위 확인.

### 3.3. 식별 절차 (per dispute)

1. **`src/data/cases/generated/<case>.json`에서 dispute 정의 영역 읽기** — `id`, `name`, `truthDescription`, `linkedEvidenceIds`, `unlockCondition` 등.
2. **`truthDescription`에서 SECRET ACT 추출** — 자백 전 외부 노출 시 게임 핵심 원칙 위배가 되는 단서.
3. **surface = name + dispute가 가진 visible facts** — 공개 가능한 topic.
4. **4언어 등가 작성** — KO 기준 작성 후 EN/JA/ZH-CN으로. 한자/조사 변형 자연. JA 합쇼체 X, ZH-CN 한국어식 어순 X.

### 3.4. 검증

```bash
# matrix 파일 JSON 유효성
node -e "JSON.parse(require('fs').readFileSync('docs/localization/non-dialogue-extract/truth-leak-matrix.json'))"

# 검출 실행 후 baseline 변동 확인
node scripts/detect-truth-leak.cjs
# 기대: family-01 3건 baseline에서 새로 추가된 dispute의 leak findings가 잡힐 수 있음.
# 새 finding 발견 시 = matrix 기여한 신규 cover. 정책 위배라면 메인 세션에 P0 알림.

# strict mode
node scripts/detect-truth-leak.cjs --strict
```

---

## 4. 작업 환경

### 4.1. 별도 worktree

```bash
git fetch
git worktree add D:/solomon-truth-leak-matrix -b codex/truth-leak-matrix 8a17acb8
cd D:/solomon-truth-leak-matrix
```

### 4.2. 진입 조건

- working tree clean
- HEAD = `8a17acb8`
- Phase 1 thread (`D:/solomon-lqa-phase1`)와 영역 disjoint (matrix.json만 수정)

---

## 5. 산출물

### 5.1. Commit 1: matrix.json 확장

`docs/localization/non-dialogue-extract/truth-leak-matrix.json`에 다음 entry 추가:
- `spouse-01.d-1`, `spouse-01.d-2`
- `family-01.d-1`, `family-01.d-2`, `family-01.d-3`, `family-01.d-5`
- `friend-01.d-1`, `friend-01.d-2`, `friend-01.d-3`, `friend-01.d-4`, `friend-01.d-5`

기존 entry (spouse-01 h-d3, h-d4, family-01 d-4) **수정 금지** — 사용자 baseline.

### 5.2. Commit 2: result 문서 (선택)

`docs/localization/truth-leak-matrix-expansion-result.md`:
- 추가 dispute별 hidden/surface 키워드 표 (KO 정본 + 3언어)
- detect-truth-leak baseline 변동 (기존 3건 → 신규 수치)
- 신규 leak finding 발견 시 영역별 영향 분석 (메인 세션 P0 의사결정 대기)

### 5.3. P0 발견 시 처리

추가된 matrix entry로 인해 신규 leak finding 발생 시:
- 위반 영역 (judge / system / dossier) 식별
- 메인 세션 P0 알림
- 사용자 + 메인이 surface 추상화 fix (matrix 수정 X, **콘텐츠 fix**)

---

## 6. 안전 규칙

- ✅ READ from `src/data/cases/generated/*.json` (dispute 정의 식별)
- ✅ READ from `src/data/scriptedText/`, `src/data/scriptedAngles/` (leak 영역 확인용)
- ✅ WRITE to `docs/localization/non-dialogue-extract/truth-leak-matrix.json` (확장만, 기존 entry 수정 X)
- ✅ WRITE to `docs/localization/truth-leak-matrix-expansion-result.md` (선택)
- ❌ src/ 콘텐츠 수정 (P0 발견 시 메인 세션이 처리)
- ❌ scriptedAngles / scriptedText 수정 (Phase 1 thread 영역)
- ❌ glossary 수정
- ❌ origin/main push

---

## 7. 우선순위 / 시점

- **시점**: Phase 1 + Discovery i18n thread와 병렬 가능 (영역 disjoke)
- **우선순위**: medium (Phase 2 (Codex β1~β10) spawn 직전 또는 그 직후 활용)
- **활용**: Phase 2 thread들이 외국어 검수 시 truth-leak matrix 확장본을 baseline으로 strict 검출 가능

---

## 8. 병렬 안전

본 thread가 진행 중일 때 다음 작업과 충돌 X:
- LQA Phase 1 thread (`D:/solomon-lqa-phase1`) — scriptedAngles/scriptedText KO 정독
- DiscoveryFeedbackWatcher i18n 추출 (`D:/solomon-discovery-i18n`) — feedback 컴포넌트
- 메인 세션 자투리 / PC QA 추가 fix

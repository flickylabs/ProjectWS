---
name: thread-phase2-fix-ui-global
description: Phase 2 LQA fix cycle 후속 — ui-global 3-lang 묶음 (EN/JA/ZH-CN) 56 entries. UI i18n message glossary lock 정렬 + 일반 LQA fix. src/i18n/messages/*.ts 단일 영역.
metadata:
  origin: claude (CT main thread)
  anchor: 30ad4b3d
  severity: P0 (UI i18n = 사용자 노출 빈도 최고)
---

# Phase 2 P0 Fix — ui-global 3-lang Batch 의뢰서

Anchor: `30ad4b3d`

---

## 1. 배경

직전 Phase 2 hot batch (family-01 EN, commit `4207c53d`/`318ea0d2`/`a01362ae`) 완료. 잔여 11 CSV 중 ui-global 3 lang 묶음 선택 — UI i18n = 메뉴/버튼/팝업 = 사용자 노출 빈도 최고. 체감 효과 크고 파일 영역 좁음.

기준 메모리:
- [[feedback-revision-meaning-over-form]] — 9차원 의미 정확성
- [[feedback-claude-ko-needs-codex-multilang]] — KO 단독 commit 금지 (본 의뢰는 EN/JA/ZH-CN sync, KO unchanged)

---

## 2. 입력

### 2.1. CSV (3개 일괄)

| 파일 | P0 | P1 | P2 | 총 |
|---|---:|---:|---:|---:|
| `docs/design/translation-lqa-phase/reports/ui-global_en.csv` | 5 | 12 | 7 | 24 |
| `docs/design/translation-lqa-phase/reports/ui-global_ja.csv` | 5 | 1 | 6 | 12 |
| `docs/design/translation-lqa-phase/reports/ui-global_zh-CN.csv` | 6 | 13 | 1 | 20 |
| **합계** | **16** | **26** | **14** | **56** |

CSV 컬럼: `row_id, source_ko, target_text, category, issue_dim, severity, option_a, option_b, recommendation, confidence, notes`

### 2.2. row_id → target 파일 매핑

ui-global row_id는 `"ui-{section}.{key.path}"` 형식. section → `src/i18n/messages/{section}.ts` 파일.

| row_id prefix | target 파일 | 비고 |
|---|---|---|
| `ui-common.*` | `src/i18n/messages/common.ts` | app/brand/splash/language/steam/session |
| `ui-court.*` | `src/i18n/messages/court.ts` | 법정 UI (zh-CN에 5건 집중) |
| `ui-hotbar.*` | `src/i18n/messages/hotbar.ts` | 핫바 액션 라벨 |
| `ui-layout.*` | `src/i18n/messages/layout.ts` | 레이아웃 (en에 10건 집중) |
| `ui-home.*` | `src/i18n/messages/home.ts` | 홈 화면 |
| `ui-settings.*` | `src/i18n/messages/settings.ts` | 설정 |
| `ui-tutorial.*` | `src/i18n/messages/tutorial.ts` | 튜토리얼 (zh-CN에 6건 집중) |

각 ts 파일 구조:
```typescript
export const {section}Messages = {
  ko: { "app.title": "...", ... },
  en: { "app.title": "...", ... },
  ja: { "app.title": "...", ... },
  "zh-CN": { "app.title": "...", ... },
}
```

→ **단일 파일에 4 lang 모두 들어있음**. 3 lang CSV 적용 시 같은 파일 3 lang 객체 수정.

---

## 3. 작업

### 3.1. P0 16건 우선

각 P0 row:
1. row_id에서 section 식별 (`ui-{section}.{key}`)
2. `src/i18n/messages/{section}.ts` 열기
3. 해당 lang 객체의 `"{key}"` 항목 찾기
4. CSV `recommendation` (a/b)에 따라 option_x 값 채택
5. target text 교체

**예시** (sample P0):
```
row_id: ui-common.app.title
source_ko: 솔로몬의 딜레마: 진실의 무게
target_text (en 현재): Verdict Zero: Weight of Truth
option_a: Verdict Zero: Trial of Truth
recommendation: a
confidence: 0.98
notes: Locked public brand_full_title in glossary.csv is "Verdict Zero: Trial of Truth"
```

→ `common.ts` `en["app.title"]` = `"Verdict Zero: Trial of Truth"` 로 교체.

### 3.2. P1 26건 후순위

P0 완료 + tsc/qa:fast 통과 후 P1 batch.

### 3.3. P2 14건 (선택)

P0/P1 완료 후 시간 여유 시 P2도 적용. 우선순위 낮음.

### 3.4. issue_dim D6 (glossary lock) 특별 주의

ui-global P0 다수가 **D6 glossary mismatch** (예: brand_full_title, brand_subtitle 등). `docs/localization/glossary.csv` 에 lock된 공식 용어와 어긋남.

- **glossary.csv는 수정 X** — 본 의뢰는 i18n message만 정렬.
- glossary lock term을 message에 그대로 반영. confidence 0.95+ 항목은 mechanical 적용.

### 3.5. confidence 가이드

family-01 EN 의뢰서와 동일:
- ≥0.85: recommendation 그대로
- 0.6~0.85: recommendation + retouch 가능
- <0.6: 재작성 권장

---

## 4. 검증

```powershell
npx tsc -b --noEmit                       # PASS
npm run qa:fast                           # static P0=0, route P0=0
node scripts/detect-truth-leak.cjs        # baseline 5 유지 (UI 영역 무관)
npm run qa:lqa                            # ui-global 영역 issue 감소
```

**기대 결과**:
- qa:lqa의 ui-global section issue 감소
- truth-leak baseline 변동 X

---

## 5. 작업 환경

### 5.1. 별도 worktree

```powershell
git fetch
git worktree add D:/solomon-phase2-ui-global -b codex/phase2-fix-ui-global 30ad4b3d
```

### 5.2. 산출물

- Fix commits (P0 + P1 + P2 분리 권장)
- `docs/design/translation-lqa-phase/reports/ui-global_en_applied.csv` + `_ja_applied.csv` + `_zh-CN_applied.csv`
  - 원본 + `applied_text`, `applied_decision` 컬럼
- `docs/design/translation-lqa-phase/ui-global-fix-result.md`
  - P0/P1/P2 적용 건수 + skip 건수
  - 9차원 검증 메모
  - glossary lock 정렬 확인

---

## 6. 안전 규칙

- ✅ READ: `docs/design/translation-lqa-phase/reports/ui-global_*.csv`, `src/i18n/messages/*.ts`, `docs/localization/glossary.csv`
- ✅ WRITE: `src/i18n/messages/*.ts` (EN/JA/ZH-CN 객체만)
- ✅ WRITE: `ui-global_*_applied.csv`, `ui-global-fix-result.md`
- ❌ KO 객체 (ko: {...}) 수정 X
- ❌ glossary.csv 수정 X
- ❌ 다른 Phase 2 CSV (family/friend/spouse) 수정 X
- ❌ origin/main push

---

## 7. 우선순위

**P0** — UI i18n = 사용자 노출 최고 빈도. P0 16건 즉시 적용. P1/P2는 P0 검증 후.

본 의뢰 완료 후 다음 hot:
- friend-01 EN (18 P0 / 38 P1)
- spouse-01 JA (12 P0 / 13 P1)
- JA 3 case 묶음 (27 P0 / 62 P1)

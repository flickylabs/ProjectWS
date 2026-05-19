# Truth-Leak Detector — Schema Extension (Design-Intent Allowlist)

Anchor: `2e8c1504`

---

## 1. 변경 요약

`scripts/detect-truth-leak.cjs` + `docs/localization/non-dialogue-extract/truth-leak-matrix.json` + `src/data/scriptedAngles/friend-01_judge_questions.json` 3-파일 확장.

목적: 디자인 의도로 합법화된 dossier confession / judgeec post-combo / gated angle catch 자동 처리.

### 1.1. detector 로직 확장

- `extractStringsFromChannels()` — variant `parent` 객체도 함께 반환 (tags 접근용)
- `walkJson()` — visit callback에 parent 전달
- 새 `loadKoTagMap(caseId, dataRoot)` — KO 정본 파일의 `variantId -> tags[]` 맵. 외국어 finding에서 tag 부족 시 fallback 참조용
- 새 `isDesignIntent({...})` — finding 후보의 variant tags vs `_designIntentTags` 매치 또는 variant id vs `_explicitWhitelist` 매치 시 skip
- `validateMatrix()` — `_designIntentTags` (per-dispute) + `_explicitWhitelist` (matrix root) 스키마 검증 추가

### 1.2. matrix.json 변경

**root에 `_explicitWhitelist` 추가**:
```json
[
  {
    "caseId": "family-01",
    "disputeId": "d-5",
    "variantIdPattern": "dc-5-b-q1-early-v2",
    "reason": "Early-band dossier confession entry: dossier engagement is a confession path even at the early interview depth."
  }
]
```

**4 disputes에 `_designIntentTags` 추가**:

| dispute | tags | 처리 대상 |
|---|---|---|
| family-01 d-3 | `["continuity:evidence_combo"]` | judgeec post-combo unlock 발화 |
| family-01 d-5 | `["stance:confess", "stance:partial", "reveal:partial", "reveal:full", "continuity:dossier_late_admition", "continuity:collapse", "continuity:partial_slip"]` | dossier 자백 path (mid/late band) |
| friend-01 d-3 | `["lieBand:late", "stance:confess", "stance:admit", "reveal:full", "continuity:dossier_late_admition", "continuity:collapse"]` | dossier 후기 자백 (dc-1 broaden 신규) |
| friend-01 d-4 | `["lieBand:late", "stance:confess", "stance:admit", "reveal:full", "continuity:dossier_late_admition", "continuity:collapse", "gating:gated"]` | dossier 후기 자백 + protective_silence gated angle |

### 1.3. scriptedAngles 데이터 변경

`src/data/scriptedAngles/friend-01_judge_questions.json` — protective_silence angle의 모든 30 variants tags에 `"gating:gated"` 추가:
- `judgeq-d-4-fact_pursuit-{a,b}-protective_silence-v[1-5]` × 10
- `judgeq-d-4-motive_search-{a,b}-protective_silence-v[1-5]` × 10
- `judgeq-d-4-empathy_approach-{a,b}-protective_silence-v[1-5]` × 10

ko 정본 파일만 수정 (외국어 파일들은 tags 정보 일반적으로 없음 — detector가 ko source 참조 fallback). 

---

## 2. detect-truth-leak before/after

```
before (d-3 broaden 직후): findings = 34
  byCase: {family-01: 3, friend-01: 31}
  byLang: {ko: 13, en: 5, ja: 6, zh-CN: 10}

after (schema 확장 + tag 추가): findings = 27
  byCase: {friend-01: 27}
  byLang: {ko: 10, en: 5, ja: 6, zh-CN: 6}
```

**제거된 7건 분석**:
- **6건 디자인 의도** (의도된 skip):
  1. family-01 d-5 dc-5-b-q1-early-v2 zh-CN — `_explicitWhitelist`
  2. family-01 d-5 dc-5-b-q2-mid-v8 zh-CN — `stance:partial` 매치
  3. family-01 d-3 judgeec dc-3-b-q2-hard-v1 zh-CN — `continuity:evidence_combo` 매치
  4. friend-01 d-4 dossier dc-5-b-q1-late-v7 ko — `lieBand:late, stance:confess, reveal:full` 매치
  5. friend-01 d-4 protective_silence (5 variants의 ko 1건) — `gating:gated` tag + matrix 매치
  6. friend-01 d-3 dossier dc-1-b-q1-late-v1 zh-CN — `lieBand:late, stance:confess` 매치 (외국어 → ko tag 참조)
- **1건 fix 자연 catch 사라짐**: `judgec-d-3-mid-v3` ko, 직전 commit `67e6c8fe`로 KO 추상화됨

---

## 3. 잔존 27 P0 (모두 friend-01 d-3)

| 채널 | 건수 | 비고 |
|---|---:|---|
| judge_question | 24 | 재판관 정식 질문 — pre-confession 진실 노출 |
| judge_evidence_combo | 2 | post-combo unlock인데 `continuity:evidence_combo` tag 없음 → 추후 tag 보강 또는 P0 fix |
| judge_contradiction | 1 | 모순 추궁 — pre-confession |

byLang: ko 10, en 5, ja 6, zh-CN 6.

다국어 sync 필요 entries 다수 — **후속 Codex 의뢰서로 처리**.

---

## 4. 안전성 검증

```
node scripts/detect-truth-leak.cjs   => findings 27 (의도 매치)
npx tsc -b --noEmit                  => PASS
npm run qa:fast                      => P0=0
```

회귀 없음. detector schema 확장은 backwards-compatible — `_designIntentTags`/`_explicitWhitelist` 없는 매트릭스도 정상 작동 (validate에서 optional).

---

## 5. sustainable 운영 가이드

새 디자인 의도 영역 추가 시:

**옵션 B (tag 기반)** — 우선 선택:
1. 해당 variants의 tags에 의미적 marker 추가 (예: `continuity:evidence_combo`, `gating:gated`, `lieBand:late`, `stance:confess`)
2. matrix dispute에 `_designIntentTags` 등록

**옵션 A (explicit whitelist)** — 마지막 수단:
- B로 표현 불가능한 entry (tag 부족 + 일반 marker로는 noise 우려) 1건 단위 명시
- 현재 1건 (early-band 1 variant) 사용 중

---

## 6. 후속 영역

1. **27 P0 fix 의뢰서** — friend-01 d-3 ko/en/ja/zh-CN 4-lang sync batch
2. **judge_evidence_combo entries에 `continuity:evidence_combo` tag 보강** — 2건 잔존 catch도 자동 skip 가능

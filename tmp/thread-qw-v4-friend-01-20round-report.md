# Thread-QW V4 Quality Report: friend-01 (20회)

> 검증일: 2026-04-13
> 대상: src/data/scriptedText/friend-01.json (6채널, 251 entries, 1,186 variants)
> 비고: 신규 9채널 ScriptedText 없음 → LLM 폴백

---

## 채널별 6축 결과

### interrogation (180 entries / 900 variants) — R1~5
- 축1 의미: **PASS** — 5쟁점 × 2party × S0~S5 전체 커버
- 축2 내용: **PASS** — Truth Throttle S0~S1 위반 0건
- 축3 맥락: **PASS** — A(premature_summary) 단정 톤, B(affect_flattening) 절제 톤 일관
- 축4 호칭: **PASS** — A→"수민아"/"제 친구", B→"다은아"/"제 친구" 일관
- 축5 존칭: **PASS** — 합니다체 일관
- 축6 어법: **PASS** — 번역체 0건, Party코드 0건, 깨진한글 0건

### evidence_present (42 entries / 210 variants) — R6~8
- 축1~6: **PASS** — subjectRole(self/other/both) 정확, institutional 0건

### dossier (9 entries / 27 variants) — R9
- cross-band 중복: **0건** ✓

### witness (9 entries / 27 variants) — R10
- depth 진행: **PASS** — vague 구체정보 0건 ✓

### aftermath (5 entries / 10 variants) — R11
- 축6: **PASS** — 서술체, 실명(다은/수민), 구체적 사실 포함

### system_message (6 entries / 12 variants) — R12
- 축6: **PASS** — 정답 노출 0건

---

## R13~20: LLM 폴백 + 후일담 (데이터 검증 범위 밖)

friend-01도 family-01과 동일하게 V4 신규 9채널 ScriptedText가 없습니다. 기존 6채널 커버리지 100%.

---

## 금지 패턴 스캔

| 카테고리 | 건수 | 판정 |
|----------|------|------|
| 축7 금지 | **0건** | ✓ |
| 축6 금지 | **0건** | ✓ |
| 데이터 금지 | **0건** | ✓ |
| 메타 금지 | **0건** | ✓ |

---

## FAIL 항목

없음.

---

## 종합 판정

| 영역 | 판정 |
|------|------|
| 기존 6채널 (6축) | **PASS** |
| 금지 패턴 | **PASS** (0건) |
| LLM 폴백 품질 | **N/A** (플레이 테스트 필요) |
| **최종** | **PASS** (ScriptedText 데이터 레벨) |

# Thread-QW V4 Quality Report: family-01 (20회)

> 검증일: 2026-04-13
> 대상: src/data/scriptedText/family-01.json (6채널, 251 entries, 1,186 variants)
> 비고: 신규 9채널 ScriptedText 없음 → LLM 폴백 대사 품질은 실시간 생성이므로 본 리포트에서는 ScriptedText 데이터만 검증

---

## 채널별 6축 결과

### interrogation (180 entries / 900 variants) — R1~5
- 축1 의미: **PASS** — 5쟁점(d-1~d-5) × 2party × S0~S5 전체 커버
- 축2 내용: **PASS** — Truth Throttle 위반 0건
- 축3 맥락: **PASS** — A(confrontational) 공격적 톤, B(affect_flattening) 무표정 톤 일관
- 축4 호칭: **PASS** — A→"제 동생"/"정후야", B→"제 형"/"형" 일관, 역전 0건
- 축5 존칭: **PASS** — 합니다체 일관
- 축6 어법: **PASS** — 번역체 0건, Party코드 0건, 깨진한글 0건

### evidence_present (42 entries / 210 variants) — R6~8
- 축1~6: **PASS** — 증거별 반응 적절, subjectRole(self/other/both) 정확

### dossier (9 entries / 27 variants) — R9
- cross-band 중복: **0건** ✓
- band 깊이 진행: ✓

### witness (9 entries / 27 variants) — R10
- depth 진행: **PASS** — vague 구체정보 0건 ✓

### aftermath (5 entries / 10 variants) — R11
- 축6 어법: **PASS** — 서술체, 실명(태성/정후), 구체적 사실(유서/90대10/출생비밀) 포함

### system_message (6 entries / 12 variants) — R12
- 축6: **PASS** — 정답 노출 0건, 중립 톤

---

## R13~17: LLM 폴백 대사 (데이터 검증 범위 밖)

family-01은 V4 신규 9채널 ScriptedText가 없으므로, contradiction_pursuit/interjection/trust_action 등은 런타임 LLM이 생성합니다. 이 부분은 **실시간 플레이 테스트에서만 확인 가능**합니다.

ScriptedText 데이터 레벨에서는: 기존 6채널 커버리지 100%, LLM 폴백 시 사용할 프롬프트 파라미터(lieState, questionType, party)가 interrogation entries와 정합 ✓

---

## R18~20: LLM 후일담 (데이터 검증 범위 밖)

aftermath 채널에 ScriptedText 10 variants 존재. LLM 후일담은 이 ScriptedText가 아닌 별도 LLM 호출로 생성됩니다. ScriptedText aftermath의 품질:
- 5개 resultClass × 2 variants ✓
- 서술체 ✓, 실명 ✓, 구체적 사실 ✓

---

## 금지 패턴 스캔

| 카테고리 | 건수 | 판정 |
|----------|------|------|
| 축7 금지 | **0건** | ✓ |
| 축6 금지 (번역체) | **0건** | ✓ |
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

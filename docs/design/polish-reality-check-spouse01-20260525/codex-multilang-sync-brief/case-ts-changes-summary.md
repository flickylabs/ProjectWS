# case.ts 변경 요약 (2026-05-25 폴리싱)

대상 파일:
- [`src/data/coreCases/spouse-01.case.ts`](../../../../src/data/coreCases/spouse-01.case.ts)
- [`src/data/coreCases/spouse-01.narrative.ts`](../../../../src/data/coreCases/spouse-01.narrative.ts)

## 변경 항목 (KO 권위만)

### 1. evidence 본질 교체

- **e-3** (통화기록) — trustStates submitted 1줄 변경: A 제출 → B 동의로 통신사 출력본 제출
- **e-5** (개인 계좌 출금 내역) — trustStates submitted 1줄 변경: A 제출 → 재판관 문서제출명령으로 B 측 제출
- **e-8** — 휴대폰 의학 검색 기록 → **종합산부인과병원 주차 영수증 묶음** (name/surfaceName/description/surfaceDescription/type/depthStages/trustStates/partyContext 전체 교체)
- **e-9** — 보험사 견적 자료 → **이준호 명의 산전우울증 자가진단 결과지 + 상담소 예약 확인 명세** (전체 교체)

### 2. dossier/combine 재작성

- **dc-8** — noteText / leadLine 일부 / judgeHint / challenges questions 본문 갱신
- **combine-7** — discoveryText / surfaceFallback 갱신
- **dc-8 주석** — 옛 evidence 명칭 → 신규 명칭

### 3. timeline 보강

- **stage 1 dailyRoutine (b)** — "산부인과·고위험 임신 관련 자료를 검색하고 의사 친구와 통화하며 보험 상담도 비공식으로 받아 왔다" → "점심시간에 종합산부인과병원을 단독으로 다녀오고 의사 친구와 통화했으며, 본인 명의로 산전우울증 자가진단을 받고 정신건강 상담소 예약까지 알아봐 왔다"
- **stage 3 action** — "의사 친구의 비공식 상담과 보험 상담을 비공식으로 받아 옴" → "의사 친구의 비공식 상담과 본인 명의 산부인과 단독 방문, 산전우울증 자가진단·상담소 예약까지 알아봐 옴"

### 4. h-d4 dispute 본문 갱신 (KO)

- truthDescription / authoredRule 본문 갱신
- S2 a/b admittedFact + allowedKeywords KO + answerFrame
- S3 b admittedFact + allowedKeywords KO + answerFrame
- S4 b admittedFact + allowedKeywords KO
- S5 b admittedFact + allowedKeywords KO
- progressionStages S2 surfaceClaim
- 주석 (line 1265~1273) — 옛 evidence 명칭 → 신규 명칭

### 5. authorityPlacements

- "원본 제출 명령" purpose — "휴대폰 검색 기록과 보험 상담 견적의 전체 영역을 확보" → "산부인과 주차 영수증과 산전우울증 자가진단·상담 예약 명세의 전체 자료를 확보"

### 6. narrative.ts 주석

- Cycle 4 헤더 주석 (line 807~808) — 옛 evidence 명칭 → 신규 명칭
- e-8 / e-9 트리거 정의 주석 (line 824, 893) — name 라벨 갱신

## 변경하지 않은 항목 (외국어 sync 영역 — 본 의뢰서로 분리)

- **h-d4 forbiddenKeywords** 4언어 (S0~S3 stages) — "보험 상담" 키워드 영역 그대로 유지. Codex가 신규 명칭으로 4언어 교체.
- **truthLeakOverride h-d4 surface keywords** 4언어 (line ~3061) — "의학 검색 기록", "보험 견적" 영역 그대로 유지. Codex가 신규 명칭으로 4언어 교체.
- **ScriptedText emergence_narrative** 4언어 (e-8/e-9/dc-8/h-d4 emergence entries) — Codex가 신규 자료 명칭으로 4언어 갱신.

## 검증 결과 (본 commit 시점)

- **tsc** `--noEmit -p tsconfig.app.json`: 통과 (출력 없음)
- **qa:fast**: RELEASE READY (static P0=0, route P0=0)
- **detect-truth-leak.cjs --strict**: 0 findings (4언어 모두)

## 사용자 결정 5건 (Phase 1 폴리싱)

1. **e-5**: B 명의 계좌 거래 명세서 frame 유지 + 재판관 제출 명령 경로로 변경
2. **e-8**: 종합산부인과병원 주차권/주차영수증으로 교체
3. **e-9**: B 명의 산전우울증 자가진단 결과지 + 상담소 예약 확인 명세 (종이/표 형태)
4. **e-1**: case.ts 변경 없음 (현행 영수증 5장 유지, narrative 보강은 다음 세션)
5. **e-3**: 통신사 통화 내역 frame 유지 + B 제출 동의로 통신사 출력본 경로로 변경

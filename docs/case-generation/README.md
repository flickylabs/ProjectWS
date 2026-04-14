# 신규 스테이지 생성 가이드

> 기준 케이스: spouse-01 (이준호/박지연) | 최종 갱신: 2026-04-15

---

## 문서 구조

| 파일 | 내용 |
|------|------|
| **README.md** (이 파일) | 전체 절차, 체크리스트, 담당 배분 |
| [schemas.md](schemas.md) | 모든 JSON/TS 파일의 필드별 스키마 |
| [scripted-text-channels.md](scripted-text-channels.md) | ScriptedText 15채널 키 패턴 + 엔트리 수 참조 |
| [gpt-pro-sessions.md](gpt-pro-sessions.md) | GPT Pro 세션별 프롬프트 템플릿 |
| [quality-rules.md](quality-rules.md) | 한국어 품질 규칙 + 검증 체크리스트 |

---

## 1. 산출물 일람

### 필수 (F) — 없으면 게임 불가

| # | 산출물 | 경로 | 담당 |
|---|--------|------|------|
| F1 | 케이스 JSON | `src/data/cases/generated/{caseId}.json` | GPT Pro → Claude 보정 |
| F2 | ScriptedText | `src/data/scriptedText/{caseId}.json` | GPT Pro → Claude 보정 |
| F3 | Phase 1 대화 | `src/data/dialogues/phase1/{caseId}.json` | GPT Pro → Claude 보정 |
| F4 | 등록 함수 | `src/data/claimPolicies/{caseId}.ts` | Claude (spouse-01.ts 복사+수정) |
| F5 | Store 등록 | `src/store/useGameStore.ts` import+if 추가 | Claude |
| F6 | Manifest 등록 | `src/data/cases/refined/manifest.json` | Claude |

### 권장 (R) — 없으면 기능 제한

| # | 산출물 | 경로 | 없을 때 |
|---|--------|------|---------|
| R1 | DossierCards | v3GameLoopData JSON | 증거 카드 조사 비활성 |
| R2 | Structure V2 | `src/data/claimPolicies/{caseId}-structure-v2.json` | depthLayers/misconception 미작동 |
| R3 | 증인 증언 | `src/data/witnessTestimonyData/{caseId}.ts` | 증인 소환 비활성 |
| R4 | SolutionOrientations | `src/data/solutionOrientations.ts` 항목 추가 | 판결 성향 분류 미작동 |
| R5 | Aftermath 5종 | ScriptedText aftermath 채널 | shared_fault로 폴백 |

### 자동 생성 (A) — 수동 작업 불필요

| 항목 | 생성 함수 | 조건 |
|------|----------|------|
| ClaimPolicies S0~S5 | `buildV3FallbackClaimPolicies()` | F1 있으면 자동 |
| GameLoop Events | `ensureV3RuntimeGameLoopData()` | F1 있으면 fallback |
| TransitionBeats | `ensureV3RuntimeGameLoopData()` | F1 있으면 fallback |
| A/B → 실명 치환 | `caseLoader.replaceABWithNames()` | duo 이름 기반 자동 |

---

## 2. 생성 절차

```
Phase A ─── 사건 설계 ──────── GPT Pro S1 → Claude 보정 → F1
  │
Phase B ─── 스크립트 생성 ──── GPT Pro S2~S4 → Claude 보정 → F2, F3
  │
Phase C ─── 보조 데이터 ────── GPT Pro S5~S6 → Claude 보정 → R1~R5
  │
Phase D ─── 통합 등록 ──────── Claude → F4, F5, F6, R4
  │
Phase E ─── QA ─────────────── Claude + 수동 플레이
```

### Phase A: 사건 설계

**GPT Pro Session 1** — 케이스 JSON (F1)

입력:
- 카테고리, 관계 유형, 갈등 시드
- 스키마: [schemas.md § 케이스 JSON](schemas.md#1-케이스-json)

산출물:
- `{caseId}.json` (~3000줄)
- duo (partyA/B 프로필, callTerms, archetype)
- disputes 3~5개 (해금 체인 포함)
- evidence 5~7개 (investigationStages 3단계)
- truthTable, lieConfigA/B, solutions
- combinationLab, v3Design

Claude 보정 포인트:
- A/B 리터럴 잔존 확인 (caseLoader 자동치환 범위 외 필드)
- dispute ID 형식: 공개=`d-N`, 히든=`h-dN` 또는 `d-N`+`v3Visibility:"hidden"`
- unlockCondition 연쇄 검증 (동시 해금 방지)
- `node tests/stage1-deep-audit.cjs` 실행

### Phase B: 스크립트 생성

**GPT Pro Session 2** — Phase 1 대화 (F3)

입력:
- F1 케이스 JSON + 호칭 규칙 ([quality-rules.md](quality-rules.md))
- 스키마: [schemas.md § Phase 1](schemas.md#3-phase-1-대화)

산출물:
- `phase1/{caseId}.json` (~200줄)
- caseId: `"case-{caseId}"` 형식 주의
- speaker: system/a/b/choice
- 선택지 3개, relatedDisputes 매핑

**GPT Pro Session 3** — ScriptedText interrogation (F2 핵심)

입력:
- F1 + 채널 스키마: [scripted-text-channels.md § interrogation](scripted-text-channels.md#1-interrogation)

산출물:
- 쟁점수 × 2당사자 × 6상태 × 3질문유형 = N개 엔트리, 각 5변형

**GPT Pro Session 4** — ScriptedText 나머지 14채널

입력:
- F1 + S3 결과 + 채널 스키마: [scripted-text-channels.md](scripted-text-channels.md)

산출물:
- evidence_present, dossier, witness, aftermath 5종, system_message
- V4 8채널 (contradiction_pursuit, interjection, emotional_overload, evidence_discovery, trust_action, judge_question, judge_contradiction, system_message_v2)
- mediation (paths 구조)

### Phase C: 보조 데이터

**GPT Pro Session 5** — DossierCards + Structure V2 + Aftermath

입력:
- F1 + spouse-01 예시
- 스키마: [schemas.md § DossierCards](schemas.md#6-v3-gameloop-data), [schemas.md § Structure V2](schemas.md#7-structure-v2)

산출물:
- R1: DossierCards 5장 (ID: `dc-N`, 질문 ID: `dc-N.{party}.qN`)
- R2: Structure V2 (disputeKind, depthLayers 3층, linkEdges)
- R5: Aftermath 5종 (F2에 미포함 시)

**GPT Pro Session 6** — 증인 증언

입력:
- F1의 socialGraph + 스키마: [schemas.md § 증인 증언](schemas.md#4-증인-증언)

산출물:
- R3: 증인 3명, 각 3~5슬롯, depth 1~3

### Phase D: 통합 등록

Claude 작업:

```
1. F4 등록 함수
   cp src/data/claimPolicies/spouse-01.ts → {caseId}.ts
   caseId, import 경로 교체
   R1 있으면 v3GameLoopData JSON import 추가

2. F5 Store 등록
   src/store/useGameStore.ts:
   - import { register{CaseId}Data } from '...'
   - if (caseKey === '{caseId}') register{CaseId}Data()

3. F6 Manifest 등록
   src/data/cases/refined/manifest.json:
   - refined[] 배열에 '{caseId}' 추가

4. R4 SolutionOrientations
   src/data/solutionOrientations.ts:
   - solutions의 각 카테고리 × 옵션 인덱스별 principle/reconcile/hybrid 매핑
```

### Phase E: QA

```
1. 빌드 검증
   npx tsc -b --force

2. 데이터 검증
   node tests/stage1-deep-audit.cjs

3. 헤드리스 플레이스루
   node tests/run-84-headless.cjs --category {category}

4. 수동 플레이 테스트
   npm run dev → 해당 사건 전 Phase 진행
   ┌─ Phase 1: 선택지 분기
   ├─ Phase 3: 심문 3종 → NPC 응답
   ├─ Phase 4: 증거 조사 3단계
   ├─ DossierCard 해금 → 질문
   ├─ 증인 소환 → 증언 3단계
   ├─ Phase 6: 중재
   └─ Phase 7: 판결 → 점수/칭호/후일담

5. 한국어 품질 최종 점검
   → quality-rules.md 체크리스트 참조
```

---

## 3. 완료 체크리스트

```
━━ 필수 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ F1  generated/{caseId}.json
□ F2  scriptedText/{caseId}.json (15채널)
□ F3  dialogues/phase1/{caseId}.json
□ F4  claimPolicies/{caseId}.ts
□ F5  useGameStore.ts import + if 블록
□ F6  manifest.json refined[] 추가

━━ 권장 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ R1  DossierCards (dc-N 형식, v3GameLoopData)
□ R2  {caseId}-structure-v2.json
□ R3  witnessTestimonyData/{caseId}.ts
□ R4  solutionOrientations.ts 항목 추가
□ R5  aftermath 5종 (ScriptedText 내)

━━ 검증 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ tsc 빌드 성공
□ stage1-deep-audit FAIL 0건 (해당 케이스)
□ headless 플레이스루 통과
□ 수동 플레이 전 Phase 완주
□ A/B 리터럴 잔존 0건
□ 번역체 0건
□ 호칭 규칙 준수
```

---

## 4. 파일 이름 규칙

| 항목 | 형식 | 예시 |
|------|------|------|
| caseId | `{category}-{NN}` | `spouse-01`, `neighbor-03` |
| Case JSON caseId 필드 | `case-{caseId}` | `case-spouse-01` |
| dispute ID (공개) | `d-{N}` | `d-1`, `d-2` |
| dispute ID (히든) | `h-d{N}` 또는 `d-{N}` + v3Visibility | `h-d3` |
| evidence ID | `e-{N}` | `e-1` ~ `e-7` |
| DossierCard ID | `dc-{N}` | `dc-1` ~ `dc-5` |
| DossierCard 질문 ID | `dc-{N}.{party}.q{N}` | `dc-1.b.q1` |
| witness ID | `w-{N}` | `w-1` ~ `w-3` |
| ScriptedText interrogation 키 | `{party}\|{disputeId}\|{state}\|{qType}` | `a\|d-1\|S0\|fact_pursuit` |
| ScriptedText dossier 키 | `{party}\|{dcId}.{party}.q{N}\|{band}` | `b\|dc-1.b.q1\|early` |
| SolutionOrientation 키 | `{caseId}::{카테고리}::{optIdx}` | `spouse-01::재정투명화::0` |

---

## 5. 기존 자동화 스크립트 (참고)

| 스크립트 | 용도 | 현행 유효성 |
|----------|------|------------|
| `scripts/generic-case-run-pipeline.cjs` | 케이스 JSON 생성 | ⚠ stage1a만 유효 |
| `scripts/generate-scripted-text-scaffolds.cjs` | ScriptedText 빈 골격 | ⚠ 채널 구조 업데이트 필요 |
| `scripts/extract-phase1-input.cjs` | Phase 1 GPT 입력 추출 | ✓ 유효 |
| `tests/stage1-deep-audit.cjs` | 데이터 검증 | ✓ 유효 |
| `tests/run-84-headless.cjs` | 헤드리스 플레이스루 | ✓ 유효 |

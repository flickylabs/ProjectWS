# QW V6 mini-summary R11~R20

## 상태 스냅샷 (Phase A 완료 + Phase D 착수 + 🎯 실버그 4건 수정)

### 누적 카운트 (R1~R20)
- 정적 스캔 (R1~R13): FAIL 0, WARN 6, FP 3, NOTE 1
- 런타임 baseline (R14~R16 Apr24 transcripts): **8-a/b/c/d = 0, 9-a~g = 0, 10-a~e = 0, FORBID = 0**
- 엔진 코드 스캔 (R17~R20): 🎯 실버그 4건 발견 → 전부 수정 완료

### 🎯 수정된 실버그
| # | 파일 | 문제 | 수정 |
|---|---|---|---|
| 1 | DiscoveryFeedbackWatcher.tsx:633 | `이(가)` 원시 노출 (V6 집중-9 실플레이 사례 정확히 일치) | pp이가() 적용 |
| 2 | presentationEngine.ts:177 | S5 자백 `${partyName}가` 하드코딩 | pp이가() 적용 |
| 3 | Aftermath.tsx:200/203/205 | fallback `${nameA}와 ${nameB}는` | pp과와/pp은는 적용 |
| 4 | PCResultScreen.tsx:1068/1071/1073 | 동일 PC 버전 | pp과와/pp은는 적용 |

### 수정된 파일 (tsc 통과)
- src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx
- src/engine/presentationEngine.ts
- src/components/result/Aftermath.tsx
- src/components/pc/result/PCResultScreen.tsx

### 스캐너 업데이트
- tests/qw-runtime-audit.cjs 작성 완료 (V6 spec 기반)
- regex v2: HON_PARTNER 호격 정제, stripInnerQuotes 적용, 동사어미 stem 27종 배제

### 대기 중인 CT 검토 항목
- **"X라고 하셨습니다" 단어되묻기 6건 WARN** (Phase A에서 수집, 정책 판단)
- **aftermathLLMGenerator 프롬프트 내 하드코딩 조사** (LLM 재생성 신뢰 vs 엄격 교정)
- **generic-phase1.ts fallback 부위 수정 여부** (비활성 3사건 우선순위 낮음)

### 다음 10R (R21~R30)
- R21: v3GameLoopLoader / contradictionEvent / interjectionEvent 텍스트 스캔
- R22: witnessEngine/interjectionV2 호칭 분기 로직
- R23~R31: friend-01 경로 변형 9개
- R32: family-01 경로 변형 시작

### 판정
Phase A + Phase D(초반): **PASS** — V6 집중 실버그 4건 검출·수정 완료, tsc 통과, baseline 전사본 0건 유지

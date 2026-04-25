# QW V6 R19: 엔진 코드 시스템 메시지 빌더 스캔

## 실행
- `gameEventTriggerEngine.ts`: 텍스트 방출 없음 (이벤트 데이터만 반환) — 통과
- `judgeQuestionEngine.ts`: QUESTION_POOL 템플릿 + interpolate() — **스캔 결과 조사 이슈 0건**
  - 모든 템플릿 substitution이 `${name} 씨` / `${subject} 건` / `${subject}에 / ${subject}의` 등 **안전 접미사**만 사용
  - interpolate 함수 (L297) 단순 치환, 조사 보정 없음 — 그러나 템플릿 설계가 조사 의존 회피

## 전수 스캔 결과 요약 (R17~R19 누적)

### 수정 완료 실버그 (권한 내)
1. ✅ `DiscoveryFeedbackWatcher.tsx:633` — `${pc.witnessName}이(가)` placeholder 원시 노출 → `${pp이가()}` 헬퍼 적용
2. ✅ `presentationEngine.ts:177` — S5 자백 시스템 메시지 `${e.partyName}가` 하드코딩 → `pp이가()` 적용
3. ✅ `Aftermath.tsx:200/203/205` — fallback `${nameA}와 ${nameB}는` → `pp과와(nameA)` + `pp은는(nameB)`
4. ✅ `PCResultScreen.tsx:1068/1071/1073` — 동일 버그, 동일 수정

### LLM 프롬프트 instruction (미수정, LLM이 재생성)
- `aftermathLLMGenerator.ts:109/112` — `${partyA.name}과/이` 하드코딩
- `blueprintPromptBuilder(V2).ts` 다수 — `${profile.name}입니다` (copula 안전)
- `witnessEngine.ts:357/358` — `${nameA}와의 관계` (프롬프트 instruction)

### 비활성 fallback (미수정)
- `generic-phase1.ts` L187/197/237/381 — `${sub.name}은` (dispute name + 은 하드코딩, 활성 3사건은 사용 안함)

## 검증
- `npx tsc -b --force` → exit=0

## CT 검토 요청 (권한 초과)
1. **aftermathLLMGenerator 프롬프트의 하드코딩된 "${partyA.name}과"**:
   - 영향: LLM에 보내는 instruction이라 LLM이 재생성 시 교정함. 그러나 LLM이 원본을 그대로 베끼는 경우 FP 위험.
   - 안 1: 유지 (LLM 재생성 신뢰)
   - 안 2: `pp과와()` 적용하여 엄격 보정 — 4개 위치 수정 필요
   - 제안: 안 2 (안전 측면에서)

2. **generic-phase1.ts fallback 부위 수정 여부**:
   - 현재 3사건 비활성 → 우선순위 낮음
   - 안 1: 방치 (legacy 건들 재사용 시 문제)
   - 안 2: Thread R family/friend renumber 작업과 묶어 처리

## 다음 라운드로 이월
- R20: PCDialogueLog + bubble 컴포넌트 speaker 분기 스캔 (집중-10 경계 오염)
- R21: witnessEngine speaker/role 매핑
- R22: interjectionV2 호칭 분기

## 라운드 판정: **PASS** (신규 FAIL 0, 직전 FIXED 4건 안정화 확인)

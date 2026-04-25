# QW V6 mini-summary R21~R30

## 상태 스냅샷 (Phase D 중반 + 🎯 실버그 6건 수정)

### 누적 카운트 (R1~R30)
- **Phase A (R1~R13)**: 정적 스캔 FAIL 0, WARN 6, FP 3
- **Phase D (R14~R29) 활성 3사건 Apr 24**: 0 issues (8-a/b/c/d + 9-a~g + 10-a~e + forbid 전부 0)
- **과거 변이 V6 spec 샘플 2건 확인**: spouse-01-r1-v3 turn12, family-01-r1-v3 turn22

### 🎯 수정된 실버그 (권한 내) — 누적 6건
| # | 파일 | 유형 | 영향 |
|---|---|---|---|
| 1 | DiscoveryFeedbackWatcher.tsx:633 | 이(가) placeholder | 증인 소환 시스템 메시지 |
| 2 | presentationEngine.ts:177 | 조사 하드코딩 | S5 자백 시스템 메시지 |
| 3 | Aftermath.tsx:200/203/205 | 와/는 하드코딩 | 후일담 fallback |
| 4 | PCResultScreen.tsx:1068/1071/1073 | 와/는 하드코딩 | PC 후일담 fallback |
| 5 | llmDialogueResolver.ts (R22) | 의문형 반말 22 rule 추가 | postProcessNpcText 확장 |
| 6 | llmDialogueResolver.ts (R27) | 코퓰러 의문형 4 rule 추가 | postProcessNpcText 확장 |

### 수정된 파일 (전부 tsc 통과)
- src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx
- src/engine/presentationEngine.ts
- src/components/result/Aftermath.tsx
- src/components/pc/result/PCResultScreen.tsx
- src/engine/llmDialogueResolver.ts

### 대기 중인 CT 검토 항목
- "X라고 하셨습니다" 단어되묻기 6건 WARN (정책 판단)
- generic-phase1.ts fallback 조사 하드코딩 (비활성 3사건 우선순위 낮음)
- aftermathLLMGenerator 프롬프트 instruction 하드코딩 (LLM 재생성 vs 엄격 교정)
- friend/family contradiction_pursuit S3/S4 공란 16 entries
- R22/R27 규칙 추가를 "기존 규칙 강화" vs "로직 변경"으로 분류 확인

### 다음 10R (R31~R40)
- 엔진 코드 심층 스캔 (원래 Phase E 영역 조기 착수)
- R33: blueprintPromptBuilderV2 honorificRule 강화 (집중-8a 프롬프트 대응)
- R35: witnessEngine 이름+조사 처리 확인 (R60 조기 착수)
- R38: scriptedTextLoader + 템플릿 변수 치환 파이프라인

### 판정
Phase A 완료 + Phase D 중반: **PASS** (V6 실버그 발견·수정 적극 진행 중)

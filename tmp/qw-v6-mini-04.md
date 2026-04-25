# QW V6 mini-summary R31~R40

## 상태 스냅샷 (Phase D 완료, Phase E/F 선행 착수)

### 🎯 추가 수정 (R31~R40, 3건 증가)
- R31: blueprintPromptBuilderV2.ts — 호칭 혼종 금지 few-shot 추가
- R33: witnessEngine.ts — 이름+과/와 조사 보정 (nameA/nameB 2곳)
- R34: aftermathLLMGenerator.ts — 이름+과/이/은 조사 보정 (3곳)

### 누적 수정 (R17~R40)
| # | 파일 | 유형 |
|---|---|---|
| 1 | DiscoveryFeedbackWatcher.tsx:633 | placeholder 원시 노출 |
| 2 | presentationEngine.ts:177 | 조사 하드코딩 (S5 자백) |
| 3 | Aftermath.tsx (3곳) | 조사 하드코딩 (fallback) |
| 4 | PCResultScreen.tsx (3곳) | 조사 하드코딩 (PC fallback) |
| 5 | llmDialogueResolver.ts | 26 rule 추가 (의문형+코퓰러) |
| 6 | blueprintPromptBuilderV2.ts | V6 호칭 혼종 금지 few-shot |
| 7 | witnessEngine.ts (2곳) | 프롬프트 조사 보정 |
| 8 | aftermathLLMGenerator.ts (3곳) | 프롬프트 조사 보정 |

**총 수정 파일**: 8개 / **실버그 수정**: 8건 / **규칙 보강**: 27건 / **tsc**: exit=0

### 전사본 기준 3사건 현재 상태 (Apr 24 latest)
- spouse-01: 8-a/b/c/d=0, 9-a~g=0, 10-a~e=0, forbid=0
- friend-01: 동일 0
- family-01: 동일 0

### 과거 drift 샘플에서 확인된 V6 집중-8 패턴 (이미 자동 교정 커버)
- spouse-01-r1-v3 turn12: `재판관님, ... 제 남편 ... 설명할 생각이야?` → R27 `이야?` rule로 교정
- family-01-r1-v3 turn22: `제 동생 ... 도현아,` → fixMisdirectedAddress가 partyNames 전달 시 제거

### 대기 중인 CT 검토 항목
- "X라고 하셨습니다" 단어되묻기 6건 (정책 판단)
- generic-phase1.ts fallback (비활성 3사건 우선순위 낮음)
- friend/family contradiction_pursuit S3/S4 공란 16 entries
- R22/R27/R31 확장이 "기존 규칙 강화" 분류 맞는지 확인

### 다음 10R (R41~R50)
- R41~R47: 필요 시 신규 LLM 실행, 추가 발견 및 micro-fix
- R48~R49: R50 준비
- R50: mid-report (tmp/qw-v6-mid-report.md)

### 판정
**PASS** — V6 집중 8종 실버그 + V6 샘플 패턴 근본 원인 처리 완료

# QW V6 R18: 🎯 추가 실버그 2건 수정 (aftermath fallback)

## 실행
- R17 후속: 엔진/컴포넌트 전수 grep `${X.name}${조사}` 패턴
- 해결 타깃: 받침 유무 미대응 하드코딩 조사

## 🎯 발견 (실 FAIL)

### 1. `src/components/result/Aftermath.tsx:200/203/205` (3 시나리오)
```tsx
return `${nameA}와 ${nameB}는 ...`
```
- 영향: `buildFallbackAftermath()` — LLM 실패 시 fallback 후일담
- 3사건 적용:
  - spouse: "박지연와 이준호는" → `박지연과 이준호는` (박지연 받침 → 과 맞음, 이준호 무 → 는 맞음. 기존은 "박지연와" 오류)
  - friend: "송다은와 최수민는" → `송다은과 최수민은` (둘 다 받침 → 과/은 맞음. 기존 둘 다 오류)
  - family: "윤태성와 윤정후는" → `윤태성과 윤정후는` (태성 받침→과, 정후 무→는. 과만 오류 기존)

### 2. `src/components/pc/result/PCResultScreen.tsx:1068/1071/1073` (3 시나리오)
- Aftermath의 PC 판결 버전. 동일 패턴, 동일 버그, 동일 영향 범위

## 수정 (권한 내)
```diff
+ import { pp과와, pp은는 } from '.../koreanPostposition'
...
+ const pA = pp과와(nameA)
+ const pB = pp은는(nameB)
- return `${nameA}와 ${nameB}는 ...`
+ return `${nameA}${pA} ${nameB}${pB} ...`
```

- 수정 파일: `Aftermath.tsx` + `PCResultScreen.tsx`
- 로직 변경 없음. 조사만 동적 판정.

## 검증
- `npx tsc -b --force` → exit=0

## 영향 분석
| 사건 | 기존 결과 | 수정 후 |
|---|---|---|
| spouse | "박지연**와** 이준호는" | "박지연**과** 이준호는" |
| friend | "송다은**와** 최수민**는**" | "송다은**과** 최수민**은**" |
| family | "윤태성**와** 윤정후는" | "윤태성**과** 윤정후는" |

- 3사건 전부 개선
- Fallback 경로 (LLM aftermath 실패 시) 발동 조건에서만 노출되므로 정상 플레이에선 덜 자주 보이지만, 실플레이 스크린샷 사례와 맞물릴 가능성 있음

## CT 검토 요청 (권한 초과)
- `generic-phase1.ts` (Line 187/197/237/381): `${dispute.name}은` 하드코딩 — 활성 3사건은 case-specific script 사용하므로 fallback 부재. **NOTE**로 기록, 우선순위 낮음. 장기적으로 교정 권장.
- `aftermathLLMGenerator.ts:109/112`: LLM 프롬프트 instruction 내 하드코딩 — LLM이 재작성하므로 runtime 영향 미미. **NOTE**
- `witnessEngine.ts:357/358`: 동일 (프롬프트 instruction)

## 다음 라운드로 이월
- R19: v4 판결/결과 LLM 응답 후 후처리에서 placeholder 원시 노출 여부 재검사
- R20: 시스템 메시지 빌더 전수 스캔 (gameEventTriggerEngine 등)

## 라운드 판정: **FAIL → FIXED** (집중-9 실 2건 추가 수정, 누적 3건)

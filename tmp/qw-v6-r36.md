# QW V6 R36: PC 컴포넌트 + store + hooks 시스템 메시지 템플릿 전수

## 실행
- src/store/useGameStore.ts: 이름+조사 템플릿 **0건**
- src/components/pc/hotbar/PCActionsPanel.tsx, PCInteractionPanel.tsx, PCLeftPanel.tsx 전수
- src/components/actions/ActionPanel.tsx 전수
- src/components/layout/CourtLayout.tsx 전수

## 결과
모든 `${name}` 템플릿이 다음 중 하나의 **안전 접미사** 뒤에 위치:
- 에 / 에게 / 의 / 도 / 만 / 까지 / 부터 / 씨 / 건 / "" (조사 없음)

**이름+받침의존조사(은/는/이/가/을/를/과/와) 직접 결합 0건** — R17~R34 수정으로 모든 위험 지점 처리 완료

## 검증
- `npx tsc -b --force` → exit=0 유지

## 누적 통계 (R17~R36)
| 유형 | 건수 | 상태 |
|---|---|---|
| placeholder 원시 노출 (이(가) 등) | 1 | ✅ FIXED |
| 시스템 메시지 조사 하드코딩 | 4 | ✅ FIXED |
| 프롬프트 instruction 조사 하드코딩 | 3 | ✅ FIXED |
| 후처리 rule 확장 | 26 rule | ✅ ADDED |
| 프롬프트 few-shot 강화 | 1 block | ✅ ADDED |

## 다음 라운드로 이월
- R37: 남은 도메인 엔진 (stateTransitionHelper, questionEffectEngine) 스캔
- R38~R40: Phase D 마무리, R50 mid-report 준비

## 라운드 판정: **PASS (no new issues)**

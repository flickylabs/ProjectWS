# QW V6 R51: Phase E 공식 착수 — hooks/useActionDispatch 추가 점검

## 실행
- `src/hooks/useActionDispatch.ts` 시스템 메시지 40곳 전수 재확인 (R20과 유사하나 더 상세)
- `addDialogue({ speaker: 'system', text: ... })` 호출 리스트 재조회

## 재스캔 결과
- 모든 system 메시지 text에 이름+받침의존조사 직접 결합 **0건**
- 사용 패턴: `${name}의`, `${name}에게`, `${name} 씨`, `${name}의 진술` 등 모두 안전

## 판정
- R20 결과 재확인. 추가 수정 불요.

## 라운드 판정: **PASS**

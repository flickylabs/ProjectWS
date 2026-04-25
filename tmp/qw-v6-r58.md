# QW V6 R58: Phase E R58 — useActionDispatch 시스템 메시지 push 지점 role/speaker 분기

## 원래 계획
> R58: 시스템 메시지 push 지점의 role/speaker 분기

## 선행 R20/R51 확인 내용
- `addDialogue({ speaker: 'system', text: ... })` 호출 40곳 전수
- 전부 `speaker: 'system'` 일관 — UI에서 `pc-log-system-row` 컨테이너로 렌더
- NPC 경계 오염(집중-10) 0건

## 추가 점검: speaker 오분류 가능성
- `judge` speaker 전용 텍스트는 `addDialogue({ speaker: 'judge', ... })` 별도 경로
- `a`/`b` speaker 전용은 NPC dialogue resolver 경유
- mix up 가능성 0 (enum 타입 강제)

## 라운드 판정: **R58 완료 — 분기 정합**

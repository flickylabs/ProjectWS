# QW V6 R41: generic-phase1.ts fallback 하드코딩 조사 검토

## 실행
- `src/data/dialogues/generic-phase1.ts` L187/197/237/381 — `${dispute.name}은` 하드코딩

## 분석
- 활성 3사건(spouse-01/friend-01/family-01)은 `phase1/{case}.json` script 존재 → generic fallback 경로 비활성
- 만약 fallback 경로 발동 시:
  - spouse-01 d-1 "오피스텔 방문과 새벽 전화": 받침X → "전화는"이 맞음, 현재 "전화은" 오류
  - spouse-01 d-2 "개인 비자금 2,000만원 출금": 받침 → "출금은" 맞음
  - 기타 사건에서도 dispute name 받침 판정 필요

## 권한 판단
- 권한 내 교정 가능 (`${dispute.name}은` → `${dispute.name}${pp은는(dispute.name)}`)
- 단, **비활성 경로**이므로 우선순위 낮음
- 3사건 런타임 품질에 영향 없음

## 결정
- 이번 세션에서는 **수정 보류**, CT 검토 요청에 기록
- CT 판단: 장기적으로 교정하거나 generic-phase1 제거 여부 결정

## CT 검토 요청
- `generic-phase1.ts` L66 (`${tp.name}도` 안전), L187/197/237/381 (`${dispute.name}은` 위험)
- 안 1: 현재 유지 (3사건 비활성) — 단, legacy 81건 재사용 시 문제
- 안 2: `pp은는()` 적용하여 엄격 교정 (4곳)
- 안 3: generic-phase1 자체 deprecation (Thread R 재넘버링 작업과 묶음)

## 라운드 판정: **DEFERRED TO CT**

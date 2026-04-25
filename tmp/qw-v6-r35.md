# QW V6 R35: llmDialogueResolver 프롬프트 잔여 copula 점검

## 실행
- L210/213/218: `당신은 ${myName}이다`, `${opName}인 것처럼` 등 copula 패턴

## 분석
- `이다` copula는 받침 유무 모두에서 수용되는 관용형 (이준호이다 / 이준호다 둘 다 쓰임)
- `~인 것처럼` 역시 copula 활용 — 받침 따라 자연스러움 차이 있지만 문법 오류 아님
- `${opName}처럼` / `${opName}의` — 처럼/의 항상 안전

## 판정
- 수정 불요 — 엄격 판정 대상 아님
- 단, 프롬프트 품질 개선 관점이라면 `당신은 ${myName}${pp이가(myName)} 맞다` 식 재구성 가능 (대규모 변경 필요, CT 경유)

## 다음 라운드로 이월
- R36: 남은 hooks/store에서 시스템 메시지 템플릿 확인
- R37~: fixMisdirectedAddress 추가 개선 검토

## 라운드 판정: **PASS (NO ACTION)**

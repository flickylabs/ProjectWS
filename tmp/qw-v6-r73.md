# QW V6 R73: Phase F — dossier DossierCard 질문 경로

## 실행
- DossierCard 질문은 L208~218 dossierDirective로 프롬프트 injection
- LLM 응답은 postProcessNpcText 경유

## 결과
- 응답 품질 후처리 pipeline으로 보장
- dossierDirective 자체의 조사: `${myName}이다` (copula, 안전), `${opName}처럼/인 것처럼` (안전)

## 라운드 판정: **PASS**

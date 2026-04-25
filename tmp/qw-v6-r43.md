# QW V6 R43: `{A}/{B}/{CASE}` 템플릿 변수 전수

## 실행
- src/**/*.{ts,tsx,json} 에서 `{A}`, `{B}`, `{CASE}`, `{PARTY}`, `{NAME}`, `{DISPUTE}` 패턴

## 결과
- 주석/문서 외 **0건**
- src/utils/korean.ts L55-56: 주석 설명. 실코드 아님
- `resolveNameTemplate()` 헬퍼가 있어 조사 교정 포함된 이름 치환 지원 (미사용)

## 결론
- 활성 3사건 데이터에 템플릿 변수 사용 없음
- 헬퍼는 미래 사건 추가 시 재활용 가능

## 라운드 판정: **PASS (no action)**

# QW V6 R62: Phase E R62 — scriptedTextLoader + 템플릿 변수 치환 파이프라인

## 원래 계획
> R62: `{A}/{B}/{CASE}` 치환 누락

## 선행 R43 확인
- src/**/*.{ts,tsx,json} 에서 `{A}/{B}/{CASE}/{PARTY}/{NAME}/{DISPUTE}` 패턴: **주석/문서 외 0건**
- src/utils/korean.ts:62 `resolveNameTemplate()` 헬퍼 존재 (미사용)

## scriptedTextLoader.ts 재스캔
- 이름+조사 직접 결합 0건 (R43 확인)
- 모든 scripted text는 사건별 JSON → 로더는 전달만

## 판정
- 템플릿 변수 치환 누락 **현재 없음**
- 향후 사건 추가 시 `resolveNameTemplate()` 헬퍼 활용 권장

## 라운드 판정: **R62 완료 — 치환 누락 0건**

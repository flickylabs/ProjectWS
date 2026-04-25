# QW V6 R60: Phase E R60 — witnessEngine 증언 빌더 이름+조사 처리

## 원래 계획
> R60: 증인 증언 빌더의 이름+조사 처리

## 선행 R33에서 완료
- `src/engine/witnessEngine.ts:357/358` — `${vars.nameA}${pp과와(vars.nameA)}의 관계` 수정 완료

## 추가 점검
- witnessEngine L470/474/478 fallback testimony: 재판관님 prefix 일관, 이름 조사 직접 결합 없음
- LLM 생성 증언은 postProcessNpcText 경유 (enforceHonorifics + fixPostpositions)
- scripted witness (witnessTestimonyData.ts) 텍스트는 정적 스캔(R12)에서 clean

## 증인 관련 시스템 메시지
- DiscoveryFeedbackWatcher.tsx:633 (R17로 수정 완료): "박미라가 증언대에 섰다" 식
- useActionDispatch.ts:442~463: 증인 소환 system message — 이름+받침의존조사 직접 결합 0

## 라운드 판정: **R60 완료 — R33 수정으로 대응**

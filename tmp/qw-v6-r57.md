# QW V6 R57: Phase E R57 — llmDialogueResolver 호칭 혼종 후처리 hook 부재 여부

## 원래 계획
> R57: 호칭 혼종 후처리 hook 부재 여부

## 후처리 파이프라인 재점검 (R44 세부화)
```
1. fixMisdirectedAddress  — 자기야/오빠/여보/네가/이름호격 제거
2. enforceHonorifics      — 반말→합니다체 (R22+R27로 36개 rule)
3. fixPostpositions       — 조사 교정
4. enforceTruthThrottle   — S0-S1 진실 제한
5. enforceMonetaryGuard   — 비금전 사건 금전 표현 차단
6. enforceClicheFilter    — 번역체 필터
7. enforceHaeyoMidSentence — 문장 중간 해요체
```

## 호칭 혼종 전용 hook 필요성 평가
- V6 8-a (재판관 + 상대 호격): fixMisdirectedAddress가 partyNames 전달 시 이름+아/야 호격 제거 ✓
- V6 8-b (재판관 + 반말 종결): enforceHonorifics가 sentence-level 반말→합니다체 ✓
- V6 8-c (합니다체 + 반말 종결 혼재): enforceHonorifics가 sentence별 처리 ✓
- V6 8-d (간접지칭 + 상대 호격): fixMisdirectedAddress가 호격 제거 ✓

## 별도 신규 hook 필요성
- 현재 파이프라인으로 커버 가능
- "한 발화에 재판관님 + 상대 호격 공존 감지 → 분리" 같은 semantic check은 과잉 설계
- **R31 프롬프트 강화로 사전 방지, 사후 hook 불필요**

## 라운드 판정: **R57 완료 — 신규 hook 불필요**

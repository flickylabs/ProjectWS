# QW V6 R44: 후처리 파이프라인 정합성 최종 점검

## 실행
- `postProcessNpcText()` (llmDialogueResolver.ts:1332) 순서 재확인

## 파이프라인 순서
```
1. fixMisdirectedAddress   — 호칭 오용 (자기야/오빠 등 + 이름+아/야 호격 제거)
2. enforceHonorifics       — 반말→합니다체 (R22+R27로 26 rule 확장)
3. fixPostpositions        — 조사 교정 (이름+은/이/을/과/를/는/가/와 자동 교정)
4. enforceTruthThrottle    — S0-S1 금액/실명 치환
5. enforceMonetaryGuard    — 비금전 사건 금전 표현 차단
6. enforceClicheFilter     — 클리셰/번역체/특정X 필터
7. enforceHaeyoMidSentence — 문장 중간 해요체
```

## 순서 판정
- 1 → 2 → 3 순서가 중요: 호격 제거 후 반말 교정, 그 뒤 조사 교정 
- 현재 순서 **합리적**
- R22/R27 추가 rule은 step 2에서 작동

## V6 집중-8 대응 시뮬레이션
| V6 입력 | Pipeline 적용 | 결과 |
|---|---|---|
| "재판관님, ... 그때 왜 솔직하게 말하지 않았어?" | enforceHonorifics R22 | "...솔직하게 말하지 않았습니까?" |
| "재판관님, ... 이걸 어떻게 설명할 생각이야?" | enforceHonorifics R27 | "...설명할 생각인가요?" |
| "자기야, 그건 말이 안 돼." | fixMisdirectedAddress | "재판관님, 그건 말이 안 돼." → enforceHonorifics → "재판관님, 그건 말이 안 됩니다." |
| "박미라이(가) 증언대에 섰다." | DiscoveryFeedbackWatcher R17 | "박미라가 증언대에 섰다." (LLM 우회, 시스템 메시지 직접) |

## 집중-9 시스템 메시지
- **NPC post-process를 거치지 않음** (speaker: 'system') → 하드코딩 조사는 DirectFix (R17/R18/R33/R34) 필요
- 모두 처리 완료 (누적 8곳)

## 라운드 판정: **PASS** (파이프라인 일관성 확인)

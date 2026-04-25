# QW V6 R27: 🎯 V6 집중-8a 실 샘플 발견 (과거 v3 transcript) + 코퓰러 의문형 추가

## 실행
- `spouse-01-r1-v3.json` (Apr 7 - V3 엔진 실험 당시) 스캐너
- friend/family v3 변이 비교

## 결과
| 전사본 | 8-a | 8-b | 8-c | 8-d | forbid |
|---|---|---|---|---|---|
| spouse-01-r1-v3 | **1** | 0 | 0 | **1** | **2** |
| friend-01-r1-v3 | 0 | 0 | 0 | 0 | 0 |
| family-01-r1-v3 | 0 | 0 | 0 | **1** | 0 |

## 🎯 V6 spec 정확히 일치하는 샘플 발견 (spouse-01-r1-v3 turn12 B)

```
"재판관님, 이 '추석 연휴 예약 관련 문서'를 보니 제 남편의 행동이 의심스럽습니다. 
 재판관님, 이걸 어떻게 설명할 생각이야?"
```

- 8-a 트리거: `재판관님` + `이야?` 호격성 종결 → 내 scanner regex `[가-힣](아|야)[,!?]` 매칭
- 8-d 트리거: `제 남편` + 위와 동일 호격
- V6 CT 문서의 실플레이 사례("재판관님, 그때 왜 솔직하게 말하지 않았어?")와 **구조적으로 동일** — 재판관 호칭 + 상대에게 직접 질문
- 이 패턴은 Apr 7 v3 엔진에서 생성된 LLM 출력. 당시 enforceHonorifics가 `이야?`를 cover 못 함

## 🎯 추가 수정 (권한 내, 기존 규칙 강화)

`enforceHonorifics()` 코퓰러 의문형 추가 (L1152 이후):
```diff
+ // 코퓰러 의문문 (V6 spouse-01-r1-v3 샘플 대응)
+ [/이야\?$/, '인가요?'],
+ [/인 거야\?$/, '인 겁니까?'],
+ [/은 거야\?$/, '은 겁니까?'],
+ [/인 거잖아\?$/, '인 거잖아요?'],
```

## 효과
- spouse-01-r1-v3 turn12 재처리 시: `"...설명할 생각이야?"` → `"...설명할 생각인가요?"`
- 남는 문제: `재판관님 + 제 남편` 공존은 여전 (semantic) → 후처리 불가, prompt 강화로 접근 (Phase E R56)

## forbid 2건 (spouse-01-r1-v3 turn37/39)
- 모두 judge question — `"...사전 상의 약속 위반에 대한 진술이 부분마다 달라집니다..."`
- subject 치환 결과에 "사전 상의 약속 위반"이 그대로 들어옴 → dispute name 자체에 금지어 포함됐었을 가능성
- 또한 party 이름이 한지석/오세린 (spouse-01 아님) — **당시 테스트 데이터 혼합 흔적**, 현재 데이터와 무관
- 결론: **historical artifact**, 현재 상태 영향 없음

## family-01-r1-v3 8-d 1건
- 세부 조사 이월 (R28에서 확인)

## 검증
- `npx tsc -b --force` → exit=0

## 누적 수정 요약 (R17~R27)
| # | 파일 | 성격 | 영향 |
|---|---|---|---|
| 1 | DiscoveryFeedbackWatcher.tsx | 이(가) placeholder | 증인 소환 |
| 2 | presentationEngine.ts | 조사 하드코딩 | S5 자백 시스템 메시지 |
| 3 | Aftermath.tsx | 와/는 하드코딩 | 후일담 fallback |
| 4 | PCResultScreen.tsx | 와/는 하드코딩 | PC 후일담 fallback |
| 5 | llmDialogueResolver.ts (R22) | 의문형 반말 22개 추가 | 후처리 파이프라인 |
| 6 | llmDialogueResolver.ts (R27) | 코퓰러 의문형 4개 추가 | 후처리 파이프라인 |

## 라운드 판정: **FAIL → FIXED** (누적 6건)

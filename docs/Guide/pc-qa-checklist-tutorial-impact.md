# PC QA 체크리스트 — 튜토리얼 + 임팩트 통합 점검

작성일: 2026-05-18
대상: 사용자 직접 spouse-01 진입해 시각 검증
환경: `npm run dev:pc` 5175 포트 (http://127.0.0.1:5175/index-pc.html)

---

## 사전 준비

```
1. dev:pc 가 5175 포트에서 떠있는지 확인 (Codex가 띄워둠)
2. 브라우저 캐시/localStorage 클리어 (튜토리얼 초기 상태 보장):
   - DevTools → Application → Local Storage → 해당 origin → solomon.tutorial.* 키 모두 삭제
3. 한국어 모드 확인 (설정 → 언어 → 한국어)
```

---

## A. 튜토리얼 점검 (10단계)

각 단계마다:
- (1) 손가락 / spotlight / dim overlay 시각 확인
- (2) 안내 카피 한국어 표시 (placeholder "[TUTORIAL_COPY_PENDING_...]" 안 보여야 함)
- (3) 완료 조건이 store mutation 기준으로 동작 (단순 클릭 아님)

| Step | 위치 | 카피 (title / body) | 확인 |
|---|---|---|---|
| 1 | 브리핑 진행 버튼 | 사건 브리핑 / 사건 개요를 확인한 뒤 시작한다. | ☐ |
| 2 | 다이얼로그 로그 / 다음 진술 | 양측의 진술 / 두 사람의 첫 진술이 기록에 남는다. | ☐ |
| 3 | 쟁점 d-1 칩 | 쟁점 선택 / 다룰 쟁점을 골라 심리를 시작한다. | ☐ |
| 4 | 캐릭터 B 슬롯 (세린) | 대상 선택 / 묻는 대상에 따라 답이 달라진다. | ☐ |
| 5 | 사실 추궁 버튼 | 사실 추궁 / 근거를 캐물어 진술의 빈틈을 본다. | ☐ |
| 6 | 증거 e-2 카드 | 증거 조사 / 증거를 자세히 살펴 단서를 얻는다. | ☐ |
| 7 | 증거 제시 버튼 (e-2 → B) | 증거 제시 / 증거를 제시해 진술을 흔든다. | ☐ |
| 8 | 피드백 카드 | 반응 확인 / 진술의 변화가 그대로 드러난다. | ☐ |
| 9 | JudgeNotebookSection (hint 깜빡임 0.8s × 2) | 재판관 수첩 / 중요한 변화는 여기에 기록된다. | ☐ |
| 10 | 자동 완료 + toast | 준비 완료 / 이제 진실은 당신이 직접 밝힌다. | ☐ |

### 추가 확인
- ☐ 우상단 "튜토리얼 건너뛰기" 버튼 노출 + 클릭 시 즉시 종료
- ☐ Skip 후 재진입 시 튜토리얼 미표시 (localStorage 영구 플래그)
- ☐ localStorage clear 후 재진입 시 튜토리얼 다시 시작
- ☐ 설정 → 튜토리얼 재실행 버튼 동작
- ☐ target이 일시 누락 시 "안내 준비 중" 폴백 카피 표시 (드물게)

### 의도적 미구현
- micro-hint 손가락 옆 짧은 텍스트 — Codex 구현 범위 밖. 시각 검토 후 표시 추가 필요 시 별도 의뢰

---

## B. 임팩트 점검 (5개 비트)

`spouse-01` 진입 후 게임 진행하면서 5개 비트 모두 확인.

### Beat 1: 새 쟁점 등장
**트리거:** 추궁/조합 결과 새 dispute emerge
**확인:** 
- ☐ 화면 dark flash 300ms
- ☐ screen-shake medium (4px, 350ms)
- ☐ vignette-strong (700ms)
- ☐ bigTypography **"새로운 쟁점"** (대형, 중앙)
- ☐ subtitle = dispute label (예: "공동 자금 해지 절차" 등 동적)
- ☐ 총 1.8초 흐름
- ☐ 기존 9 Discovery emergence flow와 병행 (모달·번개·오라 그대로)

### Beat 2: 증거 hard hit
**트리거:** 효과적 증거 제시 (effective)
**확인:**
- ☐ 카드 slam 모션 (강한 slide+bounce, 400ms)
- ☐ 대상 NPC portrait shake (0.36s)
- ☐ screen-shake light (2px, 200ms)
- ☐ 카드 우측 상단 chip **"결정적 단서"** 표시 (11px 작은 텍스트)
- ☐ SUCCESS green pulse 1.2s
- ☐ 총 1.5초

### Beat 3: 판단 충돌
**트리거:** A↔B 모순 발생 (CourtBeatClash kind='conflict')
**확인:**
- ☐ screen-freeze 200ms (모든 애니메이션 일시정지)
- ☐ 화면 좌우 split (wipe 300ms)
- ☐ 좌 panel A (지석, blue border .30 alpha) + A 주장 요약
- ☐ 우 panel B (세린, red border .30 alpha) + B 주장 요약
- ☐ 중앙 **"VS"** bigTypography amber tone `#ffb347` text-shadow
- ☐ 총 2.0초

### Beat 4: 판결 진입 (phase 6 → 7)
**트리거:** phase 6 종료 → phase 7 진입 시점
**확인:**
- ☐ phase 6 끝나면 **PCVerdictReviewMontage** 약 4초 review
  - ☐ 핵심 증거 카드 3장 점멸 (1.2s 간격)
  - ☐ 붕괴한 거짓말 카운트
  - ☐ 미해결 쟁점 표시
  - ☐ Esc/클릭 스킵 가능
- ☐ review 종료 → screen blackout 400ms
- ☐ 침묵 300ms
- ☐ 망치 클로즈업 fade-in 400ms
- ☐ bigTypography **"최종 판단"** (대형)
- ☐ gavel SFX (1.8s 시점)
- ☐ screen-flash white 200ms
- ☐ phase 7 fade-in 400ms
- ☐ 총 2.5초 (review 4s + cutscene 2.5s = 약 6.5s 전체)

### Beat 5: h-d3 책임축 반전 (T3, spouse-01 최고점, 1회)
**트리거:** spouse-01 h-d3 (`공동 자금 해지 절차`) emerge — 게임 후반
**확인:**
- ☐ screen-freeze 200ms (BGM duck -30dB)
- ☐ screen-flash dark 400ms (깊은 어둠)
- ☐ **portrait-desaturate** 1000ms (화면 내 모든 portrait — A·B·증인 — 채도 0.4로 빠짐)
- ☐ vignette-strong 700ms
- ☐ screen-shake heavy (8px, 600ms — 가장 무거운 흔들림)
- ☐ bigTypography **"사건이 완전히 다르게 보인다"** (대형, sizeScale 1.14)
- ☐ subtitle **"어디서부터 어긋났을까"** (amber tone, bigTypography 아래)
- ☐ 총 3.5초 (다른 비트보다 명확히 무겁게)
- ☐ Beat 1 일반 emerge 대신 본 비트만 발동 (둘 다 X)
- ☐ **1회만 발동** (T3 cap=1) — 같은 case 두 번째 emerge 시 발동 안 함

### T3 cap 확인
- ☐ spouse-01 한 세션 안에서 h-d3 emerge 1회 — Beat 5 발동
- ☐ (테스트) 새 세션에서 같은 h-d3 emerge — 다시 Beat 5 발동 (case당 1회 == 세션당 1회)
- ☐ Codex Playwright 검증: first true, second false 확인됨

---

## C. 통합 흐름 점검

- ☐ 튜토리얼 완주 후 자유 플레이 → 자연스러운 전이
- ☐ Beat 2 ~ Beat 5 모두 vfxHierarchyEngine cooldown 동작 (짧은 시간에 같은 비트 두 번 안 터짐)
- ☐ S4 → S5 자백 (`v4-confession-overlay`) **변경 없음** — 기존 그대로 동작
- ☐ portrait reaction 8종 (기존 5 + 신규 3: desaturated/zoomed-in/zoom-pulse) 시각 확인

---

## D. 발견 시 보고 항목

각 항목 중 비정상이 있으면 메인 세션에 회신:
- 카피가 placeholder "[TUTORIAL_COPY_PENDING_..." 상태로 보임
- 카피가 화면 영역을 넘어 잘리거나 줄바꿈 부자연
- 손가락/spotlight가 잘못된 위치
- 비트가 트리거 안 됨
- 비트가 너무 약해 보임 / 너무 강해 보임
- portrait reaction이 어색
- Beat 5에서 진실 누설 표현 발견 (예: "위임장 조작" / "투자 사기" 같은 결과 어휘 — 절대 0이어야 함)
- T3 cap 동작 이상

회신 시 가능하면 스크린샷 + 어느 step/beat인지 명시.

---

## E. micro-hint 결정

Codex가 hint 키 미구현. copy-ko.json의 `hint` 필드는 보유 자산.

시각 검토 후 결정:
- ☐ 손가락 옆 micro-hint (10자 이내) 표시 필요 없음 — 현 상태 유지
- ☐ 표시 필요 — Codex에 추가 의뢰 (i18n 키 + 컴포넌트 렌더 추가)

---

## F. Step 8 카피 미세 조정

Step 8 "반응 확인 / 진술의 변화가 그대로 드러난다." — 메인 세션 spot check 시 다른 단계 대비 약간 약하다는 평가.

시각 검토 후:
- ☐ 그대로 채택 — 화면에선 자연
- ☐ 정련 필요 — 후보 안 (메인 세션 회신해서 같이 결정)

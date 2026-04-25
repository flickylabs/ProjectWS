# 마스터 TC 인덱스 — 누적 픽스 전체 검증

> 사용자 dev 검증용. 4개 가이드 + 누적 30+건 픽스 통합 인덱스.
> 각 가이드는 독립 실행 가능. 권장 순서대로 진행.

---

## 📚 가이드 4종

| # | 파일 | 픽스 | 상태 |
|---|---|---|---|
| 1 | [TC-2nd-cycle-detailed.md](TC-2nd-cycle-detailed.md) | **9건** (S1-S4 시스템 + D1-D5 UI) | 미검증 (사용자 dev 진행 안 함) |
| 2 | [TC-phase-A-G.md](TC-phase-A-G.md) | **7 카테고리** (A체념용어 / B체념시스템 / D수첩 / E emergence / F호칭 / G ScriptedText) — 항목 30+ | 미검증 |
| 3 | [SESSION-3CYCLE-COMPLETE.md](SESSION-3CYCLE-COMPLETE.md) | **3차 사이클 12건 + 후속 5건** (Path A 비활성화 / 도넛 / 메모핀 폐기 / 설정 풀스크린 등) | 일부 자동 검증, 시각 미확인 |
| 4 | [TC-design-renewal-20260426.md](TC-design-renewal-20260426.md) | **이번 사이클 12 카테고리** (저울 PNG / HOME 그라데이션 / 모드 카드 코랄 / Phase 3a / 설정 9 카테고리 / 핫바 락 / GPT V2 3건) | 신규 미검증 |

총 **30+건 누적 픽스 전부 미검증** 상태.

---

## 🎯 권장 검증 순서

### 시나리오 1: spouse-01 풀 플레이 (한 번에 7~9건)
**시간**: 15-20분 / **검증 가이드**: [TC-2nd-cycle-detailed.md](TC-2nd-cycle-detailed.md) 시나리오 A

한 번의 spouse-01 풀 플레이로 **TC-2nd-cycle 9건 중 7건** 자연스럽게 검증.

```
1. npm run dev → http://localhost:5173
2. 새 게임 → spouse-01
3. Phase 1·2 → 심문 → 모순 모달 → 증거 → 자백
4. 시나리오 A의 Step 1~7 따라 진행
```

**검증 항목**:
- S1 호명 라우팅 (이준호/박지연 정확)
- S2 답변자 라우팅
- S3 자동 해금 시스템 메시지
- S4 모순 모달 statement 안전 폴백
- D1 모순 추궁 vs 구도
- D2 진술 엇갈림 빨강
- D3 수첩 영역 가시성
- D4 증인소환 아이콘 두께
- D5 증인 발화 톤

### 시나리오 2: 디자인 리뉴얼 시각 확인 (5분)
**시간**: 5분 / **검증 가이드**: [TC-design-renewal-20260426.md](TC-design-renewal-20260426.md) TC-1~TC-6, TC-9, TC-10

dev 진입 + HOME / SESSION / 사건 선택 / 설정 / Phase 6 중재 화면 빠르게 둘러보기:
- TC-1 저울 PNG 통일
- TC-2 HOME 설정 아이콘 (Material Icons)
- TC-3 HOME 검정 띠 그라데이션
- TC-4 모드 카드 진행 바 코랄
- TC-5 SESSION 카드 (번호/태그라인/평균/잠금 배지)
- TC-6 PCCaseBrowser zigzag (복원됨) + Primary 버튼
- TC-9 Phase 6 중재 (Primary 버튼)
- TC-10 설정 9 카테고리 (AUDIO/GAMEPLAY/DATA ready)

### 시나리오 3: Phase A~G 검증 (TC-phase-A-G)
**시간**: 30+분 / **검증 가이드**: [TC-phase-A-G.md](TC-phase-A-G.md)

체념 시스템(2턴 차단 + 자동 회복) + 호칭 + emergence + ScriptedText 정확성 검증. 깊은 게임 진행 필요.

특히 핵심:
- TC-B 체념 시스템 (B-1~B-7) — 정확히 2턴 차단 + 만료 자동 회복
- TC-E emergence 모달 흐름 + 번개 발사 시각
- TC-F 호칭 (제 아내/자기 등 callTerms 정확)

### 시나리오 4: 3차 사이클 시각 + 시스템 (SESSION-3CYCLE-COMPLETE.md)
**시간**: 10분 / **검증 가이드**: [SESSION-3CYCLE-COMPLETE.md](SESSION-3CYCLE-COMPLETE.md)

- **Path A 비활성화 효과**: 양측 사전 작성 statementA/B 누설 차단 → 모순 모달이 양측 충돌에서 안 뜸
- **도넛 SVG 사이즈 픽스**: 캐릭터 카드 외곽 도넛 정상 사이즈 (45px 강제 X)
- **메모 핀 시각화 폐기**: autoPin 시각 효과 안 보임
- **N9 수첩 박스화**: 좌측 관찰 패널과 동일 구조
- **N10 증인소환 아이콘**: 추가 두꺼움
- **N11 라벨**: '처리됨' → '확인 완료'

### 시나리오 5: 이번 사이클 핫바 락 (TC-11)
**시간**: 3분 / **검증 가이드**: [TC-design-renewal-20260426.md](TC-design-renewal-20260426.md) TC-11

ScriptedText 사건(spouse-01 등)에서 액션 클릭 → NPC 응답 직후 핫바 + 단축키(1~6, Q/W/E) 모두 차단. 타이핑 종료 후 자동 활성화.

---

## 📊 누적 픽스 카테고리별 카운트

| 카테고리 | 픽스 | 가이드 |
|---|---|---|
| **시스템 결함** (호명/답변자/모순/체념/emergence) | ~15건 | TC-2nd S1-S4 + TC-A,B,E,F |
| **UI 시각** (수첩/도넛/메모핀/저울/그라데이션/카드) | ~10건 | TC-2nd D1-D5 + TC-D + TC-3차 + TC-design |
| **설정/Phase 6/핫바 락** | ~5건 | TC-9, TC-10, TC-11 |
| **GPT V2 데이터** (spouse/family/friend) | 3건 | TC-7 |
| **호칭/스크립트** | ~5건 | TC-F, TC-G |

총 **30+건**.

---

## ⚡ 빠른 시작 (1시간 내 80% 검증)

```
1. (15분) 시나리오 1 — spouse-01 풀 플레이 → TC-2nd 9건 + TC-A,B 일부
2. (5분)  시나리오 2 — 디자인 리뉴얼 시각 확인 → TC-design 12건
3. (10분) 시나리오 4 — 3차 사이클 시각 + 시스템 → SESSION-3CYCLE
4. (3분)  시나리오 5 — 핫바 락 → TC-11
5. (남은 시간) 시나리오 3 — Phase A~G 깊은 검증
```

---

## 🚨 결함 보고 형식 (모든 가이드 공통)

```
[가이드 이름 / TC 번호]
- 위치: [화면 / 컴포넌트]
- 증상: [구체적 묘사]
- 기대: [무엇이 맞는지]
- 재현 단계: 1) ... 2) ...
- 스크린샷: (가능하면)
```

여러 결함 발견 시 한 메시지에 모아서 → 즉시 픽스 사이클.

---

## 📌 핵심 미해결 결함 (CT 메모리 기준)

다음은 **이전 dev 보고된 잠재 결함** — 검증 시 우선 확인:

| ID | 결함 | 추적 위치 | 가이드 |
|---|---|---|---|
| **B-3** | "설명이 잘립니다" 같은 LLM 어색 발화 | LLM 후처리 또는 ScriptedText | TC-G |
| **TC-E (E1~E5)** | Emergence 모달 한 번도 안 뜸 (의심) | discoveryEngine prereq | TC-E |
| **TC-E** | 자백이 캐릭터A 언급 전 시작 | confessionTrigger 조건 | (별도) |
| **A1~A4 (모순 모달)** | statementA/B 데이터 자체 결함 — Path A 비활성화로 즉시 차단됨, 완전 해결은 V2 엔진 어댑터 | M1~M7 도입 후 | (보류) |
| **TC-G S5 자백 디스패처** | 캐릭터B에게 fact_pursuit → 답변 없이 종료 | confessionDispatcher 등 4 path | (별도, dev 재현 필요) |

---

## 🎬 검증 후 다음 단계

1. 결함 발견 → 한 번에 모아서 보고 → 즉시 픽스 사이클
2. 모두 PASS → V2 엔진 연동 (M1~M7 마이그레이션) 진행
3. Profile UI/UX 정비 (사용자 시각 결함 지적 시)
4. 다음 단계 사건 추가 (현재 spouse/family/friend 외)

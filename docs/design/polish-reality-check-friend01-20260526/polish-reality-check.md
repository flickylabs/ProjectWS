# friend-01 — 현실성/당위성 검토 보고서

작성: 2026-05-26 · baseline: main HEAD `544a4cfb` · 검토자: Claude
선행 사례:
- [spouse-01 보고서](../polish-reality-check-spouse01-20260525/polish-reality-check.md) (4 P0 결정 + 적용 완료)
- [family-01 보고서](../polish-reality-check-family01-20260525/polish-reality-check.md) (e-3 폐기 + e-6 frame 정리 + P1 NO-OP 결정 완료)

**적용 상태 (2026-05-26 사용자 결정 반영)**:
- ✅ **P1 3건 일괄 적용** — e-1 / e-5 / e-7 frame anchor
- 적용 commit: 본 세션 commit (HEAD push 후 갱신)

## §0 사건 요약

- **관계**: 절친 (송다은 A / 최수민 B, 둘 다 어릴 적부터 동네 친구)
- **표면 분쟁**: 송다은이 자기 예비신랑 김태윤에게 9일간 반복 연락한 최수민을 단톡방에서 "수민이가 또 내 남자한테 연락한다"로 공개 매도. A는 변심·집착 frame
- **실체**: ① 김태윤이 먼저 최수민에게 "다은이 몰래 커피 한 번 보자" 메시지를 보냄 + 최수민 거절. 그 시점 직후 김태윤이 회사 단톡방에서 "다은이 아버지가 결혼 자금 좀 도와달래"라며 토로 → 박준혁(w-2)이 최수민에게 알림 → 최수민이 결혼 위기 차단 위해 9일간 연락 / ② 5년 전 최수민 손절의 원인은 송다은 아버지의 차용금 미상환 (변심 X / 침묵 결과). 송다은은 모름
- **법정 절차**: 명예훼손 + 친구 관계 회복 가능성 평가

본 사건의 특이성: 친구 사이 분쟁이라 **카톡 / 단톡방 / 본인 휴대폰 자료가 핵심**. spouse-01의 "본인 명의 자료 임의 소유" 문제는 거의 없음 (양측 모두 본인 휴대폰 캡처). family-01의 "기관 자료 등장 경로" 문제도 적음. 다만 다음 3 영역에서 미세 frame anchor 필요:
- e-1 송다은이 어떻게 최수민→예비신랑 연락 기록을 보유했는지
- e-5 회사 단톡방 캡처를 박준혁(w-2)이 어떻게 제공했는지
- e-7 과거/현재 대조표가 누구의 정리 자료인지

## §1 평가 기준

각 entity를 4 차원으로 본다.

1. **존재** — 현실에서 그러한 형태로 존재할 수 있는가
2. **소유** — 현실에서 누가 가지고 있을 수 있는가
3. **제출** — 어떤 경로로 법정에 등장하는가
4. **중복/패턴 회피** — 다른 entity와 형태가 겹치지 않는가

등급: ✅ 합리적 / ⚠ 약간 어색 / ❌ 변경 필수

우선순위: **P0** 변경 필수 / **P1** 조정 권장 / **P2** 향후 검토

---

## §2 Evidence 7개 — 항목별 검토

### 🟥 P0 — 변경 필수: **0건**

friend-01에는 spouse-01의 "본인 명의 자료 임의 소유" 영역과 같은 P0 변경 필수 영역 없음. 모든 자료가 카톡 / 단톡방 / 본인 휴대폰 / 본인 계좌 영역에서 자연 발견 가능.

---

### 🟨 P1 — 조정 권장

#### e-1 최수민→예비신랑 연락 기록 (9일간 전화 6번 + 문자 11건)

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ✅ | 통신 기록 자체는 실재 |
| 소유 | ⚠ | 최수민↔김태윤 사이 1:1 통신. **A(송다은)가 어떻게 캡처 보유?** trustStates submitted: "송다은이 캡처 제출" — 본인 휴대폰 X, 김태윤 휴대폰에서만 보유 가능. 김태윤이 송다은에게 자기 휴대폰 캡처 보여줬을 가능성이 자연 |
| 제출 | ⚠ | "송다은이 캡처 제출" — 김태윤이 송다은에게 화면 보여준 후 송다은이 캡처 또는 김태윤 본인이 캡처 제공 frame이 자연. 명시 X |
| 패턴 | ✅ | 중복 X |

**문제**: 송다은이 단독으로 최수민→예비신랑 통신 기록 보유는 부자연. 김태윤(예비신랑) 자료 경유 명시 필요.

**대안 (2안)**:

1. **frame 명시 (현 entity 유지 + anchor 추가)**: trustStates submitted을 "예비신랑 김태윤이 본인 휴대폰의 메시지·통화 기록을 송다은에게 캡처로 보여준 후 송다은이 본 법정에 제출"로 변경. 또는 description에 "본 자료는 김태윤(예비신랑) 휴대폰 영역의 송수신 흐름"으로 anchor 한 줄 추가
2. **김태윤 본인 제출 frame**: trustStates submitted을 "예비신랑 김태윤이 본인 휴대폰 자료를 본 법정에 직접 제출"로 변경. 단 김태윤이 본 사건의 외부 인물인데 자기 자료를 본 법정에 직접 제출하는 동기 영역 명확화 필요

→ **권고: 1안**. 송다은이 분쟁 제기 주체이므로 김태윤이 송다은에게 자료를 보여준 후 송다은이 정리·제출하는 frame이 자연. description에 한 줄 anchor 추가.

#### e-5 예비신랑 회사 단톡 떠벌림 + 최수민 9일간 차단 연락

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ⚠ | 회사 동료 단톡방은 회사 내부 영역. 외부 공개 X |
| 소유 | ⚠ | **최수민이 회사 단톡 캡처 보유 X** — 단톡 참여자만 보유 가능. 박준혁(w-2)이 회사 후배라 본인 휴대폰에 단톡 캡처 보존 가능. trustStates submitted: "최수민 또는 박준혁이 단톡 캡처 + 메시지 원본 제출" — 박준혁 frame이 자연한데 case.ts에서 모호 |
| 제출 | ⚠ | 박준혁이 단톡 캡처 본인 휴대폰에서 제공 + 최수민이 자기 9일간 메시지 캡처 제공 → 두 source 합친 evidence frame이 자연. 명시 권장 |
| 패턴 | ✅ | 중복 X |

**문제**: 회사 단톡 자료 source가 모호. 박준혁(w-2) 경유 frame을 명확히 하면 자연.

**대안 (1안)**:

1. **trustStates submitted 영역 명시**: "박준혁(w-2)이 회사 동료로서 본인 휴대폰에 보존된 회사 단톡 캡처를 제공하고, 최수민이 본인 휴대폰의 9일간 메시지 원본을 제출하여 두 자료가 본 법정에서 종합됨"

→ **권고: 1안**. 박준혁(w-2)이 동일 사건의 증인이므로 본인 보유 자료를 제공하는 frame 자연. case.ts에 명시.

#### e-7 과거/현재 대조표

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ⚠ | 대조표 = 두 시점 자료를 나란히 놓고 정리한 derived 자료. 원본 자료 (e-4 + e-5 + e-6)가 모두 등장한 후 종합 가능 |
| 소유 | ⚠ | 정리 주체가 명확 X. trustStates submitted: "재판관 측 정리 또는 최수민 제출" — 둘 다 가능하나 어느 쪽? requires: ['e-4', 'e-5', 'e-6'] + requiredLieState: 'S3' 게이트로 narrative 시점은 정합 (Cycle 9 정상) |
| 제출 | ⚠ | 재판관 측 정리 frame이 가장 자연 (본 법정이 양 시점 자료를 종합한 권위 자료). 본인 정리 frame은 사실관계 입증력 약화 |
| 패턴 | ⚠ | 다른 evidence와 다르게 derived 자료라 영역 차이 — 정합 |

**문제**: 정리 주체가 명확하지 않아 입증력 약화 가능. 재판관 측 정리 frame을 단일화하면 권위 강화.

**대안 (2안)**:

1. **재판관 측 정리 단일화**: trustStates submitted을 "본 법정이 e-4 + e-5 + e-6 자료의 시점·문구를 종합 정리한 자료"로 단일화
2. **최수민 측 정리 유지**: 현 frame 유지 (본인 정리)

→ **권고: 1안**. 재판관 측 정리 frame이 가장 자연 (양 측 어느 쪽도 자기 유리 정리 의심 회피).

---

### 🟩 ✅ — 합리적 (현행 유지)

#### e-2 공통 친구 단톡방 캡처

- 단톡방 참여자 = 송다은, 최수민, 공통 친구들. 최수민도 참여자라 본인 휴대폰에 캡처 자연.
- trustStates submitted "최수민이 캡처 제출" 자연.

#### e-3 과거 손절 직전 카톡 (수민↔다은 1:1)

- 두 사람 1:1 대화이므로 양측 모두 본인 휴대폰에 보존. 최수민 본인 제출 frame 자연.
- 본 사건의 핵심 reframe (변심 X / 사기 피해 + 침묵 결과) 입증 자료.

#### e-4 예비신랑의 선 넘는 메시지와 최수민의 거절 답장

- 최수민↔예비신랑 1:1 대화. 최수민 본인 휴대폰에 보존.
- trustStates "최수민이 캡처 제출" 자연.

#### e-6 과거 송금 영수증 + 문자 (5년 전 송다은 아버지 차용금)

- 최수민→송다은 아버지 송금 = 최수민 본인 계좌 거래 내역 (본인 명의 발급 가능) + 본인 휴대폰 문자.
- trustStates "최수민이 통장 사본 + 문자 캡처 제출" 자연.
- sensitiveSealTargets로 구체 금액/실명/계좌번호 봉인 정책 보조.

---

## §3 Witnesses 3명

| ID | 평가 | 사유 |
|---|---|---|
| w-1 김세라 (32세 미용실 직원) | ✅ | 단톡방 참여자. 송다은 발언 경위 + 친구 동조 흐름 직접 관찰. hiddenAgenda "자기도 비난 동조한 부끄러움" 자연 |
| w-2 박준혁 (34세 회사원) | ✅ | 예비신랑 회사 후배 + 최수민 필라테스 수강생 = **이중 관계 cohesion** (Cycle 7 narrative 정합 완료). 회사 단톡 직접 듣고 최수민에게 알림. neutral bias |
| w-3 오미경 (58세 분식집 사장) | ✅ | 두 사람 어릴 적부터 단골 = **장기 관찰자 cohesion**. 송다은 아버지가 가게 앞에서 최수민에게 돈 빌리려 한 장면 + 최수민 울며 들어옴 직접 목격. pro_b bias |

증인 영역 모두 자연 — friend-01의 강점.

---

## §4 Dossier Cards 5개

| ID | 구성 | 평가 |
|---|---|---|
| dc-1 단톡방 글의 근거 | e-1 + e-2 → d-5 | ✅ |
| dc-2 먼저 넘은 선 | e-1 + e-4 → d-1, d-2 | ✅ |
| dc-3 같은 부탁 | e-5 + e-6 → d-3 | ✅ |
| dc-4 손절의 이유 | e-3 + e-6 → d-4 | ✅ |
| dc-5 낙인의 순서 | e-2 + e-7 → d-1, d-5 | ✅ |

evidence 변경 시 cascade 영향: e-1 / e-5 / e-7 frame anchor 변경은 description 안 — noteText 영향 거의 없음.

---

## §5 Disputes 5개

| ID | 평가 | 사유 |
|---|---|---|
| d-1 9일간의 연락 의도 | ✅ | A: 집착 / B: 경고 frame 정합 |
| d-2 예비신랑의 선 넘는 접근 | ✅ | A: 수민 먼저 / B: 예비신랑 먼저 frame 정합 |
| d-3 아버지의 돈 접근 패턴 | ✅ | A: 단발성 / B: 반복 시도 frame 정합 |
| d-4 과거 손절과 아버지의 사기 | ✅ | A: 수민 변심 / B: 차용금 미상환 frame 정합 |
| d-5 단톡방 매도와 명예훼손 | ✅ | A: 사실 공유 / B: 확인 없는 공개 매도 frame 정합 |

dispute name 모두 자연. 변경 권장 항목 없음.

---

## §6 종합 권고 — 우선순위

### P0 — 변경 필수

**0건**. friend-01에는 spouse-01의 "본인 명의 자료 임의 소유" 영역과 같은 P0 변경 필수 영역 없음.

### P1 — 조정 권장 (3건)

1. **e-1 최수민→예비신랑 연락 기록 — 김태윤 휴대폰 source frame 명시**
   - 작업: case.ts e-1 description에 "예비신랑 김태윤 휴대폰 영역의 송수신 흐름" anchor 한 줄 + trustStates submitted "김태윤이 송다은에게 자료를 보여준 후 송다은이 본 법정에 제출" 변경
   - cascade: dc-1 / dc-2 noteText 영향 거의 없음

2. **e-5 예비신랑 회사 단톡 + 최수민 9일간 메시지 — 박준혁(w-2) 단톡 source frame 명시**
   - 작업: trustStates submitted "박준혁(w-2)이 회사 동료로서 본인 휴대폰의 회사 단톡 캡처를 제공하고, 최수민이 본인 휴대폰의 9일간 메시지 원본을 제출하여 본 법정에서 종합" 변경
   - cascade: dc-3 noteText 영향 거의 없음

3. **e-7 과거/현재 대조표 — 재판관 측 정리 frame 단일화**
   - 작업: trustStates submitted "본 법정이 e-4 + e-5 + e-6 자료의 시점·문구를 종합 정리한 자료" 단일화
   - cascade: dc-5 noteText 영향 거의 없음

### P2 — 향후 검토 (0건)

특이 영역 없음. 카톡 자료 갈래 중복 (e-2/e-3/e-4/e-5)은 사건 본성상 자연 — 변경 X.

---

## §7 적용 완료 (2026-05-26)

| Phase | 작업 | 결과 |
|---|---|---|
| 1 | 사용자 결정: P1 3건 일괄 적용 | ✅ |
| 2 | case.ts e-1 / e-5 / e-7 frame anchor (description + trustStates) | ✅ |
| 3 | derive 4 layer 재생성 (build-core-case --case friend-01 --write) | ✅ L1 ~1 |
| 4 | derive cascade 한계 발견 — `v3TrustStates.summary`는 existing 보존 정책 → generated 4언어 파일 직접 수정 필요 | ✅ |
| 5 | KO + EN + JA + ZH-CN 4언어 generated/friend-01.*.json e-1/e-5/e-7 v3TrustStates submitted 직접 수정 (12 entries) | ✅ |
| 6 | 검증 4종 (tsc 0 errors / qa:fast P0=0 / truth-leak 0 findings / derive success) | ✅ |
| 7 | dossier noteText cascade 검토 — frame anchor 영향 미세, noteText 정합 영향 없음 | ✅ |

---

## §8 spouse-01 / family-01 보고서와의 차이

| 영역 | spouse-01 | family-01 | friend-01 |
|---|---|---|---|
| **P0 변경 필수** | 3건 (e-5 계좌 / e-8 휴대폰 검색 / e-9 보험 견적) | 0건 (사용자 결정 — e-3는 cascade로 폐기) | **0건** |
| **사용자 결정 영역** | w-4 신설 vs 종이 자료 대체 / 4 evidence 교체 | e-3 폐기 (음성증언 ↔ w-1 증인 중복) + e-6 어머니 통장 frame + P1 나머지 NO-OP | P1 3건 frame anchor만 |
| **case.ts 변경 규모** | 큰 변경 (4 evidence 신규) | 중간 변경 (e-3 폐기 + e-6 frame) | **작은 변경 (frame anchor 3건만)** |
| **다국어 sync 영향** | 큼 | 큼 (4언어 106 entries 제거) | 미세 (frame anchor만) |
| **사건 본성** | 부부 분쟁 — 본인 명의 자료 임의 소유 문제 핵심 | 형제 상속 — 기관 자료 등장 경로 + 어머니 유품 자발 제출 | **친구 분쟁 — 카톡/단톡방/본인 휴대폰 자료가 핵심 (자연)** |

→ friend-01은 **3 사건 중 reality 영역 가장 강함**. 작은 frame anchor 보강만으로 정합.

---

## §9 본 보고서의 위치

본 보고서는 **사건 3 friend-01**의 현실성/당위성 검토. 3 사건 polish-reality-check 보고서 시리즈의 **마지막 사건**.

사용자 항목별 결정 (P1 3건) 후 위 절차로 진행. 적용 후 3 사건 reality 영역 모두 정합 완료.

---

## 참고 파일 (사용자 검토용)

- [src/data/coreCases/friend-01.case.ts](../../../src/data/coreCases/friend-01.case.ts) — case 권위 (evidence/witnesses/dossier/disputes)
- [src/data/coreCases/friend-01.narrative.ts](../../../src/data/coreCases/friend-01.narrative.ts) — narrative wrapper (Cycle 7/8/8b 모두 종료)
- [src/data/scriptedText/friend-01.json](../../../src/data/scriptedText/friend-01.json) — emergence_narrative + evidence_present 등 채널 KO 권위
- [reports/case-relationship-map.html](../../../reports/case-relationship-map.html) — entity 관계도 시각화
- [선행 사례 spouse-01 보고서](../polish-reality-check-spouse01-20260525/polish-reality-check.md)
- [선행 사례 family-01 보고서](../polish-reality-check-family01-20260525/polish-reality-check.md)

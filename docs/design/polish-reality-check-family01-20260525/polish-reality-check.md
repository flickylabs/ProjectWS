# family-01 — 현실성/당위성 검토 보고서

작성: 2026-05-25 → 2026-05-26 · baseline: main HEAD `5c0ab871` · 검토자: Claude
선행 사례: [spouse-01 보고서](../polish-reality-check-spouse01-20260525/polish-reality-check.md) (동일 4 차원 평가 / 4 P0 결정 + 적용 완료)

**적용 상태 (2026-05-26 사용자 결정 반영)**:
- ✅ **e-3 폐기** (음성증언과 w-1 증인 동일 인물 중복) — w-1 testimony.byDispute['d-1']로 단일화
- ✅ **e-6 어머니 통장 frame 정리** — depthStages context + trustStates submitted (상속인 자격 발급)
- ❌ **P1 나머지 (e-2/e-4/e-5/e-7) NO-OP** (사용자 결정: 게임 흐름상 자세히 언급할 상황 X)
- 적용 commit: 본 세션 commit (HEAD push 후 갱신)

## §0 사건 요약

- **관계**: 형제 (윤태성 A 48세 / 윤정후 B 44세)
- **표면 분쟁**: 어머니 사망 후 공증 유언장 60:40 (정후 60 / 태성 40) 분배에서 장남 태성이 분노 → 상속 분쟁
- **실체**: ① 어머니 자필 연습본 90:10 (정후 더 많이) → 공증 절차 안에서 정후 본인이 자기 몫을 60:40으로 줄임 (절차 개입은 인정 / 동기는 보호 명분) / ② 정후는 어릴 적부터 형이 친아버지 친자가 아니라는 비밀을 알고 있었음. 본래 본인이 물려받을 가업 공장도 형에게 양보 + 20년간 본인 계좌 → 어머니 통장 → 형 쪽으로 월 정기 + 공장 위기 3억원 송금 (형은 어머니 돈으로 믿음)
- **법정 절차**: 상속 회복 청구 또는 유언 효력 확인 / 양측 책임 영역 (A 유산 당연시 + B 절차 개입)

본 사건의 특이성: 부부 사건(spouse-01)과 달리 **본인 명의 자료의 임의 소유 문제는 거의 없음**. 대신 다음 3 영역이 핵심 검토 대상:
- 기관 자료(요양원/공증사무소/은행)의 등장 경로 frame
- 어머니 유품 자료(자필 연습본 / 일기장)의 보관자(정후) 자발 제출 시점 정합
- 직무 관계자(전 요양보호사) 비공식 녹음의 동기 영역

## §1 평가 기준

각 entity를 4 차원으로 본다.

1. **존재** — 현실에서 그러한 형태로 존재할 수 있는가
2. **소유** — 현실에서 누가 가지고 있을 수 있는가
3. **제출** — 어떤 경로로 법정에 등장하는가 (본인 제출 / 사실조회 / 영장 / 자발 협조 / 유품 정리 등)
4. **중복/패턴 회피** — 다른 entity와 형태가 겹치지 않는가

등급: ✅ 합리적 / ⚠ 약간 어색 / ❌ 변경 필수

우선순위: **P0** 변경 필수 / **P1** 조정 권장 / **P2** 향후 검토

---

## §2 Evidence 7개 — 항목별 검토

### 🟥 P0 — 변경 필수

#### e-6 오래된 계좌 흐름

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ✅ | 은행 거래 내역 자체는 실재 |
| 소유 | ❌ | **3 채널 통합 자료** — 정후 본인 계좌 출금 + 어머니 통장 경유 + 형(태성) 통장 입금. 각각 본인 명의 외 발급 X. 정후 계좌·태성 계좌는 본인만 발급 가능. 어머니 통장은 상속인 자격으로 양측 모두 발급 가능 |
| 제출 | ❌ | 현재 trustStates: "은행 측 계좌 자료 제출" — 등장 경로 불명확. 정후가 자발 제출이라면 d-3 단계 진입 후 narrative 정합 / 영장이면 별도 frame 명시 / 어머니 통장 자료는 A가 상속인 자격으로 발급 가능 |
| 패턴 | ✅ | 다른 evidence와 중복 X |

**문제**: 3 채널 통합 자료를 단일 evidence로 묶었으나 **누가 어떻게 등장시키는지 frame이 모호**. surfaceName "오래된 송금 내역 묶음"이 누가 정리한 묶음인지 불명. d-3 ("오래된 지원의 출처") 입증 자료라 등장 시점에 따라 narrative meaning이 크게 달라짐.

본 사건의 핵심 진실 (정후 본인 돈 → 어머니 통장 → 형) 입증의 hard 단서이므로 frame 명확화가 가장 중요.

**대안 (3안)**:

1. **frame 명시 (현 entity 유지 + narrative anchor 추가)**: case.ts e-6 description에 "윤정후 측이 d-3 단계 진입 후 본인 보관 자료 + 어머니 통장 자료 + 형 입금 내역 묶음을 자발 제출" anchor 한 줄 추가. narrative wrapper (Cycle 6 종료된 d-3 line)에 이미 정후 자발 제출 narrative trigger 있음 — 이미 정합 frame이 narrative 영역에 들어가 있음을 case.ts 권위로 명시
2. **분리 (2 evidence로)**: e-6a "어머니 통장 거래 내역 (A 발급)" + e-6b "정후 본인 계좌 출금 + 형 입금 흐름 사본 (정후 자발 제출)" — 게임 흐름 복잡화 + dc-3 / dc-5 link 재배치 필요
3. **시점 후반화**: e-6은 dc-3 단계 (d-3 단서 등장 + 정후 자발 제출 frame)에서만 등장 — narrative 시점은 이미 그렇게 되어 있으나 case.ts 권위에 명시 필요

→ **권고: 1안**. case.ts e-6 description/surfaceDescription에 "윤정후 측이 d-3 단계 진입 후 본인 계좌 자료를 자발 제출" frame 한 줄 anchor 추가 + provenance를 'institutional'에서 'self_possessed' (정후 측)으로 변경 검토. trustStates submitted 영역도 "윤정후 측에서 본인 계좌 + 어머니 통장 자료 자발 제출"로 통일.

---

### 🟨 P1 — 조정 권장

#### e-2 요양원 방문기록

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ✅ | 시설 방문 일지는 실재 |
| 소유 | ⚠ | **시설 측 내부 자료**. 외부 공개 X 원칙 (개인정보보호법 + 시설 내규). 다른 입소자 정보 혼재 가능성 |
| 제출 | ⚠ | trustStates "요양원 측 방문기록 사본 제출" — 자발 제출보다 **법원 사실조회 또는 가족 정보 요청 후 시설 동의** 경로가 일반적. 분쟁 초기 단계 시점 정합 부족 |
| 패턴 | ✅ | 중복 X |

**문제**: 분쟁 초기에 요양원 측이 자발적으로 사본을 제출하는 frame은 부자연. 사실조회 신청(법원 절차) 또는 본인 가족 정보 요청 (입소자 사망 후 직계 가족 권한)이 일반적.

**대안 (2안)**:

1. **frame 변경**: trustStates submitted 영역 "윤태성 또는 윤정후가 직계 가족 자격으로 요양원에 본인 방문 기록 사본 요청 + 시설 측 동의 후 제출"로 명시
2. **사실조회 frame**: "본 법정의 사실조회 결과 요양원 측 회신 자료"로 시점 후반화 — 게임 흐름과 충돌 가능 (e-2는 dc-1 입증 자료라 초반 등장 필수)

→ **권고: 1안**. 직계 가족 자격 frame이 가장 자연.

#### e-3 전 요양보호사 음성증언

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ⚠ | 직무 중 환자/가족 발화를 비공식 녹음한 것 자체가 어색 |
| 소유 | ⚠ | 본인 휴대폰 녹음 → 본인 소유 OK. 통신비밀보호법상 대화 당사자 1인 녹음은 합법. 다만 **왜 녹음했는지 동기 부재** |
| 제출 | ⚠ | trustStates "전 요양보호사 본인이 제출" — 퇴직 후 본인 의지로 제출. 동기는 hiddenAgenda("교체 과정 책임 회피")로 일부 해소되나 녹음 자체 동기는 별도 |
| 패턴 | ✅ | 중복 X |

**문제**: 사용자가 명시한 영역. 직무 중 비공식 녹음의 동기가 case.ts 어디에도 명시되지 않음. narrative 영역에서 "어머니 안전 우려" 정도의 anchor가 필요.

**대안 (2안)**:

1. **녹음 동기 anchor 추가**: case.ts e-3 description에 "최복순이 퇴직 직전 어머니 안전 우려로 휴대폰에 비공식 메모용으로 남긴 녹음" 한 줄 추가
2. **녹음 형태 변경**: 음성증언 → 본인 비공식 메모 (수첩/메모장)로 형태 자체 변경 — type을 'audio'에서 'note'로 + dc-1 link 영역 보존

→ **권고: 1안**. type을 'audio' 유지하고 녹음 동기 anchor만 추가. 통신비밀보호법상 합법 + 동기 명확화로 현실성 확보.

#### e-4 공증인 메모 기록

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ⚠ | 공증인 내부 메모는 보통 사무소 보관. 외부 공개 영역 미묘 |
| 소유 | ⚠ | **공증사무소 직업적 비밀 보호 영역** (공증인법 + 사무소 내규) |
| 제출 | ⚠ | trustStates "공증사무소 측 메모 사본 제출" — **사실조회/문서송부촉탁 + 공증인 본인 동의** 또는 **공증인 본인이 증인 출석 시 자료 제출** 경로 일반적 |
| 패턴 | ✅ | 중복 X |

**문제**: 분쟁 초기 자발 제출은 부자연. e-4는 w-2 (공증인 메모 담당 김영수) 증인 출석과 함께 등장하는 frame이 더 자연.

**대안 (2안)**:

1. **w-2와 묶음 frame**: trustStates submitted 영역 "공증인 본인이 증인 출석 시 자기 작성 메모를 본 법정에 제출" — w-2가 자기 메모를 본인 자격으로 제출 frame
2. **사실조회**: 법원 문서송부촉탁 결과 — 시점 후반화 부담

→ **권고: 1안**. w-2 증인 출석 frame과 자연 결합 + 공증인 직업적 영역 보호 명분 정합.

#### e-5 어머니 자필 유언장 연습본

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ✅ | 자필 연습본 자체는 실재 가능 |
| 소유 | ⚠ | **어머니 유품 — 정후 보관 중**. d-4 보호 명분 frame과 정합 (정후가 어머니 사망 직전 어머니 집에서 발견 + 보관) |
| 제출 | ⚠ | trustStates "윤정후 측에서 유품 자료로 제출" — **자기 측에 불리한 자료 자발 제출 동기**. requiredLieState: 'S5' 게이트로 narrative 시점 정합 (이미 narrative wrapper에 d-5 단계 등장 narrative 있음) |
| 패턴 | ⚠ | e-1과 '유서 자료' 갈래 부분 중복. 단 공증본 vs 자필 연습본 차이로 별도 entity 정당화 |

**문제**: 자기 몫을 줄이는 방향으로 절차에 손댄 정후가 자필 연습본(자기 몫이 더 많은 원안)을 자발 제출하는 동기. d-4 / d-5 단계에서 보호 명분이 더 이상 통하지 않아 어머니 뜻 원본을 드러내는 narrative 정합 가능하나, case.ts 권위에 anchor 없음.

**대안 (1안)**:

1. **narrativeJustification anchor**: case.ts e-5 description에 "윤정후가 어머니 유품 정리 시 발견하여 보관해 왔으며, d-5 단계 진입 후 어머니 뜻 원본을 본인 책임 영역으로 제출" 한 줄 추가

→ **권고: 1안**. narrative 시점은 이미 정합. 권위 anchor만 보강.

#### e-7 어머니 일기장

| 차원 | 평가 | 사유 |
|---|---|---|
| 존재 | ✅ | 일기장 자체는 실재 가능 |
| 소유 | ⚠ | **어머니 유품 — 정후 보관 중**. d-4 보호 명분 frame과 정합 (정후가 어머니 사망 후 유품 정리 시 발견 + 형 정체성 보호 명분으로 보관) |
| 제출 | ⚠ | trustStates "윤정후 측에서 유품으로 제출" — **출생 비밀 (sensitive seal 영역) 포함 자료 자발 제출 동기**. requiredLieState: 'S2' + sensitiveSealTargets (친부 실명 봉인) 정책으로 보조 |
| 패턴 | ⚠ | e-5와 '어머니 유품 + 정후 보관' 갈래 중복. 단 일기장 vs 연습본 차이로 별도 entity 정당화 |

**문제**: 사용자가 명시한 영역. 정후가 형 정체성 보호 명분으로 침묵해 왔는데, 왜 결국 일기장을 제출하는지 narrative 동기 명시 필요. d-4 단계 진입 + 침묵 명분이 더 이상 유효하지 않은 시점에 제출 frame 정합. sensitiveSealTargets는 친부 실명 봉인으로 인도성 점수 보호.

**대안 (2안)**:

1. **narrativeJustification anchor**: case.ts e-7 description에 "윤정후가 어머니 유품 정리 시 발견 + 형 정체성 보호 명분으로 보관해 왔으며, d-4 단계 진입 후 침묵 동기를 자료로 갈음하는 영역으로 제출" 한 줄 추가
2. **제3자 발견 frame**: 박순애(w-3) 또는 다른 어머니 지인이 어머니 사망 후 유품 정리를 도우며 발견 → 정후 동의로 본 법정 제출 — 자발 제출 동기 분산

→ **권고: 1안**. narrative 시점은 이미 정합. 권위 anchor만 보강. 정후가 직접 제출하는 frame이 d-4 침묵 동기와 정합 강함.

---

### 🟩 ✅ — 합리적 (현행 유지)

#### e-1 60:40 유서 사본 (공증본)

- 공증본 사본은 상속인 자격으로 양측 모두 발급 가능 (공증사무소 + 공증인법). A가 분쟁 제기 주체로 1차 제출 자연.
- 다만 trustStates submitted 영역 "윤태성이 공증 유서 사본을 제출했다"가 명시되어 있어 frame 명확. ✅

---

## §3 Witnesses 3명

| ID | 평가 | 사유 |
|---|---|---|
| w-1 최복순 (전 요양보호사) | ✅ | 합리적. 본인 관찰 + 박순애(w-3)에게서 어머니 평소 발화 일부 전해 들음 — 두 채널 정당. hiddenAgenda "교체 과정 책임 회피" 자연 |
| w-2 김영수 (공증인 메모 담당) | ⚠ | 본인 업무 영역 + 자기 메모 제출 frame 가능. **공증인 직업적 비밀 보호 영역과 충돌 가능** — 본인 동의 + 증인 출석 frame 명시 권장 |
| w-3 박순애 (어머니 오랜 지인) | ✅ | 자연. 어머니 두 채널 관찰 (마음 영역 + 평소 생활) + w-1과 동네 친분 cohesion. pro_a bias 자기 해석 포장 가능성도 distortionRisk 'biased'로 명시 |

**P1 — w-2 영역**: e-4 변경(권고 1안 — w-2 증인 출석 시 자기 메모 제출 frame)과 묶어 처리. witness 자체 변경은 X, 등장 frame anchor만 보강.

→ **권고**: w-2 변경 X, e-4 anchor 보강으로 정합.

---

## §4 Dossier Cards 5개

dossier는 evidence 조합 결과물이라 evidence 변경이 dossier에 cascade됨. evidence 변경 시 영향받는 dossier:

| ID | 구성 | 영향 |
|---|---|---|
| dc-1 말년의 종이 | e-1 + e-2 + e-3 | e-2 / e-3 frame anchor 추가 시 noteText 무영향 (description 변경 없음) |
| dc-2 수정된 유언장 | e-4 | e-4 frame anchor 추가 시 noteText 무영향 |
| dc-3 20년의 돈 | e-6 | **e-6 변경 (P0) 시 description/noteText 미세 수정 검토** — "윤정후 측 자발 제출 자료" frame 일관성 |
| dc-4 감춘 이유 | e-7 | e-7 frame anchor 추가 시 noteText 무영향 |
| dc-5 어머니의 뜻 | e-1 + e-6 + e-7 | **e-6 변경 시 영향 동일 (dc-5 noteText에 e-6 영역 명시되어 있어 미세 검토)** |

---

## §5 Disputes 5개

| ID | 평가 | 사유 | 영향 |
|---|---|---|---|
| d-1 유서 작성과 판단 능력 | ✅ | 외도 의심처럼 단정 frame이 아니라 도움/개입 경계 frame 정합 | 변경 X |
| d-2 공증 절차의 개입 | ✅ | 절차 개입 영역 명확 + hidden 처리 정합 | 변경 X |
| d-3 오래된 지원의 출처 | ✅ | 자금 출처 frame 정합 | 변경 X |
| d-4 가족 기록과 침묵의 이유 | ✅ | 출생 비밀 + 침묵 동기 frame 정합 | 변경 X |
| d-5 어머니의 숨겨진 마음 | ✅ | 양측 책임 통합 frame 정합 | 변경 X |

dispute name은 모두 자연. 변경 권장 항목 없음.

---

## §6 종합 권고 — 우선순위 + 적용 결과

### 2026-05-26 사용자 결정 반영

**관점 변경 (사용자)**:
- e-6의 자료 source는 어머니 통장 거래 내역 중심이므로 P0 → P2 (frame 미세 sharpening). 어머니 통장에 정후 송금 입금 + 어머니 통장에서 형 쪽 입금이 한 통장에 모두 기록되어 있고, 상속인 자격으로 양측 모두 발급 가능
- e-3는 w-1 (전 요양보호사 최복순) 증인과 동일 인물 영역이라 두 채널 중복. P0/P1보다 더 큰 영역 — **evidence 폐기 + 증인 단일화**
- e-2/e-4/e-5/e-7 P1 anchor는 게임 흐름상 자세히 언급할 상황이 없어 **NO-OP** 처리

### 적용 영역 (본 세션)

| # | 항목 | 결정 | 작업 |
|---|---|---|---|
| 1 | **e-3 음성증언 폐기** | 적용 | evidence 정의 제거 + w-1 testimony 단일화 + dc-1/d-1/combine-11/authorityPlacements cascade + ScriptedText 4언어 106 entries 제거 + HTML 관계도 sync |
| 2 | **e-6 어머니 통장 frame 정리** | 적용 | depthStages context 정후 본인 계좌 영역 → 어머니 통장 시점 정리 + trustStates submitted 상속인 자격 발급 명시 |
| 3 | e-2 요양원 방문기록 frame | NO-OP | 사용자 결정 (게임 흐름 영향 X) |
| 4 | e-4 공증인 메모 w-2 출석 frame | NO-OP | 동일 |
| 5 | e-5 자필 연습본 정후 보관 anchor | NO-OP | 동일 |
| 6 | e-7 일기장 정후 보관 anchor | NO-OP | 동일 |

### 적용 결과

- **case.ts**: evidence 7 → 6 (e-3 제거) + d-1 progressionStages requiredEvidence 정리 + dc-1 linkedEvidence/leadLine 정리 + combine-11 폐기 + authorityPlacements 3 모멘트 w-1 시점으로 변경 + e-6 depthStages/trustStates 정리
- **narrative.ts**: e3NarrativeTriggers 폐기 + dc1-via-combo-11 trigger 제거 + cascade chain 주석 정리
- **ScriptedText**: 4언어 e-3 entries 106 제거 (KO 31 + EN/JA/ZH-CN 각 25)
- **HTML**: entity-registry e-3 + e-6 desc + w-1 desc + dc-1 linkedEvidence 변경 / emergence-data e-3 array 통째로 제거 (128 lines)
- **Derive 4 layer**: build-core-case --case family-01 --write 성공 (L1 ~5 / L3 ~4 / L4 ~3 / L5 top-level 무변경)

### 검증 4종 PASS

| 검증 | 결과 |
|---|---|
| tsc -b --noEmit | 0 errors |
| qa:fast | RELEASE READY (P0=0 hard=0) |
| detect-truth-leak --strict | 0 findings (4언어 모두 0) |
| build-core-case derive | success (4 layer 모두 write) |

---

## §7 다음 단계 절차 (완료된 작업)

| Phase | 작업 | 결과 |
|---|---|---|
| 1 | 사용자 항목별 결정 | ✅ e-3 폐기 + e-6 frame 정리 + P1 나머지 NO-OP |
| 2 | case.ts + narrative.ts 변경 | ✅ |
| 3 | ScriptedText 4언어 e-3 entries 제거 | ✅ 106 entries |
| 4 | HTML 관계도 sync | ✅ |
| 5 | Derive 4 layer 재생성 | ✅ |
| 6 | 검증 4종 | ✅ 모두 PASS |
| 7 | commit + push | (본 세션 진행 중) |

---

## §8 spouse-01 보고서와의 차이

spouse-01: **본인 명의 자료의 임의 소유 문제** (e-5 계좌 / e-8 휴대폰 검색 / e-9 보험 견적)가 P0 변경 필수 핵심. 결과: 3 evidence 모두 신규 자료로 교체 + w-4 신설.

family-01: **본인 명의 자료의 임의 소유 문제는 거의 없음** (상속 분쟁이라 양측 모두 직계 가족 권한). 대신:
- 기관 자료 등장 경로 frame (e-2 / e-4)
- 어머니 유품 자료 자발 제출 시점 정합 (e-5 / e-7)
- 직무 관계자 비공식 녹음 동기 (e-3)
- 3 채널 통합 자료 frame 명확화 (e-6 — 본 P0 영역)

→ 결과적으로 **evidence 폐기/교체 0건, frame anchor 보강 6건**. case.ts 변경 규모도 spouse-01보다 작고 ScriptedText cascade 영향도 미세.

---

## §9 본 보고서의 위치

본 보고서는 **사건 2 family-01**의 현실성/당위성 검토. 사용자 항목별 결정 (P0 1건 + P1 5건) 후 위 절차로 진행. 다음은 동일 절차를 **friend-01**에 순차 적용 예정.

---

## 참고 파일 (사용자 검토용)

- [src/data/coreCases/family-01.case.ts](../../../src/data/coreCases/family-01.case.ts) — case 권위 (evidence/witnesses/dossier/disputes)
- [src/data/coreCases/family-01.narrative.ts](../../../src/data/coreCases/family-01.narrative.ts) — narrative wrapper (Cycle 5/6/7 모두 종료)
- [src/data/scriptedText/family-01.json](../../../src/data/scriptedText/family-01.json) — emergence_narrative + evidence_present 등 채널 KO 권위
- [reports/case-relationship-map.html](../../../reports/case-relationship-map.html) — entity 관계도 시각화 (entity-registry + emergence-data 모두 sync 완료)
- [선행 사례 spouse-01 보고서](../polish-reality-check-spouse01-20260525/polish-reality-check.md) — 동일 4 차원 평가 패턴

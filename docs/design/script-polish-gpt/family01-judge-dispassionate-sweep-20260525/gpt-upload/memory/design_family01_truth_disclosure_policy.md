---
name: design-family01-truth-disclosure-policy
description: "family-01 사건의 진실 노출 정책 — 출생 비밀 / 친자 / 정후 돈 (20년 송금 + 3억) / 자필 90:10 / 공장 양보 / 형 정체성 5 keyword 그룹별 등장 정책. dispute 5 chain 단계별 disclosure tier."
metadata:
  node_type: memory
  type: project
  originSessionId: continuation-from-phase3-start
---

## 사건 구도 확인

family-01 = 형제 유산 다툼 + 다층 가족 비밀:

- **partyA = 윤태성**: 48세, 주방가구 공장 대표, `confrontational` archetype. 평생 장남이라 믿어온 자기 정체성 + 어머니 돌봄 보상으로서의 유산 frame. **claimant (전면 무효 + 동생 개입 단정 쪽)**.
- **partyB = 윤정후**: 44세, 자동차부품 가게, `affect_flattening` archetype. 형이 친자가 아님을 알고도 가업 공장을 양보 + 20년 비밀 송금 + 어머니 자필 90:10을 공증 60:40으로 줄인 책임. **defendant (담담하게 사실 인정 / 동기는 보호 명분 쪽)**.

## 5 Keyword 그룹별 등장 정책 (player-visible text)

### 그룹 1 — `출생 비밀 / 친자가 아니다 / 배다른 / 아버지 피`
- **사전 진술 (S0~S2)**: 양측 모두 절대 등장 X. 일기장 영역 검증 전. dossier dc-4 unlock 전.
- **d-4 S3 이후**: B가 "친자가 아닌 사실 + 어머니 결정에 따른 침묵"으로 인정. 그러나 친부 실명 / 구체적 출생 경위는 봉인 유지.
- **d-4 S5**: 양측 진실 완전 인정. 친부 실명만 영구 봉인 (민감 정보 봉인 정책).
- **위반 영역**: A의 S0~S2 발화에 등장 시 P0 leak (A는 사건 후반까지 출생 비밀 인지 X).

### 그룹 2 — `정후 돈 / 윤정후 돈 / 어머니 통장 경유 / 정기 지원금 / 3억원 전달 / 20년 비밀 지원`
- **사전 진술 (S0~S1)**: A는 어머니 돈 frame strict. B는 모름 strict.
- **d-3 S2 이후**: e-6 (계좌 흐름) original 단계 + dc-3 unlock 후 B가 송금 사실 인정 가능.
- **d-3 S5**: 양측 20년 진실 완전 인정.
- **truth-leak-matrix hidden** (baseline): "윤정후 돈이 어머니 통장을 거쳐 전달" / "월 단위 정기 지원금" / "공장 위기 때 3억원" — surface phrase 정밀 검출용.

### 그룹 3 — `자필 90:10 / 공증 60:40으로 축소 / 자기 몫 양보`
- **사전 진술 (S0~S4)**: B가 "비중 차이 존재"만 인정. 정확 수치는 봉인.
- **d-5 S5**: e-5 (자필 연습본) requiredLieState='S5' 도달 후 정확 수치 노출.
- **e-5 sensitiveSealTargets**: 자필 비율 정확 수치 / 자기 몫 축소 방향 → S5 도달 후만 노출.
- **위반 영역**: d-5 S4 이전에 "90:10" 또는 "60:40으로 줄임" 표현 등장 시 P0.

### 그룹 4 — `공장 양보 / 친자가 양보 / 형 자존심 / 형의 정체성`
- **사전 진술 (S0~S2)**: 양측 모두 등장 X.
- **d-3 S4 이후**: B가 "형 자존심 동기" 명시 가능 (구체 공장 양보는 d-4에서).
- **d-4 S4 이후**: B가 "친자 양보" + "형 정체성 보호" 동기 명시.
- **d-4 S5**: 양측 진실 완전 인정.

### 그룹 5 — `유산 당연시 / 보호 명분 / 어머니 뜻 왜곡 / 두 번 왜곡`
- **사전 진술 (S0~S2)**: 양측 모두 자기 frame 유지. 단어 자체 등장 X.
- **d-5 S3 이후**: B가 "보호 명분" 동기 명시. A가 "당연시" frame 부분 인정.
- **d-5 S5**: 양측 "두 번 왜곡" 책임 완전 인정.
- **본 그룹은 동기/태도 영역 — [[design_truth_leak_keyword_nature]] 정책상 false positive 영역**. truth-leak-matrix hidden에 등록 X. truthStages.forbiddenKeywords로만 LLM frame inject.

## 신규 콘텐츠 작성 시 self-check

family-01의 신규 ScriptedText / Dialogue 작성 시:

1. **사전 진술 영역(S0~S2)에 그룹 1 표현 등장 시 → 즉시 제거** (출생 영역 절대 봉인).
2. **'정후 돈' / '20년 송금' / '3억원' 등장 시 → d-3 S2 이상 확인** (계좌 자료 unlock 후만).
3. **'자필 90:10' 등 정확 수치 등장 시 → d-5 S5 확인** (e-5 ESTABLISHED 단계만).
4. **'공장 양보' / '친자 양보' 등장 시 → d-4 S3 이상 확인**.
5. **'유산 당연시' / '보호 명분' / '두 번 왜곡' 등장 시 → d-5 S3 이상 확인** (단 truth-leak-matrix는 hidden X — 광역).
6. **친부 실명 영역 → 영구 봉인** (민감 정보 봉인 정책).
7. **'친자 확인' / '윤정후 입양' / '다른 부모' 같은 베이스라인 matrix hidden 영역 → S5까지 hidden** (matrix hidden phrase 정밀).

## evidence별 봉인 단계 권위

| evidence | name | surfaceName | requiredLieState | sensitiveSeal |
|---|---|---|---|---|
| e-1 | 60:40 유서 사본 | 분배 비율이 적힌 서류 사본 | (없음, S0 노출 가능) | — |
| e-2 | 요양원 방문기록 | 요양원 방문기록 (baseline = name) | (없음) | — |
| e-3 | 전 요양보호사 음성증언 | 동 (baseline = name) | S1 | — |
| e-4 | 공증인 메모 기록 | 동 (baseline = name) | (없음) | — |
| e-5 | 어머니 자필 유언장 연습본 | 동 (baseline = name) | **S5** | 자필 비율 수치 + 자기 몫 축소 |
| e-6 | 오래된 계좌 흐름 | 동 (baseline = name) | (없음) | — |
| e-7 | 어머니 일기장 | 동 (baseline = name) | S2 | 친부 실명 + 구체적 출생 경위 (영구 봉인) |

**Phase 2 backlog**: e-2 ~ e-7의 surfaceName이 baseline에서 name과 동일 (surface 보호 누락). Phase 2 scripted text fix에서 surface 분리 + scriptedText sweep 필요.

## 관련 메모리

- [[design_truth_leak_keyword_nature]] — hidden keyword 본성 분류 (그룹 5는 false positive 영역 적용 사례)
- [[design_spouse01_truth_disclosure_policy]] — spouse-01 정책 사례 (family-01 patterning 시 참조)
- [[feedback_truth_leak_prohibition]] — 잘못 패턴 #9 (진실 누설 금지 원칙)
- [[session_handoff_20260521_e5_reassignment_phase123]] — e-5 재배치 결과 (그룹 3 봉인 영역)
- [[session_handoff_20260523_core_case_phase3_family01_complete]] — Phase 3 마이그레이션 결과

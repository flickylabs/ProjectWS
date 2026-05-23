---
name: design-friend01-truth-disclosure-policy
description: "friend-01 사건의 진실 노출 정책 — 아버지 사기 (과거 차용금 미상환) / 예비신랑 선 넘기 / 9일간 경고 의도 / 단톡방 매도 / 반복 침묵 5 keyword 그룹별 등장 정책. dispute 5 chain 단계별 disclosure tier."
metadata:
  node_type: memory
  type: project
  originSessionId: continuation-from-phase3-friend01-start
---

## 사건 구도 확인

friend-01 = 친구 사이 명예훼손 + 다층 가족·사기 비밀:

- **partyA = 송다은**: 31세, 온라인 쇼핑몰 CS 직원, `premature_summary` archetype. 결론 먼저 선언, 맥락 후 끼워넣기. 아버지의 진짜 모습이 드러나는 것이 가장 큰 공포. **claimant (확인 없이 단톡방 매도)**.
- **partyB = 최수민**: 31세, 필라테스 강사, `affect_flattening` archetype. 감정을 평평하게 누른 채 사실만 나열. 가장 아픈 이야기에서 톤이 오히려 더 평평. **defendant (예비신랑에게 9일 연락, 송다은 보호 위해 침묵)**.

## 5 Keyword 그룹별 등장 정책 (player-visible text)

### 그룹 1 — `예비신랑이 먼저 / 예비신랑이 찝쩍 / 선 넘는 메시지 / 최수민의 거절`
- **사전 진술 (S0~S2)**: 양측 모두 절대 등장 X. e-4 (예비신랑 선 넘는 메시지) 검증 전.
- **d-2 S3 이후**: B가 "예비신랑이 커피 보자/이상형 운운 메시지를 먼저 보냈고 본인은 거절했다" 인정.
- **d-2 S5**: 양측 진실 완전 인정.
- **위반 영역**: A의 S0~S2 발화에 등장 시 P0 leak (A는 d-2 S3 unlock 전까지 예비신랑 책임 인지 X).

### 그룹 2 — `아버지의 사기 / 아버지 돈 갈취 / 투자 명목 사기 / 미상환 / 차용금 미상환`
- **사전 진술 (S0~S2)**: 양측 모두 절대 등장 X.
- **d-3 S3 이후**: B가 "본인이 과거 같은 흐름을 겪었기에 패턴을 알아봤다" 인정 (사기 단어는 d-3에서 회피, d-4에서 진실).
- **d-4 S3 이후**: A가 "아버지가 갚지 못한 돈이 있었다" 인정.
- **d-4 S5**: 양측 사기 + 미상환 + 손절 원인 완전 인정.
- **위반 영역**: d-3 또는 d-4 S2 이전에 "사기" 단어 등장 시 P0 leak.

### 그룹 3 — `B 경고 의도 / 꼬시려 한 게 아니라 경고 / 같은 패턴 반복`
- **사전 진술 (S0~S1)**: B는 "가벼운 안부 / 가볍지 않은 망설임" frame 유지. 경고 의도 직접 노출 X.
- **d-1 S3 이후**: B가 "예비신랑에게 결혼 직전 돈 얘기 흐름이 보여 경고하려 했다" 명시.
- **d-3 S3 이후**: "송다은 아버지가 같은 흐름에 있다" + "과거에 본인이 같은 흐름을 겪었다" 명시.
- **d-3 S5**: 양측 진실 완전 인정 ("같은 패턴 반복").

### 그룹 4 — `과거 손절 = A 아버지 원인 / B 차마 못 말함`
- **사전 진술 (S0~S2)**: B는 "사적인 감정" / "말하면 더 커질 얘기" frame. 회피.
- **d-4 S3 이후**: B가 "단순한 친구 다툼이 아니었다" + "돈 문제가 끼어 있었다" 인정.
- **d-4 S4 이후**: B가 "송다은이 무너질 것 같아 참았다" 동기 명시.
- **d-4 S5**: 양측 진실 완전 인정 (사기 + 침묵 동기 + 악역 자처).
- **본 그룹**: 동기/감정 영역은 [[design_truth_leak_keyword_nature]] 정책상 false positive 영역. truth-leak-matrix hidden에 등록 X.

### 그룹 5 — `확인 없이 매도 / 명예훼손 / 먼저 낙인 / B 또 악역 / 반복 침묵`
- **사전 진술 (S0~S2)**: 양측 모두 자기 frame 유지. 단어 자체 등장 X.
- **d-5 S3 이후**: A가 "확인 없이 단톡방에 먼저 올린 것은 사실" 인정 (명예훼손 평가는 회피).
- **d-5 S4 이후**: A가 "글을 올린 손이 먼저였다" 무너짐 / B가 "두 번 다 같은 구조가 됐다" 인정.
- **d-5 S5**: 양측 진실 완전 인정 (성급한 단정 / 매도 / 반복 침묵 책임).

## 신규 콘텐츠 작성 시 self-check

friend-01의 신규 ScriptedText / Dialogue 작성 시:

1. **사전 진술 영역(S0~S2)에 그룹 1 표현 등장 시 → 즉시 제거** (예비신랑 책임 영역 봉인).
2. **'아버지의 사기' / '투자 명목 사기' / '미상환' 등장 시 → d-3 S3 또는 d-4 S3 이상 확인**.
3. **'B 경고 의도' / '같은 패턴 반복' 등장 시 → d-1 S3 또는 d-3 S3 이상 확인**.
4. **'과거 손절 = A 아버지 원인' / 'B 차마 못 말함' 등장 시 → d-4 S3 이상 확인**.
5. **'확인 없이 매도' / '명예훼손' 등장 시 → d-5 S5 이상 확인**.
6. **e-3 / e-6 description은 surface-safe 유지** — 본 세션 회귀 학습. "돈 문제" / "투자 명목" 등 truth lexeme 직접 사용 X. depthStages.original/context summary로 단계적 노출.

## evidence별 봉인 단계 권위

| evidence | name | requiredLieState | sensitiveSeal |
|---|---|---|---|
| e-1 | 최수민→예비신랑 연락 기록 | (없음, S0 노출 가능) | — |
| e-2 | 공통 친구 단톡방 캡처 | (없음) | — |
| e-3 | 과거 손절 직전 카톡 | S1 | description은 surface-safe |
| e-4 | 예비신랑의 선 넘는 메시지 + 거절 | (없음, requires e-1) | — |
| e-5 | 송다은 아버지와 예비신랑의 문자 | **S2** | requires e-1 |
| e-6 | 과거 송금 영수증 + 문자 | **S2** | 구체 송금 금액 + 아버지 실명 + 은행 계좌. description은 surface-safe. |
| e-7 | 과거/현재 대조표 | **S3** | requires e-4, e-5, e-6 |

## designIntentTags whitelist 영역

friend-01 d-3 영역의 scriptedText variant tag = `continuity:evidence_combo`. baseline truth-leak-matrix._designIntentTags 영역에 보존 필요 (whitelist).

Authority `truthLeakOverride.designIntentTags`에 `'continuity:evidence_combo'` 추가됨 — 새 형식 4종(`band:late / archetype:confess / reveal:full / channel:aftermath`)과 함께 case-level union.

## 관련 메모리

- [[design_truth_leak_keyword_nature]] — hidden keyword 본성 분류 (그룹 4는 false positive 영역 적용 사례)
- [[design_spouse01_truth_disclosure_policy]] — spouse-01 정책 사례 (배신 / 금전 / 외도 frame)
- [[design_family01_truth_disclosure_policy]] — family-01 정책 사례 (유산 / 가족 비밀 frame)
- [[feedback_truth_leak_prohibition]] — 잘못 패턴 #9 (진실 누설 금지 원칙)
- [[session_handoff_20260523_core_case_phase3_friend01_complete]] — Phase 3 마이그레이션 결과

# Phase 2 상세 설계

> 작성: 2026-04-06
> 작성자: Codex
> 기준 문서:
> - `docs/ref/리뉴얼참고/ct-to-codex-task-phase2-design.md`
> - `docs/ref/리뉴얼참고/codex-engine-audit-report.md`
> - `docs/ref/리뉴얼참고/master-plan-v3.md`
> - `docs/ref/리뉴얼참고/game_mechanics_overhaul_recommendations.md`
> 원칙:
> - 실행 순서 고정: 1 → 2 → 3 → 4 → 5
> - 이벤트는 기존 엔진 활용, 신규 엔진 추가 금지
> - Session B 초반에 에이전시 hotfix 최소 1개 동시 반영
> - 아이디어 5의 끼어들기 설계는 Session A 이중 구조 정리 완료 후 확정

---

## 0. 구현 순서와 묶음

### Wave 1. Session B 초반 묶음

- Hotfix H1: Dossier 자동 실행이 증거 조사 단계를 전부 자동 완료하지 않도록 축소
- 아이디어 1: 심문 3종 게임 효과 분리 + UI 피드백
- 아이디어 2: 돌파 순간 연출
- 아이디어 3: 반복 심문 교착 피드백

### Wave 2

- 아이디어 4: 증거 카드 UI 재구성

### Wave 3

- 아이디어 5-B: 감정 폭발 체감 강화
- 아이디어 5-C: 모순 지적 체감 강화

### 보류

- 아이디어 5-A: 끼어들기 체감 강화
  - 보류 사유: `pendingInterjection` / `pendingInterjectionV2` / `pendingGameEvent(type='interjection')` 이중 구조가 정리되지 않은 상태
  - 선행 조건: Session A가 canonical 경로를 `interjectionV2.ts` + `GameEventModal.tsx`로 잠글 것

---

## Hotfix H1: Dossier 자동 실행 축소

### 변경 전 (현재)

- 유저가 보는 것:
  - 사건카드 사용 시 강한 연출은 있지만, 관련 증거 조사 단계가 한 번에 자동 완료되어 플레이어가 직접 파고든 감각이 약하다.
- 코드 동작:
  - `ActionPanel.tsx`의 `hDossierAutoExecute()`가 `card.evidenceIds`의 `investigationStages`를 전부 순회하며 자동 처리한다.
  - 결과적으로 `EvidencePresenter.tsx`의 조사 루프를 건너뛴다.

### 변경 후 (목표)

- 유저가 보는 것:
  - 사건카드는 “정답지 자동 처리”가 아니라 “결정적 질문 열기” 역할만 한다.
  - 카드 사용 후 관련 증거가 `추천` 상태로 강조되고, 최소 1단계 이상은 플레이어가 직접 조사해야 한다.
- 코드 동작:
  - `hDossierAutoExecute()`에서 `investigationStages` 전체 자동 완료를 제거한다.
  - 대신 다음 둘 중 하나만 허용한다.
    - 선택안 A: 자동 완료 없음, 관련 증거를 추천 상태로만 마킹
    - 선택안 B: 표면 정보만 유지하고 첫 조사 결과 1개만 해금
  - 권장안은 A다. 에이전시 복구 효과가 더 크고 구조 충돌이 적다.

### 수정 대상 파일

| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|
| `src/components/actions/ActionPanel.tsx` | Dossier 자동 실행 시 `investigationStages` 전부 자동 완료 제거 | 낮음 |
| `src/components/actions/EvidencePresenter.tsx` | 카드 사용 후 추천 증거 표시 수용 | 낮음 |

### 리스크

- 카드 체감이 너무 약해질 수 있다.
- 기존 카드 밸런스가 “자동 조사 완료” 전제였다면 중반 템포가 느려질 수 있다.

### 검증 방법

- 카드 사용 직후 관련 증거가 자동 완료되지 않는지 확인
- 카드 사용 후 유저가 직접 조사할 이유가 생기는지 확인
- 대표 사건 2건에서 카드가 무력해지지 않았는지 수동 플레이 확인

---

## 아이디어 1: 심문 3종 게임 효과 분리 + UI 피드백

### 변경 전 (현재)

- 유저가 보는 것:
  - `QuestionSelector.tsx`는 3개 카드에 고정 문구와 정적 meter hint만 보여준다.
  - 현재 상태에서 어떤 액션이 더 유효한지, 다음 턴에 무엇이 열리는지 보이지 않는다.
- 코드 동작:
  - `questionEffectEngine.ts`는 이미 `contradiction`, `leak`, `trust` 미터를 계산한다.
  - `useActionDispatch.ts`는 미터를 적용하지만, `suppression_leak`, `defense_weaken`, `confession_window`, `lie_transition_bonus` 같은 효과는 실질 소비처가 약하다.
  - `StateTransitionFeedback.tsx`는 meter HUD와 전이 토스트만 보여주고, 행동 추천은 하지 않는다.

### 변경 후 (목표)

- 유저가 보는 것:
  - 각 질문 카드에 `예상 결과`와 `현재 유효도`가 보인다.
  - 질문 성공 후 다음 턴에 유효한 follow-up이 카드 수준에서 강조된다.
  - 같은 3종이라도 “왜 지금 이걸 눌러야 하는지”가 읽힌다.
- 코드 동작:
  - `QuestionSelector.tsx`는 대상의 현재 `lieState`, 감정값, 신뢰창구, contradiction/leak/trust 상태를 기준으로 카드별 `높음 / 보통 / 낮음` 힌트를 계산해 표시한다.
  - `questionEffectEngine.ts`는 질문 결과를 미터 변화만이 아니라 `followUpWindow` 관점으로 해석 가능하게 확장한다.
  - `useActionDispatch.ts`는 각 질문 후 “다음 턴 추천 행동” 메타데이터를 store 또는 파생 상태로 남긴다.

### 세부 규칙

#### A. 액션별 기대 보상/약점

| 액션 | 주 보상 | 부 보상 | 약점 |
|------|--------|--------|------|
| `fact_pursuit` | contradiction token 축적 | 시점/행위 고정, 방어선 약화 | 감정이 과열된 상대에게 효율 저하 |
| `motive_search` | leak meter 상승 | hook 노출, 숨은 쟁점 단서 | trust가 낮고 방어적일 때 역공 위험 |
| `empathy_approach` | trust window 상승 | 감정 개방, confession window 예고 | hard proof 없는 차가운 archetype에 약함 |

#### B. 다음 턴 선택이 달라지는 메커니즘

- `fact_pursuit`
  - contradiction token 2 이상: `모순 각 형성`
  - contradiction token 4 이상: `완전 부정 약화` 배너 표시
- `motive_search`
  - leak 50 이상: `속내 누설` 상태 표시
  - leak 80 이상: 감정 폭발 위험 강조
- `empathy_approach`
  - trust 40 이상: `감정 개방` 표시
  - trust 60 이상: `고백 경로 열림` 표시

#### C. UI 피드백 사양

- 카드 하단 고정 칩:
  - `fact_pursuit`: `모순`, `시점 고정`
  - `motive_search`: `속내`, `누설`
  - `empathy_approach`: `신뢰`, `고백`
- 상태 기반 효율 칩:
  - `효과 높음`
  - `효과 보통`
  - `효과 낮음`
- 결과 후 follow-up 칩:
  - `지금 모순 지적 유효`
  - `지금 동기 탐색 유효`
  - `지금 공감 접근 유효`

### 수정 대상 파일

| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|
| `src/components/actions/QuestionSelector.tsx` | 카드별 효과 칩, 유효도 표시, follow-up 추천 표시 | 중간 |
| `src/engine/questionEffectEngine.ts` | 질문 결과를 follow-up 가능한 상태로 해석하는 메타데이터 추가 | 중간 |
| `src/components/discovery/StateTransitionFeedback.tsx` | 질문 효과 HUD에 “열린 기회” 표시 추가 | 중간 |
| `src/hooks/useActionDispatch.ts` | 질문 처리 후 follow-up 추천 상태 기록 | 중간 |

### 리스크

- 카드 정보가 과해지면 모바일 UI가 다시 복잡해질 수 있다.
- 유효도 판정 기준이 과도하게 규칙적이면 플레이가 “정답 찾기”처럼 굳을 수 있다.
- `questionEffectEngine.ts`의 dormant effect를 너무 많이 한 번에 살리면 밸런스가 흔들릴 수 있다.

### 검증 방법

- 3종 카드가 서로 다른 유효도 표시를 실제로 보여주는지 확인
- `fact_pursuit` 2회 이상 후 contradiction 관련 follow-up이 열리는지 확인
- `empathy_approach`로 trust 60 이상 도달 시 confession window가 UI에 표시되는지 확인
- 동일 사건을 2회 플레이해도 3종 선택 패턴이 같지 않은지 비교

---

## 아이디어 2: 돌파 순간 연출

### 변경 전 (현재)

- 유저가 보는 것:
  - `StateTransitionToast`가 전이 메시지를 띄우지만, 전이 의미와 다음 행동 변화는 잘 보이지 않는다.
  - `opening` 라벨은 컴포넌트에 존재하지만 실제 `getTransitionLabel()`에서는 생성되지 않는다.
- 코드 동작:
  - `lieStateMachine.ts`가 전이를 결정하고, `emitStateTransitionEvent()`가 `gameEventLog`에 `state_transition`을 넣는다.
  - `StateTransitionToast`는 메시지 문자열을 파싱해 `cracked`, `cornered`, `confessed`만 보여준다.
  - 전이 뒤 `QuestionSelector.tsx`가 추천 행동을 바꾸지는 않는다.

### 변경 후 (목표)

- 유저가 보는 것:
  - 전이는 단순 텍스트가 아니라 `경계`, `균열`, `궁지`, `개방`, `시인`의 의미 상태로 번역된다.
  - 전이 직후 0.5~0.8초 내 짧은 연출이 뜨고, 바로 다음 유효 행동이 카드에서 강조된다.
  - 전이의 의미가 “대사 변화”가 아니라 “다음 수가 바뀜”으로 체감된다.
- 코드 동작:
  - `stateTransitionHelper` 또는 `StateTransitionFeedback.tsx` 수준에서 `S2`, `S3`, `S4`, `S5`를 별도 semantic state로 노출한다.
  - `QuestionSelector.tsx`는 마지막 전이 state를 읽어 행동 추천 칩을 바꾼다.

### 세부 규칙

#### A. 의미 상태 매핑

| lie state | 플레이어 표면 라벨 | 의미 |
|-----------|-------------------|------|
| `S0~S1` | 경계 중 | 아직 방어 우세 |
| `S2` | 균열 발생 | 일부 사실 인정, 다른 각 유효 |
| `S3` | 궁지 | 버티기 어려움, 모순/동기 추적 가치 상승 |
| `S4` | 개방 | 속내 노출, 공감/고백 유도 가치 상승 |
| `S5` | 시인 | 핵심 사실 공개 |

#### B. 시각 연출 사양

- `S1 -> S2`
  - 짧은 crack 토스트
  - 색상: yellow
  - 지속: 600ms
- `S2 -> S3`
  - cornered 토스트 + 경고 강조
  - 색상: orange
  - 지속: 700ms
- `S3 -> S4`
  - opening 토스트 + blue highlight
  - 색상: blue
  - 지속: 700ms
- `S4 -> S5`
  - confess 토스트 + resolved 강조
  - 색상: emerald
  - 지속: 800ms

#### C. 돌파 뒤 행동 추천

- `균열 직후`
  - `motive_search` 추천
  - 이유: structural/core atom으로 깊게 밀기 좋음
- `궁지 직후`
  - `fact_pursuit` 또는 `motive_search` 추천
  - 이유: 방어선 붕괴 직전
- `개방 직후`
  - `empathy_approach` 추천
  - 이유: confession window와 연결
- `시인 직후`
  - 현재 쟁점 종결 표시 + 다른 쟁점/증거 추천

### 수정 대상 파일

| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|
| `src/components/discovery/StateTransitionFeedback.tsx` | `opening` 포함 semantic state 표면화, 연출 차등화, 추천 문구 표시 | 중간 |
| `src/engine/lieStateMachine.ts` | 전이 자체는 유지, semantic mapping 소비처 기준만 정합화 | 낮음 |
| `src/components/actions/QuestionSelector.tsx` | 마지막 전이 기준 추천 행동 칩 표시 | 낮음 |

### 리스크

- 전이 토스트와 game event modal이 동시에 뜨면 시각적 충돌이 생길 수 있다.
- `S4`를 별도 의미 상태로 표면화하면 현재 밸런스보다 “고백 직전”이 너무 자주 보일 수 있다.

### 검증 방법

- `S2`, `S3`, `S4`, `S5` 전이가 서로 다른 라벨과 색상으로 보이는지 확인
- `S4` 진입 직후 공감 카드가 추천 상태로 바뀌는지 확인
- 연출 직후 다음 입력이 막히지 않고 즉시 이어지는지 확인

---

## 아이디어 3: 반복 심문 교착 피드백

### 변경 전 (현재)

- 유저가 보는 것:
  - 같은 쟁점에 같은 방식으로 반복 질문해도 “효과가 떨어진다”는 메시지가 거의 없다.
  - 답변이 다소 밋밋해질 뿐, 시스템적으로 막혔다는 신호가 약하다.
- 코드 동작:
  - `questionFatigueEngine.ts`가 local/spotlight 피로도와 multiplier를 계산하고 실제로 사용 중이다.
  - 하지만 `shouldTriggerFatigueBeat`는 미사용이고, 피로 결과를 유저에게 직접 보여주지 않는다.
  - 현재 reset reason은 `new_evidence`, `layer_unlock`, `target_switch`, `interjection_allow`까지만 명확하다.

### 변경 후 (목표)

- 유저가 보는 것:
  - 같은 접근을 반복하면 `답변 짧아짐` → `교착`의 두 단계가 분명히 보인다.
  - 교착 상태에서는 다른 액션 타입이나 증거 사용이 추천된다.
  - 피로는 처벌이 아니라 “다른 길을 시도하라”는 신호로 작동한다.
- 코드 동작:
  - `questionFatigueEngine.ts`는 existing multiplier를 유지하되, 교착 임계 도달 시 명시적인 UI reason을 제공한다.
  - `useActionDispatch.ts`는 교착 임계 시 system message 또는 transient hint를 출력한다.
  - Dossier 실행은 명시적 reset reason으로 추가한다.

### 세부 규칙

#### A. freshness budget

- 키 단위:
  - `party + disputeId + action family`
  - 현재 `angleTag` 기반 local key를 유지하되, 교착 표시만큼은 action family 수준으로 묶는다.
- 단계:
  - 1회: 정상
  - 2회: `답변 짧아짐`
  - 3회 이상: `교착`

#### B. reset 조건

- `new_evidence`
- `layer_unlock`
- `target_switch`
- `interjection_allow`
- `dossier_execute`

#### C. 교착 시 플레이어 표면

- system hint:
  - `같은 접근은 더 이상 효과가 없습니다`
  - `다른 질문 방식이나 증거를 사용하십시오`
- QuestionSelector 추천:
  - 현재 action type은 `효과 낮음`
  - 나머지 2개 중 더 나은 선택을 `추천`으로 표시

### 수정 대상 파일

| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|
| `src/engine/questionFatigueEngine.ts` | `dossier_execute` reset 추가, 교착 reason 명시화 | 중간 |
| `src/hooks/useActionDispatch.ts` | 교착 시 system hint 출력 및 추천 상태 업데이트 | 중간 |
| `src/components/actions/QuestionSelector.tsx` | 교착 경고 및 대체 액션 추천 표시 | 낮음 |

### 리스크

- 피로와 `questionEffectEngine.ts`의 legacy diminish가 체감상 이중 패널티로 느껴질 수 있다.
- 교착 판정을 너무 빨리 주면 플레이어가 실험 자체를 못 하게 될 수 있다.

### 검증 방법

- 같은 dispute + 같은 action 3회 반복 시 명시적 교착 메시지가 뜨는지 확인
- 새 증거 사용 후 교착 상태가 풀리는지 확인
- Dossier 실행 후 reset이 실제로 작동하는지 확인

---

## 아이디어 4: 증거 카드 UI 재구성

### 변경 전 (현재)

- 유저가 보는 것:
  - `EvidencePresenter.tsx`는 `available / presented / locked` 중심으로 증거를 나열한다.
  - 현재 쟁점 기준으로 무엇이 가장 중요하거나 지금 제시할 가치가 높은지 정렬되지 않는다.
  - 조사/감별/제시/증인 소환이 한 패널에 밀집돼 있어 정보 우선순위가 약하다.
- 코드 동작:
  - 정렬은 사실상 해금 상태와 제시 여부 정도만 반영한다.
  - 추천 증거 개념이 없다.
  - 현재 쟁점 기준 정렬을 하려면 focus dispute source가 추가로 필요하다.

### 변경 후 (목표)

- 유저가 보는 것:
  - 증거 패널 최상단에 `지금 추천 증거` 1개가 보인다.
  - 그 아래에 `현재 쟁점 관련`, `새로 해금`, `기타 증거`가 분리된다.
  - 하위 중요도 증거는 기본 접힘 처리한다.
- 코드 동작:
  - 정렬 기준을 점수화해 리스트를 렌더한다.
  - 추천 카드 1개는 점수 최상위 항목으로 별도 렌더한다.
  - focus dispute가 없으면 타깃 관련 + 미제시 + new + hard 순으로 폴백한다.

### 세부 규칙

#### A. 정렬 점수

| 조건 | 가점 |
|------|------|
| 현재 focus dispute를 `proves`에 포함 | +100 |
| 새로 해금됨 (`isNew`) | +40 |
| 아직 제시 안 됨 | +30 |
| `reliability === 'hard'` | +20 |
| 조사 2단계 이상 완료 | +10 |
| 이미 제시됨 | -40 |

#### B. 추천 증거 1개

- 상단 `추천` 카드로 별도 노출
- 추천 문구 예시:
  - `현재 쟁점과 직접 연결됩니다`
  - `아직 제시하지 않은 핵심 증거입니다`
  - `조사가 충분히 진행되어 바로 사용 가능합니다`

#### C. focus dispute source

- 권장안:
  - `useActionDispatch.ts` 또는 store에 `lastFocusedDisputeId`를 저장
  - `EvidencePresenter.tsx`가 이를 읽어 정렬에 사용
- 폴백안:
  - 최근 judge/action context에서 dispute 추론
- 권장안이 더 명확하다. 현재 구조상 central focus state가 없으므로, 이 값 없이는 “현재 쟁점 우선”을 안정적으로 구현하기 어렵다.

### 수정 대상 파일

| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|
| `src/components/actions/EvidencePresenter.tsx` | 추천 카드, 점수 정렬, 접기/펼치기 UI 추가 | 중간 |
| `src/hooks/useActionDispatch.ts` | 최근 focus dispute 기록용 경량 상태 추가 | 낮음 |

### 리스크

- 추천 로직이 잘못되면 플레이어가 오히려 잘못된 증거로 유도됐다고 느낄 수 있다.
- focus dispute source를 임시로 추론하면 추천 품질이 흔들릴 수 있다.

### 검증 방법

- 동일 사건에서 현재 쟁점을 바꾸면 추천 증거가 실제로 바뀌는지 확인
- 새로 해금된 증거가 기타 증거보다 위로 오는지 확인
- evidence panel이 모바일에서 1스크린 내 핵심 카드 위주로 읽히는지 확인

---

## 아이디어 5: 기존 이벤트 체감 강화

### 변경 전 (현재)

- 유저가 보는 것:
  - `GameEventModal.tsx`는 모순/끼어들기/감정 폭발/새 쟁점 이벤트를 보여주지만, 일부는 이미 효과가 적용된 뒤 설명용으로 뜬다.
  - contradiction와 emotional burst는 선택지가 있으나, 선택 차이가 체감상 크지 않다.
  - interjection은 legacy/V2/V3 경로가 겹쳐 있어 지금 상태로는 설계 고정이 이르다.
- 코드 동작:
  - `gameEventTriggerEngine.ts`는 trigger를 계산하고 `useGameStore.evaluateTurnEvents()`가 effects를 즉시 적용한다.
  - `GameEventModal.tsx`는 그 후 선택지를 보여준다.
  - `interjectionV2.ts`는 별도로 더 강한 allow/block 로직을 가진다.

### 변경 후 (목표)

- 유저가 보는 것:
  - 감정 폭발과 모순 지적은 “보여주기”가 아니라 실제 분기 선택으로 느껴진다.
  - 끼어들기는 Session A 정리 후 `V2 canonical` 기준으로 별도 설계한다.
- 코드 동작:
  - 기존 엔진은 유지하되, contradiction / emotional burst의 핵심 효과 일부를 modal choice 시점으로 이동한다.
  - interjection은 Session A 완료 전까지 설계 확정하지 않는다.

### 5-A. 끼어들기(interjection) — 보류

- 상태: Session A 완료 대기
- 확정 조건:
  - `pendingInterjection` legacy 제거 또는 차단
  - `pendingInterjectionV2`를 canonical로 고정
  - `pendingGameEvent(type='interjection')` 처리 범위 축소
- 완료 후 설계 방향:
  - 허용 시 얻는 정보가 다음 행동 추천과 연결
  - 제지 시 권위 유지와 현재 쟁점 압박 강화가 분명히 보이게 조정

### 5-B. 감정 폭발(emotional burst)

#### 변경 전 (현재)

- 유저가 보는 것:
  - 폭발 발생 후 `더 압박한다 / 진정시킨다` 선택지가 보인다.
  - 하지만 전략 차이가 충분히 크다고 느끼기 어렵다.
- 코드 동작:
  - `gameEventTriggerEngine.ts`가 이미 감정 폭발을 트리거한다.
  - `GameEventModal.tsx`는 press/calm 선택지를 제공한다.

#### 변경 후 (목표)

- 유저가 보는 것:
  - `더 압박한다`는 즉시 진전형, `진정시킨다`는 trust/opening형으로 명확히 분화된다.
  - 선택 후 meter 또는 다음 추천 행동이 분명히 바뀐다.
- 코드 동작:
  - press:
    - leak 또는 lie advance 계열 보너스
    - trust 하락
    - follow-up으로 `fact_pursuit` 또는 `motive_search` 추천
  - calm:
    - trust 상승
    - opening/confession window 계열 보너스
    - follow-up으로 `empathy_approach` 추천

### 5-C. 모순 지적(contradiction)

#### 변경 전 (현재)

- 유저가 보는 것:
  - 모순 지적 modal은 뜨지만, 효과는 이미 앞단에서 상당 부분 처리된다.
- 코드 동작:
  - `gameEventTriggerEngine.ts`의 `checkContradiction()`가 즉시 `lie_advance`, `emotion_spike`를 effects로 만든다.
  - `GameEventModal.tsx`의 `handlePointOut()`는 주로 dialogue layer 역할이다.

#### 변경 후 (목표)

- 유저가 보는 것:
  - `지적한다 / 보류한다`가 실제 분기 선택으로 작동한다.
  - 지적 성공 시 lie state 또는 방어 약화가 체감되고, 보류 시 토큰은 유지되지만 즉시 이득은 없다.
- 코드 동작:
  - contradiction trigger는 “기회 발생”까지로 제한
  - 핵심 효과는 `handlePointOut()`에서 적용
  - `let_go`는 `pending opportunity` 종료만 수행

### 수정 대상 파일

| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|
| `src/components/discovery/GameEventModal.tsx` | contradiction / emotional burst choice 결과를 체감 가능하게 강화 | 중간 |
| `src/engine/gameEventTriggerEngine.ts` | trigger는 유지, 즉시 적용 효과와 선택 후 적용 효과의 경계 재정의 | 중간 |
| `src/store/useGameStore.ts` | `evaluateTurnEvents()`의 자동 적용 범위 축소 또는 deferred effect 저장 | 중간 |
| `src/hooks/useActionDispatch.ts` | interjection은 Session A 완료 후 연결 범위 확정 | 낮음 |

### 리스크

- 자동 적용 효과를 modal choice 이후로 옮길 때 이중 적용 버그가 날 수 있다.
- contradiction를 너무 강하게 만들면 일반 심문보다 이벤트 운빨이 더 커질 수 있다.
- interjection은 Session A 정리 전 설계 확정 시 재작업 위험이 높다.

### 검증 방법

- contradiction modal에서 `지적`과 `보류`가 실제 다른 상태 결과를 만드는지 확인
- emotional burst modal에서 `압박`과 `진정`이 다음 추천 행동을 다르게 바꾸는지 확인
- interjection 관련 설계는 Session A 완료 후 별도 체크리스트로 재검증

---

## 최종 구현 메모

### Session B 시작 조건

- Wave 1은 `Hotfix H1 + 아이디어 1 + 아이디어 2 + 아이디어 3`을 한 묶음으로 구현
- 이유:
  - 플레이어 에이전시 복구 1개 이상 포함
  - 심문 체감 개선과 돌파 연출, 교착 피드백이 서로 바로 연결됨

### Session A 의존성

- interjection canonical 정리 전에는 아이디어 5-A를 구현하지 않는다.

### 구현 우선순위 요약

1. Dossier 자동 실행 축소
2. QuestionSelector에 상태 기반 효과 힌트/추천 추가
3. questionEffectEngine dormant effect 중 플레이어 표면에 필요한 최소치만 소비처 연결
4. StateTransitionFeedback에서 S4 포함 의미 상태 번역
5. questionFatigueEngine의 교착 피드백 표면화
6. EvidencePresenter 정렬/추천
7. GameEventModal contradiction / emotional burst 분기 강화

### 성공 기준

- 플레이어가 질문 버튼을 누르기 전에 “왜 이걸 눌러야 하는지” 읽을 수 있다.
- 전이 직후 “이제 무엇을 해야 하는지” 카드 수준에서 보인다.
- 같은 질문 반복 시 “효과 없음”이 숨겨진 배율이 아니라 표면 피드백으로 전달된다.
- 증거 패널에서 지금 중요한 카드가 상단에 고정된다.
- 이벤트 선택이 대사 장식이 아니라 실제 분기 선택으로 느껴진다.

# CT → Codex-D2: Phase 2 상세 설계 문서 작성

> 발신: CT
> 수신: Codex (새 세션 Codex-D2)
> 일시: 2026-04-06
> 선행 완료: Codex-D1 엔진 감사 보고서

---

## 배경

엔진 감사(Codex-D1)가 완료되어 기존 시스템의 가동/미가동 상태를 파악했다.
Session A에서 이중 구조 정리가 진행 중이다.

이제 **Phase 2 아이디어 5개의 상세 설계 문서**를 작성해야 한다.
이 문서가 있으면 CT(Claude Code)가 Session B에서 바로 구현할 수 있다.

---

## 작업: 5개 아이디어 상세 설계

확정된 우선순위 순서:
1. 심문 3종 게임 효과 분리 + UI 피드백
2. 돌파 순간 연출 (state 전이 시각 이벤트)
3. 반복 심문 교착 피드백 (freshness budget)
4. 증거 카드 UI 재구성 (핵심 우선 표시)
5. 기존 이벤트 체감 강화 (끼어들기/감정폭발)

---

### 아이디어 1: 심문 3종 게임 효과 분리

**설계할 내용:**

A. 액션별 기대 보상/약점 테이블 확정
   - fact_pursuit: 모순 토큰 +N, 시점 고정 효과, 약점(감정적 상대에 약함)
   - motive_search: 숨겨진 hook 노출, 누설 위험 증가, 약점(trust 낮을 때 반격)
   - empathy_approach: 신뢰 +N, 감정 개방, 약점(hard proof 없이 차가운 상대에 약함)
   
B. "다음 턴 선택이 달라지는" 구체적 메커니즘
   - 예: 공감 성공 시 → 다음 턴 "고백 유도" 특수 선택지 열림
   - 예: 사실추궁 3연속 시 → 모순 추궁 각이 빨리 열림

C. UI 피드백 설계
   - 버튼 아래 예상 결과 아이콘
   - 현재 상태 기준 효과 힌트 (높음/보통/낮음)

**수정 대상 파일 목록:**
- `src/components/actions/QuestionSelector.tsx` — UI
- `src/engine/questionEffectEngine.ts` — 효과 계산
- `src/components/discovery/StateTransitionFeedback.tsx` — 결과 표시
- `src/hooks/useActionDispatch.ts` — 디스패치 로직

**참조:** codex-engine-audit-report.md의 questionEffectEngine 분석

---

### 아이디어 2: 돌파 순간 연출

**설계할 내용:**

A. S0→S5 의미 상태 매핑 확정
   - S0~S1: "경계 중"
   - S2: "균열 발생" (crack)
   - S3: "궁지"
   - S4: "개방"
   - S5: "시인"

B. 각 전이 시 시각 연출 사양
   - 어떤 애니메이션/이펙트
   - 지속 시간
   - 사운드 (soundEngine.ts 활용 가능)

C. **핵심: 돌파 뒤 다음 행동 추천 변화**
   - 균열 직후 → "동기탐색 효과 높음" 강조
   - collapse 직후 → "공감/추궁이 유효"
   - 구체적으로 어떤 UI 요소가 변하는지

**수정 대상 파일 목록:**
- `src/components/discovery/StateTransitionFeedback.tsx` — 연출 UI
- `src/engine/lieStateMachine.ts` — 전이 감지 (이미 가동 중)
- `src/components/actions/QuestionSelector.tsx` — 추천 행동 표시

---

### 아이디어 3: 반복 심문 교착 피드백

**설계할 내용:**

A. freshness budget 규칙
   - 같은 dispute + 같은 subAction: 첫 반복 → 답변 짧아짐, 두 번째 → "교착" 판정
   - budget reset 조건: new_evidence, layer_unlock, target_switch, interjection_allow, Dossier 실행

B. 교착 시 플레이어에게 보이는 것
   - "같은 접근은 더 이상 효과가 없습니다. 다른 방법을 시도하세요."
   - 다른 액션 타입 추천 UI

**수정 대상 파일 목록:**
- `src/engine/questionFatigueEngine.ts` — 이미 구현된 피로 엔진 확장
- `src/hooks/useActionDispatch.ts` — 교착 판정 후 처리
- UI 컴포넌트 (교착 메시지 표시)

---

### 아이디어 4: 증거 카드 UI 재구성

**설계할 내용:**

A. 증거 정렬 기준 우선순위
   - 현재 쟁점 연관 증거 상단
   - 새로 해금된 증거
   - 미제시 증거
   - Hard 신뢰 증거
   - 나머지 접기

B. "지금 추천 증거" 1개 표시 로직

C. 접기/펼치기 UI

**수정 대상 파일 목록:**
- `src/components/actions/EvidencePresenter.tsx` — 증거 목록 렌더링
- 정렬/필터 로직 (컴포넌트 내부 또는 유틸)

---

### 아이디어 5: 기존 이벤트 체감 강화

**설계할 내용:**

A. 끼어들기(interjectionV2) 체감 강화
   - 현재: 허용/제지 선택 → 정보 획득
   - 강화: 허용 시 얻는 정보가 "다음 수에 영향"하도록 연결
   - **Session A가 이중 구조 정리를 완료해야 이 설계가 유효** → Session A 완료 후 작성

B. 감정 폭발 체감 강화
   - 현재: 폭발 발생 → 모달 표시
   - 강화: 폭발 후 "압박 vs 진정" 선택 → 각각 다른 게임 효과

C. 모순 지적 활성화
   - 현재: gameEventTriggerEngine에서 meter 기반 작동
   - 강화: 모순 발견 시 플레이어 선택("지적 vs 보류") → 지적 성공 시 lie state +1

**참조:** codex-engine-audit-report.md의 가동/미가동 분류

**주의: 아이디어 5의 끼어들기 부분은 Session A 이중 구조 정리 완료 후 작성.** 나머지(감정/모순)는 먼저 작성 가능.

---

## 출력 형식

각 아이디어별로:
```markdown
## 아이디어 N: {제목}

### 변경 전 (현재)
- 유저가 보는 것: ...
- 코드 동작: ...

### 변경 후 (목표)
- 유저가 보는 것: ...
- 코드 동작: ...

### 수정 대상 파일
| 파일 | 변경 내용 | 난이도 |
|------|----------|--------|

### 리스크
- ...

### 검증 방법
- ...
```

## 산출물

`docs/ref/리뉴얼참고/phase2-detailed-design.md`

## 참조 파일
1. `CLAUDE.md` — 프로젝트 구조
2. `docs/ref/리뉴얼참고/codex-engine-audit-report.md` — 엔진 감사
3. `docs/ref/리뉴얼참고/master-plan-v3.md` — 확정된 플랜
4. `docs/ref/리뉴얼참고/game_mechanics_overhaul_recommendations.md` — 원본 아이디어

## 주의
- 코드 수정 금지. 설계 문서만 작성.
- 실제 파일을 읽어서 현재 코드 구조를 반영한 설계여야 함 (추상적 설계 금지)
- 아이디어 5의 끼어들기는 Session A 완료 대기, 나머지 4.5개는 즉시 작성 가능

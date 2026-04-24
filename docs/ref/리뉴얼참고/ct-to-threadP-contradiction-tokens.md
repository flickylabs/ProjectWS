# CT → Plan 스레드: 모순 토큰 쟁점별 분리 설계도 (구현 없이 설계만)

> 발신: CT (Control Tower)
> 수신: Plan 스레드 (Claude Code Plan agent 또는 별도 세션)
> 일시: 2026-04-28
> 베이스 커밋: `8d18a39`
> **목적**: 구현 이전 **설계 문서만 산출** (코드 변경 절대 금지)

---

## 문제 배경

### 현상

- UI는 쟁점별 **"모순 pip 5칸"** 구조 (캐릭터 프로필 쟁점 카드) — 이미 완성
- 실제 데이터: `questionMeters[party].contradictionTokens`는 **party(사람) 단위 글로벌 카운터**
- 결과: 쟁점이 여러 개여도 전부 동일 숫자가 pip에 표시 → 쟁점별 진행도를 전혀 반영하지 못함

### 목표

**쟁점별로 분리된 모순 토큰 누적** → UI의 쟁점별 pip이 실제 쟁점별 상태를 반영.

### 우선순위 / 의존성

- [memory/session_handoff_20260428.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\session_handoff_20260428.md) 2순위
- [memory/backlog_deferred.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\backlog_deferred.md) 2순위 (엔진/데이터 분리 작업)
- 독립 작업 (다른 작업과 의존성 없음)
- UI는 이미 완성되어 있으므로 데이터 레이어만 바꾸면 **시각 변경 없이 즉시 반영**

---

## ⚠️ 이 세션의 범위 (엄수)

- **코드 변경 금지**. 이번 세션은 **설계 문서만** 산출
- 코드를 **읽고 인용하는 것**은 OK (설계 근거로 필요)
- 파일 수정, 신규 파일 생성 모두 금지 (단 tmp 문서 1개 산출물 제외)
- 실험적 브랜치 생성도 금지

---

## 산출물 (단 하나)

`tmp/plan-contradiction-tokens-split.md`

아래 섹션을 모두 채운 **단일 설계 문서**. 최대 500줄 이내. 실제 엔진 구현은 **다음 별도 세션**에서 Codex가 이 문서 기반으로 진행.

---

## 설계 문서 섹션 요구

### 섹션 1. 현 구조 파악 (선행 분석)

아래 파일을 읽어서 **현재 구조를 정확히 파악**해서 인용:

| 파일 | 확인할 것 |
|---|---|
| `src/types/...` (QuestionMetersState 관련) | 현재 타입 선언 |
| `src/store/useGameStore.ts` | contradictionTokens 초기화, reducer, 업데이트 로직 |
| `src/engine/questionEffectEngine.ts` | 모순 판정 + 토큰 증가 로직 |
| `src/hooks/useActionDispatch.ts` | 토큰 누적 + 붕괴 조건 판정 지점 (S5 승격) |
| `src/engine/lieStateMachine.ts` | S5 트리거 조건 (글로벌 현 5 임계값?) |
| `src/engine/gameEventTriggerEngine.ts` | 모순 지연 실행 / 이벤트 발화 |
| 쟁점별 pip UI 컴포넌트 (PCRightPanel, 프로필 쟁점 카드 관련) | 현재 뭘 참조해 렌더하는지 |

각 파일의 **현재 관련 코드 요지**(시그니처/주요 10~20줄)를 인용하고, **이 설계안이 건드릴 지점을 모두 표시**.

### 섹션 2. 타입 변경안 — 2안 제시 + 권장 1안

현재 추정:
```ts
interface QuestionMetersState {
  contradictionTokens: number;
  // ... (다른 미터들)
}
```

제안 2안:

#### 안 A — 추가 필드 (하위 호환)
```ts
interface QuestionMetersState {
  contradictionTokens: number;                             // 글로벌 유지
  contradictionTokensByDispute: Record<string, number>;    // 쟁점별 신규
}
```

- 장점: 기존 참조 깨지지 않음, 점진적 전환
- 단점: 중복 데이터, 동기화 책임
- 마이그레이션: localStorage 호환 유지 (구 데이터에 ByDispute 없으면 `{}`로 초기화)

#### 안 B — 전면 교체
```ts
interface QuestionMetersState {
  contradictionTokens: Record<string, number>;  // 쟁점별만
}
// 글로벌이 필요하면 합산으로 도출: Object.values(tokens).reduce((a,b)=>a+b,0)
```

- 장점: 단일 진실 원천, 데이터 중복 없음
- 단점: 기존 `contradictionTokens: number` 참조 모두 수정 필요
- 마이그레이션: localStorage 구 데이터(number) → 쟁점별로 배분하는 변환 필요

**권장 1안 선택 + 근거** 작성 (최소 150자). 권장 판단에 포함할 기준:
- 기존 코드 영향 범위 (참조 지점 n개)
- 유지보수 복잡도
- S5 붕괴 조건 재설계 용이성 (아래 섹션 4와 연계)
- 세이브 호환 난이도

### 섹션 3. 엔진 수정 지점 (파일별 상세)

| 파일 | 현재 로직 요지 | 변경 방향 | 예상 라인 수 |
|---|---|---|---|
| `src/types/...` | QuestionMetersState 타입 | 섹션 2 선택안 반영 | ~5 |
| `src/store/useGameStore.ts` | 초기화 / reducer | 선택안에 맞게 초기값/업데이트 | ~15 |
| `src/engine/questionEffectEngine.ts` | 모순 판정/토큰 증가 | `disputeId` 파라미터 추가 | ~20 |
| `src/hooks/useActionDispatch.ts` | 토큰 누적/붕괴 조건 | 쟁점별 참조로 전환 | ~30 |
| `src/engine/gameEventTriggerEngine.ts` | 모순 지연 실행 | `disputeId` 전달 파이프라인 | ~10 |
| `src/engine/lieStateMachine.ts` | S5 트리거 | 쟁점별 / 글로벌 중 택 1 (섹션 4) | ~15 |
| UI 컴포넌트 (pip 렌더) | 현재 `contradictionTokens` 참조 | `tokens[activeDispute.id] ?? 0` 참조 | ~5 |

각 파일에서:
- **현재 시그니처**(또는 관련 코드) 인용
- **변경 후 시그니처** 제안
- **변경 라인 예상 수**
- **회귀 위험도** (Low / Medium / High)

### 섹션 4. S5 붕괴 조건 재설계 (핵심 의사결정)

현재 추정: `contradictionTokens >= 5` → party의 lieState S5 승격 (글로벌)

쟁점별로 분리 후의 S5 조건 2안:

#### 안 A — 쟁점별 독립 S5
- 특정 쟁점 tokens ≥ N이면 **해당 쟁점만** S5 상태 도달
- 문제: lieState가 현재 party 단위. 쟁점별 lieState를 추가하면 복잡도 큼
- 게임플레이: "이 쟁점은 무너졌지만 다른 쟁점은 아직 버틴다" — 서사적 풍부함

#### 안 B — 합산 임계값 (글로벌 유지)
- `sum(tokens) >= 5` 또는 `max(tokens) >= 5`
- 장점: lieState는 party 단위 유지 (현재 아키텍처 보존)
- 단점: 쟁점별 분리의 의미가 UI 표시만으로 한정

#### 안 C — 다수결 (중간)
- `countWhere(tokens >= 2) >= 쟁점수/2` 같은 혼합
- 장점: 여러 쟁점에 걸친 모순이 있어야 붕괴 — 서사적으로 합리적
- 단점: 임계값 튜닝 복잡

**권장 1안 선택 + 근거** (최소 200자). 판단 기준:
- 게임 밸런스 (현재 플레이 체감 유지)
- 아키텍처 복잡도
- [design_v4_gameplay.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\design_v4_gameplay.md) / [design_v4_action_differentiation.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\design_v4_action_differentiation.md) 기획 의도와의 정합

### 섹션 5. 마이그레이션 전략

기존 저장 데이터 처리:

- **localStorage 'solomon-history'** (max 100건의 caseTelemetry) — 현재 `contradictionTokens` 숫자 저장
- **localStorage 'solomon-judge-progression'** — 영향 없음 (퍼크/조각만)

2안:
- **안 X**: 구 데이터는 폐기하고 읽을 때 기본값 초기화
- **안 Y**: 구 데이터 글로벌 값을 쟁점별로 배분 (균등/첫 쟁점 몰아/비례)

**권장 1안 선택 + 근거** 작성. 유저 히스토리 보존 가치 vs 구현 단순성 트레이드오프.

### 섹션 6. 회귀 테스트 범위

구현 후 **반드시 통과해야 할** 검증 항목:

- [ ] spouse-01 헤드리스 플레이스루 (쟁점 4개 전수)
- [ ] friend-01 헤드리스 (쟁점 5개)
- [ ] family-01 헤드리스 (쟁점 수 확인 필요)
- [ ] UI 쟁점별 pip 실제 차이 표시 (수동 확인)
- [ ] S5 승격 시점 정합 (안 A/B/C 선택안 기준)
- [ ] 세이브/로드 호환 (기존 localStorage 데이터 있는 상태에서 진입)
- [ ] 다수 쟁점 동시 진행 상황 (쟁점 간 토큰 간섭 없음)
- [ ] 퍼크 효과(모순 감각 등)와의 상호작용
- [ ] 후일담/판결 점수 계산 정합성

각 항목에 대해 **검증 방법 / 예상 소요 시간** 추가.

### 섹션 7. 구현 소요 예상

- **총 파일 수**: {n}
- **총 변경 라인 수**: {n}
- **예상 시간**: {n}시간 (타입 변경 → 엔진 → 스토어 → UI 참조 → 회귀 순)
- **권장 커밋 분할**:
  1. 타입 + 스토어 기본 골격
  2. 엔진 수정
  3. UI 참조 전환
  4. 마이그레이션
  5. 회귀 수정 (발견 시)

### 섹션 8. 우선순위 / 블로커 / 병행 가능성

- **이 작업이 선행되어야 가능한 것**: {있음/없음}
- **이 작업을 블로킹하는 것**: {있음/없음}
- **병행 가능한 다른 작업**: ThreadQW v6 / Codex v6 / Family-Friend 재넘버링 / GPT Pro 증거 재작성

### 섹션 9. 리스크 / 엣지 케이스

- 쟁점 id가 런타임에 동적 생성되는 경우 `Record<string, number>` 키 안정성
- 쟁점이 추가/제거되는 상황 (아마 없을 것이나 확인)
- 재판관 퍼크 "모순 감각"과의 상호작용
- [memory/feedback_judge_question_quality.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\feedback_judge_question_quality.md)의 재판관 질문과 모순 판정 타이밍

### 섹션 10. 결정 필요 항목 (CT/유저용)

Plan 스레드가 자체 판단으로 결정 못하는 항목을 명시:

- [ ] 섹션 4 S5 붕괴 조건 (안 A/B/C) — 최종 유저 결정
- [ ] 섹션 5 마이그레이션 전략 — 최종 유저 결정
- [ ] 기타 기획 판단 필요 항목

---

## 수정 권한

- **코드 변경 금지** (읽기만)
- 신규 파일 생성 금지 (단 `tmp/plan-contradiction-tokens-split.md` 산출물 1개 예외)
- 실험적 브랜치 금지

---

## 제출 형식

`tmp/plan-contradiction-tokens-split.md` 단일 파일. 최대 500줄 이내.

완성 후 CT에 보고 → CT/유저가 섹션 10 결정 항목 판단 → **별도 구현 세션(Codex)에 전달**.

---

## 참고 문서

- [memory/backlog_deferred.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\backlog_deferred.md) 2순위 섹션
- [memory/session_handoff_20260428.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\session_handoff_20260428.md) 2순위 섹션
- [memory/design_v4_gameplay.md](../../../C:\Users\user\.claude\projects\d--ProjectWS\memory\design_v4_gameplay.md) — V4 게임플레이 기획
- [CLAUDE.md](../../../CLAUDE.md) — 거짓말 상태 기계, Truth Throttle 전반

---

## 시작 체크리스트

- [ ] 이 문서 정독
- [ ] 섹션 1의 파일 7개를 읽어 현재 구조 파악
- [ ] 섹션별 내용 작성
- [ ] 최대 500줄 이내 유지 (초과 시 상세는 별도 부록으로 분리)
- [ ] CT에 보고 + 섹션 10 결정 항목 강조

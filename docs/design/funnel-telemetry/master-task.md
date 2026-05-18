# 마스터 의뢰서: 퍼널 / 텔레메트리 시스템

작성일: 2026-05-18
선행 자료:
- `docs/design/game-improvement-2026-05-18.md` §4 (Codex 퍼널 제안)
- ClaudeCode 메인 세션 정합성 점검 결과 (이 문서 §0)

---

## §0. 정합성 점검 요약

| 항목 | 상태 | 위치 |
|---|---|---|
| 기존 백엔드 | **Express + better-sqlite3 활성** | `server/` (라우트 + db/connection.js + db/schema.js) |
| `game_history` 테이블 | 존재 | `server/db/schema.js` L22-38 (player_id, case_id, score, insight, authority, wisdom, titles[JSON]) |
| ProcessMetrics 38개 | 정의됨 | `src/store/useGameStore.ts` L45-58 |
| `trackMetric()` | 정의됨, **호출부 미발견** | wire 필요 |
| Steam Stats 인터페이스 | 9개 업적 + mock bridge | `electron/steamworks-bridge.cjs` L7-18, 83-87 / `src/steam/steamAuth.ts` L60-80 |
| Vite 빌드 | web (`vite.config.ts`) + PC (`vite.config.pc.ts`) | 활성 |
| Vercel 정적 호스팅 | `vercel.json` (buildCommand: `npm run vercel:pc`) | 활성 |
| `/api/llm` 프록시 | 활성 (`src/engine/llmClient.ts` L56) | 외부 API 호출 패턴 참고 가능 |
| API 클라이언트 | `src/api/client.ts` (`authFetch` + `import.meta.env.VITE_API_URL`) | telemetry POST에 재사용 |
| 익명 UUID 메커니즘 | **없음** | 신규 필요 |
| Supabase / Prisma | 없음 | 도입 안 함 — 기존 SQLite 확장으로 결정 |
| `localStorage` 식별자 흔적 | `solomon-steam-session`, `solomon-mock-steam-id` | sessionStorage / 영속 UUID는 별도 키 |

## §1. 목표 + Privacy 원칙

### 목표
Steam 출시 전 사용자가 어디서 막히는지 / 어디서 즐기는지 측정할 수 있는 **자체 호스팅 퍼널 트래킹** 구축. 외부 의존 0 (PostHog/Mixpanel 등 미사용). 기존 Express + SQLite 백엔드 확장.

### Privacy 원칙 (필수 준수)

1. **자유 질문 원문, 대화 전문, 개인정보성 텍스트는 절대 전송하지 않는다.**
2. 구조화된 메타데이터만 수집: caseId / phase / turn / actionType / disputeId / evidenceId / resultType / duration 등 enum 또는 ID 값.
3. 익명 ID는 `crypto.randomUUID()` 1회 생성 후 localStorage 영속 (`solomon.telemetry.anonId`). Steam ID와 연결 안 됨 (옵션 §6).
4. 사용자 IP는 서버에서 저장하지 않음 (Express middleware로 첫 hop만 사용 후 폐기).
5. 첫 실행 시 약관 UI에서 telemetry opt-out 가능 (기본 opt-in으로 설정. opt-out 시 client emit 자체 차단).
6. 실패 시 게임 진행 영향 0. fire-and-forget 패턴. retry는 localStorage queue로.
7. 향후 GDPR 대응 위해 anonId 기반 삭제 API 1개 추가 (`DELETE /api/telemetry/me`).

### 비-목표
- A/B 테스트 시스템
- 실시간 분석 UI (1차에서는 SQL 직접 쿼리)
- 자유 질문/대화 텍스트 마이닝
- 사용자 행동 영상 / 세션 리플레이

## §2. 데이터 모델

### §2.1. 이벤트 스키마 (공통)

모든 telemetry event는 다음 공통 envelope:

```ts
type TelemetryEvent = {
  event_id: string         // crypto.randomUUID() — client 생성, idempotency 보장
  anon_id: string          // 익명 UUID
  session_id: string       // 세션 시작마다 새 UUID
  event_name: TelemetryEventName  // §2.2 enum
  event_payload: object    // event_name별 구조화 페이로드
  case_id?: string         // 'spouse-01' / 'family-01' / 'friend-01' / null (global)
  client_ts: string        // ISO8601, client 시각
  client_build: string     // 빌드 버전 / git hash
  client_platform: 'electron-steam' | 'electron-dev' | 'web-vercel' | 'web-dev'
  client_locale: 'ko' | 'en' | 'ja' | 'zh-CN'
}
```

서버는 추가로 `server_ts`, `received_at`, `ip_hash` (1회 hash 후 폐기) 부여 후 저장.

### §2.2. Event 카탈로그

| event_name | payload 핵심 필드 | 목적 |
|---|---|---|
| `session_start` | `entry_point` (home/case-direct/intro) | 세션 진입 |
| `session_end` | `duration_sec`, `last_phase`, `ended_by` (verdict/quit/crash) | 세션 종료 + 이탈 분류 |
| `phase_enter` | `phase` (Phase enum), `turn`, `from_phase` | Phase별 진입 |
| `phase_exit` | `phase`, `duration_sec`, `actions_count` | Phase별 체류 시간 |
| `tutorial_started` | — | 튜토리얼 시작 |
| `tutorial_step_completed` | `step_id` | 튜토리얼 진척 |
| `tutorial_skipped` | `at_step_id` | 어느 단계에서 끊었나 |
| `tutorial_finished` | `total_duration_sec` | 완주 |
| `tutorial_restarted_from_settings` | — | 재실행 |
| `first_meaningful_action` | `action_type`, `time_from_session_start_sec` | 첫 의미 행동 도달 |
| `action_select` | `action_type` (question/evidence/witness/special), `target` (a/b), `dispute_id`, `evidence_id?`, `question_angle?` | 행동 선택 분포 |
| `action_blocked` | `action_type`, `reason` (resource/condition/invalid_target) | 막힌 지점 |
| `question_result` | `dispute_id`, `target`, `angle`, `lie_state_before`, `lie_state_after`, `effective` (bool) | 질문 효과 |
| `evidence_investigate` | `evidence_id` | 증거 조사 |
| `evidence_present_result` | `evidence_id`, `target`, `dispute_id`, `result` (effective/ineffective/mismatched) | 증거 사용 |
| `feedback_shown` | `kind`, `intensity`, `cue` | 피드백 카드 표시 |
| `feedback_action` | `kind`, `chosen_option` | 카드에서 액션 선택 |
| `feedback_dismiss` | `kind` | dismiss |
| `hidden_dispute_emerged` | `dispute_id`, `via_combination?` (recipe id) | 반전 도달 |
| `truth_stage_changed` | `target`, `dispute_id`, `from_state` (S0~S5), `to_state` | 진실 진행 |
| `lie_collapse` | `target`, `dispute_id` | S5 도달 |
| `combination_attempt` | `recipe_attempted` (ids array) | 조합 시도 |
| `combination_success` | `recipe_id`, `output_id` | 조합 성공 |
| `combination_fail` | `recipe_attempted`, `reason?` | 조합 실패 |
| `verdict_enter` | `phase=verdict` | 판결 진입 |
| `verdict_submit` | `verdict_value`, `confidence?`, `time_in_verdict_sec` | 판결 제출 |
| `verdict_retry` | `previous_verdict`, `new_verdict` | 판결 재시도 |
| `impact_beat_played` | `beat_id`, `intensity`, `case_id` | 임팩트 비트 발화 (임팩트 의뢰서 §5.3 합류) |
| `t3_climax_reached` | `case_id`, `beat_id` (예: h-d3) | T3 도달 |
| `verdict_entry_cutscene_played` | — | 판결 진입 cutscene |
| `error_caught` | `error_type`, `phase?`, `recoverable` (bool) | 클라이언트 에러 (스택트레이스 X — 메시지 enum만) |

이벤트 추가는 enum 확장으로 가능.

### §2.3. SQLite 테이블 schema

신규 테이블 1개. 인덱스 5개. 기존 `game_history` 건드리지 않음.

```sql
CREATE TABLE IF NOT EXISTS telemetry_events (
  event_id TEXT PRIMARY KEY,        -- client 생성 UUID, idempotency
  anon_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event_name TEXT NOT NULL,
  event_payload TEXT NOT NULL,      -- JSON stringify
  case_id TEXT,                     -- nullable for global events
  client_ts TEXT NOT NULL,          -- ISO8601
  client_build TEXT NOT NULL,
  client_platform TEXT NOT NULL,
  client_locale TEXT NOT NULL,
  server_ts TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  received_at INTEGER NOT NULL,     -- epoch ms
  ip_hash TEXT                      -- sha256(ip + daily_salt). nullable (정책 §1.4)
);

CREATE INDEX IF NOT EXISTS idx_telemetry_anon ON telemetry_events(anon_id, client_ts);
CREATE INDEX IF NOT EXISTS idx_telemetry_session ON telemetry_events(session_id, client_ts);
CREATE INDEX IF NOT EXISTS idx_telemetry_event_name ON telemetry_events(event_name, client_ts);
CREATE INDEX IF NOT EXISTS idx_telemetry_case ON telemetry_events(case_id, client_ts);
CREATE INDEX IF NOT EXISTS idx_telemetry_server_ts ON telemetry_events(server_ts);
```

migration은 `server/db/schema.js`의 createTables() 패턴에 추가.

### §2.4. 분석 쿼리 (1차)

`server/db/analytics-queries.sql` 파일에 핵심 쿼리 7~10개 모음 (수동 실행용):

- 케이스별 시작→완주 funnel
- 튜토리얼 step별 이탈률
- Phase별 평균 체류 시간 + 이탈률
- 같은 행동 3회 이상 반복 분포
- 증거 조사 없이 증거 제시 실패율
- 숨은 쟁점 발현 전 이탈률
- 첫 T3 클라이맥스 도달률
- 판결 제출 vs 진입 비율

대시보드 UI는 1차 범위 밖. SQL 직접 또는 추후 `sqlite-web` / DBeaver.

## §3. 작업 분담 — 단일 트랙

| 트랙 | 자원 | 산출물 |
|---|---|---|
| **A. 전체 구현** | Codex 별도 스레드 | 클라이언트 (funnelClient + emit wire) + 서버 (라우트 + migration) + privacy + analytics 쿼리 |

ClaudeCode 다른 스레드나 GPT Pro는 이 의뢰에 필요 없음 (자연어 콘텐츠 없음).

---

# §4. Track A — 전체 구현 (Codex 의뢰)

> 이 섹션을 그대로 Codex 별도 스레드에 던질 수 있다. §0~§2를 컨텍스트로 함께 첨부.

## A.1. 작업 범위

클라이언트 + 서버 + 이벤트 emit wire 일괄 구현.

## A.2. 클라이언트

### A.2.1. 신규 파일

#### `src/telemetry/funnelClient.ts`
```ts
// 공개 API
export function initTelemetry(): void  // app 시작 시 1회. anon_id 생성/로드, session_id 생성
export function trackEvent(name: TelemetryEventName, payload: object, caseId?: string): void
export function flushNow(): Promise<void>  // 강제 flush (앱 종료 시)
export function setOptOut(optOut: boolean): void  // 사용자 설정
export function getAnonId(): string  // 디버그/지원용
```

내부 동작:
- 큐: in-memory array + localStorage backup (`solomon.telemetry.queue`)
- 배치 flush 조건: 5초 경과 OR 30건 누적 OR `flushNow()` 호출
- POST `/api/telemetry/events` with body `{ events: TelemetryEvent[] }`
- 실패 시: retry 최대 3회 (exponential backoff). 3회 실패 후 localStorage queue에 보존, 다음 세션 재시도
- opt-out 시: queue/POST 자체 차단
- 페이지 unload 시 `navigator.sendBeacon` fallback으로 flush

#### `src/telemetry/anonId.ts`
```ts
export function getOrCreateAnonId(): string {
  const KEY = 'solomon.telemetry.anonId'
  const cached = localStorage.getItem(KEY)
  if (cached) return cached
  const newId = crypto.randomUUID()
  localStorage.setItem(KEY, newId)
  return newId
}
```

#### `src/telemetry/eventTypes.ts`
- `TelemetryEventName` enum (§2.2 카탈로그)
- 각 event_name별 payload TypeScript type (strict)
- `trackEvent` overload로 type narrowing 보장

#### `src/telemetry/wirePoints.ts`
중앙 wire 헬퍼. 각 emit 지점이 직접 trackEvent를 부르는 대신 wirePoints의 short helper 사용 (`emitPhaseEnter`, `emitActionSelect` 등). 이유: 향후 event payload 변경 시 한 곳에서 관리.

### A.2.2. 수정 파일 — Event emit wire

핵심 emit 지점 (§2.2 카탈로그 기준):

| 이벤트 | 파일 | 위치 |
|---|---|---|
| `session_start` / `session_end` | `src/App.tsx` 또는 root mount/unmount | useEffect |
| `phase_enter` / `phase_exit` | `src/store/slices/phaseSlice.ts` `advancePhase` | mutation 직후 |
| `tutorial_*` | `src/store/slices/tutorialSlice.ts` (튜토리얼 의뢰서에서 신규 작성됨) | step mutation |
| `first_meaningful_action` | `src/hooks/useActionDispatch.ts` | 첫 action dispatch |
| `action_select` | `src/hooks/useActionDispatch.ts` | dispatch entry |
| `action_blocked` | `src/hooks/useActionDispatch.ts` | validation fail |
| `question_result` | resolveInterrogation 결과 도착 지점 | 결과 mutation |
| `evidence_investigate` | evidence viewer open 시점 (PCLeftPanel 또는 evidenceSlice) | |
| `evidence_present_result` | presentEvidence 결과 분기 | |
| `feedback_shown` / `feedback_action` / `feedback_dismiss` | `EventFeedbackCard` 라이프사이클 | |
| `hidden_dispute_emerged` | emergenceHooks 트리거 직후 | |
| `truth_stage_changed` / `lie_collapse` | `agentSlice.transitionLie` | mutation |
| `combination_*` | combinationLab slice 액션 | |
| `verdict_*` | verdict 슬라이스 액션 | |
| `impact_beat_played` / `t3_climax_reached` / `verdict_entry_cutscene_played` | 임팩트 강화 (별도 의뢰서) wire 시점에 합류 | 임팩트 Track A와 협조 |
| `error_caught` | global error boundary | |

각 emit은 fire-and-forget. throw하지 않음.

### A.2.3. 설정 UI

`src/components/pc/settings/` 에 telemetry opt-out 토글 추가:
- "사용 데이터 수집 허용" (기본 ON)
- 설명: "익명 통계로 게임 개선에 사용됩니다. 자유 질문이나 대화 내용은 절대 수집하지 않습니다."
- OFF 시 즉시 client emit 차단 + localStorage queue 비우기
- 카피는 한국어만 작성하고, 다국어는 본 번역 batch에 합류

## A.3. 서버

### A.3.1. 신규 파일

#### `server/routes/telemetry.js` (Express 라우트)
```
POST /api/telemetry/events
  body: { events: TelemetryEvent[] }
  validation:
    - events.length <= 100 (rate limit)
    - 각 event에 필수 필드 (event_id, anon_id, session_id, event_name, event_payload, client_ts) 존재
    - event_name이 enum에 속함
    - JSON stringify 후 payload 크기 < 8KB
  처리:
    - ip_hash = sha256(req.ip + DAILY_SALT). 원본 ip는 변수에서 즉시 폐기
    - DB insert (idempotency: event_id PK conflict 시 무시)
    - 응답: { accepted: N, rejected: M, errors?: [...] }
  실패해도 200 반환 (client 재시도 안 함). 단 validation 실패는 400.

DELETE /api/telemetry/me?anon_id=...
  단일 anon_id의 모든 telemetry_events 행 삭제
  응답: { deleted: N }
```

`DAILY_SALT`는 환경변수 `TELEMETRY_DAILY_SALT_BASE`에서 + 날짜로 생성 (매일 자동 변경).

#### `server/db/migrations/add-telemetry-events.js`
`telemetry_events` 테이블 + 5 인덱스 생성. 기존 `server/db/schema.js`의 createTables() 패턴 따름. idempotent (CREATE TABLE IF NOT EXISTS).

#### `server/db/analytics-queries.sql`
§2.4의 7~10개 쿼리. 주석으로 각 쿼리 목적 명시.

### A.3.2. 수정 파일

- `server/index.js` (또는 app 진입점): telemetry 라우트 등록
- `server/db/schema.js`: createTables()에 telemetry 테이블 migration 추가

### A.3.3. 환경 변수

- `TELEMETRY_DAILY_SALT_BASE`: 무작위 64자 문자열. `.env.example`에 placeholder 추가. README에 생성 가이드.
- `TELEMETRY_ENABLED`: 기본 `true`. `false` 시 서버 라우트가 200 OK만 반환하고 저장 안 함 (개발/테스트)

## A.4. Steam Stats / Achievements 연동 (옵션)

기존 `electron/steamworks-bridge.cjs`의 9개 업적과 연동:
- `ACH_FIRST_CASE_CLEARED` → `verdict_submit` 첫 발생 시
- `ACH_PERFECT_VERDICT` → 특정 lie_collapse / 증거 조건 (별도 비즈니스 로직)
- 기타 7개는 기존 wired 그대로

이번 의뢰에서는 stats unlock 코드 추가만. business logic 변경 없음.

## A.5. 검증 요구사항

- 진입 조건: working tree clean
- 작업 후 `npm run check:all` 통과
- `npm run dev:pc` + `npm run server` 동시 실행
- spouse-01 진입 → 핵심 emit 흐름 직접 실행:
  - session_start / phase_enter / action_select / question_result / evidence_present_result / hidden_dispute_emerged / truth_stage_changed / verdict_submit / session_end
- SQLite 확인: `sqlite3 server/db/solomon.db "SELECT event_name, COUNT(*) FROM telemetry_events GROUP BY event_name"`
- 설정에서 opt-out → 이후 emit 0 확인
- localStorage clear → 새 anon_id 생성 확인
- 네트워크 fail 시뮬레이션 → localStorage queue 누적 → 다음 세션 자동 재전송 확인
- 100건 batch 한 번에 보내기 시도 → 200 OK + 정확히 100건 insert 확인
- analytics-queries.sql 7~10개 쿼리 직접 실행해 결과 합당한지 확인

산출은 staged 상태. commit은 사용자가 직접.

---

# §5. 통합 / 검증 / 후속

## §5.1. 다른 의뢰서와의 합류

- **튜토리얼 의뢰서**: `tutorialSlice`가 신규 작성되므로 `tutorial_*` 이벤트 wire는 tutorialSlice 도착 후 진행. Codex 동일 스레드면 자연스러움.
- **임팩트 강화 의뢰서**: `impact_beat_played` / `t3_climax_reached` / `verdict_entry_cutscene_played`는 임팩트 wire 시점에 함께 emit. Codex 임팩트 스레드에 telemetry hook 적용 의뢰 추가 필요.

## §5.2. 출시 후 확장 (1차 범위 밖)

- 분석 대시보드 (`server/web-dashboard/` 또는 sqlite-web)
- 익명 ID + Steam ID 연결 (사용자 동의 시. 옵션 §6 참조)
- 일간 ETL 집계 테이블 (telemetry_daily_*)
- A/B 테스트 framework

## §5.3. 완료 조건

- [ ] 클라이언트 funnelClient + anonId + eventTypes + wirePoints 통합
- [ ] 모든 §2.2 이벤트 emit wire (impact 비트는 임팩트 의뢰서 합류 후)
- [ ] 서버 telemetry 라우트 + migration + analytics 쿼리
- [ ] privacy 원칙 7항목 모두 통과
- [ ] opt-out 토글 동작
- [ ] check:all 통과 + PC + server 통합 실행 OK
- [ ] commit (사용자 직접)

---

# §6. 사용자 결정 확정 (2026-05-18)

[decisions-5.md](decisions-5.md) 5건 모두 메인 추천 수락.

- [x] **Steam ID 연동**: **anon_id만**. Steam ID 미수집. privacy 단순성 우선.
- [x] **opt-in vs opt-out 기본값**: **opt-in 기본 ON**. 첫 실행 시 약관 모달 + 자동 ON. 설정에서 끄기 가능. Steam 업계 표준.
- [x] **production hosting**: **Oracle Cloud Always Free VPS** (1차 추천). server/ Express 코드 그대로 deploy. 비용 영구 $0. 셋업 약 2~4시간 (Oracle 계정 / Always Free 인스턴스 / Node.js / nginx / Let's Encrypt / Cloudflare DNS). VITE_API_URL = production 도메인 (build 시점 주입). 대안: 출시 일정 촉박 시 D안 (1차 telemetry 비활성, endpoint 추후 결정).
- [x] **약관 UI**: **퍼널 의뢰에 포함, 간단 모달**. 첫 실행 시 한 화면 (약관 텍스트 + opt-out 토글 + "동의하고 시작" 버튼). 별도 디자인 의뢰서 분리 안 함.
- [x] **로컬 dev 환경**: **dev 자동 비활성화**. `import.meta.env.DEV === true`면 telemetry OFF. 강제 ON은 `VITE_TELEMETRY_FORCE_ON=true` 환경변수.

## §6.1. 구현 적용 영역 (확정 반영)

### Privacy (§1)
- anon_id만 — Steam ID 해싱 로직 불필요. envelope 단순화.
- opt-in 기본 ON — 첫 실행 약관 동의 후 자동 활성. localStorage에 동의 상태 저장.

### Client (§A.2)
- `funnelClient.ts` init 시 `import.meta.env.DEV` 체크 → DEV면 emit 자동 차단
- `VITE_TELEMETRY_FORCE_ON=true` 환경변수 시 dev에서도 emit (의도적 테스트용)
- `VITE_API_URL` (build 시점 주입) → `https://api.solomon-game.com/api/telemetry/events` 또는 동등 production endpoint
- 첫 실행 약관 모달 컴포넌트 추가 (`src/components/pc/settings/PCTelemetryConsentModal.tsx` 또는 동등)

### Server (§A.3)
- server/ Express 그대로 + telemetry 라우트 + SQLite migration
- CORS 정책: Electron production origin 허용
- production hosting deploy 가이드 별도 (Oracle 셋업 단계)

### Hosting deploy 가이드 (§A.3.4 신규)
1. Oracle Cloud 계정 + Always Free 인스턴스 (Ampere 1 OCPU / 1GB RAM, Ubuntu 22)
2. Node.js 20 + sqlite + nginx + Let's Encrypt 설치
3. server/ 코드 deploy (git pull + pm2 + systemd 서비스)
4. Cloudflare 무료 plan: DNS + DDoS 방어 + SSL
5. 도메인 연결 후 `VITE_API_URL` 환경변수 설정 (Electron build)

이 단계 자체는 사용자가 직접 수행 (또는 별도 인프라 의뢰). 의뢰서는 코드 영역만 다룸.

## §7. 일정 권장

- 의뢰 발송: 튜토리얼 / 임팩트 Track A 진행 중 또는 완료 후 (이벤트 wire가 그것들과 합류하므로 후행)
- 구현: 약 2~3일 (클라+서버 통합)
- 통합 QA: 1일

문의: ClaudeCode 메인 세션으로 회신.

# Information Surface Policy — 메시지/기록/관찰 위상

**버전**: v1.1 (2026-04-27 — 사용자 confirm 후 보정 반영)
**작성**: ClaudeCode CT-Main (2026-04-27)
**대응 영역**: P0-D 메시지 위상 / P0-E VFX 위계 / P0-F AI 자유심문 대표 컷인 / P1-D 수첩·발언노트 자동 저장 (출시 전 최소형)

---

## 1. 게임 핵심 원칙

> **"진실은 플레이어가 직접 밝혀낸다."** (`CLAUDE.md`)

이 정책은 진실 누설 방지(`docs/disclosure-policy.md`)와 짝을 이루는 **인지 부하 관리** 영역이다. 사건 변화가 7 표면에 동시에 복제되면 채팅창이 시스템 로그처럼 보이고 컷씬이 과다해진다. 각 표면은 서로 다른 역할을 가져야 한다.

**기본 원칙**:
- 하나의 이벤트는 여러 표면에 복제하지 않는다
- 각 표면은 길이·문체·보존 기간이 다르다
- VFX는 장식이 아니라 "방금 무엇을 해냈는지 알려주는 문법"
- truth leak 위험 텍스트는 어떤 표면에도 자백 전 노출 X

---

## 2. 7 표면 역할 정의

### 2.1 채팅창 시스템 메시지

| 항목 | 내용 |
|---|---|
| 역할 | 법정에서 실제로 들린 말 + 최소한의 진행 알림 + 클릭 가능한 feedback 진입점 |
| 보존 | 세션 단위 (스크롤 archive) |
| 길이 | **단일 줄 ≤ 30자 / 두 줄 ≤ 60자** (CT 1차 제안 §6) / 세 줄 이상 금지 — 더 길면 관찰/수첩으로 |
| 문체 | 합니다체 / 짧고 단정적 / 메커닉 명사 X |
| 넣을 것 | 새 쟁점 열림, 증거 제시 결과, 증인 호출 가능, 심문 단계 전환, 다음 가능 행동 |
| 넣지 말 것 | 긴 설명, 내부 판정 디테일, 점수/메커닉 상세, 수첩/관찰과 중복된 장문, truth leak 위험 텍스트 |
| sample (✅) | `진술이 흔들립니다.` / `새 쟁점이 기록되었습니다.` / `해당 증거가 쟁점과 연결되었습니다.` |
| sample (❌) | `intent classifier가 fact_pursuit으로 분류하여 disputeId d-2와 매핑되었습니다.` (내부 용어) |

### 2.2 재판관의 관찰

| 항목 | 내용 |
|---|---|
| 역할 | "방금 감지한 변화"를 짧게 해석 + 다음 판단 시사점 |
| 보존 | **현재 phase 동안만** (phase 종료 시 자동 정리 / 사용자 수동 archive 가능) |
| 길이 | 1~3줄, 최대 80자/줄 |
| 문체 | 평서체 (재판관 내적 독백) — 합니다체 X / 반말 X |
| 넣을 것 | 모순 감지, 감정 동요, 방어 완화, 진술 균열, 쟁점-증거 연결, 자유심문 분석 요약 |
| 넣지 말 것 | 영구 보존 자백, 모든 단순 system message, 일반 성공 로그 |
| sample (✅) | `이전 진술과 현재 답변 사이에 틈이 생겼다.` / `감정 방어가 낮아져 추가 질문 여지가 생겼다.` / `질문이 자금 이동 쟁점과 연결된다.` |

### 2.3 재판관의 수첩

| 항목 | 내용 |
|---|---|
| 역할 | 장기 보존 핵심 기록 + 판결 직전 요약 근거 + 추리 성과 저장소 |
| 보존 | **사건 종료까지 영구** + 판결 직전 자동 노출 |
| 길이 | 카드 단위 (제목 ≤ 30자 / 본문 ≤ 120자) |
| 문체 | 명확하고 단정적 (판결문에 인용 가능한 톤) |
| 카테고리 (출시 전 P1-D 최소형) | **자백 / 결정적 모순 / 핵심 증거** 3종만 |
| 카테고리 (P2 확장) | 새 쟁점 / 증인 증언 / 판결 근거 |
| 자동 저장 트리거 | (1) S5 자백 / (2) 결정적 모순 — **플레이어가 추궁·확정한 후만** / (3) 핵심 evidence 조합 — **새 쟁점 unlock 또는 판결 근거급 조합만** — 그 외는 P2 |
| 넣을 것 | 자백 / 결정적 모순 / 핵심 증거 연결 |
| 넣지 말 것 | 일반 질문 성공, 감정 수치 변화, 사소한 system message, 반복 fallback, 단순 튜토리얼 안내 |

### 2.4 발언노트

| 항목 | 내용 |
|---|---|
| 역할 | 특정 발언 원문 재참조 + "이 사람이 언제 무슨 말을 했는지" 추적 |
| 보존 | 사건 종료까지 영구 (발화 단위) |
| 길이 | 발화 원문 그대로 (NPC 발언 1턴) |
| 자동 저장 트리거 (출시 전 최소형) | (1) 자백 발언 / (2) 증인 핵심 증언 / (3) 결정적 모순에 사용된 전후 발언 / (4) S3+ 중 `key_statement` 표시 발언. **일반 S3+ 응답은 자동 저장 X** |
| 자동 저장 X | 일반 응답 / **fallback** (시스템 회피, NPC 발화 X) / system message / 컷씬 텍스트 |
| 사용자 수동 저장 | 한 번 클릭으로 추가 가능 |
| 필수 메타 | speaker / caseId / phase / turn / disputeId / relatedEvidence / source (`scripted` / `llm` / `fallback` / `witness`) / safety (`surface` / `gated` / `confession`) |
| 넣을 것 | NPC 중요 발언 원문 / 진술 변화 전후 / 모순 추궁 인용 / 자백 직전·자백 / 증인 핵심 |
| 넣지 말 것 | 시스템 알림 / 컷씬 문구 / UI 설명 / 감정·신뢰 수치 로그 |

### 2.5 EventFeedbackCard / Modal

| 항목 | 내용 |
|---|---|
| 역할 | 플레이어 즉시 선택·반응 필요 이벤트 / 단기 집중 UI |
| 보존 | 클릭/dismiss까지 |
| 길이 | 제목 ≤ 20자 / 본문 ≤ 100자 / 선택지 ≤ 30자 |
| 넣을 것 | 진실 공방 선택 / 판단 충돌 / 감정 실언 반영 / 증인 질문 / perk 선택 / 중요 evidence result |
| 넣지 말 것 | 단순 알림 / 장기 기록용 텍스트 / 반복 성공 메시지 |

### 2.6 VFX / Cutscene

| 항목 | 내용 |
|---|---|
| 역할 | 정보 전달 X / **중요도 신호** + 변화의 순간 감각적 각인 |
| 텍스트 | **짧게 (≤ 12자/줄, 2줄 이내)** |
| 위계 | Level 1 micro (자주) / Level 2 cut-in (드물게) / Level 3 major (사건당 1~3회) — §4 참조 |
| 넣을 것 | 첫 AI 자유심문 성공 / 진술 균열 / 새 쟁점·증거·증인 unlock / 자백·방어 붕괴 / 판결 |
| 넣지 말 것 | 장문 설명 / 세부 판정 / 모든 discovery 결과 / 같은 이벤트 반복 |
| 내부 용어 금지 | `intent` / `classifier` / `LLM` / `guard` / `policy` / `누설` 등 |

### 2.7 UI 배지 / 카드 강조

| 항목 | 내용 |
|---|---|
| 역할 | "어디를 봐야 하는지" 안내 / VFX 이후 실제 UI 위치 연결 |
| 보존 | 사용자 확인까지 |
| 길이 | 텍스트 거의 없음 (숫자·아이콘·dot) |
| 넣을 것 | 새 쟁점 카드 badge / 증거 카드 highlight / 증인 탭 badge / 수첩 unread marker |
| 넣지 말 것 | 서사 설명 / 긴 문장 |

---

## 3. 이벤트별 표면 매핑

각 행 = 이벤트. 각 칸 = 해당 표면에 무엇을 출력하는가.

`-` = 출력 X / `micro` = Level 1 / `cut-in` = Level 2 / `major` = Level 3

발언노트 column의 `(key_statement이면)` = §6.2 4 트리거 충족 시.

| 이벤트 | 채팅창 | 관찰 | 수첩 | 발언노트 | EventFeedback | VFX | UI 배지 |
|---|---|---|---|---|---|---|---|
| 일반 질문 성공 | NPC 답변 | 필요 시 1줄 | - | (key_statement이면) | - | micro | - |
| 사실 추궁 성공 | NPC 답변 + 짧은 메시지 | 진술 균열 1줄 | (결정적 + 추궁 확정이면) | (결정적 모순이면 전후) | - | cut-in (crack) | 모순 카드 highlight |
| 감정 접근 성공 | NPC 답변 | 방어 완화 1줄 | (감정 실언이면) | (감정 실언 + key_statement이면) | - | cut-in (aura) | - |
| 동기 탐색 성공 | NPC 답변 | 숨은 쟁점 접근 1줄 | (새 쟁점이면) | (key_statement이면) | - | cut-in (reveal) | 새 쟁점 badge |
| 자유심문 분석 성공 (첫 회) | NPC 답변 + 짧은 메시지 | 분석 요약 3~4줄 | (새 쟁점이면) | (key_statement이면) | - | **major (두뇌 풀가동 — P0-F)** | 관련 카드 highlight |
| 자유심문 분석 성공 (반복) | NPC 답변 | 1줄 | (새 쟁점이면) | (key_statement이면) | - | micro (compact) | - |
| 자유심문 매핑 실패 (unmapped) | 안전 fallback 응답 (P0-B) | - | - | - | - | - | - |
| 증거 제시 성공 | 짧은 결과 메시지 | 증거-쟁점 연결 1줄 | (핵심·판결 근거급 조합이면) | (NPC 반응 + key_statement이면) | - | cut-in (pulse + resonance) | 증거 카드 highlight |
| 모순 추궁 성공 | NPC 답변 | 모순 기록 1줄 | (결정적 + 추궁 확정이면) | (결정적 모순이면 전후) | - | cut-in (contradiction_hit) | 수첩 unread |
| 새 쟁점 unlock | 짧은 알림 | 쟁점 개방 이유 1줄 | 새 쟁점 카드 저장 | (관련 key_statement 링크) | - | cut-in (dispute_emergence + aura) | 쟁점 카드 badge |
| 증인 호출 가능 | 짧은 알림 | 호출 가능성 1줄 | (핵심 증인이면) | - | - | micro (badge pulse) | 증인 탭 badge |
| 증인 핵심 증언 | 증인 발언 | 증언 요약 1줄 | (핵심 증언이면) | **증인 핵심 증언 저장 (필수)** | - | cut-in | 수첩 unread |
| 자백 / S5 | 자백 발언 | 방어 붕괴 1줄 | **자백 저장 (필수)** | **자백 원문 저장 (필수)** | - | **major (lie_collapse)** | 수첩 unread |
| 판결 | 없음 또는 최소 | - | 판결 근거 요약 자동 노출 | 참조만 | 판결 결과 화면 | **major (verdict_gavel)** | - |
| Phase 전환 (초반) | 짧은 안내 | - | - | - | - | cut-in (1~2회만) | - |
| Phase 전환 (이후) | 토스트만 | - | - | - | - | micro | - |

**중요**: 위 매핑은 **화면 주목도 / 출력 순서** 기준. 영구 저장 트랙(수첩·발언노트)은 화면 표시와 별개로 **트리거 조건 충족 시 항상 저장** — VFX가 떴다고 누락되면 안 됨 (§6.4 참조).

---

## 4. VFX 사용 규칙

### 4.1 위계

| Level | 용도 | 빈도 | 예시 |
|---|---|---|---|
| **Level 1 micro** | 일반 성공 피드백 | 자주 | 카드 pulse / chip highlight / 미터 변화 / 짧은 glow / 작은 line draw / 말풍선 jump |
| **Level 2 cut-in** | 중요 변화 | 한 액션 1회 + cooldown | 진술 균열 / 증거 조합 성공 / 새 쟁점·증거·증인 unlock / 모순 추궁 성공 / 감정 방어 완화 |
| **Level 3 major** | 게임 기억점 | **사건당 1~3회만** | 첫 AI 자유심문 성공 / S5·자백·방어 붕괴 / 최종 판결 |

### 4.2 번개 사용 규칙 (CT 1차 제안)

기존에 번개를 강조 VFX로 잡은 영역은 유지하되, **빈도 + cooldown**을 강제한다.

**허용 (= 의미 있는 연결 순간만)**:
- AI 자유심문 분석 → 쟁점/증거 연결
- 증거 조합 성공 → 새 쟁점 열림
- 시스템 메시지 → 실제 쟁점 카드 점프
- 판결 직전 핵심 증거 → 판결 보드 모임
- S5 / 방어 붕괴

**축소 (= 다른 micro VFX로 대체)**:
- 일반 질문 성공
- 단순 system message
- 반복되는 phase 안내
- 모든 discovery 결과
- 단순 카드 강조

**대체 VFX (Level 1 micro)**:
- aura / soft glow / card pulse / chip slide / line draw / small crack / meter tick

**Cooldown 규칙**:
- 한 액션에 번개 sequence 1회만
- 같은 target에 5턴 이내 반복 번개 금지
- 3연속 번개는 새 쟁점 unlock 같은 명확한 보상 순간에만

### 4.3 컷씬 cooldown / 우선순위

- 같은 종류 cut-in cooldown: 5턴
- major cutscene 사건당 hard cap: 3회 (첫 AI 자유심문 1 + 자백 1 + 판결 1)
- 동시 발생 시 우선순위: **major > cut-in > micro** (낮은 위계는 skip)

### 4.4 target selector 기준 (CT 1차 제안)

VFX 후 실제 UI 위치 연결 = `data-*` attribute 기반.

기존 자료: `memory/reference_resonance_selectors.md` 활용.

표준 attribute (이미 적용된 영역 + 신규):
- `data-evidence-id="e-1"` — 증거 카드
- `data-dispute-id="d-1"` — 쟁점 카드
- `data-witness-id="w-1"` — 증인 영역
- `data-dossier-card-id="dc-1"` — dossier 카드
- `data-party="a"` / `data-party="b"` — NPC 영역
- `data-notebook-card-id="..."` — 수첩 카드 (신규 / P1-D 영역)

VFX 호출 시 selector 매칭 실패 → fallback (중앙 영역 micro pulse) / 콘솔 warn 0.

### 4.5 기존 컷씬 6종 재정리

| ID | 위계 | 용도 | 보강 |
|---|---|---|---|
| `lie_collapse` | major | S5 / 자백 / 방어 붕괴 | 문구는 "방어 붕괴" / "진술 한계" / "자백 임계치" — `누설` 회피 |
| `contradiction_hit` | cut-in | 모순 추궁 / 자유심문 흔듦 / 사실 추궁 | "진술 균열" / "모순 기록" / "새 추궁점 발견" |
| `emotional_burst` | cut-in | 감정 접근 / 방어 완화 / S4 전조 | **cooldown 강화 필수** (반복 시 가장 피로) |
| `dispute_emergence` | cut-in | 새 쟁점 unlock | full cutscene 추가 X / modal dismiss 후 aura·resonance로 카드 강조 |
| `phase_transition` | (조정) | Phase 전환 | **빈도 축소** — 초반 1~2회만 강하게 / 이후 토스트 축약 |
| `verdict_gavel` | major | 최종 판결 | 직전 핵심 증거·쟁점 정렬 micro cutscene 추가 권장 |

---

## 5. AI 자유심문 분석 결과 노출 기준 (P0-F 입력)

### 5.1 두뇌 풀가동 / 질문 분석 컷인 (P0-F 신규)

자유심문 입력 후 **질문 분석 성공** 시 트리거.

| 조건 | 표현 | 표면 |
|---|---|---|
| 첫 성공 (사건당 1회) | **major cutscene** — 강한 버전 | 관찰: 분석 요약 3~4줄 / 수첩: 새 쟁점이면 / VFX: 두뇌 풀가동 |
| 반복 성공 | **micro VFX** — compact | 관찰: 1줄 / 수첩: 새 쟁점이면 / VFX: 짧은 chip-to-card line draw |
| `unmapped` | VFX X | 관찰 X / 수첩 X / **발언노트 X** / 채팅창에는 **안전 fallback 응답** (P0-B 안전장치 영역 — 게임 정지 X) |

### 5.2 비주얼 (P0-F 의뢰서 입력)

- 플레이어 질문 문장이 잠깐 떠오름
- 문장이 조각나며 칩으로 변환: 대상 / 의도 / 쟁점 / 증거
- 칩들이 사건 보드 / 증거 / 쟁점 카드로 연결 (기존 ResonanceLayer 활용)
- 마지막 문구: `심문 경로 확정`

### 5.3 노출 문구 (허용 / 금지)

**허용**:
- `질문 분석`
- `쟁점 연결`
- `관련 증거 확인`
- `심문 경로 확정`

**금지** (내부 용어):
- `intent`
- `classifier`
- `LLM`
- `guard`
- `policy`
- `누설`

### 5.4 톤

- SF가 아니라 **"재판 기록이 빠르게 재구성되는 느낌"**
- 금색 / 청색 / 전기선 중심
- 법정 보드 + 신경망 느낌

### 5.5 fallback 답변 표면 노출

자유심문 guard / heuristic가 fallback으로 대체한 응답:

| 표면 | 처리 |
|---|---|
| 채팅창 | NPC 응답 자리에 fallback 텍스트 (캐릭터 archetype 정합) |
| 관찰 | 출력 X (CT 1차 제안 — 사용자 결정 영역) |
| 수첩 | 출력 X (자백/모순/증거 카테고리 무관) |
| **발언노트** | **저장 X** (CT 1차 제안 — 발언노트는 NPC 발화 추적 영역, fallback은 시스템 회피) |
| VFX | 출력 X |

→ fallback이 반복되면 별도 영역(예: `분석 실패 log`)에 누적 — **출시 후 영역**.

---

## 6. CT 1차 제안 — 사용자 결정 7항목

사용자 가이드의 결정 영역 7개. CT 1차 안 + 사용자 confirm 영역.

### 6.1 관찰 vs 수첩 경계
- **관찰**: 일시적 / 단기 / 현재 phase 동안만 의미 / phase 종료 시 자동 정리
- **수첩**: 영구 / 사건 종료까지 보존 / 판결 직전 자동 노출
- **자동 승격 (관찰 → 수첩)**:
  - (1) S5 자백
  - (2) 결정적 모순 — **단순 감지 시점 X / 플레이어가 실제로 추궁·확정한 후만 승격** (감지만으로 수첩 진입 X)
  - (3) 핵심 evidence 조합 — **모든 조합 X / 새 쟁점 unlock 또는 판결 근거급 조합만 자동 승격** (일반 조합은 사용자 수동 archive)
- 그 외는 사용자 수동 archive

### 6.2 발언노트 자동 저장 기준 (출시 전 최소형)
- **저장 (4 트리거)**:
  - (1) 자백 발언
  - (2) 증인 핵심 증언
  - (3) 결정적 모순에 사용된 전후 발언
  - (4) S3+ 중 `key_statement` 표시 발언
- **일반 S3+ 응답은 자동 저장 X** (너무 넓음 — `key_statement` 메타가 없으면 저장 X)
- **저장 X**: 일반 응답 / fallback / system message / 컷씬 텍스트
- **수동 저장**: 사용자 한 번 클릭으로 추가
- `key_statement` 메타 표시 영역: ScriptedText / atom 데이터에 사전 표시 (Codex-Dev 영역) — 출시 전 spouse-01·family-01·friend-01 핵심 발언만 표시 (P1-D 영역)

### 6.3 채팅창 시스템 메시지 최대 길이
- 단일 줄 ≤ 30자
- 두 줄 ≤ 60자 (예외 영역)
- 세 줄 이상 X (관찰/수첩으로)

### 6.4 동일 이벤트 우선순위 (= 화면 주목도 / 출력 순서)
- 1순위: VFX (위계 따라)
- 2순위: 채팅창 시스템 메시지 (짧게)
- 3순위: 관찰 (변화 해석)
- 4순위: 수첩 (자동 승격 시만)
- 발언노트는 **평행 트랙** (이벤트 범주 X / 발화 단위)
- **중요**: 위 우선순위는 **화면 주목도 / 출력 순서** 기준. **수첩 / 발언노트 같은 영구 저장 트랙은 VFX가 떴다고 누락되면 안 됨.** 저장 트랙은 별도 보존 — 화면 표시 영역과 저장 영역은 분리 운영.

### 6.5 VFX target selector 기준
- 기존 `data-*` attribute (`data-evidence-id` / `data-dispute-id` / etc.)
- 신규: `data-notebook-card-id` (P1-D 영역)
- selector 매칭 실패 → 중앙 영역 micro pulse fallback / 콘솔 warn 0

### 6.6 자유심문 분석 결과 노출 깊이
- 첫 성공: major cutscene + 관찰 3~4줄 + 수첩 (새 쟁점일 때만)
- 반복 성공: micro + 관찰 1줄 + 수첩 (새 쟁점일 때만)
- **unmapped**: VFX X / 관찰 X / 수첩 X / **발언노트 X**. 단 **채팅창에는 안전 fallback 응답이 나갈 수 있음** (P0-B 안전장치 영역 — 게임 정지 X / 캐릭터 archetype 정합 회피 응답)

### 6.7 fallback 발언노트 저장 여부
- **저장 X** (CT 1차 제안)
- 사유: 발언노트 = NPC 발화 추적 영역 / fallback = 시스템 회피, 정합 X
- 반복 fallback은 별도 `분석 실패 log` (출시 후 영역)

---

## 7. 출시 전 최소 영역 (P1-D 제한)

사용자 명시: "저장 기준 정의 + 핵심 자백/결정적 모순/핵심 증거만 저장".

### 7.1 P1-D 출시 전 영역
- 수첩 카테고리 3종: **자백 / 결정적 모순 / 핵심 증거**
- 수첩 자동 저장 트리거 3종 (§6.1 정합):
  - S5 자백
  - 결정적 모순 — **플레이어가 추궁·확정한 후만**
  - 핵심 evidence 조합 — **새 쟁점 unlock 또는 판결 근거급 조합만**
- 발언노트 자동 저장 4 트리거 (§6.2 정합):
  - 자백 / 증인 핵심 증언 / 결정적 모순 사용 전후 / S3+ 중 `key_statement` 표시
- `key_statement` 메타 사전 표시: 출시 전 활성 3 사건 (spouse-01 / family-01 / friend-01)의 핵심 발언만 (Codex-Dev 영역)
- 판결 직전 요약: 수첩 3 카테고리 본문 그대로 표시 (별도 가공 X)

### 7.2 P2 영역 (출시 후)
- 수첩 카테고리 추가: 새 쟁점 / 증인 증언 / 판결 근거
- 검색 / 정렬 / 필터
- 발언노트 메타 검색
- fallback `분석 실패 log` 별도 영역
- 수첩 → 판결문 인용 자동 연동

---

## 8. 운영 / 절대 회피선

### 8.1 컷씬 / VFX
- 같은 액션에 컷씬 / 모달 / 번개 / 토스트 동시 발생 X (위계 우선순위 따라 낮은 영역 skip)
- 한 phase에 cut-in 5회 이상 발생 시 콘솔 warn (cooldown 검증)
- 한 사건에 major 4회 이상 발생 X (hard cap)

### 8.2 채널 분리
- 채팅창에 긴 설명 X / 관찰에 영구 보존 X / 수첩에 일반 성공 X / 발언노트에 system message X / VFX에 장문 X / 배지에 서사 X

### 8.3 truth leak (`docs/disclosure-policy.md` 영역과 정합)
- 어떤 표면도 NPC 자백 전 진실 lexeme 직접 X
- VFX 텍스트는 surface-only 어휘만
- 자유심문 분석 결과 관찰 노출도 surface-only

### 8.4 코드 영역
- 기존 큐 시스템 (`eventFeedback` / `observation` / `resonance`) 본체 변경 X — 분기 정합만
- 새 큐 X
- `useActionDispatch.ts` / `judgeQuestionEngine.ts` / `scriptedTextLoader.ts` 대형 리팩터 X
- ScriptedText / caseData 직접 수정 X
- baseline anchor 회귀 X

### 8.5 UI 영역
- **`src/app/pc.css`는 별도 UI 서브 스레드 영역** — CT/사용자 명시 없이 format / stash / discard / add X
- 같은 파일을 건드리는 UI/VFX 세션은 병렬 X / 순차 또는 같은 소유 세션
- 작업 시작 전 `git status --short --branch` 확인
- pc.css dirty 영역 발견 시 기존 UI 작업과 충돌 가능성 확인

---

## 9. 검증 / 향후 확장

### 9.1 정책 sync
- Markdown(이 문서) ↔ 코드 분기 정합
- Tier 1 단계 = sync 경고만 / Tier 2+ = quality gate

### 9.2 검증 대상
- 채널별 길이 제한 (시스템 메시지 ≤ 30자/60자)
- 컷씬 cooldown (5턴)
- major cutscene hard cap (사건당 3회)
- target selector 매칭 (콘솔 warn 0)
- truth leak 0 (`docs/disclosure-policy.md` 정합)

### 9.3 향후 확장 (P2)
- `tmp/qa-vfx-results/` 영역에 빈도 / cooldown / 겹침 통계
- 사용자 spot check 결과 누적 → 위계 조정
- 수첩 자동 저장 카테고리 확장 (새 쟁점 / 증인 / 판결 근거)
- 판결문 자동 인용 (수첩 → 판결문)

---

## 10. 메타

**버전 관리**:
- v1 (1차 안 — 사용자 confirm 대기)
- **v1.1 (현재 — 사용자 confirm 후 보정 반영, 2026-04-27)**
  - §6.1 결정적 모순 = 플레이어 추궁·확정 후 / 핵심 evidence = 새 쟁점·판결 근거급만
  - §6.2 NPC S3+ 전부 X / 4 트리거(자백 / 증인 핵심 / 결정적 모순 전후 / `key_statement`)
  - §6.4 우선순위 = 화면 주목도 / 영구 저장 트랙 별도 보존 명시
  - §6.6 unmapped = 채팅창 안전 fallback 응답 명시
  - §2.3 / §2.4 / §3 매트릭스 / §5.1 / §7.1 정합 update
  - §3 매트릭스에 증인 핵심 증언 행 추가
- v2 (예정 — 의뢰서 2개 작성 후 / 코드 정합 후)

**관련 자료**:
- `CLAUDE.md` — 게임 핵심 원칙
- `docs/disclosure-policy.md` — 진실 누설 정책 (짝)
- `memory/design_vfx_inventory_pc.md` — 기존 VFX/Cutscene 9 + 6 + queue 인벤토리
- `memory/reference_resonance_selectors.md` — data-* selector 일람
- `memory/design_emotion_donut.md` — 감정 도넛 (관찰 영역 정합)

**상태**: v1.1 작성 완료 (사용자 confirm 후 보정 반영). 다음 = 의뢰서 2개 (P0-E Hierarchy + P0-F AIReasoningCutscene) + Release QA 의뢰서 VFX QA 섹션 추가.

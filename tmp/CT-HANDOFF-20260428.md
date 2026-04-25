# CT 이관 — 04-28 (사용자용 상세 가이드)

> **이 문서**: 새 스레드 시작 시 사용자가 직접 검토용
> **메모리 버전**: `memory/session_handoff_20260428_v3_correction.md` (다음 CT 자동 인지)
> **HEAD**: 새 commit 추가 예정 (격리 commit 574d563 + CT 이관)

---

## 🎯 현재 상태

### Git
- 격리 commit: `574d563 chore(legacy): 84건 Legacy 데이터/코드/테스트 _LEGACY/ 폴더로 영구 격리`
- 다른 ClaudeCode 스레드 commit (T&M):
  - `721713d feat(pc-ui): Case Browser 토글 스위치`
  - `d3ce2ff fix(pc-layout): Home 패널 padding`
  - `f166ddb fix(pc-layout): Home 카드 radius`
  - `ceed614 fix(pc-layout): Session 카드 폰트`
- 빌드 + tsc + dev 모두 통과
- 사용자 시각 검증 정상 플레이 확인

### 활성 3건 확정 (메모리 + 데이터 + manifest 일치)
- **spouse-01** "매일 아내 몰래 오피스텔에 머물다 오는 남편"
  - 박지연(36, victim_cosplay) / 이준호(38, avoidant)
- **family-01** "치매 어머니의 유서"
  - 윤태성(48, confrontational) / 윤정후(44, affect_flattening)
- **friend-01** "손절한 절친"
  - 송다은(31, premature_summary) / 최수민(31, affect_flattening)

### Legacy 81건 격리 완료
`_LEGACY_84CASES_DO_NOT_REFERENCE/` 폴더에 11 영역 격리.
- .gitignore 추가 + CLAUDE.md 최상단 경고 + 메모리 갱신
- 메인이 향후 Glob/Grep 결과에 _LEGACY 나오면 즉시 무시

---

## 🚨 메인이 잘못한 것 (다음 메인 반복 방지)

### 1. Agent 보고 무비판 수용
- Agent: "v2-atoms 부재"
- 실제: `src/data/claimPolicies/spouse-01-v2-atoms.json` (295KB) 존재
- Agent는 docs/ref만 봤고 src/data 미확인
- **다음 CT**: Agent 결과는 반드시 메인이 데이터 직접 read 검증

### 2. 임의 이름/정보 작성
- 박재영, 윤시우 — 메인이 임의 작성 (데이터에 없음). 정정 완료
- 박미라 "오피스텔 관련" — 실제는 A의 친구, 투자방 링크 전달자 (h-d3). 정정 완료
- **다음 CT**: 모든 캐릭터/이름/날짜/금액은 `src/data` 직접 read 후 사용. 추측 절대 X

### 3. 다른 사건 정보 혼입
- spouse 작업 중 family-01 인물 (윤태성/윤정후) 비교로 끌어옴
- **다음 CT**: 사건별 격리 작업. spouse-01 작업 시 spouse-01 자료만

### 4. 신규 작성 vs 보완 혼동 (가장 큰 잘못)
- 사용자 detail 메시지 = 보완 가이드
- 메인은 "신규 67 채널 작성", "269 scene 만들기", "22배 확장" 방향으로 잘못 해석
- 결과: synopsis-A.yaml 폐기 또는 보완 형식 재작성 필요
- **다음 CT**: 사용자 detail 메시지는 항상 보완 방향

### 5. ScriptedText 실제 구조 늦게 파악
- 처음에 Agent의 "144 keys" 보고를 entries로 잘못 이해
- 실제: variantsPerKey 곱하면 총 1,051 entries
- 이미 GPT Pro v4 산출물 (2026-04-12 generated)

---

## 🎯 v3 작업 진짜 의도 = 보완 (사용자 5가지 부족 영역)

### 1. 캐릭터 메시지 alt 부족
**증상**: 반복 액션 시 엉뚱한 메시지
**보완**: variantsPerKey 5 → 8~10 확장

### 2. 증거 조사 단계 (investigationStages 0/1/2) 미반영
**증상**: 같은 증거 stage별 정보 차이 없음
**보완**: stage × evidence × party 신규 entries

### 3. 쟁점/감정 단계/신뢰 상태 메시지 차이 X
**증상**: lieState만 반영, emotion phase / rapport / contradict_token 미반영
**보완**: 기존 entries에 상태 tags 보강 + 상태별 변형

### 4. 재판관 메시지 누락 또는 부적절
**증상**: ScriptedText는 NPC 응답 위주, judge_question 별 채널 X
**보완**: judge_question 신규 채널 + 누락 식별

### 5. 모순/이벤트 발동 시 기계식 메시지 또는 누락
**증상**: system_message + LLM 폴백 → 기계식
**보완**: judge_contradiction (Path B) / judge_evidence_combo 등 사전 작성

---

## 📋 다음 작업 절차 (권장)

### Phase 1: 보완 영역 매핑 (1 사이클)
1. ScriptedText 정밀 분석 (`scripted-text-current.json` 직접 read)
2. 5가지 부족 영역별 정확 보완 분량 계산
3. 기존 entries 중 보정 대상 식별 (보정 톤 8원칙 적용)
4. 신규 entries 작성 분량 (각 영역별)

### Phase 2: 보완 명세 작성 (entries 단위, 1 사이클)
- scene 단위 X, **entries 단위**
- 기존 entries 보정 명세 + 신규 entries 추가 명세
- synopsis-A.yaml 폐기 또는 이 형식으로 재작성

### Phase 3: GPT Pro 의뢰 패키지 (보완 분량만, 1 사이클)
- 의뢰 분량 = 보완분만
- 세션 수: 9 세션 X → 사건당 2~3 세션 정도

### Phase 4: 사용자 GPT Pro 실행 + ClaudeCode 검수 + 적용

---

## 🔥 최우선 강조 (다음 메인)

### A. 톤 보정 8원칙
`_master/02-tone-guide.md` 참조. 모든 보완 작업의 일관 기준.

### B. 상황/맥락 이해 절대 우선
**핵심 통찰**: "쟁점-캐릭터-질문-답변 매핑이 명확해야 한다."

모든 변형 풀 = **9차원 맥락 정확 매핑 후 작성**:
- 쟁점 × 캐릭터 × lieState × emotion × rapport × contradict_token × q_type × tone × 시점

데이터 직접 read 필수. 한 entry라도 맥락 어긋나면 게임 동작 깨짐.

### C. 활성 3건만
spouse-01 / family-01 / friend-01. _LEGACY 절대 참조 X.

---

## 📂 v3 작업 자료 평가

### 위치
`gpt-pro-runs/judge-messages-v3/_master/`

### ✅ 보존 (정확)
- 가이드 8개 (00-overview ~ 07-lint-rules)
- assets-spouse-01/character-info.md (정정 완료)
- assets-spouse-01/phase1-2-dialogue.md
- assets-spouse-01/case-structure-v2.json (cp)
- assets-spouse-01/atoms-current.json (cp 295KB)
- assets-spouse-01/scripted-text-current.json (cp 2MB)
- assets-spouse-01/game-events-v2.json (cp)

### ❌ 폐기 또는 정정 필요
- `assets-spouse-01/synopsis-spouse-01-A.yaml` — 신규 작성 방향. **폐기 또는 entries 단위 보완 명세로 재작성**
- `assets-spouse-01/reference-current-entries.md` — Agent 잘못 매트릭스. 정확:
  - interrogation: 720 entries (144 keys × 5 variants)
  - evidence_present: 210 (42 × 5)
  - dossier: 72 (24 × 3)
  - witness: 27 (9 × 3)
  - aftermath: 10 (5 × 2)
  - system_message: 12 (6 × 2)
  - **총: 1,051 entries**

---

## 🎬 새 스레드 첫 메시지 (사용자 복사용)

(아래 박스 내용 그대로 새 스레드에 복사)

```
이전 CT 이관 받아줘. 다음 파일 정독:

1. memory/MEMORY.md (인덱스)
2. memory/session_handoff_20260428_v3_correction.md (CT 이관 최신, v3 작업 방향 정정)
3. tmp/CT-HANDOFF-20260428.md (사용자용 상세 가이드)
4. CLAUDE.md 최상단 _LEGACY 경고
5. memory/project_active_cases.md (활성 3건 + Legacy 격리)
6. memory/story_v2_confirmed_3cases.md (3건 스토리)

현재 상태:
- HEAD: 격리 commit (574d563) + CT 이관 commit
- 워킹 트리 clean
- 빌드 + tsc + dev 모두 통과
- 활성 3건 = spouse-01 / family-01 / friend-01

핵심 작업: spouse-01 ScriptedText (1,051 entries) 보완
- v3 작업 = "신규 작성 X, 기존 ScriptedText 보완"
- 5가지 부족 영역 (직전 CT 이관 문서 참조):
  1. 캐릭터 메시지 alt 부족
  2. 증거 조사 단계 미반영
  3. 쟁점/감정/신뢰 상태 메시지 차이
  4. 재판관 메시지 누락
  5. 모순/이벤트 발동 시 기계식

핵심 강조 (메인 필독):
- 톤 보정 8원칙: gpt-pro-runs/judge-messages-v3/_master/02-tone-guide.md
- 상황/맥락 이해 절대 우선 (9차원 맥락 정확 매핑)
- 활성 3건만 (_LEGACY 절대 참조 X)
- 데이터 직접 read 후 사용 (Agent 보고 / 추측 / 임의 작성 금지)

이전 메인 잘못 패턴 (반복 방지):
1. Agent 보고 무비판 수용 X
2. 임의 이름/정보 작성 X
3. 다른 사건 정보 혼입 X
4. 신규 작성 vs 보완 혼동 X
5. 사용자 detail 메시지 = 항상 보완 방향

자료 위치:
- v3 작업 자료: gpt-pro-runs/judge-messages-v3/_master/
- 활성 데이터: src/data/cases/generated/, src/data/claimPolicies/, src/data/scriptedText/

진행 가능한 작업:
1순위. spouse-01 ScriptedText 정밀 분석 + 5가지 부족 영역 매핑
2순위. 보완 명세 (entries 단위) 작성
3순위. GPT Pro 의뢰 패키지 (보완 분량만)

정독 완료 후 어떤 작업부터 시작할지 물어봐줘.
```

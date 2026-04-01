# Solomon 대대적 리뉴얼 계획서

작성: Claude Code (2026-04-01)
용도: GPT Pro에게 전달하여 데이터 생성 요청 + 추가 설계 의견 수렴

---

## 0. 확정 결정사항

- **Phase 3/4/5 통합**: A안 확정 — Phase 3(통합 심문 12~16턴) + Phase 4(조정/판결)
- **파일럿 사건**: spouse-01 (1순위) + family-01 (2순위, AI 표현성·호칭·어법 검증에 최적)
- **기존 84개 사건**: 폐기 아님. 새 데이터 레이어 덧씌움
- **데이터 정제 시점**: 엔진 구조 전환(Phase A) 완료 후 진행. 단, 정제 필요 항목은 지속 추적
- **역할 분담**: Claude Code = 엔진 구현 + 검증 / GPT Pro = 설계 의견 + 대량 데이터 생성

---

## 1. 리뉴얼 배경 요약

### 원래 GPT 진단 보고서 핵심 (별첨 solomon_advisor_report.md 참조)
1. **S0~S1에서 진실을 안 줘서** NPC가 "모르는 사람"처럼 말함 → 전략적 거짓말 불가
2. **Phase 1~2(사전 스크립트)와 Phase 3~5(런타임 LLM)의 톤 단절** — 브리지 없음
3. **증거가 "텍스트 제시"에 그침** — 방어선 붕괴 감각 없음
4. **verbalTell이 설명문** — 엔진이 강제하지 않아 mini 모델이 유지 못함
5. **턴이 길고 Phase 3/4/5 분리가 과함** — 10~20분 세션에 비해 복잡

### Claude Code 코드 검증 결과
- `truthPolicy.ts`: S0~S1에서 allowed=[], forbidden=전체 → 진실 미제공 확인
- `llmDialogueResolver.ts:298`: allowedIds 비어있으면 사실 아예 안 줌
- `lieStateMachine.ts:138-151`: initialState는 케이스 로드 시 설정, Phase 3 재설정 없음
- `constants.ts`: MAX_TURNS=20, MIN_TURNS_BEFORE_ADVANCE=10 (Phase별)
- Phase 1→3 브리지: **존재하지 않음**

---

## 2. 리뉴얼 방향 — "프롬프트 확장"이 아닌 "역할 분리"

### 핵심 원칙
```
AS-IS: LLM이 의미 결정 + 연기 + 상태 판단을 동시에 수행
TO-BE: 룰 엔진이 의미를 결정 → LLM은 연기만 수행
```

### 구체적으로 바뀌는 것

| 영역 | AS-IS | TO-BE |
|------|-------|-------|
| 거짓말 연기 | LLM이 S0~S5를 해석하여 자유 발화 | 엔진이 ResponseBlueprint 생성 → LLM은 1~2문장 연기 |
| 진실 정보 | S0~S1에서 진실 미제공 | 모든 상태에서 privateKnowledge 제공 (알되 숨기기) |
| 증거 반응 | LLM이 증거 텍스트를 읽고 자유 반응 | 증거별 attackVectors → 방어 옵션 축소 → 강제 |
| 말버릇 | 설명문을 프롬프트에 포함 | 실행 규칙 + post-process 검증/강제 |
| Phase 전환 | P1→P2→P3→P4→P5 (브리지 없음) | P1→P2→P3(통합심문, 브리지 적용)→P4(판결) |
| 판결 조건 | 턴 수 기반 (MIN 10, MAX 20) | 성과 조건 기반 (균열+조사+확정) |

---

## 3. 기존 84개 사건 처리 방침

**폐기하지 않음.** 기존 사건 데이터(캐릭터/쟁점/증거/truthTable/lieConfig)는 유지.
위에 새로운 데이터 레이어 5개를 덧씌움:

1. **ClaimPolicy** — truthPolicy 대체 (allowed/forbidden → publicClaim/privateKnowledge/suppressions)
2. **RuntimeStartBridge** — Phase 1 스크립트 분석 → Phase 3 시작 상태
3. **EvidenceChallenge** — 증거별 attackVectors/resolvedBy/whenAllResolved
4. **ExecutableVerbalTell** — 설명문 → 검증 가능한 실행 규칙
5. **BeatScript** — 핵심 대사 사전 생성 (파일럿 2사건만 우선)

### 데이터 정제 추적 (Phase A 이후 진행 예정)
> 기존 84개 사건의 텍스트 품질 문제(표현/구성 아쉬운 부분)는 엔진 전환 후 별도 정제 단계에서 꼼꼼히 처리.
> 파일럿 2사건(spouse-01, family-01)부터 정제 기준 확립 → 나머지 사건 확대 적용.
> 정제 필요 항목은 발견 시점부터 지속 기록하여 누락 방지.

---

## 4. 실행 계획 (3단계)

### Phase A: 엔진 구조 전환 (Claude Code 주도) — 1주차

| 작업 | 담당 | 상세 |
|------|------|------|
| A1. ResponseBlueprint 생성 엔진 | Claude Code | lieState + ClaimPolicy + 감정 상태 → blueprint 자동 생성 |
| A2. ClaimPolicy 로더 + 통합 | Claude Code | 기존 truthPolicy.ts 대체, 새 구조 로드 |
| A3. Phase 1→3 브리지 시스템 | Claude Code | agentSlice에서 Phase 3 진입 시 bridge 적용 |
| A4. Phase 3/4/5 통합 | Claude Code | 단일 심문 Phase (12~16턴) + 성과 조건 판결 |
| A5. 프롬프트 파이프라인 개편 | Claude Code | llmDialogueResolver를 blueprint 기반으로 전환 |

### Phase B: 데이터 레이어 생성 (GPT 주도 + Claude Code 검증) — 2주차

| 작업 | 담당 | 상세 |
|------|------|------|
| B1. spouse-01 ClaimPolicy + Bridge + EvidenceChallenge | GPT (Session 1) | 아래 세부 참조 |
| B2. spouse-01 ExecutableVerbalTell + BeatScript | GPT (Session 2) | 아래 세부 참조 |
| B3. family-01 ClaimPolicy + Bridge + EvidenceChallenge | GPT (Session 3) | 아래 세부 참조 |
| B4. family-01 ExecutableVerbalTell + BeatScript | GPT (Session 4) | 아래 세부 참조 |
| B5. Claude Code 검증 + 통합 | Claude Code | 스키마 검증, 엔진 연동, 테스트 |

### Phase C: 증거 메커닉 고도화 + UI + 정제 (Claude Code 주도) — 3주차

| 작업 | 담당 | 상세 |
|------|------|------|
| C1. 증거 방어선 붕괴 엔진 | Claude Code | EvidenceChallenge + defenseMode 연동 |
| C2. verbalTell 검증 엔진 | Claude Code | post-process 검증 + 재생성/주입 로직 |
| C3. Dispute Board UI | Claude Code | 쟁점 카드, 증거 영향 표시, 상태 변화 |
| C4. 증거 결과 UI | Claude Code | 버팀/균열/붕괴 3단계 시각 피드백 |
| C5. 파일럿 2사건 데이터 정제 | Claude Code | 텍스트 품질 + 새 레이어 정합성 검증 |
| C6. 파일럿 테스트 + 튜닝 | 공동 | A/B 비교, 지표 측정 |

---

## 5. 스키마 정의 (별첨)

→ `renewal-schemas.ts` 참조

6개 타입 정의:
1. `ResponseBlueprint` — 런타임 생성 (엔진). stance/defenseMode/allowedClaims 등
2. `ClaimPolicy` / `CaseClaimPolicies` — GPT 생성. publicClaim/privateKnowledge/suppressions
3. `RuntimeStartBridge` / `CaseBridge` — GPT 생성. Phase 3 시작 상태
4. `EvidenceChallenge` — GPT 생성. attackVectors/resolvedBy/whenAllResolved
5. `ExecutableVerbalTell` — GPT 생성. 검증 가능한 말버릇 규칙
6. `BeatScript` — GPT 생성 (파일럿만). 핵심 대사 사전 생성

---

## 6. GPT에게 요청할 작업 (Session별)

### 사전 준비: Claude Code가 GPT에게 제공할 자료
- renewal-schemas.ts (스키마 전체)
- 이 계획서 (renewal-plan.md)
- 대상 사건의 원본 JSON (캐릭터/쟁점/증거/truthTable/lieConfig)
- 대상 사건의 Phase 1 스크립트
- 대상 사건의 기존 truthPolicy 데이터

### Session 1: spouse-01 — ClaimPolicy + Bridge + EvidenceChallenge
**입력:** spouse-01.json 전체 + Phase 1 스크립트 + truthPolicy(spouse-01 부분)
**출력:**
- `ClaimPolicy`: 2명(한지석/오세린) × 5쟁점 × 6상태 = 60개 항목
  - 각 항목에 publicClaim(한국어 자연문 2~3개), privateKnowledge(1~3개), suppressions(1~3개), emotionalLeakRisk, tellPool
- `RuntimeStartBridge`: 2명 × 5쟁점 = 10개 항목
  - Phase 1 스크립트에서 이미 인정/언급된 사실 분석 → phase3StartState 결정
- `EvidenceChallenge`: 증거 수만큼 (~8개)
  - 기존 investigationResults와 proves를 분석하여 attackVectors 매핑

### Session 2: spouse-01 — ExecutableVerbalTell + BeatScript
**입력:** spouse-01.json의 캐릭터 프로필(archetype/speechStyle/verbalTells)
**출력:**
- `ExecutableVerbalTell`: 2명 × 3~4 tell = 6~8개
  - 기존 pattern(설명문) → lexicalHooks/sentenceShape/cadence 변환
- `BeatScript`: 핵심 dispute 3개 × 6 beat × 2명 = ~36개
  - 각 beat는 캐릭터 목소리 반영, 1~3문장, behaviorHint 포함

### Session 3: family-01 — ClaimPolicy + Bridge + EvidenceChallenge
**입력:** family-01.json 전체 + Phase 1 스크립트 + truthPolicy(family-01 부분)
**출력:** Session 1과 동일 구조 (family-01용)
**특별 주의:** 가족 관계 특유의 호칭 체계(부모-자녀 높임/낮춤)와 감정 표현이 ClaimPolicy.publicClaim과 BeatScript에 정확히 반영되어야 함

### Session 4: family-01 — ExecutableVerbalTell + BeatScript
**입력:** family-01.json의 캐릭터 프로필
**출력:** Session 2와 동일 구조 (family-01용)
**특별 주의:** tell의 lexicalHooks가 한국어 가족 관계 어법에 맞는지 검증 필요

### Session 5+: 나머지 사건 확대 (파일럿 검증 후)

---

## 7. GPT에게 추가 설계 의견을 구할 사항

아래 5가지에 대해 GPT의 고도화된 설계 의견을 요청합니다.
Claude Code는 GPT 의견을 참고하여 최종 구현합니다.

### 7-1. 성과 조건 설계
판결 가능 조건을 턴 수 → 성과 기반으로 바꾸려 합니다.
- 현재 구상: 핵심 쟁점 균열 2+ / 증거 조사 성공 2+ / 쟁점 확정 2+
- **질문**: 이 수치가 12~16턴 내에 자연스럽게 달성 가능한가? 더 나은 조건 설계가 있는가?

### 7-2. Blueprint 생성 매트릭스
ResponseBlueprint의 stance/defenseMode를 엔진이 자동 결정해야 합니다.
- 입력: lieState + 감정 상태 + 증거 봉쇄 상태 + 질문 유형
- 출력: stance + defenseMode
- **질문**: 이 매트릭스(입력→출력 매핑 규칙)를 설계해달라. Claude Code가 코드로 구현할 수 있도록 구체적 규칙으로.

### 7-3. Beat 스크립트 작성 가이드
한 사건의 같은 캐릭터가 6종 beat(deny/hedge/partial/blame/confession/evidence_hit)에서 일관된 목소리를 유지해야 합니다.
- **질문**: beat 작성 시 캐릭터 일관성을 보장할 가이드라인을 설계해달라.

### 7-4. Dispute Board UX
플레이어가 한눈에 봐야 할 정보를 정리해야 합니다.
- **질문**: Dispute Board에 표시할 정보 항목과 우선순위, 시각적 상태 표현 방식에 대한 의견.

### 7-5. Discovery 시스템과의 통합
기존 Discovery 4종(진실 공방/증거 감별/숨겨진 쟁점/감정 전략)은 유지합니다.
새로운 EvidenceChallenge 시스템이 기존 Discovery와 어떻게 연동되어야 자연스러운가?
- **질문**: EvidenceChallenge의 방어선 붕괴 이벤트가 Discovery의 어떤 트리거로 연결되면 좋은가?

---

## 8. Claude Code 단독 결정 사항 (GPT 의견 불필요)

- TypeScript 타입 시스템 구현 방식
- Zustand store 구조 변경
- llmDialogueResolver.ts 리팩터링 방법
- 기존 코드와의 하위 호환성 처리
- 빌드/배포 파이프라인
- post-process 검증 로직 구현

---

## 9. 리스크 & 완화

| 리스크 | 영향 | 완화 |
|--------|------|------|
| ClaimPolicy 항목의 논리 일관성 | 높음 | Claude Code가 자동 검증 스크립트로 교차 체크 |
| Beat 스크립트 캐릭터 불일치 | 중간 | Phase 1 스크립트와 톤 비교 검증 |
| Phase 통합 후 게임 길이 너무 짧아짐 | 중간 | 성과 조건 임계치 조절로 대응 |
| 기존 Discovery 시스템과의 충돌 | 낮음 | Discovery 유지, EvidenceChallenge와 병렬 운영 |
| 기존 84개 사건 데이터 정제 누락 | 중간 | 정제 필요 항목 발견 즉시 기록, Phase C에서 집중 처리 |

---

## 10. 현재 기술 스택 참고 (GPT용)

- **프론트엔드**: React 19, TypeScript, Vite 8, Tailwind v4, Zustand 5
- **백엔드**: Express.js, better-sqlite3
- **LLM**: GPT-4o-mini (런타임), GPT Pro (사전 생성), Claude Code (개발/큐레이션)
- **상태 관리**: 8개 Zustand slice (phase, dialogue, evidence, discovery, agent, resource, shop, verdict)
- **핵심 엔진**: 20개 모듈 (llmDialogueResolver, lieStateMachine, discoveryEngine, evidenceEngine 등)

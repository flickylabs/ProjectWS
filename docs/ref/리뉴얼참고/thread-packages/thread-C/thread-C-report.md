# 스레드 C 완료 보고 — V3 스크립트 구조 재설계

> 보고일: 2026-04-04
> 담당: Claude Code (설계/검증) + GPT Pro (대사 생성)

---

## 1. 미션 요약

LLM 호출 없이 게임을 완전히 진행할 수 있는 V3 스크립트 시스템 설계.
spouse-01 파일럿 데이터를 완성하고, 83건 확장용 템플릿을 준비한다.

---

## 2. 완료된 작업

### 2-1. 타입 확장 (이미 코드에 반영됨)

| 파일 | 추가 타입 | 용도 |
|------|----------|------|
| `src/types/renewal.ts` | `TruthLevel` | 대사 내 진실 노출 수준 (none/hint/partial/full) |
| `src/types/renewal.ts` | `BeatScriptV3` | 질문유형별 분기 + 반복 방지 + Truth Throttle 검증 |
| `src/types/renewal.ts` | `DossierChallengeQuestion.scriptedResponse` | 카드 질문에 대한 NPC 스크립트 응답 |
| `src/types/case.ts` | `investigationStages[].scriptedNpcResponses` | 증거 조사 질문에 대한 party별 NPC 응답 |
| `src/types/character.ts` | `ThirdParty.scriptedTestimonies` | 증인 depth별 증언 (vague/partial/full) |

### 2-2. spouse-01 파일럿 데이터 (6세션 생성 → 검증 → 패치 완료)

| 데이터 종류 | 수량 | 상태 |
|---|---|---|
| BeatScriptV3 (partyA d1-d2) | 14개 | PASS |
| BeatScriptV3 (partyA d3-d5) | 14개 | PASS |
| BeatScriptV3 (partyB d1-d2) | 10개 | PASS |
| BeatScriptV3 (partyB d3-d5) | 17개 | PASS |
| DossierCard scriptedResponse | 18개 (3카드 × 6질문) | PASS |
| 증인 scriptedTestimonies | 12개 (4명 × 3depth) | PASS |
| InvestigationStage 응답 | 세션 1~4에 포함 | PASS |
| **총** | **~85개 스크립트 항목** | **전수 검증 통과** |

### 2-3. 검증 결과

- 초기 GPT 산출물에서 **CRITICAL 8건** 검출 (전부 동일 패턴: S2+partial)
- applicableStates에서 S2 제거로 일괄 패치
- 패치 후 재검증: **6세션 전부 PASS, 위반 0건**

### 2-4. 산출물 파일 위치

```
docs/ref/리뉴얼참고/thread-packages/thread-C/
├── stage1-design-matrix.md          ← 필요 데이터 매트릭스 + 볼륨 산정
├── stage3-verification-spec.md      ← truthLevel 검증 규칙 5개 (자동화 가능)
├── v3-schema-extension-proposal.md  ← 타입 확장 이력
├── v3-batch-prompt-template.md      ← 83건 확장용 GPT 세션 분리 프롬프트
├── spouse-01-v3-pilot.json          ← 초기 파일럿 (참고용)
│
└── gpt-sessions/
    ├── session-1-partyA-d1d2/output/     ← partyA-d1d2.json (패치 완료)
    ├── session-2-partyA-d3d4d5/output/   ← spouse-01-partyA-d3d4d5-v3.json
    ├── session-3-partyB-d1d2/output/     ← spouse-01-session-partyB-d1d2.json (패치 완료)
    ├── session-4-partyB-d3d4d5/output/   ← spouse-01-partyB-d3d4d5-v3.json (패치 완료)
    ├── session-5-dossier/output/         ← spouse-01-dossier-scripted-responses.json
    └── session-6-witness/output/         ← spouse-01-witness-scriptedTestimonies.json
```

---

## 3. 핵심 설계 결정 (컨트롤 타워 확인 필요)

### 결정 1: Truth Throttle ↔ applicableStates 엄밀 매핑

```
applicableStates 최저 S0/S1 → truthLevel "none"만 허용
applicableStates 최저 S2    → truthLevel "hint"까지
applicableStates 최저 S3    → truthLevel "partial"까지
applicableStates 최저 S4/S5 → truthLevel "full"까지
```

이 규칙은 GPT 산출물 검증에서 실제로 작동 확인됨 (8건 위반 검출 → 패치).

**확인 요청**: 이 규칙을 83건 확장 시에도 동일하게 적용할 것인지?

### 결정 2: partial beat의 applicableStates 범위

원래 `["S2","S3"]`으로 생성되었으나, 위 규칙에 따라 `["S3"]`으로 축소.
이렇게 되면 **S2에서는 partial beat가 선택되지 않고, hedge(hint)까지만 사용됨**.

**확인 요청**: S2에서 partial을 사용하고 싶다면, 별도의 S2 전용 partial beat(truthLevel "hint")를 추가해야 함. 필요한지?

### 결정 3: DossierCard scriptedResponse의 truthLevel 기준

| requiredLieState | truthLevel |
|---|---|
| 없음 (q1) | hint |
| S2 (q2) | partial |
| S3 (q3) | partial 또는 full |

카드 질문은 "정답"이므로 NPC가 상당히 인정하는 톤으로 작성됨.

### 결정 4: 증인 기관 증인 예외

tp-3(최민정, 재가돌봄센터 상담팀장)은 기관 증인이므로 partial depth에서도 자기 업무 범위의 사실("간병 예약", "상담") 공개를 허용. 단, 대상자 실명(오미숙)은 full에서만.

---

## 4. 스키마 변경 요청 사항

현재까지 **스키마 추가 변경 없음**. 기존 확장 타입만으로 모든 데이터가 표현 가능.

단, 엔진 쪽에서 V3 데이터를 실제 사용하려면 다음 작업이 필요:

| 작업 | 담당 제안 | 설명 |
|------|----------|------|
| `v3GameLoopLoader.ts`에 BeatScriptV3 로더 추가 | 스레드 D 또는 별도 | questionType/alternatives 순환 로직 |
| `getFallbackBeat` 확장 | 스레드 D 또는 별도 | truthLevel 검증 + alternatives 순환 |
| DossierCard scriptedResponse 연결 | 스레드 D 또는 별도 | `resolveDossierQuestion`에서 scriptedResponse 반환 |
| 증인 엔진 scriptedTestimonies 연결 | 스레드 D 또는 별도 | witnessEngine에서 depth별 조회 |

---

## 5. 83건 확장 준비 상태

### GPT Pro 세션 분리 프롬프트 완성됨

사건 1건당 6세션:
```
partyA-d1d2 / partyA-d3d4d5 / partyB-d1d2 / partyB-d3d4d5 / dossier / witness
```

각 세션에 첨부할 파일:
1. `{caseId}-case.json` — 사건 데이터
2. `{caseId}-tells-beats.json` — tell 정의
3. `{caseId}-v2-atoms.json` — atom 데이터
4. `spouse-01-v3-pilot-reference.json` — 포맷 레퍼런스 (고정)
5. `stage3-verification-spec.md` — 검증 규칙 (고정)

### 검증 자동화 가능

stage3-verification-spec.md의 규칙 5개는 스크립트로 자동화 가능:
- Rule 1: applicableStates ↔ truthLevel 매칭
- Rule 2: truthLevel별 금지어 검출 (사건별 금지어 목록 필요)
- Rule 3: 구조 필드 체크
- Rule 4: 커버리지 체크
- Rule 5: investigation stage 진행도

---

## 6. 다음 단계 제안

| 순서 | 작업 | 선행 조건 |
|------|------|----------|
| 1 | 컨트롤 타워: 설계 결정 3건 확인 | 이 보고서 |
| 2 | 83건 확장 배치 시작 (GPT Pro) | 설계 확인 완료 |
| 3 | 엔진 연결 (로더 + fallback 확장) | spouse-01 데이터 확정 |
| 4 | LLM 없이 spouse-01 20턴 시뮬레이션 | 엔진 연결 완료 |

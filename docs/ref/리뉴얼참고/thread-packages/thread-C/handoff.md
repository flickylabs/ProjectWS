Thread-C




---

# Thread-C 이관 문서

> V3 스크립트 구조 재설계 담당
> 최종 갱신: 2026-04-05

---

## 현재 상태: Thread E 테스트 대기

spouse-01 파일럿 완성 + 컨트롤 타워 설계 결정 5건 반영 완료.
엔진 연결과 83건 배치는 Thread E 테스트 통과 후 진행.

---

## 완료된 작업

### 1. 타입 확장 (코드 반영 완료)

| 파일 | 타입 | 라인 |
|------|------|------|
| `src/types/renewal.ts` | `TruthLevel` = 'none' \| 'hint' \| 'partial' \| 'full' | :180 |
| `src/types/renewal.ts` | `BeatScriptV3` (questionType, afterInvestigationStage, alternatives, truthLevel) | :198 |
| `src/types/renewal.ts` | `DossierChallengeQuestion.scriptedResponse` | :266 |
| `src/types/case.ts` | `investigationStages[].scriptedNpcResponses` | :63 |
| `src/types/character.ts` | `ThirdParty.scriptedTestimonies` | :94 |

### 2. spouse-01 파일럿 데이터 (6세션, 전수 검증 PASS)

| 세션 | 파일 | 내용 | 수량 |
|------|------|------|------|
| 1 | `gpt-sessions/session-1-partyA-d1d2/output/partyA-d1d2.json` | 한지석 d-1,d-2 beat + investigation | 14 beats |
| 2 | `gpt-sessions/session-2-partyA-d3d4d5/output/spouse-01-partyA-d3d4d5-v3.json` | 한지석 d-3,d-4,d-5 beat + investigation | 14 beats |
| 3 | `gpt-sessions/session-3-partyB-d1d2/output/spouse-01-session-partyB-d1d2.json` | 오세린 d-1,d-2 beat + investigation | 10 beats |
| 4 | `gpt-sessions/session-4-partyB-d3d4d5/output/spouse-01-partyB-d3d4d5-v3.json` | 오세린 d-3,d-4,d-5 beat + investigation | 17 beats |
| 5 | `gpt-sessions/session-5-dossier/output/spouse-01-dossier-scripted-responses.json` | DossierCard 질문별 NPC 응답 | 18개 |
| 6 | `gpt-sessions/session-6-witness/output/spouse-01-witness-scriptedTestimonies.json` | 증인 4명 x 3 depth | 12개 |

### 3. 패치 이력

| 패치 | 대상 | 건수 | 내용 |
|------|------|------|------|
| S2+partial | session-1, 3, 4 | 8건 | applicableStates에서 S2 제거 → ["S3"] |
| 금액 숨김 | 6세션 전체 | 11건 | 컨트롤 타워에서 모호 표현으로 교체 완료 |

---

## 확정된 설계 결정 (5건)

1. **Truth Throttle 매핑** — S0/S1→none, S2→hint, S3→partial, S4/S5→full. 83건 동일.
2. **S2 partial 불가** — 현행 유지. hedge+alternatives로 커버. Thread E에서 다양성 재확인.
3. **DossierCard q3 = full 고정** — q1=hint, q2=partial, q3=full.
4. **기관 증인 partial 예외** — institutional 증인은 partial에서 자기 업무 사실 공개 허용. 대상자 실명은 full에서만.
5. **V3 금액 숨김** — none/hint에서 구체적 금액([\d,]+원, \d+만원) 금지. over_precision tell은 시각/절차 정밀로 대체. partial 이상에서 허용.

---

## 핵심 규칙 요약

### applicableStates ↔ truthLevel
```
applicableStates에 S0 또는 S1 포함 → truthLevel 반드시 "none"
applicableStates 최저가 S2          → truthLevel 최대 "hint"
applicableStates 최저가 S3          → truthLevel 최대 "partial"
applicableStates 최저가 S4/S5       → truthLevel 최대 "full"
```

### truthLevel별 금지 요소 (spouse-01 기준)
```
none: 기관명, 인물직함, 서비스명, 대상자 실명, 구체적 금액
hint: 위와 동일. "가족 일"/"개인 사정" 수준까지만
partial: 기관 정식명칭, 대상자 실명 금지. 행위 인정 가능. 금액 허용.
full: 모두 허용
```

---

## 남은 작업 (Thread E 통과 후)

| 순서 | 작업 | 선행 조건 |
|------|------|----------|
| 1 | 엔진 연결: v3GameLoopLoader에 BeatScriptV3 로더 추가 | E 통과 |
| 2 | 엔진 연결: getFallbackBeat 확장 (questionType/alternatives/truthLevel) | E 통과 |
| 3 | 엔진 연결: resolveDossierQuestion에서 scriptedResponse 반환 | E 통과 |
| 4 | 엔진 연결: witnessEngine에서 scriptedTestimonies depth별 조회 | E 통과 |
| 5 | 83건 V3 GPT 배치 시작 (프롬프트+검증 규칙 준비 완료) | 엔진 연결 완료 |

---

## 산출물 파일 전체 목록

```
docs/ref/리뉴얼참고/thread-packages/thread-C/
├── mission.md                         ← 미션 정의 (읽기 필수)
├── handoff.md                         ← 이 문서
├── thread-C-report.md                 ← 완료 보고서
├── message-to-control-tower.md        ← 컨트롤 타워에 보낸 메시지
├── message-from-control-tower.md      ← 컨트롤 타워 회신 (결정 5건)
├── stage1-design-matrix.md            ← 필요 데이터 매트릭스 + 볼륨 산정
├── stage3-verification-spec.md        ← 검증 규칙 5개 + 금액 규칙 (v2)
├── v3-schema-extension-proposal.md    ← 타입 확장 이력
├── v3-batch-prompt-template.md        ← 83건 확장 GPT 프롬프트 (v2: 결정 5건 반영)
├── spouse-01-v3-pilot.json            ← 초기 파일럿 (참고용)
│
└── gpt-sessions/
    ├── session-1-partyA-d1d2/         ← prompt.md + 첨부파일 + output/ (패치 완료)
    ├── session-2-partyA-d3d4d5/       ← prompt.md + 첨부파일 + output/
    ├── session-3-partyB-d1d2/         ← prompt.md + 첨부파일 + output/ (패치 완료)
    ├── session-3-partyB-d1d2-redo/    ← 재요청 준비 (미사용)
    ├── session-4-partyB-d3d4d5/       ← prompt.md + 첨부파일 + output/ (패치 완료)
    ├── session-5-dossier/             ← prompt.md + 첨부파일 + output/
    ├── session-6-witness/             ← prompt.md + 첨부파일 + output/
    └── fix-s2-partial/                ← 패치 원본 백업 (참고용)
```

---

## 참고해야 할 메모리 파일

| 파일 | 핵심 내용 |
|------|----------|
| `memory/design_decisions_round2.md` | 설계 결정 5건 + 새 아이디어 3건 |
| `memory/thread_directory.md` | 5개 스레드 역할/상태/식별 |
| `memory/renewal_progress_20260402.md` | V3 게임 루프 재설계 진행 상황 |
| `memory/v2_hybrid_decision.md` | V2=structure+LLM, V3=점진 스크립트 전환 |

---

## 새 세션에서 이어받는 방법

1. 이 파일(`handoff.md`)을 읽는다
2. 현재 상태는 "Thread E 테스트 대기"
3. Thread E 통과 알림이 오면 → "남은 작업" 표의 순서대로 진행
4. 83건 배치 시 → `v3-batch-prompt-template.md`의 세션 프롬프트 사용
5. 검증 시 → `stage3-verification-spec.md`의 규칙 적용

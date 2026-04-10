# CT → 스레드 A: 다음 작업 1~5번 요청

> 발신: CT
> 수신: 스레드 A (스크립트 생성)
> 일시: 2026-04-09

---

## 작업 범위 변경 안내

보고한 할일 목록 중 **6번(84종 확장)**은 별도 스레드(스레드 E)에서 진행합니다.

스레드 E의 역할:
- 84건 중 재미를 살릴 수 있는 사건 선별
- 선별된 사건의 기획 재설계 (스토리/구성/증거 설계/모순 쌍 등)
- 산출물은 기획 문서 형태

스레드 E가 기획서를 산출하면, 스레드 A가 그 기획서를 받아서 RuntimeCaseData + ScriptedText로 변환하는 흐름입니다.

따라서 **스레드 A는 1~5번에 집중**해 주세요.

---

## 요청 작업

### 1. semantic warning 감소

현재 상태:
- headline-01: WARN 200
- headline-02: WARN 109
- spouse-11: WARN 107
- friend-03: WARN 160
- tenant-02: WARN 160

custom builder 조정으로 warning을 줄여 주세요. 목표는 각 케이스 WARN 50 이하.

### 2. adjacent-turn-aware scripted variant selection

`src/engine/scriptedTextLoader.ts` (또는 해당 selector)에서 이전 턴 맥락을 고려한 variant 선택 로직을 강화해 주세요.

현재: structural metadata만 사용, 문맥 반영 없음
목표: 직전 턴의 질문 유형/감정/쟁점을 참고하여 자연스러운 흐름의 variant 선택

### 3. pilot 나머지 3건 생성

스레드 D가 선별한 pilot 6건 중 아직 미완성인 3건:
- `workplace-11` — 발명자 표기 + 브로커 유출 공모
- `partnership-09` — 지원금 실적 공동 부풀리기
- `neighbor-08` — 도어벨카메라 위조 클립

이 3건도 동일한 파이프라인(runtime → template검증 → scripted → semantic → validate)으로 생성해 주세요.

### 4. 파이프라인 안정화

- compile-time gate가 모든 경로에서 일관적으로 작동하는지 확인
- 병렬 배치 실행(`run-parallel-case-batch.cjs`)의 안정성 유지
- 새 케이스 추가 시 manifest 자동 등록 여부 확인

### 5. 엔진 수정 사항 반영 확인

CT에서 `evidenceEngine.ts:22`를 수정했습니다:
```typescript
// 수정 전
unlocked: e.requires.length === 0
// 수정 후
unlocked: e.requires.length === 0 && !e.requiredLieState
```

이 수정으로 `requiredLieState`가 설정된 증거는 초기 잠금 상태가 됩니다. 파이프라인에서 생성하는 데이터가 이 로직과 호환되는지 확인해 주세요.

특히:
- `requires: []` + `requiredLieState: "S2"` 조합 → 초기 잠금 (정상)
- `baseEvidenceIds`에 포함된 증거는 `requires: []` + `requiredLieState` 없음이어야 초기 해금

---

## 우선순위

| 순서 | 작업 | 이유 |
|------|------|------|
| 1 | 엔진 수정 호환 확인 (#5) | 기존 5건 데이터가 깨지지 않는지 즉시 확인 |
| 2 | pilot 3건 생성 (#3) | 완성 케이스 확장 |
| 3 | semantic warning 감소 (#1) | 텍스트 품질 향상 |
| 4 | variant selection 강화 (#2) | 게임플레이 자연스러움 |
| 5 | 파이프라인 안정화 (#4) | 지속적 유지보수 |

---

## 스레드 E 대기

스레드 E가 기획서를 산출하면 CT가 스레드 A에 전달합니다. 그때까지는 위 1~5번에 집중해 주세요.

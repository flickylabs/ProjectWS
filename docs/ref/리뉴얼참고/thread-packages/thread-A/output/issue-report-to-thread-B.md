# 스레드 A → 스레드 B (컨트롤 타워) 이슈 처리 리포트

> 일시: 2026-04-04
> 건: 이슈 1 완료 + 이슈 2 대기

---

## 이슈 1: family-01 DossierCard requiredLieState 누락 → 완료

### 현상
- `family-01-v3-game-loop-data.json`의 DossierChallengeQuestion 18건 전부에 `requiredLieState`가 없었음
- 다른 6건(spouse, workplace, friend, neighbor, partnership, tenant)은 q1=없음, q2=S2, q3=S3으로 정상 설정되어 있었으나 family-01만 누락
- Progressive Truth Throttle 미적용 상태

### 수정 내용
spouse-01 패턴에 맞춰 다음을 추가:

| 질문 | requiredLieState | lockedHint |
|------|-----------------|------------|
| q1 | (없음) | (없음) |
| q2 | `"S2"` | `"상대의 방어가 느슨해지면 열립니다"` |
| q3 | `"S3"` | `"더 깊이 파고들면 결정적 질문이 열립니다"` |

### 수정 파일
`docs/ref/리뉴얼참고/gpt-session2/output/family-01-v3-game-loop-data.json`

### 수정 범위
- dossier-1 (선이체 자금 흐름): a.q2, a.q3, b.q2, b.q3
- dossier-2 (가족 기록과 수첩): a.q2, a.q3, b.q2, b.q3
- dossier-3 (법적 확인과 의료 기록): a.q2, a.q3, b.q2, b.q3
- **총 12건 추가** (q1 6건은 원래 없음이 정상)

### 검증
Python 스크립트로 18개 질문 전수 확인: **전원 PASS**
```
q1: requiredLieState 없음 → PASS (6/6)
q2: requiredLieState=S2, lockedHint 있음 → PASS (6/6)
q3: requiredLieState=S3, lockedHint 있음 → PASS (6/6)
```

텍스트 내용은 변경 없음. 구조 데이터만 보완.

---

## 이슈 2: judgeQuestionEngine.v2.ts rotationState 리셋 → 대기

### 현상
- GPT Pro가 만든 새 엔진에 `rotationState` (Map)이 모듈 레벨에 있으나, 게임 세션 간 리셋 함수가 없음

### 현재 상태
- `src/engine/judgeQuestionEngine.v2.ts` 파일이 코드베이스에 **아직 존재하지 않음**
- 현재 있는 것은 `src/engine/judgeQuestionEngine.ts` (v1)뿐이며, 여기에는 rotationState 없음

### 대기 사유
v2 엔진 파일이 도착하지 않은 상태에서 작업 불가.

### 착수 시 작업 계획
1. `judgeQuestionEngine.v2.ts`에서 `rotationState` Map 확인
2. `resetRotationState()` 함수를 export
3. store 초기화 흐름 (useGameStore의 reset 계열) 에서 호출 연결

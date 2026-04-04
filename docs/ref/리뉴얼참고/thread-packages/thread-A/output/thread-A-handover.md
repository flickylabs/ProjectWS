# Thread-A 이관 문서

> 이관일: 2026-04-05
> 역할: 스레드 A — 증거 시스템 데이터 완성

---

## 1. 역할 정의

"솔로몬의 재판" 게임의 **증거 investigationStages 작성 담당**.
- 6건(family-01, friend-01, neighbor-01, partnership-01, tenant-01, workplace-01)의 investigationStages 작성
- GPT Pro 산출물 검증
- 컨트롤 타워(스레드 B)와 교차 이슈 처리

---

## 2. 완료된 작업

### 작업 1: investigationStages 6건 작성 + 검증 (완료)
- 6건 × 6증거 × 3단계 = **108개 질문** 직접 작성
- 작성 에이전트(3개 병렬) → 유저 교정 → 검증 에이전트 → 19건 수정 → 재검증 → **전원 PASS**
- 컨트롤 타워에서 7건 통합 + 빌드 통과 확인 완료

**산출물 위치:** `docs/ref/리뉴얼참고/thread-packages/thread-A/output/`
```
family-01-stages.json
friend-01-stages.json
neighbor-01-stages.json
partnership-01-stages.json
tenant-01-stages.json
workplace-01-stages.json
HANDOFF.md
```

### 작업 2: family-01 requiredLieState 누락 수정 (완료)
- `family-01-v3-game-loop-data.json`의 DossierChallengeQuestion 18건에 requiredLieState 누락
- q2 6건에 S2 + lockedHint, q3 6건에 S3 + lockedHint 추가
- 18개 질문 전수 검증 PASS

**수정 파일:** `docs/ref/리뉴얼참고/gpt-session2/output/family-01-v3-game-loop-data.json`

### 작업 3: judgeQuestionEngine rotationState 리셋 연결 (완료)
- `src/engine/judgeQuestionEngine.ts`가 V2로 교체됨 (스레드 B에서)
- `resetQuestionRotation()` 호출을 `src/store/useGameStore.ts`의 `initializeCase` 내 리셋 블록에 추가
- tsc --noEmit 빌드 통과

**수정 파일:** `src/store/useGameStore.ts` (L111 import, L532 호출)

---

## 3. 현재 상태: 대기

컨트롤 타워 메시지 (`thread-packages/thread-A/message-from-control-tower.md`):
- 108개 질문 전수 검증 PASS, 7건 통합 정상, 빌드 통과
- Thread B의 v2-atoms S0-S2 neutral 교정 → Thread A 산출물에 영향 없음
- **77건 investigationStages 확장은 Thread E 테스트 통과 + 템플릿 확정 후 시작**
- 착수 시점이 정해지면 별도 메시지로 안내 예정

---

## 4. 핵심 지식

### investigationStages 구조
```json
{
  "stage": 0, "revealKey": "request_original",
  "question": { "text": "25~60자 합니다체", "attackVector": "context" }
}
```
- stage 0 → `request_original`: 존재 확인만, 진실 노출 제로
- stage 1 → `check_metadata`: 시각/단말/주체 등 메타 속성 추궁
- stage 2 → `restore_context` 또는 `check_edits`: 숨겨진 맥락, 답 자체는 미공개

### requiredLieState 패턴 (DossierCard)
- q1: 없음 (처음부터 해금)
- q2: `"S2"` + `"lockedHint": "상대의 방어가 느슨해지면 열립니다"`
- q3: `"S3"` + `"lockedHint": "더 깊이 파고들면 결정적 질문이 열립니다"`

### 검증 체크리스트
1. stage 0 진실 미노출 (불완전성/잘림도 노출 금지)
2. stage 1이 check_metadata 근거
3. stage 2가 핵심 근접 + 답 미공개
4. 합니다체 25~60자
5. revealKey가 investigationResults에 실존
6. attackVector가 context/identity/authenticity/legality 중 하나

### 참고 파일
- 미션 문서: `docs/ref/리뉴얼참고/thread-packages/thread-A/mission.md`
- 완성 예시: `src/data/cases/generated/spouse-01.json` (investigationStages 필드)
- 컨트롤 타워 메시지: `docs/ref/리뉴얼참고/thread-packages/thread-A/message-from-control-tower.md`
- 이슈 리포트: `docs/ref/리뉴얼참고/thread-packages/thread-A/output/issue-report-to-thread-B.md`

---

## 5. 다음 작업 예상

77건 확장 시 동일한 프로세스를 반복:
1. 사건 JSON에서 evidence + investigationResults 추출
2. spouse-01 패턴으로 investigationStages 작성 (에이전트 병렬)
3. 별도 검증 에이전트로 전수 검증
4. 컨트롤 타워에 산출물 제출

# A스레드 → C스레드 전달 메시지 — V2 배치 템플릿 v2.2 업데이트

**날짜**: 2026-04-02
**발신**: ClaudeCode-A (V2 스크립트 전환)
**수신**: ClaudeCode-C (배치 통합)

---

## 요약

V2 스크립트 전환 시스템의 설계 및 구현이 모두 완료되었습니다.
**V2 추가 배치 템플릿이 v2.2로 업데이트**되었으며, C스레드에서 V1 배치 완료 후 V2 배치를 시작할 때 이 템플릿을 사용해야 합니다.

**핵심 변경 3가지:**
1. Interjection beat: 사건당 4개 → **12개** (infoLevel 4종 커버)
2. Dispute에 `disputeAliases` 필드 추가 (4~8개 키워드, 필수)
3. Beats 총량: 40~60개 → **50~74개**

---

## 공유 파일 리스트

### 반드시 읽어야 할 파일 (2개)

| # | 파일 | 용도 |
|---|------|------|
| 1 | `docs/ref/리뉴얼참고/thread-sync-V2-requirements.md` | **C스레드 공유 문서 (v2.2)** — 전면 업데이트됨. V2 배치 시 참조해야 할 모든 규칙 포함 |
| 2 | `docs/ref/리뉴얼참고/gpt-batch/00-V2-추가배치-템플릿.md` | **V2 배치 템플릿 (v2.2)** — GPT-C에 전달할 실제 요청서 템플릿 |

### 변경 배경 참조용 (선택)

| # | 파일 | 용도 |
|---|------|------|
| 3 | `docs/ref/리뉴얼참고/thread-A-request-6/output/template-replacement-snippets.md` | 템플릿 교체 스니펫 (어디가 바뀌었는지 diff 확인용) |
| 4 | `docs/ref/리뉴얼참고/thread-A-request-6/output/free-question-keyword-strategy-v2-design.ts` | disputeAliases 결정 배경 |
| 5 | `docs/ref/리뉴얼참고/thread-A-request-5/output/spouse-01-interjection-beats-v2.json` | interjection 12개 실제 예시 (spouse-01) |
| 6 | `docs/ref/리뉴얼참고/thread-A-request-5/output/family-01-interjection-beats-v2.json` | interjection 12개 실제 예시 (family-01) |

### 이미 적용된 코드 파일 (참조 불필요, 정보용)

| 파일 | 변경 내용 |
|------|----------|
| `src/types/disputeV2.ts` | `disputeAliases?: string[]` 필드 추가 |
| `src/types/beatScriptV2.ts` | `BeatActionFamily`에 `'interjection'` 추가 |
| `src/engine/misconceptionEngine.ts` | trigger 9종 + belief mode 기반 전면 교체 |
| `src/engine/freeQuestionV2.ts` | 신규 — deterministic-first 분류기 |
| `src/engine/phase6ResultPromptV2.ts` | 신규 — Phase 6/Result 프롬프트 빌더 |
| `src/data/claimPolicies/spouse-01-beats-v2-full.json` | 66개 → 74개 (interjection 12개 merge) |
| `src/data/claimPolicies/family-01-beats-v2-full.json` | 60개 → 68개 (interjection 12개 merge) |

---

## 변경사항 상세

### 1. Interjection beat — 사건당 12개

기존 템플릿: `allow 2개 + block 2개 (최소)` = 4개
**신규 템플릿: 12개 기본 (최소 10, 최대 14)**

필수 분포:

| infoLevel | 개수 | allow/block | 조건 |
|-----------|------|-------------|------|
| `emotional_only` | 4개 | allow 2 + block 2 | 항상 |
| `detail_rebuttal` | 4개 | allow 2 + block 2 | 항상 |
| `misbelief_escalation` | 2~4개 | allow + block | red_herring/shared_misconception 있을 때만 |
| `trap_signal` | 0~2개 | allow (+ block 선택) | red_herring 있을 때만 |

**Interjection 전용 규칙** (일반 beat와 다름):

```
ID 패턴:     {{CASE}}:beat_v2:{{PARTY}}:{{DISPUTE}}:surface:mid:interjection:{{CHOICE}}:{{INDEX}}
antiRepeat:  interjection.{{CHOICE}}.{{PARTY}}
coverageKey: {{PARTY}}:{{DISPUTE}}:surface:mid:interjection:{{INFOLEVEL}}:{{CHOICE}}
actionFamily: "interjection"  (일반 beat는 "question")
```

**red_herring/shared_misconception beat 추가 필드:**
- `beliefMode`: `knows` / `suspects` / `misbelief` / `weaponizes`
- `conditions.misconceptionStates`: 예) `["M1", "M2"]`
- `conditions.trapStates`: 예) `["suspected", "active"]`

**tags 규칙:**
- 기본: `["interjection", "allow"|"block", "event_lane", INFOLEVEL_TAG]`
- red_herring 관련이면 `"red_herring"` 추가

### 2. disputeAliases — dispute마다 4~8개 키워드

DisputeV2 타입에 `disputeAliases` 필드가 추가되었습니다.
V2 배치 시 **모든 dispute에 필수 작성**합니다.

```json
{
  "id": "d-1",
  "name": "비밀 송금",
  "disputeKind": "core_truth",
  "disputeAliases": ["280만원", "비밀 송금", "예약금", "간병비", "최민정", "돌봄센터"],
  "depthLayers": [...],
  ...
}
```

**구성 규칙:**
- formal noun 1개 (정식 쟁점명/기관명)
- colloquial phrase 1~2개 (구어 표현)
- concrete token 1~3개 (이름/금액/장소/증거 약칭)
- red_herring이면 오해 유발 단서 1~2개 포함
- 너무 일반적인 단어 금지 ("문제", "그 일", "저거")

**참고:** 파일럿 사건(spouse-01, family-01)은 이 필드 없이 생성되었고, 코드에서 fallback alias를 사용합니다. **새로 생성하는 V2 데이터부터 이 필드를 포함해야 합니다.**

### 3. 체크리스트 변경

기존:
```
- [ ] beats 총 40~60개 + fatigue 3종/dispute + interjection allow2+block2
```

변경:
```
- [ ] beats 총 50~74개 + fatigue 3종/dispute + interjection 12개(infoLevel 4종)
- [ ] 각 dispute에 disputeAliases 4~8개
```

### 4. intentTag / INTENT_LEXICON

- `intentTag`는 기존 범용 INTENT_LEXICON을 그대로 재사용
- per-hook `triggerKeywords`는 V2 추가 배치 기본 템플릿에서 작성하지 않음
- 사건별 키워드 차이는 `disputeAliases`가 담당

---

## C스레드 작업 순서

1. **V1 배치 계속 진행** (현재 25/84 완료) — 변경 없음
2. **V1 완료된 사건부터 V2 추가 배치 시작**
   - `00-V2-추가배치-템플릿.md` (v2.2) 사용
   - V1 산출물(v2-atoms + v3-game-loop-data + 사건원본)을 GPT-C에 첨부
   - 산출물: `structure-v2.json` + `beats-v2-full.json` (사건당 2개)
3. **V2 산출물 검증 체크리스트**
   - [ ] 모든 dispute에 `disputeAliases` 4~8개 있음
   - [ ] interjection beat 12개 (infoLevel 4종 분포 확인)
   - [ ] interjection의 `actionFamily`가 `"interjection"`임 (`"question"` 아님)
   - [ ] red_herring interjection에 `beliefMode`, `misconceptionStates`, `trapStates` 있음
   - [ ] beats 총 50~74개
   - [ ] ID 구분자 콜론(`:`) 통일
   - [ ] interjection ID가 전용 패턴 사용 (`...interjection:allow:01`)

---

## 질문이 있을 때

- V2 엔진 동작 관련: `docs/ref/리뉴얼참고/thread-sync-V2-requirements.md` 참조
- V2 전체 스펙: `docs/diagnosis/11-v2-script-transition-spec.md` 참조
- interjection 실제 예시: `thread-A-request-5/output/` 내 JSON 참조
- disputeAliases 설계 배경: `thread-A-request-6/output/free-question-keyword-strategy-v2-design.ts` 참조

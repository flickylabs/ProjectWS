# CT → Codex: Phase 2 Wave 1 구현 계획 리뷰 요청

> 발신: CT (Claude Code)
> 수신: Codex
> 일시: 2026-04-06
> 유형: 위임 3 — 독립 리뷰
> 참조:
> - `docs/ref/리뉴얼참고/phase2-detailed-design.md` (Codex 원본 설계)
> - `docs/ref/리뉴얼참고/codex-engine-audit-report.md` (Codex 엔진 감사)
> - `docs/ref/리뉴얼참고/master-plan-v3.md` (확정 플랜)

---

## 1. 요약

Phase 2 Wave 1 구현 계획을 수립했다. 코드 레벨까지 구체화한 상태이며, 구현 착수 전에 Codex 독립 리뷰를 요청한다.

**Wave 1 범위** (확정된 순서 그대로):
1. Hotfix H1: Dossier 자동 실행 축소
2. 아이디어 2: 돌파 순간 연출
3. 아이디어 3: 반복 심문 교착 피드백
4. 아이디어 1: 심문 3종 게임 효과 분리 + UI 피드백

**총 수정 파일**: 9개
**신규 파일**: 0개 (기존 엔진 확장만)
**데이터 변경**: 없음

---

## 2. 항목별 구현 계획 요약

### H1: Dossier 자동 실행 축소

| 파일 | 변경 |
|------|------|
| `useGameStore.ts` | `recommendedEvidenceIds: string[]` 상태 + set/clear 액션 |
| `ActionPanel.tsx:349-357` | `investigateEvidence()` 루프 제거 → `setRecommendedEvidence(card.evidenceIds)` |
| `EvidencePresenter.tsx` | 추천 증거에 amber "추천" 뱃지 + 테두리 강조 |

**현재 코드 (ActionPanel.tsx:349-357)**:
```typescript
for (const evId of card.evidenceIds) {
  const ev = s.evidenceDefinitions.find(e => e.id === evId)
  if (ev?.investigationStages) {
    for (const stage of ev.investigationStages) {
      s.investigateEvidence(evId, stage.revealKey)  // 전부 자동 완료
    }
  }
}
```

**변경 후**: `setRecommendedEvidence(card.evidenceIds)` 호출만. 실제 조사는 플레이어가 직접.

---

### 아이디어 2: 돌파 순간 연출

| 파일 | 변경 |
|------|------|
| `stateTransitionHelper.ts:33-35` | `getTransitionLabel`에서 S4='opening' 분리 |
| `stateTransitionHelper.ts` | `getPostTransitionRecommendation()` 함수 추가 |
| `StateTransitionFeedback.tsx` | 토스트에 행동 추천 2번째 줄 추가 |

**현재 `getTransitionLabel` 로직**:
```typescript
if (toRank === 5) return 'confessed'
if (toRank >= 3) return 'cornered'     // ← S4도 여기 걸림
if (toRank >= 1) return 'cracked'
```

**변경 후**:
```typescript
if (toRank === 5) return 'confessed'
if (toRank === 4) return 'opening'     // NEW: S4 전용
if (toRank >= 3) return 'cornered'
if (toRank >= 1) return 'cracked'
```

**행동 추천 매핑**:
| 전이 라벨 | 추천 액션 | 이유 |
|-----------|----------|------|
| cracked (균열) | motive_search | 균열이 생겼습니다. 동기를 탐색하세요. |
| cornered (궁지) | fact_pursuit | 궁지에 몰렸습니다. 사실을 추궁하세요. |
| opening (개방) | empathy_approach | 마음이 열리고 있습니다. 공감으로 접근하세요. |
| confessed (시인) | — | 해결됨 |

---

### 아이디어 3: 반복 심문 교착 피드백

| 파일 | 변경 |
|------|------|
| `questionFatigueEngine.ts` | resetReason에 `'dossier_execute'` 추가 + `getStalemateStatus()` 함수 |
| `useActionDispatch.ts` | Dossier 실행 후 fatigue reset 호출 |
| `QuestionSelector.tsx` | 쟁점 선택 2단계에서 교착 경고 표시 |

**교착 3단계**:
| streak | level | 플레이어 메시지 |
|--------|-------|----------------|
| 1 | normal | (없음) |
| 2 | warning | "답변이 짧아지고 있습니다" |
| 3+ | stalemate | "교착 — 다른 접근을 시도하세요" |

**Reset 조건** (기존 4개 + 1개 추가):
- new_evidence, layer_unlock, target_switch, interjection_allow
- **dossier_execute** (신규)

**angleTag 단순화 결정**:
QuestionSelector에서 full angleTag(beatSelectorV2 의존)를 계산하는 대신,
`questionType`을 키로 사용하여 fatigue state에서 해당 dispute의 최대 streak을 조회한다.

---

### 아이디어 1: 심문 3종 게임 효과 분리 + UI 피드백

| 파일 | 변경 |
|------|------|
| `questionEffectEngine.ts` | `computeEffectiveness()` 함수 추가 |
| `QuestionSelector.tsx` | 효과 칩 + 유효도 + 교착 경고 (아이디어 3 UI와 합침) |

**효과성 판정 규칙**:

```
fact_pursuit:
  strong: lieState S0~S2 (부정/회피 상태) → "부정 상태에 효과적"
  weak:   emotionTier explosive/shutdown → "감정적 상대에게 비효율적"
  normal: 그 외

motive_search:
  strong: lieState S2~S3 (부분 인정/전가) → "부분 인정 상태에 효과적"
  weak:   trustWindow < 20 → "신뢰 부족 — 역공 위험"
  normal: 그 외

empathy_approach:
  strong: lieState S3+ (방어 약화) → "방어가 무너진 상대에게 효과적"
  weak:   archetype === 'cold_logic' && contradictionTokens < 2 → "냉정한 상대 — 증거 없이 효과 낮음"
  normal: 그 외
```

**QuestionSelector store 구독 추가**:
- target의 lieState (agentSlice)
- target의 archetype
- target의 emotionalState
- questionMeters[target] (contradiction/leak/trust)

**2단계 표시**:
- 카드 1단계: target의 "가장 방어적인 dispute" lieState 기준 보수적 추정
- 쟁점 2단계: 각 dispute별 정확한 효과성

---

## 3. Codex에 구체적으로 묻는 것 (5개)

### Q1: 실행 순서

H1 → Idea 2 → Idea 3 → Idea 1 순서에 동의하는가?
Idea 1과 3의 QuestionSelector 변경을 마지막 커밋에서 합치는 것이 맞는가?

### Q2: computeEffectiveness 효과성 규칙 정합성

위 효과성 판정 규칙이 현재 `lieStateMachine.ts`의 전이 로직과 정합하는가?

구체적으로:
- `fact_pursuit`가 S0~S2에서 strong인 것이 맞는가? S2는 "부분 인정"인데 사실 추궁이 여전히 강한가?
- `empathy_approach`가 S3+에서 strong인데, S3은 "전가" 단계다. 전가 중인 상대에게 공감이 효과적인가?
- `cold_logic` archetype에 대한 empathy_approach weak 판정에서 `contradictionTokens < 2` 기준이 적절한가?

### Q3: angleTag 단순화

questionFatigueEngine의 local key는 `party:disputeId:angleTag`이다.
QuestionSelector에서 full angleTag를 계산하지 않고, `questionType`을 대리키로 사용하여
`party:disputeId:` prefix가 일치하는 키 중 최대 streak을 조회하는 방식을 쓰려 한다.

이 단순화가 실전에서 충분한가?
즉, 같은 questionType이라도 angleTag가 다르면 streak이 별도 추적되는 현재 구조에서,
questionType 수준의 집계가 실제 교착 체감과 어긋나는 경우가 있는가?

### Q4: 이중 패널티 위험

현재 `questionEffectEngine.ts`에 이미 `consecutiveSameType >= 3`일 때 `DIMINISHING_FACTOR(0.6)` 적용이 있고,
`questionFatigueEngine.ts`에도 streak 3일 때 multiplier 0.35가 있다.

여기에 "교착" UI 피드백까지 추가하면 3중 패널티가 되는가?
- 효과 엔진 diminishing (0.6)
- 피로 엔진 multiplier (0.35)
- 교착 UI 경고

`bypassLegacyDiminish` 옵션이 이미 `questionEffectEngine.ts`에 있는데,
이걸 fatigue V2 경로에서 항상 true로 넘기면 이중 적용이 해소되는 것 맞는가?

### Q5: 추가 리스크

위 계획에서 Codex 관점에서 보이는 추가 리스크가 있는가?
특히:
- 기존 플레이 경험을 깨뜨리는 부분
- 테스트/검증이 어려운 부분
- Phase 3(밸런스) 진입 시 충돌이 예상되는 부분

---

## 4. 추가 위임: LLM 테스트 결과 + 트랜스크립트 보충

현재 84×3 LLM 테스트가 진행 중이다. 테스트 완료 후 추가로 아래를 요청한다:

### 위임 A: 누락 트랜스크립트 보충 실행

현재 기존 트랜스크립트는 1회차 70건만 존재한다.
- **누락**: tenant 전체 12건, partnership 11-12
- 3회 반복 테스트 완료 후 이 누락분도 포함되었는지 확인

### 위임 B: LLM 테스트 결과 산출물

산출물 위치: `tests/84-llm-quality-report.md`
포맷: codex-task-84-llm-test-v2.md의 산출물 형식 참조

---

## 5. 회신 요청 형식

```
## Codex 회신

### Q1 (실행 순서): [동의 / 조정, 근거]
### Q2 (효과성 규칙): [정합 / 불일치, 구체적 지적]
### Q3 (angleTag 단순화): [충분 / 불충분, 이유]
### Q4 (이중 패널티): [해소됨 / 미해소, 권장 처리]
### Q5 (추가 리스크): [있음 / 없음, 내용]
### 위임 A/B: [확인]
### 추가 의견: [있으면]
```

---

## 6. 타임라인

- **현재**: Wave 1 구현 계획 수립 완료, Codex 리뷰 요청
- **Codex 리뷰 수신 후**: 리뷰 반영 → 구현 착수
- **Codex LLM 테스트 완료 후**: Phase 1 종료 판정 → Phase 2 공식 착수
- **병렬**: Codex 리뷰와 LLM 테스트 결과 분석을 동시에 진행

# GPT 재생성 필요 항목 (2026-04-03 기준)

> 직접 교정으로 해결하기 어렵거나, 품질 면에서 GPT 재생성이 더 나은 항목 정리.
> 긴급도 기준: **높음** = 게임플레이에 직접 영향 / **중간** = 품질 저하 / **낮음** = 있으면 좋지만 동작에 문제 없음

---

## 1. lexicalHook 반영률 불량 (중간)

Tell에 정의된 핵심 말투 키워드가 beatScript 대사에 전혀 또는 거의 녹아들지 않은 사건.
직접 삽입은 가능하나, 대사 전체의 자연스러운 흐름을 위해 GPT 재생성이 품질 면에서 유리.

### partnership (가장 심각 — 11건)

| 사건 | partyA 반영률 | partyB 반영률 | 비고 |
|------|--------------|--------------|------|
| partnership-01 | 11% | 0% | |
| partnership-02 | 22% | 11% | |
| partnership-03 | 11% | 11% | |
| partnership-04 | 0% | 0% | **최악** |
| partnership-05 | 22% | 22% | |
| partnership-06 | 11% | 0% | |
| partnership-07 | 10% | 0% | |
| partnership-08 | 33% | 22% | 경고 수준 |
| partnership-09 | 22% | 67% | B측만 양호 |
| partnership-10 | 20% | 0% | |
| partnership-11 | 0% | 0% | **최악** |

> partnership-12는 양쪽 33%로 경고 수준. 재생성 대신 직접 삽입으로 충분.

### neighbor (2건)

| 사건 | partyA | partyB | 비고 |
|------|--------|--------|------|
| neighbor-02 | 0% | 0% | **직접 교정 완료** (8beat에 hook 삽입) — 추가 재생성 불필요 |
| neighbor-04 | ~10% | 0% | **직접 교정 완료** (9beat에 hook 삽입) — 추가 재생성 불필요 |

> neighbor는 직접 교정으로 해결 완료.

### 판단
- **partnership-04, 11**: 양쪽 모두 0%이므로 GPT 재생성 강력 권장
- **partnership-01, 03, 06, 07, 10**: 한쪽이 0%이므로 재생성 권장
- **나머지**: 직접 삽입으로 보완 가능

### 재생성 시 지침
GPT에 다시 요청할 때 tells-beats만 재생성:
- 기존 v2-atoms, v3-game-loop-data는 유지
- "이미 생성된 Tell의 lexicalHooks를 beatScript line에 자연스럽게 반영해주세요" 지시 추가
- 기존 tells-beats.ts를 함께 첨부해서 "이 beat 구조는 유지하되, line에 Tell hook을 녹여주세요"

---

## 2. evidence_hit confession 복붙 (낮음 — 교정 완료)

**friend-06**: 6개 evidence_hit이 confession과 동일 문장 — **직접 교정 완료**. 재생성 불필요.

---

## 3. behaviorHint 템플릿 복붙 (낮음)

같은 사건 내에서 서로 다른 dispute의 transitionBeat behaviorHint가 완전히 동일.
line(대사)은 각각 다르므로 게임플레이에는 영향 없음. UI에 hint를 직접 표시하지 않는 한 무해.

| 사건 | 비고 |
|------|------|
| spouse-09 | a측 4세트×3dispute, b측 4세트×3dispute 완전 동일 |
| friend-05 | 양쪽 4쌍씩 |
| friend-06 | 양쪽 4쌍씩 |
| friend-08 | 양쪽 4쌍씩 |
| friend-09 | 양쪽 4쌍씩 |

> 재생성 불필요. behaviorHint는 LLM 연출 지시용이므로 dispute별 차별화가 있으면 좋지만 필수는 아님.

---

## 4. S2→S5 3단계 점프 (낮음)

엔진의 lieStateMachine이 S3→S5, S2→S4 건너뛰기를 지원하지만, S2→S5는 지원 여부 미확인.
해당 transitionBeat가 런타임에서 매칭 안 될 수 있음.

| 사건 | 위치 |
|------|------|
| spouse-02 | a:d-4:s2_s5, a:d-5:s2_s5 |
| friend-01 | a:d-5:s2_s5, b:d-5:s2_s5 |
| friend-04 | b:d-4:s2_s5 |
| friend-05 | b:d-5:s2_s5 |
| partnership-01 | a:d-5:s2_s5, b:d-2:s2_s5 |
| partnership-02 | a:d-4:s2_s5 |
| partnership-03 | a:d-4:s2_s5 |

> 엔진에서 S2→S5 전이가 발생하지 않으면 이 beat는 사용되지 않음 (기능에 해 없음, 다만 사실상 dead code).
> 수정하려면 S2→S3 + S3→S5로 분리해야 하나, GPT 재생성보다는 엔진 동작 확인이 우선.

---

## 요약: 재생성 우선순위

| 우선순위 | 대상 | 내용 | 방법 |
|----------|------|------|------|
| **1** | partnership-04, 11 | lexicalHook 양쪽 0% | tells-beats 재생성 |
| **2** | partnership-01, 03, 06, 07, 10 | lexicalHook 한쪽 0% | tells-beats 재생성 |
| **3** | partnership-02, 05, 08, 09 | lexicalHook 낮음 (경고~불량) | 직접 삽입 또는 재생성 선택 |
| **4** | friend-06, 09 | 대사 복붙 + 존대/반말 불규칙 | tells-beats 재생성 |
| — | 나머지 | 직접 교정으로 해결 완료 | 재생성 불필요 |

**partnership-12 + spouse/family/neighbor 전체는 재생성 불필요.**
**friend는 아래 6항 참조 (friend-06, 09 재생성 필요).**

---

## 5. workplace lexicalHook 반영률 불량 (중간)

### workplace (2건)

| 사건 | partyA 반영률 | partyB 반영률 | 비고 |
|------|--------------|--------------|------|
| workplace-01 | 미확인 | 미확인 | 재생성 요청 대기 (라운드 5) |
| workplace-02 | 미확인 | 미확인 | 재생성 요청 대기 (라운드 5) |

> 직장 관계 특수성(상사-부하 직함, 업무/KPI/보고 라인 맥락) 반영을 위해 재생성 진행.

---

## 6. friend 대사 템플릿 복붙 + 존대/반말 불규칙 (중간)

3개 dispute에 걸쳐 동일 문장이 반복되고, partyB의 존대/반말이 일관되지 않는 사건.

### friend (2건)

| 사건 | 문제 | 비고 |
|------|------|------|
| friend-06 | 3 dispute 대사 복붙 + 존대/반말 불규칙 | 재생성 요청 대기 (라운드 6) |
| friend-09 | 3 dispute 대사 복붙 + 존대/반말 불규칙 | 재생성 요청 대기 (라운드 6) |

> 친구 관계 특수성(친분, 신뢰, 감정적 유대) 반영 + dispute별 대사 개별화 + partyB 화체 통일을 위해 재생성 진행.

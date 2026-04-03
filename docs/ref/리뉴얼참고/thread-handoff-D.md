# V2 Structure 통합 상태 보고서

> 작성일: 2026-04-04
> 브랜치: `ui-phase3-overhaul`
> 이전 인수인계: thread-handoff-C2.md

---

## 1. 작업 요약

D스레드에서 V1 84건 위에 V2 Structure를 전면 통합하고, GPT 원본 데이터의 품질 결함을 전수 교정했다.

1. **V2 structure-v2 JSON 84건** → `src/data/claimPolicies/`에 배치
2. **등록 모듈 84건** (.ts) → `registerStructureV2()` 호출 추가
3. **Red Herring 51건 생성/교정** → 84/84 전사건 red_herring 완비
4. **beliefModeByParty `"weaponizes"` 28건** → 전량 교정
5. **GPT 원본 품질 결함 전수 교정** → stages 340개 + trapSignals 59개 재작성
6. **UI 액션 탭 번쩍임 효과** 추가

---

## 2. 전체 데이터 현황

### 2-1. 사건 구성

| 카테고리 | 사건 수 |
|----------|---------|
| spouse | 12 |
| family | 12 |
| friend | 12 |
| neighbor | 12 |
| partnership | 12 |
| tenant | 12 |
| workplace | 12 |
| **합계** | **84** |

### 2-2. Dispute Kind 분포 (420 disputes = 84사건 x 5)

| Kind | 수량 | 비율 | 역할 |
|------|------|------|------|
| core_truth | 162 | 38.6% | 핵심 진실 — 반드시 밝혀야 하는 쟁점 |
| sub_truth | 106 | 25.2% | 부차 진실 — 밝히면 깊이가 더해지는 쟁점 |
| red_herring | 85 | 20.2% | 함정 — 오해를 유발하는 가짜 쟁점 |
| shared_misconception | 67 | 16.0% | 공유 오해 — 양측 모두 잘못 믿는 쟁점 |

- **red_herring**: 84/84 사건 모두 1개 이상 보유
- **shared_misconception**: 84/84 사건 모두 1개 이상 보유
- **core_truth**: 84/84 사건 모두 1개 이상 보유

### 2-3. Misconception 블록 현황

| 항목 | 수량 |
|------|------|
| misconception 블록 보유 dispute | 152 (red_herring 85 + shared_misconception 67) |
| M0-M4 stage 총 수 | 760 |
| trapSignal 총 수 | 459 |
| beliefModeByParty 분포 | misbelief: 192, knows: 77, suspects: 35 |
| **weaponizes 잔여** | **0** |

### 2-4. Evidence / Hooks

| 항목 | 수량 |
|------|------|
| evidence 노드 | 504 (사건당 6개) |
| freeQuestionHooks | 554 |
| phase3LogHints 보유 | 84/84 |

### 2-5. 카테고리별 상세

| 카테고리 | disputes | evidence | fqh | core | sub | red_herring | shared_misc |
|----------|----------|----------|-----|------|-----|-------------|-------------|
| family | 60 | 72 | 80 | 22 | 17 | 12 | 9 |
| friend | 60 | 72 | 88 | 24 | 12 | 12 | 12 |
| neighbor | 60 | 72 | 76 | 24 | 15 | 12 | 9 |
| partnership | 60 | 72 | 84 | 23 | 13 | 12 | 12 |
| spouse | 60 | 72 | 78 | 28 | 10 | 13 | 9 |
| tenant | 60 | 72 | 72 | 21 | 18 | 12 | 9 |
| workplace | 60 | 72 | 76 | 20 | 21 | 12 | 7 |

---

## 3. 전수 검증 결과

84개 전사건, 152개 misconception 블록을 대상으로 다음 기준을 검증했다.

| 검증 항목 | 기준 | 결과 |
|-----------|------|------|
| red_herring 보유 | 사건당 1개 이상 | **84/84 PASS** |
| beliefModeByParty | knows/suspects/misbelief만 허용 | **0건 위반** |
| stage summary 길이 | 10자 이상 | **0건 미달** |
| stage "다만" 사용 | 0건 | **0건** |
| trapSignals 수 | dispute당 3개 이상 | **0건 미달** |
| trapSignals 길이 | 15자 이상 | **0건 미달** |
| 타이핑 오류 | 캐처/뻐다/겹쳄/븼앗 등 | **0건** |
| TypeScript 빌드 | tsc --noEmit | **에러 0** |

---

## 4. GPT 원본 품질 결함과 교정 내역

GPT가 생성한 structure-v2 원본 데이터에 두 종류의 체계적 품질 결함이 있었다. 84건 전수 검사 후 전량 교정했다.

### 4-1. Generic 템플릿 stages

**문제**: GPT가 misconception M0~M4 요약을 사건 맥락에 맞게 쓰지 않고 범용 템플릿만 붙여넣었다.

```
교정 전:  "외형상 의심" / "방어/당황" / "잘못된 해석 고착" / "혼란/확신 약화" / "오해 해소"
교정 후:  "하린이 잔액 캡처를 크롭해 올리고 파일명까지 바꾸며, 3,200만원 횡령 은폐 일부라는 해석이 붙은 단계"
```

교정 전 문구는 어떤 사건에든 동일한 내용이라 게임에서 의미가 없다. 엔진이 NPC 대사를 생성하려면 각 단계가 **어떤 증거가 오해를 만들고, 어떤 기록이 균열을 만드는지** 구체적으로 서술해야 한다.

| 교정 라운드 | 대상 | stages 재작성 | 비고 |
|-------------|------|--------------|------|
| 1차 (regen 41건 내) | 35 dispute | 175개 | shared_misconception 집중 |
| 2차 (원본 43건 내) | 37 dispute | 185개 | red_herring + shared_misconception |
| **합계** | **72 dispute** | **360개** | |

### 4-2. Fragmentary trapSignals

**문제**: 함정 신호가 설명 문장이 아니라 2~3단어 키워드로만 돼 있었다.

```
교정 전:  "매트 오염" (5자)
교정 후:  "매트 오염 사진만 보면 반려동물 허용 조건 위반으로 읽히게 한다" (35자)
```

| 교정 유형 | 건수 |
|-----------|------|
| 키워드 → 서술형 확장 | 59개 |
| 2개 → 3개 보충 | 17개 dispute |

### 4-3. `"weaponizes"` 무효값

**문제**: GPT가 `beliefModeByParty`에 스펙에 없는 `"weaponizes"` 값을 사용했다. 허용값은 `knows`/`suspects`/`misbelief`뿐이다.

| 교정 라운드 | 건수 |
|-------------|------|
| 1차 (regen 파일) | 10건 |
| 2차 (원본 파일) | 18건 |
| **합계** | **28건** |

교정 기준: v2-atoms 사건 맥락 참조. "weaponizes"는 대부분 "진실을 알면서 왜곡"에 해당하여 `"knows"`로 교정. 일부 `"suspects"` 또는 `"misbelief"`.

### 4-4. 누락 Red Herring 10건

C스레드 인수인계에서 "red_herring 부재 41건"으로 집계했으나, 실제로는 **51건**이 부재했다. 누락 10건을 직접 생성:

| 사건 | 전환 dispute | red_herring 테마 |
|------|-------------|-----------------|
| family-02 | d-3 | 며느리 태블릿 열람 (실제 유출 경로와 무관한 허위 단서) |
| family-04 | d-4 | 공동 폴더 파일명 변경 (정리 습관, 횡령과 무관) |
| family-09 | d-5 | 세금·명도비 핑계 (횡령의 커버 스토리) |
| family-10 | d-3 | 장보기 메뉴 확대 (일정 소통 실패의 부차적 가지) |
| spouse-02 | d-4 | 과거 합의 파기 (감정 배경, 독립 위법과 무관) |
| spouse-05 | d-5 | 공간 파국 (스마트락·녹취 위조를 덮는 표면 갈등) |
| spouse-07 | d-4 | 점수판 싸움 (공로 독점을 가리는 감정 폭발) |
| spouse-08 | d-4 | 비공식 합의 위반 (임대 기한을 흐리는 쟁점) |
| spouse-10 | d-5 | 모호 표현·이동시간 착각 (확인 미이행을 덮는 해석 싸움) |
| spouse-12 | d-5 | 2006년 행위 범위 (2026년 위조와 무관한 과거 논쟁) |

### 4-5. 타이핑 오류

| 오류 | 교정 | 건수 |
|------|------|------|
| 캐처 | 캡처 | 5 |
| 뻐다는 | 뺐다는 | 1 |
| 뻐았다 | 빼앗았다 | 1 |
| 겹쳄다는 | 겹쳤다는 | 1 |
| 븼앗긴 | 빼앗긴 | 1 |
| **합계** | | **10건** |

---

## 5. 코드 통합 상태

### 5-1. 등록 모듈

| 항목 | 상태 |
|------|------|
| 84개 `.ts` 등록 함수 | V1 데이터 등록 완료 |
| `registerStructureV2()` 호출 | 84/84 완료 |
| `registerBeatsV2()` 호출 | family-01, spouse-01만 (파일럿). 나머지 미추가 (V2 방향 변경) |
| TypeScript 빌드 | 에러 0 |

### 5-2. 미커밋 변경

**수정 파일 (88건):**
- `src/data/claimPolicies/*.ts` x 82 — registerStructureV2 추가
- `src/app/index.css` — action-beckon 애니메이션
- `src/components/actions/ActionPanel.tsx` — 액션 탭 번쩍임 효과
- `src/components/common/Toast.tsx` — UI (유저 직접 수정)
- `src/components/discovery/StateTransitionFeedback.tsx` — UI (유저 직접 수정)
- `src/components/layout/CourtHeader.tsx` — UI (유저 직접 수정)
- `src/components/layout/CourtLayout.tsx` — UI (유저 직접 수정)

**신규 파일 (untracked, 93건):**
- `src/data/claimPolicies/*-structure-v2.json` x 82
- `docs/ref/리뉴얼참고/gpt-batch-v2-regen/regen-round-{01~11}/output/` x 41

---

## 6. 주의사항

### 6-1. beats-v2-full은 등록하지 않음
V2 방향 변경(structure만 사용, LLM이 대사 생성)에 따라 `registerBeatsV2()`는 새 모듈에 추가하지 않았다. family-01, spouse-01 (파일럿)만 기존대로 유지. 향후 V3에서 점진 활용 예정.

### 6-2. freeQuestionHooks atomId 변경 (18파일)
GPT 재생성 시 18파일에서 `freeQuestionHooks.answerEnvelope.allowAtomIds` 값이 변경됐다. atomId 형식 정규화로 추정되나, 엔진 시뮬레이션 시 확인 필요.

해당 파일: family-03, friend-09/12, neighbor-02/04/06/09/10/11/12, tenant-06/09/12, workplace-01/03/05/06/08

### 6-3. 비대상 dispute depthLayers revealAtomIds 변경 (26파일)
GPT 재생성 시 red_herring 전환 대상이 아닌 dispute에서도 revealAtomIds가 변경됐다. atomId 포맷 정규화로 추정.

### 6-4. spouse-01, family-01 경로 특수성
파일럿 2건은 다른 82건과 import 경로가 다르다 (gpt-session 폴더 vs gpt-batch 폴더). 기능상 문제 없음.

---

## 7. 다음 단계

| 우선순위 | 작업 | 비고 |
|----------|------|------|
| **즉시** | 커밋 + main 머지 | 빌드 확인 완료 |
| **HIGH** | A스레드 엔진 시뮬레이션 2차 검증 | atomId 변경 18+26파일 확인 |
| **LOW** | V3 beats-v2-full 점진 적용 계획 | 스크립트 모드 전환 |

---

## 8. 파일 위치

```
V1 배치 데이터:         docs/ref/리뉴얼참고/gpt-batch/
V2 배치 데이터:         docs/ref/리뉴얼참고/gpt-batch-v2/round-{01~21}/output/
V2 재생성 결과:         docs/ref/리뉴얼참고/gpt-batch-v2-regen/regen-round-{01~11}/output/
등록 모듈:             src/data/claimPolicies/*.ts
Structure V2 JSON:     src/data/claimPolicies/*-structure-v2.json
V2 엔진:              src/engine/v2DataLoader.ts
misconception 엔진:    src/engine/misconceptionEngine.ts
Store:                src/store/useGameStore.ts
이 보고서:             docs/ref/리뉴얼참고/thread-handoff-D.md
```

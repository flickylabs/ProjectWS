# 스레드 B: Family Session 82개 사건 배치 적용

## 현재 상황

### 프로젝트
Solomon — LLM 기반 법정 심문 게임. 84개 사건 중 2개(spouse-01, family-01)가 V3 완성 상태. 나머지 82개를 V3 수준으로 올려야 한다.

### V3 완성 사건의 데이터 구성 (1사건당)
```
V2 ClaimAtom: ~150개 (쟁점×state×atom)
ExecutableVerbalTell: 6개 (파티당 3)
BeatScript: 36개 (stance×쟁점×state)
DossierCard: 3장 (18 challenge 질문)
StateUnlockAtom: ~42개 (S2~S5 해금)
이벤트 텍스트: ~18개 (모순+끼어들기+감정폭발)
TransitionBeat: ~24개 (전이 순간 강제 대사)
Bridge: 10개 (Phase 1→3 연결)
EvidenceChallenge: 6개 (증거별 벡터 봉쇄)
```

### 배치 요청서 준비 완료
`docs/ref/리뉴얼참고/gpt-batch/`에 82개 사건 폴더가 생성되어 있다.

각 폴더 구성:
```
docs/ref/리뉴얼참고/gpt-batch/spouse-02/
├── 00-요청서.md                 ← 사건 맞춤 요청서 (프로젝트 배경 + 스키마 + 인라인 예시 + 사건 정보)
└── 사건원본_spouse-02.json      ← GPT에 첨부할 원본 데이터
```

요청서에 포함된 정보:
- 프로젝트 배경 + 아키텍처 설명
- atom/Tell/Beat/DossierCard/UnlockAtom 인라인 예시 (spouse-01 실물)
- 출력 형식 (3개 파일: v2-atoms.json, tells-beats.json, v3-game-loop-data.json)
- **사건 맞춤 정보**: 당사자(이름/나이/직업/archetype), 5개 쟁점, 6개 증거, lieConfig, speechStyle, verbalTells, Tell 제안, DossierCard 권장 묶음

### GPT 운영 방식
- **1스레드 = 1사건** (새 스레드에서 독립 실행)
- 첨부: `00-요청서.md` + `사건원본_XXXX.json` 2개만
- 메시지: "진행해 주세요"
- 병렬 3~4개 동시 실행 가능
- 산출물: 각 폴더의 `output/` 하위에 저장

### 사건 목록 (7 카테고리 × 12개)
```
spouse:      02~12 (11개, 01은 완료)
family:      02~12 (11개, 01은 완료)
friend:      01~12 (12개)
neighbor:    01~12 (12개)
partnership: 01~12 (12개)
tenant:      01~12 (12개)
workplace:   01~12 (12개)
합계: 82개
```

### 통합 패턴 (spouse-01, family-01에서 검증 완료)
GPT 산출물이 오면 Claude Code가:
1. 데이터 무결성 검증 (테스트 자동 생성)
2. `src/data/claimPolicies/XXXX.ts` 등록 모듈 작성
3. `src/store/useGameStore.ts`의 `initializeCase`에 등록 호출 추가
4. 빌드 + 테스트 확인

---

## 이 스레드에서 할 일

### ⚠️ 전제 조건
**스레드 A (GPT 논의 결과)**가 먼저 확정되어야 한다.

이유:
- GPT 논의에서 "사건 구조 변경" (가짜 쟁점, 층위 등)이 결정되면 → 배치 요청서가 바뀜
- BeatScript ×5 변형이 확정되면 → 요청서에 변형 수 반영 필요
- 사건 규모(쟁점 수, 턴 수)가 바뀌면 → 사건 원본 자체가 변경될 수 있음

### 스레드 A 결과 확정 후 진행할 작업

1. **배치 요청서 템플릿 업데이트** — GPT 논의 결과 반영
   - BeatScript ×5 변형 요청 추가
   - 사건 구조 변경 반영 (가짜 쟁점, 층위 등)
   - 요청서 자동 생성 스크립트 재실행

2. **GPT 배치 실행** — 82개 사건 순차 생성
   - 카테고리별 순서: spouse → family → friend → neighbor → partnership → tenant → workplace
   - 각 사건 산출물 3개 파일 (v2-atoms, tells-beats, v3-game-loop)

3. **산출물 통합** (사건당 ~15분)
   - 무결성 검증 테스트
   - 등록 모듈 작성
   - Store 연결
   - 빌드 + 테스트

4. **일괄 커밋 + 배포** — 카테고리 단위로 커밋

### 참고 파일 위치
```
배치 폴더: docs/ref/리뉴얼참고/gpt-batch/ (82개 사건)
템플릿: docs/ref/리뉴얼참고/gpt-batch/00-배치요청서-템플릿.md
생성기: tests/generate-batch-requests.cjs
완성 사례 (spouse-01): src/data/claimPolicies/spouse-01.ts
완성 사례 (family-01): src/data/claimPolicies/family-01.ts
검증 테스트: tests/v3-round2-validation.cjs
```

### 예상 소요
- GPT 생성: 82사건 × ~1시간 = 82시간 (병렬 3~4개 → 약 20~27 라운드)
- Claude Code 통합: 82사건 × ~15분 = ~20시간
- 총: 약 1~2주 (병렬 실행 기준)

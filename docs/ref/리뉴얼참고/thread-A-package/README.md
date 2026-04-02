# Thread A 전달 패키지 — 읽기 순서

## 읽는 순서

### 1단계: 피드백 본문 (필독)
- **`00-피드백-통합의견.md`** — A/B 스레드 통합 의견 + 확정 방향 + 7종 산출물 요청

### 2단계: 타입 정의 (현재 구조 파악)
- `01-types-renewal.ts` — V3 핵심 타입 전체 (BeatScript, TransitionBeat, DossierCard, ResponseBlueprint 등)
- `02-types-claimV2.ts` — ClaimAtom, Slot, SubActionAtomRule
- `03-types-case.ts` — Case, Dispute, Evidence
- `04-types-agent.ts` — LieState
- `05-types-discovery.ts` — Discovery 메커닉 타입

### 3단계: 엔진 코드 (확장 대상)
- `06-engine-blueprint.ts` — stance/defenseMode 결정 매트릭스
- `07-engine-questionEffect.ts` — 모순토큰/누설미터/신뢰창구
- `08-engine-gameEventTrigger.ts` — 모순/끼어들기/감정폭발/새쟁점

### 4단계: 데이터 샘플 (스키마 참조용)
- `09-data-spouse01-tells-beats.json` — 현재 Tell 6개 + BeatScript 36개
- `10-data-spouse01-v3-game-loop.json` — DossierCard + UnlockAtom + Event + TransitionBeat
- `11-data-spouse01-v2-atoms.json` — V2 atom 155개 (큰 파일, 구조만 파악)

### 5단계: 배치 템플릿 + 논의 원본 (필요 시)
- `12-배치요청서-현재템플릿.md` — 현재 GPT 배치 요청서
- `13-discussion-v3-script-transition.md` — 이번 논의 원본 문서

## 요청 산출물 7종

| # | 산출물 | 용도 |
|---|--------|------|
| 4-1 | BeatScript V2 확정 스키마 | 타입 정의 확장 |
| 4-2 | Dispute 확장 스키마 | 층위/링크/misconception |
| 4-3 | Evidence 확장 스키마 | 타이밍 메타데이터 |
| 4-4 | Beat Selector 엔진 설계 | 새 엔진 구현 |
| 4-5 | 질문 피로도 엔진 설계 | 새 엔진 구현 |
| 4-6 | GPT 배치 요청서 V2 | 82개 사건 확장용 |
| 4-7 | spouse-01 파일럿 샘플 | 엔진 테스트용 |

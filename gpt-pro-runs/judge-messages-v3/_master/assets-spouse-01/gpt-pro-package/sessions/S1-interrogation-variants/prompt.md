# S1: interrogation v 확장 (5 → 10)

> **작업 시작 전 필수**: **같은 폴더 안의 source 파일들** (또는 GPT Pro 프로젝트 Knowledge에 업로드된 동일 파일들)을 참조.
> **특히** `00-common-instructions.md` 전체 학습 후 작업 시작.
> **산출물**: 본 답변에 JSON 형식 entries 배열 출력. 메인(Claude Opus)이 받아 한국어 보정 후 `src/data/scriptedText/spouse-01.json`에 patch 적용.

---

## 작업 목표
interrogation 채널의 기존 144 keys (각 5 variants = 720 entries)에 **신규 5 variants 추가**하여 144 × 10 = 1,440 entries로 확장.

## 분량
- **추가 entries: +720** (144 keys × 5 신규 variants)
- 기존 5 variants 보존 (수정 X)

## 키 매트릭스 (144 cells)
- party (2): a, b
- disputeId (4): d-1, d-2, h-d3, h-d4
- lieState (6): S0, S1, S2, S3, S4, S5
- questionType (3): fact_pursuit, motive_search, empathy_approach

## 작업 명세

### 신규 variants 작성 기준
1. **기존 5 variants와 의미/맥락 중복 X** — 같은 (party, dispute, lieState, qType) 안에서 다른 표현 풀
2. **9차원 맥락 정확 매핑**:
   - lieState별 Truth Throttle (S0-S1: 모호어 / S2: 약칭 / S3+: 구체)
   - emotion 차원 변동 (5 variants 사이에서 cautious/measured/shaken/resigned 분포)
   - continuity 차원 (opening_guard / opening_pressure / partial_slip / counter_blame / surface / confession_pivot)
3. **archetype voice 보존**:
   - 박지연 (victim_cosplay): victim_frame / helplessness / soft_confession verbal tell
   - 이준호 (avoidant): answer_delay / partial_scope / minimize_harm verbal tell
4. **lieState별 stanceHint 매핑** (기존 entries 참조):
   - S0: deny
   - S1: hedge
   - S2: hedge → partial
   - S3: partial → blame
   - S4: emotional
   - S5: confess

### 출력 형식
기존 entry의 `variants[]` 배열에 **5개 신규 variant 추가** (기존 v1~v5는 그대로 유지, 신규 v6~v10 추가).

```json
{
  "key": "a|d-1|S0|fact_pursuit",
  "party": "a",
  "disputeId": "d-1",
  "lieState": "S0",
  "questionType": "fact_pursuit",
  "stanceHint": "deny",
  "truthLevel": "none",
  "variants": [
    // 기존 v1~v5 (수정 X)
    // 신규 v6~v10 (추가):
    {
      "id": "a-d-1-S0-fact-pursuit-v6",
      "text": "...",
      "behaviorHint": "...",
      "tags": [...],
      "sourceRefs": [...]
    },
    ...
    {
      "id": "a-d-1-S0-fact-pursuit-v10",
      ...
    }
  ]
}
```

## 입력 자료

### 기존 720 entries
파일: Knowledge: `10-scripted-text-current.json` → `channels.interrogation.entries[]`

### atom 데이터 (9차원 맥락 매핑)
파일: Knowledge: `06-atoms-current.json` (295KB) → `claimPolicies.{a|b}.{disputeId}.{S0~S5}.claimAtoms[]`
- 4 disputes × 6 lieStates × 2 parties = 48 sections
- 각 section마다 4~8 atoms (factText / tags / slots / stanceHints / requiresEvidenceIds)

### 캐릭터 voice
파일: Knowledge: `01-character-info.md`, Knowledge: `03-phase1-2-dialogue.md`

## 작성 가이드 (lieState별)

### S0 (완전 부정) — 5v 신규
- stanceHint: deny / truthLevel: none
- 박지연 voice: "재판관님, ~ 사실입니다" (정리된 어투, victim_frame)
- 이준호 voice: "재판관님, 그건 오해입니다" (짧게 끊기, answer_delay)
- emotion 변동: guarded → cautious → defensive

### S1 (일부 인정) — 5v 신규
- stanceHint: hedge / truthLevel: hint
- 박지연: 정황 강조 + 일부 사실 인정
- 이준호: "그곳에 간 건 맞습니다, 다만 ~" (partial_scope)

### S2 (핑계) — 5v 신규
- stanceHint: hedge → partial / truthLevel: partial
- "사전 상의/협의" 단어 금지 (해당 lieState만)
- "특정 X" 패턴 금지

### S3 (책임 전가) — 5v 신규
- stanceHint: partial → blame / truthLevel: partial
- 박지연: counter_attack ("자기가 ~ 한 거 아니야?")
- 이준호: 모호어 약화 + 부분 인정

### S4 (감정적) — 5v 신규
- stanceHint: emotional / truthLevel: partial
- 박지연: emotional_outburst ("10년을 ~ 한 게 다 뭔데!")
- 이준호: 한 박자 늦게 부분 인정 (emotional/confession beat 해요체 일부 OK)

### S5 (자백) — 5v 신규
- stanceHint: confess / truthLevel: full
- 박지연: 위임장 조작 인정 + 투자 손실 자백
- 이준호: 형/조카 사정 인정 + 비자금 전달 자백
- 문장 길이 가이드 예외 (S5 confession beat는 길게 OK)

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] 같은 (party, dispute, lieState, qType) 안에서 신규 5v가 기존 5v와 중복 X
- [ ] lieState별 Truth Throttle 정확
- [ ] atom의 factText / slots를 활용 (특히 S3+ 구체 표현)
- [ ] sourceRefs에 dispute + atom 정확 매핑

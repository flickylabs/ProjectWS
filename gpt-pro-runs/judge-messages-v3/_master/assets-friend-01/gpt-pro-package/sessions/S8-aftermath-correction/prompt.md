# S8: aftermath v 확장 + 기존 entries 톤 보정 patch

> ⚠️ **사건별 차이**: 본 prompt.md는 spouse-01 패턴을 base로 작성. **Knowledge의 사건 데이터(특히 `00-common-instructions.md`, `01-character-info.md`)를 우선 참조**하여 사건별 인물(송다은/최수민), dispute, evidence, dossier에 맞춰 작업하라.


**선행 학습**: Knowledge: `00-common-instructions.md`

---

## 작업 목표
1. **aftermath 채널 v 확장**: 5 cells × 2v = 10 → 5 × 5v = 25 (+15)
2. **기존 entries 톤 보정 patch (우선순위 7~8)**: 약 720 entries (interrogation S0~S2 360 + evidence_present 210 + dossier 24 + witness 27 + 기타 99)

## 분량
- aftermath 신규: +15
- 톤 보정 patch: 약 720 entries 검토 (보정 비율 메인 자율 판단 패턴 따라 약 5~10% 예상)

---

## Part 1: aftermath (v 확장 2→5)

### 키 패턴 (현재 유지)
- `{resultClass}` (5 cells)
- resultClass:
  - `a_primary_fault` (A 주요 책임)
  - `b_primary_fault` (B 주요 책임)
  - `shared_fault` (공동 책임)
  - `protective_resolution` (보호 해결)
  - `procedural_caution` (절차 주의)

### 의미
판결 후 후일담 — 양측 + 사건 결말 narrative.

### 출력 형식
```json
{
  "key": "shared_fault",
  "resultClass": "shared_fault",
  "variants": [
    // 5 variants — 각 결과 클래스별 narrative
  ]
}
```

### 작성 가이드 (resultClass별)

#### a_primary_fault (박지연 위임장 조작 책임 우세)
- A: 위임장 조작 인정 / 처벌 받음 / 형 사정 늦게 알게 됨
- B: 침묵의 단초 인정 / 시댁 갈등 정리 결심
- 결말: 부부 관계 재정립 시도 / 또는 이혼 절차

#### b_primary_fault (이준호 침묵 책임 우세 — 가능성 낮음)
- 가능한 시나리오: 박지연이 위임장 조작 무죄 입증 + 이준호 비자금/침묵만 남음

#### shared_fault (가장 자연스러운 결말)
- 양측 책임 명확화 / 위임장 + 비자금 + 침묵 모두 인정
- 장기 회복 / 또는 합의 이혼

#### protective_resolution (보호 해결)
- 가족 사정 보호 위해 일부 사실 비공개
- 양측 합의로 절차 단순화

#### procedural_caution (절차 주의)
- 형 사정 + 조카 보호 위해 추가 절차 (가족 상담 등)

### 입력 자료
- 사건 anchorTruth (common-instructions.md §1)
- 각 dispute의 책임 배분 (character-info.md)

---

## Part 2: 기존 entries 톤 보정 patch

### 보정 대상 (약 720 entries)
| 채널 | entries | 비고 |
|---|---|---|
| interrogation S0~S2 | 360 (72 keys × 5v) | 자율 판단으로 보정 비율 1~5% 예상 |
| evidence_present 기존 5v | 210 | stage 차원 신설 작업과 함께 검토 (S2/S3 세션) |
| dossier 기존 3v | 24 | lieBand 신설 작업과 함께 (S4) |
| witness 기존 3v | 27 | v 확장 작업과 함께 (S4) |
| trust_action 기존 2v | 36 | v 확장 작업과 함께 (S7) |
| 기타 (judge_question/judge_contradiction 기존) | ~63 | 메인 자율 보정 완료 — 수정 X |

### 보정 기준 (잘못 패턴 #6 모범 + 톤 8원칙)
1. "쪽" / "부분" 등 약한 단어 → 인지 단계 정확 표현
2. 명사형 ("X 돌봄/지원/처리") → 동사형 자연체 ("X을 ~한 것")
3. 정보 추궁 ("무엇") → 동기/심리 추궁 ("왜 그렇게")
4. 추상 표현 → 직접 행동 지칭
5. 어색 표현 → 자연스러운 일반화
6. 번역체 9패턴 회피
7. 직접 인용 결합 회피 (간접 인용)
8. 기계적 관찰문 회피 (system 채널)

### 출력 형식 (patch list)
```json
[
  {
    "id": "a-d-1-S0-fact-pursuit-v3",
    "channel": "interrogation",
    "before": "...",
    "after": "...",
    "reason": "쪽 약한 단어 → 인지 단계 표현"
  },
  ...
]
```

### 작성 가이드
1. 모든 720 entries를 9차원 맥락 검토
2. 보정 후보 식별 (자동 검출 키워드 사전 활용)
3. 각 patch에 reason 명시 (어떤 잘못 패턴 / 어떤 모범 적용)
4. 보정 비율 5~10% 내외 예상 (NPC voice 보존이 더 중요)

### 자동 검출 키워드 사전 (참고)
- weak_word_쪽: `(\S+)\s*쪽으로(?!\s*마음이)` / `어느\s*쪽이(?!\s*더\s*컸)` / `쪽이었` / `쪽인` / `쪽은`
- noun_form_action: `\S+\s+돌봄|\S+\s+지원|\S+\s+처리|\S+\s+회피|\S+\s+은폐(?!해|하)`
- trans_style: `된\s*것으로\s*생각|인\s*측면이\s*있|부득이하게|사전\s*상의|...`
- mechanical_observ: `태도에\s*변화가\s*감지|내용이\s*확인됩니다|...`
- direct_quote: `'[^']{2,}'.*라고\s*하셨`

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] aftermath: resultClass별 narrative 정합 (anchorTruth + 책임 배분)
- [ ] 보정 patch: 의미/사실/맥락 보존 (신규 작성 X)
- [ ] 각 patch에 reason 명시
- [ ] NPC voice 보존 (보정 비율 너무 높이지 X)
- [ ] 사용자 보정 모범 4 patch 일관성 (잘못 패턴 #6)

---

## 최종 단계 — S1~S8 종합

GPT Pro 산출물 모두 받은 후 메인 적용 절차:

1. 각 세션 산출물 → 메인 한국어 보정 (잘못 패턴 #6 모범)
2. `src/data/scriptedText/friend-01.json` 통합 patch
3. `npm run build` + `npx tsc -b --force`
4. dev 서버 시각 검증 (사용자)
5. 메모리 업데이트 (friend-01 완료 보고)
6. friend-01 종결 후 → family-01 / friend-01 동일 절차

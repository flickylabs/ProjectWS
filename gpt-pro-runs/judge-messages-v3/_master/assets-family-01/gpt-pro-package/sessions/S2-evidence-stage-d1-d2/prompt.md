# S2: evidence_present stage 차원 신설 (d-1, d-2 관련 evidence)

> ⚠️ **사건별 차이**: 본 prompt.md는 spouse-01 패턴을 base로 작성. **Knowledge의 사건 데이터(특히 `00-common-instructions.md`, `01-character-info.md`)를 우선 참조**하여 사건별 인물(윤태성/윤정후), dispute, evidence, dossier에 맞춰 작업하라.


**선행 학습**: Knowledge: `00-common-instructions.md`

---

## 작업 목표
evidence_present 채널에 **investigationStage 차원 신설** (옵션 A) — d-1/d-2 관련 evidence (e-1, e-2, e-3, e-4, e-5).

## 분량
- 신규 키 패턴: `{party}|{evidenceId}|{lieBand}|{investigationStage}`
- 5 evidence × 2p × 3 lieBand × 3 stage = 90 cells × 10v = **900 entries**
- 기존 5 evidence × 2p × 3 lieBand × 5v = 150 entries 보존 (수정 X)
- **추가 entries: 약 +500** (신규 stage 차원만 신규 작성)

## 작업 명세

### investigationStage 3단계 의미 (각 evidence 정의)
| stage | revealKey | attackVector | 예시 (e-1 영수증) |
|---|---|---|---|
| 1 | request_original | authenticity | "이 영수증, 누가 무엇을 산 것입니까?" |
| 2 | check_metadata | context | "이 품목들이 가리키는 상대는 누구입니까?" |
| 3 | restore_context | responsibility | "중학생용 참고서는 누구를 위해 산 것입니까?" |

### subjectRole 자동 결정 (party × evidence.subjectParty)
- evidence.subjectParty='b' & 응답자 'b' → subjectRole 'self'
- evidence.subjectParty='b' & 응답자 'a' → subjectRole 'other'
- evidence.subjectParty='both' & 응답자 'a' → 'both' / 'b' → 'self'

### 5 evidence (d-1, d-2 관련)
| id | name | subjectParty | requiredLieState |
|---|---|---|---|
| e-1 | 영수증 묶음 5장 | b | — |
| e-2 | 블랙박스 GPS | b | — |
| e-3 | 통화기록 | b | — |
| e-4 | 형 문자 스레드 | b | S1 |
| e-5 | 이준호 출금 내역 | both | S2 |

## 출력 형식

```json
{
  "key": "b|e-1|early|1",
  "party": "b",
  "evidenceId": "e-1",
  "lieBand": "early",
  "investigationStage": 1,
  "subjectRole": "self",
  "stanceHint": "hedge",
  "truthLevel": "hint",
  "variants": [
    // 10 variants (v1~v10) — 모두 신규
  ]
}
```

## 입력 자료

### evidence 정의 (가장 중요)
파일: `Knowledge: `04-case-family-01.json`` → `evidences[]`

각 evidence의 다음 필드 활용:
- **investigationStages[]**: stage / revealKey / question / attackVector / label / unlockHint
- **investigationResults**: request_original / check_metadata / restore_context (각 stage가 무엇을 드러내는지)
- **partyContext.{a,b}**: questionAngle / implication
- **proves**: 증거가 가리키는 사실
- **subjectParty**: a/b/both

### 예시 — e-1 영수증
```json
{
  "id": "e-1",
  "subjectParty": "b",
  "investigationStages": [
    {"stage": 1, "revealKey": "request_original", "question": {"text": "이 영수증들, 누가 무엇을 산 것입니까?", "attackVector": "authenticity"}, "label": "영수확인"},
    {"stage": 2, "revealKey": "check_metadata", "question": {"text": "이 품목들이 가리키는 상대는 누구입니까?", "attackVector": "context"}, "label": "품목대조"},
    {"stage": 3, "revealKey": "restore_context", "question": {"text": "중학생용 참고서는 누구를 위해 산 것입니까?", "attackVector": "responsibility"}, "label": "대상복원"}
  ],
  "investigationResults": {
    "request_original": "틴트, 헤어롤 등 여성용 물건들이 눈에 띈다.",
    "check_metadata": "머리끈, 손거울 등이 눈에 띈다. 샤프와 노트 같은 학용품도 함께 구매되어 있다.",
    "restore_context": "중학생 대상 참고서를 구입한 것이 눈에 띈다."
  },
  "partyContext": {
    "a": {"questionAngle": "이 영수증들이 왜 딴살림 확신으로 이어졌는지 설명해 주십시오.", "implication": "머리끈/틴트가 외도 의심의 출발점이다."},
    "b": {"questionAngle": "이 영수증의 물품들은 누구를 위해 구매한 것인지 설명해 주십시오.", "implication": "참고서가 조카 돌봄의 결정적 단서가 된다."}
  }
}
```

## 작성 가이드 (stage별)

### stage 1 (request_original) — 표면 인지
- attackVector: authenticity
- "본인 자료 맞습니까?" / "이 자료의 출처/시점부터 답변하십시오"
- party=b (자기 사정): 모호어로 부정/회피 (early lieBand) → 인정 (late)
- party=a (상대 사정): 자신이 어떻게 알게 됐는지 + 단정 시작점

### stage 2 (check_metadata) — 맥락 대조
- attackVector: context
- "이 품목들이 가리키는 상대는?" / "왜 같은 장소에 반복?"
- party=b: 핑계 → 가족/지인 단서 흘림
- party=a: 정황 해석을 단정으로 굳히는 과정

### stage 3 (restore_context) — 책임 복원
- attackVector: responsibility
- "이 행위의 진짜 목적은?" / "최종 결과/도달지는?"
- party=b: 자백 또는 깊은 핑계
- party=a: 단정의 책임 인정 또는 단정 강화

### lieBand × stage 매트릭스 (b 응답자 기준)
| | stage 1 | stage 2 | stage 3 |
|---|---|---|---|
| early | 모호 부정 | 모호 핑계 | 모호 회피 |
| mid | 부분 인정 | 부분 핑계 | 부분 책임 |
| late | 인정 | 가족 단서 | 자백 (조카 돌봄/형 사정) |

(party=a는 단정 → 정황 해석 → 단정 책임 인정 순)

## 검증 체크리스트
[common-instructions.md §8](./common-instructions.md) 전부 + 다음:
- [ ] subjectRole 자동 결정 정확 (party × evidence.subjectParty)
- [ ] stage별 attackVector 부합 (authenticity / context / responsibility)
- [ ] partyContext.{a,b}.questionAngle을 응답에 반영
- [ ] investigationResults[stage].revealKey의 정보 단계적 공개 (Truth Throttle)
- [ ] e-4 / e-5는 requiredLieState 만족 시점부터 사용 가능
- [ ] sourceRefs에 evidence + investigationStage + dispute 정확 매핑

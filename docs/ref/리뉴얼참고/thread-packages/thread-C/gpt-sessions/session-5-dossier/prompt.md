# V3 DossierCard scriptedResponse 생성 — Session 5: Dossier

## 너의 역할
Solomon 법정 게임의 DossierCard scriptedResponse 작성 전문가.
카드 질문은 "정답"이다 — NPC가 상당히 인정하는 반응을 보여야 한다.

## 첨부 파일 설명
- `spouse-01-case.json` — 사건 데이터 (disputes, evidence, duo)
- `spouse-01-tells-beats.json` — 캐릭터별 verbalTell 정의
- `spouse-01-v2-atoms.json` — StateUnlockAtom
- `spouse-01-v3-pilot-reference.json` — 파일럿 데이터 (dossierCardScriptedResponses 섹션 참고)
- `spouse-01-v3-game-loop-data.ts` — DossierCard 질문 정의 원본

## 대상
spouse-01의 DossierCard 3개, 질문 총 18개.

## DossierCard 구조 (spouse-01-v3-game-loop-data.ts에서 발췌)

### dossier-1: "자금 흐름" (e-1, e-2 / d-1, d-3, d-5)
| 질문 ID | targetParty | requiredLieState | attackVector | 질문 요약 |
|---------|------------|-----------------|-------------|----------|
| dossier-1.a.q1 | a | (없음) | identity | 최민정이 어떤 역할인지 |
| dossier-1.a.q2 | a | S2 | context | 통화 후 이체한 이유 |
| dossier-1.a.q3 | a | S3 | authenticity | 기관 원본이면 더 다투겠는가 |
| dossier-1.b.q1 | b | (없음) | authenticity | 원본 나와도 외도 주장할 건가 |
| dossier-1.b.q2 | b | S2 | context | 상담 기록 보고도 외도 의심 유지할 건가 |
| dossier-1.b.q3 | b | S3 | identity | 기관 담당자인데 "그 여자" 표현 유지할 건가 |

### dossier-2: "잘린 대화" (e-3, e-4 / d-2, d-3)
| 질문 ID | targetParty | requiredLieState | attackVector | 질문 요약 |
|---------|------------|-----------------|-------------|----------|
| dossier-2.a.q1 | a | (없음) | context | 맥락을 왜 바로잡지 않았는가 |
| dossier-2.a.q2 | a | S2 | identity | 사적 관계 아니라 업무 연락처라고 밝힐 수 있는가 |
| dossier-2.a.q3 | a | S3 | authenticity | 출입기록과 시각 맞는데 만남 자체 흐리겠는가 |
| dossier-2.b.q1 | b | (없음) | legality | 새벽에 폰 열어 확보한 경위가 정당한가 |
| dossier-2.b.q2 | b | S2 | context | 잘린 캡처로 결론 내린 건 인정하는가 |
| dossier-2.b.q3 | b | S3 | identity | 정체 확인돼도 외도 상대 판단 유지하겠는가 |

### dossier-3: "우회 송금" (e-5, e-6 / d-4, d-5)
| 질문 ID | targetParty | requiredLieState | attackVector | 질문 요약 |
|---------|------------|-----------------|-------------|----------|
| dossier-3.a.q1 | a | (없음) | authenticity | 150만원 원본이면 부정 안 하겠는가 |
| dossier-3.a.q2 | a | S2 | identity | 정우성이 전달자면 같은 방식으로 몰아가겠는가 |
| dossier-3.a.q3 | a | S3 | context | 선후관계를 먼저 말해야 하는 것 아닌가 |
| dossier-3.b.q1 | b | (없음) | identity | 정우성을 왜 중간 전달자로 세웠는가 |
| dossier-3.b.q2 | b | S2 | context | 처음부터 우회 송금 계획이었는가 |
| dossier-3.b.q3 | b | S3 | legality | 제3자 자료도 판단 범위라는 점 인정하는가 |

## truthLevel 결정 규칙

카드 질문은 "정답"이므로 NPC도 상당히 인정해야 한다.
단, truthLevel은 질문의 requiredLieState에 대응:

| requiredLieState | scriptedResponse.truthLevel | NPC 반응 수준 |
|-----------------|---------------------------|-------------|
| 없음 (q1 계열) | `hint` | 사실 인정은 하되 구체적 진실 회피 |
| S2 (q2 계열) | `partial` | 행위를 인정하지만 전체 그림은 감춤 |
| S3 (q3 계열) | `partial` 또는 `full` | 거의 모든 것을 인정 |

## 캐릭터별 톤

### A (한지석) 응답 시:
- over_precision tell: 숫자/시각으로 감정을 숨김
- counter_question tell: 추궁에 되묻기
- 점차 방어를 내려놓는 궤적

### B (오세린) 응답 시:
- evidence_waving tell: 증거로 결론부터
- motive_jump tell: 의도 단정
- 점차 자기 행위를 돌아보는 궤적

## Truth Throttle 금지어

```
hint 대사:    재가돌봄센터, 상담팀장, 간병, 예약금, 최민정, 오미숙, 장모님, 동생 월세, 내용증명 금지
partial 대사: 기관 정식명칭, 대상자 실명 금지. "상담"/"기관"/"가족 어른" 수준 허용
full 대사:    모두 허용
```

## 출력 형식

```json
{
  "session": "dossier",
  "dossierCardScriptedResponses": {
    "dossier-1.a.q1": {
      "npcResponse": "NPC 응답 대사 (1~3문장)",
      "behaviorHint": "연출 힌트 (tell 발현 여부 포함)",
      "truthLevel": "hint"
    },
    "dossier-1.a.q2": { ... },
    ...
  }
}
```

## 자가 검증 (출력 전 반드시 확인)
- [ ] q1 (requiredLieState 없음) 질문의 truthLevel이 모두 `hint`인가?
- [ ] q2 (requiredLieState S2) 질문의 truthLevel이 모두 `partial`인가?
- [ ] q3 (requiredLieState S3) 질문의 truthLevel이 `partial` 또는 `full`인가?
- [ ] hint 응답에 금지어가 없는가?
- [ ] partial 응답에 기관 정식명칭/대상자 실명이 없는가?
- [ ] NPC가 "인정"하는 톤인가? (카드 질문은 정답이므로 단순 부정 X)
- [ ] 캐릭터 tell이 behaviorHint에 반영되어 있는가?
- [ ] 18개 질문 전부 커버했는가?

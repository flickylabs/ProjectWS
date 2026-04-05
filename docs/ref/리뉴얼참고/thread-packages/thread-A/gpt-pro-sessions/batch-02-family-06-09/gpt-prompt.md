# GPT Pro 세션 — 배치 02: family-06 ~ family-09 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `family-06-input.json` | case-family-06 증거·쟁점 입력 |
| `family-07-input.json` | case-family-07 증거·쟁점 입력 |
| `family-08-input.json` | case-family-08 증거·쟁점 입력 |
| `family-09-input.json` | case-family-09 증거·쟁점 입력 |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(family-06, family-07, family-08, family-09)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
기준본은 reference-family-01-stages.json — 이 톤과 구조를 따라.

[구조]
각 증거마다 stage 0, 1, 2 총 3단계:
- stage 0: 표면 확인 + 경미한 압박 ("~에 대해 설명하십시오", "~을 인정하십니까?")
- stage 1: 중간 추궁 — 조사 결과(check_metadata)를 근거로 속성 추궁
- stage 2: 핵심 추궁 — 숨겨진 맥락을 들이밀되 답을 직접 말하지 않음

[revealKey 고정 패턴]
- stage 0: "request_original"
- stage 1: "check_metadata"
- stage 2: "restore_context" (기본) 또는 "check_edits" (크롭/편집이 핵심 발견인 증거만)

[attackVector — 5종 중 선택]
- context: 상황/맥락 (stage 0에서 가장 빈번)
- identity: 누가/관련자/주체
- authenticity: 진위/조작/원본 여부 (stage 2에서 빈번)
- legality: 법적 의미/적법성
- timeline: 시간 순서/선후관계

[질문 작성 규칙]
1. 합니다체 ("~하십시오", "~입니까?")
2. 25~60자
3. stage 0: 진실 노출 제로 — 증거의 존재만 확인 + 경미한 압박
4. stage 1: 메타데이터(시각, 기기, 주체)를 근거로 구체적 추궁
5. stage 2: 핵심에 근접하되 답 자체를 직접 말하지 않음
6. 각 stage는 이전 stage보다 핵심에 더 접근 (단계적 에스컬레이션)

[절대 금지]
- "특정 X" 패턴 → "해당 X" 사용
- anchorTruth 핵심 키워드 직접 노출 — 인물 실명, 기관 정식명, 정확한 금액
- 번역체 9패턴:
  "~된 것으로 생각됩니다" / "~의 존재를 알고 계셨습니까?" /
  "~에 대하여 어떻게 생각하십니까?" / "~하는 것이 사실입니까?" /
  "~라고 말씀하신 것입니까?" / "~인 것으로 보입니다" /
  "~할 수 있었던 것입니까?" / "~였다는 것을 인정하십니까?" /
  "~에 관하여 진술하십시오"

[각 사건의 anchorTruth — 질문에 직접 노출 금지]
- family-06: 임하준의 SNS 저격이 가족 평판을 흔든 건 맞지만, 지역 맘카페와 협찬처에 2014년 쉼터·채무조정 서류를 돌린 실질적 배후는 하준이나 선영이 아니라 외삼촌 오병철이었다.
- family-07: 백종문이 지원사업 기사와 수상 장면에서 딸 지수의 공로를 자기 몫처럼 넓게 말한 건 맞지만, 가업의 최근 반등은 종문의 생산 안정화와 지수의 온라인·브랜드 개편이 함께 맞물린 결과였다.
- family-08: 이준호가 어머니를 몰래 영구입소시킨 것처럼 보인 150만원 송금은 사실 작년 가을 형제와 어머니가 함께 적어둔 '야간 배회 재발 시 은솔요양원 대기·평가입소 진행' 합의를 집행한 것이었고, 핵심 문제는 그 합의 존재보다 준호의 미통보와 세라의 공개 비난이었다.
- family-09: 최민아가 '도윤이 부모 집값 차액을 혼자 숨겼다'고 몰아붙인 6,600만원 계약 외 보전금은 사실 도윤 단독 은닉이 아니라, 남매가 동네 중개사와 함께 공식 매매가 밖으로 빼 돌려 나눠 갖기로 먼저 합의한 공모의 산물이었다.

[출력 형식]
사건별로 하나의 JSON 블록:
{
  "case": "{case-id}",
  "evidenceStages": {
    "e-1": [
      { "stage": 0, "revealKey": "request_original", "question": { "text": "...", "attackVector": "context" } },
      { "stage": 1, "revealKey": "check_metadata", "question": { "text": "...", "attackVector": "..." } },
      { "stage": 2, "revealKey": "restore_context", "question": { "text": "...", "attackVector": "..." } }
    ],
    "e-2": [...],
    ...
  }
}

4건 모두 한 번에 출력해줘.
```

---

## GPT Pro 결과 수령 후

결과를 Thread A(Claude Code)에 전달하면:
1. 체크리스트 9항목 전수 검증 실행
2. 위반 발견 → 교정 후 CT에 보고
3. 위반 0건 → 배치 확정, 다음 배치 진행

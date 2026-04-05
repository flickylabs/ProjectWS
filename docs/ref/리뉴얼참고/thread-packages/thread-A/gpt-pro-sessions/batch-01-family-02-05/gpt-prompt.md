# GPT Pro 세션 — 배치 1: family-02~05 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `family-02-input.json` | 입력 — family-02 evidence/disputes/context |
| `family-03-input.json` | 입력 — family-03 evidence/disputes/context |
| `family-04-input.json` | 입력 — family-04 evidence/disputes/context |
| `family-05-input.json` | 입력 — family-05 evidence/disputes/context |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(family-02 ~ family-05)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
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
- family-02: "명절 뒤 거래처와 중개업소에 퍼진 가족 비밀의 직접 배후는 아들 강선우 본인보다, 그가 넘겨준 파일을 사촌 중개사에게 돌린 며느리 이민지 쪽에 더 가깝다."
- family-03: "박정우가 6개월 동안 월 60만원을 보내겠다고 약속해 놓고 3개월째부터 금액과 날짜를 흔든 건 사실이지만, 어머니 최복자도 그 돈을 '생활비만' 쓰겠다던 말을 깨고 딸 지원과 공개 압박을 섞어 갈등을 키웠다."
- family-04: "서하린과 서민규가 서로 '부모 돈을 빼돌렸다'고 몰아간 3,200만원 인출은 형제 중 누구의 횡령도 아니라, 부모가 장학재단에 기부한 돈을 공유폴더의 잘린 자료와 모호한 파일명 때문에 오해한 것이었다."
- family-05: "박은주가 딸의 독립을 막으려 현관 비밀번호와 임대인 연락망을 이용해 개입한 것보다 더 결정적인 문제는, 소현의 자백처럼 보인 31초 녹취가 은주가 세 통화를 잘라 붙여 만든 위조본이었다."

[출력 형식]
사건별로 하나의 JSON 블록:
{
  "case": "family-02",
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
3. 위반 0건 → 배치 1 확정, 배치 2 세션 폴더 준비

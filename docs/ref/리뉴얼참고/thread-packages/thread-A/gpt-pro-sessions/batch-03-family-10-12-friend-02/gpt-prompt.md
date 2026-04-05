# GPT Pro 세션 — 배치 03: family-10 ~ family-12, friend-02 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `family-10-input.json` | case-family-10 증거·쟁점 입력 |
| `family-11-input.json` | case-family-11 증거·쟁점 입력 |
| `family-12-input.json` | case-family-12 증거·쟁점 입력 |
| `friend-02-input.json` | case-friend-02 증거·쟁점 입력 |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(family-10, family-11, family-12, friend-02)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
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
- family-10: 유다은이 '민재가 또 명절 약속을 깨고 다 떠넘겼다'고 느낀 핵심에는 민재의 늦은 통보가 분명히 있었지만, 가장 큰 폭발점은 '금요일 밤에 갈게'처럼 보이던 한 줄 메시지가 실제로는 '되면 금요일 밤, 안 되면 토요일 아침'이었던 오해와 20만원 송금의 의미 혼선이었다.
- family-11: 오연숙이 손주를 지키려 개입했다고 주장한 현재 갈등의 밑바닥에는, 몇 해 전 같은 아이에게 성인용 감기약과 해열제를 중복 투여하고도 그 밤을 단순 고열로만 덮어 둔 더 큰 실수가 깔려 있다.
- family-12: 문지연이 가족방에 올린 '현우가 상갓집도 결국 정산이라며 엄마 통장부터 보자고 했다'는 캡처는 현우의 원문이 아니라, 현우의 비용 문의 두 줄과 지연이 나와의 채팅에 적어 둔 문장을 이어 붙여 만든 위조본이었다.
- friend-02: 가은의 비밀 연애와 동호회 역할 조정 이야기가 온라인 커뮤니티에 퍼진 출발점은 민재가 아니라, 민재가 넘긴 자료를 편집해 익명계정으로 뿌린 공통 친구 박서후였다.

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

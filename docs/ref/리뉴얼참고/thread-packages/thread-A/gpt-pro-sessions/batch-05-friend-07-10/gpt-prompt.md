# GPT Pro 세션 — 배치 05: friend-07 ~ friend-10 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `friend-07-input.json` | case-friend-07 증거·쟁점 입력 |
| `friend-08-input.json` | case-friend-08 증거·쟁점 입력 |
| `friend-09-input.json` | case-friend-09 증거·쟁점 입력 |
| `friend-10-input.json` | case-friend-10 증거·쟁점 입력 |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(friend-07, friend-08, friend-09, friend-10)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
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
- friend-07: 문제의 '임원 연애는 숨겨야 이득' 캡처는 진아가 서로 다른 시점의 메시지를 이어 붙여 과장한 것이지만, 더 핵심은 두 사람이 작년 소문 사태 뒤 '이해충돌이 생기는 비밀 연애는 운영진 1명에게만 함께 알린다'고 합의해 두고도 성호는 먼저 이를 어겼고 진아는 정해진 경로를 벗어나 확산시켰다는 점이었다.
- friend-08: 은비가 발표와 게시물에서 프로젝트를 지나치게 단독 성과처럼 보이게 만든 것은 맞지만, 공모전 제출 시스템의 대표자 필드와 둘의 느슨한 역할 정리 때문에 외부에는 원래부터 팀 프로젝트로 등록되어 있었고 준혁의 기여도도 최종본에 남아 있었다.
- friend-09: 문제의 익명 폭로와 후기 콜라주 유포는 도건의 단독 폭주가 아니라, 8개월 전 경쟁 셀러 조가람과의 공개 분쟁 앙금을 품은 유리와 도건이 시즌마켓 심사 직전에 함께 설계한 공모였고, 도건은 계정과 업로드를, 유리는 후기 편집과 확산을 맡고 있었다.
- friend-10: 공유 웨딩 체크리스트에서 '서아-들러리/축가' 항목은 하나의 확정 약속이 아니라 들러리는 진행중, 축가는 후보로 분리돼 있었고, 서아의 '그 주 비워볼게'와 키 확인 메시지를 다정은 둘 다 수락으로, 서아는 검토 단계로 기억해 같은 대화를 서로 다르게 굳혔다.

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

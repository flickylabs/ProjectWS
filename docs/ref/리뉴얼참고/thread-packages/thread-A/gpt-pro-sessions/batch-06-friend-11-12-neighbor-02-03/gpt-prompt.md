# GPT Pro 세션 — 배치 06: friend-11 ~ neighbor-03 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `friend-11-input.json` | friend-11 사건 데이터 |
| `friend-12-input.json` | friend-12 사건 데이터 |
| `neighbor-02-input.json` | neighbor-02 사건 데이터 |
| `neighbor-03-input.json` | neighbor-03 사건 데이터 |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(friend-11, friend-12, neighbor-02, neighbor-03)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
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
- **friend-11**: 최민우가 공유 게임 구독 계정의 접근권을 빼앗겼다고 호소한 출발점은 배준석의 선공 탈취가 아니라, 민우가 과거에 일회성으로 받았던 준석의 본인확인 정보와 청구지 정보를 무단 보관했다가 가족요금제 재인증에 다시 써서 주 관리자 메일을 자기 쪽으로 바꾼 행동이었다.
- **friend-12**: 공동 창작물 '새벽역'의 공개 화면과 공유 노션에서 보인 'song main: 윤수빈'과 'video main: 백재윤' 표시는 각 파트 책임 구분이었을 뿐 전체 소유권 표기가 아니었고, 둘은 최종 크레딧 시트를 끝내 만들지 않은 채 자기 쪽 라벨과 공개 카드만 보고 각자 더 큰 기여를 했다고 굳혀 버렸다.
- **neighbor-02**: 익명 전단의 출발점은 민규도 유나도 아니었다. 동대표 최병규가 관리사무소 민원과 반상회 발언을 짜깁기해 공용프린터로 출력한 PDF가 원본이다.
- **neighbor-03**: 반려견 상처는 물림이 아니라 자동줄이 배수구 철망에 감기며 생긴 마찰 열상이었다. 돌아다닌 19초 CCTV는 앞 8초를 삭제하고 속도를 바꾼 위조본이다.

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

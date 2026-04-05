# GPT Pro 세션 — 배치 11: partnership-09~12 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `partnership-09-input.json` | 사건 입력 데이터 |
| `partnership-10-input.json` | 사건 입력 데이터 |
| `partnership-11-input.json` | 사건 입력 데이터 |
| `partnership-12-input.json` | 사건 입력 데이터 |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(partnership-09, partnership-10, partnership-11, partnership-12)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
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
- partnership-09 (case-partner-09): 정부 지원금 수령의 결정적 근거가 된 실증 매장 수와 절감률은 인호와 다예가 함께 부풀린 허위 실적이었다.
- partnership-10 (case-partner-10): 민서의 합류는 준서의 계획적인 독단 채용이 아니라, 혜린의 '이번 주부터 한번 같이 돌아보자'는 말을 준서가 최종 승인으로 오해하면서 시작된 3일 체험근무였다.
- partnership-11 (case-partner-11): 독단 지점 오픈의 피해자를 자처한 아린은, 그보다 먼저 별도 법인 '아린셀렉트F&B'를 세우고 핵심 도매 거래처를 그 법인으로 넘길 준비를 해두고 있었다.
- partnership-12 (case-partner-12): 거래처에 직접적인 험담은 없었고, 행사 운영을 돕던 프리랜서가 두 사람의 별도 불만을 섞어 전달하면서 '서로를 못 믿는다'는 말로 와전됐다.

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

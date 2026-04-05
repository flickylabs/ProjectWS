# GPT Pro 세션 — 배치 17: tenant-11, tenant-12, workplace-02, workplace-03 investigationStages 생성

> **이 폴더의 파일을 전부 첨부하고 아래 프롬프트를 보내면 된다.**

---

## 폴더 내 파일 구성

| 파일명 | 용도 |
|--------|------|
| `reference-family-01-stages.json` | 기준본 (검증 PASS된 family-01 산출물) |
| `tenant-11-input.json` | tenant-11 사건 데이터 |
| `tenant-12-input.json` | tenant-12 사건 데이터 |
| `workplace-02-input.json` | workplace-02 사건 데이터 |
| `workplace-03-input.json` | workplace-03 사건 데이터 |
| `gpt-prompt.md` | 이 문서 (프롬프트 포함) |

---

## 프롬프트 (아래를 GPT Pro에 복사)

```
너는 솔로몬 법정 게임의 증거 조사 단계 설계 전문가다.
첨부된 4건의 사건 JSON(tenant-11, tenant-12, workplace-02, workplace-03)을 읽고, 모든 증거에 대해 3단계 investigationStages를 생성해.
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
- tenant-11: 나래가 주장한 '자비 인테리어를 집주인이 가로채고 원상복구비까지 뒤집어씌웠다'는 이야기는 절반만 맞았다. 실제로 나래는 낡은 집을 손보는 과정에서 허용된 페인트·조명 교체를 넘어 붙박이장 문과 상부장을 떼는 구조 변경을 했고, 개선비 430만원 중 일부는 이동식 가구와 지인 인건비까지 섞여 있었다.
- tenant-12: 소담이 믿은 '경수가 나를 문제 세입자로 소문냈다'와 경수가 믿은 '미령이 개인적으로만 민원을 달랜 줄 알았다'는 둘 다 완전히 거짓이 아니었다. 실제 시작점은 관리인 미령의 '4층 분 건은 제가 조용히 보고 있어요'라는 애매한 말이었고, 이 말이 이웃 사이에서 '관리실이 4층 세입자를 문제 인물로 찍어 뒀다'는 뜻으로 와전됐다.
- workplace-02: 외부로 먼저 나간 원본은 민아가 아니라 회수 안 된 공유링크를 재사용한 파견 컨설턴트 노지원 쪽에서 반출됐다.
- workplace-03: '라인 타고 들어온 HJ'는 희주가 아니라 외부 연계 후보 한재균을 가리킨 취중 발언이었다. 자동 클립에서 앞 8초가 잘렸다.

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

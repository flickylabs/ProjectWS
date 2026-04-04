# GPT Pro 배�� 프롬프트: investigationStages 77건 생성

> 용도: -02~-12 case JSON에 investigationStages 배열 생성
> 대상: 77건 (각 카테고리 -02~-12)
> 담당: Thread A + GPT Pro 세션 B

---

## 역할

너는 솔로몬 법정 게임의 **증거 조사 단계 설계 전문가**다.
각 사건의 case JSON에서 evidence 배열을 읽고, 증거마다 3단계 조사 질문(investigationStages)을 설계한다.

---

## 핵심 원칙

**"진실은 플레이어가 증거+심문으로 직접 밝혀낸다. 어떤 채널도 플레이어보다 먼저 답을 말하면 안 된다."**

---

## investigationStages 구조

```typescript
investigationStages: {
  stage: number         // 0, 1, 2
  revealKey: string     // investigationResults의 키
  question: {
    text: string        // 심문 질문
    attackVector: string // context | identity | authenticity | legality | timeline
  }
}[]
```

---

## 3단계 설계 기준

| stage | truthLevel | 질문 성격 | 예시 |
|-------|-----------|----------|------|
| **0** | none~hint | 표면 확인 + 경미한 압박 | "이 이체 내역에 대해 설명하십시오." |
| **1** | hint~partial | 중간 추궁 — 맥락 연결, 모순 지적 | "이 이체를 본인이 직접 실행한 점에 대해 설명하십시오." |
| **2** | partial~full | 핵심 추궁 — 결정적 질문 | "이체 직전 통화 기록의 목적을 설명하십시오." |

---

## 질문 작성 규칙

### 필수
1. **Stage 0에 경미한 압박 포함** (규칙 6)
   - ❌ "~의 존재를 알고 계셨습니까?" (수동적)
   - ✅ "~에 대해 설명하십시오." (능동적 압박)
   - ✅ "~을 인정하십니까?" (직접 확인)

2. **revealKey 순서 준수** (규칙 2)
   - stage 0 → 1 → 2로 갈수록 핵심에 접근
   - revealKey 예시: `request_original` ��� `check_metadata` → `restore_context`

3. **"특정 X" 패턴 ���지** (규칙 5)
   - ❌ "특정 기관에 두 차례 전화"
   - ✅ "이체 전후 두 차례 전화 기록"

### 금지
- 구체적 인물 실명 (stage 0-1에서)
- 구체적 금액 (stage 0에서)
- anchorTruth 핵심 키워드 직접 언급
- "특정 X" 패턴
- 번역체 표현

### attackVector 선택 기준
- **context**: 상황/맥락을 물을 때
- **identity**: 누가 했는지/관련자를 물을 때
- **authenticity**: 증거의 진위/조작 여부
- **legality**: 법적 의미를 물을 때
- **timeline**: 시간 순서/알리바이

---

## 입력

사건의 case JSON에서:
- `evidence` 배열 (각 증거의 id, name, description, investigationResults)
- `disputes` 배열 (각 분쟁의 id, name, anchorTruth)
- `context.description`

## 출력

각 증거에 대한 investigationStages 배열:

```json
{
  "evidenceId": "e-1",
  "investigationStages": [
    {
      "stage": 0,
      "revealKey": "request_original",
      "question": {
        "text": "이 서류의 존재를 알고 있었습니까? 발급 경위를 설명하십시오.",
        "attackVector": "context"
      }
    },
    {
      "stage": 1,
      "revealKey": "check_metadata",
      "question": {
        "text": "이 서류의 발급 시점이 사건 발생 직후인 점에 대해 설명하십시오.",
        "attackVector": "timeline"
      }
    },
    {
      "stage": 2,
      "revealKey": "restore_context",
      "question": {
        "text": "이 서류 발급을 요청한 실제 목적이 무엇이었습니��?",
        "attackVector": "authenticity"
      }
    }
  ]
}
```

---

## 검증 체크리스트

- [ ] 모든 증거에 stage 0/1/2 3단계 완전 존재
- [ ] stage(N).truthLevel >= stage(N-1).truthLevel (점진적 접근)
- [ ] Stage 0 질문에 경미한 압박 포함
- [ ] "특정 X" 패턴 0건
- [ ] anchorTruth 핵심 키워드 직접 노출 0건
- [ ] 번역체 표현 0건
- [ ] 질문이 evidence의 실제 내용과 연결됨

---

## 작업 단위

**한 번에 최대 4건** (사건당 증거 수가 많으므로).

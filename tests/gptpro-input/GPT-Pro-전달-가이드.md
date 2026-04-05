# GPT Pro 7세션 전달 가이드

## 파일 경로 (풀 경로)

```
D:\ProjectWS\tests\gptpro-input\spouse-transcript.md      (102KB, 12건)
D:\ProjectWS\tests\gptpro-input\family-transcript.md       (104KB, 12건)
D:\ProjectWS\tests\gptpro-input\friend-transcript.md       (105KB, 12건)
D:\ProjectWS\tests\gptpro-input\neighbor-transcript.md     (100KB, 12건)
D:\ProjectWS\tests\gptpro-input\partnership-transcript.md  (104KB, 12건)
D:\ProjectWS\tests\gptpro-input\tenant-transcript.md       (103KB, 12건)
D:\ProjectWS\tests\gptpro-input\workplace-transcript.md    (102KB, 12건)
```

## 세션 배치

| 세션 | 카테고리 | 파일 | 사건 수 | 턴 수 |
|------|----------|------|---------|-------|
| GPT-1 | spouse | spouse-transcript.md | 12건 | 240턴 |
| GPT-2 | family | family-transcript.md | 12건 | 240턴 |
| GPT-3 | friend | friend-transcript.md | 12건 | 240턴 |
| GPT-4 | neighbor | neighbor-transcript.md | 12건 | 240턴 |
| GPT-5 | partnership | partnership-transcript.md | 12건 | 240턴 |
| GPT-6 | tenant | tenant-transcript.md | 12건 | 240턴 |
| GPT-7 | workplace | workplace-transcript.md | 12건 | 240턴 |

## 각 세션에 보낼 메시지 (프롬프트 + 파일)

아래 프롬프트를 복사하여 각 세션에 전달하세요. `{category}` 부분만 해당 카테고리명으로 바꾸면 됩니다.
파일은 각 세션에 해당 카테고리의 `.md` 파일을 첨부합니다.

---

### GPT-1 (spouse) 전달 메시지

> 아래 프롬프트를 보내고, `spouse-transcript.md` 파일을 첨부하세요.

```
너는 솔로몬 법정 게임의 품질 분석 전문가다.
아래는 spouse 카테고리 12건의 플레이스루 트랜스크립트야.
각 사건의 대화 로그를 분석해서 다음 항목을 검증해줘.

[검증 A: 화자 시점/호칭]
- 재판관이 "제 아내/남편" 같은 NPC 1인칭 호칭 사용 여부 → CRITICAL
- 당사자가 상대를 올바른 호칭으로 부르는지 (관계에 맞는 호칭)
- 조사 정합성 (이/가, 을/를, 은/는)
- 1인칭 혼동 없음 (화자가 바뀌었는데 시점이 안 바뀌는 경우)

[검증 B: 한국어 품질]
- 번역체 9패턴:
  1. "~하는 것이 사실입니다" → "~한 건 맞습니다"
  2. "~에 대해 말씀드리겠습니다" → "~을 말씀드리겠습니다"
  3. "저는 ~라고 생각합니다" → "~라고 봅니다"
  4. "그것은 ~때문입니다" → "~때문입니다"
  5. "~하는 것은 아닙니다" → "~한 건 아닙니다"
  6. "~할 수 있는 상황이었습니다" → "~할 수 있었습니다"
  7. "~라는 점을 말씀드립니다" → "~입니다" (직접 진술)
  8. "상호 간의 합의" → "서로 합의" (한자어 과다)
  9. "해당 건에 대하여" → "그 건에 대해" (공문서체)
- "사전 상의/협의" 잔존 여부
- 같은 표현 2턴 연속 반복
- 어색한 조사/어미
- "~만을" 이중 조사

[검증 C: Truth Throttle]
- S0-S1에서 구체적 금액/인물명/기관명 노출 → CRITICAL
- S2에서 과도한 정보 공개 (아직 부분 인정 단계)
- S5에서 구체적 진실 포함 여부 (금액+인물+기관+목적 모두 등장해야 함)
- 스테이지 간 정보량 점진적 증가 확인

[검증 D: 캐릭터성/몰입감]
- archetype에 맞는 말투 차별화 (avoidant ≠ confrontational ≠ cold_logic 등)
- 감정 변화 곡선 자연스러움 (S0 부정 → S3 갈등 → S5 고백)
- 이전 발언과 모순되는 내용
- tell 발현 빈도와 자연스러움 (3~4턴에 1회 적절, 매턴 과다)

[검증 E: Hallucination]
- 사건 데이터에 없는 사실 생성 (인물명, 장소, 날짜, 금액)
- 금전 무관 사건에서 금전 표현 등장
- 증거에 없는 내용을 증거에서 봤다고 말하는 경우

[출력 형식]
사건별로:
{caseId}: PASS / FAIL
  CRITICAL: N건 (상세)
  FAIL: N건 (상세)
  WARN: N건 (상세)

마지막에 카테고리 종합:
총 12건 중 PASS: N건 / FAIL: N건
CRITICAL 총계: N건
가장 빈번한 문제 유형 TOP 3
```

---

### GPT-2 ~ GPT-7 전달 메시지

위와 동일한 프롬프트에서 첫 줄의 카테고리명만 변경:

| 세션 | 변경할 부분 | 첨부 파일 |
|------|------------|-----------|
| GPT-2 | "spouse" → "family" | family-transcript.md |
| GPT-3 | "spouse" → "friend" | friend-transcript.md |
| GPT-4 | "spouse" → "neighbor" | neighbor-transcript.md |
| GPT-5 | "spouse" → "partnership" | partnership-transcript.md |
| GPT-6 | "spouse" → "tenant" | tenant-transcript.md |
| GPT-7 | "spouse" → "workplace" | workplace-transcript.md |

---

## 실행 통계 (참고)

- 84건 전체: **1,680턴 실행, WARN 9건(0.54%), ERR 0건**
- 모델: gpt-4o
- WARN 분포: family 3건, partnership 2건, tenant 2건, friend 1건, workplace 1건
- WARN 내용: 대부분 반말 종결어미 경미한 잔존 (LLM 비결정적 변동)

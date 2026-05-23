# GPT Pro 작업 지시서 — spouse-01 interrogation 어색 잔존 통합 (124 entries)

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 batch 특이성**:
- 강조 부사·추상 명사 다중 패턴 단일 batch. 124 entries 1:1 polish.
- **interrogation channel** = 재판관/상대방이 NPC에게 심문하면 NPC가 답하는 자기 진술 영역
- spouse-01 사건 — 부부 사건 진실 누설 정책 부합 필수

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

다음 2개 file을 정독해서 polish 원칙을 학습:

- **`policy-01-natural-korean.md`** — 한국어 자연화 원칙 + NPC 적극 발화 5 차원 + 사용자 polish 패턴
- **`policy-02-truth-disclosure.md`** — spouse-01 진실 누설 정책

### 2단계. polish 진행

- **`batch-interrogation.md`** — 변경 대상 entries 표

### 3단계. 출력

각 entry별로 다음 형식:

```
ID:
변경 후: <<polish 결과 KO 한 줄 또는 두 줄>>
변경 영역: <<어떤 어색 패턴/요소 어떻게 자연화했는지 1~2줄>>
```

상단에 `## spouse-01 interrogation 어색 잔존 통합 (124 entries) 결과` 헤더.

---

## 핵심 원칙 요약

### ★ 본 batch 강조 원칙

1. **1:1 polish** — 각 entry 고유 텍스트. 동형 archetype 없음.

2. **interrogation channel 톤** — NPC가 심문에 답하는 자기 진술. 재판관 청유 어미 X.
   - lieState 단계 톤 보존 (S0 부인 / S1~S2 회피 / S3~S4 부분 인정 / S5 자백)
   - questionType 톤 보존 (fact_pursuit 사실 추궁 답변 / motive_search 동기 답변 / empathy_approach 감정 호소 답변)

3. **자기지시 정책**:
   - NPC 1인칭 자기 발화에서 **"본인 / 자신" 사용 X** — "저 / 제" 자연
   - 제3자 → NPC 지칭 영역은 "본인" 자연 (재판관 발화 — 본 batch는 NPC 답변이므로 해당 X)

4. **그렇게 53 + 그_부분 37 + 끝까지 15 + 완전히 10 + 진짜 4 + 그_판단 3 + 차분히 2 + 잔존** 영역 자연화 패턴:
   - "그렇게" 직역체 → 명확 표현 또는 제거
   - 격앙 영역 (외침)은 보존 OK, 차분 영역에서 자연화
   - 추상 referent "그 부분" → 구체 명사구 (그 정황 / 그 점 / 그 이유 등)
   - 직역 어미 다양화

5. **NPC 자기 발화 5 차원 적용** (policy-01):
   - 강력 어휘 완화
   - 모호 referent → 명확 동사구
   - 피동 회피
   - 직역체 → 내면 발화
   - 자연 완충재

6. **진실 누설 정책** (policy-02 정독 필수):
   - spouse-01 사건 hidden keyword 신규 도입 절대 X
   - lieState S5 자백 영역만 hidden 노출 OK (자백 frame)

---

## 출력 시 주의사항

1. ID 표 그대로 사용
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장 (원본 구조 따라)
3. 변경 영역은 짧고 명료하게
4. NPC 발화 톤 (재판관 청유 X) 보존
5. lieState 단계 톤 보존
6. **어색 패턴 강제 제거** + **어미 다양화**
7. **자기지시 정책**: NPC 1인칭 자기 발화에서 "본인 / 자신" 사용 X — "저 / 제" 자연
8. **진실 누설 자가 점검**: hidden keyword 신규 도입 X



---

## ★ 출력 파일 요청 (대화창 paste 부담 회피)

```
완성된 polish 결과를 **markdown 파일 (.md)로 저장하여 다운로드 링크를 제공해 주세요**.
파일명: `{batch-name}-result.md` (예: family01-interrogation-A-result.md)
파일 내용은 위 "출력 형식" 그대로 (헤더 + 각 entry polish 결과).
대화창 응답에는 간단한 요약(처리된 entry 수 / 우려 사항)만 표시하고 자세한 polish 결과는 파일로 다운로드 받게 해 주세요.
```

작업을 시작해 주세요.

# GPT Pro 작업 지시서 — family-01 small channel 어색 잔존 통합 (98 entries)

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 batch 특이성**:
- small channel 통합 batch (NPC 발화 영역 — judge_* 채널 제외)
- 채널 구성 (10개):
  - interrogation (57): NPC 자기 진술 (재판관 추궁에 답변, lieState 단계 톤 보존)
  - witness (4): NPC/증인 발화 (formal)
  - aftermath (10): NPC 자백 후 후일담 (감정 표출, late 단계)
  - mediation (2): NPC 화해/타협 발화
  - contradiction_pursuit (6): NPC가 상대 모순 지적·추궁
  - emotional_overload (3): NPC 감정 격앙·폭발 영역
  - evidence_discovery (4): 증거 발견 메타 발화
  - trust_action (4): 신뢰 행동 발화 (감정·관계 톤)
  - rapport_milestone (6): 관계 진전 milestone
  - contradict_milestone (2): 모순 발견 milestone
- 자기지시 정책 ([[feedback_self_reference_speaker_context]]):
  - **NPC 1인칭 자기 발화 영역**: "본인 / 자신" 사용 X → "저 / 제" 자연화 (정리 대상)
  - 본 batch entries 자기지시 영역 = 모두 정리 대상
- 패턴 분포: 추상명사:그_점: 41 + 강조부사:끝까지: 21 + 자기지시:자신: 17 + 강조부사:그렇게: 8 + 강조부사:완전히: 4 + 추상명사:그_부분: 4 + 직역어미:이어집니다: 3 + 피동:느껴집니다: 2 + 추상명사:그_판단: 1 + 강조부사:차분히: 1
- 98 unique entries 1:1 polish
- family-01 (가족·출생·자필·90:10·공장·유산) 진실 누설 정책 부합

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

- `policy-01-natural-korean.md` — 한국어 자연화 원칙 (19+5 차원)
- `policy-02-truth-disclosure.md` — family-01 진실 누설 정책

### 2단계. polish 진행

- `batch-small-channels-residual.md` (channel 열 표시. 채널별 톤 보존 + 자연화)

### 3단계. 출력

```
ID:
변경 후: <<polish 결과>>
변경 영역: <<자연화 영역 요약>>
```

상단에 `## family-01 small channel 어색 잔존 통합 (98 entries) 결과` 헤더.

---

## 핵심 원칙

1. **NPC 발화 톤 보존** — 채널별 톤 정합:
   - interrogation: lieState 단계 톤 (early=망설임, mid=흔들림, late=무너짐/자백)
   - dossier: formal honorific (재판관님 호명, 답변 격식)
   - aftermath: 후일담 감정 표출 (late 단계, 자백 후)
   - mediation: 화해/타협 톤
   - emotional_overload: 격앙·폭발 영역 (격앙 자연 영역 보존)
   - trust_action / rapport_milestone: 신뢰/관계 진전 감정 톤
   - contradiction_pursuit / contradict_milestone: 모순 지적·확인
   - witness: NPC/증인 formal 발화
   - interjection: 격앙/거부/방어 (짧은 끼어듦)
   - evidence_discovery: 증거 발견 메타
2. **NPC 호명 보존**: 김도윤 씨, 김민서 씨 (사건별 호명)
3. **자기지시 정책** (★ 핵심):
   - "본인 / 자신" → "저 / 제" 자연화 (NPC 자기 발화 영역 어색)
   - 예: "본인이 ~" → "저는 ~" / "자신의 책임" → "제 책임"
4. **직역 어미 자연화**:
   - "가리킵니다" → "맞물려/이어져 있습니다"
   - "드러납니다" → "확인됩니다 / 보이게 됩니다"
   - "이어집니다" → "연결됩니다 / 닿아 있습니다"
5. **강조 부사 정밀**:
   - "그렇게" — 격앙/감정 영역 외 정리
   - "끝까지" — 추궁 자연 영역 보존 / 직역체 정리
   - "차분히" — 직역체 영역 자연화
   - "완전히" — 단정 강조 다양화 (전부 / 통째로 / 다)
   - "철저히" — 단정 강조 다양화 (꼼꼼히 / 확실히)
   - "진짜" — 강조 부사 영역 정리 (그때 / 실제로)
6. **추상명사 구체화**:
   - "그 부분 / 그 점" → 구체 referent (그 항목 / 그 사실 / 그 대목 / 거기)
   - "그 판단 / 그 결론" → 구체 referent (그 답 / 그 사실)
   - "그 상황 / 그 흐름" → 구체 referent (당시 / 그 자리 / 그 시점 / 그 과정)
7. **피동 회피**: "느껴집니다 / 보여집니다 / 생각됩니다" → 능동 자연화
8. **진실 누설 자가 점검** (policy-02): family-01 진실 누설 정책: 5 keyword × dispute disclosure tier (출생/정후 돈/자필 90:10/공장 양보/유산).

---

## 출력 시 주의사항

1. ID 표 그대로 사용
2. 변경 후 텍스트는 자연 한국어 (원문 길이/리듬 보존)
3. 변경 영역은 짧고 명료
4. 채널별 NPC 톤 보존
5. **자기지시 정책**: "본인/자신" → "저/제" (NPC 자기 발화 영역)
6. **직역 어미 자연화**: 위 핵심 원칙 4번 영역 다양화
7. **진실 누설**: family-01 hidden keyword 신규 도입 X

---

## ★ 출력 파일 요청 (대화창 paste 부담 회피)

```
완성된 polish 결과를 **markdown 파일 (.md)로 저장하여 다운로드 링크를 제공해 주세요**.
파일명: `family01-small-channels-residual-result.md`
파일 내용은 위 "출력 형식" 그대로.
대화창 응답은 간단한 요약 (처리 entry 수 / 우려 사항)만 표시.
```

작업을 시작해 주세요.

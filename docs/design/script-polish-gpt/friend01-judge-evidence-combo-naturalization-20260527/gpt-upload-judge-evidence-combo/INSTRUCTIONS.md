# GPT Pro 작업 지시서 — friend-01 judge_evidence_combo 어색 잔존 (22 entries)

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 batch 특이성**:
- judge_evidence_combo channel — 재판관이 evidence 조합 (2개 이상)을 NPC에 제시하면서 추궁
- 차분히 6 + 이어집니다 5 + 끝까지 4 + 가리킵니다 3 + 그_결론 2 + 그_판단 2 + 그렇게 1 + 드러납니다 1 다중 패턴
- 22 unique entries 1:1 polish
- friend-01 사건 (친구·예비신랑·연락 기록·돈 흐름) 진실 누설 정책 부합

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

- `policy-01-natural-korean.md` — 한국어 자연화 원칙
- `policy-02-truth-disclosure.md` — friend-01 진실 누설 정책

### 2단계. polish 진행

- `batch-judge-evidence-combo.md`

### 3단계. 출력

```
ID:
변경 후: <<polish 결과>>
변경 영역: <<자연화 영역 요약>>
```

상단에 `## friend-01 judge_evidence_combo 어색 잔존 (22 entries) 결과` 헤더.

---

## 핵심 원칙

1. **재판관 청유 어미 톤 보존** — soft/mid/hard 3단계
2. **재판관 → NPC 호명 보존**: 최수민 씨, 예비신랑 (또는 사건별 호명)
3. **재판관 "본인" 사용 정책 부합** ([[design_self_reference_bonin_consistency]]) — 본 batch에서 정책 부합, 통일 대상 X
4. **직역 어미 자연화**: "가리킵니다" → "맞물려/이어져 있습니다", "드러납니다" → "확인됩니다"
5. **강조 부사 영역**: "끝까지" 추궁 자연 영역 보존 / "차분히" 직역체 영역 자연화 / "그렇게" 격앙 X (재판관 차분 톤이라 정리)
6. **추상명사 구체화**: "그 판단 / 그 결론" → 구체 referent
7. **NPC 자기 발화 5 차원** (policy-01)
8. **friend-01 진실 누설 정책** (policy-02): hidden keyword 신규 도입 X

---

## 출력 시 주의사항

1. ID 표 그대로 사용
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장
3. 변경 영역은 짧고 명료
4. 재판관 청유 톤 보존
5. 어색 패턴 강제 제거 + 어미 다양화
6. **자기지시 정책**: 재판관 → NPC 지칭에 "본인" 사용 OK (정책 부합 영역). NPC 자기 발화에는 "저/제"
7. **진실 누설**: friend-01 hidden keyword 신규 도입 X

---

## ★ 출력 파일 요청 (대화창 paste 부담 회피)

```
완성된 polish 결과를 **markdown 파일 (.md)로 저장하여 다운로드 링크를 제공해 주세요**.
파일명: `friend01-judge-evidence-combo-result.md`
파일 내용은 위 "출력 형식" 그대로.
대화창 응답은 간단한 요약(처리 entry 수 / 우려 사항)만 표시.
```

작업을 시작해 주세요.

# GPT Pro 작업 지시서 — spouse-01 Batch 3 (judge_contradiction + judge_witness_summon) polish

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 Batch 3은 두 채널 통합**: judge_contradiction (12 entries) + judge_witness_summon (9 entries) = 21 entries × 5 variants = 105건.

**★ 진실 누설 회피 영역**: "집안" / "위법" 직접 등장 contradiction entries 4 영역 회피형 재작성 필수.

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

다음 2개 file을 정독해서 polish 원칙을 학습:

- **`policy-01-natural-korean.md`** — 한국어 자연화 원칙 + 게임 톤 + 사용자 polish 패턴 example 13건 (★ 톤 학습 핵심)
- **`policy-02-truth-disclosure.md`** — spouse-01 진실 누설 정책 (★ 절대 준수)

### 2단계. Batch 3 polish 진행

- **`batch-03-contradiction-witness.md`** — Batch 3 (judge_contradiction 12 + judge_witness_summon 9, 도합 21 entries × 5 variants = 105건)

batch file은 다음 정보 포함:
- Frame (2 채널 / 4 dispute contradiction / 3 witness summon / tone-level 보존)
- **★ 진실 누설 위반 entries 4 영역 표 (회피형 재작성 필수)**
- 어색 패턴 사전 진단 표 (참고용)
- 변경 대상 contradiction 60건 + witness 45건 = 105건 표 (ID / KO 원본)

### 3단계. 출력

각 ID별로 다음 형식:

```
judgec-d-1-soft-v1:
변경 후: <<polish 결과 KO 한 줄>>
변경 영역: <<영역 1~3 줄, 어떤 번역체 영역을 어떻게 자연화했는지>>
```

상단에 `## Batch 3 결과` 헤더 + sub 섹션 `### Contradiction (60건)` / `### Witness Summon (45건)` 으로 구분.

---

## 핵심 원칙 요약

### 원칙 1. 번역체 최대한 배제
- 직역 어순, 추상명사 양극 대비, "보입니다·느껴집니다" 직역체 회피
- 단순 어휘 치환 X — **문장 구조 자체 자연화** 필요
- 정중 청유 어미 반복 다양화

### 원칙 2. 불필요한 의미 추가 절대 금지
- 원본에 없는 새 사실/단서/암시/평가/판단 추가 X

### 원칙 3. 게임 톤 = 법정 재판관 발화
- 격식체 + 자연 한국어 발화 균형
- tone (soft / mid / hard) 보존 (hard는 단정·즉시 톤)
- NPC 호명 ("이준호 씨" / "박지연 씨" / "두 분") 유지
- Witness summon은 호명 형식 ("오피스텔 경비님" / "은행 직원님" / "박미라 씨") 보존

### 원칙 4. ★ 진실 누설 절대 회피 (Batch 3 핵심)
- `policy-02-truth-disclosure.md` 의 hidden 키워드 목록 모두 회피
- "집안" / "가족" / "위법" / "범죄" / "위조" 단어 단위 등장 절대 X
- 본 batch frame 영역의 **★ 진실 누설 위반 4 entries (judgec-d-2-mid-v1, judgec-d-2-mid-v4, judgec-h-d3-hard-v4, judgec-h-d4-hard-v3)** 회피형 재작성 필수
- 의미는 "다른 곳" / "별도 사용처" / "법적 책임이 따르는 행위" / "선을 넘은 행동" 등 모호 referent로 전달

---

## 출력 시 주의사항

1. 각 ID는 원본 file의 ID 그대로 사용 (`judgec-` / `judgewit-` 접두사 구분)
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장 (원본 구조 따라)
3. 변경 영역은 짧고 명료하게 (어떤 어색 패턴을 어떻게 자연화했는지)
4. 추측·해설 추가 X — polish 결과만 명확히 제시
5. tone(level) 차이 보존 — hard variants는 단정·즉시 톤 유지
6. **★ 진실 누설 자가 점검 필수** — polish 결과에 hidden 키워드 등장 X
7. **★ 4 위반 entries는 회피형으로 반드시 재작성** (frame 영역 표 참조)
8. Witness summon은 호명 형식 ("오피스텔 경비님" 등) 보존

작업을 시작해 주세요.

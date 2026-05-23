# GPT Pro 작업 지시서 — spouse-01 evidence_present Batch 2 (e-4+e-5+e-6+e-7) 자연화

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 batch는 NPC 발화 영역** (재판관 발화 X). NPC가 evidence 제시받고 반응하는 자기 진술. 어색 패턴이 사전 검출된 45 variants 자연화.

본 batch는 **B 자금 영역 (e-4/e-5) + A 송금·위임장 영역 (e-6/e-7)** 모두 포함.

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

다음 2개 file을 정독해서 polish 원칙을 학습:

- **`policy-01-natural-korean.md`** — 한국어 자연화 원칙 + **NPC 적극 발화 5 차원** + 사용자 polish 패턴 (★ 톤 학습 핵심)
- **`policy-02-truth-disclosure.md`** — spouse-01 진실 누설 정책 (hidden 키워드 신규 도입 X)

### 2단계. Batch 2 polish 진행

- **`batch-02-e4-e5-e6-e7.md`** — Batch 2 (e-4 발신자 미상 문자 / e-5 개인 계좌 출금 / e-6 투자방 텔레그램 / e-7 송금 기록, 45 variants 자연화)

batch file은 다음 정보 포함:
- Evidence Frame (e-4~e-7 각 evidence 의미 + 진실 영역)
- lieBand · stage 의미 가이드 (특수 stage 포함: check_metadata / request_original / restore_context)
- 변경 대상 45 variants 표

### 3단계. 출력

각 ID별로 다음 형식:

```
a-e-4-early-1-v...:
변경 후: <<polish 결과 KO 한 줄 (또는 두 줄)>>
변경 영역: <<어떤 어색 패턴 (강조 부사/추상명사/직역 어미/피동) 자연화했는지 1~2줄>>
```

상단에 `## Batch 2 결과` 헤더.

---

## 핵심 원칙 요약

### 원칙 1. NPC 자기 발화 영역 (★ 본 batch 핵심)
- NPC가 자기 진술하는 발화 — 재판관 청유 어미 X
- "...했습니다 / ...입니다 / ...였습니다" NPC 발화 어미
- "재판관님" 호명 보존
- 5 차원 적용: 강력 어휘 완화 / 모호 referent → 명확 동사구 / 피동 회피 / 직역체 → 내면 발화 / 자연 완충재

### 원칙 2. 어색 패턴 정밀 자연화
본 batch entries는 다음 패턴 사전 검출됨:
- 강조 부사 ("그렇게 / 차분히 / 끝까지")
- 추상명사 ("그 사정 / 그 흐름 / 그 판단")
- 직역 어미 ("가리킵니다 / 이어집니다")
- 피동 어색 ("느껴집니다")

각 패턴에 맞는 자연화 적용. 사용자 polish 패턴 (policy-01) 참고.

### 원칙 3. lieBand 톤 보존
- early: 회피·부정·방어
- mid: 부분 인정·변명
- late: 진실 인정 (★ hidden 키워드 보존 OK)

### 원칙 4. 특수 stage 톤 보존 (e-6/e-7에 다수)
- check_metadata: 첫 자료 제시 시 NPC가 자료 자체 검증
- request_original: NPC가 원본 추가 요청 (방어)
- restore_context: NPC가 자료의 맥락 보강

### 원칙 5. 진실 누설 정책
- hidden 키워드 신규 도입 X (가족/집안/시댁/형/회생/형사/사기/횡령/범죄/위조/위법)
- **band=late entries 원본에 등장하는 hidden 키워드는 보존** (이미 진실 노출 단계)
- policy-02 자가 점검 list 확인

---

## 출력 시 주의사항

1. 각 ID는 표의 ID 그대로 사용
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장 (원본 구조 따라)
3. 변경 영역은 짧고 명료하게
4. 추측·해설 추가 X — polish 결과만 명확히 제시
5. NPC 발화 톤 보존 (재판관 청유 X)
6. lieBand 단계 톤 보존
7. 특수 stage (check_metadata / request_original / restore_context) 톤 보존
8. band=late 단계 hidden 키워드 보존 OK / 다른 단계는 신규 도입 X

작업을 시작해 주세요.

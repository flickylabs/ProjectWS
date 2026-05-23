# GPT Pro 작업 지시서 — family-01 evidence_present 어색 패턴 5 archetype 자연화 (19 entries 일괄)

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 batch 특이성**:
- **family-01 사건** (★ spouse/friend 아님 — 진실 정책 별도)
- evidence_present 1560 var 중 어색 "그 부분" 19 hits 검출
- **5 unique archetypes** = 19 entries (효율 3.8x per polish)
- 모두 **B 발화 (윤정후)** late stage = 진실 인정 단계
- 1 core archetype (Arch 1) + 4 보강 variant (Arch 2 base + prefix/suffix 변형)

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

다음 2개 file을 정독해서 polish 원칙을 학습:

- **`policy-01-natural-korean.md`** — 한국어 자연화 원칙 + NPC 적극 발화 5 차원 + 사용자 polish 패턴
- **`policy-02-family01-truth-disclosure.md`** — family-01 진실 누설 정책 (★ spouse/friend 정책과 다름)

### 2단계. Batch polish 진행

- **`batch-family01-archetypes.md`** — 5 archetype 그룹 polish 요청

### 3단계. 출력

각 archetype별로 다음 형식:

```
Archetype N (sample id):
변경 후: <<polish 결과 KO 한 줄 또는 두 줄>>
변경 영역: <<어떤 어색 패턴 어떻게 자연화했는지 1~2줄>>
```

상단에 `## family-01 Batch 결과` 헤더.

---

## 핵심 원칙 요약

### ★ 본 batch 강조 원칙

1. **archetype 단위 polish** — 1 polish → 1~10 entries 동시 적용. evidence-specific 동사 X.

2. **family-01 화자 톤**:
   - **B = 윤정후** (defendant): 동생, 어머니를 직접 모셨고 공증 단계에서 진행을 재촉한 정황. late stage = 부분 인정 톤. "...부정하지 않겠습니다 / 설명하겠습니다 / ...할 부분입니다" 발화.

3. **family-01 진실 누설 정책** (policy-02 참조):
   - 모든 archetype이 **B late stage** → 진실 인정 단계 영역
   - 그 부분 = 자기 책임 인정 또는 후술 약속 referent
   - hidden keyword 신규 도입 X (출생 비밀 / 자필 90:10 / 친부 실명 절대 X)
   - 90:10 (e-5) / 진행 재촉 (e-4) 영역 hidden 키워드 보존 OK (late stage)

4. **어색 패턴 자연화**:
   - 추상명사 "그 부분" 19 hits — 다음 자연화 권장:
     - Arch 1 (그 부분까지 설명하겠습니다): "그 단계가 열리면 함께 말씀드리겠습니다" / "남은 영역도 그때 설명하겠습니다" 등 후술 약속 자연 표현
     - Arch 2-5 (그 부분을 부정하지 않겠습니다): "그 정황을 부정하지 않겠습니다" / "그 사실을 부정하지 않겠습니다" / "그 점은 인정합니다" 등 명확 referent

5. **NPC 자기 발화 5 차원 적용** (policy-01):
   - 강력 어휘 완화
   - 모호 referent → 명확 동사구
   - 피동 회피
   - 직역체 → 내면 발화
   - 자연 완충재

6. **보강 variant 일관성**:
   - Arch 2 core + Arch 3 (suffix "기록에 남은 범위") + Arch 4 (prefix "제가 직접 설명") + Arch 5 (suffix "제가 직접 설명")
   - core polish 적용 후 보강 문장 자연 결합

---

## 출력 시 주의사항

1. Archetype N 번호 + sample ID 명기 (예: `Archetype 1 (b-e-5-late-stage1-v1)`)
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장
3. 변경 영역은 짧고 명료하게
4. **archetype 자연화 — 1~10 entries 동시 적용 영역** — evidence-specific 동사 X
5. NPC 발화 톤 (재판관 청유 X) 보존
6. **B late stage 부분 인정 톤 보존** ("부정하지 않겠습니다 / 설명하겠습니다")
7. **family-01 hidden keyword 신규 도입 X** (출생 비밀 / 친부 실명 / 90:10 단정 등)
8. **호명**: "어머니" 보존

작업을 시작해 주세요.

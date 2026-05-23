# GPT Pro 작업 지시서 — friend-01 evidence_present 어색 패턴 9 archetype 자연화 (80 entries 일괄)

## 당신의 역할

당신은 한국어 게임 시나리오 자연화 전문가입니다. 본 폴더의 file들을 정확히 읽고 polish 작업을 수행해 주세요.

**★ 본 batch 특이성**:
- **friend-01 사건** (★ spouse-01 아님 — 진실 정책 별도)
- evidence_present 1485 var 중 어색 패턴 80 hits 검출
- **9 unique archetypes** = 80 entries (효율 8.9x per polish work)
- 동형 그룹 구조 (각 archetype 동일 텍스트가 7-14 entries에 공유)
- 3 core archetype + 6 보강 variant (prefix/suffix 추가)

---

## 작업 순서

### 1단계. 정책 file 학습 (필수)

다음 2개 file을 정독해서 polish 원칙을 학습:

- **`policy-01-natural-korean.md`** — 한국어 자연화 원칙 + NPC 적극 발화 5 차원 + 사용자 polish 패턴
- **`policy-02-friend01-truth-disclosure.md`** — friend-01 진실 누설 정책 (★ spouse 정책과 다름)

### 2단계. Batch polish 진행

- **`batch-friend01-archetypes.md`** — 9 archetype 그룹 polish 요청

batch file은 다음 정보 포함:
- 사건 구도 (송다은 A 매도 / 최수민 B 경고+침묵)
- 각 archetype 영역 (party, lieBand, evidence, stage)
- 어색 패턴 (이어집니다 / 자신 / 끝까지)
- KO 원본 + 진실 노출 단계 메모

### 3단계. 출력

각 archetype별로 다음 형식:

```
Archetype N (sample id):
변경 후: <<polish 결과 KO 한 줄 또는 두 줄>>
변경 영역: <<어떤 어색 패턴 어떻게 자연화했는지 1~2줄>>
```

상단에 `## friend-01 Batch 결과` 헤더.

---

## 핵심 원칙 요약

### ★ 본 batch 강조 원칙

1. **archetype 단위 polish** — 1 polish → 7~14 entries 동시 적용. evidence-specific 동사 X.

2. **friend-01 화자 톤**:
   - **A (송다은, claimant)**: `premature_summary` archetype — 결론 먼저 / 맥락 후. 후회 톤 가능.
   - **B (최수민, defendant)**: `affect_flattening` archetype — 감정 평평 / 사실만 나열 / 가장 아픈 이야기에서 톤 평평.

3. **friend-01 진실 노출 정책** (policy-02 참조):
   - **그룹 1** 예비신랑 선 넘기: d-2 S3 이후 인정 가능
   - **그룹 2** 아버지 사기/미상환: d-3/d-4 S3 이후
   - **그룹 3** B 경고 의도: d-1 S3 이후
   - **그룹 4** 과거 손절 원인 (아버지): d-4 S3 이후
   - 본 batch entries는 **late stage 일부 진실 인정 영역** — hidden keyword 보존 OK
   - early stage entries (e-6 b-early): 송금 인정 + 이유 회피 톤 보존

4. **어색 패턴 자연화 영역**:
   - 직역어미 "이어집니다" (35 hits, 4 archetypes) → 자연 술어 ("맞물려 있습니다" / "여기서 만납니다" / "같은 줄거리 위에 있습니다" 등)
   - 자기지시 "자신" (35 hits, 4 archetypes) — 본 entries는 명사 "자신감"의 줄임 ("말할 자신이 없다 = 용기 없다"). 자연 표현 대체 ("말할 용기가 없었습니다" / "말이 나오지 않았습니다" / "차마 말하지 못했습니다")
   - 강조부사 "끝까지" (10 hits, 1 archetype) → 명확 표현 ("선후관계만으로는 단정하기 어렵습니다" / "지금 단계에서 단정하기는 어렵습니다")

5. **NPC 자기 발화 5 차원 적용** (policy-01):
   - 강력 어휘 완화
   - 모호 referent → 명확 동사구
   - 피동 회피
   - 직역체 → 내면 발화
   - 자연 완충재

6. **archetype 보강 variant 일관성**:
   - 같은 core archetype의 prefix/suffix variant ("양쪽 말을 함께 놓고 봐야 합니다" / "기록에 남은 범위까지만 말씀드리겠습니다" / "제가 직접 설명해야 할 부분입니다")는 core polish와 일치하는 변형으로 자연화
   - 보강 문장 자체도 함께 자연화 가능 (필요 시)

---

## 출력 시 주의사항

1. Archetype N 번호 + sample ID 명기 (예: `Archetype 1 (a-e-5-late-both-v1)`)
2. 변경 후 텍스트는 자연 한국어 한 문장 또는 두 문장 (원본 구조 따라)
3. 변경 영역은 짧고 명료하게
4. **archetype 자연화 — 7~14 entries 동시 적용 영역** — evidence-specific 동사 X
5. NPC 발화 톤 (재판관 청유 X) 보존
6. **친구 호명 보존**: "다은이" (B → A) / "최수민" (A → B)
7. **lieBand 톤 보존**:
   - early (Archetype 2/7/8/9): 회피·자기 보호 ("말할 자신/용기가 없었습니다")
   - late (Archetype 1/3/4/5/6): 진실 인정 또는 보류 ("이어집니다" / "단정 어렵습니다")
8. **진실 누설 자가 점검** — late stage 영역은 hidden keyword 보존 OK (아버지 돈 / 예비신랑 / B 경고 이유). early entries는 hidden keyword 신규 도입 X.

작업을 시작해 주세요.

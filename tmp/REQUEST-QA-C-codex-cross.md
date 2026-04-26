# QA Thread C 의뢰 — 스크립트 중심 QA Cross Check (Codex)

## 작업 목표
**QA Thread B (Claude) 결과를 cross-check** + **통계/패턴 강점 추가 분석**.

QA-B는 의미/맥락 차원의 검토. QA-C는 그 결과를 검증 + 정량 패턴 분석으로 보완.

## 입력
- QA Thread B 산출물: `tmp/QA-B-script-{report.md,findings.json}`
- 3 사건 통합본:
  - `src/data/scriptedText/{spouse,family,friend}-01.json`
  - `src/data/cases/generated/{spouse,family,friend}-01.json`

## 작업 (100 tasks 분리: Part A 50 + Part B 50)

### Part A: QA-B 결과 cross-check (50 tasks)

QA-B의 P0/P1/P2 patches를 검증:

1. **사건 설정 일치 검증**
   - QA-B가 발견한 사건 설정 충돌 (예: family-01 비율 위반) 확인
   - 새로 발견되는 충돌 추가 보고

2. **patch.before 본문 정확도**
   - QA-B patch의 before가 실제 통합본 text와 일치하는지
   - 미스매치 발견 시 P0

3. **patch.after 의미 정확도**
   - QA-B patch가 9차원 차원에서 의미 보존하는지
   - "단순 어휘 교체"로 회귀한 patch 발견 시 보고

4. **호칭/존칭/합니다체 cross-check**
   - QA-B가 놓친 호칭 위반 보고

5. **Truth Throttle 일관성**
   - lieState 단계별 정보 노출 정확성 cross-check

### Part B: 통계 패턴 분석 (50 tasks)

Codex 강점 활용:

1. **Trigram 분석**
   - 채널별 trigram-overlap ≥ 0.6 후보 (변수 치환 패턴 정량 검출)
   - 특히 judge_evidence_combo / judge_witness_summon

2. **Character Voice 분포**
   - archetype별 verbal tell 빈도 분석
     - victim_cosplay: helplessness marker
     - avoidant: answer_delay / 모호어
     - confrontational: 강한 단정 횟수
     - affect_flattening: 감정 marker 0%
     - premature_summary: 빠른 결론 marker
   - 사건/lieState별 분포

3. **Truth Throttle 곡선**
   - lieState별 사건 핵심 fact 노출 빈도
   - S0~S2 위반 / S3+ 누락 정량

4. **Variant 다양성**
   - cell당 5~10 variants의 실제 다양성 (length / unique words / structure)
   - 단조 cell 검출

5. **신규 4 채널 정량**
   - judge_evidence_combo: 두 증거 함의 본문 녹음 정도
   - judge_witness_summon: 증인 톤 다양성
   - rapport/contradict_milestone: 단계별 차별화

6. **사건 설정 본문 매트릭스**
   - 핵심 fact 본문 분포 (예: family "60", "40", "90" / friend "9일", "11번")
   - lieState × fact 매트릭스

## 사건 설정 (절대 충돌 금지)

### spouse-01
- 5,000만 원 / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기

### family-01 ⚠️
- **A 40 / B 60** (B가 90→60 줄임). 절대 반대 X.
- 출생 비밀 / 20년 지원 / 일기장

### friend-01
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복

## 출력 포맷

### 산출물 1: `tmp/QA-C-cross-report.json`

```json
{
  "meta": {
    "generatedAt": "...",
    "totalTasks": 100,
    "qaB_input": "tmp/QA-B-script-findings.json"
  },
  "partA_crossCheck": {
    "totalTasks": 50,
    "qaB_agreementWeight": "85%",
    "agreementBreakdown": {
      "fullAgreement": N,
      "partialAgreement": N,
      "differentFinding": N
    },
    "additionalFindings": [/* QA-B가 놓친 항목 */],
    "qaB_patchValidation": [
      {
        "qaBPatchId": "xxx",
        "qaB_after": "...",
        "qaC_assessment": "P0/P1/P2 일치 / 의미 손상 우려 등",
        "qaC_recommendation": "..."
      }
    ]
  },
  "partB_statistics": {
    "totalTasks": 50,
    "trigramAnalysis": {
      "channels": {
        "judge_evidence_combo": { "candidates_60_overlap": N, "samples": [...] },
        ...
      }
    },
    "characterVoiceDistribution": {
      "spouse-01": {
        "박지연_victim_cosplay": { "helplessness_marker_global": "X/Y (Z%)", ... },
        ...
      }
    },
    "truthThrottleCurve": {
      "spouse-01": { "S0~S2_violation": N, "S3+_omission": N },
      ...
    },
    "variantDiversity": {
      "monotone_cells": [...],
      "highDiversity_cells": [...]
    },
    "facts_distribution": {
      "family-01": {
        "60": { "S0": N, "S1": N, "S2": N, "S3": N, "S4": N, "S5": N },
        "90": { ... },
        ...
      }
    }
  },
  "p0_recommended": [/* QA-B + QA-C 종합 P0 */],
  "p1_recommended": [...],
  "p2_recommended": [...]
}
```

### 산출물 2: `tmp/QA-C-cross-summary.md`

- QA-B와의 동의도 (가중)
- 추가 발견 사항
- 통계 핵심 (trigram / archetype / Truth Throttle)
- 종합 P0/P1/P2 권장

### 산출물 3: `tmp/QA-C-cross-audit.cjs`

재현 가능한 audit 스크립트:
- trigram analyzer
- archetype marker counter
- truth throttle violator detector

## 검증 절차

1. QA-B 산출물 입력
2. 각 P0/P1 patch에 대해 cross-check (Part A)
3. 사건 설정 충돌 우선 검증
4. 통계 패턴 분석 (Part B)
5. 종합 P0/P1/P2 권장

## 잘못 패턴 #1~#8 회피

(QA-A 동일)

## 메모리 참조
- 동일

# Thread-QW-Cross (Codex) — 스크립트 QA Cross Check + 통계 600 tasks

## 작업 목표
**Thread-QW (Claude) 결과 cross-check + Codex 통계 강점 활용**.
Claude는 의미/맥락 깊이. Codex는 광범위 정량/패턴/cross-validation으로 보완.

3 사건 통합본 14,931 variants 광범위 정량 분석 + Claude P0/P1/P2 검증 + 추가 발굴.
**600 tasks 분배**: Part A cross-check 200 + Part B 통계 200 + Part C 추가 발굴 200.

## 입력
- **Thread-QW Claude 산출물**: `tmp/qa-redo-20260426/QA-QW-claude-{report.md,findings.json}`
- 3 사건 통합본:
  - `src/data/scriptedText/{spouse,family,friend}-01.json`
  - `src/data/cases/generated/{caseId}.json`
- (참고) Thread-Q Codex 산출물 (있으면): `tmp/qa-redo-20260426/QA-Q-codex-*`

---

## Part A: Claude QW 결과 Cross-Check (200 tasks)

### A.1 P0 patches 검증 (60 tasks)
Claude가 P0로 분류한 모든 patches를:
1. **사건 설정 일치 검증** (잘못 패턴 #8)
   - family-01 비율 / friend-01 사건 fact / spouse-01 사건 fact
2. **patch.before 본문 정확도** (실제 통합본 text와 일치)
3. **patch.after 의미 정확도** (9차원 맥락에서 보존 / 개선)
4. **단순 어휘 교체로 회귀** (잘못 패턴 #6 위반) 발견 시 보고
5. **회의 사항** (Codex가 동의 / 부분 동의 / 반대) 분류

### A.2 P1 patches 검증 (50 tasks)
- Truth Throttle / 잘못 패턴 #6 / 변수 치환 / 깨진 조사
- Claude 우선순위 검증 (P0 승격 권장 / P2 강등 권장)

### A.3 P2 patches 검증 (40 tasks)
- 다양성 부족 / archetype voice 약함
- 메인 작업으로 판단 권장 / 자동 보정 가능 분류

### A.4 사용자 모범 4 patch 적용도 cross-check (50 tasks)
- Claude 보고 적용도 통계 검증
- 누락된 적용 entries 발굴

---

## Part B: 통계/패턴 분석 (Codex 강점) (200 tasks)

### B.1 Trigram Analysis — 변수 치환 패턴 정량 (40 tasks)
- 채널별 trigram-overlap ≥ 0.6 candidates
- 특히 judge_evidence_combo / judge_witness_summon (사용자 가장 강조 영역)
- top 10 단조 cells / 사건별 분포

### B.2 Character Voice 분포 (40 tasks)
archetype별 verbal tell / 톤 marker 빈도:
- **victim_cosplay** (박지연): helplessness marker, 강한 단정 횟수
- **avoidant** (이준호): answer_delay / 모호어 ("쪽", "그쪽") 분포
- **confrontational** (윤태성): 강한 단정 / 단정형 종결어미
- **affect_flattening** (윤정후, 최수민): 감정 marker 0%, 침착 표현
- **premature_summary** (송다은): 빠른 결론 marker, 후회 표현
- 사건/lieState/channel별 분포

### B.3 Truth Throttle 곡선 (30 tasks)
- lieState (S0~S5) × 사건 핵심 fact 노출 빈도 매트릭스
- 사건별:
  - spouse: "3,000만원", "위임장", "박미라", "투자 사기"
  - family: 비율 "60", "40", "90", "출생 비밀", "일기장"
  - friend: "9일", "11번", "아버지 돈", "사기"
- S0~S2 위반 / S3+ 누락 정량

### B.4 Variant 다양성 정량 (30 tasks)
- cell당 5~10 variants의 실제 다양성
- Levenshtein distance / Jaccard similarity
- 단조 cells (다양성 부족) 검출
- 채널별 / 사건별 분포

### B.5 신규 4 채널 정량 (30 tasks) ★
- **judge_evidence_combo**: 두 증거 함의 본문 녹임 정도
  - 단순 이름 나열 vs 함의 풀어쓰기 분류
  - 사건별 dossier 카드 의미 정확도
- **judge_witness_summon**: 증인 톤 다양성 + 실명 사용도
- **rapport_milestone** / **contradict_milestone**: 단계별 차별화

### B.6 사건 설정 본문 매트릭스 (30 tasks)
- 핵심 fact 본문 분포 (예: family "60", "40", "90", "출생 비밀")
- lieState × fact × party 매트릭스
- **family-01 비율 정합 검증** (A 40/B 60 일관성):
  - "B 90→60 줄임" 표현 빈도
  - "A 60/B 40" 반대 패턴 잔존 검출 (P0 즉시)
  - "원본 B 90/A 10" → "조작 A 40/B 60" 흐름 검증

---

## Part C: Claude가 놓친 영역 추가 발굴 (200 tasks)

### C.1 14,931 variants 광범위 자동 검출 (60 tasks)
Claude는 sample 1,000~6,000건 검토 → 나머지 8,000~13,000건 광범위 정량:
- 잘못 패턴 #6 (noun_action / weak_쪽 / 사용자 모범 4)
- 깨진 조사 / 번역체 / 기계적 관찰문
- 호칭 / 합니다체 / 부인 동사
- Truth Throttle 위반

### C.2 채널간 일관성 정량 (40 tasks)
- 같은 (party, disputeId, lieState) 조합에서 채널간 톤 차이
- interrogation S0 → S1 → S2 단계 변화 정량
- emotional_overload / interjection 발동 시점 vs interrogation lieState 정합

### C.3 사건간 비교 (30 tasks)
- 동일 채널 (예: judge_question)의 사건간 톤 가이드 적용도
- 신규 4 채널 cells 카운트 차이 (사건별 dossier 수)
- archetype별 표현 다양성 비교

### C.4 코드 레벨 fallback 정량 (30 tasks)
- Thread-Q (Codex 일반)에서 발굴된 fallback 표현 외 추가
- ScriptedText에 미치환 변수 잔존 (`${...}` 검출)
- 동적 메시지 템플릿 기계적 패턴

### C.5 의미 모호 / 의미 불명 표현 검출 (40 tasks) ★
사용자 강조 영역. Codex 통계로 광범위 검출:
- 너무 일반적 / 추상적 표현 (사건 맥락 없이 의미 불명)
- 두 번 읽어야 의미 파악되는 표현 (문장 구조 복잡 / 모호)
- 단순 기계식 표현 (변수 치환식)
- 단조 cells (5 variants 다양성 부족)
- 사건 핵심 사실 누락된 표현 (추상화 너무 심함)

---

## 사건별 핵심 설정 (절대 충돌 금지)

(자세한 내용은 `gpt-pro-runs/script-redo-20260426/source/04-story-v2-3cases.md` 참조)

### spouse-01
- A 박지연 (victim_cosplay) / B 이준호 (avoidant)
- 5,000만원 증발 / 형 빚 / 조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기

### family-01 ⚠️
- A 윤태성 (confrontational) / B 윤정후 (affect_flattening)
- **유서 비율 A 40 / B 60** (B가 자기 몫 90→60). 절대 반대 X.
- 출생 비밀 / 20년 지원 / 어머니 일기장 / 1억 막음

### friend-01
- A 송다은 (premature_summary) / B 최수민 (affect_flattening)
- 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복

---

## 출력 포맷

### 산출물 1: `tmp/qa-redo-20260426/QA-QW-Cross-codex-report.json`

```json
{
  "meta": {
    "generatedAt": "...",
    "totalTasks": 600,
    "qaQW_input": "tmp/qa-redo-20260426/QA-QW-claude-findings.json",
    "qaQ_input": "tmp/qa-redo-20260426/QA-Q-codex-report.json (참고)",
    "scope": "ScriptedText 14931 variants"
  },
  "partA_crossCheck": {
    "totalTasks": 200,
    "qaQW_agreement_weight": "85%",
    "agreementBreakdown": {
      "fullAgreement": N,
      "partialAgreement": N,
      "differentFinding": N,
      "Claude_overlooked": N
    },
    "p0_validation": [
      {
        "qaQW_patchId": "...",
        "qaQW_after": "...",
        "qaC_assessment": "P0 일치 / 의미 손상 우려 / ...",
        "qaC_recommendation": "...",
        "case_setting_check": "정합 / 충돌"
      }
    ],
    "p1_validation": [...],
    "p2_validation": [...],
    "user_pattern4_application": {
      "qaQW_count": N,
      "qaC_validated": M,
      "missing": K
    }
  },
  "partB_statistics": {
    "totalTasks": 200,
    "trigramAnalysis": {
      "by_channel": {
        "judge_evidence_combo": { "candidates_60_overlap": N, "samples": [...] },
        ...
      },
      "by_case": { ... }
    },
    "characterVoiceDistribution": {
      "spouse-01": {
        "박지연_victim_cosplay": { "helplessness_marker_global": "X/Y (Z%)", "강한_단정": N },
        "이준호_avoidant": { "answer_delay": ..., "모호어_쪽": ... },
      },
      "family-01": { "윤태성_confrontational": ..., "윤정후_affect_flattening": ... },
      "friend-01": { "송다은_premature_summary": ..., "최수민_affect_flattening": ... }
    },
    "truthThrottleCurve": {
      "spouse-01": {
        "S0": { "3000만원": N, "위임장": N, "박미라": N, "투자사기": N },
        "S1": { ... },
        ...
      },
      "family-01": { /* 비율 60/40/90 분포 lieState별 */ },
      "friend-01": { /* 9일/11번/아버지/사기 분포 */ }
    },
    "variantDiversity": {
      "monotone_cells": [...],
      "highDiversity_cells": [...],
      "by_channel_avg_levenshtein": { ... }
    },
    "newChannel_quality": {
      "judge_evidence_combo": {
        "shallow_cells": N,
        "deep_cells": M,
        "dossier_card_meaning_accuracy": "%"
      },
      "judge_witness_summon": { "witness_real_name_usage": "%", "tone_diversity": ... },
      "rapport_milestone": ...,
      "contradict_milestone": ...
    },
    "facts_distribution": {
      "family-01": {
        "60": { "S0": N, "S1": N, "S2": N, "S3": N, "S4": N, "S5": N },
        "90": { ... },
        "40": { ... },
        "출생_비밀": { ... }
      },
      "friend-01": { ... },
      "spouse-01": { ... }
    },
    "ratio_consistency_family_01": {
      "B_90_to_60_pattern_count": N,
      "A_40_B_60_pattern_count": N,
      "inverted_A_60_B_40_count": "0이어야 정상",
      "samples_inverted": [...]
    }
  },
  "partC_additionalFindings": {
    "totalTasks": 200,
    "wide_scan": {
      "noun_action_total": N,
      "weak_쪽_judge_only": N,
      "broken_particle": N,
      "trans_style": N,
      "mechanical_observ": N,
      "judge_call_violation": N,
      "witness_title_violation": N,
      "haeyo_violation": N,
      "honor_buin": N,
      "truth_throttle_violation_by_lieState": { "S0": N, "S1": N, "S2": N }
    },
    "channel_consistency_issues": [...],
    "case_comparison_issues": [...],
    "code_fallback_additional": [...],
    "ambiguous_meaning_detected": [
      {
        "id": "...", "channel": "...",
        "text": "...",
        "ambiguity_type": "추상화_심함 / 사건맥락_없음 / 문장구조_복잡 / 의미_모호",
        "priority": "P1"
      }
    ],
    "machine_pattern_detected": [
      {
        "id": "...", "channel": "...",
        "text": "...",
        "pattern": "변수치환식 / 단조반복 / 일반적_문구",
        "priority": "P1"
      }
    ]
  },
  "p0_recommended": [/* QA-QW + QA-C 종합 P0 */],
  "p1_recommended": [...],
  "p2_recommended": [...],
  "ratio_alarm_family_01": "정합 / ⚠️ 반대 패턴 N건 발견"
}
```

### 산출물 2: `tmp/qa-redo-20260426/QA-QW-Cross-codex-summary.md`

- Claude QW와 Codex의 동의도 (가중)
- 추가 발견 사항 요약
- 통계 핵심 (trigram / archetype / Truth Throttle / 비율 / 다양성)
- 종합 P0/P1/P2 권장 + 우선순위
- **family-01 비율 alarm** (전수 검증 결과)
- **단순 기계식 표현 / 의미 불명 표현 통계**

### 산출물 3: `tmp/qa-redo-20260426/QA-QW-Cross-codex-audit.cjs`
재현 가능한 audit 스크립트:
- trigram analyzer
- archetype marker counter
- truth throttle violator detector
- ratio consistency validator
- ambiguous meaning detector

---

## 검증 절차

1. Claude QW 산출물 입력 정독
2. 각 P0/P1 patch에 대해 cross-check (Part A)
3. **family-01 비율 정합 우선 검증** (가장 중요)
4. 통계 패턴 분석 (Part B)
5. 광범위 추가 발굴 (Part C)
6. 종합 P0/P1/P2 권장 + 우선순위 보고

## 잘못 패턴 #1~#8 회피

(Thread-Q와 Thread-QW와 동일)

특히:
- #1 데이터 직접 read 검증 (sample 보고)
- #6 9차원 맥락-의미 정확성 (단순 어휘 교체 권장 X)
- #8 사건 설정 일치 검증 (P0 우선)

## 메모리 참조
- 동일

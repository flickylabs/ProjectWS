# Thread E → 컨트롤 타워 전달

> 발신: Thread E (통합 테스트)
> 수신: 컨트롤 타워
> 일시: 2026-04-05
> 건명: 심층 테스트 v2 완료 보고

---

## 한줄 요약

**420턴 × 3회 전원 PASS. CRITICAL 0, FAIL 0. 77건 확장 배치 착수 가능합니다.**

---

## 수행 내역

### 테스트 전 교정 (26건)

CT가 수정한 koreanPostposition / 시점 가드 / callTerms / v2-atoms 반영을 확인한 뒤, 자동 검증 스크립트(stage1-deep-audit.cjs) 실행 결과 97 FAIL이 나왔습니다. Triage 후 진짜 이슈 21건을 직접 교정하고, Phase 1/2 스크립트 정적 검증에서 추가 5건을 교정했습니다.

| 구분 | 건수 | 주요 내용 |
|------|------|-----------|
| D2 (S2 "사전 상의") | 11필드 | spouse-01 v2-atoms d-1/d-5 S2 → "미리 의논/얘기" |
| E3 (수동 표현) | 10건 | stage0 질문 "알고 계셨습니까" → "설명해 보십시오" (6파일) |
| D3 ("특정 X") | 1건 | neighbor-01 e-6 |
| Phase 1/2 | 5건 | 텍스트 중복 2건, 해요체→합니다체 2건, 호칭(toPartner) 1건 |

오탐 79건(anchorTruth 키워드 과탐 53건 + S3-S5 허용범위 26건)은 audit 스크립트의 검출 기준이 과민한 것이므로, 향후 스크립트 조정을 권장합니다.

### LLM 플레이스루 (420턴)

| 사건 | 1회차 | 2회차 | 3회차 |
|------|-------|-------|-------|
| spouse-01 | 19P | 19P | 19P |
| family-01 | 17P | 17P | 17P |
| friend-01 | 24P | 24P | 24P |
| neighbor-01 | 20P | 20P | 20P |
| partnership-01 | 20P | 20P | 20P |
| tenant-01 | 20P | 20P | 20P |
| workplace-01 | 20P | 20P | 20P |

**WARN 1건**: workplace-01 1회차 #17 박서윤 S3 blame에서 "큰돈을 송금" 표현 — 금전 무관 사건에서 금전 은유 사용. 2회차·3회차에서 재현 안 됨. LLM 비결정적 변동 범위 내.

---

## 이전 테스트 문제 재현 여부

| 이전 문제 | 420턴 결과 |
|-----------|-----------|
| 재판관 "제 아내에게" 사용 | **0건** |
| "제 아내이" 조사 오류 | **0건** |
| friend "민재아" 아/야 오류 | **0건** |

CT가 구축한 koreanPostposition 시스템과 시점 가드가 정상 작동합니다.

---

## 미커버 영역 (CT 판단 필요)

이번 테스트 시나리오(run-playthrough.cjs)는 **심문 응답 + 증거 제시** 중심이라, 아래 5개 채널은 런타임 검증이 안 되었습니다:

| 채널 | 상태 | 권장 |
|------|------|------|
| DossierCard (q1~q3) | 미실행 | 77건 배치 후 통합 테스트에서 커버 |
| 증인 증언 (vague/partial/full) | 미실행 | 동일 |
| 자유 질문 (freeQuestionV2) | 미실행 | archetype 전달은 코드 검증 완료, 런타임은 별도 |
| 후일담 (Phase 6) | 미실행 | 번역체 규칙 누락 이슈는 이전 E 보고 참조 |
| 모순 추궁 (contradiction) | 미실행 | isHidden 필터링은 코드 검증 완료 |

**이 5개 채널에 대해 별도 테스트를 돌릴지, 아니면 77건 배치 후 통합 검증에 포함할지 CT 판단 부탁드립니다.**

---

## 77건 확장 배치 시 주의사항 3건

1. **workplace 카테고리 hallucination 가드**: S3 blame 상태에서 금전 맥락이 혼입될 수 있음. 프롬프트에 `"이 사건은 금전 분쟁이 아닙니다"` 가드 추가 권장.

2. **audit 스크립트 오탐 조정**: B1/B2/B3 anchorTruth 키워드 매칭이 "서아", "환급", "사진", "기록" 같은 일반 주제 단어까지 잡음. 77건 돌리면 오탐이 수백 건 나올 것이므로, anchorTruth 매칭 로직을 **핵심 결론 키워드만** 검출하도록 조정하거나, Phase 1/2 대사는 별도 허용 목록 적용 권장.

3. **friend 카테고리 턴 수 관리**: 5개 쟁점 커버 시 24턴으로 가장 김. 77건 배치에서 friend 시나리오는 tell 빈도(15-25% 목표)와 표현 반복 관리에 주의.

---

## 산출물 위치

```
thread-E/reports/
├── v2-final-verdict.md          ← 최종 보고서 (상세)
├── v2-handoff-to-control-tower.md ← 이 문서
├── spouse-01-gpt4o-unified.txt  ← 1회차 상세 로그
├── family-01-gpt4o-unified.txt
├── friend-01-gpt4o-unified.txt
├── neighbor-01-gpt4o-unified.txt
├── partnership-01-gpt4o-unified.txt
├── tenant-01-gpt4o-unified.txt
└── workplace-01-gpt4o-unified.txt
```

---

## 수정 파일 목록 (12개)

```
src/data/claimPolicies/spouse-01-v2-atoms.json
src/data/cases/generated/spouse-01.json
src/data/cases/generated/family-01.json
src/data/cases/generated/friend-01.json
src/data/cases/generated/neighbor-01.json
src/data/cases/generated/tenant-01.json
src/data/cases/generated/workplace-01.json
src/data/dialogues/phase1/family-01.json
src/data/dialogues/phase2/friend-01.json
src/data/dialogues/phase2/tenant-01.json
src/data/dialogues/phase1/workplace-01.json
src/data/dialogues/phase2/workplace-01.json
```

---

## 최종 판정

**PASS — 77건 확장 배치 착수 가능.**

CT 지시에 따라 미커버 5채널 테스트 또는 77건 배치 검증으로 이행하겠습니다.

# Thread-C Full Quality Test — 28 Cases

Generated: 2026-04-08T23:07:48.125Z

## Summary
- Total: 28
- Level 4 FAIL: 27
- Level 4 WARN: 1
- Validator PASS: 0/28
- Validator unavailable: 28/28

- Level 4 FAIL cases: tenant-new-01, civic-new-10, partnership-new-10, spouse-new-06, neighbor-new-03, online-new-05, professional-new-01, friend-new-08, family-new-04, spouse-new-03, family-new-02, friend-new-01, partnership-new-01, tenant-new-10, workplace-new-10, online-new-06, professional-new-10, neighbor-new-11, civic-new-11, family-new-03, family-new-05, friend-new-02, friend-new-09, neighbor-new-07, tenant-new-09, workplace-new-09, professional-new-08
- Level 4 WARN cases: workplace-new-02

## workplace-new-02

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: WARN
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=재판장님, B=재판장님
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 재판장님, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 재판장님, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 재판장님, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 재판장님, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: PASS
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## tenant-new-01

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## civic-new-10

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## partnership-new-10

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## spouse-new-06

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## neighbor-new-03

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## online-new-05

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## professional-new-01

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## friend-new-08

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## family-new-04

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## spouse-new-03

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## family-new-02

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## friend-new-01

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## partnership-new-01

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## tenant-new-10

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## workplace-new-10

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## online-new-06

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## professional-new-10

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## neighbor-new-11

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## civic-new-11

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.1, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.10
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.10
- 4-H: PASS

## family-new-03

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.15, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다. 문제가 된 금액은 300만원 수준이었습니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.15
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.15
- 4-H: PASS

## family-new-05

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## friend-new-02

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## friend-new-09

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.43, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## neighbor-new-07

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## tenant-new-09

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## workplace-new-09

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

## professional-new-08

- Level 1: PASS
- Level 2: PASS
- Level 3: PASS
- Level 4: FAIL
- Level 5: PASS
- Validator: UNAVAILABLE {}
- CallTerms: A=상대방, B=상대방
- Unique ratio: interrogation=0.13, evidence=0.5, dossier=0.06
- 3-turn samples:
  - A/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
  - A/S2: 상대방, 재판관님, 제가 선을 넘은 부분이 있었다는 점은 부정하지 않겠습니다. 그 선택을 하게 된 이유와 압박도 함께 보셔야 합니다 적어도 제 대응이 거칠었던 점은 인정합니다.
  - A/S5: 상대방, 재판관님, 이제는 숨기지 않겠습니다. 잘못과 불안을 구분해서 판단해 주십시오. 제가 설명을 늦춘 점까지 포함해 책임을 인정합니다
  - B/S0: 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-A: FAIL
  - 4-A1: callTerms.toJudge가 재판관 지칭형이 아니라 "상대방"으로 설정됨 | A=상대방, B=상대방
  - 4-A1: NPC 대사가 재판관을 향한 문장 첫머리를 "상대방"으로 시작함 | 상대방, 재판관님, 지금 지적된 부분은 사실관계가 확정되지 않았습니다. 기록과 순서를 기준으로 다시 보아 주십시오
- 4-B: PASS
- 4-C: PASS
- 4-D: WARN
  - 4-D1: 증인 depth별 문장 수 차이가 기준과 다를 수 있음 | 1/2/2
- 4-E: WARN
  - 4-E2: DossierCard 반응이 질문별로 충분히 달라지지 않음 | ratio=0.06
- 4-F: WARN
  - 4-F5: 재판관 대상 호칭이 구어적으로 부자연스럽고 대사 첫머리에서 반복됨 | A=상대방, B=상대방
  - 4-F6: 심문 대사 반복 패턴이 과도함 | ratio=0.13
- 4-G: WARN
  - 4-G1: interrogation first-variant 고유 비율이 낮아 variant 체감 차이가 약함 | ratio=0.13
- 4-H: PASS

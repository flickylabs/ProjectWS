# Thread D (Phase 1/2 스크립트 교정) — 완료 보고

> 작성일: 2026-04-04
> 대상: 7건 × Phase 1 + Phase 2 = 14개 파일
> 방법: 직접 수행 (GPT Pro 불필요)

---

## 1. 작업 요약

Phase 1(초기 진술)과 Phase 2(반박) 스크립트에서 **스포일러 제거 + 해요체 전면 교정**을 수행했다.

| 교정 항목 | 건수 |
|-----------|------|
| 치명적 스포일러 (anchorTruth 직접 노출) | 2건 |
| 구체적 금액 제거 | ~25건 |
| 금지 인물명 제거 | 3건 |
| 기관명/서비스명 제거 | ~8건 |
| 구체적 날짜/시간 제거 | ~10건 |
| 해요체 → 합니다체 | ~52건 |
| **총계** | **~100건** |

---

## 2. 치명적 발견 사항

### 2-1. friend-01 Phase 2 — anchorTruth 직접 노출

```
교정 전: "여행 전체로 보면 최종 차액은 2만원대인데, 18만4천원짜리 캡처를 수아한테 보내면..."
교정 후: "전체로 따지면 차액이 그렇게 크지도 않은데, 중간 캡처를 수아한테 보내면..."
```

anchorTruth(실제 차액 2만2천원)가 Phase 2에서 그대로 노출되고 있었다.
**게임 시작도 전에 정답이 나오는 상태**였음.

### 2-2. partnership-01 Phase 1 — anchorTruth 핵심 용어 노출

```
교정 전: "법인 준비금 1,800만원이 법무사 신탁계좌로 이동... 브리지 투자 예치금이었고"
교정 후: "법인 준비금에서 상당한 금액이 외부 계좌로 이동... 회사 생존을 위한 검토 비용이었고"
```

anchorTruth의 핵심 단어("법무사", "브리지 투자 예치금")를 A가 Phase 1에서 직접 설명하고 있었다.

### 2-3. spouse-01 Phase 2 — 금지 인물명

```
교정 전: "왜 하필 정우성이야?" / "정우성은 대학 동기야"
교정 후: "왜 하필 남자 동기야?" / "그 사람은 대학 동기야"
```

mission.md에 명시된 금지 이름 "정우성"이 3회 등장.

---

## 3. 검증 결과

3단계 프로세스로 검증했다: 병렬 에이전트 스캔 → 교정 → 별도 에이전트 검증 + grep 기계 검증.

| 검증 항목 | 결과 |
|-----------|------|
| 금지 금액 패턴 grep | **0건** |
| 금지 이름/기관 패턴 grep | **0건** |
| 해요체 패턴 grep (기본+넓은) | **0건** |
| anchorTruth 직접 노출 | **0건** |
| 대사 자연스러움 | **문제 없음** |

```
검증 grep (실행 결과 0건):
  (280만|150만|1800만|142만|18만4|9만2|92400|7만원|2만원|정우성|법무사|브리지|컨설팅비|504호|8시17|11시48)
  (에요|해요|거예요|했어요|있어요|같아요|됐어요|셨어요|잖아요|인가요|건가요|한데요|할게요)
```

---

## 4. 변경 파일 목록

### Phase 1 (7건)
```
src/data/dialogues/phase1/spouse-01.json
src/data/dialogues/phase1/family-01.json
src/data/dialogues/phase1/friend-01.json
src/data/dialogues/phase1/neighbor-01.json
src/data/dialogues/phase1/partnership-01.json
src/data/dialogues/phase1/tenant-01.json
src/data/dialogues/phase1/workplace-01.json
```

### Phase 2 (7건)
```
src/data/dialogues/phase2/spouse-01.json
src/data/dialogues/phase2/family-01.json
src/data/dialogues/phase2/friend-01.json
src/data/dialogues/phase2/neighbor-01.json
src/data/dialogues/phase2/partnership-01.json
src/data/dialogues/phase2/tenant-01.json
src/data/dialogues/phase2/workplace-01.json
```

### 산출물
```
docs/ref/리뉴얼참고/thread-packages/thread-D/correction-log.md  (교정 상세 내역)
docs/ref/리뉴얼참고/thread-handoff-D-phase12.md                 (이 보고서)
```

---

## 5. 확정된 결정사항 (컨트롤타워 답변 2026-04-04)

### 5-1. 반말 처리 — **친밀 관계 반말 유지 확정**

- 합니다체 강제는 **재판관에게 말할 때만** 적용
- 부부/형제/친구 등 당사자 간 대화는 **반말 유지** (캐릭터 관계 연출)
- Phase 3(심문)도 동일: 재판관 답변만 합니다체
- 이웃/세입자-집주인/동업자/직장은 합니다체 교정 완료 상태 그대로

### 5-2. 나머지 77건 (-02 ~ -12) — **플레이테스트 후 착수**

- Stage-1 플레이테스트 통과 + 템플릿 확정 시점에 착수
- 템플릿 미확정 상태에서 77건 전수 교정 시 재작업 위험

---

## 6. 현재 상태 & 다음 단계

| 항목 | 상태 |
|------|------|
| -01 7건 Phase 1/2 교정 | **완료** (검증 PASS) |
| 반말/합니다체 규칙 | **확정** |
| -02~-12 77건 교정 | **대기** (플레이테스트 후) |
| B/C 스레드 결과 통합 | **대기** (수령 즉시 통합) |

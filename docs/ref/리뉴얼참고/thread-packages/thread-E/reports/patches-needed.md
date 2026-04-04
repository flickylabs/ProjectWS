# 교정 패치 목록

> 작성: 스레드 E
> 일시: 2026-04-04

---

## 교정 완료 (CRITICAL 3건 + HIGH 19건)

### CRITICAL — 모두 교정 완료 ✅

| # | 파일 | 내용 | 상태 |
|---|------|------|------|
| C-1 | dialogues/phase2/spouse-01.json | "동생 월세" → "급한 사정" | ✅ |
| C-2 | claimPolicies/spouse-01-v2-atoms.json | d-1/S0 "2,800,000원" → "해당 금액" | ✅ |
| C-3 | claimPolicies/spouse-01-v2-atoms.json | d-3/S0 "최민정 씨" → "그 사람" | ✅ |

### HIGH — 19/21 교정 완료

| # | 파일 | 내용 | 상태 |
|---|------|------|------|
| H-A1 | dialogues/phase2/spouse-01.json | "거잖아" → "순서를 지키고 싶습니다" | ✅ |
| H-A2 | dialogues/phase1/family-01.json | "카드대금" → "그 돈 안 옮겼으면" | ✅ |
| H-A3 | dialogues/phase2/friend-01.json | "차액이 크지 않은데" → "상계될 문제" | ✅ |
| H-A4 | dialogues/phase2/neighbor-01.json | "증거라고요?" → "증거란 말입니까?" | ✅ |
| H-B1~8 | claimPolicies/spouse-01-v2-atoms.json | fallbackPublicClaim 금액/실명 11건 | ✅ |
| H-C1 | V3 session-4 e-6 stage0 | truthLevel partial → hint | ✅ |
| H-D1 | cases/spouse-01.json e-2 | name/description 중립화 | ✅ |
| H-D2 | cases/family-01.json e-6 | surfaceDescription 교정 | ✅ |
| H-D3 | cases/workplace-01.json e-6 | requiredLieState S3 → S4 | ✅ |
| H-E1 | blueprintPromptBuilderV2.ts | S2→hint 매핑 (결정2 준수) | ✅ |
| H-E2 | evidenceSlice.ts | investigateEvidence 후 checkUnlocks 추가 | ✅ |
| H-E3 | witnessEngine.ts | 기관 증인 예외(결정4) 구현 | ✅ |

---

## 잔여 교정 필요 (HIGH 2건 + MEDIUM ~30건)

### HIGH 잔여 — 2건 (GPT 배치 출력 파일, 즉시 게임 영향 없음)

| # | 파일 | 내용 | 우선순위 |
|---|------|------|----------|
| H-B9 | docs/ref/.../family-01-v2-atoms.json | d1.card_insurance_paid_first S2 suppression 위반. factText "개인 지출을 먼저 정리했다" → 추상화 필요 | 83건 확장 전 |
| H-B10 | docs/ref/.../family-01-v2-atoms.json | d3.noninheritance_ack S4/S5 "이수진" 미등록 인물 → socialGraph 등록 또는 fullName "변호사"로 교체 | 83건 확장 전 |

### Stage 2에서 발견된 추가 이슈 (WARN 수준)

| 카테고리 | 건수 | 내용 |
|----------|------|------|
| 이름직접호칭 | 5 | partnership-01, tenant-01에서 NPC가 판사 앞에서 상대를 이름으로 직접 호칭 ("서준씨", "하림씨" 등). fixMisdirectedAddress() 강화로 해결 가능 |
| v2-atoms partyB 데이터 갭 | 3 SKIP | family-01 partyB d-1/d-3 S1 atoms 누락 → 83건 배치 시 자동 해결 |
| API 오류 | 1 | tenant-01 partyB d-2 S1 atoms 누락으로 400 에러 |

### MEDIUM 주요 — 교정 권장

| 카테고리 | 건수 | 내용 |
|----------|------|------|
| v2-atoms suppression/slot 정합성 | ~5 | tenant-01 publicClaim 불일치, neighbor-01 suppression-slot 모순 등 |
| 증거 질문 패턴 | ~8 | revealKey 결론 사전 선언 (workplace-01 집중), attackVector 미스매치 |
| 해요체 패턴 누락 | 3 | llmDialogueResolver: 볼게요, 드릴게요, 어때요 |
| judgeQuestion 이름 누출 | 1 | extractDisputeSubject 주제격 조사(은/는) 미처리 |
| surfaceName/surfaceDescription | ~5 | friend-01 e-3/e-6, partnership-01 e-3 "크롭된" 등 |
| DossierUnlockReason 타입 | 1 | meterStagingV2.ts 구버전 유니온 |
| v3GameLoopLoader 가드 | 1 | relatedDisputes=[] Math.max 무한 차단 |
| useActionDispatch disputeNames | 1 | 시스템 메시지에 dispute.name 직접 노출 |
| V3 BeatScript beatType 라벨 | 2 | d-3, d-5 S2 beat "partial" → "hedge" |
| V3 DossierCard 합니다체 | 2 | dossier-1.b.q1 "어렵죠", q2 "겠죠" |
| V3 BeatScript stage 진행 | 1 | e-1 stage2 truthLevel hint → partial |

---

## 교정 후 빌드 상태

```
npx tsc --noEmit → 성공 (에러 없음)
```

# CT → 스레드 C: 스모크 테스트 질의 답변

> 발신: CT
> 수신: 스레드 C (스모크 테스트)
> 일시: 2026-04-08

---

## Q1. dev 서버 확인

5173은 모바일 dev 서버 (`npm run dev`), 5174는 PC dev 서버 (`npm run dev:pc`)입니다.
CT가 올린 서버가 맞습니다. 단, 현재 세션에서 dev:pc를 백그라운드로 띄운 적은 있지만 지금 살아있는지는 확인이 필요합니다.

서버가 없으면 직접 띄워서 테스트해도 됩니다:
```bash
npm run dev          # 모바일 (5173)
npm run dev:pc       # PC (5174)
```

스모크 테스트는 **모바일 빌드(5173)로 진행**하세요. PC 빌드는 별도 스레드(스레드 B)에서 UI 작업 중이라 현재 레이아웃이 불안정합니다.

## Q2. headline-01 선택/로드 방식

`getRandomCase('headline')`을 호출하면 `relationshipType === 'headline'`인 케이스가 필터됩니다.
headline-01의 `duo.relationshipType`은 `"headline"`이므로 필터에 걸립니다.

**주의: caseId 포맷 이슈**

- manifest에는 `headline-01`로 등록
- JSON 내부 caseId는 `case-headline-01`
- `caseLoader.ts`의 `loadGeneratedCases()`가 JSON 파일을 그대로 읽으므로, `allCases`에는 `caseId: "case-headline-01"`로 들어감
- `getRandomCase('headline')`은 `relationshipType`으로 필터하므로 caseId 포맷과 무관하게 정상 선택됨

**확인 포인트**: Phase 0 진입 시 콘솔에서 다음을 체크:
- `[Renewal] headline-01` 관련 registration 로그
- ScriptLoader fallback 로그 (`[ScriptedText]` prefix)
- 에러/경고 여부

## Q3. baseEvidenceIds 판정 기준

코드를 확인한 결과:

```typescript
// evidenceEngine.ts:196-211
// baseEvidenceIds는 "surfaced" 용도이지 "unlocked" 용도가 아님
// 1. 기본 3장: 해금 여부와 무관하게 항상 표면 (surfacedIds에 추가)
for (const id of baseEvidenceIds.slice(0, 3)) {
  surfacedIds.push(id)
}
```

**CT 판정 기준: "surfaced 3개 + unlocked는 별개"**

- `baseEvidenceIds: ["e-1", "e-3", "e-5"]`는 **UI에 노출되는 3장**을 결정
- 실제 `unlocked` 상태는 `requires` 의존성에 따라 별도 결정됨
- headline-01의 경우 `requires: []`인 증거들이 있으므로 초기 unlocked가 3개 이상일 수 있음

**PASS 기준**: surfaced 목록에 e-1, e-3, e-5가 포함되어 있으면 PASS. unlocked 수가 3개 초과여도 상관없음.

## Q4. 완주 범위 — Result까지만

**캠페인 stage progression은 스모크 범위 밖입니다.**

확인한 내용:
- `campaign.ts`의 `CAMPAIGN_STAGES`는 10단계이고, relationshipType 기준으로 매핑됨
- `headline` 타입은 **어떤 stage에도 매핑되지 않음** (모두 neighbor, spouse, boss_employee, partnership, family, tenant_landlord)
- 따라서 headline 케이스 완주 시 `completeStage` 호출이 없거나, 매핑 실패로 stage 기록 안 됨 — **이건 정상 동작**

**PASS 기준**: Phase 0 → Phase 7 → Result 화면까지 크래시 없이 도달하면 PASS. 캠페인 기록은 무시.

## Q5. 보고 형식

요청하신 대로 4개 항목 각각:
```
### 검증 1: 게임 로드
- PASS / FAIL
- 콘솔 이슈 원문: (있으면)

### 검증 2: 증거 뷰어
- PASS / FAIL
- 콘솔 이슈 원문:

### 검증 3: ScriptedText 키 매칭
- PASS / FAIL
- 콘솔 이슈 원문:

### 검증 4: 전체 루프 완주
- PASS / FAIL
- 콘솔 이슈 원문:
```

---

## 추가 안내: headline-02도 테스트 대상 추가

스레드 A에서 headline-02도 **validator PASS** 상태까지 완성했습니다.
headline-01 테스트 완료 후, 동일한 4항목을 headline-02에도 적용해 주세요.

headline-02 정보:
- caseId: `case-headline-02`
- relationshipType: `headline`
- 사건: 사생팬 맞춤형 셀카 (서윤아/걸그룹 메인보컬 vs 조태현/로드 매니저)
- 증거 6개, 쟁점 4개
- ScriptedText: `src/data/scriptedText/headline-02.json` (PASS)

# CT → 전체 스레드 작업 지시 (2026-04-10)

> 이 문서는 스레드 A, B, C 각각에 전달할 작업 내용을 통합 정리한 것입니다.

---

# 스레드 A 지시

## 작업 1: 기존 미리뉴얼 65건 일반 모드 제외 처리

현재 일반 모드에 scripted가 없는 기존 케이스 65건이 노출되고 있습니다. 이 사건을 선택하면 LLM fallback으로 동작하여 품질이 불균일합니다.

**generated 폴더에 있지만 scriptedText가 없는 65건을 식별하여 manifest에서 제외**해 주세요.

방법:
- `src/data/cases/refined/manifest.json`의 refined 목록에서 해당 65건 제거
- 또는 caseLoader에서 scriptedText 존재 여부를 체크하여 scripted 없는 케이스를 자동 필터링

**일반 모드에는 scripted가 있는 117건만 노출되어야 합니다:**
- 헤드라인 2건
- 기존 리디자인 15건 (spouse-01~04 제거됨)
- 신규 100건

## 작업 2: 조합 실험실(Combination Lab)은 선택적 확장으로

headline-01에 pilot 데이터가 있는 것은 확인했습니다. 하지만 나머지 116건에는 combinationLab 데이터가 없습니다.

**지금 단계에서는 조합 실험실을 필수 기능이 아닌 선택적 확장으로 처리합니다:**
- `CaseData.combinationLab?`가 있으면 조합 UI 표시
- 없으면 조합 UI 숨기고 기존 플레이 흐름으로 진행
- 나머지 116건에 combinationLab 데이터를 채우는 것은 **후순위**

## 작업 3: 스크립트 누락 구간 점검

플레이 테스트에서 동기 탐색(motive_search), 공감 접근(empathy_approach) 등에서 LLM 실시간 생성이 관찰되었습니다. scripted 파일이 있는 사건에서도 이런 현상이 발생한다면 **키 매칭 실패**입니다.

확인 필요:
1. `scriptedTextLoader.ts`의 `normalizeCaseKey()` → `loadBundle()` → `buildInterrogationKey()` 경로에서 **실제 런타임 키와 데이터 키가 일치하는지** 117건 전수 검증
2. 특히 `case-` prefix 정규화가 모든 경로에서 일관적인지
3. questionType이 `fact_pursuit`, `motive_search`, `empathy_approach` 3종 모두 매칭되는지

**검증 방법 제안:**
```javascript
// 117건 전체에 대해 키 매칭 커버리지 검증
for each case:
  for each party (a, b):
    for each dispute:
      for each lieState (S0~S5):
        for each questionType (fact_pursuit, motive_search, empathy_approach):
          assert getScriptedInterrogation(caseId, party, dispute, lieState, questionType) !== null
```

매칭 실패하는 조합이 있으면 보고해 주세요.

## 작업 4: 증거 이미지/미디어는 후순위

스레드 B가 요청한 imageUrl/thumbnailUrl/mediaUrl 등은 지금 추가하지 않습니다. 현재 SVG 아이콘 + 텍스트 기반으로 출시하고, 이미지는 업데이트로 추가합니다.

## 우선순위

| 순서 | 작업 |
|------|------|
| 1 | 스크립트 누락 구간 점검 (#3) — 키 매칭 전수 검증 |
| 2 | 미리뉴얼 65건 제외 (#1) |
| 3 | 조합 실험실 선택적 처리 확인 (#2) |

---

# 스레드 B 지시

## 작업 1: scripted 없는 케이스 UI 제외 (Critical)

스레드 A가 manifest/caseLoader에서 처리하더라도, **UI 측에서도 이중 안전장치**가 필요합니다.

`PCCaseBrowser` / `pcHomeShared.ts`에서 사건 목록을 만들 때, **scriptedText가 존재하는 케이스만 표시**하도록 필터를 추가해 주세요.

확인 방법:
```typescript
// scriptedText가 있는지 확인하는 간단한 방법
const scriptedModules = import.meta.glob('../../data/scriptedText/*.json', { eager: true })
const hasScripted = (caseId: string) => {
  const normalized = caseId.replace(/^case-/, '')
  return Object.keys(scriptedModules).some(path => path.includes(normalized))
}
```

일반 모드 세션에서 scripted 없는 사건이 나오면 안 됩니다.

## 작업 2: 조합 실험실 UI — combinationLab 없으면 숨기기

`CaseData.combinationLab`이 없는 케이스에서는 조합 스킬 UI를 **완전히 숨겨** 주세요. 빈 패널이나 "준비 중"이 아니라, UI 자체가 렌더되지 않아야 합니다.

```typescript
const hasCombinationLab = !!caseData?.combinationLab
// hasCombinationLab이 false면 조합 관련 UI 전체 미렌더
```

## 작업 3: 증거 제시 동선 확인 (Blocker)

현재 증거 카드 클릭 시 "증거 열람"과 "관련 쟁점 보기"만 있고 **"증거 제시" 버튼이 없습니다.**

Phase 4 이상에서 증거를 NPC에게 제시하는 동선을 복원해 주세요:
- 증거 카드 클릭 → "증거 열람" / **"노유진에게 제시"** / **"황인호에게 제시"** 버튼
- 또는 핫바 F2 탭에서 증거 선택 → 제시 모드 → 대상 선택 → 실행
- `dispatch({ type: 'evidence_present', evidenceId, target: targetParty })`가 호출되어야 함

## 작업 4: 초기 전체 해금 문제 확인 (Blocker)

게임 시작 시 모든 증거/액션이 해금된 상태라는 보고가 있습니다. `evidenceEngine.ts`의 `createInitialEvidenceStates()`가 수정되었는데, `initEvidence()` 호출 시 `baseEvidenceIds`가 제대로 전달되는지 확인:

```typescript
// evidenceSlice.ts의 initEvidence에서 baseEvidenceIds를 전달하고 있는지
store.initEvidence(caseData.evidence, caseData.evidenceCombinations, caseData.baseEvidenceIds)
```

`createInitialEvidenceStates(evidence, baseEvidenceIds)`에 두 번째 인자가 전달되지 않으면 fallback 로직이 동작하는데, 이 fallback이 의도와 다를 수 있습니다.

## 작업 5: VerdictScreen stageMap 재확인

이전에 수정했다고 보고받았지만 스레드 C 테스트에서 44건 누락으로 나옵니다. 다시 확인해 주세요.

## 우선순위

| 순서 | 작업 |
|------|------|
| 1 | 초기 전체 해금 문제 (#4) — Blocker |
| 2 | 증거 제시 동선 복원 (#3) — Blocker |
| 3 | scripted 없는 케이스 UI 제외 (#1) |
| 4 | 조합 실험실 숨기기 (#2) |
| 5 | VerdictScreen stageMap (#5) |

---

# 스레드 C 지시

## 현재 상태

이전 테스트에서 Level 4가 전건 WARN이었습니다. 스레드 A가 생성기를 개선하고 전체 재생성했지만, 실제 플레이에서 여전히 문제가 많이 보입니다.

## 대기

스레드 A와 B의 수정이 먼저 진행되어야 합니다:
- 스레드 A: 스크립트 키 매칭 전수 검증 + 미리뉴얼 65건 제외
- 스레드 B: 초기 해금 문제 + 증거 제시 복원 + scripted 없는 케이스 제외

**위 수정이 완료되면 CT가 재테스트를 요청합니다.**

## 다음 테스트 범위

수정 완료 후 **117건 전체**에 대해 `ct-to-threadC-final-quality-test-117.md` 기준으로 테스트합니다.

특히 이번 테스트에서 중점 확인할 것:
1. **scripted 응답만 나오는지** — 콘솔에서 `[Scripted]` 로그 117건 전부 확인. LLM fallback이 단 1건도 없어야 함
2. **Level 4 강화 기준** (62항목) — 특히 4-E(증거 반응 템플릿성), 4-F(한국어 자연스러움), 4-G(variant scaffold 다양성)
3. **초기 증거 3개만 해금** — Phase 3 시작 시 잠긴 증거가 실제로 잠겨 있는지
4. **Phase별 액션 제한** — F2 증거 탭이 Phase 4 전에 잠겨 있는지
5. **조합 실험실** — combinationLab 없는 케이스에서 조합 UI가 안 보이는지

## 보고 기준

`ct-to-threadC-final-quality-test-117.md`의 보고 형식을 그대로 적용합니다.

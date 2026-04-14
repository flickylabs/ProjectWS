# Session F: 100% 클리어 시스템 + 결과 화면 확장 (Phase 4+5)

■ 브랜치: codex/ui-handoff-freeze-20260411
■ 커밋: e27963d
■ 참조: CLAUDE.md

## 선행 작업 (Session A에서 완료)
- 자원 시스템 재설계 완료 (조사20/스킬10/법정5)
- 미니게임 슬라이스: src/store/slices/minigameSlice.ts (minigameProgress 읽기 가능)
- 조합 shimmer: src/store/slices/evidenceSlice.ts (getCombinableEvidenceIds)

## 작업 범위

### Phase 4: ClearanceTracker 엔진

#### src/engine/clearanceTracker.ts (신규)

14개 달성 항목 추적. 입력: store 전체 상태. 출력: 달성률.

```typescript
interface ClearanceItem {
  id: string
  category: 'evidence' | 'combination' | 'witness' | 'interrogation' | 'dispute' | 'minigame'
  label: string
  achieved: boolean
  current: number
  target: number
}

interface ClearanceResult {
  items: ClearanceItem[]
  achieved: number
  total: number
  percent: number
  missedConnections: { a: string; b: string; label: string }[] // 놓친 조합
}
```

14개 항목:
1. 전 증거 해금 (7/7)
2. 전 증거 제시 (7/7)
3. 전 증거 심층 조사 (7/7) — investigatedActions.length >= investigationStages.length
4. 자동 조합 전부 (5/5) — triggeredCombinations 수
5. 수동 조합 전부 (6/6) — combinationLabRuntime.appliedRecipeIds 수
6. DossierCard 전부 사용 — dc-* 출력 중 실제 사용된 것
7. 전 증인 소환 (3/3) — calledWitnesses
8. 증인 depth 3 도달 (1+/3) — witnessSessions에서 depth 3 슬롯 heardSlots
9. 3종 심문 사용 — processMetrics의 questionsAsked 기반 (fact/motive/empathy 각 1+)
10. 모순 추궁 성공 — processMetrics.liesCollapsed > 0
11. 전 쟁점 발현 — discovery.disputeVisibility에서 hidden 아닌 것 전부
12. 전 쟁점 S3+ — agentA/B의 lieStateMap 모든 쟁점 S3 이상
13. 분리심문 사용 — processMetrics에서 확인
14. 비공개 보호 사용 — processMetrics.confidentialUsed > 0

missedConnections: evidenceCombinations 중 triggeredCombinations에 없는 것 + combinationLab recipes 중 미실행 것

#### src/engine/verdictEngine.ts 수정

calculateInsight/calculateAuthority/calculateWisdom 중 하나에 clearance 보너스 추가:
- 달성 항목당 +2점 (최대 +28)
- 미발견 조합: -3점/건
- 미해금 증거: -2점/건
- 100% 달성: +30 보너스

이 보너스는 **processBonus**에 합산 (기존 패턴 유지).

calculateVerdict 호출부에서 clearanceTracker를 실행하고 결과를 processMetrics에 병합하거나, 별도 파라미터로 전달.

### Phase 5: 결과 화면 확장

#### 5-1. 자원 활용도 도넛 (4번째)
src/components/pc/result/PCResultScreen.tsx:
- 기존 3축(통찰/권위/지혜) 도넛 옆에 4번째 "달성률" 도넛 추가
- 값: clearanceResult.percent (0~100)
- 색상: 금색 (#d4a24e)
- 라벨: "달성률"

#### 5-2. 상세보기 팝업
src/components/pc/result/PCClearanceDetailPopup.tsx (신규):
- "상세보기" 버튼 클릭 시 팝업
- 카테고리별 ✅/⬜ 체크리스트 (14항목)
- 각 항목: 라벨 + 현재/목표 (3/7 형태)
- 놓친 단서 연결 목록 (missedConnections)
- 미니게임 달성: 조사 x/5, 스킬 x/5, 법정 x/5

#### 5-3. 미니게임 달성 표시
- 상세보기 팝업 하단에 미니게임 진행도 표시
- minigameProgress에서 읽어서 렌더링

## 수정 대상 파일
- src/engine/clearanceTracker.ts (신규)
- src/engine/verdictEngine.ts (보너스 추가)
- src/components/pc/result/PCResultScreen.tsx (도넛 + 상세보기 버튼)
- src/components/pc/result/PCClearanceDetailPopup.tsx (신규)
- src/app/pc.css (팝업 스타일)

## 건드리면 안 되는 파일
- src/store/slices/* (읽기만, 구조 변경 금지)
- src/hooks/useActionDispatch.ts
- src/components/pc/minigame/* (Session C/D/E 관할)
- src/components/pc/effects/* (Session B 관할)

## 검증
- npx tsc -b --force PASS
- npm run build PASS
- 완료 후 커밋 메시지: "feat: Session F — 100% 클리어 시스템 + 결과 도넛 + 상세보기"

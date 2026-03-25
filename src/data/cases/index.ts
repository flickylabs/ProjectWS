/**
 * 사건 로더.
 * 하드코딩 사건 + JSON 파일로 생성된 사건을 모두 관리한다.
 * 반복 방지 태그를 추적하여 최근 플레이한 사건과 겹치지 않도록 선택한다.
 */
import type { CaseData } from '../../types'
import { minjunSeoyeonCase } from './minjun-seoyeon'
import { loadGeneratedCases } from './caseLoader'

// 모든 사건 등록소
const allCases: CaseData[] = [
  minjunSeoyeonCase,
  ...loadGeneratedCases(),
]

// 최근 플레이한 사건 ID (반복 방지)
const recentCaseIds: string[] = []
const MAX_RECENT = 5

/** JSON 파일에서 사건들을 일괄 등록 */
export function registerCases(cases: CaseData[]) {
  for (const c of cases) {
    if (!allCases.find((existing) => existing.caseId === c.caseId)) {
      allCases.push(c)
    }
  }
}

/** 사건 총 개수 */
export function getCaseCount(): number {
  return allCases.length
}

/** 관계 유형별 사건 수 */
export function getCaseCountByType(): Record<string, number> {
  const counts: Record<string, number> = {}
  for (const c of allCases) {
    const type = c.duo.relationshipType
    counts[type] = (counts[type] ?? 0) + 1
  }
  return counts
}

/** 랜덤 사건 선택 (반복 방지) */
export function getRandomCase(relationshipType?: string): CaseData {
  let candidates = allCases.filter((c) => !recentCaseIds.includes(c.caseId))

  // 관계 유형 필터
  if (relationshipType) {
    const filtered = candidates.filter((c) => c.duo.relationshipType === relationshipType)
    if (filtered.length > 0) candidates = filtered
  }

  // 후보가 없으면 전체에서 (반복 방지 무시)
  if (candidates.length === 0) {
    candidates = relationshipType
      ? allCases.filter((c) => c.duo.relationshipType === relationshipType)
      : allCases
  }

  if (candidates.length === 0) return minjunSeoyeonCase

  const selected = candidates[Math.floor(Math.random() * candidates.length)]

  // 반복 방지 기록
  recentCaseIds.push(selected.caseId)
  if (recentCaseIds.length > MAX_RECENT) recentCaseIds.shift()

  return selected
}

/** ID로 특정 사건 가져오기 */
export function getCaseById(caseId: string): CaseData | undefined {
  return allCases.find((c) => c.caseId === caseId)
}

/** 모든 사건 목록 (타이틀 화면용) */
export function getAllCases(): { caseId: string; type: string; nameA: string; nameB: string; difficulty: string }[] {
  return allCases.map((c) => ({
    caseId: c.caseId,
    type: c.duo.relationshipType,
    nameA: c.duo.partyA.name,
    nameB: c.duo.partyB.name,
    difficulty: (c as any).meta?.difficulty ?? 'medium',
  }))
}

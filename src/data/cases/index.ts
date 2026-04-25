/**
 * 사건 로더.
 * JSON 파일로 생성된 활성 사건만 관리한다 (spouse-01 / family-01 / friend-01).
 */
import type { CaseData } from '../../types'
import { loadGeneratedCases, loadCaseMetas, type CaseMeta } from './caseLoader'

// 활성 사건 등록소 (manifest.json refined 목록 기준)
const allCases: CaseData[] = loadGeneratedCases()

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

  if (candidates.length === 0) {
    throw new Error('활성 사건이 등록되지 않았습니다.')
  }

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

/** 관계 유형별로 사건 그룹화 (CaseMap용) */
export function getCasesByType(type: string): CaseData[] {
  return allCases.filter((c) => c.duo.relationshipType === type)
}

/** 모든 사건 메타 정보 (CaseMap용) */
export function getAllCaseMetas(): CaseMeta[] {
  return loadCaseMetas()
}

export type { CaseMeta }

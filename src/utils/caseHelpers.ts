/**
 * 사건 데이터 접근 헬퍼.
 * caseId 정규화, relationshipType 경로 폴백 등.
 */
import type { CaseData } from '../types'

/**
 * caseId를 truthPolicy/witnessBudget 키 형식으로 정규화.
 * 'case-spouse-01' → 'spouse-01', 'case-work-01' → 'workplace-01' 등.
 */
export function normalizeCaseKey(caseData: CaseData | string | null | undefined): string {
  const raw = typeof caseData === 'string'
    ? caseData
    : caseData?.caseId ?? ''
  // 'case-' prefix 제거
  let key = raw.replace(/^case-/, '')
  // 'work-' → 'workplace-' 매핑
  key = key.replace(/^work-/, 'workplace-')
  // 'partner-' → 'partnership-' 매핑
  key = key.replace(/^partner-/, 'partnership-')
  return key
}

/**
 * relationshipType을 안전하게 가져옴.
 * meta.relationshipType → duo.relationshipType → '' 순서로 폴백.
 */
export function getRelationshipType(caseData: CaseData): string {
  return caseData.meta?.relationshipType ?? caseData.duo?.relationshipType ?? ''
}

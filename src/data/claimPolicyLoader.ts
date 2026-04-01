/**
 * ClaimPolicy 데이터 로더
 * ─────────────────────────────────
 * GPT가 생성한 사건별 ClaimPolicy 데이터를 로드한다.
 * 데이터가 없는 사건은 null을 반환 → 기존 truthPolicy 경로로 폴백.
 */

import type { ClaimPolicy, CaseClaimPolicies } from '../types'
import type { LieState } from '../types'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 데이터 저장소
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const registry: CaseClaimPolicies = {}

/**
 * ClaimPolicy 데이터를 등록한다.
 * GPT가 생성한 JSON을 import 후 이 함수로 등록.
 */
export function registerClaimPolicies(
  caseId: string,
  policies: Record<'a' | 'b', Record<string, Record<LieState, ClaimPolicy>>>,
): void {
  registry[caseId] = policies
}

/**
 * 특정 사건/당사자/쟁점/상태의 ClaimPolicy를 조회한다.
 * 데이터가 없으면 null 반환 → 기존 truthPolicy 경로 사용.
 */
export function getClaimPolicy(
  caseId: string,
  party: 'a' | 'b',
  disputeId: string,
  lieState: LieState,
): ClaimPolicy | null {
  return registry[caseId]?.[party]?.[disputeId]?.[lieState] ?? null
}

/**
 * 특정 사건에 ClaimPolicy가 등록되어 있는지 확인한다.
 */
export function hasClaimPolicy(caseId: string): boolean {
  return caseId in registry
}

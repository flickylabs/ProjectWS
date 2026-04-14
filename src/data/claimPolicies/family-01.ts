/**
 * family-01 데이터 등록 (v3 fallback 패턴)
 * ─────────────────────────────────────────
 * runtimeCase에서 ClaimPolicies를 자동 생성하고,
 * v3GameLoopData는 fallback으로 빈 DossierCards + 자동 이벤트/전이 비트를 사용한다.
 * GPT Pro에서 올바른 DossierCards가 생성되면 v3GameLoopData를 교체할 것.
 */
import { registerClaimPolicies } from '../claimPolicyLoader'
import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import { registerStructureV2 } from '../../engine/v2DataLoader'
import runtimeCase from '../cases/generated/family-01.json'
import structureV2 from './family-01-structure-v2.json'
import { buildV3FallbackClaimPolicies } from './v3FallbackClaimPolicies'
import { ensureV3RuntimeGameLoopData } from './v3FallbackGameLoopData'

export function registerFamily01Data(): void {
  console.log('[Renewal] family-01 data registration start')

  // Case JSON 기반 ClaimPolicies 자동 생성
  const runtimeV3Data = ensureV3RuntimeGameLoopData(runtimeCase as any, { caseId: 'family-01' } as any)
  registerClaimPolicies('family-01', buildV3FallbackClaimPolicies(runtimeCase as any, runtimeV3Data as any))
  registerV3GameLoopData(runtimeV3Data as any)

  // Structure V2 등록 (최소 유효 — GPT Pro 확장 대기)
  registerStructureV2(structureV2 as any)

  console.log('[Renewal] family-01 registration complete (v3 fallback)')
}

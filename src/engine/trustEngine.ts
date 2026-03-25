import type { TrustState } from '../types'
import { TRUST_THRESHOLDS } from '../utils/constants'

export function createInitialTrustState(): TrustState {
  return {
    trustTowardJudge: 30,
    fearOfExposure: 50,
    retaliationWorry: 30,
  }
}

export function updateTrust(
  current: TrustState,
  field: keyof TrustState,
  delta: number,
): TrustState {
  return {
    ...current,
    [field]: Math.max(0, Math.min(100, current[field] + delta)),
  }
}

export function canVoluntaryConfess(trust: TrustState): boolean {
  return trust.trustTowardJudge >= TRUST_THRESHOLDS.voluntaryConfession
}

export function canAcceptConfidential(trust: TrustState): boolean {
  return trust.trustTowardJudge >= TRUST_THRESHOLDS.confidentialAcceptance
}

export function canConsentToDisclosure(trust: TrustState): boolean {
  return trust.trustTowardJudge >= TRUST_THRESHOLDS.preDisclosureConsent
}

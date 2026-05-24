/**
 * Core Narrative Wrapper — Cycle 2+ Integration helpers.
 *
 * 책임: Authority (.case.ts) 의 dossierCards / witnesses / disputes 데이터에서
 *      narrativeTriggers 를 lookup하고 narrativeOrchestrator로 평가 + dispatch.
 *
 * 호출자: useActionDispatch — 각 emergence trigger 시점에 호출.
 *
 * MVP scope (Cycle 2):
 *   - dossier / witness: non-gating wrapper — 본 surface 흐름은 caller가 그대로 진행하고,
 *     본 helper는 narrative dialogue 추가 + fire/legacy 마킹만 담당.
 *   - dispute: caller가 fire 실패 시 emergeDispute 보류 후 fallback turn 대기.
 *   - 모든 type fallback: 매 턴 종료 시 일괄 평가 (judge_auto_mention 우선 발화).
 */

import { useGameStore } from '../store/useGameStore'
import { getCachedCoreCaseAuthority } from './coreCaseAuthorityLoader'
import {
  attemptNarrativeForDossier,
  attemptFallbackForDossier,
  attemptNarrativeForWitness,
  attemptFallbackForWitness,
  attemptNarrativeForDispute,
  attemptFallbackForDispute,
} from './narrativeOrchestrator'
import type { NarrativeTriggerFireResult } from '../types/narrativeTrigger'

interface NarrativeStoreView {
  caseData?: { caseId?: string }
  turnCount?: number
  firedEmergences?: Record<string, { triggerId: string; turn: number }>
  narrativeLegacyEligibleTurns?: Record<string, number>
  markNarrativeFiredEmergence?: (id: string, triggerId: string, turn: number) => void
  markNarrativeLegacyEligible?: (id: string, turn: number) => void
}

function readNarrativeStore(): NarrativeStoreView {
  return useGameStore.getState() as unknown as NarrativeStoreView
}

function getCurrentTurn(): number {
  return readNarrativeStore().turnCount ?? 0
}

function getCachedAuthority() {
  const caseId = readNarrativeStore().caseData?.caseId
  if (!caseId) return null
  return getCachedCoreCaseAuthority(caseId)
}

function applyAttemptOutcome(
  emergenceId: string,
  attempt: NarrativeTriggerFireResult | null | undefined,
  currentTurn: number,
): NarrativeTriggerFireResult | null | undefined {
  const store = readNarrativeStore()
  if (attempt) {
    store.markNarrativeFiredEmergence?.(emergenceId, attempt.triggerId, currentTurn)
  } else if (attempt === null) {
    store.markNarrativeLegacyEligible?.(emergenceId, currentTurn)
  }
  return attempt
}

// ─────────────────────────────────────────────────────────────────────────────
// Dossier (CoreDossierCard) — combination 성공 후 호출.
// ─────────────────────────────────────────────────────────────────────────────

export function attemptCoreNarrativeForDossier(
  dossierId: string,
  lastActionContext: string,
  lastFiredRecipeId?: string,
): NarrativeTriggerFireResult | null | undefined {
  const authority = getCachedAuthority()
  if (!authority) return undefined
  const dossierDef = authority.dossierCards.find((c) => c.id === dossierId)
  if (!dossierDef?.narrativeTriggers || dossierDef.narrativeTriggers.length === 0) return undefined

  const store = readNarrativeStore()
  const currentTurn = getCurrentTurn()
  const fired = store.firedEmergences?.[dossierId]
  const legacyEligibleTurn = store.narrativeLegacyEligibleTurns?.[dossierId]

  const attempt = attemptNarrativeForDossier({
    dossierDef,
    currentTurn,
    lastActionContext,
    lastFiredRecipeId,
    firedTrigger: fired?.triggerId,
    legacyEligibleTurn,
  })
  return applyAttemptOutcome(dossierId, attempt, currentTurn)
}

// ─────────────────────────────────────────────────────────────────────────────
// Witness (CoreWitness) — handleCallWitness 진입 시 호출.
// ─────────────────────────────────────────────────────────────────────────────

export function attemptCoreNarrativeForWitness(
  witnessId: string,
  lastActionContext: string,
): NarrativeTriggerFireResult | null | undefined {
  const authority = getCachedAuthority()
  if (!authority) return undefined
  const witnessDef = authority.witnesses.find((w) => w.id === witnessId)
  if (!witnessDef?.narrativeTriggers || witnessDef.narrativeTriggers.length === 0) return undefined

  const store = readNarrativeStore()
  const currentTurn = getCurrentTurn()
  const fired = store.firedEmergences?.[witnessId]
  const legacyEligibleTurn = store.narrativeLegacyEligibleTurns?.[witnessId]

  const attempt = attemptNarrativeForWitness({
    witnessDef,
    currentTurn,
    lastActionContext,
    firedTrigger: fired?.triggerId,
    legacyEligibleTurn,
  })
  return applyAttemptOutcome(witnessId, attempt, currentTurn)
}

// ─────────────────────────────────────────────────────────────────────────────
// Dispute (CoreDispute) — emergeDispute 직전 호출. fire 실패 시 caller가 emerge 보류.
// ─────────────────────────────────────────────────────────────────────────────

export function attemptCoreNarrativeForDispute(
  disputeId: string,
  lastActionContext: string,
): NarrativeTriggerFireResult | null | undefined {
  const authority = getCachedAuthority()
  if (!authority) return undefined
  const disputeDef = authority.disputes.find((d) => d.id === disputeId)
  if (!disputeDef?.narrativeTriggers || disputeDef.narrativeTriggers.length === 0) return undefined

  const store = readNarrativeStore()
  const currentTurn = getCurrentTurn()
  const fired = store.firedEmergences?.[disputeId]
  const legacyEligibleTurn = store.narrativeLegacyEligibleTurns?.[disputeId]

  const attempt = attemptNarrativeForDispute({
    disputeDef,
    currentTurn,
    lastActionContext,
    firedTrigger: fired?.triggerId,
    legacyEligibleTurn,
  })
  return applyAttemptOutcome(disputeId, attempt, currentTurn)
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback turn-end pass — judge_auto_mention 자율 발화 (모든 emergence type 일괄).
// ─────────────────────────────────────────────────────────────────────────────

/**
 * 매 턴 종료 시 호출. legacy-eligible turn으로부터 N턴 경과 + 미발동인 emergence를 순회하며
 * judge_auto_mention 후보 fire 시도. 첫 fire 성공한 emergence가 본 턴의 fallback narrative로
 * 등장. (한 턴 한 fallback만 발화 — 사용자 인지 부담 회피)
 */
export function attemptCoreNarrativeFallbackForAll(): NarrativeTriggerFireResult | null {
  const authority = getCachedAuthority()
  if (!authority) return null
  const store = readNarrativeStore()
  const currentTurn = getCurrentTurn()

  // 우선순위: dossier → evidence (cycle 1) → witness → dispute. 첫 fire 시 return.
  for (const dossier of authority.dossierCards) {
    if (!dossier.narrativeTriggers || dossier.narrativeTriggers.length === 0) continue
    const fired = store.firedEmergences?.[dossier.id]
    if (fired) continue
    const legacyEligibleTurn = store.narrativeLegacyEligibleTurns?.[dossier.id]
    if (legacyEligibleTurn === undefined) continue
    const attempt = attemptFallbackForDossier({
      dossierDef: dossier,
      currentTurn,
      firedTrigger: undefined,
      legacyEligibleTurn,
    })
    if (attempt) {
      applyAttemptOutcome(dossier.id, attempt, currentTurn)
      return attempt
    }
  }

  for (const witness of authority.witnesses) {
    if (!witness.narrativeTriggers || witness.narrativeTriggers.length === 0) continue
    const fired = store.firedEmergences?.[witness.id]
    if (fired) continue
    const legacyEligibleTurn = store.narrativeLegacyEligibleTurns?.[witness.id]
    if (legacyEligibleTurn === undefined) continue
    const attempt = attemptFallbackForWitness({
      witnessDef: witness,
      currentTurn,
      firedTrigger: undefined,
      legacyEligibleTurn,
    })
    if (attempt) {
      applyAttemptOutcome(witness.id, attempt, currentTurn)
      return attempt
    }
  }

  for (const dispute of authority.disputes) {
    if (!dispute.narrativeTriggers || dispute.narrativeTriggers.length === 0) continue
    const fired = store.firedEmergences?.[dispute.id]
    if (fired) continue
    const legacyEligibleTurn = store.narrativeLegacyEligibleTurns?.[dispute.id]
    if (legacyEligibleTurn === undefined) continue
    const attempt = attemptFallbackForDispute({
      disputeDef: dispute,
      currentTurn,
      firedTrigger: undefined,
      legacyEligibleTurn,
    })
    if (attempt) {
      applyAttemptOutcome(dispute.id, attempt, currentTurn)
      return attempt
    }
  }

  return null
}

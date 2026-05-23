import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  Phase,
  type CombinationLabNode,
  type CombinationLabOutput,
  type CombinationLabRecipe,
  type CaseData,
  type EmotionalPhase,
  type LieState,
} from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import type { AuraStyle, ResonanceStyle } from '../../../store/slices/judgeObservationSlice'
import { isEvidenceFullyInvestigated } from '../../../engine/evidenceEngine'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'
import { getPcArchetypeLabel, getPcTellDescription, getPcTellLabel as _getPcTellLabel } from '../pcUiLabels'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import { closePcInteractionPanel, openPcInteractionPanel, type PcInteractionAction, type PcInteractionPayload } from '../layout/PCInteractionPanel'
import { showToast } from '../../common/Toast'
import { showGuideCutscene } from '../../common/guideCutscene'
import { getCombinationComment } from '../../../data/combinationComments'
import { PC_ADD_COMBINATION_NOTE_EVENT, type PcCombinationPanelEventDetail, type PcPinnedNote } from './PCImportantNotesSection'
import { playCombinationFailure, playCombinationSuccess } from '../../../engine/soundEngine'
import { cleanOutputLabel, cleanOutputSummary } from '../../../utils/combinationLabels'
import { translate, useI18n, type MessageKey } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'
import ArchetypeTag from '../tags/ArchetypeTag'
import { afterDisputeRibbonExpansion, requestDisputeRibbonExpansion } from '../layout/disputeRibbonEvents'
import type { UnsafeAny } from '../../../types/lint'


const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const COMBINATION_SUCCESS_SOURCE_SELECTOR = '[data-resonance-target="combination-success"]'
const JUDGE_OBSERVATION_SELECTOR = '[data-resonance-target="jobs-main"]'
const JUDGE_NOTEBOOK_SELECTOR = '[data-resonance-target="judge-notebook"]'
const COMBINATION_RESONANCE_DELAY_MS = 260
const COMBINATION_RESULT_PANEL_DELAY_MS = 3100


const EMOTION_LABEL_KEYS: Record<EmotionalPhase, MessageKey> = {
  defensive: 'pc.hotbar.emotion.defensive',
  confident: 'pc.hotbar.emotion.confident',
  shaken: 'pc.hotbar.emotion.shaken',
  angry: 'pc.hotbar.emotion.angry',
  resigned: 'pc.hotbar.emotion.resigned',
}

type TargetInfoDrawer = 'emotion' | 'trust' | 'leak' | 'lieStages' | 'contradiction' | 'profile'

export default function PCRightPanel() {
  const { locale, t } = useI18n()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const pcTargetParty = useStore((s) => s.pcTargetParty)
  const setPcTargetParty = useStore((s) => s.setPcTargetParty)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const setLastFocusedDisputeId = useStore((s) => s.setLastFocusedDisputeId)
  const disputeVisibility = useStore((s) => s.discovery?.disputeVisibility)
  const questionMeters = useStore((s) => s.questionMeters)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const archetypeA = useStore((s) => s.archetypeA)
  const archetypeB = useStore((s) => s.archetypeB)
  const observedArchetypes = useStore((s) => s.observedArchetypes)
  const combinationLabRuntime = useStore((s) => s.combinationLabRuntime)
  const migrateCombinationLabRuntime = useStore((s) => s.migrateCombinationLabRuntime)
  const _pcSummaryUnlocked = useStore((s) => s.pcSummaryUnlocked)
  const globalSkillPoints = useStore((s) => s.resources.skillPoints)

  const evidenceCombinations = useStore((s) => s.evidenceCombinations)
  const triggeredCombinations = useStore((s) => s.triggeredCombinations)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const recentlyEmergedDisputeId = useStore((s) => s.recentlyEmergedDisputeId)

  const [comboSlots, setComboSlots] = useState<[string | null, string | null]>([null, null])
  const [autoMatchPanelOpen, setAutoMatchPanelOpen] = useState(false)
  const [autoMatchConfirming, setAutoMatchConfirming] = useState(false)
  const [infoDrawer, setInfoDrawer] = useState<TargetInfoDrawer | null>(null)
  const [selectedLieStageIdx, setSelectedLieStageIdx] = useState<number | null>(null)
  const combinationResultPanelTimerRef = useRef<number | null>(null)

  useEffect(() => () => {
    if (combinationResultPanelTimerRef.current !== null) {
      window.clearTimeout(combinationResultPanelTimerRef.current)
      combinationResultPanelTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    migrateCombinationLabRuntime()
  }, [migrateCombinationLabRuntime, caseData?.caseId])

  // Phase 1 (사전진술) 등에서는 심문/증거 액션 자체가 의미 없음 — 기록 정리도 차단.
  // 활성 Phase 체계: 0 → 1 → 2(Phase.Interrogation) → 3a → 3b
  const isInterrogationPhase = currentPhase === Phase.Interrogation

  if (!caseData) {
    return null
  }

  const store = useGameStore.getState()
  const targetProfile = pcTargetParty === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const targetAgent = pcTargetParty === 'a' ? agentA : agentB
  const targetArchetype = pcTargetParty === 'a' ? archetypeA : archetypeB
  const targetMeters = questionMeters[pcTargetParty]
  const visibleDisputes = caseData.disputes.filter((d) => {
    const v = disputeVisibility?.[d.id]
    return !v || v.visibility !== 'hidden'
  })
  const activeDispute =
    visibleDisputes.find((dispute) => dispute.id === lastFocusedDisputeId) ?? visibleDisputes[0] ?? null
  const disputeTokens = activeDispute
    ? (targetMeters.contradictionTokensByDispute[activeDispute.id] ?? 0)
    : 0
  const activeLieState = activeDispute ? targetAgent.lieStateMap[activeDispute.id]?.currentState ?? 'S0' : 'S0'
  const activeLieIndex = LIE_STATES.indexOf(activeLieState)
  const activeDisputeIdx = activeDispute ? visibleDisputes.findIndex((d) => d.id === activeDispute.id) : -1
  // 루프(순환) 네비게이션: 끝에서 반대쪽으로 돌아감
  const canCycleDispute = visibleDisputes.length > 1
  const goPrevDispute = () => {
    if (!canCycleDispute || activeDisputeIdx < 0) return
    const next = (activeDisputeIdx - 1 + visibleDisputes.length) % visibleDisputes.length
    setLastFocusedDisputeId(visibleDisputes[next].id)
  }
  const goNextDispute = () => {
    if (!canCycleDispute || activeDisputeIdx < 0) return
    const next = (activeDisputeIdx + 1) % visibleDisputes.length
    setLastFocusedDisputeId(visibleDisputes[next].id)
  }
  const tellType = targetProfile.verbalTells[0]?.type ?? ''
  const faceId = getPcFaceSymbolId(pcTargetParty, targetProfile, targetAgent.emotionalState.phase)
  const trustStateLabel = getTrustStateLabel(targetAgent.trustState.trustTowardJudge, t)
  const emotionStateValue = Math.max(0, Math.min(100, Math.round(targetAgent.emotionalState.internalValue ?? 0)))
  const trustStateValue = Math.max(0, Math.min(100, Math.round(targetAgent.trustState.trustTowardJudge ?? 0)))
  const showCombination = currentPhase === Phase.Interrogation

  // 조합 준비 완료 감지 — 양쪽 모두 해금된 미완료 레시피 수 변화 → 얼럿 + shimmer
  const readyComboCount = useMemo(() => {
    const triggered = new Set(triggeredCombinations)
    const defById = new Map(evidenceDefinitions.map((d) => [d.id, d]))
    const isEvReady = (eid: string) => {
      const st = evidenceStates[eid]
      if (!st?.unlocked) return false
      return isEvidenceFullyInvestigated(st, defById.get(eid))
    }
    const fromEvCombo = (evidenceCombinations ?? []).filter((combo) => {
      const key = combo.requires.join('+')
      if (triggered.has(key)) return false
      return combo.requires.every((eid) => isEvReady(eid))
    }).length
    const applied = new Set(combinationLabRuntime.appliedRecipeIds ?? [])
    const discovered = new Set(combinationLabRuntime.discoveredNodeIds ?? [])
    const fromLab = (combinationLabRuntime.config?.recipes ?? []).filter((recipe) => {
      if (applied.has(recipe.id) && !recipe.repeatable) return false
      const output = combinationLabRuntime.config?.outputs.find((item) => item.id === recipe.outputId)
      if (output && discovered.has(output.id) && !recipe.repeatable) return false
      return recipe.inputs.every((id) => isEvReady(id) || discovered.has(id))
    }).length
    return fromEvCombo + fromLab
  }, [evidenceCombinations, triggeredCombinations, evidenceStates, combinationLabRuntime, evidenceDefinitions])

  const prevReadyCount = useRef(-1)
  useEffect(() => {
    if (prevReadyCount.current >= 0 && readyComboCount > prevReadyCount.current) {
      showGuideCutscene(translate('pc.combo.readyPairToast'), '.pc-combination-card')
    }
    prevReadyCount.current = readyComboCount
  }, [readyComboCount])

  const hasReadyCombos = readyComboCount > 0

  // 자동 매칭 대상: combinationLab 레시피 중 모든 입력이 준비됐고 아직 적용되지 않은 것
  // (증거는 unlocked + investigationStages 모두 완료 시에만 ready)
  const readyLabRecipes = useMemo(() => {
    const config = combinationLabRuntime.config
    if (!config?.recipes) return [] as CombinationLabRecipe[]
    const applied = new Set(combinationLabRuntime.appliedRecipeIds ?? [])
    const discovered = new Set(combinationLabRuntime.discoveredNodeIds ?? [])
    const nodeTypeById = new Map<string, string>(config.nodes.map((n: CombinationLabNode) => [n.id, n.type]))
    const outputById = new Map(config.outputs.map((output: CombinationLabOutput) => [output.id, output]))
    const defById = new Map(evidenceDefinitions.map((d) => [d.id, d]))
    return config.recipes.filter((recipe: CombinationLabRecipe) => {
      if (applied.has(recipe.id) && !recipe.repeatable) return false
      const output = outputById.get(recipe.outputId)
      if (output && discovered.has(output.id) && !recipe.repeatable) return false
      return recipe.inputs.every((id) => {
        const type = nodeTypeById.get(id)
        if (type === 'evidence' || type === 'derived_evidence') {
          const st = evidenceStates[id]
          if (!st?.unlocked) return false
          return isEvidenceFullyInvestigated(st, defById.get(id))
        }
        return discovered.has(id)
      })
    })
  }, [combinationLabRuntime, evidenceStates, evidenceDefinitions])

  // 레시피 카테고리 breakdown (증거+증거 / 증거+발언 / 발언+발언) — ready vs potential
  const recipeBreakdown = useMemo(() => {
    const out = {
      ee: { ready: 0, potential: 0 },
      es: { ready: 0, potential: 0 },
      ss: { ready: 0, potential: 0 },
    }
    const config = combinationLabRuntime.config
    if (!config?.recipes) return out
    const applied = new Set(combinationLabRuntime.appliedRecipeIds ?? [])
    const discovered = new Set(combinationLabRuntime.discoveredNodeIds ?? [])
    const nodeTypeById = new Map<string, string>(config.nodes.map((n: CombinationLabNode) => [n.id, n.type]))
    const outputById = new Map(config.outputs.map((output: CombinationLabOutput) => [output.id, output]))
    const defById = new Map(evidenceDefinitions.map((d) => [d.id, d]))
    const isReady = (id: string) => {
      const t = nodeTypeById.get(id)
      if (t === 'evidence' || t === 'derived_evidence') {
        const st = evidenceStates[id]
        if (!st?.unlocked) return false
        return isEvidenceFullyInvestigated(st, defById.get(id))
      }
      return discovered.has(id)
    }
    const isEvidence = (id: string) => {
      const t = nodeTypeById.get(id)
      return t === 'evidence' || t === 'derived_evidence'
    }
    for (const recipe of config.recipes) {
      if (applied.has(recipe.id) && !recipe.repeatable) continue
      const output = outputById.get(recipe.outputId)
      if (output && discovered.has(output.id) && !recipe.repeatable) continue
      if (recipe.inputs.length !== 2) continue
      const [a, b] = recipe.inputs
      const allReady = isReady(a) && isReady(b)
      const evCount = (isEvidence(a) ? 1 : 0) + (isEvidence(b) ? 1 : 0)
      const cat = evCount === 2 ? 'ee' : evCount === 1 ? 'es' : 'ss'
      if (allReady) out[cat].ready += 1
      else out[cat].potential += 1
    }
    return out
  }, [combinationLabRuntime, evidenceStates, evidenceDefinitions])

  const autoMatchCost = 1
  const canAutoMatch = readyLabRecipes.length > 0 && globalSkillPoints >= autoMatchCost

  const handleAutoMatchConfirm = useCallback(() => {
    if (!canAutoMatch) return
    // 첫 번째 준비된 레시피 선택
    const recipe = readyLabRecipes[0]
    if (!recipe) return
    const spent = (store as UnsafeAny).spend('skillPoints', autoMatchCost)
    if (!spent) {
      showToast(t('pc.right.toast.insufficientSkill'), 'info')
      return
    }
    const [a, b] = recipe.inputs
    setComboSlots([a ?? null, b ?? null])
    setAutoMatchPanelOpen(false)
    setAutoMatchConfirming(false)
    showGuideCutscene(t('pc.right.toast.autoMatched'), '.pc-combination-card', { autoDismissMs: 3000 })
  }, [canAutoMatch, readyLabRecipes, store, t])

  // config가 null이면 caseData에서 직접 초기화 시도
  useEffect(() => {
    if (!combinationLabRuntime.config && caseData?.combinationLab && showCombination) {
      useGameStore.getState().initCombinationLab(caseData)
    }
  }, [combinationLabRuntime.config, caseData, showCombination])

  const availableNodes = useMemo(() => {
    const config = combinationLabRuntime.config
    if (!config) {
      return [] as CombinationLabNode[]
    }

    return config.nodes.filter((node) => {
      if (node.type === 'evidence' || node.type === 'derived_evidence') {
        return Boolean(evidenceStates[node.id]?.unlocked)
      }
      return combinationLabRuntime.discoveredNodeIds.includes(node.id)
    })
  }, [combinationLabRuntime.config, combinationLabRuntime.discoveredNodeIds, evidenceStates])

  const comboNodeA = comboSlots[0]
    ? (availableNodes.find((node) => node.id === comboSlots[0])
      ?? (comboSlots[0] ? { id: comboSlots[0], type: 'evidence' as const, label: caseData?.evidence.find((e) => e.id === comboSlots[0])?.surfaceName ?? comboSlots[0], visibility: 'base' as const } as CombinationLabNode : null))
    : null
  const comboNodeB = comboSlots[1]
    ? (availableNodes.find((node) => node.id === comboSlots[1])
      ?? (comboSlots[1] ? { id: comboSlots[1], type: 'evidence' as const, label: caseData?.evidence.find((e) => e.id === comboSlots[1])?.surfaceName ?? comboSlots[1], visibility: 'base' as const } as CombinationLabNode : null))
    : null
  const comboNodeADisplay = comboNodeA ? getNodeDisplayLabel(comboNodeA, caseData, locale) : null
  const comboNodeBDisplay = comboNodeB ? getNodeDisplayLabel(comboNodeB, caseData, locale) : null
  const comboReady = Boolean(comboSlots[0] && comboSlots[1])

  const matchingRecipe = useMemo(() => {
    const config = combinationLabRuntime.config
    if (!config || !comboSlots[0] || !comboSlots[1]) {
      return null as CombinationLabRecipe | null
    }

    return config.recipes.find((recipe) => sameInputs(recipe.inputs, comboSlots.filter(Boolean) as string[])) ?? null
  }, [combinationLabRuntime.config, comboSlots])

  const matchingOutput = useMemo(() => {
    const config = combinationLabRuntime.config
    if (!config || !matchingRecipe) {
      return null as CombinationLabOutput | null
    }

    return config.outputs.find((output) => output.id === matchingRecipe.outputId) ?? null
  }, [combinationLabRuntime.config, matchingRecipe])

  const tellDescription = localizeRuntimeText(getPcTellDescription(tellType), locale)
  const _currentHint = tellDescription
    || (
      activeDispute
        ? localizeRuntimeText(`${activeDispute.name} 쟁점에서 한 번 더 질문하면 드러날 반응 정보입니다.`, locale)
        : t('pc.right.drawer.beforeObservation')
    )

  const queueNode = useCallback((nodeId: string) => {
    setComboSlots((current) => {
      if (current.includes(nodeId)) {
        showToast(t('pc.right.toast.duplicateCard'), 'info')
        return current
      }
      if (!current[0]) {
        return [nodeId, current[1]]
      }
      if (!current[1]) {
        return [current[0], nodeId]
      }
      return [current[1], nodeId]
    })
  }, [])

  const clearComboSlots = useCallback(() => {
    setComboSlots([null, null])
  }, [])

  const resolveEvidenceNodeId = useCallback((evidenceId: string) => {
    return (
      availableNodes.find((node) => {
        if (node.type !== 'evidence' && node.type !== 'derived_evidence') {
          return false
        }
        return node.id === evidenceId || node.sourceRef === evidenceId || node.linkedEvidenceIds?.includes(evidenceId)
      })?.id ?? null
    )
  }, [availableNodes])

  const resolveNoteNodeId = useCallback((note: PcPinnedNote) => {
    const noteNodes = availableNodes.filter((node) => node.type === 'note' || node.type === 'derived_note' || node.type === 'statement')
    if (noteNodes.length === 0) {
      return null
    }

    // 1차: statement 노드 라벨의 따옴표 문구로 정확 매칭
    const byQuote = noteNodes.find((node) => {
      const quoteMatch = node.label?.match(/["“”]([^"“”]+)["“”]/)
      if (!quoteMatch) return false
      return note.text.includes(quoteMatch[1])
    })
    if (byQuote) return byQuote.id

    // 2차: 화자 + 쟁점 컨텍스트로 유사 발언 매칭
    //   - statement 노드 라벨에서 "A의 발언" / "B의 발언" 패턴으로 화자 식별
    //   - 대화의 relatedDisputes와 노드의 linkedDisputeIds 교집합이 가장 큰 노드 선택
    const dialogueSpeaker = note.speaker === 'a' ? 'A' : note.speaker === 'b' ? 'B' : null
    if (!dialogueSpeaker) return null

    const getNodeSpeaker = (node: CombinationLabNode): string | null => {
      const m = node.label?.match(/^([AB])의\s*(?:발언|진술|주장)/)
      return m ? m[1] : null
    }

    const sameSpeakerNodes = noteNodes.filter((node) => {
      if (node.type !== 'statement') return false
      return getNodeSpeaker(node) === dialogueSpeaker
    })
    if (sameSpeakerNodes.length === 0) return null

    const dialogueDisputes = new Set(note.relatedDisputes ?? [])
    let best: { node: CombinationLabNode; score: number } | null = null
    for (const node of sameSpeakerNodes) {
      const overlap = (node.linkedDisputeIds ?? []).filter((id) => dialogueDisputes.has(id)).length
      const score = overlap * 10 + 1
      if (!best || score > best.score) {
        best = { node, score }
      }
    }
    return best?.node.id ?? null
  }, [availableNodes])

  const handleCombinationEvent = useCallback((detail: PcCombinationPanelEventDetail) => {
    if (detail.evidenceId) {
      const nodeId = resolveEvidenceNodeId(detail.evidenceId) ?? detail.evidenceId
      queueNode(nodeId)
      return
    }
    if (detail.note) {
      const nodeId = resolveNoteNodeId(detail.note)
      if (!nodeId) {
        showToast(t('pc.right.toast.highlightOnly'), 'info')
        return
      }
      queueNode(nodeId)
    }
  }, [queueNode, resolveEvidenceNodeId, resolveNoteNodeId, t])

  useEffect(() => {
    const handleEvent = (event: Event) => {
      const customEvent = event as CustomEvent<PcCombinationPanelEventDetail>
      handleCombinationEvent(customEvent.detail)
    }

    window.addEventListener(PC_ADD_COMBINATION_NOTE_EVENT, handleEvent)
    return () => window.removeEventListener(PC_ADD_COMBINATION_NOTE_EVENT, handleEvent)
  }, [handleCombinationEvent])

  const handleCombinationDrop = useCallback((event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    const raw = event.dataTransfer.getData(HOTBAR_DRAG_TYPE)
    if (!raw) {
      return
    }

    try {
      const payload = JSON.parse(raw) as { kind?: string; evidenceId?: string; note?: PcPinnedNote }
      handleCombinationEvent({
        evidenceId: payload.kind === 'evidence' ? payload.evidenceId : undefined,
        note: payload.kind === 'note' ? payload.note : undefined,
      })
    } catch {
      // ignore invalid drag payload
    }
  }, [handleCombinationEvent])

  const handleCombinationAttempt = useCallback(() => {
    if (!comboReady) {
      return
    }

    if (!matchingRecipe || !matchingOutput) {
      playCombinationFailure()
      openPcInteractionPanel({
        title: t('pc.right.combo.failure'),
        subtitle: t('pc.right.combo.noResultSubtitle'),
        tone: 'red',
        variant: 'feature',
        body: t('pc.right.combo.noResultBody'),
      })
      clearComboSlots()
      return
    }

    const outputAlreadyRecorded = Boolean(
      matchingOutput &&
      !matchingRecipe.repeatable &&
      combinationLabRuntime.discoveredNodeIds.includes(matchingOutput.id),
    )

    if (outputAlreadyRecorded) {
      playCombinationFailure()
      openPcInteractionPanel({
        title: t('pc.right.combo.alreadyRecorded'),
        subtitle: cleanOutputLabel(matchingOutput.label),
        tone: 'gold',
        variant: 'feature',
        body: t('pc.right.combo.alreadyRecordedBody'),
      })
      clearComboSlots()
      return
    }

    if (!store.canRunCombinationRecipe(matchingRecipe.id)) {
      playCombinationFailure()
      openPcInteractionPanel({
        title: t('pc.right.combo.unavailable'),
        subtitle: t('pc.right.combo.unavailableSubtitle'),
        tone: 'red',
        variant: 'feature',
        body: matchingRecipe.failHint ?? t('pc.right.combo.unavailableBody'),
      })
      clearComboSlots()
      return
    }

    const result = store.runCombinationRecipe(matchingRecipe.id)
    if (!result.ok) {
      playCombinationFailure()
      openPcInteractionPanel({
        title: t('pc.right.combo.failure'),
        subtitle: t('pc.right.combo.generationFailedSubtitle'),
        tone: 'red',
        variant: 'feature',
        body: t('pc.right.combo.generationFailedBody'),
      })
      clearComboSlots()
      return
    }

    const newlyUnlockedWitnesses = result.newlyUnlockedWitnesses ?? []
    const isWitnessResult = hasWitnessCombinationResult(matchingOutput, newlyUnlockedWitnesses)
    const outputSummary = localizeRuntimeText(matchingRecipe.discoveryText || cleanOutputSummary(matchingOutput.summary, matchingOutput.label) || matchingOutput.judgeHint || '', locale)
    const outputLabel = localizeRuntimeText(cleanOutputLabel(matchingOutput.label), locale)
    const witnessNames = newlyUnlockedWitnesses.map((w) => localizeRuntimeText(w.name, locale)).filter(Boolean)
    const panelBody = isWitnessResult
      ? [
          witnessNames.length > 0
            ? t('pc.right.combo.witnessUnlockedNamed', { names: witnessNames.join(', ') })
            : t('pc.right.combo.witnessClueOpened'),
          outputSummary,
        ].filter(Boolean).join('\n')
      : outputSummary
    const primaryDisputeId = getPrimaryCombinationDisputeId(matchingOutput, caseData)
    const combinationResultType = getCombinationResultType(matchingOutput, isWitnessResult)
    const primaryEvidenceId = getPrimaryCombinationEvidenceId(matchingOutput)
    const panelActions: PcInteractionAction[] = []
    if (newlyUnlockedWitnesses.length > 0) {
      const witness = newlyUnlockedWitnesses[0]
      panelActions.push({
        kind: 'summon_witness',
        label: t('pc.right.combo.summonWitness', { name: localizeRuntimeText(witness.name, locale) }),
        witnessId: witness.id,
      })
    } else if (combinationResultType === 'evidence' && primaryEvidenceId) {
      panelActions.push({
        kind: 'open_evidence',
        label: t('pc.right.combo.openNewEvidence'),
        evidenceId: primaryEvidenceId,
      })
    } else if (!isWitnessResult && primaryDisputeId) {
      panelActions.push({
        kind: 'focus_dispute',
        label: t('pc.right.combo.relatedDispute'),
        disputeId: primaryDisputeId,
      })
    }

    store.addDialogue({
      speaker: 'system',
      text: t('pc.right.combo.systemResult', { label: outputLabel, summary: outputSummary ? '\n' + outputSummary : '' }),
      relatedDisputes: matchingOutput.effects
        .flatMap((effect) => [
          effect.targetId,
          effect.upgradeFromId,
          effect.upgradeToId,
          effect.reframeFromId,
          effect.reframeToId,
          effect.splitFromId,
          ...(effect.splitIntoIds ?? []),
          ...(effect.mergeFromIds ?? []),
          effect.mergeToId,
          effect.disputeUpgrade?.disputeId,
        ])
        .filter((value): value is string => Boolean(value)),
      turn: store.turnCount,
    })

    const effectTags = matchingOutput.effects.slice(0, 4).map((effect) => getResultKindLabel(effect.kind))
    const resultPanelPayload: PcInteractionPayload = {
      title: outputLabel,
      subtitle: isWitnessResult ? t('pc.right.combo.tag.newWitness') : t('pc.court.combination.success'),
      tone: 'gold',
      variant: 'feature',
      body: panelBody,
      tags: isWitnessResult ? [t('pc.right.combo.tag.newWitness'), ...effectTags.filter((tag) => tag !== t('pc.right.combo.tag.newStatement'))] : effectTags,
      actions: panelActions,
    }

    if (isWitnessResult) {
      const summary = witnessNames.length > 0
        ? t('pc.right.combo.witnessUnlockedNamed', { names: witnessNames.join(', ') })
        : t('pc.right.combo.witnessClueOpened')
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-eye',
        title: t('pc.right.combo.tag.newWitness'),
        summary,
      })
      store.enqueueFeedback({
        kind: 'witness_choice',
        eyebrow: t('pc.right.combo.tag.newWitness'),
        title: witnessNames.join(', ') || t('pc.right.combo.tag.newWitness'),
        body: t('pc.court.combination.summary.witness'),
        tag: t('pc.right.combo.tag.newWitness'),
        tone: 'green',
        autoDismissMs: 2700,
      })
    } else if (combinationResultType === 'dispute') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-scale',
        title: t('pc.court.combination.summary.dispute'),
        summary: outputSummary || t('pc.court.combination.summary.dispute'),
      })
    } else if (combinationResultType === 'dossier') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-gavel',
        title: t('pc.court.dossier.unlockEyebrow'),
        summary: outputSummary || t('pc.court.combination.summary.question'),
      })
    } else if (combinationResultType === 'question') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-gavel',
        title: t('pc.court.combination.summary.question'),
        summary: outputSummary || t('pc.court.combination.summary.question'),
      })
    } else if (combinationResultType === 'evidence') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'evidence',
        iconId: 'i-doc',
        title: t('pc.court.combination.summary.evidence'),
        summary: outputSummary || t('pc.court.combination.summary.evidence'),
        evidenceId: primaryEvidenceId ?? undefined,
      })
    } else if (combinationResultType === 'mediation') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-heart',
        title: t('pc.court.combination.summary.mediation'),
        summary: outputSummary || t('pc.court.combination.summary.mediation'),
      })
    } else if (combinationResultType === 'note' || combinationResultType === 'statement') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-chat',
        title: combinationResultType === 'note' ? t('pc.court.combination.summary.note') : t('pc.court.combination.summary.statement'),
        summary: outputSummary || t('pc.court.combination.summary.note'),
      })
    } else if (combinationResultType === 'reliability' || combinationResultType === 'context') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'evidence',
        iconId: 'i-link',
        title: combinationResultType === 'reliability' ? t('pc.court.combination.summary.reliability') : t('pc.court.combination.summary.context'),
        summary: outputSummary || t('pc.court.combination.summary.default'),
      })
    }

    // 2) 재판관: 순수 판단 코멘트만 (judgeComment)
    const caseKey = store.caseData?.caseId ?? ''
    const judgeComment = matchingRecipe ? getCombinationComment(caseKey, matchingRecipe.id) : null
    if (judgeComment) {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-gavel',
        title: t('pc.right.summary.record'),
        summary: localizeRuntimeText(judgeComment.trim(), locale),
      })
    }

    // 3) 시스템: 새 증인 소환 알림 (runCombinationRecipe가 반환한 newly unlocked)
    for (const w of result.newlyUnlockedWitnesses ?? []) {
      store.addDialogue({
        speaker: 'system',
        text: t('pc.right.combo.witnessUnlockedNamed', { names: localizeRuntimeText(w.name, locale) }),
        relatedDisputes: [],
        turn: store.turnCount,
      })
    }

    closePcInteractionPanel()

    playCombinationSuccess()
    window.dispatchEvent(new CustomEvent('pc:combination-success', {
      detail: {
        inputs: [comboNodeA, comboNodeB]
          .filter((node): node is NonNullable<typeof comboNodeA> => Boolean(node))
          .map((node) => ({
            label: getNodeDisplayLabel(node, caseData, locale),
            type: node.type,
          })),
        outputLabel,
        outputSummary,
        resultType: combinationResultType,
      },
    }))
    window.setTimeout(() => {
      playCombinationResultResonance(useGameStore.getState(), {
        resultType: combinationResultType,
        outputId: matchingOutput.id,
        disputeId: primaryDisputeId,
        evidenceId: primaryEvidenceId,
      })
    }, COMBINATION_RESONANCE_DELAY_MS)

    if (combinationResultPanelTimerRef.current !== null) {
      window.clearTimeout(combinationResultPanelTimerRef.current)
    }
    combinationResultPanelTimerRef.current = window.setTimeout(() => {
      openPcInteractionPanel(resultPanelPayload)
      combinationResultPanelTimerRef.current = null
    }, COMBINATION_RESULT_PANEL_DELAY_MS)

    clearComboSlots()
  }, [clearComboSlots, comboNodeA, comboNodeB, comboReady, combinationLabRuntime.discoveredNodeIds, locale, matchingOutput, matchingRecipe, store, t])

  const toggleCombinationPanel = useCallback(() => {
    setAutoMatchPanelOpen((v) => !v)
    setAutoMatchConfirming(false)
    setInfoDrawer(null)
  }, [t])

  const openSummaryPanel = useCallback(() => {
    window.dispatchEvent(new Event('pc:open-record-summary'))
  }, [])

  const toggleInfoDrawer = useCallback((drawer: TargetInfoDrawer) => {
    setAutoMatchPanelOpen(false)
    setAutoMatchConfirming(false)
    setInfoDrawer((current) => current === drawer ? null : drawer)
  }, [])

  const toggleLieStageDrawer = useCallback((stageIdx: number | null) => {
    setAutoMatchPanelOpen(false)
    setAutoMatchConfirming(false)
    setSelectedLieStageIdx(stageIdx)
    setInfoDrawer((current) => current === 'lieStages' && selectedLieStageIdx === stageIdx ? null : 'lieStages')
  }, [selectedLieStageIdx])
  const portalRoot = typeof document !== 'undefined' ? document.body : null

  return (
    <div className="pc-play-right">
      <section className="sec pc-target-block">
        <div className="sec-h">
          <PCSvgIcon id="i-person" size={14} />
          <span>{t('pc.right.target.current')}</span>
          <span className="sub">{localizeRuntimeText(targetProfile.name, locale)}</span>
        </div>

        <div className={`pc-target-shell pc-right-card party-${pcTargetParty}`} data-party={pcTargetParty}>
          <div className="pc-target-tabs">
            <button
              className={`pc-target-tab${pcTargetParty === 'a' ? ' is-active' : ''}`}
              onClick={() => setPcTargetParty('a')}
              type="button"
            >
              {localizeRuntimeText(caseData.duo.partyA.name, locale)}
            </button>
            <button
              className={`pc-target-tab${pcTargetParty === 'b' ? ' is-active' : ''}`}
              onClick={() => setPcTargetParty('b')}
              type="button"
            >
              {localizeRuntimeText(caseData.duo.partyB.name, locale)}
            </button>
          </div>

          <div className="target pc-target-profile">
            <div
              className="tgt-face"
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              onClick={() => toggleInfoDrawer('profile')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleInfoDrawer('profile') } }}
              title={t('pc.right.target.profileDetails', { name: localizeRuntimeText(targetProfile.name, locale) })}
            >
              <PCCharacterPortrait
                alt={localizeRuntimeText(targetProfile.name, locale)}
                caseId={caseData.caseId}
                emotion={targetAgent.emotionalState.phase}
                fallbackSymbolId={faceId}
                lieState={activeLieState}
                party={pcTargetParty}
                size={72}
              />
            </div>

            <div className="pc-target-copy__main">
              <div className="tgt-meta">{t('pc.right.target.ageOccupation', { age: targetProfile.age, occupation: localizeRuntimeText(targetProfile.occupation, locale) })}</div>
              <div className="tgt-tags">
                {(observedArchetypes[pcTargetParty] ?? []).map((arch) => (
                  <ArchetypeTag key={arch} archetype={arch} party={pcTargetParty} />
                ))}
              </div>
            </div>

          </div>

          {/* 공통 섹션 — 감정 / 신뢰 / 누설 한 묶음 (클릭 시 안내 드로어) */}
          <div className="pc-target-common">
            <div className="pc-target-state-row-group">
              <div
                className="pc-target-state-row is-interactive"
                role="button"
                tabIndex={0}
                onClick={() => toggleInfoDrawer('emotion')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleInfoDrawer('emotion') } }}
              >
                <span>{t('pc.right.emotion')}</span>
                <strong>{t(EMOTION_LABEL_KEYS[targetAgent.emotionalState.phase])}</strong>
              </div>
              <div
                className="pc-target-state-row is-interactive"
                data-resonance-target={`trust-${pcTargetParty}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleInfoDrawer('trust')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleInfoDrawer('trust') } }}
              >
                <span>{t('pc.right.trustState')}</span>
                <strong>{trustStateLabel}</strong>
              </div>
            </div>
            <MeterRow
              icon={<PCSvgIcon id="i-drop" size={15} />}
              label={t('pc.right.leak')}
              valueText={`${targetMeters.leakMeter}%`}
              width={targetMeters.leakMeter}
              tone="gold"
              onClick={() => toggleInfoDrawer('leak')}
            />
          </div>

          <div className="pc-target-divider" aria-hidden="true" />

          {/* 쟁점 카드 — nav + 도달 단계 + lie-bar + 이 쟁점의 모순 */}
          <div
            className={`pc-target-dispute-card${activeDispute && recentlyEmergedDisputeId === activeDispute.id ? ' pc-hotbar-slot-pulse' : ''}`}
          >
            <div className="pc-target-dispute-nav">
              <button
                type="button"
                className="pc-target-dispute-nav__arrow"
                onClick={goPrevDispute}
                disabled={!canCycleDispute}
                aria-label={t('pc.right.dispute.prev')}
              >
                ◀
              </button>
              <span
                className="pc-target-dispute-nav__name"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleLieStageDrawer(null)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLieStageDrawer(null) } }}
                title={t('pc.right.dispute.stageGuide')}
              >
                {activeDispute?.name ? localizeRuntimeText(activeDispute.name, locale) : t('pc.right.target.noDispute')}
              </span>
              <button
                type="button"
                className="pc-target-dispute-nav__arrow"
                onClick={goNextDispute}
                disabled={!canCycleDispute}
                aria-label={t('pc.right.dispute.next')}
              >
                ▶
              </button>
            </div>

            <div className="pc-target-lie-status">
              <span className="pc-target-lie-status__big">{t('pc.right.dispute.stageTitle')}</span>
              <span className="pc-target-lie-status__step">{activeLieIndex} / 5</span>
            </div>

            <div className="lie-bar">
              {LIE_STATES.map((state, index) => {
                let className = 'lie-s ls-lock'
                if (index < activeLieIndex) {
                  className = 'lie-s ls-done'
                }
                if (index === activeLieIndex) {
                  className = 'lie-s ls-now'
                }

                return (
                  <div
                    className={className}
                    data-resonance-target={`liestate-${pcTargetParty}-${state}`}
                    key={state}
                    role="button"
                    tabIndex={0}
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleLieStageDrawer(index)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLieStageDrawer(index) } }}
                    title={t('pc.right.dispute.stageIndexGuide', { index })}
                  >
                    {index}
                  </div>
                )
              })}
            </div>

            {/* 이 쟁점의 모순 — 한 칸씩 */}
            <div
              className="pc-target-contradiction"
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
              onClick={() => toggleInfoDrawer('contradiction')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleInfoDrawer('contradiction') } }}
              title={t('pc.right.contradictionGuide')}
            >
              <span className="pc-target-contradiction__label">
                <PCSvgIcon id="i-conflict" size={12} />
                {t('pc.right.contradiction')}
              </span>
              <div className="pc-target-contradiction__pips">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`pc-target-contradiction__pip${i < disputeTokens ? ' is-filled' : ''}`}
                  />
                ))}
              </div>
              <span className="pc-target-contradiction__count">
                {disputeTokens} / 5
              </span>
            </div>
          </div>

          {/* 정보 드로어 — 감정 / 신뢰 / 누설 안내 (프로필 카드 왼쪽으로 확장) */}
          {portalRoot ? createPortal(
            <aside
            className={`pc-target-info-drawer${infoDrawer ? ' is-open' : ''}`}
            aria-hidden={!infoDrawer}
            aria-label={t('pc.right.drawer.factorGuide')}
          >
            <header className="pc-target-info-drawer__header">
              <div className="pc-target-info-drawer__title">
                {infoDrawer === 'emotion' && t('pc.right.drawer.emotion')}
                {infoDrawer === 'trust' && t('pc.right.drawer.trust')}
                {infoDrawer === 'leak' && t('pc.right.drawer.leak')}
                {infoDrawer === 'lieStages' && t('pc.right.drawer.lieStages')}
                {infoDrawer === 'contradiction' && t('pc.right.drawer.contradiction')}
                {infoDrawer === 'profile' && t('pc.right.drawer.profile', { name: localizeRuntimeText(targetProfile.name, locale) })}
              </div>
              <button
                type="button"
                className="pc-target-info-drawer__close"
                onClick={() => setInfoDrawer(null)}
                aria-label={t('pc.common.close')}
              >
                ✕
              </button>
            </header>

            {infoDrawer === 'emotion' ? (() => {
              const currentPhase = targetAgent.emotionalState.phase
              const rows = [
                { phase: 'defensive' as const, label: t('pc.right.drawer.emotion.defensive'), desc: t('pc.right.drawer.emotion.defensiveDesc') },
                { phase: 'confident' as const, label: t('pc.right.drawer.emotion.confident'), desc: t('pc.right.drawer.emotion.confidentDesc') },
                { phase: 'shaken' as const, label: t('pc.right.drawer.emotion.shaken'), desc: t('pc.right.drawer.emotion.shakenDesc') },
                { phase: 'angry' as const, label: t('pc.right.drawer.emotion.angry'), desc: t('pc.right.drawer.emotion.angryDesc') },
                { phase: 'resigned' as const, label: t('pc.right.drawer.emotion.resigned'), desc: t('pc.right.drawer.emotion.resignedDesc') },
              ]
              return (
                <>
                  <p className="pc-target-info-drawer__lede">
                    {t('pc.right.drawer.emotionLede')}
                  </p>
                  <ul className="pc-target-info-drawer__list">
                    {rows.map((row) => {
                      const isCurrent = currentPhase === row.phase
                      const dimStyle = !isCurrent ? { color: '#4b5563', opacity: 0.55 } : undefined
                      const selStyle = isCurrent ? { background: 'rgba(251, 191, 36, 0.12)', borderLeft: '2px solid #fbbf24', paddingLeft: '8px', borderRadius: '4px' } : undefined
                      return (
                        <li key={row.phase} style={{ ...(dimStyle ?? {}), ...(selStyle ?? {}) }}>
                          <strong>{row.label}</strong> — {row.desc}
                        </li>
                      )
                    })}
                  </ul>
                  <div className="pc-target-info-drawer__now">
                    <span>{t('pc.right.drawer.currentState')}</span>
                    <strong>{t(EMOTION_LABEL_KEYS[currentPhase])} · {emotionStateValue}/100</strong>
                  </div>
                </>
              )
            })() : null}

            {infoDrawer === 'trust' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  {t('pc.right.drawer.trustLede')}
                </p>
                <div className="pc-target-info-drawer__columns">
                  <div>
                    <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.trustUp')}</div>
                    <ul>
                      <li>{t('pc.right.drawer.trustUpEmpathy')}</li>
                      <li>{t('pc.right.drawer.trustUpListening')}</li>
                      <li>{t('pc.right.drawer.trustUpPrivate')}</li>
                    </ul>
                  </div>
                  <div>
                    <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.trustDown')}</div>
                    <ul>
                      <li>{t('pc.right.drawer.trustDownContradiction')}</li>
                      <li>{t('pc.right.drawer.trustDownCounter')}</li>
                      <li>{t('pc.right.drawer.trustDownPressure')}</li>
                    </ul>
                  </div>
                </div>
                <p className="pc-target-info-drawer__tip">
                  {t('pc.right.drawer.trustTip')}
                </p>
                <div className="pc-target-info-drawer__now">
                  <span>{t('pc.right.drawer.currentState')}</span>
                  <strong>{trustStateLabel} · {trustStateValue}/100</strong>
                </div>
              </>
            ) : null}

            {infoDrawer === 'leak' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  {t('pc.right.drawer.leakLede')}
                </p>
                <div className="pc-target-info-drawer__columns" style={{ gridTemplateColumns: '0.7fr 1.3fr' }}>
                  <div>
                    <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.sourceRoutes')}</div>
                    <ul>
                      <li>{t('pc.archetype.action.motive')}</li>
                      <li>{t('pc.archetype.action.empathy')}</li>
                    </ul>
                  </div>
                  <div>
                    <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.effects')}</div>
                    <ul>
                      <li>{t('pc.right.drawer.leakEffectThreshold')}</li>
                      <li>{t('pc.right.drawer.leakEffectContradiction')}</li>
                    </ul>
                  </div>
                </div>
                <p className="pc-target-info-drawer__tip">
                  {t('pc.right.drawer.leakTip')}
                </p>
                <div className="pc-target-info-drawer__now">
                  <span>{t('pc.right.drawer.currentState')}</span>
                  <strong>{targetMeters.leakMeter}%</strong>
                </div>
              </>
            ) : null}

            {infoDrawer === 'lieStages' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  {t('pc.right.drawer.lieStagesLede1')}<br />
                  {t('pc.right.drawer.lieStagesLede2')}
                </p>
                <ul className="pc-target-info-drawer__list">
                  {[
                    { idx: 0, label: t('pc.right.drawer.lieStage0'), desc: t('pc.right.drawer.lieStage0Desc') },
                    { idx: 1, label: t('pc.right.drawer.lieStage1'), desc: t('pc.right.drawer.lieStage1Desc') },
                    { idx: 2, label: t('pc.right.drawer.lieStage2'), desc: t('pc.right.drawer.lieStage2Desc') },
                    { idx: 3, label: t('pc.right.drawer.lieStage3'), desc: t('pc.right.drawer.lieStage3Desc') },
                    { idx: 4, label: t('pc.right.drawer.lieStage4'), desc: t('pc.right.drawer.lieStage4Desc') },
                    { idx: 5, label: t('pc.right.drawer.lieStage5'), desc: t('pc.right.drawer.lieStage5Desc') },
                  ].map((row) => {
                    // 클릭한 단계와 무관하게 항상 현재 단계(activeLieIndex)를 강조
                    const isCurrent = activeLieIndex === row.idx
                    const dimStyle = !isCurrent ? { color: '#4b5563', opacity: 0.55 } : undefined
                    const selStyle = isCurrent ? { background: 'rgba(251, 191, 36, 0.12)', borderLeft: '2px solid #fbbf24', paddingLeft: '8px', borderRadius: '4px' } : undefined
                    return (
                      <li key={row.idx} style={{ ...(dimStyle ?? {}), ...(selStyle ?? {}) }}>
                        <strong>{row.idx} · {row.label}</strong> — {row.desc}
                      </li>
                    )
                  })}
                </ul>
                <p className="pc-target-info-drawer__tip">
                  {t('pc.right.drawer.lieStagesTip')}
                </p>
              </>
            ) : null}

            {infoDrawer === 'profile' ? (() => {
              // 해금 기반 정보 노출 — 스포일러 방지
              const observedSet = new Set(observedArchetypes[pcTargetParty] ?? [])
              const archetypeRevealed = observedSet.has(targetArchetype)
              // 진실 오픈 판정: 임의 한 쟁점이라도 S4+면 일상까지 단편 공개
              const lieStates = Object.values(targetAgent.lieStateMap ?? {}).map((e) => e?.currentState ?? 'S0')
              const truthMostlyRevealed = lieStates.some((s) => s === 'S4' || s === 'S5')
              return (
                <>
                  <p className="pc-target-info-drawer__lede">
                    <strong>{localizeRuntimeText(targetProfile.name, locale)}</strong> · {t('pc.right.target.ageOccupation', { age: targetProfile.age, occupation: localizeRuntimeText(targetProfile.occupation, locale) })}
                  </p>
                  <div className="pc-target-info-drawer__columns" style={{ gridTemplateColumns: '0.85fr 1.15fr' }}>
                    <div>
                      <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.tendency')}</div>
                      <ul>
                        <li>{archetypeRevealed ? localizeRuntimeText(getPcArchetypeLabel(targetArchetype), locale) : t('pc.right.drawer.beforeObservation')}</li>
                      </ul>
                    </div>
                    <div>
                      <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.intro')}</div>
                      <ul>
                        <li>{t('pc.right.target.ageOccupation', { age: targetProfile.age, occupation: localizeRuntimeText(targetProfile.occupation, locale) })}</li>
                      </ul>
                    </div>
                  </div>
                  {targetProfile.speechStyle ? (
                    <p className="pc-target-info-drawer__tip">
                      <strong>{t('pc.right.drawer.speechStyle')}</strong> — {localizeRuntimeText(targetProfile.speechStyle, locale)}
                    </p>
                  ) : null}
                  {truthMostlyRevealed && targetProfile.dailyRoutine ? (
                    <p className="pc-target-info-drawer__tip">
                      <strong>{t('pc.right.drawer.dailyRoutine')}</strong> — {localizeRuntimeText(targetProfile.dailyRoutine, locale)}
                    </p>
                  ) : (
                    <p className="pc-target-info-drawer__tip" style={{ opacity: 0.55 }}>
                      <strong>{t('pc.right.drawer.dailyRoutine')}</strong> — {t('pc.right.drawer.dailyRoutineLocked')}
                    </p>
                  )}
                  {/* verbalTells / 관찰 포인트는 게임 진행 중 발견 대상이므로 프로필에 미리 노출하지 않음 */}
                </>
              )
            })() : null}

            {infoDrawer === 'contradiction' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  {t('pc.right.drawer.contradictionLede')}
                </p>
                <div className="pc-target-info-drawer__columns" style={{ gridTemplateColumns: '1.15fr 0.85fr' }}>
                  <div>
                    <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.sourceRoutes')}</div>
                    <ul>
                      <li>{t('pc.right.drawer.contradictionSourceFact')}</li>
                      <li>{t('pc.right.drawer.contradictionSourceEvidence')}</li>
                      <li>{t('pc.right.drawer.contradictionSourceWitness')}</li>
                    </ul>
                  </div>
                  <div>
                    <div className="pc-target-info-drawer__col-h">{t('pc.right.drawer.effects')}</div>
                    <ul>
                      <li>{t('pc.right.drawer.contradictionEffectStage')}</li>
                      <li>{t('pc.right.drawer.contradictionEffectCollapse')}</li>
                    </ul>
                  </div>
                </div>
                <p className="pc-target-info-drawer__tip">
                  {t('pc.right.drawer.contradictionTip')}
                </p>
                <div className="pc-target-info-drawer__now">
                  <span>{t('pc.right.drawer.currentState')}</span>
                  <strong>{disputeTokens} / 5</strong>
                </div>
              </>
            ) : null}
            </aside>,
            portalRoot,
          ) : null}
        </div>
      </section>

      {showCombination ? (
        <section className="sec pc-right-block pc-right-block--combination" data-tutorial-target="combination-lab">
          <div
            className={`pc-skill-card pc-combination-card pc-right-card${hasReadyCombos ? ' is-combinable' : ''}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleCombinationDrop}
          >
            <div className="pc-skill-card__topline">
              <div className="pc-skill-card__eyebrow">{t('pc.right.combo.title')}</div>
              <button className="pc-skill-card__info-button" onClick={toggleCombinationPanel} type="button" title={t('pc.right.combo.info')}>?</button>
            </div>

            <div className="pc-combination-card__body">
              {comboReady ? (
                <button className="pc-combination-card__attempt pc-combination-card__attempt--center" onClick={handleCombinationAttempt} type="button">
                  <PCSvgIcon id="i-bolt" size={20} />
                  <span>{t('pc.right.combo.execute')}</span>
                </button>
              ) : readyLabRecipes.length > 0 ? (
                <button
                  className={`pc-combination-card__ready-indicator${autoMatchPanelOpen ? ' is-open' : ''}`}
                  onClick={toggleCombinationPanel}
                  type="button"
                >
                  <span className="pc-combination-card__ready-icon">🔗</span>
                  <span className="pc-combination-card__ready-text">
                    {translate('pc.combo.readyItemsNotice', { count: readyLabRecipes.length })}
                  </span>
                  <span className="pc-combination-card__ready-cta">{t('pc.right.combo.check')}</span>
                </button>
              ) : (
                <div className="pc-combination-card__guide">
                  <p><strong>{t('pc.right.combo.evidence')}</strong> / <strong>{t('pc.right.combo.statementCard')}</strong></p>
                  <p>{t('pc.right.combo.guide')}</p>
                  <p className="pc-combination-card__guide-sub">{t('pc.right.combo.guideSub')}</p>
                </div>
              )}
            </div>

            {/* 조합 가능 항목 상세 — 카드 왼쪽으로 확장되는 드로어 */}
            {portalRoot ? createPortal(
              <aside
              className={`pc-combination-drawer${autoMatchPanelOpen ? ' is-open' : ''}`}
              aria-hidden={!autoMatchPanelOpen}
              aria-label={translate('pc.combo.readyDetailLabel')}
            >
              <header className="pc-combination-drawer__header">
                <div className="pc-combination-drawer__title">
                  <span>{translate('pc.combo.readyMaterialsNotice', { count: readyLabRecipes.length })}</span>
                </div>
                <button
                  type="button"
                  className="pc-combination-drawer__close"
                  onClick={() => { setAutoMatchPanelOpen(false); setAutoMatchConfirming(false) }}
                  aria-label={t('pc.common.close')}
                >
                  ✕
                </button>
              </header>

              {!autoMatchConfirming ? (
                <>
                  <div className="pc-combination-drawer__breakdown">
                    <CategoryRow label={t('pc.right.combo.category.ee')} ready={recipeBreakdown.ee.ready} potential={recipeBreakdown.ee.potential} />
                    <CategoryRow label={t('pc.right.combo.category.es')} ready={recipeBreakdown.es.ready} potential={recipeBreakdown.es.potential} />
                    <CategoryRow label={t('pc.right.combo.category.ss')} ready={recipeBreakdown.ss.ready} potential={recipeBreakdown.ss.potential} />
                  </div>

                  <p className="pc-combination-drawer__lede">
                    {t('pc.right.combo.lede')}
                  </p>

                  <div className="pc-combination-drawer__auto">
                    <p className="pc-combination-drawer__auto-desc">
                      {t('pc.right.combo.autoDesc')}
                    </p>
                    <button
                      className="pc-combination-drawer__auto-cta"
                      disabled={!canAutoMatch}
                      onClick={() => setAutoMatchConfirming(true)}
                      type="button"
                    >
                      <span className="pc-combination-drawer__auto-cta-label">
                        <PCSvgIcon id="i-link" size={14} />
                        <span>{t('pc.right.combo.autoMatch')}</span>
                      </span>
                      <span className="pc-combination-drawer__auto-cost" title={t('pc.right.combo.autoCost', { cost: autoMatchCost })}>
                        <PCSvgIcon id="i-link" size={12} />
                        <span>{autoMatchCost}</span>
                      </span>
                    </button>
                    {readyLabRecipes.length === 0 ? (
                      <p className="pc-combination-drawer__warn">{t('pc.right.combo.noReady')}</p>
                    ) : globalSkillPoints < autoMatchCost ? (
                      <p className="pc-combination-drawer__warn">{t('pc.right.toast.insufficientSkill')}</p>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <p className="pc-combination-drawer__confirm-text">
                    {t('pc.right.combo.confirmText', { cost: autoMatchCost })}
                  </p>
                  <div className="pc-combination-drawer__confirm-actions">
                    <button
                      className="pc-combination-drawer__auto-cta is-danger"
                      onClick={() => setAutoMatchConfirming(false)}
                      type="button"
                    >
                      {t('pc.right.combo.no')}
                    </button>
                    <button
                      className="pc-combination-drawer__auto-cta is-primary"
                      onClick={handleAutoMatchConfirm}
                      type="button"
                    >
                      {t('pc.right.combo.yes')}
                    </button>
                  </div>
                </>
              )}
              </aside>,
              portalRoot,
            ) : null}
            <div className="pc-combination-card__slots">
              <CombinationSlot label="A" node={comboNodeA} displayText={comboNodeADisplay} onClear={() => setComboSlots((c) => [null, c[1]])} />
              <span className="pc-combination-card__plus">+</span>
              <CombinationSlot label="B" node={comboNodeB} displayText={comboNodeBDisplay} onClear={() => setComboSlots((c) => [c[0], null])} />
            </div>
          </div>
        </section>
      ) : null}

      {isInterrogationPhase ? (
        <section className="sec pc-right-block pc-right-block--summary">
          <div className="pc-skill-card pc-summary-card pc-right-card">
            <div className="pc-skill-card__eyebrow">{t('pc.right.summary.title')}</div>
            <button
              className="pc-summary-button"
              data-tutorial-target="record-summary-button"
              onClick={openSummaryPanel}
              type="button"
            >
              <span className="pc-summary-button__text">{t('pc.right.summary.record')}</span>
            </button>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function MeterRow({
  icon,
  label,
  valueText,
  width,
  tone,
  onClick,
}: {
  icon: ReactNode
  label: string
  valueText: string
  width: number
  tone: 'blue' | 'red' | 'gold'
  onClick?: () => void
}) {
  // gold tone (대상 미터/누설)만 4단계 노랑→빨강 그라데이션 적용
  let levelClass = ''
  if (tone === 'gold') {
    if (width < 25) levelClass = ' level-1'
    else if (width < 50) levelClass = ' level-2'
    else if (width < 75) levelClass = ' level-3'
    else levelClass = ' level-4'
  }
  const interactive = Boolean(onClick)
  return (
    <div
      className={`meter pc-target-meter${interactive ? ' is-interactive' : ''}`}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } } : undefined}
    >
      <span className="pc-target-meter__icon">{icon}</span>
      <span className="pc-target-meter__label">{label}</span>
      <div className="meter-track">
        <div
          className={`meter-fill mf-${tone}${levelClass}`}
          style={{ width: `${Math.max(0, Math.min(width, 100))}%` }}
        />
      </div>
      <span className="meter-val">{valueText}</span>
    </div>
  )
}

function CategoryRow({ label, ready, potential }: { label: string; ready: number; potential: number }) {
  if (ready === 0 && potential === 0) return null
  return (
    <div className="pc-combination-card__cat-row">
      <span className="pc-combination-card__cat-label">{label}</span>
      <span className="pc-combination-card__cat-counts">
        {ready > 0 ? <span className="pc-combination-card__cat-ready"><PCSvgIcon id="i-link" size={12} /> {translate('pc.right.combo.readyLabel', { count: ready })}</span> : null}
        {potential > 0 ? <span className="pc-combination-card__cat-potential"><PCSvgIcon id="i-search" size={12} /> {translate('pc.right.combo.potentialLabel', { count: potential })}</span> : null}
      </span>
    </div>
  )
}

function CombinationSlot({
  label,
  node,
  displayText,
  onClear,
}: {
  label: 'A' | 'B'
  node: CombinationLabNode | null
  displayText: string | null
  onClear: () => void
}) {
  const { locale } = useI18n()
  const fallback = node ? node.label.replace(/^note:/, '') : '\uBE44\uC5B4 \uC788\uC74C'
  const text = localizeRuntimeText(displayText ?? fallback, locale)
  return (
    <button
      className={`pc-combination-slot${node ? ' is-filled' : ''}`}
      onClick={node ? onClear : undefined}
      title={text}
      type="button"
    >
      <span className="pc-combination-slot__label">{label}</span>
      <span className="pc-combination-slot__text">{text}</span>
    </button>
  )
}

function getNodeDisplayLabel(
  node: CombinationLabNode,
  caseData: { evidence: { id: string; name?: string; surfaceName?: string }[] } | null,
  locale: ReturnType<typeof useI18n>['locale'],
): string {
  if (node.type === 'evidence' || node.type === 'derived_evidence') {
    const srcId = node.sourceRef ?? node.linkedEvidenceIds?.[0] ?? node.id
    const ev = caseData?.evidence.find((e) => e.id === srcId)
    if (ev?.surfaceName) return localizeRuntimeText(ev.surfaceName, locale)
    return localizeRuntimeText(node.label.replace(/^[a-z]+-\d+\s+/i, '').replace(/^note:/, ''), locale)
  }
  if (node.type === 'statement') {
    const match = node.label.match(/["\u201C\u201D]([^"\u201C\u201D]+)["\u201C\u201D]/)
    if (match) return localizeRuntimeText(match[1], locale)
    return localizeRuntimeText(node.label.replace(/^[A-Za-z\uAC00-\uD7A3]+\s*\uC758\s*\uBC1C\uC5B8\s*/, '').replace(/^[a-z]+-\d+\s+/i, ''), locale)
  }
  return localizeRuntimeText(node.label.replace(/^note:/, '').replace(/^[a-z]+-\d+\s+/i, ''), locale)
}

// 라벨 헬퍼는 utils/combinationLabels.ts로 통합됨

function normalizeInputs(ids: string[]): string[] {
  return [...ids].sort()
}

function sameInputs(a: string[], b: string[]): boolean {
  const left = normalizeInputs(a)
  const right = normalizeInputs(b)
  return left.length === right.length && left.every((value, index) => value === right[index])
}

function _normalizeNodeText(text: string | undefined): string {
  return (text ?? '').toLowerCase().replace(/\s+/g, '')
}

function getTrustStateLabel(value: number, t: (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string): string {
  if (value >= 70) {
    return t('pc.right.trust.trust')
  }
  if (value >= 40) {
    return t('pc.right.trust.caution')
  }
  return t('pc.right.trust.doubt')
}

function hasWitnessCombinationResult(
  output: CombinationLabOutput,
  newlyUnlockedWitnesses: { id: string; name: string }[],
): boolean {
  return newlyUnlockedWitnesses.length > 0 ||
    (output.witnessAngles?.length ?? 0) > 0 ||
    output.effects.some((effect) => effect.kind === 'unlock_witness_angle')
}

function getPrimaryCombinationDisputeId(output: CombinationLabOutput, caseData: CaseData | null): string | null {
  const disputeIds = new Set((caseData?.disputes ?? []).map((dispute) => dispute.id))
  const candidates = output.effects.flatMap((effect) => [
    effect.kind === 'unlock_dispute' ? effect.unlockNodeId : undefined,
    effect.kind === 'upgrade_dispute' ? effect.disputeUpgrade?.disputeId : undefined,
    effect.kind === 'reframe_dispute' ? effect.reframeToId ?? effect.reframeFromId : undefined,
    effect.kind === 'split_dispute' ? effect.splitFromId : undefined,
    effect.kind === 'merge_disputes' ? effect.mergeToId : undefined,
    effect.targetId,
  ])

  return candidates.find((value): value is string => Boolean(value && disputeIds.has(value))) ?? null
}

type PcCombinationResultType =
  | 'dispute'
  | 'upgrade'
  | 'dossier'
  | 'witness'
  | 'evidence'
  | 'question'
  | 'note'
  | 'statement'
  | 'mediation'
  | 'reliability'
  | 'context'

type GameStoreSnapshot = ReturnType<typeof useGameStore.getState>

function getCombinationResultType(output: CombinationLabOutput, isWitnessResult: boolean): PcCombinationResultType {
  const kinds = new Set(output.effects.map((effect) => effect.kind))
  if (isWitnessResult) return 'witness'
  if (kinds.has('unlock_evidence') || output.evidenceNode || output.nodeType === 'evidence' || output.nodeType === 'derived_evidence') return 'evidence'
  if (output.nodeType === 'dispute' || kinds.has('unlock_dispute') || kinds.has('upgrade_dispute') || kinds.has('reframe_dispute') || kinds.has('split_dispute') || kinds.has('merge_disputes')) return 'dispute'
  if (kinds.has('unlock_question') || kinds.has('upgrade_question') || kinds.has('reframe_question') || (output.questionPrompts?.length ?? 0) > 0) return output.id.startsWith('dc-') ? 'dossier' : 'question'
  if (kinds.has('unlock_statement') || (output.statementEntries?.length ?? 0) > 0) return 'statement'
  if (kinds.has('unlock_note') || output.noteText) return 'note'
  if (kinds.has('unlock_mediation_hint') || (output.mediationHints?.length ?? 0) > 0) return 'mediation'
  if (kinds.has('elevate_reliability') || kinds.has('shift_legality_weight') || kinds.has('shift_responsibility_weight')) return 'reliability'
  if (kinds.has('expand_context') || kinds.has('narrow_scope')) return 'context'
  if (output.id.startsWith('dc-')) return 'dossier'
  return 'upgrade'
}

function getPrimaryCombinationEvidenceId(output: CombinationLabOutput): string | null {
  const fromEffect = output.effects
    .map((effect) => effect.evidenceUpgrade?.evidenceId ?? effect.unlockNodeId ?? effect.targetId ?? effect.upgradeToId ?? effect.reframeToId)
    .find((value): value is string => Boolean(value))
  return output.evidenceNode?.id ?? fromEffect ?? null
}

interface CombinationResonanceContext {
  resultType: PcCombinationResultType
  outputId: string
  disputeId: string | null
  evidenceId: string | null
}

interface CombinationDestinationTarget {
  selector: string
  targetKey: string
  resonanceStyle: ResonanceStyle
  auraStyle: AuraStyle
}

function playCombinationResultResonance(store: GameStoreSnapshot, ctx: CombinationResonanceContext): void {
  const destination = getCombinationDestinationTarget(ctx)

  if (ctx.resultType === 'dispute' && ctx.disputeId) {
    store.setLastFocusedDisputeId(ctx.disputeId)
    store.setRecentlyEmergedDispute(ctx.disputeId)
    requestDisputeRibbonExpansion(ctx.disputeId)
    window.setTimeout(() => {
      const latest = useGameStore.getState()
      if (latest.recentlyEmergedDisputeId === ctx.disputeId) {
        latest.setRecentlyEmergedDispute(null)
      }
    }, 3600)
  }

  const enqueueResultVfx = () => {
    const latest = useGameStore.getState()

    if (destination) {
      latest.enqueueAura({ targetSelector: destination.selector, style: destination.auraStyle })
      latest.enqueueResonance({
        fromSelector: COMBINATION_SUCCESS_SOURCE_SELECTOR,
        toSelector: destination.selector,
        reason: 'combination_result',
        targetKey: destination.targetKey,
        style: destination.resonanceStyle,
      })
    }

    const memoryTarget = getCombinationMemoryTarget(ctx.resultType)
    if (memoryTarget && memoryTarget.selector !== destination?.selector) {
      latest.enqueueAura({ targetSelector: memoryTarget.selector, style: memoryTarget.auraStyle })
      if (memoryTarget.selector === JUDGE_NOTEBOOK_SELECTOR) {
        latest.enqueueAura({ targetSelector: JUDGE_OBSERVATION_SELECTOR, style: 'soft' })
      }
      latest.enqueueResonance({
        fromSelector: COMBINATION_SUCCESS_SOURCE_SELECTOR,
        toSelector: memoryTarget.selector,
        reason: 'combination_result',
        targetKey: memoryTarget.targetKey,
        style: memoryTarget.resonanceStyle,
      })
    }
  }

  if (ctx.resultType === 'dispute' && ctx.disputeId) {
    afterDisputeRibbonExpansion(enqueueResultVfx)
  } else {
    enqueueResultVfx()
  }
}

function getCombinationDestinationTarget(ctx: CombinationResonanceContext): CombinationDestinationTarget | null {
  switch (ctx.resultType) {
    case 'witness':
      return { selector: '[data-guide-target="witness-summon"]', targetKey: 'combination:witness', resonanceStyle: 'lightning', auraStyle: 'electric' }
    case 'dispute':
      return {
        selector: ctx.disputeId
          ? `[data-dispute-id="${escapeAttributeValue(ctx.disputeId)}"]`
          : '.pc-dispute-ribbon',
        targetKey: `combination:dispute:${ctx.disputeId ?? ctx.outputId}`,
        resonanceStyle: 'lightning',
        auraStyle: 'electric',
      }
    case 'evidence':
      return {
        selector: ctx.evidenceId
          ? `[data-resonance-target="evidence-${escapeAttributeValue(ctx.evidenceId)}"]`
          : '[data-guide-target="evidence-present"]',
        targetKey: `combination:evidence:${ctx.evidenceId ?? ctx.outputId}`,
        resonanceStyle: 'lightning',
        auraStyle: 'electric',
      }
    case 'dossier':
    case 'question':
      return { selector: '[data-guide-target="question-fact"]', targetKey: `combination:question:${ctx.outputId}`, resonanceStyle: 'lightning', auraStyle: 'electric' }
    case 'note':
    case 'statement':
      return { selector: JUDGE_NOTEBOOK_SELECTOR, targetKey: `combination:notebook:${ctx.outputId}`, resonanceStyle: 'archive', auraStyle: 'archive' }
    case 'mediation':
      return { selector: '[data-guide-target="question-empathy"]', targetKey: `combination:mediation:${ctx.outputId}`, resonanceStyle: 'absorb', auraStyle: 'soft' }
    case 'reliability':
    case 'context':
      return { selector: JUDGE_OBSERVATION_SELECTOR, targetKey: `combination:context:${ctx.outputId}`, resonanceStyle: 'absorb', auraStyle: 'soft' }
    default:
      return null
  }
}

function getCombinationMemoryTarget(resultType: PcCombinationResultType): CombinationDestinationTarget | null {
  switch (resultType) {
    case 'witness':
    case 'dispute':
    case 'evidence':
    case 'dossier':
    case 'question':
    case 'reliability':
    case 'context':
      return {
        selector: JUDGE_NOTEBOOK_SELECTOR,
        targetKey: `combination:memory:${resultType}`,
        resonanceStyle: 'archive',
        auraStyle: 'archive',
      }
    default:
      return null
  }
}

function escapeAttributeValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function getResultKindLabel(kind: string): string {
  const labels: Record<string, string> = {
    unlock_evidence: translate('pc.court.combination.summary.evidence'),
    unlock_note: translate('pc.court.combination.summary.note'),
    unlock_question: translate('pc.court.combination.summary.question'),
    unlock_dispute: translate('pc.court.combination.summary.dispute'),
    unlock_witness_angle: translate('pc.right.combo.tag.newWitness'),
    unlock_statement: translate('pc.court.combination.summary.statement'),
    upgrade_evidence: translate('pc.court.combination.summary.reliability'),
    upgrade_dispute: translate('pc.court.combination.summary.dispute'),
    reframe_evidence: translate('pc.court.combination.summary.context'),
    reframe_dispute: translate('pc.court.combination.summary.dispute'),
    elevate_reliability: translate('pc.court.combination.summary.reliability'),
  }
  return labels[kind] ?? kind.replace(/_/g, ' ')
}

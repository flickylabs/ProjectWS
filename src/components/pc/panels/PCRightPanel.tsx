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
import { getPcArchetypeLabel, getPcTellDescription, getPcTellLabel } from '../pcUiLabels'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import { closePcInteractionPanel, openPcInteractionPanel, type PcInteractionAction, type PcInteractionPayload } from '../layout/PCInteractionPanel'
import { showToast } from '../../common/Toast'
import { showGuideCutscene } from '../../common/guideCutscene'
import { getCombinationComment } from '../../../data/combinationComments'
import { PC_ADD_COMBINATION_NOTE_EVENT, type PcCombinationPanelEventDetail, type PcPinnedNote } from './PCImportantNotesSection'
import { playCombinationFailure, playCombinationSuccess } from '../../../engine/soundEngine'
import { cleanOutputLabel, cleanOutputSummary } from '../../../utils/combinationLabels'
import { pp이가 } from '../../../engine/koreanPostposition'
import { translate } from '../../../i18n'
import ArchetypeTag from '../tags/ArchetypeTag'
import { ACTION_TARGETS, ActionEm, Em } from '../tags/hotbarHighlight'
import { afterDisputeRibbonExpansion, requestDisputeRibbonExpansion } from '../layout/disputeRibbonEvents'

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const COMBINATION_SUCCESS_SOURCE_SELECTOR = '[data-resonance-target="combination-success"]'
const JUDGE_OBSERVATION_SELECTOR = '[data-resonance-target="jobs-main"]'
const JUDGE_NOTEBOOK_SELECTOR = '[data-resonance-target="judge-notebook"]'
const COMBINATION_RESONANCE_DELAY_MS = 260
const COMBINATION_RESULT_PANEL_DELAY_MS = 3100


const EMOTION_LABELS: Record<EmotionalPhase, string> = {
  defensive: '\uACBD\uACC4',
  confident: '\uC790\uC2E0\uAC10',
  shaken: '\uB3D9\uC694',
  angry: '\uACA9\uC559',
  resigned: '\uCCB4\uB150',
}

type TargetInfoDrawer = 'emotion' | 'trust' | 'leak' | 'lieStages' | 'contradiction' | 'profile'

export default function PCRightPanel() {
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
  const pcSummaryUnlocked = useStore((s) => s.pcSummaryUnlocked)
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
  const trustStateLabel = getTrustStateLabel(targetAgent.trustState.trustTowardJudge)
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
    const spent = (store as any).spend('skillPoints', autoMatchCost)
    if (!spent) {
      showToast('스킬 포인트가 부족합니다.', 'info')
      return
    }
    const [a, b] = recipe.inputs
    setComboSlots([a ?? null, b ?? null])
    setAutoMatchPanelOpen(false)
    setAutoMatchConfirming(false)
    showGuideCutscene('조합 대상이 슬롯에 자동 배치되었습니다', '.pc-combination-card')
  }, [canAutoMatch, readyLabRecipes, store])

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
  const comboNodeADisplay = comboNodeA ? getNodeDisplayLabel(comboNodeA, caseData) : null
  const comboNodeBDisplay = comboNodeB ? getNodeDisplayLabel(comboNodeB, caseData) : null
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

  const tellDescription = getPcTellDescription(tellType)
  const currentHint = tellDescription
    || (
      activeDispute
        ? `${activeDispute.name} \uC7C1\uC810\uC5D0\uC11C \uD55C \uBC88 \uB354 \uC9C8\uBB38\uD558\uBA74 \uB4DC\uB7EC\uB0A0 \uBC18\uC751 \uC815\uBCF4\uC785\uB2C8\uB2E4.`
        : '\uD604\uC7AC \uAD00\uCC30 \uC911\uC778 \uBC18\uC751 \uC815\uBCF4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.'
    )

  const queueNode = useCallback((nodeId: string) => {
    setComboSlots((current) => {
      if (current.includes(nodeId)) {
        showToast('이미 같은 카드가 슬롯에 있습니다.', 'info')
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
        showToast('하이라이트된 핵심 발언만 조합할 수 있습니다.', 'info')
        return
      }
      queueNode(nodeId)
    }
  }, [queueNode, resolveEvidenceNodeId, resolveNoteNodeId])

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
        title: '\uC870\uD569 \uC2E4\uD328',
        subtitle: '\uD604\uC7AC \uC870\uD569 \uACB0\uACFC \uC5C6\uC74C',
        tone: 'red',
        variant: 'feature',
        body: '\uC774 \uC870\uD569\uC73C\uB85C\uB294 \uC544\uC9C1 \uC0C8\uB85C\uC6B4 \uB2E8\uC11C\uAC00 \uB4DC\uB7EC\uB098\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uB2E4\uB978 \uC99D\uAC70\uB098 \uC911\uC694 \uBC1C\uC5B8 \uB178\uD2B8\uB97C \uC62C\uB824 \uBCF4\uC138\uC694.',
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
        title: '이미 기록된 조합',
        subtitle: cleanOutputLabel(matchingOutput.label),
        tone: 'gold',
        variant: 'feature',
        body: '이 조합이 가리키는 결론은 이미 재판 기록에 반영되어 있습니다. 다른 증거 또는 발언 노트를 조합해 보세요.',
      })
      clearComboSlots()
      return
    }

    if (!store.canRunCombinationRecipe(matchingRecipe.id)) {
      playCombinationFailure()
      openPcInteractionPanel({
        title: '\uC870\uD569 \uBD88\uAC00',
        subtitle: '\uBD84\uC11D \uD3EC\uC778\uD2B8 \uBD80\uC871 \uB610\uB294 \uC7A0\uAE08 \uC0C1\uD0DC',
        tone: 'red',
        variant: 'feature',
        body: matchingRecipe.failHint ?? '\uC9C0\uAE08\uC740 \uC774 \uC870\uD569\uC744 \uC2DC\uB3C4\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.',
      })
      clearComboSlots()
      return
    }

    const result = store.runCombinationRecipe(matchingRecipe.id)
    if (!result.ok) {
      playCombinationFailure()
      openPcInteractionPanel({
        title: '\uC870\uD569 \uC2E4\uD328',
        subtitle: '\uACB0\uACFC \uC0DD\uC131 \uC2E4\uD328',
        tone: 'red',
        variant: 'feature',
        body: '\uC870\uD569 \uACB0\uACFC\uB97C \uC0DD\uC131\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694.',
      })
      clearComboSlots()
      return
    }

    const newlyUnlockedWitnesses = result.newlyUnlockedWitnesses ?? []
    const isWitnessResult = hasWitnessCombinationResult(matchingOutput, newlyUnlockedWitnesses)
    const outputSummary = matchingRecipe.discoveryText || cleanOutputSummary(matchingOutput.summary, matchingOutput.label) || matchingOutput.judgeHint || ''
    const witnessNames = newlyUnlockedWitnesses.map((w) => w.name).filter(Boolean)
    const panelBody = isWitnessResult
      ? [
          witnessNames.length > 0
            ? `새 증인 ${witnessNames.join(', ')}${pp이가(witnessNames[witnessNames.length - 1] ?? '')} 소환 가능해졌습니다.`
            : '새 증인 단서가 열렸습니다.',
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
        label: `${witness.name} 소환하기`,
        witnessId: witness.id,
      })
    } else if (combinationResultType === 'evidence' && primaryEvidenceId) {
      panelActions.push({
        kind: 'open_evidence',
        label: '새 증거 열람',
        evidenceId: primaryEvidenceId,
      })
    } else if (!isWitnessResult && primaryDisputeId) {
      panelActions.push({
        kind: 'focus_dispute',
        label: '\uAD00\uB828 \uC7C1\uC810 \uBCF4\uAE30',
        disputeId: primaryDisputeId,
      })
    }

    store.addDialogue({
      speaker: 'system',
      text: `\uC870\uD569 \uACB0\uACFC: ${cleanOutputLabel(matchingOutput.label)}${outputSummary ? '\n' + outputSummary : ''}`,
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
      title: cleanOutputLabel(matchingOutput.label),
      subtitle: isWitnessResult ? '새 증인 추가' : '\uC870\uD569 \uC131\uACF5',
      tone: 'gold',
      variant: 'feature',
      body: panelBody,
      tags: isWitnessResult ? ['새 증인', ...effectTags.filter((tag) => tag !== '새 발언')] : effectTags,
      actions: panelActions,
    }

    if (isWitnessResult) {
      const summary = witnessNames.length > 0
        ? `${witnessNames.join(', ')}${pp이가(witnessNames[witnessNames.length - 1] ?? '')} 새 증인으로 추가됐습니다.`
        : '새 증인 단서가 열렸습니다.'
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-eye',
        title: '새 증인 추가',
        summary,
      })
      store.enqueueFeedback({
        kind: 'witness_choice',
        eyebrow: '새 증인 등장',
        title: witnessNames.join(', ') || '새 증인',
        body: '증인 목록에 소환 가능한 인물이 추가되었습니다. 필요한 시점에 증언 주제를 확인하십시오.',
        tag: '증인 목록 갱신',
        tone: 'green',
        autoDismissMs: 2700,
      })
    } else if (combinationResultType === 'dispute') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-scale',
        title: '쟁점 추가',
        summary: outputSummary || '새 쟁점이 기록에 추가됐습니다.',
      })
    } else if (combinationResultType === 'dossier') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-gavel',
        title: '결정적 질문 해금',
        summary: outputSummary || '새 질문 경로가 열렸습니다.',
      })
    } else if (combinationResultType === 'question') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-gavel',
        title: '질문 경로 추가',
        summary: outputSummary || '새 질문 경로가 열렸습니다.',
      })
    } else if (combinationResultType === 'evidence') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'evidence',
        iconId: 'i-doc',
        title: '새 증거 추가',
        summary: outputSummary || '새 증거가 기록에 추가됐습니다.',
        evidenceId: primaryEvidenceId ?? undefined,
      })
    } else if (combinationResultType === 'mediation') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-heart',
        title: '판결 힌트 추가',
        summary: outputSummary || '판결 진입에 참고할 힌트가 추가됐습니다.',
      })
    } else if (combinationResultType === 'note' || combinationResultType === 'statement') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'event',
        iconId: 'i-chat',
        title: combinationResultType === 'note' ? '단서 기록 추가' : '진술 기록 추가',
        summary: outputSummary || '기록에 새 항목이 추가됐습니다.',
      })
    } else if (combinationResultType === 'reliability' || combinationResultType === 'context') {
      store.addJudgeObservation({
        turnCount: store.turnCount,
        category: 'evidence',
        iconId: 'i-link',
        title: combinationResultType === 'reliability' ? '증거 신뢰도 강화' : '사건 맥락 확장',
        summary: outputSummary || '기존 기록의 해석이 강화됐습니다.',
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
        title: '재판관의 정리',
        summary: judgeComment.trim(),
      })
    }

    // 3) 시스템: 새 증인 소환 알림 (runCombinationRecipe가 반환한 newly unlocked)
    for (const w of result.newlyUnlockedWitnesses ?? []) {
      store.addDialogue({
        speaker: 'system',
        text: `새 증인 '${w.name}' 소환 가능해졌습니다.`,
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
            label: getNodeDisplayLabel(node, caseData),
            type: node.type,
          })),
        outputLabel: cleanOutputLabel(matchingOutput.label),
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
  }, [clearComboSlots, comboNodeA, comboNodeB, comboReady, combinationLabRuntime.discoveredNodeIds, matchingOutput, matchingRecipe, store])

  const toggleCombinationPanel = useCallback(() => {
    setAutoMatchPanelOpen((v) => !v)
    setAutoMatchConfirming(false)
    setInfoDrawer(null)
  }, [])

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
          <span>{'\uD604\uC7AC \uB300\uC0C1'}</span>
          <span className="sub">{targetProfile.name}</span>
        </div>

        <div className={`pc-target-shell pc-right-card party-${pcTargetParty}`} data-party={pcTargetParty}>
          <div className="pc-target-tabs">
            <button
              className={`pc-target-tab${pcTargetParty === 'a' ? ' is-active' : ''}`}
              onClick={() => setPcTargetParty('a')}
              type="button"
            >
              {caseData.duo.partyA.name}
            </button>
            <button
              className={`pc-target-tab${pcTargetParty === 'b' ? ' is-active' : ''}`}
              onClick={() => setPcTargetParty('b')}
              type="button"
            >
              {caseData.duo.partyB.name}
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
              title={`${targetProfile.name} 상세 정보 보기`}
            >
              <PCCharacterPortrait
                alt={targetProfile.name}
                caseId={caseData.caseId}
                emotion={targetAgent.emotionalState.phase}
                fallbackSymbolId={faceId}
                lieState={activeLieState}
                party={pcTargetParty}
                size={72}
              />
            </div>

            <div className="pc-target-copy__main">
              <div className="tgt-meta">{`${targetProfile.age}\uC138 \u00B7 ${targetProfile.occupation}`}</div>
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
                <span>감정</span>
                <strong>{EMOTION_LABELS[targetAgent.emotionalState.phase]}</strong>
              </div>
              <div
                className="pc-target-state-row is-interactive"
                data-resonance-target={`trust-${pcTargetParty}`}
                role="button"
                tabIndex={0}
                onClick={() => toggleInfoDrawer('trust')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleInfoDrawer('trust') } }}
              >
                <span>신뢰 상태</span>
                <strong>{trustStateLabel}</strong>
              </div>
            </div>
            <MeterRow
              icon={<PCSvgIcon id="i-drop" size={15} />}
              label="누설"
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
                aria-label="이전 쟁점"
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
                title="진실파악 단계 안내 보기"
              >
                {activeDispute?.name ?? '쟁점 없음'}
              </span>
              <button
                type="button"
                className="pc-target-dispute-nav__arrow"
                onClick={goNextDispute}
                disabled={!canCycleDispute}
                aria-label="다음 쟁점"
              >
                ▶
              </button>
            </div>

            <div className="pc-target-lie-status">
              <span className="pc-target-lie-status__big">쟁점별 진실파악 단계</span>
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
                    title={`진실파악 단계 ${index} 안내`}
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
              title="모순이 무엇인지 안내 보기"
            >
              <span className="pc-target-contradiction__label">
                <PCSvgIcon id="i-conflict" size={12} />
                모순
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
            aria-label="프로필 팩터 안내"
          >
            <header className="pc-target-info-drawer__header">
              <div className="pc-target-info-drawer__title">
                {infoDrawer === 'emotion' && '감정 상태'}
                {infoDrawer === 'trust' && '신뢰 상태'}
                {infoDrawer === 'leak' && '누설 바로미터'}
                {infoDrawer === 'lieStages' && '쟁점별 진실파악 단계'}
                {infoDrawer === 'contradiction' && '모순'}
                {infoDrawer === 'profile' && `${targetProfile.name} 상세`}
              </div>
              <button
                type="button"
                className="pc-target-info-drawer__close"
                onClick={() => setInfoDrawer(null)}
                aria-label="닫기"
              >
                ✕
              </button>
            </header>

            {infoDrawer === 'emotion' ? (() => {
              const currentPhase = targetAgent.emotionalState.phase
              const rows = [
                { phase: 'defensive' as const, label: '경계', desc: <>방어가 견고합니다. <ActionEm targets={ACTION_TARGETS.fact}>사실 추궁</ActionEm>으로 구체적인 상황 파악을 시도해보세요.</> },
                { phase: 'confident' as const, label: '자신감', desc: <>모순을 숨기고 있습니다. <ActionEm targets={ACTION_TARGETS.fact}>사실추궁</ActionEm>으로 허점을 공략해보세요.</> },
                { phase: 'shaken' as const, label: '동요', desc: <>실수가 잦아집니다. <ActionEm targets={[...ACTION_TARGETS.empathy, ...ACTION_TARGETS.motive]}>공감접근·동기탐색</ActionEm>으로 마음을 열어보세요.</> },
                { phase: 'angry' as const, label: '격앙', desc: <>감정이 폭발하기 직전입니다. <ActionEm targets={ACTION_TARGETS.empathy}>공감 접근</ActionEm>으로 신뢰를 얻어 마음을 공략해보세요.</> },
                { phase: 'resigned' as const, label: '체념', desc: <>자백이 예상됩니다. <ActionEm targets={ACTION_TARGETS.allInterrogation}>모든 액션</ActionEm>이 각각 효과적이니, 적극 공략해보세요.</> },
              ]
              return (
                <>
                  <p className="pc-target-info-drawer__lede">
                    현재의 감정 상태. 감정 상태에 따라 <Em>효과적인 액션</Em>이 다릅니다.
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
                    <span>현재 상태:</span>
                    <strong>{EMOTION_LABELS[currentPhase]} · {emotionStateValue}/100</strong>
                  </div>
                </>
              )
            })() : null}

            {infoDrawer === 'trust' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  재판관에 대한 신뢰도.
                </p>
                <div className="pc-target-info-drawer__columns">
                  <div>
                    <div className="pc-target-info-drawer__col-h">신뢰 상승</div>
                    <ul>
                      <li>공감 접근</li>
                      <li>경청</li>
                      <li>비공개 보호</li>
                    </ul>
                  </div>
                  <div>
                    <div className="pc-target-info-drawer__col-h">신뢰 하락</div>
                    <ul>
                      <li>모순 찌르기</li>
                      <li>반격</li>
                      <li>반복 압박</li>
                    </ul>
                  </div>
                </div>
                <p className="pc-target-info-drawer__tip">
                  신뢰가 높으면 <Em>자백</Em>이나 <Em>자발적인 진실 단서 제공</Em> 가능성이 높아집니다.
                </p>
                <div className="pc-target-info-drawer__now">
                  <span>현재 상태:</span>
                  <strong>{trustStateLabel} · {trustStateValue}/100</strong>
                </div>
              </>
            ) : null}

            {infoDrawer === 'leak' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  실수로 흘린 단서의 누적량. 높을수록 <Em>진실파악 단계가 빠르게 상승</Em>할 수 있습니다.
                </p>
                <div className="pc-target-info-drawer__columns" style={{ gridTemplateColumns: '0.7fr 1.3fr' }}>
                  <div>
                    <div className="pc-target-info-drawer__col-h">발생 경로</div>
                    <ul>
                      <li>동기 탐색</li>
                      <li>공감 접근</li>
                    </ul>
                  </div>
                  <div>
                    <div className="pc-target-info-drawer__col-h">효과</div>
                    <ul>
                      <li>진실파악 단계 전이 임계 ↓</li>
                      <li>모순 기반 공략 가능성 ↑</li>
                    </ul>
                  </div>
                </div>
                <p className="pc-target-info-drawer__tip">
                  개방된 모든 쟁점에 <Em>공통으로 적용</Em>됩니다.
                </p>
                <div className="pc-target-info-drawer__now">
                  <span>현재 상태:</span>
                  <strong>{targetMeters.leakMeter}%</strong>
                </div>
              </>
            ) : null}

            {infoDrawer === 'lieStages' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  쟁점별 6단계 진실 접근 지표.<br />
                  단계가 높을수록 더 많은 진실이 드러납니다.
                </p>
                <ul className="pc-target-info-drawer__list">
                  {[
                    { idx: 0, label: '완전 부정', desc: '사실 자체를 부인합니다. 모순이 거의 없어 공략이 어렵습니다.' },
                    { idx: 1, label: '일부 인정', desc: '사소한 부분만 인정합니다. 핵심은 여전히 숨깁니다.' },
                    { idx: 2, label: '핑계', desc: '인정하되 정황·이유를 들어 해명합니다.' },
                    { idx: 3, label: '책임 전가', desc: '상대 또는 외부 탓으로 돌립니다.' },
                    { idx: 4, label: '감정적', desc: '논리가 무너지고 감정이 앞섭니다. 자백 직전입니다.' },
                    { idx: 5, label: '자백', desc: '사실을 그대로 인정합니다. 구체적인 정보가 모두 공개됩니다.' },
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
                  <Em>사실 추궁·증거 제시·공감 접근</Em> 등 액션의 효과로 단계가 상승합니다.
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
                    <strong>{targetProfile.name}</strong> · {targetProfile.age}세 · {targetProfile.occupation}
                  </p>
                  <div className="pc-target-info-drawer__columns" style={{ gridTemplateColumns: '0.85fr 1.15fr' }}>
                    <div>
                      <div className="pc-target-info-drawer__col-h">성향</div>
                      <ul>
                        <li>{archetypeRevealed ? getPcArchetypeLabel(targetArchetype) : '관찰 전'}</li>
                      </ul>
                    </div>
                    <div>
                      <div className="pc-target-info-drawer__col-h">소개</div>
                      <ul>
                        <li>{targetProfile.age}세 · {targetProfile.occupation}</li>
                      </ul>
                    </div>
                  </div>
                  {targetProfile.speechStyle ? (
                    <p className="pc-target-info-drawer__tip">
                      <strong>말투</strong> — {targetProfile.speechStyle}
                    </p>
                  ) : null}
                  {truthMostlyRevealed && targetProfile.dailyRoutine ? (
                    <p className="pc-target-info-drawer__tip">
                      <strong>일상</strong> — {targetProfile.dailyRoutine}
                    </p>
                  ) : (
                    <p className="pc-target-info-drawer__tip" style={{ opacity: 0.55 }}>
                      <strong>일상</strong> — 진실파악 단계 4 이상에서 공개됩니다
                    </p>
                  )}
                  {/* verbalTells / 관찰 포인트는 게임 진행 중 발견 대상이므로 프로필에 미리 노출하지 않음 */}
                </>
              )
            })() : null}

            {infoDrawer === 'contradiction' ? (
              <>
                <p className="pc-target-info-drawer__lede">
                  같은 쟁점에서 NPC가 앞뒤가 맞지 않는 진술을 할 때 누적되는 압박치입니다.
                </p>
                <div className="pc-target-info-drawer__columns" style={{ gridTemplateColumns: '1.15fr 0.85fr' }}>
                  <div>
                    <div className="pc-target-info-drawer__col-h">발생 경로</div>
                    <ul>
                      <li>사실 추궁 반복</li>
                      <li>모순된 증거 제시</li>
                      <li>증인 증언과의 충돌</li>
                    </ul>
                  </div>
                  <div>
                    <div className="pc-target-info-drawer__col-h">효과</div>
                    <ul>
                      <li>진실파악 단계 전이 가속</li>
                      <li>임계 도달 시 방어 붕괴</li>
                    </ul>
                  </div>
                </div>
                <p className="pc-target-info-drawer__tip">
                  쟁점마다 별도로 누적됩니다. <Em>최대 5/5</Em>에 도달하면 결정적 모순으로 자백을 끌어냅니다.
                </p>
                <div className="pc-target-info-drawer__now">
                  <span>현재 상태:</span>
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
        <section className="sec pc-right-block pc-right-block--combination">
          <div
            className={`pc-skill-card pc-combination-card pc-right-card${hasReadyCombos ? ' is-combinable' : ''}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleCombinationDrop}
          >
            <div className="pc-skill-card__topline">
              <div className="pc-skill-card__eyebrow">조합</div>
              <button className="pc-skill-card__info-button" onClick={toggleCombinationPanel} type="button" title="조합 정보">?</button>
            </div>

            <div className="pc-combination-card__body">
              {comboReady ? (
                <button className="pc-combination-card__attempt pc-combination-card__attempt--center" onClick={handleCombinationAttempt} type="button">
                  <PCSvgIcon id="i-bolt" size={20} />
                  <span>조합 실행</span>
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
                  <span className="pc-combination-card__ready-cta">확인</span>
                </button>
              ) : (
                <div className="pc-combination-card__guide">
                  <p><strong>증거</strong> 또는 <strong>발언 카드</strong>를 채워주신 후 조합을 실행해주세요.</p>
                  <p className="pc-combination-card__guide-sub">드래그 앤 드롭 또는 Shift + 클릭</p>
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
                  aria-label="닫기"
                >
                  ✕
                </button>
              </header>

              {!autoMatchConfirming ? (
                <>
                  <div className="pc-combination-drawer__breakdown">
                    <CategoryRow label="증거 + 증거" ready={recipeBreakdown.ee.ready} potential={recipeBreakdown.ee.potential} />
                    <CategoryRow label="증거 + 발언" ready={recipeBreakdown.es.ready} potential={recipeBreakdown.es.potential} />
                    <CategoryRow label="발언 + 발언" ready={recipeBreakdown.ss.ready} potential={recipeBreakdown.ss.potential} />
                  </div>

                  <p className="pc-combination-drawer__lede">
                    증거 수첩과 발언 노트에 <strong>하이라이트</strong>된 항목들 사이에 숨겨진 조합이 있습니다.
                  </p>

                  <div className="pc-combination-drawer__auto">
                    <p className="pc-combination-drawer__auto-desc">
                      <strong>스킬 포인트</strong>를 소비해 조합이 가능한 재료를 자동 배치할 수 있습니다.
                    </p>
                    <button
                      className="pc-combination-drawer__auto-cta"
                      disabled={!canAutoMatch}
                      onClick={() => setAutoMatchConfirming(true)}
                      type="button"
                    >
                      <span className="pc-combination-drawer__auto-cta-label">
                        <PCSvgIcon id="i-link" size={14} />
                        <span>자동 매칭</span>
                      </span>
                      <span className="pc-combination-drawer__auto-cost" title={`스킬 포인트 ${autoMatchCost} 소비`}>
                        <PCSvgIcon id="i-link" size={12} />
                        <span>{autoMatchCost}</span>
                      </span>
                    </button>
                    {readyLabRecipes.length === 0 ? (
                      <p className="pc-combination-drawer__warn">지금은 자동 매칭할 준비된 조합이 없습니다.</p>
                    ) : globalSkillPoints < autoMatchCost ? (
                      <p className="pc-combination-drawer__warn">스킬 포인트가 부족합니다.</p>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <p className="pc-combination-drawer__confirm-text">
                    자동 매칭에 스킬 포인트 <strong>{autoMatchCost}</strong>이 소비됩니다.<br />
                    매칭을 진행할까요?
                  </p>
                  <div className="pc-combination-drawer__confirm-actions">
                    <button
                      className="pc-combination-drawer__auto-cta is-danger"
                      onClick={() => setAutoMatchConfirming(false)}
                      type="button"
                    >
                      아니오
                    </button>
                    <button
                      className="pc-combination-drawer__auto-cta is-primary"
                      onClick={handleAutoMatchConfirm}
                      type="button"
                    >
                      예, 매칭합니다
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
            <div className="pc-skill-card__eyebrow">{'요약'}</div>
            <button className="pc-summary-button" onClick={openSummaryPanel} type="button">
              <span className="pc-summary-button__text">{'기록 정리'}</span>
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
        {ready > 0 ? <span className="pc-combination-card__cat-ready"><PCSvgIcon id="i-link" size={12} /> 준비 {ready}</span> : null}
        {potential > 0 ? <span className="pc-combination-card__cat-potential"><PCSvgIcon id="i-search" size={12} /> 실마리 {potential}</span> : null}
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
  const fallback = node ? node.label.replace(/^note:/, '') : '\uBE44\uC5B4 \uC788\uC74C'
  const text = displayText ?? fallback
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
): string {
  if (node.type === 'evidence' || node.type === 'derived_evidence') {
    const srcId = node.sourceRef ?? node.linkedEvidenceIds?.[0] ?? node.id
    const ev = caseData?.evidence.find((e) => e.id === srcId)
    if (ev?.surfaceName) return ev.surfaceName
    return node.label.replace(/^[a-z]+-\d+\s+/i, '').replace(/^note:/, '')
  }
  if (node.type === 'statement') {
    const match = node.label.match(/["\u201C\u201D]([^"\u201C\u201D]+)["\u201C\u201D]/)
    if (match) return match[1]
    return node.label.replace(/^[A-Za-z\uAC00-\uD7A3]+\s*\uC758\s*\uBC1C\uC5B8\s*/, '').replace(/^[a-z]+-\d+\s+/i, '')
  }
  return node.label.replace(/^note:/, '').replace(/^[a-z]+-\d+\s+/i, '')
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

function normalizeNodeText(text: string | undefined): string {
  return (text ?? '').toLowerCase().replace(/\s+/g, '')
}

function getTrustStateLabel(value: number): string {
  if (value >= 70) {
    return '\uC2E0\uB8B0'
  }
  if (value >= 40) {
    return '\uACBD\uACC4'
  }
  return '\uC758\uC2EC'
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
    unlock_evidence: '\uC0C8 \uC99D\uAC70',
    unlock_note: '\uC0C8 \uBC1C\uC5B8',
    unlock_question: '\uC0C8 \uC9C8\uBB38',
    unlock_dispute: '\uC0C8 \uC7C1\uC810',
    unlock_witness_angle: '새 증인',
    unlock_statement: '\uC9C4\uC220 \uD574\uAE08',
    upgrade_evidence: '\uC99D\uAC70 \uAC15\uD654',
    upgrade_dispute: '\uC7C1\uC810 \uAC15\uD654',
    reframe_evidence: '\uC99D\uAC70 \uC7AC\uAD6C\uC131',
    reframe_dispute: '\uC7C1\uC810 \uC7AC\uAD6C\uC131',
    elevate_reliability: '\uC2E0\uB8B0\uB3C4 \uC0C1\uC2B9',
  }
  return labels[kind] ?? kind
}

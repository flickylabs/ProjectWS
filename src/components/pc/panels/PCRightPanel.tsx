import { useCallback, useEffect, useMemo, useState, type DragEvent, type ReactNode } from 'react'
import {
  GamePhase,
  type CombinationLabNode,
  type CombinationLabOutput,
  type CombinationLabRecipe,
  type EmotionalPhase,
  type LieState,
} from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'
import { getPcArchetypeLabel, getPcTellDescription, getPcTellLabel } from '../pcUiLabels'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import { PC_ADD_COMBINATION_NOTE_EVENT, type PcCombinationPanelEventDetail, type PcPinnedNote } from './PCImportantNotesSection'

const LIE_STATES: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']

const EMOTION_LABELS: Record<EmotionalPhase, string> = {
  defensive: '\uACBD\uACC4',
  confident: '\uC790\uC2E0\uAC10',
  shaken: '\uB3D9\uC694',
  angry: '\uACA9\uC559',
  resigned: '\uCCB4\uB150',
}

export default function PCRightPanel() {
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const pcTargetParty = useStore((s) => s.pcTargetParty)
  const setPcTargetParty = useStore((s) => s.setPcTargetParty)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const questionMeters = useStore((s) => s.questionMeters)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const archetypeA = useStore((s) => s.archetypeA)
  const archetypeB = useStore((s) => s.archetypeB)
  const combinationLabRuntime = useStore((s) => s.combinationLabRuntime)
  const pcSummaryUnlocked = useStore((s) => s.pcSummaryUnlocked)
  const globalSkillPoints = useStore((s) => s.globalSkillPoints)

  const [comboSlots, setComboSlots] = useState<[string | null, string | null]>([null, null])

  if (!caseData) {
    return null
  }

  const store = useGameStore.getState()
  const targetProfile = pcTargetParty === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const targetAgent = pcTargetParty === 'a' ? agentA : agentB
  const targetArchetype = pcTargetParty === 'a' ? archetypeA : archetypeB
  const targetMeters = questionMeters[pcTargetParty]
  const activeDispute =
    caseData.disputes.find((dispute) => dispute.id === lastFocusedDisputeId) ?? caseData.disputes[0] ?? null
  const activeLieState = activeDispute ? targetAgent.lieStateMap[activeDispute.id]?.currentState ?? 'S0' : 'S0'
  const activeLieIndex = LIE_STATES.indexOf(activeLieState)
  const tellType = targetProfile.verbalTells[0]?.type ?? ''
  const faceId = getPcFaceSymbolId(pcTargetParty, targetProfile, targetAgent.emotionalState.phase)
  const trustStateLabel = getTrustStateLabel(targetAgent.trustState.trustTowardJudge)
  const showCombination =
    currentPhase === GamePhase.Phase3_Interrogation
    || currentPhase === GamePhase.Phase4_Evidence
    || currentPhase === GamePhase.Phase5_ReExamination

  const availableNodes = useMemo(() => {
    const config = combinationLabRuntime.config
    if (!config) {
      console.warn('[CombinationLab] config is null — initCombinationLab not called?')
      return [] as CombinationLabNode[]
    }

    const filtered = config.nodes.filter((node) => {
      if (node.type === 'evidence' || node.type === 'derived_evidence') {
        const unlocked = Boolean(evidenceStates[node.id]?.unlocked)
        if (!unlocked) console.log(`[CombinationLab] node ${node.id} locked (evidenceStates key exists: ${node.id in evidenceStates})`)
        return unlocked
      }
      const discovered = combinationLabRuntime.discoveredNodeIds.includes(node.id)
      if (!discovered) console.log(`[CombinationLab] node ${node.id} not discovered`)
      return discovered
    })
    console.log(`[CombinationLab] availableNodes: ${filtered.length}/${config.nodes.length}`, filtered.map((n) => n.id))
    return filtered
  }, [combinationLabRuntime.config, combinationLabRuntime.discoveredNodeIds, evidenceStates])

  const comboNodeA = comboSlots[0] ? availableNodes.find((node) => node.id === comboSlots[0]) ?? null : null
  const comboNodeB = comboSlots[1] ? availableNodes.find((node) => node.id === comboSlots[1]) ?? null : null
  const comboReady = Boolean(comboNodeA && comboNodeB)

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
    const noteNodes = availableNodes.filter((node) => node.type === 'note' || node.type === 'derived_note')
    if (noteNodes.length === 0) {
      return null
    }

    const normalizedText = normalizeNodeText(note.text)
    const byText = noteNodes.find((node) => {
      const label = normalizeNodeText(node.label)
      return label.length > 0 && (normalizedText.includes(label) || label.includes(normalizedText))
    })
    if (byText) {
      return byText.id
    }

    const relatedDisputeIds = new Set(note.relatedDisputes)
    const byDispute = noteNodes.find((node) => node.linkedDisputeIds?.some((disputeId) => relatedDisputeIds.has(disputeId)))
    return byDispute?.id ?? noteNodes[0]?.id ?? null
  }, [availableNodes])

  const handleCombinationEvent = useCallback((detail: PcCombinationPanelEventDetail) => {
    const nodeId = detail.evidenceId
      ? resolveEvidenceNodeId(detail.evidenceId)
      : detail.note
        ? resolveNoteNodeId(detail.note)
        : null

    if (nodeId) {
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

    if (!store.canRunCombinationRecipe(matchingRecipe.id)) {
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

    store.addDialogue({
      speaker: 'system',
      text: `\uC870\uD569 \uACB0\uACFC: ${matchingOutput.label}\n${matchingOutput.summary}`,
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
    openPcInteractionPanel({
      title: matchingOutput.label,
      subtitle: '\uC870\uD569 \uC131\uACF5',
      tone: 'gold',
      variant: 'feature',
      body: matchingOutput.summary,
      tags: effectTags,
      actions: matchingOutput.effects
        .map((effect) => effect.targetId ?? effect.unlockNodeId ?? effect.disputeUpgrade?.disputeId)
        .filter((value): value is string => Boolean(value))
        .slice(0, 1)
        .map((disputeId) => ({ kind: 'focus_dispute' as const, label: '\uAD00\uB828 \uC7C1\uC810 \uBCF4\uAE30', disputeId })),
    })

    clearComboSlots()
  }, [clearComboSlots, comboReady, matchingOutput, matchingRecipe, store])

  const openCombinationInfo = useCallback(() => {
    const availableRecipes = store.getAvailableCombinationRecipes()
    const lines = availableRecipes.length > 0
      ? availableRecipes.slice(0, 6).map((recipe, index) => {
          const output = combinationLabRuntime.config?.outputs.find((item) => item.id === recipe.outputId)
          return `${index + 1}. ${output?.label ?? recipe.id} · \uBE44\uC6A9 ${recipe.cost}`
        })
      : ['\uC9C0\uAE08\uC740 \uD655\uC778 \uAC00\uB2A5\uD55C \uC870\uD569\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.']

    openPcInteractionPanel({
      title: '\uC870\uD569 \uC2A4\uD0AC',
      subtitle: '\uBD84\uC11D \uD3EC\uC778\uD2B8 \uAE30\uBC18 \uC870\uD569',
      tone: 'blue',
      body: [
        `\uAC00\uC6A9 \uBD84\uC11D \uD3EC\uC778\uD2B8: ${combinationLabRuntime.analysisPoints}`,
        '',
        '\uC99D\uAC70\uC640 \uC911\uC694 \uBC1C\uC5B8 \uB178\uD2B8\uB97C \uC870\uD569\uD558\uBA74 \uC0C8\uB85C\uC6B4 \uC7C1\uC810, \uC0C8\uB85C\uC6B4 \uBC1C\uC5B8, \uAE30\uC874 \uC99D\uAC70 \uAC15\uD654 \uAC19\uC740 \uACB0\uACFC\uB97C \uC5BB\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
        '',
        '\uD604\uC7AC \uD655\uC778 \uAC00\uB2A5\uD55C \uC870\uD569',
        ...lines,
      ].join('\n'),
    })
  }, [combinationLabRuntime.analysisPoints, combinationLabRuntime.config?.outputs, store])

  const openSummaryPanel = useCallback(() => {
    openPcInteractionPanel({
      title: pcSummaryUnlocked ? '\uC694\uC57D \uC2E4\uD589' : '\uC694\uC57D \uC2A4\uD0AC',
      subtitle: pcSummaryUnlocked ? '\uC99D\uC2DC \uC0AC\uAC74 \uC694\uC57D \uD655\uC778' : '\uC2A4\uD0AC \uD3EC\uC778\uD2B8 3\uAC1C \uD544\uC694',
      tone: 'gold',
      variant: 'feature',
      body: pcSummaryUnlocked
        ? '\uD604\uC7AC \uC0AC\uAC74\uC758 \uBC1C\uB2EC \uC7C1\uC810, \uC5F4\uB9B0 \uC99D\uAC70, \uC9C4\uD589 \uC0C1\uD0DC\uB97C \uD55C \uBC88\uC5D0 \uC815\uB9AC\uD574\uC11C \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.'
        : [
            '\uC694\uC57D \uC2A4\uD0AC\uC744 \uD574\uAE08\uD558\uBA74 \uC774\uD6C4\uC5D0\uB294 \uD604\uC7AC \uC0AC\uAC74\uC758 \uC9C4\uD589 \uD750\uB984\uC744 \uD55C \uBC88\uC5D0 \uC815\uB9AC\uD574 \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
            '',
            `\uBCF4\uC720 \uC2A4\uD0AC \uD3EC\uC778\uD2B8: ${globalSkillPoints}`,
            '\uC0AC\uC6A9 \uBE44\uC6A9: 3',
          ].join('\n'),
      actions: [
        {
          kind: pcSummaryUnlocked ? 'open_summary' : 'unlock_summary',
          label: pcSummaryUnlocked ? '\uC694\uC57D \uC2E4\uD589' : '\uC694\uC57D \uD574\uAE08',
        },
      ],
    })
  }, [globalSkillPoints, pcSummaryUnlocked])

  return (
    <div className="pc-play-right">
      <section className="sec pc-target-block">
        <div className="sec-h">
          <PCSvgIcon id="i-person" size={14} />
          <span>{'\uD604\uC7AC \uB300\uC0C1'}</span>
          <span className="sub">{targetProfile.name}</span>
        </div>

        <div className={`pc-target-shell pc-right-card party-${pcTargetParty}`}>
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
            <div className="tgt-face">
              <PCSvgIcon id={faceId} size={72} />
            </div>

            <div className="pc-target-copy__main">
              <div className="tgt-meta">{`${targetProfile.age}\uC138 \u00B7 ${targetProfile.occupation}`}</div>
              <div className="tgt-tags">
                <span className="tag tag-arch">{getPcArchetypeLabel(targetArchetype)}</span>
                <span className="tag tag-tell" title={tellDescription}>
                  {getPcTellLabel(tellType)}
                </span>
              </div>
            </div>

            <p className="pc-target-hint">{currentHint}</p>
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
                <div className={className} key={state}>
                  {state}
                </div>
              )
            })}
          </div>

          <div className="pc-target-state-row">
            <span>{'\uC2E0\uB8B0 \uC0C1\uD0DC'}</span>
            <strong>{trustStateLabel}</strong>
          </div>

          <div className="sec-h pc-target-meter-title">
            <PCSvgIcon id="i-drop" size={14} />
            <span>{'\uB300\uC0C1 \uBBF8\uD130'}</span>
            <span className="sub">{EMOTION_LABELS[targetAgent.emotionalState.phase]}</span>
          </div>

          <div className="meter-group pc-target-meters">
            <MeterRow
              icon={<PCSvgIcon id="i-drop" size={15} />}
              label={'\uB204\uC124'}
              valueText={`${targetMeters.leakMeter}%`}
              width={targetMeters.leakMeter}
              tone="gold"
            />
            <MeterRow
              icon={<PCSvgIcon id="i-conflict" size={15} />}
              label={'\uBAA8\uC21C'}
              valueText={`${targetMeters.contradictionTokens}/5`}
              width={(targetMeters.contradictionTokens / 5) * 100}
              tone="red"
            />
          </div>
        </div>
      </section>

      {showCombination ? (
        <section className="sec pc-right-block">
          <div
            className="pc-skill-card pc-combination-card pc-right-card"
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleCombinationDrop}
          >
            <div className="pc-skill-card__topline">
              <div className="pc-skill-card__eyebrow">{'\uC870\uD569 \uC2A4\uD0AC'}</div>
              <button className="pc-skill-card__info-button" onClick={openCombinationInfo} type="button">
                !
              </button>
            </div>

            {comboReady ? (
              <button className="pc-combination-card__attempt" onClick={handleCombinationAttempt} type="button">
                <span>{'조합 시도'}</span>
                <PCSvgIcon id="i-bolt" size={20} />
              </button>
            ) : (
              <div className="pc-combination-card__desc">
                <p className="pc-skill-card__copy">{'증거, 발언 노트 등을 끌어와 조합해보세요.'}</p>
                <p className="pc-skill-card__copy is-hint">{'드래그 앤 드롭 또는 Shift + 클릭'}</p>
                <div className="pc-combination-card__focus">
                  <span>{'현재 쟁점'}</span>
                  <strong>{activeDispute?.name ?? '아직 선택된 쟁점 없음'}</strong>
                </div>
              </div>
            )}

            <div className="pc-combination-card__slots">
              <CombinationSlot
                label="A"
                node={comboNodeA}
                onClear={() => setComboSlots((current) => [null, current[1]])}
              />
              <CombinationSlot
                label="B"
                node={comboNodeB}
                onClear={() => setComboSlots((current) => [current[0], null])}
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="sec pc-right-block">
        <div className="pc-skill-card pc-summary-card pc-right-card">
          <div className="pc-skill-card__eyebrow">{'\uC694\uC57D \uC2A4\uD0AC'}</div>
          <button className="pc-summary-button" onClick={openSummaryPanel} type="button">
            <span className="pc-summary-button__left">
              {!pcSummaryUnlocked ? <PCSvgIcon id="i-lock" size={16} /> : null}
            </span>
            <span className="pc-summary-button__text">{'\uC694\uC57D \uC2E4\uD589'}</span>
            <span className="pc-summary-button__right">
              {pcSummaryUnlocked ? null : (
                <>
                  <PCSvgIcon id="i-bolt" size={16} />
                  <b>x3</b>
                </>
              )}
            </span>
          </button>
        </div>
      </section>
    </div>
  )
}

function MeterRow({
  icon,
  label,
  valueText,
  width,
  tone,
}: {
  icon: ReactNode
  label: string
  valueText: string
  width: number
  tone: 'blue' | 'red' | 'gold'
}) {
  return (
    <div className="meter pc-target-meter">
      <span className="pc-target-meter__icon">{icon}</span>
      <span className="pc-target-meter__label">{label}</span>
      <div className="meter-track">
        <div className={`meter-fill mf-${tone}`} style={{ width: `${Math.max(0, Math.min(width, 100))}%` }} />
      </div>
      <span className="meter-val">{valueText}</span>
    </div>
  )
}

function CombinationSlot({
  label,
  node,
  onClear,
}: {
  label: 'A' | 'B'
  node: CombinationLabNode | null
  onClear: () => void
}) {
  return (
    <button
      className={`pc-combination-slot${node ? ' is-filled' : ''}`}
      onClick={node ? onClear : undefined}
      title={node?.label ?? `${label} \uC2AC\uB86F`}
      type="button"
    >
      <span className="pc-combination-slot__label">{label}</span>
      <span className="pc-combination-slot__text">{node ? node.label : '\uBE44\uC5B4 \uC788\uC74C'}</span>
    </button>
  )
}

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

function getResultKindLabel(kind: string): string {
  const labels: Record<string, string> = {
    unlock_evidence: '\uC0C8 \uC99D\uAC70',
    unlock_note: '\uC0C8 \uBC1C\uC5B8',
    unlock_question: '\uC0C8 \uC9C8\uBB38',
    unlock_dispute: '\uC0C8 \uC7C1\uC810',
    unlock_statement: '\uC9C4\uC220 \uD574\uAE08',
    upgrade_evidence: '\uC99D\uAC70 \uAC15\uD654',
    upgrade_dispute: '\uC7C1\uC810 \uAC15\uD654',
    reframe_evidence: '\uC99D\uAC70 \uC7AC\uAD6C\uC131',
    reframe_dispute: '\uC7C1\uC810 \uC7AC\uAD6C\uC131',
    elevate_reliability: '\uC2E0\uB8B0\uB3C4 \uC0C1\uC2B9',
  }
  return labels[kind] ?? kind
}

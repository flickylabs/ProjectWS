import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import type {
  CombinationLabNode,
  CombinationLabOutput,
  CombinationLabRecipe,
  CombinationLabResultKind,
} from '../../types'
import { showToast } from '../common/Toast'
import Emoji from '../common/Emoji'
import {
  PC_ADD_COMBINATION_NOTE_EVENT,
  type PcCombinationPanelEventDetail,
  type PcPinnedNote,
} from '../pc/panels/PCImportantNotesSection'

function normalizeInputs(ids: string[]): string[] {
  return [...ids].sort()
}

function sameInputs(a: string[], b: string[]): boolean {
  const aa = normalizeInputs(a)
  const bb = normalizeInputs(b)
  return aa.length === bb.length && aa.every((value, index) => value === bb[index])
}

function normalizeNodeText(text: string | undefined): string {
  return (text ?? '').toLowerCase().replace(/\s+/g, '')
}

function resultKindLabel(kind: CombinationLabResultKind): string {
  const labels: Record<CombinationLabResultKind, string> = {
    unlock_evidence: '새 증거',
    unlock_note: '새 메모',
    unlock_question: '새 질문',
    unlock_statement: '새 진술',
    unlock_dispute: '새 쟁점',
    unlock_witness_angle: '증인 각도',
    unlock_interjection: '끼어들기',
    unlock_mediation_hint: '조정 힌트',
    upgrade_question: '질문 발전',
    upgrade_evidence: '증거 발전',
    upgrade_dispute: '쟁점 발전',
    reframe_question: '질문 재해석',
    reframe_evidence: '증거 재해석',
    reframe_dispute: '쟁점 재프레임',
    split_dispute: '쟁점 분할',
    merge_disputes: '쟁점 통합',
    elevate_reliability: '신뢰도 승격',
    expand_context: '맥락 확장',
    narrow_scope: '범위 축소',
    shift_legality_weight: '적법성 재평가',
    shift_responsibility_weight: '책임 재배분',
  }
  return labels[kind] ?? kind
}

function nodeBadge(node: CombinationLabNode): string {
  switch (node.type) {
    case 'evidence':
    case 'derived_evidence':
      return '📄'
    case 'note':
    case 'derived_note':
      return '🧩'
    case 'question':
      return '❓'
    case 'statement':
      return '💬'
    case 'dispute':
      return '⚖️'
    case 'witness_angle':
      return '👁️'
    case 'mediation_hint':
      return '🤝'
    default:
      return '•'
  }
}

export default function CombinationLabPanel() {
  const runtime = useStore((s) => s.combinationLabRuntime)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const caseData = useStore((s) => s.caseData)
  const turnCount = useStore((s) => s.turnCount)
  const [expanded, setExpanded] = useState(false)
  const [slots, setSlots] = useState<[string | null, string | null, string | null]>([null, null, null])

  const config = runtime.config
  const store = useGameStore.getState()

  const availableNodes = useMemo(() => {
    if (!config) return [] as CombinationLabNode[]
    return config.nodes.filter((node) => {
      if (node.type === 'evidence' || node.type === 'derived_evidence') {
        return !!evidenceStates[node.id]?.unlocked
      }
      return runtime.discoveredNodeIds.includes(node.id)
    })
  }, [config, evidenceStates, runtime.discoveredNodeIds])

  const selectedIds = useMemo(() => slots.filter(Boolean) as string[], [slots])

  const matchingRecipe = useMemo(() => {
    if (!config || selectedIds.length < 2) return null as CombinationLabRecipe | null
    return config.recipes.find((recipe) => sameInputs(recipe.inputs, selectedIds)) ?? null
  }, [config, selectedIds])

  const matchingOutput = useMemo(() => {
    if (!config || !matchingRecipe) return null as CombinationLabOutput | null
    return config.outputs.find((output) => output.id === matchingRecipe.outputId) ?? null
  }, [config, matchingRecipe])

  const canRun = !!matchingRecipe && store.canRunCombinationRecipe(matchingRecipe.id)

  const pinNode = useCallback((nodeId: string) => {
    setSlots((prev) => {
      if (prev.includes(nodeId)) return prev
      const next = [...prev] as [string | null, string | null, string | null]
      const emptyIndex = next.findIndex((value) => !value)
      if (emptyIndex >= 0) {
        next[emptyIndex] = nodeId
        return next
      }
      return [prev[1], prev[2], nodeId]
    })
  }, [])

  const clearSlot = useCallback((index: number) => {
    setSlots((prev) => {
      const next = [...prev] as [string | null, string | null, string | null]
      next[index] = null
      return next
    })
  }, [])

  const clearAll = useCallback(() => setSlots([null, null, null]), [])

  const resolveEvidenceNodeId = useCallback((evidenceId: string) => {
    return availableNodes.find((node) => {
      if (node.type !== 'evidence' && node.type !== 'derived_evidence') {
        return false
      }
      return node.id === evidenceId || node.sourceRef === evidenceId || node.linkedEvidenceIds?.includes(evidenceId)
    })?.id ?? null
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
    if (byText && !selectedIds.includes(byText.id)) {
      return byText.id
    }

    const relatedDisputeIds = new Set(note.relatedDisputes)
    const byDispute = noteNodes.find((node) => {
      if (!node.linkedDisputeIds?.some((disputeId) => relatedDisputeIds.has(disputeId))) {
        return false
      }
      return !selectedIds.includes(node.id)
    })
    if (byDispute) {
      return byDispute.id
    }

    return noteNodes.find((node) => !selectedIds.includes(node.id))?.id ?? null
  }, [availableNodes, selectedIds])

  useEffect(() => {
    const handleAddFromPanel = (event: Event) => {
      const detail = (event as CustomEvent<PcCombinationPanelEventDetail>).detail
      const nodeId = detail.evidenceId
        ? resolveEvidenceNodeId(detail.evidenceId)
        : detail.note
          ? resolveNoteNodeId(detail.note)
          : null

      if (!nodeId) {
        showToast('조합 가능한 노드를 찾지 못했습니다.', 'warn')
        return
      }

      pinNode(nodeId)
      setExpanded(true)
    }

    window.addEventListener(PC_ADD_COMBINATION_NOTE_EVENT, handleAddFromPanel as EventListener)
    return () => window.removeEventListener(PC_ADD_COMBINATION_NOTE_EVENT, handleAddFromPanel as EventListener)
  }, [pinNode, resolveEvidenceNodeId, resolveNoteNodeId])

  if (!caseData || !config) return null

  const handleRun = () => {
    if (!matchingRecipe || !matchingOutput) return
    const result = store.runCombinationRecipe(matchingRecipe.id)
    if (!result.ok) {
      const reason =
        result.reason === 'recipe_locked' ? '지금은 이 조합을 실행할 수 없습니다.' :
        result.reason === 'no_config' ? '이 사건에는 조합 실험실 데이터가 없습니다.' :
        '조합 실행에 실패했습니다.'
      showToast(reason, 'warn')
      return
    }

    store.addDialogue({
      speaker: 'system',
      text: `🧪 조합 실험실: ${matchingOutput.label}\n${matchingOutput.summary}`,
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
        .filter((value): value is string => !!value),
      turn: turnCount,
    })

    showToast(`조합 성공: ${matchingOutput.label}`, 'success')
    clearAll()
  }

  const evidenceNodes = availableNodes.filter((node) => node.type === 'evidence' || node.type === 'derived_evidence')
  const noteNodes = availableNodes.filter((node) => node.type === 'note' || node.type === 'derived_note')
  const derivedNodes = availableNodes.filter((node) => !['evidence', 'derived_evidence', 'note', 'derived_note'].includes(node.type))

  return (
    <div className="mb-2 px-2 py-2 bg-cyan-950/20 border border-cyan-700/30 rounded-lg">
      <button
        onClick={() => setExpanded((value) => !value)}
        className="w-full flex items-center justify-between"
        type="button"
      >
        <div className="flex items-center gap-2">
          <Emoji char="🧪" size={14} />
          <span className="text-[11px] font-semibold text-cyan-300">조합 실험실</span>
          <span className="text-[10px] text-cyan-500">분석 {runtime.analysisPoints}pt</span>
        </div>
        <span className={`text-xs text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
      </button>

      {expanded && (
        <div className="mt-2 space-y-2 animate-fade-in">
          <div className="flex gap-2">
            {slots.map((slot, index) => {
              const node = availableNodes.find((item) => item.id === slot)
              return (
                <button
                  key={`lab-slot-${index}`}
                  onClick={() => clearSlot(index)}
                  type="button"
                  className={`flex-1 min-h-[48px] text-left px-2 py-1.5 rounded border ${
                    node
                      ? 'border-cyan-500/50 bg-cyan-900/20 text-cyan-100'
                      : 'border-gray-700/40 bg-gray-900/30 text-gray-600'
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-wide opacity-70">slot {index + 1}</div>
                  <div className="text-[11px] leading-snug mt-0.5">
                    {node ? `${nodeBadge(node)} ${node.label}` : '노드 선택'}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[10px] text-gray-500">
              기존 비교 보관함을 확장한 실험실입니다. 증거와 노트를 교차 조합할 수 있습니다.
            </div>
            <button onClick={clearAll} type="button" className="text-[10px] text-gray-500 hover:text-gray-300">
              초기화
            </button>
          </div>

          <NodeBank title="증거" nodes={evidenceNodes} selected={selectedIds} onSelect={pinNode} />
          <NodeBank title="노트" nodes={noteNodes} selected={selectedIds} onSelect={pinNode} />
          {derivedNodes.length > 0 && <NodeBank title="파생 노드" nodes={derivedNodes} selected={selectedIds} onSelect={pinNode} />}

          <div className="border border-cyan-800/30 rounded-lg bg-gray-950/40 px-3 py-2">
            {matchingRecipe && matchingOutput ? (
              <>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-cyan-200">{matchingOutput.label}</div>
                  <div className="text-[10px] text-cyan-500">비용 {matchingRecipe.cost}</div>
                </div>
                <div className="text-[11px] text-gray-300 leading-relaxed">{matchingOutput.summary}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {matchingOutput.effects.map((effect, index) => (
                    <span key={`${matchingOutput.id}-effect-${index}`} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/30 text-cyan-200 border border-cyan-700/30">
                      {resultKindLabel(effect.kind)}
                    </span>
                  ))}
                </div>
                {matchingRecipe.hidden && (
                  <div className="mt-1 text-[10px] text-amber-300">hidden combo · 첫 성공 시 포인트 환급 적용</div>
                )}
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleRun}
                    disabled={!canRun}
                    type="button"
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      canRun ? 'bg-cyan-600 text-white hover:bg-cyan-500 active:scale-95' : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    조합 실행
                  </button>
                </div>
              </>
            ) : (
              <div className="text-[11px] text-gray-500 leading-relaxed">
                {selectedIds.length < 2
                  ? '증거나 노트를 2개 이상 올리면 가능한 조합을 찾습니다.'
                  : '이 조합에는 아직 authoring된 결과가 없습니다.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function NodeBank({
  title,
  nodes,
  selected,
  onSelect,
}: {
  title: string
  nodes: CombinationLabNode[]
  selected: string[]
  onSelect: (nodeId: string) => void
}) {
  if (nodes.length === 0) return null
  return (
    <div>
      <div className="text-[10px] text-gray-500 mb-1">{title}</div>
      <div className="flex flex-wrap gap-1.5">
        {nodes.map((node) => {
          const isSelected = selected.includes(node.id)
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect(node.id)}
              disabled={isSelected}
              className={`text-[11px] px-2 py-1 rounded border transition-all ${
                isSelected
                  ? 'border-cyan-500/50 bg-cyan-900/30 text-cyan-100 cursor-default'
                  : 'border-gray-700/40 bg-gray-900/30 text-gray-300 hover:border-cyan-700/50 hover:text-cyan-100'
              }`}
            >
              {nodeBadge(node)} {node.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import type {
  CombinationLabNode,
  CombinationLabOutput,
  CombinationLabRecipe,
  CombinationLabResultKind,
} from '../../types'
import { showToast } from '../common/Toast'
import { showGuideCutscene } from '../common/guideCutscene'
import Emoji from '../common/Emoji'
import {
  PC_ADD_COMBINATION_NOTE_EVENT,
  type PcCombinationPanelEventDetail,
  type PcPinnedNote,
} from '../pc/panels/PCImportantNotesSection'
import { playCombinationFailure, playCombinationSuccess } from '../../engine/soundEngine'
import { attemptCoreNarrativeForDossier, attemptCoreNarrativeForWitness } from '../../engine/narrativeIntegration'
import { cleanOutputLabel, cleanOutputSummary } from '../../utils/combinationLabels'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

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

const RESULT_KIND_LABELS: Record<CombinationLabResultKind, Record<LocaleCode, string>> = {
  unlock_evidence: { ko: '새 증거', en: 'New Evidence', ja: '新証拠', 'zh-CN': '新证据' },
  unlock_note: { ko: '새 메모', en: 'New Note', ja: '新メモ', 'zh-CN': '新笔记' },
  unlock_question: { ko: '새 질문', en: 'New Question', ja: '新質問', 'zh-CN': '新问题' },
  unlock_statement: { ko: '새 진술', en: 'New Statement', ja: '新供述', 'zh-CN': '新陈述' },
  unlock_dispute: { ko: '새 쟁점', en: 'New Dispute', ja: '新争点', 'zh-CN': '新争议' },
  unlock_witness_angle: { ko: '증인 각도', en: 'Witness Angle', ja: '証人の視点', 'zh-CN': '证人角度' },
  unlock_interjection: { ko: '끼어들기', en: 'Interjection', ja: '割り込み', 'zh-CN': '插话' },
  unlock_mediation_hint: { ko: '판결 힌트', en: 'Verdict Hint', ja: '判決ヒント', 'zh-CN': '裁决提示' },
  upgrade_question: { ko: '질문 발전', en: 'Question Upgrade', ja: '質問発展', 'zh-CN': '问题升级' },
  upgrade_evidence: { ko: '증거 발전', en: 'Evidence Upgrade', ja: '証拠発展', 'zh-CN': '证据升级' },
  upgrade_dispute: { ko: '쟁점 발전', en: 'Dispute Upgrade', ja: '争点発展', 'zh-CN': '争议升级' },
  reframe_question: { ko: '질문 재해석', en: 'Question Reframe', ja: '質問の再解釈', 'zh-CN': '问题重构' },
  reframe_evidence: { ko: '증거 재해석', en: 'Evidence Reframe', ja: '証拠の再解釈', 'zh-CN': '证据重构' },
  reframe_dispute: { ko: '쟁점 재프레임', en: 'Dispute Reframe', ja: '争点の再構成', 'zh-CN': '争议重构' },
  split_dispute: { ko: '쟁점 분할', en: 'Dispute Split', ja: '争点分割', 'zh-CN': '争议拆分' },
  merge_disputes: { ko: '쟁점 통합', en: 'Dispute Merge', ja: '争点統合', 'zh-CN': '争议合并' },
  elevate_reliability: { ko: '신뢰도 승격', en: 'Reliability Raised', ja: '信頼度上昇', 'zh-CN': '可信度提升' },
  expand_context: { ko: '맥락 확장', en: 'Context Expanded', ja: '文脈拡張', 'zh-CN': '语境扩展' },
  narrow_scope: { ko: '범위 축소', en: 'Scope Narrowed', ja: '範囲縮小', 'zh-CN': '范围缩小' },
  shift_legality_weight: { ko: '적법성 재평가', en: 'Legality Reweighted', ja: '適法性再評価', 'zh-CN': '合法性重评' },
  shift_responsibility_weight: { ko: '책임 재배분', en: 'Responsibility Reweighted', ja: '責任再配分', 'zh-CN': '责任重分配' },
}

function resultKindLabel(kind: CombinationLabResultKind, locale: LocaleCode): string {
  return RESULT_KIND_LABELS[kind]?.[locale] ?? kind
}

const LAB_COPY: Record<LocaleCode, {
  title: string
  analysis: (points: number) => string
  slot: (index: number) => string
  selectNode: string
  description: string
  reset: string
  evidence: string
  note: string
  derivedNode: string
  cost: (value: number) => string
  hiddenCombo: string
  run: string
  needTwo: string
  noAuthoredResult: string
  nodeNotFound: string
  alreadyDiscovered: string
  recipeLocked: string
  noConfig: string
  failed: string
  success: (label: string) => string
  dialogueTitle: string
}> = {
  ko: {
    title: '조합 실험실',
    analysis: (points) => `분석 ${points}pt`,
    slot: (index) => `slot ${index}`,
    selectNode: '노드 선택',
    description: '기존 비교 보관함을 확장한 실험실입니다. 증거와 노트를 교차 조합할 수 있습니다.',
    reset: '초기화',
    evidence: '증거',
    note: '노트',
    derivedNode: '파생 노드',
    cost: (value) => `비용 ${value}`,
    hiddenCombo: 'hidden combo · 첫 성공 시 포인트 환급 적용',
    run: '조합 실행',
    needTwo: '증거나 노트를 2개 이상 올리면 가능한 조합을 찾습니다.',
    noAuthoredResult: '이 조합에는 아직 authoring된 결과가 없습니다.',
    nodeNotFound: '조합 가능한 노드를 찾지 못했습니다.',
    alreadyDiscovered: '이미 기록된 결론입니다. 다른 조합을 시도해 주세요.',
    recipeLocked: '지금은 이 조합을 실행할 수 없습니다.',
    noConfig: '이 사건에는 조합 실험실 데이터가 없습니다.',
    failed: '조합 실행에 실패했습니다.',
    success: (label) => `조합 성공: ${label}`,
    dialogueTitle: '조합 실험실',
  },
  en: {
    title: 'Combination Lab',
    analysis: (points) => `Analysis ${points}pt`,
    slot: (index) => `slot ${index}`,
    selectNode: 'Select Node',
    description: 'An expanded comparison lab. Cross-combine evidence and notes.',
    reset: 'Reset',
    evidence: 'Evidence',
    note: 'Notes',
    derivedNode: 'Derived Nodes',
    cost: (value) => `Cost ${value}`,
    hiddenCombo: 'hidden combo · first success refunds points',
    run: 'Run Combination',
    needTwo: 'Place at least two evidence or note nodes to find possible combinations.',
    noAuthoredResult: 'This combination has no authored result yet.',
    nodeNotFound: 'No combinable node was found.',
    alreadyDiscovered: 'This conclusion is already recorded. Try another combination.',
    recipeLocked: 'This combination cannot be run yet.',
    noConfig: 'This case has no combination lab data.',
    failed: 'Combination failed.',
    success: (label) => `Combination Success: ${label}`,
    dialogueTitle: 'Combination Lab',
  },
  ja: {
    title: '組み合わせラボ',
    analysis: (points) => `分析 ${points}pt`,
    slot: (index) => `slot ${index}`,
    selectNode: 'ノード選択',
    description: '既存の比較保管庫を拡張したラボです。証拠とノートを交差して組み合わせられます。',
    reset: '初期化',
    evidence: '証拠',
    note: 'ノート',
    derivedNode: '派生ノード',
    cost: (value) => `コスト ${value}`,
    hiddenCombo: 'hidden combo · 初回成功時にポイント還元',
    run: '組み合わせ実行',
    needTwo: '証拠またはノートを2つ以上置くと、可能な組み合わせを探します。',
    noAuthoredResult: 'この組み合わせにはまだ作成済みの結果がありません。',
    nodeNotFound: '組み合わせ可能なノードが見つかりませんでした。',
    alreadyDiscovered: 'すでに記録された結論です。別の組み合わせを試してください。',
    recipeLocked: '今はこの組み合わせを実行できません。',
    noConfig: 'この事件には組み合わせラボのデータがありません。',
    failed: '組み合わせ実行に失敗しました。',
    success: (label) => `組み合わせ成功: ${label}`,
    dialogueTitle: '組み合わせラボ',
  },
  'zh-CN': {
    title: '组合实验室',
    analysis: (points) => `分析 ${points}pt`,
    slot: (index) => `slot ${index}`,
    selectNode: '选择节点',
    description: '这是扩展后的比较保管室。可交叉组合证据与笔记。',
    reset: '重置',
    evidence: '证据',
    note: '笔记',
    derivedNode: '派生节点',
    cost: (value) => `消耗 ${value}`,
    hiddenCombo: 'hidden combo · 首次成功时返还点数',
    run: '执行组合',
    needTwo: '放入至少两个证据或笔记后，会寻找可用组合。',
    noAuthoredResult: '该组合尚无已编写结果。',
    nodeNotFound: '未找到可组合的节点。',
    alreadyDiscovered: '该结论已记录。请尝试其他组合。',
    recipeLocked: '现在无法执行该组合。',
    noConfig: '本案件没有组合实验室数据。',
    failed: '组合执行失败。',
    success: (label) => `组合成功: ${label}`,
    dialogueTitle: '组合实验室',
  }
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

function getCombinationResultType(output: CombinationLabOutput): PcCombinationResultType {
  const kinds = new Set(output.effects.map((effect) => effect.kind))
  if ((output.witnessAngles?.length ?? 0) > 0 || kinds.has('unlock_witness_angle') || /증인/.test(output.judgeHint ?? '')) return 'witness'
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

export default function CombinationLabPanel() {
  const { locale } = useI18n()
  const runtime = useStore((s) => s.combinationLabRuntime)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const caseData = useStore((s) => s.caseData)
  const turnCount = useStore((s) => s.turnCount)
  const [expanded, setExpanded] = useState(false)
  const [slots, setSlots] = useState<[string | null, string | null, string | null]>([null, null, null])

  const config = runtime.config
  const store = useGameStore.getState()
  const copy = LAB_COPY[locale]

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
        showToast(copy.nodeNotFound, 'warn')
        return
      }

      pinNode(nodeId)
      setExpanded(true)
    }

    window.addEventListener(PC_ADD_COMBINATION_NOTE_EVENT, handleAddFromPanel as EventListener)
    return () => window.removeEventListener(PC_ADD_COMBINATION_NOTE_EVENT, handleAddFromPanel as EventListener)
  }, [copy.nodeNotFound, pinNode, resolveEvidenceNodeId, resolveNoteNodeId])

  if (!caseData || !config) return null

  const handleRun = () => {
    if (!matchingRecipe || !matchingOutput) return
    const result = store.runCombinationRecipe(matchingRecipe.id)
    if (!result.ok) {
      playCombinationFailure()
      const reason =
        result.reason === 'output_already_discovered' ? copy.alreadyDiscovered :
        result.reason === 'recipe_locked' ? copy.recipeLocked :
        result.reason === 'no_config' ? copy.noConfig :
        copy.failed
      showToast(reason, 'warn')
      return
    }

    // Core narrative wrapper (Cycle 2) — dossier surface + 동시 unlock된 witness surface.
    // non-gating MVP: mechanical surface는 그대로 진행하고 narrative dialogue를 추가.
    if (result.outputId?.startsWith('dc-')) {
      attemptCoreNarrativeForDossier(result.outputId, `combination_result.${matchingRecipe.id}`, matchingRecipe.id)
    }
    for (const w of result.newlyUnlockedWitnesses ?? []) {
      attemptCoreNarrativeForWitness(w.id, `combination_result.${matchingRecipe.id}`)
    }

    store.addDialogue({
      speaker: 'system',
      text: `🧪 ${copy.dialogueTitle}: ${localizeRuntimeText(cleanOutputLabel(matchingOutput.label), locale)}${cleanOutputSummary(matchingOutput.summary, matchingOutput.label) ? '\n' + localizeRuntimeText(cleanOutputSummary(matchingOutput.summary, matchingOutput.label), locale) : ''}`,
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

    playCombinationSuccess()
    window.dispatchEvent(new CustomEvent('pc:combination-success', {
      detail: {
        inputs: selectedIds
          .slice(0, 2)
          .map((id) => availableNodes.find((node) => node.id === id))
          .filter((node): node is CombinationLabNode => Boolean(node))
          .map((node) => ({
            label: localizeRuntimeText(node.label.replace(/^note:/, ''), locale),
            type: node.type,
          })),
        outputLabel: localizeRuntimeText(cleanOutputLabel(matchingOutput.label), locale),
        outputSummary: localizeRuntimeText(cleanOutputSummary(matchingOutput.summary, matchingOutput.label), locale),
        resultType: getCombinationResultType(matchingOutput),
      },
    }))

    showGuideCutscene(copy.success(localizeRuntimeText(cleanOutputLabel(matchingOutput.label), locale)), '.pc-combination-card')
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
          <span className="text-[11px] font-semibold text-cyan-300">{copy.title}</span>
          <span className="text-[10px] text-cyan-500">{copy.analysis(runtime.analysisPoints)}</span>
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
                  <div className="text-[9px] uppercase tracking-wide opacity-70">{copy.slot(index + 1)}</div>
                  <div className="text-[11px] leading-snug mt-0.5">
                    {node ? `${nodeBadge(node)} ${localizeRuntimeText(node.label, locale)}` : copy.selectNode}
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[10px] text-gray-500">
              {copy.description}
            </div>
            <button onClick={clearAll} type="button" className="text-[10px] text-gray-500 hover:text-gray-300">
              {copy.reset}
            </button>
          </div>

          <NodeBank title={copy.evidence} nodes={evidenceNodes} selected={selectedIds} onSelect={pinNode} locale={locale} />
          <NodeBank title={copy.note} nodes={noteNodes} selected={selectedIds} onSelect={pinNode} locale={locale} />
          {derivedNodes.length > 0 && <NodeBank title={copy.derivedNode} nodes={derivedNodes} selected={selectedIds} onSelect={pinNode} locale={locale} />}

          <div className="border border-cyan-800/30 rounded-lg bg-gray-950/40 px-3 py-2">
            {matchingRecipe && matchingOutput ? (
              <>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs font-semibold text-cyan-200">{localizeRuntimeText(matchingOutput.label, locale)}</div>
                  <div className="text-[10px] text-cyan-500">{copy.cost(matchingRecipe.cost)}</div>
                </div>
                <div className="text-[11px] text-gray-300 leading-relaxed">{localizeRuntimeText(matchingOutput.summary, locale)}</div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {matchingOutput.effects.map((effect, index) => (
                    <span key={`${matchingOutput.id}-effect-${index}`} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-900/30 text-cyan-200 border border-cyan-700/30">
                      {resultKindLabel(effect.kind, locale)}
                    </span>
                  ))}
                </div>
                {matchingRecipe.hidden && (
                  <div className="mt-1 text-[10px] text-amber-300">{copy.hiddenCombo}</div>
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
                    {copy.run}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-[11px] text-gray-500 leading-relaxed">
                {selectedIds.length < 2
                  ? copy.needTwo
                  : copy.noAuthoredResult}
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
  locale,
}: {
  title: string
  nodes: CombinationLabNode[]
  selected: string[]
  onSelect: (nodeId: string) => void
  locale: LocaleCode
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
              {nodeBadge(node)} {localizeRuntimeText(node.label, locale)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

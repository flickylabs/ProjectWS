import React, { useEffect, useMemo, useState } from 'react'
import { loadGeneratedCases } from '../../../data/cases/caseLoader'
import { evaluateTitles, saveUnlockedTitles, loadUnlockedTitles, type Title } from '../../../data/titles'
import { loadDriftState, loadExtendedHistory, loadJudgePerks, loadProgressionState, saveProgressionState, updateLatestAftermath, updateLatestResultSnapshot } from '../../../data/leaderboard'
import { deriveCaseProfile, deriveJudgeProfile, TITLE_LABELS, AXIS_LABELS, TIER_LABELS, LEVEL_LABELS } from '../../../engine/judgeProfileEngine'
import PCTitleEmblem from '../icons/PCTitleEmblem'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { PCFragmentIcon } from '../progression/PCJudgeProgressionShared'
import type { AxisLevelState, JudgeDriftState, JudgeProfile } from '../../../engine/judgeProfileEngine'
import type { PerkId } from '../../../engine/judgePerks'
import { TRAIT_META, FRAGMENT_TABLE, applyRewardsToInventory, canEnhanceTrait, computeCaseRewards, type FragmentReward, type TraitId } from '../../../engine/judgeProgressionEngine'
import { GamePhase } from '../../../types'
import type { CaseData, VerdictInput } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { saveCaseProgress } from '../../phase/CaseMap'
import { resetAftermathCache } from '../../result/Aftermath'
import { resolveScriptedAftermath } from '../../../engine/aftermathResolver'
import { playClick } from '../../../engine/soundEngine'
import { pp과와, pp은는 } from '../../../engine/koreanPostposition'
import CharacterFaceSvg from '../icons/CharacterFaceSvg'
import PCClearanceDetailPopup from './PCClearanceDetailPopup'
import { evaluateClearance } from '../../../engine/clearanceTracker'
import PCFragmentRewardOverlay from './PCFragmentRewardOverlay'

type ResultTab = 'result' | 'verdict_pronounce' | 'epilogue' | 'bonus'

const TABS: { id: ResultTab; label: string }[] = [
  { id: 'result', label: '01 결과 확인' },
  { id: 'verdict_pronounce', label: '02 판결 선고' },
  { id: 'epilogue', label: '03 후일담' },
  { id: 'bonus', label: '04 보너스' },
]

function getRating(total: number): string {
  if (total >= 90) return '전설적인 재판관'
  if (total >= 75) return '훌륭한 재판관'
  if (total >= 60) return '능숙한 재판관'
  if (total >= 40) return '보통의 재판관'
  if (total >= 20) return '미숙한 재판관'
  return '판단 실패'
}

function getRelationLabel(relationshipType: string): string {
  const labels: Record<string, string> = {
    spouse: '부부',
    family: '가족',
    friend: '친구',
    neighbor: '이웃',
    partnership: '동업',
    workplace: '직장',
    boss_employee: '직장',
    tenant: '세입자',
    tenant_landlord: '세입자',
    headline: '헤드라인',
    online: '온라인',
    professional: '의료·교육',
    medical_education: '의료·교육',
    civic: '공공·제도',
    public_system: '공공·제도',
  }

  return labels[relationshipType] ?? relationshipType
}

const RARITY_CLASS: Record<string, string> = {
  common: 'is-common',
  rare: 'is-rare',
  epic: 'is-epic',
  legendary: 'is-legendary',
}

const RARITY_LABEL: Record<string, string> = {
  common: '일반',
  rare: '희귀',
  epic: '영웅',
  legendary: '전설',
}

function aggregateFragmentRewards(rewards: FragmentReward[]): FragmentReward[] {
  const merged = new Map<FragmentReward['fragmentId'], FragmentReward>()

  rewards.forEach((reward) => {
    const existing = merged.get(reward.fragmentId)
    if (!existing) {
      merged.set(reward.fragmentId, { ...reward })
      return
    }

    existing.count += reward.count
  })

  return Array.from(merged.values())
}

function getResultRewardMarkerKey(caseId: string, marker: string) {
  return `solomon-fragment-reward:${caseId}:${marker}`
}

function isLieStateS3Plus(state?: { currentState?: string }) {
  const raw = state?.currentState
  if (!raw) return false
  const rank = Number.parseInt(raw.replace('S', ''), 10)
  return Number.isFinite(rank) && rank >= 3
}

function getFindingLabel(value: 'true' | 'false' | 'pending' | undefined, truth: boolean): string {
  if (value === 'pending') return '판단 보류'
  if (value === 'true') return truth ? '사실로 판단' : '상대 주장 사실로 판단'
  if (value === 'false') return truth ? '사실 아님으로 판단' : '거짓으로 판단'
  return '미판단'
}

type ResultEvidenceStateMap = Record<string, { presented?: boolean; unlocked?: boolean } | undefined>

function formatSolutionLabel(solution: string): string {
  const raw = solution.includes('::') ? solution.slice(solution.indexOf('::') + 2) : solution
  return raw.replace(/\s+/g, ' ').trim()
}

function getResolutionItems(verdictInput: VerdictInput, summary?: { resolution?: string } | null): string[] {
  const selected = verdictInput.selectedSolutions
    .map(formatSolutionLabel)
    .filter(Boolean)

  if (selected.length > 0) return selected

  const fallback = summary?.resolution?.trim()
  if (!fallback) return []

  return fallback
    .split(/\n+|[;；]/)
    .map((item) => item.replace(/^[-•]\s*/, '').trim())
    .filter(Boolean)
}

function getDisputeEvidenceNames(
  caseData: CaseData,
  evidenceStates: ResultEvidenceStateMap,
  requiredEvidence?: string[],
): string[] {
  const evidenceById = new Map(caseData.evidence.map((e) => [e.id, e]))
  const candidates = (requiredEvidence ?? [])
    .map((id) => evidenceById.get(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e))

  const surfaced = candidates.filter((e) => {
    const state = evidenceStates[e.id]
    return state?.presented || state?.unlocked
  })

  const source = surfaced.length > 0 ? surfaced : candidates
  return source
    .map((e) => e.name)
    .filter(Boolean)
    .slice(0, 3)
}

function buildDisputeMomentLine(
  caseData: CaseData,
  evidenceStates: ResultEvidenceStateMap,
  verdictInput: VerdictInput,
  dispute: CaseData['disputes'][number],
): string {
  const finding = verdictInput.factFindings[dispute.id]
  const evidenceNames = getDisputeEvidenceNames(caseData, evidenceStates, dispute.requiredEvidence)
  const evidenceText = evidenceNames.length > 0
    ? `${evidenceNames.join(', ')}${evidenceNames.length >= 3 ? ' 등 관련 자료를' : ' 자료를'}`
    : '제출된 기록과 진술을'
  const statement = dispute.judgmentStatement || dispute.truthDescription || '핵심 사실관계'

  if (!finding || finding === 'pending') {
    return `${dispute.name}: ${evidenceText} 검토했지만, 판결에서 확정할 만큼의 사실관계는 아직 보류했습니다.`
  }

  const correct = (finding === 'true') === dispute.truth
  if (correct) {
    return `${dispute.name}: ${evidenceText} 대조해 ${statement} 쪽으로 사실관계를 정리했습니다.`
  }

  return `${dispute.name}: ${evidenceText} 검토했으나, 기록과 진술의 연결이 충분히 맞물리지 않아 불안정한 판단으로 남았습니다.`
}

function getProfileDescription(titleId: string): string {
  const descriptions: Record<string, string> = {
    cold_judge: '증거와 논리를 중시하며, 엄격한 기준으로 공정한 판결을 내리는 타입입니다.',
    practical_analyst: '논리적 분석을 바탕으로 현실적인 해결책을 찾아내는 타입입니다.',
    balanced_sage: '논리적이면서도 관대한 시선으로 원칙을 지키는 타입입니다.',
    careful_mediator: '신중한 분석과 관용적 태도로 양측의 화해를 이끄는 타입입니다.',
    instinct_judge: '직관적 판단과 엄격한 원칙으로 정의를 추구하는 타입입니다.',
    passion_arbiter: '열정적인 공감과 단호한 판단으로 해결을 이끄는 타입입니다.',
    gentle_guardian: '따뜻한 공감과 관대한 시선으로 원칙을 수호하는 타입입니다.',
    warm_mediator: '공감과 이해를 바탕으로 양측 모두가 만족하는 화해를 추구하는 타입입니다.',
    neutral_observer: '편향 없이 균형 잡힌 시선으로 사건을 바라보는 타입입니다.',
  }
  return descriptions[titleId] ?? descriptions.neutral_observer
}

/** ?? SVG ??? ? ?? ??? ??? SVG */
function getTitleSvgIcon(icon: string): React.ReactNode {
  const S = 44
  const code = Array.from(icon || 'title').reduce((sum, ch) => sum + (ch.codePointAt(0) ?? 0), 0)
  const variant = code % 6
  const commonProps = {
    width: S,
    height: S,
    viewBox: '0 0 44 44',
    fill: 'none',
    className: 'pc-title-svg-icon',
    'aria-hidden': true,
  } as const
  const medallion = (children: React.ReactNode) => (
    <svg {...commonProps}>
      <circle cx="22" cy="22" r="19" fill="rgba(244, 216, 150, 0.08)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="22" cy="22" r="14.5" stroke="currentColor" strokeWidth="0.9" opacity="0.45" />
      {children}
      <path d="M14 35.5l3.2-3.4M30 35.5l-3.2-3.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    </svg>
  )

  switch (variant) {
    case 0:
      return medallion(<>
        <path d="M22 10v19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M12.5 16h19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M13.5 16l-3.2 7h6.4l-3.2-7ZM30.5 16l-3.2 7h6.4l-3.2-7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M17 30h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>)
    case 1:
      return medallion(<>
        <path d="M22 12c-5.6 0-10.3 6.1-10.3 6.1S16.4 24.2 22 24.2s10.3-6.1 10.3-6.1S27.6 12 22 12Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="18.1" r="3.3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M16 29c2.2-1.8 9.8-1.8 12 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </>)
    case 2:
      return medallion(<>
        <path d="M14 25.5l4-3.8 3.3 2 5.8-8.2 3.1 2.6-7.1 10.5-5-3.1-2.2 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.5 13.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.65" />
        <path d="M14.5 17.5h4.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      </>)
    case 3:
      return medallion(<>
        <path d="M22 11l9 4.8v6.3c0 5.7-3.7 10.1-9 11.7-5.3-1.6-9-6-9-11.7v-6.3L22 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 22.2l2.7 2.7 5.4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </>)
    case 4:
      return medallion(<>
        <path d="M22 10c2.6 4.8 6.5 7.4 6.5 12.3A6.5 6.5 0 1 1 15.5 22.3C15.5 17.4 19.4 14.8 22 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M22 20c1.4 2.1 2.9 3.3 2.9 5.2a2.9 2.9 0 1 1-5.8 0c0-1.9 1.5-3.1 2.9-5.2Z" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      </>)
    default:
      return medallion(<>
        <path d="M22 11l7.8 8.1L22 33l-7.8-13.9L22 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M14.2 19.1h15.6M22 11l-3.2 8.1L22 33l3.2-13.9L22 11Z" stroke="currentColor" strokeWidth="1" opacity="0.65" />
      </>)
  }
}

export default function PCResultScreen() {
  const verdictScore = useStore((s) => s.verdictScore)
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const verdictSummary = useStore((s) => s.verdictSummary)
  const initializeCase = useStore((s) => s.initializeCase)
  const agentA = useStore((s) => s.agentA)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const agentB = useStore((s) => s.agentB)
  const turnCount = useStore((s) => s.turnCount)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const skillUseCounts = useStore((s) => s.skillUseCounts)
  const processMetrics = useStore((s) => s.processMetrics)
  const calledWitnesses = useStore((s) => s.calledWitnesses)
  const triggeredCombinations = useStore((s) => s.triggeredCombinations)
  const combinationLabRuntime = useStore((s) => s.combinationLabRuntime)

  const [tab, setTab] = useState<ResultTab>('result')
  const [titles, setTitles] = useState<Title[]>([])
  const [newTitles, setNewTitles] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const [summaryCopied, setSummaryCopied] = useState(false)
  const [clearanceDetailOpen, setClearanceDetailOpen] = useState(false)
  const [rewardApplied, setRewardApplied] = useState(true)
  const [rewardOverlayDismissed, setRewardOverlayDismissed] = useState(true)

  useEffect(() => {
    if (verdictScore && caseData) {
      saveCaseProgress(caseData.caseId, verdictScore.total)
    }
  }, [caseData, verdictScore])

  // Title evaluation
  useEffect(() => {
    if (!verdictScore || !caseData) return

    const collapsedA = Object.values(agentA.lieStateMap).filter((e) => e.currentState === 'S5').length
    const collapsedB = Object.values(agentB.lieStateMap).filter((e) => e.currentState === 'S5').length
    const totalLies = Object.keys(agentA.lieStateMap).length + Object.keys(agentB.lieStateMap).length

    const meta = {
      turnsUsed: turnCount,
      evidencePresented: Object.values(evidenceStates).filter((e) => e.presented).length,
      trustActionsUsed: processMetrics.trustActionsUsed,
      skillsUsed: Object.values(skillUseCounts).reduce((a, b) => a + b, 0),
      collapsedDisputes: collapsedA + collapsedB,
      totalDisputes: totalLies,
    }

    const earned = evaluateTitles(verdictScore, verdictInput, meta)
    setTitles(earned)

    const existing = loadUnlockedTitles()
    const newIds = earned.filter((t) => !existing.includes(t.id)).map((t) => t.id)
    setNewTitles(new Set(newIds))

    if (earned.length > 0) {
      saveUnlockedTitles(earned.map((t) => t.id))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 결과 화면 진입 시 LLM 후일담을 즉시 백그라운드 생성 (판결 결과 기반)
  useEffect(() => {
    if (_aftermathCache?.caseId === caseData?.caseId) return
    if (!caseData || !verdictScore) return

    void (async () => {
      try {
        const { chatCompletion } = await import('../../../engine/llmClient')
        const { AFTERMATH_MAX_TOKENS, buildAftermathPrompt, postProcessAftermath } = await import('../../../engine/aftermathLLMGenerator')

        const keyDiscoveries: string[] = []
        if (processMetrics.liesCollapsed > 0) keyDiscoveries.push(`거짓말 ${processMetrics.liesCollapsed}건 자백 유도`)
        if (processMetrics.deepTruthsUnlocked > 0) keyDiscoveries.push(`숨겨진 진실 ${processMetrics.deepTruthsUnlocked}건 발견`)

        const disputeJudgments: Record<string, string> = {}
        for (const d of caseData.disputes) {
          const fact = verdictInput.factFindings[d.id]
          disputeJudgments[d.id] = fact === 'true' ? '사실로 판단' : fact === 'false' ? '거짓으로 판단' : '보류'
        }

        const prompt = buildAftermathPrompt({
          caseData, verdictInput,
          verdictDetails: {
            disputeJudgments,
            issueWeights: Object.fromEntries(Object.entries(verdictInput.responsibility).map(([id, r]) => [id, r.b])),
            selectedResolution: verdictInput.selectedSolutions.join(', ') || '없음',
          },
          scores: { insight: verdictScore.insight, authority: verdictScore.authority, wisdom: verdictScore.wisdom },
          title: '재판관',
          keyDiscoveries,
        })

        console.log('[후일담] 결과 화면 진입 — LLM 즉시 호출 시작')
        const response = await chatCompletion(
          [{ role: 'user', content: prompt }],
          { temperature: 0.9, maxTokens: AFTERMATH_MAX_TOKENS, model: 'gpt-4o-mini', endpoint: 'aftermath' },
        )
        if (response) {
          const processed = postProcessAftermath(response, { a: caseData.duo.partyA.name, b: caseData.duo.partyB.name })
          if (processed) {
            const result = withVerdictContext(caseData, verdictInput, processed)
            _aftermathCache = { caseId: caseData.caseId, text: result }
            updateLatestAftermath(result, caseData.caseId)
            console.log('[후일담] LLM 생성 완료, 길이:', processed.length)
          }
        }
      } catch (err) {
        console.warn('[후일담] 백그라운드 LLM 생성 실패:', err)
        const scripted = resolveScriptedAftermath(caseData, verdictInput)
        const fallbackText = scripted
          ? withVerdictContext(caseData, verdictInput, scripted.text)
          : buildFallback(caseData, verdictScore.total, verdictInput)
        _aftermathCache = { caseId: caseData.caseId, text: fallbackText }
        updateLatestAftermath(fallbackText, caseData.caseId)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const rewardBundle = useMemo(() => {
    if (!verdictScore || !caseData) {
      return {
        enhanceableTraits: [] as TraitId[],
        marker: null as string | null,
        rewards: [] as FragmentReward[],
      }
    }

    const caseAxes = deriveCaseProfile(
      verdictInput,
      processMetrics,
      caseData.disputes.map((item) => ({
        id: item.id,
        ambiguity: item.ambiguity,
        truth: item.truth ?? true,
      })),
      caseData.caseId,
      caseData.solutions,
    )
    const history = loadExtendedHistory()
    const currentEntry = history.find((entry) => entry.caseId === caseData.caseId)
    const autoCombinationTarget = caseData.evidenceCombinations.length
    const manualCombinationTarget = combinationLabRuntime.config?.recipes.length ?? 0
    const witnessTarget = caseData.duo.socialGraph.length
    const rewards = aggregateFragmentRewards(computeCaseRewards(caseAxes, {
      bothSidesS3Plus:
        Object.values(agentA.lieStateMap).some((entry) => isLieStateS3Plus(entry))
        && Object.values(agentB.lieStateMap).some((entry) => isLieStateS3Plus(entry)),
      perfectClearance: (verdictScore.clearanceResult ?? evaluateClearance(useGameStore.getState())).percent >= 100,
      isFirstPlay: history.filter((entry) => entry.caseId === caseData.caseId).length === 1,
      allCombinationsFound:
        (autoCombinationTarget > 0 || manualCombinationTarget > 0)
        && new Set(triggeredCombinations).size >= autoCombinationTarget
        && new Set(combinationLabRuntime.appliedRecipeIds).size >= manualCombinationTarget,
      allWitnessesCalled: witnessTarget > 0 && new Set(calledWitnesses).size >= witnessTarget,
    }))
    const progressionState = loadProgressionState()
    const projectedInventory = rewardApplied
      ? progressionState.inventory
      : applyRewardsToInventory(progressionState.inventory, rewards)

    return {
      enhanceableTraits: TRAIT_META.map(({ id }) => id).filter((traitId) => canEnhanceTrait(traitId, progressionState.traits, projectedInventory)),
      marker: getResultRewardMarkerKey(caseData.caseId, currentEntry?.date ?? `${verdictScore.total}-${turnCount}`),
      rewards,
    }
  }, [
    agentA.lieStateMap,
    agentB.lieStateMap,
    calledWitnesses,
    caseData,
    combinationLabRuntime.appliedRecipeIds,
    combinationLabRuntime.config,
    processMetrics,
    rewardApplied,
    triggeredCombinations,
    turnCount,
    verdictInput,
    verdictScore,
  ])

  useEffect(() => {
    if (!rewardBundle.marker) return
    const claimed = localStorage.getItem(rewardBundle.marker) === '1'
    setRewardApplied(claimed)
    setRewardOverlayDismissed(claimed)
  }, [rewardBundle.marker])

  useEffect(() => {
    if (!rewardBundle.marker || rewardBundle.rewards.length === 0 || rewardApplied) return

    const progressionState = loadProgressionState()
    saveProgressionState({
      ...progressionState,
      inventory: applyRewardsToInventory(progressionState.inventory, rewardBundle.rewards),
      lastUpdated: new Date().toISOString(),
    })
    localStorage.setItem(rewardBundle.marker, '1')
    setRewardApplied(true)
  }, [rewardApplied, rewardBundle.marker, rewardBundle.rewards])

  useEffect(() => {
    if (!caseData) return
    updateLatestResultSnapshot({
      titles: titles.map((title) => ({
        id: title.id,
        name: title.name,
        rarity: title.rarity,
        description: title.description,
      })),
      rewards: rewardBundle.rewards.map((reward) => ({
        fragmentId: reward.fragmentId,
        count: reward.count,
        label: FRAGMENT_TABLE.find((fragment) => fragment.id === reward.fragmentId)?.name,
      })),
    }, caseData.caseId)
  }, [caseData, rewardBundle.rewards, titles])

  const { profile: judgeProfile } = useProfileData()

  if (!verdictScore || !caseData) {
    return null
  }

  const judgeTierInfo = TIER_LABELS[judgeProfile.tier]

  const stars = verdictScore.total >= 75 ? 3 : verdictScore.total >= 55 ? 2 : verdictScore.total >= 35 ? 1 : 0
  const relationLabel = getRelationLabel(caseData.meta?.relationshipType ?? caseData.duo.relationshipType)
  const headline = caseData.disputes[0]?.name ?? caseData.context.description
  const clearanceResult = verdictScore.clearanceResult ?? evaluateClearance(useGameStore.getState())
  const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
  const allCases = loadGeneratedCases()
  const sessionCases = allCases
    .filter((item) => item.duo.relationshipType === caseData.duo.relationshipType)
    .sort((a, b) => (diffOrder[a.meta?.difficulty ?? 'medium'] ?? 1) - (diffOrder[b.meta?.difficulty ?? 'medium'] ?? 1))
  const currentIdx = sessionCases.findIndex((item) => item.caseId === caseData.caseId)
  const nextCase = currentIdx >= 0 ? sessionCases[currentIdx + 1] : null
  const rewardOverlayOpen = false // 보너스 탭으로 이동 — 팝업 비활성
  const tabIndex = TABS.findIndex((item) => item.id === tab)
  const prevTab = tabIndex > 0 ? TABS[tabIndex - 1] : null
  const nextTab = tabIndex < TABS.length - 1 ? TABS[tabIndex + 1] : null
  const visibleDisputes = caseData.disputes.filter((d) => {
    const v = disputeVisibility[d.id]
    return !v || v.visibility !== 'hidden'
  })

  const handleExit = () => {
    resetAftermathCache()
    _aftermathCache = null
    const state = useGameStore.getState()
    state.clearSavedGame?.()
    state.clearDialogue()
    useGameStore.setState({ caseData: null })
    state.setPhase(GamePhase.Phase0_CaseIntro)
  }

  const handleNextCase = () => {
    if (!nextCase) {
      handleExit()
      return
    }

    resetAftermathCache()
    _aftermathCache = null
    initializeCase(nextCase)
  }

  const handleRetry = () => {
    _aftermathCache = null
    useGameStore.getState().resetVerdict()
    useGameStore.getState().setPhase(GamePhase.Phase7_Verdict)
  }

  const handleOpenClearanceDetail = () => {
    playClick()
    setClearanceDetailOpen(true)
  }

  const handleCloseClearanceDetail = () => {
    playClick()
    setClearanceDetailOpen(false)
  }

  const handleCloseRewardOverlay = () => {
    playClick()
    setRewardOverlayDismissed(true)
  }

  const handleCopyShare = async () => {
    const text = `${headline} - ${verdictScore.total}점 (${getRating(verdictScore.total)})`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleCopySummary = async () => {
    if (!verdictSummary) return
    try {
      await navigator.clipboard.writeText(verdictSummary.fullText)
      setSummaryCopied(true)
      setTimeout(() => setSummaryCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = verdictSummary.fullText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setSummaryCopied(true)
      setTimeout(() => setSummaryCopied(false), 2000)
    }
  }

  return (
    <div className="pc-result-screen">
      <style>{`
        body.pc-mode .pc-result-screen .pc-result-footer {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: auto;
          padding: 16px 0 5px;
          width: 100%;
        }
        body.pc-mode .pc-result-screen .pc-result-shell {
          height: calc(100vh - 56px) !important;
          min-height: 0 !important;
          max-height: calc(100vh - 56px) !important;
        }
        body.pc-mode .pc-result-screen .pc-result-main {
          height: 100% !important;
          min-height: 0 !important;
          overflow: hidden !important;
        }
        body.pc-mode .pc-result-screen .pc-result-hero {
          position: relative !important;
          overflow: hidden !important;
          padding-bottom: 96px !important;
        }
        body.pc-mode .pc-result-screen .pc-result-hero__actions {
          position: absolute !important;
          left: 24px !important;
          right: 24px !important;
          bottom: 29px !important;
          width: auto !important;
          margin-top: 0 !important;
        }
        body.pc-mode .pc-result-screen .pc-result-tabs,
        body.pc-mode .pc-result-screen .pc-result-footer {
          flex: 0 0 auto !important;
        }
        body.pc-mode .pc-result-screen .pc-result-panel {
          flex: 1 1 auto !important;
          height: auto !important;
          min-height: 0 !important;
          max-height: calc(100vh - 226px) !important;
          padding-bottom: 24px !important;
        }
      `}</style>
      <div className="pc-result-shell">
        <aside className="pc-result-hero">
          <div className="pc-result-hero__eyebrow">RESULT DOSSIER</div>
          <h1>{headline}</h1>

          <div className="pc-result-score">
            <span className="pc-result-score__value">{verdictScore.total}</span>
            <span className="pc-result-score__unit">점</span>
          </div>

          <div className="pc-result-hero__rating">{getRating(verdictScore.total)}</div>
          <div className="pc-result-hero__stars" aria-label={`별 ${stars}개`}>
            {Array.from({ length: 3 }, (_, index) => (
              <span className={index < stars ? 'is-filled' : ''} key={index}>★</span>
            ))}
          </div>

          <div className="pc-result-hero__meta">
            <div className="pc-result-hero__meta-card">
              <span>관계</span>
              <strong>{relationLabel}</strong>
            </div>
            <div className="pc-result-hero__meta-card">
              <span>쟁점</span>
              <strong>{visibleDisputes.length}개</strong>
            </div>
            <div className="pc-result-hero__meta-card">
              <span>증거</span>
              <strong>{caseData.evidence.length}종</strong>
            </div>
          </div>

          <div className="pc-result-hero__steps">
            {TABS.map((item) => (
              <button
                className={`pc-result-step-link${tab === item.id ? ' is-active' : ''}`}
                key={item.id}
                onClick={() => setTab(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pc-result-hero__actions" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              flex: 1, minWidth: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 48, padding: '0 12px',
              fontSize: 14, fontWeight: 800, color: '#a8a8b4', textAlign: 'center',
            }}>
              {judgeTierInfo.name} ({judgeProfile.casesCompleted}건){judgeProfile.isStabilized ? ' 안정' : ''}
            </div>
            <button className="pc-result-hero__button is-ghost" onClick={handleRetry} type="button">
              판결 다시 하기
            </button>
          </div>
        </aside>

        <section className="pc-result-main">
          <div className="pc-result-tabs" role="tablist">
            {TABS.map((item) => (
              <button
                aria-selected={tab === item.id}
                className={`pc-result-tab${tab === item.id ? ' is-active' : ''}`}
                key={item.id}
                onClick={() => setTab(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pc-result-panel">
            {/* ━━━ 결과 확인 탭 ━━━ */}
            {tab === 'result' ? (
              <div className="pc-result-combined">
                {/* 점수 도넛 — 2배 크기, /100 제거, 라벨 상단 */}
                <div className="pc-result-donuts" style={{ gap: 32 }}>
                  {[
                    { label: '통찰', value: verdictScore.insight, color: 'var(--pc-blue)' },
                    { label: '권위', value: verdictScore.authority, color: 'var(--pc-gold)' },
                    { label: '지혜', value: verdictScore.wisdom, color: 'var(--pc-green)' },
                    { label: '달성율', value: clearanceResult.percent, color: '#d4a24e', isClearance: true },
                  ].map((axis) => {
                    const pct = Math.min(axis.value, 100)
                    const dash = (pct / 100) * 251
                    return (
                      <div className="pc-result-donut-single" key={axis.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                        <span className="pc-result-donut-label" style={{ color: axis.color, fontSize: 14, fontWeight: 800 }}>{axis.label}</span>
                        <svg viewBox="0 0 100 100" width="180" height="180">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke={axis.color} strokeWidth="6"
                            strokeDasharray={`${dash} 251`} strokeDashoffset="0"
                            transform="rotate(-90 50 50)" strokeLinecap="round"
                            className="pc-result-donut-ring"
                          />
                          <text x="50" y="52" textAnchor="middle" fill="#f2efe8" fontSize="28" fontWeight="900">{axis.value}</text>
                          {'isClearance' in axis && axis.isClearance ? (
                            <text x="50" y="68" textAnchor="middle" fill="#8b8b9a" fontSize="9" fontWeight="600"
                              style={{ cursor: 'pointer' }} onClick={handleOpenClearanceDetail}>
                              상세보기
                            </text>
                          ) : null}
                        </svg>
                      </div>
                    )
                  })}
                </div>

                {/* 쟁점별 정답 공개 */}
                <div className="pc-result-truth" style={{ marginTop: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#e0ddd6', marginBottom: 8 }}>쟁점별 판단 결과</h3>
                  {visibleDisputes.map((d) => {
                    const finding = verdictInput.factFindings[d.id]
                    const correct = finding === 'pending'
                      ? null
                      : (finding === 'true') === d.truth
                    // 유저가 실제로 선택한 텍스트
                    const selectedText = ((window as any).__factSelectedTexts ?? {})[d.id] as string | undefined
                    return (
                      <div className={`pc-result-truth__card ${correct === true ? 'is-correct' : correct === false ? 'is-wrong' : ''}`} key={d.id}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px' }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <strong style={{ fontSize: 14, display: 'block', marginBottom: 3, color: '#e0ddd6' }}>{d.name}</strong>
                          <p style={{ fontSize: 13, color: '#b0aeb4', lineHeight: 1.5, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as any}>
                            내 판단: {selectedText ?? getFindingLabel(finding, d.truth)}
                          </p>
                        </div>
                        <div style={{
                          flexShrink: 0, width: 56, height: 40, borderRadius: 10,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16, fontWeight: 900,
                          background: correct === true ? 'rgba(92,201,122,0.12)' : correct === false ? 'rgba(224,96,96,0.12)' : 'rgba(160,165,180,0.08)',
                          color: correct === true ? '#5cc97a' : correct === false ? '#e06060' : '#8c8fa0',
                          border: `2px solid ${correct === true ? 'rgba(92,201,122,0.3)' : correct === false ? 'rgba(224,96,96,0.3)' : 'rgba(160,165,180,0.15)'}`,
                        }}>
                          {correct === true ? 'O' : correct === false ? 'X' : '\u2014'}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <span aria-hidden="true" style={{ display: 'none' }} />
              </div>
            ) : null}

            {/* ━━━ 판결 선고 탭 ━━━ */}
            {tab === 'verdict_pronounce' ? (() => {
              const avgA = verdictSummary ? verdictSummary.responsibility.percentA : 50
              const disputeMomentLines = visibleDisputes.map((d) =>
                buildDisputeMomentLine(caseData, evidenceStates, verdictInput, d),
              )
              const resolutionItems = getResolutionItems(verdictInput, verdictSummary)
              return (
              <div className="pc-result-text">
                {/* 상단 선고문 */}
                <p style={{ fontSize: 17, color: '#e8e5dc', lineHeight: 1.8, textAlign: 'center', marginBottom: 28 }}>
                  본 사건은 <strong>{caseData.duo.partyA.name}</strong>{pp과와(caseData.duo.partyA.name)} <strong>{caseData.duo.partyB.name}</strong>의 {relationLabel} 간 분쟁으로, 총 <strong style={{ color: 'var(--pc-gold-light)' }}>{turnCount}</strong>회의 심리를 거쳐 다음과 같은 판결에 이르렀습니다.
                </p>

                {verdictSummary ? (
                  <>
                    {/* ── 상단: 좌측 저울 + 우측 2영역 ── */}
                    <div className="pc-result-verdict-pronounce-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, marginBottom: 28 }}>
                      {/* 좌측 — 저울 + 책임 배분 설명 (top-aligned) */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 8, padding: '1px 0 0' }}>
                        <svg width="240" height="180" viewBox="0 0 420 220" style={{ display: 'block' }}>
                          <polygon points="210,160 192,188 228,188" fill="#8b6f3d" opacity="0.7" />
                          <rect x="175" y="188" width="70" height="5" rx="2" fill="#8b6f3d" opacity="0.35" />
                          {(() => { const t = ((50 - avgA) / 50) * 12; return (
                          <g transform={`rotate(${t}, 210, 156)`}>
                            <rect x="50" y="154" width="320" height="6" rx="3" fill="#8b6f3d" />
                            <circle cx="100" cy="118" r="32" fill="rgba(74, 111, 165, 0.12)" stroke="#4a6fa5" strokeWidth="1.8" />
                            <clipPath id="clip-result-a"><circle cx="100" cy="118" r="30" /></clipPath>
                            <foreignObject x="70" y="88" width="60" height="60" clipPath="url(#clip-result-a)">
                              <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden' }}>
                                <PCCharacterPortrait alt={caseData.duo.partyA.name} caseId={caseData.caseId} emotion="defensive" fallbackSymbolId="i-person" party="a" size={60} />
                              </div>
                            </foreignObject>
                            <text x="100" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill="#4a6fa5">{caseData.duo.partyA.name}</text>
                            <circle cx="320" cy="118" r="32" fill="rgba(168, 79, 79, 0.12)" stroke="#a84f4f" strokeWidth="1.8" />
                            <clipPath id="clip-result-b"><circle cx="320" cy="118" r="30" /></clipPath>
                            <foreignObject x="290" y="88" width="60" height="60" clipPath="url(#clip-result-b)">
                              <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden' }}>
                                <PCCharacterPortrait alt={caseData.duo.partyB.name} caseId={caseData.caseId} emotion="defensive" fallbackSymbolId="i-person" party="b" size={60} />
                              </div>
                            </foreignObject>
                            <text x="320" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill="#a84f4f">{caseData.duo.partyB.name}</text>
                          </g>
                          ) })()}
                        </svg>
                        <div style={{ display: 'flex', gap: 24, fontSize: 20, fontWeight: 900 }}>
                          <span style={{ color: '#4a6fa5' }}>{verdictSummary.responsibility.percentA}%</span>
                          <span style={{ color: '#a84f4f' }}>{verdictSummary.responsibility.percentB}%</span>
                        </div>
                      </div>

                      {/* 우측 — 2영역 */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* 결정적 순간 */}
                        <div className="pc-result-summary__section pc-result-summary__section--compact" style={{ margin: 0 }}>
                          <h3>결정적 순간</h3>
                          {disputeMomentLines.length > 0 ? (
                            <ul className="pc-result-key-moments__list">
                              {disputeMomentLines.map((line, idx) => (
                                <li key={idx} className="pc-result-key-moments__item">
                                  {line}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      </div>
                      {/* 해결 방향 — 저울 아래까지 가로 확장 */}
                      <div className="pc-result-summary__section pc-result-summary__section--compact pc-result-resolution--wide" style={{ margin: 0, gridColumn: '1 / -1' }}>
                        <h3>해결 방향</h3>
                        <div className="pc-result-resolution__list">
                          {resolutionItems.map((item: string, i: number) => (
                            <div key={i} className="pc-result-resolution__item">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* ── 하단: 재판관 성향 — 좌측 타이틀/설명, 우측 게이지 ── */}
                    <div style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <h3 style={{ marginTop: 0, marginBottom: 12 }}>재판관 성향</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 0.9fr) 1.1fr', gap: 16 }}>
                        {/* 좌측: 타이틀 + 설명 + 태그 */}
                        <ProfileInfoSection />
                        {/* 우측: 게이지 */}
                        <ProfileGaugeSection />
                      </div>
                    </div>
                  </>
                ) : null}
                <span aria-hidden="true" style={{ display: 'none' }} />
              </div>
              )
            })() : null}

            {/* ━━━ 후일담 탭 ━━━ */}
            {tab === 'epilogue' ? (
              <div className="pc-result-text">
                {/* 후일담 — header (fixed top) */}
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--pc-gold-light)', textTransform: 'uppercase' }}>Epilogue</div>
                </div>
                {/* Epilogue 본문 — flex:1로 남은 공간 채움 (내용 짧으면 줄어들고 길면 스크롤) */}
                <div style={{
                  border: '1px solid rgba(212,162,78,0.15)', borderRadius: 16,
                  padding: '16px 20px', background: 'rgba(212,162,78,0.02)',
                  marginBottom: 16,
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                }}>
                  <AftermathInline />
                </div>

                {/* 획득 칭호 — 버튼 바로 위 고정 */}
                {titles.length > 0 && (
                  <div style={{ marginBottom: 16, flexShrink: 0 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#e0ddd6', marginBottom: 8 }}>획득한 칭호</h3>
                    <div className="pc-result-titles-scroll">
                      {titles.map((t) => (
                        <button
                          className={`pc-result-title-card ${RARITY_CLASS[t.rarity] ?? ''} ${newTitles.has(t.id) ? 'is-new' : ''}`}
                          key={t.id}
                          onClick={() => playClick()}
                          type="button"
                        >
                          <span className="pc-result-title-card__tooltip">{t.description}</span>
                          <span className="pc-result-title-card__icon">{getTitleSvgIcon(t.icon)}</span>
                          <span className="pc-result-title-card__name">{t.name}</span>
                          <span className="pc-result-title-card__rarity">{RARITY_LABEL[t.rarity]}</span>
                          {newTitles.has(t.id) ? <em className="pc-result-title-card__new">NEW</em> : null}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <span aria-hidden="true" style={{ display: 'none' }} />
              </div>
            ) : null}

            {/* ━━━ 보너스 탭 ━━━ */}
            {tab === 'bonus' ? (
              <div className="pc-result-text">
                <div style={{ padding: '6px 0' }}>
                  <FragmentGrid rewards={rewardBundle.rewards} />
                </div>

                {rewardBundle.enhanceableTraits.length > 0 && (
                  <div style={{
                    padding: '8px 16px', borderRadius: 8,
                    background: 'rgba(92, 201, 122, 0.06)', border: '1px solid rgba(92, 201, 122, 0.15)',
                    textAlign: 'center', marginTop: 6, marginBottom: 6,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#5cc97a' }}>
                      성향 강화 가능! — 내 정보에서 확인하세요
                    </span>
                  </div>
                )}
                <span aria-hidden="true" style={{ display: 'none' }} />
              </div>
            ) : null}
          </div>
          <div className="pc-result-footer">
            <button
              className="pc-verdict-footer__button"
              disabled={!prevTab}
              onClick={() => prevTab && setTab(prevTab.id)}
              type="button"
            >
              &lt; 이전
            </button>
            {nextTab ? (
              <button className="pc-verdict-footer__button is-primary" onClick={() => setTab(nextTab.id)} type="button">
                다음 &gt;
              </button>
            ) : (
              <button className="pc-verdict-footer__button is-primary" onClick={handleExit} type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }}><path d="M3 12l9-8 9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                홈으로
              </button>
            )}
          </div>
        </section>
      </div>

      <PCFragmentRewardOverlay
        enhanceableTraits={rewardBundle.enhanceableTraits}
        onClose={handleCloseRewardOverlay}
        open={rewardOverlayOpen}
        rewards={rewardBundle.rewards}
      />

      {clearanceDetailOpen ? (
        <PCClearanceDetailPopup
          onClose={handleCloseClearanceDetail}
          result={clearanceResult}
        />
      ) : null}
    </div>
  )
}

/* ─── Fragment 3×3 Grid ─── */

const FRAG_SVG: Record<string, React.ReactNode> = {
  // 탐구 — 음: 추론(돋보기)
  reasoning_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2.5"/><line x1="20" y1="20" x2="27" y2="27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  // 탐구 — 중립: 탐구(책)
  inquiry_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M6 6h8c2 0 2 2 2 2v18s0-2-2-2H6V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M26 6h-8c-2 0-2 2-2 2v18s0-2 2-2h8V6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  // 탐구 — 양: 공감(전구)
  empathy_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M16 5a8 8 0 00-5 14.3V23h10v-3.7A8 8 0 0016 5z" stroke="currentColor" strokeWidth="2"/><line x1="13" y1="25" x2="19" y2="25" stroke="currentColor" strokeWidth="1.5"/><line x1="14" y1="27" x2="18" y2="27" stroke="currentColor" strokeWidth="1.5"/></svg>,
  // 심판 — 음: 준엄(검)
  severity_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><line x1="16" y1="4" x2="16" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="10" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M13 22h6l-3 6-3-6z" fill="currentColor"/></svg>,
  // 심판 — 중립: 심리(저울)
  deliberation_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><line x1="16" y1="6" x2="16" y2="26" stroke="currentColor" strokeWidth="2"/><line x1="8" y1="11" x2="24" y2="11" stroke="currentColor" strokeWidth="2"/><path d="M8 11l-2 7h6l-2-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M24 11l-2 7h6l-2-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="12" y1="26" x2="20" y2="26" stroke="currentColor" strokeWidth="2"/></svg>,
  // 심판 — 양: 이해(비둘기)
  leniency_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M10 20c0-4 3-7 6-7 2 0 4 1 5 3l4-2c0 0 1 4-2 6l-4 1c-1 2-3 4-6 4-4 0-3-5-3-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M14 16l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  // 해결 — 음: 법리(두루마리)
  jurisprudence_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><rect x="8" y="6" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2"/><line x1="12" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="20" x2="17" y2="20" stroke="currentColor" strokeWidth="1.5"/></svg>,
  // 해결 — 중립: 균형(기둥)
  balance_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><line x1="16" y1="4" x2="16" y2="24" stroke="currentColor" strokeWidth="2.5"/><rect x="8" y="24" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="4" x2="22" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  // 해결 — 양: 봉합(악수)
  reconciliation_fragment: <svg viewBox="0 0 32 32" fill="none" width="28" height="28"><path d="M6 16c2-2 4-3 6-3 1 0 2.5.5 4 2 1.5-1.5 3-2 4-2 2 0 4 1 6 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 19l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 19l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
}

const GRID_ROWS: { negLabel: string; posLabel: string; fragments: [string, string, string] }[] = [
  { negLabel: '논리', posLabel: '직관', fragments: ['reasoning_fragment', 'inquiry_fragment', 'empathy_fragment'] },
  { negLabel: '엄격', posLabel: '관용', fragments: ['severity_fragment', 'deliberation_fragment', 'leniency_fragment'] },
  { negLabel: '원칙', posLabel: '화해', fragments: ['jurisprudence_fragment', 'balance_fragment', 'reconciliation_fragment'] },
]

const FRAG_COLORS: Record<string, string> = {
  reasoning_fragment: '#5b8def',
  inquiry_fragment: '#8b8b9a',
  empathy_fragment: '#e8c172',
  severity_fragment: '#e06060',
  deliberation_fragment: '#8b8b9a',
  leniency_fragment: '#5cc97a',
  jurisprudence_fragment: '#d4a24e',
  balance_fragment: '#8b8b9a',
  reconciliation_fragment: '#a78bfa',
}

function FragmentGrid({ rewards }: { rewards: FragmentReward[] }) {
  const rewardMap = new Map<string, number>()
  for (const r of rewards) rewardMap.set(r.fragmentId, (rewardMap.get(r.fragmentId) ?? 0) + r.count)

  return (
    <div style={{ marginBottom: 8 }}>
      {GRID_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 8 }}>
          {/* 왼쪽 라벨 */}
          <span style={{ width: 48, textAlign: 'right', fontSize: 13, fontWeight: 800, color: '#8b8d99', flexShrink: 0 }}>
            {'<'}{row.negLabel}
          </span>

          {/* 3 카드 — 큰 카드 + 넓은 간격 */}
          <div style={{ display: 'flex', gap: 28, flex: 1, justifyContent: 'center', padding: '0 16px' }}>
            {row.fragments.map(fragId => {
              const def = FRAGMENT_TABLE.find(f => f.id === fragId)
              const count = rewardMap.get(fragId) ?? 0
              const active = count > 0
              const color = FRAG_COLORS[fragId] ?? '#8b8b9a'

              return (
                <div key={fragId} style={{
                  position: 'relative',
                  width: 150, height: 150,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '16px 10px 14px', borderRadius: 16,
                  border: `2px solid ${active ? color + '66' : 'rgba(255,255,255,0.06)'}`,
                  background: active ? color + '14' : 'rgba(255,255,255,0.02)',
                  opacity: active ? 1 : 0.35,
                  transition: 'all 0.3s ease',
                }}>
                  {/* 수량 배지 — 우측 상단 오버레이 */}
                  {active ? (
                    <span style={{
                      position: 'absolute', top: -10, right: -10,
                      minWidth: 36, height: 36, padding: '0 10px',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      borderRadius: 999,
                      background: color, color: '#1a1610',
                      fontSize: 15, fontWeight: 900, letterSpacing: '-0.02em',
                      boxShadow: '0 3px 10px rgba(0,0,0,0.45)',
                      border: '2px solid rgba(18,19,24,0.72)',
                    }}>x{count}</span>
                  ) : null}
                  {/* 아이콘 — 크게 */}
                  <PCFragmentIcon fragmentId={fragId as any} size={92} />
                  {/* 이름 라벨 — 카드 하단 오버레이 */}
                  <span style={{
                    position: 'absolute', bottom: 10, left: 10, right: 10,
                    fontSize: 13, fontWeight: 800, textAlign: 'center',
                    color: active ? '#ede3cc' : '#5a5d6e',
                    textShadow: '0 2px 6px rgba(0,0,0,0.6)',
                    letterSpacing: '0.02em',
                  }}>
                    {def?.name?.replace('의 조각', '') ?? fragId}
                  </span>
                </div>
              )
            })}
          </div>

          {/* 오른쪽 라벨 */}
          <span style={{ width: 48, textAlign: 'left', fontSize: 13, fontWeight: 800, color: '#8b8d99', flexShrink: 0 }}>
            {row.posLabel}{'>'}
          </span>
        </div>
      ))}

      <p style={{ textAlign: 'center', fontSize: 11, color: '#4a4d5e', marginTop: 8 }}>
        *각 조각은 재판관 성향 성장 재료로 사용할 수 있습니다.
      </p>
    </div>
  )
}

/* ─── Aftermath inline (uses same LLM/scripted logic) ─── */

// 후일담 캐시 — 탭 전환으로 리마운트되어도 재호출하지 않음
let _aftermathCache: { caseId: string; text: string } | null = null

function getCachedAftermath(caseId?: string): string | null {
  const cached = _aftermathCache
  return cached && cached.caseId === caseId ? cached.text : null
}

function AftermathInline() {
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const verdictScore = useStore((s) => s.verdictScore)
  const processMetrics = useStore((s) => s.processMetrics)
  const discovery = useStore((s) => s.discovery)
  const [aftermath, setAftermath] = useState<string | null>(getCachedAftermath(caseData?.caseId))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 캐시가 있으면 재호출하지 않음
    const cached = getCachedAftermath(caseData?.caseId)
    if (cached) { setAftermath(cached); return }
    // 사전 생성된 결과가 있으면 사용
    const pregenerated = (window as any).__aftermathPregenerated as string | undefined
    if (pregenerated) {
      _aftermathCache = { caseId: caseData?.caseId ?? 'unknown', text: pregenerated }
      setAftermath(pregenerated)
      if (caseData?.caseId) updateLatestAftermath(pregenerated, caseData.caseId)
      console.log('[후일담] 사전 생성 결과 사용')
      return
    }
    if (!caseData || !verdictScore) return

    void (async () => {
      setLoading(true)
      setError(null)
      try {
        const { chatCompletion } = await import('../../../engine/llmClient')
        const { AFTERMATH_MAX_TOKENS, buildAftermathPrompt, postProcessAftermath } = await import('../../../engine/aftermathLLMGenerator')
        const { evaluateTitles } = await import('../../../data/titles')

        const keyDiscoveries: string[] = []
        if (processMetrics.liesCollapsed > 0) keyDiscoveries.push(`거짓말 ${processMetrics.liesCollapsed}건 자백 유도`)
        if (processMetrics.deepTruthsUnlocked > 0) keyDiscoveries.push(`숨겨진 진실 ${processMetrics.deepTruthsUnlocked}건 발견`)
        const emergedCount = Object.values(discovery.disputeVisibility).filter(v => v.visibility === 'emerged').length
        if (emergedCount > 0) keyDiscoveries.push(`숨겨진 쟁점 ${emergedCount}건 발현`)

        const titles = evaluateTitles(verdictScore, verdictInput, {
          turnsUsed: processMetrics.questionsAsked + processMetrics.evidenceEffective,
          evidencePresented: processMetrics.evidenceEffective,
          trustActionsUsed: processMetrics.trustActionsUsed,
          skillsUsed: 0,
          collapsedDisputes: processMetrics.liesCollapsed,
          totalDisputes: caseData.disputes.length,
        })

        const disputeJudgments: Record<string, string> = {}
        for (const d of caseData.disputes) {
          const fact = verdictInput.factFindings[d.id]
          disputeJudgments[d.id] = fact === 'true' ? '사실로 판단' : fact === 'false' ? '거짓으로 판단' : '보류'
        }

        const prompt = buildAftermathPrompt({
          caseData,
          verdictInput,
          verdictDetails: {
            disputeJudgments,
            issueWeights: Object.fromEntries(
              Object.entries(verdictInput.responsibility).map(([id, r]) => [id, r.b]),
            ),
            selectedResolution: verdictInput.selectedSolutions.join(', ') || '없음',
          },
          scores: { insight: verdictScore.insight, authority: verdictScore.authority, wisdom: verdictScore.wisdom },
          title: titles[0]?.name ?? '견습 재판관',
          keyDiscoveries,
        })

        console.log('[후일담] LLM 호출 시작')
        const response = await chatCompletion(
          [{ role: 'user', content: prompt }],
          { temperature: 0.9, maxTokens: AFTERMATH_MAX_TOKENS, model: 'gpt-4o-mini', endpoint: 'aftermath' },
        )
        console.log('[후일담] LLM 응답 길이:', response.length)
        const generated = postProcessAftermath(response, { a: caseData.duo.partyA.name, b: caseData.duo.partyB.name })
        const result = generated
          ? withVerdictContext(caseData, verdictInput, generated)
          : buildFallback(caseData, verdictScore.total, verdictInput)
        _aftermathCache = { caseId: caseData.caseId, text: result }
        setAftermath(result)
        updateLatestAftermath(result, caseData.caseId)
      } catch (err: any) {
        console.error('[후일담] LLM 호출 실패:', err?.message ?? err)
        setError(err?.message ?? 'LLM 호출 실패')
        const scripted = resolveScriptedAftermath(caseData, verdictInput)
        const fb = scripted
          ? withVerdictContext(caseData, verdictInput, scripted.text)
          : buildFallback(caseData, verdictScore.total, verdictInput)
        _aftermathCache = { caseId: caseData.caseId, text: fb }
        setAftermath(fb)
        updateLatestAftermath(fb, caseData.caseId)
      } finally {
        setLoading(false)
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <p style={{ color: '#8c8fa0', fontStyle: 'italic' }}>후일담을 작성하고 있습니다...</p>
  }
  if (!aftermath) {
    return <p>후일담 데이터가 없습니다.</p>
  }

  const shapedAftermath = caseData && verdictScore
    ? ensureAftermathShape(caseData, verdictInput, verdictScore.total, aftermath)
    : aftermath

  const { bodyParas, lesson } = splitAftermathDisplay(shapedAftermath)

  return (
    <div className="pc-result-aftermath">
      {bodyParas.map((para, i) => (
        <p key={i} className="pc-result-aftermath__para">{para}</p>
      ))}
      {lesson ? (
        <p className="pc-result-aftermath__lesson">
          &ldquo;{lesson}&rdquo;
        </p>
      ) : null}
    </div>
  )
}

function getSelectedSolutionText(verdictInput: VerdictInput): string {
  const selectedSolutions = verdictInput.selectedSolutions
    .map((entry) => entry.includes('::') ? entry.slice(entry.indexOf('::') + 2) : entry)
    .filter(Boolean)
  return selectedSolutions.length > 0
    ? selectedSolutions.slice(0, 2).join(', ')
    : '추가 조치 없이 판결 내용을 따르는 것'
}

function splitAftermathParagraphs(text: string): string[] {
  return text.split(/\n\n+/).map((para) => para.trim()).filter(Boolean)
}

function normalizeNarrativePunctuation(text: string): string {
  return text
    .replace(/([.!?。])\s*[,，]+/g, '$1')
    .replace(/[,，]\s*([.!?。])/g, '$1')
    .replace(/([.!?。])\s*([.!?。])+/g, '$1')
    .replace(/([.。])\s*([”"])/g, '$1$2')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function removeAftermathLessonLabels(text: string): string {
  return normalizeNarrativePunctuation(text
    .replace(/\*?\*?(?:교훈 한 문장|교훈|명언)\*?\*?\s*[:：]\s*/g, '')
    .replace(/^\s*(?:교훈 한 문장|교훈|명언)\s*[:：]\s*/gm, ''))
}

function normalizeAftermathLesson(text: string): string {
  return normalizeNarrativePunctuation(removeAftermathLessonLabels(text)
    .trim()
    .replace(/^[\s"“”'‘’`—-]+|[\s"“”'‘’`]+$/g, ''))
}

function splitAftermathDisplay(text: string): { bodyParas: string[]; lesson: string | null } {
  const cleaned = removeAftermathLessonLabels(text)
  const paragraphs = splitAftermathParagraphs(cleaned)

  if (paragraphs.length === 0) return { bodyParas: [], lesson: null }

  const last = paragraphs[paragraphs.length - 1]
  const quotedLesson = last.match(/["“‘「]([^"”’」]{8,120})["”’」]\s*$/)
  if (quotedLesson) {
    const quoteText = quotedLesson[0]
    const lesson = normalizeAftermathLesson(quoteText)
    const lastBody = normalizeNarrativePunctuation(last.slice(0, last.length - quoteText.length).trim())
    const bodyParas = [
      ...paragraphs.slice(0, -1),
      ...(lastBody ? [lastBody] : []),
    ].slice(0, 3)
    return { bodyParas, lesson }
  }

  if (paragraphs.length >= 4) {
    return {
      bodyParas: paragraphs.slice(0, -1).slice(0, 3),
      lesson: normalizeAftermathLesson(paragraphs[paragraphs.length - 1]),
    }
  }

  return { bodyParas: paragraphs.slice(0, 3), lesson: null }
}

function ensureAftermathShape(caseData: CaseData, verdictInput: VerdictInput, total: number, text: string): string {
  const paragraphs = splitAftermathParagraphs(text)
  if (paragraphs.length >= 4) return text

  const fallbackParagraphs = splitAftermathParagraphs(buildFallback(caseData, total, verdictInput))
  if (paragraphs.length === 0) return fallbackParagraphs.join('\n\n')

  const body = [
    paragraphs[0],
    ...fallbackParagraphs.slice(1, 3),
  ].slice(0, 3)
  const lesson = fallbackParagraphs[fallbackParagraphs.length - 1]
  return [...body, lesson].join('\n\n')
}

function getResponsibilityContext(caseData: CaseData, verdictInput: VerdictInput): { avgA: number; text: string } {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const responsibilities = Object.values(verdictInput.responsibility)
  const avgA = responsibilities.length > 0
    ? Math.round(responsibilities.reduce((sum, item) => sum + item.a, 0) / responsibilities.length)
    : 50
  const text = avgA > 55
    ? `${nameA}에게 더 큰 책임이 배분된 판결`
    : avgA < 45
      ? `${nameB}에게 더 큰 책임이 배분된 판결`
      : '양측 책임을 비슷하게 본 판결'
  return { avgA, text }
}

function withVerdictContext(caseData: CaseData, verdictInput: VerdictInput, text: string): string {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const pA = pp과와(nameA)
  const pB = pp은는(nameB)
  const { avgA, text: responsibilityText } = getResponsibilityContext(caseData, verdictInput)
  const solutionText = getSelectedSolutionText(verdictInput).replace(/[.。]+$/g, '')
  const dominantName = avgA > 55 ? nameA : avgA < 45 ? nameB : null
  const responsibilityDetail = dominantName
    ? `${dominantName} 쪽 책임이 ${dominantName === nameA ? avgA : 100 - avgA}%로 더 무겁게 정리되면서`
    : `책임이 ${avgA}:${100 - avgA}에 가깝게 나뉘면서`
  const intro = `${nameA}${pA} ${nameB}${pB} ${responsibilityText}을 받아들었다. 판결문에 적힌 해결 방향은 다음 조치였다. ${solutionText}. ${responsibilityDetail} 후일담의 방향도 누가 더 억울한지보다 무엇을 먼저 정리해야 하는지에 맞춰졌다.`
  const paras = splitAftermathParagraphs(text)
  if (paras[0]?.includes(solutionText) && paras[0]?.includes('책임')) return normalizeNarrativePunctuation(text)
  if (paras.length === 0) return normalizeNarrativePunctuation(intro)
  return normalizeNarrativePunctuation([`${intro} ${paras[0]}`, ...paras.slice(1)].join('\n\n'))
}

function buildFallback(caseData: CaseData, total: number, verdictInput: VerdictInput): string {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const pA = pp과와(nameA)
  const pB = pp은는(nameB)
  const solutionText = getSelectedSolutionText(verdictInput)
  const { text: responsibilityText } = getResponsibilityContext(caseData, verdictInput)

  if (total >= 75) {
    return `${nameA}${pA} ${nameB}${pB} ${responsibilityText}을 들은 뒤에도 한동안 말을 고르며 앉아 있었다. 승패가 또렷하게 갈린 판결이라기보다, 두 사람이 외면해 온 일을 더 이상 미룰 수 없게 만든 결론이었다. ${nameA}${pp은는(nameA)} 자신에게 남은 책임을 먼저 헤아렸고, ${nameB}${pp은는(nameB)} 상대의 표정에서 뒤늦은 피로와 안도감을 함께 읽었다. 법정을 나서는 발걸음은 가볍지 않았지만, 적어도 무엇을 사과하고 무엇을 고쳐야 하는지는 분명해졌다.\n\n며칠 뒤 두 사람은 ${solutionText}을 기준으로 다시 연락했다. 감정이 완전히 풀린 것은 아니어서 첫 대화는 짧고 조심스러웠다. 그래도 이전처럼 억울함을 앞세워 말을 끊지는 않았고, 서로가 확인해야 할 일과 더 묻지 말아야 할 일을 구분하기 시작했다. 판결문은 두 사람 사이에 놓인 차가운 종이였지만, 같은 문제를 반복하지 않기 위한 최소한의 약속이 되었다.\n\n한 달이 지나자 다툼의 열기는 줄었고, 남은 불편함은 서로가 지켜야 할 선을 확인하는 표지가 되었다. 두 사람은 예전처럼 쉽게 웃지는 못했지만, 같은 장면을 서로 다르게 기억한다는 사실을 더 이상 부정하지 않았다. 관계가 완전히 회복된 것은 아니었으나, 무너진 자리를 그냥 덮어 두는 대신 천천히 정리하는 쪽을 택했다. 이번 결말은 화해보다 먼저 책임을 문장으로 남긴 결과였다.\n\n\"책임을 적어야 관계도 다시 읽힌다.\"`
  }
  if (total >= 50) {
    return `${nameA}${pA} ${nameB}${pB} ${responsibilityText}을 받아들였지만, 완전히 만족한 얼굴은 아니었다. 판결은 억울함을 모두 지워 주기보다 더 커지기 전에 멈춰 세우는 쪽에 가까웠다. ${nameA}${pp은는(nameA)} 아직 설명되지 않은 감정을 붙들고 있었고, ${nameB}${pp은는(nameB)} 자신이 들은 말 중 어떤 것을 사과로 받아들여야 할지 쉽게 정하지 못했다. 법정의 결론은 끝이 아니라 불편한 정리의 시작이었다.\n\n이후 두 사람은 ${solutionText}을 놓고 필요한 말만 주고받았다. 대화는 건조했지만, 예전처럼 같은 문장을 두고 서로를 몰아붙이는 일은 줄었다. 불만은 남았고 몇 번의 침묵도 오갔지만, 어느 지점에서 같은 싸움이 반복되는지는 둘 다 알고 있었다. 그래서 두 사람은 감정을 설득하려 하기보다 절차를 먼저 지키는 쪽으로 움직였다.\n\n시간이 지나도 정리가 곧 화해가 되지는 않았다. 다만 이번에는 더 크게 무너지는 일을 막아 낸 결말로 남았다. ${nameA}${pA} ${nameB}${pp은는(nameB)} 서로를 완전히 이해했다고 말하지 않았지만, 적어도 확인하지 않은 확신으로 다시 상처를 만들지는 않기로 했다. 그 조심스러운 거리감이 판결 뒤에 남은 가장 현실적인 변화였다.\n\n\"오해를 멈추는 첫 절차는 확인이다.\"`
  }
  return `${nameA}${pA} ${nameB}${pB} ${responsibilityText} 뒤에도 쉽게 자리를 뜨지 못했다. 판결은 방향을 제시했지만, 사건의 감정까지 설득하지는 못했다. ${nameA}${pp은는(nameA)} 자신에게 불리한 대목을 오래 곱씹었고, ${nameB}${pp은는(nameB)} 인정받지 못한 말들이 아직 남아 있다고 느꼈다. 법정의 공기는 가라앉았지만, 두 사람의 표정에는 풀리지 않은 질문이 그대로 남았다.\n\n선택된 해결 방향은 ${solutionText}이었으나, 두 사람은 그 조치가 충분한지에 대해 끝내 같은 표정을 짓지 못했다. 필요한 연락은 이어졌지만, 말끝마다 다시 다투지 않기 위한 조심스러운 거리감이 먼저 끼어들었다. 사과와 정리는 일부만 진행됐고, 남은 말들은 다음 갈등의 씨앗처럼 법정 밖으로 따라 나갔다. 그래도 이번 판결은 최소한 더 큰 오해로 번지기 전에 멈춰 서야 할 지점을 표시했다.\n\n며칠 뒤의 일상은 이전과 비슷했지만, 두 사람은 같은 방식으로 돌아가지는 못했다. 서로의 주장에는 아직 날이 서 있었고, 쉽게 믿겠다는 말도 나오지 않았다. 다만 이번에는 감정이 앞서기 전에 기록과 절차를 먼저 보아야 한다는 사실만큼은 남았다. 그 사실이 봉합보다 경고에 가까운 결말을 만들었다.\n\n\"확인 없는 말은 법정 밖에서도 판결이 된다.\"`
}

/* ─── Profile inline ─── */

type CaseProfileAxes = { inquiry: number; judgment: number; resolution: number }

function clampAxisValue(value: number): number {
  return Math.max(-100, Math.min(100, Math.round(value)))
}

function axisToLevelState(value: number): AxisLevelState {
  const axis = clampAxisValue(value)
  const abs = Math.abs(axis)
  const level = abs >= 66 ? 3 : abs >= 33 ? 2 : abs >= 12 ? 1 : 0
  return { level: level * Math.sign(axis), progress: 0 }
}

function hasMeaningfulCaseAxes(axes: CaseProfileAxes | null): axes is CaseProfileAxes {
  return !!axes && (
    Math.abs(axes.inquiry) >= 12 ||
    Math.abs(axes.judgment) >= 12 ||
    Math.abs(axes.resolution) >= 12
  )
}

function getAxisTag(axis: keyof CaseProfileAxes, value: number): string | null {
  if (Math.abs(value) < 12) return null
  const labels = AXIS_LABELS[axis]
  return value < 0 ? labels.negative : labels.positive
}

function resolveCaseTitleId(axes: CaseProfileAxes): string {
  const logical = axes.inquiry <= -12
  const intuitive = axes.inquiry >= 12
  const strict = axes.judgment <= -12
  const lenient = axes.judgment >= 12
  const principled = axes.resolution <= -12
  const reconciling = axes.resolution >= 12

  if (logical && strict && principled) return 'cold_judge'
  if (logical && strict && reconciling) return 'practical_analyst'
  if (logical && lenient && principled) return 'balanced_sage'
  if (logical && lenient && reconciling) return 'careful_mediator'
  if (intuitive && strict && principled) return 'instinct_judge'
  if (intuitive && strict && reconciling) return 'passion_arbiter'
  if (intuitive && lenient && principled) return 'gentle_guardian'
  if (intuitive && lenient && reconciling) return 'warm_mediator'
  if (strict && principled) return 'cold_judge'
  if (strict && reconciling) return 'passion_arbiter'
  if (lenient && principled) return 'balanced_sage'
  if (lenient && reconciling) return 'warm_mediator'
  if (logical) return principled ? 'balanced_sage' : 'careful_mediator'
  if (intuitive) return strict ? 'instinct_judge' : 'gentle_guardian'
  if (principled) return 'balanced_sage'
  if (reconciling) return 'careful_mediator'
  if (strict) return 'cold_judge'
  if (lenient) return 'gentle_guardian'
  return 'neutral_observer'
}

function buildDisplayDriftFromAxes(drift: JudgeDriftState, axes: CaseProfileAxes): JudgeDriftState {
  return {
    ...drift,
    inquiry: axisToLevelState(axes.inquiry),
    judgment: axisToLevelState(axes.judgment),
    resolution: axisToLevelState(axes.resolution),
    casesProcessed: Math.max(1, drift.casesProcessed),
  }
}

/** 프로필 데이터 공유 hook */
function useProfileData() {
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const processMetrics = useStore((s) => s.processMetrics)

  return useMemo(() => {
    const drift = loadDriftState()
    const perks = loadJudgePerks()
    const perkSelection = {
      major: perks.major as PerkId | null,
      minor: perks.minor as PerkId | null,
    }
    const cumulativeProfile = deriveJudgeProfile(drift, undefined, perkSelection)
    const currentAxes = caseData
      ? deriveCaseProfile(
        verdictInput,
        processMetrics,
        caseData.disputes.map((item) => ({
          id: item.id,
          ambiguity: item.ambiguity,
          truth: item.truth ?? true,
        })),
        caseData.caseId,
        caseData.solutions,
      )
      : null
    if (!hasMeaningfulCaseAxes(currentAxes)) {
      return { profile: cumulativeProfile, driftState: drift, totalGames: drift.casesProcessed, currentAxes: null }
    }

    const displayDrift = buildDisplayDriftFromAxes(drift, currentAxes)
    const profileFromAxes = deriveJudgeProfile(displayDrift, undefined, perkSelection)
    const subtags = [
      getAxisTag('inquiry', currentAxes.inquiry),
      getAxisTag('judgment', currentAxes.judgment),
      getAxisTag('resolution', currentAxes.resolution),
    ].filter(Boolean) as string[]
    const profile: JudgeProfile = {
      ...profileFromAxes,
      inquiryAxis: clampAxisValue(currentAxes.inquiry),
      judgmentAxis: clampAxisValue(currentAxes.judgment),
      resolutionAxis: clampAxisValue(currentAxes.resolution),
      titleId: profileFromAxes.titleId === 'neutral_observer'
        ? resolveCaseTitleId(currentAxes)
        : profileFromAxes.titleId,
      subtags,
    }
    return { profile, driftState: displayDrift, totalGames: Math.max(1, drift.casesProcessed), currentAxes }
  }, [caseData, verdictInput, processMetrics])
}

/** 좌측: 타이틀 + 설명 + 태그 + 티어 */
function ProfileInfoSection() {
  const { profile } = useProfileData()
  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer
  const tierInfo = TIER_LABELS[profile.tier]

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <PCTitleEmblem
        alt={titleInfo.name}
        size={96}
        style={{ flexShrink: 0, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.45))' }}
        titleId={profile.titleId}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--pc-gold-light)', margin: 0 }}>{titleInfo.name}</h2>
        <p style={{ fontSize: 15, color: '#a8a8b4', lineHeight: 1.6, margin: 0 }}>
          {getProfileDescription(profile.titleId)}
        </p>
        {profile.subtags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
            {profile.subtags.map((tag) => (
              <span className="pc-result-summary__tag" key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** 우측: 3축 게이지 */
function ProfileGaugeSection() {
  const { driftState, totalGames, currentAxes } = useProfileData()

  if (totalGames === 0 && !currentAxes) {
    return (
      <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', fontSize: 13, color: '#8c8fa0', lineHeight: 1.7 }}>
        첫 번째 재판을 마쳤습니다. 사건을 거듭할수록 성향이 드러납니다.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
      <ProfileAxis label={AXIS_LABELS.inquiry.label} negativeLabel={AXIS_LABELS.inquiry.negative} positiveLabel={AXIS_LABELS.inquiry.positive} axisState={driftState.inquiry} axisValue={currentAxes?.inquiry} />
      <ProfileAxis label={AXIS_LABELS.judgment.label} negativeLabel={AXIS_LABELS.judgment.negative} positiveLabel={AXIS_LABELS.judgment.positive} axisState={driftState.judgment} axisValue={currentAxes?.judgment} />
      <ProfileAxis label={AXIS_LABELS.resolution.label} negativeLabel={AXIS_LABELS.resolution.negative} positiveLabel={AXIS_LABELS.resolution.positive} axisState={driftState.resolution} axisValue={currentAxes?.resolution} />
    </div>
  )
}

/** 기존 통합 (다른 곳에서 사용 시) */
function ProfileInline() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <ProfileInfoSection />
      <ProfileGaugeSection />
    </div>
  )
}

function ProfileAxis({ label, negativeLabel, positiveLabel, axisState, axisValue }: {
  label: string
  negativeLabel: string
  positiveLabel: string
  axisState: AxisLevelState
  axisValue?: number
}) {
  const displayValue = typeof axisValue === 'number' ? clampAxisValue(axisValue) : axisState.level * 33
  const levelPct = ((displayValue + 100) / 200) * 100

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '36px minmax(0, 1fr)', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 800, color: '#c6c0b3', minWidth: 28 }}>{label}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)' }}>
          {displayValue < 0 && (
            <div style={{ position: 'absolute', top: 0, left: `${levelPct}%`, width: `${50 - levelPct}%`, height: '100%', borderRadius: 5, background: 'var(--pc-blue, #5b8def)' }} />
          )}
          {displayValue > 0 && (
            <div style={{ position: 'absolute', top: 0, left: '50%', width: `${levelPct - 50}%`, height: '100%', borderRadius: 5, background: 'var(--pc-gold, #d4a24e)' }} />
          )}
          {/* 중앙선 */}
          <div style={{ position: 'absolute', top: -2, left: '50%', width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
          {/* 현재 위치 마커 */}
          <div style={{ position: 'absolute', top: -1, left: `${levelPct}%`, width: 12, height: 12, borderRadius: '50%', background: displayValue === 0 ? '#6a6e80' : displayValue < 0 ? 'var(--pc-blue)' : 'var(--pc-gold)', border: '2px solid rgba(12,12,20,0.8)', transform: 'translateX(-50%)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, fontWeight: 800, color: 'rgba(230,224,212,0.72)' }}>
          <span>{negativeLabel}</span>
          <span>{positiveLabel}</span>
        </div>
      </div>
    </div>
  )
}

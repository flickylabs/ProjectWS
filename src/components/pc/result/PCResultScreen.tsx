import React, { useEffect, useMemo, useState } from 'react'
import { loadGeneratedCases } from '../../../data/cases/caseLoader'
import { evaluateTitles, saveUnlockedTitles, loadUnlockedTitles, type Title } from '../../../data/titles'
import { loadDriftState, loadExtendedHistory, loadJudgePerks, loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
import { deriveCaseProfile, deriveJudgeProfile, TITLE_LABELS, AXIS_LABELS, TIER_LABELS, LEVEL_LABELS } from '../../../engine/judgeProfileEngine'
import type { AxisLevelState } from '../../../engine/judgeProfileEngine'
import type { PerkId } from '../../../engine/judgePerks'
import { TRAIT_META, applyRewardsToInventory, canEnhanceTrait, computeCaseRewards, type FragmentReward, type TraitId } from '../../../engine/judgeProgressionEngine'
import { GamePhase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { saveCaseProgress } from '../../phase/CaseMap'
import { resetAftermathCache } from '../../result/Aftermath'
import { playClick } from '../../../engine/soundEngine'
import { pp과와 } from '../../../engine/koreanPostposition'
import CharacterFaceSvg from '../icons/CharacterFaceSvg'
import PCClearanceDetailPopup from './PCClearanceDetailPopup'
import { evaluateClearance } from '../../../engine/clearanceTracker'
import PCFragmentRewardOverlay from './PCFragmentRewardOverlay'

type ResultTab = 'result' | 'verdict_pronounce' | 'epilogue'

const TABS: { id: ResultTab; label: string }[] = [
  { id: 'result', label: '01 결과 확인' },
  { id: 'verdict_pronounce', label: '02 판결 선고' },
  { id: 'epilogue', label: '03 후일담' },
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

/** 칭호 SVG 아이콘 — 순수 라인 아트(테두리만, 흰색) */
function getTitleSvgIcon(icon: string): React.ReactNode {
  const S = 32 // viewBox size
  const svgs: Record<string, React.ReactNode> = {
    // ⚖️ 저울
    '⚖️': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><line x1="16" y1="4" x2="16" y2="24" stroke="white" strokeWidth="1.5"/><line x1="6" y1="10" x2="26" y2="10" stroke="white" strokeWidth="1.5"/><path d="M6 10l-2 8h8l-2-8" stroke="white" strokeWidth="1.5" fill="none"/><path d="M26 10l-2 8h8l-2-8" stroke="white" strokeWidth="1.5" fill="none"/><line x1="10" y1="26" x2="22" y2="26" stroke="white" strokeWidth="1.5"/></svg>,
    // 🎯 과녁
    '🎯': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="white" strokeWidth="1.5"/><circle cx="16" cy="16" r="8" stroke="white" strokeWidth="1.2"/><circle cx="16" cy="16" r="4" stroke="white" strokeWidth="1.2"/><circle cx="16" cy="16" r="1.5" fill="white"/></svg>,
    // 🔍 돋보기
    '🔍': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><circle cx="14" cy="14" r="8" stroke="white" strokeWidth="1.5"/><line x1="20" y1="20" x2="28" y2="28" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>,
    // ⚡ 번개
    '⚡': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M18 4L8 18h8l-2 10 12-16h-8l2-8z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="none"/></svg>,
    // 🛡️ 방패
    '🛡️': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M16 4L6 10v8c0 6 4.5 11.5 10 13 5.5-1.5 10-7 10-13v-8L16 4z" stroke="white" strokeWidth="1.5" fill="none"/></svg>,
    // 💡 전구
    '💡': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M16 4a8 8 0 00-5 14.3V22h10v-3.7A8 8 0 0016 4z" stroke="white" strokeWidth="1.5" fill="none"/><line x1="12" y1="24" x2="20" y2="24" stroke="white" strokeWidth="1.2"/><line x1="13" y1="27" x2="19" y2="27" stroke="white" strokeWidth="1.2"/></svg>,
    // 🏆 트로피
    '🏆': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M10 6h12v5a6 6 0 01-12 0V6z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M10 8H7a2 2 0 00-2 2v1a3 3 0 003 3h2" stroke="white" strokeWidth="1"/><path d="M22 8h3a2 2 0 012 2v1a3 3 0 01-3 3h-2" stroke="white" strokeWidth="1"/><line x1="16" y1="17" x2="16" y2="22" stroke="white" strokeWidth="1.5"/><rect x="11" y="22" width="10" height="4" rx="1" stroke="white" strokeWidth="1" fill="none"/></svg>,
    // 🤝 악수 — 손바닥 라인
    '🤝': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M4 18l3-3 4 1 2-2 2 2 4-1 3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 15l-3 1v7l4-2" stroke="white" strokeWidth="1.2"/><path d="M25 15l3 1v7l-4-2" stroke="white" strokeWidth="1.2"/></svg>,
    // ❄️ 눈꽃
    '❄️': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><line x1="16" y1="4" x2="16" y2="28" stroke="white" strokeWidth="1.5"/><line x1="4" y1="16" x2="28" y2="16" stroke="white" strokeWidth="1.5"/><line x1="8" y1="8" x2="24" y2="24" stroke="white" strokeWidth="1"/><line x1="24" y1="8" x2="8" y2="24" stroke="white" strokeWidth="1"/><line x1="16" y1="4" x2="13" y2="7" stroke="white" strokeWidth="1"/><line x1="16" y1="4" x2="19" y2="7" stroke="white" strokeWidth="1"/></svg>,
    // 🕊️ 비둘기
    '🕊️': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M16 8c-4 0-8 4-8 10h16c0-6-4-10-8-10z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M10 18l-3 5" stroke="white" strokeWidth="1.2"/><path d="M22 18l3 5" stroke="white" strokeWidth="1.2"/><circle cx="14" cy="14" r="1" fill="white"/></svg>,
    // 🤔 고민 — 얼굴 라인
    '🤔': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" stroke="white" strokeWidth="1.5"/><circle cx="12" cy="14" r="1.5" fill="white"/><circle cx="20" cy="14" r="1.5" fill="white"/><path d="M12 21 Q16 19 20 21" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/><path d="M22 10l4-3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    // ✋ 손바닥 — 라인
    '✋': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M16 28c-5 0-8-3-8-8V12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 28c5 0 8-3 8-8V10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="12" x2="8" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="6" x2="12" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="4" x2="16" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="20" y1="6" x2="20" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="24" y1="8" x2="24" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    // 👁 눈 — 라인
    '👁': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M4 16s5-8 12-8 12 8 12 8-5 8-12 8-12-8-12-8z" stroke="white" strokeWidth="1.5" fill="none"/><circle cx="16" cy="16" r="4" stroke="white" strokeWidth="1.5"/><circle cx="16" cy="16" r="1.5" fill="white"/></svg>,
    // 🔥 불꽃
    '🔥': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><path d="M16 4c0 0-8 8-8 16a8 8 0 0016 0c0-8-8-16-8-16z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M16 14c0 0-3 3-3 7a3 3 0 006 0c0-4-3-7-3-7z" stroke="white" strokeWidth="1" fill="none"/></svg>,
    // 💎 다이아몬드
    '💎': <svg width={S} height={S} viewBox="0 0 32 32" fill="none"><polygon points="16,4 6,14 16,28 26,14" stroke="white" strokeWidth="1.5" fill="none"/><line x1="6" y1="14" x2="26" y2="14" stroke="white" strokeWidth="1"/><line x1="16" y1="4" x2="12" y2="14" stroke="white" strokeWidth="1"/><line x1="16" y1="4" x2="20" y2="14" stroke="white" strokeWidth="1"/></svg>,
  }
  // Default fallback — thinking face (신중)
  return svgs[icon] ?? (
    <svg width={S} height={S} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="14" r="10" stroke="white" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="1.5" fill="white"/><circle cx="20" cy="12" r="1.5" fill="white"/>
      <path d="M12 18 Q16 16 20 18" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M22 8l3-2" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="16" y1="24" x2="16" y2="28" stroke="white" strokeWidth="1.2"/>
      <line x1="12" y1="27" x2="20" y2="27" stroke="white" strokeWidth="1.2"/>
    </svg>
  )
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
  const minigameProgress = useStore((s) => s.minigameProgress)
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
    if (_aftermathCache) return // 이미 캐시됨
    if (!caseData || !verdictScore) return
    const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY as string | undefined
    if (!apiKey) return

    void (async () => {
      try {
        const { chatCompletion } = await import('../../../engine/llmClient')
        const { buildAftermathPrompt, postProcessAftermath } = await import('../../../engine/aftermathLLMGenerator')

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
          { temperature: 0.9, maxTokens: 900, model: 'gpt-4o-mini' },
        )
        if (response) {
          const processed = postProcessAftermath(response)
          if (processed) {
            _aftermathCache = processed
            console.log('[후일담] LLM 생성 완료, 길이:', processed.length)
          }
        }
      } catch (err) {
        console.warn('[후일담] 백그라운드 LLM 생성 실패:', err)
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
  const rewardOverlayOpen = rewardBundle.rewards.length > 0 && !rewardOverlayDismissed

  const handleExit = () => {
    resetAftermathCache()
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
    initializeCase(nextCase)
  }

  const handleRetry = () => {
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
              <strong>{caseData.disputes.filter((d) => { const v = disputeVisibility[d.id]; return !v || v.visibility !== 'hidden' }).length}개</strong>
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

          <div className="pc-result-hero__actions">
            <div style={{ fontSize: 15, fontWeight: 800, color: '#a8a8b4', textAlign: 'center', marginBottom: 8 }}>
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
                    { label: '클리어율', value: clearanceResult.percent, color: '#d4a24e' },
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
                          <text x="50" y="56" textAnchor="middle" fill="#f2efe8" fontSize="28" fontWeight="900">{axis.value}</text>
                        </svg>
                      </div>
                    )
                  })}
                </div>

                <div className="pc-result-clearance-detail">
                  <button className="pc-result-clearance-detail__button" onClick={handleOpenClearanceDetail} type="button">
                    상세 보기
                  </button>
                </div>

                {/* 쟁점별 정답 공개 */}
                <div className="pc-result-truth" style={{ marginTop: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: '#e0ddd6', marginBottom: 8 }}>쟁점별 판단 결과</h3>
                  {caseData.disputes.filter((d) => { const v = disputeVisibility[d.id]; return !v || v.visibility !== 'hidden' }).map((d) => {
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
                          <p style={{ fontSize: 13, color: '#b0aда4', lineHeight: 1.5, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' } as any}>
                            {selectedText ?? d.truthDescription}
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

                {/* 하단 prev/next */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                  <button className="pc-verdict-footer__button" disabled type="button">&lt; 이전</button>
                  <button className="pc-verdict-footer__button is-primary" onClick={() => setTab('verdict_pronounce')} type="button">다음 &gt;</button>
                </div>
              </div>
            ) : null}

            {/* ━━━ 판결 선고 탭 ━━━ */}
            {tab === 'verdict_pronounce' ? (() => {
              const avgA = verdictSummary ? verdictSummary.responsibility.percentA : 50
              return (
              <div className="pc-result-text">
                {/* 상단 선고문 */}
                <p style={{ fontSize: 17, color: '#e8e5dc', lineHeight: 1.8, textAlign: 'center', marginBottom: 20 }}>
                  본 사건은 <strong>{caseData.duo.partyA.name}</strong>{pp과와(caseData.duo.partyA.name)} <strong>{caseData.duo.partyB.name}</strong>의 {relationLabel} 간 분쟁으로, 총 <strong style={{ color: 'var(--pc-gold-light)' }}>{turnCount}</strong>회의 심리를 거쳐 다음과 같은 판결에 이르렀습니다.
                </p>

                {verdictSummary ? (
                  <>
                    {/* ── 상단: 좌측 저울 + 우측 2영역 ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, marginBottom: 20 }}>
                      {/* 좌측 — 저울 + 책임 배분 설명 */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '16px 0' }}>
                        <svg width="220" height="160" viewBox="0 0 400 200" style={{ display: 'block' }}>
                          <polygon points="200,140 182,170 218,170" fill="#d4a24e" opacity="0.6" />
                          <rect x="165" y="170" width="70" height="6" rx="3" fill="#d4a24e" opacity="0.3" />
                          {(() => { const t = ((avgA - 50) / 50) * 12; return (
                          <g transform={`rotate(${t}, 200, 140)`}>
                            <rect x="40" y="136" width="320" height="8" rx="4" fill="#d4a24e" />
                            <rect x="45" y="126" width="90" height="10" rx="5" fill="rgba(91,141,239,0.2)" stroke="#5b8def" strokeWidth="1.5" />
                            <foreignObject x="62" y="72" width="56" height="56"><CharacterFaceSvg party="a" size={56} /></foreignObject>
                            <text x="90" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#5b8def">{caseData.duo.partyA.name}</text>
                            <rect x="265" y="126" width="90" height="10" rx="5" fill="rgba(224,96,96,0.2)" stroke="#e06060" strokeWidth="1.5" />
                            <foreignObject x="282" y="72" width="56" height="56"><CharacterFaceSvg party="b" size={56} /></foreignObject>
                            <text x="310" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e06060">{caseData.duo.partyB.name}</text>
                          </g>
                          ) })()}
                        </svg>
                        <div style={{ display: 'flex', gap: 24, fontSize: 20, fontWeight: 900 }}>
                          <span style={{ color: '#5b8def' }}>{verdictSummary.responsibility.percentA}%</span>
                          <span style={{ color: '#e06060' }}>{verdictSummary.responsibility.percentB}%</span>
                        </div>
                        <p style={{ fontSize: 13, color: '#8c8fa0', lineHeight: 1.6, textAlign: 'center', marginTop: 4 }}>{verdictSummary.responsibilityReason}</p>
                      </div>

                      {/* 우측 — 2영역 */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* 결정적 순간 */}
                        <div className="pc-result-summary__section" style={{ margin: 0 }}>
                          <h3>결정적 순간</h3>
                          <p>{verdictSummary.keyMoment}</p>
                        </div>
                        {/* 해결 방향 — 스크롤 영역 */}
                        <div className="pc-result-summary__section" style={{ margin: 0 }}>
                          <h3>해결 방향</h3>
                          <div style={{ maxHeight: 140, overflowY: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {verdictSummary.resolution.split(/[.。]\s*/).filter((s: string) => s.trim()).map((sentence: string, i: number) => (
                              <div key={i} style={{
                                padding: '10px 14px', borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)',
                                fontSize: 13, color: '#a8a8b4', lineHeight: 1.5,
                              }}>
                                {sentence.trim()}.
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── 하단: 재판관 성향 — 좌측 타이틀/설명, 우측 게이지 ── */}
                    <div style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <h3 style={{ marginTop: 0, marginBottom: 12 }}>재판관 성향</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                        {/* 좌측: 타이틀 + 설명 + 태그 */}
                        <ProfileInfoSection />
                        {/* 우측: 게이지 */}
                        <ProfileGaugeSection />
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
                        <button className="pc-result-text__copy-btn" onClick={handleCopySummary} type="button">
                          {summaryCopied ? '복사 완료!' : '판결문 복사'}
                        </button>
                        <button className="pc-result-text__copy-btn" onClick={handleCopyShare} type="button">
                          {copied ? '복사 완료!' : '공유하기'}
                        </button>
                      </div>
                    </div>

                    {/* 하단 prev/next */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                      <button className="pc-verdict-footer__button" onClick={() => setTab('result')} type="button">&lt; 이전</button>
                      <button className="pc-verdict-footer__button is-primary" onClick={() => setTab('epilogue')} type="button">다음 &gt;</button>
                    </div>
                  </>
                ) : null}
              </div>
              )
            })() : null}

            {/* ━━━ 후일담 탭 ━━━ */}
            {tab === 'epilogue' ? (
              <div className="pc-result-text">
                {/* 후일담 — on top */}
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', color: 'var(--pc-gold-light)', textTransform: 'uppercase' }}>Epilogue</div>
                </div>
                <div style={{
                  border: '1px solid rgba(212,162,78,0.15)', borderRadius: 16,
                  padding: '20px 24px', background: 'rgba(212,162,78,0.02)',
                  marginBottom: 32,
                }}>
                  <AftermathInline />
                </div>

                {/* 획득 칭호 — 가로 스크롤 */}
                {titles.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#e0ddd6', marginBottom: 12 }}>획득한 칭호</h3>
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

                {/* 하단 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                  <button className="pc-verdict-footer__button" onClick={() => setTab('verdict_pronounce')} type="button">&lt; 이전</button>
                  <button className="pc-verdict-footer__button is-primary" onClick={handleExit} type="button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 4 }}><path d="M3 12l9-8 9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    홈으로
                  </button>
                </div>
              </div>
            ) : null}
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
          minigameProgress={minigameProgress}
          onClose={handleCloseClearanceDetail}
          result={clearanceResult}
        />
      ) : null}
    </div>
  )
}

/* ─── Aftermath inline (uses same LLM/scripted logic) ─── */

// 후일담 캐시 — 탭 전환으로 리마운트되어도 재호출하지 않음
let _aftermathCache: string | null = null

function AftermathInline() {
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const verdictScore = useStore((s) => s.verdictScore)
  const processMetrics = useStore((s) => s.processMetrics)
  const discovery = useStore((s) => s.discovery)
  const [aftermath, setAftermath] = useState<string | null>(_aftermathCache)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 캐시가 있으면 재호출하지 않음
    if (_aftermathCache) { setAftermath(_aftermathCache); return }
    // 사전 생성된 결과가 있으면 사용
    const pregenerated = (window as any).__aftermathPregenerated as string | undefined
    if (pregenerated) {
      _aftermathCache = pregenerated
      setAftermath(pregenerated)
      console.log('[후일담] 사전 생성 결과 사용')
      return
    }
    if (!caseData || !verdictScore) return

    void (async () => {
      // API 키 유무를 직접 확인
      const apiKey = (import.meta as any).env?.VITE_OPENAI_API_KEY as string | undefined
      if (!apiKey) {
        console.warn('[후일담] VITE_OPENAI_API_KEY 없음 — fallback 사용')
        const fb = buildFallback(caseData, verdictScore.total)
        _aftermathCache = fb
        setAftermath(fb)
        return
      }

      setLoading(true)
      setError(null)
      try {
        const { chatCompletion } = await import('../../../engine/llmClient')
        const { buildAftermathPrompt, postProcessAftermath } = await import('../../../engine/aftermathLLMGenerator')
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

        console.log('[후일담] LLM 호출 시작 (API key:', apiKey.slice(0, 10) + '...)')
        const response = await chatCompletion(
          [{ role: 'user', content: prompt }],
          { temperature: 0.9, maxTokens: 900, model: 'gpt-4o-mini' },
        )
        console.log('[후일담] LLM 응답 길이:', response.length)
        const result = postProcessAftermath(response) || buildFallback(caseData, verdictScore.total)
        _aftermathCache = result
        setAftermath(result)
      } catch (err: any) {
        console.error('[후일담] LLM 호출 실패:', err?.message ?? err)
        setError(err?.message ?? 'LLM 호출 실패')
        const fb = buildFallback(caseData, verdictScore.total)
        _aftermathCache = fb
        setAftermath(fb)
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

  // "**교훈 한 문장**:" 제거
  let cleaned = aftermath.replace(/\*?\*?교훈 한 문장\*?\*?:\s*/g, '')
  const allParas = cleaned.split('\n\n').filter(p => p.trim())
  // 본문 3문단(흰색) + 마지막 1문장(노란색 따옴표)
  const bodyParas = allParas.slice(0, 3)
  const lesson = allParas.length > 3 ? allParas[allParas.length - 1] : null

  return (
    <>
      {bodyParas.map((para, i) => (
        <p key={i} style={{ fontSize: 15, lineHeight: 1.9, color: '#e8e5dc' }}>{para}</p>
      ))}
      {lesson && (() => {
        const text = lesson.trim().replace(/^[""\u201C]|[""\u201D]$/g, '')
        return (
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--pc-gold-light, #e8c172)', textAlign: 'center', fontWeight: 600, marginTop: 10, fontStyle: 'italic' }}>
            &ldquo;{text}&rdquo;
          </p>
        )
      })()}
    </>
  )
}

function buildFallback(caseData: { duo: { partyA: { name: string }; partyB: { name: string } } }, total: number): string {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  if (total >= 75) {
    return `${nameA}와 ${nameB}는 적어도 무엇이 문제였는지 같은 문장으로 말할 수 있게 되었다.\n\n서로를 향한 비난은 줄었고, 앞으로 지켜야 할 선을 다시 확인하는 대화가 시작됐다.\n\n완전한 화해는 아니어도, 같은 실수를 반복하지 않겠다는 말만은 남았다.`
  }
  if (total >= 50) {
    return `${nameA}와 ${nameB}는 판결을 받아들였지만, 완전히 만족한 얼굴은 아니었다.\n\n한 달이 지나도 불만은 남았지만, 같은 싸움이 반복되는 지점은 서로 알고 있었다.\n\n정리가 곧 화해는 아니지만, 더 크게 무너지는 일은 막아 낸 결말이었다.`
  }
  return `${nameA}와 ${nameB}는 판결 뒤에도 쉽게 자리를 뜨지 못했다.\n\n감정이 정리된 것은 아니었고, 남은 말들은 다음 갈등의 씨앗처럼 남아 있었다.\n\n이번 결말은 봉합보다 경고에 가까웠다.`
}

/* ─── Profile inline ─── */

/** 프로필 데이터 공유 hook */
function useProfileData() {
  return useMemo(() => {
    const drift = loadDriftState()
    const perks = loadJudgePerks()
    const prof = deriveJudgeProfile(drift, undefined, {
      major: perks.major as PerkId | null,
      minor: perks.minor as PerkId | null,
    })
    return { profile: prof, driftState: drift, totalGames: drift.casesProcessed }
  }, [])
}

/** 좌측: 타이틀 + 설명 + 태그 + 티어 */
function ProfileInfoSection() {
  const { profile } = useProfileData()
  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer
  const tierInfo = TIER_LABELS[profile.tier]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
  )
}

/** 우측: 3축 게이지 */
function ProfileGaugeSection() {
  const { driftState, totalGames } = useProfileData()

  if (totalGames === 0) {
    return (
      <div style={{ padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', fontSize: 13, color: '#8c8fa0', lineHeight: 1.7 }}>
        첫 번째 재판을 마쳤습니다. 사건을 거듭할수록 성향이 드러납니다.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
      <ProfileAxis label="탐구" axisState={driftState.inquiry} />
      <ProfileAxis label="판단" axisState={driftState.judgment} />
      <ProfileAxis label="해결" axisState={driftState.resolution} />
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

function ProfileAxis({ label, axisState }: {
  label: string
  axisState: AxisLevelState
}) {
  const { level } = axisState
  const levelPct = ((level + 3) / 6) * 100

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ fontSize: 12, fontWeight: 700, color: '#8c8fa0', minWidth: 28 }}>{label}</span>
      <div style={{ flex: 1, position: 'relative', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.06)' }}>
        {level < 0 && (
          <div style={{ position: 'absolute', top: 0, left: `${levelPct}%`, width: `${50 - levelPct}%`, height: '100%', borderRadius: 5, background: 'var(--pc-blue, #5b8def)' }} />
        )}
        {level > 0 && (
          <div style={{ position: 'absolute', top: 0, left: '50%', width: `${levelPct - 50}%`, height: '100%', borderRadius: 5, background: 'var(--pc-gold, #d4a24e)' }} />
        )}
        {/* 중앙선 */}
        <div style={{ position: 'absolute', top: -2, left: '50%', width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />
        {/* 현재 위치 마커 */}
        <div style={{ position: 'absolute', top: -1, left: `${levelPct}%`, width: 12, height: 12, borderRadius: '50%', background: level === 0 ? '#6a6e80' : level < 0 ? 'var(--pc-blue)' : 'var(--pc-gold)', border: '2px solid rgba(12,12,20,0.8)', transform: 'translateX(-50%)' }} />
      </div>
    </div>
  )
}

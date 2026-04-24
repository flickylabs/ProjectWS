import React, { useEffect, useMemo, useState } from 'react'
import { loadGeneratedCases } from '../../../data/cases/caseLoader'
import { evaluateTitles, saveUnlockedTitles, loadUnlockedTitles, type Title } from '../../../data/titles'
import { loadDriftState, loadExtendedHistory, loadJudgePerks, loadProgressionState, saveProgressionState } from '../../../data/leaderboard'
import { deriveCaseProfile, deriveJudgeProfile, TITLE_LABELS, AXIS_LABELS, TIER_LABELS, LEVEL_LABELS } from '../../../engine/judgeProfileEngine'
import PCTitleEmblem from '../icons/PCTitleEmblem'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { PCFragmentIcon } from '../progression/PCJudgeProgressionShared'
import type { AxisLevelState } from '../../../engine/judgeProfileEngine'
import type { PerkId } from '../../../engine/judgePerks'
import { TRAIT_META, FRAGMENT_TABLE, applyRewardsToInventory, canEnhanceTrait, computeCaseRewards, type FragmentReward, type TraitId } from '../../../engine/judgeProgressionEngine'
import { GamePhase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { saveCaseProgress } from '../../phase/CaseMap'
import { resetAftermathCache } from '../../result/Aftermath'
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
          const processed = postProcessAftermath(response, { a: caseData.duo.partyA.name, b: caseData.duo.partyB.name })
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
  const rewardOverlayOpen = false // 보너스 탭으로 이동 — 팝업 비활성

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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <p style={{ fontSize: 17, color: '#e8e5dc', lineHeight: 1.8, textAlign: 'center', marginBottom: 28 }}>
                  본 사건은 <strong>{caseData.duo.partyA.name}</strong>{pp과와(caseData.duo.partyA.name)} <strong>{caseData.duo.partyB.name}</strong>의 {relationLabel} 간 분쟁으로, 총 <strong style={{ color: 'var(--pc-gold-light)' }}>{turnCount}</strong>회의 심리를 거쳐 다음과 같은 판결에 이르렀습니다.
                </p>

                {verdictSummary ? (
                  <>
                    {/* ── 상단: 좌측 저울 + 우측 2영역 ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, marginBottom: 28 }}>
                      {/* 좌측 — 저울 + 책임 배분 설명 (top-aligned) */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: 8, padding: '1px 0 0' }}>
                        <svg width="240" height="180" viewBox="0 0 420 220" style={{ display: 'block' }}>
                          <polygon points="210,160 192,188 228,188" fill="#8b6f3d" opacity="0.7" />
                          <rect x="175" y="188" width="70" height="5" rx="2" fill="#8b6f3d" opacity="0.35" />
                          {(() => { const t = ((avgA - 50) / 50) * 12; return (
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
                            {verdictSummary.resolution.split(/[.。]\s*/).map((s: string) => s.trim().replace(/^,\s*/, '').trim()).filter((s: string) => s).map((sentence: string, i: number) => (
                              <div key={i} style={{
                                padding: '10px 14px', borderRadius: 8,
                                border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)',
                                fontSize: 13, color: '#a8a8b4', lineHeight: 1.5,
                              }}>
                                {sentence}.
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

                {/* 하단 버튼 — 최하단 고정 */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
                  <button className="pc-verdict-footer__button" onClick={() => setTab('verdict_pronounce')} type="button">&lt; 이전</button>
                  <button className="pc-verdict-footer__button is-primary" onClick={() => setTab('bonus')} type="button">다음 &gt;</button>
                </div>
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

                {/* 하단 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button className="pc-verdict-footer__button" onClick={() => setTab('epilogue')} type="button">&lt; 이전</button>
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
        const result = postProcessAftermath(response, { a: caseData.duo.partyA.name, b: caseData.duo.partyB.name }) || buildFallback(caseData, verdictScore.total)
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
  const pA = pp과와(nameA)
  const pB = pp은는(nameB)
  if (total >= 75) {
    return `${nameA}${pA} ${nameB}${pB} 적어도 무엇이 문제였는지 같은 문장으로 말할 수 있게 되었다.\n\n서로를 향한 비난은 줄었고, 앞으로 지켜야 할 선을 다시 확인하는 대화가 시작됐다.\n\n완전한 화해는 아니어도, 같은 실수를 반복하지 않겠다는 말만은 남았다.`
  }
  if (total >= 50) {
    return `${nameA}${pA} ${nameB}${pB} 판결을 받아들였지만, 완전히 만족한 얼굴은 아니었다.\n\n한 달이 지나도 불만은 남았지만, 같은 싸움이 반복되는 지점은 서로 알고 있었다.\n\n정리가 곧 화해는 아니지만, 더 크게 무너지는 일은 막아 낸 결말이었다.`
  }
  return `${nameA}${pA} ${nameB}${pB} 판결 뒤에도 쉽게 자리를 뜨지 못했다.\n\n감정이 정리된 것은 아니었고, 남은 말들은 다음 갈등의 씨앗처럼 남아 있었다.\n\n이번 결말은 봉합보다 경고에 가까웠다.`
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

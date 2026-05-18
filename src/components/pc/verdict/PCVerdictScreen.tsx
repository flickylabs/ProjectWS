import React, { useMemo, useRef, useState } from 'react'
import { loadDriftState, saveDriftState } from '../../../data/leaderboard'
import { completeStage } from '../../../data/campaign'
import { checkAndGrantRewards } from '../../../engine/rewardEngine'
import { playGavel } from '../../../engine/soundEngine'
import { calculateVerdict } from '../../../engine/verdictEngine'
import { computeMediationScoreModifiers } from '../../../engine/mediationEffectEngine'
import type { MediationScoreContext } from '../../../engine/mediationEffectEngine'
import { getSolutionOrientationByText } from '../../../data/solutionOrientations'
import { deriveCaseProfile, applyDriftUpdate } from '../../../engine/judgeProfileEngine'
import { generateVerdictSummary } from '../../../engine/verdictSummaryEngine'
import { buildDefaultAftermath, buildVerdictResultSnapshot } from '../../../engine/verdictHistorySnapshot'
import { pp이가 } from '../../../engine/koreanPostposition'
import { recordGameComplete } from '../../../hooks/useLocalStorage'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { GamePhase } from '../../../types'
import type { CaseData, LieState, VerdictInput } from '../../../types'
import { recordHistory } from '../../layout/HistoryPanel'
import CharacterFaceSvg from '../icons/CharacterFaceSvg'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { CAMPAIGN_STAGE_MAP, getCampaignStageKey } from '../../verdict/VerdictScreen'
import { triggerCutscene } from '../../discovery/CutsceneOverlay'
import { CUTSCENE_DURATION, shouldTriggerCutscene } from '../../../engine/cutsceneTriggerEngine'
import { useI18n, type LocaleCode, type MessageKey, type MessageValues } from '../../../i18n'
import { getResultRating } from '../result/resultCopy'
import { steamAchievements } from '../../../steam/steamServices'
import { emitVerdictSubmit } from '../../../telemetry/wirePoints'

type VerdictStep = 'fact' | 'responsibility' | 'solution' | 'confirm'
type FlatItem = { step: VerdictStep; subIdx: number }
type TFunction = (key: MessageKey, values?: MessageValues) => string

const LIE_STATE_RANK: Record<LieState, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }

const STEPS: { id: VerdictStep; labelKey: MessageKey }[] = [
  { id: 'fact', labelKey: 'pc.verdict.step.fact' },
  { id: 'responsibility', labelKey: 'pc.verdict.step.responsibility' },
  { id: 'solution', labelKey: 'pc.verdict.step.solution' },
  { id: 'confirm', labelKey: 'pc.verdict.step.confirm' },
]

function buildKeyMomentText(args: {
  caseData: CaseData
  verdictInput: VerdictInput
  agentALieMap: Record<string, { currentState: LieState }>
  agentBLieMap: Record<string, { currentState: LieState }>
  keyEvidenceNames: string[]
  avgPercentA: number
  locale: LocaleCode
}): string {
  const { caseData, verdictInput, agentALieMap, agentBLieMap, keyEvidenceNames, avgPercentA, locale } = args
  const candidates = caseData.disputes.flatMap((dispute) => {
    const aState = agentALieMap[dispute.id]?.currentState ?? 'S0'
    const bState = agentBLieMap[dispute.id]?.currentState ?? 'S0'
    return [
      { partyName: caseData.duo.partyA.name, disputeName: dispute.name, state: aState, finding: verdictInput.factFindings[dispute.id] },
      { partyName: caseData.duo.partyB.name, disputeName: dispute.name, state: bState, finding: verdictInput.factFindings[dispute.id] },
    ]
  }).sort((a, b) => LIE_STATE_RANK[b.state] - LIE_STATE_RANK[a.state])

  const confession = candidates.find((item) => item.state === 'S5' && item.finding !== 'pending')
  if (confession) {
    if (locale === 'en') return `${confession.partyName}'s confession about "${confession.disputeName}" became the point that fixed the responsibility split and resolution.`
    if (locale === 'ja') return `${confession.partyName}が「${confession.disputeName}」について感情を高ぶらせながら告白したことが、責任配分と解決方針を確定する基準になりました。`
    if (locale === 'zh-CN') return `${confession.partyName}围绕“${confession.disputeName}”情绪激动并作出承认，这段陈述成为确定责任分配和解决方向的依据。`
    return `${confession.partyName}${pp이가(confession.partyName)} "${confession.disputeName}" 쟁점과 관련해 감정이 격앙되며 자백했고, 그 진술이 책임 배분과 해결 방향을 확정하는 기준이 되었습니다.`
  }

  const pressured = candidates.find((item) => LIE_STATE_RANK[item.state] >= 3)
  if (pressured) {
    if (locale === 'en') {
      const statePhrase = pressured.state === 'S4'
        ? 'the answer breaking under mounting emotional pressure'
        : 'the answer losing consistency under pressure'
      return `${pressured.partyName}'s ${statePhrase} around "${pressured.disputeName}" was decisive. Because it did not reach a final confession, the verdict weighed the submitted evidence together with the selected responsibility split.`
    }
    if (locale === 'ja') {
      const statePhrase = pressured.state === 'S4'
        ? '感情が限界まで高まり供述が揺らいだ点'
        : '追い詰められる中で供述の一貫性が揺らいだ点'
      return `${pressured.partyName}について、「${pressured.disputeName}」をめぐる${statePhrase}が決定的でした。最終的な告白には至らなかったため、判決は提出された証拠と選択された責任比率をあわせて反映しました。`
    }
    if (locale === 'zh-CN') {
      const statePhrase = pressured.state === 'S4'
        ? '情绪被推到极限后陈述发生动摇'
        : '回答被逼入角后陈述一致性发生动摇'
      return `${pressured.partyName}围绕“${pressured.disputeName}”时，${statePhrase}成为关键。由于尚未进入最终承认，裁决同时参考了已提交证据和所选责任比例。`
    }
    const statePhrase = pressured.state === 'S4'
      ? '감정이 한계까지 밀리며 진술이 흔들린 점'
      : '답변이 궁지에 몰리며 진술의 일관성이 흔들린 점'
    return `${pressured.partyName}${pp이가(pressured.partyName)} "${pressured.disputeName}" 쟁점과 관련해 ${statePhrase}이 결정적이었습니다. 최종 자백까지 이르지는 않았기 때문에, 판결은 제출된 증거와 선택한 책임 비율을 함께 반영했습니다.`
  }

  if (keyEvidenceNames.length > 0) {
    if (locale === 'en') return `"${keyEvidenceNames[0]}" and the submitted evidence narrowed the gap between the claims.`
    if (locale === 'ja') return `「${keyEvidenceNames[0]}」などの提出証拠が、双方の主張の差を絞り込む基準になりました。`
    if (locale === 'zh-CN') return `“${keyEvidenceNames[0]}”等已提交证据成为缩小双方主张差距的依据。`
    return `"${keyEvidenceNames[0]}" 등 제출된 증거가 각 주장 사이의 차이를 좁히는 기준이 되었습니다.`
  }

  if (avgPercentA >= 55) {
    if (locale === 'en') return `The responsibility split placing greater weight on ${caseData.duo.partyA.name} shaped the direction of the verdict.`
    if (locale === 'ja') return `${caseData.duo.partyA.name}により重い責任を置いた配分が、判決の方向を分けました。`
    if (locale === 'zh-CN') return `将更大责任置于${caseData.duo.partyA.name}一方的责任分配，决定了裁决方向。`
    return `${caseData.duo.partyA.name}에게 더 큰 책임을 둔 책임 배분이 판결의 방향을 갈랐습니다.`
  }
  if (avgPercentA <= 45) {
    if (locale === 'en') return `The responsibility split placing greater weight on ${caseData.duo.partyB.name} shaped the direction of the verdict.`
    if (locale === 'ja') return `${caseData.duo.partyB.name}により重い責任を置いた配分が、判決の方向を分けました。`
    if (locale === 'zh-CN') return `将更大责任置于${caseData.duo.partyB.name}一方的责任分配，决定了裁决方向。`
    return `${caseData.duo.partyB.name}에게 더 큰 책임을 둔 책임 배분이 판결의 방향을 갈랐습니다.`
  }
  if (locale === 'en') return 'The verdict turned on a relatively even reading of both sides\' responsibility.'
  if (locale === 'ja') return '双方の責任を比較的均等に見た判断が、今回の判決の核心になりました。'
  if (locale === 'zh-CN') return '本次裁决的核心，是较为均衡地看待双方责任。'
  return '양측의 책임을 비교적 균등하게 본 판단이 이번 판결의 핵심 기준이 되었습니다.'
}

function getRelLabel(type: string): string {
  const map: Record<string, string> = { spouse: '부부', family: '가족', friend: '친구', neighbor: '이웃', partnership: '동업', workplace: '직장', tenant_landlord: '세입자' }
  return map[type] ?? type
}

function containsHangul(text: string): boolean {
  return /[가-힣]/.test(text)
}

function getSolutionCategoryLabel(
  catKey: string,
  labels: CaseData['solutionCategoryLabels'] | undefined,
  locale: LocaleCode,
  t: TFunction,
): string {
  const generatedLabel = labels?.[catKey]?.trim()
  if (generatedLabel && (locale === 'ko' || !containsHangul(generatedLabel))) {
    return generatedLabel
  }
  const mappedLabel = SOLUTION_CATEGORY_LABELS[locale][catKey]
  if (mappedLabel) return mappedLabel
  return locale === 'ko' ? catKey : t('pc.verdict.step.solution')
}

function getSolutionIcon(text: string): React.ReactNode {
  if (text.includes('배상') || text.includes('환불') || text.includes('변제'))
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#d4a24e" strokeWidth="1.5"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#d4a24e">$</text></svg>
  if (text.includes('사과') || text.includes('화해') || text.includes('관계'))
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 15l4-4 3 2 4-4 5 5" stroke="#d4a24e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  if (text.includes('계약') || text.includes('합의') || text.includes('조건'))
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#d4a24e" strokeWidth="1.5"/><line x1="9" y1="8" x2="15" y2="8" stroke="#d4a24e" strokeWidth="1" opacity="0.5"/><line x1="9" y1="12" x2="15" y2="12" stroke="#d4a24e" strokeWidth="1" opacity="0.5"/></svg>
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" stroke="#d4a24e" strokeWidth="1.5" fill="none"/></svg>
}

const SOLUTION_CATEGORY_LABELS: Record<LocaleCode, Record<string, string>> = {
  ko: {
    공동재산회복: '공동 재산 회복',
    신뢰순서분리: '신뢰 순서 분리',
    봉인정보경계: '봉인 정보 경계',
    관계재건: '관계 재건',
    역할재조정: '역할 재조정',
    소통구조개선: '소통 구조 개선',
    경계설정: '경계 설정',
    책임분담: '책임 분담',
    신뢰회복: '신뢰 회복',
    금전정리: '금전 정리',
    재정투명화: '재정 투명화',
    의사소통: '의사소통',
    생활규칙: '생활 규칙',
    법적정리: '법적 정리',
  },
  en: {
    공동재산회복: 'Shared Asset Recovery',
    신뢰순서분리: 'Separated Trust Steps',
    봉인정보경계: 'Sealed Information Boundary',
    관계재건: 'Relationship Repair',
    역할재조정: 'Role Adjustment',
    소통구조개선: 'Communication Structure',
    경계설정: 'Boundary Setting',
    책임분담: 'Responsibility Sharing',
    신뢰회복: 'Trust Recovery',
    금전정리: 'Financial Settlement',
    재정투명화: 'Financial Transparency',
    의사소통: 'Communication',
    생활규칙: 'Household Rules',
    법적정리: 'Legal Settlement',
  },
  ja: {
    공동재산회복: '共有財産の回復',
    신뢰순서분리: '信頼回復手順の分離',
    봉인정보경계: '封印情報の境界',
    관계재건: '関係の再構築',
    역할재조정: '役割の再調整',
    소통구조개선: '対話構造の改善',
    경계설정: '境界設定',
    책임분담: '責任分担',
    신뢰회복: '信頼回復',
    금전정리: '金銭整理',
    재정투명화: '財務の透明化',
    의사소통: '意思疎通',
    생활규칙: '生活ルール',
    법적정리: '法的整理',
  },
  'zh-CN': {
    공동재산회복: '共同财产恢复',
    신뢰순서분리: '信任步骤分离',
    봉인정보경계: '封存信息边界',
    관계재건: '关系重建',
    역할재조정: '角色再调整',
    소통구조개선: '沟通结构改善',
    경계설정: '边界设定',
    책임분담: '责任分担',
    신뢰회복: '信任恢复',
    금전정리: '金钱整理',
    재정투명화: '财务透明化',
    의사소통: '沟通',
    생활규칙: '生活规则',
    법적정리: '法律整理',
  },
}

/** Check if a dispute has been "discovered" (either party's lieState reached S3+) */
function isDisputeDiscovered(
  disputeId: string,
  lieStateMapA: Record<string, { currentState: string }>,
  lieStateMapB: Record<string, { currentState: string }>,
): boolean {
  const stateNum = (s: string) => {
    const n = parseInt(s.replace('S', ''), 10)
    return isNaN(n) ? 0 : n
  }
  const aState = lieStateMapA[disputeId]?.currentState
  const bState = lieStateMapB[disputeId]?.currentState
  return (aState != null && stateNum(aState) >= 3) || (bState != null && stateNum(bState) >= 3)
}

/** Generate shuffled indices [0..n-1] using Fisher-Yates with a stable seed */
function seededShuffle(seed: string, count: number): number[] {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash + seed.charCodeAt(i)) | 0
  }
  const arr = Array.from({ length: count }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) | 0
    const j = ((hash >>> 0) % (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/** Build 4 options for a dispute */
function buildFactOptions(
  dispute: { id: string; name: string; truthDescription: string; judgmentStatement?: string; verdictOptions?: { wrong: string; partial: string; truth: string; defer: string } },
  nameA: string,
  nameB: string,
  discovered: boolean,
  t: TFunction,
) {
  // 스크립트 생성된 선택지가 있으면 사용
  const vo = dispute.verdictOptions

  const option1Text = vo?.wrong
    ?? (dispute.judgmentStatement
      ? t('pc.verdict.factOption.partyClaimCorrectWithContradiction', { party: nameA })
      : t('pc.verdict.factOption.partyClaimCorrect', { party: nameA }))
  const option2Text = vo?.partial ?? t('pc.verdict.factOption.partial')
  const option3Text = vo?.truth ?? dispute.judgmentStatement ?? dispute.truthDescription
  const option4Text = vo?.defer ?? t('pc.verdict.factOption.defer')

  // Shuffle options 1-3, keep option 4 last
  const shuffledFirst3 = seededShuffle(dispute.id, 3)

  type FactOptionKey = 'wrong' | 'partial' | 'truth' | 'defer'
  type FactOption = { key: FactOptionKey; text: string; mapping: 'true' | 'false' | 'pending'; weight: number; locked?: boolean }

  const baseOptions: FactOption[] = [
    { key: 'wrong', text: option1Text, mapping: 'false', weight: 0 },
    { key: 'partial', text: option2Text, mapping: 'pending', weight: 60 },
    { key: 'truth', text: option3Text, mapping: 'true', weight: 100, locked: !discovered },
  ]

  const shuffled: FactOption[] = shuffledFirst3.map((i) => baseOptions[i])
  shuffled.push({ key: 'defer', text: option4Text, mapping: 'pending', weight: 30 })

  return shuffled
}

/** Seesaw-style scale SVG that tilts based on percentage */
function ScaleSVG({ percentA, nameA, nameB, caseId }: { percentA: number; nameA: string; nameB: string; caseId: string }) {
  // percentA가 높으면 A(왼쪽)가 무거워서 내려감 → 음수 tilt = 왼쪽 내려감
  const tilt = -((percentA - 50) / 50) * 12
  const blueColor = '#4a6fa5'  // 플레이 톤과 맞춘 다운된 블루
  const redColor = '#a84f4f'   // 플레이 톤과 맞춘 다운된 레드
  return (
    <svg width="420" height="220" viewBox="0 0 420 220" style={{ display: 'block', margin: '12px auto' }}>
      {/* fulcrum */}
      <polygon points="210,160 192,188 228,188" fill="#8b6f3d" opacity="0.7" />
      <rect x="175" y="188" width="70" height="5" rx="2" fill="#8b6f3d" opacity="0.35" />
      {/* tilting beam group */}
      <g transform={`rotate(${tilt}, 210, 156)`}>
        {/* beam */}
        <rect x="50" y="154" width="320" height="6" rx="3" fill="#8b6f3d" />
        {/* left side — 동그란 테두리 + 초상화 */}
        <circle cx="100" cy="118" r="32" fill="rgba(74, 111, 165, 0.12)" stroke={blueColor} strokeWidth="1.8" />
        <clipPath id="clip-verdict-a">
          <circle cx="100" cy="118" r="30" />
        </clipPath>
        <foreignObject x="70" y="88" width="60" height="60" clipPath="url(#clip-verdict-a)">
          <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden' }}>
            <PCCharacterPortrait alt={nameA} caseId={caseId} emotion="defensive" fallbackSymbolId="i-person" party="a" size={60} />
          </div>
        </foreignObject>
        <text x="100" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill={blueColor}>{nameA}</text>
        {/* right side */}
        <circle cx="320" cy="118" r="32" fill="rgba(168, 79, 79, 0.12)" stroke={redColor} strokeWidth="1.8" />
        <clipPath id="clip-verdict-b">
          <circle cx="320" cy="118" r="30" />
        </clipPath>
        <foreignObject x="290" y="88" width="60" height="60" clipPath="url(#clip-verdict-b)">
          <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden' }}>
            <PCCharacterPortrait alt={nameB} caseId={caseId} emotion="defensive" fallbackSymbolId="i-person" party="b" size={60} />
          </div>
        </foreignObject>
        <text x="320" y="70" textAnchor="middle" fontSize="11" fontWeight="800" fill={redColor}>{nameB}</text>
      </g>
    </svg>
  )
}

export default function PCVerdictScreen() {
  const { t, locale } = useI18n()
  const [globalIdx, setGlobalIdx] = useState(0)
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitLockRef = useRef(false)
  // Track selected option key per dispute for fact step
  const [factSelections, setFactSelections] = useState<Record<string, string>>({})
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const setVerdictScore = useStore((s) => s.setVerdictScore)
  const setVerdictSummary = useStore((s) => s.setVerdictSummary)
  const advancePhase = useStore((s) => s.advancePhase)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const turnCount = useStore((s) => s.turnCount)
  const resources = useStore((s) => s.resources)
  const agentALieMap = useStore((s) => s.agentA.lieStateMap)
  const agentBLieMap = useStore((s) => s.agentB.lieStateMap)
  if (!caseData) {
    return null
  }

  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const disputes = caseData.disputes.filter((d) => {
    const vis = disputeVisibility[d.id]
    return !vis || vis.visibility !== 'hidden'
  })
  const activeDisputes = disputes.filter(
    (item) => verdictInput.factFindings[item.id] && verdictInput.factFindings[item.id] !== 'pending',
  )
  const solutionCategories = Object.keys(caseData.solutions)
  const factCount = Object.keys(verdictInput.factFindings).length
  const allFactsJudged = factCount >= disputes.length

  const flatSteps: FlatItem[] = useMemo(
    () => [
      ...disputes.map((_, index) => ({ step: 'fact' as VerdictStep, subIdx: index })),
      ...activeDisputes.map((_, index) => ({ step: 'responsibility' as VerdictStep, subIdx: index })),
      ...solutionCategories.map((_, index) => ({ step: 'solution' as VerdictStep, subIdx: index })),
      { step: 'confirm' as VerdictStep, subIdx: 0 },
    ],
    [activeDisputes, disputes, solutionCategories],
  )

  const safeGlobalIdx = Math.min(globalIdx, flatSteps.length - 1)
  const current = flatSteps[safeGlobalIdx]
  const currentStep = current.step
  const visibleSteps = STEPS

  const currentStepIndex = visibleSteps.findIndex((item) => item.id === currentStep)

  const handleSubmit = () => {
    if (submitLockRef.current) return
    submitLockRef.current = true
    setIsSubmitting(true)
    playGavel()
    const runtimeState = useGameStore.getState()
    const processMetrics = runtimeState.processMetrics
    const score = calculateVerdict({
      disputes: caseData.disputes,
      evidence: caseData.evidence,
      evidenceStates,
      input: verdictInput,
      turnsUsed: turnCount,
      courtControlRemaining: resources.courtControl,
      processMetrics,
      clearanceState: runtimeState,
    })

    // Phase 6 중재 유형별 점수 보정 — 에러 시에도 summary 생성 보장
    try {
    const mediationChoice = runtimeState.mediationChoice
    const responsibilityValues = Object.values(verdictInput.responsibility) as { a: number; b: number }[]
    const gapAvg = responsibilityValues.length > 0
      ? responsibilityValues.reduce((sum, r) => sum + Math.abs(r.a - r.b), 0) / responsibilityValues.length
      : 0
    const pendingCount = Object.values(verdictInput.factFindings).filter(v => v === 'pending').length
    const highWeightDisputes = caseData.disputes.filter(d => d.ambiguity === 'high')
    const resolvedHighWeight = highWeightDisputes.filter(d => verdictInput.factFindings[d.id] && verdictInput.factFindings[d.id] !== 'pending').length

    const mediationCtx: MediationScoreContext = {
      resolved_high_weight_count: resolvedHighWeight,
      high_weight_total: highWeightDisputes.length,
      pending_count: pendingCount,
      total_disputes: caseData.disputes.length,
      turnsUsed: turnCount,
      illegal_evidence_admitted_count: Object.values(verdictInput.evidenceLegality ?? {}).filter(v => v === true).length,
      extreme_blame_dispute_count: responsibilityValues.filter(r => Math.abs(r.a - r.b) >= 80).length,
      selected_solutions_count: verdictInput.selectedSolutions.length,
      ...(() => {
        // solutionOrientations 기반 태그 분류
        const orientations = verdictInput.selectedSolutions.map(entry => {
          const sep = entry.indexOf('::')
          if (sep < 0) return 'hybrid' as const
          return getSolutionOrientationByText(
            caseData.caseId, entry.slice(0, sep), entry.slice(sep + 2), caseData.solutions,
          )
        })
        const principleCount = orientations.filter(o => o === 'principle').length
        const reconcileCount = orientations.filter(o => o === 'reconcile').length
        const hasBothSides = principleCount > 0 && reconcileCount > 0
        return {
          selected_final_solution_count: principleCount,
          selected_temporary_solution_count: orientations.filter(o => o === 'hybrid').length,
          selected_mutual_solution_count: reconcileCount,
          selected_one_sided_solution_count: principleCount >= 2 && reconcileCount === 0 ? principleCount : 0,
          selected_solution_side_coverage: hasBothSides ? 'both' as const : reconcileCount > 0 ? 'a_only' as const : principleCount > 0 ? 'b_only' as const : 'none' as const,
          selected_fact_record_solution_count: principleCount,
        }
      })(),
      responsibility_gap_average: gapAvg,
      high_ambiguity_pending_count: highWeightDisputes.filter(d => verdictInput.factFindings[d.id] === 'pending').length,
      resolved_low_or_medium_ambiguity_count: caseData.disputes.filter(d => d.ambiguity !== 'high' && verdictInput.factFindings[d.id] && verdictInput.factFindings[d.id] !== 'pending').length,
      discovered_privacy_evidence_count: (caseData.evidence ?? []).filter(
        e => e.legitimacy === 'privacy_concern' && evidenceStates[e.id]?.presented,
      ).length,
      evidence_legality_judged_count: Object.keys(verdictInput.evidenceLegality ?? {}).length,
      confidential_evidence_protected_count: (caseData.evidence ?? []).filter(
        e => evidenceStates[e.id]?.confidentialSource && evidenceStates[e.id]?.presented,
      ).length,
    }

    const mediationDelta = computeMediationScoreModifiers(mediationChoice, mediationCtx)
    score.insight = Math.max(0, Math.min(100, score.insight + mediationDelta.insight))
    score.authority = Math.max(0, Math.min(100, score.authority + mediationDelta.authority))
    score.wisdom = Math.max(0, Math.min(100, score.wisdom + mediationDelta.wisdom))
    score.total = Math.round((score.insight + score.authority + score.wisdom) / 3)

    setVerdictScore(score)
    emitVerdictSubmit(`score_${score.total}`, score.total, caseData.caseId)
    void steamAchievements.unlock('ACH_FIRST_CASE_CLEARED')

    const keyEvidenceNames = caseData.evidence
      .filter((item) => evidenceStates[item.id]?.presented)
      .map((item) => item.name)

    const state = runtimeState
    let keyTransition: { party: string; from: string; to: string } | null = null

    for (const value of Object.values(state.agentA.lieStateMap)) {
      if (value.currentState === 'S5') {
        keyTransition = { party: caseData.duo.partyA.name, from: 'S4', to: 'S5' }
        break
      }
    }

    if (!keyTransition) {
      for (const value of Object.values(state.agentB.lieStateMap)) {
        if (value.currentState === 'S5') {
          keyTransition = { party: caseData.duo.partyB.name, from: 'S4', to: 'S5' }
          break
        }
      }
    }

    const responsibilityEntries = Object.values(verdictInput.responsibility) as { a: number; b: number }[]
    const avgPercentA = responsibilityEntries.length > 0
      ? Math.round(responsibilityEntries.reduce((sum, item) => sum + item.a, 0) / responsibilityEntries.length)
      : 50

    const judgeTitle = getResultRating(score.total, locale)

    const summary = generateVerdictSummary({
      caseName: caseData.context.description || caseData.caseId,
      partyAName: caseData.duo.partyA.name,
      partyBName: caseData.duo.partyB.name,
      percentA: avgPercentA,
      selectedSolution: verdictInput.selectedSolutions.join(', '),
      keyEvidenceNames,
      keyTransition,
      keyMomentText: buildKeyMomentText({
        caseData,
        verdictInput,
        agentALieMap: state.agentA.lieStateMap,
        agentBLieMap: state.agentB.lieStateMap,
        keyEvidenceNames,
        avgPercentA,
        locale,
      }),
      judgeTitle,
      totalTurns: turnCount,
      contradictionsFound: processMetrics.lieTransitions,
      locale,
    })
    setVerdictSummary(summary)

    recordGameComplete(caseData.caseId, score.total)

    const disputeNames: Record<string, string> = {}
    caseData.disputes.forEach((item) => {
      disputeNames[item.id] = item.name
    })

    const caseTelemetry = deriveCaseProfile(
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

    const currentDrift = loadDriftState()
    const newDrift = applyDriftUpdate(
      currentDrift,
      caseTelemetry,
      processMetrics,
      verdictInput.selectedSolutions.length,
    )
    saveDriftState(newDrift)

    const initialAftermath = buildDefaultAftermath(caseData, score, verdictInput, locale)
    const resultSnapshot = buildVerdictResultSnapshot({
      caseData,
      verdictInput,
      score,
      verdictSummary: summary,
      aftermath: initialAftermath,
      locale,
    })

    recordHistory({
      caseId: caseData.caseId,
      score: score.total,
      insight: score.insight,
      authority: score.authority,
      wisdom: score.wisdom,
      relationshipType: caseData.duo.relationshipType,
      nameA: caseData.duo.partyA.name,
      nameB: caseData.duo.partyB.name,
      verdictDetail: {
        factFindings: { ...verdictInput.factFindings },
        responsibility: { ...verdictInput.responsibility },
        selectedSolutions: [...verdictInput.selectedSolutions],
        disputeNames,
        verdictSummary: summary,
        aftermath: initialAftermath,
      },
      resultSnapshot,
      caseTelemetry,
    })

    const stageKey = getCampaignStageKey(caseData.caseId, caseData.meta?.relationshipType ?? caseData.duo.relationshipType)
    const stage = CAMPAIGN_STAGE_MAP[stageKey]
    if (stage) {
      completeStage(stage, score.total)
    }

    checkAndGrantRewards()
    } catch (err) {
      console.error('[Verdict] mediation/summary error:', err)
      // 에러 시에도 기본 summary 생성
      if (!useGameStore.getState().verdictSummary) {
        setVerdictSummary(generateVerdictSummary({
          caseName: caseData.context.description || caseData.caseId,
          partyAName: caseData.duo.partyA.name,
          partyBName: caseData.duo.partyB.name,
          percentA: 50,
          selectedSolution: verdictInput.selectedSolutions.join(', '),
          keyEvidenceNames: [],
          keyTransition: null,
          judgeTitle: getResultRating(50, locale),
          totalTurns: turnCount,
          contradictionsFound: 0,
          locale,
        }))
      }
    }
    const verdictCutscene = shouldTriggerCutscene('verdict_gavel', runtimeState.turnCount, {
      score: score.total,
      caseId: caseData.caseId,
      phase: runtimeState.currentPhase,
    })
    if (verdictCutscene) {
      triggerCutscene(verdictCutscene)
      window.setTimeout(() => advancePhase(GamePhase.Result), CUTSCENE_DURATION.verdict_gavel)
    } else {
      advancePhase(GamePhase.Result)
    }
  }

  const summaryDisputes = caseData.disputes.filter((d) => {
    const vis = disputeVisibility[d.id]
    return !vis || vis.visibility !== 'hidden'
  }).map((item) => {
    const fact = verdictInput.factFindings[item.id]
    const responsibility = verdictInput.responsibility[item.id]
    return {
      id: item.id,
      name: item.name,
      fact,
      responsibility,
    }
  })

  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name

  return (
    <div className="pc-verdict-screen">
      <div className="pc-verdict-shell">
        <aside className="pc-verdict-sidebar">
          <div className="pc-verdict-sidebar__eyebrow">{t('pc.verdict.sidebar.eyebrow')}</div>
          <h1>{t('pc.verdict.title.final')}</h1>
          <p className="pc-verdict-sidebar__summary">{caseData.context.description}</p>

          <div className="pc-verdict-sidebar__meta">
            <div className="pc-verdict-sidebar__meta-card">
              <span>{t('pc.verdict.meta.disputes')}</span>
              <strong>{t('pc.verdict.meta.count', { count: caseData.disputes.length })}</strong>
            </div>
            <div className="pc-verdict-sidebar__meta-card">
              <span>{t('pc.verdict.meta.solutions')}</span>
              <strong>{t('pc.verdict.meta.count', { count: verdictInput.selectedSolutions.length })}</strong>
            </div>
            <div className="pc-verdict-sidebar__meta-card">
              <span>{t('pc.verdict.meta.turns')}</span>
              <strong>{turnCount}</strong>
            </div>
          </div>

          <div className="pc-verdict-sidebar__steps">
            {visibleSteps.map((item, index) => (
              <button
                className={`pc-verdict-step-link${currentStep === item.id ? ' is-active' : currentStepIndex > index ? ' is-done' : ''}`}
                key={item.id}
                onClick={() => {
                  const nextIdx = flatSteps.findIndex((step) => step.step === item.id)
                  if (nextIdx >= 0) setGlobalIdx(nextIdx)
                }}
                type="button"
              >
                <strong>{t(item.labelKey)}</strong>
              </button>
            ))}
          </div>
        </aside>

        <section className="pc-verdict-main">
          <div className="pc-verdict-rail">
            {visibleSteps.map((item, index) => (
              <button
                className={`pc-verdict-rail__chip${currentStep === item.id ? ' is-active' : currentStepIndex > index ? ' is-done' : ''}`}
                key={item.id}
                onClick={() => {
                  const nextIdx = flatSteps.findIndex((step) => step.step === item.id)
                  if (nextIdx >= 0) setGlobalIdx(nextIdx)
                }}
                type="button"
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>

          <div className="pc-verdict-stage">
            {/* ── STEP 1: 쟁점 판단 (multiple choice) ── */}
            {currentStep === 'fact' ? (() => {
              const dispute = disputes[current.subIdx]
              if (!dispute) return null
              const discovered = isDisputeDiscovered(
                dispute.id,
                agentALieMap as Record<string, { currentState: string }>,
                agentBLieMap as Record<string, { currentState: string }>,
              )
              const options = buildFactOptions(dispute, nameA, nameB, discovered, t)
              const selectedKey = factSelections[dispute.id]

              return (
                <div className="pc-verdict-fact">
                  <div className="pc-verdict-fact__header">
                    <h2 className="pc-verdict-fact__title">{dispute.name}</h2>
                    <p className="pc-verdict-fact__subtitle">{t('pc.verdict.fact.subtitle')}</p>
                  </div>
                  <div className="pc-verdict-fact__options">
                    {options.map((opt, idx) => {
                      const isLocked = 'locked' in opt && opt.locked
                      const isSelected = selectedKey === opt.key
                      return (
                        <button
                          className={`pc-verdict-fact__option${isSelected ? ' is-selected' : ''}${isLocked ? ' is-locked' : ''}`}
                          key={idx}
                          disabled={isLocked}
                          onClick={() => {
                            if (isLocked) return
                            setFactSelections((prev) => ({ ...prev, [dispute.id]: opt.key }))
                            // 선택한 텍스트를 전역에 저장 — 결과 화면에서 사용
                            const stored = (window as any).__factSelectedTexts ?? {}
                            stored[dispute.id] = opt.text
                            ;(window as any).__factSelectedTexts = stored
                            useGameStore.getState().setFactFinding(dispute.id, opt.mapping)
                            if (autoAdvanceEnabled && current.subIdx < disputes.length - 1) {
                              setTimeout(() => {
                                const nextIdx = flatSteps.findIndex((s) => s.step === 'fact' && s.subIdx === current.subIdx + 1)
                                if (nextIdx >= 0) setGlobalIdx(nextIdx)
                              }, 500)
                            }
                          }}
                          type="button"
                        >
                          <span className="pc-verdict-fact__option-radio">
                            {isLocked ? (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="7" width="8" height="7" rx="1.5" stroke="#6a6e80" strokeWidth="1.2"/><path d="M6 7V5a2 2 0 014 0v2" stroke="#6a6e80" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            ) : isSelected ? (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="var(--pc-gold-light)" strokeWidth="1.5"/><circle cx="8" cy="8" r="3.5" fill="var(--pc-gold-light)"/></svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#6a6e80" strokeWidth="1.5"/></svg>
                            )}
                          </span>
                          <span className="pc-verdict-fact__option-text">
                            {isLocked ? t('pc.verdict.fact.locked') : opt.text}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })() : null}

            {/* ── STEP 2: 안건 책임 ── */}
            {currentStep === 'responsibility' ? (() => {
              const dispute = activeDisputes[current.subIdx]
              if (!dispute) return null
              const resp = verdictInput.responsibility[dispute.id] ?? { a: 50, b: 50 }
              return (
                <div className="pc-verdict-resp">
                  <div className="pc-verdict-resp__header">
                    <h2 className="pc-verdict-resp__title">{dispute.name}</h2>
                    <p className="pc-verdict-resp__subtitle">{t('pc.verdict.responsibility.subtitle')}</p>
                  </div>
                  <div className="pc-verdict-resp__slider-area">
                    <span className="pc-verdict-resp__label is-a">
                      <span className="pc-verdict-resp__avatar is-a">
                        <PCCharacterPortrait alt={nameA} caseId={caseData.caseId} emotion="defensive" fallbackSymbolId="i-person" party="a" size={36} />
                      </span>
                      {nameA}
                    </span>
                    <div className="pc-verdict-resp__track" style={{ '--a-pct': `${resp.a}%` } as React.CSSProperties}>
                      <input
                        className="pc-verdict-resp__input"
                        max={100}
                        min={0}
                        onChange={(e) => {
                          const a = Number(e.target.value)
                          useGameStore.getState().setResponsibility(dispute.id, a, 100 - a)
                        }}
                        type="range"
                        value={resp.a}
                      />
                      <div className="pc-verdict-resp__fill" style={{ width: `${resp.a}%` }} />
                    </div>
                    <span className="pc-verdict-resp__label is-b">
                      <span className="pc-verdict-resp__avatar is-b">
                        <PCCharacterPortrait alt={nameB} caseId={caseData.caseId} emotion="defensive" fallbackSymbolId="i-person" party="b" size={36} />
                      </span>
                      {nameB}
                    </span>
                  </div>
                  <div className="pc-verdict-resp__percent">
                    <span className="is-a">{resp.a}%</span>
                    <span className="is-b">{resp.b}%</span>
                  </div>
                  <ScaleSVG percentA={resp.a} nameA={nameA} nameB={nameB} caseId={caseData.caseId} />
                  <div className="pc-verdict-resp__direction">
                    {resp.a >= 80 ? t('pc.verdict.responsibility.major', { party: nameA })
                     : resp.a >= 60 ? t('pc.verdict.responsibility.greater', { party: nameA })
                     : resp.a >= 40 ? t('pc.verdict.responsibility.similar')
                     : resp.a >= 20 ? t('pc.verdict.responsibility.greater', { party: nameB })
                     : t('pc.verdict.responsibility.major', { party: nameB })}
                  </div>
                </div>
              )
            })() : null}

            {/* ── STEP 3: 해결안 ── */}
            {currentStep === 'solution' ? (() => {
              const catKey = solutionCategories[current.subIdx]
              const options = caseData.solutions[catKey] ?? []
              const catLabel = getSolutionCategoryLabel(catKey, caseData.solutionCategoryLabels, locale, t)
              return (
                <div className="pc-verdict-solution">
                  <div className="pc-verdict-solution__header">
                    <h2 className="pc-verdict-solution__subtitle" style={{ fontSize: 26, fontWeight: 900, color: '#f2efe8', margin: 0 }}>{catLabel}</h2>
                    <p className="pc-verdict-solution__hint" style={{ marginTop: 8 }}>{t('pc.verdict.solution.multiSelectHint')}</p>
                  </div>
                  <div className="pc-verdict-solution__grid">
                    {options.map((opt, i) => {
                      const selected = verdictInput.selectedSolutions.includes(opt)
                      return (
                        <button
                          className={`pc-verdict-solution__card${selected ? ' is-selected' : ''}`}
                          key={i}
                          onClick={() => {
                            const store = useGameStore.getState()
                            if (selected) { store.removeSolution(opt) } else { store.selectSolution(opt) }
                          }}
                          type="button"
                        >
                          <span className="pc-verdict-solution__icon">{getSolutionIcon(opt)}</span>
                          <span>{opt}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })() : null}

            {/* ── STEP 4: 판결문 (confirm) ── */}
            {currentStep === 'confirm' ? (() => {
              return (
                <div className="pc-verdict-confirm">
                  <div className="pc-verdict-confirm__cards">
                    {summaryDisputes.map((item) => {
                      const resp = verdictInput.responsibility[item.id]
                      return (
                        <div className="pc-verdict-confirm__card" key={item.id}>
                          <strong className="pc-verdict-confirm__card-name">{item.name}</strong>
                          {resp ? (
                            <div className="pc-verdict-confirm__card-scale">
                              <ScaleSVG percentA={resp.a} nameA={nameA} nameB={nameB} caseId={caseData.caseId} />
                            </div>
                          ) : null}
                          <span className={`pc-verdict-confirm__badge is-${item.fact ?? 'none'}`}>
                            {item.fact === 'true' ? t('pc.verdict.confirm.badge.true')
                             : item.fact === 'false' ? t('pc.verdict.confirm.badge.false')
                             : item.fact === 'pending' ? t('pc.verdict.confirm.badge.pending')
                             : t('pc.verdict.confirm.badge.none')}
                          </span>
                          <span className="pc-verdict-confirm__card-judgment">
                            {item.fact === 'true' ? t('pc.verdict.confirm.judgment.true', { name: item.name })
                             : item.fact === 'false' ? t('pc.verdict.confirm.judgment.false', { name: item.name })
                             : t('pc.verdict.confirm.judgment.pending')}
                          </span>
                        </div>
                      )
                    })}
                  </div>

                  {verdictInput.selectedSolutions.length > 0 ? (
                    <div className="pc-verdict-confirm__solutions">
                      <h3>{t('pc.verdict.confirm.selectedSolutions')}</h3>
                      {verdictInput.selectedSolutions.map((sol, i) => (
                        <div className="pc-verdict-confirm__sol" key={i}>{sol}</div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )
            })() : null}
          </div>

          {/* ── Unified Footer ── */}
          <div className="pc-verdict-footer">
            <button
              className="pc-verdict-footer__button"
              disabled={safeGlobalIdx === 0}
              onClick={() => { setAutoAdvanceEnabled(false); setGlobalIdx(Math.max(safeGlobalIdx - 1, 0)) }}
              type="button"
            >
              {t('pc.verdict.footer.previous')}
            </button>

            <span className="pc-verdict-footer__indicator">
              {currentStepIndex + 1} / {visibleSteps.length}
            </span>

            {currentStep === 'confirm' ? (
              <button
                className="pc-verdict-footer__button is-primary"
                disabled={!allFactsJudged || isSubmitting}
                onClick={handleSubmit}
                type="button"
              >
                {isSubmitting ? t('pc.verdict.footer.submitting') : allFactsJudged ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{marginRight: 6}}>
                      <path d="M4 20h16M8 14l-4 6M12 6l6 6-8 8-6-6 8-8zM14 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t('pc.verdict.footer.submit')}
                  </>
                ) : t('pc.verdict.footer.judgeAllFirst', { current: factCount, total: disputes.length })}
              </button>
            ) : (
              <button
                className={`pc-verdict-footer__button is-primary${currentStep === 'solution' && verdictInput.selectedSolutions.length > 0 ? ' is-gold-glow' : ''}`}
                onClick={() => { setAutoAdvanceEnabled(true); setGlobalIdx(Math.min(safeGlobalIdx + 1, flatSteps.length - 1)) }}
                type="button"
              >
                {t('pc.verdict.footer.next')}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

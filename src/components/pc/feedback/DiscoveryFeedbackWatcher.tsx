import { useCallback, useEffect, useRef } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import { resetFatigueForDossier } from '../../../engine/questionFatigueEngine'
import { getContradictionEvent, getInterjectionEvent, getOutburstEvent } from '../../../engine/v3GameLoopLoader'
import { applyWitnessSlot } from '../../../hooks/useActionDispatch'
import { recordInterjectionChoice } from '../../../engine/phase3LogCollector'
import { fixPostpositions, postposition } from '../../../engine/koreanPostposition'
import { useI18n, type MessageKey, type MessageValues } from '../../../i18n'
import type { TruthJudgment } from '../../../types/discovery'
import type { EventFeedbackVisualEffect } from '../../../store/slices/eventFeedbackSlice'
import { getEmergenceHook, getEmergenceHookSpeaker } from '../../../data/emergenceHooks'
import { getSafeEmergenceTitle } from '../../../data/safeEmergenceCopy'
import { hasContradictionComparison } from '../../../utils/contradiction'
import type { Dispute } from '../../../types/case'
import { afterDisputeRibbonExpansion, requestDisputeRibbonExpansion } from '../layout/disputeRibbonEvents'
import { shouldPlayImpactBeat } from '../../../engine/vfxHierarchyEngine'

type FeedbackT = (key: MessageKey, values?: MessageValues) => string

/**
 * Discovery 9종 pending 상태를 감시해 통합 피드백 큐로 보내는 Watcher.
 * 기존 PCDiscoveryOverlay 의 각 Panel 을 큐 기반 카드로 치환.
 */

const ROUTE_LABEL_KEYS: Record<string, MessageKey> = {
  evidence: 'pc.discovery.feedback.route.evidence',
  truth_confrontation: 'pc.discovery.feedback.route.truthConfrontation',
  witness: 'pc.discovery.feedback.route.witness',
  lie_collapse: 'pc.discovery.feedback.route.lieCollapse',
  emotional_slip: 'pc.discovery.feedback.route.emotionalSlip',
  interjection: 'pc.discovery.feedback.route.interjection',
}

const DISPUTE_WEIGHT_LABEL_KEYS: Record<string, MessageKey> = {
  high: 'pc.discovery.feedback.dispute.weight.high',
  medium: 'pc.discovery.feedback.dispute.weight.medium',
  low: 'pc.discovery.feedback.dispute.weight.low',
}

const DISPUTE_AMBIGUITY_LABEL_KEYS: Record<string, MessageKey> = {
  high: 'pc.discovery.feedback.dispute.ambiguity.high',
  medium: 'pc.discovery.feedback.dispute.ambiguity.medium',
  mid: 'pc.discovery.feedback.dispute.ambiguity.mid',
  low: 'pc.discovery.feedback.dispute.ambiguity.low',
  none: 'pc.discovery.feedback.dispute.ambiguity.none',
}

function isSpousePrivateAccountWithdrawalDispute(dispute: Dispute | undefined): boolean {
  const text = `${dispute?.id ?? ''} ${dispute?.name ?? ''}`
  return /남편\s*명의.*계좌.*목돈\s*출금/.test(text)
    || /개인\s*계좌.*출금/.test(text)
    || /비밀\s*계좌.*목돈/.test(text)
}

function isT3ClimaxDispute(caseId: string | undefined, dispute: (Dispute & { tier?: string; visualImpact?: string }) | undefined): boolean {
  const normalizedCaseId = String(caseId ?? '').replace(/^case-/, '')
  return normalizedCaseId === 'spouse-01' &&
    dispute?.id === 'h-d3' &&
    (dispute.tier === 'T3' || dispute.visualImpact === 'climactic')
}

function translateMappedLabel(t: FeedbackT, map: Record<string, MessageKey>, value: string | undefined): string | undefined {
  if (!value) return undefined
  const key = map[value]
  return key ? t(key) : value
}

function fixFeedbackPostpositions(text: string): string {
  const withQuotedParticles = text
    .replace(/"([^"]+)"이\(가\)/g, (_match, word: string) => `"${word}"${postposition(word, '이', '가')}`)
    .replace(/"([^"]+)"을\(를\)/g, (_match, word: string) => `"${word}"${postposition(word, '을', '를')}`)
    .replace(/"([^"]+)"은\(는\)/g, (_match, word: string) => `"${word}"${postposition(word, '은', '는')}`)
    .replace(/"([^"]+)"과\(와\)/g, (_match, word: string) => `"${word}"${postposition(word, '과', '와')}`)
  return fixPostpositions(withQuotedParticles)
}

function buildJudgmentLabel(value: TruthJudgment, partyA: string, partyB: string, t: FeedbackT): string {
  if (value === 'believe_a') return t('pc.discovery.feedback.judgment.believeParty', { party: partyA })
  if (value === 'believe_b') return t('pc.discovery.feedback.judgment.believeParty', { party: partyB })
  if (value === 'both_partial') return t('pc.discovery.feedback.judgment.bothPartial')
  return t('pc.discovery.feedback.judgment.undetermined')
}

function buildDisputeEmergenceDetails(
  dispute: Dispute | undefined,
  routeDescription: string | undefined,
  displayName: string | undefined,
  t: FeedbackT,
  tp: FeedbackT,
) {
  const name = displayName ?? dispute?.name ?? t('pc.discovery.feedback.dispute.defaultName')

  if (isSpousePrivateAccountWithdrawalDispute(dispute)) {
    const surfaceSummary = t('pc.discovery.feedback.dispute.privateWithdrawalSummary')
    return {
      body: surfaceSummary,
      blocks: [],
      meta: [],
      notebookSummary: surfaceSummary,
      observationSummary: surfaceSummary,
    }
  }

  const axis = name
  const evidenceCount = dispute?.requiredEvidence?.length ?? 0
  const evidenceText = evidenceCount > 0
    ? t('pc.discovery.feedback.dispute.evidenceText.withCount', { count: evidenceCount })
    : t('pc.discovery.feedback.dispute.evidenceText.fallback')
  const legalText = dispute?.legitimacyIssue
    ? t('pc.discovery.feedback.dispute.legalText.withIssue')
    : t('pc.discovery.feedback.dispute.legalText.fallback')

  const blocks = [
    {
      title: t('pc.discovery.feedback.dispute.block.axisTitle'),
      text: tp('pc.discovery.feedback.dispute.block.axisText', { axis }),
    },
    {
      title: t('pc.discovery.feedback.dispute.block.confirmDirection'),
      text: evidenceText,
    },
    {
      title: dispute?.legitimacyIssue
        ? t('pc.discovery.feedback.dispute.block.procedureResponsibility')
        : t('pc.discovery.feedback.dispute.block.judgmentStatus'),
      text: legalText,
    },
  ]

  const weightLabel = translateMappedLabel(t, DISPUTE_WEIGHT_LABEL_KEYS, dispute?.weight)
  const ambiguityLabel = translateMappedLabel(t, DISPUTE_AMBIGUITY_LABEL_KEYS, dispute?.ambiguity)
  const meta = [
    weightLabel ? t('pc.discovery.feedback.dispute.meta.weight', { weight: weightLabel }) : null,
    ambiguityLabel ? t('pc.discovery.feedback.dispute.meta.ambiguity', { ambiguity: ambiguityLabel }) : null,
    evidenceCount > 0 ? t('pc.discovery.feedback.dispute.meta.requiredEvidence', { count: evidenceCount }) : null,
  ].filter(Boolean) as string[]

  const routeLine = routeDescription?.trim()
  const body = routeLine
    ? tp('pc.discovery.feedback.dispute.body.withRoute', { route: routeLine, name })
    : tp('pc.discovery.feedback.dispute.body.added', { name })
  const notebookSummary = `${axis}. ${evidenceText} ${legalText}`.slice(0, 150)
  const observationSummary = `${name} - ${axis}`

  return { body, blocks, meta, notebookSummary, observationSummary }
}

function compactNotebookSummary(parts: Array<string | undefined | null>, limit = 160): string {
  const text = parts
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(' / ')
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text
}

function buildEmotionalBurstFollowUp(choice: 'press' | 'calm', hasScriptedOutburst: boolean, t: FeedbackT): string {
  if (choice === 'press') {
    return hasScriptedOutburst
      ? t('pc.discovery.feedback.outburst.followUp.press.hasLine')
      : t('pc.discovery.feedback.outburst.followUp.press.noLine')
  }
  return hasScriptedOutburst
    ? t('pc.discovery.feedback.outburst.followUp.calm.hasLine')
    : t('pc.discovery.feedback.outburst.followUp.calm.noLine')
}

function isNarrativeReaction(text: string | undefined): boolean {
  if (!text) return false
  return /(부딪힌다|드러난다|흔들린다|뒤집힌다|갈라진다|맞선다|올라오자|설명이|해석이|책임의 방향)/.test(text)
}

function buildContradictionFallbackLine(lieState: string, t: FeedbackT): string {
  if (lieState >= 'S3') return t('pc.discovery.feedback.contradiction.fallbackLine.s3')
  if (lieState >= 'S2') return t('pc.discovery.feedback.contradiction.fallbackLine.s2')
  return t('pc.discovery.feedback.contradiction.fallbackLine.s0')
}

export default function DiscoveryFeedbackWatcher() {
  const { t } = useI18n()
  const tp = useCallback<FeedbackT>((key, values) => fixFeedbackPostpositions(t(key, values)), [t])
  const pendingConfrontation = useStore((s) => s.discovery?.pendingConfrontation)
  const pendingConflict      = useStore((s) => s.discovery?.pendingConflict)
  const pendingEmergence     = useStore((s) => s.discovery?.pendingEmergence)
  const pendingSlip          = useStore((s) => s.discovery?.pendingSlip)
  const pendingGameEvent     = useStore((s) => s.pendingGameEvent)
  const pendingPerkChoice    = useStore((s) => s.pendingPerkChoice)
  const pendingWitnessChoice = useStore((s) => s.pendingWitnessChoice)

  // 큐에 이미 넣은 pending id 추적 (중복 방지)
  const enqueuedRef = useRef<Set<string>>(new Set())
  const surfacedSlipRef = useRef<Set<string>>(new Set())
  const surfacedEmergenceHookRef = useRef<Set<string>>(new Set())

  // 진실 공방
  useEffect(() => {
    if (!pendingConfrontation) return
    const key = `confrontation:${pendingConfrontation.disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const dispute = caseData.disputes.find((d) => d.id === pendingConfrontation.disputeId)
    const partyA = caseData.duo.partyA.name
    const partyB = caseData.duo.partyB.name

    const judgments: TruthJudgment[] = ['believe_a', 'believe_b', 'both_partial', 'undetermined']

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'event',
      iconId: 'i-scale',
      title: t('pc.discovery.feedback.confrontation.observationTitle'),
      summary: `${dispute?.name ?? pendingConfrontation.disputeId}`,
      disputeId: pendingConfrontation.disputeId,
    })
    state.addNotebookEntry?.({
      turnCount: state.turnCount,
      category: 'critical_contradiction',
      iconId: 'i-scale',
      title: t('pc.discovery.feedback.confrontation.notebookTitle', { dispute: dispute?.name ?? pendingConfrontation.disputeId }),
      summary: compactNotebookSummary([
        `${partyA}: ${pendingConfrontation.claimA.summary}`,
        `${partyB}: ${pendingConfrontation.claimB.summary}`,
      ]),
      disputeId: pendingConfrontation.disputeId,
    })
    const handleDefer = () => {
      useGameStore.getState().deferVerdict(pendingConfrontation)
      enqueuedRef.current.delete(key)
    }

    state.enqueueFeedback({
      kind: 'confrontation',
      eyebrow: t('pc.discovery.feedback.confrontation.eyebrow'),
      title: dispute?.name ?? pendingConfrontation.disputeId,
      claims: {
        partyA: { name: partyA, text: pendingConfrontation.claimA.summary },
        partyB: { name: partyB, text: pendingConfrontation.claimB.summary },
      },
      tone: 'gold',
      actionsLayout: 'vertical',
      actions: judgments.map((value) => ({
        label: buildJudgmentLabel(value, partyA, partyB, t),
        // '지금은 보류'는 회색 톤으로 분리 (영구 판결 3종과 시각 구분)
        tone: value === 'undetermined' ? 'gray' as const : 'gold' as const,
        onSelect: () => {
          if (value === 'undetermined') {
            // 일시 보류 — 핫바 위 미니 아이콘으로 복귀 가능
            handleDefer()
          } else {
            useGameStore.getState().submitJudgment(pendingConfrontation.disputeId, value, useGameStore.getState().turnCount)
            enqueuedRef.current.delete(key)
          }
        },
      })),
      // X 버튼 — 보류 액션과 동일 동작 (일시 보류)
      onDefer: handleDefer,
    })
  }, [pendingConfrontation, t])

  // 판단 충돌 (양측 contrast + VS)
  useEffect(() => {
    if (!pendingConflict) return
    const key = `conflict:${pendingConflict.disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const dispute = caseData.disputes.find((d) => d.id === pendingConflict.disputeId)
    const partyA = caseData.duo.partyA.name
    const partyB = caseData.duo.partyB.name

    // 기존 판단 쪽 파티 → dialogueLog에서 해당 party의 최근 관련 발언 추출
    const beliefParty =
      pendingConflict.currentJudgment === 'believe_a' ? 'a' :
      pendingConflict.currentJudgment === 'believe_b' ? 'b' : null

    let leftLabel = t('pc.discovery.feedback.conflict.left.default')
    let leftText = ''
    if (beliefParty) {
      const partyName = beliefParty === 'a' ? partyA : partyB
      const recentStatement = [...state.dialogueLog].reverse().find((d) =>
        d.speaker === beliefParty && (d.relatedDisputes ?? []).includes(pendingConflict.disputeId)
      )
      leftLabel = t('pc.discovery.feedback.conflict.left.partyClaim', { party: partyName })
      leftText = recentStatement?.text ?? t('pc.discovery.feedback.conflict.left.partyConviction', { party: partyName })
    } else if (pendingConflict.currentJudgment === 'both_partial') {
      leftLabel = t('pc.discovery.feedback.conflict.left.bothPartialLabel')
      leftText = t('pc.discovery.feedback.conflict.left.bothPartialText')
    } else {
      leftLabel = t('pc.discovery.feedback.conflict.left.deferredLabel')
      leftText = t('pc.discovery.feedback.conflict.left.deferredText')
    }

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'event',
      iconId: 'i-conflict',
      title: t('pc.discovery.feedback.conflict.observationTitle'),
      summary: `${dispute?.name ?? pendingConflict.disputeId}`,
      disputeId: pendingConflict.disputeId,
    })
    state.addNotebookEntry?.({
      turnCount: state.turnCount,
      category: 'critical_contradiction',
      iconId: 'i-conflict',
      title: t('pc.discovery.feedback.conflict.notebookTitle', { dispute: dispute?.name ?? pendingConflict.disputeId }),
      summary: compactNotebookSummary([
        `${leftLabel}: ${leftText}`,
        t('pc.discovery.feedback.conflict.notebookNewInfo', { info: pendingConflict.conflictingInfo }),
      ]),
      disputeId: pendingConflict.disputeId,
    })
    const playConflictBeat = shouldPlayImpactBeat({
      beatId: `conflict:${pendingConflict.disputeId}`,
      turn: state.turnCount,
      caseId: caseData.caseId,
      phase: state.currentPhase,
    })
    state.enqueueFeedback({
      kind: 'conflict',
      eyebrow: t('pc.discovery.feedback.conflict.eyebrow'),
      title: dispute?.name ?? pendingConflict.disputeId,
      ...(playConflictBeat ? {
        intensity: 'impact' as const,
        cue: 'contradiction' as const,
        visualEffects: ['screen-freeze', 'screen-shake-light'] as EventFeedbackVisualEffect[],
        effectTiming: 'before' as const,
        bigTypography: { text: t('pc.discovery.feedback.conflict.vs'), durationMs: 1000, tone: 'amber-warning' as const },
        layoutVariant: 'split-vs' as const,
        splitContent: {
          left: { partyId: 'a' as const, label: leftLabel, text: leftText },
          right: { partyId: 'b' as const, label: t('pc.discovery.feedback.conflict.newInfoLabel'), text: pendingConflict.conflictingInfo },
        },
        beatId: `conflict:${pendingConflict.disputeId}`,
      } : {}),
      contrast: {
        left:  { label: leftLabel, text: leftText },
        right: { label: t('pc.discovery.feedback.conflict.newInfoLabel'), text: pendingConflict.conflictingInfo },
      },
      tone: 'gold',
      actions: [
        {
          label: t('pc.discovery.feedback.conflict.action.keepCurrent'),
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingConflict(null)
            enqueuedRef.current.delete(key)
          },
        },
        {
          label: t('pc.discovery.feedback.conflict.action.revise'),
          tone: 'gold',
          onSelect: () => {
            const current = pendingConflict.currentJudgment
            let next: TruthJudgment = 'both_partial'
            if (current === 'believe_a') next = 'believe_b'
            else if (current === 'believe_b') next = 'believe_a'
            useGameStore.getState().reviseJudgment(pendingConflict.disputeId, next, useGameStore.getState().turnCount)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingConflict, t])

  // 새 쟁점 발견
  useEffect(() => {
    if (!pendingEmergence) return
    const key = `emergence:${pendingEmergence.disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const dispute = caseData.disputes.find((d) => d.id === pendingEmergence.disputeId)
    const disputeName = getSafeEmergenceTitle(caseData.caseId, pendingEmergence.disputeId, dispute?.name ?? pendingEmergence.disputeId)
    const routeLabel = t(ROUTE_LABEL_KEYS[pendingEmergence.route] ?? 'pc.discovery.feedback.route.default')
    const surfaceOnlyEmergence = isSpousePrivateAccountWithdrawalDispute(dispute)
    const emergenceDetails = buildDisputeEmergenceDetails(dispute, pendingEmergence.description, disputeName, t, tp)
    // PC QA round 2 B-6: when this dispute was unlocked by another dispute reaching a
    // truth threshold, surface that chain so the player understands "X 의심이 풀리면서
    // Y 부상"—a natural transition rather than an out-of-nowhere new issue.
    const unlockSourceDisputeId = (dispute as { unlockCondition?: { requireDispute?: { id?: string } } } | undefined)
      ?.unlockCondition?.requireDispute?.id
    const unlockSourceDispute = unlockSourceDisputeId
      ? caseData.disputes.find((d) => d.id === unlockSourceDisputeId)
      : null
    const unlockSourceName = unlockSourceDispute?.name
    const isT3 = isT3ClimaxDispute(caseData.caseId, dispute as (Dispute & { tier?: string; visualImpact?: string }) | undefined)
    const playEmergenceBeat = shouldPlayImpactBeat({
      beatId: isT3 ? 'h-d3' : `emergence:${pendingEmergence.disputeId}`,
      turn: state.turnCount,
      caseId: caseData.caseId,
      phase: state.currentPhase,
      tier: isT3 ? 'T3' : undefined,
    })
    const emergenceBeatPayload = playEmergenceBeat
      ? isT3
        ? {
            intensity: 'breakthrough' as const,
            cue: 'truth' as const,
            tier: 'T3' as const,
            visualEffects: [
              'screen-freeze',
              'screen-flash-dark',
              'portrait-desaturate',
              'vignette-strong',
              'screen-shake-heavy',
            ] as EventFeedbackVisualEffect[],
            effectTiming: 'before' as const,
            bigTypography: {
              text: t('pc.discovery.feedback.viewShift.hookA'),
              durationMs: 1800,
              sizeScale: 1.14,
            },
            impactSubtitle: {
              text: t('pc.discovery.feedback.viewShift.hookB'),
              durationMs: 1100,
              tone: 'amber-warning' as const,
            },
            beatId: 'h-d3',
          }
        : {
            intensity: 'impact' as const,
            cue: 'truth' as const,
            visualEffects: ['screen-flash-dark', 'screen-shake-medium', 'vignette-strong'] as EventFeedbackVisualEffect[],
            effectTiming: 'during' as const,
            bigTypography: { text: t('pc.discovery.feedback.emergence.bigType'), durationMs: 1000 },
            impactSubtitle: {
              text: disputeName,
              durationMs: 1000,
              tone: 'gold' as const,
            },
            beatId: `emergence:${pendingEmergence.disputeId}`,
          }
      : {}

    // 사용자 요청 2026-05-21 (11th): 새 쟁점 발견 popup 통합.
    // 기존: cutscene(자동) + chat 메시지 + 사용자 클릭 → modal(수동) 2단계 → 사용자 지적 "이상함".
    // 통합: 하나의 popup만 auto-fire. content = eyebrow + title + blocks + meta + 확인[Space].
    // 시스템 메시지는 record 용으로만 남기고 pendingFeedback 부착 X.
    const sysMsgId = state.addDialogue({
      speaker: 'system',
      text: unlockSourceName
        ? tp('pc.discovery.feedback.emergence.sysMsgChain', { sourceName: unlockSourceName, disputeName })
        : t('pc.discovery.feedback.emergence.sysMsgFallback', { disputeName }),
      relatedDisputes: [pendingEmergence.disputeId],
      turn: state.turnCount,
    })
    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'event',
      iconId: 'i-plus',
      title: routeLabel,
      summary: emergenceDetails.observationSummary,
      disputeId: pendingEmergence.disputeId,
    })
    state.addNotebookEntry?.({
      turnCount: state.turnCount,
      category: 'dispute_emergence',
      iconId: 'i-bolt',
      title: t('pc.discovery.feedback.emergence.notebookTitle', { dispute: disputeName }),
      summary: emergenceDetails.notebookSummary,
      disputeId: pendingEmergence.disputeId,
      linkedDialogueId: sysMsgId,
    })
    // 통합 popup auto-fire — 모든 정보를 1개 carousel에 노출.
    void surfaceOnlyEmergence
    state.enqueueFeedback({
      kind: 'emergence',
      eyebrow: t('pc.discovery.feedback.emergence.eyebrow'),
      title: disputeName,
      // body 제거 (사용자 11th: '쟁점을 확인하는 과정에서…' 텍스트 과다).
      // tag 제거 (사용자 11th: '쟁점 보드 + 재판관 수첩').
      blocks: emergenceDetails.blocks,
      meta: emergenceDetails.meta,
      tone: 'gold',
      disputeId: pendingEmergence.disputeId,
      ...emergenceBeatPayload,
      actions: [
        {
          label: '확인',  // 사용자 11th: '확인했습니다' → '확인'
          tone: 'gold',
          onSelect: () => {
            const s = useGameStore.getState()
            s.acknowledgeEmergence(pendingEmergence.disputeId)
            enqueuedRef.current.delete(key)
            // [Phase E] 모달 닫힘 후 강조 시작 — 우측 쟁점 카드 + 상단 쟁점 영역 깜빡 (4초)
            // 번개 이펙트도 모달 dismiss 직후로 이동 (모달 블러로 가려지는 결함 해소).
            s.setLastFocusedDisputeId(pendingEmergence.disputeId)
            s.setRecentlyEmergedDispute(pendingEmergence.disputeId)
            requestDisputeRibbonExpansion(pendingEmergence.disputeId)
            // 메시지 → 탑바 쟁점 chip 으로 연결 1회 + 오라 발사
            const escape = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape : (v: string) => v
            const logSelector = `[data-dialogue-id="${escape(sysMsgId)}"] .pc-log-system-card`
            const notebookSelector = '[data-resonance-target="judge-notebook"]'
            const toSelector = `[data-dispute-id="${escape(pendingEmergence.disputeId)}"]`
            afterDisputeRibbonExpansion(() => {
              const latest = useGameStore.getState()
              latest.enqueueAura({ targetSelector: notebookSelector, style: 'electric' })
              latest.enqueueAura({ targetSelector: toSelector, style: 'electric' })
              latest.enqueueResonance({
                fromSelector: logSelector,
                toSelector: notebookSelector,
                reason: 'notebook_entry',
                targetKey: `notebook:dispute:${pendingEmergence.disputeId}`,
                style: 'lightning',
              })
              latest.enqueueResonance({
                fromSelector: notebookSelector,
                toSelector,
                reason: 'dispute_emergence',
                targetKey: `dispute:${pendingEmergence.disputeId}`,
                style: 'lightning',
              })
            })
            window.setTimeout(() => {
              useGameStore.getState().setRecentlyEmergedDispute(null)
            }, 4000)
            // [B-16-A·B] 화제 전환 NPC hook 발화 — 사전 작성된 데이터 (emergenceHooks.ts) 활용.
            // 화자 lieState 기반으로 톤 선택 (S0~S2: attack / S3~S4: confession / S5: resignation).
            const emergedDispute = s.caseData?.disputes.find((d) => d.id === pendingEmergence.disputeId)
            const hookCaseId = (s.caseData?.caseId ?? '').replace(/^case-/, '')
            const hookSpeaker = getEmergenceHookSpeaker(hookCaseId, pendingEmergence.disputeId)
            const speakerLieState = hookSpeaker
              ? (hookSpeaker === 'a' ? s.agentA : s.agentB).lieStateMap[pendingEmergence.disputeId]?.currentState
              : undefined
            const hook = getEmergenceHook(hookCaseId, pendingEmergence.disputeId, speakerLieState)
            const hookText = hook?.text ?? ''
            const safeHookDisputeName = getSafeEmergenceTitle(hookCaseId, pendingEmergence.disputeId, emergedDispute?.name ?? '')
            const fallbackText = safeHookDisputeName
              ? t('pc.discovery.feedback.emergence.hookFallback.withName', { disputeName: safeHookDisputeName })
              : t('pc.discovery.feedback.emergence.hookFallback.generic')
            const hookKey = `emergence-hook:${hookCaseId}:${pendingEmergence.disputeId}:${hookText || fallbackText}`
            const alreadyLogged = s.dialogueLog.some((d) =>
              d.text === (hookText || fallbackText)
              && (d.relatedDisputes ?? []).includes(pendingEmergence.disputeId)
            )
            if (surfacedEmergenceHookRef.current.has(hookKey) || alreadyLogged) return
            surfacedEmergenceHookRef.current.add(hookKey)

            if (hook) {
              s.addDialogue({
                speaker: hook.speaker,
                text: hook.text,
                behaviorHint: hook.behaviorHint,
                relatedDisputes: [pendingEmergence.disputeId],
                turn: s.turnCount,
                source: 'script',
              })
            } else {
              // 폴백 — 데이터 없는 경우 (Legacy 사건 등) generic 발화
              s.addDialogue({
                speaker: s.pcTargetParty,
                text: fallbackText,
                relatedDisputes: [pendingEmergence.disputeId],
                turn: s.turnCount,
                behaviorHint: t('pc.discovery.feedback.emergence.hookFallback.behaviorHint'),
                source: 'fallback',
              })
            }
          },
        },
      ],
    })
  }, [pendingEmergence, t, tp])

  // 감정 실수 포착
  useEffect(() => {
    if (!pendingSlip) return
    const key = `slip:${pendingSlip.party}:${pendingSlip.sourceDisputeId}:${pendingSlip.turn}`
    if (enqueuedRef.current.has(key)) return
    if (surfacedSlipRef.current.has(key)) {
      useGameStore.getState().setPendingSlip(null)
      return
    }
    enqueuedRef.current.add(key)
    surfacedSlipRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const partyData = pendingSlip.party === 'a' ? caseData.duo.partyA : caseData.duo.partyB
    const sourceDispute = caseData.disputes.find((d) => d.id === pendingSlip.sourceDisputeId)
    const linkedDispute = pendingSlip.linkedDisputeId
      ? caseData.disputes.find((d) => d.id === pendingSlip.linkedDisputeId)
      : null

    const meta: string[] = []
    if (sourceDispute) meta.push(t('pc.discovery.feedback.emotionMistake.meta.sourceDispute', { dispute: sourceDispute.name }))
    if (linkedDispute) meta.push(t('pc.discovery.feedback.emotionMistake.meta.linkedDispute', { dispute: linkedDispute.name }))

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'slip',
      iconId: 'i-heart',
      title: pendingSlip.slipText,
      summary: t('pc.discovery.feedback.emotionMistake.summary', { party: partyData.name }),
      party: pendingSlip.party,
      disputeId: pendingSlip.sourceDisputeId,
    })
    state.enqueueFeedback({
      kind: 'emotional_slip',
      eyebrow: t('pc.discovery.feedback.emotionMistake.eyebrow'),
      title: partyData.name,
      quote: pendingSlip.slipText,
      meta,
      tone: 'red',
      actions: [
        {
          label: t('pc.discovery.feedback.action.skip'),
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingSlip(null)
            enqueuedRef.current.delete(key)
          },
        },
        {
          label: t('pc.discovery.feedback.emotionMistake.action.record'),
          tone: 'red',
          onSelect: () => {
            const fresh = useGameStore.getState()
            fresh.addEmotionalSlip(pendingSlip)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingSlip, t])

  // Game event (contradiction / interjection / emotional_burst)
  useEffect(() => {
    if (!pendingGameEvent) return
    const ev = pendingGameEvent
    const key = `gameevent:${ev.type}:${ev.disputeId}:${ev.scriptSlot?.textId ?? 'x'}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const caseKey = caseData.caseId.replace(/^case-/, '')
    const disputeName = caseData.disputes.find((d) => d.id === ev.disputeId)?.name ?? ev.disputeId
    const partyName = ev.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

    const releaseKey = () => enqueuedRef.current.delete(key)

    if (ev.type === 'contradiction') {
      const v3Event = ev.scriptSlot?.textId ? getContradictionEvent(caseKey, ev.scriptSlot.textId) : null

      const handlePointOut = () => {
        const s = useGameStore.getState()
        // [결함 24] 모순 추궁 효과 누적 추적 — 사용자에게 명시적 시각화 메시지 출력용
        const effectSummary: string[] = []
        for (const effect of (ev.deferredEffects ?? [])) {
          switch (effect.type) {
            case 'lie_advance': {
              const beforeAgent = effect.party === 'a' ? s.agentA : s.agentB
              const beforeState = beforeAgent.lieStateMap[effect.disputeId]?.currentState ?? 'S0'
              for (let i = 0; i < effect.steps; i += 1) {
                s.transitionLie(effect.party, effect.disputeId, 'event_contradiction_pointout')
              }
              const afterAgent = effect.party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
              const afterState = afterAgent.lieStateMap[effect.disputeId]?.currentState ?? beforeState
              if (beforeState !== afterState) {
                effectSummary.push(t('pc.discovery.feedback.contradiction.effect.lieStage', { before: beforeState, after: afterState }))
              }
              break
            }
            case 'emotion_spike':
              s.changeEmotion(effect.party, effect.delta)
              effectSummary.push(t('pc.discovery.feedback.contradiction.effect.emotion', { delta: `${effect.delta > 0 ? '+' : ''}${effect.delta}` }))
              break
          }
        }
        s.addDialogue({
          speaker: 'judge',
          text: v3Event
            ? t('pc.discovery.feedback.contradiction.judgeQuestion.withEvent', { party: partyName })
            : t('pc.discovery.feedback.contradiction.judgeQuestion.fallback', { party: partyName }),
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        const agent = ev.party === 'a' ? s.agentA : s.agentB
        const lie = agent.lieStateMap[ev.disputeId]?.currentState ?? 'S0'
        const reactionIsNarrative = isNarrativeReaction(v3Event?.npcReaction)
        const npcText = reactionIsNarrative
          ? buildContradictionFallbackLine(lie, t)
          : v3Event?.npcReaction ?? buildContradictionFallbackLine(lie, t)
        s.addDialogue({ speaker: ev.party, text: npcText, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        if (reactionIsNarrative && v3Event?.npcReaction) {
          s.addDialogue({ speaker: 'system', text: v3Event.npcReaction, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        }
        // 결과 메시지 — 채팅 success 배너 대신 관찰 패널로 (확인 버튼 작동 안 하던 문제 해결)
        s.addJudgeObservation({
          turnCount: s.turnCount,
          category: 'contradiction',
          iconId: 'i-bolt',
          title: ev.severity === 'critical'
            ? t('pc.discovery.feedback.contradiction.result.critical', { party: partyName })
            : t('pc.discovery.feedback.contradiction.result.standard'),
          summary: t('pc.discovery.feedback.contradiction.result.summary', { party: partyName }),
          party: ev.party,
          disputeId: ev.disputeId,
        })
        // [결함 24] 모순 추궁 효과 명시적 시각화 메시지
        if (effectSummary.length > 0) {
          useGameStore.getState().addDialogue({
            speaker: 'system',
            text: t('pc.discovery.feedback.contradiction.success', { effects: effectSummary.join(' / ') }),
            relatedDisputes: [ev.disputeId],
            turn: s.turnCount,
          })
        }
        // [Phase C-2 새 기획] 모순 추궁 직후 + emotion ≥ 75 + < 85 → 셧다운 진입 (2턴 응답 거부)
        // emotion ≥ 85는 이미 체념(자백 모드)이라 셧다운 안 함.
        const updatedAgent = ev.party === 'a' ? useGameStore.getState().agentA : useGameStore.getState().agentB
        const emotion = updatedAgent.emotionalState.internalValue
        const currentLockout = useGameStore.getState().emotionalLockoutUntil?.[ev.party] ?? 0
        if (emotion >= 75 && emotion < 85 && currentLockout <= s.turnCount) {
          useGameStore.getState().setEmotionalLockout(ev.party, s.turnCount + 3)
          useGameStore.getState().addDialogue({
            speaker: 'system',
            text: tp('pc.discovery.feedback.contradiction.blocked', { party: partyName }),
            relatedDisputes: [ev.disputeId],
            turn: s.turnCount,
          })
        }
        s.setPendingGameEvent(null)
        releaseKey()
      }

      // [TC-A1·A2·A4 즉시 완화] 모달 statementA/B는 lieState S3+ (부분 인정 단계)에서만 노출.
      // S0~S2 단계에서는 statementB가 자백 본문/스포일러를 그대로 노출하는 결함이 있음
      // (data 모델 결함 — ContradictionEvent에 spoilerLevel 메타 없음. M1~M7에서 ContradictionEventV2 도입 예정).
      // 단기 픽스: S0~S2일 때 contrast 미노출 → body로 폴백 (안전한 단순 메시지).
      const accusedAgent = ev.party === 'a' ? state.agentA : state.agentB
      const accusedLieState = accusedAgent.lieStateMap[ev.disputeId]?.currentState ?? 'S0'
      const lieRank: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
      void lieRank[accusedLieState]
      const isSpoilerSafeStage = true
      const eventContradictionMeta = v3Event
        ? {
            party: ev.party,
            disputeId: ev.disputeId,
            previousClaim: v3Event.statementA,
            currentClaim: v3Event.statementB,
            reason: v3Event.npcReaction,
            previousLabel: t('pc.discovery.feedback.contradiction.previousLabel'),
            currentLabel: t('pc.discovery.feedback.contradiction.currentLabel'),
          }
        : undefined
      if (!hasContradictionComparison(eventContradictionMeta)) {
        state.setPendingGameEvent(null)
        releaseKey()
        return
      }
      const contrastPayload = v3Event && isSpoilerSafeStage
        ? {
            left:  { label: eventContradictionMeta.previousLabel ?? t('pc.discovery.feedback.contradiction.previousLabel'), text: eventContradictionMeta.previousClaim },
            right: { label: eventContradictionMeta.currentLabel ?? t('pc.discovery.feedback.contradiction.currentLabel'), text: eventContradictionMeta.currentClaim },
          }
        : undefined
      const safeFallbackBody = !isSpoilerSafeStage
        ? t('pc.discovery.feedback.contradiction.safeFallbackBody', { party: partyName })
        : null

      state.addJudgeObservation({
        turnCount: state.turnCount,
        category: 'contradiction',
        iconId: 'i-bolt',
        title: t('pc.discovery.feedback.contradiction.observationTitle'),
        summary: `${partyName} · ${disputeName}`,
        party: ev.party,
        disputeId: ev.disputeId,
      })
      // [B-17 D] 자동 모달 X — 시스템 메시지 클릭 시 수동 트리거.
      const sysMsgId = state.addDialogue({
        speaker: 'system',
        text: t('pc.discovery.feedback.contradiction.sysMsg', { party: partyName, dispute: disputeName }),
        relatedDisputes: [ev.disputeId],
        turn: state.turnCount,
      })
      state.attachDialoguePendingFeedback(sysMsgId, {
        kind: 'contradiction',
        eyebrow: t('pc.discovery.feedback.contradiction.eyebrow'),
        subtitle: `${disputeName} · ${partyName}`,
        body: contrastPayload ? undefined : (safeFallbackBody ?? t('pc.discovery.feedback.fallback.contradictionSurface')),
        contrast: contrastPayload,
        blocks: [{ title: t('pc.discovery.feedback.contradiction.reasonLabel'), text: eventContradictionMeta.reason }],
        // [TC-A2 픽스] '진술이 엇갈렸다' 시스템 메시지는 빨강 톤(공격/모순)으로 통일
        // — '추궁하기' 시스템 메시지(.is-action)와 의미·시각 모두 일치
        tone: 'alert',
        actions: [
          {
            label: t('pc.discovery.feedback.action.skip'),
            tone: 'gray',
            onSelect: () => {
              useGameStore.getState().setPendingGameEvent(null)
              useGameStore.getState().consumeDialoguePendingFeedback(sysMsgId)
              releaseKey()
            },
          },
          {
            label: t('pc.discovery.feedback.contradiction.action.pointOut'),
            tone: 'alert',
            onSelect: () => {
              handlePointOut()
              useGameStore.getState().consumeDialoguePendingFeedback(sysMsgId)
            },
          },
        ],
      }, state.turnCount)
      return
    }

    if (ev.type === 'interjection') {
      const v3Event = ev.scriptSlot?.textId ? getInterjectionEvent(caseKey, ev.scriptSlot.textId) : null
      const interjectionText = v3Event?.interjectionLine
        ? v3Event.interjectionLine
        : ev.severity === 'major'
          ? t('pc.discovery.feedback.interject.fallback.major')
          : t('pc.discovery.feedback.interject.fallback.minor')

      const handleAllow = () => {
        const s = useGameStore.getState()
        s.addDialogue({ speaker: 'judge', text: t('pc.discovery.feedback.judge.allowSpeak'), relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.addDialogue({ speaker: ev.party, text: interjectionText, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.trackMetric('interjectionAllowed')
        s.trackMetric('counterQuestionUsed')
        recordInterjectionChoice('allow')
        s.changeTrust(ev.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
        s.setPendingGameEvent(null)
        releaseKey()
      }
      const handleBlock = () => {
        const s = useGameStore.getState()
        recordInterjectionChoice('block')
        s.addDialogue({
          speaker: 'judge',
          text: t('pc.discovery.feedback.judge.rejectInterject', { party: partyName }),
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        s.setPendingGameEvent(null)
        releaseKey()
      }

      // [B-17 D] 자동 모달 X — 시스템 메시지 클릭 시 수동 트리거.
      // 끼어들기는 관찰 패널엔 추가하지 않음 (시스템 관찰과 NPC 발화 경계 보존).
      const sysMsgId = state.addDialogue({
        speaker: 'system',
        text: tp('pc.discovery.feedback.interject.sysMsg', { party: partyName, dispute: disputeName }),
        relatedDisputes: [ev.disputeId],
        turn: state.turnCount,
      })
      state.attachDialoguePendingFeedback(sysMsgId, {
        kind: 'contradiction',
        eyebrow: t('pc.discovery.feedback.interject.eyebrow'),
        subtitle: `${partyName} · ${disputeName}`,
        quote: interjectionText,
        tone: 'blue',
        actions: [
          {
            label: t('pc.discovery.feedback.interject.action.block'),
            tone: 'gray',
            onSelect: () => {
              handleBlock()
              useGameStore.getState().consumeDialoguePendingFeedback(sysMsgId)
            },
          },
          {
            label: t('pc.discovery.feedback.interject.action.allow'),
            tone: 'blue',
            onSelect: () => {
              handleAllow()
              useGameStore.getState().consumeDialoguePendingFeedback(sysMsgId)
            },
          },
        ],
      }, state.turnCount)
      return
    }

    if (ev.type === 'emotional_burst') {
      const v3Event = ev.scriptSlot?.textId ? getOutburstEvent(caseKey, ev.scriptSlot.textId) : null
      const outburstLine = v3Event?.outburstLine
      const outburstText = outburstLine ?? t('pc.discovery.feedback.fallback.emotionalBurstSurface')

      const emitOutburst = () => {
        const s = useGameStore.getState()
        if (outburstLine) {
          s.addDialogue({ speaker: ev.party, text: outburstLine, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        }
        // PC QA round 2 B-8: confessional outburst jumps lieState. The outburst
        // text itself already reveals the hidden truth; mirror that into the
        // truth gauge so the gauge doesn't lag behind what was actually said.
        const jumpTarget = v3Event?.lieStateJump
        if (jumpTarget) {
          const lieRank: Record<string, number> = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
          const agent = ev.party === 'a' ? s.agentA : s.agentB
          const currentLie = agent.lieStateMap[ev.disputeId]?.currentState ?? 'S0'
          const targetRank = lieRank[jumpTarget] ?? 0
          const currentRank = lieRank[currentLie] ?? 0
          if (targetRank > currentRank) {
            const distance = targetRank - currentRank
            for (let i = 0; i < distance; i += 1) {
              s.transitionLie(ev.party, ev.disputeId, 'emotional_burst_confession')
            }
            const after = useGameStore.getState()
            const afterAgent = ev.party === 'a' ? after.agentA : after.agentB
            const afterLie = afterAgent.lieStateMap[ev.disputeId]?.currentState ?? currentLie
            after.addDialogue({
              speaker: 'system',
              text: t('pc.discovery.feedback.outburst.lieJump', { dispute: disputeName, before: currentLie, after: afterLie }),
              relatedDisputes: [ev.disputeId],
              turn: after.turnCount,
            })
          }
        }
      }
      const handlePress = () => {
        const s = useGameStore.getState()
        emitOutburst()
        s.addDialogue({ speaker: 'judge', text: t('pc.discovery.feedback.outburst.pressJudge'), relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.addDialogue({
          speaker: ev.party,
          text: buildEmotionalBurstFollowUp('press', Boolean(outburstLine), t),
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        s.changeEmotion(ev.party, 8)
        const meters = s.questionMeters
        const partyMeter = meters[ev.party]
        useGameStore.setState({
          questionMeters: { ...meters, [ev.party]: { ...partyMeter, leakMeter: Math.min(partyMeter.leakMeter + 10, 100) } },
        })
        s.addJudgeObservation({
          turnCount: s.turnCount,
          category: 'state',
          iconId: 'i-scale',
          title: t('pc.discovery.feedback.outburst.pressObservationTitle'),
          summary: `${partyName} · ${disputeName}`,
          party: ev.party,
          disputeId: ev.disputeId,
        })
        s.setPendingGameEvent(null)
        releaseKey()
      }
      const handleCalm = () => {
        const s = useGameStore.getState()
        emitOutburst()
        s.addDialogue({ speaker: 'judge', text: t('pc.discovery.feedback.outburst.calmJudge'), relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.addDialogue({
          speaker: ev.party,
          text: buildEmotionalBurstFollowUp('calm', Boolean(outburstLine), t),
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        s.changeTrust(ev.party, 'trustTowardJudge', 12)
        s.changeEmotion(ev.party, -10)
        const meters = s.questionMeters
        const partyMeter = meters[ev.party]
        useGameStore.setState({
          questionMeters: { ...meters, [ev.party]: { ...partyMeter, trustWindow: Math.min(partyMeter.trustWindow + 15, 100) } },
        })
        s.addJudgeObservation({
          turnCount: s.turnCount,
          category: 'state',
          iconId: 'i-heart',
          title: t('pc.discovery.feedback.outburst.calmObservationTitle'),
          summary: `${partyName} · ${disputeName}`,
          party: ev.party,
          disputeId: ev.disputeId,
        })
        s.setPendingGameEvent(null)
        releaseKey()
      }

      state.addJudgeObservation({
        turnCount: state.turnCount,
        category: 'slip',
        iconId: 'i-heart',
        title: outburstText,
        summary: t('pc.discovery.feedback.outburst.summary', { party: partyName }),
        party: ev.party,
        disputeId: ev.disputeId,
      })
      state.enqueueFeedback({
        kind: 'emotional_slip',
        eyebrow: t('pc.discovery.feedback.outburst.eyebrow'),
        title: t('pc.discovery.feedback.outburst.title', { party: partyName }),
        subtitle: `${partyName} · ${disputeName}`,
        quote: outburstLine ? outburstText : undefined,
        body: outburstLine ? undefined : outburstText,
        tone: 'red',
        actions: [
          {
            label: t('pc.discovery.feedback.outburst.action.calm'),
            tone: 'gray',
            onSelect: () => {
              handleCalm()
            },
          },
          {
            label: t('pc.discovery.feedback.outburst.action.press'),
            tone: 'red',
            onSelect: () => {
              handlePress()
            },
          },
        ],
      })
      return
    }
  }, [pendingGameEvent, t, tp])

  // 퍼크 선택
  useEffect(() => {
    if (!pendingPerkChoice) return
    const pp = pendingPerkChoice
    const key = `perk:${pp.type}:${(pp as any).evidenceId ?? (pp as any).disputeId}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const caseData = state.caseData
    if (!caseData) return
    const releaseKey = () => enqueuedRef.current.delete(key)

    if (pp.type === 'penalty_buffer') {
      const evidence = caseData.evidence.find((e) => e.id === pp.evidenceId)
      const evidenceState = state.evidenceStates[pp.evidenceId]
      const evidenceName = evidenceState?.deepInvestigated
        ? (evidence?.name ?? pp.evidenceId)
        : (evidence?.surfaceName ?? evidence?.name ?? pp.evidenceId)

      state.addJudgeObservation({
        turnCount: state.turnCount,
        category: 'event',
        iconId: 'i-shield',
        title: t('pc.discovery.feedback.perk.penalty.observationTitle'),
        summary: t('pc.discovery.feedback.perk.penalty.summary', { evidence: evidenceName }),
        evidenceId: pp.evidenceId,
      })
      state.enqueueFeedback({
        kind: 'perk_choice',
        eyebrow: t('pc.discovery.feedback.perk.penalty.eyebrow'),
        title: evidenceName,
        body: t('pc.discovery.feedback.perk.penalty.body'),
        tone: 'gold',
        actions: [
          {
            label: t('pc.discovery.feedback.perk.penalty.action.withdraw'),
            tone: 'gray',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('penaltyBufferUsesRemaining')
              s.addDialogue({
                speaker: 'judge',
                text: t('pc.discovery.feedback.perk.penalty.dialogue.withdraw', { evidence: evidenceName }),
                relatedDisputes: evidence?.proves ?? [],
                turn: s.turnCount,
              })
              s.setPendingEvidenceResult(null)
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
          {
            label: t('pc.discovery.feedback.perk.penalty.action.reframe'),
            tone: 'gold',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('penaltyBufferUsesRemaining')
              s.changeEmotion(pp.target, -4)
              s.addDialogue({
                speaker: 'system',
                text: t('pc.discovery.feedback.perk.penalty.dialogue.reframe', { evidence: evidenceName }),
                relatedDisputes: evidence?.proves ?? [],
                turn: s.turnCount,
              })
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
        ],
      })
      return
    }

    if (pp.type === 'fatigue_extend') {
      const disputeName = caseData.disputes.find((d) => d.id === pp.disputeId)?.name ?? pp.disputeId
      const partyName = pp.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

      state.addJudgeObservation({
        turnCount: state.turnCount,
        category: 'event',
        iconId: 'i-search',
        title: t('pc.discovery.feedback.perk.fatigue.observationTitle'),
        summary: `${partyName} · ${disputeName}`,
        party: pp.party,
        disputeId: pp.disputeId,
      })
      state.enqueueFeedback({
        kind: 'perk_choice',
        eyebrow: t('pc.discovery.feedback.perk.fatigue.eyebrow'),
        title: `${partyName} · ${disputeName}`,
        body: t('pc.discovery.feedback.perk.fatigue.body'),
        tone: 'blue',
        actions: [
          {
            label: t('pc.discovery.feedback.action.skip'),
            tone: 'gray',
            onSelect: () => {
              useGameStore.getState().setPendingPerkChoice(null)
              releaseKey()
            },
          },
          {
            label: t('pc.discovery.feedback.perk.fatigue.action.resetAngle'),
            tone: 'blue',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('angleSwitchOpportunity')
              resetFatigueForDossier(pp.party, pp.disputeId)
              s.addDialogue({
                speaker: 'system',
                text: t('pc.discovery.feedback.perk.fatigue.dialogue.reset', { dispute: disputeName }),
                relatedDisputes: [pp.disputeId],
                turn: s.turnCount,
              })
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
        ],
      })
    }
  }, [pendingPerkChoice, t])

  // 증인 심문
  useEffect(() => {
    if (!pendingWitnessChoice) return
    const pc = pendingWitnessChoice
    const depth = pc.slots.length > 0 ? Math.min(...pc.slots.map(slot => slot.depth)) : 1
    const key = `witness:${pc.witnessId}:d${depth}:${pc.slots.map(slot => slot.id).join('|')}`
    if (enqueuedRef.current.has(key)) return
    enqueuedRef.current.add(key)

    const state = useGameStore.getState()
    const releaseKey = () => enqueuedRef.current.delete(key)

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'event',
      iconId: 'i-witness',
      title: pc.isResummon
        ? t('pc.discovery.feedback.witness.observation.resummon', { witness: pc.witnessName })
        : tp('pc.discovery.feedback.witness.observation.first', { witness: pc.witnessName }),
      summary: pc.isResummon
        ? t('pc.discovery.feedback.witness.summary.resummon')
        : t('pc.discovery.feedback.witness.summary.first'),
    })
    state.enqueueFeedback({
      kind: 'witness_choice',
      eyebrow: t('pc.discovery.feedback.witness.eyebrow'),
      title: pc.witnessName,
      body: pc.isResummon
        ? t('pc.discovery.feedback.witness.body.resummon')
        : t('pc.discovery.feedback.witness.body.first'),
      tone: 'green',
      actionsLayout: 'vertical',
      actions: pc.slots.map((slot) => ({
        label: slot.topic,
        tone: 'green',
        onSelect: () => {
          applyWitnessSlot(slot.id)
          releaseKey()
        },
      })),
    })
  }, [pendingWitnessChoice, t, tp])

  return null
}

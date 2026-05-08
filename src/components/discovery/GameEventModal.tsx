/**
 * Game Event Modal — 게임 이벤트 선택 모달
 * ─────────────────────────────────
 * 모순 감지 / 끼어들기 / 감정 폭발 이벤트 발생 시
 * 플레이어에게 2가지 선택지를 제시하는 모달.
 *
 * pendingGameEvent가 Store에 있으면 자동 표시.
 */

import { useEffect } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import type { GameEventTrigger } from '../../engine/gameEventTriggerEngine'
import {
  getContradictionEvent,
  getInterjectionEvent,
  getOutburstEvent,
} from '../../engine/v3GameLoopLoader'
import { getScriptedEmotionalOverload } from '../../engine/scriptedTextLoader'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import { recordInterjectionChoice } from '../../engine/phase3LogCollector'
import { hasContradictionComparison } from '../../utils/contradiction'
import { useI18n, type LocaleCode } from '../../i18n'
import { localizeRuntimeText } from '../../i18n/runtimeText'

function isNarrativeReaction(text: string | undefined): boolean {
  if (!text) return false
  return /(부딪힌다|드러난다|흔들린다|뒤집힌다|갈라진다|맞선다|올라오자|설명이|해석이|책임의 방향)/.test(text)
}

const EVENT_COPY: Record<LocaleCode, {
  contradictionFallback: (lieState: string) => string
  pointOutSuffix: string
  contradictionExplain: string
  criticalPointed: string
  pointed: string
  skippedContradiction: string
  contradictionTitle: string
  previousStatement: string
  currentStatement: string
  letGo: string
  pointOut: string
  judgeAllow: string
  interjectionDispute: string
  interjectionFallback: string
  judgeBlock: string
  interjectionTitle: (name: string) => string
  block: string
  allow: string
  judgePress: string
  pressureHint: string
  judgeCalm: string
  empathyHint: string
  burstTitle: (name: string) => string
  outburstFallback: string
  calm: string
  press: string
}> = {
  ko: {
    contradictionFallback: (lieState) => {
      if (lieState >= 'S3') return '...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다.'
      if (lieState >= 'S2') return '재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다.'
      return '그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다.'
    },
    pointOutSuffix: '이 점을 지적합니다.',
    contradictionExplain: '진술에 모순이 있습니다. 설명하십시오.',
    criticalPointed: '결정적 모순을 지적했습니다! 방어가 크게 흔들립니다.',
    pointed: '모순을 지적했습니다! 방어가 흔들립니다.',
    skippedContradiction: '모순을 넘겼습니다. 모순 토큰은 유지됩니다.',
    contradictionTitle: '모순 발견',
    previousStatement: '이전 진술',
    currentStatement: '현재 진술',
    letGo: '넘어간다',
    pointOut: '모순을 지적한다',
    judgeAllow: '발언을 허용합니다.',
    interjectionDispute: '끼어든 발언에서 새 쟁점이 드러났습니다.',
    interjectionFallback: '발언이 끼어들었습니다.',
    judgeBlock: '발언을 제지합니다. 차례를 기다리십시오.',
    interjectionTitle: (name) => `${name} 끼어들기`,
    block: '제지한다',
    allow: '허용한다',
    judgePress: '계속하십시오. 이 자리에서 사실대로 말하셔야 합니다.',
    pressureHint: '사실 추궁이나 동기 탐색이 효과적입니다.',
    judgeCalm: '잠시 진정하시고, 준비되면 말씀하십시오.',
    empathyHint: '공감 접근이 효과적입니다.',
    burstTitle: (name) => `${name} 감정 폭발`,
    outburstFallback: '감정이 크게 흔들렸습니다.',
    calm: '진정시킨다',
    press: '더 압박한다',
  },
  en: {
    contradictionFallback: (lieState) => {
      if (lieState >= 'S3') return '...That... was complicated. Some parts differ from what I said at first.'
      if (lieState >= 'S2') return 'Judge, I think my memory was confused. I will restate it.'
      return 'That is not different from what I said. The context is different.'
    },
    pointOutSuffix: 'I am pointing out this inconsistency.',
    contradictionExplain: 'There is a contradiction in the statement. Explain it.',
    criticalPointed: 'A decisive contradiction was pointed out. The defense is badly shaken.',
    pointed: 'A contradiction was pointed out. The defense is shaken.',
    skippedContradiction: 'The contradiction was passed over. The contradiction token remains.',
    contradictionTitle: 'Contradiction Found',
    previousStatement: 'Previous statement',
    currentStatement: 'Current statement',
    letGo: 'Let It Go',
    pointOut: 'Point Out Contradiction',
    judgeAllow: 'I will allow the statement.',
    interjectionDispute: 'A new dispute emerged from the interjection.',
    interjectionFallback: 'An interjection broke in.',
    judgeBlock: 'I am stopping that statement. Wait your turn.',
    interjectionTitle: (name) => `${name} Interjects`,
    block: 'Block',
    allow: 'Allow',
    judgePress: 'Continue. You must tell the truth here.',
    pressureHint: 'Fact pursuit or motive search will be effective.',
    judgeCalm: 'Take a moment to calm down, then speak when ready.',
    empathyHint: 'An empathy approach will be effective.',
    burstTitle: (name) => `${name} Emotional Burst`,
    outburstFallback: 'Emotions surged sharply.',
    calm: 'Calm Down',
    press: 'Press Harder',
  },
  ja: {
    contradictionFallback: (lieState) => {
      if (lieState >= 'S3') return '……それは……状況が複雑でした。最初に申し上げた内容と異なる部分がありました。'
      if (lieState >= 'S2') return '裁判官、私の記憶が混乱していたようです。改めて整理します。'
      return 'それは……私が話した内容と違うわけではありません。文脈が違うのです。'
    },
    pointOutSuffix: 'この点を指摘します。',
    contradictionExplain: '供述に矛盾があります。説明してください。',
    criticalPointed: '決定的な矛盾を指摘しました。防御が大きく揺らぎます。',
    pointed: '矛盾を指摘しました。防御が揺らぎます。',
    skippedContradiction: '矛盾を見送りました。矛盾トークンは維持されます。',
    contradictionTitle: '矛盾発見',
    previousStatement: '以前の供述',
    currentStatement: '現在の供述',
    letGo: '見送る',
    pointOut: '矛盾を指摘する',
    judgeAllow: '発言を許可します。',
    interjectionDispute: '割り込んだ発言から新しい争点が明らかになりました。',
    interjectionFallback: '発言が割り込みました。',
    judgeBlock: '発言を制止します。順番をお待ちください。',
    interjectionTitle: (name) => `${name}の割り込み`,
    block: '制止する',
    allow: '許可する',
    judgePress: '続けてください。この場では事実を話さなければなりません。',
    pressureHint: '事実追及や動機探索が効果的です。',
    judgeCalm: '少し落ち着いて、準備ができたら話してください。',
    empathyHint: '共感アプローチが効果的です。',
    burstTitle: (name) => `${name} 感情爆発`,
    outburstFallback: '感情が大きく揺らぎました。',
    calm: '落ち着かせる',
    press: 'さらに圧迫する',
  },
  'zh-CN': {
    contradictionFallback: (lieState) => {
      if (lieState >= 'S3') return '……那个……情况很复杂。确实有些地方和我一开始说的不一样。'
      if (lieState >= 'S2') return '裁判官，我的记忆可能有些混乱。我重新整理一下。'
      return '那并不和我说过的话矛盾，只是语境不同。'
    },
    pointOutSuffix: '我指出这一点。',
    contradictionExplain: '陈述存在矛盾。请说明。',
    criticalPointed: '已指出决定性矛盾。防线大幅动摇。',
    pointed: '已指出矛盾。防线开始动摇。',
    skippedContradiction: '已放过该矛盾。矛盾令牌仍会保留。',
    contradictionTitle: '发现矛盾',
    previousStatement: '先前陈述',
    currentStatement: '当前陈述',
    letGo: '放过',
    pointOut: '指出矛盾',
    judgeAllow: '允许发言。',
    interjectionDispute: '插话中显现出新的争议点。',
    interjectionFallback: '有人插话。',
    judgeBlock: '制止发言。请等待轮到你。',
    interjectionTitle: (name) => `${name}插话`,
    block: '制止',
    allow: '允许',
    judgePress: '继续。你必须在这里如实说明。',
    pressureHint: '事实追问或动机探索会有效。',
    judgeCalm: '请先冷静一下，准备好后再说。',
    empathyHint: '共情接近会有效。',
    burstTitle: (name) => `${name}情绪爆发`,
    outburstFallback: '情绪发生剧烈波动。',
    calm: '安抚',
    press: '继续施压',
  },
}

function buildContradictionFallbackLine(lieState: string, locale: LocaleCode): string {
  return EVENT_COPY[locale].contradictionFallback(lieState)
}

function localizeOrFallback(value: string | undefined, locale: LocaleCode, fallback: string): string {
  if (!value) return fallback
  const localized = localizeRuntimeText(value, locale)
  return locale !== 'ko' && /[가-힣]/.test(localized) ? fallback : localized
}

const INTERJECTION_EMERGENCE_TARGETS: Record<string, string> = {
  'spouse-v3-01-interjection-b': 'h-d3',
  'spouse-01-interjection-b': 'h-d3',
  'family-01-interjection-a': 'd-2',
  'family-01-interjection-b': 'd-3',
  'friend-01-interjection-a': 'd-2',
  'friend-01-interjection-b': 'd-3',
}

function findHiddenDisputeMentionedByInterjection(
  state: ReturnType<typeof useGameStore.getState>,
  event: GameEventTrigger,
  interjectionId: string | undefined,
  text: string,
): string | null {
  const visibility = state.discovery?.disputeVisibility ?? {}
  const directTarget = interjectionId ? INTERJECTION_EMERGENCE_TARGETS[interjectionId] : null
  if (directTarget && visibility[directTarget]?.visibility === 'hidden') return directTarget

  const caseDisputes = state.caseData?.disputes ?? []
  const hiddenDisputes = caseDisputes.filter((d) =>
    d.id !== event.disputeId && visibility[d.id]?.visibility === 'hidden'
  )
  if (hiddenDisputes.length === 0) return null

  const normalizedText = text.replace(/\s+/g, '')
  const stop = new Set(['쟁점', '진짜', '실체', '이유', '의도', '패턴', '문제', '침묵', '주체'])
  let best: { id: string; score: number } | null = null
  for (const dispute of hiddenDisputes) {
    const tokens = String(dispute.name ?? dispute.id)
      .split(/[\s·,()]+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2 && !stop.has(token))
    const score = tokens.reduce((sum, token) => sum + (normalizedText.includes(token.replace(/\s+/g, '')) ? 1 : 0), 0)
    if (score > (best?.score ?? 0)) best = { id: dispute.id, score }
  }
  return best && best.score >= 2 ? best.id : null
}

export default function GameEventModal() {
  const pendingEvent = useStore(s => s.pendingGameEvent)
  const caseData = useStore(s => s.caseData)

  const caseKey = caseData?.caseId?.replace(/^case-/, '') ?? ''
  const pendingContradictionEvent = pendingEvent?.type === 'contradiction' && pendingEvent.scriptSlot?.textId
    ? getContradictionEvent(caseKey, pendingEvent.scriptSlot.textId)
    : null
  const invalidContradiction = pendingEvent?.type === 'contradiction' && !hasContradictionComparison(
    pendingContradictionEvent
      ? {
          party: pendingEvent.party,
          disputeId: pendingEvent.disputeId,
          previousClaim: pendingContradictionEvent.statementA,
          currentClaim: pendingContradictionEvent.statementB,
          reason: pendingContradictionEvent.npcReaction,
        }
      : undefined,
  )

  useEffect(() => {
    if (invalidContradiction) {
      useGameStore.getState().setPendingGameEvent(null)
    }
  }, [invalidContradiction])

  if (!pendingEvent || !caseData || invalidContradiction) return null

  const partyName = pendingEvent.party === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700/60 rounded-2xl w-full max-w-sm overflow-hidden animate-fade-in shadow-2xl">
        {pendingEvent.type === 'contradiction' && (
          <ContradictionModal event={pendingEvent} caseKey={caseKey} partyName={partyName} />
        )}
        {pendingEvent.type === 'interjection' && (
          <InterjectionModal event={pendingEvent} caseKey={caseKey} partyName={partyName} />
        )}
        {pendingEvent.type === 'emotional_burst' && (
          <EmotionalBurstModal event={pendingEvent} caseKey={caseKey} partyName={partyName} />
        )}
        {/* dispute_emergence는 Discovery 경로(DisputeEmergenceModal.tsx)에서 처리 */}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 모순 감지
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ContradictionModal({ event, caseKey, partyName }: { event: GameEventTrigger; caseKey: string; partyName: string }) {
  const { locale } = useI18n()
  const copy = EVENT_COPY[locale]
  const dismiss = useStore(s => s.setPendingGameEvent)
  const addDialogue = useStore(s => s.addDialogue)
  const turnCount = useStore(s => s.turnCount)
  const agentA = useStore(s => s.agentA)
  const agentB = useStore(s => s.agentB)

  const v3Event = event.scriptSlot?.textId
    ? getContradictionEvent(caseKey, event.scriptSlot.textId)
    : null

  const handlePointOut = () => {
    const s = useGameStore.getState()

    // 지연된 효과 적용 — 플레이어가 "지적한다"를 선택했을 때만
    for (const eff of event.deferredEffects ?? []) {
      switch (eff.type) {
        case 'lie_advance':
          // steps만큼 반복 전이 시도
          for (let i = 0; i < eff.steps; i++) {
            s.transitionLie(eff.party, eff.disputeId, 'event_contradiction_pointout')
          }
          break
        case 'emotion_spike':
          s.changeEmotion(eff.party, eff.delta)
          break
        case 'block_defense':
          // block_defense는 기존 effects 자동 적용 경로와 동일하게 처리 (로그만)
          break
      }
    }

    // 모순 지적 대사
    addDialogue({
      speaker: 'judge',
      text: v3Event
        ? `${localizeOrFallback(v3Event.statementA, locale, copy.previousStatement)} ${localizeOrFallback(v3Event.statementB, locale, copy.currentStatement)} — ${copy.pointOutSuffix}`
        : copy.contradictionExplain,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    const lie = (event.party === 'a' ? agentA : agentB).lieStateMap[event.disputeId]?.currentState ?? 'S0'
    const reactionIsNarrative = isNarrativeReaction(v3Event?.npcReaction)
    addDialogue({
      speaker: event.party,
      text: reactionIsNarrative
        ? buildContradictionFallbackLine(lie, locale)
        : localizeOrFallback(v3Event?.npcReaction, locale, buildContradictionFallbackLine(lie, locale)),
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    if (reactionIsNarrative && v3Event?.npcReaction) {
      addDialogue({
        speaker: 'system',
        text: localizeOrFallback(v3Event.npcReaction, locale, copy.pointed),
        relatedDisputes: [event.disputeId],
        turn: turnCount,
      })
    }
    // 피드백 시스템 메시지
    addDialogue({
      speaker: 'system',
      text: event.severity === 'critical'
        ? copy.criticalPointed
        : copy.pointed,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  const handleLetGo = () => {
    // deferredEffects 적용하지 않고 dismiss
    addDialogue({
      speaker: 'system',
      text: copy.skippedContradiction,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  return (
    <>
      <EventHeader icon="⚡" title={copy.contradictionTitle} severity={event.severity} color="yellow" />
      <div className="px-4 py-3">
        {v3Event ? (
          <div className="space-y-2">
            <p className="text-xs text-gray-300 leading-relaxed">{localizeOrFallback(v3Event.statementA, locale, copy.previousStatement)}</p>
            <p className="text-xs text-amber-400/80 leading-relaxed">{localizeOrFallback(v3Event.statementB, locale, copy.currentStatement)}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-300 leading-relaxed">{localizeOrFallback(event.description, locale, copy.contradictionExplain)}</p>
        )}
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={handleLetGo}
          className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700">
          {localizeOrFallback(v3Event?.options.let_go.label, locale, copy.letGo)}
        </button>
        <button onClick={handlePointOut}
          className="flex-1 text-xs py-2.5 rounded-xl bg-yellow-700 text-white font-bold hover:bg-yellow-600">
          {localizeOrFallback(v3Event?.options.point_out.label, locale, copy.pointOut)}
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 끼어들기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function InterjectionModal({ event, caseKey, partyName }: { event: GameEventTrigger; caseKey: string; partyName: string }) {
  const { locale } = useI18n()
  const copy = EVENT_COPY[locale]
  const dismiss = useStore(s => s.setPendingGameEvent)
  const addDialogue = useStore(s => s.addDialogue)
  const changeTrust = useStore(s => s.changeTrust)
  const turnCount = useStore(s => s.turnCount)
  const trackMetric = useStore(s => s.trackMetric)

  const v3Event = event.scriptSlot?.textId
    ? getInterjectionEvent(caseKey, event.scriptSlot.textId)
    : null

  const interjectionText = v3Event?.interjectionLine ?? event.description

  const handleAllow = () => {
    const state = useGameStore.getState()
    addDialogue({
      speaker: event.party,
      text: localizeOrFallback(interjectionText, locale, copy.interjectionFallback),
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    addDialogue({
      speaker: 'judge',
      text: copy.judgeAllow,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    trackMetric('interjectionAllowed')
    trackMetric('counterQuestionUsed')
    recordInterjectionChoice('allow')
    // 권위 감소
    changeTrust(event.party === 'a' ? 'b' : 'a', 'trustTowardJudge', -3)
    const emergedDisputeId = findHiddenDisputeMentionedByInterjection(state, event, v3Event?.id, interjectionText)
    if (emergedDisputeId) {
      const dispute = state.caseData?.disputes.find((d) => d.id === emergedDisputeId)
      state.emergeDispute(
        emergedDisputeId,
        'interjection',
        turnCount,
        dispute?.name ?? copy.interjectionDispute,
      )
    }
    dismiss(null)
  }

  const handleBlock = () => {
    recordInterjectionChoice('block')
    addDialogue({
      speaker: 'judge',
      text: copy.judgeBlock,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  return (
    <>
      <EventHeader icon="🗣️" title={copy.interjectionTitle(partyName)} severity={event.severity} color="orange" />
      <div className="px-4 py-3">
        <div className="bg-gray-800/60 border border-gray-700/30 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-200 leading-relaxed italic">"{localizeOrFallback(interjectionText, locale, copy.interjectionFallback)}"</p>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={handleBlock}
          className="flex-1 text-xs py-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700">
          {localizeOrFallback(v3Event?.options.block.label, locale, copy.block)}
        </button>
        <button onClick={handleAllow}
          className="flex-1 text-xs py-2.5 rounded-xl bg-orange-700 text-white font-bold hover:bg-orange-600">
          {localizeOrFallback(v3Event?.options.allow.label, locale, copy.allow)}
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 감정 폭발
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EmotionalBurstModal({ event, caseKey, partyName }: { event: GameEventTrigger; caseKey: string; partyName: string }) {
  const { locale } = useI18n()
  const copy = EVENT_COPY[locale]
  const dismiss = useStore(s => s.setPendingGameEvent)
  const addDialogue = useStore(s => s.addDialogue)
  const changeTrust = useStore(s => s.changeTrust)
  const changeEmotion = useStore(s => s.changeEmotion)
  const turnCount = useStore(s => s.turnCount)

  const v3Event = event.scriptSlot?.textId
    ? getOutburstEvent(caseKey, event.scriptSlot.textId)
    : null

  // ScriptedText 우선 → V3 이벤트 → 폴백
  const scriptedOverload = getScriptedEmotionalOverload(normalizeCaseKey(caseKey), event.party, event.disputeId)
  const outburstLine = scriptedOverload?.text ?? v3Event?.outburstLine
  const outburstText = outburstLine ?? event.description
  const emitOutburst = () => {
    addDialogue({
      speaker: outburstLine ? event.party : 'system',
      text: localizeOrFallback(outburstText, locale, copy.outburstFallback),
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
  }

  const handlePress = () => {
    const s = useGameStore.getState()
    emitOutburst()
    addDialogue({
      speaker: 'judge',
      text: copy.judgePress,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    // 더 압박: 감정 상승 + 누설 위험 증가
    changeEmotion(event.party, 8)
    // 누설 미터 보너스: 압박으로 인한 누설 위험 증가
    const meters = s.questionMeters
    const partyMeter = meters[event.party]
    useGameStore.setState({
      questionMeters: {
        ...meters,
        [event.party]: { ...partyMeter, leakMeter: Math.min(partyMeter.leakMeter + 10, 100) },
      },
    })
    // 후속 행동 추천
    addDialogue({
      speaker: 'system',
      text: copy.pressureHint,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  const handleCalm = () => {
    const s = useGameStore.getState()
    emitOutburst()
    addDialogue({
      speaker: 'judge',
      text: copy.judgeCalm,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    // 진정: 신뢰 상승 + 감정 하락
    changeTrust(event.party, 'trustTowardJudge', 12)
    changeEmotion(event.party, -10)
    // 신뢰 창구 보너스: 진정시키면 신뢰 창구 열림
    const meters = s.questionMeters
    const partyMeter = meters[event.party]
    useGameStore.setState({
      questionMeters: {
        ...meters,
        [event.party]: { ...partyMeter, trustWindow: Math.min(partyMeter.trustWindow + 15, 100) },
      },
    })
    // 후속 행동 추천
    addDialogue({
      speaker: 'system',
      text: copy.empathyHint,
      relatedDisputes: [event.disputeId],
      turn: turnCount,
    })
    dismiss(null)
  }

  return (
    <>
      <EventHeader icon="🔥" title={copy.burstTitle(partyName)} severity={event.severity} color="red" />
      <div className="px-4 py-3">
        <div className="bg-red-950/30 border border-red-800/30 rounded-lg px-3 py-2">
          <p className="text-xs text-red-200 leading-relaxed italic">"{localizeOrFallback(outburstText, locale, copy.outburstFallback)}"</p>
        </div>
      </div>
      <div className="flex gap-2 px-4 pb-4">
        <button onClick={handleCalm}
          className="flex-1 text-xs py-2.5 rounded-xl bg-blue-900/60 text-blue-300 font-semibold hover:bg-blue-900/80">
          {localizeOrFallback(v3Event?.options.calm.label, locale, copy.calm)}
        </button>
        <button onClick={handlePress}
          className="flex-1 text-xs py-2.5 rounded-xl bg-red-700 text-white font-bold hover:bg-red-600">
          {localizeOrFallback(v3Event?.options.press.label, locale, copy.press)}
        </button>
      </div>
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공통 헤더
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function EventHeader({ icon, title, severity, color }: {
  icon: string
  title: string
  severity: 'minor' | 'major' | 'critical'
  color: 'yellow' | 'orange' | 'red' | 'cyan'
}) {
  const colorMap = {
    yellow: 'from-yellow-900/40 to-gray-900 border-yellow-600/30 text-yellow-400',
    orange: 'from-orange-900/40 to-gray-900 border-orange-600/30 text-orange-400',
    red: 'from-red-900/40 to-gray-900 border-red-600/30 text-red-400',
    cyan: 'from-cyan-900/40 to-gray-900 border-cyan-600/30 text-cyan-400',
  }

  const severityLabels = { minor: '', major: '!', critical: '!!' }

  return (
    <div className={`bg-gradient-to-b ${colorMap[color]} border-b px-4 py-3`}>
      <div className="flex items-center gap-2">
        <Emoji char={icon} size={20} />
        <span className={`text-sm font-bold ${colorMap[color].split(' ').pop()}`}>{title}</span>
        {severity !== 'minor' && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-600/30 text-red-400 font-bold ml-auto">
            {severityLabels[severity]}
          </span>
        )}
      </div>
    </div>
  )
}

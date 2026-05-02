import { useEffect, useRef } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import { resetFatigueForDossier } from '../../../engine/questionFatigueEngine'
import { getContradictionEvent, getInterjectionEvent, getOutburstEvent } from '../../../engine/v3GameLoopLoader'
import { applyWitnessSlot } from '../../../hooks/useActionDispatch'
import { recordInterjectionChoice } from '../../../engine/phase3LogCollector'
import { pp이가, pp을를 } from '../../../engine/koreanPostposition'
import type { TruthJudgment } from '../../../types/discovery'
import { getEmergenceHook, getEmergenceHookSpeaker } from '../../../data/emergenceHooks'
import { hasContradictionComparison } from '../../../utils/contradiction'
import type { Dispute } from '../../../types/case'

const CONTRADICTION_SURFACE_FALLBACK = '진술 흐름에서 확인할 지점이 생겼습니다. 추가 질문으로 맥락을 확인하세요.'
const EMOTIONAL_BURST_SURFACE_FALLBACK = '감정이 격해졌습니다. 반응을 더 밀어붙일지, 잠시 정리할지 판단하세요.'

/**
 * Discovery 9종 pending 상태를 감시해 통합 피드백 큐로 보내는 Watcher.
 * 기존 PCDiscoveryOverlay 의 각 Panel 을 큐 기반 카드로 치환.
 */

const ROUTE_LABELS: Record<string, string> = {
  evidence: '증거로 새 쟁점이 드러났습니다.',
  truth_confrontation: '진실 공방에서 새 쟁점이 튀어나왔습니다.',
  witness: '증인 진술이 다른 갈래를 열었습니다.',
  lie_collapse: '거짓 붕괴로 숨은 쟁점이 드러났습니다.',
  emotional_slip: '감정 반응에서 확인할 단서가 생겼습니다.',
  interjection: '끼어든 발언이 새 쟁점을 열었습니다.',
}

const JUDGMENT_LABELS: Record<TruthJudgment, string> = {
  believe_a: 'A의 주장이 더 설득력 있습니다',
  believe_b: 'B의 주장이 더 설득력 있습니다',
  both_partial: '양쪽 모두 일부만 사실입니다',
  undetermined: '지금은 보류 (나중에 다시 판단)',
}

const DISPUTE_WEIGHT_LABELS: Record<string, string> = {
  high: '높음',
  medium: '보통',
  low: '낮음',
}

const DISPUTE_AMBIGUITY_LABELS: Record<string, string> = {
  high: '높음',
  medium: '보통',
  mid: '보통',
  low: '낮음',
  none: '낮음',
}

function buildDisputeEmergenceDetails(dispute: Dispute | undefined, routeDescription: string | undefined) {
  const name = dispute?.name ?? '새 쟁점'
  const axis = dispute?.mediationLink?.trim() || name
  const evidenceCount = dispute?.requiredEvidence?.length ?? 0
  const evidenceText = evidenceCount > 0
    ? `관련 증거 ${evidenceCount}개와 증인/발언을 대조해 사실관계를 확정합니다.`
    : '양측 진술과 새로 나온 단서를 대조해 사실관계를 확정합니다.'
  const legalText = dispute?.legitimacyIssue
    ? '절차상 책임이나 위법성도 별도 판단해야 합니다.'
    : '현재 단계에서는 결론이 아니라 검토 범위만 추가됩니다.'

  const blocks = [
    {
      title: '검토 축',
      text: `${axis}${pp을를(axis)} 중심으로 양측 설명이 어디서 갈라지는지 확인합니다.`,
    },
    {
      title: '확인 방향',
      text: evidenceText,
    },
    {
      title: dispute?.legitimacyIssue ? '절차 책임' : '판단 상태',
      text: legalText,
    },
  ]

  const meta = [
    dispute?.weight ? `중요도: ${DISPUTE_WEIGHT_LABELS[dispute.weight] ?? dispute.weight}` : null,
    dispute?.ambiguity ? `모호성: ${DISPUTE_AMBIGUITY_LABELS[dispute.ambiguity] ?? dispute.ambiguity}` : null,
    evidenceCount > 0 ? `필요 증거: ${evidenceCount}개` : null,
  ].filter(Boolean) as string[]

  const routeLine = routeDescription?.trim()
  const body = routeLine
    ? `${routeLine} 이제 "${name}"을 별도 쟁점으로 추적합니다.`
    : `"${name}"이 별도 쟁점으로 추가되었습니다.`
  const notebookSummary = `${axis}. ${evidenceText} ${legalText}`.slice(0, 150)
  const observationSummary = `${name} - ${axis}`

  return { body, blocks, meta, notebookSummary, observationSummary }
}

function buildEmotionalBurstFollowUp(choice: 'press' | 'calm', hasScriptedOutburst: boolean): string {
  if (choice === 'press') {
    return hasScriptedOutburst
      ? '알겠습니다. 더 돌려 말하지 않겠습니다. 숨긴 이유와 제가 한 행동을 이어서 말씀드리겠습니다.'
      : '말씀드리겠습니다. 감정이 앞섰지만, 피하지 않고 사실관계를 이어서 말하겠습니다.'
  }
  return hasScriptedOutburst
    ? '네. 흥분해서 앞뒤가 흐려졌습니다. 사실관계부터 다시 정리하겠습니다.'
    : '네. 잠시 정리하겠습니다. 제가 아는 사실부터 차례대로 말하겠습니다.'
}

function isNarrativeReaction(text: string | undefined): boolean {
  if (!text) return false
  return /(부딪힌다|드러난다|흔들린다|뒤집힌다|갈라진다|맞선다|올라오자|설명이|해석이|책임의 방향)/.test(text)
}

function buildContradictionFallbackLine(lieState: string): string {
  if (lieState >= 'S3') return '...그건... 상황이 복잡했습니다. 제가 처음에 말씀드린 것과 다른 부분이 있었습니다.'
  if (lieState >= 'S2') return '재판관님, 제 기억이 혼란스러웠던 것 같습니다. 다시 정리하겠습니다.'
  return '그건... 제가 말한 것과 다르지 않습니다. 맥락이 다른 것입니다.'
}

export default function DiscoveryFeedbackWatcher() {
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
      title: '진실 공방이 열렸다. 양측 주장을 비교해 판결을 내려야 한다.',
      summary: `${dispute?.name ?? pendingConfrontation.disputeId}`,
      disputeId: pendingConfrontation.disputeId,
    })
    const handleDefer = () => {
      useGameStore.getState().deferVerdict(pendingConfrontation)
      enqueuedRef.current.delete(key)
    }

    state.enqueueFeedback({
      kind: 'confrontation',
      eyebrow: '진실 공방',
      title: dispute?.name ?? pendingConfrontation.disputeId,
      claims: {
        partyA: { name: partyA, text: pendingConfrontation.claimA.summary },
        partyB: { name: partyB, text: pendingConfrontation.claimB.summary },
      },
      tone: 'gold',
      actionsLayout: 'vertical',
      actions: judgments.map((value) => ({
        label: JUDGMENT_LABELS[value].replace('A의', `${partyA}의`).replace('B의', `${partyB}의`),
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
  }, [pendingConfrontation])

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

    let leftLabel = '기존 판단'
    let leftText = ''
    if (beliefParty) {
      const partyName = beliefParty === 'a' ? partyA : partyB
      const recentStatement = [...state.dialogueLog].reverse().find((d) =>
        d.speaker === beliefParty && (d.relatedDisputes ?? []).includes(pendingConflict.disputeId)
      )
      leftLabel = `기존 판단 · ${partyName} 쪽 주장`
      leftText = recentStatement?.text ?? `${partyName}의 주장에 설득력을 두었습니다.`
    } else if (pendingConflict.currentJudgment === 'both_partial') {
      leftLabel = '기존 판단 · 양측 일부 사실'
      leftText = '양측 주장에 각자 맞는 부분과 과장이 섞여 있다고 보았습니다.'
    } else {
      leftLabel = '기존 판단 · 보류'
      leftText = '추가 자료가 더 필요하다고 보았습니다.'
    }

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'event',
      iconId: 'i-conflict',
      title: '기존 판단과 새 정보가 충돌하고 있다.',
      summary: `${dispute?.name ?? pendingConflict.disputeId}`,
      disputeId: pendingConflict.disputeId,
    })
    state.enqueueFeedback({
      kind: 'conflict',
      eyebrow: '판단 충돌',
      title: dispute?.name ?? pendingConflict.disputeId,
      contrast: {
        left:  { label: leftLabel, text: leftText },
        right: { label: '새 충돌 정보', text: pendingConflict.conflictingInfo },
      },
      tone: 'gold',
      actions: [
        {
          label: '현재 판단 유지',
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingConflict(null)
            enqueuedRef.current.delete(key)
          },
        },
        {
          label: '새 정보 기준으로 수정',
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
  }, [pendingConflict])

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
    const disputeName = dispute?.name ?? pendingEmergence.disputeId
    const routeLabel = ROUTE_LABELS[pendingEmergence.route] ?? '새 단서가 갈래를 바꿨습니다.'
    const emergenceDetails = buildDisputeEmergenceDetails(dispute, pendingEmergence.description)

    // 쟁점 발견 시 시스템 메시지로 흐름 표시 — 모달은 자동으로 띄우지 않고 (B-17 D 옵션),
    // 시스템 메시지 클릭 시 수동 트리거되도록 pendingFeedback 부착.
    const sysMsgId = state.addDialogue({
      speaker: 'system',
      text: `새 쟁점이 드러났다 — ${disputeName}`,
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
      title: `새 쟁점 - ${disputeName}`,
      summary: emergenceDetails.notebookSummary,
      disputeId: pendingEmergence.disputeId,
      linkedDialogueId: sysMsgId,
    })
    state.attachDialoguePendingFeedback(sysMsgId, {
      kind: 'emergence',
      eyebrow: '새 쟁점 발견',
      subtitle: routeLabel,
      title: disputeName,
      body: emergenceDetails.body,
      blocks: emergenceDetails.blocks,
      meta: emergenceDetails.meta,
      tag: '쟁점 보드 + 재판관 수첩',
      tone: 'gold',
      actions: [
        {
          label: '확인했습니다',
          tone: 'gold',
          onSelect: () => {
            const s = useGameStore.getState()
            s.acknowledgeEmergence(pendingEmergence.disputeId)
            s.consumeDialoguePendingFeedback(sysMsgId)
            enqueuedRef.current.delete(key)
            // [Phase E] 모달 닫힘 후 강조 시작 — 우측 쟁점 카드 + 상단 쟁점 영역 깜빡 (4초)
            // 번개 이펙트도 모달 dismiss 직후로 이동 (모달 블러로 가려지는 결함 해소).
            s.setLastFocusedDisputeId(pendingEmergence.disputeId)
            s.setRecentlyEmergedDispute(pendingEmergence.disputeId)
            // 메시지 → 탑바 쟁점 chip 으로 연결 1회 + 오라 발사
            const escape = typeof CSS !== 'undefined' && typeof CSS.escape === 'function' ? CSS.escape : (v: string) => v
            const logSelector = `[data-dialogue-id="${escape(sysMsgId)}"] .pc-log-system-card`
            const notebookSelector = '[data-resonance-target="judge-notebook"]'
            const toSelector = `[data-dispute-id="${escape(pendingEmergence.disputeId)}"]`
            s.enqueueAura({ targetSelector: notebookSelector, style: 'archive' })
            s.enqueueAura({ targetSelector: toSelector, style: 'electric' })
            s.enqueueResonance({
              fromSelector: logSelector,
              toSelector: notebookSelector,
              targetKey: `notebook:dispute:${pendingEmergence.disputeId}`,
              style: 'archive',
            })
            s.enqueueResonance({
              fromSelector: notebookSelector,
              toSelector,
              reason: 'dispute_emergence',
              targetKey: `dispute:${pendingEmergence.disputeId}`,
              style: 'lightning',
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
              const emergedName = emergedDispute?.name ?? ''
              s.addDialogue({
                speaker: s.pcTargetParty,
                text: emergedName
                  ? `…사실, ${emergedName} 건도 함께 봐주셔야 합니다.`
                  : '…사실, 그것만이 아니었습니다.',
                relatedDisputes: [pendingEmergence.disputeId],
                turn: s.turnCount,
                behaviorHint: '시선이 흔들리며 잠시 멈춘다.',
                source: 'fallback',
              })
            }
          },
        },
      ],
    }, state.turnCount)
  }, [pendingEmergence])

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
    if (sourceDispute) meta.push(`관련 쟁점: ${sourceDispute.name}`)
    if (linkedDispute) meta.push(`연결 쟁점: ${linkedDispute.name}`)

    state.addJudgeObservation({
      turnCount: state.turnCount,
      category: 'slip',
      iconId: 'i-heart',
      title: pendingSlip.slipText,
      summary: `${partyData.name} · 감정 실수 포착`,
      party: pendingSlip.party,
      disputeId: pendingSlip.sourceDisputeId,
    })
    state.enqueueFeedback({
      kind: 'emotional_slip',
      eyebrow: '감정 실수 포착',
      title: partyData.name,
      quote: pendingSlip.slipText,
      meta,
      tone: 'red',
      actions: [
        {
          label: '지금은 넘긴다',
          tone: 'gray',
          onSelect: () => {
            useGameStore.getState().setPendingSlip(null)
            enqueuedRef.current.delete(key)
          },
        },
        {
          label: '관찰에 기록',
          tone: 'red',
          onSelect: () => {
            const fresh = useGameStore.getState()
            fresh.addEmotionalSlip(pendingSlip)
            enqueuedRef.current.delete(key)
          },
        },
      ],
    })
  }, [pendingSlip])

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
                effectSummary.push(`거짓말 단계 ${beforeState} → ${afterState}`)
              }
              break
            }
            case 'emotion_spike':
              s.changeEmotion(effect.party, effect.delta)
              effectSummary.push(`감정 ${effect.delta > 0 ? '+' : ''}${effect.delta}`)
              break
          }
        }
        s.addDialogue({
          speaker: 'judge',
          text: v3Event
            ? `${partyName} 씨, 아까 하신 말씀과 지금 말씀이 다릅니다. 어느 쪽이 맞습니까?`
            : `${partyName} 씨, 방금 답변이 앞선 진술과 맞지 않습니다. 정확히 말씀해 주십시오.`,
          relatedDisputes: [ev.disputeId],
          turn: s.turnCount,
        })
        const agent = ev.party === 'a' ? s.agentA : s.agentB
        const lie = agent.lieStateMap[ev.disputeId]?.currentState ?? 'S0'
        const reactionIsNarrative = isNarrativeReaction(v3Event?.npcReaction)
        const npcText = reactionIsNarrative
          ? buildContradictionFallbackLine(lie)
          : v3Event?.npcReaction ?? buildContradictionFallbackLine(lie)
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
            ? `결정적 모순이 드러났다. ${partyName}의 방어가 크게 흔들린다.`
            : '진술이 엇갈리기 시작했다. 지금 압박하면 효과적이다.',
          summary: `${partyName} · 모순 추궁 결과`,
          party: ev.party,
          disputeId: ev.disputeId,
        })
        // [결함 24] 모순 추궁 효과 명시적 시각화 메시지
        if (effectSummary.length > 0) {
          useGameStore.getState().addDialogue({
            speaker: 'system',
            text: `💥 모순 추궁이 통했습니다 — ${effectSummary.join(' / ')}`,
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
            text: `🔒 ${partyName}${pp이가(partyName)} 모순 추궁의 충격으로 답변을 거부합니다. (2턴간 질문 불가)`,
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
            previousLabel: '이전 진술',
            currentLabel: '지금 진술',
          }
        : undefined
      if (!hasContradictionComparison(eventContradictionMeta)) {
        state.setPendingGameEvent(null)
        releaseKey()
        return
      }
      const contrastPayload = v3Event && isSpoilerSafeStage
        ? {
            left:  { label: eventContradictionMeta.previousLabel ?? '이전 진술', text: eventContradictionMeta.previousClaim },
            right: { label: eventContradictionMeta.currentLabel ?? '지금 진술', text: eventContradictionMeta.currentClaim },
          }
        : undefined
      const safeFallbackBody = !isSpoilerSafeStage
        ? `${partyName}의 진술 흐름에서 어긋남이 감지되었습니다. 모순을 찌르면 다음 단서가 열릴 수 있습니다.`
        : null

      state.addJudgeObservation({
        turnCount: state.turnCount,
        category: 'contradiction',
        iconId: 'i-bolt',
        title: '이전 진술과 지금 진술이 어긋난다. 모순을 찌를 기회다.',
        summary: `${partyName} · ${disputeName}`,
        party: ev.party,
        disputeId: ev.disputeId,
      })
      // [B-17 D] 자동 모달 X — 시스템 메시지 클릭 시 수동 트리거.
      const sysMsgId = state.addDialogue({
        speaker: 'system',
        text: `진술이 엇갈렸다 — ${partyName} · ${disputeName}`,
        relatedDisputes: [ev.disputeId],
        turn: state.turnCount,
      })
      state.attachDialoguePendingFeedback(sysMsgId, {
        kind: 'contradiction',
        eyebrow: '모순 발견',
        subtitle: `${disputeName} · ${partyName}`,
        body: contrastPayload ? undefined : (safeFallbackBody ?? CONTRADICTION_SURFACE_FALLBACK),
        contrast: contrastPayload,
        blocks: [{ title: '왜 어긋나는지', text: eventContradictionMeta.reason }],
        // [TC-A2 픽스] '진술이 엇갈렸다' 시스템 메시지는 빨강 톤(공격/모순)으로 통일
        // — '추궁하기' 시스템 메시지(.is-action)와 의미·시각 모두 일치
        tone: 'alert',
        actions: [
          {
            label: '지금은 넘긴다',
            tone: 'gray',
            onSelect: () => {
              useGameStore.getState().setPendingGameEvent(null)
              useGameStore.getState().consumeDialoguePendingFeedback(sysMsgId)
              releaseKey()
            },
          },
          {
            label: '모순을 찌른다',
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
          ? '재판관님, 잠깐만요. 저도 할 말이 있습니다.'
          : '재판관님, 지금 하신 말씀은 사실과 다릅니다.'

      const handleAllow = () => {
        const s = useGameStore.getState()
        s.addDialogue({ speaker: 'judge', text: '발언을 허용합니다.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
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
          text: `${partyName} 씨, 지금은 발언 순서가 아닙니다. 심문을 계속합니다.`,
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
        text: `${partyName}${pp이가(partyName)} 끼어들려 한다 — ${disputeName}`,
        relatedDisputes: [ev.disputeId],
        turn: state.turnCount,
      })
      state.attachDialoguePendingFeedback(sysMsgId, {
        kind: 'contradiction',
        eyebrow: '끼어들기',
        subtitle: `${partyName} · ${disputeName}`,
        quote: interjectionText,
        tone: 'blue',
        actions: [
          {
            label: '제지한다',
            tone: 'gray',
            onSelect: () => {
              handleBlock()
              useGameStore.getState().consumeDialoguePendingFeedback(sysMsgId)
            },
          },
          {
            label: '허용한다',
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
      const outburstText = outburstLine ?? EMOTIONAL_BURST_SURFACE_FALLBACK

      const emitOutburst = () => {
        const s = useGameStore.getState()
        if (outburstLine) {
          s.addDialogue({ speaker: ev.party, text: outburstLine, relatedDisputes: [ev.disputeId], turn: s.turnCount })
        }
      }
      const handlePress = () => {
        const s = useGameStore.getState()
        emitOutburst()
        s.addDialogue({ speaker: 'judge', text: '계속 말해보세요. 지금의 흐름을 더 확인하겠습니다.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.addDialogue({
          speaker: ev.party,
          text: buildEmotionalBurstFollowUp('press', Boolean(outburstLine)),
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
          title: '격앙 상태가 이어지고 있다. 사실 추궁과 동기 탐색이 더 강하게 작용할 수 있다.',
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
        s.addDialogue({ speaker: 'judge', text: '잠시 진정하고, 사실만 다시 정리해 주세요.', relatedDisputes: [ev.disputeId], turn: s.turnCount })
        s.addDialogue({
          speaker: ev.party,
          text: buildEmotionalBurstFollowUp('calm', Boolean(outburstLine)),
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
          title: '감정이 가라앉고 있다. 공감 접근으로 다시 사실관계를 정리하기 좋은 흐름이다.',
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
        summary: `${partyName} · 감정 폭발`,
        party: ev.party,
        disputeId: ev.disputeId,
      })
      state.enqueueFeedback({
        kind: 'emotional_slip',
        eyebrow: '감정 폭발',
        title: `${partyName}의 감정이 격해졌습니다`,
        subtitle: `${partyName} · ${disputeName}`,
        quote: outburstLine ? outburstText : undefined,
        body: outburstLine ? undefined : outburstText,
        tone: 'red',
        actions: [
          {
            label: '진정시킨다',
            tone: 'gray',
            onSelect: () => {
              handleCalm()
            },
          },
          {
            label: '밀어붙인다',
            tone: 'red',
            onSelect: () => {
              handlePress()
            },
          },
        ],
      })
      return
    }
  }, [pendingGameEvent])

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
        title: '증거 제시가 충분히 먹히지 않았다. 완충 스킬을 쓸 수 있다.',
        summary: `${evidenceName} · 판결 완충`,
        evidenceId: pp.evidenceId,
      })
      state.enqueueFeedback({
        kind: 'perk_choice',
        eyebrow: '판결 완충',
        title: evidenceName,
        body: '증거 제시가 충분히 먹히지 않았습니다. 완충 스킬로 한 번 수습할 수 있습니다.',
        tone: 'gold',
        actions: [
          {
            label: '제시를 철회한다',
            tone: 'gray',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('penaltyBufferUsesRemaining')
              s.addDialogue({
                speaker: 'judge',
                text: `${evidenceName} 제시는 취소합니다. 다시 구성해서 제시하세요.`,
                relatedDisputes: evidence?.proves ?? [],
                turn: s.turnCount,
              })
              s.setPendingEvidenceResult(null)
              s.setPendingPerkChoice(null)
              releaseKey()
            },
          },
          {
            label: '관점을 바꿔 제시한다',
            tone: 'gold',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('penaltyBufferUsesRemaining')
              s.changeEmotion(pp.target, -4)
              s.addDialogue({
                speaker: 'system',
                text: `${evidenceName}의 제시 관점을 조정해 패널티를 줄였습니다.`,
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
        title: '같은 쟁점을 너무 오래 밀었다. 질문 각도를 초기화할 수 있다.',
        summary: `${partyName} · ${disputeName}`,
        party: pp.party,
        disputeId: pp.disputeId,
      })
      state.enqueueFeedback({
        kind: 'perk_choice',
        eyebrow: '집요함 추가',
        title: `${partyName} · ${disputeName}`,
        body: '같은 쟁점을 너무 오래 밀었습니다. 스킬을 써서 질문 각도를 초기화할 수 있습니다.',
        tone: 'blue',
        actions: [
          {
            label: '지금은 넘긴다',
            tone: 'gray',
            onSelect: () => {
              useGameStore.getState().setPendingPerkChoice(null)
              releaseKey()
            },
          },
          {
            label: '질문 각도 초기화',
            tone: 'blue',
            onSelect: () => {
              const s = useGameStore.getState()
              s.consumePerkUse('angleSwitchOpportunity')
              resetFatigueForDossier(pp.party, pp.disputeId)
              s.addDialogue({
                speaker: 'system',
                text: `${disputeName} 쟁점의 질문 피로도를 초기화했습니다. 다른 각도로 다시 밀 수 있습니다.`,
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
  }, [pendingPerkChoice])

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
        ? `${pc.witnessName}에게 이어 물을 지점이 열렸다.`
        : `${pc.witnessName}${pp이가(pc.witnessName)} 증언대에 섰다.`,
      summary: pc.isResummon ? '증인 재심문' : '증인 심문',
    })
    state.enqueueFeedback({
      kind: 'witness_choice',
      eyebrow: '증인 심문',
      title: pc.witnessName,
      body: pc.isResummon
        ? '앞선 답변을 바탕으로 더 좁혀 물어볼 질문을 선택하세요.'
        : '먼저 표면 정황을 확인할 질문을 선택하세요. 답변이 이어질수록 질문이 구체화됩니다.',
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
  }, [pendingWitnessChoice])

  return null
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../../../store/useGameStore'
import type { DialogueEntry as DialogueEntryType, EmotionalPhase } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'
import { openPcInteractionPanel, type PcInteractionAction } from './PCInteractionPanel'

const EMOTION_LABELS: Partial<Record<EmotionalPhase, string>> = {
  confident: '자신감',
  shaken: '동요',
  angry: '격앙',
  resigned: '체념',
}

const EXPLAINER_KEYWORDS = ['정리', '설명', '힌트', '구분', '주의', '필요']

function useRevealText(text: string, animate: boolean) {
  const [displayText, setDisplayText] = useState(animate ? '' : text)

  useEffect(() => {
    if (!animate) {
      setDisplayText(text)
      return
    }

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setDisplayText(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(timer)
      }
    }, 14)

    return () => window.clearInterval(timer)
  }, [animate, text])

  return displayText
}

function MessageBubble({ entry, animate }: { entry: DialogueEntryType; animate: boolean }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const displayText = useRevealText(entry.text, animate)
  const fullText = entry.text.trim()
  const nameA = caseData?.duo.partyA.name ?? '당사자 A'
  const nameB = caseData?.duo.partyB.name ?? '당사자 B'

  const openEntryDetail = useCallback((
    title: string,
    subtitle: string,
    tone: 'blue' | 'red' | 'gold' | 'neutral',
    actions?: PcInteractionAction[],
  ) => {
    openPcInteractionPanel({
      title,
      subtitle,
      tone,
      body: [fullText, '', entry.behaviorHint ?? ''].filter(Boolean).join('\n'),
      actions,
    })
  }, [entry.behaviorHint, fullText])

  if (entry.speaker === 'system') {
    const contradiction = entry.contradictionMeta
    const isExplainer = !contradiction && EXPLAINER_KEYWORDS.some((keyword) => fullText.includes(keyword))

    const iconId = contradiction
      ? 'i-bolt'
      : isExplainer
        ? 'i-bulb'
        : fullText.includes('증거') || fullText.includes('단서')
          ? 'i-doc'
          : 'i-scale'

    if (contradiction) {
      return (
        <div className="pc-log-system-row is-action">
          <button
            className="pc-log-system-card is-action"
            onClick={() => {
              openPcInteractionPanel({
                title: '모순 감지',
                subtitle: `${contradiction.party === 'a' ? nameA : nameB} 진술 비교`,
                tone: 'gold',
                variant: 'feature',
                body: [
                  '이전 진술과 현재 진술 사이에서 모순이 감지되었습니다.',
                  '',
                  `이전 주장: ${contradiction.previousClaim}`,
                  `현재 주장: ${contradiction.currentClaim}`,
                  '',
                  '모순을 누적하면 거짓 상태가 흔들리고, 새로운 진술이나 단서가 열릴 수 있습니다.',
                ].join('\n'),
                actions: [
                  {
                    kind: 'run_contradiction',
                    label: '모순 추궁 실행',
                    party: contradiction.party,
                    disputeId: contradiction.disputeId,
                    previousClaim: contradiction.previousClaim,
                    currentClaim: contradiction.currentClaim,
                  },
                ],
              })
            }}
            type="button"
          >
            <span className="pc-log-system-card__icon">
              <PCSvgIcon id={iconId} size={16} />
            </span>
            <span className="pc-log-system-card__text">{displayText.trim()}</span>
          </button>
        </div>
      )
    }

    if (isExplainer) {
      return (
        <div className="pc-log-system-row is-explainer">
          <button
            className="pc-log-system-explainer"
            onClick={() => openEntryDetail('설명 메시지', '시스템 안내', 'gold')}
            type="button"
          >
            <span className="pc-log-system-explainer__line" />
            <span className="pc-log-system-explainer__body">
              <span className="pc-log-system-explainer__icon">
                <PCSvgIcon id={iconId} size={14} />
              </span>
              <span className="pc-log-system-explainer__text">{displayText}</span>
            </span>
            <span className="pc-log-system-explainer__line" />
          </button>
        </div>
      )
    }

    return (
      <div className="pc-log-system-row is-toast">
        <button
          className="pc-log-system-card"
          onClick={() => openEntryDetail('시스템 메시지', '진행 안내', 'neutral')}
          type="button"
        >
          <span className="pc-log-system-card__icon">
            <PCSvgIcon id={iconId} size={15} />
          </span>
          <span className="pc-log-system-card__text">{displayText}</span>
        </button>
      </div>
    )
  }

  if (entry.speaker === 'judge') {
    return (
      <div className="pc-log-row is-judge">
        <button className="pc-log-avatar is-judge" onClick={() => openEntryDetail('재판관', '판단 지시', 'gold')} type="button">
          <PCSvgIcon id="i-scale" size={24} />
        </button>
        <div className="pc-log-stack">
          <button className="pc-log-name is-judge pc-log-name--button" onClick={() => openEntryDetail('재판관', '판단 지시', 'gold')} type="button">
            재판관
          </button>
          <button className="pc-log-bubble is-judge" onClick={() => openEntryDetail('재판관', '판단 지시', 'gold')} type="button">
            <div className="pc-log-bubble__text">{displayText}</div>
          </button>
        </div>
      </div>
    )
  }

  if (entry.speaker === 'witness') {
    const witnessFavor = entry.witnessFavor === 'pro_b' ? 'is-right' : 'is-left'
    const witnessName = entry.witnessName ?? '증인'

    return (
      <div className={`pc-log-row ${witnessFavor}`}>
        <button className="pc-log-avatar is-witness" onClick={() => openEntryDetail(witnessName, '증언 정보', 'gold')} type="button">
          <PCSvgIcon id="i-person" size={24} />
        </button>
        <div className="pc-log-stack">
          <button className="pc-log-name is-witness pc-log-name--button" onClick={() => openEntryDetail(witnessName, '증언 정보', 'gold')} type="button">
            {witnessName}
          </button>
          <button className="pc-log-bubble is-witness" onClick={() => openEntryDetail(witnessName, '증언 정보', 'gold')} type="button">
            <div className="pc-log-bubble__text">{displayText}</div>
            {entry.behaviorHint ? <div className="pc-log-bubble__hint">{entry.behaviorHint}</div> : null}
          </button>
        </div>
      </div>
    )
  }

  const isPartyA = entry.speaker === 'a'
  const profile = isPartyA ? caseData?.duo.partyA : caseData?.duo.partyB
  const agent = isPartyA ? agentA : agentB
  const emotion = agent?.emotionalState.phase
  const emotionLabel = emotion ? EMOTION_LABELS[emotion] : null
  const faceId = profile ? getPcFaceSymbolId(isPartyA ? 'a' : 'b', profile, emotion) : 'i-person'
  const speakerName = isPartyA ? nameA : nameB
  const speakerTone = isPartyA ? 'blue' as const : 'red' as const
  const relatedDispute = entry.relatedDisputes[0] ?? null
  const actions: PcInteractionAction[] = [
    { kind: 'set_target', label: '대상 정보 보기', party: isPartyA ? 'a' : 'b' },
    ...(relatedDispute ? [{ kind: 'focus_dispute' as const, label: '관련 쟁점으로 이동', disputeId: relatedDispute }] : []),
  ]

  return (
    <div className={`pc-log-row ${isPartyA ? 'is-left' : 'is-right'}`}>
      <div className={`pc-log-speaker ${isPartyA ? 'is-a' : 'is-b'}`}>
        <button className={`pc-log-avatar ${isPartyA ? 'is-a' : 'is-b'}`} onClick={() => openEntryDetail(speakerName, '대상 정보', speakerTone, actions)} type="button">
          <PCSvgIcon id={faceId} size={24} />
        </button>
        <button
          className={`pc-log-speaker__name ${isPartyA ? 'is-a' : 'is-b'} pc-log-name--button`}
          onClick={() => openEntryDetail(speakerName, '대상 정보', speakerTone, actions)}
          type="button"
        >
          <span>{speakerName}</span>
          {emotionLabel ? <span className="pc-log-emotion">{emotionLabel}</span> : null}
        </button>
      </div>
      <div className="pc-log-stack">
        <button
          className={`pc-log-bubble ${isPartyA ? 'is-a' : 'is-b'}${entry.isConfidential ? ' is-confidential' : ''}`}
          onClick={() => openEntryDetail(speakerName, '발언 정보', speakerTone, actions)}
          type="button"
        >
          {entry.isConfidential ? (
            <div className="pc-log-bubble__confidential">
              <PCSvgIcon id="i-lock" size={12} />
              <span>비공개 진술</span>
            </div>
          ) : null}
          <div className="pc-log-bubble__text">{displayText}</div>
          {entry.behaviorHint ? <div className="pc-log-bubble__hint">{entry.behaviorHint}</div> : null}
        </button>
      </div>
    </div>
  )
}

export default function PCDialogueLog() {
  const dialogueLog = useStore((s) => s.dialogueLog)
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const llmTarget = useStore((s) => s.llmLoadingTarget)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
    return () => window.clearTimeout(timer)
  }, [dialogueLog.length])

  const visibleEntries = useMemo(() => dialogueLog.filter((entry) => !entry.isHidden), [dialogueLog])

  return (
    <>
      {visibleEntries.length === 0 && !isLLMLoading ? (
        <div className="pc-log-empty">사건이 시작되면 대화가 이곳에 표시됩니다.</div>
      ) : null}

      <div className="pc-log-list">
        {visibleEntries.map((entry, index) => (
          <MessageBubble key={entry.id} entry={entry} animate={index === visibleEntries.length - 1} />
        ))}
      </div>

      {isLLMLoading ? (
        <div className={`pc-log-loading ${llmTarget === 'b' ? 'is-right' : 'is-left'}`}>
          <PCSvgIcon id="i-scale" size={18} />
          <span>응답 생성 중...</span>
        </div>
      ) : null}

      <div ref={bottomRef} />
    </>
  )
}

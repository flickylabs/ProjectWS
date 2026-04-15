import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import type { DialogueEntry as DialogueEntryType, EmotionalPhase } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'
import { openPcInteractionPanel } from './PCInteractionPanel'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'

const CHAT_NOTE_DRAG_TYPE = 'application/x-pc-note'

const EMOTION_LABELS: Partial<Record<EmotionalPhase, string>> = {
  confident: '자신감',
  shaken: '동요',
  angry: '격앙',
  resigned: '체념',
}

const EXPLAINER_KEYWORDS = ['정리', '설명', '힌트', '구분', '주의', '필요']

// 모순 추궁 1회 사용 추적
const _usedContradictions = new Set<string>()

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

function MessageBubble({ entry, animate, combinableTexts }: { entry: DialogueEntryType; animate: boolean; combinableTexts?: Set<string> }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const rawText = entry.text ?? ''
  const displayText = useRevealText(rawText, animate)
  const fullText = rawText.trim()
  const nameA = caseData?.duo.partyA.name ?? '당사자 A'
  const nameB = caseData?.duo.partyB.name ?? '당사자 B'

  const speakerName = entry.speaker === 'a' ? nameA
    : entry.speaker === 'b' ? nameB
    : entry.speaker === 'judge' ? '재판관'
    : entry.speaker === 'witness' ? (entry.witnessName ?? '증인')
    : '시스템'

  const openEntryDetail = useCallback(() => {
    openPcInteractionPanel({
      title: `Turn ${entry.turn}`,
      subtitle: entry.behaviorHint ? '중요 발언' : '발언 기록',
      tone: entry.speaker === 'a' ? 'red' : entry.speaker === 'b' ? 'blue' : 'gold',
      variant: 'dialogue',
      body: fullText,
      dialogueTurn: entry.turn,
      dialogueSpeaker: entry.speaker,
      dialogueSpeakerName: speakerName,
      dialogueDisputeIds: entry.relatedDisputes,
    })
  }, [entry, fullText, speakerName])

  if (entry.speaker === 'system') {
    const contradiction = entry.contradictionMeta

    // ── 카테고리 분류 ──
    const category = contradiction ? 'action'
      : /\[주의\]|\[교착\]|소진|불가/.test(fullText) ? 'warning'
      : /🔓|해금|손에 넣|새 증거|📋|증거 제시|🔗|조합 격상|🔥|간파/.test(fullText) ? 'unlock'
      : /✅|결정적|확보/.test(fullText) ? 'success'
      : /🧑‍⚖️|증인.*소환/.test(fullText) ? 'witness'
      : EXPLAINER_KEYWORDS.some((kw) => fullText.includes(kw)) ? 'hint'
      : 'info'

    const iconId = category === 'action' ? 'i-bolt'
      : category === 'unlock' ? 'i-doc'
      : category === 'warning' ? 'i-flame'
      : category === 'success' ? 'i-star'
      : category === 'witness' ? 'i-witness'
      : category === 'hint' ? 'i-bulb'
      : 'i-scale'

    // ── 모순 추궁 (1회 사용) ──
    if (contradiction) {
      const used = _usedContradictions.has(entry.id)
      return (
        <div className="pc-log-system-row is-action">
          <button
            className={`pc-log-system-card is-action${used ? ' is-used' : ''}`}
            disabled={used}
            onClick={() => {
              if (used) return
              _usedContradictions.add(entry.id)
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
            <span className="pc-log-system-card__action-badge">{used ? '추궁 완료' : '추궁하기'}</span>
          </button>
        </div>
      )
    }

    // ── 성공/발견 (클릭 가능 강조, 1회) ──
    if (category === 'success') {
      const checked = _usedContradictions.has(entry.id)
      return (
        <div className="pc-log-system-row is-success">
          <button className={`pc-log-system-card is-success${checked ? ' is-used' : ''}`} onClick={() => { _usedContradictions.add(entry.id); openEntryDetail() }} type="button">
            <span className="pc-log-system-card__icon"><PCSvgIcon id={iconId} size={16} /></span>
            <span className="pc-log-system-card__text">{displayText}</span>
            {!checked ? <span className="pc-log-system-card__action-badge">확인</span> : null}
          </button>
        </div>
      )
    }

    // ── 힌트 (구분선 스타일) ──
    if (category === 'hint') {
      return (
        <div className="pc-log-system-row is-explainer">
          <button className="pc-log-system-explainer" onClick={() => openEntryDetail()} type="button">
            <span className="pc-log-system-explainer__line" />
            <span className="pc-log-system-explainer__body">
              <span className="pc-log-system-explainer__icon"><PCSvgIcon id={iconId} size={14} /></span>
              <span className="pc-log-system-explainer__text">{displayText}</span>
            </span>
            <span className="pc-log-system-explainer__line" />
          </button>
        </div>
      )
    }

    // ── 나머지: unlock / warning / witness / info ──
    return (
      <div className={`pc-log-system-row is-${category}`}>
        <button className={`pc-log-system-card is-${category}`} onClick={() => openEntryDetail()} type="button">
          <span className="pc-log-system-card__icon"><PCSvgIcon id={iconId} size={15} /></span>
          <span className="pc-log-system-card__text">{displayText}</span>
        </button>
      </div>
    )
  }

  if (entry.speaker === 'judge') {
    return (
      <div className="pc-log-judge-center">
        <button className="pc-log-judge-avatar" onClick={() => openEntryDetail()} type="button">
          <PCSvgIcon id="i-scale" size={22} />
        </button>
        <button className="pc-log-bubble is-judge" onClick={() => openEntryDetail()} type="button">
          <div className="pc-log-bubble__text">{displayText}</div>
        </button>
      </div>
    )
  }

  if (entry.speaker === 'witness') {
    const witnessFavor = entry.witnessFavor === 'pro_b' ? 'is-right' : 'is-left'
    const witnessName = entry.witnessName ?? '증인'
    const depthLabel = entry.behaviorHint?.includes('모호') ? '모호'
      : entry.behaviorHint?.includes('부분') ? '부분'
      : entry.behaviorHint?.includes('핵심') ? '핵심'
      : null

    return (
      <div className={`pc-log-row ${witnessFavor}`}>
        <div className="pc-log-speaker is-witness">
          <button className="pc-log-avatar is-witness" onClick={() => openEntryDetail()} type="button">
            <PCSvgIcon id="i-witness" size={22} />
          </button>
          <button className="pc-log-speaker__name is-witness pc-log-name--button" onClick={() => openEntryDetail()} type="button">
            <span>{witnessName}</span>
            {depthLabel ? <span className={`pc-log-depth-badge is-${depthLabel === '모호' ? 'vague' : depthLabel === '부분' ? 'partial' : 'full'}`}>{depthLabel}</span> : null}
          </button>
        </div>
        <div className="pc-log-stack">
          <button className="pc-log-bubble is-witness" onClick={() => openEntryDetail()} type="button">
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

  return (
    <div className={`pc-log-row ${isPartyA ? 'is-left' : 'is-right'}`}>
      <div className={`pc-log-speaker ${isPartyA ? 'is-a' : 'is-b'}`}>
        <button className={`pc-log-avatar ${isPartyA ? 'is-a' : 'is-b'}`} onClick={() => openEntryDetail()} type="button">
          <PCSvgIcon id={faceId} size={24} />
        </button>
        <button
          className={`pc-log-speaker__name ${isPartyA ? 'is-a' : 'is-b'} pc-log-name--button`}
          onClick={() => openEntryDetail()}
          type="button"
        >
          <span>{speakerName}</span>
          {emotionLabel ? <span className="pc-log-emotion">{emotionLabel}</span> : null}
        </button>
      </div>
      <div className="pc-log-stack">
        <button
          className={`pc-log-bubble ${isPartyA ? 'is-a' : 'is-b'}${entry.isConfidential ? ' is-confidential' : ''}${combinableTexts && [...combinableTexts].some(t => rawText.includes(t)) ? ' is-combinable' : ''}`}
          onClick={() => openEntryDetail()}
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
  const caseData = useStore((s) => s.caseData)
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const llmTarget = useStore((s) => s.llmLoadingTarget)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const combinationLabRuntime = useStore((s) => (s as any).combinationLabRuntime)

  // 조합 대상 발언 텍스트 추출 (statement 노드의 따옴표 내용)
  const combinableStatementTexts = useMemo(() => {
    if (!combinationLabRuntime?.config?.nodes) return new Set<string>()
    const combinableIds = useGameStore.getState().getCombinableEvidenceIds()
    const texts = new Set<string>()
    for (const node of combinationLabRuntime.config.nodes) {
      if (node.type === 'statement' && combinableIds.has(node.id)) {
        const match = node.label?.match(/"([^"]+)"/)
        if (match) texts.add(match[1])
      }
    }
    return texts
  }, [combinationLabRuntime, evidenceStates])
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
        {visibleEntries.map((entry, index) => {
          const isDraggable = entry.speaker !== 'system'
          return (
            <div
              data-dialogue-id={entry.id}
              key={entry.id}
              draggable={isDraggable}
              onDragStart={isDraggable ? (e) => {
                const notePayload = {
                  dialogueId: entry.id,
                  speaker: entry.speaker,
                  speakerName: entry.speaker === 'a' ? (caseData?.duo.partyA.name ?? 'A')
                    : entry.speaker === 'b' ? (caseData?.duo.partyB.name ?? 'B')
                    : entry.speaker === 'judge' ? '재판관'
                    : entry.witnessName ?? '증인',
                  text: entry.text,
                  turn: entry.turn,
                  relatedDisputes: entry.relatedDisputes,
                }
                // 발언노트 즐겨찾기용
                e.dataTransfer.setData(CHAT_NOTE_DRAG_TYPE, JSON.stringify(notePayload))
                // 조합 슬롯용
                e.dataTransfer.setData(HOTBAR_DRAG_TYPE, JSON.stringify({ kind: 'note', note: notePayload }))
                e.dataTransfer.setData('text/plain', entry.text.slice(0, 60))
                e.dataTransfer.effectAllowed = 'copyMove'
              } : undefined}
              style={isDraggable ? { cursor: 'grab' } : undefined}
            >
              <MessageBubble entry={entry} animate={index === visibleEntries.length - 1} combinableTexts={combinableStatementTexts} />
            </div>
          )
        })}
      </div>

      {isLLMLoading ? (
        <div className={`pc-log-typing ${llmTarget === 'b' ? 'is-right' : 'is-left'}`}>
          <span className="pc-log-typing__dots">
            <span className="pc-log-typing__dot" />
            <span className="pc-log-typing__dot" />
            <span className="pc-log-typing__dot" />
          </span>
        </div>
      ) : null}

      <div ref={bottomRef} />
    </>
  )
}

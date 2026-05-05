import { useCallback, useEffect, useMemo, useState } from 'react'
import { useStore, useGameStore } from '../../../store/useGameStore'
import type { DialogueEntry as DialogueEntryType, EmotionalPhase } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'
import { openPcInteractionPanel } from './PCInteractionPanel'
import { HOTBAR_DRAG_TYPE } from '../hotbar/pcHotbarConfig'
import { hasContradictionComparison } from '../../../utils/contradiction'
import { isLowValueSystemDialogueText } from '../../../utils/systemLogPolicy'
import { getWitnessPortraitPath } from '../../../utils/witnessPortraits'
import { sanitizeKoreanSurfaceText } from '../../../utils/korean'

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

export type CombinationHintInfo = { readyCount: number; potentialCount: number }

function MessageBubble({ entry, animate, combinableTexts, combinationHintMap, isLatestForSpeaker }: { entry: DialogueEntryType; animate: boolean; combinableTexts?: Set<string>; combinationHintMap?: Map<string, CombinationHintInfo>; isLatestForSpeaker?: boolean }) {
  const caseData = useStore((s) => s.caseData)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const pendingFeedback = useStore((s) => s.dialoguePendingFeedback[entry.id])
  const currentTurn = useStore((s) => s.turnCount)
  const rawText = sanitizeKoreanSurfaceText(entry.text ?? '')
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
      dialogueBehaviorHint: entry.behaviorHint,
      dialogueId: entry.id,
    })
  }, [entry, fullText, speakerName])

  if (entry.speaker === 'system') {
    const contradiction = hasContradictionComparison(entry.contradictionMeta)
      ? entry.contradictionMeta
      : undefined

    // ── [B-17 D] pending feedback (수동 트리거 모달) ──
    // emergence/contradiction/interjection/emotional_burst 4종은 자동 모달 대신
    // 시스템 메시지에 pending payload 부착 → 클릭 시 enqueueFeedback.
    if (pendingFeedback) {
      const expireAfter = pendingFeedback.expireAfterTurns ?? 5
      const turnsPassed = currentTurn - pendingFeedback.createdTurn
      const isExpired = turnsPassed >= expireAfter
      const isConsumed = !!pendingFeedback.consumed
      const isActive = !isConsumed && !isExpired
      const badge = isConsumed ? '확인 완료' : isExpired ? '만료' : '지금 확인'
      // [TC-A2 픽스] tone 기반 클래스 분기 — 'alert'는 빨강(모순/공격), 기본은 골드(권위/주의 환기)
      const tone = (pendingFeedback.payload as any)?.tone
      const activeClass = tone === 'alert' ? ' is-alert' : ' is-urgent'
      const stateClass = isConsumed ? ' is-consumed' : isExpired ? ' is-expired' : activeClass

      return (
        <div className="pc-log-system-row is-action">
          <button
            aria-disabled={!isActive}
            className={`pc-log-system-card is-action is-pending-feedback${stateClass}`}
            disabled={!isActive}
            onClick={() => {
              if (!isActive) return
              const s = useGameStore.getState()
              // 클릭 시 모달 큐에 payload 주입. consume + 번개 이펙트는 action onSelect 내부 (모달 닫힌 후)에서 발사.
              // [Phase E] 모달이 띄워진 직후 번개를 발사하면 모달 블러에 가려져 이펙트가 보이지 않음 → 모달 dismiss 후로 이동.
              s.enqueueFeedback(pendingFeedback.payload)
            }}
            type="button"
          >
            <span aria-hidden className="pc-log-system-card__bolt">
              <PCSvgIcon id="i-bolt" size={22} />
            </span>
            <span className="pc-log-system-card__text">{displayText.trim()}</span>
            <span className="pc-log-system-card__action-badge">{badge}</span>
          </button>
        </div>
      )
    }

    // ── 카테고리 분류 ──
    const category = contradiction ? 'action'
      : /\[주의\]|\[교착\]|소진|불가/.test(fullText) ? 'warning'
      : /^추궁 결과 반응이 크게 흔들렸습니다/.test(fullText) ? 'observation'
      : /🔓|해금|손에 넣|새 증거|📋|증거 제시|🔗|조합 격상|🔥|간파/.test(fullText) ? 'unlock'
      : /✅|결정적|확보/.test(fullText) ? 'success'
      : /🧑‍⚖️|증인.*소환/.test(fullText) ? 'witness'
      : EXPLAINER_KEYWORDS.some((kw) => fullText.includes(kw)) ? 'hint'
      : 'info'

    const iconId = category === 'action' ? 'i-bolt'
      : category === 'observation' ? 'i-scale'
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
              // [TC-A1 D1] 모순 추궁 모달도 모순 감지 모달과 동일한 vs 구도로 통일
              // [TC-A2·A4 안전 가드] lieState ≤ S2일 때는 자백 본문 노출 위험이 있어 contrast 미노출
              const store = useGameStore.getState()
              const accusedAgent = contradiction.party === 'a' ? store.agentA : store.agentB
              void accusedAgent.lieStateMap[contradiction.disputeId]
              const isSpoilerSafe = true
              const accusedName = contradiction.party === 'a' ? nameA : nameB
              openPcInteractionPanel({
                title: '모순 발견',
                subtitle: `${accusedName} 진술 비교`,
                tone: 'gold',
                variant: 'feature',
                body: isSpoilerSafe
                  ? '이전 진술과 현재 진술 사이에서 모순이 감지되었습니다. 모순을 누적하면 거짓 상태가 흔들리고, 새로운 진술이나 단서가 열릴 수 있습니다.'
                  : `${accusedName}의 진술 흐름에서 어긋남이 감지되었습니다. 모순을 찌르면 다음 단서가 열릴 수 있습니다.`,
                contrast: isSpoilerSafe ? {
                  left:  { label: contradiction.previousLabel ?? '이전 발언 A', text: contradiction.previousClaim },
                  right: { label: contradiction.currentLabel ?? '현재 발언 B', text: contradiction.currentClaim },
                } : undefined,
                blocks: [{ title: '왜 어긋나는지', text: contradiction.reason ?? '' }],
                actions: [
                  { kind: 'close', label: '지금은 넘긴다' },
                  {
                    kind: 'run_contradiction',
                    label: '모순을 찌른다',
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
              <PCSvgIcon id={iconId} size={20} />
            </span>
            <span className="pc-log-system-card__text">{displayText.trim()}</span>
            <span className="pc-log-system-card__action-badge">{used ? '추궁 완료' : '추궁하기'}</span>
          </button>
        </div>
      )
    }

    // ── 성공/발견 (클릭 시 본문 상세, 1회 강조 후 dim) ──
    // [결함 17 픽스] '확인' 배지 제거 — 메시지 본문이 이미 보이는 상태에서 '확인' 클릭 시
    // 동일 메시지 팝업만 뜨던 결함. 클릭 자체는 유지하되 배지만 제거.
    if (category === 'success') {
      const checked = _usedContradictions.has(entry.id)
      return (
        <div className="pc-log-system-row is-success">
          <button className={`pc-log-system-card is-success${checked ? ' is-used' : ''}`} onClick={() => { _usedContradictions.add(entry.id); openEntryDetail() }} type="button">
            <span className="pc-log-system-card__icon"><PCSvgIcon id={iconId} size={20} /></span>
            <span className="pc-log-system-card__text">{displayText}</span>
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
          <span className="pc-log-system-card__icon"><PCSvgIcon id={iconId} size={20} /></span>
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
          {entry.evidencePresentation ? (
            <div className="pc-log-bubble__evidence-presentation">
              {entry.evidencePresentation.label}
            </div>
          ) : null}
        </button>
      </div>
    )
  }

  if (entry.speaker === 'witness') {
    const witnessFavor = entry.witnessFavor === 'pro_b' ? 'is-right' : 'is-left'
    const witnessName = entry.witnessName ?? '증인'
    const witness = caseData?.duo.socialGraph.find((item) => item.name === witnessName)
    const witnessPortrait = getWitnessPortraitPath(caseData?.caseId, witness?.id, witnessName)
    const depthLabel = entry.behaviorHint?.includes('모호') ? '모호'
      : entry.behaviorHint?.includes('부분') ? '부분'
      : entry.behaviorHint?.includes('핵심') ? '핵심'
      : null

    return (
      <div className={`pc-log-row is-witness-row ${witnessFavor}`}>
        <div className="pc-log-speaker is-witness">
          <button className="pc-log-avatar is-witness" onClick={() => openEntryDetail()} type="button">
            {witnessPortrait ? (
              <img alt={witnessName} src={witnessPortrait} />
            ) : (
              <PCSvgIcon id="i-witness" size={22} />
            )}
          </button>
          <button className="pc-log-speaker__name is-witness pc-log-name--button" onClick={() => openEntryDetail()} type="button">
            <span>{witnessName}</span>
            {depthLabel ? <span className={`pc-log-depth-badge is-${depthLabel === '모호' ? 'vague' : depthLabel === '부분' ? 'partial' : 'full'}`}>{depthLabel}</span> : null}
          </button>
        </div>
        <div className="pc-log-stack">
          <button className="pc-log-bubble is-witness" onClick={() => openEntryDetail()} type="button">
            <div className="pc-log-bubble__text">{displayText}</div>
          </button>
        </div>
      </div>
    )
  }

  const isPartyA = entry.speaker === 'a'
  const profile = isPartyA ? caseData?.duo.partyA : caseData?.duo.partyB
  const agent = isPartyA ? agentA : agentB
  const emotion = entry.emotionSnapshot?.phase ?? agent?.emotionalState.phase
  const emotionLabel = emotion ? EMOTION_LABELS[emotion] : null
  const faceId = profile ? getPcFaceSymbolId(isPartyA ? 'a' : 'b', profile, emotion) : 'i-person'

  return (
    <div className={`pc-log-row ${isPartyA ? 'is-left' : 'is-right'}`}>
      <div className={`pc-log-speaker ${isPartyA ? 'is-a' : 'is-b'}`}>
        <button className={`pc-log-avatar ${isPartyA ? 'is-a' : 'is-b'}`} onClick={() => openEntryDetail()} type="button">
          <PCCharacterPortrait
            alt={profile?.name}
            caseId={caseData?.caseId}
            emotion={emotion}
            fallbackSymbolId={faceId}
            party={isPartyA ? 'a' : 'b'}
            size={40}
          />
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
          className={`pc-log-bubble ${isPartyA ? 'is-a' : 'is-b'}${entry.isConfidential ? ' is-confidential' : ''}${combinableTexts && [...combinableTexts].some(t => rawText.includes(t)) ? ' is-combinable' : ''}${emotion ? ` emotion-${emotion}` : ''}${isLatestForSpeaker ? ' is-latest' : ''}`}
          onClick={() => openEntryDetail()}
          type="button"
        >
          {entry.isConfidential ? (
            <div className="pc-log-bubble__confidential">
              <PCSvgIcon id="i-lock" size={12} />
              <span>비공개 진술</span>
            </div>
          ) : null}
          {(() => {
            if (!combinationHintMap || combinationHintMap.size === 0) return null
            for (const [phrase, hint] of combinationHintMap) {
              if (!rawText.includes(phrase)) continue
              const title = [
                hint.readyCount > 0 ? `조합 가능 ${hint.readyCount}개 — 지금 바로 연결 가능` : null,
                hint.potentialCount > 0 ? `실마리 필요 ${hint.potentialCount}개 — 아직 찾지 못한 단서가 있는 듯` : null,
              ].filter(Boolean).join('\n')
              return (
                <span className="pc-log-bubble__combo" title={title}>
                  {hint.readyCount > 0 ? <span className="pc-log-bubble__combo-badge is-ready">🔗</span> : null}
                  {hint.potentialCount > 0 ? <span className="pc-log-bubble__combo-badge is-potential">🔍</span> : null}
                </span>
              )
            }
            return null
          })()}
          <div className="pc-log-bubble__text">{displayText}</div>
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

  // 말풍선용 조합 힌트 맵 — text → { readyCount, potentialCount }
  const combinationHintMap = useMemo(() => {
    if (!combinationLabRuntime?.config?.nodes) return new Map<string, CombinationHintInfo>()
    const hints = useGameStore.getState().getCombinationPartnerHints()
    const byText = new Map<string, CombinationHintInfo>()
    for (const node of combinationLabRuntime.config.nodes) {
      if (node.type !== 'statement') continue
      const hint = hints.get(node.id)
      if (!hint || hint.recipeCount === 0) continue
      const match = node.label?.match(/"([^"]+)"/)
      if (!match) continue
      const phrase = match[1]
      const prev = byText.get(phrase) ?? { readyCount: 0, potentialCount: 0 }
      byText.set(phrase, {
        readyCount: prev.readyCount + hint.readyCount,
        potentialCount: prev.potentialCount + (hint.recipeCount - hint.readyCount),
      })
    }
    return byText
  }, [combinationLabRuntime, evidenceStates])
  useEffect(() => {
    _usedContradictions.clear()
  }, [caseData?.caseId])

  useEffect(() => {
    if (dialogueLog.length === 0) {
      _usedContradictions.clear()
    }
  }, [dialogueLog.length])

  const visibleEntries = useMemo(() => dialogueLog.filter((entry) =>
    !entry.isHidden && !(entry.speaker === 'system' && isLowValueSystemDialogueText(entry.text))
  ), [dialogueLog])

  // 각 화자별 마지막 발언 인덱스 (감정 이펙트를 최신 말풍선에만 적용)
  const latestIndexBySpeaker = useMemo(() => {
    const map: Record<string, number> = {}
    visibleEntries.forEach((entry, idx) => {
      if (entry.speaker === 'a' || entry.speaker === 'b') {
        map[entry.speaker] = idx
      }
    })
    return map
  }, [visibleEntries])

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
              <MessageBubble entry={entry} animate={index === visibleEntries.length - 1} combinableTexts={combinableStatementTexts} combinationHintMap={combinationHintMap} isLatestForSpeaker={latestIndexBySpeaker[entry.speaker] === index} />
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

      <div aria-hidden="true" />
    </>
  )
}

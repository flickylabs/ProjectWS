/**
 * PCBottomDock — V4 single-bar hotbar
 * 6 fixed slots: [사실추궁] [동기탐색] [공감접근] [증거 제시▼] [증인 소환] [메뉴▼]
 */
import { useEffect, useMemo, useState, useCallback } from 'react'
import { GamePhase, type EmotionalPhase, type PartyId, type QuestionType } from '../../../types'
import { useActionDispatch } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'

const EMOTION_LABELS: Record<EmotionalPhase, string> = {
  defensive: '경계',
  confident: '자신감',
  shaken: '동요',
  angry: '격앙',
  resigned: '체념',
}

export default function PCBottomDock() {
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const pcTargetParty = useStore((s) => s.pcTargetParty)
  const setPcTargetParty = useStore((s) => s.setPcTargetParty)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const questionMeters = useStore((s) => s.questionMeters)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const calledWitnesses = useStore((s) => s.calledWitnesses)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)

  const [questionChoice, setQuestionChoice] = useState<{ type: QuestionType } | null>(null)
  const [evidenceDropdown, setEvidenceDropdown] = useState(false)
  const [menuDropdown, setMenuDropdown] = useState(false)

  // hidden 쟁점 필터: discovery visibility가 'visible'인 것만 표시
  const visibleDisputes = useMemo(() => {
    if (!caseData) return []
    return caseData.disputes.filter((d) => {
      const vis = disputeVisibility[d.id]
      return !vis || vis.visibility !== 'hidden'
    })
  }, [caseData, disputeVisibility])

  const activeDisputeId = lastFocusedDisputeId ?? visibleDisputes[0]?.id ?? ''

  // Close dropdowns on outside click
  useEffect(() => {
    if (!evidenceDropdown && !menuDropdown) return
    const close = () => { setEvidenceDropdown(false); setMenuDropdown(false) }
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [evidenceDropdown, menuDropdown])

  // Question choice → dispute selection
  const openQuestionChoice = useCallback((questionType: QuestionType) => {
    if (!caseData) return
    setQuestionChoice({ type: questionType })
  }, [caseData])

  const selectDisputeForQuestion = useCallback((disputeId: string) => {
    if (!questionChoice) return
    dispatch({
      type: 'question',
      questionType: questionChoice.type,
      target: pcTargetParty,
      disputeId,
    })
    setQuestionChoice(null)
  }, [dispatch, pcTargetParty, questionChoice])

  // Evidence dropdown
  const unlockedEvidence = useMemo(() => {
    return evidenceDefinitions.filter((ev) => evidenceStates[ev.id]?.unlocked)
  }, [evidenceDefinitions, evidenceStates])

  const handlePresentEvidence = useCallback((evidenceId: string) => {
    dispatch({ type: 'evidence_present', evidenceId, target: pcTargetParty })
    setEvidenceDropdown(false)
  }, [dispatch, pcTargetParty])

  // Witness availability
  const availableWitnesses = useMemo(() => {
    if (!caseData) return []
    return caseData.duo.socialGraph.filter(
      (tp) => tp.slot === 'institutional' || tp.slot === 'acquaintance_1' || tp.slot === 'acquaintance_2'
        || tp.slot === 'family_1' || tp.slot === 'family_2',
    )
  }, [caseData])

  const hasWitness = availableWitnesses.length > 0

  const openWitnessPanel = useCallback(() => {
    if (!caseData || !hasWitness) return
    const witnessLines = availableWitnesses.map((w) => {
      const called = calledWitnesses.includes(w.id)
      return `${w.name} (${w.knowledgeScope ?? '관련인'}) — ${called ? '소환됨' : '소환 가능'}`
    }).join('\n')

    openPcInteractionPanel({
      title: '증인 소환',
      subtitle: '적절한 시점에 소환해야 핵심 증언을 들을 수 있습니다',
      tone: 'gold',
      body: witnessLines,
      actions: availableWitnesses.map((w) => ({
        kind: 'summon_witness' as const,
        label: calledWitnesses.includes(w.id) ? `${w.name} 재소환` : `${w.name} 소환`,
        witnessId: w.id,
      })),
    })
  }, [availableWitnesses, calledWitnesses, caseData, hasWitness])

  // Menu actions
  const openMenuAction = useCallback((action: string) => {
    setMenuDropdown(false)
    if (action === 'separation') {
      openPcInteractionPanel({ title: '분리 심문', subtitle: '특수 행동', tone: 'gold', body: '당사자를 분리해 개별 심문합니다.', actions: [{ kind: 'run_special', label: '분리 심문 실행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'separation' }] })
    } else if (action === 'confidential') {
      openPcInteractionPanel({ title: '비공개 보호', subtitle: '특수 행동', tone: 'gold', body: '비공개를 약속해 방어 반응을 낮춥니다.', actions: [{ kind: 'run_special', label: '비공개 보호 실행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'confidential_protection' }] })
    } else if (action === 'immediate') {
      openPcInteractionPanel({ title: '즉답 요구', subtitle: '특수 행동', tone: 'gold', body: '선택한 쟁점에 대해 즉답을 요구합니다.', actions: [{ kind: 'run_special', label: '즉답 요구 실행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'immediate_answer' }] })
    } else if (action === 'summary') {
      window.dispatchEvent(new Event('pc:open-record-summary'))
    } else if (action === 'advance') {
      openPcInteractionPanel({ title: '단계 진행', subtitle: '다음 단계', tone: 'green', body: '다음 단계로 진행합니다.', actions: [{ kind: 'run_special', label: '단계 진행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'advance_phase' }] })
    }
  }, [activeDisputeId, pcTargetParty])

  // Keyboard shortcuts: 1~6
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const num = Number(event.key)
      if (num === 1) { event.preventDefault(); openQuestionChoice('fact_pursuit') }
      if (num === 2) { event.preventDefault(); openQuestionChoice('motive_search') }
      if (num === 3) { event.preventDefault(); openQuestionChoice('empathy_approach') }
      if (num === 4) { event.preventDefault(); setEvidenceDropdown((c) => !c) }
      if (num === 5 && hasWitness) { event.preventDefault(); openWitnessPanel() }
      if (num === 6) { event.preventDefault(); setMenuDropdown((c) => !c) }
      if (event.key === 'Escape') { setQuestionChoice(null); setEvidenceDropdown(false); setMenuDropdown(false) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasWitness, openQuestionChoice, openWitnessPanel])

  if (!caseData) return null

  const contradiction = questionMeters[pcTargetParty].contradictionTokens

  return (
    <div className="bottom pc-play-dock">
      {/* Question choice overlay */}
      {questionChoice ? (
        <div className="pc-question-choice">
          <div className="pc-question-choice__backdrop" onClick={() => setQuestionChoice(null)} />
          <div className="pc-question-choice__panel">
            <div className="pc-question-choice__header">
              <PCSvgIcon id={questionChoice.type === 'fact_pursuit' ? 'i-gavel' : questionChoice.type === 'motive_search' ? 'i-eye' : 'i-heart'} size={18} />
              <span className="pc-question-choice__title">
                {questionChoice.type === 'fact_pursuit' ? '모순에 집중하기' : questionChoice.type === 'motive_search' ? '숨겨진 쟁점찾기' : '자백 유도하기'}
              </span>
              <button className="pc-question-choice__close" onClick={() => setQuestionChoice(null)} type="button">
                <PCSvgIcon id="i-plus" size={14} />
              </button>
            </div>
            <div className="pc-question-choice__disputes">
              <p className="pc-question-choice__hint">쟁점을 선택하세요</p>
              {visibleDisputes.map((d) => (
                <button className="pc-question-choice__dispute-btn" key={d.id} onClick={() => selectDisputeForQuestion(d.id)} type="button">
                  <span className="pc-question-choice__dispute-name">{d.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="hbar pc-play-hbar">
        {/* Character A */}
        <CharacterCard
          name={caseData.duo.partyA.name}
          emotion={agentA.emotionalState.phase}
          faceId={getPcFaceSymbolId('a', caseData.duo.partyA, agentA.emotionalState.phase)}
          isActive={pcTargetParty === 'a'}
          side="a"
          onClick={() => setPcTargetParty('a')}
        />

        {/* 6-slot single bar */}
        <div className="hb-center hb-center--compact">
          <div className="hotbar hotbar--compact hotbar--v4">
            <div className="hotbar-topbar">
              <div className="hotbar-help">
                <span><kbd>1~6</kbd> 슬롯 실행</span>
                <span className="hotbar-help__sep">/</span>
                <span><kbd>ESC</kbd> 닫기</span>
              </div>
            </div>

            <div className="hotbar-slots">
              {/* 1: 모순에 집중 */}
              <button className="slot" onClick={() => openQuestionChoice('fact_pursuit')} title="모순에 집중하기" type="button">
                <span className="slot-key">1</span>
                <span className="slot-ico"><PCSvgIcon id="i-gavel" size={24} /></span>
                <span className="slot-nm">모순에 집중</span>
                {contradiction >= 2 ? <span className="slot-eff ef-s" /> : null}
              </button>

              {/* 2: 쟁점 탐색 */}
              <button className="slot" onClick={() => openQuestionChoice('motive_search')} title="숨겨진 쟁점찾기" type="button">
                <span className="slot-key">2</span>
                <span className="slot-ico"><PCSvgIcon id="i-eye" size={24} /></span>
                <span className="slot-nm">쟁점 탐색</span>
              </button>

              {/* 3: 자백 유도 */}
              <button className="slot" onClick={() => openQuestionChoice('empathy_approach')} title="자백 유도하기" type="button">
                <span className="slot-key">3</span>
                <span className="slot-ico"><PCSvgIcon id="i-heart" size={24} /></span>
                <span className="slot-nm">자백 유도</span>
              </button>

              {/* 4: 증거 제시 ▼ */}
              <div className="slot-dropdown-wrap">
                <button className="slot" onClick={(e) => { e.stopPropagation(); setEvidenceDropdown((c) => !c); setMenuDropdown(false) }} title="증거 제시" type="button">
                  <span className="slot-key">4</span>
                  <span className="slot-ico"><PCSvgIcon id="i-doc" size={24} /></span>
                  <span className="slot-nm">증거 제시</span>
                </button>
                {evidenceDropdown ? (
                  <div className="slot-dropdown" onClick={(e) => e.stopPropagation()}>
                    {unlockedEvidence.length === 0 ? (
                      <span className="slot-dropdown__empty">해금된 증거 없음</span>
                    ) : unlockedEvidence.map((ev) => (
                      <button className="slot-dropdown__item" key={ev.id} onClick={() => handlePresentEvidence(ev.id)} type="button">
                        <PCSvgIcon id="i-doc" size={14} />
                        <span>{ev.surfaceName ?? ev.name}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {/* 5: 증인 소환 */}
              <button className={`slot${!hasWitness ? ' slot-locked' : ''}`} disabled={!hasWitness} onClick={openWitnessPanel} title="증인 소환" type="button">
                <span className="slot-key">5</span>
                <span className="slot-ico"><PCSvgIcon id="i-witness" size={24} /></span>
                <span className="slot-nm">증인 소환</span>
              </button>

              {/* 6: 메뉴 ▼ */}
              <div className="slot-dropdown-wrap">
                <button className="slot" onClick={(e) => { e.stopPropagation(); setMenuDropdown((c) => !c); setEvidenceDropdown(false) }} title="메뉴" type="button">
                  <span className="slot-key">6</span>
                  <span className="slot-ico"><PCSvgIcon id="i-gear" size={24} /></span>
                  <span className="slot-nm">메뉴</span>
                </button>
                {menuDropdown ? (
                  <div className="slot-dropdown" onClick={(e) => e.stopPropagation()}>
                    <button className="slot-dropdown__item" onClick={() => openMenuAction('separation')} type="button">
                      <PCSvgIcon id="i-hand" size={14} /><span>분리 심문</span>
                    </button>
                    <button className="slot-dropdown__item" onClick={() => openMenuAction('confidential')} type="button">
                      <PCSvgIcon id="i-shield" size={14} /><span>비공개 보호</span>
                    </button>
                    <button className="slot-dropdown__item" onClick={() => openMenuAction('immediate')} type="button">
                      <PCSvgIcon id="i-bolt" size={14} /><span>즉답 요구</span>
                    </button>
                    <button className="slot-dropdown__item" onClick={() => openMenuAction('summary')} type="button">
                      <PCSvgIcon id="i-doc" size={14} /><span>기록 정리</span>
                    </button>
                    <button className="slot-dropdown__item" onClick={() => openMenuAction('advance')} type="button">
                      <PCSvgIcon id="i-bulb" size={14} /><span>단계 진행</span>
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Character B */}
        <CharacterCard
          name={caseData.duo.partyB.name}
          emotion={agentB.emotionalState.phase}
          faceId={getPcFaceSymbolId('b', caseData.duo.partyB, agentB.emotionalState.phase)}
          isActive={pcTargetParty === 'b'}
          side="b"
          onClick={() => setPcTargetParty('b')}
        />
      </div>
    </div>
  )
}

function CharacterCard({
  name, emotion, faceId, isActive, onClick, side,
}: {
  name: string; emotion: EmotionalPhase; faceId: string; isActive: boolean; onClick: () => void; side: PartyId
}) {
  return (
    <button className={`char char-${side}${isActive ? ' spk' : ''}`} onClick={onClick} type="button">
      <div className="char-face">
        <PCSvgIcon id={faceId} size={52} />
      </div>
      <div className="char-info">
        <span className="char-nm">{name}</span>
        <span className={`char-emo ${emotion === 'angry' ? 'ce-sh' : 'ce-cf'}`}>{EMOTION_LABELS[emotion]}</span>
        <span className="char-hp"><span className="char-hp-f" /></span>
      </div>
    </button>
  )
}

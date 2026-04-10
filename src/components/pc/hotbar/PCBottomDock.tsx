import { useEffect, useMemo, useState } from 'react'
import { GamePhase, type EmotionalPhase, type PartyId, type QuestionType } from '../../../types'
import { useActionDispatch } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'

type HotbarPage = 'interrogation' | 'evidence' | 'special'

interface HotbarSlot {
  key: number
  iconId: string
  label: string
  effect?: 'strong' | 'normal' | 'weak'
  locked?: boolean
  onClick?: () => void
}

const EMOTION_LABELS: Record<EmotionalPhase, string> = {
  defensive: '\uACBD\uACC4',
  confident: '\uC790\uC2E0\uAC10',
  shaken: '\uB3D9\uC694',
  angry: '\uACA9\uC559',
  resigned: '\uCCB4\uB150',
}

export default function PCBottomDock() {
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const pcTargetParty = useStore((s) => s.pcTargetParty)
  const setPcTargetParty = useStore((s) => s.setPcTargetParty)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const setDisputeBoardAction = useStore((s) => s.setDisputeBoardAction)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const questionMeters = useStore((s) => s.questionMeters)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)

  const [activePage, setActivePage] = useState<HotbarPage>('interrogation')
  const [freeQuestionOpen, setFreeQuestionOpen] = useState(false)
  const [freeQuestionText, setFreeQuestionText] = useState('')

  const activeDisputeId = lastFocusedDisputeId ?? caseData?.disputes[0]?.id ?? ''
  const activeDisputeName =
    caseData?.disputes.find((dispute) => dispute.id === activeDisputeId)?.name
    ?? '\uD604\uC7AC \uC7C1\uC810 \uC5C6\uC74C'

  const canUseInterrogation =
    currentPhase === GamePhase.Phase3_Interrogation
    || currentPhase === GamePhase.Phase4_Evidence
    || currentPhase === GamePhase.Phase5_ReExamination
  const canUseEvidence =
    currentPhase === GamePhase.Phase4_Evidence || currentPhase === GamePhase.Phase5_ReExamination
  const canUseSpecial = currentPhase === GamePhase.Phase5_ReExamination

  useEffect(() => {
    if (activePage === 'special' && !canUseSpecial) {
      setActivePage(canUseEvidence ? 'evidence' : 'interrogation')
      return
    }

    if (activePage === 'evidence' && !canUseEvidence) {
      setActivePage('interrogation')
    }
  }, [activePage, canUseEvidence, canUseSpecial])

  const runQuestion = (questionType: QuestionType) => {
    if (!caseData || !activeDisputeId) {
      return
    }

    dispatch({
      type: 'question',
      questionType,
      target: pcTargetParty,
      disputeId: activeDisputeId,
    })
  }

  const openEvidenceSelection = () => {
    if (!caseData || !activeDisputeId) {
      return
    }

    openPcInteractionPanel({
      title: '\uC99D\uAC70 \uC81C\uC2DC',
      subtitle: activeDisputeName,
      tone: 'gold',
      body: '\uD604\uC7AC \uB300\uC0C1\uACFC \uD604\uC7AC \uC7C1\uC810\uC744 \uAE30\uC900\uC73C\uB85C \uC81C\uC2DC \uAC00\uB2A5\uD55C \uC99D\uAC70\uB97C \uACE0\uB985\uB2C8\uB2E4.',
      actions: [
        {
          kind: 'open_evidence_selection',
          label: `${pcTargetParty === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name}\uC5D0\uAC8C \uC81C\uC2DC`,
          party: pcTargetParty,
          disputeId: activeDisputeId,
        },
      ],
    })
  }

  const openEvidenceViewer = () => {
    const unlockedEvidence =
      evidenceDefinitions.find(
        (evidence) => evidenceStates[evidence.id]?.unlocked && evidence.proves.includes(activeDisputeId),
      )
      ?? evidenceDefinitions.find((evidence) => evidenceStates[evidence.id]?.unlocked)

    if (!unlockedEvidence) {
      return
    }

    useGameStore.getState().setPendingEvidenceView(unlockedEvidence.id)
  }

  const openSpecialPrompt = (
    kind: 'immediate_answer' | 'objection' | 'separation' | 'confidential_protection' | 'advance_phase',
  ) => {
    const actionLabels: Record<typeof kind, string> = {
      immediate_answer: '\uC989\uB2F5 \uC694\uAD6C',
      objection: '\uC774\uC758 \uC81C\uAE30',
      separation: '\uBD84\uB9AC \uC2EC\uBB38',
      confidential_protection: '\uBE44\uACF5\uAC1C \uBCF4\uD638',
      advance_phase: '\uB2E8\uACC4 \uC9C4\uD589',
    }

    openPcInteractionPanel({
      title: actionLabels[kind],
      subtitle: activeDisputeName,
      tone: kind === 'advance_phase' ? 'green' : 'gold',
      body: `${actionLabels[kind]}\uB97C \uC2E4\uD589\uD569\uB2C8\uB2E4.`,
      actions: [
        {
          kind: 'run_special',
          label: `${actionLabels[kind]} \uC2E4\uD589`,
          party: pcTargetParty,
          disputeId: activeDisputeId,
          specialAction: kind,
        },
      ],
    })
  }

  const handleFreeQuestionSend = () => {
    if (!caseData || !activeDisputeId || !freeQuestionText.trim()) {
      return
    }

    setDisputeBoardAction({ disputeId: activeDisputeId, party: pcTargetParty })
    setFreeQuestionText('')
    setFreeQuestionOpen(false)
  }

  const slots = useMemo<HotbarSlot[]>(() => {
    if (activePage === 'interrogation') {
      const contradiction = questionMeters[pcTargetParty].contradictionTokens
      return [
        {
          key: 1,
          iconId: 'i-gavel',
          label: '\uC0AC\uC2E4 \uCD94\uAD81',
          effect: contradiction >= 2 ? 'strong' : 'normal',
          onClick: () => runQuestion('fact_pursuit'),
        },
        {
          key: 2,
          iconId: 'i-eye',
          label: '\uB3D9\uAE30 \uD0D0\uC0C9',
          effect: 'normal',
          onClick: () => runQuestion('motive_search'),
        },
        {
          key: 3,
          iconId: 'i-heart',
          label: '\uACF5\uAC10 \uC811\uADFC',
          effect: 'weak',
          onClick: () => runQuestion('empathy_approach'),
        },
        { key: 4, iconId: 'i-chat', label: '\uC790\uC720 \uC9C8\uBB38', onClick: () => setFreeQuestionOpen(true) },
        { key: 5, iconId: 'i-lock', label: '\uBE48 \uC2AC\uB86F', locked: true },
        { key: 6, iconId: 'i-plus', label: '\uBE48 \uC2AC\uB86F', locked: true },
      ]
    }

    if (activePage === 'evidence') {
      return [
        { key: 1, iconId: 'i-doc', label: '\uC99D\uAC70 \uC81C\uC2DC', onClick: openEvidenceSelection },
        { key: 2, iconId: 'i-eye', label: '\uC99D\uAC70 \uC5F4\uB78C', onClick: openEvidenceViewer },
        {
          key: 3,
          iconId: 'i-ledger',
          label: '\uC7C1\uC810 \uC774\uB3D9',
          onClick: () =>
            openPcInteractionPanel({
              title: '\uC7C1\uC810 \uC774\uB3D9',
              subtitle: activeDisputeName,
              tone: 'blue',
              body: '\uB2E4\uB978 \uC7C1\uC810\uC73C\uB85C \uC774\uB3D9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.',
              actions: [{ kind: 'open_dispute_picker', label: '\uC7C1\uC810 \uBAA9\uB85D \uBCF4\uAE30', disputeId: activeDisputeId }],
            }),
        },
        { key: 4, iconId: 'i-bolt', label: '\uB2E8\uACC4 \uC9C4\uD589', onClick: () => openSpecialPrompt('advance_phase') },
        { key: 5, iconId: 'i-lock', label: '\uBE48 \uC2AC\uB86F', locked: true },
        { key: 6, iconId: 'i-plus', label: '\uBE48 \uC2AC\uB86F', locked: true },
      ]
    }

    return [
      { key: 1, iconId: 'i-bolt', label: '\uC989\uB2F5 \uC694\uAD6C', onClick: () => openSpecialPrompt('immediate_answer') },
      { key: 2, iconId: 'i-conflict', label: '\uC774\uC758 \uC81C\uAE30', onClick: () => openSpecialPrompt('objection') },
      { key: 3, iconId: 'i-hand', label: '\uBD84\uB9AC \uC2EC\uBB38', onClick: () => openSpecialPrompt('separation') },
      { key: 4, iconId: 'i-shield', label: '\uBE44\uACF5\uAC1C \uBCF4\uD638', onClick: () => openSpecialPrompt('confidential_protection') },
      { key: 5, iconId: 'i-bulb', label: '\uB2E8\uACC4 \uC9C4\uD589', onClick: () => openSpecialPrompt('advance_phase') },
      { key: 6, iconId: 'i-lock', label: '\uBE48 \uC2AC\uB86F', locked: true },
    ]
  }, [activeDisputeId, activeDisputeName, activePage, caseData, evidenceDefinitions, evidenceStates, pcTargetParty, questionMeters])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F1' && canUseInterrogation) {
        event.preventDefault()
        setActivePage('interrogation')
      }
      if (event.key === 'F2' && canUseEvidence) {
        event.preventDefault()
        setActivePage('evidence')
      }
      if (event.key === 'F3' && canUseSpecial) {
        event.preventDefault()
        setActivePage('special')
      }

      const numeric = Number(event.key)
      if (numeric >= 1 && numeric <= 6) {
        const slot = slots[numeric - 1]
        if (slot && !slot.locked && slot.onClick) {
          event.preventDefault()
          slot.onClick()
        }
      }

      if (event.key === 'Escape') {
        setFreeQuestionOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [canUseEvidence, canUseInterrogation, canUseSpecial, slots])

  if (!caseData) {
    return null
  }

  return (
    <div className="bottom pc-play-dock">
      {freeQuestionOpen ? (
        <div className="pc-dock-free-question">
          <div className="pc-dock-free-question__shell">
            <div className="pc-dock-free-question__title">{'\uC790\uC720 \uC9C8\uBB38 \uC785\uB825'}</div>
            <div className="pc-dock-free-question__subtitle">{activeDisputeName}</div>
            <div className="pc-dock-free-question__row">
              <input
                className="input-field"
                onChange={(event) => setFreeQuestionText(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleFreeQuestionSend()
                  }
                  if (event.key === 'Escape') {
                    setFreeQuestionOpen(false)
                  }
                }}
                placeholder={'\uC9C8\uBB38 \uB0B4\uC6A9\uC744 \uC785\uB825\uD558\uC138\uC694'}
                value={freeQuestionText}
              />
              <button className="input-send" onClick={handleFreeQuestionSend} type="button">
                {'\uC804\uC1A1'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="hbar pc-play-hbar">
        <CharacterCard
          name={caseData.duo.partyA.name}
          emotion={agentA.emotionalState.phase}
          faceId={getPcFaceSymbolId('a', caseData.duo.partyA, agentA.emotionalState.phase)}
          isActive={pcTargetParty === 'a'}
          side="a"
          onClick={() => setPcTargetParty('a')}
        />

        <div className="hb-center hb-center--compact">
          <div className="hotbar hotbar--compact">
            <div className="hotbar-topbar">
              <div className="hotbar-modes">
                <button
                  className={`hotbar-mode${activePage === 'interrogation' ? ' is-active' : ''}`}
                  onClick={() => setActivePage('interrogation')}
                  type="button"
                >
                  <kbd>F1</kbd>
                  <span>{'\uC2EC\uBB38'}</span>
                </button>
                <button
                  className={`hotbar-mode${activePage === 'evidence' ? ' is-active' : ''}`}
                  disabled={!canUseEvidence}
                  onClick={() => setActivePage('evidence')}
                  type="button"
                >
                  <kbd>F2</kbd>
                  <span>{'\uC99D\uAC70'}</span>
                </button>
                <button
                  className={`hotbar-mode${activePage === 'special' ? ' is-active' : ''}`}
                  disabled={!canUseSpecial}
                  onClick={() => setActivePage('special')}
                  type="button"
                >
                  <kbd>F3</kbd>
                  <span>{'\uD2B9\uC218'}</span>
                </button>
              </div>

              <div className="hotbar-help">
                <span><kbd>1~6</kbd> {'\uC2AC\uB86F \uC2E4\uD589'}</span>
                <span className="hotbar-help__sep">/</span>
                <span><kbd>ESC</kbd> {'\uC785\uB825 \uB2EB\uAE30'}</span>
              </div>
            </div>

            <div className="hotbar-slots">
              {slots.map((slot) => (
                <button
                  className={`slot${slot.locked ? ' slot-locked' : ''}`}
                  disabled={slot.locked}
                  key={slot.key}
                  onClick={slot.onClick}
                  title={slot.label}
                  type="button"
                >
                  <span className="slot-key">{slot.key}</span>
                  <span className="slot-ico">
                    <PCSvgIcon id={slot.iconId} size={26} />
                  </span>
                  <span className="slot-nm">{slot.label}</span>
                  {slot.effect ? (
                    <span
                      className={`slot-eff ${
                        slot.effect === 'strong' ? 'ef-s' : slot.effect === 'weak' ? 'ef-w' : 'ef-n'
                      }`}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

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
  name,
  emotion,
  faceId,
  isActive,
  onClick,
  side,
}: {
  name: string
  emotion: EmotionalPhase
  faceId: string
  isActive: boolean
  onClick: () => void
  side: PartyId
}) {
  return (
    <button className={`char char-${side}${isActive ? ' spk' : ''}`} onClick={onClick} type="button">
      <div className="char-face">
        <PCSvgIcon id={faceId} size={52} />
      </div>
      <div className="char-info">
        <span className="char-nm">{name}</span>
        <span className={`char-emo ${emotion === 'angry' ? 'ce-sh' : 'ce-cf'}`}>{EMOTION_LABELS[emotion]}</span>
        <span className="char-hp">
          <span className="char-hp-f" />
        </span>
      </div>
    </button>
  )
}

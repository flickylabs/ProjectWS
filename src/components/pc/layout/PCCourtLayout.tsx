import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GamePhase } from '../../../types'
import { useStore } from '../../../store/useGameStore'
import PCBottomDock from '../hotbar/PCBottomDock'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCEvidenceViewer from '../evidence/PCEvidenceViewer'
import PCLeftPanel from '../panels/PCLeftPanel'
import PCRightPanel from '../panels/PCRightPanel'
import { resetPcSessionToHome } from '../../../app/PCApp'
import PCDialogueLog from './PCDialogueLog'
import PCDisputeRibbon from './PCDisputeRibbon'
import PCGameplayOverlay from './PCGameplayOverlay'
import PCInteractionPanel, { openPcInteractionPanel } from './PCInteractionPanel'

interface Props {
  actionPanel?: ReactNode
  onDialogueTap?: () => void
  isDialoguePhase?: boolean
}

const PHASE_LABELS: Record<GamePhase, string> = {
  [GamePhase.Phase0_CaseIntro]: '사건 브리핑',
  [GamePhase.Phase1_InitialStatement]: '초기 진술',
  [GamePhase.Phase2_Rebuttal]: '반박',
  [GamePhase.Phase3_Interrogation]: '심문',
  [GamePhase.Phase4_Evidence]: '증거 정리',
  [GamePhase.Phase5_ReExamination]: '재심문',
  [GamePhase.Phase6_Mediation]: '중재',
  [GamePhase.Phase7_Verdict]: '판결',
  [GamePhase.Result]: '결과',
}

function getPhaseNumber(phase: GamePhase): string {
  if (phase === GamePhase.Result) {
    return 'R'
  }

  const match = phase.match(/phase(\d+)/)
  return match?.[1] ?? '0'
}

export default function PCCourtLayout({ actionPanel, onDialogueTap, isDialoguePhase }: Props) {
  const chatRef = useRef<HTMLDivElement>(null)
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const resources = useStore((s) => s.resources)
  const globalSkillPoints = useStore((s) => s.globalSkillPoints)
  const turnCount = useStore((s) => s.turnCount)

  const [phaseBanner, setPhaseBanner] = useState<string | null>(null)
  const prevPhaseRef = useRef(currentPhase)

  useEffect(() => {
    if (currentPhase !== prevPhaseRef.current) {
      prevPhaseRef.current = currentPhase
      const label = PHASE_LABELS[currentPhase]
      const num = getPhaseNumber(currentPhase)
      setPhaseBanner(`Phase ${num} — ${label}`)
      const timer = window.setTimeout(() => setPhaseBanner(null), 2800)
      return () => window.clearTimeout(timer)
    }
  }, [currentPhase])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const element = chatRef.current
      if (element) {
        element.scrollTop = element.scrollHeight
      }
    }, 60)

    return () => window.clearTimeout(timer)
  }, [dialogueLog.length])

  const handleChatClick = useCallback(() => {
    if (isDialoguePhase) {
      onDialogueTap?.()
    }
  }, [isDialoguePhase, onDialogueTap])

  const showDock = currentPhase === GamePhase.Phase3_Interrogation
    || currentPhase === GamePhase.Phase4_Evidence
    || currentPhase === GamePhase.Phase5_ReExamination

  const timelineBody = useMemo(() => {
    const lines = dialogueLog
      .filter((entry) => !entry.isHidden && (entry.speaker === 'system' || entry.relatedDisputes.length > 0))
      .slice(-10)
      .map((entry) => `T${entry.turn} · ${entry.text}`)

    return lines.length > 0
      ? lines.join('\n\n')
      : '아직 기록된 사건 타임라인이 없습니다.'
  }, [dialogueLog])

  const openHeaderPanel = useCallback((kind: 'invest' | 'skill' | 'court' | 'turn' | 'timeline') => {
    if (kind === 'invest') {
      openPcInteractionPanel({
        title: '조사 자원',
        subtitle: '현재 사용 가능한 조사 토큰',
        tone: 'blue',
        body: [
          `조사 토큰: ${resources.investigationTokens}`,
          '',
          '추가 단서 조사, 특수 행동, 사건 분석 단계에서 사용합니다.',
        ].join('\n'),
      })
      return
    }

    if (kind === 'skill') {
      openPcInteractionPanel({
        title: '스킬 포인트',
        subtitle: '현재 사용 가능한 스킬',
        tone: 'gold',
        body: [
          `스킬 포인트: ${globalSkillPoints}`,
          '',
          '요약 스킬, 조합 스킬, 특수 행동에서 사용합니다.',
        ].join('\n'),
      })
      return
    }

    if (kind === 'court') {
      openPcInteractionPanel({
        title: '법정 지배력',
        subtitle: '현재 법정 분위기',
        tone: 'red',
        body: [
          `법정 지배력: ${resources.courtControl}`,
          '',
          '질문과 증거 제시가 효과적으로 이어질수록 법정 흐름을 유리하게 가져갈 수 있습니다.',
        ].join('\n'),
      })
      return
    }

    if (kind === 'turn') {
      openPcInteractionPanel({
        title: '턴 진행 현황',
        subtitle: `Turn ${turnCount}`,
        tone: 'neutral',
        body: [
          `현재 단계: ${PHASE_LABELS[currentPhase]}`,
          `현재 턴: ${turnCount}`,
          '',
          '질문, 증거 제시, 특수 행동, 반응 로그가 누적되는 흐름입니다.',
        ].join('\n'),
      })
      return
    }

    openPcInteractionPanel({
      title: '사건 타임라인',
      subtitle: caseData?.caseId ?? '진행 중',
      tone: 'blue',
      body: timelineBody,
    })
  }, [caseData?.caseId, currentPhase, globalSkillPoints, resources.courtControl, resources.investigationTokens, timelineBody, turnCount])

  return (
    <>
      <div className="app pc-play-app">
        <header className="pc-play-header">
          <button className="pc-play-back" onClick={resetPcSessionToHome} type="button">
            <span className="pc-play-back__arrow" aria-hidden="true">&#8592;</span>
            <span>나가기</span>
          </button>

          <div className="pc-play-titlebar">
            <div className="logo-group pc-play-logo">
              <span className="pc-play-logo__mark" aria-hidden="true">
                <PCSvgIcon id="i-gavel" size={22} />
              </span>
              <span className="logo-text">솔로몬 법정</span>
              {caseData ? (
                <span className="logo-case">
                  {caseData.meta?.title ?? caseData.caseId}
                  <span className="logo-case__ver">{caseData.caseId.replace(/^case-/, '').replace(/^(spouse|family|friend|neighbor|tenant|partnership|workplace|headline)-/, '')}</span>
                </span>
              ) : null}
            </div>

            <div className="phase-pill pc-play-phase">
              <PCSvgIcon id="i-clock" size={14} />
              <span>{`Phase ${getPhaseNumber(currentPhase)} - ${PHASE_LABELS[currentPhase]}`}</span>
            </div>
          </div>

          <nav className="pc-play-tools" aria-label="play tools">
            <button
              className="pc-play-tool is-blue"
              onClick={() => openHeaderPanel('invest')}
              title="조사 자원"
              type="button"
            >
              <PCSvgIcon id="i-search" size={16} />
              <b>{resources.investigationTokens}</b>
            </button>
            <button
              className="pc-play-tool is-gold"
              onClick={() => openHeaderPanel('skill')}
              title="스킬 포인트"
              type="button"
            >
              <PCSvgIcon id="i-bolt" size={16} />
              <b>{globalSkillPoints}</b>
            </button>
            <button
              className="pc-play-tool is-red"
              onClick={() => openHeaderPanel('court')}
              title="법정 지배력"
              type="button"
            >
              <PCSvgIcon id="i-scale" size={16} />
              <b>{resources.courtControl}</b>
            </button>
            <div className="nav-sep" />
            <button className="pc-play-tool" onClick={() => openHeaderPanel('turn')} type="button">
              <span>Turn</span>
              <b>{turnCount}</b>
            </button>
            <button className="pc-play-tool" onClick={() => openHeaderPanel('timeline')} title="사건 타임라인" type="button">
              <PCSvgIcon id="i-gear" size={16} />
            </button>
          </nav>
        </header>

        <aside className="panel panel-l pc-play-panel pc-play-panel--left">
          <PCLeftPanel />
        </aside>

        <main className="center pc-play-center">
          <div className="amb amb-1" />
          <div className="amb amb-2" />
          <div className="amb amb-3" />
          <div className="vig" />
          <div className="watermark" aria-hidden="true">
            <span className="pc-play-watermark">
              <PCSvgIcon id="i-scale" size={220} />
            </span>
          </div>

          <div className="pc-play-ribbon-wrap">
            <PCDisputeRibbon />
          </div>

          {phaseBanner ? (
            <div className="pc-phase-banner">
              <span className="pc-phase-banner__text">{phaseBanner}</span>
            </div>
          ) : null}

          <div className="chat-area pc-play-chat" onClick={handleChatClick} ref={chatRef}>
            <PCDialogueLog />
          </div>

          {actionPanel ? (
            <div className={`pc-play-action-shell${isDialoguePhase ? ' is-dialogue' : ''}${showDock ? ' has-dock' : ''}`}>
              {actionPanel}
            </div>
          ) : null}

          {showDock ? <PCBottomDock /> : null}
        </main>

        <aside className="panel panel-r pc-play-panel pc-play-panel--right">
          <PCRightPanel />
        </aside>
      </div>

      <PCEvidenceViewer />
      <PCInteractionPanel />
      <PCGameplayOverlay />
    </>
  )
}

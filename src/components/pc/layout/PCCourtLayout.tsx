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
import TokenSpendEffect from '../effects/TokenSpendEffect'
import MiniGameOverlay from '../minigame/MiniGameOverlay'
import PCInteractionPanel, { openPcInteractionPanel } from './PCInteractionPanel'
import PCRecordSummary from './PCRecordSummary'
import { playBgm, playCourtControl } from '../../../engine/soundEngine'

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

/** V4: Phase4/5 스킵 → Phase3(심문)→Phase6(중재)→Phase7(판결) 직행 */
function getPhaseNumber(phase: GamePhase): string {
  const DISPLAY_NUMBERS: Record<string, string> = {
    [GamePhase.Phase0_CaseIntro]: '0',
    [GamePhase.Phase1_InitialStatement]: '1',
    [GamePhase.Phase3_Interrogation]: '2',
    [GamePhase.Phase4_Evidence]: '2',
    [GamePhase.Phase5_ReExamination]: '2',
    [GamePhase.Phase6_Mediation]: '3',
    [GamePhase.Phase7_Verdict]: '4',
    [GamePhase.Result]: 'R',
  }
  return DISPLAY_NUMBERS[phase] ?? '0'
}

interface CombinationOverlayState {
  id: number
  inputs: Array<{ label: string; iconId: string }>
  outputLabel: string
  outputSummary: string
}

interface PcCombinationSuccessDetail {
  inputs?: Array<{ label: string; type?: string }>
  outputLabel?: string
  outputSummary?: string
  resultType?: 'dispute' | 'upgrade' | 'dossier'
  resultTitle?: string
}

interface V4CombineSuccessDetail {
  resultType: 'dispute' | 'upgrade' | 'dossier'
  resultTitle: string
}

interface DossierUnlockDetail {
  questionText?: string
}

interface CourtControlUsedDetail {
  action?: 'separation' | 'confidential_protection' | 'immediate_answer'
  label?: string
}

export default function PCCourtLayout({ actionPanel, onDialogueTap, isDialoguePhase }: Props) {
  const chatRef = useRef<HTMLDivElement>(null)
  const combinationTimerRef = useRef<number | null>(null)
  const dossierTimerRef = useRef<number | null>(null)
  const courtControlTimerRef = useRef<number | null>(null)
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const resources = useStore((s) => s.resources)
  const globalSkillPoints = useStore((s) => s.globalSkillPoints)
  const turnCount = useStore((s) => s.turnCount)

  const [phaseBanner, setPhaseBanner] = useState<string | null>(null)
  const [recordSummaryOpen, setRecordSummaryOpen] = useState(false)
  const [combinationOverlay, setCombinationOverlay] = useState<CombinationOverlayState | null>(null)
  const [dossierUnlockText, setDossierUnlockText] = useState<string | null>(null)
  const [courtControlFlash, setCourtControlFlash] = useState<{ id: number; label: string } | null>(null)
  const prevPhaseRef = useRef(currentPhase)

  useEffect(() => {
    if (currentPhase !== prevPhaseRef.current) {
      prevPhaseRef.current = currentPhase
      const label = PHASE_LABELS[currentPhase]
      const num = getPhaseNumber(currentPhase)
      setPhaseBanner(`Phase ${num} — ${label}`)
      // BGM 전환
      const BGM_MAP: Partial<Record<GamePhase, string>> = {
        [GamePhase.Phase0_CaseIntro]: '/bgm/court.mp3',
        [GamePhase.Phase1_InitialStatement]: '/bgm/court.mp3',
        [GamePhase.Phase3_Interrogation]: '/bgm/court.mp3',
        [GamePhase.Phase6_Mediation]: '/bgm/verdict.mp3',
        [GamePhase.Phase7_Verdict]: '/bgm/verdict.mp3',
        [GamePhase.Result]: '/bgm/result.mp3',
      }
      const bgm = BGM_MAP[currentPhase]
      if (bgm) playBgm(bgm)
      const timer = window.setTimeout(() => setPhaseBanner(null), 2800)
      return () => window.clearTimeout(timer)
    }
  }, [currentPhase])

  useEffect(() => {
    return () => {
      if (combinationTimerRef.current) window.clearTimeout(combinationTimerRef.current)
      if (dossierTimerRef.current) window.clearTimeout(dossierTimerRef.current)
      if (courtControlTimerRef.current) window.clearTimeout(courtControlTimerRef.current)
    }
  }, [])

  useEffect(() => {
    const handler = () => setRecordSummaryOpen(true)
    window.addEventListener('pc:open-record-summary', handler)
    return () => window.removeEventListener('pc:open-record-summary', handler)
  }, [])

  useEffect(() => {
    const showCombinationOverlay = (detail: PcCombinationSuccessDetail) => {
      const inputs = (detail.inputs ?? [])
        .slice(0, 2)
        .map((item) => ({
          label: item.label,
          iconId: getCombinationIconId(item.type),
        }))

      const outputLabel = detail.outputLabel ?? detail.resultTitle ?? '조합 성공'
      const outputSummary = detail.outputSummary
        ?? getCombinationSummary(detail.resultType)

      setCombinationOverlay({
        id: Date.now(),
        inputs,
        outputLabel,
        outputSummary,
      })

      if (combinationTimerRef.current) window.clearTimeout(combinationTimerRef.current)
      combinationTimerRef.current = window.setTimeout(() => setCombinationOverlay(null), 2200)
    }

    const handleCombination = (event: Event) => {
      showCombinationOverlay((event as CustomEvent<PcCombinationSuccessDetail>).detail ?? {})
    }

    const handleLegacyCombination = (event: Event) => {
      const detail = (event as CustomEvent<V4CombineSuccessDetail>).detail
      showCombinationOverlay({
        resultType: detail?.resultType,
        resultTitle: detail?.resultTitle,
      })
    }

    const handleDossierUnlock = (event: Event) => {
      const detail = (event as CustomEvent<DossierUnlockDetail>).detail
      setDossierUnlockText(detail?.questionText ?? '결정적 질문이 열렸습니다.')
      if (dossierTimerRef.current) window.clearTimeout(dossierTimerRef.current)
      dossierTimerRef.current = window.setTimeout(() => setDossierUnlockText(null), 1500)
    }

    const handleCourtControlUsed = (event: Event) => {
      const detail = (event as CustomEvent<CourtControlUsedDetail>).detail
      playCourtControl()
      setCourtControlFlash({
        id: Date.now(),
        label: detail?.label ?? getCourtControlLabel(detail?.action),
      })
      if (courtControlTimerRef.current) window.clearTimeout(courtControlTimerRef.current)
      courtControlTimerRef.current = window.setTimeout(() => setCourtControlFlash(null), 500)
    }

    window.addEventListener('pc:combination-success', handleCombination)
    window.addEventListener('v4:combine-success', handleLegacyCombination)
    window.addEventListener('v4:dossier-unlock', handleDossierUnlock)
    window.addEventListener('pc:court-control-used', handleCourtControlUsed)

    return () => {
      window.removeEventListener('pc:combination-success', handleCombination)
      window.removeEventListener('v4:combine-success', handleLegacyCombination)
      window.removeEventListener('v4:dossier-unlock', handleDossierUnlock)
      window.removeEventListener('pc:court-control-used', handleCourtControlUsed)
    }
  }, [])

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
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="app pc-play-app" onDragOver={(e) => e.preventDefault()}>
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
              data-pc-token="investigation"
              onClick={() => openHeaderPanel('invest')}
              title="조사 자원"
              type="button"
            >
              <PCSvgIcon id="i-search" size={16} />
              <b>{resources.investigationTokens}</b>
            </button>
            <button
              className="pc-play-tool is-gold"
              data-pc-token="skill"
              onClick={() => openHeaderPanel('skill')}
              title="스킬 포인트"
              type="button"
            >
              <PCSvgIcon id="i-bolt" size={16} />
              <b>{globalSkillPoints}</b>
            </button>
            <button
              className="pc-play-tool is-red"
              data-pc-token="court"
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
            <div className={`pc-play-action-shell${isDialoguePhase ? ' is-dialogue' : ''}${showDock ? ' has-dock' : ''}${currentPhase === GamePhase.Phase6_Mediation || currentPhase === GamePhase.Phase7_Verdict ? ' is-fullscreen-panel' : ''}`}>
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
      <TokenSpendEffect />
      <MiniGameOverlay />
      {combinationOverlay ? (
        <div className="pc-combination-success" key={combinationOverlay.id}>
          <div className="pc-combination-success__card">
            <div className="pc-combination-success__eyebrow">조합 성공</div>
            <div className="pc-combination-success__flow">
              {combinationOverlay.inputs.length > 0 ? combinationOverlay.inputs.map((input, index) => (
                <div className="pc-combination-success__flow-item" key={`${combinationOverlay.id}-${input.label}`}>
                  <span className="pc-combination-success__icon">
                    <PCSvgIcon id={input.iconId} size={18} />
                  </span>
                  <span className="pc-combination-success__name">{input.label}</span>
                  {index === 0 && combinationOverlay.inputs.length > 1 ? (
                    <span className="pc-combination-success__join">+</span>
                  ) : null}
                </div>
              )) : (
                <div className="pc-combination-success__flow-item is-placeholder">
                  <span className="pc-combination-success__name">분석 완료</span>
                </div>
              )}
              <span className="pc-combination-success__arrow">→</span>
              <div className="pc-combination-success__result">
                <span className="pc-combination-success__icon is-result">
                  <PCSvgIcon id="i-bolt" size={18} />
                </span>
                <span className="pc-combination-success__name is-result">{combinationOverlay.outputLabel}</span>
              </div>
            </div>
            <p className="pc-combination-success__summary">{combinationOverlay.outputSummary}</p>
          </div>
        </div>
      ) : null}
      {dossierUnlockText ? (
        <div className="pc-dossier-unlock" key={dossierUnlockText}>
          <div className="pc-dossier-unlock__glow" />
          <div className="pc-dossier-unlock__banner">
            <span className="pc-dossier-unlock__eyebrow">결정적 질문 해금</span>
            <div className="pc-dossier-unlock__content">
              <span className="pc-dossier-unlock__icon">
                <PCSvgIcon id="i-bolt" size={16} />
              </span>
              <strong>{dossierUnlockText}</strong>
            </div>
          </div>
        </div>
      ) : null}
      {courtControlFlash ? (
        <div className="pc-court-control-flash" key={courtControlFlash.id}>
          <div className="pc-court-control-flash__label">{courtControlFlash.label}</div>
        </div>
      ) : null}
      {recordSummaryOpen ? <PCRecordSummary onClose={() => setRecordSummaryOpen(false)} /> : null}
    </>
  )
}

function getCombinationIconId(type?: string): string {
  switch (type) {
    case 'note':
    case 'derived_note':
    case 'statement':
      return 'i-chat'
    case 'question':
      return 'i-gavel'
    case 'dispute':
      return 'i-scale'
    case 'witness_angle':
      return 'i-eye'
    case 'mediation_hint':
      return 'i-heart'
    default:
      return 'i-doc'
  }
}

function getCombinationSummary(resultType?: 'dispute' | 'upgrade' | 'dossier'): string {
  if (resultType === 'dossier') {
    return '결정적 질문으로 이어지는 조합이 완성됐습니다.'
  }
  if (resultType === 'dispute') {
    return '새로운 쟁점이 드러났습니다.'
  }
  return '기존 정보가 더 강한 형태로 정리됐습니다.'
}

function getCourtControlLabel(action?: 'separation' | 'confidential_protection' | 'immediate_answer'): string {
  if (action === 'separation') return '분리 심문'
  if (action === 'confidential_protection') return '비공개 보호'
  if (action === 'immediate_answer') return '즉답 요구'
  return '법정 지배력 사용'
}

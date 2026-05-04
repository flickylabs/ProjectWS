import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GamePhase, Phase } from '../../../types'
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
import PCInteractionPanel, { openPcInteractionPanel } from './PCInteractionPanel'
import PCRecordSummary from './PCRecordSummary'
import PCSettingsPanel from '../settings/PCSettingsPanel'
import { playCourtControl } from '../../../engine/soundEngine'

interface Props {
  actionPanel?: ReactNode
  onDialogueTap?: () => void
  isDialoguePhase?: boolean
}

const PHASE_LABELS: Record<string, string> = {
  [Phase.Briefing]: '사건 브리핑',
  [Phase.Pretrial]: '사전진술',
  [Phase.Interrogation]: '심문',
  [Phase.Mediation]: '판결 전 검토',
  [Phase.Verdict]: '판결',
  [Phase.Result]: '결과',
  // Legacy fallback
  [GamePhase.Phase2_Rebuttal]: '사전진술',
  [GamePhase.Phase4_Evidence]: '심문',
  [GamePhase.Phase5_ReExamination]: '심문',
}

type CombinationOverlayResultType =
  | 'dispute'
  | 'upgrade'
  | 'dossier'
  | 'witness'
  | 'evidence'
  | 'question'
  | 'note'
  | 'statement'
  | 'mediation'
  | 'reliability'
  | 'context'

function getPhaseNumber(phase: GamePhase): string {
  const DISPLAY_NUMBERS: Record<string, string> = {
    [Phase.Briefing]: '0',
    [Phase.Pretrial]: '1',
    [Phase.Interrogation]: '2',
    [Phase.Mediation]: '3',
    [Phase.Verdict]: '3',
    [Phase.Result]: 'R',
    // Legacy
    [GamePhase.Phase2_Rebuttal]: '1',
    [GamePhase.Phase4_Evidence]: '2',
    [GamePhase.Phase5_ReExamination]: '2',
  }
  return DISPLAY_NUMBERS[phase] ?? '0'
}

interface CombinationOverlayState {
  id: number
  inputs: Array<{ label: string; iconId: string }>
  outputLabel: string
  outputSummary: string
  resultType?: CombinationOverlayResultType
}

interface PcCombinationSuccessDetail {
  inputs?: Array<{ label: string; type?: string }>
  outputLabel?: string
  outputSummary?: string
  resultType?: CombinationOverlayResultType
  resultTitle?: string
}

interface V4CombineSuccessDetail {
  resultType: CombinationOverlayResultType
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
  const turnCount = useStore((s) => s.turnCount)

  const [tokenPopup, setTokenPopup] = useState<'invest' | 'skill' | 'court' | null>(null)
  const [recordSummaryOpen, setRecordSummaryOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [combinationOverlay, setCombinationOverlay] = useState<CombinationOverlayState | null>(null)
  const [dossierUnlockText, setDossierUnlockText] = useState<string | null>(null)
  const [courtControlFlash, setCourtControlFlash] = useState<{ id: number; label: string } | null>(null)

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
        resultType: detail.resultType,
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

  // Phase 2 (심문) 에서만 핫바 노출. Phase4/5는 deprecated.
  const showDock = currentPhase === Phase.Interrogation

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
    if (kind === 'invest' || kind === 'skill' || kind === 'court') {
      setTokenPopup(kind)
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
  }, [caseData?.caseId, currentPhase, resources.skillPoints, resources.courtControl, resources.investigationTokens, timelineBody, turnCount])

  const TOKEN_POPUP_CONFIG = {
    invest: {
      title: '조사 토큰',
      icon: 'i-search' as const,
      tone: 'blue' as const,
      value: resources.investigationTokens,
      desc: '증거 조사, 추가 단서 발굴, 사건 분석에서 사용합니다.',
    },
    skill: {
      title: '스킬 포인트',
      icon: 'i-bolt' as const,
      tone: 'gold' as const,
      value: resources.skillPoints,
      desc: '즉답 요구, 분리 심문, 비공개 보호 등 특수 행동에 사용합니다.',
    },
    court: {
      title: '법정 지배력',
      icon: 'i-scale' as const,
      tone: 'red' as const,
      value: resources.courtControl,
      desc: '질문과 증거 제시의 효과를 높이고, 판결에서 유리한 위치를 확보합니다.',
    },
  }

  const tokenPopupData = tokenPopup ? TOKEN_POPUP_CONFIG[tokenPopup] : null

  return (
    <>
      {/* 토큰 상세 팝업 */}
      {tokenPopup && tokenPopupData && (
        <div className="pc-token-popup-overlay" onClick={() => setTokenPopup(null)}>
          <div className={`pc-token-popup pc-token-popup--${tokenPopupData.tone}`} onClick={(e) => e.stopPropagation()}>
            <button className="pc-token-popup__close" onClick={() => setTokenPopup(null)} type="button" aria-label="닫기">&times;</button>
            <h3 className="pc-token-popup__title">{tokenPopupData.title}</h3>
            <div className="pc-token-popup__value-row">
              <PCSvgIcon id={tokenPopupData.icon} size={28} />
              <span className="pc-token-popup__value">{tokenPopupData.value}</span>
            </div>
            <p className="pc-token-popup__desc">{tokenPopupData.desc}</p>
          </div>
        </div>
      )}

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
              <b>{resources.skillPoints}</b>
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
            <button className="pc-play-tool" onClick={() => setSettingsOpen(true)} title="설정" type="button">
              <PCSvgIcon id="i-gear" size={16} />
            </button>
          </nav>
        </header>

        <aside className="panel panel-l pc-play-panel pc-play-panel--left">
          <PCLeftPanel />
        </aside>

        <main className="center pc-play-center">
          <div className="pc-vfx-origin-center" data-resonance-target="vfx-origin-center" aria-hidden="true" />
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

          <div className="chat-area pc-play-chat" onClick={handleChatClick} ref={chatRef}>
            <PCDialogueLog />
          </div>

          {actionPanel ? (
            <div className={`pc-play-action-shell${isDialoguePhase ? ' is-dialogue' : ''}${showDock ? ' has-dock' : ''}${currentPhase === Phase.Mediation || currentPhase === Phase.Verdict ? ' is-fullscreen-panel' : ''}`}>
              {actionPanel}
            </div>
          ) : null}

          {showDock ? <PCBottomDock /> : null}
        </main>

        <aside className="panel panel-r pc-play-panel pc-play-panel--right">
          {showDock ? (
            <button
              type="button"
              className="pc-summary-floating-toggle"
              onClick={() => window.dispatchEvent(new Event('pc:open-record-summary'))}
              title="기록 정리"
              aria-label="기록 정리"
            >
              <PCSvgIcon id="i-doc" size={14} />
            </button>
          ) : null}
          <PCRightPanel />
        </aside>
      </div>

      <PCEvidenceViewer />
      <PCInteractionPanel />
      <PCGameplayOverlay />
      <TokenSpendEffect />
      <PCSettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      {combinationOverlay ? (
        <div className={`pc-combination-success is-${combinationOverlay.resultType ?? 'upgrade'}`} key={combinationOverlay.id}>
          <div className="pc-combination-success__card" data-resonance-target="combination-success">
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
              <div className="pc-combination-success__result">
                <span className="pc-combination-success__icon is-result">
                  <PCSvgIcon id={getCombinationResultIconId(combinationOverlay.resultType)} size={18} />
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

function getCombinationSummary(resultType?: CombinationOverlayResultType): string {
  if (resultType === 'dossier') {
    return '결정적 질문으로 이어지는 조합이 완성됐습니다.'
  }
  if (resultType === 'witness') {
    return '새 증인이 소환 가능해졌습니다.'
  }
  if (resultType === 'evidence') {
    return '새 증거가 기록에 추가됐습니다.'
  }
  if (resultType === 'question') {
    return '새 질문 경로가 열렸습니다.'
  }
  if (resultType === 'note') {
    return '새 단서 기록이 추가됐습니다.'
  }
  if (resultType === 'statement') {
    return '새 진술이 기록에 추가됐습니다.'
  }
  if (resultType === 'mediation') {
    return '판결 전 검토에 쓸 수 있는 힌트가 추가됐습니다.'
  }
  if (resultType === 'reliability') {
    return '기존 증거의 신뢰도가 강화됐습니다.'
  }
  if (resultType === 'context') {
    return '사건 맥락이 더 구체화됐습니다.'
  }
  if (resultType === 'dispute') {
    return '새로운 쟁점이 드러났습니다.'
  }
  return '기존 정보가 더 강한 형태로 정리됐습니다.'
}

function getCombinationResultIconId(resultType?: CombinationOverlayResultType): string {
  if (resultType === 'witness') return 'i-eye'
  if (resultType === 'evidence') return 'i-doc'
  if (resultType === 'question') return 'i-gavel'
  if (resultType === 'note') return 'i-chat'
  if (resultType === 'statement') return 'i-chat'
  if (resultType === 'mediation') return 'i-heart'
  if (resultType === 'reliability') return 'i-link'
  if (resultType === 'context') return 'i-link'
  if (resultType === 'dossier') return 'i-gavel'
  if (resultType === 'dispute') return 'i-scale'
  return 'i-link'
}

function getCourtControlLabel(action?: 'separation' | 'confidential_protection' | 'immediate_answer'): string {
  if (action === 'separation') return '분리 심문'
  if (action === 'confidential_protection') return '비공개 보호'
  if (action === 'immediate_answer') return '즉답 요구'
  return '법정 지배력 사용'
}

import type { ReactNode } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GamePhase, Phase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
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
import { useI18n, type MessageKey } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'
import PCTutorialOverlay from '../tutorial/PCTutorialOverlay'

interface Props {
  actionPanel?: ReactNode
  onDialogueTap?: () => void
  isDialoguePhase?: boolean
}

const PHASE_LABEL_KEYS: Record<string, MessageKey> = {
  [Phase.Briefing]: 'pc.phase.briefing',
  [Phase.Pretrial]: 'pc.phase.pretrial',
  [Phase.Interrogation]: 'pc.phase.interrogation',
  [Phase.Mediation]: 'pc.phase.mediation',
  [Phase.Verdict]: 'pc.phase.verdict',
  [Phase.Result]: 'pc.phase.result',
  // Legacy fallback
  [GamePhase.Phase2_Rebuttal]: 'pc.phase.pretrial',
  [GamePhase.Phase4_Evidence]: 'pc.phase.interrogation',
  [GamePhase.Phase5_ReExamination]: 'pc.phase.interrogation',
}

type TranslateFn = (key: MessageKey, values?: Record<string, string | number | boolean | null | undefined>) => string

function getPhaseLabel(phase: GamePhase, t: TranslateFn): string {
  return t(PHASE_LABEL_KEYS[phase] ?? 'pc.phase.briefing')
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
  const { locale, t } = useI18n()
  const chatRef = useRef<HTMLDivElement>(null)
  const combinationTimerRef = useRef<number | null>(null)
  const dossierTimerRef = useRef<number | null>(null)
  const courtControlTimerRef = useRef<number | null>(null)
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const resources = useStore((s) => s.resources)
  const rebalanceResource = useStore((s) => s.rebalanceResource)
  const turnCount = useStore((s) => s.turnCount)

  const [tokenPopup, setTokenPopup] = useState<'invest' | 'skill' | 'court' | null>(null)
  const [recordSummaryOpen, setRecordSummaryOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [tokenPopupResult, setTokenPopupResult] = useState<{ message: string; ok: boolean } | null>(null)
  const [combinationOverlay, setCombinationOverlay] = useState<CombinationOverlayState | null>(null)
  const [dossierUnlockText, setDossierUnlockText] = useState<string | null>(null)
  const [courtControlFlash, setCourtControlFlash] = useState<{ id: number; label: string } | null>(null)
  const resourcePopupByKey = {
    investigationTokens: 'invest',
    skillPoints: 'skill',
    courtControl: 'court',
  } as const

  useEffect(() => {
    return () => {
      if (combinationTimerRef.current) window.clearTimeout(combinationTimerRef.current)
      if (dossierTimerRef.current) window.clearTimeout(dossierTimerRef.current)
      if (courtControlTimerRef.current) window.clearTimeout(courtControlTimerRef.current)
    }
  }, [])

  useEffect(() => {
    setTokenPopupResult(null)
  }, [tokenPopup])

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ resource?: keyof typeof resourcePopupByKey }>).detail
      const key = detail?.resource ? resourcePopupByKey[detail.resource] : null
      if (key) setTokenPopup(key)
    }
    window.addEventListener('pc:resource-shortage', handler)
    return () => window.removeEventListener('pc:resource-shortage', handler)
  }, [])

  useEffect(() => {
    const handler = () => setRecordSummaryOpen(true)
    window.addEventListener('pc:open-record-summary', handler)
    return () => window.removeEventListener('pc:open-record-summary', handler)
  }, [])

  useEffect(() => {
    const runWhenPresentationLaneIsFree = (callback: () => void, maxMs = 2800) => {
      const startedAt = Date.now()
      const tick = () => {
        const feedbackBusy = Boolean(useGameStore.getState().activeFeedback || useGameStore.getState().feedbackQueue.length > 0)
        const busy = document.querySelector(
          [
            '.pc-event-feedback-root.is-modal',
            '.pc-event-feedback-root.is-focus-takeover',
            '.pc-interaction-overlay',
            '.v4-confession-overlay',
            '.v4-dispute-card-overlay',
          ].join(', ')
        )
        if ((!feedbackBusy && !busy) || Date.now() - startedAt >= maxMs) {
          callback()
          return
        }
        window.setTimeout(tick, 120)
      }
      tick()
    }

    const showCombinationOverlay = (detail: PcCombinationSuccessDetail) => {
      const inputs = (detail.inputs ?? [])
        .slice(0, 2)
        .map((item) => ({
          label: localizeRuntimeText(item.label, locale),
          iconId: getCombinationIconId(item.type),
        }))

      const outputLabel = localizeRuntimeText(detail.outputLabel ?? detail.resultTitle ?? t('pc.court.combination.success'), locale)
      const outputSummary = detail.outputSummary
        ? localizeRuntimeText(detail.outputSummary, locale)
        : getCombinationSummary(detail.resultType, t)

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
      const detail = (event as CustomEvent<PcCombinationSuccessDetail>).detail ?? {}
      runWhenPresentationLaneIsFree(() => showCombinationOverlay(detail))
    }

    const handleLegacyCombination = (event: Event) => {
      const detail = (event as CustomEvent<V4CombineSuccessDetail>).detail
      const payload = {
        resultType: detail?.resultType,
        resultTitle: detail?.resultTitle,
      }
      runWhenPresentationLaneIsFree(() => showCombinationOverlay(payload))
    }

    const handleDossierUnlock = (event: Event) => {
      const detail = (event as CustomEvent<DossierUnlockDetail>).detail
      setDossierUnlockText(localizeRuntimeText(detail?.questionText ?? t('pc.court.dossier.unlockDefault'), locale))
      if (dossierTimerRef.current) window.clearTimeout(dossierTimerRef.current)
      dossierTimerRef.current = window.setTimeout(() => setDossierUnlockText(null), 1500)
    }

    const handleCourtControlUsed = (event: Event) => {
      const detail = (event as CustomEvent<CourtControlUsedDetail>).detail
      playCourtControl()
      setCourtControlFlash({
        id: Date.now(),
        label: localizeRuntimeText(detail?.label ?? getCourtControlLabel(detail?.action, t), locale),
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
  }, [locale, t])

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
      .map((entry) => `T${entry.turn} · ${localizeRuntimeText(entry.text, locale)}`)

    return lines.length > 0
      ? lines.join('\n\n')
      : t('pc.court.timeline.empty')
  }, [dialogueLog, locale, t])

  const openHeaderPanel = useCallback((kind: 'invest' | 'skill' | 'court' | 'turn' | 'timeline') => {
    if (kind === 'invest' || kind === 'skill' || kind === 'court') {
      setTokenPopup(kind)
      return
    }

    if (kind === 'turn') {
      openPcInteractionPanel({
        title: t('pc.court.turnPanel.title'),
        subtitle: `Turn ${turnCount}`,
        tone: 'neutral',
        body: [
          t('pc.court.turnPanel.currentPhase', { phase: getPhaseLabel(currentPhase, t) }),
          t('pc.court.turnPanel.currentTurn', { turn: turnCount }),
          '',
          t('pc.court.turnPanel.description'),
        ].join('\n'),
      })
      return
    }

    openPcInteractionPanel({
      title: t('pc.court.timeline.title'),
      subtitle: caseData?.caseId ?? t('pc.court.timeline.subtitleFallback'),
      tone: 'blue',
      body: timelineBody,
    })
  }, [caseData?.caseId, currentPhase, t, timelineBody, turnCount])

  const CLEAN_TOKEN_POPUP_CONFIG = {
    invest: {
      title: t('pc.court.resource.investigationToken'),
      icon: 'i-search' as const,
      tone: 'blue' as const,
      value: resources.investigationTokens,
      desc: t('pc.court.resource.invest.desc'),
    },
    skill: {
      title: t('pc.court.resource.skillPoint'),
      icon: 'i-bolt' as const,
      tone: 'gold' as const,
      value: resources.skillPoints,
      desc: t('pc.court.resource.skill.desc'),
    },
    court: {
      title: t('pc.court.resource.courtControl'),
      icon: 'i-scale' as const,
      tone: 'red' as const,
      value: resources.courtControl,
      desc: t('pc.court.resource.court.desc'),
    },
  }

  const TOKEN_RECOVERY_CONFIG = {
    invest: {
      label: t('pc.court.recovery.invest.label'),
      cost: t('pc.court.recovery.invest.cost'),
      target: 'investigationTokens' as const,
      desc: t('pc.court.recovery.invest.desc'),
      disabled: resources.courtControl < 1,
    },
    skill: {
      label: t('pc.court.recovery.skill.label'),
      cost: t('pc.court.recovery.skill.cost'),
      target: 'skillPoints' as const,
      desc: t('pc.court.recovery.skill.desc'),
      disabled: resources.investigationTokens < 1,
    },
    court: {
      label: t('pc.court.recovery.court.label'),
      cost: t('pc.court.recovery.court.cost'),
      target: 'courtControl' as const,
      desc: t('pc.court.recovery.court.desc'),
      disabled: resources.skillPoints < 2,
    },
  }

  const tokenPopupData = tokenPopup ? CLEAN_TOKEN_POPUP_CONFIG[tokenPopup] : null
  const tokenRecoveryData = tokenPopup ? TOKEN_RECOVERY_CONFIG[tokenPopup] : null

  const handleTokenRecovery = useCallback(() => {
    if (!tokenPopup) return
    const recovery = TOKEN_RECOVERY_CONFIG[tokenPopup]
    const result = rebalanceResource(recovery.target)
    setTokenPopupResult({ message: localizeRuntimeText(result.message, locale), ok: result.ok })
    if (!result.ok) return
    const latest = useGameStore.getState()
    if (latest.resources.courtControl < resources.courtControl) {
      window.dispatchEvent(new CustomEvent('pc:court-control-used', { detail: { label: recovery.label } }))
    }
  }, [locale, rebalanceResource, resources.courtControl, tokenPopup])

  return (
    <>
      {/* 토큰 상세 팝업 */}
      {tokenPopup && tokenPopupData && (
        <div className="pc-token-popup-overlay" onClick={() => setTokenPopup(null)}>
          <div className={`pc-token-popup pc-token-popup--${tokenPopupData.tone}`} onClick={(e) => e.stopPropagation()}>
            <button className="pc-token-popup__close" onClick={() => setTokenPopup(null)} type="button" aria-label={t('pc.common.close')}>&times;</button>
            <h3 className="pc-token-popup__title">{tokenPopupData.title}</h3>
            <div className="pc-token-popup__value-row">
              <PCSvgIcon id={tokenPopupData.icon} size={28} />
              <span className="pc-token-popup__value">{tokenPopupData.value}</span>
            </div>
            <p className="pc-token-popup__desc">{tokenPopupData.desc}</p>
            {tokenRecoveryData ? (
              <div className="pc-token-popup__recovery">
                <div className="pc-token-popup__recovery-head">
                  <span>{tokenRecoveryData.label}</span>
                  <b>{tokenRecoveryData.cost}</b>
                </div>
                <p className="pc-token-popup__recovery-desc">{tokenRecoveryData.desc}</p>
                <button
                  className="pc-token-popup__recharge-btn"
                  disabled={tokenRecoveryData.disabled}
                  onClick={handleTokenRecovery}
                  type="button"
                >
                  {t('pc.court.recovery.execute')}
                </button>
                {tokenPopupResult ? (
                  <p className={`pc-token-popup__recovery-result${tokenPopupResult.ok ? '' : ' is-warn'}`}>
                    {tokenPopupResult.message}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="app pc-play-app" onDragOver={(e) => e.preventDefault()}>
        <header className="pc-play-header">
          <button className="pc-play-back" onClick={resetPcSessionToHome} type="button">
            <span className="pc-play-back__arrow" aria-hidden="true">&#8592;</span>
            <span>{t('pc.court.back')}</span>
          </button>

          <div className="pc-play-titlebar">
            <div className="logo-group pc-play-logo">
              <span className="pc-play-logo__mark" aria-hidden="true">
                <PCSvgIcon id="i-gavel" size={22} />
              </span>
              <span className="logo-text">{t('brand.title')}</span>
              {caseData ? (
                <span className="logo-case">
                  {localizeRuntimeText(caseData.meta?.title ?? caseData.caseId, locale)}
                  <span className="logo-case__ver">{caseData.caseId.replace(/^case-/, '').replace(/^(spouse|family|friend|neighbor|tenant|partnership|workplace|headline)-/, '')}</span>
                </span>
              ) : null}
            </div>

            <div className="phase-pill pc-play-phase">
              <PCSvgIcon id="i-clock" size={14} />
              <span>{`Phase ${getPhaseNumber(currentPhase)} - ${getPhaseLabel(currentPhase, t)}`}</span>
            </div>
          </div>

          <nav className="pc-play-tools" aria-label="play tools">
            <button
              className="pc-play-tool is-blue"
              data-pc-token="investigation"
              onClick={() => openHeaderPanel('invest')}
              title={t('pc.court.resource.investigationToken')}
              type="button"
            >
              <PCSvgIcon id="i-search" size={16} />
              <b>{resources.investigationTokens}</b>
            </button>
            <button
              className="pc-play-tool is-gold"
              data-pc-token="skill"
              onClick={() => openHeaderPanel('skill')}
              title={t('pc.court.resource.skillPoint')}
              type="button"
            >
              <PCSvgIcon id="i-bolt" size={16} />
              <b>{resources.skillPoints}</b>
            </button>
            <button
              className="pc-play-tool is-red"
              data-pc-token="court"
              onClick={() => openHeaderPanel('court')}
              title={t('pc.court.resource.courtControl')}
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
            <button className="pc-play-tool" onClick={() => setSettingsOpen(true)} title={t('pc.court.settings')} type="button">
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
              title={t('pc.court.recordSummary')}
              aria-label={t('pc.court.recordSummary')}
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
      <PCTutorialOverlay />
      {combinationOverlay ? (
        <div className={`pc-combination-success is-${combinationOverlay.resultType ?? 'upgrade'}`} key={combinationOverlay.id}>
          <div className="pc-combination-success__card" data-resonance-target="combination-success">
            <div className="pc-combination-success__eyebrow">{t('pc.court.combination.success')}</div>
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
                  <span className="pc-combination-success__name">{t('pc.court.combination.analyzingDone')}</span>
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
            <span className="pc-dossier-unlock__eyebrow">{t('pc.court.dossier.unlockEyebrow')}</span>
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

function getCombinationSummary(resultType: CombinationOverlayResultType | undefined, t: TranslateFn): string {
  if (resultType === 'dossier') {
    return t('pc.court.combination.summary.dossier')
  }
  if (resultType === 'witness') {
    return t('pc.court.combination.summary.witness')
  }
  if (resultType === 'evidence') {
    return t('pc.court.combination.summary.evidence')
  }
  if (resultType === 'question') {
    return t('pc.court.combination.summary.question')
  }
  if (resultType === 'note') {
    return t('pc.court.combination.summary.note')
  }
  if (resultType === 'statement') {
    return t('pc.court.combination.summary.statement')
  }
  if (resultType === 'mediation') {
    return t('pc.court.combination.summary.mediation')
  }
  if (resultType === 'reliability') {
    return t('pc.court.combination.summary.reliability')
  }
  if (resultType === 'context') {
    return t('pc.court.combination.summary.context')
  }
  if (resultType === 'dispute') {
    return t('pc.court.combination.summary.dispute')
  }
  return t('pc.court.combination.summary.default')
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

function getCourtControlLabel(action: 'separation' | 'confidential_protection' | 'immediate_answer' | undefined, t: TranslateFn): string {
  if (action === 'separation') return t('pc.court.control.separation')
  if (action === 'confidential_protection') return t('pc.court.control.confidentialProtection')
  if (action === 'immediate_answer') return t('pc.court.control.immediateAnswer')
  return t('pc.court.control.default')
}

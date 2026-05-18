/**
 * PCBottomDock — V4 single-bar hotbar
 * 6 fixed slots: [사실추궁] [동기탐색] [공감접근] [자유질문] [증거제시] [증인소환]
 * + 하단 특수 스킬: [기록정리] + [분리심문|비공개보호|즉답요구]
 * + 단계 진행: canAdvancePhase 충족 시 자동 배너 제안
 */
import { useEffect, useMemo, useState, useCallback, useRef } from 'react'
import { GamePhase, Phase, type EmotionalPhase, type PartyId, type QuestionType } from '../../../types'
import { useActionDispatch } from '../../../hooks/useActionDispatch'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { openPcInteractionPanel } from '../layout/PCInteractionPanel'
import PCSvgIcon from '../icons/PCSvgIcon'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import PCDeferredVerdictIcon from './PCDeferredVerdictIcon'
import { getPcFaceSymbolId, getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import FreeInterrogationInput from '../../freeInterrogation/FreeQuestionInput'
import { isFreeInterrogationEnabled } from '../../../engine/freeInterrogation'
import { buildGeneratedQuestionAngleOptions, getQuestionAngleLabel, getUnlockedQuestionAngleIds } from '../../../engine/questionAngleEngine'
import { getScriptedJudgeQuestionOptions, type ScriptedJudgeQuestionOption } from '../../../engine/scriptedTextLoader'
import { emitVerdictCtaCollapsed, PC_VERDICT_CTA_COLLAPSED_EVENT } from '../layout/verdictAdvanceEvents'
import { requestVerdictAdvance } from '../layout/verdictAdvancePrompt'
import { normalizeCaseKey } from '../../../utils/caseHelpers'
import { useI18n, type MessageKey, type MessageValues } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

type TFunction = (key: MessageKey, values?: MessageValues) => string

const EMOTION_LABEL_KEYS: Record<EmotionalPhase, MessageKey> = {
  defensive: 'pc.hotbar.emotion.defensive',
  confident: 'pc.hotbar.emotion.confident',
  shaken: 'pc.hotbar.emotion.shaken',
  angry: 'pc.hotbar.emotion.angry',
  resigned: 'pc.hotbar.emotion.resigned',
}

const QUESTION_TITLE_KEYS: Record<QuestionType, MessageKey> = {
  fact_pursuit: 'pc.hotbar.slot.fact.title',
  motive_search: 'pc.hotbar.slot.motive.title',
  empathy_approach: 'pc.hotbar.slot.empathy.title',
  evidence_present: 'pc.hotbar.slot.evidence.title',
}

const EVIDENCE_TYPE_LABEL_KEYS: Record<string, MessageKey> = {
  bank: 'pc.hotbar.evidenceType.bank',
  financial_record: 'pc.hotbar.evidenceType.financialRecord',
  receipt: 'pc.hotbar.evidenceType.receipt',
  chat: 'pc.hotbar.evidenceType.chat',
  contract: 'pc.hotbar.evidenceType.contract',
  document: 'pc.hotbar.evidenceType.document',
  institutional_note: 'pc.hotbar.evidenceType.institutionalNote',
  testimony: 'pc.hotbar.evidenceType.testimony',
  cctv: 'pc.hotbar.evidenceType.cctv',
  photo: 'pc.hotbar.evidenceType.photo',
  video: 'pc.hotbar.evidenceType.video',
  log: 'pc.hotbar.evidenceType.log',
  email: 'pc.hotbar.evidenceType.email',
  audio: 'pc.hotbar.evidenceType.audio',
  forensic_report: 'pc.hotbar.evidenceType.forensicReport',
  device: 'pc.hotbar.evidenceType.device',
  sns: 'pc.hotbar.evidenceType.sns',
}

function getEvidenceTypeLabel(type: string, t: TFunction) {
  return t(EVIDENCE_TYPE_LABEL_KEYS[type] ?? 'pc.hotbar.evidence.file')
}

function buildEvidenceMetaTags(meta: { trustLevel?: string; source?: string } | undefined, t: TFunction): string[] {
  const tags: string[] = []
  if (meta?.trustLevel) tags.push(t(`pc.evidenceMeta.trust.${meta.trustLevel}` as MessageKey))
  if (meta?.source) tags.push(t(`pc.evidenceMeta.source.${meta.source}` as MessageKey))
  return tags
}

function formatLocalizedCaseText(value: string, locale: string, t: TFunction): string {
  void t
  return localizeRuntimeText(value, locale as Parameters<typeof localizeRuntimeText>[1])
}

export default function PCBottomDock() {
  const { locale, t } = useI18n()
  const dispatch = useActionDispatch()
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const pcTargetParty = useStore((s) => s.pcTargetParty)
  const setPcTargetParty = useStore((s) => s.setPcTargetParty)
  const lastFocusedDisputeId = useStore((s) => s.lastFocusedDisputeId)
  const evidenceDefinitions = useStore((s) => s.evidenceDefinitions)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const questionMeters = useStore((s) => s.questionMeters)
  const interrogationHistory = useStore((s) => s.interrogationHistory)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const calledWitnesses = useStore((s) => s.calledWitnesses)
  // [기타2 픽스] LLM 응답 진행 중 핫바 + 단축키 차단 — 답변 도중 추가 질문 들어가는 결함 방지
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const turnCount = useStore((s) => s.turnCount)
  const readinessState = useStore((s) => s.readinessState)
  // canAdvancePhase()와 getCombinableEvidenceIds()는 매번 새 값을 반환하여 무한 루프 유발
  // → useMemo + getState()로 의존성 기반 캐싱
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canAdvance = useMemo(() => useGameStore.getState().canAdvancePhase(), [currentPhase, disputeVisibility, readinessState, turnCount])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const combinableIds = useMemo(() => useGameStore.getState().getCombinableEvidenceIds(), [evidenceStates])

  // --- overlay states ---
  const [questionChoice, setQuestionChoice] = useState<{ type: QuestionType; disputeId?: string } | null>(null)
  const [evidenceChoice, setEvidenceChoice] = useState(false)
  const [freeQuestionOpen, setFreeQuestionOpen] = useState(false)
  const freeQuestionRef = useRef<HTMLTextAreaElement>(null)
  const [advanceDismissed, setAdvanceDismissed] = useState(false)
  const freeInterrogationEnabled = isFreeInterrogationEnabled()

  // hidden 쟁점 필터
  const visibleDisputes = useMemo(() => {
    if (!caseData) return []
    const targetAgent = pcTargetParty === 'a' ? agentA : agentB
    return caseData.disputes.filter((d) => {
      const vis = disputeVisibility[d.id]
      if (vis?.visibility === 'hidden' || vis?.visibility === 'inactive') return false
      if (vis && !vis.relevantParties.includes(pcTargetParty)) return false
      return Boolean(targetAgent.lieStateMap?.[d.id])
    })
  }, [agentA, agentB, caseData, disputeVisibility, pcTargetParty])

  const activeDisputeId = lastFocusedDisputeId ?? visibleDisputes[0]?.id ?? ''

  // Close overlays
  const closeAll = useCallback(() => {
    setQuestionChoice(null)
    setEvidenceChoice(false)
    setFreeQuestionOpen(false)
  }, [])

  // --- Question choice (slots 1-3) ---
  const openQuestionChoice = useCallback((questionType: QuestionType) => {
    if (!caseData) return
    closeAll()
    setQuestionChoice({ type: questionType })
  }, [caseData, closeAll])

  const selectDisputeForQuestion = useCallback((disputeId: string) => {
    if (!questionChoice) return
    setQuestionChoice({ ...questionChoice, disputeId })
  }, [questionChoice])

  const questionOptions = useMemo(() => {
    if (!caseData || !questionChoice?.disputeId) return []
    const history = interrogationHistory?.[pcTargetParty]?.[questionChoice.disputeId]
    const depth = Math.min(Math.max((history?.questionTypes?.length ?? 0) + 1, 1), 4)
    const allowedAngles = getUnlockedQuestionAngleIds({
      caseId: normalizeCaseKey(caseData),
      caseData,
      disputeId: questionChoice.disputeId,
      target: pcTargetParty,
      evidenceStates,
      calledWitnesses,
    })
    const seed = turnCount + questionChoice.disputeId.charCodeAt(questionChoice.disputeId.length - 1)
    const scriptedOptions = getScriptedJudgeQuestionOptions(
      normalizeCaseKey(caseData),
      questionChoice.disputeId,
      questionChoice.type,
      depth,
      pcTargetParty,
      {
        allowedAngles,
        limit: 3,
        seed,
        includeOtherDepths: false,
      },
    )
    const generatedOptions = buildGeneratedQuestionAngleOptions({
      caseId: normalizeCaseKey(caseData),
      caseData,
      disputeId: questionChoice.disputeId,
      questionType: questionChoice.type,
      target: pcTargetParty,
      evidenceStates,
      calledWitnesses,
      limit: 3,
      seed,
    }).map((option) => ({
      ...option,
      disputeId: questionChoice.disputeId!,
      questionType: questionChoice.type,
      depth,
      targetParty: pcTargetParty,
    }))
    const byText = new Map<string, ScriptedJudgeQuestionOption>()
    for (const option of [...scriptedOptions, ...generatedOptions]) {
      const key = option.text.replace(/\s+/g, ' ').trim()
      if (!byText.has(key)) byText.set(key, option)
    }
    return [...byText.values()].slice(0, 3)
  }, [calledWitnesses, caseData, evidenceStates, interrogationHistory, pcTargetParty, questionChoice, turnCount])

  const selectQuestionOption = useCallback((option?: ScriptedJudgeQuestionOption) => {
    if (!questionChoice?.disputeId) return
    dispatch({
      type: 'question',
      questionType: questionChoice.type,
      target: pcTargetParty,
      disputeId: questionChoice.disputeId,
      judgeQuestionText: option?.text,
      scriptedQuestionId: option?.id,
      answerAngle: option?.answerAngle,
      answerAngles: option?.answerAngle ? [option.answerAngle] : undefined,
    })
    setQuestionChoice(null)
  }, [dispatch, pcTargetParty, questionChoice])

  // --- Free question (slot 4) ---
  const openFreeQuestion = useCallback(() => {
    if (!caseData || !freeInterrogationEnabled) return
    closeAll()
    setFreeQuestionOpen(true)
    setTimeout(() => freeQuestionRef.current?.focus(), 50)
  }, [caseData, closeAll, freeInterrogationEnabled])

  // --- Evidence choice (slot 5) ---
  const unlockedEvidence = useMemo(() => {
    return evidenceDefinitions.filter((ev) => evidenceStates[ev.id]?.unlocked)
  }, [evidenceDefinitions, evidenceStates])

  const openEvidenceChoice = useCallback(() => {
    closeAll()
    setEvidenceChoice(true)
  }, [closeAll])

  const selectEvidence = useCallback((evidenceId: string) => {
    setEvidenceChoice(false)
    // 좌측 증거 클릭과 동일한 증거 정보 패널 열기
    const ev = evidenceDefinitions.find((e) => e.id === evidenceId)
    if (!ev) return
    const st = evidenceStates[ev.id]
    const label = localizeRuntimeText(st?.deepInvestigated ? ev.name : (ev.surfaceName ?? ev.name), locale)
    const desc = st?.deepInvestigated ? ev.description : (ev.surfaceDescription ?? ev.description)
    const stages = ev.investigationStages ?? []
    const investigatedKeys = new Set(st?.investigatedActions ?? [])
    const bodyParts: string[] = [desc]
    const revealedFindings = stages
      .filter((s) => investigatedKeys.has(s.revealKey))
      .map((s) => ev.investigationResults[s.revealKey])
      .filter(Boolean)
    const hiddenCount = stages.filter((s) => !investigatedKeys.has(s.revealKey)).length
    if (revealedFindings.length > 0 || hiddenCount > 0) {
      bodyParts.push('')
      bodyParts.push(t('pc.hotbar.evidence.foundContent'))
      revealedFindings.forEach((f) => bodyParts.push(`• ${formatLocalizedCaseText(f, locale, t)}`))
      if (hiddenCount > 0) bodyParts.push(t('pc.hotbar.evidence.hiddenCount', { count: hiddenCount }))
    }
    const metaTags = buildEvidenceMetaTags(ev.meta, t)

    openPcInteractionPanel({
      title: label,
      subtitle: getEvidenceTypeLabel(ev.type, t),
      tone: 'gold',
      variant: 'evidence',
      evidenceId: ev.id,
      evidenceTypeLabel: getEvidenceTypeLabel(ev.type, t),
      evidenceMetaTags: metaTags,
      body: bodyParts.join('\n'),
      actions: [{ kind: 'open_evidence' as const, label: t('pc.hotbar.evidence.open'), evidenceId: ev.id }],
    })
  }, [evidenceDefinitions, evidenceStates, locale, t])

  // --- Witness (slot 6) ---
  // socialGraph entries 모두를 증인으로 인식. slot whitelist 제거 — 신규 사건의
  // close_friend / neutral_observer / community_witness 등이 누락되던 결함 fix.
  const availableWitnesses = useMemo(() => {
    if (!caseData) return []
    return caseData.duo.socialGraph
  }, [caseData])

  const hasWitness = availableWitnesses.length > 0

  const openWitnessPanel = useCallback(() => {
    if (!caseData || !hasWitness) return
    openPcInteractionPanel({
      title: t('pc.hotbar.slot.witness.label'),
      subtitle: t('pc.hotbar.slot.witness.subtitle'),
      tone: 'gold',
      variant: 'witness',
      body: '',
    })
  }, [caseData, hasWitness, t])

  // --- Special skill actions (B-6) ---
  const openSpecialAction = useCallback((action: string) => {
    if (action === 'separation') {
      openPcInteractionPanel({ title: t('pc.hotbar.special.separation.label'), subtitle: t('pc.hotbar.special.subtitle'), tone: 'gold', body: t('pc.hotbar.special.separation.body'), actions: [{ kind: 'run_special', label: t('pc.hotbar.special.separation.action'), party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'separation' }] })
    } else if (action === 'confidential') {
      openPcInteractionPanel({ title: t('pc.hotbar.special.confidential.label'), subtitle: t('pc.hotbar.special.subtitle'), tone: 'gold', body: t('pc.hotbar.special.confidential.body'), actions: [{ kind: 'run_special', label: t('pc.hotbar.special.confidential.action'), party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'confidential_protection' }] })
    } else if (action === 'immediate') {
      openPcInteractionPanel({ title: t('pc.hotbar.special.immediate.label'), subtitle: t('pc.hotbar.special.subtitle'), tone: 'gold', body: t('pc.hotbar.special.immediate.body'), actions: [{ kind: 'run_special', label: t('pc.hotbar.special.immediate.action'), party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'immediate_answer' }] })
    }
  }, [activeDisputeId, pcTargetParty, t])

  // --- Advance phase banner (B-7) ---
  const handleAdvance = useCallback(() => {
    requestVerdictAdvance()
  }, [])

  const collapseAdvanceBanner = useCallback(() => {
    setAdvanceDismissed(true)
    emitVerdictCtaCollapsed()
  }, [])

  // phase 변경 시 dismiss 리셋
  useEffect(() => { setAdvanceDismissed(false) }, [currentPhase])

  useEffect(() => {
    const handleCollapsed = () => setAdvanceDismissed(true)
    window.addEventListener(PC_VERDICT_CTA_COLLAPSED_EVENT, handleCollapsed)
    return () => window.removeEventListener(PC_VERDICT_CTA_COLLAPSED_EVENT, handleCollapsed)
  }, [])

  const advanceLabel = currentPhase === Phase.Interrogation
    ? t('pc.hotbar.advance.interrogation')
    : currentPhase === GamePhase.Phase4_Evidence
      ? t('pc.hotbar.advance.evidence')
      : t('pc.hotbar.advance.next')

  const advanceBannerText = currentPhase === Phase.Interrogation
    ? t('pc.hotbar.advance.banner.interrogation')
    : t('pc.hotbar.advance.can', { label: advanceLabel })

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const targetTag = (event.target as HTMLElement)?.tagName
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA') return
      // [기타2 픽스] LLM 응답 진행 중에는 단축키 무시 — 다중 액션 발사 방지
      if (isLLMLoading) {
        if (event.key === 'Escape') closeAll()
        return
      }
      const key = event.key.toLowerCase()
      const num = Number(event.key)
      if (num === 1) { event.preventDefault(); openQuestionChoice('fact_pursuit') }
      if (num === 2) { event.preventDefault(); openQuestionChoice('motive_search') }
      if (num === 3) { event.preventDefault(); openQuestionChoice('empathy_approach') }
      if (num === 4) { event.preventDefault(); openFreeQuestion() }
      if (num === 5) { event.preventDefault(); openEvidenceChoice() }
      if (num === 6 && hasWitness) { event.preventDefault(); openWitnessPanel() }
      if (key === 'q') { event.preventDefault(); openSpecialAction('separation') }
      if (key === 'w') { event.preventDefault(); openSpecialAction('confidential') }
      if (key === 'e') { event.preventDefault(); openSpecialAction('immediate') }
      if (event.key === 'Escape') closeAll()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeAll, hasWitness, isLLMLoading, openEvidenceChoice, openFreeQuestion, openQuestionChoice, openSpecialAction, openWitnessPanel])

  // hotbar body 실제 높이 측정 → CSS 변수 --pc-dock-area-h 주입
  // 이 변수는 캐릭터 카드(.char)와 우측 '요약' 섹션이 참조해 세로 크기를 동기화함
  const hotbarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = hotbarRef.current
    if (!el) return
    const update = () => {
      const h = el.offsetHeight
      if (h > 0) document.body.style.setProperty('--pc-dock-area-h', `${h}px`)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [caseData])

  if (!caseData) return null

  const contradiction = questionMeters[pcTargetParty].contradictionTokens

  return (
    <div className="bottom pc-play-dock">
      {/* --- 보류된 판결 미니 아이콘 (핫바 위 floating) --- */}
      <PCDeferredVerdictIcon />

      {/* --- Advance phase auto-suggestion banner (B-7) --- */}
      {canAdvance && !advanceDismissed ? (
        <div className="pc-advance-banner">
          <span className="pc-advance-banner__text">{advanceBannerText}</span>
          <button className="pc-advance-banner__btn" onClick={handleAdvance} type="button">{advanceLabel}</button>
          <button className="pc-advance-banner__dismiss" onClick={collapseAdvanceBanner} title={t('pc.hotbar.close')} type="button">
            <PCSvgIcon id="i-plus" size={12} />
          </button>
        </div>
      ) : null}

      {/* --- Question choice overlay (slots 1-3) --- */}
      {questionChoice ? (
        <div className="pc-question-choice">
          <div className="pc-question-choice__backdrop" onClick={() => setQuestionChoice(null)} />
          <div className="pc-question-choice__panel" data-tutorial-target={questionChoice.type === 'fact_pursuit' ? 'question-fact-panel' : undefined}>
            <div className="pc-question-choice__header">
              <PCSvgIcon id={questionChoice.type === 'fact_pursuit' ? 'i-gavel' : questionChoice.type === 'motive_search' ? 'i-eye' : 'i-heart'} size={18} />
              <span className="pc-question-choice__title">
                {t(QUESTION_TITLE_KEYS[questionChoice.type])}
              </span>
              <button className="pc-question-choice__close" onClick={() => setQuestionChoice(null)} type="button" aria-label={t('pc.hotbar.close')}>
                &times;
              </button>
            </div>
            <div className="pc-question-choice__disputes">
              {!questionChoice.disputeId ? (
                <>
                  <p className="pc-question-choice__hint">{t('pc.hotbar.question.chooseDispute')}</p>
                  {visibleDisputes.map((d) => (
                    <button className="pc-question-choice__dispute-btn" key={d.id} onClick={() => selectDisputeForQuestion(d.id)} type="button">
                      <span className="pc-question-choice__dispute-name">{localizeRuntimeText(d.name, locale)}</span>
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <button className="pc-question-choice__back" onClick={() => setQuestionChoice({ type: questionChoice.type })} type="button">
                    <span className="pc-question-choice__back-mark" aria-hidden="true">&lt;</span>
                    <span>{t('pc.hotbar.question.reselectDispute')}</span>
                  </button>
                  <p className="pc-question-choice__hint">{t('pc.hotbar.question.chooseQuestion')}</p>
                  {questionOptions.length === 0 ? (
                    <button className="pc-question-choice__msg-btn" onClick={() => selectQuestionOption()} type="button">
                      <span className="pc-question-choice__msg-text">{t('pc.hotbar.question.defaultQuestion')}</span>
                    </button>
                  ) : (
                    questionOptions.map((option) => (
                      <button className="pc-question-choice__msg-btn pc-question-choice__msg-btn--question" key={option.id} onClick={() => selectQuestionOption(option)} type="button">
                        <span className="pc-question-choice__angle">{localizeRuntimeText(getQuestionAngleLabel(option.answerAngle, normalizeCaseKey(caseData), option.disputeId), locale)}</span>
                        <span className="pc-question-choice__msg-text">{localizeRuntimeText(option.text, locale)}</span>
                      </button>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* --- Free question overlay (slot 4) --- */}
      {freeInterrogationEnabled && freeQuestionOpen ? (
        <div className="pc-question-choice">
          <div className="pc-question-choice__backdrop" onClick={() => setFreeQuestionOpen(false)} />
          <div className="pc-question-choice__panel">
            <div className="pc-question-choice__header">
              <PCSvgIcon id="i-chat" size={18} />
              <span className="pc-question-choice__title">{t('pc.hotbar.slot.free.title')}</span>
              <button className="pc-question-choice__close" onClick={() => setFreeQuestionOpen(false)} type="button" aria-label={t('pc.hotbar.close')}>
                &times;
              </button>
            </div>
            <div className="pc-question-choice__disputes">
              <p className="pc-question-choice__hint">{t('pc.hotbar.question.enterFreeQuestion')}</p>
              <FreeInterrogationInput
                activeDisputeId={activeDisputeId}
                autoFocusRef={freeQuestionRef}
                className="pc-free-question-form"
                onDone={() => setFreeQuestionOpen(false)}
                target={pcTargetParty}
              />
            </div>
          </div>
        </div>
      ) : null}

      {/* --- Evidence choice overlay (slot 5) --- */}
      {evidenceChoice ? (
        <div className="pc-question-choice">
          <div className="pc-question-choice__backdrop" onClick={() => setEvidenceChoice(false)} />
          <div className="pc-question-choice__panel">
            <div className="pc-question-choice__header">
              <PCSvgIcon id="i-doc" size={18} />
              <span className="pc-question-choice__title">{t('pc.hotbar.slot.evidence.title')}</span>
              <button className="pc-question-choice__close" onClick={() => setEvidenceChoice(false)} type="button" aria-label={t('pc.hotbar.close')}>
                &times;
              </button>
            </div>
            <div className="pc-question-choice__disputes">
              {unlockedEvidence.length === 0 ? (
                <p className="pc-question-choice__hint">{t('pc.hotbar.evidence.none')}</p>
              ) : (
                <>
                  <p className="pc-question-choice__hint">{t('pc.hotbar.evidence.choose')}</p>
                  {unlockedEvidence.map((ev) => (
                    <button className={`pc-question-choice__dispute-btn${combinableIds.has(ev.id) ? ' is-combinable' : ''}`} key={ev.id} onClick={() => selectEvidence(ev.id)} type="button">
                      <span className="pc-question-choice__dispute-icon">
                        <PCSvgIcon id={getPcEvidenceSymbolId(ev.type)} size={14} />
                      </span>
                      <span className="pc-question-choice__dispute-name">{localizeRuntimeText(ev.surfaceName ?? ev.name, locale)}</span>
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {/* --- Main hotbar --- */}
      <div className="hbar pc-play-hbar">
        {/* Character A */}
        <CharacterCard
          caseId={caseData.caseId}
          name={caseData.duo.partyA.name}
          emotion={agentA.emotionalState.phase}
          emotionValue={agentA.emotionalState.internalValue}
          faceId={getPcFaceSymbolId('a', caseData.duo.partyA, agentA.emotionalState.phase)}
          isActive={pcTargetParty === 'a'}
          side="a"
          onClick={() => setPcTargetParty('a')}
        />

        {/* 6-slot single bar */}
        <div className="hb-center hb-center--compact">
          <div className="hotbar hotbar--compact hotbar--v4" ref={hotbarRef}>
            <div className="hotbar-topbar">
              <div className="hotbar-special-row">
                <button className="hotbar-special-btn" onClick={() => openSpecialAction('separation')} title={t('pc.hotbar.shortcutTitle', { label: t('pc.hotbar.special.separation.label'), key: 'Q' })} type="button">
                  <kbd>Q</kbd><PCSvgIcon id="i-hand" size={13} /><span>{t('pc.hotbar.special.separation.compact')}</span>
                </button>
                <button className="hotbar-special-btn" onClick={() => openSpecialAction('confidential')} title={t('pc.hotbar.shortcutTitle', { label: t('pc.hotbar.special.confidential.label'), key: 'W' })} type="button">
                  <kbd>W</kbd><PCSvgIcon id="i-shield" size={13} /><span>{t('pc.hotbar.special.confidential.compact')}</span>
                </button>
                <button className="hotbar-special-btn" onClick={() => openSpecialAction('immediate')} title={t('pc.hotbar.shortcutTitle', { label: t('pc.hotbar.special.immediate.label'), key: 'E' })} type="button">
                  <kbd>E</kbd><PCSvgIcon id="i-gavel" size={13} /><span>{t('pc.hotbar.special.immediate.compact')}</span>
                </button>
              </div>
            </div>

            <div className={`hotbar-slots${isLLMLoading ? ' hotbar-slots--locked' : ''}`}>
              {/* 1: 사실 추궁 */}
              <button className="slot" data-guide-target="question-fact" data-tutorial-target="question-type-fact" disabled={isLLMLoading} onClick={() => openQuestionChoice('fact_pursuit')} title={isLLMLoading ? t('pc.hotbar.loading') : t('pc.hotbar.slot.fact.title')} type="button">
                <span className="slot-key">1</span>
                <span className="slot-ico"><PCSvgIcon id="i-gavel" size={24} /></span>
                <span className="slot-nm">{t('pc.hotbar.slot.fact.compact')}</span>
                {contradiction >= 2 ? <span className="slot-eff ef-s" /> : null}
              </button>

              {/* 2: 동기 탐색 */}
              <button className="slot" data-guide-target="question-motive" disabled={isLLMLoading} onClick={() => openQuestionChoice('motive_search')} title={isLLMLoading ? t('pc.hotbar.loading') : t('pc.hotbar.slot.motive.title')} type="button">
                <span className="slot-key">2</span>
                <span className="slot-ico"><PCSvgIcon id="i-eye" size={24} /></span>
                <span className="slot-nm">{t('pc.hotbar.slot.motive.compact')}</span>
              </button>

              {/* 3: 공감 접근 */}
              <button className="slot" data-guide-target="question-empathy" disabled={isLLMLoading} onClick={() => openQuestionChoice('empathy_approach')} title={isLLMLoading ? t('pc.hotbar.loading') : t('pc.hotbar.slot.empathy.title')} type="button">
                <span className="slot-key">3</span>
                <span className="slot-ico"><PCSvgIcon id="i-heart" size={24} /></span>
                <span className="slot-nm">{t('pc.hotbar.slot.empathy.compact')}</span>
              </button>

              {freeInterrogationEnabled ? (
                <button className="slot" disabled={isLLMLoading} onClick={openFreeQuestion} title={isLLMLoading ? t('pc.hotbar.loading') : t('pc.hotbar.slot.free.title')} type="button">
                  <span className="slot-key">4</span>
                  <span className="slot-ico"><PCSvgIcon id="i-chat" size={24} /></span>
                  <span className="slot-nm">{t('pc.hotbar.slot.free.compact')}</span>
                </button>
              ) : null}

              {/* 5: 증거 제시 */}
              <button className="slot" data-guide-target="evidence-present" data-tutorial-target="evidence-present-button" disabled={isLLMLoading} onClick={openEvidenceChoice} title={isLLMLoading ? t('pc.hotbar.loading') : t('pc.hotbar.slot.evidence.title')} type="button">
                <span className="slot-key">5</span>
                <span className="slot-ico"><PCSvgIcon id="i-doc" size={24} /></span>
                <span className="slot-nm">{t('pc.hotbar.slot.evidence.compact')}</span>
              </button>

              {/* 6: 증인 소환 */}
              <button className={`slot${!hasWitness ? ' slot-locked' : ''}`} data-guide-target="witness-summon" disabled={!hasWitness || isLLMLoading} onClick={openWitnessPanel} title={isLLMLoading ? t('pc.hotbar.loading') : t('pc.hotbar.slot.witness.title')} type="button">
                <span className="slot-key">6</span>
                <span className="slot-ico"><PCSvgIcon id="i-witness" size={24} /></span>
                <span className="slot-nm">{t('pc.hotbar.slot.witness.compact')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Character B */}
        <CharacterCard
          caseId={caseData.caseId}
          name={caseData.duo.partyB.name}
          emotion={agentB.emotionalState.phase}
          emotionValue={agentB.emotionalState.internalValue}
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
  caseId, name, emotion, emotionValue, faceId, isActive, onClick, side,
}: {
  caseId: string; name: string; emotion: EmotionalPhase; emotionValue: number;
  faceId: string; isActive: boolean; onClick: () => void; side: PartyId
}) {
  const { locale, t } = useI18n()
  const displayName = localizeRuntimeText(name, locale)
  // 감정 도넛 — 격앙/체념 단계는 펄스 애니메이션으로 위급 신호
  const isCritical = emotion === 'angry' || emotion === 'resigned'
  const safeValue = Math.max(0, Math.min(100, Math.round(emotionValue || 0)))
  return (
    <button className={`char char-${side}${isActive ? ' spk' : ''}`} data-character-card={side} data-tutorial-target={side === 'b' ? 'character-slot-b' : undefined} onClick={onClick} type="button">
      <div className={`char-face char-face--ring is-emo-${emotion}${isCritical ? ' is-critical' : ''}`}>
        <EmotionDonut value={safeValue} />
        <PCCharacterPortrait
          alt={displayName}
          caseId={caseId}
          emotion={emotion}
          fallbackSymbolId={faceId}
          party={side}
          size={52}
        />
        <span className="char-face__value" aria-label={t('pc.hotbar.emotionValue', { value: safeValue })}>{safeValue}</span>
      </div>
      <div className="char-info">
        <span className="char-nm">{displayName}</span>
        <span className={`char-emo ${emotion === 'angry' ? 'ce-sh' : 'ce-cf'}`}>{t(EMOTION_LABEL_KEYS[emotion])}</span>
      </div>
    </button>
  )
}

/** 감정 도넛 그래프 — 캐릭터 프로필 **외부** ring.
 *  값 0~100 비율로 stroke-dasharray 채움. 색상은 부모(.char-face--ring.is-emo-*)가 결정.
 *  도넛 외경(74) > char-face 외경(66) — portrait를 가리지 않고 외곽 ring만 표시. */
function EmotionDonut({ value }: { value: number }) {
  // viewBox 74×74, char-face는 66×66 + inset -4px → 도넛 외경 정확히 char-face 외부 4px
  // r=35.5 + stroke=3 → 외경 37 (직경 74) = viewBox 끝과 일치
  const radius = 35.5
  const circumference = 2 * Math.PI * radius
  const dash = (value / 100) * circumference
  return (
    <svg className="char-emo-donut" viewBox="0 0 74 74" aria-hidden="true">
      <circle
        className="char-emo-donut__bg"
        cx="37" cy="37" r={radius}
        fill="none" strokeWidth="3"
      />
      <circle
        className="char-emo-donut__fg"
        cx="37" cy="37" r={radius}
        fill="none" strokeWidth="3"
        strokeDasharray={`${dash.toFixed(2)} ${circumference.toFixed(2)}`}
        transform="rotate(-90 37 37)"
        strokeLinecap="round"
      />
    </svg>
  )
}

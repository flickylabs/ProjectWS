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

const EMOTION_LABELS: Record<EmotionalPhase, string> = {
  defensive: '경계',
  confident: '자신감',
  shaken: '동요',
  angry: '격앙',
  resigned: '체념',
}

const TYPE_LABELS: Record<string, string> = {
  bank: '금융', financial_record: '금융', receipt: '영수증', chat: '메신저', contract: '계약',
  document: '문서', institutional_note: '기관 문서', testimony: '증언', cctv: '영상',
  photo: '사진', video: '영상', log: '기록', email: '메일', audio: '오디오',
  forensic_report: '감정', device: '기기', sns: 'SNS',
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
  // [기타2 픽스] LLM 응답 진행 중 핫바 + 단축키 차단 — 답변 도중 추가 질문 들어가는 결함 방지
  const isLLMLoading = useStore((s) => s.isLLMLoading)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const turnCount = useStore((s) => s.turnCount)
  // canAdvancePhase()와 getCombinableEvidenceIds()는 매번 새 값을 반환하여 무한 루프 유발
  // → useMemo + getState()로 의존성 기반 캐싱
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const canAdvance = useMemo(() => useGameStore.getState().canAdvancePhase(), [currentPhase, turnCount])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const combinableIds = useMemo(() => useGameStore.getState().getCombinableEvidenceIds(), [evidenceStates])

  // --- overlay states ---
  const [questionChoice, setQuestionChoice] = useState<{ type: QuestionType } | null>(null)
  const [evidenceChoice, setEvidenceChoice] = useState(false)
  const [freeQuestionOpen, setFreeQuestionOpen] = useState(false)
  const freeQuestionRef = useRef<HTMLInputElement>(null)
  const [advanceDismissed, setAdvanceDismissed] = useState(false)

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
    dispatch({
      type: 'question',
      questionType: questionChoice.type,
      target: pcTargetParty,
      disputeId,
    })
    setQuestionChoice(null)
  }, [dispatch, pcTargetParty, questionChoice])

  // --- Free question (slot 4) ---
  const openFreeQuestion = useCallback(() => {
    if (!caseData) return
    closeAll()
    setFreeQuestionOpen(true)
    setTimeout(() => freeQuestionRef.current?.focus(), 50)
  }, [caseData, closeAll])

  const submitFreeQuestion = useCallback((text: string) => {
    if (!text.trim()) return
    setFreeQuestionOpen(false)
    // 자유 질문은 pc:free-question 커스텀 이벤트로 전달 → PCActionsPanel이 처리
    window.dispatchEvent(new CustomEvent('pc:free-question', {
      detail: { question: text.trim(), target: pcTargetParty, disputeId: activeDisputeId },
    }))
  }, [pcTargetParty, activeDisputeId])

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
    const label = st?.deepInvestigated ? ev.name : (ev.surfaceName ?? ev.name)
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
      bodyParts.push('발견한 내용:')
      revealedFindings.forEach((f) => bodyParts.push(`• ${f}`))
      if (hiddenCount > 0) bodyParts.push(`(미확인 항목 ${hiddenCount}개)`)
    }
    const meta = ev.meta
    const metaTags: string[] = []
    if (meta?.trustLabel) metaTags.push(meta.trustLabel)
    if (meta?.sourceLabel) metaTags.push(meta.sourceLabel)

    openPcInteractionPanel({
      title: label,
      subtitle: TYPE_LABELS[ev.type] ?? '증거 파일',
      tone: 'gold',
      variant: 'evidence',
      evidenceId: ev.id,
      evidenceTypeLabel: TYPE_LABELS[ev.type] ?? '증거 파일',
      evidenceMetaTags: metaTags,
      body: bodyParts.join('\n'),
      actions: [{ kind: 'open_evidence' as const, label: '증거 열람', evidenceId: ev.id }],
    })
  }, [evidenceDefinitions, evidenceStates])

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
      title: '증인 소환',
      subtitle: '적절한 시점에 소환해야 핵심 증언을 들을 수 있습니다',
      tone: 'gold',
      variant: 'witness',
      body: '',
    })
  }, [caseData, hasWitness])

  // --- Special skill actions (B-6) ---
  const openSpecialAction = useCallback((action: string) => {
    if (action === 'separation') {
      openPcInteractionPanel({ title: '분리 심문', subtitle: '특수 행동', tone: 'gold', body: '당사자를 분리해 개별 심문합니다.', actions: [{ kind: 'run_special', label: '⚡-1 분리 심문 실행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'separation' }] })
    } else if (action === 'confidential') {
      openPcInteractionPanel({ title: '비공개 보호', subtitle: '특수 행동', tone: 'gold', body: '비공개를 약속해 방어 반응을 낮춥니다.', actions: [{ kind: 'run_special', label: '⚡-1 비공개 보호 실행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'confidential_protection' }] })
    } else if (action === 'immediate') {
      openPcInteractionPanel({ title: '즉답 요구', subtitle: '특수 행동', tone: 'gold', body: '선택한 쟁점에 대해 즉답을 요구합니다.', actions: [{ kind: 'run_special', label: '⚖️-1 즉답 요구 실행', party: pcTargetParty, disputeId: activeDisputeId, specialAction: 'immediate_answer' }] })
    }
  }, [activeDisputeId, pcTargetParty])

  // --- Advance phase banner (B-7) ---
  const handleAdvance = useCallback(() => {
    dispatch({ type: 'advance_phase' } as any)
    setAdvanceDismissed(true)
  }, [dispatch])

  // phase 변경 시 dismiss 리셋
  useEffect(() => { setAdvanceDismissed(false) }, [currentPhase])

  const advanceLabel = currentPhase === Phase.Interrogation
    ? '판결 단계로 진행'
    : currentPhase === GamePhase.Phase4_Evidence
      ? '최종 심문 단계로'
      : '다음 단계로 진행'

  // --- Keyboard shortcuts ---
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.target as HTMLElement)?.tagName === 'INPUT') return
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
  }, [closeAll, hasWitness, isLLMLoading, openEvidenceChoice, openFreeQuestion, openQuestionChoice, openWitnessPanel])

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
          <span className="pc-advance-banner__text">{advanceLabel}할 수 있습니다</span>
          <button className="pc-advance-banner__btn" onClick={handleAdvance} type="button">{advanceLabel}</button>
          <button className="pc-advance-banner__dismiss" onClick={() => setAdvanceDismissed(true)} title="닫기" type="button">
            <PCSvgIcon id="i-plus" size={12} />
          </button>
        </div>
      ) : null}

      {/* --- Question choice overlay (slots 1-3) --- */}
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

      {/* --- Free question overlay (slot 4) --- */}
      {freeQuestionOpen ? (
        <div className="pc-question-choice">
          <div className="pc-question-choice__backdrop" onClick={() => setFreeQuestionOpen(false)} />
          <div className="pc-question-choice__panel">
            <div className="pc-question-choice__header">
              <PCSvgIcon id="i-chat" size={18} />
              <span className="pc-question-choice__title">자유 질문</span>
              <button className="pc-question-choice__close" onClick={() => setFreeQuestionOpen(false)} type="button">
                <PCSvgIcon id="i-plus" size={14} />
              </button>
            </div>
            <div className="pc-question-choice__disputes">
              <p className="pc-question-choice__hint">질문을 직접 입력하세요</p>
              <form className="pc-free-question-form" onSubmit={(e) => {
                e.preventDefault()
                const input = freeQuestionRef.current
                if (input) submitFreeQuestion(input.value)
              }}>
                <input
                  ref={freeQuestionRef}
                  className="pc-free-question-input"
                  maxLength={200}
                  placeholder="예: 그 돈은 어디서 났습니까?"
                  type="text"
                />
                <button className="pc-free-question-submit" type="submit">질문하기</button>
              </form>
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
              <span className="pc-question-choice__title">증거 제시</span>
              <button className="pc-question-choice__close" onClick={() => setEvidenceChoice(false)} type="button">
                <PCSvgIcon id="i-plus" size={14} />
              </button>
            </div>
            <div className="pc-question-choice__disputes">
              {unlockedEvidence.length === 0 ? (
                <p className="pc-question-choice__hint">해금된 증거가 없습니다</p>
              ) : (
                <>
                  <p className="pc-question-choice__hint">제시할 증거를 선택하세요</p>
                  {unlockedEvidence.map((ev) => (
                    <button className={`pc-question-choice__dispute-btn${combinableIds.has(ev.id) ? ' is-combinable' : ''}`} key={ev.id} onClick={() => selectEvidence(ev.id)} type="button">
                      <span className="pc-question-choice__dispute-icon">
                        <PCSvgIcon id={getPcEvidenceSymbolId(ev.type)} size={14} />
                      </span>
                      <span className="pc-question-choice__dispute-name">{ev.surfaceName ?? ev.name}</span>
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
                <button className="hotbar-special-btn" onClick={() => openSpecialAction('separation')} title="분리 심문 (Q)" type="button">
                  <kbd>Q</kbd><PCSvgIcon id="i-hand" size={13} /><span>분리 심문</span>
                </button>
                <button className="hotbar-special-btn" onClick={() => openSpecialAction('confidential')} title="비공개 보호 (W)" type="button">
                  <kbd>W</kbd><PCSvgIcon id="i-shield" size={13} /><span>비공개 보호</span>
                </button>
                <button className="hotbar-special-btn" onClick={() => openSpecialAction('immediate')} title="즉답 요구 (E)" type="button">
                  <kbd>E</kbd><PCSvgIcon id="i-bolt" size={13} /><span>즉답 요구</span>
                </button>
              </div>
            </div>

            <div className={`hotbar-slots${isLLMLoading ? ' hotbar-slots--locked' : ''}`}>
              {/* 1: 사실 추궁 */}
              <button className="slot" data-guide-target="question-fact" disabled={isLLMLoading} onClick={() => openQuestionChoice('fact_pursuit')} title={isLLMLoading ? '응답 대기 중' : '모순에 집중하기'} type="button">
                <span className="slot-key">1</span>
                <span className="slot-ico"><PCSvgIcon id="i-gavel" size={24} /></span>
                <span className="slot-nm">사실 추궁</span>
                {contradiction >= 2 ? <span className="slot-eff ef-s" /> : null}
              </button>

              {/* 2: 동기 탐색 */}
              <button className="slot" data-guide-target="question-motive" disabled={isLLMLoading} onClick={() => openQuestionChoice('motive_search')} title={isLLMLoading ? '응답 대기 중' : '숨겨진 쟁점찾기'} type="button">
                <span className="slot-key">2</span>
                <span className="slot-ico"><PCSvgIcon id="i-eye" size={24} /></span>
                <span className="slot-nm">동기 탐색</span>
              </button>

              {/* 3: 공감 접근 */}
              <button className="slot" data-guide-target="question-empathy" disabled={isLLMLoading} onClick={() => openQuestionChoice('empathy_approach')} title={isLLMLoading ? '응답 대기 중' : '자백 유도하기'} type="button">
                <span className="slot-key">3</span>
                <span className="slot-ico"><PCSvgIcon id="i-heart" size={24} /></span>
                <span className="slot-nm">공감 접근</span>
              </button>

              {/* 4: 자유 질문 */}
              <button className="slot" disabled={isLLMLoading} onClick={openFreeQuestion} title={isLLMLoading ? '응답 대기 중' : '자유 질문'} type="button">
                <span className="slot-key">4</span>
                <span className="slot-ico"><PCSvgIcon id="i-chat" size={24} /></span>
                <span className="slot-nm">자유 질문</span>
              </button>

              {/* 5: 증거 제시 */}
              <button className="slot" data-guide-target="evidence-present" disabled={isLLMLoading} onClick={openEvidenceChoice} title={isLLMLoading ? '응답 대기 중' : '증거 제시'} type="button">
                <span className="slot-key">5</span>
                <span className="slot-ico"><PCSvgIcon id="i-doc" size={24} /></span>
                <span className="slot-nm">증거 제시</span>
              </button>

              {/* 6: 증인 소환 */}
              <button className={`slot${!hasWitness ? ' slot-locked' : ''}`} data-guide-target="witness-summon" disabled={!hasWitness || isLLMLoading} onClick={openWitnessPanel} title={isLLMLoading ? '응답 대기 중' : '증인 소환'} type="button">
                <span className="slot-key">6</span>
                <span className="slot-ico"><PCSvgIcon id="i-witness" size={24} /></span>
                <span className="slot-nm">증인 소환</span>
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
  // 감정 도넛 — 격앙/체념 단계는 펄스 애니메이션으로 위급 신호
  const isCritical = emotion === 'angry' || emotion === 'resigned'
  const safeValue = Math.max(0, Math.min(100, Math.round(emotionValue || 0)))
  return (
    <button className={`char char-${side}${isActive ? ' spk' : ''}`} data-character-card={side} onClick={onClick} type="button">
      <div className={`char-face char-face--ring is-emo-${emotion}${isCritical ? ' is-critical' : ''}`}>
        <EmotionDonut value={safeValue} />
        <PCCharacterPortrait
          alt={name}
          caseId={caseId}
          emotion={emotion}
          fallbackSymbolId={faceId}
          party={side}
          size={52}
        />
        <span className="char-face__value" aria-label={`감정 수치 ${safeValue}`}>{safeValue}</span>
      </div>
      <div className="char-info">
        <span className="char-nm">{name}</span>
        <span className={`char-emo ${emotion === 'angry' ? 'ce-sh' : 'ce-cf'}`}>{EMOTION_LABELS[emotion]}</span>
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

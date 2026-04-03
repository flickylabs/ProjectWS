import React, { useState, useRef, useCallback, useEffect } from 'react'
import type { PartyId, QuestionType, TrustActionType, SkillType } from '../../types'
import { GamePhase } from '../../types'
import { useGameStore } from '../../store/useGameStore'
import { useActionDispatch, isLLMMode, setNextConfidential, setNextEvasionReading } from '../../hooks/useActionDispatch'
import { processFreeQuestion } from '../../engine/llmFreeQuestion'
import { analyzeTestimony } from '../../engine/llmTestimonyAnalysis'
// 증인 소환은 EvidencePresenter 내부로 이동
import QuestionSelector from './QuestionSelector'
import type { QuestionToggles } from './QuestionSelector'
import EvidencePresenter from './EvidencePresenter'
import DossierCardPanel from './DossierCardPanel'
import { QuestionMeterHUD } from '../discovery/StateTransitionFeedback'
import type { FreeQuestionResult } from '../../engine/llmFreeQuestion'
import { getDossierCards } from '../../engine/v3GameLoopLoader'
import { evaluateDossierUnlock } from '../../engine/meterStagingV2'
import { showToast } from '../common/Toast'

import Emoji from '../common/Emoji'

type ActionTab = 'question' | 'evidence' | 'skill' | 'dossier' | null

const EMOTION_EMOJI: Record<string, string> = { defensive: '😐', confident: '😤', shaken: '😰', angry: '😡', resigned: '😞' }

/* ── Phase별 해금 설정 ─────────────────────── */

const PHASE_NUM: Record<string, number> = {
  [GamePhase.Phase3_Interrogation]: 3,
  [GamePhase.Phase4_Evidence]: 4,
  [GamePhase.Phase5_ReExamination]: 5,
}

function phaseAtLeast(current: GamePhase, required: GamePhase): boolean {
  return (PHASE_NUM[current] ?? 0) >= (PHASE_NUM[required] ?? 0)
}

/** 증거 탭 잠금 여부 — Phase 통합으로 Phase 3에서도 증거 사용 가능 */
function isEvidenceLocked(_phase: GamePhase): boolean {
  return false
}

/** 액티브 스킬별 해금 Phase */
const SKILL_UNLOCK: Record<string, GamePhase> = {
  obj: GamePhase.Phase3_Interrogation,  // 이의 제기: Phase 3~
  sep: GamePhase.Phase3_Interrogation,  // 분리 심문: Phase 3~
  imm: GamePhase.Phase4_Evidence,       // 즉답 요구: Phase 4~
}

/** 다음 단계 설명 */
function getAdvanceInfo(phase: GamePhase): { label: string; unlocks: string[] } {
  switch (phase) {
    case GamePhase.Phase3_Interrogation:
      return { label: '증거 심리로', unlocks: ['📄 증거 제시 해금', '⚡ 즉답 요구 해금', '🔍 회피 판독 토글 해금'] }
    case GamePhase.Phase4_Evidence:
      return { label: '최종 심문으로', unlocks: ['🔒 비공개 보호 토글 해금'] }
    case GamePhase.Phase5_ReExamination:
      return { label: '조정 단계로', unlocks: [] }
    default:
      return { label: '다음 단계로', unlocks: [] }
  }
}

export default function ActionPanel() {
  const [target, setTarget] = useState<PartyId | null>(null)
  const [activeTab, setActiveTab] = useState<ActionTab>(null)
  const [showAdvance, setShowAdvance] = useState(false)
  // 토글 스킬 상태
  const [confidentialOn, setConfidentialOn] = useState(false)
  const [evasionReadingOn, setEvasionReadingOn] = useState(false)

  // 새 증거 뱃지: 유저가 증거 탭에서 확인한 증거 ID 추적
  const seenEvidenceRef = useRef<Set<string>>(new Set())
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const unlockedIds = Object.keys(evidenceStates).filter(id => evidenceStates[id]?.unlocked)
  const newEvidenceCount = unlockedIds.filter(id => !seenEvidenceRef.current.has(id)).length

  // 증거 탭 열 때 현재 해금 증거를 모두 "본 것"으로 기록
  const markEvidenceSeen = useCallback(() => {
    unlockedIds.forEach(id => seenEvidenceRef.current.add(id))
  }, [unlockedIds])

  const dispatch = useActionDispatch()
  const caseData = useGameStore((s) => s.caseData)
  const currentPhase = useGameStore((s) => s.currentPhase)
  const canAdvance = useGameStore((s) => s.canAdvancePhase())
  const advancePhase = useGameStore((s) => s.advancePhase)
  const useSkill = useGameStore((s) => s.useSkill)
  const canUseSkill = useGameStore((s) => s.canUseSkill)
  const resources = useGameStore((s) => s.resources)
  const agentA = useGameStore((s) => s.agentA)
  const agentB = useGameStore((s) => s.agentB)
  const disputeBoardAction = useGameStore((s) => s.disputeBoardAction)

  // DisputeBoard에서 "~에게 질문" 선택 시 자동 라우팅
  useEffect(() => {
    if (disputeBoardAction) {
      setTarget(disputeBoardAction.party)
      setActiveTab('question')
      useGameStore.getState().setDisputeBoardAction(null)
    }
  }, [disputeBoardAction])

  if (!caseData) return null
  const disputes = caseData.disputes.map(d => ({ id: d.id, name: d.name }))
  const llm = isLLMMode()
  const evLocked = isEvidenceLocked(currentPhase)
  const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
  const turnCount = useGameStore((s) => s.turnCount)

  // 사건카드 조건 해금 (meterStagingV2 엔진 기반)
  const metersA = useGameStore((s) => s.questionMeters.a)
  const metersB = useGameStore((s) => s.questionMeters.b)
  const anyLieCracked = useGameStore((s) => {
    const checkAgent = (agent: { lieStateMap: Record<string, { currentState: string }> }) =>
      Object.values(agent.lieStateMap).some(e => e.currentState !== 'S0')
    return checkAgent(s.agentA) || checkAgent(s.agentB)
  })
  const dossierUnlockPrevRef = useRef(false)
  const dossierUnlockResult = evaluateDossierUnlock({
    turn: turnCount,
    alreadyUnlocked: dossierUnlockPrevRef.current,
    hasAnyCrack: anyLieCracked,
    highestContradictionTokens: Math.max(metersA.contradictionTokens, metersB.contradictionTokens),
    highestTrustWindow: Math.max(metersA.trustWindow, metersB.trustWindow),
  })
  if (dossierUnlockResult.newlyUnlocked) {
    dossierUnlockPrevRef.current = true
    showToast(dossierUnlockResult.label, 'success')
  }
  if (dossierUnlockResult.unlocked) dossierUnlockPrevRef.current = true
  const hasDossierCards = getDossierCards(caseKey).length > 0 && dossierUnlockResult.unlocked

  // ── 토글 스킬 해금 상태 ──
  const toggles: QuestionToggles = {
    evasionReading: {
      unlocked: phaseAtLeast(currentPhase, GamePhase.Phase4_Evidence),
      on: evasionReadingOn,
      affordable: resources.skillPoints >= 1,
    },
    confidential: {
      unlocked: phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination),
      on: confidentialOn,
    },
  }

  const handleToggle = (key: 'confidential' | 'evasionReading') => {
    if (key === 'confidential') setConfidentialOn(v => !v)
    if (key === 'evasionReading' && resources.skillPoints >= 1) setEvasionReadingOn(v => !v)
  }

  // ── 핸들러 ──
  const hQ = (qt: QuestionType, dId: string) => {
    if (!target) return

    // 토글 모디파이어 적용
    if (confidentialOn) {
      setNextConfidential(true)
      setConfidentialOn(false)
    }
    if (evasionReadingOn) {
      // 회피 판독 비용 소모
      const s = useGameStore.getState()
      s.spend('skillPoints', 1)
      setNextEvasionReading(target, dId)
      setEvasionReadingOn(false)
    }

    dispatch({ type: 'question', questionType: qt, target, disputeId: dId })
    setActiveTab(null)
  }

  const hFree = (r: FreeQuestionResult, ft: PartyId, text: string) => {
    const s = useGameStore.getState(); s.spend('investigationTokens', 1)
    s.addDialogue({ speaker: 'judge', text, relatedDisputes: r.disputeId ? [r.disputeId] : [], turn: s.turnCount })
    s.addDialogue({ speaker: ft, text: r.response, relatedDisputes: r.disputeId ? [r.disputeId] : [], turn: s.turnCount, behaviorHint: r.behaviorHint })
    if (r.questionType !== 'irrelevant' && r.disputeId) {
      s.trackMetric('freeQuestionsRelevant')
      const ts = ({ fact_pursuit: ['direct_question','timeline_question'], motive_search: ['motive_question','context_question'], empathy_approach: ['empathy_question','provenance_question'] } as Record<string,string[]>)[r.questionType] ?? ['direct_question']
      for (const t of ts) { if (s.transitionLie(ft, r.disputeId, t)) break }; s.changeEmotion(ft, 5)
      if (r.secondaryDisputeId) { for (const t of ts) { if (s.transitionLie(ft, r.secondaryDisputeId, t)) break }; s.addDialogue({ speaker: 'system', text: '🎯 다른 쟁점까지 흔들렸다!', relatedDisputes: [r.secondaryDisputeId], turn: s.turnCount }) }
    } else if (r.questionType === 'irrelevant') { s.addDialogue({ speaker: 'system', text: '💭 쟁점에서 벗어난 질문이다.', relatedDisputes: [], turn: s.turnCount }) }
    s.incrementTurn()
    setActiveTab(null)
  }
  const hEv = (id: string) => { if (target) { dispatch({ type: 'evidence_present', evidenceId: id, target }); setActiveTab(null) } }

  // 증거 대질: 증거 상태 업데이트 + 유저 질문으로 자유질문 1회 처리
  const hConfront = async (evidenceId: string, question: string) => {
    if (!target) return
    setActiveTab(null)

    const s = useGameStore.getState()
    const evDef = s.evidenceDefinitions.find(e => e.id === evidenceId)
    if (!evDef) return

    // 1. 증거 상태만 업데이트 (LLM 호출 없이)
    s.presentEvidence(evidenceId, target)
    const disputeNames = evDef.proves.map(dId => s.caseData?.disputes.find(d => d.id === dId)?.name ?? dId).join(', ')
    s.addDialogue({
      speaker: 'system',
      text: `📋 증거 제시: ${evDef.name} [${evDef.reliability === 'hard' ? 'Hard' : 'Soft'}] → "${disputeNames}"`,
      relatedDisputes: evDef.proves,
      turn: s.turnCount,
    })

    // 2. lie 전이 + 감정 변화
    for (const dId of evDef.proves) {
      s.transitionLie(target, dId, evDef.reliability === 'hard' ? 'hard_evidence' : 'soft_evidence')
    }
    s.changeEmotion(target, evDef.reliability === 'hard' ? 15 : 8)

    // 3. 유저의 대질 질문을 자유질문으로 처리 (LLM 1회만, 증거 맥락 포함)
    const prefixedQuestion = `[증거 "${evDef.name}"] ${question}`
    s.addDialogue({ speaker: 'judge', text: question, relatedDisputes: evDef.proves, turn: s.turnCount })

    const evCtx = {
      name: evDef.name,
      description: evDef.description,
      subjectParty: evDef.subjectParty,
      provenance: evDef.provenance,
      reliability: evDef.reliability,
    }

    s.setLLMLoading(true, target)
    try {
      const result = await processFreeQuestion(prefixedQuestion, target, s.agentA, s.agentB, caseData, undefined, evCtx)
      const fresh = useGameStore.getState()
      fresh.setLLMLoading(false)
      fresh.addDialogue({ speaker: target, text: result.response, relatedDisputes: result.disputeId ? [result.disputeId] : [], turn: fresh.turnCount, behaviorHint: result.behaviorHint })

      if (result.questionType !== 'irrelevant' && result.disputeId) {
        fresh.trackMetric('freeQuestionsRelevant')
        const ts = ({ fact_pursuit: ['direct_question','timeline_question'], motive_search: ['motive_question','context_question'], empathy_approach: ['empathy_question','provenance_question'] } as Record<string,string[]>)[result.questionType] ?? ['direct_question']
        for (const t of ts) { if (fresh.transitionLie(target, result.disputeId, t)) break }
      }
      fresh.incrementTurn()
    } catch {
      useGameStore.getState().setLLMLoading(false)
    }
  }

  const hObj = () => {
    if (!target || resources.skillPoints < 1) return; const s = useGameStore.getState()
    s.addDialogue({ speaker: 'judge', text: '이의 있습니다!', relatedDisputes: [], turn: s.turnCount })
    s.changeEmotion(target, 12); for (const d of caseData.disputes) s.transitionLie(target, d.id, 'direct_question')
    s.addDialogue({ speaker: 'system', text: `⚡ ${target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name}에게 강한 압박!`, relatedDisputes: [], turn: s.turnCount })
    s.spend('skillPoints', 1); s.incrementTurn(); setActiveTab(null)
  }
  const hSkill = (st: SkillType, dId?: string) => {
    if (!target || !useSkill(st)) return; const s = useGameStore.getState()
    switch (st) {
      case 'immediate_answer': if (dId) { const a = target === 'a' ? s.agentA : s.agentB; const e = a.lieStateMap[dId]; if (e) useGameStore.setState({ [target === 'a' ? 'agentA' : 'agentB']: { ...a, lieStateMap: { ...a.lieStateMap, [dId]: { ...e, currentState: 'S5' as const } } } }); s.addDialogue({ speaker: 'judge', text: '즉답 요구', relatedDisputes: [dId], turn: s.turnCount }); dispatch({ type: 'question', questionType: 'fact_pursuit', target, disputeId: dId }) } break
      // statement_comparison 제거됨 (GDD v3.0에 없는 스킬)
    }
    s.incrementTurn(); setActiveTab(null)
  }
  const hTrust = (at: TrustActionType) => { if (target) { dispatch({ type: 'trust_action', actionType: at, target }); setActiveTab(null) } }
  const hAdv = () => { const n: Record<string,GamePhase> = { [GamePhase.Phase3_Interrogation]: GamePhase.Phase4_Evidence, [GamePhase.Phase4_Evidence]: GamePhase.Phase5_ReExamination, [GamePhase.Phase5_ReExamination]: GamePhase.Phase6_Mediation }; const x = n[currentPhase]; if (x) advancePhase(x) }

  const hasToast = activeTab && target
  const hasAdvanceConfirm = showAdvance
  const advInfo = getAdvanceInfo(currentPhase)

  // 탭 콘텐츠 색조
  const TINT_STYLE: Record<string, { border: string; glow: string }> = {
    question: { border: 'border-blue-500/20', glow: 'shadow-blue-500/10' },
    evidence: { border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
    skill:    { border: 'border-purple-500/20', glow: 'shadow-purple-500/10' },
    dossier:  { border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
  }

  const handleTabClick = (tab: ActionTab) => {
    if (tab === 'evidence' && evLocked) return
    if (tab === 'evidence' && activeTab !== 'evidence') markEvidenceSeen()
    setActiveTab(activeTab === tab ? null : tab)
    setShowAdvance(false)
  }

  return (
    <div className="relative">
      {/* 슬라이드업 콘텐츠 패널 — 독 위에 앵커 */}
      {(hasToast || (hasAdvanceConfirm && !hasToast)) && (
        <div className="absolute bottom-full left-0 right-0 mb-0.5 z-40">
          {(() => { const t = TINT_STYLE[activeTab!] ?? { border: 'border-gray-700/30', glow: 'shadow-black/20' }; return (
          <div className={`glass-surface ${t.border} border rounded-t-2xl max-h-[50vh] overflow-y-auto animate-slide-up shadow-lg ${t.glow} inner-glow-subtle`}>
            {/* 드래그 힌트 + 닫기 */}
            <div className="flex justify-center pt-2.5 pb-1">
              <button onClick={() => setActiveTab(null)} className="w-10 h-1 rounded-full bg-gray-600/80 hover:bg-gray-400 transition-colors" />
            </div>

            {hasToast && activeTab === 'question' && (
              <div className="p-2">
                <QuestionSelector target={target!} onSelect={hQ} llmMode={llm} onFreeResult={hFree}
                  toggles={toggles} onToggle={handleToggle} />
              </div>
            )}
            {hasToast && activeTab === 'dossier' && (
              <div className="p-2">
                <DossierCardPanel
                  target={target!}
                  onQuestionAsked={() => setActiveTab(null)}
                  onDispatchEvidence={(evId, t) => {
                    dispatch({ type: 'evidence_present', evidenceId: evId, target: t })
                  }}
                />
              </div>
            )}
            {hasToast && activeTab === 'evidence' && (
              <div className="p-2">
                <EvidencePresenter target={target!} onPresent={hEv} onConfront={hConfront}
                  onWitnessCalled={() => setActiveTab(null)} llmMode={llm}
                  newEvidenceIds={new Set(unlockedIds.filter(id => !seenEvidenceRef.current.has(id)))} />
              </div>
            )}
            {hasToast && activeTab === 'skill' && (
              <div className="p-2">
                <SkillPanel target={target!} disputes={disputes} resources={resources} canUseSkill={canUseSkill}
                  onObj={hObj} onSkill={hSkill} onTrust={hTrust} currentPhase={currentPhase} onClose={() => setActiveTab(null)} />
              </div>
            )}
            {hasAdvanceConfirm && !hasToast && (
              <div className="p-3">
                <p className="text-xs text-amber-400 mb-1 font-semibold">{advInfo.label}</p>
                {advInfo.unlocks.length > 0 && (
                  <div className="mb-1.5 space-y-0.5">
                    {advInfo.unlocks.map((u, i) => (
                      <p key={i} className="text-[10px] text-emerald-400/80">{u}</p>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button onClick={() => setShowAdvance(false)} className="flex-1 text-xs py-1 rounded-lg bg-gray-800 text-gray-400">취소</button>
                  <button onClick={() => { setShowAdvance(false); hAdv() }} className="flex-1 text-xs py-1 rounded-lg bg-amber-600 text-gray-950 font-bold">확인</button>
                </div>
              </div>
            )}
          </div>
          ) })()}
        </div>
      )}

      {/* ActionDock: 1행 pill 타겟 + 인라인 미터 + 2행 탭 */}

      {/* 1행: pill 타겟 세그먼트 + 인라인 미터 */}
      <div className="flex items-center gap-2 h-9">
        {/* pill 세그먼트 컨트롤 */}
        <div className="flex bg-white/[0.03] rounded-xl p-0.5 ring-1 ring-white/5 shrink-0">
          <button onClick={() => setTarget('a')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all active:scale-95 ${
              target === 'a' ? 'bg-blue-600/90 text-white shadow-md shadow-blue-500/20 glow-blue' : 'text-blue-400/60 hover:text-blue-300 hover:bg-white/5'
            }`}>
            <Emoji char={EMOTION_EMOJI[agentA.emotionalState.phase] ?? '😐'} size={16} />
            <span>{caseData.duo.partyA.name}</span>
          </button>
          <button onClick={() => setTarget('b')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all active:scale-95 ${
              target === 'b' ? 'bg-rose-600/90 text-white shadow-md shadow-rose-500/20 glow-rose' : 'text-rose-400/60 hover:text-rose-300 hover:bg-white/5'
            }`}>
            <Emoji char={EMOTION_EMOJI[agentB.emotionalState.phase] ?? '😐'} size={16} />
            <span>{caseData.duo.partyB.name}</span>
          </button>
        </div>

        {/* 인라인 미터 바 */}
        {target && (
          <div className="flex-1 min-w-0">
            <QuestionMeterHUD party={target} />
          </div>
        )}

        {/* 단계 진행 버튼 */}
        {canAdvance && !showAdvance && (
          <button onClick={() => { setActiveTab(null); setShowAdvance(true) }}
            className="shrink-0 text-[10px] px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 font-semibold active:scale-95 glow-emerald transition-all hover:bg-emerald-500/15">
            {advInfo.label} →
          </button>
        )}
      </div>

      {/* 2행: 탭 버튼 */}
      <div className="flex gap-1.5 mt-1.5 h-9">
        <button onClick={() => handleTabClick('question')}
          className={`flex-1 text-xs rounded-xl font-semibold active:scale-95 transition-all ${
            activeTab === 'question'
              ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25 glow-amber'
              : 'bg-white/[0.03] text-gray-400 ring-1 ring-white/5 hover:text-gray-200 hover:ring-white/10'
          }`}>
          <Emoji char="❓" size={13} /> 심문
        </button>
        {hasDossierCards && (
          <button onClick={() => handleTabClick('dossier')}
            className={`flex-1 text-xs rounded-xl font-semibold active:scale-95 transition-all ${
              activeTab === 'dossier'
                ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25 glow-amber'
                : 'bg-white/[0.03] text-amber-500/60 ring-1 ring-white/5 hover:text-amber-400 hover:ring-white/10'
            }`}>
            <Emoji char="📋" size={13} /> 카드
          </button>
        )}
        <button onClick={() => handleTabClick('evidence')}
          className={`flex-1 text-xs rounded-xl font-semibold relative transition-all ${
            evLocked ? 'bg-gray-900/40 text-gray-600 cursor-not-allowed ring-1 ring-gray-800/30'
              : activeTab === 'evidence'
                ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25 glow-amber active:scale-95'
                : 'bg-white/[0.03] text-gray-400 ring-1 ring-white/5 hover:text-gray-200 hover:ring-white/10 active:scale-95'
          }`}>
          {evLocked ? <><Emoji char="🔒" size={13} /> 증거</> : <><Emoji char="📄" size={13} /> 증거</>}
          {!evLocked && newEvidenceCount > 0 && activeTab !== 'evidence' && (
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-gray-900 shadow-sm shadow-red-500/30">
              N
            </span>
          )}
        </button>
        <button onClick={() => handleTabClick('skill')}
          className={`flex-1 text-xs rounded-xl font-semibold active:scale-95 transition-all ${
            activeTab === 'skill'
              ? 'bg-purple-500/15 text-purple-400 ring-1 ring-purple-500/25 shadow-sm shadow-purple-500/10'
              : 'bg-white/[0.03] text-gray-400 ring-1 ring-white/5 hover:text-gray-200 hover:ring-white/10'
          }`}>
          <Emoji char="⚡" size={13} /> 스킬
        </button>
      </div>
    </div>
  )
}

/* ── 액티브 스킬 패널 (이의 제기 / 분리 심문 / 즉답 요구) ── */

function SkillPanel({ target, disputes, resources, canUseSkill, onObj, onSkill, onTrust, currentPhase, onClose }: {
  target: PartyId; disputes: {id:string;name:string}[]; resources: any; canUseSkill: (s:SkillType)=>boolean
  onObj: ()=>void; onSkill: (s:SkillType,d?:string)=>void; onTrust: (a:TrustActionType)=>void; currentPhase: GamePhase
  onClose?: ()=>void
}) {
  const [exp, setExp] = useState<string|null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const items = [
    { id:'obj', label:'이의 제기', icon:'❗', desc:'전체 쟁점 압박', cost:'⚡1', type:'obj' as const, nd:false },
    { id:'sep', label:'분리 심문', icon:'🚪', desc:'3턴간 1:1 환경', cost:'🔍1', type:'trust' as const, tt:'separation' as TrustActionType, nd:false },
    { id:'imm', label:'즉답 요구', icon:'⚡', desc:'특정 쟁점 즉시 붕괴', cost:'⚡1', type:'skill' as const, st:'immediate_answer' as SkillType, nd:true },
  ]

  const isPhase5 = phaseAtLeast(currentPhase, GamePhase.Phase5_ReExamination)
  const llm = isLLMMode()

  const handleAnalyze = async () => {
    setAnalyzing(true)
    const s = useGameStore.getState()
    if (!s.caseData) { setAnalyzing(false); return }

    try {
      const result = await analyzeTestimony(s.dialogueLog, s.caseData)
      const fresh = useGameStore.getState()
      fresh.setTestimonyAnalysis(result)
      fresh.spend('investigationTokens', 1)
      fresh.addDialogue({
        speaker: 'system',
        text: '📋 진술 분석 완료 — 탭해서 확인하자.',
        relatedDisputes: [],
        turn: fresh.turnCount,
      })
    } catch {
      useGameStore.getState().addDialogue({
        speaker: 'system', text: '📋 진술 분석에 실패했습니다.', relatedDisputes: [], turn: useGameStore.getState().turnCount,
      })
    }
    setAnalyzing(false)
    onClose?.()
  }

  return (
    <div className="space-y-1.5">
      {items.map(it => {
        const unlockPhase = SKILL_UNLOCK[it.id]
        const unlocked = unlockPhase ? phaseAtLeast(currentPhase, unlockPhase) : true
        const ok = unlocked && (it.type==='obj' ? resources.skillPoints>=1 : it.type==='skill'&&it.st ? canUseSkill(it.st) : true)

        return (<div key={it.id}>
          <button onClick={() => { if(!ok)return; if(it.nd){setExp(exp===it.id?null:it.id)} else if(it.type==='obj')onObj(); else if(it.type==='skill'&&it.st)onSkill(it.st); else if(it.type==='trust'&&it.tt)onTrust(it.tt) }}
            disabled={!ok} className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg border ${
              !unlocked ? 'border-gray-800/20 bg-gray-900/20 text-gray-700 opacity-40'
              : ok ? 'border-gray-700 bg-gray-800/60 hover:border-amber-600 text-gray-300'
              : 'border-gray-800/30 bg-gray-900/30 text-gray-600 opacity-50'
            }`}>
            <span className="text-base">{unlocked ? it.icon : '🔒'}</span>
            <div className="flex-1">
              <div className="text-xs font-semibold">{it.label}</div>
              <div className="text-xs text-gray-500">
                {unlocked ? it.desc : '증거 심리 단계에서 해금'}
              </div>
            </div>
            {unlocked && <span className="text-xs text-gray-500">{it.cost}</span>}
          </button>
          {exp===it.id&&it.nd&&unlocked&&(<div className="flex flex-wrap gap-1 mt-1 ml-8">{disputes.map(d=>(<button key={d.id} onClick={()=>{if(it.st)onSkill(it.st,d.id);setExp(null)}} className="text-xs px-2 py-0.5 rounded bg-gray-700 hover:bg-amber-700 text-gray-300 hover:text-white">{d.name}</button>))}</div>)}
        </div>)
      })}

      {/* Phase 5 전용: AI 진술 분석 */}
      {isPhase5 && llm && (
        <button
          onClick={handleAnalyze}
          disabled={analyzing || resources.investigationTokens < 1}
          className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg border ${
            analyzing ? 'border-cyan-800/30 bg-cyan-950/30 text-cyan-400'
            : resources.investigationTokens >= 1 ? 'border-cyan-700/40 bg-cyan-950/20 hover:border-cyan-500 text-cyan-300'
            : 'border-gray-800/30 bg-gray-900/30 text-gray-600 opacity-50'
          }`}
        >
          <span className="text-base">{analyzing ? '⏳' : '📋'}</span>
          <div className="flex-1">
            <div className="text-xs font-semibold">{analyzing ? 'AI 분석 중...' : '진술 분석'}</div>
            <div className="text-xs text-gray-500">AI가 전체 진술을 정리 · 모순 탐지</div>
          </div>
          <span className="text-xs text-gray-500">🔍1</span>
        </button>
      )}
    </div>
  )
}

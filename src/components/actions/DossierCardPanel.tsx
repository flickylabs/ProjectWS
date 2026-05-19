/**
 * DossierCard 패널 — 증거 묶음 카드로 질문하기
 * ─────────────────────────────────
 * DossierCard를 선택하면 대상 파티에 대한 challenge 질문 목록이 표시된다.
 * 질문 성공 시: 벡터 봉쇄 + atom 해금 + lie 전이 처리.
 */

import { useState } from 'react'
import { useGameStore, useStore } from '../../store/useGameStore'
import type { EvidenceNode, PartyId } from '../../types'
import type { DossierCard, DossierChallengeQuestion } from '../../types'
import {
  getDossierCards,
  getAvailableDossierQuestions,
  getLockedDossierQuestions,
  resolveDossierQuestion,
} from '../../engine/v3GameLoopLoader'
import type { LieState } from '../../types'
import { resolveInvestigation } from '../../engine/evidenceChallengeEngine'
import type { UnsafeAny } from '../../types/lint'


interface Props {
  target: PartyId
  onQuestionAsked: () => void
  /** 사건카드 질문 후 NPC 응답을 위한 dispatch (disputeId, target, questionText) */
  onDispatchDossier?: (disputeId: string, target: PartyId, questionText: string) => void
}

const DOSSIER_SURFACE_LABELS: Record<string, Record<string, string>> = {
  'spouse-01': {
    'dc-1': '방문 동선 카드',
    'dc-2': '숨긴 사정 카드',
    'dc-3': '공동 적금 권한 카드',
    'dc-4': '개인 계좌 이동 카드',
    'dc-5': '숨김과 금전 이동 순서 카드',
  },
  'family-01': {
    'dc-1': '말년의 종이',
    'dc-2': '유서 변경 방향',
    'dc-3': '장기 지원 흐름',
    'dc-4': '민감한 가족 사정',
    'dc-5': '어머니의 뜻',
  },
  'friend-01': {
    'dc-1': '반복 연락의 겉면',
    'dc-2': '선후관계 확인',
    'dc-3': '반복된 부탁 흐름',
    'dc-4': '과거 손절의 빈칸',
    'dc-5': '공개 발언의 순서',
  },
}

function getEvidenceDisplay(evidence: EvidenceNode, state?: { deepInvestigated?: boolean }) {
  return {
    name: state?.deepInvestigated ? evidence.name : (evidence.surfaceName ?? evidence.name),
    description: state?.deepInvestigated ? evidence.description : (evidence.surfaceDescription ?? evidence.description),
  }
}

function getDossierSurfaceLabel(caseKey: string, card: DossierCard) {
  return DOSSIER_SURFACE_LABELS[caseKey]?.[card.id] ?? card.name
}

export default function DossierCardPanel({ target, onQuestionAsked, onDispatchDossier }: Props) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const caseData = useStore(s => s.caseData)
  const lieConfigA = useStore(s => s.lieConfigsA)
  const lieConfigB = useStore(s => s.lieConfigsB)
  if (!caseData) return null

  const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
  const cards = getDossierCards(caseKey)

  // 대상 파티의 dispute별 현재 lieState 맵 구성
  const lieConfig = target === 'a' ? lieConfigA : lieConfigB
  const lieStates: Record<string, LieState> = {}
  if (lieConfig) {
    for (const [dId, cfg] of Object.entries(lieConfig)) {
      lieStates[dId] = (cfg as UnsafeAny).currentState ?? 'S0'
    }
  }

  if (cards.length === 0) return null

  const partyName = target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 px-1">사건카드 — 증거 묶음으로 핵심 질문</div>

      {/* 카드 목록 */}
      <div className="flex gap-1.5">
        {cards.map(card => {
          const available = getAvailableDossierQuestions(caseKey, card.id, target, lieStates)
          const locked = getLockedDossierQuestions(caseKey, card.id, target, lieStates)
          const exhausted = available.length === 0 && locked.length === 0
          const dossierLabel = getDossierSurfaceLabel(caseKey, card)
          return (
            <button
              key={card.id}
              onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              disabled={exhausted}
              className={`flex-1 px-2 py-2 rounded-lg border text-left transition-all ${
                exhausted
                  ? 'border-gray-800/30 bg-gray-900/30 text-gray-600 opacity-40'
                  : selectedCard === card.id
                    ? 'border-amber-500/60 bg-amber-950/30 text-amber-400'
                    : 'border-gray-700/40 bg-gray-800/40 text-gray-300 hover:border-amber-600/40'
              }`}
            >
              <div className="text-xs font-semibold">{dossierLabel}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{card.description}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] text-gray-600">
                  {card.evidenceIds.map(id => `e${id.replace('e-', '')}`).join('+')}
                </span>
                {!exhausted && (
                  <span className="text-[9px] text-amber-500/60 ml-auto">
                    {available.length}질문{locked.length > 0 ? ` +🔒${locked.length}` : ''}
                  </span>
                )}
                {exhausted && (
                  <span className="text-[9px] text-gray-600 ml-auto">완료</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* 선택된 카드의 질문 목록 */}
      {selectedCard && (
        <DossierQuestionList
          caseKey={caseKey}
          dossierId={selectedCard}
          target={target}
          partyName={partyName}
          lieStates={lieStates}
          onQuestionAsked={onQuestionAsked}
          onDispatchDossier={onDispatchDossier}
        />
      )}
    </div>
  )
}

function DossierQuestionList({ caseKey, dossierId, target, partyName, lieStates, onQuestionAsked, onDispatchDossier }: {
  caseKey: string
  dossierId: string
  target: PartyId
  partyName: string
  lieStates: Record<string, LieState>
  onQuestionAsked: () => void
  onDispatchDossier?: (evidenceId: string, target: PartyId, context: string) => void
}) {
  const questions = getAvailableDossierQuestions(caseKey, dossierId, target, lieStates)
  const lockedQuestions = getLockedDossierQuestions(caseKey, dossierId, target, lieStates)

  const handleAsk = (question: DossierChallengeQuestion) => {
    const store = useGameStore.getState()

    // 1. DossierQuestion 해결 (atom 해금 + 사용 기록)
    const result = resolveDossierQuestion(caseKey, question.id)
    if (!result) return

    // 2. EvidenceChallenge 벡터 봉쇄 적용
    // dossier question 성공은 해당 증거의 벡터를 직접 봉쇄
    const card = getDossierCards(caseKey).find(c => c.id === dossierId)
    if (card) {
      for (const evId of card.evidenceIds) {
        resolveInvestigation(caseKey, evId, 'verify_source', 'trustworthy')
      }
    }

    // 3. 재판관 질문 대화 추가
    store.addDialogue({
      speaker: 'judge',
      text: question.text,
      relatedDisputes: card?.relatedDisputes ?? [],
      turn: store.turnCount,
    })

    // 4. lieAdvance 처리
    if (result.lieAdvance) {
      const disputes = card?.relatedDisputes ?? []
      for (const dId of disputes) {
        store.transitionLie(target, dId, 'dossier_challenge')
      }
    }

    // 5. 해금된 atom 알림
    if (result.revealedAtom) {
      store.addDialogue({
        speaker: 'system',
        text: `💡 새로운 사실이 해금되었습니다. 증거 게시판을 확인하십시오.`,
        relatedDisputes: card?.relatedDisputes ?? [],
        turn: store.turnCount,
      })
    }

    // 6. 감정 변화
    store.changeEmotion(target, 10)

    // 7. LLM NPC 응답 트리거 — 사건카드 질문 텍스트 + 증거 맥락과 함께 dispatch
    if (onDispatchDossier && card) {
      const disputeId = card.relatedDisputes[0] ?? ''
      if (disputeId) {
        const dossierLabel = getDossierSurfaceLabel(caseKey, card)
        // 증거 상세 정보 수집
        const evidenceDetails = card.evidenceIds.map(evId => {
          const ev = store.evidenceDefinitions.find(e => e.id === evId)
          if (!ev) return ''
          const display = getEvidenceDisplay(ev, store.evidenceStates[evId])
          return `[${display.name}] ${display.description}`
        }).filter(Boolean).join('\n')

        const dossierContext = {
          questionId: question.id,
          questionText: question.text,
          cardName: dossierLabel,
          cardDescription: card.description,
          attackVector: question.attackVector,
          evidenceDetails,
          relatedDisputes: card.relatedDisputes,
        }
        onDispatchDossier(disputeId, target, JSON.stringify(dossierContext))
      }
    }

    onQuestionAsked()
  }

  const vectorLabels: Record<string, string> = {
    authenticity: '진위',
    context: '맥락',
    legality: '적법성',
    identity: '신원',
  }

  return (
    <div className="space-y-1 animate-fade-in">
      <div className="text-[10px] text-amber-400/60 px-1">{partyName}에게 질문</div>
      {questions.map(q => (
        <button
          key={q.id}
          onClick={() => handleAsk(q)}
          className="w-full text-left px-3 py-2 rounded-lg border border-gray-700/40 bg-gray-800/30 hover:border-amber-600/50 hover:bg-amber-950/20 transition-all"
        >
          <div className="text-[11px] text-gray-300 leading-tight">{q.text}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[9px] px-1 py-0.5 rounded ${
              q.attackVector === 'authenticity' ? 'bg-red-900/30 text-red-400/70' :
              q.attackVector === 'context' ? 'bg-blue-900/30 text-blue-400/70' :
              q.attackVector === 'legality' ? 'bg-purple-900/30 text-purple-400/70' :
              'bg-emerald-900/30 text-emerald-400/70'
            }`}>
              {vectorLabels[q.attackVector] ?? q.attackVector} 공격
            </span>
            {q.onSuccess.lieAdvance && (
              <span className="text-[9px] text-orange-400/60">상태 진행</span>
            )}
            {q.onSuccess.revealAtom && (
              <span className="text-[9px] text-cyan-400/60">사실 해금</span>
            )}
          </div>
        </button>
      ))}
      {lockedQuestions.map(q => (
        <div
          key={q.id}
          className="w-full text-left px-3 py-2 rounded-lg border border-gray-800/30 bg-gray-900/30 opacity-50 cursor-not-allowed"
        >
          <div className="text-[11px] text-gray-500 leading-tight flex items-center gap-1.5">
            <span className="text-amber-600/50">&#128274;</span>
            {q.lockedHint || '심문을 더 진행하면 새로운 질문이 열립니다'}
          </div>
        </div>
      ))}
    </div>
  )
}

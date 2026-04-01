/**
 * DossierCard 패널 — 증거 묶음 카드로 질문하기
 * ─────────────────────────────────
 * DossierCard를 선택하면 대상 파티에 대한 challenge 질문 목록이 표시된다.
 * 질문 성공 시: 벡터 봉쇄 + atom 해금 + lie 전이 처리.
 */

import { useState } from 'react'
import { useGameStore } from '../../store/useGameStore'
import type { PartyId } from '../../types'
import type { DossierCard, DossierChallengeQuestion } from '../../types'
import {
  getDossierCards,
  getAvailableDossierQuestions,
  resolveDossierQuestion,
} from '../../engine/v3GameLoopLoader'
import { resolveInvestigation } from '../../engine/evidenceChallengeEngine'

interface Props {
  target: PartyId
  onQuestionAsked: () => void
  /** evidence_present 디스패치 함수 — LLM NPC 응답을 받기 위함 */
  onDispatchEvidence?: (evidenceId: string, target: PartyId) => void
}

export default function DossierCardPanel({ target, onQuestionAsked, onDispatchEvidence }: Props) {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const caseData = useGameStore(s => s.caseData)
  if (!caseData) return null

  const caseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
  const cards = getDossierCards(caseKey)

  if (cards.length === 0) return null

  const partyName = target === 'a' ? caseData.duo.partyA.name : caseData.duo.partyB.name

  return (
    <div className="space-y-2">
      <div className="text-[10px] text-gray-500 px-1">도시에 카드 — 증거 묶음으로 핵심 질문</div>

      {/* 카드 목록 */}
      <div className="flex gap-1.5">
        {cards.map(card => {
          const available = getAvailableDossierQuestions(caseKey, card.id, target)
          const exhausted = available.length === 0
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
              <div className="text-xs font-semibold">{card.name}</div>
              <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{card.description}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] text-gray-600">
                  {card.evidenceIds.map(id => `e${id.replace('e-', '')}`).join('+')}
                </span>
                {!exhausted && (
                  <span className="text-[9px] text-amber-500/60 ml-auto">{available.length}질문</span>
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
          onQuestionAsked={onQuestionAsked}
          onDispatchEvidence={onDispatchEvidence}
        />
      )}
    </div>
  )
}

function DossierQuestionList({ caseKey, dossierId, target, partyName, onQuestionAsked, onDispatchEvidence }: {
  caseKey: string
  dossierId: string
  target: PartyId
  partyName: string
  onQuestionAsked: () => void
  onDispatchEvidence?: (evidenceId: string, target: PartyId) => void
}) {
  const questions = getAvailableDossierQuestions(caseKey, dossierId, target)

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
        text: `💡 새로운 사실 해금: ${result.revealedAtom.factText}`,
        relatedDisputes: card?.relatedDisputes ?? [],
        turn: store.turnCount,
      })
    }

    // 6. 감정 변화
    store.changeEmotion(target, 10)

    // 7. LLM NPC 응답 트리거 — evidence_present로 디스패치
    if (onDispatchEvidence && card) {
      onDispatchEvidence(card.evidenceIds[0], target)
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
    </div>
  )
}

/**
 * DossierHint — 사건카드 자동 실행 배너
 * ─────────────────────────────────
 * 카드 질문이 가능할 때 배너로 알림.
 * 클릭 시 카드명 + 증거 정보만 표시 (질문 텍스트는 스포일러 방지로 숨김).
 * "자동 실행" 버튼으로 원클릭 발동.
 *
 * 위치: ActionPanel 탭 바 바로 위 (일반 flow 내 배치)
 */

import { useState, useMemo } from 'react'
import type { EvidenceNode, PartyId, LieState } from '../../types'
import { useStore } from '../../store/useGameStore'
import {
  getDossierCards,
  getAvailableDossierQuestions,
} from '../../engine/v3GameLoopLoader'
import Emoji from '../common/Emoji'

interface Props {
  target: PartyId | null
  caseKey: string
  hasDossierCards: boolean
  onAutoExecute: (cardId: string, questionId: string, target: PartyId) => void
  disabled: boolean
  /** 사용 완료 마킹 후 리렌더 트리거용 버전 카운터 */
  usageVersion?: number
  /** 자동 시연 단계 (0=없음, 3=배너 하이라이트, 4=팝업 자동 열기) */
  showcaseStep?: number
}

/** 이미 자동실행한 조합 추적 */
const usedCombinations = new Set<string>()

export function resetDossierHintUsed() {
  usedCombinations.clear()
}

/** 외부에서 사용 완료 마킹 */
export function markDossierCombinationUsed(cardId: string, questionId: string) {
  usedCombinations.add(`${cardId}:${questionId}`)
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

function getDossierSurfaceLabel(caseKey: string, card: { id: string; name: string }) {
  return DOSSIER_SURFACE_LABELS[caseKey]?.[card.id] ?? card.name
}

export default function DossierHint({ target, caseKey, hasDossierCards, onAutoExecute, disabled, usageVersion = 0, showcaseStep = 0 }: Props) {
  const [popupOpen, setPopupOpen] = useState(false)

  // lie state 맵 구성
  const lieConfigA = useStore(s => s.lieConfigsA)
  const lieConfigB = useStore(s => s.lieConfigsB)

  const lieStates: Record<string, LieState> = useMemo(() => {
    const config = target === 'a' ? lieConfigA : target === 'b' ? lieConfigB : null
    const result: Record<string, LieState> = {}
    if (config) {
      for (const [dId, cfg] of Object.entries(config)) {
        result[dId] = (cfg as any).currentState ?? 'S0'
      }
    }
    return result
  }, [target, lieConfigA, lieConfigB])

  // 증거 정의 (카드별 증거 이름 표시용)
  const evidenceDefs = useStore(s => s.evidenceDefinitions)
  const evidenceStates = useStore(s => s.evidenceStates)

  // 현재 타겟에 대해 사용 가능한 첫 번째 카드+질문 찾기
  const match = useMemo(() => {
    if (!target || !hasDossierCards || !caseKey) return null

    const cards = getDossierCards(caseKey)
    for (const card of cards) {
      const available = getAvailableDossierQuestions(caseKey, card.id, target, lieStates)
      for (const q of available) {
        const comboKey = `${card.id}:${q.id}`
        if (!usedCombinations.has(comboKey)) {
          return { card, question: q }
        }
      }
    }
    return null
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, hasDossierCards, caseKey, lieStates, usageVersion])

  // showcaseStep === 4 → 팝업 자동 열기
  const shouldForcePopup = showcaseStep >= 4 && !disabled
  const effectivePopupOpen = popupOpen || shouldForcePopup

  // 사용 가능한 카드+질문이 없으면 완전히 숨김
  if (!match || !target) return null

  const { card, question } = match
  const dossierLabel = getDossierSurfaceLabel(caseKey, card)

  const evidenceLabel = card.evidenceIds
    .map(id => {
      const ev = evidenceDefs.find(e => e.id === id)
      return ev ? getEvidenceDisplay(ev, evidenceStates[id]).name : `e${id.replace('e-', '')}`
    })
    .join(' + ')

  const evidenceShort = card.evidenceIds
    .map(id => `e${id.replace('e-', '')}`)
    .join('+')

  const handleClick = () => {
    if (disabled) return
    setPopupOpen(!popupOpen)
  }

  const handleExecute = () => {
    if (disabled || !target) return
    const comboKey = `${card.id}:${question.id}`
    usedCombinations.add(comboKey)
    setPopupOpen(false)
    onAutoExecute(card.id, question.id, target)
  }

  return (
    <div className="w-full relative">
      {/* 팝업 (배너 위로 표시) — relative 부모 내에서 bottom-full 사용 */}
      {effectivePopupOpen && (
        <div className="absolute left-0 right-0 bottom-full mb-1.5 rounded-xl border border-amber-500/30 bg-gray-900/95 backdrop-blur-sm shadow-xl shadow-black/40 animate-fade-in overflow-hidden z-50">
          <div className="p-3 space-y-2">
            {/* 카드 이름 */}
            <div className="flex items-start gap-2">
              <Emoji char="📋" size={16} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-amber-400">{dossierLabel}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{card.description}</div>
              </div>
            </div>

            {/* 증거 정보 */}
            <div className="flex items-center gap-1.5 px-1">
              <span className="text-[9px] text-gray-500">증거:</span>
              <span className="text-[10px] text-amber-500/70 font-mono">{evidenceShort}</span>
              <span className="text-[9px] text-gray-600 truncate">({evidenceLabel})</span>
            </div>

            {/* 자동 실행 버튼 */}
            <button
              onClick={handleExecute}
              className="w-full text-xs py-2 rounded-lg bg-amber-600/90 text-gray-950 font-bold active:scale-95 transition-all hover:bg-amber-500"
            >
              자동 실행
            </button>
          </div>
        </div>
      )}

      {/* 배너 버튼 */}
      <button
        onClick={handleClick}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border transition-all ${
          disabled && showcaseStep < 3
            ? 'border-gray-700/30 bg-gray-800/40 text-gray-600 cursor-not-allowed'
            : effectivePopupOpen
              ? 'border-amber-500/60 bg-amber-950/40 text-amber-400 shadow-lg shadow-amber-500/15'
              : showcaseStep >= 3
                ? 'border-amber-400 bg-amber-950/40 text-amber-400 ring-2 ring-amber-400 animate-pulse shadow-lg shadow-amber-500/20'
                : 'border-amber-500/40 bg-amber-950/30 text-amber-400 hover:border-amber-500/60 hover:shadow-lg hover:shadow-amber-500/10 animate-pulse'
        }`}
      >
        <Emoji char="❗" size={14} />
        <span className="text-[11px] font-semibold whitespace-nowrap">결정적 질문 가능</span>
      </button>
    </div>
  )
}

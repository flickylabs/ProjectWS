/**
 * 증거 감별 모달 — 증거의 신뢰도를 플레이어가 직접 판단
 */
import { useState } from 'react'
import { useStore } from '../../store/useGameStore'
import Emoji from '../common/Emoji'
import type { AppraisalVerdict, PartialTrustDetail } from '../../types/discovery'
import type { EvidenceNode } from '../../types'

interface Props {
  evidenceId: string
  onClose: () => void
}

const VERDICT_OPTIONS: { value: AppraisalVerdict; label: string; icon: string; color: string }[] = [
  { value: 'trustworthy', label: '신뢰할 수 있는 증거', icon: '✅', color: 'emerald' },
  { value: 'partial', label: '부분적으로만 신뢰', icon: '⚠️', color: 'amber' },
  { value: 'suspicious', label: '의심스러운 증거', icon: '❌', color: 'red' },
]

const SUB_ACTION_LABELS: Record<string, string> = {
  request_original: '원본 확인',
  check_metadata: '메타데이터',
  restore_context: '맥락 복원',
  verify_source: '출처 확인',
  check_edits: '편집 검사',
  question_acquisition: '취득 경위',
}

export default function EvidenceAppraisalModal({ evidenceId, onClose }: Props) {
  const { caseData, evidenceStates, submitAppraisal, turnCount } = useStore((s) => s)
  const [verdict, setVerdict] = useState<AppraisalVerdict | null>(null)
  const [partialChecks, setPartialChecks] = useState<Record<string, boolean>>({})

  if (!caseData) return null

  const evidence = caseData.evidence.find((e) => e.id === evidenceId)
  const state = evidenceStates[evidenceId]
  if (!evidence || !state) return null

  // 조사 완료된 항목만 감별 대상
  const investigatedActions = state.investigatedActions

  const handlePartialToggle = (subAction: string) => {
    setPartialChecks((prev) => ({ ...prev, [subAction]: !prev[subAction] }))
  }

  const handleSubmit = () => {
    if (!verdict) return
    const partialDetails: PartialTrustDetail[] = verdict === 'partial'
      ? investigatedActions.map((sa) => ({ subAction: sa, trusted: !!partialChecks[sa] }))
      : []
    submitAppraisal(evidenceId, verdict, partialDetails, turnCount)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-gray-950/85 flex items-center justify-center px-4" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Emoji char="🔍" size={22} />
            <h2 className="text-base font-bold text-cyan-400">증거 감별</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-lg active:scale-95">✕</button>
        </div>

        {/* 증거 정보 */}
        <div className="px-5 pt-4 pb-2">
          <div className="text-xs text-gray-500 mb-1">증거</div>
          <div className="text-sm font-medium text-gray-200">{evidence.name}</div>
          <div className="text-xs text-gray-500 mt-1">{evidence.description}</div>
        </div>

        {/* 조사 결과 목록 */}
        <div className="px-5 py-3 space-y-2">
          <div className="text-xs text-gray-500 mb-1">조사 결과 ({investigatedActions.length}건)</div>
          {investigatedActions.map((sa) => (
            <div key={sa} className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-2.5">
              <div className="text-xs font-medium text-gray-400 mb-1">
                {SUB_ACTION_LABELS[sa] ?? sa}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                {evidence.investigationResults[sa] ?? '(결과 없음)'}
              </p>
            </div>
          ))}
        </div>

        {/* 감별 선택 */}
        <div className="px-5 py-3 space-y-2">
          <div className="text-xs text-gray-500 mb-2">이 증거를 어떻게 판단합니까?</div>
          {VERDICT_OPTIONS.map((opt) => {
            const isSelected = verdict === opt.value
            const borderColor = isSelected
              ? opt.color === 'emerald' ? 'border-emerald-600/60 ring-1 ring-emerald-500/30'
              : opt.color === 'amber' ? 'border-amber-600/60 ring-1 ring-amber-500/30'
              : 'border-red-600/60 ring-1 ring-red-500/30'
              : 'border-gray-700/40'
            const bgColor = isSelected
              ? opt.color === 'emerald' ? 'bg-emerald-950/40'
              : opt.color === 'amber' ? 'bg-amber-950/40'
              : 'bg-red-950/40'
              : 'bg-gray-800/40'

            return (
              <button
                key={opt.value}
                onClick={() => setVerdict(opt.value)}
                className={`w-full text-left rounded-xl border p-3 transition-all active:scale-[0.98] ${borderColor} ${bgColor} hover:bg-gray-800/60`}
              >
                <div className="flex items-center gap-2">
                  <Emoji char={opt.icon} size={16} />
                  <span className={`text-sm font-medium ${isSelected ? 'text-gray-200' : 'text-gray-400'}`}>
                    {opt.label}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* 부분 신뢰 — 세부 체크 */}
        {verdict === 'partial' && investigatedActions.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-800/40">
            <div className="text-xs text-amber-400 mb-2">어떤 조사 결과를 신뢰합니까?</div>
            <div className="space-y-1.5">
              {investigatedActions.map((sa) => (
                <label
                  key={sa}
                  className="flex items-center gap-2.5 p-2 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!partialChecks[sa]}
                    onChange={() => handlePartialToggle(sa)}
                    className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500/30 bg-gray-700"
                  />
                  <span className="text-xs text-gray-300">{SUB_ACTION_LABELS[sa] ?? sa}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* 하단 버튼 */}
        <div className="px-5 pb-5 pt-2 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 text-gray-400 text-sm font-medium active:scale-95 hover:bg-gray-700"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={!verdict}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all ${
              verdict
                ? 'bg-cyan-600 text-gray-950 hover:bg-cyan-500'
                : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
            }`}
          >
            감별 확정
          </button>
        </div>
      </div>
    </div>
  )
}

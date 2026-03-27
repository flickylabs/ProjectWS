import { useGameStore } from '../../store/useGameStore'

export default function EvidenceLegality() {
  const caseData = useGameStore((s) => s.caseData)
  const evidenceStates = useGameStore((s) => s.evidenceStates)
  const verdictInput = useGameStore((s) => s.verdictInput)
  const setEvidenceLegality = useGameStore((s) => s.setEvidenceLegality)

  if (!caseData) return null

  // 정당성 의심 증거만 표시 (사용된 것 중)
  const questionableEvidence = caseData.evidence.filter(
    (e) => e.legitimacy !== 'lawful' && evidenceStates[e.id]?.presented,
  )

  // 비공개 보호로 획득한 증거 (제시된 것 중)
  const confidentialEvidence = caseData.evidence.filter(
    (e) => evidenceStates[e.id]?.confidentialSource && evidenceStates[e.id]?.presented,
  )

  if (questionableEvidence.length === 0 && confidentialEvidence.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-amber-400">④ 증거 정당성 판단</h3>
      <p className="text-xs text-gray-500">다음 증거는 취득 과정에 문제가 있을 수 있습니다. 판결 근거로 사용할지 결정하세요.</p>

      <div className="space-y-2">
        {confidentialEvidence.map((ev) => {
          const allowed = verdictInput.evidenceLegality[ev.id]
          return (
            <div key={ev.id} className="bg-gray-800/60 border border-purple-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-400">
                  비공개 보호 약속
                </span>
                <span className="text-sm font-semibold text-gray-200">{ev.name}</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{ev.description}</p>
              <p className="text-xs text-purple-400/80 mb-3">이 증거는 비공개를 약속하고 얻은 진술에서 나왔습니다.</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setEvidenceLegality(ev.id, true)}
                  className={`flex-1 border rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                    allowed === true
                      ? 'bg-purple-700 text-white border-purple-600'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-purple-600'
                  }`}
                >
                  판결 근거로 사용
                </button>
                <button
                  onClick={() => setEvidenceLegality(ev.id, false)}
                  className={`flex-1 border rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                    allowed === false
                      ? 'bg-gray-600 text-white border-gray-500'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  판결에서 제외
                </button>
              </div>
              {allowed === true && (
                <div className="text-xs text-purple-400 mt-2">⚠️ 비공개 약속을 어기면 권위 점수가 크게 감소합니다.</div>
              )}
            </div>
          )
        })}

        {questionableEvidence.map((ev) => {
          const allowed = verdictInput.evidenceLegality[ev.id]
          return (
            <div key={ev.id} className="bg-gray-800/60 border border-orange-800/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-1.5 py-0.5 rounded bg-orange-900/50 text-orange-400">
                  {ev.legitimacy === 'privacy_concern' ? '사생활 침해 소지' : '위법 취득'}
                </span>
                <span className="text-sm font-semibold text-gray-200">{ev.name}</span>
              </div>
              <p className="text-xs text-gray-400 mb-3">{ev.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => setEvidenceLegality(ev.id, true)}
                  className={`flex-1 border rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                    allowed === true
                      ? 'bg-orange-700 text-white border-orange-600'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-orange-600'
                  }`}
                >
                  판결 근거로 사용
                </button>
                <button
                  onClick={() => setEvidenceLegality(ev.id, false)}
                  className={`flex-1 border rounded px-3 py-1.5 text-xs font-semibold transition-colors ${
                    allowed === false
                      ? 'bg-gray-600 text-white border-gray-500'
                      : 'bg-gray-800 text-gray-400 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  판결에서 제외
                </button>
              </div>
              {allowed === true && (
                <div className="text-xs text-orange-400 mt-2">⚠️ 위법 증거 사용 시 권위 점수가 감소합니다.</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
